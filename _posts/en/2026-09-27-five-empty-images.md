---
title: "Five empty images: an alarm clock in 241 characters"
lang: en
ref: 2026-09-27
permalink: /2026/09/27/five-empty-images/
description: "How five empty images and two box shadows draw the September 27, 2026 CSS Battle target: a navy alarm clock on a tan background."
target: /assets/targets/2026-09-27.png
target_url: https://cssbattle.dev/play/ZJjczkH5G0qHP61dMO4k
colors: ["#d5a06c", "#1e2c5c"]
player: krhek
chars: 241
score: 640.23
match: 100
code: |
  <img><img><img a><img><img><style>*{background:#D5A06C;*>*{box-shadow:0 0 0 1.25em#1E2C5C,0 0 0 1.7lh#D5A06C;margin:52-22-52 122;border-radius:9lh;padding:10 .56lh}[a]{padding:70;~*{rotate:-45deg;+*{rotate:45deg}margin:0-111-80 5;font:50%/0"
---

The September 27 target is a navy alarm clock on a tan background: a big ring, two small bells on top, set slightly apart, and two feet. Wojciech Russek's solution draws it with five empty `<img>` and one shared rule. Every image gets the same two spread shadows: a navy ring, then a halo in the background color that cuts the bells. The last two images get a smaller font with no line height, and the same rule turns them into two square bars, tilted into feet.

Use **Teaching colors** to see the second shadow, the halo.

{% include animations/2026-09-27.html lang=page.lang %}

## The code, spaced out

```css
<img><img><img a><img><img>      /* two bells, the clock, two feet */
<style>
* {
  background: #D5A06C;           /* html: the canvas */
  * > * {                        /* the five images */
    box-shadow:
      0 0 0 1.25em #1E2C5C,      /* navy ring, 20px */
      0 0 0 1.7lh #D5A06C;       /* tan halo, 30.6px */
    margin: 52 -22 -52 122;
    border-radius: 9lh;          /* 162px: circles */
    padding: 10 .56lh;           /* 20.16 × 20 */
  }
  [a] {
    padding: 70;                 /* the clock: 140 × 140 */
    ~ * {                        /* the two feet */
      rotate: -45deg;
      + * { rotate: 45deg }
      margin: 0 -111 -80 5;
      font: 50% / 0 "";          /* 8px font, line height 0 */
    }
  }
}
```

## How it works

### 1. Five empty images on two lines

An `<img>` with no source shows nothing: it is an empty inline box, like a word with no letters. The nested `*>*` means `* *>*`: an element whose parent is inside another element. That skips `html` and `body`, and matches the five images (and the `<style>`, which is not shown).

`padding:10 .56lh` gives each image 10px at the top and bottom, and .56lh on the sides. `lh` is the line height: with the default font, `normal` is 18px here, so .56lh is 10.08px. Each image is 20.16 × 20.

`margin:52-22-52 122` places them. On a line, each image starts 122px after the end of the previous one, minus 22: the first one at x = 8 + 122 = 130, the second at 130 + 20.16 − 22 + 122 = 250.16. Those are the bells, at y = 8 + 52 = 60.

The third image has the bare attribute `a`, matched by `[a]`. `padding:70` makes it 140 × 140. It would start at x = 370.32, so it does not fit on the line: it wraps to the next one, at x = 130 and y = 80.

### 2. Circles and a navy ring

`border-radius:9lh` is 162px, far more than half of any box: Chrome scales it down, and every box becomes a circle (the bells are 20px wide, the clock 140px).

The first shadow has no offset and no blur, only a spread: `1.25em` is 1.25 × 16 = 20px. It is a copy of the circle, 20px bigger all around, in navy. The box itself keeps its tan background. So each circle becomes a 20px navy ring: the clock's ring runs from a radius of 70 to 90 around (200, 150).

### 3. The halo cuts the bells

The second shadow spreads `1.7lh` = 30.6px, in the background color. A later shadow is painted under an earlier one, so it shows only as a 10.6px tan halo around each navy ring.

The images are painted in order, so the clock comes after the bells. Its halo, from a radius of 90 to 100.6, covers the bottom of the bells' rings. That is the gap between the bells and the clock: the bells become two arcs.

### 4. font:50%/0: two bars

`~*` inside `[a]` matches the images after it: the last two. `font:50%/0"` sets their whole font in one value. The size is 50% of 16px, 8px. The line height is 0. The family is `""`: the string is never closed, and the end of the style sheet closes it.

That changes every unit in the shared rule. `1.25em` is now 10px. Everything in `lh` is now 0: no side padding, no radius, no halo. Each image is a 0 × 20 box, and its navy shadow spreads 10px all around: a square bar, 20 × 40.

`margin:0-111-80 5` places them on the clock's line. The first one starts 22px back from the clock's right edge, plus 5: x = 253. The second one comes 111px back, plus 5: x = 147. An image sits on the baseline by the bottom of its margin box. The baseline is at y = 168, the bottom of the clock's margin box (80 + 140 − 52), so the −80 bottom margin puts each box from y = 228 to 248. The bars are centred at y = 238.

### 5. An eighth of a turn each

`rotate:-45deg` tilts the first bar, and `+*{rotate:45deg}` (the image right after it) tilts the second one the other way. Each turns around its centre, so their top ends reach into the ring: the feet.

## Golf notes

- One rule draws five shapes: the font of the last two changes what `em` and `lh` are worth, so the same values give circles for three images and square bars for two.
- `lh` is 0 when the line height is 0: `.56lh`, `9lh` and `1.7lh` all switch off with one `/0`.
- The halo in the background color is a cheap eraser: it cuts the bells without any other element.
- An empty `<img>` is a 5-character box that sits on a line, so `margin` alone places five of them.
- `font:50%/0"` ends the style sheet: the open string is the font family.
- No closing braces, and `<style>` is never closed.
