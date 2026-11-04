---
title: "Deux boîtes invisibles, trois ombres : un anneau en moulinet en 164 caractères"
lang: fr
ref: 2026-10-31
permalink: /fr/2026/10/31/deux-boites-invisibles-trois-ombres/
description: "Comment un dégradé fixé et trois box-shadow partagées par html et body, posés hors du canevas, dessinent la cible CSS Battle du 31 octobre 2026 : un anneau et quatre barres."
target: /assets/targets/2026-10-31.png
target_url: https://cssbattle.dev/play/TWNhOfMsYQnVbyjKPFeG
colors: ["#62306d", "#f7ec7d"]
player: evanliomain
chars: 164
score: 683.8
match: 100
code: |
  <style>*{margin:-76-200 211 88;box-shadow:8vw 74vh,54vh 4em,-42vh 88vw;color:f7ec7d;background:radial-gradient(1q,#62306d 53q,#f7ec7d 0 5em,#62306d)fixed}&{width:30
---

La cible du 31 octobre est un anneau jaune pâle sur un fond prune, avec quatre barres autour comme les ailes d'un moulinet : vers le haut et vers la droite depuis le coin haut-droit, vers le bas et vers la gauche depuis le coin bas-gauche. Je dessine l'anneau avec un dégradé, et les quatre barres avec seulement trois ombres. L'astuce : `html` et `body` partagent une seule règle. Ce sont deux boîtes invisibles, presque hors du canevas, qui projettent les mêmes ombres depuis deux endroits différents.

{% include animations/2026-10-31.html lang=page.lang %}

## Le code, aéré

```css
* {                                     /* html, puis body */
  margin: -76 -200 211 88;
  box-shadow:
    8vw 74vh,                           /* 32px 222px */
    54vh 4em,                           /* 162px 64px */
    -42vh 88vw;                         /* -126px 352px */
  color: f7ec7d;                        /* la couleur des ombres */
  background: radial-gradient(1q, #62306d 53q, #f7ec7d 0 5em, #62306d) fixed;
}
& {                                     /* & seul, c'est html */
  width: 30;
}
```

## Comment ça marche

### 1. L'anneau est un dégradé fixé

Le fond de `html` part sur le canevas. C'est un cercle (`1q`, une seule longueur, veut dire « un cercle »), prune jusqu'à 53q (environ 50px), jaune jusqu'à 5em (80px), prune au-delà. Le `0` après le jaune le colle à l'arrêt précédent : le bord est net.

Un fond se place normalement sur la boîte de `html`, minuscule ici. `fixed` le place plutôt sur la fenêtre de 400×300 : l'anneau tombe pile au centre, en (200, 150). Sans `fixed`, le canevas se couvre de tuiles de 30×165.

### 2. html : une boîte de 30×165 qui dépasse en haut

`&{width:30}` donne 30px de large à `html`. Ses marges le placent en x = 88 et y = −76. CSS Battle tourne en mode quirks, où `html` remplit la hauteur de la fenêtre moins ses marges : 300 + 76 − 211 = 165. `html` va donc de y = −76 à y = 89, en partie au-dessus du canevas.

La boîte elle-même est invisible : son fond, c'est le canevas. Seules ses ombres vont se voir.

### 3. body : une boîte de 142×30 au-dessus du canevas

`*` donne les mêmes marges à `body`, dans `html` :

- largeur : 30 − 88 + 200 = 142px (la marge droite de −200 le rend plus large que son parent) ;
- hauteur, toujours par le mode quirks, `body` remplit `html` moins ses marges : 165 + 76 − 211 = 30px.

Il se place en (176, −152), entièrement au-dessus du canevas. Son propre fond est hors de vue, lui aussi.

### 4. Une ombre, deux barres

Les deux boîtes reçoivent les mêmes trois ombres, sans couleur à elles : elles prennent `color`, `f7ec7d`. En mode quirks, une couleur peut se passer de son `#`. Une ombre est une copie de la boîte décalée de son offset : chaque ombre donne donc deux copies, une par boîte.

| Ombre | Copie de `html` (30×165) | Copie de `body` (142×30) |
| --- | --- | --- |
| `8vw 74vh` = 32, 222 | barre verticale, en bas à gauche (120, 146) | barre horizontale, en haut à droite (208, 70) |
| `54vh 4em` = 162, 64 | barre verticale, en haut à droite (250, −12) | hors du canevas |
| `-42vh 88vw` = −126, 352 | hors du canevas | barre horizontale, en bas à gauche (50, 200) |

La première ombre fait deux choses : l'écart entre ses deux copies est exactement l'écart entre les deux boîtes, (88, −76). Les deux autres font chacune une barre, et leur copie en trop tombe hors du canevas.

### 5. Les coins carrés, gratuits

L'anneau seul serait rond partout. Mais chaque barre va jusqu'à l'axe de l'anneau : la barre verticale du haut descend jusqu'à y = 153, et la barre horizontale commence à x = 208. À elles deux, elles remplissent le coin haut-droit du carré qui entoure l'anneau, et les barres du bas font pareil de l'autre côté. Les bouts de barres qui tombent sur l'anneau sont jaunes sur jaune : ils ne se voient pas.

## Notes de golf

- `html` et `body` font deux boîtes pour le prix d'une règle : les marges, écrites une fois, leur donnent des tailles et des places différentes.
- Une ombre sert aux deux boîtes : trois ombres dessinent quatre barres.
- `fixed` centre le dégradé sur la fenêtre, sans aucun `at`.
- `vw`, `vh` et `em` gardent les décalages courts : `8vw` fait 32px et `74vh` 222px, en 3 et 4 caractères.
- `53q` fait environ 50px ; `-76-200` n'a pas besoin d'espace avant le signe moins.
- `color:f7ec7d` : pas besoin de `#` en mode quirks. `<style>` n'est jamais fermé.
