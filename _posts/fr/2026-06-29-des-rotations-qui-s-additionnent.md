---
title: "Des rotations qui s'additionnent : un sablier en 125 caractères"
ref: 2026-06-29
permalink: /fr/2026/06/29/des-rotations-qui-s-additionnent/
description: "Comment un seul offset:ray(45deg) centre html, body et un p et tourne chacun de 45° de plus que son parent, pour que trois bordures corail dessinent un X entre deux barres, dans la cible CSS Battle du 29 juin 2026."
target: /assets/targets/2026-06-29.png
target_url: https://cssbattle.dev/play/U6GK7X9GVm5KHz4RFhdZ
colors: ["#ed736e", "#161e44"]
player: eguiluz
chars: 125
score: 721.52
match: 100
code: |
  <p><style>*{border:27Q solid#ed736e;width:0;height:150;+*{background:#161e44;padding:35 50;border-width:0 50}offset:ray(45deg
---

La cible du 29 juin est un sablier corail sur fond bleu nuit : deux grosses barres horizontales, reliées par un grand X, avec deux petits triangles bleu nuit là où le X se croise. David Eguiluz le dessine avec trois bordures, sur html, body et un p. Un seul `offset:ray(45deg)` place chaque boîte au centre et la tourne de −45° dans son parent. Les rotations s'additionnent : −45° pour html, −90° pour body, −135° pour p.

Utilisez les **Couleurs pédagogiques** pour distinguer les trois éléments, qui ont tous la même bordure corail.

{% include animations/2026-06-29.html lang=page.lang %}

## Le code, aéré

```css
<p><style>
* {                           /* html, head, body, p et style */
  border: 27Q solid#ed736e;   /* 25,51px, dessinés 25px */
  width: 0;
  height: 150;                /* html et p : barres de 50 × 200 */
  +* {                        /* body, juste après head */
    background: #161e44;      /* passe sur le canevas */
    padding: 35 50;
    border-width: 0 50        /* body : 200 × 220, bordures à gauche et à droite */
  }
  offset: ray(45deg           /* centré, tourné de −45° dans le parent */
```

## Comment ça marche

### 1. La page

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité vaut des px dans `height`, `padding` et `border-width`.

`<p>` ouvre body, et le `<style>` atterrit dans le p. Le style n'est jamais fermé, pas plus que ses règles. Les éléments sont donc html, head, body, p et style. head et style sont masqués : seuls html, body et p se voient.

`*` les vise tous. Le `+*` imbriqué veut dire `* + *` : un élément qui suit un frère. Seul body en est un, juste après head. `offset` vient après la règle imbriquée, mais il appartient toujours à `*`.

### 2. Trois boîtes, une bordure

`27Q` vaut 27 quarts de millimètre : 25,51px. Dans mon Chrome, getComputedStyle donne une bordure de 25px : Chrome dessine les épaisseurs de bordure en pixels entiers, arrondies vers le bas.

Avec `width:0;height:150`, le contenu de chaque boîte fait 0 × 150. html et p ne sont que leurs bordures : des barres de 50 × 200.

body reçoit plus. `padding:35 50` lui donne 0 + 50 + 50 = 100 de large et 150 + 35 + 35 = 220 de haut. `border-width:0 50` supprime ses bordures du haut et du bas et porte celles de gauche et de droite à 50px. body fait 200 × 220 : deux colonnes corail de 50 × 220, séparées de 100px. offsetWidth et offsetHeight donnent 50 × 200 pour html et p, et 200 × 220 pour body.

### 3. Un canevas bleu nuit

Le fond est sur body, pas sur html. Quand html n'a pas de fond, le navigateur peint celui de body sur tout le canevas, et body lui-même n'en peint pas. Le canevas est donc bleu nuit, et le milieu de body est transparent : la barre de html se voit entre les deux colonnes de body.

### 4. offset:ray(45deg) : au centre

`offset` est le raccourci des propriétés de trajectoire. Ici, il donne à chaque boîte le chemin `ray(45deg)` : un rayon qui part du centre du bloc conteneur de la boîte et pointe à 45° à droite de la verticale.

Sans distance, la boîte reste au départ du rayon : son centre va au centre de son bloc conteneur.

- html : son bloc conteneur est le canevas de 400 × 300. Son centre va en (200, 150).
- body : son bloc conteneur est le contenu de html, 0 × 150, au milieu de html. Le centre de body va au centre de html : encore (200, 150).
- p : son bloc conteneur est le contenu de body, 0 × 150. Il est à 100px du bord gauche de body et à 35px de son haut : au milieu de body, lui aussi. Le centre de p va lui aussi en (200, 150).

body garde sa marge de 8px par défaut, et p ses marges de 16px en haut et en bas. Elles ne changent rien : l'offset déplace chaque centre quoi qu'il arrive. Dans mon rendu, les barres vont de x = 90 à 310, centrées sur x = 200.

### 5. Les rotations s'additionnent

Sur un rayon, la boîte tourne aussi, pour que son axe x suive le rayon. Le rayon pointe à 45° à droite de la verticale, soit 45° dans le sens inverse des aiguilles d'une montre depuis l'axe x : chaque boîte tourne de −45°.

Les rotations sont des transformations, et les transformations s'emboîtent : un enfant tourne dans son parent déjà tourné.

- html : −45°. La haute barre penche comme une barre oblique inversée.
- body : −45° − 45° = −90°. La boîte de 200 × 220 fait maintenant 220 de large et 200 de haut. Ses colonnes de gauche et de droite deviennent les barres du haut et du bas : 220 × 50, de x = 90 à 310, de y = 50 à 100 et de y = 200 à 250.
- p : −90° − 45° = −135°. Une haute barre tournée de −135° penche dans l'autre sens, comme une barre oblique.

### 6. Le X et les deux triangles

Chaque barre diagonale fait 200 de long, centrée sur (200, 150). Ses bouts s'arrêtent à 100px du centre, dans les barres horizontales : les coins du bout en haut à gauche sont en (111,6, 97,0) et (147,0, 61,6), au-dessus de y = 100.

Là où les deux barres se croisent, elles se recouvrent sur un carré tourné de 45°, de 50px de côté. Son coin du haut est en y = 150 − 25√2 = 114,6. Entre la barre du haut et ce coin, il reste un petit triangle bleu nuit : sa base va sur y = 100 de x = 185,4 à 214,6, et sa pointe est en (200, 114,6). Dans mon rendu, la colonne x = 200 est bleu nuit jusqu'à y = 112 et corail à partir de y = 115. Le triangle du bas est son reflet, de y = 185,4 à 200.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle dessine les trois formes : `*` donne à html, body et p la même bordure corail et la même taille. body ne change que son padding, l'épaisseur de ses bordures et son fond.
- `offset:ray(45deg` centre chaque boîte et la tourne, en une déclaration. Avec `rotate:-45deg` (122 caractères), les boîtes tournent de la même façon, mais autour de leur propre centre, là où elles ont été placées, près du coin en haut à gauche : 41 545 pixels changent. `offset-path:` à la place de `offset:` donne la même image en 130 caractères.
- Un angle en donne trois : l'emboîtement additionne les rotations, −45°, −90° et −135°.
- Les marges peuvent rester : l'offset met chaque centre au bon endroit quoi qu'il arrive. Avec `margin:0` en plus (134 caractères), l'image est la même.
- `+*` vise body en 2 caractères. `body` donne la même image en 127.
- `27Q` vaut 25px en 3 caractères, une fois arrondi vers le bas par Chrome. `25px` donne la même image en 126. `26Q` vaut 24,57px, dessinés 24px : les barres diagonales s'affinent, et 731 pixels changent.
- Le fond est dans la règle imbriquée : seul body le reçoit, et le navigateur le passe au canevas. Dans la première règle (toujours 125 caractères), html a aussi un fond, donc body peint sa propre boîte bleu nuit. Elle cache la barre de html entre les deux barres horizontales, et 5 061 pixels changent.
- `border-width:0 50` est nécessaire. Sans lui (107 caractères), body garde une bordure de 25px sur ses quatre côtés, et devient un cadre corail de 270 × 150, de x = 65 à 335 : 17 876 pixels changent.
- `<p>` ajoute la troisième barre pour 3 caractères. Sans lui (122 caractères), la barre oblique manque, et 4 754 pixels changent.
- Pas d'unité : `height:150px`, `padding:35px 50px` et `border-width:0 50px` donnent la même image en 133 caractères.
- Un `#` commence une nouvelle valeur : `solid#ed736e` se passe d'espace. `solid #ed736e` donne la même image en 126.
- Rien n'est fermé. `)}` à la fin donne 127 caractères, et `)}</style>` 135, pour la même image.
