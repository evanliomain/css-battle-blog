---
title: "A circle path through the center: a pink crosshair in 186 characters"
lang: en
ref: 2026-11-26
permalink: /2026/11/26/a-circle-path-through-the-center/
description: "How a dotted border, a round body and offset:-21% circle(83q)/74q on four nested boxes draw the November 26, 2026 CSS Battle target: a pink ring with four bumps and four pills in a cross."
target: /assets/targets/2026-11-26.png
target_url: https://cssbattle.dev/play/TKYsmdfc2XMpMT4qG9mS
colors: ["#5f133f", "#f075b0", "#f7bed9"]
player: benjamintordjman
chars: 186
score: 667.94
match: 100
code: |
  <dt><dl><dl><p><style>*{background:#5f133f;margin:95 145;color:F075B0;border:43q dotted;*{margin:-40;border:11q solid;border-radius:9in;*{width:20;color:F7BED9;offset:-21%circle(83q)/74q
---

The November 26 target shows a pink ring on a plum background, with four round bumps on its diagonals and four pale pink pills in a cross. Benjamin Tordjman draws it with three nested rules. `html` makes the four bumps with a dotted border, and the `body` covers them with a round ring. Four nested pills sit on an `offset` circle that always starts at the center of the canvas, and each one turns a quarter turn more than its parent.

The **wide view** shows the pills stacked in the top left before `offset` moves them, and the **teaching colors** give each box its own color.

{% include animations/2026-11-26.html lang=page.lang %}

## The code, spaced out

```css
<dt><dl><dl><p>                     /* four more boxes, each inside the one before */
<style>
* {                                 /* html, body, dt, dl, dl, p */
  background: #5f133f;              /* html: the canvas */
  margin: 95 145;                   /* html: a 110 × 110 box in the middle */
  color: F075B0;                    /* pink, no # needed in quirks mode */
  border: 43q dotted;               /* 40px dots: one in each corner */
  * {                               /* body, dt, dl, dl, p */
    margin: -40;                    /* body: back over html's border */
    border: 11q solid;              /* a 10px ring */
    border-radius: 9in;             /* round */
    * {                             /* dt, dl, dl, p */
      width: 20;                    /* + 2 × 10 of border: 40 × 20 pills */
      color: F7BED9;                /* pale pink */
      offset: -21% circle(83q) / 74q; /* on a circle through the center, a quarter turn more */
    }
  }
}
```

## How it works

### 1. html: four dots

The page has no doctype, so it runs in quirks mode, where `margin:95 145` means 95px and 145px. `html` is a 110 × 110 box, from (145, 95) to (255, 205). Its background goes to the whole canvas.

`43q` is 40.63px, and Chrome draws the border at 40. Between two corners, 110 − 2 × 40 leaves only 30px. A `dotted` border that thick draws one 40px dot in each corner and nothing else: I rendered `html` alone and found the four dots, centered at (165, 115), (235, 115), (165, 185) and (235, 185), and nothing between them. `color:F075B0` works without `#` in quirks mode, and the border takes that color.

### 2. body: the ring

The nested `*{` targets everything inside `html`: the `body` and the four tags. The `body` starts in `html`'s content box, 30 × 30 at (185, 135). `margin:-40` pulls it out by 40px on each side: 110 × 110, right on top of `html`. I measured it at (145, 95).

`9in` is far more than half of 110, so the box is a disk. `11q` is 10.39px, drawn at 10. The plum background fills the disk up to its border, so it hides the inside of the four dots. The border is the ring, from 45 to 55px from the center. Each dot is centered 49.5px from the center, with a 20px radius: only the part beyond 55px is left. Those are the four bumps.

### 3. Four pills

`<dt><dl><dl><p>` adds four tags, each one inside the one before. They match the third `*{`, and they keep the margin, the border and the radius of the second one. `width:20` plus 10px of border on each side makes them 40 wide. Their content height is 0, so they are 20 tall: 40 × 20, round at both ends, in pale pink. Their plum background has no room to show: their inner box is 20 × 0.

The −40 margins matter here too. Each child is 20 tall, and its margins take 80px off, so it adds nothing to its parent's height. When I set the margins to 0, the pills grow. Without `offset`, they sit at (115, 65), (85, 35), (55, 5) and (25, −25), each one 30px up and to the left of its parent. The `<p>` is partly above the canvas.

### 4. A circle through the center

`offset` is a shorthand for a motion path. Here it sets `offset-position:-21%`, `offset-path:circle(83q)` and `offset-anchor:74q`. The circle has no `at`, so it is centered on `offset-position`. That position is measured in the border box of the parent: for the `dt`, the 110px `body`. I checked it: going from 0% to 50% moves the pill by 55px. −21% of 110 is −23.1, so the center of the circle is at (121.9, 150).

`83q` is 78.43px. There is no `offset-distance`, so the box stays at the start of the path. For a circle, the start is its rightmost point: 121.9 + 78.43 = 200.33. The path starts at (200.33, 150), the center of the canvas, give or take a third of a pixel.

### 5. The anchor and the quarter turn

`74q` is 69.92px. `offset-anchor` picks the point 69.92px from the left edge of the pill, halfway down. That point is outside the 40px pill, 29.92px beyond its right end, and it goes on the start of the path.

`offset-rotate` is `auto` by default: the box lines up its horizontal axis with the direction of the path. The circle runs clockwise, so at its rightmost point it heads down. The pill turns 90°, and its center ends up 49.92px above the anchor: (200.33, 100.08). That is the top pill, from y = 80.08 to 120.08. With `offset-rotate:0deg`, it stays flat, to the left of the anchor: I checked it.

### 6. One level down

The first `<dl>` is inside the `dt`, so it is laid out in the `dt`'s turned frame. Its path is measured in the `dt`'s border box, which is 40 wide. −21% of 40 is −8.4, and −8.4 + 78.43 = 70.03: the start of its path is 0.11px from the `dt`'s anchor. That is the center of the canvas again. There, the `<dl>` turns 90° more than its parent.

The rotations add up: `dt` 90°, `<dl>` 180°, second `<dl>` 270°, `<p>` 360°. Each one puts its pill 50px from the center, in a new direction. I measured the four pills centered on (200.33, 100.08), (250.25, 150.1), (200.22, 200.03) and (150.3, 150): top, right, bottom, left.

The three numbers fit two box sizes at once. In the 110px `body`, the start must be at its center, 55: 78.43 − 0.21 × 110 = 55.33. In a 40px pill, it must be at the anchor, 69.92: 78.43 − 0.21 × 40 = 70.03. The third of a pixel left over moves the two upright pills a little to the right. The site still gives the solution a 100% match.

## Golf notes

- Three nested rules: `*`, then `*{` inside it, then another. Each level writes only what changes, and takes the rest from the level above.
- `color` without `#` works in quirks mode, and a border with no color uses `color`. One color per level, written once.
- `<dt><dl><dl><p>` gives four nested boxes with no closing tag.
- `9in` is a large enough radius in 3 characters.
- `offset` places and turns all four pills: no `position`, no `rotate`, no `transform`.
- `-21%circle(83q)/74q` needs no space, and neither the path nor the rules are closed.
