---
title: "Un anneau en tuiles et un body retourné : un signal Wi-Fi en 149 caractères"
lang: fr
ref: 2026-11-14
permalink: /fr/2026/11/14/un-anneau-en-tuiles-et-un-body-retourne/
description: "Comment un seul dégradé radial, partagé par html et body, une position de fond, clip-path et scale:-.48 dessinent la cible CSS Battle du 14 novembre 2026 : un demi-anneau olive et une petite part d'anneau sur fond orange, sans autre balise que style."
target: /assets/targets/2026-11-14.png
target_url: https://cssbattle.dev/play/oz2eumlqU32gRrkqBfri
colors: ["#f3ac3c", "#998235"]
player: h_blierzt
chars: 149
score: 696.67
match: 100
code: |
  <style>*{background:radial-gradient(1q at bottom,#F3AC3C,3.9lh,#998235 0 95q,#F3AC3C)0 50vh;*{scale:-.48;font:40%a;clip-path:polygon(50%50%,87%0,13%0
---

La cible du 14 novembre est orange, avec un épais demi-anneau olive et, juste dessous, une petite part d'anneau olive avec un léger creux en V en haut. On dirait un signal Wi-Fi. H_Bliertz la dessine sans autre balise que `<style>`. Un seul dégradé radial sert de fond à `html` et au `body`. Sur `html`, le bord d'une tuile du fond coupe l'anneau en deux. Sur le `body`, une police plus petite réduit le rayon intérieur, puis `clip-path` et `scale:-.48` font de l'anneau la petite forme.

Les **couleurs pédagogiques** distinguent le fond du `body` de celui du canevas, et la **vue large** montre les tuiles au-dessus et au-dessous du cadre.

{% include animations/2026-11-14.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                       /* html et body (head et style sont masqués) */
  background:
    radial-gradient(
      1q at bottom,                       /* centré en bas de la tuile */
      #F3AC3C,                            /* orange */
      3.9lh,                              /* arête nette à 3.9lh : 70,2 sur html, 31,2 sur body */
      #998235 0 95q,                      /* olive jusqu'à 95q = 89,8px */
      #F3AC3C                             /* orange au-delà */
    )
    0 50vh;                               /* tuile descendue de 150px */
  * {                                     /* le body seulement */
    scale: -.48;                          /* retourné dans les deux sens, réduit */
    font: 40% a;                          /* police de 6,4px : 1lh = 8 */
    clip-path: polygon(50% 50%, 87% 0, 13% 0);  /* un triangle à angle droit */
  }
}
```

## Comment ça marche

### 1. Un anneau dans un dégradé

`*` vise `html`, `head`, `style` et `body`. `head` et `style` ne s'affichent pas : seuls `html` et `body` comptent. Le fond de `html` passe au canevas. Une image de fond se répète en tuiles de la taille de la boîte : 400 × 300 pour `html`.

`radial-gradient(1q at bottom, …)` est un cercle de rayon 1q (0,24px), centré au milieu du bas de la tuile, en (200, 300). La taille du cercle ne compte pas ici : les arrêts de couleur ont leurs propres longueurs, et le dégradé continue au-delà du cercle.

Les arrêts sont : orange, puis `3.9lh`, puis olive de `0` à `95q`, puis orange. Une longueur seule entre deux couleurs est un indice de transition : elle dit où le mélange des deux couleurs est à moitié fait. Et un arrêt ne peut pas venir avant les arrêts ou indices qui le précèdent : le `0` de l'olive remonte à `3.9lh`. Avec l'indice et l'arrêt suivant au même endroit, le passage est net : orange jusqu'à `3.9lh`, olive de `3.9lh` à `95q`, puis orange.

`lh` est la hauteur de ligne de l'élément. `html` a la police par défaut de 16px, avec une hauteur de ligne normale de 18px : `3.9lh` fait 3,9 × 18 = 70,2px. `95q` fait 95 × 0,945 = 89,8px. L'anneau olive va du rayon 70,2 au rayon 89,8.

### 2. 0 50vh : la tuile descend

`0 50vh` est la position du fond : 0 en largeur, 150px vers le bas. La tuile en (0, 0) passe en (0, 150), et les tuiles se répètent au-dessus et au-dessous. Celle du dessus va de y = −150 à 150, et son centre, en bas, tombe en (200, 150).

Son anneau s'arrête au bord de la tuile, en y = 150. Seule la moitié du haut est dessinée : le demi-anneau de la cible, de x = 110 à 290 et de y = 60 à 150. L'anneau de la tuile du dessous est centré en (200, 450) : son haut est en y = 360, hors du cadre.

### 3. Le body : le même fond, plus petit

Le `*` imbriqué vise les éléments placés dans un autre élément : ici, le `body` (`head` et `style` restent masqués). Il reçoit aussi le dégradé de la première règle. Comme `html` a déjà un fond, celui du `body` ne passe pas au canevas : il est peint sur sa propre boîte. En mode quirks, le `body` remplit le cadre moins sa marge de 8px : 384 × 284, en (8, 8).

`font:40%a` donne au `body` une police de 40 % de 16px, soit 6,4px (la famille `a` n'existe pas, la police par défaut sert). Sa hauteur de ligne est de 8px : son `3.9lh` fait 31,2px. `95q` reste à 89,8px. Sa tuile fait 384 × 284 et descend aussi de 150. L'anneau de la tuile du dessus est centré en (192, 150) dans le `body`, soit (200, 158) sur le canevas : 8px sous le centre du `body`.

### 4. clip-path : un coin d'anneau

`clip-path:polygon(50%50%,87%0,13%0)` garde un triangle du `body`. Dans sa boîte de 384 × 284 : (192, 142), (334, 0) et (50, 0). Sur le canevas : (200, 150), (342, 8) et (58, 8). Depuis la pointe, chaque côté fait 142 en largeur et 142 en hauteur : deux côtés à 45°, un angle droit.

Le triangle garde un quart du haut de l'anneau du `body`, avec de l'orange dedans et autour. Tout le reste du `body` est coupé : le demi-anneau de `html` réapparaît. La pointe du triangle est 8px au-dessus du centre de l'anneau.

### 5. scale : retourné et réduit

`scale:-.48` n'a qu'une valeur : elle vaut pour les deux axes, −0,48 en largeur et −0,48 en hauteur. Retourner dans les deux sens fait un demi-tour, et 0,48 réduit la boîte. Tout se passe autour du centre du `body`, (200, 150), qui ne bouge pas.

Le coin d'anneau pointe maintenant vers le bas depuis (200, 150). Ses rayons deviennent 31,2 × 0,48 = 15 et 89,8 × 0,48 = 43. Les côtés du triangle s'arrêtent en y = 150 + 142 × 0,48 = 218 : l'anneau remplit le coin jusqu'à son bord extérieur.

### 6. L'encoche en V

Avant le retournement, le centre de l'anneau était 8px sous la pointe. Après, il est 8 × 0,48 = 3,84px au-dessus : en (200, 146,16). Le cercle intérieur, de rayon 15, coupe les côtés du triangle vers y = 158,5, mais au milieu il descend jusqu'à 146,16 + 15 = 161,1. Le bord du haut de la petite forme se creuse au milieu : c'est le petit V de la cible.

## Notes de golf

- Pas d'autre balise que `<style>` : `html` et `body` sont les deux formes, et `*` leur donne le même fond.
- Un dégradé, deux tailles : le rayon intérieur est écrit en `lh`, donc `font:40%a` sur le `body` le change, alors que le rayon extérieur, en `q`, reste le même.
- Le bord de la tuile coupe le demi-anneau sans rien ajouter : `at bottom` met le centre sur le bord, et `0 50vh` amène ce bord au milieu du cadre.
- L'indice de transition `3.9lh` donne une arête nette, et le `0` qui suit remonte jusqu'à lui.
- `scale:-.48` retourne et réduit en une seule valeur ; sur une forme symétrique de gauche à droite, le retournement en largeur ne se voit pas.
- `font:40%a` est plus court que n'importe quel nom de police, et `a` suffit pour un raccourci `font` valide.
- `50%50%` et `87%0` : pas d'espace après `%`.
- Les règles ne sont jamais fermées : le code s'arrête dans `polygon(`.
