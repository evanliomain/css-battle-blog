---
title: "A tiny dotted border, scaled by ten: a film strip in 94 characters"
ref: 2026-07-22
permalink: /2026/07/22/a-tiny-dotted-border-scaled-by-ten/
description: "How a 2px dotted border on a 34 × 24 html box, scaled ten times, draws two yellow bars and fourteen squares in the July 22, 2026 CSS Battle target."
target: /assets/targets/2026-07-22.png
target_url: https://cssbattle.dev/play/ieuuiOIavYVfNKSroxMC
colors: ["#f7ec7d", "#2d3464"]
player: fmata
chars: 94
score: 763.29
match: 100
code: |
  <style>&{margin:138 183;border:3q#F7EC7D;border-style:dotted solid;scale:10;background:#2D3464
---

The July 22 target looks like a strip of film: two tall yellow bars on the sides, and a row of seven small yellow squares at the top and at the bottom, on a navy background. fmata draws it with one element, html. It is a tiny 34 × 24 box with a 2px border: solid on the sides, dotted at the top and bottom. Then `scale:10` makes it ten times bigger, and the 2 × 2 dots become 20 × 20 squares.

Use **Teaching colors** to tell the dotted sides from the solid ones.

{% include animations/2026-07-22.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                                /* at the top level: html */
  margin: 138 183;                 /* px: html is 34 × 24, at (183, 138) */
  border: 3q#F7EC7D;               /* 3q = 2.835px, drawn as 2px; no style yet */
  border-style: dotted solid;      /* top and bottom dotted, left and right solid */
  scale: 10;                       /* 340 × 240, from (30, 30) to (370, 270) */
  background: #2D3464              /* painted on the whole canvas */
```

## How it works

### 1. html, and its background on the canvas

There is no doctype: the page is in quirks mode. The style element is never closed, so everything after `<style>` is CSS.

At the top level of a style sheet, `&` stands for the root: html. html's background is not limited to its box. It is painted on the whole canvas, so `background:#2D3464` makes all 400 × 300 pixels navy, even though html itself is small.

### 2. A small box in the middle

In quirks mode, a number with no unit counts as px in `margin`, and html fills the window, minus its margins. The window is 400 × 300. html is 400 − 2 × 183 = 34 wide and 300 − 2 × 138 = 24 tall. I checked with offsetWidth and offsetHeight: 34 × 24, at (183, 138). The box runs from (183, 138) to (217, 162). Its center is (200, 150), the center of the canvas.

body sits inside, 14 × 4, with no border and no background: nothing of it shows.

### 3. A 2px border

`border:3q#F7EC7D` sets the width and the color. One q is a quarter of a millimeter, so 3q = 0.75mm = 0.75 × 96 / 25.4 ≈ 2.835px. Chrome rounds a border width down to whole pixels: the computed width is 2px.

The shorthand gives no style, so the style is `none`. Nothing is drawn yet.

### 4. Dotted at the top and bottom, solid on the sides

`border-style:dotted solid` takes two values: the first one for the top and bottom, the second one for the left and right.

I rendered the box without the scale and read its pixels. The sides are two solid bars, 2px wide, over the whole height of the box: x = 183 to 185 and 215 to 217, from y = 138 to 162. They also cover the corners. The top and bottom borders are dotted. A 2px dotted border is drawn as 2 × 2 squares, 2px apart. Between the two bars, there are seven of them: at x = 187, 191, 195, 199, 203, 207 and 211. They sit on the rows y = 138 to 140 and 160 to 162.

### 5. Ten times bigger

`scale:10` scales html around its center, (200, 150). getBoundingClientRect gives 340 × 240, at (30, 30). Every length is multiplied by ten:

- the bars are 20px wide: x = 30 to 50 and 350 to 370, from y = 30 to 270;
- the dots become 20 × 20 squares, 20px apart: x = 70, 110, 150, 190, 230, 270 and 310;
- the rows of squares run from y = 30 to 50 and from 250 to 270.

The scale is a transform: it only changes how the box is painted. The background stays on the canvas, the same navy everywhere. The result has only two colors, like the target, and matches it pixel for pixel in my render.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- `scale` is what makes the squares. Without `;scale:10` (85 characters), the tiny box stays as it is: 15,352 pixels change. Drawing the border at full size, `margin:30;border:20px#F7EC7D` with no scale, is shorter (82 characters), but in my render a 20px dotted border is made of round dots, nine per row, with the end ones on the corners: 2,033 pixels change. A 2px dotted border makes squares, and scaling keeps them square.
- `scale:10` is the short way to write a transform. `transform:scale(10)` gives the same picture, in 105 characters. `zoom:10` is shorter (93 characters), but zoom also multiplies the margins: html lands at (1830, 1380), off the canvas, and no yellow is left. 15,200 pixels change.
- `3q` is a 2px border in 2 characters. `2px` gives the same picture, in 95 characters. `2q` is 1.89px, and it is rounded down to 1px: the bars and the squares are half as wide, there are fifteen squares per row, and 10,400 pixels change.
- `dotted solid` sets two pairs of sides in one property. With `dotted` alone (88 characters), the sides turn into squares too: 4,000 pixels change.
- `&` is html in 1 character. `html` gives the same picture, in 97 characters. `*` is as short, but it also gives body the same 138px and 183px margins. To hold them, html grows to 284px tall, and once scaled its dotted rows land far off the canvas: only the two bars are left, and 8,000 pixels change.
- Quirks mode and missing spaces save characters. With `138px 183px`, the code is 98 characters. With a space in `3q #F7EC7D`, it is 95. Same picture each time.
- Nothing is closed. The last declaration needs no `;`, and closing everything with `}</style>` takes 103 characters, 9 more, for the same picture.
