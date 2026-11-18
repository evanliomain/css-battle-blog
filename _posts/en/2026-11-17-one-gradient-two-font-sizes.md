---
title: "One gradient, two font sizes: a wave in 112 characters"
lang: en
ref: 2026-11-17
permalink: /2026/11/17/one-gradient-two-font-sizes/
description: "How one radial-gradient shared by html and the body, font:37%a and margin:0 37 75 draw the November 17, 2026 CSS Battle target: a mustard wave of three half rings on dark green."
target: /assets/targets/2026-11-17.png
target_url: https://cssbattle.dev/play/v4vfHaiNnku33Bu4ZxoO
colors: ["#1a4341", "#998235"]
player: evanliomain
chars: 112
score: 737.55
match: 100
code: |
  <style>*{background:radial-gradient(1q,#1a4341 5vh,#998235 0 45px,#1a4341)4%0/55em 75vw;margin:0 37 75;font:37%a
---

The November 17 target is dark green, with a mustard wave in the middle: three half rings of the same size, end to end. An arch up on the left, a dip down in the middle, an arch up on the right. I draw it with one rule and no tag besides `<style>`. `html` and the `body` get the same ring gradient, but `font:37%a` gives them two different font sizes, so `55em` makes two tile sizes: one ring on the canvas, a row of rings in the body.

The **teaching colors** show the body's background and rings apart from the canvas ring, and the **wide view** shows where the ring goes when the tile is too wide.

{% include animations/2026-11-17.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* html and the body */
  background:
    radial-gradient(1q, #1a4341 5vh, #998235 0 45px, #1a4341)  /* a ring, radii 15 and 45 */
    4% 0 / 55em 75vw;        /* tile 325.6 × 300 on html, 120.47 × 300 on the body */
  margin: 0 37 75;           /* html 326 × 225, body 252 × 150 */
  font: 37% a;               /* 5.92px on html, 2.19px on the body */
}
```

## How it works

### 1. A ring in a gradient

`*` targets `html`, `head`, `style` and the `body`. `head` and `style` are not displayed: only `html` and the `body` count, and both get the same background.

`radial-gradient(1q, …)` is a circle with a radius of `1q` = 0.945px. That size doesn't matter: the color stops are fixed lengths, and they go well past it. Green up to `5vh` = 15px. Then `#998235 0 45px`: mustard from 0, which means right where the previous stop ends, so from 15px with a hard edge, up to 45px. Then green again. Each tile has a mustard ring with radii 15 and 45, at its center.

### 2. Tiles sized by the font

`/ 55em 75vw` sets the tile size. `75vw` is 75% of 400 = 300, the frame's height. `55em` depends on the element's font size. At the default 16px it would be 880, much too wide: the ring would go far off the frame.

### 3. `font:37%a`: two sizes from one value

The `font` shorthand needs a family: `a` is enough, and there is no need for a space after `%`. A font size in % is relative to the parent's, so it compounds. `html` gets 37% of 16 = 5.92px, and its tile is 55 × 5.92 = 325.6 wide. The `body` gets 37% of 5.92 = 2.19px, and its tile is only 120.47 wide. The same `55em` gives a wide tile to one and narrow tiles to the other.

### 4. `margin:0 37 75`: two boxes

In quirks mode, the margins work without units. `html` is 400 − 2 × 37 = 326 wide. In quirks mode it also fills the frame's height minus its margins: 300 − 75 = 225. The `body` gets the same margins inside it: 326 − 74 = 252 wide, from x = 74, and 225 − 75 = 150 tall, from y = 0.

`html`'s background goes to the canvas and covers the whole frame, but its tiles start from `html`'s box, at x = 37. Its ring is centered at 37 + 325.6 / 2 = 199.8, and at y = 150. The tiles next to it put their rings at 199.8 ± 325.6, off the frame. The `body` keeps its own background on its box, in tiles of 120.47.

### 5. `4%0`: the position

A position in % is a percentage of the gap between the box and the tile. For `html`, 4% × (326 − 325.6) = 0.016: nothing moves. For the `body`, 4% × (252 − 120.47) = 5.26. Its tiles start at 74 + 5.26, and its rings are centered at 139.5 and 260. The ring of the tile before it ends at x = 64, and the one after it starts at x = 335.4: both are outside the body's box. `0` is the vertical position: the rings stay at y = 150 in both cases.

### 6. Three half rings

The `body` stops at y = 150, right on the center of its rings: only their top halves show, two arches. The `body` also covers the top of the canvas ring. Only its bottom half is left below y = 150: the dip. Its two sides go from 154.8 to 184.8 and from 214.8 to 244.8, and the feet of the arches from 154.5 to 184.5 and from 215 to 245: they meet within 0.3px.

## Golf notes

- One `*` rule gives the same background to `html` and the `body`. A font size in % compounds, so `55em` gives two tile sizes: one ring on the canvas, two in the body.
- The ring's radii are in `vh` and `px`, so they don't change with the font: the three half rings have the same size.
- `margin:0 37 75` places both boxes at once, and the body's bottom edge falls right on the centers of its rings.
- `1q` makes a circle of 0.945px: the stops are fixed lengths, far beyond it.
- `#998235 0 45px` gives the mustard two positions: hard edges on both sides.
- `5vh` and `75vw` are short ways to write 15 and 300.
- `)4%0`, `37%a`: no space after `)` or `%`.
- The rule is never closed.
