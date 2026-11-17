---
title: "Un dégradé découpé deux fois : un chariot en 141 caractères"
ref: 2026-06-22
permalink: /fr/2026/06/22/un-degrade-decoupe-deux-fois/
description: "Comment un seul dégradé radial, découpé par html en un cadre à trou arrondi et par body en deux roues, dessine un chariot jaune, dans la cible CSS Battle du 22 juin 2026."
target: /assets/targets/2026-06-22.png
target_url: https://cssbattle.dev/play/mdSEofDNaGSNTWgGc2Gt
colors: ["#f0cd48", "#38506f"]
player: selenit
chars: 141
score: 704.33
match: 100
code: |
  .<style>*{*{margin:185 30%26;--p:0 89%1/23%50%}background:#F0CD48;border-image:radial-gradient(7vw,#0000 9vh,#38506F)var(--p,49%/9em/74q 8q 0
---

La cible du 22 juin est un chariot jaune sur un fond bleu gris : une grande caisse arrondie, une barre en dessous et deux petites roues. Ilya Streltsyn le dessine avec une seule déclaration border-image, utilisée par deux éléments. Sur html, le dégradé est découpé en un cadre bleu dont le trou est la caisse arrondie. Sur body, le même dégradé est découpé autrement, et son disque devient les deux roues.

Utilisez la **Vue large** pour voir jusqu'où le border-image de html monte au-dessus du canevas, et les **Couleurs pédagogiques** pour distinguer les deux border-image.

{% include animations/2026-06-22.html lang=page.lang %}

## Le code, aéré

```css
.                                    /* du texte : body a un contenu */
<style>
* {                                  /* html, head, body, style */
  * {                                /* * * : head, body, style */
    margin: 185 30%26;               /* 185px en haut, 120px sur les côtés, 26px en bas */
    --p: 0 89%1/23%50%               /* découpe et largeurs de body */
  }
  background: #F0CD48;               /* celui de html passe sur tout le canevas */
  border-image: radial-gradient(7vw, #0000 9vh, #38506F)
    var(--p, 49%/9em/74q 8q 0        /* html n'a pas --p : la valeur de repli */
```

## Comment ça marche

### 1. Une déclaration, deux jeux de nombres

`*` vise html, head, body et style. L'imbrication transforme `*{*{` en `* *` : les éléments qui sont dans un autre, donc head, body et style. head et style sont masqués : seuls html et body comptent.

Les deux reçoivent le fond jaune et le même `border-image`. Il se termine par `var(--p, …)`. `--p` n'est défini que par `* *`, et html n'est dans aucun élément : il ne le reçoit jamais et prend la valeur de repli, `49%/9em/74q 8q 0`. body reçoit `--p`, donc son border-image se termine par `0 89%1/23%50%`. Même dégradé, deux découpes.

### 2. Un border-image sans bordure

Il n'y a pas de `border-style`, donc la bordure fait 0px. L'image est quand même dessinée. Quand `border-image-width` est une longueur ou un pourcentage, il n'utilise pas la largeur de la bordure. L'image est dessinée vers l'intérieur, sur la boîte de l'élément.

### 3. Le dégradé

`radial-gradient(7vw,#0000 9vh,#38506F)` est un cercle de 7vw = 28px (7 % de 400), au milieu de l'image. Il est transparent jusqu'à 9vh = 27px (9 % de 300), passe à #38506F à 28px, et reste #38506F au-delà. L'image est donc bleue avec un disque transparent au milieu. Elle est dessinée une fois sur toute l'aire du border-image, puis découpée en morceaux.

### 4. html : une aire plus grande que le canevas

html fait 400 × 300. L'outset `74q 8q 0` pousse l'aire de l'image vers l'extérieur : 74q = 18,5 mm = 69,92px en haut, 8q = 2 mm = 7,56px à gauche et à droite, 0 en bas. L'aire va de (−7,56, −69,92) à (407,56, 300) : 415,12 × 369,92. Le disque est en son milieu, en (200, 115,04).

### 5. html : neuf morceaux, un trou arrondi

La découpe `49%` coupe l'image à 49 % de chaque bord. Les quatre coins font 203,41 × 181,26. Entre eux, les bandes du milieu ne font que 2 % : 8,30px en largeur et 7,40px en hauteur. Le disque est centré, donc chaque coin en garde à peu près un quart, dans son angle intérieur.

La largeur `9em` fait 144px (police de 16px). Chaque coin est serré dans un carré de 144 × 144, dans un angle de l'aire. Cela fait 0,708 fois sa largeur et 0,794 fois sa hauteur : son quart de disque devient un quart d'ellipse d'environ 19,1px de large et 21,4px de haut. Les bandes fines s'étirent le long des bords, et le milieu n'est pas dessiné (il n'y a pas de `fill`).

