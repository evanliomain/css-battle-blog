---
title: "Two shadows and a mirror: two petals in 133 characters"
ref: 2026-07-01
permalink: /2026/07/01/two-shadows-and-a-mirror/
description: "How two empty boxes parked off the canvas, two shadows and -webkit-box-reflect draw a navy petal and its gold mirror image, in the July 1, 2026 CSS Battle target."
target: /assets/targets/2026-07-01.png
target_url: https://cssbattle.dev/play/yvpHijyS5DDPWOUnCQm8
colors: ["#394257", "#d9bb61"]
player: emohdaziz
chars: 133
score: 712.6
match: 100
code: |
  <style>*{border-radius:0 9in;margin:90-62 150 402;box-shadow:-2in 0#394257,224q 0#d9bb61;-webkit-box-reflect:left;*{margin:60-60-60 0
---

The July 1 target shows two petals on white: a gold one on the left and a navy one on the right, mirror images of each other. Mohamed Ali puts no box on the canvas. html and body are two empty boxes with rounded corners, just right of the canvas. A navy shadow copies them onto the canvas. A gold shadow copies them further right, and `-webkit-box-reflect` flips that gold copy back onto the left half.

Use **Wide view** to see the boxes and the gold copies off the canvas, and **Teaching colors** to tell which box each copy comes from.

{% include animations/2026-07-01.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                          /* html, head, style and body */
  border-radius: 0 9in;      /* top right and bottom left: 864px, cut to 60px */
  margin: 90-62 150 402;     /* html: 60 × 120 at x = 402, off the canvas */
  box-shadow:
    -2in 0#394257,           /* −192px: the navy petal, from x = 210 */
    224q 0#d9bb61;           /* +211.65px: two gold copies, from x = 613.65 */
  -webkit-box-reflect: left; /* mirror image against the left edge, x = 402 */
  * {                        /* head, style and body */
    margin: 60-60-60 0       /* body: 120 × 60 at (402, 150) */
```

## How it works

### 1. The page

There is no doctype: the page is in quirks mode, and a number with no unit means px in `margin`. The `<style>` is never closed, and neither are the two rules.

`*` selects every element: html, head, style and body. head and style are hidden, so only html and body matter. The nested `*{` means `* *`: every element inside another one. That is head, style and body, not html. Both selectors have the same specificity, and the nested one comes later. So body takes its margin from the nested rule, and html keeps `margin:90-62 150 402`. Everything else applies to both.

### 2. html, an empty box off the canvas

`margin:90-62 150 402` reads as 90 at the top, −62 on the right, 150 at the bottom and 402 on the left. `90-62` is two numbers: the minus sign starts the second one. html is 400 − 402 + 62 = 60px wide, from x = 402 to 462. That is just right of the canvas. html has no background, so the box itself paints nothing.

In quirks mode, html fills the height of the window minus its margins: 300 − 90 − 150 = 60px. getBoundingClientRect gives more: 120px, from y = 90 to 210. In my Chrome, body's top margin adds to html's height. With a 30px top margin on body, html is 90px tall, and with 60px it is 120px.

### 3. body, twice as wide

The nested rule gives body `margin:60-60-60 0`. body starts 60px below the top of html, at y = 150. Its right margin is −60, so it sticks out of html by 60px: it is 60 + 60 = 120px wide, from x = 402 to 522.

In quirks mode, body stretches to fill html. Its height is html's 60px minus its own two margins: 60 − 60 − (−60) = 60px. getBoundingClientRect gives body 120 × 60 at (402, 150). Its bottom, y = 210, is the bottom of html too.

### 4. Two corners, cut to 60px

`border-radius:0 9in` gives 0 to the top left and bottom right corners, and 9in to the top right and bottom left ones. 1in is 96px, so 9in is 864px.

When two radii on one side add up to more than that side, the browser scales all the radii down by the same factor until they fit. html's top side is 60px, so its radii become 60px. body's right side is 60px tall, so its radii become 60px too. Each box gets a quarter circle with a 60px radius at its top right and bottom left corners. `0 60px` gives the same picture.

Because html is 60 × 120, its two quarter circles do not touch: its left side stays straight from y = 90 to 150.

### 5. The navy shadow is the right petal

A shadow with no blur and no spread is a copy of the box's shape, rounded corners included. Here, both boxes paint it, since the rule applies to both.

`-2in 0 #394257` moves the copies 192px to the left. html's copy runs from x = 210 to 270 and from y = 90 to 210. body's copy runs from x = 210 to 330 and from y = 150 to 210. They overlap: together they make the navy petal. The top is html's copy, with its round top right corner. The bottom is body's copy, with its own round top right corner, 60px further right. The two copies have the same bottom left arc, centered on (270, 150).

### 6. The gold shadow goes the other way

`224q` is 224 quarter millimeters, 56mm: 211.65px. `224q 0 #d9bb61` moves gold copies of the two boxes to the right. html's copy runs from x = 613.65 to 673.65, and body's copy to 733.65. Both are far off the canvas.

### 7. The mirror

`-webkit-box-reflect:left` adds a mirror image of the element, placed against its left edge. The mirror image shows everything the element paints: its shadows are mirrored too. Without it, only the navy petal is left.

html and body both get one, and they both start at x = 402. So they mirror around the same line: a point at x lands at 804 − x.

- html's gold copy, from x = 613.65 to 673.65, lands from x = 130.35 to 190.35.
- body's gold copy, from x = 613.65 to 733.65, lands from x = 70.35 to 190.35.

Together, flipped, they make the gold petal: its round corners are now on the top left. The navy copies are mirrored too, but they land from x = 474 to 594, off the canvas. The boxes' own mirror images, from x = 282 to 402, are empty.

The gap between the petals runs from x = 190.35 to 210: 19.65px.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- `*` and a nested `*` give both boxes the same radius, shadows and mirror, and still a margin each. `html,body{…body{…` gives the same picture in 144 characters.
- Any radius of 60px or more gives the same corners: `9in` is 3 characters. `0 60px` gives the same picture in 134. A number with no unit does not work in `border-radius`: with `0 60` (132 characters), the declaration is dropped. The corners stay square, and 4,875 pixels change.
- `-2in` is −192px in 4 characters. `-192px` gives the same picture in 135. With `-192` (133 characters), the whole `box-shadow` is dropped: both petals disappear, and 17,276 pixels change.
- `224q` is 211.65px in 4 characters. `212px` would cost one more.
- A minus sign or a `#` starts a new value, so no space is needed before it: `90-62`, `60-60-60`, `0#394257`. With all those spaces, `90 -62`, `60 -60 -60`, `0 #394257` and `0 #d9bb61`, the same picture takes 138 characters.
- The petal's shape is written once, in the boxes. The two shadows paint it twice, and the mirror flips the gold copy into place.
- Nothing is closed. `}}</style>` at the end gives 143 characters, for the same picture.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 614 pixels, with the same rule as in the golf notes. 60 of them are the column x = 190, from y = 90 to 149, on the straight right edge of the gold petal. My render is pale gold there, (241, 229, 195), and the target is white. `224q` is 211.65px, not a whole pixel, so the mirrored edge falls at x = 190.35 and that column is blended. With `212px 0#d9bb61` (134 characters), that column matches the target. The other 554 pixels are along the curves of both petals: my anti-aliasing there is a bit different from the target's. The CSS Battle judge gives the official code a 100% match.
