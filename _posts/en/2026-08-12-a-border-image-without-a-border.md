---
title: "A border image without a border: a U in 157 characters"
ref: 2026-08-12
permalink: /2026/08/12/a-border-image-without-a-border/
description: "How a border-image on html, which has no border, cuts one radial-gradient into four quarters and keeps only the two bottom ones, to draw the arcs of the August 12, 2026 CSS Battle target."
target: /assets/targets/2026-08-12.png
target_url: https://cssbattle.dev/play/ZpafZDvdHRSYl7O2VgaW
colors: ["#394257", "#469dba", "#fae29e"]
player: gabriele19
chars: 157
score: 689.58
match: 100
code: |
  <style>&{*{border-inline:solid 53q#394257;background:#469DBA;margin:25 50 155}border-image:50%/0%45%52%radial-gradient(13%48q,#0000.93in,#FAE29E 0 278%,#0000
---

The August 12 target is a U on a blue background, split in two halves: two dark bars at the top, two pale yellow quarter rings at the bottom, and a gap in the middle. Gabriele draws the bars with the left and right borders of body. The arcs come from a border-image on html, which has no border at all. Its image is a yellow ring: the slice cuts it into four quarters, the top ones get no room, and the two bottom ones land in the bottom corners.

Use **Teaching colors** to see body, which has the color of the canvas, and the four quarters of the image.

{% include animations/2026-08-12.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                                /* & at the top level: the root, html */
  * {                              /* every element inside html: head, style, body */
    border-inline: solid 53q #394257;  /* left and right borders, 53q = 50.08px, drawn 50px */
    background: #469DBA;           /* body's background paints the canvas */
    margin: 25 50 155;             /* body: 300 × 120 at (50, 25) */
  }
  border-image:                    /* on html, which has no border */
    50%                            /* slice: four quarters of 200 × 150 */
    / 0% 45% 52%                   /* widths: top 0, left and right 180px, bottom 156px */
    radial-gradient(13% 48q,       /* ellipse 52px × 45.35px */
      #0000 .93in,                 /* transparent up to 89.28px */
      #FAE29E 0 278%,              /* yellow up to 278% × 52 = 144.56px */
      #0000                        /* then transparent again */
```

## How it works

### 1. One rule for body, one for html

There is no html, head or body tag in the code: Chrome adds them. At the top level of a style sheet, `&` stands for the root of the document: html. I checked with getComputedStyle: html has the border-image, and body has none. The nested `*{` means `& *`: every element inside html, so head, style and body. head and style are not displayed. body is the only box that gets the inner rule.

html has no background. So the canvas takes the background of body, `#469DBA`. I checked: without `background:#469DBA`, the canvas is white.

### 2. body is 300 × 120

There is no doctype, so the page is in quirks mode, and unitless numbers like `margin:25 50 155` are px. I checked with `<!doctype html>` in front: the render no longer looks like the target.

`margin:25 50 155` gives body 25px at the top, 50px on the left and right, and 155px at the bottom. Its width is 400 − 2 × 50 = 300px. In quirks mode, body also fills the height of html, minus its margins: 300 − 25 − 155 = 120px. getBoundingClientRect gives (50, 25), 300 × 120.

### 3. Two borders make the bars

`border-inline` sets the left and right borders in one property. `53q` is 53 quarter-millimeters: 1q = 96 / 101.6 = 0.945px, so 53q = 50.08px. Chrome draws borders on whole pixels: getComputedStyle gives 50px for `border-left-width`. The borders are inside body's 300px width. The bars run from x = 50 to 100 and from 300 to 350, and from y = 25 to 145.

### 4. html has a border image, but no border

The `border-image` is on html. html has no border: getComputedStyle gives `none` for its border style. A border image does not need one here, because its widths are percentages. A percentage in `border-image-width` is a share of the box, not of the border width. So Chrome paints the image anyway.

html is 400 × 300 in quirks mode, and the image is a radial-gradient, so it takes that size: 400 × 300.

### 5. The image is a yellow ring

`radial-gradient(13%48q, …)` is an ellipse centered at (200, 150). Its size is 13% of 400 = 52px across, and 48q = 45.35px down. The stops are measured along the horizontal radius:

- `#0000 .93in`: transparent up to 0.93 × 96 = 89.28px. `#0000` is transparent black.
- `#FAE29E 0 278%`: a stop with two positions. The `0` comes before 89.28px, so it is moved up to 89.28px, and the yellow starts with a hard edge. It goes on to 278% × 52 = 144.56px.
- `#0000`: no position, so it is put at 144.56px too. The yellow stops with a hard edge.

Down, everything is multiplied by 45.35 / 52. The ring runs from 89.28 to 144.56px across, and from 77.87 to 126.08px down. I rendered the gradient alone on a 400 × 300 box. On the middle row, the left part of the ring runs from x = 55 to 111 (200 − 144.56 = 55.44, 200 − 89.28 = 110.72). On the middle column, the top part runs from y = 24 to 72 (150 − 126.08 = 23.92, 150 − 77.87 = 72.13).

### 6. The slice cuts the image in four

`border-image:50%/0%45%52%…` gives the slice, then the widths. The slice `50%` cuts the image 50% from each edge: 200px from the left and right, 150px from the top and bottom. The four corners are the four quarters of the ring, 200 × 150 each. The edges and the middle are 0 wide or 0 tall, so they hold nothing.

The widths `0% 45% 52%` are for the top, the left and right, and the bottom. Each corner of the image goes into a corner of html's box:

- The top corners are 45% × 400 = 180px wide and 0% tall. The two top quarters are squashed to nothing.
- The bottom corners are 180px wide and 52% × 300 = 156px tall: from (0, 144) to (180, 300), and from (220, 144) to (400, 300).

I checked this with a four-color conic-gradient in place of the ring. Only two colors show: the bottom left quarter in (0, 144)–(180, 300), and the bottom right quarter in (220, 144)–(400, 300). Between them, from x = 180 to 220, is the bottom edge. It is empty: that is the gap of the U.

### 7. The quarters become almost round

Each bottom quarter, 200 × 150, is stretched into 180 × 156: × 0.9 across and × 1.04 down. The center of the ring lands at (180, 144) on the left and (220, 144) on the right. The yellow now runs from 80.35 to 130.10px across, and from 80.98 to 131.13px down: almost a circle. The ellipse starts flatter than a circle, 45.35 / 52 = 0.87, and the stretch makes it almost round: 0.87 × 1.04 / 0.9 = 1.01.

On the left arc, the yellow goes from x = 49.90 to 99.65 at its top, and down to y = 224.98 and 275.13 at x = 180. In my render without body, the yellow covers x = 50 to 99 on the row y = 144, and y = 225 to 274 in the column x = 179.

### 8. body is painted on top

The yellow starts at y = 144, and the bars end at y = 145. body is a child of html, so it is painted over html's border image. The bars cover the row y = 144, and the yellow shows from y = 145, right under them.

## Golf notes

- `&{` is the root in one character. With `html{` in its place, the code is 160 characters, and the render is the same, pixel for pixel.
- The nested `*{` reaches body without naming it. head and style get the rule too, but they are not displayed.
- body's `background` is written once and paints the whole canvas, because html has none.
- html needs no border for its border-image: the widths are percentages of the box.
- `border-inline` draws the left and right borders in one property.
- `53q` is 3 characters, and the border is drawn 50px wide.
- `#0000` is transparent in 5 characters. With `transparent` twice instead, the code is 169 characters, and the render is the same.
- `#FAE29E 0 278%` starts the yellow with a hard edge: the `0` is moved up to the previous stop. The last `#0000` needs no position.
- With the ellipse `13%48q`, the quarters come out almost round after the stretch.
- No spaces are needed in `53q#394257`, `#0000.93in`, `13%48q` or `50%/0%45%52%radial-gradient`.
- One brace, `&{`, and one parenthesis, `radial-gradient(`, are left open, and there is no `</style>`. With `)}`, the code is 159 characters; with `)}</style>`, 167. The render is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the bars, the straight edges of the arcs and the gap land on the same pixels as in the target. My render has only the three flat colors: each pixel on the curved edges is either yellow or blue. The target has 337 blended pixels along the arcs. In all, 364 pixels differ from the target, and all of them are within 1.5px of a curved edge. The largest difference is 180 levels, at (299, 154), on the inner edge of the right arc: my render is blue there, (70, 157, 186), and the target is yellow, (250, 226, 158). On the CSS Battle judge, the code is a 100% match.
