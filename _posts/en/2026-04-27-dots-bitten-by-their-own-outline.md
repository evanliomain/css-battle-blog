---
title: "Dots bitten by their own outline: eight Pac-Men in 168 characters"
ref: 2026-04-27
permalink: /2026/04/27/dots-bitten-by-their-own-outline/
description: "How one rule gives html and body dotted borders, how an outline in the background color bites a quarter out of each dot, and how a reflection copies body to the left, in the April 27, 2026 CSS Battle target."
target: /assets/targets/2026-04-27.png
target_url: https://cssbattle.dev/play/OhW92nn3P508esbUhggN
colors: ["#282342", "#6592cf"]
player: koda_pig
chars: 168
score: 680.66
match: 100
code: |
  <style>*{border-block:32q dotted#282342;margin:55 150;outline:38q solid#6592CF;outline-offset:-53q;*{margin:50-90-200 90;-webkit-box-reflect:left 5em;background:#6592CF
---

The April 27 target is eight dark discs on a blue background, each with a quarter missing. koda_pig draws them with the dotted top and bottom borders of html and body: 30px dots, two on each edge. An outline in the background color bites a quarter out of each dot, and `-webkit-box-reflect` copies body's two dots to the left.

With **Teaching colors**, each box and each outline gets its own color. **Wide view** shows the bottom of body, below the canvas.

{% include animations/2026-04-27.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* every element: html and body count */
  border-block: 32q dotted#282342; /* top and bottom only: 30px dots */
  margin: 55 150;                  /* html: 100 × 190, from (150, 55) */
  outline: 38q solid#6592CF;       /* 35px, in the background color */
  outline-offset: -53q;            /* −50px: covers 15px to 50px in */
  * {                              /* an element inside an element: body */
    margin: 50-90-200 90;          /* body: 100 × 280, from (240, 135) */
    -webkit-box-reflect: left 5em; /* a mirror image, 80px to the left */
    background: #6592CF            /* moves to the whole canvas */
/* the end of the code closes the two rules */
```

## How it works

### 1. One rule for every element

The code is only a `<style>` tag. The browser builds html, head (with the style inside) and an empty body. `*` matches all four. head and style are not displayed, so the rule only shows on html and body.

There is no doctype, so the page is in quirks mode. A bare number like `55` in a margin is read in px.

### 2. html: 100 × 190

`margin:55 150` puts 150px on the left and right, and 55px on top and at the bottom. In quirks mode, html stretches to the height of the frame. getBoundingClientRect gives html a box from (150, 55) to (250, 245): 400 − 2 × 150 = 100 wide, 300 − 2 × 55 = 190 tall.

### 3. Dotted borders: 30px discs

`border-block` sets the top and bottom borders only. 32q is 32 × 0.945 = 30.24px; getComputedStyle gives 30px in my Chrome. A `dotted` border that thick draws round dots, 30px wide. On a 100px edge, my Chrome draws two of them, one at each end.

So html has four discs, at its four corners: x = 150 to 180 and 220 to 250, on the top edge (y = 55 to 85) and the bottom edge (y = 215 to 245). The color, `#282342`, is the dark one of the target.

### 4. The outline bites a quarter

`outline:38q solid#6592CF` is 35px thick in my Chrome, and `outline-offset:-53q` is −50px. A negative offset pulls the outline inside the box: it starts 50px in from the border edge and grows 35px outward, so it covers from 15px to 50px in.

15px is the center of the discs. Across html's 100px width, 50px from each side meet in the middle: there is no hole, and the outline is a solid rectangle from x = 165 to 235 and y = 70 to 230. It is painted over the borders, so each disc loses the quarter that faces the middle of html.

The outline has the background color. On the blue canvas, it does not show: only the bites stay. Without the two outline declarations (123 characters), the eight discs are whole, and 1,466 pixels change.

### 5. body: the nested rule

The nested `*{` means "an element inside an element". html is inside nothing, so it only reaches head, style and body. body gets both rules: the border and the outline from the first one, and `margin:50-90-200 90` from the nested one. Both rules have the same specificity, so the margin written last wins.

- left 90 and right −90: body stays 100 − 90 + 90 = 100 wide, from x = 150 + 90 = 240 to 340;
- top 50: body starts at 55 + 30 + 50 = 135, below html's top border;
- bottom −200: in quirks mode, body also stretches to fill html. html's inside is 190 − 2 × 30 = 130 tall, so body is 130 − 50 + 200 = 280 tall, down to y = 415.

getBoundingClientRect gives body the box (240, 135) to (340, 415). Its two top discs are at y = 135 to 165, x = 240 and 310. Its two bottom discs, at y = 385 to 415, are off the canvas. Its outline covers x = 255 to 325 and y = 150 to 400: it bites the inner quarter of the two top discs.

### 6. The reflection

`-webkit-box-reflect:left 5em` paints a mirror copy of body on its left side, 5em = 80px away (the font size is 16px). body starts at x = 240, so the copy ends at x = 160 and starts at 60. The mirror line is x = 200: a point at x goes to 400 − x.

The copy has the discs and the outline too. The disc at x = 255 (center) goes to 145, the one at 325 goes to 75. Both stay bitten on the side that faces the middle. That is the left pair of the target.

### 7. The background goes to the canvas

html has no background. In that case, the browser moves body's background to the whole canvas, and body's own box paints none. So `#6592CF` is the canvas color.

That matters here: html's bottom discs reach 10px into body's box (x = 240 to 250) and into its reflection (x = 150 to 160). Since body paints no background, nothing covers them. With `html{background:#6592CF}` in front (192 characters), html paints the canvas, body keeps its own background in its box and its reflection, they cover the inner 10px of html's two bottom discs, and 434 pixels change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One rule for two boxes: the border and the outline, 76 characters, are written once and used by html and body. The nested `*{` only changes what body needs. With `}*{` instead of `;*{` (same length), the second rule is no longer nested and also hits html: html moves to (90, 50), and 27,228 pixels change.
- `32q` is 3 characters, `30px` is 4. With `30px` (169 characters), the picture is the same. The same goes for `38q` against `35px` (169 characters), and `-53q` against `-50px` (169 characters).
- `5em` is 80px in 3 characters. With `80px` (169 characters), the picture is the same.
- `-webkit-box-reflect:left 5em;` is 29 characters and draws the left pair of discs. Without it (139 characters), they are missing, and 1,102 pixels change.
- The −200 bottom margin keeps body's bottom border off the canvas. With `50-90 0 90` (166 characters), body is 80px tall, its bottom border comes back from y = 185 to 215, and 2,200 pixels change.
- The background is set on body, and it paints the whole canvas. Without `;background:#6592CF` (149 characters), the canvas is white, the outlines show as blue rectangles, and 83,859 pixels change.
- No space before a `#` or a `-`. With `dotted #282342` (169 characters), or `50 -90 -200 90` (170 characters), the picture is the same.
- The bare numbers need quirks mode. With `<!doctype html>` in front (183 characters), the margins are dropped, html spans the whole width, and 11,764 pixels change.
- The two rules are left open, and there is no `</style>`. With `}}` (170 characters), the picture is the same.
