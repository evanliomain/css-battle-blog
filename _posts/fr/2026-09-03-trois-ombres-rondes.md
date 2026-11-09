---
title: "Trois ombres rondes : un nuage en 152 caractères"
lang: fr
ref: 2026-09-03
permalink: /fr/2026/09/03/trois-ombres-rondes/
description: "Comment un html rond et invisible, et un body sans hauteur, projettent les ombres qui dessinent la cible CSS Battle du 3 septembre 2026 : un nuage gris devant un soleil pâle."
target: /assets/targets/2026-09-03.png
target_url: https://cssbattle.dev/play/4Vcs99dhGoi89v5nqX2E
colors: ["#3246de", "#dddeeb", "#7f8ae9"]
player: h_blierzt
chars: 152
score: 693.95
match: 100
code: |
  <style>*{background:#3246DE;color:DDDEEB;border-radius:2in;margin:25%75%25%0;box-shadow:50vw 5vw,30vw 0 0 5vw,201q -32q 0-11q#7F8AE9;*{margin:100-9 0 70
---

La cible du 3 septembre est un nuage gris clair sur bleu vif, avec un soleil bleu pâle qui dépasse derrière lui. La solution de H_Bliertz ne dessine rien directement. `html` est un rond bleu sur le canevas bleu : on ne le voit pas, mais ses trois ombres rondes sont les deux lobes du nuage et le soleil. Le `body` n'a aucune hauteur, et pourtant une de ses ombres est assez étalée pour se voir : la base plate du nuage.

Cochez **Couleurs pédagogiques** pour voir l'ombre du `body` en orange.

{% include animations/2026-09-03.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                                    /* html, puis le body */
  background: #3246DE;
  color: DDDEEB;                       /* un hex sans # passe en mode quirks */
  border-radius: 2in;                  /* le plus rond possible */
  margin: 25% 75% 25% 0;
  box-shadow:
    50vw 5vw,                          /* petit lobe */
    30vw 0 0 5vw,                      /* grand lobe, étalé de 20 */
    201q -32q 0 -11q #7F8AE9;          /* le soleil, rétréci de 10,4 */
  * {                                  /* le body */
    margin: 100 -9 0 70;
  }
}
```

## Comment ça marche

### 1. html : un rond invisible

`*` donne à `html` `margin:25%75%25%0`. Une marge en % se calcule sur la largeur : 25 % de 400 = 100 en haut et en bas, 75 % = 300 à droite, 0 à gauche. `html` fait donc 100 de large, de x = 0 à 100, et en mode quirks 300 − 200 = 100 de haut, de y = 100 à 200.

`border-radius:2in` fait 192px, bien plus que la moitié de la boîte : Chrome le réduit à 50, et la boîte est un rond. Son fond est du même bleu que le canevas : on ne voit pas ce rond. Il ne sert qu'à projeter des ombres.

### 2. Deux ombres : les lobes

Une ombre prend la forme de sa boîte : les ombres de `html` sont des ronds aussi. Sans couleur, elles prennent celle du texte : `color:DDDEEB`, un hex sans `#` que le mode quirks accepte.

`50vw 5vw` décale une copie de 200px à droite et 20px vers le bas : un rond de rayon 50 centré en (250 ; 170), le petit lobe. `30vw 0 0 5vw` décale une copie de 120px à droite et l'étale de 20px : un rond de rayon 70 centré en (170 ; 150), le grand lobe. La première ombre de la liste se peint au-dessus : le petit lobe passe devant le grand.

### 3. Une ombre derrière : le soleil

`201q -32q 0-11q#7F8AE9` décale une copie de 189,9px à droite et 30,2px vers le haut, sans flou et avec un étalement négatif de −10,4px. C'est un rond bleu pâle de rayon 50 − 10,4 = 39,6, centré en (239,9 ; 119,8). C'est la dernière ombre de la liste : elle se peint sous les deux lobes, et le soleil dépasse derrière le nuage.

### 4. Le body : la base plate

`*` imbriqué donne au `body` `margin:100-9 0 70`. Dans les 100px de `html`, il commence à 70 de la gauche et sa marge droite fait −9 : il va de x = 70 à 109, sur 39 de large. Il commence 100 plus bas, en y = 200, et en mode quirks il remplit ce qui reste de la hauteur de `html` : rien. Le `body` fait 0 de haut.

Il reçoit les trois mêmes ombres. Une boîte de 0 de haut sans étalement donne une ombre vide, et la troisième rétrécit même. Mais la deuxième ombre est étalée de 20px : elle devient 79 × 40, décalée de 120px à droite, de x = 170 à 249 et de y = 180 à 220, aux bouts ronds grâce au grand rayon. Elle bouche le creux sous les deux lobes : la base plate du nuage.

## Notes de golf

- Trois ombres écrites une fois dessinent sur deux boîtes : deux lobes et le soleil sur `html`, la base sur le `body`.
- `html` est invisible, bleu sur bleu : il ne sert que de forme à ses ombres.
- Une boîte sans hauteur ne montre qu'une ombre étalée : les deux autres disparaissent sur le `body`.
- Un étalement négatif rend le soleil plus petit que la boîte qui le projette.
- `2in` est un « le plus rond possible » bon marché : il arrondit le rond et les bouts de la base.
- Pas d'accolades fermantes, et `<style>` n'est jamais fermé.
