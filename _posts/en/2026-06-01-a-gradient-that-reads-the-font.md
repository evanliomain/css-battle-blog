---
title: "A gradient that reads the font: a pierced cross in 148 characters"
ref: 2026-06-01
permalink: /2026/06/01/a-gradient-that-reads-the-font/
description: "How one radial gradient, read with two different fonts on html and body, draws a mustard cross with scooped corners, rounded side arms and a round hole, in the June 1, 2026 CSS Battle target."
target: /assets/targets/2026-06-01.png
target_url: https://cssbattle.dev/play/u8sYQf7PKPxu7IUeUNc6
colors: ["#d19f37", "#fef9ce"]
player: emohdaziz
chars: 148
score: 697.6
match: 100
code: |
  <style>*{background:radial-gradient(1Q,#d19f37 4.1ex,#fef9ce 0 53lh,#d19f37)5ch/40vw;*{margin:70 120;corner-shape:scoop;border-radius:53Q;font:0/1q"
---

The June 1 target shows a mustard cross on pale yellow, with a round hole in the middle. Its four corners are scooped out. The top and bottom arms are straight, the left and right ones end in a half disc. Mohamed Ali draws it with one radial gradient, given to html and body. Its sizes are in font units, and body gets another font: on html, the gradient paints small discs for the side arms; on body, it paints the hole.

Use **Wide view** to see html's tiles go on outside the canvas, with two more discs.

{% include animations/2026-06-01.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, head, body, style */
  background: radial-gradient(
    1Q,                          /* a circle with a 0.945px radius */
    #d19f37 4.1ex,               /* html: up to 29.44px · body: up to 0 */
    #fef9ce 0 53lh,              /* html: up to 954px · body: up to 50.08px */
    #d19f37                      /* at 1Q, moved up to 53lh */
  )5ch/40vw;                     /* x = 40px on html, 0 on body; 160px wide */
  * {                            /* * *: head, body, style (not html) */
    margin: 70 120;              /* body: 160 × 160 at (120, 70) */
    corner-shape: scoop;         /* the corners curve inward */
    border-radius: 53Q;          /* over 50.08px */
    font: 0/1q"                  /* 1ex = 1ch = 0, 1lh = 0.945px */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `70` is read in px.

The page has html, head, body and style. head and style are not displayed. `*` matches all four: they all get the background. The nested `*{` means `* *`: any element inside another one. That is head, body and style, but not html. So the margin, the corners and the font go to body only.

### 2. One gradient, sized in font units

`radial-gradient(1Q,…)` starts with one length: a circle with that radius. 1Q is a quarter millimeter, 0.945px.

The stops are past that radius. `#d19f37 4.1ex` is mustard up to 4.1ex. `#fef9ce 0 53lh` is pale yellow with two positions. The first one, `0`, can't be before the previous stop, so it moves up to 4.1ex: a sharp edge. The pale goes on to 53lh. The last `#d19f37` has no position. It goes at 100% of the radius, so at 1Q. That is before 53lh, so it moves up to 53lh too: a second sharp edge, and mustard beyond.

`ex` is the height of a small "x" in the element's font. `lh` is its line height. So the same gradient gets other sizes on an element with another font.

### 3. On html: small discs, 160px apart

html keeps the default font, 16px Times. In my Chrome, 1ex = 7.18px and the normal line height is 18px. So 4.1ex = 29.44px and 53lh = 954px.

`5ch/40vw` gives the position and the size. 1ch is the width of a "0", 8px here: 5ch = 40px. 40vw is 40% of the 400px width: 160px. The height is auto. A gradient has no size of its own, so it takes the height of html, 300px. Only x is given, so y is centered.

I measured html: 400 × 300, at (0, 0). Its background covers the whole canvas, and the 160 × 300 tile repeats. Tiles start at x = 40, 200, 360, and their centers are at x = 120 and 280 on the canvas (and at −40 and 440, off the canvas). Each tile shows a mustard disc with a 29.44px radius, on pale. The pale goes to 954px, much farther than the tile's corners, 170px from its center: the last mustard never shows on html.

### 4. On body: the hole

body gets `margin:70 120`. In quirks mode, body fills the height of the page minus its margins: 300 − 140 = 160. It is 400 − 240 = 160 wide. I measured it: 160 × 160, at (120, 70).

body also gets `font:0/1q"`. The font shorthand needs a font name. The `"` opens a string, and the end of the code closes it: an empty name. The font size is 0, so 1ex = 0 and 1ch = 0. The line height is 1q, so 1lh = 0.945px.

Now the gradient reads differently. 4.1ex = 0: no mustard disc. The pale goes from 0 to 53lh = 53 × 0.945 = 50.08px. Mustard after that. 5ch = 0, and 40vw is still 160px, the width of body. So body has one tile, centered on (200, 150): a pale hole with a 50.08px radius in a mustard square.

### 5. Scooped corners

`border-radius:53Q` rounds each corner of body over 53Q = 50.08px, the same length as the hole's radius. `corner-shape:scoop` turns the curve inward. Each corner is cut by a quarter circle centered on the corner itself.

### 6. The side arms

body hides the inner half of html's two discs. The outer half sticks out: from x = 90.56 to 120 on the left, from 280 to 309.44 on the right. That is why the left and right arms end in a half disc, while the top and bottom arms stay straight.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- The font does a lot in `font:0/1q"`: 1ex = 0, 1ch = 0 and 1lh = 0.945px, all on body only. Without `;font:0/1q"` (137 characters), body keeps 16px Times and gets html's picture: all pale, with one small disc at x = 240. 10,817 pixels change.
- The lone `"` is the shortest font name. `1q""` or `1q a` give the same picture in 149 characters.
- `4.1ex` is 29.44px on html and 0 on body. `29px` (147 characters) gives body a mustard disc in the middle of its hole: 2,716 pixels change.
- `53lh` is 954px on html and 50.08px on body. With `50px` (148 characters), html's pale stops at 50px and the canvas is mustard around it: 92,049 pixels change.
- `5ch` is 40px on html and 0 on body. With `40px` (149 characters), body's tile starts 40px in too, and the hole moves to x = 240: 7,196 pixels change.
- `40vw` is 160px in 4 characters. `160px` gives the same picture in 149 characters.
- `1Q` makes a circle and puts the last stop at 1Q, so it moves up to 53lh and gives a sharp edge. With `circle` (152 characters), the last stop goes to the farthest corner of the tile. On body that is 113px away, so the hole fades into the mustard: 9,976 pixels change. With no size at all (145 characters), the gradient is an ellipse: html's discs get taller and body's hole fades too. 13,894 pixels change. With `0` (147 characters), my Chrome paints the whole canvas mustard: 107,564 pixels change.
- The `0` in `#fef9ce 0 53lh` is the shortest first position: it moves up on its own. `#fef9ce 4.1ex 53lh` gives the same picture in 152 characters. Without the `0` (146 characters), the mustard fades into the pale: 106,698 pixels change.
- The last `#d19f37` paints body's mustard. Without `,#d19f37` (140 characters), body is all pale and only the two half discs are left: 9,989 pixels change.
- `53Q` is 50.08px in 3 characters, like the hole. `50px` (149 characters) changes 206 pixels. Case costs nothing: `53q` gives the same picture.
- Nesting keeps the margin, the corners and the font off html. `body{` instead of the inner `*{` gives the same picture in 151 characters. With everything in one rule (146 characters), html gets them too: 67,548 pixels change.
- Bare numbers: `70px 120px` gives the same picture in 152 characters.
- `corner-shape:scoop` costs 19 characters. Without it (129 characters), the corners are plain round corners: 5,974 pixels change.
- The code stops inside the font name. The end of the code closes the string, the declaration and both rules. Adding `"}}` gives the same picture in 151 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 598 pixels, with the same rule as in the golf notes, by up to 151. All of them are on the curved edges: 166 around the hole, 154 on the side half discs and 278 on the scooped corners. The flat colors are the same. My render draws the hole and the half discs with hard steps, with only the two colors. The target has in-between shades there. On the scooped corners, both have in-between shades, but not the same ones. The target has 42 colors in all, my render 163. The CSS Battle judge gives the code a 100% match.
