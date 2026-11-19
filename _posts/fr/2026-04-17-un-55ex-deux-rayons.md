---
title: "Un 55ex, deux rayons : un six en 110 caractères"
ref: 2026-04-17
permalink: /fr/2026/04/17/un-55ex-deux-rayons/
description: "Comment un seul dégradé radial fixe sur html et body peint un disque vert olive, et comment le même 55ex tombe loin hors du canevas pour html mais découpe les coins de body avec sa police de 4q, dans la cible CSS Battle du 17 avril 2026."
target: /assets/targets/2026-04-17.png
target_url: https://cssbattle.dev/play/0K98TK8pCxfEqKm5JWpl
colors: ["#b5bd49", "#3f4869"]
player: emohdaziz
chars: 110
score: 740.2
match: 100
code: |
  <style>*{background:radial-gradient(1Q,#b5bd49,53Q,#3f4869 0 55ex,#B5BD49)fixed;*{margin:35 45%139 85;font:4q"
---

La cible du 17 avril est un disque vert olive sur un fond bleu-gris foncé, avec au-dessus, à gauche, un quart d'anneau et un coin carré vert olive : on dirait un six. Mohamed Ali écrit un seul dégradé radial et le donne à html et à body. Son anneau bleu s'arrête à `55ex`, et ex suit la police : avec la police de 16px de html, l'anneau s'arrête loin hors du canevas ; avec la police de 4q de body, il s'arrête dans la boîte de body, et le vert olive au-delà remplit les coins de body.

Avec **Vue large**, le 55ex de html montre sa vraie taille. Avec **Couleurs pédagogiques**, le dégradé de body prend ses propres couleurs.

{% include animations/2026-04-17.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                 /* html, head, body, style */
  background: radial-gradient(
    1Q,                             /* un cercle de rayon 0,945px */
    #b5bd49,                        /* vert olive depuis le centre */
    53Q,                            /* un repère : le passage au bleu se fait à 50,08px */
    #3f4869 0 55ex,                 /* bleu : 0 recule à 53Q ; il s'arrête à 55ex */
    #B5BD49                         /* 100 % = 1Q, reculé à 55ex : vert olive à partir de là */
  )fixed;                           /* les deux dégradés centrés sur la fenêtre, (200, 150) */
  * {                               /* head, body, style */
    margin: 35 45%139 85;           /* body : 135 × 126 en (85, 35) */
    font: 4q"                       /* police de 3,78px : un 55ex bien plus court */
    /* la fin du code ferme la chaîne et les deux règles */
```

## Comment ça marche

### 1. Deux boîtes

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, où les longueurs sans unité des marges comptent comme des pixels.

La page a html, head, body et l'élément style, dans head. Le `*` du premier niveau vise les quatre. Le `*{` imbriqué vaut `* *` : tout élément placé dans un autre, donc head, body et style. head et style ne s'affichent pas. Deux boîtes se voient : html, qui reçoit le fond mais pas de marge et garde la police de 16px du navigateur, et body, qui reçoit le fond, la marge et la police de 4q.

### 2. body : 135 × 126

`margin:35 45%139 85` vaut 35 en haut, 45 % à droite, 139 en bas et 85 à gauche. Une marge en pourcentage est une part de la largeur : 45 % de 400 font 180. body va de x = 85 à 400 − 180 = 220, sur 135px de large.

En mode quirks, body s'étire jusqu'à la hauteur de la fenêtre, moins ses marges : 300 − 35 − 139 = 126. Il va de y = 35 à 161. getBoundingClientRect donne 85, 35, 135 × 126.

### 3. Un cercle de rayon 1Q

`radial-gradient(1Q, …)` commence par une seule longueur : le dégradé est un cercle, et son rayon mesure 1Q. 1Q est un quart de millimètre, 0,945px.

Les arrêts de couleur sont des distances au centre, et ils peuvent aller au-delà du bout du rayon :

- `#b5bd49` n'a pas de position : la première couleur part de 0.
- `53Q` seul est un repère : le milieu du passage de la couleur d'avant à la couleur d'après.
- `#3f4869 0 55ex` demande du bleu de 0 à 55ex. Un arrêt ne peut pas venir avant un arrêt ou un repère qui le précède : 0 recule donc à 53Q, 50,08px.

Le passage du vert olive au bleu commence à 0, finit à 53Q, et son milieu est aussi à 53Q : du vert olive jusqu'au bout, puis du bleu d'un coup. Un bord net à 50,08px : le disque. Avec `#b5bd49 53Q,` au lieu de `#b5bd49,53Q,`, de même longueur, l'image est la même.

### 4. La dernière couleur : 55ex

`#B5BD49` n'a pas de position. La dernière couleur se place à 100 %, au bout du rayon : 1Q. C'est avant 55ex, donc elle recule à 55ex elle aussi. Le bleu s'arrête à 55ex et le vert olive commence au même endroit : un autre bord net. Après le dernier arrêt, la dernière couleur continue à l'infini.

Le dégradé est donc un disque vert olive de 50,08px de rayon, un anneau bleu jusqu'à 55ex, et du vert olive partout au-delà.

### 5. html : 55ex, hors du canevas

Le fond de html est celui de la racine : il est peint sur tout le canevas. ex est une longueur qui suit la police de l'élément. html garde la police de 16px du navigateur, et getComputedStyle donne à son dégradé un anneau bleu jusqu'à 394,883px dans mon Chrome.

Les coins du canevas sont à √(200² + 150²) = 250px du centre. Le vert olive extérieur de html n'atteint jamais le canevas : il ne montre que le disque vert olive sur du bleu.

### 6. body : 55ex, dans sa boîte

`font:4q"` donne à body une police de 4q : 1mm, 3,78px. Le même 55ex y est bien plus court : 93,044px dans mon Chrome. La cible place ce bord à 95px du centre : sur la ligne y = 150, son vert olive s'arrête en x = 104, et sur la colonne x = 200, en y = 54.

body ne peint que sa propre boîte. Dedans, du centre vers l'extérieur : la partie du disque que body couvre (x de 150 à 220, y de 100 à 161), l'anneau bleu, et du vert olive au-delà du bord extérieur de l'anneau, le long des côtés haut et gauche de body. Ce vert olive, c'est le quart d'anneau, le coin carré et le trait qui descend à gauche. Le bas de la boîte de body, en y = 161, arrête le trait.

### 7. `fixed` : un seul centre

`fixed` est un `background-attachment`. Un fond fixe se place sur la fenêtre, pas sur sa propre boîte. Les deux dégradés sont centrés en (200, 150). La partie du disque peinte par body tombe pile sur le disque de html, de la même couleur, et son anneau bleu sur le bleu de html : body ne change que ses coins.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `background` pour deux éléments. ex lui donne deux tailles : loin hors du canevas pour html, dans la boîte de body pour body. `95px` est aussi court que `55ex`, mais les px sont les mêmes pour tous les éléments. Avec `95px` (110 caractères), le vert olive de html commence lui aussi à 95px du centre : le canevas devient vert olive autour d'un anneau bleu, et 85 215 pixels changent.
- `1Q` est le rayon du cercle. Il doit finir avant 55ex, pour que la dernière couleur recule à 55ex. Avec `circle` (114 caractères), le rayon va jusqu'au coin le plus éloigné de la fenêtre, à 250px. Le dernier vert olive part à 250px, le bleu passe en fondu au vert olive de 55ex jusque-là, et les coins de body sont un mélange : (115, 123, 91) en (85, 35). 7 119 pixels changent. Sans taille, `radial-gradient(#b5bd49,…` (107 caractères), le dégradé est une ellipse : le disque fait 100px de large et 75px de haut, et 10 010 pixels changent. Avec `1px` (111 caractères), l'image est la même. Avec `0` (109 caractères), mon Chrome peint tout le canevas en vert olive : 105 005 pixels changent.
- `fixed` fait 5 caractères. Sans lui (105 caractères), le dégradé de body est centré sur sa propre boîte, en x = 152,5 et y = 98 : un second disque là, et 11 496 pixels changent. `)fixed` n'a pas besoin d'espace : avec `) fixed` (111 caractères), l'image est la même.
- 45 % font 180px, aussi long que `180`, mais `%` termine le nombre : `45%139` n'a pas besoin d'espace. Avec `35 180 139 85` (111 caractères), l'image est la même.
- Le mode quirks accepte les nombres sans unité dans les marges. Avec `35px 45%139px 85px` (116 caractères), l'image est la même.
- `font:4q"` fait 8 caractères, `font-size:4q` 12. Avec `font-size:4q` (114 caractères), l'image est la même. Le raccourci `font` exige une famille : ici `""`, une chaîne vide, et la fin du code la ferme, donc un seul guillemet suffit. Avec `font:4q""` (111 caractères), l'image est la même. `font:4q` seul (109 caractères) est rejeté : getComputedStyle donne à body une police de 16px, son 55ex vaut lui aussi 394,883px, les coins de body restent bleus, et 7 119 pixels changent.
- Le code s'arrête au milieu de la chaîne et de deux règles : la fin du code les ferme. Avec `font:4q""}}` (113 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes formes que la cible, avec les mêmes aplats : (181, 189, 73) et (63, 72, 105). 578 pixels s'écartent de plus de 8 niveaux : 429 sur le bord extérieur de l'anneau bleu, 149 sur le bord du disque. Mon rendu a 2 couleurs et la cible 36 : les courbes de la cible sont anticrénelées, les miennes non. Le bord extérieur de l'anneau n'est pas non plus au même endroit. Mon Chrome calcule le 55ex de body à 93,044px : sur la ligne y = 150, mon vert olive s'arrête en x = 106, deux pixels à droite de celui de la cible, et sur la colonne x = 200 en y = 56, deux pixels plus bas. Quand je ferme la chaîne et les règles et que j'ajoute `body{background:radial-gradient(1Q,#b5bd49,53Q,#3f4869 0 95px,#B5BD49)fixed}`, qui ne fait que déplacer le bord de body à 95px, 225 pixels s'écartent de plus de 8 niveaux, tous sur les deux courbes. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
