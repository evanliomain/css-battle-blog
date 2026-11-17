---
title: "Une bordure, deux épaisseurs : un menu encadré en 130 caractères"
ref: 2026-07-02
permalink: /fr/2026/07/02/une-bordure-deux-epaisseurs/
description: "Comment une seule bordure de 32q fait un cadre de 30px sur html puis, zoomée à 40 %, trois barres de 12px, copiées à gauche, au milieu et à droite par trois ombres, dans la cible CSS Battle du 2 juillet 2026."
target: /assets/targets/2026-07-02.png
target_url: https://cssbattle.dev/play/nXGWhRanLkXsKymyC5xU
colors: ["#fade8b", "#000"]
player: koda_pig
chars: 130
score: 715.87
match: 100
code: |
  <p><p><p><style>&,p{background:#FADE8B;border:32q solid;margin:60 115;p{margin:34 80-9 5;zoom:.4;box-shadow:370q -5q,79q 0,-291q 0
---

La cible du 2 juillet montre un cadre noir sur un fond jaune pâle, avec trois barres noires dedans et trois autres de chaque côté. koda_pig donne à html et à trois p la même règle : un fond jaune, une bordure de `32q` et une marge. Sur html, la bordure est le cadre de 30px. Sur les p, `zoom:.4` réduit la même bordure à 12px : chaque p vide est une barre noire. Trois ombres copient chaque barre au milieu, à gauche et à droite.

Activez **Couleurs pédagogiques** pour voir quelle barre est un p et laquelle est une ombre.

{% include animations/2026-07-02.html lang=page.lang %}

## Le code, aéré

```css
<p><p><p>                  /* trois p, frères dans body */
<style>
&,p {                      /* html (la racine) et les p */
  background: #FADE8B;     /* sur html, il passe au canevas */
  border: 32q solid;       /* 30,24px, dessinée à 30px */
  margin: 60 115;          /* html : 170 × 180 */
  p {                      /* les p, dans body */
    margin: 34 80-9 5;     /* × 0,4 : 13,6 32 −3,6 2 */
    zoom: .4;              /* bordure de 12px : une barre de 60 × 24 */
    box-shadow:
      370q -5q,            /* barres de droite : +139,84, −1,89 */
      79q 0,               /* la fin de la barre du milieu : +29,86 */
      -291q 0              /* barres de gauche : −109,98 */
```

## Comment ça marche

### 1. La page

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité vaut des px dans `margin`. Un p ne peut pas contenir un autre p, donc chaque `<p>` ferme le précédent : les trois p sont frères dans body. Le `<style>` n'est jamais fermé. Il finit dans le troisième p, où il n'est pas affiché.

La règle commence par `&` au premier niveau. Là, `&` désigne la racine du document : html. `&,p` vise donc html et les trois p.

### 2. html fait le cadre

Le fond de html passe au canevas : tout le canevas est `#FADE8B`.

`margin:60 115` laisse à html 400 − 230 = 170px de large. En mode quirks, html remplit aussi la hauteur de la page, moins ses marges : 300 − 120 = 180px. getBoundingClientRect donne (115, 60), 170 × 180.

`32q` vaut 32 quarts de millimètre, 8mm : 30,24px. Mon Chrome dessine la bordure à 30px, et getComputedStyle donne 30px aussi. Le cadre noir va de (115, 60) à (285, 240), et son intérieur jaune de (145, 90) à (255, 210).

### 3. zoom:.4 rétrécit la même bordure

Les p reçoivent tout de `&,p` : le fond, la bordure de 30px et `margin:60 115`. Le `p` imbriqué vise les p qui sont dans html. Il est plus spécifique et vient après : sa marge l'emporte.

`zoom:.4` multiplie chaque longueur du p par 0,4. La bordure passe à 12px. Les marges `34 80-9 5` deviennent 13,6px en haut, 32px à droite, −3,6px en bas et 2px à gauche. `80-9` se lit comme deux nombres, 80 et −9.

Le p est vide, donc son contenu n'a pas de hauteur. Il n'est que ses deux bordures : 24px de haut, tout noir. Son fond jaune ne se voit jamais.

body garde sa marge de 8px : il va de x = 153 à 247, 94px de large. Le p prend cette largeur moins 2px à gauche et 32px à droite : 60px, de x = 155 à 215.

### 4. Trois p, 10px d'écart

Les marges verticales fusionnent. La marge du haut du premier p, 13,6px, rencontre celle de body, 8px : seule la plus grande reste. getBoundingClientRect place le premier p en y = 90 + 13,6 = 103,59, et Chrome le dessine de y = 104 à 128.

Entre deux p, la marge du bas (−3,6px) et celle du haut (13,6px) fusionnent en 13,6 − 3,6 = 10px. Les barres sont dessinées en y = 104, 138 et 172.

### 5. Trois ombres, trois colonnes

Une ombre sans flou est une copie de la boîte. Ici, chaque copie est une barre noire de 60 × 24. Les décalages sont zoomés comme le reste : 1q vaut 0,945px, fois 0,4.

- `79q 0` : 74,65px, donc 29,86px. La copie va de x = 184,86 à 244,86 et chevauche le p. Ensemble, ils font la barre du milieu : 89,86px de large, à partir de x = 155.
- `-291q 0` : −109,98px. La copie va de x = 45,02 à 105,02 : la colonne de gauche.
- `370q -5q` : 139,84px vers la droite et 1,89px vers le haut. La copie va de x = 294,84 à 354,84 : la colonne de droite. Ses barres commencent en y = 102,11, 136,11 et 170,11, un peu plus haut que les autres.

La largeur du p sert donc deux fois : c'est la largeur des barres des côtés, et la barre du milieu est le p plus sa première ombre.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- `&` vaut html en 1 caractère. `html,p` donne la même image en 133.
- Une règle pour deux rôles. Le fond, la bordure et la marge sont écrits une fois, pour html et les p. La règle imbriquée n'a qu'à remplacer la marge des p.
- Un seul zoom rétrécit tout d'un coup : la bordure, les marges et les trois décalages d'ombre. Sans lui, les longueurs exactes `margin:13.6 32-3.6 2;border-width:12;box-shadow:139.84px -1.89px,29.86px 0,-109.98px 0` donnent la même image en 158 caractères.
- `32q` fait une bordure de 30px en 3 caractères. `30px` donne la même image en 131. Un nombre sans unité ne marche pas dans le raccourci `border` : avec `border:30 solid` (129 caractères), toute la déclaration est ignorée. Il n'y a plus ni cadre ni barre, et 32 772 pixels changent.
- Le `-5q` remonte la colonne de droite. Avec `370q 0` (128 caractères), les barres de droite descendent au niveau des autres, et 732 pixels changent.
- Pas d'espace dans `80-9` : le signe moins commence un nouveau nombre. `80 -9` donne la même image en 131.
- Rien n'est fermé. `}}</style>` à la fin donne 140 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 573 pixels, avec la même règle que dans les notes de golf. Ils sont tous sur des bords dessinés par les ombres : 72 dans la colonne x = 244, au bout droit des barres du milieu, et 501 sur les bords des barres de droite. Les décalages d'ombre zoomés ne tombent pas sur des pixels entiers (29,86, 139,84, −1,89) : ces bords sont mélangés dans mon rendu. La cible a des bords nets à ces endroits. Avec des décalages entiers après le zoom, `350px -5px,75px 0,-275px 0` (134 caractères), mon rendu est identique à la cible : 0 pixel diffère. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
