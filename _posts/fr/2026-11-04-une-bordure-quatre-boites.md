---
title: "Une bordure, quatre boîtes : trois arches en 171 caractères"
lang: fr
ref: 2026-11-04
permalink: /fr/2026/11/04/une-bordure-quatre-boites/
description: "Comment une seule règle de bordure, un zoom de 5 et deux balises img vides dessinent la cible CSS Battle du 4 novembre 2026 : une ligne corail qui se soulève en trois arches."
target: /assets/targets/2026-11-04.png
target_url: https://cssbattle.dev/play/RbDuoqqerMZQNioN9XHm
colors: ["#2f5a76", "#de6b67"]
player: benjamintordjman
chars: 171
score: 678.39
match: 100
code: |
  <img><img><style>*{background:#2F5A76;border:solid#DE6B67;border-width:4 4 0}&{zoom:5;margin:46 6;*{margin:-70%23 0;border-radius:9q 9q 0 0;*{margin:20-73 0 17;padding:7 3
---

La cible du 4 novembre est une épaisse ligne corail sur un fond bleu ardoise. Elle court en bas et se soulève en trois arches : une haute et étroite au milieu, deux basses de chaque côté. La solution de Benjamin Tordjman donne une seule règle de bordure à quatre boîtes : `html` fait la ligne, le `body` la grande arche, et deux `<img>` vides les petites. Un `zoom:5` garde tous les nombres petits.

Passez en **Vue large** pour voir la marge du bas de `html` et l'endroit où irait la seconde `<img>` sans sa marge négative.

{% include animations/2026-11-04.html lang=page.lang %}

## Le code, aéré

```css
<img><img>                        /* deux boîtes vides, dans le body */
<style>
* {                               /* tous les éléments */
  background: #2F5A76;
  border: solid #DE6B67;
  border-width: 4 4 0;            /* en haut et sur les côtés, pas en bas */
}
& {                               /* html */
  zoom: 5;                        /* tout ce qu'il contient est 5 fois plus grand */
  margin: 46 6;
  * {                             /* body (et les img) */
    margin: -70% 23 0;
    border-radius: 9q 9q 0 0;
    * {                           /* les deux img */
      margin: 20 -73 0 17;
      padding: 7 3;
    }
  }
}
```

## Comment ça marche

### 1. zoom:5, puis des petits nombres

`&`, au premier niveau, c'est `html`. `zoom:5` agrandit `html` et tout ce qu'il contient 5 fois : chaque pixel CSS couvre 5 pixels à l'écran. Le code écrit donc `4` pour une bordure de 20px, `46` pour une marge de 230px, etc. Dans la suite, les « px CSS » sont les nombres du code, et les « px » tout court des pixels de l'écran.

### 2. html n'est qu'une bordure

CSS Battle tourne en mode quirks, où `html` remplit la fenêtre moins ses marges. Avec le zoom, la fenêtre fait 300 / 5 = 60 px CSS de haut, et les marges en prennent 2 × 46 = 92 : la hauteur vaudrait −32, elle vaut donc 0. Il reste la bordure : 20px en haut, rien en bas. La boîte de `html` est une barre corail de 340 × 20 en (30, 230), la ligne du bas de la cible. Ses bordures de côté sont des carrés de 20 × 20 dans cette barre.

Son fond est le bleu du canevas : la boîte elle-même ne se voit jamais.

### 3. Une marge de −70 % remonte le body

Une marge en % se calcule sur la largeur du parent, même en haut. Le contenu de `html` fait 340 / 5 − 2 × 4 = 60 px CSS de large, donc `-70%` vaut −42 px CSS : le `body` commence 210px au-dessus de la barre, en y = 40.

La même valeur fixe sa hauteur. En mode quirks, le `body` remplit `html` moins ses propres marges : 0 − (−42) = 42 px CSS, soit 210px. Et `23` de chaque côté laisse 60 − 46 = 14 px CSS, 70px de large. Le `body` est donc une boîte de 70 × 210, de (165, 40) jusqu'à la barre.

### 4. La grande arche

Le `body` reçoit la même bordure corail : 20px en haut et sur les côtés, ouverte en bas. `border-radius:9q 9q 0 0` fait 9 quarts de millimètre, 8,5 px CSS. C'est plus que la moitié de ses 14 px CSS de large : le navigateur réduit les deux rayons du haut jusqu'à ce qu'ils tiennent, et le haut devient un demi-cercle, le bord intérieur un plus petit. Le fond bleu du `body` recouvre la barre entre ses pieds.

### 5. Deux balises img vides

Une `<img>` sans source n'a pas de taille à elle. Elle garde sa bordure et son `padding:7 3` : 3 + 4 + 4 + 3 = 14 px CSS de large et 7 + 7 + 4 = 18 de haut, soit 70 × 90. Ce sont des éléments en ligne, posés sur la ligne du `body` : une marge de `20` en haut les descend à y = 160, le bas sur la barre. Ce sont aussi des descendants de `html` : elles reçoivent le même `border-radius` et deviennent de petites arches.

### 6. Une marge droite négative met la seconde à gauche

Les deux `<img>` reçoivent la même `margin:20 -73 0 17`. La première commence 17 px CSS après le bord du contenu du `body` : x = 185 + 85 = 270. Elle finit en 340, et sa marge droite de −73 px CSS (−365px) ramène la ligne en x = −25. La seconde ajoute ses 85px de marge gauche et se pose en x = 60. C'est le symétrique de la première autour de x = 200, sans aucun sélecteur pour distinguer les deux.

## Notes de golf

- `zoom:5` sur `html` divise toutes les longueurs par 5 : `4` au lieu de `20`, `46 6` au lieu de `230 30`.
- `<img><img>` donne deux boîtes pour 10 caractères. Vides, elles se résument à leur padding et à leur bordure.
- Une seule règle `*` donne le fond et la bordure aux quatre boîtes. `border-width:4 4 0` enlève celle du bas.
- `-70%` fixe à la fois la position du `body` et, par le mode quirks, sa hauteur.
- `9q` est le rayon le plus court assez grand pour un demi-cercle sur une boîte de 14px. `border-radius` exige une unité, même en mode quirks.
- `solid#DE6B67`, `-70%23` et `20-73` se passent d'espace : le `#`, le `%` et le signe moins terminent le mot d'avant.
- `&` désigne `html`, et `<style>` n'est jamais fermé.
