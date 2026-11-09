---
title: "One gradient, zoomed: a wrench in 92 characters"
lang: en
ref: 2026-09-12
permalink: /2026/09/12/one-gradient-zoomed/
description: "How one radial gradient, painted on html and on a body zoomed nine times, draws the September 12, 2026 CSS Battle target: a cream wrench."
target: /assets/targets/2026-09-12.png
target_url: https://cssbattle.dev/play/xINN7erbUm2K2I0zG5YF
colors: ["#1d025e", "#f5e3b5"]
player: eguiluz
chars: 92
score: 766.44
match: 100
code: |
  <style>*{background:radial-gradient(1Q,#f5e3b5 53q,#1d025e)0-58q;*{margin:-333%19.4 5;zoom:9
---

The September 12 target is a cream wrench on deep purple: a round head with a square slot at the top, and a long handle below. David Eguiluz's solution is a single gradient, written once for every element. On `html`, it is a disc: the head. The `body` is zoomed nine times, which turns it into a narrow strip that starts far above the canvas, and makes the same disc nine times bigger. Its edge crosses the strip almost flat: cream below for the handle, purple above for the slot.

{% include animations/2026-09-12.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                         /* html, then the body */
  background:
    radial-gradient(1Q, #f5e3b5 53q, #1d025e)   /* a cream disc, r = 50.08 */
    0 -58q;                                 /* tile moved 54.8px up */
  * {                                       /* the body */
    margin: -333% 19.4 5;
    zoom: 9;                                /* everything nine times bigger */
  }
}
```

## How it works

### 1. A disc: the head

`*` gives every element the same background, and `html`'s background is used for the whole canvas. With no size, the gradient tile is as big as the canvas, 400 × 300.

`radial-gradient(1Q,#f5e3b5 53q,#1d025e)` is a circle of radius `1Q` (0.94px), centred in the tile. Cream goes up to `53q` (50.08px). The purple stop has no position, so it would sit at the end of the 0.94px circle, but a stop cannot come before the one listed before it: it moves up to 50.08px. That is a sharp cream disc of radius 50.08.

`0-58q` is the tile's position: x = 0, and y = −58q, which moves it 54.8px up. The disc is now centred at (200, 95.2): the head of the wrench.

### 2. The zoomed body: a strip

The nested `*` matches the `body`. `zoom:9` makes it, and every length in it, nine times bigger.

`margin:-333%19.4 5` sets the top, the sides and the bottom. The sides are 19.4 × 9 = 174.6 on screen, so the `body` runs from x = 174.6 to 225.4: 50.8 wide. A margin in % uses the parent's width, 400 on screen: −333% of 400 is −1332, so the `body`'s top is far above the canvas. Without a doctype, the page is in quirks mode, and the `body` fills the page height minus its margins: its bottom stops 5 × 9 = 45 above the bottom of the canvas, at y = 255. It is 1587 tall.

### 3. The same disc, nine times bigger

The `body` has the same background, and it is zoomed too: the disc's radius is 53q × 9 = 450.7, and the tile, now the size of the `body`, 50.8 × 1587, moves up by 58q × 9 = 493.2.

The tile repeats. The copy below the first one has its disc centred at y = 555.3, below the canvas. Its top edge passes at y = 555.3 − 450.7 = 104.6. Over the `body`'s narrow 50.8px, that curve is almost flat: it drops by less than a pixel at the sides.

Below that edge, the `body` is cream: the handle, down to y = 255. Above it, the `body` is purple, and it covers the middle of the head: that is the slot. The `body` is painted after `html`, so the slot cuts into the disc.

## Golf notes

- One gradient, written once in `*`, draws the head on `html` and the handle with its slot on the `body`.
- `zoom:9` makes the `body`'s disc nine times bigger: its edge is almost a straight line across a 50px strip.
- `-333%` puts the `body`'s top far above the canvas, so the tile repeat brings a disc right where the handle starts.
- `1Q … 53q` with a stop and no second length gives a sharp disc.
- `19.4 5` in zoomed pixels gives 174.6 and 45 on screen in 6 characters.
- No closing braces, and `<style>` is never closed.
