---
title: "Two boxes, one shadow list: a split disc in 130 characters"
ref: 2026-08-26
permalink: /2026/08/26/two-boxes-one-shadow-list/
description: "How one box-shadow list, used by html and then by a body cut with clip-path, draws the olive background, the three white squares and the split disc of the August 26, 2026 CSS Battle target."
target: /assets/targets/2026-08-26.png
target_url: https://cssbattle.dev/play/73FtfyFQ7BgJHeS18cU0
colors: ["#fff", "#bbb54e", "#566713"]
player: selenit
chars: 130
score: 715.87
match: 100
code: |
  <style>*{margin:125 175;box-shadow:-138q 0#fff,138q 0#fff,0 0 0 3in;color:BBB54E;*{margin:-90-15;color:566713;clip-path:circle(5lh
---

The August 26 target is a dark green disc on an olive background, split by a vertical slot, with three small white squares in a row: one in the slot, one on each side. Ilya Streltsyn writes one `box-shadow` list and lets two boxes use it. On `html`, it draws the background and the three squares. On the `body`, the same list comes out dark green, and `clip-path:circle(5lh)` cuts it into the disc.

Use **Teaching colors** to see the white copies of each box in their own color: the `body` has two as well, and they end up just outside the circle.

{% include animations/2026-08-26.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html (and everything in it) */
  margin: 125 175;                 /* html: 50 × 50 at (175, 125) */
  box-shadow:
    -138q 0 #fff,                  /* white copy, 130.39px to the left */
    138q 0 #fff,                   /* white copy, 130.39px to the right */
    0 0 0 3in;                     /* 288px spread, in the text color */
  color: BBB54E;                   /* #BBB54E, without the # */
  * {                              /* head, style, body */
    margin: -90 -15;               /* body: 80 × 230 at (160, 35) */
    color: 566713;                 /* same shadows, now dark green */
    clip-path: circle(5lh);        /* 90px ray around (200, 150) */
  }
}
```

## How it works

### 1. html: a 50 × 50 box

`*` matches `html` and every element in it. The nested `*` only matches the inner ones: `head`, `style` and `body`. `head` and `style` are not displayed, so only `html` and `body` draw something.

On `html`, `margin:125 175` leaves 400 − 175 − 175 = 50px of width. In quirks mode, `html` fills the height of the frame minus its margins: 300 − 125 − 125 = 50px. I measured it: a 50 × 50 box at (175, 125).

No rule paints a background. The canvas stays white.

### 2. A 3in spread: the olive background

The last shadow, `0 0 0 3in`, has no offset and no blur. Its spread is 3in, and 1in = 96px, so 288px on every side: a 626 × 626 square from (−113, −163), far bigger than the canvas.

It has no color, so it takes the text color. That is `color:BBB54E`: a hex color without `#`, which quirks mode accepts. The computed color is `rgb(187, 181, 78)`, so `#BBB54E`.

An outer shadow is never painted under its own box. The 50 × 50 of `html` stays white: that is the middle square. It is not drawn, it is the canvas seen through the box.

### 3. Two white copies: the side squares

The first two shadows, `-138q 0#fff` and `138q 0#fff`, are copies of the box moved left and right, in white. 1q is a quarter of a millimeter, 0.945px, so 138q = 130.39px. The left square runs from x = 44.61 to 94.61, the right one from 305.39 to 355.39, both from y = 125 to 175.

Shadows are painted in reverse order: the first one in the list is on top. The two white copies are written before the olive spread, so they are painted above it.

### 4. body: the same list, in another color

The nested rule gives the `body` `margin:-90-15`. Negative side margins make it wider than `html`: 50 + 15 + 15 = 80px. In quirks mode, the `body` fills the height of `html` minus its margins: 50 + 90 + 90 = 230px. I measured it: an 80 × 230 box at (160, 35).

The outer `*` matches the `body` too, and the nested rule does not set `box-shadow`. So the `body` gets the same three shadows. Only the color changes: the nested `color:566713` makes the spread `#566713`, dark green. The two copies say `#fff`, so they stay white.

Before any clipping, the dark green spread covers the whole canvas except the `body`'s own box. Through that box, what `html` painted shows: olive, with the white middle square. The two white copies of the `body` are 80 × 230 bands, from x = 29.61 to 109.61 and from 290.39 to 370.39.

### 5. circle(5lh): the disc

`clip-path` cuts an element and everything it paints, shadows included. `circle(5lh)` has no position, so it is centered on the `body`'s border box: (160 + 40, 35 + 115) = (200, 150).

`lh` is the line height of the element. In my Chrome, 5lh measures 90px here, so 1lh is 18px. The circle runs from x = 110 to 290 and from y = 60 to 240.

Inside the circle, the dark green spread is all that is left. The slot is the `body`'s own box, 80px wide, from x = 160 to 240: there, `html` shows through, olive with the white middle square. The two halves of the disc start at y = 150 − √(90² − 40²) = 69.38 along the slot, which is what I measured on the render.

The white copies of the `body` end at x = 109.61 and start again at 290.39. The circle starts at 110 and ends at 290, so nothing of them is left. To check, I rendered a version where only the `body`'s copies are red: no red pixel shows.

## Golf notes

- One `box-shadow` list for two boxes. The spread has no color, so it follows each box's `color`: olive on `html`, dark green on the `body`.
- The `body`'s white copies need no undoing: they land 0.39px outside the circle.
- `color:BBB54E` and `color:566713`: hex colors without `#`, accepted in quirks mode.
- `138q` is 4 characters for 130.39px. `130px` would take 5.
- `3in` gives a 288px spread in 3 characters, more than the 175px needed to reach the edges of the canvas.
- `5lh` is 90px in 3 characters.
- No space is needed in `0#fff` or in `-90-15`: the `#` and the `-` start a new value.
- Margins without units work in quirks mode: `125 175`, `-90-15`.
- `<style>` is never closed, and `circle(5lh` and the two braces are left open.

## If you try it at home

138q is 130.39px, not 130. In the latest Chrome (version 157 when this was written), the left and right edges of the two side squares fall 0.39px off the pixel grid: the squares run from 44.61 to 94.61 and from 305.39 to 355.39, where the target has 45 to 95 and 305 to 355. Each of those four edges comes out blended over one column of pixels. With `130px` in place of `138q`, the squares match the target; the only pixels left that differ are on the curved edge of the disc. On the CSS Battle judge, the original code is a 100% match.
