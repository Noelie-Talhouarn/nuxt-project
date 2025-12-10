
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

const { data: myRecipes } = await useAsyncData<{ data: Recipe[] }>('my-recipes', () => {
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
    <div class="p-dashboard">
      <div v-if="isLoggedIn">
        <h1>Dashboard</h1>
        <p>{{ user.first_name }}</p>
        <p>{{ user.last_name }}</p>
        <p>{{ user.username }}</p>
        <p>{{ user.email }}</p>
        
      </div>
      <MyButton v-if="!showForm" @click="openForm">
        Créer une recette
      </MyButton>

      <AddRecipiesForm
        v-if="showForm"
        @close="closeForm"/>      
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

        <MyCards :recipe="recipe" />
      </div>
    </div>

    <p v-else>Aucune recette pour le moment.</p>


  </section>
</template>