---
title: "A link full of spaces: two hooks in 128 characters"
lang: en
ref: 2026-11-01
permalink: /2026/11/01/a-link-full-of-spaces/
description: "How a 170px border on html and a link holding only spaces draw the November 1, 2026 CSS Battle target, and why it only works on CSS Battle's own Chrome."
target: /assets/targets/2026-11-01.png
target_url: https://cssbattle.dev/play/PFTHiJ57Dlg7O5pWe4yX
colors: ["#fff", "#6d4630"]
player: gabriele19
chars: 128
score: 718.1
match: 100
code: |2
   <a>   <style>a{border:5vw solid#fff;border-radius:42Q}&{>*{margin:10-10}border:180q solid#6D4630;margin:-30 0;font:127q/0'Serif
---

The November 1 target is a white shape on chocolate brown: a stem with two curled ends, top and bottom, like a “)” and a “(” overlapping, and a short bar across the middle. Gabriele's solution has no background at all. The brown is a huge border on `html`, and the bar is the small window it leaves in the middle. The two hooks come from a link, `<a>`, that holds nothing but spaces. One warning first: those hooks only appear in CSS Battle's own Chrome. I could not reproduce them, so part of this post says what I could check and what I could not.

{% include animations/2026-11-01.html lang=page.lang %}

## The code, spaced out

```css
 <a>   <style>                 /* a link with only spaces in it */
a {
  border: 5vw solid #fff;      /* 20px, white */
  border-radius: 42Q;          /* about 40px */
}
& {                            /* & alone is html */
  > * {                        /* its children: head and body */
    margin: 10 -10;
  }
  border: 180q solid #6D4630;  /* 170px, brown */
  margin: -30 0;
  font: 127q/0 'Serif';        /* 120px, line height 0 */
}
```

## How it works

### 1. The brown is a border

No element has a background, so the canvas stays white. On `html`, `border:180q` paints a 170px brown border on all four sides (180q is 170.1px, and Chrome draws borders in whole pixels).

`margin:-30 0` and quirks mode (where `html` fills the window height minus its margins) make the box of `html` 400×360, at (0, −30). Take away 170px on each side, and the content area is 60×20, at (170, 140). Nothing paints there, so the white canvas shows through: that is the bar in the middle of the shape. I checked it on the target: the bar is exactly 60×20 at (170, 140).

### 2. body is 80px wide

`>*` nested in `&` matches the children of `html`: `head`, which stays hidden, and `body`. `margin:10-10` gives `body` 60 + 10 + 10 = 80px of width, from x = 160 to 240. Its height is 20 − 10 − 10 = 0, at y = 150.

`font:127q/0'Serif` on `html` is inherited by everything inside: a 120px font (127q), a line height of 0, and a font named `Serif`. The quote is never closed: the string ends with the code.

### 3. The link, in today's Chrome

The `<a>` sits in the `body`, inline. Its content is three spaces (the `<style>` ends up inside the link too, but it is hidden). It has a white 20px border (`5vw`) and 42Q corners, about 40px.

In Chrome 156, the spaces collapse to nothing: the link is 0px wide inside, so its box is just its left and right borders, 40px. Its height is the height of the font (138px here) plus the top and bottom borders: 178px. The corners are too big for a 40px box, so they shrink to 20px: one white pill, 40×178, from x = 160. That is not the target.

### 4. On CSS Battle: two hooks

On CSS Battle, the same code scores 100%. In the target, the white shape is two hooks of 50×160 that overlap on the stem:

- a “)” from x = 160 to 210, open on the left;
- a “(” from x = 190 to 240, open on the right;
- they share the stem, x = 190 to 210.

Each hook has a 20px stroke and a 40px outer radius, like the border of the `<a>`, and both fit in the 80px of the `body`. Their height, 160px, is the font size, 120px, plus two 20px borders. I could not see how the judge's Chrome turns the link into these two hooks, so the animation draws them from the target's geometry.

## Golf notes

- The brown costs no `background`: a 170px border paints it, and its empty middle is the bar.
- `q` and `vw` give short exact sizes: `180q` (170px), `127q` (120px), `5vw` (20px), `42Q` (about 40px).
- `font:127q/0'Serif` sets the size, the line height and the family in one shorthand, with no closing quote.
- `&{>*{…}…}` reaches the `body` from inside the `html` rule.
- `<a>` comes before `<style>`, so the style sheet ends up inside the link, hidden. The leading space counts in the 128 characters.

## If you try it at home

CSS Battle scores solutions in its own, older Chrome. In Chrome 156 this code draws a single pill and the bar instead of the two hooks, with more than 5,000 wrong pixels: I could not reproduce the 100% match. The frame and the bar come out exactly as in the target; the hooks are the part I cannot explain. Note that `'Serif'` in quotes is a font name, not the generic `serif` keyword, so the font it gets depends on the machine. On the CSS Battle judge, it is a 100% match.
