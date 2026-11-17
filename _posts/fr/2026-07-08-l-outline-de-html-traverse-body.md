---
title: "L'outline de html traverse body : une table en 104 caractères"
ref: 2026-07-08
permalink: /fr/2026/07/08/l-outline-de-html-traverse-body/
description: "Comment des marges en pourcentage centrent html, comment un seul outline de 11q encadre la barre verte de body et donne à html deux longs pieds, et comment l'outline de html, peint par-dessus body, coupe la barre de deux séparations, dans la cible CSS Battle du 8 juillet 2026."
target: /assets/targets/2026-07-08.png
target_url: https://cssbattle.dev/play/3XH4lVrpfDgTcrxgYXt5
colors: ["#4c4c6b", "#fae29e", "#4a9a86"]
player: levito
chars: 104
score: 748.45
match: 100
code: |
  <style>*{margin:25%25%0;outline:11q solid#4C4C6B;background:#FAE29E;*{margin:0-35 160;background:#4A9A86
---

La cible du 8 juillet ressemble à une table : une barre verte avec un cadre sombre, sur deux pieds fins qui descendent jusqu'en bas du canevas, sur un fond crème. Deux séparations sombres coupent la barre. Veit Lehmann la dessine avec deux boîtes et un seul outline. html est un carré de 200 × 200 : son outline fait les pieds. body est la barre verte : son outline fait le cadre. L'outline de html est peint par-dessus body, donc les pieds traversent la barre : ce sont les séparations.

Cochez **Couleurs pédagogiques** pour voir l'outline de html en orange, celui de body en bleu et body en violet, et passez en **Vue large** pour voir le bas de l'outline de html sous le canevas.

{% include animations/2026-07-08.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* html, head, style, body */
  margin: 25%25%0;           /* 100px en haut, à gauche et à droite, 0 en bas */
  outline: 11q solid#4C4C6B; /* 10,39px, dessiné sur 10px, hors de la boîte */
  background: #FAE29E;       /* crème : celui de html va au canevas */
  * {                        /* * * : head, style, body */
    margin: 0-35 160;        /* 0 en haut, -35 à gauche et à droite, 160 en bas */
    background: #4A9A86      /* body est vert */
```

## Comment ça marche

### 1. Deux règles, dont une imbriquée

Il n'y a pas de doctype : la page est en mode quirks, et les nombres sans unité sont des px. La page contient html, head, le style et body. head et le style ne sont pas affichés.

Le premier `*` les vise tous. Le second `*` est imbriqué dedans, il veut donc dire `* *` : tout élément placé dans un autre. Ce sont head, le style et body, mais pas html. Les deux sélecteurs ne pèsent rien, et la règle imbriquée vient après : elle gagne pour `margin` et `background`. Elle ne dit rien de `outline`, donc body garde l'outline de la première règle. html ne reçoit que la première.

### 2. html, un carré de 200 × 200

Une marge en pourcentage est une part de la largeur du bloc conteneur, même en haut et en bas. Pour html, c'est le canevas de 400px : `25%` vaut 100px. `margin:25%25%0` donne 100px en haut, 100px à gauche et à droite, et 0 en bas.

html fait 400 − 200 = 200px de large. En mode quirks, html remplit la hauteur de la page moins ses marges : 300 − 100 − 0 = 200px. getBoundingClientRect donne (100, 100), 200 × 200.

Le fond de html, `#FAE29E`, va à tout le canevas : c'est le crème.

### 3. L'outline : 11q, dessiné sur 10px

`q` est un quart de millimètre ; les unités ignorent la casse, donc `11q` vaut `11Q`. 1Q fait 0,945px : 11q fait 10,39px. getComputedStyle donne `10px` pour la largeur de l'outline : Chrome l'arrondit au pixel entier inférieur.

Un outline ne prend pas de place et se dessine hors de la boîte. Autour de html, il va de x = 90 à 310 et de y = 90 à 310. Ses côtés gauche et droit sont les pieds, de x = 90 à 100 et de x = 300 à 310. Son côté du bas, de y = 300 à 310, est hors du canevas.

### 4. body, la barre

body prend `margin:0-35 160`. Des marges latérales négatives le rendent plus large que html : 200 + 2 × 35 = 270px, de x = 65 à 335. En mode quirks, body remplit la hauteur de html moins ses marges : 200 − 0 − 160 = 40px. getBoundingClientRect donne (65, 100), 270 × 40. Il est peint en vert.

body a le même outline de 10px. Il encadre la barre de x = 55 à 345 et de y = 90 à 150. Son côté du haut se pose sur celui de html, à la même hauteur, de y = 90 à 100.

### 5. L'outline de html par-dessus body

Dans mon Chrome, l'outline de html est peint après body : par-dessus son fond vert, et par-dessus son outline aussi. Je l'ai vérifié en peignant l'outline de html en rouge et celui de body en bleu : les pixels en (95, 120), dans la barre, et en (200, 95), sur le bord du haut, sortent rouges. Quand je mets body dans son propre calque au-dessus de html (`position:relative;z-index:1`), le vert couvre les pieds : 800 pixels changent, les deux séparations de 10 × 40.

Les pieds partent donc de y = 90 et descendent sous le bas du canevas, en traversant la barre au passage. Dans mon rendu, la rangée y = 120 est sombre de x = 55 à 64, de 90 à 99, de 300 à 309 et de 335 à 344, et verte entre les deux. L'image compte 99 600 pixels crème, 10 400 sombres et 10 000 verts.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul outline fait trois choses : le cadre de la barre, les pieds et les séparations. `border` à la place (103 caractères) casse tout : une bordure prend de la place dans la boîte. Les pieds de html rentrent de 10px, et body ne fait plus que 20px de haut, tout en bordure, sans vert. 24 600 pixels changent.
- `25%25%0` fait 100px, 100px et 0 en 7 caractères : pas besoin d'espace après un `%`. `100 100 0` donne la même image en 106.
- `11q` est un outline de 10px en 3 caractères. `10px` donne la même image en 105. `10q` (9,45px, dessiné sur 9px) change 1 058 pixels, et `12q` (11,34px, dessiné sur 11px) en change 1 062.
- Un nombre sans unité ne marche pas ici : avec `outline:10 solid#4C4C6B` (103 caractères), mon Chrome rejette toute la déclaration. Le cadre, les pieds et les séparations disparaissent : 10 400 pixels changent.
- `160` garde body à 40px de haut. Avec `margin:0-35` (100 caractères), body remplit les 200px de html : le vert descend jusqu'en bas du canevas, et 43 000 pixels changent.
- Imbriquer la seconde règle coûte `;*{`. L'écrire à part, `}* *{`, donne la même image en 106 caractères.
- `0-35` : le signe moins termine le `0`, pas besoin d'espace. Pareil pour `solid#4C4C6B`, sans espace avant le `#`.
- Rien n'est fermé. `}}</style>` à la fin donne 114 caractères, pour la même image.
