---
title: "Quatre ombres, retournées : huit rectangles en 146 caractères"
ref: 2026-08-13
permalink: /fr/2026/08/13/quatre-ombres-retournees/
description: "Comment une seule liste de quatre box-shadow, sur html et sur un body étiré et retourné par une échelle négative, dessine les huit rectangles de la cible CSS Battle du 13 août 2026."
target: /assets/targets/2026-08-13.png
target_url: https://cssbattle.dev/play/03BN1qoufCW2Lj4bz6Em
colors: ["#4c4c6b", "#fae29e", "#4a9a86"]
player: gabriele19
chars: 146
score: 699.48
match: 100
code: |
  <style>*{background:#4C4C6B;color:4A9A86;margin:125 190;box-shadow:95q 5ch#FAE29E,-95q -5ch#FAE29E,95q -5ch,-95q 5ch;*{margin:-7-8;scale:1.39-1.88
---

La cible du 13 août montre quatre paires de rectangles sur un fond gris-violet, une dans chaque coin : un grand et un petit, vert et jaune, avec les couleurs inversées d'un coin à l'autre. Gabriele dessine les huit avec les quatre mêmes box-shadow. Sur html, elles font les quatre petits rectangles. Sur body, étiré et retourné par `scale:1.39-1.88`, elles font les quatre grands.

Cochez **Couleurs pédagogiques** pour voir html et body, qui ont la couleur du canevas.

{% include animations/2026-08-13.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* tous les éléments : html, head, style, body */
  background: #4C4C6B;       /* le canevas ; body l'a aussi */
  color: 4A9A86;             /* un hexa sans # (mode quirks) */
  margin: 125 190;           /* html : 400 − 380 = 20 de large, 300 − 250 = 50 de haut */
  box-shadow:
    95q 5ch #FAE29E,         /* 95q = 89,76px, 5ch = 40px */
    -95q -5ch #FAE29E,
    95q -5ch,                /* sans couleur : currentcolor, le vert */
    -95q 5ch;
  * {                        /* tout élément dans un autre : body (head et style sont cachés) */
    margin: -7 -8;           /* body : 20 + 16 = 36 de large, 50 + 14 = 64 de haut */
    scale: 1.39 -1.88        /* 50,04 × 120,32, la tête en bas */
```

## Comment ça marche

### 1. Une règle pour html et body

Le code n'a ni balise html, ni head, ni body : Chrome les ajoute. `*` vise tous les éléments : html, head, style et body. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre, donc head, style et body. head et style ne s'affichent pas. Il reste deux boîtes : html reçoit la règle extérieure, et body reçoit les deux. body prend le même fond et les quatre mêmes ombres que html. La règle imbriquée change seulement sa marge et ajoute une échelle.

Le fond de html peint tout le canevas en `#4C4C6B`. body a la même couleur : il est invisible.

### 2. html fait 20 × 50

Il n'y a pas de doctype : la page est en mode quirks, et les nombres sans unité comme `margin:125 190` sont des px. J'ai vérifié avec `<!doctype html>` devant : le rendu ne ressemble plus à la cible.

`margin:125 190` donne à html 125px en haut et en bas, et 190px à gauche et à droite. Sa largeur est ce qui reste : 400 − 2 × 190 = 20px. En mode quirks, html remplit aussi la hauteur de la page, moins ses marges : 300 − 2 × 125 = 50px. getBoundingClientRect donne (190 ; 125), 20 × 50. J'ai vérifié la règle de hauteur avec `margin:100 190` : html fait alors 100px de haut.

### 3. Quatre ombres font les petits rectangles

Une ombre sans flou est une copie de la boîte, déplacée. Chaque ombre de html est un rectangle de 20 × 50.

- `95q` : `q` est un quart de millimètre. 1q = 96 / 101,6 = 0,945px, donc 95q = 89,76px. getComputedStyle donne 89,7638px.
- `5ch` : `ch` est la largeur du chiffre 0 dans la police de l'élément. getComputedStyle donne 40px pour 5ch dans mon Chrome.

Les quatre ombres vont en (190 ± 89,76 ; 125 ± 40) : x = 100,24 ou 279,76, y = 85 ou 165. Deux sont `#FAE29E`, en bas à droite et en haut à gauche. Les deux autres n'ont pas de couleur. Une ombre sans couleur prend `currentcolor`, la couleur du texte : `color:4A9A86`. En mode quirks, `color` accepte un hexa sans son `#`. J'ai vérifié : sans `color:4A9A86`, ces deux ombres sont noires, la couleur du texte par défaut.

### 4. body fait 36 × 64, avec les mêmes ombres

La règle imbriquée met la marge de body à −7px en haut et en bas, et −8px sur les côtés. Des marges négatives rendent body plus grand que html. Sa largeur est 20 + 2 × 8 = 36px. En mode quirks, body remplit aussi la hauteur de html, moins ses marges : 50 + 2 × 7 = 64px. Sans l'échelle, getBoundingClientRect donne (182 ; 118), 36 × 64. Avec `margin:100 190`, body fait 114px de haut, soit 100 + 14.

body a les quatre mêmes ombres, ici en 36 × 64. Sans l'échelle, elles couvrent les ombres de html, dans les mêmes couleurs. body est peint par-dessus html : je l'ai vérifié en donnant `color:red` à body, et ses deux ombres sans couleur couvrent les ombres vertes de html.

### 5. L'échelle étire body et ses ombres

`scale:1.39-1.88` se lit comme deux valeurs : 1,39 en largeur et −1,88 en hauteur. Une échelle agit autour du centre de la boîte : le centre de body est (200 ; 150). body passe à 36 × 1,39 = 50,04px de large et 64 × 1,88 = 120,32px de haut. getBoundingClientRect donne (174,98 ; 89,84), 50,04 × 120,32.

Les ombres font partie de body : elles sont mises à l'échelle avec lui, décalages compris. 89,76 × 1,39 = 124,77px en largeur, 40 × 1,88 = 75,2px en hauteur. Les grands rectangles vont de x = 50,21 à 100,25 et de 299,75 à 349,79, et de y = 14,64 à 134,96 et de 165,04 à 285,36.

### 6. Le signe moins inverse les couleurs

Une échelle négative retourne aussi body, la tête en bas. Chaque décalage vertical de ses ombres change de signe : l'ombre jaune en `95q 5ch` monte de 75,2px au lieu de descendre. Elle arrive en haut à droite, alors que l'ombre jaune de html, avec les mêmes décalages, est en bas à droite.

J'ai vérifié avec `scale:1.39 1.88`, sans le signe moins : chaque grand rectangle est alors à côté d'un petit de la même couleur. Avec −1,88, chaque grand est à côté d'un petit de l'autre couleur, comme dans la cible.

Sur les bords communs, les grands rectangles finissent en x = 100,25 et commencent en x = 299,75, et les petits commencent en 100,24 et finissent en 299,76. Ils se chevauchent de 0,01px, et body est peint par-dessus.

## Notes de golf

- Une seule liste d'ombres, écrite une fois, dessine huit rectangles : `*` la donne à html et à body.
- body n'a pas besoin de sa propre couleur : il reçoit de `*` le fond du canevas, qui le cache.
- Deux ombres n'ont pas de couleur et prennent `color:4A9A86`. Avec `#4A9A86` écrit dans les deux ombres à la place, et sans `color`, le code fait 147 caractères, pour le même rendu, au pixel près.
- `5ch` fait 3 caractères pour 40px. Avec `40px` dans les quatre décalages, le code fait 150 caractères, pour le même rendu.
- `95q` fait 3 caractères pour 89,76px.
- Pas besoin d'espace dans `5ch#FAE29E`, `-7-8` ou `1.39-1.88` : le `#` et les signes moins commencent une nouvelle valeur.
- Deux accolades restent ouvertes, `*{` et `*{`, et il n'y a pas de `</style>`. Avec `}}`, le code fait 148 caractères ; avec `}}</style>`, 156. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les rectangles sont là où la cible les a, mais leurs bords tombent entre deux pixels : par exemple, le haut des grands rectangles est en y = 14,64, et le bord de la cible est sur un pixel entier. 1 560 pixels diffèrent de la cible, dont 1 362 de plus de 8 niveaux. Tous sont sur une ligne ou une colonne qui contient un bord de rectangle. Le plus grand écart est de 75 niveaux, en (100 ; 85), là où un grand rectangle touche un petit : mon rendu y est (175, 181, 143), et la cible (250, 226, 158). Sur le juge de CSS Battle, le code est identique à 100 %.
