---
title: "Une police à zéro : une goutte et un quart de disque en 149 caractères"
lang: fr
ref: 2026-10-28
permalink: /fr/2026/10/28/une-police-a-zero/
description: "Comment une seule règle CSS, partagée par html et body, dessine la cible CSS Battle du 28 octobre 2026 : des rayons trop grands font une goutte, et font:0 change les mêmes rayons en quart de disque."
target: /assets/targets/2026-10-28.png
target_url: https://cssbattle.dev/play/qeaTGocAQsBBgTBIEDEn
colors: ["#dc04", "#30acce", "#1d5260"]
player: benjamintordjman
chars: 149
score: 696.67
match: 100
code: |
  <style>*{background:#dc04;box-shadow:inset 5pc -9ch;color:30ACCE;margin:80 140;border-radius:12em 5pc 9em 9em;*{color:1D5260;margin:0 0 60 40;font:0"
---

La cible du 28 octobre est une goutte bleu clair sur une carte jaune pâle, avec un quart de disque foncé dans son coin haut-droit, comme une épingle sur une carte ou un camembert. Benjamin Tordjman la dessine avec une seule règle, partagée par `html` et `body`, et aucun `background` visible. Les deux formes viennent de la même liste de rayons : sur `body`, `font:0` efface toutes les valeurs écrites en `em`, et il ne reste qu'un quart de disque.

{% include animations/2026-10-28.html lang=page.lang %}

## Le code, aéré

```css
* {                                    /* html, puis body */
  background: #dc04;                   /* html : part sur le canevas */
  box-shadow: inset 5pc -9ch;          /* inset 80px -72px, de la couleur ci-dessous */
  color: 30ACCE;
  margin: 80 140;
  border-radius: 12em 5pc 9em 9em;     /* 192px 80px 144px 144px */
  * {                                  /* body (head et style restent cachés) */
    color: 1D5260;
    margin: 0 0 60 40;
    font: 0 "";                        /* écrit font:0" dans l'original */
  }
}
```

## Comment ça marche

### 1. La couleur du canevas

`*` touche d'abord `html`. Le fond de `html` n'est pas peint dans sa boîte : il part sur tout le canevas. `#dc04` est un jaune à 27 % d'opacité. Sur le blanc de la page, il donne `#f6f1bb`, à un cheveu du `#f7f2bc` de la cible. Ça fait 5 caractères au lieu de 7.

`margin:80 140` laisse à `html` 120px de large. CSS Battle tourne en mode quirks, où `html` remplit la hauteur moins ses marges : 300 − 80 − 80 = 140. La boîte fait donc 120×140, en (140, 80).

### 2. Des rayons trop grands

`12em 5pc 9em 9em`, c'est 192, 80, 144 et 144px avec la police par défaut de 16px. Sur une boîte de 120×140, les deux coins d'un côté ne peuvent pas prendre plus que ce côté. S'ils le font, le navigateur réduit les quatre rayons du même facteur, le plus petit qui fait tout rentrer. Ici, le côté gauche (192 + 144 sur 140px) et le bas (144 + 144 sur 120px) demandent tous deux ×0,417 (5/12). Les coins font donc en vrai 80, 33, 60 et 60px.

Le bas devient un demi-cercle de rayon 60, le haut-gauche une grande courbe de 80px : une goutte.

### 3. Une ombre intérieure comme remplissage

La goutte n'a pas de fond visible, puisqu'il est parti sur le canevas. Elle est remplie par `box-shadow:inset 5pc -9ch`. Une ombre intérieure peint dans la boîte, partout sauf sous une copie de la boîte décalée de l'offset. Ici, la copie part de 80px à droite (5pc) et de 72px vers le haut (9ch : dans la police par défaut de 16px, un `ch` fait 8px).

La copie ne couvre que le haut-droit de la boîte, et elle garde ses coins arrondis. L'ombre remplit donc la goutte, sauf une morsure arrondie en haut à droite, où l'on voit le canevas. L'ombre n'a pas de couleur à elle : elle prend `color`, `30ACCE`. En mode quirks, une couleur peut se passer de son `#`.

### 4. body : la même règle, une autre couleur

`*` touche aussi `body`, qui reçoit le même fond, la même ombre et les mêmes rayons. Sa propre règle ajoute trois choses :

- `margin:0 0 60 40` lui donne 80px de large (120 − 40) et, toujours grâce au mode quirks, 80px de haut (140 − 60). Il se place en (180, 80), en haut à droite de la goutte.
- `color:1D5260` fonce son ombre.
- `font:0"` met sa taille de police à 0.

### 5. font:0 ne garde que le 5pc

Avec une police de taille 0, chaque `em` et chaque `ch` vaut 0. Les rayons `12em 5pc 9em 9em` deviennent `0 80px 0 0` : un seul coin arrondi de 80px sur une boîte de 80×80, un quart de disque centré sur le coin bas-gauche de la boîte, (180, 160). Avec la police normale, la même liste donnerait un carré arrondi.

L'ombre devient `inset 80px 0`. La copie part de 80px à droite, toute la largeur de la boîte : l'ombre la remplit entièrement. Le fond `#dc04` du body est sous l'ombre et ne se voit jamais.

Le quart de disque couvre presque toute la morsure. Il en reste le coin jaune pâle à droite de l'arc, et une fine bande bleu clair tout en haut, entre l'arc et x = 220, là où commence la morsure.

## Notes de golf

- Une liste de rayons, deux formes : les unités sont mélangées exprès, pour que `font:0` ne garde que le `5pc`.
- `font` exige une famille. `"` ouvre une chaîne qui ne se ferme jamais : elle court jusqu'à la fin du code et donne un nom de famille vide. Sans elle, `font:0` est invalide et ignoré.
- `inset 5pc -9ch` peint une forme pleine sans `background` visible, de la couleur de `color`, que chaque élément choisit pour lui.
- `#dc04` sur le blanc de la page remplace les 7 caractères de `#f7f2bc`.
- `color:30ACCE` : pas besoin de `#` en mode quirks. Les unités peuvent aussi sauter : `margin:80 140`.
- `<style>` n'est jamais fermé.
