---
title: "One border, three sizes: a printer in 140 characters"
lang: en
ref: 2026-09-16
permalink: /2026/09/16/one-border-three-sizes/
description: "How one border, measured in ch and shrunk by zoom, draws the September 16, 2026 CSS Battle target: a brown printer with a sheet and a tray."
target: /assets/targets/2026-09-16.png
target_url: https://cssbattle.dev/play/4p0BAlG4T8ddxGUbcOhn
colors: ["#fae29e", "#743f3f"]
player: selenit
chars: 140
score: 705.33
match: 100
code: |
  <h2><style>*{background:#FAE29E;border:solid 6.3ch#743F3F;margin:-550-50}&{border-radius:53q 53q 0 0;margin:25%85;>*{zoom:.2;margin:8%25-400
---

The September 16 target is a brown printer on pale yellow: a body rounded at the top, an open tray at the bottom, and a sheet sticking out of the top. Ilya Streltsyn's solution gives every element the same `6.3ch` brown border. On `html`, it is 50px thick and fills the box: the printer. The `body`, zoomed to 0.2, has a 10px frame around its yellow background: the tray. An empty `<h2>` inside it, with a bigger font but the same zoom, is a 15px border on all sides: the sheet.

Use **Teaching colors** to see which element draws which part.

{% include animations/2026-09-16.html lang=page.lang %}

## The code, spaced out

```css
<h2>
<style>
* {
  background: #FAE29E;
  border: solid 6.3ch #743F3F;      /* 50px; 15px on the zoomed h2 */
  margin: -550 -50;                 /* for the h2 */
}
& {                                 /* html */
  border-radius: 53q 53q 0 0;       /* round top corners */
  margin: 25% 85;                   /* 230 × 100 */
  > * {                             /* the body */
    zoom: .2;                       /* five times smaller */
    margin: 8% 25 -400;
  }
}
```

## How it works

### 1. html: a thick border

`*` gives every element a yellow background and `border:solid 6.3ch#743F3F`. `1ch` is the width of a "0" in the current font: 8px in the default 16px font. So `6.3ch` is 50.4px, and Chrome rounds a border width down to a whole pixel: 50.

At the top level of a style sheet, a lone `&` matches the root, `html`. `margin:25%85` puts 25% of 400 = 100 at the top and the bottom, and 85 on the sides. In quirks mode, `html` takes the height its margins leave: 300 − 200 = 100. So it is a 230 × 100 box from x = 85 to 315 and y = 100 to 200. With 50 of border on every side, there is no height left for its content: the box is solid brown. Its yellow background goes to the canvas.

### 2. The rounded top

`border-radius:53q 53q 0 0` rounds the top-left and top-right corners by 53 quarter-millimetres, 50.08px. That is the body of the printer.

### 3. The zoomed body: the tray

`>*` nested in `&` matches the children of `html`: the `head`, never shown, and the `body`. `zoom:.2` makes the `body` five times smaller: its 50px border shows as 10px.

`margin:8%25-400` is in zoomed pixels, except the %: a margin in % uses the parent's width, here `html`'s 130px of content, so 8% is 10.4 on screen. The side margins are 25 × 0.2 = 5 on screen: the `body` runs from x = 135 + 5 = 140 to 260. It starts 10.4 under `html`'s content, at y = 160.39.

In quirks mode, the `body` fills `html`'s content height, 0, minus its own margins. The bottom margin is −400, so −80 on screen: 0 − 10.39 + 80 = 69.61. The `body` runs from y = 160.39 to 230: a frame with a 10px border and a yellow inside, which goes past the bottom of `html`. That is the tray.

### 4. The h2: the sheet

The `<h2>` keeps the `*` margin, `-550-50`, but it is inside the zoomed `body`, so on screen that is −110 at the top and −10 on the sides. It runs from x = 140 to 260, and its top is 110 above the `body`'s content: y = 60.39.

An `<h2>` has a 1.5em font, 24px, so its `6.3ch` border is 6.3 × 12 = 75.6, rounded down to 75, and 15 on screen. The `<h2>` is empty, so it is only its top and bottom borders: 15 + 15 = 30 tall, from y = 60.39 to 90.39. That is the sheet above the printer.

## Golf notes

- One border in `*` gives three thicknesses: `ch` follows the font, and `zoom` scales the result.
- `6.3ch` is 50 on `html`, 10 on the zoomed `body`, 15 on the `<h2>`.
- `zoom:.2` lets the `body` reuse the big `*` values and shrink them.
- The `<h2>`'s margin comes from the same `*` rule as everything else: `-550-50` only makes sense once zoomed.
- `25%85` and `8%25-400` need no space after `%`.
- No closing braces, and `<style>` is never closed.
