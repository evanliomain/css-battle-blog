---
title: "Un border-image, deux hauteurs de ligne : un bouton en 92 caractères"
ref: 2026-08-24
permalink: /fr/2026/08/24/un-border-image-deux-hauteurs-de-ligne/
description: "Comment une seule déclaration border-image, lue avec deux hauteurs de ligne différentes, dessine à la fois le disque blanc et les quatre trous rouges de la cible CSS Battle du 24 août 2026."
target: /assets/targets/2026-08-24.png
target_url: https://cssbattle.dev/play/CBG1TILZdQr1NiLspgv1
colors: ["#fff", "#bb4e60"]
player: selenit
chars: 92
score: 766.44
match: 100
code: |
  <style>*{border-image:radial-gradient(#fff 5lh,#BB4E60 0)50%/97lh/53q 0;*{scale:.21;font:1q'
---

La cible du 24 août ressemble à un bouton : un grand disque blanc sur fond rouge, avec quatre petits carrés rouges au milieu. Ilya Streltsyn la dessine avec une seule déclaration `border-image`, utilisée par deux éléments. Dans `html`, 1lh vaut 18px : le dégradé donne le grand disque. Dans le `body`, une police minuscule ramène 1lh à 1px : la même déclaration donne quatre petits carrés rouges.

Cochez **Couleurs pédagogiques** pour distinguer les deux images de bordure (en vraies couleurs, les carrés du body sont rouges sur rouge), et passez en **Vue large** pour voir le débord au-dessus et au-dessous du canevas.

{% include animations/2026-08-24.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                             /* html, puis head, style, body */
  border-image:
    radial-gradient(#fff 5lh, #BB4E60 0)  /* disque blanc de rayon 5lh, puis rouge */
    50%                         /* découpe : quatre quarts, rien entre eux */
    / 97lh                      /* largeur des bords */
    / 53q 0;                    /* débord : 50,08px en haut et en bas */
  * {                           /* head, style, body */
    scale: .21;
    font: 1q '';                /* police de 0,945px, famille vide */
  }
}
```

## Comment ça marche

### 1. html : une zone presque carrée

`*` vise `html` et tous les éléments qu'il contient. `html` remplit le canevas, 400 × 300. Il n'a ni fond, ni bordure, ni contenu : tout vient de son `border-image`.

Aucun des deux éléments n'a de style de bordure, et l'image de bordure s'affiche quand même : sa taille vient de `border-image-width`, pas de la bordure.

La dernière valeur, `53q 0`, est le débord : l'image de bordure est peinte hors de la boîte, de 53q en haut et en bas, et de 0 sur les côtés. 1q, c'est un quart de millimètre, 0,945px : 53q = 50,08px. La zone de l'image de bordure fait 400 × 400,16, de y = −50,08 à 350,08 : presque un carré, centré sur le canevas.

### 2. Le dégradé, en quatre coins

L'image, c'est `radial-gradient(#fff 5lh,#BB4E60 0)` : du blanc jusqu'à 5lh du centre, puis du rouge. Le `0` donne un bord net. Le dégradé a la taille de la zone de l'image de bordure : il est donc centré en (200 ; 150).

`50%` est la découpe. Elle coupe l'image à 50 % de chaque bord : quatre quarts, et il ne reste rien pour les côtés ni pour le milieu. Sans le mot-clé `fill`, le milieu n'est de toute façon pas peint.

`97lh` est la largeur de chaque bord. Dans `html`, la police est du Times de 16px, et sa hauteur de ligne normale vaut 18px dans mon Chrome. 97lh = 1746px. Deux bords de 1746px n'entrent pas dans 400px. Dans ce cas, le navigateur réduit toutes les largeurs du même facteur, jusqu'à ce qu'elles entrent : 400 / 3492, soit 200px par bord. Les quatre coins se touchent au milieu et recomposent l'image. 5lh = 90px : un disque blanc de 90px de rayon, centré en (200 ; 150). C'est exactement le disque de la cible.

Le débord compte ici. J'ai vérifié sans lui : la zone fait 400 × 300, les largeurs tombent à 150px, une bande blanche apparaît de x = 150 à 250, de haut en bas, et les deux moitiés du disque s'écartent.

### 3. body : le même border-image

Le `*` extérieur vise aussi le `body`, qui reçoit donc le même `border-image`. En mode quirks, le `body` remplit le cadre moins sa marge de 8px : 384 × 284, à partir de (8 ; 8). Avec le débord, sa zone fait 384 × 384,16, centrée elle aussi en (200 ; 150).

Sans la règle imbriquée, le `body` aurait la même hauteur de ligne de 18px que `html`. Ses bords seraient ramenés à 192px, et ses coins dessineraient un disque blanc de 90px de rayon, au même endroit. En vraies couleurs, ça ne change rien.

### 4. font:1q'' : 1lh = 1px

Le `*` imbriqué vise `head`, `style` et `body`. Seul le `body` est affiché.

`font:1q''` pose une taille de police de 1q = 0,945px. La famille est `''`, une chaîne vide : le raccourci `font` exige une famille, et c'est la plus courte. Le guillemet n'est jamais fermé, c'est la fin du code qui le ferme. Dans mon Chrome, la hauteur de ligne normale de cette police vaut 1px : 1lh = 1px dans le `body`.

97lh = 97px, maintenant. Deux bords de 97px entrent dans 384px : rien n'est réduit. Les quatre coins sont des carrés de 97 × 97 aux coins de la zone, avec 190px entre eux. Rien n'est peint entre eux : on y voit le dessin de `html`.

Chaque coin montre un quart du dégradé du `body`. Là, 5lh = 5px : le blanc n'est qu'un petit disque au milieu de l'image. Un quart de ce disque tombe à la pointe intérieure de chaque coin, avec un rayon d'environ 2,5px. Le reste du coin est rouge.

Le même `97lh` fait deux travaux. Dans `html`, il est bien trop grand, et le navigateur le ramène à 200px, exactement ce qu'il faut. Dans le `body`, il vaut 97px.

### 5. scale:.21

`scale:.21` réduit le `body` autour de son centre, (200 ; 150). Sa zone passe à 80,64 × 80,67, de x = 159,68 à 240,32 et de y = 109,66 à 190,34. Chaque coin fait 97 × 0,21 = 20,37px, avec 190 × 0,21 = 39,9px entre deux coins.

Le `body` est peint au-dessus de `html`. Ses quatre coins rouges tombent dans le disque blanc : les quatre trous du bouton. Les quarts de point blancs n'ont plus que 0,53px de rayon. J'ai vérifié avec une version où le dégradé du `body` est vert au lieu de blanc : pas un pixel ne devient vert.

## Notes de golf

- Un seul `border-image` pour deux éléments. Seule la hauteur de ligne change : 18px dans `html`, 1px dans le `body`. `5lh` donne un disque de 90px dans l'un et un point de 5px dans l'autre.
- `97lh` vaut 1746px dans `html`. Les largeurs de bord qui n'entrent pas sont réduites ensemble : elles tombent sur 200px, juste ce qui remplit la zone.
- `53q 0` rend les deux zones d'image de bordure presque carrées : le disque est rond et les quatre carrés forment un carré. 53q = 50,08px.
- Pas de `background` : les quatre coins de l'image de bordure de `html` couvrent tout le canevas.
- `font:1q''` est un raccourci `font` complet : une taille et une famille vide, avec le guillemet laissé ouvert.
- Pas d'espace dans `0)50%` : la parenthèse termine le dégradé.
- `scale:.21` sans le zéro devant, et `<style>` et les deux accolades ne sont jamais fermés.

## Si vous l'essayez chez vous

Dans mon Chrome (la version 157 au moment où ces lignes sont écrites), les quatre carrés font 20,37px de large et leurs bords ne tombent pas sur des pixels entiers : x = 159,68, 180,05, 219,95 et 240,32, y = 109,66, 130,03, 169,97 et 190,34. Dans la cible, les carrés font 20px de large, de x = 160 à 180 et de 220 à 240, et de y = 110 à 130 et de 170 à 190. Par rapport à la cible, 192 pixels diffèrent le long de huit bords droits, plus 328 que mon script de comparaison compte comme de l'anticrénelage. Sur le juge de CSS Battle, le code d'origine est identique à 100 %.
