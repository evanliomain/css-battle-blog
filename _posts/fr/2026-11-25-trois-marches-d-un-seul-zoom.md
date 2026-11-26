---
title: "Un zoom qui se compose : trois marches blanches en 106 caractères"
lang: fr
ref: 2026-11-25
permalink: /fr/2026/11/25/trois-marches-d-un-seul-zoom/
description: "Comment une bordure, une marge et zoom:.9 partagés par trois boîtes imbriquées dessinent la cible CSS Battle du 25 novembre 2026 : des marches blanches sur un fond vert sauge, coupées par un trou."
target: /assets/targets/2026-11-25.png
target_url: https://cssbattle.dev/play/DW1tfZGD1dHngYqiTcNe
colors: ["#fff", "#597d"]
player: benjamintordjman
chars: 106
score: 745.65
match: 100
code: |
  <img height=95><style>*{zoom:.9;margin:-12.7 0;border-inline:66q solid#fff}&{margin:150-7;background:#597d
---

La cible du 25 novembre montre des blocs blancs sur un fond vert sauge, le long de la ligne du milieu. À gauche, trois marches grandissent vers le centre : 50 × 30, 50 × 50, puis 90 × 70. À droite, après un trou de 110px, deux marches rapetissent vers le bord : 50 × 50, puis 50 × 30. Benjamin Tordjman les dessine avec trois boîtes imbriquées, `html`, `body` et une `<img>` vide, qui partagent une seule règle. Leurs bordures latérales sont les marches. `zoom:.9` sur chaque boîte la rend plus petite que son parent : une seule largeur de bordure donne trois tailles.

Les **couleurs pédagogiques** donnent à chaque boîte sa couleur, et la **vue large** montre `html` qui dépasse des deux côtés du canevas.

{% include animations/2026-11-25.html lang=page.lang %}

## Le code, aéré

```css
<img height=95>                  /* une troisième boîte : html > body > img */
<style>
* {                              /* la même règle pour les trois */
  zoom: .9;                      /* ×0,9, ×0,81, ×0,729 */
  margin: -12.7 0;               /* body et img dépassent en haut et en bas */
  border-inline: 66q solid #fff; /* bordures blanches à gauche et à droite : les marches */
}
& {                              /* html */
  margin: 150 -7;                /* 135px plus bas, 6,3px au-delà de chaque côté */
  background: #597d;             /* passe au canevas : le vert sauge */
}
```

## Comment ça marche

### 1. Trois boîtes et une bordure

`<img height=95>` est la seule balise. Le navigateur la met dans le `body`, qui est dans `html` : trois boîtes, chacune dans la précédente. Une `<img>` sans `src` n'a pas d'image, donc son contenu fait 0 de large. Je l'ai mesuré : l'`<img>` est exactement aussi large que ses deux bordures.

`*` donne aux trois boîtes la même `border-inline` : une bordure blanche à gauche et à droite, rien en haut ni en bas. `66q`, c'est 66 quarts de millimètre, 62,36px. Sans le zoom, Chrome la dessine à 62px sur chaque boîte.

Chaque boîte est une bordure blanche, un milieu transparent et une autre bordure blanche. Les boîtes sont les unes dans les autres, donc leurs bordures se rangent côte à côte : ce sont les marches. Le milieu du `body` que l'`<img>` ne couvre pas reste transparent : c'est le trou vert.

### 2. Le zoom se compose

`zoom:.9` est dans la règle `*`, donc toutes les boîtes l'ont. Un enfant est zoomé dans un parent déjà zoomé : `html` est dessiné à ×0,9, le `body` à ×0,81 et l'`<img>` à ×0,729.

Tout rétrécit avec lui : la bordure, les marges et la hauteur de l'`<img>`. 62,36 × 0,9 = 56,12, × 0,81 = 50,51, × 0,729 = 45,46. Chrome arrondit une largeur de bordure au pixel inférieur, et j'ai mesuré 56, 50 et 45px. Les marches de la cible font 50 de large, puis 50, puis 90 pour l'`<img>` (deux bordures de 45).

### 3. La bande de html

`&` tout seul, c'est la racine, `html`. Sa `margin:150-7` est dans le zoom de `html` : 150 × 0,9 = 135px en haut, −7 × 0,9 = −6,3px de chaque côté. Avec une marge latérale négative, `html` est plus large que le canevas : je l'ai mesuré de x = −6,3 à 406,3. Ses bordures de 56px montrent 49,7px sur le canevas de chaque côté. Avec `margin:150 0`, la bande blanche de gauche ferait 56 de large au lieu d'environ 50.

La page n'a pas de doctype, elle est donc en mode quirks, où `html` s'étire sur la hauteur restante : 300 − 2 × 135 = 30px. La ligne de l'`<img>` ajoute 0,19, et j'ai mesuré `html` de y = 135 à 165,19.

### 4. Le body

Le `body` remplit la boîte de contenu de `html` : x = 49,7 à 350,3. Sa `margin:-12.7 0` vaut −12,7 × 0,81 = −10,29px en haut et en bas : il dépasse de `html` d'autant. Je l'ai mesuré à 50,75 de haut, de y = 124,72 à 175,47. Ses deux bordures de 50px sont les marches de 50 × 50, à gauche (x = 49,7 à 99,7) et à droite (x = 300,3 à 350,3).

### 5. L'img

L'`<img>` est en ligne : elle se pose au début de la première ligne du `body`, en x = 99,7. `height=95` vaut 95 × 0,729 = 69,26px. Sa marge haute, −12,7 × 0,729 = −9,26px, la remonte de 9,26 au-dessus du `body` : je l'ai mesurée de y = 115,47 à 184,72. Avec sa largeur nulle et ses deux bordures de 45px, elle fait 90 de large, jusqu'à x = 189,7.

C'est la plus haute marche, 90 × 70 dans la cible. De x = 189,7 à 300,3, le `body` montre son milieu transparent : le trou vert.

### 6. Le vert

`html` a un fond, qui passe donc à tout le canevas, blanc au départ. `#597d` est une couleur à 4 chiffres avec alpha : `#559977` à `dd` = 221/255 = 86,7 % d'opacité. Posé sur le blanc, il donne rgb(108 167 137) dans mon rendu. La cible est en `#6da78a`, rgb(109 167 138), à un cran sur deux canaux. Mon test local compte 0 pixel faux, et le site donne 100 %.

## Notes de golf

- `<img height=95>` est une boîte avec une hauteur et sans CSS pour elle : pas de `src`, pas de balise fermante, et sa largeur, ce sont ses bordures.
- Une seule règle `*` habille les trois boîtes, et `&` vise `html` seul en 1 caractère au lieu de 4.
- `zoom:.9` sur `*` fait d'une bordure, d'une marge et d'une hauteur trois tailles différentes, une par niveau.
- `border-inline` pose les bordures gauche et droite en une propriété, et `66q` écrit 62,36px en 3 caractères.
- `150-7` se passe d'espace : le signe moins commence la deuxième valeur.
- `#597d` a 2 caractères de moins que `#6da78a`, et le canevas blanc dessous fait le reste.
- Le `<style>` et la dernière règle ne sont jamais fermés.
