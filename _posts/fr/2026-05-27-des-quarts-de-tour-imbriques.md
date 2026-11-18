---
title: "Des quarts de tour imbriqués : neuf disques en 179 caractères"
ref: 2026-05-27
permalink: /fr/2026/05/27/des-quarts-de-tour-imbriques/
description: "Comment une seule liste de trois ombres, donnée à body, dl, h1 et p empilés dans le même rond et tournés chacun d'un quart de tour de plus que leur parent, dessine une grille de neuf disques bruns et verts reliés par deux barres, dans la cible CSS Battle du 27 mai 2026."
target: /assets/targets/2026-05-27.png
target_url: https://cssbattle.dev/play/mx8vXdVXxjZy7nuj8zF9
colors: ["#fff8cf", "#b9c99f", "#7c3219"]
player: emohdaziz
chars: 179
score: 672.63
match: 100
code: |
  <dl><h1><p><style>&,&>*{color:7c3219;background:#fd13;box-shadow:0 5vw,0-5vw;margin:60 85;*{border-radius:50%;box-shadow:inset 2in 0,25vw 25vw,25vw 0#b9c99f;rotate:90deg;height:60
---

La cible du 27 mai montre neuf disques sur un fond crème, en trois rangées de trois. Les rangées du haut et du bas font brun, vert, brun, reliés par une barre brune. La rangée du milieu fait vert, brun, vert. Mohamed Ali empile quatre boîtes dans le même rond : body, dl, h1 et p. Elles reçoivent toutes les mêmes trois ombres et le même quart de tour. Les rotations s'additionnent du parent à l'enfant : les deux mêmes disques tombent à quatre endroits.

Avec les **Couleurs pédagogiques**, les disques de chaque boîte ont un anneau de sa couleur, et une flèche montre dans quel sens la boîte est tournée.

{% include animations/2026-05-27.html lang=page.lang %}

## Le code, aéré

```css
<dl><h1><p>
<style>
&, &>* {                     /* html ; head et body */
  color: 7c3219;             /* brun, pour toute ombre sans couleur */
  background: #fd13;         /* celui de html passe au canevas : #fff8cf */
  box-shadow:
    0 5vw,                   /* html : barre du bas, 20px */
    0-5vw;                   /* html : barre du haut */
  margin: 60 85;             /* html : 230 × 180 en (85, 60) ; body : 60 de large */
  * {                        /* body, dl, h1, p (et head, style) */
    border-radius: 50%;      /* des ronds */
    box-shadow:
      inset 2in 0,           /* remplit la boîte de brun */
      25vw 25vw,             /* disque brun, 100px à droite et 100px plus bas */
      25vw 0#b9c99f;         /* disque vert, 100px à droite */
    rotate: 90deg;           /* un quart de tour, ajouté à celui du parent */
    height: 60               /* 60 × 60 en (170, 120) */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `60` dans une marge ou une hauteur est lu en px.

`<dl><h1><p>` ouvre trois éléments, et aucun ne ferme le précédent. La page est donc body > dl > h1 > p, avec le `<style>` dans p.

Au niveau le plus haut d'une feuille de style, `&` vise la racine : html. `&>*` vise ses enfants, head et body. Le `*{` imbriqué vise tout élément placé dans ceux-là : head, body, dl, h1, p et style. head et style ne sont pas affichés.

html ne reçoit donc que la première règle. dl, h1 et p ne reçoivent que la règle imbriquée. body reçoit les deux, et pour la propriété présente dans les deux, `box-shadow`, c'est la règle imbriquée qui gagne : je l'ai vérifié dans le style calculé de body.

Le `<style>` n'est jamais fermé, ni les deux règles : la fin du code les ferme.

### 2. html et le canevas

`margin:60 85` met 60px en haut et en bas, 85px sur les côtés. En mode quirks, html remplit la page moins ses marges : 230 × 180, en (85, 60).

`#fd13` est un hexa à 4 chiffres : du jaune #ffdd11 à 0x33 = 20 % d'opacité. html est la racine : son fond est peint sur tout le canevas. Sur le blanc, il donne la crème #fff8cf.

### 3. Les deux barres

`color:7c3219` n'a pas de `#`. En mode quirks, le navigateur la lit quand même comme une couleur : #7c3219. Une ombre sans couleur prend la couleur courante. Les deux barres, le disque du centre et les disques bruns la prennent tous.

`0 5vw` copie la boîte de html 5vw = 20px plus bas, et `0-5vw` 20px plus haut. Une ombre extérieure n'est jamais peinte sous sa propre boîte. Il ne reste donc que deux bandes : 230 × 20, de y = 40 à 60 et de y = 240 à 260, de x = 85 à 315.

### 4. Quatre boîtes en une

body reçoit aussi `margin:60 85`. Dans les 230px de html, il lui reste 230 − 170 = 60px de large. Le `height:60` imbriqué le rend carré, et `border-radius:50%` rond : un rond de 60px en (170, 120).

dl, h1 et p sont des blocs sans marge écrite dans le code. Chacun prend toute la largeur de son parent, 60px, et `height:60` lui donne la même hauteur. Ils ont des marges du haut par défaut (16px, 21,44px et 32px), mais elles fusionnent avec la marge du haut de body, 60px, et la plus grande gagne. Je l'ai vérifié : avec un `margin-top:40px` ajouté sur p, rien ne bouge. Les quatre boîtes sont pile l'une sur l'autre, en (170, 120).

### 5. Le disque du centre

body a aussi `background:#fd13`, venu de la première règle. L'ombre `inset 2in 0` le couvre. Une ombre intérieure est dessinée dans la boîte, autour d'une copie de la boîte déplacée du décalage. Ici, la copie part de 2in = 192px à droite, bien au-delà de la boîte de 60px. Rien de la boîte n'est épargné : elle est toute brune. Les quatre boîtes peignent ce même disque brun.

### 6. Deux disques, quatre rotations

`25vw 25vw` est une copie brune du rond, 100px à droite et 100px plus bas. `25vw 0#b9c99f` est une copie verte, 100px à droite.

`rotate:90deg` tourne une boîte d'un quart de tour dans le sens des aiguilles d'une montre, autour de son centre, ombres comprises. Les quatre boîtes ont leur centre en (200, 150). Une rotation s'applique aussi à tout ce qui est dans la boîte : la rotation propre d'un enfant s'ajoute à celle de son parent. body tourne de 90°, dl de 180°, h1 de 270° et p de 360°.

Un quart de tour envoie « à droite » vers « en bas », et « en bas » vers « à gauche ». Donc :

- body, 90° : disque vert en (200, 250), disque brun en (100, 250).
- dl, 180° : vert en (100, 150), brun en (100, 50).
- h1, 270° : vert en (200, 50), brun en (300, 50).
- p, 360° : vert en (300, 150), brun en (300, 250), comme s'il n'avait pas tourné.

J'ai vérifié chaque disque brun en donnant à dl, h1 et p leur propre couleur dans une copie de test.

### 7. Qui est au-dessus

html est peint en premier : ses barres sont sous tous les disques. Chaque barre commence en x = 85 et finit en x = 315, sous les disques bruns (de x = 70 à 130 et de 270 à 330), et le disque vert au milieu de la rangée couvre son milieu. Les huit disques du tour ne se touchent jamais. Seuls les quatre du centre se superposent, et c'est le même disque brun.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres et une seule rotation pour quatre boîtes. Les rotations s'additionnent : les deux mêmes ombres tombent à quatre endroits.
- Les trois balises doivent être des blocs qui s'emboîtent. `<a><b><i>` ferait gagner 2 caractères (177), mais ce sont des éléments en ligne : `height` ne s'y applique pas, et ce sont des boîtes de 0 × 0. Il ne reste que les disques de body : 14 813 pixels changent.
- `&,&>*` tient la première règle à l'écart de dl, h1 et p. Avec `*{` à la place (175 caractères), ils reçoivent aussi `margin:60 85` : leur largeur tombe à 0, et leurs disques disparaissent. Il ne reste que les disques de body : 14 813 pixels changent.
- `color:7c3219` fait du brun la couleur par défaut des ombres. Écrire `#7c3219` sur les quatre ombres brunes à la place, sans `color`, donne la même image en 194 caractères. Avec le `#` gardé dans `color:#7c3219`, c'est 180.
- `#fd13` fait 5 caractères. La crème opaque qu'il donne, `#fff8cf`, en prend 7 : la même image en 181 caractères.
- `inset 2in 0` est le moyen le plus court de remplir les boîtes de brun. Avec `background:#7c3219;` dans la règle imbriquée à la place, c'est la même image en 186 caractères. Sans l'un ni l'autre, le disque du centre montre le `#fd13` de body sur la crème, #fff2a8 : 2 906 pixels changent.
- Des unités courtes : `5vw` vaut 20px, `25vw` 100px et `2in` 192px. En px (186 caractères), l'image est la même. Les marges et la hauteur n'ont besoin d'aucune unité, grâce au mode quirks.
- Pas d'espace là où il n'en faut pas : `0 -5vw` et `0 #b9c99f` donnent la même image en 181 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 1 263 pixels, avec la même règle que dans les notes de golf, de 192 au plus. Tous sont sur les bords des neuf disques, de 123 à 159 par disque. Les aplats sont identiques, sauf que ma crème est #fff8cf et celle de la cible #fef9ce, à un cran près sur chaque canal. Mon rendu adoucit les bords avec beaucoup plus de nuances intermédiaires : 279 couleurs en tout, contre 70 dans la cible. Le juge de CSS Battle donne au code 100 % de correspondance.
