---
title: "Suspenders cut by space: a striped box in 131 characters"
ref: 2026-08-05
permalink: /2026/08/05/suspenders-cut-by-space/
description: "How one border-image, a two-color gradient cut with space, draws the brown and cream bands of the August 5, 2026 CSS Battle target, and leaves two gaps where body's yellow shows as suspenders."
target: /assets/targets/2026-08-05.png
target_url: https://cssbattle.dev/play/13jMnnJohZbHBrV4lGLC
colors: ["#b9c99f", "#f7cb71", "#7c3219", "#fef9ce"]
player: selenit
chars: 131
score: 714.77
match: 100
code: |
  <style>&{background:#B9C99F;*{background:#F7CB71;margin:66 90;border-image:linear-gradient(#7C3219 25%,#ffdd 0)50%65/67%5vw 0 space
---

The August 5 target is sage green. In the middle sits a box with three bands: brown, cream and yellow. Two yellow bars cross the top two bands, like suspenders. Ilya Streltsyn draws it all with body alone. body's background gives the yellow. One `border-image` paints the brown and the cream on top, and its `space` keyword leaves two gaps: the suspenders.

Use **Teaching colors** to tell the corners of the border-image from its top tile.

{% include animations/2026-08-05.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                                        /* html */
  background: #B9C99F;                     /* the whole canvas */
  * {                                      /* head, style and body */
    background: #F7CB71;                   /* body: a yellow box */
    margin: 66 90;                         /* body: 220 × 168 at (90, 66) */
    border-image:
      linear-gradient(#7C3219 25%, #ffdd 0) /* brown for 42px, then a translucent cream */
      50% 65                               /* slices: 84px top and bottom, 65px on the sides */
      / 67% 5vw 0                          /* widths: 112.56px on top, 20px on the sides, 0 at the bottom */
      space                                /* whole tiles only: one, in the middle */
```

## How it works

### 1. Two boxes

There is no html, head or body tag in the code: Chrome adds them, and puts style in head. At the top level of the sheet, `&` matches html. The nested `*{` means `& *`: everything inside html, so head, style and body. head and style are not displayed, so only body matters.

There is no doctype, so the page is in quirks mode. `66 90` has no unit and is read as px. And in quirks mode, body stretches to fill the height. getBoundingClientRect gives (90, 66, 220, 168): 400 − 2 × 90 = 220 wide, 300 − 2 × 66 = 168 tall. With `<!doctype html>` in front, the unitless margin is not valid any more, and 36,960 pixels change.

### 2. Two backgrounds

html's background, `#B9C99F`, paints the whole canvas: the sage green. Since html has its own background, body's background stays in body's box: a yellow rectangle, `#F7CB71`.

This yellow does three jobs. It is the bottom band, it is the two suspenders, and it sits under the cream. Without body's background, the suspenders and the bottom band turn green, the cream changes too, and 28,000 pixels change.

### 3. A border-image with no border

body has no border: getComputedStyle gives `0px` and `none`. The border-image is still drawn, because its widths are a percentage and a length. They do not depend on the border width.

The image is `linear-gradient(#7C3219 25%,#ffdd 0)`, the size of body: 220 × 168. It is brown for 25% of 168 = 42px, then `#ffdd` to the bottom.

The slices `50%65` cut it 84px from the top and 84px from the bottom (50% of 168), and 65px from the left and from the right. The top slices are 84px tall: 42px of brown, then 42px of cream. The top and bottom slices take the whole height, so the middle row of slices has no height at all.

### 4. The widths, and the corners

The widths are `67%5vw 0`: top, sides, bottom.

- top: 67% of the height, 0.67 × 168 = 112.56px;
- left and right: 5vw, 5% of 400 = 20px;
- bottom: 0.

The image's top corner, 65 × 84, is squeezed into a 20 × 112.56 corner. It keeps its proportions in height: half brown, half cream, 56.28px each. In my Chrome, the corners are painted brown from y = 66 to 121, and cream from 122 to 177: two bars, at x = 90 to 109 and 290 to 309.

The bottom draws nothing: its width is 0. The left and right edges under the corners draw nothing either: their slice has no height. So the bottom of body shows its own yellow, from y = 178 to 233. That is the bottom band.

### 5. `space`: one tile, two gaps

The top slice, between the two corners, is 220 − 2 × 65 = 90px wide and 84px tall. The border is 112.56px tall, so the tile grows by 112.56 / 84 = 1.34: it is 90 × 1.34 = 120.6px wide.

The top edge, between the corners, is 220 − 2 × 20 = 180px wide. One tile fits; two would need 241.2px. `space` draws only whole tiles and spreads the leftover around them: 180 − 120.6 = 59.4px, so 29.7px on each side. The tile runs from x = 139.7 to 260.3 on the canvas, painted from 140 to 259.

Nothing is painted in the two gaps. body's yellow shows there, from x = 110 to 139 and from 260 to 289, 30px wide, down to the bottom band. These are the suspenders.

With `round` (same length), the tile is stretched over the whole edge, the suspenders disappear, and 7,140 pixels change.

### 6. A translucent cream

`#ffdd` is `#ffffdd` with an opacity of dd: 221 / 255, about 87%. It is not drawn on the green, but on body's yellow. Mixed with the yellow, it gives the pale cream of the target, `#fef9ce`.

## Golf notes

- One box draws everything. body's background is the yellow, and the border-image paints over it.
- `space` cuts the suspenders for free. `round` has the same length but fills the edge: 7,140 pixels change.
- `5vw` is 20px in 3 characters. A plain `20` would mean 20 × the border width, which is 0: the corners disappear, and 4,704 pixels change. `20px` gives the same render in 132 characters.
- `67%` is the closest two-digit value to 112px. With `66%`, 6,774 pixels change; with `68%`, 6,526.
- The `0` at the bottom is needed. Without it, the bottom width copies the top one, `67%`, and 22,127 pixels change.
- `25%` puts the color change in the middle of the 84px top slice. With `20%`, 1,760 pixels change.
- `#ffdd` is a 4-digit color with alpha. `#ffd` is one character shorter, but opaque: every cream pixel turns `#ffffdd`, 8,960 pixels in all.
- `&` matches html in 1 character. `html{` gives the same render in 134 characters.
- No space is needed in `)50%65/67%5vw`: the `)`, the `%` and the `/` all end a token.
- Two braces, `&{` and `*{`, are left open, and there is no `</style>`. With `}}`, the code is 133 characters; with `}}</style>`, 141. The render is the same.

## If you try it at home

In my Chrome, the cream is not one flat color. Its pixels alternate between `#fef8cf` and `#fef8ce`, with a few `#fdf8ce` in the corners. The target is a flat `#fef9ce`. So 8,960 pixels are one step off on one or two channels, which the eye cannot see. Everything else matches the target pixel for pixel. The CSS Battle judge gives the code a 100% match.
