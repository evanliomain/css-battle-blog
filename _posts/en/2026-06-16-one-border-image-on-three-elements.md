---
title: "One border-image on three elements: a biscuit in 160 characters"
ref: 2026-06-16
permalink: /2026/06/16/one-border-image-on-three-elements/
description: "How one border-image that only paints its four corners draws four small discs on html and plain yellow squares on body and img, because its size is set in em and lh, and how two 45° turns put everything in place, in the June 16, 2026 CSS Battle target."
target: /assets/targets/2026-06-16.png
target_url: https://cssbattle.dev/play/XmvF6SFxJCXoh15eyrGD
colors: ["#7c3219", "#f7cb71"]
player: emohdaziz
chars: 160
score: 687.05
match: 100
code: |
  <img><style>&,&>*{rotate:45deg}*{background:#7c3219;margin:5%70;border-image:radial-gradient(#f7cb71,2.2em,#0000 0)230/8lh;*{margin:50;*{padding:30}font:1in/8q"
---

The June 16 target looks like a biscuit on a brown background: a yellow square split into four smaller squares, a yellow square in the middle, four brown rectangles between them, and a yellow half circle on each side. Mohamed Ali gives html, body and img the same `border-image`. It only paints its four corners, and its sizes are in `em` and `lh`. On html, with a 16px font, the corners hold four small discs. On body and img, with a 96px font, they are plain yellow squares. One `rotate:45deg` on html and body moves the discs onto the axes.

Use **Teaching colors** to tell the three elements apart, and **Wide view** to see html's box turn.

{% include animations/2026-06-16.html lang=page.lang %}

## The code, spaced out

```css
<img><style>
&, & > * {                /* html, then its children head and body */
  rotate: 45deg;          /* html 45°; body 45° more: 90° */
}
* {                       /* html, head, body, img, style */
  background: #7c3219;
  margin: 5% 70;          /* html: 20px and 70px, a 260 × 260 square */
  border-image:
    radial-gradient(
      #f7cb71,            /* yellow from the center… */
      2.2em,              /* …up to 2.2em: html 35.2px, the others 211.2px */
      #0000 0             /* then transparent */
    )
    230                   /* slice: only the four corners are painted */
    / 8lh;                /* corner size: html 8 × 18 = 144px, the others 60.47px */
  * {                     /* head, body, img, style */
    margin: 50;           /* body: 160 × 160 at (120, 70) */
    * {                   /* img and style */
      padding: 30;        /* img: 60 × 60 at (170, 120) */
    }
    /* a 96px font, a 7.56px line height, and a family:
       a string that the end of the code leaves open */
    font: 1in/8q "
```

## How it works

### 1. Five elements, three that show

The page starts with `<img>`. The browser adds html, head and body, and puts img and style in body. So `*` selects five elements: html, head, body, img and style. head and style are hidden. html, body and img are left.

At the top level, `&` is the root, html. `&>*` is html's children: head and body. Only these get `rotate:45deg`. img gets no turn of its own.

### 2. html: a 260 square

`margin:5%70` has no unit on the 70. CSS Battle pages have no doctype, so they are in quirks mode, and there a unitless length is read in px. A margin in % is a share of the width of the containing block: 5% of 400 is 20px. html gets 20px at the top and bottom, 70px on the sides.

In quirks mode html fills the height of the page. It is 400 − 140 = 260px wide and 300 − 40 = 260px tall: a square at (70, 20), with the same center as the canvas, (200, 150). html is the root, so its brown background covers the whole canvas.

### 3. One disc, four corners

A `border-image` is drawn even with no border: `border-image-width` sets its own size. Here its image is a gradient, as big as the element's box: 260 × 260 on html.

`radial-gradient(#f7cb71,2.2em,#0000 0)` has a color, then a lone length, then a color. The lone length is a color hint: the point where the two colors meet halfway. `#0000 0` cannot sit before the hint, so it moves up to 2.2em too. The hint is at the very end of the transition: the yellow stays yellow up to 2.2em, then everything is transparent. `#f7cb71 2.2em,#0000 0` gives the same picture, with the same length. html's font is 16px, so the disc has a radius of 35.2px, in the middle of the image.

The slice `230` cuts the image 230px from each edge. 230 + 230 is more than 260, so the edges and the middle get nothing: only the four corners are painted. Each corner is a 230 × 230 piece of the image, and each piece holds the whole disc, which spans from 94.8 to 165.2.

The width `8lh` is 8 times the line height. html's line height is 18px, so 144px. Two corners of 144px do not fit in 260px, so all the widths shrink in proportion, to 130px. The four corners fill html's four quarters. Each one shows its piece scaled by 130/230 = 0.565: a disc of radius 19.9px, 56.52px from html's center on each axis.

### 4. html turns 45°

html turns around its center, (200, 150). The four discs were on the diagonals, 56.52px away on each axis. After the turn they are on the axes, 56.52 × √2 = 79.93px from the center: left, right, top and bottom. When I render html alone, the left disc covers x 100 to 139 on row 150.

### 5. body: four yellow squares

The nested `*` means `* *`: every element inside another one. It sets `margin:50` and the font. body is 260 − 100 = 160px wide, and in quirks mode it fills html's height too: a 160 × 160 square at (120, 70), with the same center.

body's font is `1in`, 96px. So `2.2em` is 211.2px. The corners of a 160px square are only 113.14px from its center: the disc covers the whole image, all yellow. The slice 230 is more than 160, so it counts as 100%: each corner shows the whole image.

`8q` is the line height: 8 quarter millimeters, 7.56px. So `8lh` is 60.47px, and two corners fit in 160px. Four yellow squares sit in body's corners, with a brown cross between them. In my render, they are drawn 60px wide, and the cross is 40px wide.

body is inside html, already turned 45°. At this point it would be a diamond.

### 6. body turns twice

body also has its own `rotate:45deg`. 45 + 45 = 90°. A square with four equal corners, turned a quarter, looks the same: body lies flat again, from 120 to 280.

Its brown background covers the inner half of each disc. Only the outer halves stick out: the four half circles, at x 100 to 120 on the left.

### 7. img: the middle square

img has no source, so it has no content. `* * *` gives it `padding:30`: 60 × 60. Its margin of 50 puts it 50px inside body: I measured it at (170, 120), right in the middle.

It has the same 96px font, so its image is all yellow too. Its corners of 60.47px do not fit twice in 60px: they shrink to 30px, and four 30 × 30 corners fill it. A yellow square covers the middle of the brown cross. Four brown rectangles are left, 40 × 50 each. img has no turn of its own, but it sits in body, turned 90°: a centered square does not change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `border-image` does three jobs. Its sizes are in `em` and `lh`, so the font decides what it draws: small discs on html, full yellow squares on body and img.
- `8lh` is 3 characters, and it has a different value on each element: 144px on html, 60.47px on body and img. `60px` (161 characters) also gives html 60px corners: the discs become four small dots far from the square, and 3,528 pixels change. A bare `60` (159 characters) means 60 times the border width, here 0: nothing yellow is left, and 20,080 pixels change.
- html's line height only has to make `8lh` at least 130px. I checked: with html's line height set to 17px or 30px, the picture is the same. At 16px, `8lh` is 128px, the corners no longer meet, and 200 pixels change.
- One `font` sets both sizes: 96px for `em` and 7.56px for `lh`. Without `/8q` (157 characters), the line height is normal, 110px, and `8lh` is 880px. body's and img's corners shrink to fill them whole, the four brown rectangles disappear, and 8,000 pixels change.
- The `font` shorthand needs a family. The `"` opens a string that the end of the code never closes. `font:1in/8q a` gives the same picture in 161 characters. Without the space, `8qa` reads as one unknown unit: the whole declaration is dropped, and 10,408 pixels change.
- `5%70` needs no space: the `%` ends the first value. `margin:20 70` gives the same picture in 161 characters.
- `&,&>*` reaches html and body in 5 characters. `html,body` gives the same picture in 164 characters. With `&` alone (156 characters), body only gets html's 45°: it stays a diamond, and 20,504 pixels change.
- The slice `230` places the half circles. With `200` or `260`, same length, they move, and 1,808 or 1,520 pixels change.
- `<img>` is an empty box: its padding alone makes it 60 × 60. With `<a>` (158 characters), the middle square turns into two bars 30px wide, one of them far to the right, and 5,020 pixels change.
- `#0000` is transparent in 5 characters. `transparent` gives the same picture in 166 characters.
- The margins and the padding have no unit, which works in quirks mode. With `px` on 70, 50 and 30, the picture is the same in 166 characters.
- Nothing is closed. `"}}` at the end gives the same picture in 163 characters.
