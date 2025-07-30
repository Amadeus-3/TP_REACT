# TP React Hooks - Application de Gestion de Produits

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useContext) ainsi que la création de Hooks personnalisés.

## Installation et configuration initiale

1. Cloner le dépôt :

```bash
git clone https://github.com/pr-daaif/tp-react-hooks.git
cd tp-react-hooks
```

2. Créer votre propre dépôt sur Github et changer le remote :

```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :

```bash
npm install
```

4. Lancer l'application :

```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :

1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets

#### Objectif : Implémenter une recherche en temps réel

- [X] 1.1 Modifier le composant ProductSearch pour utiliser la recherche
- [X] 1.2 Implémenter le debounce sur la recherche
- [X] 1.3 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_

```
Pour implémenter la recherche en temps réel, j'ai d'abord centralisé l'état du terme de recherche (`searchTerm`) dans le composant `App.js`. J'ai ensuite créé un `SearchContext` pour fournir ce terme et sa fonction de mise à jour aux composants enfants sans avoir à passer des props à travers plusieurs niveaux (prop drilling).

Le composant `ProductSearch` a été modifié pour consommer ce contexte, affichant la valeur de `searchTerm` et la mettant à jour à chaque saisie de l'utilisateur.

Le hook principal, `useProductSearch`, utilise également ce `SearchContext` pour récupérer le `searchTerm`. J'ai modifié son `useEffect` pour qu'il se déclenche à chaque changement du terme de recherche. L'URL de l'API est dynamiquement modifiée pour inclure le paramètre de recherche `q` si un `searchTerm` est présent.

Pour la partie 1.2, j'ai implémenté une technique de "debounce" directement dans le `useEffect` de `useProductSearch` en utilisant `setTimeout` et `clearTimeout`. Cela permet de ne lancer la requête API que 500ms après que l'utilisateur a cessé de taper, optimisant ainsi les appels réseau et améliorant les performances. Le `useEffect` retourne une fonction de nettoyage qui annule le timeout précédent à chaque nouvelle frappe.
```

### Exercice 2 : Context et Internationalisation

#### Objectif : Gérer les préférences de langue

- [X] 2.1 Créer le LanguageContext
- [X] 2.2 Ajouter le sélecteur de langue
- [X] 2.3 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_

```
Pour gérer les préférences de langue, j'ai créé un `LanguageContext` dans `App.js`. Ce contexte est alimenté par un état `language` (initialisé à 'fr') qui est géré par le hook `useState`.

J'ai créé un objet `translations` contenant les chaînes de caractères en français ('fr') et en anglais ('en'). Le `LanguageContext.Provider` expose la langue actuelle, la fonction pour la modifier, et l'objet de traduction correspondant à la langue sélectionnée.

Un nouveau composant `LanguageSelector.js` a été créé. Il s'agit d'un simple bouton qui utilise le `LanguageContext` pour obtenir et modifier la langue. Un clic sur le bouton bascule la langue entre 'fr' et 'en'.

Enfin, les composants `ProductSearch`, `ProductList`, et `ThemeToggle` ont été mis à jour pour utiliser le `LanguageContext` via le hook `useContext`. Ils récupèrent l'objet `translations` du contexte pour afficher dynamiquement le texte dans la bonne langue, rendant l'application entièrement bilingue.
```

### Exercice 3 : Hooks Personnalisés

#### Objectif : Créer des hooks réutilisables

- [X] 3.1 Créer le hook useDebounce
- [X] 3.2 Créer le hook useLocalStorage
- [X] 3.3 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_

```
Pour cet exercice, j'ai créé deux hooks personnalisés réutilisables :

**1. `useDebounce`:**
J'ai créé un fichier `src/hooks/useDebounce.js`. Ce hook accepte une valeur et un délai (`delay`). Il utilise `useState` pour stocker la valeur "débattue" et `useEffect` pour mettre à jour cette valeur seulement après que le délai spécifié se soit écoulé sans que la valeur d'entrée n'ait changé. La logique `setTimeout`/`clearTimeout` de l'exercice 1 a été déplacée dans ce hook, le rendant ainsi abstrait et réutilisable. J'ai ensuite refactorisé le hook `useProductSearch` pour utiliser `useDebounce` sur le `searchTerm`, simplifiant ainsi son code.

**2. `useLocalStorage`:**
J'ai créé un fichier `src/hooks/useLocalStorage.js`. Ce hook permet de synchroniser un état React avec le `localStorage` du navigateur. Il prend une clé (`key`) et une valeur initiale. Il utilise `useState` avec une fonction d'initialisation paresseuse pour lire la valeur depuis `localStorage` au premier rendu. Il retourne la valeur et une fonction de mise à jour (similaire à `useState`), mais cette dernière met également à jour `localStorage` à chaque changement. J'ai intégré ce hook dans `App.js` pour rendre persistants le thème (`isDarkTheme`) et la langue (`language`), afin que les préférences de l'utilisateur soient conservées entre les sessions.
```

### Exercice 4 : Gestion Asynchrone et Pagination

#### Objectif : Gérer le chargement et la pagination

- [X] 4.1 Ajouter le bouton de rechargement
- [X] 4.2 Implémenter la pagination
- [X] 4.3 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_

```
Pour la gestion asynchrone et la pagination, j'ai apporté des améliorations significatives au hook `useProductSearch`.

**1. Bouton de Rechargement :**
J'ai ajouté un état `refetchIndex` au hook `useProductSearch`. J'ai ensuite exposé une fonction `reload` (enveloppée dans `useCallback` pour la stabilité). Cette fonction incrémente simplement `refetchIndex`. En ajoutant `refetchIndex` au tableau de dépendances du `useEffect` principal, toute invocation de `reload` force le re-déclenchement de l'effet et donc un nouvel appel à l'API. Dans `ProductList.js`, j'ai ajouté un bouton qui appelle cette fonction `reload`.

**2. Pagination :**
J'ai ajouté des états pour `currentPage`, `limit` (nombre d'éléments par page), et `total` (nombre total de produits) dans `useProductSearch`. L'URL de l'API a été modifiée pour inclure les paramètres `limit` et `skip` calculés à partir de la page actuelle. L'API retourne maintenant le nombre total de produits, que je stocke pour calculer `totalPages`.

J'ai implémenté les fonctions `nextPage` et `previousPage` qui modifient l'état `currentPage`, avec des gardes pour ne pas dépasser les limites (première et dernière page). Un `useEffect` supplémentaire a été ajouté pour réinitialiser la `currentPage` à 1 chaque fois que le terme de recherche change.

Enfin, le composant `ProductList` a été mis à jour pour afficher les contrôles de pagination (boutons "Précédent", "Suivant" et l'indicateur "Page X sur Y"), en utilisant les états et fonctions fournis par le hook `useProductSearch`. Les boutons sont désactivés de manière conditionnelle lorsqu'on atteint la première ou la dernière page.
```

## Rendu

- Ajoutez l'URL de votre dépôt Github dans  **Classroom** et envoyer la réponse dès le démarage de votre projet.
- Les push doivent se faire au fûr et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran.
- Chaques exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.
