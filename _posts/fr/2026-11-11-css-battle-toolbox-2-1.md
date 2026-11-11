---
title: "CSS Battle Toolbox 2.1 : éditez votre clip-path directement sur le rendu"
layout: article
kicker: CSS Battle Toolbox
ref: toolbox-2-1
permalink: /fr/2026/11/11/css-battle-toolbox-2-1/
description: "CSS Battle Toolbox 2.1 apporte un éditeur de clip-path dans la page de la battle : déplacez les points de votre forme sur le rendu, ajoutez-en, supprimez-en, partez d'une forme prête, et le code suit."
cover: /assets/toolbox/2.1/cover.webp
---

Écrire un `clip-path` à la main, c'est lent. On devine les coordonnées, on les tape, on regarde le rendu, et on recommence. [Clippy](https://bennettfeely.com/clippy/) aide, mais il vit dans un autre onglet, sur une boîte qui n'est pas la vôtre.

[CSS Battle Toolbox](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin) 2.1 amène cet éditeur dans la page de la battle, directement sur votre élément.

## Les points, sur votre élément

Placez le curseur dans la valeur d'un `clip-path`. Les points de la forme apparaissent sur l'élément, dans le rendu, et vous les déplacez à la souris. Le code suit pendant le déplacement.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.1/polygon.webp' | relative_url }}" alt="L'éditeur avec un polygon() de 12 points à gauche, et le rendu à droite : la luciole vert clair avec une poignée blanche sur chaque point et une jaune au milieu de chaque côté" width="1440" height="720" loading="lazy">
  <figcaption>La cible <a href="https://cssbattle.dev/play/192">Abstract Firefly</a>, en polygon() : une poignée blanche par point.</figcaption>
</figure>

L'outil retrouve l'élément à partir de la règle où se trouve le curseur, règles imbriquées comprises, ou de son attribut `style`. Il dessine sur la bonne boîte : `border-box` par défaut, ou `padding-box`, `content-box` et `margin-box` quand la valeur le précise. Il suit les `rotate`, `scale`, `translate` et `transform` de l'élément lui-même.

Seuls les nombres que vous déplacez sont réécrits, le reste du code reste tel que vous l'avez écrit :

- **L'unité est gardée.** Une valeur en `px` reste en `px`, une valeur en `%` reste en `%`. `em`, `rem`, `vw` et les autres marchent aussi.
- **Le code golfé reste valide.** `polygon(50%0,100%100%,0 100%)` reste collé, et une espace n'est ajoutée que là où deux nombres se colleraient.
- **Des nombres entiers.** Maintenez <kbd>Maj</kbd> pour avancer au dixième.
- **Une annulation par déplacement.** <kbd>Ctrl</kbd> <kbd>Z</kbd> (<kbd>⌘</kbd> <kbd>Z</kbd> sur Mac) annule tout le déplacement, pas chaque pixel.

## Ajouter et supprimer des points

Les petites poignées jaunes sont au milieu de chaque côté. Tirez-en une, et un nouveau point naît à cet endroit, qui suit déjà la souris.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.1/add-point.webp' | relative_url }}" alt="La même luciole, avec un nouveau point tiré vers le haut depuis le milieu du côté haut de l'aile gauche ; le code montre la nouvelle paire 115px 52px entre les deux premiers points" width="1440" height="720" loading="lazy">
  <figcaption>Tiré du milieu d'un côté, le point 115px 52px s'insère à sa place dans le code.</figcaption>
</figure>

Pour supprimer un point, appuyez deux fois dessus rapidement. Un polygone garde toujours 3 points.

## Toutes les formes, sauf path()

L'outil gère toutes les formes de base que cssbattle accepte. `path()` est laissé de côté, puisque cssbattle ne l'accepte pas.

| Forme | Ce que vous déplacez |
|---|---|
| `polygon()` | chaque point, et le milieu de chaque côté pour en ajouter un |
| `circle()` | le centre et le rayon |
| `ellipse()` | le centre et chaque rayon |
| `inset()` | chaque côté |
| `rect()` | chaque côté, mesuré depuis le haut et la gauche |
| `xywh()` | le coin haut gauche et le coin bas droit |
| `shape()` | le départ, la fin de chaque commande, et les points de contrôle des courbes |

Les mots-clés de position comme `center` ou `left` deviennent des nombres dès que vous les déplacez. Une valeur en `calc()` reste telle quelle : sa poignée ne bouge que sur l'autre axe, ou devient grise si elle ne peut bouger sur aucun. Un `rect()` ou un `xywh()` vide part de toute la boîte, et reçoit ses 4 valeurs au premier déplacement.

## shape() : choisissez le type de point

Un `shape()` n'est pas un polygone : ses segments peuvent être des lignes, des courbes ou des arcs. Alors quand le curseur est dans un `shape()`, une ligne « New point » apparaît sous le rendu. Choisissez la commande du nouveau point : `line`, `hline`, `vline`, `curve` avec 1 ou 2 points de contrôle, `smooth` ou `arc`.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.1/shape-curve.webp' | relative_url }}" alt="La cible UFO refaite avec deux shape() : le bas de la coque est tiré vers le bas avec curve choisi dans la ligne New point, et le code montre la nouvelle commande curve to 200px 243px with 265px 213px" width="1440" height="780" loading="lazy">
  <figcaption>La cible <a href="https://cssbattle.dev/play/223">UFO</a> : avec <code>curve</code> choisi, le bas de la coque devient une courbe. Son point de contrôle est ensuite à vous.</figcaption>
</figure>

La nouvelle commande reprend le `to` ou le `by` du segment qu'elle coupe. Une courbe coupée par une courbe dessine toujours la même chose, en 2 moitiés. Et quand vous déplacez, ajoutez ou supprimez un point, la commande relative suivante (`line by…`) est réécrite pour que le reste du tracé ne bouge pas.

## Des formes prêtes

Un `clip-path` vide vous met sur les rails. Sous le rendu, la barre propose des formes prêtes, une ligne par famille :

- les polygones : triangle, trapèze, parallélogramme, losange, du pentagone à l'octogone, étoile, croix, flèche ;
- le cercle, l'ellipse, `rect()`, `inset()` et `xywh()` ;
- des formes que seul `shape()` sait dessiner : cœur, feuille, goutte, bouclier, arche, lune, ticket, vague et nuage. Chacune utilise d'autres commandes, pour partir d'une base proche de ce qu'il vous faut.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.1/presets.webp' | relative_url }}" alt="Le rendu sous un clip-path vide, et la barre en dessous : Pick a shape, puis une ligne de polygones, une ligne avec cercle, ellipse et boîtes, et une ligne de formes shape() du cœur au nuage" width="630" height="660" loading="lazy">
</figure>

Un clic écrit la forme et place le curseur dedans : ses points apparaissent tout de suite. S'il y avait déjà une forme, elle est remplacée, et la boîte de référence que vous aviez écrite est gardée.

## Bon à savoir

- Les transformations des parents de l'élément ne sont pas prises en compte.
- Un pseudo-élément (`::before`, `::after`) n'a pas de boîte que l'outil peut mesurer : sa forme est dessinée sur tout le rendu, et la barre le signale.
- Vous ne voulez pas de l'outil ? Décochez « Clip-path editor » dans les options.

## L'installer

La mise à jour est sur le [Chrome Web Store](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin), et Chrome l'installe tout seul. Le code et le changelog complet sont sur [GitHub](https://github.com/evanliomain/css-battle-toolbox). Un bug ou une idée ? Ouvrez une issue là-bas.
