---
title: "Four quarters, one tile: a woven pattern in 102 characters"
ref: 2026-05-10
permalink: /2026/05/10/four-quarters-one-tile/
description: "How one conic gradient, cut into four quarters and repeated as a 220 × 360 tile, draws two black columns on red and yellow bands, in the May 10, 2026 CSS Battle target."
target: /assets/targets/2026-05-10.png
target_url: https://cssbattle.dev/play/Sl1N4d7WBfdzS88eFDfM
colors: ["#e25c57", "#e2ad56", "#222"]
player: emohdaziz
chars: 102
score: 751.31
match: 100
code: |
  <style>&{background:28%64q/55%120%conic-gradient(at 5pc,#e25c57,25%,#e2ad56 0 50%,#e25c57 0 75%,#222 0
---

The May 10 target looks like a woven fabric: two tall black columns on a red band, with red and yellow squares at the top and bottom. Mohamed Ali draws it with a single background on html. A conic gradient splits a 220 × 360 tile into four quarters: red, yellow, red and dark gray. The background repeats that tile, and the copies make the whole pattern.

**Wide view** shows the six copies of the tile around the canvas. **Teaching colors** give each quarter its own color, so you can see which quarter makes each part of the canvas.

{% include animations/2026-05-10.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                          /* at the top level: html */
  background:
    28% 64q /                /* position: the tile at (50.4, 60.47) */
    55% 120%                 /* size: a 220 × 360 tile */
    conic-gradient(at 5pc,   /* center at (80, 180) in the tile */
      #e25c57, 25%,          /* red from 0, then a transition hint at 25% */
      #e2ad56 0 50%,         /* yellow from 25% (the 0 is raised) to 50% */
      #e25c57 0 75%,         /* red from 50% to 75% */
      #222 0                 /* #222 from 75% to the end; the end of the code closes ( and { */
```

## How it works

### 1. One background on html

At the top level of a style sheet, `&` means the root of the document: html. My Chrome gives the same picture with `html{`.

The background of the root element is painted over the whole canvas. Its positioning area is html's box. The code has no doctype, so the page is in quirks mode, and there html fills the window: my Chrome measures it at (0, 0), 400 × 300. Every percentage below is a share of that box.

### 2. A 220 × 360 tile

After the `/`, `55%120%` is the size of the background image: 55% of 400 = 220 wide, 120% of 300 = 360 tall. The tile is taller than the canvas.

Why 360? The gradient's center sits at mid-height of the tile, so each quarter is half the tile tall. The black columns in the target are 180 tall, so the tile must be 2 × 180 = 360.

### 3. Four quarters

`conic-gradient(at 5pc,…)` turns around a center. `5pc` is 5 picas, 5 × 16 = 80px from the left edge of the tile. With only one value, the vertical position is the default, 50%: 180px. My Chrome computes the center as `at 5pc 50%`.

A conic gradient starts at the top and turns clockwise. Its stops are percentages of a full turn:

- `#e25c57` starts at 0. The lone `25%` that follows has no color: it is a transition hint.
- `#e2ad56 0 50%` gives yellow two positions. A position smaller than an earlier one is raised to the largest earlier one: the `0` becomes 25%, the place of the hint. With the hint and the next color at the same place, the change from red to yellow is sharp. Yellow runs from 25% to 50%.
- `#e25c57 0 75%`: the `0` is raised to 50%. Red runs from 50% to 75%.
- `#222 0`: the `0` is raised to 75%. The last color runs to the end of the turn.

Around the center (80, 180), each quarter of the turn is a rectangle of the tile:

- quarter 1, 0 to 25%: top right, 140 × 180, red;
- quarter 2, 25 to 50%: bottom right, 140 × 180, yellow;
- quarter 3, 50 to 75%: bottom left, 80 × 180, red;
- quarter 4, 75 to 100%: top left, 80 × 180, #222.

### 4. The tile at (50.4, 60.47)

`28%64q` is the position. A percentage lines up the point at 28% of the tile with the point at 28% of the area. Horizontally, that is 28% × (400 − 220) = 50.4.

`q` is the quarter-millimeter: 1in = 96px = 101.6Q, so 1Q = 0.945px. My Chrome computes `64q` as 60.4724px.

So the tile's top-left corner is at (50.4, 60.47). Its black quarter runs from x = 50.4 to 130.4 and from y = 60.47 to 240.47.

### 5. The tile repeats

A background repeats by default: a copy every 220px across and every 360px down, in both directions. The canvas shows parts of three columns of tiles, starting at x = −169.6, 50.4 and 270.4, and two rows, starting at y = −299.53 and 60.47.

- Middle band, y from 60.47 to 240.47: the top half of the second row. The black quarters of the middle and right tiles make the two columns. Quarter 1, red, fills the rest: between the columns and on both sides.
- Top band, y from 0 to 60.47: the bottom of the row above. Quarter 3, red, sits above each column. Quarter 2, yellow, fills the rest.
- Bottom band, y from 240.47 to 300: the bottom half of the second row, with the same red and yellow.

With `no-repeat` before the gradient (112 characters), there is only one tile on white: compared with my render of the official code, 68,116 pixels change by more than 8 levels.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&{` reaches html in 2 characters. With `html{` (105 characters), the picture is the same.
- One `background` shorthand holds the position, the size and the image: `28%64q/55%120%` before the gradient, with no space after `%`. With the spaces, `28% 64q/55% 120% conic-gradient` (105 characters), the picture is the same.
- `28%` writes 50.4px in 3 characters. With `50.4px 64q` (106 characters), the picture is the same.
- `64q` writes 60.47px in 3 characters. With `28%60.47px` (106 characters), the picture is the same.
- `55%120%` writes 220 and 360. With `220px 360px conic-gradient` (107 characters), the picture is the same.
- `5pc` writes 80px in 3 characters. With `at 80px` (103 characters), the picture is the same.
- One value after `at` is enough: the vertical center is 50% by default. With `at 5pc 50%` (106 characters), the picture is the same.
- `#e25c57,25%,` writes a sharp edge at 25% with a transition hint. It is the same length as a color position: with `#e25c57 25%,` (102 characters), the picture is the same. The 25% is needed: with `#e25c57,#e2ad56 0 50%` (98 characters), the yellow starts at 0 and quarter 1 turns yellow, 43,802 pixels change.
- Each later color starts at `0`, which is raised to the end of the color before it. With `#e2ad56 25% 50%` (104 characters), the picture is the same.
- `#222` is the short form of `#222222`. With `#222222` (105 characters), the picture is the same.
- The code ends inside the gradient and the rule: the end of the code closes them. With `)}` at the end (104 characters), the picture is the same.
- The repeat is free: it is the default. The whole woven pattern comes from one tile.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes at the same place as the target, but 1,992 pixels differ by more than 8 levels. They are all in two rows, y = 60 and 240, and four columns, x = 50, 130, 270 and 350: the edges of the colors. The largest difference is 130 levels, at (50, 60): (164, 88, 70) in my render, (34, 34, 34) in the target. With `50px 60px` in place of `28%64q` (105 characters), my render matches the target, with no pixel over 8 levels. So in my Chrome, these differences come from edges that fall between two pixels, at x = 50.4, 130.4, 270.4 and 350.4 and at y = 60.47 and 240.47: the pixels on each edge get a mix of the two colors. The CSS Battle judge gives the official code a 100% match.
