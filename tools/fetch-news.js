#!/usr/bin/env node
/* ============================================================
   EverWord 新闻抓取器 v1.2（零依赖，Node ≥ 18）
   运行：node tools/fetch-news.js
   作用：抓取主流英文媒体 RSS → js/news-data.js（本地快照，供 file:// 模式）
   版权策略：只保存「标题 / 链接 / 来源 / 日期 / 摘要片段」等元数据，
             不复制正文；点击跳转原文出处阅读。
   默认源：CGTN 各版块（中国网络直连可达）；可在 FEEDS 中追加任意 RSS
         （如经济学人 / 卫视 / 路透镜像——网络可达时自动生效）。
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "js", "news-data.js");

const FEEDS = [
  { url: "https://www.cgtn.com/subscribe/rss/section/world.xml",    topic: "政治·世界", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/business.xml", topic: "财经·商业", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/culture.xml",  topic: "文化·艺术", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/opinion.xml",  topic: "观点·评论", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/nature.xml",   topic: "自然·环保", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/travel.xml",   topic: "旅游·人文", source: "CGTN" },
  { url: "https://www.cgtn.com/subscribe/rss/section/sports.xml",   topic: "体育", source: "CGTN" }
];

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";

function clean(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}

async function fetchFeed(feed) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 8000);
  try {
    const r = await fetch(feed.url, { headers: { "User-Agent": UA }, signal: ctl.signal });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.text();
  } finally { clearTimeout(timer); }
}

function parseItems(xml, feed) {
  const items = [];
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  for (const b of blocks) {
    const pick = tag => {
      const m = b.match(new RegExp("<" + tag + ">([\\s\\S]*?)</" + tag + ">", "i"));
      return m ? clean(m[1]) : "";
    };
    const title = pick("title");
    let link = pick("link");
    if (!link) {
      const m = b.match(/<link[^>]*href="([^"]+)"/i);
      if (m) link = m[1];
    }
    const desc = pick("description");
    const pub = pick("pubDate");
    if (!title || !link) continue;
    items.push({
      t: title.slice(0, 220),
      u: link,
      s: feed.source,
      tp: feed.topic,
      d: pub ? new Date(pub).toISOString() : "",
      x: desc.slice(0, 200)
    });
  }
  return items;
}

(async function main() {
  const all = [];
  for (const f of FEEDS) {
    try {
      const xml = await fetchFeed(f);
      const items = parseItems(xml, f);
      console.log("[news] " + f.topic.padEnd(6, " ") + " " + f.source.padEnd(8, " ") + " ✓ " + items.length + " 条");
      all.push(...items);
    } catch (e) {
      console.log("[news] " + f.topic.padEnd(6, " ") + " " + f.source.padEnd(8, " ") + " ✗ " + e.message);
    }
  }
  /* 去重（按链接）并按时间倒序，快照上限 500 条 */
  const seen = new Set();
  const uniq = all.filter(x => !seen.has(x.u) && seen.add(x.u));
  uniq.sort((a, b) => (b.d || "").localeCompare(a.d || ""));
  const capped = uniq.slice(0, 500);
  const topics = [...new Set(capped.map(x => x.tp))];

  const banner = `/* EverWord 新闻快照 v1.2 — tools/fetch-news.js 自动生成（${new Date().toISOString().slice(0, 10)}），请勿手改
   内容：主流英文媒体 RSS 元数据（标题/链接/来源/日期/摘要），不含正文，点击跳原文
   服务器模式（node server/server.js）访问 /api/news 可实时刷新并累积更多条目 */
`;
  fs.writeFileSync(OUT, banner +
    "window.EV_NEWS_SNAPSHOT = " + JSON.stringify({ generated: new Date().toISOString(), count: capped.length, topics, items: capped }) + ";\n");
  console.log("[news] 快照 " + capped.length + " 条（去重前 " + uniq.length + "）→ js/news-data.js");
})();
