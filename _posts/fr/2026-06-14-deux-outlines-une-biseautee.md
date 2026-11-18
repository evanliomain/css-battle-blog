---
title: "Deux outlines, une biseautée : un écrou en 87 caractères"
ref: 2026-06-14
permalink: /fr/2026/06/14/deux-outlines-une-biseautee/
description: "Comment une seule règle avec zoom:1.6 donne à html une outline biseautée de 30px et à body, zoomé deux fois, une outline ronde de 48px, et comment les deux font un octogone noir percé d'un trou rond, dans la cible CSS Battle du 14 juin 2026."
target: /assets/targets/2026-06-14.png
target_url: https://cssbattle.dev/play/QOStkHKvkB7UHWpkZD72
colors: ["#ffffff", "#000000"]
player: selenit
chars: 87
score: 774.56
match: 100
code: |
  <style>*{outline:solid 20q;border-radius:27q;zoom:1.6}&{corner-shape:bevel;margin:50 81
---

La cible du 14 juin ressemble à un écrou : un octogone noir percé d'un grand trou rond, sur fond blanc. Ilya Streltsyn donne à html et à body la même outline et le même rayon, avec `zoom:1.6`. Les zooms se multiplient : body reçoit une outline 2,56 fois plus grande, html seulement 1,6 fois. Les coins de html sont coupés droit avec `corner-shape:bevel` : c'est l'octogone. body reste rond : son outline remplit l'octogone autour du trou.

Utilisez les **Couleurs pédagogiques** pour distinguer les deux outlines.

{% include animations/2026-06-14.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                        /* html, head, style, body */
  outline: solid 20q;      /* 18,9px : 30px sur html, 48px sur body */
  border-radius: 27q;      /* 25,5px : 40,8px sur html, 65,3px sur body */
  zoom: 1.6;               /* html × 1,6, body × 1,6 × 1,6 = 2,56 */
}
& {                        /* html */
  corner-shape: bevel;     /* des coupes droites au lieu de coins ronds */
  margin: 50 81;           /* × 1,6 : 80 et 129,6 */
```

## Comment ça marche

### 1. Quatre éléments, deux zooms

Le navigateur ajoute html, head et body autour de `<style>`, et range style dans head. `*` touche donc quatre éléments : html, head, style et body. head et style sont cachés. Il reste html et body.

Chacun reçoit `zoom:1.6`. Un zoom agrandit un élément et tout ce qu'il contient, et les zooms des éléments imbriqués se multiplient. html est agrandi 1,6 fois. body est dans html, il est donc agrandi 1,6 × 1,6 = 2,56 fois. Les mêmes longueurs donnent deux tailles : une sur html, une plus grande sur body.

### 2. html : une boîte de 140,8 × 140

Un `&` hors de toute règle désigne la racine de la page : html. Avec `html{` à la place, l'image est la même.

Les pages de CSS Battle n'ont pas de doctype, elles sont donc en mode quirks. Un nombre seul comme `50 81` y est lu en px. Fois 1,6, les marges font 80px en haut et en bas, 129,6px sur les côtés. En mode quirks, html remplit la hauteur de la page. Sa boîte fait 400 − 2 × 129,6 = 140,8px de large et 300 − 2 × 80 = 140px de haut, en (129,6, 80). Son centre est celui du canevas, (200, 150).

### 3. L'outline de html, coupée droit

`20q`, c'est 20 quarts de millimètre : 18,9px. Fois 1,6, Chrome trace l'outline de html sur 30px. Une outline est tracée autour de la boîte et ne prend pas de place. `27q` vaut 25,5px, fois 1,6 : les coins de html ont un rayon de 40,8px. L'outline les suit : un rayon de 40,8px sur son bord intérieur, 70,8px sur son bord extérieur.

`corner-shape:bevel` remplace chaque coin arrondi par une coupe droite, entre les deux mêmes points. Dedans, la coupe part à 40,8px du coin de la boîte de html. L'outline garde ses 30px d'épaisseur le long de la coupe. Dehors, la coupe part donc à 40,8 + 2 × 30 − 30 × √2 = 58,4px du coin. Dans mon rendu, le bord du haut de l'octogone va de x = 157 à 242. L'octogone va de (99,6, 50) à (300,4, 250).

Le corner-shape n'est que dans `&{…}` : seule l'outline de html est en biais.

### 4. body : le trou rond

body garde sa marge par défaut de 8px, mais agrandie 2,56 fois : 20,5px. Dans la boîte de html, il reste une boîte de 99,9 × 99,1, en (150,1, 100,5). Son centre est encore (200, 150).

Son rayon vaut 27q × 2,56 = 65,3px. C'est plus que la moitié de sa taille : le navigateur réduit les rayons jusqu'à ce qu'ils tiennent, à 49,5px. body devient un cercle. Rien ne peint à l'intérieur, il reste blanc : c'est le trou.

### 5. L'outline de body remplit l'octogone

L'outline de body vaut 20q × 2,56 : Chrome la trace sur 48px. Elle suit la forme ronde de body : un anneau de 49,5px à 97,5px autour de (200, 150).

Dans la boîte biseautée de html, les points les plus loin du centre sont les bouts des coupes, à environ 76px. L'anneau va jusqu'à 97,5px : il couvre toute cette boîte autour du trou. Au-delà de la boîte de html, il passe sur l'outline de html, dans le même noir. L'octogone, c'est l'outline de html, le trou, c'est la boîte de body, et l'outline de body remplit tout l'entre-deux.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `zoom:1.6` sur `*` fait faire deux choses à une seule règle. Il donne à html une outline de 30px et un rayon de 40,8px, et à body une outline de 48px et un rayon assez grand pour en faire un cercle. Sans le zoom (78 caractères), les deux outlines ne font que 18,9px : le noir se réduit à un cadre de 26px autour d'un grand rectangle blanc arrondi, et 44 697 pixels changent.
- `&`, c'est html en un caractère. `html{` donne la même image en 90 caractères.
- Le corner-shape ne va qu'à html. Déplacé dans `*{…}` (même longueur), il coupe aussi les coins de body : le trou devient un losange, et 3 105 pixels changent.
- `outline` est tracée autour de la boîte et ne prend pas de place. `border`, plus court d'un caractère (86 caractères), est tracé dans les boîtes : l'octogone de html devient un cadre de 30px, les bordures de 48px de body n'y tiennent plus et dépassent à droite, et 22 607 pixels changent.
- `20q` tient en 3 caractères. `19px` donne la même image en 88 caractères.
- L'outline a besoin de son unité. Avec `20` tout seul (86 caractères), Chrome ignore toute la déclaration `outline` : il ne reste rien de noir, et 25 694 pixels changent.
- Le rayon, c'est ce que corner-shape coupe. Sans `border-radius:27q;` (69 caractères), il n'y a pas de coin à couper : un carré noir avec un trou carré, et 9 150 pixels changent.
- `81` donne à html 140,8px de large, près de ses 140px de haut : body est presque carré et son trou rond. Avec `80` (même longueur), html fait 144px de large, body 103 × 99, et l'octogone et le trou s'étirent en largeur : 1 743 pixels changent.
- Le retrait de body ne coûte rien : c'est sa marge par défaut de 8px, agrandie à 20,5px.
- Rien n'est fermé. `}` à la fin donne la même image en 88 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 596 pixels, avec la même règle que dans les notes de golf. Ils sont tous sur les bords : 305 autour du trou, 281 sur les quatre coupes de l'octogone, 10 sur ses bords droits. Le noir et le blanc sont les mêmes. Le juge de CSS Battle donne au code 100 % de ressemblance.
