---
title: "Une ombre intérieure, trois L : une spirale carrée en 112 caractères"
lang: fr
ref: 2026-11-02
permalink: /fr/2026/11/02/une-ombre-interieure-trois-l/
description: "Comment une seule box-shadow intérieure, partagée par html, body et un p dimensionné par une img vide, dessine la cible CSS Battle du 2 novembre 2026 : trois L emboîtés, le dernier retourné."
target: /assets/targets/2026-11-02.png
target_url: https://cssbattle.dev/play/yqo0rTLub7PXnnSupZQT
colors: ["#492fb0", "#db5ead"]
player: koda_pig
chars: 112
score: 737.55
match: 100
code: |
  <p><img><style>*{background:#492FB0;margin:60 110;box-shadow:inset 32q -32q#DB5EAD;*{margin:0 0 60 60;*{scale:-1
---

La cible du 2 novembre est une spirale carrée rose sur fond violet : dans un carré de 180px, un grand L, un L moyen emboîté dedans, et un petit crochet tourné dans l'autre sens, tous calés dans le coin haut-droit. koda_pig dessine les trois formes avec une seule `box-shadow`, donnée à trois boîtes emboîtées. Chaque boîte est plus petite que son parent de la même marge, et la plus petite est retournée par `scale:-1`. Le plus joli, c'est d'où la plus petite boîte tire sa hauteur : d'une `<img>` vide.

{% include animations/2026-11-02.html lang=page.lang %}

## Le code, aéré

```css
<p><img>                         /* deux éléments gratuits : p, et une img dedans */
* {                              /* html, puis tout le reste */
  background: #492FB0;
  margin: 60 110;
  box-shadow: inset 32q -32q #DB5EAD;   /* environ 30px -30px */
  * {                            /* body, p, img */
    margin: 0 0 60 60;
    * {                          /* p et img */
      scale: -1;
    }
  }
}
```

## Comment ça marche

### 1. html est un carré de 180px

`*` touche d'abord `html`. Son fond violet part sur tout le canevas. `margin:60 110` lui laisse 180px de large, et en mode quirks, celui de CSS Battle, `html` remplit la hauteur de la page moins ses marges : 300 − 60 − 60 = 180. Un carré de 180×180 en (110, 60).

### 2. Une ombre intérieure dessine un L

`box-shadow:inset 32q -32q` est une ombre intérieure sans flou. Elle peint dans la boîte, partout sauf sous une copie de la boîte décalée de l'offset : 30px à droite et 30px vers le haut (32q font 30,24px). La copie couvre tout sauf une bande à gauche et une bande en bas. L'ombre est donc un L rose de 30px d'épaisseur.

### 3. body : le même L, 60px plus petit

`* *` vise les descendants. `margin:0 0 60 60` donne au `body` 120px de large (180 − 60) et, toujours par le mode quirks, 120px de haut (180 − 60). Il se cale dans le coin haut-droit de `html`, en (170, 60).

`body` a le même fond violet, peint par-dessus l'intérieur du premier L, et la même ombre : un deuxième L, de 120px, emboîté dans le premier.

### 4. p tire sa hauteur d'une img

Le `<p>` reçoit la même marge : il fait 60px de large, en (230, 60), encore dans le coin. Mais il ne contient aucun texte : seul, il ferait 0px de haut. Je l'ai vérifié : sans l'`<img>`, le `<p>` est plat et le petit crochet disparaît.

L'`<img>` n'a pas de source : c'est une boîte de 0×0. Mais `* *` lui donne aussi `margin:0 0 60 60`. Une image se pose sur la ligne avec ses marges : sa boîte de marge, 60×60, donne 60px de haut à la ligne. Le `<p>` enveloppe cette ligne : il fait 60×60, sans aucune `height`. Son ombre dessine un troisième L, de 60px.

### 5. scale:-1 retourne le dernier L

`* * *` vise un niveau plus bas : le `<p>` et l'`<img>` qu'il contient. `scale:-1` retourne le `<p>` autour de son centre, horizontalement et verticalement. Son L, une bande à gauche et une en bas, devient une bande en haut et une à droite : le petit crochet. La case de 30×30 qui reste au milieu montre le violet du `<p>`.

L'`<img>` est retournée aussi, mais elle fait 0×0 : son fond et son ombre ne se voient jamais.

## Notes de golf

- Une seule `box-shadow` sur `*` dessine les trois formes : les marges règlent les tailles, l'ombre dessine.
- `<img>` coûte 5 caractères et remplace un `height:60` sur le `<p>` : elle donne sa hauteur à la ligne par sa boîte de marge.
- `32q` fait 30,24px : les bords tombent à 0,24px de la grille des pixels ; CSS Battle donne quand même 100 %.
- `-32q#DB5EAD` : pas besoin d'espace avant le `#`.
- Mode quirks : `margin:60 110` sans unité, et des hauteurs qui viennent des marges.
- `<style>` n'est jamais fermé, et les règles imbriquées terminent le code.
