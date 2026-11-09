---
title: "An empty variable: a clover in 146 characters"
lang: en
ref: 2026-09-15
permalink: /2026/09/15/an-empty-variable/
description: "How four empty images, one border-radius with an empty variable and a half turn draw the September 15, 2026 CSS Battle target: a four-leaf clover."
target: /assets/targets/2026-09-15.png
target_url: https://cssbattle.dev/play/5ZezM7kuEUF3qoAOjCIx
colors: ["#993576", "#5adab8"]
player: gunnar
chars: 146
score: 699.48
match: 100
code: |
  <img><img><p><img><img><style>&{background:#993576}p{scale:-1}img{margin:22-52 2 72;border:59q solid#5ADAB8;border-radius:64%var(--r,64%)0;+&{--r:
---

The September 15 target is a teal four-leaf clover on plum: two drops and two leaves, set in a square. Gunnar Bittersmann's solution draws four empty `<img>` as solid squares, with one shared `border-radius`. In each pair, the first image is a drop, and the second one, thanks to an empty variable, is a leaf. The second pair sits in a `<p>`, which turns half a turn.

Use **Teaching colors** to see the second image of each pair.

{% include animations/2026-09-15.html lang=page.lang %}

## The code, spaced out

```css
<img><img><p><img><img>            /* two pairs, the second one in a p */
<style>
& { background: #993576 }          /* html */
p { scale: -1 }                    /* half a turn */
img {
  margin: 22 -52 2 72;
  border: 59q solid #5ADAB8;       /* 55px: a 110 × 110 square */
  border-radius: 64% var(--r, 64%) 0;
  + & { --r: }                     /* an img after an img: empty --r */
}
```

## How it works

### 1. Four square images

An `<img>` with no source is an empty inline box. `border:59q solid#5ADAB8` gives it a 59 quarter-millimetre border: 55.75px, which Chrome rounds down to 55. With no content, each image is a solid 110 × 110 square.

`margin:22-52 2 72` places them. On a line, each image starts 72 after the previous one, minus 52: a 20px gap. The first one is at x = 8 + 72 = 80, the second at 80 + 110 − 52 + 72 = 210, both at y = 8 + 22 = 30.

`<p>` starts a new block, with the last two images inside it, on the next line. Unflipped, they would sit at x = 80 and 210 too, from y = 180 to 290.

### 2. Three round corners: a drop

`border-radius:64%var(--r,64%)0` has three values: top-left, then top-right and bottom-left, then bottom-right. `--r` is not set, so `var(--r,64%)` uses its fallback: `64% 64% 0`. Three round corners, and a square one at the bottom right.

64% of 110 is 70.4, and two 70.4 corners on one 110 side do not fit: Chrome scales every radius down by the same factor, to 55. The three corners become half circles: a drop.

### 3. An empty variable: a leaf

`+&` nested in `img` matches an `img` right after another `img`: the second image of each pair. It sets `--r:` with no value at all, which is an empty variable, not a missing one. So `var(--r,64%)` is replaced by nothing, and the radius reads `64% 0`: two values, round top-left and bottom-right, square top-right and bottom-left.

This time no two round corners share a side, so nothing is scaled down: the corners keep their 70.4px. That is a leaf, pointed on its diagonal.

### 4. The p turns half a turn

`p{scale:-1}` scales the `<p>` by −1 on both axes, around its centre (200, 225): a half turn. Its drop, on the left, moves to the bottom right, turned so that its square corner is at the top left. Its leaf moves to the bottom left. Both run from y = 160 to 270, and the four shapes make the clover.

## Golf notes

- One `img` rule draws all four shapes: the border makes them solid, the radius shapes them.
- `var(--r,64%)` with a fallback, then `--r:` left empty, switches one value off for every second image.
- `+&{--r:` is the very end of the code: the empty value is closed by the end of the style sheet.
- Too-big radii get scaled down to half circles for free: `64%` gives both a drop (55) and a leaf (70.4).
- `scale:-1` on the `<p>` turns the second pair, instead of writing two more shapes.
- No closing braces, and `<style>` is never closed.
