---
title: "Une liste d'ombres, deux boîtes : un stade rose en 145 caractères"
lang: fr
ref: 2026-09-23
permalink: /fr/2026/09/23/une-liste-d-ombres-deux-boites/
description: "Comment une seule liste de quatre ombres, partagée par html et le body, dessine la cible CSS Battle du 23 septembre 2026 : un stade rose avec deux fenêtres et deux encoches."
target: /assets/targets/2026-09-23.png
target_url: https://cssbattle.dev/play/eC6qs1TR3GCyGderlYYF
colors: ["#8e3b66", "#f5a7a7"]
player: h_blierzt
chars: 145
score: 700.43
match: 100
code: |
  <style>*{background:#8E3B66;color:8F3B66;margin:-204 50 364;box-shadow:0-269q#F5A7A7,0 64q,-53q 32q,53q 32q}&{border-radius:5in;margin:76%140-204
---

La cible du 23 septembre est un stade rose sur un fond prune, avec deux petites fenêtres prune au milieu et une encoche de chaque côté. La solution de H_Bliertz place `html` sous le canevas, et donne à `html` et au `body` la même liste de quatre ombres. Sur `html`, seule l'ombre rose atteint le canevas : c'est le stade. Sur le `body`, la rose sort par le haut, et seules les trois ombres prune tombent sur le stade : une fenêtre et les deux encoches.

Cochez **Couleurs pédagogiques** pour voir les ombres prune dans une couleur plus foncée.

{% include animations/2026-09-23.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html et body */
  background: #8E3B66;
  color: 8F3B66;                   /* presque la couleur du fond */
  margin: -204 50 364;             /* pour le body */
  box-shadow:
    0 -269q #F5A7A7,               /* rose, 254,2px plus haut */
    0 64q,                         /* 60,47px plus bas */
    -53q 32q,                      /* 50,08px à gauche, 30,24px plus bas */
    53q 32q;                       /* 50,08px à droite, 30,24px plus bas */
}
& {                                /* html */
  border-radius: 5in;              /* réduit à 60px : un stade */
  margin: 76% 140 -204;            /* 120 × 200, à partir de y = 304 */
}
```

## Comment ça marche

### 1. html, sous le canevas

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. Il est plus précis que `*` : `html` prend la marge de `&`.

`margin:76%140-204` donne le haut, les côtés et le bas. Une marge en % se calcule sur la largeur : 76 % de 400 font 304. Avec 140 de chaque côté, `html` fait 120 de large, de x = 140 à 260. Sans doctype, la page est en mode quirks, et `html` prend la hauteur que ses marges laissent : 300 − 304 + 204 = 200. `html` est donc une boîte de 120 × 200, de y = 304 à 504, entièrement sous le canevas.

`border-radius:5in` fait 480px par coin, bien trop : Chrome réduit tous les rayons jusqu'à ce qu'ils tiennent, ici à 60px. La boîte est un stade : un rectangle aux deux bouts en demi-cercle.

### 2. La première ombre remonte

Le fond de `html` sert pour tout le canevas : le canevas est prune. Mais ses ombres restent attachées à sa boîte, avec les mêmes coins ronds. `0-269q#F5A7A7` remonte une copie rose de 269 quarts de millimètre : 254,2px. Le stade rose va maintenant de y = 49,8 à 249,8 : c'est la forme.

### 3. Trois ombres hors du canevas

Les trois autres ombres n'ont pas de couleur : elles prennent celle du texte, `color:8F3B66`, un hex sans `#` que le mode quirks accepte. Il est à 1 près la couleur du fond `#8E3B66`, trop proche pour se voir.

Sur `html`, elles se décalent de 60,47px vers le bas, et de 50,08px à gauche ou à droite avec 30,24px vers le bas. Comme `html` commence en y = 304, toutes les trois tombent sous le canevas : on ne les voit jamais.

### 4. Le body : la fenêtre du haut

Le `body` prend tout de `*`, dont `margin:-204 50 364`. Dans les 120px de `html`, il fait 120 − 50 − 50 = 20 de large, de x = 190 à 210. Sa marge haute de −204 le remonte en 304 − 204 = 100.

En mode quirks, le `body` remplit `html` moins ses propres marges : 200 + 204 − 364 = 40. C'est donc une boîte de 20 × 40, de y = 100 à 140. Son fond prune, venu de `*`, se peint par-dessus l'ombre rose de `html` : la fenêtre du haut.

### 5. Les mêmes ombres sur le body

Le `body` a la même liste de quatre ombres, autour de sa propre boîte. La rose remonte de 254,2px, en y = −154 : hors du canevas, par le haut.

Les trois autres tombent sur le stade, couleur du fond. `0 64q` pose une copie prune 60,47px plus bas, de y = 160,47 à 200,47 : la fenêtre du bas. `-53q 32q` et `53q 32q` en posent deux autres à 50,08px à gauche et à droite, 30,24px plus bas, de y = 130,24 à 170,24. Elles mordent sur les bords du stade, de x = 140 à 160 et de 240 à 260 : les deux encoches.

## Notes de golf

- Une liste d'ombres écrite une fois dans `*` fait deux travaux : la place de `html` et du `body` décide quelles ombres tombent sur le canevas.
- Mettre `html` sous le canevas cache trois de ses ombres gratuitement.
- `color:8F3B66` colore trois ombres, sans `#`, à 1 près du fond.
- `5in` est un rayon « le plus rond possible » bon marché : il est réduit pour tenir.
- Les quarts de millimètre donnent les décalages bizarres en 3 ou 4 caractères : `269q`, `64q`, `53q`, `32q`.
- Pas d'accolade fermante, et `<style>` n'est jamais fermé.
