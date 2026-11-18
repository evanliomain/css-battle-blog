---
title: "Une police à 3 % inverse les couleurs : quatre disques sur un damier en 156 caractères"
ref: 2026-05-05
permalink: /fr/2026/05/05/une-police-a-3-pourcent-inverse-les-couleurs/
description: "Comment un seul radial-gradient écrit en em peint les quatre images vides d'un damier, et comment une police de 3 % sur deux d'entre elles rétrécit leur em et inverse leurs couleurs, dans la cible CSS Battle du 5 mai 2026."
target: /assets/targets/2026-05-05.png
target_url: https://cssbattle.dev/play/W01jEclRqT6bYFAZZCmn
colors: ["#c0d6e8", "#3f4869", "#e25c57"]
player: emohdaziz
chars: 156
score: 690.43
match: 100
code: |
  <img r><img><img><img r><style>&{margin:42 92;background:#16a4;[r]{font:3%a}img{padding:50;background:radial-gradient(#3f4869,2.2em,#e25c57 0 73em,#3f4869 0
---

La cible du 5 mai est un damier de 2 × 2 sur un fond bleu pâle : deux cases bleu nuit et deux cases corail, chacune avec un disque de l'autre couleur au milieu. Mohamed Ali le dessine avec quatre images vides et un seul dégradé radial pour toutes. Les longueurs du dégradé sont en em. Deux images reçoivent une police minuscule : le même dégradé en sort avec ses couleurs inversées.

Avec **Couleurs pédagogiques**, les boîtes de html, de body et des deux sortes d'images prennent leur propre couleur avant que le dégradé ne les recouvre.

{% include animations/2026-05-05.html lang=page.lang %}

## Le code, aéré

```css
<img r><img><img><img r>
<style>
& {                          /* au premier niveau, & est la racine : html */
  margin: 42 92;             /* html : 216 × 216 en (92, 42) */
  background: #16a4;         /* #1166aa44, sur tout le canevas : #c0d6e8 */
  [r] {                      /* la 1re et la 4e image */
    font: 3% a;              /* 3 % de 16px = 0,48px ; « a » est le nom de police */
  }
  img {                      /* les quatre images */
    padding: 50;             /* sans image : une boîte de 100 × 100 */
    background: radial-gradient(
      #3f4869, 2.2em,        /* bleu, puis un repère à 2.2em */
      #e25c57 0 73em,        /* rouge de 2.2em (le 0 avance) à 73em */
      #3f4869 0              /* bleu à partir de 73em (le 0 avance) */
    /* la fin du code ferme le dégradé et les deux règles */
```

## Comment ça marche

### 1. Quatre images et un style

Le code commence par quatre balises `<img>`. Le parseur les met dans body, et le `<style>` qui les suit va aussi dans body. Deux images portent un attribut `r`, sans valeur : la première et la dernière.

`&` au premier niveau d'une feuille de style désigne la racine : il vise html. Les règles imbriquées dedans, `[r]{…}` et `img{…}`, visent les éléments de html qui correspondent : les deux images `r`, et les quatre images.

### 2. html et le fond

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Une longueur sans unité y vaut des px, pour des propriétés comme `margin` et `padding`. En mode quirks, html remplit aussi la page, moins ses marges.

`margin:42 92` laisse à html 400 − 2 × 92 = 216 de large et 300 − 2 × 42 = 216 de haut. Mon rendu place la boîte de html en (92, 42).

html est la racine : son fond est peint sur tout le canevas. `#16a4` est la forme courte de `#1166aa44` : le bleu `#1166aa` avec une transparence de 0x44 = 68/255, soit 26,7 % d'opacité. Sur le blanc de la page, mon rendu donne (192, 214, 232), c'est-à-dire `#c0d6e8`.

### 3. body et quatre boîtes de 100 × 100

body garde sa marge par défaut de 8px : mon rendu le place en (100, 50), en 200 × 200.

Les images n'ont pas de `src`, donc pas d'image : leur boîte de contenu fait 0 × 0. `padding:50` ajoute 50px de chaque côté, et chaque image devient une boîte de 100 × 100. Les images sont en ligne : elles se rangent côte à côte comme des mots. Deux tiennent dans les 200px de body, les deux suivantes passent à la ligne. Mon rendu les place en (100, 50), (200, 50), (100, 150) et (200, 150).

Les deux rangées se touchent. Dans une copie de test en mode standard (un doctype, et `px` ajouté aux deux longueurs, 177 caractères), mon rendu place la seconde rangée en y = 154 : la ligne garde de la place sous les images, sous la ligne de base, comme pour les jambages des lettres. En mode quirks, une ligne qui ne contient que des images n'en garde pas : les rangées sont en y = 50 et y = 150, et les quatre boîtes font un carré de 200 × 200.

Les images `r` sont la première et la quatrième : elles tombent sur une diagonale.

### 4. Le dégradé sur une image normale

Une image normale a la taille de police par défaut, 16px. Donc 2.2em = 35,2px et 73em = 73 × 16 = 1168px. Pour ces images, mon Chrome donne cette valeur calculée :

`radial-gradient(rgb(63, 72, 105), 35.2px, rgb(226, 92, 87) 0px, rgb(226, 92, 87) 1168px, rgb(63, 72, 105) 0px)`

`#e25c57 0 73em` est une couleur avec deux positions : elle devient deux arrêts rouges, à 0 et à 73em.

La liste se lit ainsi :

- `#3f4869` sans position : la première couleur part de 0.
- `2.2em` seul, après une virgule : un repère, l'endroit où le mélange entre les deux couleurs qui l'entourent est fait à moitié.
- `#e25c57 0` : une position ne peut pas revenir avant un arrêt ou un repère précédent, donc ce 0 avance jusqu'à 2.2em. Le repère est tout au bout du mélange : le bleu reste bleu jusqu'à 2.2em, et le bord est net. Dans une copie de test avec `#e25c57 2.2em` (160 caractères), l'image est la même.
- `73em` : le rouge va jusqu'à 1168px.
- `#3f4869 0` : ce 0 avance jusqu'à 73em. Le bleu part de 1168px.

Dans une boîte carrée, l'ellipse par défaut est un cercle, et sa taille par défaut atteint le coin le plus éloigné : à 70,7px du centre d'une boîte de 100 × 100. 1168px est bien au-delà : le bleu d'après 73em ne se voit jamais. Une image normale est un disque bleu de rayon 35,2 sur un carré rouge. Sur la ligne y = 100, mon rendu peint le disque de l'image en haut à droite de x = 215 à 284.

### 5. Les images `r` : une police de 3 %

`[r]{font:3%a}` règle la police des deux images `r`. Une taille de police en pourcentage se rapporte à celle du parent : 3 % de 16px = 0,48px. `font` est un raccourci qui exige un nom de police : `a` en est un, même si aucune police ne porte ce nom.

Dans mon Chrome, `getComputedStyle` donne une taille de police de 6px pour ces deux images, et non 0,48px, mais les longueurs du dégradé sont calculées à partir de 0,48px : 2.2em = 1,056px et 73em = 35,04px.

La même liste donne maintenant :

- du bleu de 0 à 1,056px : un point de rayon 1 au centre ;
- du rouge de 1,056px à 35,04px : un disque rouge ;
- du bleu de 35,04px jusqu'aux coins.

Cela fait un disque rouge de rayon 35,04 sur un carré bleu : les couleurs d'une image normale, inversées. Les deux rayons valent 35,2 et 35,04 : les quatre disques ont presque la même taille.

Les deux nombres sont réglés pour ça. Avec `72em` ou `74em` (156 caractères chacun), les disques rouges changent de taille, et 216 et 192 pixels changent. Avec `2.1em` ou `2.3em` (156 caractères chacun), ce sont les disques bleus qui changent de taille, et 680 et 728 pixels changent. Avec une police de `2%` ou `4%` (156 caractères chacun), 4 312 et 6 016 pixels changent.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul dégradé sert aux quatre images. Il est écrit en em, et l'em suit la taille de police de chaque élément : une courte règle sur deux images inverse leurs couleurs. Sans `[r]{font:3%a}` (143 caractères), les quatre images sont pareilles, quatre disques bleus sur du rouge, et 19 896 pixels changent.
- `font:3%a` fait 8 caractères. Avec `font-size:3%` (160 caractères), l'image est la même. Le raccourci exige un nom de police : avec `font:3%` (155 caractères), mon Chrome ignore la déclaration, et l'image est celle sans la règle, 19 896 pixels changés.
- Les positions `0` font 1 caractère chacune : un arrêt ne peut pas revenir en arrière, donc `0` veut dire « à la position précédente ». Avec `#e25c57 2.2em` (160 caractères), l'image est la même. Le dernier `0` est nécessaire : avec `#3f4869` seul (154 caractères), le dernier bleu se place au bout du dégradé, aux coins, les deux cases `r` passent en fondu du rouge au bleu, et 12 272 pixels changent.
- `#3f4869,2.2em` utilise un repère. Avec un arrêt, `#3f4869 2.2em` (156 caractères), la longueur et l'image sont les mêmes.
- `#16a4` écrit en 5 caractères le bleu pâle du canevas. Avec `#c0d6e8` (158 caractères) ou `#1166aa44` (160 caractères), l'image est la même.
- Un attribut sans valeur est le crochet le plus court : `<img r>` et `[r]`. Avec `<img class=r>` et `.r` (167 caractères), l'image est la même.
- Les longueurs se passent d'unité en mode quirks. Avec `42px 92px` et `50px` (162 caractères), l'image est la même.
- `&{` a trois caractères de moins que `html{` : avec `html{` (159 caractères), l'image est la même. Imbriquer `[r]` et `img` dedans ne coûte rien ici : la version à plat, `&{margin:42 92;background:#16a4}[r]{…}img{…` (156 caractères), donne la même image.
- Le code se termine dans le dégradé et dans deux règles : la fin du code les ferme. Avec `)}}` à la fin (159 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes cases et les mêmes disques au même endroit que la cible. 474 pixels diffèrent de plus de 8 niveaux. 466 d'entre eux sont sur les bords arrondis des quatre disques, tous entre 34,47px et 35,59px du centre d'un disque. Les 8 autres forment deux petits points bleus de 2 × 2 pixels, au centre des deux disques rouges : (149..150, 99..100) et (249..250, 199..200). C'est le bleu de 0 à 1,056px : dans une copie de test où les images `r` reçoivent plutôt `radial-gradient(#e25c57 35.04px,#3f4869 0)`, ces 8 pixels deviennent rouges et aucun autre pixel ne change. Les aplats sont les mêmes, sauf le canevas : (192, 214, 232) dans mon rendu, (192, 214, 231) dans la cible. La plus grande différence est de 163 niveaux, en (282, 86), sur le bord du disque en haut à droite : bleu dans mon rendu, rouge dans la cible. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
