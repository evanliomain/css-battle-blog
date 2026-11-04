---
title: "Nothing but borders: a cassette in 255 characters"
lang: en
ref: 2026-10-01
permalink: /2026/10/01/nothing-but-borders/
description: "How four elements, each drawn with nothing but a thick border, rebuild the October 1, 2026 CSS Battle target: a cassette tape."
target: /assets/targets/2026-10-01.png
target_url: https://cssbattle.dev/play/2T06JBTudrVtVc9pONU7
colors: ["#fffc", "#444", "#7dcb61", "#ccc5"]
player: eguiluz
chars: 255
score: 635.2
match: 100
code: |
  <p><img><img><style>&,p,img{border-radius:2in;margin:-220-155;border:25vw solid#fffc}&{background:#444;border:193Q solid#7dcb61;margin:-127-117;*{border:solid#ccc5;border-width:20 55;margin:140 60 0;p{*{scale:.2;margin:-75-325-75 25}clip-path:inset(30%58Q
---

The October 1 target is a cassette tape on a green background: a dark grey body with rounded corners, a light window with two reels in a dark pill, and a grey label at the bottom. David Eguiluz draws every part of it with a border. The green around the cassette is a border, the label is a border, the window is a border, and so are the reels. No background except one dark grey.

{% include animations/2026-10-01.html lang=page.lang %}

## The code, spaced out

```css
/* <p><img><img><style> : body holds a p, the p holds two img (and the style) */
&, p, img {               /* html, the p and the two img */
  border-radius: 2in;     /* 192px */
  margin: -220 -155;
  border: 25vw solid #fffc;   /* 100px */
}
& {                       /* html */
  background: #444;
  border: 193Q solid #7dcb61; /* ≈182px of green */
  margin: -127 -117;
  * {                     /* everything inside html: here, body */
    border: solid #ccc5;
    border-width: 20 55;
    margin: 140 60 0;
    p {
      * {                 /* the two img */
        scale: .2;
        margin: -75 -325 -75 25;
      }
      clip-path: inset(30% 58Q);
    }
  }
}
```

## How it works

### 1. Who gets which rule

The code looks like `* { border: solid #ccc5 }` should hit everything. It doesn't, and that is the trick that makes the first rule worth writing.

A top-level `&` matches `html`, but in Chrome it adds no specificity, like `:where()`. So:

- `&` and `& *` both weigh zero;
- `p` and `img` weigh one element each, so they win over `& *`.

What each element ends up with:

| Element | Border | Margin | Extra |
| --- | --- | --- | --- |
| `html` | 182px green, radius 2in | `-127 -117` | `background:#444` |
| `body` | `#ccc5`, 20px and 55px | `140 60 0` | |
| `p` | 100px `#fffc`, radius 2in | `-220 -155` | `clip-path` |
| `img` ×2 | 100px `#fffc`, radius 2in | `-75 -325 -75 25` | `scale:.2` |

`body` is not in the first list, so it is the only one that takes the `#ccc5` border. `html` is in both `&` rules, and the later one wins for its border and margin, but nothing overrides its `border-radius`.

### 2. html: the green is a border

`margin:-127-117` pulls `html` out on every side. CSS Battle renders in quirks mode, where `html` fills the frame minus its margins, so its box is 634×554, from (−117, −127) to (517, 427).

Its `#444` background is the root background, so it covers the whole canvas. Then `border:193Q` paints green over it. 193Q is 182.4px, and Chrome draws it as 182px. What is left inside is exactly the cassette: 270×190 at (65, 55).

The corners come for free. The outer radius is 2in (192px), and the inner edge of a border is rounded by the radius minus the border width: 192 − 182 = 10px. The outer corners are rounded too, but they are far outside the canvas.

### 3. body: the label

`body` sits inside the cassette with `margin:140 60 0`. In quirks mode it also stretches to the bottom, so it is 150×50 at (125, 195).

Its border is 20px at the top and bottom, 55px on the sides, in `#ccc5`: `#ccc` at a third opacity, which gives about `#727272` over the dark grey. That is the label. The 40×10 hole left in the middle shows the `#444` behind it: the slot.

### 4. p: a big ring with a pill-shaped hole

The `p` lives inside `body`'s 40px-wide content box, but `margin:-220-155` throws it far out: it becomes 350×250 at (25, −5). Its 100px `#fffc` border covers almost all of it. `#fffc` is white at 80%, which gives about `#d9d9d9` over the dark grey.

Its content box is only 150×50, at (125, 95). The 50px of height comes from the line of images inside it (see below).

The radius does the rest. 2in (192px) is too big for a 250px-tall box: two corners would need 384px. When radii overflow, the browser scales them all down by the same factor until they fit, here to 125px. The inner edge is rounded by 125 − 100 = 25px, which turns the 150×50 hole into a pill. That pill is the dark band around the reels.

### 5. The reels are empty images

An `<img>` with no `src` has a 0×0 content box. With a 100px border, it is a 200×200 square, and the 2in radius (clamped to 100px) makes it a circle.

Both images sit on one line in the `p`:

- `margin-left:25` and `margin-right:-325`: each image takes 25 + 200 − 325 = −100px of room, so the next one starts 100px further left. The first one lands at x 150 to 350, centered on x=250. The second one lands at x 50 to 250, centered on x=150.
- `-75` at the top and bottom leaves a margin box only 50px tall. That is the line height, so it is also the height of the `p`'s content box, and of the pill.

`scale:.2` then shrinks each circle around its center, from 200px to 40px. The reels end up at x 130 to 170 and 230 to 270, y 100 to 140.

### 6. clip-path cuts out the window

So far the `p` is a huge light ring that covers half the canvas. `clip-path:inset(30% 58Q)` cuts it down:

- 30% of 250px is 75px off the top and the bottom: y 70 to 170;
- 58Q is about 55px off each side: x 80 to 320.

What is left is the 240×100 window. The clip also applies to the images inside the `p`, but the reels are well inside it.

## Golf notes

- One shared rule for `html`, `p` and `img`, and the zero specificity of a top-level `&` decides who keeps what. `body` gets its own border without being named.
- Translucent colors over `#444`: `#fffc` and `#ccc5` are 5 characters each and give the light grey and the mid grey.
- Units are optional in quirks mode: `margin:-220-155`, `border-width:20 55`. No space is needed before a minus sign or a `#`.
- `25vw` is 100px, `2in` is 192px, `193Q` is about 182px, all in 4 characters or fewer.
- Empty `<img>` tags are free circles once they have a border and a radius.
- `<p>` is never closed, the `<style>` sits inside it, and the style is never closed either.
