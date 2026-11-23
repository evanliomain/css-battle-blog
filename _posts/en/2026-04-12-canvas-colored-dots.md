---
title: "Canvas-colored dots: three notched bars in 136 characters"
ref: 2026-04-12
permalink: /2026/04/12/canvas-colored-dots/
description: "How three shadows of a 40px-wide html make three dark bars, and how body's dotted border, with 80px dots in the canvas color, cuts the notches into them, in the April 12, 2026 CSS Battle target."
target: /assets/targets/2026-04-12.png
target_url: https://cssbattle.dev/play/aR15oOvIfB1V91KhsWH0
colors: ["#f3ac3c", "#442929"]
player: kieron
chars: 136
score: 709.43
match: 100
code: |
  <style>&{margin:65 210 65 150;color:442929;box-shadow:-5ch 0,5ch 0,25vw 0;*{background:#f3ac3c;margin:40-300-90;border:5pc dotted#F3AC3C
---

The April 12 target shows three dark brown bars on an orange canvas, with half-disc notches: one between the first two bars, cut into both, and one on the right side of the third. Kieron makes html a 40px-wide box and gives it three shadows: they are the bars, and html itself is the gap between the first two. body gets a dotted border 80px thick. Its dots are 80px discs, in the canvas color: where they cross the bars, they cut the notches.

With **Wide view**, the whole of body shows, 640px wide, with its ten dots. With **Teaching colors**, the shadows and the dots get their own color.

{% include animations/2026-04-12.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                              /* top level: the root, html */
  margin: 65 210 65 150;         /* html: 40 × 170 at (150, 65) */
  color: 442929;                 /* dark brown, no # (quirks mode) */
  box-shadow:
    -5ch 0,                      /* bar at x = 110 (5ch = 40px in my Chrome) */
    5ch 0,                       /* bar at x = 190 */
    25vw 0;                      /* bar at x = 250 (25vw = 100px) */
  * {                            /* & *: body (head and style are not displayed) */
    background: #f3ac3c;         /* goes to the canvas */
    margin: 40-300-90;           /* body: 640 × 220 at (-150, 105) */
    border: 5pc dotted #F3AC3C;  /* 80px dots, in the canvas color */
    /* the end of the code closes the rules */
```

## How it works

### 1. `&` is html, `*` is body

At the top level of a style sheet, the nesting selector `&` matches the root: html. Inside it, `*` stands for `& *`: every element inside html, so head, style and body. head and style are not displayed, so only body counts. getComputedStyle confirms it: html has the margin of the first rule, body the margin and border of the second.

### 2. html: 40 × 170

CSS Battle pages have no doctype, so they are in quirks mode, where unitless lengths in margins count as pixels.

`margin:65 210 65 150` is 65 at the top and bottom, 210 on the right, 150 on the left. html is 400 − 150 − 210 = 40px wide. In quirks mode, html stretches to the height of the viewport, minus its margins: 300 − 65 − 65 = 170. getBoundingClientRect gives 150, 65, 40 × 170.

### 3. Three shadows, three bars

`color:442929` has no `#`. Quirks mode accepts a hex color without its `#` for `color`: getComputedStyle gives rgb(68, 41, 41). A shadow with no color of its own takes the text color, so the three shadows are #442929.

A shadow is a copy of the box, moved by its offsets. `5ch` is five times the width of the digit 0 in the current font: 40px in my Chrome. `25vw` is a quarter of the 400px viewport: 100px. The copies land at x = 150 − 40 = 110, 150 + 40 = 190 and 150 + 100 = 250, each 40 × 170, from y = 65 to 235. The target puts its bars at x = 110, 190 and 250, from y = 65 to 235.

An outer shadow is never painted under its own box. From x = 150 to 190, html shows nothing: that is the gap between the first two bars.

### 4. body's background paints the canvas

body has `background:#f3ac3c`. html has no background, so the browser uses body's background for the whole canvas, and does not paint it on body's own box.

That matters here, because body's box covers the bars. If html gets a background too (`&{background:#f3ac3c;…`, 155 characters), body keeps its own background and paints it over its box, from y = 105 down: the bars disappear below that line, and 12,798 pixels change.

### 5. body: 640 × 220, centered on html

body sits in html's content: 40 × 170 at (150, 65). `margin:40-300-90` is 40 at the top, −300 left and right, −90 at the bottom. The minus signs start new numbers, so no spaces are needed.

The top: 65 + 40 = 105. The negative side margins widen body: 40 + 300 + 300 = 640px, from x = 150 − 300 = −150. Its middle is at −150 + 640 / 2 = 170, html's middle. In quirks mode, body stretches to html's height minus its margins: 170 − 40 + 90 = 220. getBoundingClientRect gives −150, 105, 640 × 220.

### 6. A border of 80px dots

`border:5pc dotted#F3AC3C`: 1pc is 16px, so 5pc is 80px. A dotted border that thick draws round dots 80px wide.

To see all of them, I rendered a 640 × 220 box with the same border in red. Along the top, my Chrome puts five discs: one at each corner, with gaps of (640 − 5 × 80) / 4 = 60px, so one disc every 140px. On body, their centers are at x = −110, 30, 170, 310 and 450, at y = 105 + 40 = 145. The bottom row is the same, at y = 285. The left and right sides are 220px tall: nothing fits between the corner discs.

### 7. Dots the color of the canvas

The dots are `#F3AC3C`, the canvas color. On the canvas they do not show. body's border is painted after html's shadows, so where a disc crosses a bar, it covers it with orange.

The disc at (170, 145) spans x = 130 to 210: it cuts into the right side of the first bar (x = 130 to 150) and the left side of the second (x = 190 to 210). The disc at (310, 145) spans x = 270 to 350 and cuts into the third bar from x = 270. The disc at (30, 145) touches no bar. The target's notches are the same: circles of radius 40 centered at (170, 145) and (310, 145).

The bottom row starts at y = 105 + 220 − 80 = 245, 10px below the end of the bars at y = 235.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&` and a nested `*` are shorter than naming both elements. With `html{…}body{…` (142 characters), the picture is the same.
- The color is written once, as the text color, and the three shadows take it. With `#442929` in each shadow and no `color` (144 characters), the picture is the same.
- `442929` needs no `#` in quirks mode. With `color:#442929` (137 characters), the picture is the same.
- `-5ch` and `5ch` are 4 and 3 characters, `-40px` and `40px` 5 and 4. With `-40px 0,40px 0` (138 characters), the picture is the same.
- `25vw` is 4 characters, `100px` 5. With `100px` (137 characters), the picture is the same.
- `5pc` is 3 characters, `80px` 4. With `80px` (137 characters), the picture is the same.
- Unitless margins count as px in quirks mode. With `65px 210px 65px 150px` and `40px -300px -90px` (152 characters), the picture is the same.
- `40-300-90` needs no spaces: each minus starts a new number. With `40 -300 -90` (138 characters), the picture is the same.
- `dotted#F3AC3C` needs no space before the `#`. With `dotted #F3AC3C` (137 characters), the picture is the same.
- The border color matters. Without it (`border:5pc dotted`, 129 characters), the dots take the text color, #442929: dark discs, no notches, 25,830 pixels change.
- The bottom margin keeps the bottom row of dots off the bars. Without it (`margin:40-300`, 133 characters), body is only 160px tall, html grows to 240px, and the bottom row lands on the bars: 9,086 pixels change. With `-80`, the row starts at y = 235, where the bars end, and the picture is the same. With `-70`, it starts at y = 225: 57 pixels change.
- The side margins set the spacing of the dots. With `-310`, body is 660px wide, the discs are 145px apart, the middle one stays at x = 170 and the third bar's notch starts at x = 275 instead of 270: 404 pixels change.
- The code ends inside the rules: the end of the code closes them. With `}}` at the end (138 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes as the target. 240 pixels differ from the target by more than 8 in one channel, all on the edges of the two orange discs, within 1.2px of their circles: the same edge pixels get a different shade of orange and brown. The CSS Battle judge gives the official code a 100% match.
