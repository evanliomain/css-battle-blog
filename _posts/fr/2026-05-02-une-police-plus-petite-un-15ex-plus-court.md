---
title: "Une police plus petite, un 15ex plus court : deux colonnes et deux pilules en 132 caractères"
ref: 2026-05-02
permalink: /fr/2026/05/02/une-police-plus-petite-un-15ex-plus-court/
description: "Comment une seule liste d'ombres dessine à la fois les deux colonnes, à partir d'un html très haut, et les deux pilules, à partir d'un body plat, avec une police de 7q qui raccourcit le 15ex de body, dans la cible CSS Battle du 2 mai 2026."
target: /assets/targets/2026-05-02.png
target_url: https://cssbattle.dev/play/bxeCtMaJJEs3KcDlKtkI
colors: ["#84be8d", "#e25c57", "#525142"]
player: h_blierzt
chars: 132
score: 713.68
match: 100
code: |
  <style>*{margin:-83%170 0;box-shadow:15ex 176q#84BE8D,-15ex 1in#E25C57;*{margin:286-46;border-radius:1in;background:#525142;font:7q'
---

La cible du 2 mai montre deux colonnes verticales sur un fond olive sombre : rouge à gauche, verte à droite. De chaque colonne part une barre aux bouts ronds, vers le milieu, la rouge plus haut que la verte. H_Bliertz dessine les quatre formes avec une seule liste d'ombres, partagée par html et body. Les colonnes sont des copies de html, les pilules des copies de body. Une toute petite police sur body raccourcit le même `15ex` : les pilules arrivent plus près du milieu que les colonnes.

Avec **Couleurs pédagogiques**, les deux ombres de body prennent leurs propres couleurs : on voit leurs bouts dans les colonnes. **Vue large** montre jusqu'où html monte au-dessus du canevas.

{% include animations/2026-05-02.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* html, head, style, body */
  margin: -83%170 0;         /* html : -332 en haut, 170 à gauche et à droite, 0 en bas */
  box-shadow:
    15ex 176q#84BE8D,        /* copie verte : 15ex à droite, 166,3px plus bas */
    -15ex 1in#E25C57;        /* copie rouge : 15ex à gauche, 96px plus bas */
  * {                        /* head, style, body */
    margin: 286-46;          /* body : 286 en haut et en bas, -46 à gauche et à droite */
    border-radius: 1in;      /* 96px : des bouts ronds */
    background: #525142;     /* passe au canevas */
    font: 7q'                /* police de 6,61px : un ex plus court */
  /* la fin du code ferme la chaîne et les deux règles */
```

## Comment ça marche

### 1. Deux boîtes, une règle

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre sans unité comme `170` dans une marge y est lu en px.

Le `<style>` va dans head, et body reste vide. `*` vise html, head, style et body. Le `*{` imbriqué vise chaque élément placé dans un autre : head, style et body. head et style ne s'affichent pas. Il reste deux boîtes : html et body. Les deux reçoivent la liste d'ombres. Seul body reçoit le second niveau.

### 2. Un html très haut

html reçoit `margin:-83%170 0`. Un pourcentage de marge se calcule sur la largeur du bloc conteneur, même pour la marge du haut. Ici, c'est la page de 400px : −83 % de 400 = −332.

En mode quirks, html remplit la page moins ses marges. Il fait 400 − 2 × 170 = 60 de large et 300 + 332 − 0 = 632 de haut, en (170, −332). Il est presque tout entier au-dessus du canevas.

### 3. Un body plat, et un canevas sombre

body reçoit `margin:286-46` : 286px en haut et en bas, −46px à gauche et à droite. En mode quirks, body remplit lui aussi la hauteur de html moins ses marges : 632 − 2 × 286 = 60 de haut. Les marges négatives lui donnent 60 + 2 × 46 = 152 de large. Mon rendu le place en (124, −46) : seuls ses 14px du bas sont sur le canevas.

`border-radius:1in` vaut 96px. C'est plus que la moitié des 60px de haut de body : le rayon descend à 30px, et les bouts sont des demi-cercles.

html n'a pas de fond. Dans ce cas, le fond de body passe au canevas, et tout le canevas est `#525142`. La boîte de body elle-même ne montre rien.

### 4. Les copies de html : les colonnes

Une ombre sans flou est une copie de la boîte, déplacée de son décalage. La liste a deux copies. La verte va de 15ex vers la droite et de 176q vers le bas, la rouge de 15ex vers la gauche et de 1in vers le bas. 1Q est un quart de millimètre, 0,945px : 176q = 166,3px. 1in = 96px.

html garde la police par défaut, du Times de 16px. Dans mon Chrome, son 15ex vaut 107,695px, donc 1ex vaut 7,18px. La cible place les colonnes à 110px de html : de x = 60 à 120 et de x = 280 à 340. Voir la dernière section.

Les copies font 60 × 632, comme html. La verte va de y = −332 + 166,3 = −165,7 à 466,3, la rouge de −236 à 396. Les deux couvrent toute la hauteur du canevas. C'est pour cela que html est si haut : un html plus court laisserait des trous en haut ou en bas des colonnes.

### 5. Les copies de body : les pilules

Le premier `*` vise aussi body : il a la même liste d'ombres. Ses copies sont des pilules de 152 × 60, parce qu'une ombre suit les coins arrondis de sa boîte.

Les décalages verticaux sont des longueurs fixes, les mêmes que sur html. La pilule rouge est 96px sous body : de y = −46 + 96 = 50 à 110. La verte est 166,3px plus bas : de y = 120,3 à 180,3.

Une ombre extérieure n'est jamais peinte sous sa propre boîte. La boîte de body s'arrête en y = 14, au-dessus des deux pilules : rien n'est coupé.

### 6. La police raccourcit 15ex

`ex` est la hauteur d'x de la police de l'élément. Sans police à lui, body aurait le 15ex de html : chaque pilule serait centrée sur sa colonne.

`font:7q'` donne à body une police de 7q = 6,61px. Le raccourci `font` a besoin d'un nom de police : le `'` ouvre une chaîne, et la fin du code la ferme. Le nom est vide, donc body garde la police par défaut. Dans mon Chrome, le 15ex de body vaut 44,49px : 0,4484 fois la taille de la police, contre 0,4487 sur html.

La cible place les pilules à 46px de body : la rouge de x = 124 − 46 = 78 à 230, la verte de 170 à 322. Le bout gauche de la pilule rouge est dans la colonne rouge, le bout droit de la verte dans la colonne verte. body est peint après html : les pilules passent par-dessus les colonnes. Elles ont la même couleur, donc les raccords ne se voient pas.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres pour deux boîtes. `ex` fait dépendre les décalages de côté de la police, et les décalages verticaux restent fixes. Avec une seconde liste sur body en px, `box-shadow:44.49px 176q#84BE8D,-44.49px 1in#E25C57` à la place de `font:7q'` (174 caractères), l'image est la même, mais le code a 42 caractères de plus.
- La police est nécessaire. Sans `;font:7q'` (123 caractères), le 15ex de body vaut 107,695px, comme celui de html : chaque pilule est centrée sur sa colonne, et 12 732 pixels changent.
- `font:7q'` fait 8 caractères. Avec `font-size:7q` (136 caractères), l'image est la même. Le `'` est nécessaire : avec `font:7q` (131 caractères), mon Chrome ignore la déclaration, et les 12 732 pixels changent comme sans police.
- `-83%170` n'a pas besoin d'espace : le `%` termine le premier nombre. Avec `-332 170 0` (133 caractères), l'image est la même.
- Le dernier `0` est nécessaire. Avec `margin:-83%170` (130 caractères), la marge du bas vaut aussi −332. html fait 964px de haut et body 392px. La boîte de body couvre alors le milieu du canevas, ses ombres ne sont peintes qu'en dehors, et 13 088 pixels changent.
- `176q` fait 4 caractères pour 166,3px. Avec `166px` (133 caractères), la pilule verte monte de 0,3px, et 229 pixels changent, sur ses bords du haut et du bas.
- `1in` fait 3 caractères pour 96px, dans l'ombre et dans le rayon. Avec `96px` dans l'ombre (133 caractères), l'image est la même. Un `96` sans unité ne marche pas ici : les nombres sans unité sont permis dans les marges, pas dans les ombres. Avec `96#E25C57` (131 caractères), mon Chrome ignore toute la liste d'ombres, il ne reste que le canevas sombre, et 49 000 pixels changent.
- `border-radius:1in` donne des bouts ronds. Avec `50%` (132 caractères, la même longueur), le rayon fait 76px de large et 30px de haut : les pilules deviennent des ellipses, et 1 675 pixels changent.
- Pas besoin d'espace avant `#` : `176q#84BE8D`. Avec `176q #84BE8D` (133 caractères), l'image est la même.
- Le `*` imbriqué atteint body pour 2 caractères. Avec `body{` (135 caractères), l'image est la même.
- Des nombres sans unité dans les marges, grâce au mode quirks. Avec `170px` et `286px -46px` (139 caractères), l'image est la même. Avec un doctype devant (147 caractères), mon Chrome ignore les deux marges : html fait 400 × 8, body 0px de haut, les copies de html sont deux fines bandes, et 48 554 pixels changent.
- Le code s'arrête au milieu d'une chaîne et de deux règles : la fin du code les ferme. Avec `''}}` à la fin (135 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome local (version 157 au moment d'écrire), le code officiel est proche mais pas exact au pixel. Le 15ex de html y vaut 107,695px, alors que la cible place les colonnes à 110px de html, et celui de body 44,49px, alors que la cible place les pilules à 46px de body. Les formes rouges sont à droite de celles de la cible, et les vertes à gauche. La colonne rouge va de x = 62,3 à 122,3 dans mon rendu, de 60 à 120 dans la cible. La verte va de 277,7 à 337,7, contre 280 à 340. La pilule rouge finit en x = 231,5 au lieu de 230, et la verte commence en 168,5 au lieu de 170. 4 571 pixels s'écartent de la cible de plus de 8 sur une composante.

Dans une copie de test avec `110px` à la place de `15ex`, et une seconde liste sur body avec `46px` (180 caractères), les colonnes et les pilules tombent là où la cible les a. Il reste 1 544 pixels, tous à moins de 8 pixels d'un bord : la cible est un JPEG, avec du bruit de compression autour des formes. Le juge de CSS Battle donne au code officiel 100 % de correspondance. L'animation ci-dessus place les formes là où la cible les a.
