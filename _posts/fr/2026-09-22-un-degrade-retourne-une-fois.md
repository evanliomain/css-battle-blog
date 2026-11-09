---
title: "Un dégradé, retourné une fois : un S en 143 caractères"
lang: fr
ref: 2026-09-22
permalink: /fr/2026/09/22/un-degrade-retourne-une-fois/
description: "Comment un seul dégradé radial, utilisé par html et par un body retourné, dessine la cible CSS Battle du 22 septembre 2026 : deux demi-anneaux sur une barre foncée."
target: /assets/targets/2026-09-22.png
target_url: https://cssbattle.dev/play/KTcWkhPNnnWzPUv22eHs
colors: ["#8e7b3b", "#463c1d"]
player: koda_pig
chars: 143
score: 702.36
match: 100
code: |
  <style>*{background:radial-gradient(1q at 0,#8E7B3B 5ch,#463C1D 0 53q,#8E7B3B)215px 53q;*{scale:-1;margin:50 215 50-30;box-shadow:-32q 0#463C1D
---

La cible du 22 septembre est brun foncé sur fond olive : une barre verticale avec un demi-anneau à sa gauche en haut et un autre à sa droite en bas, comme un S coupé en deux. La solution de koda_pig écrit un seul dégradé radial pour tous les éléments. Sur `html`, il dessine le demi-anneau du bas. Sur le `body`, le même dégradé dessine celui du haut, parce que `scale:-1` fait faire un demi-tour au `body`. Le même retournement envoie l'ombre du `body` à droite, où elle devient la barre.

Cochez **Couleurs pédagogiques** pour voir en orange ce que dessine le `body`.

{% include animations/2026-09-22.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                  /* html, puis le body */
  background:
    radial-gradient(1q at 0,         /* centré sur le bord gauche de la tuile */
      #8E7B3B 5ch,                   /* clair jusqu'à 40px */
      #463C1D 0 53q,                 /* foncé jusqu'à 50,08px : un anneau */
      #8E7B3B)
    215px 53q;                       /* position de la tuile */
  * {                                /* le body */
    scale: -1;                       /* un demi-tour */
    margin: 50 215 50 -30;           /* x −30 → 185, 200 de haut */
    box-shadow: -32q 0 #463C1D;      /* 30,24px à gauche, donc à droite une fois retourné */
  }
}
```

## Comment ça marche

### 1. Un demi-anneau dans une tuile

`*` donne à tous les éléments le même fond. Le fond de `html` sert pour tout le canevas. Un dégradé sans taille remplit sa zone, ici 400 × 300, et se répète.

`radial-gradient(1q at 0,…)` est un cercle de rayon `1q` (0,94px), centré en `0` : une seule valeur de position donne x, et y vaut le centre par défaut. Le centre est donc sur le bord gauche de la tuile, à mi-hauteur. Les arrêts de couleur dépassent le rayon, ce n'est pas un problème : olive jusqu'à `5ch` (40px), foncé de 40px (`0` remonte à l'arrêt précédent) à `53q` (50,08px), puis olive. C'est un anneau foncé de 10px. Chaque tuile ne dessine que la partie de l'anneau qui tombe en elle : la moitié droite.

### 2. 215px 53q : l'anneau du bas

`215px 53q` place la tuile en x = 215, y = 50,08. Le centre de l'anneau passe en (215 ; 200,08), et le demi-anneau s'ouvre vers la gauche, de y = 150 à 250 : le bas du S. Les tuiles répétées autour ont leurs anneaux à 400px ou 300px de là, hors du canevas.

### 3. Le body et le même dégradé

`*` imbriqué vise les éléments placés dans un autre : le `head`, jamais affiché, et le `body`. `margin:50 215 50-30` donne au `body` une marge gauche de −30 et une marge droite de 215 : il va de x = −30 à 185, sur 215 de large. En mode quirks, il fait 300 − 50 − 50 = 200 de haut, de y = 50 à 250.

Le `body` reçoit le même fond, dans sa propre zone de 215 × 200, avec le même `215px 53q`. 215px, c'est exactement une largeur de tuile : une tuile commence sur le bord gauche du `body`, et son demi-anneau y est centré, 50,08 + 100 sous le haut du `body`. Il tombe presque entièrement hors du canevas.

### 4. scale:-1 retourne le body

`scale:-1` applique une échelle de −1 au `body` sur les deux axes, autour de son centre : c'est un demi-tour. Tout ce qui est dans le `body` tourne avec lui, fond compris. Le demi-anneau saute de son bord gauche à son bord droit, en (185 ; 99,92), et s'ouvre maintenant vers la droite : le haut du S.

### 5. L'ombre passe à droite

`box-shadow:-32q 0#463C1D` décale une copie foncée du `body` de 30,24px vers la gauche. Mais l'ombre tourne avec le `body` : à l'écran, elle part de 30,24px vers la droite, de x = 0,24 à 215,24.

Une ombre ne se peint jamais sous la boîte qui la projette. La partie sous le `body` (jusqu'à x = 185) est coupée, et il ne reste qu'une bande de x = 185 à 215,24, de y = 50 à 250 : la barre verticale, qui relie les deux demi-anneaux.

## Notes de golf

- Un seul dégradé, écrit une fois dans `*`, dessine les deux demi-anneaux : `scale:-1` sur le `body` donne le second dans l'autre sens.
- `at 0` place le centre sur le bord de la tuile : la tuile coupe l'anneau en deux gratuitement.
- `#463C1D 0 53q` utilise l'astuce du `0` : un arrêt à 0 remonte à l'arrêt précédent, ce qui donne un bord net.
- L'ombre ne se voit qu'en dehors du `body` : une barre de 30px sans largeur ni hauteur à elle.
- `5ch`, `53q` et `32q` donnent 40, 50,08 et 30,24 en 3 caractères chacun.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
