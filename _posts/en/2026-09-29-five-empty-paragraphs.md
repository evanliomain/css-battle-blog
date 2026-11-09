---
title: "Five empty paragraphs: a ladder in 141 characters"
lang: en
ref: 2026-09-29
permalink: /2026/09/29/five-empty-paragraphs/
description: "How five empty paragraphs and one tiled conic gradient draw the September 29, 2026 CSS Battle target: red rungs between two navy posts."
target: /assets/targets/2026-09-29.png
target_url: https://cssbattle.dev/play/EABR37FZaeuj1tSIEZo3
colors: ["#cc5360", "#c0d6e7", "#2d3464"]
player: emohdaziz
chars: 141
score: 704.33
match: 100
code: |
  <p><p><p><p><p a><style>&{p{border:11Q solid#cc5360;margin:20 14ch}[a]{font:6%a}background:53Q/65%conic-gradient(at 42q,#c0d6e7,75%,#2d3464 0
---

The September 29 target looks like a ladder: four short red bars between two navy posts, and a long red bar below that reaches the posts, on a pale blue background. Mohamed Ali's solution draws the five bars with five empty paragraphs: each one is only its top and bottom border. The last one gets a tiny font, which makes its `ch` margins smaller and the bar longer. The two posts come from one conic gradient, tiled across the canvas.

Use **Teaching colors** to see the background tiles.

{% include animations/2026-09-29.html lang=page.lang %}

## The code, spaced out

```css
<p><p><p><p><p a>                  /* five empty paragraphs, the last one marked */
<style>
& {                                /* html */
  p {
    border: 11Q solid #cc5360;     /* 10px top and bottom: a 20px bar */
    margin: 20 14ch;               /* 112px on each side */
  }
  [a] {
    font: 6% a;                    /* 6px font: 1ch = 3px */
  }
  background: 53Q / 65%            /* tile at x = 50.08, 260px wide */
    conic-gradient(at 42q, #c0d6e7, 75%, #2d3464 0);
}
```

## How it works

### 1. Five empty paragraphs are five bars

The five `<p>` have no text, so their content is 0px tall. At the top level of a style sheet, a lone `&` matches the root, `html`. The nested `p{…}` therefore matches every `<p>` in the page.

Each `<p>` gets an `11Q` border. `11Q` is 11 quarter-millimetres: 10.39px. Chrome rounds a border width down to a whole pixel, so the border is 10px. The left and right borders have no height to draw, so only the top and bottom ones show: each `<p>` is a red bar, 10 + 0 + 10 = 20px tall.

### 2. Margins in ch

`margin:20 14ch` gives each `<p>` 20px at the top and bottom, and 14ch on the left and right. `1ch` is the width of the character "0" in the current font. In the default 16px font, it is 8px, so 14ch is 112px. Add the `body`'s 8px margin, and the bars run from x = 120 to 280.

Vertical margins between blocks collapse: the 20px under one bar and the 20px above the next make one 20px gap. The first bar's top margin also merges with the `body`'s 8px margin, so it starts at y = 20. That puts a bar every 40px: at y = 20, 60, 100, 140 and 180.

### 3. The last paragraph has smaller ch

The fifth paragraph is `<p a>`: it has a bare attribute `a`, and `[a]` matches it. `font:6%a` sets its font size to 6% of 16px, which is 0.96px, and its font family to "a", which does not exist.

Chrome has a minimum font size of 6px for sizes given in relative units. So the font is 6px, not 0.96px. I checked it: `1%`, `30%` and `.3em` all give 6px, while `1px` gives 1px. In a 6px font, the "0" is 3px wide, so 14ch is 42px. The same `margin:20 14ch` now leaves this bar 300px long, from x = 50 to 350.

### 4. One conic gradient tile

`background` is in the `&` rule, so it belongs to `html`, and `html`'s background is used for the whole canvas.

`53Q/65%` is a position, then a size. The tile is 65% of the canvas width, 260px. With no height given, a gradient tile is as tall as the area: 300px. `53Q` (50.08px) is the tile's x position. With no y position, it is centred, which changes nothing for a full-height tile.

`conic-gradient(at 42q, …)` turns around the point 42q (39.69px) from the tile's left edge, and halfway down (y = 150). It starts at the top and goes clockwise. The `75%` between the two colors is a transition hint. `#2d3464 0` asks for position 0, but a stop cannot come before the ones listed before it, so it moves up to 75%. The result: pale blue for the first three quarters of the turn, navy for the last quarter. I checked that `#c0d6e7 75%,#2d3464 0` gives the same render, with the same length.

The last quarter is the part up and to the left of the centre. In the first tile, that is a navy post from x = 50.08 to 89.77 and from y = 0 to 150.

### 5. The tile repeats

A background repeats by default. The next tile starts 260px further, at x = 310.08, and its navy quarter is the second post, from x = 310.08 to 349.77. The tile before falls off the canvas on the left. The post edges are 0.08px off whole pixels and 0.23px off at x = 89.77, close enough for a 100% match.

## Golf notes

- An empty `<p>` with a border is a bar with no `width` or `height`: `<p>` is 3 characters each.
- `11Q` is 10px in 3 characters, because the width is rounded down.
- `&{…}` at the top level is `html`: the nested `p` and `[a]` need no `*`, and `background` sits in the same rule.
- `<p a>` and `[a]` mark one element in 2 + 3 characters, with no class.
- `font:6%a` (8 characters) changes the size of `ch` for that one bar. The same `14ch` then gives a different margin, without a second `margin`.
- `53Q/65%` sets the tile's position and width in one value. One gradient then draws both posts, because the tile repeats.
- No closing braces, and `<style>` is never closed.
