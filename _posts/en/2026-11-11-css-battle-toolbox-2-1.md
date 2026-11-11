---
title: "CSS Battle Toolbox 2.1: edit your clip-path right on the output"
layout: article
kicker: CSS Battle Toolbox
ref: toolbox-2-1
permalink: /2026/11/11/css-battle-toolbox-2-1/
description: "CSS Battle Toolbox 2.1 brings a clip-path editor into the battle page: drag the points of your shape on the output, add and remove them, start from a ready-made shape, and the code follows."
cover: /assets/toolbox/2.1/cover.webp
---

Writing a `clip-path` by hand is slow. You guess the coordinates, type them, look at the render, and start again. [Clippy](https://bennettfeely.com/clippy/) helps, but it lives in another tab, on a box that is not yours.

[CSS Battle Toolbox](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin) 2.1 brings that editor into the battle page, right on your element.

## The points, on your element

Put the caret in a `clip-path` value. The points of the shape show up over the element in the output, and you drag them with the mouse. The code follows as you drag.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.1/polygon.webp' | relative_url }}" alt="The editor with a polygon() of 12 points on the left, and the output on the right: the light green firefly with a white handle on each point and a yellow one in the middle of each side" width="1440" height="720" loading="lazy">
  <figcaption>The <a href="https://cssbattle.dev/play/192">Abstract Firefly</a> target, as a polygon(): one white handle per point.</figcaption>
</figure>

The tool finds the element from the rule the caret is in, nested rules included, or from its `style` attribute. It draws on the right box: `border-box` by default, or `padding-box`, `content-box` and `margin-box` when the value says so. It follows the element's own `rotate`, `scale`, `translate` and `transform`.

Only the numbers you move are rewritten, the rest of the code stays as you wrote it:

- **The unit stays.** A value in `px` stays in `px`, a value in `%` stays in `%`. `em`, `rem`, `vw` and the others work too.
- **Golfed code stays valid.** `polygon(50%0,100%100%,0 100%)` stays glued, and a space only comes in where two numbers would stick together.
- **Whole numbers.** Hold <kbd>Shift</kbd> to move by tenths.
- **One undo per drag.** <kbd>Ctrl</kbd> <kbd>Z</kbd> (<kbd>⌘</kbd> <kbd>Z</kbd> on a Mac) takes back the whole drag, not each pixel of it.

## Add and remove points

The small yellow handles sit in the middle of each side. Drag one, and a new point is born there, already following the mouse.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.1/add-point.webp' | relative_url }}" alt="The same firefly, with a new point pulled up from the middle of the left wing's top side; the code shows the new pair 115px 52px between the first two points" width="1440" height="720" loading="lazy">
  <figcaption>Pulled from the middle of a side, the point 115px 52px goes in the code at its place.</figcaption>
</figure>

To remove a point, press it twice quickly. A polygon always keeps 3 points.

## Every shape, but path()

The tool handles every basic shape cssbattle allows. `path()` is left out, since cssbattle does not accept it.

| Shape | What you drag |
|---|---|
| `polygon()` | each point, and the middle of each side to add one |
| `circle()` | the center and the radius |
| `ellipse()` | the center and each radius |
| `inset()` | each side |
| `rect()` | each side, measured from the top and the left |
| `xywh()` | the top left corner and the bottom right one |
| `shape()` | the start, the end of each command, and the control points of the curves |

Center keywords like `center` or `left` become numbers once you drag them. A value in `calc()` stays as it is: its handle only moves along the other axis, or is greyed out when it can move along neither. An empty `rect()` or `xywh()` starts from the whole box, and gets its 4 values on the first drag.

## shape(): pick the kind of point

A `shape()` is not a polygon: its segments can be lines, curves or arcs. So when the caret is in a `shape()`, a "New point" row shows up below the output. Pick the command the new point comes with: `line`, `hline`, `vline`, `curve` with 1 or 2 control points, `smooth` or `arc`.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.1/shape-curve.webp' | relative_url }}" alt="The UFO target rebuilt with two shape(): the hull's bottom side is pulled down with curve picked in the New point row, and the code shows the new curve to 200px 243px with 265px 213px" width="1440" height="780" loading="lazy">
  <figcaption>The <a href="https://cssbattle.dev/play/223">UFO</a> target: with <code>curve</code> picked, the bottom of the hull becomes a curve. Its control point is then yours to drag.</figcaption>
</figure>

The new command takes the `to` or `by` of the segment it cuts. A curve cut by a curve still draws the same, split into 2 halves. And when you move, add or remove a point, the next relative command (`line by…`) is rewritten so the rest of the path stays where it was.

## Ready-made shapes

An empty `clip-path` gets you started. Below the output, the bar offers ready-made shapes, a row each:

- polygons: triangle, trapezoid, parallelogram, rhombus, pentagon to octagon, star, cross, arrow;
- circle, ellipse, `rect()`, `inset()` and `xywh()`;
- shapes only `shape()` draws: heart, leaf, drop, shield, arch, moon, ticket, wave and cloud. Each one uses other commands, to start from something close to what you need.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.1/presets.webp' | relative_url }}" alt="The output under an empty clip-path, and the bar below it: Pick a shape, then a row of polygons, a row of circle, ellipse and boxes, and a row of shape() presets from the heart to the cloud" width="630" height="660" loading="lazy">
</figure>

A click writes the shape and puts the caret in it, so its points show up at once. If a shape is already there, it is replaced, and the reference box you wrote stays.

## Good to know

- The transforms of the element's parents are not taken into account.
- A pseudo-element (`::before`, `::after`) has no box the tool can measure: its shape is drawn on the whole output, and the bar says so.
- Don't want the tool? Uncheck "Clip-path editor" in the options.

## Get it

The update is on the [Chrome Web Store](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin), and Chrome installs it by itself. The code and the full changelog are on [GitHub](https://github.com/evanliomain/css-battle-toolbox). A bug or an idea? Open an issue there.
