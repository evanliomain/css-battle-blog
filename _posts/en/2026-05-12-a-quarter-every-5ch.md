---
title: "A quarter every 5ch: a half-striped flag in 94 characters"
ref: 2026-05-12
permalink: /2026/05/12/a-quarter-every-5ch/
description: "How one conic gradient, tiled every 5ch, and a border in the canvas color draw a cream rectangle with four slits, in the May 12, 2026 CSS Battle target."
target: /assets/targets/2026-05-12.png
target_url: https://cssbattle.dev/play/u41ymkGcksYMcCDGgmze
colors: ["#556d7f", "#f4dcbf"]
player: idunnosrw
chars: 94
score: 763.29
match: 100
code: |
  <style>&{background:conic-gradient(#556D7F 25%,#F4DCBF 0)0 5vw/100%5ch;border:64q solid#556D7F
---

The May 12 target shows a cream rectangle on a blue-gray background, like a flag: the left half is plain, the right half is cut into five bands by four blue slits. iDunnoSRW draws it with a single rule on html. A conic gradient paints a tile whose top-right quarter is blue, the tile repeats every 5ch down the page, and a border in the canvas color hides everything outside the rectangle.

**Teaching colors** show the border in orange and the blue quarter of each tile in light blue, so the tiles under the border stay visible.

{% include animations/2026-05-12.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                                         /* at the top level: the root, html */
  background:
    conic-gradient(#556D7F 25%, #F4DCBF 0)  /* the first quarter blue, the rest cream */
    0 5vw                                   /* 0 across, 20px down */
    / 100% 5ch;                             /* tile: 280 × 40 */
  border: 64q solid #556D7F                 /* a 60px frame in the canvas color; the end of the code closes the rule */
```

## How it works

### 1. & is html

`&` comes from CSS nesting. Outside any rule, it means the root of the page: html. The code has no doctype, so the page is in quirks mode, and html fills the whole window: my Chrome measures it at 400 × 300.

html's background is not limited to its box: it is painted on the whole canvas. That matters in step 5.

### 2. A 60px border

`border:64q solid#556D7F` puts a border on all four sides. 1q is a quarter of a millimeter, about 0.945px, so 64q ≈ 60.47px. My Chrome draws it 60px wide.

What is left inside is a box of 400 − 2 × 60 = 280 by 300 − 2 × 60 = 180, at (60, 60). A background is placed on that box: its size and position count from there.

### 3. A conic gradient: one blue quarter

`conic-gradient(#556D7F 25%,#F4DCBF 0)` starts at the top of the image and turns clockwise around its center. From 0 to 25%, that is from 0 to 90°, it is blue. The cream stop is at `0`: a stop can't come before the previous one, so it is moved to 25%, and the edge between the two colors is sharp. The other 75% are cream.

With no size, the image covers the whole 280 × 180 box. Its center is at (200, 150), and the blue part is the top-right quarter: in my render of that variant, x = 200 to 340 and y = 60 to 150.

### 4. A tile of 280 × 40, moved 20px down

`/100%5ch` sets the image size. `100%` is the full width of the box, 280px. `5ch` is five times the width of the digit 0. In my Chrome, the font is Times at 16px, where 1ch is 8px: 5ch = 40px. The tile is now 280 × 40, and its blue quarter 140 × 20.

`0 5vw` places it: 0 across, and 5vw = 5% of 400 = 20px down. The tile runs from y = 80 to 120. Its blue quarter, from (200, 80) to (340, 100), is the first slit.

### 5. The tiles repeat, the border hides the rest

A background repeats both ways: a tile every 40px down and every 280px across, and html's background covers the whole canvas. Inside the box, the left half stays cream. The right half alternates 20px of blue and 20px of cream: the slits are at y = 80, 120, 160 and 200, and the five cream bands at y = 60, 100, 140, 180 and 220, each 20px tall. The first band is the bottom half of the tile above, which runs from y = 40 to 80.

Outside the box, the tiles go on, under the border. With a transparent border (`#0000` in place of `#556D7F`), my render shows them over the whole canvas, and 48,800 pixels change. The border is drawn above the background, in the same blue as the slits: it hides the tiles, and it is the blue around the rectangle.

The 20px shift matters too. With `0 0` in place of `0 5vw`, the tile starts at y = 60: the slits and the bands swap places in the right half, and 25,200 pixels change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&` writes html in 1 character. With `html{` (97 characters), the picture is the same. `*` has the same length, but it also matches body, which gets the same background and border: with `*{` (94 characters), 30,144 pixels change.
- `64q` writes about 60px in 3 characters. With `60px` (95 characters), the picture is the same.
- `5vw` writes 20px in 3 characters. With `20px` (95 characters), the picture is the same.
- `5ch` writes 40px in 3 characters, here in my Chrome. With `40px` (95 characters), the picture is the same.
- `25%` writes a quarter turn in 3 characters. With `90deg` (96 characters), the picture is the same.
- The second stop at `0` gives the sharp edge in 1 character. With `#F4DCBF 25%` (96 characters), the picture is the same.
- One border does two jobs: the blue frame around the rectangle, and hiding the tiles that repeat outside the box.
- No space after `)`, after `100%` or before `#`. With the three spaces, `0) 0 5vw/100% 5ch;border:64q solid #556D7F` (97 characters), the picture is the same.
- The code ends inside the open rule, and the end of the code closes it. With `}` at the end (95 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the edges of the official code land on the same pixels as in the target. But all 120,000 pixels differ from my render. 111,040 of them are flat pixels one level apart: the blue is (85, 109, 127) in my render, which is `#556d7f`, and (86, 109, 127) in the target; the cream is (244, 220, 191), `#f4dcbf`, against (244, 221, 190). The target file I have is a JPEG: it has 111 different colors, my render 2. 1,039 pixels differ by more than 8 levels, and all of them are within 4px of an edge. The largest difference is 26 levels, at (60, 60), the top-left corner of the rectangle: cream in my render, (218, 213, 207) in the target. The CSS Battle judge gives the official code a 100% match.
