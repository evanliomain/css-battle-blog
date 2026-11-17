---
title: "One quarter, tiled: a focus frame in 141 characters"
ref: 2026-07-20
permalink: /2026/07/20/one-quarter-tiled/
description: "How one border rule draws a square and a rounded ring, and how one repeated gradient quarter keeps only the four corners of the ring, in the July 20, 2026 CSS Battle target."
target: /assets/targets/2026-07-20.png
target_url: https://cssbattle.dev/play/hPsHm8UmVeeb0xCAounD
colors: ["#f7ec7d", "#682988"]
player: pindaros
chars: 141
score: 704.33
match: 100
code: |
  <style>*{border:5vw solid#F7EC7D;margin:90 140;*{background:#682988;margin:-70;border-radius:42q;mask:conic-gradient(red 25%,#0000 0)58q -58q
---

The July 20 target looks like a focus icon: a hollow yellow square, framed by four rounded yellow corners, on a purple background. Pindaros draws it with one border rule, given to html and to body. html's border is the square. body's border is a bigger rounded ring around it. A mask then keeps only the four corners of the ring: its image is a single opaque quarter, moved a little and repeated.

Use **Wide view** to see the mask tiles, which run off the canvas, and **Teaching colors** to tell html's border from body's.

{% include animations/2026-07-20.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                            /* every element: html, then body */
  border: 5vw solid#F7EC7D;                    /* a 20px yellow border, for both */
  margin: 90 140;                              /* html: 120 × 120 at (140, 90) */
  * {                                          /* inside html: body */
    background: #682988;                       /* painted on the canvas: html has none */
    margin: -70;                               /* body: 220 × 220 at (90, 40) */
    border-radius: 42q;                        /* 39.69px */
    mask: conic-gradient(red 25%,#0000 0)58q -58q   /* one opaque quarter, moved 54.80px right and up, repeated */
```

## How it works

### 1. Two elements, one rule

There is no doctype: the page is in quirks mode. The style element is never closed, so everything after `<style>` is CSS.

`*` matches every element: html, head, the style element and body (the browser adds the missing ones). head and style are not displayed. The nested `*{…}` means `* *`: every element inside another one. That is body (and head and style again).

The two rules have the same specificity, and the nested one comes later. So body takes its margin from the nested rule. The border comes from the outer rule only: html and body both get `border:5vw solid#F7EC7D`. 5vw is 5% of the 400px width: 20px.

### 2. html: the hollow square

In quirks mode, a number with no unit counts as px in `margin`. html gets `margin:90 140`: 90px at the top and bottom, 140px on the sides.

In quirks mode, html fills the window, minus its margins. It is 400 − 280 = 120 wide and 300 − 180 = 120 tall. getBoundingClientRect gives 120 × 120 at (140, 90). With its 20px border, the middle is an 80 × 80 hole, from (160, 110) to (240, 190). That is the hollow square of the target.

### 3. body: a 220 × 220 rounded ring

body sits in html's middle, 80 × 80. Its `margin:-70` pushes its edges 70px out on every side. In quirks mode, body also fills html's height, minus its own margins. So it is 80 + 140 = 220 wide and 220 tall. getBoundingClientRect gives 220 × 220 at (90, 40).

body has the same 20px yellow border, so it is a ring around the square. `border-radius:42q` rounds its corners: 1q is a quarter of a millimetre, 0.945px, so 42q is 39.69px. The inner edge of the ring is rounded too, with 39.69 − 20 = 19.69px.

### 4. body's background goes to the canvas

`background:#682988` is in the nested rule, so only body gets it. html has no background. In that case, the browser paints body's background on the whole canvas, not in body's box. All 400 × 300 pixels are purple, including html's middle. body's own box paints only its border.

### 5. The mask: one opaque quarter

A mask keeps an element only where the mask image is opaque. It only reads the alpha: `red` is just an opaque color, and `#0000` is fully transparent.

`conic-gradient(red 25%,#0000 0)` turns clockwise around the center of the image, starting at the top. The first 25% of the turn is red. The `0` puts the next stop at 0%, which is clamped to 25%: from there on, it is transparent, with a hard edge. The red part is the top-right quarter of the image.

The image is the size of body's box, 220 × 220. Its red quarter is a 110 × 110 square: x = 200 to 310, y = 40 to 150. With the mask alone, at its default position, only that quarter of the ring is left.

### 6. Moved and repeated: four corners

The mask image repeats in both directions, every 220px: that is the default. `58q -58q` moves it 54.80px right and 54.80px up. The tile that was on body's box now starts at (144.80, −14.80), and there is a copy every 220px.

- That tile's red quarter covers x = 254.80 to 364.80 and y = −14.80 to 95.20: body's top-right corner.
- The tile on its left starts at x = −75.20. Its red quarter covers x = 34.80 to 144.80: the top-left corner.
- The tiles below start at y = 205.20. Their red quarters cover y = 205.20 to 315.20: the two bottom corners.

The mask is cut to body's box, from (90, 40) to (310, 260). What is left are four pieces of the ring, about 55 × 55 each: x = 90 to 144.80 and 254.80 to 310, y = 40 to 95.20 and 205.20 to 260. Each one has a rounded corner and two straight arms. The mask only applies to body, so html's square stays whole.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- One border for two shapes. The outer `*` gives html and body the same 23-character `border:5vw solid#F7EC7D`. html's copy is the square, body's copy is the ring. The nested rule only sets what differs.
- The mask repeats by default, so one quarter makes four corners. With `no-repeat` added (151 characters), only the top-right corner is left, and 4,807 pixels change. Without the position (133 characters), the mask keeps the top-right quarter of the ring, with 110px arms, and 6,967 pixels change.
- `58q` is 54.80px in 3 characters, where `55px` takes 4: `55px -55px` makes the code 143 characters. Numbers with no unit do not work here, even in quirks mode: with `55 -55` (139 characters), Chrome drops the whole mask declaration, the full ring shows, and 9,138 pixels change.
- The background is in the nested rule. In the outer rule, the code has the same length, but html gets the background. body's background is then painted in its own box, and the mask keeps it in the four corner areas. These areas overlap the four corners of html's square: purple notches cut them, and 120 pixels change.
- The mask only reads the alpha, so `red` is enough: `#f00` takes 142 characters for the same picture. `#0000` is transparent in 5 characters: `transparent` takes 147. The `0` stop is shorter than repeating `25%` (143 characters, same picture).
- `5vw` is 20px in 3 characters, and `42q` is 39.69px in 3: `20px` makes the code 142 characters for the same picture, and the nearest round radius, `40px`, takes 4 characters too.
- Numbers with no unit in `margin`: `90px 140px` and `-70px` make the code 147 characters, for the same picture. No space is needed in `solid#F7EC7D` either (142 characters with one).
- Nothing is closed. Closing both rules and the style element with `}}</style>` takes 151 characters, 10 more, for the same picture.

## If you try it at home

In my Chrome, 489 pixels differ from the target by more than 8 on one channel. 160 of them are on four lines: x = 144 and 254, y = 95 and 205, where the arms of the corners end. 58q is 54.80px, not 55, so the arms end 0.20px off the pixel grid. On these lines, my pixels mix yellow and purple, where the target has plain colors. With `55px -55px` in place of `58q -58q` (143 characters), these 160 pixels match the target. The other 329 are along the curved edges of the corners. I tried radii from 38px to 42px: none of them made these pixels match. The CSS Battle judge gives the code a 100% match.
