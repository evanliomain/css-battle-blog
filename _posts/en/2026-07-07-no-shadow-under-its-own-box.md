---
title: "No shadow under its own box: a test tube in 137 characters"
ref: 2026-07-07
permalink: /2026/07/07/no-shadow-under-its-own-box/
description: "How one list of five shadows, given to html and to body, draws a stopper, a brim, a black tube and its turquoise liquid, because an outer shadow is never painted under its own box, in the July 7, 2026 CSS Battle target."
target: /assets/targets/2026-07-07.png
target_url: https://cssbattle.dev/play/LpIgMLGpDeF12oOT28hK
colors: ["#5adab8", "#993576", "#000000"]
player: h_blierzt
chars: 137
score: 708.39
match: 100
code: |
  <style>*{margin:-285-35 300;box-shadow:0-4in 0-5vw#5ADAB8,0-5vw,0-95px 0-26q,0-4in,0 0 0 3in#993576}&{border-radius:1in;margin:95%160-359
---

The July 7 target is a test tube on a dark magenta background: a black tube with a round bottom, full of turquoise liquid, under a black brim and a square stopper. H_Bliertz draws it with two transparent boxes and one list of five shadows, given to both. html sits below the canvas, body sticks up into it. An outer shadow is never painted under its own box, so body's magenta has a hole, and html's shadows show through it.

Turn on **Teaching colors** to tell body's magenta from html's and to see which shadow draws which part, and **Wide view** to see html below the canvas and body's two lost shadows above it.

{% include animations/2026-07-07.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                        /* html, head, style, body */
  margin: -285-35 300;     /* body: 285px up out of html, 35px wider on each side */
  box-shadow:
    0-4in 0-5vw#5ADAB8,    /* 384px up, 20px smaller: the liquid, on html */
    0-5vw,                 /* 20px up, black: the brim, on body */
    0-95px 0-26q,          /* 95px up, 24.57px smaller: the stopper, on body */
    0-4in,                 /* 384px up, black: the tube, on html */
    0 0 0 3in#993576       /* 288px of magenta all around */
}
& {                        /* html */
  border-radius: 1in;      /* 96px: a pill */
  margin: 95%160-359       /* 380px on top, 160px on the sides, -359px at the bottom */
```

## How it works

### 1. Two rules

There is no doctype: the page is in quirks mode, and numbers with no unit are px in `margin`. The page has html, head, the style and body. head and the style are not displayed.

`*` selects all of them. A lone `&`, outside any rule, selects the root: html. Both rules set `margin`, and in my Chrome the later one wins: html takes `95%160-359`. With the two rules swapped, html keeps the margin of `*`, and 26,758 pixels change. body only gets the first rule. Both boxes get the same five shadows, and neither has a background.

### 2. html, a pill below the canvas

A margin in percent is a share of the width of the containing block, even on top. For html, that is the 400px canvas: `95%` is 380px. With 160px on each side, html is 400 − 320 = 80px wide. In quirks mode, html fills the height of the page minus its margins: 300 − 380 + 359 = 279px. getBoundingClientRect gives (160, 380), 80 × 279: html is all below the canvas.

`border-radius:1in` asks for 96px. That is more than half of the 80px width, so the corners are scaled down to 40px: html is a pill.

### 3. body, sticking up into the canvas

body gets `margin:-285-35 300`. Its top is 285px above html's: y = 380 − 285 = 95. The −35px side margins make it 80 + 70 = 150px wide, from x = 125. In quirks mode, body fills html's height minus its margins: 279 + 285 − 300 = 264px. getBoundingClientRect gives (125, 95), 150 × 264.

### 4. One shadow list, five values

getComputedStyle gives the shadows in px. `4in` is 4 × 96 = 384px, `5vw` is 5% of 400 = 20px, `26q` is 26 quarter millimeters = 24.57px, `3in` is 288px:

- `0-4in 0-5vw#5ADAB8`: 384px up, 20px smaller on each side, turquoise;
- `0-5vw`: 20px up;
- `0-95px 0-26q`: 95px up, 24.57px smaller on each side;
- `0-4in`: 384px up;
- `0 0 0 3in#993576`: in place, 288px bigger on each side, magenta.

The three shadows with no color use `currentColor`, black by default. The first shadow of the list is painted on top. Each shadow follows the box's corners: on html, they are round; on body, square.

### 5. An outer shadow is never painted under its own box

That rule does most of the work. body's `3in` shadow covers the whole canvas, except body's own box: a hole, 150px wide, from y = 95 down. With `html{box-shadow:none}` added, the hole stays white: 30,750 pixels change, 150 × 205.

body's shadows are painted after html's, over them. I checked it by painting body's shadows in other colors: at x = 130, html's magenta starts at y = 92, but the brim keeps its rows 92 to 94.

### 6. body's shadows: the brim, the stopper, the magenta

- `0-5vw` is a black copy of body, 20px higher. Only the part above body's box shows: 150 × 20, from y = 75 to 95. That is the brim.
- `0-95px 0-26q` is 95px higher and 24.57px smaller on each side: from x = 149.57 to 250.43, from y = 24.57. The part above y = 95 shows, and the brim covers its bottom: the stopper, from y = 24.57 to 75.
- The two `0-4in` shadows land 384px up, from y = −289 to −25: above the canvas.

I removed each shadow from body only. Without `0-5vw`, 1,000 pixels change, the brim. Without `0-95px 0-26q`, 5,202 change, the stopper. Without either `0-4in` shadow, nothing changes.

### 7. html's shadows, through the hole

html's shadows only show inside body's hole:

- `0-4in` brings the pill up to y = −4 to 275, from x = 160 to 240: the black tube, with a round bottom.
- The first shadow is the same pill, 20px smaller on each side: from x = 180 to 220 and from y = 16 to 255, with a 40 − 20 = 20px radius. It is painted on top: the liquid. The tube keeps a 20px black wall.
- The `3in` shadow starts at y = 380 − 288 = 92. That is under the brim, so it fills the whole hole around the tube.
- `0-5vw` and `0-95px 0-26q` stay near html's box, below the canvas.

Again, I removed each shadow from html only. Without the first one, 6,254 pixels change, the liquid. Without `0-4in`, 7,557 change, the tube. Without `3in`, 17,114 change, the hole. Without `0-5vw` or `0-95px 0-26q`, nothing changes.

In my render, row y = 150 is black from x = 160 to 179, turquoise from 180 to 219 and black from 220 to 239. Column x = 200 is black from y = 25 to 94, turquoise from 95 to 254 and black from 255 to 274.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list for two boxes. Each box uses three of the five shadows, and the other two get lost off canvas. Two separate lists, one for body in `*` and one for html in `&`, give the same picture in 165 characters.
- `&` selects html in 1 character. `html` gives the same picture in 140.
- `95%160` needs no space after the `%`. `380 160` gives the same picture in 138.
- `4in`, `5vw` and `3in` are 384px, 20px and 288px in 3 characters each. With `384px` twice, 141 characters; with `20px` twice, 139; with `288px`, 139. Same picture each time.
- `3in` is just enough: html's magenta has to climb from y = 380 to the brim, at least 285px. With `2in`, it stops at y = 188, and 6,510 pixels change: the hole stays white on each side of the tube, from y = 95 to 187.
- `26q` is 24.57px in 3 characters. `25px` puts the stopper's edges on whole pixels, for one more character: 138.
- The three black shadows have no color: they use `currentColor`. Writing `#000` three times gives the same picture in 149 characters.
- Unit-less numbers only work for some properties in quirks mode. With `0-95 0-26q` (135 characters), my Chrome drops the whole `box-shadow`: the canvas stays white, and 120,000 pixels change. With `border-radius:40` (136), it drops the radius: the tube gets a square bottom, and 965 pixels change.
- Nothing is closed. `}</style>` at the end takes 146 characters, for the same picture.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 363 pixels, with the same rule as in the golf notes. 202 are on three edges of the stopper: row y = 24 and columns x = 149 and 250 come out half dark, because `26q` is 24.57px, not 25px. With `25px`, those pixels match the target. The other 161 are on the round bottom of the tube, where the shades of the edge pixels differ. The CSS Battle judge gives the official code a 100% match.
