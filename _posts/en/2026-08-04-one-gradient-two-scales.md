---
title: "One gradient, two scales: a bitten pink box in 149 characters"
ref: 2026-08-04
permalink: /2026/08/04/one-gradient-two-scales/
description: "How one rule, applied to both html and body, draws the August 4, 2026 CSS Battle target: the same radial-gradient makes gray discs at html's scale and green bites at body's scale, and the same outline hides what is left over."
target: /assets/targets/2026-08-04.png
target_url: https://cssbattle.dev/play/qfoEI6akJpQgni9f79Wa
colors: ["#325853", "#8885", "#d99795", "#d8d8d8"]
player: selenit
chars: 149
score: 696.67
match: 100
code: |
  <style>*{outline:solid 77lh#325853;background:radial-gradient(28lh,#8885 5%,0,#325853 677%26q,#D99795)333q/6.86em;margin:40 26.2%18.6%;*{font:82%/1%'
---

The August 4 target is dark green. In the middle sits a pink box with a round green bite on each side. Next to each bite there is a light gray half disc. Ilya Streltsyn draws it with one rule for html and body: the same `radial-gradient`, the same `outline`, the same margins. A nested rule gives body a tiny font. Every size in `lh` and `em` then shrinks: the gradient draws gray discs on html and green bites on body.

Use **Teaching colors** to tell the two outlines from the two backgrounds.

{% include animations/2026-08-04.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                        /* html, head, style and body */
  outline: solid 77lh #325853;             /* html: 1386px, body: 10px */
  background:
    radial-gradient(
      28lh,                                /* radius: 504px on html, 3.67px on body */
      #8885 5%,                            /* translucent gray up to 5% */
      0,                                   /* a hint at 0: a sharp edge */
      #325853 677% 26q,                    /* green up to 677% */
      #D99795                              /* then pink */
    )
    333q / 6.86em;                         /* x = 314.65px; tiles 109.76px wide on html, 90px on body */
  margin: 40 26.2% 18.6%;                  /* html: 104.8 on the sides; body: 49.88 */
  * {                                      /* head, style and body, not html */
    /* 13.12px, line-height 0.1312px, an empty font name */
    font: 82% / 1% '
```

## How it works

### 1. One rule for every element

There is no html, head or body tag in the code: Chrome adds them, and puts style in head. `*` matches all four. head and style are not displayed, so only html and body matter. The nested `*{` means `* *`: every element inside another one. That is head, style and body, but not html.

So html and body get the same `outline`, the same `background` and the same `margin`. Only body gets the `font`.

### 2. Two boxes

There is no doctype, so the page is in quirks mode, and `40` with no unit is read as px. With `<!doctype html>` in front, 10,089 pixels change.

For html, the percentages are taken on the 400px viewport: 26.2% of 400 = 104.8 on the sides, 18.6% of 400 = 74.4 at the bottom. html is 400 − 2 × 104.8 = 190.4 wide, at (104.8, 40).

For body, they are taken on html's width, 190.4: 49.88 on the sides, 35.41 at the bottom. body is 190.4 − 2 × 49.88 = 90.66 wide, at (154.67, 80). Quirks mode stretches body down: 300 − 40 − 74.39 − 40 − 35.41 = 110.2px tall. getBoundingClientRect gives html a height of 190.2px. So both boxes have their middle at y = 135.1.

### 3. Two scales

`font:82%/1%'` gives body 82% of 16 = 13.12px, and a line-height of 1% of that: 0.1312px. The lone `'` opens a font name that runs to the end of the code: an empty name. The shorthand needs a family, and this one counts.

html keeps the default font: 16px, line-height `normal`. In my Chrome, that is 1lh = 18px: getComputedStyle turns `28lh` into 504px.

So every value in `lh` or `em` has two sizes:

- `28lh`: 504px on html, 3.6736px on body;
- `77lh`: 1386px on html, 10.1px on body (the outline is drawn 10px wide);
- `6.86em`: 109.76px on html, 90.0032px on body.

### 4. html's background, on the whole canvas

html's background is painted on the whole canvas. But its tiles are sized and placed on html's box, 190.4 × 190.2 at (104.8, 40).

The size is `6.86em`, so 109.76px wide. The height is `auto`, and a gradient has no size of its own, so it takes the box height: 190.2px. The position `333q` sets x only; y is centered. 1q is a quarter of a millimeter, 0.945px, so 333q = 314.65px. The tile edges fall at x = 90.16, 199.92 and 309.68 on the canvas.

The gradient is a circle of radius 28lh = 504px, in the middle of each tile:

- `#8885` up to 5%, that is 25.2px. It is `#888` at 85/255 opacity, a third. Over the white page, it gives a light gray: `#d7d7d7` in my render.
- `0` is a color hint at 0px, before the previous stop. Chrome moves it up to the stop, which makes a sharp edge. Without it, the gray fades into the green, and 21,932 pixels change.
- `#325853` from 677% on. `26q` is a second position for the same stop, but it is smaller than 677%, so Chrome moves it up to 677% too.
- `#D99795` after that: 677% of 504 is 3412px, far off the canvas. html shows no pink.

That gives four gray discs of radius 25.2, at x = 35.28, 145.04, 254.8 and 364.56, y = 135.1. Everything else on the canvas is green.

### 5. html's outline

html's outline is 77lh = 1386px of green around its box. It covers the whole canvas outside the box, from x = 104.8 to 295.2 and y = 40 to 230.2. The two outer discs disappear under it. Without html's outline, they show, and 4,186 pixels change.

### 6. body's background

body has the same background, at body's scale. html has a background, so body's stays inside body's box.

The tiles are 90.0032px wide and 110.2px tall, with the same `333q` shift. One tile edge falls at x = 199.31. So the circle centers are at x = 154.31 and 244.31, y = 135.1.

The radius is 3.6736px. The gray part, 5%, is 0.18px wide: nothing shows. The green goes up to 677%, 24.87px. Then it is pink.

body's box cuts the two green circles. The left one is centered 0.36px left of body's edge, and the right one 1.02px left of the other edge. What shows is two bites in a pink box: from x = 154.67 to 179.18 on the left, from 219.44 to 245.33 on the right. Without body's background, 9,172 pixels change.

### 7. body's outline

body's outline is 77lh, 10px of green around body: from x = 144.67 to 255.33, and from y = 70 to 200.2. It covers the inner part of each gray disc, up to the bites. The gray left of x = 144.67 and right of x = 255.33 is the two half discs. Without body's outline, 1,008 pixels change.

## Golf notes

- One rule draws everything. The sizes are in `lh` and `em`, and the nested `font` changes what they mean on body. The same gradient and the same outline work at two scales.
- The lone `'` is one character, and the font shorthand needs it. Without it, Chrome drops the declaration: body keeps 16px and a `normal` line-height, and 10,273 pixels change.
- The hint `0,` costs two characters and gives the sharp edge of the gray discs.
- `#8885` is a gray in 5 characters, over the white page. The opaque `#888` is darker: 2,042 pixels change.
- `333q` places both tile grids at once.
- `6.86em` fits both tile widths. With `6.8em`, 1,480 pixels change; with `6.9em`, 893.
- `28lh`: with `27lh`, 516 pixels change; with `29lh`, 700.
- `5%`: with `4%`, 880 pixels change; with `6%`, 1,092.
- `82%`: with `80%`, 1,000 pixels change; with `84%`, 839.
- `26.2%`: with `26%`, 1,995 pixels change. `18.6%`: with `18%`, 909.
- No space is needed in `77lh#325853`, `677%26q`, `)333q` or `26.2%18.6%`: a `#` always starts a new token, and so does what follows a `%` or a `)`.
- Two braces, `*{` and `*{`, and the font name are left open, and there is no `</style>`. With `'}}`, the code is 152 characters; with `'}}</style>`, 160. The render is the same.

## If you try it at home

In my Chrome, the code puts every straight edge on the same pixel as the target. The target has noisy pixels around every edge, colored specks up to 8 pixels away from it. My render has clean edges. On the curves, 88 edge pixels lean the other way. The flat colors are also one step off: the target has `#315853`, `#d99896` and `#d8d8d8`, and my render `#325853`, `#d99795` and mostly `#d7d7d7`. In all, 1,824 pixels differ by more than 8 on one channel. The CSS Battle judge gives the code a 100% match.
