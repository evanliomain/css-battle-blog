---
title: "One ellipse, two halves: two cut circles in 112 characters"
ref: 2026-07-16
permalink: /2026/07/16/one-ellipse-two-halves/
description: "How one radial-gradient border-image, sliced 276px from each side and squeezed into the two halves of the canvas, turns an ellipse into two cut circles, while 16ex is 0 on body and a, in the July 16, 2026 CSS Battle target."
target: /assets/targets/2026-07-16.png
target_url: https://cssbattle.dev/play/ZHdqz6FmXWrev0SARB8I
colors: ["#742020", "#af6a89"]
player: selenit
chars: 112
score: 737.55
match: 100
code: |
  <a><style>&,a{padding:117 50 117 7em}*{*{font:0 a}border-image:4 276/3%50%radial-gradient(#742020 16ex,#AF6A8A 0
---

The July 16 target shows two dark red circles on a pink background. The left one is cut by a vertical gap, the right one by a horizontal bar, and they meet in a V notch. Ilya Streltsyn draws it with one border-image. On html, its gradient is a single ellipse: the slices cut it into two overlapping parts, and the widths squeeze each part into one half of the canvas, where it becomes a circle. On body and a, the same `16ex` is 0, so the same border-image only paints pink boxes: the bar and the gap.

Use **Teaching colors** to tell the two halves, body and a apart.

{% include animations/2026-07-16.html lang=page.lang %}

## The code, spaced out

```css
<a><style>
&, a {                               /* & at the top level is html */
  padding: 117 50 117 7em            /* 7em: 112px on html, 0 on a */
}
* {                                  /* html, head, body, a and style */
  * {                                /* * *: everything inside html, not html */
    font: 0 a                        /* font size 0; "a" is the family */
  }
  border-image:
    4 276 /                          /* slice: 4 from the top and bottom, 276 from the left and right */
    3% 50%                           /* width: 9px and 200px on html */
    radial-gradient(#742020 16ex, #AF6A8A 0
                                     /* 16ex: 114.875px on html, 0 on body and a */
```

## How it works

### 1. html and body

There is no doctype: the page is in quirks mode. `<a>` opens body, and the style element ends up inside a. It is never closed, so everything after it is CSS.

At the top level of the CSS, `&` means the root: html. `&,a` gives html and a `padding:117 50 117 7em`. A number with no unit counts as px in quirks mode. html's font is 16px, so 7em is 112px.

In quirks mode, html fills the canvas: 400 × 300. With its padding, its content area runs from (112, 117) to (350, 183), 238 × 66. body keeps its 8px margins and fills that area: getBoundingClientRect gives (120, 125), 222 × 50.

### 2. a: an empty box of 50 × 234

The nested `*{font:0 a}` has no `&`, so it means `* *`: everything inside html. That is head, body, a and the style element, not html. Their font size becomes 0. The `font` shorthand needs a family: `a` is one.

So on a, 7em is 0: its padding is 117 50 117 0. a is inline, and its only child, the style element, is not displayed. Its content box is empty, at (120, 125). The padding grows it to 50 wide and 117 up and down: getBoundingClientRect gives (120, 8), 50 × 234.

None of these boxes has a background. Only the border-image paints.

### 3. html's image: a dark ellipse

`*` gives every element the same border-image. Its image is `radial-gradient(#742020 16ex,#AF6A8A 0)`.

A gradient has no size of its own. In a border-image, it gets the size of the element's border box: 400 × 300 on html. The default shape is an ellipse that reaches the farthest corner. Its radii keep the 4:3 ratio of the box.

ex is the x-height of the font. html's font is 16px, and Chrome computes 16ex as 114.875px. A color stop is measured along the horizontal radius, so the dark ellipse is 114.875 × 86.16 (× 0.75), centered at (200, 150). The pink stop at 0 is moved up to the previous stop: the edge is sharp.

### 4. Slicing: 4 276

`4 276` is the border-image-slice: 4px from the top and bottom of the image, 276px from the left and right.

276 + 276 = 552, more than the image's 400px. The left part (x 0 → 276) and the right part (x 124 → 400) overlap. In that case, the top and bottom edges and the middle are empty. What is left: the four corners, the left edge (x 0 → 276, y 4 → 296) and the right edge (x 124 → 400). Each edge holds the center of the ellipse, at x = 200, and 76px past it.

### 5. Widths: 3% 50%

`3%50%` is the border-image-width. In %, it is a share of the border box: 3% of 300 = 9px at the top and bottom, 50% of 400 = 200px on the left and right. No border is set: these widths alone give the areas where the image is painted.

The left edge of the image, 276 × 292, is stretched into x 0 → 200, y 9 → 291:

- × 200/276 = 0.7246 across: the horizontal radius is 114.875 × 0.7246 = 83.24px;
- × 282/292 = 0.9658 down: the vertical radius is 86.16 × 0.9658 = 83.21px.

The ellipse becomes a circle of radius 83.2px, centered at x = 200 × 0.7246 = 144.93 and y = 150. The slice ends 76px past the center: 76 × 0.7246 = 55.07px, so the circle is cut at x = 200. The right edge is the mirror image: a circle centered at x = 255.07, cut at x = 200.

At x = 200, both circles are 124.8px tall, from y = 87.6 to 212.4. Above and below, their outlines go back up: that is the V notch. The corners and the rest of the edges are pink: the background.

### 6. body and a: 16ex is 0

body and a get the same border-image. But their font size is 0: 16ex is 0, and the whole gradient is pink.

Their widths are 50% on the left and 50% on the right: the corners and the side edges cover the whole box. So body paints a pink 222 × 50 bar at (120, 125), across the right circle. a, painted after it, paints a pink 50 × 234 box at (120, 8). It cuts the left circle at x = 120, and keeps the gap until x = 170.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- `16ex` does two jobs: 114.875px on html, 0 on body and a. `115px` is one character more (113), and it is 115px on every element: a becomes a dark bar from y = 8 to 242, and body's bar turns almost all dark. 19,350 pixels change.
- `7em` does two jobs too: 112px on html, 0 on a. `112` has the same length, but it pads a on the left as well: a grows to 162px, from x = 120 to 282, and hides most of the right circle. 11,590 pixels change.
- `4` and `3%` are not there for nothing. They squeeze the image vertically by 282/292, and that turns the 4:3 ellipse into a circle. `0 276/0 50%`, the same length, keeps the full height: the circles are 86.16px tall instead of 83.21px. At x = 255, the right one runs from y = 64 to 235 instead of 67 to 232, and 1,068 pixels change.
- One `*` rule gives the border-image to html, body and a. The nested `*{font:0 a}` sets the font of the two others in 11 characters. `font-size:0` in its place makes the code 115 characters, for the same picture.
- `&` is html at the top level of the CSS. `html,a` takes 115 characters, for the same picture.
- `<a>` gives a third box in 3 characters. Without it (109 characters), nothing cuts the gap: 5,694 pixels change.
- `3%50%`: the `%` ends the number, so no space is needed. `3% 50%` takes 113 characters, for the same picture.
- A number with no unit in `padding`: `117px 50px 117px 7em` makes the code 118 characters, for the same picture.
- Nothing is closed. Closing the gradient, both rules and the style element with `)}}</style>` takes 123 characters, 11 more, for the same picture.

## If you try it at home

In my local Chrome, the official code is not pixel-exact. Its circles are smaller than the target's. At y = 150, the left one starts at x = 62 in my render, at x = 60 in the target. At x = 255, the right one runs from y = 67 to 232 in my render, from y = 65 to 234 in the target. My render also has hard edges, with only its two colors, and its pink is #af6a8a, where the target has #af6a89. 2,807 pixels are more than 8 off the target in one channel, up to 130.

The size of the circles comes from 16ex, and ex depends on the font: in my Chrome, 16ex is 114.875px on html. With `7.34375em` in its place (117.5px on html, still 0 on body and a), the circles get the target's size, and 2,309 pixels are left. 670 of them are on the edges of the bar, where the target's colors drift by up to 12; the rest are along the curves. The CSS Battle judge gives the code a 100% match.
