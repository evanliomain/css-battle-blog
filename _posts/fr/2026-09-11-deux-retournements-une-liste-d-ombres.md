---
title: "Deux retournements, une liste d'ombres : une pilule et quatre barres en 151 caractères"
lang: fr
ref: 2026-09-11
permalink: /fr/2026/09/11/deux-retournements-une-liste-d-ombres/
description: "Comment une hauteur de ligne nulle et deux scale:-1 dessinent la cible CSS Battle du 11 septembre 2026 : une pilule bleue barrée de traits."
target: /assets/targets/2026-09-11.png
target_url: https://cssbattle.dev/play/7vxnmvdZG5jOA5grQWZT
colors: ["#ffd0bd", "#6b86e1"]
player: selenit
chars: 151
score: 694.85
match: 100
code: |
  <p><style>&,p{border:solid 2cap;background:#FFD0BD;color:6B86E1;border-radius:5lh}*{margin:60 8.33lh;*{box-shadow:5pc -11q,64q 32q;scale:-1;font:8px/0'
---

La cible du 11 septembre est bleue sur rose pâle : le contour d'une haute pilule, une barre en travers de son milieu, et quatre courtes barres qui sortent de ses côtés, deux à gauche et deux à droite, à des hauteurs différentes. La solution d'Ilya Streltsyn utilise trois boîtes. `html` est la pilule. Le `body` et un `<p>` vide se posent au même endroit, au milieu, et portent les deux mêmes ombres. Le `<p>` est retourné deux fois : ses ombres partent à droite ; le `body` n'est retourné qu'une fois : les siennes partent à gauche.

Cochez **Couleurs pédagogiques** pour voir les ombres du `<p>` en orange et celles du `body` en vert.

{% include animations/2026-09-11.html lang=page.lang %}

## Le code, aéré

```css
<p>
<style>
&, p {                             /* html et le p */
  border: solid 2cap;              /* deux hauteurs de majuscule */
  background: #FFD0BD;
  color: 6B86E1;                   /* un hex sans # passe en mode quirks */
  border-radius: 5lh;
}
* {
  margin: 60 8.33lh;
  * {                              /* le body et le p */
    box-shadow: 5pc -11q, 64q 32q;
    scale: -1;
    font: 8px / 0 '';              /* hauteur de ligne 0 : lh = 0 */
  }
}
```

## Comment ça marche

### 1. html : une pilule

`*` donne à `html` `margin:60 8.33lh`. `lh` est la hauteur de ligne de l'élément : 18px avec la police par défaut, donc `8.33lh` font 150. `html` va de x = 150 à 250, et en mode quirks il prend la hauteur que ses marges laissent : 300 − 120 = 180, de y = 60 à 240.

`&,p` donne à `html` (le `&` seul) et au `<p>` une bordure de `2cap`. `cap` est la hauteur d'une majuscule dans la police : ici, `2cap` donne une bordure de 20px. Une bordure sans couleur prend celle du texte : `color:6B86E1`, un hex sans `#` que le mode quirks accepte. `border-radius:5lh` font 90, trop pour une boîte de 100 de large : Chrome le réduit à 50. Une pilule.

### 2. Le p : la barre du milieu

`*` imbriqué vise le `body` et le `<p>`. Il leur donne `font:8px/0'` : une police de 8px avec une hauteur de ligne de 0, et la famille `'`, une chaîne ouverte fermée par la fin de la feuille de style.

Avec une hauteur de ligne de 0, `lh` vaut 0. Pour ces deux-là, `margin:60 8.33lh` devient donc `60 0`. Le `body` remplit le contenu de `html` : 60 de large, de x = 170 à 230, et il commence 60 plus bas, en y = 140. La marge haute du `<p>` fusionne avec celle du `body` : le `<p>` commence là aussi.

Le `<p>` est vide, 0 de haut : il n'est que sa bordure, `2cap` en police de 8px, soit 10 + 10 = 20 de haut, bleue. Son rayon de `5lh` vaut 0 : une barre carrée. Le `body` n'a ni bordure ni fond : il est invisible, mais il occupe la même place, 60 × 20.

### 3. Les ombres du p : à droite

Le `body` et le `<p>` reçoivent tous deux `box-shadow:5pc -11q,64q 32q` : deux copies bleues de leur boîte de 60 × 20, l'une 80px à droite et 10,39px plus haut, l'autre 60,47px à droite et 30,24px plus bas.

Tous deux reçoivent aussi `scale:-1`, un demi-tour autour de leur centre, (200 ; 150). Le `<p>` est dans le `body` : le demi-tour du `body` et le sien font un tour complet, et le `<p>` se retrouve à l'endroit. Ses ombres tombent à droite : de x = 250 à 310 en y = 129,6, et de x = 230,5 à 290,5 en y = 170,2. Elles partent de sous la bordure droite de la pilule : elles semblent en sortir.

### 4. Celles du body : à gauche

Le `body` n'est tourné qu'une fois. Ses ombres tournent avec lui autour de (200 ; 150) et tombent de l'autre côté, en miroir : 80px à gauche et 10,39px plus bas, de x = 90 à 150 en y = 150,4, et 60,47px à gauche et 30,24px plus haut, de x = 109,5 à 169,5 en y = 109,8. Ce sont les deux barres de gauche.

## Notes de golf

- `font:8px/0` met `lh` à 0 : les mêmes `8.33lh` font 150 pour `html` et 0 pour les deux boîtes du dedans.
- `cap` suit la police lui aussi : `2cap` fait une bordure de 20px sur `html` et de 10px sur le `<p>`.
- Le `<p>` et le `body` partagent une place et une liste d'ombres : un retournement pour le `body`, deux pour le `<p>`, et les deux paires de barres partent dans des sens opposés.
- `5lh` est un rayon qui arrondit `html` et disparaît sur le `<p>`.
- `color:6B86E1` colore les bordures et les quatre ombres, sans `#`.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
