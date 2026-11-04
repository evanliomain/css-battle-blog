---
title: "A giant double outline: a basket in 118 characters"
lang: en
ref: 2026-10-29
permalink: /2026/10/29/a-giant-double-outline/
description: "How one outline:double, shared by html and a scaled-down body, draws the October 29, 2026 CSS Battle target: a stadium, two U shapes and a square."
target: /assets/targets/2026-10-29.png
target_url: https://cssbattle.dev/play/3ZNznMmHqozsPyLJeMmX
colors: ["#444f52", "#e9c282"]
player: benjamintordjman
chars: 118
score: 729.91
match: 100
code: |
  <style>*{background:#444F52;outline:5in double#E9C282}&{margin:110 40 30;border-radius:9in;*{margin:-50%0 0;scale:.125
---

The October 29 target looks like a basket seen from the front: a big slate stadium on a beige card, two nested U shapes hanging from its top edge, and a small square sticking out above. Benjamin Tordjman draws it with one property doing almost all the work: a huge `outline:double`. On `html` it paints everything around the stadium. On a `body` shrunk eight times, the same outline becomes the two U shapes.

{% include animations/2026-10-29.html lang=page.lang %}

## The code, spaced out

```css
* {                                  /* html, then body */
  background: #444F52;
  outline: 5in double #E9C282;       /* 480px: line 160, gap 160, line 160 */
}
& {                                  /* & alone is html */
  margin: 110 40 30;
  border-radius: 9in;
  * {                                /* body (head and style stay hidden) */
    margin: -50% 0 0;
    scale: .125;
  }
}
```

## How it works

### 1. The stadium is the canvas

At the top level, `&` means `html`. `margin:110 40 30` leaves it 320px wide. CSS Battle runs in quirks mode, where `html` fills the page height minus its margins: 300 − 110 − 30 = 160. So `html` is a 320×160 box at (40, 110).

Its slate background is not painted in that box: the background of `html` goes to the whole canvas. Nothing else paints the box itself. So the stadium you see is just the canvas, showing through.

### 2. 9in becomes 80px

`border-radius:9in` is 864px. When two corners of a side add up to more than the side, the browser shrinks every radius by the same factor. The tightest side is the height: 864 + 864 on 160px. So every corner ends up at 80px, half the height: the box is a stadium.

### 3. An outline that covers the frame

`*` also gives `html` an `outline:5in double`, 480px wide. A `double` line is cut in three equal parts: a 160px line, a 160px gap, a 160px line. The outline follows the rounded corners.

The inner line starts right at the edge of the stadium and goes 160px out. The farthest point of the canvas, a corner, is about 145px from the stadium. So the inner line covers the whole canvas around the stadium in beige, and the gap and the outer line fall outside the frame. The beige card is an outline, not a background.

### 4. body: a 320px square

`*` also matches `body`, so it gets the same slate background and the same outline. Its own rule:

- `margin:-50% 0 0`: a margin in % is always taken from the width of the parent, here 320px. So the top margin is −160px.
- `body` is 320px wide, and quirks mode makes it fill the height of `html` minus its margins: 160 − (−160) = 320px.

That is a 320×320 square, from y = −50 to y = 270. Its center is (200, 110): the middle of the top edge of the stadium.

### 5. scale:.125 shrinks the box and the outline

`scale:.125` shrinks the `body` eight times around its center: a 40×40 square at (180, 90). It shrinks the outline too: 480 × 0.125 = 60px, so a 20px line, a 20px gap and a 20px line around the square.

`scale` does one more thing: it gives the `body` its own layer, painted on top of the outline of `html`. I checked a variant that makes the same square without `scale`: the outline of `html` then paints over the top of the square.

### 6. The gap is see-through

The square is half above the stadium and half inside it. Its outline is the same:

- above y = 110, the two beige lines land on the beige of `html`'s outline and disappear. The gap shows that beige too.
- inside the stadium, the two lines are two beige U shapes, and the gap between them shows the slate canvas: the dark U.

The slate square sticks out 20px above the stadium. All of it comes from one `outline` written once.

## Golf notes

- One `outline` on `*` serves twice: as a mask around the stadium on `html`, and as the U shapes on the scaled `body`.
- No background for the beige: the inner line of the outline paints it.
- `9in` is a short "big enough" radius; the browser brings it down to 80px.
- `margin:-50%0 0`: a % margin uses the width, so −50% is exactly −160px, and `%` ends the number, so no space before `0`.
- `scale:.125` sets the size and the layer at once.
- `double#E9C282`: no space needed before `#`. `<style>` is never closed.
