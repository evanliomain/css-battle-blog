---
title: "Left borders as triangles: a fast-forward sign in 155 characters"
ref: 2026-04-13
permalink: /2026/04/13/left-borders-as-triangles/
description: "How one transparent 100px border with an orange left side, given to every element, turns html and body into two overlapping triangles, and how a second border makes two p into squares, in the April 13, 2026 CSS Battle target."
target: /assets/targets/2026-04-13.png
target_url: https://cssbattle.dev/play/7b90DYYmO7kr4z13UA79
colors: ["#588a95", "#e8ad6d", "#2f5977"]
player: pindaros
chars: 155
score: 691.3
match: 100
code: |
  <p><p><style>*{background:#588A95;margin:50 55;border:75pt solid#0000;border-left-color:E8AD6D;*{margin:-100-20;*{margin:10-110-250 0;border:59q solid#0257
---

The April 13 target is a fast-forward sign on a blue-gray canvas: two orange triangles that point right and overlap, and two dark blue squares stacked on the right. Pindaros writes one border for every element: 100px, transparent, with an orange left side. On a box with no content height, that left side is a triangle. html makes the first one, body the second. Two p get a second border, translucent blue, and become the squares.

With **Teaching colors**, the transparent sides of each border get a light tint, and each box its own color.

{% include animations/2026-04-13.html lang=page.lang %}

## The code, spaced out

```css
<p><p>                           /* two p, side by side in body */
<style>
* {                              /* every element: html, body, the p */
  background: #588A95;           /* on html: the whole canvas */
  margin: 50 55;                 /* html: 290 × 200 at (55, 50) */
  border: 75pt solid #0000;      /* 100px, transparent */
  border-left-color: E8AD6D;     /* orange, no # (quirks mode) */
  * {                            /* * *: body and the p */
    margin: -100-20;             /* body: 200 × 200 at (135, 50) */
    * {                          /* * * *: the p */
      margin: 10-110-250 0;      /* 110px wide, the second p moves up */
      border: 59q solid #0257;   /* 55.75px, drawn 55px wide in my Chrome; translucent blue */
      /* the end of the code closes the rules */
```

## How it works

### 1. Three levels of `*`

`*` matches every element. Nested inside it, `*` stands for `* *`: every element inside another one, so body and the p (and head and style, which are not displayed). One level deeper, `* * *` matches the p. The three selectors all have a specificity of 0, so the later one wins: html keeps the first margin, body takes the second, the p take the third, and the p also get a new border. Everything else, the background and the first border, goes to every element.

### 2. html: 290 × 200

CSS Battle pages have no doctype, so they are in quirks mode, where unitless lengths in margins count as pixels.

`margin:50 55` is 50 at the top and bottom, 55 left and right. html is 400 − 55 − 55 = 290px wide. In quirks mode, html stretches to the height of the viewport, minus its margins: 300 − 50 − 50 = 200. getBoundingClientRect gives 55, 50, 290 × 200.

`background:#588A95` on the root is painted on the whole canvas.

### 3. A 100px transparent border

`border:75pt solid#0000` gives every element a 75pt border. 1pt is 4/3 px, so 75pt is 100px. `#0000` is black with an alpha of 0: transparent. For html, that leaves 290 − 200 = 90px of width for the content, and 200 − 200 = 0 of height. The content box is a line, from x = 155 to 245, at y = 150.

### 4. The left side, a triangle

`border-left-color:E8AD6D` has no `#`. Quirks mode accepts a hex color without its `#` for some properties, and `border-left-color` is one of them: getComputedStyle gives rgb(232, 173, 109). With `<!doctype html>` in front of the code, it gives a transparent left border.

Where two sides of a border meet, the browser splits the corner on the diagonal. html's top and bottom sides are 100px tall, its left side 100px wide, and its content 0 tall. The two diagonals start at (55, 50) and (55, 250) and meet at (155, 150). The left side is a triangle with its tip at (155, 150). The other three sides stay transparent.

### 5. body, a second triangle

body has the same border, and the margin of `* *`: −100 at the top and bottom, −20 left and right. The minus sign starts a new number, so `-100-20` needs no space.

body sits in html's content: 90px wide from x = 155, 0 tall at y = 150. With −20 on each side, it has 90 + 20 + 20 = 130px for its border box. Its borders take 200, so its content width falls to 0, and body is 200px wide, at x = 155 − 20 = 135. In quirks mode, body stretches to the height of html's content minus its margins: 0 + 100 + 100 = 200. getBoundingClientRect gives 135, 50, 200 × 200.

Its left side is a second triangle, with its tip at (235, 150). body is painted after html, so it covers the tip of html's triangle, in the same orange. The target shows the gap between the two triangles: at y = 120, the first ends at x = 125, and the second starts at x = 135.

### 6. Two p made of border

The p take the margin of `* * *`, `10-110-250 0`, and a new border: `border:59q solid#0257`. 1q is a quarter millimeter: 59q is 55.75px. In my Chrome, getComputedStyle gives 55px. This shorthand also resets the left color: the p have no orange side.

The p sit in body's content: 0 × 0, at (235, 150). The right margin of −110 gives each p 0 − 0 + 110 = 110px for its border box. The borders take 55 + 55 = 110, so the content is 0 wide. The p is 110px wide and, with no content, 110px tall: a square made of border only. The first one starts 10px down, at (235, 160).

### 7. The second p moves up

The first p ends at y = 270. Its bottom margin, −250, touches the top margin of the second p, 10. Vertical margins that touch collapse: a positive and a negative margin add up, 10 − 250 = −240. The second p starts at 270 − 240 = 30. getBoundingClientRect gives 235, 160 and 235, 30, both 110 × 110. The target puts its squares from x = 235 to 345, y = 30 to 140 and y = 160 to 270.

### 8. A translucent blue

`#0257` is #002255 with an alpha of 0x77, 119 / 255 = 0.47. The p have the background of `*` too, #588A95, under their border. The blue is laid over it: 88 × 0.53 = 47, 34 × 0.47 + 138 × 0.53 = 89, 85 × 0.47 + 149 × 0.53 = 119. My render shows #2f5977.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One border for every element makes both triangles: html and body need no rule of their own for it.
- Nesting is shorter than three rules. With `}* *{margin:-100-20}* * *{` (161 characters), the picture is the same.
- `#0000` is 5 characters, `transparent` 11, and needs a space after `solid`. With `solid transparent` (162 characters), the picture is the same.
- `E8AD6D` needs no `#` in quirks mode. With `#E8AD6D` (156 characters), the picture is the same. Without `border-left-color:E8AD6D;` (130 characters), there are no triangles: 19,780 pixels change.
- `75pt` is 4 characters, `100px` 5. With `100px` (156 characters), the picture is the same.
- `59q` is 3 characters, `55px` 4. With `55px` (156 characters), the picture is the same. The value matters: with `58q`, my Chrome draws 54px borders, the squares are 110 × 108 and the top one starts at y = 28: 880 pixels change. With `60q`, it draws 56px borders, the squares are 112 × 112: 1,328 pixels change.
- `#0257` is 5 characters. The solid color it gives here, `#2F5977`, is 7. With `#2F5977` (157 characters), the picture is the same.
- Unitless margins count as px in quirks mode. With `50px 55px`, `-100px -20px` and `10px -110px -250px 0` (172 characters), the picture is the same.
- `-100-20` and `10-110-250` need no spaces: each minus starts a new number. With `-100 -20` (156 characters) or `10 -110 -250 0` (157 characters), the picture is the same.
- `<p><p>` needs no closing tags, and the code ends inside the rules: the end of the code closes them. With `}}}` at the end (158 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes as the target, with the same edges. 180 pixels differ from the target by more than 8 in one channel, all on the lower edges of the two triangles: one pixel per row, 100 on the second triangle, from (234, 150) to (135, 249), and 80 on the visible part of the first, from (134, 170) to (55, 249). My Chrome draws them half orange, #a09c81, where the target has the canvas color. The upper edges match. The squares are #2f5977 in my render and #2f5a76 in the target, 1 off. The CSS Battle judge gives the official code a 100% match.
