---
title: "Une boîte vide, six ombres : un damier en 136 caractères"
ref: 2026-04-16
permalink: /fr/2026/04/16/une-boite-vide-six-ombres/
description: "Comment une seule boîte html vide montre le canevas blanc, comment cinq ombres la recopient en un damier rouge et blanc, et comment une sixième ombre étalée de 9in peint le fond orange, dans la cible CSS Battle du 16 avril 2026."
target: /assets/targets/2026-04-16.png
target_url: https://cssbattle.dev/play/4XFEtUgqrtt3F6IXBYlH
colors: ["#fff", "#e8ad6d", "#a84a4b"]
player: h_blierzt
chars: 136
score: 709.43
match: 100
code: |
  <style>&{margin:45 65%155 40;box-shadow:116q 0,55vw 0#FFF,0 116q,116q 116q#FFF,55vw 116q,0 0 0 9in#E8AD6D;color:A84A4B;border-radius:5vw
---

La cible du 16 avril est faite de six carrés aux coins arrondis sur un fond orange clair, en deux rangées de trois, blancs et rouge-brun en damier. H_Bliertz ne stylise qu'une boîte, html, et ne lui donne pas de fond : le canevas blanc se voit au travers, et c'est le premier carré. Cinq ombres recopient la boîte pour faire les cinq autres carrés. Une sixième ombre, étalée de 9in, fait le fond orange.

Avec **Vue large**, l'ombre orange déborde du canevas. Avec **Couleurs pédagogiques**, chaque couleur d'ombre prend sa propre couleur.

{% include animations/2026-04-16.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                          /* au premier niveau, & est la racine : html */
  margin: 45 65%155 40;      /* html : 100 × 100 en (40, 45) */
  box-shadow:
    116q 0,                  /* rouge (la couleur), 109,61px à droite */
    55vw 0#FFF,              /* blanc, 220px à droite */
    0 116q,                  /* rouge, 109,61px plus bas */
    116q 116q#FFF,           /* blanc, à droite et plus bas */
    55vw 116q,               /* rouge, en bas à droite */
    0 0 0 9in#E8AD6D;        /* orange, étalé de 864px tout autour : le fond */
  color: A84A4B;             /* sans dièse : le mode quirks l'accepte */
  border-radius: 5vw         /* 20px, pour la boîte et ses six ombres */
  /* la fin du code ferme la règle */
```

## Comment ça marche

### 1. `&`, c'est html

`&` est le sélecteur d'imbrication. Hors de toute règle, il vaut `:scope`, et dans une feuille de style c'est l'élément racine : html. getBoundingClientRect place la marge sur html, et body garde sa propre marge de 8px.

### 2. html : 100 × 100

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks, où les longueurs sans unité des marges comptent comme des pixels.

`margin:45 65%155 40` vaut 45 en haut, 65 % à droite, 155 en bas et 40 à gauche. Une marge en pourcentage est une part de la largeur : 65 % de 400 font 260. html va de x = 40 à 400 − 260 = 140, sur 100px de large.

En mode quirks, html s'étire jusqu'à la hauteur de la fenêtre, moins ses marges : 300 − 45 − 155 = 100. Il va de y = 45 à 145. getBoundingClientRect donne 40, 45, 100 × 100.

### 3. Le premier carré, c'est le canevas

html n'a pas de fond, body non plus. Rien ne peint le canevas : il reste blanc. Une ombre ne se peint jamais sous sa propre boîte : aucune des six ombres ne couvre la boîte de html. Le canevas blanc se voit au travers : c'est le carré blanc en haut à gauche.

### 4. Une couleur sans dièse

`color:A84A4B` n'a pas de `#`. En mode quirks, quelques propriétés, dont `color`, acceptent une couleur hexadécimale sans dièse : getComputedStyle donne rgb(168, 74, 75). html n'écrit aucun texte, mais une ombre sans couleur prend la valeur de `color`. `116q 0`, `0 116q` et `55vw 116q` sont les trois carrés rouges.

### 5. Cinq copies

Une ombre est une copie de la boîte, décalée de ses deux longueurs. La première ombre de la liste est peinte au-dessus.

- 116q, ce sont 116 quarts de millimètre, 29mm : 109,606px. La cible place la colonne du milieu en x = 150 et la seconde rangée en y = 155.
- 55vw, c'est 55 % des 400px de large de la fenêtre : 220px. La colonne de droite va de x = 260 à 360.

Du rouge en (116q, 0), du blanc en (55vw, 0), du rouge en (0, 116q), du blanc en (116q, 116q), du rouge en (55vw, 116q) : avec la boîte de html en (0, 0), le damier est complet.

### 6. Le fond est une ombre

`0 0 0 9in#E8AD6D` n'a ni décalage ni flou, mais un étalement de 9in : 864px ajoutés de chaque côté de la boîte. Les bords du canevas sont au plus à 260px de la boîte de html (le bord droit, 400 − 140) : elle couvre tout le canevas.

C'est la dernière ombre de la liste : elle est peinte sous les cinq autres. Et comme elles, elle laisse la boîte de html tranquille : le premier carré reste blanc.

### 7. Des coins de 20px

`border-radius:5vw` vaut 5 % de 400 : 20px. Les ombres copient les coins de la boîte : les cinq carrés ont la même courbe. Un étalement agrandit le rayon d'autant : 20 + 864 = 884px à l'extérieur. À l'intérieur, l'orange s'arrête au bord arrondi de html : les coins du carré blanc sont orange.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'une de ses composantes bouge de plus de 8, par rapport à mon rendu du code officiel.

- `&` fait 1 caractère, `html` 4. Avec `html{` (139 caractères), l'image est la même. `*{` est aussi court, mais il vise aussi head et body : body reçoit ses propres ombres, peintes par-dessus celles de html, et avec `*{` (136 caractères) mon Chrome peint tout le canevas en orange : 58 525 pixels changent.
- Une boîte vide donne le premier carré gratuitement : le canevas se voit au travers, et les six ombres ne le couvrent jamais.
- `color:A84A4B;` fait 13 caractères, et colore trois ombres. Avec `color:#A84A4B` (137 caractères), l'image est la même. Sans `color`, avec `#A84A4B` après chaque ombre rouge (144 caractères), l'image est la même. Sans couleur du tout (123 caractères), les trois carrés rouges deviennent noirs : 29 305 pixels changent.
- `116q` fait 4 caractères, `110px` 5, et il revient cinq fois. Avec `110px` partout (141 caractères), les quatre ombres qui l'utilisent bougent de 0,394px : 1 094 pixels changent, sur les bords et les coins de ces quatre carrés.
- `55vw` fait 4 caractères, `220px` 5. Avec `220px` (138 caractères), l'image est la même.
- `5vw` fait 3 caractères, `20px` 4. Avec `border-radius:20px` (137 caractères), l'image est la même.
- `9in` fait 3 caractères, et dépasse les 260px dont l'étalement a besoin. Avec `2in` (136 caractères), l'étalement s'arrête à 192px de la boîte : la droite du canevas reste blanche, et 15 446 pixels changent.
- L'ombre orange vient en dernier. En premier (136 caractères), elle est peinte par-dessus les cinq autres : seul le carré de html reste blanc, et 48 818 pixels changent.
- 65 % font 260px, aussi long que `260`, mais `%` termine le nombre : `65%155` n'a pas besoin d'espace. Avec `45 260 155 40` (137 caractères), l'image est la même.
- Le mode quirks accepte les nombres sans unité dans les marges. Avec `45px 65%155px 40px` (142 caractères), l'image est la même.
- Pas d'espace avant un `#`. Avec une espace avant chacun des trois (139 caractères), l'image est la même.
- Le code s'arrête au milieu de la règle : la fin du code la ferme. Avec `border-radius:5vw}` (137 caractères), l'image est la même.

## Si vous l'essayez chez vous

Dans mon Chrome (version 157 au moment d'écrire), le code officiel dessine les mêmes six carrés que la cible, avec les mêmes aplats. 1 188 pixels s'écartent de plus de 8 niveaux. 590 sont sur des bords droits : les colonnes x = 149 et 249 et les lignes y = 154 et 254, où mon rendu mélange les deux couleurs voisines du bord. Les quatre ombres qui utilisent 116q sont décalées de 109,606px, là où les carrés de la cible sont à 110px de celui de html. Quand j'écris `110px` à la place de chaque `116q`, ces 590 pixels disparaissent. Les 598 autres sont autour des coins arrondis : mes coins ne se fondent pas de la même façon que ceux de la cible, et avec `110px`, 615 pixels y diffèrent encore. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
