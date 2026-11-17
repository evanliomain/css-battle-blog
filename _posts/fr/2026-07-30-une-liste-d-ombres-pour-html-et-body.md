---
title: "Une liste d'ombres pour html et body : une arche en 156 caractères"
ref: 2026-07-30
permalink: /fr/2026/07/30/une-liste-d-ombres-pour-html-et-body/
description: "Comment six ombres portées, données à la fois à html et à body, dessinent l'arche, le fond orange, la barre, les pattes et la base de la cible CSS Battle du 30 juillet 2026."
target: /assets/targets/2026-07-30.png
target_url: https://cssbattle.dev/play/kmnEBhr0xnz7J8MSeSpa
colors: ["#f8b140", "#696049", "#ffffff"]
player: h_blierzt
chars: 156
score: 690.43
match: 100
code: |
  <style>*{margin:352 65-666;color:696049;box-shadow:0 0 0 5vw,0 0 0 2in#F8B140,0-78vw,-50vh -64mm,50vh -64mm 0,0-86q 0 138q}&{border-radius:9in;margin:80 125
---

La cible du 30 juillet est une arche épaisse brun gris sur fond orange, blanche à l'intérieur, avec une barre au milieu. Elle repose sur une base avec une petite patte à chaque bout. H_Bliertz dessine tout avec des ombres portées. Une seule liste de six ombres va sur tous les éléments. Sur html, elle dessine l'arche et le fond orange. Sur body, placé sous le canevas, elle coupe tout en y = 240 et dessine la barre, les pattes et la base.

Choisissez **Vue large** pour voir html et body descendre loin sous le canevas, et cochez **Couleurs pédagogiques** pour distinguer les six ombres.

{% include animations/2026-07-30.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* tous les éléments : on voit html et body */
  margin: 352 65-666;              /* body : 20 × 454 en (190 ; 432), sous le canevas */
  color: 696049;                   /* la couleur des ombres qui n'ont pas la leur */
  box-shadow:
    0 0 0 5vw,                     /* 1. un anneau de 20px : l'arche de html */
    0 0 0 2in#F8B140,              /* 2. 192px d'orange : le fond sur html, la coupe en y = 240 sur body */
    0-78vw,                        /* 3. body, 312px plus haut : la barre */
    -50vh -64mm,                   /* 4. body, 150px à gauche et 241,89px plus haut : la patte gauche */
    50vh -64mm 0,                  /* 5. pareil, 150px à droite (flou 0) : la patte droite */
    0-86q 0 138q                   /* 6. body, 81,26px plus haut, étalé de 130,39px : la base */
}
& {                                /* la racine : html */
  border-radius: 9in;              /* 864px, réduits à 75px : un haut en demi-cercle */
  margin: 80 125                   /* html : 150 de large, en (125 ; 80) */
```

## Comment ça marche

### 1. html : une boîte haute au sommet rond

L'élément style n'est jamais fermé, donc tout le code est du CSS. Il n'y a pas de doctype : la page est en mode quirks, et les nombres nus comme `80` se lisent en px. `&`, seul au premier niveau, désigne la racine : html. `&{` vient après `*{`, donc html prend la `margin` de `&{` : 80 en haut et en bas, 125 sur les côtés. html fait 400 − 2 × 125 = 150 de large, en (125 ; 80).

Sa hauteur est de 492px. Je l'ai mesurée, et elle suit la marge haute de body : 352 + 140 = 492, où 140 vaut 300 − 2 × 80. Avec une marge haute de 100 sur body, html fait 240 de haut ; avec 300, il fait 440. html descend donc jusqu'à y = 572, loin sous le canevas.

`border-radius:9in` demande 864px, bien plus que la boîte ne peut en tenir. Chrome réduit tous les rayons jusqu'à ce qu'ils tiennent dans les 150px de large : 75px chacun. Le haut de html devient un demi-cercle de rayon 75, centré en (200 ; 155). En dessous, les côtés sont droits jusqu'à y = 497.

### 2. Les ombres de html : l'arche et le fond

`*` donne à tous les éléments la même liste `box-shadow`. Une ombre sans couleur prend `color`, ici `696049`, un brun gris. Les ombres sont peintes dans l'ordre inverse : la première est au-dessus.

La première ombre, `0 0 0 5vw`, s'étale de 20px (5vw de 400). Autour de html, elle trace un anneau de 20px qui suit le haut arrondi : une arche de x = 105 à 295, dont le sommet est en y = 60. La deuxième, `0 0 0 2in#F8B140`, étale 192px d'orange autour de html. Cela couvre tout le canevas. Une ombre portée ne se peint jamais sous sa propre boîte, et html n'a pas de fond : dans html, on voit le canevas blanc. C'est le blanc de l'intérieur de l'arche.

html reçoit aussi les quatre autres ombres. Elles sont peintes sous son ombre orange.

### 3. body : 20 × 454, sous le canevas

body reçoit `margin:352 65-666` par `*`. Il part du haut de la boîte de html, donc la marge haute le pose en y = 80 + 352 = 432. Les marges de côté de 65 lui laissent 150 − 130 = 20 de large, de x = 190 à 210. En mode quirks, la hauteur de body vaut les 140px de la page entre les marges de html, moins ses propres marges : 140 − 352 + 666 = 454. body va donc de y = 432 à 886, hors de vue.

L'anneau de body, la première ombre, reste lui aussi sous le canevas : à partir de y = 412.

### 4. L'ombre orange de body coupe en y = 240

La deuxième ombre étale 192px d'orange autour de body : à partir de y = 432 − 192 = 240 vers le bas, et de x = −2 à 402. body est peint après html, donc cet orange couvre tout ce qui, dans html, est sous y = 240 : les côtés de l'arche et le blanc de l'intérieur. L'arche s'arrête en y = 240.

### 5. Des copies décalées de body : la barre et les pattes

Les trois ombres suivantes n'ont pas d'étalement : chacune est une copie de body, 20 × 454, déplacée.

- `0-78vw` la monte de 312px : x = 190 à 210, à partir de y = 120. C'est la barre.
- `-50vh -64mm` la décale de 150px à gauche et de 241,89px vers le haut : x = 40 à 60, à partir de y = 190,11. C'est la patte gauche.
- `50vh -64mm 0` fait de même 150px à droite : x = 340 à 360. C'est la patte droite.

Les trois viennent après l'ombre orange dans la liste, donc elles sont peintes dessous. Elles descendent jusqu'à y = 574 ou plus, mais l'orange les cache sous y = 240.

### 6. La base

La dernière ombre, `0-86q 0 138q`, monte body de 81,26px (86 quarts de millimètre) et l'étale de 130,39px (138q). Elle va de x = 190 − 130,39 = 59,61 à 340,39, et commence en y = 432 − 81,26 − 130,39 = 220,35. Elle rejoint les deux pattes et couvre le pied de la barre et de l'arche. L'orange la coupe aussi en y = 240 : la base s'arrête là.

## Notes de golf

- Une seule liste d'ombres fait le travail de deux. html a besoin des deux premières ombres, body des cinq dernières. Chaque élément reçoit les six, et les ombres en trop tombent hors de vue : l'anneau de body est sous le canevas, et les quatre dernières ombres de html sont sous son propre orange. Elles ne touchent que les pixels lissés du bord intérieur de l'arche : quand html ne garde que ses deux premières ombres, 189 pixels de ce bord s'éclaircissent.
- `color:696049` pose le brun une fois, et cinq ombres s'en servent. Écrire `#696049` dans chacune de ces cinq ombres, sans `color`, donne la même image en 178 caractères, 22 de plus.
- En mode quirks, `color` accepte une couleur hexadécimale sans son `#` : `color:#696049` donne la même image en 157 caractères.
- L'ordre de la liste compte. L'ombre orange est deuxième, donc les quatre formes en dessous s'arrêtent en y = 240. Quand j'ajoute une règle qui la met à la fin de la liste de body, les pattes et la base descendent jusqu'en bas du canevas, et 19 200 pixels changent : une bande brune de 320 × 60.
- La marge basse de −666 donne à body 454px de haut, pour que ses copies soient assez longues pour aller de y = 120 à 240. Avec une marge basse de 0 (`margin:352 65 0`), body fait 0px de haut : la barre et les pattes disparaissent, seule la base reste, grâce à son étalement, et 4 086 pixels changent.
- `&` tient en 1 caractère pour la racine. `html{` au lieu de `&{` donne la même image en 159 caractères.
- Des unités courtes : `5vw` vaut 20px en 3 caractères, `2in` vaut 192px en 3, `78vw` vaut 312px et `50vh` vaut 150px en 4, `64mm` vaut 241,89px en 4. `9in` suffit pour un rayon « assez grand ».
- Pas d'espace quand un signe ou un `#` commence la valeur suivante : `65-666`, `0-78vw`, `0-86q`, `2in#F8B140`.
- Rien n'est fermé : ni la règle `&{`, ni l'élément style. Avec `}</style>` à la fin, le code fait 165 caractères et l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, 790 pixels diffèrent de la cible de plus de 8 sur un canal. 530 d'entre eux sont sur les deux bords courbes de l'arche. 220 sont sur la rangée y = 220, le bord haut de la base, qui commence en y = 220,35. Les 40 autres sont sur la rangée y = 190, le haut des deux pattes, qui commencent en y = 190,11. Dans mon rendu, ces deux rangées mélangent le brun avec la couleur du dessus. Dans la cible, elles sont entièrement brunes. Le juge de CSS Battle donne au code 100 % de correspondance.
