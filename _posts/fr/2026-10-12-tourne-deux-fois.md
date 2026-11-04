---
title: "Tourné deux fois : un dièse rose en 158 caractères"
lang: fr
ref: 2026-10-12
permalink: /fr/2026/10/12/tourne-deux-fois/
description: "Comment html tourné d'un quart de tour et body tourné d'un demi-tour partagent une règle et un fond pour dessiner la cible CSS Battle du 12 octobre 2026."
target: /assets/targets/2026-10-12.png
target_url: https://cssbattle.dev/play/GtfVbDS2vn8CI4nnV4Yl
colors: ["#ecd5e4", "#1d5260", "#84b9c7"]
player: evanliomain
chars: 158
score: 688.73
match: 100
code: |
  <style>*{margin:20 90;border-inline:32Q solid#ecd5e4;rotate:90deg;*{margin:0-30}background:0 53Q/9in radial-gradient(1Q at 0 0,#1d5260 60px,#0000),text#84b9c7
---

La cible du 12 octobre est un grand dièse rose sur un fond bleu-gris : quatre barres qui se croisent près de leurs bouts, et deux quarts de disque bleu pétrole dans deux coins opposés du carré du milieu. Je la dessine avec une seule règle pour `html` et `body`. Chacun reçoit deux bordures roses et un quart de disque. `html` est tourné d'un quart de tour : ses bordures se couchent. `body` tourne d'un quart de tour de plus, un demi-tour en tout : ses bordures se redressent, et son quart de disque passe dans le coin opposé.

{% include animations/2026-10-12.html lang=page.lang %}

## Le code, aéré

```css
* {                                  /* html, et body aussi */
  margin: 20 90;
  border-inline: 32Q solid #ecd5e4;  /* bordures gauche et droite : 30px */
  rotate: 90deg;
  * {                                /* body seul */
    margin: 0 -30;
  }
  background:
    0 53Q / 9in                      /* position et taille de tuile */
      radial-gradient(1Q at 0 0, #1d5260 60px, #0000),
    text #84b9c7;                    /* couleur, découpée au texte */
}
```

## Comment ça marche

### 1. html et ses deux bordures

`margin:20 90` (CSS Battle tourne en mode quirks, les nombres seuls sont donc des pixels) donne à `html` 400 − 180 = 220px de large, en x = 90. En mode quirks, il fait 300 − 40 = 260px de haut, à partir de y = 20.

`border-inline` ne pose que les bordures de gauche et de droite. 32Q valent 30,24px, et Chrome arrondit l'épaisseur des bordures au pixel : 30px. Ce sont deux barres roses de 30 × 260. Entre elles, la boîte de padding va de x = 120 à x = 280.

### 2. La couleur du canevas, et un découpage ignoré

Le fond de `html` est peint sur tout le canevas. Il a deux calques. Le dernier, `text #84b9c7`, porte la couleur de fond et la découpe avec `background-clip: text` : seulement dans les lettres du texte de l'élément. Mais le canevas ignore ce découpage : il est bleu-gris partout.

### 3. Un quart de disque

Le premier calque est `radial-gradient(1Q at 0 0, #1d5260 60px, #0000)` :

- `1Q` est une seule longueur, la forme est donc un cercle. Son rayon ne compte pas, puisque les arrêts sont des longueurs.
- `at 0 0` place son centre sur le coin haut-gauche de la tuile.
- Bleu pétrole jusqu'à 60px, puis transparent.

L'image est peinte sur le canevas, mais placée comme si elle était sur `html` : depuis le coin haut-gauche de sa boîte de padding, (120, 20), décalée de `0 53Q` (≈ 50px) vers le bas. La tuile commence donc en (120, 70). Seul le quart du cercle qui est dans la tuile se voit : un quart de disque de (120, 70) à (180, 130).

La tuile fait 9in = 864px de large, et la hauteur de la boîte, 260px. Les autres copies du cercle tombent en x = 984, y = −190 ou y = 330 : toutes hors du canevas.

### 4. html tourne d'un quart de tour

`rotate:90deg` tourne `html` autour de son centre, (200, 150). La boîte de 220 × 260 devient 260 × 220, de (70, 40) à (330, 260). Ses bordures de gauche et de droite deviennent les barres du haut et du bas : de y = 40 à 70 et de y = 230 à 260.

Le fond du canevas ne tourne pas avec lui : le quart de disque reste en (120, 70).

### 5. body tourne d'un quart de tour de plus

Le `*` extérieur vise aussi `body`, qui reçoit les mêmes bordures, la même rotation et le même fond. Le `*` imbriqué ne vise que `body` et ajoute `margin:0-30` :

- `body` est dans la boîte de contenu de `html`, large de 160px. Les marges latérales de −30px l'élargissent de 30px de chaque côté : 220px, pile sur les bordures de `html`.
- En mode quirks, il remplit la hauteur de `html` : 260px.

`body` a donc la même boîte que `html`, avec le même centre. Son `rotate:90deg` s'ajoute à celui de `html` : 180° en tout. Après un demi-tour, une boîte a le même aspect, et ses bordures sont de nouveau verticales, de x = 90 à 120 et de x = 280 à 310. Ce sont les barres verticales.

### 6. Le même fond, retourné

`html` a un fond, donc celui de `body` est peint sur la boîte de `body`, et il tourne avec elle :

- Le quart de disque est placé exactement comme sur `html`, 50px sous le haut de la boîte de padding. Tourné de 180°, il est centré en (280, 230) et regarde vers le haut à gauche.
- La couleur est découpée au texte, et `body` n'a pas de texte : aucune couleur n'est peinte. Sans le mot-clé `text`, le bleu-gris de `body` couvrirait toute sa boîte, et le premier quart de disque avec.

## Notes de golf

- Une seule règle pour deux boîtes : tout est dans `*`, seule la marge de `body` change. La même règle appliquée deux fois donne les 90° et les 180°.
- `text#84b9c7` est une couleur pour le seul canevas : sur tout élément sans texte, elle disparaît.
- `32Q` (30px) et `53Q` (≈ 50px) font un caractère de moins que `30px` et `50px`.
- `9in` donne une tuile assez large en 3 caractères.
- `1Q` fait du dégradé un cercle en 2 caractères, et `#0000` vaut `transparent`.
- `solid#ecd5e4` et `0-30` se passent d'espace.
- `<style>` n'est jamais fermé.
