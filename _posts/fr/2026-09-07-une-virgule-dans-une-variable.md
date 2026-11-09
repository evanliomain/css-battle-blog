---
title: "Une virgule dans une variable : trois demi-disques en 118 caractères"
lang: fr
ref: 2026-09-07
permalink: /fr/2026/09/07/une-virgule-dans-une-variable/
description: "Comment une variable qui contient une virgule change un seul dégradé radial en demi-disques blancs sur html et en demi-disque foncé sur le body, pour la cible CSS Battle du 7 septembre 2026."
target: /assets/targets/2026-09-07.png
target_url: https://cssbattle.dev/play/VxH9v8gyndTt19Z4EkeY
colors: ["#84b9ef", "#ffffff", "#2f6193"]
player: selenit
chars: 118
score: 729.91
match: 100
code: |
  <style>*{*{margin:50 140;--r:0,#2F6193}background:radial-gradient(1q at 28.5%var(--r,100%,#fff)53q,#84B9EF)7%503q/60vw
---

La cible du 7 septembre est faite de trois demi-disques sur bleu clair : deux blancs posés à plat côte à côte, et un bleu foncé suspendu tête en bas entre eux. La solution d'Ilya Streltsyn écrit un seul dégradé radial pour `html` et pour le `body`. L'astuce : une variable dont la valeur contient une virgule. Dans le dégradé, elle déplace le centre du bas de la tuile vers le haut, et change la couleur en même temps.

{% include animations/2026-09-07.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                         /* html, puis le body */
  * {                                       /* le body */
    margin: 50 140;
    --r: 0, #2F6193;                        /* une valeur avec une virgule */
  }
  background:
    radial-gradient(1q at 28.5% var(--r, 100%, #fff) 53q, #84B9EF)
    7% 503q / 60vw;                         /* position / largeur de tuile */
}
```

## Comment ça marche

### 1. Un demi-disque dans une tuile

`background` est écrit dans le `*` extérieur, après la règle imbriquée : il s'applique à `html` et au `body`. Le fond de `html` sert pour tout le canevas. `/60vw` fixe la largeur de la tuile à 60 % de 400 = 240px ; sans hauteur, la tuile prend toute la hauteur de la zone, 300px.

`html` n'a pas de `--r` : `var(--r,100%,#fff)` prend sa valeur de repli. Le repli, c'est tout ce qui suit la première virgule, virgules comprises : `100%,#fff`. Le dégradé lit donc `radial-gradient(1q at 28.5% 100%,#fff 53q,#84B9EF)` : un cercle centré à 28,5 % de la largeur et tout en bas de la tuile, blanc jusqu'à `53q` (50,08px), puis bleu clair. Seule la moitié haute du disque tombe dans la tuile.

### 2. 7% 503q : deux demi-disques

`7%` est la position x de la tuile, en part de la place libre : 7 % × (400 − 240) = 11,2. `503q` fait 475,3px vers le bas. La tuile se répète tous les 300px : des bas de tuile tombent en y = 475,3 − 300 = 175,3.

Les centres des disques sont à 28,5 % de 240 = 68,4 dans chaque tuile : en x = 11,2 + 68,4 = 79,6, et 240 plus loin, en 319,6. Ça donne deux demi-disques blancs, posés sur y = 175,3.

### 3. Une virgule dans une variable

`*` imbriqué vise le `body` : `margin:50 140` lui donne 120 × 200, de x = 140 à 260 et de y = 50 à 250. Il fixe aussi `--r:0,#2F6193`.

Maintenant, `var(--r,…)` est remplacé par `0,#2F6193`, virgule comprise, et le dégradé lit `radial-gradient(1q at 28.5% 0,#2F6193 53q,#84B9EF)`. Le centre est en haut de la tuile, et le disque est bleu foncé. Une seule variable a changé deux morceaux du dégradé : sa virgule termine la position et commence un arrêt de couleur.

### 4. Le demi-disque du milieu

La tuile du `body` fait de nouveau 240 de large (`60vw` ne dépend pas de la boîte), et la hauteur du `body`, 200. Sa position x vaut 7 % de la place libre, qui est maintenant négative : 7 % × (120 − 240) = −8,4. Le centre tombe donc en x = 140 − 8,4 + 68,4 = 200.

`503q` vaut toujours 475,3, et la tuile se répète tous les 200 : un haut de tuile tombe en y = 50 + 475,3 − 400 = 125,3. Seule la moitié basse du disque tombe dans cette tuile : un demi-disque bleu foncé suspendu à y = 125,3, entre les deux blancs. Le reste du `body` est bleu clair, comme le canevas.

## Notes de golf

- Un repli avec des virgules (`var(--r,100%,#fff)`) remplit deux places du dégradé d'un coup : le y du centre et la couleur suivante.
- Une seule variable sur le `body` change les deux : le haut au lieu du bas, le foncé au lieu du blanc.
- `60vw` donne la même tuile de 240px aux deux boîtes, et `7%` la place autrement parce que les boîtes n'ont pas la même largeur.
- Les bords de tuile coupent les disques en deux gratuitement.
- `background` après la règle imbriquée s'applique quand même au `*` extérieur.
- Pas d'accolade fermante, et `<style>` n'est jamais fermé.
