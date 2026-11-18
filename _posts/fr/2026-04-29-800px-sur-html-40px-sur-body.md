---
title: "800px sur html, 40px sur body : des lunettes 3D en 171 caractères"
ref: 2026-04-29
permalink: /fr/2026/04/29/800px-sur-html-40px-sur-body/
description: "Comment un seul fond, fait d'un dégradé radial et d'un dégradé conique, donné à html et à body, dessine des lunettes 3D : une police de 0,8px fait passer le 50em de body à 40px, quand celui de html reste à 800px, dans la cible CSS Battle du 29 avril 2026."
target: /assets/targets/2026-04-29.png
target_url: https://cssbattle.dev/play/kiTJEWkAtBIFyjQqVDNA
colors: ["#e3dcd1", "#0d2a58", "#5cf2f7", "#d95f5b"]
player: wi328v9RQHXQ73SxzWKIKa6m6jg1
chars: 171
score: 678.39
match: 100
code: |
  <style>*{background:radial-gradient(1q at bottom,#E3DCD1 50em,#0D2A58 0 74q,#0000),conic-gradient(#5CF2F7 50%,#D95F5B 0)50%/70vw 57%space#0D2A58;*{margin:30%30 40;font:5%'
---

La cible du 29 avril est une paire de lunettes 3D sur un fond beige : une monture bleu marine, un verre rouge à gauche, un verre cyan à droite, et une échancrure en demi-disque en bas pour le nez. James Whitehead donne le même fond à html et à body : un dégradé radial au-dessus d'un dégradé conique. Sur html, il est beige partout. Sur body, une toute petite police fait passer le même `50em` de 800px à 40px, et le dégradé radial devient l'échancrure et son anneau bleu marine.

Avec **Couleurs pédagogiques**, les boîtes, la tuile conique et les deux parties du cercle radial prennent leur propre couleur.

{% include animations/2026-04-29.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                      /* html, head, style, body */
  background:
    radial-gradient(1q at bottom,        /* un cercle, centré au milieu du bord du bas */
      #E3DCD1 50em,                      /* beige jusqu'à 50em : 800px sur html, 40px sur body */
      #0D2A58 0 74q,                     /* puis bleu marine, jusqu'à 69,92px */
      #0000),                            /* puis transparent */
    conic-gradient(#5CF2F7 50%,#D95F5B 0) /* moitié droite cyan, moitié gauche rouge */
      50%/70vw 57%space                  /* une seule tuile de 280 × 79,8, centrée */
    #0D2A58;                             /* bleu marine, sous les deux dégradés */
  * {                                    /* head, style, body */
    margin: 30%30 40;                    /* body : 340 × 140 en (30, 120) */
    font: 5%'                            /* 0,8px, et un nom de police vide */
  /* la fin du code ferme la chaîne et les deux règles */
```

## Comment ça marche

### 1. Deux boîtes, un seul fond

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre sans unité comme `30` dans une marge est lu en px.

`*` vise html, head, style et body. Le `*{` imbriqué vise chaque élément placé dans un autre : head, style et body. head et style ne sont pas affichés. Il reste deux boîtes, html et body, et elles reçoivent le même `background`.

Ce fond a trois couches. La première est peinte au-dessus : le dégradé radial. Dessous, le dégradé conique. Tout en bas, la couleur `#0D2A58`.

### 2. html : beige partout

Le dégradé radial est un cercle, beige jusqu'à `50em`. Un em vaut la taille de police de l'élément, et html garde celle par défaut, 16px. Sur html, 50em = 800px. Tout le canevas est à moins de 800px du centre du cercle : la couche radiale de html est beige partout, et elle cache les deux couches du dessous.

L'arrêt bleu marine, `74q`, vaut 69,92px, moins que 800px : sur html, la bande bleu marine n'a aucune largeur. Dans mon Chrome, le fond calculé de html montre l'arrêt à 800px.

Le fond de html peint tout le canevas : il est beige.

### 3. body : la monture

Le `*` imbriqué donne à body `margin:30%30 40`. Avec trois valeurs, la première est le haut, la deuxième la droite et la gauche, la troisième le bas. Une marge en pourcentage se calcule sur la largeur du bloc conteneur, même pour la marge du haut : 30 % de 400 = 120. Le `%` termine le nombre : pas besoin d'espace avant `30`.

body fait 400 − 30 − 30 = 340 de large. En mode quirks, body remplit la hauteur de la page moins ses marges : 300 − 120 − 40 = 140 de haut. C'est une boîte de 340 × 140 en (30, 120).

Partout où les deux dégradés laissent un vide, la couleur de fond de body se voit : le bleu marine `#0D2A58` fait la monture.

### 4. La tuile conique : les verres

Le dégradé conique a sa propre position et sa propre taille : `50%/70vw 57%`. 1vw vaut 1 % des 400px de large : 70vw = 280px. La hauteur fait 57 % des 140px de body : 79,8px.

`space` ne répète que des tuiles entières et les espace. 280 tient une fois dans 340, et 79,8 une fois dans 140 : il n'y a qu'une tuile, et dans ce cas la position la place. `50%`, une seule valeur, vaut pour les deux axes et centre la tuile : à 30px des bords gauche et droit, donc de x = 60 à 340, et à (140 − 79,8) / 2 = 30,1px du haut et du bas. Le reste de body n'est pas couvert : le bleu marine se voit autour de la tuile.

Un dégradé conique part du haut et tourne dans le sens horaire autour du centre de sa tuile, ici x = 200. `#5CF2F7 50%` remplit la première moitié, à droite, en cyan. `#D95F5B 0` : un arrêt ne peut pas revenir en arrière, alors le 0 est ramené à 50 %, et le rouge remplit la seconde moitié, à gauche, avec un bord net entre les deux.

### 5. font:5%' : un em de 0,8px

Le `*` imbriqué donne aussi `font:5%'` à body. Une taille de police en pourcentage se calcule sur celle du parent : 5 % des 16px de html = 0,8px.

Le raccourci `font` exige un nom de police. L'apostrophe `'` ouvre une chaîne, et le code se termine avant qu'elle soit fermée : la fin de la feuille de style la ferme. Le nom est une chaîne vide, et mon Chrome l'accepte : la famille de police calculée de body est `""`.

Sur body, 1em = 0,8px et 50em = 40px. Dans mon Chrome, le fond calculé de body montre l'arrêt à 40px, et celui de html montre toujours 800px. La taille de police calculée affiche elle-même 6px, mais les longueurs en em du dégradé utilisent 0,8px.

### 6. Le cercle radial : l'échancrure et l'anneau

`1q at bottom` est un cercle, centré au milieu du bord du bas de body : (200, 260). Une seule longueur donne un cercle, et ici il est minuscule : 1Q vaut un quart de millimètre, 0,945px. Les arrêts donnés en px marchent quand même au-delà de cette taille.

- `#E3DCD1 50em` : beige jusqu'à 40px. C'est l'échancrure, de x = 160 à 240 en bas de la monture.
- `#0D2A58 0 74q` : 0 est plus petit que 40px, il est donc ramené à 40px. Le bleu marine va de 40px à 74 × 0,945 = 69,92px : l'anneau, dont le haut est en y = 190,08.
- `#0000` n'a pas de position : il se place au bout de la ligne du dégradé, à 100 % de 0,945px. C'est moins que 69,92px, il est donc ramené à 69,92px. Au-delà de l'anneau, le cercle est transparent, avec un bord net, et les verres et la monture se voient.

Le fond de body s'arrête au bord de sa boîte, en y = 260 : seule la moitié du haut du cercle est dessinée. Dessous, le beige de html se voit à travers l'échancrure.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul fond pour deux boîtes. `;font:5%'` fait 9 caractères, et c'est lui qui fait dessiner des choses différentes à la même valeur sur html et sur body. Sans lui, et avec `40px` à la place de `50em` (162 caractères), le fond de html n'est plus tout beige : le canevas devient bleu marine, avec d'autres bandes rouges et cyan au-dessus et en dessous des lunettes, et 72 400 pixels changent.
- L'apostrophe fait 1 caractère pour un nom de police. Sans elle (170 caractères), mon Chrome ignore toute la déclaration `font` : body garde sa police de 16px, 50em vaut 800px sur body aussi, body devient tout beige, et 45 088 pixels changent.
- `5%` fait 2 caractères pour 0,8px. Avec `.8px` (173 caractères), l'image est la même.
- `1q` donne un cercle dont la ligne de dégradé s'arrête presque tout de suite. Avec `circle` à la place (175 caractères), le cercle va jusqu'aux coins du haut de body, à 220,2px, et `#0000` se place là : le bleu marine passe au transparent en fondu de 69,92px à 220,2px, par-dessus les verres, et 18 786 pixels changent.
- `#0000` arrête le bleu marine. Sans `,#0000` (165 caractères), le bleu marine continue sans fin et couvre les verres : 18 786 pixels changent.
- `74q` fait 3 caractères pour 69,92px. Avec `70px` (172 caractères), 8 pixels changent, sur le bord extérieur de l'anneau.
- `#D95F5B 0` fait partir le rouge là où le cyan s'arrête. Avec `#D95F5B 50%` (173 caractères), l'image est la même.
- `space` fait 5 caractères et laisse une seule tuile. Avec `no-repeat` (175 caractères), l'image est la même.
- `57%space` n'a pas besoin d'espace : le `%` termine le nombre. `20vwspace` (172 caractères) est lu comme un seul nombre avec une unité inconnue, `vwspace` : mon Chrome ignore tout le fond, et le canevas est blanc. `20vw space` (173 caractères) marche.
- `50%` fait 3 caractères. Avec `center` (174 caractères), l'image est la même.
- `70vw` fait 4 caractères pour 280px. Avec `280px` (172 caractères), l'image est la même.
- `30%30 40` fait 8 caractères. Avec `120 30 40` (172 caractères), l'image est la même.
- Pas besoin d'espace avant `#` : `space#0D2A58`. Avec une espace (172 caractères), l'image est la même.

## Si vous l'essayez chez vous

L'image cible est un PNG. Dans mon Chrome local (version 157 au moment d'écrire), le code officiel s'en écarte sur 303 pixels de plus de 8 sur un canal. 155 d'entre eux sont sur la ligne y = 229, en bas des verres. La tuile fait 79,8px de haut : mon Chrome la fait commencer en y = 150, et la ligne y = 229 n'est colorée qu'en partie, (176, 84, 90) au lieu de (217, 95, 91) côté rouge. Dans une copie de test avec `20vw space` (173 caractères), une tuile de 80px de haut, cette ligne correspond à la cible, sauf 2 pixels sur les bords de l'anneau et de l'échancrure. Les 148 autres pixels sont à moins de 1,5px des bords des deux cercles, où les pixels de bord de la cible ont d'autres nuances. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
