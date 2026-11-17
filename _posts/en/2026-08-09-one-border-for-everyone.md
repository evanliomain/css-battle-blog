---
title: "One border for everyone: a film strip in 135 characters"
ref: 2026-08-09
permalink: /2026/08/09/one-border-for-everyone/
description: "How one border rule, shared by html, body and two empty img through three levels of *, draws the bands, the bars and the white rectangles of the August 9, 2026 CSS Battle target."
target: /assets/targets/2026-08-09.png
target_url: https://cssbattle.dev/play/QTeWMIkTXmaFuhHHvNZ8
colors: ["#594c94", "#9D92C8", "#FFF"]
player: levito
chars: 135
score: 710.47
match: 100
code: |
  <img><img><style>*{margin:50 90;border:11q solid;color:9D92C8;*{margin:-10-130;background:#594C94;*{scale:4.5 6;margin:80 100;color:FFF
---

The August 9 target is purple. Two lavender bands cross it near the top and the bottom, two short lavender bars join them, and two white rectangles sit on the bars: it looks like a film strip. Veit Lehmann gives every element the same border. html draws a frame, body is pulled wider than the canvas so its border makes the long bands, and two empty img become the white rectangles.

Use **Wide view** to see body's sides off the canvas, and **Teaching colors** to tell html's border from body's.

{% include animations/2026-08-09.html lang=page.lang %}

## The code, spaced out

```css
<img><img>                  /* two empty img, placed in body */
<style>
* {                         /* html, head, body, the two img, style */
  margin: 50 90;            /* html: 220 × 200 at (90, 50) */
  border: 11q solid;        /* 11q = 10.39px, drawn 10px wide */
  color: 9D92C8;            /* hex with no #: the border color */
  * {                       /* head, body, the two img, style */
    margin: -10-130;        /* body: 460 × 200 at (−30, 50) */
    background: #594C94;    /* body's background: the whole canvas */
    * {                     /* the two img and style */
      scale: 4.5 6;         /* 20 × 20 → 90 × 120 */
      margin: 80 100;       /* squares at (80, 140) and (300, 140) */
      color: FFF;           /* white borders */
```

## How it works

### 1. Three levels of `*`

There is no html, head or body tag in the code: Chrome adds them. An `<img>` cannot go in head, so Chrome starts body there, and the two img and the style element all end up in body. I checked: the parent of style is body.

`*` matches every element: html, head, body, the two img and style. The nested `*{` means `* *`: every element inside another one, so all of them but html. The third one means `* * *`: the elements inside body (head is empty), so the two img and style. head and style are not displayed, so only html, body and the two img show anything.

There is no doctype, so the page is in quirks mode. A number with no unit, like `50 90`, is in px. With `<!doctype html>` in front, 48,988 pixels change.

### 2. html: the frame

`margin:50 90` leaves html 400 − 2 × 90 = 220px wide. In quirks mode, html also fills the height of the page minus its margins: 300 − 2 × 50 = 200px. getBoundingClientRect gives (90, 50), 220 × 200.

`border:11q solid`: 1q is 96 / 101.6 = 0.945px, so 11q = 10.39px. Chrome rounds a border width down to whole pixels: getComputedStyle gives `10px`. I checked: with `10px` or `10.9px` in place of `11q`, the render is the same, pixel for pixel.

The border has no color, so it takes the element's `color`. That is `9D92C8`, with no `#`. In quirks mode, Chrome accepts a hex color without its `#` for `color`. In standards mode, it drops the declaration: I checked with a doctype, the color stays black.

So html draws a 10px lavender frame from (90, 50) to (310, 250).

### 3. body: the long bands

body gets the same border, and `margin:-10-130`. Without margins, body would be the inside of html: (100, 60), 200 × 180. The negative margins push it out by 130px on each side: 200 + 2 × 130 = 460px wide, from x = −30 to 430. In quirks mode, body fills the height of html minus its own margins: 180 + 2 × 10 = 200px, from y = 50 to 250. getBoundingClientRect gives (−30, 50), 460 × 200.

body's top border is at y = 50 to 60, exactly where html's top border is, and its bottom border at y = 240 to 250, exactly on html's bottom border. They run from x = −30 to 430, so across the whole canvas. body's left and right borders, at x = −30 and 420, are off the canvas. Without body's margin, 30,600 pixels change.

html's left and right borders stay visible between the bands: they are the two short bars, at x = 90 and 300.

### 4. The purple: body's background on the canvas

The second level also gives `background:#594C94` to body, head, the img and style. html gets none: getComputedStyle gives a transparent background.

When html has no background, the browser paints body's background on the whole canvas instead, and not in body's own box. That is the purple everywhere, even outside body. Without `background:#594C94`, 89,200 pixels change: all the purple pixels turn white.

The img get the same background, but their content is empty and their border is opaque, so it never shows.

### 5. Two white squares

An `<img>` with no source has nothing to show: getComputedStyle gives a width and a height of 0px. With its 10px border, each img is a 20 × 20 square. The third level sets `color:FFF`, so the border is white.

img is inline, so the two squares sit side by side on body's line, with no space between them (there is none between the tags). body's inside starts at x = −30 + 10 = −20, and `margin:80 100` puts 100px on each side of each square:

- the first square starts at −20 + 100 = 80;
- the second at 80 + 20 + 100 + 100 = 300.

Vertically, 80 + 20 + 80 = 180, the height of body's inside. The line starts at y = 60, so the squares start at 60 + 80 = 140. Without scale, getBoundingClientRect gives (80, 140) and (300, 140), both 20 × 20. With `margin:0 100`, 28,800 pixels change.

### 6. scale: 4.5 6

`scale:4.5 6` grows each square from its center, (90, 150) and (310, 150): 20 × 4.5 = 90 wide and 20 × 6 = 120 tall. getBoundingClientRect gives (45, 90) and (265, 90), both 90 × 120.

The rectangles go down to y = 210 and cover the middle of html's side borders. Only 30px of each bar shows above them, from y = 60 to 90, and 30px below, from 210 to 240. Without `scale:4.5 6`, 20,800 pixels change.

## Golf notes

- One `border:11q solid` serves everyone: html's frame, body's bands and the img squares. The border color follows `color`, so `color:FFF` at the third level is enough to make the squares white.
- `11q` is 3 characters for a 10px border. `10px` gives the same render, at 136 characters.
- `9D92C8` and `FFF` save one `#` each. The `#` stays in `background:#594C94`: with `background:594C94`, the canvas turns white in my Chrome. `background-color:594C94` works, but it is 5 characters longer.
- `-10-130` needs no space: the minus sign starts a new number. `-10 -130` gives the same render.
- An `<img>` is a free 0 × 0 box: 5 characters, no closing tag. The border alone gives it its size.
- `scale` takes two factors, so one property turns a 20 × 20 square into a 90 × 120 rectangle.
- Three braces, all `*{`, are left open, and there is no `</style>`. With `}}}`, the code is 138 characters; with `}}}</style>`, 146. The render is the same.
