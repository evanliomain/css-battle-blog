---
title: "Huit coins, un dégradé : un banc en 149 caractères"
lang: fr
ref: 2026-11-07
permalink: /fr/2026/11/07/huit-coins-un-degrade/
description: "Comment un dégradé conique copié dans les coins d'un border-image dessine la cible CSS Battle du 7 novembre 2026 : un banc crème avec deux pieds noirs et deux carrés noirs dessus."
target: /assets/targets/2026-11-07.png
target_url: https://cssbattle.dev/play/QYh1So3F1gjsyf4gTzmp
colors: ["#0000", "#000", "#469e6c", "#f2f1e0"]
player: evanliomain
chars: 149
score: 696.67
match: 100
code: |
  <style>*{border-image:conic-gradient(at 33%83%,#0000 25%,#000 0)1e3/64Q;margin:105 110-130;background:#469e6c;*{margin:70-60;box-shadow:0-50px#f2f1e0
---

La cible du 7 novembre ressemble à un banc vu de face, sur un fond vert : une large bande crème, deux petits carrés noirs posés dessus, et deux pieds noirs en L dessous. Je dessine toutes les parties noires avec un seul `border-image`. Son image est un dégradé conique qui fait une équerre noire. Une tranche plus grande que l'image en met une copie entière dans chaque coin de `html` et du `body` : huit équerres, dont quatre se voient. Une ombre du `body` dessine la bande et cache le bas des deux équerres du haut.

Passez en **Vue large** pour voir les équerres qui finissent sous le canevas, et cochez **Couleurs pédagogiques** pour distinguer les coins de `html` de ceux du `body`.

{% include animations/2026-11-07.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                  /* html et body */
  border-image:
    conic-gradient(at 33% 83%, #0000 25%, #000 0)   /* une équerre noire */
    1e3 / 64Q;                       /* l'image entière dans chaque coin de 60,47px */
  margin: 105 110 -130;              /* html : 180 × 325 */
  background: #469e6c;               /* part sur le canevas */
  * {                                /* body */
    margin: 70 -60;                  /* 300 × 185 */
    box-shadow: 0 -50px #f2f1e0;     /* la bande crème */
  }
}
```

## Comment ça marche

### 1. html est une boîte de 180 × 325

`*` vise tous les éléments : `html` et le `body` (ainsi que `head` et `style`, qui ne s'affichent pas). La règle imbriquée donne ensuite au `body` sa propre marge et son ombre. `html` garde `margin:105 110 -130` : 105 en haut, 110 sur les côtés, −130 en bas. Sa largeur vaut 400 − 2 × 110 = 180px. CSS Battle tourne en mode quirks, où `html` remplit la fenêtre moins ses marges haute et basse : 300 − 105 + 130 = 325px. `html` va donc de (110, 105) à (290, 430), loin sous le canevas.

Son fond, `#469e6c`, part sur tout le canevas. Le `body` reçoit le même vert, qui ne cache rien ici.

### 2. Un dégradé conique dessine une équerre

`conic-gradient(at 33% 83%, #0000 25%, #000 0)` tourne autour d'un point à 33 % du bord gauche et 83 % du haut. Il part vers le haut et tourne dans le sens des aiguilles d'une montre. Le premier quart, du haut vers la droite, est en `#0000` : transparent. Le `0` de `#000 0` fait commencer le noir là où finit le transparent, et le noir fait tout le reste du tour.

Le quart en haut à droite du point est donc transparent, et tout ce qui est à gauche du point ou sous lui est noir. C'est une équerre, avec une barre verticale de 33 % de large et une barre horizontale de 17 % de haut.

### 3. Une tranche plus grande que l'image : l'image entière dans chaque coin

Un `border-image` coupe son image en neuf morceaux avec quatre tranches. Il met les quatre morceaux de coin dans les coins de l'élément, étire les bords et laisse tomber le centre. `1e3` demande des tranches de 1000px, plus que la taille de l'image. Des tranches aussi grandes valent 100 %. Chaque morceau de coin est alors l'image entière, et les bords et le centre sont vides. Je l'ai vérifié : le rendu avec `100%` est identique, au pixel près.

`/64Q` fixe la largeur de la bordure d'image. L'élément n'a aucune bordure, mais la bordure d'image se dessine quand même sur cette largeur. 64 quarts de millimètre font 60,47px. Chaque coin de `html` reçoit une copie de l'équerre de 60,47px, avec des barres de 20 et de 10 pixels. Les deux du haut sont en x = 110 et x = 229,5, y = 105. Les deux du bas sont en y = 369,5, sous le canevas.

### 4. Le body : deux pieds

Le `*{…}` imbriqué vise le `body`. `margin:70 -60` enlève 70px en haut et en bas et ajoute 60px de chaque côté. Le `body` fait 180 + 2 × 60 = 300px de large, de x = 50 à 350. En mode quirks, il remplit `html` moins ses propres marges : 325 − 2 × 70 = 185px de haut, de y = 175 à 360.

Le `*` du dehors donne au `body` le même `border-image` : quatre équerres de plus, de 60,47px. Les deux du haut sont les pieds, en (50, 175) et (289,5, 175). Les deux du bas commencent en y = 299,5 : rien d'elles ne se voit sur le canevas.

### 5. Une ombre du body fait la bande

`box-shadow:0 -50px #f2f1e0` est une copie du `body`, remontée de 50px, sans flou. Une ombre externe ne se peint jamais sous sa propre boîte : seule la bande au-dessus de la boîte se voit, une bande crème de 300 × 50, de y = 125 à 175.

Le `body` se peint après `html`, et son ombre couvre les deux équerres du haut de `html` à partir de y = 125. De chaque équerre, il ne reste que le haut de la barre verticale : un carré noir de 20 × 20, en x = 110 et x = 230.

## Notes de golf

- Un seul `border-image` sur `*` dessine huit équerres : quatre par élément. Quatre se voient, deux en pieds et deux en carrés.
- `1e3` fait 3 caractères. Toute tranche au moins aussi grande que l'image donne le même résultat, et `100%` en fait 4.
- `64Q` vaut 60,47px en 3 caractères.
- L'ombre peut encore perdre un caractère : `0-53q` au lieu de `0-50px`. 53 quarts de millimètre font 50,08px : la bande commence 0,08px plus haut, et le site donne toujours 100 %. Cela fait 148 caractères.
- La largeur après `/` dessine la bordure d'image sans aucun `border`.
- `#0000` est transparent en 5 caractères. `#000 0` fait commencer le noir là où finit le transparent.
- L'ombre fait deux choses : elle dessine la bande, et elle réduit les équerres de `html` à des carrés.
- `110-130`, `70-60` et `0-50px#f2f1e0` se passent d'espaces : le signe moins et le `#` terminent le mot d'avant.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
