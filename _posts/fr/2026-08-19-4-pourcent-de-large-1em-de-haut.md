---
title: "4 % de large, 1em de haut : un portail en 132 caractères"
ref: 2026-08-19
permalink: /fr/2026/08/19/4-pourcent-de-large-1em-de-haut/
description: "Comment un seul dégradé radial de 4 % de large et 1em de haut fait un anneau sur html et une haute bande bleue dans le body et un p, qui dessinent ensemble la cible CSS Battle du 19 août 2026 : un portail orange."
target: /assets/targets/2026-08-19.png
target_url: https://cssbattle.dev/play/7qCzNi5UMQyeBSqmMCFG
colors: ["#284a5b", "#e38f66"]
player: h_blierzt
chars: 132
score: 713.68
match: 100
code: |
   <p> <style>*{background:radial-gradient(4%1em,#284A5B 32q,#E38F66 0 5ch,#284A5B)0-95q;*{margin:80 125;*{margin:-140-30 0}font:147q'
---

La cible du 19 août est un portail orange sur fond bleu ardoise : deux piliers à gradins séparés par une ouverture, sous un arc fin. La solution de H_Bliertz écrit un seul dégradé radial pour tous les éléments. Sa taille est `4%1em` : 4 % de la largeur de la boîte, et 1em de haut. Sur `html`, avec une police de 16px, les deux font 16px et le dégradé est un anneau : l'arc. Dans le body et un `p`, avec une police de 138,9px, le même dégradé est étiré plus de 16 fois en hauteur : une bande bleue entre deux côtés orange, l'ouverture entre les piliers.

Cochez **Couleurs pédagogiques** pour distinguer l'anneau, le body et le `p`.

{% include animations/2026-08-19.html lang=page.lang %}

## Le code, aéré

```css
&nbsp;<p>&nbsp;                         /* deux vraies espaces insécables */
<style>
* {                                     /* html, head, body, p, style */
  background:
    radial-gradient(4% 1em,             /* 4 % de la boîte en large, 1em en haut */
      #284A5B 32q,                      /* bleu jusqu'à 30,24px */
      #E38F66 0 5ch,                    /* orange jusqu'à 5ch */
      #284A5B)                          /* puis bleu */
    0 -95q;                             /* remonté de 89,76px */
  * {                                   /* head, body, p, style */
    margin: 80 125;
    * {                                 /* p, style */
      margin: -140 -30 0;
    }
    font: 147q '                        /* 138,9px ; une chaîne vide, fermée par la fin du code */
  }
}
```

## Comment ça marche

### 1. Trois boîtes

Il n'y a pas de doctype : la page est en mode quirks, et les nombres sans unité sont des px. Le code commence par une espace insécable. C'est du texte : le body s'ouvre donc là et reçoit une ligne de texte. Viennent ensuite un `<p>`, une seconde espace insécable dans ce `p`, et le `<style>`, qui se retrouve dans le `p`.

Les éléments sont `html`, `head`, `body`, `p` et `style`. `head` et `style` ne sont pas affichés. Le `*` extérieur les vise tous. Le `*` imbriqué vise tous les éléments placés dans un autre : tout sauf `html`. Le troisième `*` vise les éléments qui ont au moins deux ancêtres : le `p` et le `style`. `html` ne reçoit donc que le fond, le body reçoit le fond, `margin:80 125` et la police, et le `p` reçoit tout cela, avec sa propre marge.

### 2. Une police de 138,9px et deux lignes

`font:147q'` est une police de 147Q : 147 × 0,945 = 138,9px. Le raccourci `font` exige une famille, et `'` ouvre une chaîne que la fin du code referme : un nom de famille vide. J'ai vérifié : avec `Times` à la place, le rendu est le même. Avec `font:147q` seul, la déclaration est ignorée et la police reste à 16px.

Dans mon rendu, une ligne de cette police fait 160px de haut. Le body commence à y = 80, entre x = 125 et 275, et son espace insécable lui donne une première ligne, de y = 80 à 240.

Le `p` vient ensuite, à y = 240. `margin:-140-30 0` le remonte de 140px, à y = 100, et l'élargit de 30px de chaque côté : 150 + 60 = 210px, de x = 95 à 305. Sa propre espace insécable lui donne une ligne de 160px : il finit à y = 260. Le body finit là aussi : 180px de haut. `html` fait 80 + 180 + 80 = 340px de haut.

Les deux espaces doivent être insécables. Une espace normale avant `<p>` est ignorée : le body n'a plus de ligne à lui, et le body et le `p` commencent tous deux à y = −60. Une espace normale dans le `p` disparaît, et le `p` fait 0px de haut.

### 3. Sur html : un anneau

`html` n'est visé que par le `*` extérieur : il garde la police par défaut, 16px. Son dégradé fait `4%` de large : 4 % de 400 = 16px. Il fait `1em` de haut : 16px. La forme est donc un cercle de 16px de rayon.

Les arrêts de couleur peuvent dépasser ce rayon. Le dégradé est bleu jusqu'à `32q`, à 30,24px du centre. L'orange a la position `0`, qui remonte à 30,24px : un bord net. Il dure jusqu'à `5ch`, soit 40px dans cette police. Le dernier bleu n'a pas de position : il devrait se placer au bout du rayon, à 16px, mais un arrêt ne peut pas venir avant le précédent. Il passe donc à 40px, autre bord net. Cela fait un anneau orange de 9,76px.

Le fond de `html` couvre le canevas, mais il se place dans la boîte de `html`, 400 × 340. Le cercle y est centré, en (200 ; 170). `0-95q` le remonte de 95Q = 89,76px : le centre arrive en (200 ; 80,24). J'ai vérifié avec `-89.7638px` à la place de `-95q` : le rendu est le même. Sur un rendu avec le seul fond de `html`, l'anneau couvre les lignes de y = 40 à 119 en x = 200.

La hauteur de `html` compte ici : quand je la force à 300px, l'anneau remonte de 20px.

### 4. Dans le body : une bande

Le body reçoit le même dégradé, mais sa police fait 138,9px. Là, `1em` fait 138,9px de haut, et `4%` vaut 4 % de 150 = 6px de large. La forme est 138,9 / 6 = 23,1 fois plus haute que large.

Les arrêts se mesurent sur la largeur. Le bleu va toujours jusqu'à 30,24px à gauche et à droite du centre. Comme la forme est très haute, ce bleu couvre toute la hauteur du body : une bande de x = 170 à 230. Sur un rendu avec le seul fond du body, cette bande va de x = 170 à 229 sur chaque ligne. `5ch` vaut maintenant 5 × 69,4 = 347,2px, plus que n'importe quel coin de la boîte : tout le reste est orange. Cela donne la marche du haut de chaque pilier, de x = 125 à 170 et de 230 à 275, de y = 80 à 260.

J'ai vérifié : avec `16px` à la place de `1em`, l'anneau est le même, mais la bande change. Avec `40px` à la place de `5ch`, l'anneau est le même, mais il ne reste qu'une bande orange de 10px de chaque pilier, de x = 160 à 169 à gauche. Avec `347.225px`, tout le canevas devient orange autour d'un petit disque bleu.

### 5. Dans le p : la même bande

Le `p` reçoit encore le même dégradé. 4 % de 210 font 8,4px, et 1em fait 138,9px : 16,5 fois plus haut que large. Les arrêts sont des longueurs, pas des pourcentages : le bleu s'arrête toujours à 30,24px du centre. Le `p` est centré en x = 200 comme le body : sa bande couvre les mêmes x = 170 à 230. Ses côtés orange vont de x = 95 à 170 et de 230 à 305, de y = 100 à 260 : la marche du bas de chaque pilier.

### 6. L'empilement

Le `p` est peint sur le body, et le body sur le canevas. Le body commence à y = 80, un quart de pixel au-dessus du centre de l'anneau : il en cache la moitié du bas. Sous y = 80, les jambes de l'anneau tombent sur les côtés orange, et l'intérieur de l'anneau tombe sur la bande bleue. Au-dessus du body, il reste la moitié haute de l'anneau : l'arc, de x = 160 à 240.

## Notes de golf

- Un seul dégradé, écrit une fois, dessine l'anneau et les deux marches. `4%` suit la largeur de chaque boîte et `1em` sa police : le même `4%1em` est un cercle sur `html` et une haute bande dans le body et le `p`.
- `5ch` arrête l'anneau à 40px sur `html`, et dépasse tous les coins dans le body et le `p`.
- `32q` vaut 30,24px en 3 caractères : le rayon intérieur de l'anneau et la demi-largeur de l'ouverture.
- `#E38F66 0` et un dernier arrêt sans position donnent deux bords nets sans écrire deux fois leurs positions.
- Les deux espaces insécables donnent une ligne au body et au `p`. La police fixe cette ligne à 160px : pas besoin de `height`.
- `font:147q'` règle la police avec la famille la plus courte qui soit : une chaîne vide, fermée par la fin du code.
- Pas d'espace dans `4%1em` ni dans `0-95q`, et les signes moins séparent `-140-30 0`.
- Le mode quirks lit `80 125` et `-140-30 0` en px.
- `<style>`, deux des trois accolades et la chaîne ne sont jamais fermés.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire ces lignes), le code officiel ne donne pas exactement la cible. 207 pixels diffèrent, tous sur l'anneau, entre x = 160 et 239 et entre y = 40 et 78. Sur le bord du haut, la ligne y = 40 vaut (180 ; 126 ; 99) dans mon rendu, un mélange d'orange et de bleu, et un orange pur dans la cible. La ligne y = 50 vaut (87 ; 91 ; 94) dans mon rendu et un bleu pur dans la cible. Le plus grand écart est de 187 niveaux, en (193 ; 40). Les piliers et l'ouverture sont sur les mêmes pixels que dans la cible. Sur le juge de CSS Battle, le code est identique à 100 %.
