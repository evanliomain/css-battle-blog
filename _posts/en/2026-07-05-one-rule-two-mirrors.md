---
title: "One rule, two mirrors: two toggle switches in 122 characters"
ref: 2026-07-05
permalink: /2026/07/05/one-rule-two-mirrors/
description: "How one +* rule flips body and flips the second p back, while a single border and a 75% zoom turn two p and two img into two toggle switches, in the July 5, 2026 CSS Battle target."
target: /assets/targets/2026-07-05.png
target_url: https://cssbattle.dev/play/B85IWOvFPcgdhZglP3Zt
colors: ["#3450ae", "#f7ec7d"]
player: selenit
chars: 122
score: 725.05
match: 100
code: |
  <p><img><p><img><style>*{background:#3450AE;margin:20;+*{scale:-1 1;*{border:solid 5vw#F7EC7D;border-radius:1in;*{zoom:75%
---

The July 5 target shows two pale yellow toggle switches on a blue background: two pill outlines, one above the other, with a small disc on the right of the top one and on the left of the bottom one. Ilya Streltsyn builds them from two `<p>`, each holding an `<img>`. One border draws the pills and the discs. One `+*` rule flips body left to right, and flips the second p back.

Turn on **Teaching colors** to tell the two p apart while they flip.

{% include animations/2026-07-05.html lang=page.lang %}

## The code, spaced out

```css
<p><img><p><img>                /* body > p > img, p > img + style */
<style>
* {                             /* every element */
  background: #3450AE;          /* blue, on the whole canvas */
  margin: 20;                   /* html at 20, body at 40, p at 60 */
  +* {                          /* * + *: body, the 2nd p, the style */
    scale: -1 1;                /* mirror, left to right */
    * {                         /* their descendants: p, img, p, img */
      border: solid 5vw#F7EC7D; /* 20px yellow border */
      border-radius: 1in;       /* 96px: round ends */
      * {                       /* one level deeper: the two img */
        zoom: 75%               /* 15px border, 15px margin */
```

## How it works

### 1. Two p, two img

There is no doctype: the page is in quirks mode, and a number with no unit means px in `margin`. `<p>` opens html, head and body on its own, then a p in body. `<img>` goes in that p. A p cannot hold another p, so the second `<p>` closes the first one and opens a new one. It gets the second `<img>`, and the style ends up in it too, after the img.

The page has html, head, body, two p, two img and the style. head and the style are not displayed. An `<img>` with no source and no alt text has no content: with the zoom removed, offsetWidth gives 40px for each img, its two 20px borders and nothing else.

### 2. Three nested selectors

`*` selects every element: they all get the blue and the 20px margin.

The nested `+*` means `* + *`: an element right after another element. head is html's first child and p is body's first child, so they are out. That leaves body (after head), the second p (after the first) and the style (after the second img).

The `*` nested in it selects their descendants: the two p, the two img and the style. The `*` one level deeper selects the descendants of those: the two img and the style. getComputedStyle agrees: `scale:-1 1` on body, the second p and the style; a 20px border on the two p, the two img and the style; zoom 0.75 on the two img and the style.

### 3. One margin, every level

`margin:20` stacks up. html sits at (20, 20). In quirks mode it fills the window minus its margins: 360 × 260. body is 20px further in: (40, 40), 320 × 220. Each p is 20px further in again: x = 60 to 340, 280px wide.

Vertically, body has no border and no padding. Its top margin and the first p's merge: getBoundingClientRect puts both body and the first p at y = 40. Between the two p, the two 20px margins merge too: the gap is 20px.

Every element is blue. html's background paints the whole canvas, and the others are blue on blue.

### 4. Pills from one border

`5vw` is 5% of 400: 20px. Each p gets a 20px yellow border. `1in` is 96px, but each p is only 100px tall. When two corner radii add up to more than the side, the browser scales all of them down by the same factor: here 100 / 192, which gives 50px. The ends of the p become half circles: a pill outline.

### 5. Knobs from the same border

Each img gets the same 20px border and 96px corners. Its content is empty, so the border fills it: a disc. Without the zoom, the disc would be 40px with 20px margins, and each p 120px tall.

`zoom:75%` scales everything on the img by 0.75: the border becomes 15px, the margin 15px, and the corners 72px. The disc is 30px. The line that holds it is 15 + 30 + 15 = 60px tall, so each p is 60 + 40 = 100px tall. The pills run from y = 40 to 140 and from 160 to 260. Before any flip, both discs sit at x = 80 + 15 = 95, on the left: at (95, 75) and (95, 195).

### 6. Two mirrors

`scale:-1 1` keeps the height and turns x around, about the element's center. body runs from x = 40 to 360: its center is x = 200. Everything in it is mirrored. The two discs go to x = 400 − 125 = 275, on the right.

The second p gets the same `scale:-1 1`. It runs from x = 60 to 340: its center is also x = 200. Mirrored twice, it is back as it was: its disc returns to the left, at x = 95. The top disc stays on the right. getBoundingClientRect gives (275, 75) and (95, 195), 30 × 30 each.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- One `+*` for two jobs. Because the second p comes right after the first one, the rule that flips body also flips the second p back.
- Nesting writes the selectors once. With flat rules, `*{…}*+*{scale:-1 1}*+* *{…}*+* * *{zoom:75%`, the code takes 133 characters, for the same picture.
- `scale:-1 1` is 10 characters. `transform:scaleX(-1)` gives the same picture in 132. The ` 1` is needed: `scale:-1` alone (120 characters) means −1 on both axes. The knobs end up top left and bottom right, and 2,948 pixels change.
- `zoom:75%` shrinks both the border and the margin of the img. Writing them instead, `margin:15;border-width:15`, gives the same picture in 139 characters.
- `5vw` is 20px in 3 characters. `20px` gives the same picture in 123. A bare `20` (121 characters) does not work here: in my Chrome, the whole `border` declaration is dropped, the canvas is plain blue, and 26,397 pixels change.
- `1in` is the corner radius in 3 characters. `50px` gives the same picture in 123.
- One margin places html, body and the p, and its zoomed copy places the knobs.
- No space in `5vw#F7EC7D`. With the space, the code takes 123 characters, for the same picture.
- Nothing is closed. `}}}}</style>` at the end gives 134 characters, for the same picture.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 1,078 pixels, with the same rule as in the golf notes. All of them are on curved edges: 908 on the round ends of the pills and 170 around the two knobs. The straight edges match. Zoomed in, the target's curves are harder: it has 33 different colors, my render 303. The CSS Battle judge gives the code a 100% match.
