#!/usr/bin/env node
/* ============================================================
   EverWord API & 静态服务器 v1.3.0（零依赖）
   运行：node server/server.js   （需 Node.js ≥ 22）
   能力：
   - 静态托管前端（http://localhost:8787）
   - 账号：POST /api/register  POST /api/login（scrypt 口令散列 + HMAC-SHA256 令牌，30 天）
   - 云同步：GET/PUT /api/state（复习卡片 / 统计 / 每日进度 / 设置，最后写入胜出）
   - 词库目录：GET /api/words?level=CET-4|CET-6|TEM-8|IELTS（SQLite 种子库）
              GET /api/words?q=xxx&limit=50（全库模糊检索：精确/前缀/包含/子序列/编辑距离）
   - 新闻速览：GET /api/news?topic=&limit=&refresh=1（懒刷新 30 分钟）
              GET /api/news/item?id=N（单条精读：RSS 全文 / China Daily 页面提取）
   - 新闻源：CGTN 8 版块 RSS（含 content:encoded 全文）+ China Daily 7 频道（运行时页面提取）
   版权口径：仓库只携带工具与元数据快照；正文仅缓存于本机 data/（gitignore）供个人学习，
             前端始终展示来源署名与原文链接（跳转原文阅读）。
   数据库：默认内置 SQLite（data/everword.db，WAL）；MySQL 8 建表脚本见 server/mysql-schema.sql
   ============================================================ */

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const VERSION = "1.3.0";
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(__dirname, "..", "data");
const DB_FILE = path.join(DATA_DIR, "everword.db");
const SECRET_FILE = path.join(DATA_DIR, ".secret");
const PORT = parseInt(process.env.PORT, 10) || 8787;
const TOKEN_DAYS = 30;
const STATE_MAX = 512 * 1024; // 单用户状态体积上限

/* ---------------- 秘钥（用于 HMAC 签名，首次启动自动生成） ---------------- */
fs.mkdirSync(DATA_DIR, { recursive: true });
let SECRET = "";
if (fs.existsSync(SECRET_FILE)) {
  SECRET = fs.readFileSync(SECRET_FILE, "utf8").trim();
}
if (!SECRET) {
  SECRET = crypto.randomBytes(32).toString("hex");
  fs.writeFileSync(SECRET_FILE, SECRET + "\n", { mode: 0o600 });
  console.log("[ev] 已生成服务器密钥 data/.secret");
}

/* ---------------- 数据库 ---------------- */
const db = new DatabaseSync(DB_FILE);
db.exec("PRAGMA journal_mode = WAL;");
db.exec(`
CREATE TABLE IF NOT EXISTS user (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL UNIQUE,
  pass       TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS user_state (
  user_id    INTEGER PRIMARY KEY REFERENCES user(id) ON DELETE CASCADE,
  data       TEXT    NOT NULL,
  updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS word (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  headword   TEXT    NOT NULL UNIQUE,
  ipa        TEXT,
  pos        TEXT,
  definition TEXT    NOT NULL,
  example    TEXT,
  example_zh TEXT,
  level      TEXT    NOT NULL,
  source     TEXT    NOT NULL DEFAULT 'builtin'
);
CREATE TABLE IF NOT EXISTS news_item (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  link       TEXT    NOT NULL UNIQUE,
  title      TEXT    NOT NULL,
  source     TEXT    NOT NULL,
  topic      TEXT    NOT NULL,
  published  TEXT,
  summary    TEXT,
  content    TEXT,
  fetched_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS sync_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL,
  action     TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
`);

/* v1.3 迁移：旧库补 content 列（已存在则忽略） */
try { db.exec("ALTER TABLE news_item ADD COLUMN content TEXT"); } catch (e) {}
/* 词库种子：从 js/data.js 提取词库灌入 SQLite（仅首次） */
function seedWords() {
  const row = db.prepare("SELECT COUNT(*) AS c FROM word").get();
  if (row && row.c > 0) return;
  const code = fs.readFileSync(path.join(ROOT, "js", "data.js"), "utf8");
  const mod = new Function(code + "\n;return { WORDS: WORDS };")();
  const ins = db.prepare(
    "INSERT OR IGNORE INTO word (headword, ipa, pos, definition, example, example_zh, level, source) VALUES (?, ?, ?, ?, ?, ?, ?, 'builtin')"
  );
  let n = 0;
  for (const w of mod.WORDS) {
    ins.run(w.w, w.ipa || null, w.pos || null, w.def || "", w.ex || null, w.exZh || null, w.lv || "CET-4");
    n++;
  }
  console.log("[ev] 词库种子已灌入 SQLite：" + n + " 词");
}
seedWords();

