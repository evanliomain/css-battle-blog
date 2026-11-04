---
title: "Un outline rond comme masque : un visage en 166 caractères"
lang: fr
ref: 2026-10-03
permalink: /fr/2026/10/03/un-outline-rond-comme-masque/
description: "Comment un immense outline sur un html rond cache tout ce qui en sort, pour que quatre ombres partagées dessinent la cible CSS Battle du 3 octobre 2026 : un visage coupé au bol."
target: /assets/targets/2026-10-03.png
target_url: https://cssbattle.dev/play/jIyS5tiYDKOTes7oiBMb
colors: ["#441212", "#b08743"]
player: markboots
chars: 166
score: 682.21
match: 100
code: |
  .<style>*{color:441212;border-radius:9in;margin:55%65%35%50;box-shadow:-5vw -30vw 0 5lh,45vw -5em 0 5lh,5em 0,inset 0 0 0 5vw}&{margin:50 100;outline:9in solid#b08743
---

La cible du 3 octobre est un visage rond sur fond ocre : un contour brun foncé, un visage blanc avec deux petits yeux, et une coupe au bol qui descend du haut. Mark Boots le dessine avec deux éléments et une seule liste de quatre ombres. L'astuce, c'est un outline géant sur le `html` rond : il peint l'ocre tout autour du cercle et, comme un outline est peint en dernier, il cache aussi toutes les ombres qui débordent du visage.

{% include animations/2026-10-03.html lang=page.lang %}

## Le code, aéré

```css
/* "." : un peu de texte dans body */
* {                            /* html et body (head et style restent cachés) */
  color: 441212;               /* les ombres prennent cette couleur */
  border-radius: 9in;
  margin: 55% 65% 35% 50;
  box-shadow:
    -5vw -30vw 0 5lh,          /* cheveux, à gauche */
    45vw -5em 0 5lh,           /* cheveux, à droite */
    5em 0,                     /* œil droit */
    inset 0 0 0 5vw;           /* contour (html), œil gauche (body) */
}
& {                            /* html */
  margin: 50 100;
  outline: 9in solid #b08743;
}
```

## Comment ça marche

### 1. html : un cercle sur un canevas blanc

`&`, c'est `html`. La règle `&` qui vient après remplace sa marge par `margin:50 100`. CSS Battle affiche la page en mode quirks, où `html` remplit le cadre moins ses marges : c'est un carré de 200×200 en (100, 50).

`border-radius:9in` demande 864px. C'est trop pour une boîte de 200px, le navigateur ramène donc l'arrondi à 100px : un cercle. `html` n'a pas de fond, le canevas reste blanc. Ce blanc, c'est le visage.

### 2. L'outline sert de masque

`outline:9in solid#b08743` trace une bande ocre de 864px autour de la boîte. Dans les navigateurs actuels, un outline suit le `border-radius` : la bande épouse le cercle et couvre tout le canevas autour.

Un outline est peint après le contenu de la page. Tout ce qui sort du cercle, même les ombres du `body`, finit donc sous l'ocre. Sans l'outline, les ombres qui suivent débordent sur presque tout le canevas.

### 3. Une liste d'ombres, deux éléments

`*` donne la même `color`, le même arrondi, la même marge et les quatre mêmes ombres à `html` et à `body`. Une ombre sans couleur prend `color`, ici `441212` (en mode quirks, une couleur peut se passer de son `#`).

Sur `html`, une seule ombre se voit : `inset 0 0 0 5vw` est un anneau intérieur de 20px d'épaisseur, le contour sombre. Les trois ombres extérieures tombent hors du cercle, sous l'outline, et ne servent à rien.

### 4. body : les yeux

`body` garde `margin:55%65%35%50`. Un pourcentage se calcule sur la largeur du parent, même en haut et en bas. Avec les 200px de `html` :

| Côté | Marge |
| --- | --- |
| haut | 55 % = 110px |
| droite | 65 % = 130px |
| bas | 35 % = 70px |
| gauche | 50px |

Il reste 200 − 50 − 130 = 20px de large et, en mode quirks, `body` s'étire sur 200 − 110 − 70 = 20px de haut. Une boîte de 20×20 en (150, 160), ronde grâce à l'arrondi.

Son `inset 0 0 0 5vw` la remplit entièrement : l'œil gauche, centré en (160, 170). `5em 0` est une simple copie du disque, 80px plus à droite : l'œil droit, en (240, 170).

### 5. body : les cheveux

Les deux dernières ombres ont un étalement de `5lh`. `lh`, c'est la hauteur de ligne : avec la police par défaut et `line-height:normal`, elle vaut 18px, donc 5lh font 90px. Un disque de 20px avec 90px d'étalement devient un disque de 100px de rayon.

- `-5vw -30vw` le décale de (−20, −120) : centré en (140, 50). Il couvre le haut à gauche du visage, et son point le plus bas est à y=150 : le bord presque droit de la frange.
- `45vw -5em` le décale de (180, −80) : centré en (340, 90). Son bord gauche touche x=240 à y=90, et sa courbe coupe la droite du visage.

Les deux disques sont bien plus grands que le visage. L'outline les recoupe au cercle.

### 6. Le point n'est pas décoratif

Le `.` devant `<style>` est du texte dans `body`. Sans lui, Chrome calcule la mise en page autrement : `html` fait 240px de haut au lieu de 200px, et le cercle devient un ovale. Avec un peu de texte dans `body`, `html` garde ses 200px.

## Notes de golf

- `outline:9in solid#b08743` est un masque rond en 24 caractères, couleur comprise : il peint le fond et cache ce qui déborde, en même temps.
- Une seule liste d'ombres sert aux deux éléments. Celles dont `html` n'a pas besoin tombent sous l'outline.
- `color:441212` sans `#`, et des ombres sans couleur.
- Des unités courtes : `5vw` vaut 20px, `30vw` 120px, `45vw` 180px, `5em` 80px, `5lh` 90px.
- `9in` est la façon la plus courte de dire « énorme », pour l'arrondi comme pour l'outline.
- `55%65%35%50` : pas besoin d'espace après un `%`.
