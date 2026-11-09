---
title: "Two dl and one shadow: a trash can in 193 characters"
lang: en
ref: 2026-09-25
permalink: /2026/09/25/two-dl-one-shadow/
description: "How zoom, one huge cream shadow and two nested dl draw the September 25, 2026 CSS Battle target: a purple trash can."
target: /assets/targets/2026-09-25.png
target_url: https://cssbattle.dev/play/zeOBey0n5j5vQjLKIkau
colors: ["#9676cf", "#7454b4", "#fff8e1"]
player: benjamintordjman
chars: 193
score: 663.56
match: 100
code: |
  <dl><dl><p><style>*{background:#9676CF;color:7454B4;border-radius:6q;margin:-4-7 24}&{zoom:5;margin:8 33 44;box-shadow:0 0 0 9in#FFF8E1;dl{border:2px solid;box-shadow:6pt 0,-6pt 0;margin:8 5-60
---

The September 25 target is a purple trash can on a cream background: a handle, a dark lid wider than the can, and three dark slats. Benjamin Tordjman's solution zooms the whole page by 5. Then `html` is a small box: its cream shadow covers everything except that box, which becomes the handle. The `body` is the can, and two nested `<dl>` draw the lid and the slats with their borders and two shadows each.

Use **Teaching colors** to see the `dl` shadows in orange.

{% include animations/2026-09-25.html lang=page.lang %}

## The code, spaced out

```css
<dl><dl><p>                      /* lid, slats, and what stretches them */
<style>
* {
  background: #9676CF;
  color: 7454B4;                 /* a hex with no # works in quirks mode */
  border-radius: 6q;             /* 5.67px, × 5 on screen */
  margin: -4 -7 24;              /* for the body and the p */
}
& {                              /* html */
  zoom: 5;                       /* everything is 5 times bigger */
  margin: 8 33 44;               /* a 14 × 8 box: 70 × 40 on screen */
  box-shadow: 0 0 0 9in #FFF8E1; /* cream everywhere else */
  dl {
    border: 2px solid;           /* 10px on screen, in the text color */
    box-shadow: 6pt 0, -6pt 0;   /* two copies, 40px left and right */
    margin: 8 5 -60;
  }
}
```

## How it works

### 1. zoom:5: a small html

At the top level of a style sheet, a lone `&` matches the root, `html`. It is more specific than `*`, so `html` gets the `&` margin, not the `*` one.

`zoom:5` scales `html` and everything in it by 5: every length below is in CSS pixels, and shows 5 times bigger on screen. The 400 × 300 frame is now only 80 × 60 CSS pixels. `margin:8 33 44` leaves `html` 80 − 33 − 33 = 14 wide. Without a doctype, the page is in quirks mode, and `html` fills the height left by its margins: 60 − 8 − 44 = 8. On screen, `html` is a 70 × 40 box at (165, 40).

### 2. The cream shadow: the handle

`html`'s purple background is used for the whole canvas. Its `box-shadow` has no offset and a spread of `9in`, 864 CSS pixels: a cream copy far bigger than the canvas.

A shadow is never painted under the box that casts it. So the cream covers everything except `html`'s own box, where the purple canvas still shows. `border-radius:6q` (5.67, so 28.35px on screen) rounds that box; the radii are too big for a 40px tall box, so Chrome scales them down to 20px. That purple rounded box is the handle.

### 3. The body: the can

The `body` gets everything from `*`: the purple background, and `margin:-4-7 24`. Its −7 side margins make it wider than `html`: 14 + 7 + 7 = 28, so 140px on screen, from x = 130 to 270.

In quirks mode, the `body` takes the page height minus its own margins: 60 + 4 − 24 = 40, so 200px. Its −4 top margin merges with the 8px top margin of the first `<dl>`: 8 − 4 = 4, and the `body` starts at 8 + 4 = 12, so y = 60 on screen. It ends at y = 260, with 28.35px rounded corners: the can.

### 4. The first dl: the lid

`dl` nested in `&` matches both `<dl>`. `margin:8 5-60` puts the first one 5 inside each side of the `body`: 18 wide, 90px on screen, from x = 155.

Its bottom margin of −60 is for the `<dl>` inside it: that one's margin box ends far above where it starts, so the first `<dl>` holds no height at all. Only its `2px` border is left, 2 + 2 = 4 tall, 20px on screen, from y = 60 to 80. A border with no color uses the text color: `color:7454B4` from `*`, a hex with no `#` that quirks mode accepts.

`box-shadow:6pt 0,-6pt 0` adds two copies, 6pt = 8 CSS pixels (40px on screen) to the right and to the left, also in the text color. The bar now runs from x = 115 to 285, with round ends from the radius: the lid. It covers the bottom of the handle and the top corners of the can.

### 5. The second dl: three slats

The second `<dl>` is inside the first, with the same rules. It is 18 − 4 − 10 = 4 wide (20px on screen), at x = 155 + 10 + 25 = 190, and its top margin of 8 puts it at y = 110.

The empty `<p>` inside it gets `margin:-4-7 24` from `*`. It is 0px tall, so its margin box ends at −4 + 0 + 24 = 20: the second `<dl>` holds 20 of content, plus 4 of border. It is a 24 tall bar, 120px on screen, from y = 110 to 230, purple inside a 10px dark border: since it is only 20px wide, it looks all dark. Its two shadows, 40px to each side, are the left and right slats.

## Golf notes

- `zoom:5` divides most numbers by 5: `8 33 44`, `-4-7 24` and `8 5-60` are all 1 or 2 digits.
- One spread shadow on `html` paints the cream background and cuts out the handle, because a shadow skips its own box.
- The same `dl` rule draws the lid and the slats: the outer one keeps only its border, the inner one is stretched by the `<p>`.
- `*` sets the margin of both the `body` and the `<p>`: one value places the can and gives the slats their height.
- `color:7454B4` sets the color of both borders and all four `dl` shadows, with no `#`.
- No closing braces, and `<style>` is never closed.
