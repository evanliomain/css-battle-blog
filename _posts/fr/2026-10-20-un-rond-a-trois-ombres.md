---
title: "Un rond à trois ombres : un logo en S en 180 caractères"
lang: fr
ref: 2026-10-20
permalink: /fr/2026/10/20/un-rond-a-trois-ombres/
description: "Comment un html rond de 20px à trois ombres, un body couleur du fond et une option à deux ombres dessinent la cible CSS Battle du 20 octobre 2026."
target: /assets/targets/2026-10-20.png
target_url: https://cssbattle.dev/play/g1LzIbepI6uIeUEpgqDp
colors: ["#f0f0f3", "#42a8e4"]
player: kieron
chars: 180
score: 671.94
match: 100
code: |
  <option><style>*{background:#f0f0f3}&{margin:35%190;border-radius:50%;color:42A8E4;box-shadow:53Q 53Q 0 5ch,-53Q -53Q 0 5ch,0 0 0 79Q;>*{margin:-40-30;*{box-shadow:5vw 5vw,-5vw 64Q
---

La cible du 20 octobre ressemble au logo de Skype : un grand disque bleu, deux plus petits sur des coins opposés, et un S carré au milieu, dans la couleur du fond. Kieron dessine les trois disques comme des ombres d'un tout petit `html` rond, de 20px de large. Le S est un `body` couleur du fond posé dessus, et ses deux encoches sont les ombres d'une `<option>`.

{% include animations/2026-10-20.html lang=page.lang %}

## Le code, aéré

```css
* {                             /* tout le monde reçoit le gris */
  background: #f0f0f3;
}
& {                             /* html */
  margin: 35% 190;              /* 140px 190px */
  border-radius: 50%;
  color: 42A8E4;                /* couleur des ombres */
  box-shadow:
    53Q 53Q 0 5ch,              /* petit disque, en bas à droite */
    -53Q -53Q 0 5ch,            /* petit disque, en haut à gauche */
    0 0 0 79Q;                  /* grand disque */
  > * {                         /* head (caché) et body */
    margin: -40 -30;
    * {                         /* l'option (et le style, caché) */
      box-shadow: 5vw 5vw, -5vw 64Q;
    }
  }
}
```

## Comment ça marche

### 1. html est un rond de 20px

`&` seul, c'est `html`. `margin:35%190` lui donne 140px en haut et en bas (une marge en pourcentage se calcule toujours sur la largeur : 35 % de 400) et 190px sur les côtés. CSS Battle affiche la page en mode quirks, où `html` prend la hauteur de la page moins ses marges : 300 − 280 = 20px. `html` est donc une boîte de 20×20 en (190, 140), et `border-radius:50%` en fait un rond de rayon 10.

Son fond gris n'est pas peint dans cette petite boîte : le fond de `html` couvre toujours tout le canevas.

### 2. Trois ombres, trois disques

Une ombre sans couleur prend la `color` de son élément : `42A8E4`, un bleu écrit sans `#`, ce que le mode quirks accepte. Une ombre suit aussi l'arrondi de sa boîte, et l'étalement s'ajoute au rayon :

| Ombre | Décalage | Rayon | Disque |
| --- | --- | --- | --- |
| `0 0 0 79Q` | 0, 0 | 10 + 74,6 = 84,6 | le grand, en (200, 150) |
| `53Q 53Q 0 5ch` | 50,1 ; 50,1 | 10 + 40 = 50 | en bas à droite, en (250,1 ; 200,1) |
| `-53Q -53Q 0 5ch` | −50,1 ; −50,1 | 10 + 40 = 50 | en haut à gauche, en (149,9 ; 99,9) |

`ch`, c'est la largeur du chiffre `0` dans la police de l'élément. Ici, 8px dans la police par défaut de 16px : `5ch` vaut donc 40px.

Une ombre extérieure n'est jamais peinte sous sa propre boîte. Il reste donc un trou de 20px au milieu du grand disque, là où se trouve le rond de `html`. L'étape suivante le cache.

### 3. body est le bloc du S

`>*` dans `&` vise les enfants de `html` : `head`, qui reste caché, et `body`. `margin:-40-30` fait sortir `body` du rond de tous les côtés :

- largeur : 20 + 30 + 30 = 80px, à partir de x=160 ;
- hauteur : en mode quirks, `body` prend la hauteur de son parent moins ses marges, 20 + 40 + 40 = 100px, à partir de y=100.

Il a le fond gris de `*`. C'est donc un bloc gris de 80×100 posé sur le bleu, et il couvre le trou.

### 4. L'option creuse les encoches

L'`<option>` est dans `body`. Hors d'un `<select>`, c'est un simple bloc : 80px de large, et environ 20px de haut par défaut (une ligne de texte plus 1px de padding). Gris sur gris, elle ne se voit pas. Ses deux ombres sont bleues, car `color` est héritée :

- `5vw 5vw` décale une copie de 20px à droite et 20px vers le bas : un bloc bleu de 80×20, de x=180 à 260, de y=120 à 140. Dans le `body`, c'est l'encoche du haut, ouverte à droite.
- `-5vw 64Q` décale l'autre copie de 20px à gauche et 60,5px vers le bas : de x=140 à 220, de y=160,5 à 180,7. C'est l'encoche du bas, ouverte à gauche.

Les parties qui sortent du `body` tombent sur le grand disque, bleu sur bleu, et disparaissent. Ce qui reste du bloc gris, c'est le S.

## Notes de golf

- Un seul rond de 20px porte les trois disques, et sa propre boîte, le trou dans les ombres, finit sous le S.
- `<option>` donne un élément de 20px de haut sans `height`.
- `color:42A8E4` fixe une seule fois la couleur des ombres, pour `html` et, par héritage, pour l'option. Pas de `#` en mode quirks.
- `5ch` (40px), `5vw` (20px), `53Q` (50,1px) : des longueurs courtes. Les nombres sans unité ne marchent pas dans `box-shadow`, même en mode quirks.
- `35%190` fait un caractère de moins que `140 190` : le `%` termine le nombre, pas besoin d'espace.
- `-40-30` n'a pas besoin d'espace avant le signe moins.
- `<style>` n'est jamais fermé.
