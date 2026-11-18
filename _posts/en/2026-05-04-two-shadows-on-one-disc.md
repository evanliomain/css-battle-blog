---
title: "Two shadows on one disc: a pinwheel in 119 characters"
ref: 2026-05-04
permalink: /2026/05/04/two-shadows-on-one-disc/
description: "How a 1Q radial-gradient on html paints a hard-edged disc of radius 100, and how an empty body and its two box-shadows cover two of its quarters, in the May 4, 2026 CSS Battle target."
target: /assets/targets/2026-05-04.png
target_url: https://cssbattle.dev/play/AHCJGXarSjHdWGQsM7pc
colors: ["#4c4c6b", "#ebf6ef", "#4a9a86"]
player: emohdaziz
chars: 119
score: 728.67
match: 100
code: |
  .<style>&{*{margin:150 50%10 100;color:4A9A86;box-shadow:25vw 0,0-35vw}background:radial-gradient(1Q,#4c4c6b,25vw,#6B82
---

The May 4 target is a pinwheel on a very pale green background: two green rectangles, one at the top left and one at the bottom right, and two dark quarter discs in the other two corners of the square they share. Mohamed Ali paints one dark disc on the whole canvas with html's background. Then body, an empty box, and its two green shadows cover two quarters of that disc.

With **Teaching colors**, html's box, body's box and the two shadows get their own colors.

{% include animations/2026-05-04.html lang=page.lang %}

## The code, spaced out

```css
.                            /* text: body starts here */
<style>
& {                          /* at the top level, & is the root: html */
  * {                        /* the elements inside html: head, style, body */
    margin: 150 50%10 100;   /* body: 100 × 140 at (100, 150) */
    color: 4A9A86;           /* no # needed in quirks mode */
    box-shadow:
      25vw 0,                /* a copy 100px to the right */
      0-35vw;                /* a copy 140px up */
  }
  background: radial-gradient(
    1Q,                      /* a circle of radius 0.945px */
    #4c4c6b,                 /* dark from 0 */
    25vw,                    /* a hint at 100px */
    #6B82                    /* #66bb8822, moved up to 100px */
  /* the end of the code closes the gradient and the two rules */
```

## How it works

### 1. A dot of text

The code starts with `.`, before `<style>`. A dot is text, and text belongs in body: the parser opens body for it, and the `<style>` that comes next goes in body too. Without the dot, my Chrome puts the `<style>` in head.

The dot matters for the layout. With it, my render gives html a 400 × 300 box. In a test copy without the dot (118 characters), my Chrome makes html 385 × 440, with a vertical scrollbar, and the disc moves down: 13,555 pixels change.

### 2. html and its background

`&` at the top level of a style sheet stands for the root, html. html is the root, so its background is painted on the whole canvas, and placed on html's box: 400 × 300 at (0, 0).

For the background, my Chrome gives this computed value:

`radial-gradient(1q, rgb(76, 76, 107), 25vw, rgba(102, 187, 136, 0.133))`

### 3. A disc of radius 100

A radial gradient with a single length as its size is a circle of that radius, centered on the box: here at (200, 150). 1Q is a quarter of a millimeter: 96 / 25.4 / 4 = 0.945px.

The list after it reads like this:

- `#4c4c6b` with no position: the first color starts at 0.
- `25vw` alone, after a comma: a hint, the point where the blend between the two colors around it is half done. vw is 1% of the 400px width: 25vw = 100px.
- `#6B82` with no position: the last color sits at 100% of the ray, 0.945px. A stop cannot go back before an earlier stop or hint, so it moves up to 100px.

The hint and the last stop are now both at 100px. The hint sits at the very end of the blend, so the dark stays dark up to 100px: a hard edge. Past the last stop, the last color goes on to the edges of the canvas.

`#6B82` is the short form of `#66bb8822`: the green `#66bb88` with an alpha of 0x22 = 34/255, 13.3% opacity. Over the white page, that is 255 − 153 × 34/255 = 234.6, 255 − 68 × 34/255 = 245.9 and 255 − 119 × 34/255 = 239.1. My render paints these pale pixels with four close values: (235, 246, 239), `#ebf6ef`, is the most common, and the others are one level away.

### 4. `*` inside `&`, and body's margins

`*{…}` is nested in `&{…}`, so it targets the elements inside html: head, style and body. My Chrome gives head and style the margin and the shadows too, but they are not displayed. Only body shows.

CSS Battle pages have no doctype, so they are in quirks mode. Lengths without a unit are px there, and body fills html, minus its margins. `margin:150 50%10 100` gives four values: 150 on top, 50% on the right, 10 at the bottom, 100 on the left. A horizontal margin in % is a share of the width of the parent: 50% of 400 = 200.

So body is 400 − 100 − 200 = 100 wide and 300 − 150 − 10 = 140 high. My render puts it at (100, 150).

body has no background. Through it, html's background shows: the bottom-left quarter of the disc, from y = 150 to 250, then the pale green from 250 to 290.

### 5. Two shadows

`color:4A9A86` sets body's color. In quirks mode, a color can be written without its `#`. A shadow with no color uses the element's color, so both shadows are green, `#4a9a86`.

- `25vw 0` moves a copy of body 100px to the right: 100 × 140 at (200, 150). It covers the bottom-right quarter of the disc.
- `0-35vw` is `0` then `-35vw`: a copy moved 140px up, at (100, 10). It covers the top-left quarter.

A shadow is never painted under its own box, so body still shows its quarter. The top-right quarter is not covered by anything. The two green rectangles and the two dark quarters touch at (200, 150).

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One gradient draws both quarters, and one shadow list draws both rectangles. The empty body does the rest: it shows the disc through it.
- `1Q` is 2 characters: Q is the only length unit with a single letter. The size only has to be a length: with `1px` (120 characters) or `25vw` (121 characters), the picture is the same. With `0` (118 characters), my Chrome paints no disc, and 15,713 pixels change. Without a size (116 characters), the gradient is an ellipse that reaches the farthest corner, the last stop stays far out, the dark blends into the green, and 90,727 pixels change.
- The hint `25vw` pushes the last stop out to 100px. Written as a stop, `#4c4c6b 25vw,#6B82`, it is the same length and gives the same picture. Without it, `radial-gradient(1Q,#4c4c6b,#6B82` (114 characters), the dark ends at 0.945px, and 15,713 pixels change.
- `25vw` and `35vw` are 4 characters for 100px and 140px. With `100px` in the gradient (120 characters), or `100px 0,0-140px` in the shadows (121 characters), the picture is the same.
- `#6B82` is 5 characters for the pale green the canvas shows. With `#ebf6ef` (7 characters, 121 in all) or `#66bb8822` (9 characters, 123 in all), the picture is the same.
- `50%10` needs no space: a number can follow `%` directly. With `margin:150 200 10 100` (120 characters), the picture is the same. In the same way, `0-35vw` needs no space before the minus: with `0 -35vw` (120 characters), the picture is the same.
- The lengths need no unit and the color no `#`, in quirks mode. With `150px 50%10px 100px` (125 characters) or `#4A9A86` (120 characters), the picture is the same.
- `&{` is three characters shorter than `html{`: with `html{` (122 characters), the picture is the same. Nesting `*` inside it keeps html out of the margin and the shadows. With `*{…}` at the top level and `&{background:…}` after it (119 characters), html gets them too, and 76,273 pixels change.
- The code ends inside the gradient and two rules: the end of the code closes them. With `)}` at the end (121 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same rectangles and quarter discs at the same place as the target. 1,502 pixels differ by more than 8 levels, all within 9px of an edge of the shapes. The target has ripples along the edges, with colors that are in neither shape: at (99, 100), next to the top-left rectangle, it has (239, 241, 240), and the pale background around it is (235, 246, 240). The largest difference is 147 levels, at (101, 167), on the edge of the bottom-left quarter: pale in my render, dark in the target.

Seven of these pixels come from the dot. My render draws it in green at (101..103, 162..164), inside the bottom-left quarter; the target is dark there. In a test copy where every element inside html gets `font-size:0` (131 characters), these 7 pixels turn dark and no other pixel changes. The flat colors are within one level of the target: (74, 154, 134) for the green in my render, (75, 154, 133) in the target, and (76, 76, 107) for the dark, (76, 77, 107) in the target. The CSS Battle judge gives the official code a 100% match.
