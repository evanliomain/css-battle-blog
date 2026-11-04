---
title: "Un dégradé, trois valeurs : une porte coupée en 144 caractères"
lang: fr
ref: 2026-10-22
permalink: /fr/2026/10/22/un-degrade-trois-valeurs/
description: "Comment un seul dégradé radial fixe, partagé par tous les éléments et complété par une propriété personnalisée, dessine la cible CSS Battle du 22 octobre 2026."
target: /assets/targets/2026-10-22.png
target_url: https://cssbattle.dev/play/bkZ5Wcu73bOWnpZPZKSK
colors: ["#173c46", "#30acce", "#fff"]
player: evanliomain
chars: 144
score: 701.39
match: 100
code: |
  <h1><h6><style>*{background:radial-gradient(1Q,#173c46 var(--c,8mm,#30acce))fixed;margin:10 40 10 95;*{--c:;*{margin:20;padding:55;--c:.8lh,#fff
---

La cible du 22 octobre est une porte blanche sur fond bleu ciel : deux carrés blancs, bordés à gauche par un montant bleu pétrole et séparés par une barre sombre, avec un disque sombre sur le montant, au centre du canevas. J'écris un seul `background` pour tous les éléments. Une propriété personnalisée, `--c`, termine le dégradé différemment à chaque niveau : un disque sur le canevas, un bloc uni sur `body`, des carrés blancs avec le même disque sur les titres.

{% include animations/2026-10-22.html lang=page.lang %}

## Le code, aéré

```css
* {                                   /* html, head, body, h1, h6, style */
  background:
    radial-gradient(1Q, #173c46 var(--c, 8mm, #30acce))
    fixed;                            /* centré sur la fenêtre */
  margin: 10 40 10 95;
  * {                                 /* head (caché) et body */
    --c: ;                            /* vide */
    * {                               /* h1, h6 (et le style, caché) */
      margin: 20;
      padding: 55;
      --c: .8lh, #fff;
    }
  }
}
```

## Comment ça marche

### 1. Un dégradé, terminé par une variable

Le dégradé est `radial-gradient(1Q, #173c46 var(--c, 8mm, #30acce))`. Tout ce qui suit la couleur sombre vient de `--c` :

| Élément | `--c` | Le dégradé devient | Résultat |
| --- | --- | --- | --- |
| `html` | absente : le repli | `#173c46 8mm, #30acce` | un disque sombre de 30,2px, bleu ciel autour |
| `body` | définie, mais vide | `#173c46` | un aplat sombre |
| `h1`, `h6` | `.8lh, #fff` | `#173c46 .8lh, #fff` | un disque sombre, blanc autour |

Le repli de `var()`, c'est tout ce qui suit la première virgule : `8mm,#30acce` est un seul repli en deux morceaux. Un `--c:` vide n'est pas la même chose qu'une `--c` absente : la variable existe, donc le repli n'est pas utilisé, et `var()` ne met rien. Un dégradé à un seul arrêt de couleur, c'est une couleur unie.

`1Q` fait du dégradé un cercle, et un tout petit : la dernière couleur n'a pas de position, elle se placerait donc à 100 % de 1Q, environ 0,95px. Un arrêt ne peut pas venir avant le précédent : elle est repoussée jusqu'au bord du disque, qui reste net.

### 2. fixed : le même centre pour tous

`fixed` place le fond sur la fenêtre plutôt que sur la boîte de l'élément. Sur chaque élément, le cercle est donc centré sur (200, 150), le milieu du canevas. Chaque élément ne montre que la partie qui tombe dans sa propre boîte. C'est comme ça que le disque du canevas et celui du `h1` se raccordent en une seule forme.

### 3. html peint le canevas

`html` reçoit `margin:10 40 10 95`, mais son fond n'est pas peint dans sa boîte : le fond de `html` couvre tout le canevas. Ça donne le bleu ciel et le disque sombre complet, de 8mm (30,2px) de rayon, au centre.

### 4. body est le bloc sombre

`body` reçoit les mêmes marges dans `html` : il commence en x=95 + 95 = 190 et finit en 400 − 40 − 40 = 320, soit 130px de large. En haut, sa marge de 10px se fond avec celle de 20px du `h1` qu'il contient (rien ne les sépare) : la plus grande gagne, et `body` commence en y=30. Pareil en bas avec le `h6`. En mode quirks, `body` prend la hauteur de `html` moins ces marges : 280 − 20 − 20 = 240px, de y=30 à 270.

Avec la `--c` vide, son fond est un bleu pétrole uni. Il couvre la moitié droite du disque, et devient le montant et la barre de la porte.

### 5. h1 et h6 : deux fenêtres blanches

`<h1>` et `<h6>` sont dans `body`. Ils reçoivent `margin:20;padding:55`. Il n'y a pas de place pour du contenu : 130 − 2 × 20 laisse 90px, moins que les 110px de padding. Le contenu se réduit donc à 0, et chaque titre est une boîte de 110×110 qui dépasse jusqu'au bord droit du `body`. Ils sont vides, donc ils font aussi 110px de haut.

- Le `h1` va de (210, 30) à (320, 140).
- Le `h6` vient après un écart de 20px, de (210, 160) à (320, 270).

La bande de 20px à gauche et l'écart de 20px entre eux, c'est le `body` qui se voit : le montant et la barre.

### 6. .8lh : un disque, deux tailles

`lh`, c'est la hauteur de ligne de l'élément. Les titres gardent leur taille de police par défaut :

- `h1` : 32px, une hauteur de ligne normale de 37px, donc `.8lh` fait 29,6px. Son coin, en (210, 140), n'est qu'à 14px du centre : le disque sombre mord dedans.
- `h6` : 10,7px, une hauteur de ligne de 13px, donc `.8lh` fait 10,4px. Son coin, en (210, 160), est lui aussi à 14px : hors de portée. Le `h6` reste tout blanc.

C'est pour ça que le disque n'entame que le carré du haut.

## Notes de golf

- Un seul `background` pour tous les éléments ; `--c` le change à chaque niveau.
- `--c:;` (5 caractères) transforme le dégradé en couleur unie, en sautant le repli.
- `fixed` met le disque au même endroit sur chaque élément : des morceaux peints par des éléments différents se raccordent.
- `.8lh` donne deux rayons avec une seule valeur, parce que `h1` et `h6` ont des polices par défaut différentes.
- `padding:55` fait une boîte de 110×110 sans `width` ni `height`.
- `1Q` est la façon la plus courte d'écrire `circle`, et il garde le bord du disque net sans `0` à la fin.
- `<h1><h6>` : deux éléments en 8 caractères. `<style>` n'est jamais fermé.
