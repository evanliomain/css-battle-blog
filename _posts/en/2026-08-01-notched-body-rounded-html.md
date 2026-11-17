---
title: "Notched body, rounded html: a leaf in 117 characters"
ref: 2026-08-01
permalink: /2026/08/01/notched-body-rounded-html/
description: "How one rule gives html and body the same thick border and round corners for the August 1, 2026 CSS Battle target, and how corner-shape:notch turns body into two overlapping squares."
target: /assets/targets/2026-08-01.png
target_url: https://cssbattle.dev/play/Zbbue9b0vZdg6WFTCh4C
colors: ["#065840", "#c3c3a8"]
player: emohdaziz
chars: 117
score: 731.15
match: 100
code: |
  <style>*{background:#065840;border:70Q solid#C3C3A8;border-radius:0 53Q;margin:76 126;*{margin:-76;corner-shape:notch
---

The August 1 target is a cream shape on a dark green background: two overlapping squares, one up and to the left, one down and to the right, with a rounded piece in each of the two steps between them. It looks like a leaf. Mohamed Ali gives html and body the same 66px border and the same two round corners in one rule. Then `corner-shape:notch` turns body's round corners into square cuts, and html's round corners show in those cuts.

Use **Teaching colors** to see html's border and body's border apart, and body's background before the notches hide it.

{% include animations/2026-08-01.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                           /* every element: html and body are the displayed ones */
  background: #065840;        /* html's green covers the canvas; body's stays under its border */
  border: 70Q solid#C3C3A8;   /* 66.14px, drawn 66px */
  border-radius: 0 53Q;       /* top-right and bottom-left corners: 50.08px */
  margin: 76 126;             /* html: a 148 × 148 square at (126, 76) */
  * {                         /* html's descendants: body is the visible one */
    margin: -76;              /* body: 168 × 168 at (116, 66) */
    corner-shape: notch       /* body's two round corners become square cuts */
```

## How it works

### 1. One rule for every element

`*` targets every element of the page: html, head, style and body. head and style are not displayed, so the rule shows on two boxes, html and body. They get the same background, the same border and the same corners.

The nested `*{` only targets html's descendants. Of those, body is the only box on screen. It gets its own margin and the corner shape.

### 2. html is a 148 × 148 square

There is no doctype, so the page is in quirks mode, and `76 126` is read as px. In quirks mode, html fills the 400 × 300 page, minus its margins:

- width: 400 − 2 × 126 = 148, from x = 126 to 274;
- height: 300 − 2 × 76 = 148, from y = 76 to 224.

html's background, `#065840`, is painted on the whole canvas: the root's background always is.

### 3. A 66px border and two round corners

`70Q` is 70 quarter millimeters. 1Q = 0.945px, so that is 66.14px. Chrome draws the border 66px wide: `66px` in its place gives the same picture. That leaves html a content box of 148 − 2 × 66 = 16 on a side, at (192, 142).

`border-radius:0 53Q` has two values. The first one is for the top-left and bottom-right corners: 0, square. The second one is for the top-right and bottom-left corners: 53 × 0.945 = 50.08px. The border is thicker than the radius, so the inside corners of the ring stay square.

### 4. body is a 168 × 168 square

body sits in html's content box, 16 × 16 at (192, 142). `margin:-76` pulls it out by 76px on every side: 16 + 2 × 76 = 168 on a side, from (116, 66) to (284, 234). That is html's box with 10px more on every side.

body has the same 66px border and the same two round corners. Without the next declaration, its border would leave a 36 × 36 hole in the middle, at (182, 132), where body's own green background shows.

### 5. Two notches fill body

`corner-shape:notch` changes how the rounded corners are drawn. A 50.08px round corner becomes a square cut, 50.08px on a side. body is then a 168px square without its top-right and bottom-left corners. That is two squares, 117.92px on a side, offset by 50.08px: one from (116, 66) to (233.92, 183.92), the other from (166.08, 116.08) to (284, 234).

With `corner-shape`, Chrome draws the inner edge of the border as the outer shape shrunk by the border width. Move the top-right cut 66px inward, and it removes everything right of x = 167.92 and above y = 182.08. That already covers the whole 36 × 36 inside. Nothing is left inside the border, so the border fills all of body. body's green background is still there, under the border, but it never shows.

### 6. html's corners fill the steps

`corner-shape` is only in the nested rule, so html keeps its round corners. html is under body, and 10px smaller on every side. In each cut of body, a piece of html's round corner shows:

- top right: from (234, 77) on the left edge of the cut to (273, 116) on its bottom edge;
- bottom left: from (127, 184) on the top edge of the cut to (166, 223) on its right edge.

Those two pieces are the rounded parts of the leaf.

## Golf notes

- One `*` rule styles html and body together: the background, the border and the corners are written once. The nested `*{` is 2 characters. `body{` in its place gives the same picture, 3 characters more. With `}*{` instead of `;*{`, the same length, html gets `margin:-76` and the notches too, and 27,244 pixels change.
- `70Q` is 3 characters for a border Chrome draws 66px wide. `66px` gives the same picture with 4. A bare `66` does not work in the `border` shorthand: Chrome drops the whole declaration, and 25,414 pixels change.
- `53Q` is 50.08px in 3 characters. `50px` is 4 characters, and it moves html's two arcs a little: 32 pixels change.
- `border-radius:0 53Q` sets the four corners with two values: the two square ones, then the two round ones.
- In `solid#C3C3A8`, the `#` starts a new value, so no space is needed before it.
- `margin` takes bare numbers in quirks mode: `76 126` and `-76` need no unit.
- `corner-shape` sits in the nested rule on purpose. Moved into the outer rule, after `margin:76 126` (the same length), it notches html too: the two rounded pieces disappear and 2,190 pixels change. Without `corner-shape` at all, body keeps its round corners and its 36 × 36 hole, and 3,215 pixels change.
- Nothing is closed: both `*{` stay open, and there is no `</style>`. With `}}` at the end, the code is 119 characters and the picture is the same.

## If you try it at home

In my Chrome, 698 pixels differ from the target by more than 8 on one channel. All of them are within 6 pixels of an edge of the shape, and the edges are in the same places. Along every edge, the target's pixels vary in color: at y = 70, around the left edge at x = 116, the target has (4, 82, 56), (0, 92, 55), (199, 191, 172) and (191, 192, 160), where my render has flat (6, 88, 64) and (195, 195, 168). Away from the edges, the colors differ by 1 at most. The CSS Battle judge gives the code a 100% match.
