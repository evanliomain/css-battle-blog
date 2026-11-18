---
title: "A height read from an attribute: four figures in 122 characters"
ref: 2026-06-03
permalink: /2026/06/03/a-height-read-from-an-attribute/
description: "How four empty links, two box-shadows each and one attr() with a fallback draw four squares with a small square above or below, in the June 3, 2026 CSS Battle target."
target: /assets/targets/2026-06-03.png
target_url: https://cssbattle.dev/play/17Bc6kIuAsiQgqP65moB
colors: ["#d6c95c", "#2f5a76"]
player: cubachatou
chars: 122
score: 725.05
match: 100
code: |
  <a r=87><a><a r=87><a><style>&{background:#CB3C;color:2F5A76;a{margin:45;box-shadow:3vw 150q 0 37q,3vw attr(r q,214q)0 5vh
---

The June 3 target shows four dark blue squares in a row on mustard yellow. Each one has a small square of its own: above, below, above, below. Vegy draws it with four empty a elements. Each a is a point with two box-shadows: a big square and a small one. The small square's height comes from `attr()`: the a with `r=87` put it above, and the others fall back to `214q` and put it below.

Use **Teaching colors** to tell the two shadows apart, and the two kinds of small square.

{% include animations/2026-06-03.html lang=page.lang %}

## The code, spaced out

```css
<a r=87><a><a r=87><a>
<style>
& {                           /* html */
  background: #CB3C;          /* rgba(204, 187, 51, 0.8): #d6c95c over white */
  color: 2F5A76;              /* no #: quirks mode */
  a {                         /* & a: the four empty a, 0 × 0 each */
    margin: 45;               /* 45px left and right: x = 53, 143, 233, 323 */
    box-shadow:
      3vw 150q 0 37q,         /* 12px right, 141.7px down, spread 35px */
      3vw attr(r q,214q)0 5vh /* 87q = 82.2px or 214q = 202.2px down, spread 15px */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `45` is read in px, and a color can skip its `#` in `color`.

An a can't sit inside another a. When the parser meets `<a>` while an a is open, it closes the open one first. So the four `<a>` give four sibling a elements in body. The style element comes after them, in body too.

At the top level, `&` stands for the root: html. The nested `a{` means `& a`: the four a.

### 2. A translucent background

`#CB3C` is a hex color with 4 digits: the fourth one is the alpha. It reads as rgba(204, 187, 51, 0.8). html's background is painted on the whole canvas, over white. The 20% left shows the white, so the color you see is #d6c95c. I checked: `#d6c95c` instead of `#CB3C` gives the same picture.

### 3. Four points

The a elements are empty. I measured each one: 0 × 0, at y = 8, the top of body.

`margin:45` is 45px on all four sides. An a is an inline element: its top and bottom margins don't move it, only the left and right ones do. The first a starts after body's 8px margin and its own 45px: x = 53. Each next one is 45 + 45 = 90px further: x = 143, 233 and 323.

### 4. The first shadow

`3vw 150q 0 37q` is a shadow with an offset of 3vw = 12px right and 150q = 141.7px down, a blur of 0, and a spread of 37q = 35.0px. The blur has to be written: the spread is the fourth length.

A shadow starts as a copy of the box. Here the box is a point. The spread grows it by 35px on every side: a square of 2 × 34.96 = 69.9px. The first one goes from x = 30.0 to 100.0 and from y = 114.8 to 184.7. The others are 90px apart.

The shadow has no color of its own, so it takes the text color. `color:2F5A76` gives #2f5a76 to html, and the a inherit it.

### 5. A length read from an attribute

The second shadow is `3vw attr(r q,214q)0 5vh`. `attr(r q)` reads the r attribute. The `q` says how: the value is a number, and `q` is its unit. The first and third a have `r=87`, so the offset is 87q = 82.2px down.

The spread `5vh` is 15px: a 30px square. With the same 12px offset, it goes from x = 50 to 80, above the big square: from y = 75.2 to 105.2.

### 6. The fallback

The second and fourth a have no r attribute. `attr()` has nothing to read, so it uses its fallback, `214q` = 202.2px. Their small square goes below the big one, from y = 195.2 to 225.2.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- Empty elements are enough. An empty a is a 0 × 0 point, so a shadow with no blur is a square twice as wide as its spread. No width or height is written.
- `<a>` needs no closing tag: the next `<a>` closes it. With `</a>` after each one, the picture is the same in 138 characters.
- `attr(r q,214q)` gives both heights in one declaration. With an r on all four a (`<a r=214>` for the second and fourth, and `attr(r q)`), the picture is the same in 129 characters. With `<a r>`, `214q` in place of `attr(r q,214q)`, and a second rule that repeats the whole shadow, `}[r]{box-shadow:3vw 150q 0 37q,3vw 87q 0 5vh`, it is the same in 151 characters.
- The fallback matters. Without `,214q` (117 characters), the second and fourth a lose their whole box-shadow, big square included: 11,800 pixels change.
- The color is written once: both shadows take the text color. `#2F5A76` at the end of each shadow instead of `color:2F5A76;` gives the same picture in 123 characters. The missing `#` is a quirk of `color`, and box-shadow doesn't accept it: with `2F5A76` in each shadow (123 characters), the declaration is dropped and no square is drawn. 23,600 pixels change.
- `#CB3C` is 5 characters. The color it shows, `#d6c95c`, gives the same picture in 124 characters.
- `margin:45` is one bare number for the four sides, and only left and right matter. `margin:0 45px` gives the same picture in 126 characters.
- Short units: `3vw` is 12px in 3 characters. `12px` twice gives the same picture in 124 characters. `150q` is 141.7px in 4 characters: `141.7px` gives the same picture in 125. `37q` is 34.96px in 3 characters: `35px` (123 characters) changes 16 pixels.
- No space after the `)` of `attr()`: `) 0` gives the same picture in 123 characters.
- `&` is html in 1 character. `html{` instead of `&{` gives the same picture in 125 characters.
- The code stops after `5vh`. The end of the code closes the rules and the style element. Adding `}}` gives the same picture in 124 characters.
- Upper case costs nothing: `#cb3c` and `2f5a76` give the same picture at the same length.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 800 pixels, with the rule of the golf notes. They all lie on six rows, along the top and bottom edges of the squares: y = 114 and 184 for the big squares, y = 75, 105, 195 and 225 for the small ones.

In my render, those edges fall between two rows of pixels: the big squares go from y = 114.8 to 184.7, so rows 114 and 184 get a mix of blue and yellow. In the target, these edges are sharp. I checked: the same squares moved to whole pixels, with `<a r=82><a><a r=82><a><style>&{background:#CB3C;color:2F5A76;a{margin:45;box-shadow:3vw 142px 0 35px,3vw attr(r px,202px)0 5vh`, match the target with no changed pixel.

The background is also 1 off on each channel: #d6c95c in my render, #d5ca5b in the target.

The CSS Battle judge gives the code a 100% match.
