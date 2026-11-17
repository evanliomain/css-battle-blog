---
title: "Un border-image sans bordure : un U en 157 caractères"
ref: 2026-08-12
permalink: /fr/2026/08/12/un-border-image-sans-bordure/
description: "Comment un border-image sur html, qui n'a pas de bordure, coupe un radial-gradient en quatre quarts et ne garde que les deux du bas, pour dessiner les arcs de la cible CSS Battle du 12 août 2026."
target: /assets/targets/2026-08-12.png
target_url: https://cssbattle.dev/play/ZpafZDvdHRSYl7O2VgaW
colors: ["#394257", "#469dba", "#fae29e"]
player: gabriele19
chars: 157
score: 689.58
match: 100
code: |
  <style>&{*{border-inline:solid 53q#394257;background:#469DBA;margin:25 50 155}border-image:50%/0%45%52%radial-gradient(13%48q,#0000.93in,#FAE29E 0 278%,#0000
---

La cible du 12 août est un U sur fond bleu, coupé en deux moitiés : deux barres bleu nuit en haut, deux quarts d'anneau jaune pâle en bas, et un vide au milieu. Gabriele dessine les barres avec les bordures gauche et droite de body. Les arcs viennent d'un border-image sur html, qui n'a aucune bordure. Son image est un anneau jaune : la tranche le coupe en quatre quarts, ceux du haut n'ont pas de place, et les deux du bas arrivent dans les coins du bas.

Cochez **Couleurs pédagogiques** pour voir body, qui a la couleur du canevas, et les quatre quarts de l'image.

{% include animations/2026-08-12.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                                /* & au premier niveau : la racine, html */
  * {                              /* tout élément dans html : head, style, body */
    border-inline: solid 53q #394257;  /* bordures gauche et droite, 53q = 50,08px, dessinées en 50px */
    background: #469DBA;           /* le fond de body peint le canevas */
    margin: 25 50 155;             /* body : 300 × 120 en (50 ; 25) */
  }
  border-image:                    /* sur html, qui n'a pas de bordure */
    50%                            /* tranche : quatre quarts de 200 × 150 */
    / 0% 45% 52%                   /* largeurs : haut 0, gauche et droite 180px, bas 156px */
    radial-gradient(13% 48q,       /* ellipse de 52px × 45,35px */
      #0000 .93in,                 /* transparent jusqu'à 89,28px */
      #FAE29E 0 278%,              /* jaune jusqu'à 278 % × 52 = 144,56px */
      #0000                        /* puis de nouveau transparent */
```

## Comment ça marche

### 1. Une règle pour body, une pour html

Le code n'a ni balise html, ni head, ni body : Chrome les ajoute. Au premier niveau d'une feuille de style, `&` désigne la racine du document : html. Je l'ai vérifié avec getComputedStyle : html a le border-image, et body n'en a pas. Le `*{` imbriqué veut dire `& *` : tout élément dans html, donc head, style et body. head et style ne s'affichent pas. body est la seule boîte qui reçoit la règle intérieure.

html n'a pas de fond. Le canevas prend donc le fond de body, `#469DBA`. J'ai vérifié : sans `background:#469DBA`, le canevas est blanc.

### 2. body fait 300 × 120

Il n'y a pas de doctype : la page est en mode quirks, et les nombres sans unité comme `margin:25 50 155` sont des px. J'ai vérifié avec `<!doctype html>` devant : le rendu ne ressemble plus à la cible.

`margin:25 50 155` donne à body 25px en haut, 50px à gauche et à droite, et 155px en bas. Sa largeur est 400 − 2 × 50 = 300px. En mode quirks, body remplit aussi la hauteur de html, moins ses marges : 300 − 25 − 155 = 120px. getBoundingClientRect donne (50 ; 25), 300 × 120.

### 3. Deux bordures font les barres

`border-inline` règle les bordures gauche et droite en une seule propriété. `53q`, c'est 53 quarts de millimètre : 1q = 96 / 101,6 = 0,945px, donc 53q = 50,08px. Chrome dessine les bordures en pixels entiers : getComputedStyle donne 50px pour `border-left-width`. Les bordures sont dans les 300px de largeur de body. Les barres vont de x = 50 à 100 et de 300 à 350, et de y = 25 à 145.

### 4. html a une image de bordure, mais pas de bordure

Le `border-image` est sur html. html n'a pas de bordure : getComputedStyle donne `none` pour son style de bordure. Ici, l'image de bordure n'en a pas besoin, parce que ses largeurs sont en pourcentages. Un pourcentage dans `border-image-width` est une part de la boîte, pas de la largeur de bordure. Chrome peint donc l'image quand même.

html fait 400 × 300 en mode quirks, et l'image est un radial-gradient : elle prend cette taille, 400 × 300.

### 5. L'image est un anneau jaune

`radial-gradient(13%48q, …)` est une ellipse centrée en (200 ; 150). Sa taille est 13 % de 400 = 52px en largeur, et 48q = 45,35px en hauteur. Les arrêts se mesurent le long du rayon horizontal :

- `#0000 .93in` : transparent jusqu'à 0,93 × 96 = 89,28px. `#0000` est un noir transparent.
- `#FAE29E 0 278%` : un arrêt à deux positions. Le `0` vient avant 89,28px : il est remonté à 89,28px, et le jaune commence net. Il va jusqu'à 278 % × 52 = 144,56px.
- `#0000` : sans position, il se place lui aussi à 144,56px. Le jaune s'arrête net.

En hauteur, tout est multiplié par 45,35 / 52. L'anneau va de 89,28 à 144,56px en largeur, et de 77,87 à 126,08px en hauteur. J'ai rendu le dégradé seul sur une boîte de 400 × 300. Sur la ligne du milieu, la partie gauche de l'anneau va de x = 55 à 111 (200 − 144,56 = 55,44 ; 200 − 89,28 = 110,72). Sur la colonne du milieu, la partie haute va de y = 24 à 72 (150 − 126,08 = 23,92 ; 150 − 77,87 = 72,13).

### 6. La tranche coupe l'image en quatre

`border-image:50%/0%45%52%…` donne la tranche, puis les largeurs. La tranche `50%` coupe l'image à 50 % de chaque bord : 200px à gauche et à droite, 150px en haut et en bas. Les quatre coins sont les quatre quarts de l'anneau, 200 × 150 chacun. Les bords et le milieu font 0 de large ou 0 de haut : ils ne contiennent rien.

Les largeurs `0% 45% 52%` valent pour le haut, la gauche et la droite, et le bas. Chaque coin de l'image va dans un coin de la boîte de html :

- Les coins du haut font 45 % × 400 = 180px de large et 0 % de haut. Les deux quarts du haut sont écrasés : il n'en reste rien.
- Les coins du bas font 180px de large et 52 % × 300 = 156px de haut : de (0 ; 144) à (180 ; 300), et de (220 ; 144) à (400 ; 300).

Je l'ai vérifié avec un conic-gradient à quatre couleurs à la place de l'anneau. Seules deux couleurs se voient : le quart en bas à gauche dans (0 ; 144)–(180 ; 300), et le quart en bas à droite dans (220 ; 144)–(400 ; 300). Entre les deux, de x = 180 à 220, c'est le bord du bas. Il est vide : c'est le vide du U.

### 7. Les quarts deviennent presque ronds

Chaque quart du bas, 200 × 150, est étiré en 180 × 156 : × 0,9 en largeur et × 1,04 en hauteur. Le centre de l'anneau arrive en (180 ; 144) à gauche et en (220 ; 144) à droite. Le jaune va maintenant de 80,35 à 130,10px en largeur, et de 80,98 à 131,13px en hauteur : presque un cercle. L'ellipse part plus plate qu'un cercle, 45,35 / 52 = 0,87, et l'étirement la rend presque ronde : 0,87 × 1,04 / 0,9 = 1,01.

Sur l'arc de gauche, le jaune va de x = 49,90 à 99,65 en haut, et descend jusqu'à y = 224,98 et 275,13 en x = 180. Dans mon rendu sans body, le jaune couvre x = 50 à 99 sur la ligne y = 144, et y = 225 à 274 dans la colonne x = 179.

### 8. body est peint par-dessus

Le jaune commence en y = 144, et les barres finissent en y = 145. body est un enfant de html : il est peint par-dessus l'image de bordure de html. Les barres couvrent la ligne y = 144, et le jaune se voit à partir de y = 145, juste dessous.

## Notes de golf

- `&{` désigne la racine en un caractère. Avec `html{` à la place, le code fait 160 caractères, pour le même rendu, au pixel près.
- Le `*{` imbriqué atteint body sans le nommer. head et style reçoivent aussi la règle, mais ne s'affichent pas.
- Le `background` de body est écrit une fois et peint tout le canevas, puisque html n'en a pas.
- html n'a pas besoin de bordure pour son border-image : les largeurs sont des pourcentages de la boîte.
- `border-inline` dessine les bordures gauche et droite en une seule propriété.
- `53q` fait 3 caractères, et la bordure est dessinée en 50px.
- `#0000` est un transparent en 5 caractères. Avec `transparent` deux fois à la place, le code fait 169 caractères, pour le même rendu.
- `#FAE29E 0 278%` fait commencer le jaune net : le `0` est remonté à l'arrêt précédent. Le dernier `#0000` n'a pas besoin de position.
- Avec l'ellipse `13%48q`, les quarts sortent presque ronds après l'étirement.
- Pas besoin d'espace dans `53q#394257`, `#0000.93in`, `13%48q` ou `50%/0%45%52%radial-gradient`.
- Une accolade, `&{`, et une parenthèse, `radial-gradient(`, restent ouvertes, et il n'y a pas de `</style>`. Avec `)}`, le code fait 159 caractères ; avec `)}</style>`, 167. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les barres, les bords droits des arcs et le vide tombent sur les mêmes pixels que dans la cible. Mon rendu n'a que les trois couleurs unies : chaque pixel des bords courbes est soit jaune, soit bleu. La cible a 337 pixels mélangés le long des arcs. En tout, 364 pixels diffèrent de la cible, et tous sont à moins de 1,5px d'un bord courbe. Le plus grand écart est de 180 niveaux, en (299 ; 154), sur le bord intérieur de l'arc de droite : mon rendu y est bleu, (70, 157, 186), et la cible jaune, (250, 226, 158). Sur le juge de CSS Battle, le code est identique à 100 %.
