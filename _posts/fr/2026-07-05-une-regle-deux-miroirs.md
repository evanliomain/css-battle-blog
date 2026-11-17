---
title: "Une règle, deux miroirs : deux interrupteurs en 122 caractères"
ref: 2026-07-05
permalink: /fr/2026/07/05/une-regle-deux-miroirs/
description: "Comment une seule règle +* retourne body puis remet le second p à l'endroit, pendant qu'une seule bordure et un zoom de 75 % font de deux p et deux img deux interrupteurs, dans la cible CSS Battle du 5 juillet 2026."
target: /assets/targets/2026-07-05.png
target_url: https://cssbattle.dev/play/B85IWOvFPcgdhZglP3Zt
colors: ["#3450ae", "#f7ec7d"]
player: selenit
chars: 122
score: 725.05
match: 100
code: |
  <p><img><p><img><style>*{background:#3450AE;margin:20;+*{scale:-1 1;*{border:solid 5vw#F7EC7D;border-radius:1in;*{zoom:75%
---

La cible du 5 juillet montre deux interrupteurs jaune pâle sur un fond bleu : deux contours de pilule, l'un au-dessus de l'autre, avec un petit disque à droite dans celui du haut et à gauche dans celui du bas. Ilya Streltsyn les construit avec deux `<p>`, qui contiennent chacun une `<img>`. Une seule bordure dessine les pilules et les disques. Une seule règle `+*` retourne body de gauche à droite, et remet le second p à l'endroit.

Cochez **Couleurs pédagogiques** pour distinguer les deux p pendant qu'ils se retournent.

{% include animations/2026-07-05.html lang=page.lang %}

## Le code, aéré

```css
<p><img><p><img>                /* body > p > img, p > img + style */
<style>
* {                             /* tous les éléments */
  background: #3450AE;          /* bleu, sur tout le canevas */
  margin: 20;                   /* html à 20, body à 40, p à 60 */
  +* {                          /* * + * : body, le 2e p, le style */
    scale: -1 1;                /* miroir, de gauche à droite */
    * {                         /* leurs descendants : p, img, p, img */
      border: solid 5vw#F7EC7D; /* bordure jaune de 20px */
      border-radius: 1in;       /* 96px : bouts arrondis */
      * {                       /* un niveau plus bas : les deux img */
        zoom: 75%               /* bordure de 15px, marge de 15px */
```

## Comment ça marche

### 1. Deux p, deux img

Il n'y a pas de doctype : la page est en mode quirks, et un nombre sans unité veut dire des px dans `margin`. `<p>` ouvre tout seul html, head et body, puis un p dans body. `<img>` va dans ce p. Un p ne peut pas contenir un autre p : le second `<p>` ferme donc le premier et en ouvre un nouveau. Il reçoit la seconde `<img>`, et le style s'y retrouve aussi, après l'img.

La page contient html, head, body, deux p, deux img et le style. head et le style ne sont pas affichés. Une `<img>` sans source ni texte alternatif n'a pas de contenu : sans le zoom, offsetWidth donne 40px pour chaque img, ses deux bordures de 20px et rien d'autre.

### 2. Trois sélecteurs imbriqués

`*` vise tous les éléments : ils reçoivent tous le bleu et la marge de 20px.

Le `+*` imbriqué veut dire `* + *` : un élément juste après un autre élément. head est le premier enfant de html et p le premier enfant de body : ils sont exclus. Restent body (après head), le second p (après le premier) et le style (après la seconde img).

Le `*` imbriqué dedans vise leurs descendants : les deux p, les deux img et le style. Le `*` un niveau plus bas vise les descendants de ceux-là : les deux img et le style. getComputedStyle le confirme : `scale:-1 1` sur body, le second p et le style ; une bordure de 20px sur les deux p, les deux img et le style ; un zoom de 0,75 sur les deux img et le style.

### 3. Une marge, à chaque étage

`margin:20` s'additionne. html est en (20, 20). En mode quirks, il remplit la fenêtre moins ses marges : 360 × 260. body est 20px plus loin : (40, 40), 320 × 220. Chaque p est encore 20px plus loin : de x = 60 à 340, 280px de large.

En hauteur, body n'a ni bordure ni padding. Sa marge haute et celle du premier p fusionnent : getBoundingClientRect place body et le premier p en y = 40. Entre les deux p, les deux marges de 20px fusionnent aussi : l'écart est de 20px.

Tous les éléments sont bleus. Le fond de html peint tout le canevas, et les autres sont du bleu sur du bleu.

### 4. Des pilules avec une bordure

`5vw` vaut 5 % de 400 : 20px. Chaque p reçoit une bordure jaune de 20px. `1in` vaut 96px, mais chaque p ne fait que 100px de haut. Quand deux rayons de coin dépassent ensemble la longueur du côté, le navigateur les réduit tous du même facteur : ici 100 / 192, ce qui donne 50px. Les bouts des p deviennent des demi-cercles : un contour de pilule.

### 5. Des pastilles avec la même bordure

Chaque img reçoit la même bordure de 20px et les mêmes coins de 96px. Son contenu est vide, donc la bordure la remplit : un disque. Sans le zoom, le disque ferait 40px avec des marges de 20px, et chaque p 120px de haut.

`zoom:75%` multiplie tout ce qui touche l'img par 0,75 : la bordure passe à 15px, la marge à 15px et les coins à 72px. Le disque fait 30px. La ligne qui le contient fait 15 + 30 + 15 = 60px de haut, donc chaque p fait 60 + 40 = 100px de haut. Les pilules vont de y = 40 à 140 et de 160 à 260. Avant tout retournement, les deux disques sont en x = 80 + 15 = 95, à gauche : en (95, 75) et (95, 195).

### 6. Deux miroirs

`scale:-1 1` garde la hauteur et inverse x, autour du centre de l'élément. body va de x = 40 à 360 : son centre est en x = 200. Tout ce qu'il contient passe dans le miroir. Les deux disques partent en x = 400 − 125 = 275, à droite.

Le second p reçoit le même `scale:-1 1`. Il va de x = 60 à 340 : son centre est aussi en x = 200. Retourné deux fois, il revient à l'endroit : son disque revient à gauche, en x = 95. Le disque du haut reste à droite. getBoundingClientRect donne (275, 75) et (95, 195), 30 × 30 chacun.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8.

- Un seul `+*` pour deux tâches. Comme le second p suit directement le premier, la règle qui retourne body remet aussi le second p à l'endroit.
- L'imbrication écrit les sélecteurs une seule fois. Avec des règles à plat, `*{…}*+*{scale:-1 1}*+* *{…}*+* * *{zoom:75%`, le code fait 133 caractères, pour la même image.
- `scale:-1 1` fait 10 caractères. `transform:scaleX(-1)` donne la même image en 132. Le ` 1` est nécessaire : `scale:-1` seul (120 caractères) veut dire −1 sur les deux axes. Les pastilles se retrouvent en haut à gauche et en bas à droite, et 2 948 pixels changent.
- `zoom:75%` réduit à la fois la bordure et la marge des img. Les écrire à la place, `margin:15;border-width:15`, donne la même image en 139 caractères.
- `5vw` vaut 20px en 3 caractères. `20px` donne la même image en 123. Un `20` sans unité (121 caractères) ne marche pas ici : dans mon Chrome, toute la déclaration `border` est rejetée, le canevas est uniformément bleu, et 26 397 pixels changent.
- `1in` donne le rayon des coins en 3 caractères. `50px` donne la même image en 123.
- Une seule marge place html, body et les p, et sa copie zoomée place les pastilles.
- Pas d'espace dans `5vw#F7EC7D`. Avec l'espace, le code fait 123 caractères, pour la même image.
- Rien n'est fermé. `}}}}</style>` à la fin donne 134 caractères, pour la même image.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 1 078 pixels, avec la même règle que dans les notes de golf. Tous sont sur des bords courbes : 908 sur les bouts arrondis des pilules et 170 autour des deux pastilles. Les bords droits correspondent. En zoomant, les courbes de la cible sont plus nettes : elle a 33 couleurs différentes, mon rendu 303. Le juge de CSS Battle donne au code 100 % de correspondance.
