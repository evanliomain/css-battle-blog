---
title: "Un dégradé, deux zooms : un thêta en 112 caractères"
lang: fr
ref: 2026-10-07
permalink: /fr/2026/10/07/un-degrade-deux-zooms/
description: "Comment une seule règle CSS, appliquée à html et à body, dessine la cible CSS Battle du 7 octobre 2026 avec un border-image découpé."
target: /assets/targets/2026-10-07.png
target_url: https://cssbattle.dev/play/2G3gK71D7mhWQELMgpup
colors: ["#476573", "#b8d982"]
player: evanliomain
chars: 112
score: 737.55
match: 100
code: |
  <style>*{zoom:2.5;background:#b8d982;border-image:radial-gradient(1Q,#476573 1pc,#0000 0 55Q,#476573)40%13%/auto
---

La cible du 7 octobre ressemble à un thêta grec posé sur une carte vert tilleul : un anneau qui dépasse en haut et en bas d'un rectangle, coupé en deux par une barre. Je la dessine sans ajouter d'élément et sans aucune bordure. C'est une seule règle, appliquée à `html` et à `body`, qui réutilise le même dégradé deux fois, à deux tailles.

{% include animations/2026-10-07.html lang=page.lang %}

## Le code, aéré

```css
* {                    /* touche html et body (head et style restent cachés) */
  zoom: 2.5;           /* html : ×2,5, body : ×2,5 × 2,5 = ×6,25 */
  background: #b8d982;
  border-image:
    radial-gradient(1Q, #476573 1pc, #0000 0 55Q, #476573)
    40% 13% / auto;
}
```

## Comment ça marche

### 1. Un dégradé, trois bandes

`radial-gradient(1Q, …)` dessine un cercle. Une seule longueur comme taille veut dire « un cercle de ce rayon ». Le rayon lui-même (1Q, un quart de millimètre) ne compte pas ici, car tous les arrêts de couleur sont des longueurs absolues. C'est juste la façon la plus courte d'écrire `circle`. Sans lui, l'ellipse par défaut étirerait les arrêts en largeur.

Les arrêts donnent trois bandes autour du centre :

| Bande | Arrêts | Avant zoom |
| --- | --- | --- |
| Disque ardoise | `#476573 1pc` | de 0 à 16px |
| Anneau transparent | `#0000 0 55Q` | de 16px à ~52px |
| Ardoise | `#476573` | au-delà de 52px |

`#0000`, c'est `transparent` en 5 caractères. Le `0` qui suit est une astuce classique : un arrêt ne peut pas se placer avant le précédent, donc `0` se colle à 16px et donne un bord net.

### 2. Un border-image sans bordure

`border-image` a normalement besoin d'une bordure pour se dessiner. Ici il n'y en a pas, mais `/ auto` donne à chaque bord de l'image la taille naturelle de sa tranche. L'image est donc peinte à l'échelle 1:1 sur tout l'élément, padding et contenu compris.

`40% 13%` la découpe en neuf morceaux : 40 % de la hauteur en haut et en bas, 13 % de la largeur de chaque côté. Les huit morceaux du tour sont dessinés. Celui du milieu ne l'est qu'avec le mot-clé `fill`, qui manque ici. Tout le truc est là : il laisse un trou horizontal au milieu du dégradé.

### 3. Les zooms se multiplient

`*` touche `html` et `body`, donc les deux reçoivent `zoom:2.5`. Le zoom se multiplie en descendant dans l'arbre : `html` est à ×2,5 et `body` à ×6,25.

- Sur `html` (le cadre de 400×300), les arrêts tombent à 40px et 130px. Le bord extérieur de l'anneau, à 130px du centre, est exactement l'anneau qui dépasse en haut et en bas de la carte.
- `body` garde sa marge par défaut de 8px, mais à ×6,25 ça fait 50px. CSS Battle affiche la page en mode quirks, où `body` s'étire sur toute la hauteur : il devient une carte vert tilleul de 300×200 en (50, 50).
- Sur `body`, les mêmes arrêts tombent à 100px et 325px. Le disque ardoise a maintenant 100px de rayon, et l'anneau couvre le reste de la carte.

### 4. Une seule découpe pour deux boîtes

`body` est peint par-dessus `html`, donc les couches s'empilent comme ça :

- Le fond vert de `html` remplit le canevas.
- Le border-image de `html` peint de l'ardoise partout, sauf dans son anneau transparent. Son propre trou du milieu (de 52 à 348 en largeur, de 120 à 180 en hauteur) tombe sous `body` et ne se voit jamais.
- La carte verte de `body` cache tout ce qu'il y a dessous.
- Le border-image de `body` dessine le disque ardoise de 100px de rayon. Son trou du milieu laisse 40 % de 200px en haut et en bas, donc une bande de 40px entre y=130 et y=170. Elle fait 222px de large, plus que le disque. C'est la barre du thêta.

Le même `40%13%` marche sur les deux boîtes : il découpe la barre sur `body` et reste caché sur `html`. C'est pour ça qu'une seule règle suffit.

## Notes de golf

- `1Q` transforme le dégradé en cercle en 2 caractères.
- `#0000` remplace `transparent`, et `0` donne un arrêt net.
- `40%13%/auto` n'a pas besoin d'espace : le `%` termine le nombre.
- `1pc` (16px) et `55Q` sont les façons les plus courtes d'écrire ces deux rayons avant le zoom.
- `<style>` n'est jamais fermé. Les navigateurs n'en ont pas besoin.
