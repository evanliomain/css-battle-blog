---
title: "Eight corners, one gradient: a bench in 149 characters"
lang: en
ref: 2026-11-07
permalink: /2026/11/07/eight-corners-one-gradient/
description: "How a conic gradient copied into the corners of a border-image draws the November 7, 2026 CSS Battle target: a cream bench with two black feet and two black squares on top."
target: /assets/targets/2026-11-07.png
target_url: https://cssbattle.dev/play/QYh1So3F1gjsyf4gTzmp
colors: ["#0000", "#000", "#469e6c", "#f2f1e0"]
player: evanliomain
chars: 149
score: 696.67
match: 100
code: |
  <style>*{border-image:conic-gradient(at 33%83%,#0000 25%,#000 0)1e3/64Q;margin:105 110-130;background:#469e6c;*{margin:70-60;box-shadow:0-50px#f2f1e0
---

The November 7 target looks like a bench seen from the front, on a green background: a wide cream band, two small black squares on top of it, and two black L-shaped feet under it. I draw all the black parts with one `border-image`. Its image is a conic gradient that makes a black L. A slice bigger than the image puts a whole copy of it in each corner of `html` and of the `body`: eight Ls, and four of them show. A shadow of the `body` draws the band and hides the bottom of the two upper Ls.

Use **Wide view** to see the Ls that end up below the canvas, and **Teaching colors** to tell `html`'s corners from the `body`'s.

{% include animations/2026-11-07.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html and body */
  border-image:
    conic-gradient(at 33% 83%, #0000 25%, #000 0)   /* a black L */
    1e3 / 64Q;                       /* the whole image in each 60.47px corner */
  margin: 105 110 -130;              /* html: 180 × 325 */
  background: #469e6c;               /* goes to the canvas */
  * {                                /* body */
    margin: 70 -60;                  /* 300 × 185 */
    box-shadow: 0 -50px #f2f1e0;     /* the cream band */
  }
}
```

## How it works

### 1. html is a 180 × 325 box

`*` matches every element: `html` and the `body` (and `head` and `style`, which are not displayed). The nested rule then gives the `body` its own margin and its shadow. `html` keeps `margin:105 110 -130`: 105 at the top, 110 on the sides, −130 at the bottom. Its width is 400 − 2 × 110 = 180px. CSS Battle runs in quirks mode, where `html` fills the window minus its top and bottom margins: 300 − 105 + 130 = 325px. So `html` goes from (110, 105) to (290, 430), far below the canvas.

Its background, `#469e6c`, goes to the whole canvas. The `body` gets the same green, which hides nothing here.

### 2. A conic gradient draws an L

`conic-gradient(at 33% 83%, #0000 25%, #000 0)` turns around a point 33% from the left edge and 83% from the top. It starts pointing up and goes clockwise. The first quarter, from up to right, is `#0000`: transparent. The `0` of `#000 0` starts black right where the transparent part ends, and black runs all the way round.

So the top-right quarter around the point is transparent, and everything to the left of the point or below it is black. That is an L, with a vertical bar 33% wide and a horizontal bar 17% tall.

### 3. A slice bigger than the image: the whole image in each corner

A `border-image` cuts its image into nine pieces with four slices, then puts the four corner pieces in the corners of the element, stretches the edges and drops the centre. `1e3` asks for slices of 1000px, more than the image's size. Slices that big count as 100%. Each corner piece is then the whole image, and the edges and the centre are empty. I checked it: the render with `100%` is identical, pixel for pixel.

`/64Q` sets the width of the border image. The element has no border at all, but the border image is still drawn on that width. 64 quarter-millimetres are 60.47px. Each corner of `html` gets a 60.47px copy of the L, with bars of 20 and 10 pixels. The top two are at x = 110 and x = 229.5, y = 105. The bottom two are at y = 369.5, below the canvas.

### 4. The body: two feet

The nested `*{…}` matches the `body`. `margin:70 -60` takes 70px at the top and the bottom and adds 60px on each side. The `body` is 180 + 2 × 60 = 300px wide, from x = 50 to 350. In quirks mode, it fills `html` minus its own margins: 325 − 2 × 70 = 185px tall, from y = 175 to 360.

The outer `*` gives the `body` the same `border-image`: four more Ls of 60.47px. The top two are the feet, at (50, 175) and (289.5, 175). The bottom two start at y = 299.5: nothing of them shows on the canvas.

### 5. A shadow of the body makes the band

`box-shadow:0 -50px #f2f1e0` is a copy of the `body`, moved 50px up, with no blur. An outer shadow is never painted under its own box, so only the strip above the box shows: a cream band of 300 × 50, from y = 125 to 175.

The `body` is painted after `html`, and its shadow covers `html`'s two upper Ls from y = 125 down. Of each L, only the top of the vertical bar is left: a 20 × 20 black square, at x = 110 and x = 230.

## Golf notes

- One `border-image` on `*` draws eight Ls: four per element. Four of them show, two as feet and two as squares.
- `1e3` is 3 characters. Any slice at least as big as the image gives the same result, and `100%` is 4 characters.
- `64Q` is 60.47px in 3 characters.
- The shadow can lose one more character: `0-53q` instead of `0-50px`. 53 quarter-millimetres are 50.08px, so the band starts 0.08px higher, and the site still gives 100%. That makes 148 characters.
- The width after `/` draws the border image without any `border`.
- `#0000` is transparent in 5 characters. `#000 0` starts the black where the transparent part ends.
- The shadow does two jobs: it draws the band, and it cuts `html`'s Ls down to squares.
- `110-130`, `70-60` and `0-50px#f2f1e0` need no spaces: the minus sign and the `#` end the token before.
- No closing braces, and `<style>` is never closed.
