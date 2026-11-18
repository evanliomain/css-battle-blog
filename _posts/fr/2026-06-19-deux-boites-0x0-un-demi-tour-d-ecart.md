---
title: "Deux boîtes de 0 × 0, un demi-tour d'écart : un X blanc en 117 caractères"
ref: 2026-06-19
permalink: /fr/2026/06/19/deux-boites-0x0-un-demi-tour-d-ecart/
description: "Comment html et body, deux boîtes de 0 × 0 au centre du canevas, reçoivent les deux mêmes ombres box-shadow, et comment rotate et deux scale:-1 placent les copies à un demi-tour d'écart pour dessiner un X blanc entre deux blocs gris, dans la cible CSS Battle du 19 juin 2026."
target: /assets/targets/2026-06-19.png
target_url: https://cssbattle.dev/play/5HntWfntp6RmDVX4hhHs
colors: ["#af6a8a", "#444", "#fff"]
player: emohdaziz
chars: 117
score: 731.15
match: 100
code: |
  <style>&{rotate:45deg;background:#AF6A8A}*{margin:37.5%50%;scale:-1;box-shadow:64q -64q 0 32q#444,32q -32q 0 60px#fff
---

La cible du 19 juin est un X blanc sur un fond mauve, avec un bloc gris foncé à chaque bout : deux losanges blancs qui se chevauchent au milieu, chacun avec un losange gris sur sa pointe extérieure. Mohamed Ali fait de html et de body deux boîtes de 0 × 0 au centre du canevas, et leur donne les deux mêmes ombres : un carré blanc avec un carré gris dans son coin. html est tourné de 45°, et `scale:-1` fait tourner body d'un demi-tour de plus que html : une copie part à gauche, l'autre à droite.

Utilisez les **Couleurs pédagogiques** pour distinguer les ombres de html de celles de body.

{% include animations/2026-06-19.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                    /* hors de toute règle : la racine, html */
  rotate: 45deg;
  background: #AF6A8A; /* couvre tout le canevas */
}
* {                    /* html, head, style, body */
  margin: 37.5% 50%;   /* html : 150px et 200px, 0 × 0 en (200, 150) ; body : 0 */
  scale: -1;           /* un demi-tour, pour html puis encore pour body */
  box-shadow:
    64q -64q 0 32q #444, /* carré de 60,47 × 60,47, au-dessus */
    32q -32q 0 60px #fff /* carré de 120 × 120 */
```

## Comment ça marche

### 1. `&`, c'est html

Au premier niveau, hors de toute règle, `&` désigne la portée de la feuille de style : l'élément racine. Dans mon rendu, html a `rotate: 45deg` et body a `rotate: none`.

Le fond de html s'étend à tout le canevas, et il ne tourne pas avec html : le canevas est mauve.

### 2. html est un point au centre

`*` touche html, head, style et body. head et style sont masqués.

Une marge en % se calcule sur la largeur de la boîte parente, en haut et en bas aussi. Pour html, c'est le canevas de 400px : 37,5 % × 400 = 150px en haut et en bas, 50 % × 400 = 200px à gauche et à droite. html fait 400 − 2 × 200 = 0px de large. Les pages de CSS Battle n'ont pas de doctype, donc elles sont en mode quirks, et html remplit la hauteur du canevas : 300 − 2 × 150 = 0px de haut.

J'ai mesuré html : une boîte de 0 × 0 en (200, 150), le centre du canevas.

### 3. Deux ombres sur une boîte vide

Une ombre box-shadow avec un étalement, c'est la boîte agrandie de l'étalement de chaque côté. Ici la boîte fait 0 × 0, donc chaque ombre est un carré de deux fois l'étalement, centré sur son décalage. L'unité `q` est un quart de millimètre : 32q = 30,24px et 64q = 60,47px.

- `64q -64q 0 32q#444` : un carré #444 de 60,47 × 60,47, centré 60,47px à droite et 60,47px plus haut.
- `32q -32q 0 60px#fff` : un carré blanc de 120 × 120, centré 30,24px à droite et 30,24px plus haut.

La première ombre de la liste est peinte au-dessus. Le carré gris est posé sur le coin extérieur du blanc.

### 4. html est tourné de 225°

`scale:-1` retourne les deux axes, ce qui fait un demi-tour. html est tourné de 45° + 180° = 225° autour de (200, 150).

Les deux carrés deviennent des losanges. Leur coin, qui pointait en haut à droite, pointe maintenant vers la gauche. Le losange blanc est centré en (157,24, 150), et fait 169,71px de large et de haut. Le losange gris est centré en (114,48, 150), de x = 71,72 à 157,24 : sa pointe intérieure est le centre du blanc.

### 5. body fait un demi-tour en sens inverse

body reçoit aussi la marge, `scale:-1` et les ombres. Sa marge en % se calcule sur la largeur de html, 0 : elle vaut 0. body est donc aussi une boîte de 0 × 0 en (200, 150).

body est dans html, donc il tourne avec html. Son propre `scale:-1` ajoute un demi-tour : 225° + 180° = 405°, soit 45°. Ses deux losanges sont le reflet de ceux de html, à droite : le blanc centré en (242,76, 150), le gris en (285,52, 150).

Je l'ai vérifié en retirant les ombres d'un élément à la fois : les ombres de html font la moitié gauche, celles de body la moitié droite.

### 6. Le X

Les deux losanges blancs sont à 85,52px l'un de l'autre et font 169,71px de large, donc ils se chevauchent au milieu. Ensemble, ils forment le X. Entre leurs pointes du haut, les bords se croisent en (200, 107,91), et en (200, 192,09) en bas : les deux encoches du X.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres fait les deux moitiés. Elle est donnée à html et à body par `*`, et les retournements placent les copies.
- `&` désigne html en un caractère. `rotate` doit rester sur html seul. Avec `rotate:45deg` déplacé dans `*` (115 caractères), body tourne aussi : il finit tourné de 90° au lieu de 45°, ses ombres sont des carrés droits en bas à droite, et 12 073 pixels changent.
- `scale:-1` est dans `*`, donc html est retourné aussi, mais peu importe : ce qui compte, c'est que body soit à un demi-tour de html. Sans `scale:-1` (108 caractères), les deux copies tombent à droite, l'une sur l'autre, et 11 432 pixels changent.
- La marge est en %. `margin:150 200` marcherait aussi pour html en mode quirks, avec un caractère de moins (116 caractères). Mais body la reçoit aussi : body part en (400, 300), html passe à 150px de haut, et 41 703 pixels changent. En %, la marge de body se calcule sur la largeur nulle de html : 0, gratuitement.
- `37.5%50%` n'a pas besoin d'espace après le `%`, ni `32q#444` et `60px#fff` avant le `#`.
- Le flou est écrit `0` parce que l'étalement est la quatrième valeur.
- `q` est une unité d'une lettre : 64q et 32q font trois caractères chacun. Les mêmes ombres en px avec deux décimales, `60.47px -60.47px 0 30.24px#444,30.24px -30.24px 0 60px#fff`, donnent 137 caractères, et 15 pixels changent.
- Rien n'est fermé. Un `}` à la fin donne la même image en 118 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel est très proche de la cible, mais pas identique : 933 pixels diffèrent de plus de 8 sur un canal, jusqu'à 117. Chacun d'eux touche un bord d'une forme, sur les côtés à 45°. Mon rendu a 37 couleurs différentes, la cible 14. Le juge de CSS Battle donne au code 100 % de correspondance.
