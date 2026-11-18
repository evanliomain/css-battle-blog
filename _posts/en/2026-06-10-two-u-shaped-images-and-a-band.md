---
title: "Two U-shaped images and a band on top: four yellow pieces in 172 characters"
ref: 2026-06-10
permalink: /2026/06/10/two-u-shaped-images-and-a-band/
description: "How two empty images become yellow U shapes, how one of them is flipped, how a clip-path rounds their tops, and how a paragraph lays a dark band over both, in the June 10, 2026 CSS Battle target."
target: /assets/targets/2026-06-10.png
target_url: https://cssbattle.dev/play/UyIHaMHngnvBrD7ecqUs
colors: ["#4c4c6b", "#fae29e"]
player: selenit
chars: 172
score: 677.64
match: 100
code: |
  <img><img><p><style>*{background:#4C4C6B;height:30}img{+*{scale:-1}border:solid#FAE29E;border-width:0 55 40;padding:65 15;margin:42 8-34%32;clip-path:inset(0 0-50%round 1in
---

The June 10 target shows four pale yellow pieces on a dark violet background: a split dome, a block with a notch, a rectangle with a notch and a split half disc. Ilya Streltsyn draws them with two empty images and a paragraph. Each image is a yellow U made of borders, with a dome cut by a clip-path. The second image is flipped. The paragraph is a dark band that cuts both images in two.

Use **Teaching colors** to tell the two images, their own background and the band apart, and **Wide view** to see how far the clip-path goes.

{% include animations/2026-06-10.html lang=page.lang %}

## The code, spaced out

```css
<img><img><p><style>
* {                                  /* html, head, body, img, img, p, style */
  background: #4C4C6B;               /* html's goes to the whole canvas */
  height: 30;                        /* img content and p: 30px tall */
}
img {
  + * {                              /* img + *: the 2nd img and the p */
    scale: -1;                       /* half turn */
  }
  border: solid#FAE29E;
  border-width: 0 55 40;             /* no top, 55 on the sides, 40 at the bottom */
  padding: 65 15;                    /* width 0: 140 × 200 in all */
  margin: 42 8-34%32;                /* 42, 8, −34% (−130.55), 32 */
  clip-path: inset(0 0-50%round 1in  /* 100px lower, corners 96 → 70 */
```

## How it works

### 1. The elements

CSS Battle pages have no doctype, so they are in quirks mode, and a bare number like `55` is read in px.

`<img><img><p>` puts two images and a paragraph in body. `<style>` comes while the p is still open, so it ends up inside it. head and style are not displayed.

`*` gives all of them the same dark background and `height:30`. html is only 400 × 30, but html's background is used for the whole canvas. That is the dark violet. body keeps its 8px margin: it is 384 × 30 at (8, 8).

### 2. A U made of borders

An img with no src has no size of its own. With `height:30`, Chrome gives it a width of 0: `getComputedStyle` says `0px`. So its box is only borders and padding:

- width: 55 + 15 + 0 + 15 + 55 = 140;
- height: 0 + 65 + 30 + 65 + 40 = 200.

The border is yellow, with no top side. It draws a U: two 55px bars and a 40px bar at the bottom. Between the bars, the 30px of padding and content show the image's own background, the same dark color as the canvas. That is the gap in every piece.

### 3. Two images on one line

The images are inline, side by side on one line. `margin:42 8-34%32` reads as four values: 42 at the top, 8 on the right, −34% at the bottom, 32 on the left. The minus sign starts a new number, and so does the digit after `%`.

- The first image starts at x = 8 + 32 = 40, y = 8 + 42 = 50.
- The second one comes after the first one's right margin and its own left margin: 40 + 140 + 8 + 32 = 220.

Both boxes are 140 × 200, at (40, 50) and (220, 50).

A margin in % is a share of the parent's width, even at the bottom. body is 384px wide, so the bottom margin is −130.55px. The line ends where the images' margin boxes end: 50 + 200 − 130.55 = 119.45.

### 4. The flip

`+*` inside `img` means `img + *`: an element right after an img. That is the second image, and the p.

`scale:-1` multiplies both axes by −1: a half turn around the center of the box. The second image turns around (290, 150). Its 40px bar goes to the top, and its gap now opens downward.

### 5. The domes

`clip-path:inset(0 0-50%round 1in)` keeps only what is inside a rounded rectangle. Three values: 0 at the top, 0 on both sides, −50% at the bottom. −50% of the 200px height is −100: the rectangle goes 100px below the box. It is 140 × 300.

`round 1in` asks for 96px corners. Two of them side by side need 192px, and the box is only 140 wide. So Chrome scales all the corners down by the same factor, to 70: two corners make a half circle. The top of the image becomes a dome, centered on (110, 120). The bottom corners are 100px below the box, where the image draws nothing, so the bottom stays square.

The clip-path is applied before the flip. On the second image, the dome ends up at the bottom.

### 6. The band

The p is a block. It comes after the line of images, at 119.45, plus its default top margin of 16px: it starts at y = 135.45. It is 384 × 30, so it covers the images from y = 135.45 to 165.45. That cuts the first image into the dome and the notched block, and the second one into the notched rectangle and the half disc.

The p also got `scale:-1`. A half turn of a plain rectangle changes nothing you can see. But a p with a transform is painted after the normal flow, in document order, so it comes over both images. Without it, a plain block's background is painted under the images. I checked: with `+img` in place of `+*`, the band disappears. With `+img` and `p{position:relative}`, which also moves the p to that later painting step, the band comes back.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `*` rule does four jobs: the canvas color, the dark gap inside each image, the dark band, and the 30px of height for both the images and the p.
- An img with no src is 0 wide, so its size is set by its borders and padding alone, with no `width`.
- `+*` reaches the second image and the p with one selector, and the p needs its scale to be painted on top. With `+img` (174 characters), the band disappears: 6,600 pixels change. Without the p at all (169 characters), the same 6,600 pixels change.
- The p's default 16px margin places the band for free, right under the line.
- `-34%` lets the next number follow with no space. `margin:42 8-131 32` gives the same picture in 173 characters.
- The same trick works in the clip-path: `-50%round` needs no space. `-1in round` gives the same picture in 173 characters. Without the space, `-1inround` (172 characters) reads as one unknown unit, the whole clip-path is dropped, and the corners stay square: 4,365 pixels change.
- Any radius of 70px or more gives the same half circle. `1in` is 3 characters. `round 70px` gives the same picture in 173.
- The −50% bottom keeps the lower corners out of the box. With `inset(0 round 1in` (167 characters), the bottom of each image is rounded too: 4,370 pixels change.
- No space is needed in `solid#FAE29E`, `8-34%32` or `0 0-50%round`. `inset(0 0 -50% round 1in` gives the same picture in 174 characters.
- The closing tags, the brace of the `img` rule and the parenthesis of `inset(` are left out. The end of the code closes them.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 343 pixels, with the same rule as in the golf notes, by up to 123. All of them are on the two curved edges: 179 around the dome in the top left, 164 around the half disc in the bottom right. The straight edges and the flat colors are the same. The target has 34 different colors, my render 130. The CSS Battle judge gives the code a 100% match.
