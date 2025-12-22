# MyInput.vue — Utilisation de l’IA

## Contexte
Ce composant a été développé dans un projet **Nuxt 3**.
Il s’agit d’un composant de champ de saisie réutilisable,
utilisé dans différents formulaires du site (connexion, inscription,
création et édition de contenu).

Le composant permet :
- l’affichage optionnel d’un label
- la gestion de différents types de champs (`text`, `email`, `password`)
- l’adaptation de la taille du champ via une prop (`size`)
- l’utilisation de `v-model` grâce à `defineModel`

---

## Aide de l’IA
L’IA a été utilisée comme **outil d’assistance ponctuelle** pour :
- clarifier l’utilisation de `defineModel` en Vue 3 / Nuxt 3
- réfléchir à la structure d’un composant de formulaire réutilisable
- vérifier la gestion des classes conditionnelles pour les tailles

prompt utilisé :
"Comment créer un composant input réutilisable en Nuxt 3
avec `defineModel` et différentes tailles ?"
"Mon style css est-il bien fais selon la methode ABEM ?"


---

## Travail personnel
- Création du composant et définition des `props`
- Mise en place de la liaison `v-model` avec `defineModel`
- Gestion conditionnelle des tailles via des classes CSS
- Intégration du composant dans plusieurs formulaires du projet
- Stylisation selon la charte graphique
- Tests et ajustements de l’ergonomie

