---
title: "A circle on the body, an ellipse on html: six quarter discs in 130 characters"
lang: en
ref: 2026-11-22
permalink: /2026/11/22/circle-on-the-body-ellipse-on-html/
description: "How one background on html and the body, a radial gradient sized in percent and an almost transparent veil draw the November 22, 2026 CSS Battle target: six quarter discs, yellow and blue, on dark violet."
target: /assets/targets/2026-11-22.png
target_url: https://cssbattle.dev/play/NeNTagiTiZfRt8dCPIqd
colors: ["#7f61", "#1d025e", "#3fb1ce", "#fd9"]
player: benjamintordjman
chars: 130
score: 715.87
match: 100
code: |
  <style>*{background:radial-gradient(2%3px at 76q+0,#7f61 74q,#1D025E)33em 45lh/100%32%,image(#3fb1ce)9ch space#fd9;*{margin:25 125
---

The November 22 target shows six quarter discs on a dark violet background, in two columns: three pale yellow ones on the left, three turquoise ones on the right, with a 10px gap between them. Benjamin Tordjman gives `html` and the `body` the same two-layer background. On the `body`, the top layer draws circles; on `html`, the very same layer draws flat ellipses that end up hidden under the `body`. An almost transparent veil then fixes two short colors at once.

The **teaching colors** show the veil in white and `html`'s hidden ellipses in orange.

{% include animations/2026-11-22.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                      /* html and the body */
  background:
    radial-gradient(2% 3px at 76Q+0,     /* 3px × 3px on the body (a circle), 8px × 3px on html */
      #7f61 74Q,                         /* a 6.7% green veil, up to 69.92px */
      #1d025e)                           /* dark violet after that */
    33em 45lh                            /* position: 528px 810px */
    / 100% 32%,                          /* tile: the box's width, 32% of its height */
    image(#3fb1ce) 9ch space             /* one blue copy, 72px from the left */
    #fd9;                                /* background color: yellow */
  * {                                    /* the body (head and style are hidden) */
    margin: 25 125;
  }
}
</style>
```

## How it works

### 1. Two boxes, one background

`*` targets every element. The nested `*` targets the elements inside another one: the `body`, but not `html`. So both get the background, and only the `body` gets the margins. In quirks mode, `25 125` are px.

`html` covers the 400 × 300 canvas. In quirks mode, the `body` fills the window minus its margins: I measured it at x = 125, y = 25, 150 wide and 250 tall. Since `html` has a background of its own, the `body` keeps its background on its own box. It does not go to the canvas.

### 2. The bottom layer: yellow, then blue

`image(#3fb1ce)` is a plain image with no size of its own, so it is as big as the box: 150 × 250 on the `body`. `space` only draws copies that fit whole: one fits. The position `9ch` is 72px (one `ch` is 8px here), so the blue copy starts 72px from the left. On its left, the background color `#fd9` shows.

On the `body`, that gives yellow from x = 125 to 197 and blue from 197 to 275. The border between the two colors falls in the gap between the columns, so it never shows.

### 3. The top layer: a circle per tile

The tile size is `100%32%`: on the `body`, 150 × 80.

`2%3px` is the size of the gradient's shape: 2% of the tile's width, and 3px tall. On the `body`, 2% of 150 is 3px: a 3px × 3px shape is a circle. The color stops are lengths, so they set the real size: `#7f61` runs up to 74q = 69.92px, and `#1D025E` starts right there, with no blend. So each tile holds a circle of radius 69.92, almost transparent inside and dark violet around.

`at 76q+0` is the center: x = 76q = 71.80px, y = 0. The `+` sign separates the two numbers, like a space would. The center is on the tile's top edge, so only the bottom half of the circle is in the tile.

### 4. `33em 45lh`: placing the circles

The position is 33em = 528px and 45lh = 810px (16px and 18px, measured). Tiles repeat in every direction, so only the remainder matters:

- 528 = 3 × 150 + 78: one tile starts at x = 125 + 78 = 203. Its circle is centered at 203 + 71.80 = 274.80, and the circle of the tile before is at 124.80. Both sit on the edges of the `body`.
- 810 = 10 × 80 + 10: the rows start at y = 25 + 10 = 35, 115 and 195.

The `body` cuts what sticks out, so each half-disc loses its outer half. Six quarter discs remain. On the left, from x = 125 to 194.72, they lie over the yellow. On the right, from 204.88 to 275, they lie over the blue. That leaves a 10px gap. The bottom row ends at y = 195 + 69.92 = 264.92, and the `body` ends at 275.

### 5. On `html`, the circle becomes an ellipse

`html` paints the same background, and it goes to the canvas. But the percentages now refer to `html`'s box, 400 × 300.

The shape is now 2% of 400 = 8px wide and still 3px tall. Its stops stay 69.92 along the width, so the circle becomes an ellipse 69.92 × 26.22 (69.92 × 3 / 8). The tiles are 400 × 96 (32% of 300). The same position gives other remainders: 528 = 400 + 128 and 810 = 8 × 96 + 42. The ellipses are centered at x = 128 + 71.80 = 199.80, and y = 42, 138 and 234.

They stay between x = 130 and 270, and between y = 42 and 261: all under the `body`, which paints over them. Everywhere else, `html`'s tiles are dark violet. The canvas is plain.

That is why the size is `2%3px` and not a plain circle. I tried `1q`: `html`'s circles then reach above and below the `body`, and the render has 3,138 wrong pixels.

### 6. `#7f61`: a veil that fixes two colors

`#7f61` is `#77ff66` at 17/255 opacity, about 6.7%. It covers the inside of every circle, so it lies over both colors of the bottom layer:

- over `#fd9` (255, 221, 153), it gives (246, 223, 150), so `#f6df96`;
- over `#3fb1ce` (63, 177, 206), it gives (67, 182, 199), so `#43b6c7`.

Those are exactly the two colors of the target. I checked them in the render: no wrong pixel on any flat area.

## Golf notes

- One `*` rule gives the background to `html` and the `body`, and the nested `*` gives the margins to the `body` only. The background is written once and used twice.
- `2%3px` gives a circle on a 150px box and a flat ellipse on the 400px `html`. One size, two shapes, and the extra one hides itself.
- The same position, `33em 45lh`, does two jobs: on the `body`, it puts the circles on the edges (remainders 78 and 10); on `html`, it puts the ellipses under the `body` (remainders 128 and 42). `em` and `lh` write 528 and 810 in 4 characters each.
- `#7f61` has the same length as a fully transparent `#0000`, but it lets the yellow be written `#fd9` instead of `#f6df96`. With `#0000` and the two exact colors, the code is 3 characters longer.
- `image(#3fb1ce)9ch space#fd9` splits the box into two colors without a gradient.
- `at 76q+0`: the sign replaces a space. `100%32%` needs no space after `%`, and nothing is closed at the end.
