---
title: "Une règle, deux boîtes : un cadre en pixels en 121 caractères"
ref: 2026-06-24
permalink: /fr/2026/06/24/une-regle-deux-boites/
description: "Comment une seule règle sur html et body dessine deux outlines imbriqués et huit coins en border-image, avec un conic-gradient d'une seule couleur et une découpe si grande qu'il ne reste que les coins, dans la cible CSS Battle du 24 juin 2026."
target: /assets/targets/2026-06-24.png
target_url: https://cssbattle.dev/play/Dk54uDFqfQ9QnaYGzSTO
colors: ["#394257", "#fae29e"]
player: emohdaziz
chars: 121
score: 726.24
match: 100
code: |
  <style>*{background:#394257;outline:32q solid#FAE29E;margin:70 80;border-image:conic-gradient(#FAE29E)200/5ch 32q/74q 64q
---

La cible du 24 juin est un cadre jaune pâle en pixels sur un fond bleu ardoise. Deux cadres imbriqués ont des languettes carrées à leurs coins, et une petite barre sombre est au milieu. Mohamed Ali écrit une seule règle pour tous les éléments. Elle dessine sur html et sur body : chacun reçoit un outline jaune, et un border-image qui ne peint que ses quatre coins.

Utilisez les **Couleurs pédagogiques** pour voir quelle boîte dessine quelle partie.

{% include animations/2026-06-24.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html et body (head et style sont masqués) */
  background: #394257;           /* le fond de html couvre le canevas */
  outline: 32q solid#FAE29E;     /* un cadre jaune de 30px autour de chaque boîte */
  margin: 70 80;                 /* 70px en haut et en bas, 80px à gauche et à droite */
  border-image:
    conic-gradient(#FAE29E)      /* une image jaune unie */
    200 /                        /* découpe : il ne reste que les coins */
    5ch 32q /                    /* coins de 40px de haut, 30,24px de large */
    74q 64q                      /* outset : 69,92px et 60,47px vers l'extérieur */
```

## Comment ça marche

### 1. Une règle, deux boîtes

`*` vise html, head, style et body. head et style sont masqués : la règle dessine donc sur deux boîtes, html, et body à l'intérieur. Tout ce qu'on voit vient en double, à deux tailles.

Le fond de l'élément racine est peint sur tout le canevas. Le canevas est donc #394257 partout.

### 2. Les marges

`margin:70 80` n'a pas d'unité. Les pages de CSS Battle tournent en mode quirks, où un nombre seul est lu en px : 70px en haut et en bas, 80px à gauche et à droite.

En mode quirks, html remplit la hauteur de la page, moins ses marges. body remplit html de la même façon. J'ai mesuré les boîtes :

- html : 400 − 160 = 240px de large, 300 − 140 = 160px de haut, de (80, 70) à (320, 230).
- body : 240 − 160 = 80px de large, 160 − 140 = 20px de haut, de (160, 140) à (240, 160).

### 3. Deux outlines

`outline:32q solid#FAE29E` trace un trait jaune autour de chaque boîte, à l'extérieur. 1q est un quart de millimètre, donc 32q font 30,24px. Chrome calcule l'épaisseur de l'outline à 30px.

- Autour de html : un cadre de (50, 40) à (350, 260).
- Autour de body : un cadre de (130, 110) à (270, 190).

Dans le cadre de body, la boîte de body reste sombre. C'est la petite barre du milieu, 80 × 20.

### 4. Un border-image sans bordure

Il n'y a pas de bordure, mais `border-image` dessine quand même. Ses épaisseurs sont des longueurs, donc l'épaisseur de la bordure, 0 ici, ne joue aucun rôle. L'image est dessinée dans une zone : la boîte, poussée vers l'extérieur par l'outset.

`74q 64q` est l'outset : 69,92px en haut et en bas, 60,47px à gauche et à droite. Pour html, la zone va de (19,53, 0,08) à (380,47, 299,92) : 360,94 × 299,84.

### 5. Rien que les coins

`conic-gradient(#FAE29E)` n'a qu'une couleur. C'est une image jaune unie, de la taille de la zone.

La découpe `200` coupe l'image à 200px de chaque bord. D'habitude, cela donne quatre coins, quatre bords et un milieu. Ici, 200 + 200 = 400 dépasse la largeur, 360,94, et la hauteur, 299,84. Les morceaux se chevauchent, donc les quatre bords sont vides. Le milieu n'est jamais peint sans le mot-clé `fill`. Il ne reste que les quatre coins.

Chaque coin va dans un coin de la zone, à la taille donnée par l'épaisseur `5ch 32q` : 40px de haut (1ch fait 8px dans la police par défaut) et 30,24px de large. Chrome les peint sur des pixels entiers : quatre languettes de 30 × 40, en x = 20 et 350, y = 0 et 260.

### 6. Les coins de body

body reçoit le même border-image. Sa zone va de (99,53, 70,08) à (300,47, 229,92) : 200,94 × 159,84. Là encore, 200 + 200 dépasse les deux côtés : seuls les coins sont dessinés. Ils tombent dans la boîte de html : quatre encoches de 30 × 40 en x = 100 et 270, y = 70 et 190. Elles pendent de l'intérieur du cadre de html, qui s'arrête en y = 70 et 230, et restent à 20px de ses côtés, en x = 80 et 320.

### 7. L'image

J'ai rendu chaque partie seule. Le cadre de html peint 27 600 pixels jaunes, le cadre de body 9 600, et chaque série de quatre coins 4 800. Rien ne se chevauche : 27 600 + 9 600 + 4 800 + 4 800 = 46 800, le nombre de pixels jaunes de la cible.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle dessine tout deux fois. Avec `html{` au lieu de `*{` (124 caractères), le cadre et les coins de body disparaissent, et 14 400 pixels changent.
- `margin:70 80` n'a pas d'unité. `70px 80px` donne la même image en 125 caractères.
- `32q` vaut 30,24px en 3 caractères. `30px` donne la même image en 122 caractères.
- `5ch` vaut 40px en 3 caractères. `40px` donne la même image en 122 caractères.
- `74q 64q` valent 69,92px et 60,47px. `70px 60px` donne la même image en 123 caractères.
- L'épaisseur et l'outset ont besoin d'une unité. Un nombre seul y est un multiple de l'épaisseur de la bordure, qui vaut 0. Avec `5ch 30` (120 caractères), les coins font 0 de large et disparaissent : 9 600 pixels changent. Avec `/74 64` (119 caractères), les coins restent aux coins de chaque boîte, et 11 480 pixels changent.
- La découpe doit seulement dépasser la moitié de la largeur de l'image de html, 180,47. Dans mon rendu, toute découpe à partir de 181 donne la même image. Avec `180`, les morceaux ne couvrent plus la largeur : il reste une fine bande de l'image pour les bords du haut et du bas, étirée en deux barres jaunes de 300 × 40 entre les coins. 24 000 pixels changent.
- `conic-gradient` est le nom de dégradé le plus court pour une image unie. `linear-gradient(#FAE29E)` donne la même image en 122 caractères.
- Pas besoin d'espace entre `solid` et `#FAE29E`. Avec l'espace, la même image prend 122 caractères.
- Rien n'est fermé. `}` à la fin donne la même image en 122 caractères.
