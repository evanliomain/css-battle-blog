---
title: "Un demi-tour : une icône de recadrage en 121 caractères"
lang: fr
ref: 2026-11-06
permalink: /fr/2026/11/06/un-demi-tour/
description: "Comment une seule liste d'ombres et un scale:-1 dessinent la cible CSS Battle du 6 novembre 2026 : deux équerres brunes croisées, comme une icône de recadrage."
target: /assets/targets/2026-11-06.png
target_url: https://cssbattle.dev/play/jHTSQXbsHDY0OOetADF1
colors: ["#e98f6b", "#8b4646", "#d52a"]
player: kieron
chars: 121
score: 726.24
match: 100
code: |
  <style>*{margin:85 135-25 25;box-shadow:11q -11q#e98f6b,5ch -5ch#8b4646;*{background:#d52a;margin:-46%-46%46%46%;scale:-1
---

La cible du 6 novembre est une icône de recadrage : deux équerres brunes épaisses sur un fond saumon, l'une en haut à droite, l'autre en bas à gauche. Elles se croisent à deux coins, et celle du dessus est coupée par une fine fente là où elle passe sur l'autre. La solution de Kieron donne la même liste d'ombres à `html` et au `body`. Chaque liste dessine une équerre. Puis `scale:-1` fait faire un demi-tour à celle du `body`, et le `body`, peint en dernier, creuse les fentes.

Passez en **Vue large** pour voir où irait l'équerre du `body` sans son demi-tour, et cochez **Couleurs pédagogiques** pour voir l'ombre couleur fond.

{% include animations/2026-11-06.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html et body */
  margin: 85 135 -25 25;         /* html : 240 × 240 */
  box-shadow:
    11q -11q #e98f6b,            /* couleur du fond, 10,39px en haut à droite, au-dessus */
    5ch -5ch #8b4646;            /* brun, 40px en haut à droite */
  * {                            /* body */
    background: #d52a;           /* part sur le canevas */
    margin: -46% -46% 46% 46%;   /* 110,39px à droite et en haut */
    scale: -1;                   /* demi-tour */
  }
}
```

## Comment ça marche

### 1. html est une boîte de 240 × 240

`*` vise tous les éléments : `html` et le `body` (ainsi que `head` et `style`, qui ne s'affichent pas). La règle imbriquée donne ensuite au `body` sa propre marge. `html` garde `margin:85 135 -25 25`. Sa largeur vaut 400 − 135 − 25 = 240px. CSS Battle tourne en mode quirks, où `html` remplit la fenêtre moins ses marges haute et basse : 300 − 85 − (−25) = 240px. `html` est donc une boîte de 240 × 240, de (25, 85) à (265, 325). Elle déborde de 25px sous le canevas.

`html` n'a pas de fond : le `#d52a` du `body` part sur tout le canevas. C'est `#dd5522` avec une opacité de `aa`, soit 67 %. Posé sur la page blanche, il donne `#e88e6c`. La cible est en `#e98f6b`, à 1 près sur chaque canal.

### 2. Une ombre externe dessine une équerre

`5ch -5ch #8b4646` est une ombre sans flou : une copie de la boîte, décalée de 40px vers la droite et de 40px vers le haut. Dans la police par défaut, `1ch` vaut 8px, donc `5ch` vaut 40px. Une ombre externe ne se peint jamais sous sa propre boîte. `html` est transparent : seule la partie de la copie hors de la boîte se voit. C'est une équerre de 40px d'épaisseur. Sa barre du haut va de (65, 45) à (305, 85), sa barre de droite de (265, 85) à (305, 285).

### 3. Une ombre couleur fond par-dessus l'amincit

Dans une liste d'ombres, la première se peint au-dessus. `11q -11q #e98f6b` décale une autre copie de 11 quarts de millimètre : 10,39px. Elle a la couleur du canevas. Elle couvre les 10,39px intérieurs de l'équerre brune, dont les barres ne font plus que 30px : celle du haut s'arrête en y = 74,6, celle de droite commence en x = 275,4. Sa propre équerre a la couleur du fond : on ne la voit pas.

### 4. Le body se déplace avec des marges en %

Le `*{…}` imbriqué vise les descendants de chaque élément : le `body`. Une marge en % se calcule sur la largeur du parent, même en haut et en bas. `html` fait 240px de large, donc `46%` vaut 110,39px. Avec `margin:-46% -46% 46% 46%`, le `body` commence 110,39px à droite du bord gauche de `html` : x = 135,4. Sa marge droite négative lui rend cette largeur : il garde 240px de large. En mode quirks, sa hauteur suit la même règle que celle de `html` : 240px aussi, de y = −25,4 à 214,6.

Son centre est en (255,4 ; 94,6). Celui de `html` est en (145 ; 205). Les deux sont presque exactement symétriques autour du centre du canevas, (200 ; 150).

### 5. Le body reçoit les mêmes ombres

Le `*` du dehors vise aussi le `body`, qui reçoit donc les deux mêmes ombres. Telle quelle, son équerre partirait en haut à droite, presque toute hors du canevas : seule une bande brune d'environ 14px se verrait le long du bord droit. La boîte du `body` est elle-même transparente : son fond est parti sur le canevas.

### 6. `scale:-1`, c'est un demi-tour

`scale:-1` retourne le `body` à l'horizontale et à la verticale, autour de son propre centre. Deux retournements, c'est un demi-tour. La boîte est carrée et centrée sur ce point : elle retombe sur elle-même. Ses ombres tournent avec elle : elles pointent maintenant 40px vers la gauche et 40px vers le bas. L'équerre brune longe le côté gauche (x de 95 à 125) et le bas (y de 225 à 255), et son ombre couleur fond est toujours au-dessus.

Le `body` se peint après `html`. Là où ses ombres croisent l'équerre de `html`, elles passent dessus :

- ses bandes couleur fond coupent l'équerre de `html` aux deux croisements, de x = 125 à 135,4 et de y = 214,6 à 225 ;
- ses barres brunes recouvrent le reste de l'équerre de `html`.

Ce sont les deux fentes de la cible. Les bords tracés par l'ombre de 10,39px tombent à 0,4px environ d'un pixel entier : le navigateur mélange une rangée de pixels le long de chacun. C'est assez proche pour 100 % de ressemblance.

## Notes de golf

- Un seul `box-shadow` sur `*` dessine les deux équerres. `scale:-1` (8 caractères) retourne la seconde : pas de seconde liste d'ombres à écrire.
- `-46%-46%46%46%` se passe d'espaces : le `%` termine chaque mot. C'est 2 caractères de moins que `-110-110 110 110`. 46 % de 240 donnent 110,39px, assez près de 110.
- `5ch` vaut 40px en 3 caractères, et `11q` vaut 10,39px en 3 caractères.
- `#d52a` fait 5 caractères. Sur le `body`, il part sur le canevas, et sur du blanc il tombe à 1 près de la couleur de la cible.
- `135-25` et `11q -11q#e98f6b` se passent d'espace avant le signe moins ou le `#`.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
