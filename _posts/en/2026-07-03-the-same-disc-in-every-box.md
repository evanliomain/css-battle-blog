---
title: "The same disc in every box: a pixel robot in 161 characters"
ref: 2026-07-03
permalink: /2026/07/03/the-same-disc-in-every-box/
description: "How one radial gradient, given to every element, draws a dark disc on html, gets pushed off the canvas on a very tall body, and darkens two images and two h6 into a robot face, in the July 3, 2026 CSS Battle target."
target: /assets/targets/2026-07-03.png
target_url: https://cssbattle.dev/play/bzQ591FAfiRjAtqMae1E
colors: ["#222", "#9be9fd"]
player: emohdaziz
chars: 161
score: 686.23
match: 100
code: |
  <img><img><h6><h6><style>*{background:radial-gradient(1Q,#222,25vw,#9be9fd);*{margin:25%35%-999;*{padding:.94em;margin:30 0 0 20}h6{margin:30 25;+*{margin:-10 10
---

The July 3 target shows a pixel robot on a light-blue background: a big dark disc, a light-blue head across it, two square eyes, a mouth and a bar at the bottom. Mohamed Ali gives every element the same background: a radial gradient that paints a dark disc with a 100px radius at the center of each box. On html, that disc is the big circle. body is so tall that its own disc falls far below the canvas, so it shows only light blue: the head. Two images and two h6 are small enough for their disc to cover them: they are the dark features.

Turn on **Teaching colors** and **Wide view** to see body's own disc, far under the canvas.

{% include animations/2026-07-03.html lang=page.lang %}

## The code, spaced out

```css
<img><img><h6><h6>               /* in body: two images, two h6 */
<style>
* {                              /* every element */
  background: radial-gradient(1Q, #222, 25vw, #9be9fd);
                                 /* a dark disc, radius 100px, on each box */
  * {                            /* every element but html */
    margin: 25%35%-999;          /* body: 100px down, 140px in, −999px at the bottom */
    * {                          /* body's children */
      padding: .94em;            /* img: 15.04px, h6: 10.08px */
      margin: 30 0 0 20          /* the eyes */
    }
    h6 {
      margin: 30 25;             /* the mouth: 70 × 20.13 */
      +* {                       /* the element right after an h6: the bar */
        margin: -10 10           /* 100 × 20.13, 20px under the mouth */
```

## How it works

### 1. The page

There is no doctype: the page is in quirks mode, and a number with no unit means px in `margin`. The tags all land in body: two `<img>`, then two `<h6>`. A heading cannot hold another heading, so the second `<h6>` closes the first: the two are siblings. The `<style>` is never closed, and it ends up inside the second h6, where it is not displayed.

### 2. One gradient, one disc

`*` gives every element the same background: `radial-gradient(1Q,#222,25vw,#9be9fd)`.

`1Q` is the size: one length makes the gradient a circle, here with a radius of 1Q, a quarter of a millimeter, 0.945px. `#222` starts at the center. `25vw` alone between two colors is a transition hint, at 25% of 400: 100px. The last color, `#9be9fd`, has no position, so it would sit at the end of the ray, 0.945px. But a position cannot come before an earlier one: the light blue moves to 100px, where the hint is. The dark runs from the center to 100px, then turns light blue at once. Past the ray, the last color goes on.

Each box paints this disc at its own center. On html, the background covers the whole canvas, and the disc is centered on html's 400 × 300 box: at (200, 150), from x = 100 to 300 and from y = 50 to 250.

### 3. body, the head

The `*` nested in `*` selects every element inside another one: everything but html. Only body is displayed at that level. `margin:25%35%-999` gives 25% at the top, 35% on the sides and −999px at the bottom. Margin percentages use the width of the container, 400px: 100px and 140px. body runs from x = 140 to 260, 120px wide, and starts at y = 100.

In quirks mode, body fills html's height minus its margins: 300 − 100 + 999 = 1199px. getBoundingClientRect gives (140, 100), 120 × 1199. So body's own disc is centered at (200, 699.5): it runs from y = 599.5 to 799.5, far below the canvas.

On the canvas, body is only light blue: a 120px strip that covers the middle of html's disc from y = 100 down. That strip is the head. It meets the edge of the disc at y = 230 on both sides, and below that it blends into the light-blue canvas.

### 4. Two images for the eyes

The third `*` selects body's children: the two images, the two h6 and the style. `padding:.94em` depends on each element's font size. An image has a 16px font: 15.04px. An empty `<img>` has no content, so its padding alone makes it a square. getBoundingClientRect gives 30.06 × 30.06.

`margin:30 0 0 20` puts the first image at (160, 130). The second one follows on the same line, 20px further: at (210.06, 130). The line is just as tall as their margin boxes, 30 + 30.06, so the next block starts at y = 160.06.

Each image also has the gradient, and a disc with a 100px radius covers a 30px square entirely: the eyes are dark.

### 5. An h6 for the mouth

`h6` beats `*`, so both h6 get `margin:30 25`. An h6's font is 10.72px, so the same `.94em` gives only 10.08px of padding. The empty h6 is 20.13px tall. The first one is 120 − 50 = 70px wide, at x = 165, and starts 30px below the images: at y = 190.06. Its disc covers it too: the mouth is dark.

### 6. The next h6 is the bar

`+*` nested in `h6` selects the element right after an h6: the second h6. Its rule comes later than `h6`, with the same weight, so it wins: `margin:-10 10`. The bar is 120 − 20 = 100px wide, from x = 150 to 250.

Vertical margins between two blocks collapse. The mouth's bottom margin is 30, the bar's top margin is −10: they make 30 − 10 = 20px. The bar runs from y = 230.19 to 250.31, over body's strip.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- One padding, two sizes. `em` follows each element's font, so `.94em` gives 15.04px to the images and 10.08px to the h6. `padding:15` plus `padding:10` in the h6 rule gives the same picture in 169 characters. With `padding:15` alone (158 characters), the mouth and the bar grow to 30px tall, and 3,700 pixels change.
- One gradient for every element. The disc, the head and the four dark features all come from the same `background`. Only the size of each box decides what it shows.
- The −999 sends body's disc away. With `margin:25%35%0` (158 characters), body ends at y = 310 and its own disc is centered at (200, 205). It covers the face: the eyes, the mouth and the bar disappear into it, and 17,062 pixels change.
- `1Q` sets the circle in 2 characters. `1px` gives the same picture in 162. With no size at all (158 characters), the gradient becomes an ellipse that fades from dark to light blue, and 114,076 pixels change. With `0` (160 characters), my Chrome paints only light blue, and 19,392 pixels change.
- `25vw` is 100px in 4 characters. `100px` gives the same picture in 162.
- The comma before `25vw` makes it a hint, the space in `#222 25vw` would make it a stop position. Both cost one character and give the same picture here.
- No space after a `%`: `25%35%-999` is 10 characters. `100 140-999` gives the same picture in 162.
- `+*` selects the second h6 in 2 characters, nested in `h6`. `}h6+h6{` instead gives the same picture in 165.
- Nothing is closed. `}}}}</style>` at the end gives 173 characters, for the same picture.
