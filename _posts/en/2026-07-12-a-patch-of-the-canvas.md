---
title: "A patch of the canvas: an I and a 5 in 199 characters"
ref: 2026-07-12
permalink: /2026/07/12/a-patch-of-the-canvas/
description: "How one fixed radial gradient paints a half ring on the canvas, how html's three box shadows draw an I and the bar of a 5 around its own invisible box, and how body, with the same gradient, covers them like a patch of the canvas, in the July 12, 2026 CSS Battle target."
target: /assets/targets/2026-07-12.png
target_url: https://cssbattle.dev/play/80Er6Y1RveWdX3PjVkl0
colors: ["#b7d7cd", "#411c56", "#c06c88"]
player: kieron
chars: 199
score: 660.03
match: 100
code: |
  <style>*{margin:-10-111 0 130;background:radial-gradient(1Q at 0%46%,#b7d7cd 32Q,#411c56 0 60px,#b7d7cd)fixed 54vw}&{margin:75 234 65 86;color:C06C88;box-shadow:53Q -5ch,69Q 27Q 0 5Q,15ex -5ch#411c56
---

The July 12 target shows a pink I with serifs and a dark purple 5 on a mint green background. The two characters touch: the 5 starts where the stem of the I ends. Kieron draws them with one radial gradient and three box shadows. html is an invisible box: its shadows make the I and the bar of the 5, and it cuts them from inside. body gets the same gradient, pinned to the canvas: it covers the extra parts of the shadows like a patch of the canvas, and its ring is the round part of the 5.

Turn on **Teaching colors** to see the three shadows apart, and body over them.

{% include animations/2026-07-12.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                            /* html, body and the rest */
  margin: -10-111 0 130;       /* used by body: −10, −111, 0, 130 */
  background: radial-gradient(
      1Q at 0%46%,             /* circle, radius 1Q = 0.945px, at (0, 46%) */
      #b7d7cd 32Q,             /* mint up to 32Q = 30.24px */
      #411c56 0 60px,          /* dark purple from 30.24 to 60px */
      #b7d7cd                  /* mint after 60px */
    )
    fixed 54vw                 /* tile = canvas, 400 × 300, from x = 216 */
}
& {                            /* html */
  margin: 75 234 65 86;        /* 80 × 160 at (86, 75) */
  color: C06C88;               /* pink, for the shadows with no color */
  box-shadow:
    53Q -5ch,                  /* 50.08, −40: top of the I */
    69Q 27Q 0 5Q,              /* 65.2, 25.51, spread 4.72: bottom of the I */
    15ex -5ch#411c56           /* 107.7, −40: bar of the 5 */
```

## How it works

### 1. One gradient, pinned to the canvas

There is no doctype: the page is in quirks mode. The `*` selects every element, and html and body are the only two displayed. Both get the gradient. html is the root element, so its background is painted on the whole canvas.

`fixed` makes the viewport the background's area: 400 × 300. With no `background-size`, the gradient image is 400 × 300 too. `54vw` is 54% of 400: 216px. With a single value, the vertical position is `50%`, which moves nothing here, since the image is as tall as the area. My Chrome computes `216px 50%`. The tile starts at x = 216.

The size `1Q` makes the gradient a circle with a radius of 1Q, 0.945px. `at 0% 46%` puts its center at (0, 138) in the tile, so at (216, 138) on the canvas. The color stops go past that tiny circle, which is allowed: mint up to 32Q, 30.24px, then dark purple from 0 to 60px. A position lower than the one before is raised to it, so the 0 becomes 30.24: a hard edge. The last mint has no position: it goes to 100%, 0.945px, and is raised to 60px: a second hard edge. The result is a ring from 30.24 to 60px.

The center sits on the tile's left edge, so only the right half of the ring is in the tile. Left of x = 216, the canvas shows the previous tile, from −184 to 216. Its circle is at x = −184, more than 60px away from every pixel of the canvas: it is all mint there. With `no-repeat` (209 characters), the left 216 pixels turn white: 51,530 pixels change.

### 2. html: an invisible box that cuts the shadows

`&` outside any rule means `:scope`, here html. The `&` rule comes after the `*` one and is more specific, so html takes its margins. html is 400 − 86 − 234 = 80 wide. In quirks mode, it takes the canvas height minus its margins: 300 − 75 − 65 = 160. getBoundingClientRect gives (86, 75), 80 × 160.

The box paints nothing: its background went to the canvas. But a box shadow is only painted outside its element's border box. Inside html's box, from (86, 75) to (166, 235), the canvas always shows. That is the mint gap left of the stem, between the two serifs.

### 3. Three shadows

Quirks mode reads `C06C88` as a hex color without its `#`. The first two shadows have no color, so they use `color`: pink.

- `53Q -5ch`: 53Q is 50.08px. 1ch is 8px with the default font of my Chrome (Times, 16px), so −5ch is −40px. The shadow goes from (136.08, 35) to (216.08, 195). Above html's box, from y = 35 to 75, it is the top serif. Right of html's box, from x = 166, it is the stem down to y = 195.
- `69Q 27Q 0 5Q`: offset 65.2 and 25.51, no blur, spread 5Q = 4.72px on every side. The shadow is 89.45 × 169.45, from (146.47, 95.79) to (235.92, 265.24). Below html's box, from y = 235, it is the bottom serif. Between x = 166 and 216, it carries the stem down to y = 235.
- `15ex -5ch#411c56`: 1ex is 7.18px with the default font of my Chrome, so the offset is 107.7px. The dark purple shadow goes from (193.7, 35) to (273.7, 195). The first shadow in the list is painted on top, so this one is under the two pink ones. Without it (182 characters), 1,740 pixels change: the bar of the 5 is gone.

### 4. body: the same picture, on top

body takes the `*` margins: −10, −111, 0, 130. They count from html's box. body starts at x = 86 + 130 = 216 and ends at 166 + 111 = 277: 61 wide. On top, it starts at 75 − 10 = 65. In quirks mode, body stretches to html's height, 160, minus its own margins: 160 + 10 = 170. getBoundingClientRect gives (216, 65), 61 × 170.

body has the gradient too, and `fixed` places it on the viewport as well. So body paints exactly the pixels of the canvas under it, ring included. But body is painted after html's shadows. Inside its box, it hides them: shadow 3 below y = 65, and shadow 2 right of x = 216 above y = 235. For a test, I add `*{background:0` at the end (214 characters). It is nested in `&`, so it selects the elements inside html, and body loses its background. 5,107 pixels change, all inside body's box: the dark column of shadow 3 and the pink of shadow 2 show.

### 5. The I and the 5

- The I: the top serif is shadow 1 above html's box. The stem is shadows 1 and 2, between html's box and body. The bottom serif is shadow 2 below both boxes.
- The 5: the bar is what is left of shadow 3, between the pink shadows and the top of body, from (216, 35) to (273.7, 65). The round part is the half ring, painted by body.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `*` rule gives the gradient to both boxes: html sends it to the canvas, and body makes the patch with it. body's margins ride in the same rule. html gets them too, but the `&` rule overrides them.
- `&` selects html in 1 character. `html` gives the same picture in 202.
- `fixed` does two jobs. It makes the tile as big as the canvas, and it lines body's copy up with the canvas. Without it (193 characters), html's gradient is placed on html's 80 × 160 box and repeats every 80px across the canvas, and body's copy repeats every 61px. 36,464 pixels change.
- The size `1Q` costs 2 characters, and it makes the last stop free: with no position, the last mint is raised to 60px, a hard edge. `circle` instead (203 characters) puts 100% at the farthest corner: the dark purple fades into mint over the whole canvas, and 98,264 pixels change. `circle` and `#b7d7cd 0` give the same picture in 205.
- `#411c56 0 60px` is one color with two positions. Writing it as two stops, `#411c56 0,#411c56 60px`, gives the same picture in 207 characters.
- `32Q` is 30.24px in 3 characters. `30px` (200 characters) changes 24 pixels, all on the inner edge of the ring.
- `54vw` is 216px in 4 characters. `216px` gives the same picture in 200.
- `color:C06C88` has no `#`. `#C06C88` gives the same picture in 200. Writing `#C06C88` after both pink shadows instead of setting `color` also gives the same picture in 200.
- `-5ch` is −40px in 4 characters. `-40px` in both shadows gives the same picture in 201.
- `53Q` and `69Q 27Q 0 5Q` are shorter to write than whole pixel values, and they land close to them. `50px -40px` (201 characters) changes 70 pixels, along the left and right edges of the top serif (x = 136 and 216). `65px 25px 0 5px` (202 characters) changes 150 pixels, along the left, right and bottom edges of the bottom serif.
- `-10-111` and `-5ch#411c56`: the minus sign and the `#` start a new value, so no space is needed. `-10 -111` or `-5ch #411c56` each give the same picture in 200.
- Nothing is closed. `}</style>` at the end takes 208 characters, for the same picture.

## If you try it at home

In my Chrome, the official code does not match the target exactly. test.sh finds 246 wrong pixels on straight edges and 183 on curves. The largest gap is the bar of the 5: it stops at x = 273.7 instead of 276, which is 90 pixels. In my Chrome, 1ex is 7.18px, so `15ex` is 107.7px. With `110px` in its place (200 characters), the bar ends at 276, like in the target, and only those 90 pixels change. Most of the other differences are around the ring and along edges that fall between two pixels, like x = 136.08 or y = 265.24. The CSS Battle judge gives the official code a 100% match.
