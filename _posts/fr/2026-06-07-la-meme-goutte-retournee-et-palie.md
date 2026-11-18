---
title: "La même goutte, retournée et pâlie : un signe infini en 140 caractères"
ref: 2026-06-07
permalink: /fr/2026/06/07/la-meme-goutte-retournee-et-palie/
description: "Comment une seule règle dessine une goutte rouge sur html, et comment la règle imbriquée la reprend sur body, la retourne avec scale:-1 et la pâlit avec opacity, dans la cible CSS Battle du 7 juin 2026."
target: /assets/targets/2026-06-07.png
target_url: https://cssbattle.dev/play/X14Lci2CcNYSyhZeNlRY
colors: ["#f4dcbf", "#d24444", "#e28f81"]
player: to1ne
chars: 140
score: 705.33
match: 100
code: |
  <style>*{background:#f4dcbf;border:5ch solid#d24444;border-radius:50%50%50%0;margin:50 25%130 180;*{margin:40 40-120-120;scale:-1;opacity:.5
---

La cible du 7 juin est un signe infini penché sur fond beige : une boucle rouge en haut à droite et une boucle rose en bas à gauche, reliées par un carré rouge. to1ne dessine une goutte rouge sur html avec une seule règle. La règle imbriquée donne à body la même goutte, la fait tourner d'un demi-tour avec `scale:-1` et la rend à moitié transparente.

Utilisez les **Couleurs pédagogiques** pour distinguer body de html pendant qu'il bouge.

{% include animations/2026-06-07.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, head, style, body */
  background: #f4dcbf;           /* sur html : peint tout le canevas */
  border: 5ch solid#d24444;      /* 5ch = 40px */
  border-radius: 50%50%50%0;     /* 60px, coin du bas à gauche carré */
  margin: 50 25%130 180;         /* 25% de 400 = 100 */
  * {                            /* head, style, body */
    margin: 40 40-120-120;
    scale: -1;                   /* un demi-tour */
    opacity: .5;                 /* rose sur le beige, rouge sur le rouge */
```

## Comment ça marche

### 1. Les éléments

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, et un nombre seul comme `180` dans une marge est lu en px.

La page contient html, head, style et body. Le parseur ajoute un body vide à la fin. `*` vise les quatre, et head et style ne s'affichent pas. `*{*{…}}` est une règle imbriquée : `* *`, tout élément qui est dans un autre, donc head, style et body. Les deux règles ont la même spécificité, et l'imbriquée vient après : sa marge l'emporte sur body. Le fond, la bordure et l'arrondi ne viennent que de la règle du dehors : html et body les reçoivent tous les deux.

### 2. html, un carré

html reçoit `margin:50 25%130 180`. Une marge en % est une part de la largeur du parent : 25 % de 400 = 100. html fait 400 − 180 − 100 = 120 de large. En mode quirks, html s'étire sur la hauteur du canevas moins ses marges : 300 − 50 − 130 = 120. Je l'ai mesuré : 120 × 120 en (180, 50).

Un fond posé sur html est peint sur tout le canevas, pas seulement dans la boîte de html. `background:#f4dcbf` rend donc le canevas beige.

### 3. La goutte

`border:5ch solid#d24444` donne à html une bordure rouge. 1ch est la largeur d'un 0 dans la police par défaut, 8px : la bordure fait 40px. Je l'ai mesurée : 40px. Il reste à l'intérieur un trou de 40 × 40 en (220, 90). Il montre le canevas : du beige.

`border-radius:50%50%50%0` règle les quatre coins dans cet ordre : en haut à gauche, en haut à droite, en bas à droite, en bas à gauche. Les trois premiers reçoivent 50 % de 120 = 60, la moitié du côté : ils font une boucle ronde. Le dernier vaut 0, un coin carré. C'est la pointe de la goutte.

Le trou suit la bordure : chacun de ses coins a un rayon de 60 − 40 = 20, la moitié de son côté lui aussi. Il est rond, avec un coin carré en bas à gauche.

### 4. body, la même goutte

body reçoit le même fond, la même bordure et le même arrondi, et ses propres marges, `margin:40 40-120-120`. Il est placé dans le trou de 40 × 40 de html, en (220, 90).

- À gauche et à droite : 40 + 120 − 40 = 120 de large, à partir de x = 220 − 120 = 100.
- En haut et en bas : en mode quirks, body s'étire sur la hauteur intérieure de html moins ses propres marges : 40 − 40 + 120 = 120. Il commence en y = 90 + 40 = 130.

Je l'ai mesuré : 120 × 120 en (100, 130). C'est la même goutte rouge, pointe en bas à gauche, en (100, 250).

### 5. Le demi-tour

`scale:-1` retourne body sur les deux axes autour de son centre, (160, 190). Retourner les deux axes revient à faire un demi-tour. La boîte ne bouge pas : c'est un carré autour du même centre. Mais la pointe passe du bas à gauche au haut à droite, en (220, 130).

La pointe de html est en bas à gauche, en (180, 170). Les deux pointes sont des coins carrés d'une bordure de 40px : chacune remplit un carré de 40 × 40. Les deux carrés sont le même : de (180, 130) à (220, 170). C'est là que les deux boucles se rejoignent.

### 6. À moitié transparent

`opacity:.5` rend body, sa bordure et son fond, à moitié transparent.

- Sur le canevas beige, la moitié du rouge donne du rose : (226, 143, 129) dans mon rendu.
- Sur le rouge de html, un rouge à moitié sur du rouge reste rouge. Le carré commun reste rouge, comme la boucle du haut.
- Le fond beige de body ne remplit que son trou, de (140, 170) à (180, 210). Dessous, il y a le canevas beige : du beige à moitié sur du beige reste beige.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle `*` habille les deux boîtes. Écrit en deux règles, `html{background:#f4dcbf;border:5ch solid#d24444;border-radius:50%50%50%0;margin:50 25%130 180}body{border:5ch solid#d24444;border-radius:50%50%50%0;margin:40 40-120-120;scale:-1;opacity:.5`, le code fait 195 caractères, pour la même image.
- Le `*{` imbriqué atteint body en 2 caractères et ne change que ce qui diffère : la marge, le demi-tour et l'opacité.
- `opacity:.5` donne le rose à partir du même rouge, et garde le carré commun rouge. Avec `border-color:#e28f81` à sa place (150 caractères), le carré commun devient rose : 1 600 pixels changent, tout le carré de 40 × 40.
- `scale:-1` fait un demi-tour en 8 caractères. `rotate:180deg` donne la même image en 145 caractères. Sans `scale:-1` (131 caractères), la pointe de body et le coin carré de son trou restent en bas à gauche : 1 054 pixels changent.
- `5ch` vaut 40px en 3 caractères. `40px` donne la même image en 141 caractères. `border` n'accepte pas de nombre seul, même en mode quirks : avec `40` (139 caractères), toute la déclaration `border` est rejetée et les deux boucles disparaissent. 20 217 pixels changent.
- `25%` vaut 100px, la même longueur que `100`, mais il n'y a pas d'espace à mettre après `%` : `25%130`. `50 100 130 180` donne la même image en 141 caractères.
- `50%50%50%0` se passe d'espaces pour la même raison. `50% 50% 50% 0` donne la même image en 143 caractères.
- `.5` laisse tomber le zéro de tête. `0.5` donne la même image en 141 caractères.
- Pas d'espace avant un `#` ou un signe moins : `solid#d24444`, `40-120-120`.
- Les accolades fermantes et les balises de fin sont omises. La fin du code les ferme.

## Si vous l'essayez chez vous

L'image cible est un JPEG. Dans mon Chrome, mon rendu du code officiel en diffère sur presque tous les pixels, de 1 pour la plupart : seuls 7 pixels sont identiques. Le beige vaut (244, 221, 190) dans la cible et (244, 220, 191) dans mon rendu. Avec la règle des notes de golf, 2 759 pixels diffèrent, de 106 au plus. Ils sont tous à moins de 9px d'un bord des boucles, et 2 454 à moins de 3px. Le juge de CSS Battle donne au code 100 % de correspondance.
