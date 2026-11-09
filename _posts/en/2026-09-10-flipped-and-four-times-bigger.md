---
title: "Flipped and four times bigger: a padlock in 118 characters"
lang: en
ref: 2026-09-10
permalink: /2026/09/10/flipped-and-four-times-bigger/
description: "How one rule for html and the body, and a scale of −4, draw the September 10, 2026 CSS Battle target: an open dark grey padlock."
target: /assets/targets/2026-09-10.png
target_url: https://cssbattle.dev/play/YdSTFgl2iKzGCW1ahmEz
colors: ["#ffffff", "#333333"]
player: h_blierzt
chars: 118
score: 729.91
match: 100
code: |
   <style>*{margin:70 150;border-radius:1in 1in 0 0;box-shadow:inset 0 0 0 5vw#333,5vw 8q#FFF;*{margin:125 30 5;scale:-4
---

The September 10 target is an open padlock, dark grey on white: a wide body rounded at the bottom, and a shackle above it whose left leg stops short. H_Bliertz's solution gives `html` and the `body` the same rule: rounded top corners, a thick inset shadow and a white shadow. On `html`, that is the shackle. The `body` is small, but `scale:-4` makes it four times bigger and turns it upside down: the body of the lock, with its round corners at the bottom. Its white shadow flips with it and erases the end of the shackle's left leg.

Use **Teaching colors** to see the white shadow in pink.

{% include animations/2026-09-10.html lang=page.lang %}

## The code, spaced out

```css
&nbsp;                               /* a real no-break space: 1 character */
<style>
* {                                  /* html, then the body */
  margin: 70 150;
  border-radius: 1in 1in 0 0;        /* round top corners */
  box-shadow:
    inset 0 0 0 5vw #333,            /* 20px dark inside */
    5vw 8q #FFF;                     /* white copy, 20 right, 7.56 down */
  * {                                /* the body */
    margin: 125 30 5;
    scale: -4;                       /* four times bigger, flipped */
  }
}
```

## How it works

### 1. html: the shackle

`*` gives `html` `margin:70 150`: it is 400 − 300 = 100 wide, from x = 150 to 250. Without a doctype, the page is in quirks mode, and `html` takes the height its margins leave: 300 − 140 = 160, from y = 70 to 230.

`border-radius:1in 1in 0 0` rounds the top corners by 96px, too much for a 100px wide box, so Chrome scales them down to 50: the top is a half circle. `html` has no background, but `box-shadow:inset 0 0 0 5vw#333` paints a 20px dark band (5vw is 5% of 400) inside its edge, following the curve: an upside-down U with a bar at the bottom. That is the shackle; its bottom will be hidden.

### 2. The body: a small box

The code starts with a no-break space, before `<style>`. Text means the page body has started, so the `<body>` opens right there and gets one line of text. I checked it: without that space, `html` measures 280 tall instead of 160, and the shackle's legs show below the lock.

The nested `*` gives the `body` `margin:125 30 5`. Inside `html`'s 100px, it is 100 − 60 = 40 wide, at x = 180, and it starts 125 down, at y = 195. In quirks mode it fills the rest of `html` minus its bottom margin: 160 − 125 − 5 = 30 tall. It also gets everything from `*`: its 20px inset shadow fills the whole 40 × 30 box, and its top corners are rounded by 20 (the same `1in`, scaled down to fit).

### 3. scale:-4: the body of the lock

`scale:-4` scales the `body` by −4 on both axes, around its centre, (200, 210). It becomes four times bigger, 160 × 120, from x = 120 to 280 and y = 150 to 270, and it is turned half a turn: its round corners, now 80px, are at the bottom. That is the body of the lock, and it covers the bottom of the shackle.

The `body`'s second shadow, `5vw 8q#FFF`, is a white copy moved 20px right and 7.56px down. The scale turns it and makes it four times bigger too: on screen, it moves 80px left and 30.24px up, from x = 40 to 200 and y = 119.76 to 239.76. It is painted over `html`'s shackle, and it erases the left leg below y = 119.76: the padlock is open.

`html` has that white shadow too, but on the white canvas it cannot be seen.

## Golf notes

- One rule draws both parts: `html` and the `body` share the radius and the two shadows.
- `scale:-4` grows the `body` and turns it at once: its rounded top becomes a rounded bottom, and its white shadow lands on the other side.
- The inset shadow fills the small `body` completely: no `background` needed.
- A white shadow erases part of the shackle for free.
- The no-break space puts the `<body>` before the `<style>`, which keeps `html` at the right height.
- No closing braces, and `<style>` is never closed.
