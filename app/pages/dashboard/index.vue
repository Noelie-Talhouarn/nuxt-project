
<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})

function onLogoutClick () {
  const cookie = useCookie('recipe_token')
  cookie.value = null
  navigateTo('/login')
}

const config = useRuntimeConfig()

const {
  data: myRecipes,
  refresh: refreshMyRecipes
} = await useAsyncData<{ data: Recipe[] }>('my-recipes', () => {
  const cookie = useCookie('recipe_token')
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: { Authorization: `Bearer ${cookie.value}` }
  })
})


const userRecipes = computed(() => myRecipes.value?.data || [])
const filteredUserRecipes = computed(() => {
  if (!userRecipes.value) return []

  let results = userRecipes.value

  // --- Filtres cuisines ---
  if (filters.value.length) {
    results = results.filter(recipe =>
      filters.value.includes(recipe.cuisine_name)
    )
  }

  // --- Recherche ---
  if (search.value.trim().length) {
    const keyword = search.value.toLowerCase()
    results = results.filter(recipe =>
      recipe.title.toLowerCase().includes(keyword)
    )
  }

  return results
})


const showForm = ref(false)

function openForm () {
  showForm.value = true
}

function closeForm () {
  showForm.value = false
}

const cookie = useCookie('recipe_token')


const user = computed(() => {
  if (!cookie.value) return null

  try {
    const parts = cookie.value.split('.')
    if (!parts[1]) return null

    return JSON.parse(atob(parts[1]))
  } catch {
    return null
  }
})

// --- Filtrage comme sur la homepage ---
const filters = ref<string[]>([])

const { data: cuisines } = await useAsyncData('cuisines', async () => {
  const { data } = await $fetch<ApiResponse<Cuisine[]>>(
    `${config.public.apiUrl}/api/cuisines`
  )
  return data
})

const search = ref('')


const isLoggedIn = computed(() => !!user.value)

</script>

<template>
  <section>
    <div class="dashboard-user">
      <div v-if="isLoggedIn">
        <MyTitle as="h1" size="large" class="dashboard-user__title">Mon profil</MyTitle>
        <div class="dashboard-user__info">
          <p class="dashboard-user__field">prénom : {{ user.first_name }}</p>
          <p class="dashboard-user__field">nom : {{ user.last_name }}</p>
          <p class="dashboard-user__field">nom d'utilisateur : {{ user.username }}</p>
          <p class="dashboard-user__field">email : {{ user.email }}</p>
        </div>
        
      </div>
      <MyButton v-if="!showForm" @click="openForm">
        Créer une recette
      </MyButton>

      <AddRecipiesForm
        v-if="showForm"
        @close="closeForm" 
        @created="refreshMyRecipes"
      /> 
             
      <MyButton @click="onLogoutClick">Se deconnecter</MyButton>
    </div>
    <MyFiltre
      v-if="cuisines"
      :cuisines="cuisines"
      v-model="filters"
      :search="search"
      @update:search="search = $event"
    />

    <div v-if="filteredUserRecipes.length" class="recipes-grid">
      <div v-for="recipe in filteredUserRecipes" :key="recipe.recipe_id">

        <MyCardsRecipe :recipe="recipe" />
      </div>
    </div>

    <p v-else>Aucune recette pour le moment.</p>


  </section>
</template>

<style lang="scss">
  .dashboard-user {
  padding: rem(20);
  gap: rem(16);

  &__title {
    color: var(--color-secondary);
      padding-left: rem(20);

  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: rem(10);
    background: rgba(255,255,255,0.15);
    padding: rem(15);
    border-radius: rem(10);
  }

  &__field {
    font-size: rem(16);
    color: var(--color-text);
  }

  /* Responsive */
  @media (min-width: 768px) {
    padding: rem(30);

    &__title {
      font-size: rem(32);
    }

    &__info {
      padding: rem(20);
    }
  }
}

</style>