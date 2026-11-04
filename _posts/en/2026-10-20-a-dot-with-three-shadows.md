---
title: "A dot with three shadows: an S logo in 180 characters"
lang: en
ref: 2026-10-20
permalink: /2026/10/20/a-dot-with-three-shadows/
description: "How a 20px round html with three shadows, a background-colored body and an option with two shadows draw the October 20, 2026 CSS Battle target."
target: /assets/targets/2026-10-20.png
target_url: https://cssbattle.dev/play/g1LzIbepI6uIeUEpgqDp
colors: ["#f0f0f3", "#42a8e4"]
player: kieron
chars: 180
score: 671.94
match: 100
code: |
  <option><style>*{background:#f0f0f3}&{margin:35%190;border-radius:50%;color:42A8E4;box-shadow:53Q 53Q 0 5ch,-53Q -53Q 0 5ch,0 0 0 79Q;>*{margin:-40-30;*{box-shadow:5vw 5vw,-5vw 64Q
---

The October 20 target looks like the Skype logo: a big blue disc with two smaller ones on opposite corners, and a square S in the middle, in the background color. Kieron draws all three discs as shadows of a tiny round `html`, 20px wide. The S is a background-colored `body` on top, and the two notches of the S are the shadows of an `<option>`.

{% include animations/2026-10-20.html lang=page.lang %}

## The code, spaced out

```css
* {                             /* everything gets the grey */
  background: #f0f0f3;
}
& {                             /* html */
  margin: 35% 190;              /* 140px 190px */
  border-radius: 50%;
  color: 42A8E4;                /* shadows use this color */
  box-shadow:
    53Q 53Q 0 5ch,              /* small disc, bottom right */
    -53Q -53Q 0 5ch,            /* small disc, top left */
    0 0 0 79Q;                  /* big disc */
  > * {                         /* head (hidden) and body */
    margin: -40 -30;
    * {                         /* the option (and the hidden style) */
      box-shadow: 5vw 5vw, -5vw 64Q;
    }
  }
}
```

## How it works

### 1. html is a 20px dot

`&` alone is `html`. `margin:35%190` gives it 140px at the top and bottom (a percentage margin is always a share of the width: 35% of 400) and 190px on the sides. CSS Battle renders in quirks mode, where `html` takes the page height minus its margins: 300 − 280 = 20px. So `html` is a 20×20 box at (190, 140), and `border-radius:50%` makes it a dot of radius 10.

Its grey background is not painted in that small box: the background of `html` always covers the whole canvas.

### 2. Three shadows, three discs

A shadow with no color takes the `color` of its element: `42A8E4`, a blue written with no `#`, which quirks mode accepts. A shadow also follows the rounding of its box, and the spread adds to the radius:

| Shadow | Offset | Radius | Disc |
| --- | --- | --- | --- |
| `0 0 0 79Q` | 0, 0 | 10 + 74.6 = 84.6 | the big one, at (200, 150) |
| `53Q 53Q 0 5ch` | 50.1, 50.1 | 10 + 40 = 50 | bottom right, at (250.1, 200.1) |
| `-53Q -53Q 0 5ch` | −50.1, −50.1 | 10 + 40 = 50 | top left, at (149.9, 99.9) |

`ch` is the width of the `0` digit in the element's font. Here that is 8px in the default 16px font, so `5ch` is 40px.

An outer shadow is never painted under its own box. So there is a 20px hole in the middle of the big disc, where the `html` dot is. The next step hides it.

### 3. body is the block of the S

`>*` inside `&` matches the children of `html`: `head`, which stays hidden, and `body`. `margin:-40-30` pulls `body` out of the dot on every side:

- width: 20 + 30 + 30 = 80px, from x=160;
- height: in quirks mode, `body` takes its parent's height minus its margins, 20 + 40 + 40 = 100px, from y=100.

It has the grey background from `*`. So it is an 80×100 grey block over the blue, and it covers the hole.

### 4. The option carves the notches

The `<option>` sits in `body`. Outside of a `<select>`, it is a plain block: 80px wide, and about 20px tall by default (one line of text plus 1px of padding). It is grey on grey, so it can't be seen. Its two shadows are blue, because `color` is inherited:

- `5vw 5vw` moves a copy 20px right and 20px down: an 80×20 blue block from x=180 to 260, y=120 to 140. Inside the `body`, it is the top notch, open to the right.
- `-5vw 64Q` moves the other copy 20px left and 60.5px down: from x=140 to 220, y=160.5 to 180.7. That is the bottom notch, open to the left.

The parts that stick out of the `body` land on the big disc, blue on blue, and disappear. What is left of the grey block is the S.

## Golf notes

- One 20px dot carries all three discs, and its own box, the hole in the shadows, ends up under the S.
- `<option>` gives a 20px-tall element with no `height`.
- `color:42A8E4` sets the shadow color once, for `html` and, by inheritance, for the option. No `#` in quirks mode.
- `5ch` (40px), `5vw` (20px), `53Q` (50.1px): short lengths. Unitless numbers do not work in `box-shadow`, even in quirks mode.
- `35%190` is one character shorter than `140 190`: the `%` ends the number, so no space.
- `-40-30` needs no space before the minus sign.
- `<style>` is never closed.
