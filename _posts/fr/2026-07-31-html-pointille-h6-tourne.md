---
title: "html pointillé, h6 tourné : un II vert en 178 caractères"
ref: 2026-07-31
permalink: /fr/2026/07/31/html-pointille-h6-tourne/
description: "Comment une bordure pointillée sur html donne les quatre demi-disques de la cible CSS Battle du 31 juillet 2026, et comment un h6 tourné, avec un pre dedans, dessine les piliers et les deux fentes."
target: /assets/targets/2026-07-31.png
target_url: https://cssbattle.dev/play/Fyddj98G3Aus7byaOz8c
colors: ["#6592cf", "#3f3642", "#a8d38b"]
player: selenit
chars: 178
score: 673.33
match: 100
code: |
  <h6><pre>.
  .<style>*{background:#6592CF;margin:20;border-block:var(--b,dotted#3F3642)64q;*{margin:-60 30;--b:solid#A8D38B;h6{margin:30 90-30 10;rotate:90deg}*{margin:-70%60 20-60
---

La cible du 31 juillet est une forme verte sur fond bleu : deux barres, quatre piliers et deux fentes bleues étroites, l'une qui part du bas, l'autre du haut. Les quatre bouts des barres portent des demi-disques brun-noir. Ilya Streltsyn tire les demi-disques d'une bordure pointillée de 60px sur html, cachée par la bordure verte de body sauf aux bouts. Puis un h6 et le pre qu'il contient, tournés d'un quart de tour, font les piliers et les fentes avec leurs propres bordures.

Cochez **Couleurs pédagogiques** pour distinguer les quatre bordures, et voir h6 et pre avant qu'ils tournent.

{% include animations/2026-07-31.html lang=page.lang %}

## Le code, aéré

```css
<h6><pre>.
.<style>
* {                                          /* tous les éléments */
  background: #6592CF;                       /* le bleu de html couvre le canevas ; body, h6 et pre l'ont aussi */
  margin: 20;                                /* html : 360 × 260 en (20 ; 20) */
  border-block: var(--b,dotted#3F3642)64q;   /* html n'a pas de --b : une bordure pointillée brun-noir de 60px */
  * {                                        /* les descendants de html */
    margin: -60 30;                          /* body : 300 × 260 en (50 ; 20) */
    --b: solid#A8D38B;                       /* body, h6 et pre : une bordure verte pleine de 60px */
    h6 {
      margin: 30 90-30 10;                   /* h6 : 200 × 140 en (60 ; 110) */
      rotate: 90deg;                         /* h6 tourne, et pre tourne avec lui */
    }
    * {                                      /* pre, dans h6 */
      margin: -70%60 20-60                   /* pre : 200 × 140 en (0 ; 30), avant la rotation */
```

## Comment ça marche

### 1. Six éléments, une seule déclaration de bordure

Le parseur HTML met pre dans h6, le texte `.` `.` (deux lignes) dans pre, et l'élément style, jamais fermé, dans pre aussi. Avec html, head et body, cela fait six éléments. head et style ne s'affichent pas, donc les règles se voient sur quatre boîtes : html, body, h6 et pre.

`*` leur donne à tous le fond bleu, une marge de 20px et la même déclaration de bordure : `border-block:var(--b,dotted#3F3642)64q`. `border-block` ne règle que les bordures du haut et du bas. `64q`, c'est 64 quarts de millimètre, 60,47px, et Chrome trace 60px.

Le style vient de la variable. html n'a pas de `--b`, donc `var()` prend sa valeur de repli : `dotted#3F3642`. Le `*{` imbriqué pose `--b:solid#A8D38B` sur tous les descendants de html : body, h6 et pre reçoivent une bordure verte pleine par la même déclaration.

### 2. html : quatre disques brun-noir par bord

Il n'y a pas de doctype, donc la page est en mode quirks, et les nombres nus comme `20` se lisent en px. En mode quirks, html remplit les 400 × 300 de la page, moins ses marges : une boîte de 360 × 260 en (20 ; 20). Son fond bleu est peint sur tout le canevas : c'est toujours le cas pour le fond de la racine.

Une bordure pointillée de 60px est une rangée de disques de 60px. Sur un bord de 360px, Chrome en trace quatre, centrés en x = 50, 150, 250 et 350, séparés de 40px. La rangée du haut est centrée en y = 50, celle du bas en y = 250. Entre les deux bordures, la boîte de contenu de html fait 360 × 140, en (20 ; 80).

### 3. body : deux barres vertes

body reçoit `margin:-60 30`. Il part de la boîte de contenu de html : la marge haute de -60 le remonte à y = 20, et les marges de côté de 30 lui donnent 300 de large, de x = 50 à 350. En mode quirks, body remplit la boîte de contenu de html, moins ses marges : 140 + 60 + 60 = 260 de haut, jusqu'à y = 280.

Les bordures vertes de body sont deux barres de 300 × 60, de y = 20 à 80 et de y = 220 à 280. Elles couvrent les deux bordures de html de x = 50 à 350. Les deux disques du milieu de chaque rangée disparaissent, et il ne reste que les moitiés extérieures des disques des bouts : de x = 20 à 50 et de x = 350 à 380. Ce sont les quatre demi-disques. Entre les barres, la boîte de contenu de body fait 300 × 140, en (50 ; 80), en bleu.

### 4. h6 : 200 × 140

`h6{margin:30 90-30 10}` place h6 dans la boîte de contenu de body : à 10px de la gauche, à 90px de la droite, donc 200 de large, à partir de (60 ; 110). Il a les deux mêmes bordures vertes de 60px.

Sa boîte de contenu fait 20px de haut. C'est la boîte de marge de pre : pre fait 60 + 20 + 60 = 140 de haut, avec des marges de -140 et de 20, donc il occupe 140 − 140 + 20 = 20. h6 fait alors 140 de haut, de y = 110 à 250. Sa marge basse de -30 ramène sa boîte de marge à 30 + 140 − 30 = 140 : pile la boîte de contenu de body. Avec une marge basse de 0, body grandit à 290 de haut et sa barre du bas descend de 30px.

### 5. pre : dans h6, 140px plus haut

La marge de pre est `-70%60 20-60`. Une marge en pourcentage se prend sur la largeur du bloc conteneur, ici les 200px de contenu de h6 : -70 %, c'est -140px, même pour la marge du haut. pre monte donc de 140px. La marge droite de 60 et la marge gauche de -60 lui gardent 200 de large et le décalent de 60px vers la gauche : avant la rotation, pre est une boîte de 200 × 140 en (0 ; 30).

Sa bordure basse, de y = 110 à 170, tombe pile sur la bordure haute de h6. Sa boîte de contenu, de y = 90 à 110, tient les deux lignes de texte. h6 réduit la police : h6 est en 10,72px, et pre, en police à chasse fixe, en 8,71px. Chaque ligne fait 10px de haut, donc deux lignes font les 20px.

### 6. Un quart de tour

`rotate:90deg` fait tourner h6 autour de son centre, (160 ; 180). pre est dans h6, donc il tourne avec lui. Un point (x ; y) va en (340 − y ; x + 20) :

- h6 va en (90 ; 80), 140 × 200. Ses deux bordures deviennent des piliers de x = 90 à 150 et de x = 170 à 230, et sa boîte de contenu de 20px devient une fente de x = 150 à 170, de y = 80 à 280.
- pre va en (170 ; 20), 140 × 200. Ses bordures deviennent des piliers de x = 170 à 230 (par-dessus celui de h6) et de x = 250 à 310, et sa boîte de contenu devient une fente de x = 230 à 250, de y = 20 à 220.

h6 et pre sont peints par-dessus body. Leur fond bleu creuse les fentes dans les barres de body : celle de h6 de y = 220 à 280 en bas, celle de pre de y = 20 à 80 en haut. Les deux encoches bleues à gauche et à droite, de x = 50 à 90 et de x = 310 à 350, sont la boîte de contenu de body, restée nue.

## Notes de golf

- Une seule déclaration `border-block` trace les quatre bordures. La variable `--b` change son style et sa couleur : pointillé brun-noir sur html, qui n'a pas de `--b`, vert plein partout ailleurs. Deux déclarations simples, `border-block:dotted#3F3642 64q` et `border-block:solid#A8D38B 64q`, donnent la même image en 183 caractères, 5 de plus.
- `64q` tient en 3 caractères pour une bordure que Chrome trace sur 60px. `60px` donne la même image en 4.
- `-70%` vaut ici -140px, à longueur égale avec `-140`. Mais `%` termine la valeur, donc la suivante n'a pas besoin d'espace : `-70%60` fait 6 caractères, `-140 60` en fait 7, pour la même image.
- Pas d'espace non plus devant un signe moins : dans `90-30` et `20-60`, le `-` commence une nouvelle valeur. Dans `dotted#3F3642` et `solid#A8D38B`, le `#` fait de même, et dans `)64q`, la parenthèse aussi.
- Le `background` est sur `*`, pas seulement sur html : h6 et pre en ont besoin pour creuser les fentes dans les barres de body. Avec le fond sur html seul (`html{background:#6592CF}*{`), les deux fentes s'arrêtent aux barres, et 2 398 pixels changent.
- Une seule rotation fait tourner deux boîtes : pre est dans h6, donc `rotate:90deg` ne s'écrit qu'une fois.
- `<h6>` règle la taille du texte, pour que les deux lignes de `.` fassent pile 20px. Avec `<h5>`, les lignes font 13px, les deux fentes 26px de large, et 6 925 pixels changent. Avec un seul `.`, 2 caractères de moins, les deux fentes font 10px de large, et 6 368 pixels changent.
- `h6{` est plus spécifique que `*{` : h6 garde sa marge alors que la dernière règle `*{` le vise aussi et vient après. La dernière règle peut donc être celle de pre, et rester ouverte.
- Rien n'est fermé : trois `*{` restent ouverts, et ni style, ni pre, ni h6 ne sont fermés. Avec `}}}` à la fin, le code fait 181 caractères et l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome, 324 pixels diffèrent de la cible de plus de 8 sur un canal. 310 d'entre eux sont sur les bords des quatre demi-disques, en x ≤ 50 ou x ≥ 350. Les 14 autres sont deux petites marques noires en haut de la fente du haut, vers (232 ; 22) et (242 ; 22) : les deux points du texte, tracés au début de chaque ligne après la rotation. Quand j'ajoute `color:#0000` à la première règle, ces 14 pixels deviennent bleus. Le juge de CSS Battle donne au code 100 % de correspondance.
