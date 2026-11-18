---
title: "Une hauteur lue dans un attribut : quatre personnages en 122 caractères"
ref: 2026-06-03
permalink: /fr/2026/06/03/une-hauteur-lue-dans-un-attribut/
description: "Comment quatre liens vides, deux box-shadow chacun et un attr() avec repli dessinent quatre carrés avec un petit carré au-dessus ou en dessous, dans la cible CSS Battle du 3 juin 2026."
target: /assets/targets/2026-06-03.png
target_url: https://cssbattle.dev/play/17Bc6kIuAsiQgqP65moB
colors: ["#d6c95c", "#2f5a76"]
player: cubachatou
chars: 122
score: 725.05
match: 100
code: |
  <a r=87><a><a r=87><a><style>&{background:#CB3C;color:2F5A76;a{margin:45;box-shadow:3vw 150q 0 37q,3vw attr(r q,214q)0 5vh
---

La cible du 3 juin montre quatre carrés bleu foncé alignés sur un fond jaune moutarde. Chacun a son petit carré : au-dessus, en dessous, au-dessus, en dessous. Vegy la dessine avec quatre éléments a vides. Chaque a est un point avec deux box-shadow : un grand carré et un petit. La hauteur du petit carré vient de `attr()` : les a qui ont `r=87` le mettent au-dessus, les autres prennent le repli `214q` et le mettent en dessous.

Utilisez les **Couleurs pédagogiques** pour distinguer les deux ombres, et les deux sortes de petit carré.

{% include animations/2026-06-03.html lang=page.lang %}

## Le code, aéré

```css
<a r=87><a><a r=87><a>
<style>
& {                           /* html */
  background: #CB3C;          /* rgba(204, 187, 51, 0.8) : #d6c95c sur du blanc */
  color: 2F5A76;              /* sans # : mode quirks */
  a {                         /* & a : les quatre a vides, 0 × 0 chacun */
    margin: 45;               /* 45px à gauche et à droite : x = 53, 143, 233, 323 */
    box-shadow:
      3vw 150q 0 37q,         /* 12px à droite, 141,7px vers le bas, étalement 35px */
      3vw attr(r q,214q)0 5vh /* 87q = 82,2px ou 214q = 202,2px vers le bas, étalement 15px */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `45` est lu en px, et une couleur peut se passer de son `#` dans `color`.

Un a ne peut pas être dans un autre a. Quand l'analyseur trouve `<a>` alors qu'un a est ouvert, il ferme d'abord celui-ci. Les quatre `<a>` donnent donc quatre a frères dans body. L'élément style vient après eux, dans body aussi.

Au premier niveau, `&` désigne la racine : html. Le `a{` imbriqué vaut `& a` : les quatre a.

### 2. Un fond translucide

`#CB3C` est une couleur hexadécimale à 4 chiffres : le quatrième est l'alpha. Elle vaut rgba(204, 187, 51, 0,8). Le fond de html est peint sur tout le canevas, par-dessus du blanc. Les 20 % qui restent laissent voir ce blanc : la couleur visible est #d6c95c. J'ai vérifié : `#d6c95c` à la place de `#CB3C` donne la même image.

### 3. Quatre points

Les a sont vides. Je les ai mesurés : chacun fait 0 × 0, en y = 8, le haut de body.

`margin:45` vaut 45px sur les quatre côtés. Un a est un élément en ligne : ses marges du haut et du bas ne le déplacent pas, seules celles de gauche et de droite le font. Le premier a commence après les 8px de marge de body et ses propres 45px : x = 53. Chaque a suivant est 45 + 45 = 90px plus loin : x = 143, 233 et 323.

### 4. La première ombre

`3vw 150q 0 37q` est une ombre décalée de 3vw = 12px à droite et de 150q = 141,7px vers le bas, avec un flou de 0 et un étalement de 37q = 35,0px. Le flou doit être écrit : l'étalement est la quatrième longueur.

Une ombre part d'une copie de la boîte. Ici, la boîte est un point. L'étalement la grossit de 35px de chaque côté : un carré de 2 × 34,96 = 69,9px. Le premier va de x = 30,0 à 100,0 et de y = 114,8 à 184,7. Les autres sont espacés de 90px.

L'ombre n'a pas de couleur à elle : elle prend la couleur du texte. `color:2F5A76` donne #2f5a76 à html, et les a en héritent.

### 5. Une longueur lue dans un attribut

La seconde ombre est `3vw attr(r q,214q)0 5vh`. `attr(r q)` lit l'attribut r. Le `q` dit comment : la valeur est un nombre, et `q` est son unité. Le premier et le troisième a ont `r=87` : le décalage vaut 87q = 82,2px vers le bas.

L'étalement `5vh` vaut 15px : un carré de 30px. Avec le même décalage de 12px, il va de x = 50 à 80, au-dessus du grand carré : de y = 75,2 à 105,2.

### 6. Le repli

Le deuxième et le quatrième a n'ont pas d'attribut r. `attr()` n'a rien à lire : il prend son repli, `214q` = 202,2px. Leur petit carré passe sous le grand, de y = 195,2 à 225,2.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Des éléments vides suffisent. Un a vide est un point de 0 × 0 : une ombre sans flou est alors un carré deux fois plus large que son étalement. Aucune largeur ni hauteur n'est écrite.
- `<a>` n'a pas besoin de balise fermante : le `<a>` suivant le ferme. Avec `</a>` après chacun, l'image est la même en 138 caractères.
- `attr(r q,214q)` donne les deux hauteurs en une seule déclaration. Avec un r sur les quatre a (`<a r=214>` pour le deuxième et le quatrième, et `attr(r q)`), l'image est la même en 129 caractères. Avec `<a r>`, `214q` à la place de `attr(r q,214q)`, et une seconde règle qui répète toute l'ombre, `}[r]{box-shadow:3vw 150q 0 37q,3vw 87q 0 5vh`, elle est la même en 151 caractères.
- Le repli compte. Sans `,214q` (117 caractères), le deuxième et le quatrième a perdent toute leur box-shadow, grand carré compris : 11 800 pixels changent.
- La couleur n'est écrite qu'une fois : les deux ombres prennent la couleur du texte. `#2F5A76` à la fin de chaque ombre à la place de `color:2F5A76;` donne la même image en 123 caractères. Le `#` absent est une bizarrerie de `color`, et box-shadow ne l'accepte pas : avec `2F5A76` dans chaque ombre (123 caractères), la déclaration est ignorée et aucun carré n'est dessiné. 23 600 pixels changent.
- `#CB3C` fait 5 caractères. La couleur qu'il montre, `#d6c95c`, donne la même image en 124 caractères.
- `margin:45` est un seul nombre pour les quatre côtés, et seuls la gauche et la droite comptent. `margin:0 45px` donne la même image en 126 caractères.
- Des unités courtes : `3vw` vaut 12px en 3 caractères. `12px` deux fois donne la même image en 124 caractères. `150q` vaut 141,7px en 4 caractères : `141.7px` donne la même image en 125. `37q` vaut 34,96px en 3 caractères : `35px` (123 caractères) change 16 pixels.
- Pas d'espace après la `)` de `attr()` : `) 0` donne la même image en 123 caractères.
- `&` vaut html en 1 caractère. `html{` à la place de `&{` donne la même image en 125 caractères.
- Le code s'arrête après `5vh`. La fin du code ferme les règles et l'élément style. Ajouter `}}` donne la même image en 124 caractères.
- Les majuscules ne coûtent rien : `#cb3c` et `2f5a76` donnent la même image à la même longueur.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 800 pixels, avec la règle des notes de golf. Ils sont tous sur six rangées, le long des bords du haut et du bas des carrés : y = 114 et 184 pour les grands carrés, y = 75, 105, 195 et 225 pour les petits.

Dans mon rendu, ces bords tombent entre deux rangées de pixels : les grands carrés vont de y = 114,8 à 184,7, donc les rangées 114 et 184 reçoivent un mélange de bleu et de jaune. Dans la cible, ces bords sont nets. J'ai vérifié : les mêmes carrés calés sur des pixels entiers, avec `<a r=82><a><a r=82><a><style>&{background:#CB3C;color:2F5A76;a{margin:45;box-shadow:3vw 142px 0 35px,3vw attr(r px,202px)0 5vh`, correspondent à la cible sans aucun pixel changé.

Le fond est aussi décalé de 1 sur chaque canal : #d6c95c dans mon rendu, #d5ca5b dans la cible.

Le juge de CSS Battle donne au code 100 % de correspondance.
