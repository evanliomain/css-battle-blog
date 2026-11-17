---
title: "A blue copy on top: an 11 in 124 characters"
ref: 2026-07-11
permalink: /2026/07/11/a-blue-copy-on-top/
description: "How html and body get the same three box shadows from one rule, how two green shadows draw a 1 with serifs around an empty box, how a third shadow in the canvas color hides what sticks out, and how a 130px margin on body draws the second 1, in the July 11, 2026 CSS Battle target."
target: /assets/targets/2026-07-11.png
target_url: https://cssbattle.dev/play/Ittib3FggGhUuZ2rdNS9
colors: ["#3157b4", "#84be8d"]
player: emohdaziz
chars: 124
score: 722.68
match: 100
code: |
  <style>*{margin:90 40%50;background:#3157b4;color:84BE8D;box-shadow:138q 0#3157b4,53q -5ch,69q 27q 0 5q;*{margin:0 130 0-130
---

The July 11 target shows two soft green 1s side by side on a blue background, with serifs at the bottom: it reads 11. Mohamed Ali draws them with one list of three box shadows, given to both html and body. Two green shadows make a 1 around the element's empty box. The third one is a blue copy, in the canvas color: it is first in the list, so it is painted on top, and it hides the part that sticks out.

Turn on **Teaching colors** to see the blue copies, in yellow.

{% include animations/2026-07-11.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                            /* html, body and the rest */
  margin: 90 40%50;            /* html: 90 top, 160 left and right, 50 bottom */
  background: #3157b4;         /* blue, sent to the canvas by html */
  color: 84BE8D;               /* green, for the shadows with no color */
  box-shadow:
    138q 0#3157b4,             /* 130.39, 0, blue: hides the extra part */
    53q -5ch,                  /* 50.08, −40: top of the 1 */
    69q 27q 0 5q;              /* 65.2, 25.51, spread 4.72: bottom of the 1 */
  * {                          /* body */
    margin: 0 130 0-130        /* 130 further left, same width */
```

## How it works

### 1. One rule for html and body

There is no doctype: the page is in quirks mode. The `*` selects every element, and html and body are the only two displayed. Both get the margins, the blue background, the green color and the three shadows. Only body's margins change, in the nested rule.

html takes `margin:90 40%50`: 90 on top, 40% on the left and right, 50 at the bottom. A percentage margin counts from the width of the containing block, here the 400px canvas: 40% is 160px. html is 400 − 160 − 160 = 80 wide. In quirks mode, it takes the canvas height minus its margins: 300 − 90 − 50 = 160. getBoundingClientRect gives (160, 90), 80 × 160.

html is the root element, so its blue background is painted on the whole canvas. The box itself paints nothing. But a box shadow is only painted outside its element's border box: inside html's box, the canvas always shows.

### 2. Two green shadows: a 1

Quirks mode reads `84BE8D` as a hex color without its `#`. The last two shadows have no color, so they use `color`: green.

- `53q -5ch`: 53q is 50.08px. 1ch is 8px with the default font of my Chrome (Times, 16px), so −5ch is −40px. The shadow goes from (210.08, 50) to (290.08, 210). Above html's box, from y = 50 to 90, it is the top serif. Right of html's box, from x = 240, it is the stem down to y = 210.
- `69q 27q 0 5q`: offset 65.2 and 25.51, no blur, spread 5q = 4.72px on every side. The shadow is 89.45 × 169.45, from (220.47, 110.79) to (309.92, 280.24). Below html's box, from y = 250, it is the bottom serif. Between x = 240 and 290, it carries the stem down to y = 250.

The second shadow is wider than the stem. Above y = 250, it sticks out right of the stem, from x = 290 to 309.92.

### 3. A blue copy on top

`138q 0#3157b4` is a copy of html moved 130.39px right, in the canvas blue. It goes from (290.39, 90) to (370.39, 250). The first shadow in the list is painted on top, so it covers the green. It hides the extra part of the second shadow from y = 110.79 to 250. It stops at y = 250, the bottom of html's box: the bottom serif stays whole. Everywhere else it is blue on blue, and it does not show.

Without it (110 characters), 5,760 pixels change. A green column about 20px wide shows right of each stem, from y = 110 to 250, and the column x = 240 changes too (see section 4). Moved to the end of the list (124 characters), the blue copy is painted under the green ones: 5,600 pixels change, and the two green columns come back.

### 4. body: the same 1, 130px further left

The nested `*` rule is read as `* *`: every element inside an element. body is the only one displayed. It comes after the outer rule, with the same specificity, so its margins win: 0 on top and bottom, 130 on the right, −130 on the left. They count from html's box. body starts at x = 160 − 130 = 30 and ends at 240 − 130 = 110: it stays 80 wide. In quirks mode, body stretches to html's height, 160. getBoundingClientRect gives (30, 90), 80 × 160.

body has the same three shadows, so it draws the same 1, 130px further left: top serif from x = 80.08 to 160.08, stem from 110 to 160.39, bottom serif from 90.47 to 179.92. body's blue copy goes from x = 160.39 to 240.39: it falls inside html's box, which is empty. It hides the extra part of the second 1 and nothing else, except the first 0.39px of the right stem, which now starts at x = 240.39. body's blue background is blue on blue.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `*` rule gives the margins, the blue, the green and the three shadows to both boxes. Only body's margins need a rule of their own. Nested, it costs `;*{` and needs no closing brace. `}body{margin:0 130 0-130` gives the same picture in 127 characters.
- `40%50`: 40% is 160px of the 400px canvas, and the `%` ends the value, so `50` needs no space. `160 50` gives the same picture in 125.
- `color:84BE8D` has no `#`. `#84BE8D` gives the same picture in 125. Setting `color` once serves both green shadows: writing `#84BE8D` after each of them instead also gives the same picture in 125.
- The blue copy is the eraser: the canvas color, first in the list. It needs no extra element, since html and body already have their shadow lists.
- `138q` is 130.39px in 4 characters. `130px` (125 characters) changes 440 pixels, only in the columns x = 160, 240 and 290: the edges the blue copies draw move by 0.39px.
- `53q` is 50.08px in 3 characters. `50px` (125 characters) changes 80 pixels, in the columns x = 80 and 210, the left edges of the top serifs.
- `69q 27q 0 5q` is 65.2, 25.51 and 4.72px. `65px 25px 0 5px` (127 characters) changes 302 pixels, along the left, right and bottom edges of the bottom serifs (x = 90, 179, 220, 309 and y = 280).
- `-5ch` is −40px in 4 characters. `-40px` gives the same picture in 125.
- `0#3157b4` and `0-130`: the `#` and the minus sign start a new value, so no space is needed. `0 #3157b4` and `0 -130` give the same picture in 126.
- Nothing is closed. `}}</style>` at the end takes 134 characters, for the same picture.

## If you try it at home

In my Chrome, the official code does not match the target pixel for pixel. test.sh finds 2,432 wrong pixels. 811 of them sit on edges that fall between two pixels: x = 160, 240 and 290 (the 0.39 of `138q`), y = 280 (the 0.24 of 280.24), and a few more. In the target, every edge sits on a whole pixel. With whole pixel values, `130px 0#3157b4,50px -40px,65px 25px 0 5px` (130 characters), every edge lands on the target's: 820 pixels change compared with the official code, all on those edges.

The other differences are small. The target file is a JPEG: its flat colors are #3057b4 and #84be8c, one step away from the code's, and its edges and corners carry compression noise. test.sh counts that noise too: the whole pixel version still gets 1,658 wrong pixels. The CSS Battle judge gives the official code a 100% match.
