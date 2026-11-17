---
title: "One rotate, counted twice: a backward E and two bars in 124 characters"
ref: 2026-08-06
permalink: /2026/08/06/one-rotate-counted-twice/
description: "How one border-image, cut from a plain yellow image with space, and one rotate that turns body twice draw the backward E and the two bars of the August 6, 2026 CSS Battle target."
target: /assets/targets/2026-08-06.png
target_url: https://cssbattle.dev/play/pSfUqdmXCS6D0TBIPxii
colors: ["#0e127d", "#eddf5a"]
player: h_blierzt
chars: 124
score: 722.68
match: 100
code: |
  <style>*{background:#0E127D;rotate:90deg;margin:10 130;border-image:conic-gradient(#EDDF5A)50%34/60%9%space;*{margin:0 0 140
---

The August 6 target is navy blue. In the middle, three yellow shapes sit side by side: a backward E, a wide bar and a thin bar. H_Bliertz draws them with only html and body, and one rule for both. The same `border-image` cuts three bands out of a plain yellow image, on each box. One `rotate:90deg` turns html's bands horizontal, and turns body twice, so its bands end up vertical.

Use **Teaching colors** to tell html's bands from body's, and to see body's box.

{% include animations/2026-08-06.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                             /* html, head, style and body */
  background: #0E127D;          /* html: the canvas; body: its own box */
  rotate: 90deg;                /* html turns 90deg; body 90deg more */
  margin: 10 130;               /* html: 140 × 280 at (130, 10) */
  border-image:
    conic-gradient(#EDDF5A)     /* one color: a plain yellow image */
    50% 34                      /* slices: half the height, 34px on the sides */
    / 60% 9%                    /* widths: too big, scaled to 5/6 */
    space;                      /* one tile in the middle of each edge */
  * {                           /* head, style and body */
    margin: 0 0 140             /* body: 140 × 140 at the top of html */
```

## How it works

### 1. One rule, two boxes

There is no html, head or body tag in the code: Chrome adds them, and puts style in head. `*` matches all four. The nested `*{` means `* *`: head, style and body. head and style are not displayed, so only html and body matter.

html keeps `margin:10 130`. body gets `margin:0 0 140` from the nested rule.

There is no doctype, so the page is in quirks mode. A number with no unit, like `10 130`, is in px. And in quirks mode, html and body stretch to fill the height:

- html is 400 − 2 × 130 = 140px wide and 300 − 2 × 10 = 280px tall, at (130, 10);
- body fills html, minus its 140px bottom margin: 140 × 140, at the top of html.

offsetWidth and offsetHeight give 140 × 280 for html and 140 × 140 for body. With `<!doctype html>` in front, the unitless margins are dropped: body is 0px tall, and 25,958 pixels change.

### 2. Two backgrounds, two jobs

`background:#0E127D` goes to html and to body. html's background paints the whole canvas: that is the navy.

Since html has its own background, body's background stays in body's box. It is navy too, so it is invisible, but it hides whatever html draws below it. I checked: with the background on body only (in the nested rule, same length), body's background goes to the canvas, html's bands show through body's box, and 4,416 pixels change.

### 3. A border-image with no border

`conic-gradient(#EDDF5A)` has a single color stop. It is a plain yellow image, the size of the box: 140 × 280 for html. There is no border style and no border width: getComputedStyle gives `0px` and `none`. The border-image is still drawn, because its widths are percentages of the box. With plain numbers, like `/9 1`, the widths are multiples of the 0px border width, and nothing is drawn: the canvas stays all navy.

The image is cut into nine slices: `50%` of 280 = 140px from the top and from the bottom, `34`px from the left and from the right. Top and bottom slices take the whole height, so the middle row of slices has no height at all.

The widths are `60% 9%`: 60% of 280 = 168px on top and bottom, 9% of 140 = 12.6px on the sides. 168 + 168 = 336 is more than 280, so all four widths are scaled down by 280 / 336 = 5/6: 140px on top and bottom, and 10.5px on the sides. In my Chrome, the side bars are painted 10px thick, at 1× and at 2× (20 device pixels).

So the top and bottom borders take the whole height. The left and right edges have no room, and the middle is empty (there is no `fill`, and it has no height anyway). What is left:

- the four corners: two yellow bars, 10px wide, down the left and right sides of html;
- the top and bottom edges: their slice is 140 − 2 × 34 = 72px wide, and the border is as tall as the slice, so each tile is 72px wide.

### 4. `space`: one tile, in the middle

The edge between the two corners is about 120px wide. One 72px tile fits; two would need 144px. `space` draws only whole tiles and spreads the leftover around them, so the single tile sits in the middle: from x = 34 to 106 in html's box. The top and bottom tiles line up into one band.

With `round`, `repeat` or no keyword at all, the tile fills the whole edge, the three bands merge into one block, and 13,440 pixels change.

So html carries three vertical bands: 0 to 10, 34 to 106 and 130 to 140.

### 5. The same rule on body

body gets the same border-image on its 140 × 140 square. 60% of 140 = 84px, and 84 + 84 is more than 140: scaled by 5/6, that is 70px on top and bottom and 10.5px on the sides. The slices are 70px and 34px, the tile is 72px again, and it lands from 34 to 106.

body's navy box covers the top half of html, and draws its own three bands there, at the same places as html's. Before any rotation, nothing changes.

### 6. One rotate, counted twice

`rotate:90deg` turns html around its center, (200, 150). getBoundingClientRect gives (60, 80, 280, 140): html now runs from x = 60 to 340 and from y = 80 to 220. Its three bands turn horizontal: y = 80 to 90, 114 to 186 and 210 to 220.

body turns with html: getBoundingClientRect gives (200, 80, 140, 140), the right part of html. And body has `rotate:90deg` too, around its own center. That makes 180deg in all, so its bands are vertical on the screen: x = 200 to 210, 234 to 306 and 330 to 340.

body's navy box hides html's bands from x = 200 on. Its left bar, 200 to 210, joins the three html bands that are left on the left: the backward E. The wide bar and the thin bar are body's other two bands.

Without body's own rotation (`rotate:none` in the nested rule), its bands fall right on html's, and 8,832 pixels change.

## Golf notes

- One rule draws everything, on two boxes. The nested `*{` only changes body's margin.
- One `rotate:90deg` turns the tall html into a wide one, and turns body a second time. No second angle is needed.
- `margin:0 0 140` makes body exactly half of html. With `margin:0`, body is as big as html, and 28,432 pixels change.
- `60%` is too big on purpose. Chrome scales all four widths by 5/6: the 168px top and bottom become 140, half of html, and the 12.6px sides become 10.5, painted 10. With `50%`, the bars are 12px thick and 1,120 pixels change; with `63%`, 9px and 560 pixels.
- `conic-gradient(#EDDF5A)` is the shortest plain-color image: `linear-gradient(#EDDF5A)` gives the same render in 125 characters.
- `space` does the cutting. `round` has the same length but fills the edge: 13,440 pixels change.
- No space is needed in `)50%34/60%9%space`: the `)`, the `%` and the `/` all end a token.
- Two braces, `*{` and `*{`, are left open, and there is no `</style>`. With `}}`, the code is 126 characters; with `}}</style>`, 134. The render is the same.
