---
title: "Deux fenêtres, une retournée : un disque barré en 169 caractères"
lang: fr
ref: 2026-10-18
permalink: /fr/2026/10/18/deux-fenetres-une-retournee/
description: "Comment un seul dégradé, donné à tous les éléments, et deux paragraphes, dont un retourné, dessinent la cible CSS Battle du 18 octobre 2026."
target: /assets/targets/2026-10-18.png
target_url: https://cssbattle.dev/play/W7SWtIqYNFiLhipGj6bj
colors: ["#c0d6e7", "#2d3464", "#d95362"]
player: emohdaziz
chars: 169
score: 679.9
match: 100
code: |
  <p><p><style>*{background:radial-gradient(1Q at 50%25vw,#c0d6e7,79Q,#2d3464)0 63Q}&>*{background:#d95362;border-radius:32Q;margin:50 70;p{height:85;margin:30;+p{scale:-1
---

La cible du 18 octobre est un H rouge sur fond bleu nuit, avec derrière un disque bleu pâle coupé en deux par la barre. Mohamed Ali la dessine avec un `body` rouge et deux `<p>` qui servent de fenêtres. Les deux reçoivent le même dégradé, décalé pour que le bord de la tuile coupe le disque à plat ; la seconde fenêtre est simplement retournée.

{% include animations/2026-10-18.html lang=page.lang %}

## Le code, aéré

```css
* {                               /* tous les éléments, p compris */
  background:
    radial-gradient(1Q at 50% 25vw, #c0d6e7, 79Q, #2d3464)
    0 63Q;                        /* 59,5px plus bas, la tuile se répète */
}
& > * {                           /* enfants de html : head (caché) et body */
  background: #d95362;
  border-radius: 32Q;             /* 30,2px */
  margin: 50 70;
  p {                             /* les deux <p> dans body */
    height: 85;
    margin: 30;
    + p {                         /* le second */
      scale: -1;
    }
  }
}
```

## Comment ça marche

### 1. Un disque net grâce à un repère de transition

`radial-gradient(1Q at 50% 25vw, #c0d6e7, 79Q, #2d3464)` est un cercle centré à 25vw (100px) du haut de la boîte. Le `79Q` entre les deux couleurs n'a pas de couleur : c'est un repère de transition (un « color hint »), l'endroit où le mélange est fait à moitié.

La taille du cercle est `1Q`, environ 0,95px, donc la dernière couleur se place à 100 % de ça : 0,95px. Un arrêt ne peut pas venir avant un arrêt ou un repère précédent, alors le navigateur le repousse à 79Q (74,6px). Le repère et la dernière couleur sont maintenant au même endroit, et le mélange n'a plus de place : le bleu pâle s'arrête net à 74,6px, et le bleu nuit remplit le reste. Sans le `1Q`, le dégradé devient un flou doux.

### 2. body, c'est le bloc rouge

`&` seul veut dire `html`, donc `&>*` vise ses enfants : `head`, qui reste caché, et `body`. Il reçoit un fond rouge, des coins de 30,2px (`32Q`) et `margin:50 70`. En mode quirks, celui de CSS Battle, `body` remplit la hauteur de la page moins ses marges : un bloc de 260×200 en (70, 50). Son fond est maintenant un rouge uni : le dégradé reçu par `*` disparaît.

`html` garde le dégradé. Son disque tombe vers y≈160, caché sous le bloc rouge.

### 3. Deux paragraphes, deux fenêtres

Les deux `<p>` sont dans `body`. `p{height:85;margin:30}` leur donne 200×85 (260 − 2 × 30 de large).

- La marge du haut du premier `p` se fond dans celle de 50px du `body`, car rien (ni bordure, ni padding) ne les sépare. Il touche donc le haut du bloc rouge, à y=50.
- Les deux marges de 30px entre les paragraphes se fondent en une seule : le second `p` commence à y=165 et finit à 250, pile au bas du bloc.

Ce qui reste rouge : un montant de 30px de chaque côté et une barre de 30px, de y=135 à 165. C'est le H.

### 4. Le bord de la tuile coupe le disque

Chaque `p` reçoit le dégradé de `*`, à la taille de sa propre boîte de 200×85. Le centre du cercle est à 100px du haut : sous la boîte. Seul le haut du cercle y entre, en bas de la fenêtre.

`0 63Q` fait descendre le fond de 59,5px. Un fond se répète par défaut : le vide du haut est rempli par une copie de la même tuile, qui apporte son propre cercle. Le centre de cette copie est à 100 − 85 + 59,5 = 74,5px sous le haut du `p` : son disque commence pile en haut (74,5 − 74,6 ≈ 0) et descend jusqu'au bord bas de la copie, à 59,5px. Sous cette ligne, c'est la tuile suivante, dont le disque commence plus bas, tout au bord inférieur de la fenêtre.

La première fenêtre montre donc une calotte du disque, de y=50 à y=109,5, coupée parfaitement à plat par le bord de la tuile, large d'environ 146px à la coupe. Le bleu nuit sous la coupe, jusqu'à la barre, c'est le reste de la tuile.

### 5. scale:-1 retourne la seconde fenêtre

`+p` dans `p`, c'est le `p` qui suit un autre `p` : le second. Il montre la même calotte, bord plat en bas. `scale:-1` le met à l'échelle −1 sur les deux axes, autour de son centre : la même chose qu'un demi-tour. La calotte passe en bas de la fenêtre, bord plat en haut à y=190,5, face à la barre.

## Notes de golf

- `<p><p>` : deux éléments en 6 caractères, sans balises fermantes ni `</style>`.
- `*` donne le dégradé à tout le monde. `body` le perd avec son propre `background`, la copie de `html` se cache sous le bloc rouge, et seuls les paragraphes le montrent.
- `scale:-1` fait un demi-tour en 8 caractères.
- `25vw`, c'est 100px en 4 caractères, et `50%25vw` n'a pas besoin d'espace : le `%` termine le nombre.
- `63Q` (59,5px) et `32Q` (30,2px) : 3 caractères chacun, et `32Q` est plus court que `30px`.
- `&>*{…p{…+p{…}}}` : l'imbrication atteint `body`, puis les paragraphes, puis le second, sans jamais écrire `body`.
- `height:85`, `margin:30`, `margin:50 70` : pas d'unité en mode quirks.
