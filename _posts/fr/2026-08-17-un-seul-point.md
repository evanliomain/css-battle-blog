---
title: "Un seul point : un disque et deux carrés en 124 caractères"
ref: 2026-08-17
permalink: /fr/2026/08/17/un-seul-point/
description: "Comment une bordure gauche pointillée qui n'a la place que pour un point dessine le disque de la cible CSS Battle du 17 août 2026, et comment le body et ses deux ombres y découpent un quart et ajoutent deux carrés gris."
target: /assets/targets/2026-08-17.png
target_url: https://cssbattle.dev/play/H7DBc8YLyOFJFNJ78t9U
colors: ["#f1e1be", "#7c7565"]
player: h_blierzt
chars: 124
score: 722.68
match: 100
code: |
  <style>&{border-left:dotted 50vh;color:7C7565;margin:75 175}*{background:#F1E1BE;*{margin:0-0 75-75;box-shadow:75px 0,0-75px
---

La cible du 17 août est un disque gris sur fond crème. Il lui manque le quart en haut à droite, et deux carrés gris s'ajoutent au-dessus et à droite, en escalier. H_Bliertz dessine le disque avec une bordure pointillée sur `html` : la bordure est aussi épaisse que le côté est long, elle n'a donc la place que pour un seul point rond. Le body est un carré crème qui cache un quart du disque, et ses deux ombres box-shadow sont les carrés gris.

Cochez **Couleurs pédagogiques** pour voir le carré du body, qui a la couleur du fond.

{% include animations/2026-08-17.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                            /* html */
  border-left: dotted 50vh;    /* 150px d'épaisseur : un point, un disque de 150px */
  color: 7C7565;               /* sans # : le mode quirks l'accepte */
  margin: 75 175;              /* 75px en haut et en bas, 175px à gauche et à droite */
}
* {
  background: #F1E1BE;         /* html : tout le canevas · body : le carré sur le disque */
  * {                          /* body (head et style ne s'affichent pas) */
    margin: 0 -0 75 -75;       /* haut, droite, bas, gauche */
    box-shadow:
      75px 0,                  /* le carré de droite */
      0 -75px                  /* le carré du haut */
```

## Comment ça marche

### 1. `&`, c'est html

`&` est le sélecteur d'imbrication. Hors de toute règle, il désigne la racine du document : `html`. J'ai vérifié : avec `html` à la place de `&`, le rendu est le même.

Il n'y a pas de doctype : la page est en mode quirks. Le code en a besoin deux fois. Les nombres sans unité, comme `75 175`, sont lus en px. Et `color:7C7565` est une couleur hexadécimale sans `#`, que le mode quirks accepte pour `color`. J'ai vérifié avec `<!doctype html>` devant : toutes les marges sont ignorées, la couleur aussi. html est en (0 ; 0), et j'obtiens un disque noir dans le coin en haut à gauche.

### 2. Une boîte de 50 × 150

`margin:75 175` donne 75px en haut et en bas, 175px à gauche et à droite. Sans sa bordure, html fait 400 − 2 × 175 = 50px de large. En mode quirks, html est étiré sur la hauteur de la fenêtre, moins ses marges : 300 − 2 × 75 = 150px. html commence donc comme une boîte de 50 × 150 en (175 ; 75).

Le `*` extérieur donne à html le fond #F1E1BE. Le fond de l'élément racine peint tout le canevas.

### 3. Une bordure pointillée avec la place pour un point

`50vh`, c'est la moitié de la hauteur du canevas de 300px : 150px. La bordure gauche fait 150px d'épaisseur et 150px de haut.

Une bordure pointillée est une file de points ronds, chacun aussi large que la bordure. J'ai rendu la même bordure, sur le même côté de 150px, avec d'autres épaisseurs. À 10px, j'obtiens 8 points, à 20px 4, à 30px 3, à 50px 2. À 150px, un seul point remplit tout le côté : un disque de 150px, de (175 ; 75) à (325 ; 225). Seul, il donne 17 646 pixels plus gris que crème. π × 75² vaut 17 671.

La bordure prend 150px de largeur. Il n'y en avait que 50 : la largeur du contenu tombe à 0. html fait maintenant 150 × 150, et sa boîte de contenu est une bande de 0px de large en x = 325.

La bordure n'a pas de couleur à elle : elle prend `currentColor`, #7C7565.

### 4. Le body : 75 × 75 en (250 ; 75)

Le `*` imbriqué vise tout élément placé dans un autre : head, style et body. head et style ne s'affichent pas : seul body compte.

Sans marges, le body remplirait la boîte de contenu de html : en x = 325, 0px de large et 150px de haut. Je l'ai vérifié avec `margin:0`. `margin:0-0 75-75` se lit 0, −0, 75 et −75 : haut, droite, bas et gauche.

- La marge gauche de −75px fait commencer le body 75px plus à gauche, en x = 250. Une marge négative s'ajoute aussi à la largeur : 0 + 75 = 75px.
- La marge du bas de 75px se retire de la hauteur, étirée en mode quirks : 150 − 75 = 75px.

Le body est un carré de 75 × 75, de (250 ; 75) à (325 ; 150). Son coin en bas à gauche est le centre du disque.

### 5. Le quart caché

Le `*` extérieur donne aussi au body le fond #F1E1BE. Quand html a son propre fond, celui du body n'est peint que dans la boîte du body, et par-dessus la bordure de html. Ce carré crème cache donc le quart en haut à droite du disque.

J'ai vérifié : avec le fond sur html seulement, le disque reste entier.

### 6. Deux ombres

Une ombre box-shadow est une copie de la boîte, déplacée de ses décalages. Le body hérite `color` de html, et les ombres sans couleur prennent `currentColor` : les deux sont #7C7565.

- `75px 0` : 75px vers la droite, de (325 ; 75) à (400 ; 150).
- `0-75px` se lit `0` et `-75px` : 75px vers le haut, de (250 ; 0) à (325 ; 75).

J'ai rendu chaque ombre seule en rouge : chacune couvre exactement 75 × 75 = 5 625 pixels, à ces positions.

## Notes de golf

- `&` désigne html en 1 caractère. Avec `html`, le code fait 127 caractères, avec `:root` 128.
- `50vh` vaut 150px en 4 caractères. Avec `150px`, le code fait 125 caractères.
- `color:7C7565` colore d'un coup le disque et les deux ombres. Sans lui, `#7C7565` dans la bordure et dans chaque ombre donne 132 caractères.
- La couleur n'a pas besoin de `#` en mode quirks, mais `background` si. `background:F1E1BE` est ignoré : le canevas devient blanc, et le disque reste entier.
- Un seul `*{background:#F1E1BE}` colore le canevas par html et le carré sur le disque par body.
- Les signes moins séparent les valeurs : `0-0 75-75` et `0-75px`. Avec des espaces, le code fait 127 caractères.
- `0-0` a la même longueur que `0 0`, et donne le même rendu.
- Le `</style>` et les deux accolades fermantes des règles `*` sont omis. Avec eux, le code fait 134 caractères et donne le même rendu.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les bords droits tombent sur les mêmes pixels que dans la cible. Mais 99 009 pixels diffèrent de mon rendu. 91 876 d'entre eux sont des pixels crème à un niveau près : (241, 225, 190) dans mon rendu, c'est-à-dire `#f1e1be`, et (241, 225, 191) dans la cible. Le fichier de la cible que j'ai est un JPEG. 1 372 pixels diffèrent de plus de 8 niveaux, et tous sont à moins de 10px d'un bord. Le plus grand écart est de 88 niveaux, en (200 ; 93), sur le bord du disque : mon rendu y est presque crème, la cible presque grise. Dans la cible, le disque va un peu plus loin en haut à gauche et un peu moins loin en bas à droite. Sur le juge de CSS Battle, le code est identique à 100 %.
