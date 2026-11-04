---
title: "Four stretched corners: a down arrow in 117 characters"
lang: en
ref: 2026-10-11
permalink: /2026/10/11/four-stretched-corners/
description: "How a radial gradient sliced into tiny corners and stretched over the whole canvas draws the October 11, 2026 CSS Battle target, with body as the arrow's shaft."
target: /assets/targets/2026-10-11.png
target_url: https://cssbattle.dev/play/Fq5TIqZggu5mqVHldcND
colors: ["#d16161", "#3f4869", "#fae29e"]
player: evanliomain
chars: 117
score: 731.15
match: 100
code: |
  <style>*{*{margin:40 185 80}border-image:.1%.67%1/80%60%40%radial-gradient(#d16161 70.1vw,#3f4869 0 99.279%,#fae29e 0
---

The October 11 target is an arrow pointing down on a cream background: a red shaft, and a navy V at the bottom with a red triangle in its hollow. I draw it without a single background or shape. One `border-image` takes the four tiny corners of a radial gradient, a few pixels each, and stretches them until they cover the canvas. Near the corner of the image, the gradient's circles look like straight lines, and stretched, they become the slanted sides of the V. On `body`, the same `border-image` is plain red: the shaft.

{% include animations/2026-10-11.html lang=page.lang %}

## The code, spaced out

```css
* {                          /* html, and body too */
  * {                        /* body only */
    margin: 40 185 80;
  }
  border-image:
    .1% .67% 1 /             /* slices: 0.3px, 2.68px, 1px on html */
    80% 60% 40%              /* widths: too big, scaled down together */
    radial-gradient(
      #d16161 70.1vw,        /* red up to 280.4px */
      #3f4869 0 99.279%,     /* a thin navy ring */
      #fae29e 0              /* cream beyond */
    );
}
```

## How it works

### 1. A gradient that is almost all red

On `html`, the border image is the size of the canvas, 400 × 300. A radial gradient with no size is an ellipse that goes through the four corners: its horizontal radius is 200 × √2 ≈ 282.8px. The stops are measured along that radius:

- red up to `70.1vw`, which is 280.4px (1vw = 4px);
- navy from there to 99.279% of 282.8px, about 280.8px: a ring less than half a pixel thick;
- cream beyond, which only happens in the last few pixels of each corner.

Seen whole, the image is a red rectangle with specks in its corners.

### 2. Tiny slices

`.1% .67% 1` cuts the image into nine pieces: 0.1% of 300 = 0.3px at the top, 0.67% of 400 = 2.68px on each side, and 1px at the bottom (a plain number is in image pixels). So the four corner pieces are tiny: 2.68 × 0.3 at the top, 2.68 × 1 at the bottom.

Seen up close, the bottom-left piece holds a bit of everything. At that scale, the edges of the ellipse are almost straight lines that drop 3px for every 4px across: cream in the very corner, the navy ring, then red.

### 3. Four corners cover the canvas

`80% 60% 40%` sets the border widths: 80% of the height at the top, 60% of the width on each side, 40% of the height at the bottom. That is 120% of the height and 120% of the width, more than the box. When opposite widths overlap, the browser scales all of them down by the same factor, here 1 / 1.2:

- top: 200px, bottom: 100px (together, the full 300px height);
- left and right: 200px each (together, the full 400px width).

So the four corners tile the canvas exactly: two 200 × 200 squares at the top, two 200 × 100 rectangles at the bottom. The edges and the middle get no room at all. There is no background anywhere: the cream comes from the gradient.

### 4. The bottom corners draw the V

Each bottom piece, 2.68 × 1, is stretched to 200 × 100: about ×74.6 across and ×100 down. The lines that dropped 3 for 4 now drop about 1 for 1: they turn into slants at 45°. In the bottom-left quarter, that gives cream, then a navy band, then red; the bottom-right quarter is its mirror image. Together they draw the navy V and the red triangle in its hollow.

The V is cut flat at y = 200 for free: that is where the bottom corners start.

The ring is magnified about a hundred times, so the stops must be precise. Moving a stop by 0.01px moves the edge of the V by about 1px, hence `99.279%`.

### 5. The top corners draw the cream

The top pieces are only 0.3px tall, at the very corner, outside the ring: almost all cream. Stretched to 200 × 200, they fill the top of the canvas. Only their inner corner reaches the navy ring, which leaves a thin navy spike above the V, around x = 200.

### 6. body is the shaft

The outer `*` gives the same `border-image` to `body`. The nested `*` matches `body` alone and gives it `margin:40 185 80` (CSS Battle runs in quirks mode, so no units needed): 400 − 2 × 185 = 30px wide, and 300 − 40 − 80 = 180px tall, at (185, 40).

On a 30 × 180 box, the ellipse's horizontal radius is only 15 × √2 ≈ 21px. Red up to 280.4px covers the whole image. The navy stop, 99.279% of 21px, comes before that, so it snaps to 280.4px and the ring has no room. The widths are scaled the same way and the four corners fill the box: a plain red bar. It goes from y = 40 down to y = 220, into the red triangle, and covers the navy spike.

## Golf notes

- No `background`, no `box-shadow`: two border images draw everything.
- When the widths overflow, only their ratio matters. `80%60%40%` gives the same result as any other trio in the same ratio that overflows, in 9 characters.
- `70.1vw` is 280.4px in 6 characters. A length stop is the same on both boxes, while the `%` stop depends on the box: that is what makes the ring vanish on `body`.
- `.1%.67%1` and `80%60%40%radial-gradient` need no spaces.
- The gradient's closing `)` and `<style>`'s closing tag are left out.
