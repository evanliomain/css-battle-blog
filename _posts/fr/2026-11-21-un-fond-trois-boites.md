---
title: "Un fond, trois boîtes : huit demi-disques en 126 caractères"
lang: fr
ref: 2026-11-21
permalink: /fr/2026/11/21/un-fond-trois-boites/
description: "Comment une seule règle pour tous les éléments, un dégradé radial répété et l'em d'un h1 dessinent la cible CSS Battle du 21 novembre 2026 : huit demi-disques vert foncé sur un fond vert clair."
target: /assets/targets/2026-11-21.png
target_url: https://cssbattle.dev/play/uzoOpbBnY8iXVAKpjzxS
colors: ["#024817", "#90d3a6"]
player: benjamintordjman
chars: 126
score: 720.37
match: 100
code: |
  <h1><style>*{margin:23 2.06em -6in;background:radial-gradient(1q at bottom,#024817 26q,#90D3A6)-3%-99q/74q 50%;*{height:8.75em
---

La cible du 21 novembre montre huit demi-disques vert foncé sur un fond vert clair, le côté plat en bas, sur une grille de 70px : quatre sur la rangée du haut, deux aux bouts de la rangée du milieu, deux au centre de la rangée du bas. Benjamin Tordjman écrit une seule règle pour tous les éléments. `html`, le `body` et un `<h1>` reçoivent les mêmes marges et le même dégradé répété. Comme un `<h1>` écrit deux fois plus gros, son `em` est deux fois plus long : les mêmes nombres donnent trois boîtes différentes, et trois grilles de demi-disques différentes.

La **vue large** montre les demi-disques de `html`, poussés sous le canevas, et le `<h1>` qui sort par le bas. Les **couleurs pédagogiques** montrent quelle boîte peint quoi.

{% include animations/2026-11-21.html lang=page.lang %}

## Le code, aéré

```css
<h1>                                 <!-- un titre vide : son em vaut 32px -->
<style>
* {                                  /* html, le body et le h1 */
  margin: 23 2.06em -6in;            /* 23 en haut, 32,96 ou 65,92 sur les côtés, −576 en bas */
  background: radial-gradient(1Q at bottom, #024817 26Q, #90d3a6) /* un demi-disque de rayon 24,56 */
              -3% -99Q               /* où commence la première tuile */
              / 74Q 50%;             /* tuile : 69,92 de large, la moitié de la boîte en hauteur */
  * {                                /* le body et le h1, pas html */
    height: 8.75em;                  /* 140 sur le body, 280 sur le h1 */
  }
}
```

## Comment ça marche

### 1. Une règle, trois boîtes

`*` vise tous les éléments. Trois sont dessinés : `html`, le `body` et le `<h1>` (`head` et `style` sont cachés). En mode quirks, les nombres sans unité sont des px : `margin:23 2.06em` met 23 en haut et 2,06em à gauche et à droite.

Un em, c'est la taille du texte de l'élément lui-même. Il vaut 16px sur `html` et le `body` : leurs marges de côté font 32,96. Un navigateur écrit un `<h1>` deux fois plus gros, en 32px : ses marges de côté font 65,92. J'ai mesuré les boîtes dans Chrome :

- `html` commence en x = 32,95 et fait 334,09 de large ;
- le `body`, dedans, commence en x = 65,91 et fait 268,19 de large ;
- le `<h1>`, dans le `body`, commence en x = 131,81 et fait 136,38 de large.

`html` commence en y = 23. Le `body` ajoute ses 23 : y = 46. La marge haute du `<h1>` fusionne avec celle du `body` : le `<h1>` commence lui aussi en y = 46.

### 2. `height:8.75em` : 140 et 280

Le `*` imbriqué vise tout élément placé dans un autre : le `body` et le `<h1>`, mais pas `html`, qui n'est dans rien. L'em refait le même travail : 8,75 × 16 = 140 pour le `body`, 8,75 × 32 = 280 pour le `<h1>`. Le `body` va de y = 46 à 186. Le `<h1>` va de y = 46 à 326 : il dépasse du `body` et finit sous le canevas.

### 3. Le fond : un demi-disque par tuile

`radial-gradient(1q at bottom,#024817 26q,#90D3A6)` est un cercle centré au milieu du bord bas de la tuile. Le `1q` sert seulement à en faire un cercle. Le vert foncé va jusqu'à 26q, soit 24,56px. Le vert clair n'a pas de position : il commence juste là, sans transition. Seule la moitié haute du cercle tient dans la tuile : un demi-disque de 49 de large et 24,56 de haut. Le reste de la tuile est vert clair : la tuile est opaque.

`/74q 50%` est la taille de la tuile : 74q = 69,92 de large, et 50 % de la hauteur de la boîte. Ce pourcentage est la clé : chaque boîte a sa hauteur, donc chaque boîte a ses rangées.

### 4. `-6in` : `html` s'étire, et ses demi-disques s'en vont

Le fond de `html` est peint par le canevas, partout, mais ses tuiles restent taillées et placées sur la boîte de `html`. Sans marge basse, `html` ferait 300 − 23 = 277 de haut, ses tuiles 138,5 de haut, et le canevas serait couvert de demi-disques.

La troisième valeur de `margin` est la marge basse : −6in = −576px. En mode quirks, `html` remplit la fenêtre moins ses marges haute et basse : 300 − 23 + 576 = 853. Ses tuiles font alors 426,5 de haut. `-99q` les remonte de 93,54 : la première va de y = 23 − 93,54 = −70,54 à y = 355,96. Ses demi-disques sont posés juste au-dessus de y = 356, sous le canevas, et la rangée d'avant est au-dessus. Sur le canevas, `html` ne peint que du vert clair. Je l'ai vérifié en retirant les deux autres fonds : il ne reste aucun pixel foncé.

### 5. Le `body` : deux rangées de quatre

Le `body` peint le même fond sur sa propre boîte, 268,19 × 140. 50 % font 70 : deux rangées de tuiles y tiennent. Elles commencent en y = 46 − 93,54 = −47,54 : leurs bas tombent en y = 22,46 (au-dessus de la boîte, pas peint), 92,46 et 162,46.

Une position en pourcentage est une part de l'espace libre : la largeur de la boîte moins celle de la tuile, 268,19 − 69,92 = 198,27. −3 % de cela font −5,95 : la première tuile commence en x = 65,91 − 5,95 = 59,96. Quatre tuiles entières se suivent, avec leurs demi-disques centrés en x = 94,92, 164,84, 234,76 et 304,68. C'est la rangée du haut de la cible, et quatre demi-disques sur la rangée du milieu : deux de trop.

### 6. Le `<h1>` repasse sur le `body`

Le `<h1>` peint encore le même fond, sur une boîte de 136,38 × 280. 50 % font maintenant 140 : ses tuiles sont deux fois plus hautes, et leurs bas tombent en y = 92,46 et 232,46. Son espace libre fait 136,38 − 69,92 = 66,46, et −3 % de cela font −1,99 : la première tuile commence en x = 129,82, presque exactement une tuile après la première du `body`. Ses deux demi-disques sont centrés en x = 164,78 et 234,70, à 0,06px de ceux du `body`.

Le `<h1>` est peint après le `body`, et ses tuiles sont opaques. Entre x = 131,81 et 268,19 :

- sur la rangée du haut, il redessine les deux demi-disques du milieu au même endroit ;
- sur la rangée du milieu, sa tuile est vert clair unie à cet endroit : les deux demi-disques du milieu du `body` disparaissent ;
- en y = 232,46, sous le `body`, il ajoute les deux demi-disques de la rangée du bas.

## Notes de golf

- Une seule règle `*` habille `html`, le `body` et le `<h1>`. Le même `background` sert trois fois et s'écrit une fois.
- `em` donne deux longueurs pour un seul nombre : `2.06em` vaut 32,96 ou 65,92, et `8.75em` vaut 140 ou 280. Le `<h1>` n'est là que pour sa taille de texte.
- `50%` dans la taille de la tuile et `-3%` dans la position dépendent de chaque boîte : des tuiles de 70 et de 140, et des décalages de −5,95 et −1,99 qui gardent les colonnes alignées.
- `-6in` en marge basse étire `html` à 853 et envoie ses demi-disques sous le canevas. La même marge sur le `body` et le `<h1>` ne change rien de visible, puisque leur hauteur est fixée.
- La dernière couleur du dégradé n'a pas de position, et le dégradé donne aussi la couleur du fond : pas besoin de `background-color`.
- `-3%-99q/74q` se passe d'espace après `%`, et rien n'est fermé à la fin.

## Si vous l'essayez chez vous

Les côtés plats des demi-disques tombent en y = 92,46, 162,46 et 232,46 : presque sur un demi-pixel. Dans le dernier Chrome (version 157 au moment d'écrire ces lignes), mon rendu local diffère de l'image cible de 328 pixels le long de ces trois lignes, plus les pixels anticrénelés des arcs. Sur le juge de CSS Battle, le code est identique à 100 %.
