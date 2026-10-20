/* 数据完整性校验 —— node tools/validate.js
   检查词库字段、文章术语覆盖、题目答案合法性等 */

const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const code = fs.readFileSync(path.join(root, "js", "data.js"), "utf8");
/* v1.4：文章扩充层（articles-ext.js 在 data.js 之后执行，把 EV_ARTICLES_EXT 合并进 ARTICLES/DICT） */
const extPath = path.join(root, "js", "articles-ext.js");
const extCode = fs.existsSync(extPath) ? fs.readFileSync(extPath, "utf8") : "";
/* data.js 为浏览器全局脚本，用 Function 提取其顶层常量 */
const mod = new Function(
  code + "\n" + extCode + "\n;return {WORDS:WORDS,ARTICLES:ARTICLES,DAILY_FIXED:DAILY_FIXED,BANK:BANK,DICT:DICT,NEW_PER_DAY:NEW_PER_DAY};"
)();
const WORDS = mod.WORDS, ARTICLES = mod.ARTICLES, DAILY_FIXED = mod.DAILY_FIXED, BANK = mod.BANK, DICT = mod.DICT;

let errs = [];
const add = m => errs.push(m);

/* ---- 词库 ---- */
const LEVELS = ["CET-4", "CET-6", "TEM-8", "IELTS"];
const seen = new Set();
WORDS.forEach(w => {
  ["w", "ipa", "pos", "def", "ex", "exZh", "lv"].forEach(k => {
    if (!w[k]) add("WORD " + w.w + " 缺字段 " + k);
  });
  if (!LEVELS.includes(w.lv)) add("WORD " + w.w + " 非法级别 " + w.lv);
  if (seen.has(w.w)) add("重复单词 " + w.w);
  seen.add(w.w);
});
if (WORDS.length < 150) add("词库数量不足: " + WORDS.length);
LEVELS.forEach(lv => {
  const n = WORDS.filter(w => w.lv === lv).length;
  if (n < 30) add(lv + " 级词数不足 30（实际 " + n + "）");
});

/* ---- 文章：级别唯一 + 术语确实出现在正文中（与 app.js 词形还原规则一致） ---- */
function stemCands(k) {
  const c = [k, k.replace(/'s$/, "")];
  if (/ies$/.test(k)) c.push(k.slice(0, -3) + "y");
  if (/es$/.test(k)) c.push(k.slice(0, -2));
  if (/s$/.test(k) && !/ss$/.test(k)) c.push(k.slice(0, -1));
  if (/ed$/.test(k)) { c.push(k.slice(0, -2)); c.push(k.slice(0, -1)); }
  if (/ing$/.test(k)) { c.push(k.slice(0, -3)); c.push(k.slice(0, -3) + "e"); c.push(k.slice(0, -4)); }
  if (/ly$/.test(k)) c.push(k.slice(0, -2));
  if (/r$/.test(k)) c.push(k.slice(0, -1));
  return c;
}
const lvSet = new Set();
ARTICLES.forEach(a => {
  lvSet.add(a.lv);
  if (!a.title || !a.titleZh || !a.topic) add("文章 " + a.id + " 元信息缺失");
  if (!a.paras || !a.paras.length) add("文章 " + a.id + " 无正文段落");
  const text = a.paras.join(" ");
  const tokens = (text.match(/[A-Za-z][A-Za-z'’-]*/g) || []).map(t => t.toLowerCase());
  const matched = new Set();
  tokens.forEach(t => stemCands(t).forEach(c => { if (DICT[c]) matched.add(c); }));
  Object.keys(a.gloss).forEach(k => {
    const g = a.gloss[k];
    if (!g.pos || !g.def) add("文章 " + a.id + " 术语 " + k + " 缺 pos/def");
    if (!matched.has(k)) add("文章 " + a.id + " 术语 " + k + " 未在正文出现");
  });
});
[1, 2, 3].forEach(lv => {
  const n = ARTICLES.filter(a => a.lv === lv).length;
  if (n < 2) add("难度 " + lv + " 文章不足 2 篇（实际 " + n + "）");
});

/* ---- 题目：答案/解析/唯一 ID ---- */
const ALL_Q = DAILY_FIXED.map(q => Object.assign({ exam: "daily" }, q))
  .concat(BANK);
const ids = new Set();
ALL_Q.forEach(q => {
  if (!q.stem) add(q.id + " 缺题干");
  if (!Array.isArray(q.options) || q.options.length < 2) add(q.id + " 选项非法");
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) add(q.id + " 答案越界");
  if (!q.explain) add(q.id + " 缺解析");
  if (!q.type) add(q.id + " 缺题型");
  if (ids.has(q.id)) add("重复题目 ID " + q.id);
  ids.add(q.id);
});
BANK.forEach(q => {
  if (!["CET-4", "CET-6", "TEM-8", "IELTS"].includes(q.exam)) add(q.id + " 非法考试分类");
});
if (new Set(BANK.map(q => q.exam)).size !== 4) add("题库四个考试分类不全");
["CET-4", "CET-6", "TEM-8", "IELTS"].forEach(ex => {
  const n = BANK.filter(q => q.exam === ex).length;
  if (n < 10) add(ex + " 题数不足 10（实际 " + n + "）");
});
if (DAILY_FIXED.length < 6) add("每日固定题不足 6（实际 " + DAILY_FIXED.length + "）");

/* ---- 词典键全小写 ---- */
Object.keys(DICT).forEach(k => { if (k !== k.toLowerCase()) add("词典键非小写: " + k); });

/* ---- 全量词库（vocab-full.js，v1.5）：唯一性 / 级别合法 / 释义覆盖 ---- */
const fullFp = path.join(root, "js", "vocab-full.js");
let fullStat = "";
if (fs.existsSync(fullFp)) {
  const win = {};
  try { new Function("window", fs.readFileSync(fullFp, "utf8"))(win); } catch (e) { add("vocab-full.js 解析失败: " + e.message); }
  const FV = win.EV_FULL;
  if (!FV || !Array.isArray(FV.words)) add("EV_FULL 数据缺失");
  else {
    const fseen = new Set();
    FV.words.forEach(x => {
      if (!x.w || !/^[a-z][a-z'\-]*$/.test(x.w)) add("FULL 非法词目 " + (x.w || "(空)"));
      if (fseen.has(x.w)) add("FULL 重复单词 " + x.w);
      fseen.add(x.w);
      if (!x.lv || !LEVELS.includes(x.lv)) add("FULL " + x.w + " 非法主级别 " + x.lv);
      (x.lvs || "").split(",").forEach(l => { if (l && !LEVELS.includes(l)) add("FULL " + x.w + " 非法级别标签 " + l); });
      if (!x.def) add("FULL " + x.w + " 缺释义");
    });
    if (FV.words.length < 10000) add("FULL 词量异常偏少: " + FV.words.length);
    if (FV.counts && FV.counts.unique !== FV.words.length) add("FULL counts.unique 与词数不一致");
    fullStat = " / 全量词库 " + FV.words.length + " 词";
  }
} else {
  add("缺少 js/vocab-full.js（运行 node tools/fetch-vocab-full.js 生成）");
}

/* ---- 结果 ---- */
if (errs.length) {
  console.error("校验失败 " + errs.length + " 项：");
  errs.forEach(m => console.error("  - " + m));
  process.exit(1);
}
console.log("OK · 词库 " + WORDS.length + " 词 / 文章 " + ARTICLES.length + " 篇 / 题目 " + ALL_Q.length + " 题 / 词典 " + Object.keys(DICT).length + " 条" + fullStat);
