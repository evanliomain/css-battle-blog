---
title: "A border with a stadium-shaped hole: a four-petal flower in 144 characters"
lang: en
ref: 2026-11-23
permalink: /2026/11/23/a-border-with-a-stadium-hole/
description: "How a giant border on html, a radius too big to fit and one radial gradient shared with the body draw the November 23, 2026 CSS Battle target: a four-petal flower with a slate ring at its heart."
target: /assets/targets/2026-11-23.png
target_url: https://cssbattle.dev/play/d3CuehIATuNu3MvLxn8U
colors: ["#cf6939", "#2f434e", "#f8b140"]
player: benjamintordjman
chars: 144
score: 701.39
match: 100
code: |
  <style>*{margin:35-35;border-radius:9in;background:radial-gradient(1q,#CF6939 5q,#2F434E 0 16q,#CF6939)}&{margin:-146-61;border:6cm solid#F8B140
---

The November 23 target shows a brick orange flower on a golden background: two 140 × 70 stadiums crossed at the center, one lying and one standing, with a slate ring at its heart. Benjamin Tordjman draws the standing stadium as a hole: `html` gets a border so thick it covers the whole canvas, except a small box in the middle that its oversized radius turns into a stadium. The `body` is the lying stadium. Both share one background, and its ring lands at the same spot on both.

The **wide view** shows the whole of `html`, a 522 × 592 stadium, and the **teaching colors** paint its border blue.

{% include animations/2026-11-23.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                   /* html and the body */
  margin: 35 -35;                     /* kept by the body only */
  border-radius: 9in;                 /* 864px: far too big, shrunk to fit */
  background: radial-gradient(1Q,     /* a tiny circle: 0.94px */
    #cf6939 5Q,                       /* orange up to 4.72px */
    #2f434e 0 16Q,                    /* slate from 4.72 to 15.11px */
    #cf6939);                         /* orange again, from 15.11px */
}
& {                                   /* html, the root */
  margin: -146 -61;                   /* box: 522 × 592 */
  border: 6cm solid #f8b140;          /* 226px of background color */
}
</style>
```

## How it works

### 1. Two rules, two boxes

`*` targets every element: `html`, `head`, `style` and the `body`. `head` and `style` are hidden, so only `html` and the `body` show what it sets. `&` alone, outside any rule, means the root: `html`. Its margins replace the ones from `*`, and only `html` gets the border. In quirks mode, `-146-61` and `35-35` are px: the minus sign separates the two numbers, like a space would.

In quirks mode, `html` fills the window minus its margins. I measured it at x = −61, y = −146, 522 wide (400 + 2 × 61) and 592 tall (300 + 2 × 146). It sticks out of the canvas on every side.

### 2. A border that covers everything but a hole

`6cm` is 226.77px, and Chrome draws the border at 226px: that is what I measured. The box keeps its size, so the inside shrinks: 522 − 2 × 226 = 70 wide and 592 − 2 × 226 = 140 tall. This 70 × 140 box starts at x = −61 + 226 = 165 and y = −146 + 226 = 80, so it runs from 165 to 235 and from 80 to 220.

The border has the target's background color and covers the rest of the canvas. To check, I made it red: the whole canvas turned red, except the flower.

### 3. A radius too big for the box

`9in` is 864px. A 522px side cannot hold two 864px corners. In that case, the browser shrinks all the radii by the same factor, chosen so that they fit on the tightest side: 522 / (2 × 864). Every corner of `html` becomes 261px, half its width. The outside of `html` is a 522 × 592 stadium.

On the inner edge of a border, a corner's radius is the outer radius minus the border: 261 − 226 = 35. The 70 × 140 hole becomes a stadium with 35px ends: the top and bottom petals. With a smaller radius, say 200, the inner corners would be square.

### 4. One ring, on the canvas

`html` has a background, so it goes to the canvas, placed on `html`'s padding box: the 70 × 140 hole, centered on (200, 150). It also repeats in 70 × 140 tiles all over the canvas. I checked that with a thinner border: copies of the ring show up every 70px across and 140px down. Here, the border hides them all.

`radial-gradient(1Q, …)` has a 1Q circle as its shape: 0.94px. The color stops are lengths, so they don't depend on it. The orange runs up to 5Q = 4.72px, and the slate goes from there (the `0` means "right where the last one ended") to 16Q = 15.11px. The last orange has no position, so it would sit at 100% of the shape: 0.94px. That is before 15.11, so it is pulled up to 15.11, and the orange starts sharp. The result is a slate ring from 4.72 to 15.11px around (200, 150).

### 5. The body: the other stadium

In quirks mode, the `body` fills `html`'s content box minus its own margins. Its height is 140 − 2 × 35 = 70, and its width is 70 + 2 × 35 = 140, because the negative margins widen it. I measured it at x = 130, y = 115, 140 × 70. The same `9in` shrinks to 35 there, half of 70: the left and right petals.

The `body` keeps its own background, since `html` has one already. Its radial gradient is centered on its own box, so on (200, 150) too: its ring lands right on the canvas one. The `body` is painted over `html`'s border, and the flower is complete.

## Golf notes

- `*` writes the radius and the background once for two boxes, and `&` is one character for `html`.
- The border paints the background color and cuts the hole at the same time. `margin` + `border` give its position: −146 + 226 = 80 and −61 + 226 = 165.
- `9in` is 3 characters for "as round as possible": any radius from 261px up gives the same result here.
- `6cm` writes 226px in 3 characters.
- `1q` makes the shape tiny, so the last orange starts sharp at 16q. Without it, the shape would reach the far corner of the box and the slate would fade into orange.
- Both boxes are centered on (200, 150), so the gradient needs no position.
- `35-35` and `-146-61` need no space, `solid#F8B140` neither, and the last rule is never closed.
