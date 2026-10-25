/* EverWord 共享层 —— 导航激活 / 入场动画 / Toast / 悬浮取词 / 通用工具 */

/* 级别 → 样式类 */
const lvClass = lv => lv === "CET-4" ? "c4" : lv === "CET-6" ? "c6" : lv === "TEM-8" ? "t8" : "ie";

/* HTML 转义（搜索结果 / 新闻标题等动态内容渲染前必须经过） */
const escHtml = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- 日期 / 连续天数渲染 ---------- */
const WEEK = ["日", "一", "二", "三", "四", "五", "六"];
function renderDates() {
  const d = new Date();
  const s = (d.getMonth() + 1) + "月" + d.getDate() + "日 · 周" + WEEK[d.getDay()];
  document.querySelectorAll("[data-date]").forEach(el => { el.textContent = s; });
}
function renderStreak() {
  document.querySelectorAll("[data-streak]").forEach(el => { el.textContent = Stats.streak; });
}

/* ---------- Toast ---------- */
let _toastT = null;
function toast(msg) {
  let el = document.querySelector("#toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(_toastT);
  _toastT = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ---------- 入场动画（IntersectionObserver） ---------- */
function initReveal() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll(".rv").forEach((el, i) => {
    el.style.transitionDelay = ((i % 5) * 60) + "ms";
    io.observe(el);
  });
  setTimeout(() => document.querySelectorAll(".rv:not(.in)").forEach(el => el.classList.add("in")), 1400);
}

/* ---------- 已掌握单词列表（Anki 式浏览弹层，单词页 / 首页共用） ---------- */
const MasteredList = (() => {
  let mask = null;

  function dueChip(due) {
    if (due <= Date.now()) return '<span class="ml-due warn">已到期 · 待复习</span>';
    const days = Math.round((due - startOfDay()) / DAY);
    return '<span class="ml-due">' + (days <= 1 ? "明天复习" : days + " 天后复习") + "</span>";
  }

  function rowHtml(x) {
    return '<div class="ml-row">'
      + '<div class="ml-top">'
      +   '<span class="ml-w">' + escHtml(x.w) + "</span>"
      +   (x.ipa ? '<span class="ml-ipa">' + escHtml(x.ipa) + "</span>" : "")
      +   '<span class="chip ' + lvClass(x.lv) + '">' + escHtml(x.lv) + "</span>"
      +   dueChip(x.due)
      + "</div>"
      + (x.def ? '<p class="ml-def">' + (x.pos ? '<span class="ml-pos">' + escHtml(x.pos) + "</span>" : "") + escHtml(x.def) + "</p>" : "")
      + "</div>";
  }

  function renderList(listEl, countEl, items, kw) {
    const q = (kw || "").trim().toLowerCase();
    const hit = q ? items.filter(x => x.w.toLowerCase().includes(q) || (x.def || "").toLowerCase().includes(q)) : items;
    countEl.textContent = q ? hit.length + " / " + items.length : items.length;
    listEl.innerHTML = hit.length
      ? hit.map(rowHtml).join("")
      : '<div class="ml-empty">' + (items.length ? "没有匹配「" + escHtml(q) + "」的单词" : "还没有已掌握的单词 —— 去单词页完成今日队列吧") + "</div>";
  }

  function open(level) {
    if (!mask) {
      mask = document.createElement("div");
      mask.id = "ml-mask";
      mask.addEventListener("click", e => { if (e.target === mask) close(); });
      document.body.appendChild(mask);
      document.addEventListener("keydown", e => { if (e.key === "Escape" && mask.classList.contains("show")) close(); });
    }
    const items = SRS.masteredList(level).sort((a, b) => a.due - b.due || a.w.localeCompare(b.w));
    mask.innerHTML = '<div class="ml-panel" role="dialog" aria-modal="true" aria-label="已掌握单词列表">'
      + '<div class="ml-head">'
      +   "<div>"
      +     '<span class="eyebrow">Mastered · ' + escHtml(level || "全部") + "</span>"
      +     '<h3 class="ml-title">已掌握单词 <b class="ml-count" id="ml-count">' + items.length + "</b></h3>"
      +   "</div>"
      +   '<button class="ml-close" data-ml="close" aria-label="关闭">✕</button>'
      + "</div>"
      + '<div class="ml-search"><input id="ml-q" type="search" placeholder="筛选单词或释义…" autocomplete="off" spellcheck="false"></div>'
      + '<div class="ml-list" id="ml-list"></div>'
      + '<p class="ml-note">口径与统计一致：完成过至少 1 次复习的词；到期卡会自动回到复习队列。</p>'
      + "</div>";
    const listEl = mask.querySelector("#ml-list");
    const countEl = mask.querySelector("#ml-count");
    const qIn = mask.querySelector("#ml-q");
    qIn.addEventListener("input", () => renderList(listEl, countEl, items, qIn.value));
    mask.querySelector("[data-ml='close']").addEventListener("click", close);
    renderList(listEl, countEl, items, "");
    mask.classList.add("show");
    setTimeout(() => qIn.focus(), 200);
  }

  function close() { if (mask) mask.classList.remove("show"); }

  return { open, close };
})();

/* ---------- 生词本管理弹层（单词页/阅读页/搜索收藏统一入本；Anki 式浏览） ---------- */
const VocabBank = (() => {
  let mask = null;

  function rowHtml(x) {
    const st = x.reps === 0
      ? '<span class="ml-due warn">待学习 · 明日入队</span>'
      : (x.due <= Date.now() ? '<span class="ml-due warn">已到期 · 待复习</span>' : '<span class="ml-due">复习中</span>');
    return '<div class="ml-row" data-w="' + escHtml(x.w) + '">'
      + '<div class="ml-top">'
      +   '<span class="ml-w">' + escHtml(x.w) + "</span>"
      +   (x.ipa ? '<span class="ml-ipa">' + escHtml(x.ipa) + "</span>" : "")
      +   '<span class="chip ' + lvClass(x.lv) + '">' + escHtml(x.lv) + "</span>"
      +   st
      + "</div>"
      + '<div class="ml-def">' + (x.pos ? '<span class="ml-pos">' + escHtml(x.pos) + "</span>" : "") + escHtml(x.def) + "</div>"
      + '<div class="vb-acts">'
      +   '<button class="vb-btn" data-vb="say" data-w="' + escHtml(x.w) + '">' + ICONS.speaker + "<span>发音</span></button>"
      +   '<button class="vb-btn vb-del" data-vb="del" data-w="' + escHtml(x.w) + '">' + ICONS.cross + "<span>移出生词本</span></button>"
      + "</div>"
      + "</div>";
  }

  function renderList(listEl, countEl, items, kw) {
    const q = (kw || "").trim().toLowerCase();
    const hit = q ? items.filter(x => x.w.toLowerCase().includes(q) || (x.def || "").toLowerCase().includes(q)) : items;
    countEl.textContent = q ? hit.length + " / " + items.length : items.length;
    listEl.innerHTML = hit.length
      ? hit.map(rowHtml).join("")
      : '<div class="ml-empty">' + (items.length ? "没有匹配「" + escHtml(q) + "」的单词" : "生词本还是空的 —— 单词卡、阅读页与取词气泡里都可以收藏") + "</div>";
  }

  function open() {
    if (!mask) {
      mask = document.createElement("div");
      mask.id = "ml-mask";
      mask.addEventListener("click", e => { if (e.target === mask) close(); });
      document.body.appendChild(mask);
      document.addEventListener("keydown", e => { if (e.key === "Escape" && mask.classList.contains("show")) close(); });
    }
    const items = SRS.vocabList();
    mask.innerHTML = '<div class="ml-panel" role="dialog" aria-modal="true" aria-label="生词本">'
      + '<div class="ml-head">'
      +   "<div>"
      +     '<span class="eyebrow">Vocab Bank · 生词本</span>'
      +     '<h3 class="ml-title">我的生词 <b class="ml-count" id="vb-count">' + items.length + "</b></h3>"
      +   "</div>"
      +   '<button class="ml-close" data-vb="close" aria-label="关闭">✕</button>'
      + "</div>"
      + '<div class="ml-search"><input id="vb-q" type="search" placeholder="筛选单词或释义…" autocomplete="off" spellcheck="false"></div>'
      + '<div class="ml-list" id="vb-list"></div>'
      + '<p class="ml-note">单词卡、阅读词汇栏、悬浮取词与搜索详情收藏的词统一进入本生词本；新词次日开始复习，移出后未学过的卡片一并删除。</p>'
      + "</div>";
    const listEl = mask.querySelector("#vb-list");
    const countEl = mask.querySelector("#vb-count");
    const qIn = mask.querySelector("#vb-q");
    const rerender = () => {
      const cur = SRS.vocabList();
      renderList(listEl, countEl, cur, qIn.value);
    };
    qIn.addEventListener("input", () => renderList(listEl, countEl, SRS.vocabList(), qIn.value));
    mask.querySelector("[data-vb='close']").addEventListener("click", close);
    listEl.addEventListener("click", e => {
      const b = e.target.closest(".vb-btn");
      if (!b) return;
      const w = b.dataset.w;
      if (b.dataset.vb === "say") {
        if (!TTS.speak(w)) toast("当前浏览器不支持语音合成");
      } else if (SRS.removeVocab(w)) {
        toast("已移出生词本");
        rerender();
      }
    });
    renderList(listEl, countEl, items, "");
    mask.classList.add("show");
    setTimeout(() => qIn.focus(), 200);
  }

  function close() { if (mask) mask.classList.remove("show"); }

  return { open, close };
})();

/* ---------- 划选翻译（正文/精读划选即自动出译文；滚动时译文跟随选区，点外部才关闭，参考沉浸式翻译/沙拉查词交互） ---------- */
const SelTrans = (() => {
  const DEEPL_URL = "https://deepl-pro.com/#/translate?referral_code=h6uXFxH99w";
  let pop = null, selText = "", transText = "", anchor = { x: 0, y: 0 };
  let selRange = null, abortCtl = null;

  function fallbackCopy(t) {
    const ta = document.createElement("textarea");
    ta.value = t;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }
  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).catch(() => fallbackCopy(t));
    else fallbackCopy(t);
  }

  function openDeepl() {
    copyText(selText);
    window.open(DEEPL_URL + "&text=" + encodeURIComponent(selText), "_blank", "noopener");
  }

  const BTN = {
    say:   '<button class="spt-btn" data-act="say" title="朗读选中文本">' + ICONS.speaker + "<span>发音</span></button>",
    copy:  '<button class="spt-btn" data-act="copy" title="复制选中文本">' + ICONS.copy + "<span>复制</span></button>",
    copyT: '<button class="spt-btn primary" data-act="copyT" title="复制译文">' + ICONS.copy + "<span>复制译文</span></button>",
    deepl: '<button class="spt-btn" data-act="deepl" title="在 DeepL 网页中打开（已复制原文）">' + ICONS.arrow + "<span>DeepL ↗</span></button>"
  };
  function setActs(mode) {
    const box = pop.querySelector(".spt-acts");
    if (mode === "loading") {
      box.innerHTML = '<button class="spt-btn primary" disabled>' + ICONS.translate + "<span>翻译中…</span></button>" + BTN.say + BTN.copy;
    } else if (mode === "done") {
      box.innerHTML = BTN.copyT + BTN.say + BTN.deepl;
    } else {
      box.innerHTML = BTN.say + BTN.copy;
    }
  }

  async function doTrans() {
    if (!selText) return;
    if (abortCtl) abortCtl.abort();
    abortCtl = new AbortController();
    setActs("loading");
    try {
      const r = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: selText }),
        signal: AbortSignal.any ? AbortSignal.any([abortCtl.signal, AbortSignal.timeout(13000)]) : AbortSignal.timeout(13000)
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok || !j.text) throw new Error(j.error || ("HTTP " + r.status));
      transText = j.text;
      if (!pop || !pop.classList.contains("show")) return;   // 请求返回前弹条已被关闭
      pop.querySelector("#spt-res").textContent = transText;
      pop.querySelector("#spt-res").hidden = false;
      setActs("done");
      place();   // 弹条长高后重摆位
    } catch (e) {
      if (e.name === "AbortError") return;                    // 被新的划选取代
      /* 站内不可用（file:// 模式 / 服务未启动 / 上游失败）→ 回退网页版 */
      openDeepl();
      toast("站内翻译不可用，已复制原文并打开 DeepL");
      hide();
    }
  }

  function act(actName) {
    if (!selText) return;
    if (actName === "say") {
      if (typeof TTS !== "undefined" && TTS.speak) { if (!TTS.speak(selText)) toast("当前浏览器不支持语音合成"); }
    } else if (actName === "copy") {
      copyText(selText); toast("已复制选中文本");
    } else if (actName === "copyT") {
      copyText(transText); toast("已复制译文");
    } else if (actName === "deepl") {
      openDeepl(); toast("已复制原文 · DeepL 已在新标签页打开");
    }
  }

  function ensure() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.id = "sel-pop";
    pop.innerHTML = '<div class="spt-txt" id="spt-txt"></div>'
      + '<div class="spt-res" id="spt-res" hidden></div>'
      + '<div class="spt-acts"></div>';
    document.body.appendChild(pop);
    pop.addEventListener("mousedown", e => e.stopPropagation());   // 点弹条本身不隐藏
    pop.addEventListener("click", e => {
      const b = e.target.closest(".spt-btn");
      if (b && !b.disabled) act(b.dataset.act);
    });
    return pop;
  }

  /* 按锚点（选区中心/底边）摆位并夹取在视口内；滚动/内容变化时跟随重摆 */
  function place() {
    if (!pop || !pop.classList.contains("show")) return;
    if (selRange) {
      try {
        const rr = selRange.getBoundingClientRect();
        if (rr && rr.width) anchor = { x: rr.left + rr.width / 2, y: rr.bottom };
      } catch (e) { /* 选区已失效 → 沿用旧锚点 */ }
    }
    const r = pop.getBoundingClientRect();
    let left = anchor.x - r.width / 2, top = anchor.y + 10;
    left = Math.max(12, Math.min(window.innerWidth - r.width - 12, left));
    if (top + r.height > window.innerHeight - 12) top = anchor.y - r.height - 12;   // 下方放不下 → 上方
    pop.style.left = Math.round(Math.max(12, left)) + "px";
    pop.style.top = Math.round(Math.max(12, top)) + "px";
  }

  function show(cx, cy, text, range) {
    selText = text;
    transText = "";
    anchor = { x: cx, y: cy };
    selRange = range || null;
    const p = ensure();
    p.querySelector("#spt-txt").textContent = text.length > 64 ? text.slice(0, 64) + "…" : text;
    p.querySelector("#spt-res").hidden = true;
    p.classList.add("show");
    place();
    doTrans();   // 划选即自动翻译，无需点击
  }
  function hide() {
    if (pop) pop.classList.remove("show");
    selRange = null;
    if (abortCtl) { abortCtl.abort(); abortCtl = null; }
  }

  /* 点击是否落在选中文本上（点选中文本不关闭弹条） */
  function inSelection(e) {
    if (!selRange || !selRange.getClientRects) return false;
    const rects = selRange.getClientRects();
    for (const r of rects) {
      if (e.clientX >= r.left - 4 && e.clientX <= r.right + 4 && e.clientY >= r.top - 4 && e.clientY <= r.bottom + 4) return true;
    }
    return false;
  }

  function inProse(node) {
    const el = node && (node.nodeType === 1 ? node : node.parentElement);
    return !!(el && el.closest && el.closest(".prose, .face.back"));   // 正文/精读 + 单词卡背面（释义/例句）
  }

  document.addEventListener("mouseup", e => {
    if (pop && pop.contains(e.target)) return;
    setTimeout(() => {                                    // 等选区落定
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return hide();
      const text = String(sel).replace(/\s+/g, " ").trim();
      if (text.length < 2 || !inProse(sel.anchorNode) || !inProse(sel.focusNode)) return hide();
      if (typeof Dictip !== "undefined" && Dictip.hide) Dictip.hide();   // 与悬浮取词互斥
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      show(rect.left + rect.width / 2, rect.bottom, text, range.cloneRange());
    }, 0);
  });
  /* 只有点击「选中文本和译文之外」的位置才关闭 */
  document.addEventListener("mousedown", e => {
    if (!pop || !pop.classList.contains("show")) return;
    if (pop.contains(e.target)) return;
    if (inSelection(e)) return;
    hide();
  });
  /* 滚动/缩放：译文跟随选区移动，不消失；选区失效（被取消）时才收起 */
  let rafId = 0;
  function follow() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      if (!pop || !pop.classList.contains("show")) return;
      const sel = window.getSelection();
      if (!selRange || !sel || sel.isCollapsed || !String(sel).trim()) { hide(); return; }
      place();
    });
  }
  window.addEventListener("scroll", follow, true);
  window.addEventListener("resize", follow);
  document.addEventListener("keydown", e => { if (e.key === "Escape") hide(); });

  return { hide };
})();

