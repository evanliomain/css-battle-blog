---
title: "Two outlines, one beveled: a nut in 87 characters"
ref: 2026-06-14
permalink: /2026/06/14/two-outlines-one-beveled/
description: "How one rule with zoom:1.6 gives html a 30px beveled outline and body, zoomed twice, a 48px round one, and how the two make a black octagon with a round hole, in the June 14, 2026 CSS Battle target."
target: /assets/targets/2026-06-14.png
target_url: https://cssbattle.dev/play/QOStkHKvkB7UHWpkZD72
colors: ["#ffffff", "#000000"]
player: selenit
chars: 87
score: 774.56
match: 100
code: |
  <style>*{outline:solid 20q;border-radius:27q;zoom:1.6}&{corner-shape:bevel;margin:50 81
---

The June 14 target looks like a nut: a black octagon with a big round hole, on a white background. Ilya Streltsyn gives html and body the same outline and the same radius, with `zoom:1.6`. Zooms multiply, so body gets the outline 2.56 times bigger, and html only 1.6 times. html's corners are cut straight with `corner-shape:bevel`: that is the octagon. body stays round: its outline fills the octagon around the hole.

Use **Teaching colors** to tell the two outlines apart.

{% include animations/2026-06-14.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                        /* html, head, style, body */
  outline: solid 20q;      /* 18.9px: 30px on html, 48px on body */
  border-radius: 27q;      /* 25.5px: 40.8px on html, 65.3px on body */
  zoom: 1.6;               /* html × 1.6, body × 1.6 × 1.6 = 2.56 */
}
& {                        /* html */
  corner-shape: bevel;     /* straight cuts instead of round corners */
  margin: 50 81;           /* × 1.6: 80 and 129.6 */
```

## How it works

### 1. Four elements, two zooms

The browser adds html, head and body around `<style>`, and puts style in head. So `*` selects four elements: html, head, style and body. head and style are hidden. html and body are left.

Each one gets `zoom:1.6`. A zoom scales an element and everything inside it, and the zooms of nested elements multiply. html is scaled 1.6 times. body is inside html, so it is scaled 1.6 × 1.6 = 2.56 times. The same lengths give two sizes: one on html, a bigger one on body.

### 2. html: a 140.8 × 140 box

A `&` outside any rule stands for the root of the page: html. Writing `html{` instead gives the same picture.

CSS Battle pages have no doctype, so they are in quirks mode. There, a bare number like `50 81` is read in px. Times 1.6, the margins are 80px at the top and bottom, 129.6px on the sides. In quirks mode html fills the height of the page. Its box is 400 − 2 × 129.6 = 140.8px wide and 300 − 2 × 80 = 140px tall, at (129.6, 80). Its center is the canvas center, (200, 150).

### 3. html's outline, cut straight

`20q` is 20 quarter millimeters: 18.9px. Times 1.6, Chrome draws html's outline 30px wide. An outline is drawn outside the box and takes no room. `27q` is 25.5px, times 1.6: html's corners have a 40.8px radius. The outline follows them: a 40.8px radius on its inside edge, 70.8px on its outside edge.

`corner-shape:bevel` turns each round corner into a straight cut, between the same two points. Inside, the cut starts 40.8px from the corner of html's box. The outline keeps the same 30px thickness along the cut. So outside, the cut starts 40.8 + 2 × 30 − 30 × √2 = 58.4px from the corner. In my render, the top edge of the octagon runs from x = 157 to 242. The octagon goes from (99.6, 50) to (300.4, 250).

The corner-shape is only in `&{…}`: html's outline is the only beveled one.

### 4. body: the round hole

body keeps its default margin of 8px, but scaled 2.56 times: 20.5px. Inside html's box, that leaves a box of 99.9 × 99.1, at (150.1, 100.5). Its center is (200, 150) again.

Its radius is 27q × 2.56 = 65.3px. That is more than half of its size, so the browser scales the radii down until they fit: 49.5px. body becomes a circle. Nothing paints inside it, so it stays white: that is the hole.

### 5. body's outline fills the octagon

body's outline is 20q × 2.56: Chrome draws it 48px wide. It follows body's round shape: a ring from 49.5px to 97.5px around (200, 150).

Inside html's beveled box, the farthest points from the center are the ends of the cuts, about 76px away. The ring reaches 97.5px, so it covers all of that box around the hole. Past html's box, it runs over html's outline, in the same black. The octagon is html's outline, the hole is body's box, and body's outline fills everything in between.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `zoom:1.6` on `*` makes one rule do two jobs. It gives html a 30px outline and a 40.8px radius, and body a 48px outline and a radius big enough to make a circle. Without the zoom (78 characters), both outlines are only 18.9px wide: the black shrinks to a 26px frame around a big white rounded rectangle, and 44,697 pixels change.
- `&` is html in one character. `html{` gives the same picture in 90 characters.
- The corner-shape goes only to html. Moved into `*{…}` (same length), it also cuts body's corners: the hole becomes a diamond, and 3,105 pixels change.
- `outline` draws outside the box and takes no room. `border`, one character shorter (86 characters), is drawn inside the boxes: html's octagon becomes a 30px frame, body's 48px borders no longer fit inside it and stick out to the right, and 22,607 pixels change.
- `20q` is 3 characters. `19px` gives the same picture in 88 characters.
- The outline needs its unit. With a bare `20` (86 characters), Chrome drops the whole `outline` declaration: nothing black is left, and 25,694 pixels change.
- The radius is what corner-shape cuts. Without `border-radius:27q;` (69 characters), there is no corner to cut: a black square with a square hole, and 9,150 pixels change.
- `81` makes html 140.8px wide, close to its 140px height, so body is almost square and its hole round. With `80` (same length), html is 144px wide, body is 103 × 99, and the octagon and the hole stretch sideways: 1,743 pixels change.
- body's inner offset costs nothing: it is body's default 8px margin, scaled to 20.5px.
- Nothing is closed. `}` at the end gives the same picture in 88 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 596 pixels, with the same rule as in the golf notes. All of them are on the edges: 305 around the hole, 281 on the four cuts of the octagon, 10 on its straight edges. The black and the white are the same. The CSS Battle judge gives the code a 100% match.
