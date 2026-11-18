---
title: "Des ombres qui évitent leur propre boîte : une table et deux chaises en 169 caractères"
ref: 2026-05-25
permalink: /fr/2026/05/25/des-ombres-qui-evitent-leur-boite/
description: "Comment la boîte de html, garée au-dessus du canevas, garde ses propres ombres hors de l'espace au-dessus de la table, comment cinq ombres dessinent la table et une chaise, et comment un body retourné dessine la seconde chaise de la cible CSS Battle du 25 mai 2026."
target: /assets/targets/2026-05-25.png
target_url: https://cssbattle.dev/play/7Nd7rqnfAz8Zb4BPXd3C
colors: ["#f8d3cf", "#f8d2d1", "#de6b67", "#2f5a76"]
player: emohdaziz
chars: 169
score: 679.9
match: 100
code: |
  <style>*{margin:-50%25%180;color:2F5A76;box-shadow:0 5ch,0 60vw 0-5pc,5ch 63q#f8d2d1,15ex 370q 0-74q#f8d2d1,15ex 201q 0-32q#de6b67;*{background:#d213;margin:0;scale:-1 1
---

La cible du 25 mai montre un T bleu foncé, comme une table, entre deux chaises corail vues de profil, sur un fond rose pâle. Mohamed Ali la dessine uniquement avec des ombres. La boîte de html est presque toute au-dessus du canevas, et une boîte ne peint jamais ses ombres externes sous elle-même : l'espace au-dessus de la table reste vide. Cinq ombres dessinent la table et la chaise de droite. body, retourné, dessine celle de gauche.

Avec la **Vue large**, on voit la boîte de html et les ombres entières, au-dessus et en dessous du canevas. Avec les **Couleurs pédagogiques**, chacune des cinq ombres a sa propre couleur.

{% include animations/2026-05-25.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, head, style, body : html et body s'affichent */
  margin: -50%25%180;            /* html : 200 × 320 en (100, −200), bord du bas en y = 120 */
  color: 2F5A76;                 /* la couleur des ombres qui n'en ont pas */
  box-shadow:                    /* ombres externes : jamais peintes dans la boîte */
    0 5ch,                       /* 1. 40px plus bas : seul le plateau de 200 × 40 se voit */
    0 60vw 0-5pc,                /* 2. 240px plus bas, 80px de moins de chaque côté : le pied */
    5ch 63q#f8d2d1,              /* 3. 40px à droite, 59,53px plus bas : cache le rouge au-dessus de l'assise */
    15ex 370q 0-74q#f8d2d1,      /* 4. cache le rouge entre les pieds */
    15ex 201q 0-32q#de6b67;      /* 5. le bloc rouge de la chaise de droite, peint sous le reste */
  * {                            /* head, style et body */
    background: #d213;           /* le fond de body va au canevas */
    margin: 0;                   /* body se pose sur la boîte de html */
    scale: -1 1                  /* les ombres de body sont retournées : la chaise de gauche */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `180` dans une marge est lu en px.

Le code n'est qu'un `<style>`. Le navigateur le range dans head, et ajoute un body vide. La page est donc html, avec head (et style dedans) et body.

`*` vise tous les éléments. Le `*{` imbriqué dedans vise tout élément placé dans un autre : head, style et body. head et style ne s'affichent pas : il reste deux boîtes, html et body.

Le `<style>` n'est jamais fermé, ni les règles : la fin du code les ferme.

### 2. La boîte de html

`margin:-50%25%180` met −50 % en haut, 25 % sur les côtés et 180px en bas. Une marge en pourcentage se mesure sur la largeur de la page, 400px : −200px en haut, 100px de chaque côté. En mode quirks, html remplit la page moins ses marges : 400 − 100 − 100 = 200 de large, et 300 + 200 − 180 = 320 de haut, en (100, −200).

html va donc de y = −200 à y = 120. Il est presque tout au-dessus du canevas. Il n'a pas de fond : la boîte elle-même ne dessine rien.

### 3. Des ombres qui évitent leur boîte

Une ombre externe est une copie de la boîte, décalée et agrandie de son étalement. Le navigateur ne la peint qu'en dehors de la boîte de l'élément. La partie qui tombe sous la boîte n'est jamais peinte.

La première ombre, `0 5ch`, est html décalé de 40px vers le bas (1ch = 8px dans la police par défaut de 16px) : 200 × 320 en (100, −160). Elle finit en y = 160, mais la boîte de html la couvre jusqu'à y = 120. Il ne reste qu'une bande de 200 × 40, en (100, 120) : le plateau du T.

Les deux premières ombres n'ont pas de couleur à elles. Elles prennent la couleur courante : `color:2F5A76` n'a pas de `#`, mais le mode quirks le lit quand même comme #2F5A76.

### 4. Le pied du T

`0 60vw 0-5pc`, c'est 60vw = 240px vers le bas, sans flou, avec un étalement de −5pc = −80px. Un étalement négatif rétrécit la copie de tous les côtés : 200 − 160 = 40 de large, 320 − 160 = 160 de haut, en (100 + 80, −200 + 240 + 80) = (180, 120).

Dans une liste d'ombres, la première est peinte au-dessus. Le plateau couvre le pied de y = 120 à 160, et le pied continue jusqu'à y = 280.

### 5. Un bloc rouge, découpé en chaise

La dernière ombre est peinte sous toutes les autres. `15ex 201q 0-32q#de6b67` décale html de 15ex vers la droite et de 201q vers le bas, et le rétrécit de 32q. Un ex est la hauteur d'un « x » dans la police de l'élément : dans mon Chrome, 15ex = 107,69px. Un q est un quart de millimètre, 0,945px : 201q = 189,92px et 32q = 30,24px.

Cela donne un bloc rouge de 139,53 × 259,53 en (237,92 ; 20,16), jusqu'à y = 279,69. Sa partie dans la boîte de html, au-dessus de y = 120, n'est pas peinte. Le plateau du T le couvre de y = 120 à 160.

Deux ombres couleur du fond en cachent ensuite une partie. Elles viennent plus tôt dans la liste, donc elles sont peintes au-dessus du rouge :

- `5ch 63q#f8d2d1` est html décalé de 40px à droite et de 63q = 59,53px vers le bas : (140 ; −140,47), 200 × 320. Son bord du bas est en y = 179,53, et son bord droit en x = 340. Elle cache tout le rouge au-dessus de l'assise, sauf le dossier, à droite de x = 340.
- `15ex 370q 0-74q#f8d2d1` décale html de 107,69px à droite et de 349,61px vers le bas, et le rétrécit de 69,92px : 60,16 × 180,16 en (277,61 ; 219,53). Elle cache le rouge entre les deux pieds.

Il reste une chaise : un dossier de x = 340 à 377,45, une assise de y = 179,53 à 219,53, et deux pieds jusqu'à y = 279,69.

### 6. body, retourné

Le `*{` imbriqué donne à body `margin:0`. En mode quirks, body remplit alors html : même boîte, 200 × 320 en (100, −200). body est aussi visé par le `*` extérieur : il reçoit les mêmes cinq ombres.

`scale:-1 1` retourne body de gauche à droite, autour de son centre, x = 200. La boîte ne bouge pas : ses ombres évitent toujours la même zone. Mais elles arrivent en miroir : x devient 400 − x. Le plateau et le pied du T sont symétriques : ils retombent sur eux-mêmes. La chaise arrive à gauche, de x = 400 − 377,45 = 22,55 à 400 − 237,92 = 162,08.

### 7. Le fond

`background:#d213` est lui aussi dans la règle imbriquée : body le reçoit. html n'a pas de fond, donc le navigateur peint le fond de body sur tout le canevas.

#d213 est #dd2211 à 20 % d'opacité (le 4ᵉ chiffre, 3, vaut 3/15 = 0,2). Sur la page blanche, cela donne #f8d3cf. Les caches sont en #f8d2d1. L'écart est d'au plus 2 par canal, trop peu pour se voir.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Les ombres externes ne couvrent jamais leur propre boîte. Ce seul fait vide toute la zone au-dessus de la table, sans ombre de plus.
- `scale:-1 1` dessine la seconde chaise. Sans lui (158 caractères), les ombres de body tombent sur celles de html, et la chaise de gauche disparaît : 17 040 pixels changent.
- `margin:0` remet body sur la boîte de html. Sans lui (160 caractères), body reçoit aussi la marge de `*`, mesurée sur les 200px de html : il devient 100 × 240 en (150, −300). Ses ombres retournées rétrécissent avec lui, et la chaise de gauche devient une courte barre en haut à gauche : 20 664 pixels changent.
- `-50%25%180` : il ne faut pas d'espace après un `%`. `margin:-200 25%180` donne la même image en 170 caractères, `margin:-200 100 180` en 171.
- `color:2F5A76` se passe du `#`. Avec `color:#2F5A76`, la même image prend 170 caractères. Écrire la couleur dans les deux ombres bleues à la place, sans `color`, en prend aussi 170.
- Le fond peut être translucide, pas les caches. `#d213` fait 5 caractères, `#f8d2d1` en fait 7 : avec `background:#f8d2d1` (171 caractères), aucun pixel ne bouge de plus de 2. Mais des caches en `#d213` (165 caractères) laissent voir le rouge et teintent le fond : 27 482 pixels changent.
- Des unités courtes : `5ch` vaut 40px, `60vw` 240px et `5pc` 80px. Avec `0 40px` à la place de `0 5ch`, la même image prend 170 caractères. `63q` fait 3 caractères pour 59,53px ; `60px` en ferait 4. Avec `60px` (170 caractères), le haut de l'assise passe de y = 179,53 à 180 : 204 pixels changent, tous sur la ligne y = 179.
- Pas d'espace avant un signe moins ni avant un `#`. `0 -5pc`, `0 -74q` et `0 -32q` donnent la même image en 172 caractères, tout comme `63q #f8d2d1` avec une espace avant chacun des trois `#`.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 3 426 pixels, avec la même règle que dans les notes de golf. Tous sont sur les bords des chaises. La chaise de droite va de x = 237,92 à 377,45, là où la cible a 240 à 380, et celle de gauche en est le miroir. Dans mon Chrome, 15ex vaut 107,69px. Avec `110px` à la place des deux `15ex`, les chaises passent sur les colonnes de la cible, et il reste 1 274 pixels. Ils sont sur les lignes y = 20, 179, 219 et 279 et les colonnes x = 20, 159, 240 et 379, là où une longueur en q met un bord entre deux pixels. Avec aussi des valeurs en px à la place des valeurs en q (`60px`, `350px`, `70px`, `190px`, `30px`), aucun pixel ne diffère. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
