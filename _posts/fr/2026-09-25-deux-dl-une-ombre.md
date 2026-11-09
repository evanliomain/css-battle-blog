---
title: "Deux dl et une ombre : une poubelle en 193 caractères"
lang: fr
ref: 2026-09-25
permalink: /fr/2026/09/25/deux-dl-une-ombre/
description: "Comment zoom, une immense ombre crème et deux dl imbriqués dessinent la cible CSS Battle du 25 septembre 2026 : une poubelle violette."
target: /assets/targets/2026-09-25.png
target_url: https://cssbattle.dev/play/zeOBey0n5j5vQjLKIkau
colors: ["#9676cf", "#7454b4", "#fff8e1"]
player: benjamintordjman
chars: 193
score: 663.56
match: 100
code: |
  <dl><dl><p><style>*{background:#9676CF;color:7454B4;border-radius:6q;margin:-4-7 24}&{zoom:5;margin:8 33 44;box-shadow:0 0 0 9in#FFF8E1;dl{border:2px solid;box-shadow:6pt 0,-6pt 0;margin:8 5-60
---

La cible du 25 septembre est une poubelle violette sur un fond crème : une poignée, un couvercle foncé plus large que la cuve, et trois lamelles foncées. La solution de Benjamin Tordjman agrandit toute la page cinq fois. Alors `html` n'est plus qu'une petite boîte : son ombre crème couvre tout sauf elle, et elle devient la poignée. Le `body` fait la cuve, et deux `<dl>` imbriqués dessinent le couvercle et les lamelles avec leur bordure et deux ombres chacun.

Cochez **Couleurs pédagogiques** pour voir les ombres des `dl` en orange.

{% include animations/2026-09-25.html lang=page.lang %}

## Le code, aéré

```css
<dl><dl><p>                      /* couvercle, lamelles, et ce qui les étire */
<style>
* {
  background: #9676CF;
  color: 7454B4;                 /* un hex sans # passe en mode quirks */
  border-radius: 6q;             /* 5.67px, × 5 à l'écran */
  margin: -4 -7 24;              /* pour le body et le p */
}
& {                              /* html */
  zoom: 5;                       /* tout est 5 fois plus grand */
  margin: 8 33 44;               /* une boîte de 14 × 8 : 70 × 40 à l'écran */
  box-shadow: 0 0 0 9in #FFF8E1; /* crème partout ailleurs */
  dl {
    border: 2px solid;           /* 10px à l'écran, couleur du texte */
    box-shadow: 6pt 0, -6pt 0;   /* deux copies, à 40px à gauche et à droite */
    margin: 8 5 -60;
  }
}
```

## Comment ça marche

### 1. zoom:5 : une petite html

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. Il est plus précis que `*` : `html` prend la marge de `&`, pas celle de `*`.

`zoom:5` agrandit `html` et tout son contenu cinq fois : toutes les longueurs ci-dessous sont en pixels CSS, et s'affichent cinq fois plus grandes. Le cadre de 400 × 300 ne fait plus que 80 × 60 pixels CSS. `margin:8 33 44` laisse à `html` 80 − 33 − 33 = 14 de large. Sans doctype, la page est en mode quirks, et `html` remplit la hauteur que ses marges laissent : 60 − 8 − 44 = 8. À l'écran, `html` est une boîte de 70 × 40 en (165 ; 40).

### 2. L'ombre crème : la poignée

Le fond violet de `html` sert pour tout le canevas. Sa `box-shadow` n'a pas de décalage et s'étale de `9in`, 864 pixels CSS : une copie crème bien plus grande que le canevas.

Une ombre ne se peint jamais sous la boîte qui la projette. Le crème couvre donc tout, sauf la boîte de `html`, où le canevas violet reste visible. `border-radius:6q` (5,67, donc 28,35px à l'écran) arrondit cette boîte ; les rayons sont trop grands pour une boîte de 40px de haut, et Chrome les réduit à 20px. Cette boîte violette arrondie est la poignée.

### 3. Le body : la cuve

Le `body` prend tout de `*` : le fond violet, et `margin:-4-7 24`. Ses marges de −7 sur les côtés l'élargissent par rapport à `html` : 14 + 7 + 7 = 28, soit 140px à l'écran, de x = 130 à 270.

En mode quirks, le `body` prend la hauteur de la page moins ses propres marges : 60 + 4 − 24 = 40, soit 200px. Sa marge haute de −4 fusionne avec la marge haute de 8 du premier `<dl>` : 8 − 4 = 4, et le `body` commence en 8 + 4 = 12, soit y = 60 à l'écran. Il finit en y = 260, avec des coins arrondis de 28,35px : la cuve.

### 4. Le premier dl : le couvercle

`dl` imbriqué dans `&` vise les deux `<dl>`. `margin:8 5-60` place le premier à 5 de chaque bord du `body` : 18 de large, 90px à l'écran, à partir de x = 155.

Sa marge basse de −60 sert au `<dl>` qu'il contient : la boîte de marge de celui-ci finit bien au-dessus de son début, et le premier `<dl>` ne garde aucune hauteur. Il ne reste que sa bordure de `2px`, 2 + 2 = 4 de haut, 20px à l'écran, de y = 60 à 80. Une bordure sans couleur prend celle du texte : `color:7454B4` venu de `*`, un hex sans `#` que le mode quirks accepte.

`box-shadow:6pt 0,-6pt 0` ajoute deux copies, à 6pt = 8 pixels CSS (40px à l'écran) à droite et à gauche, de la couleur du texte aussi. La barre va maintenant de x = 115 à 285, avec des bouts ronds grâce au rayon : le couvercle. Il couvre le bas de la poignée et les coins hauts de la cuve.

### 5. Le second dl : trois lamelles

Le second `<dl>` est dans le premier, avec les mêmes règles. Il fait 18 − 4 − 10 = 4 de large (20px à l'écran), en x = 155 + 10 + 25 = 190, et sa marge haute de 8 le place en y = 110.

Le `<p>` vide qu'il contient prend `margin:-4-7 24` de `*`. Il fait 0px de haut, donc sa boîte de marge finit en −4 + 0 + 24 = 20 : le second `<dl>` contient 20 de hauteur, plus 4 de bordure. C'est une barre de 24 de haut, 120px à l'écran, de y = 110 à 230, violette dans une bordure foncée de 10px : à 20px de large, elle paraît toute foncée. Ses deux ombres, à 40px de chaque côté, sont les lamelles de gauche et de droite.

## Notes de golf

- `zoom:5` divise presque tous les nombres par 5 : `8 33 44`, `-4-7 24` et `8 5-60` n'ont qu'un ou deux chiffres.
- Une seule ombre étalée sur `html` peint le fond crème et découpe la poignée, parce qu'une ombre saute sa propre boîte.
- La même règle `dl` dessine le couvercle et les lamelles : l'extérieur ne garde que sa bordure, l'intérieur est étiré par le `<p>`.
- `*` donne sa marge au `body` et au `<p>` : une seule valeur place la cuve et donne leur hauteur aux lamelles.
- `color:7454B4` colore les deux bordures et les quatre ombres des `dl`, sans `#`.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
