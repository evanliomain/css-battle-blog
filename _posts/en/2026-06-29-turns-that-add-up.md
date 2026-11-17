---
title: "Turns that add up: an hourglass in 125 characters"
ref: 2026-06-29
permalink: /2026/06/29/turns-that-add-up/
description: "How one offset:ray(45deg) centers html, body and a p and turns each one 45° more than its parent, so that three coral borders draw an X between two bars, in the June 29, 2026 CSS Battle target."
target: /assets/targets/2026-06-29.png
target_url: https://cssbattle.dev/play/U6GK7X9GVm5KHz4RFhdZ
colors: ["#ed736e", "#161e44"]
player: eguiluz
chars: 125
score: 721.52
match: 100
code: |
  <p><style>*{border:27Q solid#ed736e;width:0;height:150;+*{background:#161e44;padding:35 50;border-width:0 50}offset:ray(45deg
---

The June 29 target is a coral hourglass on a navy background: two thick horizontal bars, joined by a big X, with two small navy triangles where the X crosses. David Eguiluz draws it with three borders, on html, body and a p. One `offset:ray(45deg)` puts every box at the center and turns it −45° inside its parent. The turns add up: −45° for html, −90° for body, −135° for p.

Use **Teaching colors** to tell the three elements apart, since they all have the same coral border.

{% include animations/2026-06-29.html lang=page.lang %}

## The code, spaced out

```css
<p><style>
* {                           /* html, head, body, p and style */
  border: 27Q solid#ed736e;   /* 25.51px, drawn 25px */
  width: 0;
  height: 150;                /* html and p: 50 × 200 bars */
  +* {                        /* body, right after head */
    background: #161e44;      /* goes to the canvas */
    padding: 35 50;
    border-width: 0 50        /* body: 200 × 220, borders left and right */
  }
  offset: ray(45deg           /* centered, turned −45° inside the parent */
```

## How it works

### 1. The page

There is no doctype: the page is in quirks mode, and a number with no unit means px in `height`, `padding` and `border-width`.

`<p>` opens body, and the `<style>` lands inside the p. The style is never closed, and neither are its rules. So the elements are html, head, body, p and style. head and style are hidden: only html, body and p show.

`*` selects all of them. The nested `+*` means `* + *`: an element that follows a sibling. Only body does, right after head. `offset` comes after the nested rule, but it still belongs to `*`.

### 2. Three boxes, one border

`27Q` is 27 quarter millimeters: 25.51px. In my Chrome, getComputedStyle gives a 25px border: Chrome draws border widths in whole pixels, rounded down.

With `width:0;height:150`, the content of each box is 0 × 150. html and p are just their borders: 50 × 200 bars.

body gets more. `padding:35 50` makes it 0 + 50 + 50 = 100 wide and 150 + 35 + 35 = 220 tall. `border-width:0 50` removes its top and bottom borders and widens the left and right ones to 50px. body is 200 × 220: two coral columns, 50 × 220, with a 100px gap. offsetWidth and offsetHeight give 50 × 200 for html and p, and 200 × 220 for body.

### 3. A navy canvas

The background is on body, not on html. When html has no background, the browser paints body's background on the whole canvas, and body paints none itself. So the canvas is navy, and the middle of body is see-through: html's bar shows between body's two columns.

### 4. offset:ray(45deg): to the center

`offset` is the shorthand for the motion path properties. Here it gives each box the path `ray(45deg)`: a ray that starts at the center of the box's containing block and points 45° clockwise from straight up.

With no distance, the box sits at the start of the ray: its center goes to the center of its containing block.

- html: its containing block is the 400 × 300 canvas. Its center goes to (200, 150).
- body: its containing block is html's content box, 0 × 150, in the middle of html. body's center goes to html's center: (200, 150) again.
- p: its containing block is body's content box, 0 × 150. It sits 100px from body's left edge and 35px from its top: also the middle of body. p's center goes to (200, 150) too.

body keeps its default 8px margin, and p its 16px margins at the top and bottom. They change nothing: the offset moves each center anyway. In my render, the bars run from x = 90 to 310, centered on x = 200.

### 5. The turns add up

On a ray, the box also turns, so that its x axis follows the ray. The ray points 45° clockwise from straight up, which is 45° counterclockwise from the x axis: each box turns by −45°.

The turns are transforms, and transforms nest: a child turns inside its turned parent.

- html: −45°. The tall bar leans like a backslash.
- body: −45° − 45° = −90°. The 200 × 220 box is now 220 wide and 200 tall. Its left and right columns become the top and bottom bars: 220 × 50, from x = 90 to 310, from y = 50 to 100 and from y = 200 to 250.
- p: −90° − 45° = −135°. A tall bar turned by −135° leans the other way, like a slash.

### 6. The X and the two triangles

Each diagonal bar is 200 long, centered on (200, 150). Its ends stop 100px from the center, inside the horizontal bars: the corners of the top-left end are at (111.6, 97.0) and (147.0, 61.6), above y = 100.

Where the two bars cross, they overlap in a square turned 45°, 50px on each side. Its top corner is at y = 150 − 25√2 = 114.6. Between the top bar and that corner, a small navy triangle is left: its base runs on y = 100 from x = 185.4 to 214.6, and its tip is at (200, 114.6). In my render, the column x = 200 is navy down to y = 112 and coral from y = 115. The bottom triangle is its mirror, from y = 185.4 down to 200.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One rule draws the three shapes: `*` gives html, body and p the same coral border and the same size. body only changes its padding, its border widths and its background.
- `offset:ray(45deg` centers each box and turns it, in one declaration. With `rotate:-45deg` (122 characters), the boxes turn the same way, but around their own centers, where they were laid out, near the top left corner: 41,545 pixels change. `offset-path:` instead of `offset:` gives the same picture in 130 characters.
- One angle gives three: nesting adds the turns, −45°, −90° and −135°.
- The margins can stay: the offset moves each center to the right place anyway. With `margin:0` added (134 characters), the picture is the same.
- `+*` selects body in 2 characters. `body` gives the same picture in 127.
- `27Q` is 25px in 3 characters, once Chrome rounds it down. `25px` gives the same picture in 126. `26Q` is 24.57px, drawn 24px: the diagonal bars get thinner, and 731 pixels change.
- The background goes in the nested rule: only body gets it, and the browser moves it to the canvas. In the first rule (still 125 characters), html has a background too, so body paints its own navy box. It hides html's bar between the two horizontal bars, and 5,061 pixels change.
- `border-width:0 50` is needed. Without it (107 characters), body keeps a 25px border on all four sides, and becomes a 270 × 150 coral frame, from x = 65 to 335: 17,876 pixels change.
- `<p>` adds the third bar for 3 characters. Without it (122 characters), the slash is missing, and 4,754 pixels change.
- No unit: `height:150px`, `padding:35px 50px` and `border-width:0 50px` give the same picture in 133 characters.
- A `#` starts a new value: `solid#ed736e` needs no space. `solid #ed736e` gives the same picture in 126.
- Nothing is closed. `)}` at the end gives 127 characters, and `)}</style>` 135, for the same picture.
