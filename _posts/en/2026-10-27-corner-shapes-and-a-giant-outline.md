---
title: "Corner shapes and a giant outline: an arrow in 97 characters"
lang: en
ref: 2026-10-27
permalink: /2026/10/27/corner-shapes-and-a-giant-outline/
description: "How one html box, a huge outline and corner-shape:notch bevel draw the October 27, 2026 CSS Battle target: a white arrow on a plum background."
target: /assets/targets/2026-10-27.png
target_url: https://cssbattle.dev/play/0bO40qQCb991cXkXDRvj
colors: ["#72374d"]
player: levito
chars: 97
score: 758.69
match: 100
code: |
  <style>&{margin:30%35%60;outline:9in solid#72374D;border-radius:0 50%50%;corner-shape:notch bevel
---

The October 27 target is a white shape on a plum background, like an arrow pointing to the top right: a square with a slanted top-right corner, a square notch at the bottom right and a slanted bottom-left corner. Veit Lehmann draws it with a single box, `html`, and four declarations. The plum is not a background but a huge outline, and `corner-shape` turns the rounded corners into slants and a notch.

{% include animations/2026-10-27.html lang=page.lang %}

## The code, spaced out

```css
& {                               /* html */
  margin: 30% 35% 60;             /* a 120 × 120 box at (140, 120) */
  outline: 9in solid #72374D;     /* 864px of plum all around */
  border-radius: 0 50% 50%;       /* 0 / 60 / 60 / 60 */
  corner-shape: notch bevel;      /* notch, bevel, notch, bevel */
}
```

## How it works

### 1. html is the white shape

At the top level, `&` means `html`. It has no background, so the canvas behind it stays white.

`margin:30%35%60` has three values: top, sides, bottom. Percentage margins are taken from the width, even vertical ones: 30% of 400 is 120px at the top, 35% is 140px on each side, and the bottom is 60px. CSS Battle runs in quirks mode, where `html` fills the page minus its margins: 400 − 280 = 120 wide, 300 − 120 − 60 = 120 tall. A 120 × 120 box at (140, 120).

The `body` inside it has no background either, so it doesn't show.

### 2. The background is an outline

`outline:9in` is 864px thick. An outline is drawn outside the box, and 864px is more than enough to reach every edge of the canvas. Everything outside the box turns plum; the canvas only shows inside the box.

An outline follows the shape of the box's corners. So whatever shape the corners take, the white area takes it too.

### 3. Three 60px corners

`border-radius:0 50%50%` has three values: top left, then top right and bottom left, then bottom right. That is 0 at the top left and 50% (60px on a 120px box) everywhere else. With the default round corners, this would be a box with three rounded corners.

### 4. corner-shape changes what the corners look like

`corner-shape` keeps the radii but changes the curve drawn inside them. With two values, it repeats like `border-radius`: the first for top left and bottom right, the second for top right and bottom left.

| Corner | Radius | Shape | Result |
| --- | --- | --- | --- |
| top left | 0 | `notch` | square corner (no radius, nothing to cut) |
| top right | 60px | `bevel` | a straight slant from (200, 120) to (260, 180) |
| bottom right | 60px | `notch` | a 60 × 60 square cut into the box |
| bottom left | 60px | `bevel` | a straight slant from (140, 180) to (200, 240) |

`bevel` replaces the quarter circle by a straight line. `notch` cuts the whole corner area out as a square, toward the inside of the box.

The 60px radii meet exactly in the middle of the right and bottom sides, so the shape has no straight piece left there: the slant ends where the notch starts.

## Golf notes

- No background color: the white is the canvas, the plum is the outline.
- `9in` (864px) is a short way to say "big enough": the exact value doesn't matter once the outline covers the canvas.
- `30%35%60` needs no spaces: `%` ends a number.
- Two `corner-shape` keywords cover four corners, and the 0 radius turns the extra `notch` into a plain square corner.
- `<style>` is never closed.
