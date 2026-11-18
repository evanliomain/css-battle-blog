---
title: "One background, two ems: a pot with handles in 141 characters"
ref: 2026-05-08
permalink: /2026/05/08/one-background-two-ems/
description: "How one radial gradient, given to html and to the body with two different font sizes, paints two ring handles and a gray pot with a notch, in the May 8, 2026 CSS Battle target."
target: /assets/targets/2026-05-08.png
target_url: https://cssbattle.dev/play/opmQKm1DyQdTX0ytBPxQ
colors: ["#df914b", "#eee"]
player: eguiluz
chars: 141
score: 704.33
match: 100
code: |
  <style>*{background:radial-gradient(1Q,#df914b 5vh,#eee 0 2.2em,#df914b)-327Q -32Q/10.6em;*{margin:65 125;border-radius:0 0 13%13%;font:554%"
---

The May 8 target is a light gray pot on an orange background. Its bottom corners are rounded, and a ring handle sticks out on each side. The right handle's hole cuts a little into the pot. David Eguiluz writes a single background, and both html and the body get it. The sizes are in `em`, and the body has a much bigger font: on html the gradient draws two small rings, on the body it draws one big gray area with a small orange notch.

**Wide view** shows the tiles off the canvas: html's on the left, and the body's 939.58px wide tile. **Teaching colors** show which element paints what: in the real colors, html's rings and the body are the same gray.

{% include animations/2026-05-08.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* every element: html, head, style, body */
  background:
    radial-gradient(1Q,          /* a circle of radius 1Q = 0.945px */
      #df914b 5vh,               /* orange up to 5vh = 15px */
      #eee 0 2.2em,              /* gray from 15 (the 0 is raised) to 2.2em: 35.2px on html, 195.01px on body */
      #df914b)                   /* the last color, raised to 2.2em, fills the rest */
    -327Q -32Q /                 /* position: −308.98px, −30.24px */
    10.6em;                      /* size: 169.6px on html, 939.58px on body; auto height */
  * {                            /* nested: every descendant; only body is displayed */
    margin: 65 125;              /* 65px top and bottom, 125px left and right */
    border-radius: 0 0 13% 13%;  /* bottom corners: 19.5 × 22.1 */
    /* 554% of 16px = 88.64px; " opens an empty font name, closed by the end of the code, like both { */
    font: 554% "
```

## How it works

### 1. One rule for two elements

`*` matches every element: html, head, style and body. head and style are not displayed, so the background goes to html and to the body.

`*{…}` nested in `*{…}` means `* *`: every element inside another one. That is head, style and body, but not html. Only the body is displayed, so the margin, the radius and the font only matter for the body.

The two elements share the background, but not the font size. html keeps the default, 16px. The body gets `554%` of its parent's 16px: 88.64px. Every `em` in the background is read with the element's own font size, so the same declaration gives two different pictures.

With `html{` in place of the first `*{` (144 characters), the body has no background of its own: it is transparent, only the two rings are left, and 23,043 pixels change by more than 8 levels compared with my render of the official code.

### 2. html's tile: 169.6 × 300 at (−308.98, −30.24)

html's background is painted over the whole canvas. The code has no doctype, so the page is in quirks mode, and html fills the window: my Chrome measures it at (0, 0), 400 × 300.

After the `/`, `10.6em` is the width of the background image: 10.6 × 16 = 169.6px. The height is `auto`. A gradient has no size of its own, so the height is the height of html's box: 300.

`-327Q -32Q` is the position, as two lengths. `Q` is the quarter-millimeter: 1in = 101.6Q, so 1Q = 0.945px. −327Q = −308.98px and −32Q = −30.24px. The tile's corner sits at (−308.98, −30.24), off the canvas on the left. My Chrome computes the position as `-308.976px -30.2362px`.

### 3. A ring of radius 1Q

`radial-gradient(1Q,…)` starts with a single length: the shape is a circle of that radius, at the center of the tile, (−224.18, 119.76). The color stops are lengths from the center, and they can go past the radius:

- `#df914b 5vh`: orange from the center up to 5vh. vh is 1% of the window's height, 300: 5vh = 15px.
- `#eee 0 2.2em`: a position smaller than an earlier one is raised to the largest earlier one. The `0` becomes 15. Gray runs from 15 to 2.2em = 2.2 × 16 = 35.2px, with a sharp edge on both sides.
- `#df914b` has no position. The last stop sits at 100% of the gradient's radius by default, and that radius is 1Q, 0.945px. This is smaller than 35.2px, so it is raised to 35.2px too. Orange fills the rest of the tile.

That makes a gray ring, 20.2px thick, around a 30px orange hole. With `circle` in place of `1Q` and `#df914b 0` at the end (147 characters), the picture is the same.

### 4. Two rings on the canvas

A background repeats by default: a copy every 169.6px across and every 300px down. The rings' centers are at x = −224.18 + 169.6 × k: −54.58, 115.02, 284.62, 454.22. The first and the last ones reach −19.38 and 419.02 at most: they stay off the canvas. Down, the copies' centers are at y = −180.24 and 419.76, off the canvas too.

On the canvas, there are two rings, centered at (115.02, 119.76) and (284.62, 119.76), from x = 79.82 to 150.22 and from 249.42 to 319.82. Everything else is orange.

### 5. The body's box

`margin:65 125` gives 65 at the top and bottom, 125 on the left and right. In quirks mode, a number with no unit means px. The body is 400 − 250 = 150 wide.

In quirks mode, the body also stretches to fill html's height, minus its margins: 300 − 130 = 170. My Chrome measures the body at (125, 65), 150 × 170.

### 6. The same background, read with 88.64px

`font:554%"` sets the body's font size: 554% of 16 = 88.64px. My Chrome computes it as `88.64px`. In the body's background:

- `10.6em` = 939.58px. The `auto` height is the body's own height, 170. The tile is 939.58 × 170.
- `2.2em` = 195.01px: the gray now runs from 15 to 195.01 around the center.
- `5vh` stays 15px: it depends on the window, not on the font.

The position is measured from the body's corner, (125, 65): the tile starts at (125 − 308.98, 65 − 30.24) = (−183.98, 34.76), and its center is at (−183.98 + 469.79, 34.76 + 85) = (285.82, 119.76).

The center lands at the same height as html's rings: the body's middle is at 65 + 85 = 150, like html's middle (300 / 2), and the same −30.24 shift moves both centers to y = 119.76. Across, it lands 1.19px to the right of the right ring's center, 284.62.

The font size picks that spot: the center's x is 125 − 308.98 + 5.3 × the font size. With `550%` (141 characters too), the font size is 88px, the center moves to x = 282.42, and 102 pixels change. With `553%`, 31 pixels change. With `555%`, 45 pixels change.

### 7. What the body shows

A background is painted only inside its element's box: here, from x = 125 to 275 and from y = 65 to 235.

The tile is 170 tall and starts 30.24 above the body, so it ends at y = 204.76. The copy below, centered at y = 289.76, covers the body's last rows. In both, the body's farthest point from the center is 181.9px away, less than 195.01: the whole body is gray. With `background-repeat:no-repeat` added to the nested rule (169 characters), my render shows the body orange below y = 204.76.

The body is painted over html's background, so it hides the inner half of each ring. On the left, the hole runs from x = 100.02 to 130.02: the body covers it from 125, and the hole stops there.

On the right, html's hole runs from x = 269.62 to 299.62, and the body covers it up to 275. But the body has its own orange disk, 15px around (285.82, 119.76): it shows from x = 270.82 to the body's edge at 275. It continues html's hole, so the right handle cuts into the pot. With `background:#eee` added to the nested rule (157 characters), the body is plain gray, the right hole stops at x = 275, and 80 pixels change.

This is why every size is in `em`. With `35.2px` in place of `2.2em` (142 characters), the body's gray shrinks to a ring around (285.82, 119.76), the rest of the body turns orange, and 24,171 pixels change. With `169.6px` in place of `10.6em` (142 characters), the body's tile is 169.6 wide and repeats: an orange disk appears inside the body, at x = 240.02, the notch on the right goes away, and 826 pixels change.

### 8. Rounded bottom corners

`border-radius:0 0 13%13%` rounds the bottom right and bottom left corners. A percentage radius is a share of the box's width across and of its height down: 13% of 150 = 19.5, and 13% of 170 = 22.1. The corners are quarter ellipses. With `0 0 19.5px 19.5px/0 0 22.1px 22.1px` (166 characters), the picture is the same. Without the radius (116 characters), the corners are square and 224 pixels change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One background serves two elements. Written as two rules, `html{…}` and `body{…}`, with the body's sizes in px (218 characters), the picture is the same.
- `*{` reaches html and the body in 2 characters, and the nested `*{` reaches the body only, in 2 more.
- `5vh` writes 15px in 3 characters, the same on both elements. With `15px` (142 characters), the picture is the same.
- `#eee 0` starts the gray where the orange ends: the `0` is raised. With `#eee 5vh` (143 characters), the picture is the same.
- `1Q` makes the gradient a circle in 2 characters, and its tiny radius raises the last stop to 2.2em with no position. With `circle,` and `#df914b 0)` (147 characters), the picture is the same.
- `-327Q` writes −308.98px in 5 characters. With `-309px` (142 characters), the picture is the same.
- `-32Q` writes −30.24px in 4 characters. With `-30px` (142 characters), the rings move 0.24px down, and 352 pixels change.
- The position follows the gradient with no space: `)-327Q`. With `) -327Q` (142 characters), the picture is the same.
- `10.6em` gives the size with no height: `auto` is 300 on html and 170 on the body, each element's own height.
- `margin:65 125` needs no units in quirks mode. With `65px 125px` (145 characters), the picture is the same.
- `13%13%` needs no space after `%`. With `13% 13%` (142 characters), the picture is the same.
- `font:554%"` sets the font size through the `font` shorthand, which needs a font name: `"` opens an empty one. With `font-size:554%` (145 characters), the picture is the same. Without the `"` (140 characters), the declaration is invalid, the body keeps 16px, and 22,369 pixels change.
- `554%` writes 88.64px in 4 characters. With `88.64px` (144 characters), the picture is the same.
- The code ends inside the string and the two rules: the end of the code closes them. With `"}}` at the end (144 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes as the target, but 499 pixels differ by more than 8 levels. They are all on the edges of the rings and of the rounded corners, from x = 80 to 319 and from y = 84 to 234. The largest difference is 146 levels, at (126, 222), on the bottom left corner: (224, 148, 81), almost orange, in my render, and (237, 232, 227), almost gray, in the target. On the row y = 120, the right hole runs from x = 271 to 299 in my render, and from 270 to 299 in the target. The flat colors are the same: (223, 145, 75) and (238, 238, 238). The CSS Battle judge gives the official code a 100% match.
