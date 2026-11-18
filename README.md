# CSS Battle Top Solutions

A blog about the winning solution of each [CSS Battle](https://cssbattle.dev) daily target, in English and French. Each post explains the top 1 solution and rebuilds the target with an HTML/CSS animation.

Live site: https://evanliomain.github.io/css-battle-blog/

It is built with [Eleventy](https://www.11ty.dev) (Node 20+) by the GitHub Actions workflow `.github/workflows/pages.yml` on every push to `main`, and served by GitHub Pages. The sources keep the Jekyll layout (`_posts/`, `_includes/`, `_layouts/`, `_data/`) and Liquid templates.

## Pages and navigation

- Home (`_layouts/home.html`): the latest post, shortcuts to the three browse pages, the recent posts.
- Calendar (`pages/calendar.liquid`, `/calendar/`, `/fr/calendrier/`): every month, one square per day.
- Players (`pages/players.liquid` and `pages/player.liquid`, `/players/<id>/`): the top 1 leaderboard and one page per player.
- Lengths (`pages/lengths.liquid`, `/lengths/`, `/fr/longueurs/`): solutions in 10-character buckets.
- Popular (`pages/popular.liquid`, `/popular/`, `/fr/populaires/`): posts ranked by views, one unread post picked at random on every visit ("Another one" picks again), and every unread post.
- Toolbox (`pages/toolbox.liquid`, `/toolbox/`, `/fr/toolbox/`): the CSS Battle Toolbox release posts. They stay out of the calendar and the recent posts; the home page only shows the latest one in a band.
- Quick search (`/` or Ctrl+K, `assets/js/site.js`), fed by `/search.json` and `/fr/search.json`. It understands `<130`, `>200` and `120-140` for lengths.
- On a post: ←/→ go to the previous / next day.

The data behind these pages (calendar, leaderboard, buckets, excerpts, dates) is computed in `lib/blog.js`; the Eleventy settings are in `eleventy.config.js`, the site settings in `_data/site.js`.

The design is dark by default, like cssbattle.dev; the button in the header switches to the light theme (remembered per browser). Fonts are self-hosted in `assets/fonts/`.

## Languages

English lives at the root, French under `/fr/`. Every page exists in both languages:

- interface strings (and the URLs of the generated pages) are in `_data/i18n.yml`, and the list of languages is `languages` in `_data/site.js`;
- the two versions of a page share the same `ref` in their front matter. The language select in the header (🇬🇧 English / 🇫🇷 Français, on every page) uses it to open the same page in the other language;
- posts go in `_posts/en/` and `_posts/fr/` (`lang` and `layout` come from `en.11tydata.json` / `fr.11tydata.json` in the folder);
- each language has its own home page (`index.html`, `fr/index.html`) and Atom feed (`pages/feed.liquid`).

## Analytics

Visits are counted with [GoatCounter](https://css-battle-blog.goatcounter.com) (no cookies, no consent banner). The script is in `_layouts/default.html` and only loads in the production build (`npm run build`), so a local preview counts nothing.

## View counts

Every post shows its views (English + French pages added up), or "Be the first to read it" when it has none. They come from `_data/views.json` (`{ref: {en, fr}}`), written from GoatCounter by `stats-goatcounter.py` (in the knowledge base's `css-battle-ajouter-defi` skill) and committed with each daily update. Between two updates the numbers do not move.

## Writing a post

1. Copy the target image to `assets/targets/<date>.png`.
2. If the player is new, add them to `_data/players.yml`, and put their avatar in `assets/avatars/<id>.webp`.
3. Write the animation in `_includes/animations/<date>.html`. Every animation uses the same layout and controls (see `2026-11-03.html`):

   ```html
   <figure class="anim t1103" data-duration="21" data-wide="0 0 400 600" style="--bg:#eed9d9" [data-scene="t1103"]>
   <style>/* only this animation's shapes, every name prefixed t<MMDD> */</style>
   <div class="anim-col">
     <div class="stage" role="img" aria-label="…"><div class="scene"><!-- shapes, in canvas px --></div></div>
     <div class="legend"><span><i style="--c:#cf5f4b"></i>body</span>…</div>
   </div>
   <div class="anim-side">
     <pre class="code" aria-hidden="true">…<span data-on="2 3">margin:…</span>…</pre>
     <div class="now"><div class="caps">
       <div class="cap" data-t="0" data-step="Short label"><h3>1. Title</h3><p>Text</p></div>
       …
       <div class="cap" data-t="17.6" data-step="Result" data-live="157 characters · 100% match"><h3>8. Result</h3><p>…</p></div>
     </div><div class="live"></div></div>
   </div>
   </figure>
   ```

   - `.scene` is the 400×300 canvas in px; shapes may sit outside it. `data-wide` is the rectangle (x y w h, canvas px) shown by **Wide view**; **Canvas only** shows 400×300. The player hatches and labels what is off canvas (`data-off-label="x y"` moves the "outside the canvas" label if it covers something). For your own labels on the stage, the class `zlab` keeps them readable at any zoom and above the hatching. `--bg` is the canvas color.
   - The legend turns on **Teaching colors**: `fig.dataset.teach` is `"1"` or `"0"`. Use teaching colors for intermediate steps only; the last step is always in the real colors.
   - `data-on` on a code span lists the steps (1-based) where it is highlighted; `data-tone="2"` uses the second color.
   - Time: either CSS keyframes (all with the figure's duration, starting at 0; style per step with `.t<MMDD>[data-step="3"]`, per option with `[data-teach="1"]` / `[data-view="wide"]`), or a script scene: `data-scene="t<MMDD>"` and `window.AnimScenes['t<MMDD>'] = (fig, refresh) => (t, step) => { … }` in an inline `<script>`, called on every frame (it may write `.live`).
   - Both languages in the same file: `{%- if include.lang == "fr" %} … {%- else %} … {%- endif %}`. No blank lines (Markdown would break the HTML).

   `assets/js/anim-player.js` adds Play/Pause, Restart, the slider, the options and the step list, in the page's language.
4. Create the post twice, `_posts/en/<date>-<slug>.md` and `_posts/fr/<date>-<slug-fr>.md`, dated with the target's date. Use this front matter (the French one gets `permalink: /fr/<yyyy>/<mm>/<dd>/<slug-fr>/`):

```yaml
---
title: "…"
ref: <date>
permalink: /<yyyy>/<mm>/<dd>/<slug>/
description: "…"
target: /assets/targets/<date>.png
target_url: https://cssbattle.dev/play/<id>
colors: ["#476573", "#b8d982"]
player: <cssbattle id>
chars: 112
score: 737.55
match: 100
code: |
  <style>…
---
```

Then add `{% include animations/<date>.html lang=page.lang %}` in the body. Posts are about the top 1 solution only.

## Writing a news post

A post that is not about a daily target (a CSS Battle Toolbox release, for example) uses `layout: article` instead of the default `post` layout. It needs no `target`, `player` or `chars`: give it a `cover` (a 4:3 image, shown on the Toolbox page and the home band) and a `kicker` (the label above the title, "News" by default). Put its images in `assets/<topic>/`, and show them with `<figure class="shot">`, or two side by side in `<div class="shots">`. See `_posts/en/2026-11-04-css-battle-toolbox-2-0.md`.

## Local preview

```sh
npm install
npm start          # http://localhost:8080/css-battle-blog/, reloads on every change
npm run build      # the production build, in _site/
```

Behind a TLS-inspecting proxy, give npm the system certificates: `security find-certificate -a -p /Library/Keychains/System.keychain /System/Library/Keychains/SystemRootCertificates.keychain > ~/ca.pem` then `npm_config_cafile=~/ca.pem npm install`.
