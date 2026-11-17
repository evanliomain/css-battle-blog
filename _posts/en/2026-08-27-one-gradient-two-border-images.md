---
title: "One gradient, two border-images: a corridor in 161 characters"
ref: 2026-08-27
permalink: /2026/08/27/one-gradient-two-border-images/
description: "How one radial gradient, sliced by border-image on html and on body, draws the floor, the back wall and the door of the August 27, 2026 CSS Battle target."
target: /assets/targets/2026-08-27.png
target_url: https://cssbattle.dev/play/s17MKgzJQsAf1vObf9Ta
colors: ["#4e53bb", "#4d4a18", "#dbddff"]
player: selenit
chars: 161
score: 686.23
match: 100
code: |
  <style>*{margin:50%-3-5;*{margin:-32%113 115;--p:49%/72%}background:#4E53BB;border-image:radial-gradient(#4D4A18 17%,#DBDDFF 0 301q,#0000 0)var(--p,1 5/152%)56%0
---

The August 27 target is a corridor on a purple background: a lavender back wall with a small brown door, rounded at the top, and a lavender floor that widens toward the bottom of the frame. Ilya Streltsyn draws it all with one radial gradient, used as a `border-image` on two boxes. On `html`, two corners of 5 × 1 pixels are stretched into the slanted sides of the floor. On `body`, the brown center of the gradient, cut in four, becomes the door.

Use **Teaching colors** to see the transparent part of the gradient in pink: it is what shapes the floor.

{% include animations/2026-08-27.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html (and everything in it) */
  margin: 50% -3 -5;               /* html: 406 × 105 at (−3, 200) */
  * {                              /* head, style, body */
    margin: -32% 113 115;          /* body: 180 × 119.91 at (110, 70.09) */
    --p: 49% / 72%;                /* slices and top width of the body */
  }
  background: #4E53BB;             /* the whole canvas */
  border-image:
    radial-gradient(#4D4A18 17%, #DBDDFF 0 301q, #0000 0)
    var(--p, 1 5 / 152%)           /* html: slices 1 5, top width 152% */
    56% 0;                         /* side and bottom widths, shared */
}
```

## How it works

### 1. html: a strip at the bottom

`*` matches `html` and every element in it. The nested `*` only matches the inner ones: `head`, `style` and `body`. Both rules have the same specificity, and the nested one comes later, so the `body` gets its own margin. `background` and `border-image` apply to `html` and `body` alike.

On `html`, `margin:50%-3-5` gives 200px at the top (a % margin is a % of the width, 400), −3px on the sides and −5px at the bottom. In quirks mode, `html` fills the height of the frame minus its margins: 300 − 200 + 5 = 105px. I measured it: a 406 × 105 box at (−3, 200). It sticks out 3px on each side and 5px below the canvas.

The background of `html` is painted on the whole canvas: `#4E53BB` covers it all.

### 2. One radial gradient

The `border-image` source is `radial-gradient(#4D4A18 17%,#DBDDFF 0 301q,#0000 0)`. With no size given, it is an ellipse that reaches the corners. The image has the size of the box: 406 × 105 for `html`. The horizontal ray of the ellipse is then 203 × √2 = 287.08px.

The stops: brown up to 17%, lavender from there (`0` means "where the last stop ended") up to 301q, and transparent after. 301q is 301 quarter-millimeters, 284.41px. That is just short of the 287.08 ray, so only the very tips of the four corners are transparent. I rendered the gradient alone at 8× zoom: each tip is about 3.8px wide and 1px tall.

### 3. Two 5 × 1 corners make the floor

On `html`, `--p` is not set, so `var(--p,1 5/152%)` gives its fallback. With the `56%0` after it, the whole value is `1 5/152% 56% 0`:

- `1 5` is the slice: 1px from the top and bottom of the image, 5px from the left and right.
- `152% 56% 0` are the widths of the border-image area: 152% of the height at the top (159.6px), 56% of the width on the sides (227.36px), 0 at the bottom.

The widths do not fit: 159.6 is more than the 105px of the box. So the browser multiplies all of them by 105 / 159.6. The top band becomes 105px, the full height of the box. The sides become 149.58px. The bottom is 0, so the side edges have no room left, and without `fill` the middle is not drawn. Only three pieces remain, all from the top row of the image:

- the top-left corner, 5 × 1px, stretched to 149.58 × 105;
- the top edge, 396 × 1px, stretched to 106.84 × 105, all lavender;
- the top-right corner, the same as the left one.

The 5 × 1 corner holds a transparent tip. Stretched 29.9 times wider and 105 times taller, the curved edge of the ellipse becomes an almost straight slanted line. I measured it on the render: on row 200, the floor starts at x = 110; on row 299, at x = 1. The right side is the mirror: 290 and 399. The transparent part shows the purple canvas. The floor is a trapezoid.

### 4. body: the back wall

The nested rule gives the `body` `margin:-32%113 115`. −32% of the 406px width of `html` is −129.91px at the top. 113px on each side leave 406 − 226 = 180px of width. In quirks mode, the `body` fills the height of `html` minus its margins: 105 + 129.91 − 115 = 119.91px. I measured it: a 180 × 119.91 box at (110, 70.09). It ends at y = 190, and the floor starts at y = 200: a 10px purple gap stays between them.

The `body` has the same purple background. It is never seen: the border-image covers it all.

### 5. The same gradient, in a smaller box

On the `body`, the gradient is 180 × 119.91. The horizontal ray of the ellipse is 90 × √2 = 127.28px, so the brown core, 17% of it, is an ellipse 43.3px wide and 28.8px tall in the middle. I measured it on the 8× render. Here 301q is far past the corners: nothing is transparent, everything around the core is lavender.

### 6. 49%/72%: the door

On the `body`, `--p` is `49%/72%`, so the value is `49%/72% 56% 0`.

- The slice is 49% on every side. The corners are 88.2 × 58.75px. Between them stay a 3.6px column and a 2.4px row.
- The widths are 72% of the height at the top (86.33px), 56% of the width on the sides (100.8px each), 0 at the bottom.

The sides do not fit: 201.6px for a 180px box. Everything is multiplied by 180 / 201.6. The sides become exactly 90px, half the box each. The top becomes 77.08px. Then:

- The two top corners are stretched from 88.2 × 58.75 to 90 × 77.08. They hold the top part of the brown ellipse: the arch of the door. It starts at y = 130.
- The left and right edges get the 2.4px row from the middle of the image, stretched to 42.82px tall, from y = 147.17 to 190. That row cuts through the middle of the ellipse, so it gives the straight sides of the door, down to the bottom of the wall.
- The 3.6px column between the corners has no room (the top edge is 0px wide). It is dropped, and the two halves of the door meet. On the render, the door runs from x = 180 to 220.

The bottom corners and the bottom edge are 0px tall, so the bottom half of the ellipse is never drawn.

## Golf notes

- One rule for two boxes. `background` and the `border-image` source are written once. Only the slice and the top width change, through `var(--p,1 5/152%)`: the custom property is set on the `body` only, and `html` gets the fallback.
- `56%` on the sides is too wide on both boxes, and that is the point. On the `body`, the browser scales the sides down to exactly 90px each. On `html`, the 152% top width is what forces the scale: the top band becomes the full height, 105px, and the sides 149.58px.
- The slanted edges of the floor come from a 5 × 1px corner of the gradient. No `clip-path`, no rotation.
- `#0000` is the short transparent. `#DBDDFF 0` starts the lavender where the brown stops.
- `301q` is 284.41px: just inside the 287.08px ray of `html`, so the transparent part is only a tiny tip in each corner.
- `56%0` needs no space: the `%` ends the first number. Same for `)var(`, `)56%`, `50%-3-5` and `-32%113`.
- Margins without units work in quirks mode: `-3`, `-5`, `113`, `115`.
- `<style>` is never closed, and the last two braces are left out.
