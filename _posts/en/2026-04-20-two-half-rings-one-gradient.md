---
title: "Two half rings, one gradient: a bowl in 108 characters"
ref: 2026-04-20
permalink: /2026/04/20/two-half-rings-one-gradient/
description: "How one radial gradient, given to html and body, draws two half rings cut by their tile edges, with a variable that only body gets and a fallback that brings html's position and the pink canvas, in the April 20, 2026 CSS Battle target."
target: /assets/targets/2026-04-20.png
target_url: https://cssbattle.dev/play/ubfUyIqOg6n4llkNB3U7
colors: ["#38051e", "#de387b"]
player: h_blierzt
chars: 108
score: 742.9
match: 100
code: |
  <style>*{*{--p:92q}background:radial-gradient(1q at top,#0000 5ch,#38051E 0 15ex,#0000)0 var(--p,50vh#DE387B
---

The April 20 target is a dark bowl on a bright pink background: a half disc at the bottom, a step on each side, and a small pink half circle cut out of the top. H_Bliertz draws it with one radial gradient, given to html and body. Each copy is a ring, cut in half by the edge of its tile. A variable that only body gets places body's half ring higher. html takes the fallback, which also brings the pink.

With **Wide view**, the tiles above the canvas show. With **Teaching colors**, each half ring gets its own color.

{% include animations/2026-04-20.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* html, head, style, body */
  * {                        /* head, style, body */
    --p: 92q;                /* 86.93px, not set on html */
  }
  background: radial-gradient(
      1q at top,             /* a 0.945px circle, centered on the top edge */
      #0000 5ch,             /* transparent up to 40px */
      #38051E 0 15ex,        /* dark from 40px to 15ex */
      #0000                  /* at 100% = 0.945px: pulled up to 15ex */
    )0 var(--p,50vh#DE387B   /* body: 0 92q; html: 0 50vh and the color */
/* the end of the code closes var( and the rule */
```

## How it works

### 1. Two boxes, one rule

CSS Battle pages have no doctype, so they are in quirks mode. The `<style>` goes into head, and body stays empty.

`*` matches html, head, style and body. The nested `*{` matches every element inside another one: head, style and body, but not html. head and style are not displayed, so two boxes are left. In quirks mode, html fills the 400 × 300 frame, and body fills html minus its default 8px margin: 384 × 284 at (8, 8). getBoundingClientRect gives these two boxes.

### 2. A variable for body only

Only the nested rule sets `--p:92q`. So html and body get the same `background`, but `var(--p,50vh#DE387B` does not give them the same thing.

- body has `--p`. Its background is the gradient at position `0 92q`, with no color. 1Q is a quarter of a millimeter, 0.945px: 92q is 86.93px (getComputedStyle gives `0px 86.9291px`).
- html has no `--p`, so the fallback is used: `50vh#DE387B`. The background is the gradient at position `0 50vh`, that is 0 150px, on a `#DE387B` color.

The background of the root element is painted on the whole canvas, so the canvas is pink. html has a background, so body's stays in body's box.

### 3. One sharp ring

`radial-gradient(1q at top, …)` is a circle with a 1q radius, 0.945px, centered on the middle of the top edge of the image. The color stops are lengths, and the gradient goes on past the circle:

- `#0000 5ch`: transparent up to 5ch. With the default 16px Times font, 5ch is 40px in my Chrome.
- `#38051E 0 15ex`: a stop at `0` is pulled up to the previous one, 40px, so the dark starts there with a sharp edge. It goes up to 15ex.
- `#0000`: the last stop has no position, so it goes at 100%, the circle's radius: 0.945px. That is below 15ex, so it is pulled up to 15ex. The ring ends with a sharp edge too.

In my Chrome, 15ex is 107.695px: getComputedStyle writes the gradient with `107.695px` in its place. The target puts the outer edge 110px from the center: see the last section. Below, I give the target's numbers.

### 4. The tile edge cuts html's ring

No `background-size` is set, so html's image is the size of html's box, 400 × 300, and it repeats. The position starts a tile at (0, 150). The ring is centered on the top edge of each tile: at (200, 150).

The upper half of that ring would be in the tile above. But that tile shows its own bottom part there, which is transparent: its ring is centered 300px higher, at y = -150. So html draws only the bottom half ring, from y = 150 to 150 + 110 = 260, with a 40px hole.

### 5. body's half ring, on top

body's image is the size of body's box, 384 × 284, from body's corner (8, 8). The position moves it down 86.93px: a tile starts at y = 8 + 86.93 = 94.93, and its ring is centered at x = 8 + 192 = 200. The tile above has its ring 284px higher, far above the canvas. So body draws a half ring from y = 94.93 to 94.93 + 110 = 204.93. Its hole, transparent, shows the pink canvas down to y = 134.93: the pink half circle at the top of the bowl.

body is painted after the canvas, so its half ring covers html's. It hides html's hole, which runs from y = 150 to 190. At y = 150, body's outer edge is √(110² − 55.07²) = 95.22px from the middle, and html's is 110px. That leaves html's ring sticking out on each side, from y = 150: the two steps, 14.78px wide. Lower down, the bottom of the bowl is html's ring.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `background` for two boxes. The variable changes only what differs. With two rules, `html{background:radial-gradient(1q at top,#0000 5ch,#38051E 0 15ex,#0000)0 50vh#DE387B}body{background:radial-gradient(1q at top,#0000 5ch,#38051E 0 15ex,#0000)0 92q` (172 characters), the picture is the same.
- The variable is needed. Without `*{--p:92q}` (98 characters), body takes the fallback too. It gets the pink color, and its pink box hides html's half ring. Its own half ring is centered at y = 8 + 150 = 158, and 14,978 pixels change.
- body's background is needed. With `html{` in place of `*{*{--p:92q}` (101 characters), only html's half ring is left, with its hole, and 11,530 pixels change.
- The nested `*{` reaches body without html. With `body{--p:92q}*{` in its place (111 characters), the picture is the same.
- `1q` makes the circle and sets 100% at 0.945px, so the last `#0000` lands on 15ex. With `circle at top` (112 characters), 100% is the distance to the farthest corner of the tile. The dark fades out from 15ex to there, over most of the canvas, and 92,789 pixels change. With only `at top` (105 characters), the shape is an ellipse: the hole turns oval, the dark fades out too, and 93,991 pixels change.
- The last stop needs no position. With `#0000 0` (110 characters), the picture is the same.
- `#0000` is 5 characters, `transparent` 11. With `transparent` twice (120 characters), the picture is the same.
- `5ch` is 40px in 3 characters. With `40px` (109 characters), the picture is the same.
- `15ex` is 4 characters, `110px` is 5. With `110px` (109 characters), my render moves to the target's edges: see the last section.
- `50vh` is 150px in 4 characters. With `150px` (109 characters), the picture is the same.
- `92q` is 86.93px in 3 characters. With `87px` (109 characters), body's half ring moves down 0.07px, and 248 pixels change, between y = 94 and 149, by 13 levels at most.
- The fallback holds a position and a color, with no space before `#`. With `) 0` and `50vh #DE387B` (110 characters), the picture is the same.
- The code ends inside `var(` and the rule: the end of the code closes them. With `)}` at the end (110 characters), the picture is the same.

## If you try it at home

In my local Chrome (version 157 when this was written), the official code draws the same shapes as the target, a little smaller. 15ex is 107.695px there, where the target puts the outer edges 110px from the centers. In my render, body's half ring runs from x = 92.3 to 307.7, where the target has 90 to 310, and the bowl ends at y = 257.7 instead of 260. 2,644 pixels are more than 8 off the target in one channel, and 856 of them by 140 levels or more.

In a test copy with `110px` in place of `15ex` (109 characters), the edges land where the target has them. 2,132 pixels are left, all within 7 pixels of an edge, and only 20 of them are off by 140 levels or more. The target is a JPEG, with blurred and noisy edges. The CSS Battle judge gives the official code a 100% match. The animation above puts the edges where the target has them.
