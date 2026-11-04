---
title: "Un outline double géant : un panier en 118 caractères"
lang: fr
ref: 2026-10-29
permalink: /fr/2026/10/29/un-outline-double-geant/
description: "Comment un seul outline:double, partagé par html et un body réduit, dessine la cible CSS Battle du 29 octobre 2026 : un stade, deux U et un carré."
target: /assets/targets/2026-10-29.png
target_url: https://cssbattle.dev/play/3ZNznMmHqozsPyLJeMmX
colors: ["#444f52", "#e9c282"]
player: benjamintordjman
chars: 118
score: 729.91
match: 100
code: |
  <style>*{background:#444F52;outline:5in double#E9C282}&{margin:110 40 30;border-radius:9in;*{margin:-50%0 0;scale:.125
---

La cible du 29 octobre ressemble à un panier vu de face : un grand stade ardoise sur une carte beige, deux U emboîtés accrochés à son bord haut, et un petit carré qui dépasse au-dessus. Benjamin Tordjman la dessine avec une propriété qui fait presque tout : un énorme `outline:double`. Sur `html`, il peint tout autour du stade. Sur un `body` réduit huit fois, le même outline devient les deux U.

{% include animations/2026-10-29.html lang=page.lang %}

## Le code, aéré

```css
* {                                  /* html, puis body */
  background: #444F52;
  outline: 5in double #E9C282;       /* 480px : trait 160, vide 160, trait 160 */
}
& {                                  /* & seul, c'est html */
  margin: 110 40 30;
  border-radius: 9in;
  * {                                /* body (head et style restent cachés) */
    margin: -50% 0 0;
    scale: .125;
  }
}
```

## Comment ça marche

### 1. Le stade, c'est le canevas

Au premier niveau, `&` veut dire `html`. `margin:110 40 30` lui laisse 320px de large. CSS Battle tourne en mode quirks, où `html` remplit la hauteur de la page moins ses marges : 300 − 110 − 30 = 160. `html` est donc une boîte de 320×160 en (40, 110).

Son fond ardoise n'est pas peint dans cette boîte : le fond de `html` part sur tout le canevas. Rien d'autre ne peint la boîte elle-même. Le stade qu'on voit, c'est donc simplement le canevas.

### 2. 9in devient 80px

`border-radius:9in`, c'est 864px. Quand deux coins d'un même côté dépassent la longueur de ce côté, le navigateur réduit tous les rayons du même facteur. Le côté le plus serré est la hauteur : 864 + 864 sur 160px. Chaque coin finit donc à 80px, la moitié de la hauteur : la boîte est un stade.

### 3. Un outline qui couvre le cadre

`*` donne aussi à `html` un `outline:5in double` de 480px. Un trait `double` se coupe en trois parts égales : un trait de 160px, un vide de 160px, un trait de 160px. L'outline suit les coins arrondis.

Le trait intérieur part du bord du stade et s'étend sur 160px. Le point du canevas le plus éloigné, un coin, est à environ 145px du stade. Le trait intérieur couvre donc tout le canevas autour du stade en beige, et le vide et le trait extérieur tombent hors du cadre. La carte beige est un outline, pas un fond.

### 4. body : un carré de 320px

`*` touche aussi `body`, qui reçoit le même fond ardoise et le même outline. Sa propre règle :

- `margin:-50% 0 0` : une marge en % se calcule toujours sur la largeur du parent, ici 320px. La marge du haut vaut donc −160px.
- `body` fait 320px de large, et le mode quirks lui fait remplir la hauteur de `html` moins ses marges : 160 − (−160) = 320px.

Ça donne un carré de 320×320, de y = −50 à y = 270. Son centre est en (200, 110) : le milieu du bord haut du stade.

### 5. scale:.125 réduit la boîte et l'outline

`scale:.125` réduit le `body` huit fois autour de son centre : un carré de 40×40 en (180, 90). L'outline rétrécit aussi : 480 × 0,125 = 60px, soit un trait de 20px, un vide de 20px et un trait de 20px autour du carré.

`scale` fait encore autre chose : il donne au `body` sa propre couche, peinte par-dessus l'outline de `html`. J'ai testé une variante qui fait le même carré sans `scale` : l'outline de `html` repeint alors le haut du carré.

### 6. Le vide est transparent

Le carré est à moitié au-dessus du stade, à moitié dedans. Son outline aussi :

- au-dessus de y = 110, les deux traits beiges tombent sur le beige de l'outline de `html` et disparaissent. Le vide montre ce beige, lui aussi.
- dans le stade, les deux traits font deux U beiges, et le vide entre les deux laisse voir le canevas ardoise : le U foncé.

Le carré ardoise dépasse de 20px au-dessus du stade. Tout ça vient d'un seul `outline`, écrit une fois.

## Notes de golf

- Un seul `outline` sur `*` sert deux fois : en cache autour du stade sur `html`, en U sur le `body` réduit.
- Pas de fond pour le beige : c'est le trait intérieur de l'outline qui le peint.
- `9in` est un rayon « assez grand » et court ; le navigateur le ramène à 80px.
- `margin:-50%0 0` : une marge en % se prend sur la largeur, donc −50 % vaut pile −160px, et le `%` termine le nombre, pas besoin d'espace avant `0`.
- `scale:.125` règle la taille et la couche d'un coup.
- `double#E9C282` : pas d'espace avant le `#`. `<style>` n'est jamais fermé.
