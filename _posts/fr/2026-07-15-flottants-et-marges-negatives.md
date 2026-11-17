---
title: "Des flottants et des marges négatives : six carrés penchés en 120 caractères"
ref: 2026-07-15
permalink: /fr/2026/07/15/flottants-et-marges-negatives/
description: "Comment six éléments hr et p vides, flottants, avec une bordure de 28px et les marges 62 -8 -14 58, remplissent deux rangées de carrés, et comment p{rotate:15deg} en penche un sur deux, dans la cible CSS Battle du 15 juillet 2026."
target: /assets/targets/2026-07-15.png
target_url: https://cssbattle.dev/play/O6VovmgMqXY7lHLlAi5B
colors: ["#f48b26", "#f5e3b5"]
player: levito
chars: 120
score: 727.45
match: 100
code: |
  <hr><p><hr><p><hr><p><style>&{background:#F48B26;* *{float:left;margin:62-8-14 58;border:7vw solid#F5E3B5}p{rotate:15deg
---

La cible du 15 juillet montre six carrés crème sur un fond orange, en deux rangées de trois. Un carré sur deux est penché, comme sur un damier. Veit Lehmann les dessine avec six balises vides, `<hr>` et `<p>` en alternance. Une règle les fait flotter et fait de chacun une bordure de 56 × 56. Ses marges, dont deux négatives, découpent le canevas en cellules de 106 × 104. Une deuxième règle, `p{rotate:15deg}`, penche les trois p.

Cochez **Couleurs pédagogiques** pour distinguer les hr des p, et voir les boîtes de marge.

{% include animations/2026-07-15.html lang=page.lang %}

## Le code, aéré

```css
<hr><p><hr><p><hr><p><style>
& {                                /* & au premier niveau, c'est html */
  background: #F48B26;
  * * {                            /* & * * : les hr et les p, pas body */
    float: left;                   /* largeur 0, côte à côte */
    margin: 62-8-14 58;            /* 62, -8, -14, 58 : haut, droite, bas, gauche */
    border: 7vw solid#F5E3B5       /* 7vw = 28px */
  }
  p {
    rotate: 15deg
```

## Comment ça marche

### 1. html et body

Pas de doctype : la page est en mode quirks. Au premier niveau du CSS, `&` désigne la racine : html. Le fond de html remplit tout le canevas d'orange.

body garde ses marges de 8px. En mode quirks, il remplit la hauteur de la page : getBoundingClientRect donne (8, 8), 384 × 284.

### 2. Six éléments vides

`<hr>` n'a pas de balise de fin. `<p>` ouvre un paragraphe, et le `<hr>` suivant le ferme. body contient donc six frères vides : hr, p, hr, p, hr, p. Le dernier p n'est jamais fermé : la balise style se retrouve dedans.

La règle `* *` est imbriquée dans `&`, sans `&` à elle : elle vaut `& * *`, tout élément placé dans un élément de html. Ce sont les six hr et p, et la balise style du dernier p, qui n'est pas affichée. Pas body, ni head : leur seul ancêtre est html.

### 3. Des carrés faits de bordures

`float:left` réduit chaque élément à son contenu. Ils n'en ont pas : largeur 0, hauteur 0.

`border:7vw solid#F5E3B5` pose une bordure de 28px de chaque côté (7 % des 400px du canevas). Chaque élément devient un carré crème de 56 × 56. Le raccourci remplace aussi la bordure grise en relief que hr a par défaut.

Avec des marges à 0, les six carrés se suivraient, de x = 8 à 344, en y = 8.

### 4. Marges : une cellule de 106 × 104

`margin:62-8-14 58` se lit comme quatre valeurs : 62, -8, -14 et 58. C'est le haut, la droite, le bas et la gauche. Un nombre sans unité compte en px en mode quirks.

Le premier hr avance de 58px et descend de 62px : son carré est en (66, 70). Sa boîte de marge part du coin de body, (8, 8). À droite, -8 la fait s'arrêter 8px avant le bord droit du carré : 58 + 56 - 8 = 106 de large. En bas, -14 la fait s'arrêter 14px au-dessus du bas du carré : 62 + 56 - 14 = 104 de haut.

### 5. Les flottants remplissent deux rangées

Chaque flottant se place juste après la boîte de marge du précédent. Les carrés sont en x = 8 + 58 + 106 × n : 66, 172 et 278.

Le quatrième flottant irait de x 326 à 432. body s'arrête en 392 : il ne tient pas. Il descend sous les boîtes de marge de la première rangée, en y = 8 + 104 = 112. Son carré est en y = 112 + 62 = 174, en x = 66. Les deux derniers suivent, en x = 172 et 278.

La grille tombe au centre. Les carrés s'arrêtent en x = 334 et y = 230 : 66px des bords gauche et droit, 70px du haut et du bas. Les écarts font 58 - 8 = 50px en largeur et 62 - 14 = 48px en hauteur.

### 6. Les p tournent de 15°

`p{rotate:15deg}` tourne les trois p autour du centre de leur carré. Une rotation ne change pas la mise en page : les autres carrés restent en place. Les carrés penchés gardent leur centre, en (200, 98), (94, 202) et (306, 202). Leur boîte englobante fait 56 × (cos 15° + sin 15°) = 68,59px de large.

hr et p alternent, et trois carrés tiennent dans une rangée. Les carrés penchés sont donc au milieu de la première rangée et sur les côtés de la deuxième.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- `* *` laisse body de côté. Un simple `*` (118 caractères) fait aussi flotter body, avec les mêmes marges et la même bordure : un grand cadre crème apparaît et les carrés bougent. 35 938 pixels changent. `hr,p` donne la même image en 121 caractères.
- Deux balises, `<hr>` et `<p>`, permettent à `p` de viser les carrés penchés sans classe ni attribut. `<hr>` n'a pas besoin de balise de fin, et il ferme le `<p>` d'avant.
- `float:left` sert deux fois : il réduit les éléments à une largeur 0, et il les aligne. Sans lui (109 caractères), chacun est un bloc aussi large que body, et les carrés deviennent de larges barres. 39 726 pixels changent.
- `7vw` fait 28px en 3 caractères. `28px` donne la même image en 121 caractères. Un `28` sans unité (119 caractères) ne passe pas dans le raccourci `border` de mon Chrome : toute la déclaration est ignorée, les carrés disparaissent, et il ne reste que les bordures de 1px par défaut des hr, en points. 19 085 pixels changent.
- `62-8-14 58` : les signes moins séparent les nombres, pas besoin d'espace. `62 -8 -14 58` donne la même image en 122 caractères. Avec des unités, `62px -8px -14px 58px` en prend 130.
- Les deux marges négatives ne sont pas là pour rien : elles règlent les écarts. `62 0-14 58`, de même longueur, donne des cellules de 114px de large : les carrés passent en x = 66, 180 et 294. 6 198 pixels changent. `62-8 0 58` (119 caractères) descend la deuxième rangée en y = 188 : 5 590 pixels changent.
- `rotate:15deg` est plus court que `transform:rotate(15deg)` (131 caractères, même image).
- `&` vaut html au premier niveau du CSS. `html` prend 123 caractères, pour la même image.
- Rien n'est fermé. Fermer les deux règles et la balise style avec `}}</style>` donne 130 caractères, 10 de plus, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome local, le code officiel n'est pas exact au pixel près. Les trois carrés droits sont identiques à ceux de la cible, et les carrés penchés ont la même place et la même taille. L'écart est sur les bords en biais des carrés penchés : la cible y a plus de pixels tout crème (3 084 par carré penché, 3 003 dans mon rendu). 576 pixels s'écartent de la cible de plus de 8 sur un canal, jusqu'à 81, tous sur ces bords. Le juge de CSS Battle donne au code 100 % de correspondance.
