---
title: "Une bordure, un quart de tour : une équerre en double trait en 105 caractères"
lang: fr
ref: 2026-11-08
permalink: /fr/2026/11/08/une-bordure-un-quart-de-tour/
description: "Comment une seule bordure double, donnée à html et à un body tourné, dessine la cible CSS Battle du 8 novembre 2026 : quatre barres bleues autour d'un coin."
target: /assets/targets/2026-11-08.png
target_url: https://cssbattle.dev/play/rEKvTN92AC1WV2cGoZCp
colors: ["#469dba", "#fae29e"]
player: benjamintordjman
chars: 105
score: 747.04
match: 100
code: |
  <style>*{border-top:96q double#469DBA;margin:60 170 90 110;*{background:#FAE29E;margin:-90 0;rotate:90deg
---

La cible du 8 novembre est un coin tracé en double trait : quatre barres bleues de 30px d'épaisseur sur un fond jaune pâle. Deux sont horizontales, deux verticales, et elles ne se rejoignent jamais au coin. La solution de Benjamin Tordjman n'écrit qu'une bordure, une bordure haute double de 90px. `html` s'en sert pour les deux barres horizontales. Le `body` reçoit la même bordure, puis fait un quart de tour, et ses deux barres deviennent les barres verticales.

Cochez **Couleurs pédagogiques** pour distinguer les barres du `body` de celles de `html`.

{% include animations/2026-11-08.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                 /* html et body */
  border-top: 96q double #469DBA;   /* 90px : trait 30, vide 30, trait 30 */
  margin: 60 170 90 110;            /* html : 120 × 150 */
  * {                               /* body */
    background: #FAE29E;            /* part sur le canevas */
    margin: -90 0;                  /* 240px de haut, depuis y = 60 */
    rotate: 90deg;                  /* quart de tour */
  }
}
```

## Comment ça marche

### 1. html est une boîte de 120 × 150

`*` vise tous les éléments : `html` et le `body` (et `head` et `style`, qui ne s'affichent pas). La règle imbriquée donne ensuite au `body` sa propre marge. `html` garde `margin:60 170 90 110`. Sa largeur vaut 400 − 170 − 110 = 120px, de x = 110 à 230. CSS Battle tourne en mode quirks, où `html` remplit la fenêtre moins ses marges haute et basse : 300 − 60 − 90 = 150px, de y = 60 à 210.

`html` n'a pas de fond : le `#FAE29E` du `body` sert donc à tout le canevas. Le `body` lui-même ne peint pas de fond.

### 2. Une bordure double dessine deux barres

`96q` fait 96 quarts de millimètre : 90,71px. Chrome arrondit une épaisseur de bordure au pixel inférieur, donc la bordure fait 90px. Le style `double` la coupe en trois parts égales : un trait de 30px, un vide de 30px, un trait de 30px. Sur `html`, cela donne les deux barres horizontales : x de 110 à 230, y de 60 à 90 et de 120 à 150.

### 3. Des marges négatives étirent le body

Sous sa bordure de 90px, `html` a 60px de contenu, de y = 150 à 210. En mode quirks, le `body` remplit cette hauteur moins ses propres marges haute et basse. Avec `margin:-90 0`, il gagne 90px à chaque bout : 60 + 90 + 90 = 240px. Le `body` va donc de y = 60 à 300, et de x = 110 à 230, aussi large que `html`. J'ai vérifié que cette hauteur vient bien de la marge basse de `html` : avec `margin-bottom:30` sur `html`, le `body` fait 300px de haut.

### 4. Le body reçoit la même bordure

Le `*` du dehors vise aussi le `body` : il a lui aussi la bordure haute double. Son haut est en y = 60, comme celui de `html`, et il a la même largeur : ses deux barres tombent pile sur celles de `html`. Pour l'instant, rien de neuf ne se voit.

### 5. Un quart de tour

`rotate:90deg` fait tourner le `body` autour de son centre, dans le sens des aiguilles d'une montre. La boîte fait 120 × 240, avec son coin haut gauche en (110 ; 60) : son centre est donc (170 ; 180). Après le quart de tour, elle fait 240 × 120, de x = 50 à 290 et de y = 120 à 240. Son bord haut est maintenant à droite. Son trait extérieur, de 120 à 90px au-dessus du centre, devient la barre de x = 260 à 290. Son trait intérieur, de 60 à 30px au-dessus du centre, devient la barre de x = 200 à 230. Les deux vont de y = 120 à 240.

La boîte tournée ne cache rien : son fond est parti au canevas. Là où la barre en x = 200 croise la barre basse de `html`, les deux sont bleues. Les deux barres verticales viennent du `body` et les deux horizontales de `html` : rien ne relie les barres extérieures au coin. C'est l'écart de la cible.

## Notes de golf

- Un seul `border-top` sur `*` dessine les quatre barres. `rotate:90deg` est dans la règle imbriquée : il ne fait tourner que le `body`.
- `96q` fait 3 caractères pour 90px, parce que l'épaisseur est arrondie à 90. `90px` en fait 4.
- Le style `double` donne en un mot deux barres égales et l'écart entre elles.
- La hauteur du `body` est gratuite : en mode quirks, elle suit `html`, et `margin:-90 0` le remonte et lui donne 240px de haut d'un coup.
- `double#469DBA` n'a pas besoin d'espace avant le `#`.
- Aucune accolade fermante, et `<style>` n'est jamais fermé.
