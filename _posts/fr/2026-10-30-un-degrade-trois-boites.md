---
title: "Un dégradé, trois boîtes : une arche fendue en 127 caractères"
lang: fr
ref: 2026-10-30
permalink: /fr/2026/10/30/un-degrade-trois-boites/
description: "Comment un seul dégradé radial, donné à html, body et un h1, dessine la cible CSS Battle du 30 octobre 2026 : chaque boîte voit le même anneau à sa propre taille et à son propre centre."
target: /assets/targets/2026-10-30.png
target_url: https://cssbattle.dev/play/7320ZxyvTU6UikVfB8kl
colors: ["#cbcc58", "#394257"]
player: evanliomain
chars: 127
score: 719.23
match: 100
code: |
  <h1><style>*{*{margin:0 170-470;height:1440;*{margin:130 10}}background:radial-gradient(25em,#cbcc58 85%,#394257 0 100%,#cbcc58
---

La cible du 30 octobre est le haut d'un large anneau ardoise sur un fond olive, fendu au milieu par une fente verticale, avec un petit carré juste au-dessus de la fente, comme une clé de voûte. Je dessine les trois morceaux avec un seul dégradé. Chaque élément reçoit le même `radial-gradient`, mais chacun le peint centré sur sa propre boîte et à sa propre taille de police : sur `html` c'est l'anneau, sur `body` une fente vide, sur un `<h1>` le carré.

{% include animations/2026-10-30.html lang=page.lang %}

## Le code, aéré

```css
<h1>                                /* un élément gratuit, police de 32px */
* {                                 /* tous les éléments */
  * {                               /* les descendants : body, h1… */
    margin: 0 170 -470;
    height: 1440;
    * {                             /* un niveau plus bas : le h1 */
      margin: 130 10;
    }
  }
  background: radial-gradient(25em, #cbcc58 85%, #394257 0 100%, #cbcc58);
}
```

## Comment ça marche

### 1. Un dégradé pour tout le monde

`*` donne le même fond à tous les éléments. `radial-gradient(25em, …)` a une seule longueur comme taille : c'est un cercle de ce rayon. Les arrêts sont en %, ils suivent donc le rayon :

- olive jusqu'à 85 % du rayon ;
- ardoise de 85 % (le `0` se colle à l'arrêt précédent) à 100 % ;
- olive au-delà.

Sur `html`, la police fait 16px : le rayon vaut 400px et l'anneau va de 340 à 400px. Le fond de `html` part sur le canevas.

### 2. html fait 1100px de haut, sans height

Le dégradé se centre sur la boîte où il est peint. `html` n'a pas de `height` : il enveloppe son contenu. Son enfant `body` commence à y = 130 (la marge haute du `h1`, qui traverse `body`), fait 1440px de haut, et a une marge basse de −470px. `html` s'arrête donc à 130 + 1440 − 470 = 1100.

L'anneau est centré en (200, 550). Son haut est à y = 150 pour le bord extérieur et y = 210 pour le bord intérieur : c'est l'arche qu'on voit. Le reste de l'anneau est loin sous le canevas.

### 3. body, c'est la fente

`* *` vise tous les descendants, donc `body` : `margin:0 170 -470` et `height:1440` en font une bande de 60px de large, de (170, 130) jusqu'à y = 1570. Elle est peinte par-dessus le canevas avec sa propre copie du dégradé, centrée sur sa propre boîte : (200, 850).

Depuis ce centre, tous les points du canevas sont à plus de 400px. Dans le canevas, le `body` est donc tout olive : une fente de 60px à travers l'anneau. Son anneau à lui existe aussi, mais seulement loin sous le canevas.

### 4. h1 : le même anneau, deux fois plus grand

`* * *` vise un niveau plus bas : le `<h1>`. `margin:130 10` en fait une bande de 40px de large dans le `body`, à partir de (180, 130), et il garde `height:1440`. Il a donc le même centre que `body` : (200, 850).

Un `h1` a une police par défaut de 2em, 32px. Pour lui, `25em` vaut donc 800px, et son anneau va de 680 à 800px. Sa bande ardoise commencerait à y = 50, mais la boîte commence à y = 130 : le haut du carré, c'est le bord haut du `h1`. Le bas, c'est le bord intérieur de l'anneau, à y = 850 − 680 = 170.

### 5. Une courbe qui paraît droite

Le bas du carré est en fait un arc de 680px de rayon. Sur les 40px du carré, il ne s'écarte d'une droite que de 0,29px. C'est pour ça qu'on passe par le `h1` : avec la police de 16px, le rayon serait de 340px et la courbe deux fois plus marquée.

Le 1440 n'est pas pris au hasard non plus : il place le centre de `body` et du `h1` à y = 850, pour que 850 − 680 = 170 tombe pile sur le bas du carré, et il donne à `html` 1100px de haut, centrés en 550.

## Notes de golf

- `<h1>` coûte 4 caractères et apporte une police de 32px gratuite : le même `25em` donne un second anneau, plus grand.
- Pas de `height` sur `html` ni de `at` dans le dégradé : la taille des boîtes place tous les centres.
- Les règles imbriquées passent en premier, pour que le code puisse finir au milieu du dégradé : ni `)`, ni `}`.
- `#394257 0 100%` : une couleur avec deux positions, de l'arrêt précédent jusqu'à 100 %.
- `25em` seul veut dire un cercle. `170-470` n'a pas besoin d'espace avant le signe moins, et le mode quirks accepte les nombres sans unité.
