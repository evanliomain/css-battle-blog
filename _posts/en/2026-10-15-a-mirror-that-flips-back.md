---
title: "A mirror that flips back: a calendar in 162 characters"
lang: en
ref: 2026-10-15
permalink: /2026/10/15/a-mirror-that-flips-back/
description: "How seven shadows, shared by a flipped body and an option that flips back, draw the October 15, 2026 CSS Battle target, a calendar page."
target: /assets/targets/2026-10-15.png
target_url: https://cssbattle.dev/play/hV6Wk19bUcGIDvbgt5ZR
colors: ["#cccb", "#8c8c8c", "#f218"]
player: benjamintordjman
chars: 162
score: 685.41
match: 100
code: |
  <option><style>&{margin:90 105;border:90q solid#cccb;color:8C8C8C;*{margin:-25 0 5;scale:-1 1;box-shadow:64q 0#f218,-63q 0,5vw 0,5vw 53q,64q 53q,58q -5em,58q -64q
---

The October 15 target is a calendar page: a light grey card, two dark grey rings sticking out of its top edge, and two rows of four dark grey squares, with the last square of the top row in red. Benjamin Tordjman draws it with one list of seven shadows, used twice. `body` is flipped with `scale:-1 1`, and an `<option>` inside it flips again, back to normal. So the list draws once as written and once mirrored.

{% include animations/2026-10-15.html lang=page.lang %}

## The code, spaced out

```css
/* <option> before <style>: an extra element inside body */
& {                              /* html */
  margin: 90 105;
  border: 90q solid #cccb;
  color: 8C8C8C;                 /* inherited: the shadow color */
  * {                            /* body and option (head stays hidden) */
    margin: -25 0 5;
    scale: -1 1;
    box-shadow:
      64q 0 #f218,               /* the red square */
      -63q 0,
      5vw 0,
      5vw 53q,
      64q 53q,
      58q -5em,                  /* top of the ring */
      58q -64q;                  /* bottom of the ring */
  }
}
```

## How it works

### 1. html is the grey card

At the top level, `&` means `html`. `margin:90 105` puts it at (105, 90), 400 − 2 × 105 = 190px wide. The border of 90q (85.04px) is drawn 85px thick: a border width is rounded down to whole pixels. Two borders take 170px of the width, so the content of `html` is only 20px wide, and it has no height of its own. The card is 190 × 170, from (105, 90) to (295, 260).

`#cccb` is a light grey at 73% opacity. `html` has no background, so the canvas stays white, and the border mixes with that white into `#d9d9d9`, the color of the card.

### 2. Two boxes of 20px

`&{…*{…}}` matches every element inside `html`: `head` (hidden), `body`, and the `<option>` written before `<style>`, which the browser puts in `body`.

`body` gets `margin:-25 0 5`. In quirks mode, which CSS Battle uses, `body` stretches to the height of `html`'s content (0px) minus its margins: 0 + 25 − 5 = 20px. It is 20px wide too, like `html`'s content.

An empty `<option>` outside a `<select>` is still shown as a block, with a minimum height of 1.2em (19.2px) and 1px of bottom padding, so it is about 20px tall without any CSS (20.19px measured). A `<p>` would be 0px tall. It gets the same margins, and they merge with `body`'s, so the two boxes sit on top of each other, at (190, 150).

Neither box has a background. Only their shadows show.

### 3. One list of seven shadows

Both boxes get the same list. Shadows without a color take `color`, inherited from `html`: `8C8C8C`. In quirks mode `color` accepts a hex value without `#`. The first shadow has its own color, `#f218`, a red at 53% opacity.

With 64q ≈ 60.5px, 63q ≈ 59.5px, 53q ≈ 50px, 5vw = 20px, 5em = 80px and 58q ≈ 54.8px, the list as written puts squares at x 250, 130 and 210 on the top row, x 210 and 250 on the bottom row, and two squares stacked at x 245, y 70 and y 90: the right ring.

### 4. scale:-1 1 on both boxes

`scale:-1 1` flips a box left to right around its center, x = 200, shadows included. `body` is flipped once. `<option>` is inside `body`, so it is flipped with it, and then flipped again by its own `scale:-1 1`. Two flips cancel out: the option's shadows are drawn as written, `body`'s are mirrored.

The mirrored copy adds the squares at x 170 on both rows, x 130 on the bottom row, and the left ring at x 135.

### 5. Who is on top

`option` is painted after `body`, so its shadows cover `body`'s.

- On the right of the top row, the option's red square lands on one of `body`'s grey squares. `#f218` over `#8c8c8c` gives the brick red of the target, about `#ca534a`.
- On the left of the top row, `body`'s red square is under one of the option's grey squares, and is hidden.

Fourteen squares in all, with two pairs overlapping: twelve visible squares, the eight of the grid and the four that make the two rings.

## Golf notes

- One shadow list for both halves: the mirror costs `scale:-1 1`, and the second flip on the nested box costs nothing more.
- `<option>` is a 20px block for 8 characters and no CSS.
- `color:8C8C8C` sets the color of six shadows at once, with no `#` thanks to quirks mode.
- `#cccb` and `#f218` let the layers below finish the colors: the white page for the card, the grey square for the red.
- `5vw` and `5em` are exact lengths in 3 characters. `64q`, `63q`, `53q` and `58q` are within half a pixel of the target's edges. In my local render, a few columns on those edges come out blended (276 pixels), but CSS Battle scores the solution as a 100% match.
- `<style>` is never closed.
