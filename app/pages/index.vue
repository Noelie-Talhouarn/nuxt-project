<script setup lang="ts">
import MyTitle from '~/components/MyTitle.vue'
import MyFiltre from '~/components/MyFiltre.vue'
import type { SanityHome } from '~/types/api/cms/home'


const config = useRuntimeConfig()

const [{ data: recipes, error }, { data: cuisines }] = await Promise.all([
  useAsyncData('recipes', async () => {
    const { data } = await $fetch<ApiResponse<Recipe[]>>(
      `${config.public.apiUrl}/api/recipes`
    )
    return data
  }),
  useAsyncData('cuisines', async () => {
    const { data } = await $fetch<ApiResponse<Cuisine[]>>(
      `${config.public.apiUrl}/api/cuisines`
    )
    return data
  })
])

if (error && error.value) throw new Error('Page not found')

const page = ref(1)
const RECIPES_PER_PAGE = 2

const search = ref('')

const filters = ref<Cuisine['name'][]>([])


const filteredRecipes = computed<Recipe[]>(() => {
  if (!recipes.value) return []

  let results = recipes.value

  if (filters.value && filters.value.length) {
    results = results.filter(recipe => filters.value.includes(recipe.cuisine_name))
  }
 
  if (search.value.length) {
    results = results.filter(recipe => {
      return recipe.title.toLowerCase().includes(search.value.toLocaleLowerCase())
    })
  }
  return results
})


const totalPages = computed(() => {
  return Math.ceil(filteredRecipes.value.length / RECIPES_PER_PAGE)
})

const displayRecipes = computed<Recipe[]>(() => {
  if (!filteredRecipes.value) return []
  return filteredRecipes.value.slice(
    (page.value - 1) * RECIPES_PER_PAGE,
    page.value * RECIPES_PER_PAGE
  )
})

function onPageClick (index: number) {
  page.value = index
}

const HOME_QUERY = groq`*[_type == "home"][0]`

const { data: home } = await useLazySanityQuery<SanityHome>(HOME_QUERY)
const { urlFor } = useSanityImage()


// useHead({
//   title: data.value?.title ?? 'Titre du site',
//   meta :[
//     { name: 'description', 
//       content: data.value?.description ?? 'Description du site' 
//     }
//   ]
// })

console.log(home.value)


</script>

<template>
  <main>
    <section 
      v-if="home" 
      class="hero"
      :style="{
        backgroundImage: home?.hero?.image
          ? `url(${urlFor(home.hero.image)?.width(1600).height(800).url()})`
          : 'none'
      }"

    >
      <div class="hero__content">
        <MyTitle as="h1" size="large" class="hero__title">{{ home.hero?.title }}</MyTitle>
        <p class="hero__subtitle">{{ home.hero?.subtitle }}</p>
      </div>
    </section>

    <div v-if="home">
      <MyTitle as="h2" size="medium" class="hero__subtitle2">{{ home.hero?.subtitle2 }}</MyTitle>
      <MyFiltre
        v-if="cuisines"
        :cuisines="cuisines"
        v-model="filters"
        :search="search"
        @update:search="search = $event"
        input-size="large"
      />

      <div class="recipes-grid">
        <div v-for="(recipe, index) in displayRecipes" :key="index">
          <MyCards :recipe="recipe" />
        </div>
      </div>
      <div class="pagination" v-if="totalPages > 1">
        <MyButton
          variant="carousel"
          :disabled="page === 1"
          @click="page--"
        >
          Précédent
        </MyButton>

        <MyButton
          v-for="n in totalPages"
          variant="carousel"
          :key="n"
          :class="{ active: page === n }"
          @click="onPageClick(n)"
        >
          {{ n }}
        </MyButton>

        <MyButton
          variant="carousel"
          :disabled="page === totalPages"
          @click="page++"
        >
          Suivant
        </MyButton>
      </div>
    </div>

  </main>
</template>

<style lang="scss">

.hero {
  position: relative;
  height: rem(400);

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: rem(1);

    @media (min-width: 768px) {
    height: 70vh;
  }

  @media (min-width: 1024px) {
    height: 80vh;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2; // au-dessus de l’image
    color: var(--color-text-btn);
  }

  &__title {
    margin-bottom: rem(2);

  }

  &__subtitle {
    font-size: var(--font-size-text2);
    color: var(--color-text-btn);
    opacity: 0.9;
    margin-top: rem(1);

     @media (max-width: 480px) {
      font-size: rem(14);
    }
  }
     

    &__subtitle2 {
margin-left: rem(17);  
color: var(--color-secondary);
padding: rem(10);
padding-top: rem(20);

@media (max-width: 480px) {
      font-size: rem(30);
    }
}
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(rem(250), 1fr)); // 2 colonnes équilibrées
  gap: rem(20);
  padding-bottom: rem(20);
  margin-top: rem(20);

  /* CENTRER LES 2 COLONNES EN DESKTOP */
  justify-content: center;

  /* Pour éviter que les cards s'étalent trop */
  max-width: rem(900);
  margin-left: auto;
  margin-right: auto;

  /* MOBILE */
  @media (max-width: 600px) {
    grid-template-columns: 1fr;  // 1 card
    justify-items: center;       // centre la card
    max-width: 100%;
  }
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
    flex-wrap: wrap;
  // centre horizontalement
  align-items: center;      // optionnel : centre verticalement
  gap: rem(5);
  margin: 2rem 0;
}


</style>