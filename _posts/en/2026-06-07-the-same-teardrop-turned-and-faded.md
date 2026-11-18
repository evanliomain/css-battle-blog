---
title: "The same teardrop, turned and faded: an infinity sign in 140 characters"
ref: 2026-06-07
permalink: /2026/06/07/the-same-teardrop-turned-and-faded/
description: "How one rule draws a red teardrop on html, and how the nested rule copies it on body, turns it with scale:-1 and fades it with opacity, in the June 7, 2026 CSS Battle target."
target: /assets/targets/2026-06-07.png
target_url: https://cssbattle.dev/play/X14Lci2CcNYSyhZeNlRY
colors: ["#f4dcbf", "#d24444", "#e28f81"]
player: to1ne
chars: 140
score: 705.33
match: 100
code: |
  <style>*{background:#f4dcbf;border:5ch solid#d24444;border-radius:50%50%50%0;margin:50 25%130 180;*{margin:40 40-120-120;scale:-1;opacity:.5
---

The June 7 target is a tilted infinity sign on beige: a red loop at the top right and a pink loop at the bottom left, joined by a red square. to1ne draws a red teardrop on html with one rule. The nested rule gives body the same teardrop, turns it half a turn with `scale:-1` and makes it half transparent.

Use **Teaching colors** to tell body apart from html while it moves.

{% include animations/2026-06-07.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, head, style, body */
  background: #f4dcbf;           /* on html: paints the whole canvas */
  border: 5ch solid#d24444;      /* 5ch = 40px */
  border-radius: 50%50%50%0;     /* 60px, bottom left corner square */
  margin: 50 25%130 180;         /* 25% of 400 = 100 */
  * {                            /* head, style, body */
    margin: 40 40-120-120;
    scale: -1;                   /* a half turn */
    opacity: .5;                 /* pink on beige, red on red */
```

## How it works

### 1. The elements

CSS Battle pages have no doctype, so they are in quirks mode, and a bare number like `180` in a margin is read in px.

The page has html, head, style and body. The parser adds an empty body at the end. `*` matches all four, and head and style are not displayed. `*{*{…}}` is a nested rule: `* *`, every element inside another one, so head, style and body. Both rules have the same specificity, and the nested one comes later: its margin wins on body. The background, the border and the radius come from the outer rule only, so html and body both get them.

### 2. html, a square

html gets `margin:50 25%130 180`. A margin in % is a share of the parent's width: 25% of 400 = 100. html is 400 − 180 − 100 = 120 wide. In quirks mode, html stretches to the canvas height minus its margins: 300 − 50 − 130 = 120. I measured it: 120 × 120 at (180, 50).

A background on html is painted on the whole canvas, not only in html's box. So `background:#f4dcbf` makes the canvas beige.

### 3. The teardrop

`border:5ch solid#d24444` gives html a red border. 1ch is the width of a 0 in the default font, 8px, so the border is 40px. I measured it: 40px. What is left inside is a 40 × 40 hole at (220, 90). It shows the canvas: beige.

`border-radius:50%50%50%0` sets the four corners in this order: top left, top right, bottom right, bottom left. The first three get 50% of 120 = 60, half the side: they make a round loop. The bottom left one is 0, a square corner. That is the point of the teardrop.

The hole follows the border: each of its corners has a radius of 60 − 40 = 20, half of its side too. It is round, with one square corner at the bottom left.

### 4. body, the same teardrop

body gets the same background, border and radius, and its own `margin:40 40-120-120`. It sits in html's 40 × 40 hole, at (220, 90).

- Left and right: 40 + 120 − 40 = 120 wide, from x = 220 − 120 = 100.
- Top and bottom: in quirks mode, body stretches to html's inner height minus its own margins: 40 − 40 + 120 = 120. It starts at y = 90 + 40 = 130.

I measured it: 120 × 120 at (100, 130). It is the same red teardrop, with its point at the bottom left, at (100, 250).

### 5. The half turn

`scale:-1` flips body on both axes around its center, (160, 190). Flipping both axes is the same as a half turn. The box does not move: it is a square around the same center. But the point goes from the bottom left to the top right, at (220, 130).

html's point is at its bottom left, at (180, 170). Both points are square corners of a 40px border, so each one fills a 40 × 40 square. Both squares are the same: from (180, 130) to (220, 170). That is where the two loops meet.

### 6. Half transparent

`opacity:.5` makes body, its border and its background, half transparent.

- On the beige canvas, half of the red makes pink: (226, 143, 129) in my render.
- On html's red, half red over red is still red. The shared square stays red, like the top loop.
- body's beige background only fills its hole, from (140, 170) to (180, 210). Under it is the beige canvas: half beige over beige is still beige.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `*` rule styles both boxes. Written as two rules, `html{background:#f4dcbf;border:5ch solid#d24444;border-radius:50%50%50%0;margin:50 25%130 180}body{border:5ch solid#d24444;border-radius:50%50%50%0;margin:40 40-120-120;scale:-1;opacity:.5`, the code is 195 characters, with the same picture.
- The nested `*{` reaches body in 2 characters and only changes what differs: the margin, the turn and the opacity.
- `opacity:.5` gives the pink from the same red, and keeps the shared square red. With `border-color:#e28f81` in its place (150 characters), the shared square turns pink: 1,600 pixels change, the whole 40 × 40 square.
- `scale:-1` is a half turn in 8 characters. `rotate:180deg` gives the same picture in 145 characters. Without `scale:-1` (131 characters), body's point and the square corner of its hole stay at the bottom left: 1,054 pixels change.
- `5ch` is 40px in 3 characters. `40px` gives the same picture in 141 characters. `border` does not take a bare number, even in quirks mode: with `40` (139 characters), the whole `border` declaration is dropped and both loops disappear. 20,217 pixels change.
- `25%` is 100px, the same length as `100`, but no space is needed after `%`: `25%130`. `50 100 130 180` gives the same picture in 141 characters.
- `50%50%50%0` needs no spaces for the same reason. `50% 50% 50% 0` gives the same picture in 143 characters.
- `.5` drops the leading zero. `0.5` gives the same picture in 141 characters.
- No space before a `#` or a minus sign: `solid#d24444`, `40-120-120`.
- The closing braces and tags are left out. The end of the code closes them.

## If you try it at home

The target image is a JPEG. In my Chrome, my render of the official code differs from it on almost every pixel, by 1 on most of them: only 7 pixels are identical. The beige is (244, 221, 190) in the target and (244, 220, 191) in my render. With the rule of the golf notes, 2,759 pixels differ, by up to 106. All of them are within 9px of an edge of the loops, and 2,454 within 3px. The CSS Battle judge gives the code a 100% match.
