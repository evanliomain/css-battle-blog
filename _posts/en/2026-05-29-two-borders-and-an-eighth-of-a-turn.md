---
title: "Two borders and an eighth of a turn: a framed chevron in 117 characters"
ref: 2026-05-29
permalink: /2026/05/29/two-borders-and-an-eighth-of-a-turn/
description: "How one border rule gives html a full cream frame and body only two sides, turned 45 degrees into a chevron, while body's background paints the pink canvas, in the May 29, 2026 CSS Battle target."
target: /assets/targets/2026-05-29.png
target_url: https://cssbattle.dev/play/1kUrMKG4FIFzxFo0PXVn
colors: ["#f3ead2", "#cf596a"]
player: levito
chars: 117
score: 731.15
match: 100
code: |
  <style>*{margin:40 90;border:5ch solid#F3EAD2;*{margin:53 0-53;border-width:40 0 0 40;rotate:45deg;background:#CF596A
---

The May 29 target shows a thick cream frame on pink, with a cream chevron inside that points up and leaves a pink triangle below it. Veit Lehmann gives html and body the same 40px cream border. html keeps all four sides: that is the frame. body keeps only its top and left sides, an L, and an eighth of a turn makes it the chevron.

With **Teaching colors**, html's frame and body's two borders each get their own color.

{% include animations/2026-05-29.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                            /* html, head, body, style */
  margin: 40 90;               /* html: 220 × 220 at (90, 40) */
  border: 5ch solid#F3EAD2;    /* 5ch = 40px: html's frame; body: style and color */
  * {                          /* * *: head, body, style (not html) */
    margin: 53 0-53;           /* body: 140 × 140 at (130, 133) */
    border-width: 40 0 0 40;   /* body: top and left only, an L */
    rotate: 45deg;             /* body: the L becomes a chevron */
    background: #CF596A        /* body's, painted on the canvas */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `40` in a margin or a border width is read in px.

The page has html, head, body and style. head and style are not displayed. `*` matches all four: html and body both get the first margin and the border. The nested `*{` means `* *`: any element inside another one. That is head, body and style, but not html. So the second margin, the border widths, the turn and the background go to body only. Its margin replaces the first one.

The `<style>` is never closed, and neither are the two rules: the end of the code closes them.

### 2. html's frame

`margin:40 90` sets 40px at the top and the bottom, 90px on the sides. In quirks mode, html fills the page minus its margins: 400 − 180 = 220 wide, 300 − 80 = 220 tall. I measured it: 220 × 220, at (90, 40).

`border:5ch solid#F3EAD2` gives it a cream border. `ch` is the width of the "0" in the current font. With no font set, that is Times at 16px, and in my Chrome `5ch` computes to 40px: one `ch` is 8px. The frame's hole is 220 − 80 = 140 on each side, at (130, 80).

### 3. The pink canvas

`background:#CF596A` is in the nested rule, so only body gets it. html has no background. In that case, the browser paints body's background on the whole canvas, and body's own box paints none.

I checked: with `<style>html{background:#CF596A}</style>` added in front of the code, the canvas keeps the same pink, but body now paints its own pink square. It covers the frame below the chevron's arms: 4,872 pixels change.

### 4. body's box

body's margin is `53 0-53`: 53px at the top, 0 on the sides, −53px at the bottom. In quirks mode, body fills html's content box minus its vertical margins. Its height is 140 − (53 − 53) = 140, and its width is 140. I measured it: 140 × 140, at (130, 133).

So body starts 53px below the top of the hole and ends at y = 273. That is 53px below the hole, past html's bottom border, which runs from y = 220 to 260.

### 5. An L

body matches both rules. From the first one, it gets the border: 40px, solid, cream (body has the same 16px font, so `5ch` is 40px again). The nested rule then sets `border-width:40 0 0 40`: 40px at the top, 0 on the right, 0 at the bottom, 40px on the left. Only two sides are left, and they make an L.

### 6. The turn

`rotate:45deg` turns body around its center. The default origin is the middle of its box: (130 + 70, 133 + 70) = (200, 203). The turn is clockwise, so the corner of the L goes to the top.

The outer tip is at 203 − 70√2 = 104, and the inner tip at 203 − 30√2 = 160.6. I measured the turned box: from (101, 104) to (299, 302). Its side corners, at x = 101 and 299, sit inside html's side borders, which run from 90 to 130 and from 270 to 310. Cream on cream, they don't show. The outer edges of the arms meet the sides of the hole at y = 174. The bottom corner is at y = 302, 2px off the canvas.

### 7. The triangle

body's inside is clear: its background went to the canvas. Under the chevron, three things show through it, from top to bottom.

From the inner tip, y = 160.6, down to y = 220, it is the pink canvas, seen through html's hole. The inner edges of the arms reach y = 220 at x = 140.6 and 259.4: that is the triangle. From y = 220 to 260, it is html's cream bottom border. Below y = 260, it is the pink canvas again, the same as all around.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One border declaration for two boxes. It gives html its whole frame, and it gives body the style and the color of the chevron. body only needs `border-width` to drop two sides.
- `5ch` is 40px in 3 characters. The `border` shorthand takes no bare numbers, even in quirks mode: with `border:40 solid#F3EAD2` (116 characters), the browser drops the whole declaration on both boxes. No frame, no chevron: the canvas is all pink. 36,788 pixels change. `40px` gives the same picture in 118 characters.
- `border-width` does take bare numbers in quirks mode: `40 0 0 40` needs no units.
- The `-53` cancels the `53` in body's height. With `margin:53 0` (114 characters), body's height would be 140 − 106 = 34px, less than its 40px top border. body is then only that border, 40px tall, and it turns into a diagonal bar. html grows to 226px tall around it. 9,498 pixels change.
- No space before the minus sign: `53 0 -53` gives the same picture in 118 characters.
- The background sits in the nested rule, so html has none and body's goes to the canvas. In the first rule (same length), html gets it too, and body paints its own pink square: I get the same picture as with the `html{background:#CF596A}` check above, and 4,872 pixels change.
- `rotate:45deg` is the short form. `transform:rotate(45deg)` gives the same picture in 128 characters.
- No space before the `#`: `solid #F3EAD2` gives the same picture in 118 characters.
- Nesting keeps the second rule off html. `}body{` instead of `;*{` gives the same picture in 120 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 378 pixels, with the same rule as in the golf notes, by up to 108. All of them are on the four slanted edges of the chevron: 140 on the outer edges, 238 on the inner ones. The flat colors and the straight edges are the same. My render smooths those slanted edges with more in-between shades: 13 colors in all, against 4 in the target. The CSS Battle judge gives the code a 100% match.
