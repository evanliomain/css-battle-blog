---
title: "Empty links, stretched by scale: three mountains in 141 characters"
ref: 2026-07-14
permalink: /2026/07/14/empty-links-stretched-by-scale/
description: "How three empty inline links show only their bottom border, step back 84px each with the margins 59 and -263, and turn into three 178.8 × 180 peaks when body gets scale:1.49 3, over html's own turquoise border, in the July 14, 2026 CSS Battle target."
target: /assets/targets/2026-07-14.png
target_url: https://cssbattle.dev/play/W9znsYJVH3cpo114b3YG
colors: ["#e0d59d", "#5483a9", "#78c3c7"]
player: kieron
chars: 141
score: 704.33
match: 100
code: |
  <a><a><a><style>&{background:#e0d59d}&,a{margin:55%99;border:64Q solid#4bda;*{scale:1.49 3;border-color:#0000#0000#5483a9;margin:-91-263 0 59
---

The July 14 target shows three steel blue peaks on a sand background, side by side at the bottom of the canvas. A turquoise band shows between them. Kieron draws the peaks with three empty `<a>` tags: each one only shows its bottom border, a triangle. A nested rule gives body a `scale` that stretches the three triangles into tall peaks. The turquoise band is html's own border.

Use **Wide view** to see body and the links outside the canvas, and **Teaching colors** to tell the three links apart.

{% include animations/2026-07-14.html lang=page.lang %}

## The code, spaced out

```css
<a><a><a><style>
& {                                  /* & at the top level is html */
  background: #e0d59d
}
&, a {                               /* html and the three links */
  margin: 55%99;                     /* 220px 99px for html */
  border: 64Q solid#4bda;            /* 64Q = 60.47px, drawn as 60px */
  * {                                /* any element inside html or an a: body, the links */
    scale: 1.49 3;                   /* works on body only */
    border-color: #0000#0000#5483a9; /* only the bottom border shows */
    margin: -91-263 0 59             /* -91, -263, 0, 59 */
```

## How it works

### 1. html and the canvas

There is no doctype: the page is in quirks mode. At the top level of the CSS, `&` means the root: html. html's background fills the whole canvas with sand.

### 2. The turquoise band is html

`&,a` selects html and the three links. For html, `margin:55%99` reads as two values: 55% and 99. A percentage margin, even at the top, is a share of the width: 55% of 400 is 220px. html starts at y = 220, with 99px on each side.

`64Q` is 64 quarter millimeters: 60.47px. Chrome draws the border 60px wide. html is 400 − 198 = 202px wide, and its content 202 − 120 = 82px. The canvas has no height left for it: its content is 0 tall, and the whole box, 202 × 120 at (99, 220), is border. Its lower 40px are off canvas.

`#4bda` is a turquoise, `#44bbdd`, at two thirds opacity. Over the sand it shows as #78c3c7.

### 3. One nested rule for body and the links

The `*` rule is nested in `&,a`, with no `&` of its own. It selects any element inside html or inside an a: head, body, the three links and the style element, which ends up inside the last link. Only body and the links are displayed.

For the links, two rules set a margin: `&,a` and the nested one. In my Chrome, the nested rule weighs the same as `a`: a plain `a{margin:0}` added after it (153 characters) takes the margins back, and 28,559 pixels change. It comes after the `&,a` declarations, so it wins: the links get `-91-263 0 59`.

### 4. body: 286 × 91

`margin:-91-263 0 59` reads as -91, -263, 0 and 59: top, right, bottom, left. body sits in html's 82px content box. With 59 on the left and −263 on the right, it is 82 − 59 + 263 = 286px wide, from x = 159 + 59 = 218.

In quirks mode, body stretches to fill the height of html's content, minus its own margins. That height is 0 here, so body is 0 + 91 = 91px tall. With −91 on top, it goes from y = 189 to 280. With `-50` instead, body is 50px tall: getBoundingClientRect confirms both.

### 5. Three triangles, from right to left

`<a>` is an inline element. Empty, it is a text box 0 wide and 18 tall, at the top of body: y = 189 to 207. `&,a` gives each link the 60px border: 120 × 138.

`border-color:#0000#0000#5483a9` gives three colors: top, left and right, bottom. `#0000` is transparent. Only the bottom border shows. The text box has no width, so this border is a triangle: apex at the bottom of the text box (y = 207), base 120px wide at y = 267.

An inline box ignores top and bottom margins, but not side ones. Each link takes 59 + 120 − 263 = −84px on its line: the next one starts 84px to the left. The first link is at x = 277, the second at 193, the third at 109. The three triangles overlap.

### 6. scale stretches body

`scale:1.49 3` also reaches the links, but an inline box cannot be transformed: their own scale does nothing. It works on body, around its center: (218 + 143, 189 + 45.5) = (361, 234.5). The links move with body.

Each triangle grows from 120 × 60 to 178.8 × 180. The apex goes from y = 207 to 234.5 − 27.5 × 3 = 152. The base goes from 267 to 332, off canvas. The peaks land at x = 74.92, 200.08 and 325.24, 125.16px apart. Two neighbors cross at y = 278: between them, html's turquoise border shows.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `&,a` rule gives the 60px border to html and to the links: html's border is the turquoise band, and the links' bottom borders are the peaks.
- One nested `*` rule serves body and the links. body uses the margin and the scale. The links use the border color and the side margins, and ignore the rest. With `a` in place of `*` (same length), body keeps its default 8px margins and no scale: the triangles end up below the canvas, and html's content box shows as a sand notch in the turquoise. 32,556 pixels change.
- Without `scale` (128 characters), the triangles stay 120 × 60, between y = 207 and 267. 27,970 pixels change. `transform:scale(1.49,3)` gives the same picture in 152 characters.
- The −91 sets body's height and its center. With `-50` (same length), body is 50px tall, the peaks move down, and 26,242 pixels change.
- `64Q` is 60px in 3 characters. `60px` gives the same picture in 142. A bare `60` (140 characters) does not work inside the `border` shorthand in my Chrome: the whole declaration is dropped, and the canvas stays plain sand. 35,808 pixels change.
- `55%99`: the `%` ends the first number, so no space is needed. `220 99` gives the same picture in 142 characters.
- `#4bda` is 5 characters. The opaque color the target shows, `#78c3c7`, gives the same picture in 143.
- `#0000` is transparent in 5 characters, and each `#` starts a new color without a space. `transparent transparent` takes 154 characters, for the same picture.
- `-91-263 0 59`: the minus signs separate the numbers. `-91px -263px 0 59px` takes 148 characters.
- `&` is html at the top level of the CSS. `html` in both places takes 147 characters, for the same picture.
- Nothing is closed. Closing both rules and the style element with `}}</style>` takes 151 characters, 10 more, for the same picture.

## If you try it at home

In my local Chrome, the official code is close but not pixel-exact. The turquoise band and the width of the peaks match the target. The peaks sit about 3px lower than in the target: the valleys bottom out at y = 278 in my render, 274 in the target. 1,522 pixels are more than 8 off the target in one channel, up to 140, all along the slanted edges.

Where the peaks sit depends on the links' 18px text box: 1px less moves them up 3px, because of the vertical scale of 3. When I add `font-size:15px` to the nested rule, the text box is 17px tall in my Chrome, and the triangles land where the target has them: 891 pixels remain off, all on the edges, where the target's anti-aliasing differs. The CSS Battle judge gives the code a 100% match.
