---
title: "Three boxes, one border: a magnet in 173 characters"
lang: en
ref: 2026-09-30
permalink: /2026/09/30/three-boxes-one-border/
description: "How three stacked boxes that share one border and one radius draw the September 30, 2026 CSS Battle target: a blue and pink U magnet."
target: /assets/targets/2026-09-30.png
target_url: https://cssbattle.dev/play/F8dyF0XEp3g1Ff4mG90c
colors: ["#f8f5f1", "#4355cc", "#fcc9e3"]
player: nicktheromaniancoder
chars: 173
score: 676.91
match: 100
code: |
  <p><style>*{background:#F8F5F1;border:10px solid#4355CC;margin:60 120;border-radius:0 0 5pc 5pc;+*{background:#FCC9E3;margin:20-10-10;p{height:140;margin:-40 20;border-top:0
---

The September 30 target is a U magnet: a pink U with a blue outline on a cream background, and a small cream square at the top of each arm. Nick's solution stacks three boxes, `html`, the `body` and a `<p>`, and gives all three the same 10px blue border and the same round bottom corners. `html` draws the outline, the pink `body` fills it, and the cream `<p>`, painted last, hollows out the middle.

Use **Teaching colors** to tell the three borders apart, and to see the `<p>`'s cream background.

{% include animations/2026-09-30.html lang=page.lang %}

## The code, spaced out

```css
<p>                                  /* a 3rd box, inside the body */
<style>
* {                                  /* html, body, p */
  background: #F8F5F1;               /* cream: html's goes to the canvas */
  border: 10px solid #4355CC;
  margin: 60 120;                    /* html: 160 × 180 */
  border-radius: 0 0 5pc 5pc;        /* 80px bottom corners */
  + * {                              /* * + *: the body */
    background: #FCC9E3;             /* pink */
    margin: 20 -10 -10;              /* 160 × 150, from y = 90 */
    p {                              /* * + * p: the p */
      height: 140;
      margin: -40 20;                /* 100 × 150, from y = 60 */
      border-top: 0;
    }
  }
}
```

## How it works

### 1. html draws the outline

`*` matches every element: `html`, `head`, the `body`, the `<p>` and the `<style>` (`head` and `style` are not displayed). Each of them gets a cream background, a 10px blue border, `margin:60 120` and `border-radius:0 0 5pc 5pc`. The nested rules then change some of that for the `body` and the `<p>`.

`html` keeps it all. It is 400 − 120 − 120 = 160px wide, from x = 120 to 280. CSS Battle runs in quirks mode, where `html` fills the window minus its top and bottom margins: 300 − 60 − 60 = 180px, from y = 60 to 240. `5pc` is 5 picas: 80px, half the width. So the bottom of the box is a half circle, and the border draws a closed U.

`html`'s background is used for the whole canvas: that is the cream background of the target.

### 2. The body is the pink U

The nested `+*` means `* + *`: an element that comes right after a sibling. `html` has no sibling, and `head` comes first in `html`. The `body` comes after `head`, so it matches.

Inside its 10px border, `html` has 140 × 160 of content, from (130, 70) to (270, 230). In quirks mode, the `body` fills that minus its own margins. `margin:20-10-10` means 20 at the top, −10 on the left and right, and −10 at the bottom. So the `body` starts 20px lower, at y = 90, and grows 10px past the content on the left, the right and the bottom. It is 160 × 150, from (120, 90) to (280, 240): the same width and the same bottom as `html`.

It has the same border and the same 80px corners, with a pink background. It covers `html`'s U from y = 90 down. Its top border, from y = 90 to 100, is the bar under the two squares.

### 3. The p is a cream box with no top border

`<p>` is the first thing in the code, so it is the first element of the `body`. The nested `p` means `* + * p`: a `<p>` inside the `body`. It gets the cream background and the blue border from `*`.

It is empty, so `height:140` gives it its height: 140px plus its 10px bottom border. `margin:-40 20` moves it 40px above the `body`'s content, which starts at y = 100, and narrows it by 20px on each side. So the `<p>` runs from x = 150 to 250 and from y = 60 to 210. `border-top:0` removes its top border. Its left and right borders, at x = 150 to 160 and 240 to 250, are the inner edges of the two arms.

### 4. A radius that is too big shrinks

The `<p>` also gets `border-radius:0 0 5pc 5pc`, but it is only 100px wide. Two 80px radii side by side need 160px. When the radii do not fit, the browser shrinks them all by the same ratio, here 100/160, so they become 50px. I checked it: with `0 0 50px 50px` instead, the render is the same pixel for pixel.

The bottom of the `<p>` is then a half circle of radius 50, centred on (200, 160). The `body`'s half circle has the same centre and a radius of 80. Between the two borders, the pink band is 20px wide all the way round: 70 − 50 = 20.

### 5. The p hollows out the U

The `<p>` is painted last, on top of `html` and the `body`. Its cream background covers the middle of the U. At the top, it also covers `html`'s top border (y = 60 to 70) and the `body`'s top border (y = 90 to 100) between x = 160 and 240.

What stays at the top of each arm is a 20px cream square, from y = 70 to 90: x = 130 to 150 on the left, 250 to 270 on the right. It is framed by `html`'s border above and on the outside, the `body`'s top border below, and the side of the `<p>` on the inside. That gives the two white poles of the magnet.

## Golf notes

- One `*` rule gives all three boxes their background, border, margin and radius. The nested rules only write what changes.
- `<p>` adds a third box for 3 characters, and `p{` targets it.
- `+*` matches the `body` but not `html`, in 2 characters.
- `5pc` is 80px in 3 characters. The `<p>` reuses it: the browser shrinks it to 50px, so no second radius is written.
- `border-top:0` removes one side of a border that is already set.
- `20-10-10` needs no spaces: the minus sign starts a new value.
- No closing braces, and `<style>` is never closed.
