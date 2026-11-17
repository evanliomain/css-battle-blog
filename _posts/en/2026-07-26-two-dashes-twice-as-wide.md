---
title: "Two dashes, twice as wide: a blocky smile in 96 characters"
ref: 2026-07-26
permalink: /2026/07/26/two-dashes-twice-as-wide/
description: "How html's border draws the mouth and body's dashed border, stretched twice as wide, draws the four side blocks in the July 26, 2026 CSS Battle target."
target: /assets/targets/2026-07-26.png
target_url: https://cssbattle.dev/play/CUs5VythepaqtPdbLpI7
colors: ["#e38f66", "#f7ec7d"]
player: h_blierzt
chars: 96
score: 760.21
match: 100
code: |
  <style>*{margin:40 90;background:#E38F66;border:dashed 5em#F7EC7D;*{margin:-120-185-30;scale:2 1
---

The July 26 target is a blocky smile on an orange background: four yellow blocks touch the left and right edges, two at the top and two lower down, and a yellow bar sits in the middle, near the bottom. H_Bliertz gives html and body the same 80px dashed border. html's border makes the bar. body's border, pulled wide by negative margins and stretched twice as wide with `scale`, breaks into the four blocks.

Use **Wide view** to see body run far off both sides of the canvas, and **Teaching colors** to tell html's border from body's.

{% include animations/2026-07-26.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                               /* html first, then body (head and style are hidden) */
  margin: 40 90;                  /* html: x = 90 to 310, y = 40 to 260 */
  background: #E38F66;            /* the canvas (html), and body's own box */
  border: dashed 5em#F7EC7D;      /* 80px yellow border, on html and on body */
  * {                             /* head, style, body */
    margin: -120-185-30;          /* body: x = -15 to 415, from y = 0, 210px tall */
    scale: 2 1                    /* twice as wide, around x = 200 */
```

## How it works

### 1. html: a solid frame

The style element is never closed, so everything after `<style>` is CSS. There is no doctype: the page is in quirks mode. In that mode, a number with no unit counts as px in `margin`.

`*` targets html first. Its background, `#E38F66`, is the root's background: it paints the whole canvas orange.

In quirks mode, html also stretches to the height of the window. With `margin:40 90`, its box is 400 − 90 − 90 = 220px wide and 300 − 40 − 40 = 220px tall: from x = 90 to 310 and from y = 40 to 260.

Its border is `dashed 5em`. 1em is 16px, so 5em = 80px. That leaves a 60 × 60 content box, from x = 170 to 230 and y = 120 to 180. The border is dashed, but in my render it comes out solid: with body hidden, the whole frame is yellow, 220 × 220 − 60 × 60 = 44,800 pixels.

### 2. body: a very wide box

The nested `*{` means `* *`: any element inside another one. That is head, style and body. head and style are hidden. body gets the outer rule too: the same orange background and the same dashed border.

body takes `margin:-120-185-30`: −120px on top, −185px on the left and right, −30px at the bottom.

- Top: html's content starts at y = 120, so body starts at y = 0.
- Width: html's content is 60px wide. With −185px on each side, body is 60 + 185 + 185 = 430px wide, from x = −15 to 415.
- Height: body is empty, but in quirks mode it stretches to fill html's content, 60px tall. That is the height of its margin box, so its border box is 60 + 120 + 30 = 210px tall, from y = 0 to 210. I checked by changing the bottom margin: with −60, body is 240px tall; with 0, it is 180px.

body is painted after html. Its orange background covers html's frame down to y = 210.

### 3. dashed: two gaps

body's border is 80px wide, like html's, but its sides are much longer. In my render, the top side, 430px long, comes out as yellow from x = −15 to 145, orange from 145 to 255, and yellow from 255 to 415: 160px, 110px, 160px. The bottom side, from y = 130 to 210, is the same. The left and right sides, with only 50px between the corners, stay solid.

The gaps are not empty: they show body's orange background, the same color as the canvas.

Between the top and bottom borders, from y = 80 to 130, is body's content box, also orange, from x = 65 to 335.

### 4. scale:2 1: twice as wide

`scale:2 1` doubles body's width and keeps its height. The scale happens around the center of body's box: −15 + 430 / 2 = 200. Each x becomes 2x − 200:

- the yellow ends: −15 to 145 becomes −230 to 90, and 255 to 415 becomes 310 to 630;
- the gaps: 145 to 255 becomes 90 to 310, 220px wide;
- the side borders: x = −230 to −70 and 470 to 630, off the canvas;
- the content box: 65 to 335 becomes −70 to 470, wider than the canvas.

`scale` does not change the layout, only the painting. On the canvas, what is left of body's border is four yellow blocks of 90 × 80: x = 0 to 90 and 310 to 400, at y = 0 to 80 and y = 130 to 210. Between them, from y = 80 to 130, body's orange content box covers the whole width.

### 5. The bar: html's border peeks out

body ends at y = 210. html's bottom border runs from y = 180 to 260, so its lower 50px are not covered. They make the bar: 220 × 50, from x = 90 to 310 and y = 210 to 260.

Below y = 260, the canvas is orange again: that is html's bottom margin, painted by the root background.

## Golf notes

- One rule styles both elements. html and body get the same background and the same dashed border from `*`. The nested rule only changes body's margin and adds the scale.
- body's background comes for free, and it matters: it hides html's frame. With `background:none` added for body, 33,800 pixels change: html's frame shows in the middle, from y = 40 to 210.
- `dashed` is one character longer than `solid`, and it makes the picture. With `solid`, the two gaps fill in: 2 × 220 × 80 = 35,200 pixels change.
- `scale:2 1` is 9 characters. `transform:scaleX(2)` gives the same picture in 106 characters, 10 more.
- Without the scale, the code is 86 characters, and 24,100 pixels change: the four blocks are 145px wide instead of 90 (2 × 55 × 160 = 17,600 pixels), and body's side borders show at x = 0 to 65 and 335 to 400 between the blocks (2 × 65 × 50 = 6,500 pixels).
- The values have no units: the page is in quirks mode. With `px` on each of the five margin values, the code is 106 characters, 10 more, and the picture is the same.
- The quirks mode does more than accept unitless numbers: it stretches html and body. With `<!doctype html>` and px units, body is only 160px tall in my render, and html 170px.
- `5em` is 80px in 3 characters. `80px` gives the same picture in 97 characters.
- No space is needed in `5em#F7EC7D`: the `#` starts a new token. In `-120-185-30`, each minus sign starts a new number. With the three spaces, the code is 99 characters and the picture is the same.
- Nothing is closed: neither the two rules nor the style element. With `}}</style>` at the end, the code is 106 characters and the picture is the same.
