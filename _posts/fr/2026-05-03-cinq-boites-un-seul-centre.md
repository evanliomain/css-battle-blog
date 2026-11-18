---
title: "Cinq boîtes, un seul centre : quatre barres percées en 184 caractères"
ref: 2026-05-03
permalink: /fr/2026/05/03/cinq-boites-un-seul-centre/
description: "Comment une seule règle * fait tourner cinq boîtes imbriquées autour du même centre, avec des bandes bleues sur html et body, des bordures à points roses sur deux dl et un p, et une seule propriété personnalisée pour toutes les marges, dans la cible CSS Battle du 3 mai 2026."
target: /assets/targets/2026-05-03.png
target_url: https://cssbattle.dev/play/ZmI88BYrDPD4PBtlv8j6
colors: ["#529caf", "#f9d2d2", "#f8d2d1"]
player: h_blierzt
chars: 184
score: 669.25
match: 100
code: |
  <dl><dl><p><style>*{rotate:90deg;margin:var(--m,-40 170);border-block:solid 30vw#529CAF;+*{background:#E775;--m:-70 0;*{border:dotted#F8D2D1 32q;--m:-160;*{--m:20;*{--m:40 20;height:60
---

La cible du 3 mai est une croix de quatre barres bleues sur un fond rose pâle : une en haut, une en bas, une à gauche et une à droite. Chaque barre porte deux disques roses. H_Bliertz dessine les barres avec les bordures bleues du haut et du bas de html et de body, et les disques avec les bordures pointillées de trois boîtes imbriquées. Une seule règle `*` donne un quart de tour à chaque élément, et les tours s'additionnent de boîte en boîte.

Avec **Couleurs pédagogiques**, chaque boîte et ses points prennent leur propre couleur. **Vue large** montre les parties de html et du dl extérieur qui sortent du canevas.

{% include animations/2026-05-03.html lang=page.lang %}

## Le code, aéré

```css
<dl><dl><p>                        /* un dl dans un dl, puis p : trois boîtes imbriquées */
<style>
* {                                /* tous les éléments */
  rotate: 90deg;                   /* un quart de tour, ajouté à celui du parent */
  margin: var(--m,-40 170);        /* html n'a pas de --m : -40 170 */
  border-block: solid 30vw#529CAF; /* bandes bleues de 120px, en haut et en bas */
  + * {                            /* *+* : seulement body, juste après head */
    background: #E775;             /* passe au canevas */
    --m: -70 0;
    * {                            /* tout ce qui est dans body */
      border: dotted#F8D2D1 32q;   /* points roses de 30px */
      --m: -160;                   /* dl extérieur */
      * {
        --m: 20;                   /* dl intérieur */
        * {
          --m: 40 20;              /* p */
          height: 60
  /* la fin du code ferme les cinq règles */
```

## Comment ça marche

### 1. Trois boîtes imbriquées

`<dl><dl><p>` ouvre un dl, un second dl dedans, et un p dans celui-ci. Un nouveau `<dl>` ne ferme pas celui qui est ouvert : ils s'imbriquent. Le `<style>` se retrouve dans p.

La page a sept éléments : html, head, body, le dl extérieur, le dl intérieur, p et style. head et style ne s'affichent pas.

### 2. Une règle `*`, imbriquée

`*{…}` vise tous les éléments. Les règles imbriquées dedans resserrent la cible, un niveau à la fois :

- `+*{…}` commence par un combinateur, il se lit donc `*+*` : un élément juste après un autre élément. Seul body convient : il vient après head. Les dl, le p et le style sont chacun le premier enfant de leur parent.
- le `*` suivant se lit `*+* *` : tout ce qui est dans body, donc les deux dl, p et style.
- puis `*+* * *` : le dl intérieur, p et style.
- puis `*+* * * *` : p et style.

Aucun de ces sélecteurs n'a de poids, donc la règle qui vient plus loin dans le code l'emporte. Les règles les plus profondes viennent plus loin : chaque élément prend les valeurs de la règle la plus profonde qui le vise.

### 3. Une variable pour cinq marges

Chaque élément reçoit `margin:var(--m,-40 170)`. Les règles du dessous ne posent que `--m`. Une propriété personnalisée s'hérite : `--m:-70 0` sur body atteint aussi tout ce qui est dedans, jusqu'à ce qu'une règle plus profonde pose une autre valeur.

- html n'a pas de `--m` : il prend le repli, `-40 170`.
- body : `-70 0`.
- dl extérieur : `-160`.
- dl intérieur : `20`.
- p : `40 20`.

### 4. html : les barres de gauche et de droite

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Les longueurs sans unité y sont des px, et html remplit la page de 400 × 300 moins ses marges. Avec 170 de chaque côté, html fait 400 − 340 = 60 de large. Avec −40 en haut et en bas, il fait 300 + 80 = 380 de haut, en (170, −40).

`border-block:solid 30vw#529CAF` lui donne une bande bleue en haut et une en bas. vw vaut 1 % des 400px de large : 30vw = 120px. Il reste 380 − 240 = 140px de contenu entre les deux.

Puis `rotate:90deg` fait tourner html autour de son centre, (200, 150). Mon rendu donne une boîte de 380 × 60 en (10, 120). Les deux bandes sont maintenant les barres de gauche et de droite : 120 × 60 en (10, 120) et en (270, 120).

### 5. body : le canevas et les barres du haut et du bas

html n'a pas de fond : le fond de body passe à tout le canevas. `#E775` est la forme courte de `#ee777755` : le rouge `#ee7777` avec une opacité de 0x55 = 85/255, un tiers. Sur le blanc de la page : 255 − 17 / 3 = 249,3 et 255 − 136 / 3 = 209,7. Mon rendu peint le canevas en (249, 210, 210), `#f9d2d2`.

En mode quirks, body remplit le contenu de html moins ses propres marges. Avec `-70 0`, il fait 60 de large et 140 + 140 = 280 de haut. Il a les mêmes bandes bleues, et son propre quart de tour en plus de celui de html : 90° + 90° = 180°. Une boîte tournée de 180° a le même aspect qu'avant. Mon rendu donne 60 × 280 en (170, 10) : les bandes sont la barre du haut, de y = 10 à 130, et celle du bas, de 170 à 290.

### 6. Les bordures pointillées

Dans body, `border:dotted#F8D2D1 32q` remplace les bandes bleues par une bordure à points roses sur les quatre côtés. Q est un quart de millimètre : 32q = 32 × 96 / 25,4 / 4 = 30,24px, et mon Chrome calcule une bordure de 30px. Une bordure pointillée aussi épaisse est une rangée de points ronds de 30px, avec un point à chaque coin et les autres répartis régulièrement le long du côté.

Mon rendu donne ces trois boîtes :

- dl extérieur : `-160` tout autour lui donne 60 + 320 = 380 de large et 360 de haut. Il finit à 360 × 380 en (20, −40). Chaque côté a 7 points, coins compris. Les points du milieu des côtés gauche et droit sont en (35, 150) et en (365, 150).
- dl intérieur : `20` tout autour lui donne 280 × 260 en (60, 20). Chaque côté a 5 points. Ceux du milieu sont en (75, 150), (325, 150), (200, 35) et (200, 265).
- p : `40 20` et `height:60` lui donnent 180 de large et 60 + 60 = 120 de haut. Il finit à 120 × 180 en (140, 60). Ses petits côtés ont 3 points, ceux du milieu en (200, 75) et en (200, 225). Ses grands côtés ont 4 points, sans point au milieu.

### 7. Les tours s'additionnent

Chaque élément tourne de 90° dans le repère de son parent : html est à 90°, body à 180°, le dl extérieur à 270°, le dl intérieur à 360° et p à 450°. Un quart de tour échange la largeur et la hauteur d'une boîte. Un demi-tour ne change rien de visible.

Toutes les marges sont les mêmes à gauche et à droite, et en haut et en bas. Chaque boîte a donc le même centre que son parent, et dans mon rendu les cinq sont centrées sur (200, 150). Les tours ne déplacent jamais une boîte : ils décident seulement si elle est couchée ou debout. Le point du milieu d'une rangée impaire tombe toujours sur la ligne x = 200 ou y = 150, pile sur une barre.

### 8. Des points qui disparaissent

Les points sont `#f8d2d1`, (248, 210, 209) dans mon rendu. Le canevas est (249, 210, 210) : un niveau d'écart. Sur le fond, les points disparaissent. Seuls les huit posés sur une barre bleue se voient, deux par barre.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle `*` donne le tour, la marge et les bandes bleues à chaque élément, et les règles imbriquées resserrent la cible. `+*{` fait 3 caractères pour body. Avec `body{` (186 caractères), l'image est la même.
- `--m:` fait 4 caractères, `margin:` en fait 7. Quatre règles posent `--m`, ce qui économise 12 caractères, et `var(--m,` plus `)` en coûte 9. Avec un `margin` simple dans chaque règle et sans variable (187 caractères), l'image est la même.
- `rotate:90deg` est écrit une fois et compte cinq fois, parce que chaque tour s'ajoute à celui du parent. Sans lui (171 caractères), 16 496 pixels changent.
- `30vw` fait 4 caractères pour 120px. Avec `120px` (185 caractères), l'image est la même. Un `120` sans unité (183 caractères) ne marche pas ici : mon Chrome ignore la déclaration, html et body n'ont pas de bandes bleues, et 23 536 pixels changent.
- `32q` fait 3 caractères pour une bordure de 30px. Avec `30px` (185 caractères), l'image est la même. Un `30` sans unité (183 caractères) ne marche pas non plus : mon Chrome ignore la déclaration, les boîtes intérieures gardent les bandes bleues de 120px, et 40 486 pixels changent.
- `border-block` pose les bandes du haut et du bas en une seule propriété. Avec `border-top` et `border-bottom` (214 caractères), l'image est la même.
- `#E775` fait 5 caractères pour la couleur du canevas. Avec `#F8D2D1` (186 caractères) ou `#ee777755` (188 caractères), l'image est la même.
- Pas besoin d'espace avant `#` : `30vw#529CAF` et `dotted#F8D2D1`. Avec `30vw #529CAF` (185 caractères), l'image est la même.
- `<dl>` s'imbrique dans lui-même et n'a pas de marge intérieure par défaut. Avec `<p><p><p>` (182 caractères), chaque `<p>` ferme le précédent, les trois p se suivent dans body au lieu de s'imbriquer, et 11 314 pixels changent. Avec `<ul><ul><p>` (184 caractères), mon Chrome donne à chaque ul une marge intérieure gauche de 40px, et 8 062 pixels changent. Avec `<div><div><p>` (186 caractères) ou `<dl><dl><dl>` (185 caractères), l'image est la même.
- `height:60` ne sert que sur p : les autres boîtes tirent leur taille de leur contenu ou du mode quirks. Sans lui (174 caractères), p n'est pas plus haut que ses deux bordures, 60px, les deux dl autour raccourcissent, les points bougent, et 9 889 pixels changent.
- Le code s'arrête au milieu de cinq règles : la fin du code les ferme. Avec `}}}}}` à la fin (189 caractères), l'image est la même.
