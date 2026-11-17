---
title: "Des pointillés écrasés et étirés : cinq cordes en 112 caractères"
ref: 2026-06-30
permalink: /fr/2026/06/30/des-pointilles-ecrases-et-etires/
description: "Comment les bordures en pointillés de html dessinent deux demi-disques, et comment celles de body, écrasées par 0,07 et étirées 10 000 fois, deviennent cinq bandes, dans la cible CSS Battle du 30 juin 2026."
target: /assets/targets/2026-06-30.png
target_url: https://cssbattle.dev/play/3bZZVPZQWMXqq8yg75W5
colors: ["#62306d", "#f7bed9"]
player: gunnar
chars: 112
score: 737.55
match: 100
code: |
  <style>*{border-inline:35vw dotted#62306D;margin:80-70;*{background:#F7BED9;margin:-573 5e5-573-5e5;scale:1e4.07
---

La cible du 30 juin montre deux demi-disques violets sur fond rose, coupés par les bords gauche et droit, avec cinq fines bandes violettes entre eux. Gunnar Bittersmann dessine tout avec une seule propriété, `border-inline`, en pointillés. Sur html, chaque bordure ne porte qu'un point rond : les deux demi-disques. Sur body, chaque bordure est une haute colonne de cinq points. `scale` écrase body et l'étire 10 000 fois en largeur, et les cinq points deviennent les cinq bandes.

Utilisez la **Vue large** pour voir html dépasser du canevas et la haute colonne de body, et les **Couleurs pédagogiques** pour distinguer les points de html des deux bordures de body.

{% include animations/2026-06-30.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                  /* html, head, style et body */
  border-inline: 35vw dotted#62306D; /* 140px à gauche et à droite, en points ronds */
  margin: 80-70;                     /* html : 540 × 140 en (−70, 80) */
  * {                                /* head, style et body */
    background: #F7BED9;             /* body seul : il passe sur le canevas */
    margin: -573 5e5-573-5e5;        /* body : 280 × 1286, en x = −499 930 */
    scale: 1e4.07                    /* ×10 000 en largeur, ×0,07 en hauteur */
```

## Comment ça marche

### 1. La page

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité vaut des px dans `margin`. Le `<style>` n'est jamais fermé, pas plus que les deux règles.

`*` vise tous les éléments : html, head, style et body. head et style sont masqués : seuls html et body comptent. Le `*{` imbriqué veut dire `* *` : tout élément situé dans un autre. Ce sont head, style et body, pas html. Les deux sélecteurs ont la même spécificité, et l'imbriqué vient après. body prend donc sa marge dans la règle imbriquée, et html garde `margin:80-70`. `border-inline` s'applique aux deux. `background` et `scale` ne touchent que body.

### 2. html, plus large que le canevas

`margin:80-70` se lit 80 en haut et en bas, et −70 à gauche et à droite. `80-70` fait deux nombres : le signe moins commence le second. html fait 400 + 70 + 70 = 540px de large, de x = −70 à 470. En mode quirks, html remplit la hauteur de la fenêtre moins ses marges : 300 − 80 − 80 = 140px, de y = 80 à 220. getBoundingClientRect donne exactement cela.

### 3. Un point par côté

`35vw` vaut 35 % des 400px de large : 140px. `border-inline:35vw dotted#62306D` donne à html une bordure de 140px à gauche, de x = −70 à 70, et une à droite, de x = 330 à 470.

Une bordure en pointillés est une suite de points ronds, aussi larges que la bordure. Ici, chaque côté fait 140px de haut : il n'y a la place que pour un point, un disque de 140px de diamètre. Celui de gauche est centré sur (0, 150), celui de droite sur (400, 150). Les bords du canevas les coupent chacun en deux. Entre les bordures, le contenu de html fait 260px de large, et il est vide.

### 4. Un canevas rose

Le fond est sur body, pas sur html. Quand html n'a pas de fond, le navigateur peint le fond de body sur tout le canevas, et body lui-même n'en peint pas. Le rose est donc sous tout le reste, disques de html compris.

### 5. body, une haute colonne loin à gauche

La règle imbriquée donne à body `margin:-573 5e5-573-5e5` : −573 en haut, 5e5 (500 000) à droite, −573 en bas et −5e5 à gauche.

- Hauteur : en mode quirks, body remplit les 140px de haut de html moins ses propres marges : 140 + 573 + 573 = 1286px. Il commence 573px au-dessus du contenu de html, en y = −493, et finit en y = 793. Son milieu est en y = 150, le milieu de html aussi.
- Largeur : le contenu de html fait 260px de large. 260 + 500 000 − 500 000 − 280 est négatif : le contenu de body fait 0px de large. body n'est que ses deux bordures de 140px : 280px de large.
- Position : sa marge gauche le décale de 500 000px à gauche du contenu de html (x = 70) : body va de x = −499 930 à −499 650.

Chaque bordure de body fait 140px de large et 1286px de haut. Sur une colonne de test de cette taille, Chrome dessine 5 points par bordure, à 0, 286,5, 573, 859,5 et 1146px du haut : un point à chaque bout, et des écarts de 146,5px.

### 6. ×0,07 en hauteur

`scale:1e4.07` contient deux nombres : `1e4` vaut 10 000 en largeur, et `.07` est le facteur en hauteur. Le point commence le second nombre : pas besoin d'espace. La mise à l'échelle se fait autour du centre de body, (−499 790, 150).

En hauteur, body passe à 1286 × 0,07 = 90px : getBoundingClientRect donne y = 104,99 à 195,01. Les points font maintenant 140 × 0,07 = 9,8px de haut, à 286,5 × 0,07 = 20,06px d'écart. Leurs centres arrivent en y = 109,9, 129,9, 150, 170,1 et 190,1.

### 7. ×10 000 en largeur

En largeur, un point en x arrive en −499 790 + (x + 499 790) × 10 000. body fait alors 2 800 000px de large, de x = −1 899 790 à 900 210.

Tout le canevas, de x = 0 à 400, vient d'une bande de 0,04px de large seulement : de 189,98 à 190,02px du bord gauche de body. C'est dans la bordure droite, qui va de 140 à 280px, et 20px à gauche du centre de ses points, à 210px. À cet endroit, chaque point fait 2 × √(70² − 20²) = 134,2px de haut. Écrasée par 0,07, chaque bande fait 9,4px de haut : la première va de y = 105,19 à 114,59.

Les cinq points de la bordure droite deviennent cinq bandes, sur toute la largeur du canevas et bien au-delà. Elles passent aussi sur les disques de html, dans la même couleur. La bordure gauche part loin à gauche, hors du canevas.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- Une seule propriété dessine toute l'image : `border-inline` donne à html ses deux demi-disques et à body ses cinq bandes.
- `35vw` vaut 140px en 4 caractères. `140px` donne la même image en 113.
- `border-inline` ne dessine que les bordures gauche et droite. `border:35vw dotted#62306D` est plus court de 7 caractères (105), mais html et body reçoivent aussi des pointillés en haut et en bas, et 47 024 pixels changent.
- Le fond est dans la règle imbriquée : seul body le reçoit, et le navigateur le passe au canevas, sous les disques. Dans la première règle (toujours 112 caractères), html a aussi un fond, donc body peint le sien. Il est mis à l'échelle avec body : une bande rose de y = 105 à 195 couvre les disques entre les bandes, et 6 604 pixels changent.
- `5e5` vaut 500 000 en 3 caractères. Avec `500000` deux fois, la même image prend 118 caractères.
- La marge droite annule la gauche, et le contenu de body garde 0px de large. Avec `0` à sa place (110 caractères), body fait 500 260px de large, sa bordure droite s'éloigne, et les bandes disparaissent : 13 687 pixels changent.
- `1e4.07` se passe d'espace : le point commence le second nombre. `1e4 .07` donne la même image en 113, et `10000 .07` en 115.
- Un signe moins ou un `#` commence une nouvelle valeur : `80-70`, `5e5-573-5e5`, `dotted#62306D`. Avec des espaces, `80 -70`, `5e5 -573 -5e5` et `dotted #62306D`, la même image prend 116 caractères.
- Rien n'est fermé. `}}</style>` à la fin donne 122 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 3 025 pixels, avec la même règle que dans les notes de golf. 2 732 d'entre eux sont les rangées du haut et du bas des cinq bandes, entre les disques. Dans mon rendu, chaque bande a 8 rangées pleines et une rangée mélangée à chaque bord : en x = 200, y = 105 vaut (134, 83, 136) et y = 114 vaut (172, 119, 162). Dans la cible, chaque bande fait 10 rangées pleines de #62306d, de y = 105 à 114, puis de 125 à 134, et ainsi de suite. Les 293 autres pixels suivent les courbes des disques. Mes bandes sont un peu plus fines que celles de la cible : avec `7e5` à la place de `5e5` (toujours 112 caractères), la tranche passe par le centre des points, les bandes font 9,8px de haut, et 6 des 10 rangées de bord sont identiques à la cible. Mon rendu diffère alors sur 1 381 pixels. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
