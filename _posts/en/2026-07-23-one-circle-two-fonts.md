---
title: "One circle, two fonts: a sun behind blinds in 125 characters"
ref: 2026-07-23
permalink: /2026/07/23/one-circle-two-fonts/
description: "How one radial-gradient draws thin stripes on html and a big disc on body, only because body has a bigger font, in the July 23, 2026 CSS Battle target."
target: /assets/targets/2026-07-23.png
target_url: https://cssbattle.dev/play/859niQYa0JbjMbzMNadA
colors: ["#3f3642", "#fef6e2"]
player: gunnar
chars: 125
score: 721.52
match: 100
code: |
  <style>*{border:5vw solid#3F3642;background:radial-gradient(1q,#FEF6E2.625em,#3F3642)50%/.2lh 5ch;*{margin:50 100;font:6em/9'
---

The July 23 target shows cream stripes on a dark purple-gray background, like blinds. In the middle, a dark square hides them, with a big cream disc inside: a sun behind the blinds. Gunnar Bittersmann draws all of it with one background, a circle made with `radial-gradient`, given to html and to body. On html, the units are small: each tile keeps a thin slice of the circle, and the slices make the stripes. body gets a bigger font, so the same units grow, and the same circle becomes one big disc.

Use **Teaching colors** to tell html's stripes from body's background, and the two borders apart.

{% include animations/2026-07-23.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html, then head, body, style */
  border: 5vw solid#3F3642;        /* a 20px dark frame */
  background:
    radial-gradient(
      1q,                          /* a circle, with a 1q ray (about 0.94px) */
      #FEF6E2.625em,               /* cream up to .625em: 10px on html, 60px on body */
      #3F3642                      /* then dark */
    )
    50% / .2lh 5ch;                /* centered tiles: 3.6 × 40 on html, 172.8 × 240 on body */
  * {                              /* head, body, style */
    margin: 50 100;                /* body: 160 × 160 at (120, 70) */
                                   /* 96px, line-height 9 × 96 = 864px, family: the string ' */
    font: 6em/9'
```

## How it works

### 1. html is the canvas

There is no doctype: the page is in quirks mode. In that mode, a number with no unit counts as px in `margin`. The style element is never closed, so everything after `<style>` is CSS.

`*` targets html first. html is 400 × 300, the whole canvas (I checked with getBoundingClientRect). Its background is painted on the whole canvas. head and style get the same rules, but they are hidden.

### 2. A circle in a thin tile

`.2lh 5ch` is the size of the background tiles. `lh` is the element's line-height, and `ch` the width of the "0" in its font. html keeps the default font and `line-height: normal`. In my render, the computed tile size on html is 3.6 × 40: .2lh = 3.6px (a line-height of 18px), and 5ch = 40px.

`radial-gradient(1q,…)` with a single length is a circle with that radius. The gradient's ray is 1q, a quarter of a millimeter, about 0.94px. The cream stop is at .625em = 10px, beyond the ray. The dark stop has no position: it would go at the end of the ray, but a stop cannot come before the one before it, so it moves to 10px. That makes a hard edge: a cream disc with a 10px radius, dark around it, at the center of each tile.

The tile is only 3.6px wide. It keeps a thin vertical slice of the circle, 1.8px on each side of the center. That slice is 20px tall in the middle of the tile, and 2 × √(10² − 1.8²) ≈ 19.67px at its edges. In my render, each band is 20 rows of plain cream.

### 3. The tiles repeat: stripes

The tiles repeat in both directions, over the whole canvas. Side by side, the slices make one cream band, 20px tall, across the whole width.

`50%` places the tiles. With one value, the second one is `center`. Positions are measured in html's padding box, from (20, 20) to (380, 280), 360 × 260. Down the page, a row of tiles starts at y = 20 + (260 − 40) / 2 = 130, then every 40px: …, 10, 50, 90, 130, …. Each tile has its cream from 10 to 30px down. The bands run from y = 20 to 40, 60 to 80, and so on down to 260 to 280: seven bands. The tile rows at −30 and 290 put their cream off the canvas.

### 4. html's border

`border:5vw solid#3F3642` is a dark frame, 5vw = 20px wide, painted on top of the canvas. On the sides, it cuts the bands at x = 20 and x = 380. At the top and bottom, it falls on dark rows, from y = 0 to 20 and from 280 to 300.

### 5. body: a 160 × 160 box

The nested `*{` means `* *`: every element inside another one. That is head, body and style. `margin:50 100` counts in px. body sits in html's content box, 360 × 260 at (20, 20). In quirks mode, body fills html's height minus its margins. I checked with getBoundingClientRect: body is 160 × 160, at (120, 70).

body also gets the rules of `*`. Its 20px border is the dark frame of the square, from x = 120 to 280 and y = 70 to 230. Its background is painted on top of the canvas, inside its box. With html's font, it would show the same bands as the canvas: I checked by removing the font, and the bands inside body fall in the same rows.

### 6. A bigger font: one disc

`font:6em/9'` gives body a 96px font and a line-height of 9 × 96 = 864px. The font shorthand needs a family. `'` opens a string that is never closed, so it runs to the end of the code: the family is an empty name (the computed value is `""`).

The same gradient now uses body's units. In my render, the computed tile size is 172.8 × 240: .2lh = 172.8px, and 5ch = 240px. The circle's radius is .625em = 60px.

The tiles are placed in body's padding box, from (140, 90) to (260, 210), 120 × 120. With `50%`, a tile starts at x = 140 + (120 − 172.8) / 2 = 113.6 and y = 90 + (120 − 240) / 2 = 30. Its center is (200, 150), the center of the canvas. The disc runs from (140, 90) to (260, 210): it touches the inside of the frame. The tile is bigger than body's box, so no other circle shows. Around the disc, the dark part of the gradient fills the rest of the box.

One background, two sets of units: thin stripes on html, one big disc on body.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- The font is the key. Without `;font:6em/9'` (113 characters), body keeps html's units and draws the same bands as the canvas, in the same rows: 6,688 pixels change.
- `'` is the shortest family. `9a` would be read as one token, the number 9 with a unit "a": the whole font declaration is dropped (body's tile stays 3.6 × 40), and the same 6,688 pixels change. `9 a` works, but it takes 126 characters.
- `/9` makes .2lh = 172.8px, wider than the 120px disc. With `/6`, .2lh = 115.2px: the tile is narrower than the disc. The disc is cut on both sides, bits of the next circles show at the cuts, and 268 pixels change. With `/7`, the picture is the same.
- `.625em` is 10px on html and 60px on body, in 6 characters. `10px` would need a space, `#FEF6E2 10px` (124 characters), and the disc would shrink to a 10px radius: 10,988 pixels change. Without the space, `#FEF6E210px` is not a valid color: the whole background is dropped, and in my render the canvas turns white.
- `.2lh` follows the font. `1%` is shorter (123 characters) and still 3.6px on html, 1% of 360px. But on body it is 1% of 120px, 1.2px: the inside of body turns all cream, and 3,096 pixels change.
- `1q` makes the gradient a circle, in 2 characters. With no size, `radial-gradient(#FEF6E2.625em,#3F3642)` (122 characters) is an ellipse sized to the tile, and the stripes are gone: 33,496 pixels change. `0` is shorter too (124 characters), but in my render the stripes and the disc are gone: 48,904 pixels change.
- `50%` centers both ways in 3 characters, since one value means `50% center`. With `0` (123 characters), the stripes stay in place, but the disc moves 26.4px to the right and the frame cuts it: 4,446 pixels change.
- One `border` draws both frames. Without `border:5vw solid#3F3642;` (101 characters), the stripes reach the edges of the canvas, body grows to 200 × 200 at (100, 50) with no frame, and 13,040 pixels change.
- Quirks mode and missing spaces save characters. With `50px 100px`, the code is 129 characters. With a space in `solid #3F3642` or in `#FEF6E2 .625em`, it is 126. Same picture each time.
- Nothing is closed. Since `'` runs to the end, closing everything takes `'}}</style>`: 136 characters, 11 more, and the picture is the same.

## If you try it at home

In my Chrome, the edge of the disc is not smoothed: my render has only two colors, cream and dark. In the target, the pixels along the edge of the disc mix the two colors. 190 pixels on that edge differ from the target by more than 8 on one channel; the rest matches. The CSS Battle judge gives the code a 100% match.
