---
title: "Des tirets dehors, des tuiles dedans : cinq carrés superposés en 126 caractères"
ref: 2026-05-19
permalink: /fr/2026/05/19/des-tirets-dehors-des-tuiles-dedans/
description: "Comment une seule boîte dessine cinq carrés superposés : un dégradé conique en tuiles de 80px peint ses quatre coins foncés, et son outline en tirets de 40px peint les quatre L extérieurs, dans la cible CSS Battle du 19 mai 2026."
target: /assets/targets/2026-05-19.png
target_url: https://cssbattle.dev/play/3icQq5UDIsVHnqJqhHzQ
colors: ["#efebdd", "#b29df7", "#594f7c"]
player: h_blierzt
chars: 126
score: 720.37
match: 100
code: |
  <style>*{background:#8602;margin:45 70;*{background:conic-gradient(#B29DF7 75%,#594F7C 0)0 0/5pc 5pc;outline:dashed 5ch#B29DF7
---

La cible du 19 mai montre quatre carrés violet clair autour d'un cinquième, sur un fond crème. Là où ils se chevauchent, le violet est foncé. H_Bliertz dessine tout avec body seul. Son fond est un dégradé conique en tuiles de 80px, qui laisse un carré foncé dans chaque coin. Son outline en tirets ajoute un L clair autour de chaque coin, et chaque L, avec son coin foncé, se lit comme un carré.

Avec les **Couleurs pédagogiques**, la partie claire de body, ses coins foncés et son outline ont chacun leur couleur.

{% include animations/2026-05-19.html lang=page.lang %}

## Le code, aéré

```css
<style>                       /* va dans head */
* {                           /* html, head, style, body */
  background: #8602;          /* celui de html passe au canevas : #efebdd */
  margin: 45 70;              /* html : 260 × 210, body : 120 × 120 */
  * {                         /* head, style, body */
    background:
      conic-gradient(#B29DF7 75%, #594F7C 0)  /* quart foncé en haut à gauche */
      0 0 / 5pc 5pc;          /* tuiles de 80 × 80 */
    outline: dashed 5ch #B29DF7  /* 40px : tiret 80, espace 40 */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `45` dans une marge est lu en px.

Le `<style>` va dans head, et body reste vide. `*` vise html, head, style et body. Le `*{` imbriqué vise tous les éléments placés dans un autre : head, style et body. head et style ne s'affichent pas. Il reste deux boîtes : html et body. Les règles ne sont jamais fermées : la fin du code les ferme.

Le premier niveau donne aux deux boîtes un fond et une marge. Le second niveau remplace le fond de body et ajoute un outline.

### 2. Un canevas crème

`#8602` est une couleur à 4 chiffres : `#886600`, un jaune foncé, avec une opacité de `22` en hexadécimal, 34/255 = 0,133. Le fond de html ne se peint pas dans sa boîte : il passe au canevas. Sur le blanc de la page, 13,3 % de jaune foncé donnent #efebdd, un crème.

Ce fond a un second rôle. Quand html n'a pas de fond, c'est celui de body qui passe au canevas. Sans le premier `background:#8602;` (109 caractères), le canevas devient une grille de tuiles violet clair et violet foncé : 94 750 pixels changent.

### 3. Une marge, deux boîtes

html reçoit `margin:45 70` : 45px en haut et en bas, 70px à gauche et à droite. En mode quirks, html remplit la page moins ses marges : 400 − 140 = 260 de large, 300 − 90 = 210 de haut, en (70, 45).

body reçoit la même marge, dans html. Il remplit html moins ses marges : 260 − 140 = 120 de large, 210 − 90 = 120 de haut, en (140, 90). Un carré de 120px, au milieu du canevas.

### 4. Le dégradé conique

La règle imbriquée donne à body `conic-gradient(#B29DF7 75%,#594F7C 0)`. Un dégradé conique tourne autour du centre de sa boîte, dans le sens horaire, en partant de midi. Le violet clair va de 0 à 75 %, soit de 0° à 270°.

Un arrêt de couleur ne peut pas se placer avant le précédent : le `0` est ramené à 75 %. Le violet foncé commence donc à 270°, sans fondu, et remplit le dernier quart, de 9 heures à midi : le quart en haut à gauche de la boîte.

### 5. Des tuiles de 80px

`0 0/5pc 5pc` cale le dégradé dans le coin en haut à gauche de body et lui donne 80 × 80. `1pc` vaut 16px, donc `5pc` vaut 80px. Le dégradé se répète, comme toute image de fond.

Chaque tuile a son quart foncé de 40 × 40 en haut à gauche. La première tuile couvre x = 140 à 220 et y = 90 à 170 : son quart foncé est en (140, 90). body ne fait que 120px de large. La deuxième colonne de tuiles commence en x = 220, et seuls ses 40 premiers pixels se voient : la moitié gauche d'une tuile, avec son quart foncé en haut. Les rangées font pareil. body est violet clair, avec un carré foncé de 40 × 40 dans chaque coin : en x = 140 et 220, et en y = 90 et 170.

### 6. L'outline en tirets

`5ch` vaut cinq fois la largeur du `0` dans la police par défaut, du Times de 16px. J'ai mesuré une boîte de `5ch` de large : 40px, donc 1ch vaut ici 8px. L'outline fait 40px d'épaisseur, dessiné autour de la boîte de body : de (100, 50) à (300, 250).

Chaque côté fait 200px. Chrome dessine des tirets de 80px, deux fois l'épaisseur, avec un tiret entier à chaque coin. Sur chaque côté, il reste un tiret, un espace de 40px et un tiret : 80 + 40 + 80 = 200. Les espaces tombent au milieu de chaque côté, de x = 180 à 220 en haut et en bas, et de y = 130 à 170 à gauche et à droite. Le crème se voit à travers. Avec `solid` à la place de `dashed` (125 caractères), les quatre espaces se remplissent : 6 400 pixels changent, 4 × 40 × 40.

### 7. Cinq carrés avec une seule boîte

À chaque coin, un tiret du côté du haut ou du bas rejoint un tiret du côté gauche ou droit. Ensemble, ils forment un L clair, avec des bras de 80px et 40px d'épaisseur. Le coin foncé de body remplit l'intérieur du L. Le résultat est un carré de 80px avec un quart foncé, de (100, 50) à (180, 130) pour celui en haut à gauche.

L'œil voit quatre carrés de 80px aux coins, un carré de 120px au milieu, et quatre chevauchements foncés. Il n'y a qu'une boîte. Les chevauchements ne sont pas de la transparence : ce sont les coins foncés de body.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule boîte fait tout. Le fond de body peint le milieu et les chevauchements foncés, et son outline peint les parties extérieures des carrés des coins.
- Une marge, deux boîtes. `*` donne `margin:45 70` à html et à body, et les décalages s'additionnent : body tombe en (140, 90). Avec la marge sur body seulement, `*{background:#8602;*{margin:90 140;…` (127 caractères), l'image est la même.
- `#8602` fait 5 caractères, et le crème qu'il donne, `#efebdd`, en fait 7. Avec `#efebdd` (128 caractères), l'image est la même.
- L'arrêt `0` est la bordure nette la plus courte. Avec `75%` répété (128 caractères), l'image est la même. Sans position du tout, `#594F7C)` (124 caractères), le violet foncé se place à 100 % et le dernier quart passe en fondu du clair au foncé : 6 052 pixels changent.
- Les deux tailles sont nécessaires. Avec `0 0/5pc` (122 caractères), la hauteur vaut `auto`, ce qui pour un dégradé veut dire toute la hauteur de body, 120 : les tuiles font 80 × 120, les carrés foncés du haut passent à 40 × 60 et ceux du bas disparaissent. 4 800 pixels changent.
- Le `0 0` est nécessaire aussi : dans le raccourci, une taille ne peut venir qu'après une position et un `/`. Avec `5pc 5pc` seul (122 caractères), il est lu comme une position : le dégradé garde la taille de body et commence 80px plus loin, et 2 800 pixels changent.
- Des unités courtes : `5ch` fait 3 caractères, `40px` en fait 4. `5pc` fait 3 caractères, `80px` en fait 4. Avec `40px` (127 caractères) ou `80px 80px` (128 caractères), l'image est la même.
- Pas d'espace avant un `#` ni après une `)`. Avec `5ch #B29DF7` ou `) 0 0` (127 caractères chacun), l'image est la même.
- L'imbrication économise un sélecteur. Avec une règle séparée, `}* *{background:conic…` (128 caractères), l'image est la même.
- Des nombres seuls, grâce au mode quirks. Avec `45px 70px` (130 caractères), l'image est la même. Avec un doctype devant (141 caractères), mon Chrome ignore `margin:45 70`, html ne fait que 8px de haut et body 0px : 45 888 pixels changent.
