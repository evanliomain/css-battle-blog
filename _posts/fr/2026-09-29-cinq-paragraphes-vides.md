---
title: "Cinq paragraphes vides : une échelle en 141 caractères"
lang: fr
ref: 2026-09-29
permalink: /fr/2026/09/29/cinq-paragraphes-vides/
description: "Comment cinq paragraphes vides et un seul dégradé conique en tuiles dessinent la cible CSS Battle du 29 septembre 2026 : des barreaux rouges entre deux montants bleu nuit."
target: /assets/targets/2026-09-29.png
target_url: https://cssbattle.dev/play/EABR37FZaeuj1tSIEZo3
colors: ["#cc5360", "#c0d6e7", "#2d3464"]
player: emohdaziz
chars: 141
score: 704.33
match: 100
code: |
  <p><p><p><p><p a><style>&{p{border:11Q solid#cc5360;margin:20 14ch}[a]{font:6%a}background:53Q/65%conic-gradient(at 42q,#c0d6e7,75%,#2d3464 0
---

La cible du 29 septembre ressemble à une échelle : quatre courtes barres rouges entre deux montants bleu nuit, et une longue barre rouge en dessous qui va jusqu'aux montants, sur un fond bleu pâle. La solution de Mohamed Ali dessine les cinq barres avec cinq paragraphes vides : chacun n'est que sa bordure haute et sa bordure basse. Le dernier reçoit une police minuscule, qui rétrécit ses marges en `ch` et allonge la barre. Les deux montants viennent d'un seul dégradé conique, répété en tuiles sur le canevas.

Cochez **Couleurs pédagogiques** pour voir les tuiles du fond.

{% include animations/2026-09-29.html lang=page.lang %}

## Le code, aéré

```css
<p><p><p><p><p a>                  /* cinq paragraphes vides, le dernier marqué */
<style>
& {                                /* html */
  p {
    border: 11Q solid #cc5360;     /* 10px en haut et en bas : une barre de 20px */
    margin: 20 14ch;               /* 112px de chaque côté */
  }
  [a] {
    font: 6% a;                    /* police de 6px : 1ch = 3px */
  }
  background: 53Q / 65%            /* tuile en x = 50,08, 260px de large */
    conic-gradient(at 42q, #c0d6e7, 75%, #2d3464 0);
}
```

## Comment ça marche

### 1. Cinq paragraphes vides font cinq barres

Les cinq `<p>` n'ont pas de texte : leur contenu fait 0px de haut. Au premier niveau d'une feuille de style, un `&` seul vise la racine, `html`. Le `p{…}` imbriqué vise donc tous les `<p>` de la page.

Chaque `<p>` reçoit une bordure de `11Q`. `11Q` fait 11 quarts de millimètre : 10,39px. Chrome arrondit une épaisseur de bordure au pixel inférieur : la bordure fait 10px. Les bordures gauche et droite n'ont aucune hauteur à dessiner, seules la haute et la basse se voient : chaque `<p>` est une barre rouge de 10 + 0 + 10 = 20px de haut.

### 2. Des marges en ch

`margin:20 14ch` donne à chaque `<p>` 20px en haut et en bas, et 14ch à gauche et à droite. `1ch` est la largeur du caractère « 0 » dans la police du moment. Dans la police par défaut de 16px, il fait 8px : 14ch font 112px. Avec les 8px de marge du `body`, les barres vont de x = 120 à 280.

Les marges verticales entre deux blocs fusionnent : les 20px sous une barre et les 20px au-dessus de la suivante ne font qu'un écart de 20px. La marge haute de la première barre fusionne aussi avec les 8px du `body` : elle commence en y = 20. Cela donne une barre tous les 40px : en y = 20, 60, 100, 140 et 180.

### 3. Le dernier paragraphe a des ch plus petits

Le cinquième paragraphe est `<p a>` : il a un attribut nu `a`, et `[a]` le vise. `font:6%a` met sa taille de police à 6 % de 16px, soit 0,96px, et sa famille à « a », qui n'existe pas.

Chrome a une taille de police minimale de 6px pour les tailles données en unités relatives. La police fait donc 6px, pas 0,96px. Je l'ai vérifié : `1%`, `30%` et `.3em` donnent tous 6px, alors que `1px` donne 1px. Dans une police de 6px, le « 0 » fait 3px de large : 14ch font 42px. Le même `margin:20 14ch` laisse maintenant à cette barre 300px de long, de x = 50 à 350.

### 4. Une tuile de dégradé conique

`background` est dans la règle `&` : c'est le fond de `html`, et le fond de `html` sert à tout le canevas.

`53Q/65%` est une position, puis une taille. La tuile fait 65 % de la largeur du canevas, 260px. Sans hauteur donnée, une tuile de dégradé est aussi haute que la zone : 300px. `53Q` (50,08px) est la position x de la tuile. Sans position y, elle est centrée, ce qui ne change rien pour une tuile pleine hauteur.

`conic-gradient(at 42q, …)` tourne autour du point situé à 42q (39,69px) du bord gauche de la tuile, à mi-hauteur (y = 150). Il part du haut et tourne dans le sens des aiguilles d'une montre. Le `75%` entre les deux couleurs est un indice de transition. `#2d3464 0` demande la position 0, mais un arrêt ne peut pas venir avant ceux qui le précèdent dans la liste : il remonte à 75 %. Résultat : bleu pâle sur les trois premiers quarts du tour, bleu nuit sur le dernier quart. J'ai vérifié que `#c0d6e7 75%,#2d3464 0` donne le même rendu, pour la même longueur.

Le dernier quart est la partie en haut à gauche du centre. Dans la première tuile, c'est un montant bleu nuit de x = 50,08 à 89,77 et de y = 0 à 150.

### 5. La tuile se répète

Un fond se répète par défaut. La tuile suivante commence 260px plus loin, en x = 310,08, et son quart bleu nuit est le second montant, de x = 310,08 à 349,77. La tuile d'avant tombe hors du canevas, à gauche. Les bords des montants sont à 0,08px des pixels entiers, et à 0,23px en x = 89,77 : assez près pour un score de 100 %.

## Notes de golf

- Un `<p>` vide avec une bordure est une barre sans `width` ni `height` : `<p>` fait 3 caractères.
- `11Q` fait 10px en 3 caractères, parce que l'épaisseur est arrondie au pixel inférieur.
- `&{…}` au premier niveau, c'est `html` : les `p` et `[a]` imbriqués n'ont pas besoin de `*`, et `background` tient dans la même règle.
- `<p a>` et `[a]` marquent un élément en 2 + 3 caractères, sans classe.
- `font:6%a` (8 caractères) change la taille du `ch` pour cette seule barre. Le même `14ch` donne alors une autre marge, sans second `margin`.
- `53Q/65%` règle la position et la largeur de la tuile en une valeur. Un seul dégradé dessine ensuite les deux montants, parce que la tuile se répète.
- Aucune accolade fermante, et `<style>` n'est jamais fermé.
