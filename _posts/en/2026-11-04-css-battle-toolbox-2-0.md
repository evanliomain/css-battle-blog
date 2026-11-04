---
title: "CSS Battle Toolbox 2.0: groups, screenshots, rulers and a sharper Minify"
layout: article
kicker: CSS Battle Toolbox
ref: toolbox-2-0
permalink: /2026/11/04/css-battle-toolbox-2-0/
description: "What's new in CSS Battle Toolbox 2.0: groups of output tools, a screenshot button, rulers on the target, smarter completions and a Minify that knows quirks mode."
cover: /assets/toolbox/2.0/cover.webp
---

[CSS Battle Toolbox](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin) is the Chrome extension I build to add tools right into the cssbattle.dev battle page. Version 2.0 is out. It brings four new tools, completions that know cssbattle, and a Minify that now writes code close to what the top players write.

All the screenshots below come from the [November 3 target]({{ '/2026/11/03/one-shadow-list-two-jobs/' | relative_url }}).

## Groups of output tools

The output has six tools: Slide & compare, Difference, Target on output, Grid, Outline and Background. Until now, you switched them one checkbox at a time. Going from "compare with the target" to "check the outlines" took three or four clicks.

Now you can save groups in the options. A group is a label and the tools it turns on.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/options-groups.webp' | relative_url }}" alt="Options page: two groups, Slide with Slide & compare on, and Diff with Difference on, each with a preview" width="850" height="752" loading="lazy">
  <figcaption>Each group in the options, with a preview of what it shows.</figcaption>
</figure>

Each group gets a round button left of the output, with the first letter of its label. A click sets every tool as the group says: what the group asks for goes on, the rest goes off. The button lights up as long as the checkboxes match its group, even if you got there by hand.

The first nine groups also have a shortcut: <kbd>Ctrl</kbd> <kbd>1</kbd>, <kbd>Ctrl</kbd> <kbd>2</kbd>… It works while you type in the editor, and on an AZERTY keyboard too.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/output-groups.webp' | relative_url }}" alt="The output with four group buttons S, D, T, O on its left; T is lit, and the target and the grid are on" width="670" height="441" loading="lazy">
  <figcaption>The "Target on output" group turns on the target and the grid at once.</figcaption>
</figure>

## A screenshot button

Sharing a render on Discord used to mean a screenshot by hand, then a crop. The new 📷 button, left of the output tools, does it in one click.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/screenshot-button.webp' | relative_url }}" alt="The camera button at the left of the output header, with its hint: Screenshot the output" width="479" height="83" loading="lazy">
</figure>

It takes the output as you see it, with the tools that are on, and the DOM panel below it. Hints and toasts stay out of the image. In the options, you choose what happens to it: download a PNG, copy it to the clipboard, or both.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/screenshot-result.webp' | relative_url }}" alt="The PNG made by the button: the render with the html and body outlines, and the DOM panel with their sizes and margins below it" width="400" height="372" loading="lazy">
  <figcaption>The PNG, here with the Outline tool on.</figcaption>
</figure>

To capture the tab, the extension needs a new permission, "Read and change all your data on all websites". Chrome asks you to accept it on update. The capture only happens when you click the button, and the image never leaves your computer.

## Rulers on the target

Hover the target: two red lines follow the cursor, and the labels give its position in target pixels, from 0 to 399 and 0 to 299. They are counted like Slide & compare does, whatever size the image is shown at.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/ruler.webp' | relative_url }}" alt="The target with a vertical and a horizontal red line crossing at the column's right edge, labeled 224 and 92" width="440" height="397" loading="lazy">
  <figcaption>The right edge of the column's top is at x = 224, the first notch starts around y = 92.</figcaption>
</figure>

No more guessing an edge with the grid: you read it.

## Completions that know cssbattle

The editor's autocomplete used to suggest every CSS keyword. Two changes make it useful for cssbattle.

