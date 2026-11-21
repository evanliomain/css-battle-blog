---
title: "A plain image and a rounded cut: a dome and two bars in 138 characters"
lang: en
ref: 2026-11-20
permalink: /2026/11/20/a-plain-image-and-a-rounded-cut/
description: "How three empty paragraphs, a plain-color image() moved up by half the canvas and one rounded clip-path on the body draw the November 20, 2026 CSS Battle target: a dark dome and two dark bars on a green and mustard background."
target: /assets/targets/2026-11-20.png
target_url: https://cssbattle.dev/play/Xq0c8EROGbOq6rA5FlRC
colors: ["#0b2429", "#17504d", "#998235"]
player: selenit
chars: 138
score: 707.36
match: 100
code: |
  <p><p><p><style>p{border:solid 5vh#0B2429;margin:65 0-25}&>*{background:image(#17504D)0-50vh space#998235;clip-path:inset(0 140q round 1in
---

The November 20 target is split in half: dark green on top, mustard at the bottom. In the middle, in a column, a dark dome and two dark bars, 120 wide. Ilya Streltsyn draws the bars with three empty paragraphs and their borders. The background is a plain-color `image()`, moved up by half the canvas. One rounded `clip-path` on the `body` then cuts the bars to the right width, and its round corners turn the first bar into the dome.

The **wide view** shows the green tile half off canvas and the `body` going below the canvas. The **teaching colors** show the paragraphs, the `body` and the tile.

{% include animations/2026-11-20.html lang=page.lang %}

## The code, spaced out

```css
<p><p><p>                          <!-- three empty paragraphs -->
<style>
p {
  border: solid 5vh #0b2429;       /* 15px on each side: a 30px bar */
  margin: 65 0 -25;                /* bars at y = 65, 135, 205 */
}
& > * {                            /* html's children: head and the body */
  background: image(#17504d)       /* a plain tile, 400 × 300 */
              0 -50vh              /* moved up by 150px */
              space                /* one tile, no repeat */
              #998235;             /* the color below it */
  clip-path: inset(0 140Q round 1in); /* 132.28px off each side, round corners */
}
```

## How it works

### 1. Three empty paragraphs, three bars

An empty `<p>` has no content, so it is 0 tall. `border:solid 5vh` gives it a 15px border on all four sides (5vh of a 300px frame). 15 on top + 15 at the bottom makes a dark bar, 30 tall. A paragraph is a block: the bar spans the whole `body`, 384 wide, from x = 8 to 392.

### 2. `margin:65 0 -25`: the bars land at 65, 135 and 205

In quirks mode, numbers with no unit are px. Vertical margins that touch merge:

- The first paragraph's top margin (65) merges with the `body`'s (8). The larger one wins: 65. The `body` itself moves down with it, to y = 65.
- Between two paragraphs, a 65 margin meets a −25 margin. A positive and a negative margin add up: 65 − 25 = 40.

So the bars start at y = 65, 65 + 30 + 40 = 135 and 205.

### 3. The `body` goes down to y = 317

At the top level of a style sheet, `&` is the root, `html`. `&>*` targets `html`'s children: `head`, which is hidden, and the `body`. It is one character shorter than `body`.

In quirks mode, the `body` fills `html`'s height minus its margins. Its top margin is now 65. At the bottom, its 8 margin merges with the last paragraph's −25: 8 − 25 = −17. That gives 300 − 65 + 17 = 252. I checked it in Chrome: the `body` is 384 × 252, from y = 65 to y = 317. This matters in step 6: the cut keeps the `body`'s full height, so it must reach below the last bar.

### 4. `image(#17504D)`: a flat tile as big as `html`

`html` has no background, so the `body`'s background goes to the canvas. It is still placed on `html`'s box: 400 × 300.

`image(#17504D)` is a plain-color image. It has no size of its own. With no `background-size`, such an image takes the whole positioning area: a 400 × 300 green tile.

### 5. `0 -50vh space`: one tile, moved up

`0 -50vh` moves the tile up by 150px: it now runs from y = −150 to y = 150. Without anything else, the tile would repeat, and a second copy would fill the bottom half. `space` only repeats a tile when more than one fits. A tile as big as the area fits once, so there is no repeat, and the position still applies. Below y = 150, you see the shorthand's color: `#998235`.

### 6. `clip-path:inset(0 140q)`: 120 wide

1Q is a quarter of a millimeter, 0.945px. Chrome gives 140q = 132.28px. `inset(0 140q)` keeps the `body`'s full height and takes 132.28 off the left and right sides: 384 − 264.56 = 119.44 wide, from x = 140.28 to 259.72.

The background already went to the canvas, so the cut leaves it alone. It only trims the three bars.

### 7. `round 1in`: the dome

`round 1in` gives the cut 96px corners. Two 96 radii side by side need 192, and the cut is only 119.44 wide. When radii don't fit, the browser scales all of them by the same ratio: 119.44 / 192, which gives 59.72.

At the top, the two corners meet in the middle: a half-circle of radius 59.72, centered on (200, 124.72). The first bar runs from y = 65 to 95, so it only keeps the top 30px of that half-circle: the dome. The second bar starts at y = 135, below the corners, and stays straight. The bottom corners are at the bottom of the `body`, below y = 257, far from the last bar.

## Golf notes

- `image(#17504D)0-50vh space#998235` paints half the background in one color and the rest in another, with no gradient.
- One `clip-path` does two jobs: `inset` gives the width, `round` gives the dome. `1in` is enough, since oversized radii are scaled down.
- `140q` lands the edges at 140.28 and 259.72: a fraction of a pixel off, and the target still matches at 100%.
- Three empty `<p>` are three bars with no `height` and no `width`: the border gives the height, the block gives the width.
- `margin:65 0-25`: one value does the top offset (merged with the `body`'s), the 40px gap (65 − 25), and pushes the `body`'s bottom below the canvas.
- `&>*` instead of `body`, `5vh#0B2429` with no space, and the rule is never closed.
