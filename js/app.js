/* EverWord 共享层 —— 导航激活 / 入场动画 / Toast / 悬浮取词 / 通用工具 */

/* 级别 → 样式类 */
const lvClass = lv => lv === "CET-4" ? "c4" : lv === "CET-6" ? "c6" : lv === "TEM-8" ? "t8" : "ie";

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
