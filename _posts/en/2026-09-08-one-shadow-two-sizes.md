---
title: "One shadow, two sizes: a camera in 136 characters"
lang: en
ref: 2026-09-08
permalink: /2026/09/08/one-shadow-two-sizes/
description: "How one spread shadow in em, huge on html and small on a tiny-font paragraph, draws the September 8, 2026 CSS Battle target: a dark camera on yellow."
target: /assets/targets/2026-09-08.png
target_url: https://cssbattle.dev/play/YaO5dVF3I9R870zMutcX
colors: ["#f1d36f", "#333333"]
player: krhek
chars: 136
score: 709.43
match: 100
code: |
  .<p>.<style>*{background:#333;margin:-25 60;border-radius:.6lh}&,p{box-shadow:0 0 0 63em#F1D36F;margin:75 80}p{margin:52 30;font:2%/63q"
---

The September 8 target is a dark grey camera on yellow: a wide rounded body, a smaller bump on top, and a round lens with a yellow ring. Wojciech Russek's solution gives `html` and a `<p>` the same yellow shadow, spread by `63em`. On `html`, that is 1008px: it paints the whole yellow background around the camera body. On the `<p>`, which has a tiny font, it is only 20px: the yellow ring of the lens.

Use **Teaching colors** to see the `<p>`'s shadow in orange.

{% include animations/2026-09-08.html lang=page.lang %}

## The code, spaced out

```css
.<p>.                                /* two dots: two lines of text */
<style>
* {
  background: #333;
  margin: -25 60;                    /* for the body */
  border-radius: .6lh;
}
&, p {                               /* html and the p */
  box-shadow: 0 0 0 63em #F1D36F;    /* a yellow ring, 63em wide */
  margin: 75 80;                     /* for html */
}
p {
  margin: 52 30;
  font: 2% / 63q "";                 /* 0.32px font, 59.53px line */
}
```

## How it works

### 1. html: the camera body

`&,p` gives `html` (the lone `&`) `margin:75 80`: 240 wide, from x = 80 to 320, and in quirks mode 300 − 150 = 150 tall, from y = 75 to 225. `*` gives it a dark grey background, which goes to the whole canvas, and `border-radius:.6lh`: `lh` is the line height, 18px here, so the corners are rounded by 10.8.

`box-shadow:0 0 0 63em#F1D36F` is a yellow copy of the box, spread by 63em = 63 × 16 = 1008px: it covers the whole canvas. But a shadow is never painted under its own box. So the canvas stays dark grey only inside `html`'s rounded box: the camera body.

### 2. The body: the viewfinder

The `body` gets `margin:-25 60` from `*`. Inside `html`, it runs from x = 140 to 260, and its −25 top margin moves it 25 above `html`, to y = 50. It has the same dark background and the same 10.8 corners. Its top part, from y = 50 to 75, sticks out above the camera body: the viewfinder.

### 3. The p: a disc

The code starts with a dot, before `<p>`. That dot is text in the `body`, so the `body` gets one line, 18px tall, before the `<p>`. `margin:52 30` puts the `<p>` from x = 170 to 230, and 52 below that line: at y = 50 + 18 + 52 = 120.

The `<p>` also holds a dot, so it has one line of text. `font:2%/63q"` sets its line height to `63q`, 59.53px: the `<p>` is 60 × 59.53. Its `.6lh` radius is now 0.6 × 59.53 = 35.7, more than half its size: a dark grey disc.

### 4. Its shadow: the lens

The `<p>` gets the same `0 0 0 63em` shadow as `html`. But `em` follows the element's font size, and the `<p>`'s is `2%` of 16px: 0.32px. Chrome never shows text below 6px, but that limit does not change the value of `em`: I measured `63em` at 63 × 0.32 = 20.16px on the `<p>`.

So the shadow is a yellow ring, 20px wide, around the disc, with round corners that follow it: the lens. It is painted over the camera body, and the disc stays dark inside it.

## Golf notes

- One shadow in `em` gives two sizes: 1008px on `html`, 20px on the `<p>`.
- The huge shadow paints the yellow background and leaves `html`'s rounded box dark, with no extra element.
- `2%` makes `em` tiny, and `63q` sets the line height, so the `<p>`'s size comes from one line of text.
- `.6lh` gives 10.8 corners on the boxes and a full disc on the `<p>`, because `lh` follows the line height.
- Two dots, one before and one inside the `<p>`, give the lines that place and size it.
- No closing braces, and `<style>` is never closed.
