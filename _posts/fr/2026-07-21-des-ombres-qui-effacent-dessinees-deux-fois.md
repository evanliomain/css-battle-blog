---
title: "Des ombres qui effacent, dessinées deux fois : une mise en page en 161 caractères"
ref: 2026-07-21
permalink: /fr/2026/07/21/des-ombres-qui-effacent-dessinees-deux-fois/
description: "Comment une seule liste de cinq ombres, dessinée par html puis par un body retourné, fait quatre barres pâles et deux carrés jaunes dans la cible CSS Battle du 21 juillet 2026."
target: /assets/targets/2026-07-21.png
target_url: https://cssbattle.dev/play/3Id7EGx422al80kPP1eQ
colors: ["#4a9a86", "#fae29e", "#ebf6f0"]
player: h_blierzt
chars: 161
score: 686.23
match: 100
code: |
  <style>*{background:#4A9A86;margin:40%290 60-90;box-shadow:5pc 0#FAE29E,55ch 0,7cm 0 0-32q,25pc -32q,75vw 0#EBF6F0;color:4A9A86;*{margin:-100-380 50%380;scale:-1
---

La cible du 21 juillet ressemble à une mise en page : quatre barres pâles et deux carrés jaunes sur un fond vert. La moitié du bas est celle du haut, à l'envers. H_Bliertz la dessine avec une seule liste de cinq ombres, donnée à html et à body. Sur chaque élément, une ombre jaune fait un carré et une ombre blanche fait un bloc. Trois ombres vertes effacent ensuite des morceaux du bloc, et il reste deux barres. body est retourné par `scale:-1` : sa copie du dessin arrive à l'envers, dans l'autre moitié.

Cochez **Couleurs pédagogiques** pour voir les trois ombres vertes qui effacent, et choisissez **Vue large** pour voir html et body, qui dépassent tous les deux du canevas.

{% include animations/2026-07-21.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* tous les éléments : html, puis body */
  background: #4A9A86;           /* le fond de html couvre tout le canevas */
  margin: 40%290 60-90;          /* html : 200 × 80 en (-90, 160) */
  box-shadow:
    5pc 0#FAE29E,                /* 80px à droite : un carré jaune, x = 110 à 190 */
    55ch 0,                      /* 440px à droite, vert : coupe à partir de x = 350 */
    7cm 0 0-32q,                 /* 264,57px à droite, 30,24px plus petite : l'espace */
    25pc -32q,                   /* 400px à droite, 30,24px plus haut : coupe à partir de x = 310 */
    75vw 0#EBF6F0;               /* 300px à droite : un bloc blanc, x = 210 à 410 */
  color: 4A9A86;                 /* la couleur des trois ombres qui n'en ont pas */
  * {                            /* dans html : body */
    margin: -100-380 50%380;     /* body : 200 × 80 en (290, 60) */
    scale: -1                    /* retourné autour de son centre : ombres vers la gauche et le haut */
```

## Comment ça marche

### 1. Deux éléments, une règle

Il n'y a pas de doctype : la page est en mode quirks. La balise style n'est jamais fermée, donc tout ce qui suit `<style>` est du CSS.

`*` vise tous les éléments. Ici, ce sont html, head, la balise style et body : le navigateur ajoute ceux qui manquent. head et style ne sont pas affichés. Le `*{…}` imbriqué veut dire `* *` : tout élément placé dans un autre. C'est body (et encore head et style).

Les deux règles ont la même spécificité, et la règle imbriquée vient après. body prend donc sa marge dans la règle imbriquée. Tout le reste vient de la règle extérieure : le fond, les cinq ombres et la couleur. html et body ont la même liste d'ombres.

### 2. html : une boîte de 200 × 80, surtout hors du canevas

En mode quirks, un nombre sans unité compte en px dans `margin`. Un pourcentage de marge se calcule sur la largeur du bloc parent, 400px : `40%` fait 160px. La marge calculée est `160px 290px 60px -90px`.

En mode quirks, html remplit la fenêtre, moins ses marges. Il fait 400 − 290 + 90 = 200 de large et 300 − 160 − 60 = 80 de haut. getBoundingClientRect donne 200 × 80 en (−90, 160) : la boîte va de x = −90 à 110, et de y = 160 à 240. Plus de la moitié est hors du canevas, à gauche.

Le fond de html est peint sur tout le canevas, quelle que soit la taille de sa boîte. Les 400 × 300 pixels sont d'abord tous verts.

### 3. Un carré jaune et un bloc blanc

Une ombre box-shadow est une copie de la boîte, décalée. Elle n'est jamais peinte sous la boîte elle-même.

- `5pc 0#FAE29E` : 5pc = 80px. La copie jaune va de x = −10 à 190. La boîte de html la cache jusqu'à x = 110, et seule la partie de 110 à 190 se voit : un carré de 80 × 80, de y = 160 à 240.
- `75vw 0#EBF6F0` : 75vw = 300px. La copie blanche va de x = 210 à 410, de y = 160 à 240. Ses 10 derniers pixels sont hors du canevas.

### 4. Trois ombres vertes effacent des morceaux du bloc

`color:4A9A86` règle la couleur du texte. Le mode quirks accepte une couleur hexadécimale sans `#`. Une ombre sans couleur prend celle-ci : les trois ombres du milieu sont du vert du fond.

Les ombres sont peintes dans l'ordre inverse : la première de la liste est au-dessus. La blanche est la dernière, tout en dessous, et les trois vertes la couvrent :

- `55ch 0` : dans la police par défaut (Times en 16px dans mon Chrome), 1ch vaut 8px, donc 55ch font 440px. La copie va de x = 350 à 550. La barre du bas s'arrête en x = 350.
- `25pc -32q` : 25pc = 400px vers la droite, et 32q = 30,24px vers le haut. La copie va de x = 310 à 510, et de y = 129,76 à 209,76. La barre du haut s'arrête en x = 310.
- `7cm 0 0-32q` : 7cm = 264,57px vers la droite, avec un étalement de −32q. Un étalement négatif rétrécit la copie de 30,24px de chaque côté. Elle va de x = 204,80 à 344,33, et de y = 190,24 à 209,76 : l'espace entre les deux barres.

Il reste du bloc blanc une barre de x = 210 à 310 et de y = 160 à 190,24, et une barre de x = 210 à 350 et de y = 209,76 à 240. J'ai vérifié chaque ombre en lui donnant tour à tour une couleur rouge, et en regardant où le rouge se voit.

### 5. body : la boîte de html, retournée

body reçoit `margin:-100-380 50%380`. La marge du bas, 50 %, vaut la moitié de la largeur de html : 100px. La marge calculée est `-100px -380px 100px 380px`.

body part de la boîte de html : x = −90 + 380 = 290 et y = 160 − 100 = 60. Il fait 200 + 380 − 380 = 200 de large. En mode quirks, body remplit aussi la hauteur de html, moins ses propres marges : 80 + 100 − 100 = 80. getBoundingClientRect donne 200 × 80 en (290, 60).

Cette boîte est celle de html, tournée autour du centre du canevas, (200, 150) : x = −90 à 110 devient 290 à 490, et y = 160 à 240 devient 60 à 140. Le fond vert de body est la couleur du canevas : il ne se voit pas.

### 6. scale:-1 envoie les ombres de body de l'autre côté

`scale:-1` multiplie les deux axes par −1, autour du centre de body, (390, 100). La boîte reste en place, mais ses ombres partent maintenant vers la gauche et vers le haut. Les cinq mêmes ombres donnent :

- la copie jaune, de x = 210 à 410 ; la boîte de body la cache à partir de x = 290, et il reste un carré, de x = 210 à 290 et de y = 60 à 140 ;
- le bloc blanc, de x = −10 à 190 et de y = 60 à 140 ;
- `55ch 0`, de x = −150 à 50 : la première barre commence en x = 50 ;
- `25pc -32q`, de x = −110 à 90 et de y = 90,24 à 170,24 : la deuxième barre commence en x = 90 ;
- `7cm 0 0-32q`, de x = 55,67 à 195,20 et de y = 90,24 à 109,76 : l'espace.

Tout ce que dessine body est ce que dessine html, tourné autour de (200, 150). Ensemble, ils font toute la cible.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand un de ses canaux bouge de plus de 8.

- Une seule liste d'ombres sert à deux éléments. Le `*` extérieur donne à html et à body le même `box-shadow` de 66 caractères, le même fond et la même couleur. Le `*{` imbriqué coûte 2 caractères et ne règle que ce qui change : la marge de body et le retournement. Une règle à part, `}body{`, donne la même image en 164 caractères. Avec `&` à la place du premier `*` (même longueur), seul html a les ombres : body ne dessine rien, et 13 806 pixels changent.
- `scale:-1` retourne body en 8 caractères. `rotate:180deg` et `rotate:.5turn` donnent la même image, en 166 caractères. Sans `;scale:-1` (152 caractères), les ombres de body partent vers la droite, hors du canevas : toute la moitié du haut manque, et 13 806 pixels changent.
- `color:4A9A86` colore trois ombres d'un coup, sans `#` en mode quirks. Écrire `#4A9A86` dans chacune des trois ombres donne 169 caractères. Sans `color:4A9A86;` (148 caractères), les trois ombres prennent la couleur de texte par défaut, le noir : 20 830 pixels changent.
- Chaque décalage utilise une unité plus courte que px : `5pc` pour 80px, `55ch` pour 440px, `25pc` pour 400px, `75vw` pour 300px. Avec px à la place, le code fait 162 caractères à chaque fois, pour la même image.
- `7cm` vaut 264,57px, pas un nombre rond : l'espace doit seulement rejoindre l'ombre `25pc`, qui commence en x = 310. Avec 7cm, l'espace s'arrête en x = 344,33. `6cm` est aussi court, mais vaut 226,77px : l'espace s'arrête en x = 306,53, un fin trait blanc relie les deux barres, dans chaque moitié, et 230 pixels changent.
- `32q` vaut 30,24px en 3 caractères, là où `30px` en prend 4. La même valeur monte l'ombre `25pc` et rétrécit l'ombre `7cm` : les deux s'arrêtent en y = 209,76, là où commence la barre du bas.
- Un pourcentage n'a pas besoin d'espace après lui : `40%290`, c'est 160px puis 290px. Écrire `160 290` prend un caractère de plus (162), pour la même image. Pareil pour `50%380` et `100 380`. Un signe moins n'a pas besoin d'espace non plus : `60-90`, `-100-380`, `0-32q`.
- Rien n'est fermé. Fermer les deux règles et la balise style avec `}}</style>` donne 171 caractères, 10 de plus, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, 412 pixels diffèrent de la cible de plus de 8 sur un canal. Ils sont tous sur quatre rangées : y = 90, 109, 190 et 209, le long des bords des barres qui donnent sur les espaces. 32q vaut 30,24px, pas 30 : les barres s'arrêtent en y = 90,24 et 190,24, et commencent en 109,76 et 209,76. Dans mon rendu, ces quatre rangées sont en partie blanches, là où la cible est d'un vert uni. Avec `30px` à la place de chaque `32q` (163 caractères), mon rendu est identique à la cible pixel pour pixel. Sur le juge de CSS Battle, le code est identique à 100 %.
