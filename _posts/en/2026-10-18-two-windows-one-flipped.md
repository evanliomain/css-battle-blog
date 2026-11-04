---
title: "Two windows, one flipped: a barred disc in 169 characters"
lang: en
ref: 2026-10-18
permalink: /2026/10/18/two-windows-one-flipped/
description: "How one gradient, given to every element, and two paragraphs, one of them flipped, draw the October 18, 2026 CSS Battle target."
target: /assets/targets/2026-10-18.png
target_url: https://cssbattle.dev/play/W7SWtIqYNFiLhipGj6bj
colors: ["#c0d6e7", "#2d3464", "#d95362"]
player: emohdaziz
chars: 169
score: 679.9
match: 100
code: |
  <p><p><style>*{background:radial-gradient(1Q at 50%25vw,#c0d6e7,79Q,#2d3464)0 63Q}&>*{background:#d95362;border-radius:32Q;margin:50 70;p{height:85;margin:30;+p{scale:-1
---

The October 18 target is a red H on a navy background, with a pale blue disc behind it, cut in two by the bar. Mohamed Ali draws it with a red `body` and two `<p>` used as windows. Both get the same gradient, shifted so that the tile edge cuts the disc flat; the second window is simply flipped.

{% include animations/2026-10-18.html lang=page.lang %}

## The code, spaced out

```css
* {                               /* every element, p included */
  background:
    radial-gradient(1Q at 50% 25vw, #c0d6e7, 79Q, #2d3464)
    0 63Q;                        /* 59.5px down, the tile repeats */
}
& > * {                           /* html's children: head (hidden) and body */
  background: #d95362;
  border-radius: 32Q;             /* 30.2px */
  margin: 50 70;
  p {                             /* the two <p> inside body */
    height: 85;
    margin: 30;
    + p {                         /* the second one */
      scale: -1;
    }
  }
}
```

## How it works

### 1. A sharp disc from a color hint

`radial-gradient(1Q at 50% 25vw, #c0d6e7, 79Q, #2d3464)` is a circle centered 25vw (100px) from the top of the box. The `79Q` between the two colors has no color: it is a color hint, the point where the blend is half done.

The circle's size is `1Q`, about 0.95px, so the last color sits at 100% of that, 0.95px. A stop can't come before an earlier stop or hint, so the browser pushes it to 79Q (74.6px). The hint and the last color now sit at the same place, and the blend has no room left: the pale blue stops dead at 74.6px, and navy fills the rest. Remove the `1Q` and the gradient becomes a soft blur.

### 2. body is the red block

`&` alone means `html`, so `&>*` matches its children: `head`, which stays hidden, and `body`. It gets a red background, 30.2px corners (`32Q`) and `margin:50 70`. In quirks mode, which CSS Battle uses, `body` fills the page height minus its margins: a 260×200 block at (70, 50). Its own background is now plain red, so the gradient it got from `*` is gone.

`html` keeps the gradient. Its disc lands at y≈160, hidden under the red block.

### 3. Two paragraphs, two windows

The two `<p>` sit in `body`. `p{height:85;margin:30}` makes them 200×85 (260 − 2 × 30 wide).

- The first `p`'s top margin merges with the `body`'s 50px margin, since nothing (no border, no padding) separates them. So it sits flush with the top of the red block, at y=50.
- The two 30px margins between the paragraphs merge into one, so the second `p` starts at y=165 and ends at 250, flush with the bottom of the block.

What stays red: a 30px post on each side and a 30px bar from y=135 to 165. That is the H.

### 4. The tile edge cuts the disc

Each `p` gets the gradient from `*`, sized to its own 200×85 box. The circle's center is 100px from the top: below the box. Only the top of the circle fits in, at the bottom of the window.

`0 63Q` moves the background 59.5px down. A background repeats by default, so the gap above is filled by a copy of the same tile, which brings its own circle. That copy's center is 100 − 85 + 59.5 = 74.5px below the top of the `p`, so its disc starts right at the top (74.5 − 74.6 ≈ 0) and runs down to the copy's bottom edge, at 59.5px. Below that line is the next tile, whose disc starts lower, at the very bottom of the window.

So the first window shows a cap of the disc, from y=50 to y=109.5, cut perfectly flat by the tile edge, about 146px wide at the cut. The navy below the cut, down to the bar, is the rest of the tile.

### 5. scale:-1 flips the second window

`+p` inside `p` is the `p` right after another `p`: the second one. It shows the same cap, flat side down. `scale:-1` scales it by −1 on both axes, around its center: the same thing as a half turn. The cap moves to the bottom of the window, with the flat side up at y=190.5, facing the bar.

## Golf notes

- `<p><p>`: two elements in 6 characters, closing tags and `</style>` left out.
- `*` gives the gradient to everyone. `body` drops it with its own `background`, `html`'s copy hides under the red block, and only the paragraphs show it.
- `scale:-1` is a half turn in 8 characters.
- `25vw` is 100px in 4 characters, and `50%25vw` needs no space: the `%` ends the number.
- `63Q` (59.5px) and `32Q` (30.2px): 3 characters each, and `32Q` is shorter than `30px`.
- `&>*{…p{…+p{…}}}`: nesting reaches `body`, then the paragraphs, then the second one, without writing `body` once.
- `height:85`, `margin:30`, `margin:50 70`: no units needed in quirks mode.
