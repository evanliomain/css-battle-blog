---
title: "Un polygone, deux boîtes : une icône d'écran en 152 caractères"
lang: fr
ref: 2026-10-25
permalink: /fr/2026/10/25/un-polygone-deux-boites/
description: "Comment un seul clip-path, appliqué au body et à un p agrandi, dessine la cible CSS Battle du 25 octobre 2026 : un cadre, un triangle sombre et l'encoche entre les deux."
target: /assets/targets/2026-10-25.png
target_url: https://cssbattle.dev/play/Y5ONBPIczkMuJt7MUtxP
colors: ["#809e97", "#36443b"]
player: ludvig
chars: 152
score: 693.95
match: 100
code: |
  <p><STYLE>*{background:#809E97;border:33q solid#36443B;margin:60 50;*{margin:-82;*{margin:101 139-140;scale:5.5 4}clip-path:polygon(50%57%,68%89%,32%89%
---

La cible du 25 octobre ressemble à une icône de partage d'écran : un épais cadre sombre sur un fond vert-de-gris, et un triangle sombre en bas qui traverse la barre du cadre, entouré d'une fine bande couleur fond. Ludvig la dessine avec une seule règle pour tous les éléments : même fond, même bordure, même `clip-path`. Le `body` et un `<p>` découpent deux triangles un peu différents dans leurs propres boîtes, et l'écart entre les deux est l'encoche.

{% include animations/2026-10-25.html lang=page.lang %}

## Le code, aéré

```css
<p><STYLE>
* {                              /* tous les éléments */
  background: #809E97;
  border: 33q solid #36443B;
  margin: 60 50;                 /* html : le cadre */
  * {                            /* body, p (head et style restent cachés) */
    margin: -82;                 /* body : 402 × 282 */
    * {                          /* p */
      margin: 101 139 -140;
      scale: 5.5 4;
    }
    clip-path: polygon(50% 57%, 68% 89%, 32% 89%);   /* body et p */
  }
}
```

## Comment ça marche

### 1. html est le cadre

Le `*` extérieur touche `html`. Son fond part sur le canevas. `margin:60 50` laisse une boîte de 300px de large et, en mode quirks (celui de CSS Battle), `html` remplit la hauteur de la page moins ses marges : 300 − 60 − 60 = 180. Sa bordure fait 33q, environ 31px (1q est un quart de millimètre). Cette bordure est le cadre, en (50, 60).

### 2. body est une grande boîte qui cache tout

La règle du milieu touche tous les éléments dans `html`. Pour `body`, `margin:-82` le fait déborder de 82px de chaque côté de la boîte de contenu de `html` (238 × 118 en (81, 91)). En mode quirks, sa hauteur suit de la même façon : le body est une boîte de 402 × 282 en (−1, 9).

Il a le même fond et la même bordure de 31px. Peint par-dessus `html`, il cacherait le cadre s'il n'était pas découpé.

### 3. Le triangle du body est l'encoche

Le `clip-path` est dans la règle du milieu, après la règle imbriquée : il vaut pour le `body` et pour le `p`. Ses pourcentages se calculent sur la boîte de chaque élément. Sur le body :

| Point | Pourcentages | Position |
| --- | --- | --- |
| pointe | 50% 57% | (200, 170) |
| bas droite | 68% 89% | (272, 260) |
| bas gauche | 32% 89% | (128, 260) |

Le triangle est à l'intérieur de la bordure du body : il ne montre que son fond, la couleur du fond. Sur l'intérieur du cadre, il est invisible. Sur la barre du bas du cadre, il efface un triangle : l'encoche.

### 4. Le p n'est que de la bordure

Le `<p>` vient avant `<STYLE>`, donc il est dans `body` (et le style finit dedans, caché). La règle la plus profonde lui donne `margin:101 139-140`. Dans les 340px de contenu du body, 139 + 139 laissent 62px, que les deux bordures latérales de 31px remplissent entièrement. Le `p` n'a aucun contenu visible, sa hauteur se limite donc à ses bordures haute et basse : un carré sombre de 62 × 62 en (169, 141).

### 5. scale le fait grandir

`scale:5.5 4` l'agrandit autour de son centre, (200, 172) : 62 × 5,5 = 341 de large et 62 × 4 = 248 de haut, de (29,5 ; 48) à (370,5 ; 296). Tout est sombre : ce n'est toujours que de la bordure.

### 6. Le même polygone donne un triangle plus petit et plus bas

Le `p` reçoit le même `clip-path`, mesuré sur sa boîte non agrandie, puis agrandi avec elle. Sur la boîte de 341 × 248, la pointe tombe vers y = 189 et la base vers y = 269 : un triangle sombre un peu plus petit et plus bas que celui du body.

Un `clip-path` sur un parent découpe aussi ses enfants. Le triangle du `p` est donc recoupé par celui du body, dont la base est à y = 260. C'est le bas bien droit du triangle sombre de la cible, de x = 146 à 254.

Ce qui reste entre les deux triangles, c'est la bande couleur fond autour du triangle sombre : l'encoche dans la barre.

## Notes de golf

- Une seule règle pour tous les éléments : fond, bordure et marge ne sont écrits qu'une fois. La couleur est dans `border`, pas besoin de `color`.
- Un seul `clip-path` pour deux triangles : les mêmes pourcentages sur deux boîtes différentes donnent deux triangles différents.
- `scale` à deux valeurs transforme un petit carré en grand rectangle, sans `width` ni `height`.
- Le `clip-path` du parent recoupe l'enfant gratuitement : le triangle sombre n'a pas besoin d'un quatrième point.
- `33q`, c'est 31px en 3 caractères ; `139-140` n'a pas besoin d'espace avant le signe moins.
- `<STYLE>` marche comme `<style>` : les noms de balises ne tiennent pas compte de la casse.
