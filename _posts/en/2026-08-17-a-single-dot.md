---
title: "A single dot: a disc and two squares in 124 characters"
ref: 2026-08-17
permalink: /2026/08/17/a-single-dot/
description: "How a dotted left border with room for a single dot draws the disc of the August 17, 2026 CSS Battle target, and how the body and its two shadows cut a quarter out of it and add two gray squares."
target: /assets/targets/2026-08-17.png
target_url: https://cssbattle.dev/play/H7DBc8YLyOFJFNJ78t9U
colors: ["#f1e1be", "#7c7565"]
player: h_blierzt
chars: 124
score: 722.68
match: 100
code: |
  <style>&{border-left:dotted 50vh;color:7C7565;margin:75 175}*{background:#F1E1BE;*{margin:0-0 75-75;box-shadow:75px 0,0-75px
---

The August 17 target is a gray disc on a cream background. Its top right quarter is missing, and two gray squares sit above it and to its right, like steps. H_Bliertz draws the disc with a dotted border on `html`: the border is as thick as the side is long, so it has room for a single round dot. The body is a cream square that hides a quarter of the disc, and its two box-shadows are the gray squares.

Use **Teaching colors** to see the body square, which is the same color as the background.

{% include animations/2026-08-17.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                            /* html */
  border-left: dotted 50vh;    /* 150px thick: one dot, a 150px disc */
  color: 7C7565;               /* no #: quirks mode accepts it */
  margin: 75 175;              /* 75px top and bottom, 175px left and right */
}
* {
  background: #F1E1BE;         /* html: the whole canvas · body: the square over the disc */
  * {                          /* body (head and style are not displayed) */
    margin: 0 -0 75 -75;       /* top, right, bottom, left */
    box-shadow:
      75px 0,                  /* the right square */
      0 -75px                  /* the top square */
```

## How it works

### 1. `&` is html

`&` is the nesting selector. Used outside any rule, it matches the root of the document: `html`. I checked: with `html` in place of `&`, the render is the same.

There is no doctype, so the page is in quirks mode. The code needs it twice. Numbers with no unit, like `75 175`, are read as px. And `color:7C7565` is a hex color with no `#`, which quirks mode accepts for `color`. I checked with `<!doctype html>` in front: every margin is dropped and so is the color. html sits at (0, 0), and I get a black disc in the top left corner.

### 2. A 50 × 150 box

`margin:75 175` is 75px on top and at the bottom, 175px on the left and right. Without its border, html is 400 − 2 × 175 = 50px wide. In quirks mode, html is stretched to the height of the window, minus its margins: 300 − 2 × 75 = 150px. So html starts as a 50 × 150 box at (175, 75).

The outer `*` gives html the background #F1E1BE. The background of the root element paints the whole canvas.

### 3. A dotted border with room for one dot

`50vh` is half the height of the 300px canvas: 150px. The left border is 150px thick and 150px tall.

A dotted border is a row of round dots, each as wide as the border. I rendered the same border, on the same 150px side, at other widths. At 10px I get 8 dots, at 20px 4, at 30px 3, at 50px 2. At 150px, a single dot fills the whole side: a disc of 150px, from (175, 75) to (325, 225). Alone, it gives 17,646 pixels that are more gray than cream. π × 75² is 17,671.

The border takes 150px of the width. Only 50px were there, so the content width drops to 0. html is now 150 × 150, and its content box is a 0px wide strip at x = 325.

The border has no color of its own, so it uses `currentColor`: #7C7565.

### 4. The body: 75 × 75 at (250, 75)

The nested `*` matches every element inside another one: head, style and body. head and style are not displayed, so only body counts.

Without margins, the body would fill the content box of html: at x = 325, 0px wide and 150px tall. I checked that with `margin:0`. `margin:0-0 75-75` reads 0, −0, 75 and −75: top, right, bottom and left.

- The −75px left margin makes the body start 75px to the left, at x = 250. A negative margin also adds to the width: 0 + 75 = 75px.
- The 75px bottom margin comes out of the height, which is stretched in quirks mode: 150 − 75 = 75px.

The body is a 75 × 75 square from (250, 75) to (325, 150). Its bottom left corner is the center of the disc.

### 5. The hidden quarter

The outer `*` also gives the body the background #F1E1BE. When html has a background of its own, the body's background is painted in the body box only, and over the border of html. So this cream square hides the top right quarter of the disc.

I checked: with the background on html only, the disc stays whole.

### 6. Two shadows

A box-shadow is a copy of the box, moved by its offsets. The body inherits `color` from html, and shadows with no color use `currentColor`, so both are #7C7565.

- `75px 0`: 75px to the right, from (325, 75) to (400, 150).
- `0-75px` reads `0` and `-75px`: 75px up, from (250, 0) to (325, 75).

I rendered each shadow alone in red: each covers exactly 75 × 75 = 5,625 pixels, at these positions.

## Golf notes

- `&` matches html in 1 character. `html` makes the code 127 characters, `:root` 128.
- `50vh` is 150px in 4 characters. `150px` makes it 125.
- `color:7C7565` colors the disc and both shadows at once. Without it, `#7C7565` in the border and in each shadow makes the code 132 characters.
- The color needs no `#` in quirks mode, but `background` does. `background:F1E1BE` is dropped: the canvas turns white, and the disc stays whole.
- One `*{background:#F1E1BE}` colors the canvas through html and the square over the disc through body.
- The minus signs separate the values: `0-0 75-75` and `0-75px`. With spaces, the code is 127 characters.
- `0-0` is the same length as `0 0`, and it renders the same.
- The `</style>` and the two closing braces of the `*` rules are left out. With them, the code is 134 characters and renders the same.

## If you try it at home

In my Chrome (version 157 when this was written), the straight edges land on the same pixels as in the target. But 99,009 pixels differ from my render. 91,876 of them are cream pixels one level apart: (241, 225, 190) in my render, which is `#f1e1be`, and (241, 225, 191) in the target. The target file I have is a JPEG. 1,372 pixels differ by more than 8 levels, and all of them are within 10px of an edge. The largest difference is 88 levels, at (200, 93), on the edge of the disc: my render is almost cream there, the target almost gray. In the target, the disc reaches a little further at the top left and a little less far at the bottom right. On the CSS Battle judge, the code is a 100% match.
