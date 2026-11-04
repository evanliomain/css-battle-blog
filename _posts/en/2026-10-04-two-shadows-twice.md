---
title: "Two shadows, twice: a burger in 126 characters"
lang: en
ref: 2026-10-04
permalink: /2026/10/04/two-shadows-twice/
description: "How one pair of box-shadows, worn by html and by a clipped body, draws the October 4, 2026 CSS Battle target: a burger."
target: /assets/targets/2026-10-04.png
target_url: https://cssbattle.dev/play/J10ALm0Yug1xXEdXhAHp
colors: ["#d6ba72", "#d9d9d9", "#4c7a6f"]
player: martinb
chars: 126
score: 720.37
match: 100
code: |
  <style>*{margin:175 130 105;box-shadow:inset 0 32q#D6BA72,0-32q#D9D9D9;*{background:#4C7A6F;margin:-70 0 30;clip-path:ellipse(
---

The October 4 target is a burger on a sea-green background: a sand-colored dome on top, a light grey patty, and a flat bottom bun, with thin green gaps between them. Martin Berglund writes two box-shadows, a gold one and a grey one, and uses them twice. On `html` they draw the bottom bun and the patty. On `body`, cut by `clip-path:ellipse()`, the gold one becomes the dome and the grey one disappears.

{% include animations/2026-10-04.html lang=page.lang %}

## The code, spaced out

```css
* {                                /* html and body (head and style stay hidden) */
  margin: 175 130 105;
  box-shadow:
    inset 0 32q #D6BA72,           /* gold, inside, moved down 30.2px */
    0 -32q #D9D9D9;                /* grey, outside, moved up 30.2px */
  * {                              /* body */
    background: #4C7A6F;
    margin: -70 0 30;
    clip-path: ellipse();
  }
}
```

## How it works

### 1. The background belongs to body, the color to the canvas

Only the nested rule sets a background, so `html` has none. When the root has no background, the browser takes `body`'s background and paints it on the whole canvas instead. `body`'s own box then paints no background at all.

So the sea green covers everything, and `body` is a see-through box. That matters later: it lets you see through the bottom half of the dome's ellipse.

### 2. html: a 140×20 strip

`margin:175 130 105` leaves 400 − 260 = 140px of width. CSS Battle renders in quirks mode, where `html` fills the frame minus its margins: 300 − 175 − 105 = 20px of height. A strip from (130, 175) to (270, 195), with nothing painted in it except its shadows.

### 3. The inset shadow fills the bottom bun

`inset 0 32q #D6BA72` is an inner shadow moved 32q down. 32q is 32 quarter-millimeters, about 30.2px.

An inset shadow moved down colors a band along the top edge of the box, as tall as the offset. Here the offset is 30.2px and the box is only 20px tall, so the band covers the whole box. The strip turns gold: the bottom bun, y 175 to 195.

### 4. The outer shadow is the patty

`0 -32q #D9D9D9` is a copy of the box moved 30.2px up. An outer shadow is never painted under its own box, but this copy lands entirely above it: a grey 140×20 strip from y≈145 to 165. Between it and the bun, 10px of green: the first gap.

### 5. body: a 140×60 box above

`body` gets the same margin rule first, then its own: `margin:-70 0 30`.

- No side margins, so it is as wide as `html`'s box: 140px, from x=130.
- The −70px top margin pulls it 70px above `html`'s content box: it starts at y=105.
- In quirks mode it stretches to fill `html`'s height minus its margins: 20 + 70 − 30 = 60px. It ends at y=165.

### 6. Same shadows, clipped into a dome

`*` also gives `body` the two shadows:

- the gold inset one colors the top 30.2px of its box, y 105 to about 135;
- the grey outer one would show above the box, y≈75 to 105.

`clip-path:ellipse()` with no arguments draws an ellipse centered in the box, with radii that reach the closest sides: 70px across, 30px up and down. Everything outside is cut away, shadows included.

- The grey shadow above the box is cut off completely.
- The gold band keeps only the top half of the ellipse: the dome, y 105 to 135.
- The bottom half of the ellipse is empty, because `body` has no background of its own. Through it, you see the green gap and `html`'s patty. The patty ends at y≈165, where the ellipse ends too.

## Golf notes

- One shadow pair, two jobs: `html` and `body` both get it from `*`.
- An inset shadow with an offset larger than the box fills the box, a cheap way to paint it.
- `32q` (30.2px) fits both offsets in 3 characters.
- `ellipse(` needs no arguments and no closing parenthesis at the end of the file.
- Background propagation turns `body`'s background into the canvas color for free.
- No space needed in `32q#D6BA72` or `0-32q#D9D9D9`.
