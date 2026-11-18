---
title: "A ring cut at its tile edge: two linked rings in 144 characters"
ref: 2026-05-24
permalink: /2026/05/24/a-ring-cut-at-its-tile-edge/
description: "How one radial gradient, given to html, body and p, draws a full ring on html, a half ring on body cut by the edge of its background tile, and a piece of ring on p that fills the gap between them, in the May 24, 2026 CSS Battle target."
target: /assets/targets/2026-05-24.png
target_url: https://cssbattle.dev/play/BM9ub61jbytrtMmKND4a
colors: ["#e8ad6d", "#2f5a76"]
player: koda_pig
chars: 144
score: 701.39
match: 100
code: |
   <p> <style>p{margin:0 118}*{background:radial-gradient(1q at 25ch,#0000 5pc,#E8AD6D 0 130px,#0000)var(--z,69q#2F5A76);*{--z:134q;font:.01q/1in'
---

The May 24 target shows two orange rings on dark blue. They overlap, the space between them is filled, and the left ring is cut by a vertical line. koda_pig draws it with one radial gradient, given to every element. On html, it paints a full ring. On body, the center of the ring sits on the edge of the background tile, so only its right half shows. On p, a piece of ring fills the gap between the two.

With **Wide view**, you can see html's background repeat to the left of the canvas. With **Teaching colors**, each element's ring gets its own color.

{% include animations/2026-05-24.html lang=page.lang %}

## The code, spaced out

```css
&nbsp;<p>&nbsp;<style>           /* two real no-break spaces: 1 character each */
p {
  margin: 0 118;                 /* p: 148 wide, at x = 126 */
}
* {                              /* html, head, body, p, style */
  background:
    radial-gradient(
      1q at 25ch,                /* a circle with a 0.945px ray; center x = 25ch, y = 50% */
      #0000 5pc,                 /* transparent up to 80px */
      #E8AD6D 0 130px,           /* orange from 80px to 130px */
      #0000                      /* at 1q, pulled up to 130px: transparent beyond */
    )
    var(--z, 69q#2F5A76);        /* html: position 69q and the blue color */
  * {                            /* every element inside another: head, body, p, style */
    --z: 134q;                   /* body and p: position 134q, no color */
    font: .01q/1in'              /* a 0.0094px font, 96px lines, an empty font name */
```

## How it works

### 1. The elements and the rules

CSS Battle pages have no doctype, so they are in quirks mode. A bare number like `118` in a margin is read in px.

The code starts with a no-break space. It is not white space, so the browser opens body and puts it there, as text. Then comes `<p>`, a second no-break space inside p, and the `<style>`, inside p too. The page is html, an empty head, and body with the text and p.

`*` matches every element. The `*{` nested in it matches every element inside another one: head, body, p and style. head and style are not displayed. The rules are never closed: the end of the code closes them.

html is 400 × 300. In quirks mode, body fills html minus its default 8px margin: 384 × 284 at (8, 8). `p{margin:0 118}` removes p's top and bottom margins and takes 118px on each side: p is 384 − 236 = 148 wide, at x = 8 + 118 = 126.

### 2. 96px lines

The nested rule gives body and p `font:.01q/1in'`. The font size is 0.01q = 0.0094px: the no-break spaces can't be seen. The line height is 1in = 96px. The `font` shorthand needs a font name: the quote opens an empty one, and the end of the code closes it.

body's first line holds its no-break space: it is 96px tall, so p starts at y = 8 + 96 = 104. p's own no-break space gives it one 96px line. p is 148 × 96 at (126, 104).

### 3. One gradient, one ring

`radial-gradient(1q at 25ch, …)` is a circle with a ray of 1q = 0.945px. The color stops are in px, so they don't depend on that ray: transparent up to 5pc = 80px, then `#E8AD6D 0 130px`. The `0` is pulled up to the stop before it, 80px: the color changes at once. The last `#0000` has no position, so it sits at 100% of the ray, 0.945px. A stop can't go back, so it is pulled up to 130px too. That gives a sharp orange ring, from 80 to 130px off the center, and transparent everywhere else.

The background has the default `repeat`: the gradient fills a tile the size of the element's box, and the tiles repeat in every direction.

### 4. html: a full ring

html has no `--z`, so `var(--z,69q#2F5A76)` takes its fallback: a position, 69q, and a background color, #2F5A76. html's background is painted on the whole canvas.

html keeps the default 16px font. 1ch is 8px in it, so `at 25ch` puts the center at x = 200px, and at the default 50% in height, y = 150, in a 400 × 300 tile. 69q = 65.20px moves the tile to the right: the ring is centered at (265.20, 150), from x = 135.20 to 395.20 and from y = 20 to 280.

The tile on the left has its own ring, at x = 265.20 − 400 = −134.80. It ends at x = −134.80 + 130 = −4.80, just off the canvas.

### 5. body: a half ring

body is inside html, so it gets `--z:134q`. Now `var(--z)` is only a position, 134q = 126.61px, with no color: body's background is transparent, apart from the gradient.

body's font is tiny, so `25ch` is almost 0: the center of the ring sits on the left edge of the tile. Writing `at 200px` for html and `at 0` for body and p gives the same picture in my Chrome. The tile is body's box, 384 × 284, so the center is at 50% of 284 = 142 in height, y = 8 + 142 = 150.

The tile starts at x = 8 + 126.61 = 134.61, right on the center. Only the right half of the ring is in this tile. The left half would belong to the tile on the left, but that tile draws its own ring, centered on its own left edge, x = 134.61 − 384 = −249.39. That ring ends at x = −119.39, outside body's box, so nothing shows. What is left is half a ring, from x = 134.61 to 264.61, cut by a straight line: the cut of the target.

### 6. A gap in the middle

The full ring and the half ring overlap, and between them almost everything is orange. But a point less than 80px from both centers is in both holes. Their centers are 130.58px apart, so a small blue lens is left, from x = 185.20 to 214.61 and from y = 103.77 to 196.23.

### 7. p fills the gap

p is inside body, so it also gets `134q` and no color. Its tile is its box, 148 × 96. The center of the ring sits on the tile's left edge, at y = 104 + 48 = 152.

The tiles start at x = 126 + 126.61 = 252.61, and one tile earlier, at 252.61 − 148 = 104.61. So from x = 126 to 252.61, p shows the ring of the tile that starts at 104.61, centered at (104.61, 152). At y = 152, that ring runs from x = 184.61 to 234.61, and it covers the whole lens. Right of 252.61, the next center is less than 53px away: transparent. p only adds orange where the rings left their gap, and over orange that is already there.

The tip of the lens is at y = 103.77, 0.23px above p's box. In my render, no pixel of it shows.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- One declaration for every element. html has no `--z`, so it takes the fallback: a position and the blue color. body and p get `134q`: a position, and no color. Writing the gradient twice, `…69q#2F5A76;*{background:radial-gradient(…)134q;…`, gives the same picture in 201 characters.
- The tiny font does three jobs: it hides the no-break spaces, it makes `25ch` almost 0 for body and p, and it carries the 96px line height. Without the `font` declaration (129 characters), 25,873 pixels change.
- The empty font name costs one character: the quote, closed by the end of the code. Without it (143 characters), the shorthand has no font name and is dropped: the same 25,873 pixels change.
- The leading no-break space gives body a 96px line that pushes p down. Without it (143 characters), p sits at y = 8 and 3,181 pixels change. A plain space (144 characters) does nothing: the parser drops it, body only holds p, and the same 3,181 pixels change.
- The no-break space after `<p>` gives p its height. Without it (143 characters), p is 0px tall, the lens stays blue, and 1,904 pixels change.
- `p{margin:0 118}` sets the width of p's tiles. Without it (129 characters), p is 384 wide at x = 8: its tile starts at 134.61 like body's, its ring lands 2px below body's half ring, the lens stays blue, and 1,970 pixels change.
- `1q` is 3 characters with its space, and it makes the outer edge sharp. Without it (141 characters), the gradient takes its default size: an ellipse that reaches the farthest corner of each tile. The rings turn into ellipses, the last `#0000` sits on that far ellipse, and the orange fades out slowly past 130px. 85,004 pixels change.
- `#0000` is transparent in 5 characters. With `transparent` twice (156 characters), the picture is the same.
- Short units: `5pc` is 80px and `1in` is 96px, 3 characters each. With `80px` or `96px` (145 characters), the picture is the same.
- No space before `var(` or before `#2F5A76`. With both spaces, the same picture takes 146 characters.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 1,405 pixels, with the same rule as in the golf notes. They are all on edges. body's tile starts at x = 134.61, so the column x = 134 mixes the two colors, where the target is blue. With `65px` and `127px` in place of `69q` and `134q` (146 characters), the cut lands on x = 135 and 714 pixels are left, all on curved edges. My render of the official code has 6 distinct colors, and the target has 49: the target's curved edges are smoothed more than mine. The CSS Battle judge gives the official code a 100% match.
