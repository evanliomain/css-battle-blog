---
title: "Nested quarter turns: nine discs in 179 characters"
ref: 2026-05-27
permalink: /2026/05/27/nested-quarter-turns/
description: "How one list of three box shadows, given to body, dl, h1 and p stacked in the same round box and each turned a quarter turn more than its parent, draws a grid of nine brown and green discs joined by two bars in the May 27, 2026 CSS Battle target."
target: /assets/targets/2026-05-27.png
target_url: https://cssbattle.dev/play/mx8vXdVXxjZy7nuj8zF9
colors: ["#fff8cf", "#b9c99f", "#7c3219"]
player: emohdaziz
chars: 179
score: 672.63
match: 100
code: |
  <dl><h1><p><style>&,&>*{color:7c3219;background:#fd13;box-shadow:0 5vw,0-5vw;margin:60 85;*{border-radius:50%;box-shadow:inset 2in 0,25vw 25vw,25vw 0#b9c99f;rotate:90deg;height:60
---

The May 27 target shows nine discs on cream, in three rows of three. The top and bottom rows go brown, green, brown, joined by a brown bar. The middle row is green, brown, green. Mohamed Ali stacks four boxes in the same round box: body, dl, h1 and p. They all get the same three shadows and the same quarter turn. Turns add up from parent to child, so the same two discs land in four places.

With **Teaching colors**, the discs of each box get a ring in its own color, and an arrow shows which way the box faces.

{% include animations/2026-05-27.html lang=page.lang %}

## The code, spaced out

```css
<dl><h1><p>
<style>
&, &>* {                     /* html; head and body */
  color: 7c3219;             /* brown, for every shadow with no color */
  background: #fd13;         /* html's goes to the canvas: #fff8cf */
  box-shadow:
    0 5vw,                   /* html: bar below, 20px */
    0-5vw;                   /* html: bar above */
  margin: 60 85;             /* html: 230 × 180 at (85, 60); body: 60 wide */
  * {                        /* body, dl, h1, p (head and style too) */
    border-radius: 50%;      /* round boxes */
    box-shadow:
      inset 2in 0,           /* fills the box with brown */
      25vw 25vw,             /* brown disc, 100px right and 100px down */
      25vw 0#b9c99f;         /* green disc, 100px right */
    rotate: 90deg;           /* a quarter turn, added to the parent's */
    height: 60               /* 60 × 60 at (170, 120) */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `60` in a margin or a height is read in px.

`<dl><h1><p>` opens three elements, and none of them closes the one before. So the page is body > dl > h1 > p, with the `<style>` inside p.

At the top level of a style sheet, `&` matches the root: html. `&>*` matches its children, head and body. The nested `*{` matches any element inside those: head, body, dl, h1, p and style. head and style are not displayed.

So html only gets the first rule. dl, h1 and p only get the nested one. body gets both, and for the property set in both, `box-shadow`, the nested rule wins: I checked body's computed style.

The `<style>` is never closed, and neither are the two rules: the end of the code closes them.

### 2. html and the canvas

`margin:60 85` puts 60px at the top and the bottom, 85px on the sides. In quirks mode, html fills the page minus its margins: 230 × 180, at (85, 60).

`#fd13` is a 4-digit hex: yellow #ffdd11 at 0x33 = 20% opacity. html is the root, so its background is painted on the whole canvas. Over white, it gives the cream #fff8cf.

### 3. The two bars

`color:7c3219` has no `#`. In quirks mode, the browser still reads it as a color: #7c3219. A shadow with no color uses the current color. The two bars, the middle disc and the brown discs all take it.

`0 5vw` copies html's box 5vw = 20px down, and `0-5vw` 20px up. An outer shadow is never painted under its own box. So only two strips show: 230 × 20, from y = 40 to 60 and from y = 240 to 260, x = 85 to 315.

### 4. Four boxes in one

body gets `margin:60 85` too. Inside html's 230px, it is left with 230 − 170 = 60px of width. The nested `height:60` makes it square, and `border-radius:50%` round: a 60px round box at (170, 120).

dl, h1 and p are blocks with no margin set by the code. Each takes the full 60px width of its parent, and `height:60` gives it the same height. They have default top margins (16px, 21.44px and 32px), but these collapse with body's 60px top margin, and the largest wins. I checked: with an extra `margin-top:40px` on p, nothing moves. The four boxes are exactly on top of each other, at (170, 120).

### 5. The middle disc

body also has `background:#fd13`, from the first rule. The shadow `inset 2in 0` covers it. An inset shadow is drawn inside the box, around a copy of the box moved by the offset. Here the copy moves 2in = 192px to the right, far past the 60px box. Nothing of the box is left out: it is all brown. The four boxes paint this same brown disc.

### 6. Two discs, four turns

`25vw 25vw` is a brown copy of the round box, 100px right and 100px down. `25vw 0#b9c99f` is a green copy, 100px to the right.

`rotate:90deg` turns a box a quarter turn clockwise around its center, shadows included. All four boxes have their center at (200, 150). A turn also applies to everything inside the box, so a child's own turn adds to its parent's. body turns 90°, dl 180°, h1 270° and p 360°.

A quarter turn sends "right" to "down" and "down" to "left". So:

- body, 90°: green disc at (200, 250), brown disc at (100, 250).
- dl, 180°: green at (100, 150), brown at (100, 50).
- h1, 270°: green at (200, 50), brown at (300, 50).
- p, 360°: green at (300, 150), brown at (300, 250), as if it had not turned at all.

I checked each brown disc by giving dl, h1 and p their own color in a test copy.

### 7. Who is on top

html is painted first, so its bars are under every disc. Each bar starts at x = 85 and ends at x = 315, under the brown discs (x = 70 to 130 and 270 to 330), and the green disc in the middle of the row covers its middle. The eight outer discs never overlap. Only the four middle ones do, and they are the same brown disc.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One shadow list and one turn for four boxes. The turns add up, so the same two shadows land in four places.
- The three tags have to be blocks that nest. `<a><b><i>` would save 2 characters (177), but they are inline: `height` does not apply to them, and they are 0 × 0 boxes. Only body's discs are left: 14,813 pixels change.
- `&,&>*` keeps the first rule off dl, h1 and p. With `*{` instead (175 characters), they get `margin:60 85` too: their width drops to 0, and their discs are gone. Only body's discs are left: 14,813 pixels change.
- `color:7c3219` makes brown the default color of the shadows. Writing `#7c3219` on the four brown shadows instead, with no `color`, gives the same picture in 194 characters. With the `#` kept in `color:#7c3219`, it is 180.
- `#fd13` is 5 characters. The opaque cream it gives, `#fff8cf`, takes 7: the same picture in 181 characters.
- `inset 2in 0` is the shortest way to fill the boxes with brown. With `background:#7c3219;` in the nested rule instead, it is the same picture in 186 characters. Without either, the middle disc shows body's own `#fd13` over the cream, #fff2a8: 2,906 pixels change.
- Short units: `5vw` is 20px, `25vw` is 100px and `2in` is 192px. With px values (186 characters), the picture is the same. The margins and the height need no unit at all, thanks to quirks mode.
- No spaces where none are needed: `0 -5vw` and `0 #b9c99f` give the same picture in 181 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 1,263 pixels, with the same rule as in the golf notes, by up to 192. All of them are on the edges of the nine discs, 123 to 159 per disc. The flat colors match, except that my cream is #fff8cf and the target's is #fef9ce, one step off on each channel. My render smooths the edges with many more in-between shades: 279 colors in all, against 70 in the target. The CSS Battle judge gives the code a 100% match.
