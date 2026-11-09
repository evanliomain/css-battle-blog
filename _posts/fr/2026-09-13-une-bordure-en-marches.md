---
title: "Une bordure en marches : un drapeau en 151 caractères"
lang: fr
ref: 2026-09-13
permalink: /fr/2026/09/13/une-bordure-en-marches/
description: "Comment corner-shape:notch, un immense outline et deux boîtes réduites dessinent la cible CSS Battle du 13 septembre 2026 : un drapeau blanc bordé de brun sur son mât."
target: /assets/targets/2026-09-13.png
target_url: https://cssbattle.dev/play/cubFEvfArqYmYhs3IHF4
colors: ["#7253bc", "#391b1b", "#ffffff"]
player: koda_pig
chars: 151
score: 694.85
match: 100
code: |
  <style>*{border:5ch solid#391B1B;scale:.5;margin:-290 250-470-60}&{margin:-15 60 75;corner-shape:notch;border-radius:0 43%/5ch;outline:9cm solid#7253BC
---

La cible du 13 septembre est un drapeau blanc sur fond violet : un épais contour brun en forme de drapeau, avec une marche en haut à droite et une autre en bas à gauche, et un mât brun à sa gauche. La solution de koda_pig dessine le drapeau avec la bordure de `html`, découpée en marches par `corner-shape:notch`. Un immense `outline` violet suit cette forme et couvre tout autour. Le `body`, sans aucune largeur, est le mât.

Cochez **Couleurs pédagogiques** pour voir le `body` en orange.

{% include animations/2026-09-13.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                /* html et body */
  border: 5ch solid #391B1B;       /* 40px */
  scale: .5;                       /* moitié de la taille */
  margin: -290 250 -470 -60;       /* pour le body */
}
& {                                /* html */
  margin: -15 60 75;               /* 280 × 240 */
  corner-shape: notch;             /* des marches, pas des courbes */
  border-radius: 0 43% / 5ch;      /* 120,4 × 40 à deux coins */
  outline: 9cm solid #7253BC;      /* violet partout ailleurs */
}
```

## Comment ça marche

### 1. html, réduit de moitié

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`, et passe avant `*`. `margin:-15 60 75` donne le haut, les côtés et le bas. `html` fait 400 − 60 − 60 = 280 de large. Sans doctype, la page est en mode quirks, et `html` prend la hauteur que ses marges laissent : 300 + 15 − 75 = 240.

`*` lui donne une bordure de `5ch`, 5 × 8 = 40px, et `scale:.5`, qui le réduit de moitié autour de son centre, (200 ; 105). À l'écran, `html` est une boîte de 140 × 120, de x = 130 à 270 et de y = 45 à 165, avec une bordure brune de 20px.

### 2. corner-shape:notch : deux marches

`border-radius:0 43%/5ch` donne la taille des coins : avant le `/`, les largeurs (0 pour haut gauche et bas droit, 43 % de 280 = 120,4 pour haut droit et bas gauche), après, les hauteurs (40 pour tous les coins). D'habitude, ça arrondirait deux coins en ellipses aplaties.

`corner-shape:notch` change la façon de dessiner un coin : au lieu d'une courbe, une encoche carrée de cette taille. Les coins haut droit et bas gauche perdent chacun un rectangle de 120,4 × 40, soit 60,2 × 20 à l'écran. La bordure suit l'encoche, et son bord intérieur a les mêmes marches : c'est le contour du drapeau.

### 3. L'outline couvre le reste

`outline:9cm solid#7253BC` trace un contour violet de 9cm (340px) autour de la bordure de `html`. Un `outline` suit les coins de sa boîte, encoches comprises : il épouse la forme du drapeau et couvre tout le canevas autour.

`html` n'a pas de fond : à l'intérieur de la bordure, le canevas se voit, blanc. C'est le drapeau.

### 4. Le body : le mât

Le `body` reçoit `margin:-290 250-470-60` de `*`. Dans les 200px de contenu de `html`, une marge gauche de −60 et une marge droite de 250 laissent 200 + 60 − 250 = 10 pour sa boîte, moins que ses 40 + 40 de bordure : le `body` n'a aucune largeur de contenu et n'est que sa bordure, 80 de large.

En mode quirks, le `body` remplit la hauteur de contenu de `html`, 160, moins ses propres marges : 160 + 290 + 470 = 920 de haut, bordures comprises. Il est lui aussi réduit par `.5`, dans `html` déjà réduit : un quart de sa taille à l'écran, 20 × 230, de x = 130 à 150 et de y = 35 à 265. Il longe le bord gauche du drapeau, du dessus jusque loin en dessous : le mât.

## Notes de golf

- `corner-shape:notch` change `border-radius` en découpes carrées : une seule valeur fait les deux marches du drapeau.
- `0 43%/5ch` met une largeur pour deux coins et 0 pour les deux autres, et une seule hauteur pour les quatre.
- Un immense `outline` suit les coins découpés : il peint le fond autour du drapeau, et l'intérieur reste blanc.
- `scale:.5` dans `*` réduit `html` et le `body` deux fois : de grandes marges comme `-290` et `-470` deviennent de petits déplacements.
- Le `body` est réduit à 0 de largeur de contenu par ses marges : sa bordure seule fait le mât.
- Pas d'accolade fermante, et `<style>` n'est jamais fermé.
