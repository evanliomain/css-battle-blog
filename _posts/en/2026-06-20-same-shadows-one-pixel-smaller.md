---
title: "Same shadows, one pixel smaller: an L in 95 characters"
ref: 2026-06-20
permalink: /2026/06/20/same-shadows-one-pixel-smaller/
description: "How html's four black box-shadows draw an L around an 80 × 80 hole, and how body, 1px smaller on each side, adds a 1px ring with the same shadows, in the June 20, 2026 CSS Battle target."
target: /assets/targets/2026-06-20.png
target_url: https://cssbattle.dev/play/g7g7LD4T5HXt9Pru8Yvq
colors: ["#f3ac3c", "#000"]
player: cubachatou
chars: 95
score: 761.74
match: 100
code: |
  <style>*{background:#F3AC3C;margin:110 160;box-shadow:53q 53q,-53q -53q,0 53q,-53q 0;*{margin:1
---

The June 20 target is a black L made of blocks on an orange background: a tall bar on the left with a block at the top, and a wide bar at the bottom with a block on the right. Vegy turns html into an 80 × 80 square and gives it four black shadows: four copies of the square, moved 50.08px. A shadow is never painted under its own box, so the copies leave a square hole. body gets the same shadows, and is 1px smaller on each side: its shadows add a 1px ring inside the hole.

Use **Teaching colors** to see each of html's shadows, and body's shadows painted on top.

{% include animations/2026-06-20.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                     /* html, head, style, body */
  background: #F3AC3C;  /* html's goes to the whole canvas */
  margin: 110 160;      /* quirks mode: px; html is 80 × 80 at (160, 110) */
  box-shadow:           /* black copies of the box, 53q = 50.08px */
    53q 53q,            /* right and down */
    -53q -53q,          /* left and up */
    0 53q,              /* down */
    -53q 0;             /* left */
  * {                   /* * *: head, style, body */
    margin: 1           /* body: 78 × 78 at (161, 111) */
```

## How it works

### 1. Quirks mode: html is an 80 × 80 square

`*` selects html, head, style and body. head and style are hidden, so only html and body are drawn.

CSS Battle pages have no doctype, so they are in quirks mode. In my render, `document.compatMode` is `BackCompat`. Two quirks matter here:

- `margin:110 160` has no unit, and margin accepts that in quirks mode: it is read as 110px and 160px.
- html fills the height of the canvas. html is 400 − 2 × 160 = 80px wide and 300 − 2 × 110 = 80px tall.

I measured html at x = 160 to 240 and y = 110 to 190.

html's background goes to the whole canvas: everything is orange.

### 2. Four copies of html

A box-shadow with no blur and no spread is a copy of the box, moved by its offset. The unit is `q`, a quarter of a millimeter: 53q = 53 × 0.945 = 50.08px. There is no color, so the shadow takes the text color, black.

The four offsets move a copy right and down, left and up, straight down, and straight left:

- `53q 53q`: x = 210.08 to 290.08, y = 160.08 to 240.08.
- `-53q -53q`: x = 109.92 to 189.92, y = 59.92 to 139.92.
- `0 53q`: x = 160 to 240, y = 160.08 to 240.08.
- `-53q 0`: x = 109.92 to 189.92, y = 110 to 190.

### 3. The hole is html's box

A box-shadow is never painted under its own box. Every copy overlaps html's box, and that part is cut away. The four pieces make the L, around a square hole: html's box, 80 × 80.

I checked it with body's shadows removed: the hole is orange from x = 160 to 239 and y = 110 to 189, even where the shadow `-53q 0` covers it.

### 4. body and the nested rule

`*{margin:1` is nested inside `*{`, so it reads `* *`: every element inside another one, here head, style and body. It has the same specificity as `*` and comes later, so body gets `margin:1` instead of `margin:110 160`.

In quirks mode, body also fills html. I measured body at x = 161 to 239 and y = 111 to 189: 78 × 78. Its orange background is painted on the orange canvas, so it does not show.

### 5. A 1px ring

body gets the same four shadows: four black copies of 78 × 78, moved 50.08px, painted after html's. They are cut under body's box, which is 1px smaller than html's on each side. Outside html's box, they fall on html's black shadows. Inside it, they cover a 1px ring: the hole becomes 78 × 78, from x = 161 to 239 and y = 111 to 189. That is the size of the hole in the target.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One rule gives the background, the margin and the shadows to html and to body at once. html's shadows draw the L, and the same shadows on body draw the ring.
- A shadow with no color is black here, the text color: no color to write, four times.
- The margin can skip `px` in quirks mode, but box-shadow can't. With `50` in place of each `53q` (89 characters), Chrome drops the whole box-shadow, the canvas is plain orange, and 16,634 pixels change. `q` is a one-letter unit, and 53q = 50.08px.
- `;*{margin:1` is 11 characters and does two jobs:
  - it makes body 1px smaller than html on each side. With `;box-shadow:none` added to the inner rule (111 characters), body has no shadows, the hole is 80 × 80, and 214 pixels change, all on that 1px ring.
  - it keeps html 80px tall. Without `;*{margin:1` (84 characters), body keeps `margin:110 160`: it is 0 × 0 at (320, 220), so its shadows are empty, and its margins make html 110px tall instead of 80. The bottom of the L moves 30px down, and 8,234 pixels change.
- Nothing is closed. `}}` at the end gives the same picture in 97 characters.

## If you try it at home

In my local Chrome, the official code is very close to the target but not identical: 1,232 pixels differ by more than 8 on a channel. Only 3 of them differ by a lot: (189, 110), (239, 160) and (160, 189), at inner corners of the hole. They are orange in my render and black in the target.

521 of the others are half-tone pixels in my render, along the edges. 53q is 50.08px, not 50px, so the shadow edges fall between two pixels. With `50px` in place of each `53q` (101 characters), my render has no half-tone pixels left.

The last 708 are flat orange or black in my render, but the target is not quite flat there: it has 419 different colors, with small changes near the edges, and its orange is #f3ab3c. The CSS Battle judge gives the code a 100% match.
