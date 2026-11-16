---
title: "Les morceaux qui ne tiennent pas : cinq blocs jaunes en 90 caractères"
lang: fr
ref: 2026-08-31
permalink: /fr/2026/08/31/les-morceaux-qui-ne-tiennent-pas/
description: "Comment une seule border-image en mode space dessine la cible CSS Battle du 31 août 2026 : les coins et le bord haut tiennent, les côtés et le bas non, et ne sont jamais dessinés."
target: /assets/targets/2026-08-31.png
target_url: https://cssbattle.dev/play/FjqC6d9FDroAnHkboFnS
colors: ["#F1D36F"]
player: koda_pig
chars: 90
score: 769.64
match: 100
code: |
  <body bgcolor=65522 style=margin:70;border-image:conic-gradient(#F1D36F)space+41+58+1/5ch>
---

La cible du 31 août montre cinq blocs jaunes sur fond brun : un petit carré, une longue barre et un petit carré en haut, et deux petits carrés aux coins du bas. La solution de koda_pig tient en une seule balise `body` avec une seule `border-image`. L'image est jaune unie, découpée pour que les coins et le bord haut tiennent dans une bande de 40px, alors que les côtés et le bord bas sont trop grands pour leur place. En mode `space`, un morceau qui ne tient pas n'est pas dessiné du tout.

Cochez **Couleurs pédagogiques** pour suivre chaque morceau de l'image.

{% include animations/2026-08-31.html lang=page.lang %}

## Le code, aéré

```css
<body
  bgcolor=65522                         /* #655220, le brun */
  style=
    margin: 70;                         /* body : 260 × 160 en (70 ; 70) */
    border-image:
      conic-gradient(#F1D36F)           /* une seule couleur : une image unie */
      space                             /* bords : morceaux entiers seulement */
      +41 +58 +1                        /* découpe : haut, droite/gauche, bas */
      / 5ch                             /* largeur : 40px */
>
```

## Comment ça marche

### 1. Le body sur fond brun

`bgcolor=65522` est lu comme une couleur HTML à l'ancienne. Il a cinq chiffres : il est complété par un 0 en `655220`, puis lu comme `#655220`, le brun. Le fond du `body` sert pour tout le canevas.

`margin:70` n'a pas d'unité, ce que le mode quirks accepte. En mode quirks, le `body` remplit aussi la hauteur de la page. C'est donc une boîte de 260 × 160 en (70 ; 70).

### 2. Une image unie, grande comme la boîte

`conic-gradient(#F1D36F)` n'a qu'une couleur : c'est une image jaune unie. Un dégradé n'a pas de taille propre : la `border-image` l'étire sur la boîte du `body`, 260 × 160. Un pixel de l'image vaut un pixel du canevas, ce qui rend les valeurs de découpe faciles à lire.

### 3. Neuf morceaux

La découpe `+41+58+1` coupe l'image à 41 du haut, 58 de la droite, 1 du bas et, comme la valeur de gauche manque, à 58 de la gauche aussi. Cela donne neuf morceaux :

- quatre coins : 58 × 41 en haut, 58 × 1 en bas ;
- le bord haut, 144 × 41, et le bord bas, 144 × 1 ;
- les deux côtés, 58 × 118 ;
- le milieu, 144 × 118. Il n'est peint qu'avec le mot-clé `fill` : ici, il disparaît.

### 4. Une bande de 40px et quatre carrés

`/5ch` est la largeur de la `border-image`. Dans la police par défaut, Times en 16px, 1ch vaut 8px : la bande fait 40px. Le `body` n'a aucune bordure (largeur 0, style none), mais une largeur donnée en longueur ne dépend pas de la bordure : l'image est dessinée dans une bande de 40px le long de l'intérieur de la boîte.

Chaque coin est étiré dans un coin de 40 × 40 de la bande, quelle que soit sa forme. C'est pour cela que les coins du bas marchent avec une découpe de 1 : la bande de 58 × 1 devient un carré plein de 40 × 40.

### 5. Le bord haut en mode space

Avec `space`, un bord est d'abord mis à l'épaisseur de la bande, en gardant ses proportions. Puis il est répété en morceaux entiers seulement, et la place qui reste est répartie en espaces.

Le bord haut fait 144 × 41. Ramené à 40 de haut, il fait 144 × 40 / 41 ≈ 140,5 de large. Entre les deux coins du haut, il y a 260 − 2 × 40 = 180 px. Un morceau tient, deux non. Les 39,5 px qui restent sont partagés de chaque côté : la barre va d'environ 129,8 à 270,2. Ce sont les deux espaces de 20 px de la cible.

### 6. Les côtés et le bas : pas la place

Un côté fait 58 × 118. Ramené à 40 de large, il fait 40 × 118 × 40 / 58 ≈ 81,4 de haut. Entre les coins, la place est de 160 − 2 × 40 = 80 px. 81,4, c'est juste un peu trop : pas un seul morceau ne tient, donc rien n'est dessiné.

Le bord bas fait 144 × 1. Ramené à 40 de haut, il fait 5760 de large, pour 180 px de place. Rien n'est dessiné non plus.

J'ai vérifié ces cas par le rendu. Avec une découpe de 3 en bas, le côté fait 116 de haut et devient 80 tout juste : les côtés apparaissent. Avec une découpe de 0 en bas, les coins du bas ont aussi 0 de haut, et les deux carrés du bas disparaissent. Avec `stretch` ou `round` à la place de `space`, les côtés et le bas sont dessinés et tout le cadre est jaune.

## Notes de golf

- Pas de `<style>` : une seule balise `body` avec des attributs de présentation. `bgcolor` donne le fond, et l'ancienne lecture des couleurs transforme 5 chiffres en 6.
- La valeur de `style` n'est pas entre guillemets : elle ne peut pas contenir d'espace. Les signes `+` les remplacent : `space+41+58+1` se lit `space 41 58 1`, car un nombre peut commencer par `+`.
- Une seule couleur suffit pour une image unie, et `conic-gradient` a un caractère de moins que `linear-gradient`. J'ai vérifié que `linear-gradient(#F1D36F)` donne le même rendu.
- Pas besoin de `border` : une largeur de `border-image` donnée en longueur dessine toute seule.
- `5ch` fait 40px en 3 caractères. Une largeur sans unité ne marcherait pas : c'est un multiple de la largeur de bordure, ici 0. J'ai vérifié que `/40` ne dessine rien.
- `space` transforme les morceaux trop grands en rien. Les valeurs de découpe sont choisies pour que le bord haut tienne, que les côtés ratent de peu (81,4 pour 80) et que le bas rate de loin.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel ne rend pas exactement comme la cible. Les bouts de la barre et les bords intérieurs des deux carrés du haut sont adoucis sur une colonne de pixels (x = 110, 129, 269, 270 et 289, de y 70 à 109) : 200 pixels diffèrent de la cible. Le reste est identique. Le site lui a donné 100 % de correspondance.
