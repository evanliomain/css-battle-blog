---
title: "Deux outlines en tirets, une fenêtre : un éclair en 120 caractères"
ref: 2026-06-23
permalink: /fr/2026/06/23/deux-outlines-en-tirets-une-fenetre/
description: "Comment un outline en tirets sur body et un autre plus épais sur un h1 tourné, vus à travers une fenêtre en clip-path, coupent un carré sombre en deux pièces, dans la cible CSS Battle du 23 juin 2026."
target: /assets/targets/2026-06-23.png
target_url: https://cssbattle.dev/play/TRLoToMQ6reTNuP9PYZX
colors: ["#1b5f1e", "#b3f0b6"]
player: selenit
chars: 120
score: 727.45
match: 100
code: |
  <h1><img><style>*{margin:50-32;*{*{rotate:-60deg}outline:dashed 8ex#1B5F1E}+*{background:#B3F0B6;clip-path:inset(-50%31%
---

La cible du 23 juin est un carré vert foncé sur un fond menthe, coupé en deux par une bande claire en biais. La pièce de gauche a un pied, celle de droite une tête, comme un éclair. Ilya Streltsyn ne peint aucun fond vert foncé. Chaque pixel sombre est un morceau d'outline en tirets : un fin sur body, un épais sur un h1 tourné. Un clip-path sur body ne garde qu'une fenêtre de 200 × 200.

Utilisez la **Vue large** pour voir la vraie taille des outlines, et les **Couleurs pédagogiques** pour voir quel outline dessine quelle pièce.

{% include animations/2026-06-23.html lang=page.lang %}

## Le code, aéré

```css
<h1><img>                          /* body contient un h1, avec une img dedans */
<style>
* {                                /* html, head, body, h1, img, style */
  margin: 50-32;                   /* 50px en haut et en bas, -32px à gauche et à droite */
  * {                              /* * * : body, h1, img (head et style sont masqués) */
    * {                            /* * * * : h1 et img */
      rotate: -60deg
    }
    outline: dashed 8ex#1B5F1E     /* 57px sur body, 117px sur h1 et img */
  }
  +* {                             /* * + * : body (et style, masqué) */
    background: #B3F0B6;           /* passe sur tout le canevas */
    clip-path: inset(-50%31%       /* garde la fenêtre de (99,68, 50) à (300,32, 250) */
```

## Comment ça marche

### 1. Une règle, imbriquée trois fois

`*` vise html, head, body, h1, img et style. L'imbrication en tire deux autres sélecteurs :

- `*{*{` donne `* *` : tout élément dans un autre. head et style sont masqués, donc l'outline dessine sur body, h1 et img.
- `*{*{*{` donne `* * *` : les éléments qui ont deux ancêtres. Ce sont h1 et img, qui reçoivent la rotation.
- `*{+*{` donne `* + *` : un élément juste après un frère. body vient après head : il reçoit le fond et le clip-path. style vient après img et les reçoit aussi, mais il est masqué.

### 2. Un fond que le clip ne coupe pas

html n'a pas de fond, alors le fond de body est peint sur tout le canevas, et pas dans la boîte de body. Le canevas est #B3F0B6 partout.

Ça compte à la fin : le clip-path coupe body, pas le canevas. Je l'ai vérifié en ajoutant `html{background:red}` : la couleur claire reste alors dans la boîte découpée de body, et le reste du canevas devient rouge.

### 3. Les marges

`margin:50-32` n'a pas d'unité. Les pages de CSS Battle tournent en mode quirks, où un nombre seul est lu en px. `50-32` fait deux nombres, 50 et −32 : 50px en haut et en bas, −32px à gauche et à droite. Tous les éléments les reçoivent.

En mode quirks, html remplit la hauteur de la page moins ses marges, et body remplit html de la même façon. J'ai mesuré les boîtes :

- html : 400 + 64 = 464px de large, 300 − 100 = 200px de haut, de (−32, 50) à (432, 250).
- body : 464 + 64 = 528px de large, 200 − 100 = 100px de haut, de (−64, 100) à (464, 200).
- h1 : 528 + 64 = 592px de large, de x = −96 à 496.

Chaque boîte déborde autant des deux côtés : le centre de h1 est donc (200, 150), le centre du canevas.

### 4. Une image vide de 100px de haut

img n'a pas de source : elle fait 0 × 0. Elle est en ligne, et ses marges de 50px en haut et en bas comptent quand même dans sa ligne : la ligne fait 50 + 0 + 50 = 100px de haut. h1 fait donc 100px de haut, de y = 100 à 200. Sa marge du haut se fond avec celle de body : les deux commencent en y = 100.

Sans `<img>`, h1 fait 0px de haut. Ces 100px deviennent la largeur de la bande claire.

### 5. Une longueur, deux épaisseurs

`outline:dashed 8ex#1B5F1E` trace une bande sombre autour de chaque boîte. `ex` dépend de la police de chaque élément :

- body : Times 16px, 1ex fait 7,18px. 8ex font 57,44px, et Chrome dessine 57px.
- h1 : Times 32px en gras, 1ex fait 14,73px. 8ex font 117,88px, et Chrome dessine 117px. img hérite de la police de h1 et reçoit 117px aussi.

### 6. Les tirets

Un outline en tirets aussi épais a des tirets deux fois plus longs que larges. Dans mon rendu, Chrome les espace de 62px.

- Autour de body, la bande va de (−121, 43) à (521, 257). Les grands côtés ont quatre tirets de 114px. Le trou du milieu va de x = 169 à 230, centré sur 200. Les petits côtés font 214px et restent pleins.
- Autour de h1, avant la rotation, la bande va de (−213, −17) à (613, 317). Les grands côtés ont trois tirets de 234px : celui du milieu va de x = 83 à 316. Les petits côtés sont pleins.
- Autour de img, une boîte de 0 × 0, l'outline est un carré plein de 234 × 234.

L'outline de h1 est peint par-dessus celui de body, et celui de img par-dessus celui de h1.

### 7. La rotation

`rotate:-60deg` tourne h1 autour de son centre, (200, 150). Sa boîte vide devient la bande claire, large de 100px, inclinée à 60°. Ses deux grandes bandes sont de part et d'autre, larges de 117px chacune.

img tourne avec h1, puis encore de −60° autour de son propre point. Son carré finit loin en bas, autour de (36, 434).

### 8. La fenêtre

`clip-path:inset(-50%31%` se calcule sur la boîte de body, 528 × 100. 31 % de 528 font 163,68px, retirés à gauche et à droite. −50 % de 100 font −50px : la fenêtre gagne 50px en haut et en bas. Il reste la zone de (99,68, 50) à (300,32, 250).

clip-path coupe body et tout ce qu'il contient, outlines compris. L'outline de h1, le carré de img et presque tout l'outline de body disparaissent. Le fond reste, car il appartient au canevas.

### 9. Ce que montre la fenêtre

- À gauche de la bande claire, le tiret du milieu de la bande du haut de h1. Son coin le plus éloigné est à environ 137px de l'axe de la bande claire, et la bande va jusqu'à 50 + 117 = 167px. Elle couvre donc tout le haut gauche de la fenêtre.
- À droite de la bande claire, le tiret du milieu de la bande du bas de h1 fait de même.
- La bande du haut de body se voit de y = 50 à 100. Son trou laisse du clair autour de x = 200, et son tiret de droite fait le bloc en haut à droite, de x = 231 à 300.
- La bande du bas de body se voit de y = 200 à 250. Son tiret de gauche fait le pied en bas à gauche, de x = 100 à 168.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `8ex` donne deux épaisseurs en 3 caractères, car la police de h1 est deux fois plus grande et en gras. Avec `57px` (121 caractères), les bandes de h1 font 57px aussi. Elles n'atteignent plus les coins de la fenêtre, et 2 996 pixels changent. `<p>` au lieu de `<h1>` (119 caractères) donne les mêmes bandes de 57px et les mêmes 2 996 pixels changés.
- `<img>` coûte 5 caractères et donne sa hauteur à h1. Sans elle (115 caractères), h1 fait 0px de haut, la bande claire se réduit à un trait, et 16 429 pixels changent.
- `margin:50-32` n'a ni unité ni espace. `50px -32px` donne la même image en 125 caractères.
- `+*{` vise body en 3 caractères. `body{` donne la même image en 122 caractères.
- `-50%` dans l'inset donne une fenêtre de 200px de haut à un body qui n'en fait que 100. Avec `0 31%` (118 caractères), il ne reste que les 100 rangées du milieu : les tirets de body et le haut et le bas des bandes de h1 disparaissent, et 15 715 pixels changent.
- Pas besoin d'espace entre `8ex` et `#1B5F1E`, ni entre `-50%` et `31%`. Avec l'un ou l'autre, la même image prend 121 caractères.
- Rien n'est fermé. `)}}` à la fin donne la même image en 123 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel est proche de la cible sans être identique. Le pied en bas à gauche fait 69px de large, de x = 100 à 168, là où la cible en a 70. Le bloc en haut à droite commence en x = 231, là où la cible commence en 230. Les bords de la fenêtre tombent en x = 99,68 et 300,32 : les colonnes x = 99 et x = 300 sont donc en partie sombres, là où la cible n'en a pas.

Quand je force l'outline de body à 58px au lieu de 57, ses trous passent à 60px, et le pied et le bloc tombent exactement là où la cible les a. Le juge de CSS Battle donne au code 100 % de ressemblance.
