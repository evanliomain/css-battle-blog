---
title: "Des ombres partagées et un o en pointillés : le mot pop en 155 caractères"
ref: 2026-07-29
permalink: /fr/2026/07/29/des-ombres-partagees-et-un-o-en-pointilles/
description: "Comment deux ombres, données à html et à body, dessinent les deux p de la cible CSS Battle du 29 juillet 2026, et comment une bordure en pointillés dessine le o."
target: /assets/targets/2026-07-29.png
target_url: https://cssbattle.dev/play/PnDXitrVaUCdncId6g1x
colors: ["#a84a4b", "#f5e3b5"]
player: kieron
chars: 155
score: 691.3
match: 100
code: |
  <style>*{background:#A84A4B;margin:110 55%60 160;color:F5E3B5;box-shadow:25vw 0,-30vw 0;*{margin:0-80 50 0;border-radius:0 2in 2in 0;border-left:5pc dotted
---

La cible du 29 juillet écrit « pop » en beige sur un fond rouge brun. Chaque p a une hampe carrée et une panse ronde, et le o est un disque. Kieron la dessine avec deux éléments et une seule liste de deux ombres. Sur html, une boîte fine et haute, les ombres dessinent les hampes. Sur body, une boîte plus large au côté droit arrondi, les mêmes ombres dessinent les panses. La bordure gauche de body, large de 80px et en pointillés, est un seul point rond : le o.

Cochez **Couleurs pédagogiques** pour distinguer les ombres de html, body et sa bordure.

{% include animations/2026-07-29.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                               /* html et body (head et style sont masqués) */
  background: #A84A4B;            /* html : la couleur du canevas */
  margin: 110 55%60 160;          /* html : 20 × 130 en (160 ; 110) ; 55% = 220px */
  color: F5E3B5;                  /* le beige des ombres et de la bordure */
  box-shadow:
    25vw 0,                       /* 100px à droite : la hampe de droite (html), la panse de droite (body) */
    -30vw 0;                      /* 120px à gauche : la hampe de gauche (html), la panse de gauche (body) */
  * {                             /* * * : body */
    margin: 0-80 50 0;            /* body : 100 × 80 en (160 ; 110) */
    border-radius: 0 2in 2in 0;   /* 192px, réduits à 40px : un côté droit en demi-cercle */
    border-left: 5pc dotted       /* 80px de large sur un côté de 80px : un seul point rond, le o */
```

## Comment ça marche

### 1. html : une boîte de 20 × 130

La balise style n'est jamais fermée, donc tout le code est du CSS. Il n'y a pas de doctype : la page est en mode quirks, et les nombres nus comme `110` se lisent en px.

`*` vise tous les éléments. head et style sont masqués, donc ceux qui se voient sont html et body. html prend `margin:110 55%60 160`. Une marge en pourcentage est une part de la largeur : 55 % de 400, c'est 220px. html fait donc 400 − 160 − 220 = 20 de large, de x = 160 à 180. En mode quirks, html remplit les 300px de hauteur moins ses marges : 300 − 110 − 60 = 130. html va de y = 110 à 240.

Le fond de html, `#A84A4B`, est le fond de la racine : il peint tout le canevas.

### 2. Les ombres de html : les hampes

`25vw` vaut 100px (un quart de 400) et `30vw` vaut 120px. Chaque ombre est une copie de la boîte de html, 20 × 130, décalée sur le côté. `25vw 0` en pose une de x = 260 à 280, `-30vw 0` pose l'autre de x = 40 à 60. Les deux vont de y = 110 à 240.

Les ombres n'ont pas de couleur, donc elles prennent `color`. En mode quirks, `F5E3B5` marche sans son `#` : un beige. Ces deux barres beiges sont les hampes des deux p.

### 3. body : 100 × 80

Le `*{` imbriqué vaut `* *` : tout élément placé dans un autre. C'est body. Il vient après le `*{` extérieur, donc pour body, sa `margin` l'emporte. body garde le fond, la couleur et les deux ombres de la règle extérieure.

body part du coin haut gauche de la boîte de html, (160 ; 110). Sa marge droite de −80 le rend 80px plus large que html : 20 + 80 = 100, de x = 160 à 260. En mode quirks, body prend les 130px de hauteur de html moins ses propres marges : 130 − 50 = 80. body va de y = 110 à 190.

### 4. Un côté droit en demi-cercle

`border-radius:0 2in 2in 0` donne aux deux coins de droite un rayon de 192px. Le côté droit ne fait que 80 de haut, et 192 + 192 = 384. Chrome réduit tous les rayons du même facteur jusqu'à ce qu'ils tiennent : 80 / 384, ce qui donne 40px. Le côté droit de body devient un demi-cercle de rayon 40, centré en (220 ; 150).

Le fond de body est `#A84A4B`, la couleur du canevas. Cette forme arrondie ne se voit donc pas elle-même. Elle compte pour les ombres, à la section 6.

### 5. Une bordure en pointillés : le o

`5pc` vaut 80px (1pc = 16px). `border-left:5pc dotted` donne à body une bordure gauche de 80px. Elle n'a pas de couleur, donc elle prend `color` : beige.

Chrome dessine une bordure en pointillés comme des points ronds, aussi larges que la bordure. Le côté gauche de body fait 80 de haut, il y a donc la place pour un seul point : un disque de 80px, de x = 160 à 240 et de y = 110 à 190. C'est le o, centré en (200 ; 150). La bordure prend 80 des 100px de body. Les 20px qui restent, de x = 240 à 260, sont le fond rouge de body.

### 6. Les ombres de body : les panses

body reçoit les deux mêmes ombres que html. html et body partent tous deux de x = 160, donc les mêmes décalages posent les copies de body juste au-dessus des hampes. Une ombre suit l'arrondi de sa boîte : chaque copie fait 100 × 80, avec un bout en demi-cercle.

- `25vw 0` en pose une de x = 260 à 360 : la panse du p de droite.
- `-30vw 0` pose l'autre de x = 40 à 140 : la panse du p de gauche.

Elles vont de y = 110 à 190 et couvrent le haut des hampes. Les deux p sont complets.

## Notes de golf

- Une seule liste d'ombres fait le travail de deux. html et body partent du même x, donc les deux mêmes décalages placent les hampes (copies de html, 20 × 130) et les panses (copies de body, 100 × 80). La liste est écrite une fois, dans `*`.
- `25vw`, c'est 100px en 4 caractères, un de moins que `100px`, et `-30vw` en a un de moins que `-120px`. En px, l'image est la même en 157 caractères. Les nombres nus ne marchent pas ici : avec `100 0,-120 0`, Chrome ignore tout le `box-shadow` (il vaut `none`), les hampes et les panses disparaissent, et 16 728 pixels changent.
- `55%`, c'est 220px en 3 caractères, et le `%` termine le nombre : `55%60` n'a pas besoin d'espace. `110 220 60 160` donne la même image en 156 caractères.
- Pas d'espace avant un signe moins : `0-80`.
- En mode quirks, `color` accepte une couleur hexadécimale sans `#` : `color:#F5E3B5` donne la même image en 156 caractères.
- `color` est écrit une fois, et trois choses s'en servent : les deux ombres et la bordure. Sans `color`, avec `#F5E3B5` écrit dans chacune, l'image est la même en 163 caractères.
- Le `*{` imbriqué vise body en 2 caractères. `body{` à sa place donne la même image en 158 caractères.
- `2in`, c'est 192px en 3 caractères. Tout rayon de 40px ou plus donne le même demi-cercle : `0 40px 40px 0` donne la même image, et avec 39px, 342 pixels changent. Un `40` nu ne marche pas : Chrome ignore la déclaration, les panses ont des bouts carrés, et 1 552 pixels changent.
- Le o coûte une déclaration, pas un élément de plus. C'est `dotted` qui le rend rond : avec `solid`, la bordure est un carré de 80 × 80 dont les coins de droite suivent le côté arrondi de body, et 1 588 pixels changent.
- Rien n'est fermé : ni les deux règles ni la balise style. Avec `}}</style>` à la fin, le code fait 165 caractères et l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, 434 pixels diffèrent de la cible de plus de 8 sur un canal. Tous sont sur les bords courbes des deux panses et du disque. Là, mon rendu et la cible mélangent le beige et le rouge dans des proportions différentes : certains de mes pixels sont plus clairs, d'autres plus foncés. Le juge de CSS Battle donne au code 100 % de ressemblance.