/* 词库目录种子：从 js/vocab-catalog.js 提取 CET-4/CET-6/IELTS 全量词目灌入
   （仅词目 + 级别归属，无释义——释义由前端按需查询 dictionaryapi.dev 缓存） */
function seedCatalog() {
  const fp = path.join(ROOT, "js", "vocab-catalog.js");
  if (!fs.existsSync(fp)) return;
  const m = fs.readFileSync(fp, "utf8").match(/window\.EV_CATALOG\s*=\s*([\s\S]+?);\s*$/);
  if (!m) return console.log("[ev] 词库目录文件格式异常，跳过");
  let data;
  try { data = JSON.parse(m[1]); } catch (e) { return console.log("[ev] 词库目录 JSON 解析失败，跳过"); }
  const have = db.prepare("SELECT COUNT(*) AS c FROM word WHERE source = 'catalog'").get().c;
  const map = new Map();
  for (const k of ["CET-4", "CET-6", "IELTS"]) (data.levels[k] || []).forEach(w => {
    if (!map.has(w)) map.set(w, []);
    map.get(w).push(k);
  });
  if (have >= map.size) return;
  const ins = db.prepare(
    "INSERT OR IGNORE INTO word (headword, ipa, pos, definition, example, example_zh, level, source) VALUES (?, NULL, NULL, '', NULL, NULL, ?, 'catalog')"
  );
  db.exec("BEGIN");
  let n = 0;
  map.forEach((lvs, w) => { if (ins.run(w, lvs.join(",")).changes > 0) n++; });
  db.exec("COMMIT");
  console.log("[ev] 词库目录已灌入 SQLite：" + n + " 词目（CET-4/CET-6/IELTS 去重 " + map.size + "）");
}
seedCatalog();

/* ---------------- 口令与令牌 ---------------- */
function hashPass(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(pw, salt, 64).toString("hex");
  return salt + ":" + hash;
}
function checkPass(pw, stored) {
  const i = stored.indexOf(":");
  if (i < 0) return false;
  const salt = stored.slice(0, i), hash = stored.slice(i + 1);
  const a = Buffer.from(hash, "hex");
  const b = crypto.scryptSync(pw, salt, 64);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const mac = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return body + "." + mac;
}
function verify(token) {
  const i = token.lastIndexOf(".");
  if (i <= 0) return null;
  const body = token.slice(0, i), mac = token.slice(i + 1);
  const expect = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(mac), b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    return (p.exp && p.exp > Date.now()) ? p : null;
  } catch (e) { return null; }
}
/* ---------------- 响应工具 ---------------- */
function json(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}
const bad = (res, msg, code) => json(res, code || 400, { ok: false, error: msg || "bad request" });

/* ---------------- 模糊检索工具 ---------------- */
function isSubseq(q, h) {
  let i = 0;
  for (const ch of h) { if (ch === q[i]) { i++; if (i === q.length) return true; } }
  return i === q.length;
}
/* 有上限的编辑距离（超出 cap 提前返回 -1，控制 13k 词目扫描成本） */
function lev(a, b, cap) {
  if (Math.abs(a.length - b.length) > cap) return -1;
  let prev = new Array(b.length + 1), cur = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    cur[0] = i;
    let best = cur[0];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < best) best = cur[j];
    }
    if (best > cap) return -1;
    const t = prev; prev = cur; cur = t;
  }
  return prev[b.length] > cap ? -1 : prev[b.length];
}

/* ---------------- 新闻源 ----------------
   ① CGTN 8 版块 RSS：条目自带 content:encoded 全文，直接解析入库（精读可用）
   ② China Daily 7 频道：RSS 已停服，改为「频道页发现链接 → 文章页提取正文」，
     仅缓存于本机 data/ 供个人学习，前端始终展示来源与原文链接。
   网络条件允许时可向 NEWS_FEEDS 追加经济学人/卫报等任意 RSS（含全文则同样可精读）。 */
