---
title: "A reflection: two bars and two squares in 140 characters"
lang: en
ref: 2026-09-06
permalink: /2026/09/06/a-reflection/
description: "How one left border, a big font and -webkit-box-reflect draw the September 6, 2026 CSS Battle target: two purple bars between two tilted squares."
target: /assets/targets/2026-09-06.png
target_url: https://cssbattle.dev/play/WfbQAGPzXCTFkJjKBxhZ
colors: ["#ffffff", "#6d57c4"]
player: h_blierzt
chars: 140
score: 705.33
match: 100
code: |
  <style>*{-webkit-box-reflect:left -5lh;margin:105 155;border-left:solid 2.2em#6D57C4;border-radius:11q;*{margin:0 85;rotate:15deg;font:257%a
---

The September 6 target is purple on white: two short bars side by side in the middle, and a tilted square on each side, the two squares turned opposite ways. H_Bliertz's solution only draws half of it. `html` is a left border: one bar. The `body`, with a big font, is a square border, turned by 15°: the right square. Then `-webkit-box-reflect` adds a mirror image of `html` with everything in it: the second bar and the left square.

Use **Teaching colors** to see the reflection in a lighter purple.

{% include animations/2026-09-06.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html, then the body */
  -webkit-box-reflect: left -5lh;    /* a mirror copy on the left */
  margin: 105 155;
  border-left: solid 2.2em #6D57C4;
  border-radius: 11q;                /* 10.4px */
  * {                                /* the body */
    margin: 0 85;
    rotate: 15deg;
    font: 257% a;                    /* 41.12px: 2.2em = 90px */
  }
}
```

## How it works

### 1. html: a bar

`*` gives `html` `margin:105 155`: 400 − 310 = 90 wide, from x = 155 to 245, and in quirks mode 300 − 210 = 90 tall, from y = 105 to 195. It has no background, only `border-left:solid 2.2em#6D57C4`: 2.2 × 16 = 35.2px, which Chrome rounds down to 35. `border-radius:11q` (10.4px) rounds the box's corners; only the left ones touch the border. That is a purple bar from x = 155 to 190, rounded on the left.

### 2. The body: a turned square

The nested `*` matches the `body`. `font:257%a` gives it a font of 2.57 × 16 = 41.12px (the family `a` does not exist, it is only there to make the shorthand valid). Its `2.2em` border is now 90.46px, rounded down to 90.

`margin:0 85` leaves no room for its content: `html`'s content is only 55 wide. So the `body` is 0 wide plus its 90px left border: a 90 × 90 square, as tall as `html`, from x = 190 + 85 = 275 to 365. It has the same 10.4px round corners, and `rotate:15deg` turns it around its centre: the right square.

### 3. The reflection doubles everything

`-webkit-box-reflect:left -5lh` draws a mirror image of the element on its left side. The image is flipped left to right, and placed at a distance of −5lh from the box: `lh` is the line height, 18px here, so −90. A gap of −90 on a 90 wide box puts the mirror image exactly on top of `html`, flipped around its centre line, x = 200.

The reflection includes everything `html` paints, the `body` too. The bar comes back on the right of that line, from x = 210 to 245, rounded on the right. The square comes back from x = 35 to 125, turned −15°: the left square.

The `body` has its own reflection too, but its line height is bigger (41.12px font), so its −5lh gap is over 230px: that copy lands off the canvas, and so does its mirror in `html`'s reflection.

## Golf notes

- `-webkit-box-reflect` doubles the whole drawing, children included: half of the target is enough.
- A negative gap equal to the box width makes the reflection mirror the box around its own centre.
- One border rule gives a 35px bar on `html` and a 90px square on the `body`: `em` follows the font.
- `margin:0 85` leaves the `body` no content width, so its border alone is the square.
- `font:257%a` is the shortest way to set a bigger font: the shorthand needs a family, and `a` is one letter.
- No closing braces, and `<style>` is never closed.
