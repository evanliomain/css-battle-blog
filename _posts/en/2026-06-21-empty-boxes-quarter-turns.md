---
title: "Empty boxes, quarter turns: a viewfinder in 106 characters"
ref: 2026-06-21
permalink: /2026/06/21/empty-boxes-quarter-turns/
description: "How four nested 0 × 0 boxes, each with the same three shadows and each turned a quarter turn more than its parent, draw four red corner brackets around a blue square, in the June 21, 2026 CSS Battle target."
target: /assets/targets/2026-06-21.png
target_url: https://cssbattle.dev/play/YJ5FEvmSn4jjeldoB66K
colors: ["#004b8e", "#fff", "#ec1d25"]
player: emohdaziz
chars: 106
score: 745.65
match: 100
code: |
  <dt><p><style>*{margin:50%;box-shadow:0 0 0 32Q#004b8e,0 0 0 63Q#fff,56q 56q.0.99cm#ec1d25;offset:ray(0deg
---

The June 21 target looks like a viewfinder: four red corner brackets around a small blue square, on a white background. Mohamed Ali draws one bracket and the square with three box-shadows on a box of 0 × 0. Four nested boxes get the same shadows. `offset:ray(0deg)` puts each one on the canvas center and turns it a quarter turn more than its parent, so the bracket comes out at the four corners.

Use **Teaching colors** to see which box paints which bracket and to see the white shadows, and **Wide view** to see html's margin box go below the canvas.

{% include animations/2026-06-21.html lang=page.lang %}

## The code, spaced out

```css
<dt><p>                        /* two more blocks: html > body > dt > p */
<style>
* {                            /* html, head, body, dt, p, style */
  margin: 50%;                 /* 200px for html, 0 for the others */
  box-shadow:
    0 0 0 32Q #004b8e,         /* blue, spread 30.24px: a 60.47px square */
    0 0 0 63Q #fff,            /* white, spread 59.53px: a 119.06px square */
    56q 56q .0 .99cm #ec1d25;  /* red, moved 52.91px, spread 37.42px */
  offset: ray(0deg             /* on the parent's center, turned -90° */
```

## How it works

### 1. Four nested boxes

`*` selects html, head, body, dt, p and style. No tag is closed: p is inside dt, and style is inside p. head and style are hidden, so four boxes are left, each one inside the previous one: html, body, dt and p.

### 2. margin:50% makes them points

A margin in % always uses the width of the containing block, even at the top and bottom. html's containing block is the 400px-wide canvas, so html gets 200px on every side. Its width is 400 − 200 − 200 = 0. Nothing inside it has a height, so its height is 0 too.

body's containing block is html, 0px wide: 50% of 0 is 0. The same goes for dt and p. Without the offset, I measured all four boxes as 0 × 0, at (200, 200).

Without `margin:50%` (95 characters), the boxes are no longer points: the shadows become long bands, and 62,980 pixels change.

### 3. Three shadows on a point

The sizes are in Q, a quarter of a millimeter: 1Q = 0.945px. `Q` and `q` are the same unit, units don't care about case. `cm` is 37.8px.

On a 0 × 0 box, a shadow with a spread is a square twice the spread wide, centered on the box plus the shadow's offset:

- `0 0 0 32Q#004b8e`: 32Q = 30.24px, a blue square of 60.47px.
- `0 0 0 63Q#fff`: 63Q = 59.53px, a white square of 119.06px.
- `56q 56q.0.99cm#ec1d25`: moved 56q = 52.91px right and down, no blur, spread .99cm = 37.42px. A red square of 74.83px.

The first shadow is painted on top. The blue sits on the white, and the white hides the inner part of the red. Only the part of the red square outside the white is left: a corner bracket, 30.80px thick (52.91 + 37.42 − 59.53).

### 4. offset: ray(0deg)

`offset` puts a box on a path. Here the path is a ray at 0deg, which points straight up. `offset-position` is `normal` by default, so the ray starts at the center of the containing block, and the center of the box goes there. html's containing block is the canvas: html moves from (200, 200) up to (200, 150). I measured that move.

`offset-rotate` is `auto` by default: the box turns to follow the ray. The ray points up, so the box turns a quarter turn counterclockwise, −90°. The shadows turn with the box. The red offset of 52.91px right and down becomes 52.91px right and up: html's bracket goes to the top right.

With `offset-rotate:0deg` added (126 characters), the boxes are still centered but do not turn: the four brackets pile up at the bottom right, and 11,731 pixels change.

### 5. The turns add up

body's containing block is html, a point already at (200, 150), so body is centered there too. body is inside html, so its own turn is added to html's: −180°. dt is at −270°, and p at −360°, a full turn. I rendered the code with one red color per box to check where each bracket goes:

- html, −90°: top right, x = 215.50 to 290.33, y = 59.67 to 134.50.
- body, −180°: top left, x = 109.67 to 184.50.
- dt, −270°: bottom left, y = 165.50 to 240.33.
- p, −360°: bottom right, as with no turn at all.

There is a 31px gap between two brackets, from 184.50 to 215.50.

### 6. The white and blue on top

Each box paints after its parent, so p's shadows are painted last. All four white squares sit at the same place, x = 140.47 to 259.53 and y = 90.47 to 209.53, and all four blue squares at x = 169.76 to 230.24 and y = 119.76 to 180.24. Each red square is already under its own white, so the brackets stay brackets. I checked that the white matters: with no white shadow on dt and p, their red squares show whole at the bottom, and 3,960 pixels change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One list of shadows for four brackets, and one nested block per bracket. `<dt><p>` gives two nested blocks in 7 characters: a `<p>` start tag does not close a dt. With `<p>` alone (102 characters), there are three boxes, the bottom right bracket is missing, and 4,105 pixels change. With `<p><p>` (105 characters), the second p closes the first one: the two p are siblings in body, both at −270°, and 4,140 pixels change. `<p><dt>` (106 characters) does the same, since a dt start tag closes the p.
- `offset:ray(0deg` centers and turns each box in 15 characters. `rotate:90deg` (103 characters) also turns each box a quarter turn more than its parent, but the boxes stay at (200, 200): the whole picture is 50px too low, and 26,932 pixels change.
- A number can start with a period, and a period can't be part of a unit. So `56q.0.99cm` reads as 56q, then `.0`, then `.99cm`, with no spaces. `56q 56q 0 .99cm` gives the same picture in 107 characters.
- The blur `.0` is needed: the spread is the fourth length, so a blur has to come before it.
- `32Q`, `63Q` and `56q` are 30.24px, 59.53px and 52.91px in 3 characters each.
- Nothing is closed. `)}` at the end gives the same picture in 108 characters.

## If you try it at home

In my local Chrome, the official code is very close to the target but not identical: 1,442 pixels differ by more than 8 on a channel. All of them are on the edges of the shapes. The edges fall between two pixels, for example the left edge of the brackets at x = 109.67, and my render has a line of half-tone pixels there, where the target is sharp. 604 of them are on the outer edges of the four brackets. The CSS Battle judge gives the code a 100% match.
