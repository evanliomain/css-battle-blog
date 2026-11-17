---
title: "A transparent bottom border: a bookmark in 124 characters"
ref: 2026-07-13
permalink: /2026/07/13/a-transparent-bottom-border/
description: "How html's 20px top border makes the dark bar, and how body, 150 × 240 with two 75px yellow side borders and a transparent 60px bottom border, gets its notch from the diagonal corner joints, in the July 13, 2026 CSS Battle target."
target: /assets/targets/2026-07-13.png
target_url: https://cssbattle.dev/play/tpgHg0s1msgLUqaMEbAQ
colors: ["#fef8bb", "#b46c31", "#331d1d"]
player: levito
chars: 124
score: 722.68
match: 100
code: |
  <style>*{margin:30-20;border:5vw solid;border-color:331D1D#FEF8BB#0000;*{margin:-5%125;border-width:0 75 60;background:#A51D
---

The July 13 target shows a pale yellow bookmark on a brownish orange background. It hangs over a dark brown bar near the top, and its bottom end has a triangular notch. Veit Lehmann draws it with two boxes and nothing but borders. The bar is the top border of html. The bookmark is body: two yellow side borders, and a transparent bottom border that cuts the notch.

Use **Wide view** to see html's yellow side borders off canvas, and **Teaching colors** to tell body's three borders apart.

{% include animations/2026-07-13.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                 /* html, and every other element */
  margin: 30-20;                    /* html: 30 top and bottom, -20 on the sides */
  border: 5vw solid;                /* 5vw = 20px */
  border-color: 331D1D#FEF8BB#0000; /* top, sides, bottom */
  * {                               /* every element inside another one: body */
    margin: -5%125;                 /* -20px top and bottom, 125px on the sides */
    border-width: 0 75 60;          /* top 0, sides 75, bottom 60 */
    background: #A51D               /* goes to the whole canvas */
```

## How it works

### 1. body's background fills the canvas

html has no background. In that case, the browser paints body's background on the whole canvas, and body itself paints none. `#A51D` is `#aa5511` with an alpha of `D`, 221/255, so about 87% opaque. Over the white canvas, it gives a brownish orange: #b56c31 in my Chrome, #b46c31 in the target. Without the `background` (107 characters), the canvas stays white: 83,590 pixels change.

### 2. html: the dark bar

There is no doctype: the page is in quirks mode. The first `*` selects every element. For html, it is the only rule.

`margin:30-20` reads as two values: 30 on top and bottom, −20 on the sides. html is 440 wide, from x = −20 to 420. In quirks mode, html takes the height of the canvas minus its margins: 300 − 60 = 240. getBoundingClientRect gives (−20, 30), 440 × 240.

`5vw` is 5% of the 400px canvas width: 20px. `border-color` gets three values: top, left and right, bottom. The top border, `331D1D`, is the dark bar from y = 30 to 50. Quirks mode accepts this hex color without its `#`. The side borders are yellow, but they sit at x = −20 to 0 and 400 to 420, off canvas. The bottom border, `#0000`, is transparent. html's content box is 400 × 200, from (0, 50).

### 3. body: 150 × 240

The nested `*` is `* *`: any element inside another one, so everything except html. body is the only one displayed. Both rules have the same weight, and the nested one comes later, so it wins for `margin` and `border-width`. body keeps the outer rule's `solid` style and its colors.

A percentage margin is a share of the containing block's width, even on top: 5% of html's 400px content is 20px. So body gets −20 on top and bottom, and 125 on each side. It is 400 − 250 = 150 wide, from x = 125. In quirks mode, body stretches to the height of html's content, 200, minus its own margins: 200 + 40 = 240. With −20 on top, it starts at y = 30, over html's top border, and ends at y = 270. With `-9%` instead (same length), body is 272 tall, from y = 14 to 286: getBoundingClientRect confirms both.

### 4. Two side borders, no content

`border-width:0 75 60` gives nothing on top, 75 on the left and right, 60 at the bottom. 75 + 75 = 150: the borders fill body's whole width, and its content box is 0 wide and 180 tall. The side borders are yellow (`#FEF8BB`). They cover html's dark bar between x = 125 and 275.

### 5. The notch

Where two borders meet, the browser splits the corner along the diagonal from the outer corner to the inner corner. The content box is 0 wide, so both inner corners are the same point: (200, 210), 60px above body's bottom edge. The bottom border is then a triangle: apex at (200, 210), base from x = 125 to 275 at y = 270. It is `#0000`, transparent, so the brown canvas shows through. The two yellow borders that remain make the ribbon and its two tips.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One outer `*` sets the border style and the three colors for html and body at once. html shows the top color, body the side color, and both use the transparent bottom.
- The nested `*` reaches body without naming it. `body` instead (127 characters) gives the same picture. Without the nesting, closing the first rule with `}` (same length), html also takes the second rule: its top border goes to 0 and the dark bar disappears. 34,650 pixels change.
- The −20 on html's sides does two jobs. It pushes html's yellow side borders off canvas, and it makes html's content 400 wide, so `-5%` is exactly 20px and body lands at x = 125. With `30 0` (123 characters), the yellow side borders show at the canvas edges, and body moves to (145, 32), 150 × 236. 20,402 pixels change.
- `331D1D` has no `#`: quirks mode takes it as a hex color. `#331D1D` gives the same picture in 125 characters.
- `30-20` and `-5%125`: the minus sign and the `%` end the number before them, so no space is needed. `30 -20` or `-20 125` each give the same picture in 125 characters.
- `5vw` is 20px in 3 characters. `20px` gives the same picture in 125. A bare `20` (123 characters) does not work inside the `border` shorthand in my Chrome: the whole declaration is dropped, no border is drawn, and the canvas is plain brown. 36,590 pixels change.
- `#A51D` is 5 characters. The opaque color of the target, `#B46C31`, gives the same picture in 126.
- `#0000` is transparent in 5 characters, and the `#` starts a new color without a space. `#FEF8BB transparent`, with its space, takes 131 characters, for the same picture.
- Nothing is closed. Closing both rules and the style element with `}}</style>` takes 134 characters, 10 more, for the same picture.
