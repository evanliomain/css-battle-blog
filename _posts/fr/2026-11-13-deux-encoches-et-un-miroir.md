---
title: "Deux encoches et un miroir : deux Z en 153 caractères"
lang: fr
ref: 2026-11-13
permalink: /fr/2026/11/13/deux-encoches-et-un-miroir/
description: "Comment deux paragraphes vides, une bordure épaisse, corner-shape:notch, un outline et scale:1 -1 dessinent la cible CSS Battle du 13 novembre 2026 : deux Z cernés de rose, l'un en miroir de l'autre, sur fond violet."
target: /assets/targets/2026-11-13.png
target_url: https://cssbattle.dev/play/qLX4DEfAvKd6Cuzxphg1
colors: ["#411c56", "#b7d7cd", "#c06c88"]
player: evanliomain
chars: 153
score: 693.06
match: 100
code: |
  <p><p><style>*{background:#411c56;p{border:48Q solid#b7d7cd;outline:11q solid#c06c88;corner-shape:notch;border-radius:35%/0 53Q;margin:40 92;+p{scale:1-1
---

La cible du 13 novembre est violette, avec deux formes en escalier vert pâle, cernées de rose, l'une au-dessus de l'autre. Celle du haut descend vers la droite, celle du bas est son reflet. Je dessine chacune avec un `<p>` vide, fait seulement de bordure. `corner-shape:notch` lui retire deux coins opposés, et l'`outline` suit la découpe. Le second `<p>` est la même forme, retournée par `scale:1-1`.

Les **couleurs pédagogiques** distinguent le second `<p>` pendant qu'il se retourne.

{% include animations/2026-11-13.html lang=page.lang %}

## Le code, aéré

```css
<p><p>                                    /* deux paragraphes vides */
<style>
* {
  background: #411c56;                    /* tous les éléments ; celui de html passe au canevas */
  p {
    border: 48Q solid #b7d7cd;            /* 45px : tout le bloc vert */
    outline: 11q solid #c06c88;           /* 10px de rose autour */
    corner-shape: notch;                  /* les coins arrondis deviennent des encoches */
    border-radius: 35% / 0 53Q;           /* 70 de large ; 0 ou 50 de haut */
    margin: 40 92;                        /* x 100 → 300, y 40 */
    + p {                                 /* le second p seulement */
      scale: 1 -1;                        /* retourné de haut en bas */
    }
  }
}
</style>
```

## Comment ça marche

### 1. Tout en violet

`*` vise tous les éléments : `html`, `body` et les deux `p`. Tous ont le fond violet. Celui de `html` passe au canevas : tout le cadre est violet. Les autres fonds ont la même couleur, on ne les voit jamais.

### 2. Un bloc fait de bordure

Le `p` est vide : son contenu fait 0 de haut. Avec `margin:40 92`, il va de x = 100 à 300 : le `body` commence à x = 8, et 8 + 92 = 100. Sa marge du haut, 40, fusionne avec celle du `body`, 8 : le `p` commence à y = 40.

`48Q` fait 48 × 0,945 = 45,35px, et Chrome arrondit l'épaisseur d'une bordure à 45. La boîte fait 200 de large et 2 × 45 = 90 de haut. Son contenu fait 110 × 0 : on ne voit que la bordure verte.

### 3. notch : deux coins retirés

`border-radius:35%/0 53Q` donne les rayons horizontaux avant la barre, les verticaux après. 35 % des 200px de large font 70 pour chaque coin. `0 53Q` donne 0 en haut à gauche et en bas à droite, et 53Q = 50px en haut à droite et en bas à gauche. Un coin de rayon nul reste carré.

`corner-shape:notch` change chaque coin arrondi en encoche droite, un rectangle de la taille de ses rayons. Un rectangle de 70 × 50 disparaît en haut à droite (x 230 → 300, y 40 → 90), et un autre en bas à gauche (x 100 → 170, y 80 → 130). Le bloc devient un Z.

### 4. L'outline suit la découpe

`11q` fait 10,39px, et l'épaisseur de l'outline est arrondie à 10. L'outline suit la forme des coins, encoches comprises. Il trace un contour rose de 10px tout autour du Z, de x = 90 à 310 et de y = 30 à 140, avec les mêmes 10px le long de chaque encoche.

### 5. Le second p

Le second `p` reçoit les mêmes règles. La marge du bas du premier, 40, et celle du haut du second, 40, fusionnent en un seul écart de 40. La seconde boîte va donc de y = 130 + 40 = 170 à 260. Telle quelle, c'est le même Z.

### 6. scale : le miroir

`+p` est imbriqué dans `p` : il vise un `p` qui suit un autre `p`, donc seulement le second. `scale:1-1` se lit comme deux nombres, `1` et `-1`. La boîte garde sa largeur et se retourne de haut en bas, autour de son centre, en y = 215. Ses encoches passent en haut à gauche et en bas à droite, outline compris. C'est la forme du bas de la cible.

## Notes de golf

- Un `p` vide avec une bordure épaisse est un bloc plein : ni `height`, ni `background` pour le vert.
- Un seul `border-radius` avec une barre règle les huit rayons d'un coup. Les zéros gardent deux coins carrés, et `notch` change les deux autres en découpes.
- J'ai vérifié que sans `corner-shape:notch`, les mêmes rayons donnent des coins arrondis.
- L'outline est tracé sur la forme découpée : le contour rose fait le tour des encoches sans rien ajouter.
- `48Q` et `11q` tombent sur 45px et 10px après arrondi. La casse de l'unité ne compte pas.
- `scale:1-1` n'a pas besoin d'espace : le signe moins commence le second nombre.
- `+p` imbriqué dans `p` vise le second paragraphe sans classe.
- Pas de balise fermante, et le `<style>` reste ouvert.
