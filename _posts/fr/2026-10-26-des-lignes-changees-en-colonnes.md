---
title: "Des lignes changées en colonnes : une rallonge en 246 caractères"
lang: fr
ref: 2026-10-26
permalink: /fr/2026/10/26/des-lignes-changees-en-colonnes/
description: "Comment des éléments en ligne coupés sur plusieurs lignes de texte, puis un demi-tour 3D de html autour de la diagonale, dessinent la cible CSS Battle du 26 octobre 2026 : un câble à deux boucles et deux prises."
target: /assets/targets/2026-10-26.png
target_url: https://cssbattle.dev/play/z0yxKNnAycnbUfSMzhrV
colors: ["#2834ba", "#479582"]
player: evanliomain
chars: 246
score: 638.35
match: 100
code: |
  <s><u><ul><i><b dir=rtl><li><style>s,u,i,b{border:5vw solid#2834ba;border-radius:1in;padding:30;margin:-50}s{border-width:0 40;margin:180}u{border-width:10;padding:10 30}b{margin:110}&{rotate:1 1 0 180deg;margin:57;background:#479582;font:0/10vw"
---

La cible du 26 octobre est une rallonge électrique sur fond vert d'eau : un épais câble bleu avec une boucle en haut à gauche, une boucle en bas à droite, et une prise à chaque bout, l'une vers le bas, l'autre vers le haut. L'image est la même après un demi-tour. Je tire cette symétrie des éléments en ligne : un élément en ligne coupé sur deux lignes a ses bordures de début sur le premier morceau et ses bordures de fin sur le second, soit la même forme retournée. Ensuite, toute la page est retournée par rapport à sa diagonale, et les lignes de texte deviennent des colonnes.

{% include animations/2026-10-26.html lang=page.lang %}

## Le code, aéré

```css
<s><u><ul><i><b dir=rtl><li>      /* balises vides, imbriquées */
<style>
s, u, i, b {
  border: 5vw solid #2834ba;     /* 20px */
  border-radius: 1in;            /* réduit à la taille de chaque morceau */
  padding: 30;
  margin: -50;
}
s { border-width: 0 40; margin: 180 }      /* têtes de prise */
u { border-width: 10; padding: 10 30 }     /* broches */
b { margin: 110 }
& {                                         /* html */
  rotate: 1 1 0 180deg;          /* demi-tour autour de la diagonale */
  margin: 57;
  background: #479582;
  font: 0 / 10vw "";             /* pas de glyphes, lignes de 40px */
}
```

## Comment ça marche

### 1. D'abord la mise en page, la rotation à la fin

Le plus simple pour lire ce code, c'est d'oublier le `rotate` au début. Sans lui, la page est une simple mise en page de texte : `font:0/10vw"` donne du texte de taille 0 (rien ne s'affiche) sur des lignes de 40px (10vw). Le contenu du `body` prend 5 lignes, de y = 65 à 265.

Toutes les balises sont vides. Rien n'a de largeur ni de hauteur : chaque forme est faite de la bordure et du padding d'un élément en ligne. Avec une police de taille 0, une boîte en ligne n'est haute que de son padding et de ses bordures verticales.

### 2. Un bloc coupe un élément en ligne en deux

`<s>` et `<u>` sont en ligne, et le `<ul>` qu'ils contiennent est un bloc. Un bloc ne peut pas tenir dans une ligne, donc le navigateur coupe `s` et `u` autour de lui : un morceau sur la ligne 1, avant le `ul`, et un morceau sur la ligne 5, après.

Chaque morceau ne reçoit que les bordures de son côté :

- le premier morceau reçoit la bordure de **début** (à gauche) et les coins de début ;
- le dernier reçoit la bordure de **fin** (à droite) et les coins de fin.

Les deux morceaux sont donc la même forme, tournée de 180°. C'est la symétrie de l'image, gratuite.

### 3. Les prises : s et u

- `s` a `border-width:0 40` : seulement des bordures de début et de fin, de 40px, et `padding:30` autour de rien, donc chaque morceau fait 60px de haut. Avec le rayon, chaque morceau est une tête arrondie de 60px de large : une prise.
- `u` est dans `s`, avec des bordures de 10px et `padding:10 30`. Son morceau est une boîte ouverte de 40 × 40 : deux côtés de 10px séparés de 20px. Ce sont les broches. Sa `margin:-50` le ramène dans la tête, qui cache le reste.
- `s{margin:180}` pousse le premier morceau de 180px le long de la ligne 1. Le second morceau commence au début de la ligne 5.

### 4. Les boucles : i, coupé par un li vide

Le `<ul>` garde son retrait gauche de 40px par défaut, qui décale tout ce qu'il contient (ses marges de 1em valent 0 avec une police de taille 0). Dedans, `<i>` contient `<b>`, qui contient un `<li>` vide. Le `li` est un bloc : il coupe aussi `i` et `b`, et il fait une ligne à lui seul, la ligne 3, celle de sa puce invisible.

`i` a des bordures de 20px et un padding de 30px : chaque morceau fait 100px de haut. Le premier, ligne 2, a la bordure gauche arrondie et file vers la droite : un ⊂. Le second, ligne 4, est son miroir : un ⊃. Le rayon de `1in` (96px) est trop grand pour un morceau de 100px, le navigateur le ramène donc à 50px : des demi-cercles parfaits.

### 5. b dir=rtl ferme les boucles

`<b dir=rtl>` est coupé de la même façon, mais il s'écrit de droite à gauche. Dans ce sens, le **début** est à droite. Son premier morceau, ligne 2, reçoit donc la bordure de droite : un ⊃ qui ferme la boucle ouverte par `i`. Son dernier morceau, ligne 4, reçoit la bordure de gauche : un ⊂ pour l'autre boucle.

`b{margin:110}` règle l'écart entre les boucles : ligne 2, la marge de début de 110px allonge `i` ; ligne 4, la marge de fin de 110px pousse la seconde boucle le long de la ligne.

### 6. Le demi-tour

`rotate:1 1 0 180deg` tourne `html` de 180° autour de l'axe (1, 1, 0) : la diagonale de l'écran. Sans perspective, le résultat est plat : une image miroir par rapport à cette diagonale. x et y s'échangent.

- Les lignes de texte deviennent des colonnes : la ligne 1 est la colonne de gauche, la ligne 5 celle de droite.
- Le début d'une ligne passe en haut, la fin en bas.

La rotation se fait autour du centre de `html`. `margin:57` en fait une boîte de 286 × 216 en (57, 57), centrée en (200, 165), ce qui place le câble là où la cible l'attend. Le fond part sur le canevas, donc la rotation ne se voit pas sur les bords.

| Ligne | Morceaux | À l'écran |
| --- | --- | --- |
| 1 | début de `s` et `u` | prise en bas à gauche, broches vers le bas |
| 2 | début de `i`, début de `b` | boucle en haut à gauche et ses deux longues tiges |
| 3 | `li` vide | 40px d'espace |
| 4 | fin de `b`, fin de `i` | boucle en bas à droite et ses tiges |
| 5 | fin de `u` et `s` | prise en haut à droite, broches vers le haut |

## Notes de golf

- Aucun élément n'a de largeur ni de hauteur : la hauteur de ligne, le padding et les bordures dimensionnent tout.
- Un élément en ligne coupé sur deux lignes donne une forme et sa copie tournée de 180°, avec un seul élément.
- `dir=rtl` échange début et fin sur un élément, pour avoir les morceaux inverses.
- Un `<ul>` vide coupe ses parents en ligne, et son retrait de 40px par défaut remplace une marge. Un `<li>` vide ajoute une ligne.
- Un seul rayon, `1in`, sert à toutes les formes : le navigateur le réduit à 30, 20 ou 50px selon le morceau.
- `font:0/10vw"` règle la hauteur de ligne sans glyphe. Le `"` ouvre un nom de police qui court jusqu'à la fin du fichier : pas besoin de guillemet fermant.
- `5vw`, c'est 20px en 3 caractères.
