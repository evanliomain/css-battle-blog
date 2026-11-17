---
title: "The unpainted middle: a plug in 156 characters"
ref: 2026-07-28
permalink: /2026/07/28/the-unpainted-middle/
description: "How one border-image declaration, read with two line heights, draws the ring and the stem in html and the cream frame around body in the July 28, 2026 CSS Battle target."
target: /assets/targets/2026-07-28.png
target_url: https://cssbattle.dev/play/LtfUvFd3HF61ZOGlL9Q9
colors: ["#4a9a86", "#ebf6f0", "#4c4c6b"]
player: selenit
chars: 156
score: 690.43
match: 100
code: |
  <style>*{background:#4A9A86;border-image:radial-gradient(1q at 50%25vw,#0000 74q,#EBF6F0 0 5lh,#4C4C6B)20 min(77in/2lh)/auto/5vw;*{margin:0 25%240;font:9lh'
---

The July 28 target looks like a plug: on a gray-purple background, a green block at the top with a cream outline, a green disk in a cream ring below it, and a thin green stem down to the bottom edge. Ilya Streltsyn draws it with one `border-image` declaration, used by html and body. A border image without `fill` leaves its middle unpainted. On html, that middle is a 30px column, and the green background shows there: the stem. On body, a bigger font changes the line height, and the same declaration draws a 20px cream frame.

Use **Teaching colors** to tell the two backgrounds and the two border images apart, and **Wide view** to see the 20px outset around the canvas.

{% include animations/2026-07-28.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, then head, style, body */
  background: #4A9A86;           /* green: the canvas (html) and the block (body) */
  border-image:
    radial-gradient(
      1q at 50%25vw,             /* size 1q, center 50% across and 100px down */
      #0000 74q,                 /* transparent up to 69.92px */
      #EBF6F0 0 5lh,             /* cream up to 5lh: 90px in html, 935px in body */
      #4C4C6B                    /* then purple */
    )
    20 min(77in/2lh)             /* slice: 20 205 in html, 20 in body */
    / auto                       /* width: the size of each slice */
    / 5vw;                       /* outset: 20px */
  * {                            /* head, style, body */
    margin: 0 25%240;            /* body: 200 × 60 at (100, 0) */
    /* 9lh = 162px; the family is an empty string, closed by the end of the code */
    font: 9lh'
```

## How it works

### 1. html: a green canvas

The style element is never closed, so the whole code is CSS. There is no doctype: the page is in quirks mode.

`*` targets html, head, style and body. head and style are hidden. html is 400 × 300, and its background, `#4A9A86`, is the root's background: it paints the whole canvas green. The rest is painted over it.

### 2. The image: a ring on purple

html gets a `border-image`. Neither element has a border style, so the border widths are 0. The border image still shows: its size comes from `border-image-width` and `border-image-outset`, not from the border.

The outset is `5vw`. 1vw is 4px, so 5vw = 20px. The border image area is html's box grown by 20px on each side: 440 × 340, from (−20, −20).

The image is a radial gradient. It has no size of its own, so it fills that area. Its center is at `50%25vw`: 50% of 440 = 220 across, and 25vw = 100px down. On the canvas, that is (200, 80).

`1q` is the size: a circle of radius 1q. 1q is a quarter of a millimeter, 0.945px. The stops:

- `#0000`, transparent, up to 74q = 69.92px.
- `#EBF6F0`, cream, from `0` to `5lh`. A stop cannot sit before the previous one, so `0` is moved up to 69.92px: a hard edge. In html, the font is 16px and 1lh is 18px in my Chrome, so 5lh = 90px.
- `#4C4C6B`, purple, with no position. The last stop goes to the end of the gradient ray, 1q. That is before 90px, so it is moved up to 90px too: another hard edge.

So the image is a transparent disk of radius 69.92, a cream ring out to 90px, and purple everywhere else.

### 3. The slices: a 30px gap, the stem

`20 min(77in/2lh)` is the slice: 20 at the top and bottom, `min(77in/2lh)` on the left and right. 77in = 7392px, and in html 2lh = 36px. A length divided by a length is a plain number: 205.33. In my Chrome, the slice is kept as a whole number: `getComputedStyle` gives `20 205`. I checked: `20 205.333` gives the same picture.

The slice cuts the image 20px from the top and bottom, and 205px from the left and right. That makes four corners, four edges and a middle. Without the `fill` keyword, the middle is not painted.

The width is `auto`: here, each border takes the size of its slice, 20px and 205px. Writing `20px 205px` on html gives the same picture. So every piece is painted at its own size, in its own place. The image shows as it is, except for the middle: from x = −20 + 205 = 185 to 420 − 205 = 215, and from y = 0 to 300.

Through this 30px gap, html's green background shows: that is the stem. Through the transparent disk, it shows too: the green disk. At the top of the gap, the ring is cut, but body hides that part.

### 4. body: the green block

The nested `*{` means `* *`: any element inside another one. That is head, style and body, and only body shows.

body takes `margin:0 25%240`. A percentage margin is a share of the width: 25% of 400 is 100px. So body runs from x = 100 to 300. In quirks mode, body fills html's height minus its margins: 300 − 240 = 60. body is 200 × 60, at (100, 0).

body also gets the green background of the outer `*`. The block covers the top of the ring and the top of the gap.

### 5. font: a new line height

`font:9lh'` sets the font size to 9lh. In body, `lh` in the font size uses the parent's line height, html's 18px: 9 × 18 = 162px. The family is `''`, an empty string: the `font` shorthand needs a family, and the end of the code closes the quote.

In my Chrome, body's 1lh is then 187px. body gets the same `border-image` declaration, but its `lh` values change:

- `5lh` = 935px.
- `min(77in/2lh)` = 7392 / 374 = 19.76, kept as 20 (`getComputedStyle` gives `20`).

body's border image area is its box plus the 20px outset: 240 × 100, from (80, −20). The gradient center lands at the same place: 50% of 240 = 120, so x = 80 + 120 = 200, and 25vw is still 100px, so y = −20 + 100 = 80. The image is transparent up to 69.92px, as before, then cream up to 935px, much farther than the area. body's image is cream with a transparent disk.

### 6. A 20px frame

The slice is now 20 on all four sides, and `auto` makes every border 20px wide. The outset is also 20px, so the unpainted middle is exactly body's box, 200 × 60.

What is left is a 20px cream frame, all of it in the outset: x = 80 to 100 on the left, 300 to 320 on the right, y = 60 to 80 at the bottom, and y = −20 to 0 at the top, off the canvas. Where the bottom of the frame crosses the disk, the image is transparent: the green disk shows through.

The frame stops at y = 80. Below it, at y = 80, the purple from x = 80 to 110 is html's image, and the cream from 110 to 130 is html's ring. That makes the two shoulders of the plug.

## Golf notes

- One declaration, two drawings. Only the line height changes: 18px in html, 187px in body. In html, the slices are 20 and 205 and the ring ends at 90px. In body, the slices are 20 and the cream goes on to 935px.
- `77in` is the number that works for both: 7392 / 36 = 205.33 gives 205, and 7392 / 374 = 19.76 gives 20.
- `77in/2lh` divides a length by a length, and that only works inside a math function. `min()` with one argument is one character shorter than `calc()`: `calc(77in/2lh)` gives the same picture in 157 characters. With no function at all, Chrome drops the whole `border-image` (it computes to `none`), and 93,046 pixels change.
- `5lh` is 90px in html and 935px in body. With `90px` in its place, body's frame repeats html's picture exactly: same center, same ring. That is the same picture as with no border image on body, and 3,630 pixels change.
- The gradient size `1q` sends the purple stop back to 90px, a hard edge with no position written. With no size, the gradient takes its default size, the purple becomes a fade, and 84,698 pixels change.
- `#0000` is transparent in 5 characters, against 11 for `transparent`. The `0` after `#EBF6F0` makes a hard edge for 1 character.
- `auto` is 4 characters, and the widths follow the slices: no need to write 20 and 205 a second time.
- `5vw` is 20px in 3 characters. `20px` gives the same picture in 157 characters. A bare `20` does not work: in `border-image-outset`, a plain number is a multiple of the border width, which is 0. The outset is gone, the stem disappears, and 21,004 pixels change.
- `50%25vw` needs no space: the `%` ends the number. `25vw` is 100px in both elements, since `vw` comes from the canvas. `100px` gives the same picture in 157 characters.
- `margin:0 25%240` uses the same trick: `0 100 240` gives the same picture in 157 characters.
- `background` is written once, in `*`: it paints the canvas through html and the block through body.
- `font:9lh'` is a full `font` shorthand: a size and an empty family, with the quote left open. `font:9lh a` gives the same picture in 157 characters. Without `font`, body has the same line height as html: it gets the slices 20 and 205 and a ring of 90px, and 9,388 pixels change.
- Nothing is closed: neither the two rules nor the style element. With `}}</style>` at the end, the code is 166 characters and the picture is the same.
