---
title: "Flipped twice to stay put: two mirrored Ds in 225 characters"
ref: 2026-06-06
permalink: /2026/06/06/flipped-twice-to-stay-put/
description: "How one shadow list draws the bars on both sides, and how a p flipped twice stays in place, in the June 6, 2026 CSS Battle target."
target: /assets/targets/2026-06-06.png
target_url: https://cssbattle.dev/play/q7qSHC0Frq8QsSEZa6Pg
colors: ["#0d2a58", "#5a9f48", "#d9d9d9"]
player: h_blierzt
chars: 225
score: 646.85
match: 100
code: |
  <dl><p><p><style>&{background:#0d2a58;margin:257 157;*{color:5A9F48;height:230;box-shadow:32q 0,5lh 0 0-5vw;dl,p+p{scale:-1;color:D9D9D9;*{margin:-230-155;border-radius:9in;box-shadow:inset 0 0 0 32q;clip-path:inset(0 0 0 7cm
---

The June 6 target shows two D shapes back to back on navy blue. On the right, a gray D with a green bar inside. On the left, its mirror: a green D with a gray bar inside. A gray bar and a green bar stand between them. H_Bliertz draws the right half: green bars with body's shadows, and a ring cut into a D on a p. dl, flipped with `scale:-1`, copies it all to the left in other colors. The second p is flipped a second time, so it stays on the right.

Use **Wide view** to see where body would sit without the negative margin, and **Teaching colors** to tell the two p apart.

{% include animations/2026-06-06.html lang=page.lang %}

## The code, spaced out

```css
<dl><p><p>
<style>
& {                                /* html */
  background: #0d2a58;             /* paints the whole canvas */
  margin: 257 157;                 /* 86 wide at (157, 257) */
  * {                              /* everything inside html */
    color: 5A9F48;                 /* green, used by the shadows */
    height: 230;
    box-shadow:
      32q 0,                       /* 32q = 30.24px */
      5lh 0 0-5vw;                 /* 5lh = 90px, -5vw = -20px */
    dl,
    p+p {                          /* dl and the second p */
      scale: -1;                   /* a half turn */
      color: D9D9D9;               /* gray */
      * {                          /* the two p (and style) */
        margin: -230-155;          /* 380 × 230 at (10, 35) */
        border-radius: 9in;        /* used as 115px */
        box-shadow: inset 0 0 0 32q;  /* a 30.24px ring */
        clip-path: inset(0 0 0 7cm    /* cuts 264.57px on the left */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `230` is read in px, and `color` takes a hex color without `#`.

The parser builds html > head and body. body holds dl. The first `<p>` goes inside dl. The second `<p>` closes the first one and becomes its sibling, still inside dl. The style element ends up inside the second p.

At the top level, `&` stands for the root: html. The nested `*{` means `& *`: every element inside html, so head, body, dl, both p and style. Inside it, `dl,p+p` matches dl and the second p (`p+p` is a p right after another p). The innermost `*{` matches everything inside dl or inside the second p: both p, and style. head and style are not displayed. The deeper rules are more specific, so their color and box-shadow win where they apply. The first p is not matched by `dl,p+p`: it keeps the green color.

### 2. html

`background:#0d2a58` is on html, so it paints the whole canvas. `margin:257 157` puts html at (157, 257). It is 400 − 2 × 157 = 86 wide. I measured it: 86 wide at (157, 257).

### 3. body and dl move up

body keeps its default 8px margin, and gets `height:230` from `& *`. Its box would be 70 × 230 at (165, 265), almost all below the canvas. I checked it: with `margin:0-155` in place of `margin:-230-155`, body sits at (165, 265).

But the first p has a −230 top margin. Nothing separates it from the top of dl and of body: no border, no padding. So the three top margins merge into one. In quirks mode, Chrome ignores dl's default top margin, because dl is at the top of body. What is left is 8 − 230 = −222. body moves up to 257 − 222 = 35. I checked the quirk too: if I give dl `margin-top:16px` myself, body comes down to y = 43.

I measured body and dl: both 70 × 230 at (165, 35). Their center is (200, 150), the center of the canvas.

### 4. body's shadows

body has no background. It only paints its two shadows. They have no color of their own, so they use body's `color`, green.

- `32q 0` moves a copy of the box 32q = 32 × 0.945 = 30.24px to the right. An outer shadow is never painted under its own box. What is left is a 30.24 × 230 bar, from x = 235 to 265.24.
- `5lh 0 0-5vw` moves a copy 5lh to the right and shrinks it by 5vw on each side. In my Chrome, 1lh is 18px here, so 5lh = 90px. 5vw is 5% of 400 = 20px. The copy is 70 − 40 = 30 wide and 230 − 40 = 190 tall: a bar from (275, 55) to (305, 245).

### 5. dl, the same shadows in gray

dl gets the same `height:230` and the same `box-shadow` from `& *`. It has the same box as body, so it gets the same two bars. But `dl,p+p` gives it `color:D9D9D9`: its bars are gray. dl is inside body, so its bars are painted over the green ones. Before the flip, they would hide them.

### 6. The rings

The innermost rule gives both p `margin:-230-155`. dl is 70 wide: each p is 70 + 2 × 155 = 380 wide, from x = 10. With `height:230`, a p is 380 × 230 at (10, 35). The second p does not sit below the first one: the first p's −230 bottom margin and the second p's −230 top margin merge into one −230. I measured both p: 380 × 230 at (10, 35).

`border-radius:9in` asks for 864px. That does not fit, so Chrome scales the radii down until they do: 115, half the height. The p is a stadium with round ends. `box-shadow:inset 0 0 0 32q` draws a 30.24px ring inside its edge. The middle is empty.

`clip-path:inset(0 0 0 7cm)` cuts 7cm = 264.57px off the left of each p. Only x ≥ 274.57 is left. The right round end has its center at x = 390 − 115 = 275. So what is left is the right half of the ring: a D, from x = 274.57 to 390.

### 7. Flipped once, then twice

`scale:-1` flips dl on both axes around its center, (200, 150). Flipping both axes is a half turn. Everything inside dl turns with it:

- dl's gray bars go to the left: from x = 134.76 to 165, and from (95, 55) to (125, 245).
- The first p is green and has no transform of its own. Its D goes to the left, from x = 10 to 125.43.

The second p gets `scale:-1` too, from `p+p`. Its center is (200, 150), like dl's. It is turned once by dl and once by itself, so it comes back to its place: a gray D on the right. body is not flipped: its green bars stay on the right.

The rings are painted after the bars of their side. Each D covers the ends of the inner bar, which is why the bars look curved at the ends.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list draws the four bars. body and dl share the same box and the same `box-shadow`. dl only changes its color and turns.
- `,p+p` keeps the second ring on the right, in gray, in 4 characters. With `dl{` instead of `dl,p+p{` (221 characters), the second p stays green and turns with dl: it lands on the first one, on the left, and the gray D disappears. 10,404 pixels change.
- `&` is html in 1 character. `html{` instead of `&{` gives the same picture in 228 characters.
- In quirks mode, `color` takes a hex color without `#`. `#5A9F48` and `#D9D9D9` give the same picture in 227 characters.
- `32q` is 30.24px in 3 characters. With `30px` in both places (227 characters), 1,002 pixels change: 460 of them in the columns x = 134 and x = 265, at the edges of the outer bars, and the rest along the round edges of the rings.
- `5lh` is 90px in 3 characters. `90px` gives the same picture in 226 characters.
- `-5vw` is −20px in 4 characters. `-20px` gives the same picture in 226 characters.
- `9in` is far too big, and that is the point: the radius is cut down to 115. `115px` gives the same picture in 227 characters.
- `7cm` is 264.57px in 3 characters. With `265px` (227 characters), 124 pixels change, in the columns x = 125 and x = 274, at the cut ends of the rings.
- Bare numbers in margins and heights: `margin:257px 157px` gives the same picture in 229 characters.
- No space before a minus sign: `0-5vw`, `-230-155`.
- The code stops inside `inset(`. The end of the code closes the parenthesis, the rules and the style element.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 1,760 pixels, with the rule of the golf notes. 117,958 of the 120,000 pixels are identical. The differences are on the edges:

- the columns x = 134 and x = 265, 230 pixels each. With `30px` in place of both `32q`, these two columns match the target: the outer bars are 0.24px wider than in the target.
- the columns x = 125 and x = 274, 62 pixels each. With `265px` in place of `7cm`, they match: the cuts of the rings are 0.43px away from the target's.
- the rest along the round edges of the rings.

The CSS Battle judge gives the code a 100% match.
