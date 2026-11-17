---
title: "Un disque, quatre coins : une colonne et quatre points en 127 caractères"
ref: 2026-08-22
permalink: /fr/2026/08/22/un-disque-quatre-coins/
description: "Comment un seul contour pointillé, donné à html et à un body de 0px de large, dessine les six blocs et la colonne, et comment un border-image pose le même disque blanc dans ses quatre coins, pour la cible CSS Battle du 22 août 2026."
target: /assets/targets/2026-08-22.png
target_url: https://cssbattle.dev/play/YXhLYIBBNDCRRLlXkXEH
colors: ["#5f5f1e", "#fff", "#94b31f"]
player: selenit
chars: 127
score: 719.23
match: 100
code: |
  <style>*{outline:dashed 53q#5F5F1E;margin :60-80;*{margin:9%280;border-image:radial-gradient(#fff 23q,#94B31F 7%)88%328/50%/6cm
---

La cible du 22 août a une colonne olive foncé au milieu d'un fond vert, trois blocs en haut, trois en bas, et quatre points blancs entre eux. Ilya Streltsyn la dessine avec deux boîtes. Un seul contour pointillé, donné à `html` et à un body large de 0px, dessine toutes les parties foncées. Le body reçoit aussi un `border-image` : un dégradé radial dont les quatre tranches de coin contiennent toutes le même disque blanc. Il apparaît donc quatre fois.

Choisissez **Vue large** pour voir le contour de `html` et la zone de l'image de bordure, toutes deux bien plus grandes que le canevas, et cochez **Couleurs pédagogiques** pour distinguer les quatre tranches.

{% include animations/2026-08-22.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, head, style, body */
  outline: dashed 53q #5F5F1E;   /* 53q = 50,08px : un contour de 50px */
  margin : 60 -80;               /* sans unité : px en mode quirks */
  * {                            /* head, style, body */
    margin: 9% 280;              /* 9 % de 560px = 50,39px ; il reste 0px de large */
    border-image:
      radial-gradient(#fff 23q, #94B31F 7%)  /* l'image */
      88% 328                    /* découpe : 468,83px en haut et en bas, 328px à gauche et à droite */
      / 50%                      /* largeur : la moitié de la zone */
      / 6cm;                     /* débord : 226,77px */
  }
}
```

## Comment ça marche

### 1. Deux boîtes

Il n'y a pas de doctype : la page est en mode quirks. Le navigateur crée `html`, `head`, le `style` (dans `head`) et `body`. `*` vise les quatre, et le `*` imbriqué vise `head`, `style` et `body`, les éléments placés dans un autre. `head` et `style` ne sont pas affichés. Il reste deux boîtes : `html`, avec la règle extérieure, et `body`, avec les deux règles. Le `margin` imbriqué vient après : c'est lui qui compte pour le body. Le body garde l'`outline` de la règle extérieure.

### 2. html : six blocs

`margin :60-80` n'a pas d'unité, et le mode quirks le lit en px : 60px en haut et en bas, −80px à gauche et à droite. En mode quirks, `html` remplit le cadre de 400 × 300 moins ses marges. Il fait 560 × 180, de (−80 ; 60) à (480 ; 240).

53q, c'est 53 quarts de millimètre : 50,08px. La largeur calculée du contour vaut 50px. Le contour entoure la boîte par l'extérieur : de (−130 ; 10) à (530 ; 290). Il est `dashed`. Dans mon Chrome (version 157), les côtés du haut et du bas, longs de 660px, ont cinq tirets de 100px séparés par quatre trous de 40px, et le premier et le dernier tiret partent des coins : 5 × 100 + 4 × 40 = 660. Le canevas ne montre que les trois du milieu, à x = 10 à 110, 150 à 250 et 290 à 390, de y = 10 à 60 et de 240 à 290. Les côtés gauche et droit, longs de 280px, sont hors du canevas : un tiret à chaque bout et un trou de 80px.

### 3. body : une boîte sans largeur

Le body est dans la boîte de contenu de `html`, large de 560px. `margin:9%280` : une marge en pourcentage est une part de cette largeur, même en haut et en bas. 9 % font donc 50,39px. Les marges de 280px sur les côtés prennent toute la largeur : 560 − 2 × 280 = 0. Le body est une ligne à x = 200. En mode quirks, il remplit les 180px de hauteur de `html` moins ses marges : 180 − 2 × 50,39 = 79,22px, de y = 110,39 à 189,61.

Son contour de 50px fait de cette ligne une boîte de 100 × 179,22, de (150 ; 60,39) à (250 ; 239,61). Ses côtés ne font que 179,22px, et mon Chrome les trace sans trou : le contour est plein. J'ai vérifié avec un body plus haut (`margin:20px 280px`) : ses côtés font 240px, et un trou de 48px apparaît au milieu. Chrome peint le contour de y = 60 à 240 : il rejoint les tirets du milieu de `html`. Ensemble, ils forment la colonne, de y = 10 à 290.

### 4. border-image : une zone plus grande que le canevas

La dernière valeur du `border-image` est le débord : 6cm = 226,77px. L'image de bordure est peinte dans la boîte du body, agrandie d'autant de chaque côté : de (−26,77 ; −116,38) à (426,77 ; 416,38), soit 453,54 × 532,76. Elle couvre tout le canevas, et c'est d'elle que vient le vert. J'ai vérifié en ajoutant `border-image:none` au body : le canevas est blanc.

L'image est un dégradé : elle n'a pas de taille à elle et prend celle de la zone. Sans taille, `radial-gradient` trace une ellipse centrée dans l'image, en (200 ; 150) sur le canevas, qui passe par les coins de l'image. Son rayon horizontal vaut 226,77 × √2 = 320,7px. Les arrêts de couleur se mesurent sur ce rayon : blanc jusqu'à 23q = 21,73px, vert à partir de 7 % de 320,7, soit 22,45px. La zone est plus haute que large, l'ellipse aussi : dans mon rendu, l'ellipse blanche fait 44px de large et 52px de haut.

### 5. 88% 328 : quatre tranches qui se chevauchent

`88%328` dit où couper l'image : 88 % de 532,76 = 468,83px depuis le haut et depuis le bas, 328px depuis la gauche et depuis la droite. La tranche en haut à gauche, c'est l'image de x = 0 à 328 et de y = 0 à 468,83. Les trois autres sont ses reflets.

Chaque tranche dépasse la moitié de l'image : elles se chevauchent, et chacune contient le centre de l'image, là où se trouve l'ellipse blanche. Les lignes de découpe se croisent : les bords et le milieu sont vides, seuls les quatre coins sont dessinés.

### 6. /50% : un disque, quatre fois

`/50%` donne la largeur des bordures : 50 % de la zone, soit 226,77px à gauche et à droite et 266,38px en haut et en bas. Chaque tranche de coin est dessinée dans un quart de la zone. Elle y est écrasée : 328 → 226,77 en largeur (× 0,691) et 468,83 → 266,38 en hauteur (× 0,568).

L'écrasement vertical est plus fort, et il défait la forme de l'ellipse. 44 × 0,691 font environ 30, et 52 × 0,568 aussi. Dans mon rendu, chaque disque fait environ 30,2px de large et 29,7px de haut. Celui du haut à gauche est centré en (−26,77 + 226,77 × 0,691 ; −116,38 + 266,38 × 0,568) = (130 ; 35). Les autres quarts donnent (270 ; 35), (130 ; 265) et (270 ; 265). Le reste de chaque quart est vert.

### 7. Les contours par-dessus

Les contours sont peints après les bordures et les fonds de la page. Les six blocs et la colonne recouvrent le vert de l'image de bordure, et les quatre disques se voient dans les trous entre eux.

## Notes de golf

- Une seule déclaration `outline` dessine toutes les parties foncées : les tirets de `html` font les six blocs, et le contour du body fait la colonne.
- Le body n'a aucune largeur. Son contour, à lui seul, est la colonne de 100px.
- Un côté en pointillé se coupe en blocs tout seul. Le canevas n'a qu'à montrer les trois tirets du milieu de chaque grand côté.
- Un dégradé, quatre disques : les quatre tranches de coin de l'image de bordure contiennent toutes le même disque.
- L'image de bordure peint aussi le vert de tout le canevas : pas de `background`.
- Unités courtes : 53q (50,08px), 23q (21,73px) et 6cm (226,77px) font trois caractères chacune.
- Le mode quirks lit `60-80` et `280` en px. Le `328` de la découpe est un simple nombre dans tous les modes : des pixels de l'image.
- Pas d'espace devant `#` ni après `)` : `53q#5F5F1E`, `7%)88%328`. Pas non plus devant un signe moins : `60-80`.
- `margin :60-80` a une espace avant les deux-points. Le CSS l'accepte, et elle coûte un caractère : sans elle, mon rendu est le même, pixel pour pixel.
- `<style>` et les deux accolades ne sont jamais fermés.

## Si vous l'essayez chez vous

Dans mon Chrome (la version 157 au moment où ces lignes sont écrites), les blocs et la colonne tombent exactement là où la cible les a. 581 pixels diffèrent de la cible. 269 d'entre eux diffèrent de plus de 8 niveaux : ils sont tous sur les bords des quatre disques. Dans mon rendu, les disques font environ 30,2px de large et 29,7px de haut ; dans la cible, 30 × 30. 12 autres pixels de bord de disque diffèrent de 8 niveaux ou moins. Les 300 restants sont dans les colonnes d'un pixel juste à gauche des six blocs (x = 9, 149 et 289, de y = 10 à 59 et de 240 à 289) : ils sont plus sombres d'un niveau que le vert de la cible. Sur le juge de CSS Battle, le code est identique à 100 %.
