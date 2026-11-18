---
title: "Un nom de police vide : les lettres Ai en 191 caractères"
ref: 2026-05-26
permalink: /fr/2026/05/26/un-nom-de-police-vide/
description: "Comment une seule bordure de 5ch, de 40px sur html et de 20px sur body et p une fois qu'un guillemet seul leur donne une police de 8px, dessine un A arrondi, le corps d'un i et, par les ombres d'un p garé hors du canevas, les deux carrés sombres de la cible CSS Battle du 26 mai 2026."
target: /assets/targets/2026-05-26.png
target_url: https://cssbattle.dev/play/mI8Eqyn9sqk49KBAOOKn
colors: ["#f5e3b5", "#a84a4b", "#30383f"]
player: emohdaziz
chars: 191
score: 664.78
match: 100
code: |
  <p><style>*{border:5ch solid#f5e3b5;background:#a84a4b;margin:70 45%70 100}&{border-radius:2in 2in 0 0;border-bottom:0;*{margin:50%120 0;*{color:30383F;box-shadow:-35vw -5pc,-65vw 0}font:2vw"
---

La cible du 26 mai montre les lettres « Ai » en crème sur un fond rouge-brun. Le A est une arche sur deux jambes, le i une barre. Deux carrés sombres font la barre du A et le point du i. Mohamed Ali donne à tous les éléments la même `border:5ch`. Le ch suit la police : il fait 40px sur html, qui dessine le A, et 20px sur body et p, dont un `"` seul met la police à 8px. body est le corps du i, et p, garé hors du canevas, lance les deux carrés en ombres.

Avec la **Vue large**, on voit p à droite du canevas. Avec les **Couleurs pédagogiques**, la bordure de chaque élément a sa propre couleur.

{% include animations/2026-05-26.html lang=page.lang %}

## Le code, aéré

```css
<p>
<style>
* {                              /* html, body, p (et head, style) */
  border: 5ch solid#f5e3b5;      /* 40px sur html, 20px sur body et p */
  background: #a84a4b;           /* celui de html passe au canevas */
  margin: 70 45%70 100;          /* html : 120 × 160 en (100, 70) */
}
& {                              /* html seul */
  border-radius: 2in 2in 0 0;    /* 192px, dessinés en 60px : l'arche */
  border-bottom: 0;              /* le A est ouvert en bas */
  * {                            /* body et p */
    margin: 50%120 0;            /* body : 20px en haut, en x = 260 ; p : 0 en haut, en x = 400 */
    * {                          /* p (et style) */
      color: 30383F;             /* la couleur des ombres */
      box-shadow:
        -35vw -5pc,              /* 140px à gauche, 80px plus haut : le point du i */
        -65vw 0                  /* 260px à gauche : la barre du A */
    }
    font: 2vw"                   /* 8px, nom de police vide : 1ch = 4px */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `70` dans une marge est lu en px.

`<p>` ouvre le body et un p dedans. Le `<style>` va dans p. La page est donc html > body > p, plus head.

`*` vise tous les éléments. Au niveau le plus haut d'une feuille de style, `&` vise la racine : html. Le `*{` imbriqué dedans vise ce qui est dans html : head, body, p et style. Le `*{` suivant demande un niveau de plus : il ne vise que p et style. head et style ne s'affichent pas : il reste trois boîtes, html, body et p.

Le `<style>` n'est jamais fermé, ni les règles : la fin du code les ferme.

### 2. html, le A

`margin:70 45%70 100` met 70px en haut et en bas, 45 % de 400 = 180px à droite et 100px à gauche. En mode quirks, html remplit la page moins ses marges : 400 − 100 − 180 = 120 de large et 300 − 70 − 70 = 160 de haut, en (100, 70).

Le `background:#a84a4b` de la racine est peint sur tout le canevas : c'est le fond rouge-brun.

`border:5ch solid#f5e3b5` donne à html une bordure crème. Le ch est la largeur du « 0 » dans la police de l'élément. html garde la police par défaut, Times en 16px, où 1ch = 8px : 5ch = 40px. `border-bottom:0` enlève le côté du bas : le A est ouvert en bas. Les jambes vont de x = 100 à 140 et de x = 180 à 220, jusqu'à y = 230.

### 3. L'arche

`border-radius:2in 2in 0 0` demande 192px aux deux coins du haut. Ensemble, ils voudraient 384px, et la boîte fait 120px de large. Le navigateur réduit donc tous les rayons du facteur 120 / 384 = 0,3125 : 60px. Les deux coins font un demi-cercle de rayon 60, centré en (160, 130).

Dedans, la bordure fait 40px d'épaisseur : les coins intérieurs ont un rayon de 60 − 40 = 20. Le trou du A fait 40px de large, avec un haut arrondi en y = 110. Je l'ai vérifié : avec `60px` à la place de `2in`, l'image est la même.

### 4. Un nom de police vide

`font:2vw"` est dans le `*{` imbriqué dans `&` : body et p le reçoivent. 2vw vaut 8px. Le raccourci `font` exige une famille de police. Le `"` seul ouvre une chaîne, et la fin du code la ferme : la famille est le nom vide `""`. Aucune police ne porte ce nom : le texte retombe sur la police par défaut, en 8px.

Il n'en faut pas plus pour changer la bordure : sur body et p, 1ch = 4px, et le même `5ch` fait 20px.

### 5. body, le corps du i

`margin:50%120 0` donne à body 120px de chaque côté, et 50 % en haut. Une marge en pourcentage se mesure sur la largeur du contenu du parent : html fait 120 de large avec deux bordures de 40px, il reste 40px, et 50 % font 20px.

body commence en x = 100 + 40 + 120 = 260. Ses marges prennent déjà plus que les 40px : la largeur de son contenu tombe à 0, et avec ses deux bordures de 20px il fait 40px de large. En mode quirks, body descend aussi jusqu'au bas de html : le contenu de html fait 160 − 40 = 120 de haut, moins la marge de 20px, 100. body est donc une barre crème de 40 × 100 en (260, 130), de y = 130 à 230, comme les jambes du A.

Le contenu de body fait 0 de large : son propre fond ne se voit jamais, seule sa bordure se voit.

### 6. p, garé hors du canevas

p reçoit la même marge. Mais son parent est body, dont le contenu fait 0 de large : 50 % de 0 font 0 en haut. À gauche, 120px : p commence en x = 260 + 20 + 120 = 400, le bord droit du canevas. C'est un carré de bordure de 40 × 40 en (400, 150), jamais affiché.

### 7. Deux ombres

Le `*{` le plus imbriqué ne vise que p (et style, qui ne s'affiche pas). `color:30383F` n'a pas de `#`, mais en mode quirks elle est quand même lue comme la couleur #30383F. Une ombre sans couleur prend la couleur courante.

`-35vw -5pc` vaut −140px et −80px : une copie de p en (260, 70), le point du i. `-65vw 0` vaut −260px : une copie en (140, 150), la barre du A, qui remplit le trou entre les jambes. p est peint après html et body : ses ombres sont au-dessus.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule `border:5ch` pour trois boîtes. Comme le ch suit la police, la même déclaration donne 40px sur html et 20px sur body et p.
- Le `"` seul de `font:2vw"` est ce qui fait marcher la police. Sans lui (190 caractères), la déclaration `font` n'a pas de famille et elle est ignorée. body et p gardent la police de 16px et ont des bordures de 40px : le i fait 80 de large, les carrés 80 × 80, et html s'étire jusqu'à y = 290. 25 600 pixels changent.
- Le `50%` de `margin:50%120 0` donne 20px sur body et 0 sur p. `margin:20 120 0` a la même longueur, mais p descend de 20px, et les deux carrés avec lui : 3 200 pixels changent.
- `color:30383F` se passe du `#`. Avec `color:#30383F`, la même image prend 192 caractères. Écrire la couleur dans chaque ombre à la place, sans `color`, en prend aussi 192.
- `<p>` est l'élément qui porte les ombres. Sans lui (188 caractères), le `<style>` atterrit dans head, il n'y a pas de p, et les deux carrés disparaissent : 3 200 pixels changent.
- Des unités courtes : `2in` vaut 192px, `-35vw` −140px, `-5pc` −80px et `-65vw` −260px. Avec des coins en `60px`, c'est la même image en 193 caractères. Avec des ombres en px, 194. Un `60` seul ne marche pas : border-radius n'accepte pas de longueur sans unité, même en mode quirks. Avec `60 60 0 0` (189 caractères), les coins restent carrés : 1 833 pixels changent.
- `45%` vaut 180px, et il ne faut pas d'espace après un `%` : `70 180 70 100` donne la même image en 192 caractères.
- Pas d'espace avant le `#` : `solid #f5e3b5` donne la même image en 192 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 218 pixels, avec la même règle que dans les notes de golf, de 101 au plus. Tous sont sur l'arche : 161 sur son bord extérieur et 57 sur le bord du trou, entre y = 70 et 129. Les aplats sont identiques. Le juge de CSS Battle donne au code 100 % de correspondance.
