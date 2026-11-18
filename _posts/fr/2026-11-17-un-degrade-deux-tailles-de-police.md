---
title: "Un dégradé, deux tailles de police : une vague en 112 caractères"
lang: fr
ref: 2026-11-17
permalink: /fr/2026/11/17/un-degrade-deux-tailles-de-police/
description: "Comment un seul radial-gradient partagé par html et le body, font:37%a et margin:0 37 75 dessinent la cible CSS Battle du 17 novembre 2026 : une vague moutarde de trois demi-anneaux sur fond vert sombre."
target: /assets/targets/2026-11-17.png
target_url: https://cssbattle.dev/play/v4vfHaiNnku33Bu4ZxoO
colors: ["#1a4341", "#998235"]
player: evanliomain
chars: 112
score: 737.55
match: 100
code: |
  <style>*{background:radial-gradient(1q,#1a4341 5vh,#998235 0 45px,#1a4341)4%0/55em 75vw;margin:0 37 75;font:37%a
---

La cible du 17 novembre est vert sombre, avec une vague moutarde au milieu : trois demi-anneaux de même taille, bout à bout. Une arche vers le haut à gauche, une cuvette vers le bas au milieu, une arche vers le haut à droite. Je la dessine avec une seule règle, sans autre balise que `<style>`. `html` et le `body` reçoivent le même dégradé en anneau, mais `font:37%a` leur donne deux tailles de police : `55em` fait donc deux tailles de tuile. Un anneau sur le canevas, une rangée d'anneaux dans le `body`.

Les **couleurs pédagogiques** séparent le fond et les anneaux du `body` de l'anneau du canevas, et la **vue large** montre où part l'anneau quand la tuile est trop large.

{% include animations/2026-11-17.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* html et le body */
  background:
    radial-gradient(1q, #1a4341 5vh, #998235 0 45px, #1a4341)  /* un anneau, rayons 15 et 45 */
    4% 0 / 55em 75vw;        /* tuile de 325,6 × 300 sur html, 120,47 × 300 sur le body */
  margin: 0 37 75;           /* html 326 × 225, body 252 × 150 */
  font: 37% a;               /* 5,92px sur html, 2,19px sur le body */
}
```

## Comment ça marche

### 1. Un anneau dans un dégradé

`*` vise `html`, `head`, `style` et le `body`. `head` et `style` ne s'affichent pas : seuls `html` et le `body` comptent, et les deux reçoivent le même fond.

`radial-gradient(1q, …)` est un cercle de rayon `1q` = 0,945px. Cette taille ne compte pas : les arrêts de couleur sont des longueurs fixes, et ils vont bien au-delà. Vert jusqu'à `5vh` = 15px. Puis `#998235 0 45px` : moutarde à partir de 0, c'est-à-dire là où s'arrête l'arrêt d'avant, donc de 15px avec un bord net, jusqu'à 45px. Puis vert à nouveau. Chaque tuile a un anneau moutarde de rayons 15 et 45, en son centre.

### 2. Des tuiles à la taille de la police

`/ 55em 75vw` donne la taille de la tuile. `75vw` fait 75 % de 400 = 300, la hauteur du cadre. `55em` dépend de la police de l'élément. Avec les 16px par défaut, ce serait 880, bien trop large : l'anneau partirait loin hors du cadre.

### 3. `font:37%a` : deux tailles pour une valeur

Le raccourci `font` demande une famille : `a` suffit, et pas besoin d'espace après `%`. Une taille en % se calcule sur celle du parent : elle se compose. `html` prend 37 % de 16 = 5,92px, et sa tuile fait 55 × 5,92 = 325,6 de large. Le `body` prend 37 % de 5,92 = 2,19px, et sa tuile ne fait plus que 120,47 de large. Le même `55em` donne une tuile large à l'un et des tuiles étroites à l'autre.

### 4. `margin:0 37 75` : deux boîtes

En mode quirks, les marges marchent sans unité. `html` fait 400 − 2 × 37 = 326 de large. En mode quirks, il remplit aussi la hauteur du cadre moins ses marges : 300 − 75 = 225. Le `body` reçoit les mêmes marges, dedans : 326 − 74 = 252 de large, depuis x = 74, et 225 − 75 = 150 de haut, depuis y = 0.

Le fond de `html` passe au canevas et couvre tout le cadre, mais ses tuiles partent de la boîte de `html`, en x = 37. Son anneau est centré en 37 + 325,6 / 2 = 199,8, et en y = 150. Les tuiles voisines mettent leurs anneaux en 199,8 ± 325,6, hors du cadre. Le `body` garde son propre fond sur sa boîte, en tuiles de 120,47.

### 5. `4%0` : la position

Une position en % est un pourcentage de l'écart entre la boîte et la tuile. Pour `html`, 4 % × (326 − 325,6) = 0,016 : rien ne bouge. Pour le `body`, 4 % × (252 − 120,47) = 5,26. Ses tuiles partent de 74 + 5,26, et ses anneaux sont centrés en 139,5 et 260. L'anneau de la tuile d'avant s'arrête en x = 64, et celui de la tuile d'après commence en x = 335,4 : les deux sont hors de la boîte du `body`. `0` est la position verticale : les anneaux restent en y = 150 dans les deux cas.

### 6. Trois demi-anneaux

Le `body` s'arrête à y = 150, pile sur le centre de ses anneaux : on n'en voit que la moitié haute, deux arches. Le `body` couvre aussi le haut de l'anneau du canevas. Il n'en reste que la moitié basse, sous y = 150 : la cuvette. Ses deux côtés vont de 154,8 à 184,8 et de 214,8 à 244,8, et les pieds des arches de 154,5 à 184,5 et de 215 à 245 : ils se rejoignent à 0,3px près.

## Notes de golf

- Une seule règle `*` donne le même fond à `html` et au `body`. Une taille de police en % se compose : `55em` donne donc deux tailles de tuile. Un anneau sur le canevas, deux dans le `body`.
- Les rayons de l'anneau sont en `vh` et en `px` : ils ne changent pas avec la police, et les trois demi-anneaux ont la même taille.
- `margin:0 37 75` place les deux boîtes d'un coup, et le bord bas du `body` tombe pile sur le centre de ses anneaux.
- `1q` donne un cercle de 0,945px : les arrêts sont des longueurs fixes, bien au-delà.
- `#998235 0 45px` donne deux positions au moutarde : des bords nets des deux côtés.
- `5vh` et `75vw` sont des écritures courtes de 15 et 300.
- `)4%0`, `37%a` : pas d'espace après `)` ni après `%`.
- La règle n'est jamais fermée.
