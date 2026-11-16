---
title: "The middle arch is a hole: three arches in 117 characters"
lang: en
ref: 2026-08-29
permalink: /2026/08/29/the-middle-arch-is-a-hole/
description: "How one box-shadow list on html draws the right half of the August 29, 2026 CSS Battle target, a flipped body draws the left half, and the white canvas shows through in the middle."
target: /assets/targets/2026-08-29.png
target_url: https://cssbattle.dev/play/2aQnTPdW5yYCr8Ot7dZ3
colors: ["#fff", "#0c0d0a", "#6d57c4"]
player: h_blierzt
chars: 117
score: 731.15
match: 100
code: |
  <style>*{margin:45%140-90;border-radius:1in;box-shadow:138q 0#FFF,69q 0#0C0D0A,4in 0 0 9cm#6D57C4;*{margin:0;scale:-1
---

The August 29 target is three white arches side by side on purple, rising from the bottom edge, with a black dome and a 10px black strip between each pair. H_Bliertz's solution gives `html` and the `body` the same transparent box and the same three shadows. The shadows of `html` draw the right arch, and the `body`, flipped with `scale:-1`, casts them to the left. The middle arch is no shadow at all: it is the white canvas, seen through the two boxes.

Use **Wide view** to see the boxes run below the canvas, and **Teaching colors** to tell the six shadows apart.

{% include animations/2026-08-29.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html first */
  margin: 45% 140 -90;               /* 180 140 -90 */
  border-radius: 1in;                /* 96px, scaled down to 60 */
  box-shadow:
    138q 0 #FFF,                     /* 130.39px right: white arch */
    69q 0 #0C0D0A,                   /* 65.2px right: black, under it */
    4in 0 0 9cm #6D57C4;             /* 384px right, spread 340.16px: purple */
  * {                                /* head, style, body */
    margin: 0;
    scale: -1;                       /* the body, flipped */
  }
}
```

## How it works

### 1. html: a box that goes below the canvas

`*` matches every element, `html` first. In `margin:45%140-90`, the percentage is taken from the width of the canvas: 45% of 400 is 180 at the top. Then 140 left and right, and −90 at the bottom. The margins are unitless: quirks mode reads them as px.

`html` is 400 − 280 = 120 wide. In quirks mode, it fills the height of the window minus its margins: 300 − 180 + 90 = 210. So it is a 120 × 210 box at (140, 180), and it runs down to y = 390, 90px below the canvas.

### 2. 1in corners: an arch

`border-radius:1in` asks for 96px corners. Two of them would need 192px, and the box is only 120 wide. The browser scales all the corners down by the same factor, 120 / 192, to 60px. The top of the box is a half circle. The bottom corners run from y = 330 to 390, off the canvas, so on screen the box is an arch. Any radius of 60px or more gives the same render: I checked `60px` and `9in`.

The box has no background. It cannot be seen, only its shadows.

### 3. A white arch, and a black one under it

A box shadow has the shape of its box, rounded corners included. `138q 0#FFF` moves it 138 quarter-millimeters to the right: 130.39px. That gives a white arch from x = 270.39 to 390.39.

`69q 0#0C0D0A` is the same arch moved 65.2px, from x = 205.2 to 325.2. Shadows are painted in reverse order, so it lies under the white one. An outer shadow is also never painted under its own box. So between the box (up to x = 260) and the white arch, only a 10px black strip and a black dome above them stay visible.

### 4. A giant purple shadow

`4in 0 0 9cm#6D57C4` moves the box 384px to the right and spreads it by 9cm, 340.16px, on every side. Its left edge lands at x = 140 + 384 − 340.16 = 183.84, its top at y = 180 − 340.16 = −160.16. Last in the list, it is painted under the white and the black arches.

Its corners are rounded too. I measured a radius of about 243px. So its top-left corner leaves a white gap above the box: on the row y = 0, the purple only starts at x = 200.

### 5. The body: the same box

The nested `*` matches every element inside another one: `head`, `style` and the `body`. The first two are not displayed. `margin:0` takes the 45% margin back off the `body`. In quirks mode, the `body` fills the height of `html`. I measured it: 120 × 210 at (140, 180), the same box as `html`. It gets the same radius and the same three shadows.

### 6. scale:-1: a mirror

`scale:-1` flips the `body` around its center, (200, 285). Its shadows now go to the left: a white arch from x = 9.61 to 129.61, the black one behind it, and purple from the left edge up to x = 216.16. On the row y = 0, the `body`'s purple stops at x = 199, right where the purple of `html` starts: the gap is closed.

The flip is vertical too, but that changes nothing: the box has the same corners at the top and at the bottom, and the shadows have no vertical offset. I checked that `scale:-1 1` gives the exact same render.

The `body` is painted after `html`, on top of it. This is why the purple has an offset. Without it, I checked that the `body`'s purple covers the right white arch and the right black strip. With the 384px offset, the `body`'s purple stops at x = 216.16, left of every visible part of the white and black shadows of `html`.

### 7. The middle arch

Neither box paints its shadows under itself. Both boxes are the same arch at (140, 180), and they have no background. So the canvas shows through there, and the canvas is white by default. The middle arch costs nothing.

## Golf notes

- One rule gives the same box and the same shadows to `html` and the `body`. The nested `*` only changes two things: no margin, and a flip.
- The middle arch is free: it is the white canvas, left visible by the two boxes.
- `45%` is 180px in 3 characters, and needs no space before `140`. I checked that `180 140-90` gives the same render, one character longer.
- `138q` and `69q` are 130.39px and 65.2px in 4 and 3 characters.
- `9cm` is a 340.16px spread in 3 characters, and `4in` a 384px offset.
- `scale:-1` is the shortest mirror. The vertical half of the flip is harmless here.
- `<style>` is never closed, and the last two braces are left out.

## If you try it at home

In my local Chrome (version 157 when this was written), the official code does not render exactly like the target. The target's arches span x 10 to 130, 140 to 260 and 270 to 390. Locally, the outer arches are 130.39px from the middle, so their outer and inner edges are soft over one pixel column (x = 9, 129, 270 and 390). The round tops of the arches are also anti-aliased a little differently. In all, 1,248 pixels differ from the target: 711 clearly, all on the edges of the arches, and the rest only slightly. On the CSS Battle judge, the solution is a 100% match.
