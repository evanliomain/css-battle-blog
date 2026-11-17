---
title: "CSS Battle Toolbox 2.2: edit your border-shape, a color per point"
layout: article
kicker: CSS Battle Toolbox
ref: toolbox-2-2
permalink: /2026/11/17/css-battle-toolbox-2-2/
description: "CSS Battle Toolbox 2.2 brings the clip-path editor to border-shape, the new property cssbattle now accepts: drag the points of one or two shapes right on the output. And each point now has its own color, its numbers in the code too."
cover: /assets/toolbox/2.2/cover.webp
---

cssbattle now accepts `border-shape`. It looks a lot like `clip-path`: the same basic shapes, the same coordinates to guess. But the border no longer follows the box. It follows your shape.

[CSS Battle Toolbox](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin) 2.2 brings the [clip-path editor of 2.1]({{ '/2026/11/11/css-battle-toolbox-2-1/' | relative_url }}) to `border-shape`. And to tell the points apart, each one now has its own color.

## One shape: the border along a path

Put the caret in a `border-shape` value. With a single shape, the border is drawn along it, and its width is centered on the line. So the points sit halfway through the border, on the `half-border-box`.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.2/stroke.webp' | relative_url }}" alt="The editor with a border-shape: polygon() of 10 points on the left, each pair of numbers on its own colored background, and the output on the right: a yellow star outline with a colored handle on each point, halfway through the border" width="1440" height="780" loading="lazy">
  <figcaption>A star drawn by a 14px border. Each point has its color, and its numbers in the code take the same.</figcaption>
</figure>

Everything you know from the `clip-path` editor works the same: drag a point, pull a new one from the middle of a side, remove one with a double press, start from a ready-made shape. Only the numbers you move are rewritten, the unit stays, and golfed code stays golfed.

## Two shapes: the outer edge and the inner edge

With two shapes, the border fills the space between them. The first one is the outer edge, drawn on the `border-box`. The second one is the inner edge, drawn on the `padding-box`. A box written after a shape replaces its default one, `half-border-box` included.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.2/two-shapes.webp' | relative_url }}" alt="The editor with border-shape: circle(50%) polygon(50% 10%, 90% 85%, 10% 85%), the caret in the polygon; the output shows a yellow disc with a triangle hole, the triangle's points in color, the circle's center and radius handles behind, and the bar reads circle() outside, polygon() inside" width="1440" height="780" loading="lazy">
  <figcaption>A disc with a triangle hole. The caret is in the polygon, so the triangle comes on top.</figcaption>
</figure>

Both shapes are on the output at once. The one the caret stands in comes on top, the other one fades. The bar says which is which: `circle() outside, polygon() inside`. A ready-made shape replaces the shape the caret stands in, not the other one.

## A color per point

With 10 points in a polygon, finding which `35%` moves which point was a guessing game. Now each point takes its own color, out of 30, and its numbers in the code take the same, as a light background.

The colors go round the color wheel by large steps, so two points that follow each other never look alike. A point that cannot move, as a value in `calc()`, keeps its color, faded. And the small handles in the middle of each side are white: they are not points yet.

This works for `clip-path` too.

## A single value stays single

In `shape()`, `to 94pt` is a position with a single value: `94pt` across, and `center` down. Before, dragging that point wrote the second value, `to 95pt 120q`. It looked fine on the element the tool draws on. But in a rule like `*{…}`, `center` is not the same for each element: once written, `120q` moved the shape of every other one.

Now a position written with a single value keeps a single value once dragged, along its own axis. `to 94pt` becomes `to 96pt`, `at left` becomes `at 25%`, and `at bottom` becomes `at center 25%`, since a lone length is always read across. The other value stays `center`, and keeps following each element.

## Since 2.1

Two small updates came out after the 2.1 post, for both editors:

- **A switch to hide the shape.** At the top right of the bar, it takes the shape off the output, to see it as it really is, or its difference with the target, while you tune the numbers in the code.
- **Points beyond the output.** A point outside the 400×300 canvas shows over the panels around it, and you can still drag it.
- **The parents' transforms.** The shape follows the rotations, scales and skews of the element's parents, like a `scale:-1 1` on the `body`.
- **Every unit.** The points written in `lh`, `ch`, `ex`, `cap` and the other units only the output knows show and drag too.
- **Light outputs.** The shape stands out on a light background too, and the points keep the same size whatever the element's scale.

## Good to know

- When a rule styles several elements, like `*`, the points are drawn on the first one that has a box: `html` for `*`.
- The snippets know `border-shape` too: they suggest up to two shapes, each followed by its box.
- Don't want the tool for borders? Uncheck "Border-shape editor" in the options. The "Clip-path editor" one stays on its own.

## Get it

The update is on the [Chrome Web Store](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin), and Chrome installs it by itself. The code and the full changelog are on [GitHub](https://github.com/evanliomain/css-battle-toolbox). A bug or an idea? Open an issue there.
