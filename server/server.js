#!/usr/bin/env node
/* ============================================================
   EverWord API & 静态服务器 v1.1.0（零依赖）
   运行：node server/server.js   （需 Node.js ≥ 22）
   能力：
   - 静态托管前端（http://localhost:8787）
   - 账号：POST /api/register  POST /api/login（scrypt 口令散列 + HMAC-SHA256 令牌，30 天）
   - 云同步：GET/PUT /api/state（复习卡片 / 统计 / 每日进度 / 设置，最后写入胜出）
   - 词库目录：GET /api/words?level=CET-4|CET-6|TEM-8|IELTS（SQLite 种子库）
   数据库：默认内置 SQLite（data/everword.db，WAL）；MySQL 8 建表脚本见 server/mysql-schema.sql
   ============================================================ */

"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const VERSION = "1.1.0";
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
CREATE TABLE IF NOT EXISTS sync_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL,
  action     TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
`);

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

/* ---------------- API 处理 ---------------- */
async function handleApi(req, res, url, body) {
  const p = url.pathname;

  /* ---- 健康检查 ---- */
  if (p === "/api/health" && req.method === "GET") {
    const users = db.prepare("SELECT COUNT(*) AS c FROM user").get().c;
    const words = db.prepare("SELECT COUNT(*) AS c FROM word").get().c;
    return json(res, 200, { ok: true, name: "everword-api", version: VERSION, db: "sqlite", users, words });
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

  /* ---- 词库目录（公开） ---- */
  if (p === "/api/words" && req.method === "GET") {
    const lv = url.searchParams.get("level");
    const LEGAL = ["CET-4", "CET-6", "TEM-8", "IELTS"];
    let rows;
    if (lv && LEGAL.includes(lv)) {
      rows = db.prepare("SELECT id, headword, ipa, pos, definition, example, example_zh, level FROM word WHERE level = ? ORDER BY id").all(lv);
    } else {
      rows = db.prepare("SELECT id, headword, ipa, pos, definition, example, example_zh, level FROM word ORDER BY id").all();
    }
    return json(res, 200, { ok: true, count: rows.length, words: rows });
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
});

process.on("SIGINT", () => {
  console.log("\n[ev] 正在关闭…");
  try { db.close(); } catch (e) {}
  process.exit(0);
});
