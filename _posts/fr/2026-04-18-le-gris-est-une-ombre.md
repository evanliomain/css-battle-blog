---
title: "Le gris est une ombre : un avion rouge en 162 caractères"
ref: 2026-04-18
permalink: /fr/2026/04/18/le-gris-est-une-ombre/
description: "Comment le rouge de html couvre le canevas, son ombre grise de 288px ne laisse que le socle, et la même ombre, avec une police à 0, découpe la fente à côté du q, dans la cible CSS Battle du 18 avril 2026."
target: /assets/targets/2026-04-18.png
target_url: https://cssbattle.dev/play/qX9Q0vPeBfPjer7a5TFA
colors: ["#e75044", "#e5e5e3"]
player: fmata
chars: 162
score: 685.41
match: 100
code: |
  <q><style>*{background:#E75044;box-shadow:-32q 0 0 36CH#E5E5E3;margin:225 130 25;*{border-radius:1in 1in 0 0;margin:-100-60 100;*{margin:90;padding:100 40}font:0'
---

La cible du 18 avril est un avion rouge sur un fond gris clair : un fuselage au sommet arrondi, deux ailes, une fente entre l'aile gauche et le fuselage, et un socle. fmata peint tout le canevas en rouge et fait le gris avec une ombre : l'ombre de html couvre tout, sauf la boîte de html elle-même, le socle. Un seul `box-shadow` sert à html, body et au q. Sa taille est `36CH` : 288px pour html, et 0 pour body et le q, dont la police est à 0.

Avec **Vue large**, l'ombre de html montre sa vraie taille, bien au-delà du canevas. Avec **Couleurs pédagogiques**, chaque boîte et chaque ombre prend sa propre couleur.

{% include animations/2026-04-18.html lang=page.lang %}

## Le code, aéré

```css
<q>                                 /* un q dans body ; le style finit dedans */
<style>
* {                                 /* html, head, body, q, style */
  background: #E75044;              /* le rouge de html couvre le canevas */
  box-shadow: -32q 0 0 36CH#E5E5E3; /* 30,24px vers la gauche ; 36CH : 288px pour html, 0 dessous */
  margin: 225 130 25;               /* html : 140 × 50 en (130, 225) */
  * {                               /* head, body, q, style */
    border-radius: 1in 1in 0 0;     /* 96px, réduits à 50px (body) et 40px (q) */
    margin: -100-60 100;            /* body : 260 × 50 en (70, 125) */
    * {                             /* q, style */
      margin: 90;                   /* q : x = 70 + 90 = 160 */
      padding: 100 40;              /* 80 de large, de y = 25 à 225 */
    }
    /* police à 0 : 36CH vaut 0 ici ; la fin du code ferme la chaîne et les deux règles */
    font: 0'
```

## Comment ça marche

### 1. Cinq éléments, trois boîtes

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, où les longueurs sans unité des marges et des paddings comptent en pixels.

`<q>` ouvre un q dans body, et `<style>` finit dans le q. La page a html, head, body, q et style. head et style ne s'affichent pas. Seules trois boîtes se voient : html, body et le q.

Le `*` du premier niveau vise les cinq. Le `*{` imbriqué vaut `* *` : tout élément dans un autre, donc head, body, q et style. Le niveau suivant, `* * *`, demande deux ancêtres : q et style. Tous ces sélecteurs ont la même spécificité, 0, donc la déclaration la plus tardive gagne. body prend `margin:-100-60 100` plutôt que `margin:225 130 25`, et le q prend `margin:90` plutôt que les deux.

### 2. Un canevas rouge

La règle du premier niveau donne le fond rouge aux trois boîtes. html est la racine, et le fond de la racine est peint sur tout le canevas. Avant toute ombre, le canevas est tout rouge.

### 3. html : 140 × 50, en bas

`margin:225 130 25` laisse à html 400 − 130 − 130 = 140px de large, de x = 130 à 270. En mode quirks, html s'étire à la hauteur de la fenêtre, moins ses marges : 300 − 225 − 25 = 50. Il va de y = 225 à 275. Avec `margin:225 130 45`, getBoundingClientRect donne à html 30px de haut : 300 − 225 − 45.

Cette boîte est le socle.

### 4. Le gris est l'ombre de html

`box-shadow:-32q 0 0 36CH#E5E5E3` décale l'ombre de 32q vers la gauche, sans flou, et la grossit de `36CH`. 1Q fait un quart de millimètre, donc 32q font 8mm, soit 30,24px. html garde la police de 16px du navigateur, et getComputedStyle donne un étalement de 288px : 1ch y fait 8px.

L'ombre est la boîte de html, décalée de 30,24px vers la gauche et grossie de 288px de chaque côté : de x = 130 − 30,24 − 288 = −188,24 à 270 − 30,24 + 288 = 527,76, et de y = 225 − 288 = −63 à 275 + 288 = 563. Elle couvre tout le canevas de gris.

Une ombre portée ne se peint jamais sous sa propre boîte. La boîte de html garde le rouge du canevas : le socle.

### 5. body : les ailes

`* *` donne à body `margin:-100-60 100` : −100 en haut, −60 sur les côtés, 100 en bas. body commence en x = 130 − 60 = 70 et fait 140 + 120 = 260px de large. Son haut est en 225 − 100 = 125.

En mode quirks, body s'étire aussi : à la hauteur de la fenêtre, moins les marges de html et les siennes. 300 − 225 − 25 + 100 − 100 = 50. body va de y = 125 à 175, et son fond rouge y recouvre l'ombre de html.

`border-radius:1in 1in 0 0` demande 96px aux deux coins du haut. Deux rayons de 96px sur un côté de 50px de haut, c'est trop : les deux sont réduits à 50px. Le bout gauche est un quart de cercle de x = 70 à 120, le bout droit un autre de 280 à 330.

`font:0'` met la police de body et du q à 0, donc leur `36CH` vaut 0. L'ombre de body est juste sa boîte, décalée de 30,24px vers la gauche, en gris. Elle tombe sur l'ombre grise de html et ne se voit pas : en ajoutant `body{box-shadow:none!important}`, l'image est la même.

### 6. Le q : le fuselage

Le q est en ligne. `* * *` lui donne `margin:90` et `padding:100 40`. Sur les côtés, ils le poussent en x = 70 + 90 = 160 et lui donnent 40 + 40 = 80px de large : il n'a pas de texte, et avec une police à 0 ses guillemets n'ont pas de largeur. getBoundingClientRect donne 160, 25, 80 × 200.

La marge et le padding verticaux d'une boîte en ligne ne changent pas la ligne. Avec une police à 0, la ligne est au haut de body, en y = 125, sans hauteur. Le padding se peint autour : 100px vers le haut jusqu'à y = 25, 100px vers le bas jusqu'à y = 225, où commence le socle.

Les rayons de 96px sur une boîte de 80px de large sont réduits à 40px : le haut est un demi-disque.

### 7. L'ombre du q : la fente

Le q a la même ombre, avec un étalement de 0 : sa boîte décalée de 30,24px vers la gauche, de x = 160 − 30,24 = 129,76 à 209,76, et de y = 25 à 225. Elle n'est pas peinte sous le q, donc seule la bande de 129,76 à 160 se voit.

Le contenu en ligne se peint après le fond de body : la bande est grise par-dessus le rouge de body. Elle découpe la fente entre l'aile gauche et le fuselage. Au-dessus et au-dessous de body, c'est du gris sur du gris. En ajoutant `q{box-shadow:none!important}`, 1 550 pixels changent : la fente est rouge.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `box-shadow` pour trois boîtes. `36CH` suit la police : 288px pour html, 0 pour body et le q. Avec `3in`, 288px pour chaque boîte (161 caractères, un de moins), l'ombre du q couvre aussi body et le socle : il ne reste que le fuselage, et 13 494 pixels changent.
- `box-shadow` n'accepte pas de nombres sans unité, même en mode quirks. Avec `-30` (161 caractères), la déclaration est ignorée : plus aucune ombre, le canevas est tout rouge, et 91 469 pixels changent. `-32q` fait 4 caractères, `-30px` 5. Avec `-30px` (163 caractères), 50 pixels changent, tous dans la colonne x = 129, de y = 125 à 174.
- `font:0'` fait 7 caractères, `font-size:0` 11. Avec `font-size:0` (166 caractères), l'image est la même. Le raccourci `font` demande une famille : ici `''`, une chaîne vide, et la fin du code la ferme, donc un seul guillemet suffit. Avec `font:0''` (163 caractères), l'image est la même. `font:0` seul (161 caractères) est ignoré : getComputedStyle donne à body une police de 16px. body et le q ont alors eux aussi des ombres de 288px, il ne reste que le fuselage, plus large et plus haut, avec ses guillemets, et 13 367 pixels changent.
- Les marges fixent les hauteurs. La marge du bas de 25px de html lui donne 50px de haut. Avec `margin:225 130` (159 caractères), la marge du bas vaut 225 aussi : html et body font 0 de haut, il ne reste que le fuselage, et 13 494 pixels changent. La marge du bas de 100px de body annule sa marge du haut de −100. Avec `margin:-100-60` (158 caractères), la marge du bas vaut −100 aussi : body fait 250px de haut, de y = 125 à 375, et 22 279 pixels changent.
- `<q>` est en ligne. Avec `<p>` (162 caractères, la même longueur), le p est un bloc : sa marge du haut de 90px fusionne avec celle de −100 de body, body et le p commencent en y = 225 − 10 = 215, et 32 432 pixels changent.
- `1in` fait 3 caractères, `96px` 4. Les deux sont réduits aux mêmes rayons : avec `96px 96px` (164 caractères), l'image est la même.
- Le mode quirks accepte les nombres sans unité dans les marges et les paddings. Avec `px` sur les 9 nombres, et l'espace qu'il faut alors dans `-100px -60px` (181 caractères), l'image est la même.
- Les nombres négatifs n'ont pas besoin d'espace devant, ni la couleur devant `#`. Avec `-100 -60` et `36CH #E5E5E3` (164 caractères), l'image est la même.
- Le code finit dans la chaîne et dans deux règles : la fin du code les ferme. Avec `font:0''}}` (165 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes formes au même endroit que la cible, avec les mêmes aplats : (231, 80, 68) et (229, 229, 227). 323 pixels s'écartent de plus de 8 niveaux. 273 d'entre eux sont sur les trois courbes : 123 sur le haut du fuselage, 81 sur l'aile gauche et 69 sur l'aile droite. Les courbes de la cible n'ont presque pas d'anticrénelage : la cible a 32 couleurs différentes, mon rendu 154. Le plus grand écart est de 119 niveaux, en (164, 46) sur le haut du fuselage : (229, 191, 187) dans mon rendu, proche du gris, et (231, 80, 68) dans la cible, le rouge. Les 50 autres sont dans la colonne x = 129, de y = 125 à 174. La fente commence en x = 129,76, donc mon rendu mélange les deux couleurs dans cette colonne, par exemple (230, 115, 105) en (129, 150), là où la cible a le rouge. Avec `-30px` au lieu de `-32q`, ces 50 pixels ne s'écartent plus de la cible de plus de 8 niveaux. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
