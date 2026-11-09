---
title: "One shadow list, two boxes: a pink stadium in 145 characters"
lang: en
ref: 2026-09-23
permalink: /2026/09/23/one-shadow-list-two-boxes/
description: "How one list of four box shadows, shared by html and the body, draws the September 23, 2026 CSS Battle target: a pink stadium with two windows and two notches."
target: /assets/targets/2026-09-23.png
target_url: https://cssbattle.dev/play/eC6qs1TR3GCyGderlYYF
colors: ["#8e3b66", "#f5a7a7"]
player: h_blierzt
chars: 145
score: 700.43
match: 100
code: |
  <style>*{background:#8E3B66;color:8F3B66;margin:-204 50 364;box-shadow:0-269q#F5A7A7,0 64q,-53q 32q,53q 32q}&{border-radius:5in;margin:76%140-204
---

The September 23 target is a pink stadium on a plum background, with two small plum windows in the middle and a notch on each side. H_Bliertz's solution puts `html` below the canvas, and gives `html` and the `body` the same list of four shadows. On `html`, only the pink shadow reaches the canvas: it is the stadium. On the `body`, the pink one leaves through the top, and only the three plum ones land on the stadium: a window and the two notches.

Use **Teaching colors** to see the plum shadows in a darker color.

{% include animations/2026-09-23.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html and body */
  background: #8E3B66;
  color: 8F3B66;                   /* almost the background color */
  margin: -204 50 364;             /* for the body */
  box-shadow:
    0 -269q #F5A7A7,               /* pink, 254.2px up */
    0 64q,                         /* 60.47px down */
    -53q 32q,                      /* 50.08px left, 30.24px down */
    53q 32q;                       /* 50.08px right, 30.24px down */
}
& {                                /* html */
  border-radius: 5in;              /* scaled down to 60px: a stadium */
  margin: 76% 140 -204;            /* 120 × 200, from y = 304 */
}
```

## How it works

### 1. html, below the canvas

At the top level of a style sheet, a lone `&` matches the root, `html`. It is more specific than `*`, so `html` takes the `&` margin.

`margin:76%140-204` sets the top, the sides and the bottom. A margin in % uses the width: 76% of 400 is 304. With 140 on each side, `html` is 120 wide, from x = 140 to 260. Without a doctype, the page is in quirks mode, and `html` takes the height its margins leave: 300 − 304 + 204 = 200. So `html` is a 120 × 200 box from y = 304 to 504, fully below the canvas.

`border-radius:5in` is 480px per corner, far too much: Chrome scales every radius down until they fit, here to 60px. The box is a stadium: a rectangle with two half-circle ends.

### 2. The first shadow moves up

`html`'s background is used for the whole canvas, so the canvas is plum. But its shadows stay tied to its box, with the same round corners. `0-269q#F5A7A7` moves a pink copy 269 quarter-millimetres up: 254.2px. The pink stadium now runs from y = 49.8 to 249.8: that is the shape.

### 3. Three shadows off the canvas

The other three shadows have no color, so they use the text color: `color:8F3B66`, a hex with no `#` that quirks mode accepts. It is 1 away from the background color `#8E3B66`, too close to see.

On `html`, they move 60.47px down, and 50.08px left or right with 30.24px down. Since `html` starts at y = 304, all three land below the canvas: they are never seen.

### 4. The body: the top window

The `body` gets everything from `*`, including `margin:-204 50 364`. Inside `html`'s 120px, it is 120 − 50 − 50 = 20 wide, from x = 190 to 210. Its −204 top margin pulls it up to 304 − 204 = 100.

In quirks mode, the `body` fills `html` minus its own margins: 200 + 204 − 364 = 40. So it is a 20 × 40 box from y = 100 to 140. Its plum background, from `*`, is painted over the pink shadow of `html`: the top window.

### 5. The same shadows on the body

The `body` has the same list of four shadows, around its own box. The pink one moves 254.2px up, to y = −154: off the top of the canvas.

The other three land on the stadium, in the background color. `0 64q` puts a plum copy 60.47px lower, from y = 160.47 to 200.47: the bottom window. `-53q 32q` and `53q 32q` put two more 50.08px to the left and to the right, 30.24px lower, from y = 130.24 to 170.24. They sit on the edges of the stadium, at x = 140 to 160 and 240 to 260: the two notches.

## Golf notes

- One shadow list, written once in `*`, does two jobs: where `html` and the `body` sit decides which shadows land on the canvas.
- Putting `html` below the canvas hides three of its shadows for free.
- `color:8F3B66` colors three shadows, with no `#`, 1 away from the background.
- `5in` is a cheap "as round as possible" radius: it gets scaled down to fit.
- Quarter-millimetres give the odd offsets in 3 or 4 characters: `269q`, `64q`, `53q`, `32q`.
- No closing brace, and `<style>` is never closed.
