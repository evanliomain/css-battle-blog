---
title: "A body pushed off its own ring: an arch and a slice in 94 characters"
ref: 2026-06-02
permalink: /2026/06/02/a-body-pushed-off-its-own-ring/
description: "How one radial gradient, painted on html and again on a body pushed 666px to the left, draws a pink ring cut by a green band, in the June 2, 2026 CSS Battle target."
target: /assets/targets/2026-06-02.png
target_url: https://cssbattle.dev/play/XAXJBHGV3mP8N0KCu47a
colors: ["#668884", "#eed9d9"]
player: koda_pig
chars: 94
score: 763.29
match: 100
code: |
   <style>*{*{margin:150 0 80-666}background:radial-gradient(1q,#668884 74q,#A443 0 15ch,#668884
---

The June 2 target shows a light pink ring on gray green, cut in two by a green band: an arch at the top and a slice of a disc at the bottom. koda_pig draws it with one radial gradient, given to every element. On html, it paints the ring. body gets the same gradient, but its margins turn it into a long band pushed to the left: its own ring falls off the canvas, and the band hides the middle of html's ring.

Use **Wide view** to see body run 666px to the left of the canvas, with its ring.

{% include animations/2026-06-02.html lang=page.lang %}

## The code, spaced out

```css
&nbsp;<style>                    /* a real no-break space: 1 character */
* {                              /* html, head, body, style */
  * {                            /* * *: head, body, style (not html) */
    margin: 150 0 80-666;        /* body: x −666 → 400, y 150 → 220 */
  }
  background: radial-gradient(
    1q,                          /* size: a circle with a 0.945px radius */
    #668884 74q,                 /* green up to 69.9px */
    #A443 0 15ch,                /* rgba(170, 68, 68, 0.2) from 69.9px to 120px */
    #668884                      /* at 1q, moved up to 120px: green beyond */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `150` is read in px.

The code starts with a no-break space. For the HTML parser it is text, not a blank. So body opens right there, and the `<style>` ends up inside it. The page has html, head, body and style. head and style are not displayed.

`*` matches all four. The nested `*{` means `* *`: any element inside another one. That is head, body and style, but not html. So the margin goes to body, and the background goes to html and body.

### 2. A circle with a 1q radius

html's background is painted on the whole canvas. I measured html: 400 × 300, at (0, 0). The gradient is centered in that box, on (200, 150).

`radial-gradient(1q,…)` starts with one length. One length makes a circle with that radius. Here it is 1q = 0.945px: the gradient's radius is less than a pixel.

### 3. Stops past the radius

The stops don't have to stay inside the radius. `#668884 74q` is green from the center to 74q = 69.9px.

`#A443 0 15ch` is one color with two positions. The first one, `0`, can't be before the previous stop, so it moves up to 69.9px. The pink starts there with a sharp edge, and goes to 15ch. 1ch is the width of a "0": 8px in 16px Times, the default font. So 15ch is 120px.

The last `#668884` has no position. It goes at 100% of the radius, so at 1q. That is before 120px, so it moves up to 120px too: a second sharp edge, and green beyond.

### 4. A translucent pink

`#A443` is a hex color with 4 digits: the fourth one is the alpha. It reads as rgba(170, 68, 68, 0.2). html's background is painted over white, and the 80% left shows it. The pink you see is #eed9d9. I checked: `#eed9d9` instead of `#A443` gives the same picture.

### 5. body, a band pushed to the left

body gets `margin:150 0 80-666`: 150px at the top, 0 on the right, 80px at the bottom, −666px on the left. `80-666` is two numbers: the minus sign starts the second one.

In quirks mode, body fills html's height, minus its own margins: 300 − 150 − 80 = 70px. With no right margin and −666px on the left, it is 400 + 666 = 1066px wide. I measured it: 1066 × 70, from x = −666 to 400 and from y = 150 to 220.

### 6. body's own gradient

body has the same background, centered in its own box: on (−666 + 533, 150 + 35) = (−133, 185). Its ring goes from x = −253 to −13. It never reaches the canvas. On the canvas, body only shows its green.

That green band covers html's ring from y = 150 to 220. Above it, the top half of the ring is left: the arch. The hole of html's ring ends at y = 150 + 69.9 = 219.9, just above the band's bottom edge. So below the band, the ring is solid: a slice of the disc, from y = 220 to 270, and from x = 102.5 to 297.5 at its top.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `1q` does two jobs in 2 characters: it makes a circle, and it puts the last stop at 1q, so that stop moves up to 120px and gives a sharp edge. With `circle` instead (98 characters), the circle reaches the farthest corner, 250px away. The last stop goes there, and the pink fades into green from 120px to 250px: 80,412 pixels change. With no size at all (91 characters), the gradient is an ellipse with the same fade: 94,547 pixels change. With `0` as the size (93 characters), my Chrome paints the whole canvas green: 21,772 pixels change.
- `#A443 0 15ch` gives two positions to one color. The `0` is the shortest first position: it moves up to 69.9px on its own. `#A443 74q 15ch` gives the same picture in 96 characters. Without the `0` (92 characters), the pink fades in from 69.9px to 120px: 19,915 pixels change.
- `#A443` is 5 characters. The color it shows, `#eed9d9`, gives the same picture in 96 characters. Upper case costs nothing: `#a443` gives the same picture at the same length.
- Short units: `15ch` is 120px in 4 characters. `120px` gives the same picture in 95 characters. `74q` is 69.9px in 3 characters. `70px` (95 characters) changes 12 pixels.
- Nesting puts the margin on body and keeps it off html. `body{margin:150 0 80-666}*{background:…` gives the same picture in 97 characters. With the margin in the outer rule, `*{margin:150 0 80-666;background:…` (92 characters), html gets it too, and my Chrome paints the whole canvas green: 21,772 pixels change.
- Bare numbers, and no space before `-666`: `80 -666` gives the same picture in 95 characters.
- `-666` only has to push body's ring off the canvas. With `-640`, the ring ends at x = 0, and the picture is the same.
- The bottom margin sets the band's bottom edge. With `0` instead of `80` (93 characters), body goes down to y = 300 and hides the slice at the bottom: 6,828 pixels change.
- The no-break space matters. With a plain space (94 characters) or nothing (93 characters), the parser keeps the `<style>` in head. In my Chrome, html then measures 385 × 370, the ring moves, and 23,240 pixels change.
- The code stops after the last color. The end of the code closes the gradient, the rules and the style element. Adding `)}` gives the same picture in 96 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 406 pixels, with the same rule as in the golf notes, by up to 136. All of them are on the two circles: 114 around the hole and 292 at the outer edge of the ring. The flat colors are the same. My render draws these circles with hard steps, with no in-between colors. The target has in-between shades there: 34 colors, against 3 in my render. The CSS Battle judge gives the code a 100% match.
