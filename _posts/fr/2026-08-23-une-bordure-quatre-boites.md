---
title: "Une bordure, quatre boîtes : une mallette en 155 caractères"
ref: 2026-08-23
permalink: /fr/2026/08/23/une-bordure-quatre-boites/
description: "Comment une seule bordure noire de 20px, donnée à html, au body, à un dt et à un h1 au texte orange, dessine le contour, la poignée et la barre coupée de la cible CSS Battle du 23 août 2026."
target: /assets/targets/2026-08-23.png
target_url: https://cssbattle.dev/play/JnFr5t4kizJ7EFZtXnVL
colors: ["#f3ac3c"]
player: koda_pig
chars: 155
score: 691.3
match: 100
code: |
  <dt><h1> <style>*{border:5vw solid;margin:75 90;+*{background:#F3AC3C;border-radius:5vw;margin:-50 40 110;*{margin:75-80-150;*{color:F3AC3C;margin:-40 30 8
---

La cible du 23 août est une mallette : un épais contour noir sur fond orange, avec une poignée arrondie sur le dessus et une barre coupée en trois au milieu. koda_pig la dessine avec quatre boîtes imbriquées. `*` leur donne à toutes la même bordure noire de 20px, et des marges placent chacune d'elles. La dernière boîte reçoit un texte orange : sa bordure devient orange et ouvre deux trous dans la barre.

Cochez **Couleurs pédagogiques** pour voir quelle boîte dessine quelle partie : en vraies couleurs, plusieurs bordures se superposent exactement.

{% include animations/2026-08-23.html lang=page.lang %}

## Le code, aéré

```css
<dt><h1> <style>            /* body > dt > h1 ; le h1 contient une espace insécable */
* {                         /* html, head, body, dt, h1, style */
  border: 5vw solid;        /* 20px, couleur du texte : noir */
  margin: 75 90;            /* sans unité : px en mode quirks */
  + * {                     /* * + * : le body, juste après head */
    background: #F3AC3C;    /* sert pour tout le canevas */
    border-radius: 5vw;     /* 20px */
    margin: -50 40 110;
    * {                     /* dt et h1 */
      margin: 75 -80 -150;
      * {                   /* h1 */
        color: F3AC3C;      /* sans # : lu quand même en mode quirks */
        margin: -40 30 8;
      }
    }
  }
}
```

## Comment ça marche

### 1. Une bordure pour tout le monde

Il n'y a pas de doctype : la page est en mode quirks. Le HTML donne `body > dt > h1`, et le `<style>` se retrouve dans le `h1`.

`*` vise tous les éléments. 5vw, c'est 5 % du cadre de 400px : 20px. `solid` n'a pas de couleur : la bordure prend celle du texte, noire par défaut. Les marges n'ont pas d'unité : le mode quirks les lit en px. `head` et `style` ne sont pas affichés : il reste quatre boîtes, `html`, `body`, `dt` et `h1`.

### 2. html : le contour

En mode quirks, `html` s'étire pour remplir le cadre, moins ses marges : 300 − 2 × 75 = 150px de haut, 400 − 2 × 90 = 220px de large. Il va de (90 ; 75) à (310 ; 225), et sa bordure de 20px est le contour de la mallette. Sa boîte de contenu fait 180 × 110, à partir de (110 ; 95).

`html` n'a pas de fond : le navigateur prend celui du body pour tout le canevas. C'est de là que vient l'orange. J'ai vérifié en ajoutant `html{background:red}` : le canevas devient rouge, et le body peint alors sa propre boîte orange.

### 3. body : la poignée

`+*` imbriqué dans `*` se lit `* + *` : un élément juste après un autre élément. Seul le `body` est dans ce cas, juste après `head`.

En mode quirks, le body s'étire lui aussi : sa boîte de marge remplit la boîte de contenu de `html`, haute de 110px. Avec des marges de −50 en haut et de 110 en bas, le body fait 110 + 50 − 110 = 50px de haut. Il fait 180 − 2 × 40 = 100px de large. Il va donc de (150 ; 45) à (250 ; 95).

`border-radius:5vw` arrondit ses coins extérieurs de 20px. Les coins intérieurs restent carrés : le rayon ne dépasse pas la bordure de 20px. La bordure du bas, de y = 75 à 95, se pose exactement sur la bordure du haut de `html`. Ce qui se voit, c'est la poignée, avec une ouverture de 60 × 10 de (170 ; 65) à (230 ; 75). L'ouverture est orange : le fond du body est parti sur le canevas, et sa boîte ne peint rien.

### 4. dt : la barre du milieu

Le `*` imbriqué suivant vise ce qui est dans le body : le `dt`, le `h1` (et le `style` caché).

Le dt part de la boîte de contenu du body : 60px de large, à x = 170 et y = 65. `margin:75-80-150` le descend de 75px : sa bordure du haut commence à y = 140. Les marges de −80px sur les côtés l'élargissent : 60 + 2 × 80 = 220px, de x = 90 à 310, comme `html`. Il fait 85px de haut (c'est le h1 qui le décide, voir plus bas) : il finit à y = 225. Ses bordures de gauche, de droite et du bas tombent toutes sur la bordure de `html`. Seule sa bordure du haut se voit : la barre, de y = 140 à 160.

Le −150 sert à la hauteur. Le body n'a que 10px de hauteur de contenu. La boîte de marge du dt fait 75 + 85 − 150 = 10px : elle entre. J'ai vérifié avec `margin:75-80`, où la marge du bas vaut 75 elle aussi : le body passe à 275px, `html` à 375px, et le dessin casse.

### 5. h1 : une ligne où rien ne se voit

Le h1 contient un seul caractère : une espace insécable, juste après `<h1>`. Pour le HTML, ce n'est pas un blanc : le h1 a donc une ligne. La police du h1 fait 32px, et sa hauteur de ligne normale vaut 37px dans mon Chrome. Avec ses deux bordures, le h1 fait 77px de haut.

J'ai vérifié avec une espace ordinaire : le h1 n'a plus de ligne, il ne fait que 40px de haut, et le dt tombe à 48px. Une lettre donnerait aussi une ligne, mais elle se verrait. La boîte de contenu du h1 commence à y = 140, pile sur la barre, et le texte est orange. Avec un `x`, le haut de la lettre apparaît en orange sur la barre.

`margin:-40 30 8` place le h1 dans la boîte de contenu du dt, qui commence en (110 ; 160) et fait 180px de large. Le h1 va de x = 140 à 260 et de y = 120 à 197. Sa boîte de marge fait −40 + 77 + 8 = 45px de haut. C'est la hauteur de contenu du dt : le dt fait 45 + 40 = 85px.

### 6. color:F3AC3C : deux trous

La valeur n'a pas de `#`. En mode quirks, Chrome la lit quand même comme une couleur hexadécimale pour `color` : la couleur calculée du h1 vaut rgb(243, 172, 60), l'orange du fond. La bordure n'a pas de couleur à elle : elle devient orange aussi.

La bordure du haut du h1 (y = 120 à 140) et celle du bas (y = 177 à 197) sont sur l'orange de l'intérieur : elles ne se voient pas. Ses bordures de gauche et de droite, de x = 140 à 160 et de 240 à 260, vont de y = 120 à 197 et croisent la barre. Le h1 est peint après le dt : elles coupent la barre en trois, noire du côté gauche jusqu'à x = 140, de 160 à 240, et de 260 jusqu'au côté droit. Sans la déclaration `color`, la bordure du h1 reste noire et dessine un cadre noir au milieu de la mallette.

## Notes de golf

- Une seule déclaration `border` pour quatre boîtes. Seule la bordure du h1 change de couleur, par `color`.
- Le mode quirks fait une bonne part du travail : marges sans unité, hauteurs de `html` et du `body` qui remplissent la place, et couleur hexadécimale sans `#`.
- `+*` dans `*` atteint le body sans le nommer, et les `*` imbriqués atteignent le dt et le h1.
- `margin:75-80-150` n'a pas besoin d'espace devant un signe moins.
- `background` n'est posé que sur le body. Il couvre quand même tout le canevas, parce que `html` n'en a pas.
- L'espace insécable compte pour un caractère. Elle donne au h1 une ligne de 37px sans rien peindre.
- `<dt>`, `<h1>`, `<style>` et les quatre accolades ne sont jamais fermés.

## Si vous l'essayez chez vous

Dans mon Chrome (la version 157 au moment où ces lignes sont écrites), le contour, la poignée et la barre tombent exactement là où la cible les a. Seul l'anticrénelage des deux coins arrondis du haut de la poignée diffère : 70 pixels diffèrent de la cible, tous sur ces deux coins, entre y = 45 et 64. Dans mon rendu, les deux coins sont presque symétriques. Dans la cible, le coin de gauche est un peu plus sombre que celui de droite. Sur le juge de CSS Battle, le code est identique à 100 %.
