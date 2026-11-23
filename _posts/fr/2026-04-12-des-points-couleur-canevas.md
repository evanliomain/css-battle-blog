---
title: "Des points couleur canevas : trois barres échancrées en 136 caractères"
ref: 2026-04-12
permalink: /fr/2026/04/12/des-points-couleur-canevas/
description: "Comment trois ombres d'un html de 40px de large font trois barres sombres, et comment la bordure pointillée de body, aux points de 80px couleur canevas, y creuse les encoches, dans la cible CSS Battle du 12 avril 2026."
target: /assets/targets/2026-04-12.png
target_url: https://cssbattle.dev/play/aR15oOvIfB1V91KhsWH0
colors: ["#f3ac3c", "#442929"]
player: kieron
chars: 136
score: 709.43
match: 100
code: |
  <style>&{margin:65 210 65 150;color:442929;box-shadow:-5ch 0,5ch 0,25vw 0;*{background:#f3ac3c;margin:40-300-90;border:5pc dotted#F3AC3C
---

La cible du 12 avril montre trois barres brun foncé sur un canevas orange, avec des encoches en demi-disque : une entre les deux premières barres, creusée dans les deux, et une sur le côté droit de la troisième. Kieron fait de html une boîte de 40px de large et lui donne trois ombres : ce sont les barres, et html lui-même est l'écart entre les deux premières. body reçoit une bordure pointillée de 80px d'épaisseur. Ses points sont des disques de 80px, couleur canevas : là où ils croisent les barres, ils creusent les encoches.

Avec **Vue large**, on voit body en entier, 640px de large, avec ses dix points. Avec **Couleurs pédagogiques**, les ombres et les points prennent leur propre couleur.

{% include animations/2026-04-12.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                              /* premier niveau : la racine, html */
  margin: 65 210 65 150;         /* html : 40 × 170 en (150, 65) */
  color: 442929;                 /* brun foncé, sans # (mode quirks) */
  box-shadow:
    -5ch 0,                      /* barre en x = 110 (5ch = 40px dans mon Chrome) */
    5ch 0,                       /* barre en x = 190 */
    25vw 0;                      /* barre en x = 250 (25vw = 100px) */
  * {                            /* & * : body (head et style ne s'affichent pas) */
    background: #f3ac3c;         /* passe au canevas */
    margin: 40-300-90;           /* body : 640 × 220 en (-150, 105) */
    border: 5pc dotted #F3AC3C;  /* points de 80px, couleur canevas */
    /* la fin du code ferme les règles */
```

## Comment ça marche

### 1. `&` est html, `*` est body

Au premier niveau d'une feuille de style, le sélecteur d'imbrication `&` vise la racine : html. À l'intérieur, `*` vaut `& *` : tout élément placé dans html, donc head, style et body. head et style ne s'affichent pas : seul body compte. getComputedStyle le confirme : html a la marge de la première règle, body la marge et la bordure de la seconde.

### 2. html : 40 × 170

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, où les longueurs sans unité dans les marges comptent comme des pixels.

`margin:65 210 65 150` donne 65 en haut et en bas, 210 à droite, 150 à gauche. html fait 400 − 150 − 210 = 40px de large. En mode quirks, html s'étire sur la hauteur de la fenêtre, moins ses marges : 300 − 65 − 65 = 170. getBoundingClientRect donne 150, 65, 40 × 170.

### 3. Trois ombres, trois barres

`color:442929` n'a pas de `#`. Le mode quirks accepte une couleur hexadécimale sans son `#` pour `color` : getComputedStyle donne rgb(68, 41, 41). Une ombre sans couleur propre prend celle du texte : les trois ombres sont en #442929.

Une ombre est une copie de la boîte, décalée. `5ch` vaut cinq fois la largeur du chiffre 0 dans la police courante : 40px dans mon Chrome. `25vw` vaut un quart de la fenêtre de 400px : 100px. Les copies se posent en x = 150 − 40 = 110, 150 + 40 = 190 et 150 + 100 = 250, chacune en 40 × 170, de y = 65 à 235. La cible place ses barres en x = 110, 190 et 250, de y = 65 à 235.

Une ombre extérieure n'est jamais peinte sous sa propre boîte. De x = 150 à 190, html ne montre rien : c'est l'écart entre les deux premières barres.

### 4. Le fond de body peint le canevas

body a `background:#f3ac3c`. html n'a pas de fond : le navigateur prend celui de body pour tout le canevas, et ne le peint pas sur la boîte de body.

Ça compte ici, car la boîte de body couvre les barres. Si html reçoit lui aussi un fond (`&{background:#f3ac3c;…`, 155 caractères), body garde son propre fond et le peint sur sa boîte, à partir de y = 105 : les barres disparaissent sous cette ligne, et 12 798 pixels changent.

### 5. body : 640 × 220, centré sur html

body se place dans le contenu de html : 40 × 170 en (150, 65). `margin:40-300-90` donne 40 en haut, −300 à gauche et à droite, −90 en bas. Les signes moins commencent de nouveaux nombres : pas besoin d'espaces.

Le haut : 65 + 40 = 105. Les marges latérales négatives élargissent body : 40 + 300 + 300 = 640px, à partir de x = 150 − 300 = −150. Son milieu est en −150 + 640 / 2 = 170, celui de html. En mode quirks, body s'étire sur la hauteur de html moins ses marges : 170 − 40 + 90 = 220. getBoundingClientRect donne −150, 105, 640 × 220.

### 6. Une bordure de points de 80px

`border:5pc dotted#F3AC3C` : 1pc vaut 16px, donc 5pc font 80px. Une bordure pointillée aussi épaisse dessine des points ronds de 80px de large.

Pour les voir tous, j'ai rendu une boîte de 640 × 220 avec la même bordure, en rouge. En haut, mon Chrome pose cinq disques : un à chaque coin, avec des écarts de (640 − 5 × 80) / 4 = 60px, soit un disque tous les 140px. Sur body, leurs centres sont en x = −110, 30, 170, 310 et 450, en y = 105 + 40 = 145. La rangée du bas est pareille, en y = 285. Les côtés gauche et droit font 220px de haut : rien ne tient entre les disques des coins.

### 7. Des points couleur canevas

Les points sont en `#F3AC3C`, la couleur du canevas. Sur le canevas, on ne les voit pas. La bordure de body est peinte après les ombres de html : là où un disque croise une barre, il la recouvre d'orange.

Le disque en (170, 145) va de x = 130 à 210 : il entame le côté droit de la première barre (x = 130 à 150) et le côté gauche de la seconde (x = 190 à 210). Le disque en (310, 145) va de x = 270 à 350 et entame la troisième barre à partir de x = 270. Le disque en (30, 145) ne touche aucune barre. Les encoches de la cible sont les mêmes : des cercles de rayon 40 centrés en (170, 145) et (310, 145).

La rangée du bas commence en y = 105 + 220 − 80 = 245, 10px sous la fin des barres, en y = 235.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&` et un `*` imbriqué sont plus courts que nommer les deux éléments. Avec `html{…}body{…` (142 caractères), l'image est la même.
- La couleur est écrite une fois, comme couleur du texte, et les trois ombres la prennent. Avec `#442929` dans chaque ombre et sans `color` (144 caractères), l'image est la même.
- `442929` n'a pas besoin de `#` en mode quirks. Avec `color:#442929` (137 caractères), l'image est la même.
- `-5ch` et `5ch` font 4 et 3 caractères, `-40px` et `40px` 5 et 4. Avec `-40px 0,40px 0` (138 caractères), l'image est la même.
- `25vw` fait 4 caractères, `100px` 5. Avec `100px` (137 caractères), l'image est la même.
- `5pc` fait 3 caractères, `80px` 4. Avec `80px` (137 caractères), l'image est la même.
- Le mode quirks lit les marges sans unité comme des px. Avec `65px 210px 65px 150px` et `40px -300px -90px` (152 caractères), l'image est la même.
- `40-300-90` n'a pas besoin d'espaces : chaque moins commence un nouveau nombre. Avec `40 -300 -90` (138 caractères), l'image est la même.
- `dotted#F3AC3C` n'a pas besoin d'espace avant le `#`. Avec `dotted #F3AC3C` (137 caractères), l'image est la même.
- La couleur de la bordure compte. Sans elle (`border:5pc dotted`, 129 caractères), les points prennent la couleur du texte, #442929 : des disques sombres, plus d'encoches, 25 830 pixels changent.
- La marge du bas écarte la rangée de points du bas des barres. Sans elle (`margin:40-300`, 133 caractères), body ne fait que 160px de haut, html passe à 240px, et la rangée du bas tombe sur les barres : 9 086 pixels changent. Avec `-80`, la rangée commence en y = 235, là où finissent les barres, et l'image est la même. Avec `-70`, elle commence en y = 225 : 57 pixels changent.
- Les marges latérales règlent l'écart entre les points. Avec `-310`, body fait 660px de large, les disques sont espacés de 145px, celui du milieu reste en x = 170 et l'encoche de la troisième barre commence en x = 275 au lieu de 270 : 404 pixels changent.
- Le code se termine dans les règles : la fin du code les ferme. Avec `}}` à la fin (138 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire ces lignes), le code officiel dessine les mêmes formes que la cible. 240 pixels diffèrent de la cible de plus de 8 sur un canal, tous sur les bords des deux disques orange, à moins de 1,2px de leurs cercles : les mêmes pixels de bord y prennent une autre nuance d'orange et de brun. Le juge de CSS Battle donne au code officiel 100 % de ressemblance.
