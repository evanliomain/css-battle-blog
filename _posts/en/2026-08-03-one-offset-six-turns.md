---
title: "One offset, six turns: a butterfly in 124 characters"
ref: 2026-08-03
permalink: /2026/08/03/one-offset-six-turns/
description: "How one offset:ray(45deg), given to six nested boxes, draws the August 3, 2026 CSS Battle target: each box turns 45° more than its parent, which gives three ellipses at 135°, 180° and 225° and a vertical yellow slit."
target: /assets/targets/2026-08-03.png
target_url: https://cssbattle.dev/play/K5tl2pHRpNXPbByrJmVW
colors: ["#415e88", "#f7ec7d"]
player: krhek
chars: 124
score: 722.68
match: 100
code: |
  <dl><dl><dl><p><style>dl{height:30;background:#415E88;border-radius:50%}*{padding:10 110;background:#F7EC7D;offset:ray(45deg
---

The August 3 target is a slate blue butterfly on a yellow background. It has six pointed petals, three on each side, and a thin vertical slit in the middle. Wojciech Russek draws it with six boxes nested in each other: html, body, three `dl` and a `p`. Each one gets `offset:ray(45deg`. That puts every box on the same center and turns it 45° more than its parent, so the three ellipses land at three different angles and the `p` ends up vertical.

Use **Teaching colors** to follow each box as it turns.

{% include animations/2026-08-03.html lang=page.lang %}

## The code, spaced out

```css
<dl><dl><dl><p>               /* three dl and a p, each one inside the previous one */
<style>
dl {
  height: 30;                 /* 30 + 2 × 10 = 50px tall */
  background: #415E88;        /* blue: dl beats * */
  border-radius: 50%;         /* a 220 × 50 ellipse */
}
* {                           /* html, body, the dl, the p (and head, style) */
  padding: 10 110;            /* every box is 0 + 2 × 110 = 220px wide */
  background: #F7EC7D;        /* yellow: the canvas, body and the p */
  offset: ray(45deg           /* centered on the parent, turned 45° counterclockwise */
```

## How it works

### 1. Six boxes in a chain

There is no html, head or body tag in the code: Chrome adds them. `<dl>` can hold another `<dl>`, so the three `dl` nest. The `p` goes inside the third one, and style inside the `p`. The tree is html › body › dl › dl › dl › p.

A `p` cannot do that: a second `<p>` closes the first one. With `<p><p><p><p>`, body gets four sibling paragraphs, and 12,281 pixels change.

### 2. The sizes come from the padding

There is no doctype, so the page is in quirks mode, and `10 110` and `30` with no unit are read as px.

html is 400 × 300. With `padding:10 110`, its content box is only 180 wide. body has its default 8px margin and the same 220px of padding: there is no room left, so its content is 0 wide. The same goes for every box below it. Each box is 0 + 2 × 110 = 220px wide.

The heights:

- each `dl`: `height:30` plus 2 × 10 of padding, 50px. With `border-radius:50%`, it is a 220 × 50 ellipse;
- the `p` is empty: 0 + 2 × 10 = 20px;
- body: quirks mode stretches it to fill html, 300 − 2 × 10 − 2 × 8 = 264px.

### 3. offset centers every box

`offset` is a shorthand. `offset:ray(45deg` sets `offset-path: ray(45deg)` and leaves the rest at its default: distance 0, position `normal`, rotation `auto`.

With a distance of 0, the box's center is placed on the start of the ray. With the position `normal`, that start is the middle of the containing block, the parent's content box.

- html's containing block is the 400 × 300 canvas: its middle is (200, 150), where html already is.
- body's is html's content box, 180 × 280 at (110, 10): its middle is also (200, 150).
- Every other box sits in a parent whose content box is 0 wide and centered in it. Its middle is the parent's center.

So all six centers land on (200, 150).

### 4. offset turns every box, and the turns add up

With `offset-rotate: auto`, the box turns to the direction of the path. `ray(45deg)` points up and to the right, 45° from the top. So each box turns 45° counterclockwise.

Each box turns inside its parent, which has already turned:

- html: 45°;
- body: 90°;
- first `dl`: 135°;
- second `dl`: 180°, horizontal again;
- third `dl`: 225°;
- `p`: 270°, vertical.

The three ellipses all cross at (200, 150). The horizontal one goes from x = 90 to 310. The two diagonal ones reach from y = 70.2 to 229.8: 150 ± √((110² + 25²) / 2) = 150 ± 79.8.

Each link counts. With `html{offset:none}` added, every angle is 45° smaller and 11,022 pixels change. With one `dl` fewer, 6,818 pixels change. With `offset-rotate:0deg` added, the boxes stay centered but flat, and 14,960 pixels change.

### 5. The colors and the slit

`dl` and `*` both set a background. `*` comes later, but a type selector beats `*`: the `dl` stay blue. Swapping the two rules changes nothing.

html's yellow background is painted on the whole canvas, and it does not turn. body's yellow box, 264 × 220 on screen, sits on the same yellow: it does not show.

The `p` is yellow too, and it is painted after the `dl`. At 270°, it is a vertical 20 × 220 strip, from x = 190 to 210 and from y = 40 to 260. It cuts the slit through the petals. With `p{display:none}` added, 1,576 pixels change.

## Golf notes

- One declaration, `offset:ray(45deg`, both centers and turns every box. There is no `position`, no `margin`, no `transform`.
- Each box only says 45°. The nesting turns that into 45°, 90°, 135°, 180°, 225° and 270°.
- Chrome adds html and body for free: two of the six links cost nothing. The code writes four tags, `<dl><dl><dl><p>`, 16 characters, and closes none.
- `padding:10 110` sizes every box at once: 220 wide for all, 20 more in height. Only the `dl` need a `height`. The same 10 gives the `p` its 20px, which is the width of the slit.
- `dl` is a two-letter tag that can hold itself. `p` is one letter, and it gets its yellow from `*`.
- The numbers have no unit: quirks mode reads them as px. With `<!doctype html>` in front, they are dropped, the butterfly is gone, and 17,989 pixels change.
- `ray(45deg`, the `*{` rule and the style element are left open. With `)}`, the code is 126 characters; with `)}</style>`, 134. The render is the same.

## If you try it at home

In my Chrome, the straight edges of the slit fall on the same pixels as in the target. On the curved edges, 771 pixels differ by more than 8 on one channel. All of them touch an edge. Measured by how much blue each pixel holds, the target's petals sit about 0.25px higher and 0.15px further left than mine. The CSS Battle judge gives the code a 100% match.
