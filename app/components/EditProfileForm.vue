<script setup lang="ts">
const props = defineProps<{
  user: User
}>()

const emit = defineEmits(['close', 'updated'])


const config = useRuntimeConfig()
const cookie = useCookie('recipe_token')

const form = ref({
  first_name: props.user.first_name,
  last_name: props.user.last_name,
  username: props.user.username,
  email: props.user.email
})

const message = ref('')
const errorMessage = ref('')

async function saveProfile () {
  errorMessage.value = ''
  message.value = ''

  try {
    const response = await $fetch<ApiResponse<User>>(
      `${config.public.apiUrl}/api/users/profile`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${cookie.value}`
        },
        body: form.value
      }
    )

    message.value = 'Profil mis à jour ✅'

    emit('updated', response.data)
    emit('close')

  } catch (err) {
    console.error(err)
    errorMessage.value = '❌ Erreur lors de la mise à jour.'
  }
}
</script>

<template>
  <div >
    <MyTitle as="h1" size="medium" class="form__title">
      Modifier mon profil
    </MyTitle>
    <MyButton 
      variant="transparent"
      size="large"
      class="form__btn"
      @click.prevent="emit('close')"
    >
      Annuler
    </MyButton>
  </div>
  <form class="form" @submit.prevent="saveProfile">

    <p v-if="errorMessage" class="form__error">{{ errorMessage }}</p>
    <p v-if="message" class="form__success">{{ message }}</p>

    <div class="form__group">
      <label class="form__label">Prénom</label>
      <MyInput v-model="form.first_name" type="text" />
    </div>

    <div class="form__group">
      <label class="form__label">Nom</label>
      <MyInput v-model="form.last_name" type="text" />
    </div>

    <div class="form__group">
      <label class="form__label">Nom d'utilisateur</label>
      <MyInput v-model="form.username" type="text" />
    </div>

    <div class="form__group">
      <label class="form__label">Email</label>
      <MyInput v-model="form.email" type="email" />
    </div>

    <div class="form__submit">
      <MyButton variant="purple" size="large" type="submit">
        Sauvegarder
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
    grid-column: span 2;
  }

  &__error,
  &__success {
    grid-column: 1 / -1;
    padding: rem(10);
    border-radius: rem(8);
    text-align: center;
    font-weight: 600;
  }

  &__error {
    background: rgba(255, 80, 80, 0.15);
    color: var(--color-delete);
    border:  rem(2) solid var(--color-delete);
  }

  &__success {
    background: rgba(80, 255, 130, 0.15);
    color: var(--color-secondary);
    border: rem(2) solid var(--color-secondary);
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

  &__submit {
    grid-column: span 2;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
      grid-column: span 1;
    }
  }
}
</style>
