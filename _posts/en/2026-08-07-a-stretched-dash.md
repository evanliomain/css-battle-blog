---
title: "A stretched dash: a slanted chain in 114 characters"
ref: 2026-08-07
permalink: /2026/08/07/a-stretched-dash/
description: "How one dashed border, shared by html and body, a scale of 5 by 0.4 and a 15° skew draw the slanted orange chain of the August 7, 2026 CSS Battle target."
target: /assets/targets/2026-08-07.png
target_url: https://cssbattle.dev/play/jXxptfsRY42J9Y775Pc6
colors: ["#ea9a52", "#a82973"]
player: gabriele19
chars: 114
score: 734.95
match: 100
code: |
  <style>*{margin:30%54;*{margin:-22 1;scale:5 .4}border:28q dashed#EA9A52}&{background:#A82973;transform:skew(15deg
---

The August 7 target is fuchsia. A slanted orange chain crosses it: four leaning blocks, joined by thin bridges. Gabriele draws it with one dashed border, given to both html and body. On html, the dashes are the four blocks. On body, the border draws three squares, and a scale of 5 by 0.4 turns the middle one into the bar that joins the blocks. A skew on html tilts everything.

Use **Teaching colors** to tell html's border from body's, and **Wide view** to see body's two other bars leave the canvas.

{% include animations/2026-08-07.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                           /* html, head, body, style */
  margin: 30%54;              /* html: 120px on top and bottom, 54px on the sides */
  * {                         /* head, body, style */
    margin: -22 1;            /* body: 238px wide, 22px above html's content */
    scale: 5 .4;              /* body: 5 times wider, 0.4 times as tall */
  }
  border: 28q dashed#EA9A52;  /* html and body: 26px dashed orange border */
}
& {                           /* html */
  background: #A82973;        /* painted on the whole canvas */
  transform: skew(15deg       /* tilts html, and body with it */
```

## How it works

### 1. Three selectors

There is no html, head or body tag in the code: Chrome adds them. `*` matches every element: html, head, body and style. The nested `*{` means `* *`: every element inside another one, so head, body and style. head and style are not displayed, so only html and body matter.

At the top level, outside any rule, `&` matches the root element, html. I checked: html gets the background and the transform, and body gets neither.

body gets two margins: `margin:30%54` from `*`, and `margin:-22 1` from the nested rule. Both rules have the same specificity, and the nested one comes later, so it wins: getComputedStyle gives `-22px 1px` for body and `120px 54px` for html.

There is no doctype, so the page is in quirks mode. A number with no unit, like `54` or `-22 1`, is in px.

### 2. The canvas

`background:#A82973` goes to html only. When the root element has a background, the browser paints it on the whole canvas, not just in html's box. So the whole canvas is fuchsia, even though html is only a 292 × 60 box. Without the background, 106,938 pixels change: the canvas turns white.

The canvas background does not move with html's transform: it stays straight and fills everything.

### 3. html: four dashes

`margin:30%54` is 30% on top and bottom and 54px on the sides. A percentage margin is a share of the containing block's width, even on top and bottom: 30% of 400 is 120. html is 400 − 2 × 54 = 292px wide, from x = 54 to 346, and starts at y = 120.

`border:28q dashed#EA9A52` gives html a 26px dashed orange border. 1q is a quarter of a millimeter: 28q = 7mm = 26.457px, and getComputedStyle gives 26px.

I rendered html's border alone, without body and without the skew. In my Chrome, each dash is 2 × 26 = 52px long:

- on top (y = 120 to 146) and at the bottom (y = 154 to 180), four dashes: x = 54, 134, 214 and 294, with 28px gaps;
- the left side (x = 54 to 80) and the right side (x = 320 to 346) are solid, full height.

In the middle, from y = 146 to 154 and x = 80 to 320, there is a 240 × 8 slot: html's content. Its 8px height comes from body (next section). html is 26 + 8 + 26 = 60px tall: getBoundingClientRect gives 292 × 60 before the skew.

### 4. body: three squares

body sits inside html's content. With `margin:-22 1`, it is 240 − 2 × 1 = 238px wide, from x = 81 to 319, and starts 22px above html's content: y = 146 − 22 = 124.

body gets the same 26px dashed border. It has no content, so its content is 0px tall: its top and bottom borders touch at y = 150. body is 26 + 0 + 26 = 52px tall.

I rendered body's border alone. Each side of 238px has three 52px dashes with 41px gaps, and the side borders fill the corners. So body draws three 52 × 52 squares: x = 81, 174 and 267, from y = 124 to 176.

body's margin box is −22 + 52 − 22 = 8px tall. That is the 8px of html's content.

### 5. Stretch and squash

`scale:5 .4` scales body around its center. body's center is (81 + 119, 124 + 26) = (200, 150). It is also html's center, because both margins are the same on each side.

Each square becomes 52 × 5 = 260px wide and 52 × 0.4 = 20.8px tall:

- the middle one goes from x = 200 + (174 − 200) × 5 = 70 to 330, and from y = 150 − 10.4 = 139.6 to 160.4. It fills html's 8px slot, and between the dashes it draws three bridges. Chrome paints them on rows 140 to 159;
- the two others go from x = −395 to −135 and from 535 to 795: off the canvas. Wide view shows them.

The middle bar ends at x = 70 and 330, inside html's solid sides (54 to 80 and 320 to 346). So the band has no hole at its ends.

Without the scale, 4,419 pixels change: the three squares stay in the middle of html.

### 6. The tilt

`transform:skew(15deg` goes to html, and body moves with it. getComputedStyle gives `matrix(1, 0, 0.267949, 1, 0, 0)`: each point moves right by tan 15° ≈ 0.268 times its distance below the center.

The center is html's center, (200, 150). The top edge, at y = 120, moves left by 30 × 0.268 ≈ 8px, and the bottom edge, at y = 180, moves right by 8px. In the target, the first block starts at x = 46 on row 120 and at x = 62 on row 179.

Without the skew, 3,051 pixels change: the blocks stand up straight.

## Golf notes

- One `border:28q dashed#EA9A52` sits in `*`, so html and body both get it. On html, it draws the blocks. On body, it draws the bar.
- `28q` is 3 characters for a 26px border. `26px` gives the same render at 115 characters. `27q` gives 25px and `29q` gives 27px: 5,228 and 3,521 pixels change. A plain `26` does not work in the `border` shorthand: Chrome drops the whole declaration, and all the orange disappears.
- `30%54` needs no space: the `%` ends the number. `120 54` gives the same render, but it needs the space: 115 characters.
- `margin:-22 1`: the `1` matters. With `-22 0`, body is 240px wide, Chrome draws four dashes on each side instead of three, a gap lands in the middle of the bar, and 3,285 pixels change.
- `&` is 1 character for html. `html{` gives the same render at 117 characters.
- `dashed#EA9A52` needs no space before the `#`. `.4` needs no zero. `skew(` is `skewX(` with one character less. Each long form gives the same render at 115 characters.
- One brace and one parenthesis are left open, and there is no `</style>`. With `)}`, the code is 116 characters; with `)}</style>`, 124. The render is the same.

## If you try it at home

In my Chrome, the official code does not give an exact copy of the target. Rows 149 and 150 are a little darker between x = 80 and 319 (for example 226, 139, 85 instead of 234, 154, 82), and 60 pixels of row 159 too. That is 540 pixels on flat areas, plus 220 on the slanted edges. The darker rows sit where body's top and bottom borders meet, around y = 150. The last frame of the animation has none of these pixels. On the CSS Battle judge, the code is a 100% match.
