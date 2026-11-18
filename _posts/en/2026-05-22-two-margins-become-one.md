---
title: "Two margins become one: a navy H in 91 characters"
ref: 2026-05-22
permalink: /2026/05/22/two-margins-become-one/
description: "How body's border draws a cream frame and two empty paragraphs, sharing one margin rule, become two cream bars, the second pulled above the first by margin collapsing, in the May 22, 2026 CSS Battle target."
target: /assets/targets/2026-05-22.png
target_url: https://cssbattle.dev/play/ZTUaopgqqxcUhB9JGrpS
colors: ["#0d2a58", "#f5e3b5"]
player: emohdaziz
chars: 91
score: 768.03
match: 100
code: |
  <p><p><style>*{background:#0d2a58;*{border:5vw solid#f5e3b5;margin:80 30;*{margin:65 30-174
---

The May 22 target is a cream rectangle on navy, with a wide navy H cut inside it. Mohamed Ali draws the frame with body's border, and the two cream bars with two empty paragraphs. Both paragraphs get the same margins. The bottom margin of the first one and the top margin of the second one collapse into a single negative margin, and the second bar jumps above the first.

With **Teaching colors**, body's border and each paragraph get their own color.

{% include animations/2026-05-22.html lang=page.lang %}

## The code, spaced out

```css
<p><p><style>               /* two p in body, the style in the second */
* {                         /* html, head, body, p, p, style */
  background: #0d2a58;      /* html's goes to the canvas */
  * {                       /* head, body, p, p, style */
    border: 5vw solid #f5e3b5;  /* 20px, cream */
    margin: 80 30;          /* body: 340 × 140 at (30, 80) */
    * {                     /* p, p, style */
      margin: 65 30 -174    /* top 65, sides 30, bottom −174 */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `80` in a margin is read in px. With a doctype in front (106 characters), my Chrome drops every margin, and 52,560 pixels change.

The code starts with `<p><p>`. A `<p>` can't hold another paragraph, so the second `<p>` closes the first one. body holds two p, one after the other. The `<style>` comes next and goes into the second p. It is not displayed, and neither is head.

`*` matches every element. The nested `*{` matches every element inside another one: head, body, the two p and style. The third level matches the elements inside those: the two p and style. The rules are never closed: the end of the code closes them.

### 2. A navy canvas

Every element gets `background:#0d2a58`. html's background is not painted in its box: it goes to the canvas, which turns navy everywhere. body paints its own box navy too, on the navy canvas. Without the `background` declaration (72 characters), every navy pixel turns white: 85,360 pixels change.

### 3. body: a cream frame

body gets `margin:80 30`. In quirks mode, body fills the page minus its margins: 400 − 60 = 340 wide and 300 − 160 = 140 tall, at (30, 80).

It also gets `border:5vw solid#f5e3b5`. 1vw is 1% of the 400px width, so 5vw is 20px. The border draws a cream frame from x = 30 to 370 and from y = 80 to 220. Inside it, body's navy runs from x = 50 to 350 and from y = 100 to 200.

### 4. Two paragraphs, two bars

The p match the second level too, so they get the same 20px cream border. The third level gives them `margin:65 30-174`: 65 on top, 30 on the sides, −174 at the bottom.

Each p is 300 − 60 = 240 wide, from x = 80 to 320. Its content is empty (the style inside the second one is not displayed), so its content box is 200 × 0. Only the border is left: 20 + 20 = 40px tall, all cream. Each p is a solid cream bar of 240 × 40.

The first p sits 65px below the top of body's content: y = 100 + 65 = 165. It runs to y = 205.

### 5. Two margins become one

Between the two p, the first one's bottom margin (−174) touches the second one's top margin (65). Vertical margins that touch collapse into one. With a positive and a negative margin, the result is their sum: 65 + (−174) = −109.

So the second p starts 109px above the bottom of the first one: y = 205 − 109 = 96. It runs to y = 136, above the first bar. With just `65 30`, the gap would be 65 and the second bar would sit at y = 270.

### 6. The H

The two bars stick out a little under the frame: the second one from y = 96 to 100, the first one from y = 200 to 205. It is cream on cream, so nothing shows. What is left of body's navy is an H:

- two posts, from x = 50 to 80 and from x = 320 to 350, from y = 100 to 200;
- a crossbar between the two bars, from x = 80 to 320 and from y = 136 to 165.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- No closing tags. The second `<p>` closes the first one, and nothing closes the second one. With `<p></p><p></p><style>` (99 characters), the picture is the same.
- One margin rule for both bars. The first bar uses the top margin, and the second one is placed by the collapsed margin. With one `<p>` (88 characters), the upper bar is missing: 8,640 pixels change.
- The −174 does the moving. With `margin:65 30` (87 characters), the second bar sits at y = 270, below the first one. body grows to hold it (315px tall), its frame runs off the bottom of the canvas, and 23,840 pixels change.
- Nesting saves the selectors. With three separate rules, `*{background:#0d2a58}* *{border:5vw solid#f5e3b5;margin:80 30}* * *{margin:65 30-174` (97 characters), the picture is the same.
- `5vw` is 20px in 3 characters. With `20px` (92 characters), the picture is the same.
- No space before `#f5e3b5`. With `solid #f5e3b5` (92 characters), the picture is the same.
- Bare numbers, thanks to quirks mode. `30-174` is read as 30 then −174, with no space. With `30 -174` (92 characters), the picture is the same. With px units, the space is needed: `30px-174px` is read as one number with the unit `px-174px`. My Chrome then drops the declaration: the p keep the `80 30` margins, and 16,640 pixels change (101 characters). With `margin:80px 30px` and `margin:65px 30px -174px` (102 characters), the picture is the same.
