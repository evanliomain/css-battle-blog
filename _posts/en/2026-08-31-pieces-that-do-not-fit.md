---
title: "Pieces that do not fit: five yellow blocks in 90 characters"
lang: en
ref: 2026-08-31
permalink: /2026/08/31/pieces-that-do-not-fit/
description: "How one border-image in space mode draws the August 31, 2026 CSS Battle target: the corners and the top edge fit, the sides and the bottom do not, so they are never drawn."
target: /assets/targets/2026-08-31.png
target_url: https://cssbattle.dev/play/FjqC6d9FDroAnHkboFnS
colors: ["#F1D36F"]
player: koda_pig
chars: 90
score: 769.64
match: 100
code: |
  <body bgcolor=65522 style=margin:70;border-image:conic-gradient(#F1D36F)space+41+58+1/5ch>
---

The August 31 target has five yellow blocks on brown: a small square, a long bar and a small square along the top, and two small squares at the bottom corners. koda_pig's solution is a single `body` tag with a single `border-image`. The image is plain yellow, sliced so that the corners and the top edge fit in a 40px band, while the sides and the bottom edge are too big for their room. In `space` mode, a piece that does not fit is not drawn at all.

Use **Teaching colors** to follow each piece of the image.

{% include animations/2026-08-31.html lang=page.lang %}

## The code, spaced out

```css
<body
  bgcolor=65522                         /* #655220, the brown */
  style=
    margin: 70;                         /* body: 260 × 160 at (70, 70) */
    border-image:
      conic-gradient(#F1D36F)           /* one color: a plain image */
      space                             /* edges: whole pieces only */
      +41 +58 +1                        /* slice: top, right/left, bottom */
      / 5ch                             /* width: 40px */
>
```

## How it works

### 1. The body on brown

`bgcolor=65522` is parsed like an old HTML color. It has five digits, so it is padded with a 0 to `655220`, then read as `#655220`: the brown. The `body`'s background is used for the whole canvas.

`margin:70` has no unit, which quirks mode accepts. In quirks mode the `body` also fills the height of the page. So it is a 260 × 160 box at (70, 70).

### 2. A plain image, as big as the box

`conic-gradient(#F1D36F)` has a single color: it is a plain yellow image. A gradient has no size of its own, so the `border-image` stretches it over the `body`'s box: 260 × 160. One pixel of the image is one pixel of the canvas, which makes the slice values easy to read.

### 3. Nine pieces

The slice `+41+58+1` cuts the image 41 from the top, 58 from the right, 1 from the bottom, and, since the left value is missing, 58 from the left too. That gives nine pieces:

- four corners: 58 × 41 at the top, 58 × 1 at the bottom;
- the top edge, 144 × 41, and the bottom edge, 144 × 1;
- the two sides, 58 × 118;
- the middle, 144 × 118. It is only painted with the `fill` keyword, so here it is dropped.

### 4. A 40px band and four squares

`/5ch` is the `border-image` width. In the default font, Times at 16px, 1ch is 8px, so the band is 40px. The `body` has no border at all (its width is 0 and its style is none), but a width given as a length does not depend on the border: the image is drawn in a 40px band along the inside of the box.

Each corner piece is stretched into a 40 × 40 corner of the band, whatever its shape. That is why the bottom corners still work with a slice of 1: the 58 × 1 strip becomes a full 40 × 40 square.

### 5. The top edge in space mode

With `space`, an edge piece is first scaled to the band's thickness, keeping its proportions. Then it is repeated in whole pieces only, and the leftover room is shared out as gaps.

The top edge is 144 × 41. Scaled to 40 high, it becomes 144 × 40 / 41 ≈ 140.5 wide. Between the two top corners there are 260 − 2 × 40 = 180 px. One piece fits, two do not. The 39.5 px left over are split on both sides, so the bar runs from about 129.8 to 270.2. That gives the two 20 px gaps of the target.

### 6. The sides and the bottom: no room

A side piece is 58 × 118. Scaled to 40 wide, it becomes 40 × 118 × 40 / 58 ≈ 81.4 high. The room between the corners is 160 − 2 × 40 = 80 px. 81.4 is just a bit too much: not even one piece fits, so nothing is drawn.

The bottom piece is 144 × 1. Scaled to 40 high, it becomes 5760 wide, for 180 px of room. Nothing is drawn either.

I checked these cases by rendering. With a bottom slice of 3, the side piece is 116 high and becomes exactly 80: the sides appear. With a bottom slice of 0, the bottom corners are 0 high too, and the two bottom squares disappear. With `stretch` or `round` instead of `space`, the sides and the bottom are drawn and the whole frame is yellow.

## Golf notes

- No `<style>`: one `body` tag with presentational attributes. `bgcolor` gives the background, and old color parsing turns 5 digits into 6.
- The `style` value is not quoted, so it cannot contain spaces. The `+` signs replace them: `space+41+58+1` reads as `space 41 58 1`, since a number can start with `+`.
- One color stop is enough for a plain image, and `conic-gradient` is one character shorter than `linear-gradient`. I checked that `linear-gradient(#F1D36F)` renders the same.
- No `border` needed: a `border-image` width given as a length draws on its own.
- `5ch` is 40px in 3 characters. A unitless width would not work: it is a multiple of the border width, here 0. I checked that `/40` draws nothing.
- `space` turns the pieces that are too big into nothing. The slice values are picked so that the top edge fits, the sides just miss (81.4 for 80), and the bottom misses by far.

## If you try it at home

In my local Chrome, the official code does not render exactly like the target. The ends of the bar and the inner edges of the two top squares are soft over one pixel column (x = 110, 129, 269, 270 and 289, from y 70 to 109): 200 pixels differ from the target. The rest is identical. The site gave it a 100% match.
