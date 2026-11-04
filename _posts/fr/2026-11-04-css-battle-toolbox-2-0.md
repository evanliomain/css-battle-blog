---
title: "CSS Battle Toolbox 2.0 : groupes, captures, règles et un Minify plus malin"
layout: article
kicker: CSS Battle Toolbox
ref: toolbox-2-0
permalink: /fr/2026/11/04/css-battle-toolbox-2-0/
description: "Les nouveautés de CSS Battle Toolbox 2.0 : groupes d'outils de rendu, bouton de capture, règles sur la cible, autocomplétion adaptée et un Minify qui connaît le quirks mode."
cover: /assets/toolbox/2.0/cover.webp
---

[CSS Battle Toolbox](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin) est l'extension Chrome que je développe pour ajouter des outils directement dans la page de la battle sur cssbattle.dev. La version 2.0 est sortie. Elle apporte quatre nouveaux outils, une autocomplétion qui connaît cssbattle, et un Minify qui écrit maintenant un code proche de celui des meilleurs joueurs.

Toutes les captures ci-dessous viennent de la [cible du 3 novembre]({{ '/fr/2026/11/03/une-liste-d-ombres-deux-roles/' | relative_url }}).

## Des groupes d'outils de rendu

Le rendu a six outils : Slide & compare, Difference, Target on output, Grid, Outline et Background. Jusqu'ici, on les activait une case à la fois. Passer de « comparer avec la cible » à « vérifier les contours » demandait trois ou quatre clics.

Désormais, on peut enregistrer des groupes dans les options. Un groupe, c'est un nom et les outils qu'il active.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/options-groups.webp' | relative_url }}" alt="Page d'options : deux groupes, Slide avec Slide & compare activé, et Diff avec Difference activé, chacun avec un aperçu" width="850" height="752" loading="lazy">
  <figcaption>Chaque groupe dans les options, avec un aperçu de ce qu'il affiche.</figcaption>
</figure>

Chaque groupe a un bouton rond à gauche du rendu, avec la première lettre de son nom. Un clic règle tous les outils comme le groupe le dit : ce qu'il demande s'active, le reste se désactive. Le bouton reste allumé tant que les cases correspondent à son groupe, même si on y est arrivé à la main.

Les neuf premiers groupes ont aussi un raccourci : <kbd>Ctrl</kbd> <kbd>1</kbd>, <kbd>Ctrl</kbd> <kbd>2</kbd>… Il marche pendant qu'on tape dans l'éditeur, et aussi sur un clavier AZERTY.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/output-groups.webp' | relative_url }}" alt="Le rendu avec quatre boutons de groupe S, D, T, O à sa gauche ; T est allumé, la cible et la grille sont affichées" width="670" height="441" loading="lazy">
  <figcaption>Le groupe « Target on output » active la cible et la grille d'un coup.</figcaption>
</figure>

## Un bouton de capture

Pour partager un rendu sur Discord, il fallait faire une capture à la main, puis la recadrer. Le nouveau bouton 📷, à gauche des outils de rendu, le fait en un clic.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/screenshot-button.webp' | relative_url }}" alt="Le bouton appareil photo à gauche de l'en-tête du rendu, avec son info-bulle : Screenshot the output" width="479" height="83" loading="lazy">
</figure>

Il prend le rendu tel qu'on le voit, avec les outils actifs, et le panneau DOM en dessous. Les info-bulles et les notifications restent hors de l'image. Dans les options, on choisit ce qu'on en fait : télécharger un PNG, le copier dans le presse-papiers, ou les deux.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/screenshot-result.webp' | relative_url }}" alt="Le PNG produit par le bouton : le rendu avec les contours de html et body, et en dessous le panneau DOM avec leurs tailles et marges" width="400" height="372" loading="lazy">
  <figcaption>Le PNG, ici avec l'outil Outline activé.</figcaption>
</figure>

Pour capturer l'onglet, l'extension a besoin d'une nouvelle permission, « Lire et modifier toutes vos données sur tous les sites Web ». Chrome demande de l'accepter à la mise à jour. La capture n'a lieu que quand on clique sur le bouton, et l'image ne quitte jamais votre ordinateur.

## Des règles sur la cible

Survolez la cible : deux lignes rouges suivent le curseur, et les étiquettes donnent sa position en pixels de la cible, de 0 à 399 et de 0 à 299. Elles sont comptées comme le fait Slide & compare, quelle que soit la taille d'affichage de l'image.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/ruler.webp' | relative_url }}" alt="La cible avec une ligne rouge verticale et une horizontale qui se croisent sur le bord droit de la colonne, étiquetées 224 et 92" width="440" height="397" loading="lazy">
  <figcaption>Le bord droit du haut de la colonne est à x = 224, la première encoche commence vers y = 92.</figcaption>
</figure>

Plus besoin de deviner un bord avec la grille : on le lit.

## Une autocomplétion qui connaît cssbattle

L'autocomplétion de l'éditeur proposait tous les mots-clés CSS. Deux changements la rendent utile pour cssbattle.

