---
title: "body étiré en travers de la bordure : un cadre coupé en 108 caractères"
ref: 2026-06-18
permalink: /fr/2026/06/18/body-etire-en-travers-de-la-bordure/
description: "Comment html devient un cadre blanc arrondi grâce à une bordure de 53Q, et comment body, un petit carré vert en son centre, est étiré par scale et tourné par rotate en une bande diagonale qui coupe le cadre en deux, dans la cible CSS Battle du 18 juin 2026."
target: /assets/targets/2026-06-18.png
target_url: https://cssbattle.dev/play/gOhzH7m34YAoKBbBHKDQ
colors: ["#81be48", "#fff"]
player: emohdaziz
chars: 108
score: 742.9
match: 100
code: |
  <style>*{background:#81be48}&{border:53Q solid#fff;border-radius:32Q;margin:60 110;*{rotate:45deg;scale:9 .8
---

La cible du 18 juin est un carré blanc aux coins arrondis sur un fond vert vif, avec un trou carré vert au centre. Une large bande verte le traverse en diagonale, du coin en haut à gauche au coin en bas à droite, et le coupe en deux. Mohamed Ali dessine le cadre avec la bordure de html. Puis body, un petit carré vert à l'intérieur, est étiré neuf fois par `scale` et tourné de 45° par `rotate` : il devient la bande.

Utilisez les **Couleurs pédagogiques** pour voir body, vert sur vert, et la **Vue large** pour voir la bande dépasser du canevas.

{% include animations/2026-06-18.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                       /* html, head, style, body */
  background: #81be48;    /* html : tout le canevas ; body : la bande */
}
& {                       /* hors de toute règle : la racine, html */
  border: 53Q solid #fff; /* 50,08px, dessinée sur 50px */
  border-radius: 32Q;     /* 30,24px */
  margin: 60 110;         /* px en mode quirks : 180 × 180 en (110, 60) */
  * {                     /* & * : head, style et body */
    rotate: 45deg;
    scale: 9 .8;          /* body : 576 × 51,2, sur la diagonale */
```

## Comment ça marche

### 1. Un seul fond vert pour tout le monde

`*` touche html, head, style et body, et leur donne à tous le fond vert. head et style sont masqués.

html est la racine : son fond s'étend à tout le canevas. body reçoit le même vert, et il deviendra la bande.

### 2. html est une boîte de 180 × 180

Au premier niveau, hors de toute règle, `&` désigne l'élément racine : html.

La marge `60 110` n'a pas d'unité. Les pages de CSS Battle n'ont pas de doctype, donc elles sont en mode quirks, et une marge sans unité s'y lit en px. html fait 400 − 2 × 110 = 180px de large. En mode quirks, il remplit aussi la hauteur du canevas : 300 − 2 × 60 = 180px.

J'ai mesuré html : une boîte de 180 × 180 en (110, 60).

### 3. Un cadre blanc

L'unité `Q` est un quart de millimètre : 53Q = 50,08px. Chrome dessine la bordure sur 50px (sa largeur calculée vaut 50px). Il reste à l'intérieur la boîte de contenu : 80 × 80, en (160, 110). Elle n'a pas de fond à elle, puisque le fond de html est parti sur le canevas. On y voit donc le canevas vert : le trou carré.

`border-radius: 32Q` vaut 30,24px. Il arrondit les coins extérieurs. Les coins intérieurs prennent le rayon moins l'épaisseur de la bordure : 30,24 − 50 est négatif, donc le trou garde des coins carrés.

### 4. body est un carré de 64 × 64 au centre

Le `*` imbriqué dans `&` veut dire `& *` : tous les éléments dans html, donc head, style et body. Seul body est affiché.

body est dans la boîte de contenu de 80 × 80 de html, avec sa marge de 8px par défaut : il fait 80 − 16 = 64px de large. En mode quirks, body remplit aussi la hauteur de html : 64px. Je l'ai mesuré en (168, 118), donc son centre est celui du canevas, (200, 150). Il est vert sur vert : rien ne se voit encore.

### 5. scale, puis rotate

`rotate`, `scale` et `translate` s'appliquent toujours dans le même ordre, quel que soit l'ordre dans le code : translate, puis rotate, puis scale. En pratique, scale étire d'abord body sur ses propres axes, et la rotation tourne le résultat. Dans mon rendu, inverser les deux déclarations donne la même image.

`scale: 9 .8` donne à body 9 × 64 = 576px de large et 0,8 × 64 = 51,2px de haut, autour de son centre. `rotate: 45deg` tourne ensuite cette bande dans le sens des aiguilles d'une montre autour de (200, 150). J'ai mesuré la boîte englobante de la bande tournée de (−21,75, −71,75) à (421,75, 371,75) : ses deux bouts sont loin hors du canevas.

### 6. La coupe

La bande suit la diagonale de html, la ligne de (110, 60) à (290, 240) qui passe par le centre. Elle fait 51,2px d'épaisseur, donc elle couvre 25,6px de chaque côté de cette ligne.

body est dans html, donc il est peint par-dessus la bordure de html. La bande cache les coins en haut à gauche et en bas à droite du cadre, et coupe le blanc en deux morceaux. Au milieu, elle traverse le trou, qui est du même vert.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul fond fait deux choses. Avec `*`, html reçoit le vert, qui part sur le canevas, et body le reçoit aussi, ce qui fait la bande. Avec le fond déplacé dans `&` et la règle `*` supprimée (106 caractères), body n'a plus de fond : la bande disparaît, le cadre est entier, et 6 941 pixels changent.
- `&` désigne html en un caractère, et le `*{` imbriqué atteint body en deux de plus. Avec `}body{` à la place de `;*{`, l'image est la même, en 111 caractères.
- La marge n'a pas d'unité, ce qui marche en mode quirks. `margin:60px 110px` donne la même image en 112 caractères.
- L'épaisseur de la bordure est en `Q`. L'astuce sans unité ne marche pas dans le raccourci `border` : `border:50 solid#fff` (107 caractères) est ignoré, il n'y a plus de cadre du tout, et 18 540 pixels changent. `50px` donne la même image que `53Q` en 109 caractères : 53Q, c'est 50,08px en trois caractères, dessiné sur 50px.
- Pareil pour le rayon : `border-radius:30` (107 caractères) est ignoré, les coins sont carrés, et 447 pixels changent. `30px` prend 109 caractères, et 51 pixels changent, tous sur les coins arrondis. 32Q, c'est 30,24px en trois caractères.
- Le facteur de scale n'a besoin que d'un chiffre, assez grand pour que la bande dépasse les coins arrondis. Avec `scale:3 .8`, la bande fait 192px de long et s'arrête à 96px du centre : les coins blancs reviennent, et 1 706 pixels changent. Avec `scale:4 .8`, la bande va jusqu'à 128px du centre, et 147 pixels changent, tous sur ses deux grands bords.
- `.8` perd son zéro initial, `solid#fff` n'a pas besoin d'espace avant le `#`, et `#fff` est la forme courte du blanc.
- Rien n'est fermé. `}}` à la fin donne la même image en 110 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel est très proche de la cible, mais pas identique : 487 pixels diffèrent de plus de 8 sur un canal, jusqu'à 134. Chacun d'eux touche un bord d'une forme : 400 sur les deux grands bords de la bande, 87 sur les coins arrondis. Mon rendu a 89 couleurs différentes, la cible 16. Le juge de CSS Battle donne au code 100 % de correspondance.
