---
title: "Un fond, deux boîtes : trois pastilles et quatre demi-disques en 101 caractères"
ref: 2026-08-10
permalink: /fr/2026/08/10/un-fond-deux-boites/
description: "Comment un seul dégradé radial, donné à html et à body avec les mêmes 223%, 25lh et 38.8ch, place quatre demi-disques sur les bords et trois pastilles au milieu de la cible CSS Battle du 10 août 2026."
target: /assets/targets/2026-08-10.png
target_url: https://cssbattle.dev/play/h56uVgyaWQ12YfY9fLNi
colors: ["#144650", "#f3ac3c"]
player: gabriele19
chars: 101
score: 752.75
match: 100
code: |
  <style>*{background:radial-gradient(1q,#144650,37q,#F3AC3C)223%25lh/38.8ch;*{margin:130 50;font:6q/0'
---

La cible du 10 août est orange, avec quatre demi-disques bleu canard sur les bords du haut et du bas, et trois pastilles bleu canard alignées au milieu. Gabriele écrit un seul fond et le donne à tous les éléments. Sur html, il dessine les quatre demi-disques. body reçoit une toute petite police : les mêmes `223%`, `25lh` et `38.8ch` y deviennent d'autres longueurs, et le même disque donne trois pastilles.

Choisissez la **Vue large** pour voir les tuiles de html glisser hors du canevas, et cochez **Couleurs pédagogiques** pour distinguer les disques de html de ceux de body.

{% include animations/2026-08-10.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* html, head, style, body : tous reçoivent ce fond */
  background:
    radial-gradient(1q, #144650, 37q, #F3AC3C)  /* un disque bleu de 34,96px, bord net, orange autour */
    223% 25lh                /* html : 199,81px 450px · body : 424,14px 0px */
    / 38.8ch;                /* html : 310,4px de large · body : 109,80px ; hauteur auto */
  * {                        /* dans html : head, style, body */
    margin: 130 50;          /* body : 300 × 40 en (50 ; 130) */
    font: 6q / 0 '           /* 5,67px, hauteur de ligne 0 : d'autres ch et lh pour body */
```

## Comment ça marche

### 1. Deux boîtes, une règle

Le code n'a ni balise html, ni head, ni body : Chrome les ajoute. `*` vise les quatre éléments : tous reçoivent le même `background`. head et style ne s'affichent pas. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre. html n'est dans aucun élément : seuls head, style et body reçoivent la marge et la police.

Il n'y a pas de doctype : la page est en mode quirks. Un nombre sans unité, comme `130` et `50`, est en px. En mode quirks, body remplit aussi la hauteur de html moins ses marges : 300 − 260 = 40px. getBoundingClientRect donne body en (50 ; 130), 300 × 40. J'ai vérifié avec `<!doctype html>` devant : 39 136 pixels changent.

### 2. Un disque net tiré d'un dégradé

`radial-gradient(1q, …)` a une seule longueur pour taille : un cercle de rayon 1q, soit 96 / 101,6 = 0,945px. Viennent ensuite trois éléments :

- `#144650` n'a pas de position : il est à 0.
- `37q`, seul entre deux couleurs, est un repère de transition : 37q = 34,96px.
- `#F3AC3C` n'a pas de position : il est à 100 % du rayon, 0,945px.

Le dernier arrêt est avant le repère : le navigateur le repousse jusqu'au repère, 34,96px. Le repère tombe alors sur l'arrêt suivant, et la couleur saute là : bleu de 0 à 34,96px, orange ensuite. J'ai vérifié : avec `#144650 37q` (une position d'arrêt, pas un repère), le rendu est le même, au pixel près. Avec `34.96px` à la place de `37q`, pareil ; avec `35px`, 80 pixels changent.

`1q` fait donc deux choses. Il donne un cercle, et il rend 100 % si petit que l'arrêt orange est repoussé à 37q. Avec `circle` à la place de `1q`, 100 % est la distance au coin le plus loin, l'arrêt orange reste loin, et tout le canevas devient un flou bleu et orange.

### 3. html : des tuiles de 310,4 × 300

L'unité `ch` est la largeur du « 0 » dans la police de l'élément. html garde la police par défaut : getComputedStyle donne 16px en Times dans mon Chrome, et `38.8ch` donne 310,4px, donc 1ch = 8px.

La hauteur est `auto`. Un dégradé n'a pas de taille propre : `auto` vaut 100 % de la boîte, 300px. Le dégradé est dessiné une fois par tuile de 310,4 × 300, avec le disque au milieu, et la tuile se répète dans les deux sens.

### 4. 223% 25lh : quatre demi-disques

Une position en % est une part de la place qui reste une fois la tuile dans la boîte : ici 400 − 310,4 = 89,6px, et 2,23 × 89,6 = 199,81px. Au-delà de 100 %, la tuile dépasse le bord droit, et la répétition remplit le reste. Les tuiles commencent en x = 199,81 et 199,81 − 310,4 = −110,59. Leurs disques sont centrés en x = 44,61 et 355,01.

`lh` est la hauteur de ligne de l'élément. html a `line-height: normal`, et getComputedStyle donne `450px` pour `25lh` : 18px par lh dans mon Chrome. Les tuiles se répètent tous les 300px : elles commencent en y = 450, 150 et −150, et les disques sont centrés en y = 0 et 300, pile sur les bords du haut et du bas du canevas. On ne voit que la moitié basse des disques du haut, et la moitié haute de ceux du bas.

Le canevas prend le fond de html : ce motif est ce que montre tout le canevas, hors de body.

### 5. body : les mêmes valeurs, d'autres unités

body reçoit le même fond, mais il ne le peint que dans sa boîte de 300 × 40. Sa police est `6q/0'` : 6q = 5,67px, une hauteur de ligne de 0, et la famille `''`. Le guillemet n'est jamais fermé : c'est la fin du fichier qui le ferme. getComputedStyle donne :

- `38.8ch` = 109,804px (donc 1ch = 2,83px à cette taille) ;
- `25lh` = 0px, car lh est la hauteur de ligne, et elle vaut 0.

La hauteur `auto` vaut 100 % de body : 40px. Chaque tuile fait 109,80 × 40. Le disque garde son rayon de 34,96px : il est plus haut que la tuile, et body le coupe à ses bords du haut et du bas. Chaque disque devient une pastille, plate en haut et en bas.

### 6. Encore 223% : trois pastilles

Sur body, il reste 300 − 109,80 = 190,20px, et 2,23 × 190,20 = 424,14px. Dans body, les tuiles commencent en x = 424,14 − 4 × 109,80 = −15,08, puis 94,73 et 204,53. Sur le canevas, leurs disques sont centrés en x = 89,82, 199,63 et 309,43, et en y = 130 + 20 = 150. Les disques suivants, centrés en x = −19,98 et 419,24, tombent hors de body et ne se voient pas.

J'ai vérifié toute la mise en place avec des valeurs en px : html avec `199.808px 450px/310.4px 300px` et body avec `424.137px 0/109.804px 40px` donnent le même rendu que le code officiel, à 7 niveaux de couleur près sur quelques pixels de bord.

## Notes de golf

- Un seul fond sert aux deux boîtes. `%`, `lh` et `ch` dépendent de la boîte et de sa police : les trois mêmes valeurs placent les demi-disques sur html et les pastilles sur body.
- `font:6q/0'` donne à body ses propres unités. Sans `/0`, la hauteur de ligne est `normal`, 25lh vaut 150px, et 804 pixels changent. Sans le `'`, la police n'a pas de famille, toute la déclaration est ignorée, et 6 840 pixels changent.
- `1q` comme taille fait 3 caractères. `circle,#144650 37q,#F3AC3C 0` donne le même rendu, en 107 caractères.
- `#144650,37q,` (repère) et `#144650 37q,` (position d'arrêt) ont la même longueur et donnent le même rendu.
- `37q` fait 3 caractères pour 34,96px.
- Pas besoin d'espace dans `)223%25lh/38.8ch`, et `130 50` n'a pas besoin d'unité en mode quirks.
- Deux accolades, les deux `*{`, restent ouvertes, avec la chaîne `'`, et il n'y a pas de `</style>`. Avec `'}}`, le code fait 104 caractères ; avec `'}}</style>`, 112. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), 602 pixels diffèrent de la cible. Tous sont sur les bords des sept formes : les aplats sont identiques, et chaque bord tombe à moins d'un pixel de celui de la cible. Le plus grand écart est de 209 niveaux, en (79 ; 298), sur le bord droit du demi-disque en bas à gauche : la cible y est bleu canard, (20, 70, 80), et mon rendu orange, (229, 165, 61). Dans le classement de CSS Battle, le code est indiqué identique à 100 %.
