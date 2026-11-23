---
title: "A body squeezed to its border: a P in 123 characters"
ref: 2026-04-14
permalink: /2026/04/14/a-body-squeezed-to-its-border/
description: "How one cream border with no left side, given to both html and body, draws the two bars and the round end of a P on html and its stem on a body squeezed to 30px, in the April 14, 2026 CSS Battle target."
target: /assets/targets/2026-04-14.png
target_url: https://cssbattle.dev/play/c12qisZj8zuQ4l2hq2sq
colors: ["#f2eaa8", "#e76"]
player: levito
chars: 123
score: 723.86
match: 100
code: |
  <style>*{margin:0 90-120;border:32q solid#F2EAA8;border-left:0}&{margin:60 95 150;border-radius:0 1in 1in 0;background:#E76
---

The April 14 target is a cream P on a coral canvas. Its bowl is two bars that run left past the stem and a round end on the right. The stem goes down through the bowl. Veit Lehmann writes one border, cream with no left side, and gives it to both html and body. On html, it makes the two bars and the round end. body gets a margin so wide that it is squeezed to the width of its border: 30px, the stem.

With **Teaching colors**, html's border and body's border get their own colors.

{% include animations/2026-04-14.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                            /* every element: html and body */
  margin: 0 90-120;            /* body: 0 at the top, 90 left and right, −120 at the bottom */
  border: 32q solid #F2EAA8;   /* 30.24px, cream: drawn 30px wide in my Chrome */
  border-left: 0;              /* no left side */
}
& {                            /* at the top level, & is the root: html */
  margin: 60 95 150;           /* html: 210 × 90 at (95, 60) */
  border-radius: 0 1in 1in 0;  /* 96px on the right corners, scaled down to 45px */
  background: #E76;            /* the root's background: the whole canvas */
  /* the end of the code closes the rule */
```

## How it works

### 1. `&` is html

`&` is the nesting selector. Outside any rule, it stands for `:scope`, and in a style sheet that is the root element: html. `*` matches every element, html included. For the margin, `&` wins: it comes later, and it is more specific. So html gets the margin of `&`, body the margin of `*`, and both get the border.

### 2. html: 210 × 90

CSS Battle pages have no doctype, so they are in quirks mode, where unitless lengths in margins count as pixels.

`margin:60 95 150` is 60 on top, 95 left and right, 150 at the bottom. html is 400 − 95 − 95 = 210px wide, from x = 95 to 305. In quirks mode, html stretches to the height of the viewport, minus its margins: 300 − 60 − 150 = 90. It runs from y = 60 to 150. getBoundingClientRect gives 95, 60, 210 × 90.

`background:#E76` is set on the root. The root's background is not limited to its box: it is painted on the whole canvas. Everything starts coral.

### 3. A border with no left side

`border:32q solid#F2EAA8` gives every element a cream border. 1q is a quarter millimeter: 32q is 8mm, 30.24px. In my Chrome, getComputedStyle gives 30px, and the border is drawn 30px wide. `border-left:0` removes the left side.

On html, that leaves a bar at the top, from y = 60 to 90, a bar at the bottom, from y = 120 to 150, and the right side, from x = 275 to 305. The left end is open: the coral band between the bars runs out to x = 95. The target puts its edges at y = 60, 90, 120 and 150, and at x = 95, 275 and 305.

### 4. The round end

`border-radius:0 1in 1in 0` asks for 1in, 96px, on the top right and bottom right corners. On the right side, 96 + 96 = 192, more than the 90px height. The browser then scales every radius down by the same ratio, 90 / 192, to 45px. The outer edge of the right side turns into a half circle of radius 45. Inside, the border is 30px thick on the top, the bottom and the right, so the inner radius is 45 − 30 = 15. The right side is a half ring.

The two left corners stay square: the left ends of the bars are straight.

### 5. body: 30px wide

body has the same border, and the margin of `*`: `0 90-120` is 0 at the top, 90 left and right, and −120 at the bottom. The minus sign starts a new number, so `90-120` needs no space.

body sits in html's content box: 180px wide (210 minus the 30px right border), from x = 95, and 30px tall, from y = 90 to 120. Its left margin puts it at x = 185. That leaves 180 − 90 − 90 − 30 = −30 for its content: less than nothing, so its width is 0. body is as wide as its right border: from x = 185 to 215. Its top and bottom borders are 30px wide too. The target puts the stem from x = 185 to 215.

### 6. body: 150px tall

In quirks mode, body stretches to the height of html's content, minus its own top and bottom margins: 30 − 0 − (−120) = 150. getBoundingClientRect gives 185, 90, 30 × 150. body runs from y = 90 to 240, through the bottom bar. With the top bar above it, the stem runs from y = 60 to 240, where the target ends it.

body's margin box is 150 − 120 = 30px tall, the height of html's content: html does not grow, and stays 90px tall.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `*` gives the border to html and body at once. With `body{` in place of `*{` and the border written again in `&{…}` (164 characters), the picture is the same.
- `&` is 1 character, `html` 4. With `html{` (126 characters), the picture is the same.
- `32q` is 3 characters, `30px` 4. With `30px` (124 characters), the picture is the same. The value matters: with `31q` (29.29px), my Chrome draws 29px borders, and 509 pixels change. With `33q` (31.18px), it draws 31px borders, and 496 pixels change.
- `border-left:0` is what opens the P. Without it (109 characters), html gets a left border, and body gets one too: body moves to x = 215 and is 60px wide. 11,704 pixels change.
- `1in` is 3 characters, `45px` 4. Any radius of 45px or more gives the same half circle, since the browser scales it down to 45. With `0 45px 45px 0` (125 characters), the picture is the same.
- The radius needs its four values, so that the left corners stay square. With `border-radius:1in` (115 characters), the left ends of both bars get round too: 1,236 pixels change, between x = 95 and 138. With `0 1in 1in` (121 characters), the bottom left corner gets round: 620 pixels change.
- `#E76` is 4 characters, `#ee7766` 7. With `#ee7766` (126 characters), the picture is the same.
- `solid#F2EAA8` needs no space before the `#`. With `solid #F2EAA8` (124 characters), the picture is the same.
- `90-120` needs no space: the minus starts a new number. With `90 -120` (124 characters), the picture is the same.
- Quirks mode takes unitless numbers in margins. With `0 90px -120px` and `60px 95px 150px` (134 characters), the picture is the same.
- The code ends inside the rule: the end of the code closes it. With `#E76}` (124 characters), the picture is the same.

## If you try it at home

The target image is a JPEG, and its colors are 1 off: #f2eaa9 for the cream and #ee7666 for the coral. In my Chrome (version 157 when this was written), the official code draws the same shapes, with the same edges. 975 pixels differ from the target by more than 8 in one channel, none of them more than 6px from an edge. 705 of them are on the round end, from x = 260. The 23 that differ by more than 40 are all there too, on the curve. The CSS Battle judge gives the official code a 100% match.
