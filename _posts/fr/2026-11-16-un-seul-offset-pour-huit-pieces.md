---
title: "Un seul offset pour huit pièces : un moulinet en 138 caractères"
lang: fr
ref: 2026-11-16
permalink: /fr/2026/11/16/un-seul-offset-pour-huit-pieces/
description: "Comment huit boîtes imbriquées, une bordure de 30px, border-radius:1in 0 0 et un seul offset:50%73%ray(45deg)/-31%25Q dessinent la cible CSS Battle du 16 novembre 2026 : huit quarts de disque jaune pâle en rond sur fond vieux rose."
target: /assets/targets/2026-11-16.png
target_url: https://cssbattle.dev/play/jnMuDO3lQ6zvVd2hlovm
colors: ["#f2e09f", "#c36271"]
player: evanliomain
chars: 138
score: 707.36
match: 100
code: |
  <b><b><b><b><b><b><style>*{offset:50%73%ray(45deg)/-31%25Q;position:fixed;border:8mm solid#f2e09f;background:#c36271;border-radius:1in 0 0
---

La cible du 16 novembre est vieux rose, avec au milieu une couronne jaune pâle de huit pièces, autour d'un trou en étoile. Chaque pièce est un quart de disque, tourné de 45° par rapport au précédent, comme un moulinet. Je la dessine avec six balises `<b>` et une seule règle. Chacune des huit boîtes, `html`, le `body` et les six `<b>`, est un quart de disque fait de sa bordure. Chacune est dans la précédente, et `offset` la tourne de 45° de plus autour du même point.

Les **couleurs pédagogiques** distinguent les huit pièces : en vrai, elles ont toutes le même jaune.

{% include animations/2026-11-16.html lang=page.lang %}

## Le code, aéré

```css
<b><b><b><b><b><b>                       /* six boîtes, chacune dans la précédente */
<style>
* {                                      /* html, body et les six b */
  offset: 50% 73% ray(45deg) / -31% 25Q; /* ancre sur la position, puis −45° */
  position: fixed;                       /* un contenu de 0 × 0 */
  border: 8mm solid #f2e09f;             /* 30px : un carré de 60 */
  background: #c36271;                   /* vieux rose : le canevas */
  border-radius: 1in 0 0;                /* haut gauche 96, ramené à 60 */
}
```

## Comment ça marche

### 1. Huit boîtes de 60

`*` vise `html`, `head`, `style`, le `body` et les six `<b>`. `head` et `style` ne s'affichent pas : il reste huit boîtes, `html`, le `body` et six `<b>`, chacune dans la précédente.

`position:fixed` sort chaque boîte du flux. Une boîte fixe sans largeur et sans contenu se réduit à 0 × 0, `html` compris. `8mm` fait 30,24px, et Chrome trace une bordure de 30px. Chaque boîte est donc un carré de 60 × 60, fait seulement de sa bordure jaune.

### 2. border-radius : un quart de disque

`border-radius:1in 0 0` donne `1in` = 96px au coin haut gauche, et 0 aux trois autres. Deux rayons d'un même côté ne peuvent pas dépasser ce côté à eux deux. 96 dépasse 60 : Chrome le ramène à 60. Le carré devient un quart de disque de rayon 60, et le centre du cercle est le coin bas droit.

### 3. offset : un chemin, une position, une ancre

`offset:50%73%ray(45deg)/-31%25Q` est un raccourci en trois parties :

- `50% 73%` est la position, le départ du chemin. Elle se lit dans la boîte du parent : le canevas de 400 × 300 pour `html`, soit (200, 219), et le carré de 60 du parent pour les autres, soit (30 ; 43,8).
- `ray(45deg)` est le chemin, un rayon à 45°. Il n'y a pas de distance : la boîte reste au départ du rayon. Mais `offset` tourne aussi la boîte dans le sens du chemin, de l'angle moins 90° : −45°.
- `-31% 25Q` est l'ancre, le point de la boîte posé sur la position : −31 % de 60 font −18,6, et `25Q` fait 23,6px. Elle est à gauche de la boîte, en dehors.

Chaque boîte pose donc son ancre sur la position, et tourne de −45° autour d'elle.

### 4. Des boîtes imbriquées : 45° de plus à chaque fois

Toutes les boîtes ont un carré de 60 : chacune refait le même geste dans la précédente, ancre sur (30 ; 43,8), puis −45°. Et les rotations s'ajoutent : `html` tourne de −45°, le `body` de −90°, le premier `<b>` de −135°, et ainsi de suite. Le dernier `<b>` tourne de −360° : il est droit.

Un geste fait d'une rotation et d'un décalage est une rotation autour d'un point fixe. Ici, ce point est 25 au-dessus du milieu du haut de la boîte, donc à 55 de son centre. `html` le pose en (200 ; 219) + (0 ; −68,7) = (200 ; 150,3).

Les huit centres sont donc tous à 55 de ce point, à 45° l'un de l'autre. 8 × 45° = 360°, et la ronde se ferme. Le côté arrondi de chaque quart de disque est tourné vers le milieu : ensemble, ils dessinent le trou en étoile.

### 5. Le fond

`background:#c36271` va sur les huit boîtes. Elles n'ont pas de contenu, et leur fond est sous leur bordure : on ne le voit jamais. Celui de `html` passe au canevas : tout le cadre est vieux rose.

## Notes de golf

- `<b>` est une balise d'une lettre qui s'imbrique. Avec `position:fixed`, elle prend une taille comme n'importe quelle boîte.
- Une seule règle `*` dessine les huit pièces : la forme vient de la bordure, et la place d'`offset`, le même pour toutes les boîtes.
- `offset` n'a pas besoin de distance : `ray()` seul tourne la boîte, et les rotations s'ajoutent d'un niveau à l'autre.
- La position et l'ancre sont choisies pour que les huit centres tombent autour de (200, 150). `50%73%` et `-31%25Q` sont des écritures courtes d'un point juste à un demi-pixel près.
- `1in` dépasse le côté, mais Chrome le ramène : 3 caractères pour un rayon de 60.
- `8mm` fait 30,24px, tracé en 30px.
- `50%73%`, `/-31%25Q` et `solid#f2e09f` : pas d'espace après `%`, avant un nombre négatif ni avant `#`.
- La règle n'est jamais fermée.
