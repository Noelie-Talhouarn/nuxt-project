<script setup lang="ts">
import { watch } from "vue";
import MyInput from "./MyInput.vue";

const email = ref("");
const password = ref("");

const postlogin = () => {
  console.log(email.value, password.value);
};

watch(
  () => email.value,
  (value) => {
    if (value == "noelie@tal.com") {
      alert("bonjour noelie");
    }
  }
);
</script>

<template>
  <form class="form" @submit.prevent="postlogin">
    <MyInput label="email" type="email" v-model="email" />
    <MyInput label="Mots de passe" type="password" v-model="password" />
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
