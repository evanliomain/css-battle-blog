---
title: "Le canevas à travers l'ombre : quatre pilules et une barre en 129 caractères"
ref: 2026-05-30
permalink: /fr/2026/05/30/le-canevas-a-travers-l-ombre/
description: "Comment une seule liste de trois ombres, portée par html puis par un body à la police minuscule, dessine quatre pilules blanches et une barre bleu sarcelle sur un fond vert menthe, les pilules du haut n'étant qu'un trou dans l'ombre, dans la cible CSS Battle du 30 mai 2026."
target: /assets/targets/2026-05-30.png
target_url: https://cssbattle.dev/play/q8WdCHHuO4lvK1QbC5kI
colors: ["#fff", "#317080", "#59cfa0"]
player: emohdaziz
chars: 129
score: 716.98
match: 100
code: |
  <style>*{border-radius:3lh;margin:65 90 155;box-shadow:0 5lh#fff,0 3in#317080,0 3in 0 53em#59cfa0;*{margin:-288 100 198;font:.2Q"
---

La cible du 30 mai montre quatre pilules blanches en deux rangées sur un fond vert menthe, séparées au milieu par une barre bleu sarcelle. Mohamed Ali ne peint rien en blanc par-dessus : html porte une ombre verte géante, et une ombre n'est jamais dessinée sous sa propre boîte. Les pilules du haut sont donc le canevas blanc, vu par un trou. body porte les trois mêmes ombres, mais avec une police minuscule, elles rétrécissent et deviennent la barre et la coupure.

Utilisez la **Vue large** pour voir la boîte de body au-dessus du canevas et l'ombre bleu sarcelle de html en dessous.

{% include animations/2026-05-30.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* html, head, body, style */
  border-radius: 3lh;        /* html : 54px, une pilule ; body : 0 */
  margin: 65 90 155;         /* html : 220 × 80 en (90, 65) */
  box-shadow:
    0 5lh#fff,               /* html : 90px plus bas, les pilules du bas ; body : cachée */
    0 3in#317080,            /* body : 288px plus bas, la barre ; html : hors du canevas */
    0 3in 0 53em#59cfa0;     /* html : étalée de 848px, le vert ; body : 10px, la coupure */
  * {                        /* * * : head, body, style (pas html) */
    margin: -288 100 198;    /* body : 20 × 170 en (190, −223) */
    font: .2Q"               /* 0,19px : em = 0,19px, lh = 0 */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `65` dans une marge est lu en px.

La page a html, head, body et style. head et style ne sont pas affichés. `*` vise les quatre : html et body reçoivent tous les deux l'arrondi, une marge et les trois ombres. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre. Ce sont head, body et style, mais pas html. La seconde marge et la police ne vont donc qu'à body. Sa marge remplace la première.

### 2. La pilule de html

`margin:65 90 155` met 65px en haut, 90px sur les côtés et 155px en bas. En mode quirks, html remplit la page moins ses marges : 400 − 180 = 220 de large, 300 − 65 − 155 = 80 de haut. Je l'ai mesuré : 220 × 80, en (90, 65).

`lh` est la hauteur de ligne. html a la police par défaut de 16px, et dans mon Chrome `3lh` vaut 54px : un `lh` fait donc 18px. Un arrondi de 54px dépasse la moitié de 80 : le navigateur réduit les coins à 40px, et la boîte devient une pilule complète.

html n'a pas de fond, body non plus. Rien ne peint donc le canevas : il reste blanc, la couleur par défaut de la page.

### 3. Une ombre verte avec un trou

La troisième ombre, `0 3in 0 53em #59cfa0`, descend de 3in = 288px et s'étale de 53em = 53 × 16 = 848px de chaque côté. Sa boîte va de x = −758 à 1158 et de y = −495 à 1281 : elle couvre tout le canevas en vert.

Une ombre extérieure n'est jamais peinte sous la boîte qui la porte. Le navigateur découpe la boîte de bordure de html, coins arrondis compris. Sous la pilule de html, le vert laisse un trou, et le canevas blanc s'y voit : ce sont les deux pilules du haut. Je l'ai vérifié : avec `<style>html{background:red}</style>` ajouté devant le code, seules les pilules du haut changent, et elles deviennent rouges.

### 4. Les pilules du bas

La première ombre, `0 5lh #fff`, descend de 5 × 18 = 90px : de y = 155 à 235. La première ombre de la liste est peinte par-dessus les autres : elle passe devant le vert. C'est la pilule du bas : la même forme que le trou au-dessus, avec un écart de 10px entre les deux.

La deuxième ombre, `0 3in #317080`, descend de 288px : de y = 353 à 433, hors du canevas. html n'en a pas besoin. Elle est là pour body.

### 5. body, très haut et tout petit

La marge de body est `-288 100 198`. body remplit la boîte de contenu de html moins ses marges. Sa largeur vaut 220 − 2 × 100 = 20. Son haut est en 65 − 288 = −223. Sa hauteur vaut 80 + 288 − 198 = 170. Je l'ai mesuré : 20 × 170, en (190, −223), tout au-dessus du canevas.

`font:.2Q"` règle la taille de la police. 1Q fait un quart de millimètre, 0,945px : `.2Q` fait donc 0,19px. Le raccourci `font` exige un nom de famille : le `"` ouvre une chaîne, et la fin du code la ferme. La famille est donc un nom vide. Avec cette police, `em` vaut 0,19px, et dans mon Chrome `lh` vaut 0 : le `5lh` et le `3lh` de body valent tous les deux 0px.

### 6. La barre

body porte les trois mêmes ombres, avec ses propres unités. La première, `0 5lh #fff`, devient `0 0 #fff` : elle est juste sous la boîte de body, elle n'est donc jamais peinte.

La deuxième, `0 3in #317080`, descend la boîte de 20 × 170 de body de 288px : de y = −223 + 288 = 65 à 235, de x = 190 à 210. Le `-288` de la marge et le `3in` de l'ombre s'annulent. La barre va du haut des pilules du haut au bas des pilules du bas. body est peint après html : ses ombres passent par-dessus celles de html.

### 7. La coupure

La troisième, `0 3in 0 53em #59cfa0`, descend aussi de 288px, mais `53em` vaut maintenant 53 × 0,189 = 10,02px. L'ombre est une bande verte de x = 180 à 220 et de y = 55 à 245. Elle vient après la barre dans la liste : elle passe derrière. Mais elle couvre les pilules de html : elle coupe chaque rangée en deux. L'arrondi de body vaut 0 : la coupure laisse des bouts droits des deux côtés de la barre.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres fait deux travaux. Sur html, `5lh`, `3in` et `53em` valent 90, 288 et 848px. Sur body, la police minuscule les change en 0, 288 et 10px. Seul `3in` garde sa taille : il ne dépend pas de la police.
- `3in` fait 288px en 3 caractères. box-shadow n'accepte pas de nombres seuls, même en mode quirks : avec `0 288#317080,0 288 0 53em#59cfa0` (129 caractères), le navigateur ignore tout le box-shadow, et le canevas est tout blanc. 94 248 pixels changent. `288px` donne la même image en 133 caractères.
- `5lh` vaut 90px sur html et 0 sur body. Avec `0 90px#fff` (130 caractères), l'ombre blanche de body se voit aussi, de y = −133 à 37 : une barre blanche de 20 × 37 en haut du canevas. 740 pixels changent. `5em` (même longueur) vaut 80px sur html : les pilules du bas remontent de 10px et touchent celles du haut. 3 818 pixels changent.
- `3lh` vaut 54px sur html, assez pour une pilule complète, et 0 sur body. Avec `3in` (même longueur), les coins de body s'arrondissent : la barre a des bouts ronds, et les coins intérieurs des pilules, contre la coupure, ne sont plus carrés. 178 pixels changent.
- `font:.2Q"` fait 9 caractères. `font-size:.2Q` (13 caractères) donne la même image en 133 caractères. Le `"` est nécessaire : `font:.2Q` (128 caractères) n'a pas de nom de famille, le navigateur l'ignore, et body garde la police de 16px. Ses ombres sont alors aussi grandes que celles de html : son vert couvre les pilules, et il ne reste qu'une barre aux bouts ronds et un bout blanc en haut. 27 056 pixels changent. Fermer la chaîne, `font:.2Q""`, donne la même image en 130 caractères.
- Pas d'espace avant le `#` : `0 5lh #fff,0 3in #317080,0 3in 0 53em #59cfa0` donne la même image en 132 caractères.
- Des nombres seuls : `65px 90px 155px` et `-288px 100px 198px` donnent la même image en 141 caractères.
- L'imbrication garde la seconde marge et la police loin de html. `}body{` à la place du `*{` intérieur donne la même image en 132 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 464 pixels, avec la même règle que dans les notes de golf, de 125 au plus. Tous sont sur les bouts ronds des quatre pilules : 125 sur chaque bout gauche, 107 sur chaque bout droit. Les aplats et les bords droits sont identiques. Mon rendu adoucit ces courbes avec beaucoup de nuances intermédiaires. La cible en a moins : 30 couleurs en tout, contre 116 dans mon rendu. Le juge de CSS Battle donne au code 100 % de correspondance.
