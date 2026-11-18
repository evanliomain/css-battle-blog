---
title: "One dashed outline, doubled by scale: two brackets in 90 characters"
ref: 2026-05-20
permalink: /2026/05/20/one-dashed-outline-doubled-by-scale/
description: "How html and body share one 25px dashed outline, and how scale doubles body's copy into two thick brackets while two of html's dashes on each side become the tabs, in the May 20, 2026 CSS Battle target."
target: /assets/targets/2026-05-20.png
target_url: https://cssbattle.dev/play/arGXQUsdJXNaPG1gabNB
colors: ["#f4dcbf", "#30383f"]
player: emohdaziz
chars: 90
score: 769.64
match: 100
code: |
  <style>*{outline:27Q dashed#f4dcbf;margin:125-32;background:#30383f;*{margin:0 192;scale:2
---

The May 20 target shows two cream brackets facing each other on dark slate, each with two short tabs pointing outward. Mohamed Ali gives html and body the same 25px dashed outline. `scale:2` doubles body, and its outline becomes two thick brackets. html's outline is a thin dashed band across the canvas: body hides its middle, and two dashes are left on each side as the tabs.

With **Teaching colors**, each box and each outline gets its own color. **Wide view** shows both ends of html's box and outline, past the left and right edges of the canvas.

{% include animations/2026-05-20.html lang=page.lang %}

## The code, spaced out

```css
<style>                        /* goes into head */
* {                            /* html, head, style, body */
  outline: 27Q dashed #f4dcbf; /* 25px, dashes of 50px */
  margin: 125 -32;             /* html: 464 × 50 at (−32, 125) */
  background: #30383f;         /* html's goes to the canvas */
  * {                          /* head, style, body */
    margin: 0 192;             /* body: 80 × 50 at (160, 125) */
    scale: 2                   /* body: 160 × 100, outline 50px */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `125` in a margin is read in px.

The `<style>` goes into head, and body stays empty. `*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body. head and style are not displayed. Two boxes are left: html and body. The rules are never closed: the end of the code closes them.

The first level gives both boxes the same outline, margin and background. The second level replaces body's margin and adds `scale:2`.

### 2. A dark slate canvas

html's background is not painted in its box: it goes to the canvas, which turns dark slate everywhere. body paints its own box in the same color. Without the `background` declaration (71 characters), the canvas turns white and html's dashes show through body's box: 85,100 pixels change.

### 3. html: a thin band, wider than the canvas

html gets `margin:125-32`: 125px at the top and bottom, −32px on the left and right. The minus sign starts a new number, so no space is needed. Negative side margins make html wider than the canvas: 400 + 64 = 464, from x = −32 to 432.

In quirks mode, html fills the height of the page minus its margins: 300 − 250 = 50. html is a band from y = 125 to 175.

### 4. html's dashed outline

`27Q` is 27 quarter-millimeters: 6.75 mm, or 25.51px. Chrome rounds an outline width down to whole pixels: `getComputedStyle` gives 25px.

An outline is drawn outside the border box. html's runs from x = −57 to 457 and from y = 100 to 200. Its dashes are 50px long, twice the width. The top side is 514px long. It holds 7 dashes, and the 6 gaps are stretched to 27.33px, so that a full dash sits at each corner: dashes start at x = −57, 20.33, 97.67, 175, 252.33, 329.67 and 407. The bottom side is the same, from y = 175 to 200.

The left and right sides are 100px long: two 50px dashes fill them, with no room for a gap. They are solid, and they sit off canvas.

### 5. body and its outline

body gets `margin:0 192` from the nested rule. It is 464 − 384 = 80 wide, from x = 160 to 240. In quirks mode it fills html's height: 50, from y = 125 to 175.

body has the same 25px outline: from x = 135 to 265 and from y = 100 to 200. Its top side is 130px long: two 50px dashes and a 30px gap, at x = 135 to 185 and 215 to 265. Its sides are 100px long, like html's: solid. I checked this layout by rendering body without `scale` and without html's outline.

### 6. scale: 2

`scale:2` doubles body around its center, (200, 150). Its box becomes 160 × 100, from (120, 100) to (280, 200). The outline doubles with it: 50px thick, from x = 70 to 330 and from y = 50 to 250. The top dashes run from 70 to 170 and from 230 to 330, with a 60px gap. The sides stay solid, from y = 50 to 250. That makes two brackets with 50px arms.

body is painted above html's outline. Its background covers html's dashes from x = 120 to 280, and its outline covers them from 70 to 120 and from 280 to 330. With body's background removed (`;background:none` added, 106 characters), html's dashes show through from x = 120 to 280: 5,300 pixels change.

### 7. The tabs

Two of html's dashes are left on each side, at the top and at the bottom: from x = 20.33 to 70.33 and from 329.67 to 379.67. Each one runs 0.33px under a bracket, so it looks attached to it. These are the four tabs. The dashes at −57 and 407 are off canvas.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One outline, two sizes. `*` gives the same outline to html and body, and `scale:2` (7 characters) doubles body's box and outline at once. Without it, body needs its own size and outline width: `margin:-25 152;outline-width:50px` in place of `margin:0 192;scale:2` (103 characters). The box and the outline land in the same place, but body is then painted below html's outline: html's dashes cross body's box, and 5,300 pixels change.
- `27Q` is 3 characters, `25px` is 4. With `25px` (91 characters), the picture is the same. The rounding down matters: with `26Q` (90 characters), the outline is 24px, the sides of the brackets break in the middle, and 6,296 pixels change.
- `125-32` needs no space: the minus sign starts a new number. With `125 -32` (91 characters), the picture is the same.
- No space before a `#`. With `dashed #f4dcbf` (91 characters), the picture is the same.
- Nesting saves a selector. With a separate rule, `}* *{margin:0 192;scale:2` (92 characters), the picture is the same.
- One `background` does two jobs: html's paints the canvas, and body's hides the middle of html's outline.
- Bare numbers, thanks to quirks mode. With `125px -32px` and `0 192px` (97 characters), the picture is the same. With a doctype in front (105 characters), my Chrome drops both margin declarations and body ends up 0px tall: 47,648 pixels change.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 100 pixels, with the rule of the golf notes. They are the columns x = 20 and x = 379, on the rows of the tabs (y = 100 to 124 and 175 to 199). The tabs start at 20.33 and end at 379.67, so these two columns are only two-thirds cream. In the target, the tabs run from x = 20 to 70 and from 330 to 380, on whole pixels. The CSS Battle judge gives the official code a 100% match.
