---
title: "Periods and middle dots: a zigzag in 161 characters"
lang: en
ref: 2026-08-28
permalink: /2026/08/28/periods-and-middle-dots/
description: "How two box-shadows on html draw the zigzag bar of the August 28, 2026 CSS Battle target, and six punctuation marks in a 423px font draw its six discs."
target: /assets/targets/2026-08-28.png
target_url: https://cssbattle.dev/play/qNQBUEefiqFutUSGMOzp
colors: ["#2d3464", "#f7ec7d"]
player: gabriele19
chars: 161
score: 686.23
match: 100
code: |
  ... ¸¸···<style>&{background:#2D3464;color:F7EC7D;margin:165 130-80 30;box-shadow:25vw -259q#2D3464,53q -90pt;*{margin:-409-38;letter-spacing:-46;font:448q/.782'
---

The August 28 target is a pale yellow zigzag on a dark blue background: a thick bar that goes down from the top left, runs right, and goes down again. Each end of the bar is rounded, and has a disc on each side. Gabriele draws the bar with two shadows of `html`, one yellow and one blue that cuts it. The six discs are text: three periods on a first line, three middle dots on a second one, in a 423px font.

Use **Wide view** to see the giant text box of the `body`, and **Teaching colors** to tell the two shadows and the three kinds of characters apart.

{% include animations/2026-08-28.html lang=page.lang %}

## The code, spaced out

```css
... ¸¸···                          /* the text of body */
<style>
& {                                /* html */
  background: #2D3464;             /* the whole canvas */
  color: F7EC7D;                   /* no # in quirks mode */
  margin: 165 130 -80 30;          /* a 240 × 215 box at (30, 165) */
  box-shadow:
    25vw -259q #2D3464,            /* +100, −244.72: blue, on top */
    53q -90pt;                     /* +50.08, −120: yellow */
  * {                              /* head, style, body */
    margin: -409 -38;              /* body: 316 × 1033 from (−8, −244) */
    letter-spacing: -46;
    font: 448q / .782 '';          /* 423.31px, lines of 331.03px */
  }
}
```

## How it works

### 1. html: a box, and a blue canvas

At the top level, `&` is `html`. The background of `html` is painted on the whole canvas, so `#2D3464` covers it all.

`margin:165 130-80 30` leaves 400 − 30 − 130 = 240px of width. In quirks mode, `html` fills the height of the frame minus its margins: 300 − 165 + 80 = 215px. So it is a 240 × 215 box at (30, 165). It runs down to y = 380, 80px below the canvas. Nothing is drawn in it: it is only there for its shadows.

### 2. A yellow shadow

A box shadow has the shape of its box. `53q -90pt` moves it 53 quarter-millimeters to the right, 50.08px, and 90pt up, 120px. The shadow covers x 80.08 to 320.08, y 45 to 260.

It has no color, so it takes `color`: `F7EC7D`, the yellow. In quirks mode, a color can drop its `#`.

An outer shadow is never painted under its own box. The bottom-left part of the yellow rectangle is under the box of `html` (x 30 to 270, from y = 165), so it stays blue. What is left is a wide band at the top, from y = 45 to 165, and a 50px leg on the right, x 270 to 320, down to y = 260.

### 3. A blue shadow cuts it

`25vw -259q#2D3464` moves the box 100px to the right and 244.72px up: x 130 to 370, y −79.72 to 135.28. Its color is the background color.

The first shadow of the list is painted on top. So the blue rectangle covers the top band of the yellow one, except its left 50px, x 80 to 130. The zigzag is there: a bar down from y = 45 on the left, a band from y = 135.28 to 165, and the leg on the right down to y = 260.

### 4. body: a giant line of text

The nested `*` matches every element inside `html`: `head`, `style` and the `body`. Only the `body` is displayed. `margin:-409-38` gives it −409px at the top and bottom, −38px on the sides. I measured it: 316 × 1033, from (−8, −244).

`font:448q/.782'` sets the size and the line height. 448q is 423.31px, and .782 of that is 331.03px. So line 1 runs from y = −244 to 87.03, and line 2 from 87.03 to 418.05. The family is `'`: a string that the end of the code closes. It is an empty font name. No font has it, so the browser uses its default font.

### 5. Line 1: three periods

The text of the `body` is `... ¸¸···`, written before `<style>`. The first line holds the three periods.

In my Chrome, a period is a quarter of the font size wide: 105.83px. `letter-spacing:-46` takes 46px off every character, so each period moves the pen 59.83px. The three periods are about 60px apart. A period sits on the baseline, near the top of the canvas. In the target, they are 50px discs centered at x = 45, 105 and 165, y = 45.

### 6. Line 2: two cedillas and three middle dots

The line breaks at the space. `¸¸···` is 369.4px wide, more than the 316px of the `body`, and it has no place to break. So it all goes to line 2, and runs past the right edge of the `body`.

A cedilla hangs below the baseline. On line 2, its ink falls below the canvas: in my Chrome, from y = 389 to 480. It is never seen. Only its width counts: about 95px each after the letter-spacing, 189.92px for the two. They push the three middle dots to the right. In the target, the middle dots are 50px discs at x = 235, 295 and 355.

Line 2 is 331.03px lower than line 1. But a middle dot sits about 121px higher above the baseline than a period. So the second row of discs is only 210px below the first: y = 255 in the target.

### 7. The middle discs round off the bar

The middle disc of each row lands on one end of the bar. At the top, the disc centered at (105, 45) covers x 80 to 130, the width of the bar, and rounds off its top. At the bottom, the disc at (295, 255) does the same for the leg, x 270 to 320. The text is painted after the shadows of `html`, on top of them.

## Golf notes

- One shadow draws the whole bar, and a second one, in the background color, cuts it. The box of `html` hides the bottom-left part for free.
- The six discs are six characters. The two cedillas are invisible spacers: their ink is below the canvas, and their width pushes the bottom row 189.92px to the right.
- The font family is a single `'`, closed by the end of the code. `.782a` would not work: it reads as one dimension, and I checked that the whole `font` declaration is then dropped (the text goes back to 16px). `.782 a` gives the same render, one character longer.
- `color:F7EC7D` drops its `#` in quirks mode. `background` keeps it: without it, I checked that the canvas stays white.
- `53q` is 50.08px, `-90pt` is −120px, `25vw` is 100px, `-259q` is −244.72px, `448q` is 423.31px.
- No space is needed in `130-80`, `-409-38` or `-259q#2D3464`.
- `<style>` is never closed, and the last two braces are left out.

## If you try it at home

The six discs are glyphs of the default font. In my local Chrome on a Mac (version 157 when this was written), `Times` or `serif` in place of `'` gives the exact same picture. There, the dots are 46 to 49px wide instead of 50. The top row is centered at y = 39 instead of 45, and about 15px too far right. The bottom row is centered at y = 248.5 instead of 255, and about 7px too far left. Three edges of the bar are also blended over one row or column of pixels: y = 135, where the blue shadow stops at 135.28, and x = 80 and 320, since 53q is 50.08px. In all, 7,441 pixels differ from the target, 6,807 clearly. On the CSS Battle judge, the solution is a 100% match. The animation above draws the discs where the target has them.
