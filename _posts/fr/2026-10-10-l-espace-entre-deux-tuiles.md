---
title: "L'espace entre deux tuiles : une prise bicolore en 133 caractères"
lang: fr
ref: 2026-10-10
permalink: /fr/2026/10/10/l-espace-entre-deux-tuiles/
description: "Comment un seul dégradé conique découpé, avec border-image en space, dessine quatre coins sur html et une bande de 1630px sur body pour la cible CSS Battle du 10 octobre 2026."
target: /assets/targets/2026-10-10.png
target_url: https://cssbattle.dev/play/nAasQ2XDz2bVPbp4Esjz
colors: ["#d9d9d9", "#bfa148", "#042f38"]
player: evanliomain
chars: 133
score: 712.6
match: 100
code: |
  <style>*{margin:85 40%85 170;border-image:conic-gradient(#d9d9d9 50%,#bfa148 0)10 30%/5ch 29%space;*{background:#042f38;margin:55-780
---

La cible du 10 octobre est un canevas bleu pétrole traversé par une barre horizontale, grise à gauche et dorée à droite, avec un espace au milieu. Au-dessus et en dessous de cet espace, quatre petits rectangles, dorés à gauche et gris à droite : les couleurs changent de côté. Je la dessine avec un seul `border-image`, utilisé par `html` et par `body`. Sur `html`, il ne garde que ses quatre coins. Sur `body`, étiré en une bande bien plus large que le canevas, le mot-clé `space` répète deux tuiles et laisse l'espace entre elles pile au milieu.

{% include animations/2026-10-10.html lang=page.lang %}

## Le code, aéré

```css
* {                          /* html (head et style restent cachés) */
  margin: 85 40% 85 170;
  border-image:
    conic-gradient(#d9d9d9 50%, #bfa148 0)   /* moitié droite grise, gauche dorée */
    10 30% /                 /* découpe */
    5ch 29%                  /* largeur des bords : 40px, 29 % */
    space;                   /* tuiles entières, le reste réparti */
  * {                        /* body */
    background: #042f38;
    margin: 55 -780;
  }
}
```

## Comment ça marche

### 1. La couleur du canevas vient du body

`html` n'a pas de fond. Dans ce cas, c'est le fond de `body` qui est peint sur tout le canevas : c'est le bleu pétrole. Inutile de le mettre sur `html`.

### 2. Un dégradé en deux moitiés

`conic-gradient(#d9d9d9 50%,#bfa148 0)` part du haut et tourne dans le sens des aiguilles d'une montre. La première moitié du tour, le côté droit, est grise ; la seconde, le côté gauche, est dorée. En `border-image`, il prend la taille de la boîte de bordure de l'élément.

`10 30%` le découpe en neuf morceaux : 10px en haut et en bas, 30 % de la largeur à gauche et à droite. `/5ch 29%` fixe la taille des zones de bord où ils sont dessinés : 5ch (40px, 1ch valant 8px avec la police par défaut) en haut et en bas, 29 % de la largeur sur les côtés. Il n'y a pas de `border` : le `border-image` est dessiné sur la boîte malgré tout.

### 3. Sur html : quatre coins, rien d'autre

`margin:85 40%85 170` (CSS Battle tourne en mode quirks, les nombres seuls sont donc des pixels) laisse à `html` 400 − 160 − 170 = 70px de large, en x = 170. En mode quirks, il fait 300 − 85 − 85 = 130px de haut.

- Les morceaux des coins font 21 × 10 (30 % de 70 font 21). Ils sont dessinés en 20 × 40 (29 % de 70 font 20,3). Ceux de gauche sont dorés, ceux de droite gris : ce sont les quatre petits rectangles.
- Les morceaux du haut et du bas font 28 × 10. Dessinée sur 40px de haut, une tuile ferait 112px de large, mais il n'y a qu'environ 30px entre les coins. Ceux des côtés sont tout aussi coincés : environ 105px de haut pour 50px de place. Avec `space`, Chrome ne dessine que des tuiles entières, et quand aucune ne tient, le bord reste vide.
- Sans le mot-clé `fill`, le morceau du milieu n'est jamais dessiné.

### 4. Sur body : une bande de 1630 × 20

Le `*` imbriqué vise `body`. `margin:55-780` le garde 55px en dedans du haut et du bas de `html`, et le pousse 780px au-delà de chaque côté. Il fait 70 + 2 × 780 = 1630px de large, de x = −610 à x = 1020, et 130 − 110 = 20px de haut, de y = 140 à y = 160.

Le fond de `body` est parti sur le canevas : la bande elle-même est transparente. Seul son `border-image` se voit.

### 5. Les bords réduits au quart

Sur `body`, l'image fait 1630 × 20. Les bords du haut et du bas demandent 40px chacun, 80px en tout, dans une boîte de 20px de haut. Quand deux bords opposés se chevauchent ainsi, les quatre largeurs sont réduites du même facteur, ici 20 / 80 = ¼ :

- en haut et en bas : 10px chacun, ils remplissent la bande pile ;
- à gauche et à droite : 29 % de 1630 × ¼ ≈ 118px.

Les coins font 118 × 10, aux deux bouts de la bande : très loin hors du canevas.

### 6. Deux tuiles, trois espaces

Le morceau du haut de l'image va de 30 % à 70 % de la largeur : 652 × 10, doré sur sa première moitié et gris sur la seconde. Dessinée sur 10px de haut, une tuile fait 652px de large. Le bord entre les coins mesure 1630 − 2 × 118 = 1394px. Deux tuiles tiennent (1304px), et `space` répartit les 90px qui restent en trois espaces égaux de 30px : avant, entre et après les tuiles. Le bord du bas fait pareil, juste dessous.

Sur le canevas :

- la tuile 1 finit en x = 190, par sa moitié grise ;
- l'espace du milieu va de x = 190 à x = 220, et laisse voir le bleu pétrole ;
- la tuile 2 commence en x = 220, par sa moitié dorée.

La barre est donc grise à gauche et dorée à droite, l'inverse des petits rectangles.

## Notes de golf

- Un seul `border-image` pour deux boîtes : les coins se voient sur le petit `html`, les bords sur le grand `body`.
- `space` fait deux choses : il supprime les bords de `html`, où aucune tuile ne tient, et il creuse l'espace dans la barre du `body`.
- Pas besoin de `border` : les largeurs après `/` suffisent à dessiner l'image.
- `5ch` vaut 40px en 3 caractères.
- `40%85`, `29%space` et `55-780` n'ont pas besoin d'espace : un `%` ou un signe moins termine le nombre qui précède.
- `<style>` n'est jamais fermé.
