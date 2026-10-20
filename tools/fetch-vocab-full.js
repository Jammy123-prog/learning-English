#!/usr/bin/env node
/* ============================================================
   EverWord 全量词库生成器 v1.5（零依赖，Node ≥ 18 + Python 标准库解 zip）
   运行：node tools/fetch-vocab-full.js
   作用：生成 js/vocab-full.js —— CET-4 / CET-6 / TEM-8 / IELTS 全量词汇
         （词目 + 英式音标 + 词性中文释义 + 双语例句），供每日学习卡组与全库搜索使用。
   来源（均为公开数据，个人学习用途）：
     - 有道词典词书导出数据：kajweb/dict（GitHub）
       CET4_1/2/3(+乱序) → CET-4；CET6_1/2/3 → CET-6；IELTS_2/3 → IELTS；Level4/Level8 → TEM-8 例句回填
     - mahavivo/english-wordlists（GitHub）：CET-4/CET-6 大纲词表（缺口词兜底释义）、
       英语专业星标八级词汇表（TEM-8 词目基线）
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const TMP = path.join(ROOT, ".tmp");
const BOOKS_DIR = path.join(TMP, "books");
const OUT = path.join(ROOT, "js", "vocab-full.js");

const BOOK_CDN = "https://cdn.jsdelivr.net/gh/kajweb/dict@master/book/";
const OUTLINE_CDN = "https://cdn.jsdelivr.net/gh/mahavivo/english-wordlists@master/";

/* 词书清单（group → 文件列表）；LEVEL 组仅用于 TEM-8 例句/释义回填 */
const BOOKS = {
  "CET-4": ["1521164649209_CET4_1.zip", "1521164635506_CET4_2.zip", "1521164643060_CET4_3.zip",
            "1523620217431_CET4luan_1.zip", "1524052539052_CET4luan_2.zip"],
  "CET-6": ["1521164668667_CET6_1.zip", "1524052554766_CET6_2.zip", "1521164633851_CET6_3.zip"],
  "IELTS": ["1521164657744_IELTS_2.zip", "1521164666922_IELTS_3.zip"],
  "LEVEL": ["1521164647417_Level4_1.zip", "1521164635290_Level8_1.zip", "1521164663794_Level8_2.zip"]
};

/* 大纲/词表（词目基线 + 缺口词释义兜底） */
const OUTLINES = [
  { lv: "CET-4", url: OUTLINE_CDN + "CET4_edited.txt", file: "cet4_outline.txt" },
  { lv: "CET-6", url: OUTLINE_CDN + "CET6_edited.txt", file: "cet6_outline.txt" },
  { lv: "TEM-8", url: OUTLINE_CDN + encodeURIComponent("英语专业星标八级词汇.txt"), file: "tem8.txt" }
];

fs.mkdirSync(BOOKS_DIR, { recursive: true });

function download(url, fp) {
  if (fs.existsSync(fp) && fs.statSync(fp).size > 1000) return;
  console.log("[vocab-full] 下载 " + path.basename(fp) + " …");
  execSync(`curl -sL -m 300 --retry 3 "${url}" -o "${fp.replace(/\\/g, "/")}"`, { stdio: "pipe" });
  if (!fs.existsSync(fp) || fs.statSync(fp).size < 1000) throw new Error("下载失败: " + url);
}

/* ---- Python 解 zip：全部词书一次解析为 {bookId: [{w,ipa,trans,sent,rank}...]} ---- */
function parseAllBooks() {
  const pyFile = path.join(TMP, "parse_books.py");
  fs.writeFileSync(pyFile, [
    "import zipfile, json, sys, os, re",
    "out = {}",
    "for fp in sys.argv[1:]:",
    "    book = re.sub(r'^\\d+_', '', os.path.basename(fp))[:-4]",
    "    entries, seen = [], set()",
    "    z = zipfile.ZipFile(fp)",
    "    for jn in [n for n in z.namelist() if n.endswith('.json')]:",
    "        for line in z.read(jn).decode('utf-8','replace').splitlines():",
    "            line = line.strip()",
    "            if not line: continue",
    "            try: d = json.loads(line)",
    "            except Exception: continue",
    "            w = (d.get('headWord') or '').strip().lower()",
    "            if not w or w in seen or not re.match(r\"^[a-z][a-z'\\-]*$\", w): continue",
    "            cc = ((d.get('content') or {}).get('word') or {}).get('content') or {}",
    "            trans = [[t.get('pos','') or '', t.get('tranCn','') or ''] for t in (cc.get('trans') or [])]",
    "            sents = (cc.get('sentence') or {}).get('sentences') or []",
    "            sent = sents[0] if sents else None",
    "            if sent:",
    "                sent = [re.sub(r'<[^>]+>', '', str(sent.get('sContent',''))).strip(), re.sub(r'<[^>]+>', '', str(sent.get('sCn',''))).strip()]",
    "            entries.append({'w': w, 'ipa': (cc.get('ukphone') or cc.get('usphone') or '').strip(), 'trans': trans, 'sent': sent, 'rank': d.get('wordRank', 10**9)})",
    "            seen.add(w)",
    "    out[book] = entries",
    "print(json.dumps(out))"
  ].join("\n"));
  const zips = [];
  for (const files of Object.values(BOOKS)) for (const f of files) zips.push(path.join(BOOKS_DIR, f));
  const raw = execSync(`"${process.env.EV_PYTHON || "python"}" "${pyFile}" ${zips.map(p => `"${p.replace(/\\/g, "/")}"`).join(" ")}`,
    { maxBuffer: 128 * 1024 * 1024 }).toString("utf8");
  return JSON.parse(raw);
}

