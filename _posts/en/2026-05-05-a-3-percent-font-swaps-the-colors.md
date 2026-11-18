---
title: "A 3% font swaps the colors: four discs on a checkerboard in 156 characters"
ref: 2026-05-05
permalink: /2026/05/05/a-3-percent-font-swaps-the-colors/
description: "How one radial-gradient written in em paints the four empty images of a checkerboard, and how a 3% font on two of them shrinks their em and swaps their colors, in the May 5, 2026 CSS Battle target."
target: /assets/targets/2026-05-05.png
target_url: https://cssbattle.dev/play/W01jEclRqT6bYFAZZCmn
colors: ["#c0d6e8", "#3f4869", "#e25c57"]
player: emohdaziz
chars: 156
score: 690.43
match: 100
code: |
  <img r><img><img><img r><style>&{margin:42 92;background:#16a4;[r]{font:3%a}img{padding:50;background:radial-gradient(#3f4869,2.2em,#e25c57 0 73em,#3f4869 0
---

The May 5 target is a 2 × 2 checkerboard on a pale blue background: two dark blue squares and two coral squares, each with a disc of the other color in the middle. Mohamed Ali draws it with four empty images and one radial gradient for all of them. The gradient's lengths are in em. Two images get a tiny font, so the same gradient comes out with its colors swapped.

With **Teaching colors**, the boxes of html, body and the two kinds of images get their own colors before the gradient covers them.

{% include animations/2026-05-05.html lang=page.lang %}

## The code, spaced out

```css
<img r><img><img><img r>
<style>
& {                          /* at the top level, & is the root: html */
  margin: 42 92;             /* html: 216 × 216 at (92, 42) */
  background: #16a4;         /* #1166aa44, on the whole canvas: #c0d6e8 */
  [r] {                      /* the 1st and 4th images */
    font: 3% a;              /* 3% of 16px = 0.48px; "a" is the font name */
  }
  img {                      /* the four images */
    padding: 50;             /* no picture: a 100 × 100 box */
    background: radial-gradient(
      #3f4869, 2.2em,        /* blue, then a hint at 2.2em */
      #e25c57 0 73em,        /* red from 2.2em (the 0 moves up) to 73em */
      #3f4869 0              /* blue from 73em (the 0 moves up) */
    /* the end of the code closes the gradient and the two rules */
```

## How it works

### 1. Four images and a style

The code starts with four `<img>` tags. The parser puts them in body, and the `<style>` after them goes in body too. Two images carry an attribute `r`, with no value: the first and the last.

`&` at the top level of a style sheet stands for the root: it targets html. The rules nested inside it, `[r]{…}` and `img{…}`, target the elements inside html that match: the two `r` images, and all four images.

### 2. html and the background

CSS Battle pages have no doctype, so they are in quirks mode. Lengths without a unit are px there, for properties like `margin` and `padding`. In quirks mode, html also fills the page, minus its margins.

`margin:42 92` leaves html 400 − 2 × 92 = 216 in width and 300 − 2 × 42 = 216 in height. My render puts html's box at (92, 42).

html is the root, so its background is painted on the whole canvas. `#16a4` is the short form of `#1166aa44`: the blue `#1166aa` with an alpha of 0x44 = 68/255, 26.7% opacity. Over the white page, my render gives (192, 214, 232), that is `#c0d6e8`.

### 3. body and four 100 × 100 boxes

body keeps its default margin of 8px: my render puts it at (100, 50), 200 × 200.

The images have no `src`, so they have no picture: their content box is 0 × 0. `padding:50` adds 50px on each side, and each image becomes a 100 × 100 box. Images are inline, so they sit side by side like words: two fit in body's 200px, and the next two go to a second line. My render puts them at (100, 50), (200, 50), (100, 150) and (200, 150).

The two rows touch. In a test copy in standards mode (a doctype, and `px` added to the two lengths, 177 characters), my render puts the second row at y = 154: the line keeps room under the images, below the baseline, as it would for the tails of letters. In quirks mode, a line that holds only images gets no such room, so the rows sit at y = 50 and y = 150, and the four boxes make a 200 × 200 square.

The `r` images are the first and the fourth: they land on one diagonal.

### 4. The gradient on a plain image

A plain image has the default font size, 16px. So 2.2em = 35.2px and 73em = 73 × 16 = 1168px. For these images, my Chrome gives this computed value:

`radial-gradient(rgb(63, 72, 105), 35.2px, rgb(226, 92, 87) 0px, rgb(226, 92, 87) 1168px, rgb(63, 72, 105) 0px)`

`#e25c57 0 73em` is one color with two positions: it becomes two red stops, at 0 and at 73em.

The list reads like this:

- `#3f4869` with no position: the first color starts at 0.
- `2.2em` alone, after a comma: a hint, the point where the blend between the two colors around it is half done.
- `#e25c57 0`: a position cannot go back before an earlier stop or hint, so this 0 moves up to 2.2em. The hint sits at the very end of the blend, so the blue stays blue up to 2.2em: a hard edge. In a test copy with `#e25c57 2.2em` (160 characters), the picture is the same.
- `73em`: red runs to 1168px.
- `#3f4869 0`: this 0 moves up to 73em. Blue starts at 1168px.

In a square box, the default ellipse is a circle, and its default size reaches the farthest corner: 70.7px from the center of a 100 × 100 box. 1168px is far past that, so the blue after 73em never shows. A plain image is a blue disc of radius 35.2 on a red square. On the row y = 100, my render paints the disc of the top-right image from x = 215 to 284.

### 5. The `r` images: a 3% font

`[r]{font:3%a}` sets the font of the two `r` images. A percentage font size is relative to the parent's: 3% of 16px = 0.48px. `font` is a shorthand and needs a font name; `a` is one, even if no such font exists.

In my Chrome, `getComputedStyle` reports a font size of 6px for these two images, not 0.48px, but the gradient's lengths are computed from 0.48px: 2.2em = 1.056px and 73em = 35.04px.

The same list now gives:

- blue from 0 to 1.056px: a dot of radius 1 in the middle;
- red from 1.056px to 35.04px: a red disc;
- blue from 35.04px to the corners.

That is a red disc of radius 35.04 on a blue square: the colors of a plain image, swapped. The two radii are 35.2 and 35.04, so the four discs have almost the same size.

The two numbers are tuned for this. With `72em` or `74em` (156 characters each), the red discs change size, and 216 and 192 pixels change. With `2.1em` or `2.3em` (156 characters each), the blue discs change size, and 680 and 728 pixels change. With a `2%` or `4%` font (156 characters each), 4,312 and 6,016 pixels change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One gradient serves four images. It is written in em, and em follows each element's font size, so one short rule on two images swaps their colors. Without `[r]{font:3%a}` (143 characters), the four images are the same, four blue discs on red, and 19,896 pixels change.
- `font:3%a` is 8 characters. With `font-size:3%` (160 characters), the picture is the same. The shorthand needs a font name: with `font:3%` (155 characters), my Chrome drops the declaration, and the picture is the one without the rule, 19,896 pixels changed.
- The `0` positions are 1 character each: a stop can't go back, so `0` means "at the previous position". With `#e25c57 2.2em` (160 characters), the picture is the same. The last `0` is needed: with `#3f4869` alone (154 characters), the last blue sits at the end of the gradient, at the corners, the two `r` squares fade from red to blue, and 12,272 pixels change.
- `#3f4869,2.2em` uses a hint. With a stop, `#3f4869 2.2em` (156 characters), the length and the picture are the same.
- `#16a4` is 5 characters for the pale blue the canvas shows. With `#c0d6e8` (158 characters) or `#1166aa44` (160 characters), the picture is the same.
- An attribute with no value is the shortest hook: `<img r>` and `[r]`. With `<img class=r>` and `.r` (167 characters), the picture is the same.
- The lengths need no unit in quirks mode. With `42px 92px` and `50px` (162 characters), the picture is the same.
- `&{` is three characters shorter than `html{`: with `html{` (159 characters), the picture is the same. Nesting `[r]` and `img` inside it costs nothing here: the flat version, `&{margin:42 92;background:#16a4}[r]{…}img{…` (156 characters), gives the same picture.
- The code ends inside the gradient and two rules: the end of the code closes them. With `)}}` at the end (159 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same squares and discs at the same place as the target. 474 pixels differ by more than 8 levels. 466 of them are on the round edges of the four discs, all between 34.47px and 35.59px from a disc's center. The other 8 are two small blue dots, 2 × 2 pixels, at the center of the two red discs: (149..150, 99..100) and (249..250, 199..200). They are the blue from 0 to 1.056px: in a test copy where the `r` images get `radial-gradient(#e25c57 35.04px,#3f4869 0)` instead, these 8 pixels turn red and no other pixel changes. The flat colors are the same, except the canvas: (192, 214, 232) in my render, (192, 214, 231) in the target. The largest difference is 163 levels, at (282, 86), on the edge of the top-right disc: blue in my render, red in the target. The CSS Battle judge gives the official code a 100% match.
