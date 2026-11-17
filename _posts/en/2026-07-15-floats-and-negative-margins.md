---
title: "Floats and negative margins: six tilted squares in 120 characters"
ref: 2026-07-15
permalink: /2026/07/15/floats-and-negative-margins/
description: "How six empty hr and p elements, floated with a 28px border and the margins 62 -8 -14 58, fill two rows of squares, and how p{rotate:15deg} tilts every other one, in the July 15, 2026 CSS Battle target."
target: /assets/targets/2026-07-15.png
target_url: https://cssbattle.dev/play/O6VovmgMqXY7lHLlAi5B
colors: ["#f48b26", "#f5e3b5"]
player: levito
chars: 120
score: 727.45
match: 100
code: |
  <hr><p><hr><p><hr><p><style>&{background:#F48B26;* *{float:left;margin:62-8-14 58;border:7vw solid#F5E3B5}p{rotate:15deg
---

The July 15 target shows six cream squares on an orange background, in two rows of three. Every other square is tilted, like a checkerboard. Veit Lehmann draws them with six empty tags, `<hr>` and `<p>` in turn. One rule floats them and turns each one into a 56 × 56 border. Its margins, two of them negative, cut the canvas into cells of 106 × 104. A second rule, `p{rotate:15deg}`, tilts the three p.

Use **Teaching colors** to tell the hr from the p, and to see the margin boxes.

{% include animations/2026-07-15.html lang=page.lang %}

## The code, spaced out

```css
<hr><p><hr><p><hr><p><style>
& {                                /* & at the top level is html */
  background: #F48B26;
  * * {                            /* & * *: the hr and p, not body */
    float: left;                   /* width 0, side by side */
    margin: 62-8-14 58;            /* 62, -8, -14, 58: top, right, bottom, left */
    border: 7vw solid#F5E3B5       /* 7vw = 28px */
  }
  p {
    rotate: 15deg
```

## How it works

### 1. html and body

There is no doctype: the page is in quirks mode. At the top level of the CSS, `&` means the root: html. html's background fills the whole canvas with orange.

body keeps its 8px margins. In quirks mode it fills the height of the page: getBoundingClientRect gives (8, 8), 384 × 284.

### 2. Six empty elements

`<hr>` has no closing tag. `<p>` opens a paragraph, and the next `<hr>` closes it. So body holds six empty siblings: hr, p, hr, p, hr, p. The last p never closes: the style element ends up inside it.

The rule `* *` is nested in `&`, with no `&` of its own, so it means `& * *`: any element that sits inside an element of html. That is the six hr and p, and the style element in the last p, which is not displayed. Not body, and not head: their only ancestor is html.

### 3. Squares made of borders

`float:left` makes each element shrink to its content. They have none: width 0, height 0.

`border:7vw solid#F5E3B5` sets a 28px border on every side (7% of the 400px canvas). Each element becomes a cream 56 × 56 square. The shorthand also replaces the hr's default gray inset border.

With margins at 0, the six squares would sit side by side, from x = 8 to 344, at y = 8.

### 4. Margins: a cell of 106 × 104

`margin:62-8-14 58` reads as four values: 62, -8, -14 and 58. That is top, right, bottom and left. A number with no unit counts as px in quirks mode.

The first hr moves 58px right and 62px down: its square is at (66, 70). Its margin box starts at body's corner, (8, 8). On the right, -8 makes it end 8px before the square's right edge: 58 + 56 - 8 = 106 wide. At the bottom, -14 makes it end 14px above the square's bottom: 62 + 56 - 14 = 104 tall.

### 5. The floats fill two rows

Each float goes right after the previous one's margin box. The squares are at x = 8 + 58 + 106 × n: 66, 172 and 278.

The fourth float would take x 326 to 432. body ends at 392, so it does not fit. It goes down, below the margin boxes of the first row, at y = 8 + 104 = 112. Its square is at y = 112 + 62 = 174, at x = 66. The last two follow, at x = 172 and 278.

The grid comes out centered. The squares end at x = 334 and y = 230: 66px from the left and right edges, 70px from the top and bottom. The gaps are 58 - 8 = 50px across and 62 - 14 = 48px down.

### 6. p turns 15°

`p{rotate:15deg}` turns the three p around the center of their square. A rotation does not change the layout: the other squares stay where they are. The tilted squares keep their centers, at (200, 98), (94, 202) and (306, 202). Their bounding box is 56 × (cos 15° + sin 15°) = 68.59px wide.

hr and p alternate, and three squares fit in a row. So the tilted squares are in the middle of the first row and on the sides of the second.

## Golf notes

Below, a pixel counts as changed when one of its channels moves by more than 8.

- `* *` keeps body out. A plain `*` (118 characters) also floats body, with the same margins and border: a large cream frame appears and the squares move. 35,938 pixels change. `hr,p` gives the same picture in 121 characters.
- Two tags, `<hr>` and `<p>`, let `p` select the tilted squares with no class or attribute. `<hr>` needs no closing tag, and it closes the `<p>` before it.
- `float:left` does two jobs: it shrinks the elements to width 0, and it lines them up. Without it (109 characters), each one is a block as wide as body, and the squares become wide bars. 39,726 pixels change.
- `7vw` is 28px in 3 characters. `28px` gives the same picture in 121 characters. A bare `28` (119 characters) does not work inside the `border` shorthand in my Chrome: the whole declaration is dropped, the squares disappear, and only the hr's default 1px borders are left, as dots. 19,085 pixels change.
- `62-8-14 58`: the minus signs separate the numbers, so no space is needed. `62 -8 -14 58` gives the same picture in 122 characters. With units, `62px -8px -14px 58px` takes 130.
- The two negative margins are not there for nothing: they set the gaps. `62 0-14 58`, the same length, makes the cells 114px wide: the squares move to x = 66, 180 and 294. 6,198 pixels change. `62-8 0 58` (119 characters) moves the second row down to y = 188: 5,590 pixels change.
- `rotate:15deg` is shorter than `transform:rotate(15deg)` (131 characters, same picture).
- `&` is html at the top level of the CSS. `html` takes 123 characters, for the same picture.
- Nothing is closed. Closing both rules and the style element with `}}</style>` takes 130 characters, 10 more, for the same picture.

## If you try it at home

In my local Chrome, the official code is not pixel-exact. The three straight squares match the target exactly, and the tilted ones have the same place and size. The difference is on the slanted edges of the tilted squares: the target has more fully cream pixels there (3,084 per tilted square, 3,003 in my render). 576 pixels are more than 8 off the target in one channel, up to 81, all on those edges. The CSS Battle judge gives the code a 100% match.
