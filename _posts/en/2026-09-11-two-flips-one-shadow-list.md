---
title: "Two flips, one shadow list: a pill and four bars in 151 characters"
lang: en
ref: 2026-09-11
permalink: /2026/09/11/two-flips-one-shadow-list/
description: "How a line height of 0 and two scale:-1 draw the September 11, 2026 CSS Battle target: a blue pill crossed by bars."
target: /assets/targets/2026-09-11.png
target_url: https://cssbattle.dev/play/7vxnmvdZG5jOA5grQWZT
colors: ["#ffd0bd", "#6b86e1"]
player: selenit
chars: 151
score: 694.85
match: 100
code: |
  <p><style>&,p{border:solid 2cap;background:#FFD0BD;color:6B86E1;border-radius:5lh}*{margin:60 8.33lh;*{box-shadow:5pc -11q,64q 32q;scale:-1;font:8px/0'
---

The September 11 target is blue on pale pink: a tall pill outline, a bar across its middle, and four short bars sticking out of its sides, two on the left and two on the right, at different heights. Ilya Streltsyn's solution uses three boxes. `html` is the pill. The `body` and an empty `<p>` sit on the same spot in the middle, and both carry the same two shadows. The `<p>` is flipped twice, so its shadows go right; the `body` is flipped once, so its shadows go left.

Use **Teaching colors** to see the `<p>`'s shadows in orange and the `body`'s in green.

{% include animations/2026-09-11.html lang=page.lang %}

## The code, spaced out

```css
<p>
<style>
&, p {                             /* html and the p */
  border: solid 2cap;              /* two capital heights */
  background: #FFD0BD;
  color: 6B86E1;                   /* a hex with no # works in quirks mode */
  border-radius: 5lh;
}
* {
  margin: 60 8.33lh;
  * {                              /* the body and the p */
    box-shadow: 5pc -11q, 64q 32q;
    scale: -1;
    font: 8px / 0 '';              /* line height 0: lh = 0 */
  }
}
```

## How it works

### 1. html: a pill

`*` gives `html` `margin:60 8.33lh`. `lh` is the line height of the element: 18px with the default font, so `8.33lh` is 150. `html` runs from x = 150 to 250, and in quirks mode it takes the height its margins leave: 300 − 120 = 180, from y = 60 to 240.

`&,p` gives `html` (the lone `&`) and the `<p>` a border of `2cap`. `cap` is the height of a capital letter in the font: here, `2cap` gives a 20px border. A border with no color uses the text color: `color:6B86E1`, a hex with no `#` that quirks mode accepts. `border-radius:5lh` is 90, too much for a box 100 wide, so Chrome scales it down to 50: a pill.

### 2. The p: the middle bar

The nested `*` matches the `body` and the `<p>`. It gives them `font:8px/0'`: an 8px font with a line height of 0, and the family `'`, an open string closed by the end of the style sheet.

With a line height of 0, `lh` is 0. So for these two, `margin:60 8.33lh` is `60 0`. The `body` fills `html`'s content: 60 wide, from x = 170 to 230, and it starts 60 below, at y = 140. The `<p>`'s top margin merges with the `body`'s, so the `<p>` starts there too.

The `<p>` is empty, 0 tall: it is only its border, `2cap` in an 8px font, so 10 + 10 = 20 tall, blue. Its `5lh` radius is 0: a square bar. The `body` has no border and no background: it is invisible, but it holds the same place, 60 × 20.

### 3. The p's shadows: right

The `body` and the `<p>` both get `box-shadow:5pc -11q,64q 32q`: two blue copies of their 60 × 20 box, one 80px right and 10.39px up, one 60.47px right and 30.24px down.

Both also get `scale:-1`, a half turn around their centre, (200, 150). The `<p>` is inside the `body`: the `body`'s half turn and its own add up to a full turn, so the `<p>` ends up the right way round. Its shadows land on the right: from x = 250 to 310 at y = 129.6, and from x = 230.5 to 290.5 at y = 170.2. They start under the pill's right border, so they seem to come out of it.

### 4. The body's: left

The `body` is turned only once. Its shadows turn with it around (200, 150), so they land on the other side, mirrored: 80px left and 10.39px down, from x = 90 to 150 at y = 150.4, and 60.47px left and 30.24px up, from x = 109.5 to 169.5 at y = 109.8. Those are the two bars on the left.

## Golf notes

- `font:8px/0` makes `lh` 0: the same `8.33lh` is 150 for `html` and 0 for the two inner boxes.
- `cap` follows the font too: `2cap` is a 20px border on `html` and a 10px one on the `<p>`.
- The `<p>` and the `body` share one place and one shadow list: one flip for the `body`, two for the `<p>`, so the two pairs of bars point in opposite directions.
- `5lh` is a radius that rounds `html` and disappears on the `<p>`.
- `color:6B86E1` colors the borders and all four shadows, with no `#`.
- No closing braces, and `<style>` is never closed.
