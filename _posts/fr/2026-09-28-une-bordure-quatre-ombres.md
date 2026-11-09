---
title: "Une bordure, quatre ombres : un q en 145 caractères"
lang: fr
ref: 2026-09-28
permalink: /fr/2026/09/28/une-bordure-quatre-ombres/
description: "Comment une bordure arrondie et quatre ombres dessinent la cible CSS Battle du 28 septembre 2026 : deux tirets et un q, en noir sur blanc."
target: /assets/targets/2026-09-28.png
target_url: https://cssbattle.dev/play/sPBh2rqUt3ilhlL5Rdhj
colors: ["#000", "#fff"]
player: benjamintordjman
chars: 145
score: 700.43
match: 100
code: |
  <style>&{margin:70 50 50%240;border:8mm solid;border-radius:70%0 0 70%/55%;*{margin:100 10-130-50;box-shadow:11q 0#fff,74q 0,-50vw -69q,-95q -69q
---

La cible du 28 septembre est en noir sur blanc : deux tirets à gauche, puis un q dont la panse est ouverte en bas, à côté d'un pied qui dépasse à droite. La solution de Benjamin Tordjman dessine le q avec la bordure de `html`, arrondie à gauche seulement. Le `body` se place sous la panse, et ses quatre ombres dessinent tout le reste : les deux tirets, le pied et une fine fente blanche. L'astuce : une ombre ne se peint jamais sous la boîte qui la projette.

Cochez **Couleurs pédagogiques** pour voir chaque ombre dans sa couleur.

{% include animations/2026-09-28.html lang=page.lang %}

## Le code, aéré

```css
<style>
& {                                  /* html */
  margin: 70 50 50% 240;             /* x 240 → 350, haut en 70 */
  border: 8mm solid;                 /* 30px, noire */
  border-radius: 70% 0 0 70% / 55%;  /* 77 × 88, réduit à 70 × 80 */
  * {                                /* body */
    margin: 100 10 -130 -50;         /* x 220 → 310, y 200 → 230 */
    box-shadow:
      11q 0 #fff,                    /* fente blanche, au-dessus */
      74q 0,                         /* le pied */
      -50vw -69q,                    /* premier tiret */
      -95q -69q;                     /* second tiret */
  }
}
```

## Comment ça marche

### 1. La bordure de html est le q

Au premier niveau d'une feuille de style, `&` seul vise la racine, `html`. `margin:70 50 50%240` donne les marges haute, droite, basse et gauche : `html` commence en x = 240 et y = 70, et fait 400 − 240 − 50 = 110px de large.

`8mm` font 30,24px. Chrome arrondit l'épaisseur d'une bordure au pixel entier inférieur : la bordure fait 30px. Sans couleur, elle prend celle du texte : noir. La boîte fait 160px de haut ; l'étape 3 explique d'où ça vient.

### 2. Un rayon trop grand, réduit

`border-radius:70%0 0 70%/55%` n'arrondit que les coins haut gauche et bas gauche. Un rayon en pourcentage se calcule sur la taille de la boîte : 70 % de 110 = 77px en largeur, 55 % de 160 = 88px en hauteur.

Deux coins de 88px sur un côté de 160px, ça fait 176px : ils ne tiennent pas. Chrome réduit alors tous les rayons du même facteur, 160 / 176. Les coins deviennent 70 × 80. Je l'ai vérifié : `70px 0 0 70px/80px` donne exactement le même rendu, avec 4 caractères de plus. Le côté gauche est maintenant une demi-ellipse, la panse du q, et la bordure droite de 30px fait la haste.

### 3. Le body sous la panse

`*` imbriqué dans `&` vise tous les éléments dans `html` : le `head`, jamais affiché, et le `body`. `margin:100 10-130-50` place le haut du `body` 100px sous le contenu de `html`, en y = 200. Sa marge gauche de −50 le fait commencer en x = 220, et sa marge droite de 10 l'arrête en x = 310.

Sa hauteur vient du mode quirks. Sans doctype, la page est en mode quirks, et le `body` s'étire pour remplir `html`. Ici, la marge basse de 50 % de `html` fait 200px (une marge en pourcentage se calcule sur la largeur, 400px). Il ne reste aucune place à `html`, donc le `body` remplit 0px : 0 − 100 + 130 = 30px de haut, de y = 200 à 230.

Et les 160px de `html` ? La boîte de marge du `body` finit en 100 + 30 − 130 = 0, au-dessus de son propre haut. J'ai mesuré que Chrome arrête alors le contenu de `html` au haut du `body` : 100px de contenu, plus deux bordures de 30px, font 160px. Je l'ai vérifié avec d'autres marges : une marge haute de 90 donne 150px.

### 4. Deux ombres : les tirets

Le `body` n'a pas de fond, mais une `box-shadow` est toujours pleine. Sans couleur, elle est noire. `-50vw -69q` décale une copie de la boîte du `body` de 200px vers la gauche (50vw, c'est la moitié de 400) et de 65,2px vers le haut : un tiret de 90 × 30, de x = 20 à 110 et de y = 134,8 à 164,8. `-95q -69q` la décale de 89,77px vers la gauche : le second tiret, de x = 130,23 à 220,23.

### 5. Rognées sous le body

Une ombre extérieure ne se peint jamais à l'intérieur de la boîte de son élément. Chrome découpe l'ombre là où se trouve la boîte, même si la boîte est transparente.

`74q 0` décale une ombre noire de 69,92px vers la droite : de x = 289,92 à 379,92. Seule la partie à droite du `body`, à partir de x = 310, est peinte. Elle couvre le bas de la haste et fait le pied, jusqu'en x = 379,92.

`11q 0#fff` est en premier dans la liste, donc peinte au-dessus. Elle décale une ombre blanche de 10,39px vers la droite, et seuls ses 10,39 derniers pixels dépassent du `body` : une fente blanche de x = 310 à 320,39. Elle coupe la bordure basse de `html` entre la panse et la haste : la panse s'ouvre en bas. Sans elle, 1 200 pixels sont faux au ×2.

## Notes de golf

- `&` au premier niveau, c'est `html`, et `*` imbriqué, c'est le `body` : ni le q ni les ombres n'ont besoin d'une balise en plus.
- `50%240` se passe d'espace après `%`, et 50 % donne les 200px de marge basse dont la mise en page a besoin, en 3 caractères.
- `8mm` donne une bordure de 30px en 3 caractères, grâce à l'arrondi vers le bas.
- Un rayon en pourcentage trop grand est réduit : `70%0 0 70%/55%` est plus court que le `70px 0 0 70px/80px` exact.
- Ni fond ni taille : le `body` ne sert qu'à projeter des ombres, et à masquer la partie qu'il recouvre.
- Le `q` (quart de millimètre) et le `vw` donnent les décalages bizarres en 3 ou 4 caractères : `11q`, `69q`, `74q`, `95q`, `50vw`.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