const NEWS_FEEDS = [
  { url: "https://www.cgtn.com/subscribe/rss/section/world.xml",    topic: "政治·世界", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/politics.xml", topic: "政治·时政", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/business.xml", topic: "财经·商业", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/culture.xml",  topic: "文化·艺术", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/opinion.xml",  topic: "观点·评论", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/nature.xml",   topic: "自然·环保", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/travel.xml",   topic: "旅游·人文", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/sports.xml",   topic: "体育", source: "CGTN" }
];
const CD_SECTIONS = [
  { path: "/china",    topic: "中国·中国日报" },
  { path: "/world",    topic: "世界·中国日报" },
  { path: "/business", topic: "财经·中国日报" },
  { path: "/culture",  topic: "文化·中国日报" },
  { path: "/opinion",  topic: "观点·中国日报" },
  { path: "/sports",   topic: "体育·中国日报" },
  { path: "/travel",   topic: "旅游·中国日报" }
];
const CD_BASE = "https://www.chinadaily.com.cn";
const CD_PER_SECTION = 8;       /* 每频道每轮最多抓取的新文章数（对源友好） */
const NEWS_TTL = 30 * 60 * 1000;
const NEWS_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";
let newsStamp = 0, newsBusy = false;

function xmlClean(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}
function htmlClean(s) {
  return String(s || "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}
async function httpGet(url, ms) {
  const r = await fetch(url, { headers: { "User-Agent": NEWS_UA }, signal: AbortSignal.timeout(ms || 8000) });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return await r.text();
}

/* content:encoded（HTML，通常被实体转义）→ 纯文本段落数组；不足 2 段返回 null */
function contentToParas(raw) {
  let html = String(raw || "").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  /* CGTN 的 CDATA 内 HTML 是实体转义的（&lt;p&gt;），先解码再提段 */
  html = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
             .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
  const ps = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map(m => xmlClean(m[1]))
    .filter(x => x.length > 40);
  if (ps.length < 2) return null;
  return ps.slice(0, 40);
}

/* China Daily 文章页 → { title, date, paras } */
function parseCdArticle(html) {
  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  if (!t) return null;
  const title = htmlClean(t[1]).replace(/\s*[-–]\s*[^-–]+[-–]\s*Chinadaily\.com\.cn\s*$/i, "").trim();
  const ps = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map(m => htmlClean(m[1].replace(/<[^>]+>/g, " ")))
    .filter(x => x.length > 60);
  if (!title || ps.length < 3) return null;
  let published = "";
  const dm = html.match(/(20\d\d-\d\d-\d\d \d\d:\d\d)/);
  if (dm) { try { published = new Date(dm[1].replace(" ", "T") + "Z").toISOString(); } catch (e) {} }
  return { title: title.slice(0, 220), published, paras: ps.slice(0, 40) };
}

async function refreshNews(force) {
  if (newsBusy) return;
  if (!force && Date.now() - newsStamp < NEWS_TTL) return;
  newsBusy = true;
  let added = 0, cdAdded = 0;
  try {
    /* ---- ① CGTN RSS（含全文） ---- */
    const results = await Promise.allSettled(NEWS_FEEDS.map(async f => ({ f, xml: await httpGet(f.url, 6000) })));
    const upsert = db.prepare(`
      INSERT INTO news_item (link, title, source, topic, published, summary, content)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(link) DO UPDATE SET
        content = COALESCE(excluded.content, news_item.content),
        summary = COALESCE(NULLIF(news_item.summary, ''), excluded.summary)
    `);
    db.exec("BEGIN");
    for (const it of results) {
      if (it.status !== "fulfilled") continue;
      const { f, xml } = it.value;
      const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
      for (const b of blocks) {
        const pick = tag => { const m = b.match(new RegExp("<" + tag + ">([\\s\\S]*?)</" + tag + ">", "i")); return m ? xmlClean(m[1]) : ""; };
        const title = pick("title").slice(0, 220);
        let link = pick("link");
        if (!link) { const m = b.match(/<link[^>]*href="([^"]+)"/i); if (m) link = m[1]; }
        if (!title || !link) continue;
        let pub = "";
        try { const pd = pick("pubDate"); if (pd) pub = new Date(pd).toISOString(); } catch (e) {}
        const cem = b.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i);
        const paras = cem ? contentToParas(cem[1]) : null;
        if (upsert.run(link, title, f.source, f.topic, pub, pick("description").slice(0, 200), paras ? JSON.stringify(paras) : null).changes > 0) added++;
      }
    }
    db.exec("COMMIT");

    /* ---- ② China Daily：频道页发现新文章 → 提取正文 ---- */
    for (const sec of CD_SECTIONS) {
      try {
        const html = await httpGet(CD_BASE + sec.path, 6000);
        /* href 形态可能是 //host/a/...（协议相对）或 /a/...（站内路径）或 https://... */
        const links = [...new Set(
          [...html.matchAll(/href="([^"]*\/a\/20\d{4}\/\d{2}\/WS[0-9a-f]+\.html)"/g)].map(m => {
            const u = m[1];
            if (/^https?:/i.test(u)) return u;
            if (u.startsWith("//")) return "https:" + u;
            return CD_BASE + u;
          })
        )].slice(0, CD_PER_SECTION + 4);
        if (!links.length) continue;
        const ph = "(" + links.map(() => "?").join(",") + ")";
        const known = new Set(db.prepare("SELECT link FROM news_item WHERE link IN " + ph).all(...links).map(r => r.link));
        const fresh = links.filter(u => !known.has(u)).slice(0, CD_PER_SECTION);
        if (!fresh.length) continue;
        const arts = await Promise.allSettled(fresh.map(u => httpGet(u, 8000)));
        db.exec("BEGIN");
        arts.forEach((a, i) => {
          if (a.status !== "fulfilled") return;
          const parsed = parseCdArticle(a.value);
          if (!parsed) return;
          if (upsert.run(fresh[i], parsed.title, "China Daily", sec.topic, parsed.published,
              parsed.paras[0].slice(0, 200), JSON.stringify(parsed.paras)).changes > 0) cdAdded++;
        });
        db.exec("COMMIT");
      } catch (e) { /* 单频道失败不影响其他 */ }
    }
    newsStamp = Date.now();
    if (added || cdAdded) console.log("[ev] 新闻刷新：RSS 新增 " + added + " 条，China Daily 新增 " + cdAdded + " 条");
  } catch (e) {
    console.log("[ev] 新闻刷新失败：" + e.message);
    try { db.exec("ROLLBACK"); } catch (e2) {}
  } finally {
    newsBusy = false;
  }
}

