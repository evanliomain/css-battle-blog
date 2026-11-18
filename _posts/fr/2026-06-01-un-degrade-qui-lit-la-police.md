---
title: "Un dégradé qui lit la police : une croix percée en 148 caractères"
ref: 2026-06-01
permalink: /fr/2026/06/01/un-degrade-qui-lit-la-police/
description: "Comment un seul dégradé radial, lu avec deux polices différentes sur html et body, dessine une croix moutarde aux coins creusés, aux bras arrondis sur les côtés et au trou rond, dans la cible CSS Battle du 1er juin 2026."
target: /assets/targets/2026-06-01.png
target_url: https://cssbattle.dev/play/u8sYQf7PKPxu7IUeUNc6
colors: ["#d19f37", "#fef9ce"]
player: emohdaziz
chars: 148
score: 697.6
match: 100
code: |
  <style>*{background:radial-gradient(1Q,#d19f37 4.1ex,#fef9ce 0 53lh,#d19f37)5ch/40vw;*{margin:70 120;corner-shape:scoop;border-radius:53Q;font:0/1q"
---

La cible du 1er juin montre une croix moutarde sur un fond jaune pâle, avec un trou rond au milieu. Ses quatre coins sont creusés. Les bras du haut et du bas sont droits, ceux de gauche et de droite finissent en demi-disque. Mohamed Ali la dessine avec un seul dégradé radial, donné à html et à body. Ses tailles sont en unités de police, et body reçoit une autre police : sur html, le dégradé peint de petits disques pour les bras des côtés ; sur body, il peint le trou.

Utilisez la **Vue large** pour voir les tuiles de html continuer hors du canevas, avec deux disques de plus.

{% include animations/2026-06-01.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, head, body, style */
  background: radial-gradient(
    1Q,                          /* un cercle de rayon 0,945px */
    #d19f37 4.1ex,               /* html : jusqu'à 29,44px · body : jusqu'à 0 */
    #fef9ce 0 53lh,              /* html : jusqu'à 954px · body : jusqu'à 50,08px */
    #d19f37                      /* à 1Q, ramené à 53lh */
  )5ch/40vw;                     /* x = 40px sur html, 0 sur body ; 160px de large */
  * {                            /* * * : head, body, style (pas html) */
    margin: 70 120;              /* body : 160 × 160 en (120, 70) */
    corner-shape: scoop;         /* les coins se creusent */
    border-radius: 53Q;          /* sur 50,08px */
    font: 0/1q"                  /* 1ex = 1ch = 0, 1lh = 0,945px */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `70` est lu en px.

La page a html, head, body et style. head et style ne sont pas affichés. `*` vise les quatre : ils reçoivent tous le fond. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre. Ce sont head, body et style, mais pas html. La marge, les coins et la police ne vont donc qu'à body.

### 2. Un dégradé en unités de police

`radial-gradient(1Q,…)` commence par une seule longueur : un cercle de ce rayon. 1Q est un quart de millimètre, 0,945px.

Les arrêts vont au-delà de ce rayon. `#d19f37 4.1ex` est moutarde jusqu'à 4.1ex. `#fef9ce 0 53lh` est un jaune pâle avec deux positions. La première, `0`, ne peut pas être avant l'arrêt précédent : elle remonte à 4.1ex, avec un bord net. Le pâle continue jusqu'à 53lh. Le dernier `#d19f37` n'a pas de position. Il se place à 100 % du rayon, donc à 1Q. C'est avant 53lh : il remonte lui aussi à 53lh. Cela donne un second bord net, et du moutarde au-delà.

`ex` est la hauteur d'un petit « x » dans la police de l'élément. `lh` est sa hauteur de ligne. Le même dégradé prend donc d'autres tailles sur un élément qui a une autre police.

### 3. Sur html : de petits disques, tous les 160px

html garde la police par défaut, Times 16px. Dans mon Chrome, 1ex = 7,18px et la hauteur de ligne normale vaut 18px. Donc 4.1ex = 29,44px et 53lh = 954px.

`5ch/40vw` donne la position et la taille. 1ch est la largeur d'un « 0 », ici 8px : 5ch = 40px. 40vw fait 40 % des 400px de large : 160px. La hauteur est auto. Un dégradé n'a pas de taille propre : il prend la hauteur de html, 300px. Seul x est donné, y est donc centré.

J'ai mesuré html : 400 × 300, en (0, 0). Son fond couvre tout le canevas, et la tuile de 160 × 300 se répète. Les tuiles commencent en x = 40, 200, 360, et leurs centres sont en x = 120 et 280 sur le canevas (et en −40 et 440, hors du canevas). Chaque tuile montre un disque moutarde de 29,44px de rayon, sur du pâle. Le pâle va jusqu'à 954px, bien plus loin que les coins de la tuile, à 170px de son centre : le dernier moutarde ne se voit jamais sur html.

### 4. Sur body : le trou

body reçoit `margin:70 120`. En mode quirks, body remplit la hauteur de la page moins ses marges : 300 − 140 = 160. Il fait 400 − 240 = 160 de large. Je l'ai mesuré : 160 × 160, en (120, 70).

body reçoit aussi `font:0/1q"`. Le raccourci font a besoin d'un nom de police. Le `"` ouvre une chaîne, et la fin du code la ferme : un nom vide. La taille de police vaut 0, donc 1ex = 0 et 1ch = 0. La hauteur de ligne vaut 1q, donc 1lh = 0,945px.

Le dégradé se lit alors autrement. 4.1ex = 0 : pas de disque moutarde. Le pâle va de 0 à 53lh = 53 × 0,945 = 50,08px. Moutarde ensuite. 5ch = 0, et 40vw vaut toujours 160px, la largeur de body. body a donc une seule tuile, centrée en (200, 150) : un trou pâle de 50,08px de rayon dans un carré moutarde.

### 5. Des coins creusés

`border-radius:53Q` arrondit chaque coin de body sur 53Q = 50,08px, la même longueur que le rayon du trou. `corner-shape:scoop` tourne la courbe vers l'intérieur. Chaque coin est coupé par un quart de cercle centré sur le coin lui-même.

### 6. Les bras des côtés

body cache la moitié intérieure des deux disques de html. La moitié extérieure dépasse : de x = 90,56 à 120 à gauche, de 280 à 309,44 à droite. C'est pour cela que les bras de gauche et de droite finissent en demi-disque, alors que ceux du haut et du bas restent droits.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- La police fait beaucoup dans `font:0/1q"` : 1ex = 0, 1ch = 0 et 1lh = 0,945px, sur body seulement. Sans `;font:0/1q"` (137 caractères), body garde Times 16px et reçoit l'image de html : tout pâle, avec un petit disque en x = 240. 10 817 pixels changent.
- Le `"` seul est le nom de police le plus court. `1q""` ou `1q a` donnent la même image en 149 caractères.
- `4.1ex` vaut 29,44px sur html et 0 sur body. `29px` (147 caractères) donne à body un disque moutarde au milieu de son trou : 2 716 pixels changent.
- `53lh` vaut 954px sur html et 50,08px sur body. Avec `50px` (148 caractères), le pâle de html s'arrête à 50px et le canevas est moutarde autour : 92 049 pixels changent.
- `5ch` vaut 40px sur html et 0 sur body. Avec `40px` (149 caractères), la tuile de body commence elle aussi 40px plus loin, et le trou part en x = 240 : 7 196 pixels changent.
- `40vw` vaut 160px en 4 caractères. `160px` donne la même image en 149 caractères.
- `1Q` donne un cercle et place le dernier arrêt à 1Q : il remonte à 53lh et donne un bord net. Avec `circle` (152 caractères), le dernier arrêt va au coin le plus loin de la tuile. Sur body, il est à 113px : le trou passe peu à peu au moutarde. 9 976 pixels changent. Sans aucune taille (145 caractères), le dégradé est une ellipse : les disques de html s'allongent en hauteur et le trou de body se fond aussi. 13 894 pixels changent. Avec `0` (147 caractères), mon Chrome peint tout le canevas en moutarde : 107 564 pixels changent.
- Le `0` de `#fef9ce 0 53lh` est la première position la plus courte : il remonte tout seul. `#fef9ce 4.1ex 53lh` donne la même image en 152 caractères. Sans le `0` (146 caractères), le moutarde passe peu à peu au pâle : 106 698 pixels changent.
- Le dernier `#d19f37` peint le moutarde de body. Sans `,#d19f37` (140 caractères), body est tout pâle et il ne reste que les deux demi-disques : 9 989 pixels changent.
- `53Q` vaut 50,08px en 3 caractères, comme le trou. `50px` (149 caractères) change 206 pixels. La casse ne coûte rien : `53q` donne la même image.
- L'imbrication garde la marge, les coins et la police loin de html. `body{` à la place du `*{` intérieur donne la même image en 151 caractères. Avec tout dans une seule règle (146 caractères), html les reçoit aussi : 67 548 pixels changent.
- Des nombres seuls : `70px 120px` donne la même image en 152 caractères.
- `corner-shape:scoop` coûte 19 caractères. Sans lui (129 caractères), les coins sont de simples coins arrondis : 5 974 pixels changent.
- Le code s'arrête au milieu du nom de police. La fin du code ferme la chaîne, la déclaration et les deux règles. Ajouter `"}}` donne la même image en 151 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 598 pixels, avec la même règle que dans les notes de golf, de 151 au plus. Ils sont tous sur les bords courbes : 166 autour du trou, 154 sur les demi-disques des côtés et 278 sur les coins creusés. Les aplats ont les mêmes couleurs. Mon rendu dessine le trou et les demi-disques en marches nettes, avec les deux couleurs seulement. La cible a des nuances intermédiaires à ces endroits. Sur les coins creusés, les deux ont des nuances intermédiaires, mais pas les mêmes. La cible a 42 couleurs en tout, mon rendu 163. Le juge de CSS Battle donne au code 100 % de correspondance.
