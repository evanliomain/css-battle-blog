---
title: "One gradient, three values: a split door in 144 characters"
lang: en
ref: 2026-10-22
permalink: /2026/10/22/one-gradient-three-values/
description: "How one fixed radial gradient, shared by every element and finished by a custom property, draws the October 22, 2026 CSS Battle target."
target: /assets/targets/2026-10-22.png
target_url: https://cssbattle.dev/play/bkZ5Wcu73bOWnpZPZKSK
colors: ["#173c46", "#30acce", "#fff"]
player: evanliomain
chars: 144
score: 701.39
match: 100
code: |
  <h1><h6><style>*{background:radial-gradient(1Q,#173c46 var(--c,8mm,#30acce))fixed;margin:10 40 10 95;*{--c:;*{margin:20;padding:55;--c:.8lh,#fff
---

The October 22 target is a white door on a sky-blue background: two white squares framed by a dark teal post on the left and a dark bar between them, with a dark disc on the post, at the center of the canvas. I write a single `background` for every element. A custom property, `--c`, finishes the gradient differently on each level: a disc on the canvas, a flat block on `body`, white squares with the same disc on the headings.

{% include animations/2026-10-22.html lang=page.lang %}

## The code, spaced out

```css
* {                                   /* html, head, body, h1, h6, style */
  background:
    radial-gradient(1Q, #173c46 var(--c, 8mm, #30acce))
    fixed;                            /* centered on the viewport */
  margin: 10 40 10 95;
  * {                                 /* head (hidden) and body */
    --c: ;                            /* empty */
    * {                               /* h1, h6 (and the hidden style) */
      margin: 20;
      padding: 55;
      --c: .8lh, #fff;
    }
  }
}
```

## How it works

### 1. One gradient, finished by a variable

The gradient is `radial-gradient(1Q, #173c46 var(--c, 8mm, #30acce))`. Everything after the dark color comes from `--c`:

| Element | `--c` | The gradient becomes | Result |
| --- | --- | --- | --- |
| `html` | not set: the fallback | `#173c46 8mm, #30acce` | a dark 30.2px disc, sky blue around |
| `body` | set, but empty | `#173c46` | a flat dark fill |
| `h1`, `h6` | `.8lh, #fff` | `#173c46 .8lh, #fff` | a dark disc, white around |

The fallback of `var()` is everything after the first comma, so `8mm,#30acce` is one fallback with two parts. An empty `--c:` is different from no `--c` at all: the variable exists, so the fallback is not used, and `var()` turns into nothing. A gradient with a single color stop is a flat color.

`1Q` makes the gradient a circle, and a tiny one: the last color has no position, so it would sit at 100% of 1Q, about 0.95px. A stop can't come before the previous one, so it is pulled up to the disc's edge, which stays sharp.

### 2. fixed: the same center for everyone

`fixed` lays the background out on the viewport instead of the element's box. So on every element, the circle is centered on (200, 150), the middle of the canvas. Each element only shows the part that falls inside its own box. That is how the disc on the canvas and the disc on the `h1` line up as one shape.

### 3. html paints the canvas

`html` gets `margin:10 40 10 95`, but its background is not painted in its box: the background of `html` covers the whole canvas. That gives the sky blue and the full dark disc, 8mm (30.2px) in radius, at the center.

### 4. body is the dark block

`body` gets the same margins inside `html`: it starts at x=95 + 95 = 190 and ends at 400 − 40 − 40 = 320, so it is 130px wide. At the top, its 10px margin merges with the 20px margin of the `h1` inside it (nothing separates them), so the bigger one wins and `body` starts at y=30. Same at the bottom with the `h6`. In quirks mode, `body` takes the height of `html` minus those margins: 280 − 20 − 20 = 240px, from y=30 to 270.

With the empty `--c`, its background is flat dark teal. It covers the right half of the disc, and becomes the post and the bar of the door.

### 5. h1 and h6: two white windows

`<h1>` and `<h6>` sit in `body`. They get `margin:20;padding:55`. There is no room for content: 130 − 2 × 20 leaves 90px, less than the 110px of padding. So the content shrinks to 0 and each heading is a 110×110 box, sticking out to the right edge of `body`. They are empty, so they are 110px tall too.

- The `h1` goes from (210, 30) to (320, 140).
- The `h6` comes after a 20px gap, from (210, 160) to (320, 270).

The 20px strip on the left and the 20px gap between them are the `body` showing through: the post and the bar.

### 6. .8lh: one disc, two sizes

`lh` is the element's line height. Headings keep their default font sizes:

- `h1`: 32px, a normal line height of 37px, so `.8lh` is 29.6px. Its corner, at (210, 140), is only 14px from the center: the dark disc bites into it.
- `h6`: 10.7px, a line height of 13px, so `.8lh` is 10.4px. Its corner, at (210, 160), is also 14px away: out of reach. The `h6` stays all white.

That is why the disc cuts into the top square only.

## Golf notes

- One `background` for all elements; `--c` changes it per level.
- `--c:;` (5 characters) turns the gradient into a flat color, by skipping the fallback.
- `fixed` puts the disc in the same place on every element, so pieces painted by different elements line up.
- `.8lh` gives two radii from one value, because `h1` and `h6` have different default fonts.
- `padding:55` makes a 110×110 box with no `width` or `height`.
- `1Q` is the shortest way to say `circle`, and it keeps the disc edge sharp without a trailing `0`.
- `<h1><h6>`: two elements in 8 characters. `<style>` is never closed.
