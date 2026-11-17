---
title: "Body's 8px margin, zoomed: a fuse in 121 characters"
ref: 2026-07-18
permalink: /2026/07/18/bodys-8px-margin-zoomed/
description: "How zoom:2.5 turns body's default 8px margin into a 20px frame, and how one shadow list on html and body draws eight rectangles, in the July 18, 2026 CSS Battle target."
target: /assets/targets/2026-07-18.png
target_url: https://cssbattle.dev/play/LJiv45bjokCqLDhpIzOX
colors: ["#469dba", "#394257", "#fae29e"]
player: selenit
chars: 121
score: 726.24
match: 100
code: |
  <style>*{box-shadow:0 2pc,0 6pc,72q 4pc,-72q 4pc;color:FAE29E}&{zoom:2.5;background:#479DBA;color:#323B;margin:-20 42 108
---

The July 18 target shows a gray-blue frame on a blue background, with a pale yellow bar at the top and one at the bottom. Two gray bands come out of its sides to the canvas edges, with a yellow bar inside each. Ilya Streltsyn adds no element: html and body share one list of four shadows. html's copies are gray and make the frame. body's copies are yellow, and `zoom:2.5` turns body's default 8px margin into 20px, so each yellow copy sits 20px inside a gray one.

Use **Teaching colors** to tell html's four shadows apart, and **Wide view** to see html and body above the canvas.

{% include animations/2026-07-18.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html and body (head is hidden) */
  box-shadow:                      /* the same four shadows for both, × 2.5 on screen */
    0 2pc,                         /* 80px down: the top pair */
    0 6pc,                         /* 240px down: the bottom pair */
    72q 4pc,                       /* 170.08px right, 160px down: the right pair */
    -72q 4pc;                      /* 170.08px left, 160px down: the left pair */
  color: FAE29E                    /* no hash: yellow, the color of body's shadows */
}
& {                                /* top level: :scope, the root, html */
  zoom: 2.5;                       /* every length × 2.5; body's 8px margin: 20px */
  background: #479DBA;             /* the root's background: the whole canvas */
  color: #323B;                    /* html's shadows: a dark purple at 73% opacity */
  margin: -20 42 108               /* × 2.5: a 190 × 80 box at (105, −50) */
```

## How it works

### 1. html: a zoom and the background

There is no doctype: the page is in quirks mode. The style element is never closed, so everything after `<style>` is CSS. body is empty.

At the top level, `&` means `:scope`, which is the root: html. html gets `background:#479DBA`. The root's background is painted on the whole canvas, and html's own box stays transparent.

`zoom:2.5` multiplies every length of html, and of everything inside it, by 2.5. getComputedStyle still gives `margin: -20px 42px 108px` for html, but on screen each px is 2.5px.

### 2. html: a 190 × 80 box above the canvas

In quirks mode, a number with no unit counts as px in `margin`. `margin:-20 42 108` is −20 at the top, 42 on the sides and 108 at the bottom. On screen, that is −50, 105 and 270.

In quirks mode, html fills the window minus its margins: 400 − 2 × 105 = 190 wide, and 300 + 50 − 270 = 80 tall. getBoundingClientRect gives (105, −50), 190 × 80: most of html is above the canvas.

### 3. body: the default 8px margin becomes 20px

Nothing sets body's margin: it keeps the browser's default 8px. With the zoom, that is 8 × 2.5 = 20px on screen. body fills html minus its margins: 190 − 40 = 150 wide and 80 − 40 = 40 tall. getBoundingClientRect gives (125, −30), 150 × 40. body has no background either.

So body is a box 20px inside html, on every side. That is the frame's thickness.

### 4. Two colors for one shadow list

`*` matches html, head, the style element and body. head and style are not displayed. html and body get the same `box-shadow`, with no color: a shadow with no color takes the text color.

`color:FAE29E` has no `#`. In quirks mode, `color` accepts a hex color without it. body keeps this yellow, rgb(250, 226, 158).

The `&` rule comes later and gives html `color:#323B`. That is a 4-digit hex color with alpha: #332233 at BB = 187/255, so 73% opacity. Over the blue, it shows as (56, 67, 87) in my render: the frame's gray-blue. The target's frame is #394257, (57, 66, 87).

### 5. Four shadows, eight rectangles

Each shadow is a copy of the element's box, moved by its offset. The offsets are multiplied by 2.5 too:

- `0 2pc`: 1pc = 16px, so 32px, and 80 on screen. html's copy runs from y = 30 to 110, body's from y = 50 to 90.
- `0 6pc`: 96px, so 240. html's copy runs from y = 190 to 270, body's from y = 210 to 250.
- `72q 4pc`: 1q is a quarter of a millimeter, so 72q = 18mm = 68.03px, and 170.08 on screen. 4pc = 64px, so 160. html's copy runs from x = 275.08 to 465.08, y = 110 to 190. body's from x = 295.08 to 445.08, y = 130 to 170.
- `-72q 4pc`: the same on the left. html's copy runs from x = −65.08 to 124.92, body's from −44.92 to 105.08.

body is 20px inside html, and both elements use the same offsets. So each yellow copy is 20px inside its gray copy. body is painted after html, so its yellow copies are on top.

### 6. The frame

The four gray copies only touch: the top one ends at y = 110, where the side ones start, and these end at y = 190, where the bottom one starts.

- The top and bottom copies are the frame's top and bottom bars, x = 105 to 295.
- Between y = 110 and 190, the left copy reaches x = 124.92, and the right one starts at x = 275.08. Their inner 20px are the frame's two sides. Between them, the blue shows through: the hole, 150 × 80.
- The rest of the side copies goes to the canvas edges: the gray bands. Their yellow copies stop at x = 105.08 and start at x = 295.08, at the frame's outer edge.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- `zoom:2.5` gives body a 20px margin for free, and keeps every length short. Without it, writing the sizes on screen (`0 5pc,0 15pc,180q 10pc,-180q 10pc`, `margin:20` in the `*` rule for body, and `margin:-50 105 270` for html) makes the code 128 characters, for the same picture.
- `&` is html in 1 character. With `html` in its place, the code takes 124 characters, for the same picture.
- `*` matches html and body in 1 character, and the later `&` rule still sets html's color. With `html,body{` in its place (129 characters), html keeps the yellow: the frame turns yellow, and 30,080 pixels change.
- `2pc`, `6pc` and `4pc` are 32px, 96px and 64px in 3 characters each. With px (125 characters), the picture is the same.
- `72q` is 68.03px in 3 characters, where `68px` takes 4.
- `#323B` is 5 characters. The opaque gray-blue, even with no `#` (`color:394257`), takes 6: 122 characters, for the same picture.
- No `#` is needed in `color`, but it is in `background`. With `background:479DBA` (120 characters), Chrome drops the background: the canvas is white, the frame is a light purple-gray, and 99,600 pixels change.
- A number with no unit in `margin`: `-20px 42px 108px` makes the code 127 characters, for the same picture.
- Nothing is closed. Closing the last rule and the style element with `}</style>` takes 130 characters, 9 more, for the same picture.

## If you try it at home

In my local Chrome, the official code is not pixel-exact. Two columns of 40 pixels, at x = 104 and x = 295 from y = 130 to 169, are a darker yellow, up to 15 off in one channel. That is where the yellow side bars meet the frame. The side shadows move 170.08px, not 170: with `68px` in place of `72q`, my local render has no pixel more than 8 off the target. The CSS Battle judge gives the code a 100% match.
