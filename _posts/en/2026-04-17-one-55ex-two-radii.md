---
title: "One 55ex, two radii: a figure six in 110 characters"
ref: 2026-04-17
permalink: /2026/04/17/one-55ex-two-radii/
description: "How one fixed radial gradient on html and body paints an olive disc, and how the same 55ex lands far off the canvas for html but cuts body's corners with its 4q font, in the April 17, 2026 CSS Battle target."
target: /assets/targets/2026-04-17.png
target_url: https://cssbattle.dev/play/0K98TK8pCxfEqKm5JWpl
colors: ["#b5bd49", "#3f4869"]
player: emohdaziz
chars: 110
score: 740.2
match: 100
code: |
  <style>*{background:radial-gradient(1Q,#b5bd49,53Q,#3f4869 0 55ex,#B5BD49)fixed;*{margin:35 45%139 85;font:4q"
---

The April 17 target is an olive disc on a dark blue-gray background, with an olive quarter ring and a square corner above it on the left: it looks like a figure six. Mohamed Ali writes one radial gradient and gives it to html and body. Its blue ring ends at `55ex`, and ex follows the font: with html's 16px font, the ring ends far off the canvas; with body's 4q font, it ends inside body's box, and the olive past it fills body's corners.

With **Wide view**, html's 55ex shows its real size. With **Teaching colors**, body's gradient gets its own colors.

{% include animations/2026-04-17.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                 /* html, head, body, style */
  background: radial-gradient(
    1Q,                             /* a circle with a 0.945px ray */
    #b5bd49,                        /* olive from the center */
    53Q,                            /* a hint: the change to blue happens at 50.08px */
    #3f4869 0 55ex,                 /* blue: 0 moves up to 53Q; it ends at 55ex */
    #B5BD49                         /* 100% = 1Q, moved up to 55ex: olive from there on */
  )fixed;                           /* both gradients centered on the viewport, (200, 150) */
  * {                               /* head, body, style */
    margin: 35 45%139 85;           /* body: 135 × 126 at (85, 35) */
    font: 4q"                       /* 3.78px font: a much shorter 55ex */
    /* the end of the code closes the string and both rules */
```

## How it works

### 1. Two boxes

CSS Battle pages have no doctype, so they are in quirks mode, where unitless lengths in margins count as pixels.

The page has html, head, body and the style element, inside head. The top-level `*` matches all four. The nested `*{` means `* *`: any element inside another one, so head, body and style. head and style are not displayed. Two boxes show: html, which gets the background but no margin and keeps the browser's 16px font, and body, which gets the background, the margin and the 4q font.

### 2. body: 135 × 126

`margin:35 45%139 85` is 35 on top, 45% on the right, 139 at the bottom and 85 on the left. A percentage margin is a share of the width: 45% of 400 is 180. body runs from x = 85 to 400 − 180 = 220, 135px wide.

In quirks mode, body stretches to the height of the viewport, minus its margins: 300 − 35 − 139 = 126. It runs from y = 35 to 161. getBoundingClientRect gives 85, 35, 135 × 126.

### 3. A circle with a 1Q ray

`radial-gradient(1Q, …)` starts with a single length: the gradient is a circle, and its ray is 1Q long. 1Q is a quarter of a millimeter, 0.945px.

The color stops are distances from the center, and they can go past the end of the ray:

- `#b5bd49` has no position: the first color starts at 0.
- `53Q` alone is a hint: the middle of the change from the color before it to the color after it.
- `#3f4869 0 55ex` asks for blue from 0 to 55ex. A stop can't come before a stop or hint before it, so 0 moves up to 53Q, 50.08px.

The change from olive to blue starts at 0, ends at 53Q, and has its middle at 53Q too: olive all the way, then blue at once. A hard edge at 50.08px: the disc. With `#b5bd49 53Q,` instead of `#b5bd49,53Q,`, the same length, the picture is the same.

### 4. The last color: 55ex

`#B5BD49` has no position. The last color goes at 100%, the end of the ray: 1Q. That is before 55ex, so it moves up to 55ex too. Blue ends at 55ex and olive starts at the same place: another hard edge. Past the last stop, the last color goes on forever.

So the gradient is an olive disc of radius 50.08px, a blue ring up to 55ex, and olive everywhere past it.

### 5. html: 55ex is off the canvas

html's background is the root's background: it is painted on the whole canvas. ex is a length that follows the element's font. html keeps the browser's 16px font, and getComputedStyle gives its gradient a blue ring up to 394.883px in my Chrome.

The canvas corners are √(200² + 150²) = 250px from the center. html's outer olive never reaches the canvas: it only shows the olive disc on blue.

### 6. body: 55ex is inside its box

`font:4q"` gives body a 4q font: 1mm, 3.78px. The same 55ex is much shorter there: 93.044px in my Chrome. The target puts that edge 95px from the center: on row y = 150, its olive ends at x = 104, and on column x = 200, at y = 54.

body only paints its own box. Inside it, from the center out: the part of the disc that body covers (x from 150 to 220, y from 100 to 161), the blue ring, and olive past the ring's outer edge, along body's top and left sides. That olive is the quarter ring, the square corner and the stroke going down on the left. The bottom of body's box, at y = 161, ends the stroke.

### 7. `fixed`: one center

`fixed` is `background-attachment`. A fixed background is placed on the viewport, not on its own box. Both gradients are centered at (200, 150). body's part of the disc falls exactly on html's disc, in the same color, and its blue ring on html's blue: the only thing body changes is its corners.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `background` for two elements. ex gives it two sizes: far off the canvas for html, inside body's box for body. `95px` is as short as `55ex`, but px is the same for every element. With `95px` (110 characters), html's olive also starts 95px from the center: the canvas turns olive around a blue ring, and 85,215 pixels change.
- `1Q` is the ray of the circle. It must end before 55ex, so that the last color moves up to 55ex. With `circle` (114 characters), the ray goes to the farthest corner of the viewport, 250px away. The last olive moves out to 250px, blue fades into olive from 55ex to there, and body's corners are a mix: (115, 123, 91) at (85, 35). 7,119 pixels change. Without a size, `radial-gradient(#b5bd49,…` (107 characters), the gradient is an ellipse: the disc is 100px wide and 75px tall, and 10,010 pixels change. With `1px` (111 characters), the picture is the same. With `0` (109 characters), my Chrome paints the whole canvas olive: 105,005 pixels change.
- `fixed` is 5 characters. Without it (105 characters), body's gradient is centered on its own box, at (152.5, 98): a second disc there, and 11,496 pixels change. `)fixed` needs no space: with `) fixed` (111 characters), the picture is the same.
- 45% is 180px, as long as `180`, but `%` ends the number: `45%139` needs no space. With `35 180 139 85` (111 characters), the picture is the same.
- Quirks mode takes unitless numbers in margins. With `35px 45%139px 85px` (116 characters), the picture is the same.
- `font:4q"` is 8 characters, `font-size:4q` 12. With `font-size:4q` (114 characters), the picture is the same. The `font` shorthand needs a family: here `""`, an empty string, and the end of the code closes it, so one quote is enough. With `font:4q""` (111 characters), the picture is the same. `font:4q` alone (109 characters) is dropped: getComputedStyle gives body a 16px font, its 55ex is 394.883px too, body's corners stay blue, and 7,119 pixels change.
- The code ends inside the string and two rules: the end of the code closes them. With `font:4q""}}` (113 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes as the target, with the same flat colors: (181, 189, 73) and (63, 72, 105). 578 pixels differ by more than 8 levels: 429 on the outer edge of the blue ring, 149 on the edge of the disc. My render has 2 colors and the target 36: the target's curves are anti-aliased, mine are not. The ring's outer edge is also in a different place. My Chrome computes body's 55ex as 93.044px: on row y = 150, my olive ends at x = 106, two pixels right of the target's, and on column x = 200 at y = 56, two pixels below. When I close the string and the rules and add `body{background:radial-gradient(1Q,#b5bd49,53Q,#3f4869 0 95px,#B5BD49)fixed}`, which only moves body's edge to 95px, 225 pixels differ by more than 8 levels, all on the two curves. The CSS Battle judge gives the official code a 100% match.
