---
title: "Un padding, deux rôles : deux zigzags en 134 caractères"
ref: 2026-08-08
permalink: /fr/2026/08/08/un-padding-deux-roles/
description: "Comment un seul padding, partagé par body et quatre img vides, et trois ombres mesurées en ch dessinent les deux zigzags blancs et roses de la cible CSS Battle du 8 août 2026."
target: /assets/targets/2026-08-08.png
target_url: https://cssbattle.dev/play/QzsqG049RL4V9DItHXt7
colors: ["#2e8da6", "#e5969e", "#FFF1F1"]
player: cubachatou
chars: 134
score: 711.53
match: 100
code: |
  <img><img><img><img><style>* *{background:#2E8DA6;color:FFF1F1;padding:20 28;*{margin:-8-24 45%80;box-shadow:7ch 0,-7ch 0,0 5ch#E5969E
---

La cible du 8 août est bleu-vert. Deux rangées identiques la traversent : trois rectangles blancs en haut, et deux roses une marche plus bas, entre eux, comme un zigzag. Vegy utilise quatre img vides qui restent invisibles. Le même padding place le contenu de body et donne à chaque img sa taille de 56 × 40, et trois ombres, juste de la taille d'une img, dessinent autour d'elle les rectangles blancs et roses.

Cochez **Couleurs pédagogiques** pour voir les img invisibles et distinguer les trois ombres, et choisissez la **Vue large** pour voir body descendre sous le canevas.

{% include animations/2026-08-08.html lang=page.lang %}

## Le code, aéré

```css
<img><img><img><img>          /* quatre img vides, placées dans body */
<style>
* * {                         /* head, body, les quatre img, style */
  background: #2E8DA6;        /* le fond de body : tout le canevas */
  color: FFF1F1;              /* hexa sans # : la couleur des ombres */
  padding: 20 28;             /* body : contenu en (36 ; 28) ; img : 56 × 40 */
  * {                         /* les quatre img et style */
    margin: -8-24 45%80;      /* deux img par ligne, en x = 116 et 228 */
    box-shadow:
      7ch 0,                  /* copie blanche à droite : 7ch = 56px */
      -7ch 0,                 /* copie blanche à gauche */
      0 5ch#E5969E            /* copie rose dessous : 5ch = 40px */
```

## Comment ça marche

### 1. Deux niveaux de `*`

Il n'y a ni balise html, ni head, ni body dans le code : Chrome les ajoute. Une `<img>` ne peut pas aller dans head, donc Chrome ouvre body à cet endroit, et les quatre img et l'élément style se retrouvent tous dans body. J'ai vérifié : le parent de style est body.

`* *` vise tout élément placé dans un autre : head, body, les quatre img et style. C'est tous sauf html. Le `*{` imbriqué veut dire `* * *` : les éléments dans body (head est vide), donc les quatre img et style. head et style ne s'affichent pas : seuls body et les quatre img comptent.

Il n'y a pas de doctype, donc la page est en mode quirks. Un nombre sans unité, comme `20 28`, est en px. Avec `<!doctype html>` devant, la couleur, le padding et les marges sont tous ignorés : 22 400 pixels changent, et il ne reste que le bleu-vert.

### 2. Le canevas : le fond de body

Le premier niveau donne `background:#2E8DA6` à body (et à head, aux img et à style). html n'en reçoit pas : getComputedStyle donne un fond transparent.

Quand html n'a pas de fond, le navigateur peint le fond de body sur tout le canevas, et non dans la boîte de body. C'est le bleu-vert partout. Sans `background:#2E8DA6`, 97 600 pixels changent : tous les pixels bleu-vert deviennent blancs.

Les img reçoivent le même fond bleu-vert. C'est la couleur du canevas : elles sont invisibles. J'ai vérifié : avec le fond sur body seulement, le rendu est le même, au pixel près.

### 3. Un padding, deux rôles

`padding:20 28` va lui aussi à body et aux img, et il ne fait pas le même travail chez les deux.

body garde sa marge par défaut de 8px. Avec le padding, son contenu commence en x = 8 + 28 = 36 et y = 8 + 20 = 28. body fait 400 − 2 × 8 = 384px de large, donc son contenu fait 384 − 2 × 28 = 328px de large.

Une `<img>` sans source n'a rien à montrer : son contenu fait 0 × 0. Avec le padding, chaque img fait 2 × 28 = 56px de large et 2 × 20 = 40px de haut. Sans marges, les quatre se suivent à partir de x = 36 : getBoundingClientRect donne x = 36, 92, 148 et 204, toutes en y = 28, toutes en 56 × 40.

Sans le padding, 22 400 pixels changent : tous les rectangles blancs et roses disparaissent.

### 4. Deux img par ligne

`margin:-8-24 45%80`, c'est −8px en haut, −24px à droite, 45 % en bas et 80px à gauche.

En largeur, chaque img prend 80 + 56 − 24 = 112px de la ligne :

- la première commence en 36 + 80 = 116 ;
- la deuxième en 116 + 56 − 24 + 80 = 228 ;
- une troisième demanderait 3 × 112 = 336px, plus que les 328px du contenu de body : elle passe à la ligne.

Il y a donc deux img par ligne, et deux lignes.

Une marge en pourcentage est une part de la largeur du bloc conteneur, ici le contenu de body : 45 % de 328, c'est 147,6, et getComputedStyle donne 147,594px. La première ligne commence en y = 28, et la marge du haut de −8px met les img en y = 20. Une ligne fait −8 + 40 + 147,594 = 179,594px de haut, donc la seconde rangée d'img commence en 20 + 179,594 = 199,594. getBoundingClientRect donne (116 ; 20), (228 ; 20), (116 ; 199,594) et (228 ; 199,594). Chrome peint la seconde rangée en y = 200, pile là où la cible la place.

Les marges comptent. Sans elles, 27 808 pixels changent. Avec `0` à la place de `-24`, la deuxième img commence en 252, et 9 600 pixels changent. Avec `0` à la place de `-8`, les deux rangées descendent de 8px, et 13 440 pixels changent.

body fait 20 + 2 × 179,594 + 20 = 399,188px de haut, de y = 8 à 407,188 : il descend bien sous le canevas, mais rien n'y est dessiné.

### 5. Une copie blanche de chaque côté

`box-shadow:7ch 0,-7ch 0` donne à chaque img deux copies de sa boîte, sans flou ni étalement. Dans mon Chrome, la police est Times 16px et 1ch, la largeur du « 0 », vaut 8px : getComputedStyle donne les ombres en `56px 0` et `-56px 0`. 7ch = 56px, c'est juste la largeur d'une img : une copie se colle à sa droite, l'autre à sa gauche.

Les ombres n'ont pas de couleur : elles prennent la `color` de l'élément. C'est `FFF1F1`, sans `#` : en mode quirks, Chrome accepte une couleur hexadécimale sans son `#` pour `color`. Avec un doctype, getComputedStyle donne du noir. Sans `color:FFF1F1`, 13 440 pixels changent : les rectangles blancs deviennent noirs.

Sur chaque rangée, la copie droite de la première img et la copie gauche de la deuxième tombent au même endroit, de x = 172 à 228. Chaque rangée a donc trois rectangles blancs : de 60 à 116, de 172 à 228 et de 284 à 340.

### 6. La copie rose

La troisième ombre, `0 5ch#E5969E`, a sa propre couleur. 5ch = 40px, c'est juste la hauteur d'une img : la copie rose se colle dessous, de y = 60 à 100 sur la première rangée, et de 240 à 280 sur la seconde.

Les img elles-mêmes restent invisibles. Entre les rectangles blancs, au-dessus des roses, le bleu-vert qu'on voit est leur fond.

## Notes de golf

- Un seul `padding:20 28` sert à deux éléments : il décale le contenu de body et il donne leur taille aux img. La même règle donne sa couleur au canevas.
- `* *` laisse html de côté. Avec `*{`, html reçoit lui aussi toute la règle, la mise en page bouge, et 40 320 pixels changent.
- `7ch` et `5ch` font 3 caractères chacun. Avec `56px` aux deux endroits, le code fait 136 caractères ; avec `40px` à la place de `5ch`, 135. Le rendu est le même.
- `45%80` n'a pas besoin d'espace : le `%` termine le nombre. `148` donne le même rendu, mais `148 80` demande l'espace : 135 caractères. Avec `147`, 560 pixels changent.
- `-8-24` n'a pas besoin d'espace non plus : le signe moins commence un nouveau nombre. `-8 -24 45% 80` donne le même rendu, en 136 caractères.
- `FFF1F1` économise un `#`. Le `#` reste dans `background:#2E8DA6` : avec `background:2E8DA6`, le canevas devient blanc dans mon Chrome. Dans `0 5ch#E5969E`, l'espace avant le `#` saute, mais le `#` reste : sans lui, tout le box-shadow est ignoré et 22 400 pixels changent.
- Une `<img>` est une boîte de 0 × 0 gratuite : 5 caractères, sans balise fermante. Le padding seul lui donne sa taille.
- Deux accolades, `* *{` et `*{`, restent ouvertes, et il n'y a pas de `</style>`. Avec `}}`, le code fait 136 caractères ; avec `}}</style>`, 144. Le rendu est le même.
