---
title: "An empty font name: the letters Ai in 191 characters"
ref: 2026-05-26
permalink: /2026/05/26/an-empty-font-name/
description: "How one 5ch border, 40px on html and 20px on body and p once a lone quote gives them an 8px font, draws a rounded A, the stem of an i and, through the shadows of a p parked off the canvas, the two dark squares of the May 26, 2026 CSS Battle target."
target: /assets/targets/2026-05-26.png
target_url: https://cssbattle.dev/play/mI8Eqyn9sqk49KBAOOKn
colors: ["#f5e3b5", "#a84a4b", "#30383f"]
player: emohdaziz
chars: 191
score: 664.78
match: 100
code: |
  <p><style>*{border:5ch solid#f5e3b5;background:#a84a4b;margin:70 45%70 100}&{border-radius:2in 2in 0 0;border-bottom:0;*{margin:50%120 0;*{color:30383F;box-shadow:-35vw -5pc,-65vw 0}font:2vw"
---

The May 26 target shows the letters "Ai" in cream on a red-brown background. The A is an arch with two legs, and the i is a bar. Two dark squares make the bar of the A and the dot of the i. Mohamed Ali gives every element the same `border:5ch`. A ch follows the font: it is 40px on html, which draws the A, and 20px on body and p, whose font a lone `"` sets to 8px. body is the stem of the i, and p, parked off the canvas, throws the two squares as shadows.

With **Wide view**, you can see p at the right of the canvas. With **Teaching colors**, each element's border gets its own color.

{% include animations/2026-05-26.html lang=page.lang %}

## The code, spaced out

```css
<p>
<style>
* {                              /* html, body, p (head and style too) */
  border: 5ch solid#f5e3b5;      /* 40px on html, 20px on body and p */
  background: #a84a4b;           /* html's goes to the canvas */
  margin: 70 45%70 100;          /* html: 120 × 160 at (100, 70) */
}
& {                              /* html only */
  border-radius: 2in 2in 0 0;    /* 192px, drawn as 60px: the arch */
  border-bottom: 0;              /* the A is open at the bottom */
  * {                            /* body and p */
    margin: 50%120 0;            /* body: 20px top, at x = 260; p: 0 top, at x = 400 */
    * {                          /* p (and style) */
      color: 30383F;             /* the color of the shadows */
      box-shadow:
        -35vw -5pc,              /* 140px left, 80px up: the dot of the i */
        -65vw 0                  /* 260px left: the bar of the A */
    }
    font: 2vw"                   /* 8px, empty font name: 1ch = 4px */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `70` in a margin is read in px.

`<p>` opens the body and a p in it. The `<style>` goes inside p. So the page is html > body > p, plus head.

`*` matches every element. At the top level of a style sheet, `&` matches the root: html. The `*{` nested in it matches what is inside html: head, body, p and style. The next nested `*{` needs one more level: it matches only p and style. head and style are not displayed, so three boxes are left: html, body and p.

The `<style>` is never closed, and neither are the rules: the end of the code closes them.

### 2. html, the A

`margin:70 45%70 100` puts 70px at the top and the bottom, 45% of 400 = 180px on the right and 100px on the left. In quirks mode, html fills the page minus its margins: 400 − 100 − 180 = 120 wide and 300 − 70 − 70 = 160 tall, at (100, 70).

`background:#a84a4b` on the root is painted on the whole canvas: it is the red-brown background.

`border:5ch solid#f5e3b5` gives html a cream border. A ch is the width of the "0" in the element's font. html keeps the default font, 16px Times, where 1ch = 8px: 5ch = 40px. `border-bottom:0` removes the bottom side, so the A is open at the bottom. The legs go from x = 100 to 140 and from x = 180 to 220, down to y = 230.

### 3. The arch

`border-radius:2in 2in 0 0` asks for 192px on the two top corners. Together they would need 384px, and the box is 120px wide. So the browser scales every radius by 120 / 384 = 0.3125: 60px. The two corners make a half circle of radius 60, centered at (160, 130).

Inside, the border is 40px thick, so the inner corners have a radius of 60 − 40 = 20. The hole of the A is 40px wide, with a round top at y = 110. I checked: with `60px` instead of `2in`, the picture is the same.

### 4. An empty font name

`font:2vw"` sits in the `*{` nested in `&`, so body and p get it. 2vw is 8px. The `font` shorthand needs a font family. The lone `"` opens a string, and the end of the code closes it: the family is the empty name `""`. No font has that name, so the text falls back to the default font, at 8px.

That is all it takes for the border to change: on body and p, 1ch = 4px, and the same `5ch` is 20px.

### 5. body, the stem of the i

`margin:50%120 0` gives body 120px on each side, and 50% at the top. A percentage margin is measured on the width of the parent's content: html is 120 wide with two 40px borders, so 40px are left, and 50% is 20px.

body starts at x = 100 + 40 + 120 = 260. Its margins already take more than the 40px: its content width is 0, and with its two 20px borders it is 40px wide. In quirks mode, body also stretches down to the bottom of html: html's content is 160 − 40 = 120 tall, minus the 20px margin, 100. So body is a 40 × 100 cream bar at (260, 130), from y = 130 to 230, like the legs of the A.

body's content area is 0 wide, so its own background never shows: only its border does.

### 6. p, parked off the canvas

p gets the same margin. But its parent is body, whose content is 0 wide: 50% of 0 is 0 at the top. On the left, 120px: p starts at x = 260 + 20 + 120 = 400, the right edge of the canvas. It is a 40 × 40 square of border at (400, 150), never shown.

### 7. Two shadows

The innermost `*{` only matches p (and style, which is not displayed). `color:30383F` has no `#`, but in quirks mode it is still read as the color #30383F. A shadow with no color takes the current color.

`-35vw -5pc` is −140px and −80px: a copy of p at (260, 70), the dot of the i. `-65vw 0` is −260px: a copy at (140, 150), the bar of the A, which fills the hole between the legs. p is painted after html and body, so its shadows are on top.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `border:5ch` for three boxes. Because a ch follows the font, the same declaration gives 40px on html and 20px on body and p.
- The lone `"` in `font:2vw"` is what makes the font apply. Without it (190 characters), the `font` declaration has no family and is dropped. body and p keep the 16px font and get 40px borders: the i is 80 wide, the squares are 80 × 80, and html stretches down to y = 290. 25,600 pixels change.
- `50%` in `margin:50%120 0` gives 20px on body and 0 on p. `margin:20 120 0` has the same length, but p moves 20px down, and so do both squares: 3,200 pixels change.
- `color:30383F` drops the `#`. With `color:#30383F`, the same picture takes 192 characters. Writing the color in each shadow instead, with no `color`, also takes 192.
- `<p>` is the element that carries the shadows. Without it (188 characters), the `<style>` lands in head, there is no p, and the two squares are gone: 3,200 pixels change.
- Short units: `2in` is 192px, `-35vw` is −140px, `-5pc` is −80px and `-65vw` is −260px. With `60px` corners, it is the same picture in 193 characters. With px shadows, 194. A bare `60` does not work: border-radius takes no unitless lengths, even in quirks mode. With `60 60 0 0` (189 characters), the corners stay square: 1,833 pixels change.
- `45%` is 180px, and no space is needed after a `%`: `70 180 70 100` gives the same picture in 192 characters.
- No space before the `#`: `solid #f5e3b5` gives the same picture in 192 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 218 pixels, with the same rule as in the golf notes, by up to 101. All of them are on the arch: 161 on its outer edge and 57 on the edge of the hole, between y = 70 and 129. The flat colors match exactly. The CSS Battle judge gives the code a 100% match.
