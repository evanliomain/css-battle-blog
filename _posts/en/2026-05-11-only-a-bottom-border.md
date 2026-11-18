---
title: "Only a bottom border: a ring and a half disc in 117 characters"
ref: 2026-05-11
permalink: /2026/05/11/only-a-bottom-border/
description: "How a rounded html with only a bottom border draws a red half disc, and body's border draws a black ring over it, in the May 11, 2026 CSS Battle target."
target: /assets/targets/2026-05-11.png
target_url: https://cssbattle.dev/play/A5vGTRGW6mraCS1OCASh
colors: ["#b53733", "#000000"]
player: emohdaziz
chars: 117
score: 731.15
match: 100
code: |
  <style>*{margin:6%50 95 170;border-bottom:5lh solid#b53733;border-radius:50%;*{border:5vw solid;margin:36 120-125-120
---

The May 11 target shows a thick black ring on a white background, on the left, over a brick-red half disc, flat side up, on the right. Mohamed Ali draws it with two elements and two borders. html is a rounded box with only a bottom border: that border is the half disc. body, placed with negative margins, gets a black border and the same rounding: that is the ring.

**Teaching colors** show html's bottom border in orange, body's border in violet, and the two boxes as dashed outlines.

{% include animations/2026-05-11.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html, and also head, style and body */
  margin: 6% 50 95 170;              /* 24 50 95 170: html is 180 × 181, at (170, 24) */
  border-bottom: 5lh solid #b53733;  /* a 90px red bottom border */
  border-radius: 50%;                /* 90 × 90.5: only the lower half is painted */
  * {                                /* * *: body (head and style are hidden) */
    border: 5vw solid;               /* 20px, black: the text color */
    margin: 36 120 -125 -120         /* body: 180 × 180, at (50, 60); the end of the code closes both rules */
```

## How it works

### 1. Two rules, two elements

`*` matches every element: html, head, style and body. The nested `*{` means `* *`: every element inside another one, so head, style and body, but not html. head and style are not displayed. So html only gets the outer rule, and body gets both.

Both selectors have the same specificity, zero. When they set the same property, the nested rule wins because it comes later. For body, it replaces `margin` and `border-bottom` (the `border` shorthand also sets the bottom side). `border-radius:50%` is not replaced: body keeps it from the outer rule.

### 2. html: a 180 × 181 box

The code has no doctype, so the page is in quirks mode. There, a number with no unit is read as px in `margin`. And html fills the window minus its margins.

A percentage in `margin` is a share of the width, even for the top margin: `6%` of 400 = 24. So html's margins are 24 at the top, 50 on the right, 95 at the bottom and 170 on the left. My Chrome measures html at (170, 24), 400 − 170 − 50 = 180 wide and 300 − 24 − 95 = 181 tall.

html has no background. Its box is invisible: only its border will show.

### 3. A 90px bottom border

`border-bottom:5lh solid#b53733`. 1lh is the height of one line of text. In my Chrome, with the default font, it is 18px, so 5lh = 90px.

The border takes its room inside the 181px box: it runs from y = 205 − 90 = 115 to 205. What is left above it, html's content box, is 180 × 91, at (170, 24). html has no other border.

### 4. Rounded at 50%: the lower half only

`border-radius:50%` gives each corner 50% of the width and 50% of the height: 90 × 90.5. The box becomes an ellipse, 180 × 181.

Its top half has no border and no background, so nothing is painted there. The bottom border keeps only the part inside the ellipse. In my render, the red runs from x = 170 to 349 and from y = 115 to 204: a half disc 180 wide and 90 tall, flat side up.

### 5. body: a 180 × 180 box

body starts from html's content box, 180 × 91 at (170, 24). Its margins `36 120-125-120` move it:

- 36 at the top: y = 24 + 36 = 60.
- −120 on the left: x = 170 − 120 = 50.
- 120 on the right: the width stays 180 − (−120) − 120 = 180.

In quirks mode, body also stretches to the height of html's content box, minus its own margins: 91 − 36 − (−125) = 180. My Chrome measures body at (50, 60), 180 × 180.

### 6. A black ring over the half disc

`border:5vw solid` gives body a border on all four sides. 5vw is 5% of 400 = 20px. With no color, a border takes the text color, black.

With the `border-radius:50%` it keeps from the outer rule, the 180 × 180 square becomes a ring: 180 across outside, 180 − 2 × 20 = 140 inside, centered at (140, 150). body is painted after html, so the ring goes over the left end of the half disc.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `*` and the nested `*{` reach html and body with 1 and 3 characters (`;*{`). Without nesting, `}* *{` (119 characters), the picture is the same. With `body{` in place of the nested `*{` (120 characters), the picture is the same.
- The outer rule also styles body. So `border-radius:50%` is written once and rounds both elements.
- `6%50` writes 24 and 50: a percentage is a share of the width, 6% of 400 = 24, and no space is needed after `%`. With `margin:24 50 95 170` (118 characters), the picture is the same.
- `5lh` writes 90px in 3 characters, here in my Chrome. With `90px` (118 characters), the picture is the same. A number with no unit does not work in the `border-bottom` shorthand: with `border-bottom:90 solid#b53733` (116 characters), the declaration is dropped. There is no red, and the ring stretches into an oval that runs past the bottom of the canvas: 22,809 pixels change.
- `5vw` writes 20px in 3 characters. With `20px` (118 characters), the picture is the same. With `20` (116 characters), the `border` declaration is dropped, and body keeps the red `border-bottom:5lh` of the outer rule: a second red half disc and no ring, 17,445 pixels change.
- The ring has no color: black is the default text color. With `solid#000` (121 characters), the picture is the same.
- Unitless margins, and no space after `%`, before `#` or before a minus sign. With the four spaces, `margin:6% 50 95 170;border-bottom:5lh solid #b53733;…;margin:36 120 -125 -120` (121 characters), the picture is the same.
- The code ends inside both open rules, and the end of the code closes them. With `}}` at the end (119 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes at the same place as the target. 1,254 pixels differ by more than 8 levels, and all of them are on the edge of a shape: the anti-aliasing is not the same. The largest difference is 182 levels, at (161, 216), on the inner edge of the ring: (198, 198, 198) in my render, (16, 16, 16) in the target. The CSS Battle judge gives the official code a 100% match.
