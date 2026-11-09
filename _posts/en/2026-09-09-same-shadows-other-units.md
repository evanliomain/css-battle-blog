---
title: "Same shadows, other units: a tree diagram in 122 characters"
lang: en
ref: 2026-09-09
permalink: /2026/09/09/same-shadows-other-units/
description: "How one list of three box shadows in lh and ch draws thin lines on html and big squares on the body for the September 9, 2026 CSS Battle target."
target: /assets/targets/2026-09-09.png
target_url: https://cssbattle.dev/play/hvkmKnqoppnQEVdc4GkH
colors: ["#3090c0", "#3b3f58"]
player: eguiluz
chars: 122
score: 725.05
match: 100
code: |
  <style>*{margin:90 115;color:3B3F58;box-shadow:.56lh 11Q,-.56lh 11Q,0 33ch;*{background:#28be;margin:-60 50 90;font:9q/19"
---

The September 9 target is dark slate on blue: two squares at the top, one square at the bottom, and thin lines that join them, like a small tree diagram. David Eguiluz's solution writes three shadows once, for every element. On `html`, they only show as 10px lines around its box. On the `body`, the same shadows are written in `lh` and `ch`, and the `body`'s tiny font with a huge line height makes those units much bigger: the three squares.

Use **Teaching colors** to see `html`'s shadows in orange.

{% include animations/2026-09-09.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                   /* html, then the body */
  margin: 90 115;
  color: 3B3F58;                      /* a hex with no # works in quirks mode */
  box-shadow:
    .56lh 11Q,                        /* right and down */
    -.56lh 11Q,                       /* left and down */
    0 33ch;                           /* straight down */
  * {                                 /* the body */
    background: #28be;                /* goes to the canvas */
    margin: -60 50 90;
    font: 9q / 19 "";                 /* 8.5px font, line height 161.5px */
  }
}
```

## How it works

### 1. The body's background, on the canvas

The outer `*` matches `html` and the `body`; the nested `*` matches the `body` only. So only the `body` has a background: `#28be`, short for `#2288bbee`, a blue that is slightly transparent. When `html` has no background, the `body`'s background is used for the whole canvas instead, painted over white: the blue of the target. The `body` box itself then paints nothing.

### 2. html's shadows: lines

`margin:90 115` makes `html` 170 wide, from x = 115 to 285, and in quirks mode 300 − 180 = 120 tall, from y = 90 to 210.

`box-shadow` has three copies of the box, with no color, so in the text color: `color:3B3F58`, a hex with no `#` that quirks mode accepts. `lh` is the line height: 18px with the default font, so `.56lh` is 10.08. `11Q` is 10.39. `33ch` is 33 × 8 = 264.

The first shadow moves 10.08 right and 10.39 down, the second 10.08 left and 10.39 down, the third 264 down, off the canvas. A shadow is never painted under its own box, and `html`'s box is empty: only 10px strips stick out, on the left (x 105 to 115), on the right (x 285 to 295) and at the bottom (y 210 to 220.39). Those are the lines.

### 3. The same shadows on the body

The `body` has the same three shadows, but its own font. `font:9q/19"` sets a 9q (8.5px) font with a line height of 19 times the font size: 161.5px. The family is the string `"`, closed by the end of the style sheet.

So for the `body`, `.56lh` is 0.56 × 161.5 = 90.44, and `ch`, the width of a "0" in an 8.5px font, is 4.25: `33ch` is 140.25. `11Q` does not change: 10.39.

`margin:-60 50 90` puts the `body` from x = 165 to 235 and from y = 30 to 120. In quirks mode it fills `html`'s height minus its margins: 120 + 60 − 90 = 90. Its 70 × 90 shadows land at x = 255.44 and 74.56 for the two top squares, 10.39 lower, at y = 40.39, and straight down at y = 170.25 for the bottom square. The `body` box itself paints nothing, so only its shadows show.

## Golf notes

- One shadow list serves twice: `lh` and `ch` follow each element's font, so the same values give thin offsets on `html` and big ones on the `body`.
- `font:9q/19"` sets both units at once: a small `ch` and a huge `lh`.
- A shadow is never painted under its box: `html`'s three shadows only show their edges, which are the lines.
- With no background on `html`, the `body`'s background colors the canvas.
- `#28be` is a 4-digit hex with transparency: on white, it gives the target's blue.
- No closing braces, and `<style>` is never closed.
