---
title: "Three round shadows: a cloud in 152 characters"
lang: en
ref: 2026-09-03
permalink: /2026/09/03/three-round-shadows/
description: "How an invisible round html and a body with no height cast the shadows that draw the September 3, 2026 CSS Battle target: a grey cloud in front of a pale sun."
target: /assets/targets/2026-09-03.png
target_url: https://cssbattle.dev/play/4Vcs99dhGoi89v5nqX2E
colors: ["#3246de", "#dddeeb", "#7f8ae9"]
player: h_blierzt
chars: 152
score: 693.95
match: 100
code: |
  <style>*{background:#3246DE;color:DDDEEB;border-radius:2in;margin:25%75%25%0;box-shadow:50vw 5vw,30vw 0 0 5vw,201q -32q 0-11q#7F8AE9;*{margin:100-9 0 70
---

The September 3 target is a light grey cloud on bright blue, with a pale blue sun peeking out behind it. H_Bliertz's solution draws nothing directly. `html` is a blue circle on the blue canvas, so it cannot be seen, but its three round shadows are the two lobes of the cloud and the sun. The `body` has no height at all, yet one of its shadows is spread enough to show: the flat bottom of the cloud.

Use **Teaching colors** to see the `body`'s shadow in orange.

{% include animations/2026-09-03.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                    /* html, then the body */
  background: #3246DE;
  color: DDDEEB;                       /* a hex with no # works in quirks mode */
  border-radius: 2in;                  /* as round as possible */
  margin: 25% 75% 25% 0;
  box-shadow:
    50vw 5vw,                          /* small lobe */
    30vw 0 0 5vw,                      /* big lobe, spread 20 */
    201q -32q 0 -11q #7F8AE9;          /* the sun, shrunk by 10.4 */
  * {                                  /* the body */
    margin: 100 -9 0 70;
  }
}
```

## How it works

### 1. html: an invisible circle

`*` gives `html` `margin:25%75%25%0`. A margin in % uses the width: 25% of 400 = 100 at the top and the bottom, 75% = 300 on the right, 0 on the left. So `html` is 100 wide, from x = 0 to 100, and in quirks mode 300 − 200 = 100 tall, from y = 100 to 200.

`border-radius:2in` is 192px, far more than half of the box: Chrome scales it down to 50, and the box is a circle. Its background is the same blue as the canvas, so the circle cannot be seen. It is only there to cast shadows.

### 2. Two shadows: the lobes

A shadow takes the shape of its box, so `html`'s shadows are circles too. With no color, they use the text color: `color:DDDEEB`, a hex with no `#` that quirks mode accepts.

`50vw 5vw` moves a copy 200px right and 20px down: a circle of radius 50 centred at (250, 170), the small lobe. `30vw 0 0 5vw` moves a copy 120px right and spreads it by 20px: a circle of radius 70 centred at (170, 150), the big lobe. The first shadow in the list is painted on top, so the small lobe covers the big one.

### 3. A shadow behind: the sun

`201q -32q 0-11q#7F8AE9` moves a copy 189.9px right and 30.2px up, with no blur and a negative spread of −10.4px. It is a pale blue circle of radius 50 − 10.4 = 39.6, centred at (239.9, 119.8). It is the last shadow in the list, so it is painted under the two lobes: the sun peeks out from behind the cloud.

### 4. The body: the flat bottom

The nested `*` gives the `body` `margin:100-9 0 70`. Inside `html`'s 100px, it starts 70 from the left and its right margin is −9: it runs from x = 70 to 109, 39 wide. It starts 100 down, at y = 200, and in quirks mode it fills what is left of `html`'s height: nothing. The `body` is 0 tall.

It gets the same three shadows. A 0 tall box with no spread is an empty shadow, and the third one even shrinks. But the second shadow is spread by 20px: it becomes 79 × 40, moved 120px right, from x = 170 to 249 and y = 180 to 220, with round ends from the big radius. That fills the gap under the two lobes: the cloud's flat bottom.

## Golf notes

- Three shadows written once draw on two boxes: two lobes and the sun on `html`, the base on the `body`.
- `html` is invisible, blue on blue: it only serves as the shape of its shadows.
- A box with no height only shows a shadow that has a spread: the other two vanish on the `body`.
- A negative spread makes the sun smaller than the box that casts it.
- `2in` is a cheap "as round as possible": it rounds the circle and the base's ends.
- No closing braces, and `<style>` is never closed.
