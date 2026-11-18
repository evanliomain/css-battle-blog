---
title: "The canvas through the shadow: four pills and a bar in 129 characters"
ref: 2026-05-30
permalink: /2026/05/30/the-canvas-through-the-shadow/
description: "How one list of three box shadows, cast by html and again by a body with a tiny font, draws four white pills and a teal bar on mint green, with the top pills left as a hole in the shadow, in the May 30, 2026 CSS Battle target."
target: /assets/targets/2026-05-30.png
target_url: https://cssbattle.dev/play/q8WdCHHuO4lvK1QbC5kI
colors: ["#fff", "#317080", "#59cfa0"]
player: emohdaziz
chars: 129
score: 716.98
match: 100
code: |
  <style>*{border-radius:3lh;margin:65 90 155;box-shadow:0 5lh#fff,0 3in#317080,0 3in 0 53em#59cfa0;*{margin:-288 100 198;font:.2Q"
---

The May 30 target shows four white pills in two rows on mint green, split down the middle by a teal bar. Mohamed Ali paints nothing white on top: html casts a giant green shadow, and a shadow is never drawn under its own box, so the top pills are the white canvas seen through a hole. body casts the same three shadows, but with a tiny font they shrink into the bar and the cut.

Use **Wide view** to see body's box above the canvas and html's teal shadow below it.

{% include animations/2026-05-30.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* html, head, body, style */
  border-radius: 3lh;        /* html: 54px, a pill; body: 0 */
  margin: 65 90 155;         /* html: 220 × 80 at (90, 65) */
  box-shadow:
    0 5lh#fff,               /* html: 90px down, the bottom pills; body: hidden */
    0 3in#317080,            /* body: 288px down, the bar; html: off the canvas */
    0 3in 0 53em#59cfa0;     /* html: 848px spread, the green; body: 10px, the cut */
  * {                        /* * *: head, body, style (not html) */
    margin: -288 100 198;    /* body: 20 × 170 at (190, −223) */
    font: .2Q"               /* 0.19px: em = 0.19px, lh = 0 */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `65` in a margin is read in px.

The page has html, head, body and style. head and style are not displayed. `*` matches all four: html and body both get the radius, a margin and the three shadows. The nested `*{` means `* *`: any element inside another one. That is head, body and style, but not html. So the second margin and the font go to body only. Its margin replaces the first one.

### 2. html's pill

`margin:65 90 155` sets 65px at the top, 90px on the sides and 155px at the bottom. In quirks mode, html fills the page minus its margins: 400 − 180 = 220 wide, 300 − 65 − 155 = 80 tall. I measured it: 220 × 80, at (90, 65).

`lh` is the line height. html has the default 16px font, and in my Chrome `3lh` computes to 54px, so one `lh` is 18px. A 54px radius is more than half of 80: the browser shrinks the corners to 40px, and the box becomes a full pill.

html has no background, and body neither. So nothing paints the canvas: it stays white, the default color of the page.

### 3. A green shadow with a hole

The third shadow, `0 3in 0 53em #59cfa0`, moves down 3in = 288px and spreads 53em = 53 × 16 = 848px on each side. Its box runs from x = −758 to 1158 and from y = −495 to 1281: it covers the whole canvas in green.

An outer shadow is never painted under the box that casts it. The browser cuts out html's border box, round corners included. Under html's pill, the green leaves a hole, and the white canvas shows through: these are the two top pills. I checked: with `<style>html{background:red}</style>` added in front of the code, only the top pills change, and they turn red.

### 4. The bottom pills

The first shadow, `0 5lh #fff`, moves down 5 × 18 = 90px: from y = 155 to 235. The first shadow of the list is painted on top of the others, so it sits in front of the green. It is the bottom pill: the same shape as the hole above it, with a 10px gap between them.

The second shadow, `0 3in #317080`, moves down 288px: from y = 353 to 433, off the canvas. html does not need it. It is there for body.

### 5. body, high up and tiny

body's margin is `-288 100 198`. body fills html's content box minus its margins. Its width is 220 − 2 × 100 = 20. Its top is at 65 − 288 = −223. Its height is 80 + 288 − 198 = 170. I measured it: 20 × 170, at (190, −223), all above the canvas.

`font:.2Q"` sets the font size. 1Q is a quarter of a millimeter, 0.945px, so `.2Q` is 0.19px. The `font` shorthand needs a family name: the `"` opens a string, and the end of the code closes it, so the family is an empty name. With that font, `em` is 0.19px, and in my Chrome `lh` is 0: body's `5lh` and `3lh` both compute to 0px.

### 6. The bar

body casts the same three shadows, with its own units. The first one, `0 5lh #fff`, is now `0 0 #fff`: it sits right under body's box, so it is never painted.

The second one, `0 3in #317080`, moves body's 20 × 170 box down 288px: from y = −223 + 288 = 65 to 235, from x = 190 to 210. The `-288` of the margin and the `3in` of the shadow cancel out. The bar runs from the top of the top pills to the bottom of the bottom ones. body is painted after html, so its shadows sit on top of html's.

### 7. The cut

The third one, `0 3in 0 53em #59cfa0`, also moves down 288px, but `53em` is now 53 × 0.189 = 10.02px. The shadow is a green band from x = 180 to 220 and from y = 55 to 245. It is listed after the bar, so it sits behind it, but it covers html's pills: it cuts each row in two. body's radius is 0, so the cut leaves straight ends on both sides of the bar.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list does two jobs. On html, `5lh`, `3in` and `53em` are 90, 288 and 848px. On body, the tiny font turns them into 0, 288 and 10px. Only `3in` keeps its size: it does not depend on the font.
- `3in` is 288px in 3 characters. box-shadow takes no bare numbers, even in quirks mode: with `0 288#317080,0 288 0 53em#59cfa0` (129 characters), the browser drops the whole box-shadow, and the canvas is all white. 94,248 pixels change. `288px` gives the same picture in 133 characters.
- `5lh` is 90px on html and 0 on body. With `0 90px#fff` (130 characters), body's white shadow shows too, from y = −133 to 37: a 20 × 37 white bar at the top of the canvas. 740 pixels change. `5em` (same length) is 80px on html: the bottom pills move 10px up and touch the top ones. 3,818 pixels change.
- `3lh` is 54px on html, enough for a full pill, and 0 on body. With `3in` (same length), body's corners round off: the bar gets round ends, and the pills' inner corners next to the cut are no longer square. 178 pixels change.
- `font:.2Q"` is 9 characters. `font-size:.2Q` (13 characters) gives the same picture in 133 characters. The `"` is needed: `font:.2Q` (128 characters) has no family name, so the browser drops it, and body keeps the 16px font. Its shadows are then as big as html's: its green covers the pills, and only a round-ended bar and a white stub at the top are left. 27,056 pixels change. Closing the string, `font:.2Q""`, gives the same picture in 130 characters.
- No space before the `#`: `0 5lh #fff,0 3in #317080,0 3in 0 53em #59cfa0` gives the same picture in 132 characters.
- Bare numbers: `65px 90px 155px` and `-288px 100px 198px` give the same picture in 141 characters.
- Nesting keeps the second margin and the font off html. `}body{` instead of the inner `*{` gives the same picture in 132 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 464 pixels, with the same rule as in the golf notes, by up to 125. All of them are on the round ends of the four pills: 125 on each left end, 107 on each right end. The flat colors and the straight edges are the same. My render smooths those curves with many in-between shades. The target has fewer: 30 colors in all, against 116 in my render. The CSS Battle judge gives the code a 100% match.
