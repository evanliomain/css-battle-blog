---
title: "Un miroir qui se remet à l'endroit : un calendrier en 162 caractères"
lang: fr
ref: 2026-10-15
permalink: /fr/2026/10/15/un-miroir-qui-se-remet-a-l-endroit/
description: "Comment sept ombres, partagées par un body retourné et une option qui se remet à l'endroit, dessinent la cible CSS Battle du 15 octobre 2026, une page de calendrier."
target: /assets/targets/2026-10-15.png
target_url: https://cssbattle.dev/play/hV6Wk19bUcGIDvbgt5ZR
colors: ["#cccb", "#8c8c8c", "#f218"]
player: benjamintordjman
chars: 162
score: 685.41
match: 100
code: |
  <option><style>&{margin:90 105;border:90q solid#cccb;color:8C8C8C;*{margin:-25 0 5;scale:-1 1;box-shadow:64q 0#f218,-63q 0,5vw 0,5vw 53q,64q 53q,58q -5em,58q -64q
---

La cible du 15 octobre est une page de calendrier : une carte gris clair, deux anneaux gris foncé qui dépassent de son bord haut, et deux rangées de quatre carrés gris foncé, dont le dernier de la rangée du haut est rouge. Benjamin Tordjman la dessine avec une seule liste de sept ombres, utilisée deux fois. `body` est retourné par `scale:-1 1`, et une `<option>` placée dedans se retourne encore, donc revient à l'endroit. La liste est ainsi dessinée une fois telle quelle et une fois en miroir.

{% include animations/2026-10-15.html lang=page.lang %}

## Le code, aéré

```css
/* <option> avant <style> : un élément de plus dans body */
& {                              /* html */
  margin: 90 105;
  border: 90q solid #cccb;
  color: 8C8C8C;                 /* hérité : la couleur des ombres */
  * {                            /* body et option (head reste caché) */
    margin: -25 0 5;
    scale: -1 1;
    box-shadow:
      64q 0 #f218,               /* le carré rouge */
      -63q 0,
      5vw 0,
      5vw 53q,
      64q 53q,
      58q -5em,                  /* haut de l'anneau */
      58q -64q;                  /* bas de l'anneau */
  }
}
```

## Comment ça marche

### 1. html est la carte grise

À la racine, `&` veut dire `html`. `margin:90 105` le pose en (105, 90), sur 400 − 2 × 105 = 190px de large. La bordure de 90q (85,04px) est dessinée sur 85px : une épaisseur de bordure est arrondie au pixel inférieur. Les deux bordures prennent 170px de la largeur : le contenu de `html` ne fait que 20px de large, et il n'a aucune hauteur à lui. La carte fait 190 × 170, de (105, 90) à (295, 260).

`#cccb` est un gris clair à 73 % d'opacité. `html` n'a pas de fond, le canevas reste donc blanc, et la bordure se mélange à ce blanc pour donner `#d9d9d9`, la couleur de la carte.

### 2. Deux boîtes de 20px

`&{…*{…}}` touche tous les éléments dans `html` : `head` (caché), `body`, et l'`<option>` écrite avant `<style>`, que le navigateur place dans `body`.

`body` reçoit `margin:-25 0 5`. En mode quirks, celui de CSS Battle, `body` s'étire à la hauteur du contenu de `html` (0px) moins ses marges : 0 + 25 − 5 = 20px. Il fait aussi 20px de large, comme le contenu de `html`.

Une `<option>` vide hors d'un `<select>` s'affiche quand même en bloc, avec une hauteur minimale de 1,2em (19,2px) et 1px de padding en bas : environ 20px de haut sans aucun CSS (20,19px mesurés). Un `<p>` ferait 0px. Elle reçoit les mêmes marges, qui fusionnent avec celles du `body` : les deux boîtes sont l'une sur l'autre, en (190, 150).

Aucune des deux boîtes n'a de fond. On ne voit que leurs ombres.

### 3. Une liste de sept ombres

Les deux boîtes reçoivent la même liste. Une ombre sans couleur prend `color`, hérité de `html` : `8C8C8C`. En mode quirks, `color` accepte un hexadécimal sans `#`. La première ombre a sa propre couleur, `#f218`, un rouge à 53 % d'opacité.

Avec 64q ≈ 60,5px, 63q ≈ 59,5px, 53q ≈ 50px, 5vw = 20px, 5em = 80px et 58q ≈ 54,8px, la liste telle quelle pose des carrés en x 250, 130 et 210 sur la rangée du haut, en x 210 et 250 sur celle du bas, et deux carrés empilés en x 245, à y 70 et y 90 : l'anneau de droite.

### 4. scale:-1 1 sur les deux boîtes

`scale:-1 1` retourne une boîte de gauche à droite autour de son centre, x = 200, ombres comprises. `body` est retourné une fois. L'`<option>` est dans `body`, elle est donc retournée avec lui, puis retournée encore par son propre `scale:-1 1`. Deux retournements s'annulent : les ombres de l'option sont dessinées telles quelles, celles du `body` en miroir.

La copie en miroir ajoute les carrés en x 170 sur les deux rangées, en x 130 sur celle du bas, et l'anneau de gauche en x 135.

### 5. Qui passe dessus

L'`option` est peinte après `body`, ses ombres couvrent donc celles du `body`.

- À droite de la rangée du haut, le carré rouge de l'option tombe sur un carré gris du `body`. `#f218` sur `#8c8c8c` donne le rouge brique de la cible, à peu près `#ca534a`.
- À gauche de la rangée du haut, le carré rouge du `body` est sous un carré gris de l'option : il est caché.

Quatorze carrés en tout, dont deux paires qui se chevauchent : douze carrés visibles, les huit de la grille et les quatre qui forment les deux anneaux.

## Notes de golf

- Une seule liste d'ombres pour les deux moitiés : le miroir coûte `scale:-1 1`, et le second retournement, sur la boîte imbriquée, ne coûte rien de plus.
- `<option>`, c'est un bloc de 20px pour 8 caractères et aucun CSS.
- `color:8C8C8C` donne la couleur de six ombres d'un coup, sans `#` grâce au mode quirks.
- `#cccb` et `#f218` laissent les couches du dessous finir les couleurs : la page blanche pour la carte, le carré gris pour le rouge.
- `5vw` et `5em` sont des longueurs exactes en 3 caractères. `64q`, `63q`, `53q` et `58q` tombent à moins d'un demi-pixel des bords de la cible. Dans mon rendu local, quelques colonnes sur ces bords sortent mélangées (276 pixels), mais CSS Battle compte la solution comme identique à 100 %.
- `<style>` n'est jamais fermé.
