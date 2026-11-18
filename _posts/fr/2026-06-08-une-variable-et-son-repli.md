---
title: "Une variable et son repli : un bonhomme en 177 caractères"
ref: 2026-06-08
permalink: /fr/2026/06/08/une-variable-et-son-repli/
description: "Comment une seule box-shadow et la valeur de repli d'un var() donnent à html et à body deux listes d'ombres différentes, et comment un cercle de 9251px de rayon trace le haut droit des épaules, dans la cible CSS Battle du 8 juin 2026."
target: /assets/targets/2026-06-08.png
target_url: https://cssbattle.dev/play/YiaYScDEe5xpSMH4Ml0V
colors: ["#2d3464", "#fff", "#8fc5ef"]
player: h_blierzt
chars: 177
score: 674.03
match: 100
code: |
  <style>*{margin:83%165-152;color:8FC5EF;box-shadow:0-9lh#2D3464,var(--s,0-2in 0 5vh,0-272q)0 37q#FFF,0-55ch 0 3in;*{border-radius:1in;margin:-160 0 210;--s:0-9914q 0 96in,0-39vh
---

La cible du 8 juin est un bonhomme sur fond bleu ciel : une tête ronde bleu nuit, des épaules et des bras blancs avec une encolure arrondie, et un corps bleu nuit. H_Bliertz le dessine uniquement avec des ombres, sur deux boîtes sans fond : html, sous le canevas, et body, un cercle. Les deux reçoivent la même `box-shadow`, mais une variable CSS avec une valeur de repli leur donne deux listes d'ombres différentes.

Utilisez la **Vue large** pour voir html sous le canevas, et les **Couleurs pédagogiques** pour distinguer les ombres.

{% include animations/2026-06-08.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                  /* html, head, style, body */
  margin: 83%165-152;                /* 332 en haut, 165 sur les côtés, −152 en bas */
  color: 8FC5EF;                     /* sans # : le mode quirks la lit comme #8FC5EF */
  box-shadow:
    0-9lh#2D3464,                    /* montée de 162px, bleu nuit */
    var(--s, 0-2in 0 5vh, 0-272q)    /* pas de --s sur html : le repli, deux ombres */
    0 37q#FFF,                       /* étalement de 34,96px, blanc : finit l'ombre d'avant */
    0-55ch 0 3in;                    /* montée de 440px, étalement de 288px, bleu ciel */
  * {                                /* head, style, body */
    border-radius: 1in;              /* 96px : body est un cercle */
    margin: -160 0 210;
    --s: 0-9914q 0 96in, 0-39vh;     /* les deux ombres de body, à la place du repli */
```

## Comment ça marche

### 1. Les éléments

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, et un nombre seul comme `165` dans une marge est lu en px.

La page contient html, head, style et body. Le parseur ajoute un body vide à la fin. `*` vise les quatre, et head et style ne s'affichent pas. `*{*{…}}` est une règle imbriquée : `* *`, tout élément qui est dans un autre, donc head, style et body. Les deux règles ont la même spécificité, et l'imbriquée vient après : sa marge l'emporte sur body.

### 2. Deux boîtes

html reçoit `margin:83%165-152`. Une marge en % est une part de la largeur du parent, même en haut : 83 % de 400 = 332. Il fait 400 − 2 × 165 = 70 de large. En mode quirks, html s'étire sur la hauteur du canevas moins ses marges : 300 − 332 + 152 = 120. Je l'ai mesuré : 70 × 120 en (165, 332), tout entier sous le canevas.

body reçoit `margin:-160 0 210`. En mode quirks, il s'étire sur la hauteur de html moins ses propres marges : 120 + 160 − 210 = 70. Il commence en 332 − 160 = 172. Je l'ai mesuré : 70 × 70 en (165, 172). `border-radius:1in` vaut 96px, plus que la moitié de 70 : les coins sont réduits et body est un cercle.

Aucune des deux boîtes n'a de fond. Tout ce qu'on voit, ce sont des ombres.

### 3. Une liste, deux versions

La `box-shadow` est dans la règle `*` : html et body la reçoivent tous les deux. Au milieu se trouve `var(--s,0-2in 0 5vh,0-272q)`. La valeur de repli d'un `var()`, c'est tout ce qui suit sa première virgule, virgules comprises.

html n'a pas de `--s` : il reçoit le repli. body définit `--s:0-9914q 0 96in,0-39vh` : il reçoit cette valeur. Le texte autour du `var()` est commun : `0-9lh#2D3464` avant, `0 37q#FFF` et `0-55ch 0 3in` après. `0 37q#FFF` n'a pas de virgule devant : il termine la dernière ombre du `var()`. Les deux listes, unités converties (arrondies), la première ombre au-dessus :

| | html | body |
| --- | --- | --- |
| 1 | `0 -162px #2D3464` | `0 -162px #2D3464` |
| 2 | `0 -192px 0 15px` | `0 -9367.56px 0 9216px` |
| 3 | `0 -257.008px 0 34.96px #FFF` | `0 -117px 0 34.96px #FFF` |
| 4 | `0 -440px 0 288px` | `0 -440px 0 288px` |

Les unités : 1lh est la hauteur de ligne, 18px dans mon Chrome, donc 9lh = 162px. 1in = 96px, donc 2in = 192px, 3in = 288px et 96in = 9216px. 1vh vaut 1 % de 300, donc 5vh = 15px et 39vh = 117px. 1ch vaut 8px dans la police par défaut, donc 55ch = 440px. 1Q est un quart de millimètre, 0,945px : 272Q = 257,008px, 37Q = 34,96px et 9914Q = 9367,56px.

`color:8FC5EF` n'a pas de `#`, mais le mode quirks la lit quand même comme une couleur. Une ombre sans couleur prend la couleur du texte : les ombres 2 et 4 sont bleu ciel, sur les deux boîtes.

### 4. Les ombres de html

De bas en haut :

- L'ombre 4 monte html de 440px, en y −108 à 12, puis l'étale de 288px : x −123 à 523, y −396 à 300. Elle couvre tout le canevas de bleu ciel. C'est le fond.
- L'ombre 3 monte html de 257px et l'étale de 34,96px : x 130 à 270, y 40 à 230, en blanc.
- L'ombre 2 monte html de 192px et l'étale de 15px : x 150 à 250, à partir de y 125, en bleu ciel. Elle coupe le bloc blanc en deux bras.
- L'ombre 1 monte html de 162px, sans étalement : 70 × 120 en (165, 170), bleu nuit. Le corps.

Dans mon rendu, les bras s'arrêtent en y = 230 et le corps va de y = 170 à 290.

### 5. Les ombres de body

body est dans html : il est peint après lui, et toutes ses ombres passent devant celles de html. Une ombre suit les coins arrondis de la boîte, et l'étalement agrandit les coins d'autant.

- L'ombre 1 monte body, rond, de 162px : un disque de 70px en (165, 10). La tête.
- L'ombre 3 monte body de 117px, en y 55 à 125, et l'étale de 34,96px : un carré de 139,92px avec des coins de 96 + 34,96 = 130,96px. Ils sont réduits à la moitié du côté : c'est un cercle blanc de rayon 69,96 autour de (200, 90). Son bas, en y = 159,96, fait la courbe de l'encolure. Il recouvre le haut de la coupe : le ciel entre les bras commence maintenant sous cette courbe.
- L'ombre 4 monte body de 440px et l'étale de 288px : un cercle de rayon 323 autour de (200, −233), bleu ciel. Son bas est en y = 90, et sur le canevas il reste sous l'ombre 2.

### 6. Le cercle géant

L'ombre 2 de body le monte de 9367,56px, en y −9195,56 à −9125,56, et l'étale de 9216px. Cela donne un carré de 70 + 2 × 9216 = 18 502px, de y −18 411,56 jusqu'à y = 90,44. Ses coins font 96 + 9216 = 9312px. Deux d'entre eux sur un même côté demanderaient 18 624px, plus que le côté : ils sont réduits à 9251px, la moitié du côté. Le carré est un cercle de rayon 9251, autour de (200, −9160,56).

Son bas est en y = 90,44. Les épaules font 140px de large. À leurs bouts, à 70px du milieu, le bord n'est que 70² / (2 × 9251) = 0,26px plus haut. Pour l'œil, c'est une ligne droite.

Ce cercle bleu ciel couvre tout ce qui est au-dessus : le haut du bloc blanc, à partir de y = 40, et la moitié haute du disque blanc. Il reste des épaules blanches, au haut droit en y ≈ 90, avec une encolure ronde en dessous. Seule la tête, l'ombre 1, passe par-dessus.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Le `var()` avec repli écrit une seule `box-shadow` pour deux listes. Écrit pour chaque boîte, `box-shadow:0-9lh#2D3464,0-2in 0 5vh,0-272q 0 37q#FFF,0-55ch 0 3in` dans la règle du dehors et `box-shadow:0-9lh#2D3464,0-9914q 0 96in,0-39vh 0 37q#FFF,0-55ch 0 3in` dans l'imbriquée, le code fait 212 caractères, pour la même image. Même sans l'ombre 4 de body, cachée sur le canevas, il fait 199 caractères.
- `0 37q#FFF` est écrit une seule fois, après le `var()` : il termine l'ombre blanche des deux listes.
- `color:8FC5EF` donne la couleur une seule fois aux trois ombres écrites sans couleur. Avec `#8FC5EF` dans chacune et sans `color`, le code fait 185 caractères, pour la même image. Sans `color` du tout (164 caractères), ces ombres sont noires : 96 415 pixels changent.
- En mode quirks, `color` accepte une couleur hexadécimale sans son `#`. `color:#8FC5EF` donne la même image en 178 caractères.
- `83%165` vaut 332px sans espace à mettre : après `%` un nouveau nombre commence. `332 165-152` donne la même image en 178 caractères.
- Chaque unité est plus courte que la même longueur en px, pour la même image : `9lh` pour `162px` (179 caractères), `2in`, `3in` et `96in` pour `192px`, `288px` et `9216px` (179 caractères chacun), `1in` pour `96px` (178), `55ch` pour `440px` (178), `39vh` pour `117px` (178), `5vh` pour `15px` (178), `272q` pour `257px` (178).
- `37q` vaut 34,96px, juste sous 35. `35px` a un caractère de plus et déplace les bords des deux formes blanches de 0,04px : 35 pixels changent.
- `box-shadow` n'accepte pas de nombre seul, même en mode quirks. Avec `15` à la place de `5vh` (176 caractères), toute la `box-shadow` de html est rejetée. Il ne reste que les ombres de body : la tête, le cercle géant, et le disque blanc sur le canevas blanc. 72 455 pixels changent.
- `border-radius:1in` fait les formes rondes. Sans lui (159 caractères), la tête et le disque sont des carrés : 1 999 pixels changent. `50%` a la même longueur et donne la même image.
- Pas d'espace avant un signe moins ou un `#` : `0-9lh#2D3464`, `0-55ch`.
- Les accolades fermantes et les balises de fin sont omises. La fin du code les ferme.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 399 pixels, avec la même règle que dans les notes de golf, de 118 au plus. 197 sont sur le bord de la tête, 89 le long de la courbe de l'encolure, 2 aux coins du bas des bras, et 111 sur le bord du haut des épaules. Dans la cible, ce bord est net : la rangée 89 est toute bleu ciel et la rangée 90 toute blanche. Dans mon rendu, la rangée 90 mélange le blanc et le bleu ciel, surtout au milieu, où elle vaut (199, 226, 247), à mi-chemin entre les deux. Sur la rangée 89, les x de 254 à 269 sont un peu plus clairs. Le juge de CSS Battle donne au code 100 % de correspondance.
