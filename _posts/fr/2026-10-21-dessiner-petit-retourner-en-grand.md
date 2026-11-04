---
title: "Dessiner petit, retourner en grand : un logo radar en 168 caractères"
lang: fr
ref: 2026-10-21
permalink: /fr/2026/10/21/dessiner-petit-retourner-en-grand/
description: "Comment un dessin de 42px, fait d'une bordure double, d'un body, de son ombre et d'une puce de liste, devient la cible CSS Battle du 21 octobre 2026, agrandi et retourné par scale:-5."
target: /assets/targets/2026-10-21.png
target_url: https://cssbattle.dev/play/EvI5R1ccxSuBhrVqgIEr
colors: ["#e9d97d", "#173c46"]
player: benjamintordjman
chars: 168
score: 680.66
match: 100
code: |
  <dd><li><style>*{background:#E9D97D;color:173C46}&{border-radius:50%;margin:129 179;border:3mm double;scale:-5;>*{margin:10 12-11-36;box-shadow:4px 0;font:45q/0 Courier
---

La cible du 21 octobre est un disque bleu pétrole entouré de deux arcs épais, ouverts en haut à droite, avec une barre qui monte du disque jusqu'en haut de l'arc extérieur. On dirait un logo de radar ou de signal. Benjamin Tordjman dessine le tout cinq fois plus petit, puis `scale:-5` l'agrandit et le retourne d'un seul coup. Les deux anneaux sont une seule bordure `double`, et le disque est la puce d'un élément de liste.

{% include animations/2026-10-21.html lang=page.lang %}

## Le code, aéré

```css
* {
  background: #E9D97D;
  color: 173C46;                 /* couleur de la bordure, de l'ombre et de la puce */
}
& {                              /* html */
  border-radius: 50%;
  margin: 129 179;               /* une boîte de 42×42 au centre */
  border: 3mm double;            /* 11px : trait de 4px, vide de 3px, trait de 4px */
  scale: -5;                     /* ×5 et un demi-tour */
  > * {                          /* head (caché) et body */
    margin: 10 12 -11 -36;
    box-shadow: 4px 0;
    font: 45q/0 Courier;         /* 42,5px, hauteur de ligne 0 */
  }
}
```

## Comment ça marche

Toutes les tailles de la cible sont des multiples de 5 : des anneaux de rayon 105 à 85 et de 70 à 50, une barre de 20px, un disque de 60px. La solution dessine donc tout à l'échelle 1/5 autour du centre, (200, 150), et laisse `scale:-5` faire le reste.

### 1. html est un rond de 42px à deux anneaux

`&` seul, c'est `html`. `margin:129 179` laisse une boîte de 42px de large. CSS Battle affiche la page en mode quirks, où `html` prend la hauteur de la page moins ses marges : 300 − 258 = 42px. `html` est donc une boîte de 42×42 centrée sur (200, 150), et `border-radius:50%` la rend ronde.

`border:3mm double` : 3mm font 11,3px, que Chrome trace en 11px. Une bordure `double` partage cette largeur en un trait, un vide et un trait : ici 4px, 3px et 4px. Sur une boîte ronde, ça donne deux anneaux fins, de rayon 21 à 17 et de 14 à 10. La bordure n'a pas de couleur à elle, elle prend donc `color` : `173C46`, écrit sans `#`, ce que le mode quirks accepte.

Le fond jaune de `html` n'est pas peint dans cette petite boîte : il couvre tout le canevas.

### 2. body cache un quart

`>*` dans `&` vise les enfants de `html` : `head`, qui reste caché, et `body`. `body` se place dans la boîte de contenu de 20×20 de `html` (x de 190 à 210, y de 140 à 160), et `margin:10 12 -11 -36` le déplace :

- largeur : 20 + 36 − 12 = 44px, de x=154 à 198 ;
- hauteur : en mode quirks, `body` prend la hauteur de son parent moins ses marges : 20 − 10 + 11 = 21px, de y=150 à 171.

Son fond jaune, reçu par `*`, cache le quart bas-gauche des anneaux.

### 3. Son ombre est la barre

`box-shadow:4px 0` est une copie du `body` décalée de 4px à droite. Une ombre extérieure n'est pas peinte sous sa propre boîte : seule une bande de 4×21 se voit, de x=198 à 202, juste après la ligne du centre. Elle prend aussi `color` : une barre bleu pétrole.

### 4. Une puce de liste fait le disque

Le `<dd>` et le `<li>` sont dans `body`. Un `<dd>` décale son contenu de 40px par défaut : le `<li>` commence donc en x=154 + 40 = 194, et ne fait que 4px de large.

`font:45q/0 Courier` est posé sur `body` et hérité : une police de 42,5px (45 quarts de millimètre) avec une hauteur de ligne de 0. Le `<li>` garde sa puce par défaut, un disque de la couleur du texte, dont la taille et la place viennent de cette police. Elle est peinte par-dessus les fonds et la bordure. Sur CSS Battle, c'est un disque de 12px centré sur (200, 150).

### 5. scale:-5 agrandit et retourne tout

`scale:-5` met `html` et tout son contenu à l'échelle −5 sur les deux axes, autour du centre de sa boîte, (200, 150). Une échelle de −5, c'est une échelle de 5 plus un demi-tour. Donc :

| Pièce | Dessinée en | Après `scale:-5` |
| --- | --- | --- |
| Anneaux | rayon 21 à 17, 14 à 10 | 105 à 85, 70 à 50 |
| `body` | 154 à 198, 150 à 171 (en bas à gauche) | 210 à 430, 45 à 150 (en haut à droite) |
| Ombre | 198 à 202, 150 à 171 | 190 à 210, 45 à 150 : la barre |
| Puce | 12px en (200, 150) | 60px en (200, 150) |

Le demi-tour fait passer le `body` d'en bas à gauche à en haut à droite, où il cache ce quart des anneaux. Son ombre finit juste à sa gauche, du haut de l'anneau extérieur jusqu'au centre. Le canevas, lui, ne bouge pas : il reste jaune partout.

## Notes de golf

- Dessiner à l'échelle 1/5 garde tous les nombres petits, et `scale:-5` offre le demi-tour.
- `border:3mm double` trace les deux anneaux en une seule déclaration.
- `<dd><li>` : une puce, c'est un disque gratuit, peint par-dessus. Le décalage par défaut de 40px du `<dd>` l'amène au milieu.
- `font:45q/0 Courier` règle la taille de la puce, choisit la police qui la place, et met la hauteur de ligne à 0, d'un coup.
- `color:173C46` sans `#` colore la bordure, l'ombre et la puce.
- `10 12-11-36` n'a pas besoin d'espace avant un signe moins.

## Si vous l'essayez chez vous

CSS Battle note les solutions dans son propre Chrome, avec ses propres polices. Dans le dernier Chrome sur Mac (version 156 au moment d'écrire ces lignes), la puce tombe environ 3px à gauche et 7px au-dessus du disque de la cible, centrée vers (197, 143), et environ 400 pixels sont faux. La place de la puce dépend de la police : avec `Menlo` ou `Times` au lieu de `Courier`, elle descend encore de 5px. Sur le juge de CSS Battle, la solution est identique à 100 %. L'animation ci-dessus dessine le disque là où la cible le montre.
