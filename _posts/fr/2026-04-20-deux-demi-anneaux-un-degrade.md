---
title: "Deux demi-anneaux, un dégradé : un bol en 108 caractères"
ref: 2026-04-20
permalink: /fr/2026/04/20/deux-demi-anneaux-un-degrade/
description: "Comment un seul dégradé radial, donné à html et à body, dessine deux demi-anneaux coupés par le bord de leur tuile, avec une variable que seul body reçoit et un repli qui apporte la position de html et le rose du canevas, dans la cible CSS Battle du 20 avril 2026."
target: /assets/targets/2026-04-20.png
target_url: https://cssbattle.dev/play/ubfUyIqOg6n4llkNB3U7
colors: ["#38051e", "#de387b"]
player: h_blierzt
chars: 108
score: 742.9
match: 100
code: |
  <style>*{*{--p:92q}background:radial-gradient(1q at top,#0000 5ch,#38051E 0 15ex,#0000)0 var(--p,50vh#DE387B
---

La cible du 20 avril est un bol sombre sur un fond rose vif : un demi-disque en bas, une marche de chaque côté, et un petit demi-cercle rose découpé en haut. H_Bliertz le dessine avec un seul dégradé radial, donné à html et à body. Chaque copie est un anneau, coupé en deux par le bord de sa tuile. Une variable que seul body reçoit place le demi-anneau de body plus haut. html prend le repli, qui apporte aussi le rose.

Avec **Vue large**, on voit les tuiles au-dessus du canevas. Avec **Couleurs pédagogiques**, chaque demi-anneau prend sa propre couleur.

{% include animations/2026-04-20.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* html, head, style, body */
  * {                        /* head, style, body */
    --p: 92q;                /* 86,93px, pas sur html */
  }
  background: radial-gradient(
      1q at top,             /* un cercle de 0,945px, centré sur le bord du haut */
      #0000 5ch,             /* transparent jusqu'à 40px */
      #38051E 0 15ex,        /* sombre de 40px à 15ex */
      #0000                  /* à 100 % = 0,945px : ramené à 15ex */
    )0 var(--p,50vh#DE387B   /* body : 0 92q ; html : 0 50vh et la couleur */
/* la fin du code ferme var( et la règle */
```

## Comment ça marche

### 1. Deux boîtes, une règle

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Le `<style>` va dans head, et body reste vide.

`*` vise html, head, style et body. Le `*{` imbriqué vise tous les éléments placés dans un autre : head, style et body, mais pas html. head et style ne s'affichent pas : il reste deux boîtes. En mode quirks, html remplit le cadre de 400 × 300, et body remplit html moins sa marge par défaut de 8px : 384 × 284 en (8, 8). getBoundingClientRect donne ces deux boîtes.

### 2. Une variable pour body seulement

Seule la règle imbriquée pose `--p:92q`. html et body reçoivent donc le même `background`, mais `var(--p,50vh#DE387B` ne leur donne pas la même chose.

- body a `--p`. Son fond est le dégradé à la position `0 92q`, sans couleur. 1Q vaut un quart de millimètre, 0,945px : 92q fait 86,93px (getComputedStyle donne `0px 86.9291px`).
- html n'a pas de `--p`, donc le repli s'applique : `50vh#DE387B`. Son fond est le dégradé à la position `0 50vh`, soit 0 150px, sur une couleur `#DE387B`.

Le fond de l'élément racine est peint sur tout le canevas : le canevas est rose. html a un fond, donc celui de body reste dans la boîte de body.

### 3. Un anneau net

`radial-gradient(1q at top, …)` est un cercle de 1q de rayon, 0,945px, centré au milieu du bord du haut de l'image. Les arrêts de couleur sont des longueurs, et le dégradé continue au-delà du cercle :

- `#0000 5ch` : transparent jusqu'à 5ch. Avec la police par défaut, Times en 16px, 5ch fait 40px dans mon Chrome.
- `#38051E 0 15ex` : un arrêt à `0` est ramené au précédent, 40px. Le sombre commence donc là, avec un bord net. Il va jusqu'à 15ex.
- `#0000` : le dernier arrêt n'a pas de position, il va donc à 100 %, le rayon du cercle : 0,945px. C'est moins que 15ex, il est donc ramené à 15ex. L'anneau finit lui aussi par un bord net.

Dans mon Chrome, 15ex vaut 107,695px : getComputedStyle écrit le dégradé avec `107.695px` à sa place. La cible place le bord extérieur à 110px du centre : voir la dernière section. Plus bas, je donne les valeurs de la cible.

### 4. Le bord de la tuile coupe l'anneau de html

Aucun `background-size` n'est donné : l'image de html a la taille de sa boîte, 400 × 300, et elle se répète. La position commence une tuile en (0, 150). L'anneau est centré sur le bord du haut de chaque tuile : en (200, 150).

La moitié haute de cet anneau serait dans la tuile du dessus. Mais cette tuile montre là son propre bas, qui est transparent : son anneau est centré 300px plus haut, en y = -150. html ne dessine donc que le demi-anneau du bas, de y = 150 à 150 + 110 = 260, avec un trou de 40px.

### 5. Le demi-anneau de body, par-dessus

L'image de body a la taille de sa boîte, 384 × 284, à partir de son coin (8, 8). La position la descend de 86,93px : une tuile commence en y = 8 + 86,93 = 94,93, et son anneau est centré en x = 8 + 192 = 200. La tuile du dessus a son anneau 284px plus haut, loin au-dessus du canevas. body dessine donc un demi-anneau de y = 94,93 à 94,93 + 110 = 204,93. Son trou, transparent, laisse voir le canevas rose jusqu'à y = 134,93 : le demi-cercle rose en haut du bol.

body est peint après le canevas, donc son demi-anneau couvre celui de html. Il cache le trou de html, qui va de y = 150 à 190. En y = 150, le bord extérieur de body est à √(110² − 55,07²) = 95,22px du milieu, et celui de html à 110px. L'anneau de html dépasse donc de chaque côté, à partir de y = 150 : les deux marches, larges de 14,78px. Plus bas, le fond du bol est l'anneau de html.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `background` pour deux boîtes. La variable ne change que ce qui diffère. Avec deux règles, `html{background:radial-gradient(1q at top,#0000 5ch,#38051E 0 15ex,#0000)0 50vh#DE387B}body{background:radial-gradient(1q at top,#0000 5ch,#38051E 0 15ex,#0000)0 92q` (172 caractères), l'image est la même.
- La variable est nécessaire. Sans `*{--p:92q}` (98 caractères), body prend le repli lui aussi. Il reçoit la couleur rose, et sa boîte rose cache le demi-anneau de html. Son propre demi-anneau est centré en y = 8 + 150 = 158, et 14 978 pixels changent.
- Le fond de body est nécessaire. Avec `html{` à la place de `*{*{--p:92q}` (101 caractères), il ne reste que le demi-anneau de html, avec son trou, et 11 530 pixels changent.
- Le `*{` imbriqué atteint body sans html. Avec `body{--p:92q}*{` à sa place (111 caractères), l'image est la même.
- `1q` fait le cercle et place 100 % à 0,945px : le dernier `#0000` tombe sur 15ex. Avec `circle at top` (112 caractères), 100 % est la distance au coin le plus loin de la tuile. Le sombre s'estompe de 15ex jusque-là, sur presque tout le canevas, et 92 789 pixels changent. Avec seulement `at top` (105 caractères), la forme est une ellipse : le trou devient ovale, le sombre s'estompe aussi, et 93 991 pixels changent.
- Le dernier arrêt n'a pas besoin de position. Avec `#0000 0` (110 caractères), l'image est la même.
- `#0000` fait 5 caractères, `transparent` 11. Avec `transparent` deux fois (120 caractères), l'image est la même.
- `5ch` fait 40px en 3 caractères. Avec `40px` (109 caractères), l'image est la même.
- `15ex` fait 4 caractères, `110px` 5. Avec `110px` (109 caractères), mon rendu passe aux bords de la cible : voir la dernière section.
- `50vh` fait 150px en 4 caractères. Avec `150px` (109 caractères), l'image est la même.
- `92q` fait 86,93px en 3 caractères. Avec `87px` (109 caractères), le demi-anneau de body descend de 0,07px, et 248 pixels changent, entre y = 94 et 149, de 13 niveaux au plus.
- Le repli contient une position et une couleur, sans espace avant `#`. Avec `) 0` et `50vh #DE387B` (110 caractères), l'image est la même.
- Le code finit dans `var(` et dans la règle : la fin du code les ferme. Avec `)}` à la fin (110 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome local (version 157 au moment d'écrire), le code officiel dessine les mêmes formes que la cible, un peu plus petites. 15ex y vaut 107,695px, alors que la cible place les bords extérieurs à 110px des centres. Dans mon rendu, le demi-anneau de body va de x = 92,3 à 307,7, là où la cible a 90 à 310, et le bol finit en y = 257,7 au lieu de 260. 2 644 pixels s'écartent de la cible de plus de 8 sur une composante, et 856 d'entre eux de 140 niveaux ou plus.

Dans une copie de test avec `110px` à la place de `15ex` (109 caractères), les bords tombent là où la cible les a. Il reste 2 132 pixels, tous à moins de 7 pixels d'un bord, et seuls 20 d'entre eux s'écartent de 140 niveaux ou plus. La cible est un JPEG, aux bords flous et bruités. Le juge de CSS Battle donne au code officiel 100 % de correspondance. L'animation ci-dessus place les bords là où la cible les a.
