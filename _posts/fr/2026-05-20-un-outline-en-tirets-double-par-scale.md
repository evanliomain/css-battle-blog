---
title: "Un outline en tirets, doublé par scale : deux crochets en 90 caractères"
ref: 2026-05-20
permalink: /fr/2026/05/20/un-outline-en-tirets-double-par-scale/
description: "Comment html et body partagent un outline en tirets de 25px, et comment scale double celui de body en deux gros crochets pendant que deux tirets de html, de chaque côté, deviennent les pattes, dans la cible CSS Battle du 20 mai 2026."
target: /assets/targets/2026-05-20.png
target_url: https://cssbattle.dev/play/arGXQUsdJXNaPG1gabNB
colors: ["#f4dcbf", "#30383f"]
player: emohdaziz
chars: 90
score: 769.64
match: 100
code: |
  <style>*{outline:27Q dashed#f4dcbf;margin:125-32;background:#30383f;*{margin:0 192;scale:2
---

La cible du 20 mai montre deux crochets crème face à face sur un fond anthracite, chacun avec deux petites pattes tournées vers l'extérieur. Mohamed Ali donne à html et à body le même outline en tirets de 25px. `scale:2` double body, et son outline devient deux gros crochets. L'outline de html est une fine bande en tirets qui traverse le canevas : body en cache le milieu, et il reste deux tirets de chaque côté, les pattes.

Avec les **Couleurs pédagogiques**, chaque boîte et chaque outline ont leur propre couleur. La **Vue large** montre les deux bouts de la boîte et de l'outline de html, au-delà des bords gauche et droit du canevas.

{% include animations/2026-05-20.html lang=page.lang %}

## Le code, aéré

```css
<style>                        /* va dans head */
* {                            /* html, head, style, body */
  outline: 27Q dashed #f4dcbf; /* 25px, tirets de 50px */
  margin: 125 -32;             /* html : 464 × 50 en (−32, 125) */
  background: #30383f;         /* celui de html passe au canevas */
  * {                          /* head, style, body */
    margin: 0 192;             /* body : 80 × 50 en (160, 125) */
    scale: 2                   /* body : 160 × 100, outline de 50px */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `125` dans une marge est lu en px.

Le `<style>` va dans head, et body reste vide. `*` vise html, head, style et body. Le `*{` imbriqué vise tous les éléments placés dans un autre : head, style et body. head et style ne s'affichent pas. Il reste deux boîtes : html et body. Les règles ne sont jamais fermées : la fin du code les ferme.

Le premier niveau donne aux deux boîtes le même outline, la même marge et le même fond. Le second niveau remplace la marge de body et ajoute `scale:2`.

### 2. Un canevas anthracite

Le fond de html ne se peint pas dans sa boîte : il passe au canevas, qui devient anthracite partout. body peint sa propre boîte de la même couleur. Sans la déclaration `background` (71 caractères), le canevas devient blanc et les tirets de html se voient à travers la boîte de body : 85 100 pixels changent.

### 3. html : une fine bande, plus large que le canevas

html reçoit `margin:125-32` : 125px en haut et en bas, −32px à gauche et à droite. Le signe moins commence un nouveau nombre : pas besoin d'espace. Les marges latérales négatives rendent html plus large que le canevas : 400 + 64 = 464, de x = −32 à 432.

En mode quirks, html remplit la hauteur de la page moins ses marges : 300 − 250 = 50. html est une bande de y = 125 à 175.

### 4. L'outline en tirets de html

`27Q` vaut 27 quarts de millimètre : 6,75 mm, soit 25,51px. Chrome arrondit l'épaisseur d'un outline au pixel inférieur : `getComputedStyle` donne 25px.

Un outline se dessine à l'extérieur de la boîte. Celui de html va de x = −57 à 457 et de y = 100 à 200. Ses tirets font 50px, deux fois l'épaisseur. Le côté du haut fait 514px. Il contient 7 tirets, et les 6 espaces sont étirés à 27,33px, pour qu'un tiret entier tombe à chaque coin : les tirets commencent en x = −57, 20,33, 97,67, 175, 252,33, 329,67 et 407. Le côté du bas est le même, de y = 175 à 200.

Les côtés gauche et droit font 100px : deux tirets de 50px les remplissent, sans place pour un espace. Ils sont pleins, et ils sont hors du canevas.

### 5. body et son outline

body reçoit `margin:0 192` de la règle imbriquée. Il fait 464 − 384 = 80 de large, de x = 160 à 240. En mode quirks, il remplit la hauteur de html : 50, de y = 125 à 175.

body a le même outline de 25px : de x = 135 à 265 et de y = 100 à 200. Son côté du haut fait 130px : deux tirets de 50px et un espace de 30px, de x = 135 à 185 et de 215 à 265. Ses côtés font 100px, comme ceux de html : pleins. J'ai vérifié cette disposition en rendant body sans `scale` et sans l'outline de html.

### 6. scale: 2

`scale:2` double body autour de son centre, (200, 150). Sa boîte passe à 160 × 100, de (120, 100) à (280, 200). L'outline double avec elle : 50px d'épaisseur, de x = 70 à 330 et de y = 50 à 250. Les tirets du haut vont de 70 à 170 et de 230 à 330, avec un espace de 60px. Les côtés restent pleins, de y = 50 à 250. Cela fait deux crochets aux bras de 50px.

body est peint au-dessus de l'outline de html. Son fond couvre les tirets de html de x = 120 à 280, et son outline les couvre de 70 à 120 et de 280 à 330. Sans le fond de body (`;background:none` ajouté, 106 caractères), les tirets de html se voient de x = 120 à 280 : 5 300 pixels changent.

### 7. Les pattes

Il reste deux tirets de html de chaque côté, en haut et en bas : de x = 20,33 à 70,33 et de 329,67 à 379,67. Chacun passe de 0,33px sous un crochet : il a l'air d'y être attaché. Ce sont les quatre pattes. Les tirets en −57 et en 407 sont hors du canevas.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un outline, deux tailles. `*` donne le même outline à html et à body, et `scale:2` (7 caractères) double d'un coup la boîte et l'outline de body. Sans lui, body a besoin de sa propre taille et de sa propre épaisseur d'outline : `margin:-25 152;outline-width:50px` à la place de `margin:0 192;scale:2` (103 caractères). La boîte et l'outline tombent au même endroit, mais body est alors peint sous l'outline de html : les tirets de html traversent la boîte de body, et 5 300 pixels changent.
- `27Q` fait 3 caractères, `25px` en fait 4. Avec `25px` (91 caractères), l'image est la même. L'arrondi vers le bas compte : avec `26Q` (90 caractères), l'outline fait 24px, les côtés des crochets se coupent au milieu, et 6 296 pixels changent.
- `125-32` n'a pas besoin d'espace : le signe moins commence un nouveau nombre. Avec `125 -32` (91 caractères), l'image est la même.
- Pas d'espace avant un `#`. Avec `dashed #f4dcbf` (91 caractères), l'image est la même.
- L'imbrication économise un sélecteur. Avec une règle séparée, `}* *{margin:0 192;scale:2` (92 caractères), l'image est la même.
- Un seul `background` fait deux choses : celui de html peint le canevas, celui de body cache le milieu de l'outline de html.
- Des nombres seuls, grâce au mode quirks. Avec `125px -32px` et `0 192px` (97 caractères), l'image est la même. Avec un doctype devant (105 caractères), mon Chrome ignore les deux déclarations de marges et body se retrouve à 0px de haut : 47 648 pixels changent.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 100 pixels, avec la règle des notes de golf. Ce sont les colonnes x = 20 et x = 379, sur les rangées des pattes (y = 100 à 124 et 175 à 199). Les pattes commencent en 20,33 et finissent en 379,67 : ces deux colonnes ne sont crème qu'aux deux tiers. Dans la cible, les pattes vont de x = 20 à 70 et de 330 à 380, sur des pixels entiers. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
