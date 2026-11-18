---
title: "The canvas between two shadows: two squares and a stepped band in 146 characters"
ref: 2026-05-23
permalink: /2026/05/23/the-canvas-between-two-shadows/
description: "How one shadow list, given to html and to body flipped by scale:-1, covers the top and the bottom of the canvas in blue and leaves a stepped navy band between them, in the May 23, 2026 CSS Battle target."
target: /assets/targets/2026-05-23.png
target_url: https://cssbattle.dev/play/zTrEUTEOdXmgNinBTKWy
colors: ["#060f55", "#84be8d", "#3157b4"]
player: fmata
chars: 146
score: 699.48
match: 100
code: |
  .<style>*{background:#060F55;color:3157B4;box-shadow:-5LH 0,0-233Q 0 2IN,inset 5PC 89Q#84BE8D;margin:36 190 36%90;*{margin:108-100-90%100;scale:-1
---

The May 23 target shows two light green squares on blue, one at the top left and one at the bottom right. A navy band crosses the canvas behind them, with a step in the middle. fmata does not draw the band. html and body get the same three shadows, and body is flipped. Two giant blue shadows cover the top and the bottom, and the navy canvas shows between them.

With **Wide view**, you can see the full size of the two giant shadows. With **Teaching colors**, each shadow gets its own color.

{% include animations/2026-05-23.html lang=page.lang %}

## The code, spaced out

```css
.<style>                         /* the dot is text: it opens body */
* {                              /* html, head, body, style */
  background: #060F55;           /* html's goes to the canvas */
  color: 3157B4;                 /* no hash: accepted in quirks mode */
  box-shadow:
    -5LH 0,                      /* a copy 90px to the left */
    0 -233Q 0 2IN,               /* spread 192px, moved up 220.16px */
    inset 5PC 89Q #84BE8D;       /* green, minus the corner the moved box covers */
  margin: 36 190 36% 90;         /* html: 120 × 120 at (90, 36) */
  * {                            /* head, body, style */
    margin: 108 -100 -90% 100;   /* body: 120 × 120 at (190, 144) */
    scale: -1                    /* a half turn around its center */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `190` in a margin is read in px.

The code starts with a dot. It is text, so the browser opens body and puts it there. The `<style>` comes next, inside body too. The page is html, an empty head, and body with the dot and the style.

`*` matches every element. The `*{` nested in it matches every element inside another one: head, body and style. head and style are not displayed, so the rules only draw on html and body. They are never closed: the end of the code closes them.

### 2. Two 120 × 120 boxes

html gets `margin:36 190 36%90`. A percentage margin is a share of the width, here the 400px of the page: 36% is 144. html is 400 − 190 − 90 = 120 wide, at x = 90. In quirks mode, html fills the height of the page minus its margins: 300 − 36 − 144 = 120. html is 120 × 120 at (90, 36).

body gets `margin:108-100-90%100`. −90% is a share of html's width: −108. In quirks mode, body fills html minus its own margins. It is 120 + 100 − 100 = 120 wide and 120 − 108 + 108 = 120 tall, at (90 + 100, 36 + 108) = (190, 144). body's center is at (250, 204).

### 3. A navy canvas

Every element gets `background:#060F55`. html's background is not painted in its box: it goes to the canvas, which turns navy everywhere. body paints its own box navy, on the navy canvas. Without the `background` declaration, all the navy turns white.

`color:3157B4` has no `#`. Quirks mode accepts a hex color without it, so the text color is #3157B4. The two outer shadows have no color of their own: they take this one.

### 4. A copy on the left

The first shadow is `-5LH 0`. 1lh is the line height. With the default 16px font and a normal line height, it is 18px in my Chrome, so the shadow is moved 90px to the left: a copy of html from x = 0 to 120, y = 36 to 156.

An outer shadow is never painted under its own box. The part from x = 90 to 120 is hidden, and a blue strip is left from x = 0 to 90.

### 5. A giant shadow

The second shadow is `0-233Q 0 2IN`: no x offset, a −233q = −220.16px y offset, no blur, and a spread of 2in = 192px. The spread grows the shadow by 192px on each side: 120 + 384 = 504 px wide, from x = −102 to 402, and from y = 36 − 192 = −156 to 348.

Moved up by 220.16px, it runs from y = −376.16 to 127.84. It covers the whole width of the canvas, from the top down to y = 127.84, except html's own box.

### 6. Green, minus a corner

The third shadow is `inset 5PC 89Q#84BE8D`: an inset shadow, moved by 5pc = 80px and 89q = 84.09px. An inset shadow fills the box, except where a copy of the box moved by the offset still covers it. The moved copy starts at (170, 120.09).

So the green fills html's box, except the corner from x = 170 to 210 and from y = 120.09 to 156. That corner shows the navy canvas.

### 7. body: the same drawing, flipped

body gets the same three shadows, and the nested rule adds `scale:-1`. A scale of −1 on both axes is a point reflection through the center of the box, (250, 204): the same as a half turn. Each point (x, y) goes to (500 − x, 408 − y).

Before the flip, body's copy sits on its left, from x = 100 to 190. After it, the strip is on the right: x = 310 to 400, y = 144 to 264. Before the flip, the giant shadow would cover the canvas down to y = 144 + 120 + 192 − 220.16 = 235.84. After it, it covers the bottom, from y = 408 − 235.84 = 172.16. The free corner goes to the top left of body: x = 190 to 230, y = 144 to 179.91. There, body's own navy background shows.

body is painted after html, on top of it, but their shapes only meet in navy corners.

### 8. The band is the canvas

Nothing covers the canvas between y = 127.84 and 172.16. That gap is the navy band. The two strips push it around:

- on the left, html's strip covers it down to y = 156: the band runs from y = 156 to 172.16, under html's green square;
- on the right, body's strip covers it from y = 144: the band runs from y = 127.84 to 144, above body's green square;
- in the middle, the two free corners join the two parts: html's, from x = 170 to 210 and y = 120.09 to 156, and body's, from x = 190 to 230 and y = 144 to 179.91. They make the step.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list for two boxes. `scale:-1` costs 9 characters with its `;`. Writing body's shadows out instead, `;box-shadow:5LH 0,0 233Q 0 2IN,inset -5PC -89Q#84BE8D`, gives the same squares and band in 190 characters. Only the dot moves: it stays at the top left of body, and 13 pixels change.
- `scale:-1` is the half turn in 8 characters. With `rotate:180deg` (151 characters), the picture is the same.
- The blue is written once. The outer shadows take the text color. Writing `#3157B4` in both shadows and dropping `color` (147 characters) gives the same shadows, but the dot turns black: 8 pixels change.
- No `#` before `3157B4`, thanks to quirks mode. With `color:#3157B4` (147 characters), the picture is the same.
- A `%` ends a number, so no space is needed after it. `36%90` is 144 then 90: with `144 90` (147 characters), the picture is the same. `-90%100` is −108 then 100: with `-108 100` (147 characters), the picture is the same.
- Short units: `5LH` is 90px, `2IN` 192px and `5PC` 80px. With `90px` (147 characters), `192px` (148) or `80px` (147), the picture is the same.
- The q unit fits 84.09px in `89Q`, 3 characters. With `84px` (147 characters), the picture is the same. `-233Q` is 5 characters. With `-220px` (147 characters), the giant shadows end on whole pixels, at y = 128 and 172. The rows y = 127 and y = 172 turn plain blue, and 380 pixels change.
- No spaces before `-233Q` or `#84BE8D`, or between the body margins. With them, `0 -233Q`, `89Q #84BE8D` and `108 -100 -90% 100`, the same picture takes 151 characters.
- The navy is free: html's background goes to the canvas. Without the `background` declaration (127 characters), the canvas is white and 9,100 pixels change.
- The dot opens body as text. Without it (145 characters), my Chrome lays the page out differently: html is 105 × 233.41, body is 105 × 111.91, and 6,126 pixels change. A plain space in its place (146 characters) does the same: the parser drops it, and the same 6,126 pixels change.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 797 pixels, with the same rule as in the golf notes. 383 of them are on the rows y = 127 and y = 172. The giant shadows end at y = 127.84 and 172.16, so these rows mix blue and navy, where the target is blue. With `-220px` in place of `-233Q` (147 characters), the edges land on whole pixels and 423 pixels are left. 6 more are the dot itself: a small blue dot at (307, 250), on the lower green square, that the target doesn't have. With a no-break space in place of the dot, it is gone. All the other pixels sit within 6 pixels of an edge: the target is a JPEG, with compression noise around the shapes. The CSS Battle judge gives the official code a 100% match.
