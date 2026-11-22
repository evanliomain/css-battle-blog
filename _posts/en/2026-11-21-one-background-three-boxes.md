---
title: "One background, three boxes: eight half-discs in 126 characters"
lang: en
ref: 2026-11-21
permalink: /2026/11/21/one-background-three-boxes/
description: "How one rule on every element, a repeated radial gradient and the em of an h1 draw the November 21, 2026 CSS Battle target: eight dark green half-discs on a light green background."
target: /assets/targets/2026-11-21.png
target_url: https://cssbattle.dev/play/uzoOpbBnY8iXVAKpjzxS
colors: ["#024817", "#90d3a6"]
player: benjamintordjman
chars: 126
score: 720.37
match: 100
code: |
  <h1><style>*{margin:23 2.06em -6in;background:radial-gradient(1q at bottom,#024817 26q,#90D3A6)-3%-99q/74q 50%;*{height:8.75em
---

The November 21 target shows eight dark green half-discs on a light green background, flat side down, on a 70px grid: four on the top row, two at the ends of the middle row, two in the center of the bottom row. Benjamin Tordjman writes one rule for every element. `html`, the `body` and one `<h1>` get the same margins and the same repeated gradient. Since an `<h1>` writes twice as big, its `em` is twice as long: the same numbers give three different boxes, and three different grids of half-discs.

The **wide view** shows `html`'s half-discs, pushed below the canvas, and the `<h1>` going out at the bottom. The **teaching colors** show which box paints what.

{% include animations/2026-11-21.html lang=page.lang %}

## The code, spaced out

```css
<h1>                                 <!-- one empty heading: its em is 32px -->
<style>
* {                                  /* html, the body and the h1 */
  margin: 23 2.06em -6in;            /* 23 on top, 32.96 or 65.92 on the sides, −576 at the bottom */
  background: radial-gradient(1Q at bottom, #024817 26Q, #90d3a6) /* a half-disc, radius 24.56 */
              -3% -99Q               /* where the first tile starts */
              / 74Q 50%;             /* tile: 69.92 wide, half the box tall */
  * {                                /* the body and the h1, not html */
    height: 8.75em;                  /* 140 on the body, 280 on the h1 */
  }
}
```

## How it works

### 1. One rule, three boxes

`*` targets every element. Three of them are drawn: `html`, the `body` and the `<h1>` (`head` and `style` are hidden). In quirks mode, numbers with no unit are px: `margin:23 2.06em` puts 23 on top and 2.06em on the left and right.

One em is the element's own text size. It is 16px on `html` and the `body`, so their side margins are 32.96. A browser writes an `<h1>` twice as big, 32px, so its side margins are 65.92. I measured the boxes in Chrome:

- `html` starts at x = 32.95 and is 334.09 wide;
- the `body`, inside it, starts at x = 65.91 and is 268.19 wide;
- the `<h1>`, inside the `body`, starts at x = 131.81 and is 136.38 wide.

`html` starts at y = 23. The `body` adds its own 23: y = 46. The top margin of the `<h1>` merges with the `body`'s, so the `<h1>` also starts at y = 46.

### 2. `height:8.75em`: 140 and 280

The nested `*` targets any element inside another one: the `body` and the `<h1>`, but not `html`, which is inside nothing. The em does the same job again: 8.75 × 16 = 140 for the `body`, 8.75 × 32 = 280 for the `<h1>`. The `body` goes from y = 46 to 186. The `<h1>` goes from y = 46 to 326: it sticks out of the `body` and ends below the canvas.

### 3. The background: one half-disc per tile

`radial-gradient(1q at bottom,#024817 26q,#90D3A6)` is a circle centered on the middle of the tile's bottom edge. The `1q` is only there to make it a circle. The dark green runs up to 26q, which is 24.56px. The light green has no position: it starts right there, with no blend. Only the top half of the circle fits in the tile: a half-disc, 49 wide and 24.56 tall. The rest of the tile is light green, so the tile is opaque.

`/74q 50%` is the tile size: 74q = 69.92 wide, and 50% of the box's height. That percentage is the key: each box has its own height, so each box gets its own rows.

### 4. `-6in`: `html` stretches, and its half-discs leave

`html`'s background is painted by the canvas, everywhere, but its tiles are still sized and placed on `html`'s box. Without a bottom margin, `html` would be 300 − 23 = 277 tall, its tiles 138.5 tall, and the canvas would be covered with half-discs.

The third `margin` value is the bottom margin: −6in = −576px. In quirks mode, `html` fills the window minus its top and bottom margins: 300 − 23 + 576 = 853. Its tiles are then 426.5 tall. `-99q` moves them up by 93.54: the first one runs from y = 23 − 93.54 = −70.54 to y = 355.96. Its half-discs sit just above y = 356, below the canvas, and the row before is above it. On the canvas, `html` only paints light green. I checked it by removing the two other backgrounds: no dark pixel is left.

### 5. The `body`: two rows of four

The `body` paints the same background on its own box, 268.19 × 140. 50% is 70, so two rows of tiles fit. They start at y = 46 − 93.54 = −47.54: their bottoms land at y = 22.46 (above the box, not painted), 92.46 and 162.46.

A percentage position is a share of the free space: the box's width minus the tile's width, 268.19 − 69.92 = 198.27. −3% of that is −5.95, so the first tile starts at x = 65.91 − 5.95 = 59.96. Four whole tiles follow each other, with their half-discs centered on x = 94.92, 164.84, 234.76 and 304.68. That is the top row of the target, and four half-discs on the middle row: two too many.

### 6. The `<h1>` paints over the `body`

The `<h1>` paints the same background again, on a 136.38 × 280 box. 50% is now 140: its tiles are twice as tall, and their bottoms land at y = 92.46 and 232.46. Its free space is 136.38 − 69.92 = 66.46, and −3% of that is −1.99: the first tile starts at x = 129.82, almost exactly one tile after the `body`'s first one. Its two half-discs are centered on x = 164.78 and 234.70, 0.06px from the `body`'s.

The `<h1>` is painted after the `body`, and its tiles are opaque. Between x = 131.81 and 268.19:

- on the top row, it redraws the two middle half-discs at the same place;
- on the middle row, its tile is plain light green there: the two middle half-discs of the `body` disappear;
- at y = 232.46, below the `body`, it adds the two half-discs of the bottom row.

## Golf notes

- One `*` rule styles `html`, the `body` and the `<h1>`. The same `background` is used three times and written once.
- `em` gives two lengths for one number: `2.06em` is 32.96 or 65.92, and `8.75em` is 140 or 280. The `<h1>` is only there for its text size.
- `50%` in the tile size and `-3%` in the position depend on each box: tiles of 70 and 140, and offsets of −5.95 and −1.99 that keep the columns in line.
- `-6in` on the bottom margin stretches `html` to 853 and sends its half-discs below the canvas. The same margin on the `body` and the `<h1>` changes nothing visible, since their height is set.
- The last color stop has no position, and the gradient gives the background color too: no `background-color` is needed.
- `-3%-99q/74q` needs no space after `%`, and nothing is closed at the end.

## If you try it at home

The flat sides of the half-discs land at y = 92.46, 162.46 and 232.46: almost on a half pixel. In the latest Chrome (version 157 when this was written), my local render differs from the target image by 328 pixels along those three lines, plus the anti-aliased pixels of the arcs. On the CSS Battle judge, the code is a 100% match.
