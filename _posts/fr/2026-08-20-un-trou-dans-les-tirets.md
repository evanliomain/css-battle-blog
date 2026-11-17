---
title: "Un trou dans les tirets : une croix sur un globe en 123 caractères"
ref: 2026-08-20
permalink: /fr/2026/08/20/un-trou-dans-les-tirets/
description: "Comment une seule déclaration border avec une valeur de secours dans var() donne à html une bordure rose de 180px autour d'une barre verte, et au body une bordure de 40px en tirets bleu nuit, dont les trous et un clip-path circle() font le disque, pour la cible CSS Battle du 20 août 2026."
target: /assets/targets/2026-08-20.png
target_url: https://cssbattle.dev/play/7lcu3rTkviI1UxocQlAN
colors: ["#6d8178", "#eed9d9", "#394257"]
player: eguiluz
chars: 123
score: 723.86
match: 100
code: |
  <style>*{background:#6d8178;border:var(--b,45vw#eed9d9)dashed;margin:-130 0;*{--b:5ch#394257;margin:40-80;clip-path:circle(
---

La cible du 20 août est un petit disque bleu nuit sur fond rose pâle, traversé par une croix vert-gris à la longue barre verticale. David Eguiluz la dessine avec deux boîtes et une seule déclaration `border`. Sur `html`, une bordure rose de 180px ne laisse qu'une fine barre verte au milieu. Sur le body, la même déclaration devient une bordure de 40px en tirets bleu nuit : un trou en haut et un en bas font passer la barre à travers le disque. Un `clip-path:circle()` découpe le body en disque.

Cochez **Couleurs pédagogiques** pour distinguer le canevas, la bordure de `html`, le fond du body et ses tirets.

{% include animations/2026-08-20.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                   /* html, head, style, body */
  background: #6d8178;
  border: var(--b, 45vw #eed9d9) dashed; /* html : 180px de rose ; body : --b */
  margin: -130 0;                     /* sans unité : des px en mode quirks */
  * {                                 /* head, style, body */
    --b: 5ch #394257;                 /* 40px de bleu nuit */
    margin: 40 -80;
    clip-path: circle();              /* fermée par la fin du code */
  }
}
```

## Comment ça marche

### 1. Deux boîtes

Il n'y a pas de doctype : la page est en mode quirks. Le navigateur construit `html`, `head`, le `style` (dans `head`) et `body`. `*` vise les quatre, et le `*` imbriqué vise `head`, `style` et `body`, les éléments placés dans un autre. `head` et `style` ne sont pas affichés. Il reste deux boîtes : `html`, avec la règle extérieure, et `body`, avec les deux règles. Le `margin` imbriqué vient après, donc il l'emporte dans le body. Le body garde le `background` et le `border` de la règle extérieure.

### 2. html : 400 × 560

`margin:-130 0` n'a pas d'unité, et le mode quirks le lit en px : −130px en haut et en bas, 0 sur les côtés. En mode quirks, `html` remplit le cadre de 400 × 300 moins ses marges : 300 + 130 + 130 = 560px de haut, de y = −130 à 430, et 400px de large.

Son fond est vert. Le fond de l'élément racine est peint sur tout le canevas.

### 3. La valeur de secours de var() : 180px de rose

`border:var(--b,45vw#eed9d9)dashed` lit la propriété personnalisée `--b`. Seule la règle imbriquée la définit : `html` n'en a pas, et `var()` prend sa valeur de secours, `45vw#eed9d9`. 45vw, c'est 45 % des 400px de large : 180px. J'ai vérifié avec `180px` à la place de `45vw` : le rendu est le même.

180px de chaque côté laissent 400 − 360 = 40px en largeur et 560 − 360 = 200px en hauteur. Cette boîte de contenu va de x = 180 à 220 et de y = 50 à 250. Aucune bordure ne la couvre, et le vert du canevas s'y voit : c'est la barre verticale de la croix. Tout le reste du cadre est de la bordure rose.

Le style est `dashed`, mais dans mon Chrome cette bordure n'a aucun trou. J'ai rendu `html` avec `solid` à la place : chaque pixel est le même.

### 4. body : 200 × 120

Le body se place dans la boîte de contenu de `html` : 40 × 200, en (180 ; 50). `margin:40-80` donne 40px en haut et en bas, et −80px à gauche et à droite. Les marges latérales négatives le rendent plus large que son conteneur : 40 + 80 + 80 = 200px, de x = 100 à 300.

En mode quirks, le body remplit la hauteur de son conteneur moins ses marges : 200 − 40 − 40 = 120px, de y = 90 à 210. Son fond est le même vert.

### 5. --b sur le body : des tirets de 40px

Le body définit `--b:5ch#394257`, et la même déclaration `border` y devient `5ch #394257 dashed`. Le body garde la police par défaut, 16px en Times, où 1ch fait 8px dans mon rendu : 5ch font 40px. J'ai vérifié avec `40px` à la place de `5ch` : le rendu est le même.

Cette fois, les tirets se voient. Je les ai mesurés sur un rendu sans le `clip-path` :

- les côtés haut et bas, longs de 200px, ont un tiret de 80px, un trou de 40px et un tiret de 80px. Le trou va de x = 180 à 220 ;
- les côtés gauche et droit, longs de 120px, n'ont pas de trou.

Un trou laisse voir le fond du body, qui est vert. J'ai vérifié en donnant au body un fond rouge : les deux trous et le milieu deviennent rouges. Les deux trous tombent juste au-dessus et au-dessous de la barre de `html`, de x = 180 à 220 : la barre continue à travers le body.

Entre les bordures, la boîte de contenu fait 200 − 80 = 120px de large et 120 − 80 = 40px de haut, en (140 ; 130). Elle est verte aussi : c'est la barre horizontale.

### 6. clip-path : circle()

`circle()` sans argument est centré sur la boîte, et son rayon va jusqu'au côté le plus proche. La boîte du body fait 200 × 120, centrée en (200 ; 150), et ses côtés les plus proches sont le haut et le bas : le rayon vaut 120 / 2 = 60px. J'ai vérifié avec `circle(60px)` : le rendu est le même.

La parenthèse n'est jamais fermée : la fin du code la referme. J'ai vérifié avec `circle()` : le rendu est le même. Sans la parenthèse, `circle` seul n'est pas valide, la déclaration est ignorée et le body reste un rectangle.

Dans le disque, les tirets bleu nuit font les quatre coins, et les trous et le contenu verts font la croix. Au-dessus et au-dessous du disque, la barre est la boîte de contenu de `html`, qui va de y = 50 à 250 derrière le body.

## Notes de golf

- Une seule déclaration `border` sert aux deux éléments. `var(--b,…)` donne à `html` la valeur de secours, 180px de rose, et au body son propre `--b`, 40px de bleu nuit.
- `dashed` est là pour le body. Sur `html`, il se peint comme `solid` : partager la déclaration ne coûte rien.
- Les trous des tirets dessinent gratuitement la barre dans le disque.
- `background` dans la règle extérieure colore le canevas (par `html`) et le body.
- `circle()` n'a pas besoin de rayon : le côté le plus proche d'une boîte de 200 × 120 donne 60px.
- `45vw` vaut 180px en 4 caractères, `5ch` vaut 40px en 3.
- Pas d'espace autour de `#` ni après `)` : `45vw#eed9d9`, `5ch#394257`, `)dashed`.
- `margin:40-80` : le signe moins sépare les deux valeurs.
- Le mode quirks lit `-130 0` et `40-80` en px.
- `<style>`, les deux accolades et la parenthèse de `circle(` ne sont jamais fermés.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire ces lignes), les bords droits de la croix sont sur les mêmes pixels que dans la cible. Mais 111 260 pixels diffèrent de mon rendu. 102 811 d'entre eux sont dans l'aplat rose : (238 ; 217 ; 217) dans mon rendu, soit `#eed9d9`, et (237 ; 217 ; 216) dans la cible. Le fichier de la cible que j'ai est un JPEG. En tout, 104 948 pixels diffèrent d'un seul niveau. 1 539 pixels diffèrent de plus de 8 niveaux. Ils sont tous à moins de 8px d'un bord, entre x = 136 et 263. Le bord du disque n'est pas tout à fait au même endroit non plus : dans la cible, il couvre un peu plus en haut à gauche et un peu moins en bas à droite. Le plus grand écart est de 143 niveaux, en (228 ; 202), sur le bord du disque : mon rendu y est presque bleu nuit, la cible presque rose. Sur le juge de CSS Battle, le code est identique à 100 %.
