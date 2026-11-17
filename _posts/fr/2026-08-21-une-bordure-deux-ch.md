---
title: "Une bordure, deux ch : un H vert en 161 caractères"
ref: 2026-08-21
permalink: /fr/2026/08/21/une-bordure-deux-ch/
description: "Comment une seule déclaration border-block en ch dessine une bande verte sur html et deux formes arrondies sur un body de 70px de large, et comment un reflet recopie le body à gauche, pour la cible CSS Battle du 21 août 2026."
target: /assets/targets/2026-08-21.png
target_url: https://cssbattle.dev/play/EWDBaLnr7crtoNmx2ibO
colors: ["#3157b4", "#84be8d"]
player: h_blierzt
chars: 161
score: 686.23
match: 100
code: |
  <style>*{background:#3157B4;margin:110 30;border-block:solid 5ch#84BE8D;*{margin:-125-0-125 270;border-radius:1in 0 0 1in;-webkit-box-reflect:left 50vw;font:36q'
---

La cible du 21 août est un H vert sur fond bleu : un large rectangle au milieu et quatre formes arrondies aux coins. H_Bliertz la dessine avec deux boîtes et une seule déclaration `border-block`. Sur `html`, 5ch font 40px, et les deux bordures font la bande du milieu. Sur le body, une police plus grande donne 5ch = 85px, et les bordures font les deux formes de droite. Un `-webkit-box-reflect` recopie le body à gauche, en miroir.

Cochez **Couleurs pédagogiques** pour distinguer les deux bordures de `html`, le body et son reflet.

{% include animations/2026-08-21.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                 /* html, head, style, body */
  background: #3157B4;
  margin: 110 30;                   /* sans unité : des px en mode quirks */
  border-block: solid 5ch #84BE8D;  /* bordures haute et basse, 5ch de la police de chaque élément */
  * {                               /* head, style, body */
    margin: -125 -0 -125 270;       /* -0 vaut 0 */
    border-radius: 1in 0 0 1in;     /* 96px sur les deux coins de gauche, ramenés à 70px */
    -webkit-box-reflect: left 50vw; /* une copie en miroir, 200px à gauche */
    font: 36q '';                   /* 34,02px, famille vide : 5ch = 85px */
  }
}
```

## Comment ça marche

### 1. Deux boîtes

Il n'y a pas de doctype : la page est en mode quirks. Le navigateur construit `html`, `head`, le `style` (dans `head`) et `body`. `*` vise les quatre, et le `*` imbriqué vise `head`, `style` et `body`, les éléments placés dans un autre. `head` et `style` ne sont pas affichés. Il reste deux boîtes : `html`, avec la règle extérieure, et `body`, avec les deux règles. Le `margin` imbriqué vient après, donc il l'emporte dans le body. Le body garde le `background` et le `border-block` de la règle extérieure.

### 2. html : une boîte de 340 × 80

`margin:110 30` n'a pas d'unité, et le mode quirks le lit en px : 110px en haut et en bas, 30px à gauche et à droite. En mode quirks, `html` remplit le cadre de 400 × 300 moins ses marges : 340 × 80, de (30 ; 110) à (370 ; 190).

Son fond est bleu. Le fond de l'élément racine est peint sur tout le canevas : tout le cadre est bleu.

### 3. 5ch sur html : la bande du milieu

`html` n'a pas de `font` : il garde la police par défaut, 16px en Times. Dans mon rendu, 1ch y fait 8px, donc 5ch font 40px. `border-block` pose les bordures haute et basse : 40px chacune, en vert.

La boîte fait 80px de haut et les deux bordures prennent 80px : son contenu a 0px de haut. La bordure haute va de y = 110 à 150, la basse de 150 à 190. Ensemble, elles forment une bande verte de 340px de large et 80px de haut, de x = 30 à 370.

### 4. body : 70 × 250

Le body se place dans la boîte de contenu de `html` : 340px de large et 0px de haut, à y = 150. `margin:-125-0-125 270` donne −125px en haut, 0 à droite, −125px en bas et 270px à gauche. Sa largeur est ce qui reste : 340 − 270 − 0 = 70px, de x = 300 à 370.

En mode quirks, le body remplit la hauteur de son conteneur moins ses marges. Ici : 0 − (−125) − (−125) = 250px. Il commence 125px au-dessus de y = 150 : il va de y = 25 à 275. Il a le fond bleu de la règle extérieure.

### 5. 5ch sur le body : 85px

Le body reçoit le même `border-block:solid 5ch`, mais `ch` se mesure dans sa propre police. `font:36q'` fixe la taille à 36 quarts de millimètre : 36 × 0,945 = 34,02px. Le raccourci `font` exige une famille. Ici, c'est `'` : une chaîne jamais fermée, que la fin du code referme, et la famille est la chaîne vide `''`. Aucune police ne porte ce nom, et Chrome garde Times. J'ai vérifié sans le guillemet (`font:36q`) : la déclaration est ignorée, le body reste à 16px et ses bordures font 40px.

À 34,02px, 1ch mesure 17px dans mon rendu, et la largeur de bordure calculée est de 85px. La bordure haute va de y = 25 à 110, la basse de 190 à 275. Entre les deux, de 110 à 190, le fond bleu du body couvre la bande de `html` de x = 300 à 370. J'ai vérifié en donnant au body un fond rouge : le milieu du body devient rouge.

### 6. border-radius : 1in devient 70px

`border-radius:1in 0 0 1in` arrondit les coins en haut à gauche et en bas à gauche : 1in = 96px. La boîte ne fait que 70px de large, et en haut, 96 + 0 = 96 dépasse 70. Quand deux rayons d'un même côté dépassent la longueur du côté, le navigateur réduit tous les rayons d'un même facteur : 70/96. Chaque rayon devient 70px. Sur le côté gauche, 70 + 70 = 140 tient dans 250. J'ai vérifié avec `70px` à la place de `1in` : le rendu est le même, pixel pour pixel.

Le bord intérieur d'un coin reçoit le rayon extérieur moins la largeur de la bordure. La bordure gauche fait 0px, donc 70px en largeur, mais la bordure haute fait 85px, donc 70 − 85 : rien, un angle droit. La courbe n'existe que sur le bord extérieur : de (300 ; 95) à (370 ; 25). Sous y = 95, le bord gauche descend tout droit jusqu'au bas de la bordure, à y = 110. Le coin du bas est le même, à l'envers. Hors des courbes, le body n'est pas peint, et le bleu du canevas apparaît.

### 7. -webkit-box-reflect : la moitié gauche

`-webkit-box-reflect:left 50vw` peint une copie du body, retournée de gauche à droite, à sa gauche. La deuxième valeur est l'écart entre le body et la copie : 50vw, la moitié de 400px, soit 200px. Le body commence à x = 300, donc la copie finit à x = 100 et commence à 30.

La copie a tout ce que peint le body : les deux formes vertes, arrondies maintenant vers la droite, et le milieu bleu, qui couvre la bande de `html` de x = 30 à 100. J'ai vérifié avec `200px` à la place de `50vw` : le rendu est le même. Il reste de la bande le rectangle du milieu, de x = 100 à 300 et de y = 110 à 190.

## Notes de golf

- Une seule déclaration `border-block` sert à deux éléments, et `ch` lui donne deux tailles : 40px sur `html`, 85px sur le body.
- `font:36q'` ne sert qu'à agrandir le `ch` du body. Le guillemet jamais fermé est une famille entière, pour un caractère.
- `background` dans la règle extérieure colore le canevas (par `html`) et le body. Le body en a besoin pour cacher la bande.
- Le reflet dessine la moitié gauche gratuitement, et cache aussi la bande à gauche.
- `1in` fait 3 caractères pour un rayon qui doit seulement valoir 70px ou plus : le navigateur le ramène à 70px.
- `50vw` vaut 200px en 4 caractères.
- `-125-0-125 270` : les signes moins séparent les valeurs, une seule espace suffit. `-0` vaut 0 ; `-125 0-125 270` donne le même rendu et a la même longueur.
- Pas d'espace avant `#` : `5ch#84BE8D`.
- Le mode quirks lit `110 30`, `-125` et `270` en px.
- `<style>` et les deux accolades ne sont jamais fermés.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire ces lignes), les bords droits et les aplats sont exactement là où la cible les a. 516 pixels diffèrent de la cible, et ils sont tous sur les quatre bords courbes. 351 d'entre eux diffèrent de plus de 8 niveaux, et le plus grand écart est de 72 niveaux. Les plus gros écarts sont là où les courbes rejoignent la partie droite de leur bord. Sous la courbe en haut à droite, la colonne x = 300 est entièrement verte à partir de y = 86 dans la cible, et seulement à partir de y = 95 dans mon rendu. Sur le juge de CSS Battle, le code est identique à 100 %.