/* ---- 大纲/词表解析：word [ipa] pos.def → {ipa,pos,def} ---- */
function parseOutline(fp) {
  const rows = new Map();
  const CJK = /[\u4e00-\u9fff]/;
  for (const line of fs.readFileSync(fp, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z][A-Za-z'\-]*)\s+(.+)$/);
    if (!m) continue;
    const w = m[1].toLowerCase();
    let rest = m[2].trim();
    if (!(rest.startsWith("[") || /^[a-z]{1,4}\./i.test(rest) || CJK.test(rest))) continue;
    if (!/^[a-z][a-z'\-]*$/.test(w)) continue;
    let ipa = "";
    const im = rest.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (im) { ipa = im[1].trim(); rest = im[2].trim(); }
    let pos = "", def = rest;
    const pm = rest.match(/^((?:[a-z]{1,4}\.)(?:\s*&\s*[a-z]{1,4}\.)*)\s*(.*)$/i);
    if (pm) { pos = pm[1].replace(/\s+/g, ""); def = pm[2].trim(); }
    const cur = rows.get(w) || { ipa: "", pos: "", def: "" };
    if (!cur.ipa && ipa) cur.ipa = ipa;
    if (!cur.def && def) { cur.pos = pos; cur.def = def; }
    rows.set(w, cur);
  }
  return rows;
}

/* ---- 词性规范化（"v" → "v."，复合 "vt.&n" 保留） ---- */
function dotPos(p) {
  p = String(p || "").trim();
  if (!p) return "";
  if (/\.$/.test(p)) return p;
  return /^[a-z]{1,4}(&[a-z]{1,4})*$/i.test(p) ? p + "." : p;
}

/* ================= 主流程 ================= */
(function main() {
  /* 1. 确保本地数据就绪 */
  for (const files of Object.values(BOOKS)) for (const f of files) download(BOOK_CDN + f, path.join(BOOKS_DIR, f));
  for (const o of OUTLINES) download(o.url, path.join(TMP, o.file));

  /* 2. 解析全部词书 */
  console.log("[vocab-full] 解析词书数据…");
  const bookData = parseAllBooks();
  const pools = {};                                  // lv → Map(w → {ipa,trans,sent,rank})
  const levelPool = new Map();                       // Level4/8 回填池
  for (const [group, files] of Object.entries(BOOKS)) {
    const target = group === "LEVEL" ? levelPool : (pools[group] = new Map());
    for (const f of files) {
      const bookId = f.replace(/^\d+_/, "").replace(/\.zip$/, "");
      for (const e of bookData[bookId] || []) {
        const cur = target.get(e.w) || { ipa: "", trans: [], sent: null, rank: Infinity };
        if (e.ipa && !cur.ipa) cur.ipa = e.ipa;
        if (e.trans.length > cur.trans.length) cur.trans = e.trans;
        if (e.sent && !cur.sent) cur.sent = e.sent;
        cur.rank = Math.min(cur.rank, e.rank || Infinity);
        target.set(e.w, cur);
      }
    }
  }
  for (const [lv, p] of Object.entries(pools)) console.log(`[vocab-full]   词书池 ${lv}: ${p.size} 词`);
  console.log("[vocab-full]   回填池 Level4/8: " + levelPool.size + " 词");

  /* 3. 解析大纲 */
  const outlines = {};
  for (const o of OUTLINES) outlines[o.lv] = parseOutline(path.join(TMP, o.file));
  for (const [lv, rows] of Object.entries(outlines)) console.log(`[vocab-full]   词表 ${lv}: ${rows.size} 词`);

  /* 4. 合并 */
  const LV_ORDER = ["CET-4", "CET-6", "TEM-8", "IELTS"];
  const all = new Map();                             // w → {lvs:Set, ipa,pos,def,ex,zh, rank}
  function ensure(w) {
    let e = all.get(w);
    if (!e) { e = { lvs: new Set(), ipa: "", pos: "", def: "", ex: "", zh: "", rank: Infinity }; all.set(w, e); }
    return e;
  }
  /* 4a. 词书池 → 词目 + 音标/释义/例句 + rank */
  for (const [lv, pool] of Object.entries(pools)) {
    for (const [w, e] of pool) {
      const t = ensure(w);
      t.lvs.add(lv);
      if (e.ipa && !t.ipa) t.ipa = e.ipa;
      if (e.trans.length && !t.def) {
        t.def = e.trans.filter(x => x[1]).map(x => dotPos(x[0]) + x[1]).join("；");
      }
      if (e.sent && !t.ex) { t.ex = e.sent[0]; t.zh = e.sent[1]; }
      t.rank = Math.min(t.rank, e.rank);
    }
  }
  /* 4b. 大纲：CET-4/CET-6 补词目，缺口词用大纲释义兜底 */
  for (const lv of ["CET-4", "CET-6"]) {
    for (const [w, o] of outlines[lv]) {
      const t = ensure(w);
      t.lvs.add(lv);
      if (o.ipa && !t.ipa) t.ipa = o.ipa;
      if (!t.def) { t.pos = o.pos; t.def = o.def; }
    }
  }
  /* 4c. TEM-8：星标表词目基线；例句/释义由 Level 池与表自带数据兜底 */
  for (const [w, o] of outlines["TEM-8"]) {
    const t = ensure(w);
    t.lvs.add("TEM-8");
    if (o.ipa && !t.ipa) t.ipa = o.ipa;
    if (!t.def) { t.pos = o.pos; t.def = o.def; }
    if (!t.ex && levelPool.has(w)) {
      const le = levelPool.get(w);
      if (le.ipa && !t.ipa) t.ipa = le.ipa;
      if (!t.def && le.trans.length) t.def = le.trans.filter(x => x[1]).map(x => dotPos(x[0]) + x[1]).join("；");
      if (le.sent && !t.ex) { t.ex = le.sent[0]; t.zh = le.sent[1]; }
      t.rank = Math.min(t.rank, le.rank);
    }
  }

  /* 5. 组装输出（主级别 = 级别优先序中最高；组内按词书频率 rank，大纲补充词排组尾） */
  const words = [];
  for (const [w, e] of all) {
    const main = LV_ORDER.find(lv => e.lvs.has(lv));
    const item = { w, lv: main };
    if (e.lvs.size > 1) item.lvs = [...e.lvs].sort((a, b) => LV_ORDER.indexOf(a) - LV_ORDER.indexOf(b)).join(",");
    if (e.ipa) item.ipa = e.ipa.includes("/") ? e.ipa : "/" + e.ipa + "/";
    if (e.pos) item.pos = e.pos;
    if (e.def) item.def = e.def;
    if (e.ex) item.ex = e.ex;
    if (e.zh) item.zh = e.zh;
    item._rank = e.rank;
    item._main = main;
    words.push(item);
  }
  words.sort((a, b) =>
    (LV_ORDER.indexOf(a._main) - LV_ORDER.indexOf(b._main)) ||
    (a._rank - b._rank) || a.w.localeCompare(b.w));
  words.forEach(x => { delete x._rank; delete x._main; });

  const counts = {};
  for (const lv of LV_ORDER) counts[lv] = [...all.values()].filter(e => e.lvs.has(lv)).length;
  const payload = {
    generated: new Date().toISOString().slice(0, 10),
    sources: ["有道词典词书数据 (kajweb/dict: CET4×5/CET6×3/IELTS×2/Level×3)",
              "CET-4/CET-6 大纲词表 (mahavivo/english-wordlists)",
              "英语专业星标八级词汇表 (mahavivo/english-wordlists)"],
    note: "全量词库：词目+音标+词性中文释义+双语例句；释义与例句版权归原数据方，仅供个人学习",
    counts: Object.assign(counts, { unique: all.size }),
    words
  };

  const banner = `/* EverWord 全量词库 v1.5 — tools/fetch-vocab-full.js 自动生成（${payload.generated}），请勿手改
   规模：CET-4 ${counts["CET-4"]} / CET-6 ${counts["CET-6"]} / TEM-8 ${counts["TEM-8"]} / IELTS ${counts["IELTS"]}，去重 ${all.size} 词
   来源：有道词书数据（kajweb/dict）· 大纲词表与专八星标词汇（mahavivo/english-wordlists）
   版权：音标/释义/例句版权归原数据方，仅供个人学习使用 */
`;
  fs.writeFileSync(OUT, banner + "window.EV_FULL = " + JSON.stringify(payload) + ";\n");
  const miss = words.filter(x => !x.def).length;
  console.log(`[vocab-full] 已生成 js/vocab-full.js（${(fs.statSync(OUT).size / 1048576).toFixed(2)} MB）`);
  console.log(`[vocab-full] 总词数 ${all.size} | 各级别 ${JSON.stringify(counts)} | 缺释义 ${miss} 词`);
})();
