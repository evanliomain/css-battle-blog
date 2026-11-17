---
title: "Un dégradé, trois rayons emboîtés : une bouée en 127 caractères"
ref: 2026-07-25
permalink: /fr/2026/07/25/un-degrade-trois-rayons-emboites/
description: "Comment un seul dégradé radial dessine l'anneau blanc sur html et les blocs bruns sur trois bandes emboîtées, chacune tournée de 45° par offset:ray(45deg), dans la cible CSS Battle du 25 juillet 2026."
target: /assets/targets/2026-07-25.png
target_url: https://cssbattle.dev/play/sbyqdHz6FqGxo0iTfaxX
colors: ["#94b31f", "#fff", "#5f5f1e"]
player: emohdaziz
chars: 127
score: 719.23
match: 100
code: |
  <dt><p><style>*{background:radial-gradient(1Q,#94b31f,5lh,var(--a,#fff)0 30vw,#94b31f);*{--a:#5f5f1e;height:30;offset:ray(45deg
---

La cible du 25 juillet ressemble à une bouée : un anneau blanc sur un fond vert vif, coupé par six petits blocs brun olive, en haut, en bas et sur les quatre diagonales. Mohamed Ali écrit un seul dégradé radial pour tous les éléments. Sur html, il dessine l'anneau blanc. Sur body, dt et p, une propriété personnalisée rend l'anneau brun, et `height:30` réduit chaque élément à une bande fine. `offset:ray(45deg)` place chaque bande au centre et la tourne de 45° dans la précédente.

Cochez **Couleurs pédagogiques** pour voir les parties vertes des trois bandes, qui ne se voient pas sur le canevas vert.

{% include animations/2026-07-25.html lang=page.lang %}

## Le code, aéré

```css
<dt><p>                               /* body > dt > p */
<style>
* {                                   /* html, puis head, body, dt, p, style */
  background: radial-gradient(
    1Q,                               /* un cercle, rayon 1Q ≈ 0,945px */
    #94b31f,                          /* vert depuis le centre */
    5lh,                              /* indice à 5lh = 90px */
    var(--a,#fff)0 30vw,              /* blanc sur html, brun ailleurs : 90 à 120px */
    #94b31f                           /* vert : 100 % = 0,945px, remonté à 120px */
  );
  * {                                 /* head, body, dt, p, style */
    --a: #5f5f1e;                     /* l'anneau devient brun */
    height: 30;                       /* des bandes de 384 × 30 */
    offset: ray(45deg                 /* centrée, tournée de 45° dans le parent */
```

## Comment ça marche

### 1. La page : body, dt, p

Il n'y a pas de doctype : la page est en mode quirks. Dans ce mode, un nombre sans unité compte en px dans `height`. La balise style n'est jamais fermée : tout ce qui suit `<style>` est du CSS.

L'ordre des balises compte. Une balise `<p>` ne ferme pas un `dt` ouvert : p va dans dt. Le document est html > body > dt > p. Cela donne trois boîtes emboîtées.

### 2. html : un anneau blanc

`*` vise d'abord html. Le fond de html peint tout le canevas. C'est un dégradé radial centré sur la boîte de html, en (200, 150).

Ses couleurs, dans l'ordre :

- `#94b31f`, le vert, à 0.
- `5lh`, seul entre deux virgules : un indice de transition. `lh` est la hauteur de ligne. Dans mon rendu, elle fait 18px, donc `5lh` = 90px.
- `var(--a,#fff)0 30vw` : une couleur avec deux positions. html n'a pas de `--a`, donc la valeur de repli `#fff` s'applique. La première position, `0`, vient après un indice à 90px, et une position ne peut pas reculer : elle remonte à 90px. `30vw` vaut 30 % de 400 = 120px. Le blanc va de 90 à 120px.
- `#94b31f` : de nouveau le vert.

L'indice est placé là où commence le blanc : le vert tient jusqu'à 90px, puis passe d'un coup au blanc. Écrit comme une position, `#94b31f 5lh,`, il a la même longueur, et dans mon rendu l'image est la même. L'anneau fait 30px de large : sur la ligne du milieu, il va de x = 80 à 110 et de 290 à 320.

### 3. 1Q : un bord extérieur net

Le premier mot du dégradé est sa taille. Une seule longueur donne un cercle de ce rayon : 1Q, un quart de millimètre, environ 0,945px.

Les positions en px vont bien au-delà de ce tout petit cercle, et ce n'est pas un problème : le dégradé continue après lui. Mais la taille fixe ce que vaut 100 %. Le dernier vert n'a pas de position : il se met à 100 %, soit 0,945px. Il ne peut pas être placé avant les 120px du blanc : il remonte à 120px. Le blanc s'arrête et le vert commence au même endroit : le bord extérieur est net, sans position de plus à écrire.

### 4. La règle imbriquée : trois bandes

Le `*{` imbriqué vaut `* *` : tout élément placé dans un autre. Ce sont head, body, dt, p et style. head et style sont masqués. Les trois autres gardent le dégradé de la règle extérieure, centré sur leur propre boîte, et reçoivent trois propriétés de plus.

`--a:#5f5f1e` définit la propriété personnalisée : `var(--a,#fff)` donne du brun. Leur anneau est brun, pas blanc. `--a` n'est pas défini sur html, qui garde son anneau blanc.

`height:30` leur donne 30px de haut. body fait 400 − 8 − 8 = 384px de large (ses marges par défaut), et dt et p prennent la même largeur. Sans l'offset, body serait une bande de 384 × 30, de x = 8 à 392 et de y = 8 à 38.

Sur une bande, le dégradé est vert, brun de 90 à 120px du centre de la bande, puis vert. Le vert ne se voit pas sur le canevas vert. Il ne reste que deux blocs bruns, de 30px de long et 30px de large, là où la bande croise son propre anneau.

### 5. offset:ray(45deg) : centrée et tournée

`offset` est le raccourci des propriétés de trajectoire. Ici, il donne à chaque bande le chemin `ray(45deg)` : un rayon qui part du centre du bloc conteneur de la boîte et pointe à 45° de la verticale, dans le sens des aiguilles d'une montre.

Sans distance, la boîte reste au départ du rayon : son centre va au centre de son bloc conteneur. Pour body, c'est html : le centre de body va en (200, 150), le centre de l'anneau blanc. Je l'ai vérifié en peignant body en rouge : les pixels rouges sont centrés sur (200, 150).

La boîte tourne aussi pour suivre le rayon. body monte maintenant vers la droite, du bas à gauche au haut à droite. Son dégradé tourne avec elle : les deux blocs bruns tombent sur l'anneau blanc, en haut à droite et en bas à gauche.

### 6. dt et p : 45° de plus chacun

dt reçoit la même règle. Son bloc conteneur est body : son centre va au centre de body, encore en (200, 150). Il tourne de 45° dans body, déjà tourné de 45° : 90° en tout. La bande de dt est verticale et pose un bloc en haut, de y = 30 à 60, et un en bas, de y = 240 à 270.

p fait de même dans dt : 135° en tout. Il descend vers la droite et pose les deux derniers blocs, en haut à gauche et en bas à droite.

Cela fait six blocs. Rien ne tourne à 0° : l'anneau reste blanc à gauche et à droite.

## Notes de golf

- Un seul dégradé sert à html et aux trois bandes. Seul `--a` change. Écrit deux fois, une fois avec `#fff` et une fois avec `#5f5f1e`, le code fait 173 caractères, 46 de plus, et l'image est la même.
- `1Q` fait du dégradé un cercle et donne un bord extérieur net sans rien ajouter. Avec `circle` à la place (131 caractères), 100 % est le coin le plus loin, et 74 756 pixels changent : le blanc s'efface de 120 à 250px, et le brun s'efface le long des bandes. Pour corriger, le dernier vert a besoin d'un `0` : 133 caractères, 6 de plus qu'avec `1Q`.
- La taille ne peut pas être retirée. Sans `1Q,` (124 caractères), le dégradé est une ellipse qui suit la forme de chaque boîte, et 98 344 pixels changent.
- `5lh` vaut 90px en 3 caractères, et `30vw` vaut 120px en 4. Avec `90px` ou `120px`, le code fait 128 caractères, et l'image est la même.
- `var(--a,#fff)0` : pas besoin d'espace après `)`. Avec l'espace, le code fait 128 caractères, même image. Le `0` compte : sans lui (`var(--a,#fff) 30vw`, 126 caractères), le bord intérieur de l'anneau devient un fondu du vert au blanc, et 45 097 pixels changent.
- `offset:ray(45deg` centre chaque bande et la tourne en une seule propriété. Avec `rotate:45deg` (123 caractères), les bandes ne vont pas au centre : 12 727 pixels changent. `offset-path:` au lieu de `offset:` donne la même image en 132 caractères.
- `height:30` n'a pas d'unité : la page est en mode quirks. Avec `30px`, le code fait 129 caractères, même image. Sans `height:30` (117 caractères), body fait 284px de haut (les 300px de html moins ses marges), et dt et p font 0px de haut : body, tourné, couvre tout l'anneau, qui devient brun. 14 512 pixels changent.
- Les balises doivent s'emboîter, et être des blocs. `<p><dt>`, même longueur : la balise dt ferme le p, et les deux sont côte à côte dans body. Les deux tournent de 90°, et 2 082 pixels changent : les blocs en haut à gauche et en bas à droite manquent. `<a><p>` (126 caractères) donne les mêmes 2 082 pixels : a est en ligne, et dans mon rendu sa bande ne se voit pas. `<div><div>` marche, en 130 caractères.
- Rien n'est fermé : ni la parenthèse, ni les deux règles, ni la balise style. Avec `)}}</style>` à la fin, le code fait 138 caractères, 11 de plus, et l'image est la même.
