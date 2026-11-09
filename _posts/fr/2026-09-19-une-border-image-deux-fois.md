---
title: "Une border-image, deux fois : une enveloppe en 157 caractères"
lang: fr
ref: 2026-09-19
permalink: /fr/2026/09/19/une-border-image-deux-fois/
description: "Comment une seule border-image, découpée en neuf sur html et taillée en losange sur le body, dessine la cible CSS Battle du 19 septembre 2026 : une enveloppe dans un disque orange."
target: /assets/targets/2026-09-19.png
target_url: https://cssbattle.dev/play/LXVlYbdUHfOS5mrqkEh0
colors: ["#485993", "#ffa173"]
player: beo
chars: 157
score: 689.58
match: 100
code: |
  <style>*{background:#485993;border-image:radial-gradient(1q,#FFA173,125px,#0000)110 25%/auto;*{margin:-71 4 80;clip-path:polygon(50%45%,73%62%,50%244q,27%62%
---

La cible du 19 septembre est un disque orange sur fond bleu, avec une enveloppe bleue dedans : un rectangle, un rabat en triangle au-dessus, et un V orange à l'intérieur. La solution de Beo donne à `html` et au `body` la même `border-image`, un disque orange. Sur `html`, le morceau du milieu de cette image n'est jamais peint : il reste le rectangle bleu. Le `body` est placé plus haut, avec son propre disque et son propre trou, et un `clip-path` n'en garde qu'un losange : le rabat et le V.

{% include animations/2026-09-19.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                      /* html, puis le body */
  background: #485993;
  border-image:
    radial-gradient(1q, #FFA173, 125px, #0000)  /* un disque orange, r = 125 */
    110 25% / auto;                      /* découpé en neuf, sans le centre */
  * {                                    /* le body */
    margin: -71 4 80;                    /* x 4 → 396, y −71 → 220 */
    clip-path: polygon(50% 45%, 73% 62%, 50% 244q, 27% 62%);  /* un losange */
  }
}
```

## Comment ça marche

### 1. Un disque en dégradé

`*` donne à tous les éléments un fond bleu et une `border-image`. Une `border-image` dessine une image autour de la boîte, dans la zone de sa bordure.

L'image est `radial-gradient(1q,#FFA173,125px,#0000)` : un cercle de rayon `1q` (0,94px), centré. Les arrêts vont plus loin que ce rayon. D'abord l'orange, puis `125px` seul, un repère de transition, et l'arrêt transparent, au bout du cercle de 0,94px, est ramené à 125px. La couleur reste donc orange jusqu'à 125px, puis devient transparente d'un coup : un disque net de rayon 125. Sur `html`, l'image a la taille de sa boîte, 400 × 300 : le disque va de x = 75 à 325 et de y = 25 à 275.

### 2. Découpé en neuf, sans le centre

`110 25%` est le `border-image-slice` : il coupe l'image à 110px du haut et du bas, et à 25 % de 400 = 100px de la gauche et de la droite. Ça fait neuf morceaux : quatre coins, quatre bords, et le milieu.

`/auto` est la largeur de la bordure : pour chaque côté, la taille de son morceau, soit 110px en haut et en bas, 100px sur les côtés. Chaque morceau se pose à sa place, à la même taille. Le morceau du milieu n'est peint qu'avec le mot-clé `fill`, absent ici. Au milieu, de x = 100 à 300 et de y = 110 à 190, le fond bleu de `html` se voit donc à travers le disque : le corps de l'enveloppe.

`html` n'a pas de `border-style`, mais une `border-image` en largeur `auto` n'en a pas besoin : j'ai vérifié qu'elle se dessine quand même.

### 3. Le body, plus haut

`*` imbriqué vise le `body`, qui reçoit le même fond bleu et la même `border-image`. `margin:-71 4 80` le place de x = 4 à 396. Son haut est 71px au-dessus du canevas, en y = −71. En mode quirks, il remplit la hauteur de la page moins ses marges : 300 + 71 − 80 = 291, il finit donc en y = 220.

Sa `border-image` prend la taille de sa propre boîte. Son disque est centré en (200 ; 74,5), et son morceau du milieu, lui aussi absent, montre son fond bleu de y = 39 à 110 (110px sous le haut, 110px au-dessus du bas). Sans découpe, le `body` cacherait le haut de l'image.

### 4. Un losange de body

`clip-path:polygon(50%45%,73%62%,50%244q,27%62%)` ne garde du `body` que ce qui est dans un losange. Les % se prennent sur la boîte du `body`, 392 × 291 :

- `50% 45%` : (200 ; 59,95), la pointe du haut ;
- `73% 62%` : (290,16 ; 109,42), la pointe de droite ;
- `50% 244q` : (200 ; 159,6), la pointe du bas (`244q` font 230,6px) ;
- `27% 62%` : (109,84 ; 109,42), la pointe de gauche.

La moitié haute du losange tombe dans le trou bleu du `body` : un triangle bleu, le rabat. La moitié basse tombe dans le disque du `body` : un V orange, peint sur le rectangle bleu de `html`.

## Notes de golf

- Une seule `border-image` écrite une fois dessine le disque avec son rectangle bleu, et le rabat avec son V : elle est juste peinte sur deux boîtes de tailles différentes.
- Ne pas écrire `fill` ne coûte rien : le morceau du milieu est sauté, et le fond montre le rectangle.
- `110 25%/auto` règle les découpes et les largeurs de bordure d'un coup, sans propriété `border`.
- Un repère de transition, `125px`, et un arrêt ramené à lui font un disque net avec une seule longueur.
- `clip-path` découpe quatre points dans le `body` : pas d'élément en plus pour le rabat.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
