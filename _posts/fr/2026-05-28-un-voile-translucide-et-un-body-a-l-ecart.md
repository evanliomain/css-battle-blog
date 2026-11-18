---
title: "Un voile translucide et un body à l'écart : une tête de robot en 197 caractères"
ref: 2026-05-28
permalink: /fr/2026/05/28/un-voile-translucide-et-un-body-a-l-ecart/
description: "Comment une seule liste de huit ombres, portée par html puis par un body garé à gauche du canevas, dessine une tête de robot cyan avec une visière verte, des yeux blancs et des oreilles, sur un fond brun fait d'une ombre translucide, dans la cible CSS Battle du 28 mai 2026."
target: /assets/targets/2026-05-28.png
target_url: https://cssbattle.dev/play/oJqUjEVJ7H5lBcSF5CH3
colors: ["#31696b", "#524849", "#fff", "#64dfe3"]
player: h_blierzt
chars: 197
score: 661.18
match: 100
code: |
  <style>*{margin:110 115;background:#31696B;border-radius:4in;color:64DFE3;box-shadow:5ch 0 0 5vh,-5ch 0 0 5vh,0 0 0 2in#7227,454q 55vh 0 74q,597q 0,98vh 0,4in 0#FFF,502q 0#FFF;*{margin:6%484 10-374
---

La cible du 28 mai montre un robot cyan sur un fond brun : une large tête avec deux oreilles rondes, une visière vert foncé avec deux yeux blancs, et le haut d'un corps rond en bas. H_Bliertz dessine tout avec une seule liste de huit ombres, donnée à html et à body. html est la visière, et ses ombres font la tête et un voile translucide qui rend le canevas vert brun. body est garé hors du canevas, à gauche, et lance de là le corps, les oreilles et les yeux.

La **Vue large** montre les deux boîtes et où tombe chaque ombre, y compris celles qui ratent le canevas. Avec les **Couleurs pédagogiques**, chaque ombre cyan a sa propre couleur.

{% include animations/2026-05-28.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                            /* html, head, body, style */
  margin: 110 115;             /* html : 170 × 80,2 en (115, 110) */
  background: #31696B;         /* celui de html, peint sur le canevas */
  border-radius: 4in;          /* 384px : html est une pilule, body un rond */
  color: 64DFE3;               /* cyan, pour les ombres sans couleur */
  box-shadow:
    5ch 0 0 5vh,               /* html : partie droite de la tête */
    -5ch 0 0 5vh,              /* html : partie gauche de la tête */
    0 0 0 2in#7227,            /* html : le voile brun, large de 192px */
    454q 55vh 0 74q,           /* body : le corps du robot */
    597q 0,                    /* body : oreille droite */
    98vh 0,                    /* body : oreille gauche */
    4in 0#FFF,                 /* body : œil gauche */
    502q 0#FFF;                /* body : œil droit */
  * {                          /* * * : head, body, style (pas html) */
    margin: 6%484 10-374       /* body : 60 × 59,8 en (−259, 120,2) */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `110` dans une marge est lu en px.

La page a html, head, body et style. head et style ne sont pas affichés. `*` vise les quatre : html et body reçoivent tous les deux le fond, le rayon, la couleur et toute la liste d'ombres. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre. Ce sont head, body et style, mais pas html. La seconde marge ne va donc qu'à body, et remplace la première.

Le `<style>` n'est jamais fermé, ni les deux règles : la fin du code les ferme.

### 2. html, la visière

`margin:110 115` met 110px en haut et en bas, 115px sur les côtés. En mode quirks, html remplit la page moins ses marges. Je l'ai mesuré : 170 × 80,2, en (115, 110). Il fait 80,2 et pas 80 à cause de la marge à virgule de body (partie 6) : avec `10` à la place de `6%`, html fait 80 pile.

`border-radius:4in` demande 384px à chaque coin. C'est plus que la boîte ne peut prendre : le navigateur le réduit à la moitié de la hauteur, 40,1px. C'est une pilule.

Le fond de html, `#31696B`, ne reste pas dans sa boîte. Le fond de l'élément racine est peint sur tout le canevas. Le canevas commence donc tout vert, et la pilule elle-même ne peint rien : on voit le canevas à travers.

### 3. Le voile brun

La troisième ombre, `0 0 0 2in#7227`, n'a ni décalage ni flou. Son étalement, 2in = 192px, agrandit la pilule de tous les côtés : de x = −77 à 477 et de y = −82 à 382. Cela couvre tout le canevas.

`#7227` est un hexa à 4 chiffres : du rouge #772222 à 0x77 = 47 % d'opacité. Sur le canevas vert, il donne #524849. C'est le brun du fond.

Une ombre extérieure n'est jamais peinte sous sa propre boîte. La pilule reste donc verte : c'est la visière.

### 4. La tête

`color:64DFE3` n'a pas de `#`. En mode quirks, le navigateur la lit quand même comme une couleur : cyan, #64DFE3. Une ombre sans couleur prend la couleur courante : les cinq ombres écrites sans couleur sont cyan.

`5ch 0 0 5vh` copie la pilule 40px à droite (un `ch` vaut 8px dans la police par défaut, Times en 16px) et l'élargit de 5vh = 15px. `-5ch 0 0 5vh` fait de même à gauche. Chaque copie est une pilule de 200 × 110,2. Ensemble, elles font la tête, de x = 60 à 340 et de y = 95 à 205,2.

Dans une liste d'ombres, la première est peinte au-dessus. Ces deux-là viennent avant le voile brun : elles le couvrent.

### 5. Les autres ombres de html

html reçoit aussi les cinq dernières ombres. Elles sont faites pour body, et leurs décalages sont énormes. Sur html, elles tombent toutes au-delà de x = 409, hors du canevas, à droite. La plus lointaine, `597q 0`, finit en x = 849.

### 6. body, garé hors du canevas

La marge de body est `6%484 10-374`. Une marge en pourcentage se calcule sur la largeur de la boîte de contenu du parent : 6 % de 170 = 10,2. body a donc 10,2px en haut, 484px à droite, 10px en bas et −374px à gauche.

Sa largeur vaut 170 − 484 + 374 = 60. En mode quirks, body remplit aussi la hauteur de la page moins les marges de html et les siennes : 300 − 220 − 10,2 − 10 = 59,8. Je l'ai mesuré : 60 × 59,8, en (−259, 120,2). Avec le même rayon `4in`, réduit à 29,9px, c'est un rond. Il peint aussi son propre fond vert, hors du canevas : seul le fond de la racine passe au canevas.

body reçoit les mêmes huit ombres. Ses trois premières restent hors du canevas, à gauche. Les pilules de la tête finissent en x = −144, et son voile brun en x = −7.

### 7. Des ombres lancées de loin

Le centre de body est en (−229, 150,1). Chaque autre ombre est une copie de ce rond, déplacée de son décalage :

- `454q 55vh 0 74q` : 454q = 429px à droite, 55vh = 165px plus bas, élargie de 74q = 69,9px. Cela fait un disque d'environ 200px, centré en (200, 315,1). Son haut est en y = 215,3, et le bas du canevas le coupe : le corps du robot.
- `597q 0` : 564,1px à droite, l'oreille droite, centrée en x = 335,1.
- `98vh 0` : 294px à droite, l'oreille gauche, centrée en x = 65.
- `4in 0#FFF` : 384px à droite, l'œil gauche, blanc, centré en x = 155.
- `502q 0#FFF` : 474,3px à droite, l'œil droit, centré en x = 245,3.

Les oreilles et les yeux sont des ronds de 60px, à la hauteur de body : y = 150,1.

body vient après html dans la page : ses ombres sont peintes au-dessus de celles de html. Les yeux couvrent la visière, et les oreilles les bouts de la tête.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres pour deux boîtes. html se sert des trois premières, body des cinq dernières, et les autres tombent hors du canevas. Avec deux listes, `box-shadow:5ch 0 0 5vh,-5ch 0 0 5vh,0 0 0 2in#7227;*{margin:6%484 10-374;box-shadow:454q 55vh 0 74q,597q 0,98vh 0,4in 0#FFF,502q 0#FFF`, j'obtiens la même image en 208 caractères.
- body doit être assez loin à gauche. Son propre voile brun est troisième dans sa liste : il serait peint aussi sur ses oreilles et ses yeux. Avec `3in` à la place de `2in` (même longueur), le voile de body arrive en x = 89 : le brun du bord gauche du canevas reçoit une seconde couche (#633637), et l'oreille gauche et le bout gauche de la tête virent au gris-bleu (#6d8789). 23 057 pixels changent.
- `color:64DFE3` fait du cyan la couleur par défaut des ombres. Écrire `#64DFE3` sur les cinq ombres cyan à la place, sans `color`, donne la même image en 219 caractères. Avec le `#` gardé dans `color:#64DFE3`, c'est 198.
- `#7227` fait 5 caractères. Le brun opaque qu'il donne, `#524849`, en prend 7 : la même image en 199 caractères.
- L'ordre compte. Avec le voile brun en premier dans la liste (même longueur), il est peint par-dessus la tête : la tête vire au gris-bleu, #6d8789, et les oreilles de body restent cyan. 13 138 pixels changent.
- Des unités courtes : `5ch` vaut 40px, `5vh` 15px, `2in` 192px, `4in` 384px, `55vh` 165px et `98vh` 294px, chacune plus courte que sa valeur en px.
- Les valeurs en `q` ne tombent pas sur des pixels entiers : 454q vaut 428,98px, 74q 69,92px, 597q 564,09px et 502q 474,33px. Avec 429px, 70px, 564px et 474px (201 caractères), 405 pixels changent, de 77 au plus, sur les bords du disque, de l'oreille droite et de l'œil droit.
- Pas d'espace là où il n'en faut pas : `6% 484 10 -374` donne la même image en 199 caractères. De même pour `2in#7227` et `0#FFF`, où le `#` n'a pas besoin d'espace avant lui.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 1 282 pixels, avec la même règle que dans les notes de golf, de 202 au plus. Tous sont sur des bords ronds : 378 autour des yeux, 296 sur le disque, 226 sur le bord de la visière, 201 sur la tête et 181 sur les oreilles. Les aplats sont identiques, sauf que mon brun est #524849 et celui de la cible #534848, à un cran près sur chaque canal. Mon rendu adoucit les bords avec beaucoup plus de nuances intermédiaires : 497 couleurs en tout, contre 92 dans la cible. Le juge de CSS Battle donne au code 100 % de correspondance.
