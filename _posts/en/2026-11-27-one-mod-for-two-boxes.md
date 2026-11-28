---
title: "One mod() for two boxes: two merged frames and a half ring in 143 characters"
lang: en
ref: 2026-11-27
permalink: /2026/11/27/one-mod-for-two-boxes/
description: "How one rule for html and body, corner-shape:notch and a border-radius with mod(90%,183q) draw the November 27, 2026 CSS Battle target: two merged purple frames and a half ring on beige."
target: /assets/targets/2026-11-27.png
target_url: https://cssbattle.dev/play/IliOlRSdOvAmbti4hgiq
colors: ["#411c56", "#dc26"]
player: evanliomain
chars: 143
score: 702.36
match: 100
code: |
  <style>*{border:5vw solid#411c56;border-radius:95q 0 0 95q/mod(90%,183q);margin:10%100;padding:30 20 6%10}&{corner-shape:notch;background:#dc26
---

The November 27 target is beige, with a purple outline around two frames merged into one: a wide one, and a tall narrow one on its right. A purple half ring sits against the right edge, inside. I draw it with only `html` and `body`, and one rule for both. `html` is the frame: `corner-shape:notch` cuts its two left corners into straight notches. The `body` is the half ring. The same `border-radius` gives each box the corners it needs, because `mod(90%,183q)` returns a different value on a 220px box and on a 100px box.

Use **Teaching colors** to tell `html` and the `body` apart: in real colors, their right borders are one bar.

{% include animations/2026-11-27.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                         /* html and body */
  border: 5vw solid #411c56;                /* 20px, purple */
  border-radius: 95q 0 0 95q / mod(90%, 183q); /* left corners only: 89.76 × (25.09 or 90) */
  margin: 10% 100;                          /* html: 40 100; body: 13 100 */
  padding: 30 20 6% 10;                     /* html: 30 20 24 10, places the body */
}
& {                                         /* the root only: html */
  corner-shape: notch;                      /* straight notches instead of round corners */
  background: #dc26;                        /* goes to the canvas: #f1eba7 */
}
```

## How it works

### 1. html: one box

The page has no doctype, so it runs in quirks mode, where `100` means 100px. `5vw` is 5% of the 400px canvas: a 20px border.

A margin in % is always measured on the width of the parent block. For `html`, that is the 400px canvas, so `10%` is 40, on the top and the bottom. Quirks mode stretches `html` to the height of the canvas, minus its margins: 300 − 2 × 40 = 220. I measured `html` at (100, 40), 200 × 220.

### 2. The padding places the body

`padding:30 20 6%10` gives 30 at the top, 20 on the right, 10 on the left, and 6% of 400 = 24 at the bottom. Inside the 20px border, `html`'s content box goes from (130, 90) to (260, 216): 130 × 126. The `body` is laid out in that box.

### 3. body: the same rule

`*` also matches the `body`, so it gets the same border, margin and padding. Its `10%` is measured on its parent's content box this time: 10% of 130 is 13.

On the left, the margin is 100, so the `body` starts at x = 230. Its border and padding already take 20 + 10 + 20 + 20 = 70, and that does not fit with a 100px margin on each side. The content width goes down to 0, the box stays 70 wide, and the right margin is ignored. The `body` ends at x = 300, so its right border falls exactly on `html`'s right border.

Quirks mode also stretches the `body` to the height of its parent's content box: 126 − 2 × 13 = 100. I measured the `body` at (230, 103), 70 × 100.

### 4. mod(): the corners of html

`95q` is 89.76px. `border-radius:95q 0 0 95q` rounds the two left corners only, with that horizontal radius. The vertical radius comes after the `/`: `mod(90%,183q)`.

In `border-radius`, a vertical % is measured on the height of the box itself. `html` is 220 tall, so 90% is 198. `183q` is 172.91px, and 198 mod 172.91 = 25.09. The left corners of `html` are 89.76 × 25.09. When I wrote these two numbers in place of `mod()`, the render did not change.

### 5. mod(): the corners of the body

On the `body`, the same declaration gives something else. The `body` is 100 tall: 90% is 90, which is less than 172.91, so `mod()` leaves it as it is. The corners are 89.76 × 90.

That does not fit. The two left corners need 90 + 90 = 180 on a 100px side, and 89.76 on a 70px top. The browser scales all the radii by the smallest factor, 100 / 180. What is left is 49.87 × 50. The left side becomes a half circle 50px in radius, centered at (280, 153). With the 20px border, it is a half ring from 30 to 50px. I rendered the `body` alone to check: its inner hole is 30px in radius.

### 6. notch: straight cuts

`&` at the top level of the style sheet matches the root, `html`, and only it. `corner-shape:notch` keeps the size of each corner radius, but draws a straight notch instead of a curve. The two left corners of `html` lose a rectangle of 89.76 × 25.09.

What is left of the 200 × 220 box is the union of two rectangles: 100 to 300 × 65 to 235, and 190 to 300 × 40 to 260. With a border, the inner edge is the outer edge moved 20px in, so the inner notches keep the same size. The inside goes from 120 to 280 × 85 to 215, and from 210 to 280 × 60 to 240. Without `corner-shape`, the same radius draws two flat round corners.

The `body` keeps the default `corner-shape`, round: its corners stay a half ring.

### 7. The color

`#dc26` is the four-digit form of `#ddcc22` at 40% opacity. `html`'s background is used for the whole canvas. Over white, it gives #f1eba7, one unit away from the target's #f2eaa8 on each channel. The `body` has no background, so it shows the canvas.

## Golf notes

- One rule for both boxes. The `%` in `margin`, `padding` and `border-radius` gives each box its own size from the same text: 40 and 13, 220 and 100, 25.09 and 90.
- `mod(90%,183q)` is the trick: one value for the 220px box, another for the 100px box. With a large box H and a small box B, and a value h wanted on H and b on B: p = b / B, then N = p × H − h.
- The right margin of the `body` is ignored, and its width is only border and padding: no `width` needed.
- `&{…}` targets `html` alone, 2 characters, to give only the frame its notches.
- `95q` for 89.76: the notch ends 0.24px away from x = 190, and the site still gives 100%.
- `10%100`, `6%10` and `solid#411c56` need no space, and the rule is not closed.
