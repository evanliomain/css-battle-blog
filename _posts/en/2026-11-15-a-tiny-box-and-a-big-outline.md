---
title: "A tiny box and a big outline: a house in 150 characters"
lang: en
ref: 2026-11-15
permalink: /2026/11/15/a-tiny-box-and-a-big-outline/
description: "How a 22 × 22 html box, a 64px outline, rotate:225deg and a background-colored shadow on the body draw the November 15, 2026 CSS Battle target: a navy drop shape cut flat, with a small door, on cream."
target: /assets/targets/2026-11-15.png
target_url: https://cssbattle.dev/play/remxMOJe0OJmVRBlgKqm
colors: ["#fdffe9", "#2d3464"]
player: evanliomain
chars: 150
score: 695.76
match: 100
code: |
  <style>*{rotate:225deg;background:#fdffe9;border-radius:9q 3mm 0;margin:-9-29;box-shadow:34vw 0 0 1in#fdffe9}&{margin:139 189;outline:4pc solid#2d3464
---

The November 15 target is cream, with a navy drop shape pointing up, cut flat across the middle of the frame, and a small door with round top corners at the bottom of it. It looks like a little house. I draw it with no tag besides `<style>`. The drop is the `outline` of a 22 × 22 `html` box, turned so its one sharp corner points up. The door is the `body`, turned straight, and its background-colored shadow makes the cut.

Use **Teaching colors** to see the door and the two shadows, which are all cream in reality, and **Wide view** to see how far the shadows reach.

{% include animations/2026-11-15.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                   /* html and body */
  rotate: 225deg;                     /* html: tip up; body: 450° = 90° in all */
  background: #fdffe9;                /* cream: canvas and door */
  border-radius: 9q 3mm 0;            /* TL 8.5, TR and BL 11.34, BR 0 */
  margin: -9 -29;                     /* body: 80 × 40 around html's box */
  box-shadow: 34vw 0 0 1in #fdffe9;   /* body: the cut at y = 150 */
}
& {                                   /* html only */
  margin: 139 189;                    /* a 22 × 22 box in the middle */
  outline: 4pc solid #2d3464;         /* 64px: the 150 drop */
}
```

## How it works

### 1. html, a 22 × 22 box

`*` matches `html`, `head`, `style` and `body`. `head` and `style` are not displayed, so only `html` and the `body` count. A top-level `&` matches the root, `html`: its `margin` replaces the one from `*` on `html`.

With `margin:139 189`, `html` keeps 400 − 2 × 189 = 22 across and 300 − 2 × 139 = 22 down: a 22 × 22 box from (189, 139) to (211, 161), centered on (200, 150). Its cream background goes to the canvas, so the whole frame is cream.

### 2. outline: a 150 square

`4pc` is 4 × 16 = 64px. The navy `outline` goes 64px around the box: a 22 + 2 × 64 = 150 square, from x = 125 to 275 and y = 75 to 225. Inside it, the 22 × 22 box stays a hole.

The `outline` follows the box's corners, each radius grown by 64. `border-radius:9q 3mm 0` has three values: top left, then top right and bottom left, then bottom right. `9q` is 8.5px, so the top left corner of the `outline` is 72.5. `3mm` is 11.34px, so the top right and bottom left are 75.34, about half the square. The bottom right radius is 0, and that corner stays sharp.

### 3. rotate: the tip goes up

`rotate:225deg` turns `html` clockwise around its center, (200, 150). The bottom right corner, the sharp one, goes to the top. Half the square's diagonal is 106, so the tip is at y = 150 − 106 = 44, with two straight sides at 45°.

The two 75.34 corners go left and right. They are almost half circles around the center, so the drop is 150 wide at y = 150, from x = 125 to 275. The 72.5 corner goes to the bottom, where it will be hidden.

### 4. The body, 80 × 40

The `body` is inside `html`, so it gets the same rules from `*`. `margin:-9-29` reads as `-9 -29`: negative margins make it stick out of `html`'s 22 × 22 box. It is 22 + 2 × 29 = 80 wide. In quirks mode, the `body` fills the height of `html`, so it is 22 + 2 × 9 = 40 tall. It is centered on `html`, and turns with it.

It has the cream background. It is turned itself, so it is painted on top of `html`'s `outline`.

### 5. 225° more: the door

The `body` also has its own `rotate:225deg`, added to `html`'s: 225 + 225 = 450°, which is 360 + 90. So the 80 × 40 box ends up standing, 40 wide and 80 tall: x = 180 to 220, y = 110 to 190.

A 90° clockwise turn puts the box's own top left and bottom left corners at the top. Their radii are 8.5 and 11.34: the round top corners of the door. The door also covers the hole of the `outline` in the middle, `html`'s own 22 × 22 box.

### 6. box-shadow: the cut

`box-shadow:34vw 0 0 1in#fdffe9` is a cream shadow, offset by `34vw` = 136 along the box's own x axis, with no blur and a spread of `1in` = 96. The `body`'s x axis points down on screen, so its shadow moves down. It is 40 + 2 × 96 = 232 wide and 80 + 2 × 96 = 272 tall, and its top is at 110 − 96 + 136 = 150.

The shadow is painted with the `body`, above the `outline`. Cream on cream, it hides everything below y = 150: the bottom of the drop and the bottom of the door. `html` gets the same shadow from `*`, toward the top left. It is painted under `html`'s own `outline`, so it never shows.

## Golf notes

- The drop needs no box of its size: a tiny box and a thick `outline` draw it, and the `outline` gives each round corner the box's radius plus 64.
- One `rotate` in `*` turns `html` by 225° and the `body` by 450°: the drop points up and the door stands straight.
- A three-value `border-radius` serves both elements: the sharp tip, the round sides of the drop, and the door's two top corners.
- A background-colored shadow cuts the shape flat: no clip needed.
- `margin:-9-29` needs no space before a negative number.
- `4pc`, `3mm`, `9q`, `34vw` and `1in` are short ways to write 64, 11.34, 8.5, 136 and 96.
- `solid#2d3464` and `1in#fdffe9`: no space before `#`.
- The rule for `html` is the last one, and it is never closed.
