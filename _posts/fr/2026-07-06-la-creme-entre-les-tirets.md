---
title: "La crème entre les tirets : un monstre en pixels en 105 caractères"
ref: 2026-07-06
permalink: /fr/2026/07/06/la-creme-entre-les-tirets/
description: "Comment une seule bordure en tirets de 31ex, épaisse sur html et fine sur body et p parce que l'ex suit la police, laisse un fond crème passer par ses trous en forme de monstre en blocs, dans la cible CSS Battle du 6 juillet 2026."
target: /assets/targets/2026-07-06.png
target_url: https://cssbattle.dev/play/31jQ9hSUF6QsJx0qO66P
colors: ["#998235", "#f3ead2"]
player: emohdaziz
chars: 105
score: 747.04
match: 100
code: |
  <p>.<style>&{margin:-157-197}*{border:31ex dashed#998235;+*{margin:-80 0;background:#f3ead2;font:3Q/40vw"
---

La cible du 6 juillet est un monstre crème en blocs sur un fond olive : un corps large aux côtés en gradins et un petit carré à chaque coin. Mohamed Ali ne dessine aucune forme. Le canevas est crème, et trois bordures olive en tirets le recouvrent. Le crème ne se voit que dans leurs trous. Les trois bordures font `31ex`, et l'ex suit la police : une police minuscule sur body et p rend la même bordure large de 40px, alors que celle de html fait 227px.

Cochez **Couleurs pédagogiques** pour distinguer les trois bordures, et passez en **Vue large** pour voir le cadre plein de html autour du canevas.

{% include animations/2026-07-06.html lang=page.lang %}

## Le code, aéré

```css
<p>.                           /* ouvre body et un p ; le point donne une ligne à p */
<style>
& {                            /* html */
  margin: -157-197             /* 794 × 614 en (−197, −157) */
}
* {                            /* html, head, body, p, style */
  border: 31ex dashed#998235;  /* 227px sur html, 40px sur body et p (cible) */
  +* {                         /* * + * : body, juste après head */
    margin: -80 0;             /* 80px plus haut : 340 × 320 en (30, −10) */
    background: #f3ead2;       /* crème, sur tout le canevas */
    font: 3Q/40vw"             /* police de 2,83px, lignes de 160px, famille vide */
```

## Comment ça marche

### 1. Cinq éléments

Il n'y a pas de doctype : la page est en mode quirks, et les nombres sans unité sont des px dans `margin`. `<p>` ouvre tout seul head et body, puis un p dans body. Le `.` est du texte dans p, et le style se retrouve aussi dans p. La page contient donc html, head, body, p et style. head et le style ne sont pas affichés.

Un `&` seul, hors de toute règle, vise la racine : html. `*` vise les cinq. Le `+*` imbriqué veut dire `* + *` : un élément juste après un autre élément. html n'a pas de frère, head vient en premier, p est le premier enfant de body, et le style ne suit que le texte `.`. `+*` ne vise donc que body. getComputedStyle le confirme : seul body reçoit la marge de −80px et le crème.

### 2. html, un cadre plein

`margin:-157-197` tire html de 157px vers le haut et de 197px vers la gauche, et autant de l'autre côté. Il fait 400 + 394 = 794px de large. En mode quirks, html remplit la hauteur de la fenêtre moins ses marges : 300 + 314 = 614px. getBoundingClientRect donne (−197, −157), 794 × 614.

Sa bordure est en tirets olive de `31ex`. Un ex est la hauteur d'un x dans la police de l'élément. html garde la police par défaut de 16px. La cible correspond à une bordure de 227px : l'intérieur de html commence alors en −197 + 227 = 30, et en −157 + 227 = 70.

La bordure est en tirets, mais Chrome la dessine pleine. J'ai vérifié les 433 116 pixels d'une boîte de 794 × 614 avec une bordure en tirets de 227px : tous sont peints. Dans mon Chrome, un côté en tirets de 227px n'a son premier trou qu'entre 900 et 1 000px de long. Les côtés de html font 794 et 614px.

Il reste une fenêtre de 340 × 160, de x = 30 à 370 et de y = 70 à 230. Tous les pixels crème de la cible sont dedans.

### 3. Le crème est le fond de body

Le fond de body est crème. html n'en a pas, donc le fond de body peint tout le canevas. Hors de la fenêtre, le cadre de html le cache. Dedans, il se voit partout où les tirets de body et de p laissent un trou.

### 4. Une bordure, deux largeurs

Le `font:3Q/40vw"` de body donne une police de 3Q : 3 quarts de millimètre, 2,83px. Le même `31ex` devient bien plus petit. La cible correspond à 40px sur body. p hérite de la police de body, donc sa bordure de `31ex` fait aussi 40px.

Le raccourci font exige une famille. Le `"` final ouvre une chaîne que la fin du fichier referme : un nom de famille vide, en 1 caractère.

### 5. Les tirets de body : les quatre carrés

`margin:-80 0` remonte body de 80px, dans la bordure de html. body a la largeur de la fenêtre de html : 340px, à partir de x = 30. En mode quirks, body remplit l'intérieur de html moins ses marges : 160 + 80 + 80 = 320px. Il va de y = −10 à 310.

J'ai mesuré les tirets de Chrome sur une boîte de 340 × 320 avec une bordure en tirets de 40px :

- côtés gauche et droit, 320px : tiret 80, trou 40, tiret 80, trou 40, tiret 80. Les trous vont de y = 70 à 110 et de 190 à 230 ;
- haut et bas, 340px : tiret 80, trou 50, tiret 80, trou 50, tiret 80. Ils sont de y = −10 à 30 et de 270 à 310, sur le cadre de html.

Sur les côtés, de x = 30 à 70 et de 330 à 370, les deux trous tombent pile en haut et en bas de la fenêtre. Ce sont les quatre carrés de 40 × 40 des coins.

### 6. Les tirets de p : la rangée du milieu

p est le contenu de body : 340 − 80 = 260px de large, en x = 70. `/40vw` fixe la hauteur de ligne : 40 % de 400 = 160px. Le `.` donne à p une ligne de 160px. Avec ses bordures, p fait 160 + 80 = 240px de haut. Sa marge haute par défaut, 1em = 2,83px, ne se voit pas : dans mon Chrome, p commence pile en haut du contenu de body, en y = 30 dans la géométrie de la cible.

Sur une boîte de 260 × 240 avec une bordure en tirets de 40px, Chrome dessine :

- côtés gauche et droit, 240px : tiret 80, trou 80, tiret 80. Le trou va de y = 110 à 190 ;
- haut et bas, 260px : tiret 80, trou 10, tiret 80, trou 10, tiret 80. Ils sont de y = 30 à 70 et de 230 à 270, sur le cadre de html.

Sur les côtés, de x = 70 à 110 et de 290 à 330, les tirets couvrent le haut et le bas de la fenêtre, et le trou ouvre la rangée du milieu. Entre les bordures de p, de x = 110 à 290, rien ne couvre le crème : c'est la haute partie du milieu.

### 7. Seuls les trous comptent

Aucun tiret de body ne chevauche un tiret de p. Dans chaque trou, on voit ce qui est dessous : le cadre olive de html hors de la fenêtre, le canevas crème dedans. La rangée y = 150 de la cible est olive jusqu'à x = 69, crème de 70 à 329, olive à partir de 330. La rangée y = 90 est crème de 30 à 69, olive de 70 à 109, crème de 110 à 289, olive de 290 à 329 et crème de 330 à 369.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- Une bordure pour trois boîtes. Comme l'ex suit la police, la police de 3Q rend le même `31ex` fin sur body et p. Écrit en px, avec `40px` pour tous et `border-width:227px` sur html, le code fait 126 caractères. Dans mon Chrome, cette version reproduit la cible à un pixel près (voir plus bas).
- `font:3Q/40vw"` fixe la taille qui réduit l'ex et la hauteur de ligne qui allonge p, en une seule déclaration.
- La famille ne peut pas manquer. Avec `font:3Q/40vw` (104 caractères), mon Chrome rejette toute la déclaration : body et p gardent la police de 16px. Le `"` non fermé coûte 1 caractère. Avec `""`, le code fait 106 caractères, pour la même image.
- `40vw` fait 160px en 4 caractères. `160px` donne la même image en 106.
- Le `.` donne sa ligne à p. Je l'ai retiré sur la version en px (126 caractères, voir plus haut) : p se réduit à ses bordures, 80px de haut, et 9 601 pixels changent. Ses tirets du bas tombent dans la fenêtre en barre olive de y = 70 à 110, avec deux fentes crème, et la rangée du bas devient crème de x = 30 à 370.
- `+*` imbriqué dans `*` fait gagner 1 caractère : `*{…}*+*{…` donne la même image en 106.
- `&` vise html en 1 caractère. `html` donne la même image en 108.
- Pas d'espace dans `-157-197` ni dans `dashed#998235`. Chaque espace ajouté donne 106 caractères, pour la même image.
- Rien n'est fermé. `""}}</style>` à la fin donne 116 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 11 153 pixels, avec la même règle que dans les notes de golf. getBoundingClientRect montre que les boîtes sont décalées : `31ex` fait 222px sur html et 39px sur body et p, et non 227px et 40px. La fenêtre de html fait 350 × 170 en (25, 65), les carrés et la partie du milieu bougent, et de fines lignes crème apparaissent entre eux. Avec les largeurs écrites en px (227px sur html, 40px sur body et p), mon rendu ne diffère de la cible que sur un pixel, en (110, 149), où le `.` laisse un point à peine visible. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
