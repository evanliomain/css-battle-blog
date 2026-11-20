---
title: "CSS Battle Toolbox 2.3 : voyez comment votre border-image est découpé"
layout: article
kicker: CSS Battle Toolbox
ref: toolbox-2-3
permalink: /fr/2026/11/20/css-battle-toolbox-2-3/
description: "CSS Battle Toolbox 2.3 montre comment un border-image est découpé en neuf morceaux et posé autour de l'élément : l'image et ses découpes, chaque morceau à sa place, pourquoi il en manque un, et les morceaux qui se posent un par un. Déplacez les découpes, les largeurs et les débords, et le code suit."
cover: /assets/toolbox/2.3/cover.webp
---

`border-image` est l'un des moyens les plus courts de dessiner beaucoup dans cssbattle. C'est aussi l'un des plus durs à lire. Une seule valeur contient une image, ses découpes, les largeurs de la bordure, les débords et la façon dont les bords se répètent. L'image est ensuite coupée en neuf morceaux que vous ne voyez jamais, et posée autour de l'élément selon des règles qu'il faut connaître par cœur.

[CSS Battle Toolbox](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin) 2.3 montre ces neuf morceaux. Après les éditeurs de [clip-path]({{ '/fr/2026/11/11/css-battle-toolbox-2-1/' | relative_url }}) et de [border-shape]({{ '/fr/2026/11/17/css-battle-toolbox-2-2/' | relative_url }}), voici celui de border-image.

## Neuf morceaux, numérotés

Placez le curseur dans la valeur d'un `border-image`. Sur le rendu, chaque morceau est encadré et numéroté autour de l'élément, de 1 en haut à gauche à 9 en bas à droite. En même temps, un panneau monte sous le rendu. Il va du code jusqu'à la droite de l'écran, pour ne cacher ni le code ni le rendu.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/overview.webp' | relative_url }}" alt="L'éditeur avec un p stylé par border-image: radial-gradient(…) 35% / 40px round. Sur le rendu, les neuf morceaux encadrés et numérotés autour de l'élément, avec des poignées vertes et violettes. En dessous, le panneau : à gauche l'image, une ellipse rouge et jaune coupée par quatre lignes rouges marquées 35% et 63px ou 42px ; une flèche ; à droite l'élément, la même ellipse posée en bordure de 40px, les lignes vertes des largeurs marquées 40px" width="1440" height="807" loading="lazy">
  <figcaption>À gauche, l'image coupée par ses découpes. À droite, l'élément et les largeurs de sa bordure.</figcaption>
</figure>

Le panneau met côte à côte les deux moitiés de l'histoire. À gauche, l'image, coupée par les quatre lignes rouges de `border-image-slice`. À droite, l'élément, et les quatre lignes vertes de `border-image-width`. Chaque ligne a sa valeur à côté, telle qu'écrite dans le code et en pixels : ici, `35%` fait `63px` en largeur et `42px` en hauteur.

## Déplacez les découpes

Les poignées rouges déplacent les découpes, les vertes les largeurs. Les débords ont leurs poignées violettes autour de l'élément, sur le rendu. Le code suit, dans les unités que vous avez écrites.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/drag.webp' | relative_url }}" alt="La même page pendant qu'on déplace la découpe du haut : le code indique maintenant 28% au lieu de 35%, les quatre lignes rouges de l'image ont bougé ensemble, marquées 28% et 50.406px ou 33.594px, et l'ellipse sur le rendu et dans l'élément ne montre plus que son anneau rouge" width="1440" height="807" loading="lazy">
  <figcaption>La découpe du haut remontée : <code>35%</code> devient <code>28%</code>, et les quatre côtés suivent, puisqu'ils partagent la valeur.</figcaption>
</figure>

Une valeur partagée par plusieurs côtés les déplace tous, comme `35%` ci-dessus déplace les quatre découpes. Gardez Alt enfoncé pour ne déplacer que le côté que vous tirez : la valeur est alors séparée dans le code. Gardez Maj enfoncé pour avancer au dixième. Une valeur écrite dans un `var()` s'affiche, mais ne se déplace pas : l'outil ne peut pas réécrire ce qu'il ne sait pas lire.

## Chaque morceau à sa place

Sous les figures, les neuf morceaux sont rangés comme dans la bordure : les coins dans les coins, les bords entre eux, le milieu au milieu.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/pieces.webp' | relative_url }}" alt="Une grille de 3 sur 3 cartes séparées par des pointillés rouges. Chaque carte montre un numéro, le morceau coupé dans l'image, une flèche, le morceau tel que peint sur l'élément, et un œil. Top-left corner : Shrunk: 63% wide, 95% tall, 63×42 → 40×40. Top edge : 2 tiles, squeezed along, 54×42 → 100×40, avec un bouton round. Middle : Hidden: needs fill, avec un bouton jaune + fill" width="1440" height="708" loading="lazy">
  <figcaption>Les neuf morceaux, de l'image à la bordure, chacun avec ce qui lui arrive.</figcaption>
