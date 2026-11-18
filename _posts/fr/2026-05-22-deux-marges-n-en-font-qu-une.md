---
title: "Deux marges n'en font qu'une : un H bleu marine en 91 caractères"
ref: 2026-05-22
permalink: /fr/2026/05/22/deux-marges-n-en-font-qu-une/
description: "Comment la bordure de body dessine un cadre crème et deux paragraphes vides, avec une seule règle de marges, deviennent deux barres crème, la seconde remontée au-dessus de la première par la fusion des marges, dans la cible CSS Battle du 22 mai 2026."
target: /assets/targets/2026-05-22.png
target_url: https://cssbattle.dev/play/ZTUaopgqqxcUhB9JGrpS
colors: ["#0d2a58", "#f5e3b5"]
player: emohdaziz
chars: 91
score: 768.03
match: 100
code: |
  <p><p><style>*{background:#0d2a58;*{border:5vw solid#f5e3b5;margin:80 30;*{margin:65 30-174
---

La cible du 22 mai est un rectangle crème sur du bleu marine, avec un large H bleu marine découpé dedans. Mohamed Ali dessine le cadre avec la bordure de body, et les deux barres crème avec deux paragraphes vides. Les deux paragraphes reçoivent les mêmes marges. La marge basse du premier et la marge haute du second fusionnent en une seule marge négative, et la seconde barre passe au-dessus de la première.

Avec les **Couleurs pédagogiques**, la bordure de body et chaque paragraphe ont leur propre couleur.

{% include animations/2026-05-22.html lang=page.lang %}

## Le code, aéré

```css
<p><p><style>               /* deux p dans body, le style dans le second */
* {                         /* html, head, body, p, p, style */
  background: #0d2a58;      /* celui de html passe au canevas */
  * {                       /* head, body, p, p, style */
    border: 5vw solid #f5e3b5;  /* 20px, crème */
    margin: 80 30;          /* body : 340 × 140 en (30, 80) */
    * {                     /* p, p, style */
      margin: 65 30 -174    /* haut 65, côtés 30, bas −174 */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `80` dans une marge est lu en px. Avec un doctype devant (106 caractères), mon Chrome ignore toutes les marges, et 52 560 pixels changent.

Le code commence par `<p><p>`. Un `<p>` ne peut pas contenir un autre paragraphe : le second `<p>` ferme donc le premier. body contient deux p, l'un après l'autre. Le `<style>` vient ensuite et va dans le second p. Il ne s'affiche pas, head non plus.

`*` vise tous les éléments. Le `*{` imbriqué vise tous les éléments placés dans un autre : head, body, les deux p et style. Le troisième niveau vise les éléments placés dans ceux-là : les deux p et style. Les règles ne sont jamais fermées : la fin du code les ferme.

### 2. Un canevas bleu marine

Tous les éléments reçoivent `background:#0d2a58`. Le fond de html ne se peint pas dans sa boîte : il passe au canevas, qui devient bleu marine partout. body peint aussi sa propre boîte en bleu marine, sur le canevas bleu marine. Sans la déclaration `background` (72 caractères), tous les pixels bleu marine deviennent blancs : 85 360 pixels changent.

### 3. body : un cadre crème

body reçoit `margin:80 30`. En mode quirks, body remplit la page moins ses marges : 400 − 60 = 340 de large et 300 − 160 = 140 de haut, en (30, 80).

Il reçoit aussi `border:5vw solid#f5e3b5`. 1vw vaut 1 % des 400px de large : 5vw font 20px. La bordure dessine un cadre crème de x = 30 à 370 et de y = 80 à 220. Dedans, le bleu marine de body va de x = 50 à 350 et de y = 100 à 200.

### 4. Deux paragraphes, deux barres

Les p sont visés par le deuxième niveau aussi : ils reçoivent la même bordure crème de 20px. Le troisième niveau leur donne `margin:65 30-174` : 65 en haut, 30 sur les côtés, −174 en bas.

Chaque p fait 300 − 60 = 240 de large, de x = 80 à 320. Son contenu est vide (le style placé dans le second ne s'affiche pas) : sa boîte de contenu fait 200 × 0. Il ne reste que la bordure : 20 + 20 = 40px de haut, toute crème. Chaque p est une barre crème pleine de 240 × 40.

Le premier p est 65px sous le haut du contenu de body : y = 100 + 65 = 165. Il va jusqu'en y = 205.

### 5. Deux marges n'en font qu'une

Entre les deux p, la marge basse du premier (−174) touche la marge haute du second (65). Des marges verticales qui se touchent fusionnent en une seule. Avec une marge positive et une négative, le résultat est leur somme : 65 + (−174) = −109.

Le second p commence donc 109px au-dessus du bas du premier : y = 205 − 109 = 96. Il va jusqu'en y = 136, au-dessus de la première barre. Avec `65 30` seul, l'écart serait de 65 et la seconde barre serait en y = 270.

### 6. Le H

Les deux barres dépassent un peu sous le cadre : la seconde de y = 96 à 100, la première de y = 200 à 205. C'est du crème sur du crème : rien ne se voit. Ce qui reste du bleu marine de body forme un H :

- deux montants, de x = 50 à 80 et de x = 320 à 350, de y = 100 à 200 ;
- une barre entre les deux barres crème, de x = 80 à 320 et de y = 136 à 165.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Pas de balises fermantes. Le second `<p>` ferme le premier, et rien ne ferme le second. Avec `<p></p><p></p><style>` (99 caractères), l'image est la même.
- Une seule règle de marges pour les deux barres. La première barre utilise la marge haute, la seconde est placée par la marge fusionnée. Avec un seul `<p>` (88 caractères), la barre du haut manque : 8 640 pixels changent.
- C'est le −174 qui déplace la barre. Avec `margin:65 30` (87 caractères), la seconde barre est en y = 270, sous la première. body grandit pour la contenir (315px de haut), son cadre sort du canevas par le bas, et 23 840 pixels changent.
- L'imbrication économise les sélecteurs. Avec trois règles séparées, `*{background:#0d2a58}* *{border:5vw solid#f5e3b5;margin:80 30}* * *{margin:65 30-174` (97 caractères), l'image est la même.
- `5vw` fait 20px en 3 caractères. Avec `20px` (92 caractères), l'image est la même.
- Pas d'espace avant `#f5e3b5`. Avec `solid #f5e3b5` (92 caractères), l'image est la même.
- Des nombres seuls, grâce au mode quirks. `30-174` est lu comme 30 puis −174, sans espace. Avec `30 -174` (92 caractères), l'image est la même. Avec l'unité px, l'espace est nécessaire : `30px-174px` est lu comme un seul nombre, avec l'unité `px-174px`. Mon Chrome ignore alors la déclaration : les p gardent les marges `80 30`, et 16 640 pixels changent (101 caractères). Avec `margin:80px 30px` et `margin:65px 30px -174px` (102 caractères), l'image est la même.
