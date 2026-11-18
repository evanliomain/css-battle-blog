---
title: "Giant dots, cut in half: four half discs in 135 characters"
ref: 2026-05-17
permalink: /2026/05/17/giant-dots-cut-in-half/
description: "How two dotted borders with 180px dots and two clip-paths draw four half discs in a frame, in the May 17, 2026 CSS Battle target."
target: /assets/targets/2026-05-17.png
target_url: https://cssbattle.dev/play/qZAVSPe0t9VBVR5TGmyS
colors: ["#eeeeee", "#594c97", "#5a4c95"]
player: levito
chars: 135
score: 710.47
match: 100
code: |
  <hr size=42><style>&{border:5vw solid#217B;background:#0001;*{margin:-250-70;border:45vw dotted#438D;*{margin:0-300}clip-path:inset(5lh
---

The May 17 target shows a purple frame around a light gray rectangle. Inside, four purple half discs point to the center: one at the top, one at the bottom and one on each side. Veit Lehmann draws them with two dotted borders. body and an hr get a 180px dotted border, so each dot is a disc 180px across. A clip-path cuts four of these dots in half. The other dots are off the canvas or clipped away.

With **Wide view**, you see all twelve dots, most of them off the canvas.

{% include animations/2026-05-17.html lang=page.lang %}

## The code, spaced out

```css
<hr size=42>                    /* opens body: an hr 40px tall */
<style>                         /* goes into body, after the hr */
& {                             /* html */
  border: 5vw solid #217B;      /* a 20px frame */
  background: #0001;            /* the canvas: #eeeeee */
  * {                           /* head, body, hr, style */
    margin: -250 -70;           /* body: 500 × 760 at (-50, -230) */
    border: 45vw dotted #438D;  /* dots 180px across */
    * {                         /* hr, style */
      margin: 0 -300;           /* hr: 740 × 400 at (-170, -50) */
    }
    clip-path: inset(5lh        /* keeps 90px in from each edge */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `-250` in a margin is read in px.

The code starts with `<hr size=42>`. An hr cannot go in head, so it opens body, and the `<style>` after it goes into body too. head stays empty.

At the top level, outside any rule, `&` means `:scope`: the root element, html. The `*` inside it matches html's descendants: head, body, hr and style. The inner `*` matches their descendants: hr and style. head and style are not displayed. Three boxes are left: html, body and hr. The rules are never closed: the end of the code closes `inset(` and both rules.

### 2. A gray canvas and a purple frame

html gets `background:#0001`: black at 1/15 opacity, about 0.067. html's background paints the whole canvas. On white, it gives #eeeeee.

html also gets `border:5vw solid#217B`. 5vw is 5% of the 400px width: 20px. `#217B` is #221177 at 0.733 opacity (BB = 187/255). Over the gray, my Chrome shows #594c97. In quirks mode, html fills the canvas, 400 × 300, so the frame runs all around it. Its content box is 360 × 260, at (20, 20).

### 3. body: a 500 × 760 box

body gets `margin:-250-70`: -250px at the top and bottom, -70px on the left and right. A block with negative side margins gets wider: 360 + 2 × 70 = 500. In quirks mode, body fills html's height: 260 + 2 × 250 = 760. body sits at (-50, -230), out of the canvas on every side.

### 4. Dots as big as the border

body also gets `border:45vw dotted#438D`. 45vw is 180px. A dotted border is a row of round dots as wide as the border: here, discs 180px across. `#438D` is #443388 at 0.867 opacity. Over the gray, my Chrome shows #5a4c95.

The left border runs from x = -50 to 130, so its dots are centered on x = 40. In my Chrome, each corner gets a dot, and more dots go between the corners when they fit. On the left and right sides, the corner dots are centered at y = -140 and 440, 580px apart: one more dot fits, at y = 150. On the top and bottom, the corner dots are only 320px apart, with no dot between them. body has six dots, centered at (40, -140), (360, -140), (40, 150), (360, 150), (40, 440) and (360, 440). Its content box is 140 × 400, at (130, -50).

### 5. hr: a 740 × 400 box

hr is inside body, so the inner `*` reaches it: `margin:0-300` replaces the first margin. hr keeps the 180px dotted border and the clip-path of the outer `*`.

`size=42` is an old HTML attribute for the height of an hr. In my Chrome, the hr's computed height is 40px. With -300px on each side, hr is 140 + 600 = 740 wide, from x = -170 to 570. With the border, it is 40 + 360 = 400 tall, from y = -50, the top of body's content box, to 350.

Its corner dots are centered at x = -80 and 480, 560px apart: one more dot fits on the top and on the bottom, at x = 200. On the left and right sides, the corner dots are 220px apart, with no dot between them. hr has six dots, centered at (-80, 40), (200, 40), (480, 40), (-80, 260), (200, 260) and (480, 260).

### 6. body's clip-path cuts the side dots

`clip-path:inset(5lh)` keeps a rectangle 5lh inside each edge of the box. lh is the line height. In my Chrome, 1lh is 18px, so 5lh is 90px. On body, the rectangle runs from x = 40 to 360 and from y = -140 to 440.

The side dots are centered on x = 40 and 360, so the clip keeps their inner halves: the left and right half discs, from y = 60 to 240. The four corner dots are cut to quarters, all off the canvas. A clip-path also clips the element's children: hr's corner dots, centered on x = -80 and 480, are completely outside and disappear.

### 7. hr's clip-path cuts the top and bottom dots

On hr, the same 90px gives x = -80 to 480 and y = 40 to 260. The middle dots are centered on y = 40 and 260, so the clip keeps their inner halves: the top and bottom half discs, from x = 110 to 290. The flat sides of the four half discs sit 20px inside the frame, on the edges of the clip rectangles.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- Dotted borders draw discs with no `border-radius`, and one border gives several of them. The clip-paths keep only the four halves that the target needs.
- `<hr size=42>` gives the hr its height with no CSS. With `<p>` in its place and `;height:40` in the inner rule (136 characters), the picture is the same. Without the size, `<hr>` (127 characters), the hr's content is 0px tall: the bottom half disc moves up 40px, touches the top one and covers the side ones, and 14,107 pixels change.
- At the top level, `&` is html in 1 character. With `html{` (138 characters), the picture is the same.
- Nesting saves the selectors. With flat rules, `html{…}* *{…;clip-path:inset(5lh)}* * *{margin:0-300` (145 characters), the picture is the same.
- The code ends inside `inset(`, and the end of the code closes it and both rules. With `)}}` at the end (138 characters), the picture is the same.
- Viewport units are short: `5vw` is 20px and `45vw` is 180px, one character less than `20px` and `180px`. Bare numbers do not work there: with `border:20 solid#217B` (134 characters), my Chrome drops the declaration, the frame disappears, the half discs move, and 55,886 pixels change. With `border:180 dotted#438D` (134 characters), there are no dots, and 51,288 pixels change.
- `5lh` is 90px in 3 characters, one less than `90px`. With `inset(90` (134 characters), my Chrome drops the clip-path: the dots stay whole, and 30,003 pixels change.
- Bare numbers in the margins, thanks to quirks mode. With `-250px -70px` and `0 -300px` (143 characters), the picture is the same.
- No spaces where a token ends on its own. In `-250-70`, the minus sign starts a second number: with `-250 -70` (136 characters), the picture is the same. `solid#217B` and `dotted#438D` need no space before the `#`.
- The colors are 4-digit hex with alpha: `#217B` and `#438D` are 5 characters each, `#594C94` is 7. With `#594C94` in both borders (139 characters), no channel moves by more than 3.

## If you try it at home

In my local Chrome (version 157 when this was written), the official code matches the target except on the curved edges. 994 pixels are more than 8 off the target in one channel, up to 121, and all of them are within 0.64px of the edge of one of the four circles. The flat colors differ by at most 3 in one channel. The CSS Battle judge gives the official code a 100% match.
