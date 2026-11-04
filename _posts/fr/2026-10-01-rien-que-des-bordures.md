---
title: "Rien que des bordures : une cassette en 255 caractères"
lang: fr
ref: 2026-10-01
permalink: /fr/2026/10/01/rien-que-des-bordures/
description: "Comment quatre éléments, chacun dessiné avec une simple bordure épaisse, reconstruisent la cible CSS Battle du 1er octobre 2026 : une cassette audio."
target: /assets/targets/2026-10-01.png
target_url: https://cssbattle.dev/play/2T06JBTudrVtVc9pONU7
colors: ["#fffc", "#444", "#7dcb61", "#ccc5"]
player: eguiluz
chars: 255
score: 635.2
match: 100
code: |
  <p><img><img><style>&,p,img{border-radius:2in;margin:-220-155;border:25vw solid#fffc}&{background:#444;border:193Q solid#7dcb61;margin:-127-117;*{border:solid#ccc5;border-width:20 55;margin:140 60 0;p{*{scale:.2;margin:-75-325-75 25}clip-path:inset(30%58Q
---

La cible du 1er octobre est une cassette audio sur fond vert : un boîtier gris foncé aux coins arrondis, une fenêtre claire avec deux bobines dans une pilule sombre, et une étiquette grise en bas. David Eguiluz en dessine chaque morceau avec une bordure. Le vert autour de la cassette est une bordure, l'étiquette aussi, la fenêtre aussi, les bobines aussi. Un seul fond dans tout le code : le gris foncé.

{% include animations/2026-10-01.html lang=page.lang %}

## Le code, aéré

```css
/* <p><img><img><style> : body contient un p, le p contient deux img (et le style) */
&, p, img {               /* html, le p et les deux img */
  border-radius: 2in;     /* 192px */
  margin: -220 -155;
  border: 25vw solid #fffc;   /* 100px */
}
& {                       /* html */
  background: #444;
  border: 193Q solid #7dcb61; /* ≈182px de vert */
  margin: -127 -117;
  * {                     /* tout ce qui est dans html : ici, body */
    border: solid #ccc5;
    border-width: 20 55;
    margin: 140 60 0;
    p {
      * {                 /* les deux img */
        scale: .2;
        margin: -75 -325 -75 25;
      }
      clip-path: inset(30% 58Q);
    }
  }
}
```

## Comment ça marche

### 1. Qui reçoit quelle règle

On pourrait croire que `* { border: solid #ccc5 }` touche tout le monde. Ce n'est pas le cas, et c'est ce qui rend la première règle rentable.

Au premier niveau, `&` vise `html`, mais dans Chrome il n'ajoute aucune spécificité, comme `:where()`. Donc :

- `&` et `& *` pèsent zéro ;
- `p` et `img` pèsent chacun un élément, ils l'emportent sur `& *`.

Ce que chaque élément reçoit au final :

| Élément | Bordure | Marge | En plus |
| --- | --- | --- | --- |
| `html` | 182px de vert, arrondi 2in | `-127 -117` | `background:#444` |
| `body` | `#ccc5`, 20px et 55px | `140 60 0` | |
| `p` | 100px de `#fffc`, arrondi 2in | `-220 -155` | `clip-path` |
| `img` ×2 | 100px de `#fffc`, arrondi 2in | `-75 -325 -75 25` | `scale:.2` |

`body` n'est pas dans la première liste : c'est le seul à prendre la bordure `#ccc5`. `html` est dans les deux règles `&`, et la seconde gagne pour la bordure et la marge, mais rien ne remplace son `border-radius`.

### 2. html : le vert est une bordure

`margin:-127-117` fait déborder `html` de tous les côtés. CSS Battle affiche la page en mode quirks, où `html` remplit le cadre moins ses marges : sa boîte fait 634×554, de (−117, −127) à (517, 427).

Son fond `#444` est le fond de la racine, il couvre donc tout le canevas. Puis `border:193Q` peint du vert par-dessus. 193Q font 182,4px, que Chrome dessine sur 182px. Ce qui reste à l'intérieur, c'est exactement la cassette : 270×190 en (65, 55).

Les coins arrondis sont offerts. L'arrondi extérieur vaut 2in (192px), et le bord intérieur d'une bordure est arrondi de ce rayon moins l'épaisseur : 192 − 182 = 10px. Les coins extérieurs sont arrondis aussi, mais ils tombent loin hors du canevas.

### 3. body : l'étiquette

`body` se place dans la cassette avec `margin:140 60 0`. En mode quirks, il s'étire aussi jusqu'en bas : il fait 150×50 en (125, 195).

Sa bordure fait 20px en haut et en bas, 55px sur les côtés, en `#ccc5` : du `#ccc` à un tiers d'opacité, soit environ `#727272` sur le gris foncé. C'est l'étiquette. Le trou de 40×10 qui reste au milieu laisse voir le `#444` derrière : la fente.

### 4. p : un grand anneau avec un trou en pilule

Le `p` vit dans la boîte de contenu du `body`, large de 40px, mais `margin:-220-155` l'envoie loin dehors : il devient un rectangle de 350×250 en (25, −5). Sa bordure de 100px en `#fffc` le couvre presque entièrement. `#fffc`, c'est du blanc à 80 %, soit environ `#d9d9d9` sur le gris foncé.

Sa boîte de contenu ne fait que 150×50, en (125, 95). Les 50px de haut viennent de la ligne d'images qu'il contient (voir plus bas).

L'arrondi fait le reste. 2in (192px), c'est trop pour une boîte de 250px de haut : deux coins demanderaient 384px. Quand les rayons débordent, le navigateur les réduit tous du même facteur jusqu'à ce qu'ils tiennent, ici à 125px. Le bord intérieur est arrondi de 125 − 100 = 25px, ce qui transforme le trou de 150×50 en pilule. Cette pilule, c'est la bande sombre autour des bobines.

### 5. Les bobines sont des images vides

Une `<img>` sans `src` a une boîte de contenu de 0×0. Avec 100px de bordure, c'est un carré de 200×200, et l'arrondi de 2in (ramené à 100px) en fait un cercle.

Les deux images sont sur une même ligne dans le `p` :

- `margin-left:25` et `margin-right:-325` : chaque image prend 25 + 200 − 325 = −100px de place, donc la suivante commence 100px plus à gauche. La première tombe de x 150 à 350, centrée sur x=250. La seconde tombe de x 50 à 250, centrée sur x=150.
- `-75` en haut et en bas laisse une boîte de marge de 50px de haut seulement. C'est la hauteur de la ligne, donc celle de la boîte de contenu du `p`, et celle de la pilule.

`scale:.2` réduit ensuite chaque cercle autour de son centre, de 200px à 40px. Les bobines finissent de x 130 à 170 et de 230 à 270, de y 100 à 140.

### 6. clip-path découpe la fenêtre

À ce stade, le `p` est un énorme anneau clair qui couvre la moitié du canevas. `clip-path:inset(30% 58Q)` le recoupe :

- 30 % de 250px, c'est 75px en moins en haut et en bas : de y 70 à 170 ;
- 58Q, c'est environ 55px en moins de chaque côté : de x 80 à 320.

Il reste la fenêtre de 240×100. La découpe s'applique aussi aux images dans le `p`, mais les bobines sont bien à l'intérieur.

## Notes de golf

- Une règle partagée par `html`, `p` et `img`, et c'est la spécificité nulle d'un `&` de premier niveau qui décide qui garde quoi. `body` reçoit sa bordure sans être nommé.
- Des couleurs transparentes sur `#444` : `#fffc` et `#ccc5` font 5 caractères chacune et donnent le gris clair et le gris moyen.
- Les unités sont facultatives en mode quirks : `margin:-220-155`, `border-width:20 55`. Pas besoin d'espace avant un signe moins ou un `#`.
- `25vw` vaut 100px, `2in` 192px, `193Q` environ 182px, le tout en 4 caractères ou moins.
- Des balises `<img>` vides donnent des cercles gratuits, dès qu'elles ont une bordure et un arrondi.
- `<p>` n'est jamais fermé, le `<style>` est rangé dedans, et le style n'est pas fermé non plus.
