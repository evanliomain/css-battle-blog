---
title: "L'arche du milieu est un trou : trois arches en 117 caractères"
lang: fr
ref: 2026-08-29
permalink: /fr/2026/08/29/l-arche-du-milieu-est-un-trou/
description: "Comment une liste de box-shadow sur html dessine la moitié droite de la cible CSS Battle du 29 août 2026, un body retourné la moitié gauche, et le canevas blanc se voit au milieu."
target: /assets/targets/2026-08-29.png
target_url: https://cssbattle.dev/play/2aQnTPdW5yYCr8Ot7dZ3
colors: ["#fff", "#0c0d0a", "#6d57c4"]
player: h_blierzt
chars: 117
score: 731.15
match: 100
code: |
  <style>*{margin:45%140-90;border-radius:1in;box-shadow:138q 0#FFF,69q 0#0C0D0A,4in 0 0 9cm#6D57C4;*{margin:0;scale:-1
---

La cible du 29 août, ce sont trois arches blanches côte à côte sur fond violet, qui montent du bas du cadre, avec un dôme noir et une bande noire de 10px entre chaque paire. La solution de H_Bliertz donne à `html` et au `body` la même boîte transparente et les trois mêmes ombres. Les ombres de `html` dessinent l'arche de droite, et le `body`, retourné par `scale:-1`, les projette à gauche. L'arche du milieu n'est pas une ombre : c'est le canevas blanc, vu à travers les deux boîtes.

Passez en **Vue large** pour voir les boîtes descendre sous le canevas, et cochez **Couleurs pédagogiques** pour distinguer les six ombres.

{% include animations/2026-08-29.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                  /* d'abord html */
  margin: 45% 140 -90;               /* 180 140 -90 */
  border-radius: 1in;                /* 96px, réduit à 60 */
  box-shadow:
    138q 0 #FFF,                     /* 130,39px à droite : arche blanche */
    69q 0 #0C0D0A,                   /* 65,2px à droite : noire, dessous */
    4in 0 0 9cm #6D57C4;             /* 384px à droite, étalée de 340,16px : violet */
  * {                                /* head, style, body */
    margin: 0;
    scale: -1;                       /* le body, retourné */
  }
}
```

## Comment ça marche

### 1. html : une boîte qui dépasse sous le canevas

`*` vise tous les éléments, `html` en premier. Dans `margin:45%140-90`, le pourcentage se calcule sur la largeur du canevas : 45 % de 400, soit 180 en haut. Puis 140 à gauche et à droite, et −90 en bas. Les marges n'ont pas d'unité : le mode quirks les lit en px.

`html` fait 400 − 280 = 120 de large. En mode quirks, il remplit la hauteur de la fenêtre moins ses marges : 300 − 180 + 90 = 210. C'est donc une boîte de 120 × 210 en (140 ; 180), qui descend jusqu'à y = 390, 90px sous le canevas.

### 2. Des coins de 1in : une arche

`border-radius:1in` demande des coins de 96px. Il en faudrait 192px pour deux, et la boîte ne fait que 120 de large. Le navigateur réduit tous les coins du même facteur, 120 / 192, à 60px. Le haut de la boîte est un demi-cercle. Les coins du bas vont de y = 330 à 390, hors du canevas : à l'écran, la boîte est une arche. Tout rayon de 60px ou plus donne le même rendu : j'ai vérifié `60px` et `9in`.

La boîte n'a pas de fond. On ne la voit pas, seulement ses ombres.

### 3. Une arche blanche, et une noire dessous

Une ombre a la forme de sa boîte, coins arrondis compris. `138q 0#FFF` la décale de 138 quarts de millimètre vers la droite : 130,39px. Cela donne une arche blanche de x = 270,39 à 390,39.

`69q 0#0C0D0A` est la même arche décalée de 65,2px, de x = 205,2 à 325,2. Les ombres sont peintes dans l'ordre inverse : elle passe sous la blanche. Une ombre externe n'est jamais peinte sous sa propre boîte, non plus. Entre la boîte (jusqu'à x = 260) et l'arche blanche, il ne reste donc qu'une bande noire de 10px et un dôme noir au-dessus.

### 4. Une ombre violette géante

`4in 0 0 9cm#6D57C4` décale la boîte de 384px vers la droite et l'étale de 9cm, soit 340,16px, de chaque côté. Son bord gauche tombe en x = 140 + 384 − 340,16 = 183,84, son haut en y = 180 − 340,16 = −160,16. Dernière de la liste, elle est peinte sous les arches blanche et noire.

Ses coins sont arrondis eux aussi. J'ai mesuré un rayon d'environ 243px. Son coin en haut à gauche laisse donc un vide blanc au-dessus de la boîte : sur la ligne y = 0, le violet ne commence qu'en x = 200.

### 5. Le body : la même boîte

Le `*` imbriqué vise tout élément placé dans un autre : `head`, `style` et le `body`. Les deux premiers ne s'affichent pas. `margin:0` retire au `body` la marge de 45 %. En mode quirks, le `body` remplit la hauteur de `html`. Je l'ai mesuré : 120 × 210 en (140 ; 180), la même boîte que `html`. Il reçoit le même rayon et les trois mêmes ombres.

### 6. scale:-1 : un miroir

`scale:-1` retourne le `body` autour de son centre, (200 ; 285). Ses ombres partent maintenant à gauche : une arche blanche de x = 9,61 à 129,61, la noire derrière, et du violet depuis le bord gauche jusqu'à x = 216,16. Sur la ligne y = 0, le violet du `body` s'arrête en x = 199, pile là où commence celui de `html` : le vide est bouché.

Le retournement est aussi vertical, mais il ne change rien : la boîte a les mêmes coins en haut et en bas, et les ombres n'ont pas de décalage vertical. J'ai vérifié que `scale:-1 1` donne exactement le même rendu.

Le `body` est peint après `html`, par-dessus. C'est pour cela que le violet a un décalage. Sans lui, j'ai vérifié que le violet du `body` recouvre l'arche blanche et la bande noire de droite. Avec le décalage de 384px, le violet du `body` s'arrête en x = 216,16, à gauche de tout ce qu'on voit des ombres blanche et noire de `html`.

### 7. L'arche du milieu

Aucune des deux boîtes ne peint ses ombres sous elle-même. Les deux boîtes sont la même arche en (140 ; 180), sans fond. Le canevas s'y voit donc, et il est blanc par défaut. L'arche du milieu ne coûte rien.

## Notes de golf

- Une seule règle donne la même boîte et les mêmes ombres à `html` et au `body`. Le `*` imbriqué ne change que deux choses : pas de marge, et un retournement.
- L'arche du milieu est gratuite : c'est le canevas blanc, laissé visible par les deux boîtes.
- `45%` fait 180px en 3 caractères, sans espace avant `140`. J'ai vérifié que `180 140-90` donne le même rendu, avec un caractère de plus.
- `138q` et `69q` font 130,39px et 65,2px en 4 et 3 caractères.
- `9cm` donne un étalement de 340,16px en 3 caractères, et `4in` un décalage de 384px.
- `scale:-1` est le miroir le plus court. La moitié verticale du retournement est sans effet ici.
- `<style>` n'est jamais fermé, et les deux dernières accolades sont omises.

## Si vous l'essayez chez vous

Dans mon Chrome local (version 157 au moment d'écrire), le code officiel ne rend pas exactement comme la cible. Les arches de la cible vont de x 10 à 130, de 140 à 260 et de 270 à 390. En local, les arches extérieures sont à 130,39px du milieu : leurs bords extérieur et intérieur sont flous sur une colonne de pixels (x = 9, 129, 270 et 390). Le haut arrondi des arches est aussi lissé un peu autrement. En tout, 1 248 pixels diffèrent de la cible : 711 nettement, tous sur les bords des arches, et les autres à peine. Sur le juge de CSS Battle, la solution est identique à 100 %.
