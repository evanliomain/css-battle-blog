---
title: "Trois boîtes, une bordure : un aimant en 173 caractères"
lang: fr
ref: 2026-09-30
permalink: /fr/2026/09/30/trois-boites-une-bordure/
description: "Comment trois boîtes empilées, qui partagent une bordure et un rayon, dessinent la cible CSS Battle du 30 septembre 2026 : un aimant en U bleu et rose."
target: /assets/targets/2026-09-30.png
target_url: https://cssbattle.dev/play/F8dyF0XEp3g1Ff4mG90c
colors: ["#f8f5f1", "#4355cc", "#fcc9e3"]
player: nicktheromaniancoder
chars: 173
score: 676.91
match: 100
code: |
  <p><style>*{background:#F8F5F1;border:10px solid#4355CC;margin:60 120;border-radius:0 0 5pc 5pc;+*{background:#FCC9E3;margin:20-10-10;p{height:140;margin:-40 20;border-top:0
---

La cible du 30 septembre est un aimant en U : un U rose cerné de bleu sur un fond crème, avec un petit carré crème en haut de chaque branche. La solution de Nick empile trois boîtes, `html`, le `body` et un `<p>`, et leur donne à toutes la même bordure bleue de 10px et les mêmes coins bas arrondis. `html` dessine le contour, le `body` rose le remplit, et le `<p>` crème, peint en dernier, creuse le milieu.

Cochez **Couleurs pédagogiques** pour distinguer les trois bordures et voir le fond crème du `<p>`.

{% include animations/2026-09-30.html lang=page.lang %}

## Le code, aéré

```css
<p>                                  /* une 3ᵉ boîte, dans le body */
<style>
* {                                  /* html, body, p */
  background: #F8F5F1;               /* crème : celui de html part au canevas */
  border: 10px solid #4355CC;
  margin: 60 120;                    /* html : 160 × 180 */
  border-radius: 0 0 5pc 5pc;        /* coins bas de 80px */
  + * {                              /* * + * : le body */
    background: #FCC9E3;             /* rose */
    margin: 20 -10 -10;              /* 160 × 150, depuis y = 90 */
    p {                              /* * + * p : le p */
      height: 140;
      margin: -40 20;                /* 100 × 150, depuis y = 60 */
      border-top: 0;
    }
  }
}
```

## Comment ça marche

### 1. html dessine le contour

`*` vise tous les éléments : `html`, `head`, le `body`, le `<p>` et le `<style>` (`head` et `style` ne s'affichent pas). Chacun reçoit un fond crème, une bordure bleue de 10px, `margin:60 120` et `border-radius:0 0 5pc 5pc`. Les règles imbriquées changent ensuite une partie de tout ça pour le `body` et le `<p>`.

`html` garde tout. Il fait 400 − 120 − 120 = 160px de large, de x = 120 à 280. CSS Battle tourne en mode quirks, où `html` remplit la fenêtre moins ses marges haute et basse : 300 − 60 − 60 = 180px, de y = 60 à 240. `5pc` fait 5 picas : 80px, la moitié de la largeur. Le bas de la boîte est donc un demi-cercle, et la bordure dessine un U fermé.

Le fond de `html` sert à tout le canevas : c'est le fond crème de la cible.

### 2. Le body est le U rose

Le `+*` imbriqué veut dire `* + *` : un élément qui vient juste après un frère. `html` n'a pas de frère, et `head` vient en premier dans `html`. Le `body` vient après `head` : il est visé.

Dans sa bordure de 10px, `html` a 140 × 160 de contenu, de (130 ; 70) à (270 ; 230). En mode quirks, le `body` remplit ce contenu moins ses propres marges. `margin:20-10-10` veut dire 20 en haut, −10 à gauche et à droite, et −10 en bas. Le `body` commence donc 20px plus bas, en y = 90, et déborde du contenu de 10px à gauche, à droite et en bas. Il fait 160 × 150, de (120 ; 90) à (280 ; 240) : même largeur et même bas que `html`.

Il a la même bordure et les mêmes coins de 80px, avec un fond rose. Il couvre le U de `html` à partir de y = 90. Sa bordure haute, de y = 90 à 100, est la barre sous les deux carrés.

### 3. Le p est une boîte crème sans bordure haute

`<p>` est la première chose du code : c'est le premier élément du `body`. Le `p` imbriqué veut dire `* + * p` : un `<p>` dans le `body`. Il reçoit de `*` le fond crème et la bordure bleue.

Il est vide, donc `height:140` lui donne sa hauteur : 140px plus sa bordure basse de 10px. `margin:-40 20` le remonte de 40px au-dessus du contenu du `body`, qui commence en y = 100, et le resserre de 20px de chaque côté. Le `<p>` va donc de x = 150 à 250 et de y = 60 à 210. `border-top:0` retire sa bordure haute. Ses bordures gauche et droite, de x = 150 à 160 et de 240 à 250, sont les bords intérieurs des deux branches.

### 4. Un rayon trop grand est réduit

Le `<p>` reçoit aussi `border-radius:0 0 5pc 5pc`, mais il ne fait que 100px de large. Deux rayons de 80px côte à côte demandent 160px. Quand les rayons ne tiennent pas, le navigateur les réduit tous dans le même rapport, ici 100/160 : ils passent à 50px. Je l'ai vérifié : avec `0 0 50px 50px` à la place, le rendu est identique au pixel près.

Le bas du `<p>` est alors un demi-cercle de rayon 50, centré en (200 ; 160). Le demi-cercle du `body` a le même centre et un rayon de 80. Entre les deux bordures, la bande rose fait 20px de large tout du long : 70 − 50 = 20.

### 5. Le p creuse le U

Le `<p>` est peint en dernier, par-dessus `html` et le `body`. Son fond crème couvre le milieu du U. En haut, il couvre aussi la bordure haute de `html` (y = 60 à 70) et celle du `body` (y = 90 à 100), entre x = 160 et 240.

Il reste en haut de chaque branche un carré crème de 20px, de y = 70 à 90 : x = 130 à 150 à gauche, 250 à 270 à droite. Il est cerné par la bordure de `html` au-dessus et à l'extérieur, la bordure haute du `body` en dessous, et le côté du `<p>` à l'intérieur. Ce sont les deux pôles blancs de l'aimant.

## Notes de golf

- Une seule règle `*` donne aux trois boîtes leur fond, leur bordure, leur marge et leur rayon. Les règles imbriquées n'écrivent que ce qui change.
- `<p>` ajoute une 3ᵉ boîte pour 3 caractères, et `p{` la vise.
- `+*` vise le `body` mais pas `html`, en 2 caractères.
- `5pc` fait 80px en 3 caractères. Le `<p>` le réutilise : le navigateur le réduit à 50px, donc pas de second rayon à écrire.
- `border-top:0` retire un côté d'une bordure déjà posée.
- `20-10-10` n'a pas besoin d'espaces : le signe moins commence une nouvelle valeur.
- Aucune accolade fermante, et `<style>` n'est jamais fermé.
