---
title: "Le canevas entre deux ombres : deux carrés et une bande en escalier en 146 caractères"
ref: 2026-05-23
permalink: /fr/2026/05/23/le-canevas-entre-deux-ombres/
description: "Comment une seule liste d'ombres, donnée à html et à body retourné par scale:-1, couvre de bleu le haut et le bas du canevas et laisse entre les deux une bande bleu marine en escalier, dans la cible CSS Battle du 23 mai 2026."
target: /assets/targets/2026-05-23.png
target_url: https://cssbattle.dev/play/zTrEUTEOdXmgNinBTKWy
colors: ["#060f55", "#84be8d", "#3157b4"]
player: fmata
chars: 146
score: 699.48
match: 100
code: |
  .<style>*{background:#060F55;color:3157B4;box-shadow:-5LH 0,0-233Q 0 2IN,inset 5PC 89Q#84BE8D;margin:36 190 36%90;*{margin:108-100-90%100;scale:-1
---

La cible du 23 mai montre deux carrés vert clair sur du bleu, l'un en haut à gauche, l'autre en bas à droite. Une bande bleu marine traverse le canevas derrière eux, avec une marche au milieu. fmata ne dessine pas la bande. html et body reçoivent les mêmes trois ombres, et body est retourné. Deux ombres bleues géantes couvrent le haut et le bas, et le canevas bleu marine se voit entre les deux.

Avec la **Vue large**, on voit la taille réelle des deux ombres géantes. Avec les **Couleurs pédagogiques**, chaque ombre a sa propre couleur.

{% include animations/2026-05-23.html lang=page.lang %}

## Le code, aéré

```css
.<style>                         /* le point est du texte : il ouvre body */
* {                              /* html, head, body, style */
  background: #060F55;           /* celui de html passe au canevas */
  color: 3157B4;                 /* sans dièse : accepté en mode quirks */
  box-shadow:
    -5LH 0,                      /* une copie 90px à gauche */
    0 -233Q 0 2IN,               /* étalement 192px, remontée de 220,16px */
    inset 5PC 89Q #84BE8D;       /* vert, sauf le coin que couvre la boîte décalée */
  margin: 36 190 36% 90;         /* html : 120 × 120 en (90, 36) */
  * {                            /* head, body, style */
    margin: 108 -100 -90% 100;   /* body : 120 × 120 en (190, 144) */
    scale: -1                    /* un demi-tour autour de son centre */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `190` dans une marge est lu en px.

Le code commence par un point. C'est du texte : le navigateur ouvre body et l'y met. Le `<style>` vient ensuite, dans body lui aussi. La page contient html, un head vide, et body avec le point et le style.

`*` vise tous les éléments. Le `*{` imbriqué vise tous les éléments placés dans un autre : head, body et style. head et style ne s'affichent pas : les règles ne dessinent que sur html et body. Elles ne sont jamais fermées : la fin du code les ferme.

### 2. Deux boîtes de 120 × 120

html reçoit `margin:36 190 36%90`. Une marge en pourcentage est une part de la largeur, ici les 400px de la page : 36 % font 144. html fait 400 − 190 − 90 = 120 de large, en x = 90. En mode quirks, html remplit la hauteur de la page moins ses marges : 300 − 36 − 144 = 120. html fait 120 × 120 en (90, 36).

body reçoit `margin:108-100-90%100`. −90 % est une part de la largeur de html : −108. En mode quirks, body remplit html moins ses propres marges. Il fait 120 + 100 − 100 = 120 de large et 120 − 108 + 108 = 120 de haut, en (90 + 100, 36 + 108) = (190, 144). Le centre de body est en (250, 204).

### 3. Un canevas bleu marine

Tous les éléments reçoivent `background:#060F55`. Le fond de html ne se peint pas dans sa boîte : il passe au canevas, qui devient bleu marine partout. body peint sa propre boîte en bleu marine, sur le canevas bleu marine. Sans la déclaration `background`, tout le bleu marine devient blanc.

`color:3157B4` n'a pas de `#`. Le mode quirks accepte une couleur hexadécimale sans lui : la couleur du texte est #3157B4. Les deux ombres extérieures n'ont pas de couleur à elles : elles prennent celle-ci.

### 4. Une copie à gauche

La première ombre est `-5LH 0`. 1lh est la hauteur de ligne. Avec la police par défaut de 16px et une hauteur de ligne normale, elle vaut 18px dans mon Chrome : l'ombre est décalée de 90px vers la gauche. C'est une copie de html de x = 0 à 120, y = 36 à 156.

Une ombre extérieure ne se peint jamais sous sa propre boîte. La partie de x = 90 à 120 est cachée, et il reste une bande bleue de x = 0 à 90.

### 5. Une ombre géante

La deuxième ombre est `0-233Q 0 2IN` : pas de décalage en x, un décalage en y de −233q = −220,16px, pas de flou, et un étalement de 2in = 192px. L'étalement agrandit l'ombre de 192px de chaque côté : 120 + 384 = 504 px de large, de x = −102 à 402, et de y = 36 − 192 = −156 à 348.

Remontée de 220,16px, elle va de y = −376,16 à 127,84. Elle couvre toute la largeur du canevas, du haut jusqu'en y = 127,84, sauf la boîte de html elle-même.

### 6. Du vert, moins un coin

La troisième ombre est `inset 5PC 89Q#84BE8D` : une ombre intérieure, décalée de 5pc = 80px et 89q = 84,09px. Une ombre intérieure remplit la boîte, sauf là où une copie de la boîte, décalée du même écart, la couvre encore. La copie décalée commence en (170 ; 120,09).

Le vert remplit donc la boîte de html, sauf le coin de x = 170 à 210 et de y = 120,09 à 156. Ce coin montre le canevas bleu marine.

### 7. body : le même dessin, retourné

body reçoit les mêmes trois ombres, et la règle imbriquée ajoute `scale:-1`. Une échelle de −1 sur les deux axes est une symétrie par rapport au centre de la boîte, (250, 204) : c'est la même chose qu'un demi-tour. Chaque point (x, y) va en (500 − x, 408 − y).

Avant le retournement, la copie de body est à sa gauche, de x = 100 à 190. Après, la bande est à droite : x = 310 à 400, y = 144 à 264. Avant le retournement, l'ombre géante couvrirait le canevas jusqu'en y = 144 + 120 + 192 − 220,16 = 235,84. Après, elle couvre le bas, à partir de y = 408 − 235,84 = 172,16. Le coin libre passe en haut à gauche de body : x = 190 à 230, y = 144 à 179,91. Là, c'est le fond bleu marine de body qui se voit.

body est peint après html, par-dessus, mais leurs formes ne se touchent que dans des coins bleu marine.

### 8. La bande, c'est le canevas

Rien ne couvre le canevas entre y = 127,84 et 172,16. Ce trou, c'est la bande bleu marine. Les deux bandes bleues des côtés la déplacent :

- à gauche, la bande de html la couvre jusqu'en y = 156 : la bande bleu marine va de y = 156 à 172,16, sous le carré vert de html ;
- à droite, la bande de body la couvre à partir de y = 144 : la bande bleu marine va de y = 127,84 à 144, au-dessus du carré vert de body ;
- au milieu, les deux coins libres relient les deux parties : celui de html, de x = 170 à 210 et y = 120,09 à 156, et celui de body, de x = 190 à 230 et y = 144 à 179,91. Ils font la marche.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres pour deux boîtes. `scale:-1` coûte 9 caractères avec son `;`. Écrire les ombres de body à la place, `;box-shadow:5LH 0,0 233Q 0 2IN,inset -5PC -89Q#84BE8D`, donne les mêmes carrés et la même bande en 190 caractères. Seul le point bouge : il reste en haut à gauche de body, et 13 pixels changent.
- `scale:-1` fait le demi-tour en 8 caractères. Avec `rotate:180deg` (151 caractères), l'image est la même.
- Le bleu n'est écrit qu'une fois. Les ombres extérieures prennent la couleur du texte. Écrire `#3157B4` dans les deux ombres et enlever `color` (147 caractères) donne les mêmes ombres, mais le point devient noir : 8 pixels changent.
- Pas de `#` devant `3157B4`, grâce au mode quirks. Avec `color:#3157B4` (147 caractères), l'image est la même.
- Un `%` termine un nombre : pas besoin d'espace après lui. `36%90`, c'est 144 puis 90 : avec `144 90` (147 caractères), l'image est la même. `-90%100`, c'est −108 puis 100 : avec `-108 100` (147 caractères), l'image est la même.
- Unités courtes : `5LH` vaut 90px, `2IN` 192px et `5PC` 80px. Avec `90px` (147 caractères), `192px` (148) ou `80px` (147), l'image est la même.
- L'unité q fait tenir 84,09px dans `89Q`, 3 caractères. Avec `84px` (147 caractères), l'image est la même. `-233Q` fait 5 caractères. Avec `-220px` (147 caractères), les ombres géantes s'arrêtent sur des pixels entiers, en y = 128 et 172. Les lignes y = 127 et y = 172 deviennent bleu uni, et 380 pixels changent.
- Pas d'espace avant `-233Q` ni avant `#84BE8D`, ni entre les marges de body. Avec ces espaces, `0 -233Q`, `89Q #84BE8D` et `108 -100 -90% 100`, la même image prend 151 caractères.
- Le bleu marine ne coûte rien de plus : le fond de html passe au canevas. Sans la déclaration `background` (127 caractères), le canevas est blanc et 9 100 pixels changent.
- Le point ouvre body comme du texte. Sans lui (145 caractères), mon Chrome dispose la page autrement : html fait 105 × 233,41, body 105 × 111,91, et 6 126 pixels changent. Un espace simple à sa place (146 caractères) fait pareil : l'analyseur l'ignore, et les mêmes 6 126 pixels changent.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 797 pixels, avec la même règle que dans les notes de golf. 383 d'entre eux sont sur les lignes y = 127 et y = 172. Les ombres géantes s'arrêtent en y = 127,84 et 172,16 : ces lignes mélangent le bleu et le bleu marine, là où la cible est bleue. Avec `-220px` à la place de `-233Q` (147 caractères), les bords tombent sur des pixels entiers et il reste 423 pixels. 6 autres sont le point lui-même : un petit point bleu en (307, 250), sur le carré vert du bas, que la cible n'a pas. Avec un espace insécable à la place du point, il disparaît. Tous les autres pixels sont à moins de 6 pixels d'un bord : la cible est un JPEG, avec du bruit de compression autour des formes. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
