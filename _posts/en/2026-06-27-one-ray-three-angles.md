---
title: "One ray, three angles: a yellow X in 123 characters"
ref: 2026-06-27
permalink: /2026/06/27/one-ray-three-angles/
description: "How a single offset:ray(45deg) puts html, body and p at the canvas center and turns them by −45°, −90° and −135°, making two crossed pills and a flat bar, in the June 27, 2026 CSS Battle target."
target: /assets/targets/2026-06-27.png
target_url: https://cssbattle.dev/play/0QaJpeTOUp1XCAVxQSX6
colors: ["#e3e46f", "#5dbcf9"]
player: cubachatou
chars: 123
score: 723.86
match: 100
code: |
  <p><style>*{width:0;height:60;border:5ch solid#E3E46F;background:#5DBCF9;offset:ray(45deg)}&,p{border-radius:9in;height:150
---

The June 27 target is a pale yellow X with round ends on a sky blue background. The left and right notches between its arms are cut flat. Vegy builds it from three nested boxes, html, body and p, all made of a thick yellow border. One `offset:ray(45deg)`, given to all of them, puts each box at the center and turns it by 45° more than its parent: html and p become two crossed pills, and body lies flat between them.

Use **Teaching colors** to tell the three boxes apart.

{% include animations/2026-06-27.html lang=page.lang %}

## The code, spaced out

```css
<p>
<style>
* {                          /* html, head, body, p and style */
  width: 0;                  /* the box is all border */
  height: 60;                /* body: 80 × 140 */
  border: 5ch solid#E3E46F;  /* 40px of yellow */
  background: #5DBCF9;       /* html's becomes the canvas */
  offset: ray(45deg)         /* center, and turn by −45° */
}
&,
p {                          /* & = html */
  border-radius: 9in;        /* 864px, cut down to 40px */
  height: 150                /* html and p: 80 × 230 */
```

## How it works

### 1. The page

There is no doctype: the page is in quirks mode, and a number with no unit means px in `height`.

The HTML is `<p><style>`. The elements are html, head, body, p, and style, which ends up inside p. head and style are hidden. html, body and p show, each one inside the previous one. The style is never closed, and neither is its last rule.

### 2. Three boxes made of border

`*` gives every element `width:0`, `height:60` and a `5ch` border. `ch` is the width of the "0" in the font: 8px in the default font, Times at 16px. So `5ch` is 40px, and each box is 0 + 40 + 40 = 80px wide and 60 + 80 = 140px tall.

The content is 0px wide, so the left and right borders touch: the whole box is yellow.

`background:#5DBCF9` also goes to every element. html's background paints the whole canvas: that is the sky blue. On body and p, the background sits under the border, which covers it.

With `offset` removed, the boxes follow the page flow: html at (0, 0), body at (48, 48), past html's 40px border and its own 8px margin, and p at (88, 88), right inside body's border.

### 3. Two pills

At the top level of a style sheet, `&` stands for the root: html. So `&,p` selects html and p.

`height:150` makes them 80 × 230. `border-radius:9in` is 864px, far more than the box can take: the radius is cut down to 40px, half of the 80px width. Both ends become half circles, and the boxes become pills, with a straight part 150px long. body keeps `height:60`: it stays 80 × 140, with square corners.

### 4. offset:ray(45deg): to the center

`offset` sets a path for the element. `ray(45deg)` is a straight line that starts at the center of the element's containing block. `offset-distance` is 0, so the element stays at the start: its center goes to that point, whatever its margins and its place in the flow.

- html's containing block is the canvas: its center is (200, 150).
- body's containing block is html's content box, 0 × 150, in the middle of html: its center is html's center.
- p's containing block is body's content box, 0 × 60: its center is body's center.

So all three boxes end up centered on (200, 150).

### 5. offset:ray(45deg): the turns

The ray points at 45°: 0° is straight up, and angles go clockwise, so it points up and to the right. `offset-rotate` is `auto` by default: the element turns so that its x axis follows the ray. That is a turn of 45° − 90° = −45°, an eighth of a turn counterclockwise.

Each element turns inside its parent, which has already turned. So the turns add up:

- html turns by −45°: its pill goes from top left to bottom right.
- body turns by −90°: it lies flat, 140 × 80, from x = 130 to 270 and from y = 110 to 190.
- p turns by −135°: its pill goes from top right to bottom left.

I checked the angles with renders where body or p is hidden or recolored.

### 6. The X

The two pills cross at right angles, at the center. Each one reaches 115px from the center along its diagonal: the X runs from x = 107 to 293 and from y = 57 to 243.

Between the arms, the crossing leaves four notches shaped like a V. The tips of the top and bottom ones are at y = 93.4 and 206.6: in my render, the column x = 200 is yellow from y = 93 to 206. body only goes from y = 110 to 190, so it does not reach them.

On the left and right, body fills the notches up to x = 130 and 270. Their tips become flat sides, from y = 136.6 to 163.4. In my render, the middle row is yellow from x = 130 to 269.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `offset:ray(45deg)` on `*` centers three boxes and gives them three different angles, because the turns add up from parent to child. One declaration does both the placing and the turning. The `offset` shorthand is shorter than the property itself: `offset-path:ray(45deg)` gives the same picture in 128 characters.
- `&` selects html in 1 character. `html,p` gives the same picture in 126.
- `height:60` on `*` is for body: html and p get 150 in the second rule. Without `height:60;` (113 characters), body takes the height of its content, p: 230px, so 310px with its borders. After the turn it runs from x = 45 to 355, and 12,400 pixels change.
- 60 makes body 140px long, so its ends land at x = 130 and 270. With `height:50` or `height:70` (same length), the flat sides move 5px in or out, and 240 or 340 pixels change.
- `width:0` turns each box into pure border, so the blue background never shows on the shapes. With `width:1` (same length), a 1px blue line runs along the middle of the shapes wherever nothing covers it, and 1,228 pixels change.
- `5ch` is 40px in 3 characters. `40px` gives the same picture in 124.
- `9in` is a big radius in 3 characters, and it is cut down to 40px. `40px` gives the same picture in 124.
- The `background` sits in the `*` rule, which is already open: html's blue becomes the canvas, and on body and p it stays hidden under the border.
- No space is needed between `solid` and `#`. `solid #E3E46F` gives the same picture in 124 characters.
- No unit: `height:60px` and `height:150px` give the same picture in 127 characters.
- Nothing is closed. `}` at the end gives the same picture in 124 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 726 pixels, with the same rule as in the golf notes. All of them are on the edges of the two pills, within 0.61px of the edge: 434 on the round ends and 292 on the straight 45° sides. body's flat sides at x = 130 and 270 match the target. Zoomed in, the target's edges are harder: it has 36 different colors, my render 180. The CSS Battle judge gives the official code a 100% match.
