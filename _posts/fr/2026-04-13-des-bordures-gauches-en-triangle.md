---
title: "Des bordures gauches en triangle : un signe d'avance rapide en 155 caractères"
ref: 2026-04-13
permalink: /fr/2026/04/13/des-bordures-gauches-en-triangle/
description: "Comment une seule bordure transparente de 100px, au côté gauche orange, donnée à tous les éléments, fait de html et de body deux triangles qui se chevauchent, et comment une seconde bordure fait de deux p des carrés, dans la cible CSS Battle du 13 avril 2026."
target: /assets/targets/2026-04-13.png
target_url: https://cssbattle.dev/play/7b90DYYmO7kr4z13UA79
colors: ["#588a95", "#e8ad6d", "#2f5977"]
player: pindaros
chars: 155
score: 691.3
match: 100
code: |
  <p><p><style>*{background:#588A95;margin:50 55;border:75pt solid#0000;border-left-color:E8AD6D;*{margin:-100-20;*{margin:10-110-250 0;border:59q solid#0257
---

La cible du 13 avril est un signe d'avance rapide sur un canevas bleu-gris : deux triangles orange qui pointent vers la droite et se chevauchent, et deux carrés bleu foncé empilés à droite. Pindaros écrit une seule bordure pour tous les éléments : 100px, transparente, avec un côté gauche orange. Sur une boîte sans hauteur de contenu, ce côté gauche est un triangle. html fait le premier, body le second. Deux p reçoivent une seconde bordure, bleue et translucide, et deviennent les carrés.

Avec **Couleurs pédagogiques**, les côtés transparents de chaque bordure prennent une teinte légère, et chaque boîte sa couleur.

{% include animations/2026-04-13.html lang=page.lang %}

## Le code, aéré

```css
<p><p>                           /* deux p, l'un après l'autre dans body */
<style>
* {                              /* tous les éléments : html, body, les p */
  background: #588A95;           /* sur html : tout le canevas */
  margin: 50 55;                 /* html : 290 × 200 en (55, 50) */
  border: 75pt solid #0000;      /* 100px, transparente */
  border-left-color: E8AD6D;     /* orange, sans # (mode quirks) */
  * {                            /* * * : body et les p */
    margin: -100-20;             /* body : 200 × 200 en (135, 50) */
    * {                          /* * * * : les p */
      margin: 10-110-250 0;      /* 110px de large, le second p remonte */
      border: 59q solid #0257;   /* 55,75px, 55px de large dans mon Chrome ; bleu translucide */
      /* la fin du code ferme les règles */
```

## Comment ça marche

### 1. Trois niveaux de `*`

`*` vise tous les éléments. Imbriqué dedans, `*` vaut `* *` : tout élément placé dans un autre, donc body et les p (et head et style, qui ne s'affichent pas). Un niveau plus bas, `* * *` vise les p. Les trois sélecteurs ont tous une spécificité de 0 : le dernier l'emporte. html garde la première marge, body prend la deuxième, les p la troisième, et les p reçoivent aussi une nouvelle bordure. Tout le reste, le fond et la première bordure, va à tous les éléments.

### 2. html : 290 × 200

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, où les longueurs sans unité dans les marges comptent comme des pixels.

`margin:50 55` donne 50 en haut et en bas, 55 à gauche et à droite. html fait 400 − 55 − 55 = 290px de large. En mode quirks, html s'étire sur la hauteur de la fenêtre, moins ses marges : 300 − 50 − 50 = 200. getBoundingClientRect donne 55, 50, 290 × 200.

`background:#588A95`, posé sur la racine, se peint sur tout le canevas.

### 3. Une bordure transparente de 100px

`border:75pt solid#0000` donne à chaque élément une bordure de 75pt. 1pt vaut 4/3 de px : 75pt font 100px. `#0000` est un noir d'opacité 0 : transparent. Pour html, il reste 290 − 200 = 90px de large pour le contenu, et 200 − 200 = 0 de haut. La boîte de contenu est un trait, de x = 155 à 245, en y = 150.

### 4. Le côté gauche, un triangle

`border-left-color:E8AD6D` n'a pas de `#`. Le mode quirks accepte une couleur hexadécimale sans son `#` pour certaines propriétés, et `border-left-color` en fait partie : getComputedStyle donne rgb(232, 173, 109). Avec `<!doctype html>` devant le code, il donne une bordure gauche transparente.

Là où deux côtés d'une bordure se rejoignent, le navigateur partage le coin en diagonale. Les côtés du haut et du bas de html font 100px de haut, son côté gauche 100px de large, et son contenu 0 de haut. Les deux diagonales partent de (55, 50) et de (55, 250), et se rejoignent en (155, 150). Le côté gauche est un triangle, pointe en (155, 150). Les trois autres côtés restent transparents.

### 5. body, un second triangle

body a la même bordure, et la marge de `* *` : −100 en haut et en bas, −20 à gauche et à droite. Le signe moins commence un nouveau nombre : `-100-20` n'a pas besoin d'espace.

body se place dans le contenu de html : 90px de large à partir de x = 155, 0 de haut en y = 150. Avec −20 de chaque côté, il dispose de 90 + 20 + 20 = 130px pour sa boîte de bordure. Ses bordures en prennent 200 : sa largeur de contenu tombe à 0, et body fait 200px de large, en x = 155 − 20 = 135. En mode quirks, body s'étire sur la hauteur du contenu de html moins ses marges : 0 + 100 + 100 = 200. getBoundingClientRect donne 135, 50, 200 × 200.

Son côté gauche est un second triangle, pointe en (235, 150). body est peint après html : il couvre la pointe du triangle de html, dans le même orange. La cible montre l'écart entre les deux triangles : en y = 120, le premier s'arrête en x = 125, et le second commence en x = 135.

### 6. Deux p faits de bordure

Les p prennent la marge de `* * *`, `10-110-250 0`, et une nouvelle bordure : `border:59q solid#0257`. 1q vaut un quart de millimètre : 59q font 55,75px. Dans mon Chrome, getComputedStyle donne 55px. Ce raccourci remet aussi à zéro la couleur de gauche : les p n'ont pas de côté orange.

Les p se placent dans le contenu de body : 0 × 0, en (235, 150). La marge droite de −110 donne à chaque p 0 − 0 + 110 = 110px pour sa boîte de bordure. Les bordures prennent 55 + 55 = 110 : le contenu fait 0 de large. Le p fait 110px de large et, sans contenu, 110px de haut : un carré fait uniquement de bordure. Le premier commence 10px plus bas, en (235, 160).

### 7. Le second p remonte

Le premier p finit en y = 270. Sa marge du bas, −250, touche la marge du haut du second p, 10. Des marges verticales qui se touchent fusionnent : une marge positive et une négative s'additionnent, 10 − 250 = −240. Le second p commence en 270 − 240 = 30. getBoundingClientRect donne 235, 160 et 235, 30, tous deux en 110 × 110. La cible place ses carrés de x = 235 à 345, de y = 30 à 140 et de y = 160 à 270.

### 8. Un bleu translucide

`#0257` est #002255 avec une opacité de 0x77, soit 119 / 255 = 0,47. Les p ont eux aussi le fond de `*`, #588A95, sous leur bordure. Le bleu se pose dessus : 88 × 0,53 = 47, 34 × 0,47 + 138 × 0,53 = 89, 85 × 0,47 + 149 × 0,53 = 119. Mon rendu montre #2f5977.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule bordure pour tous les éléments fait les deux triangles : html et body n'ont pas besoin d'une règle à eux pour ça.
- L'imbrication est plus courte que trois règles. Avec `}* *{margin:-100-20}* * *{` (161 caractères), l'image est la même.
- `#0000` fait 5 caractères, `transparent` 11, et demande une espace après `solid`. Avec `solid transparent` (162 caractères), l'image est la même.
- `E8AD6D` n'a pas besoin de `#` en mode quirks. Avec `#E8AD6D` (156 caractères), l'image est la même. Sans `border-left-color:E8AD6D;` (130 caractères), il n'y a plus de triangles : 19 780 pixels changent.
- `75pt` fait 4 caractères, `100px` 5. Avec `100px` (156 caractères), l'image est la même.
- `59q` fait 3 caractères, `55px` 4. Avec `55px` (156 caractères), l'image est la même. La valeur compte : avec `58q`, mon Chrome dessine des bordures de 54px, les carrés font 110 × 108 et celui du haut commence en y = 28 : 880 pixels changent. Avec `60q`, il dessine des bordures de 56px, les carrés font 112 × 112 : 1 328 pixels changent.
- `#0257` fait 5 caractères. La couleur pleine qu'il donne ici, `#2F5977`, en fait 7. Avec `#2F5977` (157 caractères), l'image est la même.
- Le mode quirks lit les marges sans unité comme des px. Avec `50px 55px`, `-100px -20px` et `10px -110px -250px 0` (172 caractères), l'image est la même.
- `-100-20` et `10-110-250` n'ont pas besoin d'espaces : chaque moins commence un nouveau nombre. Avec `-100 -20` (156 caractères) ou `10 -110 -250 0` (157 caractères), l'image est la même.
- `<p><p>` n'a pas besoin de balises fermantes, et le code se termine dans les règles : la fin du code les ferme. Avec `}}}` à la fin (158 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire ces lignes), le code officiel dessine les mêmes formes que la cible, avec les mêmes bords. 180 pixels diffèrent de la cible de plus de 8 sur un canal, tous sur les bords inférieurs des deux triangles : un pixel par ligne, 100 sur le second triangle, de (234, 150) à (135, 249), et 80 sur la partie visible du premier, de (134, 170) à (55, 249). Mon Chrome les dessine à moitié orange, en #a09c81, là où la cible a la couleur du canevas. Les bords supérieurs sont identiques. Les carrés sont en #2f5977 dans mon rendu et en #2f5a76 dans la cible, à 1 près. Le juge de CSS Battle donne au code officiel 100 % de ressemblance.
