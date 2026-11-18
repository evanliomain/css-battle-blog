---
title: "Deux images en U et une bande par-dessus : quatre pièces jaunes en 172 caractères"
ref: 2026-06-10
permalink: /fr/2026/06/10/deux-images-en-u-et-une-bande/
description: "Comment deux images vides deviennent des U jaunes, comment l'une est retournée, comment un clip-path arrondit leur haut, et comment un paragraphe pose une bande sombre sur les deux, dans la cible CSS Battle du 10 juin 2026."
target: /assets/targets/2026-06-10.png
target_url: https://cssbattle.dev/play/UyIHaMHngnvBrD7ecqUs
colors: ["#4c4c6b", "#fae29e"]
player: selenit
chars: 172
score: 677.64
match: 100
code: |
  <img><img><p><style>*{background:#4C4C6B;height:30}img{+*{scale:-1}border:solid#FAE29E;border-width:0 55 40;padding:65 15;margin:42 8-34%32;clip-path:inset(0 0-50%round 1in
---

La cible du 10 juin montre quatre pièces jaune pâle sur un fond violet sombre : un dôme fendu, un bloc avec une encoche, un rectangle avec une encoche et un demi-disque fendu. Ilya Streltsyn les dessine avec deux images vides et un paragraphe. Chaque image est un U jaune fait de bordures, avec un dôme découpé par un clip-path. La deuxième image est retournée. Le paragraphe est une bande sombre qui coupe les deux images en deux.

Utilisez les **Couleurs pédagogiques** pour distinguer les deux images, leur propre fond et la bande, et la **Vue large** pour voir jusqu'où va le clip-path.

{% include animations/2026-06-10.html lang=page.lang %}

## Le code, aéré

```css
<img><img><p><style>
* {                                  /* html, head, body, img, img, p, style */
  background: #4C4C6B;               /* celui de html passe à tout le canevas */
  height: 30;                        /* contenu des img et p : 30px de haut */
}
img {
  + * {                              /* img + * : la 2e img et le p */
    scale: -1;                       /* demi-tour */
  }
  border: solid#FAE29E;
  border-width: 0 55 40;             /* rien en haut, 55 sur les côtés, 40 en bas */
  padding: 65 15;                    /* largeur 0 : 140 × 200 en tout */
  margin: 42 8-34%32;                /* 42, 8, −34 % (−130,55), 32 */
  clip-path: inset(0 0-50%round 1in  /* 100px plus bas, coins 96 → 70 */
```

## Comment ça marche

### 1. Les éléments

Les pages de CSS Battle n'ont pas de doctype, elles sont donc en mode quirks, et un nombre seul comme `55` y est lu en px.

`<img><img><p>` met deux images et un paragraphe dans body. `<style>` arrive pendant que le p est encore ouvert : il finit dedans. head et style ne sont pas affichés.

`*` leur donne à tous le même fond sombre et `height:30`. html ne fait que 400 × 30, mais le fond de html sert pour tout le canevas. C'est le violet sombre. body garde sa marge de 8px : il fait 384 × 30 en (8, 8).

### 2. Un U fait de bordures

Une img sans src n'a pas de taille à elle. Avec `height:30`, Chrome lui donne une largeur de 0 : `getComputedStyle` dit `0px`. Sa boîte n'est donc que bordures et padding :

- largeur : 55 + 15 + 0 + 15 + 55 = 140 ;
- hauteur : 0 + 65 + 30 + 65 + 40 = 200.

La bordure est jaune, sans côté du haut. Elle dessine un U : deux barres de 55px et une barre de 40px en bas. Entre les barres, les 30px de padding et de contenu montrent le fond de l'image, de la même couleur sombre que le canevas. C'est le creux de chaque pièce.

### 3. Deux images sur une ligne

Les images sont en ligne, côte à côte sur une seule ligne. `margin:42 8-34%32` se lit comme quatre valeurs : 42 en haut, 8 à droite, −34 % en bas, 32 à gauche. Le signe moins commence un nouveau nombre, et le chiffre après `%` aussi.

- La première image commence en x = 8 + 32 = 40, y = 8 + 42 = 50.
- La deuxième vient après la marge droite de la première et sa propre marge gauche : 40 + 140 + 8 + 32 = 220.

Les deux boîtes font 140 × 200, en (40, 50) et (220, 50).

Une marge en % est une part de la largeur du parent, même en bas. body fait 384px de large : la marge du bas vaut −130,55px. La ligne finit là où finissent les boîtes de marge des images : 50 + 200 − 130,55 = 119,45.

### 4. Le miroir

`+*` dans `img` veut dire `img + *` : un élément juste après une img. C'est la deuxième image, et le p.

`scale:-1` multiplie les deux axes par −1 : un demi-tour autour du centre de la boîte. La deuxième image tourne autour de (290, 150). Sa barre de 40px passe en haut, et son creux s'ouvre maintenant vers le bas.

### 5. Les dômes

`clip-path:inset(0 0-50%round 1in)` ne garde que ce qui est dans un rectangle arrondi. Trois valeurs : 0 en haut, 0 sur les deux côtés, −50 % en bas. −50 % des 200px de haut, c'est −100 : le rectangle descend 100px sous la boîte. Il fait 140 × 300.

`round 1in` demande des coins de 96px. Deux coins côte à côte demandent 192px, et la boîte ne fait que 140 de large. Chrome réduit donc tous les coins du même facteur, à 70 : deux coins font un demi-cercle. Le haut de l'image devient un dôme, centré sur (110, 120). Les coins du bas sont 100px sous la boîte, où l'image ne dessine rien : le bas reste carré.

Le clip-path s'applique avant le miroir. Sur la deuxième image, le dôme finit en bas.

### 6. La bande

Le p est un bloc. Il vient après la ligne d'images, en 119,45, plus sa marge du haut par défaut de 16px : il commence en y = 135,45. Il fait 384 × 30 : il couvre les images de y = 135,45 à 165,45. Il coupe la première image en un dôme et un bloc à encoche, et la deuxième en un rectangle à encoche et un demi-disque.

Le p a aussi reçu `scale:-1`. Un demi-tour sur un simple rectangle ne change rien de visible. Mais un p avec une transformation est peint après le flux normal, dans l'ordre du document : il passe par-dessus les deux images. Sans elle, le fond d'un bloc ordinaire est peint sous les images. J'ai vérifié : avec `+img` à la place de `+*`, la bande disparaît. Avec `+img` et `p{position:relative}`, qui fait aussi passer le p à cette étape de peinture plus tardive, la bande revient.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle `*` fait quatre choses : la couleur du canevas, le creux sombre dans chaque image, la bande sombre, et les 30px de hauteur des images comme du p.
- Une img sans src fait 0 de large : sa taille vient de ses seules bordures et de son padding, sans `width`.
- `+*` atteint la deuxième image et le p avec un seul sélecteur, et le p a besoin de son scale pour être peint par-dessus. Avec `+img` (174 caractères), la bande disparaît : 6 600 pixels changent. Sans le p du tout (169 caractères), les mêmes 6 600 pixels changent.
- La marge par défaut de 16px du p place la bande gratuitement, juste sous la ligne.
- `-34%` permet au nombre suivant de venir sans espace. `margin:42 8-131 32` donne la même image en 173 caractères.
- La même astuce sert dans le clip-path : `-50%round` se passe d'espace. `-1in round` donne la même image en 173 caractères. Sans l'espace, `-1inround` (172 caractères) se lit comme une seule unité inconnue, tout le clip-path est ignoré, et les coins restent carrés : 4 365 pixels changent.
- Tout rayon de 70px ou plus donne le même demi-cercle. `1in` tient en 3 caractères. `round 70px` donne la même image en 173.
- Le bas à −50 % garde les coins du bas hors de la boîte. Avec `inset(0 round 1in` (167 caractères), le bas de chaque image est arrondi lui aussi : 4 370 pixels changent.
- Pas besoin d'espace dans `solid#FAE29E`, `8-34%32` ni `0 0-50%round`. `inset(0 0 -50% round 1in` donne la même image en 174 caractères.
- Les balises fermantes, l'accolade de la règle `img` et la parenthèse de `inset(` sont omises. La fin du code les ferme.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 343 pixels, avec la même règle que dans les notes de golf, de 123 au plus. Tous sont sur les deux bords courbes : 179 autour du dôme en haut à gauche, 164 autour du demi-disque en bas à droite. Les bords droits et les aplats sont les mêmes. La cible a 34 couleurs différentes, mon rendu 130. Le juge de CSS Battle donne au code 100 % de ressemblance.
