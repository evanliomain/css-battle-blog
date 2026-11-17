---
title: "Dots at the corners: a K in 123 characters"
ref: 2026-08-02
permalink: /2026/08/02/dots-at-the-corners/
description: "How a 70px dotted border on html draws the four disks of the August 2, 2026 CSS Battle target, and how two shadows of an invisible body draw the bar and the rectangle."
target: /assets/targets/2026-08-02.png
target_url: https://cssbattle.dev/play/j5lNXe0bnIf95N6TxmQ7
colors: ["#e05947", "#eed9d9"]
player: h_blierzt
chars: 123
score: 723.86
match: 100
code: |
  <style>&{background:#E05947;margin:40 100;border:dotted 75q;color:EED9D9;*{margin:-9 105-9-183;box-shadow:5vw 0,9pc 0 0-31q
---

The August 2 target is a pale pink K on a coral red background: four disks at the corners of a square, a bar joining the two on the left, and a small rectangle in the middle. H_Bliertz draws the four disks with one dotted border on html: the dots are 70px wide, so only the corners get one. The bar and the rectangle are two shadows of body, which is itself invisible.

Use **Teaching colors** to see body's empty box and the part of each shadow it hides.

{% include animations/2026-08-02.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                           /* outside any rule, & is html */
  background: #E05947;        /* red, painted on the whole canvas */
  margin: 40 100;             /* a 200 × 220 box at (100, 40) */
  border: dotted 75q;         /* 70.87px, drawn 70px: one 70px dot per corner */
  color: EED9D9;              /* no #: quirks mode takes it; body inherits it */
  * {                         /* html's descendants: body is the visible one */
    margin: -9 105-9-183;     /* body: 138 × 98, from x = −13 to 125 */
    box-shadow:
      5vw 0,                  /* 20px to the right: a 20px bar shows */
      9pc 0 0-31q             /* 144px to the right, 29.29px smaller on each side */
```

## How it works

### 1. html is a 200 × 220 box

Outside any rule, `&` stands for the root of the page: html. There is no doctype, so the page is in quirks mode, and numbers without a unit, like `40 100`, are read as px.

`margin:40 100` leaves html a 200 × 220 box, from (100, 40) to (300, 260). Its background is still painted on the whole canvas: the root's background always is.

### 2. A dotted border with room for four dots

`75q` is 75 quarter millimeters. 1Q = 0.945px, so that is 70.87px. Chrome draws the border 70px wide: `70px` in its place gives the same picture. The content box is left with 200 − 2 × 70 = 60 by 220 − 2 × 70 = 80, at (170, 110).

In a dotted border as wide as this, each dot is a 70px disk. The sides are 200 and 220 long, and the dots only fit at the corners. That makes four disks, centered on (135, 75), (265, 75), (135, 225) and (265, 225). With `margin:0 100`, html is 300 tall, and a third disk shows up in the middle of the left and right sides.

The border uses the text color. `color:EED9D9` has no `#`: quirks mode accepts a bare hex color there.

### 3. body, an empty box in the right place

The `*{` rule is nested in `&{`, so it only targets html's descendants. head and style are not displayed: body is the only box left.

body sits in html's content box, 60 × 80 at (170, 110). `margin:-9 105-9-183` reads as top −9, right 105, bottom −9, left −183:

- width: 60 + 183 − 105 = 138, from x = 170 − 183 = −13 to 125;
- height: in quirks mode, body fills html's content box, so 80 + 9 + 9 = 98, from y = 101 to 199.

body has no background. Its box is there, but you cannot see it.

### 4. The first shadow: a bar

`5vw` is 5% of 400, 20px. A shadow with no color takes the text color, the pale pink that body inherits.

The first shadow is body's box moved 20px to the right: x = 7 to 145. But an outer shadow is never painted under its own box, even when the box is transparent. Everything left of x = 125 is cut away. Only a 20px strip is left, from x = 125 to 145, and y = 101 to 199.

That strip is the bar. Its ends reach under the two left disks, which go down to y = 110 and start again at y = 190. Its x range, 125 to 145, is the middle of those disks.

### 5. The second shadow: a rectangle

`9pc` is 9 × 16 = 144px. The second shadow starts as body's box moved 144px right: x = 131 to 269. That is past body's right edge at 125, so nothing of it is cut.

The fourth value, `-31q`, is the spread: −31 × 0.945 = −29.29px. A negative spread shrinks the shadow by that much on every side:

- width: 138 − 2 × 29.29 = 79.4, from x = 160.3 to 239.7;
- height: 98 − 2 × 29.29 = 39.4, from y = 130.3 to 169.7.

That is the rectangle in the middle of the K.

## Golf notes

- `&` is one character for html. Nesting `*{` inside it keeps body's margin and shadows off html. With `}*{` instead of `;*{`, the same length, html gets the two shadows too, and 63,659 pixels change. `body{` in place of `*{` gives the same picture, 3 characters more.
- One `color` paints everything: the border and both shadows use the text color, and body inherits it from html. Writing it without `#` saves one character. The background keeps its `#`: with `background:E05947`, my Chrome drops the declaration and 100,297 pixels change.
- `75q` is 3 characters for a border Chrome draws 70px wide. `70px` gives the same picture with 4. A bare `70` does not work in the `border` shorthand: Chrome drops the whole declaration, and 27,242 pixels change.
- `box-shadow` takes no bare numbers either, so the code picks short units: `5vw` for 20px (3 characters instead of 4), `9pc` for 144px (3 instead of 5), `-31q` for −29.29px. With `144` in place of `9pc`, Chrome drops both shadows and 4,832 pixels change.
- `margin` takes bare numbers in quirks mode. In `-9 105-9-183` and `0 0-31q`, the minus sign starts a new number, so no space is needed before it.
- body's box sets the size of both shapes. The −9 at the top and bottom makes body 98 tall: the bar reaches under the disks, and 98 − 58.58 gives the rectangle its 39.4. With `0` there instead, body is 80 tall, the rectangle is only 80 − 58.58 = 21.42 tall, and 1,632 pixels change.
- Nothing is closed: `&{` and `*{` stay open, and there is no `</style>`. With `}}` at the end, the code is 125 characters and the picture is the same.

## If you try it at home

In my Chrome, 875 pixels differ from the target by more than 8 on one channel. In the target, the rectangle fills whole pixels, 80 × 40 from (160, 130). In mine, its four edges fall on partly covered pixels, as its 79.4 × 39.4 size gives. Measured by how much pink each pixel holds, the target's disks sit about 0.2px higher and further left than mine. The CSS Battle judge gives the code a 100% match.
