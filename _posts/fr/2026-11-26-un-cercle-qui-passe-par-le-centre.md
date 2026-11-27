---
title: "Un cercle qui passe par le centre : un viseur rose en 186 caractères"
lang: fr
ref: 2026-11-26
permalink: /fr/2026/11/26/un-cercle-qui-passe-par-le-centre/
description: "Comment une bordure en pointillés, un body rond et offset:-21% circle(83q)/74q sur quatre boîtes imbriquées dessinent la cible CSS Battle du 26 novembre 2026 : un anneau rose à quatre bosses et quatre pilules en croix."
target: /assets/targets/2026-11-26.png
target_url: https://cssbattle.dev/play/TKYsmdfc2XMpMT4qG9mS
colors: ["#5f133f", "#f075b0", "#f7bed9"]
player: benjamintordjman
chars: 186
score: 667.94
match: 100
code: |
  <dt><dl><dl><p><style>*{background:#5f133f;margin:95 145;color:F075B0;border:43q dotted;*{margin:-40;border:11q solid;border-radius:9in;*{width:20;color:F7BED9;offset:-21%circle(83q)/74q
---

La cible du 26 novembre montre un anneau rose sur un fond prune, avec quatre bosses rondes sur ses diagonales et quatre pilules rose pâle en croix. Benjamin Tordjman la dessine avec trois règles imbriquées. `html` fait les quatre bosses avec une bordure en pointillés, et le `body` les recouvre d'un anneau rond. Quatre pilules imbriquées se posent sur un cercle d'`offset` qui part toujours du centre du canevas, et chacune tourne d'un quart de tour de plus que son parent.

La **vue large** montre les pilules empilées en haut à gauche avant qu'`offset` les déplace, et les **couleurs pédagogiques** donnent à chaque boîte sa couleur.

{% include animations/2026-11-26.html lang=page.lang %}

## Le code, aéré

```css
<dt><dl><dl><p>                     /* quatre boîtes de plus, chacune dans la précédente */
<style>
* {                                 /* html, body, dt, dl, dl, p */
  background: #5f133f;              /* html : le canevas */
  margin: 95 145;                   /* html : une boîte de 110 × 110 au milieu */
  color: F075B0;                    /* rose, sans # en mode quirks */
  border: 43q dotted;               /* points de 40px : un par coin */
  * {                               /* body, dt, dl, dl, p */
    margin: -40;                    /* body : revient sur la bordure de html */
    border: 11q solid;              /* un anneau de 10px */
    border-radius: 9in;             /* rond */
    * {                             /* dt, dl, dl, p */
      width: 20;                    /* + 2 × 10 de bordure : pilules de 40 × 20 */
      color: F7BED9;                /* rose pâle */
      offset: -21% circle(83q) / 74q; /* sur un cercle qui passe par le centre, un quart de tour de plus */
    }
  }
}
```

## Comment ça marche

### 1. html : quatre points

La page n'a pas de doctype : elle est en mode quirks, où `margin:95 145` vaut 95px et 145px. `html` est une boîte de 110 × 110, de (145, 95) à (255, 205). Son fond passe à tout le canevas.

`43q` vaut 40,63px, et Chrome dessine la bordure à 40. Entre deux coins, 110 − 2 × 40 ne laisse que 30px. Une bordure `dotted` aussi épaisse pose un point de 40px dans chaque coin, et rien d'autre : j'ai rendu `html` seul et trouvé les quatre points, centrés en (165, 115), (235, 115), (165, 185) et (235, 185), et rien entre eux. `color:F075B0` marche sans `#` en mode quirks, et la bordure prend cette couleur.

### 2. body : l'anneau

Le `*{` imbriqué vise tout ce qui est dans `html` : le `body` et les quatre balises. Le `body` part de la boîte de contenu de `html`, 30 × 30 en (185, 135). `margin:-40` le fait sortir de 40px de chaque côté : 110 × 110, pile sur `html`. Je l'ai mesuré en (145, 95).

`9in` dépasse largement la moitié de 110 : la boîte est un disque. `11q` vaut 10,39px, dessiné à 10. Le fond prune remplit le disque jusqu'à sa bordure, donc il cache l'intérieur des quatre points. La bordure, c'est l'anneau, de 45 à 55px du centre. Chaque point est centré à 49,5px du centre, avec un rayon de 20 : il n'en reste que la partie au-delà de 55px. Ce sont les quatre bosses.

### 3. Quatre pilules

`<dt><dl><dl><p>` ajoute quatre balises, chacune dans la précédente. Elles prennent le troisième `*{`, et gardent la marge, la bordure et l'arrondi du deuxième. `width:20` plus 10px de bordure de chaque côté : 40 de large. Leur hauteur de contenu est nulle, donc elles font 20 de haut : 40 × 20, arrondies aux deux bouts, en rose pâle. Leur fond prune n'a pas de place pour se montrer : leur boîte intérieure fait 20 × 0.

Les marges de −40 comptent ici aussi. Chaque enfant fait 20 de haut, et ses marges retirent 80px : il n'ajoute rien à la hauteur de son parent. Avec des marges à 0, les pilules grandissent. Sans `offset`, elles sont en (115, 65), (85, 35), (55, 5) et (25, −25), chacune 30px plus haut et plus à gauche que son parent. Le `<p>` dépasse en partie au-dessus du canevas.

### 4. Un cercle qui passe par le centre

`offset` est un raccourci pour un chemin de mouvement. Ici, il donne `offset-position:-21%`, `offset-path:circle(83q)` et `offset-anchor:74q`. Le cercle n'a pas de `at` : il est centré sur `offset-position`. Cette position se mesure dans la boîte de bordure du parent : pour le `dt`, le `body` de 110px. Je l'ai vérifié : passer de 0 % à 50 % déplace la pilule de 55px. −21 % de 110 font −23,1 : le centre du cercle est en (121,9 ; 150).

`83q` vaut 78,43px. Il n'y a pas d'`offset-distance` : la boîte reste au départ du chemin. Pour un cercle, le départ est son point le plus à droite : 121,9 + 78,43 = 200,33. Le chemin part de (200,33 ; 150), le centre du canevas à un tiers de pixel près.

### 5. L'ancre et le quart de tour

`74q` vaut 69,92px. `offset-anchor` prend le point à 69,92px du bord gauche de la pilule, à mi-hauteur. Ce point est hors de la pilule de 40px, 29,92px après son bout droit, et c'est lui qui va sur le départ du chemin.

`offset-rotate` vaut `auto` par défaut : la boîte aligne son axe horizontal sur la direction du chemin. Le cercle tourne dans le sens horaire : à son point le plus à droite, il descend. La pilule tourne de 90°, et son centre finit 49,92px au-dessus de l'ancre : (200,33 ; 100,08). C'est la pilule du haut, de y = 80,08 à 120,08. Avec `offset-rotate:0deg`, elle reste à plat, à gauche de l'ancre : je l'ai vérifié.

### 6. Un niveau plus bas

Le premier `<dl>` est dans le `dt` : il est posé dans le repère tourné du `dt`. Son chemin se mesure dans la boîte de bordure du `dt`, qui fait 40 de large. −21 % de 40 font −8,4, et −8,4 + 78,43 = 70,03 : le départ de son chemin est à 0,11px de l'ancre du `dt`. C'est encore le centre du canevas. Là, le `<dl>` tourne de 90° de plus que son parent.

Les rotations s'additionnent : `dt` 90°, `<dl>` 180°, deuxième `<dl>` 270°, `<p>` 360°. Chacun pose sa pilule à 50px du centre, dans une nouvelle direction. J'ai mesuré les quatre pilules centrées en (200,33 ; 100,08), (250,25 ; 150,1), (200,22 ; 200,03) et (150,3 ; 150) : haut, droite, bas, gauche.

Les trois nombres conviennent à deux tailles de boîte à la fois. Dans le `body` de 110px, le départ doit être en son centre, 55 : 78,43 − 0,21 × 110 = 55,33. Dans une pilule de 40px, il doit être sur l'ancre, 69,92 : 78,43 − 0,21 × 40 = 70,03. Le tiers de pixel qui reste décale un peu à droite les deux pilules debout. Le site donne quand même 100 % à la solution.

## Notes de golf

- Trois règles imbriquées : `*`, puis un `*{` dedans, puis un autre. Chaque niveau n'écrit que ce qui change, et prend le reste du niveau au-dessus.
- `color` sans `#` marche en mode quirks, et une bordure sans couleur prend `color`. Une couleur par niveau, écrite une seule fois.
- `<dt><dl><dl><p>` donne quatre boîtes imbriquées sans aucune balise fermante.
- `9in` est un rayon assez grand en 3 caractères.
- `offset` place et tourne les quatre pilules : ni `position`, ni `rotate`, ni `transform`.
- `-21%circle(83q)/74q` n'a besoin d'aucune espace, et ni le chemin ni les règles ne sont fermés.
