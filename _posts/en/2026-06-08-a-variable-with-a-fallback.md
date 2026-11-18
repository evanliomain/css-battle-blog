---
title: "A variable with a fallback: a person icon in 177 characters"
ref: 2026-06-08
permalink: /2026/06/08/a-variable-with-a-fallback/
description: "How one box-shadow and a var() fallback give html and body two different shadow lists, and how a circle 9251px in radius draws the straight top of the shoulders, in the June 8, 2026 CSS Battle target."
target: /assets/targets/2026-06-08.png
target_url: https://cssbattle.dev/play/YiaYScDEe5xpSMH4Ml0V
colors: ["#2d3464", "#fff", "#8fc5ef"]
player: h_blierzt
chars: 177
score: 674.03
match: 100
code: |
  <style>*{margin:83%165-152;color:8FC5EF;box-shadow:0-9lh#2D3464,var(--s,0-2in 0 5vh,0-272q)0 37q#FFF,0-55ch 0 3in;*{border-radius:1in;margin:-160 0 210;--s:0-9914q 0 96in,0-39vh
---

The June 8 target is a person icon on sky blue: a round dark blue head, white shoulders and arms with a round neckline, and a dark blue torso. H_Bliertz draws it with shadows only, on two boxes that have no background: html, below the canvas, and body, a circle. Both get the same `box-shadow`, but a CSS variable with a fallback gives them two different shadow lists.

Use **Wide view** to see html below the canvas, and **Teaching colors** to tell the shadows apart.

{% include animations/2026-06-08.html lang=page.lang %}

## The code, spaced out

```css
<style>
* {                                  /* html, head, style, body */
  margin: 83%165-152;                /* 332 at the top, 165 on the sides, −152 at the bottom */
  color: 8FC5EF;                     /* no #: quirks mode reads it as #8FC5EF */
  box-shadow:
    0-9lh#2D3464,                    /* up 162px, dark blue */
    var(--s, 0-2in 0 5vh, 0-272q)    /* no --s on html: the fallback, two shadows */
    0 37q#FFF,                       /* spread 34.96px, white: ends the shadow before it */
    0-55ch 0 3in;                    /* up 440px, spread 288px, sky blue */
  * {                                /* head, style, body */
    border-radius: 1in;              /* 96px: body is a circle */
    margin: -160 0 210;
    --s: 0-9914q 0 96in, 0-39vh;     /* body's two shadows, in place of the fallback */
```

## How it works

### 1. The elements

CSS Battle pages have no doctype, so they are in quirks mode, and a bare number like `165` in a margin is read in px.

The page has html, head, style and body. The parser adds an empty body at the end. `*` matches all four, and head and style are not displayed. `*{*{…}}` is a nested rule: `* *`, every element inside another one, so head, style and body. Both rules have the same specificity, and the nested one comes later: its margin wins on body.

### 2. Two boxes

html gets `margin:83%165-152`. A margin in % is a share of the parent's width, even at the top: 83% of 400 = 332. It is 400 − 2 × 165 = 70 wide. In quirks mode, html stretches to the canvas height minus its margins: 300 − 332 + 152 = 120. I measured it: 70 × 120 at (165, 332), all below the canvas.

body gets `margin:-160 0 210`. In quirks mode, it stretches to html's height minus its own margins: 120 + 160 − 210 = 70. It starts at 332 − 160 = 172. I measured it: 70 × 70 at (165, 172). `border-radius:1in` is 96px, more than half of 70: the corners are scaled down and body is a circle.

Neither box has a background. Everything you see is a shadow.

### 3. One list, two versions

The `box-shadow` is in the `*` rule, so html and body both get it. In the middle sits `var(--s,0-2in 0 5vh,0-272q)`. The fallback of a `var()` is everything after its first comma, commas included.

html has no `--s`, so it gets the fallback. body defines `--s:0-9914q 0 96in,0-39vh`, so it gets that. The text around the `var()` is shared: `0-9lh#2D3464` before it, `0 37q#FFF` and `0-55ch 0 3in` after it. `0 37q#FFF` has no comma in front: it finishes the last shadow of the `var()`. The two lists, with the units converted (rounded) and the first shadow on top:

| | html | body |
| --- | --- | --- |
| 1 | `0 -162px #2D3464` | `0 -162px #2D3464` |
| 2 | `0 -192px 0 15px` | `0 -9367.56px 0 9216px` |
| 3 | `0 -257.008px 0 34.96px #FFF` | `0 -117px 0 34.96px #FFF` |
| 4 | `0 -440px 0 288px` | `0 -440px 0 288px` |

The units: 1lh is the line height, 18px in my Chrome, so 9lh = 162px. 1in = 96px, so 2in = 192px, 3in = 288px and 96in = 9216px. 1vh is 1% of 300, so 5vh = 15px and 39vh = 117px. 1ch is 8px in the default font, so 55ch = 440px. 1Q is a quarter of a millimeter, 0.945px: 272Q = 257.008px, 37Q = 34.96px and 9914Q = 9367.56px.

`color:8FC5EF` has no `#`, but quirks mode still reads it as a color. A shadow with no color takes the text color: shadows 2 and 4 are sky blue, on both boxes.

### 4. html's shadows

From the bottom up:

- Shadow 4 moves html up 440px, to y −108 to 12, then spreads it by 288px: x −123 to 523, y −396 to 300. It covers the whole canvas in sky blue. That is the background.
- Shadow 3 moves html up 257px and spreads it by 34.96px: x 130 to 270, y 40 to 230, white.
- Shadow 2 moves html up 192px and spreads it by 15px: x 150 to 250, from y 125 down, sky blue. It cuts the white block into two arms.
- Shadow 1 moves html up 162px with no spread: 70 × 120 at (165, 170), dark blue. The torso.

In my render, the arms end at y = 230 and the torso runs from y = 170 to 290.

### 5. body's shadows

body is inside html, so it is painted after it: all its shadows are on top of html's. A shadow follows the box's rounded corners, and the spread makes the corners bigger by the same amount.

- Shadow 1 moves the round body up 162px: a 70px disc at (165, 10). The head.
- Shadow 3 moves body up 117px, to y 55 to 125, and spreads it by 34.96px: a square of 139.92px with corners of 96 + 34.96 = 130.96px. They are scaled down to half the side, so it is a white circle of radius 69.96 around (200, 90). Its bottom, at y = 159.96, is the curve of the neckline. It covers the top of the cut: the sky between the arms now starts below that curve.
- Shadow 4 moves body up 440px and spreads it by 288px: a circle of radius 323 around (200, −233), sky blue. Its bottom is at y = 90, and on the canvas it stays under shadow 2.

### 6. The giant circle

body's shadow 2 moves it up 9367.56px, to y −9195.56 to −9125.56, and spreads it by 9216px. That gives a square of 70 + 2 × 9216 = 18,502px, from y −18,411.56 down to y = 90.44. Its corners are 96 + 9216 = 9312px. Two of them on one side would need 18,624px, more than the side, so they are scaled down to 9251px, half the side. The square is a circle of radius 9251, around (200, −9160.56).

Its bottom is at y = 90.44. The shoulders are 140px wide. At their ends, 70px from the middle, the edge is only 70² / (2 × 9251) = 0.26px higher. For the eye, it is a straight line.

That sky blue circle covers everything above it: the top of the white block, from y = 40, and the top half of the white disc. What is left is white shoulders with a straight top at y ≈ 90 and a round neckline below. Only the head, shadow 1, is above it.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8, compared with my render of the official code.

- The `var()` with a fallback writes one `box-shadow` for two lists. Written out for each box, `box-shadow:0-9lh#2D3464,0-2in 0 5vh,0-272q 0 37q#FFF,0-55ch 0 3in` in the outer rule and `box-shadow:0-9lh#2D3464,0-9914q 0 96in,0-39vh 0 37q#FFF,0-55ch 0 3in` in the nested one, the code is 212 characters, with the same picture. Even without body's shadow 4, hidden on the canvas, it is 199 characters.
- `0 37q#FFF` is written once, after the `var()`: it finishes the white shadow of both lists.
- `color:8FC5EF` sets the color once for the three shadows written with no color. With `#8FC5EF` in each of them and no `color`, the code is 185 characters, with the same picture. Without `color` at all (164 characters), those shadows are black: 96,415 pixels change.
- In quirks mode, `color` takes a hex color without its `#`. `color:#8FC5EF` gives the same picture in 178 characters.
- `83%165` is 332px with no space needed: after `%` a new number starts. `332 165-152` gives the same picture in 178 characters.
- Each unit is shorter than the same length in px, with the same picture: `9lh` for `162px` (179 characters), `2in`, `3in` and `96in` for `192px`, `288px` and `9216px` (179 characters each), `1in` for `96px` (178), `55ch` for `440px` (178), `39vh` for `117px` (178), `5vh` for `15px` (178), `272q` for `257px` (178).
- `37q` is 34.96px, just under 35. `35px` is one character more and moves the edges of the two white shapes by 0.04px: 35 pixels change.
- `box-shadow` does not take a bare number, even in quirks mode. With `15` in place of `5vh` (176 characters), html's whole `box-shadow` is dropped. Only body's shadows are left: the head, the giant circle, and the white disc on the white canvas. 72,455 pixels change.
- `border-radius:1in` makes the round shapes. Without it (159 characters), the head and the disc are squares: 1,999 pixels change. `50%` has the same length and gives the same picture.
- No space before a minus sign or a `#`: `0-9lh#2D3464`, `0-55ch`.
- The closing braces and tags are left out. The end of the code closes them.

## If you try it at home

In my Chrome, my render of the official code differs from the target on 399 pixels, with the same rule as in the golf notes, by up to 118. 197 are on the edge of the head, 89 along the curve of the neckline, 2 at the bottom corners of the arms, and 111 on the top edge of the shoulders. In the target, that edge is sharp: row 89 is all sky blue and row 90 all white. In my render, row 90 mixes white and sky blue, most in the middle, where it is (199, 226, 247), halfway between the two. On row 89, x 254 to 269 are a little lighter. The CSS Battle judge gives the code a 100% match.
