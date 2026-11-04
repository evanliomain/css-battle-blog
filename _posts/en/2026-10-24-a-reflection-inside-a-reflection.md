---
title: "A reflection inside a reflection: a frame and four pills in 158 characters"
lang: en
ref: 2026-10-24
permalink: /2026/10/24/a-reflection-inside-a-reflection/
description: "How html's border, a zero-width body and a p placed off the canvas, mirrored twice by -webkit-box-reflect, draw the October 24, 2026 CSS Battle target."
target: /assets/targets/2026-10-24.png
target_url: https://cssbattle.dev/play/aX2gsaI5uRiBiKxXgfOp
colors: ["#ddbd", "#5065ab"]
player: levito
chars: 158
score: 688.73
match: 100
code: |
  <p>   <style>*{margin:25%60;border:2.5ch solid#DDBD;border-radius:9q;background:#5065AB;p{margin:50 70}*{margin:-50 280;-webkit-box-reflect:left 80vw;font:9q'
---

The October 24 target is a beige frame with rounded corners on a lavender-blue background, with two small pills inside it and two tall pills outside. Veit Lehmann draws the frame with the border of `html`, and only two of the four pills exist as boxes: one of them is even off the canvas. Two `-webkit-box-reflect` mirrors, one inside the other, bring them all into place.

{% include animations/2026-10-24.html lang=page.lang %}

## The code, spaced out

```css
<p>   <style>
* {                          /* html (and all the rest) */
  margin: 25% 60;
  border: 2.5ch solid #DDBD;
  border-radius: 9q;
  background: #5065AB;
  p { margin: 50 70 }        /* the p: more specific than * */
  * {                        /* body, p (head and style stay hidden) */
    margin: -50 280;
    -webkit-box-reflect: left 80vw;
    font: 9q '';             /* the string closes at the end of the file */
  }
}
```

## How it works

### 1. html is the frame

The outer `*` matches `html`. Its blue background goes to the canvas. `margin:25%60` gives 100px at the top and bottom (a percentage margin is a share of the width: 25% of 400) and 60px on the sides.

CSS Battle runs in quirks mode, where `html` fills the page minus its margins: a 280 × 100 box at (60, 100). Its border is `2.5ch`, and `1ch` is 8px in the default 16px font, so 20px. That border is the frame.

The radius `9q` is 8.5px (1q is a quarter of a millimetre, 0.945px). The border is thicker than the radius, so the inner corners stay square, like in the target.

### 2. A see-through beige

`#DDBD` is `#DDDDBB` with an alpha of `DD`, about 87%. Every border in this solution is painted over blue: the canvas behind `html`'s border, and each box's own blue background behind the others (a background runs under the border by default). 87% of that beige over `#5065AB` gives about `#cacdb9`, the target's beige. The 4-digit color is 3 characters shorter than the opaque one.

### 3. body is the tall right pill

The nested `*` matches every element inside `html`: `body`, the `p`, and the hidden `head` and `style`. For `body`:

- `margin:-50 280`: `html`'s content box is 240px wide, and 280 + 280 is more than that. The width drops to 0, and the body starts 280px in, at x = 360.
- `font:9q'` sets the font to 9q, about 8.5px. `2.5ch` follows the font, so the border is now 10px. With no content width, the left and right borders touch: a box 20px wide.
- In quirks mode, the body fills `html`'s 60px content height minus its margins: 60 + 50 + 50 = 160px, from y = 70 to y = 230.

That is the tall pill on the right.

### 4. The p sits off the canvas

The `<p>` comes first in the markup, so it lives in `body`. `p{margin:50 70}` is nested in `*`, so it reads as `* p`, which is more specific than `* *`: its margins win. 70px to the right of the body's content puts it at x = 440, outside the 400px canvas. It is 20px wide like the body, and 40px tall on the CSS Battle judge.

### 5. The p's reflection is the left small pill

`-webkit-box-reflect:left 80vw` draws a mirror copy of a box on its left, with a gap of 80vw (320px). The mirror line sits halfway into that gap.

For the `p`, at x = 440, the mirror line is at 440 − 160 = 280. Its reflection lands at x = 100 to 120: the small pill on the left, inside the frame.

### 6. The body's reflection copies everything else

The `body` has the same reflection. Its mirror line is at 360 − 160 = 200, the middle of the canvas. A reflection copies the box and everything painted inside it, so:

| What | Where it is | Where its copy lands |
| --- | --- | --- |
| `body` | x = 360 | x = 20: tall left pill |
| `p` | x = 440 | x = −60: off the canvas |
| the p's reflection | x = 100 | x = 280: small right pill |

So the small right pill is a reflection of a reflection.

## Golf notes

- `#DDBD` over its own blue background replaces a 7-character opaque color.
- `2.5ch` is 20px on `html` and 10px under `font:9q'`: one border value, two thicknesses.
- A box with no width and a 10px border on each side is a 20px pill, with no `width` at all.
- One reflection value on `*` serves both the `body` and the `p`.
- `font:9q'` opens a string and never closes it: at the end of the file, the browser closes it for free. It has to be the very last thing in the code.
- `25%60` and `solid#DDBD` need no space.

## If you try it at home

CSS Battle scores solutions in its own, older Chrome. In the latest Chrome (version 156 when this was written), the `<p>` has no content height: it only holds three spaces, which collapse, and the hidden `<style>`. So it is 20px tall, just its two borders, and the two small pills come out as 20 × 20 squares with rounded corners instead of 20 × 40 pills. On the CSS Battle judge, the pills are 40px tall and the match is 100%. The animation above follows the target.

Also, if you save the code in a file, don't add a line break at the end. The `'` string would then contain it, a string can't hold a line break, and the whole `font` declaration is dropped: the borders stay 20px everywhere.
