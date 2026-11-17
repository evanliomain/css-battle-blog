---
title: "Une bordure pour tous : une pellicule en 135 caractères"
ref: 2026-08-09
permalink: /fr/2026/08/09/une-bordure-pour-tous/
description: "Comment une seule règle de bordure, partagée par html, body et deux img vides grâce à trois niveaux de *, dessine les bandes, les barres et les rectangles blancs de la cible CSS Battle du 9 août 2026."
target: /assets/targets/2026-08-09.png
target_url: https://cssbattle.dev/play/QTeWMIkTXmaFuhHHvNZ8
colors: ["#594c94", "#9D92C8", "#FFF"]
player: levito
chars: 135
score: 710.47
match: 100
code: |
  <img><img><style>*{margin:50 90;border:11q solid;color:9D92C8;*{margin:-10-130;background:#594C94;*{scale:4.5 6;margin:80 100;color:FFF
---

La cible du 9 août est violette. Deux bandes lavande la traversent en haut et en bas, deux courtes barres lavande les relient, et deux rectangles blancs sont posés sur les barres : on dirait une pellicule. Veit Lehmann donne la même bordure à tous les éléments. html dessine un cadre, body est étiré plus large que le canevas pour que sa bordure fasse les longues bandes, et deux img vides deviennent les rectangles blancs.

Choisissez la **Vue large** pour voir les côtés de body hors du canevas, et cochez **Couleurs pédagogiques** pour distinguer la bordure de html de celle de body.

{% include animations/2026-08-09.html lang=page.lang %}

## Le code, aéré

```css
<img><img>                  /* deux img vides, placées dans body */
<style>
* {                         /* html, head, body, les deux img, style */
  margin: 50 90;            /* html : 220 × 200 en (90 ; 50) */
  border: 11q solid;        /* 11q = 10,39px, dessinée sur 10px */
  color: 9D92C8;            /* hexa sans # : la couleur de la bordure */
  * {                       /* head, body, les deux img, style */
    margin: -10-130;        /* body : 460 × 200 en (−30 ; 50) */
    background: #594C94;    /* le fond de body : tout le canevas */
    * {                     /* les deux img et style */
      scale: 4.5 6;         /* 20 × 20 → 90 × 120 */
      margin: 80 100;       /* carrés en (80 ; 140) et (300 ; 140) */
      color: FFF;           /* bordures blanches */
```

## Comment ça marche

### 1. Trois niveaux de `*`

Il n'y a ni balise html, ni head, ni body dans le code : Chrome les ajoute. Une `<img>` ne peut pas aller dans head, donc Chrome ouvre body à cet endroit, et les deux img et l'élément style se retrouvent tous dans body. J'ai vérifié : le parent de style est body.

`*` vise tous les éléments : html, head, body, les deux img et style. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre, donc tous sauf html. Le troisième veut dire `* * *` : les éléments dans body (head est vide), donc les deux img et style. head et style ne s'affichent pas : seuls html, body et les deux img dessinent quelque chose.

Il n'y a pas de doctype, donc la page est en mode quirks. Un nombre sans unité, comme `50 90`, est en px. Avec `<!doctype html>` devant, 48 988 pixels changent.

### 2. html : le cadre

`margin:50 90` laisse à html 400 − 2 × 90 = 220px de large. En mode quirks, html remplit aussi la hauteur de la page moins ses marges : 300 − 2 × 50 = 200px. getBoundingClientRect donne (90 ; 50), 220 × 200.

`border:11q solid` : 1q vaut 96 / 101,6 = 0,945px, donc 11q = 10,39px. Chrome arrondit une épaisseur de bordure au pixel inférieur : getComputedStyle donne `10px`. J'ai vérifié : avec `10px` ou `10.9px` à la place de `11q`, le rendu est le même, au pixel près.

La bordure n'a pas de couleur : elle prend la `color` de l'élément. C'est `9D92C8`, sans `#`. En mode quirks, Chrome accepte une couleur hexadécimale sans son `#` pour `color`. En mode standard, il ignore la déclaration : j'ai vérifié avec un doctype, la couleur reste noire.

html dessine donc un cadre lavande de 10px, de (90 ; 50) à (310 ; 250).

### 3. body : les longues bandes

body reçoit la même bordure, et `margin:-10-130`. Sans marges, body serait l'intérieur de html : (100 ; 60), 200 × 180. Les marges négatives le font sortir de 130px de chaque côté : 200 + 2 × 130 = 460px de large, de x = −30 à 430. En mode quirks, body remplit la hauteur de html moins ses propres marges : 180 + 2 × 10 = 200px, de y = 50 à 250. getBoundingClientRect donne (−30 ; 50), 460 × 200.

La bordure du haut de body va de y = 50 à 60, pile sur celle de html, et celle du bas de y = 240 à 250, pile sur celle de html. Elles vont de x = −30 à 430 : elles traversent tout le canevas. Les côtés de body, en x = −30 et 420, sont hors du canevas. Sans la marge de body, 30 600 pixels changent.

Les côtés de html restent visibles entre les bandes : ce sont les deux courtes barres, en x = 90 et 300.

### 4. Le violet : le fond de body sur le canevas

Le deuxième niveau donne aussi `background:#594C94` à body, head, aux img et à style. html n'en reçoit pas : getComputedStyle donne un fond transparent.

Quand html n'a pas de fond, le navigateur peint le fond de body sur tout le canevas, et non dans la boîte de body. C'est le violet partout, même hors de body. Sans `background:#594C94`, 89 200 pixels changent : tous les pixels violets deviennent blancs.

Les img reçoivent le même fond, mais leur contenu est vide et leur bordure opaque : il ne se voit jamais.

### 5. Deux carrés blancs

Une `<img>` sans source n'a rien à montrer : getComputedStyle donne une largeur et une hauteur de 0px. Avec sa bordure de 10px, chaque img est un carré de 20 × 20. Le troisième niveau donne `color:FFF` : la bordure est blanche.

img est en ligne : les deux carrés se suivent sur la ligne de body, sans espace entre eux (il n'y en a pas entre les balises). L'intérieur de body commence en x = −30 + 10 = −20, et `margin:80 100` met 100px de chaque côté de chaque carré :

- le premier carré commence en −20 + 100 = 80 ;
- le second en 80 + 20 + 100 + 100 = 300.

En hauteur, 80 + 20 + 80 = 180, la hauteur de l'intérieur de body. La ligne commence en y = 60, donc les carrés commencent en 60 + 80 = 140. Sans scale, getBoundingClientRect donne (80 ; 140) et (300 ; 140), tous deux en 20 × 20. Avec `margin:0 100`, 28 800 pixels changent.

### 6. scale : 4.5 6

`scale:4.5 6` agrandit chaque carré depuis son centre, (90 ; 150) et (310 ; 150) : 20 × 4,5 = 90 de large et 20 × 6 = 120 de haut. getBoundingClientRect donne (45 ; 90) et (265 ; 90), tous deux en 90 × 120.

Les rectangles descendent jusqu'à y = 210 et cachent le milieu des côtés de html. Il ne reste que 30px de chaque barre au-dessus, de y = 60 à 90, et 30px en dessous, de 210 à 240. Sans `scale:4.5 6`, 20 800 pixels changent.

## Notes de golf

- Une seule `border:11q solid` sert à tout le monde : le cadre de html, les bandes de body et les carrés des img. La couleur de la bordure suit `color` : `color:FFF` au troisième niveau suffit à rendre les carrés blancs.
- `11q` fait 3 caractères pour une bordure de 10px. `10px` donne le même rendu, en 136 caractères.
- `9D92C8` et `FFF` économisent chacun un `#`. Le `#` reste dans `background:#594C94` : avec `background:594C94`, le canevas devient blanc dans mon Chrome. `background-color:594C94` marche, mais coûte 5 caractères de plus.
- `-10-130` n'a pas besoin d'espace : le signe moins commence un nouveau nombre. `-10 -130` donne le même rendu.
- Une `<img>` est une boîte de 0 × 0 gratuite : 5 caractères, sans balise fermante. La bordure seule lui donne sa taille.
- `scale` prend deux facteurs : une seule propriété transforme un carré de 20 × 20 en rectangle de 90 × 120.
- Trois accolades, toutes des `*{`, restent ouvertes, et il n'y a pas de `</style>`. Avec `}}}`, le code fait 138 caractères ; avec `}}}</style>`, 146. Le rendu est le même.
