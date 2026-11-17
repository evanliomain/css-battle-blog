---
title: "Bleu sur bleu : six pilules encochées en 151 caractères"
ref: 2026-08-16
permalink: /fr/2026/08/16/bleu-sur-bleu/
description: "Comment trois boîtes dt invisibles, leurs deux ombres et un p trop large de la couleur du fond dessinent les six pilules encochées de la cible CSS Battle du 16 août 2026."
target: /assets/targets/2026-08-16.png
target_url: https://cssbattle.dev/play/SSYv7g49QSFpWX8VVeXf
colors: ["#6592cf", "#243d83"]
player: levito
chars: 151
score: 694.85
match: 100
code: |
  <dt><p><dt><p><dt><p><style>*{margin:.7%24%20;padding:10;border-radius:1in;background:#6592CF}dt{box-shadow:-35vh 0,35vh 0;color:243D83}p{margin:15-105
---

La cible du 16 août montre six pilules bleu foncé sur un fond bleu plus clair, en deux colonnes de trois. Chaque pilule a une encoche arrondie : celles de gauche s'ouvrent vers la droite, celles de droite vers la gauche. Veit Lehmann les dessine avec trois boîtes `dt` du même bleu que le fond. Chaque dt projette deux ombres sombres, une de chaque côté. Le `p` de chaque dt est étiré par des marges négatives jusqu'à ce que ses bouts tombent sur les ombres, et son fond bleu creuse les encoches.

Cochez **Couleurs pédagogiques** pour voir les boîtes bleu sur bleu, et passez en **Vue large** pour voir html et body dépasser du bas du canevas.

{% include animations/2026-08-16.html lang=page.lang %}

## Le code, aéré

```css
<dt><p><dt><p><dt><p>            /* trois dt, chacun avec un p dedans */
<style>
* {                              /* html, body, dt, p */
  margin: .7% 24% 20;            /* haut, gauche et droite, bas */
  padding: 10;
  border-radius: 1in;            /* 96px : chaque boîte devient une pilule */
  background: #6592CF;           /* le canevas, et chaque boîte */
}
dt {
  box-shadow:
    -35vh 0,                     /* une copie 105px à gauche */
    35vh 0;                      /* une copie 105px à droite */
  color: 243D83;                 /* sans # : le mode quirks l'accepte */
}
p {
  margin: 15 -105                /* 15px au-dessus et en dessous, −105px à gauche et à droite */
```

## Comment ça marche

### 1. Trois dt, chacun avec un p

Le parseur HTML ferme un `dt` ouvert quand un nouveau `<dt>` commence. Un `<p>` placé dans un dt y reste. Les six balises donnent donc trois dt, l'un sous l'autre dans body, chacun avec un p pour enfant. J'ai vérifié l'arbre dans Chrome : body > dt > p, trois fois. L'élément `<style>` finit dans le dernier p, mais il ne s'affiche pas.

Il n'y a pas de doctype : la page est en mode quirks. Les nombres sans unité, comme `padding:10`, sont lus en px. Et `color:243D83` est une couleur hexadécimale sans `#`, que le mode quirks accepte pour `color`. J'ai vérifié avec `<!doctype html>` devant : les marges et le padding sont ignorés, les boîtes font 0px de haut, et le canevas est tout bleu.

### 2. Des marges en % qui rétrécissent à chaque niveau

La règle `*` donne la même marge à html, à body et à chaque dt : `.7% 24% 20`. Une marge en % est une part de la largeur du bloc parent, même en haut. Chaque niveau a donc des marges plus petites que le précédent.

- html est dans le canevas de 400px : 24 % font 96px à gauche et à droite, 0,7 % font 2,8px en haut. html fait 400 − 2 × 96 = 208px de large.
- Avec 10px de padding de chaque côté, le contenu de html fait 188px de large. Pour body, 24 % de 188 font 45,11px, et 0,7 % font 1,31px. body fait 97,78px de large, à partir de x = 151,11.
- Le contenu de body fait 77,78px de large. Pour chaque dt, 24 % de cette largeur font 18,66px, et 0,7 % font 0,53px. Chaque dt fait 40,47px de large, de x = 179,77 à 220,23.

En haut, les marges et les paddings s'ajoutent : 2,8 + 10 + 1,31 + 10 + 0,53 = 24,64. Le premier dt commence en y = 24,64. Ce sont les valeurs que j'ai mesurées avec getBoundingClientRect.

html et body sont plus hauts que le canevas. body finit en y = 304,64, html en y = 334,64. Rien ne se voit : le fond de html peint tout le canevas, et body est du même bleu.

### 3. Un dt fait 70px de haut

Le p est vide : sa hauteur ne vient que de son padding, 10 + 10 = 20px. La règle `p` l'emporte sur la règle `*`, donc le p reçoit `margin:15 -105` : 15px au-dessus et en dessous. Le dt a 10px de padding, donc ces marges restent dedans. Le dt fait 10 + 15 + 20 + 15 + 10 = 70px de haut.

La marge du bas d'un dt fait 20px, et la marge du haut du suivant 0,53px. Les deux marges fusionnent en la plus grande, 20px. Les dt commencent donc en y = 24,64, 114,64 et 204,64.

### 4. Chaque boîte est une pilule

`border-radius:1in` vaut 96px. Un dt ne fait que 40,47px de large : les coins se chevaucheraient. Chrome réduit alors les rayons jusqu'à ce qu'ils tiennent : 40,47 / 2 = 20,23px. Chaque dt devient une pilule : deux demi-disques et deux côtés droits. Le p fait 20px de haut : son rayon tombe à 10px, ses bouts sont aussi des demi-disques.

J'ai vérifié : avec `border-radius:20.234375px` sur les dt et `10px` sur les p, le rendu est le même, au pixel près.

Toutes ces boîtes sont #6592CF sur un canevas #6592CF. Rien ne se voit encore.

### 5. Deux ombres par dt

Une ombre box-shadow est une copie de la boîte, déplacée de ses décalages, avec les mêmes coins arrondis. `35vh`, c'est 35 % des 300px de hauteur du canevas : 105px. Chaque dt a donc une copie 105px à gauche, de x = 74,77 à 115,23, et une 105px à droite, de x = 284,77 à 325,23.

Les ombres n'ont pas de couleur : elles prennent `currentColor`. C'est `color:243D83`, posé sur les dt. Trois dt avec deux ombres chacun : six pilules sombres.

### 6. Les encoches

`margin:15-105` se lit `15` et `-105`. Une marge gauche ou droite négative élargit une boîte qui n'a pas de largeur fixée. Le contenu du dt fait 20,47px de large, et le p dépasse de 105px de chaque côté : 20,47 + 210 = 230,47px de large, de x = 84,77 à 315,23. Il fait 20px de haut, 25px sous le haut de son dt.

L'ombre d'une boîte est peinte avec le fond de cette boîte. Le p vient après son dt : son fond est donc peint par-dessus les ombres du dt. Je l'ai vérifié avec un fond rouge sur le p : la barre rouge recouvre les deux pilules sombres.

Sur l'ombre de gauche, la barre commence en x = 84,77 par un bout arrondi et dépasse le bord droit de la pilule, en 115,23. Sur l'ombre de droite, elle entre par le bord gauche, en 284,77, et s'arrête en 315,23 par un bout arrondi. Les deux encoches font 30,47px de profondeur et 20px de haut. Le reste de la barre est bleu sur bleu.

## Notes de golf

- `<dt>` est une balise de deux lettres qui se ferme toute seule quand la suivante commence, et elle peut contenir un p. Avec `<dd>` et `dd{`, le code a la même longueur et donne le même rendu.
- Une seule règle `*` donne la marge, le padding, le rayon et la couleur à html, body, dt et p d'un coup. Les marges en % font le centrage, niveau après niveau.
- Les signes `%` terminent les nombres : `.7%24%20` n'a pas besoin d'espaces. Avec des espaces, le code fait 153 caractères.
- `.7%` descend tout de 4,64px sur trois niveaux, en 3 caractères. Avec `margin:0 24%20` (150 caractères), chaque pilule commence en y = 20 au lieu de 25.
- `35vh` vaut 105px en 4 caractères. Avec `105px`, le code fait 153 caractères.
- `1in` vaut 96px en 3 caractères, et il faut une unité. `border-radius:99` est ignoré : les pilules et les encoches ont des coins carrés.
- `color:243D83` n'a pas besoin de `#` en mode quirks. Avec `#243D83`, le code fait 152 caractères et donne le même rendu.
- Le signe moins sépare les valeurs dans `15-105`. Avec une espace, le code fait 152 caractères.
- Le `</style>` et la dernière accolade fermante sont omis. Avec `}`, le code fait 152 caractères ; avec `}</style>`, 160. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), les bords droits tombent sur les mêmes pixels que dans la cible. Mais 1 411 pixels diffèrent de mon rendu. 681 d'entre eux diffèrent de plus de 8 niveaux, et tous sont sur les bords arrondis des pilules et des encoches. Le plus grand écart est de 69 niveaux, en (89 ; 51), sur le bout arrondi de l'encoche en haut à gauche : mon rendu y est presque bleu foncé, (44, 72, 141), et la cible presque bleu clair, (97, 141, 202). 346 autres pixels, loin des pilules, diffèrent d'un niveau. Ils dessinent le contour de body et des trois dt, qui ont le même bleu que le canevas ; dans la cible, cette zone est unie. Sur le juge de CSS Battle, le code est identique à 100 %.
