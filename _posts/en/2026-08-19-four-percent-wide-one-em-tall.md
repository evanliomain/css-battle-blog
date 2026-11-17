---
title: "4% wide, 1em tall: a gateway in 132 characters"
ref: 2026-08-19
permalink: /2026/08/19/four-percent-wide-one-em-tall/
description: "How one radial gradient sized 4% wide and 1em tall makes a ring on html and a tall blue band in the body and a p, which together draw the August 19, 2026 CSS Battle target: an orange gateway."
target: /assets/targets/2026-08-19.png
target_url: https://cssbattle.dev/play/7qCzNi5UMQyeBSqmMCFG
colors: ["#284a5b", "#e38f66"]
player: h_blierzt
chars: 132
score: 713.68
match: 100
code: |
   <p> <style>*{background:radial-gradient(4%1em,#284A5B 32q,#E38F66 0 5ch,#284A5B)0-95q;*{margin:80 125;*{margin:-140-30 0}font:147q'
---

The August 19 target is an orange gateway on slate blue: two stepped pillars with an opening between them, under a thin arch. H_Bliertz's solution writes one radial gradient for every element. Its size is `4%1em`: 4% of the box width, and 1em tall. On `html`, with a 16px font, both are 16px and the gradient is a ring: the arch. In the body and a `p`, with a 138.9px font, the same gradient is stretched more than 16 times taller than wide: a blue band between two orange sides, the opening between the pillars.

Use **Teaching colors** to tell the ring, the body and the `p` apart.

{% include animations/2026-08-19.html lang=page.lang %}

## The code, spaced out

```css
&nbsp;<p>&nbsp;                         /* two real no-break spaces */
<style>
* {                                     /* html, head, body, p, style */
  background:
    radial-gradient(4% 1em,             /* 4% of the box wide, 1em tall */
      #284A5B 32q,                      /* blue up to 30.24px */
      #E38F66 0 5ch,                    /* orange up to 5ch */
      #284A5B)                          /* then blue */
    0 -95q;                             /* moved up 89.76px */
  * {                                   /* head, body, p, style */
    margin: 80 125;
    * {                                 /* p, style */
      margin: -140 -30 0;
    }
    font: 147q '                        /* 138.9px; an empty string, closed by the end of the code */
  }
}
```

## How it works

### 1. Three boxes

There is no doctype, so the page is in quirks mode, and numbers with no unit are px. The code starts with a no-break space. That is text, so the body opens right there and gets a line of text. Then come a `<p>`, a second no-break space inside it, and the `<style>`, which ends up inside the `p`.

The elements are `html`, `head`, `body`, `p` and `style`. `head` and `style` are not displayed. The outer `*` matches all of them. The nested `*` matches every element inside another one: everything but `html`. The third `*` matches elements with at least two ancestors: the `p` and the `style`. So `html` only gets the background, the body gets the background, `margin:80 125` and the font, and the `p` gets all of that, with its own margin.

### 2. A 138.9px font and two lines

`font:147q'` is a 147Q font: 147 × 0.945 = 138.9px. The `font` shorthand needs a family, and `'` opens a string that the end of the code closes: an empty family name. I checked: with `Times` in its place, the render is the same. With `font:147q` alone, the declaration is dropped and the font stays at 16px.

In my render, one line of this font is 160px tall. The body starts at y = 80, between x = 125 and 275, and its no-break space gives it a first line, from y = 80 to 240.

The `p` comes next, at y = 240. `margin:-140-30 0` lifts it by 140px, to y = 100, and widens it by 30px on each side: 150 + 60 = 210px, from x = 95 to 305. Its own no-break space gives it one 160px line: it ends at y = 260. The body ends there too: 180px tall. `html` is 80 + 180 + 80 = 340px tall.

Both spaces have to be no-break spaces. A plain space before `<p>` is dropped: the body has no line of its own, and the body and the `p` both start at y = −60. A plain space inside the `p` collapses, and the `p` is 0px tall.

### 3. On html: a ring

`html` is only matched by the outer `*`, so it keeps the default 16px font. Its gradient is `4%` wide: 4% of 400 = 16px. It is `1em` tall: 16px. So the shape is a circle of radius 16px.

Color stops can go past that radius. The gradient is blue up to `32q`, 30.24px from the center. The orange has position `0`, which is pulled up to 30.24px: a sharp edge. It lasts until `5ch`, which is 40px in this font. The last blue has no position, so it would sit at the end of the radius, 16px, but a stop can't come before the one in front of it: it moves to 40px, another sharp edge. That is a 9.76px orange ring.

The background of `html` covers the canvas, but it is placed in the box of `html`, 400 × 340. The circle is centered there, at (200, 170). `0-95q` moves it up by 95Q = 89.76px: the center lands at (200, 80.24). I checked with `-89.7638px` in place of `-95q`: the render is the same. In a render with only the background of `html`, the ring covers the rows from y = 40 to 119 at x = 200.

The height of `html` matters here: when I force it to 300px, the ring is 20px higher.

### 4. In the body: a band

The body gets the same gradient, but its font is 138.9px. Now `1em` is 138.9px tall, and `4%` is 4% of 150 = 6px wide. The shape is 138.9 / 6 = 23.1 times taller than wide.

The stops are measured along the width. The blue still goes 30.24px to the left and right of the center. Because the shape is so tall, that blue covers the whole height of the body: a band from x = 170 to 230. In a render with only the body's background, that band goes from x = 170 to 229 on every row. `5ch` is now 5 × 69.4 = 347.2px, more than any corner of the box: everything else is orange. That gives the upper step of each pillar, from x = 125 to 170 and from 230 to 275, from y = 80 to 260.

I checked: with `16px` in place of `1em`, the ring is the same, but the band changes. With `40px` in place of `5ch`, the ring is the same, but only a 10px strip of each pillar stays orange, from x = 160 to 169 on the left. With `347.225px`, the whole canvas turns orange around a small blue disc.

### 5. In the p: the same band

The `p` gets the same gradient again. 4% of 210 is 8.4px, and 1em is 138.9px: 16.5 times taller than wide. The stops are lengths, not percentages, so the blue still stops 30.24px from the center. The `p` is centered on x = 200 like the body, so its band covers the same x = 170 to 230. Its orange sides go from x = 95 to 170 and from 230 to 305, from y = 100 to 260: the lower step of each pillar.

### 6. The stack

The `p` is painted over the body, and the body over the canvas. The body starts at y = 80, a quarter of a pixel above the center of the ring: it hides the bottom half. Below y = 80, the legs of the ring fall on the orange sides, and the inside of the ring falls on the blue band. Above the body, the top half of the ring is left: the arch, from x = 160 to 240.

## Golf notes

- One gradient, written once, draws the ring and both steps. `4%` follows the width of each box and `1em` its font, so the same `4%1em` is a circle on `html` and a tall band in the body and the `p`.
- `5ch` ends the ring at 40px on `html`, and goes past every corner in the body and the `p`.
- `32q` is 30.24px in 3 characters: the inner radius of the ring and the half-width of the opening.
- `#E38F66 0` and a last stop with no position give two sharp edges without writing their positions twice.
- The two no-break spaces give the body and the `p` a line each. The font sets the line to 160px: no `height` needed.
- `font:147q'` sets the font with the shortest family there is: an empty string, closed by the end of the code.
- No space in `4%1em` or `0-95q`, and the minus signs separate `-140-30 0`.
- Quirks mode reads `80 125` and `-140-30 0` as px.
- `<style>`, two of the three braces and the string are never closed.

## If you try it at home

In my Chrome (version 157 when this was written), the official code does not give exactly the target. 207 pixels differ, all on the ring, between x = 160 and 239 and y = 40 and 78. On the top edge, the row y = 40 is (180, 126, 99) in my render, a mix of orange and blue, and plain orange in the target. The row y = 50 is (87, 91, 94) in my render and plain blue in the target. The largest difference is 187 levels, at (193, 40). The pillars and the opening are on the same pixels as in the target. On the CSS Battle judge, the code is a 100% match.
