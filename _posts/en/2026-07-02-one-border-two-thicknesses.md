---
title: "One border, two thicknesses: a framed menu in 130 characters"
ref: 2026-07-02
permalink: /2026/07/02/one-border-two-thicknesses/
description: "How one 32q border makes a 30px frame on html and, zoomed to 40%, three 12px bars, copied left, middle and right by three shadows, in the July 2, 2026 CSS Battle target."
target: /assets/targets/2026-07-02.png
target_url: https://cssbattle.dev/play/nXGWhRanLkXsKymyC5xU
colors: ["#fade8b", "#000"]
player: koda_pig
chars: 130
score: 715.87
match: 100
code: |
  <p><p><p><style>&,p{background:#FADE8B;border:32q solid;margin:60 115;p{margin:34 80-9 5;zoom:.4;box-shadow:370q -5q,79q 0,-291q 0
---

The July 2 target shows a black frame on a pale yellow background, with three black bars inside it and three more on each side. koda_pig gives html and three p the same rule: a yellow background, a `32q` border and a margin. On html, the border is the 30px frame. On the p, `zoom:.4` shrinks the same border to 12px: each empty p is a black bar. Three shadows copy each bar to the middle, the left and the right.

Turn on **Teaching colors** to see which bar is a p and which one is a shadow.

{% include animations/2026-07-02.html lang=page.lang %}

## The code, spaced out

```css
<p><p><p>                  /* three p, siblings in body */
<style>
&,p {                      /* html (the root) and the p */
  background: #FADE8B;     /* on html, it goes to the canvas */
  border: 32q solid;       /* 30.24px, drawn at 30px */
  margin: 60 115;          /* html: 170 × 180 */
  p {                      /* the p, inside body */
    margin: 34 80-9 5;     /* × 0.4: 13.6 32 −3.6 2 */
    zoom: .4;              /* border 12px: a 60 × 24 bar */
    box-shadow:
      370q -5q,            /* right bars: +139.84, −1.89 */
      79q 0,               /* the rest of the middle bar: +29.86 */
      -291q 0              /* left bars: −109.98 */
```

## How it works

### 1. The page

There is no doctype: the page is in quirks mode, and a number with no unit means px in `margin`. A p cannot hold another p, so each `<p>` closes the one before: the three p are siblings in body. The `<style>` is never closed. It ends up inside the third p, where it is not displayed.

The rule starts with `&` at the top level. There, `&` means the root of the document: html. So `&,p` selects html and the three p.

### 2. html makes the frame

html's background goes to the canvas: the whole canvas is `#FADE8B`.

`margin:60 115` leaves html 400 − 230 = 170px wide. In quirks mode, html also fills the height of the page, minus its margins: 300 − 120 = 180px. getBoundingClientRect gives (115, 60), 170 × 180.

`32q` is 32 quarter millimeters, 8mm: 30.24px. My Chrome draws the border at 30px, and getComputedStyle says 30px too. The black frame runs from (115, 60) to (285, 240), and its yellow inside from (145, 90) to (255, 210).

### 3. zoom:.4 shrinks the same border

The p get everything from `&,p`: the background, the 30px border and `margin:60 115`. The nested `p` selects the p that sit inside html. It is more specific and comes later, so its margin wins.

`zoom:.4` multiplies every length of the p by 0.4. The border becomes 12px. The margins `34 80-9 5` become 13.6px at the top, 32px on the right, −3.6px at the bottom and 2px on the left. `80-9` is read as two numbers, 80 and −9.

The p is empty, so its content has no height. It is only its two borders: 24px tall, all black. Its yellow background never shows.

body keeps its 8px margin: it runs from x = 153 to 247, 94px wide. The p takes that width minus 2px on the left and 32px on the right: 60px, from x = 155 to 215.

### 4. Three p, 10px apart

Vertical margins collapse. The first p's top margin, 13.6px, meets body's 8px one: only the larger stays. getBoundingClientRect puts the first p at y = 90 + 13.6 = 103.59, and Chrome draws it from y = 104 to 128.

Between two p, the bottom margin (−3.6px) and the top margin (13.6px) collapse into 13.6 − 3.6 = 10px. The bars are drawn at y = 104, 138 and 172.

### 5. Three shadows, three columns

A shadow with no blur is a copy of the box. Here, each copy is a 60 × 24 black bar. The offsets are zoomed like the rest: 1q is 0.945px, times 0.4.

- `79q 0`: 74.65px, so 29.86px. The copy runs from x = 184.86 to 244.86 and overlaps the p. Together they make the middle bar: 89.86px wide, from x = 155.
- `-291q 0`: −109.98px. The copy runs from x = 45.02 to 105.02: the left column.
- `370q -5q`: 139.84px to the right and 1.89px up. The copy runs from x = 294.84 to 354.84: the right column. Its bars start at y = 102.11, 136.11 and 170.11, a bit higher than the others.

So the p width does two jobs: it is the width of the side bars, and the middle bar is the p plus its first shadow.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- `&` is html in 1 character. `html,p` gives the same picture in 133.
- One rule for two jobs. The background, the border and the margin are written once, for html and the p. The nested rule only has to replace the p's margin.
- One zoom shrinks everything at once: the border, the margins and the three shadow offsets. Without it, the exact lengths `margin:13.6 32-3.6 2;border-width:12;box-shadow:139.84px -1.89px,29.86px 0,-109.98px 0` give the same picture in 158 characters.
- `32q` is a 30px border in 3 characters. `30px` gives the same picture in 131. A number with no unit does not work in the `border` shorthand: with `border:30 solid` (129 characters), the whole declaration is dropped. There is no frame and no bar, and 32,772 pixels change.
- The `-5q` lifts the right column. With `370q 0` (128 characters), the right bars move down to the level of the others, and 732 pixels change.
- No space in `80-9`: the minus sign starts a new number. `80 -9` gives the same picture in 131.
- Nothing is closed. `}}</style>` at the end gives 140 characters, for the same picture.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 573 pixels, with the same rule as in the golf notes. They are all on edges drawn by the shadows: 72 in the column x = 244, at the right end of the middle bars, and 501 on the edges of the right bars. The zoomed shadow offsets are not whole pixels (29.86, 139.84, −1.89), so these edges are blended in my render. The target has sharp edges there. With offsets that are whole pixels after the zoom, `350px -5px,75px 0,-275px 0` (134 characters), my render matches the target: 0 pixels differ. The CSS Battle judge gives the official code a 100% match.
