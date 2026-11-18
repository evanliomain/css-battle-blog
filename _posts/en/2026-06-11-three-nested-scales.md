---
title: "Three nested scales: a barcode in 149 characters"
ref: 2026-06-11
permalink: /2026/06/11/three-nested-scales/
description: "How one rule gives html, body and an h3 the same side borders, how three nested scales turn them into bars and columns, and how quirks mode gives all three the same height, in the June 11, 2026 CSS Battle target."
target: /assets/targets/2026-06-11.png
target_url: https://cssbattle.dev/play/dzlLXaBViRAZUK7t6jye
colors: ["#55c085", "#333", "#fff"]
player: emohdaziz
chars: 149
score: 696.67
match: 100
code: |
  <h3> <style>*{border-inline:var(--y,11Q dashed#333);margin:95 181;scale:10 1;+*{scale:.2 5;background:#55c085;margin:44-6;*{--y:3Q solid#fff;margin:1
---

The June 11 target looks like a barcode on a green background: four dark bars on the left, four on the right, and in the middle two white columns around two dark ones. Mohamed Ali draws it with only the left and right borders of three nested elements: html, body and an h3. One rule gives them all the same border, margin and `scale:10 1`. The scales add up from parent to child, so each pair of borders comes out at its own width.

Use **Teaching colors** to tell the three elements' borders apart.

{% include animations/2026-06-11.html lang=page.lang %}

## The code, spaced out

```css
<h3>&nbsp;<style>                          /* after <h3>: a no-break space (U+00A0) */
* {                                        /* html, head, body, h3, style */
  border-inline: var(--y, 11Q dashed#333); /* 10px dashed, unless --y is set */
  margin: 95 181;                          /* html: 38 × 110 at (181, 95) */
  scale: 10 1;                             /* 10 times wider */
  + * {                                    /* * + *: body only, it follows head */
    scale: .2 5;                           /* with html's: 2 × 5 */
    background: #55c085;                   /* goes to the whole canvas */
    margin: 44-6;                          /* 44 and −6: 30 × 22 */
    * {                                    /* h3 (and style, hidden) */
      --y: 3Q solid#fff;                   /* 2px white border */
      margin: 1                            /* 8px wide */
```

## How it works

### 1. The elements

CSS Battle pages have no doctype, so they are in quirks mode, and a bare number like `181` is read in px.

`<h3>` opens a heading. The browser adds html, head and body around it. Then comes a no-break space, which stays inside the h3 as text. `<style>` comes while the h3 is still open, so it ends up inside it. The page is html > head + body > h3 > style. head and style are not displayed.

### 2. One rule for every element

`*` selects all five elements. Each one gets the same three things:

- `border-inline`: a border on the left and on the right only. Its value is `var(--y, 11Q dashed#333)`: the value of `--y` if it is set, `11Q dashed#333` if not. Nothing sets `--y` on html or body, so they get the dashed border.
- `margin:95 181`.
- `scale:10 1`.

The two nested rules change what must differ for body and the h3.

On html, `margin:95 181` leaves 400 − 181 − 181 = 38px in width. html is a 38 × 110 box at (181, 95). The 110 comes from quirks mode (section 7).

1Q is a quarter of a millimeter, 0.945px, so 11Q is 10.39px. Chrome draws the border 10px wide: `getComputedStyle` says `10px`. On each 110px side, the dashes are 20px tall with 10px gaps: four dashes, at y = 95, 125, 155 and 185.

### 3. html stretched ten times

`scale:10 1` stretches html ten times in width and leaves its height alone. The scale is around the center of the box, x = 200. html's 38px become 380, from x = 10 to 390.

The two borders are 10px wide, at x = 181 and 209. Stretched, they are 100px wide, at x = 10 and 290. Each 10 × 20 dash becomes a 100 × 20 bar. That gives the four bars on each side of the target.

### 4. body

`+*` inside the first rule means `* + *`: an element right after a sibling. head comes right before body, so body matches. The h3 is the first element in body, and style is the first element in the h3, so they do not.

body gets `background:#55c085`. html has no background, so body's background is used for the whole canvas. That is the green.

`margin:44-6` reads as two numbers, `44` and `-6`: the minus sign starts a new number. html's box is 38 − 10 − 10 = 18px wide inside its borders. With −6px on each side, body is 18 + 6 + 6 = 30px wide: two 10px dashed borders and 10px between them. Its box is 30 × 22 at (185, 139). It still sits inside html, so it is stretched ten times too: 300px wide on screen.

### 5. body's own scale

The scales add up from parent to child. body's `scale:.2 5` comes on top of html's `10 1`: 10 × 0.2 = 2 in width, 1 × 5 = 5 in height. All the boxes are centered on (200, 150), so every scale is around that point.

body becomes 60 × 110 at (170, 95). Its 10px borders become two 20px columns, at x = 170 and 210, from y = 95 to 205.

The border is dashed, but the columns are full. Each side is only 22px long before the scale. In my tests, a 10px dashed border stays one full line up to 40px long, and splits into two dashes at 50px.

### 6. The h3

The innermost `*` means `* + * *`: an element inside body. That is the h3 (and style, hidden). It sets `--y` to `3Q solid#fff`. The h3 now uses that value in `border-inline`: 3Q is 2.83px, and Chrome draws a 2px white border.

`margin:1` replaces the `95 181` from the first rule. Inside body's 10px, the h3 is 10 − 1 − 1 = 8px wide: two 2px borders and 4px between them. Its box is 8 × 22 at (196, 139). Its top margin of 1 merges with body's 44, so the h3 starts at the top of body.

The h3 keeps `scale:10 1` from the first rule. With body's and html's: 10 × 0.2 × 10 = 20 in width, 5 in height. It becomes 160 × 110 at (120, 95). Its 2px borders are 40px wide: the white columns, at x = 120 and 240. Between them, the h3 is transparent, and body's dark columns show through.

### 7. One height for all: 110

No height is written anywhere. In quirks mode, html and body stretch to fill the frame:

- html fills the 300px frame, minus its margins: 300 − 95 − 95 = 110.
- body fills html, minus its own margins: 110 − 44 − 44 = 22. Scaled by 5: 110.
- The h3 holds a no-break space. It does not collapse like a plain space, so the h3 gets one line of text. In my render, that line is 22px tall. Scaled by 5: 110.

I checked the first two by changing the margins. With `margin:90 181`, html is 120px tall. With `margin:40-6`, body is 30px tall.

So the bars, the dark columns and the white columns all go from y = 95 to 205.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `*` rule gives the border, the margin and the scale to every element. The nested rules only change what differs. The h3 keeps `scale:10 1` without writing it again, and that is what makes it 20 times wider.
- `var(--y, 11Q dashed#333)` lets one `border-inline` serve both borders: the h3 only sets `--y:3Q solid#fff`. Writing `border-inline` twice, once in each rule, gives the same picture in 150 characters.
- `+*` is the shortest way to reach body. `body{` gives the same picture in 151 characters.
- The no-break space is 1 character and gives the h3 its line. With a plain space (also 149 characters), the h3 is 0px tall and the white columns disappear: 8,800 pixels change.
- `margin:1` on the h3 is needed to cancel `margin:95 181`. Without it (140 characters), the h3 goes off the canvas to the right, html grows to 212px tall, each side gets seven bars, and the dark columns move down to y = 146: 28,280 pixels change.
- The heights come for free from quirks mode. They depend on the margins: with `margin:40-6` (149 characters), body is 30px tall. The dark columns grow to 150px, from y = 75 to 225, and the white columns move up 20px: 4,800 pixels change.
- `11Q` is 3 characters for a 10px border, `3Q` is 2 characters for a 2px one. `10px` and `2px` give the same picture, each in 150 characters.
- No space is needed in `44-6`, in `dashed#333` or in `solid#fff`, and `.2` drops its 0. `44 -6` and `0.2` each give the same picture in 150 characters, and `dashed #333` with `solid #fff` in 151.
- The closing tags are left out. The end of the code closes the open blocks.
