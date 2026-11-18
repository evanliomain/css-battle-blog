---
title: "The page turns, one bar turns back: a gray H in 124 characters"
ref: 2026-04-28
permalink: /2026/04/28/the-page-turns-one-bar-turns-back/
description: "How three paragraphs, stacked as flat bars with collapsed negative margins, become a gray H when html turns a quarter turn and the middle one turns back, in the April 28, 2026 CSS Battle target."
target: /assets/targets/2026-04-28.png
target_url: https://cssbattle.dev/play/uSfVqzY6VFAZUkXfnmQn
colors: ["#d6924e", "#d9d9d9", "#000"]
player: koda_pig
chars: 124
score: 722.68
match: 100
code: |
  <p> <p x> <p> <style>&,[x]{rotate:90deg;background:#C72C;p{scale:1.111;background:#D9D9D9;margin:212 84-328;border:9px solid
---

The April 28 target is a gray H outlined in black on an orange background: two vertical bars and a crossbar that sticks out a little on both sides. koda_pig draws it with three paragraphs, stacked as flat bars. One `rotate:90deg` on html turns them all vertical. The middle one has its own `rotate:90deg`, so it turns back flat: that is the crossbar.

With **Teaching colors**, each paragraph gets its own color. **Wide view** shows html's box as it turns.

{% include animations/2026-04-28.html lang=page.lang %}

## The code, spaced out

```css
<p>&nbsp;<p x>&nbsp;<p>&nbsp;   /* three paragraphs, each with a no-break space */
<style>
&,                      /* & at the top level: the root, html */
[x] {                   /* and the middle p */
  rotate: 90deg;        /* html: a quarter turn; p x: one more */
  background: #C72C;    /* html: the canvas; p x: beaten by the rule below */
  p {                   /* every p inside html: all three */
    scale: 1.111;       /* 216 × 36 → 240 × 40, border 9 → 10 */
    background: #D9D9D9;
    margin: 212 84-328; /* 212 on top, 84 on the sides, −328 at the bottom */
    border: 9px solid   /* no color: black, the text color */
/* the end of the code closes the two rules */
```

## How it works

### 1. Three paragraphs with something inside

There is no doctype, so the page is in quirks mode. A bare number like `212` in a margin is read in px.

The HTML is `<p>`, `<p x>` and `<p>`, each one followed by a no-break space, not a plain space. The browser does not drop them: each one is text inside a p. A `<p>` closes the open one, so the three p are siblings in body, and `<style>` lands in the third one. Each p holds one line of text, 18px tall in my Chrome.

### 2. Two selectors, one nested rule

At the top level of a stylesheet, `&` means the root: html. So `&,[x]` matches html and the middle p, the one with the `x` attribute. Both get `rotate:90deg` and `background:#C72C`.

The nested `p{` means "a p inside html, or inside p x". All three p are inside html, so all three get the gray background, the margin, the border and the scale.

p x gets two backgrounds: `#C72C` from `[x]`, and `#D9D9D9` from the nested rule. The nested rule is more specific: an attribute and a tag name, against an attribute alone. Its computed background is `rgb(217, 217, 217)`: gray wins.

### 3. html's background is the canvas

`#C72C` is a short hex color with an alpha digit: `#cc7722` at 204 / 255 = 80% opacity. html is the root, so its background paints the whole canvas, over white. 204 × 0.8 + 255 × 0.2 = 214.2: in my render, the canvas is (214, 146, 78).

### 4. Three 216 × 36 bars

Before any transform, each p is a flat bar:

- width: body has its default 8px margins, and each p has 84px on each side: 400 − 2 × (8 + 84) = 216, from x = 92 to 308;
- height: the 18px line plus two 9px borders: 36.

The border has no color, so it takes the text color: black.

### 5. Margins that merge

`margin:212 84-328` has three values: 212 on top, 84 on the sides, −328 at the bottom. `84-328` needs no space: the `-` starts a new number.

Vertical margins of neighbor blocks collapse into one. Between two p, a −328 bottom margin meets a 212 top margin: the result is 212 − 328 = −116. So each p starts 116px before the end of the previous one.

The first p's top margin also collapses with body's 8px: in my Chrome, its offsetTop is 212. Then 212 + 36 − 116 = 132 for p x, and 132 + 36 − 116 = 52 for the last p. Their centers are at y = 230, 150 and 70, 80px apart. All three are centered on x = 200.

### 6. scale:1.111

`scale` grows each p around its own center. 1.111 is almost 10/9:

- 216 × 1.111 = 239.976 wide;
- 36 × 1.111 = 39.996 tall;
- 9 × 1.111 = 9.999 for the border.

One declaration gives three nearly round sizes: 240 × 40, with a 10px border.

### 7. html turns a quarter turn

In quirks mode, html is 400 × 300. `rotate:90deg` turns it around its center, (200, 150), clockwise, and everything inside turns with it. getBoundingClientRect gives html the box (50, −50) to (350, 350).

A point that was below the center goes to its left. The first p, centered at (200, 230), lands at (120, 150). p x stays at (200, 150). The last p, centered at (200, 70), lands at (280, 150). The bars are now vertical, 40 wide and 240 tall: the first p from x = 100 to 140, the last one from x = 260 to 300, both from y = 30 to 270.

The canvas color does not turn. It is painted on the whole canvas, not in html's box.

### 8. The middle p turns back

p x also has its own `rotate:90deg`. With html's, that makes 180deg: a flat bar turned 180deg is flat again. p x runs from x = 80 to 320 and from y = 130 to 170: the crossbar.

Each p has a transform, so each one is painted as its own layer, in code order. p x is painted over the first p, and the last p over p x. That is why the crossbar hides the inside of the left bar, while the right bar stays whole and the end of the crossbar shows past it.

The direction matters. With `rotate:-90deg` (125 characters), the first p goes to the right and the last one to the left: the left bar is now painted over the crossbar, the crossbar over the right bar, and 1,600 pixels change.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- `&,[x]` writes `rotate:90deg` once for two boxes. With `&{` for html and `}}[x]{rotate:90deg` at the end (138 characters), the picture is the same.
- p x also gets `background:#C72C`, for free: the nested rule beats it. Nesting is what makes it beat it. With `}p{` instead of `;p{` (same length), `p` is a top-level rule, less specific than `[x]`. p x keeps the translucent orange: its inside turns a darker orange, (206, 124, 42), the left bar shows through it, and 3,600 pixels change.
- `#C72C` is 5 characters. The opaque color it gives, `#d6924e` (126 characters), draws the same picture.
- The border has no color: black comes from the text color. With `solid#000` (128 characters), the picture is the same.
- `84-328` needs no space. With `84 -328` (125 characters), the picture is the same.
- The no-break spaces are 1 character each, like a plain space, but the browser keeps them. With plain spaces (124 characters), the p are empty: no line, only their two borders, 18px tall. The bars become three black bars, 98px apart instead of 80, and 27,320 pixels change. With nothing between the tags (121 characters), the same 27,320 pixels change.
- `scale:1.111` sets the width, the height and the border at once. Without it (112 characters), the bars stay 216 × 36 with 9px borders, and 7,656 pixels change. With `1.11` (123 characters), 360 pixels change, on the edges of the borders: at (120, 30), the top row of the left bar is (25, 24, 23) instead of (2, 2, 2).
- The bare numbers need quirks mode. With `<!doctype html>` in front (139 characters), the margin is dropped: each p keeps its default margin, 16px on top and at the bottom, and 46,160 pixels change.
- The two rules are left open, and there is no `</style>`. With `}}` (126 characters), the picture is the same.
