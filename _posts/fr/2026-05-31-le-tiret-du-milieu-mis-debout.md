---
title: "Le tiret du milieu, mis debout : deux poutres en I en 107 caractères"
ref: 2026-05-31
permalink: /fr/2026/05/31/le-tiret-du-milieu-mis-debout/
description: "Comment deux bordures en tirets, l'une sur html et l'autre sur un body tourné d'un quart de tour et étiré trois fois, dessinent une rangée de tirets crème et deux I sur un fond bleu-gris, dans la cible CSS Battle du 31 mai 2026."
target: /assets/targets/2026-05-31.png
target_url: https://cssbattle.dev/play/TKhAUkfLs0mTIaeLqpH2
colors: ["#f4dcbf", "#556d7f"]
player: emohdaziz
chars: 107
score: 744.26
match: 100
code: |
  <style>*{border-block:32Q dashed#F4DCBF;margin:50 10;*{background:#556d7f;margin:-25;rotate:90deg;scale:3 1
---

La cible du 31 mai montre deux rangées de cinq tirets crème sur un fond bleu-gris, une en haut et une en bas. La deuxième et la quatrième colonne sont reliées par une barre verticale : cela fait deux I. Mohamed Ali dessine les rangées avec une bordure en tirets sur html. body reçoit la même bordure, tourne d'un quart de tour et s'étire trois fois : le tiret du milieu de chacune de ses bordures devient une barre.

Utilisez la **Vue large** pour voir les autres tirets de body partir hors du canevas, en haut et en bas.

{% include animations/2026-05-31.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html, head, body, style */
  border-block: 32Q dashed#F4DCBF; /* des tirets en haut et en bas, 30px d'épaisseur */
  margin: 50 10;                   /* html : 380 × 200 en (10, 50) */
  * {                              /* * * : head, body, style (pas html) */
    background: #556d7f;           /* passe au canevas */
    margin: -25;                   /* body : 430 × 190 en (−15, 55) */
    rotate: 90deg;                 /* ses bordures deviennent des barres verticales */
    scale: 3 1                     /* le tiret du milieu : de 60 à 180px */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `50` est lu en px.

La page a html, head, body et style. head et style ne sont pas affichés. `*` vise les quatre : html et body reçoivent tous les deux la bordure en tirets et une marge. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre. Ce sont head, body et style, mais pas html. Le fond, la seconde marge, la rotation et l'étirement ne vont donc qu'à body. Son `margin:-25` remplace la première marge.

### 2. Les tirets de html

`margin:50 10` place html en (10, 50). En mode quirks, html remplit la page moins ses marges : 400 − 20 = 380 de large, 300 − 100 = 200 de haut. Je l'ai mesuré : 380 × 200, en (10, 50).

`border-block` règle seulement les bordures du haut et du bas. 32Q font 30,24px, et Chrome dessine la bordure sur 30px. Dans mon Chrome, un tiret fait deux fois l'épaisseur de la bordure : 60px. Le côté de 380px contient cinq tirets et quatre écarts de 20px : 5 × 60 + 4 × 20 = 380. Les tirets commencent en x = 10, 90, 170, 250 et 330. La rangée du haut va de y = 50 à 80, celle du bas de 220 à 250.

### 3. Un fond pour le canevas

body reçoit `background:#556d7f`. html n'a pas de fond. Dans ce cas, le navigateur prend le fond de body et le peint sur tout le canevas. La boîte de body, elle, ne peint alors aucun fond.

C'est la clé : body peut tourner et s'étirer, sa boîte reste transparente. Seules ses bordures se voient.

### 4. La boîte de body

En mode quirks, body remplit la boîte de contenu de html moins ses propres marges. Le contenu de html fait 380 × 140 (200 moins les deux bordures de 30px). Avec `margin:-25`, body déborde de 25px de chaque côté : 430 × 190, en (−15, 55).

body a lui aussi les bordures en tirets, de 30px d'épaisseur. Les tirets font toujours 60px, mais le côté fait 430px : cinq tirets, et quatre écarts de 32,5px (5 × 60 + 4 × 32,5 = 430). Le tiret du milieu va de x = 170 à 230, centré sur le canevas.

### 5. Un quart de tour

`rotate:90deg` tourne body autour de son centre. C'est le point (215, 95) de sa boîte, donc (200, 150) sur le canevas : le centre du canevas.

Les bordures étaient horizontales, épaisses de 30px, à 80px du centre. Après la rotation, ce sont des barres verticales : la bordure du bas va de x = 105 à 135, celle du haut de 265 à 295. Les deuxième et quatrième tirets de html sont centrés en x = 120 et 280 : les barres tombent pile en leur milieu. C'est ce que donnent les 190px de haut de body.

### 6. Trois fois plus long

`scale:3 1` étire body trois fois dans sa propre largeur et ne touche pas sa hauteur. Après la rotation, cette largeur est verticale. Le navigateur applique l'échelle dans les axes de body : l'image est la même que si la boîte tournée était étirée en hauteur. Elle fait alors 190 × 1290, de y = −495 à 795.

Le tiret du milieu passe de 60 à 180px, autour du centre : de y = 60 à 240. Les tirets de html finissent en y = 80 et commencent en 220 : la barre entre de 20px dans chacun d'eux. Même couleur : la barre et les deux tirets forment un seul I.

Les tirets suivants s'allongent aussi, et les écarts avec eux : ils vont de y = −217,5 à −37,5 et de 337,5 à 517,5, hors du canevas. Seul le tiret du milieu de chaque bordure se voit donc.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Le fond est dans la règle imbriquée, sur body seulement. html n'en a pas : celui de body passe au canevas, et la boîte de body reste transparente. Avec `background:#556d7f` dans la règle extérieure (toujours 107 caractères), html reçoit le fond, et body peint donc le sien sur sa boîte tournée. Il cache les tirets de html entre x = 135 et 265 : 6 600 pixels changent.
- `border-block` ne dessine que les bordures du haut et du bas. `border:` est plus court de 6 caractères (101 caractères), mais il ajoute des bordures en tirets à gauche et à droite de html et de body : 8 160 pixels changent.
- `32Q` vaut 30,24px, et Chrome dessine une bordure de 30px : 3 caractères. `30px` donne la même image en 108 caractères. La casse ne coûte rien : `32q` donne la même image.
- Pas d'espace avant le `#` : `dashed #F4DCBF` donne la même image en 108 caractères.
- Une seule valeur, `-25`, règle à la fois la largeur de body (430) et sa hauteur (190). La hauteur place les barres au milieu des tirets de html. Avec `-20` ou `-30` (même longueur), les barres s'écartent de 5px du milieu : 2 800 pixels changent.
- `3` est le seul facteur à un chiffre qui marche dans `scale:3 1`. Avec `2`, les barres font 120px de haut : un trou de 10px apparaît à chaque bout, et les tirets suivants entrent en haut et en bas du canevas. 4 200 pixels changent. Avec `4`, les barres font 240px de haut et dépassent de 20px au-dessus et en dessous des tirets de html : 2 400 pixels changent. `2.4` donne la même image en 109 caractères.
- Le `1` de `scale:3 1` garde la hauteur de body. Avec `scale:3` (105 caractères), body grandit dans les deux sens : les barres partent vers les bords du canevas, et il n'en reste que de fines bandes, de x = 0 à 4 et de 395 à 399. 10 200 pixels changent.
- Des nombres seuls : `50px 10px` et `-25px` donnent la même image en 113 caractères.
- L'imbrication garde le fond et les transformations loin de html. `body{` à la place du `*{` intérieur donne la même image en 110 caractères.
- Le code s'arrête après `scale:3 1`. La fin du code ferme les deux règles. Ajouter `}}` donne la même image en 109 caractères.
