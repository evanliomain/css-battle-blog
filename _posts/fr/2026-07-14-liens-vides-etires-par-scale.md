---
title: "Des liens vides étirés par scale : trois montagnes en 141 caractères"
ref: 2026-07-14
permalink: /fr/2026/07/14/liens-vides-etires-par-scale/
description: "Comment trois liens vides en ligne ne montrent que leur bordure du bas, reculent de 84px chacun avec les marges 59 et -263, et deviennent trois pics de 178,8 × 180 quand body reçoit scale:1.49 3, sur la bordure turquoise de html, dans la cible CSS Battle du 14 juillet 2026."
target: /assets/targets/2026-07-14.png
target_url: https://cssbattle.dev/play/W9znsYJVH3cpo114b3YG
colors: ["#e0d59d", "#5483a9", "#78c3c7"]
player: kieron
chars: 141
score: 704.33
match: 100
code: |
  <a><a><a><style>&{background:#e0d59d}&,a{margin:55%99;border:64Q solid#4bda;*{scale:1.49 3;border-color:#0000#0000#5483a9;margin:-91-263 0 59
---

La cible du 14 juillet montre trois pics bleu acier sur un fond sable, côte à côte en bas du canevas. Une bande turquoise se voit entre eux. Kieron dessine les pics avec trois balises `<a>` vides : chacune ne montre que sa bordure du bas, un triangle. Une règle imbriquée donne à body un `scale` qui étire les trois triangles en hauts pics. La bande turquoise, c'est la bordure de html.

Choisissez **Vue large** pour voir body et les liens hors du canevas, et cochez **Couleurs pédagogiques** pour distinguer les trois liens.

{% include animations/2026-07-14.html lang=page.lang %}

## Le code, aéré

```css
<a><a><a><style>
& {                                  /* & au premier niveau, c'est html */
  background: #e0d59d
}
&, a {                               /* html et les trois liens */
  margin: 55%99;                     /* 220px 99px pour html */
  border: 64Q solid#4bda;            /* 64Q = 60,47px, tracés en 60px */
  * {                                /* tout élément dans html ou dans un a : body, les liens */
    scale: 1.49 3;                   /* n'agit que sur body */
    border-color: #0000#0000#5483a9; /* seule la bordure du bas se voit */
    margin: -91-263 0 59             /* -91, -263, 0, 59 */
```

## Comment ça marche

### 1. html et le canevas

Pas de doctype : la page est en mode quirks. Au premier niveau du CSS, `&` désigne la racine : html. Le fond de html remplit tout le canevas de sable.

### 2. La bande turquoise, c'est html

`&,a` vise html et les trois liens. Pour html, `margin:55%99` se lit comme deux valeurs : 55 % et 99. Une marge en pourcentage, même en haut, est une part de la largeur : 55 % de 400 font 220px. html commence en y = 220, avec 99px de chaque côté.

`64Q`, ce sont 64 quarts de millimètre : 60,47px. Chrome trace une bordure de 60px. html fait 400 − 198 = 202px de large, et son contenu 202 − 120 = 82px. Le canevas ne lui laisse aucune hauteur : son contenu fait 0 de haut, et toute la boîte, 202 × 120 en (99, 220), est de la bordure. Ses 40px du bas sortent du canevas.

`#4bda` est un turquoise, `#44bbdd`, aux deux tiers opaque. Sur le sable, il donne #78c3c7.

### 3. Une règle imbriquée pour body et les liens

La règle `*` est imbriquée dans `&,a`, sans `&` à elle. Elle vise tout élément placé dans html ou dans un a : head, body, les trois liens et la balise style, qui se retrouve dans le dernier lien. Seuls body et les liens sont affichés.

Pour les liens, deux règles posent une marge : `&,a` et la règle imbriquée. Dans mon Chrome, la règle imbriquée pèse autant que `a` : un simple `a{margin:0}` ajouté après elle (153 caractères) reprend les marges, et 28 559 pixels changent. Elle vient après les déclarations de `&,a`, donc elle l'emporte : les liens reçoivent `-91-263 0 59`.

### 4. body : 286 × 91

`margin:-91-263 0 59` se lit -91, -263, 0 et 59 : haut, droite, bas, gauche. body se place dans le contenu de 82px de html. Avec 59 à gauche et −263 à droite, il fait 82 − 59 + 263 = 286px de large, à partir de x = 159 + 59 = 218.

En mode quirks, body s'étire sur la hauteur du contenu de html, moins ses propres marges. Cette hauteur vaut 0 ici : body fait 0 + 91 = 91px de haut. Avec −91 en haut, il va de y = 189 à 280. Avec `-50` à la place, body fait 50px de haut : getBoundingClientRect le confirme dans les deux cas.

### 5. Trois triangles, de droite à gauche

`<a>` est un élément en ligne. Vide, c'est une zone de texte de 0 de large et 18 de haut, en haut de body : de y = 189 à 207. `&,a` donne à chaque lien la bordure de 60px : 120 × 138.

`border-color:#0000#0000#5483a9` donne trois couleurs : le haut, la gauche et la droite, le bas. `#0000` est transparent. Seule la bordure du bas se voit. La zone de texte n'a pas de largeur, donc cette bordure est un triangle : sommet au bas de la zone de texte (y = 207), base de 120px en y = 267.

Une boîte en ligne ignore les marges du haut et du bas, pas celles des côtés. Chaque lien prend 59 + 120 − 263 = −84px sur sa ligne : le suivant commence 84px plus à gauche. Le premier lien est en x = 277, le deuxième en 193, le troisième en 109. Les trois triangles se chevauchent.

### 6. scale étire body

`scale:1.49 3` atteint aussi les liens, mais une boîte en ligne ne se transforme pas : leur propre scale ne fait rien. Il agit sur body, autour de son centre : (218 + 143, 189 + 45,5) = (361, 234,5). Les liens suivent body.

Chaque triangle passe de 120 × 60 à 178,8 × 180. Le sommet passe de y = 207 à 234,5 − 27,5 × 3 = 152. La base passe de 267 à 332, hors du canevas. Les pics tombent en x = 74,92, 200,08 et 325,24, à 125,16px d'écart. Deux voisins se croisent en y = 278 : entre eux, la bordure turquoise de html se voit.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule règle `&,a` donne la bordure de 60px à html et aux liens : la bordure de html fait la bande turquoise, et les bordures du bas des liens font les pics.
- Une seule règle `*` imbriquée sert à body et aux liens. body utilise la marge et le scale. Les liens utilisent la couleur de bordure et les marges des côtés, et ignorent le reste. Avec `a` à la place de `*` (même longueur), body garde ses marges de 8px par défaut et n'a pas de scale : les triangles finissent sous le canevas, et le contenu de html fait une encoche sable dans le turquoise. 32 556 pixels changent.
- Sans `scale` (128 caractères), les triangles restent à 120 × 60, entre y = 207 et 267. 27 970 pixels changent. `transform:scale(1.49,3)` donne la même image en 152 caractères.
- Le −91 règle la hauteur de body et son centre. Avec `-50` (même longueur), body fait 50px de haut, les pics descendent, et 26 242 pixels changent.
- `64Q` fait 60px en 3 caractères. `60px` donne la même image en 142. Un `60` sans unité (140 caractères) ne passe pas dans le raccourci `border` de mon Chrome : toute la déclaration est ignorée, et le canevas reste tout sable. 35 808 pixels changent.
- `55%99` : le `%` termine le premier nombre, pas besoin d'espace. `220 99` donne la même image en 142 caractères.
- `#4bda` tient en 5 caractères. La couleur opaque que montre la cible, `#78c3c7`, donne la même image en 143.
- `#0000` est transparent en 5 caractères, et chaque `#` commence une nouvelle couleur sans espace. `transparent transparent` prend 154 caractères, pour la même image.
- `-91-263 0 59` : les signes moins séparent les nombres. `-91px -263px 0 59px` prend 148 caractères.
- `&` vaut html au premier niveau du CSS. `html` aux deux endroits prend 147 caractères, pour la même image.
- Rien n'est fermé. Fermer les deux règles et la balise style avec `}}</style>` donne 151 caractères, 10 de plus, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel est proche mais pas exact au pixel près. La bande turquoise et la largeur des pics sont celles de la cible. Les pics sont environ 3px plus bas que dans la cible : le creux entre deux pics descend jusqu'en y = 278 dans mon rendu, 274 dans la cible. 1 522 pixels s'écartent de la cible de plus de 8 sur un canal, jusqu'à 140, tous le long des bords en biais.

La place des pics dépend de la zone de texte de 18px des liens : 1px de moins les remonte de 3px, à cause du scale vertical de 3. Quand j'ajoute `font-size:15px` à la règle imbriquée, la zone de texte fait 17px de haut dans mon Chrome, et les triangles tombent là où la cible les a : il reste 891 pixels écartés, tous sur les bords, où l'anticrénelage de la cible diffère. Le juge de CSS Battle donne au code 100 % de correspondance.
