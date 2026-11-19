---
title: "Une bordure, zoomée par 2,5 : quatre barres jaunes en 96 caractères"
ref: 2026-04-25
permalink: /fr/2026/04/25/une-bordure-zoomee-par-2-5/
description: "Comment un seul border-inline donne deux fines barres à html et deux carrés à body, comment le zoom change 40px en 100px, et comment le mode quirks étire les deux boîtes jusqu'à la même ligne, dans la cible CSS Battle du 25 avril 2026."
target: /assets/targets/2026-04-25.png
target_url: https://cssbattle.dev/play/RMGHENh8x6ivd5cqi2tK
colors: ["#f7ec7d", "#405c48"]
player: wi328v9RQHXQ73SxzWKIKa6m6jg1
chars: 96
score: 760.21
match: 100
code: |
   <style>*{border-inline:solid 5ch#F7EC7D;margin:5%44;*{margin:64 4 0;zoom:2.5;background:#405C48
---

La cible du 25 avril, ce sont quatre rectangles jaunes sur un fond vert sombre : deux hautes barres fines aux extrémités, et deux carrés entre elles, posés sur la même ligne en bas. James Whitehead les dessine avec une seule déclaration de bordure. Elle donne à html ses deux barres. body reçoit la même bordure, mais `zoom:2.5` la fait passer de 40px à 100px de large : ce sont les deux carrés.

Avec **Couleurs pédagogiques**, les bordures de html et de body prennent chacune leur couleur, et l'animation montre body avant et pendant le zoom.

{% include animations/2026-04-25.html lang=page.lang %}

## Le code, aéré

```css
&nbsp;<style>                      /* une vraie espace insécable : 1 caractère */
* {                                /* tous les éléments : html, head, style, body */
  border-inline: solid 5ch#F7EC7D; /* bordures gauche et droite, 5ch = 40px */
  margin: 5%44;                    /* 20 en haut et en bas, 44 sur les côtés */
  * {                              /* tout élément dans un autre : tous sauf html */
    margin: 64 4 0;                /* remplace 5%44 */
    zoom: 2.5;                     /* tout sur body × 2,5 */
    background: #405C48            /* celui de body, passé au canevas */
/* la fin du code ferme les deux règles */
```

## Comment ça marche

### 1. Une espace insécable et deux règles

Le code commence par une espace insécable. Pour le parseur, ce n'est pas un blanc : elle ouvre body et y entre comme du texte, et le `<style>` va dans body lui aussi. Il n'y a pas de doctype, donc la page est en mode quirks : un nombre seul comme `44` dans une marge est lu en px.

`*` vise tous les éléments : html, head, style et body. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre, donc tous sauf html. Les deux sélecteurs ont la même spécificité, zéro : sur head, style et body, la règle imbriquée gagne là où les deux se contredisent. `margin:64 4 0` remplace `margin:5%44`. head et style ne s'affichent pas. Il reste deux boîtes : html et body.

### 2. Le canevas vert

`background:#405C48` n'est que dans la règle imbriquée. Dans mon Chrome, getComputedStyle donne à html un fond transparent et à body `rgb(64, 92, 72)`. Quand html n'a pas de fond, celui de body passe sur tout le canevas. Tous les pixels qu'aucune bordure ne couvre sont en `#405c48`.

### 3. La boîte de html

html garde `margin:5%44`. Un pourcentage de marge se prend sur la largeur du bloc conteneur, ici le canevas de 400px : 5 %, c'est 20px, en haut et en bas. Les côtés reçoivent 44px.

En mode quirks, html s'étire sur la hauteur du canevas, moins ses marges : 300 − 2 × 20 = 260. getBoundingClientRect donne à html la boîte (44, 20), 312 × 260.

### 4. Les deux bordures de html

`border-inline:solid 5ch#F7EC7D` ne pose que les bordures gauche et droite. `5ch`, c'est cinq fois la largeur d'un « 0 ». Dans la police par défaut de mon Chrome, Times en 16px, un « 0 » fait 8px de large : getComputedStyle donne 40px. Les deux barres font 40 × 260 : de x = 44 à 84, et de x = 316 à 356, de y = 20 à 280. Entre elles, le contenu de html fait 312 − 80 = 232 de large.

### 5. body, zoomé

La règle du dehors vise aussi body : il reçoit la même bordure. La règle imbriquée lui donne `margin:64 4 0` et `zoom:2.5`. Le zoom multiplie toutes les longueurs de body : les marges deviennent 64 × 2,5 = 160 en haut et 4 × 2,5 = 10 sur les côtés, et les bordures 40 × 2,5 = 100.

body commence en x = 84 + 10 = 94 et y = 20 + 160 = 180. Les 160 s'ajoutent aux 20 de html : les marges de l'élément racine ne fusionnent jamais. body fait 232 − 2 × 10 = 212 de large. En mode quirks, body s'étire jusqu'au bas du contenu de html : 260 − 160 = 100 de haut. getBoundingClientRect donne (94, 180), 212 × 100.

Ses deux bordures sont des carrés de 100 × 100 : de x = 94 à 194 et de x = 206 à 306, de y = 180 à 280. Ils sont posés sur la même ligne que les barres de html, en y = 280.

Sans le zoom (87 caractères), body est en (88, 84), 224 × 196, ses bordures font 40px de large, et 22 080 pixels changent.

### 6. L'écart

Le contenu de body, c'est ce que ses bordures laissent : 212 − 2 × 100 = 12px. C'est l'écart vert entre les deux carrés. L'espace insécable s'y trouve, sur une ligne : une plage de texte autour d'elle mesure 10 × 46 à l'écran, et elle ne peint rien.

Le jaune fait le compte : 2 × 40 × 260 + 2 × 100 × 100 = 40 800 pixels, le nombre de mon rendu et de la cible.

## Notes de golf

Plus bas, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule déclaration de bordure sert aux deux boîtes : la règle imbriquée est dans la règle `*{`, qui vise aussi body. Avec deux règles, `html{border-inline:solid 5ch#F7EC7D;margin:5%44}body{border-inline:solid 5ch#F7EC7D;margin:64 4 0;zoom:2.5;background:#405C48` (133 caractères), l'image est la même.
- `zoom:2.5` change la bordure de 40px en 100px, et agrandit aussi les marges. Sans lui, avec `margin:160 10 0;border-inline-width:100px` (115 caractères), l'image est la même.
- `5%44` fait 4 caractères : 5 % des 400px de large, c'est 20, et il ne faut pas d'espace après `%`. Avec `20 44` (97 caractères), l'image est la même.
- `5ch` fait 3 caractères, `40px` en fait 4. Avec `40px` (97 caractères), l'image est la même : le zoom agrandit aussi les px.
- Pas d'espace avant un `#`. Avec `solid 5ch #F7EC7D` (97 caractères), l'image est la même.
- Le `0` de `margin:64 4 0` laisse la marge basse de body à zéro. Avec `margin:64 4` (94 caractères), la marge basse fait aussi 64 × 2,5 = 160, body se réduit à sa ligne de texte, 46px de haut, html grandit jusqu'à 366px, ses barres dépassent le bas du canevas, et 12 400 pixels changent.
- L'espace insécable empêche body d'être vide. Sans elle (95 caractères), mon Chrome donne 420px de haut à html : ses barres dépassent le bas du canevas, et 1 600 pixels changent. Une espace normale (96 caractères) fait pareil : le parseur la supprime, et les mêmes 1 600 pixels changent. Un `.` (96 caractères) garde la mise en page, mais le point se voit dans l'écart, et 26 pixels changent.
- Les nombres seuls et les boîtes étirées ont besoin du mode quirks. Avec `<!doctype html>` devant (111 caractères), `margin:5%44` et `margin:64 4 0` sont ignorées, html n'a plus de marge et fait 86px de haut, body garde sa marge de 8px par défaut, et 52 464 pixels changent.
- Les deux règles et le `<style>` ne sont jamais fermés. Avec `}}` à la fin (98 caractères), l'image est la même.
