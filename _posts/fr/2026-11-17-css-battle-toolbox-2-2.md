---
title: "CSS Battle Toolbox 2.2 : éditez votre border-shape, une couleur par point"
layout: article
kicker: CSS Battle Toolbox
ref: toolbox-2-2
permalink: /fr/2026/11/17/css-battle-toolbox-2-2/
description: "CSS Battle Toolbox 2.2 étend l'éditeur de clip-path à border-shape, la nouvelle propriété que cssbattle accepte : déplacez les points d'une ou deux formes directement sur le rendu. Et chaque point a maintenant sa couleur, ses nombres dans le code aussi."
cover: /assets/toolbox/2.2/cover.webp
---

cssbattle accepte maintenant `border-shape`. La propriété ressemble beaucoup à `clip-path` : les mêmes formes de base, les mêmes coordonnées à deviner. Mais la bordure ne suit plus la boîte. Elle suit votre forme.

[CSS Battle Toolbox](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin) 2.2 étend l'[éditeur de clip-path de la 2.1]({{ '/fr/2026/11/11/css-battle-toolbox-2-1/' | relative_url }}) à `border-shape`. Et pour distinguer les points, chacun a maintenant sa couleur.

## Une forme : la bordure le long d'un tracé

Placez le curseur dans la valeur d'un `border-shape`. Avec une seule forme, la bordure est dessinée le long du tracé, et son épaisseur est centrée sur la ligne. Les points sont donc au milieu de la bordure, sur la `half-border-box`.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.2/stroke.webp' | relative_url }}" alt="L'éditeur avec un border-shape: polygon() de 10 points à gauche, chaque paire de nombres sur son propre fond coloré, et le rendu à droite : le contour jaune d'une étoile avec une poignée colorée sur chaque point, au milieu de la bordure" width="1440" height="780" loading="lazy">
  <figcaption>Une étoile dessinée par une bordure de 14px. Chaque point a sa couleur, et ses nombres dans le code prennent la même.</figcaption>
</figure>

Tout ce que vous connaissez de l'éditeur de `clip-path` marche pareil : déplacer un point, en tirer un nouveau du milieu d'un côté, en supprimer un d'un double appui, partir d'une forme prête. Seuls les nombres que vous déplacez sont réécrits, l'unité est gardée, et le code golfé reste golfé.

## Deux formes : le bord extérieur et le bord intérieur

Avec deux formes, la bordure remplit l'espace entre les deux. La première est le bord extérieur, dessinée sur la `border-box`. La seconde est le bord intérieur, dessinée sur la `padding-box`. Une boîte écrite après une forme remplace celle par défaut, `half-border-box` comprise.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.2/two-shapes.webp' | relative_url }}" alt="L'éditeur avec border-shape: circle(50%) polygon(50% 10%, 90% 85%, 10% 85%), le curseur dans le polygone ; le rendu montre un disque jaune troué d'un triangle, les points du triangle en couleur, les poignées du centre et du rayon du cercle derrière, et la barre indique circle() outside, polygon() inside" width="1440" height="780" loading="lazy">
  <figcaption>Un disque troué d'un triangle. Le curseur est dans le polygone, alors le triangle passe devant.</figcaption>
</figure>

Les deux formes sont sur le rendu en même temps. Celle où se trouve le curseur passe devant, l'autre s'estompe. La barre dit laquelle est laquelle : `circle() outside, polygon() inside`. Une forme prête remplace la forme où se trouve le curseur, pas l'autre.

## Une couleur par point

Avec 10 points dans un polygone, retrouver quel `35%` déplace quel point, c'était un jeu de devinettes. Maintenant chaque point prend sa couleur, parmi 30, et ses nombres dans le code prennent la même, en fond léger.

Les couleurs font le tour du cercle chromatique à grands pas : deux points qui se suivent ne se ressemblent jamais. Un point qui ne peut pas bouger, comme une valeur en `calc()`, garde sa couleur, estompée. Et les petites poignées au milieu des côtés restent blanches : ce ne sont pas encore des points.

Ça marche aussi pour `clip-path`.

## Une seule valeur reste seule

Dans un `shape()`, `to 94pt` est une position à une seule valeur : `94pt` en largeur, et `center` en hauteur. Avant, déplacer ce point écrivait la seconde valeur : `to 95pt 120q`. Ça tombait juste sur l'élément où l'outil dessine. Mais dans une règle comme `*{…}`, `center` n'est pas le même pour chaque élément : une fois écrit, `120q` déplaçait la forme de tous les autres.

Maintenant une position écrite avec une seule valeur garde une seule valeur une fois déplacée, sur son axe. `to 94pt` devient `to 96pt`, `at left` devient `at 25%`, et `at bottom` devient `at center 25%`, puisqu'une longueur seule se lit toujours en largeur. L'autre valeur reste `center`, et continue de suivre chaque élément.

## Depuis la 2.1

Deux petites mises à jour sont sorties après l'article sur la 2.1, pour les deux éditeurs :

- **Un interrupteur pour masquer la forme.** En haut à droite de la barre, il retire la forme du rendu, pour la voir telle qu'elle est, ou sa différence avec la cible, pendant que vous ajustez les nombres dans le code.
- **Les points hors du rendu.** Un point en dehors du canvas de 400×300 s'affiche par-dessus les panneaux autour, et se déplace toujours.
- **Les transformations des parents.** La forme suit les rotations, mises à l'échelle et inclinaisons des parents de l'élément, comme un `scale:-1 1` sur le `body`.
- **Toutes les unités.** Les points écrits en `lh`, `ch`, `ex`, `cap` et les autres unités que seul le rendu connaît s'affichent et se déplacent aussi.
- **Les rendus clairs.** La forme ressort aussi sur un fond clair, et les points gardent la même taille quelle que soit l'échelle de l'élément.

## Bon à savoir

- Quand une règle cible plusieurs éléments, comme `*`, les points sont dessinés sur le premier qui a une boîte : `html` pour `*`.
- Les snippets connaissent aussi `border-shape` : ils proposent jusqu'à deux formes, chacune suivie de sa boîte.
- Vous ne voulez pas de l'outil pour les bordures ? Décochez « Border-shape editor » dans les options. « Clip-path editor » reste indépendant.

## L'installer

La mise à jour est sur le [Chrome Web Store](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin), et Chrome l'installe tout seul. Le code et le changelog complet sont sur [GitHub](https://github.com/evanliomain/css-battle-toolbox). Un bug ou une idée ? Ouvrez une issue là-bas.
