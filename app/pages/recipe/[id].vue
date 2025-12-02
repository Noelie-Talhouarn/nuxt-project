<script setup lang="ts">
const route = useRoute()

const config = useRuntimeConfig()

const { data: recipe, error } = await useAsyncData(`recipe-${route.params.id}`, async () => {
  const { data } = await $fetch<ApiResponse<fullRecipe>>(`${config.public.apiUrl}/api/recipes/${route.params.id}`
  )
  return data
})

if (!recipe.value || error.value) throw new Error('Recipe not found')


</script>

<template>
  <div v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <p>{{ recipe.description }}</p>
    <img v-if="recipe.image_url" :src="recipe.image_url" :alt="recipe.title || 'Recipe image'">
    <p>{{ recipe.cuisine_name }}</p>
    <p>{{ recipe.goal_name }}</p>
    <p>{{ recipe.diet_name }}</p>
    <p>{{ recipe.allergy_name }}</p>
    <ul>
      <p>Ingredients</p>
      <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient.quantity }} {{ ingredient.unit }} de {{ ingredient.name }}</li>
    </ul>
    <ul>
      <p>instructions</p>
      <li v-for="(instruction, index) in recipe.instructions" :key="index">{{ instruction.step_number }} {{ instruction.description }} </li>
    </ul>
  </div>
</template>