<script setup lang="ts">

const email = ref('')
const password = ref('')

const config = useRuntimeConfig()

async function onSubmit (){
  try{
    console.log('=> Api call to login')
    const response = await fetch(`${config.public.apiUrl}/api/users/login`,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const json = await response.json()

  
    const token = json.data.token

    const cookie = useCookie('recipe_token')
    cookie.value = token

    await navigateTo('/dashboard')

    //redirect to dashboard

    console.log(token)
  } catch (err) {
    console.log(err)
  }
}
</script>

<template>

  <div>
    <h1>Connexion</h1>
    <form action="" @submit.prevent="onSubmit">
      <label for="email">email</label>
      <MyInput v-model="email" type="text" />
      <label for="password">password</label>
      <MyInput v-model="password" type="password" />
      <MyButton type="submit">se connecter</MyButton>
    </form>
  </div>
</template>

<style lang="scss"></style>