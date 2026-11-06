---
title: "Les outlines par-dessus : un haltère en 168 caractères"
lang: fr
ref: 2026-11-05
permalink: /fr/2026/11/05/les-outlines-par-dessus/
description: "Comment des ombres étalées, des ombres intérieures et des outlines peintes en dernier dessinent la cible CSS Battle du 5 novembre 2026 : trois carrés encadrés reliés par une barre."
target: /assets/targets/2026-11-05.png
target_url: https://cssbattle.dev/play/eVDTpEDAax8ajhL2S1iD
colors: ["#ebf6f0", "#4a9a86", "#ec4c"]
player: benjamintordjman
chars: 168
score: 680.66
match: 100
code: |
  <img><img><style>*{color:EBF6F0;outline:11q solid;box-shadow:inset 0 1in,0 0 0 5vw#4A9A86;background:#ec4c;margin:150 71;*{padding:15;margin:-30 99;*{margin:0-375 0 115
---

La cible du 5 novembre est une rangée de trois carrés blanc cassé sur un fond moutarde : un grand au milieu, deux plus petits sur les côtés. Une barre les relie à mi-hauteur, et un cadre vert fait le tour de la forme entière. La solution de Benjamin Tordjman donne une seule liste de règles à quatre éléments. Chacun reçoit une ombre verte et un remplissage crème. Puis les outlines, que le navigateur peint en dernier, tracent la barre crème par-dessus les bords verts et relient les carrés.

Cochez **Couleurs pédagogiques** pour distinguer les ombres intérieures crème et les outlines, et passez en **Vue large** pour voir où irait la seconde `<img>` sans sa marge négative.

{% include animations/2026-11-05.html lang=page.lang %}

## Le code, aéré

```css
<img><img>                        /* deux boîtes vides, dans le body */
<style>
* {                               /* tous les éléments */
  color: EBF6F0;                  /* crème, repris par l'ombre et l'outline */
  outline: 11q solid;             /* 10px, couleur du texte */
  box-shadow:
    inset 0 1in,                  /* remplit la boîte avec la couleur du texte */
    0 0 0 5vw #4A9A86;            /* vert, 20px tout autour */
  background: #ec4c;              /* le jaune du canevas */
  margin: 150 71;                 /* html */
  * {                             /* body (et les img) */
    padding: 15;
    margin: -30 99;
    * {                           /* les deux img */
      margin: 0 -375 0 115;
    }
  }
}
```

## Comment ça marche

### 1. html est une ligne

`*` vise tous les éléments : `html`, le `body` ajouté par le navigateur, et les deux `<img>`. Les règles imbriquées remplacent ensuite la marge des plus profonds. `html` garde `margin:150 71` : il fait 400 − 2 × 71 = 258px de large. CSS Battle tourne en mode quirks, où `html` remplit la fenêtre moins ses marges : 300 − 2 × 150 = 0. La boîte de `html` est une ligne de 258 × 0 en y = 150.

Son fond part sur tout le canevas. `#ec4c` est une couleur hexadécimale à quatre chiffres : `#eecc44` avec une opacité de `cc`, soit 80 %. Posée sur la page blanche, elle donne `#f1d669`. La cible est en `#f2d66c` : assez proche pour 100 % de ressemblance.

### 2. Une ombre étalée fait la barre verte

`0 0 0 5vw` est une ombre sans décalage ni flou, étalée de 5vw. Le canevas fait 400px de large, donc 5vw vaut 20px. Autour de la ligne de 258 × 0, l'ombre est une bande verte de 298 × 40 en (51, 130).

La première ombre, `inset 0 1in`, se dessine à l'intérieur de la boîte. `html` n'a pas de hauteur : ici, elle ne montre rien.

### 3. Le body : un carré de 60 × 60 sur la ligne

Le `body` reçoit `padding:15` et `margin:-30 99`. Sa largeur vaut 258 − 2 × 99 = 60px, padding compris. Sa hauteur vient elle aussi du mode quirks : le `body` remplit `html` moins ses propres marges, 0 − (−30 − 30) = 60px. Je l'ai vérifié en retirant les deux `<img>` : le `body` reste à 60 × 60. Sa boîte de marge fait −30 + 60 − 30 = 0 de haut : `html` reste une ligne, et le carré se pose centré dessus, de (170, 120) à (230, 180).

Son ombre verte fait 100 × 100. Son ombre intérieure est décalée de 96px vers le bas (`1in`). Une ombre intérieure remplit l'intérieur de la boîte, moins une copie de la boîte déplacée du décalage. Déplacée de 96px, cette copie rate entièrement la boîte de 60px : tout le carré est rempli. L'ombre n'a pas de couleur, elle prend donc celle du texte : crème. Elle recouvre le fond jaune du `body`.

### 4. Deux balises img vides

Une `<img>` sans source ne mesure rien. Avec `padding:15`, chacune fait 30 × 30. Elles sont en ligne : elles se posent sur la première ligne du `body`, en haut de son contenu, y = 135. La première commence 115px après le bord gauche du contenu (x = 185) : x = 300. Elle reçoit les deux mêmes ombres : un carré vert de 70 × 70 avec un intérieur crème.

### 5. Une marge droite négative place la seconde à gauche

Les deux `<img>` reçoivent la même `margin:0 -375 0 115`. La première finit en x = 330, et sa marge droite de −375px ramène le curseur de la ligne en x = −45. La seconde ajoute ses 115px de marge gauche et se pose en x = 70. C'est le symétrique de la première autour de x = 200 (300 → 330 et 70 → 100), sans aucun sélecteur pour les distinguer.

### 6. Les outlines sont peintes en dernier

`outline:11q solid` n'a pas de couleur : elle est crème, elle aussi. 11q, ce sont 11 quarts de millimètre, soit 10,4px. Chrome arrondit l'épaisseur d'une outline au pixel inférieur : le rendu avec `10px` est identique, au pixel près.

L'ordre compte. Dans une page comme celle-ci, le navigateur peint d'abord tous les fonds, ombres et boîtes, puis les outlines. Chaque outline passe donc par-dessus toutes les ombres :

- autour de `html`, une boîte de 0px de haut, l'outline est une barre crème pleine de 278 × 20 en (61, 140). Elle passe sur les bords verts des trois carrés : la barre entre dans chacun ;
- autour du `body`, elle porte le crème à 80 × 80, dans un cadre vert de 10px ;
- autour de chaque `<img>`, elle porte le crème à 50 × 50, dans un cadre vert de 10px aussi.

Sans les outlines, les carrés crème sont plus petits de 20px, et une simple bande verte les relie.

## Notes de golf

- `color:EBF6F0` n'a pas de `#` : le mode quirks accepte une couleur hexadécimale sans lui. La couleur est écrite une fois, et l'ombre intérieure comme l'outline la reprennent.
- `inset 0 1in` remplit une boîte avec la couleur du texte. Le `background` est déjà pris par le jaune, qui part de `html` sur le canevas.
- `#ec4c` fait 5 caractères, contre 7 pour `#f2d66c`. À 80 % sur du blanc, il tombe assez près de la cible.
- `11q` a un caractère de moins que `10px` et trace les mêmes 10px. `outline:10 solid` ne marche pas : le mode quirks accepte les nombres sans unité pour les marges, les paddings et les bordures, pas pour les outlines.
- `5vw` vaut 20px en 3 caractères.
- `<img><img>` donne deux boîtes pour 10 caractères. Vides, elles se réduisent à leur padding.
- `5vw#4A9A86` et `0-375` se passent d'espace : le `#` et le signe moins terminent le mot d'avant.
- `<style>` n'est jamais fermé.
