---
title: "La même ombre, une police plus grande : une prise en 185 caractères"
lang: fr
ref: 2026-10-16
permalink: /fr/2026/10/16/la-meme-ombre-une-police-plus-grande/
description: "Comment une seule liste d'ombres, partagée par html, body et un h3 à la police plus grande, dessine la cible CSS Battle du 16 octobre 2026, une prise électrique."
target: /assets/targets/2026-10-16.png
target_url: https://cssbattle.dev/play/YPjOurDuyM7W6juGDTKS
colors: ["#f3ead2", "#d96c7b", "#4c455b"]
player: emohdaziz
chars: 185
score: 668.6
match: 100
code: |
  .<h3><style>*{background:#f3ead2;margin:0 175 60%205;box-shadow:90Q 0,-90Q 0,0 20ch;color:D96C7B;*{margin:-50 30 85-30;color:4C455B;*{padding:55 110;margin:-85;border-radius:0 0 2in 2in
---

La cible du 16 octobre ressemble à une prise électrique sur un fond crème : un grand demi-disque violet foncé, à plat en haut, deux paires de barres (violette et rose) qui sortent par le bord haut, et une paire plus courte sous le disque. Mohamed Ali la dessine avec une seule liste de trois ombres, donnée à trois boîtes emboîtées : `html`, `body` et un `h3`. Chaque boîte dessine trois copies d'elle-même. Le `h3` a une police plus grande, son `20ch` est donc plus long, et c'est cette ombre-là qui pose le demi-disque à sa place.

{% include animations/2026-10-16.html lang=page.lang %}

## Le code, aéré

```css
/* avant <style> : un texte "." et un <h3> */
* {                                  /* html */
  background: #f3ead2;
  margin: 0 175 60% 205;
  box-shadow: 90Q 0, -90Q 0, 0 20ch;
  color: D96C7B;                     /* ombres roses */
  * {                                /* body */
    margin: -50 30 85 -30;
    color: 4C455B;                   /* ombres violettes */
    * {                              /* h3 */
      padding: 55 110;
      margin: -85;
      border-radius: 0 0 2in 2in;
    }
  }
}
```

Tous les éléments sont touchés par le `*` extérieur : les trois boîtes reçoivent le fond et les ombres. Les règles imbriquées viennent après, avec le même poids, donc leurs marges l'emportent sur `body` et sur le `h3`.

## Comment ça marche

### 1. html : une boîte de 20 × 60

`margin:0 175 60%205` : une marge en pourcentage se calcule sur la largeur, même en bas, donc 60 % font 240px. `html` fait 400 − 175 − 205 = 20px de large. En mode quirks, celui de CSS Battle, il fait la hauteur de la page moins ses marges : 300 − 240 = 60px. Une boîte de 20 × 60 en (205, 0).

Son fond crème est peint sur tout le canevas, la boîte elle-même ne montre donc rien.

### 2. Les ombres de html : les trois barres roses

Les ombres n'ont pas de couleur, elles prennent donc `color`. En mode quirks, `color` accepte `D96C7B` sans le `#` : du rose.

- `90Q 0` et `-90Q 0` copient la boîte à 85px à droite et à gauche (90Q fait 85,04px) : les barres roses en x 290 et x 120, de y 0 à 60.
- `0 20ch` la copie 160px plus bas : un `ch` fait 8px avec la police par défaut de 16px. C'est la barre rose en x 205, de y 160 à 220.

### 3. body : les mêmes ombres, en violet

Le `*` imbriqué donne au `body` `margin:-50 30 85-30` et `color:4C455B`. Dans le contenu de `html`, large de 20px, ça le place en x 205 − 30 = 175, toujours large de 20px, et 50px au-dessus du canevas.

Sa hauteur vient aussi du mode quirks : `body` s'étire jusqu'au bas de `html` moins sa marge basse. Cette marge vaut 85, mais le `h3` qu'il contient a une marge basse de −85, et les deux fusionnent en 0. `body` finit donc en y = 60, comme `html` : une boîte de 20 × 110, de y −50 à 60.

Les mêmes trois ombres, en violet cette fois : des barres en x 260 et x 90 (seule la partie de y 0 à 60 est sur le canevas), et une en x 175, de y 110 à 220.

### 4. Le point et le h3

Le `.` écrit avant `<h3>` est un nœud texte en haut du `body` : une ligne de 18px de haut, de y −50 à −32, hors du canevas. Il sert à écarter le `h3` du haut du `body`. Sans lui, la marge haute du `h3` fusionnerait avec celle du `body`, et le `h3` finirait 32px plus bas, en y = −85, avec le demi-disque 32px trop bas.

Le `h3` vient sous cette ligne. `margin:-85` ramène son bord gauche en x = 175 − 85 = 90, et `padding:55 110` en fait une boîte de 220 × 110 sans rien dedans (le padding seul est plus large que les 190px laissés par les marges). La marge haute de −85 le remonte en y = −32 − 85 = −117. Il est donc en (90, −117), au-dessus du canevas.

`border-radius:0 0 2in 2in` demande des coins de 192px en bas. Deux coins pareils ne tiennent pas dans 220px, le navigateur les réduit donc à 110px : le bas de la boîte devient un demi-cercle. Le `h3` est un demi-disque crème, hors du canevas.

### 5. La police plus grande du h3 fait descendre le demi-disque

Le `h3` reçoit les mêmes trois ombres, dans le violet hérité du `body`. Mais un titre a une police plus grande : 1,17em, soit 18,72px. Un `ch` y fait environ 9,35px, donc `20ch` fait environ 187px, et non 160.

`0 20ch` fait passer le demi-disque de y −117 à y 70 : c'est le demi-disque de la cible, de y 70 à 180. Il est peint après `html` et `body`, il couvre donc le haut des deux barres du bas, qui ne se voient qu'à partir de y 180. `90Q 0` et `-90Q 0` décalent le `h3` sur les côtés et restent au-dessus du canevas.

## Notes de golf

- Une liste d'ombres, trois boîtes : le rose vient du `color` de `html`, le violet de celui du `body`, et le `h3` en hérite.
- `20ch` donne deux longueurs pour le prix d'une : 160px en 16px, environ 187px dans la police du `h3`.
- `60%205` : un `%` termine le nombre, pas besoin d'espace. 60 % de la largeur, c'est 240px en 3 caractères.
- Un seul `.` coûte 1 caractère et empêche deux marges de fusionner.
- `90Q` fait 85,04px, assez proche de 85 : dans mon rendu local, les bords des barres sortent légèrement mélangés (451 pixels), mais CSS Battle compte la solution comme identique à 100 %.
- `<style>` n'est jamais fermé, les règles imbriquées non plus.
