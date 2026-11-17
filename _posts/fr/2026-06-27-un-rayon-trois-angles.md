---
title: "Un rayon, trois angles : un X jaune en 123 caractères"
ref: 2026-06-27
permalink: /fr/2026/06/27/un-rayon-trois-angles/
description: "Comment un seul offset:ray(45deg) pose html, body et p au centre du canevas et les tourne de −45°, −90° et −135°, pour former deux pilules croisées et une barre couchée, dans la cible CSS Battle du 27 juin 2026."
target: /assets/targets/2026-06-27.png
target_url: https://cssbattle.dev/play/0QaJpeTOUp1XCAVxQSX6
colors: ["#e3e46f", "#5dbcf9"]
player: cubachatou
chars: 123
score: 723.86
match: 100
code: |
  <p><style>*{width:0;height:60;border:5ch solid#E3E46F;background:#5DBCF9;offset:ray(45deg)}&,p{border-radius:9in;height:150
---

La cible du 27 juin est un X jaune pâle aux bouts arrondis, sur fond bleu ciel. Les encoches de gauche et de droite, entre ses branches, sont coupées à plat. Vegy le construit avec trois boîtes emboîtées, html, body et p, faites d'une épaisse bordure jaune. Un seul `offset:ray(45deg)`, donné à toutes, pose chaque boîte au centre et la tourne de 45° de plus que son parent : html et p deviennent deux pilules croisées, et body se couche entre elles.

Utilisez les **Couleurs pédagogiques** pour distinguer les trois boîtes.

{% include animations/2026-06-27.html lang=page.lang %}

## Le code, aéré

```css
<p>
<style>
* {                          /* html, head, body, p et style */
  width: 0;                  /* la boîte n'est que bordure */
  height: 60;                /* body : 80 × 140 */
  border: 5ch solid#E3E46F;  /* 40px de jaune */
  background: #5DBCF9;       /* celui de html devient le canevas */
  offset: ray(45deg)         /* au centre, et tourné de −45° */
}
&,
p {                          /* & = html */
  border-radius: 9in;        /* 864px, ramené à 40px */
  height: 150                /* html et p : 80 × 230 */
```

## Comment ça marche

### 1. La page

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité vaut des px dans `height`.

Le HTML est `<p><style>`. Les éléments sont html, head, body, p, et style, qui se retrouve dans p. head et style sont masqués. html, body et p se voient, chacun dans le précédent. Le style n'est jamais fermé, pas plus que sa dernière règle.

### 2. Trois boîtes en bordure

`*` donne à chaque élément `width:0`, `height:60` et une bordure de `5ch`. `ch` est la largeur du « 0 » dans la police : 8px dans la police par défaut, Times en 16px. `5ch` vaut donc 40px, et chaque boîte fait 0 + 40 + 40 = 80px de large et 60 + 80 = 140px de haut.

Le contenu fait 0px de large, donc les bordures gauche et droite se touchent : toute la boîte est jaune.

`background:#5DBCF9` va aussi à chaque élément. Le fond de html peint tout le canevas : c'est le bleu ciel. Sur body et p, le fond est sous la bordure, qui le couvre.

Sans `offset`, les boîtes suivent le flux de la page : html en (0, 0), body en (48, 48), après la bordure de 40px de html et sa propre marge de 8px, et p en (88, 88), juste à l'intérieur de la bordure de body.

### 3. Deux pilules

Au premier niveau d'une feuille de style, `&` désigne la racine : html. `&,p` vise donc html et p.

`height:150` leur donne 80 × 230. `border-radius:9in` vaut 864px, bien plus que la boîte ne peut en prendre : le rayon est ramené à 40px, la moitié des 80px de large. Les deux bouts deviennent des demi-cercles, et les boîtes des pilules, avec une partie droite de 150px. body garde `height:60` : il reste à 80 × 140, avec des coins carrés.

### 4. offset:ray(45deg) : au centre

`offset` donne un chemin à l'élément. `ray(45deg)` est une ligne droite qui part du centre du bloc conteneur de l'élément. `offset-distance` vaut 0, donc l'élément reste au départ : son centre va sur ce point, quels que soient ses marges et sa place dans le flux.

- Le bloc conteneur de html est le canevas : son centre est (200, 150).
- Celui de body est la boîte de contenu de html, 0 × 150, au milieu de html : son centre est celui de html.
- Celui de p est la boîte de contenu de body, 0 × 60 : son centre est celui de body.

Les trois boîtes finissent donc centrées sur (200, 150).

### 5. offset:ray(45deg) : les rotations

Le rayon pointe à 45° : 0° est droit vers le haut, et les angles tournent dans le sens des aiguilles d'une montre, donc il pointe en haut à droite. `offset-rotate` vaut `auto` par défaut : l'élément tourne pour que son axe x suive le rayon. Cela fait une rotation de 45° − 90° = −45°, un huitième de tour dans le sens inverse des aiguilles d'une montre.

Chaque élément tourne dans son parent, qui a déjà tourné. Les rotations s'additionnent donc :

- html tourne de −45° : sa pilule va d'en haut à gauche à en bas à droite.
- body tourne de −90° : il se couche, 140 × 80, de x = 130 à 270 et de y = 110 à 190.
- p tourne de −135° : sa pilule va d'en haut à droite à en bas à gauche.

J'ai vérifié les angles avec des rendus où body ou p est masqué ou recoloré.

### 6. Le X

Les deux pilules se croisent à angle droit, au centre. Chacune va jusqu'à 115px du centre le long de sa diagonale : le X va de x = 107 à 293 et de y = 57 à 243.

Entre les branches, le croisement laisse quatre encoches en forme de V. Les pointes de celles du haut et du bas sont en y = 93,4 et 206,6 : dans mon rendu, la colonne x = 200 est jaune de y = 93 à 206. body ne va que de y = 110 à 190, il ne les atteint donc pas.

À gauche et à droite, body remplit les encoches jusqu'en x = 130 et 270. Leurs pointes deviennent des côtés plats, de y = 136,6 à 163,4. Dans mon rendu, la ligne du milieu est jaune de x = 130 à 269.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `offset:ray(45deg)` sur `*` centre trois boîtes et leur donne trois angles différents, car les rotations s'additionnent du parent à l'enfant. Une seule déclaration place et tourne. Le raccourci `offset` est plus court que la propriété elle-même : `offset-path:ray(45deg)` donne la même image en 128 caractères.
- `&` vise html en 1 caractère. `html,p` donne la même image en 126.
- `height:60` sur `*` sert à body : html et p reçoivent 150 dans la deuxième règle. Sans `height:60;` (113 caractères), body prend la hauteur de son contenu, p : 230px, soit 310px avec ses bordures. Après la rotation, il va de x = 45 à 355, et 12 400 pixels changent.
- 60 donne à body 140px de long, pour que ses bouts tombent en x = 130 et 270. Avec `height:50` ou `height:70` (même longueur), les côtés plats rentrent ou sortent de 5px, et 240 ou 340 pixels changent.
- `width:0` fait de chaque boîte une pure bordure : le fond bleu ne se voit jamais sur les formes. Avec `width:1` (même longueur), une ligne bleue de 1px court au milieu des formes partout où rien ne la couvre, et 1 228 pixels changent.
- `5ch` vaut 40px en 3 caractères. `40px` donne la même image en 124.
- `9in` est un grand rayon en 3 caractères, et il est ramené à 40px. `40px` donne la même image en 124.
- Le `background` est dans la règle `*`, déjà ouverte : le bleu de html devient le canevas, et sur body et p il reste caché sous la bordure.
- Pas besoin d'espace entre `solid` et `#`. `solid #E3E46F` donne la même image en 124 caractères.
- Pas d'unité : `height:60px` et `height:150px` donnent la même image en 127 caractères.
- Rien n'est fermé. `}` à la fin donne la même image en 124 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 726 pixels, avec la même règle que dans les notes de golf. Tous sont sur les bords des deux pilules, à moins de 0,61px du bord : 434 sur les bouts arrondis et 292 sur les côtés droits à 45°. Les côtés plats de body, en x = 130 et 270, sont identiques à la cible. De près, les bords de la cible sont plus durs : elle a 36 couleurs différentes, mon rendu 180. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
