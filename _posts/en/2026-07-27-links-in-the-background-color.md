---
title: "Links in the background color: a funnel of squares in 143 characters"
ref: 2026-07-27
permalink: /2026/07/27/links-in-the-background-color/
description: "How four nested top borders draw the bars and four tall links, painted in the canvas blue, cut them into squares in the July 27, 2026 CSS Battle target."
target: /assets/targets/2026-07-27.png
target_url: https://cssbattle.dev/play/9tg5HEQqGWBN3Apa88HN
colors: ["#22d16a", "#3450ae"]
player: selenit
chars: 143
score: 702.36
match: 100
code: |
  <dl><p><a><a><a><a>.''<style>*{margin:80 60;border-top:solid 5vw#22D16A;background:#3450AE;*{margin:20 20 0 30;a{padding:300 5;margin:0 90 0-70
---

The July 27 target is a funnel on a blue background: four rows of green, each one shorter than the one above. Each row starts with small squares, four, then three, two and one, and ends with a bar. Ilya Streltsyn draws the four rows as the top borders of four nested elements: html, body, dl and p. Then four inline links, 638px tall and painted in the same blue as the canvas, run down through all the rows. Where they cross a bar, they cut a hole in it.

Use **Teaching colors** to see the four borders and the links in their own colors, and **Wide view** to see the links run far above and below the canvas.

{% include animations/2026-07-27.html lang=page.lang %}

## The code, spaced out

```css
<dl><p><a><a><a><a>.''           /* body > dl > p > four a; the text goes in the last a */
<style>
* {                              /* every element: html, head, body, dl, p, the a's, style */
  margin: 80 60;                 /* html: x = 60 to 340, from y = 80 */
  border-top: solid 5vw#22D16A;  /* a 20px green bar at the top of each box */
  background: #3450AE;           /* blue: the canvas (html) and the stripes (the a's) */
  * {                            /* head, body, dl, p, the a's, style */
    margin: 20 20 0 30;          /* each level: 30px in on the left, 20px on the right, 20px down */
    a {                          /* the four a's */
      padding: 300 5;            /* 10px wide, 300px above and below the line */
      margin: 0 90 0-70          /* -70 + 10 + 90: one a every 30px */
```

## How it works

### 1. html: the first bar

The style element is never closed, so everything after `<style>` is CSS. There is no doctype: the page is in quirks mode. In that mode, a number with no unit counts as px in `margin` and `padding`.

`*` targets html first. Its background, `#3450AE`, is the root's background: it paints the whole canvas blue.

`margin:80 60` puts html's box from x = 60 to 340, and its top at y = 80. html gets `border-top:solid 5vw#22D16A`. 1vw is 4px, so 5vw = 20px. That is the top bar: 280 × 20, from y = 80 to 100.

### 2. body, dl, p: three more bars

The nested `*{` means `* *`: any element inside another one. That is head, body, dl, p, the a's and style. head and style are hidden. body, dl and p are blocks, and each one gets the outer rule too: the same 20px top border and the same blue background.

Each of them takes `margin:20 20 0 30`. A box starts 30px to the right of its parent's left edge, ends 20px before its right edge, and starts 20px below its parent's border. So each bar is 50px shorter than the one above, and 40px lower:

- html: x = 60 to 340, y = 80.
- body: x = 90 to 320, y = 120.
- dl: x = 120 to 300, y = 160.
- p: x = 150 to 280, y = 200.

The backgrounds of body, dl and p are blue on blue: they do not show.

### 3. The a's: four tall stripes

In the HTML, a new `<a>` closes the one that is open. So `<a><a><a><a>` gives four sibling links in p, with no closing tags.

The a's are inline. `padding:300 5` adds 5px on each side and 300px above and below. The content of an empty a is 0px wide, so each a is 10px wide. Its line runs from y = 220 to 238 in p. With the 300px of padding on each side and the 20px top border, each a runs from y = −100 to 538: 638px, far beyond the canvas. Its green top border, from y = −100 to −80, is never shown.

`margin:0 90 0-70` gives −70px on the left and 90px on the right. From one a to the next: −70 + 10 + 90 = 30px. p's content starts at x = 150, so the first a starts at 150 − 70 = 80. The four a's start at x = 80, 110, 140 and 170.

### 4. .'': a wider fourth stripe

The text `.''` comes just before `<style>`, so it lands in the fourth a. In my Chrome, the dot is 4px wide and each quote 2.89px: 9.77px in all.

So the fourth a is 5 + 9.77 + 5 = 19.77px wide, from x = 170 to 189.77. In my render, the first green column after it is x = 190. The first three stripes leave 10px gaps. This one leaves a 20px gap before the bar.

### 5. The stripes cut the bars

The borders of html, body, dl and p are block decorations. The a's are inline content, and an inline element's background is painted after the block backgrounds and borders. So the a's are painted over the bars.

Their background is the `#3450AE` of the outer `*`: the canvas blue. On the blue background, the stripes do not show. On a bar, each stripe cuts a hole: 10px for the first three, about 20px for the fourth.

What is left are 20px squares, 10px apart, then a bar from x = 190:

- html (60 to 340): 4 squares, at x = 60, 90, 120 and 150, then a bar to 340.
- body (90 to 320): 3 squares, then a bar to 320.
- dl (120 to 300): 2 squares, then a bar to 300.
- p (150 to 280): 1 square, then a bar to 280.

## Golf notes

- One nested rule draws three bars. Each level takes the same `margin:20 20 0 30` and the same top border, so body, dl and p step in by themselves.
- `background` is written once, in `*`. It paints the canvas through html, and the stripes through the a's.
- The values have no units: the page is in quirks mode. With `px` on every nonzero margin and padding value, the code is 161 characters, 18 more, and the picture is the same.
- `5vw` is 20px in 3 characters. `20px` gives the same picture in 144 characters.
- No space is needed in `5vw#22D16A`: the `#` starts a new token. In `0-70`, the minus sign starts a new number: `0 -70` gives the same picture in 144 characters.
- `<a><a><a><a>` makes four siblings with no closing tags: each new `<a>` closes the one before.
- `.''` is 3 characters of text that widen the last stripe to about 20px. Without them, the code is 140 characters, and 832 pixels change from my render of the official code: the four bars start at x = 180 instead of 190 (4 × 10 × 20 = 800 pixels), and the 32 pixels of the glyphs go away.
- `padding:300 5` makes the stripes tall enough to cross all four rows. With `padding:0 5`, each a is only as tall as its line, and its own green top border lands on the last row, at y = 200. The bars are no longer cut, and 3,400 pixels change.
- `<dl>` is a block element in 4 characters, and the `*` margins replace its default margins. Without it, there is one bar fewer, p moves up one level and starts 30px further left, and so do the stripes: 4,064 pixels change.
- Nothing is closed: neither the three rules nor the style element, nor any tag. With `}}}</style>` at the end, the code is 154 characters and the picture is the same.

## If you try it at home

In my Chrome, the dot and the two quotes show up as small dark marks in the fourth stripe, between x = 176 and 184 and y = 222 and 234. 32 pixels differ from the target there, and my test script marks the render as wrong. On the CSS Battle judge, the code is a 100% match.
