---
title: "A plus sign and dotted borders: a gamepad in 163 characters"
lang: en
ref: 2026-10-05
permalink: /2026/10/05/a-plus-sign-and-dotted-borders/
description: "How a dotted border and a giant, stroked plus sign draw the October 5, 2026 CSS Battle target: a gamepad with a cross and four buttons."
target: /assets/targets/2026-10-05.png
target_url: https://cssbattle.dev/play/kKeIFq1dBXUmV9k1c7d0
colors: ["#f7cb71", "#4d52d0", "#d16161"]
player: emohdaziz
chars: 163
score: 684.6
match: 100
code: |
  +<style>&{background:#f7cb71;border-inline:53Q dotted;border-left-color:4d52d0;margin:90 40 90 240;color:d16161;*{-webkit-text-stroke:55q;margin:-24-231;font:909%a
---

The October 5 target looks like a gamepad on a yellow background: a thick coral cross on the left, and four discs on the right, two blue and two coral. Mohamed Ali draws the four discs with one dotted border, and the cross with a single character: a `+`, set at 145px and thickened with a text stroke.

{% include animations/2026-10-05.html lang=page.lang %}

## The code, spaced out

```css
/* "+" : the only text of the page, in body */
& {                                 /* html */
  background: #f7cb71;
  border-inline: 53Q dotted;        /* left and right borders, ≈50px */
  border-left-color: 4d52d0;
  margin: 90 40 90 240;
  color: d16161;                    /* right border and text */
  * {                               /* body (head and style stay hidden) */
    -webkit-text-stroke: 55q;       /* ≈52px */
    margin: -24 -231;
    font: 909% a;
  }
}
```

## How it works

### 1. html: a 120×120 box

At the top level, `&` is `html`. Its background is the root background, so the yellow covers the whole canvas.

`margin:90 40 90 240` leaves 400 − 280 = 120px of width. CSS Battle renders in quirks mode, where `html` fills the frame minus its margins: 300 − 90 − 90 = 120px of height. A 120×120 box at (240, 90).

### 2. A dotted border is a row of discs

`border-inline:53Q dotted` gives `html` a left and a right border. 53Q is 50.08px, and Chrome draws it as 50px.

Chrome draws a dotted border as round dots, as wide as the border. So each dot is a 50px disc. Along the 120px side, two of them fit, with a 20px gap: y 90 to 140, and y 160 to 210. Between the two borders, the content box is 120 − 2 × 50 = 20px wide. The four discs are centered at x=265 and x=335, y=115 and y=185.

### 3. Two colors for the discs

The border has no color, so it uses `color`: `d16161`, the coral. In quirks mode a color can drop its `#`, which is why `color:d16161` and `border-left-color:4d52d0` work. The second one turns only the left border blue: two blue discs, two coral ones.

### 4. body: room for one line

The nested `*` matches everything inside `html`. `head` and the `<style>` are hidden, so only `body` shows. It starts in `html`'s 20px-wide content box, and `margin:-24-231` (−24px at the top and bottom, −231px on the sides) widens it to 482×168, from (59, 66). Its only job is to hold the line where the `+` sits.

### 5. A plus sign at 145px

The `+` written before `<style>` is the text of `body`. `font:909%a` is the shortest valid `font` shorthand: a size and a family.

- 909% of the inherited 16px is 145.44px.
- `a` is not a real font, so the browser falls back to its default font.

The text takes `html`'s `color`, the coral. At this size, the plus sign is big, but its strokes are only a few pixels thick.

### 6. The text stroke makes it a cross

`-webkit-text-stroke:55q` draws an outline around the glyph. 55q is 51.97px, and the stroke is centered on the glyph's edge, so it spreads about 26px outward on every side, in the text color. The thin plus grows into the cross of the target: 120×120, with arms about 60px thick, between x 40 and 160, y 90 and 210. The corners stay square.

## Golf notes

- One `dotted` border draws four discs; `border-left-color` splits them into two colors.
- A single `+` character draws the whole cross.
- `font:909%a`: a percentage size and a one-letter family that does not exist.
- `color:d16161` and `border-left-color:4d52d0`: no `#` in quirks mode.
- `53Q` (50px) and `55q` (52px) are 3 characters each.
- No space needed in `-24-231`.

## If you try it at home

The cross is a glyph from the default font, and that font is not the same on every system. In the latest Chrome on a Mac (version 156 when this was written), the default font is Times: writing `font:909% Times` instead of `909%a` gives the exact same picture, and `Arial` moves the cross again. With Times, the cross comes out about 124×125, at x 38 to 161 and y 98 to 222: 8px too low, so the match breaks. The target's cross is 120×120 at (40, 90), with 59px arms, and the animation above uses that geometry. On the CSS Battle judge, the solution is a 100% match.
