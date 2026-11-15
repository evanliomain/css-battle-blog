---
title: "A tiled ring and a flipped body: a Wi-Fi sign in 149 characters"
lang: en
ref: 2026-11-14
permalink: /2026/11/14/a-tiled-ring-and-a-flipped-body/
description: "How one radial gradient, shared by html and body, a background position, clip-path and scale:-.48 draw the November 14, 2026 CSS Battle target: an olive half ring and a small piece of ring on orange, with no tag besides style."
target: /assets/targets/2026-11-14.png
target_url: https://cssbattle.dev/play/oz2eumlqU32gRrkqBfri
colors: ["#f3ac3c", "#998235"]
player: h_blierzt
chars: 149
score: 696.67
match: 100
code: |
  <style>*{background:radial-gradient(1q at bottom,#F3AC3C,3.9lh,#998235 0 95q,#F3AC3C)0 50vh;*{scale:-.48;font:40%a;clip-path:polygon(50%50%,87%0,13%0
---

The November 14 target is orange, with a thick olive half ring and, just below it, a small olive piece of ring with a little V dip at the top. It looks like a Wi-Fi sign. H_Bliertz draws it with no tag besides `<style>`. One radial gradient is the background of both `html` and `body`. On `html`, the edge of a background tile cuts the ring in half. On the `body`, a smaller font shrinks the inner radius, then `clip-path` and `scale:-.48` turn the ring into the small shape.

Use **Teaching colors** to tell the `body`'s background apart from the canvas, and **Wide view** to see the tiles above and below the frame.

{% include animations/2026-11-14.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                       /* html and body (head and style are hidden) */
  background:
    radial-gradient(
      1q at bottom,                       /* centered at the bottom of the tile */
      #F3AC3C,                            /* orange */
      3.9lh,                              /* sharp edge at 3.9lh: 70.2 on html, 31.2 on body */
      #998235 0 95q,                      /* olive up to 95q = 89.8px */
      #F3AC3C                             /* orange after that */
    )
    0 50vh;                               /* tile moved down by 150px */
  * {                                     /* body only */
    scale: -.48;                          /* flipped both ways, shrunk */
    font: 40% a;                          /* 6.4px font: 1lh = 8 */
    clip-path: polygon(50% 50%, 87% 0, 13% 0);  /* a right-angled triangle */
  }
}
```

## How it works

### 1. A ring in a gradient

`*` matches `html`, `head`, `style` and `body`. `head` and `style` are not displayed, so only `html` and `body` count. `html`'s background goes to the canvas. A background image repeats in tiles the size of the box: 400 × 300 for `html`.

`radial-gradient(1q at bottom, …)` is a circle of radius 1q (0.24px) centered at the bottom middle of the tile, (200, 300). The size of the circle doesn't matter here: the color stops have their own lengths, and the gradient goes on past the circle.

The stops are orange, then `3.9lh`, then olive from `0` to `95q`, then orange. A length alone between two colors is a color hint: it says where the mix of the two colors is halfway. And a stop can't come before the stops or hints before it, so the olive's `0` is pushed up to `3.9lh`. With the hint and the next stop at the same place, the change is sharp: orange up to `3.9lh`, olive from `3.9lh` to `95q`, and orange after that.

`lh` is the line height of the element. `html` has the default 16px font and a normal line height of 18px, so `3.9lh` is 3.9 × 18 = 70.2px. `95q` is 95 × 0.945 = 89.8px. The olive ring goes from radius 70.2 to 89.8.

### 2. 0 50vh: the tile moves down

`0 50vh` is the background position: 0 across, 150px down. The tile at (0, 0) moves to (0, 150), and the tiles repeat above and below it. The tile above goes from y = −150 to 150, and its center, at its bottom, lands at (200, 150).

Its ring stops at the edge of the tile, at y = 150. Only the top half is drawn: the half ring of the target, from x = 110 to 290 and y = 60 to 150. The ring of the tile below is centered at (200, 450): its top is at y = 360, off the frame.

### 3. The body: the same background, smaller

The nested `*` matches the elements inside another element: here, the `body` (`head` and `style` stay hidden). It also gets the gradient from the first rule. Since `html` already has a background, the `body`'s is not moved to the canvas: it is painted on its own box. In quirks mode, the `body` fills the frame minus its 8px margin: 384 × 284, at (8, 8).

`font:40%a` gives the `body` a font of 40% of 16px, 6.4px (the family `a` doesn't exist, so the default font is used). Its line height is 8px, so its `3.9lh` is 31.2px. `95q` stays 89.8px. Its tile is 384 × 284 and moves down by 150 too. The ring of the tile above is centered at (192, 150) in the `body`, which is (200, 158) on the canvas: 8px below the `body`'s center.

### 4. clip-path: a corner of ring

`clip-path:polygon(50%50%,87%0,13%0)` keeps a triangle of the `body`. In its 384 × 284 box: (192, 142), (334, 0) and (50, 0). On the canvas, that is (200, 150), (342, 8) and (58, 8). From the tip, each side goes 142 across and 142 up: two sides at 45°, a right angle.

The triangle keeps a quarter of the top of the `body`'s ring, with orange inside and outside it. Everything else of the `body` is cut away, so `html`'s half ring shows again. The tip of the triangle is 8px above the center of the ring.

### 5. scale: flipped and shrunk

`scale:-.48` has one value, so it applies to both axes: −0.48 across and −0.48 down. Flipping both ways is a half turn, and 0.48 shrinks the box. It all happens around the center of the `body`, (200, 150), which doesn't move.

The corner of ring now points down from (200, 150). Its radii become 31.2 × 0.48 = 15 and 89.8 × 0.48 = 43. The triangle's sides end at y = 150 + 142 × 0.48 = 218, so the ring fills the corner up to its outer edge.

### 6. The V notch

Before the flip, the ring's center was 8px below the tip. After it, the center is 8 × 0.48 = 3.84px above the tip: at (200, 146.16). The inner circle, of radius 15, crosses the triangle's sides at about y = 158.5, but at the middle it goes down to 146.16 + 15 = 161.1. So the top edge of the small shape dips in the middle: the little V of the target.

## Golf notes

- No tag besides `<style>`: `html` and `body` are the two shapes, and `*` gives them the same background.
- One gradient, two sizes: the inner radius is written in `lh`, so `font:40%a` on the `body` changes it, while the outer radius in `q` stays the same.
- The tile edge cuts the half ring for free: `at bottom` puts the center on the edge, and `0 50vh` moves that edge to the middle of the frame.
- The color hint `3.9lh` gives a sharp edge, and the `0` after it is pushed up to the hint.
- `scale:-.48` flips and shrinks in one value; on a shape that is symmetric left to right, the flip across doesn't show.
- `font:40%a` is shorter than any font name, and `a` is enough for a valid `font` shorthand.
- `50%50%` and `87%0` need no space after `%`.
- The rules are never closed: the code ends inside `polygon(`.
