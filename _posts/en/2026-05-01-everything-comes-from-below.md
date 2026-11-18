---
title: "Everything comes from below: a mushroom in 137 characters"
ref: 2026-05-01
permalink: /2026/05/01/everything-comes-from-below/
description: "How html, placed below the canvas, and body, even lower, draw a whole mushroom with one list of four shadows, in the May 1, 2026 CSS Battle target."
target: /assets/targets/2026-05-01.png
target_url: https://cssbattle.dev/play/9uxpzCk6QS8kVAha3NmW
colors: ["#3a6430", "#fbfae2", "#7dd8c1", "#a34f50"]
player: beo
chars: 137
score: 708.39
match: 100
code: |
  <style>*{margin:75%0-1338;box-shadow:0-53q#3A6430,0-4in 0-180q#FBFAE2,0-5in#7DD8C1,0-9in#A34F50;*{border-radius:9in 9in 0 0;margin:614 90
---

The May 1 target is a mushroom on a light teal background: a dark red half disc for the cap, a cream stem, and a dark green strip of ground at the bottom. Beo puts html entirely below the canvas, and body even lower. Nothing has a background. Everything you see is a shadow that climbs up from there: html's copies make the background, the stem and the ground, and body's copy makes the cap.

**Wide view** shows where html and body really are. With **Teaching colors**, body's copies get their own color.

{% include animations/2026-05-01.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, head, style, body */
  margin: 75%0-1338;             /* html: 300 on top, 0 on the sides, -1338 at the bottom */
  box-shadow:
    0-53q#3A6430,                /* green, 50.08px up: the ground */
    0-4in 0-180q#FBFAE2,         /* cream, 170.08px smaller on each side, 384px up: the stem */
    0-5in#7DD8C1,                /* teal, 480px up: the background */
    0-9in#A34F50;                /* red, 864px up: on body, the cap */
  * {                            /* head, style, body */
    border-radius: 9in 9in 0 0;  /* scaled down to 110px: a half disc */
    margin: 614 90               /* body: 220 × 110 at (90, 914) */
  /* the end of the code closes the two rules */
```

## How it works

### 1. Two boxes, one rule

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `614` in a margin is read in px.

The `<style>` goes into head, and body stays empty. `*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body. head and style are not displayed. Two boxes are left: html and body. Both get the margin and the shadow list of the first level. body's second margin replaces the first one.

### 2. html, below the canvas

html gets `margin:75%0-1338`. A margin percentage is taken from the width of the containing block, even for the top margin: 75% of 400 = 300. The `%` ends the first number, and the `-` starts a new one, so the three values need no space: 300 on top, 0 on the sides, −1338 at the bottom.

In quirks mode, html fills the page minus its margins. It is 400 wide and 300 − 300 + 1338 = 1338 tall, at y = 300: it starts at the bottom edge of the canvas. Not one pixel of it is on the canvas.

### 3. Four copies, painted in reverse order

A box shadow with no blur is a copy of the box, moved by its offset. The four shadows only move up: 53q, 4in, 5in and 9in. 1Q is a quarter of a millimeter, 0.945px, so 53q = 50.08px. 1in = 96px: 4in = 384px, 5in = 480px, 9in = 864px.

The first shadow of the list is painted on top, the last one at the bottom. The red copy, the lowest, runs from y = 300 − 864 = −564 to 774. The teal copy, above it, runs from −180 to 1158. Both cover the whole canvas. On the canvas, the teal one hides the red one completely: html's red shadow shows nowhere. The teal copy is the background of the picture.

### 4. The stem: a negative spread

The second shadow is `0-4in 0-180q`: no side offset, 4in up, a blur of 0 and a spread of −180q = −170.08px. A negative spread shrinks the copy on every side. The copy is 400 − 2 × 170.08 = 59.84 wide, from x = 170.08 to 229.92. Its top goes down to 300 + 170.08 = 470.08, then moves 384px up: y = 86.08.

The stem's top is far above the cap's bottom edge, at y = 160. The cap hides it (see section 7).

### 5. The ground

The first shadow is the green one, moved 53q = 50.08px up. Its top is at y = 300 − 50.08 = 249.92, and it goes down past the canvas. It is painted above the other copies, so it covers the bottom of the stem. The target has the ground from y = 250.

### 6. body, a half disc far below

The nested `*` gives body `margin:614 90`. In quirks mode, body fills html's height minus its margins: 1338 − 2 × 614 = 110 tall. It is 400 − 2 × 90 = 220 wide, at (90, 300 + 614) = (90, 914).

`border-radius:9in 9in 0 0` asks for 864px on the two top corners and 0 on the bottom ones. Radii that add up to more than a side are all scaled down by the same factor, until they fit. On the top side, 864 + 864 = 1728 for 220px. On the left and right sides, 864 + 0 = 864 for 110px. Both give the same factor, 220 / 1728 = 110 / 864: each top radius becomes 110px. 110 is half the width and the whole height, so body is a half disc. In my Chrome, `110px 110px 0 0` (141 characters) gives exactly the same picture.

### 7. body's copies: the cap

The first `*` also matches body, so body has the same shadow list. A shadow follows the round corners of its box, so its copies are half discs too.

The red copy moves 864px up: 914 − 864 = 50. It runs from y = 50 to 160 and from x = 90 to 310: that is the cap, where the target has it. body is painted after html and its shadows, so the cap covers the top of the stem.

The other copies of body do not show. The teal one lands at y = 914 − 480 = 434 and the green one at 914 − 50.08 = 863.92, both below the canvas. The cream one shrinks by 170.08px on each side: 220 − 340.16 is less than 0, so there is nothing left to paint.

That is why the numbers fit together. 614 and −1338 give body a height of 110, and put it at y = 914, exactly 864px, or 9in, below the cap.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One list for two boxes. html uses the green, cream and teal shadows, body uses the red one. The red copy of html stays under the teal one, and body's other copies fall below the canvas or vanish.
- The background is a shadow too. `,0-5in#7DD8C1` is 13 characters, and `background:#7DD8C1;` is 19. It also has a second job. With `;background:#7DD8C1` after the shadow list instead (143 characters), html's red copy is painted over the canvas background: everything is red except the stem and the ground, and 75,960 pixels change.
- The order of the list matters. With the teal shadow first, `0-5in#7DD8C1,0-53q#3A6430,0-4in 0-180q#FBFAE2,0-9in#A34F50` (137 characters, the same length), the teal copy covers the stem and the ground, only the cap is left, and 25,740 pixels change.
- `75%0` needs no space: the `%` ends the number. With `300 0` (138 characters), the picture is the same.
- `-53q` is 4 characters for 50.08px. With `-50px` (138 characters), the top of the ground moves 0.08px down, and the 400 pixels of row 249 change.
- `-180q` is 5 characters for 170.08px. With `-170px` (138 characters), the stem is 60px wide instead of 59.84, and 180 pixels change, on its two side edges.
- The `0` blur is needed: the spread comes after the blur. With `0-4in -180q` (136 characters), −180q is read as the blur, which cannot be negative, so my Chrome drops the whole list. The canvas stays white, and all 120,000 pixels change. With `0-4in-180q` (135 characters), the same happens.
- `9in 9in 0 0` keeps the bottom corners square. With `border-radius:9in` (129 characters), all four corners are round: the radii shrink to 55px, the cap turns into a pill, and 5,153 pixels change. With `50%50%0 0` (135 characters), each top radius is 110px wide and 55px tall: the cap gets straight sides and a flatter top, and 2,886 pixels change.
- Any big radius works, since it is scaled down to 110px anyway. With `2in 2in 0 0` (137 characters, the same length), the picture is the same.
- No space is needed before `#`: `0-53q#3A6430`. With a space before each of the four colors (141 characters), the picture is the same.
- The nested `*` reaches body in 1 character. With `body{` (140 characters), the picture is the same.
- Bare numbers in the margins, thanks to quirks mode. With `300px 0 -1338px` and `614px 90px` (147 characters), the picture is the same. With a doctype in front (152 characters), my Chrome drops the margins: html is 400 × 8 at the top, its copies all move up off the canvas, the canvas stays white, and all 120,000 pixels change.
- The code ends inside two rules: the end of the code closes them. With `}}` at the end (139 characters), the picture is the same.

## If you try it at home

In my local Chrome (version 157 when this was written), the official code is close but not pixel-exact: 891 pixels are more than 8 off the target in one channel. 578 of them are on straight edges. The ground's top is at y = 249.92, where the target has 250, and the stem's sides are at x = 170.08 and 229.92, where the target has 170 and 230. In a test copy with `-50px` and `-170px` (139 characters), these 578 pixels match the target.

The other 313 pixels are on the curved edge of the cap. A test page with only a plain red half disc of radius 110 at the same place, drawn as a background and not as a shadow, differs from the target on the same 313 pixels. So the gap is in how the curved edge itself is drawn, not in the shadow. The CSS Battle judge gives the official code a 100% match.
