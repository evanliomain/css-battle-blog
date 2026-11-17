---
title: "Body entaillé, html arrondi : une feuille en 117 caractères"
ref: 2026-08-01
permalink: /fr/2026/08/01/body-entaille-html-arrondi/
description: "Comment une seule règle donne à html et à body la même bordure épaisse et les mêmes coins arrondis pour la cible CSS Battle du 1er août 2026, et comment corner-shape:notch fait de body deux carrés qui se chevauchent."
target: /assets/targets/2026-08-01.png
target_url: https://cssbattle.dev/play/Zbbue9b0vZdg6WFTCh4C
colors: ["#065840", "#c3c3a8"]
player: emohdaziz
chars: 117
score: 731.15
match: 100
code: |
  <style>*{background:#065840;border:70Q solid#C3C3A8;border-radius:0 53Q;margin:76 126;*{margin:-76;corner-shape:notch
---

La cible du 1er août est une forme crème sur fond vert foncé : deux carrés qui se chevauchent, l'un en haut à gauche, l'autre en bas à droite, avec un morceau arrondi dans chacune des deux marches entre eux. On dirait une feuille. Mohamed Ali donne à html et à body la même bordure de 66px et les deux mêmes coins arrondis en une seule règle. Puis `corner-shape:notch` change les coins arrondis de body en entailles carrées, et les coins arrondis de html se voient dans ces entailles.

Cochez **Couleurs pédagogiques** pour distinguer la bordure de html de celle de body, et voir le fond de body avant que les entailles le cachent.

{% include animations/2026-08-01.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                           /* tous les éléments : html et body sont ceux qui s'affichent */
  background: #065840;        /* le vert de html couvre le canevas ; celui de body reste sous sa bordure */
  border: 70Q solid#C3C3A8;   /* 66,14px, tracée à 66px */
  border-radius: 0 53Q;       /* coins haut droit et bas gauche : 50,08px */
  margin: 76 126;             /* html : un carré de 148 × 148 en (126 ; 76) */
  * {                         /* les descendants de html : body est le seul visible */
    margin: -76;              /* body : 168 × 168 en (116 ; 66) */
    corner-shape: notch       /* les deux coins arrondis de body deviennent des entailles carrées */
```

## Comment ça marche

### 1. Une seule règle pour tous les éléments

`*` vise tous les éléments de la page : html, head, style et body. head et style ne s'affichent pas, donc la règle se voit sur deux boîtes, html et body. Elles reçoivent le même fond, la même bordure et les mêmes coins.

Le `*{` imbriqué ne vise que les descendants de html. Parmi eux, body est la seule boîte à l'écran. Il reçoit sa propre marge et la forme des coins.

### 2. html est un carré de 148 × 148

Il n'y a pas de doctype, donc la page est en mode quirks, et `76 126` se lit en px. En mode quirks, html remplit les 400 × 300 de la page, moins ses marges :

- largeur : 400 − 2 × 126 = 148, de x = 126 à 274 ;
- hauteur : 300 − 2 × 76 = 148, de y = 76 à 224.

Le fond de html, `#065840`, est peint sur tout le canevas : c'est toujours le cas pour le fond de la racine.

### 3. Une bordure de 66px et deux coins arrondis

`70Q`, c'est 70 quarts de millimètre. 1Q = 0,945px, donc 66,14px. Chrome trace la bordure sur 66px : `66px` à la place donne la même image. Il reste à html une boîte de contenu de 148 − 2 × 66 = 16 de côté, en (192 ; 142).

`border-radius:0 53Q` a deux valeurs. La première vaut pour les coins haut gauche et bas droit : 0, carrés. La seconde vaut pour les coins haut droit et bas gauche : 53 × 0,945 = 50,08px. La bordure est plus épaisse que le rayon, donc les coins intérieurs de l'anneau restent carrés.

### 4. body est un carré de 168 × 168

body se place dans la boîte de contenu de html, 16 × 16 en (192 ; 142). `margin:-76` le tire de 76px de chaque côté : 16 + 2 × 76 = 168 de côté, de (116 ; 66) à (284 ; 234). C'est la boîte de html avec 10px de plus de chaque côté.

body a la même bordure de 66px et les deux mêmes coins arrondis. Sans la déclaration suivante, sa bordure laisserait au milieu un trou de 36 × 36, en (182 ; 132), où se verrait le fond vert de body.

### 5. Deux entailles remplissent body

`corner-shape:notch` change la façon de tracer les coins arrondis. Un coin arrondi de 50,08px devient une entaille carrée de 50,08px de côté. body est alors un carré de 168px sans ses coins haut droit et bas gauche. Cela fait deux carrés de 117,92px de côté, décalés de 50,08px : l'un de (116 ; 66) à (233,92 ; 183,92), l'autre de (166,08 ; 116,08) à (284 ; 234).

Avec `corner-shape`, Chrome trace le bord intérieur de la bordure comme la forme extérieure rétrécie de l'épaisseur. Décalée de 66px vers l'intérieur, l'entaille du haut à droite retire tout ce qui est à droite de x = 167,92 et au-dessus de y = 182,08. Cela couvre déjà tout l'intérieur de 36 × 36. Il ne reste rien dans la bordure, donc la bordure remplit tout body. Le fond vert de body est toujours là, sous la bordure, mais il ne se voit jamais.

### 6. Les coins de html remplissent les marches

`corner-shape` n'est que dans la règle imbriquée, donc html garde ses coins arrondis. html est sous body, et plus petit de 10px de chaque côté. Dans chaque entaille de body, un morceau du coin arrondi de html se voit :

- en haut à droite : de (234 ; 77) sur le bord gauche de l'entaille à (273 ; 116) sur son bord bas ;
- en bas à gauche : de (127 ; 184) sur le bord haut de l'entaille à (166 ; 223) sur son bord droit.

Ces deux morceaux sont les parties arrondies de la feuille.

## Notes de golf

- Une seule règle `*` habille html et body ensemble : le fond, la bordure et les coins ne s'écrivent qu'une fois. Le `*{` imbriqué tient en 2 caractères. `body{` à sa place donne la même image, avec 3 caractères de plus. Avec `}*{` au lieu de `;*{`, à longueur égale, html reçoit lui aussi `margin:-76` et les entailles, et 27 244 pixels changent.
- `70Q` tient en 3 caractères pour une bordure que Chrome trace sur 66px. `66px` donne la même image en 4. Un `66` nu ne marche pas dans la forme raccourcie `border` : Chrome ignore toute la déclaration, et 25 414 pixels changent.
- `53Q` fait 50,08px en 3 caractères. `50px` en fait 4, et déplace un peu les deux arcs de html : 32 pixels changent.
- `border-radius:0 53Q` règle les quatre coins avec deux valeurs : les deux coins carrés, puis les deux coins arrondis.
- Dans `solid#C3C3A8`, le `#` commence une nouvelle valeur, donc aucune espace n'est nécessaire devant.
- `margin` accepte les nombres nus en mode quirks : `76 126` et `-76` n'ont pas besoin d'unité.
- `corner-shape` est dans la règle imbriquée exprès. Déplacé dans la règle extérieure, après `margin:76 126` (à longueur égale), il entaille aussi html : les deux morceaux arrondis disparaissent et 2 190 pixels changent. Sans `corner-shape` du tout, body garde ses coins arrondis et son trou de 36 × 36, et 3 215 pixels changent.
- Rien n'est fermé : les deux `*{` restent ouverts, et il n'y a pas de `</style>`. Avec `}}` à la fin, le code fait 119 caractères et l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, 698 pixels diffèrent de la cible de plus de 8 sur un canal. Tous sont à 6 pixels au plus d'un bord de la forme, et les bords sont aux mêmes endroits. Le long de chaque bord, les pixels de la cible varient de couleur : à y = 70, autour du bord gauche en x = 116, la cible a (4, 82, 56), (0, 92, 55), (199, 191, 172) et (191, 192, 160), là où mon rendu a des aplats (6, 88, 64) et (195, 195, 168). Loin des bords, les couleurs diffèrent de 1 au plus. Le juge de CSS Battle donne au code 100 % de correspondance.
