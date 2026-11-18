---
title: "Four dots, two erased: two squares and two cut discs in 166 characters"
ref: 2026-05-06
permalink: /2026/05/06/four-dots-two-erased/
description: "How a 75Q dotted outline on a 30px html box draws four blue discs, and one shadow list, cream on html and green on a flipped body, keeps two squares and two cut discs in the May 6, 2026 CSS Battle target."
target: /assets/targets/2026-05-06.png
target_url: https://cssbattle.dev/play/GrISq22zl1z1mSsD4vt6
colors: ["#173889", "#4a9a86", "#f3ead2"]
player: kieron
chars: 166
score: 682.21
match: 100
code: |
  <style>&{outline:75Q dotted#173889}*{margin:135 185;background:#4a9a86;color:f3ead2;box-shadow:25vw 25vw 0 35px,-25vw -25vw 0 35px;*{color:4A9A86;scale:1-1;margin:-35
---

The May 6 target shows two cream squares on a green background, one at the top left and one at the bottom right. Each one has a blue disc at its inner corner, with one quarter missing. Kieron draws four discs with the dots of a thick dotted outline around a small html box. One shadow list then serves two elements: on html it paints the cream squares, and on body, flipped upside down, it paints green over what must go.

With **Teaching colors**, body's box and its green shadows get their own colors, so you can see what they hide. **Wide view** shows body's shadows running off the canvas.

{% include animations/2026-05-06.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                              /* at the top level, & is the root: html */
  outline: 75Q dotted #173889;   /* 70.87px, drawn 70px wide: one 70px dot per corner */
}
* {                              /* html, head, style, body */
  margin: 135 185;               /* html: a 30 × 30 box at (185, 135) */
  background: #4a9a86;           /* html's goes to the whole canvas */
  color: f3ead2;                 /* no # needed in quirks mode; the shadows take it */
  box-shadow:
    25vw 25vw 0 35px,            /* 100px right and down, grown by 35px */
    -25vw -25vw 0 35px;          /* 100px left and up, grown by 35px */
  * {                            /* head, style, body: only body is shown */
    color: 4A9A86;               /* body's shadows: the background green */
    scale: 1 -1;                 /* upside down, and painted over the outline */
    margin: -35;                 /* body: 100 × 100 at (150, 100) */
    /* the end of the code closes the two rules */
```

## How it works

### 1. Two boxes

The code is only a `<style>`. The parser puts it in head, and adds an empty body. The page has four elements: html, head, style and body. head and style are not displayed, so only html and body draw anything.

`*` targets all four. The nested `*{…}` inside it targets the elements inside another element: head, style and body. It comes after the outer rule, so its values win for them.

`&` at the top level of a style sheet stands for the root: it targets html. Written `html{` (169 characters), the picture is the same.

### 2. html: a 30 × 30 box

CSS Battle pages have no doctype, so they are in quirks mode. Lengths without a unit are px there, for properties like `margin`. In quirks mode, html also fills the page, minus its margins.

`margin:135 185` leaves html 400 − 2 × 185 = 30 in width and 300 − 2 × 135 = 30 in height. My render puts html's box from (185, 135) to (215, 165).

html is the root, so its background is painted on the whole canvas, not just in its box: that gives the green, `#4a9a86`.

### 3. The dotted outline: four discs

`outline:75Q dotted#173889` draws a line around html's box. 1in = 101.6Q, so 1Q = 0.945px and 75Q = 70.87px. My Chrome computes `outline-width` as 70px: the outline runs from 185 − 70 = 115 to 215 + 70 = 285.

The middle of that line is a square 35px out from html's box, from (150, 100) to (250, 200). In a dotted line, each dot is a disc as wide as the line. In a test copy with body hidden, my render draws one disc of 70px at each corner of that square, and nothing else. The top-left disc covers x = 115 to 185 on the row y = 100, and y = 65 to 135 on the column x = 150. That makes four discs of radius 35, centered at (150, 100), (250, 100), (150, 200) and (250, 200).

With `74Q` or `76Q` (166 characters each), my Chrome draws the outline 69px or 71px wide, the discs change size, and 429 and 443 pixels change.

### 4. html's shadows: two cream squares

`color:f3ead2` has no `#`. In quirks mode, a hex color without `#` is accepted for `color`. The shadows have no color of their own, so they take the element's `color`: cream for html.

25vw is a quarter of the 400px width: 100px. `25vw 25vw 0 35px` copies html's box 100px to the right and 100px down. The `0` is the blur: none. The `35px` is the spread: the copy grows by 35px on each side, 30 + 2 × 35 = 100. That gives a cream square from (250, 200) to (350, 300). `-25vw -25vw 0 35px` puts the other one from (50, 0) to (150, 100).

In my render, the outline is painted over html's shadows: the discs at (150, 100) and (250, 200) sit on the corners of the cream squares.

### 5. body: the same shadows, in green

The nested rule gives body `margin:-35`: body goes 35px past html on each side. My render puts it from (150, 100) to (250, 200), a 100 × 100 box. It also gets the green background of `*`.

body gets the same `box-shadow` too, but its `color` is `4A9A86`, the background green. Its two shadows are 100 + 2 × 35 = 170 wide. Without the flip, they would sit at (215, 165) to (385, 335) and (15, −35) to (185, 135): right over the cream squares.

### 6. The flip

`scale:1-1` is `scale:1 -1`: the width is kept, and the height is multiplied by −1. body turns upside down around its center, (200, 150), and its shadows move to the other diagonal. In a test copy with body in red and its shadows in blue, my render shows them from (215, 0) to (385, 135) and from (15, 165) to (185, 300) on the canvas. They go on to −35 and 335, off the canvas.

A transform also makes body a stacking context. In my render, it is then painted over html's outline:

- body's box covers the inner quarter of the discs at (150, 100) and (250, 200);
- the green shadows cover the whole discs at (250, 100) and (150, 200). Their edges touch these discs at x = 215 and y = 135, and at x = 185 and y = 165.

In the test copy without `scale:1-1`, body's box and shadows stay under the four discs.

What is left: two cream squares and two discs with a quarter missing, each facing the middle.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list serves two elements. The shadows take each element's `color`, so they are cream on html and green on body: green on green, body's shadows act as erasers. Without `color:4A9A86;` (153 characters), body's shadows are cream too: two more cream squares cover the other diagonal and its two discs, and 43,450 pixels change.
- The flip does two jobs: it sends body's shadows to the other diagonal, and it puts body over the outline. Without `;scale:1-1` (156 characters), the four discs stay whole, body's shadows cover the cream squares, and 27,926 pixels change.
- Other flips work too: `scale:-1 1` (167 characters) and `rotate:90deg` (169 characters) give the same picture. `scale:-1` (165 characters) is one character shorter, but it flips both ways: a half turn, which sends the shadows back over the cream squares, and 29,808 pixels change.
- `scale:1-1` needs no space: `1-1` reads as 1 then −1. With `scale:1 -1` (167 characters), the picture is the same.
- `&{` is three characters shorter than `html{`.
- 75Q is 3 characters for the 70px outline. With `70px` (167 characters), the picture is the same.
- 25vw is 4 characters for 100px. With `100px` four times (170 characters), the picture is the same.
- `f3ead2` and `4A9A86` need no `#` in quirks mode. With `#f3ead2` or `#4A9A86` (167 characters each), the picture is the same.
- The margins need no unit in quirks mode. With `135px 185px` (170 characters) or `-35px` (168 characters), the picture is the same. The spread does need its unit: with `35` in place of `35px` twice (162 characters), my Chrome drops the whole `box-shadow`, the cream squares are gone, and 24,001 pixels change.
- No space before a `#`: `dotted #173889` (167 characters) gives the same picture.
- The code ends inside both rules: the end of the code closes them. With `}}` at the end (168 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes at the same place as the target. 223 pixels differ by more than 8 levels, 112 on the top disc and 111 on the bottom one. All of them are within 0.6px of the round edge of a disc. The flat colors are the same: (74, 154, 134), (243, 234, 210) and (23, 56, 137). The largest difference is 176 levels, at (277, 221), on the edge of the bottom disc: (67, 92, 150) in my render, cream in the target. The CSS Battle judge gives the official code a 100% match.
