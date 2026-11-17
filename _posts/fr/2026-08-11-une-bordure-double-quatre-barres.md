---
title: "Une bordure double, quatre barres : une pilule en 133 caractères"
ref: 2026-08-11
permalink: /fr/2026/08/11/une-bordure-double-quatre-barres/
description: "Comment les bordures du haut et du bas de html, arrondies avec un rayon de 9in, font une pilule, et comment une bordure double de chaque côté de body donne les quatre barres de la cible CSS Battle du 11 août 2026."
target: /assets/targets/2026-08-11.png
target_url: https://cssbattle.dev/play/9PFKqCOsKmSizurb6gRt
colors: ["#3a2568", "#f9ddc6", "#9d92c8"]
player: gunnar
chars: 133
score: 712.6
match: 100
code: |
  <style>&{background:#3A2568;margin:5%120;border-block:5em solid#F9DDC6;border-radius:9in;*{margin:6%0;border-inline:64q double#9D92C8
---

La cible du 11 août est une grande pilule crème sur fond violet foncé. Une bande du fond la coupe au milieu, et quatre barres lavande traversent cette bande. Gunnar Bittersmann dessine la pilule avec les bordures du haut et du bas de html, arrondies en deux demi-disques. Les barres sont les bordures gauche et droite de body : chacune est en `double`, donc chaque côté donne deux barres.

Cochez **Couleurs pédagogiques** pour voir la boîte de html, la boîte de body et le creux de chaque bordure double.

{% include animations/2026-08-11.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                                /* & au premier niveau : la racine, html */
  background: #3A2568;             /* passe au canevas */
  margin: 5% 120;                  /* 20px en haut et en bas, 120px à gauche et à droite : html fait 160 × 260 */
  border-block: 5em solid #F9DDC6; /* bordures du haut et du bas, 80px chacune */
  border-radius: 9in;              /* 864px, ramenés à 80px : deux demi-disques */
  * {                              /* tout élément dans html : head, style, body */
    margin: 6% 0;                  /* 6 % de 160 = 9,6px : body fait 160 × 80,81 */
    border-inline: 64q double #9D92C8  /* bordures gauche et droite, 60px, coupées en trois */
```

## Comment ça marche

### 1. Une règle pour html, une pour body

Le code n'a ni balise html, ni head, ni body : Chrome les ajoute. Au premier niveau d'une feuille de style, `&` désigne la racine du document : html. Je l'ai vérifié avec getComputedStyle : html a les bordures de 80px en haut et en bas, et body les bordures doubles de 60px. Le `*{` imbriqué veut dire `& *` : tout élément dans html, donc head, style et body. head et style ne s'affichent pas : body est la seule boîte qui reçoit la règle intérieure.

Le canevas prend le fond de html, `#3A2568`. J'ai vérifié : sans `background:#3A2568`, le canevas est blanc.

### 2. html fait 160 × 260

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité, comme le `120` de `margin:5%120`, est en px. J'ai vérifié avec `<!doctype html>` devant : tout le `margin` est ignoré, html fait 400px de large et body 0px de haut.

Une marge en pourcentage est une part de la largeur du bloc conteneur, ici la fenêtre de 400px. `5%` donne donc 20px en haut et en bas, et `120` donne 120px à gauche et à droite. html fait 400 − 240 = 160px de large. En mode quirks, html remplit aussi la hauteur de la fenêtre, moins ses marges : 300 − 40 = 260px. getBoundingClientRect donne (120 ; 20), 160 × 260.

### 3. Deux bordures crème

`border-block` règle les bordures du haut et du bas en une seule propriété. `5em` vaut 5 × 16 = 80px. Les bordures sont dans les 260px de html : celle du haut va de y = 20 à 100, celle du bas de 200 à 280. Entre les deux reste la boîte de contenu de html, 160 × 100, de y = 100 à 200. Rien n'y est peint : on voit le canevas. C'est la bande qui coupe la pilule.

### 4. 9in devient 80px

`9in` vaut 9 × 96 = 864px. Le long du bord du haut, deux rayons de 864px font 1728px, mais le bord ne fait que 160px. Quand les rayons ne tiennent pas, le navigateur les réduit tous du même facteur. Le plus petit l'emporte : 160 / 1728 sur les bords du haut et du bas (les bords gauche et droit donnent 260 / 1728). Chaque coin fait donc 864 × 160 / 1728 = 80px. J'ai vérifié : avec `border-radius:80px`, le rendu est le même, au pixel près ; avec `79px`, il change.

Un coin de 80 × 80 sur une bordure de 80px de haut fait de toute la bordure du haut un demi-disque de rayon 80, centré en (200 ; 100). Pareil pour la bordure du bas, centrée en (200 ; 200). Le bord intérieur de chaque bordure reste droit : le rayon intérieur est le rayon extérieur moins la bordure, 80 − 80 = 0 en hauteur.

### 5. body se place dans la bande

Le `margin:6%0` de body est lui aussi une part d'une largeur, celle de html : 6 % × 160 = 9,6px en haut et en bas. En mode quirks, body remplit la hauteur de la boîte de contenu de html, moins ses marges : 100 − 2 × 9,6 = 80,8px. getBoundingClientRect donne (120 ; 109,59), 160 × 80,81. body n'a pas de fond : seules ses bordures se voient.

### 6. Deux bordures de 60px

`border-inline` règle les bordures gauche et droite en une seule propriété. `64q`, c'est 64 quarts de millimètre : 1q = 96 / 101,6 = 0,945px, donc 64q = 60,47px. Chrome dessine les bordures en pixels entiers : getComputedStyle donne 60px pour `border-left-width`. J'ai vérifié : avec `60px` à la place de `64q`, le rendu est le même. Les bordures sont dans les 160px de body : de x = 120 à 180, et de 220 à 280. Leurs bords du haut et du bas, en y = 109,59 et 190,41, tombent sur les lignes 110 à 189 : 80 lignes, comme dans la cible.

### 7. double donne deux barres par côté

Une bordure `double` est dessinée en deux traits séparés par un creux. Ici, chaque bordure fait 60px, coupés en trois tiers de 20px : un trait, un creux, un trait. Dans mon rendu, la bordure gauche donne des colonnes lavande de 120 à 139 et de 160 à 179, avec le canevas entre les deux. La bordure droite donne 220 à 239 et 260 à 279. Les 40px entre les deux bordures, de x = 180 à 220, sont la boîte de contenu de body, vide. J'ai vérifié avec `solid` à la place de `double` : chaque côté devient une seule barre de 60px.

## Notes de golf

- `&{` désigne la racine en un caractère. Avec `html{` à la place, le code fait 136 caractères, pour le même rendu, au pixel près.
- Le `*{` imbriqué atteint body sans le nommer. head et style reçoivent aussi la règle, mais ne s'affichent pas.
- Le `background` de html peint tout le canevas : pas besoin d'un autre fond.
- Une bordure `double` donne deux barres : les quatre barres viennent d'une seule déclaration `border-inline`.
- `9in` fait 3 caractères, et tout rayon assez grand est ramené aux mêmes 80px.
- `64q` fait 3 caractères pour une bordure de 60px ; `60px` en fait 4.
- En mode quirks, `120` n'a pas besoin d'unité.
- Pas besoin d'espace dans `5%120`, `6%0`, `solid#F9DDC6` ou `double#9D92C8`.
- Deux accolades, `&{` et `*{`, restent ouvertes, et il n'y a pas de `</style>`. Avec `}}`, le code fait 135 caractères ; avec `}}</style>`, 143. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les barres, la bande et les bords droits de la pilule tombent sur les mêmes pixels que dans la cible. 581 pixels diffèrent de la cible, tous sur les deux bords courbes : chacun est à moins de 0,73px d'un cercle de rayon 80 autour de (200 ; 100) ou de (200 ; 200). Le plus grand écart est de 137 niveaux, en (146 ; 40), en haut à gauche de la pilule : la cible y est crème, (249, 221, 198), et mon rendu est un mélange, (112, 89, 131). Sur le juge de CSS Battle, le code est identique à 100 %.
