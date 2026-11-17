---
title: "Un quart, en tuiles : un cadre de mise au point en 141 caractères"
ref: 2026-07-20
permalink: /fr/2026/07/20/un-quart-en-tuiles/
description: "Comment une seule règle de bordure dessine un carré et un anneau arrondi, et comment un quart de dégradé répété ne garde que les quatre coins de l'anneau, dans la cible CSS Battle du 20 juillet 2026."
target: /assets/targets/2026-07-20.png
target_url: https://cssbattle.dev/play/hPsHm8UmVeeb0xCAounD
colors: ["#f7ec7d", "#682988"]
player: pindaros
chars: 141
score: 704.33
match: 100
code: |
  <style>*{border:5vw solid#F7EC7D;margin:90 140;*{background:#682988;margin:-70;border-radius:42q;mask:conic-gradient(red 25%,#0000 0)58q -58q
---

La cible du 20 juillet ressemble à une icône de mise au point : un carré jaune creux, entouré de quatre coins jaunes arrondis, sur un fond violet. Pindaros la dessine avec une seule règle de bordure, donnée à html et à body. La bordure de html fait le carré. Celle de body fait un anneau arrondi, plus grand, autour. Un masque ne garde ensuite que les quatre coins de l'anneau : son image est un seul quart opaque, un peu décalé et répété.

Choisissez **Vue large** pour voir les tuiles du masque, qui dépassent du canevas, et cochez **Couleurs pédagogiques** pour distinguer la bordure de html de celle de body.

{% include animations/2026-07-20.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                            /* tous les éléments : html, puis body */
  border: 5vw solid#F7EC7D;                    /* une bordure jaune de 20px, pour les deux */
  margin: 90 140;                              /* html : 120 × 120 en (140, 90) */
  * {                                          /* dans html : body */
    background: #682988;                       /* peint sur le canevas : html n'a pas de fond */
    margin: -70;                               /* body : 220 × 220 en (90, 40) */
    border-radius: 42q;                        /* 39,69px */
    mask: conic-gradient(red 25%,#0000 0)58q -58q   /* un quart opaque, décalé de 54,80px à droite et en haut, répété */
```

## Comment ça marche

### 1. Deux éléments, une règle

Il n'y a pas de doctype : la page est en mode quirks. La balise style n'est jamais fermée, donc tout ce qui suit `<style>` est du CSS.

`*` vise tous les éléments : html, head, la balise style et body (le navigateur ajoute ceux qui manquent). head et style ne sont pas affichés. Le `*{…}` imbriqué veut dire `* *` : tout élément placé dans un autre. C'est body (et encore head et style).

Les deux règles ont la même spécificité, et la règle imbriquée vient après. body prend donc sa marge dans la règle imbriquée. La bordure ne vient que de la règle extérieure : html et body ont tous les deux `border:5vw solid#F7EC7D`. 5vw font 5 % des 400px de large : 20px.

### 2. html : le carré creux

En mode quirks, un nombre sans unité compte en px dans `margin`. html reçoit `margin:90 140` : 90px en haut et en bas, 140px sur les côtés.

En mode quirks, html remplit la fenêtre, moins ses marges. Il fait 400 − 280 = 120 de large et 300 − 180 = 120 de haut. getBoundingClientRect donne 120 × 120 en (140, 90). Avec sa bordure de 20px, le milieu est un trou de 80 × 80, de (160, 110) à (240, 190). C'est le carré creux de la cible.

### 3. body : un anneau arrondi de 220 × 220

body est placé dans le milieu de html, 80 × 80. Sa marge `margin:-70` repousse ses bords de 70px de chaque côté. En mode quirks, body remplit aussi la hauteur de html, moins ses propres marges. Il fait donc 80 + 140 = 220 de large et 220 de haut. getBoundingClientRect donne 220 × 220 en (90, 40).

body a la même bordure jaune de 20px : c'est un anneau autour du carré. `border-radius:42q` arrondit ses coins : 1q vaut un quart de millimètre, 0,945px, donc 42q font 39,69px. Le bord intérieur de l'anneau est arrondi lui aussi, avec 39,69 − 20 = 19,69px.

### 4. Le fond de body va au canevas

`background:#682988` est dans la règle imbriquée : seul body le reçoit. html n'a pas de fond. Dans ce cas, le navigateur peint le fond de body sur tout le canevas, et pas dans la boîte de body. Les 400 × 300 pixels sont violets, y compris le milieu de html. La boîte de body ne peint que sa bordure.

### 5. Le masque : un quart opaque

Un masque ne garde un élément que là où l'image du masque est opaque. Il ne lit que l'opacité : `red` est juste une couleur opaque, et `#0000` est complètement transparent.

`conic-gradient(red 25%,#0000 0)` tourne dans le sens des aiguilles d'une montre autour du centre de l'image, en partant du haut. Les premiers 25 % du tour sont rouges. Le `0` place l'arrêt suivant à 0 %, ramené à 25 % : à partir de là, tout est transparent, avec un bord net. La partie rouge est le quart en haut à droite de l'image.

L'image a la taille de la boîte de body, 220 × 220. Son quart rouge est un carré de 110 × 110 : x = 200 à 310, y = 40 à 150. Avec le masque seul, à sa position par défaut, il ne reste que ce quart de l'anneau.

### 6. Décalé et répété : quatre coins

L'image du masque se répète dans les deux sens, tous les 220px : c'est le comportement par défaut. `58q -58q` la décale de 54,80px vers la droite et de 54,80px vers le haut. La tuile qui était sur la boîte de body commence maintenant en (144,80, −14,80), et il y a une copie tous les 220px.

- Le quart rouge de cette tuile couvre x = 254,80 à 364,80 et y = −14,80 à 95,20 : le coin en haut à droite de body.
- La tuile à sa gauche commence en x = −75,20. Son quart rouge couvre x = 34,80 à 144,80 : le coin en haut à gauche.
- Les tuiles du dessous commencent en y = 205,20. Leurs quarts rouges couvrent y = 205,20 à 315,20 : les deux coins du bas.

Le masque est coupé à la boîte de body, de (90, 40) à (310, 260). Il reste quatre morceaux de l'anneau, d'environ 55 × 55 chacun : x = 90 à 144,80 et 254,80 à 310, y = 40 à 95,20 et 205,20 à 260. Chacun a un coin arrondi et deux bras droits. Le masque ne s'applique qu'à body : le carré de html reste entier.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand un de ses canaux bouge de plus de 8.

- Une seule bordure pour deux formes. Le `*` extérieur donne à html et à body la même `border:5vw solid#F7EC7D` de 23 caractères. La copie de html fait le carré, celle de body fait l'anneau. La règle imbriquée ne règle que ce qui change.
- Le masque se répète par défaut : un seul quart fait quatre coins. Avec `no-repeat` en plus (151 caractères), il ne reste que le coin en haut à droite, et 4 807 pixels changent. Sans la position (133 caractères), le masque garde le quart en haut à droite de l'anneau, avec des bras de 110px, et 6 967 pixels changent.
- `58q` vaut 54,80px en 3 caractères, là où `55px` en prend 4 : `55px -55px` donne 143 caractères. Les nombres sans unité ne marchent pas ici, même en mode quirks : avec `55 -55` (139 caractères), Chrome ignore toute la déclaration du masque, l'anneau entier se voit, et 9 138 pixels changent.
- Le fond est dans la règle imbriquée. Dans la règle extérieure, le code a la même longueur, mais c'est html qui reçoit le fond. Le fond de body est alors peint dans sa propre boîte, et le masque le garde dans les quatre zones des coins. Ces zones chevauchent les quatre coins du carré de html : des encoches violettes les entament, et 120 pixels changent.
- Le masque ne lit que l'opacité, donc `red` suffit : `#f00` donne 142 caractères pour la même image. `#0000` est transparent en 5 caractères : `transparent` donne 147. L'arrêt `0` est plus court que de répéter `25%` (143 caractères, même image).
- `5vw` vaut 20px en 3 caractères, et `42q` vaut 39,69px en 3 : `20px` donne 142 caractères pour la même image, et le rayon rond le plus proche, `40px`, prend lui aussi 4 caractères.
- Des nombres sans unité dans `margin` : `90px 140px` et `-70px` donnent 147 caractères, pour la même image. Pas d'espace non plus dans `solid#F7EC7D` (142 caractères avec).
- Rien n'est fermé. Fermer les deux règles et la balise style avec `}}</style>` donne 151 caractères, 10 de plus, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, 489 pixels diffèrent de la cible de plus de 8 sur un canal. 160 d'entre eux sont sur quatre lignes : x = 144 et 254, y = 95 et 205, là où s'arrêtent les bras des coins. 58q vaut 54,80px, pas 55 : les bras s'arrêtent à 0,20px de la grille des pixels. Sur ces lignes, mes pixels mélangent le jaune et le violet, là où la cible a des couleurs unies. Avec `55px -55px` à la place de `58q -58q` (143 caractères), ces 160 pixels sont identiques à la cible. Les 329 autres sont le long des bords courbes des coins. J'ai essayé des rayons de 38px à 42px : aucun ne les rend identiques. Sur le juge de CSS Battle, le code est identique à 100 %.
