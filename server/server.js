#!/usr/bin/env node
/* ============================================================
   EverWord API & 静态服务器 v1.6.0（零依赖）
   运行：node server/server.js   （需 Node.js ≥ 22）
   能力：
   - 静态托管前端（http://localhost:8787）
   - 账号：POST /api/register  POST /api/login（scrypt 口令散列 + HMAC-SHA256 令牌，30 天）
   - 云同步：GET/PUT /api/state（复习卡片 / 统计 / 每日进度 / 设置，最后写入胜出）
   - 管理员：GET /api/admin/overview（账号总览）  GET /api/admin/users（账号清单 + 学习情况）
             POST /api/admin/role（授予/取消管理员）  DELETE /api/admin/user?id=（删除账号）
             GET /api/me/usage（个人视图：普通账号仅见自身使用数据）
             首个注册用户自动成为管理员，或 EV_ADMIN=用户名 指定
   - 词库目录：GET /api/words?level=CET-4|CET-6|TEM-8|IELTS（SQLite 种子库）
              GET /api/words?q=xxx&limit=50（全库模糊检索：精确/前缀/包含/子序列/编辑距离）
   - 新闻速览：GET /api/news?topic=&limit=&refresh=1（懒刷新 30 分钟）
              GET /api/news?q=&date=&days=（标题/摘要多词模糊检索 + 发布日期过滤）
              GET /api/news/stats（表盘：今日/近7天新增、按类型分布、精读占比）
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

const VERSION = "1.8.0";
const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(__dirname, "..", "data");
const DB_FILE = path.join(DATA_DIR, "everword.db");
const SECRET_FILE = path.join(DATA_DIR, ".secret");
/* 环境变量整数读取：未设置或非法时回落默认值（便于调参不改代码） */
const envInt = (k, d) => { const v = parseInt(process.env[k], 10); return Number.isFinite(v) && v >= 0 ? v : d; };
const PORT = parseInt(process.env.PORT, 10) || 8787;
const TOKEN_DAYS = 30;
const STATE_MAX = 512 * 1024; // 单用户状态体积上限
/* 划选翻译（DeepL 兼容接口）：密钥不写入代码——优先环境变量 EV_DEEPL_KEY，
   其次本机文件 data/.deepl_key（已被 .gitignore 排除），均未配置则翻译接口返回 503 */
const DEEPL_API = process.env.EV_DEEPL_API || "https://api.deepl-pro.com/v2/translate";
const DEEPL_KEY = process.env.EV_DEEPL_KEY
  || (() => { try { return fs.readFileSync(path.join(DATA_DIR, ".deepl_key"), "utf8").trim(); } catch (e) { return ""; } })();

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
/* 写锁等待：多进程/多连接并发写时不再立刻抛 SQLITE_BUSY，而是最多等待 N ms 后重试。
   0 = 不等待（SQLite 默认）。可用 SQLITE_BUSY_TIMEOUT 环境变量覆盖。 */
db.exec("PRAGMA busy_timeout = " + envInt("SQLITE_BUSY_TIMEOUT", 5000) + ";");
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

/* 全量词库种子：从 js/vocab-full.js 灌入 CET-4/CET-6/TEM-8/IELTS 全量词汇
   （词目 + 音标 + 词性释义 + 双语例句；替代 v1.2 的仅词目 catalog 模式） */
function seedCatalog() {
  const fp = path.join(ROOT, "js", "vocab-full.js");
  if (!fs.existsSync(fp)) return console.log("[ev] 未找到 js/vocab-full.js，跳过全量词库种子");
  const m = fs.readFileSync(fp, "utf8").match(/window\.EV_FULL\s*=\s*([\s\S]+?);\s*$/);
  if (!m) return console.log("[ev] 全量词库文件格式异常，跳过");
  let data;
  try { data = JSON.parse(m[1]); } catch (e) { return console.log("[ev] 全量词库 JSON 解析失败，跳过"); }
  const total = (data.words || []).length;
  const have = db.prepare("SELECT COUNT(*) AS c FROM word WHERE source IN ('catalog','full')").get().c;
  if (have >= total) return;
  db.exec("DELETE FROM word WHERE source IN ('catalog','full')");
  const ins = db.prepare(
    "INSERT OR IGNORE INTO word (headword, ipa, pos, definition, example, example_zh, level, source) VALUES (?, ?, ?, ?, ?, ?, ?, 'full')"
  );
  db.exec("BEGIN");
  let n = 0;
  for (const x of (data.words || [])) {
    if (ins.run(x.w, x.ipa || null, x.pos || null, x.def || "", x.ex || null, x.zh || null, x.lvs || x.lv).changes > 0) n++;
  }
  db.exec("COMMIT");
  console.log("[ev] 全量词库已灌入 SQLite：" + n + " 词（unique " + total + "）");
}
seedCatalog();

