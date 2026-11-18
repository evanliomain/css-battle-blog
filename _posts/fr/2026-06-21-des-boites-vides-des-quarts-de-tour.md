---
title: "Des boîtes vides, des quarts de tour : un viseur en 106 caractères"
ref: 2026-06-21
permalink: /fr/2026/06/21/des-boites-vides-des-quarts-de-tour/
description: "Comment quatre boîtes de 0 × 0 emboîtées, avec les mêmes trois ombres et un quart de tour de plus que leur parent, dessinent quatre équerres rouges autour d'un carré bleu, dans la cible CSS Battle du 21 juin 2026."
target: /assets/targets/2026-06-21.png
target_url: https://cssbattle.dev/play/YJ5FEvmSn4jjeldoB66K
colors: ["#004b8e", "#fff", "#ec1d25"]
player: emohdaziz
chars: 106
score: 745.65
match: 100
code: |
  <dt><p><style>*{margin:50%;box-shadow:0 0 0 32Q#004b8e,0 0 0 63Q#fff,56q 56q.0.99cm#ec1d25;offset:ray(0deg
---

La cible du 21 juin ressemble à un viseur : quatre équerres rouges autour d'un petit carré bleu, sur un fond blanc. Mohamed Ali dessine une équerre et le carré avec trois ombres box-shadow sur une boîte de 0 × 0. Quatre boîtes emboîtées reçoivent les mêmes ombres. `offset:ray(0deg)` place chacune au centre du canevas et la tourne d'un quart de tour de plus que son parent : l'équerre sort aux quatre coins.

Utilisez les **Couleurs pédagogiques** pour voir quelle boîte peint quelle équerre et pour voir les ombres blanches, et la **Vue large** pour voir la boîte de marge de html descendre sous le canevas.

{% include animations/2026-06-21.html lang=page.lang %}

## Le code, aéré

```css
<dt><p>                        /* deux blocs de plus : html > body > dt > p */
<style>
* {                            /* html, head, body, dt, p, style */
  margin: 50%;                 /* 200px pour html, 0 pour les autres */
  box-shadow:
    0 0 0 32Q #004b8e,         /* bleu, étalement 30,24px : un carré de 60,47px */
    0 0 0 63Q #fff,            /* blanc, étalement 59,53px : un carré de 119,06px */
    56q 56q .0 .99cm #ec1d25;  /* rouge, décalé de 52,91px, étalement 37,42px */
  offset: ray(0deg             /* sur le centre du parent, tourné de -90° */
```

## Comment ça marche

### 1. Quatre boîtes emboîtées

`*` vise html, head, body, dt, p et style. Aucune balise n'est fermée : p est dans dt, et style est dans p. head et style sont masqués : il reste quatre boîtes, chacune dans la précédente, html, body, dt et p.

### 2. margin:50% en fait des points

Une marge en % se calcule toujours sur la largeur du bloc conteneur, même en haut et en bas. Le bloc conteneur de html est le canevas, large de 400px : html a 200px de chaque côté. Sa largeur vaut 400 − 200 − 200 = 0. Rien à l'intérieur n'a de hauteur, donc sa hauteur vaut 0 aussi.

Le bloc conteneur de body est html, large de 0px : 50 % de 0 font 0. Même chose pour dt et p. Sans l'offset, j'ai mesuré les quatre boîtes à 0 × 0, en (200, 200).

Sans `margin:50%` (95 caractères), les boîtes ne sont plus des points : les ombres deviennent de longues bandes, et 62 980 pixels changent.

### 3. Trois ombres sur un point

Les tailles sont en Q, un quart de millimètre : 1Q = 0,945px. `Q` et `q` sont la même unité, la casse ne compte pas pour les unités. `cm` vaut 37,8px.

Sur une boîte de 0 × 0, une ombre avec un étalement est un carré de deux fois l'étalement, centré sur la boîte plus le décalage de l'ombre :

- `0 0 0 32Q#004b8e` : 32Q = 30,24px, un carré bleu de 60,47px.
- `0 0 0 63Q#fff` : 63Q = 59,53px, un carré blanc de 119,06px.
- `56q 56q.0.99cm#ec1d25` : décalé de 56q = 52,91px vers la droite et le bas, sans flou, étalement .99cm = 37,42px. Un carré rouge de 74,83px.

La première ombre est peinte dessus. Le bleu est sur le blanc, et le blanc cache l'intérieur du rouge. Il ne reste que la partie du carré rouge hors du blanc : une équerre, épaisse de 30,80px (52,91 + 37,42 − 59,53).

### 4. offset: ray(0deg)

`offset` place une boîte sur un chemin. Ici, le chemin est un rayon à 0deg, qui pointe droit vers le haut. `offset-position` vaut `normal` par défaut : le rayon part du centre du bloc conteneur, et le centre de la boîte s'y place. Le bloc conteneur de html est le canevas : html remonte de (200, 200) à (200, 150). J'ai mesuré ce déplacement.

`offset-rotate` vaut `auto` par défaut : la boîte tourne pour suivre le rayon. Le rayon pointe vers le haut, donc la boîte tourne d'un quart de tour vers la gauche, −90°. Les ombres tournent avec la boîte. Le décalage rouge de 52,91px vers la droite et le bas devient 52,91px vers la droite et le haut : l'équerre de html passe en haut à droite.

Avec `offset-rotate:0deg` en plus (126 caractères), les boîtes restent centrées mais ne tournent pas : les quatre équerres s'empilent en bas à droite, et 11 731 pixels changent.

### 5. Les rotations s'additionnent

Le bloc conteneur de body est html, un point déjà en (200, 150) : body s'y centre aussi. body est dans html, donc sa propre rotation s'ajoute à celle de html : −180°. dt est à −270°, et p à −360°, un tour complet. J'ai rendu le code avec un rouge différent pour chaque boîte, pour vérifier où va chaque équerre :

- html, −90° : en haut à droite, x = 215,50 à 290,33, y = 59,67 à 134,50.
- body, −180° : en haut à gauche, x = 109,67 à 184,50.
- dt, −270° : en bas à gauche, y = 165,50 à 240,33.
- p, −360° : en bas à droite, comme sans aucune rotation.

Il y a 31px d'écart entre deux équerres, de 184,50 à 215,50.

### 6. Le blanc et le bleu par-dessus

Chaque boîte est peinte après son parent : les ombres de p sont peintes en dernier. Les quatre carrés blancs sont au même endroit, x = 140,47 à 259,53 et y = 90,47 à 209,53, et les quatre carrés bleus en x = 169,76 à 230,24 et y = 119,76 à 180,24. Chaque carré rouge est déjà sous son propre blanc : les équerres restent des équerres. J'ai vérifié que le blanc compte : sans ombre blanche sur dt et p, leurs carrés rouges apparaissent entiers en bas, et 3 960 pixels changent.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres pour quatre équerres, et un bloc emboîté par équerre. `<dt><p>` donne deux blocs emboîtés en 7 caractères : une balise ouvrante `<p>` ne ferme pas un dt. Avec `<p>` seul (102 caractères), il n'y a que trois boîtes, l'équerre en bas à droite manque, et 4 105 pixels changent. Avec `<p><p>` (105 caractères), le second p ferme le premier : les deux p sont frères dans body, tous deux à −270°, et 4 140 pixels changent. `<p><dt>` (106 caractères) fait de même, car une balise ouvrante dt ferme le p.
- `offset:ray(0deg` centre et tourne chaque boîte en 15 caractères. `rotate:90deg` (103 caractères) tourne aussi chaque boîte d'un quart de tour de plus que son parent, mais les boîtes restent en (200, 200) : toute l'image est 50px trop bas, et 26 932 pixels changent.
- Un nombre peut commencer par un point, et un point ne peut pas faire partie d'une unité. `56q.0.99cm` se lit donc 56q, puis `.0`, puis `.99cm`, sans espace. `56q 56q 0 .99cm` donne la même image en 107 caractères.
- Le flou `.0` est nécessaire : l'étalement est la quatrième longueur, il faut donc un flou avant lui.
- `32Q`, `63Q` et `56q` valent 30,24px, 59,53px et 52,91px en 3 caractères chacun.
- Rien n'est fermé. `)}` à la fin donne la même image en 108 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel est très proche de la cible, mais pas identique : 1 442 pixels diffèrent de plus de 8 sur un canal. Tous sont sur les bords des formes. Les bords tombent entre deux pixels, par exemple le bord gauche des équerres en x = 109,67, et mon rendu y a une ligne de pixels en demi-teinte, là où la cible est nette. 604 d'entre eux sont sur les bords extérieurs des quatre équerres. Le juge de CSS Battle donne au code 100 % de correspondance.
