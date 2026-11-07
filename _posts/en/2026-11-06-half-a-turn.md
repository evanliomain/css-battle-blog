---
title: "Half a turn: a crop icon in 121 characters"
lang: en
ref: 2026-11-06
permalink: /2026/11/06/half-a-turn/
description: "How one shadow list and a scale:-1 draw the November 6, 2026 CSS Battle target: two crossed brown Ls, like a crop icon."
target: /assets/targets/2026-11-06.png
target_url: https://cssbattle.dev/play/jHTSQXbsHDY0OOetADF1
colors: ["#e98f6b", "#8b4646", "#d52a"]
player: kieron
chars: 121
score: 726.24
match: 100
code: |
  <style>*{margin:85 135-25 25;box-shadow:11q -11q#e98f6b,5ch -5ch#8b4646;*{background:#d52a;margin:-46%-46%46%46%;scale:-1
---

The November 6 target is a crop icon: two thick brown Ls on a salmon background, one in the top right, one in the bottom left. They cross at two corners, and the one on top is cut by a thin gap where it passes over the other. Kieron's solution gives the same shadow list to `html` and to the `body`. Each shadow list draws one L. Then `scale:-1` turns the body's L around, and the body, painted last, cuts the gaps.

Use **Wide view** to see where the body's L would go without its half turn, and **Teaching colors** to see the background-colored shadow.

{% include animations/2026-11-06.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html and body */
  margin: 85 135 -25 25;         /* html: 240 × 240 */
  box-shadow:
    11q -11q #e98f6b,            /* background color, 10.39px up and right, on top */
    5ch -5ch #8b4646;            /* brown, 40px up and right */
  * {                            /* body */
    background: #d52a;           /* goes to the canvas */
    margin: -46% -46% 46% 46%;   /* 110.39px right and up */
    scale: -1;                   /* half turn */
  }
}
```

## How it works

### 1. html is a 240 × 240 box

`*` matches every element: `html` and the `body` (and `head` and `style`, which are not displayed). The nested rule then gives the `body` its own margin. `html` keeps `margin:85 135 -25 25`. Its width is 400 − 135 − 25 = 240px. CSS Battle runs in quirks mode, where `html` fills the window minus its top and bottom margins: 300 − 85 − (−25) = 240px. So `html` is a 240 × 240 box from (25, 85) to (265, 325). It runs 25px below the canvas.

`html` has no background, so the `body`'s `#d52a` goes to the whole canvas. It is `#dd5522` with an alpha of `aa`, 67%. Over the white page, it gives `#e88e6c`. The target is `#e98f6b`, 1 off on each channel.

### 2. An outer shadow draws an L

`5ch -5ch #8b4646` is a shadow with no blur: a copy of the box, moved 40px right and 40px up. In the default font, `1ch` is 8px, so `5ch` is 40px. An outer shadow is never painted under its own box. `html` is transparent, so only the part of the copy outside the box shows: an L, 40px thick. Its top bar runs from (65, 45) to (305, 85), its right bar from (265, 85) to (305, 285).

### 3. A background-colored shadow on top makes it thinner

In a shadow list, the first shadow is painted on top. `11q -11q #e98f6b` moves another copy by 11 quarter-millimetres: 10.39px. It is in the canvas color. It covers the inner 10.39px of the brown L, so the bars are now 30px thick: the top one ends at y = 74.6, the right one starts at x = 275.4. Its own L is the color of the background, so it can't be seen.

### 4. The body moves with margins in %

The nested `*{…}` matches the descendants of every element: the `body`. A margin in % is computed from the width of the parent, even at the top and the bottom. `html` is 240px wide, so `46%` is 110.39px. With `margin:-46% -46% 46% 46%`, the `body` starts 110.39px to the right of `html`'s left edge: x = 135.4. Its negative right margin gives that width back, so it stays 240px wide. In quirks mode, its height follows the same rule as `html`'s, so it is 240px tall too, from y = −25.4 to 214.6.

Its centre is (255.4, 94.6). `html`'s centre is (145, 205). The two are almost exactly symmetric around the canvas centre, (200, 150).

### 5. The body gets the same shadows

The outer `*` also matches the `body`, so it gets the same two shadows. As it is, its L would go up and to the right, almost all off the canvas: only a brown strip about 14px wide would show along the right edge. The `body`'s box itself is transparent: its background went to the canvas.

### 6. `scale:-1` is a half turn

`scale:-1` flips the `body` horizontally and vertically, around its own centre. Two flips are the same as a half turn. The box is square and centred on that point, so it lands on itself. Its shadows turn with it: they now point 40px left and 40px down. The brown L runs along the left side (x from 95 to 125) and the bottom (y from 225 to 255), and its background-colored shadow is on top, as before.

The `body` is painted after `html`. Where its shadows cross `html`'s L, they are on top:

- its background-colored strips cut `html`'s L at the two crossings, at x = 125 to 135.4 and at y = 214.6 to 225;
- its brown bars run over the rest of `html`'s L.

That makes the two gaps of the target. The edges drawn by the 10.39px shadow fall about 0.4px off whole pixels, so the browser blends one row of pixels along them. That is close enough for a 100% match.

## Golf notes

- One `box-shadow` on `*` draws both Ls. `scale:-1` (8 characters) turns the second one around, so there is no second shadow list to write.
- `-46%-46%46%46%` needs no spaces: the `%` ends each token. It is 2 characters shorter than `-110-110 110 110`. 46% of 240 is 110.39px, close enough to 110.
- `5ch` is 40px in 3 characters, and `11q` is 10.39px in 3 characters.
- `#d52a` is 5 characters. On the `body`, it goes to the canvas, and over white it lands 1 off the target color.
- `135-25` and `11q -11q#e98f6b` need no space before the minus sign or the `#`.
- No closing braces, and `<style>` is never closed.
