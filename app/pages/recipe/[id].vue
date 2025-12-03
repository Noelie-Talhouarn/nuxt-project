<script setup lang="ts">
const route = useRoute()

const config = useRuntimeConfig()

const { data: recipe, error } = await useAsyncData(
  `recipe-${route.params.id}`,
  async () => {
    const { data } = await $fetch<ApiResponse<fullRecipe>>(
      `${config.public.apiUrl}/api/recipes/${route.params.id}`
    )
    return data
  }
)

if (!recipe.value || error.value) throw new Error('Recipe not found')

const isOwner = computed(() => {
  return recipe.value?.user_id === user.value?.user_id
})

async function deleteRecipe () {
  if (!confirm('Voulez-vous vraiment supprimer cette recette ?')) return

  try {
    const token = useCookie('recipe_token').value
    
    await $fetch(`${config.public.apiUrl}/api/recipes/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Retour au dashboard
    navigateTo('/dashboard')

  } catch (err) {
    console.error(err)
    alert('Impossible de supprimer la recette.')
  }
}

const userCookie = useCookie('recipe_token')

const user = computed(() => {
  if (!userCookie.value) return null

  try {
    const payload = userCookie.value.split('.')[1]
    if (!payload) return null

    return JSON.parse(atob(payload))
  } catch {
    return null
  }
})


useHead({
  title: recipe.value.title,
  meta :[
    { name: 'description',content: recipe.value.description }
  ]
})
</script>

<template>
  <div v-if="recipe" class="recipe-page">
    <section class="recipe-hero">
      <h1 as="h1" size="large">{{ recipe.title }}</h1>
      <p class="recipe-hero__description">{{ recipe.description }}</p>
      <div class="recipe-hero__image-wrapper">
        <NuxtImg
          :src="`/recipes/` + recipe.image_url"
          alt="Image de recette"
          width="1200"
          height="800"
          class="recipe__image"
        />
      </div>
    </section>

    <section class="recipe-content">
      <div>
        <p class="recipe-content__text">Cuisine : {{ recipe.cuisine_name }}</p>
        <p class="recipe-content__text">Objectif : {{ recipe.goal_name }}</p>
        <p class="recipe-content__text">Régime : {{ recipe.diet_name }}</p>
        <p class="recipe-content__text">Allergie : {{ recipe.allergy_name }}</p>

        <h2 class="recipe-content__subtitle">Instructions</h2>
        <ul class="recipe-content__instructions">
          <li 
            v-for="(instruction, index) in recipe.instructions" 
            :key="index"
            class="recipe-content__instruction"
          >
            <strong>{{ instruction.step_number }}.</strong> {{ instruction.description }}
          </li>
        </ul>
      </div>
      <aside class="recipe-aside">
        <div class="recipe-aside__card">
          <h3 class="recipe-aside__title">Ingrédients</h3>
          <ul class="recipe-aside__list">
            <li 
              v-for="(ingredient, index) in recipe.ingredients" 
              :key="index"
              class="recipe-aside__item"
            >
              {{ ingredient.quantity }} {{ ingredient.unit }} — {{ ingredient.name }}
            </li>
          </ul>
        </div>
      </aside> 
      <MyButton 
        v-if="isOwner" 
        class="delete-btn"
        @click="deleteRecipe"
      >
        Supprimer la recette
      </MyButton>

    </section>
  </div>
</template>

<style lang="scss">

.recipe-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: rem(20);
}

.recipe-hero {
  text-align: center;
  margin-bottom: rem(40);

  &__title {
    font-size: rem(40);
    font-weight: 800;
    margin-bottom: rem(10);
    color: var(--color-secondary);
  }

  &__description {
    max-width: 700px;
    margin: 0 auto rem(30) auto;
    font-size: rem(18);
    color: var(--color-primary);
  }

}

.recipe-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: rem(40);
  margin-top: rem(40);

  &__main {
    color: var(--color-primary);
    font-size: rem(17);
    line-height: 1.6;
  }

  &__subtitle {
    margin-top: rem(30);
    font-size: rem(26);
    font-weight: 700;
    color: var(--color-primary);
  }

  &__instructions {
    margin-top: rem(10);
    padding-left: rem(10);
    display: flex;
    flex-direction: column;
    gap: rem(12);
  }

  &__instruction {
    color: var(--color-text-btn);
    background: var(--color-secondary);
    padding: rem(12) rem(16);
    border-radius: rem(8);
    border: 1px solid var( --color-secondary);
  }
}

.recipe-aside {
  &__card {
    background: var(--color-secondary);
    padding: rem(20);
    border-radius: rem(14);
    border: var(--color-secondary);
  }

  &__title {
    font-size: rem(20);
    font-weight: 700;
    margin-bottom: rem(16);
    color: var( --color-text-btn);
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: rem(10);
  }

  &__item {
    padding: rem(10) rem(12);
    border-radius: rem(8);
    background: var( --color-text-btn);
    border: 1px solid var( --color-text-btn);
  }
}

</style>
