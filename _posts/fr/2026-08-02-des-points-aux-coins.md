---
title: "Des points aux coins : un K en 123 caractères"
ref: 2026-08-02
permalink: /fr/2026/08/02/des-points-aux-coins/
description: "Comment une bordure pointillée de 70px sur html dessine les quatre disques de la cible CSS Battle du 2 août 2026, et comment deux ombres d'un body invisible dessinent la barre et le rectangle."
target: /assets/targets/2026-08-02.png
target_url: https://cssbattle.dev/play/j5lNXe0bnIf95N6TxmQ7
colors: ["#e05947", "#eed9d9"]
player: h_blierzt
chars: 123
score: 723.86
match: 100
code: |
  <style>&{background:#E05947;margin:40 100;border:dotted 75q;color:EED9D9;*{margin:-9 105-9-183;box-shadow:5vw 0,9pc 0 0-31q
---

La cible du 2 août est un K rose pâle sur fond rouge corail : quatre disques aux coins d'un carré, une barre qui relie les deux de gauche, et un petit rectangle au milieu. H_Bliertz dessine les quatre disques avec une seule bordure pointillée sur html : les points font 70px de large, donc seuls les coins en reçoivent un. La barre et le rectangle sont deux ombres de body, lui-même invisible.

Cochez **Couleurs pédagogiques** pour voir la boîte vide de body et la partie de chaque ombre qu'elle cache.

{% include animations/2026-08-02.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                           /* hors de toute règle, & désigne html */
  background: #E05947;        /* rouge, peint sur tout le canevas */
  margin: 40 100;             /* une boîte de 200 × 220 en (100 ; 40) */
  border: dotted 75q;         /* 70,87px, tracée à 70px : un point de 70px par coin */
  color: EED9D9;              /* sans # : le mode quirks l'accepte ; body en hérite */
  * {                         /* les descendants de html : body est le seul visible */
    margin: -9 105-9-183;     /* body : 138 × 98, de x = −13 à 125 */
    box-shadow:
      5vw 0,                  /* 20px vers la droite : une barre de 20px se voit */
      9pc 0 0-31q             /* 144px vers la droite, 29,29px de moins de chaque côté */
```

## Comment ça marche

### 1. html est une boîte de 200 × 220

Hors de toute règle, `&` désigne la racine de la page : html. Il n'y a pas de doctype, donc la page est en mode quirks, et les nombres sans unité, comme `40 100`, se lisent en px.

`margin:40 100` laisse à html une boîte de 200 × 220, de (100 ; 40) à (300 ; 260). Son fond est quand même peint sur tout le canevas : c'est toujours le cas pour le fond de la racine.

### 2. Une bordure pointillée qui a la place pour quatre points

`75q`, c'est 75 quarts de millimètre. 1Q = 0,945px, donc 70,87px. Chrome trace la bordure sur 70px : `70px` à la place donne la même image. Il reste à la boîte de contenu 200 − 2 × 70 = 60 sur 220 − 2 × 70 = 80, en (170 ; 110).

Dans une bordure pointillée aussi épaisse, chaque point est un disque de 70px. Les côtés font 200 et 220 de long, et les points ne tiennent qu'aux coins. Cela donne quatre disques, centrés en (135 ; 75), (265 ; 75), (135 ; 225) et (265 ; 225). Avec `margin:0 100`, html fait 300 de haut, et un troisième disque apparaît au milieu des côtés gauche et droit.

La bordure prend la couleur du texte. `color:EED9D9` n'a pas de `#` : le mode quirks accepte là une couleur hexadécimale nue.

### 3. body, une boîte vide au bon endroit

La règle `*{` est imbriquée dans `&{`, elle ne vise donc que les descendants de html. head et style ne s'affichent pas : body est la seule boîte qui reste.

body se place dans la boîte de contenu de html, 60 × 80 en (170 ; 110). `margin:-9 105-9-183` se lit haut −9, droite 105, bas −9, gauche −183 :

- largeur : 60 + 183 − 105 = 138, de x = 170 − 183 = −13 à 125 ;
- hauteur : en mode quirks, body remplit la boîte de contenu de html, donc 80 + 9 + 9 = 98, de y = 101 à 199.

body n'a pas de fond. Sa boîte est là, mais on ne la voit pas.

### 4. La première ombre : une barre

`5vw`, c'est 5 % de 400, 20px. Une ombre sans couleur prend la couleur du texte, le rose pâle dont body hérite.

La première ombre est la boîte de body décalée de 20px vers la droite : de x = 7 à 145. Mais une ombre extérieure n'est jamais peinte sous sa propre boîte, même quand la boîte est transparente. Tout ce qui est à gauche de x = 125 disparaît. Il ne reste qu'une bande de 20px, de x = 125 à 145, et de y = 101 à 199.

Cette bande est la barre. Ses bouts passent sous les deux disques de gauche, qui descendent jusqu'à y = 110 et reprennent à y = 190. Sa plage en x, de 125 à 145, est le milieu de ces disques.

### 5. La seconde ombre : un rectangle

`9pc`, c'est 9 × 16 = 144px. La seconde ombre part de la boîte de body décalée de 144px vers la droite : de x = 131 à 269. C'est au-delà du bord droit de body, à 125, donc rien n'en est coupé.

La quatrième valeur, `-31q`, est l'étalement : −31 × 0,945 = −29,29px. Un étalement négatif réduit l'ombre d'autant de chaque côté :

- largeur : 138 − 2 × 29,29 = 79,4, de x = 160,3 à 239,7 ;
- hauteur : 98 − 2 × 29,29 = 39,4, de y = 130,3 à 169,7.

C'est le rectangle au milieu du K.

## Notes de golf

- `&` désigne html en un caractère. Y imbriquer `*{` garde la marge et les ombres de body loin de html. Avec `}*{` au lieu de `;*{`, à longueur égale, html reçoit lui aussi les deux ombres, et 63 659 pixels changent. `body{` à la place de `*{` donne la même image, avec 3 caractères de plus.
- Une seule `color` peint tout : la bordure et les deux ombres prennent la couleur du texte, et body en hérite de html. L'écrire sans `#` fait gagner un caractère. Le fond garde son `#` : avec `background:E05947`, mon Chrome ignore la déclaration et 100 297 pixels changent.
- `75q` tient en 3 caractères pour une bordure que Chrome trace sur 70px. `70px` donne la même image en 4. Un `70` nu ne marche pas dans la forme raccourcie `border` : Chrome ignore toute la déclaration, et 27 242 pixels changent.
- `box-shadow` n'accepte pas non plus de nombres nus, alors le code choisit des unités courtes : `5vw` pour 20px (3 caractères au lieu de 4), `9pc` pour 144px (3 au lieu de 5), `-31q` pour −29,29px. Avec `144` à la place de `9pc`, Chrome ignore les deux ombres et 4 832 pixels changent.
- `margin` accepte les nombres nus en mode quirks. Dans `-9 105-9-183` et `0 0-31q`, le signe moins commence un nouveau nombre, donc aucune espace n'est nécessaire devant.
- La boîte de body fixe la taille des deux formes. Le −9 en haut et en bas donne à body 98 de haut : la barre passe sous les disques, et 98 − 58,58 donne au rectangle ses 39,4. Avec `0` à la place, body fait 80 de haut, le rectangle n'a plus que 80 − 58,58 = 21,42 de haut, et 1 632 pixels changent.
- Rien n'est fermé : `&{` et `*{` restent ouverts, et il n'y a pas de `</style>`. Avec `}}` à la fin, le code fait 125 caractères et l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, 875 pixels diffèrent de la cible de plus de 8 sur un canal. Dans la cible, le rectangle remplit des pixels entiers, 80 × 40 à partir de (160 ; 130). Chez moi, ses quatre bords tombent sur des pixels en partie couverts, comme le veut sa taille de 79,4 × 39,4. Mesurés à la part de rose de chaque pixel, les disques de la cible sont environ 0,2px plus haut et plus à gauche que les miens. Le juge de CSS Battle donne au code 100 % de correspondance.
