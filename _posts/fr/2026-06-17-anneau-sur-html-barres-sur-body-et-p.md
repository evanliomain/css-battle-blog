---
title: "Un anneau sur html, des barres sur body et p : une mire en 133 caractères"
ref: 2026-06-17
permalink: /fr/2026/06/17/anneau-sur-html-barres-sur-body-et-p/
description: "Comment un seul radial-gradient mesuré en em dessine un anneau rouge sur le canevas de html et deux barres blanches aux bouts rouges sur body et p, et comment un seul rotate:90deg, additionné de parent en enfant, redresse p pour finir la croix, dans la cible CSS Battle du 17 juin 2026."
target: /assets/targets/2026-06-17.png
target_url: https://cssbattle.dev/play/gWRvIYqOilEJ5qzQONIM
colors: ["#fff", "#e8ad6d", "#a84a4b"]
player: selenit
chars: 133
score: 712.6
match: 100
code: |
  <p> <style>*{+*{font:77q/41%a;margin:135 70}rotate:90deg;background:radial-gradient(2em,#fff 62%,#E8AD6D 0 95q,#A84A4B 0 344%,#E8AD6D
---

La cible du 17 juin est une mire sur un fond orange pâle : un anneau rouge brique, avec quatre petits tenons rouges qui en dépassent, à gauche, à droite, en haut et en bas, et une croix blanche à l'intérieur. Ilya Streltsyn donne à tous les éléments le même fond, un dégradé radial de rayon `2em`. Sur html, avec une police de 16px, il dessine l'anneau. Sur body et p, avec une police de 72,76px, le même dégradé dessine des barres blanches aux bouts rouges. Un seul `rotate:90deg` sur tous les éléments fait le reste : les rotations s'additionnent, body se retrouve à plat et p se dresse.

Utilisez les **Couleurs pédagogiques** pour distinguer body de p, et la **Vue large** pour voir tourner la boîte de html.

{% include animations/2026-06-17.html lang=page.lang %}

## Le code, aéré

```css
<p>&nbsp;<style>               /* après <p> : une espace insécable (U+00A0) */
* {                       /* html, head, body, p, style */
  + * {                   /* * + * : body seul, il suit head */
    font: 77q/41% a;      /* 72,76px, hauteur de ligne 29,83px */
    margin: 135 70;       /* px en mode quirks : 260 × 30 en (70, 135) */
  }
  rotate: 90deg;          /* html 90°, body 180°, p 270° */
  background: radial-gradient(
    2em,                  /* html : 32px ; body et p : 145,51px */
    #fff 62%,             /* html : 19,84px ; body et p : 90,22px */
    #E8AD6D 0 95q,        /* jusqu'à 89,76px : vide dans body et p */
    #A84A4B 0 344%,       /* html : 110,08px ; body et p : 500,56px */
    #E8AD6D
```

## Comment ça marche

### 1. Cinq éléments, une règle

La page commence par `<p>`. Le navigateur ajoute html, head et body autour, et l'élément style se retrouve dans p. `*` touche donc cinq éléments : html, head, body, p et style. head et style sont masqués. Il reste html, body et p.

Tous reçoivent le même `rotate` et le même `background`.

### 2. Un dégradé mesuré en em

`radial-gradient(2em, …)` n'a qu'une longueur : c'est un cercle de ce rayon, centré dans la boîte. Les arrêts en % sont une part de ce rayon, donc ils grandissent avec la taille de police. `95q` est une longueur fixe : 95 quarts de millimètre, 89,76px.

Les arrêts de couleur à deux positions, comme `#E8AD6D 0 95q`, commencent à 0. Un arrêt ne peut pas revenir avant le précédent, donc 0 veut dire « juste là où finit la couleur d'avant ». Tous les bords sont nets.

### 3. html : l'anneau

La police de html fait 16px, donc `2em` vaut 32px. Les arrêts sont : blanc jusqu'à 62 % × 32 = 19,84px, orange jusqu'à 89,76px, rouge jusqu'à 344 % × 32 = 110,08px, puis orange. html est la racine : son fond s'étend à tout le canevas, centré en (200, 150).

C'est l'anneau rouge, épais de 20,32px, avec un petit disque blanc au centre. Le disque ne se voit jamais à la fin : la croix le couvre.

### 4. body : une barre blanche aux bouts rouges

Le `+*` imbriqué veut dire `* + *` : un élément juste après un autre élément. body suit head, et c'est le seul : html, head et p sont des premiers enfants, et style vient après du texte, pas après un élément.

La marge `135 70` de body n'a pas d'unité. Les pages de CSS Battle n'ont pas de doctype, donc elles sont en mode quirks, et une marge sans unité s'y lit en px. body fait 400 − 2 × 70 = 260px de large. En mode quirks, il remplit aussi la hauteur de html : 300 − 2 × 135 = 30px. Je l'ai mesuré en (70, 135).

Sa police est de `77q`, 72,76px. Donc `2em` vaut 145,51px, et les arrêts en % grandissent : 62 % vaut 90,22px. C'est plus que `95q`, 89,76px, donc l'arrêt orange n'a plus de largeur. Le dégradé de body est blanc jusqu'à 90,22px de son centre, puis rouge jusqu'à 500,56px, bien au-delà de ses bouts. Une barre blanche aux deux bouts rouges.

### 5. p : la même barre, par-dessus

p est dans body, et il contient une espace insécable. Cette espace ne disparaît pas, donc p a une ligne. p hérite de la police de body, avec une hauteur de ligne de 41 % × 72,76 = 29,83px. p fait donc 260 × 29,83. Ses marges par défaut fusionnent avec celles de body, et je l'ai mesuré en haut de body, en (70, 135) avant toute rotation.

Il a le même dégradé de 145,51px : une deuxième barre blanche aux bouts rouges, posée sur la première.

### 6. Les rotations s'additionnent

Chaque élément tourne autour de son propre centre, dans son parent déjà tourné.

- html tourne de 90° autour de (200, 150). Sa boîte de 400 × 300 se dresse en 300 × 400, à partir de (50, −50). Les cercles du canevas ont le même centre : rien ne change à l'écran.
- body a le même centre que html. Son propre quart de tour, dans celui de html, fait 180° : il se retrouve à plat, à la même place.
- p ajoute son quart de tour aux 180° de body : 270°. Il se dresse. Je l'ai mesuré de (185,09, 20,09) à (214,91, 280,09).

### 7. La mire

body fait la branche horizontale et p la branche verticale. Dans les deux, le blanc s'arrête à 90,22px du centre, juste après le bord intérieur de l'anneau à 89,76px : les branches finissent par des courbes qui suivent l'anneau.

Au-delà de 90,22px, les barres sont rouges. Sous l'anneau, rouge sur rouge, rien ne se voit. Hors de l'anneau, les bouts rouges dépassent : les quatre tenons, longs d'environ 20px.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `rotate` fait trois rotations différentes : 90° pour html, 180° pour body, 270° pour p. Sans `rotate:90deg;` (120 caractères), p reste couché sur body : la branche verticale et ses deux tenons disparaissent, le disque blanc de html apparaît au centre, et 5 742 pixels changent.
- Un seul fond fait deux choses. Mesuré en `2em`, il donne un anneau sur html et une barre sur body et p. Le dernier `#E8AD6D` ramène l'orange après l'anneau : sans lui (125 caractères), le rouge continue jusqu'aux bords du canevas, et 79 514 pixels changent.
- Le caractère après `<p>` est une espace insécable. Avec une espace ordinaire, toujours 133 caractères, l'espace disparaît, p fait 0px de haut, et l'image est la même que sans le `rotate` : 5 742 pixels changent.
- La hauteur de ligne de `41%` donne à p 29,83px de haut, proche des 30px de body. Sans `/41%` (130 caractères), p prend la hauteur de ligne normale de la police de secours, 84px, body grandit à 84px pour le contenir, les deux barres font 84px d'épaisseur, et 32 382 pixels changent.
- Le raccourci `font` règle la taille et la hauteur de ligne d'un coup. Il lui faut une famille : `a`, une lettre, une police qui n'existe pas, sans espace après le `%`. `font-size:77q;line-height:41%` donne la même image en 149 caractères.
- `+*` atteint body en deux caractères. Avec `body{` à sa place, l'image est la même, en 135 caractères.
- La marge n'a pas d'unité, ce qui marche en mode quirks. `margin:135px 70px` donne la même image en 137 caractères.
- Rien n'est fermé. `)}` à la fin donne la même image en 135 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel est très proche de la cible, mais pas identique : 948 pixels diffèrent de plus de 8 sur un canal, jusqu'à 181. 382 d'entre eux sont sur les quatre bords droits de la branche verticale, où mon rendu a de légères demi-teintes et la cible aucune. Les 566 autres sont sur les cercles à environ 90px et 110px du centre, les bords de l'anneau et les bouts arrondis des branches : mon rendu dessine ces cercles en marches nettes, et la cible y a des couleurs intermédiaires. Mon rendu a 15 couleurs différentes, la cible 54. Le juge de CSS Battle donne au code 100 % de correspondance.
