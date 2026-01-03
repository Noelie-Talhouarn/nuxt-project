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
    results = results.filter((recipe) =>
      filters.value.includes(recipe.cuisine_name)
    )
  }

  if (search.value.length) {
    results = results.filter((recipe) => {
      return recipe.title
        .toLowerCase()
        .includes(search.value.toLocaleLowerCase())
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


useHead({
  title: home.value?.title ?? 'Titre du site',
  meta :[
    { name: 'description',
      content: home.value?.description ?? 'Description du site'
    }
  ]
})

</script>

<template>
  <main>
    <section
      v-if="home"
      class="hero"
      :style="{
        backgroundImage: home?.hero?.image
          ? `url(${urlFor(home.hero.image)?.width(1600).height(800).url()})`
          : 'none',
      }"
    >
      <div class="hero__content">
        <MyTitle as="h1" size="large" class="hero__title">{{
          home.hero?.title
        }}</MyTitle>
        <p class="hero__subtitle">{{ home.hero?.subtitle }}</p>
      </div>
    </section>

    <div v-if="home">
      <MyTitle as="h2" size="medium" class="hero__subtitle2">{{
        home.hero?.subtitle2
      }}</MyTitle>
      <MyFiltre
        v-if="cuisines"
        :cuisines="cuisines"
        v-model="filters"
        :search="search"
        @update:search="search = $event"
        input-size="large"
      />

      <div class="recipes">
        <div v-for="(recipe, index) in displayRecipes" :key="index">
          <MyCardsRecipe :recipe="recipe" />
        </div>
      </div>
      <div class="recipes__pagination" v-if="totalPages > 1">
        <MyButton variant="carousel" :disabled="page === 1" @click="page--">
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
  min-height: rem(360);
  height: 60vh;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: rem(24);

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
    z-index: 2;
    color: var(--color-text-btn);

    max-width: rem(900);
    margin: 0 auto;
    padding: rem(16);
  }

  /* ===== TITRE ===== */
  &__title {
    color: var(--color-text-btn);
    margin-bottom: rem(12);
    font-size: rem(28);
    line-height: 1.2;

    @media (min-width: 480px) {
      font-size: rem(34);
    }

    @media (min-width: 768px) {
      font-size: rem(44);
    }

    @media (min-width: 1024px) {
      font-size: rem(56);
    }
  }

  /* ===== SOUS-TITRE ===== */
  &__subtitle {
    font-size: rem(14);
    line-height: 1.5;
    opacity: 0.9;

    max-width: rem(700);
    margin: 0 auto;

    @media (min-width: 480px) {
      font-size: rem(16);
    }

    @media (min-width: 768px) {
      font-size: rem(18);
    }

    @media (min-width: 1024px) {
      font-size: rem(20);
    }
  }

  /* ===== SOUS-TITRE 2 ===== */
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

.recipes {
  display: grid;
  grid-template-columns: repeat(
    2,
    minmax(rem(250), 1fr)
  ); 
  gap: rem(20);
  padding-bottom: rem(20);
  margin-top: rem(20);
  justify-content: center;

  max-width: rem(900);
  margin-left: auto;
  margin-right: auto;

  /* MOBILE */
  @media (max-width: 600px) {
    grid-template-columns: 1fr; 
    justify-items: center; 
    max-width: 100%;
  }

  &__pagination {
    display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center; 
      gap: rem(5);
      margin:  rem(20) auto;
  }
}

</style>
