---
title: "Turned twice: a pink hash in 158 characters"
lang: en
ref: 2026-10-12
permalink: /2026/10/12/turned-twice/
description: "How html turned a quarter turn and body turned a half turn share one rule and one background to draw the October 12, 2026 CSS Battle target."
target: /assets/targets/2026-10-12.png
target_url: https://cssbattle.dev/play/GtfVbDS2vn8CI4nnV4Yl
colors: ["#ecd5e4", "#1d5260", "#84b9c7"]
player: evanliomain
chars: 158
score: 688.73
match: 100
code: |
  <style>*{margin:20 90;border-inline:32Q solid#ecd5e4;rotate:90deg;*{margin:0-30}background:0 53Q/9in radial-gradient(1Q at 0 0,#1d5260 60px,#0000),text#84b9c7
---

The October 12 target is a big pink hash sign on a blue-grey background: four bars that cross near their ends, and two navy quarter discs in opposite corners of the square inside. I draw it with one rule for `html` and `body`. Each gets two pink borders and a quarter disc. `html` is turned a quarter turn, so its borders lie flat. `body` turns a quarter turn more, half a turn in all: its borders stand up again, and its quarter disc ends up in the opposite corner.

{% include animations/2026-10-12.html lang=page.lang %}

## The code, spaced out

```css
* {                                  /* html, and body too */
  margin: 20 90;
  border-inline: 32Q solid #ecd5e4;  /* left and right borders: 30px */
  rotate: 90deg;
  * {                                /* body only */
    margin: 0 -30;
  }
  background:
    0 53Q / 9in                      /* position and tile size */
      radial-gradient(1Q at 0 0, #1d5260 60px, #0000),
    text #84b9c7;                    /* color, clipped to the text */
}
```

## How it works

### 1. html and its two borders

`margin:20 90` (CSS Battle runs in quirks mode, so plain numbers are pixels) makes `html` 400 − 180 = 220px wide at x = 90. In quirks mode it is 300 − 40 = 260px tall, from y = 20.

`border-inline` sets the left and right borders only. 32Q is 30.24px, and Chrome rounds border widths to whole pixels: 30px. These are two pink bars, 30 × 260. Inside them, the padding box runs from x = 120 to x = 280.

### 2. The canvas color, and a clip it ignores

The background of `html` is painted on the whole canvas. It has two layers. The last one, `text #84b9c7`, holds the background color and clips it with `background-clip: text`: only inside the letters of the element's text. But the canvas ignores that clip, so it is blue-grey everywhere.

### 3. One quarter disc

The first layer is `radial-gradient(1Q at 0 0, #1d5260 60px, #0000)`:

- `1Q` is a single length, so the shape is a circle. Its radius does not matter, since the stops are lengths.
- `at 0 0` puts its center on the top-left corner of the tile.
- Navy up to 60px, then transparent.

The image is painted on the canvas, but placed as if it were on `html`: from the top-left of its padding box, (120, 20), moved `0 53Q` (≈ 50px) down. So the tile starts at (120, 70). Only the quarter of the circle that is inside the tile shows: a quarter disc from (120, 70) to (180, 130).

The tile is 9in = 864px wide and as tall as the box, 260px. The other copies of the circle land at x = 984, y = −190 or y = 330: all off the canvas.

### 4. html turns a quarter turn

`rotate:90deg` turns `html` around its center, (200, 150). The 220 × 260 box becomes 260 × 220, from (70, 40) to (330, 260). Its left and right borders become the top and bottom bars: y = 40 to 70 and y = 230 to 260.

The canvas background does not turn with it: the quarter disc stays at (120, 70).

### 5. body turns a quarter turn more

The outer `*` also matches `body`, so it gets the same borders, rotation and background. The nested `*` matches `body` alone and adds `margin:0-30`:

- `body` sits in `html`'s 160px wide content box. The −30px side margins widen it by 30px on each side: 220px, right over `html`'s borders.
- In quirks mode it fills `html`'s height: 260px.

So `body` has the same box as `html`, with the same center. Its `rotate:90deg` comes on top of `html`'s: 180° in all. Turned half a turn, a box looks the same, and its borders are vertical again, at x = 90 to 120 and x = 280 to 310. Those are the vertical bars.

### 6. The same background, flipped

`html` has a background, so `body`'s is painted on `body`'s own box, and it turns with it:

- The quarter disc is placed exactly like on `html`, 50px below the top of the padding box. Turned 180°, it is centered at (280, 230) and faces up and to the left.
- The color is clipped to the text, and `body` has no text: no color is painted. Without the `text` keyword, `body`'s blue-grey would cover its whole box, and the first quarter disc with it.

## Golf notes

- One rule for two boxes: everything is in `*`, and only the margin of `body` changes. Turning the same rule twice gives the 90° and the 180°.
- `text#84b9c7` is a color for the canvas only: on every element without text, it disappears.
- `32Q` (30px) and `53Q` (≈ 50px) are one character shorter than `30px` and `50px`.
- `9in` makes a tile wide enough in 3 characters.
- `1Q` turns the gradient into a circle in 2 characters, and `#0000` is `transparent`.
- `solid#ecd5e4` and `0-30` need no space.
- `<style>` is never closed.
