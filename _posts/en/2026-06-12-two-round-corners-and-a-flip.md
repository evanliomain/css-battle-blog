---
title: "Two round corners and a flip: a leafy K in 131 characters"
ref: 2026-06-12
permalink: /2026/06/12/two-round-corners-and-a-flip/
description: "How margins place a yellow bar and two paragraphs, how one oversized radius on two opposite corners turns each paragraph into a leaf, and how scale:1-1 flips the second one, in the June 12, 2026 CSS Battle target."
target: /assets/targets/2026-06-12.png
target_url: https://cssbattle.dev/play/M2KEnIkEKWN35WaC6pzf
colors: ["#317080", "#f5bb60"]
player: eguiluz
chars: 131
score: 714.77
match: 100
code: |
  <p><p><style>&{background:#267e;margin:-10 207 0 97;*{background:#f5bb60;*{padding:50;border-radius:2in 0;margin:40 90;+*{scale:1-1
---

The June 12 target shows a yellow K on a blue-green background: a tall bar on the left, and two pointed leaves on its right, one at the top and one at the bottom. David Eguiluz makes the bar with body and each leaf with a paragraph. A big radius on two opposite corners turns a square into a leaf, and `scale:1-1` turns the second leaf upside down.

Use **Wide view** to see html's box, which starts above the canvas, and **Teaching colors** to tell body from the two paragraphs.

{% include animations/2026-06-12.html lang=page.lang %}

## The code, spaced out

```css
<p><p>
<style>
& {                          /* html */
  background: #267e;         /* #226677 at 93%: #317080 on the page */
  margin: -10 207 0 97;      /* 96px wide, top at y = −10 */
  * {                        /* body, the two p (head and style are hidden) */
    background: #f5bb60;
    * {                      /* the two p */
      padding: 50;           /* 100 × 100 squares */
      border-radius: 2in 0;  /* 192px, scaled down to 100px: a leaf */
      margin: 40 90;         /* x = 195, y = 30 and 170 */
      + * {                  /* the second p */
        scale: 1-1           /* scale(1, −1): upside down */
```

## How it works

### 1. The elements

`<p><p>` opens two paragraphs. A new `<p>` closes the one before, so they are siblings. The browser adds html, head and body around them. `<style>` comes while the second p is still open, so it ends up inside it. The page is html > head + body > p + p > style.

At the top level of a style sheet, `&` stands for the root of the page: html, and only html.

### 2. The background

`#267e` is a short hex color with an alpha digit: `#226677`, and `ee` for the alpha, 238 / 255 = 93.3% opaque. html is the root element, so its background covers the whole canvas, and Chrome paints it over white. 34 × 0.933 + 255 × 0.067 = 48.8, so red is 49, `31` in hex. Green and blue give `70` and `80`. On the page, the background is `#317080`.

### 3. html's box

CSS Battle pages have no doctype, so they are in quirks mode, and a bare number like `207` is read in px. `margin:-10 207 0 97` leaves html 400 − 97 − 207 = 96px wide, from x = 97 to 193. Its top is at y = −10, 10px above the canvas. In my render, its box is 96 × 320 at (97, −10). html paints nothing in that box: its background is already on the whole page. The box only places body.

### 4. The bar: body

The nested `*` selects every element inside html: head, body, the two p and style. They all get `#f5bb60`. head and style stay hidden, so the yellow shows on body and on the two p.

body keeps its default 8px margin. Inside html's 96px, it is 96 − 16 = 80px wide, from x = 105 to 185: the bar.

Its top comes from the first p. body has no padding and no border, so its top margin and the first p's top margin collapse into one: the bigger one wins, 40px. body starts at −10 + 40 = 30. Its height is the content: 100 + 40 + 100 = 240, down to y = 270. The second p's bottom margin goes out through body's bottom in the same way.

html has its own background, so body's background is not moved to the page. body paints its yellow in its own box: the 80 × 240 bar.

### 5. Two squares

The next `*` selects the elements inside an element inside html: the two p, and style, hidden. `padding:50` gives each p 50px on every side: a 100 × 100 square.

`margin:40 90` puts 40px above and below, 90px on the left and the right. The width left for the content is 80 − 90 − 90 = −100. A width cannot be negative, so it is 0, and the right margin is ignored. The left margin moves the squares to x = 105 + 90 = 195, 10px after the bar. They stick out of body on the right, and body does not cut them.

Vertically, the 40px margins collapse between the two squares too: the first one is at y = 30 to 130, the second one at y = 170 to 270.

### 6. A leaf

`border-radius:2in 0` gives 2in = 192px to the top left and bottom right corners, and 0 to the two others. 192px does not fit in a 100px side. When two radii on one side add up to more than the side, the browser scales all the radii down by the same factor: here 100 / 192. Both radii become 100px.

A 100px quarter circle in a 100px square goes from one corner to the opposite one. The top left arc and the bottom right arc both join the bottom left corner to the top right corner. Between them: a leaf, from (195, 130) to (295, 30).

### 7. The second leaf, upside down

`+*` inside the p rule means: the element right after a p. Only the second p is right after a p. `scale:1-1` reads as two numbers, `1` and `-1`: the minus sign starts a new number, so no space is needed. `scale(1, −1)` flips the second p top to bottom, around its center. Its box stays at (195, 170), but its leaf now goes from the top left corner to the bottom right one, like the lower arm of a K.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `#267e` is 5 characters. The color it shows, `#317080`, gives the same picture in 133 characters. Without the alpha digit, `#267` (130 characters) is the darker `#226677`: the whole background changes color, and 89,386 pixels change.
- `&` selects html only. With `*` instead (same length), body gets html's margins too: its width drops to 0, the bar is gone, the leaves move to x = 284 and up to y = 20, and 42,524 pixels change.
- The `-10` top margin lets one 40px margin do two jobs: 30px from the top of the canvas, and 40px between the leaves. With `0` (129 characters), everything is 10px lower, and 6,173 pixels change.
- Nothing is written for body's size: its default 8px margin makes it 16px narrower than html. Nothing is written for the width of the p either: the margins push it down to 0.
- Bare numbers are read in px in quirks mode. With `px` on every length (143 characters), the picture is the same.
- Any radius of 100px or more gives the same leaf, because it is scaled down to 100px. `100px 0` gives the same picture in 133 characters, and `100%0` in the same 131. `1in 0` is 96px, too small: the arcs stop 4px before the sharp corners, and 1,276 pixels change.
- `scale:1-1` needs no space. `scale:1 -1` gives the same picture in 132 characters.
- Without `+*{scale:1-1` (119 characters), the bottom leaf points the same way as the top one, and 5,382 pixels change.
- The closing tags are left out. `<p></p><p>` gives the same picture in 135 characters. The end of the code closes the open blocks.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 606 pixels, with the same rule as in the golf notes. All of them are on the edges of the two leaves: 316 on the top one, 290 on the bottom one. The bar and the flat colors are the same. The CSS Battle judge gives the code a 100% match.
