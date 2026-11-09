---
title: "Three boxes, one border: a yellow frame in 130 characters"
lang: en
ref: 2026-09-20
permalink: /2026/09/20/three-boxes-one-border/
description: "How zoom:10 and one border shared by html, the body and an hr draw the September 20, 2026 CSS Battle target: a yellow frame on two feet."
target: /assets/targets/2026-09-20.png
target_url: https://cssbattle.dev/play/2R2qUfqneVtkaggWFkh5
colors: ["#51a499", "#fee190"]
player: benjamintordjman
chars: 130
score: 715.87
match: 100
code: |
  <hr size=3><style>*{margin:2-4 3;border:4px solid#FEE190}&,hr{border-block:0;margin:14-6-7}&{background:#51A499;zoom:10;margin:5 8
---

The September 20 target is a yellow frame on teal: two posts, two bars between them, and a small foot sticking out at the bottom of each post. Benjamin Tordjman's solution zooms the page by 10 and gives every element the same 4px yellow border. `html` keeps only its left and right borders: the posts. The `body` keeps all four: the bars. A one-pixel `<hr>` keeps only its sides: the feet.

Use **Teaching colors** to see which element draws which part.

{% include animations/2026-09-20.html lang=page.lang %}

## The code, spaced out

```css
<hr size=3>                        /* a 1px tall rule */
<style>
* {
  margin: 2 -4 3;                  /* for the body */
  border: 4px solid #FEE190;       /* 40px on screen */
}
&, hr {                            /* html and the hr */
  border-block: 0;                 /* no top or bottom border */
  margin: 14 -6 -7;                /* for the hr */
}
& {                                /* html */
  background: #51A499;
  zoom: 10;                        /* everything is 10 times bigger */
  margin: 5 8;
}
```

## How it works

### 1. zoom:10: a 24 × 21 html

At the top level of a style sheet, a lone `&` matches the root, `html`. `zoom:10` scales `html` and everything in it by 10: all lengths below are CSS pixels, shown ten times bigger. The 400 × 300 frame is only 40 × 30 CSS pixels.

`margin:5 8` puts `html` at (8, 5), 40 − 8 − 8 = 24 wide. Without a doctype, the page is in quirks mode, and `html` would be 30 − 5 − 5 = 20 tall; here its content makes it 21 (step 4). On screen, it runs from x = 80 to 320 and from y = 50 to 260.

### 2. border-block:0: two posts

`*` gives every element `border:4px solid#FEE190`, `html` included. `&,hr{border-block:0}` removes the top and bottom borders of `html`. Only the left and right ones are left: 4 wide, 40px on screen, as tall as `html`. Those are the two posts.

### 3. The body: two bars

The `body` keeps its border on all four sides. It gets `margin:2-4 3` from `*`: 2 at the top, −4 on the sides, 3 at the bottom. The −4 side margins pull it under `html`'s side borders, so it is 24 wide too, from x = 80 to 320, starting at y = 70.

Its top and bottom borders are the two bars, 40px tall on screen. Its side borders lie under the posts, in the same color. The `body` has no background, so its inside shows the teal canvas: the hole.

### 4. The hr: two feet

`<hr size=3>` is a horizontal rule. In Chrome, `size=3` makes it 1 CSS pixel tall: 3 minus its top and bottom borders. `&,hr` removes those borders, and `*` gives it the 4 wide side borders. `margin:14-6-7` widens it by 6 on each side, so it runs from x = 60 to 340 on screen, and its side borders are two 40 × 10 blocks: the feet, at y = 250. They join the bottom of the posts.

The −7 bottom margin also sets the heights. The `hr` starts 14 below the top of the `body`'s content and ends 7 back up: the `body`'s content is 14 + 1 − 7 = 8 tall, which is the 80px hole. The `body` is then 4 + 8 + 4 = 16 tall, and with its margins, `html`'s content ends at 2 + 16 + 3 = 21: that is the height of the posts.

## Golf notes

- `zoom:10` turns every length into one digit: `5 8`, `2-4 3`, `14-6-7` and `4px`.
- One border rule draws all six yellow parts; `border-block:0` keeps only the sides for two of the three boxes.
- `&,hr` shares `border-block:0` and the margin between `html` and the `hr`; the `&` rule after it gives `html` its own margin.
- `<hr size=3>` is a 1 tall box in 11 characters, with no `height`.
- The `hr`'s negative bottom margin sets the size of the hole and the height of the posts at once.
- No closing brace, and `<style>` is never closed.
