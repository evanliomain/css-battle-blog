---
title: "A box hanging off the edge: navy steps in 130 characters"
ref: 2026-04-15
permalink: /2026/04/15/a-box-hanging-off-the-edge/
description: "How one html box, pushed 60px past the right edge, paints the whole canvas green with its background, and how six navy box shadows copy it into steps around a small green bar, in the April 15, 2026 CSS Battle target."
target: /assets/targets/2026-04-15.png
target_url: https://cssbattle.dev/play/EOXXLnUGLZCV8vqgBdL8
colors: ["#2faa8b", "#17405b"]
player: jrojko
chars: 130
score: 715.87
match: 100
code: |
  <style>&{margin:95-60 95 350;background:#2FAA8B;color:17405B;box-shadow:0 0 0 101q,-116q 0,-25vw -1in,-217q -69q,-217q 69q,-75vw 0
---

The April 15 target is a green canvas with navy blocks set in steps: a navy area on the right that steps down toward the left, a small green bar in the middle, and a green block on the right edge. Juraj Rojko styles a single box, html, and pushes it 60px past the right edge of the canvas. Its background paints the whole canvas green. Six navy box shadows copy the box into the steps. The green block on the right is html's own box: a shadow never paints under it.

With **Wide view**, the box and the big shadow run off the canvas. With **Teaching colors**, each shadow gets its own color.

{% include animations/2026-04-15.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                          /* at the top level, & is the root: html */
  margin: 95-60 95 350;      /* html: 110 × 110 at (350, 95), 60px past the right edge */
  background: #2FAA8B;       /* the root's background: the whole canvas */
  color: 17405B;             /* no hash: quirks mode takes it */
  box-shadow:
    0 0 0 101q,              /* navy (the color), spread 95.43px all around */
    -116q 0,                 /* 109.61px to the left */
    -25vw -1in,              /* 100px to the left, 96px up */
    -217q -69q,              /* 205.04px to the left, 65.20px up */
    -217q 69q,               /* 205.04px to the left, 65.20px down */
    -75vw 0                  /* 300px to the left */
  /* the end of the code closes the rule */
```

## How it works

### 1. `&` is html

`&` is the nesting selector. Outside any rule, it stands for `:scope`, and in a style sheet that is the root element: html.

### 2. html: 110 × 110, past the right edge

CSS Battle pages have no doctype, so they are in quirks mode, where unitless lengths in margins count as pixels.

`margin:95-60 95 350` is 95 on top, −60 on the right, 95 at the bottom and 350 on the left. The minus sign starts a new number, so `95-60` needs no space. A negative margin makes the box wider: html runs from x = 350 to 400 + 60 = 460. It is 110px wide, and 60 of those pixels are off the canvas.

In quirks mode, html stretches to the height of the viewport, minus its margins: 300 − 95 − 95 = 110. It runs from y = 95 to 205. getBoundingClientRect gives 350, 95, 110 × 110.

### 3. The canvas is green

`background:#2FAA8B` is set on the root. The root's background is not limited to its box: it is painted on the whole canvas. Everything starts green.

### 4. A color with no hash

`color:17405B` has no `#`. In quirks mode, a few properties, `color` among them, take a hex color without it: getComputedStyle gives rgb(23, 64, 91). html paints no text, but a shadow with no color takes the `color` value. None of the six shadows has a color: they are all navy.

### 5. The spread covers the right side

`0 0 0 101q` has no offset and no blur, but a spread of 101q. 1q is a quarter millimeter, 0.945px, so 101q is 95.43px, added on every side of the box. The shadow runs from x = 254.57 to 555.43 and from y = −0.43 to 300.43: the whole right side of the canvas, from top to bottom. The target puts its left edge at x = 255.

A box shadow is never painted under its own box. Inside html's box, from x = 350 to the canvas edge and from y = 95 to 205, the green canvas stays visible: that is the green block on the right.

### 6. Five copies make the steps

A shadow with no spread is a copy of the box, 110 × 110, moved by its two offsets.

- `-116q 0`: 116q is 109.61px. The copy runs from x = 240.39 to 350.39, from y = 95 to 205. It takes the navy further left on the middle row. The target has an edge at x = 240 there.
- `-25vw -1in`: 25vw is 25% of the 400px width, 100px, and 1in is 96px. The copy runs from x = 250 to 360 and from y = −1 to 109. At the top of the canvas, the navy now starts at x = 250, as in the target.
- `-217q -69q` and `-217q 69q`: 217q is 205.04px and 69q is 65.20px. The two copies run from x = 144.96 to 254.96, one from y = 29.80 to 139.80, the other from y = 160.20 to 270.20. The target puts them from x = 145 to 255, from y = 30 to 140 and from 160 to 270. Between them, a band 20.39px high stays green (20px in the target).
- `-75vw 0`: 75vw is 300px. The copy runs from x = 50 to 160, from y = 95 to 205. It closes the left end of the green band.

What is left of the band, from x = 160 to 240 and from y = 140 to 160, is the green bar in the middle. Nothing paints it: it is the canvas, between the copies.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&` is 1 character, `html` 4. With `html{` (133 characters), the picture is the same.
- One box does all the painting: its background is the whole green canvas, and its six shadows are the navy. The green block on the right costs nothing: it is the canvas, seen through html's box.
- `color:17405B;` is 13 characters, and it colors six shadows. With `color:#17405B` (131 characters), the picture is the same. With no `color` and `#17405B` after each shadow (159 characters), the picture is the same. With no color at all (117 characters), the shadows turn black: 73,644 pixels change.
- The hash stays in `background:#2FAA8B`. With `background:2FAA8B` (129 characters), my Chrome ignores the background: the canvas stays white, and 46,782 pixels change. With `background-color:2FAA8B` (135 characters), the picture is the same, but it is 5 characters longer.
- The right margin is −60, and that makes the box 110px wide, the size of every navy block. With a right margin of 0 (`95 0 95 350`, 129 characters), html is only 50px wide, and so are its six copies: 17,010 pixels change.
- `95-60` needs no space: the minus starts a new number. With `95 -60` (131 characters), the picture is the same.
- Quirks mode takes unitless numbers in margins. With `95px -60px 95px 350px` (139 characters), the picture is the same.
- `116q` is 4 characters, `110px` 5. With `-110px` (131 characters), the copy's left edge moves by 0.394px: 20 pixels change, on the column x = 240, the right end of the green bar.
- `217q` is 4 characters, `205px` 5, and it shows up twice. With `-205px` twice (132 characters), the picture is the same.
- `69q` is 3 characters, `65px` 4, and it shows up twice. With `65px` twice (132 characters), the edges of the two copies move by 0.197px: 375 pixels change, on the rows y = 29, 139, 160 and 270.
- `25vw` is 4 characters, `100px` 5. With `-100px` (131 characters), the picture is the same. `75vw` is 4 characters, `300px` 5. With `-300px` (131 characters), the picture is the same.
- The vertical offset of `-25vw -1in` only has to put the top of the copy above the canvas and its bottom below y = 30. With `-95px` (131 characters) or `-175px` (132 characters), the picture is the same; with `-94px` or `-176px`, 5 pixels change. `1in` is 96px in 3 characters.
- The code ends inside the rule: the end of the code closes it. With `-75vw 0}` (131 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same blocks as the target, in the same two flat colors. 424 pixels differ by more than 8 levels, all on straight edges. 375 are on the rows y = 29, 139, 160 and 270: the edges of the two `-217q ±69q` copies, at y = 29.80, 139.80, 160.20 and 270.20 in my render. 20 are on the column x = 240, where the `-116q 0` copy starts at x = 240.39. 29 are on the column x = 254, below y = 270, where the spread starts at x = 254.57. In the target, those edges are on whole pixels. When I write `-110px`, `65px` and `95px` in place of `-116q`, `69q` and `101q` (133 characters), no pixel of my render is more than 8 levels off the target. 285 pixels still differ, by 5 levels at most, on the columns x = 144 and 254: the `-217q` copies run from x = 144.96 to 254.96. The CSS Battle judge gives the official code a 100% match.
