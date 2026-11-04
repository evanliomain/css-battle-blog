---
title: "Le bord de la tuile comme couteau : une ampoule en 139 caractères"
lang: fr
ref: 2026-10-23
permalink: /fr/2026/10/23/le-bord-de-la-tuile-comme-couteau/
description: "Comment un seul dégradé radial, partagé par html, body et deux titres, dessine la cible CSS Battle du 23 octobre 2026 : une ampoule coupée net par le bord de sa propre tuile de fond."
target: /assets/targets/2026-10-23.png
target_url: https://cssbattle.dev/play/z3C2kNvqCfxq06B81Mfm
colors: ["#edf4b0", "#ce4830"]
player: emohdaziz
chars: 139
score: 706.34
match: 100
code: |
  .<h1><h4><style>*{background:radial-gradient(1Q at 50%83.3%,#edf4b0,5pc,#ce4830)0 196Q;*{margin:125 190-9e3;*{margin:52-2.7ex -42;height:20
---

La cible du 23 octobre est une ampoule sur fond rouge brique : un disque jaune pâle coupé net en bas, fendu par une fente rouge, avec deux barres dessous. Mohamed Ali la dessine avec un seul dégradé, partagé par tous les éléments. La coupe nette ne coûte rien : c'est le bord de la tuile du fond. La fente et les barres ne sont que des boîtes qui montrent d'autres morceaux du même dégradé.

{% include animations/2026-10-23.html lang=page.lang %}

## Le code, aéré

```css
.<h1><h4>                 /* un point de texte, puis deux titres */
<style>
* {                       /* tous les éléments */
  background:
    radial-gradient(1Q at 50% 83.3%, #edf4b0, 5pc, #ce4830)
    0 196Q;               /* tuile descendue de 185px */
  * {                     /* head, body, h1, h4, style */
    margin: 125 190 -9e3; /* body : la fente */
    * {                   /* h1, h4, style */
      margin: 52 -2.7ex -42;
      height: 20;         /* h1, h4 : les barres */
    }
  }
}
```

## Comment ça marche

### 1. Un disque sur html

`html` n'a pas de marge : sa boîte est tout le cadre de 400×300. Son fond part sur le canevas, et sa tuile est cette même boîte de 400×300.

Le dégradé est un cercle : `1Q` est une seule longueur, donc « un cercle de ce rayon ». Il est centré en `50% 83.3%`, soit (200, 250). Il est jaune jusqu'à 5pc (80px), rouge au-delà.

### 2. Un repère de transition fait le bord net

`#edf4b0, 5pc, #ce4830` ne donne aucune position aux couleurs. Le `5pc` seul entre les deux est un repère de transition : il indique où se trouve le milieu du fondu.

Le rouge n'a pas de position, il irait donc au bout du rayon du dégradé, qui ne mesure que 1Q. Mais un arrêt ne peut pas venir avant le repère : le rouge remonte lui aussi à 80px. Le fondu doit alors se faire entre 80px et 80px, c'est-à-dire nulle part. Le jaune tient jusqu'à 80px et le bord est net. Le rendu est exactement celui de `#edf4b0 5pc,#ce4830 0`, avec 2 caractères de moins.

### 3. Le bord de la tuile coupe le disque

`0 196Q` fait descendre la tuile de 196Q, soit 185,2px. Le fond se répète, donc la copie du dessus comble le vide :

- cette copie s'arrête à y = 185,2, là où commence la tuile déplacée ;
- son disque est centré 50px au-dessus de son bord bas, vers y = 135.

Le disque va donc de y ≈ 55 jusqu'au bord de la tuile, à y ≈ 185, où il s'arrête en ligne droite. Le disque de la tuile déplacée est maintenant centré vers y = 435, hors du cadre. C'est pour ça que le centre est à 83,3 % : 250, c'est 50px au-dessus du bas d'une tuile de 300px, la distance entre le centre et la coupe.

### 4. body est la fente

La règle du milieu touche tous les descendants de `html`. Seul `body` se voit (`head` reste caché). `margin:125 190-9e3` veut dire 125 en haut, 190 sur les côtés, −9000 en bas.

- 400 − 190 − 190 laisse une boîte de 20px de large en x = 190.
- CSS Battle affiche la page en mode quirks, où `body` remplit la hauteur de la page moins ses marges : 300 − 125 + 9000 = 9175px.

`body` reçoit le même dégradé, mais sur une tuile de 20 × 9175, son disque tombe environ 7 600px plus bas. Dans le canevas, le body est tout rouge : une fente de 20px à partir de y = 125, qui passe par-dessus le disque.

### 5. Deux titres, une marge, deux largeurs

`<h4>` ne peut pas se trouver dans `<h1>` : le navigateur ferme d'abord le `h1`, et les deux titres sont frères dans `body`. Le `<style>` finit dans le `h4`, où il reste caché.

La règle la plus profonde leur donne `margin:52-2.7ex -42` et `height:20`. Les marges latérales négatives rendent chaque titre plus large que le body de 20px. `ex` dépend de la taille de police, et les titres ont la leur :

| Titre | Police | −2.7ex | Largeur |
| --- | --- | --- | --- |
| `h1` | 32px | −39,8px | 99,6px |
| `h4` | 16px | −19,9px | 59,8px |

Leurs propres tuiles font 100 × 20 et 60 × 20. Chaque point est à bien moins de 80px du centre de sa tuile : elles sont entièrement jaunes.

En hauteur, la marge basse de −42 du h1 et la marge haute de 52 du h4 fusionnent en un seul écart de 10px : les barres sont à y = 195 et y = 225.

### 6. Le point sépare les marges

Le `.` avant `<h1>` est une ligne de texte dans `body`, haute de 18px. Sans elle, la marge haute de 52px du h1 fusionnerait avec celle de 125px du body, et le h1 commencerait à y = 125, dans l'ampoule. Avec cette ligne entre les deux, le h1 commence à 125 + 18 + 52 = 195.

Le point lui-même est dessiné, en noir, dans la fente, vers (191, 138). Il ne fait que quelques pixels, et la correspondance reste de 100 %.

## Notes de golf

- `,5pc,` en repère de transition remplace les positions `5pc` et `0` : 2 caractères de gagnés.
- La coupe nette ne coûte rien : `0 196Q` y place le bord de la tuile.
- `1Q` fait du dégradé un cercle en 2 caractères.
- Une seule marge `-2.7ex` donne deux largeurs, car `ex` suit la police de chaque titre.
- `190-9e3` et `52-2.7ex` n'ont pas besoin d'espace avant le signe moins. `9e3`, c'est 9000 en 3 caractères.
- L'imbrication `*{*{*{` descend d'un niveau à chaque fois, sans nom de balise.
- Un simple `.` est le moyen le moins cher d'empêcher la fusion des marges.
