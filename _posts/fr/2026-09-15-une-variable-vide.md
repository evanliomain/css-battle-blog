---
title: "Une variable vide : un trèfle en 146 caractères"
lang: fr
ref: 2026-09-15
permalink: /fr/2026/09/15/une-variable-vide/
description: "Comment quatre images vides, un border-radius avec une variable vide et un demi-tour dessinent la cible CSS Battle du 15 septembre 2026 : un trèfle à quatre feuilles."
target: /assets/targets/2026-09-15.png
target_url: https://cssbattle.dev/play/5ZezM7kuEUF3qoAOjCIx
colors: ["#993576", "#5adab8"]
player: gunnar
chars: 146
score: 699.48
match: 100
code: |
  <img><img><p><img><img><style>&{background:#993576}p{scale:-1}img{margin:22-52 2 72;border:59q solid#5ADAB8;border-radius:64%var(--r,64%)0;+&{--r:
---

La cible du 15 septembre est un trèfle à quatre feuilles vert d'eau sur fond prune : deux gouttes et deux feuilles, rangées en carré. La solution de Gunnar Bittersmann dessine quatre `<img>` vides comme des carrés pleins, avec un seul `border-radius` partagé. Dans chaque paire, la première image est une goutte, et la seconde, grâce à une variable vide, est une feuille. La seconde paire est dans un `<p>`, qui fait un demi-tour.

Cochez **Couleurs pédagogiques** pour voir la seconde image de chaque paire.

{% include animations/2026-09-15.html lang=page.lang %}

## Le code, aéré

```css
<img><img><p><img><img>            /* deux paires, la seconde dans un p */
<style>
& { background: #993576 }          /* html */
p { scale: -1 }                    /* un demi-tour */
img {
  margin: 22 -52 2 72;
  border: 59q solid #5ADAB8;       /* 55px : un carré de 110 × 110 */
  border-radius: 64% var(--r, 64%) 0;
  + & { --r: }                     /* une img après une img : --r vide */
}
```

## Comment ça marche

### 1. Quatre images carrées

Une `<img>` sans source est une boîte en ligne vide. `border:59q solid#5ADAB8` lui donne une bordure de 59 quarts de millimètre : 55,75px, arrondis par Chrome à 55. Sans contenu, chaque image est un carré plein de 110 × 110.

`margin:22-52 2 72` les place. Sur une ligne, chaque image commence 72 après la précédente, moins 52 : un écart de 20px. La première est en x = 8 + 72 = 80, la deuxième en 80 + 110 − 52 + 72 = 210, toutes deux en y = 8 + 22 = 30.

`<p>` ouvre un nouveau bloc, avec les deux dernières images dedans, sur la ligne suivante. Sans retournement, elles seraient aussi en x = 80 et 210, de y = 180 à 290.

### 2. Trois coins ronds : une goutte

`border-radius:64%var(--r,64%)0` a trois valeurs : haut gauche, puis haut droit et bas gauche, puis bas droit. `--r` n'est pas défini : `var(--r,64%)` prend sa valeur de repli, `64% 64% 0`. Trois coins ronds, et un coin carré en bas à droite.

64 % de 110 font 70,4, et deux coins de 70,4 sur un côté de 110 ne tiennent pas : Chrome réduit tous les rayons du même facteur, à 55. Les trois coins deviennent des demi-cercles : une goutte.

### 3. Une variable vide : une feuille

`+&` imbriqué dans `img` vise une `img` juste après une autre `img` : la seconde image de chaque paire. Elle reçoit `--r:` sans aucune valeur : c'est une variable vide, pas une variable absente. `var(--r,64%)` est donc remplacé par rien, et le rayon devient `64% 0` : deux valeurs, haut gauche et bas droit ronds, haut droit et bas gauche carrés.

Cette fois, deux coins ronds ne partagent jamais un côté : rien n'est réduit, les coins gardent leurs 70,4px. C'est une feuille, pointue sur sa diagonale.

### 4. Le p fait un demi-tour

`p{scale:-1}` applique une échelle de −1 au `<p>` sur les deux axes, autour de son centre (200 ; 225) : un demi-tour. Sa goutte, à gauche, passe en bas à droite, tournée avec son coin carré en haut à gauche. Sa feuille passe en bas à gauche. Les deux vont de y = 160 à 270, et les quatre formes font le trèfle.

## Notes de golf

- Une seule règle `img` dessine les quatre formes : la bordure les remplit, le rayon les façonne.
- `var(--r,64%)` avec une valeur de repli, puis `--r:` laissée vide, éteint une valeur pour une image sur deux.
- `+&{--r:` termine le code : la valeur vide est fermée par la fin de la feuille de style.
- Les rayons trop grands sont réduits en demi-cercles gratuitement : `64%` donne à la fois une goutte (55) et une feuille (70,4).
- `scale:-1` sur le `<p>` retourne la seconde paire, au lieu d'écrire deux formes de plus.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
