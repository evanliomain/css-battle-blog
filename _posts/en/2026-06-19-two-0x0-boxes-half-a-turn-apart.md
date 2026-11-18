---
title: "Two 0 × 0 boxes, half a turn apart: a white X in 117 characters"
ref: 2026-06-19
permalink: /2026/06/19/two-0x0-boxes-half-a-turn-apart/
description: "How html and body, two 0 × 0 boxes at the center of the canvas, get the same two box-shadows, and how rotate and two scale:-1 turn the copies half a turn apart to draw a white X between two gray blocks, in the June 19, 2026 CSS Battle target."
target: /assets/targets/2026-06-19.png
target_url: https://cssbattle.dev/play/5HntWfntp6RmDVX4hhHs
colors: ["#af6a8a", "#444", "#fff"]
player: emohdaziz
chars: 117
score: 731.15
match: 100
code: |
  <style>&{rotate:45deg;background:#AF6A8A}*{margin:37.5%50%;scale:-1;box-shadow:64q -64q 0 32q#444,32q -32q 0 60px#fff
---

The June 19 target is a white X on a mauve background, with a dark gray block at each end: two white diamonds that overlap in the middle, each with a gray diamond on its outer tip. Mohamed Ali turns html and body into two 0 × 0 boxes at the center of the canvas, and gives both the same two shadows: a white square with a gray square in its corner. html is turned 45°, and `scale:-1` turns body half a turn further than html: one copy goes left, the other right.

Use **Teaching colors** to tell html's shadows from body's.

{% include animations/2026-06-19.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                    /* outside any rule: the root, html */
  rotate: 45deg;
  background: #AF6A8A; /* goes to the whole canvas */
}
* {                    /* html, head, style, body */
  margin: 37.5% 50%;   /* html: 150px and 200px, 0 × 0 at (200, 150); body: 0 */
  scale: -1;           /* half a turn, for html and again for body */
  box-shadow:
    64q -64q 0 32q #444, /* 60.47 × 60.47 square, on top */
    32q -32q 0 60px #fff /* 120 × 120 square */
```

## How it works

### 1. `&` is html

At the top level, outside any rule, `&` stands for the scope of the style sheet: the root element. In my render, html has `rotate: 45deg` and body has `rotate: none`.

html's background goes to the whole canvas, and it is not turned with html: the canvas is mauve.

### 2. html is a point at the center

`*` selects html, head, style and body. head and style are hidden.

A margin in % is a share of the width of the parent box, for the top and bottom too. For html it is the 400px canvas: 37.5% × 400 = 150px at the top and bottom, 50% × 400 = 200px on the left and right. html is 400 − 2 × 200 = 0px wide. CSS Battle pages have no doctype, so they are in quirks mode, and html fills the canvas height: 300 − 2 × 150 = 0px tall.

I measured html as a 0 × 0 box at (200, 150), the center of the canvas.

### 3. Two shadows on an empty box

A box-shadow with spread is the box grown by the spread on each side. Here the box is 0 × 0, so each shadow is a square of twice the spread, centered on its offset. The unit `q` is a quarter of a millimeter: 32q = 30.24px and 64q = 60.47px.

- `64q -64q 0 32q#444`: a #444 square of 60.47 × 60.47, centered 60.47px right and 60.47px up.
- `32q -32q 0 60px#fff`: a white square of 120 × 120, centered 30.24px right and 30.24px up.

The first shadow in the list is painted on top. The gray square sits on the outer corner of the white one.

### 4. html is turned 225°

`scale:-1` flips both axes, which is half a turn. html is turned 45° + 180° = 225° around (200, 150).

The two squares become diamonds. Their corner, which pointed up and right, now points left. The white diamond is centered at (157.24, 150), and is 169.71px wide and tall. The gray diamond is centered at (114.48, 150), from x = 71.72 to 157.24: its inner tip is the center of the white one.

### 5. body turns half a turn back

body gets the margin, `scale:-1` and the shadows too. Its margin in % is a share of html's width, 0: it is 0. So body is also a 0 × 0 box at (200, 150).

body is inside html, so it turns with html. Its own `scale:-1` adds another half turn: 225° + 180° = 405°, which is 45°. Its two diamonds are the mirror of html's, on the right: the white one centered at (242.76, 150), the gray one at (285.52, 150).

I checked it by removing one element's shadows at a time: html's shadows are the left half, body's the right half.

### 6. The X

The two white diamonds are 85.52px apart and 169.71px wide, so they overlap in the middle. Together they make the X. Between their top tips, the edges cross at (200, 107.91), and at (200, 192.09) at the bottom: the two notches of the X.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list does both halves. It is given to html and body with `*`, and the flips place the copies.
- `&` is one character for html. `rotate` must stay on html only. With `rotate:45deg` moved into `*` (115 characters), body turns too: it ends up turned 90° from the start instead of 45°, its shadows are upright squares at the bottom right, and 12,073 pixels change.
- `scale:-1` is in `*`, so html is flipped too, but that does not matter: what counts is that body is turned half a turn from html. Without `scale:-1` (108 characters), both copies land on the right, one on top of the other, and 11,432 pixels change.
- The margin is in %. `margin:150 200` would also work for html in quirks mode, and is one character shorter (116 characters). But body gets it too: body moves to (400, 300), html grows to 150px tall, and 41,703 pixels change. With %, body's margin is a share of html's 0 width: 0, for free.
- `37.5%50%` needs no space after the `%`, and `32q#444` and `60px#fff` need none before the `#`.
- The blur is written as `0` because the spread is the fourth value.
- `q` is a one-letter unit: 64q and 32q are three characters each. The same shadows in px with two decimals, `60.47px -60.47px 0 30.24px#444,30.24px -30.24px 0 60px#fff`, take 137 characters, and 15 pixels change.
- Nothing is closed. A `}` at the end gives the same picture in 118 characters.

## If you try it at home

In my local Chrome, the official code is very close to the target but not identical: 933 pixels differ by more than 8 on a channel, by up to 117. Every one of them is next to an edge of a shape, on the 45° sides. My render has 37 different colors, the target 14. The CSS Battle judge gives the code a 100% match.
