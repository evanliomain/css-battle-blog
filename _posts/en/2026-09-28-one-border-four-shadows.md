---
title: "One border, four shadows: a q in 145 characters"
lang: en
ref: 2026-09-28
permalink: /2026/09/28/one-border-four-shadows/
description: "How one rounded border and four box shadows draw the September 28, 2026 CSS Battle target: two dashes and a q, in black on white."
target: /assets/targets/2026-09-28.png
target_url: https://cssbattle.dev/play/sPBh2rqUt3ilhlL5Rdhj
colors: ["#000", "#fff"]
player: benjamintordjman
chars: 145
score: 700.43
match: 100
code: |
  <style>&{margin:70 50 50%240;border:8mm solid;border-radius:70%0 0 70%/55%;*{margin:100 10-130-50;box-shadow:11q 0#fff,74q 0,-50vw -69q,-95q -69q
---

The September 28 target is black on white: two dashes on the left, then a q whose bowl is open at the bottom, next to a foot that sticks out to the right. Benjamin Tordjman's solution draws the q with `html`'s border, rounded on the left only. The `body` sits under the bowl, and its four shadows draw everything else: the two dashes, the foot, and a thin white slit. The trick is that a shadow is never painted under the box that casts it.

Use **Teaching colors** to see each shadow in its own color.

{% include animations/2026-09-28.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                                  /* html */
  margin: 70 50 50% 240;             /* x 240 → 350, top at 70 */
  border: 8mm solid;                 /* 30px, black */
  border-radius: 70% 0 0 70% / 55%;  /* 77 × 88, scaled down to 70 × 80 */
  * {                                /* body */
    margin: 100 10 -130 -50;         /* x 220 → 310, y 200 → 230 */
    box-shadow:
      11q 0 #fff,                    /* white slit, on top */
      74q 0,                         /* the foot */
      -50vw -69q,                    /* first dash */
      -95q -69q;                     /* second dash */
  }
}
```

## How it works

### 1. html's border is the q

At the top level of a style sheet, a lone `&` matches the root, `html`. `margin:70 50 50%240` sets the top, right, bottom and left margins: `html` starts at x = 240 and y = 70, and it is 400 − 240 − 50 = 110px wide.

`8mm` is 30.24px. Chrome rounds a border width down to a whole pixel, so the border is 30px. With no color given, it uses the text color: black. The box is 160px tall; step 3 explains where that comes from.

### 2. A radius too big, scaled down

`border-radius:70%0 0 70%/55%` rounds the top-left and bottom-left corners only. A percentage of a radius uses the box size: 70% of 110 = 77px wide, and 55% of 160 = 88px tall.

Two 88px corners on a 160px side add up to 176px: they do not fit. In that case, Chrome scales every radius by the same factor, 160 / 176. The corners become 70 × 80. I checked it: `70px 0 0 70px/80px` gives the very same render, with 4 more characters. The left side is now a half-ellipse, the bowl of the q, and the 30px right border is the stem.

### 3. The body under the bowl

`*` nested in `&` matches every element inside `html`: the `head`, which is never shown, and the `body`. `margin:100 10-130-50` puts the `body`'s top 100px below `html`'s content, at y = 200. Its left margin is −50, so it starts at x = 220, and its right margin of 10 stops it at x = 310.

Its height is a quirks mode effect. Without a doctype, the page is in quirks mode, and the `body` stretches to fill `html`. Here, the 50% bottom margin of `html` is 200px (a percentage margin uses the width, 400px). That leaves `html` no room at all, so the `body` fills 0px: 0 − 100 + 130 = 30px tall, from y = 200 to 230.

And `html`'s 160px? The `body`'s margin box ends at 100 + 30 − 130 = 0, above its own top. I measured that Chrome then stops `html`'s content at the top of the `body`: 100px of content, plus two 30px borders, is 160px. I checked it with other margins: a top margin of 90 gives 150px.

### 4. Two shadows: the dashes

The `body` has no background, but a `box-shadow` is always solid. With no color, it is black. `-50vw -69q` moves a copy of the `body`'s box 200px left (50vw is half of 400) and 65.2px up: a 90 × 30 dash from x = 20 to 110, y = 134.8 to 164.8. `-95q -69q` moves it 89.77px left: the second dash, from x = 130.23 to 220.23.

### 5. Clipped under the body

An outer shadow is never painted inside the border box of its element. Chrome cuts the shadow out where the box is, even if the box itself is transparent.

`74q 0` moves a black shadow 69.92px right: from x = 289.92 to 379.92. Only the part right of the `body`, from x = 310, is painted. It covers the bottom of the stem and makes the foot, up to x = 379.92.

`11q 0#fff` is listed first, so it is painted on top. It moves a white shadow 10.39px right, and only its last 10.39px stick out of the `body`: a white slit from x = 310 to 320.39. It cuts `html`'s bottom border between the bowl and the stem, so the bowl opens at the bottom. Without it, 1,200 pixels are wrong at ×2.

## Golf notes

- `&` at the top level is `html`, and the nested `*` is the `body`: the q and the shadows need no extra tag.
- `50%240` needs no space after `%`, and 50% is the 200px bottom margin the layout needs, in 3 characters.
- `8mm` gives a 30px border in 3 characters, because the width is rounded down.
- A percentage radius that is too big gets scaled down: `70%0 0 70%/55%` is shorter than the exact `70px 0 0 70px/80px`.
- No background, no size: the `body` is only there to cast shadows, and to hide the parts of them it covers.
- `q` (quarter-millimetre) and `vw` give the odd offsets in 3 or 4 characters: `11q`, `69q`, `74q`, `95q`, `50vw`.
- No closing braces, and `<style>` is never closed.
