---
title: "One inset shadow, two colors: a half-green disc in 120 characters"
ref: 2026-05-14
permalink: /2026/05/14/one-inset-shadow-two-colors/
description: "How one inset box-shadow with a variable fallback paints a yellow square for html and a half-green disc for body, in the May 14, 2026 CSS Battle target."
target: /assets/targets/2026-05-14.png
target_url: https://cssbattle.dev/play/lbDC8Xg8NQaWWPfXAyID
colors: ["#1a4341", "#ebe77e", "#84be8d"]
player: emohdaziz
chars: 120
score: 727.45
match: 100
code: |
  <style>*{background:#1a4341;box-shadow:0 var(--a,5in#ebe77e)inset}&{margin:50 100;*{--a:97Q#84be8d;clip-path:circle(70px
---

The May 14 target shows a pale yellow square on a very dark green background, with a disc in its middle: light green on top, the background color at the bottom. Mohamed Ali paints it with one inset `box-shadow` given to every element. html uses the fallback of a variable: a yellow shadow moved 480px down, which fills its whole box. body sets the variable to a green shadow moved about 91.65px, which paints only its top band, then clips itself to a circle.

**Teaching colors** show html's box and body's background, which is the same dark green as the canvas. **Wide view** follows the moved copy of html's box down to y = 530.

{% include animations/2026-05-14.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                          /* html, head, style, body */
  background: #1a4341;                       /* html: the whole canvas; body: the dark half */
  box-shadow: 0 var(--a, 5in #ebe77e) inset; /* with no --a: 0 5in #ebe77e inset */
}
& {                                          /* at the top level: html */
  margin: 50 100;                            /* px in quirks mode: html is 200 × 200 */
  * {                                        /* & *: head, style, body */
    --a: 97Q #84be8d;                        /* body's shadow: 0 97Q #84be8d inset */
    clip-path: circle(70px                   /* a disc of radius 70; the end of the code closes the rest */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `50` in a margin is read in px.

The browser builds html, head and body around the code. The `<style>` goes into head. `*` matches html, head, style and body. head and style are not displayed.

At the top level, `&` matches the root of the page: html. The `*` nested inside it is `& *`: every element inside html, so head, style and body. The rules are never closed: the end of the code closes them, and the parenthesis of `circle(` too.

### 2. html, 200 × 200

`margin:50 100` gives html 50 on top and bottom, 100 on the left and right. In quirks mode, html fills the viewport minus its margins: 400 − 200 = 200 wide and 300 − 100 = 200 tall, at (100, 50).

html's background, `#1a4341`, paints the whole canvas, not only html's box.

### 3. An inset shadow moved out of its box

html sets no `--a`, so `var(--a,5in#ebe77e)` uses its fallback. html's shadow is `0 5in #ebe77e inset`.

An inset shadow paints inside the box. It covers the box, except where a copy of the box, moved by the offset, sits. Here the offset is 0 across and 5in down: 5 × 96 = 480px. The copy sits from y = 530 to 730, below html's box, which ends at y = 250. Nothing of the box is left uncovered, so the whole box turns yellow: a 200 × 200 square.

### 4. body and its green band

body keeps its default 8px margin. In quirks mode, body fills html minus that margin: 184 × 184 at (108, 58). Its center is (200, 150), the center of the canvas. Its background, `#1a4341`, comes from `*` and hides the yellow.

`var()` is worked out again for each element. body sets `--a:97Q#84be8d`, so its shadow is `0 97Q #84be8d inset`. 1Q is a quarter of a millimeter, about 0.945px: 97Q ≈ 91.65px. The copy of body's box moves down 91.65px, from y ≈ 149.65 to 333.65. Only the top band stays covered: green, from y = 58 to about 149.65. The rest of body shows its dark green background.

### 5. circle(70px)

`clip-path:circle(70px)` keeps a disc of radius 70. With no position, the disc is at the center of body's box: (200, 150). It runs from x = 130 to 270 and from y = 80 to 220.

Inside the disc, body shows its green band above y ≈ 150 and its dark green background below. Outside the disc, body is not painted, and html's yellow shows again. The bottom half of the disc is body's own background, the same color as the canvas.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `box-shadow` for two colors. html takes the fallback of the variable, and body only sets the variable. With a second `box-shadow` instead, `*{background:#1a4341;box-shadow:0 5in#ebe77e inset}&{margin:50 100;*{box-shadow:0 97Q#84be8d inset;clip-path:circle(70px` (127 characters), the picture is the same.
- `&` at the top level matches html in 1 character. With `html{` (123 characters), the picture is the same.
- `97Q` writes about 91.65px in 3 characters. `box-shadow` does not take bare numbers, even in quirks mode: with `--a:92#84be8d` (119 characters), my Chrome drops body's shadow, the whole disc is dark green, and 7,777 pixels change. `92px` takes 4 characters.
- `5in` writes 480px in 3 characters. Any offset of at least 200 fills html's box: with `200px` (122 characters), the picture is the same. With `2in`, 192px (120 characters), an 8px dark band stays at the bottom of the square, from y = 242 to 250, and 1,600 pixels change.
- The default margin of body does the centering for free. html is 200 × 200 at (100, 50), body sits 8px inside it, so its center, where the circle goes by default, is (200, 150).
- Bare numbers in the margin, thanks to quirks mode. With `margin:50px 100px` (124 characters), the picture is the same.
- No space where a token ends on its own: before each `#` and between `)` and `inset`. With spaces in those three places (123 characters), the picture is the same.
- The code ends inside `circle(`, and the end of the code closes it and both open rules. With `)}}` at the end (123 characters), the picture is the same.

## If you try it at home

In my Chrome, the official code does not quite give the target. body's shadow ends at y = 58 + 91.65 = 149.65, and row 149 of the disc comes out as a mix, about three quarters green. In the target, that row is fully green. With `92px` in place of `97Q`, the shadow ends at y = 150, and row 149 comes out fully green, like the target. The soft edge of the circle is also shaded a little differently from the target: 393 more pixels are more than 8 off in one channel. The CSS Battle judge gives the official code a 100% match.
