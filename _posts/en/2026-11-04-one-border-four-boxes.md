---
title: "One border, four boxes: three arches in 171 characters"
lang: en
ref: 2026-11-04
permalink: /2026/11/04/one-border-four-boxes/
description: "How one border rule, a zoom of 5 and two empty img tags draw the November 4, 2026 CSS Battle target: a coral line rising into three arches."
target: /assets/targets/2026-11-04.png
target_url: https://cssbattle.dev/play/RbDuoqqerMZQNioN9XHm
colors: ["#2f5a76", "#de6b67"]
player: benjamintordjman
chars: 171
score: 678.39
match: 100
code: |
  <img><img><style>*{background:#2F5A76;border:solid#DE6B67;border-width:4 4 0}&{zoom:5;margin:46 6;*{margin:-70%23 0;border-radius:9q 9q 0 0;*{margin:20-73 0 17;padding:7 3
---

The November 4 target is a thick coral line on a slate-blue background. It runs along the bottom and rises into three arches: a tall narrow one in the middle and two short ones on each side. Benjamin Tordjman's solution gives one border rule to four boxes: `html` makes the line, the `body` the tall arch, and two empty `<img>` the short ones. A `zoom:5` keeps every number small.

Use **Wide view** to see `html`'s bottom margin and where the second `<img>` would sit without its negative margin.

{% include animations/2026-11-04.html lang=page.lang %}

## The code, spaced out

```css
<img><img>                        /* two empty boxes, in the body */
<style>
* {                               /* every element */
  background: #2F5A76;
  border: solid #DE6B67;
  border-width: 4 4 0;            /* top and sides, no bottom */
}
& {                               /* html */
  zoom: 5;                        /* everything inside is 5 times bigger */
  margin: 46 6;
  * {                             /* body (and the imgs) */
    margin: -70% 23 0;
    border-radius: 9q 9q 0 0;
    * {                           /* the two imgs */
      margin: 20 -73 0 17;
      padding: 7 3;
    }
  }
}
```

## How it works

### 1. zoom:5, then small numbers

`&` at the top level is `html`. `zoom:5` scales `html` and everything in it by 5: each CSS pixel covers 5 pixels on screen. So the code writes `4` for a 20px border, `46` for a 230px margin, and so on. In the rest of this post, "CSS px" are the numbers in the code and plain "px" are screen pixels.

### 2. html is only a border

CSS Battle runs in quirks mode, where `html` fills the window minus its margins. Zoomed, the window is 300 / 5 = 60 CSS px tall, and the margins take 2 × 46 = 92: the height would be −32, so it is 0. What is left is the border: 20px at the top, none at the bottom. The `html` box is a 340 × 20 coral bar at (30, 230), the bottom line of the target. Its side borders are 20 × 20 squares inside that bar.

Its background is the blue of the canvas, so the box itself never shows.

### 3. A −70% margin lifts the body

A margin in % is a share of the parent's width, even at the top. The `html` content is 340 / 5 − 2 × 4 = 60 CSS px wide, so `-70%` is −42 CSS px: the `body` starts 210px above the bar, at y = 40.

The same value sets its height. In quirks mode the `body` fills `html` minus its own margins: 0 − (−42) = 42 CSS px, which is 210px. And `23` on each side leaves 60 − 46 = 14 CSS px, 70px wide. So the `body` is a 70 × 210 box from (165, 40) down to the bar.

### 4. The tall arch

The `body` gets the same coral border: 20px on top and on the sides, open at the bottom. `border-radius:9q 9q 0 0` is 9 quarter-millimetres, 8.5 CSS px. That is more than half of the 14 CSS px width, so the browser scales both top radii down until they fit: the top becomes a half circle, and the inner edge a smaller one. The `body`'s blue background covers the bar between its legs.

### 5. Two empty img tags

An `<img>` with no source has no size of its own. It keeps its border and its `padding:7 3`: 3 + 4 + 4 + 3 = 14 CSS px wide and 7 + 7 + 4 = 18 tall, so 70 × 90. They are inline, so they sit on the `body`'s line: a `20` top margin brings them down to y = 160, their bottom on the bar. They are descendants of `html` too, so they get the same `border-radius` and turn into small arches.

### 6. A negative right margin puts the second one on the left

Both `<img>` get the same `margin:20 -73 0 17`. The first starts 17 CSS px after the edge of the `body`'s content: x = 185 + 85 = 270. It ends at 340, and its right margin of −73 CSS px (−365px) takes the line back to x = −25. The second one adds its 85px left margin and lands at x = 60. That is the mirror of the first around x = 200, with no selector to tell the two apart.

## Golf notes

- `zoom:5` on `html` divides every length by 5: `4` instead of `20`, `46 6` instead of `230 30`.
- `<img><img>` gives two boxes for 10 characters. Empty, they are exactly their padding and border.
- One `*` rule gives the background and the border to all four boxes. `border-width:4 4 0` drops the bottom one.
- `-70%` sets the `body`'s position and, through quirks mode, its height at the same time.
- `9q` is the shortest radius big enough for a half circle on a 14px box. `border-radius` needs a unit, even in quirks mode.
- `solid#DE6B67`, `-70%23` and `20-73` need no space: the `#`, the `%` and the minus sign end the token before.
- `&` stands for `html`, and `<style>` is never closed.
