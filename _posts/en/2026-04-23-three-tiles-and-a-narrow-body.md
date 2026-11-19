---
title: "Three tiles and a narrow body: three discs in 127 characters"
ref: 2026-04-23
permalink: /2026/04/23/three-tiles-and-a-narrow-body/
description: "How one var() fallback gives html and body the same radial gradient with swapped colors, how a 37mm tile repeats it three times across the canvas, and how a 120px body keeps only the middle disc, in the April 23, 2026 CSS Battle target."
target: /assets/targets/2026-04-23.png
target_url: https://cssbattle.dev/play/jn4XKDctJyXddKKNPRYj
colors: ["#4a9a86", "#fae29e", "#4c4c6b"]
player: koda_pig
chars: 127
score: 719.23
match: 100
code: |
  <style>*{background:radial-gradient(1q,var(--x,#4A9A86,5vw,#FAE29E)0 53q,#4C4C6B)50%/37mm;margin:0 70;*{--x:#FAE29E,5vw,#4A9A86
---

The April 23 target is three discs in a row on a gray-purple background. The two outer ones are yellow with a green center; the middle one is green with a yellow center. koda_pig writes one radial gradient for html and body. On html, a 37mm tile repeats it across the whole canvas. On body, a `var()` swaps its colors, and body's 120px box keeps only the middle disc.

With **Wide view**, the tiles that repeat off the canvas show up. With **Teaching colors**, the boxes, the tile and body's own background get their own colors.

{% include animations/2026-04-23.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                    /* every element: html, head, style, body */
  background: radial-gradient(
    1q,                                /* the size: a circle of radius 0.945px */
    var(--x,#4A9A86,5vw,#FAE29E)0 53q, /* html: #4A9A86,5vw,#FAE29E 0 53q */
                                       /* body: #FAE29E,5vw,#4A9A86 0 53q */
    #4C4C6B                            /* no position: 100% = 0.945px, pushed to 53q */
  )50%/37mm;                           /* a tile 139.84px wide, centered on the box */
  margin: 0 70;                        /* 70px left and right, on html and on body */
  * {                                  /* every element inside another: all but html */
    --x: #FAE29E,5vw,#4A9A86
/* the end of the code closes everything */
```

## How it works

### 1. Two boxes, two margins

`*` matches every element: html, head, style and body. head and style are not displayed, so two boxes are left, and both get the `background` and the `margin`.

There is no doctype, so the page is in quirks mode. There, a unitless `70` counts as 70px, and html and body stretch to the height of the frame. getBoundingClientRect gives html (70, 0), 260 × 300, and body (140, 0), 120 × 300: body sits inside html, so the 70px margin counts twice. Both boxes are centered on x = 200.

The margin has to be on both. With `margin:0 70` moved into the nested rule (same length), html is 400px wide and body runs from 70 to 330. body then reaches into the outer discs, which come out partly in body's colors, and 6,112 pixels change.

### 2. One `var()`, two gradients

The fallback of a `var()` runs from the first comma to the closing parenthesis, commas included. Nothing sets `--x` on html, so it gets the fallback, and its background reads `radial-gradient(1q,#4A9A86,5vw,#FAE29E 0 53q,#4C4C6B)`. The nested `*{` means `* *`: every element but html. It sets `--x:#FAE29E,5vw,#4A9A86` on body, and the same declaration reads `radial-gradient(1q,#FAE29E,5vw,#4A9A86 0 53q,#4C4C6B)` there. getComputedStyle confirms both.

### 3. The 1q circle

A single length as the first argument of `radial-gradient` is a circle of that radius. `1q` is a quarter of a millimeter: 0.945px. Stops in other units do not care about that size: `5vw` is 20px (5% of the 400px frame), and `53q` is 53 × 0.945 = 50.08px.

On html, `5vw` stands alone between two colors: it is a transition hint, where the two colors mix half and half. `#FAE29E 0` comes after it but is placed before it, so the 0 moves up to 20px. The hint and the next color are at the same place: green all the way to 20px, then yellow, with no fade. The yellow runs to 53q.

`#4C4C6B` has no position, so it sits at 100% of the size: 0.945px. A stop cannot sit before an earlier one, so it moves up to 50.08px. The gray-purple starts sharp at radius 50.08.

### 4. A 37mm tile

`50%/37mm` is the position and the size of the background. 37mm is 37 × 96 / 25.4 = 139.84px. Only one size is given, so the height is `auto`, and a gradient has no size of its own: the tile takes the full height of the box, 300px. getComputedStyle gives `139.843px auto`.

`50%` centers the tile on the box. On html, it runs from x = 130.08 to 269.92, with the disc at (200, 150).

### 5. html repeats it

html is the root, so its background is painted on the whole canvas, and the tile repeats every 139.84px. Two copies land on the canvas: from −9.76 to 130.08, and from 269.92 to 409.76. Their discs are centered at x = 60.16 and 339.84 and reach from 10.08 to 110.24 and from 289.76 to 389.92. The next copies are off the canvas. A tile is already 300px tall, so the copies above and below are off the canvas too: one row of discs shows.

### 6. body's box keeps one disc

body's tile is 139.84 × 300 too, centered on body's box, whose center is also x = 200. Its tiles fall exactly on html's, with the colors swapped. But a background stops at the edge of its box, and body only runs from 140 to 260. The middle disc, from 149.92 to 250.08, fits inside. body's next discs would end at 110.24 and start at 289.76: they stay outside. Around the middle disc, body's gray-purple lands on html's, so its edges do not show.

Without the margin (115 characters), body keeps its default 8px margin and is 384px wide. Its tiles cover all three discs, all three come out green with a yellow center, and 16,000 pixels change.

My render counts 96,136 gray-purple pixels, 14,232 yellow and 9,072 green. The 560 others are on the edges of the discs.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `background` declaration serves both boxes: the fallback holds three parts of html's gradient, `#4A9A86,5vw,#FAE29E`, and body swaps them for `#FAE29E,5vw,#4A9A86`. With two gradients written out, `<style>*{background:radial-gradient(1q,#4A9A86,5vw,#FAE29E 0 53q,#4C4C6B)50%/37mm;margin:0 70;*{background:radial-gradient(1q,#FAE29E,5vw,#4A9A86 0 53q,#4C4C6B)50%/37mm` (168 characters), the picture is the same.
- `1q,` makes the gradient a circle and makes 100% tiny, so the last color needs no position. With `circle,` (131 characters), 100% is the tile's farthest corner, 165.5px away: the yellow fades into the gray-purple out to the corners of each tile, and 95,700 pixels change. With no size at all (124 characters), the discs become tall ovals that also fade out to the corners, and 100,984 pixels change.
- `5vw` is 20px in 3 characters. With `20px` twice (129 characters), the picture is the same.
- `53q` is 50.08px in 3 characters. With `50px` (128 characters), 132 pixels change, all within 0.85px of the edge of a disc.
- `37mm` is 139.84px in 4 characters. With `140px` (128 characters), 584 pixels change, all within 0.84px of the edge of a disc.
- The `0` after the `)` does two jobs: it starts the second color's band, and it moves up to the hint. Without it (125 characters), the center color fades into the ring color all the way to radius 50.08, and 20,832 pixels change.
- The unitless `70` only works in quirks mode. With `70px` (129 characters), the picture is the same.
- No space between `)` and `0`, or between `)` and `50%`. With `) 0` (128 characters), the picture is the same.
- The nested `*{` is the shortest way to reach body and not html. With `}body{` in its place (131 characters), the picture is the same.
- Quirks mode does two jobs here. With `<!doctype html>` in front (142 characters), the unitless margin is dropped, html is only 8px tall and body 0px. html's 8px tiles repeat down the canvas and draw vertical bands, and 77,788 pixels change.
- The rules and the `<style>` are never closed. With `}}` at the end (129 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same three discs at the same place as the target, but 1,028 pixels differ by more than 8 levels. All of them are within 1.06px of the edge of a disc. The largest difference is 176 levels, at (55, 130), on the edge of the left disc's green center: yellow in my render, green in the target. On the middle row, the target's left disc starts sharp at x = 10; in my render, that pixel is a mix, (211, 192, 147). In my Chrome, the side discs are centered at 60.16 and 339.84 with a radius of 50.08. With `140px` and `50px` in place of `37mm` and `53q` (129 characters), the columns x = 10 and 289 match the target, and 677 pixels are left, all within 0.58px of the edge of a disc. The CSS Battle judge gives the official code a 100% match.
