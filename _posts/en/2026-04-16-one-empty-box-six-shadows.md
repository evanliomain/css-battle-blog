---
title: "One empty box, six shadows: a checkerboard in 136 characters"
ref: 2026-04-16
permalink: /2026/04/16/one-empty-box-six-shadows/
description: "How one empty html box shows the white canvas, how five box shadows copy it into a red and white checkerboard, and how a sixth shadow with a 9in spread paints the orange background, in the April 16, 2026 CSS Battle target."
target: /assets/targets/2026-04-16.png
target_url: https://cssbattle.dev/play/4XFEtUgqrtt3F6IXBYlH
colors: ["#fff", "#e8ad6d", "#a84a4b"]
player: h_blierzt
chars: 136
score: 709.43
match: 100
code: |
  <style>&{margin:45 65%155 40;box-shadow:116q 0,55vw 0#FFF,0 116q,116q 116q#FFF,55vw 116q,0 0 0 9in#E8AD6D;color:A84A4B;border-radius:5vw
---

The April 16 target is six rounded squares on a light orange background, in two rows of three, white and red-brown in a checkerboard. H_Bliertz styles a single box, html, and gives it no background: the white canvas shows through it, and that is the first square. Five box shadows copy the box into the other five squares. A sixth shadow, with a 9in spread, is the orange background.

With **Wide view**, the orange shadow runs off the canvas. With **Teaching colors**, each shadow color gets its own color.

{% include animations/2026-04-16.html lang=page.lang %}

## The code, spaced out

```css
<style>
& {                          /* at the top level, & is the root: html */
  margin: 45 65%155 40;      /* html: 100 × 100 at (40, 45) */
  box-shadow:
    116q 0,                  /* red (the color), 109.61px to the right */
    55vw 0#FFF,              /* white, 220px to the right */
    0 116q,                  /* red, 109.61px down */
    116q 116q#FFF,           /* white, right and down */
    55vw 116q,               /* red, bottom right */
    0 0 0 9in#E8AD6D;        /* orange, spread 864px all around: the background */
  color: A84A4B;             /* no hash: quirks mode takes it */
  border-radius: 5vw         /* 20px, for the box and its six shadows */
  /* the end of the code closes the rule */
```

## How it works

### 1. `&` is html

`&` is the nesting selector. Outside any rule, it stands for `:scope`, and in a style sheet that is the root element: html. getBoundingClientRect puts the margin on html, and body keeps its own 8px margin.

### 2. html: 100 × 100

CSS Battle pages have no doctype, so they are in quirks mode, where unitless lengths in margins count as pixels.

`margin:45 65%155 40` is 45 on top, 65% on the right, 155 at the bottom and 40 on the left. A percentage margin is a share of the width: 65% of 400 is 260. html runs from x = 40 to 400 − 260 = 140, 100px wide.

In quirks mode, html stretches to the height of the viewport, minus its margins: 300 − 45 − 155 = 100. It runs from y = 45 to 145. getBoundingClientRect gives 40, 45, 100 × 100.

### 3. The first square is the canvas

html has no background, and neither has body. Nothing paints the canvas, so it stays white. A box shadow is never painted under its own box: none of the six shadows covers html's box. The white canvas shows through it: that is the white square at the top left.

### 4. A color with no hash

`color:A84A4B` has no `#`. In quirks mode, a few properties, `color` among them, take a hex color without it: getComputedStyle gives rgb(168, 74, 75). html paints no text, but a shadow with no color takes the `color` value. `116q 0`, `0 116q` and `55vw 116q` are the three red squares.

### 5. Five copies

A shadow is a copy of the box, moved by its two offsets. The first shadow in the list is painted on top.

- 116q is 116 quarter millimeters, 29mm: 109.606px. The target puts the middle column at x = 150 and the second row at y = 155.
- 55vw is 55% of the 400px viewport width: 220px. The right column runs from x = 260 to 360.

Red at (116q, 0), white at (55vw, 0), red at (0, 116q), white at (116q, 116q), red at (55vw, 116q): with html's box at (0, 0), the checkerboard is complete.

### 6. The background is a shadow

`0 0 0 9in#E8AD6D` has no offset and no blur, but a 9in spread: 864px added on every side of the box. The canvas edges are at most 260px from html's box (the right edge, 400 − 140), so it covers the whole canvas.

It is the last shadow in the list, so it is painted under the five others. And like them, it leaves html's box alone: the first square stays white.

### 7. 20px corners

`border-radius:5vw` is 5% of 400: 20px. The shadows copy the box's corners, so the five squares get the same curve. A spread makes the radius bigger by the same amount: 20 + 864 = 884px on the outside. On the inside, the orange stops at html's rounded edge: the corners of the white square are orange.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&` is 1 character, `html` 4. With `html{` (139 characters), the picture is the same. `*{` is as short, but it also matches head and body: body gets its own shadows, painted over html's, and with `*{` (136 characters) my Chrome paints the whole canvas orange: 58,525 pixels change.
- One empty box gives the first square for free: the canvas shows through it, and the six shadows never cover it.
- `color:A84A4B;` is 13 characters, and it colors three shadows. With `color:#A84A4B` (137 characters), the picture is the same. With no `color` and `#A84A4B` after each red shadow (144 characters), the picture is the same. With no color at all (123 characters), the three red squares turn black: 29,305 pixels change.
- `116q` is 4 characters, `110px` 5, and it shows up five times. With `110px` everywhere (141 characters), the four shadows that use it move by 0.394px: 1,094 pixels change, on the edges and corners of those four squares.
- `55vw` is 4 characters, `220px` 5. With `220px` (138 characters), the picture is the same.
- `5vw` is 3 characters, `20px` 4. With `border-radius:20px` (137 characters), the picture is the same.
- `9in` is 3 characters, and it is more than the 260px the spread needs. With `2in` (136 characters), the spread stops 192px from the box: the right side of the canvas stays white, and 15,446 pixels change.
- The orange shadow goes last. With it first (136 characters), it is painted over the five others: only html's square stays white, and 48,818 pixels change.
- 65% is 260px, as long as `260`, but `%` ends the number: `65%155` needs no space. With `45 260 155 40` (137 characters), the picture is the same.
- Quirks mode takes unitless numbers in margins. With `45px 65%155px 40px` (142 characters), the picture is the same.
- No space before a `#`. With a space before each of the three (139 characters), the picture is the same.
- The code ends inside the rule: the end of the code closes it. With `border-radius:5vw}` (137 characters), the picture is the same.

## If you try it at home

In my Chrome (version 157 when this was written), the official code draws the same six squares as the target, in the same flat colors. 1,188 pixels differ by more than 8 levels. 590 are on straight edges: the columns x = 149 and 249 and the rows y = 154 and 254, where my render mixes the two colors next to the edge. The four shadows that use 116q are moved by 109.606px, where the target's squares sit 110px from html's. When I write `110px` in place of each `116q`, those 590 pixels go away. The other 598 are around the rounded corners: my corners don't blend the same way as the target's, and with `110px`, 615 pixels still differ there. The CSS Battle judge gives the official code a 100% match.
