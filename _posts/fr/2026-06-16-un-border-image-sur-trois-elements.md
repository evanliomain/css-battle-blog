---
title: "Un border-image sur trois éléments : un biscuit en 160 caractères"
ref: 2026-06-16
permalink: /fr/2026/06/16/un-border-image-sur-trois-elements/
description: "Comment un seul border-image qui ne peint que ses quatre coins dessine quatre petits disques sur html et des carrés jaunes pleins sur body et img, parce que ses tailles sont en em et en lh, et comment deux rotations de 45° mettent tout en place, dans la cible CSS Battle du 16 juin 2026."
target: /assets/targets/2026-06-16.png
target_url: https://cssbattle.dev/play/XmvF6SFxJCXoh15eyrGD
colors: ["#7c3219", "#f7cb71"]
player: emohdaziz
chars: 160
score: 687.05
match: 100
code: |
  <img><style>&,&>*{rotate:45deg}*{background:#7c3219;margin:5%70;border-image:radial-gradient(#f7cb71,2.2em,#0000 0)230/8lh;*{margin:50;*{padding:30}font:1in/8q"
---

La cible du 16 juin ressemble à un biscuit sur un fond brun : un carré jaune partagé en quatre petits carrés, un carré jaune au milieu, quatre rectangles bruns entre eux, et un demi-cercle jaune sur chaque côté. Mohamed Ali donne à html, body et img le même `border-image`. Il ne peint que ses quatre coins, et ses tailles sont en `em` et en `lh`. Sur html, avec une police de 16px, les coins contiennent quatre petits disques. Sur body et img, avec une police de 96px, ce sont des carrés jaunes pleins. Un seul `rotate:45deg` sur html et body amène les disques sur les axes.

Utilisez les **Couleurs pédagogiques** pour distinguer les trois éléments, et la **Vue large** pour voir tourner la boîte de html.

{% include animations/2026-06-16.html lang=page.lang %}

## Le code, aéré

```css
<img><style>
&, & > * {                /* html, puis ses enfants head et body */
  rotate: 45deg;          /* html 45° ; body 45° de plus : 90° */
}
* {                       /* html, head, body, img, style */
  background: #7c3219;
  margin: 5% 70;          /* html : 20px et 70px, un carré de 260 × 260 */
  border-image:
    radial-gradient(
      #f7cb71,            /* jaune depuis le centre… */
      2.2em,              /* …jusqu'à 2.2em : html 35,2px, les autres 211,2px */
      #0000 0             /* puis transparent */
    )
    230                   /* découpe : seuls les quatre coins sont peints */
    / 8lh;                /* taille des coins : html 8 × 18 = 144px, les autres 60,47px */
  * {                     /* head, body, img, style */
    margin: 50;           /* body : 160 × 160 en (120, 70) */
    * {                   /* img et style */
      padding: 30;        /* img : 60 × 60 en (170, 120) */
    }
    /* une police de 96px, une hauteur de ligne de 7,56px, et une famille :
       une chaîne que la fin du code laisse ouverte */
    font: 1in/8q "
```

## Comment ça marche

### 1. Cinq éléments, trois visibles

La page commence par `<img>`. Le navigateur ajoute html, head et body, et range img et style dans body. `*` touche donc cinq éléments : html, head, body, img et style. head et style sont masqués. Il reste html, body et img.

Au premier niveau, `&` est la racine, html. `&>*` désigne les enfants de html : head et body. Seuls ceux-là reçoivent `rotate:45deg`. img ne tourne pas d'elle-même.

### 2. html : un carré de 260

Dans `margin:5%70`, le 70 n'a pas d'unité. Les pages de CSS Battle n'ont pas de doctype, donc elles sont en mode quirks, et une longueur sans unité s'y lit en px. Une marge en % est une part de la largeur du bloc conteneur : 5 % de 400 font 20px. html a 20px en haut et en bas, 70px sur les côtés.

En mode quirks, html remplit la hauteur de la page. Il fait 400 − 140 = 260px de large et 300 − 40 = 260px de haut : un carré en (70, 20), au même centre que le canevas, (200, 150). html est la racine, donc son fond brun couvre tout le canevas.

### 3. Un disque, quatre coins

Un `border-image` se dessine même sans bordure : `border-image-width` lui donne sa propre taille. Ici son image est un dégradé, aussi grand que la boîte de l'élément : 260 × 260 sur html.

`radial-gradient(#f7cb71,2.2em,#0000 0)` contient une couleur, puis une longueur seule, puis une couleur. La longueur seule est un indice de transition : le point où les deux couleurs se mélangent à moitié. `#0000 0` ne peut pas se placer avant l'indice, donc il remonte lui aussi à 2.2em. L'indice est tout au bout de la transition : le jaune reste jaune jusqu'à 2.2em, puis tout est transparent. `#f7cb71 2.2em,#0000 0` donne la même image, à longueur égale. La police de html fait 16px, donc le disque a un rayon de 35,2px, au milieu de l'image.

La découpe `230` coupe l'image à 230px de chaque bord. 230 + 230 dépasse 260, donc les bords et le milieu ne reçoivent rien : seuls les quatre coins sont peints. Chaque coin est un morceau de 230 × 230 de l'image, et chaque morceau contient tout le disque, qui va de 94,8 à 165,2.

La largeur `8lh` vaut 8 fois la hauteur de ligne. Celle de html fait 18px, donc 144px. Deux coins de 144px ne tiennent pas dans 260px, donc toutes les largeurs rétrécissent dans la même proportion, jusqu'à 130px. Les quatre coins remplissent les quatre quarts de html. Chacun montre son morceau à l'échelle 130/230 = 0,565 : un disque de 19,9px de rayon, à 56,52px du centre de html sur chaque axe.

### 4. html tourne de 45°

html tourne autour de son centre, (200, 150). Les quatre disques étaient sur les diagonales, à 56,52px sur chaque axe. Après la rotation, ils sont sur les axes, à 56,52 × √2 = 79,93px du centre : à gauche, à droite, en haut et en bas. Quand je rends html seul, le disque de gauche va de x = 100 à 139 sur la ligne 150.

### 5. body : quatre carrés jaunes

Le `*` imbriqué veut dire `* *` : tout élément placé dans un autre. Il fixe `margin:50` et la police. body fait 260 − 100 = 160px de large, et en mode quirks il remplit aussi la hauteur de html : un carré de 160 × 160 en (120, 70), au même centre.

La police de body est de `1in`, 96px. Donc `2.2em` vaut 211,2px. Les coins d'un carré de 160px ne sont qu'à 113,14px de son centre : le disque couvre toute l'image, toute jaune. La découpe 230 dépasse 160, donc elle compte pour 100 % : chaque coin montre l'image entière.

`8q` est la hauteur de ligne : 8 quarts de millimètre, 7,56px. Donc `8lh` vaut 60,47px, et deux coins tiennent dans 160px. Quatre carrés jaunes se posent dans les coins de body, avec une croix brune entre eux. Dans mon rendu, ils sont dessinés sur 60px de large, et la croix fait 40px de large.

body est dans html, déjà tourné de 45°. À ce stade, ce serait un losange.

### 6. body tourne deux fois

body a aussi son propre `rotate:45deg`. 45 + 45 = 90°. Un carré aux quatre coins pareils, tourné d'un quart de tour, reste le même : body se retrouve à plat, de 120 à 280.

Son fond brun couvre la moitié intérieure de chaque disque. Seules les moitiés extérieures dépassent : les quatre demi-cercles, de x = 100 à 120 à gauche.

### 7. img : le carré du milieu

img n'a pas de source, donc pas de contenu. `* * *` lui donne `padding:30` : 60 × 60. Sa marge de 50 la place à 50px à l'intérieur de body : je l'ai mesurée en (170, 120), juste au milieu.

Elle a la même police de 96px, donc son image est toute jaune elle aussi. Ses coins de 60,47px ne tiennent pas deux fois dans 60px : ils rétrécissent à 30px, et quatre coins de 30 × 30 la remplissent. Un carré jaune couvre le milieu de la croix brune. Il reste quatre rectangles bruns de 40 × 50. img ne tourne pas d'elle-même, mais elle est dans body, tourné de 90° : un carré centré ne change pas.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `border-image` fait trois choses. Ses tailles sont en `em` et en `lh`, donc la police décide de ce qu'il dessine : de petits disques sur html, des carrés jaunes pleins sur body et img.
- `8lh` tient en 3 caractères, et prend une valeur différente sur chaque élément : 144px sur html, 60,47px sur body et img. `60px` (161 caractères) donne aussi des coins de 60px à html : les disques deviennent quatre petits points loin du carré, et 3 528 pixels changent. Un `60` sans unité (159 caractères) veut dire 60 fois l'épaisseur de bordure, ici 0 : il ne reste rien de jaune, et 20 080 pixels changent.
- La hauteur de ligne de html doit seulement donner un `8lh` d'au moins 130px. J'ai vérifié : avec une hauteur de ligne de 17px ou de 30px sur html, l'image est la même. À 16px, `8lh` vaut 128px, les coins ne se touchent plus, et 200 pixels changent.
- Un seul `font` règle les deux tailles : 96px pour `em` et 7,56px pour `lh`. Sans `/8q` (157 caractères), la hauteur de ligne est normale, 110px, et `8lh` vaut 880px. Les coins de body et de img rétrécissent jusqu'à les remplir entièrement, les quatre rectangles bruns disparaissent, et 8 000 pixels changent.
- Le raccourci `font` exige une famille. Le `"` ouvre une chaîne que la fin du code ne ferme jamais. `font:1in/8q a` donne la même image en 161 caractères. Sans l'espace, `8qa` se lit comme une seule unité inconnue : toute la déclaration saute, et 10 408 pixels changent.
- `5%70` n'a pas besoin d'espace : le `%` termine la première valeur. `margin:20 70` donne la même image en 161 caractères.
- `&,&>*` atteint html et body en 5 caractères. `html,body` donne la même image en 164 caractères. Avec `&` seul (156 caractères), body ne reçoit que les 45° de html : il reste un losange, et 20 504 pixels changent.
- La découpe `230` place les demi-cercles. Avec `200` ou `260`, à longueur égale, ils bougent, et 1 808 ou 1 520 pixels changent.
- `<img>` est une boîte vide : son padding seul lui donne 60 × 60. Avec `<a>` (158 caractères), le carré du milieu devient deux barres de 30px de large, dont une loin à droite, et 5 020 pixels changent.
- `#0000` est transparent en 5 caractères. `transparent` donne la même image en 166 caractères.
- Les marges et le padding n'ont pas d'unité, ce qui marche en mode quirks. Avec `px` sur 70, 50 et 30, l'image est la même en 166 caractères.
- Rien n'est fermé. `"}}` à la fin donne la même image en 163 caractères.
