---
title: "Every box has a sand center: a ring in three pieces in 110 characters"
ref: 2026-07-10
permalink: /2026/07/10/every-box-has-a-sand-center/
description: "How one radial gradient with a 1Q ray draws a blue ring with a sharp outer edge, how a translucent last color turns into sand over the white page, and how body and a stretched p, too small to reach the blue, cut the ring in three, in the July 10, 2026 CSS Battle target."
target: /assets/targets/2026-07-10.png
target_url: https://cssbattle.dev/play/roAyjEeXtmG1qITOSiXY
colors: ["#c9a077", "#273e7c"]
player: emohdaziz
chars: 110
score: 740.2
match: 100
code: |
  <p> <style>*{background:radial-gradient(1Q,#c9a077,90Q,#273e7c 0 115px,#b85c);+*{margin:141 45%0;*{scale:9 1.1
---

The July 10 target is a blue ring on a sand background, cut in three pieces: a slot on the left, one on the right and one at the bottom. Mohamed Ali draws it with one radial gradient, given to every element. On the canvas, it paints the ring. body and the p are too small to reach the blue: on them, the same gradient only paints sand, and that sand cuts the ring.

Turn on **Teaching colors** to see body in orange and the p in pink.

{% include animations/2026-07-10.html lang=page.lang %}

## The code, spaced out

```css
<p>&nbsp;                        /* a real no-break space: 1 character */
<style>
* {                              /* html, head, body, p, style */
  background:
    radial-gradient(1Q,          /* a circle with a 0.945px ray */
      #c9a077, 90Q,              /* sand, then a hint at 85.04px */
      #273e7c 0 115px,           /* blue from 85.04 to 115px */
      #b85c);                    /* sand at 80% opacity, beyond 115px */
  + * {                          /* body */
    margin: 141 45%0;            /* 141 on top, 180 left and right, 0 at the bottom */
    * {                          /* p (and the hidden style) */
      scale: 9 1.1               /* 40 × 18 becomes 360 × 19.8 */
```

## How it works

### 1. One background for every element

There is no doctype: the page is in quirks mode, and numbers with no unit are px. The code starts with a `<p>`, then a no-break space, then the `<style>`. The style ends up inside the p. So the page has html, head, body, the p and the style. head and the style are not displayed.

The `*` gives the same gradient to all of them. The nested rules only change body's margins and the p's size.

### 2. A circle with a 1Q ray

html is the root element: its background is painted on the whole canvas. html is 400 × 300, so the gradient is centered at (200, 150).

`radial-gradient(1Q,` gives the size of the gradient: one length means a circle with that radius. 1Q is 0.945px. The color stops that follow are in px, and a px position does not depend on the circle's size: it is a distance from the center.

### 3. Sand, then blue

The sand starts at the center. `90Q` stands alone between two commas: it is a transition hint, at 85.04px. The next stop, `#273e7c 0 115px`, has two positions. A stop cannot come before what precedes it, so its 0 moves up to 85.04. The hint sits right on that stop: the sand stays sand up to 85.04, and the blue starts there, with a sharp edge. Written as a stop, `#c9a077 90Q`, it gives the same picture in the same 110 characters.

The blue goes on to 115px. The ring is 29.96px thick. It goes from x = 85 to 315 and from y = 35 to 265.

### 4. The last color

`#b85c` has no position, so it goes at 100%: the end of the ray, 0.945px. That is before 115px, so it moves to 115px. The blue stops sharp there, and `#b85c` fills everything beyond.

`#b85c` is `#bb8855` at 80% opacity. Behind the canvas, the page is white. 80% of (187, 136, 85) over white gives (200.6, 159.8, 119): the sand of the center, #c9a077, within one step. In my render, the pixels outside the ring alternate between #c9a077, #c8a077 and #c89f77.

### 5. body cuts the bottom

The nested `+*` reads `* + *`: an element right after another element. body comes after head, so it matches. Inside the p, the style is the first element, so it does not.

`margin:141 45%0`: 141 on top, 45% on the left and right, 0 at the bottom. A percentage margin counts from the width of the containing block, here 400px: 45% is 180px. body is 40px wide, from x = 180 to 220. getBoundingClientRect gives (180, 141), 40 × 143. In quirks mode, body stretches down the canvas. It stops at y = 284, 16px above the bottom: when I give the p a zero bottom margin, body reaches y = 300.

body has the same gradient, centered on its own box, at (200, 212.5). Its corners are 74.24px from that center, short of 85.04: body is all sand. It covers the ring at the bottom, between x = 180 and 220.

### 6. The p, one line of 18px

A normal space alone in a block collapses. A no-break space does not: the p gets one line. With my default font (Times, 16px), the line is 18px tall. The p is 40 × 18 at (180, 141). Its center falls at (200, 150), the center of the canvas.

The p has the same gradient too. Its corners are 21.93px from its center: it is all sand.

### 7. Stretched by scale

The `*` nested in `+*` reads `* + * *`: every element inside body, so the p and the hidden style. `scale:9 1.1` stretches the p around its center: 9 times wider, 1.1 times taller. It becomes 360 × 19.8, from x = 20 to 380 and from y = 140.1 to 159.9. Its background stretches with it and stays all sand. It cuts the ring on the left and on the right.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `1Q,` makes the circle tiny, so the last color's 100% lands before 115px and moves there: a sharp outer edge. With no size (107 characters), the gradient is an ellipse that reaches the corners: the ring is squashed and the blue fades out toward the corners. 85,708 pixels change. `circle,` (114 characters) gives a circle, but its ray reaches the farthest corner, 250px away: `#b85c` sits at 250px, and the blue fades from 115 to 250px. 75,095 pixels change.
- `90Q` is 85.04px in 3 characters. `85px` (111 characters) changes 22 pixels, on the inner edge of the ring.
- `#b85c` is the sand in 5 characters, thanks to its 80% opacity over the white page. `#c9a077` gives the same picture in 112.
- `+*` selects body in 2 characters. `body` gives the same picture in 112. A plain nested `*` (109 characters) also selects the p: the p gets the margins too, 141 18 0 (45% of body's 40px), so it is 4px wide, and 36px once scaled. It stays inside body's column, and the side slots are gone: 1,200 pixels change.
- `45%0`: 45% is 180px, and the `%` ends the value, so `0` needs no space. `180 0` gives the same picture in 111. The `0` matters: with `141 45%` (109 characters), the bottom margin is 141 too, body is only 18px tall, and the bottom slot is gone. 1,208 pixels change.
- The no-break space is 1 character and gives the p its 18px line. With a plain space (110 characters), the p is 0px tall and the side slots disappear. html also grows to 441px tall, so the ring moves down, centered at y = 220.5. 26,454 pixels change.
- `scale:9 1.1` turns the 40 × 18 p into the 360 × 19.8 bar. Without it (96 characters), 1,200 pixels change: the side slots are gone.
- Nothing is closed. `}}}</style>` at the end takes 121 characters, for the same picture.

## If you try it at home

In my Chrome, the official code does not match the target pixel for pixel. test.sh finds 87 wrong pixels on two straight edges, y = 140 and y = 159: the stretched p goes from 140.1 to 159.9, and in the target the side slots go from 140 to 160. With `scale:9 1.1112` (113 characters), the bar is 20px tall and those 87 pixels are gone. test.sh also finds 495 pixels on the curves: zoomed in, the target's ring has smooth edges, and my Chrome paints the gradient's edges hard, with no blend. The CSS Battle judge gives the official code a 100% match.
