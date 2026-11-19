---
title: "Un carré et un U, deux fois : un ruban sinueux en 183 caractères"
ref: 2026-04-19
permalink: /fr/2026/04/19/un-carre-et-un-u-deux-fois/
description: "Comment deux p dessinent un carré jaune et un U, un dl reprend les deux mêmes p, et scale:-1 fait faire un demi-tour à cette copie pour finir le ruban en S, dans la cible CSS Battle du 19 avril 2026."
target: /assets/targets/2026-04-19.png
target_url: https://cssbattle.dev/play/h3JQ7ibxXKUG8sFT5rc7
colors: ["#2f5c24", "#ebcb58"]
player: gunnar
chars: 183
score: 669.92
match: 100
code: |
  <p><p><dl><p><p><style>&{background:#2F5C24}dl{scale:-1}p{+p{border-width:30 30 30 0;height:40;margin:0 72-55 122;border-radius:0 9in 9in 0}margin:25 222-30 92;border:38q solid#EBCB58
---

La cible du 19 avril est un ruban jaune sur un fond vert foncé. Il serpente comme un S, avec un carré à chaque bout : en haut à gauche et en bas à droite. Gunnar Bittersmann dessine la moitié du haut avec deux p : un carré fait seulement de bordures, et un U ouvert à gauche. Un dl reçoit les deux mêmes p, et `scale:-1` lui fait faire un demi-tour : la copie dessine la moitié du bas.

Avec **Couleurs pédagogiques**, chaque p prend sa propre couleur, et la boîte du dl apparaît pendant qu'il tourne.

{% include animations/2026-04-19.html lang=page.lang %}

## Le code, aéré

```css
<p><p>                           /* body : p, p */
<dl><p><p>                       /* le dl ferme le p ouvert ; deux autres p dedans */
<style>
& {                              /* au premier niveau : la racine, html */
  background: #2F5C24;           /* peint sur tout le canevas */
}
dl {
  scale: -1;                     /* un demi-tour autour de son centre */
}
p {                              /* les quatre p */
  + p {                          /* un p juste après un p : le 2e de body, le 2e du dl */
    border-width: 30 30 30 0;    /* pas de bordure gauche : ouvert à gauche */
    height: 40;                  /* 30 + 40 + 30 = 100 de haut */
    margin: 0 72-55 122;         /* x = 130, 190 de large ; -55 en dessous */
    border-radius: 0 9in 9in 0;  /* 864px, réduit à 50px : un demi-disque */
  }
  margin: 25 222-30 92;          /* x = 100, contenu de largeur 0 ; -30 en dessous */
  border: 38q solid#EBCB58;      /* 35,91px, arrondi à 35px */
}
/* la fin du code ferme la règle */
```

## Comment ça marche

### 1. Cinq balises : deux p, puis un dl avec deux p

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, où les longueurs sans unité comptent en pixels.

Le premier `<p>` ouvre un p. Le deuxième `<p>` le ferme et en ouvre un autre. `<dl>` ferme lui aussi le p ouvert : le dl est donc un enfant de body, après les deux p. Les deux derniers `<p>` s'ouvrent dans le dl, et le `<style>` finit dans le dernier p. Il ne s'affiche pas. getBoundingClientRect donne quatre boîtes : deux p dans body, deux p dans le dl.

Au premier niveau d'une feuille de style, `&` vise la racine : html. Le fond de la racine est peint sur tout le canevas : le canevas est vert.

### 2. Un carré fait de bordures

`p{` donne aux quatre p une bordure `38q solid#EBCB58`. 1Q vaut un quart de millimètre, 0,945px : 38q fait 35,91px. Mon Chrome arrondit les épaisseurs de bordure à l'entier du dessous : getComputedStyle donne 35px.

La boîte de contenu de body va de x = 8 à 392 : 384px de large. Les marges prennent 92px à gauche et 222px à droite. Il reste 384 − 92 − 222 = 70px, juste les deux bordures de 35px : le contenu a une largeur de 0. Le p est vide, son contenu a donc aussi une hauteur de 0. Le premier p est un carré de 70 × 70 en x = 8 + 92 = 100.

Sa marge du haut de 25px fusionne avec celle de 8px de body, et la plus grande gagne : le carré commence en y = 25.

### 3. Le deuxième p : un U

Dans `p{`, le `+p{` imbriqué veut dire `&+p` : un p juste après un autre p. C'est le deuxième p de body et le deuxième p du dl. Le premier p du dl vient en premier dans le dl : il n'est pas visé. `&+p` est plus précis que `p` : son `border-width` et sa `margin` l'emportent sur ceux du niveau au-dessus. La bordure garde le style et la couleur du niveau au-dessus.

Les marges laissent 384 − 122 − 72 = 190px en x = 130. Avec une bordure droite de 30px et pas de bordure gauche, le contenu fait 160 de large. `height:40` plus les bordures de 30px en haut et en bas donnent une boîte de 100 de haut. `9in` fait 864px. Deux rayons de 864px sur un côté de 100px, c'est trop : les deux sont réduits à 50px, et le côté droit est un demi-disque. Le bord intérieur suit, avec un rayon de 50 − 30 = 20px. Sans bordure gauche, le U est ouvert à gauche.

La marge du bas de −30 du carré remonte le U : son haut est en 95 − 30 = 65. Les 40 premiers pixels de sa bande du haut sont dans le carré, de x = 130 à 170, dans la même couleur. Le U finit en y = 165.

### 4. La même paire, dans le dl

Trois marges se touchent sous le U : celle du bas du U, −55, celle du haut du dl, 16px (la valeur par défaut du navigateur pour un dl), et celle du haut du premier p du dl, 25px. Le dl n'a ni bordure ni padding : elles fusionnent toutes en une seule, la plus grande marge positive plus la plus négative, 25 − 55 = −30. Le dl et son premier p commencent en y = 165 − 30 = 135.

Les mêmes règles donnent la même paire : un carré en (100, 135) et un U en (130, 175), de 205 − 30 = 175 à 275. La marge du bas de −55 du U fusionne avec celle du bas du dl, 16px, hors du dl : le dl finit donc au bord du bas du U. getBoundingClientRect donne au dl 8, 135, 384 × 140.

### 5. Un demi-tour

`scale:-1` multiplie le dl par −1 sur ses deux axes, autour de son centre : (8 + 192, 135 + 70) = (200, 205). C'est un demi-tour. Un point (x, y) va en (400 − x, 410 − y).

- Le carré, de 100 à 170 sur 135 à 205, arrive de 230 à 300 sur 205 à 275 : le carré du bas à droite.
- Le U, de 130 à 320 sur 175 à 275, arrive de 80 à 270 sur 135 à 235. Il est maintenant ouvert à droite, avec son demi-disque à gauche.

La bande du haut de la copie, de y = 135 à 165, tombe sur la bande du bas du premier U. Elles se recouvrent de x = 130 à 270, dans la même couleur. La bande du bas de la copie finit en x = 270, dans le carré. getBoundingClientRect donne ces boîtes après le demi-tour.

Tout le ruban est symétrique autour du centre du canevas, (200, 150) : chaque forme de la copie est une forme de la première paire, tournée autour de ce point.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&` fait 1 caractère, `html` 4. Avec `html{` (186 caractères), l'image est la même.
- Une seule règle `p` habille les quatre p. Le U n'ajoute que ce qui change, dans une règle imbriquée. Avec la règle à l'extérieur, `p{margin:25 222-30 92;border:38q solid#EBCB58}p+p{border-width:30 30 30 0;height:40;margin:0 72-55 122;border-radius:0 9in 9in 0` (184 caractères), l'image est la même. Le `+p` imbriqué n'a pas besoin de `&` : avec `&+p{` (184 caractères), l'image est la même.
- `<dl>` ferme le p ouvert et n'a pas de padding. Avec `<div>` et `div{` (185 caractères), l'image est la même. Avec `<ul>` et `ul{`, de même longueur, le padding gauche de 40px de la liste rétrécit la copie : le carré du bas arrive 40px plus à gauche, en x = 190, et 4 400 pixels changent.
- Le demi-tour est nécessaire. Sans `dl{scale:-1}` (171 caractères), la copie est une deuxième moitié du haut, sous la première, et 17 689 pixels changent.
- `scale:-1` fait tourner le dl en 8 caractères. Avec `rotate:180deg` (188 caractères), l'image est la même.
- `9in` fait 3 caractères, `50px` 4. Les deux sont réduits au même demi-disque : avec `50px` deux fois (185 caractères), l'image est la même.
- `38q` fait 3 caractères, et mon Chrome le dessine en 35px. Avec `35px` (184 caractères), l'image est la même.
- `border-width:30 30 30 0` donne au U une bande de 30px, plus fine que la bordure de 35px du carré. Avec `border-left:0` à la place (173 caractères), les bandes font elles aussi 35px, le carré du bas arrive 20px plus bas, et 12 796 pixels changent.
- `height:40` donne au U son trou. Sans lui (173 caractères), le U est une barre pleine de 60px de haut au bout arrondi, la copie remonte, et 23 346 pixels changent.
- Le mode quirks accepte les nombres sans unité. Avec `px` sur les 11 nombres sans unité, et les espaces que `72px -55px` et `222px -30px` demandent alors (207 caractères), l'image est la même.
- Les marges négatives n'ont pas besoin d'espace avant elles, et la couleur n'en a pas besoin avant `#`. Avec `72 -55`, `222 -30` et `solid #EBCB58` (186 caractères), l'image est la même.
- Le code finit dans `p{` : la fin du code le ferme. Avec `}` à la fin (184 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes formes au même endroit que la cible, avec les mêmes aplats : (47, 92, 36) et (235, 203, 88). 410 pixels s'écartent de plus de 8 niveaux. Tous sont à moins de 0,71px du cercle d'une des courbes, 204 sur la courbe du haut et 206 sur celle du bas. Le plus grand écart est de 143 niveaux, en (283, 129), sur le bord intérieur de la courbe du haut : (68, 104, 41) dans mon rendu, proche du vert, et (211, 189, 82) dans la cible, proche du jaune. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