/* v1.6 迁移：账号角色（admin/user）与最近活跃时间；旧库自动补列（已存在则忽略） */
try { db.exec("ALTER TABLE user ADD COLUMN role TEXT NOT NULL DEFAULT 'user'"); } catch (e) {}
try { db.exec("ALTER TABLE user ADD COLUMN last_seen TEXT"); } catch (e) {}
/* 管理员初始化：首个注册用户自动成为管理员；亦可用 EV_ADMIN=用户名 指定提升 */
try {
  if (!db.prepare("SELECT COUNT(*) AS c FROM user WHERE role = 'admin'").get().c) {
    const first = db.prepare("SELECT id FROM user ORDER BY id LIMIT 1").get();
    if (first) db.prepare("UPDATE user SET role = 'admin' WHERE id = ?").run(first.id);
  }
  if (process.env.EV_ADMIN) db.prepare("UPDATE user SET role = 'admin' WHERE name = ?").run(process.env.EV_ADMIN);
} catch (e) {}

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
  { url: "https://www.cgtn.com/subscribe/rss/section/sports.xml",   topic: "体育", source: "CGTN" },
  /* v1.4 国际港航/物流媒体（摘要入库；文章页抓取正文后可站内精读） */
  { url: "https://gcaptain.com/feed/",                         topic: "港航·海事业",   source: "gCaptain" },
  { url: "https://splash247.com/feed/",                        topic: "港航·海运",     source: "Splash247" },
  { url: "https://www.hellenicshippingnews.com/feed/",         topic: "港航·航运日报", source: "Hellenic" },
  { url: "https://theloadstar.com/feed/",                      topic: "物流·供应链",   source: "The Loadstar" },
  { url: "https://container-news.com/feed/",                   topic: "港机·集装箱业", source: "Container News" }
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
/* ---- 抓取配额（均可用环境变量覆盖；0 表示不限）----------------------------
   放大每日真实新增量的三个旋钮：CD_PER_SECTION（每频道每轮）× 频道数 × 每日轮次，
   再叠加 CD_MAX_PER_DAY / NEWS_MAX_PER_DAY 两个每日上限做总量收敛。      */
const CD_PER_SECTION = envInt("CD_PER_SECTION", 24);     /* 每频道每轮最多入库的新文章（原 8） */
const CD_SCAN_LINKS  = Math.max(envInt("CD_SCAN_LINKS", 60), CD_PER_SECTION); /* 频道页候选链接数（需 ≥ 上者） */
const CD_MAX_PER_DAY = envInt("CD_MAX_PER_DAY", 200);    /* China Daily 每日新增上限 */
const NEWS_MAX_PER_DAY = envInt("NEWS_MAX_PER_DAY", 0);  /* 全部来源每日新增上限（0 = 不限） */
const NEWS_TTL_MIN   = envInt("NEWS_TTL_MIN", 30);       /* 懒刷新间隔（分钟）：越小每日轮次越多 */
const NEWS_TTL = NEWS_TTL_MIN * 60 * 1000;
const NEWS_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";
let newsStamp = 0, newsBusy = false;
/* 真实新增统计：upsert 命中旧行（ON CONFLICT DO UPDATE）也会返回 changes=1，
   不能用 changes 判断是否新插入。RSS 分支改用「先批量判定已存在集合」精确区分，
   此处保留总行数用于日志与配额基准。 */
