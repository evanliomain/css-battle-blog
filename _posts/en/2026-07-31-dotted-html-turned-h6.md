---
title: "Dotted html, turned h6: a green II in 178 characters"
ref: 2026-07-31
permalink: /2026/07/31/dotted-html-turned-h6/
description: "How a dotted border on html gives the four half discs of the July 31, 2026 CSS Battle target, and how a rotated h6 with a pre inside it draws the pillars and the two slots."
target: /assets/targets/2026-07-31.png
target_url: https://cssbattle.dev/play/Fyddj98G3Aus7byaOz8c
colors: ["#6592cf", "#3f3642", "#a8d38b"]
player: selenit
chars: 178
score: 673.33
match: 100
code: |
  <h6><pre>.
  .<style>*{background:#6592CF;margin:20;border-block:var(--b,dotted#3F3642)64q;*{margin:-60 30;--b:solid#A8D38B;h6{margin:30 90-30 10;rotate:90deg}*{margin:-70%60 20-60
---

The July 31 target is a green shape on a blue background: two bars, four pillars, and two narrow blue slots, one from the bottom and one from the top. The four ends of the bars wear dark half discs. Ilya Streltsyn gets the half discs from a 60px dotted border on html, hidden by body's green border except at the ends. Then an h6 and the pre inside it, turned a quarter turn, make the pillars and the slots out of their own borders.

Use **Teaching colors** to tell the four borders apart, and to see h6 and pre before they turn.

{% include animations/2026-07-31.html lang=page.lang %}

## The code, spaced out

```css
<h6><pre>.
.<style>
* {                                          /* every element */
  background: #6592CF;                       /* html's blue covers the canvas; body, h6 and pre get it too */
  margin: 20;                                /* html: 360 × 260 at (20, 20) */
  border-block: var(--b,dotted#3F3642)64q;   /* html has no --b: a 60px dark dotted border */
  * {                                        /* html's descendants */
    margin: -60 30;                          /* body: 300 × 260 at (50, 20) */
    --b: solid#A8D38B;                       /* body, h6 and pre: a 60px solid green border */
    h6 {
      margin: 30 90-30 10;                   /* h6: 200 × 140 at (60, 110) */
      rotate: 90deg;                         /* h6 turns, and pre turns with it */
    }
    * {                                      /* pre, inside h6 */
      margin: -70%60 20-60                   /* pre: 200 × 140 at (0, 30), before the turn */
```

## How it works

### 1. Six elements, one border declaration

The HTML parser puts pre inside h6, the text `.` `.` (two lines) inside pre, and the unclosed style element inside pre too. With html, head and body, that makes six elements. head and style are not displayed, so the rules show on four boxes: html, body, h6 and pre.

`*` gives all of them the blue background, a 20px margin and the same border declaration: `border-block:var(--b,dotted#3F3642)64q`. `border-block` sets the top and bottom borders only. `64q` is 64 quarter millimeters, 60.47px, and Chrome draws 60px.

The style comes from the variable. html has no `--b`, so `var()` takes its fallback: `dotted#3F3642`. The nested `*{` sets `--b:solid#A8D38B` on all of html's descendants, so body, h6 and pre get a solid green border from the same declaration.

### 2. html: four dark discs per edge

There is no doctype, so the page is in quirks mode, and bare numbers like `20` are read as px. In quirks mode, html fills the 400 × 300 page, minus its margins: a 360 × 260 box at (20, 20). Its blue background is painted on the whole canvas: the root's background always is.

A 60px dotted border is a row of 60px discs. On a 360px edge, Chrome draws four of them, centered at x = 50, 150, 250 and 350, with 40px gaps. The top row is centered at y = 50, the bottom row at y = 250. Between the two borders, html's content box is 360 × 140, at (20, 80).

### 3. body: two green bars

body gets `margin:-60 30`. It starts in html's content box, so the top margin of -60 lifts it to y = 20, and the side margins of 30 make it 300 wide, from x = 50 to 350. In quirks mode, body fills html's content box, minus its margins: 140 + 60 + 60 = 260 tall, down to y = 280.

body's green borders are two bars, 300 × 60, at y = 20 to 80 and y = 220 to 280. They cover html's two borders from x = 50 to 350. The two middle discs of each row are gone, and only the outer halves of the end discs stay: from x = 20 to 50 and from x = 350 to 380. Those are the four half discs. Between the bars, body's content box is 300 × 140, at (50, 80), blue.

### 4. h6: 200 × 140

`h6{margin:30 90-30 10}` places h6 in body's content box: 10px from the left, 90px from the right, so 200 wide, from (60, 110). It has the same two 60px green borders.

Its content box is 20px tall. That is pre's margin box: pre is 60 + 20 + 60 = 140 tall, with margins of -140 and 20, so it takes 140 − 140 + 20 = 20. h6 is then 140 tall, from y = 110 to 250. Its bottom margin of -30 brings its margin box back to 30 + 140 − 30 = 140: exactly body's content box. With a bottom margin of 0, body grows to 290 tall and its bottom bar moves 30px down.

### 5. pre: inside h6, 140px higher

pre's margin is `-70%60 20-60`. A percentage margin is taken from the width of the containing block, here h6's 200px content box: -70% is -140px, even for the top margin. So pre goes up 140px. The right margin of 60 and the left margin of -60 keep it 200 wide and move it 60px to the left: before the turn, pre is a 200 × 140 box at (0, 30).

Its bottom border, from y = 110 to 170, lands exactly on h6's top border. Its content box, from y = 90 to 110, holds the two lines of text. h6 shrinks the font: h6 is 10.72px, and pre, in a monospace font, is 8.71px. Each line is 10px tall, so two lines make the 20px.

### 6. A quarter turn

`rotate:90deg` turns h6 around its center, (160, 180). pre is inside h6, so it turns with it. A point (x, y) goes to (340 − y, x + 20):

- h6 goes to (90, 80), 140 × 200. Its two borders become pillars from x = 90 to 150 and from x = 170 to 230, and its 20px content box becomes a slot from x = 150 to 170, y = 80 to 280.
- pre goes to (170, 20), 140 × 200. Its borders become pillars from x = 170 to 230 (on top of h6's) and from x = 250 to 310, and its content box becomes a slot from x = 230 to 250, y = 20 to 220.

h6 and pre are painted over body. Their blue background cuts the slots through body's bars: h6's from y = 220 to 280 at the bottom, pre's from y = 20 to 80 at the top. The two blue notches on the left and the right, from x = 50 to 90 and from x = 310 to 350, are body's content box, still bare.

## Golf notes

- One `border-block` declaration draws all four borders. The `--b` variable switches its style and color: dotted dark on html, which has no `--b`, solid green everywhere else. Two plain declarations, `border-block:dotted#3F3642 64q` and `border-block:solid#A8D38B 64q`, give the same picture with 183 characters, 5 more.
- `64q` is 3 characters for a border Chrome draws 60px wide. `60px` gives the same picture with 4.
- `-70%` is -140px here, the same length as `-140`. But `%` ends the value, so the next one needs no space: `-70%60` is 6 characters, `-140 60` is 7, for the same picture.
- No space before a minus sign either: in `90-30` and `20-60`, the `-` starts a new value. In `dotted#3F3642` and `solid#A8D38B`, the `#` does the same, and in `)64q`, the parenthesis does.
- The `background` is on `*`, not only on html: h6 and pre need it to cut the slots through body's bars. With the background on html only (`html{background:#6592CF}*{`), the two slots stop at the bars, and 2,398 pixels change.
- One rotation turns two boxes: pre is inside h6, so `rotate:90deg` is written once.
- `<h6>` sets the size of the text, so the two lines of `.` make exactly 20px. With `<h5>`, the lines are 13px, both slots are 26px wide, and 6,925 pixels change. With a single `.`, 2 characters shorter, both slots are 10px wide, and 6,368 pixels change.
- `h6{` is more specific than `*{`, so h6 keeps its margin even though the last `*{` rule matches it too and comes later. That lets the last rule be pre's, and leave it open.
- Nothing is closed: three `*{` stay open, and neither style, pre nor h6 is closed. With `}}}` at the end, the code is 181 characters and the picture is the same.

## If you try it at home

In my Chrome, 324 pixels differ from the target by more than 8 on one channel. 310 of them are on the edges of the four half discs, at x ≤ 50 or x ≥ 350. The other 14 are two small black marks at the top of the upper slot, around (232, 22) and (242, 22): the two periods of the text, drawn at the start of each line after the turn. When I add `color:#0000` to the first rule, those 14 pixels turn blue. The CSS Battle judge gives the code a 100% match.
