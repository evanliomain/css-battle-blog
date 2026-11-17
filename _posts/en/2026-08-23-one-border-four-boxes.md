---
title: "One border, four boxes: a briefcase in 155 characters"
ref: 2026-08-23
permalink: /2026/08/23/one-border-four-boxes/
description: "How one 20px black border, given to html, the body, a dt and an h1 with an orange text color, draws the outline, the handle and the cut bar of the August 23, 2026 CSS Battle target."
target: /assets/targets/2026-08-23.png
target_url: https://cssbattle.dev/play/JnFr5t4kizJ7EFZtXnVL
colors: ["#f3ac3c"]
player: koda_pig
chars: 155
score: 691.3
match: 100
code: |
  <dt><h1> <style>*{border:5vw solid;margin:75 90;+*{background:#F3AC3C;border-radius:5vw;margin:-50 40 110;*{margin:75-80-150;*{color:F3AC3C;margin:-40 30 8
---

The August 23 target is a briefcase: a thick black outline on an orange background, with a rounded handle on top and a bar cut in three in the middle. koda_pig draws it with four nested boxes. `*` gives all of them the same 20px black border, and margins move each one into place. The last box gets an orange text color, so its border turns orange and cuts two gaps in the bar.

Use **Teaching colors** to see which box draws which part: in the real colors, several borders lie exactly on top of each other.

{% include animations/2026-08-23.html lang=page.lang %}

## The code, spaced out

```css
<dt><h1> <style>            /* body > dt > h1; the h1 holds a no-break space */
* {                         /* html, head, body, dt, h1, style */
  border: 5vw solid;        /* 20px, in the text color: black */
  margin: 75 90;            /* no unit: px in quirks mode */
  + * {                     /* * + *: the body, right after head */
    background: #F3AC3C;    /* used for the whole canvas */
    border-radius: 5vw;     /* 20px */
    margin: -50 40 110;
    * {                     /* dt and h1 */
      margin: 75 -80 -150;
      * {                   /* h1 */
        color: F3AC3C;      /* no #: read anyway in quirks mode */
        margin: -40 30 8;
      }
    }
  }
}
```

## How it works

### 1. One border for everyone

There is no doctype, so the page is in quirks mode. The HTML gives `body > dt > h1`, and the `<style>` ends up inside the `h1`.

`*` matches every element. 5vw is 5% of the 400px frame: 20px. `solid` comes with no color, so the border takes the text color, black by default. The margins have no unit: quirks mode reads them as px. `head` and `style` are not displayed, so four boxes are left: `html`, `body`, `dt` and `h1`.

### 2. html: the outline

In quirks mode, `html` stretches to fill the frame, minus its margins: 300 − 2 × 75 = 150px tall, 400 − 2 × 90 = 220px wide. It goes from (90, 75) to (310, 225), and its 20px border is the outline of the briefcase. Its content box is 180 × 110, from (110, 95).

`html` has no background, so the browser uses the body's background for the whole canvas. That is where the orange comes from. I checked with `html{background:red}` added: the canvas turns red, and the body then paints its own orange box.

### 3. body: the handle

`+*` nested in `*` reads as `* + *`: an element right after another element. Only the `body` is in that case, right after `head`.

In quirks mode, the body also stretches: its margin box fills the content box of `html`, 110px tall. With margins of −50 on top and 110 at the bottom, the body is 110 + 50 − 110 = 50px tall. It is 180 − 2 × 40 = 100px wide. So it goes from (150, 45) to (250, 95).

`border-radius:5vw` rounds its outer corners by 20px. The inner corners stay square: the radius is no bigger than the 20px border. The bottom border, from y = 75 to 95, lies exactly on the top border of `html`. What shows is the handle, with a 60 × 10 opening from (170, 65) to (230, 75). The opening is orange: the body's background went to the canvas, and its own box paints nothing.

### 4. dt: the middle bar

The next nested `*` matches what is inside the body: the `dt`, the `h1` (and the hidden `style`).

The dt starts in the body's content box: 60px wide, at x = 170 and y = 65. `margin:75-80-150` moves it 75px down, so its top border starts at y = 140. The −80px side margins widen it: 60 + 2 × 80 = 220px, from x = 90 to 310, just like `html`. It is 85px tall (the h1 sets that, see below), so it ends at y = 225. Its left, right and bottom borders all land on the border of `html`. Only its top border shows: the bar, from y = 140 to 160.

The −150 is about height. The body has only 10px of content height. The dt's margin box is 75 + 85 − 150 = 10px, so it fits. I checked with `margin:75-80`, where the bottom margin is 75 too: the body grows to 275px, `html` to 375px, and the drawing breaks.

### 5. h1: a line with nothing to see

The h1 holds one character: a no-break space, right after `<h1>`. HTML does not treat it as white space, so the h1 gets a line. The h1's font is 32px, and its normal line height is 37px in my Chrome. With its two borders, the h1 is 77px tall.

I checked with a plain space instead: the h1 has no line, it is only 40px tall, and the dt shrinks to 48px. A letter would give a line too, but it would show. The h1's content box starts at y = 140, right on the bar, and the text is orange. With an `x`, the top of the letter shows in orange on the bar.

`margin:-40 30 8` places the h1 in the dt's content box, which starts at (110, 160) and is 180px wide. The h1 goes from x = 140 to 260 and from y = 120 to 197. Its margin box is −40 + 77 + 8 = 45px tall. That is the dt's content height, so the dt is 45 + 40 = 85px tall.

### 6. color:F3AC3C: two gaps

The value has no `#`. In quirks mode, Chrome still reads it as a hex color for `color`: the h1's computed color is rgb(243, 172, 60), the orange of the background. The border has no color of its own, so it turns orange too.

The h1's top border (y = 120 to 140) and bottom border (y = 177 to 197) are on the orange inside: they do not show. Its left and right borders, from x = 140 to 160 and from 240 to 260, run from y = 120 to 197 and cross the bar. The h1 is painted after the dt, so they cut the bar in three: black from the left side to x = 140, from 160 to 240, and from 260 to the right side. Without the `color` declaration, the h1's border stays black and draws a black frame over the middle of the briefcase.

## Golf notes

- One `border` declaration for four boxes. Only the h1's border changes color, through `color`.
- Quirks mode does a lot of the work: unitless margins, `html` and `body` heights that fill the space, and a hex color with no `#`.
- `+*` inside `*` reaches the body without naming it, and the nested `*` reach the dt and the h1.
- `margin:75-80-150` needs no space before a minus sign.
- `background` is set only on the body. It still covers the whole canvas, because `html` has none.
- The no-break space is one character. It gives the h1 a 37px line without painting anything.
- `<dt>`, `<h1>`, `<style>` and the four braces are never closed.

## If you try it at home

In my Chrome (version 157 when this was written), the outline, the handle and the bar land exactly where the target has them. Only the anti-aliasing of the handle's two rounded top corners differs: 70 pixels differ from the target, all on these two corners, between y = 45 and 64. In my render, the two corners are almost mirror images. In the target, the left corner is a little darker than the right one. On the CSS Battle judge, the code is a 100% match.
