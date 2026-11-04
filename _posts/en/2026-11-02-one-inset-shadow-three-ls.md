---
title: "One inset shadow, three Ls: a square spiral in 112 characters"
lang: en
ref: 2026-11-02
permalink: /2026/11/02/one-inset-shadow-three-ls/
description: "How one inset box-shadow, shared by html, body and a p sized by an empty img, draws the November 2, 2026 CSS Battle target: three nested L shapes, the last one flipped."
target: /assets/targets/2026-11-02.png
target_url: https://cssbattle.dev/play/yqo0rTLub7PXnnSupZQT
colors: ["#492fb0", "#db5ead"]
player: koda_pig
chars: 112
score: 737.55
match: 100
code: |
  <p><img><style>*{background:#492FB0;margin:60 110;box-shadow:inset 32q -32q#DB5EAD;*{margin:0 0 60 60;*{scale:-1
---

The November 2 target is a pink square spiral on violet: inside a 180px square, a big L, a medium L nested in it, and a small hook turned the other way, all sharing the top right corner. koda_pig draws the three shapes with one `box-shadow`, given to three nested boxes. Each box is smaller than its parent by the same margin, and the smallest one is flipped with `scale:-1`. The neat part is how the smallest box gets its height: from an empty `<img>`.

{% include animations/2026-11-02.html lang=page.lang %}

## The code, spaced out

```css
<p><img>                         /* two free elements: p, and an img inside it */
* {                              /* html, then everything */
  background: #492FB0;
  margin: 60 110;
  box-shadow: inset 32q -32q #DB5EAD;   /* about 30px -30px */
  * {                            /* body, p, img */
    margin: 0 0 60 60;
    * {                          /* p and img */
      scale: -1;
    }
  }
}
```

## How it works

### 1. html is a 180px square

`*` matches `html` first. Its violet background goes to the whole canvas. `margin:60 110` leaves it 180px wide, and in quirks mode, which CSS Battle uses, `html` fills the page height minus its margins: 300 − 60 − 60 = 180. A 180×180 square at (110, 60).

### 2. An inset shadow draws an L

`box-shadow:inset 32q -32q` is an inset shadow with no blur. It paints inside the box, everywhere except under a copy of the box moved by the offset: 30px right and 30px up (32q is 30.24px). The copy covers all but a strip on the left and a strip at the bottom. So the shadow is a pink L, 30px thick.

### 3. body: the same L, 60px smaller

`* *` matches the descendants. `margin:0 0 60 60` makes `body` 120px wide (180 − 60) and, by quirks mode again, 120px tall (180 − 60). It sits in the top right corner of `html`, at (170, 60).

`body` has the same violet background, painted over the inside of the first L, and the same shadow: a second L, 120px wide, nested in the first one.

### 4. p gets its height from an img

The `<p>` gets the same margin, so it is 60px wide, at (230, 60), in the corner again. But it holds no text: on its own it would be 0px tall. I checked: without the `<img>`, the `<p>` is flat and the small hook disappears.

The `<img>` has no source, so it is a 0×0 box. But `* *` gives it `margin:0 0 60 60` too. An image sits on the line with its margins, so its margin box, 60×60, makes the line 60px tall. The `<p>` wraps that line: it is 60×60, without any `height`. Its shadow draws a third L, 60px wide.

### 5. scale:-1 flips the last L

`* * *` matches one level deeper: the `<p>` and the `<img>` inside it. `scale:-1` flips the `<p>` around its center, horizontally and vertically. Its L, a strip on the left and one at the bottom, becomes a strip at the top and one on the right: the small hook. The 30×30 cell left in its middle shows the violet of the `<p>`.

The `<img>` is flipped too, but it is 0×0, so its background and shadow never show.

## Golf notes

- One `box-shadow` on `*` draws all three shapes: the margins do the sizing, the shadow does the drawing.
- `<img>` costs 5 characters and replaces a `height:60` on the `<p>`: it gives the line its height through its margin box.
- `32q` is 30.24px, so the edges land 0.24px off the pixel grid; CSS Battle still scores it 100%.
- `-32q#DB5EAD`: no space needed before `#`.
- Quirks mode: `margin:60 110` with no units, and heights that come from the margins.
- `<style>` is never closed, and the nested rules end the code.
