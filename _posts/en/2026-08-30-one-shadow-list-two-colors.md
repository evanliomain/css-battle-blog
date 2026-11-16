---
title: "One shadow list, two colors: a staircase outline in 118 characters"
lang: en
ref: 2026-08-30
permalink: /2026/08/30/one-shadow-list-two-colors/
description: "How one box-shadow list, given to html in dark blue and to the body in turquoise, draws the August 30, 2026 CSS Battle target: a hollow staircase outline."
target: /assets/targets/2026-08-30.png
target_url: https://cssbattle.dev/play/cDcn0dlBGXZ9slTUGUqf
colors: ["#57c4c4", "#243D83"]
player: selenit
chars: 118
score: 729.91
match: 100
code: |
  <style>*{box-shadow:inset 0 2in,1em 1em,-1em -1em;color:57C4C4}&{color:243D83;background:#57C4C4;zoom:2.5;margin:36 40
---

The August 30 target is a dark blue outline on turquoise: three rectangles in a diagonal staircase, merged into one hollow shape with a 20px line. Ilya Streltsyn's solution gives the same three shadows to two boxes, `html` and the `body`. On `html` they are dark blue and draw three solid rectangles. On the `body`, 20px further in, they are turquoise and hollow them out.

Use **Teaching colors** to see each of the six shadows in its own color.

{% include animations/2026-08-30.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html, head, style, body */
  box-shadow:
    inset 0 2in,                     /* fills the box */
    1em 1em,                         /* a copy, bottom right */
    -1em -1em;                       /* a copy, top left */
  color: 57C4C4;                     /* the shadows' color: turquoise */
}
& {                                  /* html */
  color: 243D83;                     /* its shadows: dark blue */
  background: #57C4C4;               /* goes to the canvas */
  zoom: 2.5;
  margin: 36 40;                     /* 90 100 on screen */
}
```

## How it works

### 1. html, zoomed 2.5 times

At the top level of a style sheet, a lone `&` matches the root, `html`. Its turquoise background is used for the whole canvas.

`zoom:2.5` makes everything 2.5 times bigger, so the 400 × 300 canvas is only 160 × 120 CSS px for `html`. In quirks mode, `html` fills the height of the viewport. With `margin:36 40`, it is 160 − 80 = 80 wide and 120 − 72 = 48 tall. On screen, that is a 200 × 120 box at (100, 90). The margins are unitless: quirks mode reads them as px.

### 2. An inset shadow that fills the box

A box shadow with no color uses `currentColor`. `*` sets `color:57C4C4` on every element, but the `&` rule gives `html` `color:243D83`. Quirks mode accepts both colors without their `#`. So the shadows of `html` are dark blue.

`inset 0 2in` is an inner shadow pushed 2in = 192px down. An inset shadow paints the box everywhere except a "hole" the size of the box, here moved 192px down. The box is only 48px tall, so the hole is entirely out of it, and the shadow fills the whole box. It works like a background that stays on the box: the real `background` of `html` goes to the canvas.

### 3. Two copies at ±40

`1em 1em` and `-1em -1em` are two outer shadows the same size as the box, with no blur. `html` has a 16px font size, so 1em is 16px, and the zoom makes it 40px on screen. One copy sits at (60, 50), the other at (140, 130). With the box at (100, 90), that makes three 200 × 120 dark blue rectangles in a staircase. Measured alone, they cover the whole outer shape of the target.

### 4. The body, 20px further in

The `body` keeps its default 8px margin, which is 20px on screen. In quirks mode, it fills the height of `html`: 64 × 32 CSS px, so 160 × 80 at (120, 110). The `*` rule gives it the same three shadows, but the `body` keeps `color:57C4C4`: its shadows are turquoise, the color of the background.

Its `inset 0 2in` fills it with turquoise, the same way as in step 2.

### 5. Its two copies hollow the outline

The `body`'s ±1em shadows are also 40px on screen: two turquoise rectangles of 160 × 80, at (80, 70) and (160, 150). The `body` is drawn on top of `html`, so they cover the blue.

Each turquoise rectangle sits inside a blue one, 20px from every side: the `body`'s 8px margin, zoomed. So a 20px dark blue line is left all around, and where two blue rectangles meet, the line follows the steps.

## Golf notes

- One `*` rule gives the same shadow list to `html` and the `body`. The two boxes only differ by `color`, which picks the shadows' color.
- `inset 0 2in` fills a box with its own color in 11 characters. Any vertical offset larger than the box height works: I checked that `1in` and `49px` give the same render.
- `zoom:2.5` turns `1em` into 40px, the 8px body margin into the 20px line, and gives margins of `36 40` instead of `90 100`.
- `&` is the shortest way to select `html`.
- `color:57C4C4` drops the `#` thanks to quirks mode. The `background` keeps it: I checked that `background:57C4C4` leaves the canvas white.
- `<style>` is never closed, and the last brace is left out.
