---
title: "Deux tirets deux fois plus larges : un sourire en blocs en 96 caractères"
ref: 2026-07-26
permalink: /fr/2026/07/26/deux-tirets-deux-fois-plus-larges/
description: "Comment la bordure de html dessine la bouche, et la bordure en tirets de body, étirée deux fois plus large, les quatre blocs des côtés dans la cible CSS Battle du 26 juillet 2026."
target: /assets/targets/2026-07-26.png
target_url: https://cssbattle.dev/play/CUs5VythepaqtPdbLpI7
colors: ["#e38f66", "#f7ec7d"]
player: h_blierzt
chars: 96
score: 760.21
match: 100
code: |
  <style>*{margin:40 90;background:#E38F66;border:dashed 5em#F7EC7D;*{margin:-120-185-30;scale:2 1
---

La cible du 26 juillet est un sourire en blocs sur un fond orange : quatre blocs jaunes touchent les bords gauche et droit, deux en haut et deux plus bas, et une barre jaune est posée au milieu, près du bas. H_Bliertz donne à html et à body la même bordure en tirets de 80px. La bordure de html fait la barre. Celle de body, tirée en largeur par des marges négatives puis étirée deux fois plus large par `scale`, se coupe en quatre blocs.

Passez en **Vue large** pour voir body dépasser loin des deux côtés du canevas, et cochez **Couleurs pédagogiques** pour distinguer la bordure de html de celle de body.

{% include animations/2026-07-26.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                               /* d'abord html, puis body (head et style sont masqués) */
  margin: 40 90;                  /* html : x = 90 à 310, y = 40 à 260 */
  background: #E38F66;            /* le canevas (html), et la boîte de body */
  border: dashed 5em#F7EC7D;      /* bordure jaune de 80px, sur html et sur body */
  * {                             /* head, style, body */
    margin: -120-185-30;          /* body : x = -15 à 415, à partir de y = 0, 210px de haut */
    scale: 2 1                    /* deux fois plus large, autour de x = 200 */
```

## Comment ça marche

### 1. html : un cadre plein

La balise style n'est jamais fermée : tout ce qui suit `<style>` est du CSS. Il n'y a pas de doctype : la page est en mode quirks. Dans ce mode, un nombre sans unité compte en px dans `margin`.

`*` vise d'abord html. Son fond, `#E38F66`, est le fond de la racine : il peint tout le canevas en orange.

En mode quirks, html s'étire aussi sur la hauteur de la fenêtre. Avec `margin:40 90`, sa boîte fait 400 − 90 − 90 = 220px de large et 300 − 40 − 40 = 220px de haut : de x = 90 à 310 et de y = 40 à 260.

Sa bordure est `dashed 5em`. 1em fait 16px, donc 5em = 80px. Il reste une boîte de contenu de 60 × 60, de x = 170 à 230 et de y = 120 à 180. La bordure est en tirets, mais dans mon rendu elle sort pleine : body masqué, tout le cadre est jaune, 220 × 220 − 60 × 60 = 44 800 pixels.

### 2. body : une boîte très large

Le `*{` imbriqué vaut `* *` : tout élément placé dans un autre. Ce sont head, style et body. head et style sont masqués. body reçoit aussi la règle extérieure : le même fond orange et la même bordure en tirets.

body prend `margin:-120-185-30` : −120px en haut, −185px à gauche et à droite, −30px en bas.

- En haut : le contenu de html commence en y = 120, donc body commence en y = 0.
- En largeur : le contenu de html fait 60px de large. Avec −185px de chaque côté, body fait 60 + 185 + 185 = 430px de large, de x = −15 à 415.
- En hauteur : body est vide, mais en mode quirks il s'étire pour remplir le contenu de html, haut de 60px. C'est la hauteur de sa boîte de marge, donc sa boîte de bordure fait 60 + 120 + 30 = 210px de haut, de y = 0 à 210. Je l'ai vérifié en changeant la marge du bas : avec −60, body fait 240px de haut ; avec 0, il fait 180px.

body est peint après html. Son fond orange couvre le cadre de html jusqu'à y = 210.

### 3. dashed : deux trous

La bordure de body fait 80px de large, comme celle de html, mais ses côtés sont bien plus longs. Dans mon rendu, le côté haut, long de 430px, sort en jaune de x = −15 à 145, en orange de 145 à 255, et en jaune de 255 à 415 : 160px, 110px, 160px. Le côté bas, de y = 130 à 210, est pareil. Les côtés gauche et droit, avec seulement 50px entre les coins, restent pleins.

Les trous ne sont pas vides : ils montrent le fond orange de body, de la même couleur que le canevas.

Entre les bordures haute et basse, de y = 80 à 130, il y a la boîte de contenu de body, orange elle aussi, de x = 65 à 335.

### 4. scale:2 1 : deux fois plus large

`scale:2 1` double la largeur de body et garde sa hauteur. L'étirement se fait autour du centre de la boîte de body : −15 + 430 / 2 = 200. Chaque x devient 2x − 200 :

- les bouts jaunes : −15 à 145 devient −230 à 90, et 255 à 415 devient 310 à 630 ;
- les trous : 145 à 255 devient 90 à 310, soit 220px de large ;
- les bordures des côtés : x = −230 à −70 et 470 à 630, hors du canevas ;
- la boîte de contenu : 65 à 335 devient −70 à 470, plus large que le canevas.

`scale` ne change pas la mise en page, seulement la peinture. Sur le canevas, il reste de la bordure de body quatre blocs jaunes de 90 × 80 : x = 0 à 90 et 310 à 400, en y = 0 à 80 et y = 130 à 210. Entre eux, de y = 80 à 130, la boîte de contenu orange de body couvre toute la largeur.

### 5. La barre : la bordure de html dépasse

body finit en y = 210. La bordure basse de html va de y = 180 à 260 : ses 50px du bas ne sont pas couverts. Ils font la barre : 220 × 50, de x = 90 à 310 et de y = 210 à 260.

Sous y = 260, le canevas est de nouveau orange : c'est la marge basse de html, peinte par le fond de la racine.

## Notes de golf

- Une seule règle habille les deux éléments. html et body reçoivent le même fond et la même bordure en tirets par `*`. La règle imbriquée ne change que la marge de body et ajoute l'étirement.
- Le fond de body ne coûte rien, et il compte : il cache le cadre de html. Avec `background:none` ajouté pour body, 33 800 pixels changent : le cadre de html apparaît au milieu, de y = 40 à 210.
- `dashed` a un caractère de plus que `solid`, et c'est lui qui fait l'image. Avec `solid`, les deux trous se remplissent : 2 × 220 × 80 = 35 200 pixels changent.
- `scale:2 1` fait 9 caractères. `transform:scaleX(2)` donne la même image en 106 caractères, 10 de plus.
- Sans l'étirement, le code fait 86 caractères, et 24 100 pixels changent : les quatre blocs font 145px de large au lieu de 90 (2 × 55 × 160 = 17 600 pixels), et les bordures des côtés de body apparaissent en x = 0 à 65 et 335 à 400 entre les blocs (2 × 65 × 50 = 6 500 pixels).
- Les valeurs n'ont pas d'unité : la page est en mode quirks. Avec `px` sur chacune des cinq valeurs de marge, le code fait 106 caractères, 10 de plus, et l'image est la même.
- Le mode quirks ne fait pas qu'accepter les nombres sans unité : il étire html et body. Avec `<!doctype html>` et des unités px, body ne fait plus que 160px de haut dans mon rendu, et html 170px.
- `5em` vaut 80px en 3 caractères. `80px` donne la même image en 97 caractères.
- Pas besoin d'espace dans `5em#F7EC7D` : le `#` commence un nouveau mot. Dans `-120-185-30`, chaque signe moins commence un nouveau nombre. Avec les trois espaces, le code fait 99 caractères et l'image est la même.
- Rien n'est fermé : ni les deux règles, ni la balise style. Avec `}}</style>` à la fin, le code fait 106 caractères et l'image est la même.
