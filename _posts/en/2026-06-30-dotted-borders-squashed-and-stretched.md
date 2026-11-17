---
title: "Dotted borders, squashed and stretched: five strings in 112 characters"
ref: 2026-06-30
permalink: /2026/06/30/dotted-borders-squashed-and-stretched/
description: "How html's dotted borders draw two half discs, and how body's dotted borders, squashed by 0.07 and stretched 10,000 times, become five bands, in the June 30, 2026 CSS Battle target."
target: /assets/targets/2026-06-30.png
target_url: https://cssbattle.dev/play/3bZZVPZQWMXqq8yg75W5
colors: ["#62306d", "#f7bed9"]
player: gunnar
chars: 112
score: 737.55
match: 100
code: |
  <style>*{border-inline:35vw dotted#62306D;margin:80-70;*{background:#F7BED9;margin:-573 5e5-573-5e5;scale:1e4.07
---

The June 30 target shows two purple half discs on a pink background, cut by the left and right edges, with five thin purple bands between them. Gunnar Bittersmann draws everything with one property, `border-inline` with dotted borders. On html, each border holds a single round dot: the two half discs. On body, each border is a tall column of five dots. `scale` squashes body and stretches it 10,000 times across, and the five dots become the five bands.

Use **Wide view** to see html stick out of the canvas and body's tall column, and **Teaching colors** to tell html's dots from body's two borders.

{% include animations/2026-06-30.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html, head, style and body */
  border-inline: 35vw dotted#62306D; /* 140px on the left and right, in round dots */
  margin: 80-70;                     /* html: 540 × 140 at (−70, 80) */
  * {                                /* head, style and body */
    background: #F7BED9;             /* body only: it goes to the canvas */
    margin: -573 5e5-573-5e5;        /* body: 280 × 1286, at x = −499,930 */
    scale: 1e4.07                    /* ×10,000 across, ×0.07 down */
```

## How it works

### 1. The page

There is no doctype: the page is in quirks mode, and a number with no unit means px in `margin`. The `<style>` is never closed, and neither are the two rules.

`*` selects every element: html, head, style and body. head and style are hidden, so only html and body matter. The nested `*{` means `* *`: every element inside another one. That is head, style and body, not html. Both selectors have the same specificity, and the nested one comes later. So body takes its margin from the nested rule, and html keeps `margin:80-70`. `border-inline` applies to both. `background` and `scale` only reach body.

### 2. html, wider than the canvas

`margin:80-70` reads as 80 at the top and bottom, and −70 on the left and right. `80-70` is two numbers: the minus sign starts the second one. html is 400 + 70 + 70 = 540px wide, from x = −70 to 470. In quirks mode, html fills the height of the window minus its margins: 300 − 80 − 80 = 140px, from y = 80 to 220. getBoundingClientRect gives exactly that.

### 3. One dot per side

`35vw` is 35% of the 400px width: 140px. `border-inline:35vw dotted#62306D` gives html a 140px border on the left, from x = −70 to 70, and one on the right, from x = 330 to 470.

A dotted border is a row of round dots, as wide as the border. Here, each side is 140px tall: there is room for a single dot, a disc 140px across. The left one is centered on (0, 150), the right one on (400, 150). The canvas edges cut each of them in half. Between the borders, html's content is 260px wide and empty.

### 4. A pink canvas

The background is on body, not on html. When html has no background, the browser paints body's background on the whole canvas, and body itself paints none. So the pink sits under everything, html's discs included.

### 5. body, a tall column far to the left

The nested rule gives body `margin:-573 5e5-573-5e5`: −573 at the top, 5e5 (500,000) on the right, −573 at the bottom and −5e5 on the left.

- Height: in quirks mode, body fills html's 140px of height minus its own margins: 140 + 573 + 573 = 1286px. It starts 573px above html's content, at y = −493, and ends at y = 793. Its middle is y = 150, the middle of html too.
- Width: html's content is 260px wide. 260 + 500,000 − 500,000 − 280 is negative, so body's content is 0px wide. body is just its two 140px borders: 280px wide.
- Position: its left margin moves it 500,000px to the left of html's content (x = 70): body runs from x = −499,930 to −499,650.

Each border of body is 140px wide and 1286px tall. On a test column of that size, Chrome draws 5 dots per border, at 0, 286.5, 573, 859.5 and 1146px from the top: one dot at each end, and 146.5px gaps.

### 6. ×0.07 down

`scale:1e4.07` holds two numbers: `1e4` is 10,000 across, and `.07` is the factor down. The dot starts the second number, so no space is needed. The scale works around body's center, (−499,790, 150).

Down, body shrinks to 1286 × 0.07 = 90px: getBoundingClientRect gives y = 104.99 to 195.01. The dots are 140 × 0.07 = 9.8px tall now, and 286.5 × 0.07 = 20.06px apart. Their centers land at y = 109.9, 129.9, 150, 170.1 and 190.1.

### 7. ×10,000 across

Across, a point at x lands at −499,790 + (x + 499,790) × 10,000. body becomes 2,800,000px wide, from x = −1,899,790 to 900,210.

The whole canvas, from x = 0 to 400, comes from a strip only 0.04px wide: 189.98 to 190.02px from body's left edge. That is inside the right border, which runs from 140 to 280px, and 20px left of its dots' centers, at 210px. There, each dot is 2 × √(70² − 20²) = 134.2px tall. Squashed by 0.07, each band is 9.4px tall: the first one runs from y = 105.19 to 114.59.

The five dots of the right border become five bands, across the whole canvas and much further. They also cross html's discs, in the same color. The left border lands far to the left, off the canvas.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- One property draws the whole picture: `border-inline` gives html its two half discs and body its five bands.
- `35vw` is 140px in 4 characters. `140px` gives the same picture in 113.
- `border-inline` only draws the left and right borders. `border:35vw dotted#62306D` is 7 characters shorter (105), but html and body also get dotted borders on the top and bottom, and 47,024 pixels change.
- The background goes in the nested rule, so only body gets it, and the browser moves it to the canvas, under the discs. In the first rule (still 112 characters), html has a background too, so body paints its own. It is scaled with body: a pink strip from y = 105 to 195 covers the discs between the bands, and 6,604 pixels change.
- `5e5` is 500,000 in 3 characters. With `500000` twice, the same picture takes 118.
- The right margin cancels the left one, and body's content stays 0px wide. With `0` there (110 characters), body is 500,260px wide, its right border moves away, and the bands disappear: 13,687 pixels change.
- `1e4.07` needs no space: the dot starts the second number. `1e4 .07` gives the same picture in 113, and `10000 .07` in 115.
- A minus sign or a `#` starts a new value: `80-70`, `5e5-573-5e5`, `dotted#62306D`. With spaces there, `80 -70`, `5e5 -573 -5e5` and `dotted #62306D`, the same picture takes 116 characters.
- Nothing is closed. `}}</style>` at the end gives 122 characters, for the same picture.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 3,025 pixels, with the same rule as in the golf notes. 2,732 of them are the top and bottom rows of the five bands, between the discs. In my render, each band has 8 full rows and a blended row at each edge: at x = 200, y = 105 is (134, 83, 136) and y = 114 is (172, 119, 162). In the target, each band is 10 full rows of #62306d, from y = 105 to 114, then 125 to 134, and so on. The other 293 pixels are along the curves of the discs. My bands are a bit thinner than the target's: with `7e5` instead of `5e5` (still 112 characters), the slice goes through the dots' centers, the bands are 9.8px tall, and 6 of the 10 edge rows match the target. My render then differs on 1,381 pixels. The CSS Battle judge gives the official code a 100% match.
