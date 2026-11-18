---
title: "Construit de bas en haut : des lunettes en pixels en 137 caractères"
ref: 2026-05-16
permalink: /fr/2026/05/16/construit-de-bas-en-haut/
description: "Comment une seule marge, négative en bas, empile deux p et un hr de bas en haut entre deux cadres crème, dans la cible CSS Battle du 16 mai 2026."
target: /assets/targets/2026-05-16.png
target_url: https://cssbattle.dev/play/JecXahV3LW56TgSfgva2
colors: ["#f3ead2", "#cf596a"]
player: emohdaziz
chars: 137
score: 708.39
match: 100
code: |
  <p><hr><p><style>*{*{border:6vw solid#f3ead2;margin:66 74;background:#cf596a;p{border-block:0;height:72}*{margin:72 66-180}hr{scale:.33.5
---

La cible du 16 mai montre deux cadres crème sur un fond rose, côte à côte, reliés au milieu par un petit damier de 3 × 3. On dirait une paire de lunettes. Mohamed Ali dessine le contour avec la bordure de body. Deux p et un hr font la colonne du milieu. Ils partagent une seule marge, `72 66-180` : chaque boîte commence 108px au-dessus du bas de la précédente, donc les trois boîtes s'empilent de bas en haut. Un scale réduit le hr au carré du centre.

Les **Couleurs pédagogiques** montrent chaque boîte dans sa couleur, et là où les boîtes se chevauchent avant que le hr rétrécisse.

{% include animations/2026-05-16.html lang=page.lang %}

## Le code, aéré

```css
<p><hr><p>                     /* body contient p, hr, p ; le style va dans le second p */
<style>
* {                            /* aucune déclaration à lui */
  * {                          /* head, body, p, hr, p, style */
    border: 6vw solid #f3ead2; /* une bordure crème de 24px */
    margin: 66 74;             /* body : 252 × 168 en (74, 66) */
    background: #cf596a;       /* body : le canevas ; les p : leur centre rose */
    p {                        /* les deux p */
      border-block: 0;         /* bordures de côté seulement */
      height: 72;              /* 72 × 72 : crème, rose, crème */
    }
    * {                        /* p, hr, p, style */
      margin: 72 66 -180;      /* 72 de large ; chaque boîte 108px au-dessus du bas de la précédente */
    }
    hr {
      scale: .33 .5;           /* 72 × 48 → 23,76 × 24 */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `66` dans une marge ou une hauteur est lu en px.

Le premier `<p>` ouvre body. Un p ne peut pas contenir de hr : `<hr>` le ferme, et le premier p reste vide. Le second `<p>` s'ouvre après le hr, et le `<style>` va dedans. body contient trois boîtes : p, hr et p.

Le `*` extérieur vise tous les éléments mais n'a pas de déclaration. Les règles imbriquées dedans n'atteignent que les éléments qui ont un ancêtre : le `*` intérieur vaut `* *`, qui vise head, body, p, hr, p et style, mais pas html. Le `*` imbriqué un niveau plus bas vaut `* * *` : p, hr, p et style. Les `p` et `hr` à ce niveau valent `* * p` et `* * hr`. head et style ne s'affichent pas. Les règles ne sont jamais fermées : la fin du code les ferme.

### 2. body : le cadre et le canevas

body reçoit `border:6vw solid#f3ead2`. 6vw vaut 6 % des 400px de large : 24px. Avec `margin:66 74`, body fait 400 − 2 × 74 = 252 de large. En mode quirks, body remplit la hauteur de la page : 300 − 2 × 66 = 168. body est donc une boîte de 252 × 168 en (74, 66), avec une bordure crème de 24px. Sa boîte de contenu fait 204 × 120, en (98, 90).

html n'a pas de fond : le fond de body, `#cf596a`, peint tout le canevas.

### 3. p, hr et p : 72 de large

p, hr et p correspondent aussi à `* *` : ils reçoivent la bordure crème, la marge et le fond rose. Ils correspondent aussi à `* * *`, dont le `margin:72 66-180` vient plus loin avec la même spécificité : il remplace `66 74`. 204 − 2 × 66 = 72 : chaque boîte fait 72 de large, de x = 164 à 236.

`* * p` ne garde que les bordures de côté des p (`border-block:0`) et leur donne 72 de haut. Chaque p est un carré de 72 × 72 : 24px de crème, 24px de rose, 24px de crème. Le hr garde ses quatre bordures autour d'une boîte de contenu vide, de 24 de large et 0 de haut : un bloc de 72 × 48, tout crème.

### 4. Les marges fusionnent et les empilent de bas en haut

Le premier p commence 72px sous la boîte de contenu de body : en y = 90 + 72 = 162. Il finit en 234.

Sa marge du bas, -180, touche la marge du haut du hr, 72. Les marges verticales entre deux blocs fusionnent en une seule : 72 − 180 = −108. Le hr commence 108px au-dessus du bas du p : 234 − 108 = 126. Il finit en 174. Même chose sous le hr : le second p commence en 174 − 108 = 66 et finit en 138.

Les boîtes montent donc, dans l'ordre inverse du code : le premier p en bas, le hr au milieu et le second p en haut. Avant le scale, le hr chevauche chaque p de 12px.

### 5. Les p coupent la bordure de body

Le premier p va de y = 162 à 234 et couvre le bas de la bordure de body, de 210 à 234. Le second p, de 66 à 138, en couvre le haut, de 66 à 90. Les p sont peints après body : leurs centres roses font deux encoches de 24 × 24, de x = 188 à 212. La bordure devient deux cadres. Les côtés crème des p ferment chaque cadre.

### 6. scale réduit le hr

`scale:.33.5` veut dire `.33 .5` : un nombre ne peut pas avoir deux points, donc `.5` en commence un second. Le scale réduit le hr autour de son centre, (200, 150). Il fait alors 72 × 0,33 = 23,76 de large et 48 × 0,5 = 24 de haut, de x = 188,12 à 211,88 et de y = 138 à 162. Il remplit le trou entre les deux p : le carré du centre du damier. Le scale ne change pas la mise en page : les p restent où ils sont.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule marge place les trois boîtes. La marge négative du bas fusionne avec la marge du haut de la boîte suivante, et chaque boîte arrive 108px plus haut que la précédente. Pas de position, pas de top, pas de seconde marge.
- `<p><hr><p>` donne trois boîtes en 10 caractères, sans balise fermante : le hr ferme le premier p.
- `*{*{` atteint tout ce qui est sous html en 4 caractères. Avec un seul `*{` (135 caractères), html reçoit aussi le cadre, body reçoit la marge prévue pour les p, et 11 904 pixels changent.
- L'imbrication économise les sélecteurs. Avec des règles à plat, `* *{…}* * p{…}* * *{…}* * hr{…}` (149 caractères), l'image est la même.
- Un seul `background` sert à body et aux p. Celui de body passe au canevas, et les p en ont besoin pour les encoches. Avec `background:0` ajouté à la règle des p (150 caractères), la bordure de body se voit en haut et en bas de la colonne du milieu : les deux encoches deviennent crème, et 1 152 pixels changent.
- `border-block:0` retire les bordures du haut et du bas en 14 caractères. Avec `border-width:0 6vw` (141 caractères), l'image est la même.
- `6vw` vaut 24px en 3 caractères, un de moins que `24px`. Avec `border:24px solid#f3ead2` (138 caractères), l'image est la même. Un nombre seul ne marche pas là : avec `border:24 solid#f3ead2` (136 caractères), mon Chrome ignore la déclaration. Tout le crème disparaît, il ne reste qu'une fine ligne grise, la bordure de 1px par défaut du hr, et 21 968 pixels changent.
- Des nombres seuls dans les marges et la hauteur, grâce au mode quirks. Avec `66px 74px`, `72px` et `72px 66px -180px` (150 caractères), l'image est la même.
- Pas d'espace là où un mot se termine tout seul. Dans `66-180`, le signe moins commence un nouveau nombre : avec `66 -180` (138 caractères), l'image est la même. Avec `.33 .5` (138 caractères), aussi. `solid#f3ead2` n'a pas besoin d'espace avant le `#`.
- Le code s'arrête dans la règle du hr, et la fin du code ferme les trois règles ouvertes. Avec `}}}` à la fin (140 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome local (version 157 au moment d'écrire), 48 pixels du code officiel s'écartent de la cible de plus de 8, jusqu'à 18 sur un canal. Ce sont les colonnes x = 188 et x = 211, de y = 138 à 161 : les bords gauche et droit du carré du centre. Le hr y fait 23,76px de large, de x = 188,12 à 211,88 : ces deux colonnes ne sont qu'en partie crème. Avec `scale:.333.5` (138 caractères), le hr fait 23,976px de large et aucun pixel ne s'écarte de plus de 8. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
