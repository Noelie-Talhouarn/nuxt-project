<script setup lang="ts">
const first_name = ref('')
const last_name = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const config = useRuntimeConfig()

async function onSubmit () {
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await fetch(`${config.public.apiUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: first_name.value,
        last_name: last_name.value,
        username: username.value,
        email: email.value,
        password: password.value
      })
    })

    const json = await response.json()

    if (!json.success) {
      errorMessage.value = json.message || 'Erreur lors de l’inscription ❌'
      return
    }

    // 🎉 Inscription réussie → connexion automatique
    const loginResponse = await fetch(`${config.public.apiUrl}/api/users/login`, {
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

    const loginJson = await loginResponse.json()

    if (loginJson.success) {
      const cookie = useCookie('recipe_token')
      cookie.value = loginJson.data.token

      return navigateTo('/dashboard')
    }

  } catch (err) {
    console.error(err)
    errorMessage.value = 'Erreur serveur '
  }
}

</script>
<template>
  <section class="register">
    <MyTitle as="h1" size="large" class="register__title">
      Inscription
    </MyTitle>

    <form class="register__form" @submit.prevent="onSubmit">

      <!-- Messages -->
      <p v-if="errorMessage" class="register__message register__message--error">
        {{ errorMessage }}
      </p>

      <p v-if="successMessage" class="register__message register__message--success">
        {{ successMessage }}
      </p>

      <!-- First name -->
      <div class="register__form-group">
        <label class="register__label" for="first_name">Prénom</label>
        <MyInput id="first_name" v-model="first_name" type="text" />
      </div>

      <!-- Last name -->
      <div class="register__form-group">
        <label class="register__label" for="last_name">Nom</label>
        <MyInput id="last_name" v-model="last_name" type="text" />
      </div>

      <!-- Username -->
      <div class="register__form-group">
        <label class="register__label" for="username">Nom d'utilisateur</label>
        <MyInput id="username" v-model="username" type="text" />
      </div>

      <!-- Email -->
      <div class="register__form-group">
        <label class="register__label" for="email">Email</label>
        <MyInput id="email" v-model="email" type="text" />
      </div>

      <!-- Password -->
      <div class="register__form-group">
        <label class="register__label" for="password">Mot de passe</label>
        <MyInput id="password" v-model="password" type="password" />
      </div>

      <!-- Submit -->
      <div class="register__submit">
        <MyButton variant="purple" size="large" type="submit">
          S’inscrire
        </MyButton>
      </div>

    </form>
  </section>
</template>
<style lang="scss">
.register {
  max-width: rem(900);
  margin: rem(32) auto;
  padding: rem(20);

  &__title {
    text-align: center;
    color: var(--color-secondary);
    margin-bottom: rem(20);
  }

  &__form {
    padding: rem(20);
    border: rem(1) solid var(--color-secondary);
    border-radius: rem(12);
    background: var(--color-bg);

    display: flex;
    flex-direction: column;
    gap: rem(20);

    max-width: rem(450);
    margin: 0 auto;

    @media (max-width: 768px) {
      max-width: 100%;
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
      color: #ff5555;
      border: 1px solid #ff5555;
    }

    &--success {
      background: rgba(80, 255, 130, 0.15);
      color: #2eb872;
      border: 1px solid #2eb872;
    }
  }

  /* Form groups */
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

  /* Submit button */
  &__submit {
    display: flex;
    justify-content: center;
  }
}
</style>
