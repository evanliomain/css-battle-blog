---
title: "Un reflet dans un reflet : un cadre et quatre pilules en 158 caractères"
lang: fr
ref: 2026-10-24
permalink: /fr/2026/10/24/un-reflet-dans-un-reflet/
description: "Comment la bordure de html, un body sans largeur et un p posé hors du canevas, reflétés deux fois par -webkit-box-reflect, dessinent la cible CSS Battle du 24 octobre 2026."
target: /assets/targets/2026-10-24.png
target_url: https://cssbattle.dev/play/aX2gsaI5uRiBiKxXgfOp
colors: ["#ddbd", "#5065ab"]
player: levito
chars: 158
score: 688.73
match: 100
code: |
  <p>   <style>*{margin:25%60;border:2.5ch solid#DDBD;border-radius:9q;background:#5065AB;p{margin:50 70}*{margin:-50 280;-webkit-box-reflect:left 80vw;font:9q'
---

La cible du 24 octobre est un cadre beige aux coins arrondis sur un fond bleu lavande, avec deux petites pilules dedans et deux grandes dehors. Veit Lehmann dessine le cadre avec la bordure de `html`, et seules deux des quatre pilules existent vraiment comme boîtes : l'une d'elles est même hors du canevas. Deux miroirs `-webkit-box-reflect`, l'un dans l'autre, mettent tout en place.

{% include animations/2026-10-24.html lang=page.lang %}

## Le code, aéré

```css
<p>   <style>
* {                          /* html (et tout le reste) */
  margin: 25% 60;
  border: 2.5ch solid #DDBD;
  border-radius: 9q;
  background: #5065AB;
  p { margin: 50 70 }        /* le p : plus précis que * */
  * {                        /* body, p (head et style restent cachés) */
    margin: -50 280;
    -webkit-box-reflect: left 80vw;
    font: 9q '';             /* la chaîne se ferme à la fin du fichier */
  }
}
```

## Comment ça marche

### 1. html est le cadre

Le `*` extérieur touche `html`. Son fond bleu part sur le canevas. `margin:25%60` donne 100px en haut et en bas (une marge en pourcentage se calcule sur la largeur : 25 % de 400) et 60px sur les côtés.

CSS Battle affiche la page en mode quirks, où `html` remplit la page moins ses marges : une boîte de 280 × 100 en (60, 100). Sa bordure vaut `2.5ch`, et `1ch` fait 8px avec la police par défaut de 16px : 20px. Cette bordure, c'est le cadre.

Le rayon `9q` fait 8,5px (1q est un quart de millimètre, 0,945px). La bordure est plus épaisse que le rayon, donc les coins intérieurs restent carrés, comme dans la cible.

### 2. Un beige transparent

`#DDBD`, c'est `#DDDDBB` avec une opacité de `DD`, environ 87 %. Toutes les bordures de cette solution sont peintes sur du bleu : le canevas derrière la bordure de `html`, et le fond bleu de chaque boîte derrière les autres (par défaut, un fond passe sous la bordure). Ce beige à 87 % sur `#5065AB` donne environ `#cacdb9`, le beige de la cible. La couleur à 4 chiffres a 3 caractères de moins que l'opaque.

### 3. body est la grande pilule de droite

Le `*` imbriqué touche tous les éléments dans `html` : `body`, le `p`, et `head` et `style`, qui restent cachés. Pour `body` :

- `margin:-50 280` : la boîte de contenu de `html` fait 240px de large, et 280 + 280, c'est plus. La largeur tombe à 0, et le body commence 280px plus loin, en x = 360.
- `font:9q'` passe la police à 9q, environ 8,5px. `2.5ch` suit la police : la bordure ne fait plus que 10px. Sans largeur de contenu, les bordures gauche et droite se touchent : une boîte de 20px de large.
- En mode quirks, le body remplit les 60px de hauteur de contenu de `html` moins ses marges : 60 + 50 + 50 = 160px, de y = 70 à y = 230.

C'est la grande pilule de droite.

### 4. Le p est hors du canevas

Le `<p>` vient en premier dans le code, donc il est dans `body`. `p{margin:50 70}` est imbriqué dans `*`, il se lit donc `* p`, plus précis que `* *` : ses marges l'emportent. 70px à droite du contenu du body, ça le place en x = 440, hors du canevas de 400px. Il fait 20px de large comme le body, et 40px de haut sur le juge de CSS Battle.

### 5. Le reflet du p est la petite pilule de gauche

`-webkit-box-reflect:left 80vw` dessine une copie en miroir d'une boîte sur sa gauche, avec un écart de 80vw (320px). Le miroir est au milieu de cet écart.

Pour le `p`, en x = 440, le miroir est en 440 − 160 = 280. Son reflet tombe de x = 100 à 120 : la petite pilule de gauche, dans le cadre.

### 6. Le reflet du body recopie tout le reste

Le `body` a le même reflet. Son miroir est en 360 − 160 = 200, au milieu du canevas. Un reflet recopie la boîte et tout ce qui est peint dedans :

| Quoi | Où il est | Où tombe sa copie |
| --- | --- | --- |
| `body` | x = 360 | x = 20 : grande pilule de gauche |
| `p` | x = 440 | x = −60 : hors du canevas |
| le reflet du p | x = 100 | x = 280 : petite pilule de droite |

La petite pilule de droite est donc le reflet d'un reflet.

## Notes de golf

- `#DDBD` sur son propre fond bleu remplace une couleur opaque de 7 caractères.
- `2.5ch` vaut 20px sur `html` et 10px sous `font:9q'` : une seule bordure, deux épaisseurs.
- Une boîte sans largeur avec 10px de bordure de chaque côté fait une pilule de 20px, sans aucun `width`.
- Un seul reflet sur `*` sert au `body` et au `p`.
- `font:9q'` ouvre une chaîne et ne la ferme jamais : à la fin du fichier, le navigateur la ferme gratuitement. Ça doit être la toute dernière chose du code.
- `25%60` et `solid#DDBD` n'ont pas besoin d'espace.

## Si vous l'essayez chez vous

CSS Battle note les solutions avec son propre Chrome, plus ancien. Dans le dernier Chrome (la version 156 au moment où j'écris), le `<p>` n'a aucune hauteur de contenu : il ne contient que trois espaces, qui disparaissent, et le `<style>` caché. Il fait donc 20px de haut, juste ses deux bordures, et les deux petites pilules sortent en carrés de 20 × 20 aux coins arrondis au lieu de pilules de 20 × 40. Sur le juge de CSS Battle, les pilules font 40px de haut et la correspondance est de 100 %. L'animation ci-dessus suit la cible.

Autre piège : si vous enregistrez le code dans un fichier, n'ajoutez pas de retour à la ligne à la fin. La chaîne `'` le contiendrait, une chaîne ne peut pas contenir de retour à la ligne, et toute la déclaration `font` saute : les bordures restent à 20px partout.
