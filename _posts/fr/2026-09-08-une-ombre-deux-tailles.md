---
title: "Une ombre, deux tailles : un appareil photo en 136 caractères"
lang: fr
ref: 2026-09-08
permalink: /fr/2026/09/08/une-ombre-deux-tailles/
description: "Comment une seule ombre étalée en em, immense sur html et petite sur un paragraphe à police minuscule, dessine la cible CSS Battle du 8 septembre 2026 : un appareil photo sur fond jaune."
target: /assets/targets/2026-09-08.png
target_url: https://cssbattle.dev/play/YaO5dVF3I9R870zMutcX
colors: ["#f1d36f", "#333333"]
player: krhek
chars: 136
score: 709.43
match: 100
code: |
  .<p>.<style>*{background:#333;margin:-25 60;border-radius:.6lh}&,p{box-shadow:0 0 0 63em#F1D36F;margin:75 80}p{margin:52 30;font:2%/63q"
---

La cible du 8 septembre est un appareil photo gris foncé sur fond jaune : un large boîtier arrondi, une bosse plus petite dessus, et un objectif rond cerclé de jaune. La solution de Wojciech Russek donne à `html` et à un `<p>` la même ombre jaune, étalée de `63em`. Sur `html`, ça fait 1008px : elle peint tout le fond jaune autour du boîtier. Sur le `<p>`, qui a une police minuscule, elle ne fait que 20px : l'anneau jaune de l'objectif.

Cochez **Couleurs pédagogiques** pour voir l'ombre du `<p>` en orange.

{% include animations/2026-09-08.html lang=page.lang %}

## Le code, aéré

```css
.<p>.                                /* deux points : deux lignes de texte */
<style>
* {
  background: #333;
  margin: -25 60;                    /* pour le body */
  border-radius: .6lh;
}
&, p {                               /* html et le p */
  box-shadow: 0 0 0 63em #F1D36F;    /* un anneau jaune de 63em */
  margin: 75 80;                     /* pour html */
}
p {
  margin: 52 30;
  font: 2% / 63q "";                 /* police de 0,32px, ligne de 59,53px */
}
```

## Comment ça marche

### 1. html : le boîtier

`&,p` donne à `html` (le `&` seul) `margin:75 80` : 240 de large, de x = 80 à 320, et en mode quirks 300 − 150 = 150 de haut, de y = 75 à 225. `*` lui donne un fond gris foncé, qui va sur tout le canevas, et `border-radius:.6lh` : `lh` est la hauteur de ligne, 18px ici, donc les coins sont arrondis de 10,8.

`box-shadow:0 0 0 63em#F1D36F` est une copie jaune de la boîte, étalée de 63em = 63 × 16 = 1008px : elle couvre tout le canevas. Mais une ombre ne se peint jamais sous sa propre boîte. Le canevas ne reste donc gris foncé que dans la boîte arrondie de `html` : le boîtier.

### 2. Le body : le viseur

Le `body` reçoit `margin:-25 60` de `*`. Dans `html`, il va de x = 140 à 260, et sa marge haute de −25 le remonte de 25 au-dessus de `html`, en y = 50. Il a le même fond foncé et les mêmes coins de 10,8. Sa partie haute, de y = 50 à 75, dépasse au-dessus du boîtier : le viseur.

### 3. Le p : un disque

Le code commence par un point, avant `<p>`. Ce point est du texte dans le `body` : le `body` a une ligne de 18px de haut avant le `<p>`. `margin:52 30` place le `<p>` de x = 170 à 230, et 52 sous cette ligne : en y = 50 + 18 + 52 = 120.

Le `<p>` contient lui aussi un point : il a une ligne de texte. `font:2%/63q"` fixe sa hauteur de ligne à `63q`, 59,53px : le `<p>` fait 60 × 59,53. Son rayon `.6lh` vaut maintenant 0,6 × 59,53 = 35,7, plus que la moitié de sa taille : un disque gris foncé.

### 4. Son ombre : l'objectif

Le `<p>` reçoit la même ombre `0 0 0 63em` que `html`. Mais `em` suit la taille de police de l'élément, et celle du `<p>` vaut `2%` de 16px : 0,32px. Chrome n'affiche jamais de texte sous 6px, mais cette limite ne change pas la valeur de `em` : j'ai mesuré `63em` à 63 × 0,32 = 20,16px sur le `<p>`.

L'ombre est donc un anneau jaune de 20px autour du disque, aux coins arrondis qui le suivent : l'objectif. Elle se peint par-dessus le boîtier, et le disque reste foncé au milieu.

## Notes de golf

- Une ombre en `em` donne deux tailles : 1008px sur `html`, 20px sur le `<p>`.
- L'immense ombre peint le fond jaune et laisse la boîte arrondie de `html` foncée, sans élément en plus.
- `2%` rend `em` minuscule, et `63q` fixe la hauteur de ligne : la taille du `<p>` vient d'une seule ligne de texte.
- `.6lh` donne des coins de 10,8 aux boîtes et un disque entier au `<p>`, car `lh` suit la hauteur de ligne.
- Deux points, un avant et un dans le `<p>`, donnent les lignes qui le placent et le dimensionnent.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
