---
title: "Une ombre dedans, une dehors : six paires de blocs en 134 caractères"
ref: 2026-04-26
permalink: /fr/2026/04/26/une-ombre-dedans-une-dehors/
description: "Comment un fond transparent donne sa couleur au canevas, comment six paragraphes vides et flottants se rangent sur deux lignes, et comment une ombre inset et une ombre extérieure laissent le même trou carré, dans la cible CSS Battle du 26 avril 2026."
target: /assets/targets/2026-04-26.png
target_url: https://cssbattle.dev/play/SftZUdzTKh9Bmb4v9l3V
colors: ["#f9ddc6", "#594c94"]
player: 7R9WlalkmnObnjX3U0aolPmO0vO2
chars: 134
score: 711.53
match: 100
code: |
  <p><p><p><p><p><p><style>&{background:#E955;color:594C94;p{float:left;padding:20 30;margin:62 38-2 22;box-shadow:inset 5ch 5vw,5ch 5vw
---

La cible du 26 avril, ce sont six motifs violets sur un fond pêche, en deux rangées de trois. Chaque motif, c'est deux rectangles, l'un décalé vers le bas et la droite, avec un petit trou carré entre les deux. VerenaBerg les dessine avec six paragraphes vides qui flottent sur deux rangées. Chacun reçoit deux ombres avec le même décalage : une ombre inset qui remplit la boîte sauf un coin, et une ombre extérieure qui recopie la boîte au-dehors, sauf le même coin.

Avec **Couleurs pédagogiques**, les deux ombres prennent chacune leur couleur. **Vue large** montre où irait le quatrième paragraphe s'il restait sur la première rangée.

{% include animations/2026-04-26.html lang=page.lang %}

## Le code, aéré

```css
<p><p><p><p><p><p>              /* six paragraphes vides */
<style>
& {                             /* au premier niveau : html */
  background: #E955;            /* #EE9955 à 1/3, sur le blanc : #f9ddc6 */
  color: 594C94;                /* sans # : mode quirks */
  p {                           /* les six paragraphes */
    float: left;                /* côte à côte, depuis la gauche */
    padding: 20 30;             /* des boîtes de 60 × 40 */
    margin: 62 38-2 22;         /* 120px de large chacun, rangées à 100px */
    box-shadow: inset 5ch 5vw,  /* la boîte, moins un coin de 20 × 20 */
                5ch 5vw         /* une copie décalée de (40, 20), hors de la boîte */
/* la fin du code ferme les deux règles */
```

## Comment ça marche

### 1. Six paragraphes et un style

Le premier `<p>` ouvre body, donc head reste vide. Chaque `<p>` ferme le précédent : body contient six paragraphes frères. Le `<style>` atterrit dans le sixième, où il n'est pas affiché. Il n'y a pas de doctype : la page est en mode quirks, et un nombre seul comme `20` dans un padding est lu en px.

### 2. `&`, c'est html

Au premier niveau, `&` désigne la racine. Dans mon Chrome, getComputedStyle donne à html le fond `rgba(238, 153, 85, 0.333)` : `#E955`, c'est `#EE9955` avec une opacité de 0x55 = 85/255, un tiers.

Le fond de html passe sur tout le canevas, et il est transparent : le blanc en dessous se voit. Pour le rouge : 238 + (255 − 238) × 2/3 ≈ 249. Le vert donne 221 et le bleu 198. Mon rendu a `#f9ddc6` partout hors des motifs, la couleur de la cible.

### 3. Une couleur sans `#`

`color:594C94` n'a pas de `#`. En mode quirks, mon Chrome la lit quand même : getComputedStyle donne `rgb(89, 76, 148)` à html et aux paragraphes, qui en héritent. Les ombres plus bas n'ont pas de couleur à elles : elles prennent celle-ci. Sans cette déclaration (121 caractères), les ombres sont noires, et 24 000 pixels changent.

### 4. Six flottants

Le `p{` imbriqué veut dire `& p` : tous les paragraphes dans html. Les paragraphes sont vides, et un flottant sans contenu fait 0 × 0. `padding:20 30` donne à chacun une boîte de 60 × 40.

`margin:62 38-2 22`, c'est 62 en haut, 38 à droite, −2 en bas, 22 à gauche. Avec `float:left`, chaque paragraphe se place juste après le précédent et prend 22 + 60 + 38 = 120px. body garde sa marge de 8px par défaut : il va de x = 8 à 392, sur 384px. Trois flottants prennent 360px, donc les boîtes de la première rangée sont en x = 8 + 22 = 30, 150 et 270, et y = 8 + 62 = 70.

### 5. La seconde rangée

Le quatrième flottant finirait en x = 8 + 4 × 120 = 488, après le bord droit de body, en 392. Il descend, sous le bas des boîtes de marge des trois premiers : 8 + 62 + 40 − 2 = 108. Sa propre marge du haut ajoute 62 : sa boîte est en y = 170, en x = 30. Le cinquième et le sixième suivent, en x = 150 et 270.

getBoundingClientRect confirme les six boîtes : (30, 70), (150, 70), (270, 70), (30, 170), (150, 170), (270, 170), toutes de 60 × 40.

### 6. L'ombre inset

`5ch`, c'est cinq fois la largeur d'un « 0 ». Dans mon Chrome, la police par défaut est Times en 16px, où un « 0 » fait 8px de large : 5ch = 40px. `5vw`, c'est 5 % des 400px de large : 20px. getComputedStyle donne `40px 20px` pour les deux ombres.

Une ombre inset peint l'intérieur de la boîte, sauf là où serait la boîte décalée de son décalage. Décalée de (40, 20), la boîte ne recouvre plus que le coin en bas à droite de l'originale : 20 × 20, de x = 40 à 60 et de y = 20 à 40 dans la boîte. L'ombre inset remplit donc la boîte sauf ce carré. Avec l'ombre inset seule (126 caractères), chaque motif garde son rectangle du haut avec le coin découpé, et 12 000 pixels changent.

### 7. L'ombre extérieure

L'ombre extérieure est une copie de la boîte décalée de (40, 20) : de (70, 90) à (130, 130) pour le premier motif. Une ombre extérieure n'est jamais peinte sous sa propre boîte. La partie de la copie qui recouvre la boîte, c'est le même carré de 20 × 20 : il reste vide là aussi. Avec l'ombre extérieure seule (120 caractères), chaque motif garde son rectangle du bas avec le coin découpé, et 12 000 pixels changent.

Ensemble, les deux ombres dessinent deux rectangles de 60 × 40 qui se recouvrent sur un carré, et ce carré, c'est le trou. Chaque motif a 2 × 2 400 − 2 × 400 = 4 000 pixels violets, et mon rendu en compte 24 000 pour les six.

## Notes de golf

Plus bas, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&` fait 1 caractère, `html` en fait 4. La règle `p{` est dans la règle `&{` : la première règle n'a jamais besoin de son `}`. Avec `html{background:#E955;color:594C94}p{` (137 caractères), l'image est la même.
- `#E955` fait 5 caractères et donne la couleur du canevas à travers le blanc. Avec `#F9DDC6` (136 caractères), l'image est la même.
- `594C94` n'a pas besoin de `#` en mode quirks. Avec `#594C94` (135 caractères), l'image est la même.
- Un seul `color` sert aux deux ombres. Avec la couleur écrite dans chaque ombre, `inset 5ch 5vw#594C94,5ch 5vw#594C94`, et sans `color` (135 caractères), l'image est la même.
- `5ch` et `5vw` font 3 caractères chacun, `40px` et `20px` en font 4. Avec `40px 20px` dans les deux ombres (138 caractères), l'image est la même.
- Deux ombres dessinent le motif et laissent le trou. Avec `background:#594C94;box-shadow:5ch 5vw` (139 caractères), la boîte est remplie, le trou disparaît, et 2 400 pixels changent.
- Pas d'espace avant un `-`. Avec `38 -2` (135 caractères), l'image est la même.
- La marge basse de −2 met les rangées à 100px pile l'une de l'autre. Avec `38 0` (134 caractères, la même longueur), la seconde rangée est 2px plus basse, en y = 172, et 1 440 pixels changent.
- `float:left` fait les rangées. Sans lui (123 caractères), chaque paragraphe est un bloc de 384 − 22 − 38 = 324px de large, ils s'empilent l'un sous l'autre, et 33 392 pixels changent.
- Les nombres seuls ont besoin du mode quirks. Avec `<!doctype html>` devant (149 caractères), les motifs disparaissent, et 24 000 pixels changent. Ajouter le `#` à la couleur (150 caractères) ne les ramène pas. Ajouter aussi `px` au padding et aux marges (163 caractères) les ramène : l'image est la même.
- Les six `<p>` ne sont jamais fermés, pas plus que les deux règles et le `<style>`. Avec `}}` à la fin (136 caractères), l'image est la même.
