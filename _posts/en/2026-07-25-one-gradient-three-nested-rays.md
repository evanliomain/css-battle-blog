---
title: "One gradient, three nested rays: a life buoy in 127 characters"
ref: 2026-07-25
permalink: /2026/07/25/one-gradient-three-nested-rays/
description: "How one radial gradient draws the white ring on html and the brown blocks on three nested strips, each turned 45° by offset:ray(45deg), in the July 25, 2026 CSS Battle target."
target: /assets/targets/2026-07-25.png
target_url: https://cssbattle.dev/play/sbyqdHz6FqGxo0iTfaxX
colors: ["#94b31f", "#fff", "#5f5f1e"]
player: emohdaziz
chars: 127
score: 719.23
match: 100
code: |
  <dt><p><style>*{background:radial-gradient(1Q,#94b31f,5lh,var(--a,#fff)0 30vw,#94b31f);*{--a:#5f5f1e;height:30;offset:ray(45deg
---

The July 25 target looks like a life buoy: a white ring on a bright green background, cut by six small olive-brown blocks, at the top, at the bottom and on the four diagonals. Mohamed Ali writes one radial gradient for every element. On html, it draws the white ring. On body, dt and p, a custom property turns the ring brown, and `height:30` cuts each element down to a thin strip. `offset:ray(45deg)` puts each strip at the center and turns it 45° inside the one before.

Use **Teaching colors** to see the green parts of the three strips, which do not show on the green canvas.

{% include animations/2026-07-25.html lang=page.lang %}

## The code, spaced out

```css
<dt><p>                               /* body > dt > p */
<style>
* {                                   /* html, then head, body, dt, p, style */
  background: radial-gradient(
    1Q,                               /* a circle, radius 1Q ≈ 0.945px */
    #94b31f,                          /* green from the center */
    5lh,                              /* hint at 5lh = 90px */
    var(--a,#fff)0 30vw,              /* white on html, brown elsewhere: 90 to 120px */
    #94b31f                           /* green: 100% = 0.945px, moved up to 120px */
  );
  * {                                 /* head, body, dt, p, style */
    --a: #5f5f1e;                     /* the ring turns brown */
    height: 30;                       /* 384 × 30 strips */
    offset: ray(45deg                 /* centered, turned 45° inside the parent */
```

## How it works

### 1. The page: body, dt, p

There is no doctype: the page is in quirks mode. In that mode, a number with no unit counts as px in `height`. The style element is never closed, so everything after `<style>` is CSS.

The order of the tags matters. A `<p>` start tag does not close an open `dt`, so p goes inside dt. The document is html > body > dt > p. That gives three boxes nested inside each other.

### 2. html: a white ring

`*` targets html first. html's background paints the whole canvas. It is a radial gradient centered on html's box, at (200, 150).

Its colors, in order:

- `#94b31f`, the green, at 0.
- `5lh`, alone between two commas: a color hint. `lh` is the line height. In my render it is 18px, so `5lh` = 90px.
- `var(--a,#fff)0 30vw`: one color with two positions. html has no `--a`, so the fallback `#fff` is used. The first position, `0`, comes after a hint at 90px, and a position cannot go back: it moves up to 90px. `30vw` is 30% of 400 = 120px. White runs from 90 to 120px.
- `#94b31f`: green again.

The hint sits right where the white starts, so green holds up to 90px and then turns white at once. Written as a position, `#94b31f 5lh,`, it is the same length, and in my render the picture is the same. The ring is 30px wide: on the middle line, it runs from x = 80 to 110 and from 290 to 320.

### 3. 1Q: a sharp outer edge

The first word of the gradient is its size. One length means a circle with that radius: 1Q, a quarter of a millimeter, about 0.945px.

The positions in px go far beyond that tiny circle, and that is fine: the gradient goes on past it. But the size sets what 100% means. The last green has no position, so it goes to 100%: 0.945px. It cannot sit before the 120px of the white, so it moves up to 120px. White stops and green starts at the same place: the outer edge is sharp, with no extra position written.

### 4. The nested rule: three strips

The nested `*{` means `* *`: every element inside another one. That is head, body, dt, p and style. head and style are hidden. The other three keep the gradient from the outer rule, centered on their own box, and get three more properties.

`--a:#5f5f1e` sets the custom property, so `var(--a,#fff)` gives brown: their ring is brown, not white. `--a` is not set on html, which keeps its white ring.

`height:30` makes them 30px tall. body is 400 − 8 − 8 = 384px wide (its default margins), and dt and p take the same width. Without the offset, body would be a 384 × 30 strip from x = 8 to 392 and y = 8 to 38.

On a strip, the gradient is green, brown from 90 to 120px from the strip's center, then green. The green does not show on the green canvas. Only two brown blocks are left, 30px long and 30px wide, where the strip crosses its own ring.

### 5. offset:ray(45deg): centered and turned

`offset` is the shorthand for the motion path properties. Here it gives each strip the path `ray(45deg)`: a ray that starts at the center of the box's containing block and points 45° clockwise from straight up.

With no distance, the box sits at the start of the ray: its center goes to the center of its containing block. For body, that is html, so body's center goes to (200, 150), the center of the white ring. I checked it by painting body red: the red pixels are centered on (200, 150).

The box also turns to follow the ray. body now rises to the right, from the bottom left to the top right. Its gradient turns with it: the two brown blocks land on the white ring, top right and bottom left.

### 6. dt and p: 45° more each

dt gets the same rule. Its containing block is body, so its center goes to body's center, (200, 150) again. It turns 45° inside body, which is already turned 45°: 90° in all. The dt strip stands upright and puts a block at the top, from y = 30 to 60, and one at the bottom, from y = 240 to 270.

p does the same inside dt: 135° in all. It falls to the right and puts the last two blocks, top left and bottom right.

That makes six blocks. Nothing turns to 0°, so the ring stays white on the left and right.

## Golf notes

- One gradient serves html and the three strips. Only `--a` changes. Written twice, once with `#fff` and once with `#5f5f1e`, the code is 173 characters, 46 more, and the picture is the same.
- `1Q` makes the gradient a circle and gives a sharp outer edge for free. With `circle` instead (131 characters), 100% is the farthest corner, and 74,756 pixels change: the white fades out from 120 to 250px, and the brown fades along the strips. To fix it, the last green needs a `0`: 133 characters, 6 more than `1Q`.
- The size cannot be dropped. Without `1Q,` (124 characters), the gradient is an ellipse that follows each box's shape, and 98,344 pixels change.
- `5lh` is 90px in 3 characters, and `30vw` is 120px in 4. With `90px` or `120px`, the code is 128 characters, and the picture is the same.
- `var(--a,#fff)0`: no space is needed after `)`. With the space, the code is 128 characters, same picture. The `0` matters: without it (`var(--a,#fff) 30vw`, 126 characters), the inner edge of the ring turns into a fade from green to white, and 45,097 pixels change.
- `offset:ray(45deg` centers each strip and turns it in one property. With `rotate:45deg` (123 characters), the strips are not moved to the center: 12,727 pixels change. `offset-path:` instead of `offset:` gives the same picture in 132 characters.
- `height:30` has no unit: the page is in quirks mode. With `30px`, the code is 129 characters, same picture. Without `height:30` (117 characters), body is 284px tall (html's 300px minus its margins), and dt and p are 0px tall: body, turned, covers the whole ring, which turns brown. 14,512 pixels change.
- The tags must nest, and be blocks. `<p><dt>`, same length: the dt tag closes the p, so they are side by side in body. Both turn 90°, and 2,082 pixels change: the top-left and bottom-right blocks are missing. `<a><p>` (126 characters) gives the same 2,082 pixels: a is inline, and in my render its strip does not show. `<div><div>` works, in 130 characters.
- Nothing is closed: neither the paren, nor the two rules, nor the style element. With `)}}</style>` at the end, the code is 138 characters, 11 more, and the picture is the same.
