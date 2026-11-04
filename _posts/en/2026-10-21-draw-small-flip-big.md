---
title: "Draw small, flip big: a radar logo in 168 characters"
lang: en
ref: 2026-10-21
permalink: /2026/10/21/draw-small-flip-big/
description: "How a 42px drawing, made of a double border, a body, its shadow and a list bullet, is grown and flipped by scale:-5 into the October 21, 2026 CSS Battle target."
target: /assets/targets/2026-10-21.png
target_url: https://cssbattle.dev/play/EvI5R1ccxSuBhrVqgIEr
colors: ["#e9d97d", "#173c46"]
player: benjamintordjman
chars: 168
score: 680.66
match: 100
code: |
  <dd><li><style>*{background:#E9D97D;color:173C46}&{border-radius:50%;margin:129 179;border:3mm double;scale:-5;>*{margin:10 12-11-36;box-shadow:4px 0;font:45q/0 Courier
---

The October 21 target is a dark teal disc wrapped in two thick arcs, open at the top right, with a bar going up from the disc to the top of the outer arc. It looks like a radar or a signal logo. Benjamin Tordjman draws the whole thing five times smaller, then `scale:-5` grows it and turns it upside down in one go. The two rings are one `double` border, and the disc is the bullet of a list item.

{% include animations/2026-10-21.html lang=page.lang %}

## The code, spaced out

```css
* {
  background: #E9D97D;
  color: 173C46;                 /* border, shadow and bullet color */
}
& {                              /* html */
  border-radius: 50%;
  margin: 129 179;               /* a 42×42 box in the middle */
  border: 3mm double;            /* 11px: 4px line, 3px gap, 4px line */
  scale: -5;                     /* ×5 and a half turn */
  > * {                          /* head (hidden) and body */
    margin: 10 12 -11 -36;
    box-shadow: 4px 0;
    font: 45q/0 Courier;         /* 42.5px, line height 0 */
  }
}
```

## How it works

Every size in the target is a multiple of 5: rings from radius 105 to 85 and 70 to 50, a 20px bar, a 60px disc. So the solution draws everything at 1/5 scale around the center, (200, 150), and lets `scale:-5` do the rest.

### 1. html is a 42px dot with two rings

`&` alone is `html`. `margin:129 179` leaves a 42px wide box. CSS Battle renders in quirks mode, where `html` takes the page height minus its margins: 300 − 258 = 42px. So `html` is a 42×42 box centered on (200, 150), and `border-radius:50%` makes it round.

`border:3mm double`: 3mm is 11.3px, which Chrome draws as 11px. A `double` border splits that width into a line, a gap and a line: here 4px, 3px and 4px. On a round box that gives two thin rings, from radius 21 to 17 and from 14 to 10. The border has no color of its own, so it takes `color`: `173C46`, written with no `#`, which quirks mode accepts.

The yellow background of `html` is not painted in that small box: it covers the whole canvas.

### 2. body hides a quarter

`>*` inside `&` matches the children of `html`: `head`, which stays hidden, and `body`. `body` sits in the 20×20 content box of `html` (x 190 to 210, y 140 to 160), and `margin:10 12 -11 -36` moves it:

- width: 20 + 36 − 12 = 44px, from x=154 to 198;
- height: in quirks mode, `body` takes its parent's height minus its margins: 20 − 10 + 11 = 21px, from y=150 to 171.

Its yellow background, from `*`, covers the bottom-left quarter of the rings.

### 3. Its shadow is the bar

`box-shadow:4px 0` is a copy of the `body` moved 4px to the right. An outer shadow is not painted under its own box, so only a 4×21 strip shows, from x=198 to 202, just past the center line. It takes `color` too: a dark teal bar.

### 4. A list bullet is the disc

The `<dd>` and `<li>` sit in `body`. A `<dd>` indents its content by 40px by default, so the `<li>` starts at x=154 + 40 = 194, and it is only 4px wide.

`font:45q/0 Courier` is set on `body` and inherited: a 42.5px font (45 quarter-millimetres) with a line height of 0. The `<li>` keeps its default bullet, a disc in the text color, sized and placed from that font. It is painted over the backgrounds and the border. On CSS Battle, it is a 12px disc centered on (200, 150).

### 5. scale:-5 grows and flips everything

`scale:-5` scales `html` and everything inside it by −5 on both axes, around the center of its box, (200, 150). Scaling by −5 is the same as scaling by 5 and turning half a turn. So:

| Part | Drawn at | After `scale:-5` |
| --- | --- | --- |
| Rings | radius 21 to 17, 14 to 10 | 105 to 85, 70 to 50 |
| `body` | 154 to 198, 150 to 171 (bottom left) | 210 to 430, 45 to 150 (top right) |
| Shadow | 198 to 202, 150 to 171 | 190 to 210, 45 to 150: the bar |
| Bullet | 12px at (200, 150) | 60px at (200, 150) |

The half turn moves the `body` from the bottom left to the top right, where it hides that quarter of the rings. Its shadow ends up just left of it, from the top of the outer ring down to the center. The canvas does not move: it stays yellow everywhere.

## Golf notes

- Drawing at 1/5 scale keeps every number small, and `scale:-5` brings the half turn for free.
- `border:3mm double` draws both rings in one declaration.
- `<dd><li>`: a bullet is a free disc, painted on top. The `<dd>`'s default 40px indent moves it to the middle.
- `font:45q/0 Courier` sizes the bullet, picks the font that places it, and sets the line height to 0, all at once.
- `color:173C46` with no `#` colors the border, the shadow and the bullet.
- `10 12-11-36` needs no space before a minus sign.

## If you try it at home

CSS Battle scores solutions in its own Chrome, with its own fonts. In the latest Chrome on a Mac (version 156 when this was written), the bullet lands about 3px left of and 7px above the target's disc, centered near (197, 143), and about 400 pixels come out wrong. The bullet's place depends on the font: with `Menlo` or `Times` instead of `Courier`, it moves another 5px down. On the CSS Battle judge, the solution is a 100% match. The animation above draws the disc where the target has it.
