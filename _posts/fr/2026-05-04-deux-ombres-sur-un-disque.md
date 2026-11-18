---
title: "Deux ombres sur un disque : un moulin en 119 caractères"
ref: 2026-05-04
permalink: /fr/2026/05/04/deux-ombres-sur-un-disque/
description: "Comment un radial-gradient de 1Q sur html peint un disque net de rayon 100, et comment un body vide et ses deux box-shadow en couvrent deux quarts, dans la cible CSS Battle du 4 mai 2026."
target: /assets/targets/2026-05-04.png
target_url: https://cssbattle.dev/play/AHCJGXarSjHdWGQsM7pc
colors: ["#4c4c6b", "#ebf6ef", "#4a9a86"]
player: emohdaziz
chars: 119
score: 728.67
match: 100
code: |
  .<style>&{*{margin:150 50%10 100;color:4A9A86;box-shadow:25vw 0,0-35vw}background:radial-gradient(1Q,#4c4c6b,25vw,#6B82
---

La cible du 4 mai est un moulin sur un fond vert très pâle : deux rectangles verts, un en haut à gauche et un en bas à droite, et deux quarts de disque sombres dans les deux autres coins du carré qu'ils partagent. Mohamed Ali peint un seul disque sombre sur tout le canevas avec le fond de html. Ensuite body, une boîte vide, et ses deux ombres vertes couvrent deux quarts de ce disque.

Avec **Couleurs pédagogiques**, la boîte de html, celle de body et les deux ombres prennent leur propre couleur.

{% include animations/2026-05-04.html lang=page.lang %}

## Le code, aéré

```css
.                            /* du texte : body commence ici */
<style>
& {                          /* au premier niveau, & est la racine : html */
  * {                        /* les éléments dans html : head, style, body */
    margin: 150 50%10 100;   /* body : 100 × 140 en (100, 150) */
    color: 4A9A86;           /* pas besoin de # en mode quirks */
    box-shadow:
      25vw 0,                /* une copie 100px à droite */
      0-35vw;                /* une copie 140px plus haut */
  }
  background: radial-gradient(
    1Q,                      /* un cercle de rayon 0,945px */
    #4c4c6b,                 /* sombre dès 0 */
    25vw,                    /* un repère à 100px */
    #6B82                    /* #66bb8822, avancé jusqu'à 100px */
  /* la fin du code ferme le dégradé et les deux règles */
```

## Comment ça marche

### 1. Un point de texte

Le code commence par `.`, avant `<style>`. Un point est du texte, et le texte va dans body : l'analyseur ouvre body pour lui, et le `<style>` qui suit va aussi dans body. Sans le point, mon Chrome met le `<style>` dans head.

Le point compte pour la mise en page. Avec lui, mon rendu donne à html une boîte de 400 × 300. Dans une copie de test sans le point (118 caractères), mon Chrome donne à html 385 × 440, avec une barre de défilement verticale, et le disque descend : 13 555 pixels changent.

### 2. html et son fond

`&` au premier niveau d'une feuille de style désigne la racine, html. html est la racine : son fond est peint sur tout le canevas, et placé sur la boîte de html, 400 × 300 en (0, 0).

Pour ce fond, mon Chrome donne cette valeur calculée :

`radial-gradient(1q, rgb(76, 76, 107), 25vw, rgba(102, 187, 136, 0.133))`

### 3. Un disque de rayon 100

Un dégradé radial dont la taille est une seule longueur est un cercle de ce rayon, centré sur la boîte : ici en (200, 150). 1Q est un quart de millimètre : 96 / 25,4 / 4 = 0,945px.

La liste qui suit se lit ainsi :

- `#4c4c6b` sans position : la première couleur part de 0.
- `25vw` seul, après une virgule : un repère, le point où le mélange entre les deux couleurs qui l'entourent est fait à moitié. vw vaut 1 % des 400px de large : 25vw = 100px.
- `#6B82` sans position : la dernière couleur se place à 100 % du rayon, 0,945px. Un arrêt ne peut pas revenir avant un arrêt ou un repère précédent : il est avancé jusqu'à 100px.

Le repère et le dernier arrêt sont maintenant tous les deux à 100px. Le repère est tout au bout du mélange : le sombre reste sombre jusqu'à 100px, et le bord est net. Après le dernier arrêt, la dernière couleur continue jusqu'aux bords du canevas.

`#6B82` est la forme courte de `#66bb8822` : le vert `#66bb88` avec une opacité de 0x22 = 34/255, soit 13,3 %. Sur le blanc de la page, cela donne 255 − 153 × 34/255 = 234,6, 255 − 68 × 34/255 = 245,9 et 255 − 119 × 34/255 = 239,1. Mon rendu peint ces pixels pâles avec quatre valeurs proches : (235, 246, 239), `#ebf6ef`, est la plus fréquente, et les autres sont à un niveau près.

### 4. `*` dans `&`, et les marges de body

`*{…}` est imbriqué dans `&{…}` : il vise les éléments dans html, c'est-à-dire head, style et body. Mon Chrome donne aussi la marge et les ombres à head et à style, mais ils ne sont pas affichés. Seul body se voit.

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Les longueurs sans unité y sont des px, et body remplit html, moins ses marges. `margin:150 50%10 100` donne quatre valeurs : 150 en haut, 50 % à droite, 10 en bas, 100 à gauche. Une marge horizontale en % est une part de la largeur du parent : 50 % de 400 = 200.

body fait donc 400 − 100 − 200 = 100 de large et 300 − 150 − 10 = 140 de haut. Mon rendu le place en (100, 150).

body n'a pas de fond. À travers lui, on voit le fond de html : le quart en bas à gauche du disque, de y = 150 à 250, puis le vert pâle de 250 à 290.

### 5. Deux ombres

`color:4A9A86` donne sa couleur à body. En mode quirks, une couleur peut s'écrire sans son `#`. Une ombre sans couleur prend celle de l'élément : les deux ombres sont vertes, `#4a9a86`.

- `25vw 0` décale une copie de body de 100px vers la droite : 100 × 140 en (200, 150). Elle couvre le quart en bas à droite du disque.
- `0-35vw`, c'est `0` puis `-35vw` : une copie décalée de 140px vers le haut, en (100, 10). Elle couvre le quart en haut à gauche.

Une ombre n'est jamais peinte sous sa propre boîte : body laisse toujours voir son quart. Rien ne couvre le quart en haut à droite. Les deux rectangles verts et les deux quarts sombres se touchent en (200, 150).

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul dégradé dessine les deux quarts, et une seule liste d'ombres dessine les deux rectangles. Le body vide fait le reste : il laisse voir le disque.
- `1Q` fait 2 caractères : Q est la seule unité de longueur d'une seule lettre. La taille doit juste être une longueur : avec `1px` (120 caractères) ou `25vw` (121 caractères), l'image est la même. Avec `0` (118 caractères), mon Chrome ne peint pas de disque, et 15 713 pixels changent. Sans taille (116 caractères), le dégradé est une ellipse qui va jusqu'au coin le plus loin, le dernier arrêt reste loin, le sombre se fond dans le vert, et 90 727 pixels changent.
- Le repère `25vw` repousse le dernier arrêt jusqu'à 100px. Écrit comme un arrêt, `#4c4c6b 25vw,#6B82`, il a la même longueur et donne la même image. Sans lui, `radial-gradient(1Q,#4c4c6b,#6B82` (114 caractères), le sombre s'arrête à 0,945px, et 15 713 pixels changent.
- `25vw` et `35vw` font 4 caractères pour 100px et 140px. Avec `100px` dans le dégradé (120 caractères), ou `100px 0,0-140px` dans les ombres (121 caractères), l'image est la même.
- `#6B82` fait 5 caractères pour le vert pâle que montre le canevas. Avec `#ebf6ef` (7 caractères, 121 en tout) ou `#66bb8822` (9 caractères, 123 en tout), l'image est la même.
- `50%10` n'a pas besoin d'espace : un nombre peut suivre `%` directement. Avec `margin:150 200 10 100` (120 caractères), l'image est la même. De même, `0-35vw` n'a pas besoin d'espace avant le moins : avec `0 -35vw` (120 caractères), l'image est la même.
- En mode quirks, les longueurs n'ont pas besoin d'unité ni la couleur de `#`. Avec `150px 50%10px 100px` (125 caractères) ou `#4A9A86` (120 caractères), l'image est la même.
- `&{` a trois caractères de moins que `html{` : avec `html{` (122 caractères), l'image est la même. Imbriquer `*` dedans laisse html hors de la marge et des ombres. Avec `*{…}` au premier niveau et `&{background:…}` après (119 caractères), html les reçoit aussi, et 76 273 pixels changent.
- Le code s'arrête au milieu du dégradé et de deux règles : la fin du code les ferme. Avec `)}` à la fin (121 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes rectangles et quarts de disque au même endroit que la cible. 1 502 pixels diffèrent de plus de 8 niveaux, tous à moins de 9px d'un bord des formes. La cible a des ondulations le long des bords, avec des couleurs qui ne sont dans aucune des formes : en (99, 100), à côté du rectangle en haut à gauche, elle a (239, 241, 240), et le fond pâle autour vaut (235, 246, 240). Le plus grand écart est de 147 niveaux, en (101, 167), sur le bord du quart en bas à gauche : pâle dans mon rendu, sombre dans la cible.

Sept de ces pixels viennent du point. Mon rendu le dessine en vert en (101..103, 162..164), dans le quart en bas à gauche ; la cible est sombre à cet endroit. Dans une copie de test où chaque élément dans html reçoit `font-size:0` (131 caractères), ces 7 pixels deviennent sombres et aucun autre pixel ne change. Les aplats sont à un niveau près de la cible : (74, 154, 134) pour le vert dans mon rendu, (75, 154, 133) dans la cible, et (76, 76, 107) pour le sombre, (76, 77, 107) dans la cible. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
