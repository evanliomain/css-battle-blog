---
title: "Built from the bottom up: pixel glasses in 137 characters"
ref: 2026-05-16
permalink: /2026/05/16/built-from-the-bottom-up/
description: "How one margin with a negative bottom value stacks two p's and an hr from the bottom up, between two cream frames, in the May 16, 2026 CSS Battle target."
target: /assets/targets/2026-05-16.png
target_url: https://cssbattle.dev/play/JecXahV3LW56TgSfgva2
colors: ["#f3ead2", "#cf596a"]
player: emohdaziz
chars: 137
score: 708.39
match: 100
code: |
  <p><hr><p><style>*{*{border:6vw solid#f3ead2;margin:66 74;background:#cf596a;p{border-block:0;height:72}*{margin:72 66-180}hr{scale:.33.5
---

The May 16 target shows two cream frames on a pink background, side by side, joined in the middle by a small 3 × 3 checkerboard. It looks like a pair of glasses. Mohamed Ali draws the outline with body's border. Two p's and an hr make the middle column. They share one margin, `72 66-180`: each box starts 108px above the bottom of the one before, so the three boxes stack from the bottom up. A scale shrinks the hr to the center square.

**Teaching colors** show each box in its own color, and where the boxes overlap before the hr shrinks.

{% include animations/2026-05-16.html lang=page.lang %}

## The code, spaced out

```css
<p><hr><p>                     /* body holds p, hr, p; the style goes into the second p */
<style>
* {                            /* no declarations of its own */
  * {                          /* head, body, p, hr, p, style */
    border: 6vw solid #f3ead2; /* a 24px cream border */
    margin: 66 74;             /* body: 252 × 168 at (74, 66) */
    background: #cf596a;       /* body: the canvas; the p's: their pink centers */
    p {                        /* the two p's */
      border-block: 0;         /* side borders only */
      height: 72;              /* 72 × 72: cream, pink, cream */
    }
    * {                        /* p, hr, p, style */
      margin: 72 66 -180;      /* 72 wide; each box 108px above the bottom of the last */
    }
    hr {
      scale: .33 .5;           /* 72 × 48 → 23.76 × 24 */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `66` in a margin or a height is read in px.

The first `<p>` opens body. A p cannot hold an hr, so `<hr>` closes it: the first p stays empty. The second `<p>` opens after the hr, and the `<style>` goes inside it. body holds three boxes: p, hr and p.

The outer `*` matches every element but has no declarations. The rules nested in it only reach elements with an ancestor: the inner `*` is `* *`, which matches head, body, p, hr, p and style, but not html. The `*` nested one level deeper is `* * *`: p, hr, p and style. `p` and `hr` there are `* * p` and `* * hr`. head and style are not displayed. The rules are never closed: the end of the code closes them.

### 2. body: the frame and the canvas

body gets `border:6vw solid#f3ead2`. 6vw is 6% of the 400px width: 24px. With `margin:66 74`, body is 400 − 2 × 74 = 252 wide. In quirks mode, body fills the height of the page: 300 − 2 × 66 = 168. So body is a 252 × 168 box at (74, 66), with a 24px cream border. Its content box is 204 × 120, at (98, 90).

html has no background, so body's background, `#cf596a`, paints the whole canvas.

### 3. p, hr and p: 72 wide

p, hr and p match `* *` too: they get the cream border, the margin and the pink background. They also match `* * *`, whose `margin:72 66-180` comes later with the same specificity, so it replaces `66 74`. 204 − 2 × 66 = 72: each box is 72 wide, from x = 164 to 236.

`* * p` keeps only the side borders of the p's (`border-block:0`) and makes them 72 tall. Each p is a 72 × 72 square: 24px of cream, 24px of pink, 24px of cream. The hr keeps its four borders around an empty content box, 24 wide and 0 tall: a 72 × 48 block, all cream.

### 4. Collapsing margins stack them from the bottom up

The first p starts 72px below body's content box: at y = 90 + 72 = 162. It ends at 234.

Its bottom margin, -180, touches the hr's top margin, 72. Vertical margins between blocks collapse into one: 72 − 180 = −108. The hr starts 108px above the bottom of the p: 234 − 108 = 126. It ends at 174. The same happens below the hr: the second p starts at 174 − 108 = 66 and ends at 138.

So the boxes go up, in the reverse order of the code: the first p at the bottom, the hr in the middle and the second p at the top. Before the scale, the hr overlaps each p by 12px.

### 5. The p's cut body's border

The first p runs from y = 162 to 234 and covers the bottom of body's border, from 210 to 234. The second p, from 66 to 138, covers the top of it, from 66 to 90. The p's paint after body, so their pink centers make two 24 × 24 notches, at x = 188 to 212. The border becomes two frames. The cream sides of the p's close each frame.

### 6. scale shrinks the hr

`scale:.33.5` means `.33 .5`: a number cannot have two dots, so `.5` starts a second one. The scale shrinks the hr around its center, (200, 150). It becomes 72 × 0.33 = 23.76 wide and 48 × 0.5 = 24 tall, from x = 188.12 to 211.88 and from y = 138 to 162. It fills the gap between the two p's: the center square of the checkerboard. The scale does not change the layout, so the p's stay where they are.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One margin places the three boxes. The negative bottom margin collapses with the next box's top margin, and each box lands 108px higher than the one before. No position, no top, no second margin.
- `<p><hr><p>` gives three boxes in 10 characters, with no closing tags: the hr closes the first p.
- `*{*{` reaches everything under html in 4 characters. With a single `*{` (135 characters), html gets the frame too, body gets the margin meant for the p's, and 11,904 pixels change.
- Nesting saves the selectors. With flat rules, `* *{…}* * p{…}* * *{…}* * hr{…}` (149 characters), the picture is the same.
- One `background` serves body and the p's. body's goes to the canvas, and the p's need it for the notches. With `background:0` added to the p rule (150 characters), body's border shows through at the top and bottom of the middle column: the two notches turn cream, and 1,152 pixels change.
- `border-block:0` drops the top and bottom borders in 14 characters. With `border-width:0 6vw` (141 characters), the picture is the same.
- `6vw` is 24px in 3 characters, one less than `24px`. With `border:24px solid#f3ead2` (138 characters), the picture is the same. A bare number does not work there: with `border:24 solid#f3ead2` (136 characters), my Chrome drops the declaration. All the cream is gone, only a thin gray line is left, the hr's default 1px border, and 21,968 pixels change.
- Bare numbers in the margins and the height, thanks to quirks mode. With `66px 74px`, `72px` and `72px 66px -180px` (150 characters), the picture is the same.
- No spaces where a token ends on its own. In `66-180`, the minus sign starts a new number: with `66 -180` (138 characters), the picture is the same. With `.33 .5` (138 characters), too. `solid#f3ead2` needs no space before the `#`.
- The code ends inside the hr rule, and the end of the code closes all three open rules. With `}}}` at the end (140 characters), the picture is the same.

## If you try it at home

In my local Chrome (version 157 when this was written), 48 pixels of the official code are more than 8 off the target, up to 18 in one channel. They are the columns x = 188 and x = 211, from y = 138 to 161: the left and right edges of the center square. The hr is 23.76px wide there, from x = 188.12 to 211.88, so these two columns are only partly cream. With `scale:.333.5` (138 characters), the hr is 23.976px wide and no pixel is more than 8 off. The CSS Battle judge gives the official code a 100% match.
