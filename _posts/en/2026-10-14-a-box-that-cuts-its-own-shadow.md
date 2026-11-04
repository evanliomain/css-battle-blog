---
title: "A box that cuts its own shadow: a tank top in 136 characters"
lang: en
ref: 2026-10-14
permalink: /2026/10/14/a-box-that-cuts-its-own-shadow/
description: "How a zoomed html box, two shadows and a rounded body draw the October 14, 2026 CSS Battle target, a tank top."
target: /assets/targets/2026-10-14.png
target_url: https://cssbattle.dev/play/9Jb2WkWC0UuypaJYNpPo
colors: ["#9f6766", "#bde4c1"]
player: benjamintordjman
chars: 136
score: 709.43
match: 100
code: |
  <style>*{background:#9F6766;border-radius:2q;margin:-6 54 30-14;zoom:5;box-shadow:72q 0#9F6766,9mm 6vh 0-2px#BDE4C1;*{margin:0-3.8.8 9.8
---

The October 14 target is a mint green tank top on a dusty pink background: a wide body, two straps, a round U-shaped neckline between them, and two small rounded cuts at the shoulders. Benjamin Tordjman draws it with `html` and `body` only. The green is a shadow of `html`, and every cut is a pink box: `html`'s own box for the left shoulder, a pink shadow for the right one, and a rounded `body` for the neckline.

{% include animations/2026-10-14.html lang=page.lang %}

## The code, spaced out

```css
* {                              /* html, then body */
  background: #9F6766;
  border-radius: 2q;
  margin: -6 54 30 -14;
  zoom: 5;                       /* html ×5, body ×25 */
  box-shadow:
    72q 0 #9F6766,               /* on top: the right cut */
    9mm 6vh 0 -2px #BDE4C1;      /* below: the green shape */
  * {                            /* body (head stays hidden) */
    margin: 0 -3.8 .8 9.8;
  }
}
```

## How it works

### 1. html, five times bigger and mostly off the canvas

`zoom:5` multiplies every length of `html` by 5. Its margins become −30, 270, 150 and −70, and its corner radius 2q (1.89px) becomes 9.45px.

In quirks mode, which CSS Battle uses, `html` is as tall as the page minus its margins. That gives a box of 400 − 270 + 70 = 200 by 300 + 30 − 150 = 180, at (−70, −30). Only its bottom right part is on the canvas, down to (130, 150).

The background of `html` is painted on the whole canvas, so the box itself shows nothing. But it is still there, and it matters for the shadows.

### 2. The green shadow, and the left shoulder

`9mm 6vh 0 -2px` is, after the zoom, an offset of 170.08px to the right and 90px down (6vh is 18px), with a spread of −10px. The 200 × 180 box shrinks to 180 × 160 and lands at (110, 70): the whole tank top.

Its corners are square: a shadow's radius is the box radius plus the spread, and 9.45 − 10 is below zero.

An outer shadow is never painted under its own box. The bottom right corner of `html`'s box sits at (130, 150), right on the green, so the green is missing above and left of it. That is the left cut, and because `html`'s corner is rounded, the cut's corner is too.

### 3. The pink shadow, and the right shoulder

`72q 0` moves a copy of the box 340.16px to the right (72q is 68.03px, ×5), in the background color. It covers x 270 to 470 and y −30 to 150. Shadows are painted in reverse order, so the first one in the list is on top of the green: it hides the green above y 150 and right of x 270. Its bottom left corner is rounded too. That is the right cut, a mirror of the left one.

### 4. body, twenty-five times bigger

`*` also matches `body`, which gets `zoom:5` on top of `html`'s: ×25. The nested rule gives it `margin:0-3.8.8 9.8`, which reads `0 -3.8 .8 9.8`, so 0, −95, 20 and 245 after the zoom.

- Width: 200 − 245 + 95 = 50px, from x 175 to 225.
- Height: in quirks mode `body` stretches to the height of `html` minus its margins: 180 − 20 = 160px, from y −30 to 130.

### 5. A radius too big for the box: the U

On `body`, `2q` becomes 47.25px. Two of those don't fit across a 50px box, so the browser scales all the radii down until they do: 25px. The bottom of the box becomes a half circle, and the top is off the canvas. `body` has the pink background, painted over `html`'s shadows: that is the neckline.

`body` also gets the two shadows, but at ×25 they move 1700px and 850px away. They never reach the canvas.

## Golf notes

- One rule for both elements: the zoom stacks to ×25 on `body`, which turns the same small radius into a half circle.
- The left cut costs nothing: it is the shadow's own box, hidden under itself.
- `72q` and `9mm` are 340.16 and 170.08px after the zoom, a hair off 340 and 170, and 2 characters shorter than `68px` and `34px`. CSS Battle scores it as a 100% match.
- `0-3.8.8 9.8`: numbers glue together. A minus sign ends a number, and so does a second dot.
- `6vh` is 18px in 3 characters.
- `<style>` is never closed.
