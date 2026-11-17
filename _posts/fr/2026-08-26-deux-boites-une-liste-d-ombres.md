---
title: "Deux boîtes, une liste d'ombres : un disque fendu en 130 caractères"
ref: 2026-08-26
permalink: /fr/2026/08/26/deux-boites-une-liste-d-ombres/
description: "Comment une seule liste de box-shadow, utilisée par html puis par un body découpé par clip-path, dessine le fond olive, les trois carrés blancs et le disque fendu de la cible CSS Battle du 26 août 2026."
target: /assets/targets/2026-08-26.png
target_url: https://cssbattle.dev/play/73FtfyFQ7BgJHeS18cU0
colors: ["#fff", "#bbb54e", "#566713"]
player: selenit
chars: 130
score: 715.87
match: 100
code: |
  <style>*{margin:125 175;box-shadow:-138q 0#fff,138q 0#fff,0 0 0 3in;color:BBB54E;*{margin:-90-15;color:566713;clip-path:circle(5lh
---

La cible du 26 août, c'est un disque vert foncé sur fond olive, fendu par une bande verticale, avec trois petits carrés blancs en ligne : un dans la fente, un de chaque côté. Ilya Streltsyn écrit une seule liste de `box-shadow` et la fait servir à deux boîtes. Sur `html`, elle dessine le fond et les trois carrés. Sur le `body`, la même liste sort en vert foncé, et `clip-path:circle(5lh)` la découpe en disque.

Cochez **Couleurs pédagogiques** pour voir les copies blanches de chaque boîte dans leur propre couleur : le `body` en a deux lui aussi, et elles tombent juste hors du cercle.

{% include animations/2026-08-26.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html (et tout ce qu'il contient) */
  margin: 125 175;                 /* html : 50 × 50 en (175 ; 125) */
  box-shadow:
    -138q 0 #fff,                  /* copie blanche, 130,39px à gauche */
    138q 0 #fff,                   /* copie blanche, 130,39px à droite */
    0 0 0 3in;                     /* étalée de 288px, couleur du texte */
  color: BBB54E;                   /* #BBB54E, sans le # */
  * {                              /* head, style, body */
    margin: -90 -15;               /* body : 80 × 230 en (160 ; 35) */
    color: 566713;                 /* mêmes ombres, en vert foncé */
    clip-path: circle(5lh);        /* rayon de 90px autour de (200 ; 150) */
  }
}
```

## Comment ça marche

### 1. html : une boîte de 50 × 50

`*` vise `html` et tous les éléments qu'il contient. Le `*` imbriqué ne vise que ceux de l'intérieur : `head`, `style` et `body`. `head` et `style` ne sont pas affichés : seuls `html` et `body` dessinent quelque chose.

Sur `html`, `margin:125 175` laisse 400 − 175 − 175 = 50px de large. En mode quirks, `html` remplit la hauteur du cadre moins ses marges : 300 − 125 − 125 = 50px. Je l'ai mesuré : une boîte de 50 × 50 en (175 ; 125).

Aucune règle ne peint de fond. Le canevas reste blanc.

### 2. Une ombre de 3in : le fond olive

La dernière ombre, `0 0 0 3in`, n'a ni décalage ni flou. Elle est étalée de 3in, et 1in = 96px : 288px de chaque côté, soit un carré de 626 × 626 à partir de (−113 ; −163), bien plus grand que le canevas.

Elle n'a pas de couleur : elle prend celle du texte. C'est `color:BBB54E`, un hexadécimal sans `#`, que le mode quirks accepte. La couleur calculée est `rgb(187, 181, 78)`, donc `#BBB54E`.

Une ombre externe ne se peint jamais sous sa propre boîte. Les 50 × 50 de `html` restent blancs : c'est le carré du milieu. Il n'est pas dessiné, c'est le canevas vu à travers la boîte.

### 3. Deux copies blanches : les carrés des côtés

Les deux premières ombres, `-138q 0#fff` et `138q 0#fff`, sont des copies de la boîte décalées à gauche et à droite, en blanc. 1q, c'est un quart de millimètre, 0,945px : 138q = 130,39px. Le carré de gauche va de x = 44,61 à 94,61, celui de droite de 305,39 à 355,39, tous les deux de y = 125 à 175.

Les ombres sont peintes dans l'ordre inverse : la première de la liste est au-dessus. Les deux copies blanches sont écrites avant l'ombre olive : elles sont peintes par-dessus.

### 4. body : la même liste, dans une autre couleur

La règle imbriquée donne au `body` `margin:-90-15`. Des marges négatives sur les côtés le rendent plus large que `html` : 50 + 15 + 15 = 80px. En mode quirks, le `body` remplit la hauteur de `html` moins ses marges : 50 + 90 + 90 = 230px. Je l'ai mesuré : une boîte de 80 × 230 en (160 ; 35).

Le `*` du dehors vise aussi le `body`, et la règle imbriquée ne touche pas à `box-shadow`. Le `body` a donc les trois mêmes ombres. Seule la couleur change : le `color:566713` imbriqué rend l'ombre étalée `#566713`, vert foncé. Les deux copies disent `#fff` : elles restent blanches.

Avant toute découpe, l'ombre vert foncé couvre tout le canevas sauf la boîte du `body`. À travers cette boîte, on voit ce que `html` a peint : de l'olive, avec le carré blanc du milieu. Les deux copies blanches du `body` sont des bandes de 80 × 230, de x = 29,61 à 109,61 et de 290,39 à 370,39.

### 5. circle(5lh) : le disque

`clip-path` découpe un élément et tout ce qu'il peint, ombres comprises. `circle(5lh)` n'a pas de position : le cercle est centré sur la boîte du `body`, en (160 + 40 ; 35 + 115) = (200 ; 150).

`lh`, c'est la hauteur de ligne de l'élément. Dans mon Chrome, 5lh mesure ici 90px : 1lh vaut 18px. Le cercle va de x = 110 à 290 et de y = 60 à 240.

Dans le cercle, il ne reste que l'ombre vert foncé. La fente, c'est la boîte du `body`, 80px de large, de x = 160 à 240 : on y voit `html`, olive avec le carré blanc du milieu. Les deux moitiés du disque commencent en y = 150 − √(90² − 40²) = 69,38 le long de la fente, et c'est ce que j'ai mesuré sur le rendu.

Les copies blanches du `body` s'arrêtent en x = 109,61 et reprennent en 290,39. Le cercle commence en 110 et finit en 290 : il n'en reste rien. Pour vérifier, j'ai rendu une version où seules les copies du `body` sont rouges : aucun pixel rouge n'apparaît.

## Notes de golf

- Une seule liste de `box-shadow` pour deux boîtes. L'ombre étalée n'a pas de couleur : elle suit le `color` de chaque boîte, olive sur `html`, vert foncé sur le `body`.
- Les copies blanches du `body` n'ont pas besoin d'être annulées : elles tombent à 0,39px hors du cercle.
- `color:BBB54E` et `color:566713` : des hexadécimaux sans `#`, acceptés en mode quirks.
- `138q` fait 4 caractères pour 130,39px. `130px` en prendrait 5.
- `3in` donne un étalement de 288px en 3 caractères, plus que les 175px qu'il faut pour atteindre les bords du canevas.
- `5lh` fait 90px en 3 caractères.
- Pas besoin d'espace dans `0#fff` ni dans `-90-15` : le `#` et le `-` commencent une nouvelle valeur.
- Les marges sans unité marchent en mode quirks : `125 175`, `-90-15`.
- `<style>` n'est jamais fermé, et `circle(5lh` et les deux accolades restent ouverts.

## Si vous l'essayez chez vous

138q vaut 130,39px, pas 130. Dans le dernier Chrome (la version 157 au moment où ces lignes sont écrites), les bords gauche et droit des deux carrés des côtés tombent à 0,39px de la grille des pixels : les carrés vont de 44,61 à 94,61 et de 305,39 à 355,39, là où la cible a 45 à 95 et 305 à 355. Chacun de ces quatre bords est fondu sur une colonne de pixels. Avec `130px` à la place de `138q`, les carrés sont identiques à la cible ; les seuls pixels qui diffèrent encore sont sur le bord courbe du disque. Sur le juge de CSS Battle, le code d'origine est identique à 100 %.
