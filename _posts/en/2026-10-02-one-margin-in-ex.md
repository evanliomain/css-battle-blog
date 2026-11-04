---
title: "One margin in ex, two widths: a space invader in 141 characters"
lang: en
ref: 2026-10-02
permalink: /2026/10/02/one-margin-in-ex/
description: "How one border, one margin in ex and a zoom, shared by html, body and three headings, draw the October 2, 2026 CSS Battle target: a pixel-art space invader."
target: /assets/targets/2026-10-02.png
target_url: https://cssbattle.dev/play/KX0Y2zNqhT7RlOsL0IRq
colors: ["#141413", "#d97757"]
player: cubachatou
chars: 141
score: 704.33
match: 100
code: |
  <h2><h6><h6><style>*{background:#141413;margin:40 100;border:solid#D97757;border-width:30 20 0;*{margin:-6%20 13;*{margin:0-6ex -8q;zoom:1.67
---

The October 2 target is a coral pixel-art monster on a near-black background: a square body with two eyes, two arms and four short legs. Vegy builds it from five boxes that all wear the same border. The arms and the belly come from one margin written in `ex`: the same `6ex` is wide on an `h2` and narrow on an `h6`, because `ex` follows the font size.

{% include animations/2026-10-02.html lang=page.lang %}

## The code, spaced out

```css
/* <h2><h6><h6> : three empty headings, side by side in body */
* {                          /* html (and everything else) */
  background: #141413;
  margin: 40 100;
  border: solid #D97757;
  border-width: 30 20 0;     /* top, sides, bottom */
  * {                        /* body (and below) */
    margin: -6% 20 13;
    * {                      /* the three headings */
      margin: 0 -6ex -8q;
      zoom: 1.67;
    }
  }
}
```

## How it works

### 1. Three levels of `*`

A heading can't contain another heading. When the parser meets `<h6>` inside an open `<h2>`, it closes the `<h2>` first. So `<h2><h6><h6>` gives three sibling headings inside `body`, and the `<style>` ends up in the last one.

The nested `*` rules then pick the elements by depth, without naming them:

- `*` matches everything, so all elements get the background, the margin and the coral border;
- `* *` needs one ancestor: `body` and everything below it;
- `* * *` needs two: the three headings.

### 2. html: an arch

`margin:40 100` leaves a 200px-wide box. CSS Battle renders in quirks mode, where `html` fills the frame minus its margins, so it is 220px tall: from (100, 40) to (300, 260).

Its background goes to the canvas, as the root background always does. Its border is 30px at the top, 20px on the sides and 0 at the bottom: an upside-down U, an arch.

### 3. body: a second arch, and the eyes

`body` gets the same border. `margin:-6%20 13` places it:

- a percentage margin is a share of the parent's width, even at the top: −6% of 160px is −9.6px, so `body` starts at y≈60, under `html`'s top border;
- 20px on each side makes it 120px wide, from x=140 to 260;
- in quirks mode it stretches down to the bottom of `html`.

Its top border covers y 60 to 90 between x=140 and 260. Right next to it, at x 120 to 140 and 260 to 280, nothing covers the dark inside of `html`, from y=70 (under `html`'s border) down. The arms will close those gaps at y=90: two 20×20 dark squares, the eyes.

### 4. Headings as solid bands

The headings are empty, so their content is 0px tall. With a 30px top border and 20px side borders, each one is a solid coral band, 30px tall.

`margin:0-6ex` makes each band stick out on both sides of `body`'s 80px content box. `ex` is the x-height of the current font, and the headings have their default font sizes:

| | Font size | 6ex (measured locally) |
| --- | --- | --- |
| `h2` | 1.5em = 24px | ≈66px |
| `h6` | 0.67em ≈ 10.7px | ≈30px |

So the same margin makes a wide `h2` and two narrow `h6`. The `-8q` bottom margin (−7.6px) pulls each band up over the previous one.

### 5. zoom:1.67 scales it all

`zoom` multiplies every length of the headings: borders, margins, overhangs.

- The bands go from 30px to 50px tall.
- The `h2` sticks out by about 110px on each side: it spans x 50 to 350. Those are the arms, at y 90 to 140.
- The `h6` stick out by about 50px: x 110 to 290. Their ends are hidden under `html`'s side borders, so they fill the belly.
- The −12.6px bottom margins stack the bands every 37.4px: they cover y 90 to 215.

### 6. The legs are what's left

Below y=215, nothing covers the two arches anymore. Their side borders run down to y=260: `html`'s at x 100 and 280, `body`'s at x 140 and 240, 20px each. Four legs. The gaps between them are `html`'s inside and `body`'s dark background, and since the bottom border is 0, nothing joins them at the bottom.

## Golf notes

- `<h2><h6><h6>`: no closing tags, and two font sizes for the price of one margin.
- `*`, `* *` and `* * *` reach `html`, `body` and the headings by depth, in one character per level.
- One `border` and one `border-width` serve all five boxes. `zoom` turns the 30px top border into the 50px bands.
- Unitless numbers in quirks mode: `margin:40 100`, `border-width:30 20 0`.
- No spaces needed in `-6%20`, `0-6ex` or `solid#D97757`.
- `8q` is 7.6px in 2 characters.

## If you try it at home

`ex` comes from the font's x-height, so it depends on the default font of the system. In the latest Chrome on a Mac (version 156 when this was written), the `h2`'s `6ex` measures 66.3px. Zoomed, the arms come out 301.4px wide and are drawn from x=49 to 351, one pixel too wide on each side: 100 wrong pixels, two columns of 50. The target's arms span exactly x 50 to 350. On the CSS Battle judge, the solution is a 100% match.
