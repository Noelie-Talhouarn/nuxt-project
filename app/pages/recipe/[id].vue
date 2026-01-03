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

    navigateTo('/dashboard')

  } catch (err) {
    console.error(err)
    alert('Impossible de supprimer la recette.')
  }
}


const { user } = useAuth()


function updateRecipeLocally (newRecipe: fullRecipe) {
  recipe.value = newRecipe
}

const showEditRecipeForm = ref(false)


useHead({
  title: recipe.value.title,
  meta :[
    { name: 'description',content: recipe.value.description }
  ]
})
</script>

<template>
  <div v-if="recipe" class="recipe">
    <section class="recipe__hero">
      <MyTitle as="h1" size="large">{{ recipe.title }}</MyTitle>
      <p class="recipe__hero-description">{{ recipe.description }}</p>
      <div class="recipe__hero-image-wrapper">
        <NuxtImg
          :src="`/recipes/` + recipe.image_url"
          alt="Image de recette"
          width="1200"
          height="800"
          class="recipe__hero-image"
        />
      </div>
    </section>

    <section class="recipe__content">
      <div>
        <p class="recipe__content-text">Cuisine : {{ recipe.cuisine_name }}</p>
        <p class="recipe__content-text">Objectif : {{ recipe.goal_name }}</p>
        <p class="recipe__content-text">Régime : {{ recipe.diet_name }}</p>
        <p class="recipe__content-text">Allergie : {{ recipe.allergy_name }}</p>

        <h2 class="recipe__content-subtitle">Instructions</h2>
        <ul class="recipe__content-instructions">
          <li 
            v-for="(instruction, index) in recipe.instructions" 
            :key="index"
            class="recipe__content-instruction"
          >
            <strong>{{ instruction.step_number }}.</strong> {{ instruction.description }}
          </li>
        </ul>
      </div>
      <aside class="recipe__aside">
        <div class="recipe__aside-card">
          <h3 class="recipe__aside-title">Ingrédients</h3>
          <ul class="recipe__aside-list">
            <li 
              v-for="(ingredient, index) in recipe.ingredients" 
              :key="index"
              class="recipe__aside-item"
            >
              {{ ingredient.quantity }} {{ ingredient.unit }} — {{ ingredient.name }}
            </li>
          </ul>
        </div>
      </aside> 
      <MyButton 
        v-if="isOwner" 
        class="recipe__delete"
        @click="deleteRecipe"
      >
        Supprimer la recette
      </MyButton>
      <MyButton 
        v-if="isOwner" 
        @click="showEditRecipeForm = true"
      >
        Modifier la recette
      </MyButton>
 
      <EditRecipeForm
        v-if="showEditRecipeForm && recipe"
        :recipe="recipe"
        @updated="updateRecipeLocally"
        @close="showEditRecipeForm = false"
      />


    </section>
  </div>
</template>

<style lang="scss">

.recipe {
  width: 100%;
  max-width: rem(1200);
  margin: 0 auto;
  padding: rem(16);

  @media (min-width: 768px) {
    padding: rem(32);
  }

  @media (min-width: 1024px) {
    padding: rem(48);
  }

  /* ================= HERO ================= */
  &__hero {
    text-align: center;
    margin-bottom: rem(32);
  }

  &__hero-description {
    max-width: rem(700);
    margin: 0 auto rem(24);
    font-size: rem(14);
    color: var(--color-primary);

    @media (min-width: 768px) {
      font-size: rem(16);
    }
  }

  &__hero-image-wrapper {
    width: 100%;
  }

  &__hero-image {
    width: 100%;
    height: auto;
    border-radius: rem(12);
    display: block;
  }

  /* ================= CONTENT ================= */
  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: rem(24);

    @media (min-width: 1024px) {
      grid-template-columns: 1fr rem(320);
      gap: rem(40);
      align-items: start;
    }
  }

  &__content-text {
    font-size: rem(14);
    color: var(--color-primary);

    @media (min-width: 768px) {
      font-size: rem(16);
    }
  }

  &__content-subtitle {
    margin-top: rem(24);
    font-size: rem(20);
    font-weight: 700;

    @media (min-width: 768px) {
      font-size: rem(22);
    }
  }

  &__content-instructions {
    display: flex;
    flex-direction: column;
    gap: rem(10);
    margin-top: rem(12);
  }

  &__content-instruction {
    background: var(--color-secondary);
    color: var(--color-text-btn);
    padding: rem(10) rem(14);
    border-radius: rem(8);
    font-size: rem(14);

    @media (min-width: 768px) {
      font-size: rem(15);
    }
  }

  /* ================= ASIDE ================= */
  &__aside {
    order: 2;

    @media (min-width: 1024px) {
      order: 1;
    }
  }

  &__aside-card {
    background: var(--color-secondary);
    padding: rem(16);
    border-radius: rem(14);
  }

  &__aside-title {
    font-size: rem(16);
    color: var(--color-text-btn);
    margin-bottom: rem(12);

    @media (min-width: 768px) {
      font-size: rem(18);
    }
  }

  &__aside-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: rem(8);
  }

  &__aside-item {
    background: var(--color-text-btn);
    padding: rem(8);
    border-radius: rem(6);
    font-size: rem(14);
  }

  /* ================= ACTIONS ================= */
  &__delete {
    margin-top: rem(20);
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
    }
  }
}
</style>
