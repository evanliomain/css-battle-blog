---
title: "Un dessin, quatre quarts de tour : un dièse entre quatre carrés en 149 caractères"
ref: 2026-08-25
permalink: /fr/2026/08/25/un-dessin-quatre-quarts-de-tour/
description: "Comment une seule liste de box-shadow, utilisée par html et par quatre éléments imbriqués qu'offset:ray(0deg) tourne d'un quart de tour chacun, dessine le fond vert, le dièse crème et les quatre carrés de la cible CSS Battle du 25 août 2026."
target: /assets/targets/2026-08-25.png
target_url: https://cssbattle.dev/play/G73oyNUHfqrOK7aQqOZR
colors: ["#3e6d43", "#3f6d43", "#e5ca72"]
player: h_blierzt
chars: 149
score: 696.67
match: 100
code: |
  <dl><dl><p><style>*{color:3F6D43;box-shadow:inset 0 9in,484q 0 0 2in#3E6D43,5vh 5ch,65vh 5pc 0 32q;*{width:280;height:30;color:E5CA72;offset:ray(0deg
---

La cible du 25 août, c'est un motif crème sur fond vert : une longue barre verticale, une longue barre horizontale, un petit dièse au milieu et quatre grands carrés dans les coins. Tourné d'un quart de tour, il ne change pas. H_Bliertz s'en sert. Une seule liste de `box-shadow` dessine une barre, un carré et une ligne du dièse. Quatre éléments imbriqués utilisent la même liste, et `offset:ray(0deg)` tourne chacun d'un quart de tour de plus que son parent.

Cochez **Couleurs pédagogiques** pour voir quel élément dessine quoi, et passez en **Vue large** pour voir les ombres qui dépassent du canevas et les ombres vertes qui les coupent.

{% include animations/2026-08-25.html lang=page.lang %}

## Le code, aéré

```css
<dl><dl><p>                  /* body > dl > dl > p : quatre boîtes */
<style>
* {                          /* html (et tout ce qu'il contient) */
  color: 3F6D43;             /* #3F6D43, sans le # */
  box-shadow:
    inset 0 9in,             /* remplit la boîte de sa propre couleur */
    484q 0 0 2in #3E6D43,    /* vert, à 457,32px, étalé de 192px */
    5vh 5ch,                 /* copie décalée de (15 ; 40) */
    65vh 5pc 0 32q;          /* copie décalée de (195 ; 80), étalée de 30,24px */
  * {                        /* head, body, dl, dl, p, style */
    width: 280;
    height: 30;
    color: E5CA72;           /* crème */
    offset: ray(0deg);       /* centré, un quart de tour à gauche */
  }
}
```

## Comment ça marche

### 1. html : une ombre interne pour fond

`*` vise `html` et tous les éléments qu'il contient. `html` remplit le cadre : 400 × 300.

Aucune règle ne pose de fond. C'est la première ombre qui s'en charge : `inset 0 9in` est une ombre interne décalée de 9in = 864px vers le bas. Une ombre interne peint l'intérieur de la boîte, sauf là où une copie de la boîte, décalée, la couvre encore. Ici, la copie est partie à 864px, hors d'une boîte de 300px de haut. Toute la boîte est donc peinte.

L'ombre n'a pas de couleur : elle prend celle du texte, `color:3F6D43`, un hexadécimal sans `#`, que le mode quirks accepte pour `color`. C'est le fond vert.

Les autres ombres de `html` sont des ombres externes. Elles sont peintes hors de sa boîte, donc hors du canevas : on ne les voit jamais.

### 2. body : centré et tourné d'un quart de tour

Le `*` imbriqué vise tous les éléments dans `html`. `head` et `style` ne sont pas affichés. Il reste quatre boîtes, l'une dans l'autre : `body`, `dl`, `dl` et `p`. Chacune fait 280 × 30 (les tailles sans unité marchent en mode quirks) et reçoit la même liste d'ombres. Son `inset 0 9in` la remplit maintenant de crème, puisque `color:E5CA72` est sa couleur de texte.

`offset:ray(0deg)` pose un chemin de mouvement : un rayon qui part du centre du bloc conteneur et pointe vers le haut (0deg). La distance sur ce rayon vaut 0 : la boîte reste au départ, son centre tombe sur le centre de `html`, en (200 ; 150). La boîte s'oriente aussi sur le rayon : son axe x pointe maintenant vers le haut. C'est un quart de tour à gauche.

Le `body` est donc une barre verticale, de x = 185 à 215 et de y = 10 à 290. J'ai mesuré chaque partie en rendant une version où seule cette partie est rouge.

### 3. Deux ombres crème : un carré et une ligne

Les ombres tournent avec la boîte. Dans le `body`, le décalage x d'une ombre part vers le haut, et son décalage y vers la droite.

`5vh 5ch`, c'est (15 ; 40) : 5vh d'un cadre de 300px font 15px, et dans mon Chrome 1ch vaut ici 8px. La copie part de 40px à droite et de 15px vers le haut : une barre de x = 225 à 255 et de y = −5 à 275.

`65vh 5pc 0 32q`, c'est (195 ; 80), avec un étalement de 32q. 1pc = 16px, et 1q, c'est un quart de millimètre, 0,945px : 32q = 30,24px. La copie grandit jusqu'à 90,47 × 340,47 et part de 80px à droite et de 195px vers le haut : de x = 234,76 à 325,24 et de y = −215,24 à 125,24. Elle dépasse du canevas par le haut, de plus de 200px.

Les deux copies se recouvrent de x = 234,76 à 255. Ensemble, elles font un carré de x = 225 à 325,24, et la barre continue vers le bas : c'est la ligne de droite du dièse.

### 4. Une ombre verte coupe le haut

`484q 0 0 2in#3E6D43` est une copie étalée de 2in = 192px et décalée de 484q = 457,32px. Dans le `body`, ça fait 457,32px vers le haut. Son bord du bas est en 150 − 457,32 + 140 + 192 = 24,68.

Les ombres sont peintes dans l'ordre inverse : la première de la liste est au-dessus. Celle-ci vient avant les deux copies crème : elle est peinte par-dessus, en vert. Tout ce qu'elles avaient au-dessus de y = 24,68 disparaît. Le carré en haut à droite va maintenant de y = 24,68 à 125,24.

L'ombre `inset` est peinte dans la boîte, au-dessus de toutes les ombres externes. L'ombre verte ne coupe donc pas la barre du `body` : elle commence toujours en y = 10.

### 5. dl : le même dessin, un quart de tour plus loin

Le `dl` est dans le `body`. Il a les mêmes règles, il fait donc la même chose : il se centre sur son parent et tourne d'un quart de tour à gauche. Son parent est déjà tourné de −90° : le `dl` finit à −180°.

Tout son dessin, c'est celui du `body` tourné de 90° : la barre horizontale (x = 60 à 340, y = 135 à 165), le carré en haut à gauche, la ligne du haut du dièse (y = 95 à 125), et une ombre verte qui couvre tout ce qui est à gauche de x = 74,68.

Chaque élément tourné est peint au-dessus de son parent. L'ombre verte du `dl` passe donc par-dessus ce que le `body` a dessiné à cet endroit. Ici, le `body` n'a rien dessiné de ce côté.

### 6. dl dl et p : le bas et la droite

Le second `dl` finit à −270°, et le `p` à −360°, ce qui revient à ne pas tourner du tout. Chacun refait le même dessin, tourné de 90° de plus :

- le second `dl` : le carré en bas à gauche, la ligne de gauche du dièse (x = 145 à 175), et du vert sous y = 275,32 ;
- le `p` : le carré en bas à droite, la ligne du bas du dièse (y = 175 à 205), et du vert à droite de x = 325,32.

Chacun a aussi sa barre. Elles tombent pile sur celles du `body` et du `dl`. C'est pour ça que les barres restent entières : l'ombre verte du second `dl` traverse la barre verticale en y = 275,32, mais sa propre barre est peinte par-dessus.

### 7. Deux verts

`html` est en `#3F6D43`, les quatre ombres vertes en `#3E6D43`. L'écart est de 1 sur le rouge, trop faible pour se voir.

`html` ne peut pas prendre `3E6D43`. J'ai vérifié : avec `color:3E6D43`, la déclaration est ignorée et le fond sort noir. `3E6…` se lit comme un nombre avec un exposant (3 × 10⁶), et la règle qui permet une couleur sans `#` ne l'accepte pas. Dans `box-shadow`, le `#` est de toute façon nécessaire : sans lui, toute la liste est ignorée.

## Notes de golf

- Une seule liste d'ombres pour cinq éléments. Les ombres sans couleur suivent le `color` de chaque élément : vert sur `html`, crème sur les autres.
- `inset 0 9in` remplit une boîte de sa couleur de texte, et il fait partie de la liste de toute façon : pas besoin de `background`.
- `offset:ray(0deg)` centre chaque élément et le tourne de −90°, en 15 caractères (la parenthèse reste ouverte). L'imbrication additionne les tours : quatre éléments, quatre directions.
- `<dl><dl><p>` : des éléments de bloc qui s'imbriquent. Un second `<p>` fermerait le premier.
- Les ombres vertes coupent ce qui dépasse des grands carrés. Chaque élément coupe les siens : l'ombre verte est écrite avant les ombres crème.
- Des unités choisies pour la longueur : `9in` (864px), `484q` (457,32px), `2in` (192px), `5vh` (15px), `5ch` (40px), `65vh` (195px), `5pc` (80px), `32q` (30,24px).
- `color:3F6D43` et `color:E5CA72` : des hexadécimaux sans `#`, acceptés en mode quirks.
- Pas d'espace dans `2in#3E6D43` : le `#` commence une nouvelle valeur.
- `<style>` n'est jamais fermé, et `ray(0deg` et les deux accolades restent ouverts.

## Si vous l'essayez chez vous

Dans mon Chrome (la version 157 au moment où ces lignes sont écrites), les bords des quatre carrés ne tombent pas sur des pixels entiers. Les ombres vertes s'arrêtent en 24,68, 74,68, 275,32 et 325,32, et les grandes ombres étalées finissent à 0,24px de la grille, en 125,24, 174,76, 175,24 ou 224,76. Ces bords sont fondus sur une rangée ou une colonne de pixels. Par rapport à la cible, 984 pixels diffèrent le long de huit bords droits, plus 88 que mon script de comparaison compte comme de l'anticrénelage. Sur le juge de CSS Battle, le code d'origine est identique à 100 %.
