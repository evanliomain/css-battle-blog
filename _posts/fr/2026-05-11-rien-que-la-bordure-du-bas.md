---
title: "Rien que la bordure du bas : un anneau et un demi-disque en 117 caractères"
ref: 2026-05-11
permalink: /fr/2026/05/11/rien-que-la-bordure-du-bas/
description: "Comment un html arrondi, avec une seule bordure du bas, dessine un demi-disque rouge, et la bordure de body un anneau noir par-dessus, dans la cible CSS Battle du 11 mai 2026."
target: /assets/targets/2026-05-11.png
target_url: https://cssbattle.dev/play/A5vGTRGW6mraCS1OCASh
colors: ["#b53733", "#000000"]
player: emohdaziz
chars: 117
score: 731.15
match: 100
code: |
  <style>*{margin:6%50 95 170;border-bottom:5lh solid#b53733;border-radius:50%;*{border:5vw solid;margin:36 120-125-120
---

La cible du 11 mai montre un anneau noir épais sur un fond blanc, à gauche, par-dessus un demi-disque rouge brique, côté plat en haut, à droite. Mohamed Ali la dessine avec deux éléments et deux bordures. html est une boîte arrondie qui n'a qu'une bordure du bas : cette bordure, c'est le demi-disque. body, placé avec des marges négatives, prend une bordure noire et le même arrondi : c'est l'anneau.

Les **couleurs pédagogiques** montrent la bordure du bas de html en orange, la bordure de body en violet, et les deux boîtes en pointillés.

{% include animations/2026-05-11.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                  /* html, et aussi head, style et body */
  margin: 6% 50 95 170;              /* 24 50 95 170 : html fait 180 × 181, en (170, 24) */
  border-bottom: 5lh solid #b53733;  /* une bordure du bas rouge de 90px */
  border-radius: 50%;                /* 90 × 90,5 : seule la moitié basse est peinte */
  * {                                /* * * : body (head et style sont cachés) */
    border: 5vw solid;               /* 20px, en noir : la couleur du texte */
    margin: 36 120 -125 -120         /* body : 180 × 180, en (50, 60) ; la fin du code ferme les deux règles */
```

## Comment ça marche

### 1. Deux règles, deux éléments

`*` vise tous les éléments : html, head, style et body. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre, donc head, style et body, mais pas html. head et style ne sont pas affichés. html ne reçoit donc que la règle extérieure, et body reçoit les deux.

Les deux sélecteurs ont la même spécificité, zéro. Quand ils donnent la même propriété, la règle imbriquée gagne, parce qu'elle vient après. Pour body, elle remplace `margin` et `border-bottom` (le raccourci `border` règle aussi le côté du bas). `border-radius:50%` n'est pas remplacé : body le garde de la règle extérieure.

### 2. html : une boîte de 180 × 181

Le code n'a pas de doctype, la page est donc en mode quirks. Dans ce mode, un nombre sans unité se lit en px dans `margin`. Et html remplit la fenêtre moins ses marges.

Un pourcentage dans `margin` est une part de la largeur, même pour la marge du haut : `6%` de 400 = 24. Les marges de html sont donc 24 en haut, 50 à droite, 95 en bas et 170 à gauche. Mon Chrome mesure html en (170, 24), avec 400 − 170 − 50 = 180 de large et 300 − 24 − 95 = 181 de haut.

html n'a pas de fond. Sa boîte est invisible : seule sa bordure va se voir.

### 3. Une bordure du bas de 90px

`border-bottom:5lh solid#b53733`. 1lh est la hauteur d'une ligne de texte. Dans mon Chrome, avec la police par défaut, elle fait 18px, donc 5lh = 90px.

La bordure prend sa place dans la boîte de 181px : elle va de y = 205 − 90 = 115 à 205. Ce qui reste au-dessus, la boîte de contenu de html, fait 180 × 91, en (170, 24). html n'a pas d'autre bordure.

### 4. Arrondie à 50 % : seulement la moitié basse

`border-radius:50%` donne à chaque coin 50 % de la largeur et 50 % de la hauteur : 90 × 90,5. La boîte devient une ellipse de 180 × 181.

Sa moitié haute n'a ni bordure ni fond : rien n'y est peint. La bordure du bas ne garde que la partie qui est dans l'ellipse. Dans mon rendu, le rouge va de x = 170 à 349 et de y = 115 à 204 : un demi-disque de 180 de large et 90 de haut, côté plat en haut.

### 5. body : une boîte de 180 × 180

body part de la boîte de contenu de html, 180 × 91 en (170, 24). Ses marges `36 120-125-120` le déplacent :

- 36 en haut : y = 24 + 36 = 60.
- −120 à gauche : x = 170 − 120 = 50.
- 120 à droite : la largeur reste 180 − (−120) − 120 = 180.

En mode quirks, body s'étire aussi à la hauteur de la boîte de contenu de html, moins ses propres marges : 91 − 36 − (−125) = 180. Mon Chrome mesure body en (50, 60), 180 × 180.

### 6. Un anneau noir par-dessus le demi-disque

`border:5vw solid` donne à body une bordure sur les quatre côtés. 5vw vaut 5 % de 400 = 20px. Sans couleur, une bordure prend la couleur du texte, le noir.

Avec le `border-radius:50%` qu'il garde de la règle extérieure, le carré de 180 × 180 devient un anneau : 180 de diamètre dehors, 180 − 2 × 20 = 140 dedans, centré en (140, 150). body est peint après html : l'anneau passe par-dessus le bout gauche du demi-disque.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `*` et le `*{` imbriqué atteignent html et body en 1 et 3 caractères (`;*{`). Sans imbrication, `}* *{` (119 caractères), l'image est la même. Avec `body{` à la place du `*{` imbriqué (120 caractères), l'image est la même.
- La règle extérieure vise aussi body. `border-radius:50%` n'est donc écrit qu'une fois et arrondit les deux éléments.
- `6%50` écrit 24 et 50 : un pourcentage est une part de la largeur, 6 % de 400 = 24, et il ne faut pas d'espace après `%`. Avec `margin:24 50 95 170` (118 caractères), l'image est la même.
- `5lh` écrit 90px en 3 caractères, ici dans mon Chrome. Avec `90px` (118 caractères), l'image est la même. Un nombre sans unité ne marche pas dans le raccourci `border-bottom` : avec `border-bottom:90 solid#b53733` (116 caractères), la déclaration est ignorée. Il n'y a plus de rouge, et l'anneau s'étire en un ovale qui dépasse le bas du canevas : 22 809 pixels changent.
- `5vw` écrit 20px en 3 caractères. Avec `20px` (118 caractères), l'image est la même. Avec `20` (116 caractères), la déclaration `border` est ignorée, et body garde le `border-bottom:5lh` rouge de la règle extérieure : un second demi-disque rouge et plus d'anneau, 17 445 pixels changent.
- L'anneau n'a pas de couleur : le noir est la couleur du texte par défaut. Avec `solid#000` (121 caractères), l'image est la même.
- Des marges sans unité, et pas d'espace après `%`, avant `#` ni avant un signe moins. Avec les quatre espaces, `margin:6% 50 95 170;border-bottom:5lh solid #b53733;…;margin:36 120 -125 -120` (121 caractères), l'image est la même.
- Le code se termine dans les deux règles ouvertes, et la fin du code les ferme. Avec `}}` à la fin (119 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes formes au même endroit que la cible. 1 254 pixels diffèrent de plus de 8 niveaux, et tous sont sur le bord d'une forme : l'anticrénelage n'est pas le même. Le plus grand écart est de 182 niveaux, en (161, 216), sur le bord intérieur de l'anneau : (198, 198, 198) dans mon rendu, (16, 16, 16) dans la cible. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
