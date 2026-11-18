// Data helpers for the templates: dates, excerpts, calendar, players, lengths, search index.
import fs from "node:fs";
import * as yaml from "js-yaml";
import site from "../_data/site.js";

const i18n = yaml.load(fs.readFileSync(new URL("../_data/i18n.yml", import.meta.url), "utf8"));
// players.yml, read again only when it changes (the dev server keeps this module loaded).
const playersFile = new URL("../_data/players.yml", import.meta.url);
let playersCache = { mtime: 0, data: {} };
const players = () => {
  const mtime = fs.statSync(playersFile).mtimeMs;
  if (mtime !== playersCache.mtime) playersCache = { mtime, data: yaml.load(fs.readFileSync(playersFile, "utf8")) || {} };
  return playersCache.data;
};
const prefix = site.baseurl.replace(/\/$/, "");
const rel = (p) => prefix + p;

export const slug = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const escape = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// YAML reads `ref: 2026-11-03` as a Date: compare refs as strings.
const normRef = (r) => (r instanceof Date ? r.toISOString().slice(0, 10) : r == null ? "" : String(r));
const iso = (d) => new Date(d).toISOString().slice(0, 10);
const isTarget = (p) => Boolean(p.data.target);

export const sortPosts = (items) =>
  [...items].sort((a, b) => b.date - a.date || (isTarget(b) - isTarget(a)) || b.inputPath.localeCompare(a.inputPath));

export const refMap = (all) => {
  const m = {};
  for (const it of all) {
    const r = normRef(it.data.ref);
    if (r && it.data.lang && it.url) (m[r] ||= {})[it.data.lang] = it.url;
  }
  return m;
};

function fdate(d, lang = "en") {
  const x = new Date(d), day = x.getUTCDate(), month = i18n[lang].months[x.getUTCMonth()], y = x.getUTCFullYear();
  return lang === "fr" ? `${day === 1 ? "1er" : day} ${month} ${y}` : `${month} ${day}, ${y}`;
}
const fmonth = (d, lang = "en") => {
  const x = new Date(d), m = i18n[lang].months[x.getUTCMonth()];
  return `${lang === "fr" ? m : m} ${x.getUTCFullYear()}`;
};
const fshort = (d, lang = "en") => {
  const x = new Date(d), m = i18n[lang].months_short[x.getUTCMonth()];
  return lang === "fr" ? `${x.getUTCDate()} ${m}` : `${m} ${x.getUTCDate()}`;
};

