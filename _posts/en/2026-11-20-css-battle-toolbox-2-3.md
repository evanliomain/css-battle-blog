---
title: "CSS Battle Toolbox 2.3: see how your border-image is cut"
layout: article
kicker: CSS Battle Toolbox
ref: toolbox-2-3
permalink: /2026/11/20/css-battle-toolbox-2-3/
description: "CSS Battle Toolbox 2.3 shows how a border-image is cut into nine pieces and laid out around the element: the image and its slices, each piece in its place, why one is missing, and the pieces moving one by one. Drag the slices, widths and outsets, and the code follows."
cover: /assets/toolbox/2.3/cover.webp
---

`border-image` is one of the shortest ways to draw a lot in cssbattle. It is also one of the hardest to read. A single value holds an image, its slices, the widths of the border, the outsets and how the edges repeat. The image is then cut into nine pieces that you never see, and laid out around the element by rules you have to know by heart.

[CSS Battle Toolbox](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin) 2.3 shows those nine pieces. After the [clip-path]({{ '/2026/11/11/css-battle-toolbox-2-1/' | relative_url }}) and [border-shape]({{ '/2026/11/17/css-battle-toolbox-2-2/' | relative_url }}) editors, here is the border-image one.

## Nine pieces, numbered

Put the caret in a `border-image` value. On the output, each piece is framed and numbered around the element, from 1 at the top left to 9 at the bottom right. At the same time, a panel slides up under the output. It goes from the code to the right of the screen, so it covers neither the code nor the output.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/overview.webp' | relative_url }}" alt="The editor with a p styled by border-image: radial-gradient(…) 35% / 40px round. On the output, the nine pieces framed and numbered around the element, with green and purple handles. Under it, the panel: on the left the image, a red and yellow ellipse cut by four red lines labeled 35% and 63px or 42px; an arrow; on the right the element, the same ellipse laid out as a border 40px wide, the green lines of the widths labeled 40px" width="1440" height="807" loading="lazy">
  <figcaption>On the left, the image cut by its slices. On the right, the element and the widths of its border.</figcaption>
</figure>

The panel puts the two halves of the story side by side. On the left, the image, cut by the four red lines of `border-image-slice`. On the right, the element, and the four green lines of `border-image-width`. Each line has its value next to it, as written in the code and in pixels: `35%` is `63px` across and `42px` down here.

## Drag the cuts

The red handles move the slices, the green ones the widths. The outsets have their purple handles around the element, on the output. The code follows, in the units you wrote.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/drag.webp' | relative_url }}" alt="The same page while the top slice is dragged: the code now reads 28% instead of 35%, all four red lines of the image moved together, labeled 28% and 50.406px or 33.594px, and the ellipse on the output and in the element now shows only its red ring" width="1440" height="807" loading="lazy">
  <figcaption>The top slice dragged up: <code>35%</code> becomes <code>28%</code>, and the four sides follow, since they share the value.</figcaption>
</figure>

A value shared by several sides moves them all, as `35%` above moves all four slices. Hold Alt to move only the side you drag: the value is split in the code. Hold Shift to move by tenths. A value written in a `var()` shows, but does not drag: the tool cannot rewrite what it cannot read.

## Each piece in its place

Under the figures, the nine pieces are laid out as in the border: the corners in the corners, the edges between them, the middle in the middle.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/pieces.webp' | relative_url }}" alt="A 3 by 3 grid of cards cut by red dashed lines. Each card shows a number, the piece cut from the image, an arrow, the piece as painted on the element, and an eye. Top-left corner: Shrunk: 63% wide, 95% tall, 63×42 → 40×40. Top edge: 2 tiles, squeezed along, 54×42 → 100×40, with a round button. Middle: Hidden: needs fill, with a yellow + fill button" width="1440" height="708" loading="lazy">
  <figcaption>The nine pieces, from the image to the border, each with what happens to it.</figcaption>
</figure>

Each piece shows its cut in the image, then as Chrome paints it around the element, and says in plain words what happens to it: a corner is "Shrunk: 63% wide, 95% tall", an edge gets "2 tiles, squeezed along". Its sizes follow, from the image to the border.

When a piece is missing, it says why: no slice or no width on its side, slices that overlap so nothing is left, no room for a single tile. The middle stays empty until you add `fill`, as in [the unpainted middle]({{ '/2026/07/28/the-unpainted-middle/' | relative_url }}).

And you can change things from here. Each edge switches its repeat, `stretch`, `repeat`, `round` and `space` in turn, for both edges of the axis. The middle adds or takes off `fill`.

## One piece alone

Press the eye of a piece, or the piece itself, to see it alone on the output. The others are dimmed, and the bounds of its tiles show. Just hovering a piece in the panel lights it on the output.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/alone.webp' | relative_url }}" alt="The output with piece 2, the top edge, framed in yellow, a dashed line between its two tiles, the rest of the element dimmed. Under it, the header of the panel: Border-image pieces, a yellow chip Piece 2 alone with a Show all button, the size p · 180 × 120, a Play piece by piece button and a yellow switch" width="1440" height="605" loading="lazy">
  <figcaption>The top edge alone, its two tiles split by a dashed line. Show all brings the others back.</figcaption>
</figure>

## Piece by piece

"Play piece by piece", at the top of the panel, shows the whole thing moving. The corners go first, then the edges, then the middle. Each piece leaves the image and lands around the element. For an edge that repeats, rounds or is spaced out, a single tile lands first, then its copies slide to the other tiles. Then it fades into the element as Chrome paints it. You can pause it, and go on.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/play.webp' | relative_url }}" alt="The panel while the pieces play, step 6 of 8: in the image, the pieces already taken are dimmed; on the element, the corners and the top edge are in place, and a tile of the bottom edge slides to its place" width="1440" height="736" loading="lazy">
  <figcaption>Step 6 of 8: a tile of the bottom edge on its way.</figcaption>
</figure>

## When the result is not what you wrote

Some rules of `border-image` change the result without a word. The panel tells them with a ⚠ next to its title. Hover it for the details:

- **No border to count.** A width without unit, like `/ 2`, is a multiple of `border-width`. With no border on the element, it is 0, and nothing shows. That is the trap of [a border image without a border]({{ '/2026/08/12/a-border-image-without-a-border/' | relative_url }}).
- **Widths shrunk to fit.** When two opposite widths are larger than the element together, Chrome scales them all down.
- **Widths rounded down to the pixel.** Chrome draws the border on whole pixels.
- **Pieces too thin to see.** A piece under 2px in the image is listed, and its thumbnail is enlarged.

## Good to know

- When a rule styles several elements, like `*` for the `html` and the `body`, the tool shows one at a time. Switch between them in the header of the panel.
- The switch at the top right takes the pieces off the output, to see the result as it is.
- Closed with its cross, the panel stays closed while the caret stays in the value. It comes back the next time you go into a `border-image`.
- Don't want the tool? Uncheck "Border-image editor" in the options. The other editors stay on their own.

## Get it

The update is on the [Chrome Web Store](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin), and Chrome installs it by itself. The code and the full changelog are on [GitHub](https://github.com/evanliomain/css-battle-toolbox). A bug or an idea? Open an issue there.
