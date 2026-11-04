---
title: "Un lien plein d'espaces : deux crochets en 128 caractères"
lang: fr
ref: 2026-11-01
permalink: /fr/2026/11/01/un-lien-plein-d-espaces/
description: "Comment une bordure de 170px sur html et un lien qui ne contient que des espaces dessinent la cible CSS Battle du 1er novembre 2026, et pourquoi ça ne marche que dans le Chrome de CSS Battle."
target: /assets/targets/2026-11-01.png
target_url: https://cssbattle.dev/play/PFTHiJ57Dlg7O5pWe4yX
colors: ["#fff", "#6d4630"]
player: gabriele19
chars: 128
score: 718.1
match: 100
code: |2
   <a>   <style>a{border:5vw solid#fff;border-radius:42Q}&{>*{margin:10-10}border:180q solid#6D4630;margin:-30 0;font:127q/0'Serif
---

La cible du 1er novembre est une forme blanche sur un brun chocolat : un pied avec deux extrémités recourbées, en haut et en bas, comme un « ) » et un « ( » qui se chevauchent, et une courte barre en travers au milieu. La solution de Gabriele n'a aucun fond. Le brun est une énorme bordure sur `html`, et la barre est la petite fenêtre qu'elle laisse au milieu. Les deux crochets viennent d'un lien, `<a>`, qui ne contient que des espaces. Un avertissement d'abord : ces crochets n'apparaissent que dans le Chrome de CSS Battle. Je n'ai pas pu les reproduire : une partie de cet article dit ce que j'ai pu vérifier, et ce que je n'ai pas pu.

{% include animations/2026-11-01.html lang=page.lang %}

## Le code, aéré

```css
 <a>   <style>                 /* un lien qui ne contient que des espaces */
a {
  border: 5vw solid #fff;      /* 20px, blanc */
  border-radius: 42Q;          /* environ 40px */
}
& {                            /* & seul, c'est html */
  > * {                        /* ses enfants : head et body */
    margin: 10 -10;
  }
  border: 180q solid #6D4630;  /* 170px, brun */
  margin: -30 0;
  font: 127q/0 'Serif';        /* 120px, interligne 0 */
}
```

## Comment ça marche

### 1. Le brun est une bordure

Aucun élément n'a de fond : le canevas reste blanc. Sur `html`, `border:180q` peint une bordure brune de 170px sur les quatre côtés (180q font 170,1px, et Chrome dessine les bordures en pixels entiers).

`margin:-30 0` et le mode quirks (où `html` remplit la hauteur de la fenêtre moins ses marges) donnent à `html` une boîte de 400×360, en (0, −30). Retirez 170px de chaque côté : la zone de contenu fait 60×20, en (170, 140). Rien n'y est peint, donc le canevas blanc se voit : c'est la barre au milieu de la forme. Je l'ai vérifié sur la cible : la barre fait pile 60×20 en (170, 140).

### 2. body fait 80px de large

`>*` imbriqué dans `&` vise les enfants de `html` : `head`, qui reste caché, et `body`. `margin:10-10` donne au `body` 60 + 10 + 10 = 80px de large, de x = 160 à 240. Sa hauteur vaut 20 − 10 − 10 = 0, à y = 150.

`font:127q/0'Serif` sur `html` est hérité par tout ce qu'il contient : une police de 120px (127q), un interligne de 0, et une police nommée `Serif`. Le guillemet n'est jamais fermé : la chaîne s'arrête avec le code.

### 3. Le lien, dans le Chrome actuel

Le `<a>` est dans le `body`, en ligne. Son contenu, ce sont trois espaces (le `<style>` se retrouve aussi dans le lien, mais il est caché). Il a une bordure blanche de 20px (`5vw`) et des coins de 42Q, environ 40px.

Dans Chrome 156, les espaces disparaissent : le lien fait 0px de large à l'intérieur, sa boîte se réduit donc à ses bordures gauche et droite, 40px. Sa hauteur, c'est la hauteur de la police (138px ici) plus les bordures du haut et du bas : 178px. Les coins sont trop grands pour une boîte de 40px, ils sont ramenés à 20px : une seule pilule blanche de 40×178, à partir de x = 160. Ce n'est pas la cible.

### 4. Sur CSS Battle : deux crochets

Sur CSS Battle, le même code obtient 100 %. Dans la cible, la forme blanche est faite de deux crochets de 50×160 qui se chevauchent sur le pied :

- un « ) » de x = 160 à 210, ouvert à gauche ;
- un « ( » de x = 190 à 240, ouvert à droite ;
- ils partagent le pied, de x = 190 à 210.

Chaque crochet a un trait de 20px et un rayon extérieur de 40px, comme la bordure du `<a>`, et les deux tiennent dans les 80px du `body`. Leur hauteur, 160px, c'est la taille de la police, 120px, plus deux bordures de 20px. Je n'ai pas pu voir comment le Chrome du juge transforme le lien en ces deux crochets : l'animation les dessine d'après la géométrie de la cible.

## Notes de golf

- Le brun ne coûte aucun `background` : une bordure de 170px le peint, et son milieu vide fait la barre.
- `q` et `vw` donnent des tailles courtes et exactes : `180q` (170px), `127q` (120px), `5vw` (20px), `42Q` (environ 40px).
- `font:127q/0'Serif` règle la taille, l'interligne et la police en un seul raccourci, sans guillemet de fermeture.
- `&{>*{…}…}` atteint le `body` depuis la règle de `html`.
- `<a>` vient avant `<style>` : la feuille de style se retrouve dans le lien, cachée. L'espace du début compte dans les 128 caractères.

## Si vous l'essayez chez vous

CSS Battle note les solutions dans son propre Chrome, plus ancien. Dans Chrome 156, ce code dessine une seule pilule et la barre au lieu des deux crochets, avec plus de 5 000 pixels faux : je n'ai pas pu reproduire le 100 %. Le cadre et la barre sortent exactement comme dans la cible ; ce sont les crochets que je ne sais pas expliquer. À noter : `'Serif'` entre guillemets est un nom de police, pas le mot-clé générique `serif`, donc la police obtenue dépend de la machine. Sur le juge de CSS Battle, c'est 100 % identique.
