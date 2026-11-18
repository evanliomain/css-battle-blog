---
title: "Un dégradé en 1q sur trois éléments : une fenêtre à quatre carreaux en 145 caractères"
ref: 2026-06-15
permalink: /fr/2026/06/15/un-degrade-en-1q-sur-trois-elements/
description: "Comment un seul dégradé radial de taille 1q dessine un anneau sur le canevas avec html et deux carrés troués avec body et p, pourquoi 1q lui donne des bords nets, et comment les bordures de body et p tracent la croix, dans la cible CSS Battle du 15 juin 2026."
target: /assets/targets/2026-06-15.png
target_url: https://cssbattle.dev/play/huzTWsbhbRLHx1qJWmnm
colors: ["#2d696f", "#81a5a9"]
player: h_blierzt
chars: 145
score: 700.43
match: 100
code: |
  <p><style>*{*{p{margin:90}height:90;width:90}margin:5 30;border:solid 5vw#2D696F;background:radial-gradient(1q,#2D696F 5vh,#81A5A9 0 25vw,#2D696F
---

La cible du 15 juin ressemble à une fenêtre à quatre carreaux sur un fond sarcelle foncé : deux carrés clairs percés d'un petit trou sombre, en haut à gauche et en bas à droite, et deux quarts de disque clairs, en haut à droite et en bas à gauche. H_Bliertz donne à html, body et p la même bordure et le même dégradé radial : un trou sombre, un anneau clair, puis de nouveau du sombre. Sur html, il devient un grand anneau sur le canevas, et body et p en cachent deux quarts avec leurs carrés. La taille du dégradé, `1q`, lui donne ses bords nets.

Utilisez les **Couleurs pédagogiques** pour distinguer les trois éléments, et la **Vue large** pour voir le dégradé de html se répéter autour du canevas.

{% include animations/2026-06-15.html lang=page.lang %}

## Le code, aéré

```css
<p><style>
* {                        /* html, head, body, p, style */
  * {                      /* tout ce qui est dans html : head, body, p, style */
    p {                    /* p */
      margin: 90;          /* 90 = largeur de body : p commence en (190, 140) */
    }
    height: 90;
    width: 90;
  }
  margin: 5 30;            /* html : 340 × 290 en (30, 5) ; body en (80, 30) */
  border: solid 5vw #2D696F;   /* 5vw = 20px, de la couleur du canevas */
  background:
    radial-gradient(
      1q,                  /* un cercle de 0,945px de rayon */
      #2D696F 5vh,         /* sombre jusqu'à 15px : le trou */
      #81A5A9 0 25vw,      /* clair de 15px à 100px */
      #2D696F              /* sombre : ses 100 % valent 0,945px, il commence donc à 100px */
```

## Comment ça marche

### 1. Cinq éléments, trois qui se voient

La page commence par `<p>`. Le navigateur ajoute html, head et body, et range p et style dans body. `*` touche donc cinq éléments : html, head, body, p et style. head et style sont cachés. Il reste html, body et p.

Les règles sont imbriquées. `*{*{…}}` veut dire `* *` : tout élément placé dans un autre, donc tout sauf html. `*{*{p{…}}}` veut dire `* * p` : seulement p. `height:90;width:90` va donc à body et p, et `margin:90` seulement à p. html garde la marge `5 30`.

### 2. html : un cadre qui ne se voit jamais

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Une longueur sans unité comme `5 30` s'y lit en px, et html y remplit la hauteur de la page. Sa boîte fait 400 − 60 = 340px de large et 300 − 10 = 290px de haut, en (30, 5).

`5vw`, c'est 5 % des 400px de large de la fenêtre : 20px. À l'intérieur de cette bordure, la boîte de remplissage de html fait 300 × 250, en (50, 25). Ses marges sont les mêmes des deux côtés, donc son centre est celui du canevas, (200, 150). La bordure est `#2D696F`, la couleur du canevas : elle ne se voit jamais.

### 3. Un dégradé, des bords nets

html est la racine : son fond est peint sur tout le canevas. Le dégradé est placé dans la boîte de remplissage de html, centré sur (200, 150).

`radial-gradient(1q,…)` commence par une seule longueur : c'est un cercle, de rayon `1q`, un quart de millimètre, 0,945px. Les positions des arrêts en px se mesurent depuis le centre, et elles peuvent aller bien au-delà de ce cercle. Sombre jusqu'à `5vh`, 5 % de 300 : 15px. Puis `#81A5A9 0` : un arrêt ne peut pas se placer avant le précédent, donc 0 remonte à 15px. Le clair commence là, sans fondu, et va jusqu'à `25vw`, 100px.

Le dernier `#2D696F` n'a pas de position. Un dernier arrêt se place à 100 % du dégradé, ici le cercle de 0,945px. C'est avant 100px, donc il remonte lui aussi à 100px : le sombre commence pile à 100px, et reste sombre au-delà. On obtient un anneau clair autour de (200, 150), de 15px à 100px, avec deux bords nets.

### 4. Des tuiles sur tout le canevas

Le code ne donne aucune couleur de fond. Le dégradé est aussi grand que la boîte de remplissage de html, 300 × 250, et il se répète. Ses quatre coins sont sombres, à plus de 100px de son centre. Les tuiles autour de celle du milieu remplissent le reste du canevas de ce sombre.

Leurs anneaux ne se voient pas. La tuile de gauche a son centre en (−100, 150) : son anneau s'arrête en x = 0. Pareil pour les tuiles de droite, du haut et du bas : leurs anneaux s'arrêtent pile en x = 400, y = 0 et y = 300.

### 5. body et p : deux carrés troués

body fait 90 × 90 avec une bordure de 20px : 130 × 130. La boîte de contenu de html commence en (50, 25), et la marge `5 30` de body le place en (80, 30). Sa boîte de remplissage fait 90 × 90, en (100, 50).

body reçoit le même dégradé, centré dans sa propre boîte de remplissage, en (145, 95). Le trou fait 15px. Les coins du carré ne sont qu'à 45 × √2 = 63,6px du centre, moins de 100px : le reste du carré est clair. La bordure est peinte par-dessus le fond, en un cadre sombre de 20px.

p est dans body. Sa marge de 90 se compte depuis la boîte de contenu de body, qui va de (100, 50) à (190, 140). 90, c'est pile la largeur et la hauteur de body : p commence là où le contenu de body s'arrête, en (190, 140). Sa boîte de remplissage va de (210, 160) à (300, 250), et son trou est en (255, 205).

### 6. La croix et les quarts de disque

Les bordures droite et basse de body et les bordures gauche et haute de p tracent une croix sombre de 20px de large, qui passe par (200, 150). Elles se croisent sur un carré de 20 × 20 en (190, 140), où la bordure de p se pose sur celle de body.

body et p cachent les quarts en haut à gauche et en bas à droite de l'anneau de html. Il reste les deux autres quarts : les quarts de disque. Leur bord rond est le cercle de 100px autour de (200, 150). Il touche y = 50, le haut du carré clair de body, et x = 300, la droite de celui de p.

La croix cache aussi le trou de l'anneau, presque. Le trou a un rayon de 15px, mais la croix ne s'étend qu'à 10px de chaque côté de (200, 150). Aux coins intérieurs de la croix, le trou dépasse d'un pixel : dans mon rendu, les pixels en (210, 139) et (189, 160) sont sombres. Quand j'enlève le trou de html, seuls ces deux pixels changent.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `1q` fait deux choses en 2 caractères. Une seule longueur fait du dégradé un cercle. Et elle rend les 100 % minuscules : le dernier arrêt, sans position, se cale sur 100px, avec un bord net. Avec `circle` à la place (149 caractères), les 100 % sont le coin le plus loin, à 195,3px du centre de html : le clair se fond dans le sombre de 100px à 195px, et 50 700 pixels changent. `circle` a besoin de `#2D696F 0` à la fin pour donner la même image : 151 caractères.
- Sans aucune taille (142 caractères), le dégradé est une ellipse et le bord se fond : 51 182 pixels changent. Avec `#2D696F 0` à la fin (144 caractères), il ne reste que l'ellipse : l'anneau de html prend la forme de sa boîte de remplissage de 300 × 250, à 100px du centre en largeur et 83,3px en hauteur. Les quarts de disque s'aplatissent, et 2 280 pixels changent.
- `1q` est la longueur la plus courte qui marche. `1px` donne la même image en 146 caractères. Avec `0q`, le dégradé n'a pas de taille : il ne peint que sa dernière couleur, tout le clair disparaît, et 26 680 pixels changent.
- `#81A5A9 0` fait le premier bord net en un caractère : 0 remonte à 15px. `#81A5A9 5vh` donne la même image en 147 caractères.
- Les unités de la fenêtre de 400 × 300 font un caractère de moins que les px : `5vh` vaut 15px, `25vw` 100px, `5vw` 20px. Avec `15px`, `100px` ou `20px`, l'image est la même en 146 caractères. `5vw#2D696F` se passe d'espace : l'unité termine le nombre.
- La bordure a besoin de son unité. Avec un `20` sans unité (`border:solid 20 #2D696F`, 145 caractères), Chrome ignore toute la déclaration `border` : plus aucune bordure, et les marges de body et de p fusionnent. 15 985 pixels changent.
- Le sombre autour du dessin ne coûte rien : c'est la dernière couleur du dégradé, en tuiles répétées. Avec `)no-repeat` après le dégradé (155 caractères), tout ce qui est hors de la boîte de html devient blanc, et 21 400 pixels changent. Sans le dernier `,#2D696F` (137 caractères), tout est clair au-delà de 15px, et 51 086 pixels changent.
- Les règles imbriquées font gagner 2 caractères. `* *{height:90;width:90}p{margin:90}*{…` donne la même image en 147 caractères.
- `margin:90` vaut la largeur de body : p commence pile là où le contenu de body s'arrête. Avec `margin:80`, même longueur, p remonte de 10px vers la gauche et le haut, dans la croix, et 6 092 pixels changent.
- Rien n'est fermé. `)}` à la fin donne la même image en 147 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 1 057 pixels, avec la même règle que dans les notes de golf. Ils sont tous à 8px au plus d'un bord entre les deux couleurs. Deux d'entre eux sont les coins du trou de html, en (210, 139) et (189, 160) : sombres dans mon rendu, clairs dans la cible. La cible est un JPEG : elle a 1 473 couleurs différentes, mon rendu 2, et ses couleurs unies sont `#2e696f` et `#82a5a9`. Le juge de CSS Battle donne au code 100 % de correspondance.
