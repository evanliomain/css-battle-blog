---
title: "Neuf titres, aucun attribut : une grille 3 × 3 en 169 caractères"
lang: fr
ref: 2026-11-18
permalink: /fr/2026/11/18/neuf-titres-aucun-attribut/
description: "Comment neuf titres vides, float:left, une bordure autour de rien, border-radius:1ch et rotate:4rad dessinent la cible CSS Battle du 18 novembre 2026 : une grille bleue de 3 × 3, pilules, carré et losanges, sur un jaune pâle."
target: /assets/targets/2026-11-18.png
target_url: https://cssbattle.dev/play/OuZGRWZ169z3th35sN48
colors: ["#dc26", "#4760b6"]
player: evanliomain
chars: 169
score: 679.9
match: 100
code: |
  <h1><h4><h1><h1><h5><h1><h1><h4><h1><style>h4{rotate:4rad}h1{width:50}&{background:#dc26;*{margin:75;*{float:left;border:5vh solid#4760b6;border-radius:1ch;margin:0 4%30
---

La cible du 18 novembre est jaune pâle, avec une grille bleue de 3 × 3 au milieu. À gauche et à droite, six pilules. Dans la colonne du milieu, un petit carré arrondi, avec un losange au-dessus et un en dessous. Je dessine les neuf pièces avec neuf balises de titre et pas un seul attribut : ce sont les balises qui choisissent quelle pièce a une largeur, quel rayon, et laquelle tourne.

Les **couleurs pédagogiques** distinguent les balises `h1`, `h4` et `h5`.

{% include animations/2026-11-18.html lang=page.lang %}

## Le code, aéré

```css
<h1><h4><h1><h1><h5><h1><h1><h4><h1>  <!-- neuf titres frères, tous vides -->
<style>
h4 { rotate: 4rad }        /* 229,18°, un losange pour un carré */
h1 { width: 50 }           /* les barres : 15 + 50 + 15 = 80 */
& {                        /* la racine, html */
  background: #dc26;       /* #ddcc22 à 40 %, sur le canevas blanc */
  * {                      /* tout ce qui est dans html */
    margin: 75;            /* le body : 250 × 150 en (75, 75) */
    * {                    /* tout ce qui est dedans : les titres */
      float: left;
      border: 5vh solid #4760b6;   /* 15px autour d'une boîte vide : 30 × 30 */
      border-radius: 1ch;          /* la moitié de la police : 16, 8, 6,64 */
      margin: 0 4% 30;             /* 10 de chaque côté, 30 dessous */
    }
```

## Comment ça marche

### 1. Un jaune transparent

Au premier niveau d'une feuille de style, `&` désigne la racine : `html`. `#dc26` est une couleur hex à 4 chiffres : `#ddcc22` avec une opacité de `66`, soit 40 %. Le fond de `html` passe au canevas, et le canevas est posé sur une page blanche. 40 % de `#ddcc22` sur du blanc donnent `#f1eba7`. La cible est en `#f2eaa8` : un niveau d'écart sur chaque canal.

### 2. Le body

Le `*` imbriqué dans `&` vise tous les éléments de `html`. En mode quirks, `margin:75` marche sans unité. Le `body` prend 75 de chaque côté : il fait 400 − 150 = 250 de large, à partir de x = 75. En mode quirks, le `body` remplit aussi la hauteur du cadre moins ses marges : 300 − 150 = 150, à partir de y = 75. Les titres reçoivent aussi ce `margin:75`, mais la règle suivante a la même spécificité et vient après : c'est sa marge qui gagne.

### 3. Neuf titres, neuf carrés

Une nouvelle balise de titre ferme celle qui est ouverte. `<h1><h4><h1><h1><h5>…` donne neuf frères dans le `body`, sans balise fermante. Le `<style>` atterrit dans le dernier `h1`, mais il n'est pas affiché.

Les titres sont vides : leur contenu fait 0 × 0, et les `h4` et le `h5` n'ont pas de largeur. `border:5vh` fait 15px de chaque côté, autour de rien : un carré de 30 × 30. `float:left` les met côte à côte, comme des boîtes qui ont une vraie taille.

### 4. `h1{width:50}` : les barres

En mode quirks, `50` veut dire 50px. Seuls les `h1` le reçoivent : 15 + 50 + 15 = 80 de large, 30 de haut. Les `h4` et le `h5` restent à 30 × 30 : ce sont les balises qui décident quelle pièce est une barre.

### 5. `margin:0 4%30` : trois rangées de 250

Une marge en % se calcule sur la largeur du bloc parent, même à gauche et à droite. 4 % de 250 = 10. Une rangée fait 10 + 80 + 10, puis 10 + 30 + 10, puis 10 + 80 + 10 : 250, pile la largeur du `body`. Le quatrième titre ne tient plus et commence une nouvelle rangée. Avec 30 sous chaque titre, une rangée prend 30 + 30 = 60 : les rangées tombent en y = 75, 135 et 195. Les barres vont de x = 85 à 165 et de 235 à 315, les pièces du milieu de 185 à 215.

### 6. `border-radius:1ch` : trois rayons

Avec cette police, `1ch` vaut la moitié de la taille de police, et chaque balise de titre a sa taille par défaut :

- `h1`, 32px : rayon 16. Sur une barre de 30 de haut, 16 + 16 c'est trop, donc le navigateur réduit tous les rayons à 15 : une pilule.
- `h4`, 16px : rayon 8.
- `h5`, 13,28px : rayon 6,64.

Une seule valeur dans le code, trois rayons sur le canevas.

### 7. `h4{rotate:4rad}` : les losanges

`rotate` tourne la boîte autour de son centre après la mise en page : les flottants autour ne bougent pas. 4 radians font 229,18°. Un carré est le même tous les 90°, donc ça revient à 49,18° : 4,18° de plus qu'un vrai losange. J'ai mesuré ce que ça coûte. Les coins sont arrondis, et les centres de leurs arcs sont à 9,9px du milieu : tourner de 4,18° les déplace de 0,72px au plus. À côté de `45deg`, seuls quelques dizaines de pixels de bord changent, et le score reste à 100 %.

## Notes de golf

- Pas d'attribut ni de classe : les noms de balise choisissent les pièces. `h1`, `h4` et `h5` ont déjà trois tailles de police, donc `1ch` donne trois rayons.
- Un nouveau titre ferme celui qui est ouvert : les neuf balises n'ont pas besoin de balise fermante.
- `border:5vh` autour d'une boîte vide dessine un carré de 30 : ni `height` ni `background`.
- `margin:0 4%30` règle les écarts et la hauteur des rangées d'un coup. Avec trois pièces par rangée, les % tombent pile sur 250.
- `4rad` a un caractère de moins que `45deg`, et c'est assez proche sur un carré arrondi.
- `#dc26` : 4 caractères pour le fond, grâce au blanc sous le canevas.
- `&{…;*{…;*{…` : l'imbrication atteint le body, puis les titres, sans écrire `body`.
- `solid#4760b6`, `4%30` : pas d'espace avant `#` ni après `%`. La règle n'est jamais fermée.
