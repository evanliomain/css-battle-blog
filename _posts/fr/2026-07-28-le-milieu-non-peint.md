---
title: "Le milieu non peint : une prise en 156 caractères"
ref: 2026-07-28
permalink: /fr/2026/07/28/le-milieu-non-peint/
description: "Comment une seule déclaration border-image, lue avec deux hauteurs de ligne, dessine l'anneau et la tige dans html et le cadre crème autour de body dans la cible CSS Battle du 28 juillet 2026."
target: /assets/targets/2026-07-28.png
target_url: https://cssbattle.dev/play/LtfUvFd3HF61ZOGlL9Q9
colors: ["#4a9a86", "#ebf6f0", "#4c4c6b"]
player: selenit
chars: 156
score: 690.43
match: 100
code: |
  <style>*{background:#4A9A86;border-image:radial-gradient(1q at 50%25vw,#0000 74q,#EBF6F0 0 5lh,#4C4C6B)20 min(77in/2lh)/auto/5vw;*{margin:0 25%240;font:9lh'
---

La cible du 28 juillet ressemble à une prise : sur un fond gris violet, un bloc vert en haut avec un liseré crème, un disque vert dans un anneau crème en dessous, et une fine tige verte jusqu'au bas du cadre. Ilya Streltsyn la dessine avec une seule déclaration `border-image`, utilisée par html et par body. Une border-image sans `fill` laisse son milieu non peint. Sur html, ce milieu est une colonne de 30px, et le fond vert s'y voit : c'est la tige. Sur body, une police plus grande change la hauteur de ligne, et la même déclaration dessine un cadre crème de 20px.

Cochez **Couleurs pédagogiques** pour distinguer les deux fonds et les deux border-images, et passez en **Vue large** pour voir le débord de 20px autour du canevas.

{% include animations/2026-07-28.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, puis head, style, body */
  background: #4A9A86;           /* vert : le canevas (html) et le bloc (body) */
  border-image:
    radial-gradient(
      1q at 50%25vw,             /* taille 1q, centre à 50 % en largeur et 100px vers le bas */
      #0000 74q,                 /* transparent jusqu'à 69,92px */
      #EBF6F0 0 5lh,             /* crème jusqu'à 5lh : 90px dans html, 935px dans body */
      #4C4C6B                    /* puis violet */
    )
    20 min(77in/2lh)             /* tranches : 20 205 dans html, 20 dans body */
    / auto                       /* largeur : la taille de chaque tranche */
    / 5vw;                       /* débord : 20px */
  * {                            /* head, style, body */
    margin: 0 25%240;            /* body : 200 × 60 en (100 ; 0) */
    /* 9lh = 162px ; la famille est une chaîne vide, fermée par la fin du code */
    font: 9lh'
```

## Comment ça marche

### 1. html : un canevas vert

La balise style n'est jamais fermée : tout le code est du CSS. Il n'y a pas de doctype : la page est en mode quirks.

`*` vise html, head, style et body. head et style sont masqués. html fait 400 × 300, et son fond, `#4A9A86`, est le fond de la racine : il peint tout le canevas en vert. Le reste est peint par-dessus.

### 2. L'image : un anneau sur du violet

html reçoit une `border-image`. Aucun élément n'a de style de bordure, donc les bordures font 0. La border-image s'affiche quand même : sa taille vient de `border-image-width` et de `border-image-outset`, pas de la bordure.

Le débord vaut `5vw`. 1vw fait 4px, donc 5vw = 20px. La zone de la border-image est la boîte de html agrandie de 20px de chaque côté : 440 × 340, depuis (−20 ; −20).

L'image est un dégradé radial. Il n'a pas de taille propre, donc il remplit cette zone. Son centre est en `50%25vw` : 50 % de 440 = 220 en largeur, et 25vw = 100px vers le bas. Sur le canevas, c'est (200 ; 80).

`1q` est la taille : un cercle de rayon 1q. 1q est un quart de millimètre, 0,945px. Les arrêts :

- `#0000`, transparent, jusqu'à 74q = 69,92px.
- `#EBF6F0`, crème, de `0` à `5lh`. Un arrêt ne peut pas se placer avant le précédent, donc `0` est repoussé à 69,92px : un bord net. Dans html, la police fait 16px et 1lh vaut 18px dans mon Chrome, donc 5lh = 90px.
- `#4C4C6B`, violet, sans position. Le dernier arrêt va au bout du rayon du dégradé, 1q. C'est avant 90px, donc il est repoussé à 90px lui aussi : encore un bord net.

L'image est donc un disque transparent de rayon 69,92, un anneau crème jusqu'à 90px, et du violet partout ailleurs.

### 3. Les tranches : un trou de 30px, la tige

`20 min(77in/2lh)` est la découpe : 20 en haut et en bas, `min(77in/2lh)` à gauche et à droite. 77in = 7392px, et dans html 2lh = 36px. Une longueur divisée par une longueur donne un nombre sans unité : 205,33. Dans mon Chrome, la tranche est gardée en nombre entier : `getComputedStyle` donne `20 205`. J'ai vérifié : `20 205.333` donne la même image.

La découpe coupe l'image à 20px du haut et du bas, et à 205px de la gauche et de la droite. Cela fait quatre coins, quatre bords et un milieu. Sans le mot-clé `fill`, le milieu n'est pas peint.

La largeur est `auto` : ici, chaque bord prend la taille de sa tranche, 20px et 205px. Écrire `20px 205px` sur html donne la même image. Chaque morceau est donc peint à sa taille, à sa place. L'image s'affiche telle quelle, sauf le milieu : de x = −20 + 205 = 185 à 420 − 205 = 215, et de y = 0 à 300.

Par ce trou de 30px, le fond vert de html se voit : c'est la tige. Par le disque transparent aussi : c'est le disque vert. En haut du trou, l'anneau est coupé, mais body cache cette partie.

### 4. body : le bloc vert

Le `*{` imbriqué vaut `* *` : tout élément placé dans un autre. Ce sont head, style et body, et seul body s'affiche.

body prend `margin:0 25%240`. Une marge en pourcentage est une part de la largeur : 25 % de 400 font 100px. body va donc de x = 100 à 300. En mode quirks, body remplit la hauteur de html moins ses marges : 300 − 240 = 60. body fait 200 × 60, en (100 ; 0).

body reçoit aussi le fond vert du `*` extérieur. Le bloc couvre le haut de l'anneau et le haut du trou.

### 5. font : une nouvelle hauteur de ligne

`font:9lh'` règle la taille de police à 9lh. Dans body, `lh` dans la taille de police se calcule avec la hauteur de ligne du parent, les 18px de html : 9 × 18 = 162px. La famille est `''`, une chaîne vide : le raccourci `font` exige une famille, et la fin du code ferme le guillemet.

Dans mon Chrome, le 1lh de body vaut alors 187px. body reçoit la même déclaration `border-image`, mais ses valeurs en `lh` changent :

- `5lh` = 935px.
- `min(77in/2lh)` = 7392 / 374 = 19,76, gardé à 20 (`getComputedStyle` donne `20`).

La zone de la border-image de body est sa boîte plus le débord de 20px : 240 × 100, depuis (80 ; −20). Le centre du dégradé tombe au même endroit : 50 % de 240 = 120, donc x = 80 + 120 = 200, et 25vw fait toujours 100px, donc y = −20 + 100 = 80. L'image est transparente jusqu'à 69,92px, comme avant, puis crème jusqu'à 935px, bien au-delà de la zone. L'image de body est crème, avec un disque transparent.

### 6. Un cadre de 20px

La découpe vaut maintenant 20 sur les quatre côtés, et `auto` donne 20px de large à chaque bord. Le débord fait aussi 20px, donc le milieu non peint est exactement la boîte de body, 200 × 60.

Il reste un cadre crème de 20px, tout entier dans le débord : x = 80 à 100 à gauche, 300 à 320 à droite, y = 60 à 80 en bas, et y = −20 à 0 en haut, hors du canevas. Là où le bas du cadre croise le disque, l'image est transparente : le disque vert se voit au travers.

Le cadre s'arrête à y = 80. Juste en dessous, à y = 80, le violet de x = 80 à 110 est l'image de html, et le crème de 110 à 130 est son anneau. Cela donne les deux épaules de la prise.

## Notes de golf

- Une déclaration, deux dessins. Seule la hauteur de ligne change : 18px dans html, 187px dans body. Dans html, les tranches font 20 et 205 et l'anneau s'arrête à 90px. Dans body, les tranches font 20 et le crème va jusqu'à 935px.
- `77in` est le nombre qui convient aux deux : 7392 / 36 = 205,33 donne 205, et 7392 / 374 = 19,76 donne 20.
- `77in/2lh` divise une longueur par une longueur, ce qui ne marche que dans une fonction mathématique. `min()` avec un seul argument fait un caractère de moins que `calc()` : `calc(77in/2lh)` donne la même image en 157 caractères. Sans fonction du tout, Chrome ignore toute la `border-image` (elle vaut `none`), et 93 046 pixels changent.
- `5lh` vaut 90px dans html et 935px dans body. Avec `90px` à la place, le cadre de body reprend exactement l'image de html : même centre, même anneau. C'est la même image que sans border-image sur body, et 3 630 pixels changent.
- La taille `1q` du dégradé renvoie l'arrêt violet à 90px, un bord net sans écrire de position. Sans taille, le dégradé prend sa taille par défaut, le violet devient un fondu, et 84 698 pixels changent.
- `#0000` écrit transparent en 5 caractères, contre 11 pour `transparent`. Le `0` après `#EBF6F0` fait un bord net pour 1 caractère.
- `auto` fait 4 caractères, et les largeurs suivent les tranches : pas besoin de réécrire 20 et 205.
- `5vw` vaut 20px en 3 caractères. `20px` donne la même image en 157 caractères. Un `20` sans unité ne marche pas : dans `border-image-outset`, un nombre seul est un multiple de la largeur de bordure, qui vaut 0. Le débord disparaît, la tige aussi, et 21 004 pixels changent.
- `50%25vw` se passe d'espace : le `%` termine le nombre. `25vw` vaut 100px dans les deux éléments, car `vw` vient du canevas. `100px` donne la même image en 157 caractères.
- `margin:0 25%240` utilise la même astuce : `0 100 240` donne la même image en 157 caractères.
- `background` n'est écrit qu'une fois, dans `*` : il peint le canevas par html et le bloc par body.
- `font:9lh'` est un raccourci `font` complet : une taille et une famille vide, avec le guillemet laissé ouvert. `font:9lh a` donne la même image en 157 caractères. Sans `font`, body a la même hauteur de ligne que html : il reçoit les tranches 20 et 205 et un anneau de 90px, et 9 388 pixels changent.
- Rien n'est fermé : ni les deux règles, ni la balise style. Avec `}}</style>` à la fin, le code fait 166 caractères et l'image est la même.
