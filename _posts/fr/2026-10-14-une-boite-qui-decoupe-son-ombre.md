---
title: "Une boîte qui découpe sa propre ombre : un débardeur en 136 caractères"
lang: fr
ref: 2026-10-14
permalink: /fr/2026/10/14/une-boite-qui-decoupe-son-ombre/
description: "Comment une boîte html zoomée, deux ombres et un body arrondi dessinent la cible CSS Battle du 14 octobre 2026, un débardeur."
target: /assets/targets/2026-10-14.png
target_url: https://cssbattle.dev/play/9Jb2WkWC0UuypaJYNpPo
colors: ["#9f6766", "#bde4c1"]
player: benjamintordjman
chars: 136
score: 709.43
match: 100
code: |
  <style>*{background:#9F6766;border-radius:2q;margin:-6 54 30-14;zoom:5;box-shadow:72q 0#9F6766,9mm 6vh 0-2px#BDE4C1;*{margin:0-3.8.8 9.8
---

La cible du 14 octobre est un débardeur vert d'eau sur un fond vieux rose : un corps large, deux bretelles, une encolure en U arrondie entre elles, et deux petites découpes arrondies aux épaules. Benjamin Tordjman la dessine avec `html` et `body`, rien d'autre. Le vert est une ombre de `html`, et chaque découpe est une boîte rose : la boîte de `html` elle-même pour l'épaule gauche, une ombre rose pour la droite, et un `body` arrondi pour l'encolure.

{% include animations/2026-10-14.html lang=page.lang %}

## Le code, aéré

```css
* {                              /* html, puis body */
  background: #9F6766;
  border-radius: 2q;
  margin: -6 54 30 -14;
  zoom: 5;                       /* html ×5, body ×25 */
  box-shadow:
    72q 0 #9F6766,               /* au-dessus : la découpe droite */
    9mm 6vh 0 -2px #BDE4C1;      /* dessous : la forme verte */
  * {                            /* body (head reste caché) */
    margin: 0 -3.8 .8 9.8;
  }
}
```

## Comment ça marche

### 1. html, cinq fois plus grand et presque hors du canevas

`zoom:5` multiplie toutes les longueurs de `html` par 5. Ses marges deviennent −30, 270, 150 et −70, et son rayon de 2q (1,89px) passe à 9,45px.

En mode quirks, celui de CSS Battle, `html` fait la hauteur de la page moins ses marges. Ça donne une boîte de 400 − 270 + 70 = 200 sur 300 + 30 − 150 = 180, en (−70, −30). Seul son coin bas droit est sur le canevas, jusqu'en (130, 150).

Le fond de `html` est peint sur tout le canevas, donc la boîte elle-même ne montre rien. Mais elle est toujours là, et elle compte pour les ombres.

### 2. L'ombre verte, et l'épaule gauche

`9mm 6vh 0 -2px` donne, après le zoom, un décalage de 170,08px vers la droite et de 90px vers le bas (6vh fait 18px), avec un étalement de −10px. La boîte de 200 × 180 rétrécit à 180 × 160 et se pose en (110, 70) : tout le débardeur.

Ses coins sont carrés : le rayon d'une ombre vaut le rayon de la boîte plus l'étalement, et 9,45 − 10 passe sous zéro.

Une ombre extérieure n'est jamais peinte sous sa propre boîte. Le coin bas droit de la boîte de `html` est en (130, 150), en plein sur le vert : le vert manque donc au-dessus et à gauche de ce point. C'est la découpe gauche, et comme le coin de `html` est arrondi, celui de la découpe l'est aussi.

### 3. L'ombre rose, et l'épaule droite

`72q 0` décale une copie de la boîte de 340,16px vers la droite (72q fait 68,03px, ×5), dans la couleur du fond. Elle couvre x de 270 à 470 et y de −30 à 150. Les ombres sont peintes dans l'ordre inverse : la première de la liste passe par-dessus la verte, et cache le vert au-dessus de y 150 et à droite de x 270. Son coin bas gauche est arrondi lui aussi. C'est la découpe droite, le miroir de la gauche.

### 4. body, vingt-cinq fois plus grand

`*` touche aussi `body`, qui reçoit `zoom:5` en plus de celui de `html` : ×25. La règle imbriquée lui donne `margin:0-3.8.8 9.8`, qui se lit `0 -3.8 .8 9.8`, soit 0, −95, 20 et 245 après le zoom.

- Largeur : 200 − 245 + 95 = 50px, de x 175 à 225.
- Hauteur : en mode quirks, `body` s'étire à la hauteur de `html` moins ses marges : 180 − 20 = 160px, de y −30 à 130.

### 5. Un rayon trop grand pour la boîte : le U

Sur `body`, `2q` devient 47,25px. Deux rayons comme ça ne tiennent pas dans une boîte de 50px de large, alors le navigateur les réduit tous jusqu'à ce qu'ils tiennent : 25px. Le bas de la boîte devient un demi-cercle, et le haut est hors du canevas. `body` a le fond rose, peint par-dessus les ombres de `html` : c'est l'encolure.

`body` reçoit aussi les deux ombres, mais à ×25 elles partent à 1700px et 850px. Elles n'atteignent jamais le canevas.

## Notes de golf

- Une seule règle pour les deux éléments : le zoom monte à ×25 sur `body`, ce qui transforme le même petit rayon en demi-cercle.
- La découpe gauche ne coûte rien : c'est la boîte de l'ombre, cachée sous elle-même.
- `72q` et `9mm` font 340,16 et 170,08px après le zoom, un cheveu à côté de 340 et 170, et 2 caractères de moins que `68px` et `34px`. CSS Battle compte la solution comme identique à 100 %.
- `0-3.8.8 9.8` : les nombres se collent. Un signe moins termine un nombre, un deuxième point aussi.
- `6vh` fait 18px en 3 caractères.
- `<style>` n'est jamais fermé.
