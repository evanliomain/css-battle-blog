---
title: "Des paragraphes invisibles : barres et carrés en 121 caractères"
lang: fr
ref: 2026-09-04
permalink: /fr/2026/09/04/des-paragraphes-invisibles/
description: "Comment trois paragraphes de la couleur du fond, avec trois ombres chacun, dessinent la cible CSS Battle du 4 septembre 2026 : quatre barres jaunes et trois petits carrés."
target: /assets/targets/2026-09-04.png
target_url: https://cssbattle.dev/play/IIybN3XMPLYHSO3ij2ge
colors: ["#4a9a86", "#edec84"]
player: emohdaziz
chars: 121
score: 726.24
match: 100
code: |
  <p><p a><p><style>*{background:#4a9a86;margin:50 30-30;p{height:20;color:EDEC84;box-shadow:0 5vw,0-5vw,5vw 0}[a]{scale:-1
---

La cible du 4 septembre est jaune pâle sur vert : quatre longues barres empilées avec des espaces entre elles, et trois petits carrés sur leurs côtés, deux à droite et un à gauche. La solution de Mohamed Ali utilise trois paragraphes qu'on ne voit pas : ils ont le même vert que le fond. Seules leurs ombres se voient : une au-dessus et une au-dessous de chaque paragraphe font les barres, et une à droite dépasse en petit carré. Le paragraphe du milieu est retourné : son carré tombe à gauche.

Cochez **Couleurs pédagogiques** pour voir les ombres de droite en orange.

{% include animations/2026-09-04.html lang=page.lang %}

## Le code, aéré

```css
<p><p a><p>                        /* trois paragraphes, celui du milieu marqué */
<style>
* {
  background: #4a9a86;
  margin: 50 30 -30;
  p {
    height: 20;
    color: EDEC84;                 /* un hex sans # passe en mode quirks */
    box-shadow: 0 5vw, 0 -5vw, 5vw 0;   /* dessous, dessus, à droite */
  }
  [a] { scale: -1 }                /* le p du milieu, retourné */
}
```

## Comment ça marche

### 1. Trois p invisibles

`*` donne à tous les éléments le fond vert et `margin:50 30-30` : 50 en haut, 30 sur les côtés, −30 en bas. `html` commence en (30 ; 50), le `body` 50 et 30 plus loin, en (60 ; 100). Les `<p>` vont de x = 90 à 310, sur 220 de large, et `p{height:20}` leur donne 20 de haut.

La marge haute du premier `<p>` fusionne avec celle du `body` : il commence en y = 100. Entre deux `<p>`, la marge basse de −30 de l'un et la marge haute de 50 du suivant fusionnent en une seule marge : 50 − 30 = 20. Les `<p>` sont donc en y = 100, 140 et 180. Ils sont verts sur vert : invisibles.

### 2. Des ombres dessus et dessous

Chaque `<p>` a trois ombres sans couleur, donc de la couleur du texte : `color:EDEC84`, un hex sans `#` que le mode quirks accepte. `5vw` font 5 % de 400 = 20px.

`0 5vw` est une copie 20px plus bas, `0-5vw` une copie 20px plus haut. Chaque `<p>` reçoit une barre jaune juste au-dessus et juste au-dessous de lui. Les espaces entre les `<p>` font exactement 20px : la barre sous un `<p>` et la barre au-dessus du suivant tombent au même endroit. Ça donne quatre barres, en y = 80, 120, 160 et 200, et les `<p>` verts font les espaces.

### 3. Une ombre à droite : un carré

`5vw 0` est une copie 20px à droite, de x = 110 à 330. Une ombre ne se peint jamais sous sa propre boîte : la partie de 110 à 310 est cachée par le `<p>` lui-même, et seuls les 20 derniers pixels dépassent. Un petit carré jaune de x = 310 à 330, à la hauteur du `<p>`.

### 4. Le p du milieu, retourné

Le paragraphe du milieu est `<p a>`, visé par `[a]`. `scale:-1` le retourne sur les deux axes autour de son centre, (200 ; 150). Ses ombres du dessus et du dessous s'échangent, ce qui ne change rien. Mais son ombre de droite pointe maintenant à gauche : son carré passe de x = 70 à 90.

## Notes de golf

- Les `<p>` ont la couleur du fond : ils ne montrent rien eux-mêmes, leurs ombres font tout le dessin.
- `0 5vw,0-5vw` sur des boîtes de 20px de haut espacées de 20px donne quatre barres avec trois boîtes.
- La troisième ombre est presque toute cachée sous sa boîte : un carré de 20px gratuit.
- `scale:-1` sur un seul `<p>` envoie son carré de l'autre côté, sans seconde liste d'ombres.
- `margin:50 30-30` sert à `html`, au `body` et aux `<p>` : les marges fusionnées donnent les espaces de 20px.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
