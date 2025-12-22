# MyTitle.vue — Utilisation de l’IA

## Contexte
Ce composant a été développé dans un projet **Nuxt 3**.
Il s’agit d’un composant de titre réutilisable permettant
d’unifier l’affichage des titres dans l’ensemble du site.

Le composant permet :
- de choisir dynamiquement le niveau du titre (`h1`, `h2`, `h3`)
- d’adapter la taille du texte selon le contexte
- d’assurer une cohérence typographique globale

---

## Aide de l’IA
L’IA a été utilisée comme **outil d’assistance ponctuelle** pour :
- réfléchir à la structure d’un composant typographique réutilisable
- clarifier l’utilisation du composant dynamique `<component :is="...">`
- vérifier l’organisation des variantes de tailles via des classes CSS

prompt utilisé :
"Comment créer un composant de titre réutilisable en Nuxt 3
avec un tag dynamique et plusieurs tailles ?"
"Mon style css est-il bien fais selon la methode ABEM ?"


---

## Travail personnel
- Définition des `props` pour le choix du tag HTML et de la taille
- Mise en place du composant dynamique avec `<component>`
- Création des variantes de tailles responsives en SCSS
- Intégration du composant dans l’ensemble des pages du projet
- Ajustements typographiques selon la charte graphique
