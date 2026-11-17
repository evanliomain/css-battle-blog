---
title: "Un quart de tour par boîte : quatre demi-anneaux en 123 caractères"
ref: 2026-06-25
permalink: /fr/2026/06/25/un-quart-de-tour-par-boite/
description: "Comment un seul radial-gradient dessine un demi-anneau dans chaque boîte, et comment offset:ray(0deg) centre chaque boîte imbriquée et la tourne d'un quart de tour de plus que son parent, dans la cible CSS Battle du 25 juin 2026."
target: /assets/targets/2026-06-25.png
target_url: https://cssbattle.dev/play/vsqDKNu2ZyCHhsIFFDnD
colors: ["#fff", "#328fc1"]
player: cubachatou
chars: 123
score: 723.86
match: 100
code: |
  <dl><dt><p><style>*{height:300;background:radial-gradient(1q at top,#fff 5vw,#328FC1 0 60px,#0000)-5ch 45vw;offset:ray(0deg
---

La cible du 25 juin montre quatre demi-anneaux bleus sur un fond blanc. Ils tournent autour du centre comme un moulinet, et forment comme deux S entrelacés. Vegy ne dessine qu'un demi-anneau, avec un seul dégradé, et le donne à chaque boîte. `offset:ray(0deg)` pose chaque boîte sur le centre du canevas et la tourne d'un quart de tour, et chaque boîte imbriquée ajoute son quart de tour à celui de son parent : le même anneau sort sous quatre angles.

Utilisez les **Couleurs pédagogiques** pour voir quelle boîte peint quel anneau, et la **Vue large** pour voir les boîtes tournées.

{% include animations/2026-06-25.html lang=page.lang %}

## Le code, aéré

```css
<dl><dt><p><style>
* {                          /* html, body, dl, dt, p (head et style sont masqués) */
  height: 300;               /* 300px, sans unité */
  background:
    radial-gradient(
      1q at top,             /* un tout petit cercle, centré sur le bord haut */
      #fff 5vw,              /* blanc jusqu'à 20px */
      #328FC1 0 60px,        /* bleu de 20px à 60px */
      #0000                  /* puis transparent */
    ) -5ch 45vw;             /* décalé de 40px à gauche et 180px vers le bas */
  offset: ray(0deg           /* centré sur le centre du parent, tourné de -90° */
```

## Comment ça marche

### 1. Cinq boîtes

`*` vise html, head, body, dl, dt, p et style. head et style sont masqués : il reste cinq boîtes. Les balises ne sont pas fermées, donc chacune est dans la précédente : dl dans body, dt dans dl, p dans dt.

`height:300` n'a pas d'unité. Les pages de CSS Battle tournent en mode quirks, où un nombre seul est lu en px. html fait 400 × 300. body a sa marge par défaut de 8px, il fait donc 384 × 300. dl, dt et p prennent la largeur de body : 384 × 300 eux aussi. Sans l'offset, j'ai mesuré body, dl, dt et p au même endroit, en (8, 8).

### 2. Un dégradé, un demi-anneau

`radial-gradient(1q at top, …)` est un cercle de 1q de rayon, un quart de millimètre, 0,945px. Son centre est au milieu du bord haut de la tuile. Les arrêts de couleur se mesurent depuis le centre, le long d'un rayon, et continuent au-delà du cercle :

- `#fff 5vw` : blanc jusqu'à 20px (5vw font 5 % de 400px).
- `#328FC1 0 60px` : bleu de 0 à 60px. Un arrêt ne peut pas revenir avant le précédent, donc le 0 devient 20px : le bleu commence pile où finit le blanc, avec un bord net.
- `#0000` : transparent. Un dernier arrêt sans position va à 100 % du rayon, ici les 0,945px du cercle. C'est avant 60px, donc il remonte à 60px lui aussi : encore un bord net.

La tuile contient donc un disque blanc de 20px de rayon dans un anneau bleu de 60px de rayon. Seule la moitié basse est dans la tuile : un demi-anneau, ouvert vers le haut.

### 3. La position

`-5ch 45vw` déplace la tuile. 1ch est la largeur du chiffre 0 : 8px dans la police par défaut de 16px, donc -5ch font -40px. 45vw font 180px. Le centre du demi-anneau passe 40px à gauche de l'axe de la boîte et 180px sous son haut. Dans une boîte de 300px de haut, c'est 30px sous le centre.

La tuile se répète dans les deux sens, mais les copies suivantes de l'anneau sont à 384px ou 300px (400px pour le canevas). Aucune n'atteint une boîte.

### 4. html peint sur le canevas

Le fond de l'élément racine est peint sur tout le canevas, et il ne tourne pas avec html. L'anneau tombe en (200 − 40, 180) = (160, 180), ouvert vers le haut. Je l'ai vérifié avec un rendu où seul html garde son fond : l'anneau est en (160, 180) et s'ouvre vers le haut, alors que la boîte de html, elle, est tournée.

### 5. offset: ray(0deg)

`offset` pose une boîte sur un chemin. Ici, le chemin est un rayon d'angle 0deg : il pointe droit vers le haut. Avec l'`offset-position` par défaut, le rayon part du centre du bloc conteneur, et le centre de la boîte se pose là. `offset-rotate` vaut `auto` par défaut : la boîte tourne pour suivre le rayon, d'un quart de tour dans le sens inverse des aiguilles d'une montre, -90°.

- html est déjà centré sur le canevas, en (200, 150). Il tourne : 300 × 400, de y = −50 à 350.
- Le bloc conteneur de body est la boîte de html. body était 8px trop bas à cause de sa marge du haut. Il remonte en (8, 0), avec son centre en (200, 150).
- dl, dt et p ont la taille de leur parent et sont dans son coin : leurs centres sont déjà dessus.

Les quarts de tour s'additionnent, car chaque boîte est dans la précédente : body est à −180°, dl à −270°, dt à −360° et p à −450°. J'ai mesuré les quatre coins de chaque boîte : les cinq boîtes sont centrées sur (200, 150).

### 6. Quatre angles, quatre demi-anneaux

Chaque boîte a son demi-anneau 40px à gauche de son centre et 30px en dessous. Le quart de tour de la boîte emporte l'anneau autour de (200, 150) :

- body, −180° : l'anneau passe 40px à droite du centre et 30px au-dessus, en (240, 120), ouvert vers le bas. Il couvre x = 180 à 300, y = 60 à 120.
- dl, −270°, un quart de tour dans le sens des aiguilles d'une montre : (170, 110), ouvert vers la droite, x = 110 à 170, y = 50 à 170.
- dt, −360°, à l'endroit : (160, 180), ouvert vers le haut, x = 100 à 220, y = 180 à 240. C'est exactement la copie du canevas : la boîte de dt commence en x = 8, et 8 + 192 − 40 = 200 − 40 = 160. dt peint par-dessus.
- p, −450°, comme −90° : (230, 190), ouvert vers la gauche, x = 230 à 290, y = 130 à 250.

J'ai mesuré chaque anneau avec des rendus où une seule boîte garde son fond : 5 020 pixels bleus chacun, à ces positions.

### 7. L'image

Quatre demi-anneaux, à un quart de tour l'un de l'autre. Ils ne se touchent jamais : 10px de blanc séparent les bouts de deux voisins. Les centres blancs ne couvrent aucun autre anneau non plus.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul dégradé pour quatre anneaux, et une boîte imbriquée de plus par quart de tour. `<dl><dt><p>` donne trois blocs imbriqués en 11 caractères. Avec `<p><p><p>` (121 caractères), chaque `<p>` ferme le précédent : les trois p sont frères dans body, tous à −270°, et l'anneau de droite manque. 5 020 pixels changent.
- `offset:ray(0deg` centre et tourne la boîte en 15 caractères. `rotate:-90deg` (121 caractères) ne fait que la tourner : body garde son décalage de 8px, body, dl, dt et p finissent 8px plus à droite, et 5 920 pixels changent.
- `1q` donne la taille du cercle en 2 caractères. Il rend aussi minuscule le 100 % du rayon, si bien que `#0000` sans position finit à 60px, en bord net. Avec `circle at top` (127 caractères), le cercle va jusqu'au coin le plus loin, le bleu s'efface lentement sur tout le canevas, et 99 288 pixels changent. Sans `,#0000` (117 caractères), le bleu ne s'arrête jamais : 99 288 pixels changent aussi.
- Le `0` de `#328FC1 0 60px` fait un bord net entre le blanc et le bleu. Avec `#328FC1 60px` (121 caractères), le blanc se fond dans le bleu entre 20px et 60px, et 18 840 pixels changent. `#328FC1 5vw 60px` donne la même image en 125 caractères.
- `5vw` vaut 20px en 3 caractères. `20px` donne la même image en 124 caractères.
- `-5ch` vaut −40px et `45vw` vaut 180px, en 4 caractères chacun. `-40px 180px` donne la même image en 125 caractères.
- L'intérieur de l'anneau est `#fff`, 4 caractères, la couleur du canevas vide. Dans mon rendu, `#0000` à la place donne la même image en 124 caractères.
- `height:300` n'a pas d'unité. `300px` donne la même image en 125 caractères. Sans la hauteur (112 caractères), les boîtes perdent leurs 300px et 11 960 pixels changent.
- Pas besoin d'espace entre `)` et `-5ch`. Avec l'espace, la même image prend 124 caractères.
- Rien n'est fermé. `)}` à la fin donne la même image en 125 caractères.
