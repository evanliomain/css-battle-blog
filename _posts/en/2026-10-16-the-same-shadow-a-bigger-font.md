---
title: "The same shadow, a bigger font: a plug in 185 characters"
lang: en
ref: 2026-10-16
permalink: /2026/10/16/the-same-shadow-a-bigger-font/
description: "How one shadow list, shared by html, body and an h3 with a bigger font, draws the October 16, 2026 CSS Battle target, an electric plug."
target: /assets/targets/2026-10-16.png
target_url: https://cssbattle.dev/play/YPjOurDuyM7W6juGDTKS
colors: ["#f3ead2", "#d96c7b", "#4c455b"]
player: emohdaziz
chars: 185
score: 668.6
match: 100
code: |
  .<h3><style>*{background:#f3ead2;margin:0 175 60%205;box-shadow:90Q 0,-90Q 0,0 20ch;color:D96C7B;*{margin:-50 30 85-30;color:4C455B;*{padding:55 110;margin:-85;border-radius:0 0 2in 2in
---

The October 16 target looks like an electric plug on a cream background: a big dark violet half disc, flat side up, two pairs of bars (violet and pink) coming out of the top edge, and a shorter pair under the disc. Mohamed Ali draws it with one list of three shadows, given to three nested boxes: `html`, `body` and an `h3`. Each box draws three copies of itself. The `h3` has a bigger font, so its `20ch` is longer, and that one shadow drops the half disc into place.

{% include animations/2026-10-16.html lang=page.lang %}

## The code, spaced out

```css
/* before <style>: a "." text and an <h3> */
* {                                  /* html */
  background: #f3ead2;
  margin: 0 175 60% 205;
  box-shadow: 90Q 0, -90Q 0, 0 20ch;
  color: D96C7B;                     /* pink shadows */
  * {                                /* body */
    margin: -50 30 85 -30;
    color: 4C455B;                   /* violet shadows */
    * {                              /* h3 */
      padding: 55 110;
      margin: -85;
      border-radius: 0 0 2in 2in;
    }
  }
}
```

Every element matches the outer `*`, so all three boxes get the background and the shadows. The nested rules come later, with the same weight, so their margins win on `body` and on the `h3`.

## How it works

### 1. html: a 20 × 60 box

`margin:0 175 60%205`: a percentage margin is a share of the width, even at the bottom, so 60% is 240px. `html` is 400 − 175 − 205 = 20px wide. In quirks mode, which CSS Battle uses, it is as tall as the page minus its margins: 300 − 240 = 60px. A 20 × 60 box at (205, 0).

Its cream background is painted on the whole canvas, so the box itself shows nothing.

### 2. html's shadows: the three pink bars

The shadows have no color, so they use `color`. In quirks mode `color` accepts `D96C7B` without the `#`: pink.

- `90Q 0` and `-90Q 0` copy the box 85px to the right and to the left (90Q is 85.04px): the pink bars at x 290 and x 120, from y 0 to 60.
- `0 20ch` copies it 160px down: one `ch` is 8px at the default 16px font. That is the pink bar at x 205, from y 160 to 220.

### 3. body: the same shadows, in violet

The nested `*` gives `body` `margin:-50 30 85-30` and `color:4C455B`. Inside `html`'s 20px-wide content, that puts it at x 205 − 30 = 175, still 20px wide, and 50px above the canvas.

Its height comes from quirks mode too: `body` stretches to the bottom of `html` minus its bottom margin. That margin is 85, but the `h3` inside has a bottom margin of −85, and the two merge into 0. So `body` ends at y = 60, like `html`: a 20 × 110 box from y −50 to 60.

The same three shadows, now violet: bars at x 260 and x 90 (only y 0 to 60 is on the canvas), and one at x 175, from y 110 to 220.

### 4. The dot and the h3

The `.` written before `<h3>` is a text node at the top of `body`: one line, 18px tall, from y −50 to −32, off the canvas. Its job is to keep the `h3` away from the top of `body`. Without it, the `h3`'s top margin would merge with `body`'s, and the `h3` would end up 32px lower, at y = −85, with the half disc 32px too low.

The `h3` comes under that line. `margin:-85` pulls its left edge to x = 175 − 85 = 90, and `padding:55 110` makes it a 220 × 110 box with nothing inside (the padding alone is wider than the 190px the margins leave). The top margin of −85 pulls it up to y = −32 − 85 = −117. So it sits at (90, −117), above the canvas.

`border-radius:0 0 2in 2in` asks for 192px corners at the bottom. Two of them don't fit across 220px, so the browser scales them down to 110px: the bottom of the box becomes a half circle. The `h3` is a half disc, in cream, off the canvas.

### 5. The h3's bigger font drops the half disc

The `h3` gets the same three shadows, in the violet it inherits from `body`. But a heading has a bigger font: 1.17em, 18.72px. A `ch` is about 9.35px there, so `20ch` is about 187px, not 160.

`0 20ch` moves the half disc from y −117 to y 70: the half disc of the target, from y 70 to 180. It is painted after `html` and `body`, so it covers the top of the two lower bars, which show only from y 180 down. `90Q 0` and `-90Q 0` move the `h3` sideways and stay above the canvas.

## Golf notes

- One shadow list, three boxes: the pink comes from `html`'s `color`, the violet from `body`'s, and the `h3` inherits it.
- `20ch` gives two lengths for the price of one: 160px at 16px, about 187px in the `h3`'s font.
- `60%205`: a `%` ends the number, no space needed. 60% of the width is 240px in 3 characters.
- A single `.` costs 1 character and stops two margins from merging.
- `90Q` is 85.04px, close enough to 85: in my local render, the bar edges come out slightly blended (451 pixels), but CSS Battle scores the solution as a 100% match.
- `<style>` is never closed, and neither are the nested rules.
