---
title: "Une boîte qui dépasse du bord : des marches bleu nuit en 130 caractères"
ref: 2026-04-15
permalink: /fr/2026/04/15/une-boite-qui-depasse-du-bord/
description: "Comment une seule boîte html, poussée 60px au-delà du bord droit, peint tout le canevas en vert avec son fond, et comment six ombres bleu nuit la recopient en marches autour d'une petite barre verte, dans la cible CSS Battle du 15 avril 2026."
target: /assets/targets/2026-04-15.png
target_url: https://cssbattle.dev/play/EOXXLnUGLZCV8vqgBdL8
colors: ["#2faa8b", "#17405b"]
player: jrojko
chars: 130
score: 715.87
match: 100
code: |
  <style>&{margin:95-60 95 350;background:#2FAA8B;color:17405B;box-shadow:0 0 0 101q,-116q 0,-25vw -1in,-217q -69q,-217q 69q,-75vw 0
---

La cible du 15 avril est un canevas vert avec des blocs bleu nuit posés en marches : une zone bleu nuit à droite qui descend en escalier vers la gauche, une petite barre verte au milieu, et un bloc vert contre le bord droit. Juraj Rojko ne stylise qu'une boîte, html, et la pousse 60px au-delà du bord droit du canevas. Son fond peint tout le canevas en vert. Six ombres bleu nuit recopient la boîte pour faire les marches. Le bloc vert à droite est la boîte de html elle-même : une ombre ne se peint jamais dessous.

Avec **Vue large**, la boîte et la grande ombre débordent du canevas. Avec **Couleurs pédagogiques**, chaque ombre prend sa propre couleur.

{% include animations/2026-04-15.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                          /* au premier niveau, & est la racine : html */
  margin: 95-60 95 350;      /* html : 110 × 110 en (350, 95), 60px au-delà du bord droit */
  background: #2FAA8B;       /* le fond de la racine : tout le canevas */
  color: 17405B;             /* sans dièse : le mode quirks l'accepte */
  box-shadow:
    0 0 0 101q,              /* bleu nuit (la couleur), étalé de 95,43px tout autour */
    -116q 0,                 /* 109,61px à gauche */
    -25vw -1in,              /* 100px à gauche, 96px plus haut */
    -217q -69q,              /* 205,04px à gauche, 65,20px plus haut */
    -217q 69q,               /* 205,04px à gauche, 65,20px plus bas */
    -75vw 0                  /* 300px à gauche */
  /* la fin du code ferme la règle */
```

## Comment ça marche

### 1. `&` est html

`&` est le sélecteur d'imbrication. Hors de toute règle, il vaut `:scope`, et dans une feuille de style, c'est l'élément racine : html.

### 2. html : 110 × 110, au-delà du bord droit

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, où les longueurs sans unité dans les marges comptent comme des pixels.

`margin:95-60 95 350` donne 95 en haut, −60 à droite, 95 en bas et 350 à gauche. Le signe moins commence un nouveau nombre : `95-60` n'a pas besoin d'espace. Une marge négative élargit la boîte : html va de x = 350 à 400 + 60 = 460. Elle fait 110px de large, dont 60 hors du canevas.

En mode quirks, html s'étire sur la hauteur de la fenêtre, moins ses marges : 300 − 95 − 95 = 110. Elle va de y = 95 à 205. getBoundingClientRect donne 350, 95, 110 × 110.

### 3. Le canevas est vert

`background:#2FAA8B` est posé sur la racine. Le fond de la racine ne s'arrête pas à sa boîte : il se peint sur tout le canevas. Tout commence en vert.

### 4. Une couleur sans dièse

`color:17405B` n'a pas de `#`. En mode quirks, quelques propriétés, dont `color`, acceptent une couleur hexadécimale sans dièse : getComputedStyle donne rgb(23, 64, 91). html n'affiche aucun texte, mais une ombre sans couleur prend la valeur de `color`. Aucune des six ombres n'a de couleur : elles sont toutes bleu nuit.

### 5. L'étalement couvre le côté droit

`0 0 0 101q` n'a ni décalage ni flou, mais un étalement de 101q. 1q vaut un quart de millimètre, 0,945px : 101q font 95,43px, ajoutés de chaque côté de la boîte. L'ombre va de x = 254,57 à 555,43 et de y = −0,43 à 300,43 : tout le côté droit du canevas, de haut en bas. La cible place son bord gauche en x = 255.

Une ombre ne se peint jamais sous sa propre boîte. Dans la boîte de html, de x = 350 au bord du canevas et de y = 95 à 205, le canevas vert reste visible : c'est le bloc vert à droite.

### 6. Cinq copies font les marches

Une ombre sans étalement est une copie de la boîte, 110 × 110, décalée de ses deux valeurs.

- `-116q 0` : 116q font 109,61px. La copie va de x = 240,39 à 350,39, de y = 95 à 205. Elle prolonge le bleu nuit vers la gauche sur la rangée du milieu. La cible y place un bord en x = 240.
- `-25vw -1in` : 25vw font 25 % des 400px de large, soit 100px, et 1in vaut 96px. La copie va de x = 250 à 360 et de y = −1 à 109. En haut du canevas, le bleu nuit commence donc en x = 250, comme dans la cible.
- `-217q -69q` et `-217q 69q` : 217q font 205,04px et 69q 65,20px. Les deux copies vont de x = 144,96 à 254,96, l'une de y = 29,80 à 139,80, l'autre de y = 160,20 à 270,20. La cible les place de x = 145 à 255, de y = 30 à 140 et de 160 à 270. Entre les deux, une bande de 20,39px de haut reste verte (20px dans la cible).
- `-75vw 0` : 75vw font 300px. La copie va de x = 50 à 160, de y = 95 à 205. Elle ferme le bout gauche de la bande verte.

Ce qui reste de la bande, de x = 160 à 240 et de y = 140 à 160, est la barre verte du milieu. Rien ne la peint : c'est le canevas, entre les copies.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&` fait 1 caractère, `html` 4. Avec `html{` (133 caractères), l'image est la même.
- Une seule boîte fait toute la peinture : son fond est tout le canevas vert, et ses six ombres sont le bleu nuit. Le bloc vert à droite ne coûte rien : c'est le canevas, vu à travers la boîte de html.
- `color:17405B;` fait 13 caractères, et colore six ombres. Avec `color:#17405B` (131 caractères), l'image est la même. Sans `color` et avec `#17405B` après chaque ombre (159 caractères), l'image est la même. Sans aucune couleur (117 caractères), les ombres deviennent noires : 73 644 pixels changent.
- Le dièse reste dans `background:#2FAA8B`. Avec `background:2FAA8B` (129 caractères), mon Chrome ignore le fond : le canevas reste blanc, et 46 782 pixels changent. Avec `background-color:2FAA8B` (135 caractères), l'image est la même, mais c'est 5 caractères de plus.
- La marge droite vaut −60, et c'est ce qui donne 110px de large à la boîte, la taille de chaque bloc bleu nuit. Avec une marge droite à 0 (`95 0 95 350`, 129 caractères), html ne fait plus que 50px de large, comme ses six copies : 17 010 pixels changent.
- `95-60` n'a pas besoin d'espace : le moins commence un nouveau nombre. Avec `95 -60` (131 caractères), l'image est la même.
- Le mode quirks accepte les nombres sans unité dans les marges. Avec `95px -60px 95px 350px` (139 caractères), l'image est la même.
- `116q` fait 4 caractères, `110px` 5. Avec `-110px` (131 caractères), le bord gauche de la copie bouge de 0,394px : 20 pixels changent, sur la colonne x = 240, le bout droit de la barre verte.
- `217q` fait 4 caractères, `205px` 5, et il revient deux fois. Avec `-205px` deux fois (132 caractères), l'image est la même.
- `69q` fait 3 caractères, `65px` 4, et il revient deux fois. Avec `65px` deux fois (132 caractères), les bords des deux copies bougent de 0,197px : 375 pixels changent, sur les rangées y = 29, 139, 160 et 270.
- `25vw` fait 4 caractères, `100px` 5. Avec `-100px` (131 caractères), l'image est la même. `75vw` fait 4 caractères, `300px` 5. Avec `-300px` (131 caractères), l'image est la même.
- Le décalage vertical de `-25vw -1in` doit seulement mettre le haut de la copie au-dessus du canevas et son bas sous y = 30. Avec `-95px` (131 caractères) ou `-175px` (132 caractères), l'image est la même ; avec `-94px` ou `-176px`, 5 pixels changent. `1in` fait 96px en 3 caractères.
- Le code se termine dans la règle : la fin du code la ferme. Avec `-75vw 0}` (131 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire ces lignes), le code officiel dessine les mêmes blocs que la cible, dans les deux mêmes couleurs unies. 424 pixels diffèrent de plus de 8 niveaux, tous sur des bords droits. 375 sont sur les rangées y = 29, 139, 160 et 270 : les bords des deux copies `-217q ±69q`, en y = 29,80, 139,80, 160,20 et 270,20 dans mon rendu. 20 sont sur la colonne x = 240, où la copie `-116q 0` commence en x = 240,39. 29 sont sur la colonne x = 254, sous y = 270, où l'étalement commence en x = 254,57. Dans la cible, ces bords tombent sur des pixels entiers. Quand j'écris `-110px`, `65px` et `95px` à la place de `-116q`, `69q` et `101q` (133 caractères), aucun pixel de mon rendu ne s'écarte de la cible de plus de 8 niveaux. 285 pixels diffèrent encore, de 5 niveaux au plus, sur les colonnes x = 144 et 254 : les copies `-217q` vont de x = 144,96 à 254,96. Le juge de CSS Battle donne au code officiel 100 % de ressemblance.
