<script setup lang="ts">
const props = defineProps<{
  recipe: fullRecipe
}>()

const emit = defineEmits(['close', 'updated'])

const config = useRuntimeConfig()
const cookie = useCookie('recipe_token')

// Valeurs du formulaire
const form = ref({
  title: props.recipe.title,
  AllergiesInformation_id: props.recipe.AllergiesInformation_id // <-- CORRECT
})


// Charger allergies
const { data: allergiesRes } = await useAsyncData('allergies', async () => {
  const res = await $fetch<ApiResponse<Allergy[]>>(
    `${config.public.apiUrl}/api/allergies`
  )
  return res.data
})

const allergies = computed(() => allergiesRes.value ?? [])

const message = ref('')
const errorMessage = ref('')

async function saveRecipe () {
  message.value = ''
  errorMessage.value = ''

  try {

    /* ========== UPDATE TITLE ========== */
    if (form.value.title !== props.recipe.title) {
      await $fetch(`${config.public.apiUrl}/api/recipes/${props.recipe.recipe_id}/title`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${cookie.value}` },
        body: { title: form.value.title }
      })
    }

    /* ========== UPDATE ALLERGY ========== */
    if (form.value.AllergiesInformation_id !== props.recipe.AllergiesInformation_id) {
      await $fetch(`${config.public.apiUrl}/api/recipes/${props.recipe.recipe_id}/allergy`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${cookie.value}` },
        body: { AllergiesInformation_id: form.value.AllergiesInformation_id }
      })
    }

    // Mettre à jour localement
    emit('updated', {
      ...props.recipe,
      title: form.value.title,
      AllergiesInformation_id: form.value.AllergiesInformation_id,
      allergy_name:
    allergies.value.find(a => a.allergy_id === form.value.AllergiesInformation_id)?.name
    || props.recipe.allergy_name
      
    })

    emit('close')

  } catch (err) {
    console.error(err)
    errorMessage.value = 'Erreur lors de la mise à jour '
  }
}
</script>

<template>

  <form class="form" @submit.prevent="saveRecipe">

    <p v-if="errorMessage" class="form__error">{{ errorMessage }}</p>

    <div class="form__group">
      <label class="form__label">Titre</label>
      <MyInput v-model="form.title" type="text" />
    </div>

    <div class="form__group">
      <label class="form__label">Allergie</label>
      <select v-model="form.AllergiesInformation_id" class="form__select">
        <option v-for="allergy in allergies" 
                :key="allergy.allergy_id"
                :value="allergy.allergy_id">
          {{ allergy.name }}
        </option>
      </select>
    </div>
    <MyButton @click="emit('close')">Annuler</MyButton>

    <MyButton type="submit">Sauvegarder</MyButton>
  </form>
</template>

<style lang="scss">
/* EXACTEMENT la même structure que ton AddRecipiesForm */
.form {
  padding: rem(20);
  border: rem(1) solid var(--color-secondary);
  border-radius: rem(12);
  max-width: rem(900);
  margin: 2rem auto;

  display: grid;
  grid-template-columns: 1fr;
  gap: rem(20);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  &__title {
    grid-column: span 2;
    text-align: center;
  }

&__error {
  grid-column: span 2;
  padding: rem(10);
  border-radius: rem(8);
  text-align: center;
  font-weight: 600;
}

&__error {
  color: var(--color-delete);
  border: rem(2) solid var(--color-delete);
}

  &__group {
    display: flex;
    flex-direction: column;
    gap: rem(6);
  }

  &__label {
    font-size: rem(16);
    font-weight: 600;
    color: var(--color-primary);
  }

  &__select {
    padding: rem(10) rem(14);
    font-size: rem(16);
    border: rem(2) solid var(--color-secondary);
    border-radius: rem(8);
    background: var(--color-text-btn);
  }

  &__submit {
    grid-column: span 2;
    display: flex;
    justify-content: center;
  }
}
</style>
