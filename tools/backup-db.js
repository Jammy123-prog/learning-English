#!/usr/bin/env node
/* ============================================================
   EverWord 数据库备份 v1.0（零依赖，Node ≥ 22）
   运行：node tools/backup-db.js [--keep=7] [--out=data/backups] [--check]

   作用：用 SQLite 的 VACUUM INTO 生成一份「去碎片、自洽、可直接替换」的快照，
        并按保留份数滚动清理旧备份。
   为什么用 VACUUM INTO：
     - 单条 SQL 原子完成，产出的是完整可用的数据库文件（不是 WAL 依赖的半成品）
     - 只需读锁，服务器运行中也可安全执行，不需要停服
     - 顺带回收新闻正文反复更新产生的空闲页，备份体积通常小于原库
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const ROOT = path.join(__dirname, "..");
const DB_FILE = path.join(ROOT, "data", "everword.db");

/* ---- 参数 ---- */
const argv = process.argv.slice(2);
const opt = name => {
  const hit = argv.find(a => a === "--" + name || a.startsWith("--" + name + "="));
  if (!hit) return null;
  const i = hit.indexOf("=");
  return i < 0 ? "1" : hit.slice(i + 1);
};
const KEEP = Math.max(1, parseInt(opt("keep") || "7", 10) || 7);
const OUT_DIR = path.resolve(ROOT, opt("out") || path.join("data", "backups"));
const DO_CHECK = !!opt("check");

function stamp(d) {
  const p = n => String(n).padStart(2, "0");
  return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "-" + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds());
}
const mb = n => (n / 1024 / 1024).toFixed(2) + " MB";

if (!fs.existsSync(DB_FILE)) {
  console.error("[backup] 未找到数据库：" + DB_FILE + "（先启动一次服务器以初始化）");
  process.exit(1);
}
fs.mkdirSync(OUT_DIR, { recursive: true });

const db = new DatabaseSync(DB_FILE);
db.exec("PRAGMA busy_timeout = 5000;");

/* 可选：写入前做一次快速自洽检查（非完整 integrity_check，开销可控） */
if (DO_CHECK) {
  const r = db.prepare("PRAGMA quick_check").get();
  console.log("[backup] 自洽检查：" + (r && r.quick_check ? r.quick_check : "ok"));
  if (r && r.quick_check && r.quick_check !== "ok") {
    console.error("[backup] 数据库疑似损坏，已终止备份（请先修复或改用更早的备份）");
    process.exit(2);
  }
}

const stats = db.prepare("SELECT (SELECT COUNT(*) FROM news_item) AS news, (SELECT COUNT(*) FROM word) AS words").get();
const target = path.join(OUT_DIR, "everword-" + stamp(new Date()) + ".db");

/* SQL 字符串字面量：反斜杠统一为正斜杠，单引号转义为两个单引号 */
const lit = target.replace(/\\/g, "/").replace(/'/g, "''");
try {
  db.exec("VACUUM INTO '" + lit + "'");
} catch (e) {
  console.error("[backup] 备份失败：" + e.message);
  process.exit(3);
}
db.close();

const size = fs.statSync(target).size;
console.log("[backup] 已生成 " + target);
console.log("[backup] 体积 " + mb(size) + "；新闻 " + stats.news + " 条 / 词库 " + stats.words + " 条；源库 " + mb(fs.statSync(DB_FILE).size));

/* ---- 滚动保留：仅清理本脚本生成的 everword-*.db ---- */
const files = fs.readdirSync(OUT_DIR)
  .filter(f => /^everword-\d{8}-\d{6}\.db$/.test(f))
  .map(f => ({ f, t: fs.statSync(path.join(OUT_DIR, f)).mtimeMs }))
  .sort((a, b) => b.t - a.t);

if (files.length > KEEP) {
  for (const old of files.slice(KEEP)) {
    fs.unlinkSync(path.join(OUT_DIR, old.f));
    console.log("[backup] 已清理旧备份 " + old.f);
  }
}
console.log("[backup] 当前保留 " + Math.min(files.length, KEEP) + " 份（上限 " + KEEP + "）");
