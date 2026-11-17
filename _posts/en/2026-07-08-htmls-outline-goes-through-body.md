---
title: "html's outline goes through body: a table in 104 characters"
ref: 2026-07-08
permalink: /2026/07/08/htmls-outline-goes-through-body/
description: "How percentage margins center html, how one 11q outline frames body's green bar and gives html two long legs, and how html's outline, painted over body, cuts the bar with two dividers, in the July 8, 2026 CSS Battle target."
target: /assets/targets/2026-07-08.png
target_url: https://cssbattle.dev/play/3XH4lVrpfDgTcrxgYXt5
colors: ["#4c4c6b", "#fae29e", "#4a9a86"]
player: levito
chars: 104
score: 748.45
match: 100
code: |
  <style>*{margin:25%25%0;outline:11q solid#4C4C6B;background:#FAE29E;*{margin:0-35 160;background:#4A9A86
---

The July 8 target looks like a table: a green bar with a dark frame, on two thin legs that go down to the bottom of the canvas, on a cream background. Two dark dividers cut the bar. Veit Lehmann draws it with two boxes and one outline. html is a 200 × 200 square: its outline makes the legs. body is the green bar: its outline makes the frame. html's outline is painted over body, so the legs go right through the bar: those are the dividers.

Turn on **Teaching colors** to see html's outline in orange, body's in blue and body in purple, and **Wide view** to see the bottom of html's outline below the canvas.

{% include animations/2026-07-08.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* html, head, style, body */
  margin: 25%25%0;           /* 100px on top, left and right, 0 at the bottom */
  outline: 11q solid#4C4C6B; /* 10.39px, drawn 10px wide, outside the box */
  background: #FAE29E;       /* cream: html's goes to the canvas */
  * {                        /* * *: head, style, body */
    margin: 0-35 160;        /* 0 on top, -35 left and right, 160 at the bottom */
    background: #4A9A86      /* body is green */
```

## How it works

### 1. Two rules, one nested

There is no doctype: the page is in quirks mode, and numbers with no unit are px. The page has html, head, the style and body. head and the style are not displayed.

The first `*` matches all of them. The second `*` is nested inside it, so it means `* *`: any element inside another one. That is head, the style and body, but not html. Both selectors weigh nothing, and the nested rule comes later: it wins for `margin` and `background`. It says nothing about `outline`, so body keeps the outline of the first rule. html only gets the first rule.

### 2. html, a 200 × 200 square

A margin in percent is a share of the width of the containing block, even on the top and the bottom. For html, that is the 400px canvas: `25%` is 100px. `margin:25%25%0` gives 100px on top, 100px on the left and right, and 0 at the bottom.

html is 400 − 200 = 200px wide. In quirks mode, html fills the height of the page minus its margins: 300 − 100 − 0 = 200px. getBoundingClientRect gives (100, 100), 200 × 200.

html's background, `#FAE29E`, goes to the whole canvas: that is the cream.

### 3. The outline: 11q, drawn 10px wide

`q` is a quarter of a millimeter; units ignore case, so `11q` is `11Q`. 1Q is 0.945px: 11q is 10.39px. getComputedStyle gives `10px` for the outline width: Chrome rounds it down to a whole pixel.

An outline takes no room and is drawn outside the box. Around html, it goes from x = 90 to 310 and from y = 90 to 310. Its left and right sides are the legs, from x = 90 to 100 and from x = 300 to 310. Its bottom side, from y = 300 to 310, is off the canvas.

### 4. body, the bar

body gets `margin:0-35 160`. Negative side margins make it wider than html: 200 + 2 × 35 = 270px, from x = 65 to 335. In quirks mode, body fills html's height minus its margins: 200 − 0 − 160 = 40px. getBoundingClientRect gives (65, 100), 270 × 40. It is painted green.

body has the same 10px outline. It frames the bar from x = 55 to 345 and from y = 90 to 150. Its top side lies on top of html's top side, at the same height, y = 90 to 100.

### 5. html's outline over body

In my Chrome, html's outline is painted after body: over its green background, and over its outline too. I checked it by painting html's outline red and body's blue: the pixels at (95, 120), in the bar, and at (200, 95), on the top edge, come out red. When I put body in its own layer above html (`position:relative;z-index:1`), the green covers the legs: 800 pixels change, the two 10 × 40 dividers.

So the legs run from y = 90 down past the bottom of the canvas, and cross the bar on their way. In my render, row y = 120 is dark from x = 55 to 64, 90 to 99, 300 to 309 and 335 to 344, and green in between. The picture has 99,600 cream pixels, 10,400 dark and 10,000 green.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One outline does three jobs: the frame of the bar, the legs and the dividers. `border` instead (103 characters) breaks it: a border takes room inside the box. html's legs move 10px inward, and body is only 20px tall, all border, with no green left. 24,600 pixels change.
- `25%25%0` is 100px, 100px and 0 in 7 characters: no space is needed after a `%`. `100 100 0` gives the same picture in 106.
- `11q` is a 10px outline in 3 characters. `10px` gives the same picture in 105. `10q` (9.45px, drawn 9px) changes 1,058 pixels, and `12q` (11.34px, drawn 11px) changes 1,062.
- A number with no unit does not work here: with `outline:10 solid#4C4C6B` (103 characters), my Chrome drops the whole declaration. The frame, the legs and the dividers are gone: 10,400 pixels change.
- `160` keeps body 40px tall. With `margin:0-35` (100 characters), body fills html's 200px: the green goes down to the bottom of the canvas, and 43,000 pixels change.
- Nesting the second rule costs `;*{`. Writing it apart, `}* *{`, gives the same picture in 106 characters.
- `0-35`: the minus sign ends the `0`, so no space is needed. Same for `solid#4C4C6B`, with no space before the `#`.
- Nothing is closed. `}}</style>` at the end takes 114 characters, for the same picture.
