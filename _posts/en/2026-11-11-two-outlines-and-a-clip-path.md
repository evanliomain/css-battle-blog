---
title: "Two outlines and a clip-path: a striped square in 156 characters"
lang: en
ref: 2026-11-11
permalink: /2026/11/11/two-outlines-and-a-clip-path/
description: "How a striped background, two outlines in the background green and a clip-path draw the November 11, 2026 CSS Battle target: five bars and a disc that bites into them."
target: /assets/targets/2026-11-11.png
target_url: https://cssbattle.dev/play/Qae8ETelpD2p7HlrmYRt
colors: ["#6f9893", "#2f5a76"]
player: evanliomain
chars: 156
score: 690.43
match: 100
code: |
  <style>*{margin:30 80 20;outline:5pc solid#6f9893;background:linear-gradient(#2f5a76 5ch,#6f9893 0)0/9%20%;*{margin:35 0 45 220;clip-path:circle(25vw at 5vw
---

The November 11 target is sea green, with a square of five dark blue bars. On the right, a disc of the background color bites into the bars, and a thin vertical bar stands inside it. I draw the bars with a striped background on `html`, and I hide everything around the square with a big green outline. The `body` is the vertical bar, and its own green outline, cut into a circle by `clip-path`, is the disc.

Use **Teaching colors** to tell the two outlines apart, and **Wide view** to see how far they go.

{% include animations/2026-11-11.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                          /* html first, then the body */
  margin: 30 80 20;                          /* html: 240 × 250 at (80, 30) */
  outline: 5pc solid #6f9893;                /* 80px of green around the box */
  background: linear-gradient(#2f5a76 5ch, #6f9893 0)
              0 / 9% 20%;                    /* tiles 50px tall: 40 blue, 10 green */
  * {                                        /* the body */
    margin: 35 0 45 220;                     /* 20 × 170 at (300, 65) */
    clip-path: circle(25vw at 5vw);          /* radius 100, center (320, 150) */
  }
}
```

## How it works

### 1. html: the square

`*` matches every element, `html` included. `margin:30 80 20` gives 30 on top, 80 on the left and right, 20 at the bottom. `html` goes from x = 80 to 320. In quirks mode, `html` fills the height left by its margins: 300 − 30 − 20 = 250, from y = 30 to 280.

### 2. The background: stripes everywhere

`html`'s background is painted on the whole canvas, not only on its box. But its size and position still refer to `html`'s box.

`0/9%20%` sets the tile size: 20% of 250 is 50px tall, and the first tile starts at y = 30. The gradient puts `#2f5a76` up to `5ch`, then `#6f9893`. With the 16px default font, `1ch` is 8px, so `5ch` is 40px: 40px of blue, then 10px of green, again and again. Blue bands sit at y = 30 to 70, 80 to 120, 130 to 170, and so on, above and below the square too.

### 3. An outline hides the rest

`outline:5pc solid#6f9893` draws 80px of green around `html` (`1pc` is 16px). It goes from x = 0 to 400 and from y = −50 to 360: it covers the whole canvas outside the square. Inside the square, five blue bars are left, from y = 30 to 270, then the green end of the last tile, from 270 to 280.

### 4. The body: the vertical bar

The nested `*` matches the `body`. `margin:35 0 45 220` puts it from x = 300 to 320 and, in quirks mode, from y = 65 to 235: a 20 × 170 box.

The outer `*` also gives the `body` the same background. Its tiles are 20% of 170 = 34px tall, less than the 40px of blue: the green part never shows, and the `body` is all blue. That is the vertical bar.

### 5. A second outline

The `body` gets the 80px green outline too: from x = 220 to 400 and from y = −15 to 315. I checked by giving the two outlines different colors: the `body`'s one is painted on top of `html`'s. Without `clip-path`, it would hide the right side of every bar, from x = 220.

### 6. clip-path: a disc

`clip-path` cuts everything the `body` paints, its outline included. `circle(25vw at 5vw)` is a circle of radius 100 (`25vw` of a 400px wide canvas). Its center is 20px from the `body`'s left edge (`5vw`), and the vertical position defaults to the middle: the center is at (320, 150).

What is left of the outline is a green disc from x = 220 to 400 (the canvas cuts the rest). It bites into the bars, and the blue `body` box stays inside it.

## Golf notes

- The green is never a box: it is the end of each gradient tile, `html`'s outline and the `body`'s outline.
- One `*` rule styles both boxes. The `body` turns all blue for free: its tile is shorter than the blue part of the gradient.
- `clip-path` also cuts the outline. A disc of the background color comes out of an outline, with no `border-radius` and no extra element.
- A color stop needs a unit: `5ch` is 40px in 3 characters, one less than `40px`.
- `9%` does nothing: the stripes are horizontal, so the tile width doesn't matter. I checked that `1%` renders the same. The `0` before `/` is the position, required to write a size.
- `vw` units for the circle: `25vw` and `5vw` are 100 and 20.
- No closing parenthesis, no braces: the code stops right after `5vw`.
