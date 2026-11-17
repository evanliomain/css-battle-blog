---
title: "Blue on blue: six notched pills in 151 characters"
ref: 2026-08-16
permalink: /2026/08/16/blue-on-blue/
description: "How three invisible dt boxes, their two shadows and a too-wide p in the background color draw the six notched pills of the August 16, 2026 CSS Battle target."
target: /assets/targets/2026-08-16.png
target_url: https://cssbattle.dev/play/SSYv7g49QSFpWX8VVeXf
colors: ["#6592cf", "#243d83"]
player: levito
chars: 151
score: 694.85
match: 100
code: |
  <dt><p><dt><p><dt><p><style>*{margin:.7%24%20;padding:10;border-radius:1in;background:#6592CF}dt{box-shadow:-35vh 0,35vh 0;color:243D83}p{margin:15-105
---

The August 16 target shows six dark blue pills on a lighter blue background, in two columns of three. Each pill has a round notch: the left ones open to the right, the right ones open to the left. Veit Lehmann draws them with three `dt` boxes that are the same blue as the background. Each dt casts two dark shadows, one on each side. The `p` inside each dt is stretched by negative margins until its ends lie on the shadows, and its blue background cuts the notches.

Use **Teaching colors** to see the boxes that are blue on blue, and **Wide view** to see html and body go past the bottom of the canvas.

{% include animations/2026-08-16.html lang=page.lang %}

## The code, spaced out

```css
<dt><p><dt><p><dt><p>            /* three dt, each with a p inside */
<style>
* {                              /* html, body, dt, p */
  margin: .7% 24% 20;            /* top, left and right, bottom */
  padding: 10;
  border-radius: 1in;            /* 96px: every box becomes a pill */
  background: #6592CF;           /* the canvas, and every box */
}
dt {
  box-shadow:
    -35vh 0,                     /* a copy 105px to the left */
    35vh 0;                      /* a copy 105px to the right */
  color: 243D83;                 /* no #: quirks mode accepts it */
}
p {
  margin: 15 -105                /* 15px above and below, −105px left and right */
```

## How it works

### 1. Three dt, each with a p

The HTML parser closes an open `dt` when a new `<dt>` starts. A `<p>` inside a dt stays inside it. So the six tags make three dt, one under the other in body, each with one p as its child. I checked the tree in Chrome: body > dt > p, three times. The `<style>` element ends up in the last p, but it is not displayed.

There is no doctype, so the page is in quirks mode. Numbers with no unit, like `padding:10`, are read as px. And `color:243D83` is a hex color with no `#`, which quirks mode accepts for `color`. I checked with `<!doctype html>` in front: the margins and the padding are dropped, the boxes are 0px tall, and the canvas is plain blue.

### 2. Percent margins that shrink at each level

The `*` rule gives the same margin to html, body and every dt: `.7% 24% 20`. A margin in % is a share of the width of the parent block, even on top. So each level gets smaller margins than the one before.

- html sits in the 400px canvas: 24% is 96px on the left and right, .7% is 2.8px on top. html is 400 − 2 × 96 = 208px wide.
- With 10px of padding on each side, the content of html is 188px wide. For body, 24% of 188 is 45.11px and .7% is 1.31px. body is 97.78px wide, from x = 151.11.
- The content of body is 77.78px wide. For each dt, 24% of that is 18.66px and .7% is 0.53px. Each dt is 40.47px wide, from x = 179.77 to 220.23.

On top, the margins and paddings add up: 2.8 + 10 + 1.31 + 10 + 0.53 = 24.64. The first dt starts at y = 24.64. These are the values I measured with getBoundingClientRect.

html and body are taller than the canvas. body ends at y = 304.64, html at y = 334.64. Nothing shows: the background of html paints the whole canvas, and body is the same blue.

### 3. A dt is 70px tall

The p is empty, so its height comes from its padding only: 10 + 10 = 20px. The `p` rule beats the `*` rule, so the p gets `margin:15 -105`: 15px above and below. The dt has 10px of padding, so these margins stay inside it. The dt is 10 + 15 + 20 + 15 + 10 = 70px tall.

The bottom margin of a dt is 20px, and the next top margin is 0.53px. The two margins collapse into the larger one, 20px. So the dt start at y = 24.64, 114.64 and 204.64.

### 4. Every box is a pill

`border-radius:1in` is 96px. A dt is only 40.47px wide, so the corners would overlap. Chrome then scales the radii down until they fit: 40.47 / 2 = 20.23px. Each dt becomes a pill: two half discs and two straight sides. The p is 20px tall, so its radius drops to 10px: its ends are half discs too.

I checked: with `border-radius:20.234375px` on the dt and `10px` on the p, the render is the same, pixel for pixel.

All of these boxes are #6592CF on a #6592CF canvas. Nothing is visible yet.

### 5. Two shadows per dt

A box-shadow is a copy of the box, moved by its offsets, with the same rounded corners. `35vh` is 35% of the 300px canvas height: 105px. So each dt gets a copy 105px to the left, from x = 74.77 to 115.23, and one 105px to the right, from x = 284.77 to 325.23.

The shadows have no color, so they use `currentColor`. That is `color:243D83`, set on the dt. Three dt with two shadows each: six dark pills.

### 6. The notches

`margin:15-105` reads `15` and `-105`. A negative left or right margin widens a box that has no set width. The content of the dt is 20.47px wide, and the p sticks out 105px on each side: 20.47 + 210 = 230.47px wide, from x = 84.77 to 315.23. It is 20px tall, 25px below the top of its dt.

The shadow of a box is painted with the background of that box. The p comes after its dt, so its background is painted on top of the dt's shadows. I checked with a red background on p: the red bar covers both dark pills.

On the left shadow, the bar starts at x = 84.77 with a round end and runs past the right edge of the pill, at 115.23. On the right shadow, it comes in from the left edge, at 284.77, and stops at 315.23 with a round end. Both notches are 30.47px deep and 20px tall. The rest of the bar is blue on blue.

## Golf notes

- `<dt>` is a two-letter tag that closes itself when the next one starts, and it can hold a p. With `<dd>` and `dd{`, the code is the same length and renders the same.
- One `*` rule gives the margin, the padding, the radius and the color to html, body, dt and p at once. The percent margins do the centering, level after level.
- The `%` signs end the numbers, so `.7%24%20` needs no spaces. With spaces, the code is 153 characters.
- `.7%` moves everything down by 4.64px over three levels, in 3 characters. With `margin:0 24%20` (150 characters), every pill starts at y = 20 instead of 25.
- `35vh` is 105px in 4 characters. With `105px`, the code is 153 characters.
- `1in` is 96px in 3 characters, and needs a unit. `border-radius:99` is dropped: the pills and the notches get square corners.
- `color:243D83` needs no `#` in quirks mode. With `#243D83`, the code is 152 characters and renders the same.
- The minus sign separates the values in `15-105`. With a space, the code is 152 characters.
- The `</style>` and the last closing brace are left out. With `}`, the code is 152 characters; with `}</style>`, 160. It renders the same.

## If you try it at home

In my Chrome (version 157 when this was written), the straight edges land on the same pixels as in the target. But 1,411 pixels differ from my render. 681 of them differ by more than 8 levels, and all of these are on the rounded edges of the pills and the notches. The largest difference is 69 levels, at (89, 51), on the round end of the top left notch: my render is almost dark blue there, (44, 72, 141), and the target almost light blue, (97, 141, 202). 346 more pixels, away from the pills, differ by one level. They trace the outlines of body and of the three dt, which are the same blue as the canvas; in the target, that area is flat. On the CSS Battle judge, the code is a 100% match.
