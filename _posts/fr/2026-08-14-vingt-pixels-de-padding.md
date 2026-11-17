---
title: "Vingt pixels de padding : trois formes évidées en 133 caractères"
ref: 2026-08-14
permalink: /fr/2026/08/14/vingt-pixels-de-padding/
description: "Comment des flottants, un seul padding de 20px et une marge de −4 % alignent l'anneau, le carré et l'anneau de la cible CSS Battle du 14 août 2026."
target: /assets/targets/2026-08-14.png
target_url: https://cssbattle.dev/play/tX0iC11qNcPozRZ9qhRO
colors: ["#6d1477", "#f5e3b5"]
player: beo
chars: 133
score: 712.6
match: 100
code: |
  <p a><a><p><a a><p a><a><style>[a]{border-radius:50%}*{background:#6D1477;padding:20;float:left}p{background:#F5E3B5;margin:62-4%0 22
---

La cible du 14 août montre trois formes beiges alignées sur un fond violet : un disque percé d'un carré, un carré percé d'un rond, puis un autre disque percé d'un carré. Beo les construit avec trois `p` flottants, qui contiennent chacun un `a` flottant. Un seul `padding:20` donne toutes les tailles, et une marge droite de −4 % suffit tout juste à faire tenir les trois formes sur une ligne.

Cochez **Couleurs pédagogiques** pour voir body et les `a`, violets comme le fond, et passez en **Vue large** pour voir où part la troisième forme sans la marge négative.

{% include animations/2026-08-14.html lang=page.lang %}

## Le code, aéré

```html
<p a><a>                  <!-- un p avec l'attribut a, qui contient un a -->
<p><a a>                  <!-- ce <p> ferme le premier p -->
<p a><a>
<style>
[a] {                     /* le 1er et le 3e p, le 2e a */
  border-radius: 50%;     /* des cercles */
}
* {                       /* tous les éléments, html compris */
  background: #6D1477;    /* le canevas, et les trous */
  padding: 20;            /* 20px : a fait 40 × 40, p fait 80 × 80 */
  float: left;            /* côte à côte, chaque p entoure son a */
}
p {
  background: #F5E3B5;    /* les formes beiges */
  margin: 62 -4% 0 22     /* −4 % de 304px = −12,16px à droite */
```

## Comment ça marche

### 1. Une règle pour tous les éléments

`*` vise tous les éléments : html, head, body, les `p` et les `a`, et style. head et style ne s'affichent pas. Le fond de html peint tout le canevas en `#6D1477`.

Il n'y a pas de doctype : la page est en mode quirks, et les nombres sans unité comme `padding:20` sont des px. J'ai vérifié avec `<!doctype html>` devant : les valeurs sans unité sont ignorées, chaque `p` fait 0 × 0, et le canevas est tout violet.

html prend 20px de padding. body garde sa marge par défaut de 8px, puisqu'aucune règle ne la change, et prend lui aussi 20px de padding. J'ai mesuré body en (28 ; 28), 344 × 182 avec son padding. Son contenu commence à 20 + 8 + 20 = 48 sur les deux axes, et fait 344 − 2 × 20 = 304px de large.

### 2. Six balises, aucune fermée

`<p a><a><p><a a><p a><a>` n'a aucune balise fermante. Une balise `<p>` ferme le `p` encore ouvert, et le `a` qu'il contient part avec lui. J'ai lu le DOM dans Chrome : trois `p`, avec un `a` dans chacun. Le premier et le troisième `p` portent l'attribut `a`, comme le deuxième `a`. L'élément `<style>` finit dans le dernier `a`. Il marche quand même, et il ne s'affiche pas.

### 3. Les flottants donnent les tailles

Un `a` est un élément en ligne. `float:left` en fait un bloc : son padding compte alors dans les deux sens. Il est vide : 20 + 20 = 40px de côté.

Un `p` flottant s'ajuste à son contenu et contient son `a` flottant : 20 + 40 + 20 = 80px de côté, avec le `a` à 20px de chaque bord. Je les ai tous mesurés avec getBoundingClientRect : 80 × 80 et 40 × 40.

J'ai vérifié les deux flottants :

- avec `a{float:none}` en plus, les `a` restent en ligne, et les `p` font 80 × 58 ;
- avec `p{float:none}` en plus, les `p` ne contiennent plus leur `a` : ils font 40px de haut, leur seul padding, et s'empilent en y = 110, 212 et 314.

### 4. Les marges placent la première forme

`margin:62-4%0 22` se lit comme quatre valeurs : 62px en haut, −4 % à droite, 0 en bas, 22px à gauche. Le premier `p` arrive à 48 + 22 = 70 en largeur et 48 + 62 = 110 en hauteur. C'est là que commence le premier disque dans la cible.

### 5. Une marge de −4 % fait de la place

Une marge en % se calcule sur la largeur du parent : ici, les 304px du contenu de body. 4 % de 304 font 12,16px. getComputedStyle donne −12,1562px, le pas de 1/64px le plus proche dans Chrome.

Chaque `p` prend alors 22 + 80 − 12,16 = 89,84px. getBoundingClientRect place les trois `p` en x = 70, 159,84 et 249,69. Chrome peint les boîtes sur des pixels entiers : dans mon rendu, le carré du milieu commence au pixel 160, et avec une marge entière de −12px à la place, le rendu est le même, au pixel près. Les formes arrivent à 70, 160 et 250, avec 10px d'écart.

Sans la marge négative, chaque `p` prend 22 + 80 = 102px, et trois font 306px. C'est 2px de plus que les 304px du contenu de body. J'ai vérifié avec `margin:62 0 0 22` : le troisième `p` passe à la ligne, en (70 ; 252), en partie sous le canevas.

### 6. Arrondir les `[a]`

`[a]` vise tout élément qui porte l'attribut `a`, quelle que soit sa balise. `border-radius:50%` fait du premier et du troisième `p` des disques de 40px de rayon, et du deuxième `a` un disque de 20px de rayon. Les `p` sont beiges, et les `a` restent violets comme le fond : on dirait des trous.

## Notes de golf

- Aucune balise fermante : chaque `<p>` ferme le précédent.
- Un attribut nu `a` coûte 2 caractères par balise, et le sélecteur `[a]` arrondit deux `p` et un `a` d'un coup.
- Une seule règle `*` donne son fond à html, qui fait le canevas, et aux `a`, qui font les trous. Seul `p` a besoin d'une seconde couleur.
- `padding:20` sur tout donne toutes les tailles : 40px pour les `a`, 80px pour les `p`, et une partie du décalage de la première forme. Le nombre n'a pas d'unité, comme le permet le mode quirks.
- `float:left` s'applique aussi à html, head, body et style, puisqu'il est dans la règle `*`. J'ai vérifié body avec `float:none` : le rendu est le même, au pixel près.
- `-4%0` n'a pas besoin d'espace entre `%` et `0`. Avec une marge de −12px, il faut une espace, `62-12 0 22` : 134 caractères, pour le même rendu.
- Une accolade reste ouverte, `p{`, et il n'y a pas de `</style>`. Avec `}`, le code fait 134 caractères ; avec `}</style>`, 142. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les carrés tombent sur les mêmes pixels que dans la cible. Mais 710 pixels diffèrent de mon rendu, dont 593 de plus de 8 niveaux. Tous sont à moins de 1,5px du bord d'un cercle : les deux disques et le trou rond. Le plus grand écart est de 158 niveaux, en (213 ; 164), sur le bord du trou rond : mon rendu y est (124, 43, 126), et la cible (228, 201, 173). Mesuré d'après la part de beige de chaque pixel, le centre de chaque disque est environ 0,3px plus à gauche et 0,3px plus haut dans la cible que dans mon rendu. Sur le juge de CSS Battle, le code est identique à 100 %.
