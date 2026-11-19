---
title: "A tilted outline on a pink canvas: a band cut in three in 91 characters"
ref: 2026-04-22
permalink: /2026/04/22/a-tilted-outline-on-a-pink-canvas/
description: "How html's 186px outline frames a pink band, how body's pink background ends up on the canvas, and how the same outline on body, zoomed to 50px and turned by 120 degrees, cuts the band in three, in the April 22, 2026 CSS Battle target."
target: /assets/targets/2026-04-22.png
target_url: https://cssbattle.dev/play/JQGdKmyo3a7grg94qIIs
colors: ["#66284a", "#f7bed9"]
player: h_blierzt
chars: 91
score: 768.03
match: 100
code: |
  <style>*{outline:solid 62vh#66284A;margin:90 40;*{background:#F7BED9;zoom:.27;rotate:120deg
---

The April 22 target is a pink band on a plum background, cut in three by two slanted plum stripes. H_Bliertz gives html and body the same plum outline. On html, it covers everything around a 320 × 120 box. body's pink background is painted on the whole canvas, so the box shows pink. On body, `zoom:.27` brings the outline down to 50px, and `rotate:120deg` turns it: its two long sides are the stripes.

With **Wide view**, the whole of html's outline and the ends of body's outline show up. With **Teaching colors**, the two outlines and the two boxes get their own colors.

{% include animations/2026-04-22.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                             /* every element: html, head, style, body */
  outline: solid 62vh#66284A;   /* 62% of 300px = 186px, drawn around the box */
  margin: 90 40;                /* quirks mode: 90px top and bottom, 40px left and right */
  * {                           /* every element inside another: all but html */
    background: #F7BED9;        /* body's: html has none, so it goes to the canvas */
    zoom: .27;                  /* body: margin 24.3 10.8, outline 50px */
    rotate: 120deg;             /* turns body and its outline around (200, 150) */
/* the end of the code closes everything */
```

## How it works

### 1. html's box and html's outline

`*` matches every element: html, head, style and body. head and style are not displayed, so two boxes are left.

There is no doctype, so the page is in quirks mode. There, a unitless `90` counts as 90px, and html stretches to the height of the frame, minus its margins. getBoundingClientRect gives html (40, 90), 320 × 120.

`62vh` is 62% of the 300px frame: 186px. An outline takes no room in the layout and is drawn around the box. 90px would be enough to reach the edges of the canvas from html's box, so everything outside html's box is plum.

### 2. body's background goes to the canvas

The background sits in the nested rule, which matches everything but html. When html has no background, the browser paints body's background on the whole canvas, and body paints none of its own. getComputedStyle gives html a transparent background. The pink shows where html's outline leaves a hole: inside html's box.

That is why the background is in the nested rule. With `html{background:#fff}` in front (112 characters), the canvas is white and body paints its own pink box: a turned bar that runs out of html's box over html's outline, and 26,398 pixels change. Moving `background:#F7BED9;` into the outer rule (same length) gives html a background too: body paints its own bar again, and 11,434 pixels change.

### 3. zoom shrinks body's margin and outline

The outer rule applies to body too: body gets the 186px outline and the `90 40` margin. `zoom:.27` scales both. The margin becomes 0.27 × 90 = 24.3 and 0.27 × 40 = 10.8. Inside html's 320 × 120 box, body is 298.4 × 71.4, from (50.8, 114.3), and its center is (200, 150), the center of the canvas.

The outline becomes 186 × 0.27 = 50.22px, and Chrome rounds it down to a whole 50px: getComputedStyle gives `185.185px` on body, and 185.185 × 0.27 = 50. This plum ring reaches 50px out from body's box, past every edge of html's box: it covers all of html's box but body's box. Without the rotation (77 characters), a single pink rectangle is left, and 19,957 pixels change.

Without the zoom (82 characters), body's outline is 186px too and covers all of html's box: the canvas is all plum, and 24,790 pixels change.

### 4. A turn of 120°

`rotate` turns body around its center, (200, 150), and its outline turns with it. After 120°, the long sides of the box run at 60° from the horizontal, like a `/`.

The two long sides of the ring cross html's box as two stripes. Each one is 50px wide across, so 50 / sin 60° = 57.7px along a row. The pink between them, body's box, is 71.4 / sin 60° = 82.4px along a row. On row y = 150, my render has plum from x = 101 to 158, pink from 159 to 240, plum from 241 to 298: 58, 82 and 58 pixels.

The short sides of the ring are 149.2px from the center, along the bar (half of 298.4). The farthest point of html's box from the center, along that direction, is only 160 × cos 60° + 60 × sin 60° = 132px away. So the short sides never enter html's box: they land on html's outline, plum on plum. On each side of the two stripes, the pink canvas is left: one pink piece on the left, one in the middle, one on the right.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One outline value does two jobs. On html, 186px is more than the 90px needed to cover the canvas around the box. On body, the zoom turns it into 50px. With `61vh` (same length), body's outline is 49px (getComputedStyle gives `181.481px`) and 517 pixels change. With `63vh`, it is 51px and 524 pixels change.
- `62vh` is 186px in 4 characters. With `186px` (92 characters), the picture is the same.
- `zoom:.27` scales the margin and the outline at once. With `margin:24.3 10.8;outline-width:50px` in its place (118 characters), the picture is the same.
- `.27` has no leading zero. With `0.27` (92 characters), the picture is the same.
- `rotate` is a property of its own. With `transform:rotate(120deg)` (102 characters), the picture is the same.
- No space between `62vh` and `#66284A`. With `62vh #66284A` (92 characters), the picture is the same.
- The unitless margins only work in quirks mode. With `margin:90px 40px` (95 characters), the picture is the same.
- Quirks mode also stretches html to the height of the frame. With `<!doctype html>` in front (106 characters), the unitless margins are dropped and html is only 2.16px tall. Its outline covers the canvas from y = 2 to 187, the canvas below stays pink, cut by body's turned outline, and 59,594 pixels change.
- The rules and the `<style>` are never closed. With `}}` at the end (93 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same band and the same two stripes as the target, but 695 pixels differ by more than 8 levels. All of them are on the slanted edges of the stripes. The largest difference is 140 levels, at (147, 169): plum in my render, pink in the target. On row y = 150, the target's stripes cover x = 100 to 157 and 240 to 297; in my render, x = 101 to 158 and 241 to 298. The CSS Battle judge gives the official code a 100% match.