const newsCount = () => Number(db.prepare("SELECT COUNT(*) AS c FROM news_item").get().c);
/* 今日已新增：fetched_at 只在首次 INSERT 时写入（更新分支不触碰），
   因此按本地日期统计即得「今日真实新增量」（跨重启仍有效）。 */
const newsAddedToday = () => Number(db.prepare(
  "SELECT COUNT(*) AS c FROM news_item WHERE date(fetched_at, 'localtime') = date('now', 'localtime')").get().c);
const newsAddedTodayBy = src => Number(db.prepare(
  "SELECT COUNT(*) AS c FROM news_item WHERE source = ? AND date(fetched_at, 'localtime') = date('now', 'localtime')").get(src).c);
/* 按块执行 IN (...) 查询：条目数增长后也不会撞上 SQLITE_MAX_VARIABLE_NUMBER */
function selectIn(links, sql) {
  const out = [];
  for (let i = 0; i < links.length; i += 400) {
    const chunk = links.slice(i, i + 400);
    if (!chunk.length) continue;
    const ph = "(" + chunk.map(() => "?").join(",") + ")";
    out.push(...db.prepare(sql.replace("__IN__", ph)).all(...chunk));
  }
  return out;
}
const existsLinks = links => new Set(selectIn(links, "SELECT link FROM news_item WHERE link IN __IN__").map(r => r.link));

/* v1.4 港航媒体文章页抓取：这些源的 RSS 只有摘要，正文须访问文章页提取。
   通用 WordPress 风格提取（<p> 段落 + 长度/词数过滤导航噪声），失败仅保留摘要。 */
const WP_ARTICLE_SOURCES = new Set(["gCaptain", "Splash247", "Hellenic", "The Loadstar", "Container News"]);
const WP_FETCH_MAX = envInt("WP_FETCH_MAX", 20);   /* 每轮最多抓正文的新文章数（原 6） */
const WP_FAIL_BACKOFF = 2 * 60 * 60 * 1000;   /* 解析失败条目 2 小时内不再重试（防付费墙/空正文反复占用名额） */
const wpFailMark = new Map();   /* link → 最近失败时间戳 */

