---
title: "Rien que les coins : douze carrés en 113 caractères"
lang: fr
ref: 2026-09-02
permalink: /fr/2026/09/02/rien-que-les-coins/
description: "Comment une border-image d'une seule couleur, qui ne peint que les coins, dessine la cible CSS Battle du 2 septembre 2026 sur trois boîtes emboîtées : douze carrés crème."
target: /assets/targets/2026-09-02.png
target_url: https://cssbattle.dev/play/AJ9pZiNcFlllq1qpGyeW
colors: ["#a84a4b", "#f5e3b5"]
player: eguiluz
chars: 113
score: 736.25
match: 100
code: |
  <p><img><style>&{background:#a84a4b;margin:17 67;p{zoom:2}*{border:25px solid;border-image:conic-gradient(#f5e3b5
---

La cible du 2 septembre est crème sur rouge : un grand carré au milieu, quatre carrés moyens à ses coins, et quatre petits carrés plus loin, comme des coins emboîtés. La solution de David Eguiluz dessine trois boîtes emboîtées, le `body`, un `<p>` et une `<img>` vide, chacune avec la même bordure. Sa `border-image` est une image crème unie, et par défaut elle n'est peinte que dans les quatre coins. Le `<p>` et l'`<img>` sont zoomés deux fois : leurs coins sont plus grands, et ceux de l'`<img>` se touchent. C'est le grand carré.

Cochez **Couleurs pédagogiques** pour voir quelle boîte dessine quels coins.

{% include animations/2026-09-02.html lang=page.lang %}

## Le code, aéré

```css
<p><img>
<style>
& {                                  /* html */
  background: #a84a4b;
  margin: 17 67;
  p { zoom: 2 }                      /* le p et son img, deux fois plus grands */
  * {                                /* tout ce qui est dans html */
    border: 25px solid;
    border-image: conic-gradient(#f5e3b5);   /* une seule couleur : une image unie */
  }
}
```

## Comment ça marche

### 1. html et le body

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. Son fond rouge sert pour tout le canevas, et `margin:17 67` en fait une boîte de 266 × 266 en (67 ; 17). Le `body` garde sa marge par défaut de 8px : il va de (75 ; 25) à (325 ; 275), 250 × 250.

### 2. Une border-image : quatre coins

`*` imbriqué vise tout ce qui est dans `html` : le `body`, le `<p>`, l'`<img>` (et le `<head>` et le `<style>`, qui ne s'affichent pas). Chacun reçoit `border:25px solid`, et une `border-image` qui remplace le dessin de cette bordure.

`conic-gradient(#f5e3b5` n'a qu'une couleur : c'est une image crème unie, la façon la plus courte d'écrire une image d'une couleur. Une `border-image` est coupée en neuf morceaux par sa découpe, qui vaut 100 % par défaut. Avec une découpe de 100 %, chaque morceau de coin est l'image entière, et les morceaux des côtés et du milieu sont vides. Seuls les quatre coins de 25 × 25 de la bordure sont donc peints. Ceux du `body` sont les quatre petits carrés, en (75 ; 25), (300 ; 25), (75 ; 250) et (300 ; 250).

### 3. Le p zoomé : quatre carrés moyens

`p{zoom:2}` rend le `<p>` deux fois plus grand : sa bordure de 25px s'affiche en 50px. Un `<p>` a une marge haute par défaut de 1em, mais en mode quirks cette marge est ignorée en haut du `body` : le `<p>` commence juste dans la bordure du `body`, en (100 ; 50). Il remplit le contenu du `body`, 200 de large, et fait 200 de haut : 50 de bordure de chaque côté, et 100 pour la ligne qui contient l'`<img>`. Ses coins sont quatre carrés de 50px.

### 4. L'img : un carré plein

L'`<img>` est dans le `<p>` : elle est zoomée deux fois elle aussi, sa bordure fait 50px. Elle n'a pas de source : son contenu fait 0 × 0, et toute la boîte est sa bordure, un carré de 0 + 50 + 50 = 100, en (150 ; 100). Ses quatre coins de 50px se touchent : un carré crème plein de 100 × 100 au centre.

## Notes de golf

- Une seule règle de bordure dessine les douze carrés : la découpe de 100 % par défaut ne peint que les coins.
- Un `conic-gradient` d'une seule couleur est l'image unie la plus courte.
- `zoom:2` sur le `<p>` double ses coins et ceux de l'`<img>` qu'il contient.
- Une `<img>` vide n'est que bordure : ses quatre coins la remplissent.
- Le mode quirks ignore la marge par défaut du `<p>` en haut du `body`, ce qui le place juste où il faut.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
