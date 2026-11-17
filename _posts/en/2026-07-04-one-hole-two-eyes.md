---
title: "One hole, two eyes: a pixel ghost in 170 characters"
ref: 2026-07-04
permalink: /2026/07/04/one-hole-two-eyes/
description: "How html's thick border draws the body of a pixel ghost, how body splits the hole left inside it into two eyes, and how four shadows of body make the feet, in the July 4, 2026 CSS Battle target."
target: /assets/targets/2026-07-04.png
target_url: https://cssbattle.dev/play/Tgh9p4ln2hnogFFpiFch
colors: ["#d35c72", "#efeb99"]
player: h_blierzt
chars: 170
score: 679.14
match: 100
code: |
  <style>*{border:solid 5vh;color:EFEB99;background:#D35C72;margin:-2 20-8 20}&{margin:40 130 100;border-width:30 50 110 20;*{box-shadow:-5ch 33vw,5ch 33vw,-11q 9lh,74q 9lh
---

The July 4 target shows a pale yellow pixel ghost on a pink background: a tall block with two small pink square eyes, and two rows of square feet at the bottom. H_Bliertz draws it with the only two boxes the page shows: html and body. html's thick border is the ghost, and the hole left inside it holds the eyes. body is a 30px yellow square that splits that hole in two, and its four shadows are the feet.

Turn on **Teaching colors** to see body over html's border, and the shadows sliding out of body.

{% include animations/2026-07-04.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                            /* html, head, style, body */
  border: solid 5vh;           /* solid, 15px */
  color: EFEB99;               /* yellow, with no # (quirks mode) */
  background: #D35C72;         /* pink: html paints the whole canvas */
  margin: -2 20-8 20           /* body: 2px up, 20px in on each side */
}
& {                            /* the root: html */
  margin: 40 130 100;          /* box from (130, 40) to (270, 200) */
  border-width: 30 50 110 20;  /* the frame; a 70 × 20 hole is left */
  * {                          /* html's descendants: only body shows */
    box-shadow:
      -5ch 33vw,               /* −40px 132px: (130, 200) */
      5ch 33vw,                /*  40px 132px: (210, 200) */
      -11q 9lh,                /* −10.39px 162px: (159.6, 230) */
      74q 9lh                  /*  69.92px 162px: (239.9, 230) */
```

## How it works

### 1. Only html and body

There is no doctype: the page is in quirks mode, and a number with no unit means px in `margin` and `border-width`. The code is a lone `<style>`, never closed. The page has html, head, the style and body, and only html and body are displayed.

`*` selects all four. A lone `&`, outside any rule, selects the root: html. Its rule wins over `*`, so html gets its own margin and border widths, and keeps the rest from `*`.

### 2. html's box

html gets `margin:40 130 100`: 40 at the top, 130 on both sides, 100 at the bottom. In quirks mode, html fills the window minus its margins: 400 − 260 = 140px wide, 300 − 140 = 160px tall. getBoundingClientRect puts it at (130, 40), 140 × 160: it ends at x = 270 and y = 200.

The pink `background` of html paints the whole canvas, not just its box: the root's background always does.

### 3. The frame and its hole

`*` gives html `border:solid`, and the color of a border is the text color by default. `color:EFEB99` has no `#`: quirks mode accepts a hex color without it in `color`. The border is pale yellow.

`border-width:30 50 110 20` replaces the 15px from `*`: 30 at the top, 50 on the right, 110 at the bottom, 20 on the left. The frame is the ghost's body. What is left inside is a pink hole, from x = 130 + 20 = 150 to 270 − 50 = 220, and from y = 40 + 30 = 70 to 200 − 110 = 90: 70 × 20.

### 4. body splits the hole

body sits in that hole, html's content box. It has no content, so it is only its border: `5vh` is 5% of 300, 15px on each side. Its 20px side margins leave it 70 − 40 = 30px, exactly its two borders. getBoundingClientRect gives a 30 × 30 square at (170, 68).

The top margin, −2, lifts it from y = 70 to 68. body covers the hole from x = 170 to 200 and overflows it a little, into the yellow frame. What is left of the hole is two 20px pink eyes: from x = 150 to 170 and from 200 to 220.

The bottom margin, −8, keeps html at 160px. body's margin box is −2 + 30 − 8 = 20px tall, the height of the hole, so html does not grow.

### 5. Four shadows

The `*` nested in `&` selects html's descendants: head, the style and body. Only body is displayed, so only its shadows show. A shadow with no color takes the text color: yellow. With no blur and no spread, each one is a copy of body's 30px square, moved by its offset.

`5ch` is five widths of the "0" of the default font: 40px. `33vw` is 33% of 400: 132px. From body's corner at (170, 68), the first two shadows land at (130, 200) and (210, 200), right under html's frame.

`9lh` is nine lines of the default line height, 18px here: 162px, so y = 230. 1Q is a quarter of a millimeter, 0.945px: `-11q` is −10.39px and `74q` is 69.92px. The last two shadows run from x = 159.6 to 189.6 and from 239.9 to 269.9. Each one touches a shadow of the first row at a corner: the feet form a checkerboard.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- The two eyes cost no element. They are what is left of the hole in html's frame once body covers its middle.
- `-2` moves body up so that short units fit. With body at y = 70, the shadows need 130px and 160px: `margin:0 20-10 20` with `130px` and `160px` gives the same picture in 176 characters.
- The −8 is not decoration. With `margin:-2 20 0` (167 characters), body's margin box is 28px tall. The hole, the eyes and html all grow by 8px, and 960 pixels change.
- Short units for every offset. `5ch` is 40px in 3 characters, `33vw` is 132px in 4, `9lh` is 162px in 3, and `5vh` is 15px in 3. Writing `40px`, `132px`, `162px` or `15px` instead gives the same picture in 172, 171, 172 and 171 characters.
- `-11q` and `74q` are one character shorter than `-10px` and `70px`. They put the feet's edges 0.39px and 0.08px off the pixel grid. With `-10px` and `70px` (172 characters), 120 pixels change in my Chrome: the four columns at the feet's left and right edges, x = 159, 189, 239 and 269, which the q values blend with the pink.
- No `#` in `color:EFEB99`. With it, the code takes 171 characters, for the same picture. The `#` stays in `background`: in my Chrome, `background:D35C72` (169 characters) is dropped, the canvas turns white, and 94,860 pixels change.
- `&` selects html in 1 character. `html` gives the same picture in 173.
- The shadows are nested in `&`, so html does not get them. `}body{` instead of `;*{` gives the same picture in 173 characters. Putting them in the top `*` rule (168 characters) gives html the four shadows too, and 23,640 pixels change.
- `margin:40 130 100` uses three values: the left margin copies the right one. `40 130 100 130` gives the same picture in 174 characters.
- No space in `20-8`. With the space, the code takes 171 characters, for the same picture.
- Nothing is closed. `}}</style>` at the end gives 180 characters, for the same picture.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 1,522 pixels, with the same rule as in the golf notes. 110 of them are in the four blended columns at the feet's edges: with `-10px` and `70px`, the difference drops to 1,412. All 1,412 others are within 6px of an edge between pink and yellow. The target is a JPEG: it has 375 different colors, my render 6, and its flat yellow is `#f0eb99`. The CSS Battle judge gives the code a 100% match.
