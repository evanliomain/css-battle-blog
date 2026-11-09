---
title: "Deux ombres, deux boîtes : un cadre ouvert en 118 caractères"
lang: fr
ref: 2026-09-05
permalink: /fr/2026/09/05/deux-ombres-deux-boites/
description: "Comment deux ombres partagées par html et le body, avec une hauteur de ligne qui tombe à 0, dessinent la cible CSS Battle du 5 septembre 2026 : un cadre noir ouvert sur fond orange."
target: /assets/targets/2026-09-05.png
target_url: https://cssbattle.dev/play/PBllh6aGfOPa9BtjR5m1
colors: ["#f8b140", "#000000", "#ffffff"]
player: fmata
chars: 118
score: 729.91
match: 100
code: |
  <style>&{border-radius:63q}*{box-shadow:inset 0 0 0 32q,-32q 0 0 8lh#F8B140;margin:10%90;*{margin:32%160 32%30;font:0'
---

La cible du 5 septembre est un épais cadre noir arrondi sur fond orange, à l'intérieur blanc. Son côté gauche est ouvert au milieu, avec un petit bloc noir juste à l'intérieur de l'ouverture. La solution de fmata donne à `html` et au `body` les deux mêmes ombres. Sur `html`, l'ombre intérieure est le cadre, et l'ombre extérieure, étalée de `8lh`, est le fond orange. Sur le `body`, une police de 0 fait valoir 0 à `8lh` : son ombre intérieure le remplit, c'est le bloc noir, et son ombre orange, plus étalée, ouvre le cadre.

Cochez **Couleurs pédagogiques** pour voir l'ombre orange du `body` en rose.

{% include animations/2026-09-05.html lang=page.lang %}

## Le code, aéré

```css
<style>
& { border-radius: 63q }             /* html : coins de 59,5px */
* {                                  /* html, puis le body */
  box-shadow:
    inset 0 0 0 32q,                 /* noire, 30,24px vers l'intérieur */
    -32q 0 0 8lh #F8B140;            /* orange, 30,24 à gauche, étalée de 8lh */
  margin: 10% 90;
  * {                                /* le body */
    margin: 32% 160 32% 30;
    font: 0 '';                      /* police de 0 : 8lh = 0 */
  }
}
```

## Comment ça marche

### 1. html : un cadre noir

`*` donne à `html` `margin:10%90`. Une marge en % se calcule sur la largeur : 10 % de 400 = 40 en haut et en bas, et 90 sur les côtés. `html` fait 220 de large, de x = 90 à 310, et en mode quirks 300 − 80 = 220 de haut, de y = 40 à 260. `&{border-radius:63q}` arrondit ses coins de 59,5px.

La première ombre, `inset 0 0 0 32q`, se dessine à l'intérieur de la boîte : une bande de 32q (30,24px) le long de son bord arrondi. Sans couleur, elle prend celle du texte, noir. `html` n'a pas de fond : son intérieur reste blanc. Un cadre noir.

### 2. L'ombre orange couvre le reste

La seconde ombre, `-32q 0 0 8lh#F8B140`, est une copie orange de la boîte, décalée de 30,24px à gauche et étalée de `8lh`. `lh` est la hauteur de ligne, 18px ici : l'étalement fait 144px, et la copie couvre tout le canevas.

Une ombre ne se peint jamais sous sa propre boîte. L'orange s'arrête donc au bord arrondi de `html`, et le cadre et l'intérieur blanc restent tels quels. L'orange, c'est le fond.

### 3. Le body : un bloc noir

`*` imbriqué donne au `body` `margin:32%160 32%30`. Les % se calculent sur les 220px de large de `html` : 32 % font 70,4 en haut et en bas. Avec 30 à gauche et 160 à droite, le `body` va de x = 120 à 150, et de y = 110,4 à 189,6 (en mode quirks, il remplit `html` moins ses marges : 220 − 140,8 = 79,2).

Il reçoit les deux mêmes ombres. L'ombre intérieure fait 30,24px, et le `body` ne fait que 30 de large : il est rempli de noir. C'est le bloc juste à l'intérieur du cadre.

### 4. Une police nulle ouvre le cadre

`font:0'` met la taille de police du `body` à 0. Sa hauteur de ligne est `normal`, qui vaut 0 pour une police de 0 : `8lh` vaut 0. L'ombre orange n'est plus étalée : c'est juste une copie du `body`, décalée de 30,24px à gauche, de x = 89,8 à 119,8, sur le côté gauche du cadre. La partie sous le `body` lui-même n'est pas peinte. C'est l'ouverture du cadre.

## Notes de golf

- Deux ombres dans `*` font quatre travaux : le cadre et le fond sur `html`, le bloc et l'ouverture sur le `body`.
- `8lh` passe de 144px à 0 rien qu'en mettant la police du `body` à 0.
- L'immense ombre orange peint le fond sans toucher la boîte arrondie de `html`.
- `10%90` et `32%160 32%30` utilisent des marges en % sur deux largeurs différentes.
- `32q` sert à la fois d'épaisseur au cadre et de décalage à l'ouverture : les deux s'alignent.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
