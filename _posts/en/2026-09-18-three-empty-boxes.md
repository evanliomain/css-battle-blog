---
title: "Three empty boxes: a bracket and a T in 158 characters"
lang: en
ref: 2026-09-18
permalink: /2026/09/18/three-empty-boxes/
description: "How zoom:10 and three boxes reduced to their borders draw the September 18, 2026 CSS Battle target: a yellow bracket and a T on its side."
target: /assets/targets/2026-09-18.png
target_url: https://cssbattle.dev/play/bgsT1tukudFAfXdKJGD2
colors: ["#4c4c6b", "#fae29e"]
player: benjamintordjman
chars: 158
score: 688.73
match: 100
code: |
  <p><style>*{border:1px solid#FAE29E;margin:5 17}&{zoom:10;background:#4C4C6B;margin:4 16 4 12;border-width:2 0 2 2;border-radius:4px 0 0 4px;p{margin:2-1 0-15
---

The September 18 target is pale yellow on slate: a thick bracket, rounded on the left, and next to it a T lying on its side. Benjamin Tordjman's solution zooms the page by 10 and gives every element a 1px yellow border. `html` keeps three sides of it: the bracket. The `body` and a `<p>` have no content at all, so they are nothing but their borders: the two bars of the T.

Use **Teaching colors** to see which box draws which bar.

{% include animations/2026-09-18.html lang=page.lang %}

## The code, spaced out

```css
<p>
<style>
* {
  border: 1px solid #FAE29E;       /* 10px on screen */
  margin: 5 17;                    /* for the body */
}
& {                                /* html */
  zoom: 10;                        /* everything is 10 times bigger */
  background: #4C4C6B;
  margin: 4 16 4 12;               /* a 12 × 22 box */
  border-width: 2 0 2 2;           /* no right side */
  border-radius: 4px 0 0 4px;      /* round left corners */
  p {
    margin: 2 -1 0 -15;            /* 16 wide */
  }
}
```

## How it works

### 1. html: a bracket

At the top level of a style sheet, a lone `&` matches the root, `html`. `zoom:10` scales `html` and everything in it by 10, so the 400 × 300 frame is only 40 × 30 CSS pixels. Every length below is in CSS pixels, ten times bigger on screen.

`margin:4 16 4 12` leaves `html` 40 − 16 − 12 = 12 wide. Without a doctype, the page is in quirks mode, and `html` takes the height its margins leave: 30 − 4 − 4 = 22. On screen, it runs from x = 120 to 240 and from y = 40 to 260.

`*` gives every element `border:1px solid#FAE29E`. For `html`, `border-width:2 0 2 2` overrides the widths: 2 at the top, the bottom and the left, 0 on the right. That is a bracket open to the right, with 20px thick lines on screen.

### 2. Two round corners

`border-radius:4px 0 0 4px` rounds the top-left and bottom-left corners by 4, so 40px on screen. The inner edge of the border is rounded too, by 4 − 2 = 2: the line keeps the same thickness all around the curve.

### 3. The body: a bar

The `body` gets `margin:5 17` and the 1 wide border from `*`. Inside `html`, there are 12 − 2 = 10 of content width. 17 + 17 of margin do not fit, so the `body`'s width drops to 0. Its left margin still applies: it starts at 12 + 2 + 17 = 31, so x = 310 on screen.

In quirks mode, the `body` fills `html`'s content height minus its own margins: 22 − 2 − 2 − 5 − 5 = 8. A box that is 0 wide and 8 tall shows only its borders: the left and right ones side by side, 2 wide in all, and the top and bottom ones, 0 long. That is a 20 × 80 bar on screen, from x = 310 to 330 and y = 110 to 190.

### 4. The p: the second bar

The `<p>` is empty, so it is 0 tall: only its border counts, 1 + 1 = 2 tall. `p{margin:2-1 0-15}` is nested in `&`, so it wins over the `*` margin. The `<p>` starts 2 below the top of the `body`'s content, at y = 140 on screen.

Its −15 left margin and −1 right margin widen it past the 0 wide `body`: 0 + 15 + 1 = 16 wide, from x = 170 to 330 on screen. It is a 160 × 20 bar that ends on the right edge of the `body`'s bar: the T on its side.

## Golf notes

- `zoom:10` keeps every length at one or two digits, and `1px` borders become 10px lines.
- One `border` in `*` draws all three shapes; only `html` needs its own `border-width`.
- Boxes with no content are just their borders: the `body` is squeezed to 0 wide by its margins, the `<p>` has nothing inside.
- Negative margins make the `<p>` wider than its 0 wide parent.
- No closing braces, and `<style>` is never closed.
