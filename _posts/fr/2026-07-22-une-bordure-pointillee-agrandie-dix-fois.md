---
title: "Une bordure pointillée minuscule, agrandie dix fois : une pellicule en 94 caractères"
ref: 2026-07-22
permalink: /fr/2026/07/22/une-bordure-pointillee-agrandie-dix-fois/
description: "Comment une bordure pointillée de 2px sur une boîte html de 34 × 24, agrandie dix fois, dessine deux barres jaunes et quatorze carrés dans la cible CSS Battle du 22 juillet 2026."
target: /assets/targets/2026-07-22.png
target_url: https://cssbattle.dev/play/ieuuiOIavYVfNKSroxMC
colors: ["#f7ec7d", "#2d3464"]
player: fmata
chars: 94
score: 763.29
match: 100
code: |
  <style>&{margin:138 183;border:3q#F7EC7D;border-style:dotted solid;scale:10;background:#2D3464
---

La cible du 22 juillet ressemble à une pellicule de film : deux hautes barres jaunes sur les côtés, et une rangée de sept petits carrés jaunes en haut et en bas, sur un fond bleu nuit. fmata la dessine avec un seul élément, html. C'est une boîte minuscule de 34 × 24, avec une bordure de 2px : pleine sur les côtés, pointillée en haut et en bas. Puis `scale:10` l'agrandit dix fois, et les points de 2 × 2 deviennent des carrés de 20 × 20.

Cochez **Couleurs pédagogiques** pour distinguer les côtés pointillés des côtés pleins.

{% include animations/2026-07-22.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                                /* au premier niveau : html */
  margin: 138 183;                 /* px : html fait 34 × 24, en (183, 138) */
  border: 3q#F7EC7D;               /* 3q = 2,835px, dessinés sur 2px ; pas encore de style */
  border-style: dotted solid;      /* pointillés en haut et en bas, plein à gauche et à droite */
  scale: 10;                       /* 340 × 240, de (30, 30) à (370, 270) */
  background: #2D3464              /* peint sur tout le canevas */
```

## Comment ça marche

### 1. html, et son fond sur le canevas

Il n'y a pas de doctype : la page est en mode quirks. La balise style n'est jamais fermée, donc tout ce qui suit `<style>` est du CSS.

Au premier niveau d'une feuille de style, `&` désigne la racine : html. Le fond de html ne s'arrête pas à sa boîte. Il est peint sur tout le canevas : `background:#2D3464` rend bleu nuit les 400 × 300 pixels, alors que html lui-même est petit.

### 2. Une petite boîte au milieu

En mode quirks, un nombre sans unité compte en px dans `margin`, et html remplit la fenêtre, moins ses marges. La fenêtre fait 400 × 300. html fait 400 − 2 × 183 = 34 de large et 300 − 2 × 138 = 24 de haut. J'ai vérifié avec offsetWidth et offsetHeight : 34 × 24, en (183, 138). La boîte va de (183, 138) à (217, 162). Son centre est (200, 150), le centre du canevas.

body est dedans, en 14 × 4, sans bordure ni fond : on n'en voit rien.

### 3. Une bordure de 2px

`border:3q#F7EC7D` donne la largeur et la couleur. Un q vaut un quart de millimètre, donc 3q = 0,75mm = 0,75 × 96 / 25,4 ≈ 2,835px. Chrome arrondit la largeur d'une bordure au pixel inférieur : la largeur calculée est 2px.

Le raccourci ne donne pas de style : le style est `none`. Rien n'est encore dessiné.

### 4. Pointillé en haut et en bas, plein sur les côtés

`border-style:dotted solid` prend deux valeurs : la première pour le haut et le bas, la seconde pour la gauche et la droite.

J'ai rendu la boîte sans le scale et j'ai lu ses pixels. Les côtés sont deux barres pleines de 2px de large, sur toute la hauteur de la boîte : de x = 183 à 185 et de 215 à 217, de y = 138 à 162. Elles couvrent aussi les coins. Les bordures du haut et du bas sont pointillées. Une bordure pointillée de 2px est dessinée en carrés de 2 × 2, séparés de 2px. Entre les deux barres, il y en a sept : à x = 187, 191, 195, 199, 203, 207 et 211. Ils sont sur les rangées y = 138 à 140 et 160 à 162.

### 5. Dix fois plus grand

`scale:10` agrandit html autour de son centre, (200, 150). getBoundingClientRect donne 340 × 240, en (30, 30). Toutes les longueurs sont multipliées par dix :

- les barres font 20px de large : de x = 30 à 50 et de 350 à 370, de y = 30 à 270 ;
- les points deviennent des carrés de 20 × 20, séparés de 20px : x = 70, 110, 150, 190, 230, 270 et 310 ;
- les rangées de carrés vont de y = 30 à 50 et de 250 à 270.

Le scale est une transformation : il ne change que la façon dont la boîte est peinte. Le fond reste sur le canevas, du même bleu nuit partout. Le résultat n'a que deux couleurs, comme la cible, et lui est identique pixel pour pixel dans mon rendu.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand un de ses canaux bouge de plus de 8.

- C'est `scale` qui fait les carrés. Sans `;scale:10` (85 caractères), la boîte minuscule reste telle quelle : 15 352 pixels changent. Dessiner la bordure en taille réelle, `margin:30;border:20px#F7EC7D` sans scale, est plus court (82 caractères), mais dans mon rendu une bordure pointillée de 20px est faite de points ronds, neuf par rangée, ceux des bouts sur les coins : 2 033 pixels changent. Une bordure pointillée de 2px fait des carrés, et l'agrandissement les garde carrés.
- `scale:10` est la façon courte d'écrire une transformation. `transform:scale(10)` donne la même image, en 105 caractères. `zoom:10` est plus court (93 caractères), mais zoom multiplie aussi les marges : html arrive en (1830, 1380), hors du canevas, et il ne reste plus de jaune. 15 200 pixels changent.
- `3q` est une bordure de 2px en 2 caractères. `2px` donne la même image, en 95 caractères. `2q` vaut 1,89px, arrondi à 1px : les barres et les carrés sont deux fois moins larges, il y a quinze carrés par rangée, et 10 400 pixels changent.
- `dotted solid` règle deux paires de côtés en une seule propriété. Avec `dotted` seul (88 caractères), les côtés deviennent aussi des carrés : 4 000 pixels changent.
- `&` est html en 1 caractère. `html` donne la même image, en 97 caractères. `*` est aussi court, mais il donne aussi à body les mêmes marges de 138px et 183px. Pour les contenir, html grandit jusqu'à 284px de haut, et une fois agrandi, ses rangées de points partent loin hors du canevas : il ne reste que les deux barres, et 8 000 pixels changent.
- Le mode quirks et les espaces absentes font gagner des caractères. Avec `138px 183px`, le code fait 98 caractères. Avec une espace dans `3q #F7EC7D`, il en fait 95. Même image à chaque fois.
- Rien n'est fermé. La dernière déclaration n'a pas besoin de `;`, et tout fermer avec `}</style>` donne 103 caractères, 9 de plus, pour la même image.
