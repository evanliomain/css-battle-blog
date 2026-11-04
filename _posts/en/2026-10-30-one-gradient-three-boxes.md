---
title: "One gradient, three boxes: a split arch in 127 characters"
lang: en
ref: 2026-10-30
permalink: /2026/10/30/one-gradient-three-boxes/
description: "How one radial gradient, given to html, body and an h1, draws the October 30, 2026 CSS Battle target: each box sees the same ring at its own size and center."
target: /assets/targets/2026-10-30.png
target_url: https://cssbattle.dev/play/7320ZxyvTU6UikVfB8kl
colors: ["#cbcc58", "#394257"]
player: evanliomain
chars: 127
score: 719.23
match: 100
code: |
  <h1><style>*{*{margin:0 170-470;height:1440;*{margin:130 10}}background:radial-gradient(25em,#cbcc58 85%,#394257 0 100%,#cbcc58
---

The October 30 target is the top of a wide slate ring on an olive background, split in the middle by a vertical slit, with a small square right above the slit, like a keystone. I draw all three parts with one gradient. Every element gets the same `radial-gradient`, but each one paints it centered on its own box and at its own font size: on `html` it is the ring, on `body` an empty slit, on an `<h1>` the square.

{% include animations/2026-10-30.html lang=page.lang %}

## The code, spaced out

```css
<h1>                                /* a free element with a 32px font */
* {                                 /* every element */
  * {                               /* descendants: body, h1… */
    margin: 0 170 -470;
    height: 1440;
    * {                             /* one level deeper: the h1 */
      margin: 130 10;
    }
  }
  background: radial-gradient(25em, #cbcc58 85%, #394257 0 100%, #cbcc58);
}
```

## How it works

### 1. One gradient for everyone

`*` gives the same background to every element. `radial-gradient(25em, …)` has a single length as its size, so it is a circle with that radius. The stops are in %, so they scale with it:

- olive up to 85% of the radius;
- slate from 85% (the `0` snaps to the previous stop) to 100%;
- olive beyond.

On `html`, the font is 16px, so the radius is 400px and the ring goes from 340 to 400px. The background of `html` goes to the canvas.

### 2. html is 1100px tall, without a height

The gradient is centered on the box it is painted on. `html` has no `height`: it wraps its content. Its child `body` starts at y = 130 (the `h1`'s top margin, which collapses through `body`), is 1440px tall, and has a −470px bottom margin. So `html` ends at 130 + 1440 − 470 = 1100.

The ring is centered at (200, 550). Its top is at y = 150 for the outer edge and y = 210 for the inner one: that is the arch you see. The rest of the ring is far below the canvas.

### 3. body is the slit

`* *` matches every descendant, so `body`: `margin:0 170 -470` and `height:1440` make it a 60px wide strip, from (170, 130) down to y = 1570. It is painted over the canvas with its own copy of the gradient, centered on its own box: (200, 850).

From that center, every point of the canvas is more than 400px away. So inside the canvas, the `body` is plain olive: a 60px slit through the ring. Its own ring exists too, but only far below the canvas.

### 4. h1: the same ring, twice as big

`* * *` matches one level deeper: the `<h1>`. `margin:130 10` makes it a 40px wide strip inside the `body`, from (180, 130), and it keeps `height:1440`. So it has the same center as `body`: (200, 850).

An `h1` has a default font size of 2em, 32px. So for it, `25em` is 800px, and its ring goes from 680 to 800px. Its slate band would start at y = 50, but the box starts at y = 130: the top of the square is the top edge of the `h1`. The bottom is the inner edge of the ring, at y = 850 − 680 = 170.

### 5. A curve that looks straight

The bottom of the square is really an arc with a 680px radius. Over the 40px of the square, it is only 0.29px away from a straight line. That is why the `h1` is used: with the 16px font, the radius would be 340px and the curve would bend twice as much.

The 1440 is not random either: it puts the center of `body` and `h1` at y = 850, so that 850 − 680 = 170 lands exactly on the bottom of the square, and it makes `html` 1100px tall, centered at 550.

## Golf notes

- `<h1>` costs 4 characters and brings a 32px font for free: the same `25em` gives a second, bigger ring.
- No `height` on `html` and no `at` in the gradient: the size of the boxes places every center.
- The nested rules come first, so the code can end inside the gradient: no `)`, no `}`.
- `#394257 0 100%`: one color with two positions, from the previous stop to 100%.
- `25em` alone means a circle. `170-470` needs no space before the minus sign, and quirks mode accepts numbers without units.
