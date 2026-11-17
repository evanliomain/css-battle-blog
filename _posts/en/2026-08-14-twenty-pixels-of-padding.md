---
title: "Twenty pixels of padding: three cut-out shapes in 133 characters"
ref: 2026-08-14
permalink: /2026/08/14/twenty-pixels-of-padding/
description: "How floats, one 20px padding and a −4% margin line up the ring, square and ring of the August 14, 2026 CSS Battle target."
target: /assets/targets/2026-08-14.png
target_url: https://cssbattle.dev/play/tX0iC11qNcPozRZ9qhRO
colors: ["#6d1477", "#f5e3b5"]
player: beo
chars: 133
score: 712.6
match: 100
code: |
  <p a><a><p><a a><p a><a><style>[a]{border-radius:50%}*{background:#6D1477;padding:20;float:left}p{background:#F5E3B5;margin:62-4%0 22
---

The August 14 target shows three beige shapes in a row on a purple background: a disc with a square hole, a square with a round hole, and another disc with a square hole. Beo builds them from three floated `p` elements, each holding one floated `a`. A single `padding:20` gives every size, and a right margin of −4% is just enough to fit the three shapes on one row.

Use **Teaching colors** to see body and the `a` elements, which are purple like the background, and **Wide view** to see where the third shape goes without the negative margin.

{% include animations/2026-08-14.html lang=page.lang %}

## The code, spaced out

```html
<p a><a>                  <!-- a p with the attribute a, holding an a -->
<p><a a>                  <!-- this <p> closes the first p -->
<p a><a>
<style>
[a] {                     /* the 1st and 3rd p, the 2nd a */
  border-radius: 50%;     /* circles */
}
* {                       /* every element, html included */
  background: #6D1477;    /* the canvas, and the holes */
  padding: 20;            /* 20px: a is 40 × 40, p is 80 × 80 */
  float: left;            /* side by side, each p wraps its a */
}
p {
  background: #F5E3B5;    /* the beige shapes */
  margin: 62 -4% 0 22     /* −4% of 304px = −12.16px on the right */
```

## How it works

### 1. One rule for every element

`*` targets every element: html, head, body, the `p` and `a` elements, and style. head and style are not displayed. The background of html paints the whole canvas `#6D1477`.

There is no doctype, so the page is in quirks mode, and unitless numbers like `padding:20` are px. I checked with `<!doctype html>` in front: the unitless values are dropped, every `p` is 0 × 0, and the canvas is all purple.

html gets 20px of padding. body keeps its default 8px margin, since no rule changes it, and also gets 20px of padding. I measured body at (28, 28), 344 × 182 with its padding. Its content starts at 20 + 8 + 20 = 48 on both axes, and is 344 − 2 × 20 = 304px wide.

### 2. Six tags, none closed

`<p a><a><p><a a><p a><a>` has no closing tag. A `<p>` tag closes the `p` that is still open, and the `a` inside it goes with it. I read the DOM in Chrome: three `p`, each with one `a`. The first and third `p` have the attribute `a`, and so does the second `a`. The `<style>` element ends up inside the last `a`. It still works, and it is not displayed.

### 3. Floats give the sizes

An `a` is an inline element. `float:left` turns it into a block, so its padding counts in both directions. It is empty: 20 + 20 = 40px on each side.

A floated `p` shrinks to fit its content and contains its floated `a`: 20 + 40 + 20 = 80px on each side, with the `a` 20px in from each edge. I measured all of them with getBoundingClientRect: 80 × 80 and 40 × 40.

I checked both floats:

- with `a{float:none}` added, the `a` elements stay inline, and the `p` elements are 80 × 58;
- with `p{float:none}` added, the `p` elements no longer contain their `a`: they are 40px tall, only their padding, and stack at y = 110, 212 and 314.

### 4. The margins place the first shape

`margin:62-4%0 22` reads as four values: 62px on top, −4% on the right, 0 at the bottom, 22px on the left. The first `p` lands at 48 + 22 = 70 across and 48 + 62 = 110 down. That is where the first disc starts in the target.

### 5. A −4% margin makes room

A margin in % is a share of the width of the parent: here, the 304px of content in body. 4% of 304 is 12.16px. getComputedStyle gives −12.1562px, Chrome's nearest step of 1/64px.

Each `p` then takes 22 + 80 − 12.16 = 89.84px. getBoundingClientRect puts the three `p` at x = 70, 159.84 and 249.69. Chrome paints the boxes on whole pixels: in my render, the middle square starts at pixel 160, and with a whole −12px margin instead the render is the same, pixel for pixel. The shapes end up at 70, 160 and 250, 10px apart.

Without the negative margin, each `p` takes 22 + 80 = 102px, and three take 306px. That is 2px more than the 304px of content in body. I checked with `margin:62 0 0 22`: the third `p` wraps to a new row, at (70, 252), partly below the canvas.

### 6. Round the `[a]`

`[a]` targets every element that has the attribute `a`, whatever its tag. `border-radius:50%` turns the first and third `p` into discs of radius 40, and the second `a` into a disc of radius 20. The `p` elements are beige, and the `a` elements stay purple like the background: they look like holes.

## Golf notes

- No closing tag at all: each `<p>` closes the previous one.
- A bare attribute `a` costs 2 characters per tag, and the selector `[a]` rounds two `p` and one `a` at once.
- One `*` rule sets the background of html, which is the canvas, and of the `a` elements, which are the holes. Only `p` needs a second color.
- `padding:20` on everything gives every size: 40px for the `a` elements, 80px for the `p` elements, and part of the offset of the first shape. The number has no unit, as quirks mode allows.
- `float:left` also applies to html, head, body and style, since it is in the `*` rule. I checked body with `float:none`: the render is the same, pixel for pixel.
- `-4%0` needs no space between `%` and `0`. With a −12px margin, the code needs a space, `62-12 0 22`: 134 characters, and the same render.
- One brace is left open, `p{`, and there is no `</style>`. With `}`, the code is 134 characters; with `}</style>`, 142. The render is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the squares land on the same pixels as in the target. But 710 pixels differ from my render, and 593 of them by more than 8 levels. All of them are within 1.5px of the edge of a circle: the two discs and the round hole. The largest difference is 158 levels, at (213, 164), on the edge of the round hole: my render is (124, 43, 126) there, and the target is (228, 201, 173). Measured by how much beige each pixel holds, the center of each disc is about 0.3px further left and 0.3px further up in the target than in my render. On the CSS Battle judge, the code is a 100% match.
