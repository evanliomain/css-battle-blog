---
title: "A notched border: a flag in 151 characters"
lang: en
ref: 2026-09-13
permalink: /2026/09/13/a-notched-border/
description: "How corner-shape:notch, a huge outline and two scaled boxes draw the September 13, 2026 CSS Battle target: a white flag with a brown outline on a pole."
target: /assets/targets/2026-09-13.png
target_url: https://cssbattle.dev/play/cubFEvfArqYmYhs3IHF4
colors: ["#7253bc", "#391b1b", "#ffffff"]
player: koda_pig
chars: 151
score: 694.85
match: 100
code: |
  <style>*{border:5ch solid#391B1B;scale:.5;margin:-290 250-470-60}&{margin:-15 60 75;corner-shape:notch;border-radius:0 43%/5ch;outline:9cm solid#7253BC
---

The September 13 target is a white flag on a purple background: a thick brown outline in the shape of a flag, with a step at the top right and another at the bottom left, and a brown pole on its left. koda_pig's solution draws the flag with `html`'s border, cut into steps by `corner-shape:notch`. A huge purple `outline` follows that shape and covers everything around it. The `body`, with no width at all, is the pole.

Use **Teaching colors** to see the `body` in orange.

{% include animations/2026-09-13.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html and body */
  border: 5ch solid #391B1B;       /* 40px */
  scale: .5;                       /* half size */
  margin: -290 250 -470 -60;       /* for the body */
}
& {                                /* html */
  margin: -15 60 75;               /* 280 × 240 */
  corner-shape: notch;             /* square steps, not curves */
  border-radius: 0 43% / 5ch;      /* 120.4 × 40 at two corners */
  outline: 9cm solid #7253BC;      /* purple everywhere else */
}
```

## How it works

### 1. html, scaled by half

At the top level of a style sheet, a lone `&` matches the root, `html`, and wins over `*`. `margin:-15 60 75` sets the top, the sides and the bottom. `html` is 400 − 60 − 60 = 280 wide. Without a doctype, the page is in quirks mode, and `html` takes the height its margins leave: 300 + 15 − 75 = 240.

`*` gives it a `5ch` border, 5 × 8 = 40px, and `scale:.5`, which halves it around its centre, (200, 105). On screen, `html` is a 140 × 120 box from x = 130 to 270 and y = 45 to 165, with a 20px brown border.

### 2. corner-shape:notch: two steps

`border-radius:0 43%/5ch` sets the corner sizes: before the `/`, the widths (0 for top-left and bottom-right, 43% of 280 = 120.4 for top-right and bottom-left), after it, the heights (40 for every corner). Normally that would round two corners into flat ellipses.

`corner-shape:notch` changes how a corner is drawn: instead of a curve, it is a square notch of that size. The top-right and bottom-left corners each lose a 120.4 × 40 rectangle, 60.2 × 20 on screen. The border follows the notch, so its inner edge has the same steps: that is the flag's outline.

### 3. The outline covers the rest

`outline:9cm solid#7253BC` draws a 9cm (340px) purple outline around `html`'s border. An outline follows the corners of its box, notches included, so it hugs the flag's shape and covers the whole canvas around it.

`html` has no background, so inside the border the canvas shows: white. That is the flag.

### 4. The body: the pole

The `body` gets `margin:-290 250-470-60` from `*`. Inside `html`'s 200px of content, a −60 left margin and a 250 right margin leave 200 + 60 − 250 = 10 for its border box, less than its 40 + 40 of border: the `body` has no content width and is only its border, 80 wide.

In quirks mode, the `body` fills `html`'s content height, 160, minus its own margins: 160 + 290 + 470 = 920 tall, including its borders. It is scaled by `.5` too, inside the scaled `html`, so a quarter of its size on screen: 20 × 230, from x = 130 to 150 and y = 35 to 265. It runs along the flag's left edge, from above it to far below: the pole.

## Golf notes

- `corner-shape:notch` turns `border-radius` into square cuts: one value makes both steps of the flag.
- `0 43%/5ch` uses one width for two corners and 0 for the other two, and one height for all four.
- A huge `outline` follows the cut corners: it paints the background around the flag, while the inside stays white.
- `scale:.5` in `*` halves `html` and the `body` twice: big margins like `-290` and `-470` end up as short moves.
- The `body` is squeezed to 0 content width by its margins, so its border alone is the pole.
- No closing brace, and `<style>` is never closed.
