---
title: "Deux bordures et un huitième de tour : un chevron encadré en 117 caractères"
ref: 2026-05-29
permalink: /fr/2026/05/29/deux-bordures-et-un-huitieme-de-tour/
description: "Comment une seule règle de bordure donne à html un cadre crème complet et à body deux côtés seulement, tournés de 45 degrés en chevron, pendant que le fond de body peint le canevas rose, dans la cible CSS Battle du 29 mai 2026."
target: /assets/targets/2026-05-29.png
target_url: https://cssbattle.dev/play/1kUrMKG4FIFzxFo0PXVn
colors: ["#f3ead2", "#cf596a"]
player: levito
chars: 117
score: 731.15
match: 100
code: |
  <style>*{margin:40 90;border:5ch solid#F3EAD2;*{margin:53 0-53;border-width:40 0 0 40;rotate:45deg;background:#CF596A
---

La cible du 29 mai montre un épais cadre crème sur un fond rose, avec dedans un chevron crème qui pointe vers le haut et laisse un triangle rose en dessous. Veit Lehmann donne à html et à body la même bordure crème de 40px. html garde ses quatre côtés : c'est le cadre. body ne garde que le haut et la gauche, un L, et un huitième de tour en fait le chevron.

Avec les **Couleurs pédagogiques**, le cadre de html et les deux bordures de body ont chacun leur couleur.

{% include animations/2026-05-29.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                            /* html, head, body, style */
  margin: 40 90;               /* html : 220 × 220 en (90, 40) */
  border: 5ch solid#F3EAD2;    /* 5ch = 40px : le cadre de html ; body : style et couleur */
  * {                          /* * * : head, body, style (pas html) */
    margin: 53 0-53;           /* body : 140 × 140 en (130, 133) */
    border-width: 40 0 0 40;   /* body : le haut et la gauche seulement, un L */
    rotate: 45deg;             /* body : le L devient un chevron */
    background: #CF596A        /* celui de body, peint sur le canevas */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `40` dans une marge ou une épaisseur de bordure est lu en px.

La page a html, head, body et style. head et style ne sont pas affichés. `*` vise les quatre : html et body reçoivent tous les deux la première marge et la bordure. Le `*{` imbriqué veut dire `* *` : tout élément placé dans un autre. Ce sont head, body et style, mais pas html. La seconde marge, les épaisseurs de bordure, la rotation et le fond ne vont donc qu'à body. Sa marge remplace la première.

Le `<style>` n'est jamais fermé, ni les deux règles : la fin du code les ferme.

### 2. Le cadre de html

`margin:40 90` met 40px en haut et en bas, 90px sur les côtés. En mode quirks, html remplit la page moins ses marges : 400 − 180 = 220 de large, 300 − 80 = 220 de haut. Je l'ai mesuré : 220 × 220, en (90, 40).

`border:5ch solid#F3EAD2` lui donne une bordure crème. `ch` est la largeur du « 0 » dans la police courante. Sans police réglée, c'est Times en 16px, et dans mon Chrome `5ch` vaut 40px : un `ch` fait donc 8px. Le trou du cadre fait 220 − 80 = 140 de côté, en (130, 80).

### 3. Le canevas rose

`background:#CF596A` est dans la règle imbriquée : seul body le reçoit. html n'a pas de fond. Dans ce cas, le navigateur peint le fond de body sur tout le canevas, et la boîte de body, elle, n'en peint aucun.

Je l'ai vérifié : avec `<style>html{background:#CF596A}</style>` ajouté devant le code, le canevas garde le même rose, mais body peint maintenant son propre carré rose. Il couvre le cadre sous les bras du chevron : 4 872 pixels changent.

### 4. La boîte de body

La marge de body est `53 0-53` : 53px en haut, 0 sur les côtés, −53px en bas. En mode quirks, body remplit la boîte de contenu de html moins ses marges verticales. Sa hauteur vaut 140 − (53 − 53) = 140, et sa largeur 140. Je l'ai mesuré : 140 × 140, en (130, 133).

body commence donc 53px sous le haut du trou et finit en y = 273. C'est 53px sous le trou, au-delà de la bordure du bas de html, qui va de y = 220 à 260.

### 5. Un L

body est visé par les deux règles. La première lui donne la bordure : 40px, pleine, crème (body a la même police de 16px, donc `5ch` vaut encore 40px). La règle imbriquée met ensuite `border-width:40 0 0 40` : 40px en haut, 0 à droite, 0 en bas, 40px à gauche. Il ne reste que deux côtés, et ils forment un L.

### 6. La rotation

`rotate:45deg` tourne body autour de son centre. L'origine par défaut est le milieu de sa boîte : (130 + 70, 133 + 70) = (200, 203). La rotation va dans le sens des aiguilles d'une montre : le coin du L passe en haut.

La pointe extérieure est en 203 − 70√2 = 104, et la pointe intérieure en 203 − 30√2 = 160,6. J'ai mesuré la boîte tournée : de (101, 104) à (299, 302). Ses coins des côtés, en x = 101 et 299, tombent dans les bordures des côtés de html, qui vont de 90 à 130 et de 270 à 310. Crème sur crème, ils ne se voient pas. Les bords extérieurs des bras touchent les côtés du trou en y = 174. Le coin du bas est en y = 302, 2px hors du canevas.

### 7. Le triangle

L'intérieur de body est transparent : son fond est parti sur le canevas. Sous le chevron, on voit trois choses à travers, de haut en bas.

De la pointe intérieure, en y = 160,6, jusqu'à y = 220, c'est le canevas rose, vu par le trou de html. Les bords intérieurs des bras arrivent en y = 220 en x = 140,6 et 259,4 : c'est le triangle. De y = 220 à 260, c'est la bordure crème du bas de html. Sous y = 260, c'est de nouveau le canevas rose, le même que tout autour.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule déclaration de bordure pour deux boîtes. Elle donne à html tout son cadre, et à body le style et la couleur du chevron. body n'a besoin que de `border-width` pour retirer deux côtés.
- `5ch` fait 40px en 3 caractères. Le raccourci `border` n'accepte pas de nombres seuls, même en mode quirks : avec `border:40 solid#F3EAD2` (116 caractères), le navigateur ignore toute la déclaration sur les deux boîtes. Plus de cadre, plus de chevron : le canevas est tout rose. 36 788 pixels changent. `40px` donne la même image en 118 caractères.
- `border-width`, lui, accepte les nombres seuls en mode quirks : `40 0 0 40` n'a besoin d'aucune unité.
- Le `-53` annule le `53` dans la hauteur de body. Avec `margin:53 0` (114 caractères), la hauteur de body vaudrait 140 − 106 = 34px, moins que sa bordure du haut de 40px. body n'est alors que cette bordure, haute de 40px, et il devient une barre en diagonale. html grandit à 226px de haut autour de lui. 9 498 pixels changent.
- Pas d'espace avant le signe moins : `53 0 -53` donne la même image en 118 caractères.
- Le fond est dans la règle imbriquée : html n'en a pas, et celui de body passe au canevas. Dans la première règle (même longueur), html le reçoit aussi, et body peint son propre carré rose : j'obtiens la même image qu'avec la vérification `html{background:#CF596A}` plus haut, et 4 872 pixels changent.
- `rotate:45deg` est la forme courte. `transform:rotate(45deg)` donne la même image en 128 caractères.
- Pas d'espace avant le `#` : `solid #F3EAD2` donne la même image en 118 caractères.
- L'imbrication garde la seconde règle loin de html. `}body{` à la place de `;*{` donne la même image en 120 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 378 pixels, avec la même règle que dans les notes de golf, de 108 au plus. Tous sont sur les quatre bords en biais du chevron : 140 sur les bords extérieurs, 238 sur les bords intérieurs. Les aplats et les bords droits sont identiques. Mon rendu adoucit ces bords en biais avec plus de nuances intermédiaires : 13 couleurs en tout, contre 4 dans la cible. Le juge de CSS Battle donne au code 100 % de correspondance.
