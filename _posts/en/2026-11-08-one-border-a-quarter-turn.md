---
title: "One border, a quarter turn: a double-line corner in 105 characters"
lang: en
ref: 2026-11-08
permalink: /2026/11/08/one-border-a-quarter-turn/
description: "How one double border, given to html and to a rotated body, draws the November 8, 2026 CSS Battle target: four blue bars around a corner."
target: /assets/targets/2026-11-08.png
target_url: https://cssbattle.dev/play/rEKvTN92AC1WV2cGoZCp
colors: ["#469dba", "#fae29e"]
player: benjamintordjman
chars: 105
score: 747.04
match: 100
code: |
  <style>*{border-top:96q double#469DBA;margin:60 170 90 110;*{background:#FAE29E;margin:-90 0;rotate:90deg
---

The November 8 target is a corner drawn with a double line: four blue bars, 30px thick, on a pale yellow background. Two run across, two run down, and they never meet at the corner. Benjamin Tordjman's solution writes one border, a double top border of 90px. `html` uses it for the two horizontal bars. The `body` gets the same border, then turns a quarter turn, and its two bars become the vertical ones.

Use **Teaching colors** to tell the `body`'s bars from `html`'s.

{% include animations/2026-11-08.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                 /* html and body */
  border-top: 96q double #469DBA;   /* 90px: line 30, gap 30, line 30 */
  margin: 60 170 90 110;            /* html: 120 × 150 */
  * {                               /* body */
    background: #FAE29E;            /* goes to the canvas */
    margin: -90 0;                  /* 240px tall, from y = 60 */
    rotate: 90deg;                  /* quarter turn */
  }
}
```

## How it works

### 1. html is a 120 × 150 box

`*` matches every element: `html` and the `body` (and `head` and `style`, which are not displayed). The nested rule then gives the `body` its own margin. `html` keeps `margin:60 170 90 110`. Its width is 400 − 170 − 110 = 120px, from x = 110 to 230. CSS Battle runs in quirks mode, where `html` fills the window minus its top and bottom margins: 300 − 60 − 90 = 150px, from y = 60 to 210.

`html` has no background, so the `body`'s `#FAE29E` is used for the whole canvas. The `body` itself paints no background.

### 2. A double border draws two bars

`96q` is 96 quarter-millimetres: 90.71px. Chrome rounds a border width down to a whole pixel, so the border is 90px. The `double` style cuts it into three equal parts: a 30px line, a 30px gap, a 30px line. On `html`, that gives the two horizontal bars: x from 110 to 230, y from 60 to 90 and from 120 to 150.

### 3. Negative margins stretch the body

Under its 90px border, `html` has 60px of content, from y = 150 to 210. In quirks mode, the `body` fills that height minus its own top and bottom margins. With `margin:-90 0`, it gains 90px at each end: 60 + 90 + 90 = 240px. So the `body` runs from y = 60 to 300, and from x = 110 to 230, as wide as `html`. I checked that this height comes from `html`'s bottom margin: with `margin-bottom:30` on `html`, the `body` is 300px tall.

### 4. The body gets the same border

The outer `*` matches the `body` too, so it also has the double top border. Its top is at y = 60, like `html`'s, and it is just as wide: its two bars land exactly on `html`'s two bars. Nothing new shows yet.

### 5. A quarter turn

`rotate:90deg` turns the `body` clockwise around its centre. The box is 120 × 240 with its top left corner at (110, 60), so its centre is (170, 180). After the turn, it is 240 × 120, from x = 50 to 290 and from y = 120 to 240. Its top edge is now on the right. Its outer line, 120 to 90px above the centre, becomes the bar from x = 260 to 290. Its inner line, 60 to 30px above the centre, becomes the bar from x = 200 to 230. Both run from y = 120 to 240.

The turned box hides nothing: its background went to the canvas. Where the bar at x = 200 crosses `html`'s lower bar, both are blue. The two vertical bars come from the `body` and the two horizontal ones from `html`, so nothing joins the outer bars at the corner. That is the gap of the target.

## Golf notes

- One `border-top` on `*` draws all four bars. `rotate:90deg` sits in the nested rule, so it only turns the `body`.
- `96q` is 3 characters for 90px, because the width is rounded down to 90. `90px` is 4.
- The `double` style gives two equal bars and the gap between them in one word.
- The `body`'s height comes for free: in quirks mode it follows `html`, and `margin:-90 0` both moves it up and makes it 240px tall.
- `double#469DBA` needs no space before the `#`.
- No closing braces, and `<style>` is never closed.
