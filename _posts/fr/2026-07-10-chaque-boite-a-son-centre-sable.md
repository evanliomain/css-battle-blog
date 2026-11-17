---
title: "Chaque boîte a son centre sable : un anneau en trois morceaux en 110 caractères"
ref: 2026-07-10
permalink: /fr/2026/07/10/chaque-boite-a-son-centre-sable/
description: "Comment un seul radial-gradient au rayon de 1Q dessine un anneau bleu au bord extérieur net, comment une dernière couleur translucide devient du sable sur le blanc de la page, et comment body et un p étiré, trop petits pour atteindre le bleu, coupent l'anneau en trois, dans la cible CSS Battle du 10 juillet 2026."
target: /assets/targets/2026-07-10.png
target_url: https://cssbattle.dev/play/roAyjEeXtmG1qITOSiXY
colors: ["#c9a077", "#273e7c"]
player: emohdaziz
chars: 110
score: 740.2
match: 100
code: |
  <p> <style>*{background:radial-gradient(1Q,#c9a077,90Q,#273e7c 0 115px,#b85c);+*{margin:141 45%0;*{scale:9 1.1
---

La cible du 10 juillet est un anneau bleu sur un fond sable, coupé en trois morceaux : une fente à gauche, une à droite et une en bas. Mohamed Ali le dessine avec un seul dégradé radial, donné à tous les éléments. Sur le canevas, il peint l'anneau. body et le p sont trop petits pour atteindre le bleu : sur eux, le même dégradé ne peint que du sable, et ce sable coupe l'anneau.

Cochez **Couleurs pédagogiques** pour voir body en orange et le p en rose.

{% include animations/2026-07-10.html lang=page.lang %}

## Le code, aéré

```css
<p>&nbsp;                        /* une vraie espace insécable : 1 caractère */
<style>
* {                              /* html, head, body, p, style */
  background:
    radial-gradient(1Q,          /* un cercle de 0,945px de rayon */
      #c9a077, 90Q,              /* sable, puis un repère à 85,04px */
      #273e7c 0 115px,           /* bleu de 85,04 à 115px */
      #b85c);                    /* sable à 80 % d'opacité, après 115px */
  + * {                          /* body */
    margin: 141 45%0;            /* 141 en haut, 180 à gauche et à droite, 0 en bas */
    * {                          /* p (et le style caché) */
      scale: 9 1.1               /* 40 × 18 devient 360 × 19,8 */
```

## Comment ça marche

### 1. Un fond pour tous les éléments

Pas de doctype : la page est en mode quirks, et les nombres sans unité sont des px. Le code commence par un `<p>`, puis une espace insécable, puis le `<style>`. Le style se retrouve dans le p. La page a donc html, head, body, le p et le style. head et le style ne sont pas affichés.

Le `*` leur donne à tous le même dégradé. Les règles imbriquées ne changent que les marges de body et la taille du p.

### 2. Un cercle de 1Q de rayon

html est l'élément racine : son fond est peint sur tout le canevas. html fait 400 × 300, donc le dégradé est centré en (200, 150).

`radial-gradient(1Q,` donne la taille du dégradé : une seule longueur, c'est un cercle de ce rayon. 1Q fait 0,945px. Les arrêts de couleur qui suivent sont en px, et une position en px ne dépend pas de la taille du cercle : c'est une distance au centre.

### 3. Du sable, puis du bleu

Le sable part du centre. `90Q` est seul entre deux virgules : c'est un repère de transition, à 85,04px. L'arrêt suivant, `#273e7c 0 115px`, a deux positions. Un arrêt ne peut pas venir avant ce qui le précède : son 0 remonte à 85,04. Le repère tombe pile sur cet arrêt : le sable reste du sable jusqu'à 85,04, et le bleu commence là, avec un bord net. Écrit comme un arrêt, `#c9a077 90Q`, il donne la même image avec les mêmes 110 caractères.

Le bleu continue jusqu'à 115px. L'anneau fait 29,96px d'épaisseur. Il va de x = 85 à 315 et de y = 35 à 265.

### 4. La dernière couleur

`#b85c` n'a pas de position : elle se met à 100 %, la fin du rayon, 0,945px. C'est avant 115px, donc elle passe à 115px. Le bleu s'arrête net, et `#b85c` remplit tout ce qui est au-delà.

`#b85c`, c'est `#bb8855` à 80 % d'opacité. Derrière le canevas, la page est blanche. 80 % de (187, 136, 85) sur du blanc donnent (200,6, 159,8, 119) : le sable du centre, #c9a077, à un cran près. Dans mon rendu, les pixels hors de l'anneau alternent entre #c9a077, #c8a077 et #c89f77.

### 5. body coupe le bas

La règle imbriquée `+*` se lit `* + *` : un élément juste après un autre élément. body vient après head : il est visé. Dans le p, le style est le premier élément : il ne l'est pas.

`margin:141 45%0` : 141 en haut, 45 % à gauche et à droite, 0 en bas. Une marge en pourcentage se compte sur la largeur du bloc conteneur, ici 400px : 45 % font 180px. body fait 40px de large, de x = 180 à 220. getBoundingClientRect donne (180, 141), 40 × 143. En mode quirks, body s'étire vers le bas du canevas. Il s'arrête en y = 284, 16px avant le bas : quand je donne au p une marge basse nulle, body va jusqu'en y = 300.

body a le même dégradé, centré sur sa propre boîte, en (200, 212,5). Ses coins sont à 74,24px de ce centre, avant 85,04 : body est tout sable. Il couvre l'anneau en bas, entre x = 180 et 220.

### 6. Le p, une ligne de 18px

Une espace normale seule dans un bloc disparaît. Une espace insécable, non : le p a une ligne. Avec ma police par défaut (Times, 16px), la ligne fait 18px de haut. Le p fait 40 × 18 en (180, 141). Son centre tombe en (200, 150), le centre du canevas.

Le p a lui aussi le même dégradé. Ses coins sont à 21,93px de son centre : il est tout sable.

### 7. Étiré par scale

Le `*` imbriqué dans `+*` se lit `* + * *` : tout élément placé dans body, donc le p et le style caché. `scale:9 1.1` étire le p autour de son centre : 9 fois plus large, 1,1 fois plus haut. Il devient 360 × 19,8, de x = 20 à 380 et de y = 140,1 à 159,9. Son fond s'étire avec lui et reste tout sable. Il coupe l'anneau à gauche et à droite.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `1Q,` rend le cercle minuscule : le 100 % de la dernière couleur tombe avant 115px et passe à 115px. Le bord extérieur est net. Sans taille (107 caractères), le dégradé est une ellipse qui touche les coins : l'anneau est aplati et le bleu s'estompe vers les coins. 85 708 pixels changent. `circle,` (114 caractères) donne un cercle, mais son rayon va jusqu'au coin le plus loin, à 250px : `#b85c` se place à 250px, et le bleu s'estompe de 115 à 250px. 75 095 pixels changent.
- `90Q` fait 85,04px en 3 caractères. `85px` (111 caractères) change 22 pixels, sur le bord intérieur de l'anneau.
- `#b85c` donne le sable en 5 caractères, grâce à ses 80 % d'opacité sur le blanc de la page. `#c9a077` donne la même image en 112.
- `+*` vise body en 2 caractères. `body` donne la même image en 112. Un simple `*` imbriqué (109 caractères) vise aussi le p : le p reçoit lui aussi les marges, 141 18 0 (45 % des 40px de body). Il fait 4px de large, et 36px une fois étiré. Il reste dans la colonne de body, et les fentes des côtés disparaissent : 1 200 pixels changent.
- `45%0` : 45 % font 180px, et le `%` termine la valeur, donc `0` n'a pas besoin d'espace. `180 0` donne la même image en 111. Le `0` compte : avec `141 45%` (109 caractères), la marge du bas vaut aussi 141, body ne fait que 18px de haut, et la fente du bas disparaît. 1 208 pixels changent.
- L'espace insécable fait 1 caractère et donne au p sa ligne de 18px. Avec une espace normale (110 caractères), le p fait 0px de haut et les fentes des côtés disparaissent. html grandit aussi jusqu'à 441px de haut : l'anneau descend, centré en y = 220,5. 26 454 pixels changent.
- `scale:9 1.1` fait du p de 40 × 18 la barre de 360 × 19,8. Sans lui (96 caractères), 1 200 pixels changent : les fentes des côtés disparaissent.
- Rien n'est fermé. `}}}</style>` à la fin donne 121 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, le code officiel ne colle pas pixel pour pixel à la cible. test.sh trouve 87 pixels faux sur deux bords droits, y = 140 et y = 159 : le p étiré va de 140,1 à 159,9, et dans la cible les fentes des côtés vont de 140 à 160. Avec `scale:9 1.1112` (113 caractères), la barre fait 20px de haut et ces 87 pixels disparaissent. test.sh trouve aussi 495 pixels sur les courbes : de près, l'anneau de la cible a des bords adoucis, et mon Chrome peint les bords du dégradé nets, sans mélange. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
