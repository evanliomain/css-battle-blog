---
title: "One border, zoomed by 2.5: four yellow bars in 96 characters"
ref: 2026-04-25
permalink: /2026/04/25/one-border-zoomed-by-2-5/
description: "How a single border-inline gives html two thin bars and body two squares, how zoom turns 40px into 100px, and how quirks mode stretches both boxes down to the same line, in the April 25, 2026 CSS Battle target."
target: /assets/targets/2026-04-25.png
target_url: https://cssbattle.dev/play/RMGHENh8x6ivd5cqi2tK
colors: ["#f7ec7d", "#405c48"]
player: wi328v9RQHXQ73SxzWKIKa6m6jg1
chars: 96
score: 760.21
match: 100
code: |
   <style>*{border-inline:solid 5ch#F7EC7D;margin:5%44;*{margin:64 4 0;zoom:2.5;background:#405C48
---

The April 25 target is four yellow rectangles on a dark green background: two tall thin bars at the ends, and two squares between them, standing on the same bottom line. James Whitehead draws them with one border declaration. It gives html its two bars. body gets the same border, but `zoom:2.5` makes it 100px wide instead of 40px: those are the two squares.

With **Teaching colors**, html's and body's borders get their own colors, and the animation shows body before and during the zoom.

{% include animations/2026-04-25.html lang=page.lang %}

## The code, spaced out

```css
&nbsp;<style>                      /* a real no-break space: 1 character */
* {                                /* every element: html, head, style, body */
  border-inline: solid 5ch#F7EC7D; /* left and right borders, 5ch = 40px */
  margin: 5%44;                    /* 20 at the top and bottom, 44 on the sides */
  * {                              /* every element inside another: all but html */
    margin: 64 4 0;                /* replaces 5%44 */
    zoom: 2.5;                     /* everything on body × 2.5 */
    background: #405C48            /* body's, moved to the canvas */
/* the end of the code closes the two rules */
```

## How it works

### 1. A no-break space and two rules

The code starts with a no-break space. It is not white space for the parser: it opens body and goes into it as text, and the `<style>` goes into body too. There is no doctype, so the page is in quirks mode: a bare number like `44` in a margin is read in px.

`*` matches every element: html, head, style and body. The nested `*{` means `* *`: every element inside another one, so all of them but html. Both selectors have the same specificity, zero, so on head, style and body the nested rule wins where the two disagree: `margin:64 4 0` replaces `margin:5%44`. head and style are not displayed. Two boxes are left: html and body.

### 2. The green canvas

`background:#405C48` is only in the nested rule. In my Chrome, getComputedStyle gives html a transparent background and body `rgb(64, 92, 72)`. When html has no background, body's moves to the whole canvas. Every pixel that no border covers is `#405c48`.

### 3. html's box

html keeps `margin:5%44`. A margin percentage is taken from the width of the containing block, here the 400px canvas: 5% is 20px, at the top and at the bottom. The sides get 44px.

In quirks mode, html stretches to the height of the canvas, minus its margins: 300 − 2 × 20 = 260. getBoundingClientRect gives html the box (44, 20), 312 × 260.

### 4. html's two borders

`border-inline:solid 5ch#F7EC7D` sets only the left and right borders. `5ch` is five times the width of a "0". In my Chrome's default font, Times at 16px, a "0" is 8px wide, so getComputedStyle gives 40px. The two bars are 40 × 260: from x = 44 to 84, and from x = 316 to 356, from y = 20 to 280. Between them, html's content is 312 − 80 = 232 wide.

### 5. body, zoomed

The outer rule matches body too, so body gets the same border. The nested rule gives it `margin:64 4 0` and `zoom:2.5`. Zoom multiplies every length on body: the margins become 64 × 2.5 = 160 at the top and 4 × 2.5 = 10 on the sides, and the borders 40 × 2.5 = 100.

body starts at x = 84 + 10 = 94 and y = 20 + 160 = 180. The 160 adds to html's 20: the root element's margins never collapse. body is 232 − 2 × 10 = 212 wide. In quirks mode, body stretches to the bottom of html's content: 260 − 160 = 100 tall. getBoundingClientRect gives (94, 180), 212 × 100.

Its two borders are 100 × 100 squares: from x = 94 to 194 and from x = 206 to 306, from y = 180 to 280. They stand on the same line as html's bars, at y = 280.

Without the zoom (87 characters), body sits at (88, 84), 224 × 196, its borders are 40px wide, and 22,080 pixels change.

### 6. The gap

body's content is what its borders leave: 212 − 2 × 100 = 12px. That is the green gap between the two squares. The no-break space sits there, on one line: a text range around it measures 10 × 46 on screen, and it paints nothing.

The yellow adds up: 2 × 40 × 260 + 2 × 100 × 100 = 40,800 pixels, the count in my render and in the target.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One border declaration serves both boxes: the nested rule sits inside the `*{` rule, which matches body too. With two rules, `html{border-inline:solid 5ch#F7EC7D;margin:5%44}body{border-inline:solid 5ch#F7EC7D;margin:64 4 0;zoom:2.5;background:#405C48` (133 characters), the picture is the same.
- `zoom:2.5` turns the 40px border into 100px, and also scales the margins. Without it, with `margin:160 10 0;border-inline-width:100px` (115 characters), the picture is the same.
- `5%44` is 4 characters: 5% of the 400px width is 20, and no space is needed after `%`. With `20 44` (97 characters), the picture is the same.
- `5ch` is 3 characters, `40px` is 4. With `40px` (97 characters), the picture is the same: zoom scales px as well.
- No space before a `#`. With `solid 5ch #F7EC7D` (97 characters), the picture is the same.
- The `0` in `margin:64 4 0` keeps body's bottom margin at zero. With `margin:64 4` (94 characters), the bottom margin is 64 × 2.5 = 160 too, body shrinks to its line of text, 46px tall, html grows to 366px, its bars run past the bottom of the canvas, and 12,400 pixels change.
- The no-break space keeps body from being empty. Without it (95 characters), my Chrome makes html 420px tall: its bars run past the bottom of the canvas, and 1,600 pixels change. A plain space (96 characters) does the same: the parser drops it, and the same 1,600 pixels change. A `.` (96 characters) keeps the layout, but the dot shows in the gap, and 26 pixels change.
- The bare numbers and the stretched boxes need quirks mode. With `<!doctype html>` in front (111 characters), `margin:5%44` and `margin:64 4 0` are dropped, html has no margin and is 86px tall, body keeps its default 8px margin, and 52,464 pixels change.
- The two rules and the `<style>` are never closed. With `}}` at the end (98 characters), the picture is the same.
