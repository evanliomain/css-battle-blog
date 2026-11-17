---
title: "Un cercle, deux polices : un soleil derrière des stores en 125 caractères"
ref: 2026-07-23
permalink: /fr/2026/07/23/un-cercle-deux-polices/
description: "Comment un seul radial-gradient dessine de fines bandes sur html et un grand disque sur body, juste parce que body a une police plus grande, dans la cible CSS Battle du 23 juillet 2026."
target: /assets/targets/2026-07-23.png
target_url: https://cssbattle.dev/play/859niQYa0JbjMbzMNadA
colors: ["#3f3642", "#fef6e2"]
player: gunnar
chars: 125
score: 721.52
match: 100
code: |
  <style>*{border:5vw solid#3F3642;background:radial-gradient(1q,#FEF6E2.625em,#3F3642)50%/.2lh 5ch;*{margin:50 100;font:6em/9'
---

La cible du 23 juillet montre des bandes crème sur un fond gris violacé sombre, comme des stores. Au milieu, un carré sombre les cache, avec un grand disque crème dedans : un soleil derrière les stores. Gunnar Bittersmann dessine tout avec un seul fond, un cercle fait avec `radial-gradient`, donné à html et à body. Sur html, les unités sont petites : chaque tuile garde une fine tranche du cercle, et les tranches font les bandes. body reçoit une police plus grande : les mêmes unités grandissent, et le même cercle devient un grand disque.

Cochez **Couleurs pédagogiques** pour distinguer les bandes de html du fond de body, et les deux bordures.

{% include animations/2026-07-23.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html, puis head, body, style */
  border: 5vw solid#3F3642;        /* un cadre sombre de 20px */
  background:
    radial-gradient(
      1q,                          /* un cercle, de rayon 1q (environ 0,94px) */
      #FEF6E2.625em,               /* crème jusqu'à .625em : 10px sur html, 60px sur body */
      #3F3642                      /* puis sombre */
    )
    50% / .2lh 5ch;                /* tuiles centrées : 3,6 × 40 sur html, 172,8 × 240 sur body */
  * {                              /* head, body, style */
    margin: 50 100;                /* body : 160 × 160 en (120, 70) */
                                   /* 96px, line-height 9 × 96 = 864px, famille : la chaîne ' */
    font: 6em/9'
```

## Comment ça marche

### 1. html, c'est le canevas

Il n'y a pas de doctype : la page est en mode quirks. Dans ce mode, un nombre sans unité compte en px dans `margin`. La balise style n'est jamais fermée : tout ce qui suit `<style>` est du CSS.

`*` vise d'abord html. html fait 400 × 300, tout le canevas (je l'ai vérifié avec getBoundingClientRect). Son fond est peint sur tout le canevas. head et style reçoivent les mêmes règles, mais ils sont masqués.

### 2. Un cercle dans une tuile étroite

`.2lh 5ch` est la taille des tuiles du fond. `lh` est la line-height de l'élément, et `ch` la largeur du « 0 » dans sa police. html garde la police par défaut et `line-height: normal`. Dans mon rendu, la taille de tuile calculée sur html est 3,6 × 40 : .2lh = 3,6px (une line-height de 18px), et 5ch = 40px.

`radial-gradient(1q,…)` avec une seule longueur est un cercle de ce rayon. Le rayon du dégradé est 1q, un quart de millimètre, environ 0,94px. L'arrêt crème est à .625em = 10px, au-delà du rayon. L'arrêt sombre n'a pas de position : il irait au bout du rayon, mais un arrêt ne peut pas venir avant le précédent, donc il passe à 10px. Cela fait un bord net : un disque crème de 10px de rayon, sombre autour, au centre de chaque tuile.

La tuile ne fait que 3,6px de large. Elle garde une fine tranche verticale du cercle, 1,8px de chaque côté du centre. Cette tranche fait 20px de haut au milieu de la tuile, et 2 × √(10² − 1,8²) ≈ 19,67px sur ses bords. Dans mon rendu, chaque bande fait 20 rangées de crème uni.

### 3. Les tuiles se répètent : des bandes

Les tuiles se répètent dans les deux sens, sur tout le canevas. Côte à côte, les tranches font une seule bande crème, de 20px de haut, sur toute la largeur.

`50%` place les tuiles. Avec une seule valeur, la deuxième vaut `center`. Les positions se mesurent dans la boîte de remplissage de html, de (20, 20) à (380, 280), 360 × 260. En hauteur, une rangée de tuiles commence à y = 20 + (260 − 40) / 2 = 130, puis toutes les 40px : …, 10, 50, 90, 130, …. Chaque tuile a son crème de 10 à 30px sous son haut. Les bandes vont de y = 20 à 40, de 60 à 80, et ainsi de suite jusqu'à 260 à 280 : sept bandes. Les rangées de tuiles à −30 et à 290 mettent leur crème hors du canevas.

### 4. La bordure de html

`border:5vw solid#3F3642` est un cadre sombre de 5vw = 20px de large, peint par-dessus le canevas. Sur les côtés, il coupe les bandes à x = 20 et à x = 380. En haut et en bas, il tombe sur des rangées sombres, de y = 0 à 20 et de 280 à 300.

### 5. body : une boîte de 160 × 160

Le `*{` imbriqué vaut `* *` : tout élément placé dans un autre. Ce sont head, body et style. `margin:50 100` compte en px. body est dans la boîte de contenu de html, 360 × 260 en (20, 20). En mode quirks, body remplit la hauteur de html moins ses marges. Je l'ai vérifié avec getBoundingClientRect : body fait 160 × 160, en (120, 70).

body reçoit aussi les règles de `*`. Sa bordure de 20px est le cadre sombre du carré, de x = 120 à 280 et de y = 70 à 230. Son fond est peint par-dessus le canevas, dans sa boîte. Avec la police de html, il montrerait les mêmes bandes que le canevas : je l'ai vérifié en retirant la police, et les bandes dans body tombent aux mêmes hauteurs.

### 6. Une police plus grande : un disque

`font:6em/9'` donne à body une police de 96px et une line-height de 9 × 96 = 864px. Le raccourci font demande une famille. `'` ouvre une chaîne jamais fermée, qui court jusqu'à la fin du code : la famille est un nom vide (la valeur calculée est `""`).

Le même dégradé prend maintenant les unités de body. Dans mon rendu, la taille de tuile calculée est 172,8 × 240 : .2lh = 172,8px, et 5ch = 240px. Le rayon du cercle est .625em = 60px.

Les tuiles sont placées dans la boîte de remplissage de body, de (140, 90) à (260, 210), 120 × 120. Avec `50%`, une tuile commence à x = 140 + (120 − 172,8) / 2 = 113,6 et y = 90 + (120 − 240) / 2 = 30. Son centre est (200, 150), le centre du canevas. Le disque va de (140, 90) à (260, 210) : il touche l'intérieur du cadre. La tuile est plus grande que la boîte de body : aucun autre cercle ne se voit. Autour du disque, la partie sombre du dégradé remplit le reste de la boîte.

Un seul fond, deux jeux d'unités : de fines bandes sur html, un grand disque sur body.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand un de ses canaux bouge de plus de 8.

- La police est la clé. Sans `;font:6em/9'` (113 caractères), body garde les unités de html et dessine les mêmes bandes que le canevas, aux mêmes hauteurs : 6 688 pixels changent.
- `'` est la famille la plus courte. `9a` serait lu comme un seul jeton, le nombre 9 avec une unité « a » : toute la déclaration font est ignorée (la tuile de body reste en 3,6 × 40), et les mêmes 6 688 pixels changent. `9 a` marche, mais prend 126 caractères.
- `/9` donne .2lh = 172,8px, plus large que le disque de 120px. Avec `/6`, .2lh = 115,2px : la tuile est plus étroite que le disque. Le disque est coupé des deux côtés, des bouts des cercles voisins se voient aux coupures, et 268 pixels changent. Avec `/7`, l'image est la même.
- `.625em` vaut 10px sur html et 60px sur body, en 6 caractères. `10px` demanderait une espace, `#FEF6E2 10px` (124 caractères), et le disque passerait à 10px de rayon : 10 988 pixels changent. Sans l'espace, `#FEF6E210px` n'est pas une couleur valide : tout le fond est ignoré, et dans mon rendu le canevas devient blanc.
- `.2lh` suit la police. `1%` est plus court (123 caractères) et vaut encore 3,6px sur html, 1 % de 360px. Mais sur body, c'est 1 % de 120px, 1,2px : l'intérieur de body devient tout crème, et 3 096 pixels changent.
- `1q` fait du dégradé un cercle, en 2 caractères. Sans taille, `radial-gradient(#FEF6E2.625em,#3F3642)` (122 caractères) est une ellipse à la taille de la tuile, et les bandes disparaissent : 33 496 pixels changent. `0` est plus court aussi (124 caractères), mais dans mon rendu les bandes et le disque disparaissent : 48 904 pixels changent.
- `50%` centre dans les deux sens en 3 caractères, car une seule valeur veut dire `50% center`. Avec `0` (123 caractères), les bandes restent en place, mais le disque part de 26,4px vers la droite et le cadre le coupe : 4 446 pixels changent.
- Un seul `border` dessine les deux cadres. Sans `border:5vw solid#3F3642;` (101 caractères), les bandes vont jusqu'aux bords du canevas, body passe à 200 × 200 en (100, 50) sans cadre, et 13 040 pixels changent.
- Le mode quirks et les espaces absentes font gagner des caractères. Avec `50px 100px`, le code fait 129 caractères. Avec une espace dans `solid #3F3642` ou dans `#FEF6E2 .625em`, il en fait 126. Même image à chaque fois.
- Rien n'est fermé. Comme `'` court jusqu'à la fin, tout fermer demande `'}}</style>` : 136 caractères, 11 de plus, et l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, le bord du disque n'est pas lissé : mon rendu n'a que deux couleurs, le crème et le sombre. Dans la cible, les pixels le long du bord du disque mélangent les deux couleurs. 190 pixels de ce bord diffèrent de la cible de plus de 8 sur un canal ; le reste est identique. Sur le juge de CSS Battle, le code est identique à 100 %.
