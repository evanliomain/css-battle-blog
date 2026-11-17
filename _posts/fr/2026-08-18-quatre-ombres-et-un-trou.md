---
title: "Quatre ombres et un trou : un H en 125 caractères"
ref: 2026-08-18
permalink: /fr/2026/08/18/quatre-ombres-et-un-trou/
description: "Comment un body de 40 × 40 et quatre ombres box-shadow dessinent la cible CSS Battle du 18 août 2026, un H sombre à l'intérieur jaune, et pourquoi la boîte vide du body fait l'encoche du haut."
target: /assets/targets/2026-08-18.png
target_url: https://cssbattle.dev/play/OqjzeCZTtlVTfqqvKCRg
colors: ["#51a499", "#282828", "#eac049"]
player: emohdaziz
chars: 125
score: 721.52
match: 100
code: |
  <body bgcolor=51a499 text=eac049 style=margin:50+45%210;box-shadow:0+40vw#51a499,0+5vw+0+5vw,0+35vw+0+5vw,0+5em+0+5em#282828>
---

La cible du 18 août est un H sombre sur fond sarcelle. L'intérieur du H est jaune, avec une encoche sarcelle en haut et en bas. La solution de Mohamed Ali tient en une seule balise `<body>`. Ses marges en font un carré de 40 × 40, et quatre ombres box-shadow copient ce carré, le descendent et l'agrandissent. L'encoche du haut n'est pas dessinée du tout : c'est la boîte du body elle-même, où aucune ombre n'est jamais peinte.

Cochez **Couleurs pédagogiques** pour distinguer les quatre ombres.

{% include animations/2026-08-18.html lang=page.lang %}

## Le code, aéré

```css
<body
  bgcolor=51a499              /* fond #51a499 : il peint tout le canevas */
  text=eac049                 /* couleur du texte #eac049 : pour les ombres sans couleur */
  style=
    margin: 50 +45% 210;      /* 50px en haut, 180px sur les côtés, 210px en bas */
    box-shadow:
      0 +40vw #51a499,        /* 1re, au-dessus : 160px vers le bas, l'encoche du bas */
      0 +5vw 0 +5vw,          /* 2e : 20px vers le bas, 20px d'étalement, jaune */
      0 +35vw 0 +5vw,         /* 3e : 140px vers le bas, 20px d'étalement, jaune */
      0 +5em 0 +5em #282828   /* 4e, tout en dessous : 80px vers le bas, 80px d'étalement */
>
```

## Comment ça marche

### 1. Une balise, en mode quirks

Il n'y a pas de doctype : la page est en mode quirks. Ce code en a besoin pour deux choses. Les nombres sans unité, comme `50` et `210`, sont lus en px. Et le body est étiré sur la hauteur de la fenêtre.

J'ai vérifié avec `<!doctype html>` devant : la marge est ignorée (le body garde ses 8px par défaut), et le body fait 0px de haut.

L'attribut `style` n'a pas de guillemets. Une valeur sans guillemets s'arrête à la première espace : le code n'en a donc aucune. Les `+` les remplacent : `0+40vw` se lit `0` et `+40vw`, c'est-à-dire 40vw avec un signe. Le même code avec des espaces et des guillemets fait 130 caractères et donne le même rendu.

### 2. Un body de 40 × 40

`margin:50+45%210` donne trois valeurs : 50px en haut, 45 % à gauche et à droite, 210px en bas. Une marge en pourcentage se calcule sur la largeur du parent : 45 % de 400 = 180px. Le body fait 400 − 2 × 180 = 40px de large, de x = 180 à 220.

Le body est vide : il n'a pas de hauteur à lui. En mode quirks, il remplit la fenêtre, moins ses marges : 300 − 50 − 210 = 40px. Le body est un carré de 40 × 40 en (180 ; 50). J'ai vérifié : avec `margin:50+45%`, la marge du bas vaut aussi 50px, et le body fait 200px de haut.

### 3. Des couleurs dans les attributs

`bgcolor=51a499` et `text=eac049` sont de vieux attributs HTML. Leur analyseur accepte une couleur hexadécimale sans `#`. `bgcolor` règle le fond du body. `html` n'a pas de fond : le fond du body sert donc pour tout le canevas.

`text` règle la couleur du body : #eac049. Deux des ombres n'ont pas de couleur : elles prennent `currentColor`, c'est-à-dire cette couleur. Sans `text`, ces deux ombres sont noires.

### 4. Quatre ombres, de bas en haut

Une ombre box-shadow est une copie de la boîte, déplacée de ses décalages et agrandie de son étalement de chaque côté. Avec plusieurs ombres, la première est peinte au-dessus et la dernière tout en dessous. Ici, toutes ont un décalage horizontal de 0 : elles restent toutes centrées en x = 200. Les unités : 1vw vaut 4px sur un canevas de 400px de large, et 1em vaut 16px, la taille de police par défaut.

- `0+5em+0+5em#282828`, la dernière : 80px vers le bas, 80px d'étalement. 40 + 2 × 80 = 200 : un carré sombre de (100 ; 50) à (300 ; 250). C'est tout le H.
- `0+35vw+0+5vw` : 140px vers le bas, 20px d'étalement. 40 + 2 × 20 = 80 : un carré jaune de (160 ; 170) à (240 ; 250).
- `0+5vw+0+5vw` : 20px vers le bas, 20px d'étalement : un carré jaune de (160 ; 50) à (240 ; 130).
- `0+40vw#51a499`, la première : 160px vers le bas, sans étalement. Un carré de 40 × 40 couleur du fond, de (180 ; 210) à (220 ; 250), par-dessus le carré jaune du bas : l'encoche du bas.

J'ai rendu chaque ombre seule sur un canevas blanc. Elles couvrent exactement ces rectangles.

### 5. Le trou sous le body

Une ombre box-shadow n'est jamais peinte sous sa propre boîte. La boîte du body va de (180 ; 50) à (220 ; 90). Le carré sombre et le carré jaune du haut la couvrent tous les deux, mais rien d'eux n'y est peint. Seul, le carré jaune du haut fait 4800 pixels : 80 × 80 moins les 40 × 40 du body.

Le body ne peint pas non plus de fond dans cette boîte : son fond est passé au canevas. Le canevas se voit donc à travers, et c'est l'encoche du haut. J'ai vérifié : sans `bgcolor`, le canevas est blanc, et l'encoche du haut aussi.

## Notes de golf

- Une balise, pas de `<style>` : les couleurs sont des attributs et le CSS est dans un `style` sans guillemets.
- Un `+` à la place de chaque espace : il y en a 11. Sans espace dans la valeur, l'attribut n'a pas besoin de guillemets.
- `#51a499` et `#282828` se collent au nombre qui les précède, et `%` termine `45%` : `45%210` n'a pas besoin de séparateur. Avec `180` à la place de `45%`, il faut un `+` avant `210` : 126 caractères.
- La boîte vide du body donne l'encoche du haut gratuitement. Seule l'encoche du bas demande une ombre.
- `text=eac049` (12 caractères avec son espace) colore les deux ombres jaunes. Écrire `#eac049` dans chacune coûte 14 caractères : 127 en tout.
- `bgcolor=51a499` avec son espace fait 15 caractères. `background:#51a499;` dans le style en fait 19 : 129 en tout.
- `5em` vaut 80px en 3 caractères, et il est écrit deux fois. Avec `20vw`, le code ferait 127 caractères.
