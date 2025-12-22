## Convention de nommage des branches, commits et Pull Requests 
Tout au long du projet, le développement a été organisé par fonctionnalités. 
Chaque nouvelle fonctionnalité était développée dans une branche dédiée, nommée avec le préfixe feat, 
suivi du nom de la fonctionnalité. 

### Branches 
La convention suivante a été utilisée : 
- feat/nom-de-la-fonctionnalité 

Exemples : 
- feat/eslint 
- feat/sanity 
- feat/recipes-form 

### Commits 
Les commits ont été nommés de manière descriptive, en fonction des actions réalisées, afin de faciliter la lecture 
et la compréhension de l’historique Git. 
Les commits et Pull Requests reprenaient le nom de la branche associée, sous la forme suivante : 

Exemples : 
- feat(eslint): ajout fichier lint.yml 
- feat(sanity): installation et configuration sanity 
- feat(recipes-form): reception des données dynamiques 

### Pull Requests 
Les Pull Requests comprenaient : 
- une description expliquant les changements apportés 
- des captures d’écran lorsque cela était pertinent, afin d’illustrer visuellement les fonctionnalités développées. 

Cette organisation a permis de garder un suivi clair de l’évolution du projet et de faciliter la compréhension 
des fonctionnalités implémentées.


# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
