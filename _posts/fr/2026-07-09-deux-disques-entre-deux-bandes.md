---
title: "Deux disques entre deux bandes : un pont en 132 caractères"
ref: 2026-07-09
permalink: /fr/2026/07/09/deux-disques-entre-deux-bandes/
description: "Comment les bordures haute et basse de html dessinent la barre et les piliers, comment un radial-gradient en tuiles au rayon de 1Q pose deux disques translucides sur le canevas, et comment body, étiré très bas par une marge négative, coupe la bande du bas et cache son propre disque sous le canevas, dans la cible CSS Battle du 9 juillet 2026."
target: /assets/targets/2026-07-09.png
target_url: https://cssbattle.dev/play/h3l8ESz0rxoqQDKXESq7
colors: ["#0a3156", "#c0ffad"]
player: eguiluz
chars: 132
score: 713.68
match: 100
code: |
  <style>*{margin:0 110-430;background:radial-gradient(1Q,#8F68 53Q,#0a3156)40vw/70vh 9in}&{border-block:5ch solid#c0ffad;margin:80 40
---

La cible du 9 juillet ressemble à un pont : une barre vert pâle sur un fond bleu nuit, deux piliers carrés dessous, et entre les deux, de chaque côté, un disque. David Eguiluz dessine la barre et les piliers avec les bordures haute et basse de html. Le fond de html, un dégradé radial en tuiles, peint les deux disques sur le canevas. body reçoit le même fond, mais il est poussé si bas que son propre disque tombe sous le canevas : sur le canevas, il ne peint que du bleu, et ce bleu coupe la bande du bas en deux.

Cochez **Couleurs pédagogiques** pour voir la bordure de html en orange et body en violet, et passez en **Vue large** pour voir body descendre jusqu'en y = 610.

{% include animations/2026-07-09.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, head, style, body */
  margin: 0 110-430;             /* 0 en haut, 110 à gauche et à droite, -430 en bas */
  background:
    radial-gradient(1Q,          /* un cercle de 0,945px de rayon */
      #8F68 53Q,                 /* vert translucide jusqu'à 50,08px */
      #0a3156)                   /* bleu nuit à partir de 50,08px */
    40vw/70vh 9in                /* en x = 160px, des tuiles de 210 × 864 */
}
& {                              /* html */
  border-block: 5ch solid#c0ffad;  /* 40px de vert en haut et en bas */
  margin: 80 40                  /* 80 en haut et en bas, 40 à gauche et à droite */
```

## Comment ça marche

### 1. Quatre éléments, dont deux affichés

Pas de doctype : la page est en mode quirks, et les nombres sans unité sont des px. La page a html, head, le style et body. head et le style ne sont pas affichés.

Le `*` leur donne à tous la même marge et le même fond. Au premier niveau d'une feuille de style, `&` désigne la racine de la page : html. Il compte comme une classe, donc il bat `*` : html garde le fond, mais sa marge devient `80 40`.

### 2. html, deux bandes

Avec 80px en haut et en bas et 40px à gauche et à droite, html fait 320 × 140, en (40, 80) : en mode quirks, html remplit la hauteur de la page moins ses marges, 300 − 160 = 140.

`border-block`, c'est la bordure du haut et du bas. `5ch` vaut cinq fois la largeur d'un `0` dans la police par défaut, Times en 16px : 8px chacun, donc 40px. La bande du haut va de y = 80 à 120, celle du bas de y = 180 à 220, toutes deux de x = 40 à 360. À l'intérieur, le contenu de html fait 320 × 60, en (40, 120).

### 3. Un cercle de 1Q de rayon

html est l'élément racine : son fond est peint sur tout le canevas. Mais ses tuiles se placent à partir de la boîte de html, sous la bordure : la zone de 320 × 60 en (40, 120).

`radial-gradient(1Q,` donne la taille du dégradé : une seule longueur, c'est un cercle de ce rayon. 1Q fait 0,945px. Les arrêts de couleur qui suivent sont des distances au centre, et ils ne dépendent pas de cette taille.

`#8F68 53Q`, c'est le vert du centre jusqu'à 53Q, 50,08px. `#0a3156` n'a pas de position : il se met à 100 %, la fin du rayon, 0,945px. Un arrêt ne peut pas venir avant le précédent : il remonte à 50,08px. Le vert s'arrête là, avec un bord net, et le bleu nuit remplit le reste de la tuile.

### 4. Des tuiles de 210 × 864

Après le `/`, `70vh 9in` donne la taille d'une tuile : 70 % des 300px de haut, soit 210px de large, et 9 pouces, soit 864px de haut. Avant le `/`, `40vw` donne la position : 40 % des 400px de large, 160px depuis le bord gauche de la zone de html. Un bord de tuile tombe en x = 40 + 160 = 200. Les tuiles se répètent : l'une va de x = −10 à 200, la suivante de 200 à 410. Il n'y a qu'une valeur de position, donc la tuile est centrée en hauteur sur la zone de 60px : son centre est en y = 150.

Chaque tuile a son disque en son centre : en (95, 150) et (305, 150), de 50,08px de rayon. Ils vont de x = 44,92 à 145,08 et de 254,92 à 355,08, et de y = 99,92 à 200,08. Les bandes les couvrent au-dessus de y = 120 et sous y = 180 : entre les bandes, on dirait deux boules. Dans mon rendu, la rangée y = 150 est verte de x = 45 à 144 et de 255 à 354. Les tuiles suivantes, centrées en x = −115 et 515, sont hors du canevas. Celles du dessus et du dessous sont à 864px.

### 5. Un vert translucide

`#8F68`, c'est `#88ff66` à 53 % d'opacité (0x88 sur 255). Derrière le canevas, la page est blanche. 53 % de (136, 255, 102) sur du blanc donnent (191,5, 255, 173,4) : `#c0ffad`, le vert des bandes, à un cran près. Dans mon rendu, les disques sont en (192, 255, 174) et (191, 255, 173), et les bandes en (192, 255, 173).

### 6. body, poussé vers le bas

body reçoit la marge du `*` : 0 en haut, 110 à gauche et à droite, −430 en bas. Dans les 320px de html, il reste 100px : body va de x = 150 à 250. En mode quirks, body remplit la hauteur de html moins ses marges : 60 − (−430) = 490px. getBoundingClientRect donne (150, 120), 100 × 490. body descend jusqu'en y = 610, bien sous le canevas.

body est dessiné au-dessus de la bordure de html. Son bleu couvre la bande du bas entre x = 150 et 250 : il reste deux piliers, de x = 40 à 150 et de 250 à 360.

### 7. Le disque de body

body a le même fond, calé sur sa propre boîte. En largeur, sa tuile commence en 150 + 160 = 310 ; la précédente va de x = 100 à 310, donc son disque est en x = 205, en plein dans body. Mais en hauteur, la tuile de 864px est centrée sur les 490px de body : son centre est en y = 120 + 490 / 2 = 365. Le disque va de y = 314,92 à 415,08, sous le canevas. La tuile du dessus met son disque en y = 365 − 864 = −499. Sur le canevas, body ne montre que du bleu.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&` vise html en 1 caractère. `html` donne la même image en 135.
- `#8F68` donne le vert des bandes en 5 caractères, grâce à son opacité sur le blanc de la page. `#c0ffad` donne la même image en 134.
- `1Q,` rend le cercle minuscule : le 100 % du bleu tombe avant 53Q et remonte là. Le bord est net. Sans lui (129 caractères), le dégradé est une ellipse qui touche les coins de la tuile. Le bleu n'arrive qu'au bout, et le vert s'y fond sur tout le canevas : les 87 144 pixels bleus changent tous.
- `53Q` fait 50,08px en 3 caractères. `50px` (133 caractères) change 16 pixels, sur les bords des disques.
- `40vw` et `70vh` font 160px et 210px. Dans mon Chrome, un nombre sans unité n'est pas accepté dans le raccourci `background` : avec `160` ou `210` (131 caractères), tout le fond saute. Le canevas devient blanc, et body ne coupe plus la bande du bas : 98 400 pixels changent.
- `9in` fait 864px en 3 caractères. Sans hauteur (128 caractères), la tuile n'est pas plus haute que la zone de html, 60px : chaque disque est coupé en une tranche de 60px, et les tranches s'empilent en deux colonnes vertes. 29 784 pixels changent. `3in` (288px) est trop court : le disque de la tuile du dessus de body descend jusqu'en y = 127 et se montre en haut de l'espace entre les piliers, 248 pixels. `4in` donne la même image que `9in`, avec les mêmes 3 caractères.
- `-430` rend body très haut. Avec `margin:0 110` (128 caractères), body ne fait que 60px de haut : il ne couvre plus la bande du bas, et son propre disque, centré cette fois en (205, 150), se montre entre les disques, d'un vert plus sombre. 9 476 pixels changent.
- `110-430` : le signe moins termine le `110`, donc pas besoin d'espace.
- `5ch` fait 40px en 3 caractères. `40px` donne la même image en 133.
- `solid#c0ffad` : pas d'espace avant le `#`.
- Rien n'est fermé. `}</style>` à la fin donne 141 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les bords droits tombent sur les mêmes pixels que dans la cible. Mais 115 892 pixels diffèrent de mon rendu. 84 695 d'entre eux sont des pixels bleu nuit à un niveau près : (10, 49, 86) dans mon rendu, c'est-à-dire `#0a3156`, et (10, 50, 86) dans la cible. Le fichier de la cible que j'ai est un JPEG. 1 480 pixels diffèrent de plus de 8 niveaux, et tous sont à 7px au plus d'un bord. Le plus grand écart est de 210 niveaux, en (138, 174), sur le bord du disque de gauche : mon rendu y est vert, la cible presque bleu nuit. Dans la cible, les disques vont un peu plus loin à gauche et un peu moins loin à droite : 51 pixels de leurs bords changent de couleur, tous à moins de 0,4px du cercle. Sur le juge de CSS Battle, le code est identique à 100 %.
