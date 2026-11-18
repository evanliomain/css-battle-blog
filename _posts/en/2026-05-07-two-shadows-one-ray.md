---
title: "Two shadows, one ray: four framed leaves in 145 characters"
ref: 2026-05-07
permalink: /2026/05/07/two-shadows-one-ray/
description: "How two box shadows on a 7px box, and offset:ray(0deg) turning html, body, dl and p a quarter turn each, draw four green leaves framed in navy in the May 7, 2026 CSS Battle target."
target: /assets/targets/2026-05-07.png
target_url: https://cssbattle.dev/play/Z3lKKVf2KPlgDDljnQaz
colors: ["#3157b4", "#84be8d", "#060f55"]
player: emohdaziz
chars: 145
score: 700.43
match: 100
code: |
  <dl><p><style>*{background:#3157b4;box-shadow:60px 60px 0 39q#84be8d,60px 60px 0 49q#060f55;border-radius:50%0 0;height:7;width:7;offset:ray(0deg
---

The May 7 target shows four green leaves on a blue background, in a 2 × 2 grid. Each leaf has a navy frame and one round corner, and the round corners all face the center. Mohamed Ali draws one leaf, as two shadows of a 7px box, and gives it to html, body, dl and p. `offset:ray(0deg` stacks the four boxes in the middle of the canvas and turns each one a quarter turn more than its parent: the same leaf lands in the four corners.

With **Teaching colors**, each box and its navy frame get their own color, and arrows show which way each box sends its shadows.

{% include animations/2026-05-07.html lang=page.lang %}

## The code, spaced out

```css
<dl><p>                        /* html > body > dl > p */
<style>
* {                            /* html, head, body, dl, p, style */
  background: #3157b4;         /* html's goes to the whole canvas */
  box-shadow:
    60px 60px 0 39q #84be8d,   /* green: 60px right and down, grown by 36.85px: 80.70 square */
    60px 60px 0 49q #060f55;   /* navy, below: grown by 46.30px: 99.60 square */
  border-radius: 50% 0 0;      /* top left corner: 3.5px */
  height: 7;                   /* 7px in quirks mode */
  width: 7;
  /* a path: centered in the containing block, turned -90°; the end of the code closes ( and { */
  offset: ray(0deg
```

## How it works

### 1. Four boxes, one inside the other

`<dl><p>` opens two elements, and neither closes the other. The `<style>` lands inside p, so the page is html > body > dl > p.

`*` targets every element: html, head, body, dl, p and style. head and style are not displayed. That leaves four boxes, and they all get the same rule.

CSS Battle pages have no doctype, so they are in quirks mode. `height:7;width:7` needs no unit there: the four boxes are 7 × 7.

### 2. The background

html is the root, so its background is painted on the whole canvas, not just in its 7 × 7 box. That gives the blue, `#3157b4`.

body, dl and p get the same blue background. Their boxes end up in the middle of the canvas (next section), blue on blue: they never show.

### 3. offset: ray(0deg)

`offset` puts a box on a path, and `offset:ray(0deg` is a ray with an angle of 0deg. With the default `offset-position`, the ray starts at the center of the containing block, and the box's center sits on that point.

- html's containing block is the canvas: its center is (200, 150).
- body's containing block is html, dl's is body, p's is dl. Each one goes to the center of its parent, so all four stack at the same place.

In a test copy with a red background on p, my render shows the box from (196.5, 146.5) to (203.5, 153.5): the pixels at x = 196 and 203 are half red.

### 4. Quarter turns that add up

`offset-rotate` is `auto` by default: the box turns to follow the path. A ray at 0deg points up, and the box turns by 0° − 90° = −90°: a quarter turn counterclockwise, around its center.

A box turns with everything inside it, so a child's turn adds to its parent's. html turns −90°, body −180°, dl −270°, and p −360°, as if it had not turned. The four boxes have the same center, so the turns only change where their shadows go.

I checked this in a test copy, with one shadow color per element: html's leaf is at the top right, body's at the top left, dl's at the bottom left and p's at the bottom right. With `ray(90deg` (146 characters), the turn is 0° for every box: the four leaves pile up at the bottom right, and 28,799 pixels change.

### 5. The green shadow

I take p's shadows, as p ends up unturned. `60px 60px 0 39q#84be8d` copies the box 60px to the right and 60px down. The `0` is the blur: none. The fourth length is the spread: the copy grows by 39q on each side. 1in = 101.6Q, so 1Q = 0.945px and 39q = 36.85px.

The green square is 7 + 2 × 36.85 = 80.70 wide, centered at (260, 210): from (219.65, 169.65) to (300.35, 250.35).

`border-radius:50%0 0` rounds the top left corner by 50% of 7: 3.5px. The other three stay square. In the shadow, that corner becomes a quarter circle centered on the leaf's center: along the diagonal, my render puts the edge of the green 40.3px from (260, 210), which is 3.5 + 36.85 = 40.35, half the side. That corner faces the canvas center.

### 6. The navy shadow below

`60px 60px 0 49q#060f55` does the same with 49q = 46.30px: a navy square of 7 + 2 × 46.30 = 99.60, from (210.20, 160.20) to (309.80, 259.80), with a round corner of 3.5 + 46.30 = 49.80.

The first shadow in the list is painted on top. The green covers the navy, and only a rim of 49q − 39q = 10q = 9.45px is left: the frame. With the two shadows swapped (145 characters), the navy covers the green, and 25,381 pixels change.

### 7. Four leaves

The four boxes have the same shadows, but each one carries them its own way round. A shadow 60px right and down in p's frame goes, in canvas terms:

- html, −90°: to the top right, centered at (260, 90);
- body, −180°: to the top left, (140, 90);
- dl, −270°: to the bottom left, (140, 210);
- p, −360°: to the bottom right, (260, 210).

The round corner turns too, so it always faces the center. The leaves are 99.60 wide and 120 apart: 2 × (60 − 49.80) = 20.40px of blue is left between them.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow pair and one turn serve four boxes. The turns add up, so the same leaf lands in four places.
- The two tags must nest. With `<p><p>` (144 characters), the second p closes the first one: both are children of body and both turn −270°. They draw the same leaf at the bottom left, the bottom right leaf is missing, and 9,840 pixels change.
- `offset:ray(0deg` centers and turns every box in 15 characters. Written `offset-path:ray(0deg` (150 characters), the picture is the same.
- The angle needs its unit. With `ray(0` (142 characters), the declaration is invalid and dropped: the boxes stay in the flow, unturned, the leaves pile up near the top left corner, and 45,641 pixels change.
- 0deg is not the only angle that works: with `ray(180deg` (147 characters), each box turns +90° instead, html's leaf goes to the bottom left and dl's to the top right, and the picture is the same.
- `height:7;width:7` needs no unit in quirks mode. With `7px` twice (149 characters), the picture is the same.
- The 7px box sets the size of everything: its 50% radius, 3.5px, plus the spread gives the leaf's quarter circle.
- `39q` and `49q` write 36.85px and 46.30px in 3 characters each. With `36.5px` and `46.5px` (151 characters), my render comes closer to the target: 485 pixels differ from it by more than 8 levels, against 2,685 for the official code.
- No space before a `#`: `39q #84be8d` and `49q #060f55` give the same picture in 147 characters.
- `50%0 0` needs no space after `%`, and three values are enough: the third one sets the bottom right corner, and the second one the top right and bottom left. With `50% 0 0` (146 characters), the picture is the same.
- The code ends inside `ray(` and inside the rule: the end of the code closes them. With `)}` at the end (147 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same four leaves as the target, but 2,685 pixels differ by more than 8 levels. They are all on the edges of the leaves, from x = 90 to 309 and from y = 40 to 259, 662 to 687 per leaf. The flat colors are the same: (49, 87, 180), (132, 190, 141) and (6, 15, 85). In the target, the edges sit on whole pixels: on the row y = 210, the navy runs from x = 210 to 309 and the green from 220 to 299. In my render, the pixels at x = 210, 219, 300 and 309 on that row are blends of the two colors on each side. The largest difference is 163 levels, on the edge of a round corner. The CSS Battle judge gives the official code a 100% match.
