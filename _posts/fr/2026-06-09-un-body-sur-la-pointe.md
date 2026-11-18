---
title: "Un body sur la pointe : une serrure en 117 caractères"
ref: 2026-06-09
permalink: /fr/2026/06/09/un-body-sur-la-pointe/
description: "Comment un seul radial-gradient dessine trois anneaux sur html, comment un vert presque transparent peint le trou, et comment le même dégradé sur un body tourné découpe l'entaille en V, dans la cible CSS Battle du 9 juin 2026."
target: /assets/targets/2026-06-09.png
target_url: https://cssbattle.dev/play/NQ2Ai87FxvvPrXme8fHQ
colors: ["#4c4c6b", "#4a9a86", "#ebf6f0"]
player: emohdaziz
chars: 117
score: 731.15
match: 100
code: |
   <style>*{*{rotate:45deg;margin:58%3-325}background:radial-gradient(1Q,#6b82 5ch,#4c4c6b 0 74Q,#4a9a86 0 25vw,#ebf6f0
---

La cible du 9 juin ressemble à une serrure : un anneau vert et un anneau violet autour d'un trou pâle, sur un fond vert très pâle, avec une entaille en V ouverte en bas. Mohamed Ali la dessine avec un seul fond pour tous les éléments. Sur html, un radial-gradient dessine les anneaux. body reçoit le même dégradé, mais c'est une grande boîte posée sur la pointe, et seule sa dernière couleur, pâle, atteint le canevas : son coin du haut découpe l'entaille.

Utilisez la **Vue large** pour voir body sous le canevas, avec ses propres anneaux, et les **Couleurs pédagogiques** pour distinguer body du fond.

{% include animations/2026-06-09.html lang=page.lang %}

## Le code, aéré

```css
&nbsp;<style>                         /* une vraie espace insécable : 1 caractère */
* {                                   /* html, head, body, style */
  * {                                 /* * * : head, body, style */
    rotate: 45deg;
    margin: 58%3-325;                 /* 232 en haut, 3 sur les côtés, −325 en bas */
  }
  background: radial-gradient(
    1Q,                               /* taille : un cercle de 0,945px */
    #6b82 5ch,                        /* #66bb88 à 34/255, jusqu'à 40px */
    #4c4c6b 0 74Q,                    /* violet jusqu'à 69,92px */
    #4a9a86 0 25vw,                   /* vert jusqu'à 100px */
    #ebf6f0                           /* vert pâle au-delà */
```

## Comment ça marche

### 1. Les éléments

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, et un nombre seul comme `325` est lu en px.

Le code commence par une espace insécable. Pour le parseur HTML, c'est du texte, pas un blanc : le body s'ouvre là, et le `<style>` finit dedans. La page contient html, head, body et style. head et style ne s'affichent pas.

`*` leur donne à tous le même fond. `*{*{…}}` est une règle imbriquée : `* *`, tout élément qui est dans un autre. C'est head, body et style : la rotation et les marges ne se voient que sur body.

### 2. Des anneaux sur html

En mode quirks, html remplit le canevas : je l'ai mesuré à 400 × 300. Son fond est le radial-gradient, centré sur sa boîte, en (200, 150).

`radial-gradient(1Q, …)` commence par une taille. Une seule longueur donne un cercle, ici de rayon 1Q = 0,945px. Les arrêts de couleur sont aussi des longueurs, mesurées depuis le centre. Ils peuvent aller bien au-delà de ce petit cercle :

- `#6b82` jusqu'à 5ch. Dans la police par défaut, du Times en 16px, 1ch vaut 8px : 5ch = 40px ;
- `#4c4c6b 0 74Q` : le `0` fait commencer le violet là où finit la couleur d'avant, donc le bord est net. Il va jusqu'à 74Q = 74 × 0,945 = 69,92px ;
- `#4a9a86 0 25vw` : du vert, encore avec un bord net, jusqu'à 25 % de 400 = 100px ;
- `#ebf6f0` n'a pas de position. Un dernier arrêt se place à 100 % de la taille du dégradé, ici 1Q. Un arrêt ne peut pas venir avant le précédent : il est repoussé à 100px. Encore un bord net.

Dans mon rendu, le trou finit à 40px, le violet à 70px et le vert à 100px, autour de (200, 150).

### 3. Le trou

`#6b82` est une couleur hexadécimale à quatre chiffres : #66bb88 avec une opacité de 0x22 = 34/255, environ 13 %. Sous le fond de html, le canevas est blanc. 13 % de vert sur du blanc donne (234, 246, 239), et c'est ce que je lis dans mon rendu, dans le trou. La couleur du fond, `#ebf6f0`, vaut (235, 246, 240). À une unité près, le trou a la couleur du fond.

### 4. Une grande boîte body

body reçoit `margin:58%3-325`, trois valeurs : 58 % en haut, 3 sur les côtés, −325 en bas. Une marge en % est une part de la largeur du parent, même en haut : 58 % de 400 = 232.

En mode quirks, body s'étire pour remplir la hauteur de html, moins ses marges : 300 − 232 − (−325) = 393. La marge négative du bas rend body plus haut. Il fait 400 − 2 × 3 = 394 de large. Je l'ai mesuré : 394 × 393 en (3, 232). Son centre est donc en (200, 428,5), sous le canevas.

### 5. Le fond de body

body a le même dégradé, centré sur sa propre boîte : des anneaux autour de (200, 428,5), tous hors du canevas. Le canevas s'arrête en y = 300, à 128,5px de ce centre, plus que 100. Sur le canevas, body ne montre donc que sa dernière couleur, le même vert pâle que le fond.

### 6. Sur la pointe

`rotate:45deg` tourne body autour de son centre. Le coin du haut d'une boîte de 394 × 393 tournée de 45° est au-dessus du centre de la demi-somme de ses côtés divisée par √2 : (394 + 393) / 2√2 = 278,25. Il arrive en 428,5 − 278,25 = 150,25, un quart de pixel sous le centre des anneaux. J'ai mesuré la boîte tournée : son haut est en y = 150,253.

Les deux côtés du haut partent à 45°, à gauche et à droite. Ils forment un angle droit, et body, pâle, couvre les anneaux en dessous : l'entaille en V.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul `background` fait deux choses. Sur html, il dessine les anneaux. Sur body, seule sa dernière couleur atteint le canevas : le même dégradé peint le V pâle.
- L'espace insécable est le premier caractère. Une espace normale, aussi 117 caractères, est supprimée par le parseur, et j'obtiens le même résultat que sans rien (116 caractères) : le `<style>` va dans head et body est vide. Dans mon Chrome, html fait alors 532px de haut au lieu de 300, le centre des anneaux descend en y = 266, et 19 774 pixels changent.
- `1Q` fait du dégradé un cercle en 2 caractères, et place aussi le dernier arrêt à 0,945px, d'où il est repoussé à 100px. Avec `circle` à la place (121 caractères), la dernière couleur a toute sa taille : elle arrive en fondu de 100px jusqu'aux coins, et 96 058 pixels changent. Sans taille du tout (114 caractères), les anneaux deviennent des ellipses : 101 573 pixels changent. Une taille de `0` (116 caractères) peint tout le dégradé de sa dernière couleur : 19 888 pixels changent. `1px` donne la même image en 118 caractères.
- `#6b82` fait 5 caractères. `#ebf6f0` à la place donne la même image en 119 caractères.
- `5ch` et `25vw` valent 40px et 100px avec un caractère de moins chacun : `40px` et `100px` donnent la même image en 118 caractères.
- La règle imbriquée `*{*{…}}` épargne la rotation et les marges à html. Dans la règle du dehors, `*{rotate:45deg;margin:58%3-325;background:…` fait 115 caractères, mais html tourne et reçoit les marges lui aussi : 27 022 pixels changent.
- Le `3` place la pointe. `margin:58%0-325` a la même longueur, mais body fait alors 400 de large et sa pointe monte en y = 148,13 : 213 pixels changent.
- Pas besoin d'espace dans `58%3-325` : après `%` un nouveau nombre commence, et un signe moins aussi. `58% 3 -325` donne la même image en 119 caractères.
- La parenthèse fermante, l'accolade fermante et les balises de fin sont omises. La fin du code les ferme.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 619 pixels, avec la même règle que dans les notes de golf, de 170 au plus. Ils sont tous sur des bords : 87 autour du trou, 158 au bord de l'anneau violet, 243 au bord extérieur de l'anneau vert et 131 le long des deux côtés du V. Les aplats sont identiques. Les bords sont lissés autrement : dans la cible, les bords des anneaux sont lissés ; dans mon rendu, ils sont nets et ce sont les côtés du V qui sont lissés. Le juge de CSS Battle donne au code 100 % de correspondance.
