---
title: "One 8ex, two lengths: a T of four discs in 142 characters"
ref: 2026-05-18
permalink: /2026/05/18/one-8ex-two-lengths/
description: "How one shadow list draws both the bars and the discs: on html, 8ex is about 57px; on body, with a 204% font, it is about twice as long, in the May 18, 2026 CSS Battle target."
target: /assets/targets/2026-05-18.png
target_url: https://cssbattle.dev/play/8AKCdxcq4QdnUefpzbvT
colors: ["#9ff0fb", "#3f8ba6"]
player: emohdaziz
chars: 142
score: 703.34
match: 100
code: |
  <style>*{color:3F8BA6;box-shadow:inset 9in 0,8ex 0,-8ex 0,0 8ex;margin:75 185 195;*{background:#9ff0fb;border-radius:50%;margin:-35;font:204%"
---

The May 18 target shows four dark teal discs in a T, three in a row and one below the middle one, linked by short bars, on a light blue background. Mohamed Ali draws it with html and body, and one shadow list that both get. Its offsets are in `ex`, which follows the font size. html keeps the default font, and its shadows are the bars. body gets a font about twice as big, and the same shadows become the discs.

With **Teaching colors**, html's and body's shadows each get their own color.

{% include animations/2026-05-18.html lang=page.lang %}

## The code, spaced out

```css
<style>                    /* goes into head */
* {                        /* html, head, style, body */
  color: 3F8BA6;           /* no hash: quirks mode */
  box-shadow:
    inset 9in 0,           /* fills the box */
    8ex 0,                 /* a copy to the right */
    -8ex 0,                /* a copy to the left */
    0 8ex;                 /* a copy below */
  margin: 75 185 195;      /* html: 30 × 30 at (185, 75) */
  * {                      /* head, style, body */
    background: #9ff0fb;   /* goes to the canvas */
    border-radius: 50%;    /* body: a disc */
    margin: -35;           /* body: 100 × 100 at (150, 40) */
    font: 204% "           /* 32.64px: a bigger ex */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `75` in a margin is read in px.

The `<style>` goes into head, and body stays empty. `*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body. head and style are not displayed. Two boxes are left: html and body. The rules are never closed: the end of the code closes them.

The first level gives both boxes a color, a shadow list and a margin. The second level gives body a background, round corners, another margin and a font.

### 2. A light blue canvas

body gets `background:#9ff0fb`. html has no background. In that case, body's background goes to the canvas, and the whole canvas is light blue.

### 3. Two margins, two squares

html gets `margin:75 185 195`: 75px at the top, 185px on the left and right, 195px at the bottom. In quirks mode, html fills the page minus its margins: 400 − 370 = 30 wide, 300 − 270 = 30 tall, at (185, 75).

body gets that margin too, but the nested rule also gives it `margin:-35`. Both selectors have the same weight, and the nested one comes last, so it wins. A negative margin pushes body out of html, 35px on each side. In quirks mode, body also fills html's height. body is 30 + 70 = 100 wide and 100 tall, at (150, 40).

### 4. A color without a hash

In quirks mode, `color` accepts a hex color without its `#`: `3F8BA6` is `#3F8BA6`, a dark teal. The shadows give no color, so they use the element's color. html and body both get it from the first level.

### 5. The inset shadow fills the box

An inset shadow is painted inside the box, all around a hole the size of the box. The offset moves the hole. `inset 9in 0` moves it 864px to the right (1in = 96px). The hole leaves the box completely, and the whole box is painted.

On html, that fills the 30 × 30 square. On body, the shadow follows the round corners: `border-radius:50%` makes the 100 × 100 box a disc, and the inset shadow fills the disc. This is the middle disc.

### 6. Three copies at 8ex

The other three shadows copy the box 8ex to the right, 8ex to the left and 8ex below. `ex` is the x-height of the element's font, so the same `8ex` gives a different length on each box.

html keeps the default font, 16px Times. In my Chrome, its 8ex is 57.44px, so 1ex is 7.18px. Its three copies are 30 × 30 squares: x = 127.56 to 157.56 and 242.44 to 272.44 at y = 75 to 105, and y = 132.44 to 162.44 at x = 185 to 215. These are the three bars of the T.

On body, the same three shadows copy the disc. The disc and its copies are painted after html's shadows: they cover the ends of the bars. Only 20px of each bar shows, between two discs.

### 7. The font sets body's ex

`font:204%"` gives body 204% of 16px: 32.64px. The `font` shorthand needs a font name. The `"` opens a string, and the end of the code closes it: the name is empty. In my Chrome, body's ex is 0.4487 times its font size, the same ratio as on html: body keeps the default font too.

The target puts the discs 120px apart: x = 30, 150 and 270 for the top row, y = 160 for the bottom disc. In my Chrome, body's 8ex is 117.17px, a little short: see the last section. The four discs and the three bars make the T.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list for two boxes. `ex` scales it with the font. With a second list on body in fixed lengths, `box-shadow:inset 9in 0,30vw 0,-30vw 0,0 30vw` in place of `font:204%"` (176 characters), the discs are also 120px apart, but the code is 34 characters longer.
- The font is needed. Without `;font:204%"` (131 characters), body's 8ex is html's 57.44px: the four discs pile up in a clump, and 24,736 pixels change.
- `font:204%"` is the shortest way to set the size. With `font-size:204%` (146 characters), the picture is the same. The shorthand needs a font name, and `"` is the shortest one. With a space before it, `204% "` (143 characters), the picture is the same.
- The color has no hash, thanks to quirks mode. With `#3F8BA6` (143 characters), the picture is the same. The trick does not work in the `background` shorthand: with `background:9ff0fb` (141 characters), my Chrome drops it, the canvas stays white, and 87,382 pixels change.
- `9in` is 3 characters and far more than the 100px of body. The inset shadow is needed: without `inset 9in 0,` (130 characters), the middle disc and html's square are gone, only the copies are left, and 7,385 pixels change.
- The negative margin turns html's 30px square into body's 100px square, with no width or height.
- Nesting saves a selector. With a separate rule, `}* *{background…` (144 characters), the picture is the same.
- Bare numbers, thanks to quirks mode. With `75px 185px 195px` and `-35px` (150 characters), the picture is the same. With a doctype in front (157 characters), my Chrome drops the bare numbers and the hashless color: html is 400 × 8, body is 0px tall, the shadows turn black, and 38,065 pixels change.

## If you try it at home

In my local Chrome (version 157 when this was written), the official code is close but not pixel-exact. body's 8ex is 117.17px there, not 120. The outer discs sit about 3px too close to the middle one: at y = 90, the T runs from x = 33 to 367 in my render, from 30 to 370 in the target, and the bottom disc ends at y = 257 instead of 260. 2,094 pixels are more than 8 off the target in one channel, up to 101.

With `209%` in place of `204%`, body's 8ex is 120.01px in my Chrome, and the discs land where the target has them. 871 pixels are left, all within 2px of the edges of the discs, where the anti-aliasing differs. The CSS Battle judge gives the official code a 100% match. The animation above puts the discs 120px apart, as in the target.
