#!/usr/bin/env node
/* ============================================================
   EverWord 词库目录抓取器 v1.2（零依赖，Node ≥ 18）
   运行：node tools/fetch-vocab.js
   作用：抓取 CET-4 / CET-6 / IELTS 全量词目 → js/vocab-catalog.js
   版权策略：只收录「词目 + 级别归属」这类事实性数据，不搬运第三方释义/例句；
             释义由前端按需调用 dictionaryapi.dev（免费词典 API）查询并本地缓存。
   来源：
     - CET-4/CET-6 大纲词表：mahavivo/english-wordlists（GitHub）
     - IELTS 词书词目：kajweb/dict（GitHub，book IELTS_2.zip）
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, ".tmp");
const OUT = path.join(ROOT, "js", "vocab-catalog.js");

const SRC = {
  CET4: "https://raw.githubusercontent.com/mahavivo/english-wordlists/master/CET4_edited.txt",
  CET6: "https://raw.githubusercontent.com/mahavivo/english-wordlists/master/CET6_edited.txt",
  IELTS_ZIP: "https://raw.githubusercontent.com/kajweb/dict/master/book/1521164657744_IELTS_2.zip"
};

fs.mkdirSync(TMP, { recursive: true });

function fetchTo(url, file) {
  const fp = path.join(TMP, file);
  execSync(`curl -s -L -m 120 --retry 2 "${url}" -o "${fp.replace(/\\/g, "/")}"`, { stdio: "pipe" });
  if (!fs.existsSync(fp) || fs.statSync(fp).size < 1000) throw new Error("下载失败: " + url);
  return fp;
}

/* ---- 大纲词表解析：行首词目 +（音标|词性|中文）校验 ---- */
function parseOutline(text) {
  const out = new Set();
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/);
  const CJK = /[\u4e00-\u9fff]/;
  for (const line of lines) {
    const m = line.match(/^([A-Za-z][A-Za-z'\-]*)\s+(.+)$/);
    if (!m) continue;
    const word = m[1].toLowerCase();
    const rest = m[2].trim();
    /* 合法行：音标 [xx]、词性缩写 xx.、或含中文释义 */
    if (!(rest.startsWith("[") || /^[a-z]{1,6}\./i.test(rest) || CJK.test(rest))) continue;
    if (!/^[a-z][a-z'\-]*$/.test(word)) continue;
    out.add(word);
  }
  return [...out].sort();
}

/* ---- 有道词书 zip（NDJSON）→ 词目（Python 标准库解 zip，零 npm 依赖） ---- */
function parseIeltsZip(zipPath) {
  const py = process.env.EV_PYTHON || "python";
  const pyFile = path.join(TMP, "extract_ielts.py");
  fs.writeFileSync(pyFile, [
    "import zipfile, json, sys",
    "z = zipfile.ZipFile(sys.argv[1])",
    "words = []",
    "for name in [n for n in z.namelist() if n.endswith('.json')]:",
    "    for line in z.read(name).decode('utf-8', 'replace').splitlines():",
    "        line = line.strip()",
    "        if not line: continue",
    "        try: d = json.loads(line)",
    "        except Exception: continue",
    "        w = (d.get('headWord') or '').strip().lower()",
    "        if w: words.append(w)",
    "print(json.dumps(words))"
  ].join("\n"));
  const raw = execSync(`"${py}" "${pyFile}" "${zipPath.replace(/\\/g, "/")}"`, { maxBuffer: 64 * 1024 * 1024 }).toString("utf8");
  return [...new Set(JSON.parse(raw))].filter(w => /^[a-z][a-z'\-]*$/.test(w)).sort();
}

(async function main() {
  console.log("[vocab] 下载 CET-4 大纲词表…");
  const cet4 = parseOutline(fs.readFileSync(fetchTo(SRC.CET4, "cet4.txt"), "utf8"));
  console.log("[vocab] CET-4 词目：" + cet4.length);

  console.log("[vocab] 下载 CET-6 大纲词表…");
  const cet6 = parseOutline(fs.readFileSync(fetchTo(SRC.CET6, "cet6.txt"), "utf8"));
  console.log("[vocab] CET-6 词目：" + cet6.length);

  console.log("[vocab] 下载 IELTS 词书…");
  const zipPath = path.join(TMP, "ielts.zip");
  if (!fs.existsSync(zipPath) || fs.statSync(zipPath).size < 10000) fetchTo(SRC.IELTS_ZIP, "ielts.zip");
  const ielts = parseIeltsZip(zipPath);
  console.log("[vocab] IELTS 词目：" + ielts.length);

  const uniq = new Set([...cet4, ...cet6, ...ielts]);
  const payload = {
    generated: new Date().toISOString().slice(0, 10),
    sources: ["mahavivo/english-wordlists (CET-4/CET-6)", "kajweb/dict (IELTS_2)"],
    note: "仅词目+级别（事实数据）；释义按需经 dictionaryapi.dev 查询缓存",
    counts: { CET4: cet4.length, CET6: cet6.length, IELTS: ielts.length, unique: uniq.size },
    levels: { "CET-4": cet4, "CET-6": cet6, "IELTS": ielts }
  };

  const banner = `/* EverWord 词库目录 v1.2 — tools/fetch-vocab.js 自动生成（${payload.generated}），请勿手改
   规模：CET-4 ${cet4.length} / CET-6 ${cet6.length} / IELTS ${ielts.length}，去重 ${uniq.size} 词目
   版权：仅收录词目与级别归属；不含第三方释义（搜索时按需联网查询 dictionaryapi.dev 并缓存） */
`;
  fs.writeFileSync(OUT, banner + "window.EV_CATALOG = " + JSON.stringify(payload) + ";\n");
  console.log("[vocab] 已生成 js/vocab-catalog.js（" + (fs.statSync(OUT).size / 1024).toFixed(1) + " KB）");
})();
