---
title: "One compounding zoom: three white steps in 106 characters"
lang: en
ref: 2026-11-25
permalink: /2026/11/25/three-steps-from-one-compounding-zoom/
description: "How one shared border, one shared margin and zoom:.9 on three nested boxes draw the November 25, 2026 CSS Battle target: white steps on a sage green background, cut by a gap."
target: /assets/targets/2026-11-25.png
target_url: https://cssbattle.dev/play/DW1tfZGD1dHngYqiTcNe
colors: ["#fff", "#597d"]
player: benjamintordjman
chars: 106
score: 745.65
match: 100
code: |
  <img height=95><style>*{zoom:.9;margin:-12.7 0;border-inline:66q solid#fff}&{margin:150-7;background:#597d
---

The November 25 target shows white blocks on a sage green background, along the middle line. On the left, three steps grow toward the center: 50 × 30, 50 × 50, then 90 × 70. On the right, after a 110px gap, two steps shrink toward the edge: 50 × 50, then 50 × 30. Benjamin Tordjman draws them with three nested boxes, `html`, `body` and an empty `<img>`, which share one rule. Their side borders are the steps. `zoom:.9` on every box makes each one smaller than its parent, so a single border width gives three sizes.

The **teaching colors** give each box its own color, and the **wide view** shows `html` sticking out on both sides of the canvas.

{% include animations/2026-11-25.html lang=page.lang %}

## The code, spaced out

```css
<img height=95>                  /* a third box: html > body > img */
<style>
* {                              /* the same rule for all three */
  zoom: .9;                      /* ×0.9, ×0.81, ×0.729 */
  margin: -12.7 0;               /* body and img stick out at the top and bottom */
  border-inline: 66q solid #fff; /* white left and right borders: the steps */
}
& {                              /* html */
  margin: 150 -7;                /* 135px down, 6.3px past each side */
  background: #597d;             /* goes to the canvas: the sage green */
}
```

## How it works

### 1. Three boxes and one border

`<img height=95>` is the only tag. The browser puts it in the `body`, which is in `html`: three boxes, each inside the one before. An `<img>` with no `src` has no picture, so its content is 0 wide. I measured it: the `<img>` is exactly as wide as its two borders.

`*` gives all three boxes the same `border-inline`: a white border on the left and on the right, none at the top or bottom. `66q` is 66 quarter-millimeters, 62.36px. Without the zoom, Chrome draws it at 62px on every box.

Each box is a white border, a transparent middle and another white border. The boxes sit inside each other, so their borders line up side by side: that makes the steps. The middle of the `body` that the `<img>` does not cover stays transparent: that is the green gap.

### 2. The zoom compounds

`zoom:.9` is in the `*` rule, so every box has it. A child is zoomed inside a parent that is already zoomed: `html` is drawn at ×0.9, the `body` at ×0.81 and the `<img>` at ×0.729.

Everything shrinks with it: the border, the margins and the `<img>`'s height. 62.36 × 0.9 = 56.12, × 0.81 = 50.51, × 0.729 = 45.46. Chrome rounds a border width down to a whole pixel, and I measured 56, 50 and 45px. The target's steps are 50 wide, then 50, then 90 for the `<img>` (two borders of 45).

### 3. The html band

`&` on its own is the root, `html`. Its `margin:150-7` is in `html`'s own zoom: 150 × 0.9 = 135px at the top, −7 × 0.9 = −6.3px on each side. With a negative side margin, `html` is wider than the canvas: I measured it from x = −6.3 to 406.3. Its 56px borders show 49.7px on the canvas on each side. With `margin:150 0`, the white band on the left would be 56 wide instead of about 50.

The page has no doctype, so it runs in quirks mode, where `html` stretches over the height that is left: 300 − 2 × 135 = 30px. The `<img>`'s line adds 0.19, and I measured `html` from y = 135 to 165.19.

### 4. The body

The `body` fills `html`'s content box: x = 49.7 to 350.3. Its `margin:-12.7 0` is −12.7 × 0.81 = −10.29px at the top and at the bottom, so it sticks out of `html` by that much. I measured it 50.75 tall, from y = 124.72 to 175.47. Its two 50px borders are the 50 × 50 steps, on the left (x = 49.7 to 99.7) and on the right (x = 300.3 to 350.3).

### 5. The img

The `<img>` is inline: it sits at the start of the `body`'s first line, at x = 99.7. `height=95` is 95 × 0.729 = 69.26px. Its top margin, −12.7 × 0.729 = −9.26px, pulls it 9.26 above the `body`: I measured it from y = 115.47 to 184.72. With its 0 width and its two 45px borders, it is 90 wide, to x = 189.7.

That is the tallest step, 90 × 70 in the target. From x = 189.7 to 300.3, the `body` shows its transparent middle: the green gap.

### 6. The green

`html` has a background, so it goes to the whole canvas, which starts out white. `#597d` is a 4-digit color with alpha: `#559977` at `dd` = 221/255 = 86.7% opacity. Laid on white, it gives rgb(108 167 137) in my render. The target is `#6da78a`, rgb(109 167 138), one step away on two channels. My local test counts 0 wrong pixels, and the site gives 100%.

## Golf notes

- `<img height=95>` is a box with a height and no CSS for it: no `src`, no closing tag, and its width is its borders.
- One `*` rule styles the three boxes, and `&` targets `html` alone in 1 character instead of 4.
- `zoom:.9` on `*` turns one border, one margin and one height into three different sizes, one per level.
- `border-inline` sets the left and right borders in one property, and `66q` writes 62.36px in 3 characters.
- `150-7` needs no space: the minus sign starts the second value.
- `#597d` is 2 characters shorter than `#6da78a`, and the white canvas under it does the rest.
- The `<style>` and the last rule are never closed.
