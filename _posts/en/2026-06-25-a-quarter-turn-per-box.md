---
title: "A quarter turn per box: four half rings in 123 characters"
ref: 2026-06-25
permalink: /2026/06/25/a-quarter-turn-per-box/
description: "How one radial-gradient draws a half ring in every box, and how offset:ray(0deg) centers each nested box and turns it a quarter turn more than its parent, in the June 25, 2026 CSS Battle target."
target: /assets/targets/2026-06-25.png
target_url: https://cssbattle.dev/play/vsqDKNu2ZyCHhsIFFDnD
colors: ["#fff", "#328fc1"]
player: cubachatou
chars: 123
score: 723.86
match: 100
code: |
  <dl><dt><p><style>*{height:300;background:radial-gradient(1q at top,#fff 5vw,#328FC1 0 60px,#0000)-5ch 45vw;offset:ray(0deg
---

The June 25 target shows four blue half rings on a white background. They turn around the center like a pinwheel, and look like two S shapes woven together. Vegy draws a single half ring, as one gradient, and gives it to every box. `offset:ray(0deg)` puts each box on the canvas center and turns it a quarter turn, and each nested box adds its turn to its parent's: the same ring comes out at four angles.

Use **Teaching colors** to see which box paints which ring, and **Wide view** to see the turned boxes.

{% include animations/2026-06-25.html lang=page.lang %}

## The code, spaced out

```css
<dl><dt><p><style>
* {                          /* html, body, dl, dt, p (head and style are hidden) */
  height: 300;               /* 300px, no unit needed */
  background:
    radial-gradient(
      1q at top,             /* a tiny circle, centered on the top edge */
      #fff 5vw,              /* white up to 20px */
      #328FC1 0 60px,        /* blue from 20px to 60px */
      #0000                  /* then transparent */
    ) -5ch 45vw;             /* moved 40px left and 180px down */
  offset: ray(0deg           /* centered on the parent's center, turned -90° */
```

## How it works

### 1. Five boxes

`*` selects html, head, body, dl, dt, p and style. head and style are hidden, so five boxes are left. The tags are not closed, so each one is inside the previous one: dl in body, dt in dl, p in dt.

`height:300` has no unit. CSS Battle pages run in quirks mode, where a plain number is read as px. html is 400 × 300. body has its default 8px margin, so it is 384 × 300. dl, dt and p take body's width: 384 × 300 too. Without the offset, I measured body, dl, dt and p at the same place, (8, 8).

### 2. One gradient, half a ring

`radial-gradient(1q at top, …)` is a circle with a radius of 1q, a quarter of a millimeter, 0.945px. Its center is at the top center of the tile. The color stops are measured from the center along a ray, and they keep going past the circle:

- `#fff 5vw`: white up to 20px (5vw is 5% of 400px).
- `#328FC1 0 60px`: blue from 0 to 60px. A stop can't go back before the previous one, so the 0 becomes 20px: the blue starts right where the white ends, with a hard edge.
- `#0000`: transparent. A last stop with no position goes at 100% of the ray, here the 0.945px radius. That is before 60px, so it moves up to 60px too: another hard edge.

So the tile holds a white disk with a 20px radius inside a blue ring 60px wide across. Only the lower half is inside the tile: a half ring, opening up.

### 3. The position

`-5ch 45vw` moves the tile. 1ch is the width of the digit 0: 8px in the default 16px font, so -5ch is -40px. 45vw is 180px. The center of the half ring moves 40px left of the box's center line and 180px down from the top. In a 300px-tall box, that is 30px below the center.

The tile repeats in both directions, but the next copies of the ring are 384px or 300px away (400px for the canvas). None of them reaches a box.

### 4. html paints on the canvas

The background of the root element is painted on the whole canvas, and it does not turn with html. The ring lands at (200 − 40, 180) = (160, 180), opening up. I checked it with a render where only html keeps its background: the ring is at (160, 180) and opens up, even though html's own box is turned.

### 5. offset: ray(0deg)

`offset` puts a box on a path. Here the path is a ray, with an angle of 0deg: it points straight up. With the default `offset-position`, the ray starts at the center of the containing block, and the center of the box sits there. `offset-rotate` is `auto` by default: the box turns to follow the ray, a quarter turn counterclockwise, -90°.

- html is already centered on the canvas, (200, 150). It turns: 300 × 400, from y = −50 to 350.
- body's containing block is html's box. body was 8px too low because of its top margin. It moves up to (8, 0), with its center at (200, 150).
- dl, dt and p have the same size as their parent and sit in its corner: their centers are already on it.

The turns add up, because each box is inside the previous one: body is at −180°, dl at −270°, dt at −360° and p at −450°. I measured the four corners of each box, and all five boxes are centered on (200, 150).

### 6. Four turns, four half rings

Each box holds its half ring 40px left of its center and 30px below it. The turn of the box carries the ring around (200, 150):

- body, −180°: the ring goes 40px right of and 30px above the center, (240, 120), opening down. It covers x = 180 to 300, y = 60 to 120.
- dl, −270°, a quarter turn clockwise: (170, 110), opening right, x = 110 to 170, y = 50 to 170.
- dt, −360°, upright: (160, 180), opening up, x = 100 to 220, y = 180 to 240. That is exactly the canvas copy: dt's box starts at x = 8, and 8 + 192 − 40 = 200 − 40 = 160. dt paints over it.
- p, −450°, the same as −90°: (230, 190), opening left, x = 230 to 290, y = 130 to 250.

I measured each ring with renders where only one box keeps its background: 5,020 blue pixels each, at those positions.

### 7. The picture

Four half rings, a quarter turn apart. They never touch: 10px of white sit between the ends of two neighbors. The white centers never cover another ring either.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One gradient for four rings, and one more nested box for each quarter turn. `<dl><dt><p>` gives three nested blocks in 11 characters. With `<p><p><p>` (121 characters), each `<p>` closes the one before: the three p are siblings in body, all at −270°, and the ring on the right is missing. 5,020 pixels change.
- `offset:ray(0deg` centers and turns the box in 15 characters. `rotate:-90deg` (121 characters) only turns it: body keeps its 8px offset, body, dl, dt and p end up 8px to the right, and 5,920 pixels change.
- `1q` sets the size of the circle in 2 characters. It also makes the 100% of the ray tiny, so `#0000` with no position ends up at 60px, as a hard edge. With `circle at top` (127 characters), the circle reaches the farthest corner, the blue fades out slowly over the whole canvas, and 99,288 pixels change. Without `,#0000` (117 characters), the blue never stops: 99,288 pixels change too.
- The `0` in `#328FC1 0 60px` makes a hard edge between white and blue. With `#328FC1 60px` (121 characters), the white fades into the blue between 20px and 60px, and 18,840 pixels change. `#328FC1 5vw 60px` gives the same picture in 125 characters.
- `5vw` is 20px in 3 characters. `20px` gives the same picture in 124 characters.
- `-5ch` is −40px and `45vw` is 180px, in 4 characters each. `-40px 180px` gives the same picture in 125 characters.
- The inside of the ring is `#fff`, 4 characters, the color of the empty canvas. In my render, `#0000` there gives the same picture in 124 characters.
- `height:300` has no unit. `300px` gives the same picture in 125 characters. Without the height (112 characters), the boxes lose their 300px and 11,960 pixels change.
- No space is needed between `)` and `-5ch`. With the space, the same picture takes 124 characters.
- Nothing is closed. `)}` at the end gives the same picture in 125 characters.
