---
title: "Des points géants, coupés en deux : quatre demi-disques en 135 caractères"
ref: 2026-05-17
permalink: /fr/2026/05/17/des-points-geants-coupes-en-deux/
description: "Comment deux bordures pointillées aux points de 180px et deux clip-path dessinent quatre demi-disques dans un cadre, dans la cible CSS Battle du 17 mai 2026."
target: /assets/targets/2026-05-17.png
target_url: https://cssbattle.dev/play/qZAVSPe0t9VBVR5TGmyS
colors: ["#eeeeee", "#594c97", "#5a4c95"]
player: levito
chars: 135
score: 710.47
match: 100
code: |
  <hr size=42><style>&{border:5vw solid#217B;background:#0001;*{margin:-250-70;border:45vw dotted#438D;*{margin:0-300}clip-path:inset(5lh
---

La cible du 17 mai montre un cadre violet autour d'un rectangle gris clair. Dedans, quatre demi-disques violets pointent vers le centre : un en haut, un en bas et un de chaque côté. Veit Lehmann les dessine avec deux bordures pointillées. body et un hr reçoivent une bordure pointillée de 180px : chaque point est un disque de 180px de diamètre. Un clip-path coupe quatre de ces points en deux. Les autres points sont hors du canevas ou coupés.

Avec la **Vue large**, on voit les douze points, la plupart hors du canevas.

{% include animations/2026-05-17.html lang=page.lang %}

## Le code, aéré

```css
<hr size=42>                    /* ouvre body : un hr de 40px de haut */
<style>                         /* va dans body, après le hr */
& {                             /* html */
  border: 5vw solid #217B;      /* un cadre de 20px */
  background: #0001;            /* le canevas : #eeeeee */
  * {                           /* head, body, hr, style */
    margin: -250 -70;           /* body : 500 × 760 en (-50, -230) */
    border: 45vw dotted #438D;  /* des points de 180px */
    * {                         /* hr, style */
      margin: 0 -300;           /* hr : 740 × 400 en (-170, -50) */
    }
    clip-path: inset(5lh        /* garde 90px en retrait de chaque bord */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `-250` dans une marge est lu en px.

Le code commence par `<hr size=42>`. Un hr ne peut pas aller dans head : il ouvre body, et le `<style>` qui le suit va aussi dans body. head reste vide.

Au premier niveau, hors de toute règle, `&` veut dire `:scope` : l'élément racine, html. Le `*` placé dedans vise les descendants de html : head, body, hr et style. Le `*` intérieur vise leurs descendants : hr et style. head et style ne s'affichent pas. Il reste trois boîtes : html, body et hr. Les règles ne sont jamais fermées : la fin du code ferme `inset(` et les deux règles.

### 2. Un canevas gris et un cadre violet

html reçoit `background:#0001` : du noir à 1/15 d'opacité, environ 0,067. Le fond de html peint tout le canevas. Sur du blanc, cela donne #eeeeee.

html reçoit aussi `border:5vw solid#217B`. 5vw vaut 5 % des 400px de large : 20px. `#217B` est du #221177 à 0,733 d'opacité (BB = 187/255). Sur le gris, mon Chrome affiche #594c97. En mode quirks, html remplit le canevas, 400 × 300 : le cadre en fait le tour. Sa boîte de contenu fait 360 × 260, en (20, 20).

### 3. body : une boîte de 500 × 760

body reçoit `margin:-250-70` : -250px en haut et en bas, -70px à gauche et à droite. Un bloc aux marges latérales négatives s'élargit : 360 + 2 × 70 = 500. En mode quirks, body remplit la hauteur de html : 260 + 2 × 250 = 760. body est en (-50, -230), hors du canevas de tous les côtés.

### 4. Des points aussi gros que la bordure

body reçoit aussi `border:45vw dotted#438D`. 45vw vaut 180px. Une bordure pointillée est une rangée de points ronds aussi larges que la bordure : ici, des disques de 180px de diamètre. `#438D` est du #443388 à 0,867 d'opacité. Sur le gris, mon Chrome affiche #5a4c95.

La bordure de gauche va de x = -50 à 130 : ses points sont centrés sur x = 40. Dans mon Chrome, chaque coin reçoit un point, et d'autres points vont entre les coins quand ils tiennent. À gauche et à droite, les points des coins sont centrés en y = -140 et 440, à 580px l'un de l'autre : un point de plus tient, en y = 150. En haut et en bas, les points des coins ne sont qu'à 320px l'un de l'autre, sans point entre eux. body a six points, centrés en (40, -140), (360, -140), (40, 150), (360, 150), (40, 440) et (360, 440). Sa boîte de contenu fait 140 × 400, en (130, -50).

### 5. hr : une boîte de 740 × 400

hr est dans body : le `*` intérieur l'atteint, et `margin:0-300` remplace la première marge. hr garde la bordure pointillée de 180px et le clip-path du `*` extérieur.

`size=42` est un vieil attribut HTML pour la hauteur d'un hr. Dans mon Chrome, la hauteur calculée du hr est de 40px. Avec -300px de chaque côté, hr fait 140 + 600 = 740 de large, de x = -170 à 570. Avec la bordure, il fait 40 + 360 = 400 de haut, de y = -50, le haut de la boîte de contenu de body, à 350.

Les points de ses coins sont centrés en x = -80 et 480, à 560px l'un de l'autre : un point de plus tient en haut et en bas, en x = 200. À gauche et à droite, les points des coins sont à 220px l'un de l'autre, sans point entre eux. hr a six points, centrés en (-80, 40), (200, 40), (480, 40), (-80, 260), (200, 260) et (480, 260).

### 6. Le clip-path de body coupe les points des côtés

`clip-path:inset(5lh)` garde un rectangle en retrait de 5lh de chaque bord de la boîte. lh est la hauteur de ligne. Dans mon Chrome, 1lh vaut 18px, donc 5lh vaut 90px. Sur body, le rectangle va de x = 40 à 360 et de y = -140 à 440.

Les points des côtés sont centrés sur x = 40 et 360 : le clip garde leurs moitiés intérieures, les demi-disques de gauche et de droite, de y = 60 à 240. Les quatre points des coins sont réduits à des quarts, tous hors du canevas. Un clip-path coupe aussi les enfants de l'élément : les points des coins de hr, centrés sur x = -80 et 480, sont entièrement dehors et disparaissent.

### 7. Le clip-path de hr coupe les points du haut et du bas

Sur hr, les mêmes 90px donnent x = -80 à 480 et y = 40 à 260. Les points du milieu sont centrés sur y = 40 et 260 : le clip garde leurs moitiés intérieures, les demi-disques du haut et du bas, de x = 110 à 290. Les côtés plats des quatre demi-disques sont à 20px à l'intérieur du cadre, sur les bords des rectangles de découpe.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Les bordures pointillées dessinent des disques sans `border-radius`, et une seule bordure en donne plusieurs. Les clip-path ne gardent que les quatre moitiés dont la cible a besoin.
- `<hr size=42>` donne sa hauteur au hr sans CSS. Avec `<p>` à la place et `;height:40` dans la règle intérieure (136 caractères), l'image est la même. Sans la taille, `<hr>` (127 caractères), le contenu du hr fait 0px de haut : le demi-disque du bas remonte de 40px, touche celui du haut et couvre ceux des côtés, et 14 107 pixels changent.
- Au premier niveau, `&` vaut html en 1 caractère. Avec `html{` (138 caractères), l'image est la même.
- L'imbrication économise les sélecteurs. Avec des règles à plat, `html{…}* *{…;clip-path:inset(5lh)}* * *{margin:0-300` (145 caractères), l'image est la même.
- Le code s'arrête dans `inset(`, et la fin du code le ferme, ainsi que les deux règles. Avec `)}}` à la fin (138 caractères), l'image est la même.
- Les unités de viewport sont courtes : `5vw` vaut 20px et `45vw` 180px, un caractère de moins que `20px` et `180px`. Les nombres seuls ne marchent pas là : avec `border:20 solid#217B` (134 caractères), mon Chrome ignore la déclaration, le cadre disparaît, les demi-disques bougent, et 55 886 pixels changent. Avec `border:180 dotted#438D` (134 caractères), il n'y a plus de points, et 51 288 pixels changent.
- `5lh` vaut 90px en 3 caractères, un de moins que `90px`. Avec `inset(90` (134 caractères), mon Chrome ignore le clip-path : les points restent entiers, et 30 003 pixels changent.
- Des nombres seuls dans les marges, grâce au mode quirks. Avec `-250px -70px` et `0 -300px` (143 caractères), l'image est la même.
- Pas d'espace là où un mot se termine tout seul. Dans `-250-70`, le signe moins commence un second nombre : avec `-250 -70` (136 caractères), l'image est la même. `solid#217B` et `dotted#438D` n'ont pas besoin d'espace avant le `#`.
- Les couleurs sont en hexadécimal à 4 chiffres avec transparence : `#217B` et `#438D` font 5 caractères chacune, `#594C94` en fait 7. Avec `#594C94` dans les deux bordures (139 caractères), aucun canal ne bouge de plus de 3.

## Si vous l'essayez chez vous

Dans mon Chrome local (version 157 au moment d'écrire), le code officiel correspond à la cible sauf sur les bords courbes. 994 pixels s'écartent de la cible de plus de 8 sur un canal, jusqu'à 121, et tous sont à moins de 0,64px du bord de l'un des quatre cercles. Les aplats diffèrent d'au plus 3 sur un canal. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
