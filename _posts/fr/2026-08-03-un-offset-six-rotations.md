---
title: "Un offset, six rotations : un papillon en 124 caractères"
ref: 2026-08-03
permalink: /fr/2026/08/03/un-offset-six-rotations/
description: "Comment un seul offset:ray(45deg), donné à six boîtes imbriquées, dessine la cible CSS Battle du 3 août 2026 : chaque boîte tourne de 45° de plus que son parent, ce qui donne trois ellipses à 135°, 180° et 225° et une fente jaune verticale."
target: /assets/targets/2026-08-03.png
target_url: https://cssbattle.dev/play/K5tl2pHRpNXPbByrJmVW
colors: ["#415e88", "#f7ec7d"]
player: krhek
chars: 124
score: 722.68
match: 100
code: |
  <dl><dl><dl><p><style>dl{height:30;background:#415E88;border-radius:50%}*{padding:10 110;background:#F7EC7D;offset:ray(45deg
---

La cible du 3 août est un papillon bleu ardoise sur fond jaune. Il a six pétales pointus, trois de chaque côté, et une fine fente verticale au milieu. Wojciech Russek le dessine avec six boîtes imbriquées : html, body, trois `dl` et un `p`. Chacune reçoit `offset:ray(45deg`. Cela pose toutes les boîtes sur le même centre et fait tourner chacune de 45° de plus que son parent : les trois ellipses arrivent à trois angles différents, et le `p` finit vertical.

Cochez **Couleurs pédagogiques** pour suivre chaque boîte pendant qu'elle tourne.

{% include animations/2026-08-03.html lang=page.lang %}

## Le code, aéré

```css
<dl><dl><dl><p>               /* trois dl et un p, chacun dans le précédent */
<style>
dl {
  height: 30;                 /* 30 + 2 × 10 = 50px de haut */
  background: #415E88;        /* bleu : dl l'emporte sur * */
  border-radius: 50%;         /* une ellipse de 220 × 50 */
}
* {                           /* html, body, les dl, le p (et head, style) */
  padding: 10 110;            /* chaque boîte fait 0 + 2 × 110 = 220px de large */
  background: #F7EC7D;        /* jaune : le canevas, body et le p */
  offset: ray(45deg           /* centrée sur le parent, tournée de 45° vers la gauche */
```

## Comment ça marche

### 1. Six boîtes en chaîne

Il n'y a ni balise html, ni head, ni body dans le code : Chrome les ajoute. Un `<dl>` peut contenir un autre `<dl>`, donc les trois `dl` s'imbriquent. Le `p` va dans le troisième, et style dans le `p`. L'arbre est html › body › dl › dl › dl › p.

Un `p` ne peut pas faire ça : un second `<p>` ferme le premier. Avec `<p><p><p><p>`, body reçoit quatre paragraphes côte à côte dans l'arbre, et 12 281 pixels changent.

### 2. Les tailles viennent du padding

Il n'y a pas de doctype, donc la page est en mode quirks, et `10 110` et `30` sans unité se lisent en px.

html fait 400 × 300. Avec `padding:10 110`, sa boîte de contenu ne fait que 180 de large. body a sa marge par défaut de 8px et les mêmes 220px de padding : il ne reste aucune place, son contenu fait 0 de large. C'est pareil pour toutes les boîtes en dessous. Chaque boîte fait 0 + 2 × 110 = 220px de large.

Les hauteurs :

- chaque `dl` : `height:30` plus 2 × 10 de padding, 50px. Avec `border-radius:50%`, c'est une ellipse de 220 × 50 ;
- le `p` est vide : 0 + 2 × 10 = 20px ;
- body : le mode quirks l'étire pour remplir html, 300 − 2 × 10 − 2 × 8 = 264px.

### 3. offset centre chaque boîte

`offset` est une forme raccourcie. `offset:ray(45deg` règle `offset-path: ray(45deg)` et laisse le reste à sa valeur par défaut : distance 0, position `normal`, rotation `auto`.

Avec une distance de 0, le centre de la boîte est posé sur le départ du rayon. Avec la position `normal`, ce départ est le milieu du bloc conteneur, la boîte de contenu du parent.

- Le bloc conteneur de html est le canevas de 400 × 300 : son milieu est (200 ; 150), là où html se trouve déjà.
- Celui de body est la boîte de contenu de html, 180 × 280 en (110 ; 10) : son milieu est aussi (200 ; 150).
- Toutes les autres boîtes sont dans un parent dont la boîte de contenu fait 0 de large et se trouve en son centre. Son milieu est le centre du parent.

Les six centres tombent donc en (200 ; 150).

### 4. offset fait tourner chaque boîte, et les rotations s'ajoutent

Avec `offset-rotate: auto`, la boîte tourne dans la direction du chemin. `ray(45deg)` part vers le haut et la droite, à 45° du haut. Chaque boîte tourne donc de 45° dans le sens inverse des aiguilles d'une montre.

Chaque boîte tourne à l'intérieur de son parent, qui a déjà tourné :

- html : 45° ;
- body : 90° ;
- premier `dl` : 135° ;
- deuxième `dl` : 180°, de nouveau horizontal ;
- troisième `dl` : 225° ;
- `p` : 270°, vertical.

Les trois ellipses se croisent toutes en (200 ; 150). L'horizontale va de x = 90 à 310. Les deux diagonales vont de y = 70,2 à 229,8 : 150 ± √((110² + 25²) / 2) = 150 ± 79,8.

Chaque maillon compte. En ajoutant `html{offset:none}`, chaque angle perd 45° et 11 022 pixels changent. Avec un `dl` de moins, 6 818 pixels changent. En ajoutant `offset-rotate:0deg`, les boîtes restent centrées mais à plat, et 14 960 pixels changent.

### 5. Les couleurs et la fente

`dl` et `*` donnent tous les deux un fond. `*` vient après, mais un sélecteur de type l'emporte sur `*` : les `dl` restent bleus. Inverser les deux règles ne change rien.

Le fond jaune de html est peint sur tout le canevas, et il ne tourne pas. La boîte jaune de body, 264 × 220 à l'écran, est posée sur le même jaune : elle ne se voit pas.

Le `p` est jaune lui aussi, et il est peint après les `dl`. À 270°, c'est une bande verticale de 20 × 220, de x = 190 à 210 et de y = 40 à 260. Il découpe la fente dans les pétales. En ajoutant `p{display:none}`, 1 576 pixels changent.

## Notes de golf

- Une seule déclaration, `offset:ray(45deg`, centre et fait tourner chaque boîte. Pas de `position`, pas de `margin`, pas de `transform`.
- Chaque boîte ne dit que 45°. L'imbrication en fait 45°, 90°, 135°, 180°, 225° et 270°.
- Chrome ajoute html et body gratuitement : deux des six maillons ne coûtent rien. Le code écrit quatre balises, `<dl><dl><dl><p>`, 16 caractères, et n'en ferme aucune.
- `padding:10 110` dimensionne toutes les boîtes d'un coup : 220 de large pour toutes, 20 de plus en hauteur. Seuls les `dl` ont besoin d'une `height`. Le même 10 donne au `p` ses 20px, la largeur de la fente.
- `dl` est une balise de deux lettres qui peut se contenir elle-même. `p` tient en une lettre, et prend son jaune dans `*`.
- Les nombres n'ont pas d'unité : le mode quirks les lit en px. Avec `<!doctype html>` devant, ils sont ignorés, le papillon disparaît, et 17 989 pixels changent.
- `ray(45deg`, la règle `*{` et l'élément style restent ouverts. Avec `)}`, le code fait 126 caractères ; avec `)}</style>`, 134. Le rendu est le même.

## Si vous l'essayez chez vous

Dans mon Chrome, les bords droits de la fente tombent sur les mêmes pixels que dans la cible. Sur les bords courbes, 771 pixels diffèrent de plus de 8 sur un canal. Tous touchent un bord. Mesurés à la part de bleu de chaque pixel, les pétales de la cible sont environ 0,25px plus haut et 0,15px plus à gauche que les miens. Le juge de CSS Battle donne au code 100 % de correspondance.
