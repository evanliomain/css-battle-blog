---
title: "Four nested bars turned by offset: an eight-arm asterisk in 101 characters"
lang: en
ref: 2026-11-24
permalink: /2026/11/24/four-nested-bars-turned-by-offset/
description: "How one rule on four nested boxes, a split border and offset:ray(45deg) draw the November 24, 2026 CSS Battle target: a cream asterisk with eight arms around an octagonal hole."
target: /assets/targets/2026-11-24.png
target_url: https://cssbattle.dev/play/smEqIxdrhyUroSkKzEfp
colors: ["#0d1335", "#fbfae2"]
player: gabriele19
chars: 101
score: 752.75
match: 100
code: |
  <dl><p><style>*{background:#0D1335;border-block:53q solid#FBFAE2;width:20;height:42q;offset:ray(45deg
---

The November 24 target shows a cream asterisk on a navy background: eight 20 × 50 arms, every 45° around the center, with an octagonal hole in the middle. Gabriele draws it with four boxes nested in each other, `html`, `body`, `<dl>` and `<p>`, and a single rule. Each box is a bar whose two borders are two arms. `offset:ray(45deg)` puts every bar on the center of its parent and turns it 45° more than its parent.

The **wide view** shows the `<p>` sticking out below the canvas before `offset` moves it, and the **teaching colors** give each box its own color.

{% include animations/2026-11-24.html lang=page.lang %}

## The code, spaced out

```css
<dl><p>                             /* two more boxes: html > body > dl > p */
<style>
* {                                 /* the same rule for all four */
  background: #0D1335;              /* html: the canvas; the others: the middle of the bar */
  border-block: 53q solid #FBFAE2;  /* 50px of cream at the top and at the bottom */
  width: 20;                        /* 20px, in quirks mode */
  height: 42q;                      /* 39.67px: the gap between the two arms */
  offset: ray(45deg);               /* on the parent's center, turned −45° more */
}
```

## How it works

### 1. One bar, four times

`<dl><p>` adds two elements. The `<p>` goes inside the `<dl>`, which goes inside the `body`, which goes inside `html`: four boxes, each one inside the one before. `*` gives all of them the same rule (`head` and `style` get it too, but they are hidden).

The page has no doctype, so it runs in quirks mode, where `width:20` means 20px. `42q` is 42 quarter-millimeters, 39.69px, and the box is laid out at 39.67. `53q` is 50.08px, and Chrome draws the border at 50: I measured 50px. `border-block` puts it at the top and at the bottom only. Each box is a 20 × 139.67 bar: 50 of cream, 39.67 of navy, 50 of cream.

Without `offset`, the four bars stack in the top left corner. I measured `html` at (0, 0), the `body` at (8, 58), the `<dl>` at (8, 108) and the `<p>` at (8, 174). The `<p>` runs down to y = 313.67, below the canvas.

### 2. offset:ray() centers every box

`offset` is a shorthand for a motion path. With `ray(…)` and nothing else, the path starts at the center of the box's containing block, and the box sits on it by its own center. The distance along the ray is 0, so it stays there. Margins and normal layout no longer matter.

For `html`, the containing block is the 400 × 300 frame: its center is (200, 150). For the `body`, it is `html`'s content box. That box has moved with `html`, and its borders are the same at the top and at the bottom, so its center is (200, 150) too. The same goes for the `<dl>` and the `<p>`. I measured all four bars centered on (200, 150).

### 3. 45deg turns each level by −45°

`offset-rotate` defaults to `auto`: the box lines up its horizontal axis with the direction of the path. `ray(45deg)` points up and to the right, 45° clockwise from straight up. The horizontal axis of an unturned box points right, at 90°. So the box turns by 45° − 90° = −45°, an eighth of a turn to the left. With `ray(90deg)`, the bars stay upright: I checked it.

A child is laid out in its parent's frame, so it turns with its parent, then by its own −45°. The rotations add up: `html` −45°, `body` −90°, `<dl>` −135°, `<p>` −180°. I checked the directions by coloring the top border of each box: four bars, four different directions.

### 4. Eight arms and an octagonal hole

Each bar has an arm at each end: eight 20 × 50 arms, every 45°. The navy middle is 39.67 long, so every arm starts 19.84px from the center and ends 69.84px from it. The upright bar goes from y = 80.16 to 219.84.

Each arm's tip is a 20px segment, 19.84px from the center. A regular octagon whose sides are 19.84px from its center has sides of 2 × 19.84 × tan(22.5°) = 16.43px. The tips are wider than that, so each one overlaps the next and the hole is closed: it is that octagon.

### 5. The backgrounds

`html` has a background, so it goes to the whole canvas: that is the navy background of the target. The other three paint their own background on the middle of their bar, in the same color.

Those middles are painted after the boxes that come before them in the page. Where a corner of a middle crosses an earlier arm, it leaves a hairline seam: when I make the middles transparent, 22 pixels change, all around the hole. The site still gives the solution a 100% match.

## Golf notes

- `<dl><p>` is the shortest way to get two block boxes, one inside the other: `<p>` needs no closing tag, and a second `<p>` would close the first instead of going inside it.
- `html` and the `body` count as bars too, so two tags give four bars.
- One `*` rule for every box: no class, no selector per box.
- `offset:ray(45deg)` centers and turns at the same time: no margin, no `position`, no `rotate`.
- `width:20` needs no unit in quirks mode.
- `53q` writes the 50px border in 3 characters, and `border-block` sets the top and bottom borders in one property.
- `solid#FBFAE2` needs no space, `ray(45deg` is never closed, and neither is the rule.
