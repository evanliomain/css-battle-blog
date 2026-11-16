---
title: "Des points et des points médians : un zigzag en 161 caractères"
lang: fr
ref: 2026-08-28
permalink: /fr/2026/08/28/des-points-et-des-points-medians/
description: "Comment deux box-shadow sur html dessinent la barre en zigzag de la cible CSS Battle du 28 août 2026, et six signes de ponctuation en police de 423px ses six disques."
target: /assets/targets/2026-08-28.png
target_url: https://cssbattle.dev/play/qNQBUEefiqFutUSGMOzp
colors: ["#2d3464", "#f7ec7d"]
player: gabriele19
chars: 161
score: 686.23
match: 100
code: |
  ... ¸¸···<style>&{background:#2D3464;color:F7EC7D;margin:165 130-80 30;box-shadow:25vw -259q#2D3464,53q -90pt;*{margin:-409-38;letter-spacing:-46;font:448q/.782'
---

La cible du 28 août, c'est un zigzag jaune pâle sur fond bleu nuit : une barre épaisse qui descend depuis le haut à gauche, part à droite, puis descend encore. Chaque bout de la barre est arrondi, avec un disque de chaque côté. Gabriele dessine la barre avec deux ombres de `html`, une jaune et une bleue qui la recoupe. Les six disques sont du texte : trois points sur une première ligne, trois points médians sur une seconde, dans une police de 423px.

Passez en **Vue large** pour voir la boîte de texte géante du `body`, et cochez **Couleurs pédagogiques** pour distinguer les deux ombres et les trois sortes de caractères.

{% include animations/2026-08-28.html lang=page.lang %}

## Le code, aéré

```css
... ¸¸···                          /* le texte du body */
<style>
& {                                /* html */
  background: #2D3464;             /* tout le canevas */
  color: F7EC7D;                   /* sans # en mode quirks */
  margin: 165 130 -80 30;          /* une boîte de 240 × 215 en (30 ; 165) */
  box-shadow:
    25vw -259q #2D3464,            /* +100, −244,72 : bleue, au-dessus */
    53q -90pt;                     /* +50,08, −120 : jaune */
  * {                              /* head, style, body */
    margin: -409 -38;              /* body : 316 × 1033 depuis (−8 ; −244) */
    letter-spacing: -46;
    font: 448q / .782 '';          /* 423,31px, lignes de 331,03px */
  }
}
```

## Comment ça marche

### 1. html : une boîte, et un canevas bleu

Au premier niveau, `&` est `html`. Le fond de `html` est peint sur tout le canevas : `#2D3464` le couvre en entier.

`margin:165 130-80 30` laisse 400 − 30 − 130 = 240px de large. En mode quirks, `html` remplit la hauteur du cadre moins ses marges : 300 − 165 + 80 = 215px. C'est donc une boîte de 240 × 215 en (30 ; 165). Elle descend jusqu'à y = 380, 80px sous le canevas. Rien n'y est dessiné : elle n'est là que pour ses ombres.

### 2. Une ombre jaune

Une ombre a la forme de sa boîte. `53q -90pt` la décale de 53 quarts de millimètre vers la droite, soit 50,08px, et de 90pt vers le haut, soit 120px. L'ombre couvre x = 80,08 à 320,08, y = 45 à 260.

Elle n'a pas de couleur : elle prend `color`, `F7EC7D`, le jaune. En mode quirks, une couleur peut se passer de son `#`.

Une ombre externe n'est jamais peinte sous sa propre boîte. Le bas gauche du rectangle jaune est sous la boîte de `html` (x = 30 à 270, à partir de y = 165) : il reste bleu. Il reste une large bande en haut, de y = 45 à 165, et une jambe de 50px à droite, x = 270 à 320, jusqu'à y = 260.

### 3. Une ombre bleue la recoupe

`25vw -259q#2D3464` décale la boîte de 100px vers la droite et de 244,72px vers le haut : x = 130 à 370, y = −79,72 à 135,28. Sa couleur est celle du fond.

La première ombre de la liste est peinte au-dessus. Le rectangle bleu recouvre donc la bande du haut de la jaune, sauf ses 50px de gauche, x = 80 à 130. Le zigzag est là : une barre qui descend depuis y = 45 à gauche, une bande de y = 135,28 à 165, et la jambe de droite jusqu'à y = 260.

### 4. body : une ligne de texte géante

Le `*` imbriqué vise tous les éléments dans `html` : `head`, `style` et le `body`. Seul le `body` s'affiche. `margin:-409-38` lui donne −409px en haut et en bas, −38px sur les côtés. Je l'ai mesuré : 316 × 1033, depuis (−8 ; −244).

`font:448q/.782'` règle la taille et la hauteur de ligne. 448q font 423,31px, et 0,782 fois cela, 331,03px. La ligne 1 va donc de y = −244 à 87,03, et la ligne 2 de 87,03 à 418,05. La famille est `'` : une chaîne que la fin du code ferme. C'est un nom de police vide. Aucune police ne le porte : le navigateur prend sa police par défaut.

### 5. Ligne 1 : trois points

Le texte du `body` est `... ¸¸···`, écrit avant `<style>`. La première ligne porte les trois points.

Dans mon Chrome, un point fait un quart de la taille de la police : 105,83px. `letter-spacing:-46` retire 46px à chaque caractère : chaque point avance de 59,83px. Les trois points sont à environ 60px l'un de l'autre. Un point est posé sur la ligne de base, près du haut du canevas. Dans la cible, ce sont des disques de 50px centrés en x = 45, 105 et 165, y = 45.

### 6. Ligne 2 : deux cédilles et trois points médians

La ligne se coupe à l'espace. `¸¸···` fait 369,4px de large, plus que les 316px du `body`, et n'a aucun endroit où couper. Tout passe donc en ligne 2, et déborde du bord droit du `body`.

Une cédille pend sous la ligne de base. Sur la ligne 2, son dessin tombe sous le canevas : dans mon Chrome, de y = 389 à 480. On ne la voit jamais. Seule sa largeur compte : environ 95px chacune après le letter-spacing, 189,92px pour les deux. Elles poussent les trois points médians vers la droite. Dans la cible, ce sont des disques de 50px en x = 235, 295 et 355.

La ligne 2 est 331,03px plus bas que la ligne 1. Mais un point médian est environ 121px plus haut au-dessus de la ligne de base qu'un point. La seconde rangée de disques n'est donc que 210px sous la première : y = 255 dans la cible.

### 7. Les disques du milieu arrondissent la barre

Le disque du milieu de chaque rangée tombe sur un bout de la barre. En haut, le disque centré en (105 ; 45) couvre x = 80 à 130, la largeur de la barre, et arrondit son bout. En bas, le disque en (295 ; 255) fait de même pour la jambe, x = 270 à 320. Le texte est peint après les ombres de `html`, par-dessus.

## Notes de golf

- Une ombre dessine toute la barre, et une seconde, couleur du fond, la recoupe. La boîte de `html` cache le bas gauche gratuitement.
- Les six disques sont six caractères. Les deux cédilles sont des cales invisibles : leur dessin est sous le canevas, et leur largeur pousse la rangée du bas de 189,92px vers la droite.
- La famille de police est un simple `'`, fermé par la fin du code. `.782a` ne marcherait pas : c'est lu comme une seule dimension, et j'ai vérifié que toute la déclaration `font` saute alors (le texte revient à 16px). `.782 a` donne le même rendu, avec un caractère de plus.
- `color:F7EC7D` se passe de `#` en mode quirks. `background` le garde : sans lui, j'ai vérifié que le canevas reste blanc.
- `53q` fait 50,08px, `-90pt` −120px, `25vw` 100px, `-259q` −244,72px, `448q` 423,31px.
- Aucune espace n'est nécessaire dans `130-80`, `-409-38` ou `-259q#2D3464`.
- `<style>` n'est jamais fermé, et les deux dernières accolades sont omises.

## Si vous l'essayez chez vous

Les six disques sont des glyphes de la police par défaut. Dans mon Chrome local sur Mac (version 157 au moment d'écrire), `Times` ou `serif` à la place de `'` donnent exactement la même image. Les points y font 46 à 49px de large au lieu de 50. La rangée du haut est centrée en y = 39 au lieu de 45, et environ 15px trop à droite. La rangée du bas est centrée en y = 248,5 au lieu de 255, et environ 7px trop à gauche. Trois bords de la barre sont aussi flous sur une ligne ou une colonne de pixels : y = 135, où l'ombre bleue s'arrête à 135,28, et x = 80 et 320, car 53q fait 50,08px. En tout, 7 441 pixels diffèrent de la cible, 6 807 nettement. Sur le juge de CSS Battle, la solution est identique à 100 %. L'animation ci-dessus place les disques là où la cible les a.
