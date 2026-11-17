---
title: "One background, two boxes: three pills and four half discs in 101 characters"
ref: 2026-08-10
permalink: /2026/08/10/one-background-two-boxes/
description: "How one radial gradient, given to html and to body with the same 223%, 25lh and 38.8ch, puts four half discs on the edges and three pills in the middle of the August 10, 2026 CSS Battle target."
target: /assets/targets/2026-08-10.png
target_url: https://cssbattle.dev/play/h56uVgyaWQ12YfY9fLNi
colors: ["#144650", "#f3ac3c"]
player: gabriele19
chars: 101
score: 752.75
match: 100
code: |
  <style>*{background:radial-gradient(1q,#144650,37q,#F3AC3C)223%25lh/38.8ch;*{margin:130 50;font:6q/0'
---

The August 10 target is orange, with four dark teal half discs on the top and bottom edges and three teal pills in a row across the middle. Gabriele writes one background and gives it to every element. On html, it draws the four half discs. body gets a tiny font, so the same `223%`, `25lh` and `38.8ch` turn into other lengths there, and the same disc becomes three pills.

Use **Wide view** to see html's tiles slide past the canvas, and **Teaching colors** to tell html's discs from body's.

{% include animations/2026-08-10.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* html, head, style, body: all get this background */
  background:
    radial-gradient(1q, #144650, 37q, #F3AC3C)  /* a 34.96px blue disc, sharp edge, orange around */
    223% 25lh                /* html: 199.81px 450px · body: 424.14px 0px */
    / 38.8ch;                /* html: 310.4px wide · body: 109.80px wide; height auto */
  * {                        /* inside html: head, style, body */
    margin: 130 50;          /* body: 300 × 40 at (50, 130) */
    font: 6q / 0 '           /* 5.67px, line height 0: new ch and lh for body */
```

## How it works

### 1. Two boxes, one rule

There is no html, head or body tag in the code: Chrome adds them. `*` matches all four elements, so all of them get the same `background`. head and style are not displayed. The nested `*{` means `* *`: every element inside another one. html is inside nothing, so only head, style and body get the margin and the font.

There is no doctype, so the page is in quirks mode. A number with no unit, like `130` and `50`, is in px. In quirks mode, body also fills the height of html minus its margins: 300 − 260 = 40px. getBoundingClientRect gives body at (50, 130), 300 × 40. I checked with `<!doctype html>` in front: 39,136 pixels change.

### 2. A sharp disc out of a soft gradient

`radial-gradient(1q, …)` has a single length as its size: a circle with a ray of 1q, which is 96 / 101.6 = 0.945px. Then come three items:

- `#144650` has no position: it is at 0.
- `37q`, alone between two colors, is a transition hint: 37q = 34.96px.
- `#F3AC3C` has no position: it is at 100% of the ray, 0.945px.

The last stop sits before the hint, so the browser moves it up to the hint, 34.96px. The hint is then on the next stop, and the color jumps there: blue from 0 to 34.96px, orange after. I checked: with `#144650 37q` (a stop position, not a hint), the render is the same, pixel for pixel. With `34.96px` in place of `37q`, the same; with `35px`, 80 pixels change.

So `1q` does two jobs. It makes the shape a circle, and it makes 100% so small that the orange stop is pushed out to 37q. With `circle` in place of `1q`, 100% is the distance to the farthest corner, the orange stop stays far away, and the whole canvas turns into soft blue and orange blurs.

### 3. html: tiles of 310.4 × 300

The `ch` unit is the width of "0" in the element's font. html keeps the default font: getComputedStyle gives 16px Times in my Chrome, and `38.8ch` comes out as 310.4px, so 1ch = 8px there.

The height is `auto`. A gradient has no size of its own, so `auto` is 100% of the box: 300px. The gradient is drawn once per 310.4 × 300 tile, with the disc in the middle of the tile, and the tile repeats in both directions.

### 4. 223% 25lh: four half discs

A % position is a share of the room left once the tile is in the box: here 400 − 310.4 = 89.6px, and 2.23 × 89.6 = 199.81px. Past 100%, the tile goes past the right edge, and the repeat fills the rest. The tiles start at x = 199.81 and 199.81 − 310.4 = −110.59. Their discs are centered at x = 44.61 and 355.01.

`lh` is the element's line height. html has `line-height: normal`, and getComputedStyle gives `450px` for `25lh`: 18px per lh in my Chrome. The tiles repeat every 300px, so they start at y = 450, 150 and −150, and the discs are centered at y = 0 and 300: right on the top and bottom edges of the canvas. Only the lower half of the top discs shows, and only the upper half of the bottom ones.

The canvas takes html's background, so this pattern is what the whole canvas shows, outside body.

### 5. body: same values, other units

body gets the same background, but it paints it only inside its own 300 × 40 box. Its font is `6q/0'`: 6q = 5.67px, a line height of 0, and the font family `''`. The quote is never closed: the end of the file closes it. getComputedStyle gives:

- `38.8ch` = 109.804px (so 1ch = 2.83px at that size);
- `25lh` = 0px, because lh is the line height, and the line height is 0.

The `auto` height is 100% of body: 40px. Each tile is 109.80 × 40. The disc in it still has a 34.96px ray, so it is taller than the tile: body cuts it at its top and bottom edges. Each disc becomes a pill with a flat top and bottom.

### 6. 223% again: three pills

On body, the room left is 300 − 109.80 = 190.20px, and 2.23 × 190.20 = 424.14px. Inside body, the tiles start at x = 424.14 − 4 × 109.80 = −15.08, then 94.73 and 204.53. On the canvas, their discs are centered at x = 89.82, 199.63 and 309.43, and at y = 130 + 20 = 150. The next discs, centered at x = −19.98 and 419.24, fall outside body and do not show.

I checked the whole layout with px values: html with `199.808px 450px/310.4px 300px` and body with `424.137px 0/109.804px 40px` give the same render as the official code, within 7 color levels on some edge pixels.

## Golf notes

- One background serves both boxes. `%`, `lh` and `ch` depend on the box and on its font, so the same three values put the half discs on html and the pills on body.
- `font:6q/0'` is what gives body its own units. Without `/0`, the line height is `normal`, 25lh becomes 150px, and 804 pixels change. Without the `'`, the font has no family, the whole declaration is dropped, and 6,840 pixels change.
- `1q` as the size is 3 characters. `circle,#144650 37q,#F3AC3C 0` gives the same render, at 107 characters.
- `#144650,37q,` (hint) and `#144650 37q,` (stop position) are the same length and give the same render.
- `37q` is 3 characters for 34.96px.
- No spaces are needed in `)223%25lh/38.8ch`, and `130 50` needs no unit in quirks mode.
- Two braces, both `*{`, are left open, with the `'` string, and there is no `</style>`. With `'}}`, the code is 104 characters; with `'}}</style>`, 112. The render is the same.

## If you try it at home

In my Chrome (version 157 when this was written), 602 pixels differ from the target. All of them are on the edges of the seven shapes: the flat areas match, and every edge lands within one pixel of the target's. The largest difference is 209 levels, at (79, 298), on the right edge of the bottom left half disc: the target is teal there, (20, 70, 80), and my render is orange, (229, 165, 61). On the CSS Battle leaderboard, the code is listed at a 100% match.
