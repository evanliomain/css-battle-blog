---
title: "A 160px left border: two linked frames in 129 characters"
ref: 2026-07-19
permalink: /2026/07/19/a-160px-left-border/
description: "How two empty images make two frames, how a negative margin puts the second one before the first, and how body's 160px left border links them, in the July 19, 2026 CSS Battle target."
target: /assets/targets/2026-07-19.png
target_url: https://cssbattle.dev/play/0esrz3btDFAYNYpYzP4I
colors: ["#e38f66", "#000000"]
player: eguiluz
chars: 129
score: 716.98
match: 100
code: |
  <img><img><style>&{background:#e38f66;*{border:5vw solid}>*{border-width:0 20 0 160;margin:30%80;*{padding:50;margin:-40-360-40 0
---

The July 19 target shows two black square frames on an orange background, linked by a thick black bar. The bar fills part of the left frame, which looks like a C. The right frame has a short vertical stroke inside. David Eguiluz draws the frames with two empty images, and a negative margin puts the second one on the left. The bar and the stroke are body's left and right borders: 160px and 20px wide.

Use **Teaching colors** to tell body's borders from the two images.

{% include animations/2026-07-19.html lang=page.lang %}

## The code, spaced out

```css
<img><img>                       /* two empty images: the two frames */
<style>
& {                              /* top level: :scope, the root, html */
  background: #e38f66;           /* the root's background: the whole canvas */
  * {                            /* every element inside html */
    border: 5vw solid            /* a 20px black border */
  }
  > * {                          /* html's children: head (hidden) and body */
    border-width: 0 20 0 160;    /* body: 160px on the left (the bar), 20px on the right (the stroke) */
    margin: 30%80;               /* 120px at the top and bottom, 80px on the sides */
    * {                          /* inside body: the two imgs */
      padding: 50;               /* 0 + 100 + 40: a 140 × 140 frame */
      margin: -40-360-40 0       /* a 60px tall margin box, and the next img 360px back */
```

## How it works

### 1. html: the orange background

There is no doctype: the page is in quirks mode. The style element is never closed, so everything after `<style>` is CSS. The two `<img>` come first, so the browser puts them in body, and the style element after them.

At the top level, `&` means `:scope`, which is the root: html. html gets `background:#e38f66`. The root's background is painted on the whole canvas.

### 2. One border for everyone, then other widths

The nested `*{border:5vw solid}` means `& *`: every element inside html. They all get a 20px border (5vw is 5% of the 400px width). No color is given, so the border takes the text color: black.

`>*{…}` means `& > *`: html's children, head and body. head is not displayed. These rules all have the same specificity, and this one comes later, so body's `border-width:0 20 0 160` wins over the 20px of `border:5vw solid`. The style stays solid. body has no border at the top and bottom, 20px on the right and 160px on the left.

### 3. body: a 240 × 60 box

In quirks mode, a number with no unit counts as px in `margin`. A percentage in `margin` is a share of the width, even at the top and bottom. So `margin:30%80` is 30% of 400 = 120px at the top and bottom, and 80px on the sides.

In quirks mode, body fills the window, minus its margins: 400 − 160 = 240 wide and 300 − 240 = 60 tall. getBoundingClientRect gives 240 × 60 at (80, 120). Its left border runs from x = 80 to 240: that is the bar. Its right border runs from 300 to 320. In between, body's content box, 60 × 60 from x = 240 to 300, is empty: it shows the orange.

### 4. An empty img: a 140 × 140 frame

The last `*{…}` means `& > * *`: the elements inside body, the two imgs and the hidden style element. An img with no `src` has 0 × 0 content. `padding:50` adds 50px on each side, and the 20px border comes from step 2. Each img is a 0 + 100 + 40 = 140 square frame, with a 100 × 100 hole.

The imgs are inline: they sit on a line inside body. `margin:-40-360-40 0` gives each one −40px at the top and bottom. Its margin box is then 140 − 80 = 60 tall, as tall as body. The first img starts at the left of body's content: getBoundingClientRect gives (240, 80), 140 × 140, as 120 − 40 = 80. It is the right frame.

### 5. A −360 margin: the second img goes back left

The first img has a −360px right margin. Its margin box ends at 240 + 140 − 360 = 20. The second img comes right after, on the same line: it starts at x = 20. getBoundingClientRect gives (20, 80), 140 × 140. It is the left frame. Its own −360 margin changes nothing, as nothing comes after it.

### 6. The bar under the frames

body's borders are painted first, the imgs on top. The imgs have no background, so only their borders cover the bar.

- In the left frame's hole, from x = 40 to 140, the bar covers x = 80 to 140, and y = 120 to 180. Orange is left on the left and above and below the bar: a C.
- Between the frames, the bar runs from x = 160 to 240 and links them.
- In the right frame's hole, from x = 260 to 360, body's empty content box shows the orange up to x = 300. body's right border, from 300 to 320, is the vertical stroke.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- `&` is html in 1 character. With `html` in its place, the code takes 132 characters, for the same picture.
- One rule gives a border to everyone, and the widths are changed for body only. Without the `>` (128 characters), `*{border-width:0 20 0 160;…}` also matches the two imgs: they get the same 160px left border and no top or bottom border, the frames are gone, and 24,000 pixels change.
- `5vw` is 20px in 3 characters: with `20px solid`, the code takes 130 characters, for the same picture. A number with no unit does not work here: with `20 solid` (128 characters), Chrome drops the whole `border` declaration, there is no border at all, and all 28,800 black pixels turn orange.
- `30%80` is 120px and 80px in 5 characters, with no space after the `%`. `120 80` makes the code 130 characters, for the same picture.
- The −40 margins at the top and bottom keep the imgs' margin boxes as tall as body. With `margin:0-360 0 0` (126 characters), the margin boxes are 140 tall and body grows to hold them: body is 140 tall from y = 120, the bar too, the frames move 40px down, and 28,800 pixels change.
- The −360 margin keeps both imgs on one line. With `margin:-40 0` (122 characters), the second img does not fit on body's 60px line: it goes to a second line, at (240, 140), over the first one. body grows to 120 tall, and 20,800 pixels change.
- No space is needed in `-40-360-40`: each minus sign starts a new number. Writing `px` on every number with no unit (`20px`, `160px`, `80px`, `50px`, `-40px -360px -40px`) makes the code 145 characters, for the same picture.
- Nothing is closed. Closing the three open rules and the style element with `}}}</style>` takes 140 characters, 11 more, for the same picture.
