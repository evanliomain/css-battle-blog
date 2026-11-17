---
title: "One gradient, sliced twice: a cart in 141 characters"
ref: 2026-06-22
permalink: /2026/06/22/one-gradient-sliced-twice/
description: "How one radial gradient, sliced by html into a frame with a rounded hole and by body into two wheels, draws a yellow cart, in the June 22, 2026 CSS Battle target."
target: /assets/targets/2026-06-22.png
target_url: https://cssbattle.dev/play/mdSEofDNaGSNTWgGc2Gt
colors: ["#f0cd48", "#38506f"]
player: selenit
chars: 141
score: 704.33
match: 100
code: |
  .<style>*{*{margin:185 30%26;--p:0 89%1/23%50%}background:#F0CD48;border-image:radial-gradient(7vw,#0000 9vh,#38506F)var(--p,49%/9em/74q 8q 0
---

The June 22 target is a yellow cart on a blue-gray background: a big rounded box, a bar below it and two small wheels. Ilya Streltsyn draws it with one border-image declaration, used by two elements. On html, the gradient is cut into a blue frame whose hole is the rounded box. On body, the same gradient is cut another way, and its disc becomes the two wheels.

Use **Wide view** to see how far html's border-image goes above the canvas, and **Teaching colors** to tell the two border-images apart.

{% include animations/2026-06-22.html lang=page.lang %}

## The code, spaced out

```css
.                                    /* text, so body has content */
<style>
* {                                  /* html, head, body, style */
  * {                                /* * *: head, body, style */
    margin: 185 30%26;               /* 185px top, 120px sides, 26px bottom */
    --p: 0 89%1/23%50%               /* body's slices and widths */
  }
  background: #F0CD48;               /* html's goes to the whole canvas */
  border-image: radial-gradient(7vw, #0000 9vh, #38506F)
    var(--p, 49%/9em/74q 8q 0        /* html has no --p: the fallback */
```

## How it works

### 1. One declaration, two sets of numbers

`*` selects html, head, body and style. Nesting turns `*{*{` into `* *`: the elements that are inside another one, so head, body and style. head and style are hidden, so only html and body matter.

Both get the yellow background and the same `border-image`. Its end is `var(--p, …)`. `--p` is only set by `* *`, and html is inside no element, so html never gets it and uses the fallback: `49%/9em/74q 8q 0`. body gets `--p`, so its border-image ends with `0 89%1/23%50%`. Same gradient, two different cuts.

### 2. A border-image with no border

There is no `border-style`, so the border is 0px wide. That does not stop the image. When `border-image-width` is a length or a percentage, it does not use the border width. The image is drawn inward, over the element's own box.

### 3. The gradient

`radial-gradient(7vw,#0000 9vh,#38506F)` is a circle of 7vw = 28px (7% of 400), in the middle of the image. It is transparent up to 9vh = 27px (9% of 300), fades to #38506F at 28px, and stays #38506F beyond. So the image is blue with a transparent disc in the middle. It is drawn once over the whole border-image area, then cut into pieces.

### 4. html: an area bigger than the canvas

html is 400 × 300. The outset `74q 8q 0` pushes the image area out: 74q = 18.5mm = 69.92px at the top, 8q = 2mm = 7.56px on the left and right, 0 at the bottom. The area goes from (−7.56, −69.92) to (407.56, 300): 415.12 × 369.92. The disc sits in its middle, at (200, 115.04).

### 5. html: nine pieces, a rounded hole

The slice `49%` cuts the image at 49% from each edge. The four corners are 203.41 × 181.26. Between them, the middle strips are only 2% wide: 8.30px across and 7.40px down. The disc is centered, so each corner keeps about a quarter of it, in its inner corner.

The width `9em` is 144px (16px font). Each corner is squeezed into a 144 × 144 square at a corner of the area. That is 0.708 times its width and 0.794 times its height, so its quarter disc becomes a quarter ellipse about 19.1px wide and 21.4px tall. The thin strips are stretched along the edges, and the middle is not drawn (there is no `fill`).

What is left is a blue frame with a hole. The left edge piece turns transparent 127.82px from its left side, at x = 120.26. The same math gives 55.57 at the top, 279.74 on the right and 174.51 at the bottom. html's background is painted on the canvas, under its border-image, so the hole shows yellow. In my render, the box covers rows 55 to 174 and columns 120 to 279.

The outset is what places the hole. Without `/74q 8q 0`, the area is just the canvas, and the hole is only 146 × 60, from row 120 to 179.

### 6. body: a 160 × 89 box

`margin:185 30%26` has no units for 185 and 26: CSS Battle pages run in quirks mode, where a plain number is px. body gets 185px at the top, 30% of 400 = 120px on the left and right, and 26px at the bottom. In quirks mode, body fills the height of html minus its margins: 300 − 185 − 26 = 89px. I measured body from (120, 185) to (280, 274). Its yellow background is painted over html's blue frame.

### 7. body: pieces that overlap

body's image is 160 × 89, with the disc at (200, 229.5). The slices are 0 at the top, 1 at the bottom (one image pixel), and 89% = 142.4px on the left and right.

The left and right slices add up to 284.8px, more than the 160px of the image. In that case, the top edge, the bottom edge and the middle are empty. The top corners are 0px tall, so they are empty too. Only four pieces are drawn: the left edge, the right edge and the two bottom corners. I checked it with `fill` added to the slice: the picture does not change.

### 8. body: two wheels and a bar

The widths are `23%50%`. 50% of 160 is 80px on the left and right. 23% of 89 is 20.47px at the top and bottom, and Chrome draws 20px: with `20px` instead of `23%`, my render is the same.

- The left edge piece, 142.4 × 88 in the image, goes into 80 × 49, from (120, 205). The whole disc is in that piece, and it becomes a near circle, 15.2 × 15.0 in radius, centered at (164.94, 229.78).
- The right edge piece starts at x = 17.6 in the image and goes into the right half, from x = 200 to 280. Its whole disc is in it too, and lands at (235.06, 229.78).
- The bottom corners take the last row of the image, 43.5px below the disc's center, so they are solid blue. Stretched to 80 × 20, they cover body from y = 254 to 274. With `0` instead of `1`, they are empty, a yellow strip shows below the wheels, and 3,328 pixels change.
- Nothing is drawn in the top 20px. body's yellow background stays there: that is the bar, from row 185 to 204.

In my render, the wheels cover columns 150 to 179 and 220 to 249, rows 215 to 244.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `var(--p,…)` lets one `border-image` serve both elements. Writing two full declarations, the html one first and the body one in the nested rule, gives the same picture in 180 characters.
- `7vw`, `9vh` and `9em` are 28px, 27px and 144px in 3 characters each. With px, the same picture takes 145 characters.
- `#0000` is transparent in 5 characters. `transparent` gives the same picture in 147 characters.
- No space is needed in `30%26`, `89%1` or `23%50%`. With the three spaces, the same picture takes 144 characters.
- Nothing is closed. Closing needs `)}`, because `var(` is still open: the same picture in 143 characters. A lone `}` lands inside `var(` and breaks the declaration: 96,677 pixels change.
- The period gives body some text. With `<style>` alone (140 characters), my render changes: html becomes 385 × 459 instead of 400 × 300, and 7,546 pixels change. `<body><style>` (146 characters) gives the same 7,546 changed pixels, so it is the text that counts, not where `<style>` sits.

## If you try it at home

In my local Chrome, the official code is very close to the target but not identical: 568 pixels differ by more than 8 on a channel. 395 are on the edges of the box, where my render has half-tone pixels and the target is sharp, for example in columns 119 and 280. 166 are on the edges of the wheels, for the same reason. The last 7 are the period itself: a small black dot in the bar, from x = 121 to 123 and y = 197 to 199. The CSS Battle judge gives the code a 100% match.
