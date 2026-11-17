---
title: "Une rotation comptée deux fois : un E à l'envers et deux barres en 124 caractères"
ref: 2026-08-06
permalink: /fr/2026/08/06/une-rotation-comptee-deux-fois/
description: "Comment un seul border-image, découpé dans une image jaune unie avec space, et un seul rotate qui fait tourner body deux fois dessinent le E à l'envers et les deux barres de la cible CSS Battle du 6 août 2026."
target: /assets/targets/2026-08-06.png
target_url: https://cssbattle.dev/play/pSfUqdmXCS6D0TBIPxii
colors: ["#0e127d", "#eddf5a"]
player: h_blierzt
chars: 124
score: 722.68
match: 100
code: |
  <style>*{background:#0E127D;rotate:90deg;margin:10 130;border-image:conic-gradient(#EDDF5A)50%34/60%9%space;*{margin:0 0 140
---

La cible du 6 août est bleu marine. Au milieu, trois formes jaunes se suivent : un E à l'envers, une barre large et une barre fine. H_Bliertz les dessine avec html et body seulement, et une seule règle pour les deux. Le même `border-image` découpe trois bandes dans une image jaune unie, sur chaque boîte. Un seul `rotate:90deg` rend horizontales les bandes de html, et fait tourner body deux fois : ses bandes finissent verticales.

Cochez **Couleurs pédagogiques** pour distinguer les bandes de html de celles de body, et pour voir la boîte de body.

{% include animations/2026-08-06.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                             /* html, head, style et body */
  background: #0E127D;          /* html : le canevas ; body : sa propre boîte */
  rotate: 90deg;                /* html tourne de 90deg ; body de 90deg en plus */
  margin: 10 130;               /* html : 140 × 280 en (130 ; 10) */
  border-image:
    conic-gradient(#EDDF5A)     /* une couleur : une image jaune unie */
    50% 34                      /* tranches : la moitié de la hauteur, 34px sur les côtés */
    / 60% 9%                    /* largeurs : trop grandes, réduites aux 5/6 */
    space;                      /* une tuile au milieu de chaque bord */
  * {                           /* head, style et body */
    margin: 0 0 140             /* body : 140 × 140 en haut de html */
```

## Comment ça marche

### 1. Une règle, deux boîtes

Il n'y a ni balise html, ni head, ni body dans le code : Chrome les ajoute, et met style dans head. `*` vise les quatre. Le `*{` imbriqué veut dire `* *` : head, style et body. head et style ne s'affichent pas : seuls html et body comptent.

html garde `margin:10 130`. body reçoit `margin:0 0 140` de la règle imbriquée.

Il n'y a pas de doctype, donc la page est en mode quirks. Un nombre sans unité, comme `10 130`, est en px. Et en mode quirks, html et body s'étirent en hauteur :

- html fait 400 − 2 × 130 = 140px de large et 300 − 2 × 10 = 280px de haut, en (130 ; 10) ;
- body remplit html, moins sa marge du bas de 140px : 140 × 140, en haut de html.

offsetWidth et offsetHeight donnent 140 × 280 pour html et 140 × 140 pour body. Avec `<!doctype html>` devant, les marges sans unité sont ignorées : body fait 0px de haut, et 25 958 pixels changent.

### 2. Deux fonds, deux rôles

`background:#0E127D` va à html et à body. Le fond de html peint tout le canevas : c'est le bleu marine.

Comme html a son propre fond, celui de body reste dans la boîte de body. Il est bleu marine lui aussi, donc invisible, mais il cache ce que html dessine dessous. J'ai vérifié : avec le fond sur body seulement (dans la règle imbriquée, même longueur), le fond de body part sur le canevas, les bandes de html se voient à travers la boîte de body, et 4 416 pixels changent.

### 3. Un border-image sans bordure

`conic-gradient(#EDDF5A)` n'a qu'un seul arrêt de couleur. C'est une image jaune unie, de la taille de la boîte : 140 × 280 pour html. Il n'y a ni style ni épaisseur de bordure : getComputedStyle donne `0px` et `none`. Le border-image est quand même dessiné, parce que ses largeurs sont des pourcentages de la boîte. Avec de simples nombres, comme `/9 1`, les largeurs sont des multiples de l'épaisseur de bordure de 0px, et rien n'est dessiné : le canevas reste tout bleu marine.

L'image est découpée en neuf tranches : `50%` de 280 = 140px en haut et en bas, `34`px à gauche et à droite. Les tranches du haut et du bas prennent toute la hauteur : la rangée du milieu n'a pas de hauteur du tout.

Les largeurs sont `60% 9%` : 60 % de 280 = 168px en haut et en bas, 9 % de 140 = 12,6px sur les côtés. 168 + 168 = 336 dépasse 280, donc les quatre largeurs sont réduites de 280 / 336 = 5/6 : 140px en haut et en bas, et 10,5px sur les côtés. Dans mon Chrome, les barres des côtés sont peintes sur 10px, en 1× comme en 2× (20 pixels physiques).

Les bordures du haut et du bas prennent donc toute la hauteur. Les bords gauche et droit n'ont plus de place, et le milieu est vide (il n'y a pas de `fill`, et il n'a de toute façon pas de hauteur). Il reste :

- les quatre coins : deux barres jaunes de 10px, le long des côtés gauche et droit de html ;
- les bords du haut et du bas : leur tranche fait 140 − 2 × 34 = 72px de large, et la bordure est aussi haute que la tranche, donc chaque tuile fait 72px de large.

### 4. `space` : une tuile, au milieu

Le bord entre les deux coins fait environ 120px de large. Une tuile de 72px y tient ; deux demanderaient 144px. `space` ne dessine que des tuiles entières et répartit la place qui reste autour : la tuile unique se met au milieu, de x = 34 à 106 dans la boîte de html. Les tuiles du haut et du bas s'alignent en une seule bande.

Avec `round`, `repeat` ou sans mot-clé, la tuile remplit tout le bord, les trois bandes se fondent en un bloc, et 13 440 pixels changent.

html porte donc trois bandes verticales : de 0 à 10, de 34 à 106 et de 130 à 140.

### 5. La même règle sur body

body reçoit le même border-image sur son carré de 140 × 140. 60 % de 140 = 84px, et 84 + 84 dépasse 140 : réduit aux 5/6, ça fait 70px en haut et en bas et 10,5px sur les côtés. Les tranches font 70px et 34px, la tuile fait encore 72px, et elle tombe de 34 à 106.

La boîte bleu marine de body couvre la moitié haute de html, et y dessine ses trois bandes, aux mêmes places que celles de html. Avant toute rotation, rien ne change.

### 6. Un rotate, compté deux fois

`rotate:90deg` fait tourner html autour de son centre, (200 ; 150). getBoundingClientRect donne (60 ; 80 ; 280 ; 140) : html va maintenant de x = 60 à 340 et de y = 80 à 220. Ses trois bandes deviennent horizontales : de y = 80 à 90, de 114 à 186 et de 210 à 220.

body tourne avec html : getBoundingClientRect donne (200 ; 80 ; 140 ; 140), la partie droite de html. Et body a lui aussi `rotate:90deg`, autour de son propre centre. Ça fait 180deg en tout : ses bandes sont verticales à l'écran, de x = 200 à 210, de 234 à 306 et de 330 à 340.

La boîte bleu marine de body cache les bandes de html à partir de x = 200. Sa barre de gauche, de 200 à 210, relie les trois bandes de html qui restent à gauche : c'est le E à l'envers. La barre large et la barre fine sont les deux autres bandes de body.

Sans la rotation propre de body (`rotate:none` dans la règle imbriquée), ses bandes tombent pile sur celles de html, et 8 832 pixels changent.

## Notes de golf

- Une seule règle dessine tout, sur deux boîtes. Le `*{` imbriqué ne change que la marge de body.
- Un seul `rotate:90deg` couche html, qui était debout, et fait tourner body une seconde fois. Pas besoin d'un second angle.
- `margin:0 0 140` fait de body pile la moitié de html. Avec `margin:0`, body est aussi grand que html, et 28 432 pixels changent.
- `60%` est trop grand exprès. Chrome réduit les quatre largeurs aux 5/6 : les 168px du haut et du bas deviennent 140, la moitié de html, et les côtés de 12,6px deviennent 10,5, peints sur 10. Avec `50%`, les barres font 12px et 1 120 pixels changent ; avec `63%`, 9px et 560 pixels.
- `conic-gradient(#EDDF5A)` est l'image unie la plus courte : `linear-gradient(#EDDF5A)` donne le même rendu en 125 caractères.
- C'est `space` qui découpe. `round` a la même longueur mais remplit le bord : 13 440 pixels changent.
- Aucune espace n'est utile dans `)50%34/60%9%space` : la `)`, le `%` et le `/` terminent chacun un mot.
- Deux accolades, `*{` et `*{`, restent ouvertes, et il n'y a pas de `</style>`. Avec `}}`, le code fait 126 caractères ; avec `}}</style>`, 134. Le rendu est le même.