**The target colors first.** Wherever CSS accepts a color, the editor suggests the target colors, with a swatch, and `transparent`. No more copying a hex code from the side panel.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/snippet-colors.webp' | relative_url }}" alt="Autocomplete after background: the two target colors #668884 and #EED9D9 and transparent come first, then the gradient functions" width="520" height="280" loading="lazy">
</figure>

**Only the values that fit.** For the properties cssbattle solutions use, like `background`, `border`, `box-shadow`, `clip-path`, `font` or `rotate`, the editor only suggests the values valid where you type. Inside `linear-gradient(`, that is the colors, `to`, `in` and the usual angles, with their value in radians. `var()` and `calc()` show up too, where they fit.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/snippet-gradient.webp' | relative_url }}" alt="Autocomplete inside linear-gradient(: target colors, transparent, in, to, 0deg, 30deg π/6, 45deg π/4" width="620" height="280" loading="lazy">
</figure>

## A Minify that knows quirks mode

The Minify button used to remove spaces and little else. In 2.0 it knows what cssbattle allows. CSS Battle runs in quirks mode, where a number alone is read as pixels and a color can drop its `#`. Minify now uses that.

Here is a readable version of the November 3 top solution, 267 characters:

<div class="shots">
  <figure class="shot">
    <img src="{{ '/assets/toolbox/2.0/minify-before.webp' | relative_url }}" alt="The readable code in the editor, 267 characters" width="520" height="423" loading="lazy">
    <figcaption>Before: 267 characters.</figcaption>
  </figure>
  <figure class="shot">
    <img src="{{ '/assets/toolbox/2.0/minify-after.webp' | relative_url }}" alt="The minified code in the editor, 157 characters" width="520" height="192" loading="lazy">
    <figcaption>After one click: 157 characters, exactly the top solution.</figcaption>
  </figure>
</div>

One click on Minify gives back the 157 characters of the winning code, byte for byte. Among the new rules:

| Rule | Before | After |
|---|---|---|
| `px` dropped where quirks mode reads a number as pixels | `margin:10px 20px` | `margin:10 20` |
| Repeated sides dropped | `margin:270 140 -260 140` | `margin:270 140-260` |
| Unit of a zero, signs and useless zeros | `margin:+5px 01px -0px` | `margin:5 1 0` |
| `#` of a hex color dropped in `color`, `background-color`, `border-color` | `color:#84271C` | `color:84271C` |
| Default values dropped | `background:red none repeat scroll 0 0` | `background:red` |
| | `border:none` | `border:0` |
| | `translate(10px,0) scale(2,2)` | `translate(10px)scale(2)` |
| `currentColor` dropped in `border`, `outline`, `box-shadow` | `border:2px solid currentColor` | `border:2px solid` |
| `calc()` on constants computed | `width:calc(100px - 10px)` | `width:90` |
| Scientific notation when shorter | `width:10000px` | `width:1e4` |
| Shortest angle unit | `rotate:360deg` | `rotate:1turn` |
| Shortest keyword | `font-weight:bold`, `:nth-child(2n+1)` | `font-weight:700`, `:nth-child(odd)` |
| Needless quotes | `font-family:"Arial"` | `font-family:Arial` |

Minify stays careful. It keeps `px` in shorthands like `border` and inside functions, where quirks mode does not apply. It keeps the `#` where the color would be read differently: 4 or 8 digits, 3 digits starting with a digit (`1ea` would be `#0001ea`), or something like `1e0`. It keeps the spaces around `+` and `-` in `calc()`, which need them. And it leaves a declaration with a comment as it is.

## And a fix

Hide Submit and Hide Top solution work again. CssBattle now writes battle dates like `Sep 30, 2026`, and the extension did not recognize today's battle anymore.

## Get it

The update is on the [Chrome Web Store](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin). Chrome installs it by itself, then asks you to accept the new permission. The code and the full changelog are on [GitHub](https://github.com/evanliomain/css-battle-toolbox). A bug or an idea? Open an issue there.
