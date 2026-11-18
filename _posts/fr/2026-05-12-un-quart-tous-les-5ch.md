---
title: "Un quart tous les 5ch : un drapeau à demi rayé en 94 caractères"
ref: 2026-05-12
permalink: /fr/2026/05/12/un-quart-tous-les-5ch/
description: "Comment un seul dégradé conique, répété tous les 5ch, et une bordure couleur du canevas dessinent un rectangle crème à quatre fentes, dans la cible CSS Battle du 12 mai 2026."
target: /assets/targets/2026-05-12.png
target_url: https://cssbattle.dev/play/u41ymkGcksYMcCDGgmze
colors: ["#556d7f", "#f4dcbf"]
player: idunnosrw
chars: 94
score: 763.29
match: 100
code: |
  <style>&{background:conic-gradient(#556D7F 25%,#F4DCBF 0)0 5vw/100%5ch;border:64q solid#556D7F
---

La cible du 12 mai montre un rectangle crème sur un fond bleu-gris, comme un drapeau : la moitié gauche est pleine, la moitié droite est coupée en cinq bandes par quatre fentes bleues. iDunnoSRW la dessine avec une seule règle sur html. Un dégradé conique peint une tuile dont le quart en haut à droite est bleu, la tuile se répète tous les 5ch vers le bas, et une bordure couleur du canevas cache tout ce qui dépasse du rectangle.

Les **couleurs pédagogiques** montrent la bordure en orange et le quart bleu de chaque tuile en bleu clair : on voit les tuiles sous la bordure.

{% include animations/2026-05-12.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                                         /* au premier niveau : la racine, html */
  background:
    conic-gradient(#556D7F 25%, #F4DCBF 0)  /* le premier quart bleu, le reste crème */
    0 5vw                                   /* 0 de côté, 20px vers le bas */
    / 100% 5ch;                             /* tuile : 280 × 40 */
  border: 64q solid #556D7F                 /* un cadre de 60px couleur du canevas ; la fin du code ferme la règle */
```

## Comment ça marche

### 1. & est html

`&` vient de l'imbrication CSS. Hors de toute règle, il désigne la racine de la page : html. Le code n'a pas de doctype, la page est donc en mode quirks, et html remplit toute la fenêtre : mon Chrome le mesure à 400 × 300.

Le fond de html ne s'arrête pas à sa boîte : il est peint sur tout le canevas. Ça compte à l'étape 5.

### 2. Une bordure de 60px

`border:64q solid#556D7F` met une bordure sur les quatre côtés. 1q vaut un quart de millimètre, environ 0,945px, donc 64q ≈ 60,47px. Mon Chrome la dessine sur 60px.

Il reste à l'intérieur une boîte de 400 − 2 × 60 = 280 sur 300 − 2 × 60 = 180, en (60, 60). Un fond se cale sur cette boîte : sa taille et sa position comptent à partir d'elle.

### 3. Un dégradé conique : un quart bleu

`conic-gradient(#556D7F 25%,#F4DCBF 0)` part du haut de l'image et tourne autour de son centre, dans le sens des aiguilles d'une montre. De 0 à 25 %, soit de 0 à 90°, il est bleu. L'arrêt crème est à `0` : un arrêt ne peut pas venir avant le précédent, il est donc ramené à 25 %, et la limite entre les deux couleurs est nette. Les 75 % restants sont crème.

Sans taille, l'image couvre toute la boîte de 280 × 180. Son centre est en (200, 150), et la partie bleue est le quart en haut à droite : dans mon rendu de cette variante, x = 200 à 340 et y = 60 à 150.

### 4. Une tuile de 280 × 40, descendue de 20px

`/100%5ch` donne la taille de l'image. `100%` est toute la largeur de la boîte, 280px. `5ch` vaut cinq fois la largeur du chiffre 0. Dans mon Chrome, la police est Times en 16px, où 1ch fait 8px : 5ch = 40px. La tuile fait maintenant 280 × 40, et son quart bleu 140 × 20.

`0 5vw` la place : 0 de côté, et 5vw = 5 % de 400 = 20px vers le bas. La tuile va de y = 80 à 120. Son quart bleu, de (200, 80) à (340, 100), est la première fente.

### 5. Les tuiles se répètent, la bordure cache le reste

Un fond se répète dans les deux sens : une tuile tous les 40px vers le bas et tous les 280px de côté, et le fond de html couvre tout le canevas. Dans la boîte, la moitié gauche reste crème. La moitié droite alterne 20px de bleu et 20px de crème : les fentes sont en y = 80, 120, 160 et 200, et les cinq bandes crème en y = 60, 100, 140, 180 et 220, de 20px de haut chacune. La première bande est la moitié basse de la tuile du dessus, qui va de y = 40 à 80.

Hors de la boîte, les tuiles continuent, sous la bordure. Avec une bordure transparente (`#0000` à la place de `#556D7F`), mon rendu les montre sur tout le canevas, et 48 800 pixels changent. La bordure est dessinée par-dessus le fond, dans le même bleu que les fentes : elle cache les tuiles, et c'est elle, le bleu autour du rectangle.

Le décalage de 20px compte aussi. Avec `0 0` à la place de `0 5vw`, la tuile commence en y = 60 : les fentes et les bandes échangent leurs places dans la moitié droite, et 25 200 pixels changent.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&` écrit html en 1 caractère. Avec `html{` (97 caractères), l'image est la même. `*` a la même longueur, mais il vise aussi body, qui prend le même fond et la même bordure : avec `*{` (94 caractères), 30 144 pixels changent.
- `64q` écrit environ 60px en 3 caractères. Avec `60px` (95 caractères), l'image est la même.
- `5vw` écrit 20px en 3 caractères. Avec `20px` (95 caractères), l'image est la même.
- `5ch` écrit 40px en 3 caractères, ici dans mon Chrome. Avec `40px` (95 caractères), l'image est la même.
- `25%` écrit un quart de tour en 3 caractères. Avec `90deg` (96 caractères), l'image est la même.
- Le second arrêt à `0` donne la limite nette en 1 caractère. Avec `#F4DCBF 25%` (96 caractères), l'image est la même.
- Une seule bordure fait deux choses : le cadre bleu autour du rectangle, et cacher les tuiles qui se répètent hors de la boîte.
- Pas d'espace après `)`, après `100%` ni avant `#`. Avec les trois espaces, `0) 0 5vw/100% 5ch;border:64q solid #556D7F` (97 caractères), l'image est la même.
- Le code se termine dans la règle ouverte, et la fin du code la ferme. Avec `}` à la fin (95 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les bords du code officiel tombent sur les mêmes pixels que dans la cible. Mais les 120 000 pixels diffèrent tous de mon rendu. 111 040 d'entre eux sont des aplats à un niveau près : le bleu est (85, 109, 127) dans mon rendu, soit `#556d7f`, et (86, 109, 127) dans la cible ; le crème est (244, 220, 191), `#f4dcbf`, contre (244, 221, 190). Le fichier cible que j'ai est un JPEG : il a 111 couleurs différentes, mon rendu 2. 1 039 pixels diffèrent de plus de 8 niveaux, et tous sont à moins de 4px d'un bord. Le plus grand écart est de 26 niveaux, en (60, 60), le coin en haut à gauche du rectangle : crème dans mon rendu, (218, 213, 207) dans la cible. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
