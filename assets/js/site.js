// Site behaviours: theme switch, quick search (/ or Ctrl+K), ←/→ between days, copy the solution,
// and the current month in the calendar's month bar. Every page works without it.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const typing = (e) => /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;

  // Sticky bars sit under the header, whose height changes when the menu wraps.
  const header = $("header.site");
  const setH = () => document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  if (header) { setH(); addEventListener("resize", setH); }

  // Theme: dark by default, remembered per browser.
  $(".theme-toggle")?.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Copy the solution.
  for (const b of document.querySelectorAll(".solution .copy")) {
    b.addEventListener("click", async () => {
      const code = b.closest(".solution").querySelector("code").textContent;
      try { await navigator.clipboard.writeText(code); } catch (e) { return; }
      const label = b.textContent;
      b.textContent = b.dataset.done;
      setTimeout(() => (b.textContent = label), 1500);
    });
  }

  // ←/→ on a post: previous / next day.
  addEventListener("keydown", (e) => {
    if (typing(e) || e.metaKey || e.ctrlKey || e.altKey || $("dialog[open]")) return;
    if (e.target.closest?.(".anim")) return;
    const a = e.key === "ArrowLeft" ? $('.pager a[rel="prev"]') : e.key === "ArrowRight" ? $('.pager a[rel="next"]') : null;
    if (a) location.href = a.href;
  });

  // Calendar: highlight the month on screen in the month bar.
  const jump = $(".month-jump");
  if (jump && "IntersectionObserver" in window) {
    const links = new Map([...jump.querySelectorAll("a")].map((a) => [a.hash.slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) if (en.isIntersecting) {
        links.forEach((a) => a.classList.remove("cur"));
        const a = links.get(en.target.id);
        if (a) { a.classList.add("cur"); a.scrollIntoView({ block: "nearest", inline: "nearest" }); }
      }
    }, { rootMargin: "-30% 0px -60% 0px" });
    document.querySelectorAll(".month").forEach((m) => io.observe(m));
  }

  // Quick search.
  const dlg = $("dialog.search");
  if (!dlg) return;
  const input = $("input", dlg), list = $(".search-results", dlg);
  let index = null, items = [], sel = 0;
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  async function load() {
    if (index) return index;
    const r = await fetch(dlg.dataset.index);
    index = (await r.json()).map((x) => ({ ...x, h: norm([x.t, x.n, x.p, x.l, x.d, x.c, x.k].filter(Boolean).join(" ")) }));
    return index;
  }

  // Words must all match; "<130", ">200" or "120-140" filter on length; a lone number also matches a length.
  function match(q) {
    const words = norm(q).trim().split(/\s+/).filter(Boolean);
    return index.filter((x) => words.every((w) => {
      let m;
      if ((m = w.match(/^<(\d+)$/))) return x.c && x.c < +m[1];
      if ((m = w.match(/^>(\d+)$/))) return x.c && x.c > +m[1];
      if ((m = w.match(/^(\d+)-(\d+)$/))) return x.c && x.c >= +m[1] && x.c <= +m[2];
      if (/^\d+$/.test(w) && x.c === +w) return true;
      return x.h.includes(w);
    }));
  }

  function render() {
    const q = input.value;
    items = (q.trim() ? match(q) : index).slice(0, 40);
    sel = Math.min(sel, Math.max(items.length - 1, 0));
    if (!items.length) { list.innerHTML = `<li class="empty">${esc(dlg.dataset.empty)}</li>`; return; }
    list.innerHTML = items.map((x, i) => `<li role="option" aria-selected="${i === sel}" id="sr-${i}"><a href="${esc(x.u)}" tabindex="-1">
      <img src="${esc(x.i)}" alt="" width="64" height="48" loading="lazy">
      <span><span class="t">${esc(x.t)}</span><span class="m">${esc(x.l)}${x.n ? " · " + esc(x.n) : ""}${x.k ? " · " + esc(x.k) : ""}</span></span>
      ${x.c ? `<span class="chars">${x.c}</span>` : ""}</a></li>`).join("");
    input.setAttribute("aria-activedescendant", `sr-${sel}`);
  }

  function move(d) {
    if (!items.length) return;
    sel = (sel + d + items.length) % items.length;
    list.querySelectorAll("li").forEach((li, i) => li.setAttribute("aria-selected", i === sel));
    list.children[sel]?.scrollIntoView({ block: "nearest" });
    input.setAttribute("aria-activedescendant", `sr-${sel}`);
  }

  async function open() {
    if (dlg.open) return;
    dlg.showModal();
    input.select();
    try { await load(); render(); } catch (e) { list.innerHTML = ""; }
  }

  $(".search-open")?.addEventListener("click", open);
  addEventListener("keydown", (e) => {
    if ((e.key === "/" && !typing(e)) || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) { e.preventDefault(); open(); }
  });
  input.addEventListener("input", () => { sel = 0; if (index) render(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
    else if (e.key === "Enter" && items[sel]) { e.preventDefault(); location.href = items[sel].u; }
    else if (e.key === "Escape") { e.preventDefault(); dlg.close(); }
  });
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
})();
