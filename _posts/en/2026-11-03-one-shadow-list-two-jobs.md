---
title: "One shadow list, two jobs: a notched column in 157 characters"
lang: en
ref: 2026-11-03
permalink: /2026/11/03/one-shadow-list-two-jobs/
description: "How four box-shadows, shared by html and a 3D-rotated body, draw the November 3, 2026 CSS Battle target: a column with three notches."
target: /assets/targets/2026-11-03.png
target_url: https://cssbattle.dev/play/uUqcv42UqXa4qqYW40dd
colors: ["#eed9d9", "#668884"]
player: cubachatou
chars: 157
score: 689.58
match: 100
code: |
  <style>*{background:#EED9D9;color:668884;margin:270 140-260;box-shadow:0-5vw,0-291q 0-37q,0 89q,88q 97q;*{margin:-216 8 460 64;color:EED9D9;rotate:6-1 7 1rad
---

The November 3 target is a grey-green column standing on a wider base, with three triangular notches: two on the right, one on the left. Vegy's solution has no gradient and no clipping. It writes one list of four shadows, and both `html` and `body` use it: on `html` they draw the column, on a 3D-rotated `body` they carve the notches.

Use **Wide view** to see what happens off the canvas, and turn off **Teaching colors** to see the real colors.

{% include animations/2026-11-03.html lang=page.lang %}

## The code, spaced out

```css
* {                              /* html, then body */
  background: #EED9D9;
  color: 668884;                 /* shadows use this color */
  margin: 270 140 -260;
  box-shadow: 0 -5vw, 0 -291q 0 -37q, 0 89q, 88q 97q;
  * {                            /* body (head and style stay hidden) */
    margin: -216 8 460 64;
    color: EED9D9;               /* same shadows, background color */
    rotate: 6 -1 7 1rad;
  }
}
```

## How it works

### 1. html is an invisible frame under the base

`margin:270 140-260` places `html` at x 140, y 270, 120px wide. CSS Battle runs in quirks mode, where `html` fills the page height minus its margins: 300 − 270 + 260 = 290px. Its box runs from just under the base to far below the canvas.

The box itself never shows: the background of `html` is painted on the whole canvas. And an outer shadow is never painted under its own box, so the shadows only show where they stick out of it.

### 2. Two shadows draw the column

- `0 -5vw` moves a copy of the box 20px up. Only the strip above the box shows: the 120×20 base.
- `0 -291q 0 -37q` shrinks the copy by 35px on each side (spread −37q), to 50×220, and moves it 275px up. It comes out right on top of the base: the column.
- `0 89q` and `88q 97q` move down. What sticks out of the box lands below the canvas, so on `html` they do nothing.

The shadows have no color of their own, so they take `color`: `668884`. In quirks mode, a color can drop its `#`.

### 3. body gets the same shadows, in the background color

`*` also matches `body`, so it gets the same background and the same four shadows. Its own rule changes two things:

- `margin:-216 8 460 64` makes it a 48×46 box at (204, 54), on the top right of the column;
- `color:EED9D9` turns all its shadows into the background color.

So everything the `body` draws erases the column.

### 4. A 3D rotation that ends up flat

`rotate:6-1 7 1rad` turns the `body` by 1 radian (57°) around the 3D axis (6, −1, 7). There is no perspective, so the result is flattened on the screen: the rectangle becomes a parallelogram with slanted edges. Its shadows turn with it, so their offsets now point in rotated directions.

Without the rotation, the notches would be plain rectangles. The slanted edges come from the 3D turn alone.

### 5. Who does what

| Shadow | On `html` | On the rotated `body` |
| --- | --- | --- |
| *(the box itself)* | invisible | top notch |
| `0 -5vw` | the base | lands next to the column, on the background |
| `0 -291q 0 -37q` | the column | vanishes: −35px of spread on a 48×46 box |
| `0 89q` | below the canvas | left notch |
| `88q 97q` | below the canvas | bottom right notch |

## Golf notes

- One shadow list serves two elements: `*` hands it to `html` and `body`, and only `color` changes.
- `color:668884` and `color:EED9D9`: no `#` needed in quirks mode.
- `5vw` is 20px in 4 characters; `q` (a quarter of a millimetre) gives fine offsets like `291q`.
- `6-1 7 1rad` needs no space before the minus sign.
- `<style>` is never closed.
