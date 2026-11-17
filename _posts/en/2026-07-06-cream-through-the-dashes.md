---
title: "Cream through the dashes: a pixel monster in 105 characters"
ref: 2026-07-06
permalink: /2026/07/06/cream-through-the-dashes/
description: "How one 31ex dashed border, thick on html and thin on body and p because ex follows the font, lets a cream background show through its gaps as a blocky monster, in the July 6, 2026 CSS Battle target."
target: /assets/targets/2026-07-06.png
target_url: https://cssbattle.dev/play/31jQ9hSUF6QsJx0qO66P
colors: ["#998235", "#f3ead2"]
player: emohdaziz
chars: 105
score: 747.04
match: 100
code: |
  <p>.<style>&{margin:-157-197}*{border:31ex dashed#998235;+*{margin:-80 0;background:#f3ead2;font:3Q/40vw"
---

The July 6 target is a blocky cream monster on an olive background: a wide body with stepped sides and a small square at each corner. Mohamed Ali draws no shape at all. The canvas is cream, and three olive dashed borders cover it. The cream only shows in their gaps. All three borders are `31ex`, and ex follows the font: a tiny font on body and p makes the same border 40px there, while html's is 227px.

Turn on **Teaching colors** to tell the three borders apart, and **Wide view** to see html's solid frame around the canvas.

{% include animations/2026-07-06.html lang=page.lang %}

## The code, spaced out

```css
<p>.                           /* opens body and a p; the dot gives p a line */
<style>
& {                            /* html */
  margin: -157-197             /* 794 × 614 at (−197, −157) */
}
* {                            /* html, head, body, p, style */
  border: 31ex dashed#998235;  /* 227px on html, 40px on body and p (target) */
  +* {                         /* * + *: body, right after head */
    margin: -80 0;             /* 80px up: 340 × 320 at (30, −10) */
    background: #f3ead2;       /* cream, on the whole canvas */
    font: 3Q/40vw"             /* 2.83px font, 160px lines, empty family */
```

## How it works

### 1. Five elements

There is no doctype: the page is in quirks mode, and numbers with no unit are px in `margin`. `<p>` opens head and body on its own, then a p inside body. The `.` is text in p, and the style ends up in p too. So the page has html, head, body, p and style. head and the style are not displayed.

A lone `&`, outside any rule, selects the root: html. `*` selects all five. The nested `+*` means `* + *`: an element right after another element. html has no sibling, head comes first, p is body's first child, and the style only follows the text `.`. So `+*` selects body alone. getComputedStyle agrees: only body gets the −80px margin and the cream.

### 2. html, a solid frame

`margin:-157-197` pulls html 157px up and 197px left, and as much on the other side. It is 400 + 394 = 794px wide. In quirks mode, html fills the height of the window minus its margins: 300 + 314 = 614px. getBoundingClientRect gives (−197, −157), 794 × 614.

Its border is `31ex` dashed olive. An ex is the height of an x in the element's font. html keeps the default 16px font. The target fits a 227px border: html's inside then starts at −197 + 227 = 30, and at −157 + 227 = 70.

The border is dashed, but Chrome draws it solid. I checked all 433,116 pixels of a 794 × 614 box with a 227px dashed border: all painted. In my Chrome, a 227px dashed side gets its first gap somewhere between 900 and 1,000px long. html's sides are 794 and 614px.

What is left is a window of 340 × 160, from x = 30 to 370 and y = 70 to 230. Every cream pixel of the target is inside it.

### 3. The cream is body's background

body's background is cream. html has none, so body's background paints the whole canvas. Outside the window, html's frame covers it. Inside, it shows wherever body's and p's dashes leave a gap.

### 4. One border, two widths

body's `font:3Q/40vw"` sets a 3Q font: 3 quarter-millimeters, 2.83px. The same `31ex` is now much smaller. The target fits 40px on body. p inherits body's font, so its `31ex` border is 40px too.

The font shorthand needs a family. The `"` at the end opens a string that the end of the file closes: an empty family name, in 1 character.

### 5. body's dashes: the four squares

`margin:-80 0` pulls body 80px up, into html's border. body is as wide as html's window: 340px, from x = 30. In quirks mode, body fills html's inside minus its margins: 160 + 80 + 80 = 320px. It runs from y = −10 to 310.

I measured Chrome's dashes on a 340 × 320 box with a 40px dashed border:

- left and right sides, 320px: dash 80, gap 40, dash 80, gap 40, dash 80. The gaps are from y = 70 to 110 and from 190 to 230;
- top and bottom, 340px: dash 80, gap 50, dash 80, gap 50, dash 80. They lie from y = −10 to 30 and 270 to 310, on html's frame.

On the sides, from x = 30 to 70 and from 330 to 370, the two gaps fall right at the top and the bottom of the window. They are the four 40 × 40 corner squares.

### 6. p's dashes: the middle row

p is body's content: 340 − 80 = 260px wide, at x = 70. `/40vw` sets the line height: 40% of 400 = 160px. The `.` gives p one line of 160px. With its borders, p is 160 + 80 = 240px tall. Its default top margin, 1em = 2.83px, does not show: in my Chrome, p starts right at the top of body's content, at y = 30 in the target's geometry.

On a 260 × 240 box with a 40px dashed border, Chrome draws:

- left and right sides, 240px: dash 80, gap 80, dash 80. The gap is from y = 110 to 190;
- top and bottom, 260px: dash 80, gap 10, dash 80, gap 10, dash 80. They lie from y = 30 to 70 and 230 to 270, on html's frame.

On the sides, from x = 70 to 110 and from 290 to 330, the dashes cover the top and the bottom of the window, and the gap opens the middle row. Inside p's borders, from x = 110 to 290, nothing covers the cream: the tall middle part.

### 7. Only the gaps matter

No dash of body overlaps a dash of p. In each gap, what shows is what lies below: html's olive frame outside the window, the cream canvas inside it. Row y = 150 of the target is olive up to x = 69, cream from 70 to 329, olive from 330. Row y = 90 is cream from 30 to 69, olive from 70 to 109, cream from 110 to 289, olive from 290 to 329 and cream from 330 to 369.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- One border for three boxes. Since ex follows the font, the 3Q font makes the same `31ex` thin on body and p. Written in px, with `40px` for all and `border-width:227px` on html, the code takes 126 characters. In my Chrome, that version matches the target except one pixel (see below).
- `font:3Q/40vw"` sets the size that shrinks ex and the line height that makes p tall, in one declaration.
- The family cannot be left out. With `font:3Q/40vw` (104 characters), my Chrome drops the whole declaration: body and p keep the 16px font. The unclosed `"` costs 1 character. With `""`, the code takes 106 characters, for the same picture.
- `40vw` is 160px in 4 characters. `160px` gives the same picture in 106.
- The `.` gives p its line. I tried removing it on the px version (126 characters, see above): p shrinks to its borders, 80px tall, and 9,601 pixels change. Its bottom dashes land in the window as an olive bar from y = 70 to 110, with two thin cream slits, and the bottom row turns cream from x = 30 to 370.
- `+*` nested inside `*` saves 1 character: `*{…}*+*{…` gives the same picture in 106.
- `&` selects html in 1 character. `html` gives the same picture in 108.
- No spaces in `-157-197` and `dashed#998235`. Each space added gives 106 characters, for the same picture.
- Nothing is closed. `""}}</style>` at the end gives 116 characters, for the same picture.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 11,153 pixels, with the same rule as in the golf notes. getBoundingClientRect shows the boxes are off: `31ex` is 222px on html and 39px on body and p, not 227px and 40px. html's window is 350 × 170 at (25, 65), the squares and the middle part move, and thin cream lines show between them. With the widths written in px (227px on html, 40px on body and p), my render differs from the target on a single pixel, at (110, 149), where the `.` leaves a faint dot. The CSS Battle judge gives the official code a 100% match.
