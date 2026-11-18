---
title: "One border, five boxes: signal bars in 175 characters"
ref: 2026-05-13
permalink: /2026/05/13/one-border-five-boxes/
description: "How one border with no color, nested margins and two zoomed empty images draw six bars and two squares, in the May 13, 2026 CSS Battle target."
target: /assets/targets/2026-05-13.png
target_url: https://cssbattle.dev/play/8VgMy7qqi4u44ItDZTvm
colors: ["#6592cf", "#eee", "#173889"]
player: koenh
chars: 175
score: 675.45
match: 100
code: |
  <p><img><img><style>*{background:#6592CF;border-inline:32q solid;color:eee;margin:50 20;padding:30 0;+*{color:173889}*{margin:0 10-30;img{margin:30 0;zoom:.67;+*{translate:5lh
---

The May 13 target shows white and navy bars on a blue background, like signal bars, in a mirror: three bars on each side, getting shorter toward the middle, and a small square next to each inner bar. KoenH gives every element the same rule: a left and right border with no color, a margin and a padding. The border takes each element's `color`, so html, body and p nest into six bars. Two empty images, zoomed down by `zoom:.67`, become the two squares.

**Teaching colors** show the boxes of html, body and p, which all have the canvas color.

{% include animations/2026-05-13.html lang=page.lang %}

## The code, spaced out

```css
<p><img><img>                    /* p, two empty images inside */
<style>
* {                              /* every element */
  background: #6592CF;           /* html: the whole canvas; the others: the same color */
  border-inline: 32q solid;      /* left and right, ≈ 30px, in the color of color */
  color: eee;                    /* white bars */
  margin: 50 20;                 /* px in quirks mode: html at (20, 50) */
  padding: 30 0;                 /* 30 at the top and bottom */
  + * {                          /* * + *: body, the second image, style */
    color: 173889;               /* navy bars */
  }
  * {                            /* * *: everything inside html */
    margin: 0 10 -30;            /* 10 on the sides, −30 at the bottom */
    img {                        /* * * img: both images */
      margin: 30 0;              /* no side margins, 30 on top */
      zoom: .67;                 /* every length × .67 */
      + * {                      /* * * img + *: the second image */
        translate: 5lh           /* 5 line heights to the right; the end of the code closes the rest */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `50` in a margin is read in px, and a color can be written without its `#`.

The browser builds html, head and body around the code. body holds p, and p holds the two images and the `<style>`: no tag is closed. head and style are not displayed.

The rules are nested. `*` matches every element. `+*` inside it is `* + *`: an element right after a sibling. The `*` inside it is `* *`: every element inside another, so everything but html. `img` inside that is `* * img`, both images, and its `+*` is `* * img + *`: the element right after an image, the second image. The code ends inside five open rules, and the end of the code closes them.

### 2. One border with no color

Every element gets `border-inline:32q solid`: a border on the left and on the right. 1q is a quarter of a millimeter, about 0.945px, so 32q ≈ 30.24px. My Chrome draws it 30px wide.

The border has no color, so it takes the element's `color`. `*` gives every element `color:eee`: white. `* + *` gives `color:173889`, navy, to body (right after head), to the second image (right after the first) and to style. html, p and the first image stay white.

Every element also gets `background:#6592CF`. html's background paints the whole canvas. The other boxes paint the same color on top, so they are invisible.

### 3. html, body and p: six bars

`margin:50 20` places html at (20, 50), 400 − 40 = 360 wide. Its bars are white, from x = 20 to 50 and from 350 to 380. Its `padding:30 0` pushes its content down to y = 80.

body gets `margin:0 10-30` from `* *`. It starts 10 after html's left bar and at the top of html's content: (60, 80), 280 wide. Its bars are navy, from x = 60 to 90 and from 310 to 340.

p does the same inside body: (100, 110), 200 wide, white bars from x = 100 to 130 and from 270 to 300. p is body's first child, so `* + *` does not match it.

### 4. Every bar ends at y = 250

Each box has 30 of padding at the bottom, and p and body have a −30 bottom margin. The negative margin of p cancels body's bottom padding, and the one of body cancels html's. The three boxes end together: in my Chrome, at y = 250.375, drawn down to y = 250.

Without the `-30`, with `margin:0 10`, body ends 30 lower than p and html 60 lower. In my render of that variant, the navy bars go down to y = 280 and html's white bars to the bottom of the canvas.

### 5. Two zoomed images

The images get everything above, then `margin:30 0` and `zoom:.67`. `zoom` scales every length of the element. The 32q border becomes 20px on screen, the 30 padding 30 × 0.67 = 20.1, and the 30 top margin 20.1 too.

An `<img>` with no source has no content here: my Chrome measures each image at 40 × 40.19, just its two borders and its padding. So each image is a square in its own color: white for the first, navy for the second.

`margin:30 0` replaces the `0 10 -30` of `* *`: no side margins, so the first image touches p's left bar at x = 130. Its top margin puts it at y = 140 + 20.1 ≈ 160. The images are inline and sit side by side: the first from x = 130 to 170, the second from 170 to 210.

### 6. translate:5lh

`* * img + *` gives the second image `translate:5lh`. `lh` is the line height of the element's font, so `5lh` is five line heights. In the target, the navy square sits from x = 230 to 270, 60px to the right of its place, against p's right bar. The result is a mirror of the left side.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One border for five boxes. With no color in `border-inline`, each box uses its own `color`. With the colors written in the borders, `border-inline:32q solid#eee` with no `color:eee`, and `+*{border-color:173889}` (176 characters), the picture is the same.
- `32q` writes about 30px in 3 characters. `border-inline` does not take a bare number: with `border-inline:30 solid` (174 characters), my Chrome drops the border, the whole canvas is plain blue, and 33,600 pixels change. With `30px` (176 characters), the picture is the same.
- One `zoom:.67` shrinks the border, the padding and the margin of the images at once. Without it, every length has to be written at its final size: with `img{margin:20 0;padding:20 0;border-width:0 20px;+*{translate:60px` (200 characters), my render is the same as the target.
- `5lh` writes the shift in 3 characters. `translate` is scaled by the zoom too: with `translate:60px` (176 characters), the square moves only 40.2px, and 1,640 pixels differ from the target. The px value that gives 60px on screen is `89.55px` (179 characters).
- One `-30` lines up the bottoms of all the bars, and `10-30` needs no space before the minus sign. With `0 10 -30` (176 characters), the picture is the same.
- Colors without `#`, thanks to quirks mode. With `color:#eee` and `color:#173889` (177 characters), the picture is the same.
- Bare numbers in the margins and the padding, thanks to quirks mode. With `px` on every one of them (188 characters), the picture is the same.
- Nested rules write `* + *`, `* *`, `img` and `img + *` without repeating selectors. With the same rules written flat, `<p><img><img><style>*{background:#6592CF;border-inline:32q solid;color:eee;margin:50 20;padding:30 0}*+*{color:173889}* *{margin:0 10-30}img{margin:30 0;zoom:.67}img+*{translate:5lh` (181 characters), the picture is the same.
- The code ends inside five open rules, and the end of the code closes them. With `}}}}}` at the end (180 characters), the picture is the same.

## If you try it at home

In my Chrome, the official code does not quite give the target. The navy square lands from x = 235 to 275, 5px to the right of the target's square, and 400 pixels differ. In my Chrome, `5lh` on the zoomed image is 97.01px in the image's own units, 97.01 × 0.67 = 65px on screen. With `89.55px` in place of `5lh`, 60px on screen, my render is identical to the target, pixel for pixel. The CSS Battle judge gives the official code a 100% match.
