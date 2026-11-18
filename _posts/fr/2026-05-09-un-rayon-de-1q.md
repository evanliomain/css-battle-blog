---
title: "Un rayon de 1Q : un U bleu sur deux disques verts en 132 caractères"
ref: 2026-05-09
permalink: /fr/2026/05/09/un-rayon-de-1q/
description: "Comment un seul dégradé radial de rayon 1Q peint deux disques bleus, deux anneaux verts et le fond pâle, tandis qu'une bordure sans son haut dessine le U, dans la cible CSS Battle du 9 mai 2026."
target: /assets/targets/2026-05-09.png
target_url: https://cssbattle.dev/play/QomLbqFmW1h2pIupeVRb
colors: ["#08c", "#a6ce39", "#eef8f8"]
player: fmata
chars: 132
score: 713.68
match: 100
code: |
  <style>&{background:radial-gradient(1Q,#08C 4MM,#A6CE39 0 37q,#0991)13%-32q/45MM;*{margin:30%25%70;border:32q solid#08C;border-top:0
---

La cible du 9 mai est un U bleu sur un fond bleu très pâle, avec un disque vert derrière le haut de chaque branche. Le haut des branches est arrondi. fmata la dessine avec deux règles. Un seul dégradé radial sur html peint les deux disques verts, un petit disque bleu dans chacun, et le fond pâle. Une bordure sur le body, sans son haut, dessine le U, et les petits disques bleus arrondissent ses branches.

La **vue large** montre les copies de la tuile du fond autour du canevas. Les **couleurs pédagogiques** donnent des couleurs différentes au disque du dégradé et à la bordure du body : dans les vraies couleurs, les deux sont du même bleu.

{% include animations/2026-05-09.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                          /* au premier niveau : html */
  background:
    radial-gradient(1Q,      /* un cercle de rayon 1Q = 0,945px */
      #08C 4MM,              /* bleu jusqu'à 4mm = 15,12px */
      #A6CE39 0 37q,         /* vert de 15,12 (le 0 est remonté) à 37q = 34,96px */
      #0991)                 /* la dernière couleur, remontée à 37q, remplit le reste */
    13% -32q /               /* position : la tuile en (29,89 ; −30,24) */
    45MM;                    /* taille : 170,08 de large, hauteur auto = 300 */
  * {                        /* imbriqué : tous les descendants de html ; seul body est affiché */
    margin: 30% 25% 70;      /* 120 en haut, 100 sur les côtés, 70px en bas */
    border: 32q solid #08C;  /* 32q = 30,24px, dessinée sur 30px */
    border-top: 0            /* pas de haut : un U ; la fin du code ferme les deux { */
```

## Comment ça marche

### 1. Un seul fond, sur html

Au premier niveau d'une feuille de style, `&` désigne la racine du document : html. Mon Chrome donne la même image avec `html{`.

Le fond de l'élément racine est peint sur tout le canevas. Sa zone de placement est la boîte de html. Le code n'a pas de doctype, la page est donc en mode quirks, et html y remplit la fenêtre : mon Chrome le mesure en (0, 0), 400 × 300.

### 2. Une tuile de 170,08 × 300

Après le `/`, `45MM` est la taille de l'image de fond. Les unités ne tiennent pas compte de la casse : `MM` est `mm`. 1in = 96px = 25,4mm, donc 45mm = 170,08px.

Il n'y a qu'une valeur : la hauteur vaut `auto`. Un dégradé n'a pas de taille propre, donc une hauteur `auto` prend la hauteur de la zone de placement, la boîte de html : 300. Avec `/45MM 100%`, l'image est la même. La tuile fait 170,08 × 300.

### 3. Un cercle de rayon 1Q

`radial-gradient(1Q,…)` commence par une seule longueur : la forme est un cercle de ce rayon, au centre de la tuile, (85,04 ; 150). `Q` est le quart de millimètre : 1in = 101,6Q, donc 1Q = 0,945px.

Les arrêts de couleur sont des longueurs, mesurées depuis le centre. Ils peuvent dépasser le rayon :

- `#08C 4MM` : bleu du centre jusqu'à 4mm = 15,12px.
- `#A6CE39 0 37q` : une position plus petite qu'une position précédente est remontée à la plus grande des précédentes. Le `0` devient 15,12. Le vert va de 15,12 à 37q = 34,96px, avec un bord net des deux côtés.
- `#0991` n'a pas de position. Par défaut, le dernier arrêt est à 100 % du rayon du dégradé, et ce rayon vaut 1Q, 0,945px. C'est moins que 37q, donc il est lui aussi remonté à 34,96px. Le passage du vert à `#0991` est net, et la dernière couleur remplit le reste de la tuile.

Voilà pourquoi le rayon vaut 1Q. Avec `circle` à la place de `1Q` (136 caractères), le cercle prend sa taille par défaut, et le dernier arrêt est au coin le plus éloigné de la tuile, à 172,4px du centre : le vert se fond dans le fond sur toute la tuile, et 103 214 pixels changent de plus de 8 niveaux par rapport à mon rendu du code officiel.

### 4. #0991 sur du blanc

`#0991` est une couleur hexadécimale à 4 chiffres, avec alpha : `#00999911`. L'alpha vaut 0x11 = 17/255 = 0,067. Mon Chrome la calcule en `rgba(0, 153, 153, 0.067)`.

Sous html, le canevas est blanc. Un bleu-vert à 6,7 % sur du blanc donne un bleu très pâle : mon rendu montre (238, 248, 248), `#eef8f8`, partout hors des disques.

### 5. La tuile en (29,89 ; −30,24)

`13%-32q` est la position. Un pourcentage aligne le point à 13 % de la tuile sur le point à 13 % de la zone. En largeur, cela donne 13 % × (400 − 170,08) = 29,89.

En hauteur, la tuile a exactement la hauteur de la zone, donc un pourcentage ne la déplacerait pas. Une longueur, si : −32q = −30,24px. Sans valeur verticale (`13%`, 128 caractères), les disques sont à y = 150, et 7 088 pixels changent.

Le centre du cercle est donc en (29,89 + 85,04 ; −30,24 + 150) = (114,93 ; 119,76). Avec `29.89px -30.24px/170.08px` à la place de `13%-32q/45MM`, mon rendu est le même.

### 6. La tuile se répète

Par défaut, un fond se répète : une copie tous les 170,08px en largeur et tous les 300px en hauteur. En largeur, le centre de la copie suivante est en 114,93 + 170,08 = 285,01 : c'est le deuxième disque. Les copies en x = −55,15 et 455,09 tombent hors du canevas. En hauteur, les centres des copies sont en y = −180,24 et 419,76, hors du canevas eux aussi. Sur le canevas, il y a exactement deux disques, et `#0991` partout ailleurs.

Avec `no-repeat` après `45MM` (142 caractères), il n'y a qu'une tuile : un disque vert, sur un rectangle pâle de x = 29,89 à 199,97 et jusqu'à y = 269,76, avec du blanc autour. La branche de droite finit carrée. 69 012 pixels changent.

### 7. La boîte du body

`*{…}` est imbriqué dans `&{…}` : il signifie `& *`, tous les descendants de html. head et style ne sont pas affichés, il reste le body.

`margin:30%25%70` donne le haut, la gauche et la droite, puis le bas. Les marges en pourcentage se calculent sur la largeur du bloc conteneur, 400 : 30 % = 120 en haut, 25 % = 100 sur les côtés. En mode quirks, `70` sans unité vaut 70px.

En mode quirks, le body s'étire aussi sur la hauteur de html, moins ses marges : 300 − 120 − 70 = 110. Mon Chrome mesure le body en (100, 120), 200 × 110.

### 8. Une bordure sans le haut

`border:32q solid#08C` : 32q = 30,24px. Mon Chrome calcule une bordure de 30px : il arrondit les épaisseurs de bordure au pixel entier. Avec `border:30px`, l'image est la même.

`border-top:0` enlève le haut. Il reste un U : deux branches de 30 de large, de x = 100 à 130 et de 270 à 300, reliées par la bordure du bas, de y = 200 à 230. Sans `border-top:0` (119 caractères), la boîte est fermée en haut et 4 200 pixels changent.

Les branches finissent à plat en y = 120. Le haut arrondi vient du dégradé : chaque disque bleu, de 30,24 de large, est centré 0,24px au-dessus du bout d'une branche, en x = 114,93 et 285,01, presque sur l'axe de la branche (115 et 285). La bordure du body est peinte par-dessus le fond de html : elle cache la moitié basse du disque bleu et de l'anneau vert sous chaque branche. La moitié haute du disque bleu reste visible et arrondit la branche. Sans le disque bleu (`radial-gradient(1Q,#A6CE39 37q,#0991)`, 121 caractères), les branches finissent carrées dans les disques verts, et 820 pixels changent.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&{` atteint html en 2 caractères. Avec `html{` (135 caractères), l'image est la même.
- `*{`, imbriqué dans `&{`, atteint le body en 2 caractères : head et style ne sont pas affichés. Avec `body{` (135 caractères), l'image est la même.
- `1Q` fait du dégradé un cercle en 2 caractères, et son rayon minuscule ramène le dernier arrêt à 37q sans position. Avec `radial-gradient(circle,` et `#0991 0)` (138 caractères), l'image est la même.
- Un seul dégradé peint trois choses : les disques bleus, les anneaux verts et le fond. La couleur du fond est la dernière couleur du dégradé, il n'y a pas besoin de `background-color`.
- `4MM` écrit 15,12px en 3 caractères. Avec `15px` (133 caractères), 16 pixels changent.
- `#A6CE39 0` commence le vert là où finit le bleu : le `0` est remonté. Avec `#A6CE39 4MM 37q` (134 caractères), l'image est la même.
- `37q` écrit 34,96px en 3 caractères. Avec `35px` (133 caractères), 112 pixels changent.
- `#0991` donne le fond pâle en 5 caractères, grâce à son alpha. Avec la couleur opaque `#eef8f8` (134 caractères), l'image est la même : aucun canal ne bouge de plus de 1.
- La position et la taille suivent le dégradé sans espace : `)13%-32q/45MM`. Avec `) 13% -32q/45MM` (134 caractères), l'image est la même.
- `13%` écrit 29,89px en 3 caractères. Avec `30px` (133 caractères), 336 pixels changent.
- `-32q` écrit −30,24px en 4 caractères. Avec `-30px` (133 caractères), 480 pixels changent.
- `45MM` écrit 170,08px en 4 caractères, et la hauteur est gratuite : `auto` vaut 300, la hauteur du canevas. Avec `170px` (133 caractères), le deuxième disque se décale de 0,11px vers la gauche, et 609 pixels changent.
- `30%25%70` écrit 120, 100 et 70px sans espaces : il n'en faut pas après `%`, et un 70 sans unité vaut 70px en mode quirks. Avec `120px 100px 70px` (140 caractères), l'image est la même.
- `32q` écrit la bordure de 30px en 3 caractères. Avec `30px` (133 caractères), l'image est la même.
- `solid#08C` n'a pas besoin d'espace avant `#`. Avec `solid #08C` (133 caractères), l'image est la même.
- La répétition est gratuite : c'est la valeur par défaut, et elle donne le deuxième disque.
- Le code s'arrête à l'intérieur des règles : la fin du code les ferme. Avec `}}` à la fin (134 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment de l'écriture), le code officiel dessine les mêmes formes que la cible, mais 598 pixels diffèrent de plus de 8 niveaux. Ils sont tous sur les bords des anneaux verts et des disques bleus, de x = 79 à 320 et de y = 84 à 151. En zoomant, je vois ces bords fondus sur plus de pixels dans mon rendu que dans la cible. Le plus gros écart est de 130 niveaux, en (250, 125), sur le bord gauche de l'anneau de droite : (215, 235, 187) dans mon rendu, un mélange de vert et du fond pâle, et (166, 206, 57), vert plein, dans la cible. Les aplats sont à 2 niveaux près : le bleu de la cible est (0, 136, 202) là où mon rendu a (0, 136, 204). Le juge de CSS Battle donne au code officiel 100 % de correspondance.
