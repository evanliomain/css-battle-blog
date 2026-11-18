---
title: "Cinq points tapés : un champ de mot de passe en 125 caractères"
ref: 2026-06-05
permalink: /fr/2026/06/05/cinq-points-tapes/
description: "Comment les deux ombres de html dessinent un champ de mot de passe, et comment cinq points dans une police de 120px le remplissent, dans la cible CSS Battle du 5 juin 2026."
target: /assets/targets/2026-06-05.png
target_url: https://cssbattle.dev/play/IgyOIJdxXjX2em7d88fk
colors: ["#326", "#9c85e2", "#fff"]
player: h_blierzt
chars: 125
score: 721.52
match: 100
code: |
  .....<style>&{margin:125 60;color:#326;border-radius:11q;box-shadow:0 0 0 11q,0 0 0 9in#9C85E2;*{margin:-76 10;font:900 127q'
---

La cible du 5 juin est un champ de mot de passe sur fond violet clair : une boîte blanche aux coins arrondis, un contour violet foncé, et cinq points foncés à gauche. H_Bliertz dessine le champ avec html seul. Une ombre fait le contour, une seconde fait le fond violet, et le blanc n'est que le canevas. Les points sont du texte : cinq points tapés au début du code, en gras à 120px.

Utilisez les **Couleurs pédagogiques** pour distinguer l'anneau de html du texte, et la **Vue large** pour voir l'ombre violette déborder loin du canevas.

{% include animations/2026-06-05.html lang=page.lang %}

## Le code, aéré

```css
.....                          /* le texte de body : cinq points */
<style>
& {                            /* html */
  margin: 125 60;              /* 280 × 50 en (60, 125) */
  color: #326;                 /* pour l'anneau et le texte */
  border-radius: 11q;          /* 11q = 10,39px */
  box-shadow:
    0 0 0 11q,                 /* un anneau de 10,39px, en #326 */
    0 0 0 9in#9C85E2;          /* 864px de violet tout autour */
  * {                          /* tout ce qui est dans html */
    margin: -76 10;            /* body : 260 de large en (70, 49) */
    font: 900 127q'            /* gras, 120px, un nom de police vide */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `125` est lu en px.

Le parseur construit html > head et body. Les cinq points sont du texte : ils vont dans body. L'élément style se retrouve aussi dans body, après eux.

Au premier niveau, `&` désigne la racine : html. Le `*{` imbriqué vaut `& *` : tout élément dans html, donc head, body et style. head et style ne s'affichent pas. Seul body se voit, avec son texte.

### 2. html

`margin:125 60` place html en (60, 125). Il fait 400 − 2 × 60 = 280 de large.

Il n'y a pas de `height`. En mode quirks, html remplit la hauteur de la fenêtre, moins ses marges : 300 − 2 × 125 = 50. J'ai mesuré html : 280 × 50 en (60, 125). J'ai aussi vérifié cette particularité : avec `margin:100 60`, html fait 300 − 200 = 100 de haut.

### 3. L'anneau

La première ombre, `0 0 0 11q`, n'a ni décalage, ni flou, ni couleur. Une ombre sans couleur prend la `color` de l'élément : ici `#326`, la forme courte de `#332266`.

Son étalement vaut 11q = 11 × 0,945 = 10,39px. Un étalement agrandit l'ombre de chaque côté. Une ombre externe n'est jamais peinte sous sa propre boîte : il reste un anneau de 10,39px d'épaisseur tout autour de html. `border-radius:11q` arrondit les coins de html, et l'anneau suit leur courbe.

### 4. Le fond violet

La seconde ombre, `0 0 0 9in#9C85E2`, a un étalement de 9in = 9 × 96 = 864px. Elle est deuxième dans la liste : elle est peinte sous la première, et l'anneau reste au-dessus.

html n'est jamais à plus de 125px d'un bord du canevas : cette ombre couvre tout le canevas, et bien plus. Elle n'est pas peinte sous la boîte de html non plus. html n'a pas de fond : rien ne peint le milieu, et le blanc qu'on y voit est celui du canevas.

### 5. body

`& *` donne à body `margin:-76 10`. body commence en x = 60 + 10 = 70 et fait 280 − 20 = 260 de large. Son haut est en 125 − 76 = 49.

En mode quirks, body remplit aussi html : 50 + 2 × 76 = 202 de haut. J'ai mesuré body : 260 × 202 en (70, 49). Cette hauteur ne se voit pas. Ce qui compte, c'est le haut : le texte de body commence là, donc la ligne de points commence en y = 49.

### 6. Cinq gros points

Le texte de body hérite de `color:#326` de html. `font:900 127q'` règle trois choses :

- `900` : la graisse la plus forte. Des points épais.
- `127q` : 127 × 0,945 ≈ 120px. Chrome donne `120px` comme taille calculée.
- `'` : il ouvre un nom de police. Le code s'arrête juste après, et la fin du code ferme la chaîne. Le nom est vide, aucune police ne porte ce nom : Chrome prend sa police par défaut. Dans mon Chrome, c'est Times : `127q Times` donne la même image.

Dans cette police, un point fait avancer le texte de 30px. La ligne fait 138 de haut : 108 au-dessus de la ligne de base et 30 en dessous. La ligne de base est en 49 + 108 = 157. L'encre d'un point fait 20,27px de large et va de y = 138,43 à 158,70, juste sur la ligne de base. Le premier va de x = 79,55 à 99,82, et les suivants suivent tous les 30px.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Un seul élément dessine tout le champ : html, avec deux ombres. Le blanc est le canevas : il n'y a pas de fond à peindre.
- La particularité du mode quirks donne sa hauteur à html gratuitement : 300 − 2 × 125 = 50, sans `height`.
- Les points sont du texte. `.....` fait 5 caractères pour cinq disques pleins, et `color` sert à la fois à l'anneau et au texte.
- `&` vaut html en 1 caractère. `html{` à la place de `&{` donne la même image en 128 caractères.
- `11q` vaut 10,39px en 3 caractères. Avec `10px` aux deux endroits (127 caractères), 773 pixels changent, tous sur l'anneau : 566 le long de ses bords droits extérieurs et 207 dans ses coins.
- `127q` vaut 120px en 4 caractères. `120px` donne la même image en 126 caractères.
- `900` fait 3 caractères. `bold` donne la même image en 126 caractères. Sans graisse (`font:127q'`, 121 caractères), les points s'amincissent : 1 190 pixels changent.
- Le raccourci `font` exige un nom de police, et `'` en est un en 1 caractère. Sans lui (124 caractères), la déclaration est invalide et le texte garde sa taille de 16px : 1 910 pixels changent. Les gros points disparaissent, et cinq tout petits se posent en haut de body.
- `#326` vaut `#332266` en 4 caractères.
- Pas d'espace avant `#` : `9in#9C85E2`. Avec une espace, la même image en 126 caractères.
- Des nombres seuls dans les marges : `margin:125px 60px` et `margin:-76px 10px` donnent la même image en 133 caractères.
- Le code s'arrête juste après `'`. La fin du code ferme la chaîne, les règles et l'élément style.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 2 046 pixels, avec la règle des notes de golf. 117 954 des 120 000 pixels sont identiques. Les écarts :

- 1 275 pixels autour des points. Dans la cible, chaque point est un disque de 20px, centré en y = 150, le premier en x = 85. Dans mon rendu, l'encre du premier point fait 20,27px de large, centrée en (89,69 ; 148,56). Les points sont 4,69px plus à droite et 1,44px plus haut ;
- 771 pixels sur l'anneau : 566 le long de ses bords droits extérieurs, 205 dans ses coins. Avec `10px` à la place des deux `11q`, les bords droits collent à la cible : l'anneau de la cible fait 10px d'épaisseur, pas 10,39px. 167 pixels diffèrent encore dans les coins.

Le juge de CSS Battle donne au code 100 % de correspondance.
