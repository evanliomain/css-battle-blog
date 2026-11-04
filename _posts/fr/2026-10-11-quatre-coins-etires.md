---
title: "Quatre coins étirés : une flèche en 117 caractères"
lang: fr
ref: 2026-10-11
permalink: /fr/2026/10/11/quatre-coins-etires/
description: "Comment un dégradé radial découpé en coins minuscules, étirés sur tout le canevas, dessine la cible CSS Battle du 11 octobre 2026, avec le body comme tige de la flèche."
target: /assets/targets/2026-10-11.png
target_url: https://cssbattle.dev/play/Fq5TIqZggu5mqVHldcND
colors: ["#d16161", "#3f4869", "#fae29e"]
player: evanliomain
chars: 117
score: 731.15
match: 100
code: |
  <style>*{*{margin:40 185 80}border-image:.1%.67%1/80%60%40%radial-gradient(#d16161 70.1vw,#3f4869 0 99.279%,#fae29e 0
---

La cible du 11 octobre est une flèche qui pointe vers le bas sur un fond crème : une tige rouge, et un V bleu marine en bas avec un triangle rouge dans son creux. Je la dessine sans aucun fond ni aucune forme. Un seul `border-image` prend les quatre coins minuscules d'un dégradé radial, quelques pixels chacun, et les étire jusqu'à couvrir le canevas. Près du coin de l'image, les cercles du dégradé ressemblent à des lignes droites, et une fois étirés, ils deviennent les côtés penchés du V. Sur `body`, le même `border-image` est tout rouge : c'est la tige.

{% include animations/2026-10-11.html lang=page.lang %}

## Le code, aéré

```css
* {                          /* html, et body aussi */
  * {                        /* body seul */
    margin: 40 185 80;
  }
  border-image:
    .1% .67% 1 /             /* découpe : 0,3px, 2,68px, 1px sur html */
    80% 60% 40%              /* largeurs : trop grandes, réduites ensemble */
    radial-gradient(
      #d16161 70.1vw,        /* rouge jusqu'à 280,4px */
      #3f4869 0 99.279%,     /* un anneau marine très fin */
      #fae29e 0              /* crème au-delà */
    );
}
```

## Comment ça marche

### 1. Un dégradé presque tout rouge

Sur `html`, le `border-image` a la taille du canevas, 400 × 300. Un dégradé radial sans taille est une ellipse qui passe par les quatre coins : son rayon horizontal vaut 200 × √2 ≈ 282,8px. Les arrêts se mesurent sur ce rayon :

- rouge jusqu'à `70.1vw`, soit 280,4px (1vw = 4px) ;
- marine de là jusqu'à 99,279 % de 282,8px, environ 280,8px : un anneau de moins d'un demi-pixel d'épaisseur ;
- crème au-delà, ce qui n'arrive que dans les derniers pixels de chaque coin.

Vue en entier, l'image est un rectangle rouge avec des points dans les coins.

### 2. Des tranches minuscules

`.1% .67% 1` découpe l'image en neuf morceaux : 0,1 % de 300 = 0,3px en haut, 0,67 % de 400 = 2,68px de chaque côté, et 1px en bas (un nombre seul est en pixels de l'image). Les quatre coins sont donc minuscules : 2,68 × 0,3 en haut, 2,68 × 1 en bas.

Vu de très près, le coin d'en bas à gauche contient un peu de tout. À cette échelle, les bords de l'ellipse sont des lignes presque droites qui descendent de 3px tous les 4px : crème tout au fond du coin, l'anneau marine, puis le rouge.

### 3. Quatre coins couvrent le canevas

`80% 60% 40%` fixe la largeur des bords : 80 % de la hauteur en haut, 60 % de la largeur de chaque côté, 40 % de la hauteur en bas. Ça fait 120 % de la hauteur et 120 % de la largeur, plus que la boîte. Quand deux bords opposés se chevauchent, le navigateur les réduit tous du même facteur, ici 1 / 1,2 :

- en haut : 200px, en bas : 100px (ensemble, les 300px de hauteur) ;
- à gauche et à droite : 200px chacun (ensemble, les 400px de largeur).

Les quatre coins pavent donc le canevas pile : deux carrés de 200 × 200 en haut, deux rectangles de 200 × 100 en bas. Les bords et le milieu n'ont plus aucune place. Il n'y a de fond nulle part : le crème vient du dégradé.

### 4. Les coins du bas dessinent le V

Chaque morceau du bas, de 2,68 × 1, est étiré en 200 × 100 : environ ×74,6 en largeur et ×100 en hauteur. Les lignes qui descendaient de 3 pour 4 descendent maintenant d'environ 1 pour 1 : elles deviennent des biais à 45°. Dans le quart d'en bas à gauche, ça donne du crème, puis une bande marine, puis du rouge ; le quart d'en bas à droite en est le miroir. Ensemble, ils dessinent le V marine et le triangle rouge dans son creux.

Le V est coupé net à y = 200 gratuitement : c'est là que commencent les coins du bas.

L'anneau est agrandi une centaine de fois, les arrêts doivent donc être précis. Déplacer un arrêt de 0,01px déplace le bord du V d'environ 1px, d'où `99.279%`.

### 5. Les coins du haut dessinent le crème

Les morceaux du haut ne font que 0,3px de haut, tout au fond du coin, hors de l'anneau : presque tout crème. Étirés en 200 × 200, ils remplissent le haut du canevas. Seul leur coin intérieur atteint l'anneau marine, ce qui laisse une fine pointe marine au-dessus du V, autour de x = 200.

### 6. body est la tige

Le `*` extérieur donne le même `border-image` à `body`. Le `*` imbriqué ne vise que `body` et lui donne `margin:40 185 80` (CSS Battle tourne en mode quirks, les unités sont facultatives) : 400 − 2 × 185 = 30px de large, et 300 − 40 − 80 = 180px de haut, en (185, 40).

Sur une boîte de 30 × 180, le rayon horizontal de l'ellipse ne vaut plus que 15 × √2 ≈ 21px. Le rouge jusqu'à 280,4px couvre toute l'image. L'arrêt marine, 99,279 % de 21px, tombe avant : il se colle à 280,4px, et l'anneau n'a plus de place. Les largeurs sont réduites de la même façon et les quatre coins remplissent la boîte : une barre toute rouge. Elle va de y = 40 à y = 220, jusque dans le triangle rouge, et cache la pointe marine.

## Notes de golf

- Pas de `background`, pas de `box-shadow` : deux `border-image` dessinent tout.
- Quand les largeurs débordent, seul leur rapport compte. `80%60%40%` donne le même résultat que tout autre trio de même rapport qui déborde, en 9 caractères.
- `70.1vw` vaut 280,4px en 6 caractères. Un arrêt en longueur est le même sur les deux boîtes, alors que l'arrêt en `%` dépend de la boîte : c'est ce qui fait disparaître l'anneau sur `body`.
- `.1%.67%1` et `80%60%40%radial-gradient` se passent d'espaces.
- La `)` du dégradé et la balise de fin de `<style>` sont omises.
