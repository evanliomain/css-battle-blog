---
title: "One shadow list for html and body: an arch in 156 characters"
ref: 2026-07-30
permalink: /2026/07/30/one-shadow-list-for-html-and-body/
description: "How six box shadows, given to both html and body, draw the arch, the orange background, the bar, the legs and the base of the July 30, 2026 CSS Battle target."
target: /assets/targets/2026-07-30.png
target_url: https://cssbattle.dev/play/kmnEBhr0xnz7J8MSeSpa
colors: ["#f8b140", "#696049", "#ffffff"]
player: h_blierzt
chars: 156
score: 690.43
match: 100
code: |
  <style>*{margin:352 65-666;color:696049;box-shadow:0 0 0 5vw,0 0 0 2in#F8B140,0-78vw,-50vh -64mm,50vh -64mm 0,0-86q 0 138q}&{border-radius:9in;margin:80 125
---

The July 30 target is a thick gray-brown arch on an orange background, white inside, with a bar in the middle. It stands on a base with a short leg at each end. H_Bliertz draws all of it with box shadows. One list of six shadows goes on every element. On html, it draws the arch and the orange background. On body, which sits below the canvas, it cuts everything at y = 240 and draws the bar, the legs and the base.

Use **Wide view** to see html and body reach far below the canvas, and **Teaching colors** to tell the six shadows apart.

{% include animations/2026-07-30.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                /* every element: html and body are the ones shown */
  margin: 352 65-666;              /* body: 20 × 454 at (190, 432), below the canvas */
  color: 696049;                   /* the color of every shadow without its own */
  box-shadow:
    0 0 0 5vw,                     /* 1. a 20px ring: html's arch */
    0 0 0 2in#F8B140,              /* 2. 192px of orange: the background on html, the cut at y = 240 on body */
    0-78vw,                        /* 3. body, 312px up: the bar */
    -50vh -64mm,                   /* 4. body, 150px left and 241.89px up: the left leg */
    50vh -64mm 0,                  /* 5. the same, 150px right (blur 0): the right leg */
    0-86q 0 138q                   /* 6. body, 81.26px up, spread 130.39px: the base */
}
& {                                /* the root: html */
  border-radius: 9in;              /* 864px, scaled down to 75px: a half-circle top */
  margin: 80 125                   /* html: 150 wide, at (125, 80) */
```

## How it works

### 1. html: a tall box with a round top

The style element is never closed, so the whole code is CSS. There is no doctype: the page is in quirks mode, and bare numbers like `80` are read as px. `&`, alone at the top level, means the root: html. `&{` comes after `*{`, so html takes the `margin` of `&{`: 80 at the top and bottom, 125 on the sides. html is 400 − 2 × 125 = 150 wide, at (125, 80).

Its height is 492px. I measured it, and it follows body's top margin: 352 + 140 = 492, where 140 is 300 − 2 × 80. With a top margin of 100 on body, html is 240 tall; with 300, it is 440. So html reaches y = 572, far below the canvas.

`border-radius:9in` asks for 864px, far more than the box can hold. Chrome scales all the radii down until they fit the 150px width: 75px each. The top of html becomes a half circle of radius 75, centered at (200, 155). Below it, the sides are straight down to y = 497.

### 2. html's shadows: the arch and the background

`*` gives every element the same `box-shadow` list. A shadow without a color takes `color`, here `696049`, a gray brown. Shadows are painted in reverse order: the first one is on top.

The first shadow, `0 0 0 5vw`, has a spread of 20px (5vw of 400). Around html, it draws a 20px ring that follows the rounded top: an arch from x = 105 to 295, with its top at y = 60. The second one, `0 0 0 2in#F8B140`, spreads 192px of orange around html. That covers the whole canvas. A box shadow is never painted under its own box, and html has no background: inside html, the white canvas shows. That is the white inside the arch.

html also gets the four other shadows. They are painted under its orange one.

### 3. body: 20 × 454, below the canvas

body gets `margin:352 65-666` from `*`. It starts at the top of html's box, so the top margin puts it at y = 80 + 352 = 432. The side margins of 65 leave it 150 − 130 = 20 wide, from x = 190 to 210. In quirks mode, body's height is the page's 140px between html's margins, minus its own margins: 140 − 352 + 666 = 454. So body runs from y = 432 to 886, out of sight.

body's ring, the first shadow, stays below the canvas too: from y = 412.

### 4. body's orange shadow cuts at y = 240

The second shadow spreads 192px of orange around body: from y = 432 − 192 = 240 down, and from x = −2 to 402. body is painted after html, so this orange covers everything of html below y = 240: the sides of the arch and the white inside. The arch stops at y = 240.

### 5. Shifted copies of body: the bar and the legs

The next three shadows have no spread: each one is a copy of body, 20 × 454, moved.

- `0-78vw` moves it 312px up: x = 190 to 210, from y = 120. That is the bar.
- `-50vh -64mm` moves it 150px left and 241.89px up: x = 40 to 60, from y = 190.11. That is the left leg.
- `50vh -64mm 0` does the same 150px to the right: x = 340 to 360. That is the right leg.

All three come after the orange shadow in the list, so they are painted under it. They run down to y = 574 or more, but the orange hides them below y = 240.

### 6. The base

The last shadow, `0-86q 0 138q`, moves body 81.26px up (86 quarter millimeters) and spreads it by 130.39px (138q). It spans x = 190 − 130.39 = 59.61 to 340.39, and starts at y = 432 − 81.26 − 130.39 = 220.35. It meets the two legs and covers the foot of the bar and of the arch. The orange cuts it at y = 240 too, so the base ends there.

## Golf notes

- One shadow list does the work of two. html needs the first two shadows, body the last five. Each element gets all six, and the extras land out of sight: body's ring is below the canvas, and html's last four shadows are under its own orange. They only touch the anti-aliased pixels on the inner edge of the arch: with html limited to its first two shadows, 189 pixels on that edge get lighter.
- `color:696049` sets the brown once, and five shadows use it. Writing `#696049` in each of those five shadows instead, with no `color`, gives the same picture in 178 characters, 22 more.
- In quirks mode, `color` takes a hex color without its `#`: `color:#696049` gives the same picture with 157 characters.
- The order of the list does real work. The orange shadow is second, so the four shapes below it stop at y = 240. When I add a rule that moves it to the end of body's list, the legs and the base run down to the bottom of the canvas, and 19,200 pixels change: a brown band 320 × 60.
- The bottom margin of −666 makes body 454px tall, so its copies are long enough to reach from y = 120 to 240. With a bottom margin of 0 (`margin:352 65 0`), body is 0px tall: the bar and the legs disappear, only the base stays, thanks to its spread, and 4,086 pixels change.
- `&` is 1 character for the root. `html{` instead of `&{` gives the same picture with 159 characters.
- Short units: `5vw` is 20px in 3 characters, `2in` is 192px in 3, `78vw` is 312px and `50vh` is 150px in 4, `64mm` is 241.89px in 4. `9in` is just "big enough" for a radius.
- No spaces where a sign or a `#` starts the next value: `65-666`, `0-78vw`, `0-86q`, `2in#F8B140`.
- Nothing is closed: neither the `&{` rule nor the style element. With `}</style>` at the end, the code is 165 characters and the picture is the same.

## If you try it at home

In my Chrome, 790 pixels differ from the target by more than 8 on one channel. 530 of them are on the two curved edges of the arch. 220 are on row y = 220, the top edge of the base, which starts at y = 220.35. The other 40 are on row y = 190, the top of the two legs, which start at y = 190.11. In my render, those two rows mix brown with the color above. In the target, they are fully brown. The CSS Battle judge gives the code a 100% match.
