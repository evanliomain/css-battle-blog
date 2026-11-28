---
title: "Un mod() pour deux boîtes : deux cadres fusionnés et un demi-anneau en 143 caractères"
lang: fr
ref: 2026-11-27
permalink: /fr/2026/11/27/un-mod-pour-deux-boites/
description: "Comment une seule règle pour html et body, corner-shape:notch et un border-radius avec mod(90%,183q) dessinent la cible CSS Battle du 27 novembre 2026 : deux cadres violets fusionnés et un demi-anneau sur fond beige."
target: /assets/targets/2026-11-27.png
target_url: https://cssbattle.dev/play/IliOlRSdOvAmbti4hgiq
colors: ["#411c56", "#dc26"]
player: evanliomain
chars: 143
score: 702.36
match: 100
code: |
  <style>*{border:5vw solid#411c56;border-radius:95q 0 0 95q/mod(90%,183q);margin:10%100;padding:30 20 6%10}&{corner-shape:notch;background:#dc26
---

La cible du 27 novembre est beige, avec un contour violet autour de deux cadres fusionnés en un seul : un large, et un haut et étroit à sa droite. Un demi-anneau violet est collé au bord droit, à l'intérieur. Je la dessine avec `html` et `body` seulement, et une seule règle pour les deux. `html` est le cadre : `corner-shape:notch` découpe ses deux coins gauches en encoches droites. Le `body` est le demi-anneau. Le même `border-radius` donne à chaque boîte les coins qu'il lui faut, parce que `mod(90%,183q)` ne rend pas la même valeur sur une boîte de 220px et sur une boîte de 100px.

Les **couleurs pédagogiques** séparent `html` et le `body` : en vraies couleurs, leurs bordures droites ne font qu'une barre.

{% include animations/2026-11-27.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                         /* html et body */
  border: 5vw solid #411c56;                /* 20px, violet */
  border-radius: 95q 0 0 95q / mod(90%, 183q); /* coins gauches seulement : 89,76 × (25,09 ou 90) */
  margin: 10% 100;                          /* html : 40 100 ; body : 13 100 */
  padding: 30 20 6% 10;                     /* html : 30 20 24 10, place le body */
}
& {                                         /* la racine seulement : html */
  corner-shape: notch;                      /* des encoches droites au lieu de coins ronds */
  background: #dc26;                        /* passe au canevas : #f1eba7 */
}
```

## Comment ça marche

### 1. html : une boîte

La page n'a pas de doctype, elle est donc en mode quirks, où `100` vaut 100px. `5vw` fait 5 % des 400px du canevas : une bordure de 20px.

Une marge en % se mesure toujours sur la largeur du bloc parent. Pour `html`, c'est le canevas de 400px : `10%` vaut 40, en haut et en bas. Le mode quirks étire `html` à la hauteur du canevas, moins ses marges : 300 − 2 × 40 = 220. J'ai mesuré `html` en (100, 40), 200 × 220.

### 2. Le padding place le body

`padding:30 20 6%10` donne 30 en haut, 20 à droite, 10 à gauche, et 6 % de 400 = 24 en bas. Dans la bordure de 20px, la boîte de contenu de `html` va de (130, 90) à (260, 216) : 130 × 126. C'est dans cette boîte que le `body` se place.

### 3. body : la même règle

`*` vise aussi le `body` : il reçoit la même bordure, la même marge et le même padding. Cette fois, ses `10%` se mesurent sur la boîte de contenu de son parent : 10 % de 130 = 13.

À gauche, la marge vaut 100 : le `body` commence en x = 230. Sa bordure et son padding prennent déjà 20 + 10 + 20 + 20 = 70, et ça ne tient pas avec 100px de marge de chaque côté. La largeur du contenu descend à 0, la boîte garde 70 de large, et la marge droite est ignorée. Le `body` finit en x = 300 : sa bordure droite tombe pile sur celle de `html`.

Le mode quirks étire aussi le `body` à la hauteur de la boîte de contenu de son parent : 126 − 2 × 13 = 100. J'ai mesuré le `body` en (230, 103), 70 × 100.

### 4. mod() : les coins de html

`95q` vaut 89,76px. `border-radius:95q 0 0 95q` arrondit seulement les deux coins gauches, avec ce rayon horizontal. Le rayon vertical vient après le `/` : `mod(90%,183q)`.

Dans `border-radius`, un % vertical se mesure sur la hauteur de la boîte elle-même. `html` fait 220 de haut : 90 % = 198. `183q` vaut 172,91px, et 198 mod 172,91 = 25,09. Les coins gauches de `html` font 89,76 × 25,09. Quand j'ai écrit ces deux nombres à la place de `mod()`, le rendu n'a pas changé.

### 5. mod() : les coins du body

Sur le `body`, la même déclaration donne autre chose. Le `body` fait 100 de haut : 90 % = 90, plus petit que 172,91, donc `mod()` le laisse tel quel. Les coins font 89,76 × 90.

Ça ne tient pas. Les deux coins gauches demandent 90 + 90 = 180 sur un côté de 100px, et 89,76 sur un haut de 70px. Le navigateur réduit tous les rayons du plus petit facteur, 100 / 180. Il reste 49,87 × 50. Le côté gauche devient un demi-cercle de 50px de rayon, centré en (280, 153). Avec la bordure de 20px, c'est un demi-anneau de 30 à 50px. J'ai rendu le `body` seul pour vérifier : son trou intérieur a 30px de rayon.

### 6. notch : des encoches

`&` au premier niveau de la feuille de style vise la racine, `html`, et elle seule. `corner-shape:notch` garde la taille de chaque rayon, mais dessine une encoche droite au lieu d'une courbe. Les deux coins gauches de `html` perdent un rectangle de 89,76 × 25,09.

Ce qui reste de la boîte de 200 × 220 est l'union de deux rectangles : de 100 à 300 × de 65 à 235, et de 190 à 300 × de 40 à 260. Avec une bordure, le bord intérieur est le bord extérieur décalé de 20px vers l'intérieur : les encoches intérieures gardent la même taille. L'intérieur va de 120 à 280 × de 85 à 215, et de 210 à 280 × de 60 à 240. Sans `corner-shape`, le même rayon dessine deux coins ronds et aplatis.

Le `body` garde le `corner-shape` par défaut, rond : ses coins restent un demi-anneau.

### 7. La couleur

`#dc26` est la forme à quatre chiffres de `#ddcc22` à 40 % d'opacité. Le fond de `html` sert pour tout le canevas. Sur le blanc, il donne #f1eba7, à une unité du #f2eaa8 de la cible sur chaque canal. Le `body` n'a pas de fond : il laisse voir le canevas.

## Notes de golf

- Une seule règle pour les deux boîtes. Les `%` de `margin`, `padding` et `border-radius` donnent à chaque boîte sa propre taille à partir du même texte : 40 et 13, 220 et 100, 25,09 et 90.
- `mod(90%,183q)` est l'astuce : une valeur pour la boîte de 220px, une autre pour celle de 100px. Avec une grande boîte H et une petite B, et une valeur h voulue sur H et b sur B : p = b / B, puis N = p × H − h.
- La marge droite du `body` est ignorée, et sa largeur n'est faite que de bordure et de padding : pas besoin de `width`.
- `&{…}` vise `html` seul, en 2 caractères, pour ne donner les encoches qu'au cadre.
- `95q` pour 89,76 : l'encoche s'arrête à 0,24px de x = 190, et le site donne quand même 100 %.
- `10%100`, `6%10` et `solid#411c56` se passent d'espace, et la règle n'est pas fermée.
