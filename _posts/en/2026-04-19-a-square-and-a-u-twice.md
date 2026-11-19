---
title: "A square and a U, twice: a winding ribbon in 183 characters"
ref: 2026-04-19
permalink: /2026/04/19/a-square-and-a-u-twice/
description: "How two p draw a yellow square and a U, a dl holds the same two p again, and scale:-1 turns that copy half a turn to finish the S-shaped ribbon, in the April 19, 2026 CSS Battle target."
target: /assets/targets/2026-04-19.png
target_url: https://cssbattle.dev/play/h3JQ7ibxXKUG8sFT5rc7
colors: ["#2f5c24", "#ebcb58"]
player: gunnar
chars: 183
score: 669.92
match: 100
code: |
  <p><p><dl><p><p><style>&{background:#2F5C24}dl{scale:-1}p{+p{border-width:30 30 30 0;height:40;margin:0 72-55 122;border-radius:0 9in 9in 0}margin:25 222-30 92;border:38q solid#EBCB58
---

The April 19 target is a yellow ribbon on a dark green background. It winds like an S, with a square at each end: top left and bottom right. Gunnar Bittersmann draws the top half with two p: a square made of borders only, and a U open on the left. A dl holds the same two p, and `scale:-1` turns it half a turn, so the copy draws the bottom half.

With **Teaching colors**, each p gets its own color, and the dl's box shows while it turns.

{% include animations/2026-04-19.html lang=page.lang %}

## The code, spaced out

```css
<p><p>                           /* body: p, p */
<dl><p><p>                       /* the dl closes the open p; two more p inside it */
<style>
& {                              /* top level: the root, html */
  background: #2F5C24;           /* painted on the whole canvas */
}
dl {
  scale: -1;                     /* a half turn around its center */
}
p {                              /* the four p */
  + p {                          /* a p right after a p: the 2nd in body, the 2nd in the dl */
    border-width: 30 30 30 0;    /* no left border: open on the left */
    height: 40;                  /* 30 + 40 + 30 = 100 tall */
    margin: 0 72-55 122;         /* x = 130, 190 wide; -55 below */
    border-radius: 0 9in 9in 0;  /* 864px, cut down to 50px: a half disc */
  }
  margin: 25 222-30 92;          /* x = 100, content 0 wide; -30 below */
  border: 38q solid#EBCB58;      /* 35.91px, rounded down to 35px */
}
/* the end of the code closes the rule */
```

## How it works

### 1. Five tags: two p, then a dl with two p

CSS Battle pages have no doctype, so they are in quirks mode, where unitless lengths count as pixels.

The first `<p>` opens a p. The second `<p>` closes it and opens another. `<dl>` also closes the open p, so the dl is a child of body, after the two p. The last two `<p>` open inside the dl, and the `<style>` ends up in the last p. It is not displayed. getBoundingClientRect gives four boxes: two p in body, two p in the dl.

At the top level of a style sheet, `&` matches the root: html. The background of the root is painted on the whole canvas, so the canvas is green.

### 2. A square made of borders

`p{` gives the four p a `38q solid#EBCB58` border. 1Q is a quarter of a millimeter, 0.945px, so 38q is 35.91px. My Chrome rounds border widths down to a whole pixel: getComputedStyle gives 35px.

body's content box runs from x = 8 to 392, 384px wide. The margins take 92px on the left and 222px on the right. That leaves 384 − 92 − 222 = 70px, exactly the two 35px borders, so the content is 0 wide. The p is empty, so its content is 0 tall too. The first p is a 70 × 70 square at x = 8 + 92 = 100.

Its 25px top margin collapses with body's 8px top margin, and the larger one wins: the square starts at y = 25.

### 3. The second p: a U

Inside `p{`, the nested `+p{` means `&+p`: a p right after another p. That is the second p in body and the second p in the dl. The first p of the dl comes first in the dl, so it is not matched. `&+p` is more specific than `p`, so its `border-width` and `margin` win over the outer ones. The border keeps the outer style and color.

The margins leave 384 − 122 − 72 = 190px at x = 130. With a 30px right border and no left border, the content is 160 wide. `height:40` plus the 30px top and bottom borders makes the box 100 tall. `9in` is 864px. Two 864px radii on a 100px side are too big, so both are cut down to 50px: the right side is a half disc. The inner edge follows, with a 50 − 30 = 20px radius. With no left border, the U is open on the left.

The square's −30 bottom margin pulls the U up: its top is at 95 − 30 = 65. The first 40px of its top band lie inside the square, from x = 130 to 170, in the same color. The U ends at y = 165.

### 4. The same pair, inside the dl

Three margins meet below the U: the U's −55 bottom margin, the dl's 16px top margin (the browser's default for a dl) and the 25px top margin of the dl's first p. The dl has no border or padding, so they all collapse into one: the largest positive margin plus the most negative one, 25 − 55 = −30. The dl and its first p start at y = 165 − 30 = 135.

The same rules give the same pair: a square at (100, 135) and a U at (130, 175), from 205 − 30 = 175 to 275. The U's −55 bottom margin collapses with the dl's 16px bottom margin, outside the dl, so the dl ends at the U's bottom edge. getBoundingClientRect gives the dl 8, 135, 384 × 140.

### 5. A half turn

`scale:-1` scales the dl by −1 on both axes, around its center: (8 + 192, 135 + 70) = (200, 205). That is a half turn. A point (x, y) goes to (400 − x, 410 − y).

- The square, 100 to 170 by 135 to 205, lands at 230 to 300 by 205 to 275: the bottom-right square.
- The U, 130 to 320 by 175 to 275, lands at 80 to 270 by 135 to 235. It is now open on the right, with its half disc on the left.

The copy's top band, from y = 135 to 165, falls on the lower band of the first U. They overlap from x = 130 to 270, in the same color. The copy's bottom band ends at x = 270, inside the square. getBoundingClientRect gives these boxes after the turn.

The whole ribbon is symmetric around the center of the canvas, (200, 150): each shape of the copy is a shape of the first pair, turned around that point.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&` is 1 character, `html` 4. With `html{` (186 characters), the picture is the same.
- One `p` rule styles the four p. The U only adds what differs, in a nested rule. With the rule outside, `p{margin:25 222-30 92;border:38q solid#EBCB58}p+p{border-width:30 30 30 0;height:40;margin:0 72-55 122;border-radius:0 9in 9in 0` (184 characters), the picture is the same. The nested `+p` needs no `&`: with `&+p{` (184 characters), the picture is the same.
- `<dl>` closes the open p and has no padding. With `<div>` and `div{` (185 characters), the picture is the same. With `<ul>` and `ul{`, the same length, the list's 40px left padding narrows the copy: the bottom square lands 40px to the left, at x = 190, and 4,400 pixels change.
- The half turn is needed. Without `dl{scale:-1}` (171 characters), the copy is a second top half, under the first one, and 17,689 pixels change.
- `scale:-1` turns the dl in 8 characters. With `rotate:180deg` (188 characters), the picture is the same.
- `9in` is 3 characters, `50px` 4. Both are cut down to the same half disc: with `50px` twice (185 characters), the picture is the same.
- `38q` is 3 characters, and my Chrome draws it as 35px. With `35px` (184 characters), the picture is the same.
- `border-width:30 30 30 0` makes the U's band 30px thick, thinner than the square's 35px border. With `border-left:0` instead (173 characters), the bands are 35px thick too, the bottom square lands 20px lower, and 12,796 pixels change.
- `height:40` gives the U its hole. Without it (173 characters), the U is a solid bar 60px tall with a round end, the copy moves up, and 23,346 pixels change.
- Quirks mode takes unitless numbers. With `px` on the 11 unitless numbers, and the spaces that `72px -55px` and `222px -30px` then need (207 characters), the picture is the same.
- Negative margins need no space before them, and the color needs none before `#`. With `72 -55`, `222 -30` and `solid #EBCB58` (186 characters), the picture is the same.
- The code ends inside `p{`: the end of the code closes it. With `}` at the end (184 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same shapes at the same place as the target, with the same flat colors: (47, 92, 36) and (235, 203, 88). 410 pixels differ by more than 8 levels. All of them are within 0.71px of the circle of one of the curves, 204 on the top curve and 206 on the bottom one. The largest difference is 143 levels, at (283, 129), on the inner edge of the top curve: (68, 104, 41) in my render, close to the green, and (211, 189, 82) in the target, close to the yellow. The CSS Battle judge gives the official code a 100% match.