**Les couleurs de la cible d'abord.** Partout où CSS accepte une couleur, l'éditeur propose les couleurs de la cible, avec une pastille, et `transparent`. Plus besoin de copier un code hexa depuis le panneau de droite.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/snippet-colors.webp' | relative_url }}" alt="Autocomplétion après background : les deux couleurs de la cible #668884 et #EED9D9 et transparent en premier, puis les fonctions de dégradé" width="520" height="280" loading="lazy">
</figure>

**Seulement les valeurs qui vont.** Pour les propriétés utilisées dans les solutions cssbattle, comme `background`, `border`, `box-shadow`, `clip-path`, `font` ou `rotate`, l'éditeur ne propose que les valeurs valides à l'endroit où on tape. Dans `linear-gradient(`, ce sont les couleurs, `to`, `in` et les angles courants, avec leur valeur en radians. `var()` et `calc()` apparaissent aussi, là où ils ont leur place.

<figure class="shot">
  <img src="{{ '/assets/toolbox/2.0/snippet-gradient.webp' | relative_url }}" alt="Autocomplétion dans linear-gradient( : couleurs de la cible, transparent, in, to, 0deg, 30deg π/6, 45deg π/4" width="620" height="280" loading="lazy">
</figure>

## Un Minify qui connaît le quirks mode

Le bouton Minify enlevait les espaces, et pas grand-chose de plus. En 2.0, il sait ce que cssbattle accepte. CSS Battle tourne en quirks mode : un nombre seul y est lu en pixels, et une couleur peut perdre son `#`. Minify s'en sert maintenant.

Voici une version lisible de la top solution du 3 novembre, en 267 caractères :

<div class="shots">
  <figure class="shot">
    <img src="{{ '/assets/toolbox/2.0/minify-before.webp' | relative_url }}" alt="Le code lisible dans l'éditeur, 267 caractères" width="520" height="423" loading="lazy">
    <figcaption>Avant : 267 caractères.</figcaption>
  </figure>
  <figure class="shot">
    <img src="{{ '/assets/toolbox/2.0/minify-after.webp' | relative_url }}" alt="Le code minifié dans l'éditeur, 157 caractères" width="520" height="192" loading="lazy">
    <figcaption>Après un clic : 157 caractères, exactement la top solution.</figcaption>
  </figure>
</div>

Un clic sur Minify redonne les 157 caractères du code gagnant, à l'octet près. Parmi les nouvelles règles :

| Règle | Avant | Après |
|---|---|---|
| `px` enlevé là où le quirks mode lit un nombre en pixels | `margin:10px 20px` | `margin:10 20` |
| Côtés répétés enlevés | `margin:270 140 -260 140` | `margin:270 140-260` |
| Unité d'un zéro, signes et zéros inutiles | `margin:+5px 01px -0px` | `margin:5 1 0` |
| `#` d'une couleur hexa enlevé dans `color`, `background-color`, `border-color` | `color:#84271C` | `color:84271C` |
| Valeurs par défaut enlevées | `background:red none repeat scroll 0 0` | `background:red` |
| | `border:none` | `border:0` |
| | `translate(10px,0) scale(2,2)` | `translate(10px)scale(2)` |
| `currentColor` enlevé dans `border`, `outline`, `box-shadow` | `border:2px solid currentColor` | `border:2px solid` |
| `calc()` sur des constantes calculé | `width:calc(100px - 10px)` | `width:90` |
| Notation scientifique quand c'est plus court | `width:10000px` | `width:1e4` |
| Unité d'angle la plus courte | `rotate:360deg` | `rotate:1turn` |
| Mot-clé le plus court | `font-weight:bold`, `:nth-child(2n+1)` | `font-weight:700`, `:nth-child(odd)` |
| Guillemets inutiles | `font-family:"Arial"` | `font-family:Arial` |

Minify reste prudent. Il garde `px` dans les raccourcis comme `border` et dans les fonctions, où le quirks mode ne s'applique pas. Il garde le `#` quand la couleur serait lue autrement : 4 ou 8 chiffres, 3 chiffres qui commencent par un chiffre (`1ea` deviendrait `#0001ea`), ou quelque chose comme `1e0`. Il garde les espaces autour de `+` et `-` dans `calc()`, qui en ont besoin. Et il laisse telle quelle une déclaration qui contient un commentaire.

## Et une correction

Hide Submit et Hide Top solution marchent à nouveau. CssBattle écrit maintenant les dates des battles comme `Sep 30, 2026`, et l'extension ne reconnaissait plus la battle du jour.

## L'installer

La mise à jour est sur le [Chrome Web Store](https://chromewebstore.google.com/detail/css-battle-toolbox/emdpbenabkkocjldgifjkciijdmcflin). Chrome l'installe tout seul, puis vous demande d'accepter la nouvelle permission. Le code et le changelog complet sont sur [GitHub](https://github.com/evanliomain/css-battle-toolbox). Un bug ou une idée ? Ouvrez une issue là-bas.
