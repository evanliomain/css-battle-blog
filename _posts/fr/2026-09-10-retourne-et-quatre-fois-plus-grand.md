---
title: "Retourné et quatre fois plus grand : un cadenas en 118 caractères"
lang: fr
ref: 2026-09-10
permalink: /fr/2026/09/10/retourne-et-quatre-fois-plus-grand/
description: "Comment une seule règle pour html et le body, et une échelle de −4, dessinent la cible CSS Battle du 10 septembre 2026 : un cadenas ouvert gris foncé."
target: /assets/targets/2026-09-10.png
target_url: https://cssbattle.dev/play/YdSTFgl2iKzGCW1ahmEz
colors: ["#ffffff", "#333333"]
player: h_blierzt
chars: 118
score: 729.91
match: 100
code: |
   <style>*{margin:70 150;border-radius:1in 1in 0 0;box-shadow:inset 0 0 0 5vw#333,5vw 8q#FFF;*{margin:125 30 5;scale:-4
---

La cible du 10 septembre est un cadenas ouvert, gris foncé sur blanc : un large corps arrondi en bas, et au-dessus une anse dont le montant gauche s'arrête trop tôt. La solution de H_Bliertz donne à `html` et au `body` la même règle : coins du haut arrondis, une épaisse ombre intérieure et une ombre blanche. Sur `html`, c'est l'anse. Le `body` est petit, mais `scale:-4` le rend quatre fois plus grand et le retourne : le corps du cadenas, avec ses coins ronds en bas. Son ombre blanche se retourne avec lui et efface le bout du montant gauche de l'anse.

Cochez **Couleurs pédagogiques** pour voir l'ombre blanche en rose.

{% include animations/2026-09-10.html lang=page.lang %}

## Le code, aéré

```css
&nbsp;                               /* une vraie espace insécable : 1 caractère */
<style>
* {                                  /* html, puis le body */
  margin: 70 150;
  border-radius: 1in 1in 0 0;        /* coins du haut arrondis */
  box-shadow:
    inset 0 0 0 5vw #333,            /* 20px de gris foncé dedans */
    5vw 8q #FFF;                     /* copie blanche, 20 à droite, 7,56 plus bas */
  * {                                /* le body */
    margin: 125 30 5;
    scale: -4;                       /* quatre fois plus grand, retourné */
  }
}
```

## Comment ça marche

### 1. html : l'anse

`*` donne à `html` `margin:70 150` : il fait 400 − 300 = 100 de large, de x = 150 à 250. Sans doctype, la page est en mode quirks, et `html` prend la hauteur que ses marges laissent : 300 − 140 = 160, de y = 70 à 230.

`border-radius:1in 1in 0 0` arrondit les coins du haut de 96px, trop pour une boîte de 100px de large : Chrome les réduit à 50, et le haut devient un demi-cercle. `html` n'a pas de fond, mais `box-shadow:inset 0 0 0 5vw#333` peint une bande foncée de 20px (5vw, c'est 5 % de 400) le long de son bord, en suivant la courbe : un U renversé avec une barre en bas. C'est l'anse ; son bas sera caché.

### 2. Le body : une petite boîte

Le code commence par une espace insécable, avant `<style>`. Du texte veut dire que le corps de la page a commencé : le `<body>` s'ouvre là et reçoit une ligne de texte. Je l'ai vérifié : sans cette espace, `html` mesure 280 de haut au lieu de 160, et les montants de l'anse dépassent sous le cadenas.

`*` imbriqué donne au `body` `margin:125 30 5`. Dans les 100px de `html`, il fait 100 − 60 = 40 de large, en x = 180, et commence 125 plus bas, en y = 195. En mode quirks, il remplit le reste de `html` moins sa marge basse : 160 − 125 − 5 = 30 de haut. Il reçoit aussi tout ce que donne `*` : son ombre intérieure de 20px remplit toute la boîte de 40 × 30, et ses coins du haut s'arrondissent de 20 (le même `1in`, réduit pour tenir).

### 3. scale:-4 : le corps du cadenas

`scale:-4` applique au `body` une échelle de −4 sur les deux axes, autour de son centre, (200 ; 210). Il devient quatre fois plus grand, 160 × 120, de x = 120 à 280 et de y = 150 à 270, et il fait un demi-tour : ses coins ronds, maintenant de 80px, sont en bas. C'est le corps du cadenas, et il couvre le bas de l'anse.

La seconde ombre du `body`, `5vw 8q#FFF`, est une copie blanche décalée de 20px à droite et de 7,56px vers le bas. L'échelle la retourne et l'agrandit quatre fois aussi : à l'écran, elle part de 80px à gauche et de 30,24px vers le haut, de x = 40 à 200 et de y = 119,76 à 239,76. Elle se peint par-dessus l'anse de `html`, et efface le montant gauche sous y = 119,76 : le cadenas est ouvert.

`html` a lui aussi cette ombre blanche, mais sur le canevas blanc, elle ne se voit pas.

## Notes de golf

- Une seule règle dessine les deux parties : `html` et le `body` partagent le rayon et les deux ombres.
- `scale:-4` agrandit le `body` et le retourne d'un coup : son haut arrondi devient un bas arrondi, et son ombre blanche passe de l'autre côté.
- L'ombre intérieure remplit entièrement le petit `body` : pas besoin de `background`.
- Une ombre blanche efface une partie de l'anse gratuitement.
- L'espace insécable met le `<body>` avant le `<style>`, ce qui garde `html` à la bonne hauteur.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
