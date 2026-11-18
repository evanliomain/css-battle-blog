---
title: "A body on its corner: a keyhole in 117 characters"
ref: 2026-06-09
permalink: /2026/06/09/a-body-on-its-corner/
description: "How one radial-gradient draws three rings on html, how an almost transparent green paints the hole, and how the same gradient on a turned body cuts the V notch, in the June 9, 2026 CSS Battle target."
target: /assets/targets/2026-06-09.png
target_url: https://cssbattle.dev/play/NQ2Ai87FxvvPrXme8fHQ
colors: ["#4c4c6b", "#4a9a86", "#ebf6f0"]
player: emohdaziz
chars: 117
score: 731.15
match: 100
code: |
   <style>*{*{rotate:45deg;margin:58%3-325}background:radial-gradient(1Q,#6b82 5ch,#4c4c6b 0 74Q,#4a9a86 0 25vw,#ebf6f0
---

The June 9 target looks like a keyhole: a green ring and a violet ring around a pale hole, on a very pale green background, with a V notch open at the bottom. Mohamed Ali draws it with one background for every element. On html, a radial-gradient draws the rings. body gets the same gradient, but it is a big box turned on its corner, and only its pale last color reaches the canvas: its top corner cuts the notch.

Use **Wide view** to see body below the canvas, with its own rings, and **Teaching colors** to tell body apart from the background.

{% include animations/2026-06-09.html lang=page.lang %}

## The code, spaced out

```css
&nbsp;<style>                         /* a real no-break space: 1 character */
* {                                   /* html, head, body, style */
  * {                                 /* * *: head, body, style */
    rotate: 45deg;
    margin: 58%3-325;                 /* 232 at the top, 3 on the sides, −325 at the bottom */
  }
  background: radial-gradient(
    1Q,                               /* size: a circle of 0.945px */
    #6b82 5ch,                        /* #66bb88 at 34/255, up to 40px */
    #4c4c6b 0 74Q,                    /* violet up to 69.92px */
    #4a9a86 0 25vw,                   /* green up to 100px */
    #ebf6f0                           /* pale green beyond */
```

## How it works

### 1. The elements

CSS Battle pages have no doctype, so they are in quirks mode, and a bare number like `325` is read in px.

The code starts with a no-break space. For the HTML parser it is text, not a blank, so the body opens right there and the `<style>` ends up inside it. The page has html, head, body and style. head and style are not displayed.

`*` gives all of them the same background. `*{*{…}}` is a nested rule: `* *`, every element inside another one. That is head, body and style, so the turn and the margins only show on body.

### 2. Rings on html

In quirks mode, html fills the canvas: I measured it at 400 × 300. Its background is the radial-gradient, centered on its box, at (200, 150).

`radial-gradient(1Q, …)` starts with a size. A single length makes a circle, here of radius 1Q = 0.945px. The color stops are lengths too, measured from the center. They can go far beyond that tiny circle:

- `#6b82` up to 5ch. In the default 16px Times font, 1ch is 8px, so 5ch = 40px;
- `#4c4c6b 0 74Q`: the `0` puts the start of the violet at the end of the previous color, so the edge is hard. It goes up to 74Q = 74 × 0.945 = 69.92px;
- `#4a9a86 0 25vw`: green, again with a hard edge, up to 25% of 400 = 100px;
- `#ebf6f0` has no position. A last stop sits at 100% of the gradient size, here 1Q. A stop can't come before the previous one, so it is pushed up to 100px: one more hard edge.

In my render the hole ends at 40px, the violet at 70px and the green at 100px, around (200, 150).

### 3. The hole

`#6b82` is a four-digit hex color: #66bb88 with an alpha of 0x22 = 34/255, about 13%. Under html's background, the canvas is white. 13% of green over white gives (234, 246, 239), and that is what I read in my render, inside the hole. The background color, `#ebf6f0`, is (235, 246, 240). At one unit apart, the hole looks like the background.

### 4. A big body box

body gets `margin:58%3-325`, three values: 58% at the top, 3 on the sides, −325 at the bottom. A margin in % is a share of the parent's width, even at the top: 58% of 400 = 232.

In quirks mode, body stretches to fill html's height, minus its margins: 300 − 232 − (−325) = 393. The negative bottom margin makes body taller. It is 400 − 2 × 3 = 394 wide. I measured it: 394 × 393 at (3, 232), so its center is at (200, 428.5), below the canvas.

### 5. body's background

body has the same gradient, centered on its own box: rings around (200, 428.5), all off the canvas. The canvas ends at y = 300, which is 128.5px from that center, more than 100. So on the canvas, body only shows its last color, the same pale green as the background.

### 6. On its corner

`rotate:45deg` turns body around its center. The top corner of a 394 × 393 box turned by 45° is half the sum of its sides divided by √2 above the center: (394 + 393) / 2√2 = 278.25. It lands at 428.5 − 278.25 = 150.25, a quarter of a pixel below the center of the rings. I measured the turned box: its top is at y = 150.253.

The two top sides go off at 45° to the left and to the right. They draw a right angle, and the pale body covers the rings below it: the V notch.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `background` does two jobs. On html it draws the rings. On body, only its last color reaches the canvas, so the same gradient paints the pale V.
- The no-break space is the first character. A plain space, also 117 characters, is dropped by the parser, and I get the same result as with nothing there (116 characters): the `<style>` goes into head and body is empty. In my Chrome, html is then 532px tall instead of 300, the center of the rings moves down to y = 266, and 19,774 pixels change.
- `1Q` makes the gradient a circle in 2 characters, and it also puts the last stop at 0.945px, where it is pushed up to 100px. With `circle` in its place (121 characters), the last color has its full size: it fades in from 100px to the far corners, and 96,058 pixels change. With no size at all (114 characters), the rings become ellipses: 101,573 pixels change. A size of `0` (116 characters) paints the whole gradient in its last color: 19,888 pixels change. `1px` gives the same picture in 118 characters.
- `#6b82` is 5 characters. `#ebf6f0` in its place gives the same picture in 119 characters.
- `5ch` and `25vw` are 40px and 100px in one character less each: `40px` and `100px` give the same picture in 118 characters.
- The nested `*{*{…}}` keeps the turn and the margins off html. Put in the outer rule, `*{rotate:45deg;margin:58%3-325;background:…` is 115 characters, but html turns and gets the margins too: 27,022 pixels change.
- The `3` places the tip. `margin:58%0-325` has the same length, but body is then 400 wide and its tip goes up to y = 148.13: 213 pixels change.
- No space is needed in `58%3-325`: after `%` a new number starts, and so does a minus sign. `58% 3 -325` gives the same picture in 119 characters.
- The closing parenthesis, the closing brace and the closing tags are left out. The end of the code closes them.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 619 pixels, with the same rule as in the golf notes, by up to 170. All of them are on edges: 87 around the hole, 158 at the edge of the violet ring, 243 at the outer edge of the green ring and 131 along the two sides of the V. The flat colors are the same. The edges are smoothed in a different way: in the target the ring edges are smoothed, in my render they are hard and the sides of the V are smoothed. The CSS Battle judge gives the code a 100% match.
