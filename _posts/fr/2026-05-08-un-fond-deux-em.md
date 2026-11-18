---
title: "Un fond, deux em : une marmite à anses en 141 caractères"
ref: 2026-05-08
permalink: /fr/2026/05/08/un-fond-deux-em/
description: "Comment un seul dégradé radial, donné à html et au body avec deux tailles de police différentes, peint deux anses en anneau et une marmite grise entaillée, dans la cible CSS Battle du 8 mai 2026."
target: /assets/targets/2026-05-08.png
target_url: https://cssbattle.dev/play/opmQKm1DyQdTX0ytBPxQ
colors: ["#df914b", "#eee"]
player: eguiluz
chars: 141
score: 704.33
match: 100
code: |
  <style>*{background:radial-gradient(1Q,#df914b 5vh,#eee 0 2.2em,#df914b)-327Q -32Q/10.6em;*{margin:65 125;border-radius:0 0 13%13%;font:554%"
---

La cible du 8 mai est une marmite gris clair sur un fond orange. Ses coins du bas sont arrondis, et une anse en anneau dépasse de chaque côté. Le trou de l'anse de droite entame un peu la marmite. David Eguiluz écrit un seul fond, que html et le body reçoivent tous les deux. Les tailles sont en `em`, et le body a une police bien plus grande : sur html, le dégradé dessine deux petits anneaux ; sur le body, un grand aplat gris avec une petite encoche orange.

La **vue large** montre les tuiles hors du canevas : celle de html à gauche, et celle du body, large de 939,58px. Les **couleurs pédagogiques** montrent quel élément peint quoi : dans les vraies couleurs, les anneaux de html et le body sont du même gris.

{% include animations/2026-05-08.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* tous les éléments : html, head, style, body */
  background:
    radial-gradient(1Q,          /* un cercle de rayon 1Q = 0,945px */
      #df914b 5vh,               /* orange jusqu'à 5vh = 15px */
      #eee 0 2.2em,              /* gris de 15 (le 0 est remonté) à 2.2em : 35,2px sur html, 195,01px sur body */
      #df914b)                   /* la dernière couleur, remontée à 2.2em, remplit le reste */
    -327Q -32Q /                 /* position : −308,98px, −30,24px */
    10.6em;                      /* taille : 169,6px sur html, 939,58px sur body ; hauteur auto */
  * {                            /* imbriqué : tous les descendants ; seul body est affiché */
    margin: 65 125;              /* 65px en haut et en bas, 125px à gauche et à droite */
    border-radius: 0 0 13% 13%;  /* coins du bas : 19,5 × 22,1 */
    /* 554 % de 16px = 88,64px ; " ouvre un nom de police vide, fermé par la fin du code, comme les deux { */
    font: 554% "
```

## Comment ça marche

### 1. Une règle pour deux éléments

`*` vise tous les éléments : html, head, style et body. head et style ne sont pas affichés : le fond va donc à html et au body.

`*{…}` imbriqué dans `*{…}` signifie `* *` : tout élément placé dans un autre. Ce sont head, style et body, mais pas html. Seul le body est affiché, donc la marge, l'arrondi et la police ne comptent que pour lui.

Les deux éléments partagent le fond, mais pas la taille de police. html garde celle par défaut, 16px. Le body reçoit `554%` des 16px de son parent : 88,64px. Chaque `em` du fond se lit avec la taille de police de l'élément, donc la même déclaration donne deux images différentes.

Avec `html{` à la place du premier `*{` (144 caractères), le body n'a pas de fond à lui : il est transparent, il ne reste que les deux anneaux, et 23 043 pixels changent de plus de 8 niveaux par rapport à mon rendu du code officiel.

### 2. La tuile de html : 169,6 × 300 en (−308,98 ; −30,24)

Le fond de html est peint sur tout le canevas. Le code n'a pas de doctype, la page est donc en mode quirks, et html y remplit la fenêtre : mon Chrome le mesure en (0, 0), 400 × 300.

Après le `/`, `10.6em` est la largeur de l'image de fond : 10,6 × 16 = 169,6px. La hauteur vaut `auto`. Un dégradé n'a pas de taille propre, donc la hauteur est celle de la boîte de html : 300.

`-327Q -32Q` est la position, en deux longueurs. `Q` est le quart de millimètre : 1in = 101,6Q, donc 1Q = 0,945px. −327Q = −308,98px et −32Q = −30,24px. Le coin de la tuile est en (−308,98 ; −30,24), hors du canevas à gauche. Mon Chrome calcule la position en `-308.976px -30.2362px`.

### 3. Un anneau de rayon 1Q

`radial-gradient(1Q,…)` commence par une seule longueur : la forme est un cercle de ce rayon, au centre de la tuile, (−224,18 ; 119,76). Les arrêts de couleur sont des longueurs depuis le centre, et ils peuvent dépasser le rayon :

- `#df914b 5vh` : orange du centre jusqu'à 5vh. Le vh vaut 1 % de la hauteur de la fenêtre, 300 : 5vh = 15px.
- `#eee 0 2.2em` : une position plus petite qu'une position précédente est remontée à la plus grande des précédentes. Le `0` devient 15. Le gris va de 15 à 2.2em = 2,2 × 16 = 35,2px, avec un bord net des deux côtés.
- `#df914b` n'a pas de position. Par défaut, le dernier arrêt est à 100 % du rayon du dégradé, et ce rayon vaut 1Q, 0,945px. C'est moins que 35,2px, donc il est lui aussi remonté à 35,2px. L'orange remplit le reste de la tuile.

Cela donne un anneau gris de 20,2px d'épaisseur autour d'un trou orange de 30px. Avec `circle` à la place de `1Q` et `#df914b 0` à la fin (147 caractères), l'image est la même.

### 4. Deux anneaux sur le canevas

Par défaut, un fond se répète : une copie tous les 169,6px en largeur et tous les 300px en hauteur. Les centres des anneaux sont en x = −224,18 + 169,6 × k : −54,58, 115,02, 284,62, 454,22. Le premier et le dernier vont au plus jusqu'à −19,38 et 419,02 : ils restent hors du canevas. En hauteur, les centres des copies sont en y = −180,24 et 419,76, hors du canevas eux aussi.

Sur le canevas, il y a deux anneaux, centrés en (115,02 ; 119,76) et (284,62 ; 119,76), de x = 79,82 à 150,22 et de 249,42 à 319,82. Tout le reste est orange.

### 5. La boîte du body

`margin:65 125` donne 65 en haut et en bas, 125 à gauche et à droite. En mode quirks, un nombre sans unité vaut des px. Le body fait 400 − 250 = 150 de large.

En mode quirks, le body s'étire aussi sur la hauteur de html, moins ses marges : 300 − 130 = 170. Mon Chrome mesure le body en (125, 65), 150 × 170.

### 6. Le même fond, lu avec 88,64px

`font:554%"` règle la taille de police du body : 554 % de 16 = 88,64px. Mon Chrome la calcule en `88.64px`. Dans le fond du body :

- `10.6em` = 939,58px. La hauteur `auto` est celle du body, 170. La tuile fait 939,58 × 170.
- `2.2em` = 195,01px : le gris va maintenant de 15 à 195,01 autour du centre.
- `5vh` reste à 15px : il dépend de la fenêtre, pas de la police.

La position se mesure depuis le coin du body, (125, 65) : la tuile commence en (125 − 308,98 ; 65 − 30,24) = (−183,98 ; 34,76), et son centre est en (−183,98 + 469,79 ; 34,76 + 85) = (285,82 ; 119,76).

Le centre tombe à la même hauteur que les anneaux de html : le milieu du body est en 65 + 85 = 150, comme celui de html (300 / 2), et le même décalage de −30,24 amène les deux centres en y = 119,76. En largeur, il tombe 1,19px à droite du centre de l'anneau de droite, 284,62.

C'est la taille de police qui choisit cet endroit : le x du centre vaut 125 − 308,98 + 5,3 × la taille de police. Avec `550%` (141 caractères aussi), la police fait 88px, le centre passe en x = 282,42, et 102 pixels changent. Avec `553%`, 31 pixels changent. Avec `555%`, 45 pixels changent.

### 7. Ce que montre le body

Un fond n'est peint que dans la boîte de son élément : ici, de x = 125 à 275 et de y = 65 à 235.

La tuile fait 170 de haut et commence 30,24 au-dessus du body, donc elle s'arrête en y = 204,76. La copie du dessous, centrée en y = 289,76, couvre les dernières rangées du body. Dans les deux, le point du body le plus éloigné du centre est à 181,9px, moins que 195,01 : tout le body est gris. Avec `background-repeat:no-repeat` ajouté à la règle imbriquée (169 caractères), mon rendu montre le body orange sous y = 204,76.

Le body est peint par-dessus le fond de html : il cache la moitié intérieure de chaque anneau. À gauche, le trou va de x = 100,02 à 130,02 : le body le couvre à partir de 125, et le trou s'arrête là.

À droite, le trou de html va de x = 269,62 à 299,62, et le body le couvre jusqu'à 275. Mais le body a son propre disque orange, de 15px autour de (285,82 ; 119,76) : il se voit de x = 270,82 jusqu'au bord du body, en 275. Il prolonge le trou de html, et l'anse de droite entame la marmite. Avec `background:#eee` ajouté à la règle imbriquée (157 caractères), le body est d'un gris uni, le trou de droite s'arrête en x = 275, et 80 pixels changent.

Voilà pourquoi toutes les tailles sont en `em`. Avec `35.2px` à la place de `2.2em` (142 caractères), le gris du body se réduit à un anneau autour de (285,82 ; 119,76), le reste du body devient orange, et 24 171 pixels changent. Avec `169.6px` à la place de `10.6em` (142 caractères), la tuile du body fait 169,6 de large et se répète : un disque orange apparaît dans le body, en x = 240,02, l'encoche de droite disparaît, et 826 pixels changent.

### 8. Les coins du bas arrondis

`border-radius:0 0 13%13%` arrondit les coins en bas à droite et en bas à gauche. Un rayon en pourcentage se calcule sur la largeur de la boîte en horizontal et sur sa hauteur en vertical : 13 % de 150 = 19,5, et 13 % de 170 = 22,1. Les coins sont des quarts d'ellipse. Avec `0 0 19.5px 19.5px/0 0 22.1px 22.1px` (166 caractères), l'image est la même. Sans l'arrondi (116 caractères), les coins sont carrés et 224 pixels changent.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul fond sert deux éléments. Écrit en deux règles, `html{…}` et `body{…}`, avec les tailles du body en px (218 caractères), l'image est la même.
- `*{` atteint html et le body en 2 caractères, et le `*{` imbriqué n'atteint que le body, en 2 de plus.
- `5vh` écrit 15px en 3 caractères, le même sur les deux éléments. Avec `15px` (142 caractères), l'image est la même.
- `#eee 0` commence le gris là où finit l'orange : le `0` est remonté. Avec `#eee 5vh` (143 caractères), l'image est la même.
- `1Q` fait du dégradé un cercle en 2 caractères, et son rayon minuscule remonte le dernier arrêt à 2.2em sans position. Avec `circle,` et `#df914b 0)` (147 caractères), l'image est la même.
- `-327Q` écrit −308,98px en 5 caractères. Avec `-309px` (142 caractères), l'image est la même.
- `-32Q` écrit −30,24px en 4 caractères. Avec `-30px` (142 caractères), les anneaux descendent de 0,24px, et 352 pixels changent.
- La position suit le dégradé sans espace : `)-327Q`. Avec `) -327Q` (142 caractères), l'image est la même.
- `10.6em` donne la taille sans hauteur : `auto` vaut 300 sur html et 170 sur le body, la hauteur de chaque élément.
- `margin:65 125` se passe d'unités en mode quirks. Avec `65px 125px` (145 caractères), l'image est la même.
- `13%13%` n'a pas besoin d'espace après `%`. Avec `13% 13%` (142 caractères), l'image est la même.
- `font:554%"` règle la taille de police par le raccourci `font`, qui exige un nom de police : `"` en ouvre un vide. Avec `font-size:554%` (145 caractères), l'image est la même. Sans le `"` (140 caractères), la déclaration est invalide, le body garde 16px, et 22 369 pixels changent.
- `554%` écrit 88,64px en 4 caractères. Avec `88.64px` (144 caractères), l'image est la même.
- Le code s'arrête à l'intérieur de la chaîne et des deux règles : la fin du code les ferme. Avec `"}}` à la fin (144 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment de l'écriture), le code officiel dessine les mêmes formes que la cible, mais 499 pixels diffèrent de plus de 8 niveaux. Ils sont tous sur les bords des anneaux et des coins arrondis, de x = 80 à 319 et de y = 84 à 234. Le plus gros écart est de 146 niveaux, en (126, 222), sur le coin en bas à gauche : (224, 148, 81), presque orange, dans mon rendu, et (237, 232, 227), presque gris, dans la cible. Sur la rangée y = 120, le trou de droite va de x = 271 à 299 dans mon rendu, et de 270 à 299 dans la cible. Les aplats sont identiques : (223, 145, 75) et (238, 238, 238). Le juge de CSS Battle donne au code officiel 100 % de correspondance.
