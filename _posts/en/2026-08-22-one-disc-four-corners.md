---
title: "One disc, four corners: a column and four dots in 127 characters"
ref: 2026-08-22
permalink: /2026/08/22/one-disc-four-corners/
description: "How one dashed outline, given to html and to a 0px-wide body, draws the six blocks and the column, and how one border-image puts the same white disc in its four corners, for the August 22, 2026 CSS Battle target."
target: /assets/targets/2026-08-22.png
target_url: https://cssbattle.dev/play/YXhLYIBBNDCRRLlXkXEH
colors: ["#5f5f1e", "#fff", "#94b31f"]
player: selenit
chars: 127
score: 719.23
match: 100
code: |
  <style>*{outline:dashed 53q#5F5F1E;margin :60-80;*{margin:9%280;border-image:radial-gradient(#fff 23q,#94B31F 7%)88%328/50%/6cm
---

The August 22 target has a dark olive column in the middle of a green background, three blocks at the top, three at the bottom, and four white dots between them. Ilya Streltsyn draws it with two boxes. One dashed outline, given to `html` and to a body that is 0px wide, draws all the dark parts. The body also gets a `border-image`: a radial gradient whose four corner slices all hold the same white disc, so it shows up four times.

Use **Wide view** to see the html's outline and the border image area, both much bigger than the canvas, and **Teaching colors** to tell the four slices apart.

{% include animations/2026-08-22.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, head, style, body */
  outline: dashed 53q #5F5F1E;   /* 53q = 50.08px: a 50px outline */
  margin : 60 -80;               /* no unit: px in quirks mode */
  * {                            /* head, style, body */
    margin: 9% 280;              /* 9% of 560px = 50.39px; 0px of width left */
    border-image:
      radial-gradient(#fff 23q, #94B31F 7%)  /* the image */
      88% 328                    /* slice: 468.83px top and bottom, 328px left and right */
      / 50%                      /* width: half the area */
      / 6cm;                     /* outset: 226.77px */
  }
}
```

## How it works

### 1. Two boxes

There is no doctype, so the page is in quirks mode. The browser builds `html`, `head`, the `style` (inside `head`) and `body`. `*` matches all four, and the nested `*` matches `head`, `style` and `body`, the elements inside another one. `head` and `style` are not displayed. Two boxes are left: `html`, with the outer rule, and `body`, with both rules. The nested `margin` comes later, so it wins in the body. The body keeps the `outline` of the outer rule.

### 2. html: six blocks

`margin :60-80` has no unit, and quirks mode reads it as px: 60px at the top and bottom, −80px on the left and right. In quirks mode, `html` fills the 400 × 300 frame minus its margins. It is 560 × 180, from (−80, 60) to (480, 240).

53q is 53 quarter millimeters: 50.08px. The computed outline width is 50px. The outline goes around the box, on the outside: from (−130, 10) to (530, 290). It is `dashed`. In my Chrome (version 157), the top and bottom sides, 660px long, get five 100px dashes with four 40px gaps, and the first and last dashes start at the corners: 5 × 100 + 4 × 40 = 660. The canvas only shows the middle three, at x = 10 to 110, 150 to 250 and 290 to 390, from y = 10 to 60 and from 240 to 290. The left and right sides, 280px long, are off canvas: a dash at each end and an 80px gap.

### 3. body: a box with no width

The body sits in the content box of `html`, 560px wide. `margin:9%280`: a percentage margin is a share of that width, even at the top and bottom, so 9% is 50.39px. The 280px side margins take all the width: 560 − 2 × 280 = 0. The body is a line at x = 200. In quirks mode it fills the 180px height of `html` minus its margins: 180 − 2 × 50.39 = 79.22px, from y = 110.39 to 189.61.

Its 50px outline turns that line into a 100 × 179.22 box, from (150, 60.39) to (250, 239.61). Its sides are only 179.22px long, and my Chrome draws them with no gap: the outline is solid. I checked with a taller body (`margin:20px 280px`): its sides are 240px long, and a 48px gap shows in the middle. Chrome paints the outline from y = 60 to 240, so it meets the middle dashes of `html`. Together they make the column, from y = 10 to 290.

### 4. border-image: an area bigger than the canvas

The last value of `border-image` is the outset: 6cm = 226.77px. The border image is painted in the body's box pushed out by that much on every side: from (−26.77, −116.38) to (426.77, 416.38), 453.54 × 532.76. That covers the whole canvas, and it is where the green comes from. I checked with `border-image:none` added to the body: the canvas is white.

The image is a gradient, so it has no size of its own: it takes the size of the area. `radial-gradient` with no size draws an ellipse centered in the image, at (200, 150) on the canvas, through the corners of the image. Its horizontal ray is 226.77 × √2 = 320.7px. The color stops are measured on that ray: white up to 23q = 21.73px, green from 7% of 320.7, which is 22.45px. The area is taller than wide, so the ellipse is too: in my render, the white ellipse is 44px wide and 52px tall.

### 5. 88% 328: four slices that overlap

`88%328` sets where the image is cut: 88% of 532.76 = 468.83px from the top and from the bottom, 328px from the left and from the right. The top-left slice is the image from x = 0 to 328 and y = 0 to 468.83. The other three are its mirror images.

Each slice is more than half the image, so they overlap, and each one contains the center of the image, where the white ellipse is. The slice lines cross, so the edge parts and the middle part are empty: only the four corners are drawn.

### 6. /50%: one disc, four times

`/50%` sets the border widths: 50% of the area, so 226.77px on the left and right and 266.38px at the top and bottom. Each corner slice is drawn in one quarter of the area. It is squeezed: 328 → 226.77 across (× 0.691) and 468.83 → 266.38 down (× 0.568).

The vertical squeeze is stronger, and that undoes the shape of the ellipse. 44 × 0.691 is about 30, and 52 × 0.568 is about 30 too. In my render, each disc is about 30.2px wide and 29.7px tall. The top-left one is centered at (−26.77 + 226.77 × 0.691, −116.38 + 266.38 × 0.568) = (130, 35). The other quarters give (270, 35), (130, 265) and (270, 265). The rest of each quarter is green.

### 7. The outlines on top

Outlines are painted after the borders and backgrounds of the page. The six blocks and the column cover the green of the border image, and the four discs show in the gaps between them.

## Golf notes

- One `outline` declaration draws every dark part: the html's dashes make the six blocks, and the body's outline makes the column.
- The body has no width at all. Its outline alone is the 100px column.
- A dashed side splits into blocks for free. The canvas only has to show the middle three dashes of each long side.
- One gradient, four discs: the four corner slices of the border image all contain the same disc.
- The border image also paints the green of the whole canvas, so there is no `background`.
- Short units: 53q (50.08px), 23q (21.73px) and 6cm (226.77px) are three characters each.
- Quirks mode reads `60-80` and `280` as px. `328` in the slice is a plain number in any mode: image pixels.
- No space before `#` or after `)`: `53q#5F5F1E`, `7%)88%328`. None before a minus sign either: `60-80`.
- `margin :60-80` has a space before the colon. CSS allows it, and it is one more character: without it, my render is the same, pixel for pixel.
- `<style>` and the two braces are never closed.

## If you try it at home

In my Chrome (version 157 when this was written), the blocks and the column land exactly where the target has them. 581 pixels differ from the target. 269 of them differ by more than 8 levels: they are all on the edges of the four discs. In my render, the discs are about 30.2px wide and 29.7px tall; in the target they are 30 × 30. 12 more disc edge pixels differ by 8 levels or less. The other 300 are in the one-pixel columns just left of the six blocks (x = 9, 149 and 289, from y = 10 to 59 and 240 to 289): they are one level darker than the target's green. On the CSS Battle judge, the code is a 100% match.
