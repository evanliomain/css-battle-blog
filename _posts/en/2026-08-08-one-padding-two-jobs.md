---
title: "One padding, two jobs: two zigzags in 134 characters"
ref: 2026-08-08
permalink: /2026/08/08/one-padding-two-jobs/
description: "How one padding, shared by body and four empty img, and three shadows measured in ch draw the two white and pink zigzags of the August 8, 2026 CSS Battle target."
target: /assets/targets/2026-08-08.png
target_url: https://cssbattle.dev/play/QzsqG049RL4V9DItHXt7
colors: ["#2e8da6", "#e5969e", "#FFF1F1"]
player: cubachatou
chars: 134
score: 711.53
match: 100
code: |
  <img><img><img><img><style>* *{background:#2E8DA6;color:FFF1F1;padding:20 28;*{margin:-8-24 45%80;box-shadow:7ch 0,-7ch 0,0 5ch#E5969E
---

The August 8 target is blue-green. Two identical rows cross it: three white rectangles on top, and two pink ones a step lower, between them, like a zigzag. Vegy uses four empty img that stay invisible. The same padding places body's content and gives each img its 56 × 40 size, and three shadows, exactly the size of an img, draw the white and pink rectangles around it.

Use **Teaching colors** to see the invisible img and tell the three shadows apart, and **Wide view** to see body go below the canvas.

{% include animations/2026-08-08.html lang=page.lang %}

## The code, spaced out

```css
<img><img><img><img>          /* four empty img, placed in body */
<style>
* * {                         /* head, body, the four img, style */
  background: #2E8DA6;        /* body's background: the whole canvas */
  color: FFF1F1;              /* hex with no #: the shadow color */
  padding: 20 28;             /* body: content at (36, 28); img: 56 × 40 */
  * {                         /* the four img and style */
    margin: -8-24 45%80;      /* two img per line, at x = 116 and 228 */
    box-shadow:
      7ch 0,                  /* white copy on the right: 7ch = 56px */
      -7ch 0,                 /* white copy on the left */
      0 5ch#E5969E            /* pink copy below: 5ch = 40px */
```

## How it works

### 1. Two levels of `*`

There is no html, head or body tag in the code: Chrome adds them. An `<img>` cannot go in head, so Chrome starts body there, and the four img and the style element all end up in body. I checked: the parent of style is body.

`* *` matches every element inside another one: head, body, the four img and style. That is all of them but html. The nested `*{` means `* * *`: the elements inside body (head is empty), so the four img and style. head and style are not displayed, so only body and the four img matter.

There is no doctype, so the page is in quirks mode. A number with no unit, like `20 28`, is in px. With `<!doctype html>` in front, the color, the padding and the margins are all dropped: 22,400 pixels change, and only the blue-green is left.

### 2. The canvas: body's background

The first level gives `background:#2E8DA6` to body (and to head, the img and style). html gets none: getComputedStyle gives a transparent background.

When html has no background, the browser paints body's background on the whole canvas, and not in body's own box. That is the blue-green everywhere. Without `background:#2E8DA6`, 97,600 pixels change: all the blue-green pixels turn white.

The img get the same blue-green background. It is the color of the canvas, so they are invisible. I checked: with the background on body only, the render is the same, pixel for pixel.

### 3. One padding, two jobs

`padding:20 28` also goes to body and to the img, and it does a different job in each.

body keeps its default margin of 8px. With the padding, its content starts at x = 8 + 28 = 36 and y = 8 + 20 = 28. body is 400 − 2 × 8 = 384px wide, so its content is 384 − 2 × 28 = 328px wide.

An `<img>` with no source has nothing to show: its content is 0 × 0. With the padding, each img is 2 × 28 = 56px wide and 2 × 20 = 40px tall. Without margins, the four sit side by side from x = 36: getBoundingClientRect gives x = 36, 92, 148 and 204, all at y = 28, all 56 × 40.

Without the padding, 22,400 pixels change: all the white and pink rectangles disappear.

### 4. Two img per line

`margin:-8-24 45%80` is −8px on top, −24px on the right, 45% at the bottom and 80px on the left.

Horizontally, each img takes 80 + 56 − 24 = 112px of the line:

- the first starts at 36 + 80 = 116;
- the second at 116 + 56 − 24 + 80 = 228;
- a third would need 3 × 112 = 336px, more than the 328px of body's content, so it goes to a new line.

So there are two img per line, and two lines.

A percentage margin is a share of the containing block's width, here body's content: 45% of 328 is 147.6, and getComputedStyle gives 147.594px. The first line starts at y = 28, and the −8px top margin puts the img at y = 20. A line is −8 + 40 + 147.594 = 179.594px tall, so the second row of img starts at 20 + 179.594 = 199.594. getBoundingClientRect gives (116, 20), (228, 20), (116, 199.594) and (228, 199.594). Chrome paints the second row at y = 200, exactly where the target has it.

The margins matter. Without them, 27,808 pixels change. With `0` in place of `-24`, the second img starts at 252, and 9,600 pixels change. With `0` in place of `-8`, both rows go 8px down, and 13,440 pixels change.

body is 20 + 2 × 179.594 + 20 = 399.188px tall, from y = 8 to 407.188: it goes well below the canvas, but nothing is drawn there.

### 5. A white copy on each side

`box-shadow:7ch 0,-7ch 0` gives each img two copies of its box, with no blur and no spread. In my Chrome, the font is Times 16px and 1ch, the width of "0", is 8px: getComputedStyle gives the shadows as `56px 0` and `-56px 0`. 7ch = 56px is exactly the width of an img, so one copy sits right against its right side, and the other right against its left side.

The shadows have no color, so they take the element's `color`. That is `FFF1F1`, with no `#`: in quirks mode, Chrome accepts a hex color without its `#` for `color`. With a doctype, getComputedStyle gives black. Without `color:FFF1F1`, 13,440 pixels change: the white rectangles turn black.

On each row, the first img's right copy and the second img's left copy land on the same spot, from x = 172 to 228. So each row has three white rectangles: 60 to 116, 172 to 228 and 284 to 340.

### 6. The pink copy

The third shadow, `0 5ch#E5969E`, has its own color. 5ch = 40px is exactly the height of an img, so the pink copy sits right below it: from y = 60 to 100 on the first row, and from 240 to 280 on the second.

The img themselves stay invisible. Between the white rectangles, above the pink ones, the blue-green you see is their background.

## Golf notes

- One `padding:20 28` serves two elements: it moves body's content and it sizes the img. The same rule gives the canvas its color.
- `* *` keeps html out. With `*{`, html gets the whole rule too, the layout moves, and 40,320 pixels change.
- `7ch` and `5ch` are 3 characters each. With `56px` in both places, the code is 136 characters; with `40px` for `5ch`, 135. The render is the same.
- `45%80` needs no space: the `%` ends the number. `148` gives the same render, but `148 80` needs the space: 135 characters. With `147`, 560 pixels change.
- `-8-24` needs no space either: the minus sign starts a new number. `-8 -24 45% 80` gives the same render, at 136 characters.
- `FFF1F1` saves one `#`. The `#` stays in `background:#2E8DA6`: with `background:2E8DA6`, the canvas turns white in my Chrome. In `0 5ch#E5969E`, the space before the `#` goes, but the `#` stays: without it, the whole box-shadow is dropped and 22,400 pixels change.
- An `<img>` is a free 0 × 0 box: 5 characters, no closing tag. The padding alone gives it its size.
- Two braces, `* *{` and `*{`, are left open, and there is no `</style>`. With `}}`, the code is 136 characters; with `}}</style>`, 144. The render is the same.
