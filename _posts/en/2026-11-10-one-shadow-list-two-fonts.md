---
title: "One shadow list, two fonts: a stack of bars in 149 characters"
lang: en
ref: 2026-11-10
permalink: /2026/11/10/one-shadow-list-two-fonts/
description: "How one shadow list, shared by two transparent boxes with different fonts, draws the November 10, 2026 CSS Battle target: four bars and a pill on ochre."
target: /assets/targets/2026-11-10.png
target_url: https://cssbattle.dev/play/im5bpfWBaCfsHz3ynGXj
colors: ["#373737", "#fff", "#a85"]
player: emohdaziz
chars: 149
score: 696.67
match: 100
code: |
  <style>*{border-radius:1in;color:373737;margin:195 0 75 140;box-shadow:5vw -5ch,5ch -5em#fff,64Q -30vw,2lh 0 0 4in#a85;*{margin:0 90-46%140;font:5cm"
---

The November 10 target is ochre, with four stacked bars, round on the left and cut square on the right, dark and white in turn, and a dark pill on their right. Mohamed Ali's solution writes no background at all. One rule on `*` gives the same shadow list to `html` and to the `body`, and the `body`'s huge font sends some of its shadows away and turns another one into a cover that cuts the bars.

Use **Teaching colors** to see the `body`'s cover, and **Wide view** to see the bars go past the canvas.

{% include animations/2026-11-10.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html first, then the body */
  border-radius: 1in;                /* too big: scaled down to 15, round ends */
  color: 373737;                     /* no #: quirks mode; colors the shadows */
  margin: 195 0 75 140;              /* html: 260 × 30 at (140, 195) */
  box-shadow:
    5vw -5ch,                        /* dark bar */
    5ch -5em #fff,                   /* white bar */
    64Q -30vw,                       /* dark bar; the pill on the body */
    2lh 0 0 4in #a85;                /* the background; a cover on the body */
  * {                                /* the body */
    margin: 0 90 -46% 140;           /* 30 × 149.6 at (280, 195) */
    font: 5cm "";                    /* 189px: em, ch and lh grow */
  }
}
```

## How it works

### 1. html: a hole

`*` matches every element, `html` included. `margin:195 0 75 140` puts `html` from x = 140 to 400. In quirks mode `html` fills the height left by its margins: 300 − 195 − 75 = 30, from y = 195 to 225.

`border-radius:1in` asks for 96px, but a radius can't be more than half the side: Chrome scales it down to 15, so the ends are round. `html` has no background, and the `body` doesn't either, so the canvas stays white.

### 2. A giant shadow: the background

The last shadow in the list, `2lh 0 0 4in#a85`, has a 384px spread (`4in`). It is moved 36px right (`2lh`, two 18px lines), but with that spread it still covers the whole canvas in ochre: that is the background.

A shadow is never painted under the box that casts it. So `html`'s own box, 260 × 30 with round ends, keeps the white of the canvas: it is the bottom white bar.

### 3. Three shadows: three bars

The shadows with no color use the text color: `color:373737`, a hex with no `#` that quirks mode accepts. With `html`'s 16px font, `1ch` is 8px and `1em` is 16px:

- `5vw -5ch` is 20 right and 40 up: a dark bar from x = 160, at y = 155.
- `5ch -5em#fff` is 40 right and 80 up: a white bar from x = 180, at y = 115.
- `64Q -30vw` is 60.47 right and 120 up: a dark bar from x = 200.5, at y = 75.

Each copy has `html`'s shape, so the round end is on the left. On the right, they all go past the canvas, up to x = 460.5.

### 4. The body: same list, big font

The nested `*` matches the `body`. It gets everything the outer `*` gave: the radius, the color and the shadow list. Its own `margin:0 90-46%140` replaces the margin. The `body` goes from x = 280 to 310. `-46%` is a percentage of `html`'s width, 260: −119.6 at the bottom, which stretches it, in quirks mode, from y = 195 to 344.6.

`font:5cm"` gives the `body` a 189px font. The `"` is never closed: the font family is an empty string up to the end of the code. Now `5vw -5ch` is (20, −472.4) and `5ch -5em` is (472.4, −945): both copies leave the canvas.

### 5. A background-colored cover

The `body`'s last shadow is `2lh 0 0 4in` too, but its line is now 217px tall, so `2lh` is 434px. The shadow starts at x = 280 + 434 − 384 = 330 and covers everything to its right, from far above to far below the canvas.

The `body` is painted after `html`, shadows included. This ochre cover hides the right end of the four bars, all at x = 330: the square cut.

### 6. The pill

`64Q -30vw` doesn't depend on the font. On the `body`, it gives a copy 60.47 right and 120 up: from x = 340.5 to 370.5 and from y = 75 to 224.6, with the `body`'s round ends. It comes before the cover in the list, so it is painted on top of it: the dark pill.

## Golf notes

- No `background` anywhere: the white is the canvas seen through `html`'s box, and the ochre is a shadow.
- One shadow list on `*` for two boxes. Units in `em`, `ch` and `lh` follow the font, `vw` and `Q` don't: the font size picks which copies stay on screen.
- The same shadow is the background on `html` and a cover on the `body`: `2lh` is 36px on one and 434px on the other.
- `color:373737` colors three shadows with no `#`.
- `1in` is a short "very big radius": both boxes get round ends.
- No closing braces, and the code stops right on the open `"`. I checked that a line break after that `"` drops the whole `font` declaration, and the render no longer matches.
