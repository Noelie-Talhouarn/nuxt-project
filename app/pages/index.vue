<script setup lang="ts">
const config = useRuntimeConfig()
const { data: recipes, error } = await useAsyncData('recipes', async () => {
  const { data } = await $fetch<ApiResponse<Recipe[]>>(`${config.public.apiUrl}/api/recipes`
  )
  return data
})

if (error && error.value) throw new Error('Page not found')
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

    <p>Liste des recettes :</p>
    <ul>
      <li v-for="(recipe, index) in recipes" :key="index">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">{{ recipe.title }}</NuxtLink></li>
    </ul>
  </main>
</template>
