---
title: "Un trou, deux yeux : un fantôme pixelisé en 170 caractères"
ref: 2026-07-04
permalink: /fr/2026/07/04/un-trou-deux-yeux/
description: "Comment l'épaisse bordure de html dessine le corps d'un fantôme pixelisé, comment body coupe en deux yeux le trou qu'elle laisse, et comment quatre ombres de body font les pieds, dans la cible CSS Battle du 4 juillet 2026."
target: /assets/targets/2026-07-04.png
target_url: https://cssbattle.dev/play/Tgh9p4ln2hnogFFpiFch
colors: ["#d35c72", "#efeb99"]
player: h_blierzt
chars: 170
score: 679.14
match: 100
code: |
  <style>*{border:solid 5vh;color:EFEB99;background:#D35C72;margin:-2 20-8 20}&{margin:40 130 100;border-width:30 50 110 20;*{box-shadow:-5ch 33vw,5ch 33vw,-11q 9lh,74q 9lh
---

La cible du 4 juillet montre un fantôme pixelisé jaune pâle sur un fond rose : un grand bloc avec deux petits yeux carrés roses, et deux rangées de pieds carrés en bas. H_Bliertz le dessine avec les deux seules boîtes que la page affiche : html et body. L'épaisse bordure de html est le fantôme, et le trou qu'elle laisse au milieu contient les yeux. body est un carré jaune de 30px qui coupe ce trou en deux, et ses quatre ombres sont les pieds.

Cochez **Couleurs pédagogiques** pour voir body par-dessus la bordure de html, et les ombres qui sortent de body.

{% include animations/2026-07-04.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                            /* html, head, style, body */
  border: solid 5vh;           /* pleine, 15px */
  color: EFEB99;               /* jaune, sans # (mode quirks) */
  background: #D35C72;         /* rose : html peint tout le canevas */
  margin: -2 20-8 20           /* body : 2px plus haut, 20px de chaque côté */
}
& {                            /* la racine : html */
  margin: 40 130 100;          /* boîte de (130, 40) à (270, 200) */
  border-width: 30 50 110 20;  /* le cadre ; il reste un trou de 70 × 20 */
  * {                          /* descendants de html : seul body s'affiche */
    box-shadow:
      -5ch 33vw,               /* −40px 132px : (130, 200) */
      5ch 33vw,                /*  40px 132px : (210, 200) */
      -11q 9lh,                /* −10,39px 162px : (159,6 ; 230) */
      74q 9lh                  /*  69,92px 162px : (239,9 ; 230) */
```

## Comment ça marche

### 1. Seulement html et body

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité veut dire des px dans `margin` et `border-width`. Le code est un `<style>` seul, jamais fermé. La page contient html, head, le style et body, et seuls html et body sont affichés.

`*` vise les quatre. Un `&` seul, hors de toute règle, vise la racine : html. Sa règle l'emporte sur `*` : html reçoit sa propre marge et ses propres largeurs de bordure, et garde le reste de `*`.

### 2. La boîte de html

html reçoit `margin:40 130 100` : 40 en haut, 130 de chaque côté, 100 en bas. En mode quirks, html remplit la fenêtre moins ses marges : 400 − 260 = 140px de large, 300 − 140 = 160px de haut. getBoundingClientRect le place en (130, 40), 140 × 160 : il s'arrête en x = 270 et y = 200.

Le `background` rose de html peint tout le canevas, pas seulement sa boîte : le fond de la racine le fait toujours.

### 3. Le cadre et son trou

`*` donne à html `border:solid`, et une bordure prend par défaut la couleur du texte. `color:EFEB99` n'a pas de `#` : le mode quirks accepte une couleur hexadécimale sans lui dans `color`. La bordure est jaune pâle.

`border-width:30 50 110 20` remplace les 15px de `*` : 30 en haut, 50 à droite, 110 en bas, 20 à gauche. Le cadre est le corps du fantôme. Il reste au milieu un trou rose, de x = 130 + 20 = 150 à 270 − 50 = 220, et de y = 40 + 30 = 70 à 200 − 110 = 90 : 70 × 20.

### 4. body coupe le trou en deux

body est dans ce trou, la boîte de contenu de html. Il n'a pas de contenu, il n'est donc que sa bordure : `5vh` vaut 5 % de 300, 15px de chaque côté. Ses marges de 20px sur les côtés lui laissent 70 − 40 = 30px, juste ses deux bordures. getBoundingClientRect donne un carré de 30 × 30 en (170, 68).

La marge du haut, −2, le remonte de y = 70 à 68. body couvre le trou de x = 170 à 200 et déborde un peu dans le cadre jaune. Il reste du trou deux yeux roses de 20px : de x = 150 à 170 et de 200 à 220.

La marge du bas, −8, garde html à 160px. La boîte de marge de body fait −2 + 30 − 8 = 20px de haut, la hauteur du trou : html ne grandit pas.

### 5. Quatre ombres

Le `*` imbriqué dans `&` vise les descendants de html : head, le style et body. Seul body est affiché, donc seules ses ombres se voient. Une ombre sans couleur prend la couleur du texte : jaune. Sans flou ni étalement, chacune est une copie du carré de 30px de body, déplacée de son décalage.

`5ch` vaut cinq largeurs du « 0 » de la police par défaut : 40px. `33vw` vaut 33 % de 400 : 132px. Depuis le coin de body en (170, 68), les deux premières ombres tombent en (130, 200) et (210, 200), juste sous le cadre de html.

`9lh` vaut neuf lignes de la hauteur de ligne par défaut, 18px ici : 162px, donc y = 230. 1Q vaut un quart de millimètre, 0,945px : `-11q` vaut −10,39px et `74q` 69,92px. Les deux dernières ombres vont de x = 159,6 à 189,6 et de 239,9 à 269,9. Chacune touche une ombre de la première rangée par un coin : les pieds forment un damier.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- Les deux yeux ne coûtent aucun élément. Ce sont les restes du trou dans le cadre de html, une fois que body en couvre le milieu.
- `-2` remonte body pour que des unités courtes tombent juste. Avec body en y = 70, les ombres demandent 130px et 160px : `margin:0 20-10 20` avec `130px` et `160px` donne la même image en 176 caractères.
- Le −8 n'est pas décoratif. Avec `margin:-2 20 0` (167 caractères), la boîte de marge de body fait 28px de haut. Le trou, les yeux et html grandissent tous de 8px, et 960 pixels changent.
- Des unités courtes pour chaque décalage. `5ch` vaut 40px en 3 caractères, `33vw` 132px en 4, `9lh` 162px en 3, et `5vh` 15px en 3. Écrire `40px`, `132px`, `162px` ou `15px` à la place donne la même image en 172, 171, 172 et 171 caractères.
- `-11q` et `74q` ont un caractère de moins que `-10px` et `70px`. Ils placent les bords des pieds à 0,39px et 0,08px de la grille des pixels. Avec `-10px` et `70px` (172 caractères), 120 pixels changent dans mon Chrome : les quatre colonnes des bords gauche et droit des pieds, x = 159, 189, 239 et 269, que les valeurs en q mélangent au rose.
- Pas de `#` dans `color:EFEB99`. Avec, le code fait 171 caractères, pour la même image. Le `#` reste dans `background` : dans mon Chrome, `background:D35C72` (169 caractères) est rejeté, le canevas devient blanc, et 94 860 pixels changent.
- `&` vise html en 1 caractère. `html` donne la même image en 173.
- Les ombres sont imbriquées dans `&`, donc html ne les reçoit pas. `}body{` à la place de `;*{` donne la même image en 173 caractères. Les mettre dans la règle `*` du haut (168 caractères) donne aussi les quatre ombres à html, et 23 640 pixels changent.
- `margin:40 130 100` utilise trois valeurs : la marge gauche copie la droite. `40 130 100 130` donne la même image en 174 caractères.
- Pas d'espace dans `20-8`. Avec l'espace, le code fait 171 caractères, pour la même image.
- Rien n'est fermé. `}}</style>` à la fin donne 180 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 1 522 pixels, avec la même règle que dans les notes de golf. 110 d'entre eux sont dans les quatre colonnes mélangées des bords des pieds : avec `-10px` et `70px`, l'écart tombe à 1 412. Les 1 412 autres sont tous à 6px au plus d'un bord entre le rose et le jaune. La cible est un JPEG : elle a 375 couleurs différentes, mon rendu 6, et son jaune uni est `#f0eb99`. Le juge de CSS Battle donne au code 100 % de correspondance.
