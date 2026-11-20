---
title: "Une liste d'ombres pour deux : une goutte sur deux disques en 153 caractères"
lang: fr
ref: 2026-11-19
permalink: /fr/2026/11/19/une-liste-d-ombres-pour-deux/
description: "Comment un seul border-radius, une liste de trois box-shadow, rotate:45deg et scale:-1 dessinent la cible CSS Battle du 19 novembre 2026 : une goutte bleu clair sur un disque bleu marine et un disque blanc, sur fond gris."
target: /assets/targets/2026-11-19.png
target_url: https://cssbattle.dev/play/NKPquzPInXKuDaB3FR9K
colors: ["#4b4d88", "#fff", "#b0e1fb", "#222a"]
player: eguiluz
chars: 153
score: 693.06
match: 100
code: |
  <style>*{border-radius:0%50%50%;box-shadow:86Q 86Q#4b4d88,29mm 29mm#fff,-56q -56q 0 3Q#b0e1fb}&{rotate:45deg;background:#222a;margin:0 165 230;*{scale:-1
---

La cible du 19 novembre est grise, avec trois formes empilées au milieu. En bas, un disque blanc. Dessus, un disque bleu marine. Encore dessus, une goutte bleu clair, pointe en bas, posée sur le centre du disque marine. David Eguiluz dessine les trois avec des ombres seulement. `html` et le `body` reçoivent la même forme de goutte et la même liste de trois ombres. Puis le `body` fait un demi-tour : chaque élément montre les ombres dont l'autre n'a pas besoin, et les autres partent hors du canevas.

La **vue large** montre les ombres rangées au-dessus du canevas. Les **couleurs pédagogiques** montrent quelle ombre appartient à `html` et laquelle au `body`.

{% include animations/2026-11-19.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html et le body */
  border-radius: 0% 50% 50%;       /* 0, 50 %, 50 %, 50 % : un coin pointu */
  box-shadow:
    86Q 86Q #4b4d88,               /* 81,26px sur chaque axe */
    29mm 29mm #fff,                /* 109,61px */
    -56Q -56Q 0 3Q #b0e1fb;        /* −52,91px, étalement 2,83px */
}
& {                                /* la racine, html */
  rotate: 45deg;
  background: #222a;               /* #222222 à 2/3, sur le canevas blanc */
  margin: 0 165 230;               /* une boîte de 70 × 70 en (165, 0) */
  * {                              /* le body */
    scale: -1;                     /* un demi-tour */
  }
}
```

## Comment ça marche

### 1. Un gris fait de noir transparent

Seul en haut d'une feuille de style, `&` désigne la racine : `html`. `#222a` est une couleur hex à 4 chiffres : `#222222` avec une opacité de `aa`, soit 170/255 = 2/3. Le fond de `html` passe au canevas, posé sur une page blanche. 34 × 2/3 + 255 × 1/3 = 107,7, arrondi à 108 = `6c`. On obtient `#6c6c6c`, pile le gris de la cible.

### 2. `margin:0 165 230` : un carré de 70

En mode quirks, les nombres sans unité sont des px. `html` fait 400 − 2 × 165 = 70 de large. En mode quirks, `html` remplit aussi la hauteur du cadre moins ses marges : 300 − 0 − 230 = 70. `html` est donc une boîte de 70 × 70 en (165, 0), de centre (200, 35).

Son fond est parti au canevas : la boîte elle-même ne peint rien. Tout ce qu'on voit sur le canevas est une ombre.

### 3. Un coin pointu, tourné vers le haut

`*` vise tous les éléments : `html` et le `body`. `border-radius:0%50%50%` a trois valeurs, et la 4ᵉ reprend la 2ᵉ : 0, 50 %, 50 %, 50 %. Sur une boîte de 70, ça fait 0, 35, 35, 35. Trois coins ronds, et un coin pointu en haut à gauche.

`rotate:45deg` tourne `html` autour de son centre. Le coin pointu monte tout en haut, en y = −14,5. La diagonale de la boîte est maintenant verticale.

### 4. Deux ombres qui descendent tout droit

Une ombre tourne avec sa boîte. Dans la boîte tournée, un décalage (d, d) suit la diagonale : à l'écran, il descend tout droit de d × √2.

- `86Q` = 81,26px, ce qui donne 114,92. Une copie marine de la goutte, centrée en (200, 149,92).
- `29mm` = 109,61px, ce qui donne 155,01. Une copie blanche, centrée en (200, 190,01).

Chaque copie a la forme de `html` : le bas rond, une pointe en haut. La première ombre de la liste est peinte au-dessus. La pointe blanche, en y = 140,5, est sous le disque marine. Pour l'instant, la pointe marine se voit encore, jusqu'en y = 100,5.

### 5. La 3ᵉ ombre reste hors cadre

`-56q` = −52,91px : cette ombre monte de 74,83. Son étalement, `3Q` = 2,83px, la porte à 70 + 2 × 2,83 = 75,67 de large. Son centre tombe en y = −39,8, et son bas arrondi s'arrête environ 2px au-dessus du canevas. Sur `html`, cette ombre ne sert à rien. Elle est là pour le `body`.

### 6. Le body reçoit les mêmes règles

Le `body` garde sa marge de 8px par défaut et, en mode quirks, remplit `html` : 54 × 54 en (173, 8), au même centre (200, 35). Il tourne avec `html`. Le `*` lui donne le même rayon et les trois mêmes ombres.

### 7. `scale:-1` : un demi-tour

Le `*` imbriqué dans `&` ne vise que le `body`. `scale:-1` retourne les deux axes autour du centre de la boîte : en 2D, c'est un demi-tour. La pointe du `body` passe en bas, et ses décalages d'ombre changent de sens :

- marine et blanc montent en y = −79,9 et y = −120, hors du canevas ;
- le bleu clair descend de 74,83, en (200, 109,8). Il fait 54 + 2 × 2,83 = 59,67 de large, avec sa pointe en y = 152.

Le `body` est peint après les ombres de `html` : cette goutte couvre la pointe marine. Sa propre pointe tombe sur le disque marine, juste sous son centre.

## Notes de golf

- Une règle pour deux éléments : `*` donne à `html` et au `body` le même rayon et les mêmes ombres. Les ombres en trop ne sont pas retirées, elles partent hors du canevas.
- `scale:-1` coûte moins cher qu'une deuxième liste d'ombres : retourner le `body` inverse tous ses décalages d'un coup.
- Tourner `html` de 45° change les décalages en diagonale en décalages verticaux : `86Q 86Q` fait descendre la forme tout droit.
- Les unités sont choisies pour que d × √2 tombe au bon endroit : `86Q` → 114,92, `29mm` → 155,01, `56q` → 74,83 (la cible demande 115, 155 et 75).
- `0%50%50%` : trois valeurs pour quatre coins, puisque la 4ᵉ reprend la 2ᵉ.
- `#222a` : le gris en 4 caractères, grâce au blanc sous le canevas.
- `86Q#4b4d88`, `29mm#fff` : pas d'espace avant `#`. La règle n'est jamais fermée.
