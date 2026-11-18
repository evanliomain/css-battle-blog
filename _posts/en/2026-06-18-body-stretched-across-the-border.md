---
title: "body stretched across the border: a split frame in 108 characters"
ref: 2026-06-18
permalink: /2026/06/18/body-stretched-across-the-border/
description: "How html becomes a rounded white frame with a 53Q border, and how body, a small green square in its middle, is stretched by scale and turned by rotate into a diagonal band that cuts the frame in two, in the June 18, 2026 CSS Battle target."
target: /assets/targets/2026-06-18.png
target_url: https://cssbattle.dev/play/gOhzH7m34YAoKBbBHKDQ
colors: ["#81be48", "#fff"]
player: emohdaziz
chars: 108
score: 742.9
match: 100
code: |
  <style>*{background:#81be48}&{border:53Q solid#fff;border-radius:32Q;margin:60 110;*{rotate:45deg;scale:9 .8
---

The June 18 target is a white square with rounded corners on a bright green background, with a green square hole in the middle. A wide green band crosses it on the diagonal, from the top left corner to the bottom right one, and cuts it in two. Mohamed Ali draws the frame with html's border. Then body, a small green square inside it, is stretched nine times by `scale` and turned 45° by `rotate`: it becomes the band.

Use **Teaching colors** to see body, which is green on green, and **Wide view** to see the band stick out of the canvas.

{% include animations/2026-06-18.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                       /* html, head, style, body */
  background: #81be48;    /* html: the whole canvas; body: the band */
}
& {                       /* outside any rule: the root, html */
  border: 53Q solid #fff; /* 50.08px, drawn 50px wide */
  border-radius: 32Q;     /* 30.24px */
  margin: 60 110;         /* px in quirks mode: 180 × 180 at (110, 60) */
  * {                     /* & *: head, style and body */
    rotate: 45deg;
    scale: 9 .8;          /* body: 576 × 51.2, on the diagonal */
```

## How it works

### 1. One green background for everyone

`*` selects html, head, style and body, and gives them all the green background. head and style are hidden.

html is the root: its background goes to the whole canvas. body gets the same green, and it will become the band.

### 2. html is a 180 × 180 box

At the top level, outside any rule, `&` stands for the root element: html.

The margin `60 110` has no unit. CSS Battle pages have no doctype, so they are in quirks mode, and there a unitless margin is read in px. html is 400 − 2 × 110 = 180px wide. In quirks mode it also fills the height of the canvas: 300 − 2 × 60 = 180px.

I measured html as a 180 × 180 box at (110, 60).

### 3. A white frame

The unit `Q` is a quarter of a millimeter: 53Q = 50.08px. Chrome draws the border 50px wide (its computed width is 50px). What is left inside is the content box: 80 × 80, at (160, 110). It has no background of its own, because html's background went to the canvas. So it shows the green canvas: the square hole.

`border-radius: 32Q` is 30.24px. It rounds the outer corners. The inner corners use the radius minus the border width: 30.24 − 50 is below 0, so the hole keeps square corners.

### 4. body is a 64 × 64 square at the center

The `*` nested in `&` means `& *`: every element inside html, so head, style and body. Only body is shown.

body sits in html's 80 × 80 content box, with its default 8px margin: it is 80 − 16 = 64px wide. In quirks mode, body also fills the height of html: 64px. I measured it at (168, 118), so its center is the center of the canvas, (200, 150). It is green on green: nothing shows yet.

### 5. scale, then rotate

`rotate`, `scale` and `translate` are always applied in the same order, whatever the order in the code: translate, then rotate, then scale. In practice, the scale stretches body along its own axes first, and the rotation turns the result. Swapping the two declarations gives the same picture in my render.

`scale: 9 .8` makes body 9 × 64 = 576px wide and 0.8 × 64 = 51.2px tall, around its center. `rotate: 45deg` then turns this band clockwise around (200, 150). I measured the bounding box of the turned band from (−21.75, −71.75) to (421.75, 371.75): its two ends are far off the canvas.

### 6. The cut

The band follows html's diagonal, the line from (110, 60) to (290, 240) through the center. It is 51.2px thick, so it covers 25.6px on each side of that line.

body is inside html, so it is painted over html's border. The band hides the top left and bottom right corners of the frame, and cuts the white into two pieces. In the middle it crosses the hole, which is the same green.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One background does two jobs. With `*`, html gets the green, which goes to the canvas, and body gets it too, which makes the band. With the background moved into `&` and the `*` rule gone (106 characters), body has no background: the band disappears, the frame is whole, and 6,941 pixels change.
- `&` names html in one character, and the nested `*{` reaches body in two more. With `}body{` in place of `;*{`, the picture is the same, in 111 characters.
- The margin has no unit, which works in quirks mode. `margin:60px 110px` gives the same picture in 112 characters.
- The border width is in `Q`. The unitless trick does not work in the `border` shorthand: `border:50 solid#fff` (107 characters) is dropped, there is no frame at all, and 18,540 pixels change. `50px` gives the same picture as `53Q` in 109 characters: 53Q is 50.08px in three characters, and it is drawn 50px wide.
- Same for the radius: `border-radius:30` (107 characters) is dropped, the corners are square, and 447 pixels change. `30px` takes 109 characters, and 51 pixels change, all on the rounded corners. 32Q is 30.24px in three characters.
- The scale only needs one digit, big enough for the band to reach past the rounded corners. With `scale:3 .8`, the band is 192px long and stops 96px from the center: the white corners come back, and 1,706 pixels change. With `scale:4 .8`, the band reaches 128px from the center, and 147 pixels change, all on its two long edges.
- `.8` drops its leading zero, `solid#fff` needs no space before the `#`, and `#fff` is the short form of white.
- Nothing is closed. `}}` at the end gives the same picture in 110 characters.

## If you try it at home

In my local Chrome, the official code is very close to the target but not identical: 487 pixels differ by more than 8 on a channel, by up to 134. Every one of them is next to an edge of a shape: 400 on the two long edges of the band, 87 on the rounded corners. My render has 89 different colors, the target 16. The CSS Battle judge gives the code a 100% match.
