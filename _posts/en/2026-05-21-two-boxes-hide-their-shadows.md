---
title: "Two boxes hide their shadows: a staircase in 110 characters"
ref: 2026-05-21
permalink: /2026/05/21/two-boxes-hide-their-shadows/
description: "How html and body share one list of two shadows, and how each box hides the part of its shadows that falls under it, leaving a beige staircase and a red-brown L, in the May 21, 2026 CSS Battle target."
target: /assets/targets/2026-05-21.png
target_url: https://cssbattle.dev/play/ZMNdZsYU66TPkF9CTgqD
colors: ["#32360e", "#e8ad6d", "#a84a4b"]
player: emohdaziz
chars: 110
score: 740.2
match: 100
code: |
  <style>*{background:#32360e;margin:-30 35%90 20;box-shadow:127q 127q 0-63q#a84a4b,60px 60px#e8ad6d;*{margin:60
---

The May 21 target is a beige staircase of four steps on very dark green, with a red-brown L in the bottom right corner. Mohamed Ali uses two boxes, html and body, and one list of two shadows that both of them get. An outer shadow is never painted under its own box. So each box cuts an L out of its beige shadow, and html also cuts an L out of its red one.

With **Teaching colors**, each box and each shadow gets its own color. **Wide view** shows the top of html's box, above the canvas.

{% include animations/2026-05-21.html lang=page.lang %}

## The code, spaced out

```css
<style>                     /* goes into head */
* {                         /* html, head, style, body */
  background: #32360e;      /* html's goes to the canvas */
  margin: -30 35% 90 20;    /* html: 240 × 240 at (20, −30) */
  box-shadow:
    127q 127q 0 -63q #a84a4b,  /* 120px away, 59.53px smaller per side */
    60px 60px #e8ad6d;      /* 60px away, same size */
  * {                       /* head, style, body */
    margin: 60              /* body: 120 × 120 at (80, 30) */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `60` in a margin is read in px.

The `<style>` goes into head, and body stays empty. `*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body. head and style are not displayed. Two boxes are left: html and body. The rules are never closed: the end of the code closes them.

The first level gives both boxes the same background and the same two shadows. The second level only replaces body's margin.

### 2. A very dark green canvas

html's background is not painted in its box: it goes to the canvas, which turns very dark green everywhere. body paints its own box in the same green, so it can't be seen. Without the `background` declaration (91 characters), the green turns white: 84,000 pixels change.

### 3. html: a 240 square

html gets `margin:-30 35%90 20`. A percentage margin is taken from the width of the containing block, even on the top and bottom: 35% of 400 is 140px. html is 400 − 140 − 20 = 240 wide, from x = 20 to 260.

In quirks mode, html fills the height of the page minus its margins: 300 − (−30) − 90 = 240. html is a 240 square at (20, −30). Its top 30px stick out above the canvas.

### 4. html's beige shadow

`60px 60px#e8ad6d` copies html's box, moved 60px right and 60px down: a 240 square from (80, 30) to (320, 270).

An outer shadow is only painted outside its own box. html's box covers everything left of x = 260 and above y = 210. What is left of the beige square is an L: a column from x = 260 to 320 (y = 30 to 270), and a band from y = 210 to 270 (x = 80 to 260).

### 5. html's red shadow

`127q` is 127 quarter-millimeters: 31.75 mm, which is exactly 1.25in, so 120px. The spread `-63q` is −59.53px: it shrinks the square by that much on each side. 240 − 2 × 59.53 = 120.94. The red square runs from 199.53 to 320.47, on both axes.

The red shadow comes first in the list, so it is painted above the beige one. html's box cuts it too. A red-brown L is left: x = 260 to 320.47 from y = 149.53, and y = 210 to 270.47 from x = 199.53.

### 6. body: the same shadows, one size smaller

body gets `margin:60`. In quirks mode it fills html minus its margins: 240 − 120 = 120 both ways. body is a 120 square at (80, 30).

The beige shadow is a 120 square at (140, 90). body's box covers its top left part. The rest makes two more steps: x = 200 to 260 on y = 90 to 150, and x = 140 to 260 on y = 150 to 210. Without body's shadows (`;box-shadow:none` added, 126 characters), these two steps disappear: 10,800 pixels change.

The red shadow shrinks by 59.53px on each side of a 120px box: 120 − 119.06 = 0.945px. In quarter-millimeters, that is 127q − 2 × 63q = 1q. It is a dot from (259.53, 209.53) to (260.47, 210.47), above everything else. Only a quarter of it lands on beige, in the pixel (259, 209), and tints it. With only the beige shadow on body (`;box-shadow:60px 60px#e8ad6d` added, 138 characters), that one pixel changes and nothing else.

### 7. The staircase

The two beige Ls fit together into four steps of 60px: the top step at x = 260, then 200, 140 and 80, every 60px down from y = 30. The red-brown L fills the bottom right corner.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list, two boxes. The `*` rule gives the list to html and body, and each box cuts its own copy. The nested `*{margin:60` only changes body's margin.
- Nesting saves a selector. With a separate rule, `}* *{margin:60` (112 characters), the picture is the same.
- `127q` is exactly 120px in 4 characters. With `120px 120px` (112 characters), the picture is the same.
- `-63q` is 4 characters, `-60px` is 5. The red square comes out 0.94px wider than 120px. With `0-60px` (111 characters), its four edges land on whole pixels, and body's red dot shrinks to nothing: 364 pixels change, 363 on these edges and the pixel (259, 209).
- The blur `0` has to be there, so the next length is read as the spread. `0-63q` needs no space: the minus sign starts a new number.
- No space before a `#`. With `0-63q #a84a4b` and `60px #e8ad6d` (112 characters), the picture is the same.
- `35%90` needs no space after the `%`. With `140 90` in place of `35%90` (111 characters), the picture is the same.
- Bare numbers, thanks to quirks mode. With `-30px 35% 90px 20px` and `60px` (119 characters), the picture is the same. With a doctype in front (125 characters), my Chrome drops both margin declarations and html no longer fills the height: 38,003 pixels change.

## If you try it at home

The target image is a JPEG. In my Chrome, my render of the official code differs from it on 1,865 pixels, with the rule of the golf notes. 363 of them are on the four edges of the red square: the columns x = 199 and x = 320 and the rows y = 149 and y = 270. These edges fall at 199.53, 320.47, 149.53 and 270.47, so these pixels mix red with beige or green, where the target is sharp. With `0-60px` in place of `0-63q` (111 characters), these edges land on whole pixels and 1,509 pixels are left. All of those sit within 6 pixels of an edge: compression noise around the shapes. The CSS Battle judge gives the official code a 100% match.
