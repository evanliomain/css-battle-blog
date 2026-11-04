---
title: "Même dégradé, autres unités : un anneau coupé en 104 caractères"
lang: fr
ref: 2026-10-06
permalink: /fr/2026/10/06/meme-degrade-autres-unites/
description: "Comment un seul dégradé radial, lu avec des em et des lh différents sur html et body, dessine la cible CSS Battle du 6 octobre 2026."
target: /assets/targets/2026-10-06.png
target_url: https://cssbattle.dev/play/Kaggn8uvEQrRIx0YidV3
colors: ["#8b4646", "#fff", "#e98f6b"]
player: h_blierzt
chars: 104
score: 748.45
match: 100
code: |
  <style>*{*{margin:110 100;font:6px/20''}background:radial-gradient(9%2lh,#8B4646 5em,#FFF 0 278%,#E98F6B
---

La cible du 6 octobre est un disque brun dans un anneau blanc, sur un fond saumon. Une bande saumon coupe l'anneau des deux côtés, et deux barres blanches traversent le disque dans cette bande. H_Bliertz la dessine avec un seul dégradé, donné à `html` et à `body`. Le dégradé est écrit en `em` et en `lh`, et `body` change la valeur de ces unités : le même code dessine un anneau sur l'un et deux barres sur l'autre.

{% include animations/2026-10-06.html lang=page.lang %}

## Le code, aéré

```css
* {                          /* html (head et style restent cachés) */
  * {                        /* les descendants de html : seul body se voit */
    margin: 110 100;
    font: 6px/20 '';         /* 1em = 6px, 1lh = 120px */
  }
  background: radial-gradient(
    9% 2lh,                  /* taille de l'ellipse */
    #8B4646 5em,             /* disque brun */
    #FFF 0 278%,             /* anneau blanc */
    #E98F6B                  /* saumon au-delà */
  );
}
```

## Comment ça marche

### 1. Un dégradé pour html, et pour body

Le `*` extérieur touche tous les éléments : `html` et `body` reçoivent le fond (`head` et `style` aussi, mais ils sont cachés). Le `*{…}` imbriqué veut dire `* *` : tout élément placé dans un autre. C'est `body` (plus les éléments cachés), mais pas `html`. Seul `body` reçoit donc la marge et la police.

### 2. Sur html : un cercle, un disque et un anneau

`html` garde la police par défaut : 16px, avec `line-height: normal`. Dans Chrome, avec cette police, `1lh` vaut 18px.

- La taille `9% 2lh` fait 9 % de 400px = 36px en largeur, et 2 × 18px = 36px en hauteur. Les deux rayons sont égaux : l'ellipse est un cercle.
- `5em` vaut 5 × 16 = 80px : brun jusqu'à 80px du centre.
- `0` se colle à l'arrêt précédent et donne un bord net. Puis blanc jusqu'à `278%`. Un arrêt en pourcentage se mesure sur le rayon horizontal : 278 % de 36px ≈ 100px.
- Saumon au-delà.

Le fond de `html` couvre tout le canevas : le disque (rayon 80), l'anneau (de 80 à 100) et le fond sont déjà là.

### 3. body est une bande de 200 × 80

`margin:110 100` (CSS Battle tourne en mode quirks, les unités sont donc facultatives) place `body` en x = 100, y = 110, sur 200px de large. En mode quirks, `body` remplit la hauteur de la page moins ses marges : 300 − 110 − 110 = 80px. C'est donc la bande de y = 110 à y = 190.

Comme `html` a son propre fond, celui de `body` ne part pas sur le canevas. Il est peint dans la bande seulement.

### 4. La police change les unités

`font:6px/20''` donne une police de 6px et une hauteur de ligne de 20 × 6 = 120px. Sur `body`, `1em` = 6px et `1lh` = 120px. Le même dégradé se lit alors autrement :

| | Sur `html` | Sur `body` |
| --- | --- | --- |
| `9%` (largeur) | 36px | 18px |
| `2lh` (hauteur) | 36px | 240px |
| `5em` | 80px | 30px |
| `278%` | ≈ 100px | ≈ 50px |

Sur `body`, l'ellipse fait 18 × 240 : treize fois plus haute que large. Ses arrêts sont des ellipses de même forme, donc sur une bande de 80px de haut seulement, leurs côtés sont presque parfaitement verticaux.

### 5. La bande dessine les barres

Dans la bande, centrée sur x = 200 :

- brun de x = 170 à 230 (30px de chaque côté) ;
- blanc de 150 à 170 et de 230 à 250 : les deux barres ;
- saumon à l'extérieur, de 100 à 150 et de 250 à 300.

Ce saumon recouvre l'anneau de `html` des deux côtés : l'anneau a l'air coupé. Le brun du milieu est le même que celui du disque dessous, et le disque semble continuer à travers la bande.

## Notes de golf

- Un dégradé sert à deux boîtes : seules les unités changent, grâce à `font`.
- `font` exige une famille, sinon toute la déclaration est ignorée. `''`, un nom vide, est la plus courte qui soit valide.
- `6px/20` : une hauteur de ligne sans unité est un multiple de la taille de police, donc `20` vaut 120px.
- `9%2lh` n'a pas besoin d'espace : le `%` termine le nombre.
- `*{*{…}…}`, c'est de l'imbrication : la règle intérieure vaut `* *`, qui laisse `html` de côté.
- `<style>` n'est jamais fermé.
