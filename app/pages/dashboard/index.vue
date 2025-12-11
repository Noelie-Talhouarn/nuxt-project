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
const cookie = useCookie<string | null>('recipe_token')

/* ============= 1) PROFIL UTILISATEUR ============= */

type UserApiResponse = ApiResponse<User>

const {
  data: userResponse,
  refresh: refreshUser
} = await useAsyncData<UserApiResponse | null>('user-profile', async () => {
  if (!cookie.value) return null

  return await $fetch<UserApiResponse>(
    `${config.public.apiUrl}/api/users/profile`,
    {
      headers: { Authorization: `Bearer ${cookie.value}` }
    }
  )
})

const user = computed<User | null>(() => {
  if (!userResponse.value?.data) return null
  return userResponse.value.data
})

const isLoggedIn = computed(() => !!user.value)

/* ============= 2) RECETTES UTILISATEUR ============= */

const {
  data: myRecipes,
  refresh: refreshMyRecipes
} = await useAsyncData<{ data: Recipe[] }>('my-recipes', () => {
  const token = cookie.value
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: { Authorization: `Bearer ${token}` }
  })
})

const userRecipes = computed(() => myRecipes.value?.data || [])

const filters = ref<string[]>([])
const search = ref('')

const filteredUserRecipes = computed(() => {
  if (!userRecipes.value) return []

  let results = userRecipes.value

  if (filters.value.length) {
    results = results.filter(recipe =>
      filters.value.includes(recipe.cuisine_name)
    )
  }

  if (search.value.trim().length) {
    const keyword = search.value.toLowerCase()
    results = results.filter(recipe =>
      recipe.title.toLowerCase().includes(keyword)
    )
  }

  return results
})

/* ============= 3) CUISINES ============= */

const { data: cuisines } = await useAsyncData('cuisines', async () => {
  const { data } = await $fetch<ApiResponse<Cuisine[]>>(
    `${config.public.apiUrl}/api/cuisines`
  )
  return data
})

/* ============= 4) FORMULAIRES ============= */

const showForm = ref(false)
const showEditForm = ref(false)

function openForm () {
  showForm.value = true
}

function closeForm () {
  showForm.value = false
}

function openEditProfilForm () {
  showEditForm.value = true
}

function updateUserLocally (newUser: User) {
  if (userResponse.value) {
    userResponse.value = {
      ...userResponse.value,
      data: newUser
    }
  }
  showEditForm.value = false
}
</script>

<template>
  <section>
    <div class="dashboard-user">
      <div v-if="isLoggedIn && user">
        <MyTitle as="h1" size="large" class="dashboard-user__title">
          Mon profil
        </MyTitle>

        <div class="dashboard-user__info">
          <p class="dashboard-user__field">Prénom : {{ user.first_name }}</p>
          <p class="dashboard-user__field">Nom : {{ user.last_name }}</p>
          <p class="dashboard-user__field">
            Nom d'utilisateur : {{ user.username }}
          </p>
          <p class="dashboard-user__field">Email : {{ user.email }}</p>
        </div>
      </div>

      <div class="dashboard-user__actions">
        <MyButton v-if="!showForm" @click="openForm">
          Créer une recette
        </MyButton>

        <MyButton v-if="!showEditForm" @click="openEditProfilForm">
          Modifier le profil
        </MyButton>

        <MyButton @click="onLogoutClick">
          Se déconnecter
        </MyButton>
      </div>

      <!-- Formulaire édition profil -->
      <EditProfileForm
        v-if="showEditForm && user"
        :user="user"
        @updated="updateUserLocally"
        @close="showEditForm = false"

      />

      <!-- Formulaire création recette -->
      <AddRecipiesForm
        v-if="showForm"
        @close="closeForm"
        @created="refreshMyRecipes"
      />
    </div>

    <MyFiltre
      v-if="cuisines"
      :cuisines="cuisines"
      v-model="filters"
      :search="search"
      @update:search="search = $event"
    />

    <div v-if="filteredUserRecipes.length" class="recipes-grid">
      <div
        v-for="recipe in filteredUserRecipes"
        :key="recipe.recipe_id"
      >
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
    padding: rem(15);
    border-radius: rem(10);
  }

  &__field {
    font-size: rem(16);
    color: var(--color-text);
  }

  &__actions {
    display: flex;
    gap: rem(10);
    margin-top: rem(16);
    flex-wrap: wrap;
  }

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
