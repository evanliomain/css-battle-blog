---
title: "One border-image, used twice: an envelope in 157 characters"
lang: en
ref: 2026-09-19
permalink: /2026/09/19/one-border-image-used-twice/
description: "How one border-image, cut in nine on html and clipped to a diamond on the body, draws the September 19, 2026 CSS Battle target: an envelope in an orange disc."
target: /assets/targets/2026-09-19.png
target_url: https://cssbattle.dev/play/LXVlYbdUHfOS5mrqkEh0
colors: ["#485993", "#ffa173"]
player: beo
chars: 157
score: 689.58
match: 100
code: |
  <style>*{background:#485993;border-image:radial-gradient(1q,#FFA173,125px,#0000)110 25%/auto;*{margin:-71 4 80;clip-path:polygon(50%45%,73%62%,50%244q,27%62%
---

The September 19 target is an orange disc on a blue background, with a blue envelope in it: a rectangle, a triangular flap above it, and an orange V inside. Beo's solution gives `html` and the `body` the same `border-image`, an orange disc. On `html`, the middle piece of that image is never painted, which leaves the blue rectangle. The `body` sits higher, with its own disc and its own hole, and a `clip-path` keeps only a diamond of it: the flap and the V.

{% include animations/2026-09-19.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                      /* html, then the body */
  background: #485993;
  border-image:
    radial-gradient(1q, #FFA173, 125px, #0000)  /* an orange disc, r = 125 */
    110 25% / auto;                      /* cut in nine, middle left out */
  * {                                    /* the body */
    margin: -71 4 80;                    /* x 4 → 396, y −71 → 220 */
    clip-path: polygon(50% 45%, 73% 62%, 50% 244q, 27% 62%);  /* a diamond */
  }
}
```

## How it works

### 1. A gradient disc

`*` gives every element a blue background and a `border-image`. A `border-image` draws an image around the box, in its border area.

The image is `radial-gradient(1q,#FFA173,125px,#0000)`: a circle of radius `1q` (0.94px), centred. The stops go further than that radius. Orange comes first, `125px` alone is a transition hint, and the transparent stop, at the end of the 0.94px circle, is pulled up to 125px. So the color stays orange up to 125px, then turns transparent at once: a sharp disc of radius 125. On `html`, the image is as big as its box, 400 × 300, so the disc runs from x = 75 to 325 and from y = 25 to 275.

### 2. Cut in nine, no middle

`110 25%` is the `border-image-slice`: it cuts the image 110px from the top and the bottom, and 25% of 400 = 100px from the left and the right. That makes nine pieces: four corners, four edges, and the middle.

`/auto` is the border width: for each side, the size of its piece, so 110px at the top and bottom, 100px on the sides. Each piece lands at its own place, at the same size. The middle piece is only painted with the `fill` keyword, and there is none here. So in the middle, from x = 100 to 300 and y = 110 to 190, `html`'s blue background shows through the disc: the body of the envelope.

`html` has no `border-style`, but a `border-image` with `auto` widths does not need one: I checked that it still draws.

### 3. The body, higher up

The nested `*` matches the `body`, which gets the same blue background and the same `border-image`. `margin:-71 4 80` places it from x = 4 to 396. Its top is 71px above the canvas, at y = −71. In quirks mode it fills the page height minus its margins: 300 + 71 − 80 = 291, so it ends at y = 220.

Its `border-image` is sized to its own box. Its disc is centred at (200, 74.5), and its middle piece, also left out, shows its blue background from y = 39 to 110 (110px under the top, 110px above the bottom). Unclipped, the `body` would hide the top of the picture.

### 4. A diamond of body

`clip-path:polygon(50%45%,73%62%,50%244q,27%62%)` keeps only the part of the `body` inside a diamond. The % are taken from the `body`'s box, 392 × 291:

- `50% 45%`: (200, 59.95), the top point;
- `73% 62%`: (290.16, 109.42), the right point;
- `50% 244q`: (200, 159.6), the bottom point (`244q` is 230.6px);
- `27% 62%`: (109.84, 109.42), the left point.

The top half of the diamond falls in the `body`'s blue hole: a blue triangle, the flap. The bottom half falls in the `body`'s disc: an orange V, painted on the blue rectangle of `html`.

## Golf notes

- One `border-image` written once draws both the disc with its blue rectangle and the flap with its V: it is just painted on two boxes of different sizes.
- Leaving out `fill` is free: the middle piece is skipped, and the background shows the rectangle.
- `110 25%/auto` sets the slices and the border widths in one go, with no `border` property.
- A transition hint, `125px`, plus a stop pulled up to it, make a sharp disc with a single length.
- `clip-path` cuts four points out of the `body`: no extra element for the flap.
- No closing braces, and `<style>` is never closed.
