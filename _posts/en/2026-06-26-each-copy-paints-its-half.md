---
title: "Each copy paints its half: four squares in 100 characters"
ref: 2026-06-26
permalink: /2026/06/26/each-copy-paints-its-half/
description: "How html and body, two empty boxes at the canvas center, draw the same three box-shadows, and how scale:-1 turns html's copy over to the left while body's copy comes back to the right, in the June 26, 2026 CSS Battle target."
target: /assets/targets/2026-06-26.png
target_url: https://cssbattle.dev/play/HXrAieeMjNEmOzbRlBIV
colors: ["#222", "#d8f581"]
player: selenit
chars: 100
score: 754.22
match: 100
code: |
  <style>*{margin:37.5%50%;box-shadow:58q -58q 0 58q#222,87q 87q 0 29q#222,3in 0 0 3in#D8F581;scale:-1
---

The June 26 target shows four black squares on a pale lime background, like a tiny QR code. Two big ones sit at the top right and bottom left and touch at one corner, in the center. Two small ones sit at the top left and bottom right. Ilya Streltsyn draws only the right half: a big square, a small square and a green half background, as three shadows. html and body both draw them, and `scale:-1` turns html's copy over to the left, while body's copy turns twice and stays on the right.

Use **Teaching colors** to tell html's copy from body's.

{% include animations/2026-06-26.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                              /* html, head, style and body */
  margin: 37.5%50%;              /* html: 150px and 200px, body: 0 */
  box-shadow:
    58q -58q 0 58q#222,          /* big square, corner on the center */
    87q 87q 0 29q#222,           /* small square, bottom right */
    3in 0 0 3in#D8F581;          /* green, the right half */
  scale: -1                      /* html turns over, body turns back */
```

## How it works

### 1. Two empty boxes in the middle

`*` selects html, head, style and body. head and style are hidden, so only html and body matter.

A margin in % is a share of the containing block's width, even for the top and bottom margins. html's containing block is the canvas, 400px wide: `37.5%` is 150px and `50%` is 200px. html's content box is 400 − 2 × 200 = 0px wide, and nothing inside it takes room. I measured it: a 0 × 0 box at (200, 150), the center of the canvas.

body's containing block is html's content box, which is 0px wide. So body's margins are 37.5% and 50% of 0: nothing. body is also a 0 × 0 box at (200, 150).

### 2. Squares drawn by shadows

A box-shadow on a 0 × 0 box is a point. The spread grows it into a square twice the spread wide, and the offset moves it. 1q is a quarter of a millimeter, 0.945px.

- `58q -58q 0 58q#222`: 58q is 54.8px. The square is 109.6 × 109.6, moved 54.8px right and 54.8px up. Its bottom-left corner sits on the center: it spans x = 200 to 309.6 and y = 40.4 to 150.
- `87q 87q 0 29q#222`: 29q is 27.4px and 87q is 82.2px. The square is 54.8 × 54.8, centered at (282.2, 232.2): x = 254.8 to 309.6, y = 204.8 to 259.6. Its right side lines up with the big square's.

### 3. Half a background

The canvas has no background, so it is white. The third shadow, `3in 0 0 3in#D8F581`, brings the green. 3in is 288px. The spread makes a 576 × 576 square, and the 288px offset moves it right by exactly half its width: its left edge lands on x = 200. It spans x = 200 to 776 and y = −138 to 438, so it covers the whole right half of the canvas.

The first shadow in the list is painted on top. The green one comes last, so it sits under the two black squares.

### 4. scale:-1: html turns over

`scale:-1` multiplies both axes by −1 around the center of the box, (200, 150). It is the same as a half turn: a point (x, y) goes to (400 − x, 300 − y).

html's turn applies to everything it paints, body included. On its own, it would send every shadow to the left half.

### 5. scale:-1: body turns back

body has its own `scale:-1`, and it sits inside html, which is already turned. The two turns cancel: −1 × −1 = 1. body's copy ends up where it was drawn, on the right.

html's copy stays turned, on the left:

- big square: x = 90.4 to 200, y = 150 to 259.6, bottom left;
- small square: x = 90.4 to 145.2, y = 40.4 to 95.2, top left;
- green: x = −376 to 200, the left half.

I checked the two halves with renders. With body's shadows removed, the left half (x = 0 to 199) does not change and the whole right half turns white: 60,000 pixels. With html's shadows removed, it is the other way round.

### 6. The picture

body is painted above html. Its green could cover html's squares, but it stops at x = 200, and html's squares stop there too. The two green halves meet on x = 200 and fill the canvas. The two big squares touch at one corner, at (200, 150).

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One list of three shadows draws four squares and the whole background, because html and body both draw it and `scale:-1` mirrors one copy through the center. Without `;scale:-1` (91 characters), both copies stay on the right, the left half stays white, and 60,000 pixels change.
- `scale:-1` is a half turn in 8 characters. `rotate:180deg` gives the same picture in 105 characters, and `transform:scale(-1)` in 111.
- The % margins do two jobs: 150px and 200px for html, and 0 for body, whose containing block is 0px wide. With `margin:150px 200px` (103 characters), body gets those margins too and leaves the center: 41,485 pixels change.
- No space is needed between `37.5%` and `50%`. With the space, the same picture takes 101 characters.
- `58q`, `87q` and `29q` are 54.8px, 82.2px and 27.4px in 3 characters each. In px, the nearest whole values, `55px`, `82px` and `27px`, make the code 106 characters long.
- `3in` is 288px in 3 characters. The green only needs a spread of 150px or more, to reach from y = 150 to the top and bottom of the canvas: `150px` gives the same picture in 104 characters. With `149px` (also 104), the top and bottom rows stay white, and 800 pixels change.
- The green's offset equals its spread, so its left edge sits on the center line. With `0 0 0 3in#D8F581` (98 characters), body's green is centered on (200, 150) and covers html's two squares: 15,235 pixels change.
- `*` selects html and body in 1 character. `html,body` gives the same picture in 108 characters.
- `#222` is the short form of `#222222`. The long form gives the same picture in 106 characters.
- No space is needed before a `#`. `58q #222`, `29q #222` and `3in #D8F581` give the same picture in 103 characters.
- Nothing is closed. `}` at the end gives the same picture in 101 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 1,711 pixels, with the same rule as in the golf notes. 876 of them are on the edges of the squares. 58q is 54.8px, not 55px, so the edges land at x = 90.4, 145.2, 254.8 and 309.6, and at y = 40.4, 95.2, 204.8 and 259.6. Those pixels are only partly covered and get a mixed color, while the target has hard edges at x = 90, 145, 255 and 310, and y = 40, 95, 205 and 260. With `55px`, `82.5px` and `27.5px` in place of the q values, exactly those 876 pixels turn solid. The other 835 pixels are in the flat areas, 766 of them within 4px of an edge: the target is a JPEG, and its colors drift there. The CSS Battle judge gives the official code a 100% match.
