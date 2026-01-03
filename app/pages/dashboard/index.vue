<script setup lang="ts">

import type { SanityDashboard } from '~/types/api/cms/dashboard'

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


type RecipesApiResponse = { data: Recipe[] }

const token = computed(() => cookie.value ?? '')

const { user, isLoggedIn } = useAuth()


const [
  { data: myRecipes, refresh: refreshMyRecipes },
  { data: cuisines },
  { data: goals },
  { data: diets },
  { data: allergies }
] = await Promise.all([
  useAsyncData<RecipesApiResponse>('my-recipes', async () => {
    return await $fetch<RecipesApiResponse>(`${config.public.apiUrl}/api/recipes/my-recipes`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
  }),

  useAsyncData<Cuisine[]>('cuisines', async () => {
    const res = await $fetch<ApiResponse<Cuisine[]>>(`${config.public.apiUrl}/api/cuisines`)
    return res.data
  }),

  useAsyncData<Goal[]>('goals', async () => {
    const res = await $fetch<ApiResponse<Goal[]>>(`${config.public.apiUrl}/api/goals`)
    return res.data
  }),

  useAsyncData<Diet[]>('diets', async () => {
    const res = await $fetch<ApiResponse<Diet[]>>(`${config.public.apiUrl}/api/diets`)
    return res.data
  }),

  useAsyncData<Allergy[]>('allergies', async () => {
    const res = await $fetch<ApiResponse<Allergy[]>>(`${config.public.apiUrl}/api/allergies`)
    return res.data
  })
])


// const user = computed<User | null>(() => {
//   if (!userResponse.value?.data) return null
//   return userResponse.value.data
// })

// const isLoggedIn = computed(() => !!user.value)


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
  user.value = newUser
  showEditForm.value = false
}


const { fetchUser } = useAuth()

await fetchUser()


async function deleteAccount () {
  if (!confirm('⚠️ Cette action est irréversible. Votre compte sera définitivement supprimé.\nVoulez-vous continuer ?')) {
    return
  }

  try {
    const token = cookie.value

    await $fetch(`${config.public.apiUrl}/api/users/profile`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    cookie.value = null

    navigateTo('/login')

  } catch (err) {
    console.error(err)
    alert('Impossible de supprimer le compte. Réessayez plus tard.')
  }
}

const DASHBOARD_QUERY = groq`
  *[_type == "pageDashboard"][0]{
    title,
    metaDescription
  }
`

const { data: dashboard } =
  await useLazySanityQuery<SanityDashboard | null>(DASHBOARD_QUERY)

/* ---------- SEO ---------- */
useHead({
  title: dashboard.value?.title ?? 'Dashboard',
  meta: [
    {
      name: 'description',
      content: dashboard.value?.metaDescription ?? ''
    }
  ]
})

</script>

<template>
  <section>
    <div class="dashboard-user">
      <div v-if="isLoggedIn && user">
        <MyTitle as="h1" size="large" class="dashboard-user__title">
          {{dashboard?.title}}
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
        <MyButton  @click="deleteAccount">
          Supprimer mon compte
        </MyButton>
   
      </div>

      <EditProfileForm
        v-if="showEditForm && user"
        :user="user"
        @updated="updateUserLocally"
        @close="showEditForm = false"

      />

      <!-- Formulaire création recette -->
      <AddRecipiesForm  v-if="showForm && goals && cuisines && diets && allergies"
                        :goals="goals" 
                        :cuisines="cuisines" 
                        :diets="diets" 
                        :allergies="allergies"
                        @close="closeForm" 
                        @created="refreshMyRecipes" />

    </div>

    <MyFiltre
      v-if="cuisines"
      :cuisines="cuisines"
      v-model="filters"
      :search="search"
      @update:search="search = $event"
    />

    <div v-if="filteredUserRecipes.length" class="dashboard-user__recipes">
      <MyCardsRecipe 
        v-for="recipe in filteredUserRecipes"
        :key="recipe.recipe_id"
        :recipe="recipe"
      />
      
    </div>

    <p v-else>Aucune recette pour le moment.</p>
  </section>
</template>

<style lang="scss">
.dashboard-user {
  padding: rem(20);
  gap: rem(10);

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
    color: var(--color-primary);
  }

  &__actions {
    display: flex;
    gap: rem(10);
    margin-top: rem(16);
    flex-wrap: wrap;
  }

    &__recipes {
   display: grid;
    grid-template-columns: repeat(2,
        minmax(rem(250), 1fr)); 
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

    &__info {
      padding: rem(20);
    }
  }
}
</style>
