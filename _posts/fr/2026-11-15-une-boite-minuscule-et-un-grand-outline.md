---
title: "Une boîte minuscule et un grand outline : une maison en 150 caractères"
lang: fr
ref: 2026-11-15
permalink: /fr/2026/11/15/une-boite-minuscule-et-un-grand-outline/
description: "Comment une boîte html de 22 × 22, un outline de 64px, rotate:225deg et une ombre couleur fond sur le body dessinent la cible CSS Battle du 15 novembre 2026 : une goutte bleu nuit coupée net, avec une petite porte, sur fond crème."
target: /assets/targets/2026-11-15.png
target_url: https://cssbattle.dev/play/remxMOJe0OJmVRBlgKqm
colors: ["#fdffe9", "#2d3464"]
player: evanliomain
chars: 150
score: 695.76
match: 100
code: |
  <style>*{rotate:225deg;background:#fdffe9;border-radius:9q 3mm 0;margin:-9-29;box-shadow:34vw 0 0 1in#fdffe9}&{margin:139 189;outline:4pc solid#2d3464
---

La cible du 15 novembre est crème, avec une goutte bleu nuit pointe en haut, coupée net au milieu du cadre, et une petite porte aux coins hauts arrondis en bas de la goutte. On dirait une petite maison. Je la dessine sans autre balise que `<style>`. La goutte est l'`outline` d'une boîte `html` de 22 × 22, tournée pour que son seul coin pointu soit en haut. La porte est le `body`, remis droit, et son ombre couleur fond fait la coupe.

Les **couleurs pédagogiques** montrent la porte et les deux ombres, toutes crème en vrai, et la **vue large** montre jusqu'où vont les ombres.

{% include animations/2026-11-15.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                   /* html et body */
  rotate: 225deg;                     /* html : pointe en haut ; body : 450° = 90° en tout */
  background: #fdffe9;                /* crème : canevas et porte */
  border-radius: 9q 3mm 0;            /* HG 8,5, HD et BG 11,34, BD 0 */
  margin: -9 -29;                     /* body : 80 × 40 autour de la boîte de html */
  box-shadow: 34vw 0 0 1in #fdffe9;   /* body : la coupe en y = 150 */
}
& {                                   /* html seulement */
  margin: 139 189;                    /* une boîte de 22 × 22 au centre */
  outline: 4pc solid #2d3464;         /* 64px : la goutte de 150 */
}
```

## Comment ça marche

### 1. html, une boîte de 22 × 22

`*` vise `html`, `head`, `style` et `body`. `head` et `style` ne s'affichent pas : seuls `html` et le `body` comptent. Un `&` de tête vise la racine, `html` : sa `margin` remplace celle de `*` sur `html`.

Avec `margin:139 189`, il reste à `html` 400 − 2 × 189 = 22 de large et 300 − 2 × 139 = 22 de haut : une boîte de 22 × 22, de (189, 139) à (211, 161), centrée en (200, 150). Son fond crème passe au canevas : tout le cadre est crème.

### 2. outline : un carré de 150

`4pc` fait 4 × 16 = 64px. L'`outline` bleu nuit fait 64px tout autour de la boîte : un carré de 22 + 2 × 64 = 150, de x = 125 à 275 et de y = 75 à 225. Au milieu, la boîte de 22 × 22 reste un trou.

L'`outline` suit les coins de la boîte, chaque rayon agrandi de 64. `border-radius:9q 3mm 0` a trois valeurs : haut à gauche, puis haut à droite et bas à gauche, puis bas à droite. `9q` fait 8,5px : le coin haut gauche de l'`outline` fait 72,5. `3mm` fait 11,34px : le haut droit et le bas gauche font 75,34, à peu près la moitié du carré. Le rayon du bas à droite vaut 0, et ce coin reste pointu.

### 3. rotate : la pointe en haut

`rotate:225deg` tourne `html` dans le sens des aiguilles d'une montre, autour de son centre, (200, 150). Le coin du bas à droite, le pointu, passe en haut. La demi-diagonale du carré fait 106 : la pointe est en y = 150 − 106 = 44, avec deux côtés droits à 45°.

Les deux coins de 75,34 vont à gauche et à droite. Ce sont presque des demi-cercles autour du centre : la goutte fait 150 de large en y = 150, de x = 125 à 275. Le coin de 72,5 part en bas, où il sera caché.

### 4. Le body, 80 × 40

Le `body` est dans `html` : il reçoit les mêmes règles de `*`. `margin:-9-29` se lit `-9 -29` : les marges négatives le font déborder de la boîte de 22 × 22 de `html`. Il fait 22 + 2 × 29 = 80 de large. En mode quirks, le `body` remplit la hauteur de `html` : il fait 22 + 2 × 9 = 40 de haut. Il est centré sur `html`, et tourne avec lui.

Il a le fond crème. Comme il est lui-même tourné, il est peint par-dessus l'`outline` de `html`.

### 5. Encore 225° : la porte

Le `body` a aussi son propre `rotate:225deg`, qui s'ajoute à celui de `html` : 225 + 225 = 450°, soit 360 + 90. La boîte de 80 × 40 se retrouve debout, 40 de large et 80 de haut : de x = 180 à 220, de y = 110 à 190.

Un quart de tour dans le sens des aiguilles d'une montre met en haut les coins haut gauche et bas gauche de la boîte. Leurs rayons font 8,5 et 11,34 : les coins arrondis du haut de la porte. La porte cache aussi le trou de l'`outline` au milieu, la boîte de 22 × 22 de `html`.

### 6. box-shadow : la coupe

`box-shadow:34vw 0 0 1in#fdffe9` est une ombre crème, décalée de `34vw` = 136 le long de l'axe x de la boîte, sans flou, étalée de `1in` = 96. L'axe x du `body` pointe vers le bas à l'écran : son ombre descend. Elle fait 40 + 2 × 96 = 232 de large et 80 + 2 × 96 = 272 de haut, et son haut est en 110 − 96 + 136 = 150.

L'ombre est peinte avec le `body`, au-dessus de l'`outline`. Crème sur crème, elle cache tout ce qui est sous y = 150 : le bas de la goutte et le bas de la porte. `html` reçoit la même ombre de `*`, vers le haut à gauche. Elle est peinte sous son propre `outline` : on ne la voit jamais.

## Notes de golf

- La goutte n'a pas besoin d'une boîte à sa taille : une boîte minuscule et un `outline` épais la dessinent, et l'`outline` donne à chaque coin arrondi le rayon de la boîte plus 64.
- Un seul `rotate` dans `*` tourne `html` de 225° et le `body` de 450° : la goutte pointe vers le haut et la porte est droite.
- Un `border-radius` à trois valeurs sert aux deux éléments : la pointe, les côtés ronds de la goutte et les deux coins du haut de la porte.
- Une ombre couleur fond coupe la forme à plat : pas besoin de découpage.
- `margin:-9-29` n'a pas besoin d'espace avant un nombre négatif.
- `4pc`, `3mm`, `9q`, `34vw` et `1in` sont des écritures courtes de 64, 11,34, 8,5, 136 et 96.
- `solid#2d3464` et `1in#fdffe9` : pas d'espace avant `#`.
- La règle de `html` est la dernière, et elle n'est jamais fermée.
