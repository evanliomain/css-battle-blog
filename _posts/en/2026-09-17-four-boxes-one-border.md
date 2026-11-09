---
title: "Four boxes, one border: a temple in 154 characters"
lang: en
ref: 2026-09-17
permalink: /2026/09/17/four-boxes-one-border/
description: "How two frames, an empty h1 and a zoomed p draw the September 17, 2026 CSS Battle target: a dark grey temple on light blue."
target: /assets/targets/2026-09-17.png
target_url: https://cssbattle.dev/play/FI82QbLNuW9WtU2AemyW
colors: ["#7ec3e8", "#333333"]
player: levito
chars: 154
score: 692.17
match: 100
code: |
  <p><h1><style>*{margin:40 135;border:.63em solid#333;background:#7EC3E8;*{margin:20;*{margin:-85}p{zoom:10;margin:-14-7.5 16.5;border-color:#0000#0000#333
---

The September 17 target is a dark grey temple on light blue: a triangular roof, four thin columns, and a wide base. levito's solution gives every element the same dark border. `html` and the `body` are two frames, and their sides are the four columns. An empty `<h1>`, with its bigger font, is a thicker border: the base. A `<p>` zoomed ten times has only its bottom border colored, which is a triangle: the roof.

Use **Teaching colors** to see which box draws which part.

{% include animations/2026-09-17.html lang=page.lang %}

## The code, spaced out

```css
<p><h1>
<style>
* {                                /* html */
  margin: 40 135;
  border: .63em solid #333;        /* 10px, 20px in the h1 */
  background: #7EC3E8;
  * {                              /* the body */
    margin: 20;
    * {                            /* the h1 */
      margin: -85;
    }
    p {                            /* the p */
      zoom: 10;
      margin: -14 -7.5 16.5;
      border-color: #0000 #0000 #333;  /* only the bottom border */
    }
  }
}
```

## How it works

### 1. html: a frame

`*` gives every element `border:.63em solid#333`. With the default 16px font, `.63em` is 10.08px, and Chrome rounds a border width down to a whole pixel: 10px.

For `html`, `margin:40 135` leaves 400 − 270 = 130 of width. Without a doctype, the page is in quirks mode, and `html` takes the height its margins leave: 300 − 80 = 220. Its dark frame runs from x = 135 to 265 and from y = 40 to 260. Its left and right sides will be the outer columns.

### 2. The body: a smaller frame

The nested `*` matches the elements inside another one, and `margin:20` applies to the `body`. Inside `html`'s content, 110 wide, the `body` is 70 wide, from x = 165 to 235. It is 160 tall, from y = 70 to 230, with the same 10px border and the light blue background. Its left and right sides are the inner columns.

### 3. The h1: the base

The third level, `*{margin:-85}`, matches what is inside the `body`. The `<h1>` gets that −85 margin on every side: it reaches 85 past the `body`'s content on each side, from x = 90 to 310.

An `<h1>` has a 2em font, 32px, so its `.63em` border is 20.16, rounded down to 20. The `<h1>` is empty: its content is 0 tall, and it is only its top and bottom borders, 20 + 20 = 40 tall, from y = 220 to 260. That is the base. It covers the bottom of both frames.

### 4. The zoomed p: the roof

`p{…}` is more specific than `*`, so the `<p>` takes its own margin. `zoom:10` makes it ten times bigger: its 10px border is 100px on screen. Its margins, in zoomed pixels, are −140 at the top, −75 on the sides and 165 at the bottom. So the `<p>` is 5 + 7.5 + 7.5 = 20 wide, 200 on screen, from x = 100 to 300, and it starts 140 above the `body`'s content, at y = −60. It is empty, so it is 20 × 20 with its border: 200 × 200 on screen.

`border-color:#0000#0000#333` makes the top, right and left borders transparent, and only the bottom one dark. With 0 × 0 of content, each border is a triangle that meets the others at the centre, (200, 40). The bottom one is the roof: its tip at (200, 40), its base from x = 100 to 300 at y = 140.

The `<p>` also has the light blue background, painted under its transparent borders. It covers the top of both frames, so above y = 140 only the roof is left. Below it, its 165 bottom margin and the `<h1>`'s −85 top margin add up to 80: that puts the `<h1>` at y = 220.

## Golf notes

- One border in `*` draws everything: the font size and the zoom of each box decide how thick it is.
- `.63em` gives 10px in a 16px font and 20px in the `<h1>`'s 32px font.
- A box with no content and only one colored border is a triangle: no `clip-path` for the roof.
- The `<p>`'s background hides the top of the frames, so there is no need to cut them.
- `zoom:10` lets the `<p>` use small margins: `-14-7.5 16.5`.
- No closing braces, and `<style>` is never closed.
