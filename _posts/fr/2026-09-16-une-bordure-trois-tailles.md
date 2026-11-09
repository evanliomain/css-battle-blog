---
title: "Une bordure, trois tailles : une imprimante en 140 caractères"
lang: fr
ref: 2026-09-16
permalink: /fr/2026/09/16/une-bordure-trois-tailles/
description: "Comment une seule bordure, mesurée en ch et réduite par zoom, dessine la cible CSS Battle du 16 septembre 2026 : une imprimante brune avec sa feuille et son bac."
target: /assets/targets/2026-09-16.png
target_url: https://cssbattle.dev/play/4p0BAlG4T8ddxGUbcOhn
colors: ["#fae29e", "#743f3f"]
player: selenit
chars: 140
score: 705.33
match: 100
code: |
  <h2><style>*{background:#FAE29E;border:solid 6.3ch#743F3F;margin:-550-50}&{border-radius:53q 53q 0 0;margin:25%85;>*{zoom:.2;margin:8%25-400
---

La cible du 16 septembre est une imprimante brune sur jaune pâle : un corps arrondi en haut, un bac ouvert en bas, et une feuille qui dépasse en haut. La solution d'Ilya Streltsyn donne à tous les éléments la même bordure brune de `6.3ch`. Sur `html`, elle fait 50px et remplit la boîte : l'imprimante. Le `body`, zoomé à 0,2, a un cadre de 10px autour de son fond jaune : le bac. Un `<h2>` vide à l'intérieur, avec une police plus grande mais le même zoom, est une bordure de 15px de tous côtés : la feuille.

Cochez **Couleurs pédagogiques** pour voir quel élément dessine quelle partie.

{% include animations/2026-09-16.html lang=page.lang %}

## Le code, aéré

```css
<h2>
<style>
* {
  background: #FAE29E;
  border: solid 6.3ch #743F3F;      /* 50px ; 15px sur le h2 zoomé */
  margin: -550 -50;                 /* pour le h2 */
}
& {                                 /* html */
  border-radius: 53q 53q 0 0;       /* coins du haut arrondis */
  margin: 25% 85;                   /* 230 × 100 */
  > * {                             /* le body */
    zoom: .2;                       /* cinq fois plus petit */
    margin: 8% 25 -400;
  }
}
```

## Comment ça marche

### 1. html : une bordure épaisse

`*` donne à tous les éléments un fond jaune et `border:solid 6.3ch#743F3F`. `1ch` est la largeur d'un « 0 » dans la police courante : 8px dans la police par défaut de 16px. `6.3ch` font donc 50,4px, et Chrome arrondit l'épaisseur d'une bordure au pixel entier inférieur : 50.

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. `margin:25%85` met 25 % de 400 = 100 en haut et en bas, et 85 sur les côtés. En mode quirks, `html` prend la hauteur que ses marges laissent : 300 − 200 = 100. C'est une boîte de 230 × 100, de x = 85 à 315 et de y = 100 à 200. Avec 50 de bordure de chaque côté, il ne reste aucune hauteur pour son contenu : la boîte est toute brune. Son fond jaune va au canevas.

### 2. Le haut arrondi

`border-radius:53q 53q 0 0` arrondit les coins haut gauche et haut droit de 53 quarts de millimètre, 50,08px. C'est le corps de l'imprimante.

### 3. Le body zoomé : le bac

`>*` imbriqué dans `&` vise les enfants de `html` : le `head`, jamais affiché, et le `body`. `zoom:.2` rend le `body` cinq fois plus petit : sa bordure de 50px s'affiche en 10px.

`margin:8%25-400` est en pixels zoomés, sauf le % : une marge en % se calcule sur la largeur du parent, ici les 130px de contenu de `html`, donc 8 % font 10,4 à l'écran. Les marges de côté font 25 × 0,2 = 5 à l'écran : le `body` va de x = 135 + 5 = 140 à 260. Il commence 10,4 sous le contenu de `html`, en y = 160,39.

En mode quirks, le `body` remplit la hauteur de contenu de `html`, 0, moins ses propres marges. La marge basse fait −400, soit −80 à l'écran : 0 − 10,39 + 80 = 69,61. Le `body` va de y = 160,39 à 230 : un cadre à bordure de 10px et à l'intérieur jaune, qui dépasse sous `html`. C'est le bac.

### 4. Le h2 : la feuille

Le `<h2>` garde la marge de `*`, `-550-50`, mais il est dans le `body` zoomé : à l'écran, ça fait −110 en haut et −10 sur les côtés. Il va de x = 140 à 260, et son haut est 110 au-dessus du contenu du `body` : y = 60,39.

Un `<h2>` a une police de 1,5em, 24px : sa bordure de `6.3ch` fait 6,3 × 12 = 75,6, arrondis à 75, soit 15 à l'écran. Le `<h2>` est vide : il n'est que ses bordures haute et basse, 15 + 15 = 30 de haut, de y = 60,39 à 90,39. C'est la feuille au-dessus de l'imprimante.

## Notes de golf

- Une seule bordure dans `*` donne trois épaisseurs : `ch` suit la police, et `zoom` réduit le résultat.
- `6.3ch` font 50 sur `html`, 10 sur le `body` zoomé, 15 sur le `<h2>`.
- `zoom:.2` laisse le `body` reprendre les grandes valeurs de `*` en les réduisant.
- La marge du `<h2>` vient de la même règle `*` que tout le reste : `-550-50` n'a de sens qu'une fois zoomé.
- `25%85` et `8%25-400` se passent d'espace après `%`.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
