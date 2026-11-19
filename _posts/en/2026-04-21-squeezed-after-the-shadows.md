---
title: "Squeezed after the shadows: a pause button in 141 characters"
ref: 2026-04-21
permalink: /2026/04/21/squeezed-after-the-shadows/
description: "How two inset shadows shared by html and body draw an olive frame, a gray hole and an olive bar on a 350px-tall html, and how scale:1 .57 squeezes it all into a pause button, in the April 21, 2026 CSS Battle target."
target: /assets/targets/2026-04-21.png
target_url: https://cssbattle.dev/play/X2jjK3cZXql5QvPOkTh0
colors: ["#4a4a23", "#d9d9d9", "#c0a623"]
player: underdude
chars: 141
score: 704.33
match: 100
code: |
  <style>*{box-shadow:inset 0 0 0 74q#4a4a23,inset 5in 0#D9D9D9;margin:-35 85}&{background:#c0a623;margin:-25 100;scale:1 .57;border-radius:15%
---

The April 21 target is a pause button: a dark olive rounded square with two light gray bars, on a mustard background, and a small tab above and below. Janne Ala-Äijälä gives html and body the same two inset shadows. On html, they draw an olive frame around a gray hole. On body, a narrow box, they paint it all olive: a bar that splits the hole and runs out at both ends. html starts 350px tall, and `scale:1 .57` squeezes everything into place.

With **Wide view**, html and body show at their full height before the squeeze. With **Teaching colors**, each shadow gets its own color.

{% include animations/2026-04-21.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* every element: html, head, style, body */
  box-shadow:
    inset 0 0 0 74q#4a4a23,        /* spread 74 × 0.945 = 69.92px, on top */
    inset 5in 0#D9D9D9;            /* shifted by 480px: fills the whole box */
  margin: -35 85;                  /* body: 30px wide, 420px tall */
}
& {                                /* the root: html */
  background: #c0a623;             /* painted on the whole canvas */
  margin: -25 100;                 /* html: 200px wide, 350px tall */
  scale: 1 .57;                    /* squeezes html and body around y = 150 */
  border-radius: 15%;              /* 30px across, 52.5px down */
/* the end of the code closes everything */
```

## How it works

### 1. html's box

`*` matches every element: html, head, style and body. head and style are not displayed, so two boxes are left. `&` in a rule that is not nested matches the root, html. html matches `*` too, but the `&` rule comes later, so its margin wins.

There is no doctype, so the page is in quirks mode. There, a unitless `-25` counts as -25px, and html stretches to the height of the frame, minus its margins. Before the scale, getComputedStyle gives html 200px × 350px: from x = 100 to 300, and from y = -25 to 325, 25px past the canvas at the top and at the bottom.

### 2. html's background goes to the canvas

The background of the root element is painted on the whole canvas, not only in html's box. So the whole canvas is mustard.

### 3. Two inset shadows

An inset shadow is drawn inside the box, and the first shadow of the list is drawn on top.

The second one, `inset 5in 0`, is a copy of the box shifted 480px to the right. An inset shadow paints the part of the box that the shifted copy no longer covers. html's box is only 200px wide, so that is all of it: html is gray.

The first one, `inset 0 0 0 74q`, has no offset and a spread of 74Q. 1Q is a quarter of a millimeter, 0.945px, so 74Q is 69.92px (getComputedStyle gives `69.9213px`). It paints an olive frame 69.92px thick along every side. A gray hole of 200 - 139.84 = 60.16 by 350 - 139.84 = 210.16 is left in the middle, from x = 169.92 to 230.08.

Without the gray shadow (122 characters), the hole shows the mustard canvas, and 4,297 pixels change.

### 4. Rounded corners

`border-radius:15%` takes 15% of each side: 30px across and 52.5px down. Inset shadows follow the rounded edge of the box, so the olive frame gets rounded outer corners. The hole's corners stay square: the curve inside the frame has a radius of 30 - 69.92, below zero, so it is a sharp corner.

Without the radius (123 characters), the square has sharp corners, and 1,131 pixels change.

### 5. body, an olive bar

body gets the same shadows and `margin:-35 85`. Inside html's 200px, that leaves 200 - 170 = 30px. In quirks mode body also stretches to html's height, minus its margins: 350 + 70 = 420px. Before the scale, body runs from (185, -60) to (215, 360).

Its olive shadow spreads 69.92px in from each side. body is only 30px wide, so the olive covers all of it, and its gray shadow never shows. body is an olive bar. It covers the middle of html's gray hole, which leaves two gray bars of 185 - 169.92 = 15.08px. It also runs 35px past html's box at the top and at the bottom.

### 6. The squeeze

`scale:1 .57` keeps the width and squeezes the height to 57%, around the center of html's box, (200, 150). Everything drawn in html goes with it: the shadows, the corners and body.

- html: 350 × 0.57 = 199.5px, from y = 50.25 to 249.75 (getBoundingClientRect gives (100, 50.25), 200 × 199.5).
- The gray bars: from y = 90.1 to 209.9.
- body: 420 × 0.57 = 239.4px, from y = 30.3 to 269.7. The tabs are the 20px that stick out of the square at each end.
- The corners: 30px across and 52.5 × 0.57 = 29.9px down, almost round.

Without the scale (129 characters), html and body keep their full height: the olive shape runs off the canvas at the top and bottom, the gray bars are 210.16px tall, and 22,364 pixels change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- The shadow list is in `*`, so html and body share it. With the shadows in the `&` rule and `background:#4a4a23` for body in `*` (160 characters), 60 pixels change, all on the ends of the tabs, rows 30 and 269.
- `74q` is 69.92px in 3 characters. With `70px` (142 characters), 300 pixels change.
- Quirks mode accepts unitless lengths in some properties only, and box-shadow is not one of them. With `70` (140 characters), the whole `box-shadow` declaration is dropped (getComputedStyle gives `none`), and 40,466 pixels change.
- `5in` is 480px in 3 characters, more than html is wide. With `1in` (96px, same length), the gray only covers html from x = 100 to 196: the right gray bar shows mustard, and 2,109 pixels change.
- `15%` follows each side, so the scale turns the 52.5px into 29.9px, close to the 30px across. With `30px` (142 characters), the vertical radius is squeezed to 30 × 0.57 = 17.1px, and 495 pixels change.
- `&` is 1 character, `html` is 4. With `html{` in its place (144 characters), the picture is the same.
- No space before the colors. With `74q #4a4a23` (142 characters), or with `0 #D9D9D9` (142 characters), the picture is the same.
- `.57` has no leading zero. With `0.57` (142 characters), the picture is the same.
- The unitless margins only work in quirks mode. With `margin:-35px 85px` and `margin:-25px 100px` (149 characters), the picture is the same.
- With `<!doctype html>` in front (156 characters), the unitless margins are dropped (getComputedStyle gives body its default 8px), html is 4.56px tall after the scale, and 42,774 pixels change.
- The last rule and the `<style>` are never closed. With `}` at the end (142 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes in the same places as the target, but 714 pixels differ by more than 8 levels. They sit on the edges that fall between two pixels in my render: rows 50 and 249 (the top and bottom of the square, at y = 50.25 and 249.75), rows 30 and 269 (the ends of the tabs, at 30.3 and 269.7), columns 169 and 230 (the outer sides of the gray bars, at 169.92 and 230.08), and the rounded corners. In the target, those pixels are plain olive. In my render they are blends, some with a gray tint: at (200, 30), rgb(115, 113, 75) instead of rgb(74, 74, 35). The largest difference is 107 levels, at (120, 51). The CSS Battle judge gives the official code a 100% match.
