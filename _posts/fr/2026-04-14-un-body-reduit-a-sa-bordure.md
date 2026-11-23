---
title: "Un body réduit à sa bordure : un P en 123 caractères"
ref: 2026-04-14
permalink: /fr/2026/04/14/un-body-reduit-a-sa-bordure/
description: "Comment une seule bordure crème sans côté gauche, donnée à html et à body, dessine sur html les deux barres et le bout arrondi d'un P, et sur un body réduit à 30px de large son pied, dans la cible CSS Battle du 14 avril 2026."
target: /assets/targets/2026-04-14.png
target_url: https://cssbattle.dev/play/c12qisZj8zuQ4l2hq2sq
colors: ["#f2eaa8", "#e76"]
player: levito
chars: 123
score: 723.86
match: 100
code: |
  <style>*{margin:0 90-120;border:32q solid#F2EAA8;border-left:0}&{margin:60 95 150;border-radius:0 1in 1in 0;background:#E76
---

La cible du 14 avril est un P crème sur un canevas corail. Sa boucle est faite de deux barres qui dépassent du pied vers la gauche, et d'un bout arrondi à droite. Le pied traverse la boucle. Veit Lehmann écrit une seule bordure, crème et sans côté gauche, et la donne à html et à body. Sur html, elle fait les deux barres et le bout arrondi. body reçoit une marge si large qu'il se réduit à la largeur de sa bordure : 30px, le pied.

Avec **Couleurs pédagogiques**, la bordure de html et celle de body prennent chacune leur couleur.

{% include animations/2026-04-14.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                            /* tous les éléments : html et body */
  margin: 0 90-120;            /* body : 0 en haut, 90 à gauche et à droite, −120 en bas */
  border: 32q solid #F2EAA8;   /* 30,24px, crème : 30px de large dans mon Chrome */
  border-left: 0;              /* pas de côté gauche */
}
& {                            /* au premier niveau, & est la racine : html */
  margin: 60 95 150;           /* html : 210 × 90 en (95, 60) */
  border-radius: 0 1in 1in 0;  /* 96px aux coins droits, ramenés à 45px */
  background: #E76;            /* le fond de la racine : tout le canevas */
  /* la fin du code ferme la règle */
```

## Comment ça marche

### 1. `&` est html

`&` est le sélecteur d'imbrication. Hors de toute règle, il vaut `:scope`, et dans une feuille de style, c'est l'élément racine : html. `*` vise tous les éléments, html compris. Pour la marge, `&` l'emporte : il vient après, et il est plus spécifique. html prend donc la marge de `&`, body celle de `*`, et les deux prennent la bordure.

### 2. html : 210 × 90

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, où les longueurs sans unité dans les marges comptent comme des pixels.

`margin:60 95 150` donne 60 en haut, 95 à gauche et à droite, 150 en bas. html fait 400 − 95 − 95 = 210px de large, de x = 95 à 305. En mode quirks, html s'étire sur la hauteur de la fenêtre, moins ses marges : 300 − 60 − 150 = 90. Il va de y = 60 à 150. getBoundingClientRect donne 95, 60, 210 × 90.

`background:#E76` est posé sur la racine. Le fond de la racine ne s'arrête pas à sa boîte : il se peint sur tout le canevas. Tout commence en corail.

### 3. Une bordure sans côté gauche

`border:32q solid#F2EAA8` donne à chaque élément une bordure crème. 1q vaut un quart de millimètre : 32q font 8mm, soit 30,24px. Dans mon Chrome, getComputedStyle donne 30px, et la bordure est dessinée sur 30px. `border-left:0` retire le côté gauche.

Sur html, il reste une barre en haut, de y = 60 à 90, une barre en bas, de y = 120 à 150, et le côté droit, de x = 275 à 305. Le bout gauche est ouvert : la bande corail entre les barres va jusqu'en x = 95. La cible place ses bords en y = 60, 90, 120 et 150, et en x = 95, 275 et 305.

### 4. Le bout arrondi

`border-radius:0 1in 1in 0` demande 1in, soit 96px, aux coins en haut à droite et en bas à droite. Sur le côté droit, 96 + 96 = 192, plus que les 90px de haut. Le navigateur réduit alors tous les rayons dans le même rapport, 90 / 192, jusqu'à 45px. Le bord extérieur du côté droit devient un demi-cercle de 45px de rayon. À l'intérieur, la bordure fait 30px en haut, en bas et à droite : le rayon intérieur vaut 45 − 30 = 15. Le côté droit est un demi-anneau.

Les deux coins gauches restent carrés : les bouts gauches des barres sont droits.

### 5. body : 30px de large

body a la même bordure, et la marge de `*` : `0 90-120` donne 0 en haut, 90 à gauche et à droite, et −120 en bas. Le signe moins commence un nouveau nombre : `90-120` n'a pas besoin d'espace.

body se place dans le contenu de html : 180px de large (210 moins la bordure droite de 30px), à partir de x = 95, et 30px de haut, de y = 90 à 120. Sa marge gauche le met en x = 185. Il resterait 180 − 90 − 90 − 30 = −30 pour son contenu : moins que rien, sa largeur vaut donc 0. body a la largeur de sa bordure droite : de x = 185 à 215. Ses bordures du haut et du bas font elles aussi 30px de large. La cible place le pied de x = 185 à 215.

### 6. body : 150px de haut

En mode quirks, body s'étire sur la hauteur du contenu de html, moins ses propres marges du haut et du bas : 30 − 0 − (−120) = 150. getBoundingClientRect donne 185, 90, 30 × 150. body va de y = 90 à 240, en traversant la barre du bas. Avec la barre du haut au-dessus, le pied va de y = 60 à 240, là où la cible l'arrête.

La boîte de marge de body fait 150 − 120 = 30px de haut, la hauteur du contenu de html : html ne grandit pas, et garde 90px de haut.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `*` donne la bordure à html et à body d'un coup. Avec `body{` à la place de `*{` et la bordure écrite une seconde fois dans `&{…}` (164 caractères), l'image est la même.
- `&` fait 1 caractère, `html` 4. Avec `html{` (126 caractères), l'image est la même.
- `32q` fait 3 caractères, `30px` 4. Avec `30px` (124 caractères), l'image est la même. La valeur compte : avec `31q` (29,29px), mon Chrome dessine des bordures de 29px, et 509 pixels changent. Avec `33q` (31,18px), il dessine des bordures de 31px, et 496 pixels changent.
- C'est `border-left:0` qui ouvre le P. Sans lui (109 caractères), html prend une bordure gauche, et body aussi : body passe en x = 215 et fait 60px de large. 11 704 pixels changent.
- `1in` fait 3 caractères, `45px` 4. Tout rayon de 45px ou plus donne le même demi-cercle, puisque le navigateur le ramène à 45. Avec `0 45px 45px 0` (125 caractères), l'image est la même.
- Le rayon a besoin de ses quatre valeurs, pour que les coins gauches restent carrés. Avec `border-radius:1in` (115 caractères), les bouts gauches des deux barres s'arrondissent aussi : 1 236 pixels changent, entre x = 95 et 138. Avec `0 1in 1in` (121 caractères), le coin en bas à gauche s'arrondit : 620 pixels changent.
- `#E76` fait 4 caractères, `#ee7766` 7. Avec `#ee7766` (126 caractères), l'image est la même.
- `solid#F2EAA8` n'a pas besoin d'espace avant le `#`. Avec `solid #F2EAA8` (124 caractères), l'image est la même.
- `90-120` n'a pas besoin d'espace : le moins commence un nouveau nombre. Avec `90 -120` (124 caractères), l'image est la même.
- Le mode quirks accepte les nombres sans unité dans les marges. Avec `0 90px -120px` et `60px 95px 150px` (134 caractères), l'image est la même.
- Le code se termine dans la règle : la fin du code la ferme. Avec `#E76}` (124 caractères), l'image est la même.

## Si vous l'essayez chez vous

L'image cible est un JPEG, et ses couleurs sont décalées de 1 : #f2eaa9 pour le crème et #ee7666 pour le corail. Dans mon Chrome (version 157 au moment d'écrire ces lignes), le code officiel dessine les mêmes formes, avec les mêmes bords. 975 pixels diffèrent de la cible de plus de 8 sur un canal, et aucun n'est à plus de 6px d'un bord. 705 d'entre eux sont sur le bout arrondi, à partir de x = 260. Les 23 qui diffèrent de plus de 40 y sont tous aussi, sur la courbe. Le juge de CSS Battle donne au code officiel 100 % de ressemblance.
