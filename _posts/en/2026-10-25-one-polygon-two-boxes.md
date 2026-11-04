---
title: "One polygon, two boxes: a screen icon in 152 characters"
lang: en
ref: 2026-10-25
permalink: /2026/10/25/one-polygon-two-boxes/
description: "How one clip-path, applied to body and to a scaled-up p, draws the October 25, 2026 CSS Battle target: a frame, a dark triangle and the notch between them."
target: /assets/targets/2026-10-25.png
target_url: https://cssbattle.dev/play/Y5ONBPIczkMuJt7MUtxP
colors: ["#809e97", "#36443b"]
player: ludvig
chars: 152
score: 693.95
match: 100
code: |
  <p><STYLE>*{background:#809E97;border:33q solid#36443B;margin:60 50;*{margin:-82;*{margin:101 139-140;scale:5.5 4}clip-path:polygon(50%57%,68%89%,32%89%
---

The October 25 target looks like a screen-sharing icon: a thick dark frame on a grey-green background, and a dark triangle at the bottom that breaks through the frame's lower bar, with a thin band of background around it. Ludvig draws it with one rule for every element: the same background, the same border, and the same `clip-path`. The `body` and a `<p>` cut two slightly different triangles out of their own boxes, and the gap between them is the notch.

{% include animations/2026-10-25.html lang=page.lang %}

## The code, spaced out

```css
<p><STYLE>
* {                              /* every element */
  background: #809E97;
  border: 33q solid #36443B;
  margin: 60 50;                 /* html: the frame */
  * {                            /* body, p (head and style stay hidden) */
    margin: -82;                 /* body: 402 × 282 */
    * {                          /* p */
      margin: 101 139 -140;
      scale: 5.5 4;
    }
    clip-path: polygon(50% 57%, 68% 89%, 32% 89%);   /* body and p */
  }
}
```

## How it works

### 1. html is the frame

The outer `*` matches `html`. Its background goes to the canvas. `margin:60 50` leaves a 300px wide box, and in quirks mode (which CSS Battle uses) `html` fills the page height minus its margins: 300 − 60 − 60 = 180. Its border is 33q, about 31px (1q is a quarter of a millimetre). That border is the frame, at (50, 60).

### 2. body is a big box that hides everything

The middle rule matches every element inside `html`. For `body`, `margin:-82` makes it stick out 82px on every side of `html`'s content box (238 × 118 at (81, 91)). In quirks mode its height follows the same way, so the body is a 402 × 282 box at (−1, 9).

It has the same background and the same 31px border. Painted over `html`, it would hide the frame, if it were not clipped.

### 3. The body's triangle is the notch

The `clip-path` sits in the middle rule, after the nested one, so it applies to `body` and to the `p`. Its percentages are taken from each element's own box. On the body:

| Point | Percent | Position |
| --- | --- | --- |
| apex | 50% 57% | (200, 170) |
| bottom right | 68% 89% | (272, 260) |
| bottom left | 32% 89% | (128, 260) |

The triangle lies inside the body's border, so all it shows is the body's background: the background color. Over the inside of the frame it is invisible. Over the frame's bottom bar, it erases a triangle: the notch.

### 4. The p is nothing but border

The `<p>` comes before `<STYLE>`, so it is in `body` (and the style ends up inside it, hidden). The innermost rule gives it `margin:101 139-140`. Inside the body's 340px content box, 139 + 139 leaves 62px, which the two 31px side borders fill completely. The `p` holds no visible content, so its height is just its top and bottom borders: a 62 × 62 dark square at (169, 141).

### 5. scale blows it up

`scale:5.5 4` scales it around its center, (200, 172): 62 × 5.5 = 341 wide and 62 × 4 = 248 tall, from (29.5, 48) to (370.5, 296). Everything is dark: it is still all border.

### 6. The same polygon gives a smaller, lower triangle

The `p` gets the same `clip-path`, measured on its own unscaled box, then scaled with it. On the 341 × 248 box, the apex lands at y ≈ 189 and the base at y ≈ 269: a dark triangle a bit smaller and lower than the body's.

A `clip-path` on a parent also clips its children. So the `p`'s triangle is cut again by the body's triangle, whose base is at y = 260. That is the flat bottom of the dark triangle in the target, from x = 146 to 254.

What is left between the two triangles is the band of background color around the dark triangle: the notch in the bar.

## Golf notes

- One rule for all elements: background, border and margin are written once. The color lives in `border`, so no `color` is needed.
- One `clip-path` for two triangles: the same percentages on two different boxes give two different triangles.
- `scale` with two values turns a small square into a big rectangle, without `width` or `height`.
- The parent's `clip-path` trims the child for free, so the dark triangle needs no fourth point.
- `33q` is 31px in 3 characters; `139-140` needs no space before the minus.
- `<STYLE>` works like `<style>`: tag names are not case-sensitive.
