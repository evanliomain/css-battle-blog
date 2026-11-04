---
title: "Two invisible boxes, three shadows: a pinwheel ring in 164 characters"
lang: en
ref: 2026-10-31
permalink: /2026/10/31/two-invisible-boxes-three-shadows/
description: "How a fixed gradient and three box-shadows shared by html and body, both placed off the canvas, draw the October 31, 2026 CSS Battle target: a ring with four bars."
target: /assets/targets/2026-10-31.png
target_url: https://cssbattle.dev/play/TWNhOfMsYQnVbyjKPFeG
colors: ["#62306d", "#f7ec7d"]
player: evanliomain
chars: 164
score: 683.8
match: 100
code: |
  <style>*{margin:-76-200 211 88;box-shadow:8vw 74vh,54vh 4em,-42vh 88vw;color:f7ec7d;background:radial-gradient(1q,#62306d 53q,#f7ec7d 0 5em,#62306d)fixed}&{width:30
---

The October 31 target is a pale yellow ring on a plum background, with four bars around it like the blades of a pinwheel: up and right from the top right corner, down and left from the bottom left one. I draw the ring with a gradient and the four bars with only three shadows. The trick is that `html` and `body` share one rule: two invisible boxes, mostly off the canvas, that cast the same shadows from two different places.

{% include animations/2026-10-31.html lang=page.lang %}

## The code, spaced out

```css
* {                                     /* html, then body */
  margin: -76 -200 211 88;
  box-shadow:
    8vw 74vh,                           /* 32px 222px */
    54vh 4em,                           /* 162px 64px */
    -42vh 88vw;                         /* -126px 352px */
  color: f7ec7d;                        /* the shadows' color */
  background: radial-gradient(1q, #62306d 53q, #f7ec7d 0 5em, #62306d) fixed;
}
& {                                     /* & alone is html */
  width: 30;
}
```

## How it works

### 1. The ring is a fixed gradient

The background of `html` goes to the canvas. It is a circle (`1q`, a single length, means "a circle"), plum up to 53q (about 50px), yellow up to 5em (80px), plum beyond. The `0` after the yellow snaps it to the previous stop, for a sharp edge.

A background is normally placed on the box of `html`, which is tiny here. `fixed` places it on the 400×300 window instead, so the ring lands right in the center, at (200, 150). Without `fixed`, the canvas gets tiled with copies of a 30×165 tile.

### 2. html: a 30×165 box sticking out at the top

`&{width:30}` makes `html` 30px wide. Its margins put it at x = 88 and y = −76. CSS Battle runs in quirks mode, where `html` fills the window height minus its margins: 300 + 76 − 211 = 165. So `html` runs from y = −76 to y = 89, partly above the canvas.

The box itself is invisible: its background is the canvas. Only its shadows will show.

### 3. body: a 142×30 box above the canvas

`*` gives the same margins to `body`, inside `html`:

- width: 30 − 88 + 200 = 142px (the −200 right margin makes it wider than its parent);
- height, by quirks mode again, `body` fills `html` minus its margins: 165 + 76 − 211 = 30px.

It sits at (176, −152), entirely above the canvas. Its own background is out of sight too.

### 4. One shadow, two bars

Both boxes get the same three shadows, with no color of their own: they take `color`, `f7ec7d`. In quirks mode a color can drop its `#`. A shadow is a copy of the box moved by its offset, so each shadow makes two copies, one per box:

| Shadow | Copy of `html` (30×165) | Copy of `body` (142×30) |
| --- | --- | --- |
| `8vw 74vh` = 32, 222 | vertical bar, bottom left (120, 146) | horizontal bar, top right (208, 70) |
| `54vh 4em` = 162, 64 | vertical bar, top right (250, −12) | off the canvas |
| `-42vh 88vw` = −126, 352 | off the canvas | horizontal bar, bottom left (50, 200) |

The first shadow does two jobs: the gap between its two copies is exactly the gap between the two boxes, (88, −76). The other two shadows each make one bar, and their spare copy falls outside the canvas.

### 5. The square corners come for free

The ring alone would be round everywhere. But each bar runs all the way to the axis of the ring: the top right vertical bar goes down to y = 153, and the horizontal one starts at x = 208. Together they fill the top right corner of the square around the ring, and the bottom left bars do the same on the other side. The parts of the bars that land on the ring are yellow on yellow, so they don't show.

## Golf notes

- `html` and `body` are two boxes for the price of one rule: the margins, written once, give them different sizes and places.
- One shadow serves both boxes, so three shadows draw four bars.
- `fixed` centers the gradient on the window without any `at`.
- `vw`, `vh` and `em` keep the offsets short: `8vw` is 32px and `74vh` is 222px, in 3 and 4 characters.
- `53q` is about 50px; `-76-200` needs no space before the minus sign.
- `color:f7ec7d`: no `#` needed in quirks mode. `<style>` is never closed.
