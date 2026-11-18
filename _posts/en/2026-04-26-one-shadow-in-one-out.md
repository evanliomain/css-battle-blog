---
title: "One shadow in, one out: six pairs of blocks in 134 characters"
ref: 2026-04-26
permalink: /2026/04/26/one-shadow-in-one-out/
description: "How a see-through background gives the canvas its color, how six empty floating paragraphs line up in two rows, and how an inset shadow and an outer shadow leave the same square hole, in the April 26, 2026 CSS Battle target."
target: /assets/targets/2026-04-26.png
target_url: https://cssbattle.dev/play/SftZUdzTKh9Bmb4v9l3V
colors: ["#f9ddc6", "#594c94"]
player: 7R9WlalkmnObnjX3U0aolPmO0vO2
chars: 134
score: 711.53
match: 100
code: |
  <p><p><p><p><p><p><style>&{background:#E955;color:594C94;p{float:left;padding:20 30;margin:62 38-2 22;box-shadow:inset 5ch 5vw,5ch 5vw
---

The April 26 target is six purple motifs on a peach background, in two rows of three. Each motif is two rectangles, one shifted down and to the right, with a small square hole between them. VerenaBerg draws them with six empty paragraphs that float in two rows. Each one gets two shadows with the same offset: an inset one that fills the box except one corner, and an outer one that copies the box outside, except the same corner.

With **Teaching colors**, the two shadows get their own colors. **Wide view** shows where the fourth paragraph would go if it stayed on the first row.

{% include animations/2026-04-26.html lang=page.lang %}

## The code, spaced out

```css
<p><p><p><p><p><p>              /* six empty paragraphs */
<style>
& {                             /* at the top level: html */
  background: #E955;            /* #EE9955 at 1/3, over white: #f9ddc6 */
  color: 594C94;                /* no #: quirks mode */
  p {                           /* the six paragraphs */
    float: left;                /* side by side, from the left */
    padding: 20 30;             /* 60 × 40 boxes */
    margin: 62 38-2 22;         /* 120px wide each, rows 100px apart */
    box-shadow: inset 5ch 5vw,  /* the box, minus a 20 × 20 corner */
                5ch 5vw         /* a copy moved by (40, 20), outside the box */
/* the end of the code closes the two rules */
```

## How it works

### 1. Six paragraphs and a style

The first `<p>` starts body, so head stays empty. Each `<p>` closes the one before: body holds six sibling paragraphs. The `<style>` lands inside the sixth one, where it is not displayed. There is no doctype, so the page is in quirks mode: a bare number like `20` in a padding is read in px.

### 2. `&` is html

At the top level, `&` stands for the root. In my Chrome, getComputedStyle gives html the background `rgba(238, 153, 85, 0.333)`: `#E955` is `#EE9955` with an alpha of 0x55 = 85/255, one third.

html's background moves to the whole canvas, and it is see-through, so the white below shows. For red: 238 + (255 − 238) × 2/3 ≈ 249. Green gives 221 and blue 198. My render has `#f9ddc6` everywhere outside the motifs, the target's color.

### 3. A color without `#`

`color:594C94` has no `#`. In quirks mode, my Chrome still reads it: getComputedStyle gives `rgb(89, 76, 148)` to html and to the paragraphs, which inherit it. The shadows below have no color of their own, so they use this one. Without the declaration (121 characters), the shadows are black, and 24,000 pixels change.

### 4. Six floats

The nested `p{` means `& p`: every paragraph inside html. The paragraphs are empty, and a float with no content is 0 × 0. `padding:20 30` gives each one a 60 × 40 box.

`margin:62 38-2 22` is top 62, right 38, bottom −2, left 22. With `float:left`, each paragraph sits right after the previous one and takes 22 + 60 + 38 = 120px. body has its default 8px margin: it runs from x = 8 to 392, 384px wide. Three floats take 360px, so the first row's boxes are at x = 8 + 22 = 30, 150 and 270, and y = 8 + 62 = 70.

### 5. The second row

The fourth float would end at x = 8 + 4 × 120 = 488, past body's right edge at 392. It moves down, below the bottom of the first three's margin boxes: 8 + 62 + 40 − 2 = 108. Its own top margin adds 62, so its box is at y = 170, at x = 30. The fifth and sixth follow at x = 150 and 270.

getBoundingClientRect confirms the six boxes: (30, 70), (150, 70), (270, 70), (30, 170), (150, 170), (270, 170), all 60 × 40.

### 6. The inset shadow

`5ch` is five times the width of a "0". In my Chrome, the default font is Times at 16px, where a "0" is 8px wide: 5ch = 40px. `5vw` is 5% of the 400px width: 20px. getComputedStyle gives `40px 20px` for both shadows.

An inset shadow paints inside the box, except where the box moved by its offset would be. Moved by (40, 20), the box only covers the bottom-right corner of the original: 20 × 20, from x = 40 to 60 and y = 20 to 40 inside it. So the inset shadow fills the box except that square. With only the inset shadow (126 characters), each motif keeps its upper rectangle with the corner cut out, and 12,000 pixels change.

### 7. The outer shadow

The outer shadow is a copy of the box moved by (40, 20): from (70, 90) to (130, 130) for the first motif. An outer shadow is never painted under its own box. The part of the copy that overlaps the box is the same 20 × 20 square, so it stays empty there too. With only the outer shadow (120 characters), each motif keeps its lower rectangle with the corner cut out, and 12,000 pixels change.

Together, the two shadows draw two 60 × 40 rectangles that overlap on one square, and that square is the hole. Each motif has 2 × 2,400 − 2 × 400 = 4,000 purple pixels, and my render has 24,000 for the six.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&` is 1 character, `html` is 4. The `p{` rule sits inside the `&{` rule, so the first rule never needs its `}`. With `html{background:#E955;color:594C94}p{` (137 characters), the picture is the same.
- `#E955` is 5 characters and gives the canvas color through the white. With `#F9DDC6` (136 characters), the picture is the same.
- `594C94` needs no `#` in quirks mode. With `#594C94` (135 characters), the picture is the same.
- One `color` serves both shadows. With the color written in each shadow, `inset 5ch 5vw#594C94,5ch 5vw#594C94`, and no `color` (135 characters), the picture is the same.
- `5ch` and `5vw` are 3 characters each, `40px` and `20px` are 4. With `40px 20px` in both shadows (138 characters), the picture is the same.
- Two shadows draw the motif and leave the hole. With `background:#594C94;box-shadow:5ch 5vw` (139 characters), the box is filled, the hole disappears, and 2,400 pixels change.
- No space before a `-`. With `38 -2` (135 characters), the picture is the same.
- The −2 bottom margin puts the rows exactly 100px apart. With `38 0` (134 characters, the same length), the second row is 2px lower, at y = 172, and 1,440 pixels change.
- `float:left` makes the rows. Without it (123 characters), each paragraph is a block 384 − 22 − 38 = 324px wide, they stack one under the other, and 33,392 pixels change.
- The bare numbers need quirks mode. With `<!doctype html>` in front (149 characters), the motifs disappear, and 24,000 pixels change. Adding the `#` to the color (150 characters) does not bring them back. Adding `px` to the padding and the margins as well (163 characters) does: the picture is the same.
- The six `<p>` are never closed, nor are the two rules and the `<style>`. With `}}` at the end (136 characters), the picture is the same.
