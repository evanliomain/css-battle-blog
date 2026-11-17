---
title: "Une bordure gauche de 160px : deux cadres reliés en 129 caractères"
ref: 2026-07-19
permalink: /fr/2026/07/19/une-bordure-gauche-de-160px/
description: "Comment deux images vides font deux cadres, comment une marge négative place la seconde avant la première, et comment la bordure gauche de 160px de body les relie, dans la cible CSS Battle du 19 juillet 2026."
target: /assets/targets/2026-07-19.png
target_url: https://cssbattle.dev/play/0esrz3btDFAYNYpYzP4I
colors: ["#e38f66", "#000000"]
player: eguiluz
chars: 129
score: 716.98
match: 100
code: |
  <img><img><style>&{background:#e38f66;*{border:5vw solid}>*{border-width:0 20 0 160;margin:30%80;*{padding:50;margin:-40-360-40 0
---

La cible du 19 juillet montre deux cadres carrés noirs sur un fond orange, reliés par une grosse barre noire. La barre remplit une partie du cadre de gauche, qui ressemble à un C. Le cadre de droite a un petit trait vertical à l'intérieur. David Eguiluz dessine les cadres avec deux images vides, et une marge négative place la seconde à gauche. La barre et le trait sont les bordures gauche et droite de body : 160px et 20px de large.

Cochez **Couleurs pédagogiques** pour distinguer les bordures de body des deux images.

{% include animations/2026-07-19.html lang=page.lang %}

## Le code, aéré

```css
<img><img>                       /* deux images vides : les deux cadres */
<style>
& {                              /* au plus haut niveau : :scope, la racine, html */
  background: #e38f66;           /* le fond de la racine : tout le canevas */
  * {                            /* tous les éléments dans html */
    border: 5vw solid            /* une bordure noire de 20px */
  }
  > * {                          /* les enfants de html : head (caché) et body */
    border-width: 0 20 0 160;    /* body : 160px à gauche (la barre), 20px à droite (le trait) */
    margin: 30%80;               /* 120px en haut et en bas, 80px sur les côtés */
    * {                          /* dans body : les deux img */
      padding: 50;               /* 0 + 100 + 40 : un cadre de 140 × 140 */
      margin: -40-360-40 0       /* une boîte de marge de 60px de haut, et l'img suivante 360px en arrière */
```

## Comment ça marche

### 1. html : le fond orange

Il n'y a pas de doctype : la page est en mode quirks. La balise style n'est jamais fermée, donc tout ce qui suit `<style>` est du CSS. Les deux `<img>` viennent en premier : le navigateur les met dans body, et la balise style après elles.

Au plus haut niveau, `&` veut dire `:scope`, c'est-à-dire la racine : html. html reçoit `background:#e38f66`. Le fond de la racine est peint sur tout le canevas.

### 2. Une bordure pour tous, puis d'autres largeurs

Le `*{border:5vw solid}` imbriqué veut dire `& *` : tous les éléments dans html. Ils ont tous une bordure de 20px (5vw font 5 % des 400px de large). Aucune couleur n'est donnée, donc la bordure prend la couleur du texte : noir.

`>*{…}` veut dire `& > *` : les enfants de html, head et body. head ne s'affiche pas. Ces règles ont toutes la même spécificité, et celle-ci vient après : pour body, `border-width:0 20 0 160` l'emporte sur les 20px de `border:5vw solid`. Le style reste solid. body n'a pas de bordure en haut et en bas, 20px à droite et 160px à gauche.

### 3. body : une boîte de 240 × 60

En mode quirks, un nombre sans unité compte en px dans `margin`. Un pourcentage dans `margin` est une part de la largeur, même en haut et en bas. `margin:30%80` fait donc 30 % de 400 = 120px en haut et en bas, et 80px sur les côtés.

En mode quirks, body remplit la fenêtre, moins ses marges : 400 − 160 = 240 de large et 300 − 240 = 60 de haut. getBoundingClientRect donne 240 × 60 en (80, 120). Sa bordure gauche va de x = 80 à 240 : c'est la barre. Sa bordure droite va de 300 à 320. Entre les deux, la boîte de contenu de body, 60 × 60 de x = 240 à 300, est vide : elle laisse voir l'orange.

### 4. Une img vide : un cadre de 140 × 140

Le dernier `*{…}` veut dire `& > * *` : les éléments dans body, les deux img et la balise style, cachée. Une img sans `src` a un contenu de 0 × 0. `padding:50` ajoute 50px de chaque côté, et la bordure de 20px vient de l'étape 2. Chaque img est un cadre carré de 0 + 100 + 40 = 140, avec un trou de 100 × 100.

Les img sont en ligne : elles se posent sur une ligne dans body. `margin:-40-360-40 0` donne à chacune −40px en haut et en bas. Sa boîte de marge fait alors 140 − 80 = 60 de haut, autant que body. La première img commence à gauche du contenu de body : getBoundingClientRect donne (240, 80), 140 × 140, car 120 − 40 = 80. C'est le cadre de droite.

### 5. Une marge de −360 : la seconde img revient à gauche

La première img a une marge droite de −360px. Sa boîte de marge finit en 240 + 140 − 360 = 20. La seconde img vient juste après, sur la même ligne : elle commence en x = 20. getBoundingClientRect donne (20, 80), 140 × 140. C'est le cadre de gauche. Sa propre marge de −360 ne change rien, car rien ne vient après elle.

### 6. La barre sous les cadres

Les bordures de body sont peintes d'abord, les img par-dessus. Les img n'ont pas de fond : seules leurs bordures couvrent la barre.

- Dans le trou du cadre de gauche, de x = 40 à 140, la barre couvre x = 80 à 140, et y = 120 à 180. Il reste de l'orange à gauche, au-dessus et au-dessous de la barre : un C.
- Entre les cadres, la barre va de x = 160 à 240 et les relie.
- Dans le trou du cadre de droite, de x = 260 à 360, la boîte de contenu vide de body laisse voir l'orange jusqu'à x = 300. La bordure droite de body, de 300 à 320, fait le trait vertical.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- `&` désigne html en 1 caractère. Avec `html` à sa place, le code fait 132 caractères, pour la même image.
- Une règle donne une bordure à tout le monde, et les largeurs ne changent que pour body. Sans le `>` (128 caractères), `*{border-width:0 20 0 160;…}` vise aussi les deux img : elles ont la même bordure gauche de 160px et pas de bordure en haut ni en bas, les cadres disparaissent, et 24 000 pixels changent.
- `5vw` fait 20px en 3 caractères : avec `20px solid`, le code fait 130 caractères, pour la même image. Un nombre sans unité ne marche pas ici : avec `20 solid` (128 caractères), Chrome ignore toute la déclaration `border`, il n'y a plus aucune bordure, et les 28 800 pixels noirs deviennent orange.
- `30%80` fait 120px et 80px en 5 caractères, sans espace après le `%`. `120 80` donne un code de 130 caractères, pour la même image.
- Les marges de −40 en haut et en bas gardent les boîtes de marge des img aussi hautes que body. Avec `margin:0-360 0 0` (126 caractères), les boîtes de marge font 140 de haut et body grandit pour les contenir : body fait 140 de haut à partir de y = 120, la barre aussi, les cadres descendent de 40px, et 28 800 pixels changent.
- La marge de −360 garde les deux img sur une seule ligne. Avec `margin:-40 0` (122 caractères), la seconde img ne tient pas sur la ligne de 60px de body : elle passe sur une deuxième ligne, en (240, 140), par-dessus la première. body grandit à 120 de haut, et 20 800 pixels changent.
- Pas besoin d'espace dans `-40-360-40` : chaque signe moins commence un nouveau nombre. Écrire `px` sur chaque nombre sans unité (`20px`, `160px`, `80px`, `50px`, `-40px -360px -40px`) donne un code de 145 caractères, pour la même image.
- Rien n'est fermé. Fermer les trois règles ouvertes et la balise style avec `}}}</style>` prend 140 caractères, 11 de plus, pour la même image.
