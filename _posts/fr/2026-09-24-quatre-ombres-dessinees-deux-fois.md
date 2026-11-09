---
title: "Quatre ombres, dessinées deux fois : une croix en 125 caractères"
lang: fr
ref: 2026-09-24
permalink: /fr/2026/09/24/quatre-ombres-dessinees-deux-fois/
description: "Comment quatre ombres sur deux boîtes de taille nulle, dont une retournée, dessinent la cible CSS Battle du 24 septembre 2026 : une croix bleu nuit et deux carrés."
target: /assets/targets/2026-09-24.png
target_url: https://cssbattle.dev/play/dbRkR8Cx8tq9nua91PB7
colors: ["#fade8b", "#3a4b86"]
player: kieron
chars: 125
score: 721.52
match: 100
code: |
  <style>*{scale:-1;background:#fade8b;margin:37.5%50%;color:3A4B86;box-shadow:0 0 0 5ch,5pc 0 0 5ch,0 5pc 0 5ch,-5lh 5lh 0 32Q
---

La cible du 24 septembre est bleu nuit sur jaune pâle : une croix épaisse, un petit carré en haut à droite et un autre en bas à gauche. Toute l'image reste la même après un demi-tour. La solution de Kieron s'en sert : une seule règle donne à `html` et au `body` les quatre mêmes ombres, autour du même point. `scale:-1` fait faire un demi-tour aux ombres de `html`, et le `body`, retourné deux fois, garde les siennes à l'endroit. Quatre ombres écrites une fois font les huit formes.

Cochez **Couleurs pédagogiques** pour voir quelles ombres viennent de `html` et lesquelles du `body`.

{% include animations/2026-09-24.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html et body */
  scale: -1;                       /* un demi-tour chacun */
  background: #fade8b;
  margin: 37.5% 50%;               /* 150 et 200 : une boîte de 0 × 0 */
  color: 3A4B86;                   /* un hex sans # passe en mode quirks */
  box-shadow:
    0 0 0 5ch,                     /* carré du centre, 80 × 80 */
    5pc 0 0 5ch,                   /* bras de droite */
    0 5pc 0 5ch,                   /* bras du bas */
    -5lh 5lh 0 32Q;                /* petit carré, en bas à gauche */
}
```

## Comment ça marche

### 1. Deux boîtes réduites à un point

`*` vise tous les éléments : `html`, le `head` (jamais affiché), le `body` et le `<style>` (pas affiché non plus). Seuls `html` et le `body` comptent.

Une marge en % se calcule sur la largeur du bloc qui contient l'élément. Pour `html`, c'est le cadre de 400px : `37.5%50%` donne 150px en haut et en bas, et 200px sur les côtés. `html` fait 400 − 200 − 200 = 0 de large. Sans doctype, la page est en mode quirks, et `html` prend la hauteur que ses marges laissent : 300 − 150 − 150 = 0. `html` est un point en (200 ; 150).

Le `body` reçoit la même `margin:37.5%50%`, mais dans `html`, qui fait 0 de large : toutes ses marges valent 0. Le `body` est lui aussi un point, au même endroit.

### 2. Une ombre : le carré du centre

Une ombre sans décalage ni flou, étalée de `5ch`, est une copie de la boîte, plus grande de 5ch tout autour. `1ch` est la largeur d'un « 0 » dans la police par défaut de 16px : 8px, donc `5ch` font 40px. Autour d'un point, ça donne un carré de 80 × 80, de (160 ; 110) à (240 ; 190).

Une ombre sans couleur prend celle du texte : `color:3A4B86`, un hex sans `#`, que le mode quirks accepte pour `color`.

### 3. Trois ombres de plus

`5pc 0 0 5ch` est le même carré, décalé de 5pc = 80px vers la droite : le bras de droite. `0 5pc 0 5ch` le décale de 80px vers le bas : le bras du bas.

`-5lh 5lh 0 32Q` s'étale de `32Q` = 30,24px : c'est un carré de 60,48. `lh` est la hauteur de ligne, 18px ici : il est décalé de 90px à gauche et de 90px vers le bas, son centre est en (110 ; 240). C'est le petit carré en bas à gauche.

### 4. scale:-1 sur html : un demi-tour

`scale:-1` applique une échelle de −1 sur les deux axes, autour du centre de la boîte. Pour `html`, ce centre est le point (200 ; 150). Retourner les deux axes, c'est faire un demi-tour. Les ombres de `html` passent de l'autre côté : le bras de gauche, le bras du haut, et le petit carré en haut à droite. Le carré du centre ne bouge pas.

### 5. Le body, retourné deux fois

Le `body` a les quatre mêmes ombres et son propre `scale:-1`, autour du même point. Il est dessiné dans `html`, déjà retourné. Deux demi-tours autour du même point s'annulent : les ombres du `body` restent à l'endroit, le bras de droite, le bras du bas et le petit carré en bas à gauche.

Ensemble, `html` et le `body` dessinent la croix entière et les deux carrés opposés. Le canevas garde le jaune pâle : le fond de `html` sert pour tout le canevas, sans retournement.

## Notes de golf

- L'image reste la même après un demi-tour : la moitié suffit, et `scale:-1` sur `*` dessine l'autre moitié.
- `scale:-1` sur les deux éléments, dans une seule règle, ne retourne qu'un jeu d'ombres : les deux retournements du `body` s'annulent.
- `margin:37.5%50%` réduit `html` à un point au centre, et la même valeur donne 0 pour le `body`.
- Quatre unités différentes donnent les quatre longueurs en 3 caractères chacune : `5ch` = 40, `5pc` = 80, `5lh` = 90, `32Q` = 30,24.
- `color:3A4B86` colore toutes les ombres d'un coup, sans `#`.
- Pas d'accolade fermante, et `<style>` n'est jamais fermé.
