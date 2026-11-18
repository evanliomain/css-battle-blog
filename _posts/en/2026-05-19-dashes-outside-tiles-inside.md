---
title: "Dashes outside, tiles inside: five overlapping squares in 126 characters"
ref: 2026-05-19
permalink: /2026/05/19/dashes-outside-tiles-inside/
description: "How one box draws five overlapping squares: a conic gradient in 80px tiles paints its four dark corners, and its 40px dashed outline paints the four outer L shapes, in the May 19, 2026 CSS Battle target."
target: /assets/targets/2026-05-19.png
target_url: https://cssbattle.dev/play/3icQq5UDIsVHnqJqhHzQ
colors: ["#efebdd", "#b29df7", "#594f7c"]
player: h_blierzt
chars: 126
score: 720.37
match: 100
code: |
  <style>*{background:#8602;margin:45 70;*{background:conic-gradient(#B29DF7 75%,#594F7C 0)0 0/5pc 5pc;outline:dashed 5ch#B29DF7
---

The May 19 target shows four light purple squares around a fifth one, on a cream background. Where they overlap, the purple is dark. H_Bliertz draws it all with body alone. Its background is a conic gradient in 80px tiles, which leaves a dark square in each corner. Its dashed outline adds a light L around each corner, and each L with its dark corner reads as a square.

With **Teaching colors**, the light part of body, its dark corners and its outline each get their own color.

{% include animations/2026-05-19.html lang=page.lang %}

## The code, spaced out

```css
<style>                       /* goes into head */
* {                           /* html, head, style, body */
  background: #8602;          /* html's goes to the canvas: #efebdd */
  margin: 45 70;              /* html: 260 × 210, body: 120 × 120 */
  * {                         /* head, style, body */
    background:
      conic-gradient(#B29DF7 75%, #594F7C 0)  /* dark top-left quarter */
      0 0 / 5pc 5pc;          /* 80 × 80 tiles */
    outline: dashed 5ch #B29DF7  /* 40px: dash 80, gap 40 */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `45` in a margin is read in px.

The `<style>` goes into head, and body stays empty. `*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body. head and style are not displayed. Two boxes are left: html and body. The rules are never closed: the end of the code closes them.

The first level gives both boxes a background and a margin. The second level replaces body's background and adds an outline.

### 2. A cream canvas

`#8602` is a 4-digit color: `#886600`, a dark yellow, with an alpha of `22` in hex, 34/255 = 0.133. html's background is not painted in its box: it goes to the canvas. Over the white page, 13.3% of dark yellow gives #efebdd, a cream.

This background has a second job. When html has no background, body's background goes to the canvas instead. Without the first `background:#8602;` (109 characters), the canvas turns into a grid of light and dark purple tiles: 94,750 pixels change.

### 3. One margin, two boxes

html gets `margin:45 70`: 45px at the top and bottom, 70px on the left and right. In quirks mode, html fills the page minus its margins: 400 − 140 = 260 wide, 300 − 90 = 210 tall, at (70, 45).

body gets the same margin, inside html. It fills html minus its margins: 260 − 140 = 120 wide, 210 − 90 = 120 tall, at (140, 90). A 120px square, in the middle of the canvas.

### 4. The conic gradient

The nested rule gives body `conic-gradient(#B29DF7 75%,#594F7C 0)`. A conic gradient turns around the center of its box, clockwise, starting at 12 o'clock. The light purple runs from 0 to 75%, that is from 0° to 270°.

A color stop cannot sit before the previous one: the `0` is raised to 75%. So the dark purple starts at 270° with a hard edge and fills the last quarter, from 9 o'clock to 12 o'clock: the top-left quarter of the box.

### 5. 80px tiles

`0 0/5pc 5pc` puts the gradient at body's top-left corner and makes it 80 × 80. `1pc` is 16px, so `5pc` is 80px. The gradient repeats, like any background image.

Each tile has its 40 × 40 dark quarter at its top left. The first tile covers x = 140 to 220 and y = 90 to 170: its dark quarter is at (140, 90). body is only 120px wide. The second column of tiles starts at x = 220, and only its first 40px show: the left half of a tile, with its dark quarter at the top. The rows work the same way. body ends up light purple, with a dark 40 × 40 square in each corner: at x = 140 and 220, and y = 90 and 170.

### 6. The dashed outline

`5ch` is five times the width of the `0` in the default font, 16px Times. I measured a `5ch` wide box: 40px, so 1ch is 8px here. The outline is 40px thick, drawn outside body's box: from (100, 50) to (300, 250).

Each side is 200px long. Chrome draws 80px dashes, twice the width, with a full dash at each corner. On each side, that leaves a dash, a 40px gap and a dash: 80 + 40 + 80 = 200. The gaps sit in the middle of each side, at x = 180 to 220 on the top and bottom, and y = 130 to 170 on the left and right. The cream shows through them. With `solid` instead of `dashed` (125 characters), the four gaps fill in: 6,400 pixels change, 4 × 40 × 40.

### 7. Five squares from one box

At each corner, a dash of the top or bottom side meets a dash of the left or right side. Together they make a light L, 80px on each arm and 40px thick. body's dark corner fills the inside of the L. The result is an 80px square with a dark quarter, from (100, 50) to (180, 130) for the top-left one.

The eye reads four 80px squares at the corners, a 120px square in the middle, and four dark overlaps. There is only one box. The overlaps are not transparency: they are body's dark corners.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One box does everything. body's background paints the middle and the dark overlaps, and its outline paints the outer parts of the corner squares.
- One margin, two boxes. `*` gives `margin:45 70` to html and body, and the offsets add up: body lands at (140, 90). With the margin on body only, `*{background:#8602;*{margin:90 140;…` (127 characters), the picture is the same.
- `#8602` is 5 characters, and the cream it gives, `#efebdd`, is 7. With `#efebdd` (128 characters), the picture is the same.
- The `0` stop is the shortest hard edge. With `75%` again (128 characters), the picture is the same. With no position at all, `#594F7C)` (124 characters), the dark purple sits at 100% and the last quarter fades from light to dark: 6,052 pixels change.
- Both sizes are needed. With `0 0/5pc` (122 characters), the height is `auto`, which for a gradient means body's full height, 120: the tiles are 80 × 120, the top dark squares grow to 40 × 60 and the bottom ones disappear. 4,800 pixels change.
- The `0 0` is needed too: in the shorthand, a size can only follow a position and a `/`. With `5pc 5pc` alone (122 characters), it is read as a position: the gradient keeps body's size and starts 80px in, and 2,800 pixels change.
- Short units: `5ch` is 3 characters, `40px` is 4. `5pc` is 3 characters, `80px` is 4. With `40px` (127 characters) or `80px 80px` (128 characters), the picture is the same.
- No space before a `#` or after a `)`. With `5ch #B29DF7` or `) 0 0` (127 characters each), the picture is the same.
- Nesting saves a selector. With a separate rule, `}* *{background:conic…` (128 characters), the picture is the same.
- Bare numbers, thanks to quirks mode. With `45px 70px` (130 characters), the picture is the same. With a doctype in front (141 characters), my Chrome drops `margin:45 70`, html is only 8px tall and body is 0px tall: 45,888 pixels change.
