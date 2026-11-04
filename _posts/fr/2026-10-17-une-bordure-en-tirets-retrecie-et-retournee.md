---
title: "Une bordure en tirets, rétrécie et retournée : une dent en 101 caractères"
lang: fr
ref: 2026-10-17
permalink: /fr/2026/10/17/une-bordure-en-tirets-retrecie-et-retournee/
description: "Comment une seule bordure en tirets sur un body trop large, rétrécie et retournée par scale:.6-1, dessine la cible CSS Battle du 17 octobre 2026."
target: /assets/targets/2026-10-17.png
target_url: https://cssbattle.dev/play/pX4BmQEORMGXlg74scvd
colors: ["#73493a", "#fef9ce", "#a6ba86"]
player: gunnar
chars: 101
score: 752.75
match: 100
code: |
  <style>&{background:#73493A;*{background:#FEF9CE;margin:65 59;border-top:53q dashed#A6BA86;scale:.6-1
---

La cible du 17 octobre est un carré jaune très pâle sur un fond brun chocolat, avec deux blocs vert sauge dans ses coins du bas et une bande jaune entre les deux. On dirait une dent, ou un tablier. Gunnar Bittersmann la dessine avec le seul `body` : une boîte crème avec une bordure haute en tirets. Les deux tirets sont les blocs verts. L'astuce : les dessiner sur une boîte trop large pour la cible, puis la resserrer avec `scale`, et la retourner pour que la bordure du haut finisse en bas.

{% include animations/2026-10-17.html lang=page.lang %}

## Le code, aéré

```css
& {                                  /* html */
  background: #73493A;
  * {                                /* enfants de html : seul body s'affiche */
    background: #FEF9CE;
    margin: 65 59;
    border-top: 53q dashed #A6BA86;
    scale: .6 -1;
  }
}
```

## Comment ça marche

### 1. Une carte crème trop large

À la racine, `&` veut dire `html`. Son fond brun part sur tout le canevas. Le `*` imbriqué touche ses enfants ; `head` reste caché, seul `body` s'affiche.

`margin:65 59` laisse au `body` 400 − 2 × 59 = 282px de large. En mode quirks, celui de CSS Battle, `body` s'étire sur la hauteur de la page moins ses marges : 300 − 2 × 65 = 170px. Une carte crème de 282 × 170 en (59, 65). Elle est trop large pour le carré de 170px de la cible, et c'est voulu.

### 2. Une bordure en tirets avec deux tirets

`border-top:53q dashed` est une bordure de 50px : 53q fait 50,08px, et la bordure est dessinée sur 50px.

Chrome dessine une bordure en tirets avec un tiret entier à chaque bout. Chaque tiret est long de deux fois l'épaisseur, ici 100px, et le trou entre les tirets s'étire pour remplir le côté. Sur 282px, il y a la place pour deux tirets : 100 | 82 | 100. C'est le motif de la cible : deux blocs verts avec un trou au milieu.

Sur une boîte déjà large de 170px, la même bordure serait un trait plein : deux tirets de 100px ne tiennent pas. C'est pour ça que la carte part plus large.

### 3. scale:.6 la ramène à la bonne largeur

`scale:.6 -1` met la boîte à l'échelle autour de son centre, (200, 150). En largeur, ×0,6 fait passer 282px à 169,2px, de x 115,4 à 284,6, et les tirets à 60 | 49,2 | 60. C'est le carré de la cible, avec ses deux coins verts de 60px et la bande entre eux.

### 4. -1 la met à l'envers

La deuxième valeur, −1, retourne la boîte verticalement autour de y = 150. La carte couvre toujours y de 65 à 235, mais la bordure du haut est maintenant en bas, de y 185 à 235. Les coins verts tombent là où la cible les a.

## Notes de golf

- Un élément, une bordure, une transformation. Les tirets dessinent les deux blocs verts, et le trou entre eux est gratuit.
- `border-top` a 3 caractères de moins que `border-bottom`. Le retournement qui le fait descendre ne coûte rien : `.6-1` est aussi long que `.6 1`, puisque le signe moins sépare aussi les nombres.
- `53q` donne 50px de bordure en 3 caractères.
- Les bords tombent à 0,4px de ceux de la cible (115,4 au lieu de 115, etc.). Dans mon rendu local, quelques colonnes le long de ces bords sortent mélangées (392 pixels), mais CSS Battle compte la solution comme identique à 100 %.
- `<style>` n'est jamais fermé, les deux règles non plus.
