---
title: "A fallback and a bowtie: a quartered disc in 134 characters"
ref: 2026-04-24
permalink: /2026/04/24/a-fallback-and-a-bowtie/
description: "How one var() fallback turns the same radial gradient into a black and yellow target on html and a white disc on body, how a 1q size makes every edge sharp, and how a polygon that crosses itself keeps two quarters of body, in the April 24, 2026 CSS Battle target."
target: /assets/targets/2026-04-24.png
target_url: https://cssbattle.dev/play/DRaoAJZca16SjLeJJMJr
colors: ["#111", "#f7cb71", "#a34f50", "#fff"]
player: underdude
chars: 134
score: 711.53
match: 100
code: |
  <style>*{background:radial-gradient(1q,var(--a,#111,60px,#F7CB71)0 75pt,#A34F50);*{--a:#fff;clip-path:polygon(0 50%,50%99%,50%0,99%50%
---

The April 24 target is a disc of radius 100 on a red-brown background, cut into four quarters: two white ones, and two yellow ones with a black quarter disc inside. Janne Ala-Äijälä writes one radial gradient for both html and body. On html, a `var()` fallback makes it black and yellow. On body, `--a:#fff` makes it white, and a polygon that crosses itself keeps only two quarters of it.

With **Teaching colors**, the two boxes, body's red-brown and the clip-path polygon get their own colors.

{% include animations/2026-04-24.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                     /* every element: html, head, style, body */
  background: radial-gradient(
    1q,                                 /* the size: a circle of radius 0.945px */
    var(--a,#111,60px,#F7CB71)0 75pt,   /* html: #111,60px,#F7CB71 0 75pt */
                                        /* body: #fff 0 75pt */
    #A34F50                             /* no position: 100% = 0.945px, pushed to 100px */
  );
  * {                                   /* every element inside another: all but html */
    --a: #fff;
    clip-path: polygon(0 50%,50%99%,50%0,99%50%) /* two triangles */
/* the end of the code closes everything */
```

## How it works

### 1. Two rules, two boxes

`*` matches every element: html, head, style and body. The nested `*{` means `* *`: every element inside another one, so all of them but html. head and style are not displayed. Two boxes are left, and both get the `background` of the outer rule. Only body gets `--a:#fff` and the `clip-path`.

There is no doctype, so the page is in quirks mode, and body stretches to the height of the frame. getBoundingClientRect gives html (0, 0), 400 × 300, and body (8, 8), 384 × 284, inside its default 8px margin. Both boxes have the same center: (200, 150).

### 2. One `var()`, two gradients

The fallback of a `var()` runs from the first comma to the closing parenthesis, commas included. Nothing sets `--a` on html, so it gets the fallback, `#111,60px,#F7CB71`, and its background reads `radial-gradient(1q,#111,60px,#F7CB71 0 75pt,#A34F50)`. On body, `--a` is `#fff`, and the same declaration reads `radial-gradient(1q,#fff 0 75pt,#A34F50)`. getComputedStyle confirms both, with the colors written in rgb().

html is the root, so its background is painted on the whole canvas.

### 3. The 1q circle

A single length as the first argument of `radial-gradient` is a circle of that radius. `1q` is a quarter of a millimeter: 0.945px. Stops given in px or pt do not care about that size: `60px` is 60px from the center, and `75pt` is 75 × 4/3 = 100px.

Apart from the shape, the size only matters for percentages. `#A34F50` has no position, so it sits at 100%: 0.945px. A stop cannot sit before an earlier one, so it moves up to 100px, where the stop before it ends. The red-brown starts at radius 100, with no fade.

### 4. The hint at 60px

On html, `60px` stands alone between two colors: it is a transition hint, the place where the two colors mix half and half. `#F7CB71 0` comes after it but is placed before it, so the 0 moves up to 60px. The hint and the next color are at the same place: black all the way to 60px, then yellow, with no fade. The yellow runs from 60px to 75pt.

In my render, on the row y = 149, the red-brown stops at x = 99, the yellow starts at x = 100 and the black at x = 140: radii 100 and 60.

### 5. body's white disc

On body, `#fff 0 75pt` is white from the center to 100px, then `#A34F50`. body's center is (8 + 192, 8 + 142) = (200, 150), the same as html's, so the red-brown around the white disc lands exactly on html's. Without the clip-path (91 characters), body hides html's black and yellow, a whole white disc is left, and 15,714 pixels change.

### 6. The bowtie

The polygon is taken on body's 384 × 284 box. Its four points are (8, 150), (200, 289.16), (200, 8) and (388.16, 150) on the canvas. The path goes from the left middle down to the bottom middle, up the vertical center line to the top, down to the right middle, and back left along the horizontal center line. The two straight runs cross at the center, so the shape is two triangles that touch there: one bottom left, one top right.

Both triangles have their right angle at the center. The bottom-left one has legs of 192 and 139.16, so its slanted edge is 112.7px from the center. The top-right one has legs of 188.16 and 142: 113.4px. Both are more than the radius of 100, so each white quarter fits whole. Past radius 100, body's red-brown sits on html's red-brown, and the slanted edges do not show.

In the other two quarters, html's black and yellow show. My render counts 15,714 white pixels, 10,062 yellow, 5,652 black and 88,572 red-brown.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `background` declaration serves both boxes: the fallback holds three parts of html's gradient, `#111,60px,#F7CB71`, and body swaps them all for `#fff`. With two gradients written out, `<style>*{background:radial-gradient(1q,#111,60px,#F7CB71 0 75pt,#A34F50);*{background:radial-gradient(1q,#fff 75pt,#A34F50);clip-path:polygon(0 50%,50%99%,50%0,99%50%` (166 characters), the picture is the same.
- `1q,` makes the gradient a circle and makes 100% tiny, so the last color needs no position. With `circle,` (138 characters), 100% is html's farthest corner, 250px away: the yellow and body's white fade into the red-brown out to the corners, and 88,123 pixels change. With no size at all (131 characters), the gradient is a wide ellipse that also fades out to the corners, and 93,936 pixels change.
- `75pt` is 100px in 4 characters. With `100px` (135 characters), the picture is the same.
- The `0` before `75pt` does two jobs: on body, `#fff 0 75pt` is one white band; on html, it is the stop that moves up to the 60px hint. Without it (132 characters), html's black fades into the yellow over 100px, and 14,796 pixels change.
- No space between `)` and `0`. With `) 0` (135 characters), the picture is the same.
- No space after a `%`, and `99%` instead of `100%`. With `50%100%` and `100%50%` (136 characters), the picture is the same: the triangles only need to reach past radius 100.
- The nested `*{` is the shortest way to reach body and not html. With `}body{` in its place (137 characters), the picture is the same.
- body stretches to 384 × 284 because of quirks mode, which keeps its center on html's. With `<!doctype html>` in front (149 characters), body is 0px tall and html 8px tall, html's gradient repeats every 8px down the canvas, which draws vertical bands, and 49,870 pixels change.
- The rules, the `polygon(` and the `<style>` are never closed. With `)}}` at the end (137 characters), the picture is the same.
