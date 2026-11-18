---
title: "Trois scale emboîtés : un code-barres en 149 caractères"
ref: 2026-06-11
permalink: /fr/2026/06/11/trois-scale-emboites/
description: "Comment une seule règle donne à html, body et un h3 les mêmes bordures latérales, comment trois scale emboîtés en font des barres et des colonnes, et comment le mode quirks leur donne à tous la même hauteur, dans la cible CSS Battle du 11 juin 2026."
target: /assets/targets/2026-06-11.png
target_url: https://cssbattle.dev/play/dzlLXaBViRAZUK7t6jye
colors: ["#55c085", "#333", "#fff"]
player: emohdaziz
chars: 149
score: 696.67
match: 100
code: |
  <h3> <style>*{border-inline:var(--y,11Q dashed#333);margin:95 181;scale:10 1;+*{scale:.2 5;background:#55c085;margin:44-6;*{--y:3Q solid#fff;margin:1
---

La cible du 11 juin ressemble à un code-barres sur fond vert : quatre barres sombres à gauche, quatre à droite, et au milieu deux colonnes blanches autour de deux colonnes sombres. Mohamed Ali la dessine avec les seules bordures gauche et droite de trois éléments emboîtés : html, body et un h3. Une seule règle leur donne à tous la même bordure, la même marge et `scale:10 1`. Les scale s'ajoutent du parent à l'enfant : chaque paire de bordures sort avec sa propre largeur.

Utilisez les **Couleurs pédagogiques** pour distinguer les bordures des trois éléments.

{% include animations/2026-06-11.html lang=page.lang %}

## Le code, aéré

```css
<h3>&nbsp;<style>                          /* après <h3> : une espace insécable (U+00A0) */
* {                                        /* html, head, body, h3, style */
  border-inline: var(--y, 11Q dashed#333); /* 10px en tirets, sauf si --y existe */
  margin: 95 181;                          /* html : 38 × 110 en (181, 95) */
  scale: 10 1;                             /* 10 fois plus large */
  + * {                                    /* * + * : seulement body, il suit head */
    scale: .2 5;                           /* avec celui de html : 2 × 5 */
    background: #55c085;                   /* passe à tout le canevas */
    margin: 44-6;                          /* 44 et −6 : 30 × 22 */
    * {                                    /* h3 (et style, caché) */
      --y: 3Q solid#fff;                   /* bordure blanche de 2px */
      margin: 1                            /* 8px de large */
```

## Comment ça marche

### 1. Les éléments

Les pages de CSS Battle n'ont pas de doctype, elles sont donc en mode quirks, et un nombre seul comme `181` y est lu en px.

`<h3>` ouvre un titre. Le navigateur ajoute html, head et body autour. Vient ensuite une espace insécable, qui reste dans le h3 comme texte. `<style>` arrive pendant que le h3 est encore ouvert : il finit dedans. La page est html > head + body > h3 > style. head et style ne sont pas affichés.

### 2. Une règle pour tous les éléments

`*` touche les cinq éléments. Chacun reçoit les trois mêmes choses :

- `border-inline` : une bordure à gauche et à droite seulement. Sa valeur est `var(--y, 11Q dashed#333)` : la valeur de `--y` si elle existe, `11Q dashed#333` sinon. Rien ne définit `--y` sur html ni sur body : ils reçoivent la bordure en tirets.
- `margin:95 181`.
- `scale:10 1`.

Les deux règles imbriquées changent ce qui doit être différent pour body et le h3.

Sur html, `margin:95 181` laisse 400 − 181 − 181 = 38px de large. html est une boîte de 38 × 110 en (181, 95). Les 110 viennent du mode quirks (partie 7).

1Q vaut un quart de millimètre, 0,945px : 11Q vaut 10,39px. Chrome dessine la bordure sur 10px : `getComputedStyle` dit `10px`. Sur chaque côté de 110px, les tirets font 20px de haut avec 10px d'écart : quatre tirets, en y = 95, 125, 155 et 185.

### 3. html étiré dix fois

`scale:10 1` étire html dix fois en largeur et laisse sa hauteur telle quelle. L'étirement se fait autour du centre de la boîte, x = 200. Les 38px de html deviennent 380, de x = 10 à 390.

Les deux bordures font 10px de large, en x = 181 et 209. Étirées, elles font 100px de large, en x = 10 et 290. Chaque tiret de 10 × 20 devient une barre de 100 × 20. Ce sont les quatre barres de chaque côté de la cible.

### 4. body

`+*` dans la première règle veut dire `* + *` : un élément juste après un frère. head vient juste avant body : body est touché. Le h3 est le premier élément de body, et style le premier élément du h3 : ils ne le sont pas.

body reçoit `background:#55c085`. html n'a pas de fond : celui de body sert pour tout le canevas. C'est le vert.

`margin:44-6` se lit comme deux nombres, `44` et `-6` : le signe moins commence un nouveau nombre. La boîte de html fait 38 − 10 − 10 = 18px de large entre ses bordures. Avec −6px de chaque côté, body fait 18 + 6 + 6 = 30px de large : deux bordures en tirets de 10px et 10px entre elles. Sa boîte fait 30 × 22 en (185, 139). Il est toujours dans html : il est lui aussi étiré dix fois, 300px de large à l'écran.

### 5. Le scale de body

Les scale s'ajoutent du parent à l'enfant. Le `scale:.2 5` de body vient par-dessus le `10 1` de html : 10 × 0,2 = 2 en largeur, 1 × 5 = 5 en hauteur. Toutes les boîtes sont centrées sur (200, 150) : chaque scale se fait autour de ce point.

body devient 60 × 110 en (170, 95). Ses bordures de 10px deviennent deux colonnes de 20px, en x = 170 et 210, de y = 95 à 205.

La bordure est en tirets, mais les colonnes sont pleines. Chaque côté ne fait que 22px avant le scale. Dans mes essais, une bordure en tirets de 10px reste un trait plein jusqu'à 40px de long, et se coupe en deux tirets à 50px.

### 6. Le h3

Le `*` le plus intérieur veut dire `* + * *` : un élément dans body. C'est le h3 (et style, caché). Il met `--y` à `3Q solid#fff`. Le h3 utilise alors cette valeur dans `border-inline` : 3Q vaut 2,83px, et Chrome dessine une bordure blanche de 2px.

`margin:1` remplace le `95 181` de la première règle. Dans les 10px de body, le h3 fait 10 − 1 − 1 = 8px de large : deux bordures de 2px et 4px entre elles. Sa boîte fait 8 × 22 en (196, 139). Sa marge du haut de 1 fusionne avec les 44 de body : le h3 commence en haut de body.

Le h3 garde le `scale:10 1` de la première règle. Avec ceux de body et de html : 10 × 0,2 × 10 = 20 en largeur, 5 en hauteur. Il devient 160 × 110 en (120, 95). Ses bordures de 2px font 40px de large : les colonnes blanches, en x = 120 et 240. Entre elles, le h3 est transparent, et les colonnes sombres de body se voient au travers.

### 7. Une seule hauteur : 110

Aucune hauteur n'est écrite. En mode quirks, html et body s'étirent pour remplir le cadre :

- html remplit le cadre de 300px, moins ses marges : 300 − 95 − 95 = 110.
- body remplit html, moins ses propres marges : 110 − 44 − 44 = 22. Multiplié par 5 : 110.
- Le h3 contient une espace insécable. Elle ne disparaît pas comme une espace normale : le h3 a une ligne de texte. Dans mon rendu, cette ligne fait 22px de haut. Multipliée par 5 : 110.

J'ai vérifié les deux premiers points en changeant les marges. Avec `margin:90 181`, html fait 120px de haut. Avec `margin:40-6`, body fait 30px de haut.

Les barres, les colonnes sombres et les colonnes blanches vont donc toutes de y = 95 à 205.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle `*` donne la bordure, la marge et le scale à tous les éléments. Les règles imbriquées ne changent que ce qui diffère. Le h3 garde `scale:10 1` sans le réécrire, et c'est ce qui le rend 20 fois plus large.
- `var(--y, 11Q dashed#333)` permet à un seul `border-inline` de servir pour les deux bordures : le h3 ne définit que `--y:3Q solid#fff`. Écrire `border-inline` deux fois, une dans chaque règle, donne la même image en 150 caractères.
- `+*` est le moyen le plus court d'atteindre body. `body{` donne la même image en 151 caractères.
- L'espace insécable tient en 1 caractère et donne sa ligne au h3. Avec une espace normale (149 caractères aussi), le h3 fait 0px de haut et les colonnes blanches disparaissent : 8 800 pixels changent.
- `margin:1` sur le h3 sert à annuler `margin:95 181`. Sans lui (140 caractères), le h3 part hors du canevas à droite, html grandit jusqu'à 212px de haut, chaque côté reçoit sept barres, et les colonnes sombres descendent en y = 146 : 28 280 pixels changent.
- Les hauteurs viennent gratuitement du mode quirks. Elles dépendent des marges : avec `margin:40-6` (149 caractères), body fait 30px de haut. Les colonnes sombres passent à 150px, de y = 75 à 225, et les colonnes blanches remontent de 20px : 4 800 pixels changent.
- `11Q` tient en 3 caractères pour une bordure de 10px, `3Q` en 2 caractères pour une de 2px. `10px` et `2px` donnent la même image, chacun en 150 caractères.
- Pas besoin d'espace dans `44-6`, dans `dashed#333` ni dans `solid#fff`, et `.2` se passe de son 0. `44 -6` et `0.2` donnent chacun la même image en 150 caractères, et `dashed #333` avec `solid #fff` en 151.
- Les balises fermantes sont omises. La fin du code ferme les blocs restés ouverts.