/* ---------- 悬浮取词（阅读页正文词典 Tooltip） ---------- */
const Dictip = (() => {
  let tip = null, hideT = null;

  /* 轻量词形还原：token → 词典键（复数 / 过去式 / 进行式 / 副词后缀） */
  function stemCands(k) {
    const c = [k, k.replace(/'s$/, "")];
    if (/ies$/.test(k)) c.push(k.slice(0, -3) + "y");          // subsidies → subsidy
    if (/es$/.test(k)) c.push(k.slice(0, -2));
    if (/s$/.test(k) && !/ss$/.test(k)) c.push(k.slice(0, -1)); // emissions → emission
    if (/ed$/.test(k)) { c.push(k.slice(0, -2)); c.push(k.slice(0, -1)); } // deployed / practiced
    if (/ing$/.test(k)) { c.push(k.slice(0, -3)); c.push(k.slice(0, -3) + "e"); c.push(k.slice(0, -4)); } // fluctuating / leapfrogging
    if (/ly$/.test(k)) c.push(k.slice(0, -2));                 // cumulatively → cumulative
    if (/r$/.test(k)) c.push(k.slice(0, -1));                  // rarer → rare
    return c;
  }
  const lookupKey = p => {
    for (const c of stemCands(String(p).toLowerCase())) if (DICT[c]) return c;
    return null;
  };
  const lookup = p => { const k = lookupKey(p); return k ? DICT[k] : null; };

  function ensure() {
    if (!tip) {
      tip = document.createElement("div");
      tip.id = "dictip";
      document.body.appendChild(tip);
      tip.addEventListener("mouseover", () => clearTimeout(hideT));
      tip.addEventListener("mouseout", () => { hideT = setTimeout(hide, 140); });
      tip.addEventListener("click", e => {
        const btn = e.target.closest("[data-act]");
        if (!btn) return;
        if (btn.dataset.act === "say") {
          if (!TTS.speak(btn.dataset.word)) toast("当前浏览器不支持语音合成");
        } else if (btn.dataset.act === "add") {
          const raw = btn.dataset.word;
          const key = lookupKey(raw) || raw.toLowerCase().replace(/'s$/, "");
          const hit = DICT[key];
          const added = SRS.addWord(key, hit ? {
            w: key, ipa: hit.ipa || "", pos: hit.pos, def: hit.def, ex: "", exZh: "", lv: "阅读"
          } : null);
          toast(added ? "已加入生词本，明日开始复习" : "已在生词本中");
        }
      });
    }
    return tip;
  }

  function show(el) {
    const raw = el.dataset.w || "";
    const hit = lookup(raw);
    if (!hit) return;
    const t = ensure();
    t.innerHTML = `
      <div class="dt-word">${raw}${hit.ipa ? ' <span class="dt-ipa">' + hit.ipa + "</span>" : ""}</div>
      <div class="dt-def"><span class="dt-pos">${hit.pos}</span>${hit.def}</div>
      <div class="dt-acts">
        <button class="dt-btn" data-act="say" data-word="${raw}">${ICONS.speaker}<span>发音</span></button>
        <button class="dt-btn" data-act="add" data-word="${raw}">${ICONS.plus}<span>生词本</span></button>
      </div>`;
    t.classList.add("show");
    const r = el.getBoundingClientRect();
    const tw = t.offsetWidth, th = t.offsetHeight;
    let x = r.left + r.width / 2 - tw / 2;
    x = Math.max(12, Math.min(window.innerWidth - tw - 12, x));
    let y = r.top - th - 12;
    if (y < 76) y = r.bottom + 12;
    t.style.left = Math.round(x) + "px";
    t.style.top = Math.round(y) + "px";
  }

  function hide() { if (tip) tip.classList.remove("show"); }

  /* 分词：把 root 内文本节点中的英文单词包上 span.tk（词典命中加 .tk-x） */
  function tokenize(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentNode && /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName))
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n => {
      if (!/[A-Za-z]/.test(n.nodeValue)) return;
      const parts = n.nodeValue.split(/([A-Za-z][A-Za-z'’-]*)/);
      if (parts.length === 1) return;
      const frag = document.createDocumentFragment();
      parts.forEach(p => {
        if (!p) return;
        if (/^[A-Za-z][A-Za-z'’-]*$/.test(p)) {
          const s = document.createElement("span");
          s.className = "tk" + (lookup(p) ? " tk-x" : "");
          s.dataset.w = p;
          s.textContent = p;
          frag.appendChild(s);
        } else {
          frag.appendChild(document.createTextNode(p));
        }
      });
      n.parentNode.replaceChild(frag, n);
    });
  }

  function bind(root) {
    tokenize(root);
    root.addEventListener("mouseover", e => {
      const tk = e.target.closest(".tk");
      if (tk) { clearTimeout(hideT); show(tk); }
    });
    root.addEventListener("mouseout", e => {
      if (e.target.closest(".tk")) hideT = setTimeout(hide, 160);
    });
    root.addEventListener("click", e => {
      const tk = e.target.closest(".tk");
      if (tk) { clearTimeout(hideT); show(tk); }
    });
  }

  return { bind, hide, tokenize };
})();

/* ---------- 页面引导 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav a[data-nav]").forEach(a =>
    a.classList.toggle("active", a.dataset.nav === page));
  renderDates();
  renderStreak();
  initReveal();
});
