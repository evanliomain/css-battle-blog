---
title: "One outline, four bars: a scooped cross in 146 characters"
ref: 2026-08-15
permalink: /2026/08/15/one-outline-four-bars/
description: "How one shadow, one dashed outline and a thick border with scooped corners draw the cross and the four bars of the August 15, 2026 CSS Battle target."
target: /assets/targets/2026-08-15.png
target_url: https://cssbattle.dev/play/qdiV2eKiBihdqV4XlG9i
colors: ["#d9bb61", "#fff", "#394257"]
player: h_blierzt
chars: 146
score: 699.48
match: 100
code: |
  <style>&{margin:65 115;box-shadow:0 0 0 5ch#D9BB61;outline:dashed 53q#FFF;*{margin:10;border-radius:5ch;corner-shape:scoop;border:solid 74q#394257
---

The August 15 target shows a dark blue cross on white, with four round bites taken out of its corners. Four mustard bars sit around it: one above, one below, one on each side. H_Bliertz draws the bars with one shadow on html and a white dashed outline that hides the corners of that shadow. The cross is body: a border so thick that it fills the box, with `corner-shape:scoop` carving the corners.

Use **Teaching colors** to see the outline dashes and the empty boxes of html and body.

{% include animations/2026-08-15.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                                /* the root: html */
  margin: 65 115;                  /* html is 170 × 170, from (115, 65) */
  box-shadow: 0 0 0 5ch #D9BB61;   /* 40px gold spread all around */
  outline: dashed 53q #FFF;        /* 50px white dashes over the corners */
  * {                              /* everything in html: body shows */
    margin: 10;                    /* body is 150 × 150, from (125, 75) */
    border-radius: 5ch;            /* 40px corners */
    corner-shape: scoop;           /* carved inward */
    border: solid 74q #394257      /* 69px: the border fills the box */
```

## How it works

### 1. Two boxes in quirks mode

`&` at the top level of a style sheet means the root element: html. The `*` nested inside it means every element inside html. head and style are not displayed, so only body shows.

There is no doctype, so the page is in quirks mode. Numbers with no unit, like `margin:65 115` and `margin:10`, are read as px. In quirks mode, html is also stretched to the height of the canvas, and body to the height of html. I measured with getBoundingClientRect:

- html: 400 − 2 × 115 = 170px wide, 300 − 2 × 65 = 170px tall, from (115, 65).
- body: 170 − 2 × 10 = 150px on each side, from (125, 75).

I checked with `<!doctype html>` in front: the unitless margins are dropped, html is 400px wide and 154px tall, and the picture falls apart.

html has no background, so the canvas stays white.

### 2. A gold frame from a shadow

`box-shadow:0 0 0 5ch#D9BB61` has no offset and no blur, only a spread. 1ch is the width of the 0 in the default font: 8px. So 5ch is 40px; getComputedStyle gives a 40px spread.

The shadow is the html box grown by 40px on each side: 250 × 250, from (75, 25) to (325, 275). An outer shadow is not painted under its own box. What shows is a gold frame, 40px wide, around a white 170 × 170 square.

### 3. A dashed outline cuts the frame into four bars

The outline goes around the border box of html. `53q`: 1q is a quarter of a millimeter, 0.945px, so 53q is 50.08px. getComputedStyle gives 50px. The outline covers 65 to 335 on both axes: a 50px band, 270px long on each side. The shadow band, from 75 to 115, lies inside it.

A dashed line needs dashes and gaps. On each 270px side, Chrome puts a dash on both corners, 100px long, and leaves a 70px gap in the middle: 100 + 70 + 100 = 270. I measured this with a red outline. With other widths, the dashes were also twice the width: 90px for 45px, 98px for 49px, 102px for 51px, 110px for 55px.

The outline is painted above the shadow. The white dashes hide the corners of the frame, and the shadow shows only through the four gaps: four gold bars, 70 × 40, at the middle of each side. White dashes on the white canvas are invisible.

### 4. A border that fills the box

`border:solid 74q#394257`: 74q is 69.92px, and getComputedStyle gives 69px. body is 150px wide, so the border leaves 150 − 2 × 69 = 12px in the middle. With no radius, that is what I see: a dark square with a 12 × 12 white hole in the center.

### 5. Scooped corners

`border-radius:5ch` gives 40px corners. `corner-shape:scoop` turns the curve inward: each corner is cut by a quarter circle of 40px centered on the corner of the box. So the corners bite into the cross: from (125, 75) to (165, 115) at the top left, and the same at the other three corners.

### 6. The inner arcs close the hole

The inner edge of the border follows the scooped corners. Around each corner, it becomes an arc of radius 40 + 69 = 109px, centered on that corner. Everything closer to a corner than 109px is border.

The center of body, (200, 150), is 75 × √2 = 106.07px from each corner. That is less than 109, so the center is border, and so is every point of the 12px hole. The hole is gone and the cross is solid.

I checked this model by rendering:

- With a 60px border, the arcs are 100px. A star shaped hole shows in the middle. On the middle row, it runs from pixel 191 to pixel 208, the two end pixels partly covered: the 100px circles stop at x = 191.14 and 208.86.
- With the 69px border and smaller radii, the hole shrinks as the radius grows. With a 34px radius, it spans x = 196 to 203; with 36px, four faint pixels are left; with 37px, nothing shows. The arcs reach the center at 106.07 − 69 = 37.07px.

## Golf notes

- `&{…*{…` targets html and everything in it with two characters of selector. With `html{…}body{…`, the code is 153 characters and renders the same.
- Unitless numbers are px in quirks mode: `65 115` and `10`.
- `5ch` is 40px in 3 characters, used twice. With `40px` in both places, the code is 148 characters.
- `53q` is a 50px outline in 3 characters. The width matters: with 49px, the bars are 72px wide, with 51px, 68px wide, and 256 flat pixels are wrong.
- `74q` is a 69px border in 3 characters. The border only has to be thick enough for the arcs to close the hole, and thin enough to fit: I checked 67, 68, 70 and 75px with no wrong flat pixel. With 60px, a hole shows; with 80px, the shape is wrong.
- The border does the work of a background. `background:#394257` would be 5 characters shorter, but html has no background, so the background of body paints the whole canvas: I checked, the canvas is all dark blue.
- A `#` color can follow a unit with no space: `5ch#D9BB61`, `53q#FFF`, `74q#394257`. With spaces, the code is 149 characters.
- Two braces are left open, `&{` and `*{`, and there is no `</style>`. With `}}`, the code is 148 characters; with `}}</style>`, 156. It renders the same.

## If you try it at home

In my Chrome (version 157 when this was written), the bars, the straight edges and the solid center land on the same pixels as in the target. But 412 pixels differ from my render, and 206 of them by more than 8 levels. All of these are on the four scooped corners, spread along the whole curves. In 186 of them, my render is darker than the target. The largest difference is 184 levels, at (239, 206), on the bottom right curve: my render is (71, 79, 99) there, and the target is white. On the CSS Battle judge, the code is a 100% match.
