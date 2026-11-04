---
title: "The space between two tiles: a two-tone plug in 133 characters"
lang: en
ref: 2026-10-10
permalink: /2026/10/10/space-between-two-tiles/
description: "How one sliced conic gradient with border-image space draws four corners on html and a 1630px band on body for the October 10, 2026 CSS Battle target."
target: /assets/targets/2026-10-10.png
target_url: https://cssbattle.dev/play/nAasQ2XDz2bVPbp4Esjz
colors: ["#d9d9d9", "#bfa148", "#042f38"]
player: evanliomain
chars: 133
score: 712.6
match: 100
code: |
  <style>*{margin:85 40%85 170;border-image:conic-gradient(#d9d9d9 50%,#bfa148 0)10 30%/5ch 29%space;*{background:#042f38;margin:55-780
---

The October 10 target is a dark teal canvas crossed by a horizontal bar, grey on the left and gold on the right, with a gap in the middle. Above and below the gap stand four small rectangles, gold on the left and grey on the right: the colors swap sides. I draw it with one `border-image`, used by `html` and `body`. On `html` it keeps only its four corners. On `body`, stretched into a band much wider than the canvas, the `space` keyword repeats two tiles and leaves the gap between them right in the middle.

{% include animations/2026-10-10.html lang=page.lang %}

## The code, spaced out

```css
* {                          /* html (head and style stay hidden) */
  margin: 85 40% 85 170;
  border-image:
    conic-gradient(#d9d9d9 50%, #bfa148 0)   /* grey right half, gold left half */
    10 30% /                 /* slices */
    5ch 29%                  /* border widths: 40px, 29% */
    space;                   /* repeat whole tiles, spread the rest */
  * {                        /* body */
    background: #042f38;
    margin: 55 -780;
  }
}
```

## How it works

### 1. The canvas color comes from body

`html` has no background. In that case, the background of `body` is painted on the whole canvas: that is the dark teal. It does not need to be on `html`.

### 2. A gradient split in two halves

`conic-gradient(#d9d9d9 50%,#bfa148 0)` starts at the top and turns clockwise. The first half of the turn, the right side, is grey; the second half, the left side, is gold. As a border image, it takes the size of the element's border box.

`10 30%` slices it into nine pieces: 10px from the top and from the bottom, 30% of the width from the left and from the right. `/5ch 29%` sets the width of the border areas they are drawn into: 5ch (40px, 1ch being 8px with the default font) at the top and bottom, 29% of the width on the sides. There is no `border`: the border image is drawn over the box anyway.

### 3. On html: four corners and nothing else

`margin:85 40%85 170` (CSS Battle runs in quirks mode, so plain numbers are pixels) leaves `html` 400 − 160 − 170 = 70px wide at x = 170. In quirks mode it is 300 − 85 − 85 = 130px tall.

- The corner pieces are 21 × 10 (30% of 70 is 21). They are drawn 20 × 40 (29% of 70 is 20.3). The left ones are gold, the right ones grey: those are the four small rectangles.
- The top and bottom pieces are 28 × 10. Drawn 40px tall, a tile would be 112px wide, but there are only about 30px between the corners. The side pieces are just as stuck: about 105px tall for 50px of room. With `space`, Chrome only draws whole tiles, and when none fits, the edge stays empty.
- Without the `fill` keyword, the middle piece is never drawn.

### 4. On body: a band of 1630 × 20

The nested `*` matches `body`. `margin:55-780` keeps it 55px inside `html`'s top and bottom edges, and pushes it 780px past each side. It becomes 70 + 2 × 780 = 1630px wide, from x = −610 to x = 1020, and 130 − 110 = 20px tall, from y = 140 to y = 160.

`body`'s background went to the canvas, so the band itself is transparent. Only its border image shows.

### 5. The border widths shrink to a quarter

On `body`, the border image is 1630 × 20. The top and bottom widths ask for 40px each, 80px in all, in a box only 20px tall. When opposite widths overlap like that, all four widths are scaled down by the same factor, here 20 / 80 = ¼:

- top and bottom: 10px each, so they fill the band exactly;
- left and right: 29% of 1630 × ¼ ≈ 118px.

The corners are 118 × 10, at both ends of the band: far off the canvas.

### 6. Two tiles, three gaps

The top piece of the image runs from 30% to 70% of the width: 652 × 10, gold for its first half and grey for its second. Drawn 10px tall, a tile is 652px wide. The edge between the corners is 1630 − 2 × 118 = 1394px long. Two tiles fit (1304px), and `space` splits the 90px left into three equal gaps of 30px: before, between and after the tiles. The bottom edge does the same, just below.

On the canvas:

- tile 1 ends at x = 190, with its grey half;
- the middle gap runs from x = 190 to x = 220, and shows the teal;
- tile 2 starts at x = 220, with its gold half.

So the bar is grey on the left and gold on the right, the reverse of the small rectangles.

## Golf notes

- One `border-image` for two boxes: the corners show on the small `html`, the edges on the wide `body`.
- `space` does two jobs: it drops the edges of `html`, where no tile fits, and it cuts the gap in `body`'s bar.
- No `border` is needed: the widths after `/` are enough to draw the image.
- `5ch` is 40px in 3 characters.
- `40%85`, `29%space` and `55-780` need no space: a `%` or a minus sign ends the number before it.
- `<style>` is never closed.
