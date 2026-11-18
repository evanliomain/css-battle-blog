---
title: "A smaller font, a shorter 15ex: two columns and two pills in 132 characters"
ref: 2026-05-02
permalink: /2026/05/02/a-smaller-font-a-shorter-15ex/
description: "How one shadow list draws both the two columns, from a very tall html, and the two pills, from a flat body, with a 7q font that shrinks body's 15ex, in the May 2, 2026 CSS Battle target."
target: /assets/targets/2026-05-02.png
target_url: https://cssbattle.dev/play/bxeCtMaJJEs3KcDlKtkI
colors: ["#84be8d", "#e25c57", "#525142"]
player: h_blierzt
chars: 132
score: 713.68
match: 100
code: |
  <style>*{margin:-83%170 0;box-shadow:15ex 176q#84BE8D,-15ex 1in#E25C57;*{margin:286-46;border-radius:1in;background:#525142;font:7q'
---

The May 2 target has two vertical columns on a dark olive background: red on the left, green on the right. From each column, a round-ended bar points toward the middle, the red one higher than the green one. H_Bliertz draws all four shapes with one shadow list, shared by html and body. The columns are copies of html, the pills are copies of body. A tiny font on body makes the same `15ex` shorter, so the pills land closer to the middle than the columns.

With **Teaching colors**, body's two shadows get their own colors, so you can see their ends inside the columns. **Wide view** shows how far html goes above the canvas.

{% include animations/2026-05-02.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* html, head, style, body */
  margin: -83%170 0;         /* html: -332 on top, 170 left and right, 0 at the bottom */
  box-shadow:
    15ex 176q#84BE8D,        /* green copy: 15ex right, 166.3px down */
    -15ex 1in#E25C57;        /* red copy: 15ex left, 96px down */
  * {                        /* head, style, body */
    margin: 286-46;          /* body: 286 top and bottom, -46 left and right */
    border-radius: 1in;      /* 96px: round ends */
    background: #525142;     /* goes to the canvas */
    font: 7q'                /* 6.61px font: a shorter ex */
  /* the end of the code closes the string and the two rules */
```

## How it works

### 1. Two boxes, one rule

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `170` in a margin is read in px.

The `<style>` goes into head, and body stays empty. `*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body. head and style are not displayed. Two boxes are left: html and body. Both get the shadow list. Only body gets the second level.

### 2. A very tall html

html gets `margin:-83%170 0`. A margin percentage is taken from the width of the containing block, even for the top margin. Here that is the 400px page: −83% of 400 = −332.

In quirks mode, html fills the page minus its margins. It is 400 − 2 × 170 = 60 wide and 300 + 332 − 0 = 632 tall, at (170, −332). Most of it is above the canvas.

### 3. A flat body, and a dark canvas

body gets `margin:286-46`: 286px on top and at the bottom, −46px on the left and the right. In quirks mode, body also fills html's height minus its margins: 632 − 2 × 286 = 60 tall. The negative margins make it 60 + 2 × 46 = 152 wide. My render puts it at (124, −46): only its bottom 14px are on the canvas.

`border-radius:1in` is 96px. That is more than half of body's 60px height, so the radius shrinks to 30px and the ends are half circles.

html has no background. In that case, body's background goes to the canvas, and the whole canvas is `#525142`. body's own box shows nothing.

### 4. html's copies: the columns

A box shadow with no blur is a copy of the box, moved by its offset. The list has two copies. The green one moves 15ex to the right and 176q down, the red one 15ex to the left and 1in down. 1Q is a quarter of a millimeter, 0.945px: 176q = 166.3px. 1in = 96px.

html keeps the default font, 16px Times. In my Chrome, its 15ex is 107.695px, so 1ex is 7.18px. The target puts the columns 110px from html: at x = 60 to 120 and x = 280 to 340. See the last section.

The copies are 60 × 632, like html. The green one runs from y = −332 + 166.3 = −165.7 to 466.3, the red one from −236 to 396. Both cover the whole height of the canvas. That is why html is so tall: a short html would leave gaps at the top or the bottom of the columns.

### 5. body's copies: the pills

The first `*` also matches body, so body has the same shadow list. Its copies are 152 × 60 pills, because a shadow follows the round corners of its box.

The vertical offsets are fixed lengths, the same as on html. The red pill is 96px below body: from y = −46 + 96 = 50 to 110. The green one is 166.3px below: from y = 120.3 to 180.3.

An outer shadow is never painted under its own box. body's box ends at y = 14, above both pills, so nothing is cut.

### 6. The font shortens 15ex

`ex` is the x-height of the element's font. Without a font of its own, body would have html's 15ex: each pill would sit centered on its column.

`font:7q'` gives body a font of 7q = 6.61px. The `font` shorthand needs a font name: the `'` opens a string, and the end of the code closes it. The name is empty, so body keeps the default font. In my Chrome, body's 15ex is 44.49px: 0.4484 times the font size, against 0.4487 on html.

The target has the pills 46px from body: the red one from x = 124 − 46 = 78 to 230, the green one from 170 to 322. The left end of the red pill is inside the red column, the right end of the green one inside the green column. body is painted after html, so the pills are on top of the columns. They have the same color, so the joins do not show.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list for two boxes. `ex` makes the side offsets depend on the font, and the vertical ones stay fixed. With a second list on body in px, `box-shadow:44.49px 176q#84BE8D,-44.49px 1in#E25C57` in place of `font:7q'` (174 characters), the picture is the same, but the code is 42 characters longer.
- The font is needed. Without `;font:7q'` (123 characters), body's 15ex is 107.695px, like html's: each pill sits centered on its column, and 12,732 pixels change.
- `font:7q'` is 8 characters. With `font-size:7q` (136 characters), the picture is the same. The `'` is needed: with `font:7q` (131 characters), my Chrome drops the declaration, and the 12,732 pixels change as with no font.
- `-83%170` needs no space: the `%` ends the first number. With `-332 170 0` (133 characters), the picture is the same.
- The last `0` is needed. With `margin:-83%170` (130 characters), the bottom margin is −332 too. html is 964px tall and body 392px. body's box now covers the middle of the canvas, its shadows are only painted outside it, and 13,088 pixels change.
- `176q` is 4 characters for 166.3px. With `166px` (133 characters), the green pill moves up 0.3px, and 229 pixels change, on its top and bottom edges.
- `1in` is 3 characters for 96px, in the shadow and in the radius. With `96px` in the shadow (133 characters), the picture is the same. A bare `96` does not work here: bare numbers are allowed in margins, not in shadows. With `96#E25C57` (131 characters), my Chrome drops the whole shadow list, only the dark canvas is left, and 49,000 pixels change.
- `border-radius:1in` gives round ends. With `50%` (132 characters, the same length), the radius is 76px wide and 30px tall: the pills turn into ellipses, and 1,675 pixels change.
- No space is needed before `#`: `176q#84BE8D`. With `176q #84BE8D` (133 characters), the picture is the same.
- The nested `*` reaches body for 2 characters. With `body{` (135 characters), the picture is the same.
- Bare numbers in the margins, thanks to quirks mode. With `170px` and `286px -46px` (139 characters), the picture is the same. With a doctype in front (147 characters), my Chrome drops both margins: html is 400 × 8, body is 0px tall, html's copies are two thin strips, and 48,554 pixels change.
- The code ends inside a string and two rules: the end of the code closes them. With `''}}` at the end (135 characters), the picture is the same.

## If you try it at home

In my local Chrome (version 157 when this was written), the official code is close but not pixel-exact. html's 15ex is 107.695px there, where the target's columns sit 110px from html, and body's is 44.49px, where the target's pills sit 46px from body. The red shapes sit to the right of the target's, and the green ones to the left. The red column runs from x = 62.3 to 122.3 in my render, from 60 to 120 in the target. The green one runs from 277.7 to 337.7, against 280 to 340. The red pill ends at x = 231.5 instead of 230, and the green one starts at 168.5 instead of 170. 4,571 pixels are more than 8 off the target in one channel.

In a test copy with `110px` in place of `15ex`, and a second list on body with `46px` (180 characters), the columns and the pills land where the target has them. 1,544 pixels are left, all within 8 pixels of an edge: the target is a JPEG, with compression noise around the shapes. The CSS Battle judge gives the official code a 100% match. The animation above puts the shapes where the target has them.
