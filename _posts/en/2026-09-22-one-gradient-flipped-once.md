---
title: "One gradient, flipped once: an S in 143 characters"
lang: en
ref: 2026-09-22
permalink: /2026/09/22/one-gradient-flipped-once/
description: "How one radial gradient, used by html and by a flipped body, draws the September 22, 2026 CSS Battle target: two half rings on a dark bar."
target: /assets/targets/2026-09-22.png
target_url: https://cssbattle.dev/play/KTcWkhPNnnWzPUv22eHs
colors: ["#8e7b3b", "#463c1d"]
player: koda_pig
chars: 143
score: 702.36
match: 100
code: |
  <style>*{background:radial-gradient(1q at 0,#8E7B3B 5ch,#463C1D 0 53q,#8E7B3B)215px 53q;*{scale:-1;margin:50 215 50-30;box-shadow:-32q 0#463C1D
---

The September 22 target is dark brown on olive: a vertical bar with a half ring on its left at the top and another one on its right at the bottom, like an S cut in two. koda_pig's solution writes one radial gradient for every element. On `html`, it draws the bottom half ring. On the `body`, the same gradient draws the top one, because `scale:-1` turns the `body` half a turn. The same flip sends the `body`'s shadow to the right, where it becomes the bar.

Use **Teaching colors** to see what the `body` draws in orange.

{% include animations/2026-09-22.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html, then the body */
  background:
    radial-gradient(1q at 0,         /* centred on the tile's left edge */
      #8E7B3B 5ch,                   /* light up to 40px */
      #463C1D 0 53q,                 /* dark up to 50.08px: a ring */
      #8E7B3B)
    215px 53q;                       /* tile position */
  * {                                /* the body */
    scale: -1;                       /* a half turn */
    margin: 50 215 50 -30;           /* x −30 → 185, 200 tall */
    box-shadow: -32q 0 #463C1D;      /* 30.24px left, so right once flipped */
  }
}
```

## How it works

### 1. A half ring in a tile

`*` gives every element the same background. `html`'s background is used for the whole canvas. A gradient with no size fills its area, here 400 × 300, and repeats.

`radial-gradient(1q at 0,…)` is a circle of radius `1q` (0.94px), centred at `0`: a single position value is x, and y defaults to the centre. So the centre is on the tile's left edge, halfway down. The color stops are longer than the radius, which is fine: olive up to `5ch` (40px), dark from 40px (`0` is pulled up to the stop before it) to `53q` (50.08px), then olive again. That is a 10px dark ring. Each tile only draws the part of the ring that falls inside it: the right half.

### 2. 215px 53q: the bottom ring

`215px 53q` places the tile at x = 215, y = 50.08. The centre of the ring is now at (215, 200.08), and the half ring opens to the left, from y = 150 to 250: the bottom part of the S. The repeated tiles around this one have their rings 400px or 300px away, off the canvas.

### 3. The body and the same gradient

The nested `*` matches the elements inside another one: the `head`, never shown, and the `body`. `margin:50 215 50-30` gives the `body` a left margin of −30 and a right margin of 215, so it runs from x = −30 to 185, 215 wide. In quirks mode, it is 300 − 50 − 50 = 200 tall, from y = 50 to 250.

The `body` gets the same background, in its own 215 × 200 area, with the same `215px 53q`. 215px is exactly one tile width, so a tile starts on the `body`'s left edge, and its half ring is centred there, at y = 50.08 + 100 from the top of the `body`. That is mostly off the canvas.

### 4. scale:-1 flips the body

`scale:-1` scales the `body` by −1 on both axes, around its centre: the same as a half turn. Everything in the `body` turns with it, background included. The half ring jumps from its left edge to its right edge, at (185, 99.92), and now opens to the right: the top part of the S.

### 5. The shadow moves right

`box-shadow:-32q 0#463C1D` moves a dark copy of the `body` 30.24px to the left. But the shadow turns with the `body`, so on screen it moves 30.24px to the right: from x = 0.24 to 215.24.

A shadow is never painted under the box that casts it. The part under the `body` (up to x = 185) is cut away, and only a strip from x = 185 to 215.24 is left, from y = 50 to 250: the vertical bar, which joins the two half rings.

## Golf notes

- One gradient, written once in `*`, draws both half rings: `scale:-1` on the `body` gives the second one the other way round.
- `at 0` puts the centre on the tile's edge, so the tile cuts the ring in half for free.
- `#463C1D 0 53q` uses the `0` trick: a stop at 0 is pulled up to the stop before it, which makes a sharp edge.
- The shadow only shows outside the `body`: a 30px bar with no width or height of its own.
- `5ch`, `53q` and `32q` give 40, 50.08 and 30.24 in 3 characters each.
- No closing braces, and `<style>` is never closed.
