---
title: "Deux ombres, un rayon : quatre feuilles encadrées en 145 caractères"
ref: 2026-05-07
permalink: /fr/2026/05/07/deux-ombres-un-rayon/
description: "Comment deux ombres portées sur une boîte de 7px, et offset:ray(0deg) qui tourne html, body, dl et p d'un quart de tour chacun, dessinent quatre feuilles vertes encadrées de bleu marine dans la cible CSS Battle du 7 mai 2026."
target: /assets/targets/2026-05-07.png
target_url: https://cssbattle.dev/play/Z3lKKVf2KPlgDDljnQaz
colors: ["#3157b4", "#84be8d", "#060f55"]
player: emohdaziz
chars: 145
score: 700.43
match: 100
code: |
  <dl><p><style>*{background:#3157b4;box-shadow:60px 60px 0 39q#84be8d,60px 60px 0 49q#060f55;border-radius:50%0 0;height:7;width:7;offset:ray(0deg
---

La cible du 7 mai montre quatre feuilles vertes sur un fond bleu, en grille de 2 × 2. Chaque feuille a un cadre bleu marine et un coin arrondi, et les coins arrondis font tous face au centre. Mohamed Ali dessine une seule feuille, avec deux ombres d'une boîte de 7px, et la donne à html, body, dl et p. `offset:ray(0deg` empile les quatre boîtes au milieu du canevas et tourne chacune d'un quart de tour de plus que son parent : la même feuille arrive dans les quatre coins.

Avec les **couleurs pédagogiques**, chaque boîte et son cadre bleu marine ont leur propre couleur, et des flèches montrent vers où chaque boîte envoie ses ombres.

{% include animations/2026-05-07.html lang=page.lang %}

## Le code, aéré

```css
<dl><p>                        /* html > body > dl > p */
<style>
* {                            /* html, head, body, dl, p, style */
  background: #3157b4;         /* celui de html va sur tout le canevas */
  box-shadow:
    60px 60px 0 39q #84be8d,   /* vert : 60px à droite et en bas, grossi de 36,85px : carré de 80,70 */
    60px 60px 0 49q #060f55;   /* bleu marine, dessous : grossi de 46,30px : carré de 99,60 */
  border-radius: 50% 0 0;      /* coin en haut à gauche : 3,5px */
  height: 7;                   /* 7px en mode quirks */
  width: 7;
  /* un chemin : centrée dans le bloc conteneur, tournée de -90° ; la fin du code ferme ( et { */
  offset: ray(0deg
```

## Comment ça marche

### 1. Quatre boîtes, l'une dans l'autre

`<dl><p>` ouvre deux éléments, et aucun ne ferme l'autre. Le `<style>` se retrouve dans p, donc la page est html > body > dl > p.

`*` vise tous les éléments : html, head, body, dl, p et style. head et style ne sont pas affichés. Il reste quatre boîtes, et elles reçoivent toutes la même règle.

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. `height:7;width:7` s'y passe d'unité : les quatre boîtes font 7 × 7.

### 2. Le fond

html est la racine : son fond est peint sur tout le canevas, pas seulement dans sa boîte de 7 × 7. Cela donne le bleu, `#3157b4`.

body, dl et p ont le même fond bleu. Leurs boîtes finissent au milieu du canevas (section suivante), bleu sur bleu : elles ne se voient jamais.

### 3. offset: ray(0deg)

`offset` pose une boîte sur un chemin, et `offset:ray(0deg` est un rayon d'angle 0deg. Avec l'`offset-position` par défaut, le rayon part du centre du bloc conteneur, et le centre de la boîte se pose sur ce point.

- Le bloc conteneur de html est le canevas : son centre est (200, 150).
- Celui de body est html, celui de dl est body, celui de p est dl. Chacun va au centre de son parent, donc les quatre s'empilent au même endroit.

Dans une copie de test avec un fond rouge sur p, mon rendu montre la boîte de (196,5 ; 146,5) à (203,5 ; 153,5) : les pixels en x = 196 et 203 sont à moitié rouges.

### 4. Des quarts de tour qui s'additionnent

`offset-rotate` vaut `auto` par défaut : la boîte tourne pour suivre le chemin. Un rayon à 0deg pointe vers le haut, et la boîte tourne de 0° − 90° = −90° : un quart de tour dans le sens inverse des aiguilles d'une montre, autour de son centre.

Une boîte tourne avec tout ce qu'elle contient, donc le tour d'un enfant s'ajoute à celui de son parent. html tourne de −90°, body de −180°, dl de −270°, et p de −360°, comme s'il n'avait pas tourné. Les quatre boîtes ont le même centre : les tours ne changent que l'endroit où vont leurs ombres.

Je l'ai vérifié dans une copie de test, avec une couleur d'ombre par élément : la feuille de html est en haut à droite, celle de body en haut à gauche, celle de dl en bas à gauche et celle de p en bas à droite. Avec `ray(90deg` (146 caractères), le tour vaut 0° pour toutes les boîtes : les quatre feuilles s'empilent en bas à droite, et 28 799 pixels changent.

### 5. L'ombre verte

Je prends les ombres de p, puisque p finit sans tour. `60px 60px 0 39q#84be8d` copie la boîte 60px à droite et 60px plus bas. Le `0` est le flou : aucun. La quatrième longueur est l'étalement : la copie grossit de 39q de chaque côté. 1in = 101,6Q, donc 1Q = 0,945px et 39q = 36,85px.

Le carré vert fait 7 + 2 × 36,85 = 80,70 de large, centré en (260, 210) : de (219,65 ; 169,65) à (300,35 ; 250,35).

`border-radius:50%0 0` arrondit le coin en haut à gauche de 50 % de 7 : 3,5px. Les trois autres restent carrés. Dans l'ombre, ce coin devient un quart de cercle centré sur le centre de la feuille : sur la diagonale, mon rendu place le bord du vert à 40,3px de (260, 210), soit 3,5 + 36,85 = 40,35, la moitié du côté. Ce coin fait face au centre du canevas.

### 6. L'ombre bleu marine dessous

`60px 60px 0 49q#060f55` fait la même chose avec 49q = 46,30px : un carré bleu marine de 7 + 2 × 46,30 = 99,60, de (210,20 ; 160,20) à (309,80 ; 259,80), avec un coin arrondi de 3,5 + 46,30 = 49,80.

La première ombre de la liste est peinte au-dessus. Le vert couvre le bleu marine, et il ne reste qu'un bord de 49q − 39q = 10q = 9,45px : le cadre. Avec les deux ombres inversées (145 caractères), le bleu marine couvre le vert, et 25 381 pixels changent.

### 7. Quatre feuilles

Les quatre boîtes ont les mêmes ombres, mais chacune les porte dans son propre sens. Une ombre à 60px à droite et en bas dans le repère de p va, sur le canevas :

- html, −90° : en haut à droite, centrée en (260, 90) ;
- body, −180° : en haut à gauche, (140, 90) ;
- dl, −270° : en bas à gauche, (140, 210) ;
- p, −360° : en bas à droite, (260, 210).

Le coin arrondi tourne aussi, donc il fait toujours face au centre. Les feuilles font 99,60 de large et sont à 120 l'une de l'autre : il reste 2 × (60 − 49,80) = 20,40px de bleu entre elles.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une paire d'ombres et un tour servent quatre boîtes. Les tours s'additionnent, donc la même feuille arrive à quatre endroits.
- Les deux balises doivent s'emboîter. Avec `<p><p>` (144 caractères), le second p ferme le premier : les deux sont enfants de body et tournent tous les deux de −270°. Ils dessinent la même feuille en bas à gauche, la feuille en bas à droite manque, et 9 840 pixels changent.
- `offset:ray(0deg` centre et tourne toutes les boîtes en 15 caractères. Écrit `offset-path:ray(0deg` (150 caractères), l'image est la même.
- L'angle a besoin de son unité. Avec `ray(0` (142 caractères), la déclaration est invalide et ignorée : les boîtes restent dans le flux, sans tour, les feuilles s'empilent près du coin en haut à gauche, et 45 641 pixels changent.
- 0deg n'est pas le seul angle qui marche : avec `ray(180deg` (147 caractères), chaque boîte tourne de +90° à la place, la feuille de html va en bas à gauche et celle de dl en haut à droite, et l'image est la même.
- `height:7;width:7` se passe d'unité en mode quirks. Avec deux fois `7px` (149 caractères), l'image est la même.
- La boîte de 7px fixe la taille de tout : son rayon de 50 %, 3,5px, plus l'étalement donne le quart de cercle de la feuille.
- `39q` et `49q` écrivent 36,85px et 46,30px en 3 caractères chacun. Avec `36.5px` et `46.5px` (151 caractères), mon rendu se rapproche de la cible : 485 pixels s'en écartent de plus de 8 niveaux, contre 2 685 pour le code officiel.
- Pas d'espace avant un `#` : `39q #84be8d` et `49q #060f55` donnent la même image en 147 caractères.
- `50%0 0` se passe d'espace après `%`, et trois valeurs suffisent : la troisième règle le coin en bas à droite, la deuxième ceux en haut à droite et en bas à gauche. Avec `50% 0 0` (146 caractères), l'image est la même.
- Le code se termine dans `ray(` et dans la règle : la fin du code les ferme. Avec `)}` à la fin (147 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes quatre feuilles que la cible, mais 2 685 pixels diffèrent de plus de 8 niveaux. Ils sont tous sur les bords des feuilles, de x = 90 à 309 et de y = 40 à 259, de 662 à 687 par feuille. Les aplats sont les mêmes : (49, 87, 180), (132, 190, 141) et (6, 15, 85). Dans la cible, les bords tombent sur des pixels entiers : sur la ligne y = 210, le bleu marine va de x = 210 à 309 et le vert de 220 à 299. Dans mon rendu, les pixels en x = 210, 219, 300 et 309 de cette ligne mélangent les deux couleurs de part et d'autre. La plus grande différence est de 163 niveaux, sur le bord d'un coin arrondi. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
