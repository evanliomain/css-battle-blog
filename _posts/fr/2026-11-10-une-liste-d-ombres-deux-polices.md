---
title: "Une liste d'ombres, deux polices : une pile de barres en 149 caractères"
lang: fr
ref: 2026-11-10
permalink: /fr/2026/11/10/une-liste-d-ombres-deux-polices/
description: "Comment une seule liste d'ombres, partagée par deux boîtes transparentes aux polices différentes, dessine la cible CSS Battle du 10 novembre 2026 : quatre barres et une pilule sur fond ocre."
target: /assets/targets/2026-11-10.png
target_url: https://cssbattle.dev/play/im5bpfWBaCfsHz3ynGXj
colors: ["#373737", "#fff", "#a85"]
player: emohdaziz
chars: 149
score: 696.67
match: 100
code: |
  <style>*{border-radius:1in;color:373737;margin:195 0 75 140;box-shadow:5vw -5ch,5ch -5em#fff,64Q -30vw,2lh 0 0 4in#a85;*{margin:0 90-46%140;font:5cm"
---

La cible du 10 novembre est ocre, avec quatre barres empilées, rondes à gauche et coupées net à droite, sombres et blanches tour à tour, et une pilule sombre à leur droite. La solution de Mohamed Ali n'écrit aucun fond. Une seule règle sur `*` donne la même liste d'ombres à `html` et au `body`. La très grosse police du `body` envoie certaines de ses ombres au loin, et en change une autre en cache qui coupe les barres.

Cochez **Couleurs pédagogiques** pour voir le cache du `body`, et passez en **Vue large** pour voir les barres dépasser du canevas.

{% include animations/2026-11-10.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                  /* html d'abord, puis le body */
  border-radius: 1in;                /* trop grand : ramené à 15, bouts ronds */
  color: 373737;                     /* sans # : mode quirks ; colore les ombres */
  margin: 195 0 75 140;              /* html : 260 × 30 en (140 ; 195) */
  box-shadow:
    5vw -5ch,                        /* barre sombre */
    5ch -5em #fff,                   /* barre blanche */
    64Q -30vw,                       /* barre sombre ; la pilule sur le body */
    2lh 0 0 4in #a85;                /* le fond ; un cache sur le body */
  * {                                /* le body */
    margin: 0 90 -46% 140;           /* 30 × 149,6 en (280 ; 195) */
    font: 5cm "";                    /* 189px : em, ch et lh grandissent */
  }
}
```

## Comment ça marche

### 1. html : un trou

`*` vise tous les éléments, `html` compris. `margin:195 0 75 140` place `html` de x = 140 à 400. En mode quirks, `html` remplit la hauteur que ses marges lui laissent : 300 − 195 − 75 = 30, de y = 195 à 225.

`border-radius:1in` demande 96px, mais un rayon ne peut pas dépasser la moitié du côté : Chrome le ramène à 15, et les bouts sont ronds. `html` n'a pas de fond, le `body` non plus : le canevas reste blanc.

### 2. Une ombre géante : le fond

La dernière ombre de la liste, `2lh 0 0 4in#a85`, est étalée de 384px (`4in`). Elle est décalée de 36px vers la droite (`2lh`, deux lignes de 18px), mais avec cet étalement elle couvre quand même tout le canevas en ocre : c'est le fond.

Une ombre n'est jamais peinte sous la boîte qui la porte. La boîte de `html`, 260 × 30 aux bouts ronds, garde donc le blanc du canevas : c'est la barre blanche du bas.

### 3. Trois ombres : trois barres

Les ombres sans couleur prennent la couleur du texte : `color:373737`, un hex sans `#` que le mode quirks accepte. Avec la police de 16px de `html`, `1ch` fait 8px et `1em` 16px :

- `5vw -5ch` : 20 à droite et 40 plus haut, une barre sombre à partir de x = 160, en y = 155.
- `5ch -5em#fff` : 40 à droite et 80 plus haut, une barre blanche à partir de x = 180, en y = 115.
- `64Q -30vw` : 60,47 à droite et 120 plus haut, une barre sombre à partir de x = 200,5, en y = 75.

Chaque copie a la forme de `html` : le bout rond est à gauche. À droite, elles dépassent toutes du canevas, jusqu'à x = 460,5.

### 4. Le body : même liste, grosse police

`*` imbriqué vise le `body`. Il reçoit tout ce que le premier `*` donnait : le rayon, la couleur et la liste d'ombres. Sa propre marge, `margin:0 90-46%140`, remplace l'autre. Le `body` va de x = 280 à 310. `-46%` se calcule sur la largeur de `html`, 260 : −119,6 en bas, qui l'étire, en mode quirks, de y = 195 à 344,6.

`font:5cm"` donne au `body` une police de 189px. Le `"` n'est jamais fermé : la famille de police est une chaîne vide jusqu'à la fin du code. `5vw -5ch` vaut maintenant (20 ; −472,4) et `5ch -5em` (472,4 ; −945) : ces deux copies sortent du canevas.

### 5. Un cache couleur du fond

La dernière ombre du `body` est aussi `2lh 0 0 4in`, mais sa ligne fait maintenant 217px, donc `2lh` vaut 434px. L'ombre commence à x = 280 + 434 − 384 = 330 et couvre tout ce qui est à sa droite, de très haut au-dessus du canevas à très bas en dessous.

Le `body` est peint après `html`, ombres comprises. Ce cache ocre masque le bout droit des quatre barres, toutes à x = 330 : c'est la coupe nette.

### 6. La pilule

`64Q -30vw` ne dépend pas de la police. Sur le `body`, elle donne une copie décalée de 60,47 à droite et 120 plus haut : de x = 340,5 à 370,5 et de y = 75 à 224,6, avec les bouts ronds du `body`. Elle vient avant le cache dans la liste, elle est donc peinte par-dessus : c'est la pilule sombre.

## Notes de golf

- Aucun `background` : le blanc est le canevas vu à travers la boîte de `html`, et l'ocre est une ombre.
- Une seule liste d'ombres sur `*` pour deux boîtes. Les unités `em`, `ch` et `lh` suivent la police, `vw` et `Q` non : la taille de police choisit les copies qui restent à l'écran.
- La même ombre fait le fond sur `html` et un cache sur le `body` : `2lh` vaut 36px sur l'un et 434px sur l'autre.
- `color:373737` colore trois ombres sans `#`.
- `1in` est un « très grand rayon » court : les deux boîtes ont des bouts ronds.
- Pas d'accolade fermante, et le code s'arrête pile sur le `"` ouvert. J'ai vérifié qu'un saut de ligne après ce `"` fait tomber toute la déclaration `font`, et le rendu ne correspond plus.
