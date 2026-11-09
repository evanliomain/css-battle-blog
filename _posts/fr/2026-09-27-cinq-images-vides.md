---
title: "Cinq images vides : un réveil en 241 caractères"
lang: fr
ref: 2026-09-27
permalink: /fr/2026/09/27/cinq-images-vides/
description: "Comment cinq images vides et deux ombres dessinent la cible CSS Battle du 27 septembre 2026 : un réveil bleu nuit sur un fond caramel."
target: /assets/targets/2026-09-27.png
target_url: https://cssbattle.dev/play/ZJjczkH5G0qHP61dMO4k
colors: ["#d5a06c", "#1e2c5c"]
player: krhek
chars: 241
score: 640.23
match: 100
code: |
  <img><img><img a><img><img><style>*{background:#D5A06C;*>*{box-shadow:0 0 0 1.25em#1E2C5C,0 0 0 1.7lh#D5A06C;margin:52-22-52 122;border-radius:9lh;padding:10 .56lh}[a]{padding:70;~*{rotate:-45deg;+*{rotate:45deg}margin:0-111-80 5;font:50%/0"
---

La cible du 27 septembre est un réveil bleu nuit sur un fond caramel : un grand anneau, deux petites cloches au-dessus, un peu à l'écart, et deux pieds. La solution de Wojciech Russek le dessine avec cinq `<img>` vides et une seule règle commune. Chaque image reçoit les deux mêmes ombres étalées : un anneau bleu nuit, puis un halo couleur du fond qui coupe les cloches. Les deux dernières images reçoivent une police plus petite, sans hauteur de ligne, et la même règle en fait deux barres carrées, penchées en pieds.

Cochez **Couleurs pédagogiques** pour voir la seconde ombre, le halo.

{% include animations/2026-09-27.html lang=page.lang %}

## Le code, aéré

```css
<img><img><img a><img><img>      /* deux cloches, le réveil, deux pieds */
<style>
* {
  background: #D5A06C;           /* html : le canevas */
  * > * {                        /* les cinq images */
    box-shadow:
      0 0 0 1.25em #1E2C5C,      /* anneau bleu nuit, 20px */
      0 0 0 1.7lh #D5A06C;       /* halo caramel, 30,6px */
    margin: 52 -22 -52 122;
    border-radius: 9lh;          /* 162px : des ronds */
    padding: 10 .56lh;           /* 20,16 × 20 */
  }
  [a] {
    padding: 70;                 /* le réveil : 140 × 140 */
    ~ * {                        /* les deux pieds */
      rotate: -45deg;
      + * { rotate: 45deg }
      margin: 0 -111 -80 5;
      font: 50% / 0 "";          /* police de 8px, hauteur de ligne 0 */
    }
  }
}
```

## Comment ça marche

### 1. Cinq images vides sur deux lignes

Une `<img>` sans source n'affiche rien : c'est une boîte en ligne vide, comme un mot sans lettres. `*>*` imbriqué veut dire `* *>*` : un élément dont le parent est dans un autre élément. Ça écarte `html` et `body`, et vise les cinq images (et le `<style>`, qui n'est pas affiché).

`padding:10 .56lh` donne à chaque image 10px en haut et en bas, et .56lh sur les côtés. `lh` vaut la hauteur de ligne : avec la police par défaut, `normal` fait ici 18px, donc .56lh font 10,08px. Chaque image fait 20,16 × 20.

`margin:52-22-52 122` les place. Sur une ligne, chaque image commence 122px après la fin de la précédente, moins 22 : la première en x = 8 + 122 = 130, la deuxième en 130 + 20,16 − 22 + 122 = 250,16. Ce sont les cloches, en y = 8 + 52 = 60.

La troisième image a l'attribut nu `a`, visé par `[a]`. `padding:70` lui donne 140 × 140. Elle commencerait en x = 370,32 : elle ne tient pas sur la ligne et passe à la suivante, en x = 130 et y = 80.

### 2. Des ronds et un anneau bleu nuit

`border-radius:9lh` fait 162px, bien plus que la moitié de chaque boîte : Chrome le réduit, et chaque boîte devient un rond (les cloches font 20px de large, le réveil 140px).

La première ombre n'a ni décalage ni flou, seulement un étalement : `1.25em` font 1,25 × 16 = 20px. C'est une copie du rond, plus grande de 20px tout autour, en bleu nuit. La boîte garde son fond caramel. Chaque rond devient donc un anneau bleu nuit de 20px : celui du réveil va du rayon 70 au rayon 90 autour de (200 ; 150).

### 3. Le halo coupe les cloches

La seconde ombre s'étale de `1.7lh` = 30,6px, couleur du fond. Une ombre plus loin dans la liste se peint sous les précédentes : on n'en voit qu'un halo caramel de 10,6px autour de chaque anneau.

Les images se peignent dans l'ordre : le réveil passe après les cloches. Son halo, du rayon 90 au rayon 100,6, recouvre le bas des anneaux des cloches. C'est l'écart entre les cloches et le réveil : les cloches deviennent deux arcs.

### 4. font:50%/0 : deux barres

`~*` dans `[a]` vise les images qui la suivent : les deux dernières. `font:50%/0"` leur donne une police en une seule valeur. La taille vaut 50 % de 16px, soit 8px. La hauteur de ligne vaut 0. La famille vaut `""` : la chaîne n'est jamais fermée, c'est la fin de la feuille de style qui la ferme.

Ça change toutes les unités de la règle commune. `1.25em` vaut maintenant 10px. Tout ce qui est en `lh` vaut maintenant 0 : pas de padding sur les côtés, pas de rayon, pas de halo. Chaque image est une boîte de 0 × 20, et son ombre bleu nuit s'étale de 10px tout autour : une barre carrée de 20 × 40.

`margin:0-111-80 5` les place sur la ligne du réveil. La première commence 22px avant le bord droit du réveil, plus 5 : x = 253. La seconde revient de 111px, plus 5 : x = 147. Une image se pose sur la ligne de base par le bas de sa boîte de marge. La ligne de base est en y = 168, le bas de la boîte de marge du réveil (80 + 140 − 52) : la marge basse de −80 met chaque boîte de y = 228 à 248. Les barres sont centrées en y = 238.

### 5. Un huitième de tour chacune

`rotate:-45deg` penche la première barre, et `+*{rotate:45deg}` (l'image juste après) penche la seconde dans l'autre sens. Chacune tourne autour de son centre : leur bout haut entre dans l'anneau. Ce sont les pieds.

## Notes de golf

- Une seule règle dessine cinq formes : la police des deux dernières change ce que valent `em` et `lh`, et les mêmes valeurs donnent des ronds pour trois images et des barres carrées pour deux.
- `lh` vaut 0 quand la hauteur de ligne vaut 0 : `.56lh`, `9lh` et `1.7lh` s'éteignent toutes avec un seul `/0`.
- Le halo couleur du fond est une gomme bon marché : il coupe les cloches sans autre élément.
- Une `<img>` vide est une boîte de 5 caractères posée sur une ligne : `margin` suffit à en placer cinq.
- `font:50%/0"` termine la feuille de style : la chaîne ouverte est la famille de police.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
