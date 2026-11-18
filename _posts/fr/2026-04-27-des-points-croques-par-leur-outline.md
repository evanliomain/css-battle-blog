---
title: "Des points croqués par leur outline : huit Pac-Man en 168 caractères"
ref: 2026-04-27
permalink: /fr/2026/04/27/des-points-croques-par-leur-outline/
description: "Comment une seule règle donne des bordures pointillées à html et à body, comment un outline couleur du fond croque un quart de chaque point, et comment un reflet recopie body à gauche, dans la cible CSS Battle du 27 avril 2026."
target: /assets/targets/2026-04-27.png
target_url: https://cssbattle.dev/play/OhW92nn3P508esbUhggN
colors: ["#282342", "#6592cf"]
player: koda_pig
chars: 168
score: 680.66
match: 100
code: |
  <style>*{border-block:32q dotted#282342;margin:55 150;outline:38q solid#6592CF;outline-offset:-53q;*{margin:50-90-200 90;-webkit-box-reflect:left 5em;background:#6592CF
---

La cible du 27 avril, ce sont huit disques sombres sur un fond bleu, chacun avec un quart en moins. koda_pig les dessine avec les bordures pointillées du haut et du bas de html et de body : des points de 30px, deux par bord. Un outline couleur du fond croque un quart de chaque point, et `-webkit-box-reflect` recopie les deux points de body à gauche.

Avec **Couleurs pédagogiques**, chaque boîte et chaque outline prend sa propre couleur. **Vue large** montre le bas de body, sous le canevas.

{% include animations/2026-04-27.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* tous les éléments : html et body comptent */
  border-block: 32q dotted#282342; /* en haut et en bas seulement : points de 30px */
  margin: 55 150;                  /* html : 100 × 190, à partir de (150, 55) */
  outline: 38q solid#6592CF;       /* 35px, couleur du fond */
  outline-offset: -53q;            /* −50px : couvre de 15px à 50px vers l'intérieur */
  * {                              /* un élément dans un élément : body */
    margin: 50-90-200 90;          /* body : 100 × 280, à partir de (240, 135) */
    -webkit-box-reflect: left 5em; /* une image en miroir, 80px à gauche */
    background: #6592CF            /* passe sur tout le canevas */
/* la fin du code ferme les deux règles */
```

## Comment ça marche

### 1. Une règle pour tous les éléments

Le code n'est qu'une balise `<style>`. Le navigateur construit html, head (avec le style dedans) et un body vide. `*` vise les quatre. head et style ne sont pas affichés : la règle ne se voit que sur html et body.

Il n'y a pas de doctype : la page est en mode quirks. Un nombre seul, comme `55` dans une marge, est lu en px.

### 2. html : 100 × 190

`margin:55 150` met 150px à gauche et à droite, et 55px en haut et en bas. En mode quirks, html s'étire sur la hauteur du cadre. getBoundingClientRect donne à html une boîte de (150, 55) à (250, 245) : 400 − 2 × 150 = 100 de large, 300 − 2 × 55 = 190 de haut.

### 3. Des bordures pointillées : des disques de 30px

`border-block` ne règle que les bordures du haut et du bas. 32q, c'est 32 × 0,945 = 30,24px ; getComputedStyle donne 30px dans mon Chrome. Une bordure `dotted` aussi épaisse trace des points ronds, de 30px. Sur un bord de 100px, mon Chrome en trace deux, un à chaque bout.

html a donc quatre disques, à ses quatre coins : x = 150 à 180 et 220 à 250, sur le bord du haut (y = 55 à 85) et sur celui du bas (y = 215 à 245). La couleur, `#282342`, est la couleur sombre de la cible.

### 4. L'outline croque un quart

Dans mon Chrome, `outline:38q solid#6592CF` fait 35px d'épaisseur et `outline-offset:-53q` vaut −50px. Un décalage négatif fait rentrer l'outline dans la boîte : il part de 50px à l'intérieur du bord et s'épaissit de 35px vers l'extérieur. Il couvre donc de 15px à 50px vers l'intérieur.

15px, c'est le centre des disques. Sur les 100px de large de html, les 50px pris de chaque côté se rejoignent au milieu : il n'y a pas de trou, et l'outline est un rectangle plein, de x = 165 à 235 et de y = 70 à 230. Il est peint par-dessus les bordures : chaque disque perd le quart tourné vers le milieu de html.

L'outline a la couleur du fond. Sur le canevas bleu, il ne se voit pas : seuls les quarts croqués restent. Sans les deux déclarations d'outline (123 caractères), les huit disques sont entiers, et 1 466 pixels changent.

### 5. body : la règle imbriquée

Le `*{` imbriqué veut dire « un élément dans un élément ». html n'est dans rien : la règle ne touche que head, style et body. body reçoit les deux règles : la bordure et l'outline de la première, et `margin:50-90-200 90` de la règle imbriquée. Les deux règles ont la même spécificité : la marge écrite en dernier gagne.

- 90 à gauche et −90 à droite : body garde 100 − 90 + 90 = 100 de large, de x = 150 + 90 = 240 à 340 ;
- 50 en haut : body commence en 55 + 30 + 50 = 135, sous la bordure du haut de html ;
- −200 en bas : en mode quirks, body s'étire aussi pour remplir html. L'intérieur de html fait 190 − 2 × 30 = 130 de haut, donc body fait 130 − 50 + 200 = 280 de haut, jusqu'à y = 415.

getBoundingClientRect donne à body la boîte (240, 135) à (340, 415). Ses deux disques du haut sont en y = 135 à 165, en x = 240 et 310. Ses deux disques du bas, en y = 385 à 415, sont hors du canevas. Son outline couvre x = 255 à 325 et y = 150 à 400 : il croque le quart intérieur des deux disques du haut.

### 6. Le reflet

`-webkit-box-reflect:left 5em` peint une copie en miroir de body sur sa gauche, à 5em = 80px (la taille de police est de 16px). body commence en x = 240 : la copie finit en x = 160 et commence en 60. Le miroir est la ligne x = 200 : un point en x passe en 400 − x.

La copie garde les disques et l'outline. Le disque centré en x = 255 passe en 145, celui en 325 passe en 75. Les deux restent croqués du côté du milieu. C'est la paire de gauche de la cible.

### 7. Le fond passe au canevas

html n'a pas de fond. Dans ce cas, le navigateur passe le fond de body sur tout le canevas, et la boîte de body n'en peint aucun. `#6592CF` est donc la couleur du canevas.

Ça compte ici : les disques du bas de html débordent de 10px dans la boîte de body (x = 240 à 250) et dans son reflet (x = 150 à 160). Comme body ne peint pas de fond, rien ne les cache. Avec `html{background:#6592CF}` devant (192 caractères), html peint le canevas, body garde son fond dans sa boîte et dans son reflet, ils cachent les 10px intérieurs des deux disques du bas de html, et 434 pixels changent.

## Notes de golf

Plus bas, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une règle pour deux boîtes : la bordure et l'outline, 76 caractères, sont écrits une fois et servent à html et à body. Le `*{` imbriqué ne change que ce dont body a besoin. Avec `}*{` au lieu de `;*{` (même longueur), la seconde règle n'est plus imbriquée et touche aussi html : html passe en (90, 50), et 27 228 pixels changent.
- `32q` fait 3 caractères, `30px` en fait 4. Avec `30px` (169 caractères), l'image est la même. Pareil pour `38q` contre `35px` (169 caractères), et `-53q` contre `-50px` (169 caractères).
- `5em` fait 80px en 3 caractères. Avec `80px` (169 caractères), l'image est la même.
- `-webkit-box-reflect:left 5em;` fait 29 caractères et dessine la paire de disques de gauche. Sans lui (139 caractères), ils manquent, et 1 102 pixels changent.
- La marge basse de −200 garde la bordure du bas de body hors du canevas. Avec `50-90 0 90` (166 caractères), body fait 80px de haut, sa bordure du bas revient de y = 185 à 215, et 2 200 pixels changent.
- Le fond est donné à body, et il peint tout le canevas. Sans `;background:#6592CF` (149 caractères), le canevas est blanc, les outlines se voient en rectangles bleus, et 83 859 pixels changent.
- Pas d'espace avant un `#` ni avant un `-`. Avec `dotted #282342` (169 caractères), ou `50 -90 -200 90` (170 caractères), l'image est la même.
- Les nombres seuls ont besoin du mode quirks. Avec `<!doctype html>` devant (183 caractères), les marges sont ignorées, html prend toute la largeur, et 11 764 pixels changent.
- Les deux règles restent ouvertes, et il n'y a pas de `</style>`. Avec `}}` (170 caractères), l'image est la même.
