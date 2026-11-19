---
title: "Trois tuiles et un body étroit : trois disques en 127 caractères"
ref: 2026-04-23
permalink: /fr/2026/04/23/trois-tuiles-et-un-body-etroit/
description: "Comment un seul repli de var() donne à html et à body le même dégradé radial aux couleurs inversées, comment une tuile de 37mm le répète trois fois sur le canevas, et comment un body de 120px ne garde que le disque du milieu, dans la cible CSS Battle du 23 avril 2026."
target: /assets/targets/2026-04-23.png
target_url: https://cssbattle.dev/play/jn4XKDctJyXddKKNPRYj
colors: ["#4a9a86", "#fae29e", "#4c4c6b"]
player: koda_pig
chars: 127
score: 719.23
match: 100
code: |
  <style>*{background:radial-gradient(1q,var(--x,#4A9A86,5vw,#FAE29E)0 53q,#4C4C6B)50%/37mm;margin:0 70;*{--x:#FAE29E,5vw,#4A9A86
---

La cible du 23 avril, ce sont trois disques alignés sur un fond gris-violet. Les deux du bord sont jaunes avec un centre vert ; celui du milieu est vert avec un centre jaune. koda_pig écrit un seul dégradé radial pour html et pour body. Sur html, une tuile de 37mm le répète sur tout le canevas. Sur body, un `var()` inverse ses couleurs, et la boîte de 120px de body ne garde que le disque du milieu.

Avec **Vue large**, les tuiles qui se répètent hors du canevas apparaissent. Avec **Couleurs pédagogiques**, les boîtes, la tuile et le fond propre de body prennent chacun leur couleur.

{% include animations/2026-04-23.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                    /* tous les éléments : html, head, style, body */
  background: radial-gradient(
    1q,                                /* la taille : un cercle de rayon 0,945px */
    var(--x,#4A9A86,5vw,#FAE29E)0 53q, /* html : #4A9A86,5vw,#FAE29E 0 53q */
                                       /* body : #FAE29E,5vw,#4A9A86 0 53q */
    #4C4C6B                            /* sans position : 100 % = 0,945px, repoussé à 53q */
  )50%/37mm;                           /* une tuile de 139,84px de large, centrée sur la boîte */
  margin: 0 70;                        /* 70px à gauche et à droite, sur html et sur body */
  * {                                  /* tout élément dans un autre : tous sauf html */
    --x: #FAE29E,5vw,#4A9A86
/* la fin du code ferme tout */
```

## Comment ça marche

### 1. Deux boîtes, deux marges

`*` vise tous les éléments : html, head, style et body. head et style ne s'affichent pas : il reste deux boîtes, et toutes deux reçoivent le `background` et la `margin`.

Il n'y a pas de doctype : la page est en mode quirks. Là, un `70` sans unité compte comme 70px, et html et body s'étirent sur la hauteur du cadre. getBoundingClientRect donne à html (70, 0), 260 × 300, et à body (140, 0), 120 × 300 : body est dans html, alors la marge de 70px compte deux fois. Les deux boîtes sont centrées sur x = 200.

La marge doit être sur les deux. Avec `margin:0 70` déplacé dans la règle imbriquée (même longueur), html fait 400px de large et body va de 70 à 330. body déborde alors sur les disques du bord, qui prennent en partie les couleurs de body, et 6 112 pixels changent.

### 2. Un `var()`, deux dégradés

Le repli d'un `var()` va de la première virgule à la parenthèse fermante, virgules comprises. Rien ne pose `--x` sur html : il reçoit le repli, et son fond se lit `radial-gradient(1q,#4A9A86,5vw,#FAE29E 0 53q,#4C4C6B)`. Le `*{` imbriqué veut dire `* *` : tous les éléments sauf html. Il pose `--x:#FAE29E,5vw,#4A9A86` sur body, et la même déclaration s'y lit `radial-gradient(1q,#FAE29E,5vw,#4A9A86 0 53q,#4C4C6B)`. getComputedStyle confirme les deux.

### 3. Le cercle de 1q

Une longueur seule en premier argument de `radial-gradient` donne un cercle de ce rayon. `1q` vaut un quart de millimètre : 0,945px. Les arrêts dans d'autres unités ne tiennent pas compte de cette taille : `5vw` vaut 20px (5 % du cadre de 400px), et `53q` vaut 53 × 0,945 = 50,08px.

Sur html, `5vw` est seul entre deux couleurs : c'est un point de transition, là où les deux couleurs se mélangent à moitié. `#FAE29E 0` vient après mais se place avant, alors le 0 passe à 20px. Le point de transition et la couleur suivante sont au même endroit : du vert jusqu'à 20px, puis du jaune, sans fondu. Le jaune va jusqu'à 53q.

`#4C4C6B` n'a pas de position : il se place à 100 % de la taille, 0,945px. Un arrêt ne peut pas se placer avant un arrêt précédent, alors il passe à 50,08px. Le gris-violet commence net au rayon 50,08.

### 4. Une tuile de 37mm

`50%/37mm`, c'est la position et la taille du fond. 37mm valent 37 × 96 / 25,4 = 139,84px. Une seule taille est donnée, donc la hauteur est `auto`, et un dégradé n'a pas de taille propre : la tuile prend toute la hauteur de la boîte, 300px. getComputedStyle donne `139.843px auto`.

`50%` centre la tuile sur la boîte. Sur html, elle va de x = 130,08 à 269,92, avec le disque en (200, 150).

### 5. html la répète

html est la racine : son fond est peint sur tout le canevas, et la tuile se répète tous les 139,84px. Deux copies tombent dans le canevas : de −9,76 à 130,08, et de 269,92 à 409,76. Leurs disques sont centrés en x = 60,16 et 339,84, et vont de 10,08 à 110,24 et de 289,76 à 389,92. Les copies suivantes sont hors du canevas. Une tuile fait déjà 300px de haut, alors les copies au-dessus et au-dessous sont hors du canevas elles aussi : une seule rangée de disques se voit.

### 6. La boîte de body garde un disque

La tuile de body fait aussi 139,84 × 300, centrée sur la boîte de body, dont le centre est encore x = 200. Ses tuiles tombent pile sur celles de html, avec les couleurs inversées. Mais un fond s'arrête au bord de sa boîte, et body ne va que de 140 à 260. Le disque du milieu, de 149,92 à 250,08, y tient. Les disques suivants de body finiraient à 110,24 et commenceraient à 289,76 : ils restent dehors. Autour du disque du milieu, le gris-violet de body tombe sur celui de html, et ses bords ne se voient pas.

Sans la marge (115 caractères), body garde sa marge de 8px par défaut et fait 384px de large. Ses tuiles couvrent les trois disques, les trois deviennent verts avec un centre jaune, et 16 000 pixels changent.

Mon rendu compte 96 136 pixels gris-violet, 14 232 jaunes et 9 072 verts. Les 560 autres sont sur les bords des disques.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule déclaration `background` sert aux deux boîtes : le repli contient trois morceaux du dégradé de html, `#4A9A86,5vw,#FAE29E`, et body les remplace par `#FAE29E,5vw,#4A9A86`. Avec deux dégradés écrits en entier, `<style>*{background:radial-gradient(1q,#4A9A86,5vw,#FAE29E 0 53q,#4C4C6B)50%/37mm;margin:0 70;*{background:radial-gradient(1q,#FAE29E,5vw,#4A9A86 0 53q,#4C4C6B)50%/37mm` (168 caractères), l'image est la même.
- `1q,` fait du dégradé un cercle et rend 100 % minuscule : la dernière couleur n'a pas besoin de position. Avec `circle,` (131 caractères), 100 % est le coin le plus loin de la tuile, à 165,5px : le jaune se fond dans le gris-violet jusqu'aux coins de chaque tuile, et 95 700 pixels changent. Sans taille du tout (124 caractères), les disques deviennent de hauts ovales qui se fondent eux aussi jusqu'aux coins, et 100 984 pixels changent.
- `5vw` fait 20px en 3 caractères. Avec `20px` deux fois (129 caractères), l'image est la même.
- `53q` fait 50,08px en 3 caractères. Avec `50px` (128 caractères), 132 pixels changent, tous à moins de 0,85px du bord d'un disque.
- `37mm` fait 139,84px en 4 caractères. Avec `140px` (128 caractères), 584 pixels changent, tous à moins de 0,84px du bord d'un disque.
- Le `0` après la `)` fait deux choses : il ouvre la bande de la deuxième couleur, et il passe au point de transition. Sans lui (125 caractères), la couleur du centre se fond dans celle de l'anneau jusqu'au rayon 50,08, et 20 832 pixels changent.
- Le `70` sans unité ne marche qu'en mode quirks. Avec `70px` (129 caractères), l'image est la même.
- Pas d'espace entre `)` et `0`, ni entre `)` et `50%`. Avec `) 0` (128 caractères), l'image est la même.
- Le `*{` imbriqué est le plus court pour viser body sans html. Avec `}body{` à sa place (131 caractères), l'image est la même.
- Le mode quirks fait deux choses ici. Avec `<!doctype html>` devant (142 caractères), la marge sans unité est ignorée, html ne fait que 8px de haut et body 0px. Les tuiles de 8px de html se répètent sur la hauteur du canevas et dessinent des bandes verticales, et 77 788 pixels changent.
- Les règles et le `<style>` ne sont jamais fermés. Avec `}}` à la fin (129 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment de l'écriture), le code officiel dessine les trois mêmes disques au même endroit que la cible, mais 1 028 pixels diffèrent de plus de 8 niveaux. Tous sont à moins de 1,06px du bord d'un disque. Le plus grand écart est de 176 niveaux, en (55, 130), sur le bord du centre vert du disque de gauche : jaune dans mon rendu, vert dans la cible. Sur la ligne du milieu, le disque de gauche de la cible commence net en x = 10 ; dans mon rendu, ce pixel est un mélange, (211, 192, 147). Dans mon Chrome, les disques du bord sont centrés en 60,16 et 339,84, avec un rayon de 50,08. Avec `140px` et `50px` à la place de `37mm` et `53q` (129 caractères), les colonnes x = 10 et 289 correspondent à la cible, et il reste 677 pixels, tous à moins de 0,58px du bord d'un disque. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
