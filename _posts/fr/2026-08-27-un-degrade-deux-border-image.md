---
title: "Un dégradé, deux border-image : un couloir en 161 caractères"
ref: 2026-08-27
permalink: /fr/2026/08/27/un-degrade-deux-border-image/
description: "Comment un seul dégradé radial, découpé par border-image sur html et sur body, dessine le sol, le mur du fond et la porte de la cible CSS Battle du 27 août 2026."
target: /assets/targets/2026-08-27.png
target_url: https://cssbattle.dev/play/s17MKgzJQsAf1vObf9Ta
colors: ["#4e53bb", "#4d4a18", "#dbddff"]
player: selenit
chars: 161
score: 686.23
match: 100
code: |
  <style>*{margin:50%-3-5;*{margin:-32%113 115;--p:49%/72%}background:#4E53BB;border-image:radial-gradient(#4D4A18 17%,#DBDDFF 0 301q,#0000 0)var(--p,1 5/152%)56%0
---

La cible du 27 août, c'est un couloir sur fond violet : un mur du fond lavande avec une petite porte brune arrondie en haut, et un sol lavande qui s'élargit vers le bas du cadre. Ilya Streltsyn dessine tout avec un seul dégradé radial, utilisé en `border-image` sur deux boîtes. Sur `html`, deux coins de 5 × 1 pixels sont étirés pour faire les côtés en biais du sol. Sur `body`, le centre brun du dégradé, coupé en quatre, devient la porte.

Cochez **Couleurs pédagogiques** pour voir en rose la partie transparente du dégradé : c'est elle qui donne sa forme au sol.

{% include animations/2026-08-27.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html (et tout ce qu'il contient) */
  margin: 50% -3 -5;               /* html : 406 × 105 en (−3 ; 200) */
  * {                              /* head, style, body */
    margin: -32% 113 115;          /* body : 180 × 119,91 en (110 ; 70,09) */
    --p: 49% / 72%;                /* découpe et largeur du haut du body */
  }
  background: #4E53BB;             /* tout le canevas */
  border-image:
    radial-gradient(#4D4A18 17%, #DBDDFF 0 301q, #0000 0)
    var(--p, 1 5 / 152%)           /* html : découpe 1 5, haut à 152% */
    56% 0;                         /* largeurs des côtés et du bas, communes */
}
```

## Comment ça marche

### 1. html : une bande en bas

`*` vise `html` et tous les éléments qu'il contient. Le `*` imbriqué ne vise que ceux de l'intérieur : `head`, `style` et `body`. Les deux règles ont la même spécificité, et l'imbriquée vient après : le `body` a donc sa propre marge. `background` et `border-image` s'appliquent pareil à `html` et à `body`.

Sur `html`, `margin:50%-3-5` donne 200px en haut (une marge en % se calcule sur la largeur, 400), −3px sur les côtés et −5px en bas. En mode quirks, `html` remplit la hauteur du cadre moins ses marges : 300 − 200 + 5 = 105px. Je l'ai mesuré : une boîte de 406 × 105 en (−3 ; 200). Elle dépasse de 3px de chaque côté et de 5px sous le canevas.

Le fond de `html` est peint sur tout le canevas : `#4E53BB` le couvre en entier.

### 2. Un seul dégradé radial

La source de la `border-image` est `radial-gradient(#4D4A18 17%,#DBDDFF 0 301q,#0000 0)`. Sans taille précisée, c'est une ellipse qui va jusqu'aux coins. L'image a la taille de la boîte : 406 × 105 pour `html`. Le rayon horizontal de l'ellipse fait alors 203 × √2 = 287,08px.

Les arrêts : brun jusqu'à 17 %, lavande à partir de là (`0` veut dire « là où l'arrêt précédent s'est arrêté ») jusqu'à 301q, et transparent ensuite. 301q, ce sont 301 quarts de millimètre, soit 284,41px. C'est juste un peu moins que le rayon de 287,08 : seules les toutes petites pointes des quatre coins sont transparentes. J'ai rendu le dégradé seul en zoom ×8 : chaque pointe fait environ 3,8px de large et 1px de haut.

### 3. Deux coins de 5 × 1 font le sol

Sur `html`, `--p` n'existe pas : `var(--p,1 5/152%)` donne sa valeur de repli. Avec le `56%0` qui suit, la valeur complète est `1 5/152% 56% 0` :

- `1 5`, c'est la découpe : 1px depuis le haut et le bas de l'image, 5px depuis la gauche et la droite.
- `152% 56% 0`, ce sont les largeurs de la zone de border-image : 152 % de la hauteur en haut (159,6px), 56 % de la largeur sur les côtés (227,36px), 0 en bas.

Ces largeurs ne tiennent pas : 159,6, c'est plus que les 105px de la boîte. Le navigateur les multiplie donc toutes par 105 / 159,6. La bande du haut fait 105px, toute la hauteur de la boîte. Les côtés font 149,58px. Le bas fait 0 : les bords des côtés n'ont plus de place, et sans `fill` le milieu n'est pas dessiné. Il ne reste que trois morceaux, tous pris dans la ligne du haut de l'image :

- le coin haut gauche, 5 × 1px, étiré en 149,58 × 105 ;
- le bord du haut, 396 × 1px, étiré en 106,84 × 105, tout lavande ;
- le coin haut droit, comme celui de gauche.

Le coin de 5 × 1 contient une pointe transparente. Étiré 29,9 fois en largeur et 105 fois en hauteur, le bord courbe de l'ellipse devient une ligne en biais presque droite. Je l'ai mesurée sur le rendu : sur la ligne 200, le sol commence en x = 110 ; sur la ligne 299, en x = 1. Le côté droit est le miroir : 290 et 399. La partie transparente laisse voir le canevas violet. Le sol est un trapèze.

### 4. body : le mur du fond

La règle imbriquée donne au `body` `margin:-32%113 115`. −32 % des 406px de large de `html`, cela fait −129,91px en haut. 113px de chaque côté laissent 406 − 226 = 180px de large. En mode quirks, le `body` remplit la hauteur de `html` moins ses marges : 105 + 129,91 − 115 = 119,91px. Je l'ai mesuré : une boîte de 180 × 119,91 en (110 ; 70,09). Elle s'arrête en y = 190, et le sol commence en y = 200 : il reste entre les deux une bande violette de 10px.

Le `body` a le même fond violet. On ne le voit jamais : la border-image le couvre en entier.

### 5. Le même dégradé, dans une boîte plus petite

Sur le `body`, le dégradé fait 180 × 119,91. Le rayon horizontal de l'ellipse fait 90 × √2 = 127,28px : le cœur brun, 17 % de ce rayon, est une ellipse de 43,3px de large et 28,8px de haut au centre. Je l'ai mesurée sur le rendu ×8. Ici, 301q est bien au-delà des coins : rien n'est transparent, tout est lavande autour du cœur.

### 6. 49%/72% : la porte

Sur le `body`, `--p` vaut `49%/72%` : la valeur est `49%/72% 56% 0`.

- La découpe est de 49 % de chaque côté. Les coins font 88,2 × 58,75px. Entre eux restent une colonne de 3,6px et une ligne de 2,4px.
- Les largeurs sont 72 % de la hauteur en haut (86,33px), 56 % de la largeur sur les côtés (100,8px chacun), 0 en bas.

Les côtés ne tiennent pas : 201,6px pour une boîte de 180. Tout est multiplié par 180 / 201,6. Les côtés font alors exactement 90px, la moitié de la boîte chacun. Le haut fait 77,08px. Ensuite :

- Les deux coins du haut sont étirés de 88,2 × 58,75 à 90 × 77,08. Ils contiennent le haut de l'ellipse brune : l'arche de la porte. Elle commence en y = 130.
- Les bords gauche et droit reçoivent la ligne de 2,4px du milieu de l'image, étirée sur 42,82px de haut, de y = 147,17 à 190. Cette ligne passe au milieu de l'ellipse : elle donne les côtés droits de la porte, jusqu'en bas du mur.
- La colonne de 3,6px entre les coins n'a pas de place (le bord du haut fait 0px de large). Elle disparaît, et les deux moitiés de la porte se rejoignent. Sur le rendu, la porte va de x = 180 à 220.

Les coins et le bord du bas font 0px de haut : la moitié basse de l'ellipse n'est jamais dessinée.

## Notes de golf

- Une seule règle pour deux boîtes. `background` et la source de la `border-image` ne sont écrits qu'une fois. Seules la découpe et la largeur du haut changent, avec `var(--p,1 5/152%)` : la propriété personnalisée n'existe que sur le `body`, et `html` prend la valeur de repli.
- `56%` sur les côtés est trop large sur les deux boîtes, et c'est voulu. Sur le `body`, le navigateur réduit les côtés à 90px pile chacun. Sur `html`, c'est la largeur du haut, 152 %, qui impose la réduction : la bande du haut prend toute la hauteur, 105px, et les côtés 149,58px.
- Les bords en biais du sol viennent d'un coin de 5 × 1px du dégradé. Pas de `clip-path`, pas de rotation.
- `#0000` est le transparent court. `#DBDDFF 0` fait commencer le lavande là où le brun s'arrête.
- `301q` fait 284,41px : juste à l'intérieur du rayon de 287,08px de `html`, pour que la partie transparente ne soit qu'une petite pointe dans chaque coin.
- `56%0` n'a pas besoin d'espace : le `%` termine le premier nombre. Pareil pour `)var(`, `)56%`, `50%-3-5` et `-32%113`.
- Les marges sans unité marchent en mode quirks : `-3`, `-5`, `113`, `115`.
- `<style>` n'est jamais fermé, et les deux dernières accolades sont omises.
