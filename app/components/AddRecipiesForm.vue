<script setup lang="ts">
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

const config = useRuntimeConfig()

const formVisible = ref(true)

const goals = ref<Goal[]>(
  (await $fetch<{ data: Goal[] }>(`${config.public.apiUrl}/api/goals`)).data
)

const cuisines = ref<Cuisine[]>(
  (await $fetch<{ data: Cuisine[] }>(`${config.public.apiUrl}/api/cuisines`)).data
)
const diets = ref<Diet[]>(
  (await $fetch<{ data: Diet[] }>(`${config.public.apiUrl}/api/diets`)).data
)

const allergies = ref<Allergy[]>(
  (await $fetch<{ data: Allergy[] }>(`${config.public.apiUrl}/api/allergies`)).data
)


const emit = defineEmits(['close', 'created'])

async function onSubmit () {
  if (!payload.value.title || !payload.value.description || !payload.value.image_url || !payload.value.goal_id || !payload.value.DietaryInformation_id || !payload.value.AllergiesInformation_id) 
  {
    errorMessage.value = '⚠️ Veuillez remplir tous les champs.' 
    return }
    
  try {
    await fetch(`${config.public.apiUrl}/api/recipes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('recipe_token').value}`
      },
      body: JSON.stringify(payload.value
      )
    })

    emit('created')
    emit('close')

  } catch (err) {
    errorMessage.value = '🔥 Erreur serveur.'
    console.error(err)
  }
}

console.log(payload.value.title)

console.log(payload.value)
</script>

<template>

  <MyTitle as="h1" size="medium" class="form__title">Ajouter une recette</MyTitle>
  <MyButton 
    variant="transparent"
    size="large"
    class="form__btn"
    @click.prevent="emit('close')"
  >
    Annuler
  </MyButton>
  <form v-if="formVisible" @submit.prevent="onSubmit" class="form">

    <p v-if="errorMessage" class="form-error">
      {{ errorMessage }}
    </p>
    <div class="form__group">
      <label for="title" class="form__label">Titre</label>
      <MyInput id="title" v-model="payload.title" type="text" />
    </div>

    <div class="form__group">
      <label for="image" class="form__label">Image (URL)</label>
      <MyInput id="image" v-model="payload.image_url" type="text" />
    </div>

    <div class="form__group">
      <label for="description" class="form__label">Description</label>
      <MyInput id="description" v-model="payload.description" type="text" />
    </div>

    <div class="form__group">
      <label for="allergy" class="form__label">Allergies</label>
      <select id="allergy" v-model="payload.AllergiesInformation_id" class="form__select">
        <option v-for="allergy in allergies" :key="allergy.allergy_id" :value="allergy.allergy_id">
          {{ allergy.name }}
        </option>
      </select>
    </div>

    <div class="form__group">
      <label for="cuisine" class="form__label">Cuisine</label>
      <select id="cuisine" v-model="payload.cuisine_id" class="form__select">
        <option v-for="c in cuisines" :key="c.cuisine_id" :value="c.cuisine_id">
          {{ c.name }}
        </option>
      </select>
    </div>

    <div class="form__group">
      <label for="goal" class="form__label">Objectifs</label>
      <select id="goal" v-model="payload.goal_id" class="form__select">
        <option v-for="goal in goals" :key="goal.goal_id" :value="goal.goal_id">
          {{ goal.name }}
        </option>
      </select>
    </div>

    <div class="form__group">
      <label for="diet" class="form__label">Régime alimentaire</label>
      <select id="diet" v-model="payload.DietaryInformation_id" class="form__select">
        <option v-for="diet in diets" :key="diet.diet_id" :value="diet.diet_id">
          {{ diet.name }}
        </option>
      </select>
    </div>

    <div class="form__submit">
      <MyButton variant="purple" size="large" type="submit">Créer</MyButton>
    </div>
  </form>


</template>
<style lang="scss">
.form {
  padding: rem(20);
  border: rem(1) solid var(--color-secondary);
  border-radius: rem(12);
  max-width: rem(900);   /* élargi pour accueillir 2 colonnes */
  margin: 2rem auto;

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

  &-error {
    grid-column: span 2; /* message sur toute la largeur */
    background: rgba(255, 80, 80, 0.15);
    color: #ff5555;
    border: 1px solid #ff5555;
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
    background: var(--color-text-btn);
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

