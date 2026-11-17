---
title: "Shared shadows and a dotted o: the word pop in 155 characters"
ref: 2026-07-29
permalink: /2026/07/29/shared-shadows-and-a-dotted-o/
description: "How two box shadows, given to both html and body, draw the two p's of the July 29, 2026 CSS Battle target, and how one dotted border draws the o."
target: /assets/targets/2026-07-29.png
target_url: https://cssbattle.dev/play/PnDXitrVaUCdncId6g1x
colors: ["#a84a4b", "#f5e3b5"]
player: kieron
chars: 155
score: 691.3
match: 100
code: |
  <style>*{background:#A84A4B;margin:110 55%60 160;color:F5E3B5;box-shadow:25vw 0,-30vw 0;*{margin:0-80 50 0;border-radius:0 2in 2in 0;border-left:5pc dotted
---

The July 29 target spells "pop" in beige on a red-brown background. Each p is a square stem with a round bowl, and the o is a disk. Kieron draws it with two elements and one list of two shadows. On html, a thin tall box, the shadows draw the stems. On body, a wider box with a rounded right side, the same shadows draw the bowls. body's left border, 80px wide and dotted, is a single round dot: the o.

Use **Teaching colors** to tell html's shadows, body and its border apart.

{% include animations/2026-07-29.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                               /* html and body (head and style are hidden) */
  background: #A84A4B;            /* html: the canvas color */
  margin: 110 55%60 160;          /* html: 20 × 130 at (160, 110); 55% = 220px */
  color: F5E3B5;                  /* the beige of the shadows and of the border */
  box-shadow:
    25vw 0,                       /* 100px right: the right stem (html), the right bowl (body) */
    -30vw 0;                      /* 120px left: the left stem (html), the left bowl (body) */
  * {                             /* * *: body */
    margin: 0-80 50 0;            /* body: 100 × 80 at (160, 110) */
    border-radius: 0 2in 2in 0;   /* 192px, scaled down to 40px: a half-circle right side */
    border-left: 5pc dotted       /* 80px wide on an 80px side: one round dot, the o */
```

## How it works

### 1. html: a 20 × 130 box

The style element is never closed, so the whole code is CSS. There is no doctype: the page is in quirks mode, and bare numbers like `110` are read as px.

`*` targets every element. head and style are hidden, so the ones that show are html and body. html takes `margin:110 55%60 160`. A percentage margin is a share of the width: 55% of 400 is 220px. So html is 400 − 160 − 220 = 20 wide, from x = 160 to 180. In quirks mode, html fills the 300px height minus its margins: 300 − 110 − 60 = 130. html runs from y = 110 to 240.

html's background, `#A84A4B`, is the root's background: it paints the whole canvas.

### 2. html's shadows: the stems

`25vw` is 100px (a quarter of 400) and `30vw` is 120px. Each shadow is a copy of html's box, 20 × 130, moved sideways. `25vw 0` puts one at x = 260 to 280, `-30vw 0` puts the other at x = 40 to 60. Both run from y = 110 to 240.

The shadows have no color, so they take `color`. In quirks mode, `F5E3B5` works without its `#`: a beige. These two beige bars are the stems of the two p's.

### 3. body: 100 × 80

The nested `*{` means `* *`: any element inside another one. That is body. It comes after the outer `*{`, so for body its `margin` wins. body still gets the background, the color and the two shadows of the outer rule.

body starts at the top-left corner of html's box, (160, 110). Its right margin of −80 makes it 80px wider than html: 20 + 80 = 100, from x = 160 to 260. In quirks mode, body takes html's 130px of height minus its own margins: 130 − 50 = 80. body runs from y = 110 to 190.

### 4. A half-circle right side

`border-radius:0 2in 2in 0` gives the two right corners a radius of 192px. The right side is only 80 tall, and 192 + 192 = 384. Chrome scales all the radii down by the same factor until they fit: 80 / 384, which gives 40px. The right side of body becomes a half circle of radius 40, centered at (220, 150).

body's own background is `#A84A4B`, the canvas color. So this rounded shape does not show by itself. It matters for the shadows, in section 6.

### 5. A dotted border: the o

`5pc` is 80px (1pc = 16px). `border-left:5pc dotted` gives body an 80px left border. It has no color, so it takes `color`: beige.

Chrome draws a dotted border as round dots, as wide as the border. body's left side is 80 tall, so there is room for one dot only: a disk 80px across, from x = 160 to 240 and from y = 110 to 190. That is the o, centered at (200, 150). The border takes 80 of body's 100px. The 20px left, from x = 240 to 260, is body's red background.

### 6. body's shadows: the bowls

body gets the same two shadows as html. html and body both start at x = 160, so the same offsets put body's copies right above the stems. A box shadow follows the rounding of its box: each copy is 100 × 80 with a half-circle end.

- `25vw 0` puts one from x = 260 to 360: the bowl of the right p.
- `-30vw 0` puts the other from x = 40 to 140: the bowl of the left p.

They run from y = 110 to 190 and cover the top of the stems. The two p's are complete.

## Golf notes

- One shadow list does the work of two. html and body start at the same x, so the same two offsets place the stems (copies of html, 20 × 130) and the bowls (copies of body, 100 × 80). The list is written once, in `*`.
- `25vw` is 100px in 4 characters, one less than `100px`, and `-30vw` is one less than `-120px`. With px, the picture is the same in 157 characters. Bare numbers do not work here: with `100 0,-120 0`, Chrome drops the whole `box-shadow` (it computes to `none`), the stems and the bowls are gone, and 16,728 pixels change.
- `55%` is 220px in 3 characters, and the `%` ends the number: `55%60` needs no space. `110 220 60 160` gives the same picture in 156 characters.
- No space before a minus sign: `0-80`.
- In quirks mode, `color` takes a hex color without its `#`: `color:#F5E3B5` gives the same picture in 156 characters.
- `color` is set once, and three things use it: the two shadows and the border. With no `color`, and `#F5E3B5` written in each of them, the picture is the same in 163 characters.
- The nested `*{` is 2 characters for body. `body{` in its place gives the same picture in 158 characters.
- `2in` is 192px in 3 characters. Any radius of 40px or more gives the same half circle: `0 40px 40px 0` gives the same picture, and with 39px, 342 pixels change. A bare `40` does not work: Chrome drops the declaration, the bowls get square ends, and 1,552 pixels change.
- The o costs one declaration, not one more element. `dotted` is what makes it round: with `solid`, the border is an 80 × 80 square whose right corners follow body's rounded side, and 1,588 pixels change.
- Nothing is closed: neither the two rules nor the style element. With `}}</style>` at the end, the code is 165 characters and the picture is the same.

## If you try it at home

In my Chrome, 434 pixels differ from the target by more than 8 on one channel. All of them are on the curved edges of the two bowls and of the disk. There, my render and the target mix the beige and the red in different proportions: some of my pixels are lighter, some darker. The CSS Battle judge gives the code a 100% match.