Il reste un cadre bleu avec un trou. Le morceau du bord gauche devient transparent à 127,82px de son côté gauche, en x = 120,26. Le même calcul donne 55,57 en haut, 279,74 à droite et 174,51 en bas. Le fond de html est peint sur le canevas, sous son border-image, donc le trou montre du jaune. Dans mon rendu, la caisse couvre les lignes 55 à 174 et les colonnes 120 à 279.

C'est l'outset qui place le trou. Sans `/74q 8q 0`, l'aire n'est que le canevas, et le trou ne fait que 146 × 60, de la ligne 120 à 179.

### 6. body : une boîte de 160 × 89

`margin:185 30%26` n'a pas d'unité pour 185 et 26 : les pages de CSS Battle sont en mode quirks, où un nombre seul vaut des px. body a 185px en haut, 30 % de 400 = 120px à gauche et à droite, et 26px en bas. En mode quirks, body remplit la hauteur de html moins ses marges : 300 − 185 − 26 = 89px. J'ai mesuré body de (120, 185) à (280, 274). Son fond jaune est peint par-dessus le cadre bleu de html.

### 7. body : des morceaux qui se chevauchent

L'image de body fait 160 × 89, avec le disque en (200, 229,5). La découpe vaut 0 en haut, 1 en bas (un pixel d'image), et 89 % = 142,4px à gauche et à droite.

Les découpes gauche et droite font 284,8px à elles deux, plus que les 160px de l'image. Dans ce cas, le bord haut, le bord bas et le milieu sont vides. Les coins du haut font 0px de haut, ils sont vides aussi. Seuls quatre morceaux sont dessinés : le bord gauche, le bord droit et les deux coins du bas. Je l'ai vérifié en ajoutant `fill` à la découpe : l'image ne change pas.

### 8. body : deux roues et une barre

Les largeurs sont `23%50%`. 50 % de 160 font 80px à gauche et à droite. 23 % de 89 font 20,47px en haut et en bas, et Chrome dessine 20px : avec `20px` à la place de `23%`, mon rendu est le même.

- Le morceau du bord gauche, 142,4 × 88 dans l'image, passe dans 80 × 49, depuis (120, 205). Le disque est entier dans ce morceau, et il devient un cercle presque rond, de 15,2 × 15,0 de rayon, centré en (164,94, 229,78).
- Le morceau du bord droit commence en x = 17,6 dans l'image et passe dans la moitié droite, de x = 200 à 280. Son disque, entier lui aussi, arrive en (235,06, 229,78).
- Les coins du bas prennent la dernière ligne de l'image, 43,5px sous le centre du disque : ils sont bleus et pleins. Étirés en 80 × 20, ils couvrent body de y = 254 à 274. Avec `0` à la place de `1`, ils sont vides, une bande jaune apparaît sous les roues, et 3 328 pixels changent.
- Rien n'est dessiné dans les 20px du haut. Le fond jaune de body y reste : c'est la barre, de la ligne 185 à 204.

Dans mon rendu, les roues couvrent les colonnes 150 à 179 et 220 à 249, lignes 215 à 244.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `var(--p,…)` permet à un seul `border-image` de servir aux deux éléments. Avec deux déclarations complètes, celle de html d'abord et celle de body dans la règle imbriquée, la même image prend 180 caractères.
- `7vw`, `9vh` et `9em` valent 28px, 27px et 144px en 3 caractères chacun. En px, la même image prend 145 caractères.
- `#0000` est transparent en 5 caractères. `transparent` donne la même image en 147 caractères.
- Aucune espace n'est nécessaire dans `30%26`, `89%1` ou `23%50%`. Avec les trois espaces, la même image prend 144 caractères.
- Rien n'est fermé. Pour fermer, il faut `)}`, car `var(` est encore ouvert : la même image en 143 caractères. Une `}` seule tombe dans `var(` et casse la déclaration : 96 677 pixels changent.
- Le point donne du texte à body. Avec `<style>` seul (140 caractères), mon rendu change : html fait 385 × 459 au lieu de 400 × 300, et 7 546 pixels changent. `<body><style>` (146 caractères) donne les mêmes 7 546 pixels changés : c'est le texte qui compte, pas la place de `<style>`.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel est très proche de la cible, mais pas identique : 568 pixels diffèrent de plus de 8 sur un canal. 395 sont sur les bords de la caisse, où mon rendu a des pixels en demi-teinte alors que la cible est nette, par exemple dans les colonnes 119 et 280. 166 sont sur les bords des roues, pour la même raison. Les 7 derniers sont le point lui-même : un petit point noir dans la barre, de x = 121 à 123 et de y = 197 à 199. Le juge de CSS Battle donne au code 100 % de correspondance.
