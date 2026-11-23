---
title: "Un cercle sur le body, une ellipse sur html : six quarts de disque en 130 caractères"
lang: fr
ref: 2026-11-22
permalink: /fr/2026/11/22/cercle-sur-le-body-ellipse-sur-html/
description: "Comment un même fond sur html et le body, un dégradé radial dimensionné en pourcentage et un voile presque transparent dessinent la cible CSS Battle du 22 novembre 2026 : six quarts de disque, jaunes et bleus, sur violet foncé."
target: /assets/targets/2026-11-22.png
target_url: https://cssbattle.dev/play/NeNTagiTiZfRt8dCPIqd
colors: ["#7f61", "#1d025e", "#3fb1ce", "#fd9"]
player: benjamintordjman
chars: 130
score: 715.87
match: 100
code: |
  <style>*{background:radial-gradient(2%3px at 76q+0,#7f61 74q,#1D025E)33em 45lh/100%32%,image(#3fb1ce)9ch space#fd9;*{margin:25 125
---

La cible du 22 novembre montre six quarts de disque sur un fond violet foncé, en deux colonnes : trois jaune pâle à gauche, trois turquoise à droite, séparés par un couloir de 10 px. Benjamin Tordjman donne à `html` et au `body` le même fond à deux couches. Sur le `body`, la couche du haut dessine des cercles. Sur `html`, la même couche dessine des ellipses plates, qui finissent cachées sous le `body`. Un voile presque transparent corrige ensuite deux couleurs courtes d'un coup.

Les **couleurs pédagogiques** montrent le voile en blanc et les ellipses cachées de `html` en orange.

{% include animations/2026-11-22.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                      /* html et le body */
  background:
    radial-gradient(2% 3px at 76Q+0,     /* 3px × 3px sur le body (un cercle), 8px × 3px sur html */
      #7f61 74Q,                         /* un voile vert à 6,7 %, jusqu'à 69,92px */
      #1d025e)                           /* violet foncé au-delà */
    33em 45lh                            /* position : 528px 810px */
    / 100% 32%,                          /* tuile : la largeur de la boîte, 32 % de sa hauteur */
    image(#3fb1ce) 9ch space             /* une copie bleue, à 72px du bord gauche */
    #fd9;                                /* couleur de fond : jaune */
  * {                                    /* le body (head et style sont cachés) */
    margin: 25 125;
  }
}
</style>
```

## Comment ça marche

### 1. Deux boîtes, un seul fond

`*` vise tous les éléments. Le `*` imbriqué vise les éléments placés dans un autre : le `body`, mais pas `html`. Les deux reçoivent donc le fond, et seul le `body` reçoit les marges. En mode quirks, `25 125` sont des px.

`html` couvre le canevas de 400 × 300. En mode quirks, le `body` remplit la fenêtre moins ses marges : je l'ai mesuré en x = 125, y = 25, 150 de large et 250 de haut. Comme `html` a son propre fond, le `body` garde le sien sur sa boîte. Il ne part pas au canevas.

### 2. La couche du bas : du jaune, puis du bleu

`image(#3fb1ce)` est une image unie sans taille propre : elle est donc grande comme la boîte, 150 × 250 sur le `body`. `space` ne dessine que les copies qui tiennent en entier : une seule tient. La position `9ch` vaut 72px (un `ch` fait 8px ici) : la copie bleue commence à 72px du bord gauche. À sa gauche, on voit la couleur de fond `#fd9`.

Sur le `body`, ça donne du jaune de x = 125 à 197 et du bleu de 197 à 275. La limite entre les deux couleurs tombe dans le couloir entre les colonnes : elle ne se voit jamais.

### 3. La couche du haut : un cercle par tuile

La taille de la tuile est `100%32%` : sur le `body`, 150 × 80.

`2%3px` est la taille de la forme du dégradé : 2 % de la largeur de la tuile, et 3px de haut. Sur le `body`, 2 % de 150 font 3px : une forme de 3px × 3px est un cercle. Les arrêts de couleur sont des longueurs, ce sont eux qui fixent la vraie taille. `#7f61` va jusqu'à 74q = 69,92px, et `#1D025E` commence là, sans transition. Chaque tuile contient donc un cercle de 69,92 de rayon, presque transparent dedans et violet foncé autour.

`at 76q+0` est le centre : x = 76q = 71,80px, y = 0. Le signe `+` sépare les deux nombres, comme le ferait une espace. Le centre est sur le bord haut de la tuile : seule la moitié basse du cercle est dans la tuile.

### 4. `33em 45lh` : placer les cercles

La position vaut 33em = 528px et 45lh = 810px (16px et 18px, mesurés). Les tuiles se répètent dans tous les sens : seul le reste compte.

- 528 = 3 × 150 + 78 : une tuile commence en x = 125 + 78 = 203. Son cercle est centré en 203 + 71,80 = 274,80, et celui de la tuile d'avant en 124,80. Les deux sont sur les bords du `body`.
- 810 = 10 × 80 + 10 : les rangées commencent en y = 25 + 10 = 35, 115 et 195.

Le `body` coupe ce qui dépasse : chaque demi-disque perd sa moitié extérieure. Il reste six quarts de disque. À gauche, de x = 125 à 194,72, ils sont posés sur le jaune. À droite, de 204,88 à 275, sur le bleu. Il reste un couloir de 10 px. La rangée du bas finit en y = 195 + 69,92 = 264,92, et le `body` en 275.

### 5. Sur `html`, le cercle devient une ellipse

`html` peint le même fond, et ce fond part au canevas. Mais les pourcentages se lisent maintenant sur la boîte de `html`, 400 × 300.

La forme fait alors 2 % de 400 = 8px de large, toujours 3px de haut. Ses arrêts restent à 69,92 sur la largeur : le cercle devient une ellipse de 69,92 × 26,22 (69,92 × 3 / 8). Les tuiles font 400 × 96 (32 % de 300). La même position donne d'autres restes : 528 = 400 + 128 et 810 = 8 × 96 + 42. Les ellipses sont centrées en x = 128 + 71,80 = 199,80, et en y = 42, 138 et 234.

Elles restent entre x = 130 et 270, et entre y = 42 et 261 : toutes sous le `body`, qui peint par-dessus. Partout ailleurs, les tuiles de `html` sont violet foncé. Le canevas est uni.

Voilà pourquoi la taille est `2%3px` et pas un simple cercle. J'ai essayé `1q` : les cercles de `html` dépassent alors au-dessus et au-dessous du `body`, et le rendu compte 3 138 pixels faux.

### 6. `#7f61` : un voile qui corrige deux couleurs

`#7f61`, c'est `#77ff66` à 17/255 d'opacité, environ 6,7 %. Il couvre l'intérieur de chaque cercle : il est donc posé sur les deux couleurs de la couche du bas.

- Sur `#fd9` (255, 221, 153), il donne (246, 223, 150), soit `#f6df96`.
- Sur `#3fb1ce` (63, 177, 206), il donne (67, 182, 199), soit `#43b6c7`.

Ce sont exactement les deux couleurs de la cible. Je l'ai vérifié sur le rendu : aucun pixel faux sur les aplats.

## Notes de golf

- Une seule règle `*` donne le fond à `html` et au `body`, et le `*` imbriqué donne les marges au seul `body`. Le fond est écrit une fois et sert deux fois.
- `2%3px` donne un cercle sur une boîte de 150px et une ellipse plate sur `html`, large de 400px. Une taille, deux formes, et celle en trop se cache toute seule.
- La même position, `33em 45lh`, fait deux choses. Sur le `body`, elle pose les cercles sur les bords (restes 78 et 10). Sur `html`, elle range les ellipses sous le `body` (restes 128 et 42). `em` et `lh` écrivent 528 et 810 en 4 caractères chacun.
- `#7f61` a la même longueur qu'un `#0000` tout transparent, mais il permet d'écrire le jaune `#fd9` au lieu de `#f6df96`. Avec `#0000` et les deux couleurs exactes, le code fait 3 caractères de plus.
- `image(#3fb1ce)9ch space#fd9` coupe la boîte en deux couleurs sans dégradé.
- `at 76q+0` : le signe remplace une espace. `100%32%` n'a pas besoin d'espace après `%`, et rien n'est fermé à la fin.
