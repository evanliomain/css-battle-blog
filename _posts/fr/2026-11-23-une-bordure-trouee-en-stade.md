---
title: "Une bordure trouée en stade : une fleur à quatre pétales en 144 caractères"
lang: fr
ref: 2026-11-23
permalink: /fr/2026/11/23/une-bordure-trouee-en-stade/
description: "Comment une bordure géante sur html, un rayon trop grand pour sa boîte et un seul dégradé radial partagé avec le body dessinent la cible CSS Battle du 23 novembre 2026 : une fleur à quatre pétales avec un anneau ardoise en son cœur."
target: /assets/targets/2026-11-23.png
target_url: https://cssbattle.dev/play/d3CuehIATuNu3MvLxn8U
colors: ["#cf6939", "#2f434e", "#f8b140"]
player: benjamintordjman
chars: 144
score: 701.39
match: 100
code: |
  <style>*{margin:35-35;border-radius:9in;background:radial-gradient(1q,#CF6939 5q,#2F434E 0 16q,#CF6939)}&{margin:-146-61;border:6cm solid#F8B140
---

La cible du 23 novembre montre une fleur orange brique sur un fond doré : deux stades de 140 × 70 croisés au centre, un couché et un debout, avec un anneau ardoise en son cœur. Benjamin Tordjman dessine le stade debout comme un trou : `html` reçoit une bordure si épaisse qu'elle couvre tout le canevas, sauf une petite boîte au milieu que son rayon démesuré transforme en stade. Le `body` est le stade couché. Les deux partagent un seul fond, dont l'anneau tombe au même endroit sur l'un et sur l'autre.

La **vue large** montre `html` en entier, un stade de 522 × 592, et les **couleurs pédagogiques** peignent sa bordure en bleu.

{% include animations/2026-11-23.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                   /* html et le body */
  margin: 35 -35;                     /* gardé par le body seulement */
  border-radius: 9in;                 /* 864px : bien trop grand, réduit */
  background: radial-gradient(1Q,     /* un cercle minuscule : 0,94px */
    #cf6939 5Q,                       /* orange jusqu'à 4,72px */
    #2f434e 0 16Q,                    /* ardoise de 4,72 à 15,11px */
    #cf6939);                         /* orange à nouveau, dès 15,11px */
}
& {                                   /* html, la racine */
  margin: -146 -61;                   /* boîte : 522 × 592 */
  border: 6cm solid #f8b140;          /* 226px couleur fond */
}
</style>
```

## Comment ça marche

### 1. Deux règles, deux boîtes

`*` vise tous les éléments : `html`, `head`, `style` et le `body`. `head` et `style` sont cachés, donc seuls `html` et le `body` montrent ce qu'elle règle. `&` seul, hors de toute règle, désigne la racine : `html`. Ses marges remplacent celles de `*`, et seul `html` reçoit la bordure. En mode quirks, `-146-61` et `35-35` sont des px : le signe moins sépare les deux nombres, comme le ferait une espace.

En mode quirks, `html` remplit la fenêtre moins ses marges. Je l'ai mesuré en x = −61, y = −146, 522 de large (400 + 2 × 61) et 592 de haut (300 + 2 × 146). Il déborde du canevas de tous les côtés.

### 2. Une bordure qui couvre tout sauf un trou

`6cm` font 226,77px, et Chrome dessine la bordure à 226px : c'est ce que j'ai mesuré. La boîte garde sa taille, donc l'intérieur rétrécit : 522 − 2 × 226 = 70 de large et 592 − 2 × 226 = 140 de haut. Cette boîte de 70 × 140 commence en x = −61 + 226 = 165 et y = −146 + 226 = 80 : elle va de 165 à 235 et de 80 à 220.

La bordure a la couleur du fond de la cible et couvre tout le reste du canevas. Pour vérifier, je l'ai passée en rouge : tout le canevas est devenu rouge, sauf la fleur.

### 3. Un rayon trop grand pour la boîte

`9in` font 864px. Un côté de 522px ne peut pas porter deux coins de 864px. Dans ce cas, le navigateur réduit tous les rayons du même facteur, choisi pour qu'ils tiennent sur le côté le plus serré : 522 / (2 × 864). Chaque coin de `html` passe à 261px, la moitié de sa largeur. Le dehors de `html` est un stade de 522 × 592.

Au bord intérieur d'une bordure, le rayon d'un coin vaut le rayon extérieur moins la bordure : 261 − 226 = 35. Le trou de 70 × 140 devient un stade aux bouts de 35px : les pétales du haut et du bas. Avec un rayon plus petit, 200 par exemple, les coins intérieurs resteraient carrés.

### 4. Un anneau, sur le canevas

`html` a un fond, donc il passe au canevas, calé sur la boîte de remplissage de `html` : le trou de 70 × 140, centré en (200, 150). Il se répète aussi en tuiles de 70 × 140 sur tout le canevas. Je l'ai vérifié avec une bordure plus fine : des copies de l'anneau apparaissent tous les 70px en largeur et 140px en hauteur. Ici, la bordure les cache toutes.

`radial-gradient(1Q, …)` a pour forme un cercle de 1Q : 0,94px. Les arrêts de couleur sont des longueurs, donc ils n'en dépendent pas. L'orange va jusqu'à 5Q = 4,72px, et l'ardoise part de là (le `0` veut dire « là où le précédent s'arrête ») jusqu'à 16Q = 15,11px. Le dernier orange n'a pas de position : il serait à 100 % de la forme, 0,94px. C'est avant 15,11, donc il est ramené à 15,11, et l'orange commence net. Résultat : un anneau ardoise de 4,72 à 15,11px autour de (200, 150).

### 5. Le body : l'autre stade

En mode quirks, le `body` remplit la boîte de contenu de `html` moins ses propres marges. Sa hauteur vaut 140 − 2 × 35 = 70, et sa largeur 70 + 2 × 35 = 140, car les marges négatives l'élargissent. Je l'ai mesuré en x = 130, y = 115, 140 × 70. Le même `9in` y est réduit à 35, la moitié de 70 : les pétales de gauche et de droite.

Le `body` garde son propre fond, puisque `html` en a déjà un. Son dégradé radial est centré sur sa propre boîte, donc lui aussi en (200, 150) : son anneau tombe pile sur celui du canevas. Le `body` est peint par-dessus la bordure de `html`, et la fleur est complète.

## Notes de golf

- `*` écrit le rayon et le fond une seule fois pour deux boîtes, et `&` désigne `html` en un caractère.
- La bordure peint la couleur de fond et découpe le trou en même temps. `margin` + `border` donnent sa position : −146 + 226 = 80 et −61 + 226 = 165.
- `9in` dit « le plus rond possible » en 3 caractères : ici, tout rayon à partir de 261px donne le même résultat.
- `6cm` écrit 226px en 3 caractères.
- `1q` rend la forme minuscule, donc le dernier orange commence net à 16q. Sans lui, la forme irait jusqu'au coin le plus loin de la boîte, et l'ardoise se fondrait dans l'orange.
- Les deux boîtes sont centrées en (200, 150) : le dégradé n'a besoin d'aucune position.
- `35-35` et `-146-61` se passent d'espace, `solid#F8B140` aussi, et la dernière règle n'est jamais fermée.
