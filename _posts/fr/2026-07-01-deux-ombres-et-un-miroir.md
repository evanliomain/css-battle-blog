---
title: "Deux ombres et un miroir : deux pétales en 133 caractères"
ref: 2026-07-01
permalink: /fr/2026/07/01/deux-ombres-et-un-miroir/
description: "Comment deux boîtes vides garées hors du canevas, deux ombres et -webkit-box-reflect dessinent un pétale bleu nuit et son reflet doré, dans la cible CSS Battle du 1er juillet 2026."
target: /assets/targets/2026-07-01.png
target_url: https://cssbattle.dev/play/yvpHijyS5DDPWOUnCQm8
colors: ["#394257", "#d9bb61"]
player: emohdaziz
chars: 133
score: 712.6
match: 100
code: |
  <style>*{border-radius:0 9in;margin:90-62 150 402;box-shadow:-2in 0#394257,224q 0#d9bb61;-webkit-box-reflect:left;*{margin:60-60-60 0
---

La cible du 1er juillet montre deux pétales sur fond blanc : un doré à gauche et un bleu nuit à droite, en miroir l'un de l'autre. Mohamed Ali ne place aucune boîte sur le canevas. html et body sont deux boîtes vides aux coins arrondis, juste à droite du canevas. Une ombre bleu nuit les copie sur le canevas. Une ombre dorée les copie plus loin à droite, et `-webkit-box-reflect` ramène cette copie dorée, retournée, sur la moitié gauche.

Utilisez la **Vue large** pour voir les boîtes et les copies dorées hors du canevas, et les **Couleurs pédagogiques** pour savoir de quelle boîte vient chaque copie.

{% include animations/2026-07-01.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* html, head, style et body */
  border-radius: 0 9in;      /* haut droit et bas gauche : 864px, réduits à 60px */
  margin: 90-62 150 402;     /* html : 60 × 120 en x = 402, hors du canevas */
  box-shadow:
    -2in 0#394257,           /* −192px : le pétale bleu nuit, dès x = 210 */
    224q 0#d9bb61;           /* +211,65px : deux copies dorées, dès x = 613,65 */
  -webkit-box-reflect: left; /* reflet collé au bord gauche, x = 402 */
  * {                        /* head, style et body */
    margin: 60-60-60 0       /* body : 120 × 60 en (402, 150) */
```

## Comment ça marche

### 1. La page

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité vaut des px dans `margin`. Le `<style>` n'est jamais fermé, pas plus que les deux règles.

`*` vise tous les éléments : html, head, style et body. head et style sont masqués : seuls html et body comptent. Le `*{` imbriqué veut dire `* *` : tout élément situé dans un autre. Ce sont head, style et body, pas html. Les deux sélecteurs ont la même spécificité, et l'imbriqué vient après. body prend donc sa marge dans la règle imbriquée, et html garde `margin:90-62 150 402`. Tout le reste s'applique aux deux.

### 2. html, une boîte vide hors du canevas

`margin:90-62 150 402` se lit 90 en haut, −62 à droite, 150 en bas et 402 à gauche. `90-62` fait deux nombres : le signe moins commence le second. html fait 400 − 402 + 62 = 60px de large, de x = 402 à 462. C'est juste à droite du canevas. html n'a pas de fond : la boîte elle-même ne peint rien.

En mode quirks, html remplit la hauteur de la fenêtre moins ses marges : 300 − 90 − 150 = 60px. getBoundingClientRect donne plus : 120px, de y = 90 à 210. Dans mon Chrome, la marge du haut de body s'ajoute à la hauteur de html. Avec une marge de 30px en haut de body, html fait 90px de haut, et avec 60px, il fait 120px.

### 3. body, deux fois plus large

La règle imbriquée donne à body `margin:60-60-60 0`. body commence 60px sous le haut de html, en y = 150. Sa marge droite vaut −60 : il dépasse de html de 60px. Il fait 60 + 60 = 120px de large, de x = 402 à 522.

En mode quirks, body s'étire pour remplir html. Sa hauteur vaut les 60px de html moins ses deux marges : 60 − 60 − (−60) = 60px. getBoundingClientRect donne à body 120 × 60 en (402, 150). Son bas, y = 210, est aussi le bas de html.

### 4. Deux coins, réduits à 60px

`border-radius:0 9in` donne 0 aux coins haut gauche et bas droit, et 9in aux coins haut droit et bas gauche. 1in vaut 96px, donc 9in vaut 864px.

Quand deux rayons d'un même côté dépassent la longueur de ce côté, le navigateur réduit tous les rayons du même facteur, jusqu'à ce qu'ils tiennent. Le côté haut de html fait 60px : ses rayons passent à 60px. Le côté droit de body fait 60px de haut : ses rayons passent aussi à 60px. Chaque boîte reçoit un quart de cercle de 60px de rayon en haut à droite et en bas à gauche. `0 60px` donne la même image.

Comme html fait 60 × 120, ses deux quarts de cercle ne se touchent pas : son côté gauche reste droit de y = 90 à 150.

### 5. L'ombre bleu nuit est le pétale de droite

Une ombre sans flou ni étalement est une copie de la forme de la boîte, coins arrondis compris. Ici, les deux boîtes la peignent, puisque la règle s'applique aux deux.

`-2in 0 #394257` déplace les copies de 192px vers la gauche. La copie de html va de x = 210 à 270 et de y = 90 à 210. Celle de body va de x = 210 à 330 et de y = 150 à 210. Elles se chevauchent : ensemble, elles font le pétale bleu nuit. Le haut est la copie de html, avec son coin haut droit arrondi. Le bas est la copie de body, avec son propre coin haut droit arrondi, 60px plus à droite. Les deux copies ont le même arc en bas à gauche, centré sur (270, 150).

### 6. L'ombre dorée part de l'autre côté

`224q` vaut 224 quarts de millimètre, 56mm : 211,65px. `224q 0 #d9bb61` déplace des copies dorées des deux boîtes vers la droite. La copie de html va de x = 613,65 à 673,65, et celle de body jusqu'à 733,65. Les deux sont loin hors du canevas.

### 7. Le miroir

`-webkit-box-reflect:left` ajoute un reflet de l'élément, collé à son bord gauche. Le reflet montre tout ce que l'élément peint : ses ombres sont reflétées aussi. Sans lui, il ne reste que le pétale bleu nuit.

html et body en ont chacun un, et tous deux commencent en x = 402. Ils se reflètent donc autour de la même ligne : un point en x arrive en 804 − x.

- La copie dorée de html, de x = 613,65 à 673,65, arrive de x = 130,35 à 190,35.
- La copie dorée de body, de x = 613,65 à 733,65, arrive de x = 70,35 à 190,35.

Ensemble, retournées, elles font le pétale doré : ses coins arrondis sont maintenant en haut à gauche. Les copies bleu nuit sont reflétées aussi, mais elles tombent de x = 474 à 594, hors du canevas. Les reflets des boîtes elles-mêmes, de x = 282 à 402, sont vides.

L'écart entre les pétales va de x = 190,35 à 210 : 19,65px.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- `*` et un `*` imbriqué donnent aux deux boîtes le même rayon, les mêmes ombres et le même reflet, avec quand même une marge chacune. `html,body{…body{…` donne la même image en 144 caractères.
- Tout rayon de 60px ou plus donne les mêmes coins : `9in` tient en 3 caractères. `0 60px` donne la même image en 134. Un nombre sans unité ne marche pas dans `border-radius` : avec `0 60` (132 caractères), la déclaration est ignorée. Les coins restent carrés, et 4 875 pixels changent.
- `-2in` vaut −192px en 4 caractères. `-192px` donne la même image en 135. Avec `-192` (133 caractères), tout le `box-shadow` est ignoré : les deux pétales disparaissent, et 17 276 pixels changent.
- `224q` vaut 211,65px en 4 caractères. `212px` coûterait un caractère de plus.
- Un signe moins ou un `#` commence une nouvelle valeur, donc pas besoin d'espace avant : `90-62`, `60-60-60`, `0#394257`. Avec toutes ces espaces, `90 -62`, `60 -60 -60`, `0 #394257` et `0 #d9bb61`, la même image prend 138 caractères.
- La forme du pétale n'est écrite qu'une fois, dans les boîtes. Les deux ombres la peignent deux fois, et le miroir met la copie dorée en place, retournée.
- Rien n'est fermé. `}}</style>` à la fin donne 143 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 614 pixels, avec la même règle que dans les notes de golf. 60 d'entre eux forment la colonne x = 190, de y = 90 à 149, sur le bord droit rectiligne du pétale doré. Mon rendu y est doré pâle, (241, 229, 195), et la cible est blanche. `224q` vaut 211,65px, pas un nombre entier de pixels : le bord reflété tombe en x = 190,35, et cette colonne est mélangée. Avec `212px 0#d9bb61` (134 caractères), cette colonne est identique à la cible. Les 554 autres pixels suivent les courbes des deux pétales : mon anticrénelage y diffère un peu de celui de la cible. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
