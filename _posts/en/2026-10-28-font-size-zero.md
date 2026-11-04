---
title: "Font size zero: a drop and a quarter disc in 149 characters"
lang: en
ref: 2026-10-28
permalink: /2026/10/28/font-size-zero/
description: "How one CSS rule, shared by html and body, draws the October 28, 2026 CSS Battle target: oversized radii make a drop, and font:0 turns the same radii into a quarter disc."
target: /assets/targets/2026-10-28.png
target_url: https://cssbattle.dev/play/qeaTGocAQsBBgTBIEDEn
colors: ["#dc04", "#30acce", "#1d5260"]
player: benjamintordjman
chars: 149
score: 696.67
match: 100
code: |
  <style>*{background:#dc04;box-shadow:inset 5pc -9ch;color:30ACCE;margin:80 140;border-radius:12em 5pc 9em 9em;*{color:1D5260;margin:0 0 60 40;font:0"
---

The October 28 target is a light blue drop on a pale yellow card, with a dark quarter disc in its top right corner, like a pin on a map or a pie chart. Benjamin Tordjman draws it with one rule shared by `html` and `body`, and no `background` that shows. Both shapes come from the same list of radii: on `body`, `font:0` wipes out every value written in `em`, and only a quarter disc is left.

{% include animations/2026-10-28.html lang=page.lang %}

## The code, spaced out

```css
* {                                    /* html, then body */
  background: #dc04;                   /* html: goes to the canvas */
  box-shadow: inset 5pc -9ch;          /* inset 80px -72px, in the color below */
  color: 30ACCE;
  margin: 80 140;
  border-radius: 12em 5pc 9em 9em;     /* 192px 80px 144px 144px */
  * {                                  /* body (head and style stay hidden) */
    color: 1D5260;
    margin: 0 0 60 40;
    font: 0 "";                        /* written font:0" in the original */
  }
}
```

## How it works

### 1. The canvas color

`*` matches `html` first. The background of `html` is not painted in its box: it goes to the whole canvas. `#dc04` is a yellow at 27% opacity. Over the white page it gives `#f6f1bb`, one step away from the target's `#f7f2bc`. That is 5 characters instead of 7.

`margin:80 140` leaves `html` 120px wide. CSS Battle runs in quirks mode, where `html` fills the height minus its margins: 300 − 80 − 80 = 140. So the box is 120×140, at (140, 80).

### 2. Radii that are too big

`12em 5pc 9em 9em` is 192, 80, 144 and 144px, with the default 16px font. On a 120×140 box, the two corners of a side can't take more than the side. When they do, the browser shrinks all four radii by the same factor, the smallest one that makes every side fit. Here the left side (192 + 144 on 140px) and the bottom (144 + 144 on 120px) both need ×0.417 (5/12). So the corners are really 80, 33, 60 and 60px.

The bottom becomes a half circle of radius 60, the top left a big 80px curve: a drop.

### 3. An inset shadow as the fill

The drop has no visible background, since that went to the canvas. It is filled by `box-shadow:inset 5pc -9ch`. An inset shadow paints inside the box, everywhere except under a copy of the box moved by the offset. Here the copy moves 80px right (5pc) and 72px up (9ch: in the default 16px font, one `ch` is 8px).

The copy only covers the top right of the box, and it keeps its rounded corners. So the shadow fills the drop except for a curved bite at the top right, where the canvas shows through. The shadow has no color of its own: it takes `color`, `30ACCE`. In quirks mode a color can drop its `#`.

### 4. body: same rule, new color

`*` also matches `body`, so it gets the same background, shadow and radii. Its own rule adds three things:

- `margin:0 0 60 40` makes it 80px wide (120 − 40) and, again by the quirks mode, 80px tall (140 − 60). It sits at (180, 80), on the top right of the drop.
- `color:1D5260` turns its shadow dark.
- `font:0"` sets its font size to 0.

### 5. font:0 keeps only the 5pc

With a font size of 0, every `em` and every `ch` is worth 0. The radii `12em 5pc 9em 9em` become `0 80px 0 0`: one rounded corner of 80px on an 80×80 box, a quarter disc whose center is the box's bottom left corner, (180, 160). With the normal font, the same list would give a rounded square.

The shadow becomes `inset 80px 0`. The copy moves 80px right, the full width of the box, so the shadow fills all of it. The body's own `#dc04` background is under the shadow and never shows.

The quarter disc covers most of the bite. What is left of it is the pale yellow corner to the right of the arc, and a thin light blue strip at the very top, between the arc and x = 220, where the bite starts.

## Golf notes

- One list of radii, two shapes: the units are mixed on purpose, so `font:0` keeps only the `5pc`.
- `font` needs a family. `"` opens a string that never closes: it runs to the end of the code and gives an empty family name. Without it, `font:0` is invalid and ignored.
- `inset 5pc -9ch` paints a filled shape without a visible `background`, in the color of `color`, which each element sets for itself.
- `#dc04` over the white page replaces the 7-character `#f7f2bc`.
- `color:30ACCE`: no `#` needed in quirks mode. Units can go too: `margin:80 140`.
- `<style>` is never closed.
