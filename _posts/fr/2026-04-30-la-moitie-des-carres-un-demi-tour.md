---
title: "La moitié des carrés, un demi-tour : un escalier de carrés en 146 caractères"
ref: 2026-04-30
permalink: /fr/2026/04/30/la-moitie-des-carres-un-demi-tour/
description: "Comment une seule liste de cinq ombres, sur html et sur body retourné d'un demi-tour avec scale:-1, dessine dix carrés en escalier diagonal, dans la cible CSS Battle du 30 avril 2026."
target: /assets/targets/2026-04-30.png
target_url: https://cssbattle.dev/play/mptkoSenO5tTuzn8HfYa
colors: ["#394257", "#668884", "#eed9d9"]
player: gunnar
chars: 146
score: 699.48
match: 100
code: |
   <style>*{background:#394257;color:EED9D9;margin:5%35%55%200;box-shadow:0 5em,0 45vw,0 8em#668884,63q 35vw,-45vw 0;*{margin:200 60-200-60;scale:-1
---

La cible du 30 avril est un escalier de carrés de 60px sur un fond bleu nuit. Des carrés rose pâle descendent du coin en haut à gauche jusqu'au coin en bas à droite, et deux d'entre eux sont vert-gris. Gunnar Bittersmann n'en dessine que la moitié : html est un petit carré, et une seule liste de cinq ombres le copie cinq fois. body reçoit la même liste, puis `scale:-1` le fait tourner d'un demi-tour, et ses cinq copies arrivent de l'autre côté du centre du canevas.

**Vue large** montre où vont les copies de body avant le demi-tour. Avec **Couleurs pédagogiques**, les deux boîtes et les copies de body prennent leur propre couleur.

{% include animations/2026-04-30.html lang=page.lang %}

## Le code, aéré

```css
&nbsp;<style>                    /* une vraie espace insécable : 1 caractère */
* {                              /* html, head, style, body */
  background: #394257;           /* bleu nuit, sur chaque élément */
  color: EED9D9;                 /* la couleur des ombres qui n'en ont pas */
  margin: 5%35%55%200;           /* html : 20 140 220 200, donc 60 × 60 en (200, 20) */
  box-shadow:
    0 5em,                       /* 80px plus bas : (200, 100) */
    0 45vw,                      /* 180px plus bas : (200, 200) */
    0 8em#668884,                /* vert, 128px plus bas, sous les deux premières */
    63q 35vw,                    /* 59,53px à droite, 140px plus bas : (259,53, 160) */
    -45vw 0;                     /* 180px à gauche : (20, 20) */
  * {                            /* head, style, body */
    margin: 200 60-200-60;       /* body : 60 × 60 en (140, 220) */
    scale: -1                    /* un demi-tour : les copies de body passent de l'autre côté */
  /* la fin du code ferme les deux règles */
```

## Comment ça marche

### 1. Une espace insécable, deux boîtes

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre nu comme `200` dans une marge se lit en px.

Le code commence par une espace insécable. Ce n'est pas un blanc pour le navigateur : il ouvre body et l'y place, comme du texte. Le `<style>` va lui aussi dans body. `*` vise html, head, style et body. Le `*{` imbriqué vise tout élément placé dans un autre : head, style et body. head et style ne s'affichent pas. Il reste deux boîtes : html et body.

L'espace insécable est un caractère blanc : rien ne se voit. Mais body n'est plus vide, et cela compte (voir les notes de golf).

### 2. html, un carré qu'on ne voit pas

`background:#394257` va à chaque élément. Le fond de html remplit tout le canevas : c'est le bleu nuit.

html reçoit `margin:5%35%55%200`. Un pourcentage de marge se calcule sur la largeur du bloc conteneur, même pour les marges du haut et du bas : 5 % de 400 = 20, 35 % = 140, 55 % = 220. La dernière valeur vaut 200px. Chaque `%` termine son nombre : pas besoin d'espace.

html fait 400 − 140 − 200 = 60 de large. En mode quirks, html remplit la page moins ses marges : 300 − 20 − 220 = 60 de haut. C'est un carré de 60 × 60 en (200, 20). Il a la couleur du fond : on ne le voit pas.

### 3. Cinq copies de html

`color:EED9D9` règle la couleur du texte. Le mode quirks accepte ici une couleur hexadécimale sans son `#`. Une ombre sans couleur prend celle du texte : quatre des cinq ombres sont rose pâle.

Une ombre sans flou est une copie de la boîte, décalée. La taille de police vaut 16px : 5em = 80px et 8em = 128px. 1vw vaut 1 % des 400px de large : 45vw = 180px et 35vw = 140px. 1Q vaut un quart de millimètre, 0,945px : 63q = 59,53px.

- `0 5em` : 80px plus bas, en (200, 100).
- `0 45vw` : 180px plus bas, en (200, 200).
- `0 8em#668884` : en vert, 128px plus bas, en (200, 148).
- `63q 35vw` : 59,53px à droite et 140px plus bas, en (259,53, 160).
- `-45vw 0` : 180px à gauche, en (20, 20).

### 4. La copie verte, dessous

La première ombre de la liste est peinte au-dessus, la dernière tout en bas. La copie verte va de y = 148 à 208. La copie en y = 100 la couvre jusqu'à 160, et celle en y = 200 la couvre à partir de 200. Il reste une bande verte, de y = 160 à 200 : le carré vert de la cible en (200, 160).

### 5. body, un second carré

Le `*` imbriqué donne à body `margin:200 60-200-60` : 200 en haut, 60 à droite, −200 en bas, −60 à gauche. Le `-` commence un nouveau nombre : pas besoin d'espace devant.

body est dans html, large de 60. Avec 60 de marge à droite et −60 à gauche, il fait 60 − 60 + 60 = 60 de large, en x = 200 − 60 = 140. En mode quirks, body remplit la hauteur de html moins ses propres marges : 60 − 200 + 200 = 60 de haut, en y = 20 + 200 = 220. body est un carré de 60 × 60 en (140, 220), lui aussi de la couleur du fond.

Le premier `*` vise aussi body : il a la même liste d'ombres.

### 6. scale:-1, un demi-tour

Le `*` imbriqué donne aussi à body `scale:-1`. Il retourne body sur ses deux axes, autour de son centre (170, 250). Retourner les deux axes, c'est faire un demi-tour. Les ombres tournent avec la boîte : chaque décalage change de signe.

Les copies de body partent donc vers le haut et la gauche, au lieu du bas et de la droite :

- `0 5em` : 80px plus haut, en (140, 140).
- `0 45vw` : 180px plus haut, en (140, 40).
- `0 8em#668884` : en vert, 128px plus haut, en (140, 92). Les copies en y = 40 et y = 140 la couvrent, il ne reste que la bande de y = 100 à 140.
- `63q 35vw` : 59,53px à gauche et 140px plus haut, en (80,47, 80).
- `-45vw 0` : 180px à droite, en (320, 220).

Le centre de html est en (230, 50), celui de body en (170, 250). Les deux sont à 100px de (200, 150), le centre du canevas, de part et d'autre. La moitié de body est donc celle de html, tournée d'un demi-tour autour du centre du canevas. Cinq ombres donnent dix carrés.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste pour deux boîtes. html et body se partagent les cinq ombres, et `scale:-1` envoie les copies de body de l'autre côté. Sans `;scale:-1` (137 caractères), les copies de body partent vers le bas et la gauche : quatre tombent sous le canevas, une est coupée au bord gauche, et 18 000 pixels changent. Avec `rotate:.5turn` à la place (151 caractères), l'image est la même.
- L'espace insécable empêche body d'être vide. Sans elle (145 caractères), mon Chrome donne à html 260 de haut au lieu de 60 : les copies de html deviennent de hautes barres, et 27 600 pixels changent. Une espace normale (146 caractères) ne sert à rien : l'analyseur la supprime, body reste vide, et les mêmes 27 600 pixels changent. Un `.` (146 caractères) garde la mise en page, mais le point se voit dans le carré de body, près de son bord droit : 8 pixels changent.
- `color:EED9D9;` fait 13 caractères et colore quatre ombres. Avec `#EED9D9` dans chacune à la place (161 caractères), l'image est la même. Le `#` absent en économise un de plus : avec `color:#EED9D9` (147 caractères), l'image est la même.
- `5%35%55%200` fait 11 caractères. Avec `20 140 220 200`, 14 caractères (149 en tout), l'image est la même.
- `5em` fait 3 caractères pour 80px. Avec `80px` ou `20vw` (147 caractères), l'image est la même. Un nombre nu ne marche pas dans une ombre : avec `0 80` (145 caractères), mon Chrome rejette toute la liste, il ne reste aucune copie, et 33 600 pixels changent.
- `45vw` fait 4 caractères pour 180px. Avec `180px` (147 caractères), l'image est la même.
- `8em` fait 3 caractères pour 128px. La copie verte n'a qu'à remplir le trou entre les deux copies rose pâle, de y = 160 à 200 pour html et de 100 à 140 pour body. Avec `35vw` (147 caractères), l'image est la même. Avec `7em`, 112px (146 caractères), les copies vertes s'arrêtent trop tôt : deux bandes sombres, de y = 192 à 200 et de y = 100 à 108, et 960 pixels changent. Avec `9em`, 144px (146 caractères), elles vont trop loin : des bandes sombres de y = 160 à 164 et de 136 à 140, et 480 pixels changent.
- L'ordre de la liste compte. Avec l'ombre verte en premier, `0 8em#668884,0 5em,0 45vw` (146 caractères, la même longueur), les copies vertes sont peintes par-dessus les rose pâle : 2 400 pixels changent.
- `63q` fait 3 caractères pour 59,53px, un peu moins que le pas de 60px. Avec `15vw` ou `60px` (147 caractères), 120 pixels changent : les colonnes x = 80 et x = 319, que les copies en 63q ne couvrent qu'à moitié dans mon Chrome. Avec `64q`, 60,47px (146 caractères, la même longueur), 360 pixels changent, sur les bords verticaux des deux copies.
- Pas besoin d'espace avant `#` : `0 8em#668884`. Avec une espace (147 caractères), l'image est la même.
- Le `*` imbriqué atteint body en 1 caractère. Avec `body{` (149 caractères), l'image est la même.
- Le code finit à l'intérieur de deux règles : la fin du code les ferme. Avec `}}` à la fin (148 caractères), l'image est la même.

## Si vous l'essayez chez vous

L'image cible est un JPEG, et ses couleurs sont décalées de 1 par endroits. Dans mon Chrome local (version 157 au moment d'écrire), le code officiel s'en écarte sur 445 pixels de plus de 8 sur une composante. 120 d'entre eux sont les colonnes x = 80 et x = 319 : les deux copies en 63q s'arrêtent là à 0,47px des bords de la cible, et laissent une colonne couverte à moitié. Dans une copie de test avec `15vw` (147 caractères), ces 120 pixels sont identiques à la cible. Les 325 autres sont de petits écarts, de 28 au plus sur une composante, et 293 d'entre eux sont à moins de 3px du bord d'un carré. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
