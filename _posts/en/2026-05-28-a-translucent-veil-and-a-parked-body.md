---
title: "A translucent veil and a parked body: a robot head in 197 characters"
ref: 2026-05-28
permalink: /2026/05/28/a-translucent-veil-and-a-parked-body/
description: "How one list of eight box shadows, cast by html and again by a body parked left of the canvas, draws a cyan robot head with a green visor, white eyes and ears on a brown background made by a translucent shadow, in the May 28, 2026 CSS Battle target."
target: /assets/targets/2026-05-28.png
target_url: https://cssbattle.dev/play/oJqUjEVJ7H5lBcSF5CH3
colors: ["#31696b", "#524849", "#fff", "#64dfe3"]
player: h_blierzt
chars: 197
score: 661.18
match: 100
code: |
  <style>*{margin:110 115;background:#31696B;border-radius:4in;color:64DFE3;box-shadow:5ch 0 0 5vh,-5ch 0 0 5vh,0 0 0 2in#7227,454q 55vh 0 74q,597q 0,98vh 0,4in 0#FFF,502q 0#FFF;*{margin:6%484 10-374
---

The May 28 target shows a cyan robot on brown: a wide head with two round ears, a dark green visor with two white eyes, and the top of a round body at the bottom. H_Bliertz draws it all with one list of eight shadows, given to both html and body. html is the visor, and its shadows make the head and a translucent veil that turns the green canvas brown. body is parked off the canvas, on the left, and throws the body, the ears and the eyes from there.

**Wide view** shows both boxes and where every shadow lands, including the ones that miss the canvas. With **Teaching colors**, each cyan shadow gets its own color.

{% include animations/2026-05-28.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                            /* html, head, body, style */
  margin: 110 115;             /* html: 170 × 80.2 at (115, 110) */
  background: #31696B;         /* html's, painted on the canvas */
  border-radius: 4in;          /* 384px: html is a pill, body a round box */
  color: 64DFE3;               /* cyan, for the shadows with no color */
  box-shadow:
    5ch 0 0 5vh,               /* html: right part of the head */
    -5ch 0 0 5vh,              /* html: left part of the head */
    0 0 0 2in#7227,            /* html: the brown veil, 192px wide */
    454q 55vh 0 74q,           /* body: the robot's body */
    597q 0,                    /* body: right ear */
    98vh 0,                    /* body: left ear */
    4in 0#FFF,                 /* body: left eye */
    502q 0#FFF;                /* body: right eye */
  * {                          /* * *: head, body, style (not html) */
    margin: 6%484 10-374       /* body: 60 × 59.8 at (−259, 120.2) */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `110` in a margin is read in px.

The page has html, head, body and style. head and style are not displayed. `*` matches all four: html and body both get the background, the radius, the color and the whole shadow list. The nested `*{` means `* *`: any element inside another one. That is head, body and style, but not html. So the second margin goes to body only, and replaces the first one.

The `<style>` is never closed, and neither are the two rules: the end of the code closes them.

### 2. html, the visor

`margin:110 115` sets 110px at the top and the bottom, 115px on the sides. In quirks mode, html fills the page minus its margins. I measured it: 170 × 80.2, at (115, 110). It is 80.2 and not 80 because of body's fractional margin (part 6): with `10` in place of `6%`, html is exactly 80 tall.

`border-radius:4in` asks for 384px on each corner. That is more than the box can take, so the browser scales it down to half the height, 40.1px: a pill.

html's background, `#31696B`, does not stay in its box. The root element's background is painted on the whole canvas. So the canvas starts all green, and the pill itself paints nothing: it only shows the canvas through.

### 3. The brown veil

The third shadow, `0 0 0 2in#7227`, has no offset and no blur. Its spread, 2in = 192px, grows the pill on every side: from x = −77 to 477 and from y = −82 to 382. That covers the whole canvas.

`#7227` is a 4-digit hex: red #772222 at 0x77 = 47% opacity. Over the green canvas, it gives #524849. That is the brown of the background.

An outer shadow is never painted under its own box. So the pill stays green: that is the visor.

### 4. The head

`color:64DFE3` has no `#`. In quirks mode, the browser still reads it as a color: cyan, #64DFE3. A shadow with no color uses the current color, so the five shadows written without one are cyan.

`5ch 0 0 5vh` copies the pill 40px to the right (`ch` is 8px in the default font, Times at 16px) and spreads it by 5vh = 15px. `-5ch 0 0 5vh` does the same to the left. Each copy is a 200 × 110.2 pill. Together they make the head, from x = 60 to 340 and from y = 95 to 205.2.

In a shadow list, the first shadow is painted on top. These two come before the brown veil, so they cover it.

### 5. html's other shadows

html also gets the last five shadows. They are made for body, and their offsets are huge. On html they all land past x = 409, off the canvas on the right. The farthest one, `597q 0`, ends at x = 849.

### 6. body, parked off the canvas

body's margin is `6%484 10-374`. A percentage margin is taken from the width of the parent's content box: 6% of 170 = 10.2. So body has 10.2px at the top, 484px on the right, 10px at the bottom and −374px on the left.

Its width is 170 − 484 + 374 = 60. In quirks mode, body also fills the page height minus html's margins and its own: 300 − 220 − 10.2 − 10 = 59.8. I measured it: 60 × 59.8, at (−259, 120.2). With the same `4in` radius, scaled down to 29.9px, it is a round box. It also paints its own green background, off the canvas: only the root's background goes to the canvas.

body gets the same eight shadows. Its first three stay off the canvas, on the left. The head pills end at x = −144, and its brown veil at x = −7.

### 7. Shadows thrown from far away

body's center is at (−229, 150.1). Every other shadow is a copy of this round box, moved by its offset:

- `454q 55vh 0 74q`: 454q = 429px to the right, 55vh = 165px down, spread by 74q = 69.9px. That makes a disc about 200px wide, centered at (200, 315.1). Its top is at y = 215.3, and the bottom of the canvas cuts it: the robot's body.
- `597q 0`: 564.1px to the right, the right ear, centered at x = 335.1.
- `98vh 0`: 294px to the right, the left ear, centered at x = 65.
- `4in 0#FFF`: 384px to the right, the left eye, white, centered at x = 155.
- `502q 0#FFF`: 474.3px to the right, the right eye, centered at x = 245.3.

The ears and the eyes are 60px round boxes, at body's height: y = 150.1.

body comes after html in the page, so its shadows are painted on top of html's. The eyes cover the visor, and the ears cover the ends of the head.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list for two boxes. html uses the first three, body the last five, and the others fall off the canvas. With two lists, `box-shadow:5ch 0 0 5vh,-5ch 0 0 5vh,0 0 0 2in#7227;*{margin:6%484 10-374;box-shadow:454q 55vh 0 74q,597q 0,98vh 0,4in 0#FFF,502q 0#FFF`, I get the same picture in 208 characters.
- body has to sit far enough to the left. Its own brown veil is third in its list, so it would be painted over its ears and eyes too. With `3in` instead of `2in` (same length), body's veil reaches x = 89: the brown on the left of the canvas gets a second coat (#633637), and the left ear and the left end of the head turn grey-blue (#6d8789). 23,057 pixels change.
- `color:64DFE3` makes cyan the default color of the shadows. Writing `#64DFE3` on the five cyan shadows instead, with no `color`, gives the same picture in 219 characters. With the `#` kept in `color:#64DFE3`, it is 198.
- `#7227` is 5 characters. The opaque brown it gives, `#524849`, takes 7: the same picture in 199 characters.
- The order matters. With the brown veil first in the list (same length), it is painted over the head: the head turns grey-blue, #6d8789, while body's ears stay cyan. 13,138 pixels change.
- Short units: `5ch` is 40px, `5vh` is 15px, `2in` is 192px, `4in` is 384px, `55vh` is 165px and `98vh` is 294px, each shorter than its px value.
- The `q` values are not whole pixels: 454q is 428.98px, 74q is 69.92px, 597q is 564.09px and 502q is 474.33px. With 429px, 70px, 564px and 474px (201 characters), 405 pixels change, by up to 77, on the edges of the disc, the right ear and the right eye.
- No spaces where none are needed: `6% 484 10 -374` gives the same picture in 199 characters. The same goes for `2in#7227` and `0#FFF`, where the `#` needs no space before it.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 1,282 pixels, with the same rule as in the golf notes, by up to 202. All of them are on round edges: 378 around the eyes, 296 on the disc, 226 on the visor's edge, 201 on the head and 181 on the ears. The flat colors match, except that my brown is #524849 and the target's is #534848, one step off on each channel. My render smooths the edges with many more in-between shades: 497 colors in all, against 92 in the target. The CSS Battle judge gives the code a 100% match.
