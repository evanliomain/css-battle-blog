---
title: "Des décalages en em : deux bougies en 123 caractères"
lang: fr
ref: 2026-10-09
permalink: /fr/2026/10/09/des-decalages-en-em/
description: "Comment une liste de trois box-shadow, avec des décalages en em et une taille de police divisée deux fois par deux, dessine les deux bougies de la cible CSS Battle du 9 octobre 2026."
target: /assets/targets/2026-10-09.png
target_url: https://cssbattle.dev/play/yzi0MYdpYpyHgy94qFCN
colors: ["#d07b5f", "#4dcb60", "#1bd2"]
player: emohdaziz
chars: 123
score: 723.86
match: 100
code: |
  <style>*{margin:65 76%65 86;color:D07B5F;box-shadow:78Q 0#4dcb60,9pc 5em,9pc -5em;font:50%a;*{background:#1bd2;margin:20-20
---

La cible du 9 octobre montre deux bougies de graphique boursier sur un bleu très pâle : une bougie verte, et une orange plus haute, chacune avec une mèche fine en haut et en bas. Mohamed Ali les dessine avec deux boîtes transparentes, `html` et `body`, et une seule liste de trois ombres qu'elles partagent. Les décalages verticaux des ombres sont en `em`, et `body` a une police deux fois plus petite : la même liste dessine les mèches sur `html` et les corps des bougies sur `body`.

{% include animations/2026-10-09.html lang=page.lang %}

## Le code, aéré

```css
* {                          /* html (head et style restent cachés) */
  margin: 65 76% 65 86;
  color: D07B5F;             /* la couleur des ombres qui n'en ont pas */
  box-shadow:
    78Q 0 #4dcb60,           /* vert */
    9pc 5em,                 /* orange, en bas */
    9pc -5em;                /* orange, en haut */
  font: 50% a;               /* 1em = 8px sur html, 4px sur body */
  * {                        /* body */
    background: #1bd2;
    margin: 20 -20;
  }
}
```

## Comment ça marche

### 1. Le fond vient du body

`html` n'a pas de fond à lui. Dans ce cas, c'est le fond de `body` qui est peint sur tout le canevas. `#1bd2`, c'est `#11bbdd` à 13 % d'opacité (`22` sur `ff`). Sur la page blanche, ça donne `#dff6fb`, le bleu pâle de la cible.

Le `*` imbriqué donne aussi ce fond à `head` et à `style`, mais ils sont cachés.

### 2. html est une boîte de 10 × 170

`margin:65 76%65 86` (CSS Battle tourne en mode quirks, les nombres seuls sont donc des pixels) :

- 76 % du cadre de 400px font 304px de marge à droite. Avec 86px à gauche, il reste 400 − 304 − 86 = 10px de large, en x = 86.
- En mode quirks, `html` remplit la hauteur du cadre moins ses marges : 300 − 65 − 65 = 170px.

Cette boîte n'a pas de fond, elle n'affiche donc rien. Une ombre extérieure n'est jamais peinte sous sa propre boîte, mais ça ne gêne pas ici : toutes les ombres tombent à côté.

`font:50%a` met la police à 50 % de 16px : 8px. Sur `html`, `5em` vaut donc 40px.

### 3. Les ombres de html : les mèches

Chaque ombre est une copie de la boîte de 10 × 170, déplacée de ses décalages :

- `78Q 0 #4dcb60` : 78Q, c'est 78 quarts de millimètre, environ 73,7px. Une copie verte en x ≈ 159,7 : la mèche verte.
- `9pc 5em` et `9pc -5em` : 9pc font 144px, donc x = 230. Elles n'ont pas de couleur, elles prennent donc `color`, l'orange `D07B5F`. L'une descend de 40px, l'autre monte de 40px. Elles se chevauchent en une seule mèche de y = 25 à y = 275 : 10 × 250.

### 4. body : plus large, plus court, police plus petite

Le `*` imbriqué vise `body`, placé dans la boîte de 10px de large de `html` :

- `margin:20-20`, c'est 20px en haut et en bas, −20px sur les côtés. Les marges latérales négatives lui donnent 10 + 20 + 20 = 50px de large, en x = 66.
- En mode quirks, il remplit la hauteur de `html` moins ses marges : 170 − 40 = 130px, à partir de y = 85.
- `font:50%a` s'applique encore, à 50 % des 8px du parent : 1em = 4px, donc `5em` = 20px.
- Le fond de `body` est parti sur le canevas : sa boîte est transparente, elle aussi.

### 5. Les mêmes ombres, une boîte plus grande : les corps

`body` a la même liste d'ombres, sur une boîte de 50 × 130 :

- `78Q 0` : une copie verte en x ≈ 139,7, y = 85 : le corps vert, 50 × 130.
- `9pc ±5em` : deux copies orange en x = 210, décalées de ±20px. Elles se chevauchent de y = 65 à y = 235 : le corps orange, 50 × 170.

`body` est peint après `html` : les corps recouvrent le milieu des mèches. Seuls les bouts dépassent : 20px au-dessus et en dessous du corps vert, 40px pour l'orange.

## Notes de golf

- Une seule règle pour deux boîtes : tout est dans `*`, et le `*` imbriqué ne réécrit que ce dont `body` a besoin.
- Les décalages verticaux sont en `em`, et `font:50%` divise le em par deux à chaque niveau. Le même `5em` donne ±40px sur `html` et ±20px sur `body`.
- `font` a besoin d'une famille pour être valide. `a` est la plus courte, et `50%a` se passe d'espace.
- `color:D07B5F` : en mode quirks, une couleur peut perdre son `#`. Elle colore les deux ombres écrites sans couleur.
- `#1bd2` laisse la page blanche dessous finir la couleur : 5 caractères.
- `0#4dcb60` et `20-20` n'ont pas besoin d'espace. `9pc -5em`, si : `9pc-5em` serait lu comme un seul nombre avec une unité inconnue.

## Si vous l'essayez chez vous

78Q vaut 73,70px, pas un nombre entier. Dans le dernier Chrome (la version 156 au moment où ces lignes sont écrites), les bords gauche et droit de la mèche verte et du corps vert tombent à 0,3px de la grille des pixels : ils sont fondus sur une colonne de pixels. Avec `74px` à la place de `78Q`, le rendu local est identique à la cible. Sur le juge de CSS Battle, le code d'origine est identique à 100 %.
