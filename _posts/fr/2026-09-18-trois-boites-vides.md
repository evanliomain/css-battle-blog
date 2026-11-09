---
title: "Trois boîtes vides : un crochet et un T en 158 caractères"
lang: fr
ref: 2026-09-18
permalink: /fr/2026/09/18/trois-boites-vides/
description: "Comment zoom:10 et trois boîtes réduites à leur bordure dessinent la cible CSS Battle du 18 septembre 2026 : un crochet jaune et un T couché."
target: /assets/targets/2026-09-18.png
target_url: https://cssbattle.dev/play/bgsT1tukudFAfXdKJGD2
colors: ["#4c4c6b", "#fae29e"]
player: benjamintordjman
chars: 158
score: 688.73
match: 100
code: |
  <p><style>*{border:1px solid#FAE29E;margin:5 17}&{zoom:10;background:#4C4C6B;margin:4 16 4 12;border-width:2 0 2 2;border-radius:4px 0 0 4px;p{margin:2-1 0-15
---

La cible du 18 septembre est jaune pâle sur fond ardoise : un crochet épais, arrondi à gauche, et à côté un T couché. La solution de Benjamin Tordjman agrandit la page dix fois et donne à tous les éléments une bordure jaune de 1px. `html` en garde trois côtés : le crochet. Le `body` et un `<p>` n'ont aucun contenu : il ne reste que leurs bordures, les deux barres du T.

Cochez **Couleurs pédagogiques** pour voir quelle boîte dessine quelle barre.

{% include animations/2026-09-18.html lang=page.lang %}

## Le code, aéré

```css
<p>
<style>
* {
  border: 1px solid #FAE29E;       /* 10px à l'écran */
  margin: 5 17;                    /* pour le body */
}
& {                                /* html */
  zoom: 10;                        /* tout est 10 fois plus grand */
  background: #4C4C6B;
  margin: 4 16 4 12;               /* une boîte de 12 × 22 */
  border-width: 2 0 2 2;           /* pas de côté droit */
  border-radius: 4px 0 0 4px;      /* coins gauches arrondis */
  p {
    margin: 2 -1 0 -15;            /* 16 de large */
  }
}
```

## Comment ça marche

### 1. html : un crochet

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. `zoom:10` agrandit `html` et tout son contenu dix fois : le cadre de 400 × 300 ne fait plus que 40 × 30 pixels CSS. Toutes les longueurs ci-dessous sont en pixels CSS, dix fois plus grandes à l'écran.

`margin:4 16 4 12` laisse à `html` 40 − 16 − 12 = 12 de large. Sans doctype, la page est en mode quirks, et `html` prend la hauteur que ses marges laissent : 30 − 4 − 4 = 22. À l'écran, il va de x = 120 à 240 et de y = 40 à 260.

`*` donne à tous les éléments `border:1px solid#FAE29E`. Pour `html`, `border-width:2 0 2 2` remplace les épaisseurs : 2 en haut, en bas et à gauche, 0 à droite. C'est un crochet ouvert à droite, avec des traits de 20px à l'écran.

### 2. Deux coins ronds

`border-radius:4px 0 0 4px` arrondit les coins haut gauche et bas gauche de 4, soit 40px à l'écran. Le bord intérieur de la bordure s'arrondit aussi, de 4 − 2 = 2 : le trait garde la même épaisseur dans la courbe.

### 3. Le body : une barre

Le `body` reçoit `margin:5 17` et la bordure de 1 de `*`. Dans `html`, il y a 12 − 2 = 10 de largeur de contenu. 17 + 17 de marge ne tiennent pas : la largeur du `body` tombe à 0. Sa marge gauche s'applique quand même : il commence en 12 + 2 + 17 = 31, soit x = 310 à l'écran.

En mode quirks, le `body` remplit la hauteur de contenu de `html` moins ses propres marges : 22 − 2 − 2 − 5 − 5 = 8. Une boîte de 0 de large et 8 de haut ne montre que ses bordures : la gauche et la droite collées, 2 de large en tout, et la haute et la basse, longues de 0. C'est une barre de 20 × 80 à l'écran, de x = 310 à 330 et de y = 110 à 190.

### 4. Le p : la seconde barre

Le `<p>` est vide : 0 de haut, seule sa bordure compte, 1 + 1 = 2 de haut. `p{margin:2-1 0-15}` est imbriqué dans `&` : il passe avant la marge de `*`. Le `<p>` commence 2 sous le haut du contenu du `body`, en y = 140 à l'écran.

Ses marges de −15 à gauche et de −1 à droite l'élargissent au-delà du `body` de 0 de large : 0 + 15 + 1 = 16 de large, de x = 170 à 330 à l'écran. C'est une barre de 160 × 20 qui finit sur le bord droit de la barre du `body` : le T couché.

## Notes de golf

- `zoom:10` garde chaque longueur à un ou deux chiffres, et des bordures de `1px` deviennent des traits de 10px.
- Une seule `border` dans `*` dessine les trois formes ; seul `html` a besoin de son propre `border-width`.
- Des boîtes sans contenu ne sont que leurs bordures : le `body` est réduit à 0 de large par ses marges, le `<p>` n'a rien dedans.
- Les marges négatives rendent le `<p>` plus large que son parent de 0 de large.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
