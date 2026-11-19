---
title: "The gray is a shadow: a red plane in 162 characters"
ref: 2026-04-18
permalink: /2026/04/18/the-gray-is-a-shadow/
description: "How html's red covers the canvas, its 288px gray shadow leaves only the base, and the same shadow at font size 0 cuts the gap next to the q, in the April 18, 2026 CSS Battle target."
target: /assets/targets/2026-04-18.png
target_url: https://cssbattle.dev/play/qX9Q0vPeBfPjer7a5TFA
colors: ["#e75044", "#e5e5e3"]
player: fmata
chars: 162
score: 685.41
match: 100
code: |
  <q><style>*{background:#E75044;box-shadow:-32q 0 0 36CH#E5E5E3;margin:225 130 25;*{border-radius:1in 1in 0 0;margin:-100-60 100;*{margin:90;padding:100 40}font:0'
---

The April 18 target is a red plane on a light gray background: a fuselage with a round top, two wings, a gap between the left wing and the fuselage, and a base. fmata paints the whole canvas red and makes the gray with a shadow: html's shadow covers everything except html's own box, the base. One `box-shadow` serves html, body and the q. Its size is `36CH`: 288px for html, and 0 for body and the q, whose font size is 0.

With **Wide view**, html's shadow shows its real size, far beyond the canvas. With **Teaching colors**, each box and each shadow gets its own color.

{% include animations/2026-04-18.html lang=page.lang %}

## The code, spaced out

```css
<q>                                 /* a q in body; the style ends up inside it */
<style>
* {                                 /* html, head, body, q, style */
  background: #E75044;              /* html's red covers the canvas */
  box-shadow: -32q 0 0 36CH#E5E5E3; /* 30.24px to the left; 36CH: 288px for html, 0 below */
  margin: 225 130 25;               /* html: 140 × 50 at (130, 225) */
  * {                               /* head, body, q, style */
    border-radius: 1in 1in 0 0;     /* 96px, cut down to 50px (body) and 40px (q) */
    margin: -100-60 100;            /* body: 260 × 50 at (70, 125) */
    * {                             /* q, style */
      margin: 90;                   /* q: x = 70 + 90 = 160 */
      padding: 100 40;              /* 80 wide, from y = 25 to 225 */
    }
    /* font size 0: 36CH is 0 here; the end of the code closes the string and both rules */
    font: 0'
```

## How it works

### 1. Five elements, three boxes

CSS Battle pages have no doctype, so they are in quirks mode, where unitless lengths in margins and padding count as pixels.

`<q>` opens a q in body, and `<style>` ends up inside the q. The page has html, head, body, q and style. head and style are not displayed. Only three boxes show: html, body and the q.

The top-level `*` matches all five. The nested `*{` means `* *`: any element inside another one, so head, body, q and style. The next level, `* * *`, needs two ancestors: q and style. All these selectors have the same specificity, 0, so the later declaration wins. body takes `margin:-100-60 100` over `margin:225 130 25`, and the q takes `margin:90` over both.

### 2. A red canvas

The top-level rule gives all three boxes the red background. html is the root, and the root's background is painted on the whole canvas. Before any shadow, the canvas is all red.

### 3. html: 140 × 50, at the bottom

`margin:225 130 25` leaves html 400 − 130 − 130 = 140px wide, from x = 130 to 270. In quirks mode, html stretches to the height of the viewport, minus its margins: 300 − 225 − 25 = 50. It runs from y = 225 to 275. With `margin:225 130 45`, getBoundingClientRect gives html 30px tall: 300 − 225 − 45.

That box is the base.

### 4. The gray is html's shadow

`box-shadow:-32q 0 0 36CH#E5E5E3` moves the shadow 32q to the left, with no blur, and grows it by `36CH`. 1Q is a quarter of a millimeter, so 32q is 8mm, 30.24px. html keeps the browser's 16px font, and getComputedStyle gives a 288px spread: 1ch is 8px there.

The shadow is html's box, moved 30.24px left and grown by 288px on each side: from x = 130 − 30.24 − 288 = −188.24 to 270 − 30.24 + 288 = 527.76, and from y = 225 − 288 = −63 to 275 + 288 = 563. It covers the whole canvas in gray.

A box-shadow is never painted under its own box. html's box keeps the red of the canvas: the base.

### 5. body: the wings

`* *` gives body `margin:-100-60 100`: −100 on top, −60 on the sides, 100 at the bottom. body starts at x = 130 − 60 = 70 and is 140 + 120 = 260px wide. Its top is at 225 − 100 = 125.

In quirks mode, body stretches too: to the viewport height, minus html's margins and its own. 300 − 225 − 25 + 100 − 100 = 50. body runs from y = 125 to 175, and its red background covers html's shadow there.

`border-radius:1in 1in 0 0` asks for 96px on the two top corners. Two 96px radii on a 50px tall side are too big, so both are scaled down to 50px. The left end is a quarter circle from x = 70 to 120, the right end one from 280 to 330.

`font:0'` sets the font size of body and the q to 0, so their `36CH` is 0. body's shadow is just its box, moved 30.24px to the left, in gray. It falls on html's gray shadow and doesn't show: with `body{box-shadow:none!important}` added, the picture is the same.

### 6. The q: the fuselage

The q is inline. `* * *` gives it `margin:90` and `padding:100 40`. On the sides, they push it to x = 70 + 90 = 160 and make it 40 + 40 = 80px wide: it has no text, and at font size 0 its quote marks have no width. getBoundingClientRect gives 160, 25, 80 × 200.

The vertical margin and padding of an inline box don't change the line. With a font size of 0, the line sits at body's top, y = 125, with no height. The padding is painted around it: 100px up to y = 25, 100px down to y = 225, where the base starts.

The 96px radii on an 80px wide box are cut down to 40px: the top is a half disc.

### 7. The q's shadow: the gap

The q gets the same shadow, with a spread of 0: its box moved 30.24px to the left, from x = 160 − 30.24 = 129.76 to 209.76, and from y = 25 to 225. It is not painted under the q, so only the strip from 129.76 to 160 shows.

Inline content is painted after body's background, so the strip is gray on top of body's red. It cuts the gap between the left wing and the fuselage. Above and below body, it is gray on gray. With `q{box-shadow:none!important}` added, 1,550 pixels change: the gap is red.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `box-shadow` for three boxes. `36CH` follows the font: 288px for html, 0 for body and the q. With `3in`, 288px for every box (161 characters, one fewer), the q's shadow also covers body and the base: only the fuselage is left, and 13,494 pixels change.
- `box-shadow` takes no unitless numbers, even in quirks mode. With `-30` (161 characters), the declaration is dropped: there is no shadow at all, the canvas is all red, and 91,469 pixels change. `-32q` is 4 characters, `-30px` 5. With `-30px` (163 characters), 50 pixels change, all in column x = 129, from y = 125 to 174.
- `font:0'` is 7 characters, `font-size:0` 11. With `font-size:0` (166 characters), the picture is the same. The `font` shorthand needs a family: here `''`, an empty string, and the end of the code closes it, so one quote is enough. With `font:0''` (163 characters), the picture is the same. `font:0` alone (161 characters) is dropped: getComputedStyle gives body a 16px font. body and the q then get 288px shadows too, only the fuselage is left, wider and taller, with its quote marks, and 13,367 pixels change.
- The margins set the heights. html's 25px bottom margin makes it 50px tall. With `margin:225 130` (159 characters), the bottom margin is 225 too: html and body are 0 tall, only the fuselage is left, and 13,494 pixels change. body's 100px bottom margin cancels its −100 top margin. With `margin:-100-60` (158 characters), the bottom margin is −100 too: body is 250px tall, from y = 125 to 375, and 22,279 pixels change.
- `<q>` is inline. With `<p>` (162 characters, the same length), the p is a block: its 90px top margin collapses with body's −100, body and the p start at y = 225 − 10 = 215, and 32,432 pixels change.
- `1in` is 3 characters, `96px` 4. Both are cut down to the same radii: with `96px 96px` (164 characters), the picture is the same.
- Quirks mode takes unitless numbers in margins and padding. With `px` on the 9 numbers, and the space that `-100px -60px` then needs (181 characters), the picture is the same.
- Negative numbers need no space before them, and the color needs none before `#`. With `-100 -60` and `36CH #E5E5E3` (164 characters), the picture is the same.
- The code ends inside the string and two rules: the end of the code closes them. With `font:0''}}` (165 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes at the same place as the target, with the same flat colors: (231, 80, 68) and (229, 229, 227). 323 pixels differ by more than 8 levels. 273 of them are on the three curves: 123 on the top of the fuselage, 81 on the left wing and 69 on the right wing. The target's curves have almost no anti-aliasing: the target has 32 distinct colors, my render 154. The largest difference is 119 levels, at (164, 46) on the top of the fuselage: (229, 191, 187) in my render, close to the gray, and (231, 80, 68) in the target, the red. The other 50 are in column x = 129, from y = 125 to 174. The gap starts at x = 129.76, so my render mixes the two colors in that column, for example (230, 115, 105) at (129, 150), where the target has the red. With `-30px` instead of `-32q`, these 50 pixels no longer differ from the target by more than 8 levels. The CSS Battle judge gives the official code a 100% match.
