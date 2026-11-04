---
title: "A dashed border, shrunk and flipped: a tooth in 101 characters"
lang: en
ref: 2026-10-17
permalink: /2026/10/17/a-dashed-border-shrunk-and-flipped/
description: "How one dashed border on a wide body, squeezed and flipped by scale:.6-1, draws the October 17, 2026 CSS Battle target."
target: /assets/targets/2026-10-17.png
target_url: https://cssbattle.dev/play/pX4BmQEORMGXlg74scvd
colors: ["#73493a", "#fef9ce", "#a6ba86"]
player: gunnar
chars: 101
score: 752.75
match: 100
code: |
  <style>&{background:#73493A;*{background:#FEF9CE;margin:65 59;border-top:53q dashed#A6BA86;scale:.6-1
---

The October 17 target is a pale yellow square on a chocolate brown background, with two sage green blocks in its bottom corners and a yellow strip between them. It looks like a tooth, or an apron. Gunnar Bittersmann draws it with `body` alone: a cream box with a dashed top border. The two dashes are the green blocks. The trick is to draw them on a box too wide for the target, then squeeze it with `scale`, and flip it so the top border ends up at the bottom.

{% include animations/2026-10-17.html lang=page.lang %}

## The code, spaced out

```css
& {                                  /* html */
  background: #73493A;
  * {                                /* html's children: only body shows */
    background: #FEF9CE;
    margin: 65 59;
    border-top: 53q dashed #A6BA86;
    scale: .6 -1;
  }
}
```

## How it works

### 1. A wide cream card

At the top level, `&` means `html`. Its brown background goes to the whole canvas. The nested `*` matches its children; `head` stays hidden, so only `body` shows.

`margin:65 59` leaves `body` 400 − 2 × 59 = 282px wide. In quirks mode, which CSS Battle uses, `body` stretches to the page height minus its margins: 300 − 2 × 65 = 170px. So a 282 × 170 cream card at (59, 65). That is too wide for the target's 170px square, on purpose.

### 2. A dashed border with two dashes

`border-top:53q dashed` is a 50px border: 53q is 50.08px, and the border is drawn 50px thick.

Chrome draws a dashed border with a whole dash at each end. Each dash is twice the border width long, here 100px, and the gap between dashes stretches to fill the side. On 282px there is room for two dashes: 100 | 82 | 100. That is the pattern of the target: two green blocks with a gap in the middle.

On a box that is already 170px wide, the same border would be one solid line: two 100px dashes don't fit. That is why the card starts wider.

### 3. scale:.6 squeezes it to the right width

`scale:.6 -1` scales the box around its center, (200, 150). Across, ×0.6 turns 282px into 169.2px, from x 115.4 to 284.6, and the dashes into 60 | 49.2 | 60. That is the target's square, with its two 60px green corners and the strip between them.

### 4. -1 flips it upside down

The second value, −1, flips the box vertically around y = 150. The card still covers y 65 to 235, but the top border is now at the bottom, from y 185 to 235. The green corners land where the target has them.

## Golf notes

- One element, one border, one transform. The dashes draw both green blocks, and the gap between them is free.
- `border-top` is 3 characters shorter than `border-bottom`. The flip that moves it down costs nothing: `.6-1` is as long as `.6 1`, since the minus sign also separates the numbers.
- `53q` gives 50px of border in 3 characters.
- The edges land 0.4px off the target's (115.4 instead of 115, and so on). In my local render, a few columns along those edges come out blended (392 pixels), but CSS Battle scores the solution as a 100% match.
- `<style>` is never closed, and neither are the two rules.