// First paragraph of the Markdown, as plain text (Jekyll's post.excerpt, without the HTML).
function excerpt(item, words = 40) {
  const raw = item?.rawInput ?? "";
  const para = raw.split(/\n\s*\n/).map((s) => s.trim())
    .find((s) => s && !/^({%|{{|#|<|\||-|\*|>|```|!\[)/.test(s)) || "";
  const text = para.replace(/{{[^}]*}}|{%[^%]*%}/g, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/`([^`]*)`/g, "$1").replace(/(\*\*|__|\*|_)(\S[^*_]*?)\1/g, "$2")
    .replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const w = text.split(" ");
  return w.length > words ? w.slice(0, words).join(" ").replace(/[,;:.]$/, "") + "…" : text;
}

// Months of the calendar (daily targets only), newest first. Weeks start on Monday; days before the 1st are null.
function calendar(posts) {
  const byDay = new Map(posts.filter(isTarget).map((p) => [iso(p.date), p]));
  const days = [...byDay.keys()].sort();
  if (!days.length) return [];
  const months = [];
  let [y, m] = days[0].split("-").map(Number);
  const [ly, lm] = days.at(-1).split("-").map(Number);
  while (y < ly || (y === ly && m <= lm)) {
    const first = new Date(Date.UTC(y, m - 1, 1)), n = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const cells = Array((first.getUTCDay() + 6) % 7).fill(null);
    let count = 0;
    for (let d = 1; d <= n; d++) {
      const key = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const post = byDay.get(key) || null;
      if (post) count++;
      cells.push({ day: d, key, post });
    }
    while (cells.length % 7) cells.push(null);
    months.push({ key: `${y}-${String(m).padStart(2, "0")}`, date: first, year: y, month: m, cells, count });
    if (++m > 12) { m = 1; y++; }
  }
  return months.reverse();
}

// Players with at least one top 1, most wins first.
function leaderboard(posts) {
  const P = players(), by = new Map();
  for (const p of posts.filter(isTarget)) {
    const id = p.data.player;
    if (!by.has(id)) by.set(id, { id, name: P[id]?.name || id, avatar: P[id]?.avatar, posts: [] });
    by.get(id).posts.push(p);
  }
  return [...by.values()].map((x) => ({
    ...x,
    count: x.posts.length,
    best: x.posts.reduce((a, b) => (b.data.chars < a.data.chars ? b : a)),
    latest: x.posts[0],
  })).sort((a, b) => b.count - a.count || b.latest.date - a.latest.date);
}

export const playerPages = (posts, lang) => leaderboard(posts).map((x) => ({ ...x, lang }));

// Solution lengths in buckets of 10 characters, shortest first.
function lengths(posts, size = 10) {
  const t = posts.filter(isTarget).sort((a, b) => a.data.chars - b.data.chars || b.date - a.date);
  if (!t.length) return [];
  const lo = Math.floor(t[0].data.chars / size) * size, hi = Math.floor(t.at(-1).data.chars / size) * size;
  const buckets = [];
  for (let from = lo; from <= hi; from += size) {
    buckets.push({ from, to: from + size - 1, id: `c${from}`, posts: t.filter((p) => p.data.chars >= from && p.data.chars < from + size) });
  }
  const max = Math.max(...buckets.map((b) => b.posts.length));
  return buckets.map((b) => ({ ...b, count: b.posts.length, pct: Math.round((b.posts.length / max) * 100) }));
}

// Previous / next daily target (by date) around a post.
function neighbors(posts, url) {
  const t = posts.filter(isTarget), i = t.findIndex((p) => p.url === url);
  return i < 0 ? {} : { newer: t[i - 1] || null, older: t[i + 1] || null };
}

// Rank of a solution length among all daily targets (1 = shortest).
function rank(posts, chars) {
  const t = posts.filter(isTarget);
  return { rank: t.filter((p) => p.data.chars < chars).length + 1, total: t.length };
}

const byPlayer = (posts, id, except, n = 6) => posts.filter((p) => isTarget(p) && p.data.player === id && p.url !== except).slice(0, n);

function searchIndex(posts, lang) {
  const P = players();
  return posts.map((p) => ({
    t: p.data.title,
    u: rel(p.url),
    d: iso(p.date),
    l: fdate(p.date, lang),
    i: rel(p.data.target || p.data.cover || "/assets/icon.svg"),
    ...(p.data.player ? { p: p.data.player, n: P[p.data.player]?.name || p.data.player } : {}),
    ...(p.data.chars ? { c: p.data.chars } : { k: p.data.kicker || i18n[lang].news }),
  }));
}

// Views of a post (English + French pages), from _data/views.json (written by the update from GoatCounter).
const viewsOf = (views, ref) => { const v = views?.[normRef(ref)]; return v ? (v.en || 0) + (v.fr || 0) : 0; };
const fnum = (n, lang) => Number(n).toLocaleString(lang === "fr" ? "fr-FR" : "en-US").replace(/\u202f/g, "\u00a0");

// Posts with views, most read first; posts nobody has read yet (newest first).
const popular = (posts, views) => posts.map((p) => ({ p, v: viewsOf(views, p.data.ref) }))
  .filter((x) => x.v > 0).sort((a, b) => b.v - a.v || b.p.date - a.p.date);
const unseen = (posts, views) => posts.filter((p) => viewsOf(views, p.data.ref) === 0);
// The unread posts as JSON for the random pick on the popular page (safe inside <script>).
function unseenJson(posts, views, lang) {
  const P = players();
  return JSON.stringify(unseen(posts, views).map((p) => ({
    u: rel(p.url), t: p.data.title, i: rel(p.data.target || p.data.cover), d: iso(p.date), l: fdate(p.date, lang), e: excerpt(p, 48),
    ...(p.data.chars ? { c: p.data.chars } : { k: p.data.kicker || i18n[lang].news }),
    ...(p.data.player ? { n: P[p.data.player]?.name || p.data.player, a: rel(P[p.data.player]?.avatar || "/assets/icon.svg"), h: rel(`${i18n[lang].players_url}${p.data.player}/`) } : {}),
  }))).replace(/</g, "\\u003c");
}

export const filters = {
  viewsOf, fnum, popular, unseen, unseenJson,
  fdate, fmonth, fshort, excerpt, calendar, leaderboard, lengths, neighbors, rank, byPlayer, searchIndex,
  iso,
  targets: (posts) => posts.filter(isTarget),
  news: (posts) => posts.filter((p) => !isTarget(p)),
  ref: normRef,
  alternates: (refs, ref) => refs?.[normRef(ref)] || {},
  player: (id) => ({ id, ...(players()[id] || { name: id }) }),
  ordinal: (n, lang) => (lang === "fr" ? (n === 1 ? "1re" : `${n}e`) : `${n}${["th", "st", "nd", "rd"][(n % 100 > 10 && n % 100 < 14) || n % 10 > 3 ? 0 : n % 10]}`),
};
