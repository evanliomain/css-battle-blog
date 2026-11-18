---
title: "Five typed periods: a password field in 125 characters"
ref: 2026-06-05
permalink: /2026/06/05/five-typed-periods/
description: "How html's two shadows draw a password field, and how five periods in a 120px font fill it, in the June 5, 2026 CSS Battle target."
target: /assets/targets/2026-06-05.png
target_url: https://cssbattle.dev/play/IgyOIJdxXjX2em7d88fk
colors: ["#326", "#9c85e2", "#fff"]
player: h_blierzt
chars: 125
score: 721.52
match: 100
code: |
  .....<style>&{margin:125 60;color:#326;border-radius:11q;box-shadow:0 0 0 11q,0 0 0 9in#9C85E2;*{margin:-76 10;font:900 127q'
---

The June 5 target is a password field on light purple: a white box with round corners, a dark purple outline, and five dark dots on the left. H_Bliertz draws the field with html alone. One shadow is the outline, a second one is the purple background, and the white is just the canvas. The dots are text: five periods, typed at the start of the code and set in a 120px bold font.

Use **Teaching colors** to tell html's ring from the text, and **Wide view** to see the purple shadow spread far past the canvas.

{% include animations/2026-06-05.html lang=page.lang %}

## The code, spaced out

```css
.....                          /* body's text: five periods */
<style>
& {                            /* html */
  margin: 125 60;              /* 280 × 50 at (60, 125) */
  color: #326;                 /* for the ring and the text */
  border-radius: 11q;          /* 11q = 10.39px */
  box-shadow:
    0 0 0 11q,                 /* a 10.39px ring, in #326 */
    0 0 0 9in#9C85E2;          /* 864px of purple all around */
  * {                          /* everything inside html */
    margin: -76 10;            /* body: 260 wide at (70, 49) */
    font: 900 127q'            /* bold, 120px, an empty font name */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `125` is read in px.

The parser builds html > head and body. The five periods are text, so they go into body. The style element ends up in body too, after them.

At the top level, `&` stands for the root: html. The nested `*{` means `& *`: every element inside html, so head, body and style. head and style are not displayed. Only body shows, with its text.

### 2. html

`margin:125 60` puts html at (60, 125). It is 400 − 2 × 60 = 280 wide.

There is no `height`. In quirks mode, html fills the height of the window, minus its margins: 300 − 2 × 125 = 50. I measured html: 280 × 50 at (60, 125). I checked the quirk too: with `margin:100 60`, html becomes 300 − 200 = 100 tall.

### 3. The ring

The first shadow, `0 0 0 11q`, has no offset, no blur and no color. A shadow with no color uses the element's `color`: here `#326`, the short form of `#332266`.

Its spread is 11q = 11 × 0.945 = 10.39px. A spread grows the shadow on every side. An outer shadow is never painted under its own box, so what is left is a ring, 10.39px thick, all around html. `border-radius:11q` rounds html's corners, and the ring follows their curve.

### 4. The purple background

The second shadow, `0 0 0 9in#9C85E2`, has a spread of 9in = 9 × 96 = 864px. It is second in the list, so it is painted under the first one: the ring stays on top.

html is never more than 125px from a canvas edge, so this shadow covers the whole canvas, and much more. It is not painted under html's box either. html has no background, so nothing paints the middle: the white there is the canvas.

### 5. body

`& *` gives body `margin:-76 10`. body starts at x = 60 + 10 = 70 and is 280 − 20 = 260 wide. Its top is 125 − 76 = 49.

In quirks mode, body also fills html: 50 + 2 × 76 = 202 tall. I measured body: 260 × 202 at (70, 49). That height does not show. What counts is the top: body's text starts there, so the line of periods begins at y = 49.

### 6. Five big periods

body's text inherits `color:#326` from html. `font:900 127q'` sets three things:

- `900`: the boldest weight. Thick periods.
- `127q`: 127 × 0.945 ≈ 120px. Chrome gives `120px` as the computed size.
- `'`: it opens a font name. The code ends right after it, and the end of the code closes the string. The name is empty, no font has that name, so Chrome uses its default font. In my Chrome, that is Times: `127q Times` gives the same picture.

In that font, a period moves the pen 30px. The line is 138 tall: 108 above the baseline and 30 below. The baseline is at 49 + 108 = 157. The ink of a period is 20.27px wide and sits from y = 138.43 to 158.70, just on the baseline. The first one goes from x = 79.55 to 99.82, and the next ones follow every 30px.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One element draws the whole field: html, with two shadows. The white is the canvas, so there is no background to paint.
- The quirk gives html its height for free: 300 − 2 × 125 = 50, with no `height`.
- The dots are text. `.....` is 5 characters for five filled discs, and `color` serves both the ring and the text.
- `&` is html in 1 character. `html{` instead of `&{` gives the same picture in 128 characters.
- `11q` is 10.39px in 3 characters. With `10px` in both places (127 characters), 773 pixels change, all on the ring: 566 along its outer straight edges and 207 in its corners.
- `127q` is 120px in 4 characters. `120px` gives the same picture in 126 characters.
- `900` is 3 characters. `bold` gives the same picture in 126 characters. Without a weight (`font:127q'`, 121 characters), the periods get thinner: 1,190 pixels change.
- The `font` shorthand needs a font name, and `'` is one in 1 character. Without it (124 characters), the declaration is invalid and the text keeps its 16px size: 1,910 pixels change. The big periods are gone, and five tiny ones sit at the top of body.
- `#326` is `#332266` in 4 characters.
- No space before `#`: `9in#9C85E2`. With a space, the same picture in 126 characters.
- Bare numbers in margins: `margin:125px 60px` and `margin:-76px 10px` give the same picture in 133 characters.
- The code stops right after `'`. The end of the code closes the string, the rules and the style element.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 2,046 pixels, with the rule of the golf notes. 117,954 of the 120,000 pixels are identical. The differences:

- 1,275 pixels around the periods. In the target, each period is a 20px disc, centered at y = 150, the first one at x = 85. In my render, the first period's ink is 20.27px wide, centered at (89.69, 148.56). The periods are 4.69px further right and 1.44px higher.
- 771 pixels on the ring: 566 along its outer straight edges, 205 in its corners. With `10px` in place of both `11q`, the straight edges match the target: the ring in the target is 10px thick, not 10.39px. 167 pixels still differ in the corners.

The CSS Battle judge gives the code a 100% match.
