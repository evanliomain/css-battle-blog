---
title: "Deux coins arrondis et un miroir : un K feuillu en 131 caractères"
ref: 2026-06-12
permalink: /fr/2026/06/12/deux-coins-arrondis-et-un-miroir/
description: "Comment les marges placent une barre jaune et deux paragraphes, comment un rayon trop grand sur deux coins opposés fait de chaque paragraphe une feuille, et comment scale:1-1 retourne la deuxième, dans la cible CSS Battle du 12 juin 2026."
target: /assets/targets/2026-06-12.png
target_url: https://cssbattle.dev/play/M2KEnIkEKWN35WaC6pzf
colors: ["#317080", "#f5bb60"]
player: eguiluz
chars: 131
score: 714.77
match: 100
code: |
  <p><p><style>&{background:#267e;margin:-10 207 0 97;*{background:#f5bb60;*{padding:50;border-radius:2in 0;margin:40 90;+*{scale:1-1
---

La cible du 12 juin montre un K jaune sur fond bleu-vert : une haute barre à gauche, et deux feuilles pointues à sa droite, une en haut et une en bas. David Eguiluz fait la barre avec body et chaque feuille avec un paragraphe. Un grand rayon sur deux coins opposés fait d'un carré une feuille, et `scale:1-1` met la deuxième feuille à l'envers.

Utilisez la **Vue large** pour voir la boîte de html, qui commence au-dessus du canevas, et les **Couleurs pédagogiques** pour distinguer body des deux paragraphes.

{% include animations/2026-06-12.html lang=page.lang %}

## Le code, aéré

```css
<p><p>
<style>
& {                          /* html */
  background: #267e;         /* #226677 à 93 % : #317080 sur la page */
  margin: -10 207 0 97;      /* 96px de large, haut en y = −10 */
  * {                        /* body, les deux p (head et style sont cachés) */
    background: #f5bb60;
    * {                      /* les deux p */
      padding: 50;           /* carrés de 100 × 100 */
      border-radius: 2in 0;  /* 192px, ramenés à 100px : une feuille */
      margin: 40 90;         /* x = 195, y = 30 et 170 */
      + * {                  /* le deuxième p */
        scale: 1-1           /* scale(1, −1) : à l'envers */
```

## Comment ça marche

### 1. Les éléments

`<p><p>` ouvre deux paragraphes. Un nouveau `<p>` ferme le précédent : ils sont frères. Le navigateur ajoute html, head et body autour. `<style>` arrive pendant que le deuxième p est encore ouvert : il finit dedans. La page est html > head + body > p + p > style.

Au premier niveau d'une feuille de style, `&` désigne la racine de la page : html, et seulement lui.

### 2. Le fond

`#267e` est une couleur hexadécimale courte avec un chiffre d'opacité : `#226677`, et `ee` pour l'opacité, 238 / 255 = 93,3 %. html est l'élément racine : son fond couvre tout le canevas, et Chrome le peint par-dessus du blanc. 34 × 0,933 + 255 × 0,067 = 48,8 : le rouge vaut 49, `31` en hexadécimal. Le vert et le bleu donnent `70` et `80`. Sur la page, le fond est `#317080`.

### 3. La boîte de html

Les pages de CSS Battle n'ont pas de doctype, elles sont donc en mode quirks, et un nombre seul comme `207` y est lu en px. `margin:-10 207 0 97` laisse à html 400 − 97 − 207 = 96px de large, de x = 97 à 193. Son haut est en y = −10, 10px au-dessus du canevas. Dans mon rendu, sa boîte fait 96 × 320 en (97, −10). html ne peint rien dans cette boîte : son fond est déjà sur toute la page. La boîte sert seulement à placer body.

### 4. La barre : body

Le `*` imbriqué touche tous les éléments dans html : head, body, les deux p et style. Tous reçoivent `#f5bb60`. head et style restent cachés : le jaune se voit sur body et sur les deux p.

body garde sa marge par défaut de 8px. Dans les 96px de html, il fait 96 − 16 = 80px de large, de x = 105 à 185 : la barre.

Son haut vient du premier p. body n'a ni padding ni bordure : sa marge du haut et celle du premier p fusionnent en une seule, et la plus grande gagne, 40px. body commence en −10 + 40 = 30. Sa hauteur est celle de son contenu : 100 + 40 + 100 = 240, jusqu'à y = 270. La marge du bas du deuxième p sort par le bas de body de la même façon.

html a son propre fond : celui de body n'est pas reporté sur la page. body peint son jaune dans sa propre boîte : la barre de 80 × 240.

### 5. Deux carrés

Le `*` suivant touche les éléments placés dans un élément de html : les deux p, et style, caché. `padding:50` donne à chaque p 50px de chaque côté : un carré de 100 × 100.

`margin:40 90` met 40px en haut et en bas, 90px à gauche et à droite. La largeur qui reste pour le contenu vaut 80 − 90 − 90 = −100. Une largeur ne peut pas être négative : elle vaut 0, et la marge de droite est ignorée. La marge de gauche pousse les carrés en x = 105 + 90 = 195, 10px après la barre. Ils dépassent de body à droite, et body ne les coupe pas.

En hauteur, les marges de 40px fusionnent aussi entre les deux carrés : le premier va de y = 30 à 130, le deuxième de y = 170 à 270.

### 6. Une feuille

`border-radius:2in 0` donne 2in = 192px aux coins en haut à gauche et en bas à droite, et 0 aux deux autres. 192px ne tient pas dans un côté de 100px. Quand deux rayons d'un même côté dépassent ensemble la longueur du côté, le navigateur réduit tous les rayons du même facteur : ici 100 / 192. Les deux rayons passent à 100px.

Un quart de cercle de 100px dans un carré de 100px va d'un coin au coin opposé. L'arc du haut à gauche et celui du bas à droite relient tous deux le coin en bas à gauche au coin en haut à droite. Entre les deux : une feuille, de (195, 130) à (295, 30).

### 7. La deuxième feuille, à l'envers

`+*` dans la règle des p veut dire : l'élément juste après un p. Seul le deuxième p vient juste après un p. `scale:1-1` se lit comme deux nombres, `1` et `-1` : le signe moins commence un nouveau nombre, pas besoin d'espace. `scale(1, −1)` retourne le deuxième p de haut en bas, autour de son centre. Sa boîte reste en (195, 170), mais sa feuille va maintenant du coin en haut à gauche au coin en bas à droite, comme le bras du bas d'un K.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `#267e` tient en 5 caractères. La couleur qu'il donne, `#317080`, donne la même image en 133 caractères. Sans le chiffre d'opacité, `#267` (130 caractères) est le `#226677`, plus sombre : tout le fond change de couleur, et 89 386 pixels changent.
- `&` ne touche que html. Avec `*` à la place (même longueur), body reçoit aussi les marges de html : sa largeur tombe à 0, la barre disparaît, les feuilles partent en x = 284 et remontent en y = 20, et 42 524 pixels changent.
- La marge du haut de `-10` permet à une seule marge de 40px de faire deux choses : 30px depuis le haut du canevas, et 40px entre les feuilles. Avec `0` (129 caractères), tout descend de 10px, et 6 173 pixels changent.
- Rien n'est écrit pour la taille de body : sa marge par défaut de 8px le rend 16px plus étroit que html. Rien non plus pour la largeur des p : les marges la font tomber à 0.
- Les nombres seuls sont lus en px en mode quirks. Avec `px` sur chaque longueur (143 caractères), l'image est la même.
- Tout rayon de 100px ou plus donne la même feuille, car il est ramené à 100px. `100px 0` donne la même image en 133 caractères, et `100%0` avec les mêmes 131. `1in 0` vaut 96px, c'est trop peu : les arcs s'arrêtent 4px avant les coins pointus, et 1 276 pixels changent.
- `scale:1-1` se passe d'espace. `scale:1 -1` donne la même image en 132 caractères.
- Sans `+*{scale:1-1` (119 caractères), la feuille du bas pointe dans le même sens que celle du haut, et 5 382 pixels changent.
- Les balises fermantes sont omises. `<p></p><p>` donne la même image en 135 caractères. La fin du code ferme les blocs restés ouverts.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 606 pixels, avec la même règle que dans les notes de golf. Ils sont tous sur les bords des deux feuilles : 316 sur celle du haut, 290 sur celle du bas. La barre et les aplats de couleur sont les mêmes. Le juge de CSS Battle donne au code 100 % de ressemblance.
