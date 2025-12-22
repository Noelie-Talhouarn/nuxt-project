# MyFiltre.vue — Utilisation de l’IA

## Contexte
Ce composant a été développé dans un projet **Nuxt 3**.
Il permet de filtrer une liste de recettes à l’aide :
- d’un champ de recherche textuel
- d’une liste de filtres par cuisine sous forme de cases à cocher

Le composant est conçu pour être réutilisable
et communique avec son parent via `v-model`.

---

## Aide de l’IA
L’IA a été utilisée comme **outil d’assistance ponctuelle** pour :
- réfléchir à la structure d’un composant de filtres réutilisable
- clarifier la gestion de plusieurs `emit` (`modelValue`, `search`)
- vérifier la logique de mise à jour d’un tableau de filtres
- organiser les classes CSS selon la méthode ABEM


prompt utilisé :
"Comment gérer un composant de filtres avec plusieurs v-model
dans un projet Nuxt 3 (Vue 3) ?"
"Mon style css est-il bien fais selon la methode ABEM ?"

---
## Travail personnel
- Définition des `props` et des événements personnalisés
- Mise en place de la recherche textuelle contrôlée
- Gestion manuelle de l’ajout et suppression des filtres
- Intégration avec un composant parent utilisant `v-model`
- Mise en forme et stylisation selon la charte graphique
- Tests du comportement des filtres en situation réelle
