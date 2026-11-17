---
title: "Pas d'ombre sous sa propre boîte : une éprouvette en 137 caractères"
ref: 2026-07-07
permalink: /fr/2026/07/07/pas-d-ombre-sous-sa-propre-boite/
description: "Comment une seule liste de cinq ombres, donnée à html et à body, dessine un bouchon, un rebord, un tube noir et son liquide turquoise, parce qu'une ombre extérieure n'est jamais peinte sous sa propre boîte, dans la cible CSS Battle du 7 juillet 2026."
target: /assets/targets/2026-07-07.png
target_url: https://cssbattle.dev/play/LpIgMLGpDeF12oOT28hK
colors: ["#5adab8", "#993576", "#000000"]
player: h_blierzt
chars: 137
score: 708.39
match: 100
code: |
  <style>*{margin:-285-35 300;box-shadow:0-4in 0-5vw#5ADAB8,0-5vw,0-95px 0-26q,0-4in,0 0 0 3in#993576}&{border-radius:1in;margin:95%160-359
---

La cible du 7 juillet est une éprouvette sur un fond magenta sombre : un tube noir au fond rond, plein d'un liquide turquoise, sous un rebord noir et un bouchon carré. H_Bliertz la dessine avec deux boîtes transparentes et une seule liste de cinq ombres, donnée aux deux. html est sous le canevas, body remonte dedans. Une ombre extérieure n'est jamais peinte sous sa propre boîte : le magenta de body a donc un trou, et les ombres de html se voient au travers.

Cochez **Couleurs pédagogiques** pour distinguer le magenta de body de celui de html et voir quelle ombre dessine quelle partie, et passez en **Vue large** pour voir html sous le canevas et les deux ombres perdues de body au-dessus.

{% include animations/2026-07-07.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                        /* html, head, style, body */
  margin: -285-35 300;     /* body : 285px plus haut que html, 35px de plus de chaque côté */
  box-shadow:
    0-4in 0-5vw#5ADAB8,    /* 384px plus haut, 20px plus petite : le liquide, sur html */
    0-5vw,                 /* 20px plus haut, noire : le rebord, sur body */
    0-95px 0-26q,          /* 95px plus haut, 24,57px plus petite : le bouchon, sur body */
    0-4in,                 /* 384px plus haut, noire : le tube, sur html */
    0 0 0 3in#993576       /* 288px de magenta tout autour */
}
& {                        /* html */
  border-radius: 1in;      /* 96px : une pilule */
  margin: 95%160-359       /* 380px en haut, 160px sur les côtés, -359px en bas */
```

## Comment ça marche

### 1. Deux règles

Il n'y a pas de doctype : la page est en mode quirks, et les nombres sans unité sont des px dans `margin`. La page contient html, head, le style et body. head et le style ne sont pas affichés.

`*` les vise tous. Un `&` seul, hors de toute règle, vise la racine : html. Les deux règles fixent `margin`, et dans mon Chrome la dernière gagne : html prend `95%160-359`. Avec les deux règles inversées, html garde la marge de `*`, et 26 758 pixels changent. body ne reçoit que la première règle. Les deux boîtes reçoivent les mêmes cinq ombres, et aucune n'a de fond.

### 2. html, une pilule sous le canevas

Une marge en pourcentage est une part de la largeur du bloc conteneur, même en haut. Pour html, c'est le canevas de 400px : `95%` vaut 380px. Avec 160px de chaque côté, html fait 400 − 320 = 80px de large. En mode quirks, html remplit la hauteur de la page moins ses marges : 300 − 380 + 359 = 279px. getBoundingClientRect donne (160, 380), 80 × 279 : html est tout entier sous le canevas.

`border-radius:1in` demande 96px. C'est plus que la moitié des 80px de large, donc les coins sont réduits à 40px : html est une pilule.

### 3. body, qui remonte dans le canevas

body prend `margin:-285-35 300`. Son haut est 285px au-dessus de celui de html : y = 380 − 285 = 95. Les marges latérales de −35px le rendent large de 80 + 70 = 150px, à partir de x = 125. En mode quirks, body remplit la hauteur de html moins ses marges : 279 + 285 − 300 = 264px. getBoundingClientRect donne (125, 95), 150 × 264.

### 4. Une liste d'ombres, cinq valeurs

getComputedStyle donne les ombres en px. `4in` vaut 4 × 96 = 384px, `5vw` vaut 5 % de 400 = 20px, `26q` vaut 26 quarts de millimètre = 24,57px, `3in` vaut 288px :

- `0-4in 0-5vw#5ADAB8` : 384px plus haut, 20px plus petite de chaque côté, turquoise ;
- `0-5vw` : 20px plus haut ;
- `0-95px 0-26q` : 95px plus haut, 24,57px plus petite de chaque côté ;
- `0-4in` : 384px plus haut ;
- `0 0 0 3in#993576` : sur place, 288px plus grande de chaque côté, magenta.

Les trois ombres sans couleur prennent `currentColor`, noir par défaut. La première ombre de la liste est peinte au-dessus. Chaque ombre suit les coins de la boîte : ronds sur html, carrés sur body.

### 5. Une ombre extérieure n'est jamais peinte sous sa propre boîte

Cette règle fait presque tout. L'ombre `3in` de body couvre tout le canevas, sauf la boîte de body : un trou de 150px de large, de y = 95 jusqu'en bas. En ajoutant `html{box-shadow:none}`, le trou reste blanc : 30 750 pixels changent, 150 × 205.

Les ombres de body sont peintes après celles de html, par-dessus. Je l'ai vérifié en peignant les ombres de body d'autres couleurs : en x = 130, le magenta de html commence en y = 92, mais le rebord garde ses rangées 92 à 94.

### 6. Les ombres de body : le rebord, le bouchon, le magenta

- `0-5vw` est une copie noire de body, 20px plus haut. Seule la partie au-dessus de la boîte de body se voit : 150 × 20, de y = 75 à 95. C'est le rebord.
- `0-95px 0-26q` est 95px plus haut et 24,57px plus petite de chaque côté : de x = 149,57 à 250,43, à partir de y = 24,57. La partie au-dessus de y = 95 se voit, et le rebord couvre son bas : le bouchon, de y = 24,57 à 75.
- Les deux ombres `0-4in` atterrissent 384px plus haut, de y = −289 à −25 : au-dessus du canevas.

J'ai retiré chaque ombre de body seul. Sans `0-5vw`, 1 000 pixels changent, le rebord. Sans `0-95px 0-26q`, 5 202 changent, le bouchon. Sans l'une ou l'autre ombre `0-4in`, rien ne change.

### 7. Les ombres de html, par le trou

Les ombres de html ne se voient que dans le trou de body :

- `0-4in` remonte la pilule de y = −4 à 275, de x = 160 à 240 : le tube noir, au fond rond.
- La première ombre est la même pilule, 20px plus petite de chaque côté : de x = 180 à 220 et de y = 16 à 255, avec un rayon de 40 − 20 = 20px. Elle est peinte au-dessus : c'est le liquide. Le tube garde une paroi noire de 20px.
- L'ombre `3in` commence en y = 380 − 288 = 92. C'est sous le rebord : elle remplit tout le trou autour du tube.
- `0-5vw` et `0-95px 0-26q` restent près de la boîte de html, sous le canevas.

Là aussi, j'ai retiré chaque ombre de html seul. Sans la première, 6 254 pixels changent, le liquide. Sans `0-4in`, 7 557 changent, le tube. Sans `3in`, 17 114 changent, le trou. Sans `0-5vw` ou `0-95px 0-26q`, rien ne change.

Dans mon rendu, la rangée y = 150 est noire de x = 160 à 179, turquoise de 180 à 219 et noire de 220 à 239. La colonne x = 200 est noire de y = 25 à 94, turquoise de 95 à 254 et noire de 255 à 274.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une liste d'ombres pour deux boîtes. Chaque boîte se sert de trois des cinq ombres, et les deux autres se perdent hors du canevas. Deux listes séparées, une pour body dans `*` et une pour html dans `&`, donnent la même image en 165 caractères.
- `&` vise html en 1 caractère. `html` donne la même image en 140.
- `95%160` n'a pas besoin d'espace après le `%`. `380 160` donne la même image en 138.
- `4in`, `5vw` et `3in` font 384px, 20px et 288px en 3 caractères chacun. Avec `384px` deux fois, 141 caractères ; avec `20px` deux fois, 139 ; avec `288px`, 139. La même image à chaque fois.
- `3in` suffit tout juste : le magenta de html doit monter de y = 380 jusqu'au rebord, au moins 285px. Avec `2in`, il s'arrête en y = 188, et 6 510 pixels changent : le trou reste blanc de chaque côté du tube, de y = 95 à 187.
- `26q` fait 24,57px en 3 caractères. `25px` met les bords du bouchon sur des pixels entiers, pour un caractère de plus : 138.
- Les trois ombres noires n'ont pas de couleur : elles prennent `currentColor`. Écrire `#000` trois fois donne la même image en 149 caractères.
- En mode quirks, les nombres sans unité ne marchent que pour certaines propriétés. Avec `0-95 0-26q` (135 caractères), mon Chrome rejette tout le `box-shadow` : le canevas reste blanc, et 120 000 pixels changent. Avec `border-radius:40` (136), il rejette le rayon : le tube prend un fond carré, et 965 pixels changent.
- Rien n'est fermé. `}</style>` à la fin donne 146 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 363 pixels, avec la même règle que dans les notes de golf. 202 sont sur trois bords du bouchon : la rangée y = 24 et les colonnes x = 149 et 250 sortent à moitié sombres, car `26q` fait 24,57px, pas 25px. Avec `25px`, ces pixels sont ceux de la cible. Les 161 autres sont sur le fond rond du tube, où les nuances des pixels du bord diffèrent. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
