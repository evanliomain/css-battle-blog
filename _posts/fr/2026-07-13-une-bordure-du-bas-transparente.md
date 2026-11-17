---
title: "Une bordure du bas transparente : un marque-page en 124 caractères"
ref: 2026-07-13
permalink: /fr/2026/07/13/une-bordure-du-bas-transparente/
description: "Comment la bordure du haut de html, 20px, fait la barre foncée, et comment body, 150 × 240 avec deux bordures latérales jaunes de 75px et une bordure du bas transparente de 60px, tire son encoche du partage en biais des coins, dans la cible CSS Battle du 13 juillet 2026."
target: /assets/targets/2026-07-13.png
target_url: https://cssbattle.dev/play/tpgHg0s1msgLUqaMEbAQ
colors: ["#fef8bb", "#b46c31", "#331d1d"]
player: levito
chars: 124
score: 722.68
match: 100
code: |
  <style>*{margin:30-20;border:5vw solid;border-color:331D1D#FEF8BB#0000;*{margin:-5%125;border-width:0 75 60;background:#A51D
---

La cible du 13 juillet montre un marque-page jaune pâle sur un fond brun-orangé. Il pend devant une barre brun foncé, près du haut, et son extrémité du bas a une encoche en triangle. Veit Lehmann le dessine avec deux boîtes et rien que des bordures. La barre, c'est la bordure du haut de html. Le marque-page, c'est body : deux bordures latérales jaunes, et une bordure du bas transparente qui découpe l'encoche.

Choisissez **Vue large** pour voir les bordures latérales jaunes de html hors du canevas, et cochez **Couleurs pédagogiques** pour distinguer les trois bordures de body.

{% include animations/2026-07-13.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                 /* html, et tous les autres éléments */
  margin: 30-20;                    /* html : 30 en haut et en bas, -20 sur les côtés */
  border: 5vw solid;                /* 5vw = 20px */
  border-color: 331D1D#FEF8BB#0000; /* haut, côtés, bas */
  * {                               /* tout élément placé dans un autre : body */
    margin: -5%125;                 /* -20px en haut et en bas, 125px sur les côtés */
    border-width: 0 75 60;          /* haut 0, côtés 75, bas 60 */
    background: #A51D               /* passe au canevas entier */
```

## Comment ça marche

### 1. Le fond de body remplit le canevas

html n'a pas de fond. Dans ce cas, le navigateur peint le fond de body sur tout le canevas, et body lui-même n'en peint aucun. `#A51D`, c'est `#aa5511` avec une opacité `D`, 221/255, donc opaque à 87 % environ. Sur le blanc du canevas, il donne un brun-orangé : #b56c31 dans mon Chrome, #b46c31 dans la cible. Sans le `background` (107 caractères), le canevas reste blanc : 83 590 pixels changent.

### 2. html : la barre foncée

Pas de doctype : la page est en mode quirks. Le premier `*` vise tous les éléments. Pour html, c'est la seule règle.

`margin:30-20` se lit comme deux valeurs : 30 en haut et en bas, −20 sur les côtés. html fait 440 de large, de x = −20 à 420. En mode quirks, html prend la hauteur du canevas moins ses marges : 300 − 60 = 240. getBoundingClientRect donne (−20, 30), 440 × 240.

`5vw`, c'est 5 % des 400px de large du canevas : 20px. `border-color` reçoit trois valeurs : le haut, la gauche et la droite, le bas. La bordure du haut, `331D1D`, fait la barre foncée de y = 30 à 50. Le mode quirks accepte cette couleur hexadécimale sans son `#`. Les bordures latérales sont jaunes, mais elles sont en x = −20 à 0 et 400 à 420, hors du canevas. La bordure du bas, `#0000`, est transparente. Le contenu de html fait 400 × 200, à partir de (0, 50).

### 3. body : 150 × 240

Le `*` imbriqué vaut `* *` : tout élément placé dans un autre, donc tout sauf html. body est le seul affiché. Les deux règles pèsent autant, et la règle imbriquée vient après : elle l'emporte pour `margin` et `border-width`. body garde le style `solid` et les couleurs de la règle extérieure.

Une marge en pourcentage est une part de la largeur du bloc parent, même en haut : 5 % des 400px du contenu de html font 20px. body reçoit donc −20 en haut et en bas, et 125 de chaque côté. Il fait 400 − 250 = 150 de large, à partir de x = 125. En mode quirks, body s'étire sur la hauteur du contenu de html, 200, moins ses propres marges : 200 + 40 = 240. Avec −20 en haut, il commence en y = 30, sur la bordure du haut de html, et finit en y = 270. Avec `-9%` à la place (même longueur), body fait 272 de haut, de y = 14 à 286 : getBoundingClientRect le confirme dans les deux cas.

### 4. Deux bordures latérales, pas de contenu

`border-width:0 75 60` donne rien en haut, 75 à gauche et à droite, 60 en bas. 75 + 75 = 150 : les bordures remplissent toute la largeur de body, et son contenu fait 0 de large et 180 de haut. Les bordures latérales sont jaunes (`#FEF8BB`). Elles couvrent la barre foncée de html entre x = 125 et 275.

### 5. L'encoche

Là où deux bordures se rencontrent, le navigateur partage le coin selon la diagonale qui va du coin extérieur au coin intérieur. Le contenu fait 0 de large, donc les deux coins intérieurs sont le même point : (200, 210), 60px au-dessus du bas de body. La bordure du bas devient un triangle : sommet en (200, 210), base de x = 125 à 275 en y = 270. Elle est `#0000`, transparente : le canevas brun se voit à travers. Les deux bordures jaunes qui restent forment le ruban et ses deux pointes.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `*` extérieur pose le style de bordure et les trois couleurs pour html et body à la fois. html montre la couleur du haut, body celle des côtés, et les deux utilisent le bas transparent.
- Le `*` imbriqué atteint body sans le nommer. `body` à la place (127 caractères) donne la même image. Sans imbrication, en fermant la première règle par `}` (même longueur), html reçoit aussi la seconde règle : sa bordure du haut passe à 0 et la barre foncée disparaît. 34 650 pixels changent.
- Le −20 sur les côtés de html sert deux fois. Il pousse les bordures latérales jaunes de html hors du canevas, et il donne au contenu de html 400 de large : `-5%` fait alors tout juste 20px, et body tombe en x = 125. Avec `30 0` (123 caractères), les bordures jaunes se voient aux bords du canevas, et body passe en (145, 32), 150 × 236. 20 402 pixels changent.
- `331D1D` n'a pas de `#` : le mode quirks le lit comme une couleur hexadécimale. `#331D1D` donne la même image en 125 caractères.
- `30-20` et `-5%125` : le signe moins et le `%` terminent le nombre qui les précède, pas besoin d'espace. `30 -20` ou `-20 125` donnent chacun la même image en 125 caractères.
- `5vw` fait 20px en 3 caractères. `20px` donne la même image en 125. Un `20` sans unité (123 caractères) ne passe pas dans le raccourci `border` de mon Chrome : toute la déclaration est ignorée, aucune bordure n'est tracée, et le canevas est tout brun. 36 590 pixels changent.
- `#A51D` tient en 5 caractères. La couleur opaque de la cible, `#B46C31`, donne la même image en 126.
- `#0000` est transparent en 5 caractères, et le `#` commence une nouvelle couleur sans espace. `#FEF8BB transparent`, avec son espace, prend 131 caractères, pour la même image.
- Rien n'est fermé. Fermer les deux règles et la balise style avec `}}</style>` donne 134 caractères, 10 de plus, pour la même image.
