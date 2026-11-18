---
title: "Une ombre inset, deux couleurs : un disque à moitié vert en 120 caractères"
ref: 2026-05-14
permalink: /fr/2026/05/14/une-ombre-inset-deux-couleurs/
description: "Comment une seule ombre inset avec une valeur de repli dans une variable peint un carré jaune pour html et un disque à moitié vert pour body, dans la cible CSS Battle du 14 mai 2026."
target: /assets/targets/2026-05-14.png
target_url: https://cssbattle.dev/play/lbDC8Xg8NQaWWPfXAyID
colors: ["#1a4341", "#ebe77e", "#84be8d"]
player: emohdaziz
chars: 120
score: 727.45
match: 100
code: |
  <style>*{background:#1a4341;box-shadow:0 var(--a,5in#ebe77e)inset}&{margin:50 100;*{--a:97Q#84be8d;clip-path:circle(70px
---

La cible du 14 mai montre un carré jaune pâle sur un fond vert très foncé, avec un disque au milieu : vert clair en haut, de la couleur du fond en bas. Mohamed Ali la peint avec une seule `box-shadow` intérieure, donnée à tous les éléments. html prend la valeur de repli d'une variable : une ombre jaune décalée de 480px vers le bas, qui remplit toute sa boîte. body donne à la variable une ombre verte décalée d'environ 91,65px, qui ne peint que sa bande du haut, puis se découpe en cercle.

Les **Couleurs pédagogiques** montrent la boîte de html et le fond de body, qui a le même vert foncé que le canevas. La **Vue large** suit la copie décalée de la boîte de html jusqu'en y = 530.

{% include animations/2026-05-14.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                          /* html, head, style, body */
  background: #1a4341;                       /* html : tout le canevas ; body : la moitié foncée */
  box-shadow: 0 var(--a, 5in #ebe77e) inset; /* sans --a : 0 5in #ebe77e inset */
}
& {                                          /* au premier niveau : html */
  margin: 50 100;                            /* en px en mode quirks : html fait 200 × 200 */
  * {                                        /* & * : head, style, body */
    --a: 97Q #84be8d;                        /* l'ombre de body : 0 97Q #84be8d inset */
    clip-path: circle(70px                   /* un disque de rayon 70 ; la fin du code ferme le reste */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `50` dans une marge est lu en px.

Le navigateur construit html, head et body autour du code. Le `<style>` va dans head. `*` vise html, head, style et body. head et style ne s'affichent pas.

Au premier niveau, `&` vise la racine de la page : html. Le `*` imbriqué dedans vaut `& *` : tous les éléments dans html, donc head, style et body. Les règles ne sont jamais fermées : la fin du code les ferme, et la parenthèse de `circle(` aussi.

### 2. html, 200 × 200

`margin:50 100` donne à html 50 en haut et en bas, 100 à gauche et à droite. En mode quirks, html remplit la zone d'affichage moins ses marges : 400 − 200 = 200 de large et 300 − 100 = 200 de haut, en (100, 50).

Le fond de html, `#1a4341`, peint tout le canevas, pas seulement la boîte de html.

### 3. Une ombre intérieure sortie de sa boîte

html n'a pas de `--a` : `var(--a,5in#ebe77e)` prend sa valeur de repli. L'ombre de html vaut `0 5in #ebe77e inset`.

Une ombre intérieure peint dans la boîte. Elle couvre la boîte, sauf là où se trouve une copie de la boîte décalée de l'offset. Ici, l'offset vaut 0 en largeur et 5in vers le bas : 5 × 96 = 480px. La copie va de y = 530 à 730, sous la boîte de html, qui finit en y = 250. Rien de la boîte ne reste découvert : toute la boîte devient jaune, un carré de 200 × 200.

### 4. body et sa bande verte

body garde sa marge par défaut de 8px. En mode quirks, body remplit html moins cette marge : 184 × 184 en (108, 58). Son centre est (200, 150), le centre du canevas. Son fond, `#1a4341`, vient de `*` et cache le jaune.

`var()` est recalculé pour chaque élément. body a `--a:97Q#84be8d` : son ombre vaut `0 97Q #84be8d inset`. 1Q vaut un quart de millimètre, environ 0,945px : 97Q ≈ 91,65px. La copie de la boîte de body descend de 91,65px, de y ≈ 149,65 à 333,65. Seule la bande du haut reste couverte : en vert, de y = 58 à environ 149,65. Le reste de body montre son fond vert foncé.

### 5. circle(70px)

`clip-path:circle(70px)` garde un disque de rayon 70. Sans position, le disque est au centre de la boîte de body : (200, 150). Il va de x = 130 à 270 et de y = 80 à 220.

Dans le disque, body montre sa bande verte au-dessus de y ≈ 150 et son fond vert foncé en dessous. Hors du disque, body n'est pas peint, et le jaune de html réapparaît. La moitié basse du disque est le fond de body lui-même, de la même couleur que le canevas.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule `box-shadow` pour deux couleurs. html prend la valeur de repli de la variable, et body ne donne que la variable. Avec une deuxième `box-shadow` à la place, `*{background:#1a4341;box-shadow:0 5in#ebe77e inset}&{margin:50 100;*{box-shadow:0 97Q#84be8d inset;clip-path:circle(70px` (127 caractères), l'image est la même.
- `&` au premier niveau vise html en 1 caractère. Avec `html{` (123 caractères), l'image est la même.
- `97Q` écrit environ 91,65px en 3 caractères. `box-shadow` n'accepte pas les nombres seuls, même en mode quirks : avec `--a:92#84be8d` (119 caractères), mon Chrome abandonne l'ombre de body, tout le disque est vert foncé, et 7 777 pixels changent. `92px` prend 4 caractères.
- `5in` écrit 480px en 3 caractères. Tout décalage d'au moins 200 remplit la boîte de html : avec `200px` (122 caractères), l'image est la même. Avec `2in`, soit 192px (120 caractères), une bande foncée de 8px reste en bas du carré, de y = 242 à 250, et 1 600 pixels changent.
- La marge par défaut de body centre tout gratuitement. html fait 200 × 200 en (100, 50), body est 8px à l'intérieur : son centre, où va le cercle par défaut, est (200, 150).
- Des nombres seuls dans la marge, grâce au mode quirks. Avec `margin:50px 100px` (124 caractères), l'image est la même.
- Pas d'espace là où un mot se termine tout seul : avant chaque `#` et entre `)` et `inset`. Avec des espaces à ces trois endroits (123 caractères), l'image est la même.
- Le code s'arrête dans `circle(`, et la fin du code la ferme, avec les deux règles ouvertes. Avec `)}}` à la fin (123 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, le code officiel ne donne pas tout à fait la cible. L'ombre de body finit en y = 58 + 91,65 = 149,65, et la ligne 149 du disque sort mélangée, verte aux trois quarts environ. Dans la cible, cette ligne est entièrement verte. Avec `92px` à la place de `97Q`, l'ombre finit en y = 150, et la ligne 149 sort entièrement verte, comme la cible. Le bord adouci du cercle est aussi nuancé un peu autrement que dans la cible : 393 autres pixels s'écartent de plus de 8 sur un canal. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
