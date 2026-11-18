---
title: "Quatre quarts, une tuile : un tissage en 102 caractères"
ref: 2026-05-10
permalink: /fr/2026/05/10/quatre-quarts-une-tuile/
description: "Comment un seul dégradé conique, coupé en quatre quarts et répété en tuile de 220 × 360, dessine deux colonnes noires sur des bandes rouges et jaunes, dans la cible CSS Battle du 10 mai 2026."
target: /assets/targets/2026-05-10.png
target_url: https://cssbattle.dev/play/Sl1N4d7WBfdzS88eFDfM
colors: ["#e25c57", "#e2ad56", "#222"]
player: emohdaziz
chars: 102
score: 751.31
match: 100
code: |
  <style>&{background:28%64q/55%120%conic-gradient(at 5pc,#e25c57,25%,#e2ad56 0 50%,#e25c57 0 75%,#222 0
---

La cible du 10 mai ressemble à un tissu tissé : deux hautes colonnes noires sur une bande rouge, avec des carrés rouges et jaunes en haut et en bas. Mohamed Ali la dessine avec un seul fond, sur html. Un dégradé conique coupe une tuile de 220 × 360 en quatre quarts : rouge, jaune, rouge et gris foncé. Le fond répète cette tuile, et les copies font tout le motif.

La **vue large** montre les six copies de la tuile autour du canevas. Les **couleurs pédagogiques** donnent à chaque quart sa propre couleur : on voit quel quart fait chaque partie du canevas.

{% include animations/2026-05-10.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                          /* au premier niveau : html */
  background:
    28% 64q /                /* position : la tuile en (50,4 ; 60,47) */
    55% 120%                 /* taille : une tuile de 220 × 360 */
    conic-gradient(at 5pc,   /* centre en (80, 180) dans la tuile */
      #e25c57, 25%,          /* rouge depuis 0, puis un repère de transition à 25 % */
      #e2ad56 0 50%,         /* jaune de 25 % (le 0 est remonté) à 50 % */
      #e25c57 0 75%,         /* rouge de 50 % à 75 % */
      #222 0                 /* #222 de 75 % jusqu'au bout ; la fin du code ferme ( et { */
```

## Comment ça marche

### 1. Un seul fond, sur html

Au premier niveau d'une feuille de style, `&` désigne la racine du document : html. Mon Chrome donne la même image avec `html{`.

Le fond de l'élément racine est peint sur tout le canevas. Sa zone de placement est la boîte de html. Le code n'a pas de doctype, la page est donc en mode quirks, et dans ce mode html remplit la fenêtre : mon Chrome le mesure en (0, 0), 400 × 300. Tous les pourcentages ci-dessous sont des parts de cette boîte.

### 2. Une tuile de 220 × 360

Après le `/`, `55%120%` est la taille de l'image de fond : 55 % de 400 = 220 de large, 120 % de 300 = 360 de haut. La tuile est plus haute que le canevas.

Pourquoi 360 ? Le centre du dégradé est à mi-hauteur de la tuile : chaque quart fait donc la moitié de sa hauteur. Les colonnes noires de la cible font 180 de haut, la tuile doit donc faire 2 × 180 = 360.

### 3. Quatre quarts

`conic-gradient(at 5pc,…)` tourne autour d'un centre. `5pc` vaut 5 picas, 5 × 16 = 80px depuis le bord gauche de la tuile. Avec une seule valeur, la position verticale est celle par défaut, 50 % : 180px. Mon Chrome calcule le centre comme `at 5pc 50%`.

Un dégradé conique part du haut et tourne dans le sens des aiguilles d'une montre. Ses arrêts sont des pourcentages d'un tour complet :

- `#e25c57` part de 0. Le `25%` seul qui suit n'a pas de couleur : c'est un repère de transition.
- `#e2ad56 0 50%` donne deux positions au jaune. Une position plus petite qu'une position d'avant est remontée à la plus grande position d'avant : le `0` devient 25 %, la place du repère. Avec le repère et la couleur suivante au même endroit, le passage du rouge au jaune est net. Le jaune va de 25 % à 50 %.
- `#e25c57 0 75%` : le `0` est remonté à 50 %. Le rouge va de 50 % à 75 %.
- `#222 0` : le `0` est remonté à 75 %. La dernière couleur va jusqu'au bout du tour.

Autour du centre (80, 180), chaque quart de tour est un rectangle de la tuile :

- quart 1, de 0 à 25 % : en haut à droite, 140 × 180, rouge ;
- quart 2, de 25 à 50 % : en bas à droite, 140 × 180, jaune ;
- quart 3, de 50 à 75 % : en bas à gauche, 80 × 180, rouge ;
- quart 4, de 75 à 100 % : en haut à gauche, 80 × 180, #222.

### 4. La tuile en (50,4 ; 60,47)

`28%64q` est la position. Un pourcentage aligne le point à 28 % de la tuile sur le point à 28 % de la zone. En largeur, cela donne 28 % × (400 − 220) = 50,4.

`q` est le quart de millimètre : 1in = 96px = 101,6Q, donc 1Q = 0,945px. Mon Chrome calcule `64q` comme 60,4724px.

Le coin haut gauche de la tuile est donc en (50,4 ; 60,47). Son quart noir va de x = 50,4 à 130,4 et de y = 60,47 à 240,47.

### 5. La tuile se répète

Par défaut, un fond se répète : une copie tous les 220px en largeur et tous les 360px en hauteur, dans les deux sens. Le canevas montre des morceaux de trois colonnes de tuiles, qui commencent en x = −169,6, 50,4 et 270,4, et de deux rangées, qui commencent en y = −299,53 et 60,47.

- Bande du milieu, y de 60,47 à 240,47 : la moitié haute de la deuxième rangée. Les quarts noirs des tuiles du milieu et de droite font les deux colonnes. Le quart 1, rouge, remplit le reste : entre les colonnes et sur les deux côtés.
- Bande du haut, y de 0 à 60,47 : le bas de la rangée du dessus. Le quart 3, rouge, est au-dessus de chaque colonne. Le quart 2, jaune, remplit le reste.
- Bande du bas, y de 240,47 à 300 : la moitié basse de la deuxième rangée, avec le même rouge et le même jaune.

Avec `no-repeat` devant le dégradé (112 caractères), il n'y a plus qu'une tuile sur du blanc : par rapport à mon rendu du code officiel, 68 116 pixels changent de plus de 8 niveaux.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&{` atteint html en 2 caractères. Avec `html{` (105 caractères), l'image est la même.
- Un seul raccourci `background` porte la position, la taille et l'image : `28%64q/55%120%` devant le dégradé, sans espace après `%`. Avec les espaces, `28% 64q/55% 120% conic-gradient` (105 caractères), l'image est la même.
- `28%` écrit 50,4px en 3 caractères. Avec `50.4px 64q` (106 caractères), l'image est la même.
- `64q` écrit 60,47px en 3 caractères. Avec `28%60.47px` (106 caractères), l'image est la même.
- `55%120%` écrit 220 et 360. Avec `220px 360px conic-gradient` (107 caractères), l'image est la même.
- `5pc` écrit 80px en 3 caractères. Avec `at 80px` (103 caractères), l'image est la même.
- Une seule valeur après `at` suffit : le centre vertical est à 50 % par défaut. Avec `at 5pc 50%` (106 caractères), l'image est la même.
- `#e25c57,25%,` écrit un bord net à 25 % avec un repère de transition. C'est la même longueur qu'une position de couleur : avec `#e25c57 25%,` (102 caractères), l'image est la même. Le 25 % est nécessaire : avec `#e25c57,#e2ad56 0 50%` (98 caractères), le jaune part de 0 et le quart 1 devient jaune, 43 802 pixels changent.
- Chaque couleur suivante part de `0`, remonté à la fin de la couleur d'avant. Avec `#e2ad56 25% 50%` (104 caractères), l'image est la même.
- `#222` est la forme courte de `#222222`. Avec `#222222` (105 caractères), l'image est la même.
- Le code se termine dans le dégradé et dans la règle : la fin du code les ferme. Avec `)}` à la fin (104 caractères), l'image est la même.
- La répétition est gratuite : c'est la valeur par défaut. Tout le tissage vient d'une seule tuile.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes formes au même endroit que la cible, mais 1 992 pixels diffèrent de plus de 8 niveaux. Ils sont tous sur deux lignes, y = 60 et 240, et sur quatre colonnes, x = 50, 130, 270 et 350 : les bords des couleurs. Le plus grand écart est de 130 niveaux, en (50, 60) : (164, 88, 70) dans mon rendu, (34, 34, 34) dans la cible. Avec `50px 60px` à la place de `28%64q` (105 caractères), mon rendu est identique à la cible, sans aucun pixel au-dessus de 8 niveaux. Dans mon Chrome, ces écarts viennent donc de bords qui tombent entre deux pixels, en x = 50,4, 130,4, 270,4 et 350,4 et en y = 60,47 et 240,47 : les pixels de chaque bord prennent un mélange des deux couleurs. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
