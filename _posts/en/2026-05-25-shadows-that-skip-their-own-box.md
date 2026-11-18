---
title: "Shadows that skip their own box: a table and two chairs in 169 characters"
ref: 2026-05-25
permalink: /2026/05/25/shadows-that-skip-their-own-box/
description: "How html's box, parked above the canvas, keeps its own shadows out of the space above the table, how five shadows draw the table and a chair, and how a flipped body draws the second chair of the May 25, 2026 CSS Battle target."
target: /assets/targets/2026-05-25.png
target_url: https://cssbattle.dev/play/7Nd7rqnfAz8Zb4BPXd3C
colors: ["#f8d3cf", "#f8d2d1", "#de6b67", "#2f5a76"]
player: emohdaziz
chars: 169
score: 679.9
match: 100
code: |
  <style>*{margin:-50%25%180;color:2F5A76;box-shadow:0 5ch,0 60vw 0-5pc,5ch 63q#f8d2d1,15ex 370q 0-74q#f8d2d1,15ex 201q 0-32q#de6b67;*{background:#d213;margin:0;scale:-1 1
---

The May 25 target shows a dark blue T, like a table, between two coral chairs seen from the side, on a pale pink background. Mohamed Ali draws it with box shadows only. html's box sits mostly above the canvas, and a box never paints its outer shadows under itself: that keeps the space above the table empty. Five shadows draw the table and the right chair. body, flipped, draws the left one.

With **Wide view**, you can see html's box and the full shadows above and below the canvas. With **Teaching colors**, each of the five shadows gets its own color.

{% include animations/2026-05-25.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, head, style, body: html and body are shown */
  margin: -50%25%180;            /* html: 200 × 320 at (100, −200), bottom edge at y = 120 */
  color: 2F5A76;                 /* the color of the shadows that have none */
  box-shadow:                    /* outer shadows: never painted inside the box */
    0 5ch,                       /* 1. 40px down: only the 200 × 40 top of the T shows */
    0 60vw 0-5pc,                /* 2. 240px down, 80px smaller on each side: the leg */
    5ch 63q#f8d2d1,              /* 3. 40px right, 59.53px down: hides the red above the seat */
    15ex 370q 0-74q#f8d2d1,      /* 4. hides the red between the legs */
    15ex 201q 0-32q#de6b67;      /* 5. the red block of the right chair, painted below the rest */
  * {                            /* head, style and body */
    background: #d213;           /* body's background goes to the canvas */
    margin: 0;                   /* body sits on html's box */
    scale: -1 1                  /* body's shadows are flipped: the left chair */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `180` in a margin is read in px.

The code is only a `<style>`. The browser puts it in head, and adds an empty body. So the page is html, with head (and style in it) and body.

`*` matches every element. The `*{` nested in it matches every element inside another one: head, style and body. head and style are not displayed, so two boxes are left: html and body.

The `<style>` is never closed, and neither are the rules: the end of the code closes them.

### 2. html's box

`margin:-50%25%180` puts −50% at the top, 25% on the sides and 180px at the bottom. A percentage margin is measured on the width of the page, 400px: −200px at the top, 100px on each side. In quirks mode, html fills the page minus its margins: 400 − 100 − 100 = 200 wide, and 300 + 200 − 180 = 320 tall, at (100, −200).

So html goes from y = −200 to y = 120. Most of it is above the canvas. It has no background, so the box itself draws nothing.

### 3. Shadows that skip their own box

An outer box shadow is a copy of the box, moved by its offsets and grown by its spread. The browser only paints it outside the element's own box. The part that falls under the box is never painted.

The first shadow, `0 5ch`, is html moved 40px down (1ch = 8px in the default 16px font): 200 × 320 at (100, −160). It ends at y = 160, but html's box covers it down to y = 120. Only a 200 × 40 strip is left, at (100, 120): the top of the T.

The first two shadows have no color of their own. They take the current color: `color:2F5A76` has no `#`, but quirks mode still reads it as #2F5A76.

### 4. The leg of the T

`0 60vw 0-5pc` is 60vw = 240px down, with no blur and a spread of −5pc = −80px. A negative spread shrinks the copy on every side: 200 − 160 = 40 wide, 320 − 160 = 160 tall, at (100 + 80, −200 + 240 + 80) = (180, 120).

In a shadow list, the first shadow is painted on top. The top of the T covers the leg from y = 120 to 160, and the leg goes on down to y = 280.

### 5. A red block, cut into a chair

The last shadow is painted below all the others. `15ex 201q 0-32q#de6b67` moves html right by 15ex and down by 201q, and shrinks it by 32q. An ex is the height of an "x" in the element's font: in my Chrome, 15ex = 107.69px. A q is a quarter of a millimeter, 0.945px: 201q = 189.92px and 32q = 30.24px.

That gives a 139.53 × 259.53 red block at (237.92, 20.16), down to y = 279.69. Its part inside html's box, above y = 120, is not painted. The top of the T covers it from y = 120 to 160.

Two shadows in the background color then hide part of it. They come earlier in the list, so they are painted above the red:

- `5ch 63q#f8d2d1` is html moved 40px right and 63q = 59.53px down: (140, −140.47), 200 × 320. Its bottom edge is at y = 179.53, and its right edge at x = 340. It hides all the red above the seat, except the back of the chair, right of x = 340.
- `15ex 370q 0-74q#f8d2d1` moves html 107.69px right and 349.61px down, and shrinks it by 69.92px: 60.16 × 180.16 at (277.61, 219.53). It hides the red between the two legs.

What is left is a chair: a back from x = 340 to 377.45, a seat from y = 179.53 to 219.53, and two legs down to y = 279.69.

### 6. body, flipped

The nested `*{` gives body `margin:0`. In quirks mode, body then fills html: same box, 200 × 320 at (100, −200). body is also matched by the outer `*`, so it gets the same five shadows.

`scale:-1 1` flips body from left to right, around its center, x = 200. The box stays where it is, so its shadows still skip the same area. But the shadows land mirrored: x becomes 400 − x. The top and the leg of the T are symmetric, so they land on themselves. The chair lands on the left, from x = 400 − 377.45 = 22.55 to 400 − 237.92 = 162.08.

### 7. The background

`background:#d213` is in the nested rule too, so body gets it. html has no background, so the browser paints body's background on the whole canvas.

#d213 is #dd2211 at 20% opacity (the 4th digit, 3, is 3/15 = 0.2). Over the white page, it gives #f8d3cf. The masks are #f8d2d1. They differ by at most 2 per channel, too little to see.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- Outer shadows never cover their own box. That one fact clears the whole area above the table, with no extra shadow.
- `scale:-1 1` draws the second chair. Without it (158 characters), body's shadows land on html's, and the left chair is gone: 17,040 pixels change.
- `margin:0` puts body back on html's box. Without it (160 characters), body gets the margin of `*` too, measured on html's 200px: it becomes 100 × 240 at (150, −300). Its flipped shadows shrink with it, and the left chair turns into a short bar at the top left: 20,664 pixels change.
- `-50%25%180`: no space is needed after a `%`. `margin:-200 25%180` gives the same picture in 170 characters, `margin:-200 100 180` in 171.
- `color:2F5A76` drops the `#`. With `color:#2F5A76`, the same picture takes 170 characters. Writing the color in the two blue shadows instead, with no `color`, also takes 170.
- The background can be translucent, the masks cannot. `#d213` is 5 characters, `#f8d2d1` is 7: with `background:#f8d2d1` (171 characters), no pixel changes by more than 2. But masks in `#d213` (165 characters) let the red show through and tint the background: 27,482 pixels change.
- Short units: `5ch` is 40px, `60vw` is 240px and `5pc` is 80px. With `0 40px` in place of `0 5ch`, the same picture takes 170 characters. `63q` is 3 characters for 59.53px; `60px` would be 4. With `60px` (170 characters), the top of the seat moves from y = 179.53 to 180: 204 pixels change, all on the row y = 179.
- No space before a minus sign or a `#`. `0 -5pc`, `0 -74q` and `0 -32q` give the same picture in 172 characters, and so does `63q #f8d2d1` with a space before each of the three `#`.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 3,426 pixels, with the same rule as in the golf notes. They are all on the edges of the chairs. The right chair goes from x = 237.92 to 377.45, where the target has 240 to 380, and the left chair is its mirror image. In my Chrome, 15ex is 107.69px. With `110px` in place of the two `15ex`, the chairs move to the target's columns, and 1,274 pixels are left. They are on the rows y = 20, 179, 219 and 279 and the columns x = 20, 159, 240 and 379, where a q length puts an edge between two pixels. With px values in place of the q values too (`60px`, `350px`, `70px`, `190px`, `30px`), no pixel differs. The CSS Battle judge gives the official code a 100% match.
