---
title: "One rule, two boxes: a pixel frame in 121 characters"
ref: 2026-06-24
permalink: /2026/06/24/one-rule-two-boxes/
description: "How one rule on html and body draws two nested outlines and eight border-image corners, with a one-color conic-gradient and a slice so big that only the corners are left, in the June 24, 2026 CSS Battle target."
target: /assets/targets/2026-06-24.png
target_url: https://cssbattle.dev/play/Dk54uDFqfQ9QnaYGzSTO
colors: ["#394257", "#fae29e"]
player: emohdaziz
chars: 121
score: 726.24
match: 100
code: |
  <style>*{background:#394257;outline:32q solid#FAE29E;margin:70 80;border-image:conic-gradient(#FAE29E)200/5ch 32q/74q 64q
---

The June 24 target is a pale yellow pixel frame on a slate blue background. Two nested frames have square tabs at their corners, and a small dark bar sits in the middle. Mohamed Ali writes a single rule for every element. It draws on html and on body: each gets a yellow outline, and a border-image that paints only its four corners.

Use **Teaching colors** to see which box draws which part.

{% include animations/2026-06-24.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html and body (head and style are hidden) */
  background: #394257;           /* html's background covers the canvas */
  outline: 32q solid#FAE29E;     /* a 30px yellow frame around each box */
  margin: 70 80;                 /* 70px top and bottom, 80px left and right */
  border-image:
    conic-gradient(#FAE29E)      /* a flat yellow image */
    200 /                        /* slice: only the corners are left */
    5ch 32q /                    /* corners 40px tall, 30.24px wide */
    74q 64q                      /* outset: 69.92px and 60.47px out */
```

## How it works

### 1. One rule, two boxes

`*` selects html, head, style and body. head and style are hidden, so the rule draws on two boxes: html, and body inside it. Everything in the picture comes twice, at two sizes.

The background of the root element is painted on the whole canvas. So the canvas is #394257 everywhere.

### 2. The margins

`margin:70 80` has no unit. CSS Battle pages run in quirks mode, where a plain number is read as px: 70px at the top and bottom, 80px on the left and right.

In quirks mode, html fills the height of the page, minus its margins. body fills html the same way. I measured the boxes:

- html: 400 − 160 = 240px wide, 300 − 140 = 160px tall, from (80, 70) to (320, 230).
- body: 240 − 160 = 80px wide, 160 − 140 = 20px tall, from (160, 140) to (240, 160).

### 3. Two outlines

`outline:32q solid#FAE29E` draws a yellow line around each box, outside it. 1q is a quarter of a millimeter, so 32q is 30.24px. Chrome computes the outline width as 30px.

- Around html: a frame from (50, 40) to (350, 260).
- Around body: a frame from (130, 110) to (270, 190).

Inside body's frame, body's own box stays dark. That is the small bar in the middle, 80 × 20.

### 4. A border-image with no border

There is no border, but `border-image` still draws. Its widths are given in lengths, so the border width, 0 here, plays no part. The image is drawn in an area: the box, pushed out by the outset.

`74q 64q` is the outset: 69.92px at the top and bottom, 60.47px on the left and right. For html, the area goes from (19.53, 0.08) to (380.47, 299.92): 360.94 × 299.84.

### 5. Only the corners

`conic-gradient(#FAE29E)` has only one color. It is a flat yellow image, the size of the area.

The slice `200` cuts the image 200px from each edge. Normally that gives four corners, four edges and a middle. Here 200 + 200 = 400 is more than the width, 360.94, and more than the height, 299.84. The slices overlap, so the four edges are empty. The middle is never painted without the `fill` keyword. Only the four corners are left.

Each corner goes into a corner of the area, with the size given by the width `5ch 32q`: 40px tall (1ch is 8px in the default font) and 30.24px wide. Chrome paints them on whole pixels: four 30 × 40 tabs, at x = 20 and 350, y = 0 and 260.

### 6. The body corners

body gets the same border-image. Its area goes from (99.53, 70.08) to (300.47, 229.92): 200.94 × 159.84. 200 + 200 is more than both sides again, so only the corners are drawn. They land inside html's box: four 30 × 40 notches at x = 100 and 270, y = 70 and 190. They hang from the inside of html's frame, which stops at y = 70 and 230, and stay 20px from its sides, at x = 80 and 320.

### 7. The picture

I rendered each part alone. html's frame paints 27,600 yellow pixels, body's frame 9,600, and each set of four corners 4,800. Nothing overlaps: 27,600 + 9,600 + 4,800 + 4,800 = 46,800, the yellow pixel count of the target.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One rule draws everything twice. With `html{` instead of `*{` (124 characters), body's frame and corners are gone, and 14,400 pixels change.
- `margin:70 80` has no unit. `70px 80px` gives the same picture in 125 characters.
- `32q` is 30.24px in 3 characters. `30px` gives the same picture in 122 characters.
- `5ch` is 40px in 3 characters. `40px` gives the same picture in 122 characters.
- `74q 64q` is 69.92px and 60.47px. `70px 60px` gives the same picture in 123 characters.
- The width and the outset need a unit. A plain number there is a multiple of the border width, and the border width is 0. With `5ch 30` (120 characters), the corners are 0 wide and disappear: 9,600 pixels change. With `/74 64` (119 characters), the corners stay on the corners of each box, and 11,480 pixels change.
- The slice only has to be more than half the width of html's image, 180.47. In my render, every slice from 181 up gives the same picture. With `180`, the slices no longer cover the width: a thin strip of the image is left for the top and bottom edges, and it is stretched into two yellow bars, 300 × 40, between the corners. 24,000 pixels change.
- `conic-gradient` is the shortest gradient name for a flat image. `linear-gradient(#FAE29E)` gives the same picture in 122 characters.
- No space is needed between `solid` and `#FAE29E`. With the space, the same picture takes 122 characters.
- Nothing is closed. `}` at the end gives the same picture in 122 characters.