function parseWpArticle(html) {
  const ps = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map(m => htmlClean(m[1].replace(/<[^>]+>/g, " ")))
    .filter(x => {
      if (x.length < 110 || x.length > 900) return false;
      const words = x.split(/\s+/).length;
      if (words < 18) return false;
      return !/^(Advertise|Subscribe|Jobs|Forum|Share|Follow|Related|Tagged|Photo|Image)/i.test(x);
    });
  if (ps.length < 3) return null;
  return ps.slice(0, 30);
}

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
  let processed = 0, cdProcessed = 0;   /* 本轮处理条数（含已存在、仅刷新字段的条目） */
  const wpPending = [];   /* v1.4：港航媒体无全文条目（待抓文章页正文） */
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
    /* 先解析出本轮全部条目，再批量判定哪些链接已入库 → 精确区分「新增」与「更新」 */
    const items = [];
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
        items.push({ link, title, source: f.source, topic: f.topic, pub,
                     summary: pick("description").slice(0, 200),
                     content: paras ? JSON.stringify(paras) : null });
      }
    }
    const known = existsLinks(items.map(x => x.link));
    /* DO NOTHING：冲突时 changes=0，可精确判定「是否真的插入」，且不会因并发写入抛唯一约束错误 */
    const insNews = db.prepare(
      "INSERT INTO news_item (link, title, source, topic, published, summary, content) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(link) DO NOTHING");
    const updNews = db.prepare(
      "UPDATE news_item SET content = COALESCE(?, content), summary = COALESCE(NULLIF(summary, ''), ?) WHERE link = ?");
    /* 每日总配额（0 = 不限）：以今日已新增量为基准扣减，跨重启依然有效 */
    let quota = NEWS_MAX_PER_DAY ? Math.max(0, NEWS_MAX_PER_DAY - newsAddedToday()) : Infinity;
    let rssAdded = 0, rssUpdated = 0, rssSkipped = 0;
    db.exec("BEGIN");
    for (const x of items) {
      processed++;
      if (known.has(x.link)) {            /* 已存在：仅补齐正文/摘要，不计入新增 */
        updNews.run(x.content, x.summary, x.link);
        rssUpdated++;
      } else if (quota <= 0) {            /* 今日配额用尽：本轮不再入库 */
        rssSkipped++;
      } else {
        /* changes=0 表示链接已存在（同轮重复或被并发写入抢先插入）→ 不计新增 */
        if (insNews.run(x.link, x.title, x.source, x.topic, x.pub, x.summary, x.content).changes > 0) { rssAdded++; quota--; }
        else rssUpdated++;
        known.add(x.link);
      }
      if (!x.content && WP_ARTICLE_SOURCES.has(x.source)) wpPending.push(x.link);
    }
    db.exec("COMMIT");

    /* ---- ①b 港航媒体文章页 → 提取正文（每轮限流，对源友好） ---- */
    if (wpPending.length) {
      try {
        const rows = selectIn(wpPending, "SELECT link, content FROM news_item WHERE link IN __IN__");
        const hasC = new Set(rows.filter(r => r.content && r.content.length > 10).map(r => r.link));
        const now = Date.now();
        const tasks = wpPending.filter(u => !hasC.has(u) && !(wpFailMark.get(u) > now - WP_FAIL_BACKOFF)).slice(0, WP_FETCH_MAX);
        console.log("[ev] WP 抓取：待补 " + wpPending.length + " 条，本轮任务 " + tasks.length + " 条");
        if (tasks.length) {
          const arts = await Promise.allSettled(tasks.map(u => httpGet(u, 9000)));
          let wpAdded = 0, wpFail = 0;
          db.exec("BEGIN");
          const upd = db.prepare("UPDATE news_item SET content = ? WHERE link = ?");
          arts.forEach((a, i) => {
            if (a.status !== "fulfilled") { wpFailMark.set(tasks[i], Date.now()); wpFail++; return; }
            const paras = parseWpArticle(a.value);
            if (paras) { upd.run(JSON.stringify(paras), tasks[i]); wpAdded++; }
            else { wpFailMark.set(tasks[i], Date.now()); wpFail++; }
          });
          db.exec("COMMIT");
          console.log("[ev] 港航媒体正文抓取：" + wpAdded + " 篇可站内精读" + (wpFail ? "（" + wpFail + " 篇失败，2 小时后重试）" : ""));
        }
      } catch (e) { console.log("[ev] WP 抓取异常：" + e.message); }
    }

    /* ---- ② China Daily：频道页发现新文章 → 提取正文 ---- */
    let cdToday = newsAddedTodayBy("China Daily");   /* 今日已新增（按 fetched_at 统计，跨重启有效） */
    let cdAdded = 0;
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
        )].slice(0, CD_SCAN_LINKS);
        if (!links.length) continue;
        /* 本频道剩余额度 = 每日上限 − 今日已新增（含本轮已入库的）− 全局配额 */
        const left = Math.min(
          CD_PER_SECTION,
          CD_MAX_PER_DAY ? Math.max(0, CD_MAX_PER_DAY - cdToday) : CD_PER_SECTION,
          quota === Infinity ? CD_PER_SECTION : Math.max(0, quota)
        );
        if (left <= 0) continue;
        const known = existsLinks(links);
        const fresh = links.filter(u => !known.has(u)).slice(0, left);
        if (!fresh.length) continue;
        const arts = await Promise.allSettled(fresh.map(u => httpGet(u, 8000)));
        db.exec("BEGIN");
        let insCnt = 0;
        arts.forEach((a, i) => {
          if (a.status !== "fulfilled") return;
          const parsed = parseCdArticle(a.value);
          if (!parsed) return;
          upsert.run(fresh[i], parsed.title, "China Daily", sec.topic, parsed.published,
              parsed.paras[0].slice(0, 200), JSON.stringify(parsed.paras));
          insCnt++;
        });
        db.exec("COMMIT");
        cdProcessed += insCnt; cdAdded += insCnt; cdToday += insCnt; quota -= insCnt;
      } catch (e) { /* 单频道失败不影响其他 */ }
    }
    newsStamp = Date.now();
    if (processed || cdProcessed) {
      const newCnt = rssAdded + cdAdded;
      console.log("[ev] 新闻刷新：处理 " + (processed + cdProcessed) + " 条（RSS " + processed + " / China Daily " + cdProcessed + "）"
        + "；真实新增 " + newCnt + " 条（RSS " + rssAdded + " / China Daily " + cdAdded + "）"
        + "；更新已有 " + rssUpdated + " 条"
        + (rssSkipped ? "（" + rssSkipped + " 条因每日配额未入库）" : "")
        + "；今日累计新增 " + newsAddedToday() + " 条"
        + "；入库总量 " + newsCount() + " 条");
    }
  } catch (e) {
    console.log("[ev] 新闻刷新失败：" + e.message);
    try { db.exec("ROLLBACK"); } catch (e2) {}
  } finally {
    newsBusy = false;
  }
}

