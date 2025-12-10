<script setup lang="ts">
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
    <h1>HP</h1>
    <MyButton href="/about" variant="purple">button</MyButton>
    <MyButton href="/about" variant="transparent">button</MyButton>
    <MyButton href="/about" size="small">button</MyButton>
    <MyButton href="/about" size="medium">button</MyButton>
    <MyButton href="/about" size="large">button</MyButton>
    <MyButton
      @click-and-hover="
        () => {
          console.log('Button Clicked');
        }
      "
    >button</MyButton
    >
    <div v-if="home">
      <MyTitle as="h1">{{ home.hero?.title }}</MyTitle>
      <p>{{ home.hero.subtitle }}</p>
      <img 
        v-if="home.hero.image"
        :src="urlFor(home.hero.image)?.width(550).height(310).url()"
        :alt="home?.title"
        width="550"
        height="310"
      />
    </div>
    

    <!-- <MyTitle as="h1" size="large"> Libérez l'excellence culinaire </MyTitle>
    <MyTitle as="h2" size="medium"> Libérez l'excellence culinaire </MyTitle>
    <MyTitle as="h3" size="small"> Libérez l'excellence culinaire </MyTitle> -->

    <MyForm />
    <MyLoginForm />

    <MyBackroundScroll />
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

  </main>
</template>

<style lang="scss">
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;  // centre horizontalement
  align-items: center;      // optionnel : centre verticalement
  gap: 10px;
  margin: 2rem 0;
}


</style>