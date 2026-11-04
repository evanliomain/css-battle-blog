---
title: "One disc, four corners: a framed panel in 123 characters"
lang: en
ref: 2026-10-19
permalink: /2026/10/19/one-disc-four-corners/
description: "How two shared borders and a body background handed to the canvas draw the October 19, 2026 CSS Battle target, with one disc split over four corners."
target: /assets/targets/2026-10-19.png
target_url: https://cssbattle.dev/play/2pAGX40Ie74ziGcixMUI
colors: ["#e8ba79", "#d93a", "#7e6293"]
player: koda_pig
chars: 123
score: 723.86
match: 100
code: |
  <style>*{border:5vw solid#E8BA79;margin:-5%24;*{margin:70 36;background:radial-gradient(1q,#D93A 60px,#7E6293)277%50vh/25pc
---

The October 19 target is a sand-colored frame on a plum background, with a bar on each side and a quarter disc in each corner. koda_pig draws it with one border rule shared by `html` and `body`, and a single background. The background is written on `body`, but it ends up on the canvas, slid so that the four corners each get a quarter of the same disc.

{% include animations/2026-10-19.html lang=page.lang %}

## The code, spaced out

```css
* {                                /* html (and the hidden head, style) */
  border: 5vw solid #E8BA79;       /* 20px */
  margin: -5% 24;                  /* -20px 24px */
  * {                              /* body */
    margin: 70 36;
    background:
      radial-gradient(1q, #D93A 60px, #7E6293)
      277% 50vh / 25pc;            /* 25pc = 400px */
  }
}
```

## How it works

### 1. html's border: two bars

`*` gives `html` a 20px border (`5vw`, 5% of 400). Its margin is `-5% 24`. A percentage margin is always a share of the width, even at the top and bottom: −5% of 400 is −20px.

CSS Battle renders in quirks mode, where `html` fills the page height minus its margins: 300 + 20 + 20 = 340px. So the `html` box runs from y=−20 to y=320, and from x=24 to 376. Its top and bottom borders fall just outside the canvas. Only the left and right ones show: two 20px bars, full height, at x=24 and x=356.

### 2. body's border: the frame

The nested `*` matches the children of `html`. `head` stays hidden, so it is `body`. It gets the same 20px border from the outer rule, and `margin:70 36` places it inside `html`'s content box (x 44, y 0): a 240×160 box at (80, 70). Its border is the frame, with a 200×120 hole.

### 3. body's background goes to the canvas

Only `body` has a background. When `html` has none, the browser uses the `body`'s background for the whole canvas instead, and does not paint it again inside `body`. That is why the hole of the frame shows the same plum as the rest.

There is a catch: that background is laid out on `html`'s box, not on `body`'s. Its positioning area is `html`'s padding box, the 312×300 area inside its border, starting at x=44.

### 4. A circle with a sharp edge

`radial-gradient(1q, #D93A 60px, #7E6293)`:

- `1q`, a single length, makes it a circle (its radius is a quarter millimetre, about 0.95px).
- `#D93A` up to 60px: the disc.
- `#7E6293` has no position, so it would sit at 100% of the radius, 0.95px. A stop can't come before the previous one, so it is pulled up to 60px: a sharp edge.

`#D93A` is `#dd9933` at 67% opacity. Over the white page behind the canvas, it comes out as `#e8bb77`, one or two units away from the frame's `#e8ba79`.

### 5. 277% 50vh: one disc on four corners

`/25pc` sets the tile width to 400px; the height stays `auto`, which for a gradient means the height of the area, 300px. So each tile is exactly the size of the canvas, with the disc in its middle.

- **x**: a percentage position is a share of (area − tile) = 312 − 400 = −88px. 277% of that is −243.8px, so the tile starts at 44 − 243.8 = −199.8. The disc centers land at x=0.2 and x=400.2.
- **y**: the area and the tile are both 300px tall, so any percentage gives 0. A length is needed: `50vh` moves the tile 150px down, and the disc centers land at y=0 and y=300.

The tile repeats, so four copies of the disc have their centers on the four corners of the canvas. Each shows a quarter, of radius 60. The bars of `html` are painted on top, in nearly the same color.

## Golf notes

- One `border` for two jobs: on `html` it is two bars (the rest runs off the canvas), on `body` it is the frame.
- `body`'s background goes to the canvas for free, and the frame's hole shows it.
- One tile of 400×300 puts the same disc on all four corners.
- `1q` is the shortest way to say `circle`, and it makes the last stop sharp without a trailing `0`.
- `#D93A` (5 characters) stands in for `#e8ba79` (7), close enough over the white page.
- `-5%24`, `277%50vh` and `solid#E8BA79` need no spaces.
- `5vw` (20px) and `25pc` (400px): unitless numbers work for `margin` in quirks mode, but not inside the `border` and `background` shorthands.
