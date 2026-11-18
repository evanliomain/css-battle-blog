---
title: "Mêmes ombres, un pixel plus petit : un L en 95 caractères"
ref: 2026-06-20
permalink: /fr/2026/06/20/memes-ombres-un-pixel-plus-petit/
description: "Comment les quatre ombres noires de html dessinent un L autour d'un trou de 80 × 80, et comment body, 1px plus petit de chaque côté, ajoute un anneau de 1px avec les mêmes ombres, dans la cible CSS Battle du 20 juin 2026."
target: /assets/targets/2026-06-20.png
target_url: https://cssbattle.dev/play/g7g7LD4T5HXt9Pru8Yvq
colors: ["#f3ac3c", "#000"]
player: cubachatou
chars: 95
score: 761.74
match: 100
code: |
  <style>*{background:#F3AC3C;margin:110 160;box-shadow:53q 53q,-53q -53q,0 53q,-53q 0;*{margin:1
---

La cible du 20 juin est un L noir fait de blocs, sur un fond orange : une haute barre à gauche avec un bloc en haut, et une large barre en bas avec un bloc à droite. Vegy fait de html un carré de 80 × 80 et lui donne quatre ombres noires : quatre copies du carré, décalées de 50,08px. Une ombre n'est jamais peinte sous sa propre boîte, donc les copies laissent un trou carré. body reçoit les mêmes ombres, et il a 1px de moins de chaque côté : ses ombres ajoutent un anneau de 1px dans le trou.

Utilisez les **Couleurs pédagogiques** pour voir chaque ombre de html, et les ombres de body peintes par-dessus.

{% include animations/2026-06-20.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                     /* html, head, style, body */
  background: #F3AC3C;  /* celui de html couvre tout le canevas */
  margin: 110 160;      /* mode quirks : px ; html fait 80 × 80 en (160, 110) */
  box-shadow:           /* copies noires de la boîte, 53q = 50,08px */
    53q 53q,            /* vers la droite et le bas */
    -53q -53q,          /* vers la gauche et le haut */
    0 53q,              /* vers le bas */
    -53q 0;             /* vers la gauche */
  * {                   /* * * : head, style, body */
    margin: 1           /* body : 78 × 78 en (161, 111) */
```

## Comment ça marche

### 1. Mode quirks : html est un carré de 80 × 80

`*` touche html, head, style et body. head et style sont masqués : seuls html et body sont dessinés.

Les pages de CSS Battle n'ont pas de doctype, donc elles sont en mode quirks. Dans mon rendu, `document.compatMode` vaut `BackCompat`. Deux particularités comptent ici :

- `margin:110 160` n'a pas d'unité, et margin l'accepte en mode quirks : elle se lit 110px et 160px.
- html remplit la hauteur du canevas. html fait 400 − 2 × 160 = 80px de large et 300 − 2 × 110 = 80px de haut.

J'ai mesuré html de x = 160 à 240 et de y = 110 à 190.

Le fond de html s'étend à tout le canevas : tout est orange.

### 2. Quatre copies de html

Une ombre box-shadow sans flou ni étalement est une copie de la boîte, décalée de son offset. L'unité est `q`, un quart de millimètre : 53q = 53 × 0,945 = 50,08px. Il n'y a pas de couleur, donc l'ombre prend la couleur du texte, le noir.

Les quatre décalages envoient une copie vers la droite et le bas, vers la gauche et le haut, droit vers le bas, et droit vers la gauche :

- `53q 53q` : x = 210,08 à 290,08, y = 160,08 à 240,08.
- `-53q -53q` : x = 109,92 à 189,92, y = 59,92 à 139,92.
- `0 53q` : x = 160 à 240, y = 160,08 à 240,08.
- `-53q 0` : x = 109,92 à 189,92, y = 110 à 190.

### 3. Le trou, c'est la boîte de html

Une ombre box-shadow n'est jamais peinte sous sa propre boîte. Chaque copie déborde sur la boîte de html, et cette partie est coupée. Les quatre morceaux forment le L, autour d'un trou carré : la boîte de html, 80 × 80.

Je l'ai vérifié en retirant les ombres de body : le trou est orange de x = 160 à 239 et de y = 110 à 189, même là où l'ombre `-53q 0` le couvre.

### 4. body et la règle imbriquée

`*{margin:1` est imbriqué dans `*{`, donc il se lit `* *` : tout élément placé dans un autre, ici head, style et body. Il a la même spécificité que `*` et vient après, donc body prend `margin:1` au lieu de `margin:110 160`.

En mode quirks, body remplit aussi html. J'ai mesuré body de x = 161 à 239 et de y = 111 à 189 : 78 × 78. Son fond orange est peint sur le canevas orange, donc il ne se voit pas.

### 5. Un anneau de 1px

body reçoit les mêmes quatre ombres : quatre copies noires de 78 × 78, décalées de 50,08px, peintes après celles de html. Elles sont coupées sous la boîte de body, qui a 1px de moins que celle de html de chaque côté. Hors de la boîte de html, elles tombent sur les ombres noires de html. Dedans, elles couvrent un anneau de 1px : le trou passe à 78 × 78, de x = 161 à 239 et de y = 111 à 189. C'est la taille du trou dans la cible.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle donne le fond, la marge et les ombres à html et à body d'un coup. Les ombres de html dessinent le L, et les mêmes ombres sur body dessinent l'anneau.
- Une ombre sans couleur est noire ici, la couleur du texte : pas de couleur à écrire, quatre fois.
- La marge peut se passer de `px` en mode quirks, mais pas box-shadow. Avec `50` à la place de chaque `53q` (89 caractères), Chrome ignore toute la propriété box-shadow, le canevas est orange uni, et 16 634 pixels changent. `q` est une unité d'une lettre, et 53q = 50,08px.
- `;*{margin:1` fait 11 caractères et sert deux fois :
  - il rend body 1px plus petit que html de chaque côté. Avec `;box-shadow:none` ajouté à la règle imbriquée (111 caractères), body n'a plus d'ombres, le trou fait 80 × 80, et 214 pixels changent, tous sur cet anneau de 1px.
  - il garde html à 80px de haut. Sans `;*{margin:1` (84 caractères), body garde `margin:110 160` : il fait 0 × 0 en (320, 220), donc ses ombres sont vides, et ses marges donnent à html 110px de haut au lieu de 80. Le bas du L descend de 30px, et 8 234 pixels changent.
- Rien n'est fermé. `}}` à la fin donne la même image en 97 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel est très proche de la cible, mais pas identique : 1 232 pixels diffèrent de plus de 8 sur un canal. Seuls 3 d'entre eux diffèrent beaucoup : (189, 110), (239, 160) et (160, 189), à des coins intérieurs du trou. Ils sont orange dans mon rendu et noirs dans la cible.

521 des autres sont des pixels en demi-teinte dans mon rendu, le long des bords. 53q vaut 50,08px, pas 50px, donc les bords des ombres tombent entre deux pixels. Avec `50px` à la place de chaque `53q` (101 caractères), mon rendu n'a plus aucun pixel en demi-teinte.

Les 708 derniers sont d'un orange ou d'un noir uni dans mon rendu, mais la cible n'est pas tout à fait unie à ces endroits : elle a 419 couleurs différentes, avec de petits écarts près des bords, et son orange est #f3ab3c. Le juge de CSS Battle donne au code 100 % de correspondance.
