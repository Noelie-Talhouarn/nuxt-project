<script setup lang="ts">
const route = useRoute()

const config = useRuntimeConfig()

const { data: recipe, error } = await useAsyncData(`recipe-${route.params.id}`, async () => {
  const { data } = await $fetch<{ data: fullRecipe }>(`${config.public.apiUrl}/api/recipes/${route.params.id}`
  )
  return data
})

if (!recipe.value || error.value) throw new Error('Recipe not found')


</script>

<template>
  <div v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <p>{{ recipe.instructions }}</p>
    <ul>
      <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient.quantity }} {{ ingredient.unit }} de {{ ingredient.name }}</li>
    </ul>
  </div>
</template>