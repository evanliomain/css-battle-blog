---
title: "Offsets in em: two candlesticks in 123 characters"
lang: en
ref: 2026-10-09
permalink: /2026/10/09/offsets-in-em/
description: "How one list of three box-shadows, with offsets in em and a font size halved twice, draws both candles of the October 9, 2026 CSS Battle target."
target: /assets/targets/2026-10-09.png
target_url: https://cssbattle.dev/play/yzi0MYdpYpyHgy94qFCN
colors: ["#d07b5f", "#4dcb60", "#1bd2"]
player: emohdaziz
chars: 123
score: 723.86
match: 100
code: |
  <style>*{margin:65 76%65 86;color:D07B5F;box-shadow:78Q 0#4dcb60,9pc 5em,9pc -5em;font:50%a;*{background:#1bd2;margin:20-20
---

The October 9 target is a pair of candlesticks from a stock chart, on a very pale blue: a green candle, and a taller orange one, each with a thin wick above and below. Mohamed Ali draws them with two transparent boxes, `html` and `body`, and one list of three shadows that both share. The shadows' vertical offsets are in `em`, and `body` has half the font size, so the same list draws the wicks on `html` and the candle bodies on `body`.

{% include animations/2026-10-09.html lang=page.lang %}

## The code, spaced out

```css
* {                          /* html (head and style stay hidden) */
  margin: 65 76% 65 86;
  color: D07B5F;             /* the color of shadows that have none */
  box-shadow:
    78Q 0 #4dcb60,           /* green */
    9pc 5em,                 /* orange, below */
    9pc -5em;                /* orange, above */
  font: 50% a;               /* 1em = 8px on html, 4px on body */
  * {                        /* body */
    background: #1bd2;
    margin: 20 -20;
  }
}
```

## How it works

### 1. The background comes from body

`html` has no background of its own. In that case, the background of `body` is painted on the whole canvas instead. `#1bd2` is `#11bbdd` at 13% opacity (`22` out of `ff`). Over the white page, it gives `#dff6fb`, the pale blue of the target.

The nested `*` also gives that background to `head` and `style`, but they are hidden.

### 2. html is a 10 × 170 box

`margin:65 76%65 86` (CSS Battle runs in quirks mode, so plain numbers are pixels):

- 76% of the 400px frame is 304px of right margin. With 86px on the left, 400 − 304 − 86 = 10px of width are left, at x = 86.
- In quirks mode, `html` fills the frame height minus its margins: 300 − 65 − 65 = 170px.

This box has no background, so it shows nothing. An outer shadow is never painted under its own box, but here that does not matter: the shadows all land away from it.

`font:50%a` sets the font size to 50% of 16px: 8px. So on `html`, `5em` = 40px.

### 3. html's shadows: the wicks

Each shadow is a copy of the 10 × 170 box, moved by its offsets:

- `78Q 0 #4dcb60`: 78Q is 78 quarter-millimetres, about 73.7px. A green copy at x ≈ 159.7: the green wick.
- `9pc 5em` and `9pc -5em`: 9pc is 144px, so x = 230. They have no color, so they take `color`, the orange `D07B5F`. One is moved 40px down, the other 40px up. They overlap into one wick from y = 25 to y = 275: 10 × 250.

### 4. body: wider, shorter, smaller font

The nested `*` matches `body`, which sits inside `html`'s 10px wide box:

- `margin:20-20` is 20px at the top and bottom, −20px on the sides. The negative side margins make it 10 + 20 + 20 = 50px wide, at x = 66.
- In quirks mode it fills `html`'s height minus its margins: 170 − 40 = 130px, from y = 85.
- `font:50%a` applies again, to 50% of the parent's 8px: 1em = 4px, so `5em` = 20px.
- `body`'s background went to the canvas, so its box is transparent too.

### 5. Same shadows, bigger box: the candle bodies

`body` has the same shadow list, on a 50 × 130 box:

- `78Q 0`: a green copy at x ≈ 139.7, y = 85: the green body, 50 × 130.
- `9pc ±5em`: two orange copies at x = 210, moved ±20px. They overlap from y = 65 to y = 235: the orange body, 50 × 170.

`body` is painted after `html`, so the bodies cover the middle of the wicks. Only the ends stick out: 20px above and below the green body, 40px above and below the orange one.

## Golf notes

- One rule for two boxes: everything is in `*`, and the nested `*` only overrides what `body` needs.
- The vertical offsets are in `em`, and `font:50%` halves the em at each level. That gives ±40px on `html` and ±20px on `body` from the same `5em`.
- `font` needs a family to be valid. `a` is the shortest one, and `50%a` needs no space.
- `color:D07B5F`: in quirks mode, a color can drop its `#`. It sets the color of the two shadows written without one.
- `#1bd2` lets the white page under it finish the color: 5 characters.
- `0#4dcb60` and `20-20` need no space. But `9pc -5em` does: `9pc-5em` would be read as one number with an unknown unit.

## If you try it at home

78Q is 73.70px, not a whole number. In the latest Chrome (version 156 when this was written), the left and right edges of the green wick and of the green body fall 0.3px off the pixel grid, so they come out blended over one column of pixels. With `74px` in place of `78Q`, the local render matches the target exactly. On the CSS Battle judge, the original code is a 100% match.
