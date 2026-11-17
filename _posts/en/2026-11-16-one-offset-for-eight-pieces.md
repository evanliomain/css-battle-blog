---
title: "One offset for eight pieces: a pinwheel in 138 characters"
lang: en
ref: 2026-11-16
permalink: /2026/11/16/one-offset-for-eight-pieces/
description: "How eight nested boxes, a 30px border, border-radius:1in 0 0 and one offset:50%73%ray(45deg)/-31%25Q draw the November 16, 2026 CSS Battle target: eight pale yellow quarter disks in a ring on dusty pink."
target: /assets/targets/2026-11-16.png
target_url: https://cssbattle.dev/play/jnMuDO3lQ6zvVd2hlovm
colors: ["#f2e09f", "#c36271"]
player: evanliomain
chars: 138
score: 707.36
match: 100
code: |
  <b><b><b><b><b><b><style>*{offset:50%73%ray(45deg)/-31%25Q;position:fixed;border:8mm solid#f2e09f;background:#c36271;border-radius:1in 0 0
---

The November 16 target is dusty pink, with a pale yellow ring of eight pieces in the middle, around a star-shaped hole. Each piece is a quarter disk, turned 45° from the one before, like a pinwheel. I draw it with six `<b>` tags and one rule. Each of the eight boxes, `html`, the `body` and the six `<b>`, is a quarter disk made of its border. Each one sits inside the one before, and `offset` turns it 45° more around the same point.

Use **Teaching colors** to tell the eight pieces apart: in reality they are all the same yellow.

{% include animations/2026-11-16.html lang=page.lang %}

## The code, spaced out

```css
<b><b><b><b><b><b>                       /* six boxes, each inside the one before */
<style>
* {                                      /* html, body and the six b */
  offset: 50% 73% ray(45deg) / -31% 25Q; /* anchor on the position, then −45° */
  position: fixed;                       /* a 0 × 0 content box */
  border: 8mm solid #f2e09f;             /* 30px: a 60 square */
  background: #c36271;                   /* dusty pink: the canvas */
  border-radius: 1in 0 0;                /* top left 96, brought down to 60 */
}
```

## How it works

### 1. Eight 60 boxes

`*` matches `html`, `head`, `style`, the `body` and the six `<b>`. `head` and `style` are not displayed, so eight boxes count: `html`, the `body`, and six `<b>`, each one inside the one before.

`position:fixed` takes every box out of the flow. A fixed box with no width and no content shrinks to 0 × 0, and that is true for `html` too. `8mm` is 30.24px, and Chrome draws a 30px border. So each box is a 60 × 60 square, made only of its yellow border.

### 2. border-radius: a quarter disk

`border-radius:1in 0 0` gives `1in` = 96px to the top left corner, and 0 to the three others. Two radii on the same side can't add up to more than the side. 96 is more than 60, so Chrome brings it down to 60. The square becomes a quarter disk of radius 60, and the circle's center is the bottom right corner.

### 3. offset: a path, a position, an anchor

`offset:50%73%ray(45deg)/-31%25Q` is a shorthand with three parts:

- `50% 73%` is the position, where the path starts. It is read in the parent's box: the 400 × 300 canvas for `html`, so (200, 219), and the parent's 60 square for the others, so (30, 43.8).
- `ray(45deg)` is the path, a ray at 45°. There is no distance, so the box stays at the start of the ray. But `offset` also turns the box to follow the path, by the angle minus 90°: −45°.
- `-31% 25Q` is the anchor, the point of the box that goes on the position: −31% of 60 is −18.6, and `25Q` is 23.6px. It is on the left of the box, outside it.

So each box puts its anchor on the position, and turns by −45° around it.

### 4. Nested boxes: 45° more each time

Every box has a 60 square, so every box makes the same move inside the one before: anchor on (30, 43.8), then −45°. And the turns add up: `html` turns by −45°, the `body` by −90°, the first `<b>` by −135°, and so on. The last `<b>` turns by −360°: it is upright.

A move made of a turn and a shift is a turn around one fixed point. Here, that point is 25 above the middle of the box's top edge, so 55 from its center. `html` puts it at (200, 219) + (0, −68.7) = (200, 150.3).

So the eight centers are all 55 from that point, at 45° from each other. 8 × 45° = 360°, and the ring closes. The rounded side of each quarter disk faces the middle: together they draw the star-shaped hole.

### 5. The background

`background:#c36271` goes to all eight boxes. They have no content, and their background is under their border, so it never shows. The one on `html` goes to the canvas: the whole frame is dusty pink.

## Golf notes

- `<b>` is a one-letter tag that nests. With `position:fixed`, it takes a size like any other box.
- One `*` rule draws all eight pieces: the shape comes from the border, and the place from `offset`, the same for every box.
- `offset` has no need for a distance: `ray()` alone turns the box, and the turns add up from one level to the next.
- The position and the anchor are chosen so the eight centers end up around (200, 150). `50%73%` and `-31%25Q` are short ways to write a point that is right to within half a pixel.
- `1in` is longer than the side, but Chrome brings it down: 3 characters for a radius of 60.
- `8mm` is 30.24px, drawn as 30px.
- `50%73%`, `/-31%25Q` and `solid#f2e09f`: no space after `%`, before a negative number or before `#`.
- The rule is never closed.
