// Player for the post animations.
//
// Markup (see README, "Animation format"):
//   <figure class="anim t<MMDD>" data-duration="<s>" data-wide="<x> <y> <w> <h>" [data-scene="t<MMDD>"]>
//     <div class="anim-col">
//       <div class="stage"><div class="scene">…shapes, in canvas px (0..400 × 0..300, more off canvas)…</div></div>
//       <div class="legend">…</div>
//     </div>
//     <div class="anim-side">
//       <pre class="code">…<span data-on="2 3">…</span>…</pre>
//       <div class="now"><div class="caps"><div class="cap" data-t="0" data-step="Label"><h3>…</h3><p>…</p></div>…</div><div class="live"></div></div>
//     </div>
//   </figure>
//
// The player adds Play/Pause, Restart, a slider, the step list and the options:
// - "Wide view / Canvas only" when data-wide is set: the stage frames either that rectangle (canvas px) or the
//   400×300 canvas; outside the canvas is hatched and labelled (data-off-label="x y" places that label, canvas px).
//   The view is in fig.dataset.view (wide|canvas).
// - "Teaching colors" when the figure has a .legend: fig.dataset.teach is "1" or "0".
// It also sets fig.dataset.step (1-based current step), gives the current caption the class is-cur (and copies its
// data-live text into .live when there is no script scene), and the
// class "on" (or "on2" with data-tone="2") to code spans whose data-on lists the current step.
// Time: CSS keyframe animations inside the figure are paused and driven by the player. A script scene registers
// window.AnimScenes[<name>] = (fig, refresh) => (t, step) => { … }, called on every frame and after option changes.
// fig.animPlayer = { seek(t), setView(v), setTeach(on) } is there for tests.
(() => {
  const L = {
    en: { pause: 'Pause', play: 'Play', replay: 'Replay', restart: 'Restart', pos: 'Position in the animation', step: 'Step', dec: '.',
      wide: 'Wide view', canvas: 'Canvas only', framing: 'Framing', teach: 'Teaching colors', can: 'canvas 400 × 300', off: 'outside the canvas: never shown' },
    fr: { pause: 'Pause', play: 'Lecture', replay: 'Revoir', restart: 'Recommencer', pos: "Position dans l'animation", step: 'Étape', dec: ',',
      wide: 'Vue large', canvas: 'Canevas seul', framing: 'Cadrage', teach: 'Couleurs pédagogiques', can: 'canevas 400 × 300', off: 'hors du canevas : jamais affiché' },
  };
  const tr = L[document.documentElement.lang] || L.en;
  const players = [];
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

  for (const fig of document.querySelectorAll('figure.anim[data-duration]')) {
    fig.classList.add('js');
    const D = parseFloat(fig.dataset.duration);
    const stage = fig.querySelector('.stage');
    const scene = stage.querySelector('.scene');
    const caps = [...fig.querySelectorAll('.caps [data-t]')];
    const codeSpans = [...fig.querySelectorAll('.code [data-on]')];
    const anims = fig.getAnimations({ subtree: true });
    anims.forEach((a) => a.pause());

    const ui = el('div', 'anim-controls',
      `<button type="button" class="primary">${tr.pause}</button>` +
      `<button type="button">${tr.restart}</button>` +
      `<input type="range" min="0" max="${D}" step="0.01" value="0" aria-label="${tr.pos}">` +
      '<span class="anim-time"></span>');
    stage.after(ui);
    const [play, restart, scrub, time] = ui.children;

    // Options: framing and teaching colors.
    const wide = (fig.dataset.wide || '').trim().split(/\s+/).map(Number);
    const hasWide = wide.length === 4 && wide.every((n) => !Number.isNaN(n)) && scene;
    const hasTeach = !!fig.querySelector('.legend');
    let opts = null;
    if (hasWide || hasTeach) {
      opts = el('div', 'anim-opts');
      if (hasWide) {
        opts.append(el('span', 'seg', `<button type="button" data-view="wide" aria-pressed="true">${tr.wide}</button><button type="button" data-view="canvas" aria-pressed="false">${tr.canvas}</button>`));
        opts.firstChild.setAttribute('role', 'group');
        opts.firstChild.setAttribute('aria-label', tr.framing);
      }
      if (hasTeach) opts.append(el('label', 'chk', `<input type="checkbox" checked> ${tr.teach}`));
      ui.after(opts);
    }
    if (hasWide) {
      fig.dataset.view = 'wide';
      const [x, y, w, h] = wide;
      const off = el('div', 'offcanvas');
      off.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px;clip-path:polygon(evenodd,0 0,100% 0,100% 100%,0 100%,0 0,${-x}px ${-y}px,${-x + 400}px ${-y}px,${-x + 400}px ${-y + 300}px,${-x}px ${-y + 300}px,${-x}px ${-y}px)`;
      const edge = el('div', 'canvas-edge');
      const labCan = el('span', 'off-lab', tr.can);
      const labOff = el('span', 'off-lab', tr.off);
      // Labels go inside the canvas bottom edge and just outside it, wherever there is room.
      labCan.classList.add('in-canvas');
      labCan.style.cssText = 'left:4px;top:296px';
      const pos = (fig.dataset.offLabel || '').trim().split(/\s+/).map(Number);
      // Default: on the side of the canvas with the most off-canvas room.
      const room = [[y + h - 300, 'left:6px;top:304px'], [-y, `left:6px;top:${y + 4}px`], [-x, `left:${x + 4}px;top:4px`], [x + w - 400, 'left:404px;top:4px']]
        .sort((m, n) => n[0] - m[0])[0][1];
      labOff.style.cssText = pos.length === 2 && pos.every((n) => !Number.isNaN(n)) ? `left:${pos[0]}px;top:${pos[1]}px` : room;
      scene.append(off, edge, labCan, labOff);
    }
    if (hasTeach) fig.dataset.teach = '1';

    const steps = el('ol', 'anim-steps');
    caps.forEach((c, i) => {
      const li = el('li', '', `<button type="button"><span class="num">${i + 1}</span><span class="t"></span></button>`);
      li.querySelector('.t').textContent = c.dataset.step || `${tr.step} ${i + 1}`;
      li.firstChild.addEventListener('click', () => {
        p.t = parseFloat(c.dataset.t) + 0.001;
        p.playing = true;
        render(p);
      });
      steps.append(li);
    });
    (fig.querySelector('.now, .caps') || ui).after(steps);

    const p = { fig, D, stage, scene, wide: hasWide ? wide : null, anims, caps, codeSpans, play, scrub, time, items: [...steps.children], t: 0, playing: true, cur: -1, sceneFn: null };
    const make = window.AnimScenes && window.AnimScenes[fig.dataset.scene];
    if (make) p.sceneFn = make(fig, () => render(p));
    players.push(p);

    const setView = (v) => {
      if (!hasWide) return;
      fig.dataset.view = v;
      opts.querySelectorAll('[data-view]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v));
      fit(p);
      render(p);
    };
    const setTeach = (on) => {
      if (!hasTeach) return;
      fig.dataset.teach = on ? '1' : '0';
      opts.querySelector('.chk input').checked = on;
      render(p);
    };
    if (opts) {
      opts.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));
      const cb = opts.querySelector('.chk input');
      if (cb) cb.addEventListener('change', () => setTeach(cb.checked));
    }
    if (scene) new ResizeObserver(() => fit(p)).observe(stage);
    fit(p);

    play.addEventListener('click', () => {
      if (p.t >= D) p.t = 0;
      p.playing = !p.playing;
      render(p);
    });
    restart.addEventListener('click', () => {
      p.t = 0;
      p.playing = true;
      render(p);
    });
    scrub.addEventListener('input', () => {
      p.t = parseFloat(scrub.value);
      p.playing = false;
      render(p);
    });
    fig.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !(e.target instanceof HTMLButtonElement) && !(e.target instanceof HTMLInputElement && e.target.type === 'checkbox')) {
        e.preventDefault();
        play.click();
      }
    });
    fig.animPlayer = {
      seek: (t) => { p.t = Math.max(0, Math.min(D, t)); p.playing = false; render(p); },
      setView,
      setTeach,
    };

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      p.t = D;
      p.playing = false;
    }
    render(p);
  }

  // Frames the scene: the wide rectangle or the 400×300 canvas, scaled to the stage width.
  function fit(p) {
    if (!p.scene) return;
    const r = p.wide && p.fig.dataset.view === 'wide' ? p.wide : [0, 0, 400, 300];
    p.stage.style.aspectRatio = `${r[2]} / ${r[3]}`;
    const s = p.stage.clientWidth / r[2];
    p.scene.style.transform = `scale(${s}) translate(${-r[0]}px, ${-r[1]}px)`;
    p.scene.style.setProperty('--k', 1 / s); // lets the hatching, the canvas edge and the labels keep their screen size
  }

  function render(p) {
    // currentTime == duration would wrap to frame 0 on a looping CSS animation: stop 1 ms before.
    const ms = Math.min(p.t, p.D - 0.001) * 1000;
    p.anims.forEach((a) => {
      a.currentTime = ms;
    });
    let cur = 0;
    p.caps.forEach((c, i) => {
      if (p.t >= parseFloat(c.dataset.t)) cur = i;
    });
    if (cur !== p.cur) {
      p.cur = cur;
      p.fig.dataset.step = cur + 1;
      p.items.forEach((li, i) => {
        li.classList.toggle('cur', i === cur);
        li.classList.toggle('done', i < cur);
      });
      p.caps.forEach((c, i) => c.classList.toggle('is-cur', i === cur));
      // A caption can carry its own result line (data-live); a script scene may overwrite it on every frame.
      const live = p.fig.querySelector('.live');
      if (live && !p.sceneFn) live.textContent = p.caps[cur] && p.caps[cur].dataset.live ? p.caps[cur].dataset.live : '';
      p.codeSpans.forEach((sp) => {
        const on = sp.dataset.on.split(/[\s,]+/).map(Number).includes(cur + 1);
        sp.classList.toggle(sp.dataset.tone === '2' ? 'on2' : 'on', on);
      });
    }
    if (p.sceneFn) p.sceneFn(p.t, cur);
    p.scrub.value = p.t;
    p.time.textContent = `${p.t.toFixed(1).replace('.', tr.dec)} s`;
    p.play.textContent = p.playing ? tr.pause : p.t >= p.D ? tr.replay : tr.play;
  }

  let last = null;
  function frame(ts) {
    const dt = last === null ? 0 : (ts - last) / 1000;
    last = ts;
    for (const p of players) {
      if (!p.playing) continue;
      p.t = Math.min(p.D, p.t + dt);
      if (p.t >= p.D) p.playing = false;
      render(p);
    }
    requestAnimationFrame(frame);
  }
  if (players.length) requestAnimationFrame(frame);
})();
