---
title: "A tile edge as a cutter: a light bulb in 139 characters"
lang: en
ref: 2026-10-23
permalink: /2026/10/23/a-tile-edge-as-a-cutter/
description: "How one radial gradient, shared by html, body and two headings, draws the October 23, 2026 CSS Battle target: a light bulb cut flat by the edge of its own background tile."
target: /assets/targets/2026-10-23.png
target_url: https://cssbattle.dev/play/z3C2kNvqCfxq06B81Mfm
colors: ["#edf4b0", "#ce4830"]
player: emohdaziz
chars: 139
score: 706.34
match: 100
code: |
  .<h1><h4><style>*{background:radial-gradient(1Q at 50%83.3%,#edf4b0,5pc,#ce4830)0 196Q;*{margin:125 190-9e3;*{margin:52-2.7ex -42;height:20
---

The October 23 target is a light bulb on a brick-red background: a pale yellow disc cut flat at the bottom, split by a red slit, with two bars underneath. Mohamed Ali draws it with one gradient that every element shares. The flat cut is free: it is the edge of the background tile. The slit and the bars are just boxes that show other parts of the same gradient.

{% include animations/2026-10-23.html lang=page.lang %}

## The code, spaced out

```css
.<h1><h4>                 /* a dot of text, then two headings */
<style>
* {                       /* every element */
  background:
    radial-gradient(1Q at 50% 83.3%, #edf4b0, 5pc, #ce4830)
    0 196Q;               /* tile moved 185px down */
  * {                     /* head, body, h1, h4, style */
    margin: 125 190 -9e3; /* body: the slit */
    * {                   /* h1, h4, style */
      margin: 52 -2.7ex -42;
      height: 20;         /* h1, h4: the bars */
    }
  }
}
```

## How it works

### 1. One disc on html

`html` has no margin, so its box is the whole 400×300 frame. Its background goes to the canvas, and its tile is that same 400×300 box.

The gradient is a circle: `1Q` is a single length, so it means "a circle with this radius". It is centered at `50% 83.3%`, which is (200, 250). It is yellow up to 5pc (80px), red beyond.

### 2. A color hint makes the hard edge

`#edf4b0, 5pc, #ce4830` has no stop positions on the colors. The lone `5pc` between them is a color hint: it says where the middle of the blend is.

The red has no position, so it would sit at the end of the gradient ray, which is only 1Q long. But a stop can't come before the hint, so the red moves up to 80px too. The blend now has to happen between 80px and 80px: there is no blend. The yellow holds all the way to 80px, and the edge is sharp. It renders exactly like `#edf4b0 5pc,#ce4830 0`, 2 characters shorter.

### 3. The tile edge cuts the disc flat

`0 196Q` moves the tile down by 196Q, which is 185.2px. The background repeats, so the copy above fills the gap:

- that copy ends at y = 185.2, where the moved tile begins;
- its disc is centered 50px above its bottom edge, at y ≈ 135.

So the disc runs from y ≈ 55 to the tile edge at y ≈ 185, where it stops in a straight line. The moved tile's own disc is now centered at y ≈ 435, out of the frame. That is why the center sits at 83.3%: 250 is 50px above the bottom of a 300px tile, the distance between the center and the cut.

### 4. body is the slit

The middle rule matches every descendant of `html`. Only `body` shows from it (`head` stays hidden). `margin:125 190-9e3` means top 125, sides 190, bottom −9000.

- 400 − 190 − 190 leaves a 20px wide box at x = 190.
- CSS Battle runs in quirks mode, where `body` fills the page height minus its margins: 300 − 125 + 9000 = 9175px.

`body` gets the same gradient, but on a 20 × 9175 tile its disc is about 7,600px down. On the canvas, the body is all red: a 20px slit from y = 125 down, which shows over the disc.

### 5. Two headings, one margin, two widths

`<h4>` can't sit inside `<h1>`: the browser closes the `h1` first, so the two headings are siblings in `body`. The `<style>` ends up inside the `h4`, where it stays hidden.

The inner rule gives them `margin:52-2.7ex -42` and `height:20`. The negative side margins make each heading wider than the 20px body. `ex` depends on the font size, and headings have their own:

| Heading | Font size | −2.7ex | Width |
| --- | --- | --- | --- |
| `h1` | 32px | −39.8px | 99.6px |
| `h4` | 16px | −19.9px | 59.8px |

Their own tiles are 100 × 20 and 60 × 20. Every point is well within 80px of a tile's center, so they are all yellow.

Vertically, the h1's −42 bottom margin and the h4's 52 top margin collapse into one 10px gap: the bars sit at y = 195 and y = 225.

### 6. The dot keeps the margins apart

The `.` before `<h1>` is a line of text in `body`, 18px tall. Without it, the h1's 52px top margin would collapse with the body's 125px margin, and the h1 would start at y = 125, inside the bulb. With the line in between, the h1 starts at 125 + 18 + 52 = 195.

The dot itself is drawn, in black, in the slit at about (191, 138). It is only a few pixels, and the match stays at 100%.

## Golf notes

- `,5pc,` as a color hint replaces `5pc` and `0` stop positions: 2 characters saved.
- The flat cut costs nothing: `0 196Q` places the tile edge on it.
- `1Q` makes the gradient a circle in 2 characters.
- One `-2.7ex` margin gives two widths, because `ex` follows each heading's font.
- `190-9e3` and `52-2.7ex` need no space before the minus sign. `9e3` is 9000 in 3 characters.
- Nesting `*{*{*{` reaches one level deeper at a time, with no tag names.
- A single `.` is the cheapest way to stop margin collapsing.
