# EditRecipeForm.vue — Utilisation de l’IA

## Contexte
Ce composant a été développé dans un projet **Nuxt 3**.
Il permet à l’utilisateur propriétaire d’une recette de modifier
certaines informations de celle-ci, notamment le titre
et les informations d’allergie.

Le formulaire est affiché depuis la page de détail d’une recette
et communique avec l’API pour effectuer les mises à jour.

---

## Aide de l’IA
L’IA a été utilisée comme **outil d’assistance ponctuelle** pour :
- réfléchir à la structure d’un formulaire d’édition en Nuxt 3
- clarifier la gestion des `props` et des événements `emit`
- comprendre la logique de mise à jour partielle via plusieurs requêtes API
- organiser les classes CSS selon la méthode ABEM


Exemple de prompt utilisé :
"Comment organiser un formulaire d’édition dans Nuxt 3
en mettant à jour uniquement certains champs via une API ?"
"Mon style css est-il bien fais selon la methode ABEM ?"

---

## Travail personnel
- Mise en place du formulaire à partir des données de la recette
- Gestion des modifications conditionnelles (titre / allergie)
- Appels à l’API sécurisés avec authentification par token
- Gestion des erreurs et de l’expérience utilisateur
- Harmonisation des styles avec les autres formulaires du projet

---

## Remarque
L’IA a été utilisée comme aide à la réflexion et au débogage.
Le code final a été compris, adapté et intégré manuellement
dans le projet.