/* ---------------- API 处理 ---------------- */
/* 账号使用情况聚合：解析 user_state JSON → 卡片 / 连续 / 正确率 / 今日活动 / 设置
   （管理员看全部账号、普通账号看自己，共用同一口径） */
function usageFromRow(r) {
  const now = new Date();
  const p2 = n => String(n).padStart(2, "0");
  const todayKey = now.getFullYear() + "-" + p2(now.getMonth() + 1) + "-" + p2(now.getDate());
  let st = {};
  try { st = JSON.parse(r.raw || "{}") || {}; } catch (e) {}
  const cards = st.srs && st.srs.cards ? Object.values(st.srs.cards) : [];
  const stats = st.stats || {};
  const prog = st.prog || {};
  const settings = st.settings || {};
  return {
    id: r.id, name: r.name, role: r.role || "user",
    createdAt: r.created_at, lastSeen: r.last_seen, syncedAt: r.synced_at,
    bytes: Number(r.bytes || 0),
    cards: cards.length,
    learned: cards.filter(c => c.reps >= 1).length,
    due: cards.filter(c => (c.due || 0) <= Date.now()).length,
    streak: stats.streak | 0,
    best: stats.best | 0,
    acc: stats.quizTotal ? Math.round((stats.quizCorrect || 0) / stats.quizTotal * 100) : null,
    quizTotal: stats.quizTotal | 0,
    activeToday: prog.date === todayKey && ((prog.words | 0) > 0 || (prog.read || []).length > 0 || prog.quiz === true),
    level: settings.level || "",
    newPerDay: settings.newPerDay || null
  };
}

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
    const isFirst = db.prepare("SELECT COUNT(*) AS c FROM user").get().c === 0;
    const role = isFirst ? "admin" : "user";   /* 首个注册用户自动成为管理员 */
    const info = db.prepare("INSERT INTO user (name, pass, role) VALUES (?, ?, ?)").run(name, hashPass(password), role);
    const uid = Number(info.lastInsertRowid);
    const token = sign({ uid, name, exp: Date.now() + TOKEN_DAYS * 86400000 });
    return json(res, 200, { ok: true, token, name, uid, role });
  }

  /* ---- 登录 ---- */
  if (p === "/api/login" && req.method === "POST") {
    const { name, password } = body || {};
    if (typeof name !== "string" || typeof password !== "string") return bad(res, "参数缺失");
    const u = db.prepare("SELECT id, name, pass, role FROM user WHERE name = ?").get(name);
    if (!u || !checkPass(password, u.pass)) return bad(res, "用户名或密码错误", 401);
    const token = sign({ uid: u.id, name: u.name, exp: Date.now() + TOKEN_DAYS * 86400000 });
    return json(res, 200, { ok: true, token, name: u.name, uid: u.id, role: u.role || "user" });
  }

  /* ---- 词库目录（公开）：级别过滤 / 模糊检索 ---- */
  if (p === "/api/words" && req.method === "GET") {
    const q = (url.searchParams.get("q") || "").trim().toLowerCase();
    const lv = url.searchParams.get("level");
    const LEGAL = ["CET-4", "CET-6", "TEM-8", "IELTS"];
    const limit = Math.min(5000, Math.max(1, parseInt(url.searchParams.get("limit"), 10) || 100));
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

  /* ---- 新闻统计（公开）：表盘数据 —— 每日新增走势 / 类型分布 / 精读占比 ---- */
  if (p === "/api/news/stats" && req.method === "GET") {
    const total = Number(db.prepare("SELECT COUNT(*) AS c FROM news_item").get().c);
    const readable = Number(db.prepare("SELECT COUNT(*) AS c FROM news_item WHERE content IS NOT NULL").get().c);
    const dayCond = "date(fetched_at, 'localtime')";
    const today = {
      total: newsAddedToday(),
      bySource: db.prepare("SELECT source AS k, COUNT(*) AS n FROM news_item WHERE " + dayCond + " = date('now', 'localtime') GROUP BY source ORDER BY n DESC").all().map(x => ({ k: x.k, n: Number(x.n) })),
      byTopic: db.prepare("SELECT topic AS k, COUNT(*) AS n FROM news_item WHERE " + dayCond + " = date('now', 'localtime') GROUP BY topic ORDER BY n DESC LIMIT 8").all().map(x => ({ k: x.k, n: Number(x.n) }))
    };
    const recent = new Map(db.prepare(
      "SELECT " + dayCond + " AS d, COUNT(*) AS n FROM news_item WHERE " + dayCond + " >= date('now', 'localtime', '-6 day', 'start of day') GROUP BY d"
    ).all().map(x => [x.d, Number(x.n)]));
    const p2 = n => String(n).padStart(2, "0");
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate());
      days.push({ d: key, n: recent.get(key) || 0 });
    }
    const bySource = db.prepare(
      "SELECT source AS k, COUNT(*) AS n, SUM(content IS NOT NULL) AS rd FROM news_item GROUP BY source ORDER BY n DESC"
    ).all().map(x => ({ k: x.k, n: Number(x.n), readable: Number(x.rd || 0) }));
    return json(res, 200, { ok: true, total, readable, today, days, bySource, generatedAt: new Date().toISOString() });
  }

  /* ---- 新闻速览（公开）：多源懒刷新，c=1 表示可精读；
         q=标题/摘要多词模糊检索（AND 语义，标题命中优先），date=YYYY-MM-DD / days=N 按发布日期过滤 ---- */
  if (p === "/api/news" && req.method === "GET") {
    const topic = url.searchParams.get("topic");
    const limit = Math.min(200, Math.max(1, parseInt(url.searchParams.get("limit"), 10) || 50));
    const force = url.searchParams.get("refresh") === "1";
    const q = (url.searchParams.get("q") || "").trim().slice(0, 80);
    const date = (url.searchParams.get("date") || "").trim();
    const days = Math.min(365, Math.max(1, parseInt(url.searchParams.get("days"), 10) || 0));
    await refreshNews(force);
    /* 条件拼装：topic / date / days / q（多 token AND 语义；LIKE 对 ASCII 大小写不敏感） */
    const cond = [], args = [];
    if (topic) { cond.push("topic = ?"); args.push(topic); }
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      cond.push("published IS NOT NULL AND date(published, 'localtime') = date(?)"); args.push(date);
    } else if (days) {
      cond.push("published IS NOT NULL AND date(published, 'localtime') >= date('now', 'localtime', ?)"); args.push("-" + days + " day");
    }
    const toks = q ? q.split(/\s+/).filter(Boolean).slice(0, 8) : [];
    for (const t of toks) {
      cond.push("(title LIKE ? OR summary LIKE ?)");
      args.push("%" + t + "%", "%" + t + "%");
    }
    const WHERE = cond.length ? "WHERE " + cond.join(" AND ") : "";
    const matched = cond.length
      ? Number(db.prepare("SELECT COUNT(*) AS c FROM news_item " + WHERE).get(...args).c)
      : Number(db.prepare("SELECT COUNT(*) AS c FROM news_item").get().c);
    let rows = db.prepare(
      "SELECT id, title, link, source, topic, published, summary, (content IS NOT NULL) AS c FROM news_item " + WHERE + " ORDER BY published DESC, id DESC LIMIT 600"
    ).all(...args);
    /* 关键词相关度排序：标题命中权重远高于摘要；无 q 时保持发布时间序 */
    if (toks.length) {
      const low = s => String(s || "").toLowerCase();
      const score = r => {
        const t = low(r.title), s = low(r.summary);
        let sc = 0;
        for (const k of toks) sc += (t.includes(k) ? 10 : 0) + (s.includes(k) ? 4 : 0);
        return sc;
      };
      rows = rows.slice().sort((a, b) => score(b) - score(a));
    }
    rows = rows.slice(0, limit);
    const total = Number(db.prepare("SELECT COUNT(*) AS c FROM news_item").get().c);
    const readable = Number(db.prepare("SELECT COUNT(*) AS c FROM news_item WHERE content IS NOT NULL").get().c);
    const topics = db.prepare("SELECT DISTINCT topic FROM news_item").all().map(x => x.topic);
    return json(res, 200, { ok: true, total, readable, matched, count: rows.length, topics, items: rows,
      q: q || null, date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null, days: days || 0,
      refreshedAt: new Date(newsStamp).toISOString() });
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

  /* ---- 划选翻译（公开）：DeepL 兼容接口代理，规避浏览器跨域；密钥未配置时明确提示 ---- */
  if (p === "/api/translate" && req.method === "POST") {
    if (!DEEPL_KEY) return bad(res, "未配置翻译密钥：请设置环境变量 EV_DEEPL_KEY 或创建 data/.deepl_key 文件", 503);
    const text = String((body && body.text) || "").trim();
    if (!text) return bad(res, "text 不能为空");
    if (text.length > 2500) return bad(res, "文本过长（上限 2500 字符）", 413);
    const target = body.target === "EN" ? "EN" : "ZH";
    try {
      const r = await fetch(DEEPL_API, {
        method: "POST",
        headers: { "Authorization": "DeepL-Auth-Key " + DEEPL_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ text: [text], target_lang: target }),
        signal: AbortSignal.timeout(12000)
      });
      const j = await r.json().catch(() => ({}));
      const out = j && j.translations && j.translations[0] && j.translations[0].text;
      if (!r.ok || !out) return bad(res, (j && (j.message || j.error)) || ("DeepL HTTP " + r.status), 502);
      return json(res, 200, { ok: true, text: out, lang: (j.translations[0].detected_source_language || "") });
    } catch (e) {
      return bad(res, "翻译服务不可用：" + e.message, 502);
    }
  }

  /* ---- 以下接口需要登录 ---- */
  let user = null;
  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) user = verify(auth.slice(7));
  if (!user) return bad(res, "未登录或令牌已失效", 401);
  /* 角色实时读库（令牌不携带角色，便于提升/降权即时生效）；顺便记最近活跃 */
  const urow = db.prepare("SELECT role FROM user WHERE id = ?").get(user.uid);
  if (!urow) return bad(res, "账号不存在或已注销", 401);   /* 令牌指向已删除的账号 → 立即失效 */
  user.role = urow.role || "user";
  user.isAdmin = user.role === "admin";
  try { db.prepare("UPDATE user SET last_seen = datetime('now') WHERE id = ?").run(user.uid); } catch (e) {}

  /* ---- 管理员：账号总览 ---- */
  if (p === "/api/admin/overview" && req.method === "GET") {
    if (!user.isAdmin) return bad(res, "需要管理员权限", 403);
    const q1 = s => Number(db.prepare(s).get().c);
    return json(res, 200, {
      ok: true,
      users: q1("SELECT COUNT(*) AS c FROM user"),
      admins: q1("SELECT COUNT(*) AS c FROM user WHERE role = 'admin'"),
      activeToday: q1("SELECT COUNT(*) AS c FROM user WHERE last_seen IS NOT NULL AND date(last_seen, 'localtime') = date('now', 'localtime')"),
      syncsToday: q1("SELECT COUNT(*) AS c FROM sync_log WHERE date(created_at, 'localtime') = date('now', 'localtime')"),
      newsToday: newsAddedToday(),
      newsTotal: q1("SELECT COUNT(*) AS c FROM news_item"),
      generatedAt: new Date().toISOString()
    });
  }

  /* ---- 管理员：账号清单 + 学习情况（卡片/连续/正确率/今日活动/设置） ---- */
  if (p === "/api/admin/users" && req.method === "GET") {
    if (!user.isAdmin) return bad(res, "需要管理员权限", 403);
    const rows = db.prepare(`
      SELECT u.id, u.name, u.role, u.created_at, u.last_seen,
             s.updated_at AS synced_at, LENGTH(s.data) AS bytes, s.data AS raw
      FROM user u LEFT JOIN user_state s ON s.user_id = u.id
      ORDER BY (s.updated_at IS NULL), s.updated_at DESC, u.id
    `).all();
    return json(res, 200, { ok: true, count: rows.length, users: rows.map(usageFromRow) });
  }

  /* ---- 个人视图：普通账号进入后台只看自己的使用数据 ---- */
  if (p === "/api/me/usage" && req.method === "GET") {
    const r = db.prepare(`
      SELECT u.id, u.name, u.role, u.created_at, u.last_seen,
             s.updated_at AS synced_at, LENGTH(s.data) AS bytes, s.data AS raw
      FROM user u LEFT JOIN user_state s ON s.user_id = u.id WHERE u.id = ?
    `).get(user.uid);
    return json(res, 200, { ok: true, user: usageFromRow(r) });
  }

  /* ---- 管理员：授予 / 取消管理员权限 ---- */
  if (p === "/api/admin/role" && req.method === "POST") {
    if (!user.isAdmin) return bad(res, "需要管理员权限", 403);
    const id = parseInt(body.id, 10);
    const role = body.role === "admin" ? "admin" : "user";
    if (!id || id < 1) return bad(res, "参数 id 非法");
    if (id === user.uid && role !== "admin") return bad(res, "不能取消自己的管理员权限（请由其他管理员操作）", 400);
    const info = db.prepare("UPDATE user SET role = ? WHERE id = ?").run(role, id);
    if (!info.changes) return bad(res, "账号不存在", 404);
    return json(res, 200, { ok: true, id, role });
  }

  /* ---- 管理员删除账号（不能删自己；连带清理云同步状态与同步日志） ---- */
  if (p === "/api/admin/user" && req.method === "DELETE") {
    if (!user.isAdmin) return bad(res, "需要管理员权限", 403);
    const id = parseInt(url.searchParams.get("id"), 10);
    if (!id || id < 1) return bad(res, "参数 id 非法");
    if (id === user.uid) return bad(res, "不能删除当前登录的管理员自己", 400);
    db.prepare("DELETE FROM user_state WHERE user_id = ?").run(id);
    db.prepare("DELETE FROM sync_log WHERE user_id = ?").run(id);
    const info = db.prepare("DELETE FROM user WHERE id = ?").run(id);
    if (!info.changes) return bad(res, "账号不存在", 404);
    return json(res, 200, { ok: true });
  }

  /* ---- 注销自己的账号（冒烟测试自清理 / 用户自助注销） ---- */
  if (p === "/api/account" && req.method === "DELETE") {
    db.prepare("DELETE FROM user_state WHERE user_id = ?").run(user.uid);
    db.prepare("DELETE FROM sync_log WHERE user_id = ?").run(user.uid);
    db.prepare("DELETE FROM user WHERE id = ?").run(user.uid);
    return json(res, 200, { ok: true });
  }

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
    /* HTML/JS/CSS 每次协商缓存（本机服务，零延迟成本），避免发版后浏览器拿旧脚本；
       图片/字体等静态资源仍可缓存 1 小时 */
    const noCache = [".html", ".js", ".mjs", ".css", ".json"].includes(ext);
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": noCache ? "no-cache" : "public, max-age=3600"
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
  console.log("  翻译       " + (DEEPL_KEY ? "DeepL 已配置（/api/translate 可用）" : "未配置密钥（设置 EV_DEEPL_KEY 或 data/.deepl_key 后可用）"));
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