</figure>

Chaque morceau montre sa découpe dans l'image, puis tel que Chrome le peint autour de l'élément, et dit en clair ce qui lui arrive : un coin est « Shrunk: 63% wide, 95% tall » (rétréci), un bord reçoit « 2 tiles, squeezed along » (deux tuiles, tassées). Ses tailles suivent, de l'image à la bordure.

Quand un morceau manque, il dit pourquoi : pas de découpe ou pas de largeur de son côté, des découpes qui se croisent et ne laissent rien, pas la place pour une seule tuile. Le milieu reste vide tant que vous n'ajoutez pas `fill`, comme dans [le milieu non peint]({{ '/fr/2026/07/28/le-milieu-non-peint/' | relative_url }}).

Et vous pouvez agir d'ici. Chaque bord change de répétition, `stretch`, `repeat`, `round` et `space` à tour de rôle, pour les deux bords du même axe. Le milieu ajoute ou retire `fill`.

## Un morceau seul

Appuyez sur l'œil d'un morceau, ou sur le morceau lui-même, pour le voir seul sur le rendu. Les autres s'estompent, et les limites de ses tuiles apparaissent. Il suffit de survoler un morceau dans le panneau pour l'éclairer sur le rendu.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/alone.webp' | relative_url }}" alt="Le rendu avec le morceau 2, le bord du haut, encadré en jaune, un pointillé entre ses deux tuiles, le reste de l'élément estompé. En dessous, l'en-tête du panneau : Border-image pieces, une pastille jaune Piece 2 alone avec un bouton Show all, la taille p · 180 × 120, un bouton Play piece by piece et un interrupteur jaune" width="1440" height="605" loading="lazy">
  <figcaption>Le bord du haut seul, ses deux tuiles séparées par un pointillé. Show all ramène les autres.</figcaption>
</figure>

## Morceau par morceau

« Play piece by piece », en haut du panneau, montre tout le mouvement. Les coins partent d'abord, puis les bords, puis le milieu. Chaque morceau quitte l'image et se pose autour de l'élément. Pour un bord répété, arrondi ou espacé, une seule tuile se pose d'abord, puis ses copies glissent vers les autres tuiles. Ensuite le morceau se fond dans l'élément tel que Chrome le peint. Vous pouvez mettre en pause, et reprendre.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.3/play.webp' | relative_url }}" alt="Le panneau pendant que les morceaux se posent, étape 6 sur 8 : dans l'image, les morceaux déjà pris sont estompés ; sur l'élément, les coins et le bord du haut sont en place, et une tuile du bord du bas glisse vers sa place" width="1440" height="736" loading="lazy">
  <figcaption>Étape 6 sur 8 : une tuile du bord du bas en chemin.</figcaption>
</figure>

## Quand le résultat n'est pas celui que vous avez écrit

Certaines règles de `border-image` changent le résultat sans prévenir. Le panneau les signale par un ⚠ à côté de son titre. Survolez-le pour les détails :

- **Pas de bordure à compter.** Une largeur sans unité, comme `/ 2`, est un multiple de `border-width`. Sans bordure sur l'élément, elle vaut 0, et rien ne s'affiche. C'est le piège d'[un border-image sans bordure]({{ '/fr/2026/08/12/un-border-image-sans-bordure/' | relative_url }}).
- **Des largeurs réduites pour tenir.** Quand deux largeurs opposées dépassent ensemble la taille de l'élément, Chrome les réduit toutes.
- **Des largeurs arrondies au pixel inférieur.** Chrome dessine la bordure sur des pixels entiers.
- **Des morceaux trop fins pour être vus.** Un morceau de moins de 2px dans l'image est signalé, et sa vignette est agrandie.

## Bon à savoir

- Quand une règle cible plusieurs éléments, comme `*` pour le `html` et le `body`, l'outil les montre un par un. Passez de l'un à l'autre dans l'en-tête du panneau.
- L'interrupteur en haut à droite retire les morceaux du rendu, pour voir le résultat tel qu'il est.
- Fermé avec sa croix, le panneau reste fermé tant que le curseur reste dans la valeur. Il revient la prochaine fois que vous entrez dans un `border-image`.
- Vous ne voulez pas de l'outil ? Décochez « Border-image editor » dans les options. Les autres éditeurs restent indépendants.

## L'installer

La mise à jour est sur le [Chrome Web Store](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin), et Chrome l'installe tout seul. Le code et le changelog complet sont sur [GitHub](https://github.com/evanliomain/css-battle-toolbox). Un bug ou une idée ? Ouvrez une issue là-bas.
