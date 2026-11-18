---
title: "The middle dash, stood up: two I-beams in 107 characters"
ref: 2026-05-31
permalink: /2026/05/31/the-middle-dash-stood-up/
description: "How two dashed borders, one on html and one on a body turned a quarter turn and stretched three times, draw a row of cream dashes and two I shapes on blue-gray, in the May 31, 2026 CSS Battle target."
target: /assets/targets/2026-05-31.png
target_url: https://cssbattle.dev/play/TKhAUkfLs0mTIaeLqpH2
colors: ["#f4dcbf", "#556d7f"]
player: emohdaziz
chars: 107
score: 744.26
match: 100
code: |
  <style>*{border-block:32Q dashed#F4DCBF;margin:50 10;*{background:#556d7f;margin:-25;rotate:90deg;scale:3 1
---

The May 31 target shows two rows of five cream dashes on blue-gray, one at the top and one at the bottom. The second and fourth columns are joined by a vertical bar: two I shapes. Mohamed Ali draws the rows with a dashed border on html. body gets the same dashed border, turns a quarter turn and stretches three times: the middle dash of each of its borders becomes a bar.

Use **Wide view** to see body's other dashes go off the canvas, above and below.

{% include animations/2026-05-31.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html, head, body, style */
  border-block: 32Q dashed#F4DCBF; /* dashes at the top and the bottom, 30px thick */
  margin: 50 10;                   /* html: 380 × 200 at (10, 50) */
  * {                              /* * *: head, body, style (not html) */
    background: #556d7f;           /* goes to the canvas */
    margin: -25;                   /* body: 430 × 190 at (−15, 55) */
    rotate: 90deg;                 /* its borders become vertical bars */
    scale: 3 1                     /* the middle dash: from 60 to 180px */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `50` is read in px.

The page has html, head, body and style. head and style are not displayed. `*` matches all four: html and body both get the dashed border and a margin. The nested `*{` means `* *`: any element inside another one. That is head, body and style, but not html. So the background, the second margin, the turn and the stretch go to body only. Its `margin:-25` replaces the first margin.

### 2. html's dashes

`margin:50 10` puts html at (10, 50). In quirks mode, html fills the page minus its margins: 400 − 20 = 380 wide, 300 − 100 = 200 tall. I measured it: 380 × 200, at (10, 50).

`border-block` sets the top and bottom borders only. 32Q is 30.24px, and Chrome draws the border 30px thick. In my Chrome, a dash is twice the border width: 60px. The 380px side holds five dashes and four gaps of 20px: 5 × 60 + 4 × 20 = 380. The dashes start at x = 10, 90, 170, 250 and 330. The top row runs from y = 50 to 80, the bottom one from 220 to 250.

### 3. A background for the canvas

body gets `background:#556d7f`. html has no background. In that case, the browser takes body's background and paints it on the whole canvas. body's own box then paints no background.

That is the key: body can turn and stretch, its box stays clear. Only its borders show.

### 4. body's box

In quirks mode, body fills html's content box minus its own margins. html's content is 380 × 140 (200 minus the two 30px borders). With `margin:-25`, body is 25px larger on each side: 430 × 190, at (−15, 55).

body has the dashed borders too, also 30px thick. The dashes are still 60px, but the side is 430px: five dashes, and four gaps of 32.5px (5 × 60 + 4 × 32.5 = 430). The middle dash runs from x = 170 to 230, centered on the canvas.

### 5. A quarter turn

`rotate:90deg` turns body around its center. That is (215, 95) in body's box, so (200, 150) on the canvas: the canvas center.

The borders were horizontal, 30px thick, at 80px from the center. After the turn, they are vertical bars: the bottom border runs from x = 105 to 135, the top one from 265 to 295. html's second and fourth dashes are centered on x = 120 and 280: the bars sit right in their middle. That is what the 190px height of body gives.

### 6. Three times longer

`scale:3 1` stretches body three times along its own width and leaves its height alone. After the turn, that width is vertical. The browser applies the scale in body's own axes, so the picture is the same as stretching the turned box vertically: it becomes 190 × 1290, from y = −495 to 795.

The middle dash grows from 60 to 180px, around the center: from y = 60 to 240. html's dashes end at y = 80 and start at 220, so the bar goes 20px into each of them. Same color: the bar and the two dashes make one I.

The next dashes grow too, and the gaps with them: they run from y = −217.5 to −37.5 and from 337.5 to 517.5, off the canvas. So only the middle dash of each border shows.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- The background sits in the nested rule, on body only. html has none, so body's goes to the canvas, and body's box stays clear. With `background:#556d7f` in the outer rule instead (still 107 characters), html gets the background, so body paints its own on its turned box. It hides html's dashes between x = 135 and 265: 6,600 pixels change.
- `border-block` draws the top and bottom borders only. `border:` is 6 characters shorter (101 characters), but it adds dashed left and right borders to html and body: 8,160 pixels change.
- `32Q` is 30.24px, and Chrome draws a 30px border: 3 characters. `30px` gives the same picture in 108 characters. Case costs nothing: `32q` gives the same picture.
- No space before the `#`: `dashed #F4DCBF` gives the same picture in 108 characters.
- One value, `-25`, sets body's width (430) and its height (190) at once. The height puts the bars in the middle of html's dashes. With `-20` or `-30` (same length), the bars move 5px off the middle: 2,800 pixels change.
- `3` is the only one-digit factor that works in `scale:3 1`. With `2`, the bars are 120px tall: a 10px gap shows at each end, and the next dashes come in at the top and the bottom of the canvas. 4,200 pixels change. With `4`, the bars are 240px tall and stick out 20px above and below html's dashes: 2,400 pixels change. `2.4` gives the same picture in 109 characters.
- The `1` in `scale:3 1` keeps body's height. With `scale:3` (105 characters), body grows both ways: the bars move out to the edges of the canvas, and only thin slivers are left at x = 0 to 4 and 395 to 399. 10,200 pixels change.
- Bare numbers: `50px 10px` and `-25px` give the same picture in 113 characters.
- Nesting keeps the background and the transforms off html. `body{` instead of the inner `*{` gives the same picture in 110 characters.
- The code stops after `scale:3 1`. The end of the code closes both rules. Adding `}}` gives the same picture in 109 characters.
