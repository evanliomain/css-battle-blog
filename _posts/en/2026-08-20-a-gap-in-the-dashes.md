---
title: "A gap in the dashes: a cross on a globe in 123 characters"
ref: 2026-08-20
permalink: /2026/08/20/a-gap-in-the-dashes/
description: "How one border declaration with a var() fallback gives html a 180px pink border around a green bar and the body a 40px dashed navy border, whose gaps and a clip-path circle() make the disc, for the August 20, 2026 CSS Battle target."
target: /assets/targets/2026-08-20.png
target_url: https://cssbattle.dev/play/7lcu3rTkviI1UxocQlAN
colors: ["#6d8178", "#eed9d9", "#394257"]
player: eguiluz
chars: 123
score: 723.86
match: 100
code: |
  <style>*{background:#6d8178;border:var(--b,45vw#eed9d9)dashed;margin:-130 0;*{--b:5ch#394257;margin:40-80;clip-path:circle(
---

The August 20 target is a small navy disc on a pale pink background, crossed by a gray-green cross with a long vertical bar. David Eguiluz draws it with two boxes and one `border` declaration. On `html`, a 180px pink border leaves only a thin green bar in the middle. On the body, the same declaration becomes a 40px dashed navy border: one gap at the top and one at the bottom carry the bar through the disc. A `clip-path:circle()` cuts the body into the disc.

Use **Teaching colors** to tell the canvas, the border of `html`, the background of the body and its dashes apart.

{% include animations/2026-08-20.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                   /* html, head, style, body */
  background: #6d8178;
  border: var(--b, 45vw #eed9d9) dashed; /* html: 180px pink; body: --b */
  margin: -130 0;                     /* no unit: px in quirks mode */
  * {                                 /* head, style, body */
    --b: 5ch #394257;                 /* 40px navy */
    margin: 40 -80;
    clip-path: circle();              /* closed by the end of the code */
  }
}
```

## How it works

### 1. Two boxes

There is no doctype, so the page is in quirks mode. The browser builds `html`, `head`, the `style` (inside `head`) and `body`. `*` matches all four, and the nested `*` matches `head`, `style` and `body`, the elements inside another one. `head` and `style` are not displayed. Two boxes are left: `html`, with the outer rule, and `body`, with both rules. The nested `margin` comes later, so it wins in the body. The body keeps the `background` and the `border` of the outer rule.

### 2. html: 400 × 560

`margin:-130 0` has no unit, and quirks mode reads it as px: −130px at the top and bottom, 0 on the sides. In quirks mode, `html` fills the 400 × 300 frame minus its margins: 300 + 130 + 130 = 560px tall, from y = −130 to 430, and 400px wide.

Its background is green. The background of the root element is painted on the whole canvas.

### 3. The fallback of var(): 180px of pink

`border:var(--b,45vw#eed9d9)dashed` reads the custom property `--b`. Only the nested rule sets it, so `html` has none, and `var()` uses its fallback: `45vw#eed9d9`. 45vw is 45% of the 400px width: 180px. I checked with `180px` in place of `45vw`: the render is the same.

180px on each side leaves 400 − 360 = 40px across and 560 − 360 = 200px down. That content box goes from x = 180 to 220 and from y = 50 to 250. It has no border on it, so the green canvas shows there: this is the vertical bar of the cross. Everything else in the frame is pink border.

The style is `dashed`, but in my Chrome this border has no gap at all. I rendered `html` with `solid` instead: every pixel is the same.

### 4. body: 200 × 120

The body sits in the content box of `html`: 40 × 200, at (180, 50). `margin:40-80` gives 40px at the top and bottom and −80px on the left and right. The negative side margins make it wider than its container: 40 + 80 + 80 = 200px, from x = 100 to 300.

In quirks mode, the body fills the height of its container minus its margins: 200 − 40 − 40 = 120px, from y = 90 to 210. Its background is the same green.

### 5. --b on the body: 40px dashes

The body sets `--b:5ch#394257`, so the same `border` declaration becomes `5ch #394257 dashed` there. The body keeps the default font, 16px Times, where 1ch is 8px in my render: 5ch is 40px. I checked with `40px` in place of `5ch`: the render is the same.

This time the dashes show. I measured them in a render without the `clip-path`:

- the top and bottom sides, 200px long, have an 80px dash, a 40px gap and an 80px dash. The gap goes from x = 180 to 220;
- the left and right sides, 120px long, have no gap.

A gap shows the background of the body, which is green. I checked by giving the body a red background: the two gaps and the middle turn red. The two gaps sit exactly above and below the bar of `html`, from x = 180 to 220, so the bar goes on through the body.

Inside the borders, the content box is 200 − 80 = 120px wide and 120 − 80 = 40px tall, at (140, 130). It is green too: this is the horizontal bar.

### 6. clip-path: circle()

`circle()` with no argument is centered on the box and its radius goes to the closest side. The body's box is 200 × 120, centered at (200, 150), and its closest sides are the top and bottom ones: the radius is 120 / 2 = 60px. I checked with `circle(60px)`: the render is the same.

The parenthesis is never closed: the end of the code closes it. I checked with `circle()`: the render is the same. Without the parenthesis, `circle` alone is not valid, the declaration is dropped and the body stays a rectangle.

Inside the disc, the navy dashes make the four corners, and the green gaps and content make the cross. Above and below the disc, the bar is the content box of `html`, which runs from y = 50 to 250 behind the body.

## Golf notes

- One `border` declaration works on both elements. `var(--b,…)` gives `html` the fallback, 180px of pink, and the body its own `--b`, 40px of navy.
- `dashed` is there for the body. On `html`, it paints like `solid`, so sharing the declaration costs nothing.
- The gaps of the dashes draw the bar inside the disc for free.
- `background` in the outer rule colors the canvas (through `html`) and the body.
- `circle()` needs no radius: the closest side of a 200 × 120 box gives 60px.
- `45vw` is 180px in 4 characters, `5ch` is 40px in 3.
- No space around `#` and `)`: `45vw#eed9d9`, `5ch#394257`, `)dashed`.
- `margin:40-80`: the minus sign separates the two values.
- Quirks mode reads `-130 0` and `40-80` as px.
- `<style>`, the two braces and the parenthesis of `circle(` are never closed.

## If you try it at home

In my Chrome (version 157 when this was written), the straight edges of the cross are on the same pixels as in the target. But 111,260 pixels differ from my render. 102,811 of them are flat pink: (238, 217, 217) in my render, which is `#eed9d9`, and (237, 217, 216) in the target. The target file I have is a JPEG. In all, 104,948 pixels differ by a single level. 1,539 pixels differ by more than 8 levels. All of them are within 8px of an edge, between x = 136 and 263. The edge of the disc is not quite in the same place either: in the target, it covers a little more at the top left and a little less at the bottom right. The largest difference is 143 levels, at (228, 202), on the edge of the disc: my render is almost navy there, the target almost pink. On the CSS Battle judge, the code is a 100% match.
