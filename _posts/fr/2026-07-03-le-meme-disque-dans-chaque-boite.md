---
title: "Le même disque dans chaque boîte : un robot pixelisé en 161 caractères"
ref: 2026-07-03
permalink: /fr/2026/07/03/le-meme-disque-dans-chaque-boite/
description: "Comment un seul dégradé radial, donné à chaque élément, dessine un disque sombre sur html, part hors du canevas sur un body très haut, et noircit deux images et deux h6 en visage de robot, dans la cible CSS Battle du 3 juillet 2026."
target: /assets/targets/2026-07-03.png
target_url: https://cssbattle.dev/play/bzQ591FAfiRjAtqMae1E
colors: ["#222", "#9be9fd"]
player: emohdaziz
chars: 161
score: 686.23
match: 100
code: |
  <img><img><h6><h6><style>*{background:radial-gradient(1Q,#222,25vw,#9be9fd);*{margin:25%35%-999;*{padding:.94em;margin:30 0 0 20}h6{margin:30 25;+*{margin:-10 10
---

La cible du 3 juillet montre un robot pixelisé sur un fond bleu clair : un grand disque sombre, une tête bleu clair qui le traverse, deux yeux carrés, une bouche et une barre en bas. Mohamed Ali donne à chaque élément le même fond : un dégradé radial qui peint un disque sombre de 100px de rayon au centre de chaque boîte. Sur html, ce disque est le grand cercle. body est si haut que son propre disque tombe loin sous le canevas : il ne montre que du bleu clair, la tête. Deux images et deux h6 sont assez petits pour que leur disque les couvre : ce sont les traits sombres.

Cochez **Couleurs pédagogiques** et **Vue large** pour voir le disque de body, loin sous le canevas.

{% include animations/2026-07-03.html lang=page.lang %}

## Le code, aéré

```css
<img><img><h6><h6>               /* dans body : deux images, deux h6 */
<style>
* {                              /* tous les éléments */
  background: radial-gradient(1Q, #222, 25vw, #9be9fd);
                                 /* un disque sombre, rayon 100px, sur chaque boîte */
  * {                            /* tous sauf html */
    margin: 25%35%-999;          /* body : 100px plus bas, 140px à l'intérieur, −999px en bas */
    * {                          /* les enfants de body */
      padding: .94em;            /* img : 15,04px, h6 : 10,08px */
      margin: 30 0 0 20          /* les yeux */
    }
    h6 {
      margin: 30 25;             /* la bouche : 70 × 20,13 */
      +* {                       /* l'élément juste après un h6 : la barre */
        margin: -10 10           /* 100 × 20,13, 20px sous la bouche */
```

## Comment ça marche

### 1. La page

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité veut dire des px dans `margin`. Toutes les balises arrivent dans body : deux `<img>`, puis deux `<h6>`. Un titre ne peut pas en contenir un autre, donc le second `<h6>` ferme le premier : les deux sont frères. Le `<style>` n'est jamais fermé, et il finit dans le second h6, où il ne s'affiche pas.

### 2. Un dégradé, un disque

`*` donne à chaque élément le même fond : `radial-gradient(1Q,#222,25vw,#9be9fd)`.

`1Q` est la taille : une seule longueur fait du dégradé un cercle, ici d'un rayon de 1Q, un quart de millimètre, 0,945px. `#222` part du centre. `25vw` seul entre deux couleurs est un indice de transition, à 25 % de 400 : 100px. La dernière couleur, `#9be9fd`, n'a pas de position : elle serait au bout du rayon, à 0,945px. Mais une position ne peut pas venir avant une précédente : le bleu clair passe à 100px, là où est l'indice. Le sombre va du centre à 100px, puis devient bleu clair d'un coup. Au-delà du rayon, la dernière couleur continue.

Chaque boîte peint ce disque en son centre. Sur html, le fond couvre tout le canevas, et le disque est centré sur la boîte de html, 400 × 300 : en (200, 150), de x = 100 à 300 et de y = 50 à 250.

### 3. body, la tête

Le `*` imbriqué dans `*` vise tout élément placé dans un autre : tout sauf html. À ce niveau, seul body s'affiche. `margin:25%35%-999` donne 25 % en haut, 35 % sur les côtés et −999px en bas. Les marges en pourcentage se calculent sur la largeur du conteneur, 400px : 100px et 140px. body va de x = 140 à 260, 120px de large, et commence en y = 100.

En mode quirks, body remplit la hauteur de html moins ses marges : 300 − 100 + 999 = 1199px. getBoundingClientRect donne (140, 100), 120 × 1199. Le disque de body est donc centré en (200, 699,5) : il va de y = 599,5 à 799,5, loin sous le canevas.

Sur le canevas, body n'est que du bleu clair : une bande de 120px qui couvre le milieu du disque de html à partir de y = 100. Cette bande est la tête. Elle rejoint le bord du disque en y = 230 des deux côtés, et en dessous elle se fond dans le canevas bleu clair.

### 4. Deux images pour les yeux

Le troisième `*` vise les enfants de body : les deux images, les deux h6 et le style. `padding:.94em` dépend de la taille de police de chaque élément. Une image a une police de 16px : 15,04px. Une `<img>` vide n'a pas de contenu, donc son padding seul en fait un carré. getBoundingClientRect donne 30,06 × 30,06.

`margin:30 0 0 20` place la première image en (160, 130). La seconde la suit sur la même ligne, 20px plus loin : en (210,06, 130). La ligne est juste aussi haute que leurs boîtes de marge, 30 + 30,06, donc le bloc suivant commence en y = 160,06.

Chaque image a aussi le dégradé, et un disque de 100px de rayon couvre entièrement un carré de 30px : les yeux sont sombres.

### 5. Un h6 pour la bouche

`h6` l'emporte sur `*`, donc les deux h6 prennent `margin:30 25`. La police d'un h6 fait 10,72px : le même `.94em` ne donne que 10,08px de padding. Le h6 vide fait 20,13px de haut. Le premier fait 120 − 50 = 70px de large, en x = 165, et commence 30px sous les images : en y = 190,06. Son disque le couvre aussi : la bouche est sombre.

### 6. Le h6 suivant fait la barre

`+*` imbriqué dans `h6` vise l'élément juste après un h6 : le second h6. Sa règle vient après celle de `h6`, avec le même poids, donc elle gagne : `margin:-10 10`. La barre fait 120 − 20 = 100px de large, de x = 150 à 250.

Les marges verticales entre deux blocs fusionnent. La marge du bas de la bouche vaut 30, celle du haut de la barre −10 : elles donnent 30 − 10 = 20px. La barre va de y = 230,19 à 250,31, par-dessus la bande de body.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- Un padding, deux tailles. `em` suit la police de chaque élément : `.94em` donne 15,04px aux images et 10,08px aux h6. `padding:15` plus `padding:10` dans la règle des h6 donne la même image en 169 caractères. Avec `padding:15` seul (158 caractères), la bouche et la barre passent à 30px de haut, et 3 700 pixels changent.
- Un dégradé pour tous les éléments. Le disque, la tête et les quatre traits sombres viennent tous du même `background`. Seule la taille de chaque boîte décide de ce qu'elle montre.
- Le −999 envoie le disque de body ailleurs. Avec `margin:25%35%0` (158 caractères), body s'arrête en y = 310 et son disque est centré en (200, 205). Il couvre le visage : les yeux, la bouche et la barre y disparaissent, et 17 062 pixels changent.
- `1Q` fixe le cercle en 2 caractères. `1px` donne la même image en 162. Sans taille du tout (158 caractères), le dégradé devient une ellipse qui passe en douceur du sombre au bleu clair, et 114 076 pixels changent. Avec `0` (160 caractères), mon Chrome ne peint que du bleu clair, et 19 392 pixels changent.
- `25vw` vaut 100px en 4 caractères. `100px` donne la même image en 162.
- La virgule avant `25vw` en fait un indice, l'espace de `#222 25vw` en ferait une position d'arrêt. Les deux coûtent un caractère et donnent ici la même image.
- Pas d'espace après un `%` : `25%35%-999` fait 10 caractères. `100 140-999` donne la même image en 162.
- `+*` vise le second h6 en 2 caractères, imbriqué dans `h6`. `}h6+h6{` à la place donne la même image en 165.
- Rien n'est fermé. `}}}}</style>` à la fin donne 173 caractères, pour la même image.
