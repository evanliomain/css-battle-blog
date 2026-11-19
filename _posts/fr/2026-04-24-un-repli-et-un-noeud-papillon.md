---
title: "Un repli et un nœud papillon : un disque en quarts en 134 caractères"
ref: 2026-04-24
permalink: /fr/2026/04/24/un-repli-et-un-noeud-papillon/
description: "Comment un seul repli de var() change le même dégradé radial en cible noire et jaune sur html et en disque blanc sur body, comment une taille de 1q rend tous les bords nets, et comment un polygone qui se croise garde deux quarts de body, dans la cible CSS Battle du 24 avril 2026."
target: /assets/targets/2026-04-24.png
target_url: https://cssbattle.dev/play/DRaoAJZca16SjLeJJMJr
colors: ["#111", "#f7cb71", "#a34f50", "#fff"]
player: underdude
chars: 134
score: 711.53
match: 100
code: |
  <style>*{background:radial-gradient(1q,var(--a,#111,60px,#F7CB71)0 75pt,#A34F50);*{--a:#fff;clip-path:polygon(0 50%,50%99%,50%0,99%50%
---

La cible du 24 avril, c'est un disque de rayon 100 sur un fond rouge-brun, coupé en quatre quarts : deux blancs, et deux jaunes avec un quart de disque noir dedans. Janne Ala-Äijälä écrit un seul dégradé radial pour html et pour body. Sur html, un repli de `var()` le rend noir et jaune. Sur body, `--a:#fff` le rend blanc, et un polygone qui se croise n'en garde que deux quarts.

Avec **Couleurs pédagogiques**, les deux boîtes, le rouge-brun de body et le polygone de clip-path prennent chacun leur couleur.

{% include animations/2026-04-24.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                     /* tous les éléments : html, head, style, body */
  background: radial-gradient(
    1q,                                 /* la taille : un cercle de rayon 0,945px */
    var(--a,#111,60px,#F7CB71)0 75pt,   /* html : #111,60px,#F7CB71 0 75pt */
                                        /* body : #fff 0 75pt */
    #A34F50                             /* sans position : 100 % = 0,945px, repoussé à 100px */
  );
  * {                                   /* tout élément dans un autre : tous sauf html */
    --a: #fff;
    clip-path: polygon(0 50%,50%99%,50%0,99%50%) /* deux triangles */
/* la fin du code ferme tout */
```

## Comment ça marche

### 1. Deux règles, deux boîtes

`*` vise tous les éléments : html, head, style et body. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre, donc tous sauf html. head et style ne s'affichent pas. Il reste deux boîtes, et les deux reçoivent le `background` de la règle du dehors. Seul body reçoit `--a:#fff` et le `clip-path`.

Il n'y a pas de doctype : la page est en mode quirks, et body s'étire sur la hauteur du cadre. getBoundingClientRect donne à html (0, 0), 400 × 300, et à body (8, 8), 384 × 284, dans sa marge de 8px par défaut. Les deux boîtes ont le même centre : (200, 150).

### 2. Un seul `var()`, deux dégradés

Le repli d'un `var()` va de la première virgule à la parenthèse fermante, virgules comprises. Rien ne pose `--a` sur html : il reçoit le repli, `#111,60px,#F7CB71`, et son fond se lit `radial-gradient(1q,#111,60px,#F7CB71 0 75pt,#A34F50)`. Sur body, `--a` vaut `#fff`, et la même déclaration se lit `radial-gradient(1q,#fff 0 75pt,#A34F50)`. getComputedStyle confirme les deux, avec les couleurs écrites en rgb().

html est la racine : son fond se peint sur tout le canevas.

### 3. Le cercle de 1q

Une seule longueur en premier argument de `radial-gradient`, c'est un cercle de ce rayon. `1q`, c'est un quart de millimètre : 0,945px. Les arrêts en px ou en pt ne dépendent pas de cette taille : `60px` est à 60px du centre, et `75pt` à 75 × 4/3 = 100px.

À part la forme, la taille ne compte que pour les pourcentages. `#A34F50` n'a pas de position : il se place à 100 %, soit 0,945px. Un arrêt ne peut pas se placer avant un arrêt précédent : il passe donc à 100px, là où finit l'arrêt d'avant. Le rouge-brun commence au rayon 100, sans fondu.

### 4. Le point de transition à 60px

Sur html, `60px` est seul entre deux couleurs : c'est un point de transition, l'endroit où les deux couleurs se mélangent à moitié. `#F7CB71 0` vient après lui mais se place avant : le 0 passe à 60px. Le point de transition et la couleur suivante sont au même endroit : du noir jusqu'à 60px, puis du jaune, sans fondu. Le jaune va de 60px à 75pt.

Dans mon rendu, sur la ligne y = 149, le rouge-brun s'arrête en x = 99, le jaune commence en x = 100 et le noir en x = 140 : rayons 100 et 60.

### 5. Le disque blanc de body

Sur body, `#fff 0 75pt` est blanc du centre jusqu'à 100px, puis vient `#A34F50`. Le centre de body est (8 + 192, 8 + 142) = (200, 150), le même que celui de html : le rouge-brun autour du disque blanc tombe pile sur celui de html. Sans le clip-path (91 caractères), body cache le noir et le jaune de html, il reste un disque blanc entier, et 15 714 pixels changent.

### 6. Le nœud papillon

Le polygone se calcule sur la boîte de body, 384 × 284. Ses quatre points sont (8 ; 150), (200 ; 289,16), (200 ; 8) et (388,16 ; 150) sur le canevas. Le tracé descend du milieu gauche au milieu du bas, remonte la ligne verticale du centre jusqu'en haut, redescend au milieu droit, et revient à gauche par la ligne horizontale du centre. Les deux traits droits se croisent au centre : la forme, ce sont deux triangles qui s'y touchent, un en bas à gauche, un en haut à droite.

Les deux triangles ont leur angle droit au centre. Celui du bas à gauche a des côtés de 192 et 139,16 : son côté en biais est à 112,7px du centre. Celui du haut à droite a des côtés de 188,16 et 142 : 113,4px. Les deux dépassent le rayon de 100 : chaque quart blanc tient en entier. Au-delà du rayon 100, le rouge-brun de body se pose sur celui de html, et les côtés en biais ne se voient pas.

Dans les deux autres quarts, le noir et le jaune de html se voient. Mon rendu compte 15 714 pixels blancs, 10 062 jaunes, 5 652 noirs et 88 572 rouge-brun.

## Notes de golf

Plus bas, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule déclaration `background` sert aux deux boîtes : le repli contient trois morceaux du dégradé de html, `#111,60px,#F7CB71`, et body les remplace tous par `#fff`. Avec les deux dégradés écrits en entier, `<style>*{background:radial-gradient(1q,#111,60px,#F7CB71 0 75pt,#A34F50);*{background:radial-gradient(1q,#fff 75pt,#A34F50);clip-path:polygon(0 50%,50%99%,50%0,99%50%` (166 caractères), l'image est la même.
- `1q,` fait du dégradé un cercle et rend 100 % minuscule : la dernière couleur n'a pas besoin de position. Avec `circle,` (138 caractères), 100 % est le coin le plus loin de html, à 250px : le jaune et le blanc de body se fondent dans le rouge-brun jusqu'aux coins, et 88 123 pixels changent. Sans taille du tout (131 caractères), le dégradé est une large ellipse qui se fond elle aussi jusqu'aux coins, et 93 936 pixels changent.
- `75pt`, c'est 100px en 4 caractères. Avec `100px` (135 caractères), l'image est la même.
- Le `0` devant `75pt` a deux rôles : sur body, `#fff 0 75pt` est une seule bande blanche ; sur html, c'est l'arrêt qui passe au point de transition de 60px. Sans lui (132 caractères), le noir de html se fond dans le jaune sur 100px, et 14 796 pixels changent.
- Pas d'espace entre `)` et `0`. Avec `) 0` (135 caractères), l'image est la même.
- Pas d'espace après un `%`, et `99%` au lieu de `100%`. Avec `50%100%` et `100%50%` (136 caractères), l'image est la même : les triangles doivent seulement dépasser le rayon 100.
- Le `*{` imbriqué est le moyen le plus court de viser body sans html. Avec `}body{` à sa place (137 caractères), l'image est la même.
- body s'étire sur 384 × 284 grâce au mode quirks, ce qui garde son centre sur celui de html. Avec `<!doctype html>` devant (149 caractères), body fait 0px de haut et html 8px, le dégradé de html se répète tous les 8px sur le canevas, ce qui dessine des bandes verticales, et 49 870 pixels changent.
- Les règles, le `polygon(` et le `<style>` ne sont jamais fermés. Avec `)}}` à la fin (137 caractères), l'image est la même.
