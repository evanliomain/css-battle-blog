---
title: "Un contour, quatre barres : une croix creusée en 146 caractères"
ref: 2026-08-15
permalink: /fr/2026/08/15/un-contour-quatre-barres/
description: "Comment une ombre, un contour pointillé et une bordure épaisse aux coins creusés dessinent la croix et les quatre barres de la cible CSS Battle du 15 août 2026."
target: /assets/targets/2026-08-15.png
target_url: https://cssbattle.dev/play/qdiV2eKiBihdqV4XlG9i
colors: ["#d9bb61", "#fff", "#394257"]
player: h_blierzt
chars: 146
score: 699.48
match: 100
code: |
  <style>&{margin:65 115;box-shadow:0 0 0 5ch#D9BB61;outline:dashed 53q#FFF;*{margin:10;border-radius:5ch;corner-shape:scoop;border:solid 74q#394257
---

La cible du 15 août montre une croix bleu nuit sur fond blanc, avec quatre morsures arrondies dans ses coins. Quatre barres moutarde l'entourent : une en haut, une en bas, une de chaque côté. H_Bliertz dessine les barres avec une seule ombre sur html et un contour pointillé blanc qui cache les coins de cette ombre. La croix, c'est body : une bordure si épaisse qu'elle remplit la boîte, avec `corner-shape:scoop` qui creuse les coins.

Cochez **Couleurs pédagogiques** pour voir les tirets du contour et les boîtes vides de html et de body.

{% include animations/2026-08-15.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                                /* la racine : html */
  margin: 65 115;                  /* html fait 170 × 170, à partir de (115, 65) */
  box-shadow: 0 0 0 5ch #D9BB61;   /* 40px d'extension dorée tout autour */
  outline: dashed 53q #FFF;        /* tirets blancs de 50px sur les coins */
  * {                              /* tout ce qui est dans html : body s'affiche */
    margin: 10;                    /* body fait 150 × 150, à partir de (125, 75) */
    border-radius: 5ch;            /* coins de 40px */
    corner-shape: scoop;           /* creusés vers l'intérieur */
    border: solid 74q #394257      /* 69px : la bordure remplit la boîte */
```

## Comment ça marche

### 1. Deux boîtes en mode quirks

Au premier niveau d'une feuille de style, `&` désigne l'élément racine : html. Le `*` imbriqué dedans désigne tous les éléments contenus dans html. head et style ne s'affichent pas : seul body se voit.

Il n'y a pas de doctype : la page est en mode quirks. Les nombres sans unité, comme `margin:65 115` et `margin:10`, sont lus en px. En mode quirks, html est aussi étiré à la hauteur du canevas, et body à la hauteur de html. Mesures prises avec getBoundingClientRect :

- html : 400 − 2 × 115 = 170px de large, 300 − 2 × 65 = 170px de haut, à partir de (115 ; 65).
- body : 170 − 2 × 10 = 150px de côté, à partir de (125 ; 75).

J'ai vérifié avec `<!doctype html>` devant : les marges sans unité sont ignorées, html fait 400px de large et 154px de haut, et le dessin s'effondre.

html n'a pas de fond : le canevas reste blanc.

### 2. Un cadre doré tiré d'une ombre

`box-shadow:0 0 0 5ch#D9BB61` n'a ni décalage ni flou, seulement une extension. 1ch est la largeur du 0 dans la police par défaut : 8px. 5ch font donc 40px ; getComputedStyle donne une extension de 40px.

L'ombre est la boîte de html agrandie de 40px de chaque côté : 250 × 250, de (75 ; 25) à (325 ; 275). Une ombre externe n'est pas peinte sous sa propre boîte. Ce qui se voit, c'est un cadre doré de 40px de large autour d'un carré blanc de 170 × 170.

### 3. Un contour pointillé coupe le cadre en quatre barres

Le contour entoure la boîte de bordure de html. `53q` : 1q est un quart de millimètre, 0,945px, donc 53q font 50,08px. getComputedStyle donne 50px. Le contour couvre de 65 à 335 sur les deux axes : une bande de 50px, longue de 270px de chaque côté. La bande de l'ombre, de 75 à 115, tient dedans.

Un trait pointillé a besoin de tirets et de trous. Sur chaque côté de 270px, Chrome met un tiret sur les deux coins, long de 100px, et laisse un trou de 70px au milieu : 100 + 70 + 100 = 270. Je l'ai mesuré avec un contour rouge. Avec d'autres épaisseurs, les tirets faisaient aussi deux fois l'épaisseur : 90px pour 45px, 98px pour 49px, 102px pour 51px, 110px pour 55px.

Le contour est peint au-dessus de l'ombre. Les tirets blancs cachent les coins du cadre, et l'ombre ne se voit que par les quatre trous : quatre barres dorées de 70 × 40, au milieu de chaque côté. Les tirets blancs sur le canevas blanc sont invisibles.

### 4. Une bordure qui remplit la boîte

`border:solid 74q#394257` : 74q font 69,92px, et getComputedStyle donne 69px. body fait 150px de large : la bordure laisse 150 − 2 × 69 = 12px au milieu. Sans rayon, c'est ce que je vois : un carré sombre avec un trou blanc de 12 × 12 au centre.

### 5. Des coins creusés

`border-radius:5ch` donne des coins de 40px. `corner-shape:scoop` retourne la courbe vers l'intérieur : chaque coin est entaillé par un quart de cercle de 40px centré sur le coin de la boîte. Les coins mordent donc dans la croix : de (125 ; 75) à (165 ; 115) en haut à gauche, et de même aux trois autres coins.

### 6. Les arcs intérieurs referment le trou

Le bord intérieur de la bordure suit les coins creusés. Autour de chaque coin, il devient un arc de rayon 40 + 69 = 109px, centré sur ce coin. Tout ce qui est à moins de 109px d'un coin est de la bordure.

Le centre de body, (200 ; 150), est à 75 × √2 = 106,07px de chaque coin. C'est moins que 109 : le centre est dans la bordure, comme tout le trou de 12px. Le trou disparaît et la croix est pleine.

J'ai vérifié ce modèle par le rendu :

- Avec une bordure de 60px, les arcs font 100px. Un trou en étoile apparaît au milieu. Sur la ligne du milieu, il va du pixel 191 au pixel 208, les deux pixels du bout en partie couverts : les cercles de 100px s'arrêtent en x = 191,14 et 208,86.
- Avec la bordure de 69px et des rayons plus petits, le trou rétrécit quand le rayon grandit. Avec un rayon de 34px, il va de x = 196 à 203 ; avec 36px, il reste quatre pixels pâles ; avec 37px, plus rien ne se voit. Les arcs atteignent le centre à 106,07 − 69 = 37,07px.

## Notes de golf

- `&{…*{…` vise html et tout ce qu'il contient avec deux caractères de sélecteur. Avec `html{…}body{…`, le code fait 153 caractères et donne le même rendu.
- Les nombres sans unité sont des px en mode quirks : `65 115` et `10`.
- `5ch` vaut 40px en 3 caractères, et sert deux fois. Avec `40px` aux deux endroits, le code fait 148 caractères.
- `53q` donne un contour de 50px en 3 caractères. L'épaisseur compte : avec 49px, les barres font 72px de large, avec 51px, 68px, et 256 pixels d'aplat sont faux.
- `74q` donne une bordure de 69px en 3 caractères. Il suffit qu'elle soit assez épaisse pour que les arcs referment le trou, et assez fine pour tenir : j'ai vérifié 67, 68, 70 et 75px, sans aucun pixel d'aplat faux. Avec 60px, un trou apparaît ; avec 80px, la forme est fausse.
- La bordure fait le travail d'un fond. `background:#394257` serait plus court de 5 caractères, mais html n'a pas de fond, donc le fond de body peint tout le canevas : j'ai vérifié, le canevas devient tout bleu nuit.
- Une couleur en `#` peut suivre une unité sans espace : `5ch#D9BB61`, `53q#FFF`, `74q#394257`. Avec des espaces, le code fait 149 caractères.
- Deux accolades restent ouvertes, `&{` et `*{`, et il n'y a pas de `</style>`. Avec `}}`, le code fait 148 caractères ; avec `}}</style>`, 156. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les barres, les bords droits et le centre plein tombent sur les mêmes pixels que dans la cible. Mais 412 pixels diffèrent de mon rendu, dont 206 de plus de 8 niveaux. Tous sont sur les quatre coins creusés, répartis le long des courbes entières. Pour 186 d'entre eux, mon rendu est plus sombre que la cible. Le plus grand écart est de 184 niveaux, en (239 ; 206), sur la courbe en bas à droite : mon rendu y est (71, 79, 99), et la cible est blanche. Sur le juge de CSS Battle, le code est identique à 100 %.
