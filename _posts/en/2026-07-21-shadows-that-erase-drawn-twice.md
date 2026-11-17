---
title: "Shadows that erase, drawn twice: a page layout in 161 characters"
ref: 2026-07-21
permalink: /2026/07/21/shadows-that-erase-drawn-twice/
description: "How one list of five shadows, drawn by html and again by a flipped body, makes four pale bars and two yellow squares in the July 21, 2026 CSS Battle target."
target: /assets/targets/2026-07-21.png
target_url: https://cssbattle.dev/play/3Id7EGx422al80kPP1eQ
colors: ["#4a9a86", "#fae29e", "#ebf6f0"]
player: h_blierzt
chars: 161
score: 686.23
match: 100
code: |
  <style>*{background:#4A9A86;margin:40%290 60-90;box-shadow:5pc 0#FAE29E,55ch 0,7cm 0 0-32q,25pc -32q,75vw 0#EBF6F0;color:4A9A86;*{margin:-100-380 50%380;scale:-1
---

The July 21 target looks like a page layout: four pale bars and two yellow squares on a green background. The bottom half is the top half turned upside down. H_Bliertz draws it with one list of five shadows, given to both html and body. On each element, a yellow shadow makes a square and a white shadow makes a block. Three green shadows then erase parts of the block, and two bars are left. body is flipped with `scale:-1`, so its copy of the drawing lands upside down, in the other half.

Use **Teaching colors** to see the three green shadows that do the erasing, and **Wide view** to see html and body, which both stick out of the canvas.

{% include animations/2026-07-21.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* every element: html, then body */
  background: #4A9A86;           /* html's background covers the whole canvas */
  margin: 40%290 60-90;          /* html: 200 × 80 at (-90, 160) */
  box-shadow:
    5pc 0#FAE29E,                /* 80px right: a yellow square, x = 110 to 190 */
    55ch 0,                      /* 440px right, green: cuts from x = 350 */
    7cm 0 0-32q,                 /* 264.57px right, 30.24px smaller: the gap */
    25pc -32q,                   /* 400px right, 30.24px up: cuts from x = 310 */
    75vw 0#EBF6F0;               /* 300px right: a white block, x = 210 to 410 */
  color: 4A9A86;                 /* the color of the three shadows that have none */
  * {                            /* inside html: body */
    margin: -100-380 50%380;     /* body: 200 × 80 at (290, 60) */
    scale: -1                    /* turned around its center: shadows go left and up */
```

## How it works

### 1. Two elements, one rule

There is no doctype: the page is in quirks mode. The style element is never closed, so everything after `<style>` is CSS.

`*` matches every element. Here that means html, head, the style element and body: the browser adds the missing ones. head and style are not displayed. The nested `*{…}` means `* *`: every element inside another one. That is body (and head and style again).

The two rules have the same specificity, and the nested one comes later. So body takes its margin from the nested rule. Everything else comes from the outer rule: the background, the five shadows and the color. html and body get the same shadow list.

### 2. html: a 200 × 80 box, mostly off the canvas

In quirks mode, a number with no unit counts as px in `margin`. A margin percentage is a share of the containing block's width, 400px: `40%` is 160px. The computed margin is `160px 290px 60px -90px`.

In quirks mode, html fills the window, minus its margins. It is 400 − 290 + 90 = 200 wide and 300 − 160 − 60 = 80 tall. getBoundingClientRect gives 200 × 80 at (−90, 160): the box runs from x = −90 to 110 and from y = 160 to 240. More than half of it is off the canvas, on the left.

html's background is painted on the whole canvas, whatever the size of its box. All 400 × 300 pixels start green.

### 3. A yellow square and a white block

A box-shadow is a copy of the box, moved by its offsets. It is never painted under the box itself.

- `5pc 0#FAE29E`: 5pc = 80px. The yellow copy runs from x = −10 to 190. html's own box covers it up to x = 110, so only the part from 110 to 190 shows: an 80 × 80 square, from y = 160 to 240.
- `75vw 0#EBF6F0`: 75vw = 300px. The white copy runs from x = 210 to 410, from y = 160 to 240. Its last 10px are off the canvas.

### 4. Three green shadows erase parts of the block

`color:4A9A86` sets the text color. Quirks mode accepts a hex color with no `#`. A shadow with no color of its own takes this color, so the three middle shadows are the background green.

Shadows are painted in reverse order: the first one in the list is on top. The white one is last, at the bottom, and the three green ones cover it:

- `55ch 0`: in the default font (16px Times in my Chrome), 1ch is 8px, so 55ch is 440px. The copy runs from x = 350 to 550. The lower bar ends at x = 350.
- `25pc -32q`: 25pc = 400px to the right, and 32q = 30.24px up. The copy runs from x = 310 to 510 and from y = 129.76 to 209.76. The upper bar ends at x = 310.
- `7cm 0 0-32q`: 7cm = 264.57px to the right, with a spread of −32q. A negative spread shrinks the copy by 30.24px on every side. It runs from x = 204.80 to 344.33 and from y = 190.24 to 209.76: the gap between the two bars.

What is left of the white block: a bar from x = 210 to 310 and y = 160 to 190.24, and a bar from x = 210 to 350 and y = 209.76 to 240. I checked each shadow by giving it a red color in turn and reading where the red shows.

### 5. body: html's box, turned around

body gets `margin:-100-380 50%380`. The bottom margin, 50%, is half of html's width: 100px. The computed margin is `-100px -380px 100px 380px`.

body starts from html's box: x = −90 + 380 = 290 and y = 160 − 100 = 60. Its width is 200 + 380 − 380 = 200. In quirks mode, body also fills html's height, minus its own margins: 80 + 100 − 100 = 80. getBoundingClientRect gives 200 × 80 at (290, 60).

This box is html's box turned around the center of the canvas, (200, 150): x = −90 to 110 becomes 290 to 490, and y = 160 to 240 becomes 60 to 140. body's green background is the canvas color, so it does not show.

### 6. scale:-1 sends body's shadows the other way

`scale:-1` multiplies both axes by −1, around body's center, (390, 100). The box stays where it is, but its shadows now go left and up. The same five shadows give:

- the yellow copy, from x = 210 to 410; body's box hides it from x = 290, so a square is left, from x = 210 to 290 and y = 60 to 140;
- the white block, from x = −10 to 190 and y = 60 to 140;
- `55ch 0`, from x = −150 to 50: the first bar starts at x = 50;
- `25pc -32q`, from x = −110 to 90 and y = 90.24 to 170.24: the second bar starts at x = 90;
- `7cm 0 0-32q`, from x = 55.67 to 195.20 and y = 90.24 to 109.76: the gap.

Everything body draws is what html draws, turned around (200, 150). Together, they make the whole target.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- One shadow list serves two elements. The outer `*` gives html and body the same 66-character `box-shadow`, and the same background and color. The nested `*{` costs 2 characters and only sets what differs: body's margin and the flip. A separate rule, `}body{`, gives the same picture in 164 characters. With `&` instead of the first `*` (same length), only html gets the shadows: body draws nothing, and 13,806 pixels change.
- `scale:-1` turns body around in 8 characters. `rotate:180deg` and `rotate:.5turn` give the same picture, in 166 characters. Without `;scale:-1` (152 characters), body's shadows go to the right, off the canvas: the whole upper half is missing, and 13,806 pixels change.
- `color:4A9A86` colors three shadows at once, with no `#` in quirks mode. Writing `#4A9A86` in each of the three shadows instead takes 169 characters. Without `color:4A9A86;` (148 characters), the three shadows take the default text color, black: 20,830 pixels change.
- Each offset uses a unit that is shorter than px: `5pc` for 80px, `55ch` for 440px, `25pc` for 400px, `75vw` for 300px. With px instead, the code is 162 characters each time, for the same picture.
- `7cm` is 264.57px, not a round number: the gap only has to reach the `25pc` shadow, which starts at x = 310. With 7cm, the gap ends at x = 344.33. `6cm` is just as short, but it is 226.77px: the gap ends at x = 306.53, a thin white line joins the two bars, in each half, and 230 pixels change.
- `32q` is 30.24px in 3 characters, where `30px` takes 4. The same value moves the `25pc` shadow up and shrinks the `7cm` one, so both end at y = 209.76, where the lower bar starts.
- Percentages need no space after them: `40%290` is 160px then 290px. Writing `160 290` takes one more character (162), for the same picture. Same with `50%380` and `100 380`. A minus sign needs no space either: `60-90`, `-100-380`, `0-32q`.
- Nothing is closed. Closing both rules and the style element with `}}</style>` takes 171 characters, 10 more, for the same picture.

## If you try it at home

In my Chrome, 412 pixels differ from the target by more than 8 on one channel. They are all on four rows: y = 90, 109, 190 and 209, along the edges of the bars that face the gaps. 32q is 30.24px, not 30, so the bars end at y = 90.24 and 190.24, and start at 109.76 and 209.76. In my render, these four rows are partly white, where the target has plain green. With `30px` in place of each `32q` (163 characters), my render matches the target pixel for pixel. The CSS Battle judge gives the code a 100% match.
