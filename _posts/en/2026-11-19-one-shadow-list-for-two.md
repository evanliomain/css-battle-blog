---
title: "One shadow list for two: a drop on two discs in 153 characters"
lang: en
ref: 2026-11-19
permalink: /2026/11/19/one-shadow-list-for-two/
description: "How one border-radius, one list of three box-shadows, rotate:45deg and scale:-1 draw the November 19, 2026 CSS Battle target: a light blue drop on a navy disc and a white disc, on gray."
target: /assets/targets/2026-11-19.png
target_url: https://cssbattle.dev/play/NKPquzPInXKuDaB3FR9K
colors: ["#4b4d88", "#fff", "#b0e1fb", "#222a"]
player: eguiluz
chars: 153
score: 693.06
match: 100
code: |
  <style>*{border-radius:0%50%50%;box-shadow:86Q 86Q#4b4d88,29mm 29mm#fff,-56q -56q 0 3Q#b0e1fb}&{rotate:45deg;background:#222a;margin:0 165 230;*{scale:-1
---

The November 19 target is gray, with three shapes stacked in the middle. At the bottom, a white disc. On top of it, a navy disc. On top of that, a light blue drop, point down, resting on the navy disc's center. David Eguiluz draws all three with shadows only. `html` and the `body` get the same drop shape and the same list of three shadows. Then the `body` makes a half-turn, so each element shows the shadows the other one doesn't need, and the rest end up off canvas.

The **wide view** shows the shadows parked above the canvas. The **teaching colors** show which shadow belongs to `html` and which to the `body`.

{% include animations/2026-11-19.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* html and the body */
  border-radius: 0% 50% 50%;       /* 0, 50%, 50%, 50%: one sharp corner */
  box-shadow:
    86Q 86Q #4b4d88,               /* 81.26px on each axis */
    29mm 29mm #fff,                /* 109.61px */
    -56Q -56Q 0 3Q #b0e1fb;        /* −52.91px, spread 2.83px */
}
& {                                /* the root, html */
  rotate: 45deg;
  background: #222a;               /* #222222 at 2/3, on the white canvas */
  margin: 0 165 230;               /* a 70 × 70 box at (165, 0) */
  * {                              /* the body */
    scale: -1;                     /* a half-turn */
  }
}
```

## How it works

### 1. A gray made of see-through black

At the top level of a style sheet, `&` is the root: `html`. `#222a` is a 4-digit hex color: `#222222` with an alpha of `aa`, which is 170/255 = 2/3. `html`'s background goes to the canvas, and the canvas sits on a white page. 34 × 2/3 + 255 × 1/3 = 107.7, which rounds to 108 = `6c`. That gives `#6c6c6c`, exactly the target's gray.

### 2. `margin:0 165 230`: a 70px square

In quirks mode, numbers with no unit are px. `html` is 400 − 2 × 165 = 70 wide. In quirks mode, `html` also fills the frame's height minus its margins: 300 − 0 − 230 = 70. So `html` is a 70 × 70 box at (165, 0), centered on (200, 35).

Its background went to the canvas, so the box itself paints nothing. Everything you see on the canvas is a shadow.

### 3. One sharp corner, pointing up

`*` targets every element: `html` and the `body`. `border-radius:0%50%50%` has three values, and the 4th one repeats the 2nd: 0, 50%, 50%, 50%. On a 70px box, that is 0, 35, 35, 35. Three round corners, and one sharp corner at the top left.

`rotate:45deg` turns `html` around its center. The sharp corner goes to the very top, at y = −14.5. The box's diagonal is now vertical.

### 4. Two shadows going straight down

A shadow turns with its box. In the turned box, an offset (d, d) runs along the diagonal, so on screen it goes straight down by d × √2:

- `86Q` = 81.26px, which gives 114.92. A navy copy of the drop, centered on (200, 149.92).
- `29mm` = 109.61px, which gives 155.01. A white copy, centered on (200, 190.01).

Each copy has the same shape as `html`: a round bottom, a point at the top. The first shadow in the list is painted on top. The white point, at y = 140.5, is under the navy disc. For now, the navy point still shows, up to y = 100.5.

### 5. The third shadow stays off canvas

`-56q` = −52.91px: this shadow goes up by 74.83. Its spread, `3Q` = 2.83px, makes it 70 + 2 × 2.83 = 75.67 wide. Its center lands at y = −39.8, and its round bottom stops about 2px above the canvas. On `html`, this shadow is useless. It is there for the `body`.

### 6. The body gets the same rules

The `body` keeps its default 8px margin and, in quirks mode, fills `html`: 54 × 54 at (173, 8), with the same center (200, 35). It turns with `html`. The `*` gives it the same radius and the same three shadows.

### 7. `scale:-1`: a half-turn

The `*` nested in `&` only targets the `body`. `scale:-1` flips both axes around the box's center: in 2D, that is a 180° turn. The `body`'s point now goes down, and so do its shadow offsets, in the other direction:

- navy and white go up to y = −79.9 and y = −120, off canvas;
- light blue goes down by 74.83, to (200, 109.8). It is 54 + 2 × 2.83 = 59.67 wide, with its point at y = 152.

The `body` is painted after `html`'s shadows, so this drop covers the navy point. Its own point sits on the navy disc, just below the disc's center.

## Golf notes

- One rule for two elements: `*` gives `html` and the `body` the same radius and the same shadows. Shadows that don't fit are moved off canvas, not removed.
- `scale:-1` is shorter than a second shadow list: flipping the `body` reverses all its offsets at once.
- Rotating `html` by 45° turns diagonal offsets into vertical ones: `86Q 86Q` moves the shape straight down.
- The units are picked so that d × √2 lands on the right spot: `86Q` → 114.92, `29mm` → 155.01, `56q` → 74.83 (the target needs 115, 155 and 75).
- `0%50%50%`: three values for four corners, since the 4th repeats the 2nd.
- `#222a`: the gray in 4 characters, thanks to the white under the canvas.
- `86Q#4b4d88`, `29mm#fff`: no space before `#`. The rule is never closed.
