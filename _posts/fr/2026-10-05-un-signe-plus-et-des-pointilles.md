---
title: "Un signe plus et des pointillés : une manette en 163 caractères"
lang: fr
ref: 2026-10-05
permalink: /fr/2026/10/05/un-signe-plus-et-des-pointilles/
description: "Comment une bordure en pointillés et un signe plus géant, épaissi par un contour, dessinent la cible CSS Battle du 5 octobre 2026 : une manette avec sa croix et quatre boutons."
target: /assets/targets/2026-10-05.png
target_url: https://cssbattle.dev/play/kKeIFq1dBXUmV9k1c7d0
colors: ["#f7cb71", "#4d52d0", "#d16161"]
player: emohdaziz
chars: 163
score: 684.6
match: 100
code: |
  +<style>&{background:#f7cb71;border-inline:53Q dotted;border-left-color:4d52d0;margin:90 40 90 240;color:d16161;*{-webkit-text-stroke:55q;margin:-24-231;font:909%a
---

La cible du 5 octobre ressemble à une manette sur fond jaune : une grosse croix corail à gauche, et quatre disques à droite, deux bleus et deux corail. Mohamed Ali dessine les quatre disques avec une seule bordure en pointillés, et la croix avec un seul caractère : un `+`, écrit en 145px et épaissi par un contour de texte.

{% include animations/2026-10-05.html lang=page.lang %}

## Le code, aéré

```css
/* "+" : le seul texte de la page, dans body */
& {                                 /* html */
  background: #f7cb71;
  border-inline: 53Q dotted;        /* bordures gauche et droite, ≈50px */
  border-left-color: 4d52d0;
  margin: 90 40 90 240;
  color: d16161;                    /* bordure droite et texte */
  * {                               /* body (head et style restent cachés) */
    -webkit-text-stroke: 55q;       /* ≈52px */
    margin: -24 -231;
    font: 909% a;
  }
}
```

## Comment ça marche

### 1. html : une boîte de 120×120

Au premier niveau, `&`, c'est `html`. Son fond est celui de la racine : le jaune couvre tout le canevas.

`margin:90 40 90 240` laisse 400 − 280 = 120px de large. CSS Battle affiche la page en mode quirks, où `html` remplit le cadre moins ses marges : 300 − 90 − 90 = 120px de haut. Une boîte de 120×120 en (240, 90).

### 2. Une bordure en pointillés, c'est une rangée de disques

`border-inline:53Q dotted` donne à `html` une bordure à gauche et à droite. 53Q font 50,08px, que Chrome dessine sur 50px.

Chrome dessine une bordure `dotted` avec des points ronds, aussi larges que la bordure. Chaque point est donc un disque de 50px. Sur un côté de 120px, il en tient deux, avec 20px d'écart : de y 90 à 140, et de y 160 à 210. Entre les deux bordures, la boîte de contenu fait 120 − 2 × 50 = 20px de large. Les quatre disques sont centrés en x=265 et x=335, y=115 et y=185.

### 3. Deux couleurs pour les disques

La bordure n'a pas de couleur, elle prend donc `color` : `d16161`, le corail. En mode quirks, une couleur peut se passer de son `#`, d'où `color:d16161` et `border-left-color:4d52d0`. Ce dernier ne passe en bleu que la bordure de gauche : deux disques bleus, deux corail.

### 4. body : la place pour une ligne

Le `*` imbriqué vise tout ce qui est dans `html`. `head` et le `<style>` sont cachés : seul `body` se voit. Il part de la boîte de contenu de `html`, large de 20px, et `margin:-24-231` (−24px en haut et en bas, −231px sur les côtés) l'élargit à 482×168, à partir de (59, 66). Il ne sert qu'à porter la ligne où se trouve le `+`.

### 5. Un signe plus en 145px

Le `+` écrit avant `<style>` est le texte du `body`. `font:909%a` est le raccourci `font` valide le plus court : une taille et une famille.

- 909 % des 16px hérités, ça fait 145,44px.
- `a` n'est pas une vraie police : le navigateur se rabat sur sa police par défaut.

Le texte prend la `color` de `html`, le corail. À cette taille, le signe plus est grand, mais ses traits ne font que quelques pixels d'épaisseur.

### 6. Le contour de texte en fait une croix

`-webkit-text-stroke:55q` trace un contour autour du glyphe. 55q font 51,97px, et le contour est centré sur le bord du glyphe : il déborde d'environ 26px vers l'extérieur, de tous les côtés, dans la couleur du texte. Le plus fin devient la croix de la cible : 120×120, avec des bras d'environ 60px d'épaisseur, entre x 40 et 160, y 90 et 210. Les coins restent carrés.

## Notes de golf

- Une seule bordure `dotted` dessine quatre disques ; `border-left-color` les répartit en deux couleurs.
- Un seul caractère, `+`, dessine toute la croix.
- `font:909%a` : une taille en pourcentage et une famille d'une lettre, qui n'existe pas.
- `color:d16161` et `border-left-color:4d52d0` : pas de `#` en mode quirks.
- `53Q` (50px) et `55q` (52px) font 3 caractères chacun.
- Pas besoin d'espace dans `-24-231`.

## Si vous l'essayez chez vous

La croix est un glyphe de la police par défaut, et cette police n'est pas la même sur tous les systèmes. Dans le dernier Chrome sur Mac (version 156 au moment d'écrire ces lignes), la police par défaut est Times : écrire `font:909% Times` au lieu de `909%a` donne exactement la même image, et `Arial` déplace encore la croix. Avec Times, la croix fait environ 124×125, de x 38 à 161 et de y 98 à 222 : 8px trop bas, et l'image ne correspond plus. La croix de la cible fait 120×120 en (40, 90), avec des bras de 59px, et l'animation ci-dessus reprend cette géométrie. Sur le juge de CSS Battle, la solution est identique à 100 %.
