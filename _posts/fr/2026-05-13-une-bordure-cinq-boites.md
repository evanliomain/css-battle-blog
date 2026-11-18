---
title: "Une bordure, cinq boîtes : des barres de signal en 175 caractères"
ref: 2026-05-13
permalink: /fr/2026/05/13/une-bordure-cinq-boites/
description: "Comment une bordure sans couleur, des marges imbriquées et deux images vides zoomées dessinent six barres et deux carrés, dans la cible CSS Battle du 13 mai 2026."
target: /assets/targets/2026-05-13.png
target_url: https://cssbattle.dev/play/8VgMy7qqi4u44ItDZTvm
colors: ["#6592cf", "#eee", "#173889"]
player: koenh
chars: 175
score: 675.45
match: 100
code: |
  <p><img><img><style>*{background:#6592CF;border-inline:32q solid;color:eee;margin:50 20;padding:30 0;+*{color:173889}*{margin:0 10-30;img{margin:30 0;zoom:.67;+*{translate:5lh
---

La cible du 13 mai montre des barres blanches et bleu marine sur un fond bleu, comme des barres de signal, en miroir : trois barres de chaque côté, de plus en plus courtes vers le milieu, et un petit carré contre chaque barre intérieure. KoenH donne à tous les éléments la même règle : une bordure à gauche et à droite sans couleur, une marge et un padding. La bordure prend la `color` de chaque élément : html, body et p s'emboîtent en six barres. Deux images vides, réduites par `zoom:.67`, deviennent les deux carrés.

Les **Couleurs pédagogiques** montrent les boîtes de html, body et p, qui ont toutes la couleur du canevas.

{% include animations/2026-05-13.html lang=page.lang %}

## Le code, aéré

```css
<p><img><img>                    /* p, avec deux images vides dedans */
<style>
* {                              /* tous les éléments */
  background: #6592CF;           /* html : tout le canevas ; les autres : la même couleur */
  border-inline: 32q solid;      /* à gauche et à droite, ≈ 30px, de la couleur de color */
  color: eee;                    /* des barres blanches */
  margin: 50 20;                 /* en px en mode quirks : html en (20, 50) */
  padding: 30 0;                 /* 30 en haut et en bas */
  + * {                          /* * + * : body, la seconde image, style */
    color: 173889;               /* des barres bleu marine */
  }
  * {                            /* * * : tout ce qui est dans html */
    margin: 0 10 -30;            /* 10 sur les côtés, −30 en bas */
    img {                        /* * * img : les deux images */
      margin: 30 0;              /* pas de marges de côté, 30 en haut */
      zoom: .67;                 /* toutes les longueurs × 0,67 */
      + * {                      /* * * img + * : la seconde image */
        translate: 5lh           /* 5 hauteurs de ligne vers la droite ; la fin du code ferme le reste */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `50` dans une marge est lu en px, et une couleur peut s'écrire sans son `#`.

Le navigateur construit html, head et body autour du code. body contient p, et p contient les deux images et le `<style>` : aucune balise n'est fermée. head et style ne s'affichent pas.

Les règles sont imbriquées. `*` vise tous les éléments. Le `+*` dedans vaut `* + *` : un élément juste après un frère. Le `*` dedans vaut `* *` : tout élément contenu dans un autre, donc tout sauf html. Le `img` dedans vaut `* * img`, les deux images, et son `+*` vaut `* * img + *` : l'élément juste après une image, la seconde image. Le code s'arrête dans cinq règles ouvertes, et la fin du code les ferme.

### 2. Une bordure sans couleur

Chaque élément reçoit `border-inline:32q solid` : une bordure à gauche et à droite. 1q vaut un quart de millimètre, environ 0,945px : 32q ≈ 30,24px. Mon Chrome la dessine sur 30px de large.

La bordure n'a pas de couleur : elle prend la `color` de l'élément. `*` donne à tous `color:eee` : blanc. `* + *` donne `color:173889`, bleu marine, à body (juste après head), à la seconde image (juste après la première) et à style. html, p et la première image restent blancs.

Chaque élément reçoit aussi `background:#6592CF`. Le fond de html peint tout le canevas. Les autres boîtes peignent la même couleur par-dessus : elles sont invisibles.

### 3. html, body et p : six barres

`margin:50 20` place html en (20, 50), 400 − 40 = 360 de large. Ses barres sont blanches, de x = 20 à 50 et de 350 à 380. Son `padding:30 0` descend son contenu en y = 80.

body reçoit `margin:0 10-30` de `* *`. Il commence 10 après la barre gauche de html, en haut du contenu de html : (60, 80), 280 de large. Ses barres sont bleu marine, de x = 60 à 90 et de 310 à 340.

p fait pareil dans body : (100, 110), 200 de large, des barres blanches de x = 100 à 130 et de 270 à 300. p est le premier enfant de body : `* + *` ne le vise pas.

### 4. Toutes les barres finissent en y = 250

Chaque boîte a 30 de padding en bas, et p et body ont une marge de −30 en bas. La marge négative de p annule le padding du bas de body, et celle de body annule celui de html. Les trois boîtes finissent ensemble : dans mon Chrome, en y = 250,375, dessinées jusqu'en y = 250.

Sans le `-30`, avec `margin:0 10`, body finit 30 plus bas que p, et html 60 plus bas. Dans mon rendu de cette variante, les barres bleu marine descendent jusqu'en y = 280, et les barres blanches de html jusqu'en bas du canevas.

### 5. Deux images zoomées

Les images reçoivent tout ce qui précède, puis `margin:30 0` et `zoom:.67`. `zoom` réduit toutes les longueurs de l'élément. La bordure de 32q fait 20px à l'écran, le padding de 30 fait 30 × 0,67 = 20,1, et la marge du haut de 30 aussi 20,1.

Une `<img>` sans source n'a ici pas de contenu : mon Chrome mesure chaque image à 40 × 40,19, juste ses deux bordures et son padding. Chaque image est donc un carré de sa couleur : blanc pour la première, bleu marine pour la seconde.

`margin:30 0` remplace le `0 10 -30` de `* *` : pas de marges de côté, donc la première image touche la barre gauche de p en x = 130. Sa marge du haut la place en y = 140 + 20,1 ≈ 160. Les images sont en ligne, côte à côte : la première de x = 130 à 170, la seconde de 170 à 210.

### 6. translate:5lh

`* * img + *` donne à la seconde image `translate:5lh`. `lh` est la hauteur de ligne de la police de l'élément : `5lh` vaut cinq hauteurs de ligne. Dans la cible, le carré bleu marine va de x = 230 à 270, 60px à droite de sa place, contre la barre droite de p. Le résultat est le miroir du côté gauche.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une bordure pour cinq boîtes. Sans couleur dans `border-inline`, chaque boîte prend sa propre `color`. Avec les couleurs écrites dans les bordures, `border-inline:32q solid#eee` sans `color:eee`, et `+*{border-color:173889}` (176 caractères), l'image est la même.
- `32q` écrit environ 30px en 3 caractères. `border-inline` n'accepte pas de nombre seul : avec `border-inline:30 solid` (174 caractères), mon Chrome abandonne la bordure, tout le canevas est bleu uni, et 33 600 pixels changent. Avec `30px` (176 caractères), l'image est la même.
- Un seul `zoom:.67` réduit d'un coup la bordure, le padding et la marge des images. Sans lui, chaque longueur doit s'écrire à sa taille finale : avec `img{margin:20 0;padding:20 0;border-width:0 20px;+*{translate:60px` (200 caractères), mon rendu est identique à la cible.
- `5lh` écrit le décalage en 3 caractères. `translate` est lui aussi réduit par le zoom : avec `translate:60px` (176 caractères), le carré ne bouge que de 40,2px, et 1 640 pixels diffèrent de la cible. La valeur en px qui donne 60px à l'écran est `89.55px` (179 caractères).
- Un seul `-30` aligne le bas de toutes les barres, et `10-30` n'a pas besoin d'espace avant le signe moins. Avec `0 10 -30` (176 caractères), l'image est la même.
- Des couleurs sans `#`, grâce au mode quirks. Avec `color:#eee` et `color:#173889` (177 caractères), l'image est la même.
- Des nombres seuls dans les marges et le padding, grâce au mode quirks. Avec `px` sur chacun d'eux (188 caractères), l'image est la même.
- Les règles imbriquées écrivent `* + *`, `* *`, `img` et `img + *` sans répéter de sélecteur. Avec les mêmes règles à plat, `<p><img><img><style>*{background:#6592CF;border-inline:32q solid;color:eee;margin:50 20;padding:30 0}*+*{color:173889}* *{margin:0 10-30}img{margin:30 0;zoom:.67}img+*{translate:5lh` (181 caractères), l'image est la même.
- Le code s'arrête dans cinq règles ouvertes, et la fin du code les ferme. Avec `}}}}}` à la fin (180 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, le code officiel ne donne pas tout à fait la cible. Le carré bleu marine arrive de x = 235 à 275, 5px à droite du carré de la cible, et 400 pixels diffèrent. Dans mon Chrome, `5lh` sur l'image zoomée vaut 97,01px dans les unités de l'image, soit 97,01 × 0,67 = 65px à l'écran. Avec `89.55px` à la place de `5lh`, soit 60px à l'écran, mon rendu est identique à la cible, pixel pour pixel. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
