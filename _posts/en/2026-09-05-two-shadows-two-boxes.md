---
title: "Two shadows, two boxes: an open frame in 118 characters"
lang: en
ref: 2026-09-05
permalink: /2026/09/05/two-shadows-two-boxes/
description: "How two box shadows shared by html and the body, with a line height that drops to 0, draw the September 5, 2026 CSS Battle target: an open black frame on orange."
target: /assets/targets/2026-09-05.png
target_url: https://cssbattle.dev/play/PBllh6aGfOPa9BtjR5m1
colors: ["#f8b140", "#000000", "#ffffff"]
player: fmata
chars: 118
score: 729.91
match: 100
code: |
  <style>&{border-radius:63q}*{box-shadow:inset 0 0 0 32q,-32q 0 0 8lh#F8B140;margin:10%90;*{margin:32%160 32%30;font:0'
---

The September 5 target is a thick black rounded frame on orange, with a white inside. Its left side is cut open in the middle, with a small black block just inside the gap. fmata's solution gives `html` and the `body` the same two shadows. On `html`, the inset shadow is the frame and the outer one, spread by `8lh`, is the orange background. On the `body`, a font of 0 makes `8lh` worth 0: its inset shadow fills it as the black block, and its orange shadow, no longer spread, cuts the gap.

Use **Teaching colors** to see the `body`'s orange shadow in pink.

{% include animations/2026-09-05.html lang=page.lang %}

## The code, spaced out

```css
<style>
& { border-radius: 63q }             /* html: 59.5px corners */
* {                                  /* html, then the body */
  box-shadow:
    inset 0 0 0 32q,                 /* black, 30.24px inside */
    -32q 0 0 8lh #F8B140;            /* orange, 30.24 left, spread 8lh */
  margin: 10% 90;
  * {                                /* the body */
    margin: 32% 160 32% 30;
    font: 0 '';                      /* font size 0: 8lh = 0 */
  }
}
```

## How it works

### 1. html: a black frame

`*` gives `html` `margin:10%90`. A margin in % uses the width, so 10% of 400 = 40 at the top and the bottom, and 90 on the sides: `html` is 220 wide, from x = 90 to 310, and in quirks mode 300 − 80 = 220 tall, from y = 40 to 260. `&{border-radius:63q}` rounds its corners by 59.5px.

The first shadow, `inset 0 0 0 32q`, is drawn inside the box: a band 32q (30.24px) wide along its rounded edge. With no color, it uses the text color, black. `html` has no background, so its inside stays white: a black frame.

### 2. The orange shadow covers the rest

The second shadow, `-32q 0 0 8lh#F8B140`, is an orange copy of the box, moved 30.24px left and spread by `8lh`. `lh` is the line height, 18px here, so the spread is 144px: the copy covers the whole canvas.

A shadow is never painted under its own box. So the orange stops at `html`'s rounded edge, and the frame and the white inside stay as they are. The orange is the background.

### 3. The body: a black block

The nested `*` gives the `body` `margin:32%160 32%30`. The % use `html`'s 220px width: 32% is 70.4 at the top and the bottom. With 30 on the left and 160 on the right, the `body` runs from x = 120 to 150, and from y = 110.4 to 189.6 (in quirks mode, it fills `html` minus its margins: 220 − 140.8 = 79.2).

It gets the same two shadows. The inset one is 30.24px wide, and the `body` is only 30 wide: it is filled black. That is the block just inside the frame.

### 4. A zero font opens the frame

`font:0'` sets the `body`'s font size to 0. Its line height is `normal`, which is 0 for a 0 font, so `8lh` is 0. The orange shadow is not spread any more: it is just a copy of the `body`, moved 30.24px left, from x = 89.8 to 119.8, over the frame's left side. The part under the `body` itself is not painted. That is the gap in the frame.

## Golf notes

- Two shadows in `*` do four jobs: the frame and the background on `html`, the block and the gap on the `body`.
- `8lh` switches from 144px to 0 just by setting the `body`'s font to 0.
- The huge orange shadow paints the background while leaving `html`'s rounded box alone.
- `10%90` and `32%160 32%30` use % margins on two different widths.
- `32q` serves both as the frame width and as the shift of the gap: they line up.
- No closing braces, and `<style>` is never closed.
