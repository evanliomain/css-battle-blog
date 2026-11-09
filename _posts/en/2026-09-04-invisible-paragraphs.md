---
title: "Invisible paragraphs: bars and squares in 121 characters"
lang: en
ref: 2026-09-04
permalink: /2026/09/04/invisible-paragraphs/
description: "How three paragraphs the color of the background, with three shadows each, draw the September 4, 2026 CSS Battle target: four yellow bars and three small squares."
target: /assets/targets/2026-09-04.png
target_url: https://cssbattle.dev/play/IIybN3XMPLYHSO3ij2ge
colors: ["#4a9a86", "#edec84"]
player: emohdaziz
chars: 121
score: 726.24
match: 100
code: |
  <p><p a><p><style>*{background:#4a9a86;margin:50 30-30;p{height:20;color:EDEC84;box-shadow:0 5vw,0-5vw,5vw 0}[a]{scale:-1
---

The September 4 target is pale yellow on green: four long bars stacked with gaps between them, and three small squares on their sides, two on the right and one on the left. Mohamed Ali's solution uses three paragraphs that cannot be seen: they have the same green as the background. Only their shadows show: one above and one below each paragraph make the bars, and one to the right sticks out as a small square. The middle paragraph is flipped, so its square lands on the left.

Use **Teaching colors** to see the right-hand shadows in orange.

{% include animations/2026-09-04.html lang=page.lang %}

## The code, spaced out

```css
<p><p a><p>                        /* three paragraphs, the middle one marked */
<style>
* {
  background: #4a9a86;
  margin: 50 30 -30;
  p {
    height: 20;
    color: EDEC84;                 /* a hex with no # works in quirks mode */
    box-shadow: 0 5vw, 0 -5vw, 5vw 0;   /* below, above, right */
  }
  [a] { scale: -1 }                /* the middle p, flipped */
}
```

## How it works

### 1. Three invisible p

`*` gives every element the green background and `margin:50 30-30`: 50 at the top, 30 on the sides, −30 at the bottom. `html` starts at (30, 50), the `body` 50 and 30 further in, at (60, 100). The `<p>` run from x = 90 to 310, 220 wide, and `p{height:20}` makes them 20 tall.

The first `<p>`'s top margin merges with the `body`'s, so it starts at y = 100. Between two `<p>`, the −30 bottom margin of one and the 50 top margin of the next merge into a single margin: 50 − 30 = 20. So the `<p>` sit at y = 100, 140 and 180. They are green on green: invisible.

### 2. Shadows above and below

Each `<p>` has three shadows with no color, so in the text color: `color:EDEC84`, a hex with no `#` that quirks mode accepts. `5vw` is 5% of 400 = 20px.

`0 5vw` is a copy 20px lower, `0-5vw` a copy 20px higher. Each `<p>` gets a yellow bar right above and right below it. The gaps between the `<p>` are exactly 20px, so the bar below one `<p>` and the bar above the next fall on the same spot. That gives four bars, at y = 80, 120, 160 and 200, with the green `<p>` as the gaps.

### 3. A shadow on the right: a square

`5vw 0` is a copy 20px to the right, from x = 110 to 330. A shadow is never painted under its own box, so the part from 110 to 310 is hidden by the `<p>` itself, and only the last 20px stick out: a small yellow square from x = 310 to 330, at the height of the `<p>`.

### 4. The middle p, flipped

The middle paragraph is `<p a>`, matched by `[a]`. `scale:-1` flips it on both axes around its centre, (200, 150). Its shadows above and below swap places, which changes nothing. But its right shadow now points left: its square moves to x = 70 to 90.

## Golf notes

- The `<p>` have the background color, so they show nothing themselves: their shadows do all the drawing.
- `0 5vw,0-5vw` on 20px tall boxes spaced 20px apart gives four bars from three boxes.
- The third shadow is mostly hidden under its own box: a 20px square for free.
- `scale:-1` on one `<p>` moves its square to the other side, without a second shadow list.
- `margin:50 30-30` serves `html`, the `body` and the `<p>`: the merged margins give the 20px gaps.
- No closing braces, and `<style>` is never closed.
