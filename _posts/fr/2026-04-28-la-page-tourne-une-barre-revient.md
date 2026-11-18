---
title: "La page tourne, une barre revient : un H gris en 124 caractères"
ref: 2026-04-28
permalink: /fr/2026/04/28/la-page-tourne-une-barre-revient/
description: "Comment trois paragraphes, empilés à plat avec des marges négatives qui fusionnent, deviennent un H gris quand html fait un quart de tour et que celui du milieu revient à l'horizontale, dans la cible CSS Battle du 28 avril 2026."
target: /assets/targets/2026-04-28.png
target_url: https://cssbattle.dev/play/uSfVqzY6VFAZUkXfnmQn
colors: ["#d6924e", "#d9d9d9", "#000"]
player: koda_pig
chars: 124
score: 722.68
match: 100
code: |
  <p> <p x> <p> <style>&,[x]{rotate:90deg;background:#C72C;p{scale:1.111;background:#D9D9D9;margin:212 84-328;border:9px solid
---

La cible du 28 avril est un H gris cerné de noir sur un fond orange : deux barres verticales et une traverse qui dépasse un peu des deux côtés. koda_pig la dessine avec trois paragraphes, empilés à plat. Un seul `rotate:90deg` sur html les met tous à la verticale. Celui du milieu a son propre `rotate:90deg`, alors il revient à plat : c'est la traverse.

Avec **Couleurs pédagogiques**, chaque paragraphe prend sa propre couleur. **Vue large** montre la boîte de html pendant qu'elle tourne.

{% include animations/2026-04-28.html lang=page.lang %}

## Le code, aéré

```css
<p>&nbsp;<p x>&nbsp;<p>&nbsp;   /* trois paragraphes, chacun avec une espace insécable */
<style>
&,                      /* & tout en haut de la feuille : la racine, html */
[x] {                   /* et le p du milieu */
  rotate: 90deg;        /* html : un quart de tour ; p x : un de plus */
  background: #C72C;    /* html : le canevas ; p x : battu par la règle d'en dessous */
  p {                   /* tous les p dans html : les trois */
    scale: 1.111;       /* 216 × 36 → 240 × 40, bordure 9 → 10 */
    background: #D9D9D9;
    margin: 212 84-328; /* 212 en haut, 84 sur les côtés, −328 en bas */
    border: 9px solid   /* sans couleur : noire, la couleur du texte */
/* la fin du code ferme les deux règles */
```

## Comment ça marche

### 1. Trois paragraphes qui contiennent quelque chose

Il n'y a pas de doctype : la page est en mode quirks. Un nombre seul, comme `212` dans une marge, est lu en px.

Le HTML est `<p>`, `<p x>` et `<p>`, chacun suivi d'une espace insécable, pas d'une espace ordinaire. Le navigateur ne les supprime pas : chacune est du texte dans un p. Un `<p>` ferme celui qui est ouvert, donc les trois p sont frères dans body, et `<style>` atterrit dans le troisième. Chaque p contient une ligne de texte, de 18px de haut dans mon Chrome.

### 2. Deux sélecteurs, une règle imbriquée

Tout en haut d'une feuille de style, `&` désigne la racine : html. Donc `&,[x]` vise html et le p du milieu, celui qui a l'attribut `x`. Les deux reçoivent `rotate:90deg` et `background:#C72C`.

Le `p{` imbriqué veut dire « un p dans html, ou dans p x ». Les trois p sont dans html : les trois reçoivent le fond gris, la marge, la bordure et le scale.

p x reçoit deux fonds : `#C72C` par `[x]`, et `#D9D9D9` par la règle imbriquée. La règle imbriquée est plus précise : un attribut et un nom de balise, contre un attribut seul. Son fond calculé est `rgb(217, 217, 217)` : le gris gagne.

### 3. Le fond de html, c'est le canevas

`#C72C` est une couleur hexadécimale courte avec un chiffre d'opacité : `#cc7722` à 204 / 255 = 80 %. html est la racine : son fond peint tout le canevas, par-dessus le blanc. 204 × 0,8 + 255 × 0,2 = 214,2 : dans mon rendu, le canevas est (214, 146, 78).

### 4. Trois barres de 216 × 36

Avant toute transformation, chaque p est une barre à plat :

- largeur : body garde ses marges de 8px, et chaque p a 84px de chaque côté : 400 − 2 × (8 + 84) = 216, de x = 92 à 308 ;
- hauteur : la ligne de 18px plus deux bordures de 9px : 36.

La bordure n'a pas de couleur : elle prend celle du texte, le noir.

### 5. Des marges qui fusionnent

`margin:212 84-328` a trois valeurs : 212 en haut, 84 sur les côtés, −328 en bas. `84-328` n'a pas besoin d'espace : le `-` commence un nouveau nombre.

Les marges verticales de deux blocs voisins fusionnent en une seule. Entre deux p, une marge basse de −328 rencontre une marge haute de 212 : il en reste 212 − 328 = −116. Chaque p commence donc 116px avant la fin du précédent.

La marge haute du premier p fusionne aussi avec les 8px de body : dans mon Chrome, son offsetTop vaut 212. Puis 212 + 36 − 116 = 132 pour p x, et 132 + 36 − 116 = 52 pour le dernier p. Leurs centres sont en y = 230, 150 et 70, à 80px l'un de l'autre. Les trois sont centrés sur x = 200.

### 6. scale:1.111

`scale` agrandit chaque p autour de son propre centre. 1,111, c'est presque 10/9 :

- 216 × 1,111 = 239,976 de large ;
- 36 × 1,111 = 39,996 de haut ;
- 9 × 1,111 = 9,999 pour la bordure.

Une seule déclaration donne trois mesures presque rondes : 240 × 40, avec une bordure de 10.

### 7. html fait un quart de tour

En mode quirks, html fait 400 × 300. `rotate:90deg` le fait tourner autour de son centre, (200, 150), dans le sens horaire, et tout ce qu'il contient tourne avec lui. getBoundingClientRect donne à html la boîte (50, −50) à (350, 350).

Un point qui était sous le centre passe à sa gauche. Le premier p, centré en (200, 230), arrive en (120, 150). p x reste en (200, 150). Le dernier p, centré en (200, 70), arrive en (280, 150). Les barres sont maintenant verticales, 40 de large et 240 de haut : le premier p de x = 100 à 140, le dernier de x = 260 à 300, les deux de y = 30 à 270.

La couleur du canevas ne tourne pas. Elle est peinte sur tout le canevas, pas dans la boîte de html.

### 8. Le p du milieu revient

p x a aussi son propre `rotate:90deg`. Avec celui de html, cela fait 180deg : une barre à plat tournée de 180deg est de nouveau à plat. p x va de x = 80 à 320 et de y = 130 à 170 : c'est la traverse.

Chaque p a une transformation : chacun est peint comme un calque à part, dans l'ordre du code. p x est peint par-dessus le premier p, et le dernier p par-dessus p x. C'est pour ça que la traverse cache l'intérieur de la barre de gauche, alors que la barre de droite reste entière et que le bout de la traverse dépasse derrière elle.

Le sens compte. Avec `rotate:-90deg` (125 caractères), le premier p part à droite et le dernier à gauche : la barre de gauche est alors peinte par-dessus la traverse, la traverse par-dessus la barre de droite, et 1 600 pixels changent.

## Notes de golf

Plus bas, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&,[x]` écrit `rotate:90deg` une seule fois pour deux boîtes. Avec `&{` pour html et `}}[x]{rotate:90deg` à la fin (138 caractères), l'image est la même.
- p x reçoit aussi `background:#C72C`, sans rien coûter : la règle imbriquée le bat. C'est l'imbrication qui lui permet de le battre. Avec `}p{` au lieu de `;p{` (même longueur), `p` devient une règle de premier niveau, moins précise que `[x]`. p x garde l'orange translucide : son intérieur devient d'un orange plus foncé, (206, 124, 42), la barre de gauche se voit au travers, et 3 600 pixels changent.
- `#C72C` fait 5 caractères. La couleur opaque qu'il donne, `#d6924e` (126 caractères), dessine la même image.
- La bordure n'a pas de couleur : le noir vient de la couleur du texte. Avec `solid#000` (128 caractères), l'image est la même.
- `84-328` n'a pas besoin d'espace. Avec `84 -328` (125 caractères), l'image est la même.
- Les espaces insécables font 1 caractère chacune, comme une espace ordinaire, mais le navigateur les garde. Avec des espaces ordinaires (124 caractères), les p sont vides : pas de ligne, seulement leurs deux bordures, 18px de haut. On obtient trois barres noires, à 98px l'une de l'autre au lieu de 80, et 27 320 pixels changent. Sans rien entre les balises (121 caractères), les mêmes 27 320 pixels changent.
- `scale:1.111` règle la largeur, la hauteur et la bordure d'un coup. Sans lui (112 caractères), les barres restent à 216 × 36 avec des bordures de 9px, et 7 656 pixels changent. Avec `1.11` (123 caractères), 360 pixels changent, sur les bords des bordures : en (120, 30), la ligne du haut de la barre de gauche est (25, 24, 23) au lieu de (2, 2, 2).
- Les nombres seuls ont besoin du mode quirks. Avec `<!doctype html>` devant (139 caractères), la marge est ignorée : chaque p garde sa marge par défaut, 16px en haut et en bas, et 46 160 pixels changent.
- Les deux règles restent ouvertes, et il n'y a pas de `</style>`. Avec `}}` (126 caractères), l'image est la même.
