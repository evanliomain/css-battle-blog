---
title: "Only the corners: twelve squares in 113 characters"
lang: en
ref: 2026-09-02
permalink: /2026/09/02/only-the-corners/
description: "How a single-color border-image, which only paints the corners, draws the September 2, 2026 CSS Battle target on three nested boxes: twelve cream squares."
target: /assets/targets/2026-09-02.png
target_url: https://cssbattle.dev/play/AJ9pZiNcFlllq1qpGyeW
colors: ["#a84a4b", "#f5e3b5"]
player: eguiluz
chars: 113
score: 736.25
match: 100
code: |
  <p><img><style>&{background:#a84a4b;margin:17 67;p{zoom:2}*{border:25px solid;border-image:conic-gradient(#f5e3b5
---

The September 2 target is cream on red: a big square in the middle, four medium squares at its corners, and four small squares further out, like a pattern of nested corners. David Eguiluz's solution draws three nested boxes, the `body`, a `<p>` and an empty `<img>`, each with the same border. Its `border-image` is a plain cream image, and by default it is only painted in the four corners. The `<p>` and the `<img>` are zoomed twice, so their corners are bigger, and the `<img>`'s corners touch: the big square.

Use **Teaching colors** to see which box draws which corners.

{% include animations/2026-09-02.html lang=page.lang %}

## The code, spaced out

```css
<p><img>
<style>
& {                                  /* html */
  background: #a84a4b;
  margin: 17 67;
  p { zoom: 2 }                      /* the p and its img, twice as big */
  * {                                /* everything inside html */
    border: 25px solid;
    border-image: conic-gradient(#f5e3b5);   /* one color: a plain image */
  }
}
```

## How it works

### 1. html and the body

At the top level of a style sheet, a lone `&` matches the root, `html`. Its red background is used for the whole canvas, and `margin:17 67` makes it a 266 × 266 box at (67, 17). The `body` keeps its default 8px margin: it runs from (75, 25) to (325, 275), 250 × 250.

### 2. A border-image: four corners

The nested `*` matches everything inside `html`: the `body`, the `<p>`, the `<img>` (and the `<head>` and `<style>`, which are not shown). Each gets `border:25px solid`, and a `border-image` that replaces the drawing of that border.

`conic-gradient(#f5e3b5` has a single color: it is a plain cream image, the shortest way to write an image of one color. A `border-image` is cut into nine pieces by its slice, which is 100% by default. With a 100% slice, each corner piece is the whole image, and the side pieces and the middle are empty. So only the four 25 × 25 corners of the border are painted. The `body`'s are the four small squares, at (75, 25), (300, 25), (75, 250) and (300, 250).

### 3. The zoomed p: four medium squares

`p{zoom:2}` makes the `<p>` twice as big: its 25px border shows as 50px. A `<p>` has a default top margin of 1em, but in quirks mode that margin is dropped at the top of the `body`: the `<p>` starts right inside the `body`'s border, at (100, 50). It fills the `body`'s content, 200 wide, and it is 200 tall: 50 of border on each side, and 100 for the line that holds the `<img>`. Its corners are four 50px squares.

### 4. The img: a solid square

The `<img>` is inside the `<p>`, so it is zoomed twice too: its border is 50px. It has no source, so its content is 0 × 0, and the whole box is its border: 0 + 50 + 50 = 100 square, at (150, 100). Its four 50px corners touch each other: a solid 100 × 100 cream square in the centre.

## Golf notes

- One border rule draws all twelve squares: the default 100% slice only paints corners.
- A one-color `conic-gradient` is the shortest image of a plain color.
- `zoom:2` on the `<p>` doubles its corners and those of the `<img>` inside it.
- An empty `<img>` is all border, so its four corners fill it.
- Quirks mode drops the `<p>`'s default margin at the top of the `body`, which puts it right where it is needed.
- No closing braces, and `<style>` is never closed.
