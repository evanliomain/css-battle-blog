---
title: "Une image unie et une découpe arrondie : un dôme et deux barres en 138 caractères"
lang: fr
ref: 2026-11-20
permalink: /fr/2026/11/20/une-image-unie-et-une-decoupe-arrondie/
description: "Comment trois paragraphes vides, une image() unie remontée d'un demi-canevas et un seul clip-path arrondi sur le body dessinent la cible CSS Battle du 20 novembre 2026 : un dôme et deux barres sombres sur un fond vert et moutarde."
target: /assets/targets/2026-11-20.png
target_url: https://cssbattle.dev/play/Xq0c8EROGbOq6rA5FlRC
colors: ["#0b2429", "#17504d", "#998235"]
player: selenit
chars: 138
score: 707.36
match: 100
code: |
  <p><p><p><style>p{border:solid 5vh#0B2429;margin:65 0-25}&>*{background:image(#17504D)0-50vh space#998235;clip-path:inset(0 140q round 1in
---

La cible du 20 novembre est coupée en deux : vert foncé en haut, moutarde en bas. Au milieu, en colonne, un dôme sombre et deux barres sombres de 120 de large. Ilya Streltsyn dessine les barres avec trois paragraphes vides et leurs bordures. Le fond est une `image()` unie, remontée d'un demi-canevas. Un seul `clip-path` arrondi sur le `body` coupe ensuite les barres à la bonne largeur, et ses coins ronds font de la première barre le dôme.

La **vue large** montre la tuile verte à moitié hors du canevas et le `body` qui descend sous le canevas. Les **couleurs pédagogiques** montrent les paragraphes, le `body` et la tuile.

{% include animations/2026-11-20.html lang=page.lang %}

## Le code, aéré

```css
<p><p><p>                          <!-- trois paragraphes vides -->
<style>
p {
  border: solid 5vh #0b2429;       /* 15px de chaque côté : une barre de 30 */
  margin: 65 0 -25;                /* barres en y = 65, 135, 205 */
}
& > * {                            /* les enfants de html : head et le body */
  background: image(#17504d)       /* une tuile unie, 400 × 300 */
              0 -50vh              /* remontée de 150px */
              space                /* une seule tuile, pas de répétition */
              #998235;             /* la couleur en dessous */
  clip-path: inset(0 140Q round 1in); /* 132,28px de chaque côté, coins ronds */
}
```

## Comment ça marche

### 1. Trois paragraphes vides, trois barres

Un `<p>` vide n'a pas de contenu : il fait 0 de haut. `border:solid 5vh` lui donne une bordure de 15px sur ses quatre côtés (5vh d'un cadre de 300px). 15 en haut + 15 en bas, ça fait une barre sombre de 30 de haut. Un paragraphe est un bloc : la barre prend toute la largeur du `body`, 384, de x = 8 à 392.

### 2. `margin:65 0 -25` : les barres en 65, 135 et 205

En mode quirks, les nombres sans unité sont des px. Les marges verticales qui se touchent fusionnent :

- La marge haute du premier paragraphe (65) fusionne avec celle du `body` (8). La plus grande gagne : 65. Le `body` lui-même descend avec, en y = 65.
- Entre deux paragraphes, une marge de 65 rencontre une marge de −25. Une marge positive et une négative s'additionnent : 65 − 25 = 40.

Les barres commencent donc en y = 65, 65 + 30 + 40 = 135 et 205.

### 3. Le `body` descend jusqu'à y = 317

Seul en haut de la feuille, `&` désigne la racine, `html`. `&>*` vise les enfants de `html` : `head`, qui est caché, et le `body`. C'est un caractère de moins que `body`.

En mode quirks, le `body` remplit la hauteur de `html` moins ses marges. Sa marge haute vaut maintenant 65. En bas, sa marge de 8 fusionne avec le −25 du dernier paragraphe : 8 − 25 = −17. Ça donne 300 − 65 + 17 = 252. Je l'ai vérifié dans Chrome : le `body` fait 384 × 252, de y = 65 à y = 317. C'est utile à l'étape 6 : la découpe garde toute la hauteur du `body`, il doit donc descendre sous la dernière barre.

### 4. `image(#17504D)` : un aplat à la taille de `html`

`html` n'a pas de fond : celui du `body` part donc au canevas. Il reste placé sur la boîte de `html` : 400 × 300.

`image(#17504D)` est une image unie. Elle n'a pas de taille propre. Sans `background-size`, une telle image prend toute la zone de placement : une tuile verte de 400 × 300.

### 5. `0 -50vh space` : une seule tuile, remontée

`0 -50vh` remonte la tuile de 150px : elle va maintenant de y = −150 à y = 150. Sans rien d'autre, la tuile se répéterait, et une deuxième copie remplirait la moitié basse. `space` ne répète une tuile que si plusieurs tiennent. Une tuile de la taille de la zone ne tient qu'une fois : pas de répétition, et la position s'applique quand même. Sous y = 150, on voit la couleur du raccourci : `#998235`.

### 6. `clip-path:inset(0 140q)` : 120 de large

1Q vaut un quart de millimètre, soit 0,945px. Chrome donne 140q = 132,28px. `inset(0 140q)` garde toute la hauteur du `body` et retire 132,28 à gauche et à droite : 384 − 264,56 = 119,44 de large, de x = 140,28 à 259,72.

Le fond est déjà parti au canevas : la découpe ne le touche pas. Elle ne coupe que les trois barres.

### 7. `round 1in` : le dôme

`round 1in` donne à la découpe des coins de 96px. Deux rayons de 96 côte à côte demandent 192, et la découpe ne fait que 119,44 de large. Quand les rayons ne tiennent pas, le navigateur les réduit tous dans le même rapport : 119,44 / 192, soit 59,72.

En haut, les deux coins se rejoignent au milieu : un demi-cercle de rayon 59,72, centré en (200, 124,72). La première barre va de y = 65 à 95 : elle ne garde que les 30px du haut de ce demi-cercle. C'est le dôme. La deuxième barre commence en y = 135, sous les coins, et reste droite. Les coins du bas sont en bas du `body`, sous y = 257, loin de la dernière barre.

## Notes de golf

- `image(#17504D)0-50vh space#998235` peint la moitié du fond d'une couleur et le reste d'une autre, sans dégradé.
- Un seul `clip-path` fait deux choses : `inset` donne la largeur, `round` donne le dôme. `1in` suffit, puisque des rayons trop grands sont réduits.
- `140q` met les bords en 140,28 et 259,72 : une fraction de pixel d'écart, et la cible reste identique à 100 %.
- Trois `<p>` vides font trois barres sans `height` ni `width` : la bordure donne la hauteur, le bloc donne la largeur.
- `margin:65 0-25` : une seule valeur règle le décalage du haut (fusionné avec celui du `body`), l'écart de 40px (65 − 25), et pousse le bas du `body` sous le canevas.
- `&>*` au lieu de `body`, `5vh#0B2429` sans espace, et la règle n'est jamais fermée.
