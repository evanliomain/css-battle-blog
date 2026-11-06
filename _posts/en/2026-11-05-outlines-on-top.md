---
title: "Outlines on top: a dumbbell in 168 characters"
lang: en
ref: 2026-11-05
permalink: /2026/11/05/outlines-on-top/
description: "How spread shadows, inset shadows and outlines painted last draw the November 5, 2026 CSS Battle target: three framed squares joined by a bar."
target: /assets/targets/2026-11-05.png
target_url: https://cssbattle.dev/play/eVDTpEDAax8ajhL2S1iD
colors: ["#ebf6f0", "#4a9a86", "#ec4c"]
player: benjamintordjman
chars: 168
score: 680.66
match: 100
code: |
  <img><img><style>*{color:EBF6F0;outline:11q solid;box-shadow:inset 0 1in,0 0 0 5vw#4A9A86;background:#ec4c;margin:150 71;*{padding:15;margin:-30 99;*{margin:0-375 0 115
---

The November 5 target is a row of three off-white squares on a mustard background: a big one in the middle, two smaller ones on the sides. A bar joins them at mid-height, and a green frame runs around the whole shape. Benjamin Tordjman's solution gives one list of rules to four elements. Each one gets a green shadow and a cream fill. Then the outlines, which the browser paints last, draw the cream bar over the green edges and join the squares.

Use **Teaching colors** to see the cream inset shadows and the outlines apart, and **Wide view** to see where the second `<img>` would sit without its negative margin.

{% include animations/2026-11-05.html lang=page.lang %}

## The code, spaced out

```css
<img><img>                        /* two empty boxes, in the body */
<style>
* {                               /* every element */
  color: EBF6F0;                  /* cream, used by the shadow and the outline */
  outline: 11q solid;             /* 10px, in the text color */
  box-shadow:
    inset 0 1in,                  /* fills the box with the text color */
    0 0 0 5vw #4A9A86;            /* green, 20px all around */
  background: #ec4c;              /* the canvas yellow */
  margin: 150 71;                 /* html */
  * {                             /* body (and the imgs) */
    padding: 15;
    margin: -30 99;
    * {                           /* the two imgs */
      margin: 0 -375 0 115;
    }
  }
}
```

## How it works

### 1. html is a line

`*` matches every element: `html`, the `body` the browser adds, and the two `<img>`. Then the nested rules override the margin for the deeper ones. `html` keeps `margin:150 71`, so it is 400 − 2 × 71 = 258px wide. CSS Battle runs in quirks mode, where `html` fills the window minus its margins: 300 − 2 × 150 = 0. The `html` box is a 258 × 0 line at y = 150.

Its background goes to the whole canvas. `#ec4c` is a four-digit hex color: `#eecc44` with an alpha of `cc`, 80%. Over the white page, it gives `#f1d669`. The target is `#f2d66c`, close enough for a 100% match.

### 2. A spread shadow makes the green bar

`0 0 0 5vw` is a shadow with no offset and no blur, and a spread of 5vw. The canvas is 400px wide, so 5vw is 20px. Around the 258 × 0 line, the shadow is a 298 × 40 green band at (51, 130).

The first shadow, `inset 0 1in`, is drawn inside the box. `html` has no height, so it shows nothing here.

### 3. The body: a 60 × 60 square on the line

The `body` gets `padding:15` and `margin:-30 99`. Its width is 258 − 2 × 99 = 60px, padding included. Its height comes from quirks mode too: the `body` fills `html` minus its own margins, 0 − (−30 − 30) = 60px. I checked it by removing the two `<img>`: the `body` stays 60 × 60. Its margin box is −30 + 60 − 30 = 0 tall, so `html` stays a line, and the square sits centred on it, from (170, 120) to (230, 180).

Its green shadow is 100 × 100. Its inset shadow is moved 96px down (`1in`). An inset shadow fills the inside of the box, minus a copy of the box shifted by the offset. Shifted 96px, that copy misses the 60px box entirely, so the whole square is filled. The shadow has no color, so it takes the text color: cream. It covers the `body`'s yellow background.

### 4. Two empty img tags

An `<img>` with no source has no size. With `padding:15`, each one is 30 × 30. They are inline, so they sit on the `body`'s first line, at the top of its content: y = 135. The first one starts 115px after the content's left edge (x = 185): x = 300. It gets the same two shadows: a 70 × 70 green square with a cream inside.

### 5. A negative right margin puts the second one on the left

Both `<img>` get the same `margin:0 -375 0 115`. The first one ends at x = 330, and its right margin of −375px takes the line's pen back to x = −45. The second one adds its 115px left margin and lands at x = 70. That is the mirror of the first one around x = 200 (300 → 330 and 70 → 100), with no selector to tell them apart.

### 6. Outlines are painted last

`outline:11q solid` has no color, so it is cream too. 11q is 11 quarter-millimetres, 10.4px. Chrome rounds an outline's width down to whole pixels: the render with `10px` is identical, pixel for pixel.

The order matters. In a page like this one, the browser paints all the backgrounds, shadows and boxes first, and the outlines after them. So every outline lands on top of every shadow:

- around `html`, a box 0px tall, the outline is a solid 278 × 20 cream bar at (61, 140). It runs over the green edges of the three squares, so the bar enters each one;
- around the `body`, it makes the cream 80 × 80, inside a 10px green frame;
- around each `<img>`, it makes the cream 50 × 50, also inside a 10px green frame.

Without the outlines, the cream squares are 20px smaller, and a plain green band joins them.

## Golf notes

- `color:EBF6F0` has no `#`: quirks mode accepts a hex color without it. The color is written once, and both the inset shadow and the outline use it.
- `inset 0 1in` fills a box with the text color. The `background` is already taken by the yellow, which goes to the canvas from `html`.
- `#ec4c` is 5 characters, against 7 for `#f2d66c`. At 80% over white, it lands close enough to the target.
- `11q` is one character shorter than `10px` and draws the same 10px. `outline:10 solid` does not work: quirks mode accepts numbers without a unit for margins, paddings and borders, not for outlines.
- `5vw` is 20px in 3 characters.
- `<img><img>` gives two boxes for 10 characters. Empty, they are exactly their padding.
- `5vw#4A9A86` and `0-375` need no space: the `#` and the minus sign end the token before.
- `<style>` is never closed.
