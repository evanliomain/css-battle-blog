---
title: "Two disks between two bands: a bridge in 132 characters"
ref: 2026-07-09
permalink: /2026/07/09/two-disks-between-two-bands/
description: "How html's top and bottom borders draw the bar and the pillars, how a tiled radial gradient with a 1Q ray puts two translucent disks on the canvas, and how body, stretched far down by a negative margin, cuts the bottom band and hides its own disk below the canvas, in the July 9, 2026 CSS Battle target."
target: /assets/targets/2026-07-09.png
target_url: https://cssbattle.dev/play/h3l8ESz0rxoqQDKXESq7
colors: ["#0a3156", "#c0ffad"]
player: eguiluz
chars: 132
score: 713.68
match: 100
code: |
  <style>*{margin:0 110-430;background:radial-gradient(1Q,#8F68 53Q,#0a3156)40vw/70vh 9in}&{border-block:5ch solid#c0ffad;margin:80 40
---

The July 9 target looks like a bridge: a light green bar on a navy background, two square pillars under it, and between them, on each side, a disk. David Eguiluz draws the bar and the pillars with html's top and bottom borders. html's background, a tiled radial gradient, paints the two disks on the canvas. body gets the same background, but it is pushed so far down that its own disk falls below the canvas: on the canvas, it only paints navy, and that navy cuts the bottom band in two.

Turn on **Teaching colors** to see html's border in orange and body in purple, and **Wide view** to see body go down to y = 610.

{% include animations/2026-07-09.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, head, style, body */
  margin: 0 110-430;             /* 0 on top, 110 left and right, -430 at the bottom */
  background:
    radial-gradient(1Q,          /* a circle with a 0.945px ray */
      #8F68 53Q,                 /* translucent green up to 50.08px */
      #0a3156)                   /* navy from 50.08px on */
    40vw/70vh 9in                /* at x = 160px, tiles of 210 × 864 */
}
& {                              /* html */
  border-block: 5ch solid#c0ffad;  /* 40px green at the top and bottom */
  margin: 80 40                  /* 80 on top and bottom, 40 left and right */
```

## How it works

### 1. Four elements, two of them shown

There is no doctype: the page is in quirks mode, and numbers with no unit are px. The page has html, head, the style and body. head and the style are not displayed.

The `*` gives all of them the same margin and the same background. At the top level of a style sheet, `&` means the root of the page: html. It counts like a class, so it beats `*`: html keeps the background, but its margin becomes `80 40`.

### 2. html, two bands

With 80px on top and bottom and 40px on the left and right, html is 320 × 140, at (40, 80): in quirks mode, html fills the height of the page minus its margins, 300 − 160 = 140.

`border-block` is the top and bottom border. `5ch` is five times the width of a `0` in the default font, Times at 16px: 8px each, so 40px. The top band goes from y = 80 to 120, the bottom band from y = 180 to 220, both from x = 40 to 360. Inside, html's content is 320 × 60, at (40, 120).

### 3. A circle with a 1Q ray

html is the root element: its background is painted on the whole canvas. But its tiles are placed from html's own box, inside the border: the 320 × 60 area at (40, 120).

`radial-gradient(1Q,` gives the size of the gradient: one length means a circle with that radius. 1Q is 0.945px. The color stops that follow are distances from the center, and they do not depend on that size.

`#8F68 53Q` is the green from the center up to 53Q, 50.08px. `#0a3156` has no position, so it goes at 100%: the end of the ray, 0.945px. A stop cannot come before the one before it, so it moves up to 50.08px. The green stops there with a sharp edge, and navy fills the rest of the tile.

### 4. Tiles of 210 × 864

After the `/`, `70vh 9in` is the size of a tile: 70% of the 300px height, 210px wide, and 9 inches, 864px tall. Before the `/`, `40vw` is the position: 40% of the 400px width, 160px from the left edge of html's area. A tile edge falls at x = 40 + 160 = 200. The tiles repeat: one goes from x = −10 to 200, the next from 200 to 410. There is only one value for the position, so the tile is centered vertically on the 60px area: its center is at y = 150.

Each tile has its disk in its center: at (95, 150) and (305, 150), with a 50.08px ray. They go from x = 44.92 to 145.08 and from 254.92 to 355.08, and from y = 99.92 to 200.08. The bands cover them above y = 120 and below y = 180: between the bands, they look like two balls. In my render, row y = 150 is green from x = 45 to 144 and from 255 to 354. The next tiles, centered at x = −115 and 515, are off the canvas. The tiles above and below are 864px away.

### 5. A translucent green

`#8F68` is `#88ff66` at 53% opacity (0x88 out of 255). Behind the canvas, the page is white. 53% of (136, 255, 102) over white gives (191.5, 255, 173.4): `#c0ffad`, the bands' green, within one step. In my render, the disks are (192, 255, 174) and (191, 255, 173), and the bands (192, 255, 173).

### 6. body, pushed down

body gets the `*` margin: 0 on top, 110 on the left and right, −430 at the bottom. In html's 320px, that leaves 100px: body goes from x = 150 to 250. In quirks mode, body fills html's height minus its margins: 60 − (−430) = 490px. getBoundingClientRect gives (150, 120), 100 × 490. body goes down to y = 610, far below the canvas.

body is drawn above html's border. Its navy covers the bottom band between x = 150 and 250: what is left are two pillars, from x = 40 to 150 and from 250 to 360.

### 7. body's own disk

body has the same background, placed on its own box. Horizontally, its tile starts at 150 + 160 = 310; the one before goes from x = 100 to 310, so its disk is at x = 205, right in body. But vertically, the 864px tile is centered on body's 490px: its center is at y = 120 + 490 / 2 = 365. The disk goes from y = 314.92 to 415.08, below the canvas. The tile above puts its disk at y = 365 − 864 = −499. On the canvas, body only shows navy.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&` selects html in 1 character. `html` gives the same picture in 135.
- `#8F68` is the bands' green in 5 characters, thanks to its opacity over the white page. `#c0ffad` gives the same picture in 134.
- `1Q,` makes the circle tiny, so the navy's 100% lands before 53Q and moves there: a sharp edge. Without it (129 characters), the gradient is an ellipse that reaches the tile's corners. The navy only arrives at the far end, and the green fades into it across the canvas: all 87,144 navy pixels change.
- `53Q` is 50.08px in 3 characters. `50px` (133 characters) changes 16 pixels, on the edges of the disks.
- `40vw` and `70vh` are 160px and 210px. In my Chrome, a number with no unit is not accepted inside the `background` shorthand: with `160` or `210` (131 characters), the whole background is dropped. The canvas turns white, and body no longer cuts the bottom band: 98,400 pixels change.
- `9in` is 864px in 3 characters. With no height (128 characters), the tile is only as tall as html's area, 60px: each disk is cut to a 60px slice, and the slices stack into two green columns. 29,784 pixels change. `3in` (288px) is too short: the disk of body's tile above reaches y = 127 and shows at the top of the gap between the pillars, 248 pixels. `4in` gives the same picture as `9in`, in the same 3 characters.
- `-430` makes body tall. With `margin:0 110` (128 characters), body is only 60px tall: it no longer covers the bottom band, and its own disk, now centered at (205, 150), shows between the disks as a darker green. 9,476 pixels change.
- `110-430`: the minus sign ends the `110`, so no space is needed.
- `5ch` is 40px in 3 characters. `40px` gives the same picture in 133.
- `solid#c0ffad`: no space before the `#`.
- Nothing is closed. `}</style>` at the end takes 141 characters, for the same picture.

## If you try it at home

In my Chrome (version 157 when this was written), the straight edges land on the same pixels as in the target. But 115,892 pixels differ from my render. 84,695 of them are navy pixels one level apart: (10, 49, 86) in my render, which is `#0a3156`, and (10, 50, 86) in the target. The target file I have is a JPEG. 1,480 pixels differ by more than 8 levels, and all of them are within 7px of an edge. The largest difference is 210 levels, at (138, 174), on the edge of the left disk: my render is green there, the target almost navy. In the target, the disks reach a little further on the left and a little less far on the right: 51 pixels on their edges switch color, all within 0.4px of the circle. On the CSS Battle judge, the code is a 100% match.
