---
title: "Un body poussé hors de son anneau : une arche et une tranche en 94 caractères"
ref: 2026-06-02
permalink: /fr/2026/06/02/un-body-pousse-hors-de-son-anneau/
description: "Comment un seul dégradé radial, peint sur html puis sur un body poussé de 666px vers la gauche, dessine un anneau rose coupé par une bande verte, dans la cible CSS Battle du 2 juin 2026."
target: /assets/targets/2026-06-02.png
target_url: https://cssbattle.dev/play/XAXJBHGV3mP8N0KCu47a
colors: ["#668884", "#eed9d9"]
player: koda_pig
chars: 94
score: 763.29
match: 100
code: |
   <style>*{*{margin:150 0 80-666}background:radial-gradient(1q,#668884 74q,#A443 0 15ch,#668884
---

La cible du 2 juin montre un anneau rose clair sur un fond vert gris, coupé en deux par une bande verte : une arche en haut et une tranche de disque en bas. koda_pig la dessine avec un seul dégradé radial, donné à tous les éléments. Sur html, il peint l'anneau. body reçoit le même dégradé, mais ses marges en font une longue bande poussée vers la gauche : son propre anneau sort du canevas, et la bande cache le milieu de l'anneau de html.

Utilisez la **Vue large** pour voir body s'étendre à 666px à gauche du canevas, avec son anneau.

{% include animations/2026-06-02.html lang=page.lang %}

## Le code, aéré

```css
&nbsp;<style>                    /* une vraie espace insécable : 1 caractère */
* {                              /* html, head, body, style */
  * {                            /* * * : head, body, style (pas html) */
    margin: 150 0 80-666;        /* body : x −666 → 400, y 150 → 220 */
  }
  background: radial-gradient(
    1q,                          /* taille : un cercle de rayon 0,945px */
    #668884 74q,                 /* vert jusqu'à 69,9px */
    #A443 0 15ch,                /* rgba(170, 68, 68, 0,2) de 69,9px à 120px */
    #668884                      /* à 1q, ramené à 120px : vert au-delà */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `150` est lu en px.

Le code commence par une espace insécable. Pour l'analyseur HTML, c'est du texte, pas un blanc. body s'ouvre donc tout de suite, et le `<style>` se retrouve dedans. La page a html, head, body et style. head et style ne sont pas affichés.

`*` vise les quatre. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre. Ce sont head, body et style, mais pas html. La marge va donc à body, et le fond à html et à body.

### 2. Un cercle de rayon 1q

Le fond de html est peint sur tout le canevas. J'ai mesuré html : 400 × 300, en (0, 0). Le dégradé est centré dans cette boîte, en (200, 150).

`radial-gradient(1q,…)` commence par une seule longueur. Une seule longueur donne un cercle de ce rayon. Ici, c'est 1q = 0,945px : le rayon du dégradé fait moins d'un pixel.

### 3. Des arrêts au-delà du rayon

Les arrêts n'ont pas à rester dans le rayon. `#668884 74q` est vert du centre jusqu'à 74q = 69,9px.

`#A443 0 15ch` est une couleur avec deux positions. La première, `0`, ne peut pas être avant l'arrêt précédent : elle remonte à 69,9px. Le rose commence là, avec un bord net, et va jusqu'à 15ch. 1ch est la largeur d'un « 0 » : 8px en Times 16px, la police par défaut. 15ch vaut donc 120px.

Le dernier `#668884` n'a pas de position. Il se place à 100 % du rayon, donc à 1q. C'est avant 120px : il remonte lui aussi à 120px. Cela donne un second bord net, et du vert au-delà.

### 4. Un rose translucide

`#A443` est une couleur hexadécimale à 4 chiffres : le quatrième est l'alpha. Elle vaut rgba(170, 68, 68, 0,2). Le fond de html est peint sur du blanc, et les 80 % qui restent le laissent voir. Le rose visible est #eed9d9. J'ai vérifié : `#eed9d9` à la place de `#A443` donne la même image.

### 5. body, une bande poussée vers la gauche

body reçoit `margin:150 0 80-666` : 150px en haut, 0 à droite, 80px en bas, −666px à gauche. `80-666` fait deux nombres : le signe moins commence le second.

En mode quirks, body remplit la hauteur de html, moins ses propres marges : 300 − 150 − 80 = 70px. Sans marge à droite et avec −666px à gauche, il fait 400 + 666 = 1066px de large. Je l'ai mesuré : 1066 × 70, de x = −666 à 400 et de y = 150 à 220.

### 6. Le dégradé de body

body a le même fond, centré dans sa propre boîte : en (−666 + 533, 150 + 35) = (−133, 185). Son anneau va de x = −253 à −13. Il n'atteint jamais le canevas. Sur le canevas, body ne montre que son vert.

Cette bande verte couvre l'anneau de html de y = 150 à 220. Au-dessus, il reste la moitié haute de l'anneau : l'arche. Le trou de l'anneau de html s'arrête en y = 150 + 69,9 = 219,9, juste au-dessus du bord bas de la bande. Sous la bande, l'anneau est donc plein : une tranche de disque, de y = 220 à 270, et de x = 102,5 à 297,5 en haut.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `1q` fait deux choses en 2 caractères : il donne un cercle, et il place le dernier arrêt à 1q, si bien que cet arrêt remonte à 120px et donne un bord net. Avec `circle` à la place (98 caractères), le cercle va jusqu'au coin le plus loin, à 250px. Le dernier arrêt se place là, et le rose passe peu à peu au vert de 120px à 250px : 80 412 pixels changent. Sans aucune taille (91 caractères), le dégradé est une ellipse, avec le même fondu : 94 547 pixels changent. Avec `0` comme taille (93 caractères), mon Chrome peint tout le canevas en vert : 21 772 pixels changent.
- `#A443 0 15ch` donne deux positions à une couleur. Le `0` est la première position la plus courte : il remonte tout seul à 69,9px. `#A443 74q 15ch` donne la même image en 96 caractères. Sans le `0` (92 caractères), le rose arrive en fondu de 69,9px à 120px : 19 915 pixels changent.
- `#A443` fait 5 caractères. La couleur qu'il montre, `#eed9d9`, donne la même image en 96 caractères. Les majuscules ne coûtent rien : `#a443` donne la même image à la même longueur.
- Des unités courtes : `15ch` vaut 120px en 4 caractères. `120px` donne la même image en 95 caractères. `74q` vaut 69,9px en 3 caractères. `70px` (95 caractères) change 12 pixels.
- L'imbrication met la marge sur body et la garde loin de html. `body{margin:150 0 80-666}*{background:…` donne la même image en 97 caractères. Avec la marge dans la règle extérieure, `*{margin:150 0 80-666;background:…` (92 caractères), html la reçoit aussi, et mon Chrome peint tout le canevas en vert : 21 772 pixels changent.
- Des nombres seuls, et pas d'espace avant `-666` : `80 -666` donne la même image en 95 caractères.
- `-666` doit seulement pousser l'anneau de body hors du canevas. Avec `-640`, l'anneau s'arrête en x = 0, et l'image est la même.
- La marge du bas fixe le bord bas de la bande. Avec `0` à la place de `80` (93 caractères), body descend jusqu'à y = 300 et cache la tranche du bas : 6 828 pixels changent.
- L'espace insécable compte. Avec une espace simple (94 caractères) ou rien (93 caractères), l'analyseur garde le `<style>` dans head. Dans mon Chrome, html mesure alors 385 × 370, l'anneau se déplace, et 23 240 pixels changent.
- Le code s'arrête après la dernière couleur. La fin du code ferme le dégradé, les règles et l'élément style. Ajouter `)}` donne la même image en 96 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 406 pixels, avec la même règle que dans les notes de golf, de 136 au plus. Ils sont tous sur les deux cercles : 114 autour du trou et 292 au bord extérieur de l'anneau. Les aplats ont les mêmes couleurs. Mon rendu dessine ces cercles en marches nettes, sans couleur intermédiaire. La cible a des nuances intermédiaires à ces endroits : 34 couleurs, contre 3 dans mon rendu. Le juge de CSS Battle donne au code 100 % de correspondance.
