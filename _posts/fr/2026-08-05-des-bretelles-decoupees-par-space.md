---
title: "Des bretelles découpées par space : une boîte rayée en 131 caractères"
ref: 2026-08-05
permalink: /fr/2026/08/05/des-bretelles-decoupees-par-space/
description: "Comment un seul border-image, un dégradé à deux couleurs découpé avec space, dessine les bandes brune et crème de la cible CSS Battle du 5 août 2026, et laisse deux trous où le jaune de body fait les bretelles."
target: /assets/targets/2026-08-05.png
target_url: https://cssbattle.dev/play/13jMnnJohZbHBrV4lGLC
colors: ["#b9c99f", "#f7cb71", "#7c3219", "#fef9ce"]
player: selenit
chars: 131
score: 714.77
match: 100
code: |
  <style>&{background:#B9C99F;*{background:#F7CB71;margin:66 90;border-image:linear-gradient(#7C3219 25%,#ffdd 0)50%65/67%5vw 0 space
---

La cible du 5 août est vert sauge. Au milieu, une boîte à trois bandes : brune, crème et jaune. Deux barres jaunes traversent les deux bandes du haut, comme des bretelles. Ilya Streltsyn dessine tout avec body seul. Le fond de body donne le jaune. Un seul `border-image` peint le brun et le crème par-dessus, et son mot-clé `space` laisse deux trous : les bretelles.

Cochez **Couleurs pédagogiques** pour distinguer les coins du border-image de sa tuile du haut.

{% include animations/2026-08-05.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                                        /* html */
  background: #B9C99F;                     /* tout le canevas */
  * {                                      /* head, style et body */
    background: #F7CB71;                   /* body : une boîte jaune */
    margin: 66 90;                         /* body : 220 × 168 en (90 ; 66) */
    border-image:
      linear-gradient(#7C3219 25%, #ffdd 0) /* brun sur 42px, puis un crème translucide */
      50% 65                               /* tranches : 84px en haut et en bas, 65px sur les côtés */
      / 67% 5vw 0                          /* largeurs : 112,56px en haut, 20px sur les côtés, 0 en bas */
      space                                /* que des tuiles entières : une seule, au milieu */
```

## Comment ça marche

### 1. Deux boîtes

Il n'y a ni balise html, ni head, ni body dans le code : Chrome les ajoute, et met style dans head. Tout en haut de la feuille, `&` vise html. Le `*{` imbriqué veut dire `& *` : tout ce qui est dans html, donc head, style et body. head et style ne s'affichent pas : seul body compte.

Il n'y a pas de doctype, donc la page est en mode quirks. `66 90` n'a pas d'unité et se lit en px. Et en mode quirks, body s'étire en hauteur. getBoundingClientRect donne (90 ; 66 ; 220 ; 168) : 400 − 2 × 90 = 220 de large, 300 − 2 × 66 = 168 de haut. Avec `<!doctype html>` devant, la marge sans unité n'est plus valide, et 36 960 pixels changent.

### 2. Deux fonds

Le fond de html, `#B9C99F`, peint tout le canevas : c'est le vert sauge. Comme html a son propre fond, celui de body reste dans la boîte de body : un rectangle jaune, `#F7CB71`.

Ce jaune a trois rôles. C'est la bande du bas, ce sont les deux bretelles, et il est sous le crème. Sans le fond de body, les bretelles et la bande du bas deviennent vertes, le crème change aussi, et 28 000 pixels changent.

### 3. Un border-image sans bordure

body n'a pas de bordure : getComputedStyle donne `0px` et `none`. Le border-image est quand même dessiné, parce que ses largeurs sont un pourcentage et une longueur. Elles ne dépendent pas de l'épaisseur de la bordure.

L'image est `linear-gradient(#7C3219 25%,#ffdd 0)`, de la taille de body : 220 × 168. Elle est brune sur 25 % de 168 = 42px, puis `#ffdd` jusqu'en bas.

Les tranches `50%65` la coupent à 84px du haut et à 84px du bas (50 % de 168), et à 65px de la gauche et de la droite. Les tranches du haut font 84px de haut : 42px de brun, puis 42px de crème. Les tranches du haut et du bas prennent toute la hauteur : la rangée du milieu n'a pas de hauteur du tout.

### 4. Les largeurs, et les coins

Les largeurs sont `67%5vw 0` : le haut, les côtés, le bas.

- en haut : 67 % de la hauteur, 0,67 × 168 = 112,56px ;
- à gauche et à droite : 5vw, 5 % de 400 = 20px ;
- en bas : 0.

Le coin du haut de l'image, 65 × 84, est écrasé dans un coin de 20 × 112,56. Il garde ses proportions en hauteur : moitié brun, moitié crème, 56,28px chacun. Dans mon Chrome, les coins sont peints en brun de y = 66 à 121, et en crème de 122 à 177 : deux barres, en x = 90 à 109 et 290 à 309.

Le bas ne dessine rien : sa largeur est 0. Les bords gauche et droit sous les coins ne dessinent rien non plus : leur tranche n'a pas de hauteur. Le bas de body montre donc son propre jaune, de y = 178 à 233. C'est la bande du bas.

### 5. `space` : une tuile, deux trous

La tranche du haut, entre les deux coins, fait 220 − 2 × 65 = 90px de large et 84px de haut. La bordure fait 112,56px de haut, donc la tuile grandit de 112,56 / 84 = 1,34 : elle fait 90 × 1,34 = 120,6px de large.

Le bord du haut, entre les coins, fait 220 − 2 × 20 = 180px de large. Une tuile y tient ; deux demanderaient 241,2px. `space` ne dessine que des tuiles entières et répartit la place qui reste autour : 180 − 120,6 = 59,4px, soit 29,7px de chaque côté. La tuile va de x = 139,7 à 260,3 sur le canevas, peinte de 140 à 259.

Rien n'est peint dans les deux trous. On y voit le jaune de body, de x = 110 à 139 et de 260 à 289, sur 30px de large, jusqu'à la bande du bas. Ce sont les bretelles.

Avec `round` (même longueur), la tuile est étirée sur tout le bord, les bretelles disparaissent, et 7 140 pixels changent.

### 6. Un crème translucide

`#ffdd`, c'est `#ffffdd` avec une opacité de dd : 221 / 255, environ 87 %. Il n'est pas posé sur le vert, mais sur le jaune de body. Mêlé au jaune, il donne le crème pâle de la cible, `#fef9ce`.

## Notes de golf

- Une seule boîte dessine tout. Le fond de body fait le jaune, et le border-image peint par-dessus.
- `space` découpe les bretelles gratuitement. `round` a la même longueur mais remplit le bord : 7 140 pixels changent.
- `5vw` fait 20px en 3 caractères. Un simple `20` voudrait dire 20 fois l'épaisseur de la bordure, qui vaut 0 : les coins disparaissent, et 4 704 pixels changent. `20px` donne le même rendu en 132 caractères.
- `67%` est la valeur à deux chiffres la plus proche de 112px. Avec `66%`, 6 774 pixels changent ; avec `68%`, 6 526.
- Le `0` du bas est indispensable. Sans lui, la largeur du bas reprend celle du haut, `67%`, et 22 127 pixels changent.
- `25%` place le changement de couleur au milieu de la tranche du haut de 84px. Avec `20%`, 1 760 pixels changent.
- `#ffdd` est une couleur à 4 chiffres, avec transparence. `#ffd` a un caractère de moins, mais il est opaque : tous les pixels crème deviennent `#ffffdd`, 8 960 pixels en tout.
- `&` vise html en 1 caractère. `html{` donne le même rendu en 134 caractères.
- Aucune espace n'est utile dans `)50%65/67%5vw` : la `)`, le `%` et le `/` terminent chacun un mot.
- Deux accolades, `&{` et `*{`, restent ouvertes, et il n'y a pas de `</style>`. Avec `}}`, le code fait 133 caractères ; avec `}}</style>`, 141. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome, le crème n'est pas une couleur unie. Ses pixels alternent entre `#fef8cf` et `#fef8ce`, avec quelques `#fdf8ce` dans les coins. La cible est un `#fef9ce` uni. Ainsi, 8 960 pixels sont décalés d'un cran sur un ou deux canaux, ce que l'œil ne voit pas. Tout le reste correspond à la cible au pixel près. Le juge de CSS Battle donne au code 100 % de correspondance.
