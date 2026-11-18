---
title: "800px on html, 40px on body: 3D glasses in 171 characters"
ref: 2026-04-29
permalink: /2026/04/29/800px-on-html-40px-on-body/
description: "How one background with a radial and a conic gradient, given to html and body, draws 3D glasses: a 0.8px font turns body's 50em into 40px while html's stays 800px, in the April 29, 2026 CSS Battle target."
target: /assets/targets/2026-04-29.png
target_url: https://cssbattle.dev/play/kiTJEWkAtBIFyjQqVDNA
colors: ["#e3dcd1", "#0d2a58", "#5cf2f7", "#d95f5b"]
player: wi328v9RQHXQ73SxzWKIKa6m6jg1
chars: 171
score: 678.39
match: 100
code: |
  <style>*{background:radial-gradient(1q at bottom,#E3DCD1 50em,#0D2A58 0 74q,#0000),conic-gradient(#5CF2F7 50%,#D95F5B 0)50%/70vw 57%space#0D2A58;*{margin:30%30 40;font:5%'
---

The April 29 target is a pair of 3D glasses on a beige background: a navy frame, a red lens on the left, a cyan lens on the right, and a half-disc notch at the bottom for the nose. James Whitehead gives html and body the same background, a radial gradient over a conic one. On html, it is beige everywhere. On body, a tiny font turns the same `50em` from 800px into 40px, and the radial gradient becomes the notch and its navy ring.

With **Teaching colors**, the boxes, the conic tile and the two parts of the radial circle get their own color.

{% include animations/2026-04-29.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                      /* html, head, style, body */
  background:
    radial-gradient(1q at bottom,        /* a circle, centered on the middle of the bottom edge */
      #E3DCD1 50em,                      /* beige up to 50em: 800px on html, 40px on body */
      #0D2A58 0 74q,                     /* then navy, up to 69.92px */
      #0000),                            /* then transparent */
    conic-gradient(#5CF2F7 50%,#D95F5B 0) /* cyan right half, red left half */
      50%/70vw 57%space                  /* one 280 × 79.8 tile, centered */
    #0D2A58;                             /* navy, under both gradients */
  * {                                    /* head, style, body */
    margin: 30%30 40;                    /* body: 340 × 140 at (30, 120) */
    font: 5%'                            /* 0.8px, and an empty font name */
  /* the end of the code closes the string and the two rules */
```

## How it works

### 1. Two boxes, one background

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `30` in a margin is read in px.

`*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body. head and style are not displayed. Two boxes are left, html and body, and they get the same `background`.

That background has three layers. The first one is painted on top: the radial gradient. Under it, the conic gradient. At the bottom, the color `#0D2A58`.

### 2. html: beige everywhere

The radial gradient is a circle, beige up to `50em`. An em is the element's font size, and html keeps the default one, 16px. So on html, 50em = 800px. The whole canvas is less than 800px from the center of the circle: html's radial layer is beige everywhere, and it hides the two layers under it.

The navy stop, `74q`, is 69.92px, less than 800px: on html, the navy band has no width. In my Chrome, html's computed background shows the stop at 800px.

html's background paints the whole canvas: it is beige.

### 3. body: the frame

The nested `*` gives body `margin:30%30 40`. With three values, the first one is the top, the second one the right and the left, the third one the bottom. A margin percentage is taken from the width of the containing block, even for the top margin: 30% of 400 = 120. The `%` ends the number, so no space is needed before `30`.

body is 400 − 30 − 30 = 340 wide. In quirks mode, body fills the page height minus its margins: 300 − 120 − 40 = 140 tall. It is a 340 × 140 box at (30, 120).

Wherever the two gradients leave a gap, body's background color shows: the navy `#0D2A58` makes the frame.

### 4. The conic tile: the lenses

The conic gradient has its own position and size: `50%/70vw 57%`. 1vw is 1% of the 400px width, so 70vw = 280px. The height is 57% of body's 140px: 79.8px.

`space` repeats only whole tiles and spreads them out. 280 fits once in 340, and 79.8 fits once in 140: there is one tile, and in that case the position places it. `50%`, a single value, applies to both axes and centers the tile: 30px from the left and right edges, so from x = 60 to 340, and (140 − 79.8) / 2 = 30.1px from the top and the bottom. The rest of body is not covered, so the navy shows around the tile.

A conic gradient starts at the top and turns clockwise around the center of its tile, here x = 200. `#5CF2F7 50%` fills the first half, on the right, with cyan. `#D95F5B 0`: a stop can't go back, so the 0 is pushed up to 50%, and red fills the second half, on the left, with a sharp edge between the two.

### 5. font:5%': a 0.8px em

The nested `*` also gives body `font:5%'`. A font size in percent is taken from the parent's: 5% of html's 16px = 0.8px.

The `font` shorthand needs a font name. The `'` opens a string, and the code ends before it is closed: the end of the stylesheet closes it. The name is an empty string, and my Chrome accepts it: body's computed font family is `""`.

So on body, 1em = 0.8px and 50em = 40px. In my Chrome, body's computed background shows the stop at 40px, while html's still shows 800px. The computed font size itself reads 6px, but the em lengths of the gradient use 0.8px.

### 6. The radial circle: the notch and the ring

`1q at bottom` is a circle, centered on the middle of body's bottom edge: (200, 260). A single length makes a circle, and here it is tiny: 1Q is a quarter of a millimeter, 0.945px. Stops given in px still work beyond that size.

- `#E3DCD1 50em`: beige up to 40px. That is the notch, from x = 160 to 240 at the bottom of the frame.
- `#0D2A58 0 74q`: 0 is less than 40px, so it is pushed up to 40px. Navy goes from 40px to 74 × 0.945 = 69.92px: the ring, whose top is at y = 190.08.
- `#0000` has no position, so it goes at the end of the gradient line: 100% of 0.945px. That is less than 69.92px, so it is pushed up to 69.92px. Beyond the ring, the circle is transparent with a sharp edge, and the lenses and the frame show.

body's background stops at the edge of its box, at y = 260: only the top half of the circle is drawn. Below it, html's beige shows through the notch.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One background for two boxes. `;font:5%'` is 9 characters, and it is what makes the same value draw different things on html and body. Without it, and with `40px` in place of `50em` (162 characters), html's background is no longer plain beige: the canvas turns navy, with more red and cyan bands above and below the glasses, and 72,400 pixels change.
- The `'` is 1 character for a font name. Without it (170 characters), my Chrome drops the whole `font` declaration: body keeps the 16px font size, 50em is 800px on body too, body turns all beige, and 45,088 pixels change.
- `5%` is 2 characters for 0.8px. With `.8px` (173 characters), the picture is the same.
- `1q` makes a circle whose gradient line ends almost at once. With `circle` instead (175 characters), the circle reaches body's top corners, 220.2px away, and `#0000` goes there: the navy fades into transparent from 69.92px to 220.2px, over the lenses, and 18,786 pixels change.
- `#0000` ends the navy. Without `,#0000` (165 characters), the navy goes on forever and covers the lenses: 18,786 pixels change.
- `74q` is 3 characters for 69.92px. With `70px` (172 characters), 8 pixels change, on the outer edge of the ring.
- `#D95F5B 0` lets the red start where the cyan stops. With `#D95F5B 50%` (173 characters), the picture is the same.
- `space` is 5 characters and leaves one tile. With `no-repeat` (175 characters), the picture is the same.
- `57%space` needs no space: the `%` ends the number. `20vwspace` (172 characters) is read as one number with an unknown unit, `vwspace`: my Chrome drops the whole background, and the canvas is white. `20vw space` (173 characters) works.
- `50%` is 3 characters. With `center` (174 characters), the picture is the same.
- `70vw` is 4 characters for 280px. With `280px` (172 characters), the picture is the same.
- `30%30 40` is 8 characters. With `120 30 40` (172 characters), the picture is the same.
- No space is needed before `#`: `space#0D2A58`. With a space (172 characters), the picture is the same.

## If you try it at home

The target image is a PNG. In my local Chrome (version 157 when this was written), the official code differs from it on 303 pixels by more than 8 in one channel. 155 of them are on the row y = 229, at the bottom of the lenses. The tile is 79.8px tall: my Chrome starts it at y = 150, and the row y = 229 is only partly colored, (176, 84, 90) instead of (217, 95, 91) on the red side. In a test copy with `20vw space` (173 characters), an 80px tall tile, this row matches the target, except 2 pixels on the edges of the ring and the notch. The other 148 pixels lie within 1.5px of the two circle edges, where the target's edge pixels have other shades. The CSS Battle judge gives the official code a 100% match.
