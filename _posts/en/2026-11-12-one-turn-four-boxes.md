---
title: "One turn, four boxes: an X cut in two in 135 characters"
lang: en
ref: 2026-11-12
permalink: /2026/11/12/one-turn-four-boxes/
description: "How offset:ray(45deg), written once on *, centers and turns four nested boxes to draw the November 12, 2026 CSS Battle target: a yellow X cut by a coral band on coral."
target: /assets/targets/2026-11-12.png
target_url: https://cssbattle.dev/play/odhXZQ3ZrxdqUAYnc3D5
colors: ["#f2eaa8", "#e76"]
player: emohdaziz
chars: 135
score: 710.47
match: 100
code: |
  <dl><p><style>*{offset:ray(45deg)}&,dl,p{height:5em;width:4;border-inline:6lh solid#f2eaa8;>*{background:#e76;p{width:180;font:37%/85%"
---

The November 12 target is coral, with a pale yellow X cut in two by a coral band, and two small yellow squares at the ends of that band. Mohamed Ali's solution writes no position, no margin and no angle per box. `offset:ray(45deg)` on `*` centers every box on its parent and turns it by −45°. The boxes are nested, so the turns add up: two crossed bars, then a band that lies flat.

Use **Teaching colors** to tell the two bars and the band apart.

{% include animations/2026-11-12.html lang=page.lang %}

## The code, spaced out

```css
<dl><p>                                /* body > dl > p */
<style>
* {
  offset: ray(45deg);                  /* centered on the parent, turned −45° */
}
&, dl, p {                             /* html, dl and p */
  height: 5em;                         /* 80 on html and dl */
  width: 4;
  border-inline: 6lh solid #f2eaa8;    /* 108 + 4 + 108 = 220 long */
  > * {                                /* their children: body, head, p */
    background: #e76;                  /* body → the canvas; p → the band */
    p {                                /* the p */
      width: 180;
      font: 37% / 85% "";              /* small font: 5em and 6lh shrink */
    }
  }
}
</style>
```

## How it works

### 1. html: a bar

At the top level, `&` matches the root, `html`. It gets `width:4`, `height:5em` and two borders of `6lh`. With the 16px default font, the line is 18px tall, so `6lh` is 108px, and `5em` is 80px. The box is 4 + 2 × 108 = 220 long and 80 tall: two yellow blocks, with a 4px gap between them.

### 2. offset: center and turn

`offset:ray(45deg)` puts the box on a motion path: a ray that starts at the center of its containing block and points 45° from vertical. With no distance along the ray, the box sits at its start, centered on it, and turned to follow the ray: 45° − 90° = −45°.

For `html`, the containing block is the 400 × 300 canvas. Its bar is centered at (200, 150) and goes from bottom left to top right. Margins play no part: the path places the box.

### 3. The body: coral and a quarter turn

`>*` is nested, so it matches the children of `html`, `dl` and `p`. The `body` is a child of `html`: it gets `background:#e76`. `html` has no background, so the `body`'s goes to the whole canvas: that is the coral.

The `body` matches `*` too, so it has its own `offset`. It is centered on `html`'s center and turns by another −45°, on top of `html`'s turn: −90° in all. It paints nothing else, but every box inside it starts from that angle.

### 4. dl: the second bar

`<dl>` sits in the `body`. It matches `&,dl,p`: the same 220 × 80 bar. Its own −45° adds to the `body`'s: −135°. It runs from top left to bottom right and crosses the first bar at (200, 150): an X.

Each bar has a 4px gap in its middle, across its length. `dl` is painted on top of `html`, and the other bar covers each gap, except for a 4 × 4 square right at the center.

### 5. p: the horizontal band

The parser puts the `<p>` inside the `<dl>`. One more −45° makes −180°: the `p` lies flat. It is a child of `dl`, so `>*` gives it the coral background, and the nested `p` rule gives it `width:180` and `font:37%/85%"`.

37% of 16 is 5.92px, so `5em` is 29.6px tall. The line height, 85%, is computed on Chrome's 6px floor for text: 5.1px. So `6lh` is 30.6px, and the border width is rounded down to 30. The band is 180 + 2 × 30 = 240 long, from x = 80 to 320, and 29.6 tall around y = 150.

Its coral middle covers the center of the X and cuts it into a top and a bottom shape. Its yellow borders are the two 30 × 30 squares on each side.

## Golf notes

- One `offset` on `*` replaces margins, positions and four angles. Each nesting level adds −45° for free, the `body` included.
- One rule for three boxes: `&,dl,p` gives the same bar to `html` and `dl`. The `p` only changes its width and its font, and its borders shrink with the font, from 108 to 30.
- `>*` puts the coral only on the children: the `body` (the canvas) and the `p` (the middle of the band). `html` and `dl` stay transparent, so the bars have a real gap.
- `width:4` makes the bars 220 long. I checked that `width:0` changes the render.
- `<dl><p>` with no closing tags: the parser nests the `p` in the `dl`, which gives the four levels.
- `#e76`, a 3-digit color, and an empty font family `"` left open at the end of the code.
