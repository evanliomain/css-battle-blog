---
title: "Une rotation, quatre boîtes : un X coupé en deux en 135 caractères"
lang: fr
ref: 2026-11-12
permalink: /fr/2026/11/12/une-rotation-quatre-boites/
description: "Comment offset:ray(45deg), écrit une seule fois sur *, centre et tourne quatre boîtes emboîtées pour dessiner la cible CSS Battle du 12 novembre 2026 : un X jaune coupé par une bande corail, sur fond corail."
target: /assets/targets/2026-11-12.png
target_url: https://cssbattle.dev/play/odhXZQ3ZrxdqUAYnc3D5
colors: ["#f2eaa8", "#e76"]
player: emohdaziz
chars: 135
score: 710.47
match: 100
code: |
  <dl><p><style>*{offset:ray(45deg)}&,dl,p{height:5em;width:4;border-inline:6lh solid#f2eaa8;>*{background:#e76;p{width:180;font:37%/85%"
---

La cible du 12 novembre est corail, avec un X jaune pâle coupé en deux par une bande corail, et deux petits carrés jaunes aux bouts de cette bande. La solution de Mohamed Ali n'écrit ni position, ni marge, ni angle pour chaque boîte. `offset:ray(45deg)` sur `*` centre chaque boîte sur son parent et la tourne de −45°. Les boîtes sont emboîtées, donc les rotations s'additionnent : deux barres croisées, puis une bande à plat.

Les **couleurs pédagogiques** distinguent les deux barres et la bande.

{% include animations/2026-11-12.html lang=page.lang %}

## Le code, aéré

```css
<dl><p>                                /* body > dl > p */
<style>
* {
  offset: ray(45deg);                  /* centré sur le parent, tourné de −45° */
}
&, dl, p {                             /* html, dl et p */
  height: 5em;                         /* 80 sur html et dl */
  width: 4;
  border-inline: 6lh solid #f2eaa8;    /* 108 + 4 + 108 = 220 de long */
  > * {                                /* leurs enfants : body, head, p */
    background: #e76;                  /* body → le canevas ; p → la bande */
    p {                                /* le p */
      width: 180;
      font: 37% / 85% "";              /* petite police : 5em et 6lh rétrécissent */
    }
  }
}
</style>
```

## Comment ça marche

### 1. html : une barre

Au premier niveau, `&` vise la racine, `html`. Elle reçoit `width:4`, `height:5em` et deux bordures de `6lh`. Avec la police par défaut de 16px, la ligne fait 18px de haut, donc `6lh` vaut 108px, et `5em` vaut 80px. La boîte fait 4 + 2 × 108 = 220 de long et 80 de haut : deux blocs jaunes, séparés par un trou de 4px.

### 2. offset : centrer et tourner

`offset:ray(45deg)` pose la boîte sur un chemin : un rayon qui part du centre de son bloc conteneur, à 45° de la verticale. Sans distance le long du rayon, la boîte reste à son départ, centrée dessus, et tournée dans son sens : 45° − 90° = −45°.

Pour `html`, le bloc conteneur est le canevas de 400 × 300. Sa barre est centrée en (200, 150) et va d'en bas à gauche à en haut à droite. Les marges ne jouent aucun rôle : c'est le chemin qui place la boîte.

### 3. Le body : du corail et un quart de tour

`>*` est imbriqué : il vise les enfants de `html`, de `dl` et du `p`. Le `body` est un enfant de `html` : il reçoit `background:#e76`. `html` n'a pas de fond, donc celui du `body` passe à tout le canevas : c'est le corail.

Le `body` est aussi visé par `*` : il a son propre `offset`. Il se centre sur le centre de `html` et tourne encore de −45°, en plus du tour de `html` : −90° en tout. Il ne peint rien d'autre, mais chaque boîte qu'il contient part de cet angle.

### 4. dl : la deuxième barre

Le `<dl>` est dans le `body`. Il est visé par `&,dl,p` : la même barre de 220 × 80. Ses −45° s'ajoutent à ceux du `body` : −135°. Elle va d'en haut à gauche à en bas à droite et croise la première en (200, 150) : un X.

Chaque barre a un trou de 4px au milieu, en travers. `dl` est peint au-dessus de `html`, et l'autre barre couvre chaque trou, sauf un carré de 4 × 4 tout au centre.

### 5. p : la bande horizontale

Le parseur met le `<p>` dans le `<dl>`. Encore −45°, cela fait −180° : le `p` est à plat. Enfant de `dl`, il reçoit le fond corail de `>*`, et la règle `p` imbriquée lui donne `width:180` et `font:37%/85%"`.

37 % de 16 fait 5,92px, donc `5em` fait 29,6px de haut. La hauteur de ligne, 85 %, se calcule sur le plancher de 6px du texte dans Chrome : 5,1px. `6lh` vaut donc 30,6px, et l'épaisseur de la bordure est arrondie à 30. La bande fait 180 + 2 × 30 = 240 de long, de x = 80 à 320, et 29,6 de haut autour de y = 150.

Son milieu corail couvre le centre du X et le coupe en une forme du haut et une forme du bas. Ses bordures jaunes font les deux carrés de 30 × 30 de chaque côté.

## Notes de golf

- Un seul `offset` sur `*` remplace les marges, les positions et quatre angles. Chaque niveau d'imbrication ajoute −45° sans rien coûter, le `body` compris.
- Une règle pour trois boîtes : `&,dl,p` donne la même barre à `html` et à `dl`. Le `p` change seulement sa largeur et sa police, et ses bordures rétrécissent avec la police, de 108 à 30.
- `>*` met le corail seulement sur les enfants : le `body` (le canevas) et le `p` (le milieu de la bande). `html` et `dl` restent transparents, donc les barres ont un vrai trou.
- `width:4` donne aux barres 220 de long. J'ai vérifié que `width:0` change le rendu.
- `<dl><p>` sans balises fermantes : le parseur met le `p` dans le `dl`, ce qui donne les quatre niveaux.
- `#e76`, une couleur à 3 chiffres, et une famille de police vide `"` laissée ouverte à la fin du code.
