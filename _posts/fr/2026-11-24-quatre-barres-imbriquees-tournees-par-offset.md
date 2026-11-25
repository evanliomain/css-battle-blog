---
title: "Quatre barres imbriquées tournées par offset : un astérisque à huit branches en 101 caractères"
lang: fr
ref: 2026-11-24
permalink: /fr/2026/11/24/quatre-barres-imbriquees-tournees-par-offset/
description: "Comment une seule règle sur quatre boîtes imbriquées, une bordure coupée en deux et offset:ray(45deg) dessinent la cible CSS Battle du 24 novembre 2026 : un astérisque crème à huit branches autour d'un trou octogonal."
target: /assets/targets/2026-11-24.png
target_url: https://cssbattle.dev/play/smEqIxdrhyUroSkKzEfp
colors: ["#0d1335", "#fbfae2"]
player: gabriele19
chars: 101
score: 752.75
match: 100
code: |
  <dl><p><style>*{background:#0D1335;border-block:53q solid#FBFAE2;width:20;height:42q;offset:ray(45deg
---

La cible du 24 novembre montre un astérisque crème sur un fond bleu nuit : huit branches de 20 × 50, tous les 45° autour du centre, avec un trou octogonal au milieu. Gabriele le dessine avec quatre boîtes imbriquées les unes dans les autres, `html`, `body`, `<dl>` et `<p>`, et une seule règle. Chaque boîte est une barre dont les deux bordures font deux branches. `offset:ray(45deg)` pose chaque barre au centre de son parent et la tourne de 45° de plus que lui.

La **vue large** montre le `<p>` qui dépasse sous le canevas avant qu'`offset` le déplace, et les **couleurs pédagogiques** donnent à chaque boîte sa couleur.

{% include animations/2026-11-24.html lang=page.lang %}

## Le code, aéré

```css
<dl><p>                             /* deux boîtes de plus : html > body > dl > p */
<style>
* {                                 /* la même règle pour les quatre */
  background: #0D1335;              /* html : le canevas ; les autres : le milieu de la barre */
  border-block: 53q solid #FBFAE2;  /* 50px de crème en haut et en bas */
  width: 20;                        /* 20px, en mode quirks */
  height: 42q;                      /* 39,67px : l'écart entre les deux branches */
  offset: ray(45deg);               /* au centre du parent, tournée de −45° de plus */
}
```

## Comment ça marche

### 1. Une barre, quatre fois

`<dl><p>` ajoute deux éléments. Le `<p>` va dans le `<dl>`, qui va dans le `body`, qui va dans `html` : quatre boîtes, chacune dans la précédente. `*` leur donne à toutes la même règle (`head` et `style` la reçoivent aussi, mais ils sont cachés).

La page n'a pas de doctype : elle est en mode quirks, où `width:20` vaut 20px. `42q`, c'est 42 quarts de millimètre, soit 39,69px, et la boîte est posée à 39,67. `53q` fait 50,08px, et Chrome dessine la bordure à 50 : j'ai mesuré 50px. `border-block` la met seulement en haut et en bas. Chaque boîte est une barre de 20 × 139,67 : 50 de crème, 39,67 de bleu nuit, 50 de crème.

Sans `offset`, les quatre barres s'empilent en haut à gauche. J'ai mesuré `html` en (0, 0), le `body` en (8, 58), le `<dl>` en (8, 108) et le `<p>` en (8, 174). Le `<p>` descend jusqu'à y = 313,67, sous le canevas.

### 2. offset:ray() centre chaque boîte

`offset` est le raccourci d'un chemin de déplacement. Avec `ray(…)` seul, le chemin part du centre du bloc conteneur de la boîte, et la boîte s'y pose par son propre centre. La distance sur le rayon vaut 0 : elle reste là. Les marges et la mise en page normale ne comptent plus.

Pour `html`, le bloc conteneur est le cadre de 400 × 300 : son centre est (200, 150). Pour le `body`, c'est la boîte de contenu de `html`. Cette boîte a bougé avec `html`, et ses bordures sont les mêmes en haut et en bas : son centre est aussi (200, 150). Pareil pour le `<dl>` et le `<p>`. J'ai mesuré les quatre barres centrées en (200, 150).

### 3. 45deg tourne chaque niveau de −45°

`offset-rotate` vaut `auto` par défaut : la boîte aligne son axe horizontal sur la direction du chemin. `ray(45deg)` pointe en haut à droite, à 45° de la verticale dans le sens des aiguilles d'une montre. L'axe horizontal d'une boîte non tournée pointe à droite, à 90°. La boîte tourne donc de 45° − 90° = −45°, un huitième de tour vers la gauche. Avec `ray(90deg)`, les barres restent debout : je l'ai vérifié.

Un enfant est posé dans le repère de son parent : il tourne avec lui, puis de ses propres −45°. Les rotations s'additionnent : `html` −45°, `body` −90°, `<dl>` −135°, `<p>` −180°. J'ai vérifié les directions en colorant la bordure du haut de chaque boîte : quatre barres, quatre directions différentes.

### 4. Huit branches et un trou octogonal

Chaque barre a une branche à chaque bout : huit branches de 20 × 50, tous les 45°. Le milieu bleu nuit fait 39,67 de long, donc chaque branche commence à 19,84px du centre et finit à 69,84px. La barre debout va de y = 80,16 à 219,84.

Le bout de chaque branche est un segment de 20px, à 19,84px du centre. Un octogone régulier dont les côtés sont à 19,84px de son centre a des côtés de 2 × 19,84 × tan(22,5°) = 16,43px. Les bouts sont plus larges : chacun chevauche le suivant et le trou est fermé. C'est cet octogone.

### 5. Les fonds

`html` a un fond : il passe à tout le canevas, c'est le fond bleu nuit de la cible. Les trois autres peignent leur propre fond sur le milieu de leur barre, de la même couleur.

Ces milieux sont peints après les boîtes qui les précèdent dans la page. Là où un coin d'un milieu croise une branche déjà peinte, il laisse un liseré très fin : quand je rends les milieux transparents, 22 pixels changent, tout autour du trou. Le site donne quand même 100 % à la solution.

## Notes de golf

- `<dl><p>` est le plus court pour avoir deux boîtes de bloc, l'une dans l'autre : `<p>` n'a pas besoin de balise fermante, et un second `<p>` fermerait le premier au lieu d'aller dedans.
- `html` et le `body` comptent aussi comme barres : deux balises donnent quatre barres.
- Une seule règle `*` pour toutes les boîtes : ni classe, ni sélecteur par boîte.
- `offset:ray(45deg)` centre et tourne à la fois : ni marge, ni `position`, ni `rotate`.
- `width:20` se passe d'unité en mode quirks.
- `53q` écrit la bordure de 50px en 3 caractères, et `border-block` règle les bordures du haut et du bas en une seule propriété.
- `solid#FBFAE2` se passe d'espace, `ray(45deg` n'est jamais fermé, la règle non plus.
