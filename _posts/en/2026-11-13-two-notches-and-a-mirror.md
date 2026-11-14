---
title: "Two notches and a mirror: two Z shapes in 153 characters"
lang: en
ref: 2026-11-13
permalink: /2026/11/13/two-notches-and-a-mirror/
description: "How two empty paragraphs, a thick border, corner-shape:notch, an outline and scale:1 -1 draw the November 13, 2026 CSS Battle target: two outlined Z shapes, one the mirror of the other, on violet."
target: /assets/targets/2026-11-13.png
target_url: https://cssbattle.dev/play/qLX4DEfAvKd6Cuzxphg1
colors: ["#411c56", "#b7d7cd", "#c06c88"]
player: evanliomain
chars: 153
score: 693.06
match: 100
code: |
  <p><p><style>*{background:#411c56;p{border:48Q solid#b7d7cd;outline:11q solid#c06c88;corner-shape:notch;border-radius:35%/0 53Q;margin:40 92;+p{scale:1-1
---

The November 13 target is violet, with two pale green step shapes outlined in pink, one above the other. The top one steps down to the right, and the bottom one is its mirror image. I draw each one with an empty `<p>` made only of border. `corner-shape:notch` cuts two opposite corners out of it, and the `outline` follows the cut. The second `<p>` is the same shape, flipped by `scale:1-1`.

Use **Teaching colors** to tell the second `<p>` apart while it flips.

{% include animations/2026-11-13.html lang=page.lang %}

## The code, spaced out

```css
<p><p>                                    /* two empty paragraphs */
<style>
* {
  background: #411c56;                    /* every element; html's goes to the canvas */
  p {
    border: 48Q solid #b7d7cd;            /* 45px: the whole green block */
    outline: 11q solid #c06c88;           /* 10px of pink around it */
    corner-shape: notch;                  /* rounded corners become notches */
    border-radius: 35% / 0 53Q;           /* 70 wide; 0 or 50 tall */
    margin: 40 92;                        /* x 100 → 300, y 40 */
    + p {                                 /* the second p only */
      scale: 1 -1;                        /* flipped upside down */
    }
  }
}
</style>
```

## How it works

### 1. All violet

`*` matches every element: `html`, `body` and both `p`. They all get the violet background. `html`'s background goes to the canvas, so the whole frame is violet. The other backgrounds are the same color, so they never show.

### 2. A block made of border

The `p` is empty, so its content is 0 tall. With `margin:40 92`, it goes from x = 100 to 300: the `body` starts at x = 8, and 8 + 92 = 100. Its top margin of 40 merges with the `body`'s margin of 8, so the `p` starts at y = 40.

`48Q` is 48 × 0.945 = 45.35px, and Chrome rounds a border width down to 45. The box is 200 wide and 2 × 45 = 90 tall. Its content is 110 × 0, so all you see is green border.

### 3. notch: two corners taken out

`border-radius:35%/0 53Q` sets the horizontal radii before the slash and the vertical ones after it. 35% of the 200px width is 70 for every corner. `0 53Q` gives 0 at the top left and bottom right, and 53Q = 50px at the top right and bottom left. A corner with a zero radius stays square.

`corner-shape:notch` turns each rounded corner into a straight notch, a rectangle the size of its radii. So a 70 × 50 rectangle is taken out at the top right (x 230 → 300, y 40 → 90) and another one at the bottom left (x 100 → 170, y 80 → 130). The block is now a Z.

### 4. The outline follows the cut

`11q` is 10.39px, and the outline width is rounded down to 10. The outline follows the shape of the corners, notches included. It draws a 10px pink line all around the Z, from x = 90 to 310 and y = 30 to 140, with the same 10px along each notch.

### 5. The second p

The second `p` gets the same rules. The 40px bottom margin of the first one and the 40px top margin of the second merge into one gap of 40. So the second box goes from y = 130 + 40 = 170 to 260. As is, it is the same Z.

### 6. scale: the mirror

`+p` is nested in `p`, so it matches a `p` right after another `p`: only the second one. `scale:1-1` reads as two numbers, `1` and `-1`. The box keeps its width and flips upside down around its center, at y = 215. Its notches move to the top left and the bottom right, outline included. That is the bottom shape of the target.

## Golf notes

- An empty `p` with a thick border is a filled block: no `height` and no `background` for the green.
- One `border-radius` with a slash sets the eight radii at once. The zeros keep two corners square, and `notch` turns the other two into cuts.
- I checked that without `corner-shape:notch`, the same radii give round corners.
- The outline is drawn on the cut shape, so the pink line goes around the notches for free.
- `48Q` and `11q` land on 45px and 10px after rounding. The unit's case doesn't matter.
- `scale:1-1` needs no space: the minus sign starts the second number.
- Nesting `+p` inside `p` targets the second paragraph without a class.
- No closing tags, and the `<style>` is left open.
