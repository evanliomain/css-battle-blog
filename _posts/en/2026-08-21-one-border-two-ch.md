---
title: "One border, two ch: a green H in 161 characters"
ref: 2026-08-21
permalink: /2026/08/21/one-border-two-ch/
description: "How one border-block declaration in ch draws a green band on html and two rounded shapes on a 70px-wide body, and how a box reflection copies the body to the left, for the August 21, 2026 CSS Battle target."
target: /assets/targets/2026-08-21.png
target_url: https://cssbattle.dev/play/EWDBaLnr7crtoNmx2ibO
colors: ["#3157b4", "#84be8d"]
player: h_blierzt
chars: 161
score: 686.23
match: 100
code: |
  <style>*{background:#3157B4;margin:110 30;border-block:solid 5ch#84BE8D;*{margin:-125-0-125 270;border-radius:1in 0 0 1in;-webkit-box-reflect:left 50vw;font:36q'
---

The August 21 target is a green H on a blue background: a wide rectangle in the middle and four rounded shapes at the corners. H_Bliertz draws it with two boxes and one `border-block` declaration. On `html`, 5ch is 40px, and the two borders make the middle band. On the body, a bigger font makes 5ch 85px, and the borders make the two shapes on the right. A `-webkit-box-reflect` copies the body to the left, mirrored.

Use **Teaching colors** to tell the two borders of `html`, the body and its reflection apart.

{% include animations/2026-08-21.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                 /* html, head, style, body */
  background: #3157B4;
  margin: 110 30;                   /* no unit: px in quirks mode */
  border-block: solid 5ch #84BE8D;  /* top and bottom borders, 5ch of each element's font */
  * {                               /* head, style, body */
    margin: -125 -0 -125 270;       /* -0 is 0 */
    border-radius: 1in 0 0 1in;     /* 96px on the two left corners, used as 70px */
    -webkit-box-reflect: left 50vw; /* a mirror copy, 200px to the left */
    font: 36q '';                   /* 34.02px, empty family: 5ch = 85px */
  }
}
```

## How it works

### 1. Two boxes

There is no doctype, so the page is in quirks mode. The browser builds `html`, `head`, the `style` (inside `head`) and `body`. `*` matches all four, and the nested `*` matches `head`, `style` and `body`, the elements inside another one. `head` and `style` are not displayed. Two boxes are left: `html`, with the outer rule, and `body`, with both rules. The nested `margin` comes later, so it wins in the body. The body keeps the `background` and the `border-block` of the outer rule.

### 2. html: a 340 × 80 box

`margin:110 30` has no unit, and quirks mode reads it as px: 110px at the top and bottom, 30px on the left and right. In quirks mode, `html` fills the 400 × 300 frame minus its margins: 340 × 80, from (30, 110) to (370, 190).

Its background is blue. The background of the root element is painted on the whole canvas, so the whole frame is blue.

### 3. 5ch on html: the middle band

`html` has no `font`, so it keeps the default: 16px Times. In my render, 1ch is 8px there, so 5ch is 40px. `border-block` sets the top and bottom borders: 40px each, green.

The box is 80px tall and the two borders take 80px: its content is 0px tall. The top border goes from y = 110 to 150, the bottom one from 150 to 190. Together they make a green band, 340px wide and 80px tall, from x = 30 to 370.

### 4. body: 70 × 250

The body sits in the content box of `html`: 340px wide and 0px tall, at y = 150. `margin:-125-0-125 270` gives −125px at the top, 0 on the right, −125px at the bottom and 270px on the left. Its width is what is left: 340 − 270 − 0 = 70px, from x = 300 to 370.

In quirks mode, the body fills the height of its container minus its margins. Here: 0 − (−125) − (−125) = 250px. It starts 125px above y = 150: it goes from y = 25 to 275. It has the blue background of the outer rule.

### 5. 5ch on the body: 85px

The body gets the same `border-block:solid 5ch`, but `ch` is measured in its own font. `font:36q'` sets the size to 36 quarter millimeters: 36 × 0.945 = 34.02px. The `font` shorthand needs a family. Here it is `'`: a string that is never closed, so the end of the code closes it, and the family is the empty string `''`. No font has that name, and Chrome keeps Times. I checked without the quote (`font:36q`): the declaration is dropped, the body stays at 16px and its borders are 40px.

At 34.02px, 1ch measures 17px in my render, and the computed border width is 85px. The top border goes from y = 25 to 110, the bottom one from 190 to 275. Between them, from 110 to 190, the body's blue background covers the band of `html` from x = 300 to 370. I checked by giving the body a red background: the middle of the body turns red.

### 6. border-radius: 1in becomes 70px

`border-radius:1in 0 0 1in` rounds the top-left and bottom-left corners: 1in = 96px. The box is only 70px wide, and at the top, 96 + 0 = 96 is more than 70. When two radii on one side add up to more than the side, the browser scales all the radii by the same factor: 70/96. Every radius becomes 70px. On the left side, 70 + 70 = 140 fits in 250. I checked with `70px` in place of `1in`: the render is the same, pixel for pixel.

The inner edge of a corner gets the outer radius minus the border width. The left border is 0px, so 70px across, but the top border is 85px, so 70 − 85: nothing, a square corner. The curve is only on the outer edge: from (300, 95) to (370, 25). Below y = 95, the left edge goes straight down to the bottom of the border, at y = 110. The bottom corner is the same, upside down. Outside the curves, the body is not painted, and the blue of the canvas shows.

### 7. -webkit-box-reflect: the left half

`-webkit-box-reflect:left 50vw` paints a mirror copy of the body, flipped left to right, on its left. The second value is the gap between the body and the copy: 50vw is half of 400px, 200px. The body starts at x = 300, so the copy ends at x = 100 and starts at 30.

The copy has everything the body paints: the two green shapes, now rounded toward the right, and the blue middle, which covers the band of `html` from x = 30 to 100. I checked with `200px` in place of `50vw`: the render is the same. What is left of the band is the middle rectangle, from x = 100 to 300 and y = 110 to 190.

## Golf notes

- One `border-block` declaration works on two elements, and `ch` gives it two sizes: 40px on `html`, 85px on the body.
- `font:36q'` exists only to make the body's `ch` bigger. The unclosed quote is a whole family, and it costs one character.
- `background` in the outer rule colors the canvas (through `html`) and the body. The body needs it to hide the band.
- The reflection draws the left half for free, and also hides the band on the left.
- `1in` is 3 characters for a radius that only has to be 70px or more: the browser scales it down to 70px.
- `50vw` is 200px in 4 characters.
- `-125-0-125 270`: the minus signs separate the values, so only one space is needed. `-0` is 0; `-125 0-125 270` renders the same and has the same length.
- No space before `#`: `5ch#84BE8D`.
- Quirks mode reads `110 30`, `-125` and `270` as px.
- `<style>` and the two braces are never closed.

## If you try it at home

In my Chrome (version 157 when this was written), the straight edges and the flat colors are exactly where the target has them. 516 pixels differ from the target, and they are all on the four curved edges. 351 of them differ by more than 8 levels, and the largest difference is 72 levels. The biggest gaps are where the curves meet the straight part of their edge. Under the top-right curve, the column at x = 300 is fully green from y = 86 in the target, and only from y = 95 in my render. On the CSS Battle judge, the code is a 100% match.
