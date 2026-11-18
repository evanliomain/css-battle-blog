---
title: "One gradient, two line heights: three figures in 134 characters"
ref: 2026-06-13
permalink: /2026/06/13/one-gradient-two-line-heights/
description: "How one background list, given to html and to body, draws 25px heads on html and 50px shoulders on body, because 1lh and 5em change from one element to the other, in the June 13, 2026 CSS Battle target."
target: /assets/targets/2026-06-13.png
target_url: https://cssbattle.dev/play/bntxlo7Wue1WgUtO6vJB
colors: ["#594f7c", "#efeade"]
player: emohdaziz
chars: 134
score: 711.53
match: 100
code: |
  <style>*{--g:radial-gradient(1lh,#594f7c,139%,#0000)fixed;background:var(--g)0-5em/50%,var(--g)0 5em#efeade;*{margin:105 0;font:3vh/4"
---

The June 13 target shows three purple figures on a cream background. Each one is a round head and half-disc shoulders: two at the top, and one lower in the middle, upside down. Mohamed Ali writes one background list and gives it to html and to body. The discs are sized in `lh` and placed in `em`. Those units change from html to body: html draws the 25px heads, body draws the 50px shoulders.

Use **Wide view** to see the tiles and the copies of the heads off the canvas, and **Teaching colors** to tell html's discs from body's.

{% include animations/2026-06-13.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* html, head, style, body */
  --g: radial-gradient(1lh, #594f7c, 139%, #0000) fixed;
                             /* a solid disc, radius 1.39lh, placed on the page */
  background:
    var(--g) 0 -5em / 50%,   /* 200 × 300 tiles: two discs side by side */
    var(--g) 0 5em #efeade;  /* one disc in the middle, and the cream */
  * {                        /* body (head and style stay hidden) */
    margin: 105 0;           /* body: 400 × 90 at y = 105 */
    font: 3vh/4 "            /* 9px, line height 36px */
```

## How it works

### 1. html and body

The browser adds html, head and body around `<style>`, and puts style in head. So `*` selects four elements: html, head, style and body. head and style are hidden. html and body are left, and both get the same `--g` and the same `background`.

The nested `*{…}` selects every element that is inside another one: head, style and body. For the picture, only body counts. CSS Battle pages have no doctype, so they are in quirks mode, and a bare number like `105` is read in px. body gets 105px margins at the top and bottom, none on the sides. In quirks mode body fills the height of the page: it is 400 × 90, from y = 105 to 195.

html's background covers the whole page. body's background is not moved to the page, because html already has one. So body paints its own background, inside its own box.

### 2. A disc with a color hint

`radial-gradient(1lh,…)` is a circle of radius 1lh. 1lh is the line height of the element.

`139%` sits between the two colors with no color of its own. It is a color hint: it says where the mix between the two colors is half and half. `#0000` has no position, so it would end at 100%. But a stop cannot come before the hint in front of it, so `#0000` is pushed out to 139% too. The hint now sits on the last stop: the purple stays solid all the way to 139%, then stops at once. I checked it: `#594f7c 139%,#0000 0` gives the same picture.

On html, the font is the default 16px one. In my Chrome its line height is 18px, so 1lh = 18px. The disc has a radius of 1.39 × 18 = 25.02px.

`fixed` is part of `--g`. It places the gradient in page coordinates, not in the element's box. For html, that is the same thing. For body, it matters (section 5).

### 3. Two heads at the top

html's first layer is `var(--g)0-5em/50%`. On html, 5em = 5 × 16 = 80px. The size `50%` is half the page width: 200px. The height is left out, and a gradient has no size of its own, so it takes the whole height: 300px. That makes 200 × 300 tiles, shifted up by 80px, and they repeat.

Each tile has its disc in its center: (100, 70) and (300, 70). Those are the two heads, from y = 45 to 95 in my render. The copies one tile lower, at y = 370, fall off the canvas.

### 4. The lower head

The second layer is `var(--g)0 5em#efeade`. No size: one tile of 400 × 300, shifted down by 80px. Its disc is at (200, 230): the lower head, from y = 205 to 255. Its copy above, at (200, −70), is off the canvas. `#efeade` is the background color under both layers: the cream.

### 5. The same list on body

body gets `font:3vh/4"`. 3vh is 3% of 300: 9px. The line height is 4 times the font size: 36px.

So on body, the same `--g` has 1lh = 36px: discs of radius 1.39 × 36 = 50.04px, twice the heads. And 5em = 45px. Thanks to `fixed`, body's tiles are placed on the page, like html's. The first layer puts its discs at (100, 105) and (300, 105). The second one puts its disc at (200, 195).

### 6. Cut by the band

body only paints inside its box, from y = 105 to 195. Of the two top discs, only the lower half is left: the shoulders under the heads, from y = 105 to 155. Of the third disc, only the upper half is left: the upside-down shoulders, from y = 145 to 195, above the lower head. body's cream fills the rest of the band, over html's cream.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `--g` holds the gradient and `fixed` once, for two layers. Writing the gradient twice gives the same picture in 159 characters.
- The color hint makes the edge hard for less. `#594f7c 139%,#0000 0` gives the same picture in 136 characters. Without `139%,` (129 characters), each disc fades from purple at its center to clear at 1lh, and 17,688 pixels change.
- `1lh` is one length with two values: 18px on html, 36px on body. With `18px` instead (135 characters), body's half discs shrink to the size of the heads, and 8,826 pixels change.
- `5em` works the same way: 80px on html, 45px on body. With `80px` (136 characters), body's discs sit at y = 70 and 230, like the heads: only thin slices reach into the band, and 9,570 pixels change.
- `fixed` puts body's discs on the page. Without it (129 characters), they are placed in body's own 400 × 90 box and repeat there: the band fills with half discs at x = 100, 200 and 300, three hanging from its top edge and three standing on its bottom edge, and 10,902 pixels change.
- `font:3vh/4"` sets the font size (for `em`) and the line height (for `lh`) in one declaration. The `font` shorthand needs a family name. The lone `"` opens a string, and the end of the code closes it: an empty name, for 1 character. Without it (133 characters), Chrome drops the whole `font` declaration: body keeps 16px and 1lh = 18px, its discs fall outside its band, the shoulders are gone, and 11,790 pixels change. Closing the string, `""`, gives the same picture in 135 characters.
- `50%` is 3 characters. `200px` gives the same picture in 136 characters.
- `105 0` is read in px in quirks mode. `105px 0` gives the same picture in 136 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 496 pixels, with the same rule as in the golf notes. All of them are on the round edges: 82 around each head, 88 around each of the two top shoulders, 74 around the lower one. The flat colors are the same. The CSS Battle judge gives the code a 100% match.
