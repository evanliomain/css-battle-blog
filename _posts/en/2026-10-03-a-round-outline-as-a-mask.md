---
title: "A round outline as a mask: a face in 166 characters"
lang: en
ref: 2026-10-03
permalink: /2026/10/03/a-round-outline-as-a-mask/
description: "How a huge outline on a round html hides everything outside it, so that four shared box-shadows can draw the October 3, 2026 CSS Battle target: a face with a bowl cut."
target: /assets/targets/2026-10-03.png
target_url: https://cssbattle.dev/play/jIyS5tiYDKOTes7oiBMb
colors: ["#441212", "#b08743"]
player: markboots
chars: 166
score: 682.21
match: 100
code: |
  .<style>*{color:441212;border-radius:9in;margin:55%65%35%50;box-shadow:-5vw -30vw 0 5lh,45vw -5em 0 5lh,5em 0,inset 0 0 0 5vw}&{margin:50 100;outline:9in solid#b08743
---

The October 3 target is a round face on an ochre background: a dark brown rim, a white face with two small eyes, and a bowl cut that sweeps down from the top. Mark Boots draws it with two elements and one list of four shadows. The trick is a giant outline on the round `html`: it paints the ochre all around the circle, and since outlines are painted last, it also hides every shadow that spills out of the face.

{% include animations/2026-10-03.html lang=page.lang %}

## The code, spaced out

```css
/* "." : a bit of text in body */
* {                            /* html and body (head and style stay hidden) */
  color: 441212;               /* the shadows use this color */
  border-radius: 9in;
  margin: 55% 65% 35% 50;
  box-shadow:
    -5vw -30vw 0 5lh,          /* hair, left */
    45vw -5em 0 5lh,           /* hair, right */
    5em 0,                     /* right eye */
    inset 0 0 0 5vw;           /* rim (html), left eye (body) */
}
& {                            /* html */
  margin: 50 100;
  outline: 9in solid #b08743;
}
```

## How it works

### 1. html: a circle on a white canvas

`&` is `html`. The later `&` rule replaces its margin with `margin:50 100`. CSS Battle renders in quirks mode, where `html` fills the frame minus its margins, so it is a 200×200 square at (100, 50).

`border-radius:9in` asks for 864px. That is too much for a 200px box, so the browser scales the radius down to 100px: a circle. `html` has no background, so the canvas stays white. That white is the face.

### 2. The outline is a mask

`outline:9in solid#b08743` draws an 864px-wide ochre band around the box. In current browsers an outline follows `border-radius`, so the band hugs the circle and covers the whole canvas outside it.

An outline is painted after the content of the page. So anything that leaves the circle, even `body`'s shadows, ends up under the ochre. Without the outline, the shadows below spill over most of the canvas.

### 3. One shadow list, two elements

`*` gives the same `color`, radius, margin and four shadows to `html` and `body`. A shadow with no color uses `color`, here `441212` (in quirks mode, a color can drop its `#`).

On `html`, only one shadow is visible: `inset 0 0 0 5vw` is an inner ring 20px thick, the dark rim. The three outer shadows fall outside the circle, under the outline, and do nothing.

### 4. body: the eyes

`body` keeps `margin:55%65%35%50`. Percentages are a share of the parent's width, even at the top and the bottom, so with `html`'s 200px:

| Side | Margin |
| --- | --- |
| top | 55% = 110px |
| right | 65% = 130px |
| bottom | 35% = 70px |
| left | 50px |

That leaves 200 − 50 − 130 = 20px of width, and in quirks mode `body` stretches to 200 − 110 − 70 = 20px of height. A 20×20 box at (150, 160), round because of the radius.

Its `inset 0 0 0 5vw` fills it completely: the left eye, centered at (160, 170). `5em 0` is a plain copy of the disc, 80px to the right: the right eye, at (240, 170).

### 5. body: the hair

The two remaining shadows use a spread of `5lh`. `lh` is the line height: with the default font and `line-height:normal`, it is 18px, so 5lh is 90px. A 20px disc with 90px of spread becomes a disc with a 100px radius.

- `-5vw -30vw` moves it by (−20, −120): centered at (140, 50). It covers the top left of the face, and its lowest point is at y=150: the straight-looking edge of the fringe.
- `45vw -5em` moves it by (180, −80): centered at (340, 90). Its left edge reaches x=240 at y=90, and its curve cuts the right side of the face.

Both discs are much bigger than the face. The outline trims them to the circle.

### 6. The dot is not decoration

The `.` before `<style>` is text inside `body`. Without it, Chrome lays the page out differently: `html` comes out 240px tall instead of 200px, and the circle becomes an oval. With a bit of text in `body`, `html` keeps its 200px.

## Golf notes

- `outline:9in solid#b08743` is a circular mask in 24 characters, color included: it paints the background and hides the overflow at the same time.
- One shadow list serves both elements. The shadows `html` does not need land under the outline.
- `color:441212` without `#`, and shadows without a color.
- Short units: `5vw` is 20px, `30vw` 120px, `45vw` 180px, `5em` 80px, `5lh` 90px.
- `9in` is the shortest way to say "huge" for both the radius and the outline.
- `55%65%35%50`: no spaces needed after a `%`.