/* ---------------- API 处理 ---------------- */
async function handleApi(req, res, url, body) {
  const p = url.pathname;

  /* ---- 健康检查 ---- */
  if (p === "/api/health" && req.method === "GET") {
    const users = db.prepare("SELECT COUNT(*) AS c FROM user").get().c;
    const words = db.prepare("SELECT COUNT(*) AS c FROM word").get().c;
    const news = db.prepare("SELECT COUNT(*) AS c FROM news_item").get().c;
    return json(res, 200, { ok: true, name: "everword-api", version: VERSION, db: "sqlite", users, words, news });
  }

  /* ---- 注册 ---- */
  if (p === "/api/register" && req.method === "POST") {
    const { name, password } = body || {};
    if (typeof name !== "string" || !/^[A-Za-z0-9_-]{3,24}$/.test(name)) return bad(res, "用户名需为 3-24 位字母、数字、下划线或连字符");
    if (typeof password !== "string" || password.length < 6 || password.length > 128) return bad(res, "密码长度需在 6-128 位之间");
    const dup = db.prepare("SELECT id FROM user WHERE name = ?").get(name);
    if (dup) return bad(res, "该用户名已被注册", 409);
    const info = db.prepare("INSERT INTO user (name, pass) VALUES (?, ?)").run(name, hashPass(password));
    const uid = Number(info.lastInsertRowid);
    const token = sign({ uid, name, exp: Date.now() + TOKEN_DAYS * 86400000 });
    return json(res, 200, { ok: true, token, name, uid });
  }

  /* ---- 登录 ---- */
  if (p === "/api/login" && req.method === "POST") {
    const { name, password } = body || {};
    if (typeof name !== "string" || typeof password !== "string") return bad(res, "参数缺失");
    const u = db.prepare("SELECT id, name, pass FROM user WHERE name = ?").get(name);
    if (!u || !checkPass(password, u.pass)) return bad(res, "用户名或密码错误", 401);
    const token = sign({ uid: u.id, name: u.name, exp: Date.now() + TOKEN_DAYS * 86400000 });
    return json(res, 200, { ok: true, token, name: u.name, uid: u.id });
  }

  /* ---- 词库目录（公开）：级别过滤 / 模糊检索 ---- */
  if (p === "/api/words" && req.method === "GET") {
    const q = (url.searchParams.get("q") || "").trim().toLowerCase();
    const lv = url.searchParams.get("level");
    const LEGAL = ["CET-4", "CET-6", "TEM-8", "IELTS"];
    const limit = Math.min(200, Math.max(1, parseInt(url.searchParams.get("limit"), 10) || 100));
    const COLS = "id, headword, ipa, pos, definition, example, example_zh, level";

    if (q) {
      /* 全库模糊检索：精确 > 前缀 > 包含 > 子序列 > 有界编辑距离 > 释义包含 */
      const all = db.prepare("SELECT " + COLS + " FROM word").all();
      const scored = [];
      for (const r of all) {
        const h = r.headword.toLowerCase();
        let s = 0;
        if (h === q) s = 100;
        else if (h.startsWith(q)) s = 90 - Math.min(10, h.length - q.length);
        else if (h.includes(q)) s = 70 - (h.length - q.length);
        else if (q.length >= 2 && isSubseq(q, h)) s = 50 - Math.min(10, h.length - q.length);
        else if (q.length >= 3) { const d = lev(q, h, 2); if (d >= 0) s = 46 - d * 8; }
        if (!s && r.definition && r.definition.includes(q)) s = 30;
        if (s) scored.push({ r, s });
      }
      scored.sort((a, b) => b.s - a.s || a.r.headword.localeCompare(b.r.headword));
      const words = scored.slice(0, limit).map(x => x.r);
      return json(res, 200, { ok: true, count: words.length, words });
    }

    if (lv && LEGAL.includes(lv)) {
      /* 目录词 level 为逗号连接多级别（如 CET-4,CET-6），用 LIKE 匹配 */
      const rows = db.prepare("SELECT " + COLS + " FROM word WHERE level LIKE ? ORDER BY id LIMIT ?").all("%" + lv + "%", limit);
      return json(res, 200, { ok: true, count: rows.length, words: rows });
    }
    const rows = db.prepare("SELECT " + COLS + " FROM word ORDER BY id LIMIT ?").all(limit);
    return json(res, 200, { ok: true, count: rows.length, words: rows });
  }

  /* ---- 新闻速览（公开）：多源懒刷新，c=1 表示可精读 ---- */
  if (p === "/api/news" && req.method === "GET") {
    const topic = url.searchParams.get("topic");
    const limit = Math.min(200, Math.max(1, parseInt(url.searchParams.get("limit"), 10) || 50));
    const force = url.searchParams.get("refresh") === "1";
    await refreshNews(force);
    const WHERE = topic ? "WHERE topic = ?" : "";
    const args = topic ? [topic, limit] : [limit];
    const rows = db.prepare(
      "SELECT id, title, link, source, topic, published, summary, (content IS NOT NULL) AS c FROM news_item " + WHERE + " ORDER BY published DESC, id DESC LIMIT ?"
    ).all(...args);
    const total = db.prepare("SELECT COUNT(*) AS c FROM news_item").get().c;
    const readable = db.prepare("SELECT COUNT(*) AS c FROM news_item WHERE content IS NOT NULL").get().c;
    const topics = db.prepare("SELECT DISTINCT topic FROM news_item").all().map(x => x.topic);
    return json(res, 200, { ok: true, total, readable, count: rows.length, topics, items: rows, refreshedAt: new Date(newsStamp).toISOString() });
  }

  /* ---- 新闻精读（公开）：单条含正文段落 ---- */
  if (p === "/api/news/item" && req.method === "GET") {
    const id = parseInt(url.searchParams.get("id"), 10);
    if (!id || id < 1) return bad(res, "参数 id 非法");
    const row = db.prepare("SELECT id, title, link, source, topic, published, summary, content FROM news_item WHERE id = ?").get(id);
    if (!row) return bad(res, "条目不存在", 404);
    let paras = null;
    if (row.content) { try { paras = JSON.parse(row.content); } catch (e) { paras = null; } }
    return json(res, 200, { ok: true, item: { id: row.id, title: row.title, link: row.link, source: row.source, topic: row.topic, published: row.published, summary: row.summary, paras } });
  }

  /* ---- 以下接口需要登录 ---- */
  let user = null;
  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) user = verify(auth.slice(7));
  if (!user) return bad(res, "未登录或令牌已失效", 401);

  /* ---- 拉取云同步状态 ---- */
  if (p === "/api/state" && req.method === "GET") {
    const row = db.prepare("SELECT data, updated_at FROM user_state WHERE user_id = ?").get(user.uid);
    let d = { srs: null, stats: null, prog: null, settings: null };
    if (row) {
      try { d = Object.assign(d, JSON.parse(row.data)); } catch (e) {}
      d.updatedAt = row.updated_at;
    }
    return json(res, 200, d);
  }

  /* ---- 保存云同步状态 ---- */
  if (p === "/api/state" && req.method === "PUT") {
    if (!body || typeof body !== "object") return bad(res, "请求体缺失");
    for (const k of ["srs", "stats", "prog", "settings"]) {
      if (body[k] !== undefined && body[k] !== null && typeof body[k] !== "object") return bad(res, "字段 " + k + " 必须为对象");
    }
    if (body.srs && (typeof body.srs.cards !== "object" || body.srs.cards === null || Array.isArray(body.srs.cards))) return bad(res, "srs.cards 非法");
    const payload = {
      srs: body.srs || null,
      stats: body.stats || null,
      prog: body.prog || null,
      settings: body.settings || null
    };
    const str = JSON.stringify(payload);
    if (str.length > STATE_MAX) return bad(res, "状态体积超过上限（512KB）", 413);
    db.prepare(`
      INSERT INTO user_state (user_id, data, updated_at) VALUES (?, ?, datetime('now'))
      ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = datetime('now')
    `).run(user.uid, str);
    try { db.prepare("INSERT INTO sync_log (user_id, action) VALUES (?, 'put-state')").run(user.uid); } catch (e) {}
    return json(res, 200, { ok: true, updatedAt: new Date().toISOString() });
  }

  return bad(res, "接口不存在", 404);
}

