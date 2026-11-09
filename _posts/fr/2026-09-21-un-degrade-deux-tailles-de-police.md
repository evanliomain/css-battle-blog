---
title: "Un dégradé, deux tailles de police : un euro en 131 caractères"
lang: fr
ref: 2026-09-21
permalink: /fr/2026/09/21/un-degrade-deux-tailles-de-police/
description: "Comment un seul dégradé radial mesuré en em dessine à la fois le C et les barres de la cible CSS Battle du 21 septembre 2026 : un symbole euro bleu-vert."
target: /assets/targets/2026-09-21.png
target_url: https://cssbattle.dev/play/tcjIrX3hxT2bt6WNY8xB
colors: ["#1d025e", "#469dba"]
player: emohdaziz
chars: 131
score: 714.77
match: 100
code: |
  <p> <p> <style>* *{background:radial-gradient(1Q at right,#1d025e,5pc,#469dba 0 6.25em,#1d025e)291Q;margin:30%25-85;*{font:8vw/5vw"
---

La cible du 21 septembre est un symbole euro bleu-vert sur un violet profond : un C épais, ouvert à droite, barré de deux traits. La solution de Mohamed Ali écrit un seul dégradé radial pour tous les éléments sauf `html`. Sur le canevas, avec la police par défaut de 16px, c'est un anneau : le C. Dans deux paragraphes en police de 32px, le même dégradé est deux fois plus large, et dans ces fines bandes il ne montre que deux barres.

{% include animations/2026-09-21.html lang=page.lang %}

## Le code, aéré

```css
<p>&nbsp;<p>&nbsp;                 /* chacun contient une vraie espace insécable */
<style>
* * {                              /* tout sauf html */
  background:
    radial-gradient(1Q at right,   /* centré sur le bord droit de la tuile */
      #1d025e, 5pc,                /* foncé, repère de transition à 80px */
      #469dba 0 6.25em,            /* clair de 80px à 6.25em */
      #1d025e)
    291Q;                          /* tuile décalée de 274,96px */
  margin: 30% 25 -85;
  * {                              /* les deux p */
    font: 8vw / 5vw "";            /* police de 32px, ligne de 20px */
  }
}
```

## Comment ça marche

### 1. Un anneau, centré à droite

`* *` vise tous les éléments placés dans un autre : tout sauf `html`. `html` n'a donc pas de fond, et dans ce cas c'est le fond du `body` qui sert pour tout le canevas. C'est un dégradé sans taille : il remplit une tuile de 400 × 300, et se répète.

`radial-gradient(1Q at right,…)` est un cercle de rayon `1Q` (0,94px), centré `at right` : sur le bord droit de la tuile, à mi-hauteur. Les arrêts vont bien au-delà de ce rayon. D'abord foncé ; `5pc` seul est un repère de transition, à 80px. La couleur claire a la position `0`, qui remonte à 80px : la couleur change donc net à 80px. Le clair dure jusqu'à `6.25em`, soit 100px en police de 16px, puis c'est de nouveau foncé. C'est un anneau clair de 20px, et seule sa moitié gauche tombe dans la tuile.

### 2. 291Q : le C de l'euro

`291Q` est la position x de la tuile : 274,96px. La tuile répétée à sa gauche finit maintenant en x = 274,96, et son demi-anneau y est centré, en (274,96 ; 150). Il va de x = 174,96 à 274,96 et de y = 50 à 250 : le C.

### 3. Deux p d'une espace insécable

Dans chaque `<p>`, il y a une espace insécable, pas une espace normale. Une espace normale seule disparaîtrait, et le `<p>` ferait 0px de haut. Une espace insécable reste : chaque `<p>` a une ligne. `*` imbriqué donne aux deux `<p>` `font:8vw/5vw"` : une police de 32px et une ligne de 20px. La famille est la chaîne `"`, fermée par la fin de la feuille de style.

`margin:30%25-85` place tout. Une marge en % se calcule sur la largeur du parent. Le `body` commence à 30 % de 400 = 120 du haut, à 25 de chaque bord. Le premier `<p>` demande 30 % de 350 = 105, qui fusionne avec les 120 du `body` : il commence en y = 120, de x = 50 à 350, sur 20px de haut. Entre les deux `<p>`, la marge basse de −85 et la marge haute de 105 font 20 : le second commence en y = 160.

### 4. Le même dégradé, en 32px

Les `<p>` reçoivent le même fond de `* *`. Mais `em` suit la police : en 32px, `6.25em` font 200px. Le clair va maintenant de 80 à 200px du centre. Tout le reste des `<p>` est foncé, de la couleur du fond : les `<p>` ne cachent rien.

### 5. Deux barres

Dans un `<p>`, la tuile du dégradé est le `<p>` lui-même, 300 × 20, décalé des mêmes 274,96px. La tuile à sa gauche finit en x = 50 + 274,96 = 324,96 : le cercle y est centré, à la hauteur du `<p>`. Le clair, de 80 à 200px à gauche de ce centre, va de x = 124,96 à 244,96. Dans chaque bande de 20px, c'est une barre : les deux barres de l'euro.

## Notes de golf

- Un seul dégradé, écrit une fois, dessine le C et les barres : `6.25em` font 100px sur le canevas et 200px dans les `<p>`.
- `* *` laisse `html` sans fond : celui du `body` remplit le canevas, et les `<p>` gardent le leur.
- `5pc` en repère de transition, puis `#469dba 0` : un bord net à 80px avec une seule longueur.
- `at right` place le centre sur le bord de la tuile : la tuile coupe l'anneau en deux gratuitement.
- Une espace insécable donne une ligne à chaque `<p>`, et `5vw` fixe sa hauteur : pas besoin de `height`.
- `margin:30%25-85` sert au `body` et aux deux `<p>` : 30 % d'une autre largeur donne une autre marge.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
