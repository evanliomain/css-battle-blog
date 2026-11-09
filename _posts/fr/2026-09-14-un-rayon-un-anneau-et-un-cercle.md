---
title: "Un rayon, un anneau et un cercle : quatre arcs en 184 caractères"
lang: fr
ref: 2026-09-14
permalink: /fr/2026/09/14/un-rayon-un-anneau-et-un-cercle/
description: "Comment offset:ray(), une seule border-image et un clip-path en cercle dessinent la cible CSS Battle du 14 septembre 2026 : une croix bleue entre quatre arcs."
target: /assets/targets/2026-09-14.png
target_url: https://cssbattle.dev/play/9sCBYHjLMHJ372p55cz7
colors: ["#f8b140", "#465792"]
player: cubachatou
chars: 184
score: 669.25
match: 100
code: |
  <p><style>*{background:#F8B140;offset:ray(0deg);*{width:80;height:30;background:#465792;border-image:radial-gradient(#0000 81q,#465792 0 41%,#0000 0)98%0/131q/9pc;clip-path:circle(95px
---

La cible du 14 septembre est bleue sur orange : une petite croix au milieu, et quatre arcs autour, chacun tourné vers la croix. La solution de Vegy ne règle jamais ni position ni rotation. `offset:ray(0deg)` centre chaque élément dans son parent et le tourne d'un quart de tour, ce qui donne la croix. Les quatre anneaux viennent d'une seule `border-image`, écrasée dans les bords haut et bas de chaque barre, et `clip-path:circle(95px)` coupe chaque anneau en deux.

Cochez **Couleurs pédagogiques** pour voir ce que dessine le `<p>`.

{% include animations/2026-09-14.html lang=page.lang %}

## Le code, aéré

```css
<p>
<style>
* {                                  /* html, body et p */
  background: #F8B140;
  offset: ray(0deg);                 /* centré, tourné de −90° */
  * {                                /* le body et le p */
    width: 80;
    height: 30;
    background: #465792;
    border-image:
      radial-gradient(#0000 81q, #465792 0 41%, #0000 0)  /* un anneau */
      98% 0 / 131q / 9pc;            /* découpe / largeur / débord */
    clip-path: circle(95px);
  }
}
```

## Comment ça marche

### 1. offset : une croix

`offset` est le raccourci du déplacement le long d'un chemin. `ray(0deg)` est un chemin : un rayon droit, qui part du centre de la boîte parente et monte (0deg, c'est vers le haut). Sans distance, l'élément reste au départ du rayon : son centre est posé sur le centre de son parent. Et par défaut, il tourne pour suivre le chemin : son axe x pointe le long du rayon, vers le haut, soit un quart de tour de −90°.

`*` donne ça à tous les éléments, et `*` imbriqué donne `width:80;height:30` et le fond bleu au `body` et au `<p>`. Chaque niveau tourne encore : `html` de −90°, le `body` de −180° en tout, le `<p>` de −270°, un quart de tour. Les trois sont centrés sur le même point, (200 ; 150). Le `body` est une barre couchée de 80 × 30, le `<p>` une barre debout : la croix.

### 2. Un anneau dans une grande zone

Le `body` et le `<p>` reçoivent aussi une `border-image`. Sa dernière valeur, `9pc`, est le débord : la zone de l'image dépasse la boîte de 144px de chaque côté, soit 80 + 288 = 368 sur 30 + 288 = 318.

L'image est `radial-gradient(#0000 81q,#465792 0 41%,#0000 0)`, aussi grande que cette zone : une ellipse qui va du centre au coin le plus loin. Elle est transparente jusqu'à `81q` (76,5px), bleue de là jusqu'à 41 % (le `0` remonte à 76,5), puis transparente. C'est un large anneau bleu, un peu aplati parce que la zone est plus large que haute.

### 3. Découpé : deux petits anneaux

`98% 0` est la découpe. Elle coupe l'image à 98 % du haut et à 98 % du bas, et à 0 des côtés. Avec une découpe de 0 sur les côtés, les coins et les bords de côté n'ont aucune image. Les coupes du haut et du bas se chevauchent : pas de morceau du milieu non plus. Seuls les bords haut et bas sont peints.

Le morceau du haut, c'est presque toute l'image : toute la largeur, et 98 % de la hauteur. `131q` est la largeur de la bordure : 123,8px. Ce morceau est donc écrasé dans la bande de bordure du haut, qui fait 368 − 2 × 123,8 = 120,4 de large et 123,8 de haut. Le grand anneau y devient petit, d'un rayon d'environ 25 à 35px, avec son centre 95,9px au-dessus du centre de l'élément. Le morceau du bas fait de même en dessous.

Le `body` est tourné de 180° : ses deux anneaux tombent au-dessus et au-dessous de la croix. Le `<p>` est tourné d'un quart de tour : ses deux anneaux tombent à gauche et à droite.

### 4. clip-path : des demi-anneaux

`clip-path:circle(95px)` ne garde de chaque élément que ce qui est à moins de 95px de son centre. Chaque petit anneau est centré à 95,9px : le bord du cercle passe presque par son milieu. La moitié extérieure de chaque anneau est coupée, il ne reste que la moitié tournée vers la croix : quatre arcs. Les barres elles-mêmes sont bien dans le cercle et ne sont pas coupées.

## Notes de golf

- `offset:ray(0deg)` centre un élément et le tourne en 15 caractères, sans `margin`, `position` ni `rotate`.
- Écrit dans `*`, le même `offset` tourne chaque niveau d'un quart de tour de plus : une barre se couche, la suivante se lève.
- `98%0` ne peint que les bords haut et bas de la `border-image`, chacun écrasé dans une petite bande : un grand anneau en donne deux petits.
- Le débord `9pc` donne à l'anneau une zone assez grande, sans élément de cette taille.
- `clip-path:circle(95px)` coupe les quatre anneaux en deux d'un coup.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