/* ---------------- 静态文件 ---------------- */
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif":  "image/gif",
  ".ico":  "image/x-icon",
  ".md":   "text/markdown; charset=utf-8",
  ".txt":  "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2":"font/woff2"
};

function serveStatic(req, res, url) {
  let p = decodeURIComponent(url.pathname);
  if (p === "/") p = "/index.html";
  const fp = path.normalize(path.join(ROOT, p));
  if (!fp.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.stat(fp, (err, stt) => {
    if (err || !stt.isFile()) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); return res.end("404 Not Found"); }
    const ext = path.extname(fp).toLowerCase();
    const isHtml = ext === ".html";
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": isHtml ? "no-cache" : "public, max-age=3600"
    });
    fs.createReadStream(fp).pipe(res);
  });
}

/* ---------------- 服务器 ---------------- */
const server = http.createServer((req, res) => {
  const t0 = Date.now();
  let url;
  try {
    url = new URL(req.url, "http://" + (req.headers.host || "localhost"));
  } catch (e) {
    return bad(res, "bad url");
  }

  if (url.pathname.startsWith("/api/")) {
    if (req.method === "GET" || req.method === "HEAD") {
      handleApi(req, res, url, null).catch(e => {
        console.error("[ev] API error:", e.message);
        if (!res.headersSent) bad(res, "服务器内部错误", 500);
      });
      res.on("finish", () => console.log("[ev] " + req.method + " " + url.pathname + " → " + res.statusCode + " (" + (Date.now() - t0) + "ms)"));
      return;
    }
    /* 读取 JSON 请求体（≤1MB） */
    let chunks = [], size = 0, aborted = false;
    req.on("data", c => {
      size += c.length;
      if (size > 1024 * 1024) { aborted = true; bad(res, "请求体过大", 413); req.destroy(); return; }
      chunks.push(c);
    });
    req.on("end", () => {
      if (aborted) return;
      let body = null;
      if (chunks.length) {
        try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
        catch (e) { return bad(res, "JSON 解析失败"); }
      }
      handleApi(req, res, url, body).catch(e => {
        console.error("[ev] API error:", e.message);
        if (!res.headersSent) bad(res, "服务器内部错误", 500);
      });
      res.on("finish", () => console.log("[ev] " + req.method + " " + url.pathname + " → " + res.statusCode + " (" + (Date.now() - t0) + "ms)"));
    });
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end("Method Not Allowed"); }
  serveStatic(req, res, url);
});

server.listen(PORT, () => {
  console.log("");
  console.log("  EverWord v" + VERSION + "  ·  API + 静态服务器");
  console.log("  ────────────────────────────────────────");
  console.log("  本机访问   http://localhost:" + PORT);
  console.log("  局域网     http://<本机IP>:" + PORT + "（移动端同网可达）");
  console.log("  数据库     " + DB_FILE);
  console.log("  提示       打开页面后右下角/导航栏点「云同步」注册账号");
  console.log("");
  /* 启动即预热新闻源（不阻塞监听） */
  refreshNews(true).catch(() => {});
});

process.on("SIGINT", () => {
  console.log("\n[ev] 正在关闭…");
  try { db.close(); } catch (e) {}
  process.exit(0);
});
