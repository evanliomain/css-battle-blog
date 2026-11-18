---
title: "14 % trois fois : trois U jaunes en 103 caractères"
ref: 2026-05-15
permalink: /fr/2026/05/15/14-pour-cent-trois-fois/
description: "Comment une seule marge de 10 14 %, donnée à html, à body et à trois p, réduit chaque niveau pour centrer trois U jaunes, dans la cible CSS Battle du 15 mai 2026."
target: /assets/targets/2026-05-15.png
target_url: https://cssbattle.dev/play/M3qD0cAD3qJNSn30dud9
colors: ["#1f1446", "#ffca00"]
player: HPNVC89hQJbe3ny0jUyBkVT8qKD3
chars: 103
score: 749.87
match: 100
code: |
  <p><p><p><style>*{margin:10 14%;background:#1F1446;p{height:50;border:solid#ffca00;border-width:0 35 30
---

La cible du 15 mai montre trois U jaunes sur un fond indigo foncé, empilés en colonne, centrés, à 10px d'écart. Anarchimedes Apostolakis dessine chaque U avec la bordure d'un p vide : pas de bordure en haut, des côtés épais, un bas plus fin. Une seule règle, `margin:10 14%`, va à html, à body et aux p. Une marge en % est une part de la largeur du parent : chaque niveau est 28 % plus étroit que celui du dessus, et les p finissent à environ 149,3 de large, centrés.

Les **Couleurs pédagogiques** montrent html, body et le contenu des p, qui ont tous le même indigo que le canevas.

{% include animations/2026-05-15.html lang=page.lang %}

## Le code, aéré

```css
<p><p><p>                  /* trois p dans body ; le style va dans le troisième */
<style>
* {                        /* html, head, body, les trois p, style */
  margin: 10 14%;          /* 14 % de la largeur du parent, à chaque niveau */
  background: #1F1446;     /* html : tout le canevas ; les autres : le même indigo */
  p {                      /* les trois p */
    height: 50;
    border: solid #ffca00; /* style et couleur ; pas d'épaisseur, donc medium (3px) */
    border-width: 0 35 30; /* haut 0, gauche et droite 35, bas 30 */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `10` dans une marge, une hauteur ou une épaisseur de bordure est lu en px.

Le premier `<p>` ouvre body. Un p ne peut pas contenir un autre p : chaque nouveau `<p>` ferme le précédent. body contient trois p vides, et le `<style>` va dans le troisième.

`*` vise tous les éléments : html, head, body, les trois p et style. head et style ne s'affichent pas. Le `p{` imbriqué dedans vaut `* p` : les trois p. Les règles ne sont jamais fermées : la fin du code les ferme.

### 2. Une marge, trois largeurs

Une marge en % est une part de la largeur du bloc qui contient l'élément, quel que soit le côté. Ici, le bloc qui contient chaque élément est son parent.

- Le bloc qui contient html est le canevas de 400 × 300. 14 % de 400 = 56 : html fait 400 − 2 × 56 = 288 de large, à partir de x = 56.
- body est dans html : 14 % de 288 = 40,32. body fait 288 − 2 × 40,32 ≈ 207,4 de large, à partir de x ≈ 96,3. Mon Chrome garde ces valeurs en 1/64 de px : 40,3125 et 207,375.
- Les p sont dans body : 14 % de 207,375 ≈ 29,03. Chaque p fait environ 149,3 de large (149,3125 dans mon Chrome), de x ≈ 125,34 à 274,66.

Chaque niveau garde 72 % de la largeur du dessus : 400 × 0,72 × 0,72 × 0,72 ≈ 149,3. Les marges sont les mêmes des deux côtés : chaque boîte reste centrée. Mon Chrome peint les p sur des pixels entiers, de x = 125 à 275 : 150 pixels de large, sans bord flou.

### 3. Un seul fond pour le canevas

Le fond de html, `#1F1446`, peint tout le canevas, pas seulement la boîte de html. body et les p reçoivent le même fond. Ils peignent le même indigo par-dessus : ils ne se voient pas.

### 4. Les marges verticales fusionnent

html est la racine : sa marge du haut, 10, ne fusionne jamais, et son contenu commence en y = 10.

body n'a ni bordure ni padding en haut. Sa marge du haut, 10, touche celle du premier p, 10. Elles fusionnent en une seule marge de 10 : le premier p commence en y = 10 + 10 = 20. Entre deux p, la marge du bas de l'un et celle du haut du suivant fusionnent aussi : les p sont à 10px les uns des autres.

### 5. border, puis border-width

Avec `height:50` seul, chaque p est une boîte de 149,3 × 50.

`border:solid#ffca00` donne le style et la couleur des quatre côtés. Il ne donne pas d'épaisseur : chaque côté prend celle par défaut, medium, qui vaut 3px dans mon Chrome.

`border-width:0 35 30` vient ensuite et donne les épaisseurs. Avec trois valeurs, la première est le haut, la deuxième va à gauche et à droite, et la troisième est le bas. Le p garde sa largeur : les côtés de 35px prennent la place de son contenu. Le contenu fait environ 79,3 de large : mon Chrome peint le trou sur 80 pixels, de x = 160 à 240. Chaque p fait 50 + 30 = 80 de haut : un U avec un trou de 50px de profondeur.

Avec les écarts de 10px, les trois U sont en y = 20, 110 et 200, et le dernier finit en 280.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule marge pour trois niveaux. Le pourcentage est recalculé à chaque niveau : `14%` centre html, body et les p, et donne aux p leur largeur. Avec une marge en px, les p ont besoin de la leur : `*{margin:10 0;…;p{margin:10 125;…` (115 caractères) donne la même image. Une seule valeur en px ne marche pas : avec `margin:10 56` (102 caractères), chaque niveau perd les mêmes 112px. body fait 176 de large et laisse 64 aux p, moins que leurs deux côtés de 35px. Chaque U devient un bloc jaune plein de 70 × 80, et 28 200 pixels changent.
- `*` atteint html : la couleur du canevas n'a pas besoin de son propre sélecteur. Avec `}}html{background:#1F1446` à la fin à la place (109 caractères), l'image est la même.
- `border` avant `border-width`. Le raccourci `border` donne aussi les épaisseurs. Avec `border-width:0 35 30;border:solid#ffca00` (103 caractères), les épaisseurs repassent à medium : chaque p est un cadre jaune de 3px, haut de 56, et 22 560 pixels changent.
- `border` ne prend qu'une épaisseur pour les quatre côtés : les trois épaisseurs vont dans `border-width`. Sa forme à trois valeurs écrit 35 une seule fois pour les deux côtés. Avec `border-width:0 35 30 35` (106 caractères), l'image est la même.
- Des nombres seuls dans la marge, la hauteur et `border-width`, grâce au mode quirks. Avec `10px`, `50px` et `0 35px 30px` (111 caractères), l'image est la même. Le raccourci `border` ne les accepte pas : avec `border:35 solid#ffca00;border-top:0;border-bottom-width:30` (121 caractères), mon Chrome ignore la déclaration `border`, tout le jaune disparaît, et 24 000 pixels changent.
- `<p><p><p>` donne trois boîtes en 9 caractères : chaque p ferme le précédent. Avec `<p></p><p></p><p></p>` (115 caractères), l'image est la même.
- Pas d'espace avant le `#` : `solid#ffca00` se termine tout seul. Avec `solid #ffca00` (104 caractères), l'image est la même.
- Le code s'arrête dans la règle des p, et la fin du code ferme les deux règles ouvertes. Avec `}}` à la fin (105 caractères), l'image est la même.
