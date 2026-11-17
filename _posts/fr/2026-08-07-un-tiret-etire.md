---
title: "Un tiret étiré : une chaîne penchée en 114 caractères"
ref: 2026-08-07
permalink: /fr/2026/08/07/un-tiret-etire/
description: "Comment une seule bordure tiretée, partagée par html et body, un scale de 5 sur 0,4 et un skew de 15° dessinent la chaîne orange penchée de la cible CSS Battle du 7 août 2026."
target: /assets/targets/2026-08-07.png
target_url: https://cssbattle.dev/play/jXxptfsRY42J9Y775Pc6
colors: ["#ea9a52", "#a82973"]
player: gabriele19
chars: 114
score: 734.95
match: 100
code: |
  <style>*{margin:30%54;*{margin:-22 1;scale:5 .4}border:28q dashed#EA9A52}&{background:#A82973;transform:skew(15deg
---

La cible du 7 août est fuchsia. Une chaîne orange penchée la traverse : quatre blocs inclinés, reliés par de fins ponts. Gabriele la dessine avec une seule bordure tiretée, donnée à html et à body. Sur html, les tirets sont les quatre blocs. Sur body, la bordure dessine trois carrés, et un scale de 5 sur 0,4 fait de celui du milieu la barre qui relie les blocs. Un skew sur html penche le tout.

Cochez **Couleurs pédagogiques** pour distinguer la bordure de html de celle de body, et choisissez la **Vue large** pour voir les deux autres barres de body sortir du canevas.

{% include animations/2026-08-07.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                           /* html, head, body, style */
  margin: 30%54;              /* html : 120px en haut et en bas, 54px sur les côtés */
  * {                         /* head, body, style */
    margin: -22 1;            /* body : 238px de large, 22px au-dessus du contenu de html */
    scale: 5 .4;              /* body : 5 fois plus large, 0,4 fois moins haut */
  }
  border: 28q dashed#EA9A52;  /* html et body : bordure orange tiretée de 26px */
}
& {                           /* html */
  background: #A82973;        /* peint sur tout le canevas */
  transform: skew(15deg       /* penche html, et body avec lui */
```

## Comment ça marche

### 1. Trois sélecteurs

Il n'y a ni balise html, ni head, ni body dans le code : Chrome les ajoute. `*` vise tous les éléments : html, head, body et style. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre, donc head, body et style. head et style ne s'affichent pas : seuls html et body comptent.

Au premier niveau, hors de toute règle, `&` vise l'élément racine, html. J'ai vérifié : html reçoit le fond et la transformation, body ni l'un ni l'autre.

body reçoit deux marges : `margin:30%54` par `*`, et `margin:-22 1` par la règle imbriquée. Les deux règles ont la même spécificité, et la règle imbriquée vient après : elle l'emporte. getComputedStyle donne `-22px 1px` pour body et `120px 54px` pour html.

Il n'y a pas de doctype, donc la page est en mode quirks. Un nombre sans unité, comme `54` ou `-22 1`, est en px.

### 2. Le canevas

`background:#A82973` ne va qu'à html. Quand l'élément racine a un fond, le navigateur le peint sur tout le canevas, et pas seulement dans la boîte de html. Tout le canevas est donc fuchsia, alors que html n'est qu'une boîte de 292 × 60. Sans le fond, 106 938 pixels changent : le canevas devient blanc.

Le fond du canevas ne suit pas la transformation de html : il reste droit et remplit tout.

### 3. html : quatre tirets

`margin:30%54`, c'est 30 % en haut et en bas et 54px sur les côtés. Une marge en pourcentage est une part de la largeur du bloc conteneur, même en haut et en bas : 30 % de 400, c'est 120. html fait 400 − 2 × 54 = 292px de large, de x = 54 à 346, et commence en y = 120.

`border:28q dashed#EA9A52` donne à html une bordure orange tiretée de 26px. 1q vaut un quart de millimètre : 28q = 7mm = 26,457px, et getComputedStyle donne 26px.

J'ai rendu la bordure de html seule, sans body et sans le skew. Dans mon Chrome, chaque tiret fait 2 × 26 = 52px :

- en haut (y = 120 à 146) et en bas (y = 154 à 180), quatre tirets : x = 54, 134, 214 et 294, avec des espaces de 28px ;
- le côté gauche (x = 54 à 80) et le côté droit (x = 320 à 346) sont pleins, sur toute la hauteur.

Au milieu, de y = 146 à 154 et de x = 80 à 320, il reste un trou de 240 × 8 : le contenu de html. Ses 8px de haut viennent de body (section suivante). html fait 26 + 8 + 26 = 60px de haut : getBoundingClientRect donne 292 × 60 avant le skew.

### 4. body : trois carrés

body se place dans le contenu de html. Avec `margin:-22 1`, il fait 240 − 2 × 1 = 238px de large, de x = 81 à 319, et commence 22px au-dessus du contenu de html : y = 146 − 22 = 124.

body reçoit la même bordure tiretée de 26px. Il n'a pas de contenu, donc son contenu fait 0px de haut : ses bordures du haut et du bas se touchent en y = 150. body fait 26 + 0 + 26 = 52px de haut.

J'ai rendu la bordure de body seule. Chaque côté de 238px a trois tirets de 52px, avec des espaces de 41px, et les bordures latérales remplissent les coins. body dessine donc trois carrés de 52 × 52 : x = 81, 174 et 267, de y = 124 à 176.

La boîte de marge de body fait −22 + 52 − 22 = 8px de haut. Ce sont les 8px du contenu de html.

### 5. Étirer et écraser

`scale:5 .4` agrandit body autour de son centre. Le centre de body est (81 + 119 ; 124 + 26) = (200 ; 150). C'est aussi le centre de html, car les deux marges sont les mêmes de chaque côté.

Chaque carré devient large de 52 × 5 = 260px et haut de 52 × 0,4 = 20,8px :

- celui du milieu va de x = 200 + (174 − 200) × 5 = 70 à 330, et de y = 150 − 10,4 = 139,6 à 160,4. Il remplit le trou de 8px de html et, entre les tirets, il dessine trois ponts. Chrome les peint sur les lignes 140 à 159 ;
- les deux autres vont de x = −395 à −135 et de 535 à 795 : hors du canevas. La vue large les montre.

La barre du milieu s'arrête en x = 70 et 330, dans les côtés pleins de html (54 à 80 et 320 à 346). La bande n'a donc pas de trou à ses bouts.

Sans le scale, 4 419 pixels changent : les trois carrés restent au milieu de html.

### 6. La pente

`transform:skew(15deg` va à html, et body suit. getComputedStyle donne `matrix(1, 0, 0.267949, 1, 0, 0)` : chaque point glisse à droite de tan 15° ≈ 0,268 fois sa distance sous le centre.

Le centre est celui de html, (200 ; 150). Le bord du haut, en y = 120, glisse à gauche de 30 × 0,268 ≈ 8px, et le bord du bas, en y = 180, glisse à droite de 8px. Dans la cible, le premier bloc commence en x = 46 sur la ligne 120 et en x = 62 sur la ligne 179.

Sans le skew, 3 051 pixels changent : les blocs restent droits.

## Notes de golf

- Un seul `border:28q dashed#EA9A52` se trouve dans `*` : html et body le reçoivent tous les deux. Sur html, il dessine les blocs. Sur body, il dessine la barre.
- `28q` fait 3 caractères pour une bordure de 26px. `26px` donne le même rendu, en 115 caractères. `27q` donne 25px et `29q` donne 27px : 5 228 et 3 521 pixels changent. Un simple `26` ne marche pas dans le raccourci `border` : Chrome ignore toute la déclaration, et tout l'orange disparaît.
- `30%54` n'a pas besoin d'espace : le `%` termine le nombre. `120 54` donne le même rendu, mais demande l'espace : 115 caractères.
- `margin:-22 1` : le `1` compte. Avec `-22 0`, body fait 240px de large, Chrome dessine quatre tirets par côté au lieu de trois, un espace tombe au milieu de la barre, et 3 285 pixels changent.
- `&` fait 1 caractère pour html. `html{` donne le même rendu, en 117 caractères.
- `dashed#EA9A52` n'a pas besoin d'espace avant le `#`. `.4` se passe du zéro. `skew(` est `skewX(` avec un caractère de moins. Chaque forme longue donne le même rendu, en 115 caractères.
- Une accolade et une parenthèse restent ouvertes, et il n'y a pas de `</style>`. Avec `)}`, le code fait 116 caractères ; avec `)}</style>`, 124. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome, le code officiel ne donne pas une copie exacte de la cible. Les lignes 149 et 150 sont un peu plus sombres entre x = 80 et 319 (par exemple 226, 139, 85 au lieu de 234, 154, 82), et 60 pixels de la ligne 159 aussi. Cela fait 540 pixels sur des aplats, plus 220 sur les bords penchés. Les lignes plus sombres se trouvent là où les bordures du haut et du bas de body se touchent, autour de y = 150. La dernière image de l'animation n'a aucun de ces pixels. Sur le juge de CSS Battle, le code est identique à 100 %.
