---
title: "Un dégradé, deux tailles : une pochette rose en 155 caractères"
lang: fr
ref: 2026-09-26
permalink: /fr/2026/09/26/un-degrade-deux-tailles/
description: "Comment un seul dégradé radial, mesuré en ex, dessine à la fois le fond et les deux ronds de la cible CSS Battle du 26 septembre 2026."
target: /assets/targets/2026-09-26.png
target_url: https://cssbattle.dev/play/cRbtp0spzhZ0a6BHgeqN
colors: ["#747992", "#eed9d9", "#394257"]
player: koda_pig
chars: 155
score: 691.3
match: 100
code: |
  <p> <style>p{zoom:.4;background:#394257}*{background:radial-gradient(1q,#747992 23ex,#EED9D9)166%-5q/70%;margin:50;+*{border-radius:0 0 53q 53q;font:1q/67'
---

La cible du 26 septembre est une forme rose sur un fond bleu-gris : carrée en haut, arrondie en bas, avec une bande bleu nuit le long de son bord haut et deux petits ronds bleu-gris. La solution de koda_pig donne le même dégradé radial à tous les éléments. Sur `html`, son cercle est si grand qu'il remplit le canevas. Sur le `body`, une police minuscule réduit ce même cercle en deux ronds. La bande bleu nuit est un paragraphe qui ne contient qu'une espace insécable.

Cochez **Couleurs pédagogiques** pour voir le cercle du dégradé dans un bleu plus clair.

{% include animations/2026-09-26.html lang=page.lang %}

## Le code, aéré

```css
<p>&nbsp;                         /* une vraie espace insécable : 1 caractère */
<style>
p {
  zoom: .4;                       /* marges de 20px, ligne d'environ 25px */
  background: #394257;            /* la bande bleu nuit */
}
* {
  background:
    radial-gradient(1q, #747992 23ex, #EED9D9)
    166% -5q / 70%;               /* position / largeur de la tuile */
  margin: 50;
  + * {                           /* le body */
    border-radius: 0 0 53q 53q;   /* 50,08px en bas */
    font: 1q / 67 '';             /* police de 0,94px, hauteur de ligne 67 */
  }
}
```

## Comment ça marche

### 1. Le dégradé de html couvre tout

`*` donne à tous les éléments `margin:50` et le même fond. `html` va de (50 ; 50) à (350 ; 250), et son fond sert pour tout le canevas.

Le fond est une tuile : `/70%` fixe sa largeur à 70 % de `html`, soit 210px. Sans hauteur, une tuile de dégradé prend la hauteur de la boîte : 200px. Dans chaque tuile, `radial-gradient(1q,…)` trace un cercle de rayon `1q`, 0,94px. La première couleur, `#747992`, va jusqu'à `23ex`. La seconde n'a pas de position : elle serait au bout du cercle, à 0,94px, mais un arrêt de couleur ne peut pas venir avant le précédent, il remonte donc lui aussi à `23ex`. Résultat : un disque bleu-gris net de rayon `23ex`, et du rose autour.

`ex` est la hauteur d'un petit « x » dans la police courante. Avec la police par défaut de 16px, il fait ici 7,18px : `23ex` font 165px. Le coin le plus loin d'une tuile de 210 × 200 est à 145px de son centre : le disque couvre toutes les tuiles, et le canevas est entièrement bleu-gris.

### 2. Le body, arrondi en bas

Imbriqué dans `*`, `+*` vise un élément qui vient juste après un autre : le `body`, juste après le `head`. Le `<p>` est le premier enfant du `body` : il n'est pas visé.

Le `body` a la même marge de 50px, dans `html` : il commence en (100 ; 100) et fait 200px de large. Sans doctype, la page est en mode quirks, et le `body` remplit la hauteur de `html` : 200 − 50 − 50 = 100px. `border-radius:0 0 53q 53q` arrondit ses deux coins bas de 50,08px. Son fond est le même dégradé : pour l'instant, il est bleu-gris lui aussi.

### 3. font:1q : le cercle rétrécit

`font:1q/67'` donne au `body` une police de 1q (0,94px), une hauteur de ligne de 67, et la famille `''` : la chaîne n'est jamais fermée, c'est la fin de la feuille de style qui la ferme.

`ex` suit la police. Avec une police de 0,94px, `23ex` ne font plus que 9,7px. Les tuiles du `body` font 70 % de 200 = 140px de large et 100px de haut, et chacune ne contient plus qu'un petit rond bleu-gris de rayon 9,7 en son centre, sur du rose.

### 4. 166% -5q : deux ronds

Une position de fond en % se calcule sur la place libre : la largeur de la boîte moins celle de la tuile. 166 % × (200 − 140) = 99,6px : la tuile commence 99,6px dans le `body`, et son rond est en x = 100 + 99,6 + 70 = 269,6. `-5q` remonte la tuile de 4,72px : le rond est en y = 145,28.

La tuile se répète. La précédente commence 140px plus à gauche : son rond est en x = 129,6. La suivante tombe après le bord droit du `body`. Ça fait les deux ronds.

### 5. Le p et son espace insécable

Entre `<p>` et `<style>`, il y a une espace insécable, pas une espace normale. Une espace normale seule dans un bloc disparaît, et le `<p>` ferait 0px de haut. Je l'ai vérifié : avec une espace normale, la bande disparaît. Une espace insécable reste : le `<p>` a une ligne.

Le `<p>` hérite de la police du `body`. Une hauteur de ligne donnée par un nombre se transmet telle quelle : 67 × 1q = 63,3px. `zoom:.4` réduit le `<p>` : la ligne fait environ 25px, et les marges de 50px deviennent 20px. La bande va de x = 120 à 280. Sa marge haute fusionne avec celle du `body` : elle commence en y = 100.

`p{…}` bat `*{…}`, parce qu'un sélecteur de balise est plus précis que `*` : le fond du `<p>` est bleu nuit, pas le dégradé.

## Notes de golf

- Un dégradé écrit une fois, dans `*`, fait deux travaux : avec `ex`, les mêmes `23ex` donnent un disque de 165px sur `html` et un rond de 9,7px sur le `body`.
- Le second arrêt de couleur sans position remonte au premier : un bord net sans seconde longueur.
- `/70%` fixe la largeur de la tuile, et `166%` la place : la tuile se répète, une seule position place les deux ronds.
- Une espace insécable fait 1 caractère et donne une ligne au `<p>` : pas besoin de `height`.
- `zoom:.4` change la `margin:50` commune en 20px, et la hauteur de ligne en environ 25px, en 9 caractères.
- `font:1q/67'` règle à la fois la taille qui réduit `ex` et la hauteur de ligne de la bande. La chaîne ouverte est la famille de police.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
