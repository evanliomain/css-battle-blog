---
title: "One border-image, two line heights: a button in 92 characters"
ref: 2026-08-24
permalink: /2026/08/24/one-border-image-two-line-heights/
description: "How one border-image declaration, read with two different line heights, draws both the white disk and the four red holes of the August 24, 2026 CSS Battle target."
target: /assets/targets/2026-08-24.png
target_url: https://cssbattle.dev/play/CBG1TILZdQr1NiLspgv1
colors: ["#fff", "#bb4e60"]
player: selenit
chars: 92
score: 766.44
match: 100
code: |
  <style>*{border-image:radial-gradient(#fff 5lh,#BB4E60 0)50%/97lh/53q 0;*{scale:.21;font:1q'
---

The August 24 target looks like a button: a big white disk on a red background, with four small red squares in the middle. Ilya Streltsyn draws it with a single `border-image` declaration, used by two elements. In `html`, 1lh is 18px: the gradient gives the big disk. In the `body`, a tiny font makes 1lh = 1px: the same declaration gives four small red squares.

Use **Teaching colors** to tell the two border images apart (the body's squares are red on red in the real colors), and **Wide view** to see the outset above and below the canvas.

{% include animations/2026-08-24.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                             /* html, then head, style, body */
  border-image:
    radial-gradient(#fff 5lh, #BB4E60 0)  /* white disk of radius 5lh, then red */
    50%                         /* slice: four quarters, nothing in between */
    / 97lh                      /* border width */
    / 53q 0;                    /* outset: 50.08px top and bottom */
  * {                           /* head, style, body */
    scale: .21;
    font: 1q '';                /* font size 0.945px, empty family */
  }
}
```

## How it works

### 1. html: an almost square area

`*` matches `html` and every element in it. `html` fills the canvas, 400 × 300. It has no background, no border and no content: everything comes from its `border-image`.

Neither element has a border style, and the border image still shows: its size comes from `border-image-width`, not from the border.

The last value, `53q 0`, is the outset: the border image is painted outside the box, by 53q at the top and bottom and 0 on the sides. 1q is a quarter of a millimeter, 0.945px, so 53q = 50.08px. The border image area is 400 × 400.16, from y = −50.08 to 350.08: almost a square, centered on the canvas.

### 2. The gradient, in four corners

The image is `radial-gradient(#fff 5lh,#BB4E60 0)`: white up to 5lh from the center, then red. The `0` makes a hard edge. The gradient is as big as the border image area, so it is centered at (200, 150).

`50%` is the slice. It cuts the image at 50% from each edge: four quarters, and nothing is left for the edges or the middle. Without the `fill` keyword, the middle is not painted anyway.

`97lh` is the width of every border. In `html`, the font is 16px Times, and its normal line height is 18px in my Chrome. So 97lh = 1746px. Two borders of 1746px do not fit in 400px. In that case the browser scales all the widths down by the same factor, until they fit: 400 / 3492, so each border is 200px. The four corners touch in the middle and put the image back together. 5lh = 90px: a white disk of radius 90 centered at (200, 150). That is the disk of the target, exactly.

The outset matters here. I checked without it: the area is 400 × 300, the widths shrink to 150px, a white band shows from x = 150 to 250, top to bottom, and the two halves of the disk move apart.

### 3. body: the same border-image

The outer `*` matches the `body` too, so it gets the same `border-image`. In quirks mode, the `body` fills the frame minus its 8px margin: 384 × 284, from (8, 8). With the outset, its area is 384 × 384.16, centered at (200, 150) as well.

Without the nested rule, the `body` would have the same 18px line height as `html`. Its borders would shrink to 192px, and its corners would draw a white disk of radius 90 at the same place. In the real colors, that changes nothing.

### 4. font:1q'': 1lh = 1px

The nested `*` matches `head`, `style` and `body`. Only the `body` is displayed.

`font:1q''` sets a font size of 1q = 0.945px. The family is `''`, an empty string: the `font` shorthand needs a family, and this is the shortest one. The quote is never closed, the end of the code closes it. In my Chrome, the normal line height of this font is 1px, so 1lh = 1px in the `body`.

Now 97lh = 97px. Two borders of 97px fit in 384px, so nothing is scaled down. The four corners are 97 × 97 squares at the corners of the area, with 190px between them. Nothing is painted in between, so the drawing of `html` shows through.

Each corner shows a quarter of the `body`'s own gradient. There, 5lh = 5px: the white is a small disk in the middle of the image. A quarter of it lands at the inner tip of each corner, with a radius of about 2.5px. The rest of the corner is red.

The same `97lh` does two jobs. In `html` it is far too big, and the browser brings it back to 200px, which is exactly what is needed. In the `body` it is 97px.

### 5. scale:.21

`scale:.21` shrinks the `body` around its center, (200, 150). Its area becomes 80.64 × 80.67, from x = 159.68 to 240.32 and from y = 109.66 to 190.34. Each corner is 97 × 0.21 = 20.37px, with 190 × 0.21 = 39.9px between two corners.

The `body` is painted above `html`. Its four red corners land inside the white disk: the four holes of the button. The white quarter dots now have a radius of 0.53px. I checked with a version where the `body`'s gradient is green instead of white: not one pixel turns green.

## Golf notes

- One `border-image` for two elements. Only the line height changes: 18px in `html`, 1px in the `body`. `5lh` is a 90px disk in one and a 5px dot in the other.
- `97lh` is 1746px in `html`. Border widths that do not fit are scaled down together, so it lands on 200px, just what fills the area.
- `53q 0` makes both border image areas almost square: the disk is round and the four squares sit on a square. 53q = 50.08px.
- No `background`: the four corners of the `html` border image cover the whole canvas.
- `font:1q''` is a full `font` shorthand: a size and an empty family, with the quote left open.
- No space in `0)50%`: the parenthesis ends the gradient.
- `scale:.21` without the leading zero, and `<style>` and both braces are never closed.

## If you try it at home

In my Chrome (version 157 when this was written), the four squares are 20.37px wide and their edges are not on whole pixels: x = 159.68, 180.05, 219.95 and 240.32, y = 109.66, 130.03, 169.97 and 190.34. In the target, the squares are 20px wide, from x = 160 to 180 and 220 to 240, and from y = 110 to 130 and 170 to 190. Compared with the target, 192 pixels differ along eight straight edges, and 328 more that my comparison script counts as anti-aliasing. On the CSS Battle judge, the original code is a 100% match.
