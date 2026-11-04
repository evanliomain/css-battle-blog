---
title: "Une liste d'ombres, deux rôles : une colonne crantée en 157 caractères"
lang: fr
ref: 2026-11-03
permalink: /fr/2026/11/03/une-liste-d-ombres-deux-roles/
description: "Comment quatre box-shadow, partagées par html et un body tourné en 3D, dessinent la cible CSS Battle du 3 novembre 2026 : une colonne à trois encoches."
target: /assets/targets/2026-11-03.png
target_url: https://cssbattle.dev/play/uUqcv42UqXa4qqYW40dd
colors: ["#eed9d9", "#668884"]
player: cubachatou
chars: 157
score: 689.58
match: 100
code: |
  <style>*{background:#EED9D9;color:668884;margin:270 140-260;box-shadow:0-5vw,0-291q 0-37q,0 89q,88q 97q;*{margin:-216 8 460 64;color:EED9D9;rotate:6-1 7 1rad
---

La cible du 3 novembre est une colonne vert-de-gris posée sur un socle plus large, avec trois encoches triangulaires : deux à droite, une à gauche. La solution de Vegy n'a ni dégradé ni découpe. Elle écrit une seule liste de quatre ombres, et `html` comme `body` s'en servent : sur `html` elles dessinent la colonne, sur un `body` tourné en 3D elles creusent les encoches.

Passez en **Vue large** pour voir ce qui se passe hors du canevas, et décochez **Couleurs pédagogiques** pour voir les vraies couleurs.

{% include animations/2026-11-03.html lang=page.lang %}

## Le code, aéré

```css
* {                              /* html, puis body */
  background: #EED9D9;
  color: 668884;                 /* les ombres prennent cette couleur */
  margin: 270 140 -260;
  box-shadow: 0 -5vw, 0 -291q 0 -37q, 0 89q, 88q 97q;
  * {                            /* body (head et style restent cachés) */
    margin: -216 8 460 64;
    color: EED9D9;               /* mêmes ombres, couleur du fond */
    rotate: 6 -1 7 1rad;
  }
}
```

## Comment ça marche

### 1. html, un cadre invisible sous le socle

`margin:270 140-260` place `html` en x 140, y 270, sur 120px de large. CSS Battle tourne en mode quirks, où `html` remplit la hauteur de la page moins ses marges : 300 − 270 + 260 = 290px. Sa boîte va de juste sous le socle jusque loin sous le canevas.

La boîte elle-même ne se voit jamais : le fond de `html` est peint sur tout le canevas. Et une ombre extérieure n'est jamais peinte sous sa propre boîte : les ombres ne se voient que là où elles en dépassent.

### 2. Deux ombres dessinent la colonne

- `0 -5vw` monte une copie de la boîte de 20px. Seule la bande au-dessus de la boîte se voit : le socle de 120×20.
- `0 -291q 0 -37q` rétrécit la copie de 35px de chaque côté (étalement −37q), à 50×220, et la monte de 275px. Elle sort pile sur le socle : la colonne.
- `0 89q` et `88q 97q` descendent. Ce qui dépasse de la boîte tombe sous le canevas : sur `html`, elles ne font rien.

Les ombres n'ont pas de couleur à elles, elles prennent donc `color` : `668884`. En mode quirks, une couleur peut se passer de son `#`.

### 3. body reçoit les mêmes ombres, couleur du fond

`*` touche aussi `body`, qui reçoit le même fond et les mêmes quatre ombres. Sa propre règle change deux choses :

- `margin:-216 8 460 64` en fait une boîte de 48×46 en (204, 54), en haut à droite de la colonne ;
- `color:EED9D9` passe toutes ses ombres dans la couleur du fond.

Tout ce que dessine le `body` efface donc la colonne.

### 4. Une rotation 3D qui finit à plat

`rotate:6-1 7 1rad` tourne le `body` de 1 radian (57°) autour de l'axe 3D (6, −1, 7). Il n'y a pas de perspective, donc le résultat est aplati à l'écran : le rectangle devient un parallélogramme aux bords penchés. Ses ombres tournent avec lui : leurs décalages partent maintenant dans des directions tournées.

Sans la rotation, les encoches seraient de simples rectangles. Les bords en biais viennent uniquement de la rotation 3D.

### 5. Qui fait quoi

| Ombre | Sur `html` | Sur le `body` tourné |
| --- | --- | --- |
| *(la boîte elle-même)* | invisible | encoche du haut |
| `0 -5vw` | le socle | tombe à côté de la colonne, sur le fond |
| `0 -291q 0 -37q` | la colonne | disparaît : −35px d'étalement sur une boîte de 48×46 |
| `0 89q` | sous le canevas | encoche de gauche |
| `88q 97q` | sous le canevas | encoche d'en bas à droite |

## Notes de golf

- Une seule liste d'ombres pour deux éléments : `*` la donne à `html` et à `body`, seule `color` change.
- `color:668884` et `color:EED9D9` : pas besoin de `#` en mode quirks.
- `5vw` fait 20px en 4 caractères ; `q` (un quart de millimètre) donne des décalages fins comme `291q`.
- `6-1 7 1rad` n'a pas besoin d'espace avant le signe moins.
- `<style>` n'est jamais fermé.
