---
title: "Same gradient, new units: a split ring in 104 characters"
lang: en
ref: 2026-10-06
permalink: /2026/10/06/same-gradient-new-units/
description: "How one radial gradient, read with different em and lh values on html and body, draws the October 6, 2026 CSS Battle target."
target: /assets/targets/2026-10-06.png
target_url: https://cssbattle.dev/play/Kaggn8uvEQrRIx0YidV3
colors: ["#8b4646", "#fff", "#e98f6b"]
player: h_blierzt
chars: 104
score: 748.45
match: 100
code: |
  <style>*{*{margin:110 100;font:6px/20''}background:radial-gradient(9%2lh,#8B4646 5em,#FFF 0 278%,#E98F6B
---

The October 6 target is a brown disc in a white ring, on a salmon background. A salmon band cuts the ring on both sides, and two white bars cross the disc inside that band. H_Bliertz draws it with a single gradient, given to both `html` and `body`. The gradient is written in `em` and `lh`, and `body` changes what those units are worth, so the same code draws a ring on one and two bars on the other.

{% include animations/2026-10-06.html lang=page.lang %}

## The code, spaced out

```css
* {                          /* html (head and style stay hidden) */
  * {                        /* html's descendants: only body shows */
    margin: 110 100;
    font: 6px/20 '';         /* 1em = 6px, 1lh = 120px */
  }
  background: radial-gradient(
    9% 2lh,                  /* ellipse size */
    #8B4646 5em,             /* brown disc */
    #FFF 0 278%,             /* white ring */
    #E98F6B                  /* salmon beyond */
  );
}
```

## How it works

### 1. One gradient for html, and for body

The outer `*` matches every element, so `html` and `body` both get the background (`head` and `style` get it too, but they are hidden). The nested `*{…}` means `* *`: every element inside another one. That is `body` (plus the hidden ones), but not `html`. So `body` alone gets the margin and the font.

### 2. On html: a circle, a disc and a ring

`html` keeps the default font: 16px, with `line-height: normal`. In Chrome, with that default font, `1lh` is 18px.

- The size `9% 2lh` is 9% of 400px = 36px across, and 2 × 18px = 36px down. Both radii are equal, so the ellipse is a circle.
- `5em` is 5 × 16 = 80px: brown up to 80px from the center.
- `0` snaps to the previous stop and gives a sharp edge. Then white up to `278%`. A percentage stop is measured against the horizontal radius: 278% of 36px ≈ 100px.
- Salmon beyond.

The background of `html` covers the whole canvas, so this already draws the disc (radius 80), the ring (80 to 100) and the background.

### 3. body is a 200 × 80 band

`margin:110 100` (CSS Battle runs in quirks mode, so no units are needed) puts `body` at x = 100, y = 110, 200px wide. In quirks mode, `body` fills the page height minus its margins: 300 − 110 − 110 = 80px. So it is the band from y = 110 to y = 190.

Since `html` has its own background, the background of `body` is not moved to the canvas. It is painted inside the band only.

### 4. The font changes the units

`font:6px/20''` sets a 6px font with a line height of 20 × 6 = 120px. So on `body`, `1em` = 6px and `1lh` = 120px. The same gradient now reads:

| | On `html` | On `body` |
| --- | --- | --- |
| `9%` (width) | 36px | 18px |
| `2lh` (height) | 36px | 240px |
| `5em` | 80px | 30px |
| `278%` | ≈ 100px | ≈ 50px |

On `body`, the ellipse is 18 × 240: thirteen times taller than wide. Its stops are ellipses with the same shape, so over a band only 80px tall their sides are almost perfectly vertical.

### 5. The band draws the bars

Inside the band, centered on x = 200:

- brown from x = 170 to 230 (30px each side);
- white from 150 to 170 and from 230 to 250: the two bars;
- salmon outside, from 100 to 150 and from 250 to 300.

That salmon covers the ring of `html` on both sides: the ring looks cut. The brown in the middle matches the disc below, so the disc seems to go on through the band.

## Golf notes

- One gradient serves two boxes: only the units change, through `font`.
- `font` needs a family, or the whole declaration is dropped. `''`, an empty name, is the shortest valid one.
- `6px/20`: a unitless line height is a multiple of the font size, so `20` is 120px.
- `9%2lh` needs no space: the `%` ends the number.
- `*{*{…}…}` is nesting: the inner rule is `* *`, which skips `html`.
- `<style>` is never closed.
