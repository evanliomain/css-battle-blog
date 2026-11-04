---
title: "One tile, slid halfway: a lollipop in 153 characters"
lang: en
ref: 2026-10-08
permalink: /2026/10/08/one-tile-slid-halfway/
description: "How two radial gradients on html and a repeated background tile draw the October 8, 2026 CSS Battle target, with body as the stick."
target: /assets/targets/2026-10-08.png
target_url: https://cssbattle.dev/play/F2CiIdrt567y4qH4XEGq
colors: ["#9959", "#535fb1", "#d07b5f", "#444"]
player: cubachatou
chars: 153
score: 693.06
match: 100
code: |
   <style>&{background:radial-gradient(1Q,#d07b5f 53Q,#0000),radial-gradient(1in at 50%95%,#535fb1 90Q,#9959 89%)0 50vh;*{margin:190 190 60;background:#444
---

The October 8 target looks like a lollipop, or a little tree: a blue half-disc standing on its flat side, an orange disc in front of it, and a grey stick underneath. Vegy draws it with two gradients on `html` and the `body` as the stick. The clever part is how the half-disc gets its flat side: nothing cuts it, the background tile does.

{% include animations/2026-10-08.html lang=page.lang %}

## The code, spaced out

```css
& {                            /* & alone is html */
  background:
    radial-gradient(1Q, #d07b5f 53Q, #0000),                     /* layer 1, on top */
    radial-gradient(1in at 50% 95%, #535fb1 90Q, #9959 89%)      /* layer 2, below */
      0 50vh;                                                    /* its position */
  * {                          /* html's children: head, style, body */
    margin: 190 190 60;
    background: #444;
  }
}
```

## How it works

### 1. Two layers on html

At the top level of a style sheet, `&` means the root: `html`. Its `background` lists two layers. The first one is painted on top, the last one at the bottom, so the picture is built from the second gradient up.

### 2. A see-through color for the background

The bottom layer is a circle with a 1in (96px) radius, centered at `50% 95%`, so near the bottom edge. It is blue up to 90Q (85px), then `#9959` all the way out.

`#9959` is a 4-digit hex color with alpha: `#999955` at `99`, which is 60% opacity. The canvas behind the page is white, and 60% of that olive over white gives the beige of the target, about `#c2c299`. The see-through version costs 5 characters, the opaque one 7.

### 3. The flat side comes from the tile edge

`0 50vh` moves the layer down by half the height, 150px. A background repeats by default, so the gap at the top is filled by a copy of the same tile, coming from above.

That copy's circle is now centered at y = 285 − 300 + 150 = 135, and the copy stops at y = 150, where the next tile begins. Everything below that line belongs to the next tile, whose circle is far below the frame. So the circle is cut by a perfectly straight line: the flat side of the half-disc. No clipping, no extra element.

### 4. The orange disc on top

The first layer is `radial-gradient(1Q, #d07b5f 53Q, #0000)`, in the middle of the page:

- `1Q` makes it a circle (a single length is a radius). The radius itself does not matter, because the stop is an absolute length.
- Orange up to 53Q, about 50px.
- `#0000` (transparent) has no position. A stop can't come before the previous one, so it snaps to 53Q and gives a sharp edge.

### 5. body is the stick

`*` nested in `&` matches every child of `html`. `head` and `style` stay hidden, so only `body` shows. With `margin:190 190 60` (no units needed in quirks mode, which CSS Battle uses):

- it starts 190px from the top and 190px from each side, so it is 20px wide;
- in quirks mode, `body` stretches to fill the page height, minus its margins: 300 − 190 − 60 = 50px.

That gives the 20×50 grey stick at (190, 190), painted over the orange disc.

## Golf notes

- `#9959` replaces an opaque 7-character color by letting the white canvas finish the job.
- `0 50vh` with the default `repeat` turns a full circle into a half-disc, for 6 characters.
- `&` alone selects `html` and saves the `html` keyword.
- The first character is not a plain space but a non-breaking space (see below). It is invisible, and it is the one character this layout cannot do without.

## The invisible first character

The code starts with a non-breaking space (U+00A0), not a plain one. The difference matters: the HTML parser throws away plain spaces before `<style>`, but a non-breaking space is real text. It lands inside `body`, so `body` is not empty.

Without it, Chrome makes the page 430px tall instead of 300px: the gradients are sized and centered on a taller `html`, so the circles move down and the match breaks. With it, `html` stays 400×300 and everything lands where the target wants it. If you copy this solution by hand, keep that character.
