---
title: "One gradient, two zooms: a theta in 112 characters"
lang: en
ref: 2026-10-07
permalink: /2026/10/07/one-gradient-two-zooms/
description: "How a single CSS rule, applied to both html and body, draws the October 7, 2026 CSS Battle target with a sliced border-image."
target: /assets/targets/2026-10-07.png
target_url: https://cssbattle.dev/play/2G3gK71D7mhWQELMgpup
colors: ["#476573", "#b8d982"]
player: evanliomain
chars: 112
score: 737.55
match: 100
code: |
  <style>*{zoom:2.5;background:#b8d982;border-image:radial-gradient(1Q,#476573 1pc,#0000 0 55Q,#476573)40%13%/auto
---

The October 7 target looks like a Greek theta on a lime card: a ring that sticks out above and below a rectangle, cut in half by a bar. I draw it with no extra element and no border at all. It is one rule, matched by `html` and `body`, and it reuses one gradient twice, at two sizes.

{% include animations/2026-10-07.html lang=page.lang %}

## The code, spaced out

```css
* {                    /* matches html and body (head and style stay hidden) */
  zoom: 2.5;           /* html: ×2.5, body: ×2.5 × 2.5 = ×6.25 */
  background: #b8d982;
  border-image:
    radial-gradient(1Q, #476573 1pc, #0000 0 55Q, #476573)
    40% 13% / auto;
}
```

## How it works

### 1. One gradient, three bands

`radial-gradient(1Q, …)` draws a circle. A single length as the size means "a circle with this radius". The radius itself (1Q, a quarter of a millimetre) does not matter here, because every color stop is an absolute length. It is just the shortest way to say `circle`. Without it, the default ellipse would stretch the stops sideways.

The stops give three bands around the center:

| Band | Stops | Before zoom |
| --- | --- | --- |
| Slate disc | `#476573 1pc` | 0 to 16px |
| See-through ring | `#0000 0 55Q` | 16px to ~52px |
| Slate | `#476573` | beyond 52px |

`#0000` is `transparent` in 5 characters. The `0` after it is a classic trick: a stop can't sit before the previous one, so `0` snaps to 16px and gives a hard edge.

### 2. A border image without a border

`border-image` usually needs a border to draw in. Here there is none, but `/ auto` sets the border-image width to the natural size of each slice. So the image is painted 1:1 over the whole element, padding and content included.

`40% 13%` cuts it into nine pieces: 40% of the height from the top and from the bottom, 13% of the width from each side. The eight outer pieces are drawn. The middle one is only drawn with the `fill` keyword, which is missing. That missing piece is the whole trick: it leaves a horizontal gap through the middle of the gradient.

### 3. Zoom stacks up

`*` matches `html` and `body`, so both get `zoom:2.5`. Zoom multiplies down the tree: `html` is at ×2.5 and `body` at ×6.25.

- On `html` (the 400×300 frame), the stops land at 40px and 130px. The ring's outer edge, 130px from the center, is exactly the ring that pokes out above and below the card.
- `body` keeps its default `margin: 8px`, but at ×6.25 that is 50px. CSS Battle renders in quirks mode, where `body` stretches to the full height, so it becomes a 300×200 lime card at (50, 50).
- On `body`, the same stops land at 100px and 325px. The slate disc now has a 100px radius, and the ring covers the rest of the card.

### 4. One pair of slices for two boxes

`body` is painted on top of `html`, so the result stacks like this:

- `html`'s lime background fills the canvas.
- `html`'s border image paints slate everywhere, except for its see-through ring. Its own missing middle (52 to 348 across, 120 to 180 down) falls under `body` and never shows.
- `body`'s lime card hides everything inside it.
- `body`'s border image draws the 100px slate disc. Its missing middle is 40% of 200px from the top and the bottom, so a 40px gap from y=130 to y=170. It is 222px wide, wider than the disc. That gap is the bar of the theta.

The same `40%13%` works on both boxes: it cuts the bar on `body` and stays hidden on `html`. That is why one rule is enough.

## Golf notes

- `1Q` turns the gradient into a circle in 2 characters.
- `#0000` replaces `transparent`, and `0` gives a hard stop.
- `40%13%/auto` needs no spaces: a `%` ends the number.
- `1pc` (16px) and `55Q` are the shortest way to write those two radii before the zoom.
- `<style>` is never closed. Browsers don't need it.

