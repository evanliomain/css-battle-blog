---
title: "Trois boîtes, une bordure : un cadre jaune en 130 caractères"
lang: fr
ref: 2026-09-20
permalink: /fr/2026/09/20/trois-boites-une-bordure/
description: "Comment zoom:10 et une seule bordure partagée par html, le body et un hr dessinent la cible CSS Battle du 20 septembre 2026 : un cadre jaune sur deux pieds."
target: /assets/targets/2026-09-20.png
target_url: https://cssbattle.dev/play/2R2qUfqneVtkaggWFkh5
colors: ["#51a499", "#fee190"]
player: benjamintordjman
chars: 130
score: 715.87
match: 100
code: |
  <hr size=3><style>*{margin:2-4 3;border:4px solid#FEE190}&,hr{border-block:0;margin:14-6-7}&{background:#51A499;zoom:10;margin:5 8
---

La cible du 20 septembre est un cadre jaune sur fond bleu-vert : deux montants, deux barres entre eux, et un petit pied qui dépasse au bas de chaque montant. La solution de Benjamin Tordjman agrandit la page dix fois et donne à tous les éléments la même bordure jaune de 4px. `html` ne garde que ses bordures gauche et droite : les montants. Le `body` garde les quatre : les barres. Un `<hr>` d'un pixel ne garde que ses côtés : les pieds.

Cochez **Couleurs pédagogiques** pour voir quel élément dessine quelle partie.

{% include animations/2026-09-20.html lang=page.lang %}

## Le code, aéré

```css
<hr size=3>                        /* un trait de 1px de haut */
<style>
* {
  margin: 2 -4 3;                  /* pour le body */
  border: 4px solid #FEE190;       /* 40px à l'écran */
}
&, hr {                            /* html et le hr */
  border-block: 0;                 /* ni haut ni bas */
  margin: 14 -6 -7;                /* pour le hr */
}
& {                                /* html */
  background: #51A499;
  zoom: 10;                        /* tout est 10 fois plus grand */
  margin: 5 8;
}
```

## Comment ça marche

### 1. zoom:10 : une html de 24 × 21

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. `zoom:10` agrandit `html` et tout son contenu dix fois : toutes les longueurs ci-dessous sont en pixels CSS, affichées dix fois plus grandes. Le cadre de 400 × 300 ne fait plus que 40 × 30 pixels CSS.

`margin:5 8` place `html` en (8 ; 5), sur 40 − 8 − 8 = 24 de large. Sans doctype, la page est en mode quirks, et `html` ferait 30 − 5 − 5 = 20 de haut ; ici son contenu lui en donne 21 (étape 4). À l'écran, il va de x = 80 à 320 et de y = 50 à 260.

### 2. border-block:0 : deux montants

`*` donne à tous les éléments `border:4px solid#FEE190`, `html` compris. `&,hr{border-block:0}` enlève les bordures haute et basse de `html`. Il ne reste que la gauche et la droite : 4 de large, 40px à l'écran, sur toute la hauteur de `html`. Ce sont les deux montants.

### 3. Le body : deux barres

Le `body` garde sa bordure sur ses quatre côtés. Il reçoit `margin:2-4 3` de `*` : 2 en haut, −4 sur les côtés, 3 en bas. Les marges de −4 le tirent sous les bordures de côté de `html` : il fait 24 de large lui aussi, de x = 80 à 320, à partir de y = 70.

Ses bordures haute et basse sont les deux barres, de 40px de haut à l'écran. Ses bordures de côté se cachent sous les montants, de la même couleur. Le `body` n'a pas de fond : son intérieur laisse voir le canevas bleu-vert, c'est le trou.

### 4. Le hr : deux pieds

`<hr size=3>` est un trait horizontal. Dans Chrome, `size=3` lui donne 1 pixel CSS de haut : 3 moins ses bordures haute et basse. `&,hr` enlève ces bordures, et `*` lui donne les bordures de côté de 4. `margin:14-6-7` l'élargit de 6 de chaque côté : il va de x = 60 à 340 à l'écran, et ses bordures de côté sont deux blocs de 40 × 10 : les pieds, en y = 250. Ils rejoignent le bas des montants.

La marge basse de −7 fixe aussi les hauteurs. Le `hr` commence 14 sous le haut du contenu du `body` et finit 7 plus haut : le contenu du `body` fait 14 + 1 − 7 = 8, soit le trou de 80px. Le `body` fait alors 4 + 8 + 4 = 16, et avec ses marges, le contenu de `html` finit en 2 + 16 + 3 = 21 : c'est la hauteur des montants.

## Notes de golf

- `zoom:10` ramène chaque longueur à un chiffre : `5 8`, `2-4 3`, `14-6-7` et `4px`.
- Une seule règle de bordure dessine les six parties jaunes ; `border-block:0` ne garde que les côtés pour deux des trois boîtes.
- `&,hr` partage `border-block:0` et la marge entre `html` et le `hr` ; la règle `&` qui suit donne à `html` sa propre marge.
- `<hr size=3>` est une boîte de 1 de haut en 11 caractères, sans `height`.
- La marge basse négative du `hr` fixe d'un coup la taille du trou et la hauteur des montants.
- Pas d'accolade fermante, et `<style>` n'est jamais fermé.
