---
title: "Five boxes, one center: four pierced bars in 184 characters"
ref: 2026-05-03
permalink: /2026/05/03/five-boxes-one-center/
description: "How one * rule turns five nested boxes around the same center, with blue bands on html and body, pink dotted borders on two dl and a p, and one custom property for all the margins, in the May 3, 2026 CSS Battle target."
target: /assets/targets/2026-05-03.png
target_url: https://cssbattle.dev/play/ZmI88BYrDPD4PBtlv8j6
colors: ["#529caf", "#f9d2d2", "#f8d2d1"]
player: h_blierzt
chars: 184
score: 669.25
match: 100
code: |
  <dl><dl><p><style>*{rotate:90deg;margin:var(--m,-40 170);border-block:solid 30vw#529CAF;+*{background:#E775;--m:-70 0;*{border:dotted#F8D2D1 32q;--m:-160;*{--m:20;*{--m:40 20;height:60
---

The May 3 target is a cross of four blue bars on a pale pink background: one at the top, one at the bottom, one on the left and one on the right. Each bar has two pink discs in it. H_Bliertz draws the bars with the blue top and bottom borders of html and body, and the discs with the dotted borders of three nested boxes. One `*` rule gives every element a quarter turn, and the turns add up from box to box.

With **Teaching colors**, each box and its dots get their own color. **Wide view** shows the parts of html and of the outer dl that stick out of the canvas.

{% include animations/2026-05-03.html lang=page.lang %}

## The code, spaced out

```css
<dl><dl><p>                        /* dl in dl, then p: three nested boxes */
<style>
* {                                /* every element */
  rotate: 90deg;                   /* a quarter turn, added to the parent's */
  margin: var(--m,-40 170);        /* html has no --m: -40 170 */
  border-block: solid 30vw#529CAF; /* 120px blue bands, top and bottom */
  + * {                            /* *+*: only body, right after head */
    background: #E775;             /* goes to the canvas */
    --m: -70 0;
    * {                            /* everything inside body */
      border: dotted#F8D2D1 32q;   /* 30px pink dots */
      --m: -160;                   /* outer dl */
      * {
        --m: 20;                   /* inner dl */
        * {
          --m: 40 20;              /* p */
          height: 60
  /* the end of the code closes the five rules */
```

## How it works

### 1. Three nested boxes

`<dl><dl><p>` opens a dl, a second dl inside it, and a p inside that. A new `<dl>` does not close the open one, so they nest. The `<style>` ends up inside p.

The page has seven elements: html, head, body, the outer dl, the inner dl, p and style. head and style are not displayed.

### 2. One `*` rule, nested

`*{…}` targets every element. The rules nested inside it narrow it down, one level at a time:

- `+*{…}` starts with a combinator, so it reads `*+*`: an element right after another element. Only body matches: it comes after head. The dl, the p and the style are each the first child of their parent.
- the next `*` reads `*+* *`: everything inside body, so the two dl, p and style.
- then `*+* * *`: the inner dl, p and style.
- then `*+* * * *`: p and style.

None of these selectors has any weight, so the rule that comes later in the code wins. The deeper rules come later, so each element takes the values of the deepest rule that matches it.

### 3. One variable for five margins

Every element gets `margin:var(--m,-40 170)`. The rules below only set `--m`. A custom property is inherited, so `--m:-70 0` on body also reaches everything inside it, until a deeper rule sets a new value.

- html has no `--m`: it takes the fallback, `-40 170`.
- body: `-70 0`.
- outer dl: `-160`.
- inner dl: `20`.
- p: `40 20`.

### 4. html: the left and right bars

CSS Battle pages have no doctype, so they are in quirks mode. Lengths without a unit are px, and html fills the 400 × 300 page minus its margins. With 170 on each side, html is 400 − 340 = 60 wide. With −40 on top and at the bottom, it is 300 + 80 = 380 high, at (170, −40).

`border-block:solid 30vw#529CAF` gives it a blue band on top and one at the bottom. vw is 1% of the 400px width: 30vw = 120px. That leaves 380 − 240 = 140px of content between them.

Then `rotate:90deg` turns html around its center, (200, 150). My render gives a box of 380 × 60 at (10, 120). The two bands are now the left and right bars: 120 × 60 at (10, 120) and (270, 120).

### 5. body: the canvas and the top and bottom bars

html has no background, so body's background goes to the whole canvas. `#E775` is the short form of `#ee777755`: the red `#ee7777` with an alpha of 0x55 = 85/255, one third. Over the white page: 255 − 17 / 3 = 249.3 and 255 − 136 / 3 = 209.7. My render paints the canvas (249, 210, 210), `#f9d2d2`.

In quirks mode, body fills html's content minus its own margins. With `-70 0`, it is 60 wide and 140 + 140 = 280 high. It has the same blue bands, and its own quarter turn on top of html's: 90° + 90° = 180°. A box turned by 180° looks the same as before. My render gives 60 × 280 at (170, 10): the bands are the top bar, from y = 10 to 130, and the bottom bar, from 170 to 290.

### 6. The dotted borders

Inside body, `border:dotted#F8D2D1 32q` replaces the blue bands with a pink dotted border on all four sides. Q is a quarter of a millimeter: 32q = 32 × 96 / 25.4 / 4 = 30.24px, and my Chrome computes a 30px border. A dotted border that wide is a row of round dots, 30px across, with one dot at each corner and the others spread evenly along the side.

My render gives these three boxes:

- outer dl: `-160` all around makes it 60 + 320 = 380 wide and 360 high. It ends at 360 × 380 at (20, −40). Each side has 7 dots, corners included. The middle dots of the left and right sides sit at (35, 150) and (365, 150).
- inner dl: `20` all around makes it 280 × 260 at (60, 20). Each side has 5 dots. The middle ones sit at (75, 150), (325, 150), (200, 35) and (200, 265).
- p: `40 20` and `height:60` make it 180 wide and 60 + 60 = 120 high. It ends at 120 × 180 at (140, 60). Its short sides have 3 dots, with the middle ones at (200, 75) and (200, 225). Its long sides have 4 dots, with no middle one.

### 7. The turns add up

Each element turns 90° in the frame of its parent: html is at 90°, body at 180°, the outer dl at 270°, the inner dl at 360° and p at 450°. A quarter turn swaps a box's width and height. A half turn changes nothing you can see.

All the margins are the same on the left and the right, and on the top and the bottom. So every box has the same center as its parent, and in my render all five are centered on (200, 150). The turns never move a box: they only decide whether it lies flat or stands up. The middle dot of an odd row always falls on the line x = 200 or y = 150, right on a bar.

### 8. Dots that vanish

The dots are `#f8d2d1`, (248, 210, 209) in my render. The canvas is (249, 210, 210): one level away. On the background, the dots vanish. Only the eight that sit on a blue bar show, two per bar.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One `*` rule gives the turn, the margin and the blue bands to every element, and the nested rules narrow it down. `+*{` is 3 characters for body. With `body{` (186 characters), the picture is the same.
- `--m:` is 4 characters, `margin:` is 7. Four rules set `--m`, which saves 12 characters, and `var(--m,` plus `)` costs 9. With a plain `margin` in each rule and no variable (187 characters), the picture is the same.
- `rotate:90deg` is written once and counted five times, because each turn adds to the parent's. Without it (171 characters), 16,496 pixels change.
- `30vw` is 4 characters for 120px. With `120px` (185 characters), the picture is the same. A bare `120` (183 characters) does not work here: my Chrome drops the declaration, html and body get no blue bands, and 23,536 pixels change.
- `32q` is 3 characters for a 30px border. With `30px` (185 characters), the picture is the same. A bare `30` (183 characters) does not work either: my Chrome drops the declaration, the inner boxes keep the 120px blue bands, and 40,486 pixels change.
- `border-block` sets the top and bottom bands in one property. With `border-top` and `border-bottom` (214 characters), the picture is the same.
- `#E775` is 5 characters for the canvas color. With `#F8D2D1` (186 characters) or `#ee777755` (188 characters), the picture is the same.
- No space is needed before `#`: `30vw#529CAF` and `dotted#F8D2D1`. With `30vw #529CAF` (185 characters), the picture is the same.
- `<dl>` nests inside itself and has no default padding. With `<p><p><p>` (182 characters), each `<p>` closes the one before, the three p end up next to each other in body instead of one inside the other, and 11,314 pixels change. With `<ul><ul><p>` (184 characters), my Chrome gives each ul a left padding of 40px, and 8,062 pixels change. With `<div><div><p>` (186 characters) or `<dl><dl><dl>` (185 characters), the picture is the same.
- `height:60` is only needed on p: the other boxes get their size from their content or from quirks mode. Without it (174 characters), p is only as high as its two borders, 60px, the two dl around it get shorter, the dots move, and 9,889 pixels change.
- The code ends inside five rules: the end of the code closes them. With `}}}}}` at the end (189 characters), the picture is the same.
