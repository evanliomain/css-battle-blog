---
title: "Mêmes ombres, autres unités : un petit arbre en 122 caractères"
lang: fr
ref: 2026-09-09
permalink: /fr/2026/09/09/memes-ombres-autres-unites/
description: "Comment une seule liste de trois ombres en lh et ch dessine des traits fins sur html et de grands carrés sur le body pour la cible CSS Battle du 9 septembre 2026."
target: /assets/targets/2026-09-09.png
target_url: https://cssbattle.dev/play/hvkmKnqoppnQEVdc4GkH
colors: ["#3090c0", "#3b3f58"]
player: eguiluz
chars: 122
score: 725.05
match: 100
code: |
  <style>*{margin:90 115;color:3B3F58;box-shadow:.56lh 11Q,-.56lh 11Q,0 33ch;*{background:#28be;margin:-60 50 90;font:9q/19"
---

La cible du 9 septembre est gris ardoise sur bleu : deux carrés en haut, un carré en bas, et des traits fins qui les relient, comme un petit schéma en arbre. La solution de David Eguiluz écrit trois ombres une seule fois, pour tous les éléments. Sur `html`, elles ne se voient que comme des traits de 10px autour de sa boîte. Sur le `body`, les mêmes ombres sont en `lh` et en `ch`, et la toute petite police du `body`, avec une énorme hauteur de ligne, rend ces unités bien plus grandes : les trois carrés.

Cochez **Couleurs pédagogiques** pour voir les ombres de `html` en orange.

{% include animations/2026-09-09.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                   /* html, puis le body */
  margin: 90 115;
  color: 3B3F58;                      /* un hex sans # passe en mode quirks */
  box-shadow:
    .56lh 11Q,                        /* à droite et en bas */
    -.56lh 11Q,                       /* à gauche et en bas */
    0 33ch;                           /* droit vers le bas */
  * {                                 /* le body */
    background: #28be;                /* passe au canevas */
    margin: -60 50 90;
    font: 9q / 19 "";                 /* police de 8,5px, ligne de 161,5px */
  }
}
```

## Comment ça marche

### 1. Le fond du body, sur le canevas

`*` extérieur vise `html` et le `body` ; `*` imbriqué ne vise que le `body`. Seul le `body` a donc un fond : `#28be`, raccourci de `#2288bbee`, un bleu un peu transparent. Quand `html` n'a pas de fond, c'est le fond du `body` qui sert pour tout le canevas, peint sur du blanc : le bleu de la cible. La boîte du `body` elle-même ne peint alors plus rien.

### 2. Les ombres de html : des traits

`margin:90 115` donne à `html` 170 de large, de x = 115 à 285, et en mode quirks 300 − 180 = 120 de haut, de y = 90 à 210.

`box-shadow` fait trois copies de la boîte, sans couleur, donc de la couleur du texte : `color:3B3F58`, un hex sans `#` que le mode quirks accepte. `lh` est la hauteur de ligne : 18px avec la police par défaut, donc `.56lh` font 10,08. `11Q` font 10,39. `33ch` font 33 × 8 = 264.

La première ombre part de 10,08 à droite et 10,39 vers le bas, la deuxième de 10,08 à gauche et 10,39 vers le bas, la troisième de 264 vers le bas, hors du canevas. Une ombre ne se peint jamais sous sa propre boîte, et la boîte de `html` est vide : il ne dépasse que des bandes de 10px, à gauche (x de 105 à 115), à droite (x de 285 à 295) et en bas (y de 210 à 220,39). Ce sont les traits.

### 3. Les mêmes ombres sur le body

Le `body` a les trois mêmes ombres, mais sa propre police. `font:9q/19"` donne une police de 9q (8,5px) avec une hauteur de ligne de 19 fois la taille : 161,5px. La famille est la chaîne `"`, fermée par la fin de la feuille de style.

Pour le `body`, `.56lh` font donc 0,56 × 161,5 = 90,44, et `ch`, la largeur d'un « 0 » en police de 8,5px, fait 4,25 : `33ch` font 140,25. `11Q` ne change pas : 10,39.

`margin:-60 50 90` place le `body` de x = 165 à 235 et de y = 30 à 120. En mode quirks, il remplit la hauteur de `html` moins ses marges : 120 + 60 − 90 = 90. Ses ombres de 70 × 90 tombent en x = 255,44 et 74,56 pour les deux carrés du haut, 10,39 plus bas, en y = 40,39, et droit vers le bas en y = 170,25 pour le carré du bas. La boîte du `body` elle-même ne peint rien : seules ses ombres se voient.

## Notes de golf

- Une seule liste d'ombres sert deux fois : `lh` et `ch` suivent la police de chaque élément, et les mêmes valeurs donnent de petits décalages sur `html` et de grands sur le `body`.
- `font:9q/19"` règle les deux unités d'un coup : un petit `ch` et un énorme `lh`.
- Une ombre ne se peint jamais sous sa boîte : les trois ombres de `html` ne montrent que leurs bords, qui sont les traits.
- Sans fond sur `html`, le fond du `body` colore le canevas.
- `#28be` est un hex à 4 chiffres avec transparence : sur du blanc, il donne le bleu de la cible.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
