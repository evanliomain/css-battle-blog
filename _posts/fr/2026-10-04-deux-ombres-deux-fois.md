---
title: "Deux ombres, deux fois : un hamburger en 126 caractères"
lang: fr
ref: 2026-10-04
permalink: /fr/2026/10/04/deux-ombres-deux-fois/
description: "Comment une paire de box-shadows, portée par html et par un body découpé, dessine la cible CSS Battle du 4 octobre 2026 : un hamburger."
target: /assets/targets/2026-10-04.png
target_url: https://cssbattle.dev/play/J10ALm0Yug1xXEdXhAHp
colors: ["#d6ba72", "#d9d9d9", "#4c7a6f"]
player: martinb
chars: 126
score: 720.37
match: 100
code: |
  <style>*{margin:175 130 105;box-shadow:inset 0 32q#D6BA72,0-32q#D9D9D9;*{background:#4C7A6F;margin:-70 0 30;clip-path:ellipse(
---

La cible du 4 octobre est un hamburger sur fond vert d'eau : un dôme couleur sable en haut, un steak gris clair, et un pain du bas tout plat, séparés par de fines bandes vertes. Martin Berglund écrit deux box-shadows, une dorée et une grise, et s'en sert deux fois. Sur `html`, elles dessinent le pain du bas et le steak. Sur le `body`, découpé par `clip-path:ellipse()`, la dorée devient le dôme et la grise disparaît.

{% include animations/2026-10-04.html lang=page.lang %}

## Le code, aéré

```css
* {                                /* html et body (head et style restent cachés) */
  margin: 175 130 105;
  box-shadow:
    inset 0 32q #D6BA72,           /* dorée, à l'intérieur, 30,2px plus bas */
    0 -32q #D9D9D9;                /* grise, à l'extérieur, 30,2px plus haut */
  * {                              /* body */
    background: #4C7A6F;
    margin: -70 0 30;
    clip-path: ellipse();
  }
}
```

## Comment ça marche

### 1. Le fond appartient au body, la couleur au canevas

Seule la règle imbriquée pose un fond : `html` n'en a pas. Quand la racine n'a pas de fond, le navigateur prend celui du `body` et le peint sur tout le canevas à la place. La boîte du `body` ne peint alors plus aucun fond.

Le vert d'eau couvre donc tout, et le `body` est une boîte transparente. Ça compte pour la suite : c'est ce qui laisse voir à travers la moitié basse de l'ellipse du dôme.

### 2. html : une bande de 140×20

`margin:175 130 105` laisse 400 − 260 = 140px de large. CSS Battle affiche la page en mode quirks, où `html` remplit le cadre moins ses marges : 300 − 175 − 105 = 20px de haut. Une bande de (130, 175) à (270, 195), où rien n'est peint à part ses ombres.

### 3. L'ombre intérieure remplit le pain du bas

`inset 0 32q #D6BA72` est une ombre intérieure décalée de 32q vers le bas. 32q, ce sont 32 quarts de millimètre, environ 30,2px.

Une ombre intérieure décalée vers le bas colore une bande le long du bord du haut, aussi haute que le décalage. Ici, le décalage fait 30,2px et la boîte seulement 20px : la bande couvre toute la boîte. La bande devient dorée : le pain du bas, de y 175 à 195.

### 4. L'ombre extérieure, c'est le steak

`0 -32q #D9D9D9` est une copie de la boîte remontée de 30,2px. Une ombre extérieure n'est jamais peinte sous sa propre boîte, mais cette copie atterrit entièrement au-dessus : une bande grise de 140×20, de y≈145 à 165. Entre elle et le pain, 10px de vert : le premier interstice.

### 5. body : une boîte de 140×60 au-dessus

Le `body` reçoit d'abord la même marge, puis la sienne : `margin:-70 0 30`.

- Pas de marge sur les côtés : il est aussi large que la boîte de `html`, 140px, à partir de x=130.
- La marge du haut de −70px le fait remonter de 70px au-dessus de la boîte de contenu de `html` : il commence à y=105.
- En mode quirks, il s'étire sur la hauteur de `html` moins ses marges : 20 + 70 − 30 = 60px. Il finit à y=165.

### 6. Les mêmes ombres, découpées en dôme

`*` donne aussi les deux ombres au `body` :

- la dorée, intérieure, colore les 30,2px du haut de sa boîte, de y 105 à 135 environ ;
- la grise, extérieure, apparaîtrait au-dessus de la boîte, de y≈75 à 105.

`clip-path:ellipse()` sans argument trace une ellipse centrée dans la boîte, dont les rayons vont jusqu'aux bords les plus proches : 70px en largeur, 30px en hauteur. Tout ce qui dépasse est coupé, ombres comprises.

- L'ombre grise au-dessus de la boîte disparaît entièrement.
- La bande dorée ne garde que la moitié haute de l'ellipse : le dôme, de y 105 à 135.
- La moitié basse de l'ellipse est vide, puisque le `body` n'a pas de fond à lui. On y voit l'interstice vert et le steak de `html`. Le steak finit vers y=165, là où finit aussi l'ellipse.

## Notes de golf

- Une paire d'ombres, deux usages : `html` et `body` la reçoivent tous les deux par `*`.
- Une ombre intérieure décalée de plus que la taille de la boîte la remplit : une façon économique de la peindre.
- `32q` (30,2px) sert aux deux décalages en 3 caractères.
- `ellipse(` n'a besoin ni d'argument ni de parenthèse fermante en fin de fichier.
- La propagation du fond fait du fond du `body` la couleur du canevas, gratuitement.
- Pas besoin d'espace dans `32q#D6BA72` ni dans `0-32q#D9D9D9`.
