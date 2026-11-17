---
title: "Des liens couleur de fond : un entonnoir de carrés en 143 caractères"
ref: 2026-07-27
permalink: /fr/2026/07/27/des-liens-couleur-de-fond/
description: "Comment quatre bordures hautes emboîtées dessinent les barres, et quatre liens très hauts, peints du bleu du canevas, les découpent en carrés dans la cible CSS Battle du 27 juillet 2026."
target: /assets/targets/2026-07-27.png
target_url: https://cssbattle.dev/play/9tg5HEQqGWBN3Apa88HN
colors: ["#22d16a", "#3450ae"]
player: selenit
chars: 143
score: 702.36
match: 100
code: |
  <dl><p><a><a><a><a>.''<style>*{margin:80 60;border-top:solid 5vw#22D16A;background:#3450AE;*{margin:20 20 0 30;a{padding:300 5;margin:0 90 0-70
---

La cible du 27 juillet est un entonnoir sur un fond bleu : quatre rangées vertes, chacune plus courte que celle du dessus. Chaque rangée commence par de petits carrés, quatre, puis trois, deux et un, et finit par une barre. Ilya Streltsyn dessine les quatre rangées avec les bordures hautes de quatre éléments emboîtés : html, body, dl et p. Ensuite, quatre liens en ligne, hauts de 638px et peints du même bleu que le canevas, traversent toutes les rangées. Là où ils croisent une barre, ils y font un trou.

Cochez **Couleurs pédagogiques** pour voir les quatre bordures et les liens chacun dans sa couleur, et passez en **Vue large** pour voir les liens dépasser loin au-dessus et au-dessous du canevas.

{% include animations/2026-07-27.html lang=page.lang %}

## Le code, aéré

```css
<dl><p><a><a><a><a>.''           /* body > dl > p > quatre a ; le texte va dans le dernier a */
<style>
* {                              /* tous les éléments : html, head, body, dl, p, les a, style */
  margin: 80 60;                 /* html : x = 60 à 340, à partir de y = 80 */
  border-top: solid 5vw#22D16A;  /* une barre verte de 20px en haut de chaque boîte */
  background: #3450AE;           /* bleu : le canevas (html) et les bandes (les a) */
  * {                            /* head, body, dl, p, les a, style */
    margin: 20 20 0 30;          /* à chaque niveau : 30px vers la droite, 20px de moins à droite, 20px plus bas */
    a {                          /* les quatre a */
      padding: 300 5;            /* 10px de large, 300px au-dessus et au-dessous de la ligne */
      margin: 0 90 0-70          /* -70 + 10 + 90 : un a tous les 30px */
```

## Comment ça marche

### 1. html : la première barre

La balise style n'est jamais fermée : tout ce qui suit `<style>` est du CSS. Il n'y a pas de doctype : la page est en mode quirks. Dans ce mode, un nombre sans unité compte en px dans `margin` et `padding`.

`*` vise tous les éléments, à commencer par html. Son fond, `#3450AE`, est le fond de la racine : il peint tout le canevas en bleu.

`margin:80 60` place la boîte de html de x = 60 à 340, avec son haut en y = 80. html reçoit `border-top:solid 5vw#22D16A`. 1vw fait 4px, donc 5vw = 20px. C'est la barre du haut : 280 × 20, de y = 80 à 100.

### 2. body, dl, p : trois barres de plus

Le `*{` imbriqué vaut `* *` : tout élément placé dans un autre. Ce sont head, body, dl, p, les a et style. head et style sont masqués. body, dl et p sont des blocs, et chacun reçoit aussi la règle extérieure : la même bordure haute de 20px et le même fond bleu.

Chacun prend `margin:20 20 0 30`. Une boîte commence 30px à droite du bord gauche de son parent, finit 20px avant son bord droit, et commence 20px sous la bordure de son parent. Chaque barre est donc 50px plus courte que celle du dessus, et 40px plus bas :

- html : x = 60 à 340, y = 80.
- body : x = 90 à 320, y = 120.
- dl : x = 120 à 300, y = 160.
- p : x = 150 à 280, y = 200.

Les fonds de body, dl et p sont bleus sur du bleu : ils ne se voient pas.

### 3. Les a : quatre bandes très hautes

En HTML, un nouveau `<a>` ferme celui qui est ouvert. `<a><a><a><a>` donne donc quatre liens frères dans p, sans balise fermante.

Les a sont en ligne. `padding:300 5` ajoute 5px de chaque côté, et 300px au-dessus et au-dessous. Le contenu d'un a vide fait 0px de large, donc chaque a fait 10px de large. Sa ligne va de y = 220 à 238 dans p. Avec les 300px de marge intérieure de chaque côté et la bordure haute de 20px, chaque a va de y = −100 à 538 : 638px, bien au-delà du canevas. Sa bordure haute verte, de y = −100 à −80, n'est jamais affichée.

`margin:0 90 0-70` donne −70px à gauche et 90px à droite. D'un a au suivant : −70 + 10 + 90 = 30px. Le contenu de p commence en x = 150, donc le premier a commence en 150 − 70 = 80. Les quatre a commencent en x = 80, 110, 140 et 170.

### 4. .'' : une quatrième bande plus large

Le texte `.''` vient juste avant `<style>` : il tombe dans le quatrième a. Dans mon Chrome, le point fait 4px de large et chaque apostrophe 2,89px : 9,77px en tout.

Le quatrième a fait donc 5 + 9,77 + 5 = 19,77px de large, de x = 170 à 189,77. Dans mon rendu, la première colonne verte après lui est x = 190. Les trois premières bandes laissent des écarts de 10px. Celle-ci laisse un écart de 20px avant la barre.

### 5. Les bandes découpent les barres

Les bordures de html, body, dl et p sont des décors de blocs. Les a sont du contenu en ligne, et le fond d'un élément en ligne est peint après les fonds et les bordures des blocs. Les a sont donc peints par-dessus les barres.

Leur fond est le `#3450AE` du `*` extérieur : le bleu du canevas. Sur le fond bleu, les bandes ne se voient pas. Sur une barre, chaque bande fait un trou : 10px pour les trois premières, environ 20px pour la quatrième.

Il reste des carrés de 20px, espacés de 10px, puis une barre à partir de x = 190 :

- html (60 à 340) : 4 carrés, en x = 60, 90, 120 et 150, puis une barre jusqu'à 340.
- body (90 à 320) : 3 carrés, puis une barre jusqu'à 320.
- dl (120 à 300) : 2 carrés, puis une barre jusqu'à 300.
- p (150 à 280) : 1 carré, puis une barre jusqu'à 280.

## Notes de golf

- Une seule règle imbriquée dessine trois barres. Chaque niveau reçoit la même `margin:20 20 0 30` et la même bordure haute : body, dl et p se décalent tout seuls.
- `background` n'est écrit qu'une fois, dans `*`. Il peint le canevas par html, et les bandes par les a.
- Les valeurs n'ont pas d'unité : la page est en mode quirks. Avec `px` sur chaque valeur non nulle des marges et des marges intérieures, le code fait 161 caractères, 18 de plus, et l'image est la même.
- `5vw` vaut 20px en 3 caractères. `20px` donne la même image en 144 caractères.
- Pas besoin d'espace dans `5vw#22D16A` : le `#` commence un nouveau mot. Dans `0-70`, le signe moins commence un nouveau nombre : `0 -70` donne la même image en 144 caractères.
- `<a><a><a><a>` fait quatre frères sans balise fermante : chaque nouveau `<a>` ferme le précédent.
- `.''` est un texte de 3 caractères qui élargit la dernière bande à environ 20px. Sans lui, le code fait 140 caractères, et 832 pixels changent par rapport à mon rendu du code officiel : les quatre barres commencent en x = 180 au lieu de 190 (4 × 10 × 20 = 800 pixels), et les 32 pixels des glyphes disparaissent.
- `padding:300 5` rend les bandes assez hautes pour traverser les quatre rangées. Avec `padding:0 5`, chaque a n'est pas plus haut que sa ligne, et sa propre bordure haute verte tombe sur la dernière rangée, en y = 200. Les barres ne sont plus découpées, et 3 400 pixels changent.
- `<dl>` est un élément bloc en 4 caractères, et les marges de `*` remplacent ses marges par défaut. Sans lui, il y a une barre de moins, p remonte d'un niveau et commence 30px plus à gauche, et les bandes aussi : 4 064 pixels changent.
- Rien n'est fermé : ni les trois règles, ni la balise style, ni aucune balise HTML. Avec `}}}</style>` à la fin, le code fait 154 caractères et l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, le point et les deux apostrophes apparaissent en petites marques sombres dans la quatrième bande, entre x = 176 et 184 et entre y = 222 et 234. 32 pixels y diffèrent de la cible, et mon script de test juge le rendu faux. Sur le juge de CSS Battle, le code est identique à 100 %.
