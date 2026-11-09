---
title: "One gradient, two sizes: a pink pouch in 155 characters"
lang: en
ref: 2026-09-26
permalink: /2026/09/26/one-gradient-two-sizes/
description: "How one radial gradient, measured in ex, draws both the background and the two dots of the September 26, 2026 CSS Battle target."
target: /assets/targets/2026-09-26.png
target_url: https://cssbattle.dev/play/cRbtp0spzhZ0a6BHgeqN
colors: ["#747992", "#eed9d9", "#394257"]
player: koda_pig
chars: 155
score: 691.3
match: 100
code: |
  <p> <style>p{zoom:.4;background:#394257}*{background:radial-gradient(1q,#747992 23ex,#EED9D9)166%-5q/70%;margin:50;+*{border-radius:0 0 53q 53q;font:1q/67'
---

The September 26 target is a pink shape on a blue-gray background: square at the top, rounded at the bottom, with a navy band along its top edge and two small blue-gray dots. koda_pig's solution gives the same radial gradient to every element. On `html`, its circle is so big that it fills the canvas. On the `body`, a tiny font shrinks that same circle into two dots. The navy band is a paragraph that holds a single no-break space.

Use **Teaching colors** to see the gradient's circle in a lighter blue.

{% include animations/2026-09-26.html lang=page.lang %}

## The code, spaced out

```css
<p>&nbsp;                         /* a real no-break space: 1 character */
<style>
p {
  zoom: .4;                       /* margins 20px, line about 25px */
  background: #394257;            /* the navy band */
}
* {
  background:
    radial-gradient(1q, #747992 23ex, #EED9D9)
    166% -5q / 70%;               /* position / width of the tile */
  margin: 50;
  + * {                           /* the body */
    border-radius: 0 0 53q 53q;   /* 50.08px at the bottom */
    font: 1q / 67 '';             /* 0.94px font, line height 67 */
  }
}
```

## How it works

### 1. html's gradient covers everything

`*` gives every element `margin:50` and the same background. `html` sits from (50, 50) to (350, 250), and its background is used for the whole canvas.

The background is a tile: `/70%` sets its width to 70% of `html`, 210px. With no height, a gradient tile is as tall as the box: 200px. In each tile, `radial-gradient(1q,…)` draws a circle with a radius of `1q`, 0.94px. The first color, `#747992`, goes up to `23ex`. The second color has no position, so it would sit at the end of the circle, 0.94px, but a color stop cannot come before the one listed before it: it moves up to `23ex` too. The result is a sharp blue-gray disc of radius `23ex`, with pink outside.

`ex` is the height of a small "x" in the current font. With the default 16px font, it is 7.18px here, so `23ex` is 165px. The farthest corner of a 210 × 200 tile is 145px from its centre: the disc covers every tile, and the canvas is all blue-gray.

### 2. The body, rounded at the bottom

Nested in `*`, `+*` matches an element that comes right after another one: the `body`, right after the `head`. The `<p>` is the first child of the `body`, so it does not match.

The `body` has the same 50px margin, inside `html`: it starts at (100, 100) and is 200px wide. Without a doctype, the page is in quirks mode, and the `body` fills `html`'s height: 200 − 50 − 50 = 100px. `border-radius:0 0 53q 53q` rounds its two bottom corners by 50.08px. Its background is the same gradient, so for now it is blue-gray too.

### 3. font:1q: the circle shrinks

`font:1q/67'` gives the `body` a 1q font (0.94px), a line height of 67, and the family `''`: the string is never closed, and the end of the style sheet closes it.

`ex` follows the font. With a 0.94px font, `23ex` is only 9.7px. The `body`'s tiles are 70% of 200 = 140px wide and 100px tall, and each one now holds a small blue-gray dot of radius 9.7 at its centre, on pink.

### 4. 166% -5q: two dots

A background position in % uses the free space: the box width minus the tile width. 166% × (200 − 140) = 99.6px, so the tile starts 99.6px into the `body`, and its dot is at x = 100 + 99.6 + 70 = 269.6. `-5q` moves the tile 4.72px up: the dot is at y = 145.28.

The tile repeats. The one before it starts 140px further left, so its dot is at x = 129.6. The next one is past the `body`'s right edge. That makes the two dots.

### 5. The p and its no-break space

Between `<p>` and `<style>` there is a no-break space, not a normal space. A normal space alone in a block collapses, and the `<p>` would be 0px tall. I checked it: with a normal space, the band disappears. A no-break space stays, so the `<p>` has one line.

The `<p>` inherits the `body`'s font. A line height given as a number is passed on as that number, so it is 67 × 1q = 63.3px. `zoom:.4` scales the `<p>` down: the line is about 25px tall, and the 50px margins become 20px. The band runs from x = 120 to 280. Its top margin merges with the `body`'s, so it starts at y = 100.

`p{…}` beats `*{…}` because a tag selector is more specific than `*`: the `<p>`'s background is navy, not the gradient.

## Golf notes

- One gradient written once, in `*`, does two jobs: `ex` makes the same `23ex` a 165px disc on `html` and a 9.7px dot on the `body`.
- The second color stop with no position is pulled up to the first: a sharp edge without a second length.
- `/70%` sets the tile width, and `166%` places it: the tile repeats, so one position puts both dots in place.
- A no-break space is 1 character and gives the `<p>` a line, so it needs no `height`.
- `zoom:.4` turns the shared `margin:50` into 20px, and the line height into about 25px, in 9 characters.
- `font:1q/67'` sets the size that shrinks `ex` and the line height for the band at once. The open string is the font family.
- No closing braces, and `<style>` is never closed.
