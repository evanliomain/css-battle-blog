---
title: "A ring on html, bars on body and p: a crosshair in 133 characters"
ref: 2026-06-17
permalink: /2026/06/17/ring-on-html-bars-on-body-and-p/
description: "How one radial-gradient sized in em draws a red ring on html's canvas and two white bars with red ends on body and p, and how a single rotate:90deg, added up from parent to child, stands p upright to finish the cross, in the June 17, 2026 CSS Battle target."
target: /assets/targets/2026-06-17.png
target_url: https://cssbattle.dev/play/gWRvIYqOilEJ5qzQONIM
colors: ["#fff", "#e8ad6d", "#a84a4b"]
player: selenit
chars: 133
score: 712.6
match: 100
code: |
  <p> <style>*{+*{font:77q/41%a;margin:135 70}rotate:90deg;background:radial-gradient(2em,#fff 62%,#E8AD6D 0 95q,#A84A4B 0 344%,#E8AD6D
---

The June 17 target is a crosshair on a pale orange background: a brick red ring with four small red tenons sticking out of it, left, right, top and bottom, and a white cross inside. Ilya Streltsyn gives every element the same background, a radial gradient whose radius is `2em`. On html, with a 16px font, it draws the ring. On body and p, with a 72.76px font, the same gradient draws white bars with red ends. One `rotate:90deg` on every element does the rest: the turns add up, body lies flat and p stands up.

Use **Teaching colors** to tell body from p, and **Wide view** to see html's box turn.

{% include animations/2026-06-17.html lang=page.lang %}

## The code, spaced out

```css
<p>&nbsp;<style>               /* after <p>: a no-break space (U+00A0) */
* {                       /* html, head, body, p, style */
  + * {                   /* * + *: body only, it follows head */
    font: 77q/41% a;      /* 72.76px, line height 29.83px */
    margin: 135 70;       /* px in quirks mode: 260 × 30 at (70, 135) */
  }
  rotate: 90deg;          /* html 90°, body 180°, p 270° */
  background: radial-gradient(
    2em,                  /* html: 32px; body and p: 145.51px */
    #fff 62%,             /* html: 19.84px; body and p: 90.22px */
    #E8AD6D 0 95q,        /* up to 89.76px: empty in body and p */
    #A84A4B 0 344%,       /* html: 110.08px; body and p: 500.56px */
    #E8AD6D
```

## How it works

### 1. Five elements, one rule

The page starts with `<p>`. The browser adds html, head and body around it, and the style element ends up inside p. So `*` selects five elements: html, head, body, p and style. head and style are hidden. html, body and p are left.

They all get the same `rotate` and the same `background`.

### 2. One gradient, sized in em

`radial-gradient(2em, …)` has a single length: it is a circle of that radius, centered in the box. The stops in % are a share of that radius, so they grow with the font size. `95q` is a fixed length: 95 quarter millimeters, 89.76px.

The color stops with two positions, like `#E8AD6D 0 95q`, start at 0. A stop cannot go back before the previous one, so 0 means "right where the previous color ends". Every edge is sharp.

### 3. html: the ring

html's font is 16px, so `2em` is 32px. The stops are: white up to 62% × 32 = 19.84px, orange up to 89.76px, red up to 344% × 32 = 110.08px, then orange. html is the root: its background goes to the whole canvas, centered on (200, 150).

That is the red ring, 20.32px thick, and a small white disc in the middle. The disc never shows in the end: the cross covers it.

### 4. body: a white bar with red ends

The nested `+*` means `* + *`: an element right after another element. body follows head, and it is the only one: html, head and p are first children, and style comes after text, not after an element.

body's margin `135 70` has no unit. CSS Battle pages have no doctype, so they are in quirks mode, and there a unitless margin is read in px. body is 400 − 2 × 70 = 260px wide. In quirks mode it also fills the height of html: 300 − 2 × 135 = 30px. I measured it at (70, 135).

Its font is `77q`, 72.76px. So `2em` is 145.51px, and the % stops grow: 62% is 90.22px. That is more than `95q`, 89.76px, so the orange stop has no width left. body's gradient is white up to 90.22px from its center, then red up to 500.56px, far past its ends. A white bar with two red ends.

### 5. p: the same bar, on top

p is inside body, and it holds a no-break space. That space does not collapse, so p has one line. p inherits body's font, with a line height of 41% × 72.76 = 29.83px. So p is 260 × 29.83. Its default margins collapse into body's, and I measured it at the top of body, at (70, 135) before any turn.

It has the same 145.51px gradient: a second white bar with red ends, on top of the first.

### 6. The turns add up

Each element turns around its own center, inside its turned parent.

- html turns 90° around (200, 150). Its 400 × 300 box stands 300 × 400, from (50, −50). The circles of the canvas have the same center: nothing changes on screen.
- body has the same center as html. Its own 90°, inside html's 90°, makes 180°: it lies flat again, in the same place.
- p adds its own 90° to body's 180°: 270°. It stands up. I measured it from (185.09, 20.09) to (214.91, 280.09).

### 7. The crosshair

body makes the horizontal arm and p the vertical arm. In both, the white stops 90.22px from the center, just past the inner edge of the ring at 89.76px: the arms end in curves that follow the ring.

Past 90.22px, the bars are red. Under the ring, red on red, nothing shows. Outside the ring, the red ends stick out: the four tenons, about 20px long.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `rotate` makes three different turns: 90° for html, 180° for body, 270° for p. Without `rotate:90deg;` (120 characters), p lies on body: the vertical arm and its two tenons disappear, html's white disc shows in the middle, and 5,742 pixels change.
- One background does two jobs. In `2em` units, it is a ring on html and a bar on body and p. The last `#E8AD6D` brings the orange back past the ring: without it (125 characters), the red goes on to the edges of the canvas, and 79,514 pixels change.
- The character after `<p>` is a no-break space. With a plain space, also 133 characters, the space collapses, p is 0px tall, and the picture is the same as without the `rotate`: 5,742 pixels change.
- The line height `41%` makes p 29.83px tall, close to body's 30px. Without `/41%` (130 characters), p takes the normal line height of the fallback font, 84px, body grows to 84px to hold it, both bars get 84px thick, and 32,382 pixels change.
- The `font` shorthand sets the size and the line height at once. It needs a family: `a`, one letter, a font that does not exist, with no space after the `%`. `font-size:77q;line-height:41%` gives the same picture in 149 characters.
- `+*` reaches body in two characters. With `body{` in its place, the picture is the same, in 135 characters.
- The margin has no unit, which works in quirks mode. `margin:135px 70px` gives the same picture in 137 characters.
- Nothing is closed. `)}` at the end gives the same picture in 135 characters.

## If you try it at home

In my local Chrome, the official code is very close to the target but not identical: 948 pixels differ by more than 8 on a channel, by up to 181. 382 of them are on the four straight edges of the vertical arm, where my render has light half-tones and the target has none. The other 566 are on the circles about 90px and 110px from the center, the edges of the ring and the round ends of the arms: my render draws these circles with hard steps, and the target has in-between colors there. My render has 15 different colors, the target 54. The CSS Battle judge gives the code a 100% match.
