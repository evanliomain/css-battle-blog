---
title: "Deux outlines et un clip-path : un carré rayé en 156 caractères"
lang: fr
ref: 2026-11-11
permalink: /fr/2026/11/11/deux-outlines-et-un-clip-path/
description: "Comment un fond en bandes, deux outlines du vert du fond et un clip-path dessinent la cible CSS Battle du 11 novembre 2026 : cinq barres et un disque qui mord dedans."
target: /assets/targets/2026-11-11.png
target_url: https://cssbattle.dev/play/Qae8ETelpD2p7HlrmYRt
colors: ["#6f9893", "#2f5a76"]
player: evanliomain
chars: 156
score: 690.43
match: 100
code: |
  <style>*{margin:30 80 20;outline:5pc solid#6f9893;background:linear-gradient(#2f5a76 5ch,#6f9893 0)0/9%20%;*{margin:35 0 45 220;clip-path:circle(25vw at 5vw
---

La cible du 11 novembre est vert d'eau, avec un carré de cinq barres bleu foncé. À droite, un disque de la couleur du fond mord dans les barres, et une fine barre verticale se tient dedans. Je dessine les barres avec un fond en bandes sur `html`, et je cache tout autour du carré avec un grand outline vert. Le `body` est la barre verticale, et son propre outline vert, découpé en cercle par `clip-path`, fait le disque.

Les **couleurs pédagogiques** distinguent les deux outlines, et la **vue large** montre jusqu'où ils vont.

{% include animations/2026-11-11.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                          /* html d'abord, puis le body */
  margin: 30 80 20;                          /* html : 240 × 250 en (80, 30) */
  outline: 5pc solid #6f9893;                /* 80px de vert autour de la boîte */
  background: linear-gradient(#2f5a76 5ch, #6f9893 0)
              0 / 9% 20%;                    /* tuiles de 50px : 40 de bleu, 10 de vert */
  * {                                        /* le body */
    margin: 35 0 45 220;                     /* 20 × 170 en (300, 65) */
    clip-path: circle(25vw at 5vw);          /* rayon 100, centre (320, 150) */
  }
}
```

## Comment ça marche

### 1. html : le carré

`*` vise tous les éléments, `html` compris. `margin:30 80 20` donne 30 en haut, 80 à gauche et à droite, 20 en bas. `html` va de x = 80 à 320. En mode quirks, `html` prend la hauteur laissée par ses marges : 300 − 30 − 20 = 250, de y = 30 à 280.

### 2. Le fond : des bandes partout

Le fond de `html` est peint sur tout le canevas, pas seulement sur sa boîte. Mais sa taille et sa position se calent toujours sur la boîte de `html`.

`0/9%20%` fixe la taille des tuiles : 20 % de 250, soit 50px de haut, et la première tuile commence à y = 30. Le dégradé met `#2f5a76` jusqu'à `5ch`, puis `#6f9893`. Avec la police par défaut de 16px, `1ch` vaut 8px, donc `5ch` vaut 40px : 40px de bleu, puis 10px de vert, encore et encore. Les bandes bleues vont de y = 30 à 70, de 80 à 120, de 130 à 170, et ainsi de suite, au-dessus et au-dessous du carré aussi.

### 3. Un outline cache le reste

`outline:5pc solid#6f9893` trace 80px de vert autour de `html` (`1pc` vaut 16px). Il va de x = 0 à 400 et de y = −50 à 360 : il couvre tout le canevas hors du carré. Dans le carré, il reste cinq barres bleues, de y = 30 à 270, puis la fin verte de la dernière tuile, de 270 à 280.

### 4. Le body : la barre verticale

`*` imbriqué vise le `body`. `margin:35 0 45 220` le met de x = 300 à 320 et, en mode quirks, de y = 65 à 235 : une boîte de 20 × 170.

`*` donne aussi au `body` le même fond. Ses tuiles font 20 % de 170, soit 34px de haut, moins que les 40px de bleu : la partie verte n'apparaît jamais, et le `body` est tout bleu. C'est la barre verticale.

### 5. Un deuxième outline

Le `body` a lui aussi l'outline vert de 80px : de x = 220 à 400 et de y = −15 à 315. J'ai vérifié en donnant une couleur différente à chaque outline : celui du `body` est peint au-dessus de celui de `html`. Sans `clip-path`, il cacherait la droite de toutes les barres, à partir de x = 220.

### 6. clip-path : un disque

`clip-path` découpe tout ce que peint le `body`, outline compris. `circle(25vw at 5vw)` est un cercle de rayon 100 (`25vw` d'un canevas de 400px de large). Son centre est à 20px du bord gauche du `body` (`5vw`), et la position verticale est par défaut au milieu : le centre est en (320, 150).

Il reste de l'outline un disque vert de x = 220 à 400 (le canevas coupe le reste). Il mord dans les barres, et la boîte bleue du `body` reste dedans.

## Notes de golf

- Le vert n'est jamais une boîte : c'est la fin de chaque tuile du dégradé, l'outline de `html` et l'outline du `body`.
- Une seule règle `*` habille les deux boîtes. Le `body` devient tout bleu sans rien coûter : sa tuile est plus courte que la partie bleue du dégradé.
- `clip-path` découpe aussi l'outline. Un disque couleur du fond sort d'un outline, sans `border-radius` ni élément en plus.
- Un arrêt de couleur demande une unité : `5ch` fait 40px en 3 caractères, un de moins que `40px`.
- `9%` ne sert à rien : les bandes sont horizontales, la largeur de la tuile ne compte pas. J'ai vérifié que `1%` donne le même rendu. Le `0` devant `/` est la position, obligatoire pour écrire une taille.
- Des `vw` pour le cercle : `25vw` et `5vw` valent 100 et 20.
- Ni parenthèse fermante ni accolades : le code s'arrête juste après `5vw`.
