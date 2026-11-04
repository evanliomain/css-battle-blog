---
title: "One inset shadow, two boxes: a hanging sign in 129 characters"
lang: en
ref: 2026-10-13
permalink: /2026/10/13/one-inset-shadow-two-boxes/
description: "How one inset shadow, shared by html and body, and one gradient centered by html's box draw the October 13, 2026 CSS Battle target."
target: /assets/targets/2026-10-13.png
target_url: https://cssbattle.dev/play/Hj6qgfMNxubgoTcYhOLe
colors: ["#a27848", "#173c46"]
player: evanliomain
chars: 129
score: 716.98
match: 100
code: |
  <style>*{margin:40 20-40;box-shadow:inset 0 0 0 32Q#a27848;*{margin:0 165 230}background:radial-gradient(7Q 4Q,#bc37 35vw,#173c46
---

The October 13 target looks like a sign hanging from a gallows: a brown frame open at the bottom, a short stem down from the middle of the top bar, and a big pale yellow ellipse under the stem, on a dark teal background. I draw it with `html` and `body` only. One inset shadow, given to both, makes the frame on one and the stem on the other, and one gradient on the canvas makes the ellipse.

{% include animations/2026-10-13.html lang=page.lang %}

## The code, spaced out

```css
* {                                   /* html and body */
  margin: 40 20 -40;
  box-shadow: inset 0 0 0 32Q #a27848;
  * {                                 /* children: head (hidden) and body */
    margin: 0 165 230;
  }
  background:                         /* still part of the outer * rule */
    radial-gradient(7Q 4Q, #bc37 35vw, #173c46);
}
```

## How it works

### 1. html's box hangs below the canvas

`margin:40 20-40` puts `html` at (20, 40), 400 − 2 × 20 = 360px wide. CSS Battle renders in quirks mode, where `html` is as tall as the page minus its margins: 300 − 40 + 40 = 300px. So the box runs from y = 40 to y = 340, and its last 40px are below the canvas.

The negative bottom margin does two things at once: it hides the bottom of the box, and it keeps the box 300px tall, which puts its center at (200, 190). That center is used by the gradient.

### 2. The gradient goes to the canvas, but keeps html's tile

The `background` comes after the nested `*{…}` rule, but it still belongs to the outer `*`: a declaration after a nested rule applies to the parent selector. So `html` gets it.

The background of `html` is painted on the whole canvas, not just on its box. But the tile it is drawn in is still `html`'s box, 360 × 300 at (20, 40). The gradient is centered in that tile, at (200, 190).

`radial-gradient(7Q 4Q, …)` is an ellipse with radii of 7Q and 4Q (6.6 and 3.8px). Those tiny radii only set the shape: 7 wide for 4 tall. The stop at `35vw` (140px) is measured along the horizontal radius, so the ellipse edge is 140px across and 140 × 4/7 = 80px up and down: a 280 × 160 ellipse, from x 60 to 340 and y 110 to 270. `#173c46` has no position, so it snaps to 140px and the edge is sharp.

### 3. #bc37 over white

`#bc37` is `#bbcc33` at 47% opacity. Nothing is painted under the canvas background except the white page, so the ellipse is that olive mixed with white: about `#dfe7a0`, the pale yellow of the target. Outside the ellipse, `#173c46` is opaque.

### 4. The inset shadow draws the frame

`box-shadow:inset 0 0 0 32Q` paints a band of 32Q (30.24px) inside the edges of `html`'s box: a frame. The top bar is at y 40 to 70, the sides at x 20 to 50 and 350 to 380. The bottom bar sits at y 310 to 340, off the canvas, so what you see is a Π.

### 5. body gets the same shadow: the stem

The nested `*` matches the children of `html`: `head` (hidden) and `body`. It comes later than the outer rule, with the same weight, so `body` takes `margin:0 165 230`:

- 360 − 2 × 165 = 30px wide, from x 185 to 215;
- in quirks mode `body` is stretched to the height of `html` minus its margins: 300 − 230 = 70px, from y 40 to 110.

`body` also matches the outer `*`, so it gets the same inset shadow. On a 30px-wide box, a 30.24px band from each side leaves no hole: the box is filled with brown. That is the stem, and it stops at y = 110, right on top of the ellipse.

`body` gets the gradient too, drawn in its own box this time. All of its 30 × 70 box is inside the 140px ellipse, so it is a flat `#bc37`, and the shadow covers it completely.

## Golf notes

- One shadow, two shapes: a frame on a wide box, a solid bar on a box narrower than twice the shadow.
- `7Q 4Q` sets the ellipse ratio in 5 characters, and the stop in `35vw` sets its size.
- `#bc37` (5 characters) lets the white page lighten the olive, instead of `#e0e7a2` (7).
- `32Q` is 30.24px, one character shorter than `30px`. In my local render, the inner edges of the frame come out faintly tinted (706 pixels), but CSS Battle scores the solution as a 100% match.
- `margin:40 20-40` needs no units (quirks mode) and no space before the minus sign. `32Q#a27848` needs no space either.
- No `;` after `}`, and neither `<style>` nor the gradient are closed.
