---
title: "Une ellipse minuscule et un repère : une bobine en 124 caractères"
ref: 2026-06-04
permalink: /fr/2026/06/04/une-ellipse-minuscule-et-un-repere/
description: "Comment un seul dégradé radial répété, avec une forme de fin de 2,2px et un repère de transition, dessine le jaune et les deux ellipses derrière un body arrondi, dans la cible CSS Battle du 4 juin 2026."
target: /assets/targets/2026-06-04.png
target_url: https://cssbattle.dev/play/d88s7WXm7RoYXGfDKQ4P
colors: ["#4a9a86", "#4c4c6b", "#fae29e"]
player: ludvig
chars: 124
score: 722.68
match: 100
code: |
  <STYLE>&{*{background:#4A9A86;margin:50 40;border-radius:17%/52%}background:-5vw/55%radial-gradient(1%4q,#4C4C6B,74q,#FAE29E
---

La cible du 4 juin est une bobine sur fond jaune pâle : un tonneau vert aux côtés bombés, devant deux grandes ellipses bleu-gris qui dépassent à gauche et à droite. Ludvig la dessine avec deux éléments. Le fond de html est un seul dégradé radial, répété tous les 220px : chaque copie est une ellipse bleu-gris sur du jaune. Sa forme de fin ne fait que 2,2px de large, et un repère de transition étire le bleu-gris jusqu'à 69,9px. body est le tonneau, une boîte verte aux côtés arrondis.

Utilisez la **Vue large** pour voir les tuiles du dégradé se répéter hors du canevas, et les **Couleurs pédagogiques** pour distinguer les deux couleurs du dégradé de body.

{% include animations/2026-06-04.html lang=page.lang %}

## Le code, aéré

```css
<STYLE>
& {                            /* html */
  * {                          /* & * : head, style et body ; seul body se voit */
    background: #4A9A86;
    margin: 50 40;             /* body : 320 × 200 en (40, 50) */
    border-radius: 17%/52%;    /* 54,4/104px, réduits à 52,3/100px */
  }
  background: -5vw/55%         /* des tuiles de 220 × 300, la première en x = −20 */
    radial-gradient(1%4q,      /* forme de fin : rayons de 2,2 et 3,78px */
      #4C4C6B,
      74q,                     /* un repère : le dernier arrêt remonte à 69,9px */
      #FAE29E
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `50` est lu en px.

L'élément style vient en premier : il va dans head. body est vide. Au premier niveau, `&` désigne la racine : html. Le `*{` imbriqué vaut `& *` : tout élément dans html, donc head, style et body. head et style ne s'affichent pas. Seul body se voit.

### 2. Une tuile, répétée

Le fond de html est peint sur tout le canevas. `-5vw/55%` donne sa position et sa taille.

Un dégradé n'a pas de taille à lui. `55%` règle la largeur de la tuile : 55 % de 400 = 220. La hauteur n'est pas donnée : la tuile a la hauteur de html, 300. J'ai vérifié : `/220px 300px` donne la même image.

`-5vw` vaut 5 % des 400px de large : −20px. Il place la première tuile en x = −20. La position verticale n'est pas donnée, elle est donc centrée, mais une tuile aussi haute que html n'a pas la place de bouger. Le fond se répète par défaut : des tuiles commencent en x = −20 et 200 sur le canevas, et en −240, 420 et plus loin en dehors. Les copies au-dessus et en dessous sont hors du canevas aussi.

### 3. Une forme de fin minuscule

`radial-gradient(1%4q,…)` est une ellipse, centrée dans sa tuile. Les deux tailles sont ses rayons. L'horizontal vaut 1 % de la largeur de la tuile : 2,2px. Le vertical vaut 4q = 4 × 0,945 = 3,78px. La première tuile commence en −20 : son centre est en (90, 150). Celui de la seconde est en (310, 150).

Cette forme de fin est toute petite. Ce qu'elle donne, c'est le rapport entre les deux rayons : 3,78 / 2,2 ≈ 1,72.

### 4. Le repère

Le dégradé a trois éléments : `#4C4C6B`, puis `74q`, puis `#FAE29E`. `74q` n'a pas de couleur. C'est un repère de transition : l'endroit où le mélange des deux couleurs est à moitié fait.

La dernière couleur n'a pas de position : elle irait à 100 %, le bord de la forme de fin, à 2,2px du centre sur le rayon horizontal du dégradé. Mais un arrêt ne peut pas venir avant un arrêt ou un repère qui le précède. Il remonte donc jusqu'au repère : 74q = 69,9px. J'ai vérifié : `#FAE29E 74q` donne la même image.

Le repère et l'arrêt sont maintenant au même endroit : il n'y a plus de mélange. Bleu-gris jusqu'à 69,9px, puis jaune, avec un bord net. L'ellipse garde le rapport de la forme de fin : son rayon vertical vaut 69,9 × 1,72 ≈ 120px. Autour de (90, 150), cela donne une ellipse de x = 20 à 160 et de y = 30 à 270. Je l'ai mesurée dans mon rendu : x de 20 à 159, y de 30 à 269. L'autre va de x = 240 à 380.

### 5. body

`& *` donne à body `background:#4A9A86` et `margin:50 40`. body commence en (40, 50) et fait 400 − 2 × 40 = 320 de large.

Il n'y a pas de `height`. En mode quirks, body remplit la hauteur de la fenêtre, moins ses marges : 300 − 2 × 50 = 200. J'ai mesuré body : 320 × 200 en (40, 50). Son vert couvre le milieu des deux ellipses. Seules leurs parties extérieures se voient : 20px à gauche et à droite, et les pointes au-dessus et en dessous.

### 6. Les côtés bombés

`border-radius:17%/52%` donne à chaque coin un rayon horizontal de 17 % de la largeur, 54,4px, et un rayon vertical de 52 % de la hauteur, 104px.

De chaque côté, les rayons du haut et du bas font 208px, plus que les 200px de haut de body. Quand des rayons ne tiennent pas, tous sont réduits du même facteur : ici 200 / 208. Les coins font alors 52,3px de large et 100px de haut. Les deux coins d'un côté se rejoignent au milieu : chaque côté est une demi-ellipse. J'ai vérifié : `52.3px/100px` donne la même image.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Deux éléments dessinent tout. Le dégradé de html fait le jaune et les deux ellipses, body fait le tonneau.
- Le fond se répète gratuitement. Avec `no-repeat` (134 caractères), seule la première tuile est peinte : la moitié droite du canevas devient blanche, et 30 377 pixels changent.
- `55%` fait 3 caractères pour une tuile de 220px de large, et la tuile prend les 300px de haut de html sans rien écrire. `/220px 300px`, avec l'espace qu'il demande alors, donne la même image en 133 caractères.
- `-5vw` vaut −20px en 4 caractères. `-20px` donne la même image en 125 caractères.
- `1%4q` donne le rapport de l'ellipse en 4 caractères : pas besoin d'espace après `%`. `1% 4q` donne la même image en 125 caractères. Avec `1%1%` (même longueur), le rapport devient 3 / 2,2 et le rayon vertical tombe à environ 95px, moins que la demi-hauteur de body : les ellipses ne dépassent plus au-dessus et en dessous de body, et 7 380 pixels changent.
- `74q` est un repère, et il fixe aussi l'endroit où commence la dernière couleur. `#4C4C6B 74q,#FAE29E` donne la même image à la même longueur. Sans le `74q,` (120 caractères), le bleu-gris se réduit à un point de 2,2px, caché derrière body : 13 227 pixels changent.
- `17%/52%` fait 7 caractères pour des coins de 52,3 × 100px, grâce à la réduction. `17%/50%` donne des coins de 54,4 × 100px : 458 pixels changent. `17%/100%` réduit par 200 / 400 et donne des coins de 27,2 × 100px : 2 490 pixels changent.
- Des nombres seuls dans la marge : `margin:50px 40px` donne la même image en 128 caractères.
- `&` vaut html en 1 caractère. `html{` à la place de `&{` donne la même image en 127 caractères.
- Les majuscules ne coûtent rien : `<style>` et les couleurs en minuscules donnent la même image à la même longueur.
- Le code s'arrête juste après `#FAE29E`. La fin du code ferme le dégradé, les règles et l'élément style. Ajouter `)}}` donne la même image en 127 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 785 pixels, avec la règle des notes de golf. Tous sont sur des bords courbes :

- 414 sont sur le bord des ellipses bleu-gris, loin de body. Dans mon rendu, ce bord n'a que deux couleurs, `#4c4c6b` et `#fae29e`, sans rien entre les deux. Dans la cible, il a des nuances intermédiaires ;
- 371 sont contre le bord de body, surtout le long de ses côtés arrondis.

Le juge de CSS Battle donne au code 100 % de correspondance.
