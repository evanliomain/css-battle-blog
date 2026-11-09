---
title: "Un dégradé, zoomé : une clé en 92 caractères"
lang: fr
ref: 2026-09-12
permalink: /fr/2026/09/12/un-degrade-zoome/
description: "Comment un seul dégradé radial, peint sur html et sur un body zoomé neuf fois, dessine la cible CSS Battle du 12 septembre 2026 : une clé crème."
target: /assets/targets/2026-09-12.png
target_url: https://cssbattle.dev/play/xINN7erbUm2K2I0zG5YF
colors: ["#1d025e", "#f5e3b5"]
player: eguiluz
chars: 92
score: 766.44
match: 100
code: |
  <style>*{background:radial-gradient(1Q,#f5e3b5 53q,#1d025e)0-58q;*{margin:-333%19.4 5;zoom:9
---

La cible du 12 septembre est une clé plate crème sur violet profond : une tête ronde avec une fente carrée en haut, et un long manche en dessous. La solution de David Eguiluz est un seul dégradé, écrit une fois pour tous les éléments. Sur `html`, c'est un disque : la tête. Le `body` est zoomé neuf fois : il devient une bande étroite qui commence très au-dessus du canevas, et le même disque devient neuf fois plus grand. Son bord traverse la bande presque à plat : crème en dessous pour le manche, violet au-dessus pour la fente.

{% include animations/2026-09-12.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                         /* html, puis le body */
  background:
    radial-gradient(1Q, #f5e3b5 53q, #1d025e)   /* un disque crème, r = 50,08 */
    0 -58q;                                 /* tuile remontée de 54,8px */
  * {                                       /* le body */
    margin: -333% 19.4 5;
    zoom: 9;                                /* tout neuf fois plus grand */
  }
}
```

## Comment ça marche

### 1. Un disque : la tête

`*` donne à tous les éléments le même fond, et le fond de `html` sert pour tout le canevas. Sans taille, la tuile du dégradé fait la taille du canevas, 400 × 300.

`radial-gradient(1Q,#f5e3b5 53q,#1d025e)` est un cercle de rayon `1Q` (0,94px), centré dans la tuile. Le crème va jusqu'à `53q` (50,08px). L'arrêt violet n'a pas de position : il serait au bout du cercle de 0,94px, mais un arrêt ne peut pas venir avant le précédent, il remonte donc à 50,08px. C'est un disque crème net de rayon 50,08.

`0-58q` est la position de la tuile : x = 0, et y = −58q, qui la remonte de 54,8px. Le disque est maintenant centré en (200 ; 95,2) : la tête de la clé.

### 2. Le body zoomé : une bande

`*` imbriqué vise le `body`. `zoom:9` le rend, lui et toutes ses longueurs, neuf fois plus grand.

`margin:-333%19.4 5` donne le haut, les côtés et le bas. Les côtés font 19,4 × 9 = 174,6 à l'écran : le `body` va de x = 174,6 à 225,4, sur 50,8 de large. Une marge en % se calcule sur la largeur du parent, 400 à l'écran : −333 % de 400 font −1332, le haut du `body` est donc très au-dessus du canevas. Sans doctype, la page est en mode quirks, et le `body` remplit la hauteur de la page moins ses marges : son bas s'arrête à 5 × 9 = 45 du bas du canevas, en y = 255. Il fait 1587 de haut.

### 3. Le même disque, neuf fois plus grand

Le `body` a le même fond, zoomé lui aussi : le rayon du disque fait 53q × 9 = 450,7, et la tuile, maintenant à la taille du `body`, 50,8 × 1587, remonte de 58q × 9 = 493,2.

La tuile se répète. La copie sous la première a son disque centré en y = 555,3, sous le canevas. Son bord haut passe en y = 555,3 − 450,7 = 104,6. Sur les 50,8px étroits du `body`, cette courbe est presque plate : elle descend de moins d'un pixel sur les côtés.

Sous ce bord, le `body` est crème : le manche, jusqu'en y = 255. Au-dessus, le `body` est violet, et il couvre le milieu de la tête : c'est la fente. Le `body` est peint après `html` : la fente entaille le disque.

## Notes de golf

- Un seul dégradé, écrit une fois dans `*`, dessine la tête sur `html` et le manche avec sa fente sur le `body`.
- `zoom:9` rend le disque du `body` neuf fois plus grand : son bord est presque droit sur une bande de 50px.
- `-333%` met le haut du `body` très au-dessus du canevas : la répétition de la tuile amène un disque juste là où commence le manche.
- `1Q … 53q` avec un arrêt sans seconde longueur donne un disque net.
- `19.4 5` en pixels zoomés donne 174,6 et 45 à l'écran en 6 caractères.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
