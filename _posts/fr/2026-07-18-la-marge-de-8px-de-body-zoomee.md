---
title: "La marge de 8px de body, zoomée : un fusible en 121 caractères"
ref: 2026-07-18
permalink: /fr/2026/07/18/la-marge-de-8px-de-body-zoomee/
description: "Comment zoom:2.5 fait de la marge par défaut de 8px de body un cadre de 20px, et comment une seule liste d'ombres sur html et body dessine huit rectangles, dans la cible CSS Battle du 18 juillet 2026."
target: /assets/targets/2026-07-18.png
target_url: https://cssbattle.dev/play/LJiv45bjokCqLDhpIzOX
colors: ["#469dba", "#394257", "#fae29e"]
player: selenit
chars: 121
score: 726.24
match: 100
code: |
  <style>*{box-shadow:0 2pc,0 6pc,72q 4pc,-72q 4pc;color:FAE29E}&{zoom:2.5;background:#479DBA;color:#323B;margin:-20 42 108
---

La cible du 18 juillet montre un cadre gris-bleu sur un fond bleu, avec une barre jaune pâle en haut et une en bas. Deux bandes grises sortent de ses côtés jusqu'aux bords du canevas, avec une barre jaune dans chacune. Ilya Streltsyn n'ajoute aucun élément : html et body partagent une liste de quatre ombres. Les copies de html sont grises et font le cadre. Celles de body sont jaunes, et `zoom:2.5` fait de la marge par défaut de 8px de body une marge de 20px : chaque copie jaune est 20px à l'intérieur d'une copie grise.

Cochez **Couleurs pédagogiques** pour distinguer les quatre ombres de html, et passez en **Vue large** pour voir html et body au-dessus du canevas.

{% include animations/2026-07-18.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html et body (head est caché) */
  box-shadow:                      /* les mêmes quatre ombres pour les deux, × 2,5 à l'écran */
    0 2pc,                         /* 80px plus bas : la paire du haut */
    0 6pc,                         /* 240px plus bas : la paire du bas */
    72q 4pc,                       /* 170,08px à droite, 160px plus bas : la paire de droite */
    -72q 4pc;                      /* 170,08px à gauche, 160px plus bas : la paire de gauche */
  color: FAE29E                    /* sans dièse : jaune, la couleur des ombres de body */
}
& {                                /* au plus haut niveau : :scope, la racine, html */
  zoom: 2.5;                       /* toutes les longueurs × 2,5 ; la marge de 8px de body : 20px */
  background: #479DBA;             /* le fond de la racine : tout le canevas */
  color: #323B;                    /* les ombres de html : un violet sombre à 73 % d'opacité */
  margin: -20 42 108               /* × 2,5 : une boîte de 190 × 80 en (105, −50) */
```

## Comment ça marche

### 1. html : un zoom et le fond

Il n'y a pas de doctype : la page est en mode quirks. La balise style n'est jamais fermée, donc tout ce qui suit `<style>` est du CSS. body est vide.

Au plus haut niveau, `&` veut dire `:scope`, c'est-à-dire la racine : html. html reçoit `background:#479DBA`. Le fond de la racine est peint sur tout le canevas, et la boîte de html reste transparente.

`zoom:2.5` multiplie par 2,5 toutes les longueurs de html et de tout ce qu'il contient. getComputedStyle donne toujours `margin: -20px 42px 108px` pour html, mais à l'écran chaque px fait 2,5px.

### 2. html : une boîte de 190 × 80 au-dessus du canevas

En mode quirks, un nombre sans unité compte en px dans `margin`. `margin:-20 42 108` fait −20 en haut, 42 sur les côtés et 108 en bas. À l'écran, cela donne −50, 105 et 270.

En mode quirks, html remplit la fenêtre moins ses marges : 400 − 2 × 105 = 190 de large, et 300 + 50 − 270 = 80 de haut. getBoundingClientRect donne (105, −50), 190 × 80 : html est surtout au-dessus du canevas.

### 3. body : la marge par défaut de 8px devient 20px

Rien ne fixe la marge de body : il garde les 8px par défaut du navigateur. Avec le zoom, cela fait 8 × 2,5 = 20px à l'écran. body remplit html moins ses marges : 190 − 40 = 150 de large et 80 − 40 = 40 de haut. getBoundingClientRect donne (125, −30), 150 × 40. body n'a pas de fond non plus.

body est donc une boîte 20px à l'intérieur de html, de chaque côté. C'est l'épaisseur du cadre.

### 4. Deux couleurs pour une liste d'ombres

`*` vise html, head, la balise style et body. head et style ne s'affichent pas. html et body reçoivent le même `box-shadow`, sans couleur : une ombre sans couleur prend la couleur du texte.

`color:FAE29E` n'a pas de `#`. En mode quirks, `color` accepte une couleur hexadécimale sans dièse. body garde ce jaune, rgb(250, 226, 158).

La règle `&` vient après et donne à html `color:#323B`. C'est une couleur hexadécimale à 4 chiffres, avec alpha : #332233 à BB = 187/255, soit 73 % d'opacité. Sur le bleu, elle donne (56, 67, 87) dans mon rendu : le gris-bleu du cadre. Le cadre de la cible est #394257, (57, 66, 87).

### 5. Quatre ombres, huit rectangles

Chaque ombre est une copie de la boîte de l'élément, déplacée de son décalage. Les décalages sont eux aussi multipliés par 2,5 :

- `0 2pc` : 1pc = 16px, donc 32px, et 80 à l'écran. La copie de html va de y = 30 à 110, celle de body de y = 50 à 90.
- `0 6pc` : 96px, donc 240. La copie de html va de y = 190 à 270, celle de body de y = 210 à 250.
- `72q 4pc` : 1q est un quart de millimètre, donc 72q = 18mm = 68,03px, et 170,08 à l'écran. 4pc = 64px, donc 160. La copie de html va de x = 275,08 à 465,08, de y = 110 à 190. Celle de body de x = 295,08 à 445,08, de y = 130 à 170.
- `-72q 4pc` : la même chose à gauche. La copie de html va de x = −65,08 à 124,92, celle de body de −44,92 à 105,08.

body est 20px à l'intérieur de html, et les deux éléments ont les mêmes décalages. Chaque copie jaune est donc 20px à l'intérieur de sa copie grise. body est peint après html : ses copies jaunes passent par-dessus.

### 6. Le cadre

Les quatre copies grises ne font que se toucher : celle du haut finit en y = 110, où commencent celles des côtés, qui finissent en y = 190, où commence celle du bas.

- Les copies du haut et du bas sont les barres du haut et du bas du cadre, de x = 105 à 295.
- Entre y = 110 et 190, la copie de gauche va jusqu'à x = 124,92, et celle de droite commence en x = 275,08. Leurs 20px intérieurs sont les deux montants du cadre. Entre les deux, le bleu se voit : le trou, 150 × 80.
- Le reste des copies de côté va jusqu'aux bords du canevas : les bandes grises. Leurs copies jaunes s'arrêtent en x = 105,08 et commencent en x = 295,08, au bord extérieur du cadre.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- `zoom:2.5` donne à body une marge de 20px gratuite, et garde toutes les longueurs courtes. Sans lui, écrire les tailles de l'écran (`0 5pc,0 15pc,180q 10pc,-180q 10pc`, `margin:20` dans la règle `*` pour body, et `margin:-50 105 270` pour html) donne un code de 128 caractères, pour la même image.
- `&` désigne html en 1 caractère. Avec `html` à sa place, le code fait 124 caractères, pour la même image.
- `*` vise html et body en 1 caractère, et la règle `&` qui vient après fixe quand même la couleur de html. Avec `html,body{` à sa place (129 caractères), html garde le jaune : le cadre devient jaune, et 30 080 pixels changent.
- `2pc`, `6pc` et `4pc` font 32px, 96px et 64px en 3 caractères chacun. Avec des px (125 caractères), l'image est la même.
- `72q` fait 68,03px en 3 caractères, là où `68px` en prend 4.
- `#323B` fait 5 caractères. Le gris-bleu opaque, même sans `#` (`color:394257`), en prend 6 : 122 caractères, pour la même image.
- Pas besoin de `#` dans `color`, mais il en faut un dans `background`. Avec `background:479DBA` (120 caractères), Chrome ignore le fond : le canevas est blanc, le cadre est d'un gris violet clair, et 99 600 pixels changent.
- Un nombre sans unité dans `margin` : `-20px 42px 108px` donne un code de 127 caractères, pour la même image.
- Rien n'est fermé. Fermer la dernière règle et la balise style avec `}</style>` donne 130 caractères, 9 de plus, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel n'est pas exact au pixel près. Deux colonnes de 40 pixels, en x = 104 et x = 295, de y = 130 à 169, sont d'un jaune plus sombre, jusqu'à 15 d'écart sur un canal. C'est là que les barres jaunes des côtés touchent le cadre. Les ombres de côté se déplacent de 170,08px, pas de 170 : avec `68px` à la place de `72q`, mon rendu local n'a aucun pixel à plus de 8 de la cible. Le juge de CSS Battle donne au code 100 % de correspondance.
