---
title: "Un dégradé, deux échelles : une boîte rose croquée en 149 caractères"
ref: 2026-08-04
permalink: /fr/2026/08/04/un-degrade-deux-echelles/
description: "Comment une seule règle, appliquée à html et à body, dessine la cible CSS Battle du 4 août 2026 : le même radial-gradient fait des disques gris à l'échelle de html et des morsures vertes à l'échelle de body, et le même outline cache le reste."
target: /assets/targets/2026-08-04.png
target_url: https://cssbattle.dev/play/qfoEI6akJpQgni9f79Wa
colors: ["#325853", "#8885", "#d99795", "#d8d8d8"]
player: selenit
chars: 149
score: 696.67
match: 100
code: |
  <style>*{outline:solid 77lh#325853;background:radial-gradient(28lh,#8885 5%,0,#325853 677%26q,#D99795)333q/6.86em;margin:40 26.2%18.6%;*{font:82%/1%'
---

La cible du 4 août est vert foncé. Au milieu, une boîte rose a une morsure ronde et verte de chaque côté. À côté de chaque morsure, il y a un demi-disque gris clair. Ilya Streltsyn la dessine avec une seule règle pour html et body : le même `radial-gradient`, le même `outline`, les mêmes marges. Une règle imbriquée donne à body une toute petite police. Toutes les tailles en `lh` et en `em` rétrécissent alors : le dégradé dessine des disques gris sur html et des morsures vertes sur body.

Cochez **Couleurs pédagogiques** pour distinguer les deux outlines des deux fonds.

{% include animations/2026-08-04.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                        /* html, head, style et body */
  outline: solid 77lh #325853;             /* html : 1386px, body : 10px */
  background:
    radial-gradient(
      28lh,                                /* rayon : 504px sur html, 3,67px sur body */
      #8885 5%,                            /* gris translucide jusqu'à 5 % */
      0,                                   /* un repère à 0 : un bord net */
      #325853 677% 26q,                    /* vert jusqu'à 677 % */
      #D99795                              /* puis rose */
    )
    333q / 6.86em;                         /* x = 314,65px ; tuiles de 109,76px sur html, 90px sur body */
  margin: 40 26.2% 18.6%;                  /* html : 104,8 sur les côtés ; body : 49,88 */
  * {                                      /* head, style et body, pas html */
    /* 13,12px, hauteur de ligne 0,1312px, un nom de police vide */
    font: 82% / 1% '
```

## Comment ça marche

### 1. Une règle pour tous les éléments

Il n'y a ni balise html, ni head, ni body dans le code : Chrome les ajoute, et met style dans head. `*` vise les quatre. head et style ne s'affichent pas : seuls html et body comptent. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre. Ce sont head, style et body, mais pas html.

html et body reçoivent donc le même `outline`, le même `background` et la même `margin`. Seul body reçoit la `font`.

### 2. Deux boîtes

Il n'y a pas de doctype, donc la page est en mode quirks, et `40` sans unité se lit en px. Avec `<!doctype html>` devant, 10 089 pixels changent.

Pour html, les pourcentages se prennent sur les 400px de la fenêtre : 26,2 % de 400 = 104,8 sur les côtés, 18,6 % de 400 = 74,4 en bas. html fait 400 − 2 × 104,8 = 190,4 de large, en (104,8 ; 40).

Pour body, ils se prennent sur la largeur de html, 190,4 : 49,88 sur les côtés, 35,41 en bas. body fait 190,4 − 2 × 49,88 = 90,66 de large, en (154,67 ; 80). Le mode quirks étire body vers le bas : 300 − 40 − 74,39 − 40 − 35,41 = 110,2px de haut. getBoundingClientRect donne à html une hauteur de 190,2px. Les deux boîtes ont donc leur milieu en y = 135,1.

### 3. Deux échelles

`font:82%/1%'` donne à body 82 % de 16 = 13,12px, et une hauteur de ligne de 1 % de cette taille : 0,1312px. Le `'` seul ouvre un nom de police qui court jusqu'à la fin du code : un nom vide. La forme raccourcie exige une famille, et celle-ci compte.

html garde la police par défaut : 16px, hauteur de ligne `normal`. Dans mon Chrome, cela fait 1lh = 18px : getComputedStyle change `28lh` en 504px.

Chaque valeur en `lh` ou en `em` a donc deux tailles :

- `28lh` : 504px sur html, 3,6736px sur body ;
- `77lh` : 1386px sur html, 10,1px sur body (l'outline est tracé sur 10px) ;
- `6.86em` : 109,76px sur html, 90,0032px sur body.

### 4. Le fond de html, sur tout le canevas

Le fond de html est peint sur tout le canevas. Mais ses tuiles sont dimensionnées et placées sur la boîte de html, 190,4 × 190,2 en (104,8 ; 40).

La taille est `6.86em`, donc 109,76px de large. La hauteur est `auto`, et un dégradé n'a pas de taille propre : il prend la hauteur de la boîte, 190,2px. La position `333q` ne fixe que x ; y est centré. 1q vaut un quart de millimètre, 0,945px, donc 333q = 314,65px. Les bords des tuiles tombent en x = 90,16, 199,92 et 309,68 sur le canevas.

Le dégradé est un cercle de rayon 28lh = 504px, au milieu de chaque tuile :

- `#8885` jusqu'à 5 %, soit 25,2px. C'est `#888` avec une opacité de 85/255, un tiers. Sur la page blanche, il donne un gris clair : `#d7d7d7` dans mon rendu.
- `0` est un repère de transition à 0px, avant l'arrêt précédent. Chrome le ramène sur cet arrêt, ce qui fait un bord net. Sans lui, le gris se fond dans le vert, et 21 932 pixels changent.
- `#325853` à partir de 677 %. `26q` est une seconde position pour le même arrêt, mais elle est plus petite que 677 %, donc Chrome la ramène aussi à 677 %.
- `#D99795` ensuite : 677 % de 504, c'est 3412px, bien hors du canevas. html ne montre aucun rose.

On obtient quatre disques gris de rayon 25,2, en x = 35,28, 145,04, 254,8 et 364,56, y = 135,1. Tout le reste du canevas est vert.

### 5. L'outline de html

L'outline de html, c'est 77lh = 1386px de vert autour de sa boîte. Il couvre tout le canevas hors de la boîte, qui va de x = 104,8 à 295,2 et de y = 40 à 230,2. Les deux disques extérieurs disparaissent dessous. Sans l'outline de html, ils apparaissent, et 4 186 pixels changent.

### 6. Le fond de body

body a le même fond, à l'échelle de body. Comme html a un fond, celui de body reste dans la boîte de body.

Les tuiles font 90,0032px de large et 110,2px de haut, avec le même décalage de `333q`. Un bord de tuile tombe en x = 199,31. Les centres des cercles sont donc en x = 154,31 et 244,31, y = 135,1.

Le rayon fait 3,6736px. La partie grise, 5 %, fait 0,18px : rien ne se voit. Le vert va jusqu'à 677 %, 24,87px. Ensuite, c'est rose.

La boîte de body coupe les deux cercles verts. Celui de gauche est centré 0,36px à gauche du bord de body, celui de droite 1,02px à gauche de l'autre bord. On voit deux morsures dans une boîte rose : de x = 154,67 à 179,18 à gauche, de 219,44 à 245,33 à droite. Sans le fond de body, 9 172 pixels changent.

### 7. L'outline de body

L'outline de body, c'est 77lh, soit 10px de vert autour de body : de x = 144,67 à 255,33, et de y = 70 à 200,2. Il couvre la partie intérieure de chaque disque gris, jusqu'aux morsures. Le gris à gauche de x = 144,67 et à droite de x = 255,33, ce sont les deux demi-disques. Sans l'outline de body, 1 008 pixels changent.

## Notes de golf

- Une seule règle dessine tout. Les tailles sont en `lh` et en `em`, et la `font` imbriquée change leur valeur sur body. Le même dégradé et le même outline servent à deux échelles.
- Le `'` seul coûte un caractère, et la forme raccourcie `font` en a besoin. Sans lui, Chrome ignore la déclaration : body garde 16px et une hauteur de ligne `normal`, et 10 273 pixels changent.
- Le repère `0,` coûte deux caractères et donne le bord net des disques gris.
- `#8885` est un gris en 5 caractères, posé sur la page blanche. `#888`, opaque, est plus foncé : 2 042 pixels changent.
- `333q` place les deux grilles de tuiles d'un coup.
- `6.86em` convient aux deux largeurs de tuile. Avec `6.8em`, 1 480 pixels changent ; avec `6.9em`, 893.
- `28lh` : avec `27lh`, 516 pixels changent ; avec `29lh`, 700.
- `5%` : avec `4%`, 880 pixels changent ; avec `6%`, 1 092.
- `82%` : avec `80%`, 1 000 pixels changent ; avec `84%`, 839.
- `26.2%` : avec `26%`, 1 995 pixels changent. `18.6%` : avec `18%`, 909.
- Aucune espace n'est utile dans `77lh#325853`, `677%26q`, `)333q` ou `26.2%18.6%` : un `#` commence toujours un nouveau mot, comme ce qui suit un `%` ou une `)`.
- Deux accolades, `*{` et `*{`, et le nom de police restent ouverts, et il n'y a pas de `</style>`. Avec `'}}`, le code fait 152 caractères ; avec `'}}</style>`, 160. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome, le code place chaque bord droit sur le même pixel que la cible. La cible a des pixels bruités autour de chaque bord, des points colorés jusqu'à 8 pixels de lui. Mon rendu a des bords nets. Sur les courbes, 88 pixels de bord penchent de l'autre côté. Les aplats sont aussi décalés d'un cran : la cible a `#315853`, `#d99896` et `#d8d8d8`, et mon rendu `#325853`, `#d99795` et surtout `#d7d7d7`. En tout, 1 824 pixels diffèrent de plus de 8 sur un canal. Le juge de CSS Battle donne au code 100 % de correspondance.
