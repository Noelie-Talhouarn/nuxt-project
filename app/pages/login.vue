<script setup lang="ts">
definePageMeta({
  middleware: ['guest']
})

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const config = useRuntimeConfig()

async function onSubmit () {
  errorMessage.value = ''

  try {
    const response = await fetch(`${config.public.apiUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const json = await response.json()

    if (!json.success) {
      errorMessage.value = 'Email ou mot de passe incorrect '
      return
    }

    const cookie = useCookie('recipe_token')
    cookie.value = json.data.token

    navigateTo('/dashboard')

  } catch (err) {
    console.error(err)
    errorMessage.value = 'Erreur serveur '
  }
}
</script>


<template>
  <section class="login">
    <MyTitle as="h1" size="large" class="login__title">
      Connexion
    </MyTitle>

    <form class="login__form" @submit.prevent="onSubmit">

      <p v-if="errorMessage" class="login__message login__message--error">
        {{ errorMessage }}
      </p>

      <div class="login__form-group">
        <label class="login__label" for="email">Email</label>
        <MyInput id="email" v-model="email" type="text" />
      </div>

      <div class="login__form-group">
        <label class="login__label" for="password">Mot de passe</label>
        <MyInput id="password" v-model="password" type="password" />
      </div>

      <div class="login__submit">
        <MyButton variant="purple" size="large" type="submit">
          Se connecter
        </MyButton>
      </div>

    </form>
  </section>
</template>

<style lang="scss">
.login {
  max-width: rem(900);
  margin: rem(32) auto;
  padding: rem(20);

  &__title {
  text-align: center;
margin-bottom: rem(24);
}


  &__form {
    padding: rem(20);
    border: rem(1) solid var(--color-secondary);
    border-radius: rem(12);
    background: var(--color-bg);

    /* Toujours une colonne */
    display: flex;
    flex-direction: column;
    gap: rem(20);

    /* ---- Formulaire étroit en desktop ---- */
    max-width: rem(450);
    margin: 0 auto;

    @media (max-width: 768px) {
      max-width: 100%; /* full width en mobile */
    }
  }

  /* Messages */
  &__message {
    padding: rem(10);
    border-radius: rem(8);
    text-align: center;
    font-weight: 600;

    &--error {
      background: rgba(255, 80, 80, 0.15);
      color: var(--color-delete);
      border: rem(2) solid var(--color-delete);
    }
  }

  /* Inputs */
  &__form-group {
    display: flex;
    flex-direction: column;
    gap: rem(6);
  }

  &__label {
    font-size: rem(16);
    font-weight: 600;
    color: var(--color-primary);
  }

  /* Submit */
  &__submit {
    display: flex;
    justify-content: center;
  }
}

</style>
