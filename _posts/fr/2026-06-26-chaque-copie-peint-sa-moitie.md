---
title: "Chaque copie peint sa moitié : quatre carrés en 100 caractères"
ref: 2026-06-26
permalink: /fr/2026/06/26/chaque-copie-peint-sa-moitie/
description: "Comment html et body, deux boîtes vides au centre du canevas, dessinent les mêmes trois box-shadow, et comment scale:-1 retourne la copie de html vers la gauche pendant que celle de body revient à droite, dans la cible CSS Battle du 26 juin 2026."
target: /assets/targets/2026-06-26.png
target_url: https://cssbattle.dev/play/HXrAieeMjNEmOzbRlBIV
colors: ["#222", "#d8f581"]
player: selenit
chars: 100
score: 754.22
match: 100
code: |
  <style>*{margin:37.5%50%;box-shadow:58q -58q 0 58q#222,87q 87q 0 29q#222,3in 0 0 3in#D8F581;scale:-1
---

La cible du 26 juin montre quatre carrés noirs sur un fond vert citron pâle, comme un petit code QR. Deux grands, en haut à droite et en bas à gauche, se touchent par un coin, au centre. Deux petits sont en haut à gauche et en bas à droite. Ilya Streltsyn ne dessine que la moitié droite : un grand carré, un petit carré et un demi-fond vert, sous forme de trois ombres. html et body les dessinent tous les deux, et `scale:-1` retourne la copie de html vers la gauche, tandis que celle de body se retourne deux fois et reste à droite.

Utilisez les **Couleurs pédagogiques** pour distinguer la copie de html de celle de body.

{% include animations/2026-06-26.html lang=page.lang %}

## Le code, aéré

```css
<style>
* {                              /* html, head, style et body */
  margin: 37.5%50%;              /* html : 150px et 200px, body : 0 */
  box-shadow:
    58q -58q 0 58q#222,          /* grand carré, coin sur le centre */
    87q 87q 0 29q#222,           /* petit carré, en bas à droite */
    3in 0 0 3in#D8F581;          /* vert, la moitié droite */
  scale: -1                      /* html se retourne, body revient */
```

## Comment ça marche

### 1. Deux boîtes vides au milieu

`*` vise html, head, style et body. head et style sont masqués : seuls html et body comptent.

Une marge en % est une part de la largeur du bloc conteneur, même pour les marges du haut et du bas. Le bloc conteneur de html est le canevas, large de 400px : `37.5%` font 150px et `50%` font 200px. La boîte de contenu de html fait 400 − 2 × 200 = 0px de large, et rien à l'intérieur ne prend de place. Je l'ai mesurée : une boîte de 0 × 0 en (200, 150), le centre du canevas.

Le bloc conteneur de body est la boîte de contenu de html, large de 0px. Les marges de body valent donc 37,5 % et 50 % de 0 : rien. body est lui aussi une boîte de 0 × 0 en (200, 150).

### 2. Des carrés dessinés par des ombres

Une box-shadow sur une boîte de 0 × 0 est un point. L'étalement en fait un carré deux fois plus large que lui, et le décalage le déplace. 1q est un quart de millimètre, 0,945px.

- `58q -58q 0 58q#222` : 58q font 54,8px. Le carré fait 109,6 × 109,6, poussé de 54,8px à droite et de 54,8px vers le haut. Son coin bas gauche est sur le centre : il va de x = 200 à 309,6 et de y = 40,4 à 150.
- `87q 87q 0 29q#222` : 29q font 27,4px et 87q font 82,2px. Le carré fait 54,8 × 54,8, centré en (282,2, 232,2) : x = 254,8 à 309,6, y = 204,8 à 259,6. Son côté droit est aligné sur celui du grand carré.

### 3. Un demi-fond

Le canevas n'a pas de fond : il est blanc. La troisième ombre, `3in 0 0 3in#D8F581`, apporte le vert. 3in font 288px. L'étalement donne un carré de 576 × 576, et le décalage de 288px le pousse à droite d'exactement la moitié de sa largeur : son bord gauche tombe en x = 200. Il va de x = 200 à 776 et de y = −138 à 438 : il couvre toute la moitié droite du canevas.

La première ombre de la liste est peinte au-dessus. La verte vient en dernier : elle passe sous les deux carrés noirs.

### 4. scale:-1 : html se retourne

`scale:-1` multiplie les deux axes par −1 autour du centre de la boîte, (200, 150). Cela revient à un demi-tour : un point (x, y) va en (400 − x, 300 − y).

Le retournement de html s'applique à tout ce qu'il peint, body compris. À lui seul, il enverrait toutes les ombres dans la moitié gauche.

### 5. scale:-1 : body se remet à l'endroit

body a son propre `scale:-1`, et il est dans html, déjà retourné. Les deux retournements s'annulent : −1 × −1 = 1. La copie de body finit là où elle a été dessinée, à droite.

La copie de html reste retournée, à gauche :

- grand carré : x = 90,4 à 200, y = 150 à 259,6, en bas à gauche ;
- petit carré : x = 90,4 à 145,2, y = 40,4 à 95,2, en haut à gauche ;
- vert : x = −376 à 200, la moitié gauche.

J'ai vérifié les deux moitiés par des rendus. Sans les ombres de body, la moitié gauche (x = 0 à 199) ne change pas et toute la moitié droite devient blanche : 60 000 pixels. Sans les ombres de html, c'est l'inverse.

### 6. L'image

body est peint au-dessus de html. Son vert pourrait couvrir les carrés de html, mais il s'arrête en x = 200, et les carrés de html aussi. Les deux moitiés vertes se rejoignent sur x = 200 et remplissent le canevas. Les deux grands carrés se touchent par un coin, en (200, 150).

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste de trois ombres dessine quatre carrés et tout le fond, car html et body la dessinent tous les deux et `scale:-1` renvoie une copie de l'autre côté du centre. Sans `;scale:-1` (91 caractères), les deux copies restent à droite, la moitié gauche reste blanche, et 60 000 pixels changent.
- `scale:-1` fait un demi-tour en 8 caractères. `rotate:180deg` donne la même image en 105 caractères, et `transform:scale(-1)` en 111.
- Les marges en % font deux choses : 150px et 200px pour html, et 0 pour body, dont le bloc conteneur fait 0px de large. Avec `margin:150px 200px` (103 caractères), body reçoit aussi ces marges et quitte le centre : 41 485 pixels changent.
- Pas besoin d'espace entre `37.5%` et `50%`. Avec l'espace, la même image prend 101 caractères.
- `58q`, `87q` et `29q` valent 54,8px, 82,2px et 27,4px en 3 caractères chacun. En px, les valeurs entières les plus proches, `55px`, `82px` et `27px`, donnent un code de 106 caractères.
- `3in` vaut 288px en 3 caractères. Le vert a seulement besoin d'un étalement de 150px ou plus, pour aller de y = 150 jusqu'en haut et en bas du canevas : `150px` donne la même image en 104 caractères. Avec `149px` (104 aussi), les lignes du haut et du bas restent blanches, et 800 pixels changent.
- Le décalage du vert est égal à son étalement : son bord gauche tombe sur la ligne du centre. Avec `0 0 0 3in#D8F581` (98 caractères), le vert de body est centré sur (200, 150) et couvre les deux carrés de html : 15 235 pixels changent.
- `*` vise html et body en 1 caractère. `html,body` donne la même image en 108 caractères.
- `#222` est la forme courte de `#222222`. La forme longue donne la même image en 106 caractères.
- Pas besoin d'espace avant un `#`. `58q #222`, `29q #222` et `3in #D8F581` donnent la même image en 103 caractères.
- Rien n'est fermé. `}` à la fin donne la même image en 101 caractères.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 1 711 pixels, avec la même règle que dans les notes de golf. 876 d'entre eux sont sur les bords des carrés. 58q font 54,8px, pas 55px : les bords tombent en x = 90,4, 145,2, 254,8 et 309,6, et en y = 40,4, 95,2, 204,8 et 259,6. Ces pixels ne sont couverts qu'en partie et prennent une couleur mélangée, alors que la cible a des bords nets en x = 90, 145, 255 et 310, et en y = 40, 95, 205 et 260. Avec `55px`, `82.5px` et `27.5px` à la place des valeurs en q, exactement ces 876 pixels deviennent unis. Les 835 autres sont dans les aplats, dont 766 à moins de 4px d'un bord : la cible est un JPEG, et ses couleurs y dérivent. Le juge de CSS Battle donne au code officiel 100 % de correspondance.
