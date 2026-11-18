---
title: "Un même 8ex, deux longueurs : un T de quatre disques en 142 caractères"
ref: 2026-05-18
permalink: /fr/2026/05/18/un-meme-8ex-deux-longueurs/
description: "Comment une seule liste d'ombres dessine les traits et les disques : sur html, 8ex vaut environ 57px ; sur body, avec une police à 204 %, il est environ deux fois plus long, dans la cible CSS Battle du 18 mai 2026."
target: /assets/targets/2026-05-18.png
target_url: https://cssbattle.dev/play/8AKCdxcq4QdnUefpzbvT
colors: ["#9ff0fb", "#3f8ba6"]
player: emohdaziz
chars: 142
score: 703.34
match: 100
code: |
  <style>*{color:3F8BA6;box-shadow:inset 9in 0,8ex 0,-8ex 0,0 8ex;margin:75 185 195;*{background:#9ff0fb;border-radius:50%;margin:-35;font:204%"
---

La cible du 18 mai montre quatre disques bleu-vert foncé en T, trois en ligne et un sous celui du milieu, reliés par de courts traits, sur un fond bleu ciel. Mohamed Ali la dessine avec html et body, et une seule liste d'ombres que les deux reçoivent. Ses décalages sont en `ex`, qui suit la taille de la police. html garde la police par défaut, et ses ombres sont les traits. body reçoit une police environ deux fois plus grande, et les mêmes ombres deviennent les disques.

Avec les **Couleurs pédagogiques**, les ombres de html et celles de body ont chacune leur couleur.

{% include animations/2026-05-18.html lang=page.lang %}

## Le code, aéré

```css
<style>                    /* va dans head */
* {                        /* html, head, style, body */
  color: 3F8BA6;           /* sans dièse : mode quirks */
  box-shadow:
    inset 9in 0,           /* remplit la boîte */
    8ex 0,                 /* une copie à droite */
    -8ex 0,                /* une copie à gauche */
    0 8ex;                 /* une copie en dessous */
  margin: 75 185 195;      /* html : 30 × 30 en (185, 75) */
  * {                      /* head, style, body */
    background: #9ff0fb;   /* passe au canevas */
    border-radius: 50%;    /* body : un disque */
    margin: -35;           /* body : 100 × 100 en (150, 40) */
    font: 204% "           /* 32,64px : un ex plus grand */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `75` dans une marge est lu en px.

Le `<style>` va dans head, et body reste vide. `*` vise html, head, style et body. Le `*{` imbriqué vise tous les éléments placés dans un autre : head, style et body. head et style ne s'affichent pas. Il reste deux boîtes : html et body. Les règles ne sont jamais fermées : la fin du code les ferme.

Le premier niveau donne aux deux boîtes une couleur, une liste d'ombres et une marge. Le second niveau donne à body un fond, des coins ronds, une autre marge et une police.

### 2. Un canevas bleu ciel

body reçoit `background:#9ff0fb`. html n'a pas de fond. Dans ce cas, le fond de body passe au canevas, et tout le canevas est bleu ciel.

### 3. Deux marges, deux carrés

html reçoit `margin:75 185 195` : 75px en haut, 185px à gauche et à droite, 195px en bas. En mode quirks, html remplit la page moins ses marges : 400 − 370 = 30 de large, 300 − 270 = 30 de haut, en (185, 75).

body reçoit aussi cette marge, mais la règle imbriquée lui donne `margin:-35`. Les deux sélecteurs ont le même poids, et l'imbriqué vient en dernier : il gagne. Une marge négative fait déborder body de html, de 35px de chaque côté. En mode quirks, body remplit aussi la hauteur de html. body fait 30 + 70 = 100 de large et 100 de haut, en (150, 40).

### 4. Une couleur sans dièse

En mode quirks, `color` accepte une couleur hexadécimale sans son `#` : `3F8BA6` vaut `#3F8BA6`, un bleu-vert foncé. Les ombres ne donnent pas de couleur : elles prennent celle de l'élément. html et body la reçoivent tous les deux du premier niveau.

### 5. L'ombre inset remplit la boîte

Une ombre inset se peint dans la boîte, tout autour d'un trou de la taille de la boîte. Le décalage déplace le trou. `inset 9in 0` le déplace de 864px vers la droite (1in = 96px). Le trou sort complètement de la boîte, et toute la boîte est peinte.

Sur html, cela remplit le carré de 30 × 30. Sur body, l'ombre suit les coins ronds : `border-radius:50%` fait de la boîte de 100 × 100 un disque, et l'ombre inset remplit le disque. C'est le disque du milieu.

### 6. Trois copies à 8ex

Les trois autres ombres copient la boîte 8ex à droite, 8ex à gauche et 8ex en dessous. `ex` est la hauteur d'x de la police de l'élément : le même `8ex` donne une longueur différente sur chaque boîte.

html garde la police par défaut, du Times de 16px. Dans mon Chrome, son 8ex vaut 57,44px, donc 1ex vaut 7,18px. Ses trois copies sont des carrés de 30 × 30 : x = 127,56 à 157,56 et 242,44 à 272,44 pour y = 75 à 105, et y = 132,44 à 162,44 pour x = 185 à 215. Ce sont les trois traits du T.

Sur body, les trois mêmes ombres copient le disque. Le disque et ses copies sont peints après les ombres de html : ils couvrent les bouts des traits. Seuls 20px de chaque trait se voient, entre deux disques.

### 7. La police règle l'ex de body

`font:204%"` donne à body 204 % de 16px : 32,64px. Le raccourci `font` exige un nom de police. Le `"` ouvre une chaîne, et la fin du code la ferme : le nom est vide. Dans mon Chrome, l'ex de body vaut 0,4487 fois la taille de sa police, le même rapport que sur html : body garde lui aussi la police par défaut.

La cible place les disques à 120px l'un de l'autre : x = 30, 150 et 270 pour la rangée du haut, y = 160 pour le disque du bas. Dans mon Chrome, le 8ex de body vaut 117,17px, un peu moins : voir la dernière section. Les quatre disques et les trois traits forment le T.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres pour deux boîtes. `ex` la met à l'échelle de la police. Avec une seconde liste sur body en longueurs fixes, `box-shadow:inset 9in 0,30vw 0,-30vw 0,0 30vw` à la place de `font:204%"` (176 caractères), les disques sont aussi à 120px l'un de l'autre, mais le code fait 34 caractères de plus.
- La police est nécessaire. Sans `;font:204%"` (131 caractères), le 8ex de body vaut celui de html, 57,44px : les quatre disques s'entassent, et 24 736 pixels changent.
- `font:204%"` est la façon la plus courte de régler la taille. Avec `font-size:204%` (146 caractères), l'image est la même. Le raccourci exige un nom de police, et `"` est le plus court. Avec une espace devant, `204% "` (143 caractères), l'image est la même.
- La couleur n'a pas de dièse, grâce au mode quirks. Avec `#3F8BA6` (143 caractères), l'image est la même. L'astuce ne marche pas dans le raccourci `background` : avec `background:9ff0fb` (141 caractères), mon Chrome l'ignore, le canevas reste blanc, et 87 382 pixels changent.
- `9in` fait 3 caractères et bien plus que les 100px de body. L'ombre inset est nécessaire : sans `inset 9in 0,` (130 caractères), le disque du milieu et le carré de html disparaissent, il ne reste que les copies, et 7 385 pixels changent.
- La marge négative fait du carré de 30px de html le carré de 100px de body, sans largeur ni hauteur.
- L'imbrication économise un sélecteur. Avec une règle séparée, `}* *{background…` (144 caractères), l'image est la même.
- Des nombres seuls, grâce au mode quirks. Avec `75px 185px 195px` et `-35px` (150 caractères), l'image est la même. Avec un doctype devant (157 caractères), mon Chrome ignore les nombres seuls et la couleur sans dièse : html fait 400 × 8, body 0px de haut, les ombres deviennent noires, et 38 065 pixels changent.

## Si vous l'essayez chez vous

Dans mon Chrome local (version 157 au moment d'écrire), le code officiel est proche mais pas exact au pixel. Le 8ex de body y vaut 117,17px, pas 120. Les disques extérieurs sont environ 3px trop près de celui du milieu : à y = 90, le T va de x = 33 à 367 dans mon rendu, de 30 à 370 dans la cible, et le disque du bas finit à y = 257 au lieu de 260. 2 094 pixels s'écartent de la cible de plus de 8 sur un canal, jusqu'à 101.

Avec `209%` à la place de `204%`, le 8ex de body vaut 120,01px dans mon Chrome, et les disques tombent là où la cible les place. Il reste 871 pixels, tous à moins de 2px du bord des disques, là où l'anticrénelage diffère. Le juge de CSS Battle donne au code officiel 100 % de correspondance. L'animation ci-dessus place les disques à 120px l'un de l'autre, comme dans la cible.
