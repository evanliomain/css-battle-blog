---
title: "Un outline penché sur un canevas rose : une bande coupée en trois en 91 caractères"
ref: 2026-04-22
permalink: /fr/2026/04/22/un-outline-penche-sur-un-canevas-rose/
description: "Comment l'outline de 186px de html encadre une bande rose, comment le fond rose de body finit sur le canevas, et comment le même outline sur body, zoomé à 50px et tourné de 120 degrés, coupe la bande en trois, dans la cible CSS Battle du 22 avril 2026."
target: /assets/targets/2026-04-22.png
target_url: https://cssbattle.dev/play/JQGdKmyo3a7grg94qIIs
colors: ["#66284a", "#f7bed9"]
player: h_blierzt
chars: 91
score: 768.03
match: 100
code: |
  <style>*{outline:solid 62vh#66284A;margin:90 40;*{background:#F7BED9;zoom:.27;rotate:120deg
---

La cible du 22 avril, c'est une bande rose sur un fond prune, coupée en trois par deux bandes prune penchées. H_Bliertz donne à html et à body le même outline prune. Sur html, il couvre tout autour d'une boîte de 320 × 120. Le fond rose de body est peint sur tout le canevas : la boîte apparaît en rose. Sur body, `zoom:.27` ramène l'outline à 50px, et `rotate:120deg` le tourne : ses deux grands côtés sont les bandes penchées.

Avec **Vue large**, l'outline de html en entier et les bouts de l'outline de body apparaissent. Avec **Couleurs pédagogiques**, les deux outlines et les deux boîtes prennent chacun leur couleur.

{% include animations/2026-04-22.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                             /* tous les éléments : html, head, style, body */
  outline: solid 62vh#66284A;   /* 62 % de 300px = 186px, dessiné autour de la boîte */
  margin: 90 40;                /* mode quirks : 90px en haut et en bas, 40px à gauche et à droite */
  * {                           /* tout élément dans un autre : tous sauf html */
    background: #F7BED9;        /* celui de body : html n'en a pas, il passe au canevas */
    zoom: .27;                  /* body : marge 24,3 10,8, outline 50px */
    rotate: 120deg;             /* tourne body et son outline autour de (200, 150) */
/* la fin du code ferme tout */
```

## Comment ça marche

### 1. La boîte de html et son outline

`*` vise tous les éléments : html, head, style et body. head et style ne s'affichent pas : il reste deux boîtes.

Il n'y a pas de doctype : la page est en mode quirks. Là, un `90` sans unité compte comme 90px, et html s'étire sur la hauteur du cadre, marges ôtées. getBoundingClientRect donne à html (40, 90), 320 × 120.

`62vh`, c'est 62 % des 300px du cadre : 186px. Un outline ne prend pas de place dans la mise en page et se dessine autour de la boîte. Il suffirait de 90px pour atteindre les bords du canevas depuis la boîte de html : tout ce qui est hors de la boîte de html est prune.

### 2. Le fond de body passe au canevas

Le fond est dans la règle imbriquée, qui vise tout sauf html. Quand html n'a pas de fond, le navigateur peint le fond de body sur tout le canevas, et body ne peint pas de fond à lui. getComputedStyle donne à html un fond transparent. Le rose se voit là où l'outline de html laisse un trou : dans la boîte de html.

C'est pour ça que le fond est dans la règle imbriquée. Avec `html{background:#fff}` devant (112 caractères), le canevas est blanc et body peint sa propre boîte rose : une barre penchée qui sort de la boîte de html, par-dessus l'outline de html, et 26 398 pixels changent. Avec `background:#F7BED9;` déplacé dans la règle extérieure (même longueur), html a un fond lui aussi : body peint de nouveau sa propre barre, et 11 434 pixels changent.

### 3. Le zoom réduit la marge et l'outline de body

La règle extérieure vaut aussi pour body : body reçoit l'outline de 186px et la marge `90 40`. `zoom:.27` réduit les deux. La marge passe à 0,27 × 90 = 24,3 et 0,27 × 40 = 10,8. Dans la boîte de 320 × 120 de html, body fait 298,4 × 71,4, à partir de (50,8, 114,3), et son centre est (200, 150), le centre du canevas.

L'outline passe à 186 × 0,27 = 50,22px, et Chrome l'arrondit à 50px pile : getComputedStyle donne `185.185px` sur body, et 185,185 × 0,27 = 50. Cet anneau prune va jusqu'à 50px autour de la boîte de body, au-delà de tous les bords de la boîte de html : il couvre toute la boîte de html sauf celle de body. Sans la rotation (77 caractères), il reste un seul rectangle rose, et 19 957 pixels changent.

Sans le zoom (82 caractères), l'outline de body fait lui aussi 186px et couvre toute la boîte de html : le canevas est tout prune, et 24 790 pixels changent.

### 4. Un tour de 120°

`rotate` tourne body autour de son centre, (200, 150), et son outline tourne avec lui. Après 120°, les grands côtés de la boîte sont à 60° de l'horizontale, comme un `/`.

Les deux grands côtés de l'anneau traversent la boîte de html en deux bandes. Chacune fait 50px de large en travers, donc 50 / sin 60° = 57,7px sur une ligne. Le rose entre elles, la boîte de body, fait 71,4 / sin 60° = 82,4px sur une ligne. Sur la ligne y = 150, mon rendu a du prune de x = 101 à 158, du rose de 159 à 240, du prune de 241 à 298 : 58, 82 et 58 pixels.

Les petits côtés de l'anneau sont à 149,2px du centre, le long de la barre (la moitié de 298,4). Le point de la boîte de html le plus loin du centre, dans cette direction, n'est qu'à 160 × cos 60° + 60 × sin 60° = 132px. Les petits côtés n'entrent donc jamais dans la boîte de html : ils tombent sur l'outline de html, prune sur prune. De part et d'autre des deux bandes, il reste le canevas rose : un morceau rose à gauche, un au milieu, un à droite.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule valeur d'outline fait deux choses. Sur html, 186px dépasse les 90px qu'il faut pour couvrir le canevas autour de la boîte. Sur body, le zoom en fait 50px. Avec `61vh` (même longueur), l'outline de body fait 49px (getComputedStyle donne `181.481px`) et 517 pixels changent. Avec `63vh`, il fait 51px et 524 pixels changent.
- `62vh` fait 186px en 4 caractères. Avec `186px` (92 caractères), l'image est la même.
- `zoom:.27` réduit la marge et l'outline d'un coup. Avec `margin:24.3 10.8;outline-width:50px` à sa place (118 caractères), l'image est la même.
- `.27` n'a pas de zéro devant. Avec `0.27` (92 caractères), l'image est la même.
- `rotate` est une propriété à part entière. Avec `transform:rotate(120deg)` (102 caractères), l'image est la même.
- Pas d'espace entre `62vh` et `#66284A`. Avec `62vh #66284A` (92 caractères), l'image est la même.
- Les marges sans unité ne marchent qu'en mode quirks. Avec `margin:90px 40px` (95 caractères), l'image est la même.
- Le mode quirks étire aussi html sur la hauteur du cadre. Avec `<!doctype html>` devant (106 caractères), les marges sans unité sont ignorées et html ne fait que 2,16px de haut. Son outline couvre le canevas de y = 2 à 187, le canevas en dessous reste rose, coupé par l'outline tourné de body, et 59 594 pixels changent.
- Les règles et le `<style>` ne sont jamais fermés. Avec `}}` à la fin (93 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment de l'écriture), le code officiel dessine la même bande et les deux mêmes bandes penchées que la cible, mais 695 pixels diffèrent de plus de 8 niveaux. Tous sont sur les bords penchés des bandes. Le plus grand écart est de 140 niveaux, en (147, 169) : prune dans mon rendu, rose dans la cible. Sur la ligne y = 150, les bandes de la cible couvrent x = 100 à 157 et 240 à 297 ; dans mon rendu, x = 101 à 158 et 241 à 298. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
