---
title: "Half the squares, half a turn: a staircase of squares in 146 characters"
ref: 2026-04-30
permalink: /2026/04/30/half-the-squares-half-a-turn/
description: "How one list of five shadows, on html and on body turned half a turn with scale:-1, draws ten squares in a diagonal staircase, in the April 30, 2026 CSS Battle target."
target: /assets/targets/2026-04-30.png
target_url: https://cssbattle.dev/play/mptkoSenO5tTuzn8HfYa
colors: ["#394257", "#668884", "#eed9d9"]
player: gunnar
chars: 146
score: 699.48
match: 100
code: |
   <style>*{background:#394257;color:EED9D9;margin:5%35%55%200;box-shadow:0 5em,0 45vw,0 8em#668884,63q 35vw,-45vw 0;*{margin:200 60-200-60;scale:-1
---

The April 30 target is a staircase of 60px squares on a midnight blue background. Light pink squares go down from the top left corner to the bottom right one, and two of them are grey green. Gunnar Bittersmann draws only half of it: html is a small square, and one list of five shadows copies it five times. body gets the same list, then `scale:-1` turns it half a turn, and its five copies land on the other side of the canvas center.

**Wide view** shows where body's copies go before the half turn. With **Teaching colors**, the two boxes and body's copies get their own color.

{% include animations/2026-04-30.html lang=page.lang %}

## The code, spaced out

```css
&nbsp;<style>                    /* a real no-break space: 1 character */
* {                              /* html, head, style, body */
  background: #394257;           /* midnight blue, on every element */
  color: EED9D9;                 /* the color of the shadows that have none */
  margin: 5%35%55%200;           /* html: 20 140 220 200, so 60 × 60 at (200, 20) */
  box-shadow:
    0 5em,                       /* 80px down: (200, 100) */
    0 45vw,                      /* 180px down: (200, 200) */
    0 8em#668884,                /* green, 128px down, under the first two */
    63q 35vw,                    /* 59.53px right, 140px down: (259.53, 160) */
    -45vw 0;                     /* 180px left: (20, 20) */
  * {                            /* head, style, body */
    margin: 200 60-200-60;       /* body: 60 × 60 at (140, 220) */
    scale: -1                    /* half a turn: body's copies go to the other side */
  /* the end of the code closes the two rules */
```

## How it works

### 1. A no-break space, two boxes

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `200` in a margin is read in px.

The code starts with a no-break space. It is not white space, so the browser opens body and puts it there, as text. The `<style>` goes into body too. `*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body. head and style are not displayed. Two boxes are left: html and body.

The no-break space is a blank character: nothing shows. But body is no longer empty, and that matters (see the golf notes).

### 2. html, a square you can't see

`background:#394257` goes to every element. html's background fills the whole canvas: that is the midnight blue.

html gets `margin:5%35%55%200`. A margin percentage is taken from the width of the containing block, even for the top and bottom margins: 5% of 400 = 20, 35% = 140, 55% = 220. The last value is 200px. Each `%` ends its number, so no space is needed.

html is 400 − 140 − 200 = 60 wide. In quirks mode, html fills the page minus its margins: 300 − 20 − 220 = 60 tall. It is a 60 × 60 square at (200, 20). It has the background color, so you don't see it.

### 3. Five copies of html

`color:EED9D9` sets the text color. Quirks mode accepts a hex color without its `#` here. A shadow with no color takes the text color: four of the five shadows are light pink.

A shadow with no blur is a copy of the box, moved by its offset. The font size is 16px, so 5em = 80px and 8em = 128px. 1vw is 1% of the 400px width: 45vw = 180px and 35vw = 140px. 1Q is a quarter of a millimeter, 0.945px: 63q = 59.53px.

- `0 5em`: 80px down, at (200, 100).
- `0 45vw`: 180px down, at (200, 200).
- `0 8em#668884`: green, 128px down, at (200, 148).
- `63q 35vw`: 59.53px right and 140px down, at (259.53, 160).
- `-45vw 0`: 180px left, at (20, 20).

### 4. The green copy, underneath

The first shadow of the list is painted on top, the last one at the bottom. The green copy runs from y = 148 to 208. The copy at y = 100 covers it down to 160, and the one at y = 200 covers it from 200. A green band is left, from y = 160 to 200: the target's green square at (200, 160).

### 5. body, a second square

The nested `*` gives body `margin:200 60-200-60`: 200 on top, 60 on the right, −200 at the bottom, −60 on the left. The `-` starts a new number, so no space is needed before it.

body sits in html, which is 60 wide. With a right margin of 60 and a left margin of −60, it is 60 − 60 + 60 = 60 wide, at x = 200 − 60 = 140. In quirks mode, body fills html's height minus its own margins: 60 − 200 + 200 = 60 tall, at y = 20 + 200 = 220. body is a 60 × 60 square at (140, 220), also in the background color.

The first `*` also matches body, so body has the same shadow list.

### 6. scale:-1, half a turn

The nested `*` also gives body `scale:-1`. It flips body on both axes, around its center (170, 250). Flipping both axes is the same as half a turn. The shadows turn with the box: every offset changes sign.

So body's copies go up and left instead of down and right:

- `0 5em`: 80px up, at (140, 140).
- `0 45vw`: 180px up, at (140, 40).
- `0 8em#668884`: green, 128px up, at (140, 92). The copies at y = 40 and y = 140 cover it, and only the band from y = 100 to 140 is left.
- `63q 35vw`: 59.53px left and 140px up, at (80.47, 80).
- `-45vw 0`: 180px right, at (320, 220).

html's center is (230, 50), body's is (170, 250). Both are 100px from (200, 150), the center of the canvas, on opposite sides. So body's half is html's half turned half a turn around the center of the canvas. Five shadows give ten squares.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One list for two boxes. html and body share the five shadows, and `scale:-1` sends body's copies to the other side. Without `;scale:-1` (137 characters), body's copies go down and left: four fall below the canvas, one is cut at the left edge, and 18,000 pixels change. `rotate:.5turn` instead (151 characters) gives the same picture.
- The no-break space keeps body from being empty. Without it (145 characters), my Chrome makes html 260 tall instead of 60: html's copies turn into tall bars, and 27,600 pixels change. A plain space (146 characters) does nothing: the parser drops it, body stays empty, and the same 27,600 pixels change. A `.` (146 characters) keeps the layout, but the dot shows inside body's square, near its right edge: 8 pixels change.
- `color:EED9D9;` is 13 characters and colors four shadows. With `#EED9D9` in each of them instead (161 characters), the picture is the same. The missing `#` saves one more: with `color:#EED9D9` (147 characters), the picture is the same.
- `5%35%55%200` is 11 characters. With `20 140 220 200`, 14 characters (149 in all), the picture is the same.
- `5em` is 3 characters for 80px. With `80px` or `20vw` (147 characters), the picture is the same. A bare number does not work in a shadow: with `0 80` (145 characters), my Chrome drops the whole list, no copy is left, and 33,600 pixels change.
- `45vw` is 4 characters for 180px. With `180px` (147 characters), the picture is the same.
- `8em` is 3 characters for 128px. The green copy only has to fill the gap between the two pink copies, from y = 160 to 200 for html and from 100 to 140 for body. With `35vw` (147 characters), the picture is the same. With `7em`, 112px (146 characters), the green copies stop short: two dark bands, at y = 192 to 200 and y = 100 to 108, and 960 pixels change. With `9em`, 144px (146 characters), they go too far: dark bands at y = 160 to 164 and 136 to 140, and 480 pixels change.
- The order of the list matters. With the green shadow first, `0 8em#668884,0 5em,0 45vw` (146 characters, the same length), the green copies are painted over the pink ones: 2,400 pixels change.
- `63q` is 3 characters for 59.53px, a bit less than the 60px step. With `15vw` or `60px` (147 characters), 120 pixels change: the columns x = 80 and x = 319, which the 63q copies only half cover in my Chrome. With `64q`, 60.47px (146 characters, the same length), 360 pixels change, on the vertical edges of the two copies.
- No space is needed before `#`: `0 8em#668884`. With a space (147 characters), the picture is the same.
- The nested `*` reaches body in 1 character. With `body{` (149 characters), the picture is the same.
- The code ends inside two rules: the end of the code closes them. With `}}` at the end (148 characters), the picture is the same.

## If you try it at home

The target image is a JPEG, and its colors are 1 off here and there. In my local Chrome (version 157 when this was written), the official code differs from it on 445 pixels by more than 8 in one channel. 120 of them are the columns x = 80 and x = 319: the two 63q copies end 0.47px short of the target's edges there, and leave a half-covered column. In a test copy with `15vw` (147 characters), these 120 pixels match the target. The other 325 are small gaps, at most 28 in one channel, and 293 of them lie within 3px of the edge of a square. The CSS Battle judge gives the official code a 100% match.
