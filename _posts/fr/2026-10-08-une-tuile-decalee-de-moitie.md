---
title: "Une tuile décalée de moitié : une sucette en 153 caractères"
lang: fr
ref: 2026-10-08
permalink: /fr/2026/10/08/une-tuile-decalee-de-moitie/
description: "Comment deux dégradés radiaux sur html et une tuile de fond répétée dessinent la cible CSS Battle du 8 octobre 2026, avec body comme bâton."
target: /assets/targets/2026-10-08.png
target_url: https://cssbattle.dev/play/F2CiIdrt567y4qH4XEGq
colors: ["#9959", "#535fb1", "#d07b5f", "#444"]
player: cubachatou
chars: 153
score: 693.06
match: 100
code: |
   <style>&{background:radial-gradient(1Q,#d07b5f 53Q,#0000),radial-gradient(1in at 50%95%,#535fb1 90Q,#9959 89%)0 50vh;*{margin:190 190 60;background:#444
---

La cible du 8 octobre ressemble à une sucette, ou à un petit arbre : un demi-disque bleu posé sur son côté plat, un disque orange devant, et un bâton gris en dessous. Vegy la dessine avec deux dégradés sur `html`, et le `body` comme bâton. Le plus malin, c'est le côté plat du demi-disque : rien ne le coupe, c'est la tuile du fond qui s'en charge.

{% include animations/2026-10-08.html lang=page.lang %}

## Le code, aéré

```css
& {                            /* & seul, c'est html */
  background:
    radial-gradient(1Q, #d07b5f 53Q, #0000),                     /* calque 1, au-dessus */
    radial-gradient(1in at 50% 95%, #535fb1 90Q, #9959 89%)      /* calque 2, en dessous */
      0 50vh;                                                    /* sa position */
  * {                          /* les enfants de html : head, style, body */
    margin: 190 190 60;
    background: #444;
  }
}
```

## Comment ça marche

### 1. Deux calques sur html

Au premier niveau d'une feuille de style, `&` désigne la racine : `html`. Son `background` liste deux calques. Le premier est peint au-dessus, le dernier tout en dessous : l'image se construit donc à partir du second dégradé.

### 2. Une couleur transparente pour le fond

Le calque du dessous est un cercle de 1in (96px) de rayon, centré en `50% 95%`, donc près du bord bas. Il est bleu jusqu'à 90Q (85px), puis `#9959` jusqu'au bout.

`#9959` est une couleur hexadécimale à 4 chiffres, avec transparence : `#999955` à `99`, soit 60 % d'opacité. Le canevas derrière la page est blanc, et cet olive à 60 % sur du blanc donne le beige de la cible, environ `#c2c299`. La version transparente coûte 5 caractères, l'opaque 7.

### 3. Le côté plat vient du bord de la tuile

`0 50vh` descend le calque de la moitié de la hauteur, 150px. Un fond se répète par défaut : le vide en haut est comblé par une copie de la même tuile, qui arrive par le haut.

Le cercle de cette copie est maintenant centré en y = 285 − 300 + 150 = 135, et la copie s'arrête à y = 150, là où commence la tuile suivante. Tout ce qui est sous cette ligne appartient à la tuile suivante, dont le cercle est loin sous le cadre. Le cercle est donc coupé par une ligne parfaitement droite : le côté plat du demi-disque. Pas de découpe, pas d'élément en plus.

### 4. Le disque orange par-dessus

Le premier calque est `radial-gradient(1Q, #d07b5f 53Q, #0000)`, au milieu de la page :

- `1Q` en fait un cercle (une seule longueur, c'est un rayon). Le rayon lui-même ne compte pas, car l'arrêt est une longueur absolue.
- Orange jusqu'à 53Q, environ 50px.
- `#0000` (transparent) n'a pas de position. Un arrêt ne peut pas se placer avant le précédent : il se colle donc à 53Q et donne un bord net.

### 5. body fait le bâton

`*` dans `&` touche tous les enfants de `html`. `head` et `style` restent cachés, seul `body` se voit. Avec `margin:190 190 60` (pas besoin d'unités en mode quirks, celui de CSS Battle) :

- il commence à 190px du haut et à 190px de chaque côté, donc il fait 20px de large ;
- en mode quirks, `body` s'étire sur la hauteur de la page, moins ses marges : 300 − 190 − 60 = 50px.

Ça donne le bâton gris de 20×50 en (190, 190), peint par-dessus le disque orange.

## Notes de golf

- `#9959` remplace une couleur opaque de 7 caractères en laissant le canevas blanc finir le travail.
- `0 50vh`, avec le `repeat` par défaut, transforme un cercle entier en demi-disque, pour 6 caractères.
- `&` seul sélectionne `html` et économise le mot `html`.
- Le premier caractère n'est pas une espace ordinaire mais une espace insécable (voir plus bas). Il est invisible, et c'est le seul caractère dont cette mise en page ne peut pas se passer.

## Le premier caractère, invisible

Le code commence par une espace insécable (U+00A0), pas par une espace ordinaire. La différence compte : l'analyseur HTML jette les espaces ordinaires avant `<style>`, mais une espace insécable est du vrai texte. Elle atterrit dans `body`, qui n'est donc pas vide.

Sans elle, Chrome fait une page de 430px de haut au lieu de 300px : les dégradés sont calculés et centrés sur un `html` plus haut, les cercles descendent et l'image ne correspond plus. Avec elle, `html` reste en 400×300 et tout tombe là où la cible l'attend. Si vous recopiez cette solution à la main, gardez ce caractère.
