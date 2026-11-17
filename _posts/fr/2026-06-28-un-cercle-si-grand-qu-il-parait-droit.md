---
title: "Un cercle si grand qu'il paraît droit : un Pac-Man en 136 caractères"
ref: 2026-06-28
permalink: /fr/2026/06/28/un-cercle-si-grand-qu-il-parait-droit/
description: "Comment un seul radial-gradient partagé dessine un disque jaune sur html et, sur un body tourné de 45°, le bord d'un cercle rouge de 2268px de rayon dont l'extérieur se fond dans le canevas, dans la cible CSS Battle du 28 juin 2026."
target: /assets/targets/2026-06-28.png
target_url: https://cssbattle.dev/play/zhqVcCGcq24I4ItesJgY
colors: ["#be6b6c", "#f1f271", "#284a5b"]
player: emohdaziz
chars: 136
score: 709.43
match: 100
code: |
  <style>*{*{margin:25%79 25%221;rotate:45deg;--a:at -1533%43cm,#be6b6c 60cm}background:radial-gradient(var(--a,1Q,#f1f271,25vw),#284a5b 0
---

La cible du 28 juin est un Pac-Man : un grand disque jaune sur fond bleu-gris, avec une part découpée à droite. La part est remplie par une forme rouge aux deux coins coupés, avec un bord droit à droite. Mohamed Ali la dessine avec un seul `background`, partagé par html et body. Sur html, c'est un disque jaune. Sur body, une propriété personnalisée en fait le bord d'un cercle rouge géant, et `rotate:45deg` fait de body un losange. Au-delà de ce bord, le dégradé peint la couleur du canevas : cette partie du losange disparaît.

Utilisez les **Couleurs pédagogiques** pour voir la partie du dégradé de body qui finit dans la couleur du canevas.

{% include animations/2026-06-28.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                    /* html, head, body et style */
  * {                                  /* * * : head, body et style */
    margin: 25%79 25%221;              /* 100 79 100 221 : body fait 100 × 100 */
    rotate: 45deg;                     /* un losange, x = 200,3 … 341,7 */
    --a: at -1533%43cm,#be6b6c 60cm    /* le début du dégradé, propre à body */
  }
  background: radial-gradient(var(--a,1Q,#f1f271,25vw),#284a5b 0
```

## Comment ça marche

### 1. La page

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité vaut des px dans `margin`.

Le style n'est jamais fermé, pas plus que ses règles. Les éléments sont html, head, body et style (dans head). head et style sont masqués : seuls html et body se voient.

Le premier `*` les vise tous. Le `*` imbriqué veut dire `* *` : un élément placé dans un autre. html n'est dans rien, il ne reçoit donc que la règle extérieure. body reçoit les deux. Le `background` vient après la règle imbriquée, mais il appartient toujours au premier `*` : il vaut pour html et pour body.

### 2. html : un disque jaune

html n'a pas de `--a`, donc `var()` prend sa valeur de repli, `1Q,#f1f271,25vw`. Le fond de html est :

`radial-gradient(1Q,#f1f271,25vw,#284a5b 0)`

- `1Q` est la taille : une seule longueur fait du dégradé un cercle, de 0,945px de rayon. Ce rayon ne compte pas ici, car les arrêts de couleur sont donnés en px.
- `#f1f271` n'a pas de position : il commence à 0.
- `25vw` est un point de transition : 25 % des 400px de large, soit 100px.
- `#284a5b 0` ne peut pas revenir avant ce point : sa position est ramenée à 100px. Le point de transition est sur l'arrêt, donc le jaune tient jusqu'à 100px et passe d'un coup au bleu-gris.

On obtient un disque jaune de 100px de rayon, au bord net. Le fond de html couvre tout le canevas, et il est centré sur la boîte de html, 400 × 300 : le centre du disque est en (200, 150). Dans mon rendu, la colonne x = 200 est jaune de y = 50 à 249.

### 3. body : un carré de 100 × 100

`margin:25%79 25%221` donne 25 % de 400 = 100px en haut, 79px à droite, 100px en bas et 221px à gauche. Les pourcentages de marge se calculent toujours sur la largeur du bloc conteneur, même en haut et en bas.

En mode quirks, body s'étire pour remplir la hauteur de la page, moins ses marges : 300 − 100 − 100 = 100. Sa largeur est 400 − 221 − 79 = 100. offsetWidth et offsetHeight donnent 100 × 100 : body va de x = 221 à 321 et de y = 100 à 200.

html a un fond, donc celui de body reste sur body : il peint sa propre boîte.

### 4. body : le bord d'un cercle géant

body a `--a`, donc son fond est :

`radial-gradient(at -1533% 43cm,#be6b6c 60cm,#284a5b 0)`

- Le centre est à `-1533%` des 100px de large de body, soit −1533px, et à `43cm` vers le bas, soit 1625,2px. Depuis le coin de body, cela donne (−1312, 1725) sur le canevas : très loin en bas à gauche.
- Il n'y a pas de taille : la forme est une ellipse qui atteint le coin le plus lointain. Ses axes gardent le rapport des distances aux côtés les plus lointains, 1633 pour 1625,2 : c'est presque un cercle.
- `#be6b6c 60cm` peint du rouge jusqu'à 60cm, à 2267,7px du centre, le long de l'axe horizontal. L'axe vertical fait 2256,9px.
- `#284a5b 0` est ramené à 60cm : au-delà, du bleu-gris, avec un bord net.

Le centre de body est à 2233px du centre du dégradé, donc le bord passe 29px plus loin, vers le coin en haut à droite. À cette échelle, le bord du cercle géant paraît droit. Dans un rendu sans `rotate`, body est un carré rouge dont le coin en haut à droite est coupé par une ligne à 45°, de (262, 100) à (321, 159). Au-delà de cette ligne, body est bleu-gris.

### 5. rotate:45deg

body tourne de 45° dans le sens des aiguilles d'une montre, autour de son centre, (271, 150). Son fond tourne avec lui.

- Le carré devient un losange de 141,4px de large, de x = 200,3 à 341,7 et de y = 79,3 à 220,7. Son coin gauche, (200,3, 150), est sur le centre du disque.
- Le centre du dégradé passe en (−1962, 144) : presque droit à gauche de body.
- Le bord devient donc vertical. Dans mon rendu, de y = 110 à 190, chaque ligne est rouge jusqu'à x = 299 et bleu-gris à partir de x = 300. D'après la géométrie, c'est un léger arc, de x = 299,7 en y = 110 à 300,1 en y = 150.

C'est le 60cm qui place le bord là. Avec `59cm`, le bord recule de 37,8px vers la gauche, en x = 262 sur la ligne du milieu.

### 6. La partie bleu-gris disparaît

Au-delà du bord, le dégradé de body peint `#284a5b`, la couleur du canevas. Cette partie du losange, de x = 300 à 341,7, ne se voit pas.

Il reste la partie rouge : une forme à cinq côtés, de (200,3, 150) jusqu'à (271, 79,3), le long du côté en haut à droite du losange jusqu'à (300, 108,3), le long du bord jusqu'à (300, 191,7), puis retour par (271, 220,7). Ses deux côtés à 45° partent du centre du disque : ils découpent la part du disque. Le disque s'arrête en x = 300 sur la ligne du milieu, juste là où passe le bord.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `background` sert à html et à body. `--a` ne change que le début du dégradé : html garde la valeur de repli, body reçoit son propre centre, sa couleur et son rayon. Le `,#284a5b 0` de la fin sert aux deux. Avec les deux dégradés écrits en entier, l'extérieur en premier, l'image est la même en 161 caractères.
- `1Q` fait du dégradé un cercle en 2 caractères. Sans `1Q,` (133 caractères), le dégradé est une ellipse au rapport de la boîte de html, 4:3 : le disque devient une ellipse de 200 × 150, et 6 972 pixels changent. `circle` donne la même image que `1Q`, en 140.
- `25vw` vaut 100px en 4 caractères. `100px` donne la même image en 137.
- La partie bleu-gris du dégradé de body est la couleur du canevas : elle coupe le losange le long du bord, sans clip-path.
- Le `*` imbriqué vise body en 1 caractère, dans le premier `*{`. `*{body{` donne la même image en 139.
- Un `%` termine un nombre, donc le suivant n'a pas besoin d'espace : `25%79 25%221` et `-1533%43cm`. `100 79 100 221` donne la même image en 138 caractères, et `-1533px 43cm` aussi.
- 221 et 79 placent le centre de body en x = 271, pour que le coin gauche du losange tombe en 200,3, sur le centre du disque. Avec `25%80 25%220` (même longueur), le losange se décale de 1px vers la gauche, et 480 pixels changent.
- `cm` loge de grandes longueurs en peu de caractères : `43cm` vaut 1625,2px et `60cm` 2267,7px.
- Pas d'unité : `25%79px 25%221px` donne la même image en 140 caractères.
- Rien n'est fermé. `)}` à la fin donne la même image en 138 caractères.
