---
title: "html retourné, body remis à l'endroit : un L entre deux crochets en 125 caractères"
ref: 2026-07-24
permalink: /fr/2026/07/24/html-retourne-body-remis-a-l-endroit/
description: "Comment une seule liste de box-shadow, sur un html retourné et sur un body retourné deux fois, dessine un crochet de chaque côté et un L au milieu, dans la cible CSS Battle du 24 juillet 2026."
target: /assets/targets/2026-07-24.png
target_url: https://cssbattle.dev/play/YY6aMJfEYqKa166XP3rZ
colors: ["#a973a2", "#eff8fe"]
player: eguiluz
chars: 125
score: 721.52
match: 100
code: |
  <style>*{scale:-1 1;margin:70 170;background:#a973a2;color:eff8fe;box-shadow:inset 11Q -5ch,116Q 5ch#a973a2,25vw 0;*{margin:0
---

La cible du 24 juillet montre trois formes blanches et fines sur un fond mauve : un crochet ouvert vers la gauche, un L au milieu, et un crochet ouvert vers la droite. David Eguiluz donne à html et à body la même boîte de 60 × 160 et les trois mêmes ombres. Une ombre intérieure dessine le L, et deux ombres extérieures dessinent un crochet. `scale:-1 1` retourne html : son crochet passe à gauche. body est retourné une deuxième fois : il est de nouveau à l'endroit, son L reste au milieu et son crochet à droite.

Cochez **Couleurs pédagogiques** pour distinguer les ombres de html de celles de body, et pour voir les ombres violettes, qui ne se voient pas sur le canevas violet.

{% include animations/2026-07-24.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, puis head, body, style */
  scale: -1 1;                   /* retourné de gauche à droite */
  margin: 70 170;                /* html : une boîte de 60 × 160 en (170, 70) */
  background: #a973a2;           /* le canevas (via html), et body */
  color: eff8fe;                 /* la couleur des ombres */
  box-shadow:
    inset 11Q -5ch,              /* un L blanc : barre de 10,39px, pied de 40px */
    116Q 5ch#a973a2,             /* une copie violette, au-dessus : 109,61px à droite, 40px plus bas */
    25vw 0;                      /* une copie blanche, 100px à droite */
  * {                            /* head, body, style */
    margin: 0                    /* body remplit html */
```

## Comment ça marche

### 1. Une seule boîte pour html et body

Il n'y a pas de doctype : la page est en mode quirks. Dans ce mode, un nombre sans unité compte en px dans `margin`, et `eff8fe` sans `#` est une couleur valide. La balise style n'est jamais fermée : tout ce qui suit `<style>` est du CSS.

`*` vise d'abord html. `margin:70 170` laisse à html 400 − 2 × 170 = 60px de large. En mode quirks, html remplit la hauteur de la fenêtre moins ses marges : 300 − 2 × 70 = 160px. Sa boîte va de (170, 70) à (230, 230).

Le `*{` imbriqué vaut `* *` : tout élément placé dans un autre. Ce sont head, body et style. head et style sont masqués. `margin:0` retire à body les marges `70 170` reçues de `*`, et ses 8px par défaut. En mode quirks, body remplit html. Je l'ai vérifié avec getBoundingClientRect : html et body font tous les deux 60 × 160, en (170, 70).

Le fond de html passe au canevas : tout le canevas est `#a973a2`. body a son propre fond, le même violet, sur sa boîte.

### 2. L'ombre intérieure : un L

Une ombre sans couleur prend la `color` de l'élément : `#eff8fe`, le blanc de la cible. Deux des trois ombres l'utilisent.

`inset 11Q -5ch` est une ombre intérieure, décalée de 11Q vers la droite et de 5ch vers le haut. Une ombre intérieure peint l'intérieur de la boîte, sauf là où le « trou » décalé la couvre encore. Il reste une bande à gauche, aussi large que le décalage vers la droite, et une bande en bas, aussi haute que le décalage vers le haut.

11Q vaut 11 quarts de millimètre, environ 10,39px. `ch` est la largeur du « 0 » dans la police courante. Dans mon rendu, la police est Times 16px, et 5ch = 40px. Le L a une barre de x = 170 à 180,39, sur toute la hauteur de la boîte, et un pied de y = 190 à 230.

### 3. Deux ombres extérieures : un crochet

`25vw 0` est une copie de la boîte, en blanc, à 25 % de 400 = 100px vers la droite : de x = 270 à 330, et de y = 70 à 230.

`116Q 5ch#a973a2` est une copie en violet, à 116Q ≈ 109,61px vers la droite et 5ch = 40px vers le bas : de x = 279,61 à 339,61, et de y = 110 à 270.

Dans une liste d'ombres, la première est au-dessus. La copie violette vient avant la blanche : elle la couvre. De la copie blanche, il ne reste que les 40px du haut et une barre d'environ 9,6px de large à gauche : un crochet ouvert vers la droite. Le reste de la copie violette ne se voit pas sur le canevas violet.

### 4. scale:-1 1 : html dans le miroir

`scale:-1 1` met une échelle de −1 en largeur et de 1 en hauteur : un miroir de gauche à droite. Il tourne autour du centre de la boîte, x = 200. La boîte reste en place, mais tout ce qu'elle peint est retourné, ombres comprises.

La copie blanche de html va de x = 70 à 130, et sa copie violette de x = 60,39 à 120,39. Le crochet s'ouvre maintenant vers la gauche. Je l'ai vérifié en peignant le blanc de html en rouge : le crochet de gauche est rouge, et rien d'autre. Le L de html est retourné lui aussi : sa barre passe sur le bord droit de la boîte, de x = 219,61 à 230.

### 5. body cache le L de html

body est peint après html, par-dessus. Son fond violet couvre toute la boîte, et le L de html avec. Sans fond sur body, le L retourné de html se voit sur le côté droit de la boîte.

### 6. body : retourné deux fois

body reçoit la même règle que html : les mêmes ombres et le même `scale:-1 1`. Mais body est dans html, déjà retourné. Retourné deux fois, il est à l'endroit : −1 × −1 = 1. Les deux miroirs tournent autour de x = 200, le centre de la même boîte : body ne bouge pas.

Les ombres de body vont là où elles sont écrites. Son L est à gauche de la boîte : c'est le L au milieu du canevas. Son crochet est à droite.

Une seule liste d'ombres dessine les trois formes : le crochet de gauche sur html, le L et le crochet de droite sur body.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand un de ses canaux bouge de plus de 8.

- Le miroir permet à une seule liste d'ombres de dessiner les deux crochets. Sans `scale:-1 1;` (114 caractères), les ombres de html tombent sur celles de body, à droite. Le crochet de gauche manque, et 3 600 pixels changent.
- L'ordre des ombres extérieures compte. Inversées, `25vw 0,116Q 5ch#a973a2` (même longueur), la copie blanche passe au-dessus : les deux crochets deviennent des blocs blancs pleins de 60 × 160, et 12 240 pixels changent.
- `*{margin:0` est nécessaire. Sans `;*{margin:0` (114 caractères), body reçoit aussi `margin:70 170` dans un html de 60px de large, et il ne lui reste aucune largeur. Ses ombres disparaissent, le L retourné de html se voit à droite de la boîte, et 6 240 pixels changent.
- `11Q` vaut environ 10,39px en 3 caractères. `10px` en prend 4 : 126 caractères. Dans mon rendu, seule la colonne x = 180 change : 120 pixels, un mélange de blanc et de violet, deviennent violets.
- `116Q` vaut environ 109,61px en 4 caractères. `110px` en prend 5 : 126 caractères, et 240 pixels changent, dans les colonnes x = 120 et 279, qui deviennent blanches. `7pc` est plus court, 3 caractères (124 en tout), mais il vaut 112px : les barres des crochets font 12px de large, et 720 pixels changent.
- `5ch` vaut 40px en 3 caractères, et `25vw` vaut 100px en 4. Avec `40px` deux fois, le code fait 127 caractères ; avec `100px`, 126. Même image.
- Le mode quirks fait gagner des caractères deux fois. Avec `70px 170px`, le code fait 129 caractères ; avec `#eff8fe`, 126. Même image.
- `5ch#a973a2` : pas besoin d'espace avant le `#`. Avec l'espace, le code fait 126 caractères, même image.
- Rien n'est fermé : ni les deux règles, ni la balise style. Avec `}}</style>` à la fin, le code fait 135 caractères, 10 de plus, et l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, 360 pixels diffèrent de la cible de plus de 8 sur un canal. Ils forment trois colonnes de 120 pixels de haut : x = 180, le long du bord droit de la barre du L, et x = 120 et 279, le long des bords intérieurs des barres des deux crochets. Ces bords tombent entre deux pixels (11Q ≈ 10,39px, 116Q ≈ 109,61px). Dans mon rendu, ces pixels mélangent le blanc et le violet. Dans la cible, x = 180 est violet, et x = 120 et 279 sont blancs. Sur le juge de CSS Battle, le code est identique à 100 %.
