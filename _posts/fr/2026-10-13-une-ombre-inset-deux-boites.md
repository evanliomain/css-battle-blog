---
title: "Une ombre inset, deux boîtes : une enseigne suspendue en 129 caractères"
lang: fr
ref: 2026-10-13
permalink: /fr/2026/10/13/une-ombre-inset-deux-boites/
description: "Comment une seule ombre inset, partagée par html et body, et un dégradé centré par la boîte de html dessinent la cible CSS Battle du 13 octobre 2026."
target: /assets/targets/2026-10-13.png
target_url: https://cssbattle.dev/play/Hj6qgfMNxubgoTcYhOLe
colors: ["#a27848", "#173c46"]
player: evanliomain
chars: 129
score: 716.98
match: 100
code: |
  <style>*{margin:40 20-40;box-shadow:inset 0 0 0 32Q#a27848;*{margin:0 165 230}background:radial-gradient(7Q 4Q,#bc37 35vw,#173c46
---

La cible du 13 octobre ressemble à une enseigne pendue à une potence : un cadre brun ouvert en bas, une courte tige qui descend du milieu de la barre du haut, et une grande ellipse jaune pâle sous la tige, sur un fond bleu pétrole. Je la dessine avec `html` et `body`, rien d'autre. Une seule ombre inset, donnée aux deux, fait le cadre sur l'un et la tige sur l'autre, et un seul dégradé sur le canevas fait l'ellipse.

{% include animations/2026-10-13.html lang=page.lang %}

## Le code, aéré

```css
* {                                   /* html et body */
  margin: 40 20 -40;
  box-shadow: inset 0 0 0 32Q #a27848;
  * {                                 /* enfants : head (caché) et body */
    margin: 0 165 230;
  }
  background:                         /* fait encore partie de la règle * */
    radial-gradient(7Q 4Q, #bc37 35vw, #173c46);
}
```

## Comment ça marche

### 1. La boîte de html pend sous le canevas

`margin:40 20-40` pose `html` en (20, 40), sur 400 − 2 × 20 = 360px de large. CSS Battle affiche la page en mode quirks, où `html` fait la hauteur de la page moins ses marges : 300 − 40 + 40 = 300px. La boîte va donc de y = 40 à y = 340, et ses 40 derniers pixels sont sous le canevas.

La marge basse négative fait deux choses à la fois : elle cache le bas de la boîte, et elle lui garde 300px de haut, ce qui met son centre en (200, 190). Ce centre sert au dégradé.

### 2. Le dégradé part sur le canevas, mais garde la tuile de html

Le `background` vient après la règle imbriquée `*{…}`, mais il appartient toujours au `*` extérieur : une déclaration placée après une règle imbriquée s'applique au sélecteur parent. `html` la reçoit donc.

Le fond de `html` est peint sur tout le canevas, pas seulement sur sa boîte. Mais la tuile dans laquelle il est dessiné reste la boîte de `html`, 360 × 300 en (20, 40). Le dégradé est centré dans cette tuile, en (200, 190).

`radial-gradient(7Q 4Q, …)` est une ellipse de rayons 7Q et 4Q (6,6 et 3,8px). Ces rayons minuscules ne fixent que la forme : 7 de large pour 4 de haut. L'arrêt à `35vw` (140px) se mesure sur le rayon horizontal, donc le bord de l'ellipse est à 140px sur les côtés et à 140 × 4/7 = 80px en haut et en bas : une ellipse de 280 × 160, de x 60 à 340 et de y 110 à 270. `#173c46` n'a pas de position, il se colle donc à 140px et le bord reste net.

### 3. #bc37 sur du blanc

`#bc37`, c'est `#bbcc33` à 47 % d'opacité. Sous le fond du canevas, il n'y a que la page blanche : l'ellipse est donc cet olive mélangé au blanc, à peu près `#dfe7a0`, le jaune pâle de la cible. Autour de l'ellipse, `#173c46` est opaque.

### 4. L'ombre inset dessine le cadre

`box-shadow:inset 0 0 0 32Q` peint une bande de 32Q (30,24px) à l'intérieur des bords de la boîte de `html` : un cadre. La barre du haut va de y 40 à 70, les côtés de x 20 à 50 et de 350 à 380. La barre du bas est de y 310 à 340, hors du canevas : on voit un Π.

### 5. body reçoit la même ombre : la tige

Le `*` imbriqué touche les enfants de `html` : `head` (caché) et `body`. Il vient après la règle extérieure, avec le même poids, donc `body` prend `margin:0 165 230` :

- 360 − 2 × 165 = 30px de large, de x 185 à 215 ;
- en mode quirks, `body` est étiré à la hauteur de `html` moins ses marges : 300 − 230 = 70px, de y 40 à 110.

`body` est aussi touché par le `*` extérieur, il reçoit donc la même ombre inset. Sur une boîte de 30px de large, une bande de 30,24px de chaque côté ne laisse aucun trou : la boîte est remplie de brun. C'est la tige, et elle s'arrête à y = 110, pile sur l'ellipse.

`body` reçoit aussi le dégradé, dessiné cette fois dans sa propre boîte. Toute sa boîte de 30 × 70 est dans l'ellipse de 140px : c'est un `#bc37` uni, et l'ombre le couvre en entier.

## Notes de golf

- Une ombre, deux formes : un cadre sur une boîte large, une barre pleine sur une boîte plus étroite que deux fois l'ombre.
- `7Q 4Q` fixe le rapport de l'ellipse en 5 caractères, et l'arrêt en `35vw` fixe sa taille.
- `#bc37` (5 caractères) laisse la page blanche éclaircir l'olive, au lieu de `#e0e7a2` (7).
- `32Q` fait 30,24px, un caractère de moins que `30px`. Dans mon rendu local, les bords intérieurs du cadre sortent légèrement teintés (706 pixels), mais CSS Battle compte la solution comme identique à 100 %.
- `margin:40 20-40` n'a besoin ni d'unités (mode quirks) ni d'espace avant le signe moins. `32Q#a27848` non plus.
- Pas de `;` après `}`, et ni `<style>` ni le dégradé ne sont fermés.
