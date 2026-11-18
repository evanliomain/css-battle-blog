---
title: "Un dégradé, deux hauteurs de ligne : trois silhouettes en 134 caractères"
ref: 2026-06-13
permalink: /fr/2026/06/13/un-degrade-deux-hauteurs-de-ligne/
description: "Comment une seule liste de fonds, donnée à html et à body, dessine des têtes de 25px sur html et des épaules de 50px sur body, parce que 1lh et 5em changent d'un élément à l'autre, dans la cible CSS Battle du 13 juin 2026."
target: /assets/targets/2026-06-13.png
target_url: https://cssbattle.dev/play/bntxlo7Wue1WgUtO6vJB
colors: ["#594f7c", "#efeade"]
player: emohdaziz
chars: 134
score: 711.53
match: 100
code: |
  <style>*{--g:radial-gradient(1lh,#594f7c,139%,#0000)fixed;background:var(--g)0-5em/50%,var(--g)0 5em#efeade;*{margin:105 0;font:3vh/4"
---

La cible du 13 juin montre trois silhouettes violettes sur fond crème. Chacune est une tête ronde et des épaules en demi-disque : deux en haut, et une plus bas au milieu, à l'envers. Mohamed Ali écrit une seule liste de fonds et la donne à html et à body. Les disques sont dimensionnés en `lh` et placés en `em`. Ces unités changent de html à body : html dessine les têtes de 25px, body les épaules de 50px.

Utilisez la **Vue large** pour voir les tuiles et les copies des têtes hors du canevas, et les **Couleurs pédagogiques** pour distinguer les disques de html de ceux de body.

{% include animations/2026-06-13.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                          /* html, head, style, body */
  --g: radial-gradient(1lh, #594f7c, 139%, #0000) fixed;
                             /* un disque plein, rayon 1,39lh, placé sur la page */
  background:
    var(--g) 0 -5em / 50%,   /* tuiles de 200 × 300 : deux disques côte à côte */
    var(--g) 0 5em #efeade;  /* un disque au milieu, et le crème */
  * {                        /* body (head et style restent cachés) */
    margin: 105 0;           /* body : 400 × 90 en y = 105 */
    font: 3vh/4 "            /* 9px, hauteur de ligne 36px */
```

## Comment ça marche

### 1. html et body

Le navigateur ajoute html, head et body autour de `<style>`, et range style dans head. `*` touche donc quatre éléments : html, head, style et body. head et style sont cachés. Il reste html et body, qui reçoivent le même `--g` et le même `background`.

Le `*{…}` imbriqué touche tous les éléments qui sont dans un autre : head, style et body. Pour l'image, seul body compte. Les pages de CSS Battle n'ont pas de doctype, elles sont donc en mode quirks, et un nombre seul comme `105` y est lu en px. body reçoit des marges de 105px en haut et en bas, aucune sur les côtés. En mode quirks, body remplit la hauteur de la page : il fait 400 × 90, de y = 105 à 195.

Le fond de html couvre toute la page. Celui de body n'est pas reporté sur la page, car html a déjà le sien. body peint donc son propre fond, dans sa propre boîte.

### 2. Un disque avec un point de transition

`radial-gradient(1lh,…)` est un cercle de rayon 1lh. 1lh, c'est la hauteur de ligne de l'élément.

`139%` est placé entre les deux couleurs, sans couleur à lui. C'est un point de transition : il dit où le mélange des deux couleurs est moitié-moitié. `#0000` n'a pas de position, il finirait donc à 100 %. Mais un arrêt ne peut pas venir avant le point de transition qui le précède : `#0000` est repoussé à 139 % lui aussi. Le point de transition tombe alors sur le dernier arrêt : le violet reste plein jusqu'à 139 %, puis s'arrête net. Je l'ai vérifié : `#594f7c 139%,#0000 0` donne la même image.

Sur html, la police est celle par défaut, en 16px. Dans mon Chrome, sa hauteur de ligne fait 18px, donc 1lh = 18px. Le disque a un rayon de 1,39 × 18 = 25,02px.

`fixed` fait partie de `--g`. Il place le dégradé dans le repère de la page, pas dans la boîte de l'élément. Pour html, ça revient au même. Pour body, ça compte (partie 5).

### 3. Deux têtes en haut

La première couche de html est `var(--g)0-5em/50%`. Sur html, 5em = 5 × 16 = 80px. La taille `50%` vaut la moitié de la largeur de la page : 200px. La hauteur n'est pas donnée, et un dégradé n'a pas de taille propre : il prend toute la hauteur, 300px. Ça donne des tuiles de 200 × 300, remontées de 80px, qui se répètent.

Chaque tuile a son disque en son centre : (100, 70) et (300, 70). Ce sont les deux têtes, de y = 45 à 95 dans mon rendu. Les copies une tuile plus bas, en y = 370, tombent hors du canevas.

### 4. La tête du bas

La deuxième couche est `var(--g)0 5em#efeade`. Pas de taille : une seule tuile de 400 × 300, descendue de 80px. Son disque est en (200, 230) : la tête du bas, de y = 205 à 255. Sa copie au-dessus, en (200, −70), est hors du canevas. `#efeade` est la couleur de fond sous les deux couches : le crème.

### 5. La même liste sur body

body reçoit `font:3vh/4"`. 3vh, c'est 3 % de 300 : 9px. La hauteur de ligne vaut 4 fois la taille de police : 36px.

Sur body, le même `--g` a donc 1lh = 36px : des disques de rayon 1,39 × 36 = 50,04px, deux fois les têtes. Et 5em = 45px. Grâce à `fixed`, les tuiles de body sont placées sur la page, comme celles de html. La première couche met ses disques en (100, 105) et (300, 105). La deuxième met le sien en (200, 195).

### 6. Coupés par la bande

body ne peint que dans sa boîte, de y = 105 à 195. Des deux disques du haut, il ne reste que la moitié basse : les épaules sous les têtes, de y = 105 à 155. Du troisième disque, il ne reste que la moitié haute : les épaules à l'envers, de y = 145 à 195, au-dessus de la tête du bas. Le crème de body remplit le reste de la bande, par-dessus le crème de html.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- `--g` contient le dégradé et `fixed` une seule fois, pour deux couches. Écrire le dégradé deux fois donne la même image en 159 caractères.
- Le point de transition donne un bord net pour moins cher. `#594f7c 139%,#0000 0` donne la même image en 136 caractères. Sans `139%,` (129 caractères), chaque disque passe du violet en son centre au transparent à 1lh, et 17 688 pixels changent.
- `1lh` est une seule longueur à deux valeurs : 18px sur html, 36px sur body. Avec `18px` à la place (135 caractères), les demi-disques de body rétrécissent à la taille des têtes, et 8 826 pixels changent.
- `5em` marche pareil : 80px sur html, 45px sur body. Avec `80px` (136 caractères), les disques de body sont en y = 70 et 230, comme les têtes : seules de fines tranches entrent dans la bande, et 9 570 pixels changent.
- `fixed` met les disques de body sur la page. Sans lui (129 caractères), ils sont placés dans la boîte de 400 × 90 de body et s'y répètent : la bande se remplit de demi-disques en x = 100, 200 et 300, trois pendus à son bord du haut et trois posés sur son bord du bas, et 10 902 pixels changent.
- `font:3vh/4"` règle la taille de police (pour `em`) et la hauteur de ligne (pour `lh`) en une seule déclaration. Le raccourci `font` exige un nom de police. Le `"` seul ouvre une chaîne, que la fin du code referme : un nom vide, pour 1 caractère. Sans lui (133 caractères), Chrome ignore toute la déclaration `font` : body garde 16px et 1lh = 18px, ses disques tombent hors de sa bande, les épaules disparaissent, et 11 790 pixels changent. Fermer la chaîne, `""`, donne la même image en 135 caractères.
- `50%` tient en 3 caractères. `200px` donne la même image en 136 caractères.
- `105 0` est lu en px en mode quirks. `105px 0` donne la même image en 136 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 496 pixels, avec la même règle que dans les notes de golf. Ils sont tous sur les bords ronds : 82 autour de chaque tête, 88 autour de chacune des deux épaules du haut, 74 autour de celle du bas. Les aplats de couleur sont les mêmes. Le juge de CSS Battle donne au code 100 % de ressemblance.
