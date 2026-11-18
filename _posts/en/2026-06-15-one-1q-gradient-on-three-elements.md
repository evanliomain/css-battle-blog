---
title: "One 1q gradient on three elements: a four-pane window in 145 characters"
ref: 2026-06-15
permalink: /2026/06/15/one-1q-gradient-on-three-elements/
description: "How one radial gradient of size 1q draws a ring on the canvas with html and two squares with a hole with body and p, why 1q gives it hard edges, and how the borders of body and p draw the cross, in the June 15, 2026 CSS Battle target."
target: /assets/targets/2026-06-15.png
target_url: https://cssbattle.dev/play/huzTWsbhbRLHx1qJWmnm
colors: ["#2d696f", "#81a5a9"]
player: h_blierzt
chars: 145
score: 700.43
match: 100
code: |
  <p><style>*{*{p{margin:90}height:90;width:90}margin:5 30;border:solid 5vw#2D696F;background:radial-gradient(1q,#2D696F 5vh,#81A5A9 0 25vw,#2D696F
---

The June 15 target looks like a window with four panes on a dark teal background: two light squares with a small dark hole, top left and bottom right, and two light quarter discs, top right and bottom left. H_Bliertz gives html, body and p the same border and the same radial gradient: a dark hole, a light ring, then dark again. On html it becomes a big ring on the canvas, and body and p cover two quarters of it with their squares. The gradient's size, `1q`, gives it its hard edges.

Use **Teaching colors** to tell the three elements apart, and **Wide view** to see html's gradient repeat around the canvas.

{% include animations/2026-06-15.html lang=page.lang %}

## The code, spaced out

```css
<p><style>
* {                        /* html, head, body, p, style */
  * {                      /* everything inside html: head, body, p, style */
    p {                    /* p */
      margin: 90;          /* 90 = body's width: p starts at (190, 140) */
    }
    height: 90;
    width: 90;
  }
  margin: 5 30;            /* html: 340 × 290 at (30, 5); body at (80, 30) */
  border: solid 5vw #2D696F;   /* 5vw = 20px, in the canvas color */
  background:
    radial-gradient(
      1q,                  /* a circle of radius 0.945px */
      #2D696F 5vh,         /* dark up to 15px: the hole */
      #81A5A9 0 25vw,      /* light from 15px to 100px */
      #2D696F              /* dark: its 100% is 0.945px, so it starts at 100px */
```

## How it works

### 1. Five elements, three that show

The page starts with `<p>`. The browser adds html, head and body, and puts p and style in body. So `*` selects five elements: html, head, body, p and style. head and style are hidden. html, body and p are left.

The rules are nested. `*{*{…}}` means `* *`: every element inside another one, so everything but html. `*{*{p{…}}}` means `* * p`: only p. So `height:90;width:90` goes to body and p, and `margin:90` only to p. html keeps the margin `5 30`.

### 2. html: a frame that never shows

CSS Battle pages have no doctype, so they are in quirks mode. There, a unitless length like `5 30` is read in px, and html fills the height of the page. Its box is 400 − 60 = 340px wide and 300 − 10 = 290px tall, at (30, 5).

`5vw` is 5% of the 400px viewport width: 20px. Inside that border, html's padding box is 300 × 250, at (50, 25). Its margins are the same on both sides, so its center is the canvas center, (200, 150). The border is `#2D696F`, the canvas color: it never shows.

### 3. One gradient, hard edges

html is the root, so its background is painted on the whole canvas. The gradient is laid out in html's padding box, centered on (200, 150).

`radial-gradient(1q,…)` starts with a single length: that makes it a circle, of radius `1q`, a quarter millimeter, 0.945px. The stop positions in px are measured from the center, and they can go far past that circle. Dark up to `5vh`, 5% of 300: 15px. Then `#81A5A9 0`: a stop cannot sit before the previous one, so 0 moves up to 15px. The light starts right there, with no blend, and goes on up to `25vw`, 100px.

The last `#2D696F` has no position. A last stop goes at 100% of the gradient, here the 0.945px circle. That is before 100px, so it moves up to 100px too: dark starts right at 100px, and stays dark beyond. The result is a light ring around (200, 150), from 15px to 100px, with two hard edges.

### 4. Tiles over the whole canvas

The code sets no background color. The gradient is as big as html's padding box, 300 × 250, and it repeats. Its four corners are dark, more than 100px from its center. The tiles around the middle one fill the rest of the canvas with that dark color.

Their rings do not show. The tile on the left has its center at (−100, 150): its ring stops at x = 0. The same goes for the tiles on the right, above and below: their rings stop right at x = 400, y = 0 and y = 300.

### 5. body and p: two squares with a hole

body is 90 × 90 with a 20px border: 130 × 130. html's content box starts at (50, 25), and body's margin `5 30` puts it at (80, 30). Its padding box is 90 × 90, at (100, 50).

body gets the same gradient, centered in its own padding box, (145, 95). The hole is 15px. The square's corners are only 45 × √2 = 63.6px from the center, less than 100px: the rest of the square is light. The border is painted over the background, as a dark 20px frame.

p is inside body. Its margin of 90 is counted from body's content box, which goes from (100, 50) to (190, 140). 90 is exactly body's width and height, so p starts where body's content ends: at (190, 140). Its padding box goes from (210, 160) to (300, 250), and its hole is at (255, 205).

### 6. The cross and the quarter discs

body's right and bottom borders and p's left and top borders draw a dark cross, 20px wide, through (200, 150). They meet on a 20 × 20 square at (190, 140), where p's border lies on body's.

body and p cover the top-left and bottom-right quarters of html's ring. The two other quarters are left: the quarter discs. Their round edge is the 100px circle around (200, 150). It touches y = 50, the top of body's light square, and x = 300, the right of p's.

The cross covers the ring's hole too, almost. The hole has a radius of 15px, but the cross only goes 10px on each side of (200, 150). At the cross's inner corners, the hole sticks out by one pixel: in my render, the pixels at (210, 139) and (189, 160) are dark. When I remove html's hole, only these two pixels change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `1q` does two jobs in 2 characters. A single length makes the gradient a circle. And it makes 100% tiny, so the last stop, with no position, snaps to 100px: a hard edge. With `circle` instead (149 characters), 100% is the farthest corner, 195.3px from html's center: the light fades into the dark from 100px to 195px, and 50,700 pixels change. `circle` needs `#2D696F 0` at the end to give the same picture: 151 characters.
- With no size at all (142 characters), the gradient is an ellipse and the edge fades: 51,182 pixels change. With `#2D696F 0` at the end (144 characters), only the ellipse is left: html's ring takes the shape of its 300 × 250 padding box: 100px from the center across, 83.3px up and down. The quarter discs get flat, and 2,280 pixels change.
- `1q` is the shortest length that works. `1px` gives the same picture in 146 characters. With `0q`, the gradient has no size: it only paints its last color, all the light is gone, and 26,680 pixels change.
- `#81A5A9 0` makes the first hard edge with one character: 0 moves up to 15px. `#81A5A9 5vh` gives the same picture in 147 characters.
- The viewport units of the 400 × 300 canvas are one character shorter than px: `5vh` is 15px, `25vw` is 100px, `5vw` is 20px. With `15px`, `100px` or `20px`, the picture is the same in 146 characters. `5vw#2D696F` needs no space: the unit ends the number.
- The border needs its unit. With a bare `20` (`border:solid 20 #2D696F`, 145 characters), Chrome drops the whole `border` declaration: no border at all, and body's and p's margins collapse into each other. 15,985 pixels change.
- The dark around the drawing costs nothing: it is the gradient's last color, in repeated tiles. With `)no-repeat` after the gradient (155 characters), everything outside html's box turns white, and 21,400 pixels change. Without the last `,#2D696F` (137 characters), everything past 15px is light, and 51,086 pixels change.
- The nested rules save 2 characters. `* *{height:90;width:90}p{margin:90}*{…` gives the same picture in 147 characters.
- `margin:90` is body's width, so p starts right where body's content ends. With `margin:80`, same length, p moves 10px up and left into the cross, and 6,092 pixels change.
- Nothing is closed. `)}` at the end gives the same picture in 147 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 1,057 pixels, with the same rule as in the golf notes. All of them are within 8px of an edge between the two colors. Two of them are the corners of html's hole, at (210, 139) and (189, 160): dark in my render, light in the target. The target is a JPEG: it has 1,473 different colors, my render 2, and its flat colors are `#2e696f` and `#82a5a9`. The CSS Battle judge gives the code a 100% match.
