---
title: "Une liste d'ombres, deux couleurs : un contour en escalier en 118 caractères"
lang: fr
ref: 2026-08-30
permalink: /fr/2026/08/30/une-liste-d-ombres-deux-couleurs/
description: "Comment une seule liste de box-shadow, donnée à html en bleu foncé et au body en turquoise, dessine la cible CSS Battle du 30 août 2026 : un contour creux en escalier."
target: /assets/targets/2026-08-30.png
target_url: https://cssbattle.dev/play/cDcn0dlBGXZ9slTUGUqf
colors: ["#57c4c4", "#243D83"]
player: selenit
chars: 118
score: 729.91
match: 100
code: |
  <style>*{box-shadow:inset 0 2in,1em 1em,-1em -1em;color:57C4C4}&{color:243D83;background:#57C4C4;zoom:2.5;margin:36 40
---

La cible du 30 août est un contour bleu foncé sur fond turquoise : trois rectangles en escalier sur la diagonale, fondus en une seule forme creuse, avec un trait de 20px. La solution d'Ilya Streltsyn donne les trois mêmes ombres à deux boîtes, `html` et le `body`. Sur `html`, elles sont bleu foncé et dessinent trois rectangles pleins. Sur le `body`, 20px plus à l'intérieur, elles sont turquoise et les creusent.

Cochez **Couleurs pédagogiques** pour voir chacune des six ombres dans sa couleur.

{% include animations/2026-08-30.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                  /* html, head, style, body */
  box-shadow:
    inset 0 2in,                     /* remplit la boîte */
    1em 1em,                         /* une copie, en bas à droite */
    -1em -1em;                       /* une copie, en haut à gauche */
  color: 57C4C4;                     /* la couleur des ombres : turquoise */
}
& {                                  /* html */
  color: 243D83;                     /* ses ombres : bleu foncé */
  background: #57C4C4;               /* va au canevas */
  zoom: 2.5;
  margin: 36 40;                     /* 90 100 à l'écran */
}
```

## Comment ça marche

### 1. html, zoomé 2,5 fois

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. Son fond turquoise sert pour tout le canevas.

`zoom:2.5` grossit tout 2,5 fois : pour `html`, le canevas de 400 × 300 ne fait plus que 160 × 120px CSS. En mode quirks, `html` remplit la hauteur de la fenêtre. Avec `margin:36 40`, il fait 160 − 80 = 80 de large et 120 − 72 = 48 de haut. À l'écran, c'est une boîte de 200 × 120 en (100 ; 90). Les marges n'ont pas d'unité : le mode quirks les lit en px.

### 2. Une ombre interne qui remplit la boîte

Une ombre sans couleur prend `currentColor`. `*` met `color:57C4C4` sur chaque élément, mais la règle `&` donne `color:243D83` à `html`. Le mode quirks accepte les deux couleurs sans leur `#`. Les ombres de `html` sont donc bleu foncé.

`inset 0 2in` est une ombre interne décalée de 2in = 192px vers le bas. Une ombre interne peint toute la boîte sauf un « trou » de la taille de la boîte, ici décalé de 192px vers le bas. La boîte ne fait que 48px de haut : le trou en sort entièrement, et l'ombre remplit toute la boîte. Elle sert de fond qui reste sur la boîte : le vrai `background` de `html` part au canevas.

### 3. Deux copies à ±40

`1em 1em` et `-1em -1em` sont deux ombres externes de la taille de la boîte, sans flou. `html` a une taille de police de 16px : 1em vaut 16px, et le zoom en fait 40px à l'écran. Une copie est en (60 ; 50), l'autre en (140 ; 130). Avec la boîte en (100 ; 90), cela fait trois rectangles bleu foncé de 200 × 120 en escalier. Rendus seuls, ils couvrent toute la forme extérieure de la cible.

### 4. Le body, 20px plus à l'intérieur

Le `body` garde sa marge par défaut de 8px, soit 20px à l'écran. En mode quirks, il remplit la hauteur de `html` : 64 × 32px CSS, donc 160 × 80 en (120 ; 110). La règle `*` lui donne les trois mêmes ombres, mais le `body` garde `color:57C4C4` : ses ombres sont turquoise, la couleur du fond.

Son `inset 0 2in` le remplit de turquoise, comme à l'étape 2.

### 5. Ses deux copies creusent le contour

Les ombres à ±1em du `body` font aussi 40px à l'écran : deux rectangles turquoise de 160 × 80, en (80 ; 70) et (160 ; 150). Le `body` est dessiné par-dessus `html` : ils recouvrent le bleu.

Chaque rectangle turquoise est dans un rectangle bleu, à 20px de chaque bord : la marge de 8px du `body`, zoomée. Il reste donc un trait bleu foncé de 20px tout autour, et là où deux rectangles bleus se rejoignent, le trait suit les marches.

## Notes de golf

- Une seule règle `*` donne la même liste d'ombres à `html` et au `body`. Les deux boîtes ne diffèrent que par `color`, qui choisit la couleur des ombres.
- `inset 0 2in` remplit une boîte de sa propre couleur en 11 caractères. Tout décalage vertical plus grand que la hauteur de la boîte marche : j'ai vérifié que `1in` et `49px` donnent le même rendu.
- `zoom:2.5` fait de `1em` 40px, de la marge de 8px du `body` le trait de 20px, et donne des marges `36 40` au lieu de `90 100`.
- `&` est la façon la plus courte de viser `html`.
- `color:57C4C4` se passe du `#` grâce au mode quirks. Le `background` le garde : j'ai vérifié que `background:57C4C4` laisse le canevas blanc.
- `<style>` n'est jamais fermé, et la dernière accolade est omise.
