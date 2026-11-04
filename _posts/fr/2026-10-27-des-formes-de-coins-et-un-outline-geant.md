---
title: "Des formes de coins et un outline géant : une flèche en 97 caractères"
lang: fr
ref: 2026-10-27
permalink: /fr/2026/10/27/des-formes-de-coins-et-un-outline-geant/
description: "Comment une seule boîte html, un outline immense et corner-shape:notch bevel dessinent la cible CSS Battle du 27 octobre 2026 : une flèche blanche sur fond prune."
target: /assets/targets/2026-10-27.png
target_url: https://cssbattle.dev/play/0bO40qQCb991cXkXDRvj
colors: ["#72374d"]
player: levito
chars: 97
score: 758.69
match: 100
code: |
  <style>&{margin:30%35%60;outline:9in solid#72374D;border-radius:0 50%50%;corner-shape:notch bevel
---

La cible du 27 octobre est une forme blanche sur fond prune, comme une flèche qui pointe vers le haut à droite : un carré au coin haut-droit coupé en biais, avec une encoche carrée en bas à droite et un coin bas-gauche en biais. Veit Lehmann la dessine avec une seule boîte, `html`, et quatre déclarations. Le prune n'est pas un fond mais un outline immense, et `corner-shape` change les coins arrondis en biais et en encoche.

{% include animations/2026-10-27.html lang=page.lang %}

## Le code, aéré

```css
& {                               /* html */
  margin: 30% 35% 60;             /* une boîte de 120 × 120 en (140, 120) */
  outline: 9in solid #72374D;     /* 864px de prune tout autour */
  border-radius: 0 50% 50%;       /* 0 / 60 / 60 / 60 */
  corner-shape: notch bevel;      /* notch, bevel, notch, bevel */
}
```

## Comment ça marche

### 1. html est la forme blanche

Au premier niveau, `&` veut dire `html`. Il n'a pas de fond : le canevas derrière reste blanc.

`margin:30%35%60` a trois valeurs : haut, côtés, bas. Les marges en pourcentage se calculent sur la largeur, même en vertical : 30 % de 400, c'est 120px en haut, 35 %, 140px de chaque côté, et 60px en bas. CSS Battle affiche la page en mode quirks, où `html` remplit la page moins ses marges : 400 − 280 = 120 de large, 300 − 120 − 60 = 120 de haut. Une boîte de 120 × 120 en (140, 120).

Le `body`, dedans, n'a pas de fond non plus : il ne se voit pas.

### 2. Le fond est un outline

`outline:9in` fait 864px d'épaisseur. Un outline se dessine autour de la boîte, et 864px suffisent largement pour atteindre tous les bords du canevas. Tout ce qui est hors de la boîte devient prune ; le canevas ne se voit plus que dans la boîte.

Un outline suit la forme des coins de la boîte. Quelle que soit la forme des coins, la zone blanche la prend aussi.

### 3. Trois coins de 60px

`border-radius:0 50%50%` a trois valeurs : haut-gauche, puis haut-droit et bas-gauche, puis bas-droit. Ça fait 0 en haut à gauche et 50 % (60px sur une boîte de 120px) partout ailleurs. Avec les coins ronds par défaut, on aurait une boîte à trois coins arrondis.

### 4. corner-shape change l'allure des coins

`corner-shape` garde les rayons mais change la courbe tracée dedans. Avec deux valeurs, il se répète comme `border-radius` : la première pour haut-gauche et bas-droit, la seconde pour haut-droit et bas-gauche.

| Coin | Rayon | Forme | Résultat |
| --- | --- | --- | --- |
| haut-gauche | 0 | `notch` | coin droit (pas de rayon, rien à couper) |
| haut-droit | 60px | `bevel` | un biais droit de (200, 120) à (260, 180) |
| bas-droit | 60px | `notch` | un carré de 60 × 60 creusé dans la boîte |
| bas-gauche | 60px | `bevel` | un biais droit de (140, 180) à (200, 240) |

`bevel` remplace le quart de cercle par une ligne droite. `notch` découpe toute la zone du coin en carré, vers l'intérieur de la boîte.

Les rayons de 60px se rejoignent pile au milieu des côtés droit et bas : il n'y reste aucun bout de côté droit, le biais s'arrête là où l'encoche commence.

## Notes de golf

- Aucune couleur de fond : le blanc est le canevas, le prune est l'outline.
- `9in` (864px) est une façon courte de dire « assez grand » : la valeur exacte ne compte pas, du moment que l'outline couvre le canevas.
- `30%35%60` n'a pas besoin d'espace : le `%` termine le nombre.
- Deux mots-clés `corner-shape` couvrent quatre coins, et le rayon 0 change le `notch` en trop en simple coin droit.
- `<style>` n'est jamais fermé.
