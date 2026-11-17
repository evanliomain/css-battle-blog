---
title: "One drawing, four quarter turns: a hash between four squares in 149 characters"
ref: 2026-08-25
permalink: /2026/08/25/one-drawing-four-quarter-turns/
description: "How one box-shadow list, used by html and by four nested elements that offset:ray(0deg) turns a quarter turn each, draws the green background, the cream hash and the four squares of the August 25, 2026 CSS Battle target."
target: /assets/targets/2026-08-25.png
target_url: https://cssbattle.dev/play/G73oyNUHfqrOK7aQqOZR
colors: ["#3e6d43", "#3f6d43", "#e5ca72"]
player: h_blierzt
chars: 149
score: 696.67
match: 100
code: |
  <dl><dl><p><style>*{color:3F6D43;box-shadow:inset 0 9in,484q 0 0 2in#3E6D43,5vh 5ch,65vh 5pc 0 32q;*{width:280;height:30;color:E5CA72;offset:ray(0deg
---

The August 25 target is a cream pattern on a green background: a long vertical bar, a long horizontal bar, a small hash in the middle and four big squares in the corners. Turn it a quarter turn and it does not change. H_Bliertz uses that. One `box-shadow` list draws a bar, one square and one line of the hash. Four nested elements use the same list, and `offset:ray(0deg)` turns each one a quarter turn more than its parent.

Use **Teaching colors** to see which element draws what, and **Wide view** to see the shadows that stick out of the canvas and the green shadows that cut them.

{% include animations/2026-08-25.html lang=page.lang %}

## The code, spaced out

```css
<dl><dl><p>                  /* body > dl > dl > p: four boxes */
<style>
* {                          /* html (and everything in it) */
  color: 3F6D43;             /* #3F6D43, without the # */
  box-shadow:
    inset 0 9in,             /* fills the box with its own color */
    484q 0 0 2in #3E6D43,    /* green, 457.32px away, spread 192px */
    5vh 5ch,                 /* copy moved (15, 40) */
    65vh 5pc 0 32q;          /* copy moved (195, 80), spread 30.24px */
  * {                        /* head, body, dl, dl, p, style */
    width: 280;
    height: 30;
    color: E5CA72;           /* cream */
    offset: ray(0deg);       /* centered, a quarter turn to the left */
  }
}
```

## How it works

### 1. html: an inset shadow as background

`*` matches `html` and every element in it. `html` fills the frame: 400 × 300.

No rule sets a background. The first shadow does the job: `inset 0 9in` is an inset shadow moved 9in = 864px down. An inset shadow paints the inside of the box, except where a copy of the box, moved by the offset, still covers it. Here the copy has moved 864px away, out of a box that is 300px tall. So the whole box is painted.

The shadow has no color, so it takes the text color: `color:3F6D43`, a hex color without `#`, which quirks mode accepts for `color`. That is the green background.

The other shadows of `html` are outer shadows. They are painted outside its box, so outside the canvas: they never show.

### 2. body: centered and turned a quarter turn

The nested `*` matches every element inside `html`. `head` and `style` are not displayed. That leaves four boxes, one inside the other: `body`, `dl`, `dl` and `p`. Each one is 280 × 30 (unitless sizes work in quirks mode) and gets the same shadow list. Its `inset 0 9in` now fills it with cream, since `color:E5CA72` is its text color.

`offset:ray(0deg)` sets a motion path: a ray that starts at the center of the containing block and points up (0deg). The distance along it is 0, so the box stays at the start: its center lands on the center of `html`, (200, 150). The box also turns to follow the ray: its x axis now points up. That is a quarter turn to the left.

So the `body` is a vertical bar, from x = 185 to 215 and from y = 10 to 290. I measured every part by rendering a version where only that part is red.

### 3. Two cream shadows: a square and a line

The shadows turn with the box. In the `body`, the shadow's x offset goes up and its y offset goes right.

`5vh 5ch` is (15, 40): 5vh of a 300px frame is 15px, and in my Chrome 1ch is 8px here. The copy moves 40px right and 15px up: a bar from x = 225 to 255 and from y = −5 to 275.

`65vh 5pc 0 32q` is (195, 80), with a spread of 32q. 1pc = 16px, and 1q is a quarter of a millimeter, 0.945px, so 32q = 30.24px. The copy grows to 90.47 × 340.47 and moves 80px right and 195px up: from x = 234.76 to 325.24 and from y = −215.24 to 125.24. It sticks out of the canvas at the top, by more than 200px.

The two copies overlap from x = 234.76 to 255. Together, they make a square from x = 225 to 325.24, and the bar goes on down: that is the right line of the hash.

### 4. A green shadow cuts the top

`484q 0 0 2in#3E6D43` is a copy spread by 2in = 192px and moved by 484q = 457.32px. In the `body`, that is 457.32px up. Its bottom edge is at 150 − 457.32 + 140 + 192 = 24.68.

Shadows are painted in reverse order: the first one in the list is on top. This one comes before the two cream copies, so it is painted above them, in green. Everything they had above y = 24.68 is gone. The top-right square now runs from y = 24.68 to 125.24.

The `inset` shadow is painted inside the box, above all the outer shadows. So the green shadow does not cut the `body`'s own bar: it still starts at y = 10.

### 5. dl: the same drawing, a quarter turn further

The `dl` is in the `body`. It gets the same rules, so it does the same thing: it is centered on its parent and turns a quarter turn to the left. Its parent is already turned by −90°, so the `dl` ends at −180°.

Its whole drawing is the `body`'s drawing turned by 90°: the horizontal bar (x = 60 to 340, y = 135 to 165), the top-left square, the top line of the hash (y = 95 to 125), and a green shadow that covers everything left of x = 74.68.

Each turned element is painted above its parent. So the `dl`'s green shadow is painted above whatever the `body` drew there. Here the `body` drew nothing on that side.

### 6. dl dl and p: the bottom and the right

The second `dl` ends at −270°, and the `p` at −360°, which looks like no turn at all. Each one draws the same thing, turned by 90° more:

- the second `dl`: the bottom-left square, the left line of the hash (x = 145 to 175), and green below y = 275.32;
- the `p`: the bottom-right square, the bottom line of the hash (y = 175 to 205), and green right of x = 325.32.

Each one has its own bar too. They fall exactly on the `body`'s and the `dl`'s bars. That is why the bars stay whole: the second `dl`'s green shadow crosses the vertical bar at y = 275.32, but its own bar is painted above it.

### 7. Two greens

`html` is `#3F6D43`, the four green shadows are `#3E6D43`. The difference is 1 on the red channel, too small to see.

`html` cannot use `3E6D43`. I checked: with `color:3E6D43`, the declaration is dropped and the background comes out black. `3E6…` reads as a number with an exponent (3 × 10⁶), and the quirk that allows a color without `#` does not take it. Inside `box-shadow`, the `#` is needed anyway: without it, the whole list is dropped.

## Golf notes

- One shadow list for five elements. The shadows without a color follow each element's `color`: green on `html`, cream on the others.
- `inset 0 9in` fills a box with its text color, and it is part of the list anyway: no `background` needed.
- `offset:ray(0deg)` centers each element and turns it by −90°, in 15 characters (the parenthesis stays open). Nesting adds up the turns: four elements, four directions.
- `<dl><dl><p>`: block elements that nest. A second `<p>` would close the first one.
- The green shadows cut the parts of the big squares that stick out. Each element cuts its own: the green shadow is written before the cream ones.
- Units picked for length: `9in` (864px), `484q` (457.32px), `2in` (192px), `5vh` (15px), `5ch` (40px), `65vh` (195px), `5pc` (80px), `32q` (30.24px).
- `color:3F6D43` and `color:E5CA72`: hex colors without `#`, accepted in quirks mode.
- No space in `2in#3E6D43`: the `#` starts a new value.
- `<style>` is never closed, and `ray(0deg` and the two braces are left open.

## If you try it at home

In my Chrome (version 157 when this was written), the edges of the four squares are not on whole pixels. The green shadows stop at 24.68, 74.68, 275.32 and 325.32, and the big spread shadows end 0.24px off the grid, at 125.24, 174.76, 175.24 or 224.76. Those edges come out blended over one row or one column of pixels. Compared with the target, 984 pixels differ along eight straight edges, and 88 more that my comparison script counts as anti-aliasing. On the CSS Battle judge, the original code is a 100% match.
