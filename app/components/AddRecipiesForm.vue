<script setup lang="ts">
const props = defineProps<{
  goals: Goal[]
  cuisines: Cuisine[]
  diets: Diet[]
  allergies: Allergy[]
}>()

const payload = ref({
  title: '',
  description: '',
  image_url: '',
  cuisine_id: 0,
  goal_id: 0,
  ingredient_id: '',
  DietaryInformation_id: 0,
  AllergiesInformation_id: 0
})

const errorMessage = ref('')
const formVisible = ref(true)

const emit = defineEmits<{
  (e: 'close' | 'created'): void
}>()


const config = useRuntimeConfig()

async function onSubmit () {
  if (
    !payload.value.title ||
    !payload.value.description ||
    !payload.value.image_url ||
    !payload.value.goal_id ||
    !payload.value.DietaryInformation_id ||
    !payload.value.AllergiesInformation_id
  ) {
    errorMessage.value = '⚠️ Veuillez remplir tous les champs.'
    return
  }

  try {
    await fetch(`${config.public.apiUrl}/api/recipes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('recipe_token').value}`
      },
      body: JSON.stringify(payload.value)
    })

    emit('created')
    emit('close')
  } catch (err) {
    errorMessage.value = 'Erreur serveur.'
    console.error(err)
  }
}
</script>


<template>
  <MyTitle as="h1" size="medium" class="form__title">
    Ajouter une recette
  </MyTitle>

  <MyButton variant="transparent" size="large" class="form__btn" @click.prevent="emit('close')">
    Annuler
  </MyButton>

  <form v-if="formVisible" @submit.prevent="onSubmit" class="form">
    <p v-if="errorMessage" class="form__error">
      {{ errorMessage }}
    </p>

    <div class="form__group">
      <label class="form__label">Titre</label>
      <MyInput v-model="payload.title" type="text" />
    </div>

    <div class="form__group">
      <label class="form__label">Image (URL)</label>
      <MyInput v-model="payload.image_url" type="text" />
    </div>

    <div class="form__group">
      <label class="form__label">Description</label>
      <MyInput v-model="payload.description" type="text" />
    </div>

    <div class="form__group">
      <label class="form__label">Allergies</label>
      <select v-model="payload.AllergiesInformation_id" class="form__select">
        <option v-for="allergy in props.allergies" :key="allergy.allergy_id" :value="allergy.allergy_id">
          {{ allergy.name }}
        </option>
      </select>
    </div>

    <div class="form__group">
      <label class="form__label">Cuisine</label>
      <select v-model="payload.cuisine_id" class="form__select">
        <option v-for="c in props.cuisines" :key="c.cuisine_id" :value="c.cuisine_id">
          {{ c.name }}
        </option>
      </select>
    </div>

    <div class="form__group">
      <label class="form__label">Objectifs</label>
      <select v-model="payload.goal_id" class="form__select">
        <option v-for="goal in props.goals" :key="goal.goal_id" :value="goal.goal_id">
          {{ goal.name }}
        </option>
      </select>
    </div>

    <div class="form__group">
      <label class="form__label">Régime alimentaire</label>
      <select v-model="payload.DietaryInformation_id" class="form__select">
        <option v-for="diet in props.diets" :key="diet.diet_id" :value="diet.diet_id">
          {{ diet.name }}
        </option>
      </select>
    </div>

    <div class="form__submit">
      <MyButton variant="purple" size="large" type="submit">
        Créer
      </MyButton>
    </div>
  </form>
</template>

<style lang="scss">
.form {
  padding: rem(20);
  border: rem(1) solid var(--color-secondary);
  border-radius: rem(12);
  max-width: rem(900);  
  margin: rem(2);

  display: grid;
  grid-template-columns: 1fr; 
  gap: rem(20);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  &__title {
    text-align: center;
    color: var(--color-secondary);
  }

&__error {
  grid-column: span 2;
  color: var(--color-delete);
  border: rem(2) solid var(--color-delete);
  padding: rem(10);
  border-radius: rem(8);
  text-align: center;
  font-weight: 600;
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
    border: 1px solid var(--color-secondary);
    border-radius: rem(8);
    background: var(--color-primary);
  }

  /* Bouton centré sur toute la largeur */
  &__submit {
    grid-column: span 2;
    display: flex;
    justify-content: center;
    margin-top: rem(10);

    @media (max-width: 768px) {
      grid-column: span 1;
    }
  }

  /* Mobile */
  @media (max-width: 600px) {
    padding: rem(15);

    &__input,
    &__select {
      font-size: rem(14);
    }
  }
}
</style>

