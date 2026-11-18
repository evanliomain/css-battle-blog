---
title: "Retourné deux fois pour rester en place : deux D en miroir en 225 caractères"
ref: 2026-06-06
permalink: /fr/2026/06/06/retourne-deux-fois-pour-rester-en-place/
description: "Comment une seule liste d'ombres dessine les barres des deux côtés, et comment un p retourné deux fois reste en place, dans la cible CSS Battle du 6 juin 2026."
target: /assets/targets/2026-06-06.png
target_url: https://cssbattle.dev/play/q7qSHC0Frq8QsSEZa6Pg
colors: ["#0d2a58", "#5a9f48", "#d9d9d9"]
player: h_blierzt
chars: 225
score: 646.85
match: 100
code: |
  <dl><p><p><style>&{background:#0d2a58;margin:257 157;*{color:5A9F48;height:230;box-shadow:32q 0,5lh 0 0-5vw;dl,p+p{scale:-1;color:D9D9D9;*{margin:-230-155;border-radius:9in;box-shadow:inset 0 0 0 32q;clip-path:inset(0 0 0 7cm
---

La cible du 6 juin montre deux D dos à dos sur fond bleu nuit. À droite, un D gris avec une barre verte dedans. À gauche, son miroir : un D vert avec une barre grise dedans. Entre les deux, une barre grise et une barre verte. H_Bliertz dessine la moitié droite : des barres vertes avec les ombres de body, et un anneau coupé en D sur un p. dl, retourné avec `scale:-1`, recopie le tout à gauche dans d'autres couleurs. Le second p est retourné une seconde fois : il reste à droite.

Utilisez la **Vue large** pour voir où serait body sans la marge négative, et les **Couleurs pédagogiques** pour distinguer les deux p.

{% include animations/2026-06-06.html lang=page.lang %}

## Le code, aéré

```css
<dl><p><p>
<style>
& {                                /* html */
  background: #0d2a58;             /* peint tout le canevas */
  margin: 257 157;                 /* 86 de large en (157, 257) */
  * {                              /* tout ce qui est dans html */
    color: 5A9F48;                 /* vert, repris par les ombres */
    height: 230;
    box-shadow:
      32q 0,                       /* 32q = 30,24px */
      5lh 0 0-5vw;                 /* 5lh = 90px, -5vw = -20px */
    dl,
    p+p {                          /* dl et le second p */
      scale: -1;                   /* un demi-tour */
      color: D9D9D9;               /* gris */
      * {                          /* les deux p (et style) */
        margin: -230-155;          /* 380 × 230 en (10, 35) */
        border-radius: 9in;        /* ramené à 115px */
        box-shadow: inset 0 0 0 32q;  /* un anneau de 30,24px */
        clip-path: inset(0 0 0 7cm    /* coupe 264,57px à gauche */
```

## Comment ça marche

### 1. Les éléments et les règles

Les pages de CSS Battle n'ont pas de doctype : elles sont en mode quirks. Un nombre seul comme `230` est lu en px, et `color` accepte une couleur hexadécimale sans `#`.

Le parseur construit html > head et body. body contient dl. Le premier `<p>` va dans dl. Le second `<p>` ferme le premier et devient son frère, toujours dans dl. L'élément style se retrouve dans le second p.

Au premier niveau, `&` désigne la racine : html. Le `*{` imbriqué vaut `& *` : tout élément dans html, donc head, body, dl, les deux p et style. Dedans, `dl,p+p` vise dl et le second p (`p+p` est un p juste après un autre p). Le `*{` le plus profond vise tout ce qui est dans dl ou dans le second p : les deux p, et style. head et style ne s'affichent pas. Les règles plus profondes sont plus spécifiques : leur couleur et leur box-shadow l'emportent là où elles s'appliquent. Le premier p n'est pas visé par `dl,p+p` : il garde la couleur verte.

### 2. html

`background:#0d2a58` est posé sur html : il peint tout le canevas. `margin:257 157` place html en (157, 257). Il fait 400 − 2 × 157 = 86 de large. Je l'ai mesuré : 86 de large en (157, 257).

### 3. body et dl remontent

body garde sa marge par défaut de 8px, et reçoit `height:230` de `& *`. Sa boîte serait de 70 × 230 en (165, 265), presque toute sous le canevas. Je l'ai vérifié : avec `margin:0-155` à la place de `margin:-230-155`, body est en (165, 265).

Mais le premier p a une marge de −230 en haut. Rien ne le sépare du haut de dl et de body : ni bordure, ni padding. Les trois marges du haut se fondent donc en une seule. En mode quirks, Chrome ignore la marge par défaut du haut de dl, parce que dl est en haut de body. Il reste 8 − 230 = −222. body remonte en 257 − 222 = 35. J'ai vérifié cette particularité aussi : si je donne moi-même `margin-top:16px` à dl, body redescend en y = 43.

J'ai mesuré body et dl : tous les deux 70 × 230 en (165, 35). Leur centre est (200, 150), le centre du canevas.

### 4. Les ombres de body

body n'a pas de fond. Il ne peint que ses deux ombres. Elles n'ont pas de couleur à elles : elles prennent la `color` de body, le vert.

- `32q 0` décale une copie de la boîte de 32q = 32 × 0,945 = 30,24px vers la droite. Une ombre externe n'est jamais peinte sous sa propre boîte. Il reste une barre de 30,24 × 230, de x = 235 à 265,24.
- `5lh 0 0-5vw` décale une copie de 5lh vers la droite et la réduit de 5vw de chaque côté. Dans mon Chrome, 1lh vaut ici 18px, donc 5lh = 90px. 5vw vaut 5 % de 400 = 20px. La copie fait 70 − 40 = 30 de large et 230 − 40 = 190 de haut : une barre de (275, 55) à (305, 245).

### 5. dl, les mêmes ombres en gris

dl reçoit le même `height:230` et le même `box-shadow` de `& *`. Il a la même boîte que body : il a donc les mêmes deux barres. Mais `dl,p+p` lui donne `color:D9D9D9` : ses barres sont grises. dl est dans body : ses barres sont peintes par-dessus les vertes. Avant le retournement, elles les cacheraient.

### 6. Les anneaux

La règle la plus profonde donne aux deux p `margin:-230-155`. dl fait 70 de large : chaque p fait 70 + 2 × 155 = 380 de large, à partir de x = 10. Avec `height:230`, un p fait 380 × 230 en (10, 35). Le second p ne se place pas sous le premier : la marge de −230 du bas du premier et celle de −230 du haut du second se fondent en une seule de −230. J'ai mesuré les deux p : 380 × 230 en (10, 35).

`border-radius:9in` demande 864px. Ça ne rentre pas : Chrome réduit les rayons jusqu'à ce qu'ils rentrent, à 115, la moitié de la hauteur. Le p est un stade aux bouts ronds. `box-shadow:inset 0 0 0 32q` trace un anneau de 30,24px le long de son bord, à l'intérieur. Le milieu est vide.

`clip-path:inset(0 0 0 7cm)` coupe 7cm = 264,57px à gauche de chaque p. Il ne reste que x ≥ 274,57. Le bout rond de droite a son centre en x = 390 − 115 = 275. Il reste donc la moitié droite de l'anneau : un D, de x = 274,57 à 390.

### 7. Retourné une fois, puis deux

`scale:-1` retourne dl sur les deux axes autour de son centre, (200, 150). Retourner les deux axes revient à faire un demi-tour. Tout ce qui est dans dl tourne avec lui :

- les barres grises de dl passent à gauche : de x = 134,76 à 165, et de (95, 55) à (125, 245) ;
- le premier p est vert et n'a pas de transformation à lui. Son D passe à gauche, de x = 10 à 125,43.

Le second p reçoit lui aussi `scale:-1`, par `p+p`. Son centre est (200, 150), comme celui de dl. Il est tourné une fois par dl et une fois par lui-même : il revient à sa place, un D gris à droite. body n'est pas retourné : ses barres vertes restent à droite.

Les anneaux sont peints après les barres de leur côté. Chaque D couvre les bouts de la barre intérieure : c'est pour ça que les barres paraissent arrondies aux bouts.

## Notes de golf

Ci-dessous, un pixel compte comme changé quand l'un de ses canaux bouge de plus de 8, par rapport à mon rendu du code officiel.

- Une seule liste d'ombres dessine les quatre barres. body et dl ont la même boîte et le même `box-shadow`. dl ne change que sa couleur, et tourne.
- `,p+p` garde le second anneau à droite, en gris, en 4 caractères. Avec `dl{` à la place de `dl,p+p{` (221 caractères), le second p reste vert et tourne avec dl : il se pose sur le premier, à gauche, et le D gris disparaît. 10 404 pixels changent.
- `&` vaut html en 1 caractère. `html{` à la place de `&{` donne la même image en 228 caractères.
- En mode quirks, `color` accepte une couleur hexadécimale sans `#`. `#5A9F48` et `#D9D9D9` donnent la même image en 227 caractères.
- `32q` vaut 30,24px en 3 caractères. Avec `30px` aux deux endroits (227 caractères), 1 002 pixels changent : 460 dans les colonnes x = 134 et x = 265, au bord des barres extérieures, et le reste le long des bords ronds des anneaux.
- `5lh` vaut 90px en 3 caractères. `90px` donne la même image en 226 caractères.
- `-5vw` vaut −20px en 4 caractères. `-20px` donne la même image en 226 caractères.
- `9in` est bien trop grand, et c'est voulu : le rayon est ramené à 115. `115px` donne la même image en 227 caractères.
- `7cm` vaut 264,57px en 3 caractères. Avec `265px` (227 caractères), 124 pixels changent, dans les colonnes x = 125 et x = 274, aux bouts coupés des anneaux.
- Des nombres seuls dans les marges et les hauteurs : `margin:257px 157px` donne la même image en 229 caractères.
- Pas d'espace avant un signe moins : `0-5vw`, `-230-155`.
- Le code s'arrête au milieu de `inset(`. La fin du code ferme la parenthèse, les règles et l'élément style.

## Si vous l'essayez chez vous

Dans mon Chrome, mon rendu du code officiel diffère de la cible sur 1 760 pixels, avec la règle des notes de golf. 117 958 des 120 000 pixels sont identiques. Les écarts sont sur les bords :

- les colonnes x = 134 et x = 265, 230 pixels chacune. Avec `30px` à la place des deux `32q`, ces deux colonnes collent à la cible : les barres extérieures sont 0,24px plus larges que dans la cible ;
- les colonnes x = 125 et x = 274, 62 pixels chacune. Avec `265px` à la place de `7cm`, elles collent : les coupes des anneaux sont à 0,43px de celles de la cible ;
- le reste le long des bords ronds des anneaux.

Le juge de CSS Battle donne au code 100 % de correspondance.
