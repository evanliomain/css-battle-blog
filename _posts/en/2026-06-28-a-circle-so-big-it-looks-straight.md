---
title: "A circle so big it looks straight: a Pac-Man in 136 characters"
ref: 2026-06-28
permalink: /2026/06/28/a-circle-so-big-it-looks-straight/
description: "How one shared radial-gradient draws a yellow disc on html and, on a body turned 45°, the edge of a red circle with a 2268px radius, whose outer side vanishes into the canvas, in the June 28, 2026 CSS Battle target."
target: /assets/targets/2026-06-28.png
target_url: https://cssbattle.dev/play/zhqVcCGcq24I4ItesJgY
colors: ["#be6b6c", "#f1f271", "#284a5b"]
player: emohdaziz
chars: 136
score: 709.43
match: 100
code: |
  <style>*{*{margin:25%79 25%221;rotate:45deg;--a:at -1533%43cm,#be6b6c 60cm}background:radial-gradient(var(--a,1Q,#f1f271,25vw),#284a5b 0
---

The June 28 target is a Pac-Man: a big yellow disc on a blue-gray background, with a wedge cut out on the right. The wedge is filled by a red shape with two cut corners and a straight right edge. Mohamed Ali draws it with one `background` shared by html and body. On html, it is a yellow disc. On body, a custom property turns it into the edge of a giant red circle, and `rotate:45deg` makes body a diamond. Past that edge, the gradient paints the canvas color, so that part of the diamond disappears.

Use **Teaching colors** to see the part of body's gradient that ends up in the canvas color.

{% include animations/2026-06-28.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                    /* html, head, body and style */
  * {                                  /* * *: head, body and style */
    margin: 25%79 25%221;              /* 100 79 100 221: body is 100 × 100 */
    rotate: 45deg;                     /* a diamond, x = 200.3 … 341.7 */
    --a: at -1533%43cm,#be6b6c 60cm    /* body's own start of the gradient */
  }
  background: radial-gradient(var(--a,1Q,#f1f271,25vw),#284a5b 0
```

## How it works

### 1. The page

There is no doctype: the page is in quirks mode, and a number with no unit means px in `margin`.

The style is never closed, and neither are its rules. The elements are html, head, body and style (inside head). head and style are hidden: only html and body show.

The first `*` selects all of them. The nested `*` means `* *`: an element inside another one. html is not inside anything, so it only gets the outer rule. body gets both. The `background` comes after the nested rule, but it still belongs to the first `*`: it applies to html and to body.

### 2. html: a yellow disc

html has no `--a`, so `var()` uses its fallback, `1Q,#f1f271,25vw`. html's background is:

`radial-gradient(1Q,#f1f271,25vw,#284a5b 0)`

- `1Q` is the size: a single length makes the gradient a circle, with a 0.945px radius. That radius does not matter here, since the color stops are given in px.
- `#f1f271` has no position: it starts at 0.
- `25vw` is a transition hint: 25% of the 400px width, so 100px.
- `#284a5b 0` cannot go back before the hint: its position is pulled up to 100px. The hint sits on the stop, so the yellow stays until 100px and switches to blue-gray at once.

The result is a yellow disc with a 100px radius and a sharp edge. html's background covers the whole canvas, and it is centered on html's box, 400 × 300: the disc's center is (200, 150). In my render, the column x = 200 is yellow from y = 50 to 249.

### 3. body: a 100 × 100 square

`margin:25%79 25%221` gives 25% of 400 = 100px at the top, 79px on the right, 100px at the bottom and 221px on the left. Margin percentages are always taken from the width of the containing block, even at the top and bottom.

In quirks mode, body stretches to fill the height of the page, minus its margins: 300 − 100 − 100 = 100. Its width is 400 − 221 − 79 = 100. offsetWidth and offsetHeight give 100 × 100: body runs from x = 221 to 321 and from y = 100 to 200.

html has a background, so body's background stays on body: it paints its own box.

### 4. body: the edge of a giant circle

body has `--a`, so its background is:

`radial-gradient(at -1533% 43cm,#be6b6c 60cm,#284a5b 0)`

- The center is at `-1533%` of body's 100px width, so −1533px, and `43cm` down, so 1625.2px. From body's corner, that is (−1312, 1725) on the canvas: far down to the left.
- There is no size: the shape is an ellipse that reaches the farthest corner. Its axes keep the ratio of the distances to the farthest sides, 1633 to 1625.2, so it is almost a circle.
- `#be6b6c 60cm` paints red up to 60cm, 2267.7px from the center, along the horizontal axis. The vertical axis is 2256.9px.
- `#284a5b 0` is pulled up to 60cm: past it, blue-gray, with a sharp edge.

body's center is 2233px from the gradient's center, so the edge passes 29px beyond it, toward the top right corner. At this scale, the edge of the giant circle looks straight. In a render with `rotate` removed, body is a red square with its top right corner cut off by a 45° line, from (262, 100) to (321, 159). Past that line, body is blue-gray.

### 5. rotate:45deg

body turns by 45° clockwise around its center, (271, 150). Its background turns with it.

- The square becomes a diamond, 141.4px wide, from x = 200.3 to 341.7 and from y = 79.3 to 220.7. Its left corner, (200.3, 150), is on the disc's center.
- The gradient's center moves to (−1962, 144): almost straight to the left of body.
- So the edge becomes vertical. In my render, from y = 110 to 190, every row is red up to x = 299 and blue-gray from x = 300. By the geometry, it is a slight arc, from x = 299.7 at y = 110 to 300.1 at y = 150.

The 60cm puts the edge there. With `59cm`, the edge moves 37.8px to the left, to x = 262 on the middle row.

### 6. The blue-gray part disappears

Past the edge, body's gradient paints `#284a5b`, the canvas color. That part of the diamond, from x = 300 to 341.7, cannot be seen.

What is left is the red part: a five-sided shape, from (200.3, 150) up to (271, 79.3), along the diamond's top right side down to (300, 108.3), down the edge to (300, 191.7), and back through (271, 220.7). Its two 45° sides start at the disc's center: they cut the wedge out of the disc. The disc ends at x = 300 on the middle row, right where the edge is.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `background` serves html and body. `--a` only swaps the start of the gradient: html keeps the fallback, body gets its own center, color and radius. The `,#284a5b 0` at the end serves both. With the two gradients written out, the outer one first, the picture is the same in 161 characters.
- `1Q` makes the gradient a circle in 2 characters. Without `1Q,` (133 characters), the gradient is an ellipse with the ratio of html's box, 4:3: the disc becomes a 200 × 150 ellipse, and 6,972 pixels change. `circle` gives the same picture as `1Q`, in 140.
- `25vw` is 100px in 4 characters. `100px` gives the same picture in 137.
- The blue-gray part of body's gradient is the canvas color: it cuts the diamond along the edge, with no clip-path.
- The nested `*` selects body in 1 character, inside the first `*{`. `*{body{` gives the same picture in 139.
- A `%` ends a number, so the next one needs no space: `25%79 25%221` and `-1533%43cm`. `100 79 100 221` gives the same picture in 138 characters, and `-1533px 43cm` too.
- 221 and 79 put body's center at x = 271, so that the diamond's left corner lands at 200.3, on the disc's center. With `25%80 25%220` (same length), the diamond moves 1px to the left, and 480 pixels change.
- `cm` packs big lengths in few characters: `43cm` is 1625.2px and `60cm` is 2267.7px.
- No unit: `25%79px 25%221px` gives the same picture in 140 characters.
- Nothing is closed. `)}` at the end gives the same picture in 138 characters.
