---
title: "Écrasé après les ombres : un bouton pause en 141 caractères"
ref: 2026-04-21
permalink: /fr/2026/04/21/ecrase-apres-les-ombres/
description: "Comment deux ombres internes partagées par html et body dessinent un cadre olive, un trou gris et une barre olive sur un html de 350px de haut, et comment scale:1 .57 écrase le tout en bouton pause, dans la cible CSS Battle du 21 avril 2026."
target: /assets/targets/2026-04-21.png
target_url: https://cssbattle.dev/play/X2jjK3cZXql5QvPOkTh0
colors: ["#4a4a23", "#d9d9d9", "#c0a623"]
player: underdude
chars: 141
score: 704.33
match: 100
code: |
  <style>*{box-shadow:inset 0 0 0 74q#4a4a23,inset 5in 0#D9D9D9;margin:-35 85}&{background:#c0a623;margin:-25 100;scale:1 .57;border-radius:15%
---

La cible du 21 avril, c'est un bouton pause : un carré arrondi olive foncé avec deux barres gris clair, sur un fond moutarde, et une petite patte en haut et en bas. Janne Ala-Äijälä donne à html et à body les deux mêmes ombres internes. Sur html, elles dessinent un cadre olive autour d'un trou gris. Sur body, une boîte étroite, elles peignent tout en olive : une barre qui coupe le trou et dépasse aux deux bouts. html fait d'abord 350px de haut, et `scale:1 .57` écrase le tout à sa place.

Avec **Vue large**, html et body apparaissent sur toute leur hauteur avant l'écrasement. Avec **Couleurs pédagogiques**, chaque ombre prend sa couleur.

{% include animations/2026-04-21.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* tous les éléments : html, head, style, body */
  box-shadow:
    inset 0 0 0 74q#4a4a23,        /* étalement 74 × 0,945 = 69,92px, au-dessus */
    inset 5in 0#D9D9D9;            /* décalée de 480px : remplit toute la boîte */
  margin: -35 85;                  /* body : 30px de large, 420px de haut */
}
& {                                /* la racine : html */
  background: #c0a623;             /* peint sur tout le canevas */
  margin: -25 100;                 /* html : 200px de large, 350px de haut */
  scale: 1 .57;                    /* écrase html et body autour de y = 150 */
  border-radius: 15%;              /* 30px en largeur, 52,5px en hauteur */
/* la fin du code ferme tout */
```

## Comment ça marche

### 1. La boîte de html

`*` vise tous les éléments : html, head, style et body. head et style ne s'affichent pas : il reste deux boîtes. `&` dans une règle qui n'est pas imbriquée vise la racine, html. html est aussi visé par `*`, mais la règle `&` vient après : sa marge l'emporte.

Il n'y a pas de doctype : la page est en mode quirks. Là, un `-25` sans unité compte comme -25px, et html s'étire sur la hauteur du cadre, marges ôtées. Avant le scale, getComputedStyle donne à html 200px × 350px : de x = 100 à 300, et de y = -25 à 325, soit 25px hors du canevas en haut et en bas.

### 2. Le fond de html va au canevas

Le fond de l'élément racine est peint sur tout le canevas, pas seulement dans la boîte de html. Tout le canevas est donc moutarde.

### 3. Deux ombres internes

Une ombre interne se dessine dans la boîte, et la première ombre de la liste passe au-dessus.

La seconde, `inset 5in 0`, est une copie de la boîte décalée de 480px vers la droite. Une ombre interne peint la partie de la boîte que la copie décalée ne couvre plus. La boîte de html ne fait que 200px de large : c'est toute la boîte. html est gris.

La première, `inset 0 0 0 74q`, n'a pas de décalage et a un étalement de 74Q. 1Q, c'est un quart de millimètre, 0,945px : 74Q font 69,92px (getComputedStyle donne `69.9213px`). Elle peint un cadre olive de 69,92px d'épaisseur le long de chaque côté. Il reste au milieu un trou gris de 200 - 139,84 = 60,16 sur 350 - 139,84 = 210,16, de x = 169,92 à 230,08.

Sans l'ombre grise (122 caractères), le trou laisse voir le canevas moutarde, et 4 297 pixels changent.

### 4. Les coins arrondis

`border-radius:15%` prend 15 % de chaque côté : 30px en largeur et 52,5px en hauteur. Les ombres internes suivent le bord arrondi de la boîte : le cadre olive a des coins extérieurs arrondis. Les coins du trou restent carrés : la courbe à l'intérieur du cadre a un rayon de 30 - 69,92, sous zéro, donc c'est un angle droit.

Sans l'arrondi (123 caractères), le carré a des coins vifs, et 1 131 pixels changent.

### 5. body, une barre olive

body reçoit les mêmes ombres et `margin:-35 85`. Dans les 200px de html, il reste 200 - 170 = 30px. En mode quirks, body s'étire lui aussi sur la hauteur de html, marges ôtées : 350 + 70 = 420px. Avant le scale, body va de (185, -60) à (215, 360).

Son ombre olive s'étale de 69,92px depuis chaque côté. body ne fait que 30px de large : l'olive le couvre en entier, et son ombre grise ne se voit jamais. body est une barre olive. Elle couvre le milieu du trou gris de html, ce qui laisse deux barres grises de 185 - 169,92 = 15,08px. Elle dépasse aussi de 35px de la boîte de html, en haut et en bas.

### 6. L'écrasement

`scale:1 .57` garde la largeur et ramène la hauteur à 57 %, autour du centre de la boîte de html, (200, 150). Tout ce qui est dessiné dans html suit : les ombres, les coins et body.

- html : 350 × 0,57 = 199,5px, de y = 50,25 à 249,75 (getBoundingClientRect donne (100, 50,25), 200 × 199,5).
- Les barres grises : de y = 90,1 à 209,9.
- body : 420 × 0,57 = 239,4px, de y = 30,3 à 269,7. Les pattes sont les 20px qui sortent du carré à chaque bout.
- Les coins : 30px en largeur et 52,5 × 0,57 = 29,9px en hauteur, presque ronds.

Sans le scale (129 caractères), html et body gardent toute leur hauteur : la forme olive sort du canevas en haut et en bas, les barres grises font 210,16px de haut, et 22 364 pixels changent.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- La liste d'ombres est dans `*` : html et body la partagent. Avec les ombres dans la règle `&` et `background:#4a4a23` pour body dans `*` (160 caractères), 60 pixels changent, tous au bout des pattes, sur les lignes 30 et 269.
- `74q` fait 69,92px en 3 caractères. Avec `70px` (142 caractères), 300 pixels changent.
- Le mode quirks n'accepte les longueurs sans unité que dans certaines propriétés, et box-shadow n'en fait pas partie. Avec `70` (140 caractères), toute la déclaration `box-shadow` est ignorée (getComputedStyle donne `none`), et 40 466 pixels changent.
- `5in` fait 480px en 3 caractères, plus que la largeur de html. Avec `1in` (96px, même longueur), le gris ne couvre html que de x = 100 à 196 : la barre grise de droite est moutarde, et 2 109 pixels changent.
- `15%` suit chaque côté : le scale fait des 52,5px 29,9px, proche des 30px en largeur. Avec `30px` (142 caractères), le rayon vertical est écrasé à 30 × 0,57 = 17,1px, et 495 pixels changent.
- `&` fait 1 caractère, `html` en fait 4. Avec `html{` à sa place (144 caractères), l'image est la même.
- Pas d'espace avant les couleurs. Avec `74q #4a4a23` (142 caractères), ou avec `0 #D9D9D9` (142 caractères), l'image est la même.
- `.57` n'a pas de zéro devant. Avec `0.57` (142 caractères), l'image est la même.
- Les marges sans unité ne marchent qu'en mode quirks. Avec `margin:-35px 85px` et `margin:-25px 100px` (149 caractères), l'image est la même.
- Avec `<!doctype html>` devant (156 caractères), les marges sans unité sont ignorées (getComputedStyle donne à body ses 8px par défaut), html fait 4,56px de haut après le scale, et 42 774 pixels changent.
- La dernière règle et le `<style>` ne sont jamais fermés. Avec `}` à la fin (142 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment de l'écriture), le code officiel dessine les mêmes formes aux mêmes endroits que la cible, mais 714 pixels diffèrent de plus de 8 niveaux. Ils sont sur les bords qui tombent entre deux pixels dans mon rendu : les lignes 50 et 249 (le haut et le bas du carré, à y = 50,25 et 249,75), les lignes 30 et 269 (le bout des pattes, à 30,3 et 269,7), les colonnes 169 et 230 (les côtés extérieurs des barres grises, à 169,92 et 230,08), et les coins arrondis. Dans la cible, ces pixels sont olive. Dans mon rendu, ce sont des mélanges, certains teintés de gris : en (200, 30), rgb(115, 113, 75) au lieu de rgb(74, 74, 35). Le plus grand écart est de 107 niveaux, en (120, 51). Le juge de CSS Battle donne au code officiel 100 % de correspondance.
