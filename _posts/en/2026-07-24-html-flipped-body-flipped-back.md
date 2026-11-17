---
title: "html flipped, body flipped back: an L between two hooks in 125 characters"
ref: 2026-07-24
permalink: /2026/07/24/html-flipped-body-flipped-back/
description: "How one box-shadow list, used on a flipped html and on a body flipped twice, draws a hook on each side and an L in the middle, in the July 24, 2026 CSS Battle target."
target: /assets/targets/2026-07-24.png
target_url: https://cssbattle.dev/play/YY6aMJfEYqKa166XP3rZ
colors: ["#a973a2", "#eff8fe"]
player: eguiluz
chars: 125
score: 721.52
match: 100
code: |
  <style>*{scale:-1 1;margin:70 170;background:#a973a2;color:eff8fe;box-shadow:inset 11Q -5ch,116Q 5ch#a973a2,25vw 0;*{margin:0
---

The July 24 target shows three thin white shapes on a mauve background: a hook that opens to the left, an L in the middle, and a hook that opens to the right. David Eguiluz gives html and body the same 60 × 160 box and the same three shadows. An inset shadow draws the L, and two outer shadows draw a hook. `scale:-1 1` flips html, so its hook goes to the left. body is flipped a second time, so it is straight again: its L stays in the middle and its hook on the right.

Use **Teaching colors** to tell html's shadows from body's, and to see the purple shadows, which do not show on the purple canvas.

{% include animations/2026-07-24.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, then head, body, style */
  scale: -1 1;                   /* flipped left to right */
  margin: 70 170;                /* html: a 60 × 160 box at (170, 70) */
  background: #a973a2;           /* the canvas (from html), and body */
  color: eff8fe;                 /* the color of the shadows */
  box-shadow:
    inset 11Q -5ch,              /* a white L: 10.39px bar, 40px foot */
    116Q 5ch#a973a2,             /* a purple copy, on top: 109.61px right, 40px down */
    25vw 0;                      /* a white copy, 100px to the right */
  * {                            /* head, body, style */
    margin: 0                    /* body fills html */
```

## How it works

### 1. One box for html and body

There is no doctype: the page is in quirks mode. In that mode, a number with no unit counts as px in `margin`, and `eff8fe` with no `#` is a valid color. The style element is never closed, so everything after `<style>` is CSS.

`*` targets html first. `margin:70 170` leaves html 400 − 2 × 170 = 60px wide. In quirks mode, html fills the height of the window minus its margins: 300 − 2 × 70 = 160px. Its box runs from (170, 70) to (230, 230).

The nested `*{` means `* *`: every element inside another one. That is head, body and style. head and style are hidden. `margin:0` takes away the `70 170` margins that body got from `*`, and its default 8px. In quirks mode, body fills html. I checked with getBoundingClientRect: html and body are both 60 × 160 at (170, 70).

html's background goes to the canvas, so the whole canvas is `#a973a2`. body has its own background, the same purple, on its box.

### 2. The inset shadow: an L

A shadow with no color takes the element's `color`: `#eff8fe`, the white of the target. Two of the three shadows use it.

`inset 11Q -5ch` is an inset shadow, moved 11Q to the right and 5ch up. An inset shadow paints the inside of the box, except where the moved "hole" still covers it. What is left is a strip on the left, as wide as the move to the right, and a strip at the bottom, as tall as the move up.

11Q is 11 quarter millimeters, about 10.39px. `ch` is the width of the "0" in the current font. In my render, the font is Times 16px, and 5ch = 40px. The L has a bar from x = 170 to 180.39, the full height of the box, and a foot from y = 190 to 230.

### 3. Two outer shadows: a hook

`25vw 0` is a copy of the box, in white, 25% of 400 = 100px to the right: from x = 270 to 330, and from y = 70 to 230.

`116Q 5ch#a973a2` is a copy in purple, 116Q ≈ 109.61px to the right and 5ch = 40px down: from x = 279.61 to 339.61, and from y = 110 to 270.

In a shadow list, the first shadow is on top. The purple copy comes before the white one, so it covers it. Of the white copy, only the top 40px are left, and a bar about 9.6px wide on the left: a hook that opens to the right. The rest of the purple copy does not show on the purple canvas.

### 4. scale:-1 1: html in the mirror

`scale:-1 1` scales by −1 across and 1 down: a mirror from left to right. It turns around the center of the box, x = 200. The box stays where it is, but everything it paints is flipped, shadows included.

html's white copy goes to x = 70 to 130, and its purple copy to x = 60.39 to 120.39. The hook now opens to the left. I checked by painting html's white in red: the left hook is red, nothing else. html's L is flipped too: its bar moves to the right edge of the box, from x = 219.61 to 230.

### 5. body hides html's L

body is painted after html, on top of it. Its purple background covers the whole box, and html's L with it. With no background on body, html's flipped L shows on the right side of the box.

### 6. body: flipped twice

body gets the same rule as html: the same shadows and the same `scale:-1 1`. But body is inside html, which is already flipped. Flipped twice, it is straight: −1 × −1 = 1. Both mirrors turn around x = 200, the center of the same box, so body does not move.

body's shadows go where they are written. Its L is on the left of the box: the L in the middle of the canvas. Its hook is on the right.

One shadow list draws the three shapes: the left hook on html, the L and the right hook on body.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- The flip is what lets one shadow list draw both hooks. Without `scale:-1 1;` (114 characters), html's shadows land on body's, on the right. The left hook is missing, and 3,600 pixels change.
- The order of the outer shadows matters. Swapped, `25vw 0,116Q 5ch#a973a2` (same length), the white copy is on top: the two hooks become plain 60 × 160 white blocks, and 12,240 pixels change.
- `*{margin:0` is needed. Without `;*{margin:0` (114 characters), body also gets `margin:70 170` inside a 60px wide html, and has no width left. Its shadows are gone, html's flipped L shows on the right of the box, and 6,240 pixels change.
- `11Q` is about 10.39px in 3 characters. `10px` takes 4: 126 characters. In my render, only column x = 180 changes: 120 pixels, a mix of white and purple, turn purple.
- `116Q` is about 109.61px in 4 characters. `110px` takes 5: 126 characters, and 240 pixels change, in columns x = 120 and 279, which turn white. `7pc` is shorter, 3 characters (124 in all), but it is 112px: the hook bars are 12px wide, and 720 pixels change.
- `5ch` is 40px in 3 characters, and `25vw` is 100px in 4. With `40px` twice, the code is 127 characters; with `100px`, 126. Same picture.
- Quirks mode saves characters twice. With `70px 170px`, the code is 129 characters; with `#eff8fe`, 126. Same picture.
- `5ch#a973a2`: no space is needed before the `#`. With the space, the code is 126 characters, same picture.
- Nothing is closed: neither the two rules nor the style element. With `}}</style>` at the end, the code is 135 characters, 10 more, and the picture is the same.

## If you try it at home

In my Chrome, 360 pixels differ from the target by more than 8 on one channel. They make three columns, 120 pixels tall each: x = 180, along the right edge of the L's bar, and x = 120 and 279, along the inner edges of the two hook bars. Those edges fall between two pixels (11Q ≈ 10.39px, 116Q ≈ 109.61px). In my render, those pixels are a mix of white and purple. In the target, x = 180 is purple, and x = 120 and 279 are white. The CSS Battle judge gives the code a 100% match.
