---
title: "A list bullet as a disc: a plunger in 147 characters"
lang: en
ref: 2026-11-09
permalink: /2026/11/09/a-list-bullet-as-a-disc/
description: "How three borders and the bullet of a list item draw the November 9, 2026 CSS Battle target: a blue-green frame, a bar and a disc on navy."
target: /assets/targets/2026-11-09.png
target_url: https://cssbattle.dev/play/V3rcPynSdxNerqyJeVdL
colors: ["#1d025e", "#469dba"]
player: emohdaziz
chars: 147
score: 698.53
match: 100
code: |
  <li><style>&{color:469dba;border:53Q solid;margin:125 75 35}*{background:#1d025e;*{margin:-160 40 0;*{border-top:96Q solid;margin:10;font:178Q/60q"
---

The November 9 target is blue-green on navy: a big frame open at the top, a disc in the opening, and a bar rising above it, like a plunger. Mohamed Ali's solution draws the frame with `html`'s border and opens it with the navy `body`. The bar is the top border of an `<li>`, and the disc is something every `<li>` has for free: its bullet, drawn in a 168px font.

Use **Teaching colors** to see the `<li>`'s border and its bullet.

{% include animations/2026-11-09.html lang=page.lang %}

## The code, spaced out

```css
<li>                                 /* a list item: it has a bullet */
<style>
& {                                  /* html */
  color: 469dba;                     /* a hex with no # works in quirks mode */
  border: 53Q solid;                 /* 50px, in the text color */
  margin: 125 75 35;
}
* {
  background: #1d025e;
  * {                                /* the body */
    margin: -160 40 0;
    * {                              /* the li */
      border-top: 96Q solid;         /* 90px */
      margin: 10;
      font: 178Q / 60Q "";           /* 168px font: a 50px bullet */
    }
  }
}
```

## How it works

### 1. html: a frame

At the top level of a style sheet, a lone `&` matches the root, `html`. `margin:125 75 35` makes it 250 wide, from x = 75 to 325, and in quirks mode 300 − 160 = 140 tall, from y = 125 to 265.

`border:53Q solid` is 53 quarter-millimetres, 50.08px, which Chrome rounds down to 50. A border with no color uses the text color: `color:469dba`, a hex with no `#` that quirks mode accepts. Only a 150 × 40 hole is left inside, from x = 125 to 275 and y = 175 to 215, and it shows the navy background from `*`.

### 2. The body opens the frame

The nested `*` matches the `body`. `margin:-160 40 0` puts it 40 inside `html`'s content on each side, from x = 165 to 235, and 160 above it, at y = 15. In quirks mode the `body` reaches down to the bottom of `html`'s content: y = 215.

`html` has a background, so the `body` paints its own: navy. It goes over the middle of `html`'s top border, from x = 165 to 235: the frame is open at the top.

### 3. The li: the bar

The third level of `*` matches what is inside the `body`: the `<li>`. `margin:10` puts it from x = 175 to 225, at y = 25. `border-top:96Q solid` is 90.7px, rounded down to 90: a blue-green bar from y = 25 to 115. Its other borders are 0, and its navy background cannot be seen.

### 4. The bullet: the disc

An `<li>` is a list item: Chrome draws a bullet next to it, a "•" disc in the text color. That bullet is text, so it follows the font. `font:178Q/60Q""` gives the `<li>` a 178Q (168.2px) font and a 60Q (56.7px) line height. At that size, the bullet is a 50px disc. I measured it on the render: from x = 175 to 225 and y = 125 to 175, right under the bar, in the opening of the frame. With `list-style:none`, the disc disappears.

## Golf notes

- `<li>` brings a disc for free: its bullet, sized by the font, in the text color.
- `color:469dba` colors the frame, the bar and the bullet at once, with no `#`.
- The navy `body` erases part of `html`'s border just by being painted on top of it.
- `border-top` alone makes a bar from an empty box.
- `53Q` and `96Q` give 50 and 90 in 3 characters, because borders are rounded down.
- No closing braces, and `<style>` is never closed.
