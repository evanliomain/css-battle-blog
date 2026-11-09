---
title: "A ray, a ring and a circle: four arcs in 184 characters"
lang: en
ref: 2026-09-14
permalink: /2026/09/14/a-ray-a-ring-and-a-circle/
description: "How offset:ray(), one border-image and a circle clip-path draw the September 14, 2026 CSS Battle target: a blue cross between four arcs."
target: /assets/targets/2026-09-14.png
target_url: https://cssbattle.dev/play/9sCBYHjLMHJ372p55cz7
colors: ["#f8b140", "#465792"]
player: cubachatou
chars: 184
score: 669.25
match: 100
code: |
  <p><style>*{background:#F8B140;offset:ray(0deg);*{width:80;height:30;background:#465792;border-image:radial-gradient(#0000 81q,#465792 0 41%,#0000 0)98%0/131q/9pc;clip-path:circle(95px
---

The September 14 target is blue on orange: a small cross in the middle, and four arcs around it, each one curving towards the cross. Vegy's solution never sets a position or a rotation. `offset:ray(0deg)` centres each element in its parent and turns it a quarter turn, which gives the cross. The four rings come from one `border-image`, squeezed into the top and bottom edges of each bar, and `clip-path:circle(95px)` cuts each ring in half.

Use **Teaching colors** to see what the `<p>` draws.

{% include animations/2026-09-14.html lang=page.lang %}

## The code, spaced out

```css
<p>
<style>
* {                                  /* html, body and p */
  background: #F8B140;
  offset: ray(0deg);                 /* centred, turned by −90° */
  * {                                /* the body and the p */
    width: 80;
    height: 30;
    background: #465792;
    border-image:
      radial-gradient(#0000 81q, #465792 0 41%, #0000 0)  /* a ring */
      98% 0 / 131q / 9pc;            /* slices / width / outset */
    clip-path: circle(95px);
  }
}
```

## How it works

### 1. offset: a cross

`offset` is the shorthand for motion along a path. `ray(0deg)` is a path: a straight ray, starting from the centre of the parent box and going up (0deg is up). With no distance, the element sits at the start of the ray, so its centre is placed on its parent's centre. And by default it turns to follow the path: its own x-axis points along the ray, up, which is a −90° turn.

`*` gives this to every element, and the nested `*` gives `width:80;height:30` and the blue background to the `body` and the `<p>`. Each level turns again: `html` by −90°, the `body` by −180° in all, the `<p>` by −270°, a quarter turn. All three are centred on the same point, (200, 150). The `body` is a lying 80 × 30 bar, the `<p>` a standing one: the cross.

### 2. A ring in a big area

The `body` and the `<p>` also get a `border-image`. Its last value, `9pc`, is the outset: the image area grows 144px past the box on every side, so 80 + 288 = 368 by 30 + 288 = 318.

The image is `radial-gradient(#0000 81q,#465792 0 41%,#0000 0)`, as big as that area: an ellipse from the centre to the farthest corner. It is transparent up to `81q` (76.5px), blue from there to 41% (the `0` is pulled up to 76.5), then transparent again. That is a wide blue ring, slightly flattened because the area is wider than it is tall.

### 3. Cut: two small rings

`98% 0` is the slice. It cuts the image 98% from the top and 98% from the bottom, and 0 from the sides. With a 0 slice on the sides, the corners and the side edges get no image at all. The top and bottom cuts overlap, so there is no middle piece either. Only the top and bottom edges are painted.

The top edge piece is almost the whole image: the full width, and 98% of the height. `131q` is the border width: 123.8px. So this piece is squeezed into the top border strip, which is 368 − 2 × 123.8 = 120.4 wide and 123.8 tall. The big ring shrinks into a small one there, about 25 to 35px in radius, with its centre 95.9px above the element's centre. The bottom piece does the same below.

The `body` is turned by 180°, so its two rings land above and below the cross. The `<p>` is turned by a quarter turn, so its two rings land on the left and the right.

### 4. clip-path: half rings

`clip-path:circle(95px)` keeps only the part of each element within 95px of its centre. Each small ring is centred 95.9px away, so the edge of the circle passes almost through its middle. The outer half of each ring is cut off, and only the half that faces the cross is left: four arcs. The bars themselves are well inside the circle and are not cut.

## Golf notes

- `offset:ray(0deg)` centres an element and turns it in 15 characters, with no `margin`, `position` or `rotate`.
- Written in `*`, the same `offset` turns each level by another quarter turn: one bar lies down, the next one stands up.
- `98%0` paints only the top and bottom edges of the `border-image`, each squeezed into a small strip, so one big ring gives two small ones.
- The outset `9pc` makes the area big enough for the ring, with no element of that size.
- `clip-path:circle(95px)` cuts the four rings in half at once.
- No closing braces, and `<style>` is never closed.
