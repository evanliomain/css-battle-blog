---
title: "One gradient, two font sizes: a euro sign in 131 characters"
lang: en
ref: 2026-09-21
permalink: /2026/09/21/one-gradient-two-font-sizes/
description: "How one radial gradient measured in em draws both the C and the bars of the September 21, 2026 CSS Battle target: a teal euro sign."
target: /assets/targets/2026-09-21.png
target_url: https://cssbattle.dev/play/tcjIrX3hxT2bt6WNY8xB
colors: ["#1d025e", "#469dba"]
player: emohdaziz
chars: 131
score: 714.77
match: 100
code: |
  <p> <p> <style>* *{background:radial-gradient(1Q at right,#1d025e,5pc,#469dba 0 6.25em,#1d025e)291Q;margin:30%25-85;*{font:8vw/5vw"
---

The September 21 target is a teal euro sign on deep purple: a thick C, open to the right, crossed by two bars. Mohamed Ali's solution writes one radial gradient for every element but `html`. On the canvas, with the default 16px font, it is a ring: the C. In two paragraphs with a 32px font, the same gradient is twice as wide, and inside those thin strips it only shows two bars.

{% include animations/2026-09-21.html lang=page.lang %}

## The code, spaced out

```css
<p>&nbsp;<p>&nbsp;                 /* each one holds a real no-break space */
<style>
* * {                              /* everything but html */
  background:
    radial-gradient(1Q at right,   /* centred on the tile's right edge */
      #1d025e, 5pc,                /* dark, transition hint at 80px */
      #469dba 0 6.25em,            /* light from 80px to 6.25em */
      #1d025e)
    291Q;                          /* tile moved 274.96px right */
  margin: 30% 25 -85;
  * {                              /* the two p */
    font: 8vw / 5vw "";            /* 32px font, 20px line */
  }
}
```

## How it works

### 1. A ring, centred on the right

`* *` matches every element that sits inside another one: everything but `html`. So `html` has no background, and in that case the `body`'s background is used for the whole canvas. It is a gradient with no size, so it fills a 400 × 300 tile, and repeats.

`radial-gradient(1Q at right,…)` is a circle of radius `1Q` (0.94px), centred `at right`: on the right edge of the tile, halfway down. The stops go far past that radius. Dark first; `5pc` alone is a transition hint, at 80px. The light color has position `0`, which is pulled up to 80px: so the color switches sharply at 80px. The light lasts until `6.25em`, which is 100px with a 16px font, then it is dark again. That is a 20px light ring, and only its left half falls inside the tile.

### 2. 291Q: the C of the euro

`291Q` is the tile's x position: 274.96px. The tile repeated on its left now ends at x = 274.96, and its half ring is centred there, at (274.96, 150). It runs from x = 174.96 to 274.96 and from y = 50 to 250: the C.

### 3. Two p with a no-break space

Before each `<p>` closes, there is a no-break space, not a normal one. A normal space alone would collapse, and the `<p>` would be 0px tall. A no-break space stays, so each `<p>` holds one line. The nested `*` gives the two `<p>` `font:8vw/5vw"`: a 32px font with a 20px line. The family is the string `"`, closed by the end of the style sheet.

`margin:30%25-85` places everything. A margin in % uses the width of the parent. The `body` starts 30% of 400 = 120 down, 25 in from each side. The first `<p>` asks for 30% of 350 = 105, which merges with the `body`'s 120: it starts at y = 120, from x = 50 to 350, 20px tall. Between the two `<p>`, the −85 bottom margin and the 105 top margin add up to 20: the second one starts at y = 160.

### 4. The same gradient, at 32px

The `<p>` get the same background from `* *`. But `em` follows the font: in a 32px font, `6.25em` is 200px. The light color now runs from 80px to 200px from the centre. Everything else in the `<p>` is dark, the same color as the background, so the `<p>` hide nothing.

### 5. Two bars

In a `<p>`, the gradient tile is the `<p>` itself, 300 × 20, moved by the same 274.96px. The tile on its left ends at x = 50 + 274.96 = 324.96: the circle is centred there, at the height of the `<p>`. The light part, from 80 to 200px to the left of that centre, runs from x = 124.96 to 244.96. In each 20px strip, that is a bar: the two bars of the euro sign.

## Golf notes

- One gradient, written once, draws the C and the bars: `6.25em` is 100px on the canvas and 200px in the `<p>`.
- `* *` leaves `html` without a background, so the `body`'s fills the canvas, while the `<p>` keep their own.
- `5pc` as a transition hint, then `#469dba 0`: a sharp edge at 80px with a single length.
- `at right` puts the centre on the tile's edge: the tile cuts the ring in half for free.
- A no-break space gives each `<p>` a line, and `5vw` sets its height: no `height` needed.
- `margin:30%25-85` serves the `body` and both `<p>`, because 30% of a different width gives a different margin.
- No closing braces, and `<style>` is never closed.
