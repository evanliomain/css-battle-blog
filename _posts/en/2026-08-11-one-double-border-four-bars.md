---
title: "One double border, four bars: a pill in 133 characters"
ref: 2026-08-11
permalink: /2026/08/11/one-double-border-four-bars/
description: "How the top and bottom borders of html, rounded with a 9in radius, make a pill, and how one double border on each side of body gives the four bars of the August 11, 2026 CSS Battle target."
target: /assets/targets/2026-08-11.png
target_url: https://cssbattle.dev/play/9PFKqCOsKmSizurb6gRt
colors: ["#3a2568", "#f9ddc6", "#9d92c8"]
player: gunnar
chars: 133
score: 712.6
match: 100
code: |
  <style>&{background:#3A2568;margin:5%120;border-block:5em solid#F9DDC6;border-radius:9in;*{margin:6%0;border-inline:64q double#9D92C8
---

The August 11 target is a tall cream pill on a dark purple background. A band of the background cuts it in the middle, and four lavender bars cross that band. Gunnar Bittersmann draws the pill with the top and bottom borders of html, rounded into two half discs. The bars are the left and right borders of body: each one is `double`, so each side gives two bars.

Use **Teaching colors** to see the box of html, the box of body, and the gap inside each double border.

{% include animations/2026-08-11.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                                /* & at the top level: the root, html */
  background: #3A2568;             /* goes to the canvas */
  margin: 5% 120;                  /* 20px top and bottom, 120px left and right: html is 160 × 260 */
  border-block: 5em solid #F9DDC6; /* top and bottom borders, 80px each */
  border-radius: 9in;              /* 864px, scaled down to 80px: two half discs */
  * {                              /* every element inside html: head, style, body */
    margin: 6% 0;                  /* 6% of 160 = 9.6px: body is 160 × 80.81 */
    border-inline: 64q double #9D92C8  /* left and right borders, 60px, cut in three */
```

## How it works

### 1. One rule for html, one for body

There is no html, head or body tag in the code: Chrome adds them. At the top level of a style sheet, `&` stands for the root of the document: html. I checked with getComputedStyle: html has the 80px top and bottom borders, and body has the 60px double borders. The nested `*{` means `& *`: every element inside html, so head, style and body. head and style are not displayed, so body is the only box that gets the inner rule.

The canvas takes the background of html, `#3A2568`. I checked: without `background:#3A2568`, the canvas is white.

### 2. html is 160 × 260

There is no doctype, so the page is in quirks mode, and a number with no unit, like the `120` in `margin:5%120`, is in px. I checked with `<!doctype html>` in front: the whole `margin` is dropped, html is 400px wide, and body is 0px tall.

A percentage margin is a share of the width of the containing block, here the 400px viewport. So `5%` is 20px at the top and bottom, and `120` is 120px on the left and right. html is 400 − 240 = 160px wide. In quirks mode, html also fills the height of the viewport, minus its margins: 300 − 40 = 260px. getBoundingClientRect gives (120, 20), 160 × 260.

### 3. Two cream borders

`border-block` sets the top and bottom borders in one property. `5em` is 5 × 16 = 80px. The borders are inside html's 260px: the top one runs from y = 20 to 100, the bottom one from 200 to 280. What is left between them is html's content box, 160 × 100, from y = 100 to 200. Nothing is painted there, so the canvas shows: that is the band across the pill.

### 4. 9in becomes 80px

`9in` is 9 × 96 = 864px. Along the top edge, two radii of 864px add up to 1728px, but the edge is only 160px long. When radii do not fit, the browser scales all of them down by the same factor. The smallest factor wins: 160 / 1728 on the top and bottom edges (the left and right edges give 260 / 1728). So every corner is 864 × 160 / 1728 = 80px. I checked: with `border-radius:80px`, the render is the same, pixel for pixel; with `79px`, it is not.

A corner of 80 × 80 on a border 80px tall turns the whole top border into a half disc of radius 80, centered at (200, 100). The same goes for the bottom border, centered at (200, 200). The inner edge of each border stays straight: the inner radius is the outer one minus the border, 80 − 80 = 0 vertically.

### 5. body sits in the band

body's `margin:6%0` is also a share of a width, the width of html: 6% × 160 = 9.6px at the top and bottom. In quirks mode, body fills the height of html's content box, minus its margins: 100 − 2 × 9.6 = 80.8px. getBoundingClientRect gives (120, 109.59), 160 × 80.81. body has no background: only its borders show.

### 6. Two borders of 60px

`border-inline` sets the left and right borders in one property. `64q` is 64 quarter-millimeters: 1q = 96 / 101.6 = 0.945px, so 64q = 60.47px. Chrome draws borders on whole pixels: getComputedStyle gives 60px for `border-left-width`. I checked: with `60px` in place of `64q`, the render is the same. The borders are inside body's 160px: from x = 120 to 180, and from 220 to 280. Their top and bottom edges, at y = 109.59 and 190.41, land on the rows 110 to 189: 80 rows, as in the target.

### 7. double gives two bars per side

A `double` border is drawn as two lines with a gap between them. Here each border is 60px, cut into three thirds of 20px: a line, a gap, a line. In my render, the left border gives lavender columns 120 to 139 and 160 to 179, with the canvas in between. The right border gives 220 to 239 and 260 to 279. The 40px between the two borders, from x = 180 to 220, is body's content box, which is empty. I checked with `solid` in place of `double`: each side becomes one 60px bar.

## Golf notes

- `&{` is the root in one character. With `html{` in its place, the code is 136 characters, and the render is the same, pixel for pixel.
- The nested `*{` reaches body without naming it. head and style get the rule too, but they are not displayed.
- html's `background` paints the whole canvas, so there is no need for a separate background.
- One `double` border gives two bars: the four bars come from one `border-inline` declaration.
- `9in` is 3 characters, and any radius big enough is scaled down to the same 80px.
- `64q` is 3 characters for a 60px border; `60px` is 4.
- In quirks mode, `120` needs no unit.
- No spaces are needed in `5%120`, `6%0`, `solid#F9DDC6` or `double#9D92C8`.
- Two braces, `&{` and `*{`, are left open, and there is no `</style>`. With `}}`, the code is 135 characters; with `}}</style>`, 143. The render is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the bars, the band and the straight edges of the pill land on the same pixels as in the target. 581 pixels differ from the target, all on the two curved edges: each one is within 0.73px of a circle of radius 80 around (200, 100) or (200, 200). The largest difference is 137 levels, at (146, 40), on the top left of the pill: the target is cream there, (249, 221, 198), and my render is a blend, (112, 89, 131). On the CSS Battle judge, the code is a 100% match.
