---
title: "Two green borders: a split ring in 140 characters"
lang: en
ref: 2026-09-01
permalink: /2026/09/01/two-green-borders/
description: "How a fixed radial gradient on the canvas and two green borders, one of them stretched six times, draw the September 1, 2026 CSS Battle target: a dark ring cut into five arcs."
target: /assets/targets/2026-09-01.png
target_url: https://cssbattle.dev/play/dxpb9nkM3OEyksSbHGOY
colors: ["#bade37", "#333"]
player: gunnar
chars: 140
score: 705.33
match: 100
code: |
  <style>*{margin:0-90 0 190;border:5vw solid#BADE37;*{background:radial-gradient(1q,#BADE37 60px,#333 0 5lh,#BADE37)fixed;scale:6 1;margin:90
---

The September 1 target is a dark ring on a bright yellow-green background, cut into five arcs: two at the top, two at the bottom, and a small one on the right. Gunnar Bittersmann's solution paints the full ring once, with a radial gradient that becomes the background of the whole canvas. Then it cuts the slits with borders of the same green: the left border of `html` makes the vertical slit, and the `body`, stretched six times in width, hides the left of the ring and makes the two horizontal slits.

Use **Teaching colors** to see the two green borders, and **Wide view** to see how far they go past the canvas.

{% include animations/2026-09-01.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* every element: html, head, style, body */
  margin: 0 -90 0 190;           /* html: x 190 → 490 */
  border: 5vw solid #BADE37;     /* 20px, the color of the background */
  * {                            /* every element inside another: the body */
    background: radial-gradient(1q, #BADE37 60px, #333 0 5lh, #BADE37) fixed;
    scale: 6 1;                  /* 6 times wider, same height */
    margin: 90;
  }
}
```

## How it works

### 1. One background for the whole canvas

The outer `*` matches every element: `html`, `head`, `style` and `body`. The nested `*` matches every element inside another one: `head`, `style` and `body`. `head` and `style` are not displayed, so only `html` and the `body` matter.

The `body` gets the gradient. Since `html` has no background, the `body`'s background is used for the whole canvas, and the `body`'s own box does not paint it. The gradient is green up to 60px from its centre, `#333` from 60px to 90px, then green again: a ring 30px thick.

`fixed` places that canvas background on the viewport, 400 × 300, so its centre is (200, 150). I checked without `fixed`: the background is then placed on the `html` box, which starts at x 190, so the ring is centred at x 340, with a second copy at x 40 because it repeats every 300px.

### 2. Why 1q

`1q` is the size of the gradient: a circle with a 0.945px ray. The color stops are in px, so they still reach 60px and 90px. The point is the last stop. With no position, it sits at 100% of the ray, 0.945px. A stop can't be before the one in front of it, so it is pulled up to 90px: a sharp outer edge. The same rule turns the `0` of `#333 0` into 60px: a sharp inner edge.

With no size, the ray would go to the farthest corner, 250px away, and the last green would sit at 250px: the ring would fade out slowly. I checked that render too.

`5lh` is 5 times the line height. Here the line height is 18px, so `5lh` is 90px.

### 3. html and its left border

`margin:0-90 0 190` reads as 0, −90, 0, 190: the minus sign starts a new number. `html` starts at x 190, and the negative right margin makes it 300 wide, up to x 490, past the right of the canvas. In quirks mode, `html` fills the viewport height: it is 300 tall.

Its border is `5vw`, 20px, in `#BADE37`, the same green as the background. It can't be seen, except where it covers the ring. Its left border, from x 190 to 210, covers the full height: it cuts the top and bottom of the ring. The other three sides only cover green.

### 4. The body: 80 × 80

The `body` also has the 20px green border, and `margin:90` (it overrides the outer margin). `html`'s content is 300 − 40 = 260 square. That leaves 260 − 180 = 80 for the `body`'s width. In quirks mode the `body` also fills its parent's height: 80 tall too. So the `body` is an 80 × 80 box at (300, 110), with a transparent 40 × 40 window in the middle, where the canvas shows.

### 5. scale:6 1

`scale:6 1` stretches the `body` six times in width, around its centre (340, 150). It now runs from x 100 to 580, and keeps its height, from y 110 to 190.

- Its left border is now 120 wide, from x 100 to 220. Between y 110 and 190, the left part of the ring stays between x 110 and 160, so it is all under it: that is the gap on the left.
- Its top border, from y 110 to 130, and its bottom border, from y 170 to 190, cross the whole ring: two horizontal slits.
- Its window runs from x 220 to 460 and from y 130 to 170. It shows the canvas, so the right side of the ring, between about x 257 and 290, stays visible there: the small arc.

## Golf notes

- One background does all the drawing. The `body`'s background goes to the canvas, and the boxes only add green.
- The borders use the same `#BADE37` as the gradient, so they are invisible except over the ring.
- `1q` is the shortest way to make the gradient ray tiny, so the last stop is pulled up to 90px and the edge is sharp.
- `#333 0`: a `0` position is pulled up to the stop before it, 60px.
- `5lh` is 90px in one character less than `90px`.
- `5vw` is 20px. The `border` shorthand does not take a unitless width: I checked that `border:20 solid#BADE37` draws no border at all.
- Unitless margins (`190`, `90`) work in quirks mode, and `0-90` needs no space.
- `scale:6 1` stretches one small box into a band 480 wide.
- No space before `#BADE37` or `fixed`, no closing braces, and `<style>` is never closed.
