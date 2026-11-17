---
title: "Two dashed outlines, one window: a lightning bolt in 120 characters"
ref: 2026-06-23
permalink: /2026/06/23/two-dashed-outlines-one-window/
description: "How a dashed outline on body and a thicker one on a turned h1, seen through a clip-path window, cut a dark square into two pieces, in the June 23, 2026 CSS Battle target."
target: /assets/targets/2026-06-23.png
target_url: https://cssbattle.dev/play/TRLoToMQ6reTNuP9PYZX
colors: ["#1b5f1e", "#b3f0b6"]
player: selenit
chars: 120
score: 727.45
match: 100
code: |
  <h1><img><style>*{margin:50-32;*{*{rotate:-60deg}outline:dashed 8ex#1B5F1E}+*{background:#B3F0B6;clip-path:inset(-50%31%
---

The June 23 target is a dark green square on a mint background, cut in two by a light slanted stripe. The left piece has a foot, the right piece has a head, like a lightning bolt. Ilya Streltsyn paints no dark green background. Every dark pixel is a piece of a dashed outline: a thin one on body, a thick one on a turned h1. A clip-path on body keeps only a 200 × 200 window.

Use **Wide view** to see how big the outlines really are, and **Teaching colors** to see which outline draws which piece.

{% include animations/2026-06-23.html lang=page.lang %}

## The code, spaced out

```css
<h1><img>                          /* body holds an h1, with an img inside */
<style>
* {                                /* html, head, body, h1, img, style */
  margin: 50-32;                   /* 50px top and bottom, -32px left and right */
  * {                              /* * *: body, h1, img (head and style are hidden) */
    * {                            /* * * *: h1 and img */
      rotate: -60deg
    }
    outline: dashed 8ex#1B5F1E     /* 57px on body, 117px on h1 and img */
  }
  +* {                             /* * + *: body (and the hidden style) */
    background: #B3F0B6;           /* goes to the whole canvas */
    clip-path: inset(-50%31%       /* keeps the window (99.68, 50) to (300.32, 250) */
```

## How it works

### 1. One rule, nested three times

`*` selects html, head, body, h1, img and style. Nesting builds two more selectors from it:

- `*{*{` is `* *`: every element inside another one. head and style are hidden, so the outline draws on body, h1 and img.
- `*{*{*{` is `* * *`: elements with two ancestors. That is h1 and img, which get the rotation.
- `*{+*{` is `* + *`: an element right after a sibling. body comes after head, so it gets the background and the clip-path. style comes after img and gets them too, but it is hidden.

### 2. A background that the clip cannot cut

html has no background, so body's background is painted on the whole canvas instead of body's box. The canvas is #B3F0B6 everywhere.

That matters at the end: the clip-path cuts body, not the canvas. I checked it with `html{background:red}` added: the light color then stays inside body's clipped box, and the rest of the canvas turns red.

### 3. The margins

`margin:50-32` has no unit. CSS Battle pages run in quirks mode, where a plain number is read as px. `50-32` is two numbers, 50 and −32: 50px at the top and bottom, −32px on the left and right. Every element gets them.

In quirks mode, html fills the page height minus its margins, and body fills html the same way. I measured the boxes:

- html: 400 + 64 = 464px wide, 300 − 100 = 200px tall, from (−32, 50) to (432, 250).
- body: 464 + 64 = 528px wide, 200 − 100 = 100px tall, from (−64, 100) to (464, 200).
- h1: 528 + 64 = 592px wide, from x = −96 to 496.

Each box sticks out by the same amount on both sides, so h1's center is (200, 150), the center of the canvas.

### 4. An empty image, 100px tall

img has no source, so it is 0 × 0. It is inline, and its margins of 50px above and below still count in its line: the line is 50 + 0 + 50 = 100px tall. So h1 is 100px tall, from y = 100 to 200. Its top margin merges with body's, so both start at y = 100.

Without `<img>`, h1 is 0px tall. That 100px height becomes the width of the light stripe.

### 5. One length, two widths

`outline:dashed 8ex#1B5F1E` draws a dark band outside each box. `ex` depends on the font of each element:

- body: 16px Times, 1ex is 7.18px. 8ex is 57.44px, and Chrome draws 57px.
- h1: 32px bold Times, 1ex is 14.73px. 8ex is 117.88px, and Chrome draws 117px. img inherits h1's font and gets 117px too.

### 6. The dashes

A dashed outline this thick has dashes twice as long as it is wide. In my render, Chrome spaces them with 62px gaps.

- Around body, the band goes from (−121, 43) to (521, 257). The long sides have four dashes of 114px. The middle gap goes from x = 169 to 230, centered on 200. The short sides are 214px long and stay solid.
- Around h1, before the rotation, the band goes from (−213, −17) to (613, 317). The long sides have three dashes of 234px: the middle one goes from x = 83 to 316. The short sides are solid.
- Around img, a 0 × 0 box, the outline is a solid 234 × 234 square.

h1's outline is painted over body's, and img's over h1's.

### 7. The turn

`rotate:-60deg` turns h1 around its center, (200, 150). Its empty box becomes the light stripe, 100px wide, slanted at 60°. Its two long bands lie on each side of it, 117px wide each.

img turns with h1, then turns −60° more around its own point. Its square ends up far below, around (36, 434).

### 8. The window

`clip-path:inset(-50%31%` is computed on body's box, 528 × 100. 31% of 528 is 163.68px, cut from the left and the right. −50% of 100 is −50px: the window grows by 50px at the top and the bottom. What is left goes from (99.68, 50) to (300.32, 250).

clip-path cuts body and everything inside it, outlines included. h1's outline, img's square and most of body's outline are gone. The background stays, because it belongs to the canvas.

### 9. What the window shows

- Left of the stripe, the middle dash of h1's top band. Its corner farthest from the stripe is about 137px from the stripe's center line, and the band reaches 50 + 117 = 167px. So it covers the whole top left of the window.
- Right of the stripe, the middle dash of h1's bottom band does the same.
- Body's top band shows from y = 50 to 100. Its gap leaves light around x = 200, and its right dash makes the block in the top right, from x = 231 to 300.
- Body's bottom band shows from y = 200 to 250. Its left dash makes the foot in the bottom left, from x = 100 to 168.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `8ex` gives two widths in 3 characters, because h1's font is twice as big and bold. With `57px` (121 characters), h1's bands are 57px wide too. They no longer reach the corners of the window, and 2,996 pixels change. `<p>` instead of `<h1>` (119 characters) gives the same 57px bands and the same 2,996 changed pixels.
- `<img>` costs 5 characters and gives h1 its height. Without it (115 characters), h1 is 0px tall, the light stripe shrinks to a thin line, and 16,429 pixels change.
- `margin:50-32` has no unit and no space. `50px -32px` gives the same picture in 125 characters.
- `+*{` selects body in 3 characters. `body{` gives the same picture in 122 characters.
- `-50%` in the inset makes the window 200px tall out of a body that is only 100px tall. With `0 31%` (118 characters), only the middle 100 rows are left: the body dashes and the top and bottom of the h1 bands are gone, and 15,715 pixels change.
- No space is needed between `8ex` and `#1B5F1E`, or between `-50%` and `31%`. With either space, the same picture takes 121 characters.
- Nothing is closed. `)}}` at the end gives the same picture in 123 characters.

## If you try it at home

In my local Chrome, the official code is close to the target but not identical. The foot in the bottom left is 69px wide, from x = 100 to 168, where the target has 70. The block in the top right starts at x = 231, where the target starts at 230. The window edges fall at x = 99.68 and 300.32, so the columns x = 99 and x = 300 are partly dark, where the target has none.

When I force body's outline to 58px instead of 57, its gaps become 60px, and the foot and the block land exactly where the target has them. The CSS Battle judge gives the code a 100% match.
