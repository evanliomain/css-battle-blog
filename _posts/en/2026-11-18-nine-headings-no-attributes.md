---
title: "Nine headings, no attributes: a 3×3 grid in 169 characters"
lang: en
ref: 2026-11-18
permalink: /2026/11/18/nine-headings-no-attributes/
description: "How nine empty headings, float:left, a border with nothing inside, border-radius:1ch and rotate:4rad draw the November 18, 2026 CSS Battle target: a blue 3×3 grid of pills, a square and two diamonds on pale yellow."
target: /assets/targets/2026-11-18.png
target_url: https://cssbattle.dev/play/OuZGRWZ169z3th35sN48
colors: ["#dc26", "#4760b6"]
player: evanliomain
chars: 169
score: 679.9
match: 100
code: |
  <h1><h4><h1><h1><h5><h1><h1><h4><h1><style>h4{rotate:4rad}h1{width:50}&{background:#dc26;*{margin:75;*{float:left;border:5vh solid#4760b6;border-radius:1ch;margin:0 4%30
---

The November 18 target is pale yellow, with a blue 3×3 grid in the middle. On the left and on the right, six pills. In the middle column, a small rounded square, with a diamond above it and one below. I draw the nine pieces with nine heading tags and not one attribute: the tags themselves choose which piece gets a width, which radius, and which one turns.

The **teaching colors** show the `h1`, `h4` and `h5` tags apart.

{% include animations/2026-11-18.html lang=page.lang %}

## The code, spaced out

```css
<h1><h4><h1><h1><h5><h1><h1><h4><h1>  <!-- nine sibling headings, all empty -->
<style>
h4 { rotate: 4rad }        /* 229.18°, a diamond for a square */
h1 { width: 50 }           /* the bars: 15 + 50 + 15 = 80 */
& {                        /* the root, html */
  background: #dc26;       /* #ddcc22 at 40%, on the white canvas */
  * {                      /* everything inside html */
    margin: 75;            /* the body: 250 × 150 at (75, 75) */
    * {                    /* everything inside that: the headings */
      float: left;
      border: 5vh solid #4760b6;   /* 15px around an empty box: 30 × 30 */
      border-radius: 1ch;          /* half the font size: 16, 8, 6.64 */
      margin: 0 4% 30;             /* 10 on each side, 30 below */
    }
```

## How it works

### 1. A see-through yellow

At the top level of a style sheet, `&` is the root: `html`. `#dc26` is a 4-digit hex color: `#ddcc22` with an alpha of `66`, which is 40%. `html`'s background goes to the canvas, and the canvas sits on a white page. 40% of `#ddcc22` over white gives `#f1eba7`. The target is `#f2eaa8`: one level away on each channel.

### 2. The body

The `*` nested in `&` targets every element inside `html`. In quirks mode, `margin:75` works without a unit. The `body` gets 75 on each side, so it is 400 − 150 = 250 wide, from x = 75. In quirks mode, the `body` also fills the frame's height minus its margins: 300 − 150 = 150, from y = 75. The headings get this `margin:75` too, but the next rule has the same specificity and comes later, so its margin wins.

### 3. Nine headings, nine squares

A new heading tag closes the open one. `<h1><h4><h1><h1><h5>…` gives nine siblings in the `body`, with no closing tags. The `<style>` lands in the last `h1`, but it is not displayed.

The headings are empty: their content is 0 × 0, and `h4` and `h5` have no width. `border:5vh` is 15px on each side, around nothing: a 30 × 30 square. `float:left` puts them side by side, as boxes with a real size.

### 4. `h1{width:50}`: the bars

In quirks mode, `50` means 50px. Only the `h1`s get it: 15 + 50 + 15 = 80 wide, 30 tall. The `h4`s and the `h5` stay 30 × 30, so the tags decide which piece is a bar.

### 5. `margin:0 4%30`: three rows of 250

A margin in % is a share of the parent block's width, even on the left and right. 4% of 250 = 10. A row is 10 + 80 + 10, then 10 + 30 + 10, then 10 + 80 + 10: 250, exactly the `body`'s width. The fourth heading no longer fits and starts a new row. With 30 below each heading, a row takes 30 + 30 = 60: the rows land at y = 75, 135 and 195. The bars go from x = 85 to 165 and from 235 to 315, and the middle pieces from 185 to 215.

### 6. `border-radius:1ch`: three radii

With this font, `1ch` is half the font size, and each heading tag has its own default size:

- `h1`, 32px: radius 16. On a bar 30 tall, 16 + 16 is too much, so the browser scales all the radii down to 15: a pill.
- `h4`, 16px: radius 8.
- `h5`, 13.28px: radius 6.64.

One value in the code, three radii on the canvas.

### 7. `h4{rotate:4rad}`: the diamonds

`rotate` turns the box around its center after the layout: the floats around it don't move. 4 radians is 229.18°. A square looks the same every 90°, so it is the same as 49.18°: 4.18° more than a true diamond. I measured how much that costs. The corners are rounded, with their arc centers 9.9px from the middle: turning 4.18° moves them by 0.72px at most. Next to `45deg`, only a few dozen edge pixels change, and the match is still 100%.

## Golf notes

- No attribute and no class: the tag names select the pieces. `h1`, `h4` and `h5` already have three font sizes, so `1ch` gives three radii.
- A new heading closes the open one, so the nine tags need no closing tags.
- `border:5vh` around an empty box draws a 30px square: no `height`, no `background`.
- `margin:0 4%30` sets the gaps and the row height in one value. With three pieces per row, the % adds up to exactly 250.
- `4rad` is one character shorter than `45deg`, and close enough on a rounded square.
- `#dc26`: 4 characters for the background, thanks to the white under the canvas.
- `&{…;*{…;*{…`: nesting reaches the body, then the headings, without writing `body`.
- `solid#4760b6`, `4%30`: no space before `#` or after `%`. The rule is never closed.
