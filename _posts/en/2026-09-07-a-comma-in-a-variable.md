---
title: "A comma in a variable: three half discs in 118 characters"
lang: en
ref: 2026-09-07
permalink: /2026/09/07/a-comma-in-a-variable/
description: "How a custom property holding a comma turns one radial gradient into white half discs on html and a dark one on the body, for the September 7, 2026 CSS Battle target."
target: /assets/targets/2026-09-07.png
target_url: https://cssbattle.dev/play/VxH9v8gyndTt19Z4EkeY
colors: ["#84b9ef", "#ffffff", "#2f6193"]
player: selenit
chars: 118
score: 729.91
match: 100
code: |
  <style>*{*{margin:50 140;--r:0,#2F6193}background:radial-gradient(1q at 28.5%var(--r,100%,#fff)53q,#84B9EF)7%503q/60vw
---

The September 7 target is three half discs on light blue: two white ones lying flat side by side, and a dark blue one hanging upside down between them. Ilya Streltsyn's solution writes one radial gradient for both `html` and the `body`. The trick is a variable whose value contains a comma: inside the gradient, it moves the centre from the bottom of the tile to the top, and changes the color at the same time.

{% include animations/2026-09-07.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                         /* html, then the body */
  * {                                       /* the body */
    margin: 50 140;
    --r: 0, #2F6193;                        /* a value with a comma */
  }
  background:
    radial-gradient(1q at 28.5% var(--r, 100%, #fff) 53q, #84B9EF)
    7% 503q / 60vw;                         /* position / tile width */
}
```

## How it works

### 1. A half disc in a tile

`background` is written in the outer `*`, after the nested rule, so it applies to `html` and the `body`. `html`'s background is used for the whole canvas. `/60vw` sets the tile width to 60% of 400 = 240px; with no height, the tile is as tall as the area, 300px.

`html` has no `--r`, so `var(--r,100%,#fff)` uses its fallback. A fallback is everything after the first comma, commas included: `100%,#fff`. The gradient therefore reads `radial-gradient(1q at 28.5% 100%,#fff 53q,#84B9EF)`: a circle centred at 28.5% across and at the very bottom of the tile, white up to `53q` (50.08px), then light blue. Only the top half of the disc falls inside the tile.

### 2. 7% 503q: two half discs

`7%` is the tile's x position, as a share of the free space: 7% × (400 − 240) = 11.2. `503q` is 475.3px down. The tile repeats every 300px, so tile bottoms fall at y = 475.3 − 300 = 175.3.

The disc centres are 28.5% of 240 = 68.4 into each tile: at x = 11.2 + 68.4 = 79.6, and 240 further, at 319.6. That gives two white half discs, standing on y = 175.3.

### 3. A comma in a variable

The nested `*` matches the `body`: `margin:50 140` makes it 120 × 200, from x = 140 to 260 and y = 50 to 250. It also sets `--r:0,#2F6193`.

Now `var(--r,…)` is replaced by `0,#2F6193`, comma included, and the gradient reads `radial-gradient(1q at 28.5% 0,#2F6193 53q,#84B9EF)`. The centre is at the top of the tile, and the disc is dark blue. One variable changed two parts of the gradient, because its comma ends the position and starts a color stop.

### 4. The middle half disc

The `body`'s tile is 240 wide again (`60vw` does not depend on the box), and as tall as the `body`, 200. Its x position is 7% of the free space, which is now negative: 7% × (120 − 240) = −8.4. So the centre is at x = 140 − 8.4 + 68.4 = 200.

`503q` is still 475.3, and the tile repeats every 200: a tile top falls at y = 50 + 475.3 − 400 = 125.3. Only the bottom half of the disc falls in that tile: a dark blue half disc hanging from y = 125.3, between the two white ones. The rest of the `body` is light blue, like the canvas.

## Golf notes

- A fallback with commas (`var(--r,100%,#fff)`) fills two slots of the gradient at once: the centre's y and the next color.
- One variable on the `body` swaps both: top instead of bottom, dark instead of white.
- `60vw` gives the same 240px tile on both boxes, and `7%` places it differently because the boxes have different widths.
- The tile edges cut the discs in half for free.
- `background` after the nested rule still applies to the outer `*`.
- No closing brace, and `<style>` is never closed.
