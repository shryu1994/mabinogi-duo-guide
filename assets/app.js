(() => {
  "use strict";
  const G = window.GUIDE;
  const KEY = "crom2p.";
  const GRADE = { sure: "확실", high: "높음", guess: "추측", measure: "실측" };
  const COL = { both: "둘 다", dm: "다크메이지", sb: "세인트 바드", pet: "펫" };
  const $ = (sel) => document.querySelector(sel);

  const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(KEY + k)); return v ?? d; } catch { return d; } };
  const save = (k, v) => localStorage.setItem(KEY + k, JSON.stringify(v));

  const settings = Object.assign(Object.fromEntries(G.settings.map((s) => [s.id, s.def])), load("settings", {}));
  let checks = load("checks", {});
  let timers = load("timers", {});
  const measures = load("measures", {});
  const notified = new Set();

  const val = (x) => (typeof x === "function" ? x(settings) : x);
  const allowed = (req) => (req === undefined ? true : typeof req === "function" ? !!req(settings) : !!settings[req]);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const timerDef = (id) => G.timers.find((t) => t.id === id);
  const fmt = (sec) => { sec = Math.max(0, Math.ceil(sec)); const m = Math.floor(sec / 60); return m ? `${m}:${String(sec % 60).padStart(2, "0")}` : `${sec}초`; };

  // ---------- timers ----------
  function timerState(t, now = Date.now()) {
    const start = timers[t.id];
    if (!start) return { phase: "idle" };
    const dur = val(t.dur), cd = val(t.cd);
    const el = (now - start) / 1000;
    if (el < dur) {
      const left = dur - el;
      return { phase: left <= Math.max(5, dur * 0.2) ? "low" : "active", left, label: fmt(left) };
    }
    if (cd > 0) {
      const left = dur + cd - el;
      return left > 0 ? { phase: "cool", left, label: `쿨 ${fmt(left)}` } : { phase: "ready", label: "준비" };
    }
    return { phase: "expired", label: "만료" };
  }

  function startTimer(id) {
    timers[id] = Date.now();
    notified.delete(id);
    save("timers", timers);
    tick();
  }
  function stopTimer(id) { delete timers[id]; save("timers", timers); tick(); renderTimerDialog(); }

  let audio;
  function alertEnd(t) {
    const bar = document.querySelector(".bottom");
    bar.classList.remove("flash"); void bar.offsetWidth; bar.classList.add("flash");
    if (settings.alert_vibe && navigator.vibrate) navigator.vibrate([200, 100, 200]);
    if (settings.alert_beep) {
      try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        const o = audio.createOscillator(), g = audio.createGain();
        o.frequency.value = 880; g.gain.value = 0.15; o.connect(g); g.connect(audio.destination);
        o.start(); o.stop(audio.currentTime + 0.35);
      } catch { /* 소리를 못 내는 브라우저 */ }
    }
  }

  function chipHTML(t, st, extra = "") {
    return `<div class="tchip ${st.phase} ${t.who}" data-timer="${t.id}"><span class="tl">${esc(t.label)}</span><span class="tv">${st.label ?? "시작"}</span>${extra}</div>`;
  }

  function tick() {
    const now = Date.now();
    const strip = $("#timer-strip");
    const shown = [];
    for (const t of G.timers) {
      if (!allowed(t.req)) continue;
      const st = timerState(t, now);
      if ((st.phase === "cool" || st.phase === "expired") && !notified.has(t.id) && timers[t.id]) {
        notified.add(t.id);
        alertEnd(t);
      }
      if (st.phase !== "idle" && st.phase !== "ready") shown.push([t, st]);
    }
    const order = { expired: 0, low: 1, active: 2, cool: 3 };
    shown.sort((a, b) => order[a[1].phase] - order[b[1].phase] || (a[1].left ?? 0) - (b[1].left ?? 0));
    strip.innerHTML = shown.length ? shown.map(([t, st]) => chipHTML(t, st)).join("") : `<span class="strip-empty">타이머 없음 · ⏱ 또는 카드의 ⏱ 버튼</span>`;
    document.querySelectorAll(".tbtn[data-timer]").forEach((b) => {
      const t = timerDef(b.dataset.timer); const st = timerState(t, now);
      b.classList.toggle("running", st.phase === "active" || st.phase === "low");
      b.textContent = st.phase === "idle" || st.phase === "ready" ? "⏱ 시작" : `⏱ ${st.label}`;
    });
    if ($("#dlg-timers").open) renderTimerDialog();
  }

  function renderTimerDialog() {
    const now = Date.now();
    $("#timers-body").innerHTML = G.timers.filter((t) => allowed(t.req)).map((t) => {
      const st = timerState(t, now);
      const sub = `<span class="ts">${COL[t.who]} · 지속 ${fmt(val(t.dur))}${val(t.cd) ? ` · 쿨 ${fmt(val(t.dur) + val(t.cd))}` : ""}</span>`;
      return chipHTML(t, st, sub);
    }).join("");
  }

  // ---------- cards ----------
  function itemHTML(card, col, it, idx) {
    const key = `${card.id}.${col}.${idx}`;
    const done = checks[key];
    const g = it.g ? `<span class="g ${it.g}">${GRADE[it.g]}</span>` : "";
    const tb = it.timer && allowed(timerDef(it.timer)?.req) ? `<button class="tbtn" data-timer="${it.timer}">⏱ 시작</button>` : "";
    return `<li class="item${done ? " done" : ""}" data-key="${key}"><button class="check" aria-label="완료 표시"></button><div class="txt">${md(val(it.t))}<span class="meta">${g}${tb}</span></div></li>`;
  }

  function colHTML(card, col) {
    const list = (card[col] || []).map((it, i) => [it, i]).filter(([it]) => allowed(it.req));
    if (!list.length) return "";
    let head = COL[col];
    if (col === "pet") head += ` · ${settings.pet_owner === "sb" ? "세바" : "닼메"} 담당`;
    return `<section class="col ${col}"><h3>${head}</h3><ul class="items">${list.map(([it, i]) => itemHTML(card, col, it, i)).join("")}</ul></section>`;
  }

  function cardHTML(card, n, total) {
    const roleCols = ["dm", "sb"].map((c) => colHTML(card, c)).filter(Boolean);
    const petCol = colHTML(card, "pet");
    if (petCol) (settings.pet_owner === "sb" ? roleCols.push(petCol) : roleCols.unshift(petCol));
    const both = colHTML(card, "both");
    const lead = card.lead ? `<p class="lead">${md(card.lead)}</p>` : "";
    const warn = card.warn ? `<div class="warn">${card.warn.map((w) => `<p>${md(w)}</p>`).join("")}</div>` : "";
    const src = card.src ? `<details class="src"><summary>근거 ${card.src.length}개</summary><ul>${card.src.map((k) => { const s = G.sources[k]; return s ? `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.label)}</a></li>` : ""; }).join("")}</ul></details>` : "";
    const legend = n === 1 ? `<div class="legend">근거: <span class="g sure">확실</span>공식 <span class="g high">높음</span>위키·여러 공략 <span class="g guess">추측</span>운용안·단일 글 <span class="g measure">실측</span>직접 재기</div>` : "";
    const fields = card.measure ? card.fields.map((f) => `<label class="field"><span>${esc(f.label)}</span><input data-measure="${f.id}" value="${esc(measures[f.id] || "")}" autocomplete="off"></label>`).join("") + `<div class="dlg-actions"><button type="button" id="btn-copy-measure" class="ghost">메모 복사</button></div>` : "";
    return `<article class="card" id="c-${card.id}" data-idx="${n - 1}">
      <div class="card-head"><span class="card-num">${n}/${total}</span><h2>${esc(card.title)}</h2></div>
      ${lead}${legend}
      ${both ? `<div class="cols">${both}</div>` : ""}
      ${roleCols.length ? `<div class="cols ${roleCols.length > 1 ? "two" : ""}" style="margin-top:12px">${roleCols.join("")}</div>` : ""}
      ${warn}${fields}${src}
    </article>`;
  }

  function render() {
    const deck = $("#deck");
    const cur = currentIdx();
    const total = G.cards.length;
    deck.innerHTML = G.cards.map((c, i) => cardHTML(c, i + 1, total)).join("");
    $("#steps").innerHTML = G.cards.map((c, i) => `<button class="step-chip${c.ref ? " ref" : ""}" data-go="${i}">${esc(c.step)}</button>`).join("");
    goTo(cur);
    tick();
  }

  // ---------- navigation ----------
  let idx = load("card", 0);
  function currentIdx() { return Math.min(Math.max(idx, 0), G.cards.length - 1); }
  function goTo(i) {
    const deck = $("#deck");
    idx = Math.min(Math.max(i, 0), G.cards.length - 1);
    deck.scrollTo({ left: idx * deck.clientWidth, behavior: "instant" });
    markStep();
  }
  function markStep() {
    save("card", idx);
    const steps = $("#steps");
    steps.querySelectorAll(".step-chip").forEach((b, i) => {
      b.classList.toggle("on", i === idx);
      if (i === idx) steps.scrollLeft = b.offsetLeft - (steps.clientWidth - b.offsetWidth) / 2;
    });
  }
  let scrollT;
  $("#deck").addEventListener("scroll", () => {
    clearTimeout(scrollT);
    scrollT = setTimeout(() => {
      const deck = $("#deck");
      const i = Math.round(deck.scrollLeft / deck.clientWidth);
      if (Math.abs(deck.scrollLeft - i * deck.clientWidth) > 2) deck.scrollTo({ left: i * deck.clientWidth, behavior: "smooth" });
      if (i !== idx) { idx = i; markStep(); }
    }, 150);
  }, { passive: true });
  window.addEventListener("resize", () => goTo(idx));

  $("#btn-prev").onclick = () => goTo(idx - 1);
  $("#btn-next").onclick = () => goTo(idx + 1);
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, select, textarea") || document.querySelector("dialog[open]")) return;
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); goTo(idx + 1); }
    if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); goTo(idx - 1); }
  });
  $("#steps").addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b) goTo(+b.dataset.go); });

  // ---------- interactions inside cards ----------
  $("#deck").addEventListener("click", (e) => {
    const tb = e.target.closest(".tbtn[data-timer]");
    if (tb) { startTimer(tb.dataset.timer); return; }
    const li = e.target.closest(".item");
    if (li && (e.target.closest(".check") || e.target.closest(".txt"))) {
      if (e.target.closest("a")) return;
      const k = li.dataset.key;
      checks[k] = !checks[k];
      if (!checks[k]) delete checks[k];
      save("checks", checks);
      li.classList.toggle("done", !!checks[k]);
    }
    if (e.target.id === "btn-copy-measure") {
      const card = G.cards.find((c) => c.measure);
      const text = card.fields.map((f) => `${f.label}: ${measures[f.id] || "-"}`).join("\n");
      navigator.clipboard?.writeText(text).then(() => { e.target.textContent = "복사됨"; setTimeout(() => (e.target.textContent = "메모 복사"), 1500); });
    }
  });
  $("#deck").addEventListener("input", (e) => {
    const id = e.target.dataset.measure;
    if (id) { measures[id] = e.target.value; save("measures", measures); }
  });

  $("#timer-strip").addEventListener("click", (e) => { const c = e.target.closest("[data-timer]"); if (c) startTimer(c.dataset.timer); });
  $("#btn-timers").onclick = () => { renderTimerDialog(); $("#dlg-timers").showModal(); };
  $("#timers-body").addEventListener("click", (e) => { const c = e.target.closest("[data-timer]"); if (c) { startTimer(c.dataset.timer); renderTimerDialog(); } });
  $("#btn-timers-reset").onclick = () => { timers = {}; save("timers", timers); notified.clear(); tick(); renderTimerDialog(); };

  $("#btn-newrun").onclick = () => {
    if (!confirm("새 판을 시작할까요? 체크와 타이머가 지워집니다. (설정·실측 메모는 남습니다)")) return;
    checks = {}; timers = {}; notified.clear();
    save("checks", checks); save("timers", timers);
    render(); goTo(0);
  };

  // ---------- settings ----------
  function renderSettings() {
    const groups = [...new Set(G.settings.map((s) => s.group))];
    $("#settings-body").innerHTML = groups.map((g) => `<div class="set-group"><h4>${esc(g)}</h4>${G.settings.filter((s) => s.group === g).map((s) => {
      let input;
      if (s.type === "bool") input = `<input type="checkbox" data-set="${s.id}" ${settings[s.id] ? "checked" : ""}>`;
      else if (s.type === "number") input = `<input type="number" data-set="${s.id}" min="${s.min}" max="${s.max}" value="${settings[s.id]}">`;
      else input = `<select data-set="${s.id}">${s.options.map(([v, l]) => `<option value="${v}" ${settings[s.id] === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select>`;
      return `<div class="set-row"><label for="s-${s.id}">${esc(s.label)}</label>${input.replace("data-set", `id="s-${s.id}" data-set`)}</div>`;
    }).join("")}</div>`).join("");
  }
  $("#settings-body").addEventListener("change", (e) => {
    const id = e.target.dataset.set; if (!id) return;
    const def = G.settings.find((s) => s.id === id);
    let v = def.type === "bool" ? e.target.checked : def.type === "number" ? Number(e.target.value) : e.target.value;
    if (def.type === "number") v = Math.min(def.max, Math.max(def.min, v || def.def));
    settings[id] = v; save("settings", settings);
    render();
  });
  $("#btn-settings").onclick = () => { renderSettings(); $("#dlg-settings").showModal(); };

  // ---------- wake lock ----------
  let wake = null;
  async function setWake(on) {
    const b = $("#btn-wake");
    try {
      if (on && "wakeLock" in navigator) { wake = await navigator.wakeLock.request("screen"); wake.addEventListener("release", () => { if (!document.hidden) b.setAttribute("aria-pressed", "false"); }); }
      else if (!on && wake) { await wake.release(); wake = null; }
      b.setAttribute("aria-pressed", String(!!(on && wake)));
      if (on && !("wakeLock" in navigator)) b.textContent = "화면 유지 미지원";
    } catch { b.setAttribute("aria-pressed", "false"); }
  }
  $("#btn-wake").onclick = () => setWake($("#btn-wake").getAttribute("aria-pressed") !== "true");
  document.addEventListener("visibilitychange", () => { if (!document.hidden && $("#btn-wake").getAttribute("aria-pressed") === "true") setWake(true); });
  for (const t of G.timers) { const p = timerState(t).phase; if (p === "cool" || p === "expired" || p === "ready") notified.add(t.id); }

  // ---------- boot ----------
  $("#title").textContent = `${G.title} · ${G.version}`;
  render();
  setInterval(tick, 250);
})();
