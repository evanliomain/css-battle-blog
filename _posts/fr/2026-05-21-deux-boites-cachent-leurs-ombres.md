---
title: "Deux boîtes cachent leurs ombres : un escalier en 110 caractères"
ref: 2026-05-21
permalink: /fr/2026/05/21/deux-boites-cachent-leurs-ombres/
description: "Comment html et body partagent une liste de deux ombres, et comment chaque boîte cache la partie de ses ombres qui tombe sous elle, pour laisser un escalier beige et un L rouge brun, dans la cible CSS Battle du 21 mai 2026."
target: /assets/targets/2026-05-21.png
target_url: https://cssbattle.dev/play/ZMNdZsYU66TPkF9CTgqD
colors: ["#32360e", "#e8ad6d", "#a84a4b"]
player: emohdaziz
chars: 110
score: 740.2
match: 100
code: |
  <style>*{background:#32360e;margin:-30 35%90 20;box-shadow:127q 127q 0-63q#a84a4b,60px 60px#e8ad6d;*{margin:60
---

La cible du 21 mai est un escalier beige de quatre marches sur un vert très sombre, avec un L rouge brun dans le coin en bas à droite. Mohamed Ali utilise deux boîtes, html et body, et une seule liste de deux ombres que les deux reçoivent. Une ombre extérieure n'est jamais peinte sous sa propre boîte. Chaque boîte découpe donc un L dans son ombre beige, et html découpe aussi un L dans son ombre rouge.

Avec les **Couleurs pédagogiques**, chaque boîte et chaque ombre ont leur propre couleur. La **Vue large** montre le haut de la boîte de html, au-dessus du canevas.

{% include animations/2026-05-21.html lang=page.lang %}

## Le code, aéré

```css
<style>                     /* va dans head */
* {                         /* html, head, style, body */
  background: #32360e;      /* celui de html passe au canevas */
  margin: -30 35% 90 20;    /* html : 240 × 240 en (20, −30) */
  box-shadow:
    127q 127q 0 -63q #a84a4b,  /* à 120px, 59,53px plus petite par côté */
    60px 60px #e8ad6d;      /* à 60px, même taille */
  * {                       /* head, style, body */
    margin: 60              /* body : 120 × 120 en (80, 30) */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `60` dans une marge est lu en px.

Le `<style>` va dans head, et body reste vide. `*` vise html, head, style et body. Le `*{` imbriqué vise tous les éléments placés dans un autre : head, style et body. head et style ne s'affichent pas. Il reste deux boîtes : html et body. Les règles ne sont jamais fermées : la fin du code les ferme.

Le premier niveau donne aux deux boîtes le même fond et les deux mêmes ombres. Le second niveau remplace seulement la marge de body.

### 2. Un canevas vert très sombre

Le fond de html ne se peint pas dans sa boîte : il passe au canevas, qui devient vert très sombre partout. body peint sa propre boîte dans le même vert : elle ne se voit pas. Sans la déclaration `background` (91 caractères), le vert devient blanc : 84 000 pixels changent.

### 3. html : un carré de 240

html reçoit `margin:-30 35%90 20`. Une marge en pourcentage se calcule sur la largeur du bloc conteneur, même en haut et en bas : 35 % de 400 font 140px. html fait 400 − 140 − 20 = 240 de large, de x = 20 à 260.

En mode quirks, html remplit la hauteur de la page moins ses marges : 300 − (−30) − 90 = 240. html est un carré de 240 en (20, −30). Ses 30px du haut dépassent au-dessus du canevas.

### 4. L'ombre beige de html

`60px 60px#e8ad6d` copie la boîte de html, décalée de 60px vers la droite et de 60px vers le bas : un carré de 240 de (80, 30) à (320, 270).

Une ombre extérieure n'est peinte qu'en dehors de sa propre boîte. La boîte de html couvre tout ce qui est à gauche de x = 260 et au-dessus de y = 210. Il reste un L du carré beige : une colonne de x = 260 à 320 (y = 30 à 270), et une bande de y = 210 à 270 (x = 80 à 260).

### 5. L'ombre rouge de html

`127q` vaut 127 quarts de millimètre : 31,75 mm, soit exactement 1,25in, donc 120px. L'étalement `-63q` vaut −59,53px : il réduit le carré d'autant de chaque côté. 240 − 2 × 59,53 = 120,94. Le carré rouge va de 199,53 à 320,47, sur les deux axes.

L'ombre rouge vient en premier dans la liste : elle est peinte au-dessus de la beige. La boîte de html la coupe aussi. Il reste un L rouge brun : x = 260 à 320,47 à partir de y = 149,53, et y = 210 à 270,47 à partir de x = 199,53.

### 6. body : les mêmes ombres, une taille en dessous

body reçoit `margin:60`. En mode quirks, il remplit html moins ses marges : 240 − 120 = 120 dans les deux sens. body est un carré de 120 en (80, 30).

L'ombre beige est un carré de 120 en (140, 90). La boîte de body couvre sa partie en haut à gauche. Le reste forme deux marches de plus : x = 200 à 260 sur y = 90 à 150, et x = 140 à 260 sur y = 150 à 210. Sans les ombres de body (`;box-shadow:none` ajouté, 126 caractères), ces deux marches disparaissent : 10 800 pixels changent.

L'ombre rouge perd 59,53px de chaque côté d'une boîte de 120px : 120 − 119,06 = 0,945px. En quarts de millimètre, c'est 127q − 2 × 63q = 1q. C'est un point de (259,53, 209,53) à (260,47, 210,47), au-dessus de tout le reste. Un quart seulement tombe sur du beige, dans le pixel (259, 209), et le teinte. Avec la seule ombre beige sur body (`;box-shadow:60px 60px#e8ad6d` ajouté, 138 caractères), ce pixel change, et rien d'autre.

### 7. L'escalier

Les deux L beiges s'emboîtent en quatre marches de 60px : la marche du haut en x = 260, puis 200, 140 et 80, tous les 60px vers le bas à partir de y = 30. Le L rouge brun remplit le coin en bas à droite.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une liste d'ombres, deux boîtes. La règle `*` donne la liste à html et à body, et chaque boîte découpe sa propre copie. Le `*{margin:60` imbriqué change seulement la marge de body.
- L'imbrication économise un sélecteur. Avec une règle séparée, `}* *{margin:60` (112 caractères), l'image est la même.
- `127q` fait exactement 120px en 4 caractères. Avec `120px 120px` (112 caractères), l'image est la même.
- `-63q` fait 4 caractères, `-60px` en fait 5. Le carré rouge fait 0,94px de plus que 120px. Avec `0-60px` (111 caractères), ses quatre bords tombent sur des pixels entiers, et le point rouge de body disparaît : 364 pixels changent, 363 sur ces bords et le pixel (259, 209).
- Le flou `0` doit être là, pour que la longueur suivante soit lue comme l'étalement. `0-63q` n'a pas besoin d'espace : le signe moins commence un nouveau nombre.
- Pas d'espace avant un `#`. Avec `0-63q #a84a4b` et `60px #e8ad6d` (112 caractères), l'image est la même.
- `35%90` n'a pas besoin d'espace après le `%`. Avec `140 90` à la place de `35%90` (111 caractères), l'image est la même.
- Des nombres seuls, grâce au mode quirks. Avec `-30px 35% 90px 20px` et `60px` (119 caractères), l'image est la même. Avec un doctype devant (125 caractères), mon Chrome ignore les deux déclarations de marges et html ne remplit plus la hauteur : 38 003 pixels changent.

## Si vous l'essayez chez vous

L'image cible est un JPEG. Dans mon Chrome, mon rendu du code officiel en diffère sur 1 865 pixels, avec la règle des notes de golf. 363 d'entre eux sont sur les quatre bords du carré rouge : les colonnes x = 199 et x = 320 et les rangées y = 149 et y = 270. Ces bords tombent en 199,53, 320,47, 149,53 et 270,47 : ces pixels mélangent le rouge avec le beige ou le vert, là où la cible est nette. Avec `0-60px` à la place de `0-63q` (111 caractères), ces bords tombent sur des pixels entiers et il reste 1 509 pixels. Tous sont à 6 pixels au plus d'un bord : du bruit de compression autour des formes. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
