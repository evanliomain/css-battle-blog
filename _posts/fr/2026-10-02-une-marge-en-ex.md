---
title: "Une marge en ex, deux largeurs : un space invader en 141 caractères"
lang: fr
ref: 2026-10-02
permalink: /fr/2026/10/02/une-marge-en-ex/
description: "Comment une bordure, une marge en ex et un zoom, partagés par html, body et trois titres, dessinent la cible CSS Battle du 2 octobre 2026 : un space invader en pixel art."
target: /assets/targets/2026-10-02.png
target_url: https://cssbattle.dev/play/KX0Y2zNqhT7RlOsL0IRq
colors: ["#141413", "#d97757"]
player: cubachatou
chars: 141
score: 704.33
match: 100
code: |
  <h2><h6><h6><style>*{background:#141413;margin:40 100;border:solid#D97757;border-width:30 20 0;*{margin:-6%20 13;*{margin:0-6ex -8q;zoom:1.67
---

La cible du 2 octobre est un petit monstre corail en pixel art sur un fond presque noir : un corps carré avec deux yeux, deux bras et quatre petites jambes. Vegy le construit avec cinq boîtes qui portent toutes la même bordure. Les bras et le ventre viennent d'une seule marge écrite en `ex` : le même `6ex` est large sur un `h2` et étroit sur un `h6`, parce que l'`ex` suit la taille de police.

{% include animations/2026-10-02.html lang=page.lang %}

## Le code, aéré

```css
/* <h2><h6><h6> : trois titres vides, côte à côte dans body */
* {                          /* html (et tout le reste) */
  background: #141413;
  margin: 40 100;
  border: solid #D97757;
  border-width: 30 20 0;     /* haut, côtés, bas */
  * {                        /* body (et en dessous) */
    margin: -6% 20 13;
    * {                      /* les trois titres */
      margin: 0 -6ex -8q;
      zoom: 1.67;
    }
  }
}
```

## Comment ça marche

### 1. Trois niveaux de `*`

Un titre ne peut pas contenir un autre titre. Quand l'analyseur HTML rencontre `<h6>` dans un `<h2>` ouvert, il ferme d'abord le `<h2>`. `<h2><h6><h6>` donne donc trois titres frères dans `body`, et le `<style>` atterrit dans le dernier.

Les règles `*` imbriquées choisissent ensuite les éléments selon leur profondeur, sans les nommer :

- `*` touche tout le monde : tous les éléments reçoivent le fond, la marge et la bordure corail ;
- `* *` demande un ancêtre : `body` et tout ce qu'il contient ;
- `* * *` en demande deux : les trois titres.

### 2. html : une arche

`margin:40 100` laisse une boîte de 200px de large. CSS Battle affiche la page en mode quirks, où `html` remplit le cadre moins ses marges : il fait donc 220px de haut, de (100, 40) à (300, 260).

Son fond part sur le canevas, comme toujours pour la racine. Sa bordure fait 30px en haut, 20px sur les côtés et 0 en bas : un U à l'envers, une arche.

### 3. body : une seconde arche, et les yeux

`body` reçoit la même bordure. `margin:-6%20 13` le place :

- une marge en pourcentage se calcule sur la largeur du parent, même en haut : −6 % de 160px, soit −9,6px, donc `body` commence vers y=60, sous la bordure du haut de `html` ;
- 20px de chaque côté lui donnent 120px de large, de x=140 à 260 ;
- en mode quirks, il s'étire jusqu'en bas de `html`.

Sa bordure du haut couvre y 60 à 90 entre x=140 et 260. Juste à côté, de x 120 à 140 et de 260 à 280, rien ne couvre l'intérieur sombre de `html`, à partir de y=70 (sous la bordure de `html`). Les bras fermeront ces couloirs à y=90 : deux carrés sombres de 20×20, les yeux.

### 4. Des titres en bandes pleines

Les titres sont vides : leur contenu fait 0px de haut. Avec une bordure de 30px en haut et de 20px sur les côtés, chacun est une bande corail pleine de 30px de haut.

`margin:0-6ex` fait dépasser chaque bande des deux côtés de la boîte de contenu du `body`, large de 80px. L'`ex`, c'est la hauteur d'x de la police en cours, et les titres gardent leur taille de police par défaut :

| | Taille de police | 6ex (mesuré en local) |
| --- | --- | --- |
| `h2` | 1.5em = 24px | ≈66px |
| `h6` | 0.67em ≈ 10,7px | ≈30px |

La même marge donne donc un `h2` large et deux `h6` étroits. La marge basse de `-8q` (−7,6px) remonte chaque bande sur la précédente.

### 5. zoom:1.67 agrandit tout

`zoom` multiplie toutes les longueurs des titres : bordures, marges, débords.

- Les bandes passent de 30px à 50px de haut.
- Le `h2` dépasse d'environ 110px de chaque côté : il va de x 50 à 350. Ce sont les bras, de y 90 à 140.
- Les `h6` dépassent d'environ 50px : de x 110 à 290. Leurs bouts se cachent sous les bordures latérales de `html` : ils remplissent le ventre.
- Les marges basses de −12,6px empilent les bandes tous les 37,4px : elles couvrent y 90 à 215.

### 6. Les jambes, c'est ce qui reste

Sous y=215, plus rien ne couvre les deux arches. Leurs bordures latérales descendent jusqu'à y=260 : celles de `html` en x 100 et 280, celles du `body` en x 140 et 240, 20px chacune. Quatre jambes. Entre elles, on voit l'intérieur de `html` et le fond sombre du `body`, et comme la bordure du bas vaut 0, rien ne les relie en bas.

## Notes de golf

- `<h2><h6><h6>` : aucune balise fermante, et deux tailles de police pour le prix d'une seule marge.
- `*`, `* *` et `* * *` atteignent `html`, `body` et les titres par leur profondeur, pour un caractère par niveau.
- Un seul `border` et un seul `border-width` servent aux cinq boîtes. `zoom` transforme la bordure de 30px en bandes de 50px.
- Pas d'unités en mode quirks : `margin:40 100`, `border-width:30 20 0`.
- Pas besoin d'espace dans `-6%20`, `0-6ex` ou `solid#D97757`.
- `8q` font 7,6px en 2 caractères.

## Si vous l'essayez chez vous

L'`ex` vient de la hauteur d'x de la police, il dépend donc de la police par défaut du système. Dans le dernier Chrome sur Mac (version 156 au moment d'écrire ces lignes), le `6ex` du `h2` mesure 66,3px. Une fois zoomés, les bras font 301,4px de large et sont dessinés de x=49 à 351, un pixel de trop de chaque côté : 100 pixels faux, deux colonnes de 50. Les bras de la cible vont exactement de x 50 à 350. Sur le juge de CSS Battle, la solution est identique à 100 %.
