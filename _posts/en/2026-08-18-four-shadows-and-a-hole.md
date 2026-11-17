---
title: "Four shadows and a hole: an H in 125 characters"
ref: 2026-08-18
permalink: /2026/08/18/four-shadows-and-a-hole/
description: "How a 40 × 40 body and four box-shadows draw the August 18, 2026 CSS Battle target, a dark H with yellow insides, and why the empty body box makes the top notch."
target: /assets/targets/2026-08-18.png
target_url: https://cssbattle.dev/play/OqjzeCZTtlVTfqqvKCRg
colors: ["#51a499", "#282828", "#eac049"]
player: emohdaziz
chars: 125
score: 721.52
match: 100
code: |
  <body bgcolor=51a499 text=eac049 style=margin:50+45%210;box-shadow:0+40vw#51a499,0+5vw+0+5vw,0+35vw+0+5vw,0+5em+0+5em#282828>
---

The August 18 target is a dark H on teal. The inside of the H is yellow, with a teal notch at the top and at the bottom. Mohamed Ali's solution is a single `<body>` tag. Its margins make it a 40 × 40 square, and four box-shadows copy that square, move it down and grow it. The top notch is not drawn at all: it is the body box itself, where no shadow is ever painted.

Use **Teaching colors** to tell the four shadows apart.

{% include animations/2026-08-18.html lang=page.lang %}

## The code, spaced out

```css
<body
  bgcolor=51a499              /* background #51a499: it paints the whole canvas */
  text=eac049                 /* text color #eac049: used by shadows with no color */
  style=
    margin: 50 +45% 210;      /* 50px on top, 180px on the sides, 210px at the bottom */
    box-shadow:
      0 +40vw #51a499,        /* 1st, on top: 160px down, the bottom notch */
      0 +5vw 0 +5vw,          /* 2nd: 20px down, 20px spread, yellow */
      0 +35vw 0 +5vw,         /* 3rd: 140px down, 20px spread, yellow */
      0 +5em 0 +5em #282828   /* 4th, at the bottom: 80px down, 80px spread */
>
```

## How it works

### 1. One tag, in quirks mode

There is no doctype, so the page is in quirks mode. Two things in this code need it. Numbers with no unit, like `50` and `210`, are read as px. And the body is stretched to the height of the window.

I checked with `<!doctype html>` in front: the margin is dropped (the body keeps its default 8px), and the body is 0px tall.

The `style` attribute has no quotes. An unquoted value ends at the first space, so the code has none. The `+` signs take their place: `0+40vw` is read as `0` and `+40vw`, which is just 40vw with a sign. The same code with spaces and quotes is 130 characters and renders the same.

### 2. A 40 × 40 body

`margin:50+45%210` is three values: 50px on top, 45% on the left and right, 210px at the bottom. A percentage margin is a share of the width of the parent: 45% of 400 = 180px. The body is 400 − 2 × 180 = 40px wide, from x = 180 to 220.

The body is empty, so it has no height of its own. In quirks mode it fills the window, minus its margins: 300 − 50 − 210 = 40px. The body is a 40 × 40 square at (180, 50). I checked: with `margin:50+45%`, the bottom margin is 50px too, and the body is 200px tall.

### 3. Colors in attributes

`bgcolor=51a499` and `text=eac049` are old HTML attributes. Their parser takes a hex color with no `#`. `bgcolor` sets the background of the body. `html` has no background, so the body's background is used for the whole canvas.

`text` sets the color of the body: #eac049. Two of the shadows have no color, so they use `currentColor`, which is that color. Without `text`, those two shadows are black.

### 4. Four shadows, from the bottom up

A box-shadow is a copy of the box, moved by its offsets and grown by its spread on every side. With several shadows, the first one is painted on top and the last one at the bottom. Here they all have a 0 horizontal offset, so they all stay centered on x = 200. The units: 1vw is 4px on a 400px wide canvas, and 1em is 16px, the default font size.

- `0+5em+0+5em#282828`, the last one: 80px down, 80px of spread. 40 + 2 × 80 = 200: a dark square from (100, 50) to (300, 250). That is the whole H.
- `0+35vw+0+5vw`: 140px down, 20px of spread. 40 + 2 × 20 = 80: a yellow square from (160, 170) to (240, 250).
- `0+5vw+0+5vw`: 20px down, 20px of spread: a yellow square from (160, 50) to (240, 130).
- `0+40vw#51a499`, the first one: 160px down, no spread. A 40 × 40 square in the background color, from (180, 210) to (220, 250), on top of the lower yellow square: the bottom notch.

I rendered each shadow alone on a white canvas. They cover exactly these rectangles.

### 5. The hole under the body

A box-shadow is never painted under its own box. The body box goes from (180, 50) to (220, 90). The dark square and the upper yellow square both cover it, but nothing of them is painted there. Alone, the upper yellow square is 4800 pixels: 80 × 80 minus the 40 × 40 of the body.

The body paints no background in that box either: its background went to the canvas. So the canvas shows through, and that is the top notch. I checked: without `bgcolor`, the canvas is white, and so is the top notch.

## Golf notes

- One tag, no `<style>`: the colors are attributes and the CSS is in an unquoted `style`.
- `+` in place of each space: 11 of them. With no space in the value, the attribute needs no quotes.
- `#51a499` and `#282828` stick to the number before them, and `%` ends `45%`, so `45%210` needs no separator. With `180` in place of `45%`, the code needs a `+` before `210`: 126 characters.
- The empty body box is the top notch for free. Only the bottom notch needs a shadow.
- `text=eac049` (12 characters with its space) colors both yellow shadows. Writing `#eac049` in each one instead costs 14: 127 characters.
- `bgcolor=51a499` with its space is 15 characters. `background:#51a499;` in the style is 19: 129 characters.
- `5em` is 80px in 3 characters, and it is written twice. `20vw` would make the code 127 characters.
