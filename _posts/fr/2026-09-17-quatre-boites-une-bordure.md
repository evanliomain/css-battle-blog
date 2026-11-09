---
title: "Quatre boîtes, une bordure : un temple en 154 caractères"
lang: fr
ref: 2026-09-17
permalink: /fr/2026/09/17/quatre-boites-une-bordure/
description: "Comment deux cadres, un h1 vide et un p zoomé dessinent la cible CSS Battle du 17 septembre 2026 : un temple gris foncé sur bleu clair."
target: /assets/targets/2026-09-17.png
target_url: https://cssbattle.dev/play/FI82QbLNuW9WtU2AemyW
colors: ["#7ec3e8", "#333333"]
player: levito
chars: 154
score: 692.17
match: 100
code: |
  <p><h1><style>*{margin:40 135;border:.63em solid#333;background:#7EC3E8;*{margin:20;*{margin:-85}p{zoom:10;margin:-14-7.5 16.5;border-color:#0000#0000#333
---

La cible du 17 septembre est un temple gris foncé sur bleu clair : un toit en triangle, quatre fines colonnes, et un large socle. La solution de levito donne à tous les éléments la même bordure foncée. `html` et le `body` sont deux cadres, et leurs côtés sont les quatre colonnes. Un `<h1>` vide, avec sa police plus grande, est une bordure plus épaisse : le socle. Un `<p>` zoomé dix fois n'a que sa bordure basse colorée, qui est un triangle : le toit.

Cochez **Couleurs pédagogiques** pour voir quelle boîte dessine quelle partie.

{% include animations/2026-09-17.html lang=page.lang %}

## Le code, aéré

```css
<p><h1>
<style>
* {                                /* html */
  margin: 40 135;
  border: .63em solid #333;        /* 10px, 20px dans le h1 */
  background: #7EC3E8;
  * {                              /* le body */
    margin: 20;
    * {                            /* le h1 */
      margin: -85;
    }
    p {                            /* le p */
      zoom: 10;
      margin: -14 -7.5 16.5;
      border-color: #0000 #0000 #333;  /* seule la bordure basse */
    }
  }
}
```

## Comment ça marche

### 1. html : un cadre

`*` donne à tous les éléments `border:.63em solid#333`. Avec la police par défaut de 16px, `.63em` font 10,08px, et Chrome arrondit l'épaisseur d'une bordure au pixel entier inférieur : 10px.

Pour `html`, `margin:40 135` laisse 400 − 270 = 130 de largeur. Sans doctype, la page est en mode quirks, et `html` prend la hauteur que ses marges laissent : 300 − 80 = 220. Son cadre foncé va de x = 135 à 265 et de y = 40 à 260. Ses côtés gauche et droit seront les colonnes extérieures.

### 2. Le body : un cadre plus petit

`*` imbriqué vise les éléments placés dans un autre, et `margin:20` s'applique au `body`. Dans le contenu de `html`, 110 de large, le `body` fait 70 de large, de x = 165 à 235. Il fait 160 de haut, de y = 70 à 230, avec la même bordure de 10px et le fond bleu clair. Ses côtés gauche et droit sont les colonnes intérieures.

### 3. Le h1 : le socle

Le troisième niveau, `*{margin:-85}`, vise ce qui est dans le `body`. Le `<h1>` reçoit cette marge de −85 de tous côtés : il dépasse de 85 de chaque côté du contenu du `body`, de x = 90 à 310.

Un `<h1>` a une police de 2em, 32px : sa bordure de `.63em` fait 20,16, arrondis à 20. Le `<h1>` est vide : son contenu fait 0 de haut, et il n'est que ses bordures haute et basse, 20 + 20 = 40 de haut, de y = 220 à 260. C'est le socle. Il couvre le bas des deux cadres.

### 4. Le p zoomé : le toit

`p{…}` est plus précis que `*` : le `<p>` prend sa propre marge. `zoom:10` l'agrandit dix fois : sa bordure de 10px fait 100px à l'écran. Ses marges, en pixels zoomés, font −140 en haut, −75 sur les côtés et 165 en bas. Le `<p>` fait donc 5 + 7,5 + 7,5 = 20 de large, 200 à l'écran, de x = 100 à 300, et il commence 140 au-dessus du contenu du `body`, en y = −60. Il est vide : 20 × 20 avec sa bordure, soit 200 × 200 à l'écran.

`border-color:#0000#0000#333` rend transparentes les bordures haute, droite et gauche, et seule la basse est foncée. Avec un contenu de 0 × 0, chaque bordure est un triangle qui rejoint les autres au centre, (200 ; 40). La basse est le toit : pointe en (200 ; 40), base de x = 100 à 300 en y = 140.

Le `<p>` a aussi le fond bleu clair, peint sous ses bordures transparentes. Il couvre le haut des deux cadres : au-dessus de y = 140, il ne reste que le toit. En dessous, sa marge basse de 165 et la marge haute de −85 du `<h1>` font 80 : le `<h1>` arrive en y = 220.

## Notes de golf

- Une seule bordure dans `*` dessine tout : la police et le zoom de chaque boîte décident de son épaisseur.
- `.63em` donne 10px en police de 16px et 20px dans la police de 32px du `<h1>`.
- Une boîte sans contenu avec une seule bordure colorée est un triangle : pas de `clip-path` pour le toit.
- Le fond du `<p>` cache le haut des cadres : pas besoin de les couper.
- `zoom:10` laisse au `<p>` de petites marges : `-14-7.5 16.5`.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
