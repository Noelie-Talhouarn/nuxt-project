<script setup lang="ts">
import { watch } from 'vue'
import MyInput from './MyInput.vue'

const email = ref('')
const password = ref('')

const postlogin = () => {
  // eslint-disable-next-line no-console
  console.log(email.value, password.value)
}

watch(
  () => email.value,
  (value) => {
    if (value == 'noelie@tal.com') {
      alert('bonjour noelie')
    }
  }
)
</script>

<template>
  <form class="form" @submit.prevent="postlogin">
    <MyInput v-model="email" label="email" type="email" />
    <MyInput v-model="password" label="Mots de passe" type="password" />
    <MyButton>Se connecter</MyButton>
  </form>
</template>

<style lang="scss">
.form {
  border: 1px solid var(--color-b);
  border-radius: rem(4);
  display: flex;
  flex-direction: column;
  gap: rem(16);
  padding: rem(16);
}
</style>
