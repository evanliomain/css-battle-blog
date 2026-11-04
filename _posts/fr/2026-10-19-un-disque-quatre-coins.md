---
title: "Un disque, quatre coins : un cadre en 123 caractères"
lang: fr
ref: 2026-10-19
permalink: /fr/2026/10/19/un-disque-quatre-coins/
description: "Comment deux bordures partagées et un fond de body passé au canevas dessinent la cible CSS Battle du 19 octobre 2026, avec un seul disque réparti sur quatre coins."
target: /assets/targets/2026-10-19.png
target_url: https://cssbattle.dev/play/2pAGX40Ie74ziGcixMUI
colors: ["#e8ba79", "#d93a", "#7e6293"]
player: koda_pig
chars: 123
score: 723.86
match: 100
code: |
  <style>*{border:5vw solid#E8BA79;margin:-5%24;*{margin:70 36;background:radial-gradient(1q,#D93A 60px,#7E6293)277%50vh/25pc
---

La cible du 19 octobre est un cadre couleur sable sur fond prune, avec une barre de chaque côté et un quart de disque dans chaque coin. koda_pig la dessine avec une seule règle de bordure, partagée par `html` et `body`, et un seul fond. Ce fond est écrit sur `body`, mais il finit sur le canevas, décalé pour que les quatre coins reçoivent chacun un quart du même disque.

{% include animations/2026-10-19.html lang=page.lang %}

## Le code, aéré

```css
* {                                /* html (et head, style, cachés) */
  border: 5vw solid #E8BA79;       /* 20px */
  margin: -5% 24;                  /* -20px 24px */
  * {                              /* body */
    margin: 70 36;
    background:
      radial-gradient(1q, #D93A 60px, #7E6293)
      277% 50vh / 25pc;            /* 25pc = 400px */
  }
}
```

## Comment ça marche

### 1. La bordure de html : deux barres

`*` donne à `html` une bordure de 20px (`5vw`, 5 % de 400). Sa marge vaut `-5% 24`. Une marge en pourcentage se calcule toujours sur la largeur, même en haut et en bas : −5 % de 400, c'est −20px.

CSS Battle affiche la page en mode quirks, où `html` remplit la hauteur de la page moins ses marges : 300 + 20 + 20 = 340px. La boîte de `html` va donc de y=−20 à y=320, et de x=24 à 376. Ses bordures du haut et du bas tombent juste hors du canevas. Seules celles de gauche et de droite se voient : deux barres de 20px, sur toute la hauteur, en x=24 et x=356.

### 2. La bordure de body : le cadre

Le `*` imbriqué vise les enfants de `html`. `head` reste caché, donc c'est `body`. Il reçoit la même bordure de 20px par la règle du dessus, et `margin:70 36` le place dans la boîte de contenu de `html` (x 44, y 0) : une boîte de 240×160 en (80, 70). Sa bordure est le cadre, avec un trou de 200×120.

### 3. Le fond de body part au canevas

Seul `body` a un fond. Quand `html` n'en a pas, le navigateur prend le fond du `body` pour tout le canevas, et ne le peint plus dans le `body`. C'est pour ça que le trou du cadre montre le même prune que le reste.

Avec une subtilité : ce fond est placé sur la boîte de `html`, pas sur celle de `body`. Sa zone de placement est la boîte de padding de `html`, les 312×300 à l'intérieur de sa bordure, à partir de x=44.

### 4. Un cercle au bord net

`radial-gradient(1q, #D93A 60px, #7E6293)` :

- `1q`, une seule longueur, en fait un cercle (de rayon un quart de millimètre, environ 0,95px).
- `#D93A` jusqu'à 60px : le disque.
- `#7E6293` n'a pas de position, il se placerait donc à 100 % du rayon, 0,95px. Un arrêt ne peut pas venir avant le précédent : il est repoussé à 60px, et le bord est net.

`#D93A`, c'est `#dd9933` à 67 % d'opacité. Sur la page blanche derrière le canevas, il donne `#e8bb77`, à une ou deux unités du `#e8ba79` du cadre.

### 5. 277% 50vh : un disque sur quatre coins

`/25pc` fixe la largeur de la tuile à 400px ; la hauteur reste `auto`, ce qui pour un dégradé veut dire la hauteur de la zone, 300px. Chaque tuile a donc exactement la taille du canevas, avec le disque au milieu.

- **x** : une position en pourcentage est une part de (zone − tuile) = 312 − 400 = −88px. 277 % de ça font −243,8px : la tuile commence en 44 − 243,8 = −199,8. Les centres des disques tombent en x=0,2 et x=400,2.
- **y** : la zone et la tuile font toutes deux 300px de haut, donc tout pourcentage donne 0. Il faut une longueur : `50vh` descend la tuile de 150px, et les centres tombent en y=0 et y=300.

La tuile se répète : quatre copies du disque ont leur centre sur les quatre coins du canevas. Chacune montre un quart, de rayon 60. Les barres de `html` sont peintes par-dessus, dans une couleur presque identique.

## Notes de golf

- Une seule `border` pour deux rôles : sur `html`, deux barres (le reste sort du canevas) ; sur `body`, le cadre.
- Le fond du `body` passe au canevas sans rien coûter, et le trou du cadre le montre.
- Une seule tuile de 400×300 met le même disque sur les quatre coins.
- `1q` est la façon la plus courte d'écrire `circle`, et il rend le dernier arrêt net sans `0` à la fin.
- `#D93A` (5 caractères) remplace `#e8ba79` (7), assez proche sur la page blanche.
- `-5%24`, `277%50vh` et `solid#E8BA79` n'ont pas besoin d'espace.
- `5vw` (20px) et `25pc` (400px) : les nombres sans unité marchent pour `margin` en mode quirks, mais pas dans les raccourcis `border` et `background`.
