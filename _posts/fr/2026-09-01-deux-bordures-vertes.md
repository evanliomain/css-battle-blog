---
title: "Deux bordures vertes : un anneau découpé en 140 caractères"
lang: fr
ref: 2026-09-01
permalink: /fr/2026/09/01/deux-bordures-vertes/
description: "Comment un dégradé radial fixé sur le canevas et deux bordures vertes, dont une étirée six fois, dessinent la cible CSS Battle du 1er septembre 2026 : un anneau sombre découpé en cinq arcs."
target: /assets/targets/2026-09-01.png
target_url: https://cssbattle.dev/play/dxpb9nkM3OEyksSbHGOY
colors: ["#bade37", "#333"]
player: gunnar
chars: 140
score: 705.33
match: 100
code: |
  <style>*{margin:0-90 0 190;border:5vw solid#BADE37;*{background:radial-gradient(1q,#BADE37 60px,#333 0 5lh,#BADE37)fixed;scale:6 1;margin:90
---

La cible du 1er septembre est un anneau sombre sur un fond vert-jaune vif, découpé en cinq arcs : deux en haut, deux en bas, et un petit à droite. La solution de Gunnar Bittersmann peint l'anneau entier une seule fois, avec un dégradé radial qui devient le fond de tout le canevas. Puis elle taille les fentes avec des bordures du même vert : la bordure gauche de `html` fait la fente verticale, et le `body`, étiré six fois en largeur, cache la gauche de l'anneau et fait les deux fentes horizontales.

Cochez **Couleurs pédagogiques** pour voir les deux bordures vertes, et passez en **Vue large** pour voir jusqu'où elles dépassent du canevas.

{% include animations/2026-09-01.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* tous les éléments : html, head, style, body */
  margin: 0 -90 0 190;           /* html : x 190 → 490 */
  border: 5vw solid #BADE37;     /* 20px, de la couleur du fond */
  * {                            /* tout élément dans un autre : le body */
    background: radial-gradient(1q, #BADE37 60px, #333 0 5lh, #BADE37) fixed;
    scale: 6 1;                  /* 6 fois plus large, même hauteur */
    margin: 90;
  }
}
```

## Comment ça marche

### 1. Un seul fond pour tout le canevas

Le `*` extérieur vise tous les éléments : `html`, `head`, `style` et `body`. Le `*` imbriqué vise tout élément placé dans un autre : `head`, `style` et `body`. `head` et `style` ne sont pas affichés, donc seuls `html` et le `body` comptent.

Le `body` reçoit le dégradé. Comme `html` n'a pas de fond, celui du `body` sert pour tout le canevas, et la boîte du `body` ne le peint pas elle-même. Le dégradé est vert jusqu'à 60px de son centre, `#333` de 60 à 90px, puis vert à nouveau : un anneau de 30px d'épaisseur.

`fixed` place ce fond du canevas sur le viewport, 400 × 300 : son centre est en (200 ; 150). J'ai vérifié sans `fixed` : le fond est alors placé sur la boîte de `html`, qui commence à x 190. L'anneau est centré en x 340, avec une deuxième copie en x 40, car il se répète tous les 300px.

### 2. Pourquoi 1q

`1q` est la taille du dégradé : un cercle de 0,945px de rayon. Les arrêts de couleur sont en px, donc ils atteignent quand même 60px et 90px. Tout l'intérêt est dans le dernier arrêt. Sans position, il est à 100 % du rayon, 0,945px. Un arrêt ne peut pas être avant celui qui le précède : il est remonté à 90px. Le bord extérieur est net. La même règle change le `0` de `#333 0` en 60px : le bord intérieur est net aussi.

Sans taille, le rayon irait jusqu'au coin le plus loin, à 250px, et le dernier vert serait posé à 250px : l'anneau s'estomperait lentement. J'ai vérifié ce rendu aussi.

`5lh` vaut 5 fois la hauteur de ligne. Ici elle fait 18px, donc `5lh` fait 90px.

### 3. html et sa bordure gauche

`margin:0-90 0 190` se lit 0, −90, 0, 190 : le signe moins commence un nouveau nombre. `html` commence à x 190, et la marge droite négative le rend large de 300, jusqu'à x 490, au-delà de la droite du canevas. En mode quirks, `html` remplit la hauteur du viewport : il fait 300 de haut.

Sa bordure fait `5vw`, soit 20px, en `#BADE37`, le même vert que le fond. On ne la voit pas, sauf là où elle couvre l'anneau. Sa bordure gauche, de x 190 à 210, couvre toute la hauteur : elle coupe le haut et le bas de l'anneau. Les trois autres côtés ne couvrent que du vert.

### 4. Le body : 80 × 80

Le `body` a lui aussi la bordure verte de 20px, et `margin:90` (qui remplace la marge extérieure). Le contenu de `html` fait 300 − 40 = 260 de côté. Il reste 260 − 180 = 80 pour la largeur du `body`. En mode quirks, le `body` remplit aussi la hauteur de son parent : 80 de haut. Le `body` est donc une boîte de 80 × 80 en (300 ; 110), avec une fenêtre transparente de 40 × 40 au milieu, où le canevas se voit.

### 5. scale:6 1

`scale:6 1` étire le `body` six fois en largeur, autour de son centre (340 ; 150). Il va maintenant de x 100 à 580, et garde sa hauteur, de y 110 à 190.

- Sa bordure gauche fait maintenant 120 de large, de x 100 à 220. Entre y 110 et 190, la partie gauche de l'anneau reste entre x 110 et 160, donc elle est toute dessous : c'est le trou à gauche.
- Sa bordure du haut, de y 110 à 130, et celle du bas, de y 170 à 190, traversent tout l'anneau : deux fentes horizontales.
- Sa fenêtre va de x 220 à 460 et de y 130 à 170. Elle montre le canevas, donc le côté droit de l'anneau, entre x 257 et 290 environ, reste visible là : le petit arc.

## Notes de golf

- Un seul fond fait tout le dessin. Le fond du `body` va au canevas, et les boîtes n'ajoutent que du vert.
- Les bordures prennent le même `#BADE37` que le dégradé : elles sont invisibles, sauf sur l'anneau.
- `1q` est le moyen le plus court de rendre le rayon minuscule, pour que le dernier arrêt soit remonté à 90px et que le bord soit net.
- `#333 0` : une position `0` est remontée à l'arrêt d'avant, 60px.
- `5lh` vaut 90px avec un caractère de moins que `90px`.
- `5vw` vaut 20px. Le raccourci `border` n'accepte pas d'épaisseur sans unité : j'ai vérifié que `border:20 solid#BADE37` ne dessine aucune bordure.
- Les marges sans unité (`190`, `90`) marchent en mode quirks, et `0-90` n'a pas besoin d'espace.
- `scale:6 1` étire une petite boîte en une bande de 480 de large.
- Pas d'espace avant `#BADE37` ni `fixed`, pas d'accolades fermantes, et `<style>` n'est jamais fermé.
