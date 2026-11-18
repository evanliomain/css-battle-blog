---
title: "Un anneau coupé au bord de sa tuile : deux anneaux enlacés en 144 caractères"
ref: 2026-05-24
permalink: /fr/2026/05/24/un-anneau-coupe-au-bord-de-sa-tuile/
description: "Comment un seul dégradé radial, donné à html, body et p, dessine un anneau entier sur html, un demi-anneau sur body coupé par le bord de sa tuile de fond, et un morceau d'anneau sur p qui bouche le trou entre les deux, dans la cible CSS Battle du 24 mai 2026."
target: /assets/targets/2026-05-24.png
target_url: https://cssbattle.dev/play/BM9ub61jbytrtMmKND4a
colors: ["#e8ad6d", "#2f5a76"]
player: koda_pig
chars: 144
score: 701.39
match: 100
code: |
   <p> <style>p{margin:0 118}*{background:radial-gradient(1q at 25ch,#0000 5pc,#E8AD6D 0 130px,#0000)var(--z,69q#2F5A76);*{--z:134q;font:.01q/1in'
---

La cible du 24 mai montre deux anneaux orange sur un bleu foncé. Ils se chevauchent, l'espace entre eux est rempli, et l'anneau de gauche est coupé par une ligne verticale. koda_pig la dessine avec un seul dégradé radial, donné à tous les éléments. Sur html, il peint un anneau entier. Sur body, le centre de l'anneau tombe sur le bord de la tuile de fond : seule sa moitié droite se voit. Sur p, un morceau d'anneau bouche le trou entre les deux.

Avec la **Vue large**, on voit le fond de html se répéter à gauche du canevas. Avec les **Couleurs pédagogiques**, l'anneau de chaque élément a sa propre couleur.

{% include animations/2026-05-24.html lang=page.lang %}

## Le code, aéré

```css
&nbsp;<p>&nbsp;<style>           /* deux vrais espaces insécables : 1 caractère chacun */
p {
  margin: 0 118;                 /* p : 148 de large, en x = 126 */
}
* {                              /* html, head, body, p, style */
  background:
    radial-gradient(
      1q at 25ch,                /* un cercle de rayon 0,945px ; centre x = 25ch, y = 50 % */
      #0000 5pc,                 /* transparent jusqu'à 80px */
      #E8AD6D 0 130px,           /* orange de 80px à 130px */
      #0000                      /* à 1q, ramené à 130px : transparent au-delà */
    )
    var(--z, 69q#2F5A76);        /* html : position 69q et la couleur bleue */
  * {                            /* tout élément placé dans un autre : head, body, p, style */
    --z: 134q;                   /* body et p : position 134q, pas de couleur */
    font: .01q/1in'              /* une police de 0,0094px, des lignes de 96px, un nom de police vide */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `118` dans une marge est lu en px.

Le code commence par un espace insécable. Ce n'est pas un blanc : le navigateur ouvre body et l'y met, comme du texte. Viennent ensuite `<p>`, un second espace insécable dans p, et le `<style>`, dans p lui aussi. La page contient html, un head vide, et body avec le texte et p.

`*` vise tous les éléments. Le `*{` imbriqué vise tous les éléments placés dans un autre : head, body, p et style. head et style ne s'affichent pas. Les règles ne sont jamais fermées : la fin du code les ferme.

html fait 400 × 300. En mode quirks, body remplit html moins sa marge par défaut de 8px : 384 × 284 en (8, 8). `p{margin:0 118}` supprime les marges du haut et du bas de p et prend 118px de chaque côté : p fait 384 − 236 = 148 de large, en x = 8 + 118 = 126.

### 2. Des lignes de 96px

La règle imbriquée donne à body et p `font:.01q/1in'`. La taille de police est de 0,01q = 0,0094px : les espaces insécables ne se voient pas. La hauteur de ligne est de 1in = 96px. Le raccourci `font` exige un nom de police : l'apostrophe en ouvre un vide, et la fin du code le ferme.

La première ligne de body contient son espace insécable : elle fait 96px de haut, donc p commence en y = 8 + 96 = 104. L'espace insécable de p lui donne une ligne de 96px. p fait 148 × 96 en (126, 104).

### 3. Un dégradé, un anneau

`radial-gradient(1q at 25ch, …)` est un cercle de rayon 1q = 0,945px. Les arrêts de couleur sont en px, donc ils ne dépendent pas de ce rayon : transparent jusqu'à 5pc = 80px, puis `#E8AD6D 0 130px`. Le `0` est ramené à l'arrêt d'avant, 80px : la couleur change d'un coup. Le dernier `#0000` n'a pas de position, il se place donc à 100 % du rayon, 0,945px. Un arrêt ne peut pas reculer : il est lui aussi ramené à 130px. On obtient un anneau orange net, de 80 à 130px du centre, et du transparent partout ailleurs.

Le fond garde la répétition par défaut, `repeat` : le dégradé remplit une tuile de la taille de la boîte de l'élément, et les tuiles se répètent dans tous les sens.

### 4. html : un anneau entier

html n'a pas de `--z`, donc `var(--z,69q#2F5A76)` prend sa valeur de repli : une position, 69q, et une couleur de fond, #2F5A76. Le fond de html est peint sur tout le canevas.

html garde la police par défaut de 16px. 1ch y vaut 8px, donc `at 25ch` place le centre en x = 200px, et à 50 % de la hauteur par défaut, y = 150, dans une tuile de 400 × 300. 69q = 65,20px décale la tuile vers la droite : l'anneau est centré en (265,20 ; 150), de x = 135,20 à 395,20 et de y = 20 à 280.

La tuile de gauche a son propre anneau, en x = 265,20 − 400 = −134,80. Il s'arrête en x = −134,80 + 130 = −4,80, juste hors du canevas.

### 5. body : un demi-anneau

body est dans html, il reçoit donc `--z:134q`. Cette fois, `var(--z)` n'est qu'une position, 134q = 126,61px, sans couleur : le fond de body est transparent, à part le dégradé.

La police de body est minuscule, donc `25ch` vaut presque 0 : le centre de l'anneau est sur le bord gauche de la tuile. Écrire `at 200px` pour html et `at 0` pour body et p donne la même image dans mon Chrome. La tuile est la boîte de body, 384 × 284 : le centre est à 50 % de 284 = 142 en hauteur, y = 8 + 142 = 150.

La tuile commence en x = 8 + 126,61 = 134,61, pile sur le centre. Seule la moitié droite de l'anneau est dans cette tuile. La moitié gauche serait dans la tuile de gauche, mais celle-ci dessine son propre anneau, centré sur son propre bord gauche, x = 134,61 − 384 = −249,39. Cet anneau s'arrête en x = −119,39, hors de la boîte de body : rien ne se voit. Il reste un demi-anneau, de x = 134,61 à 264,61, coupé par une ligne droite : la coupe de la cible.

### 6. Un trou au milieu

L'anneau entier et le demi-anneau se chevauchent, et entre eux presque tout est orange. Mais un point à moins de 80px des deux centres est dans les deux trous. Les centres sont à 130,58px l'un de l'autre : il reste une petite lentille bleue, de x = 185,20 à 214,61 et de y = 103,77 à 196,23.

### 7. p bouche le trou

p est dans body : il reçoit aussi `134q`, sans couleur. Sa tuile est sa boîte, 148 × 96. Le centre de l'anneau est sur le bord gauche de la tuile, en y = 104 + 48 = 152.

Les tuiles commencent en x = 126 + 126,61 = 252,61, et une tuile plus tôt, en 252,61 − 148 = 104,61. De x = 126 à 252,61, p montre donc l'anneau de la tuile qui commence en 104,61, centré en (104,61 ; 152). En y = 152, cet anneau va de x = 184,61 à 234,61, et il couvre toute la lentille. À droite de 252,61, le centre suivant est à moins de 53px : transparent. p n'ajoute de l'orange que dans le trou laissé par les anneaux, et sur de l'orange déjà là.

La pointe de la lentille est en y = 103,77, 0,23px au-dessus de la boîte de p. Dans mon rendu, aucun pixel n'en reste visible.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule déclaration pour tous les éléments. html n'a pas de `--z`, il prend donc le repli : une position et la couleur bleue. body et p reçoivent `134q` : une position, et pas de couleur. Écrire le dégradé deux fois, `…69q#2F5A76;*{background:radial-gradient(…)134q;…`, donne la même image en 201 caractères.
- La police minuscule fait trois choses : elle cache les espaces insécables, elle ramène `25ch` presque à 0 pour body et p, et elle porte la hauteur de ligne de 96px. Sans la déclaration `font` (129 caractères), 25 873 pixels changent.
- Le nom de police vide coûte un caractère : l'apostrophe, fermée par la fin du code. Sans elle (143 caractères), le raccourci n'a pas de nom de police et il est ignoré : les mêmes 25 873 pixels changent.
- L'espace insécable du début donne à body une ligne de 96px qui pousse p vers le bas. Sans lui (143 caractères), p est en y = 8 et 3 181 pixels changent. Un espace simple (144 caractères) ne fait rien : l'analyseur l'ignore, body ne contient que p, et les mêmes 3 181 pixels changent.
- L'espace insécable après `<p>` donne sa hauteur à p. Sans lui (143 caractères), p fait 0px de haut, la lentille reste bleue, et 1 904 pixels changent.
- `p{margin:0 118}` règle la largeur des tuiles de p. Sans cette règle (129 caractères), p fait 384 de large en x = 8 : sa tuile commence en 134,61 comme celle de body, son anneau tombe 2px sous le demi-anneau de body, la lentille reste bleue, et 1 970 pixels changent.
- `1q` coûte 3 caractères avec son espace, et rend le bord extérieur net. Sans lui (141 caractères), le dégradé prend sa taille par défaut : une ellipse qui atteint le coin le plus loin de chaque tuile. Les anneaux deviennent des ellipses, le dernier `#0000` se place sur cette ellipse lointaine, et l'orange s'efface lentement au-delà de 130px. 85 004 pixels changent.
- `#0000` est le transparent en 5 caractères. Avec `transparent` deux fois (156 caractères), l'image est la même.
- Unités courtes : `5pc` vaut 80px et `1in` 96px, 3 caractères chacun. Avec `80px` ou `96px` (145 caractères), l'image est la même.
- Pas d'espace avant `var(` ni avant `#2F5A76`. Avec les deux espaces, la même image prend 146 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 1 405 pixels, avec la même règle que dans les notes de golf. Tous sont sur des bords. La tuile de body commence en x = 134,61, donc la colonne x = 134 mélange les deux couleurs, là où la cible est bleue. Avec `65px` et `127px` à la place de `69q` et `134q` (146 caractères), la coupe tombe en x = 135 et il reste 714 pixels, tous sur des bords courbes. Mon rendu du code officiel a 6 couleurs différentes, et la cible 49 : les bords courbes de la cible sont plus adoucis que les miens. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
