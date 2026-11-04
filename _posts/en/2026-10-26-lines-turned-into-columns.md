---
title: "Lines turned into columns: an extension cord in 246 characters"
lang: en
ref: 2026-10-26
permalink: /2026/10/26/lines-turned-into-columns/
description: "How inline elements split across lines of text, then a 3D half-turn of html around the diagonal, draw the October 26, 2026 CSS Battle target: a cable with two loops and two plugs."
target: /assets/targets/2026-10-26.png
target_url: https://cssbattle.dev/play/z0yxKNnAycnbUfSMzhrV
colors: ["#2834ba", "#479582"]
player: evanliomain
chars: 246
score: 638.35
match: 100
code: |
  <s><u><ul><i><b dir=rtl><li><style>s,u,i,b{border:5vw solid#2834ba;border-radius:1in;padding:30;margin:-50}s{border-width:0 40;margin:180}u{border-width:10;padding:10 30}b{margin:110}&{rotate:1 1 0 180deg;margin:57;background:#479582;font:0/10vw"
---

The October 26 target is an extension cord on a sea-green background: a thick blue cable with a loop at the top left and a loop at the bottom right, and a plug at each end, one pointing down, one pointing up. The picture is the same after a half-turn. I get that symmetry from inline elements: an inline element split over two lines has its start borders on the first piece and its end borders on the second, which is the same shape turned around. The whole page is then flipped across its diagonal, so the lines of text become columns.

{% include animations/2026-10-26.html lang=page.lang %}

## The code, spaced out

```css
<s><u><ul><i><b dir=rtl><li>      /* empty tags, nested */
<style>
s, u, i, b {
  border: 5vw solid #2834ba;     /* 20px */
  border-radius: 1in;            /* clamped by each piece's size */
  padding: 30;
  margin: -50;
}
s { border-width: 0 40; margin: 180 }      /* plug heads */
u { border-width: 10; padding: 10 30 }     /* pins */
b { margin: 110 }
& {                                         /* html */
  rotate: 1 1 0 180deg;          /* half-turn around the diagonal */
  margin: 57;
  background: #479582;
  font: 0 / 10vw "";             /* no glyphs, 40px lines */
}
```

## How it works

### 1. Lay it out first, turn it last

The easiest way to read this code is to ignore the `rotate` at first. Without it, the page is plain text layout: `font:0/10vw"` gives text of size 0 (nothing shows) on lines 40px tall (10vw). The `body` content takes 5 lines, from y = 65 to 265.

All the tags are empty. Nothing has a width or a height: every shape is the border and padding of an inline element. With a 0 font size, an inline box is only as tall as its vertical padding and borders.

### 2. A block splits an inline element in two

`<s>` and `<u>` are inline, and `<ul>` inside them is a block. A block can't sit in a line, so the browser splits `s` and `u` around it: one piece on line 1, before the `ul`, and one piece on line 5, after it.

Each piece only gets the borders of its own side:

- the first piece gets the **start** border (left) and the start corners;
- the last piece gets the **end** border (right) and the end corners.

So the two pieces are the same shape, turned by 180°. That is the symmetry of the picture, for free.

### 3. The plugs: s and u

- `s` has `border-width:0 40`: only start and end borders, 40px thick, and `padding:30` around nothing, so each piece is 60px tall. With the radius, each piece is a rounded head, 60px wide: a plug.
- `u` sits inside `s` with 10px borders and `padding:10 30`. Its piece is a 40 × 40 open box: two 10px sides with a 20px gap. They are the pins. Its `margin:-50` pulls it back inside the head, which hides the rest.
- `s{margin:180}` pushes the first piece 180px along line 1. The second piece starts at the beginning of line 5.

### 4. The loops: i, split by an empty li

`<ul>` keeps its default 40px left padding, which shifts everything inside it (its 1em margins are 0 with a 0 font size). In it, `<i>` contains `<b>`, which contains an empty `<li>`. The `li` is a block, so it splits `i` and `b` too, and it makes a line of its own: line 3, the line of its invisible bullet.

`i` has 20px borders and 30px padding, so each piece is 100px tall. The first piece, on line 2, has the rounded left border and runs to the right: a ⊂. The second, on line 4, is the mirror: a ⊃. The `1in` (96px) radius is too big for a 100px piece, so the browser scales it down to 50px: perfect half-circles.

### 5. b dir=rtl closes the loops

`<b dir=rtl>` is split the same way, but its direction is right-to-left. In right-to-left, the **start** is on the right. So its first piece, on line 2, gets the right border: a ⊃ that closes the loop opened by `i`. Its last piece, on line 4, gets the left border: a ⊂ for the other loop.

`b{margin:110}` gives the space between the loops: on line 2, the 110px start margin makes `i` longer; on line 4, the 110px end margin pushes the second loop along the line.

### 6. The half-turn

`rotate:1 1 0 180deg` turns `html` by 180° around the axis (1, 1, 0): the diagonal of the screen. There is no perspective, so the result is flat: a mirror image across that diagonal. x and y swap.

- Lines of text become columns: line 1 is the left column, line 5 the right one.
- The start of a line goes to the top, the end goes to the bottom.

The turn is around the center of `html`. `margin:57` makes its box 286 × 216 at (57, 57), centered on (200, 165), which puts the cable where the target has it. The background goes to the canvas, so the turn doesn't show at the edges.

| Line | Pieces | On screen |
| --- | --- | --- |
| 1 | start of `s` and `u` | plug at the bottom left, pins down |
| 2 | start of `i`, start of `b` | top-left loop and its two long stems |
| 3 | empty `li` | 40px of space |
| 4 | end of `b`, end of `i` | bottom-right loop and its stems |
| 5 | end of `u` and `s` | plug at the top right, pins up |

## Golf notes

- No element has a width or a height: line height, padding and borders size everything.
- An inline element split over two lines gives a shape and its 180° copy, with one element.
- `dir=rtl` swaps start and end on one element, for the opposite pieces.
- An empty `<ul>` splits its inline parents, and its default 40px padding replaces a margin. An empty `<li>` adds one line.
- One radius, `1in`, serves all the shapes: the browser shrinks it to 30, 20 or 50px to fit each piece.
- `font:0/10vw"` sets the line height with no glyphs. The `"` opens a font name that runs to the end of the file, so it needs no closing quote.
- `5vw` is 20px in 3 characters.
