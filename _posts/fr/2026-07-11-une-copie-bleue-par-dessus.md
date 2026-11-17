---
title: "Une copie bleue par-dessus : un 11 en 124 caractères"
ref: 2026-07-11
permalink: /fr/2026/07/11/une-copie-bleue-par-dessus/
description: "Comment html et body reçoivent les trois mêmes ombres portées d'une seule règle, comment deux ombres vertes dessinent un 1 à empattements autour d'une boîte vide, comment une troisième ombre de la couleur du canevas cache ce qui dépasse, et comment une marge de 130px sur body dessine le second 1, dans la cible CSS Battle du 11 juillet 2026."
target: /assets/targets/2026-07-11.png
target_url: https://cssbattle.dev/play/Ittib3FggGhUuZ2rdNS9
colors: ["#3157b4", "#84be8d"]
player: emohdaziz
chars: 124
score: 722.68
match: 100
code: |
  <style>*{margin:90 40%50;background:#3157b4;color:84BE8D;box-shadow:138q 0#3157b4,53q -5ch,69q 27q 0 5q;*{margin:0 130 0-130
---

La cible du 11 juillet montre deux 1 vert doux côte à côte sur un fond bleu, avec des empattements en bas : on lit 11. Mohamed Ali les dessine avec une seule liste de trois ombres portées, donnée à html et à body. Deux ombres vertes font un 1 autour de la boîte vide de l'élément. La troisième est une copie bleue, de la couleur du canevas : elle est la première de la liste, donc peinte par-dessus, et elle cache la partie qui dépasse.

Cochez **Couleurs pédagogiques** pour voir les copies bleues, en jaune.

{% include animations/2026-07-11.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                            /* html, body et le reste */
  margin: 90 40%50;            /* html : 90 en haut, 160 à gauche et à droite, 50 en bas */
  background: #3157b4;         /* bleu, envoyé au canevas par html */
  color: 84BE8D;               /* vert, pour les ombres sans couleur */
  box-shadow:
    138q 0#3157b4,             /* 130,39, 0, bleu : cache le surplus */
    53q -5ch,                  /* 50,08, −40 : le haut du 1 */
    69q 27q 0 5q;              /* 65,2, 25,51, étalement 4,72 : le bas du 1 */
  * {                          /* body */
    margin: 0 130 0-130        /* 130 plus à gauche, même largeur */
```

## Comment ça marche

### 1. Une règle pour html et body

Pas de doctype : la page est en mode quirks. Le `*` vise tous les éléments, et html et body sont les deux seuls affichés. Les deux reçoivent les marges, le fond bleu, la couleur verte et les trois ombres. Seules les marges de body changent, dans la règle imbriquée.

html prend `margin:90 40%50` : 90 en haut, 40 % à gauche et à droite, 50 en bas. Une marge en pourcentage se compte sur la largeur du bloc conteneur, ici le canevas de 400px : 40 % font 160px. html fait 400 − 160 − 160 = 80 de large. En mode quirks, il prend la hauteur du canevas moins ses marges : 300 − 90 − 50 = 160. getBoundingClientRect donne (160, 90), 80 × 160.

html est l'élément racine : son fond bleu est peint sur tout le canevas. La boîte elle-même ne peint rien. Mais une ombre portée n'est peinte qu'en dehors de la boîte de bordure de son élément : dans la boîte de html, on voit toujours le canevas.

### 2. Deux ombres vertes : un 1

Le mode quirks lit `84BE8D` comme une couleur hexadécimale sans son `#`. Les deux dernières ombres n'ont pas de couleur : elles prennent `color`, le vert.

- `53q -5ch` : 53q font 50,08px. 1ch fait 8px avec la police par défaut de mon Chrome (Times, 16px), donc −5ch fait −40px. L'ombre va de (210,08, 50) à (290,08, 210). Au-dessus de la boîte de html, de y = 50 à 90, elle fait l'empattement du haut. À droite de la boîte de html, à partir de x = 240, elle fait la barre jusqu'à y = 210.
- `69q 27q 0 5q` : décalage de 65,2 et 25,51, pas de flou, étalement de 5q = 4,72px de chaque côté. L'ombre fait 89,45 × 169,45, de (220,47, 110,79) à (309,92, 280,24). Sous la boîte de html, à partir de y = 250, elle fait l'empattement du bas. Entre x = 240 et 290, elle prolonge la barre jusqu'à y = 250.

La deuxième ombre est plus large que la barre. Au-dessus de y = 250, elle dépasse à droite de la barre, de x = 290 à 309,92.

### 3. Une copie bleue par-dessus

`138q 0#3157b4` est une copie de html décalée de 130,39px à droite, dans le bleu du canevas. Elle va de (290,39, 90) à (370,39, 250). La première ombre de la liste est peinte au-dessus : elle couvre le vert. Elle cache le surplus de la deuxième ombre de y = 110,79 à 250. Elle s'arrête en y = 250, le bas de la boîte de html : l'empattement du bas reste entier. Partout ailleurs, c'est du bleu sur du bleu, et elle ne se voit pas.

Sans elle (110 caractères), 5 760 pixels changent. Une colonne verte d'environ 20px de large apparaît à droite de chaque barre, de y = 110 à 250, et la colonne x = 240 change aussi (voir la partie 4). Placée en fin de liste (124 caractères), la copie bleue est peinte sous les vertes : 5 600 pixels changent, et les deux colonnes vertes reviennent.

### 4. body : le même 1, 130px plus à gauche

La règle `*` imbriquée se lit `* *` : tout élément placé dans un élément. body est le seul affiché. Elle vient après la règle extérieure, avec la même spécificité : ses marges l'emportent. 0 en haut et en bas, 130 à droite, −130 à gauche. Elles se comptent depuis la boîte de html. body commence en x = 160 − 130 = 30 et finit en 240 − 130 = 110 : il garde 80 de large. En mode quirks, body s'étire sur la hauteur de html, 160. getBoundingClientRect donne (30, 90), 80 × 160.

body a les mêmes trois ombres : il dessine le même 1, 130px plus à gauche. Empattement du haut de x = 80,08 à 160,08, barre de 110 à 160,39, empattement du bas de 90,47 à 179,92. La copie bleue de body va de x = 160,39 à 240,39 : elle tombe dans la boîte de html, qui est vide. Elle cache le surplus du second 1 et rien d'autre, sauf les premiers 0,39px de la barre de droite, qui commence donc en x = 240,39. Le fond bleu de body, c'est du bleu sur du bleu.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle `*` donne les marges, le bleu, le vert et les trois ombres aux deux boîtes. Seules les marges de body ont besoin d'une règle à elles. Imbriquée, elle coûte `;*{` et n'a pas besoin d'accolade fermante. `}body{margin:0 130 0-130` donne la même image en 127 caractères.
- `40%50` : 40 % font 160px du canevas de 400px, et le `%` termine la valeur, donc `50` n'a pas besoin d'espace. `160 50` donne la même image en 125.
- `color:84BE8D` n'a pas de `#`. `#84BE8D` donne la même image en 125. Poser `color` une fois sert aux deux ombres vertes : écrire `#84BE8D` après chacune d'elles à la place donne aussi la même image en 125.
- La copie bleue sert de gomme : la couleur du canevas, en tête de liste. Elle ne demande aucun élément de plus, puisque html et body ont déjà leur liste d'ombres.
- `138q` fait 130,39px en 4 caractères. `130px` (125 caractères) change 440 pixels, seulement dans les colonnes x = 160, 240 et 290 : les bords que dessinent les copies bleues bougent de 0,39px.
- `53q` fait 50,08px en 3 caractères. `50px` (125 caractères) change 80 pixels, dans les colonnes x = 80 et 210, les bords gauches des empattements du haut.
- `69q 27q 0 5q`, ce sont 65,2, 25,51 et 4,72px. `65px 25px 0 5px` (127 caractères) change 302 pixels, le long des bords gauche, droit et bas des empattements du bas (x = 90, 179, 220, 309 et y = 280).
- `-5ch` fait −40px en 4 caractères. `-40px` donne la même image en 125.
- `0#3157b4` et `0-130` : le `#` et le signe moins commencent une nouvelle valeur, pas besoin d'espace. `0 #3157b4` et `0 -130` donnent la même image en 126.
- Rien n'est fermé. `}}</style>` à la fin donne 134 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, le code officiel ne colle pas pixel pour pixel à la cible. test.sh trouve 2 432 pixels faux. 811 d'entre eux sont sur des bords qui tombent entre deux pixels : x = 160, 240 et 290 (les 0,39 de `138q`), y = 280 (les 0,24 de 280,24), et quelques autres. Dans la cible, tous les bords tombent sur des pixels entiers. Avec des valeurs en pixels entiers, `130px 0#3157b4,50px -40px,65px 25px 0 5px` (130 caractères), tous les bords se posent sur ceux de la cible : 820 pixels changent par rapport au code officiel, tous sur ces bords.

Les autres écarts sont petits. Le fichier de la cible est un JPEG : ses aplats sont #3057b4 et #84be8c, à un cran des couleurs du code, et ses bords et ses coins portent du bruit de compression. test.sh compte aussi ce bruit : la version en pixels entiers a encore 1 658 pixels faux. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
