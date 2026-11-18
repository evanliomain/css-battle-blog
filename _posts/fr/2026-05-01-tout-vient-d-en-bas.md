---
title: "Tout vient d'en bas : un champignon en 137 caractères"
ref: 2026-05-01
permalink: /fr/2026/05/01/tout-vient-d-en-bas/
description: "Comment html, placé sous le canevas, et body, encore plus bas, dessinent tout un champignon avec une seule liste de quatre ombres, dans la cible CSS Battle du 1er mai 2026."
target: /assets/targets/2026-05-01.png
target_url: https://cssbattle.dev/play/9uxpzCk6QS8kVAha3NmW
colors: ["#3a6430", "#fbfae2", "#7dd8c1", "#a34f50"]
player: beo
chars: 137
score: 708.39
match: 100
code: |
  <style>*{margin:75%0-1338;box-shadow:0-53q#3A6430,0-4in 0-180q#FBFAE2,0-5in#7DD8C1,0-9in#A34F50;*{border-radius:9in 9in 0 0;margin:614 90
---

La cible du 1er mai est un champignon sur un fond sarcelle clair : un demi-disque rouge sombre pour le chapeau, un pied crème, et une bande de sol vert sombre en bas. Beo place html tout entier sous le canevas, et body encore plus bas. Rien n'a de fond. Tout ce qu'on voit est une ombre qui monte de là : les copies de html font le fond, le pied et le sol, et la copie de body fait le chapeau.

**Vue large** montre où sont vraiment html et body. Avec **Couleurs pédagogiques**, les copies de body prennent leur propre couleur.

{% include animations/2026-05-01.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, head, style, body */
  margin: 75%0-1338;             /* html : 300 en haut, 0 sur les côtés, -1338 en bas */
  box-shadow:
    0-53q#3A6430,                /* vert, 50,08px plus haut : le sol */
    0-4in 0-180q#FBFAE2,         /* crème, 170,08px plus petit de chaque côté, 384px plus haut : le pied */
    0-5in#7DD8C1,                /* sarcelle, 480px plus haut : le fond */
    0-9in#A34F50;                /* rouge, 864px plus haut : sur body, le chapeau */
  * {                            /* head, style, body */
    border-radius: 9in 9in 0 0;  /* réduit à 110px : un demi-disque */
    margin: 614 90               /* body : 220 × 110 en (90, 914) */
  /* la fin du code ferme les deux règles */
```

## Comment ça marche

### 1. Deux boîtes, une règle

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre nu comme `614` dans une marge se lit en px.

Le `<style>` va dans head, et body reste vide. `*` vise html, head, style et body. Le `*{` imbriqué vise tout élément placé dans un autre : head, style et body. head et style ne s'affichent pas. Il reste deux boîtes : html et body. Les deux reçoivent la marge et la liste d'ombres du premier niveau. La seconde marge de body remplace la première.

### 2. html, sous le canevas

html reçoit `margin:75%0-1338`. Un pourcentage de marge se calcule sur la largeur du bloc conteneur, même pour la marge du haut : 75 % de 400 = 300. Le `%` termine le premier nombre, et le `-` en commence un nouveau : les trois valeurs n'ont pas besoin d'espace. 300 en haut, 0 sur les côtés, −1338 en bas.

En mode quirks, html remplit la page moins ses marges. Il fait 400 de large et 300 − 300 + 1338 = 1338 de haut, en y = 300 : il commence au bord bas du canevas. Pas un seul de ses pixels n'est sur le canevas.

### 3. Quatre copies, peintes à l'envers

Une ombre sans flou est une copie de la boîte, décalée. Les quatre ombres ne font que monter : 53q, 4in, 5in et 9in. 1Q vaut un quart de millimètre, 0,945px : 53q = 50,08px. 1in = 96px : 4in = 384px, 5in = 480px, 9in = 864px.

La première ombre de la liste est peinte au-dessus, la dernière tout en bas. La copie rouge, la plus basse, va de y = 300 − 864 = −564 à 774. La copie sarcelle, au-dessus, va de −180 à 1158. Les deux couvrent tout le canevas. Sur le canevas, la sarcelle cache entièrement la rouge : l'ombre rouge de html ne se voit nulle part. La copie sarcelle est le fond de l'image.

### 4. Le pied : un étalement négatif

La deuxième ombre est `0-4in 0-180q` : pas de décalage de côté, 4in vers le haut, un flou de 0 et un étalement de −180q = −170,08px. Un étalement négatif réduit la copie de chaque côté. Elle fait 400 − 2 × 170,08 = 59,84 de large, de x = 170,08 à 229,92. Son haut descend en 300 + 170,08 = 470,08, puis monte de 384px : y = 86,08.

Le haut du pied est bien au-dessus du bord bas du chapeau, en y = 160. Le chapeau le cache (voir la section 7).

### 5. Le sol

La première ombre est la verte, montée de 53q = 50,08px. Son haut est en y = 300 − 50,08 = 249,92, et elle descend au-delà du canevas. Elle est peinte au-dessus des autres copies : elle couvre le bas du pied. La cible a le sol à partir de y = 250.

### 6. body, un demi-disque tout en bas

Le `*` imbriqué donne à body `margin:614 90`. En mode quirks, body remplit la hauteur de html moins ses marges : 1338 − 2 × 614 = 110 de haut. Il fait 400 − 2 × 90 = 220 de large, en (90, 300 + 614) = (90, 914).

`border-radius:9in 9in 0 0` demande 864px aux deux coins du haut et 0 à ceux du bas. Quand des rayons dépassent la longueur d'un côté, ils sont tous réduits du même facteur, jusqu'à ce qu'ils tiennent. Sur le côté du haut, 864 + 864 = 1728 pour 220px. Sur les côtés gauche et droit, 864 + 0 = 864 pour 110px. Les deux donnent le même facteur, 220 / 1728 = 110 / 864 : chaque rayon du haut devient 110px. 110, c'est la moitié de la largeur et toute la hauteur : body est un demi-disque. Dans mon Chrome, `110px 110px 0 0` (141 caractères) donne exactement la même image.

### 7. Les copies de body : le chapeau

Le premier `*` vise aussi body : il a la même liste d'ombres. Une ombre suit les coins arrondis de sa boîte : ses copies sont aussi des demi-disques.

La copie rouge monte de 864px : 914 − 864 = 50. Elle va de y = 50 à 160 et de x = 90 à 310 : c'est le chapeau, là où la cible l'a. body est peint après html et ses ombres : le chapeau couvre le haut du pied.

Les autres copies de body ne se voient pas. La sarcelle tombe en y = 914 − 480 = 434 et la verte en 914 − 50,08 = 863,92, toutes deux sous le canevas. La crème rétrécit de 170,08px de chaque côté : 220 − 340,16 est plus petit que 0, il ne reste rien à peindre.

Voilà pourquoi les nombres s'emboîtent. 614 et −1338 donnent à body une hauteur de 110, et le placent en y = 914, juste 864px, soit 9in, sous le chapeau.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste pour deux boîtes. html se sert des ombres verte, crème et sarcelle, body de la rouge. La copie rouge de html reste sous la sarcelle, et les autres copies de body tombent sous le canevas ou disparaissent.
- Le fond est lui aussi une ombre. `,0-5in#7DD8C1` fait 13 caractères, et `background:#7DD8C1;` en fait 19. Elle a aussi un second rôle. Avec `;background:#7DD8C1` après la liste d'ombres à la place (143 caractères), la copie rouge de html est peinte par-dessus le fond du canevas : tout est rouge sauf le pied et le sol, et 75 960 pixels changent.
- L'ordre de la liste compte. Avec l'ombre sarcelle en premier, `0-5in#7DD8C1,0-53q#3A6430,0-4in 0-180q#FBFAE2,0-9in#A34F50` (137 caractères, la même longueur), la copie sarcelle couvre le pied et le sol, il ne reste que le chapeau, et 25 740 pixels changent.
- `75%0` n'a pas besoin d'espace : le `%` termine le nombre. Avec `300 0` (138 caractères), l'image est la même.
- `-53q` fait 4 caractères pour 50,08px. Avec `-50px` (138 caractères), le haut du sol descend de 0,08px, et les 400 pixels de la ligne 249 changent.
- `-180q` fait 5 caractères pour 170,08px. Avec `-170px` (138 caractères), le pied fait 60px de large au lieu de 59,84, et 180 pixels changent, sur ses deux bords.
- Le flou `0` est nécessaire : l'étalement vient après le flou. Avec `0-4in -180q` (136 caractères), −180q est lu comme le flou, qui ne peut pas être négatif : mon Chrome rejette toute la liste. Le canevas reste blanc, et les 120 000 pixels changent. Avec `0-4in-180q` (135 caractères), c'est pareil.
- `9in 9in 0 0` garde les coins du bas carrés. Avec `border-radius:9in` (129 caractères), les quatre coins sont arrondis : les rayons tombent à 55px, le chapeau devient une pilule, et 5 153 pixels changent. Avec `50%50%0 0` (135 caractères), chaque rayon du haut fait 110px de large et 55px de haut : le chapeau a des côtés droits et un haut plus plat, et 2 886 pixels changent.
- N'importe quel grand rayon convient, puisqu'il est de toute façon réduit à 110px. Avec `2in 2in 0 0` (137 caractères, la même longueur), l'image est la même.
- Pas besoin d'espace avant `#` : `0-53q#3A6430`. Avec une espace avant chacune des quatre couleurs (141 caractères), l'image est la même.
- Le `*` imbriqué atteint body en 1 caractère. Avec `body{` (140 caractères), l'image est la même.
- Des nombres nus dans les marges, grâce au mode quirks. Avec `300px 0 -1338px` et `614px 90px` (147 caractères), l'image est la même. Avec un doctype devant (152 caractères), mon Chrome rejette les marges : html fait 400 × 8 en haut, ses copies montent toutes hors du canevas, le canevas reste blanc, et les 120 000 pixels changent.
- Le code finit à l'intérieur de deux règles : la fin du code les ferme. Avec `}}` à la fin (139 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome local (version 157 au moment d'écrire), le code officiel est proche mais pas exact au pixel : 891 pixels s'écartent de la cible de plus de 8 sur une composante. 578 d'entre eux sont sur des bords droits. Le haut du sol est en y = 249,92, là où la cible a 250, et les côtés du pied en x = 170,08 et 229,92, là où la cible a 170 et 230. Dans une copie de test avec `-50px` et `-170px` (139 caractères), ces 578 pixels sont identiques à la cible.

Les 313 autres pixels sont sur le bord courbe du chapeau. Une page de test avec seulement un demi-disque rouge uni de rayon 110 au même endroit, dessiné comme un fond et pas comme une ombre, diffère de la cible sur les mêmes 313 pixels. L'écart vient donc de la façon dont le bord courbe lui-même est dessiné, pas de l'ombre. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
