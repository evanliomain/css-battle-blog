---
title: "Une puce de liste en disque : un piston en 147 caractères"
lang: fr
ref: 2026-11-09
permalink: /fr/2026/11/09/une-puce-de-liste-en-disque/
description: "Comment trois bordures et la puce d'un élément de liste dessinent la cible CSS Battle du 9 novembre 2026 : un cadre bleu-vert, une barre et un disque sur fond bleu nuit."
target: /assets/targets/2026-11-09.png
target_url: https://cssbattle.dev/play/V3rcPynSdxNerqyJeVdL
colors: ["#1d025e", "#469dba"]
player: emohdaziz
chars: 147
score: 698.53
match: 100
code: |
  <li><style>&{color:469dba;border:53Q solid;margin:125 75 35}*{background:#1d025e;*{margin:-160 40 0;*{border-top:96Q solid;margin:10;font:178Q/60q"
---

La cible du 9 novembre est bleu-vert sur bleu nuit : un grand cadre ouvert en haut, un disque dans l'ouverture, et une barre qui monte au-dessus, comme un piston. La solution de Mohamed Ali dessine le cadre avec la bordure de `html` et l'ouvre avec le `body` bleu nuit. La barre est la bordure haute d'un `<li>`, et le disque est une chose que chaque `<li>` a gratuitement : sa puce, dessinée dans une police de 168px.

Cochez **Couleurs pédagogiques** pour voir la bordure du `<li>` et sa puce.

{% include animations/2026-11-09.html lang=page.lang %}

## Le code, aéré

```css
<li>                                 /* un élément de liste : il a une puce */
<style>
& {                                  /* html */
  color: 469dba;                     /* un hex sans # passe en mode quirks */
  border: 53Q solid;                 /* 50px, couleur du texte */
  margin: 125 75 35;
}
* {
  background: #1d025e;
  * {                                /* le body */
    margin: -160 40 0;
    * {                              /* le li */
      border-top: 96Q solid;         /* 90px */
      margin: 10;
      font: 178Q / 60Q "";           /* police de 168px : une puce de 50px */
    }
  }
}
```

## Comment ça marche

### 1. html : un cadre

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. `margin:125 75 35` lui donne 250 de large, de x = 75 à 325, et en mode quirks 300 − 160 = 140 de haut, de y = 125 à 265.

`border:53Q solid` fait 53 quarts de millimètre, 50,08px, arrondis par Chrome à 50. Une bordure sans couleur prend celle du texte : `color:469dba`, un hex sans `#` que le mode quirks accepte. Il ne reste à l'intérieur qu'un trou de 150 × 40, de x = 125 à 275 et de y = 175 à 215, qui montre le fond bleu nuit venu de `*`.

### 2. Le body ouvre le cadre

`*` imbriqué vise le `body`. `margin:-160 40 0` le place à 40 à l'intérieur du contenu de `html` de chaque côté, de x = 165 à 235, et 160 au-dessus, en y = 15. En mode quirks, le `body` descend jusqu'au bas du contenu de `html` : y = 215.

`html` a un fond : le `body` peint donc le sien, bleu nuit. Il passe sur le milieu de la bordure haute de `html`, de x = 165 à 235 : le cadre est ouvert en haut.

### 3. Le li : la barre

Le troisième niveau de `*` vise ce qui est dans le `body` : le `<li>`. `margin:10` le place de x = 175 à 225, en y = 25. `border-top:96Q solid` fait 90,7px, arrondis à 90 : une barre bleu-vert de y = 25 à 115. Ses autres bordures font 0, et son fond bleu nuit ne se voit pas.

### 4. La puce : le disque

Un `<li>` est un élément de liste : Chrome dessine une puce à côté, un disque « • » de la couleur du texte. Cette puce est du texte : elle suit la police. `font:178Q/60Q""` donne au `<li>` une police de 178Q (168,2px) et une hauteur de ligne de 60Q (56,7px). À cette taille, la puce est un disque de 50px. Je l'ai mesuré sur le rendu : de x = 175 à 225 et de y = 125 à 175, juste sous la barre, dans l'ouverture du cadre. Avec `list-style:none`, le disque disparaît.

## Notes de golf

- `<li>` apporte un disque gratuit : sa puce, dimensionnée par la police, de la couleur du texte.
- `color:469dba` colore le cadre, la barre et la puce d'un coup, sans `#`.
- Le `body` bleu nuit efface une partie de la bordure de `html` rien qu'en se peignant par-dessus.
- `border-top` seul fait une barre avec une boîte vide.
- `53Q` et `96Q` donnent 50 et 90 en 3 caractères, grâce à l'arrondi des bordures.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
