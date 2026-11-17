---
title: "Une ellipse, deux moitiés : deux cercles coupés en 112 caractères"
ref: 2026-07-16
permalink: /fr/2026/07/16/une-ellipse-deux-moities/
description: "Comment une seule border-image en radial-gradient, découpée à 276px de chaque côté et serrée dans les deux moitiés du canevas, fait d'une ellipse deux cercles coupés, alors que 16ex vaut 0 sur body et a, dans la cible CSS Battle du 16 juillet 2026."
target: /assets/targets/2026-07-16.png
target_url: https://cssbattle.dev/play/ZHdqz6FmXWrev0SARB8I
colors: ["#742020", "#af6a89"]
player: selenit
chars: 112
score: 737.55
match: 100
code: |
  <a><style>&,a{padding:117 50 117 7em}*{*{font:0 a}border-image:4 276/3%50%radial-gradient(#742020 16ex,#AF6A8A 0
---

La cible du 16 juillet montre deux cercles rouge sombre sur un fond rose. Celui de gauche est coupé par une fente verticale, celui de droite par une barre horizontale, et ils se rejoignent dans une encoche en V. Ilya Streltsyn la dessine avec une seule border-image. Sur html, son dégradé est une seule ellipse : la découpe la coupe en deux parts qui se chevauchent, et les largeurs serrent chaque part dans une moitié du canevas, où elle devient un cercle. Sur body et a, le même `16ex` vaut 0 : la même border-image n'y peint que des boîtes roses, la barre et la fente.

Cochez **Couleurs pédagogiques** pour distinguer les deux moitiés, body et a.

{% include animations/2026-07-16.html lang=page.lang %}

## Le code, aéré

```css
<a><style>
&, a {                               /* & au premier niveau, c'est html */
  padding: 117 50 117 7em            /* 7em : 112px sur html, 0 sur a */
}
* {                                  /* html, head, body, a et style */
  * {                                /* * * : tout ce qui est dans html, pas html */
    font: 0 a                        /* taille de police 0 ; « a » est la famille */
  }
  border-image:
    4 276 /                          /* découpe : 4 en haut et en bas, 276 à gauche et à droite */
    3% 50%                           /* largeur : 9px et 200px sur html */
    radial-gradient(#742020 16ex, #AF6A8A 0
                                     /* 16ex : 114,875px sur html, 0 sur body et a */
```

## Comment ça marche

### 1. html et body

Pas de doctype : la page est en mode quirks. `<a>` ouvre body, et la balise style se retrouve dans a. Elle n'est jamais fermée : tout ce qui la suit est du CSS.

Au premier niveau du CSS, `&` désigne la racine : html. `&,a` donne à html et à a `padding:117 50 117 7em`. Un nombre sans unité compte en px en mode quirks. La police de html fait 16px : 7em font 112px.

En mode quirks, html remplit le canevas : 400 × 300. Avec son padding, sa zone de contenu va de (112, 117) à (350, 183), 238 × 66. body garde ses marges de 8px et remplit cette zone : getBoundingClientRect donne (120, 125), 222 × 50.

### 2. a : une boîte vide de 50 × 234

Le `*{font:0 a}` imbriqué n'a pas de `&` : il vaut `* *`, tout ce qui est dans html. C'est head, body, a et la balise style, pas html. Leur taille de police passe à 0. Le raccourci `font` exige une famille : `a` en est une.

Sur a, 7em vaut donc 0 : son padding est 117 50 117 0. a est en ligne, et son seul enfant, la balise style, n'est pas affiché. Sa boîte de contenu est vide, en (120, 125). Le padding l'élargit de 50 et l'étire de 117 en haut et en bas : getBoundingClientRect donne (120, 8), 50 × 234.

Aucune de ces boîtes n'a de fond. Seule la border-image peint.

### 3. L'image de html : une ellipse sombre

`*` donne à tous les éléments la même border-image. Son image est `radial-gradient(#742020 16ex,#AF6A8A 0)`.

Un dégradé n'a pas de taille propre. Dans une border-image, il prend la taille de la boîte de bordure de l'élément : 400 × 300 sur html. La forme par défaut est une ellipse qui atteint le coin le plus éloigné. Ses rayons gardent le rapport 4:3 de la boîte.

ex est la hauteur des minuscules de la police. La police de html fait 16px, et Chrome calcule 16ex à 114,875px. Un arrêt de couleur se mesure sur le rayon horizontal : l'ellipse sombre fait 114,875 × 86,16 (× 0,75), centrée en (200, 150). L'arrêt rose à 0 est ramené sur l'arrêt précédent : le bord est net.

### 4. Découpe : 4 276

`4 276` est le border-image-slice : 4px depuis le haut et le bas de l'image, 276px depuis la gauche et la droite.

276 + 276 = 552, plus que les 400px de l'image. La part gauche (x 0 → 276) et la part droite (x 124 → 400) se chevauchent. Dans ce cas, les bords haut et bas et le milieu sont vides. Il reste les quatre coins, le bord gauche (x 0 → 276, y 4 → 296) et le bord droit (x 124 → 400). Chaque bord garde le centre de l'ellipse, en x = 200, et 76px au-delà.

### 5. Largeurs : 3% 50%

`3%50%` est le border-image-width. En %, il se calcule sur la boîte de bordure : 3 % de 300 = 9px en haut et en bas, 50 % de 400 = 200px à gauche et à droite. Aucune bordure n'est posée : ces largeurs suffisent à donner les zones où l'image est peinte.

Le bord gauche de l'image, 276 × 292, est étiré dans x 0 → 200, y 9 → 291 :

- × 200/276 = 0,7246 en largeur : le rayon horizontal fait 114,875 × 0,7246 = 83,24px ;
- × 282/292 = 0,9658 en hauteur : le rayon vertical fait 86,16 × 0,9658 = 83,21px.

L'ellipse devient un cercle de 83,2px de rayon, centré en x = 200 × 0,7246 = 144,93 et y = 150. La part s'arrête 76px après le centre : 76 × 0,7246 = 55,07px, donc le cercle est coupé en x = 200. Le bord droit en est le miroir : un cercle centré en x = 255,07, coupé en x = 200.

En x = 200, les deux cercles font 124,8px de haut, de y = 87,6 à 212,4. Au-dessus et en dessous, leurs contours remontent : c'est l'encoche en V. Les coins et le reste des bords sont roses : le fond.

### 6. body et a : 16ex vaut 0

body et a ont la même border-image. Mais leur police fait 0 : 16ex vaut 0, et tout le dégradé est rose.

Leurs largeurs font 50 % à gauche et 50 % à droite : les coins et les bords latéraux couvrent toute la boîte. body peint donc une barre rose de 222 × 50 en (120, 125), en travers du cercle de droite. a, peint après, peint une boîte rose de 50 × 234 en (120, 8). Elle coupe le cercle de gauche en x = 120 et garde la fente jusqu'à x = 170.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- `16ex` sert deux fois : 114,875px sur html, 0 sur body et a. `115px` fait un caractère de plus (113), et vaut 115px sur tous les éléments : a devient une barre sombre de y = 8 à 242, et la barre de body devient presque toute sombre. 19 350 pixels changent.
- `7em` sert deux fois aussi : 112px sur html, 0 sur a. `112` a la même longueur, mais il ajoute aussi un padding à gauche de a : a passe à 162px, de x = 120 à 282, et cache presque tout le cercle de droite. 11 590 pixels changent.
- `4` et `3%` ne sont pas là pour rien. Ils resserrent l'image en hauteur de 282/292, et c'est ce qui fait de l'ellipse 4:3 un cercle. `0 276/0 50%`, de même longueur, garde toute la hauteur : les cercles font 86,16px de rayon vertical au lieu de 83,21px. En x = 255, celui de droite va de y = 64 à 235 au lieu de 67 à 232, et 1 068 pixels changent.
- Une seule règle `*` donne la border-image à html, body et a. Le `*{font:0 a}` imbriqué règle la police des deux autres en 11 caractères. `font-size:0` à sa place donne 115 caractères, pour la même image.
- `&` vaut html au premier niveau du CSS. `html,a` prend 115 caractères, pour la même image.
- `<a>` donne une troisième boîte en 3 caractères. Sans lui (109 caractères), rien ne creuse la fente : 5 694 pixels changent.
- `3%50%` : le `%` termine le nombre, pas besoin d'espace. `3% 50%` prend 113 caractères, pour la même image.
- Des nombres sans unité dans `padding` : `117px 50px 117px 7em` donne 118 caractères, pour la même image.
- Rien n'est fermé. Fermer le dégradé, les deux règles et la balise style avec `)}}</style>` donne 123 caractères, 11 de plus, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel n'est pas exact au pixel près. Ses cercles sont plus petits que ceux de la cible. En y = 150, celui de gauche commence en x = 62 dans mon rendu, en x = 60 dans la cible. En x = 255, celui de droite va de y = 67 à 232 dans mon rendu, de y = 65 à 234 dans la cible. Mon rendu a aussi des bords francs, avec ses deux seules couleurs, et son rose est #af6a8a là où la cible a #af6a89. 2 807 pixels s'écartent de la cible de plus de 8 sur un canal, jusqu'à 130.

La taille des cercles vient de 16ex, et ex dépend de la police : dans mon Chrome, 16ex fait 114,875px sur html. Avec `7.34375em` à sa place (117,5px sur html, toujours 0 sur body et a), les cercles prennent la taille de ceux de la cible, et il reste 2 309 pixels. 670 d'entre eux sont sur les bords de la barre, où les couleurs de la cible dérivent jusqu'à 12 ; les autres sont le long des courbes. Le juge de CSS Battle donne au code 100 % de correspondance.
