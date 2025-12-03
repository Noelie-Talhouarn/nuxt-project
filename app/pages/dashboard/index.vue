
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

await useAsyncData('my-recipes', () => {
  const cookie = useCookie('recipe_token')
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
})

const showForm = ref(false)

function openForm () {
  showForm.value = true
}

function closeForm () {
  showForm.value = false
}

</script>

<template>
  <section>
    <div class="p-dashboard">
      <h1>Dashboard</h1>
      <MyButton v-if="!showForm" @click="openForm">
        Créer une recette
      </MyButton>

      <AddRecipiesForm
        v-if="showForm"
        @close="closeForm"/>      
      <MyButton @click="onLogoutClick">Se deconnecter</MyButton>
    </div>
  
  </section>
</template>