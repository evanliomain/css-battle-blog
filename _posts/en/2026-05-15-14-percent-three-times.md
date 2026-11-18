---
title: "14% three times: three yellow U's in 103 characters"
ref: 2026-05-15
permalink: /2026/05/15/14-percent-three-times/
description: "How one margin of 10 14%, given to html, body and three p's, shrinks each level to center three yellow U's in the May 15, 2026 CSS Battle target."
target: /assets/targets/2026-05-15.png
target_url: https://cssbattle.dev/play/M3qD0cAD3qJNSn30dud9
colors: ["#1f1446", "#ffca00"]
player: HPNVC89hQJbe3ny0jUyBkVT8qKD3
chars: 103
score: 749.87
match: 100
code: |
  <p><p><p><style>*{margin:10 14%;background:#1F1446;p{height:50;border:solid#ffca00;border-width:0 35 30
---

The May 15 target shows three yellow U's on a dark indigo background, stacked in a column, centered, 10px apart. Anarchimedes Apostolakis draws each U with the border of an empty p: no top border, thick sides, a thinner bottom. One rule, `margin:10 14%`, goes to html, body and the p's. A margin in % is a share of the parent's width, so each level is 28% narrower than the one above it, and the p's end up about 149.3 wide, centered.

**Teaching colors** show html, body and the content of the p's, which are all the same indigo as the canvas.

{% include animations/2026-05-15.html lang=page.lang %}

## The code, spaced out

```css
<p><p><p>                  /* three p's in body; the style goes into the third */
<style>
* {                        /* html, head, body, the three p's, style */
  margin: 10 14%;          /* 14% of the parent's width, at each level */
  background: #1F1446;     /* html: the whole canvas; the others: the same indigo */
  p {                      /* the three p's */
    height: 50;
    border: solid #ffca00; /* style and color; no width, so medium (3px) */
    border-width: 0 35 30; /* top 0, left and right 35, bottom 30 */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `10` in a margin, a height or a border width is read in px.

The first `<p>` opens body. A p cannot hold another p, so each new `<p>` closes the one before. body holds three empty p's, and the `<style>` goes into the third one.

`*` matches every element: html, head, body, the three p's and style. head and style are not displayed. The `p{` nested inside it is `* p`: the three p's. The rules are never closed: the end of the code closes them.

### 2. One margin, three widths

A margin in % is a share of the width of the containing block, whatever the side. Here, the containing block of each element is its parent.

- html's containing block is the 400 × 300 canvas. 14% of 400 = 56, so html is 400 − 2 × 56 = 288 wide, from x = 56.
- body sits in html: 14% of 288 = 40.32. body is 288 − 2 × 40.32 ≈ 207.4 wide, from x ≈ 96.3. My Chrome stores these values in 1/64 px: 40.3125 and 207.375.
- The p's sit in body: 14% of 207.375 ≈ 29.03. Each p is about 149.3 wide (149.3125 in my Chrome), from x ≈ 125.34 to 274.66.

Each level keeps 72% of the width above it: 400 × 0.72 × 0.72 × 0.72 ≈ 149.3. The margins are the same on both sides, so every box stays centered. My Chrome paints the p's on whole pixels, from x = 125 to 275: 150 pixels wide, with no blurred edge.

### 3. One background for the canvas

html's background, `#1F1446`, paints the whole canvas, not only html's box. body and the p's get the same background. They paint the same indigo over it, so they do not show.

### 4. The vertical margins collapse

html is the root: its top margin of 10 never collapses, and its content starts at y = 10.

body has no border and no padding on top. Its top margin, 10, touches the first p's top margin, 10. They collapse into one margin of 10, so the first p starts at y = 10 + 10 = 20. Between two p's, the bottom margin of one and the top margin of the next collapse too: the p's are 10px apart.

### 5. border, then border-width

With `height:50` alone, each p is a 149.3 × 50 box.

`border:solid#ffca00` sets the style and the color of all four sides. It gives no width, so each side gets the default width, medium: 3px in my Chrome.

`border-width:0 35 30` comes next and sets the widths. With three values, the first is the top, the second goes to the left and right, and the third is the bottom. The p keeps its width: the 35px sides take room from its content. The content is about 79.3 wide: my Chrome paints the hole 80 pixels wide, from x = 160 to 240. Each p is 50 + 30 = 80 tall: a U with a 50px deep hole.

With the 10px gaps, the three U's sit at y = 20, 110 and 200, and the last one ends at 280.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One margin for three levels. The percentage is worked out again at each level, so `14%` centers html, body and the p's, and gives the p's their width. With a px margin, the p's need their own: `*{margin:10 0;…;p{margin:10 125;…` (115 characters) gives the same picture. A single px value does not work: with `margin:10 56` (102 characters), each level loses the same 112px. body is 176 wide and leaves the p's 64, less than their two 35px sides. Each U turns into a full 70 × 80 yellow block, and 28,200 pixels change.
- `*` reaches html, so the canvas color needs no selector of its own. With `}}html{background:#1F1446` at the end instead (109 characters), the picture is the same.
- `border` before `border-width`. The `border` shorthand sets the widths too. With `border-width:0 35 30;border:solid#ffca00` (103 characters), the widths go back to medium: each p is a 3px yellow frame, 56 tall, and 22,560 pixels change.
- `border` takes one width for all four sides, so the three widths go in `border-width`. Its three-value form writes 35 once for both sides. With `border-width:0 35 30 35` (106 characters), the picture is the same.
- Bare numbers in the margin, the height and `border-width`, thanks to quirks mode. With `10px`, `50px` and `0 35px 30px` (111 characters), the picture is the same. The `border` shorthand does not take them: with `border:35 solid#ffca00;border-top:0;border-bottom-width:30` (121 characters), my Chrome drops the `border` declaration, all the yellow is gone, and 24,000 pixels change.
- `<p><p><p>` gives three boxes in 9 characters: each p closes the one before. With `<p></p><p></p><p></p>` (115 characters), the picture is the same.
- No space before the `#`: `solid#ffca00` ends on its own. With `solid #ffca00` (104 characters), the picture is the same.
- The code ends inside the p rule, and the end of the code closes both open rules. With `}}` at the end (105 characters), the picture is the same.
