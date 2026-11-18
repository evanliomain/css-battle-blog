---
title: "Quatre points, deux effacés : deux carrés et deux disques entamés en 166 caractères"
ref: 2026-05-06
permalink: /fr/2026/05/06/quatre-points-deux-effaces/
description: "Comment une outline en pointillés de 75Q autour d'une boîte html de 30px dessine quatre disques bleus, et comment une seule liste d'ombres, crème sur html et verte sur un body retourné, garde deux carrés et deux disques entamés dans la cible CSS Battle du 6 mai 2026."
target: /assets/targets/2026-05-06.png
target_url: https://cssbattle.dev/play/GrISq22zl1z1mSsD4vt6
colors: ["#173889", "#4a9a86", "#f3ead2"]
player: kieron
chars: 166
score: 682.21
match: 100
code: |
  <style>&{outline:75Q dotted#173889}*{margin:135 185;background:#4a9a86;color:f3ead2;box-shadow:25vw 25vw 0 35px,-25vw -25vw 0 35px;*{color:4A9A86;scale:1-1;margin:-35
---

La cible du 6 mai montre deux carrés crème sur un fond vert, l'un en haut à gauche, l'autre en bas à droite. Chacun porte un disque bleu à son coin intérieur, avec un quart en moins. Kieron dessine quatre disques avec les points d'une épaisse outline en pointillés, autour d'une petite boîte html. Une seule liste d'ombres sert ensuite à deux éléments : sur html, elle peint les carrés crème, et sur body, retourné, elle peint du vert sur ce qui doit partir.

Avec **Couleurs pédagogiques**, la boîte de body et ses ombres vertes prennent leur propre couleur : on voit ce qu'elles cachent. **Vue large** montre les ombres de body qui sortent du canevas.

{% include animations/2026-05-06.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                              /* au premier niveau, & est la racine : html */
  outline: 75Q dotted #173889;   /* 70,87px, tracée sur 70px : un point de 70px par coin */
}
* {                              /* html, head, style, body */
  margin: 135 185;               /* html : une boîte de 30 × 30 en (185, 135) */
  background: #4a9a86;           /* celui de html va sur tout le canevas */
  color: f3ead2;                 /* pas besoin de # en mode quirks ; les ombres la prennent */
  box-shadow:
    25vw 25vw 0 35px,            /* 100px à droite et en bas, grossie de 35px */
    -25vw -25vw 0 35px;          /* 100px à gauche et en haut, grossie de 35px */
  * {                            /* head, style, body : seul body est affiché */
    color: 4A9A86;               /* ombres de body : le vert du fond */
    scale: 1 -1;                 /* à l'envers, et peint par-dessus l'outline */
    margin: -35;                 /* body : 100 × 100 en (150, 100) */
    /* la fin du code ferme les deux règles */
```

## Comment ça marche

### 1. Deux boîtes

Le code n'est qu'un `<style>`. Le parseur le met dans head, et ajoute un body vide. La page a quatre éléments : html, head, style et body. head et style ne sont pas affichés, donc seuls html et body dessinent quelque chose.

`*` vise les quatre. Le `*{…}` imbriqué dedans vise les éléments placés dans un autre élément : head, style et body. Il vient après la règle extérieure, donc ses valeurs l'emportent pour eux.

`&` au premier niveau d'une feuille de style désigne la racine : il vise html. Écrit `html{` (169 caractères), l'image est la même.

### 2. html : une boîte de 30 × 30

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Une longueur sans unité y vaut des px, pour des propriétés comme `margin`. En mode quirks, html remplit aussi la page, moins ses marges.

`margin:135 185` laisse à html 400 − 2 × 185 = 30 de large et 300 − 2 × 135 = 30 de haut. Mon rendu place la boîte de html de (185, 135) à (215, 165).

html est la racine : son fond est peint sur tout le canevas, pas seulement dans sa boîte. Cela donne le vert, `#4a9a86`.

### 3. L'outline en pointillés : quatre disques

`outline:75Q dotted#173889` trace une ligne autour de la boîte de html. 1in = 101,6Q, donc 1Q = 0,945px et 75Q = 70,87px. Mon Chrome calcule un `outline-width` de 70px : l'outline va de 185 − 70 = 115 à 215 + 70 = 285.

Le milieu de cette ligne est un carré à 35px de la boîte de html, de (150, 100) à (250, 200). En pointillés, chaque point est un disque aussi large que le trait. Dans une copie de test où body est caché, mon rendu dessine un disque de 70px à chaque coin de ce carré, et rien d'autre. Le disque en haut à gauche couvre x = 115 à 185 sur la ligne y = 100, et y = 65 à 135 sur la colonne x = 150. Cela fait quatre disques de rayon 35, centrés en (150, 100), (250, 100), (150, 200) et (250, 200).

Avec `74Q` ou `76Q` (166 caractères chacun), mon Chrome trace l'outline sur 69px ou 71px, les disques changent de taille, et 429 et 443 pixels changent.

### 4. Les ombres de html : deux carrés crème

`color:f3ead2` n'a pas de `#`. En mode quirks, une couleur hexadécimale sans `#` est acceptée pour `color`. Les ombres n'ont pas de couleur à elles : elles prennent la `color` de l'élément, le crème pour html.

25vw est le quart des 400px de large : 100px. `25vw 25vw 0 35px` copie la boîte de html 100px à droite et 100px plus bas. Le `0` est le flou : aucun. Le `35px` est l'étalement : la copie grossit de 35px de chaque côté, 30 + 2 × 35 = 100. Cela donne un carré crème de (250, 200) à (350, 300). `-25vw -25vw 0 35px` place l'autre de (50, 0) à (150, 100).

Dans mon rendu, l'outline est peinte par-dessus les ombres de html : les disques en (150, 100) et (250, 200) se posent sur les coins des carrés crème.

### 5. body : les mêmes ombres, en vert

La règle imbriquée donne à body `margin:-35` : body dépasse html de 35px de chaque côté. Mon rendu le place de (150, 100) à (250, 200), une boîte de 100 × 100. Il reçoit aussi le fond vert de `*`.

body reçoit le même `box-shadow`, mais sa `color` est `4A9A86`, le vert du fond. Ses deux ombres font 100 + 2 × 35 = 170 de large. Sans le retournement, elles iraient de (215, 165) à (385, 335) et de (15, −35) à (185, 135) : juste sur les carrés crème.

### 6. Le retournement

`scale:1-1` vaut `scale:1 -1` : la largeur est gardée, et la hauteur est multipliée par −1. body se retourne autour de son centre, (200, 150), et ses ombres passent sur l'autre diagonale. Dans une copie de test avec body en rouge et ses ombres en bleu, mon rendu les montre de (215, 0) à (385, 135) et de (15, 165) à (185, 300) sur le canevas. Elles continuent jusqu'à −35 et 335, hors du canevas.

Une transformation fait aussi de body un contexte d'empilement. Dans mon rendu, il est alors peint par-dessus l'outline de html :

- la boîte de body couvre le quart intérieur des disques en (150, 100) et (250, 200) ;
- les ombres vertes couvrent en entier les disques en (250, 100) et (150, 200). Leurs bords touchent ces disques en x = 215 et y = 135, et en x = 185 et y = 165.

Dans la copie de test sans `scale:1-1`, la boîte et les ombres de body restent sous les quatre disques.

Il reste deux carrés crème et deux disques avec un quart en moins, chacun tourné vers le centre.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres sert à deux éléments. Les ombres prennent la `color` de chaque élément : crème sur html, vertes sur body. Vert sur vert, les ombres de body servent de gomme. Sans `color:4A9A86;` (153 caractères), les ombres de body sont crème elles aussi : deux carrés crème de plus couvrent l'autre diagonale et ses deux disques, et 43 450 pixels changent.
- Le retournement fait deux choses : il envoie les ombres de body sur l'autre diagonale, et il met body par-dessus l'outline. Sans `;scale:1-1` (156 caractères), les quatre disques restent entiers, les ombres de body couvrent les carrés crème, et 27 926 pixels changent.
- D'autres retournements marchent aussi : `scale:-1 1` (167 caractères) et `rotate:90deg` (169 caractères) donnent la même image. `scale:-1` (165 caractères) a un caractère de moins, mais il retourne dans les deux sens : un demi-tour, qui renvoie les ombres sur les carrés crème, et 29 808 pixels changent.
- `scale:1-1` se passe d'espace : `1-1` se lit 1 puis −1. Avec `scale:1 -1` (167 caractères), l'image est la même.
- `&{` a trois caractères de moins que `html{`.
- 75Q écrit l'outline de 70px en 3 caractères. Avec `70px` (167 caractères), l'image est la même.
- 25vw écrit 100px en 4 caractères. Avec quatre fois `100px` (170 caractères), l'image est la même.
- `f3ead2` et `4A9A86` se passent de `#` en mode quirks. Avec `#f3ead2` ou `#4A9A86` (167 caractères chacun), l'image est la même.
- Les marges se passent d'unité en mode quirks. Avec `135px 185px` (170 caractères) ou `-35px` (168 caractères), l'image est la même. L'étalement, lui, a besoin de son unité : avec deux fois `35` à la place de `35px` (162 caractères), mon Chrome ignore tout le `box-shadow`, les carrés crème disparaissent, et 24 001 pixels changent.
- Pas d'espace avant un `#` : `dotted #173889` (167 caractères) donne la même image.
- Le code se termine dans les deux règles : la fin du code les ferme. Avec `}}` à la fin (168 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes formes au même endroit que la cible. 223 pixels diffèrent de plus de 8 niveaux, 112 sur le disque du haut et 111 sur celui du bas. Ils sont tous à moins de 0,6px du bord arrondi d'un disque. Les aplats sont les mêmes : (74, 154, 134), (243, 234, 210) et (23, 56, 137). La plus grande différence est de 176 niveaux, en (277, 221), sur le bord du disque du bas : (67, 92, 150) dans mon rendu, du crème dans la cible. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
