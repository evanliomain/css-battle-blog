---
title: "A tiny ellipse and a hint: a spool in 124 characters"
ref: 2026-06-04
permalink: /2026/06/04/a-tiny-ellipse-and-a-hint/
description: "How one repeated radial gradient, with a 2.2px ending shape and a transition hint, draws the yellow and both ellipses behind a rounded body, in the June 4, 2026 CSS Battle target."
target: /assets/targets/2026-06-04.png
target_url: https://cssbattle.dev/play/d88s7WXm7RoYXGfDKQ4P
colors: ["#4a9a86", "#4c4c6b", "#fae29e"]
player: ludvig
chars: 124
score: 722.68
match: 100
code: |
  <STYLE>&{*{background:#4A9A86;margin:50 40;border-radius:17%/52%}background:-5vw/55%radial-gradient(1%4q,#4C4C6B,74q,#FAE29E
---

The June 4 target is a spool on pale yellow: a green barrel with bulging sides, in front of two tall blue-gray ellipses that stick out on the left and right. Ludvig draws it with two elements. html's background is one radial gradient, repeated every 220px: each copy is a blue-gray ellipse on yellow. Its ending shape is only 2.2px wide, and a transition hint stretches the blue-gray out to 69.9px. body is the barrel, a green box with rounded sides.

Use **Wide view** to see the gradient's tiles repeat outside the canvas, and **Teaching colors** to tell the gradient's two colors from body.

{% include animations/2026-06-04.html lang=page.lang %}

## The code, spaced out

```css
<STYLE>
& {                            /* html */
  * {                          /* & *: head, style and body; only body shows */
    background: #4A9A86;
    margin: 50 40;             /* body: 320 × 200 at (40, 50) */
    border-radius: 17%/52%;    /* 54.4/104px, scaled down to 52.3/100px */
  }
  background: -5vw/55%         /* tiles of 220 × 300, the first one at x = −20 */
    radial-gradient(1%4q,      /* ending shape: radii of 2.2 and 3.78px */
      #4C4C6B,
      74q,                     /* a hint: the last stop moves up to 69.9px */
      #FAE29E
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `50` is read in px.

The style element comes first, so it goes into head. body is empty. At the top level, `&` stands for the root: html. The nested `*{` means `& *`: every element inside html, so head, style and body. head and style are not displayed. Only body shows.

### 2. One tile, repeated

html's background is painted on the whole canvas. `-5vw/55%` is its position and its size.

A gradient has no size of its own. `55%` sets the tile's width: 55% of 400 = 220. The height is not given, so the tile is as tall as html: 300. I checked: `/220px 300px` gives the same picture.

`-5vw` is 5% of the 400px width: −20px. It moves the first tile to x = −20. The vertical position is not given, so it is centered, but a tile as tall as html has nowhere to move. The background repeats by default: tiles start at x = −20 and 200 on the canvas, and at −240, 420 and further outside it. Copies above and below are outside the canvas too.

### 3. A tiny ending shape

`radial-gradient(1%4q,…)` is an ellipse, centered in its tile. The two sizes are its radii. The horizontal one is 1% of the tile's width: 2.2px. The vertical one is 4q = 4 × 0.945 = 3.78px. The first tile starts at −20, so its center is at (90, 150). The second one's is at (310, 150).

That ending shape is very small. What it gives is the ratio between the two radii: 3.78 / 2.2 ≈ 1.72.

### 4. The hint

The gradient has three items: `#4C4C6B`, then `74q`, then `#FAE29E`. `74q` has no color. It is a transition hint: the place where the mix of the two colors is half done.

The last color has no position, so it would go at 100%, the edge of the ending shape: 2.2px from the center, along the gradient's horizontal ray. But a stop can't come before a stop or a hint before it. So it moves up to the hint: 74q = 69.9px. I checked: `#FAE29E 74q` gives the same picture.

The hint and the stop are now at the same place, so there is no mix: blue-gray up to 69.9px, then yellow, with a sharp edge. The ellipse keeps the ending shape's ratio: its vertical radius is 69.9 × 1.72 ≈ 120px. Around (90, 150), that gives an ellipse from x = 20 to 160 and from y = 30 to 270. I measured it in my render: x 20 to 159, y 30 to 269. The other one goes from x = 240 to 380.

### 5. body

`& *` gives body `background:#4A9A86` and `margin:50 40`. body starts at (40, 50) and is 400 − 2 × 40 = 320 wide.

There is no `height`. In quirks mode, body fills the height of the window, minus its margins: 300 − 2 × 50 = 200. I measured body: 320 × 200 at (40, 50). Its green covers the middle of both ellipses. Only their outer parts show: 20px on the left and right, and the tips above and below.

### 6. The bulging sides

`border-radius:17%/52%` gives each corner a horizontal radius of 17% of the width, 54.4px, and a vertical radius of 52% of the height, 104px.

On each side, the top and bottom radii add up to 208px, more than body's 200px height. When radii don't fit, every radius is scaled down by the same factor: here 200 / 208. The corners become 52.3px wide and 100px tall. The two corners of a side now meet in the middle: each side is a half-ellipse. I checked: `52.3px/100px` gives the same picture.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- Two elements draw everything. html's gradient makes the yellow and both ellipses, and body makes the barrel.
- The background repeats for free. With `no-repeat` (134 characters), only the first tile is painted: the right half of the canvas turns white, and 30,377 pixels change.
- `55%` is 3 characters for a 220px wide tile, and the tile gets html's 300px height with nothing written. `/220px 300px` with the space it then needs gives the same picture in 133 characters.
- `-5vw` is −20px in 4 characters. `-20px` gives the same picture in 125 characters.
- `1%4q` gives the ellipse's ratio in 4 characters: no space is needed after `%`. `1% 4q` gives the same picture in 125 characters. With `1%1%` (same length), the ratio becomes 3 / 2.2 and the vertical radius drops to about 95px, less than body's half-height: the ellipses no longer stick out above and below body, and 7,380 pixels change.
- `74q` is a hint, and it also sets where the last color starts. `#4C4C6B 74q,#FAE29E` gives the same picture at the same length. Without the `74q,` (120 characters), the blue-gray shrinks to a 2.2px dot, hidden behind body: 13,227 pixels change.
- `17%/52%` is 7 characters for 52.3 × 100px corners, thanks to the scaling. `17%/50%` gives 54.4 × 100px corners: 458 pixels change. `17%/100%` scales by 200 / 400 and gives 27.2 × 100px corners: 2,490 pixels change.
- Bare numbers in the margin: `margin:50px 40px` gives the same picture in 128 characters.
- `&` is html in 1 character. `html{` instead of `&{` gives the same picture in 127 characters.
- Upper case costs nothing: `<style>` and lowercase colors give the same picture at the same length.
- The code stops right after `#FAE29E`. The end of the code closes the gradient, the rules and the style element. Adding `)}}` gives the same picture in 127 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 785 pixels, with the rule of the golf notes. All of them are on curved edges:

- 414 lie on the edge of the blue-gray ellipses, away from body. In my render, that edge has only two colors, `#4c4c6b` and `#fae29e`, with nothing in between. In the target, it has in-between shades.
- 371 lie next to body's edge, mostly along its rounded sides.

The CSS Battle judge gives the code a 100% match.
