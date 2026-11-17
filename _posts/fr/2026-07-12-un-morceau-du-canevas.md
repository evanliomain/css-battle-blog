---
title: "Un morceau du canevas : un I et un 5 en 199 caractères"
ref: 2026-07-12
permalink: /fr/2026/07/12/un-morceau-du-canevas/
description: "Comment un seul dégradé radial fixe peint un demi-anneau sur le canevas, comment les trois ombres de html dessinent un I et le trait d'un 5 autour de sa propre boîte invisible, et comment body, avec le même dégradé, les recouvre comme un morceau du canevas, dans la cible CSS Battle du 12 juillet 2026."
target: /assets/targets/2026-07-12.png
target_url: https://cssbattle.dev/play/80Er6Y1RveWdX3PjVkl0
colors: ["#b7d7cd", "#411c56", "#c06c88"]
player: kieron
chars: 199
score: 660.03
match: 100
code: |
  <style>*{margin:-10-111 0 130;background:radial-gradient(1Q at 0%46%,#b7d7cd 32Q,#411c56 0 60px,#b7d7cd)fixed 54vw}&{margin:75 234 65 86;color:C06C88;box-shadow:53Q -5ch,69Q 27Q 0 5Q,15ex -5ch#411c56
---

La cible du 12 juillet montre un I rose à empattements et un 5 violet foncé sur un fond vert d'eau. Les deux caractères se touchent : le 5 commence là où finit la barre du I. Kieron les dessine avec un seul dégradé radial et trois ombres portées. html est une boîte invisible : ses ombres font le I et le trait du 5, et elle les découpe de l'intérieur. body reçoit le même dégradé, calé sur le canevas : il recouvre le surplus des ombres comme un morceau du canevas, et son anneau fait la partie ronde du 5.

Cochez **Couleurs pédagogiques** pour distinguer les trois ombres, et body par-dessus.

{% include animations/2026-07-12.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                            /* html, body et le reste */
  margin: -10-111 0 130;       /* servent à body : −10, −111, 0, 130 */
  background: radial-gradient(
      1Q at 0%46%,             /* cercle de rayon 1Q = 0,945px, en (0, 46%) */
      #b7d7cd 32Q,             /* vert d'eau jusqu'à 32Q = 30,24px */
      #411c56 0 60px,          /* violet foncé de 30,24 à 60px */
      #b7d7cd                  /* vert d'eau après 60px */
    )
    fixed 54vw                 /* tuile = canevas, 400 × 300, à partir de x = 216 */
}
& {                            /* html */
  margin: 75 234 65 86;        /* 80 × 160 en (86, 75) */
  color: C06C88;               /* rose, pour les ombres sans couleur */
  box-shadow:
    53Q -5ch,                  /* 50,08, −40 : le haut du I */
    69Q 27Q 0 5Q,              /* 65,2, 25,51, étalement 4,72 : le bas du I */
    15ex -5ch#411c56           /* 107,7, −40 : le trait du 5 */
```

## Comment ça marche

### 1. Un dégradé, calé sur le canevas

Pas de doctype : la page est en mode quirks. Le `*` vise tous les éléments, et html et body sont les deux seuls affichés. Les deux reçoivent le dégradé. html est l'élément racine : son fond est peint sur tout le canevas.

`fixed` fait du viewport la zone du fond : 400 × 300. Sans `background-size`, l'image du dégradé fait 400 × 300 elle aussi. `54vw`, c'est 54 % de 400 : 216px. Avec une seule valeur, la position verticale vaut `50%`, ce qui ne déplace rien ici, puisque l'image est aussi haute que la zone. Mon Chrome calcule `216px 50%`. La tuile commence en x = 216.

La taille `1Q` fait du dégradé un cercle de rayon 1Q, 0,945px. `at 0% 46%` place son centre en (0, 138) dans la tuile, donc en (216, 138) sur le canevas. Les arrêts de couleur vont au-delà de ce cercle minuscule, ce qui est permis : vert d'eau jusqu'à 32Q, 30,24px, puis violet foncé de 0 à 60px. Une position plus petite que la précédente est remontée à sa valeur : le 0 devient 30,24, un bord net. Le dernier vert d'eau n'a pas de position : il va à 100 %, 0,945px, et il est remonté à 60px, un second bord net. Le résultat est un anneau de 30,24 à 60px.

Le centre est sur le bord gauche de la tuile : seule la moitié droite de l'anneau est dans la tuile. À gauche de x = 216, le canevas montre la tuile d'avant, de −184 à 216. Son cercle est en x = −184, à plus de 60px de tous les pixels du canevas : tout y est vert d'eau. Avec `no-repeat` (209 caractères), les 216 pixels de gauche deviennent blancs : 51 530 pixels changent.

### 2. html : une boîte invisible qui découpe les ombres

`&` hors de toute règle vaut `:scope`, ici html. La règle `&` vient après la règle `*` et elle est plus spécifique : html prend ses marges. html fait 400 − 86 − 234 = 80 de large. En mode quirks, il prend la hauteur du canevas moins ses marges : 300 − 75 − 65 = 160. getBoundingClientRect donne (86, 75), 80 × 160.

La boîte ne peint rien : son fond est parti au canevas. Mais une ombre portée n'est peinte qu'en dehors de la boîte de bordure de son élément. Dans la boîte de html, de (86, 75) à (166, 235), on voit toujours le canevas. C'est le creux vert d'eau à gauche de la barre, entre les deux empattements.

### 3. Trois ombres

Le mode quirks lit `C06C88` comme une couleur hexadécimale sans son `#`. Les deux premières ombres n'ont pas de couleur : elles prennent `color`, le rose.

- `53Q -5ch` : 53Q font 50,08px. 1ch fait 8px avec la police par défaut de mon Chrome (Times, 16px), donc −5ch fait −40px. L'ombre va de (136,08, 35) à (216,08, 195). Au-dessus de la boîte de html, de y = 35 à 75, elle fait l'empattement du haut. À droite de la boîte de html, à partir de x = 166, elle fait la barre jusqu'à y = 195.
- `69Q 27Q 0 5Q` : décalage de 65,2 et 25,51, pas de flou, étalement de 5Q = 4,72px de chaque côté. L'ombre fait 89,45 × 169,45, de (146,47, 95,79) à (235,92, 265,24). Sous la boîte de html, à partir de y = 235, elle fait l'empattement du bas. Entre x = 166 et 216, elle prolonge la barre jusqu'à y = 235.
- `15ex -5ch#411c56` : 1ex fait 7,18px avec la police par défaut de mon Chrome, donc le décalage fait 107,7px. L'ombre violet foncé va de (193,7, 35) à (273,7, 195). La première ombre de la liste est peinte au-dessus : celle-ci passe sous les deux roses. Sans elle (182 caractères), 1 740 pixels changent : le trait du 5 disparaît.

### 4. body : la même image, par-dessus

body prend les marges du `*` : −10, −111, 0, 130. Elles se comptent depuis la boîte de html. body commence en x = 86 + 130 = 216 et finit en 166 + 111 = 277 : 61 de large. En haut, il commence en 75 − 10 = 65. En mode quirks, body s'étire sur la hauteur de html, 160, moins ses propres marges : 160 + 10 = 170. getBoundingClientRect donne (216, 65), 61 × 170.

body a lui aussi le dégradé, et `fixed` le place lui aussi sur le viewport. body peint donc exactement les pixels du canevas qu'il recouvre, anneau compris. Mais body est peint après les ombres de html. Dans sa boîte, il les cache : l'ombre 3 sous y = 65, et l'ombre 2 à droite de x = 216 au-dessus de y = 235. Pour tester, j'ajoute `*{background:0` à la fin (214 caractères). Il est imbriqué dans `&`, donc il vise les éléments placés dans html, et body perd son fond. 5 107 pixels changent, tous dans la boîte de body : la colonne foncée de l'ombre 3 et le rose de l'ombre 2 apparaissent.

### 5. Le I et le 5

- Le I : l'empattement du haut, c'est l'ombre 1 au-dessus de la boîte de html. La barre, ce sont les ombres 1 et 2, entre la boîte de html et body. L'empattement du bas, c'est l'ombre 2 sous les deux boîtes.
- Le 5 : le trait, c'est ce qui reste de l'ombre 3, entre les ombres roses et le haut de body, de (216, 35) à (273,7, 65). La partie ronde, c'est le demi-anneau, peint par body.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle `*` donne le dégradé aux deux boîtes : html l'envoie au canevas, et body en fait le morceau. Les marges de body voyagent dans la même règle. html les reçoit aussi, mais la règle `&` les remplace.
- `&` vise html en 1 caractère. `html` donne la même image en 202.
- `fixed` sert deux fois. Il rend la tuile aussi grande que le canevas, et il aligne la copie de body sur le canevas. Sans lui (193 caractères), le dégradé de html se place sur la boîte de html, 80 × 160, et se répète tous les 80px sur le canevas, et la copie de body se répète tous les 61px. 36 464 pixels changent.
- La taille `1Q` coûte 2 caractères, et elle rend le dernier arrêt gratuit : sans position, le dernier vert d'eau est remonté à 60px, un bord net. `circle` à la place (203 caractères) met 100 % au coin le plus loin : le violet foncé se fond dans le vert d'eau sur tout le canevas, et 98 264 pixels changent. `circle` et `#b7d7cd 0` donnent la même image en 205.
- `#411c56 0 60px`, c'est une couleur avec deux positions. L'écrire en deux arrêts, `#411c56 0,#411c56 60px`, donne la même image en 207 caractères.
- `32Q` fait 30,24px en 3 caractères. `30px` (200 caractères) change 24 pixels, tous sur le bord intérieur de l'anneau.
- `54vw` fait 216px en 4 caractères. `216px` donne la même image en 200.
- `color:C06C88` n'a pas de `#`. `#C06C88` donne la même image en 200. Écrire `#C06C88` après les deux ombres roses au lieu de poser `color` donne aussi la même image en 200.
- `-5ch` fait −40px en 4 caractères. `-40px` dans les deux ombres donne la même image en 201.
- `53Q` et `69Q 27Q 0 5Q` s'écrivent plus court que des valeurs en pixels entiers, et tombent tout près. `50px -40px` (201 caractères) change 70 pixels, le long des bords gauche et droit de l'empattement du haut (x = 136 et 216). `65px 25px 0 5px` (202 caractères) change 150 pixels, le long des bords gauche, droit et bas de l'empattement du bas.
- `-10-111` et `-5ch#411c56` : le signe moins et le `#` commencent une nouvelle valeur, pas besoin d'espace. `-10 -111` ou `-5ch #411c56` donnent chacun la même image en 200.
- Rien n'est fermé. `}</style>` à la fin donne 208 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, le code officiel ne colle pas tout à fait à la cible. test.sh trouve 246 pixels faux sur des bords droits et 183 sur des courbes. Le plus gros écart, c'est le trait du 5 : il s'arrête en x = 273,7 au lieu de 276, soit 90 pixels. Dans mon Chrome, 1ex fait 7,18px, donc `15ex` fait 107,7px. Avec `110px` à la place (200 caractères), le trait finit en 276, comme dans la cible, et seuls ces 90 pixels changent. La plupart des autres écarts sont autour de l'anneau et le long de bords qui tombent entre deux pixels, comme x = 136,08 ou y = 265,24. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
