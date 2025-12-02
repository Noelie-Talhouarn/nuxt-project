<script setup lang="ts">
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

function onCheckboxInput ($event: Event) {
  const target = $event.target
  if (!(target instanceof HTMLInputElement)) return
  page.value = 1
  const value = target.value
  if (!filters.value.includes(value)) {
    filters.value.push(value)
  } else {
    const index = filters.value.findIndex(
      (filterValue) => filterValue === value
    )
    filters.value.splice(index, 1)
  }
}

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

    <MyTitle as="h1" size="large"> Libérez l'excellence culinaire </MyTitle>
    <MyTitle as="h2" size="medium"> Libérez l'excellence culinaire </MyTitle>
    <MyTitle as="h3" size="small"> Libérez l'excellence culinaire </MyTitle>

    <MyForm />
    <MyLoginForm />

    <MyBackroundScroll />

    <MyCards
      image="https://example.com/chicken.jpg"
      title="Savory Herb-Infused Chicken"
      description="Indulge in the rich and savory symphony of flavors with our Savory Herb-Infused Chicken"
      details="40 MIN • EASY PREP • 3 SERVES"
      button-text="voir la recette"
    />
    <input v-model="search" type="text">
    <div class="pages">
      <span
        v-for="n in totalPages"
        :key="`page-${n}`"
        @click="onPageClick(n)"
      >{{ n }}</span
      >
    </div>
    <div class="recipes-filters">
      <div
        v-for="(cuisine, index) in cuisines"
        :key="index"
        class="recipes-filters__item"
      >
        <input
          :id="cuisine.name"
          type="checkbox"
          :value="cuisine.name"
          @input="onCheckboxInput"
        ><label :for="cuisine.name">{{ cuisine.name }}</label>
      </div>
    </div>
    <p>Liste des recettes :</p>
    <ul>
      <li v-for="(recipe, index) in displayRecipes" :key="index">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">{{
          recipe.title
        }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>
