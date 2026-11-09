---
title: "Four shadows, drawn twice: a cross in 125 characters"
lang: en
ref: 2026-09-24
permalink: /2026/09/24/four-shadows-drawn-twice/
description: "How four box shadows on two zero-size boxes, one of them turned half a turn, draw the September 24, 2026 CSS Battle target: a navy cross and two squares."
target: /assets/targets/2026-09-24.png
target_url: https://cssbattle.dev/play/dbRkR8Cx8tq9nua91PB7
colors: ["#fade8b", "#3a4b86"]
player: kieron
chars: 125
score: 721.52
match: 100
code: |
  <style>*{scale:-1;background:#fade8b;margin:37.5%50%;color:3A4B86;box-shadow:0 0 0 5ch,5pc 0 0 5ch,0 5pc 0 5ch,-5lh 5lh 0 32Q
---

The September 24 target is navy on pale yellow: a thick cross, a small square at the top right and another one at the bottom left. The whole picture looks the same after a half turn. Kieron's solution uses that: one rule gives `html` and the `body` the same four shadows, around the same point. `scale:-1` turns `html`'s shadows half a turn, while the `body`, flipped twice, keeps its own the right way round. Four shadows written once make the eight shapes.

Use **Teaching colors** to see which shadows belong to `html` and which to the `body`.

{% include animations/2026-09-24.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html and body */
  scale: -1;                       /* a half turn each */
  background: #fade8b;
  margin: 37.5% 50%;               /* 150 and 200: a box of 0 × 0 */
  color: 3A4B86;                   /* a hex with no # works in quirks mode */
  box-shadow:
    0 0 0 5ch,                     /* centre square, 80 × 80 */
    5pc 0 0 5ch,                   /* right arm */
    0 5pc 0 5ch,                   /* bottom arm */
    -5lh 5lh 0 32Q;                /* small square, bottom left */
}
```

## How it works

### 1. Two boxes shrunk to a point

`*` matches every element: `html`, the `head` (never shown), the `body` and the `<style>` (not shown either). Only `html` and the `body` matter.

A margin in % uses the width of the containing block. For `html`, that is the 400px frame: `37.5%50%` gives 150px at the top and bottom, and 200px on the sides. `html` is 400 − 200 − 200 = 0 wide. Without a doctype, the page is in quirks mode, and `html` takes the height its margins leave: 300 − 150 − 150 = 0. `html` is a point at (200, 150).

The `body` gets the same `margin:37.5%50%`, but inside `html`, which is 0 wide: every margin is 0. The `body` is a point too, at the same place.

### 2. One shadow: the centre square

A shadow with no offset and no blur, spread by `5ch`, is a copy of the box, 5ch bigger all around. `1ch` is the width of a "0" in the default 16px font: 8px, so `5ch` is 40px. Around a point, that makes an 80 × 80 square, from (160, 110) to (240, 190).

A shadow with no color uses the text color: `color:3A4B86`, a hex with no `#`, which quirks mode accepts for `color`.

### 3. Three more shadows

`5pc 0 0 5ch` is the same square, moved 5pc = 80px to the right: the right arm. `0 5pc 0 5ch` moves it 80px down: the bottom arm.

`-5lh 5lh 0 32Q` spreads by `32Q` = 30.24px, so it is a 60.48 square. `lh` is the line height, 18px here, so it moves 90px left and 90px down: its centre is at (110, 240). That is the small square at the bottom left.

### 4. scale:-1 on html: a half turn

`scale:-1` scales by −1 on both axes, around the centre of the box. For `html`, that centre is the point (200, 150). Flipping both axes is the same as a half turn. `html`'s shadows move to the other side: the left arm, the top arm, and the small square at the top right. The centre square stays where it is.

### 5. The body, flipped twice

The `body` has the same four shadows and its own `scale:-1`, around the same point. It is drawn inside `html`, which is already flipped. Two half turns around the same point cancel out, so the `body`'s shadows end up the right way round: the right arm, the bottom arm and the small square at the bottom left.

Together, `html` and the `body` draw the full cross and the two opposite squares. The canvas keeps the pale yellow, because `html`'s background is used for the whole canvas, with no flip.

## Golf notes

- The picture looks the same after a half turn, so half of it is enough: `scale:-1` on `*` draws the other half.
- `scale:-1` on both elements, in one rule, flips only one set: the `body`'s two flips cancel out.
- `margin:37.5%50%` shrinks `html` to a point in the centre, and the same value gives 0 for the `body`.
- Four different units give the four lengths in 3 characters each: `5ch` = 40, `5pc` = 80, `5lh` = 90, `32Q` = 30.24.
- `color:3A4B86` colors every shadow at once, with no `#`.
- No closing brace, and `<style>` is never closed.
