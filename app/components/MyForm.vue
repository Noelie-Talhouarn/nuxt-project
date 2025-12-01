<script setup lang="ts">

const email = ref("");
const password = ref("");

const onSubmit = () => {
  // post sur l'api
  console.log("Submit form");
  console.log(email.value, password.value);
};
// const onInputEmail = (e :InputEvent) => {
//     const target = (e.currentTarget as HTMLInputElement).value
//     email.value = target
// }

// const onInputPassword = (e :InputEvent) => {
//     const target = (e.currentTarget as HTMLInputElement).value
//     password.value = target
// }
</script>

<template>
  <form @submit.prevent="onSubmit" class="form">
    <div class="field">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" />
    </div>

    <div class="field">
      <label for="password">Mot de passe</label>
      <input id="password" v-model="password" type="password" />
    </div>

    <MyButton type="submit" class="button">Valider</MyButton>
  </form>
</template>

<style lang="scss">
.form {
  border: none;
}
</style>
