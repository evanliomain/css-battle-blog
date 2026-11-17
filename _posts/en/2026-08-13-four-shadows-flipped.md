---
title: "Four shadows, flipped: eight rectangles in 146 characters"
ref: 2026-08-13
permalink: /2026/08/13/four-shadows-flipped/
description: "How one list of four box-shadows, on html and on a body stretched and flipped by a negative scale, draws the eight rectangles of the August 13, 2026 CSS Battle target."
target: /assets/targets/2026-08-13.png
target_url: https://cssbattle.dev/play/03BN1qoufCW2Lj4bz6Em
colors: ["#4c4c6b", "#fae29e", "#4a9a86"]
player: gabriele19
chars: 146
score: 699.48
match: 100
code: |
  <style>*{background:#4C4C6B;color:4A9A86;margin:125 190;box-shadow:95q 5ch#FAE29E,-95q -5ch#FAE29E,95q -5ch,-95q 5ch;*{margin:-7-8;scale:1.39-1.88
---

The August 13 target shows four pairs of rectangles on a grey-purple background, one in each corner: a big one and a small one, green and yellow, with the colors swapped from one corner to the next. Gabriele draws all eight with the same four box-shadows. On html, they make the four small rectangles. On body, stretched and flipped upside down by `scale:1.39-1.88`, they make the four big ones.

Use **Teaching colors** to see html and body, which have the color of the canvas.

{% include animations/2026-08-13.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* every element: html, head, style, body */
  background: #4C4C6B;       /* the canvas; body gets it too */
  color: 4A9A86;             /* a hex color without # (quirks mode) */
  margin: 125 190;           /* html: 400 − 380 = 20 wide, 300 − 250 = 50 tall */
  box-shadow:
    95q 5ch #FAE29E,         /* 95q = 89.76px, 5ch = 40px */
    -95q -5ch #FAE29E,
    95q -5ch,                /* no color: currentcolor, the green */
    -95q 5ch;
  * {                        /* every element inside another: body (head and style are hidden) */
    margin: -7 -8;           /* body: 20 + 16 = 36 wide, 50 + 14 = 64 tall */
    scale: 1.39 -1.88        /* 50.04 × 120.32, upside down */
```

## How it works

### 1. One rule for html and body

There is no html, head or body tag in the code: Chrome adds them. `*` targets every element: html, head, style and body. The nested `*{` means `* *`: every element inside another one, so head, style and body. head and style are not displayed. That leaves two boxes: html gets the outer rule, and body gets both. body takes the same background and the same four shadows as html. The nested rule only changes its margin and adds a scale.

The background of html paints the whole canvas `#4C4C6B`. body has the same color, so it is invisible.

### 2. html is 20 × 50

There is no doctype, so the page is in quirks mode, and unitless numbers like `margin:125 190` are px. I checked with `<!doctype html>` in front: the render no longer looks like the target.

`margin:125 190` gives html 125px at the top and bottom, and 190px on the left and right. Its width is what is left: 400 − 2 × 190 = 20px. In quirks mode, html also fills the height of the page, minus its margins: 300 − 2 × 125 = 50px. getBoundingClientRect gives (190, 125), 20 × 50. I checked the height rule with `margin:100 190`: html is then 100px tall.

### 3. Four shadows make the small rectangles

A shadow with no blur is a copy of the box, moved. Each shadow of html is a 20 × 50 rectangle.

- `95q`: `q` is a quarter of a millimeter. 1q = 96 / 101.6 = 0.945px, so 95q = 89.76px. getComputedStyle gives 89.7638px.
- `5ch`: `ch` is the width of the digit 0 in the font of the element. getComputedStyle gives 40px for 5ch in my Chrome.

The four shadows go to (190 ± 89.76, 125 ± 40): x = 100.24 or 279.76, y = 85 or 165. Two are `#FAE29E`, down right and up left. The other two have no color. A shadow without a color takes `currentcolor`, the text color: `color:4A9A86`. In quirks mode, `color` accepts a hex color without its `#`. I checked: without `color:4A9A86`, these two shadows are black, the default text color.

### 4. body is 36 × 64, with the same shadows

The nested rule sets the margin of body to −7px at the top and bottom and −8px on the sides. Negative margins make body bigger than html. Its width is 20 + 2 × 8 = 36px. In quirks mode, body also fills the height of html, minus its margins: 50 + 2 × 7 = 64px. Without the scale, getBoundingClientRect gives (182, 118), 36 × 64. With `margin:100 190`, body is 114px tall, which is 100 + 14.

body has the same four shadows, now 36 × 64. Without the scale, they cover the shadows of html, in the same colors. body is painted over html: I checked by giving body `color:red`, and its two shadows without color cover the green shadows of html.

### 5. The scale stretches body and its shadows

`scale:1.39-1.88` reads as two values: 1.39 across and −1.88 down. A scale works around the center of the box: body's center is (200, 150). body becomes 36 × 1.39 = 50.04px wide and 64 × 1.88 = 120.32px tall. getBoundingClientRect gives (174.98, 89.84), 50.04 × 120.32.

The shadows are part of body, so they are scaled with it, offsets included: 89.76 × 1.39 = 124.77px across, 40 × 1.88 = 75.2px down. The big rectangles span x = 50.21 to 100.25 and 299.75 to 349.79, and y = 14.64 to 134.96 and 165.04 to 285.36.

### 6. The minus sign flips the colors

A negative scale also turns body upside down. Each vertical offset of its shadows changes sign: the yellow shadow at `95q 5ch` goes 75.2px up instead of down. It lands top right, while the yellow shadow of html with the same offsets is bottom right.

I checked with `scale:1.39 1.88`, without the minus: each big rectangle then sits next to a small one of the same color. With −1.88, each big one is next to a small one of the other color, as in the target.

On the shared edges, the big rectangles end at x = 100.25 and start at x = 299.75, and the small ones start at 100.24 and end at 299.76. They overlap by 0.01px, and body is painted on top.

## Golf notes

- One shadow list is written once and draws eight rectangles: `*` gives it to html and body.
- body needs no color of its own: it gets the background of the canvas from `*`, which hides it.
- Two shadows have no color and take `color:4A9A86`. With `#4A9A86` written in both shadows instead, and no `color`, the code is 147 characters, and the render is the same, pixel for pixel.
- `5ch` is 3 characters for 40px. With `40px` in the four offsets, the code is 150 characters, and the render is the same.
- `95q` is 3 characters for 89.76px.
- No spaces are needed in `5ch#FAE29E`, `-7-8` or `1.39-1.88`: the `#` and the minus signs start a new value.
- Two braces are left open, `*{` and `*{`, and there is no `</style>`. With `}}`, the code is 148 characters; with `}}</style>`, 156. The render is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the rectangles are where the target has them, but their edges fall between pixels: for example, the top of the big rectangles is at y = 14.64, and the target's edge is on a whole pixel. 1,560 pixels differ from the target, 1,362 of them by more than 8 levels. All of them are on a row or a column that holds an edge of a rectangle. The largest difference is 75 levels, at (100, 85), where a big rectangle meets a small one: my render is (175, 181, 143) there, and the target is (250, 226, 158). On the CSS Battle judge, the code is a 100% match.
