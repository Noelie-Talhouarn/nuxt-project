<script setup lang="ts">
const payload = ref({
  title: '',
  description: '',
  image_url: '',
  cuisine_id: 0,
  goal_id: 0,
  DietaryInformation_id: 0,
  AllergieInformation_id: 0
})

const config = useRuntimeConfig()


async function onSubmit () {
  if (!payload.value.title || !payload.value.description || !payload.value.image_url || !payload.value.DietaryInformation_id || !payload.value.AllergieInformation_id) return 
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
  } catch (err) {
    console.log(err)
  }
}

console.log(payload.value)
</script>

<template>
 
  <form @submit.prevent="onSubmit" >
    <div>{{ payload }}
      <label for="title">titre</label>
      <input id="title" v-model="payload.title" type="text">
    </div>
    <div>
      <label for="image">image</label>
      <input id="image" v-model="payload.image_url" type="text">
    </div>
    <div>
      <label for="description">description</label>
      <input id="description" v-model="payload.description" type="text">
    </div>
    <div>
      <label for="allergy">allergies</label>
      <input id="allergy" v-model="payload.AllergieInformation_id" type="text">
    </div>
    <div>
      <label for="cuisine">cuisine</label>
      <select id="cuisine" v-model="payload.cuisine_id">
        <option value="2">Italienne</option>
        <option value="3">Chinoise</option>
        <option value="4">Française</option>
        <option value="5">Mexicaine</option>
        <option value="6">Indienne</option>
        <option value="7">Méditerrannéene</option>
        <option value="8">Tahilandaise</option>
        <option value="9">Japonaise</option>
      </select>
    </div>
    <div>
      <label for="goal">objectifs</label>
      <select id="goal" v-model="payload.goal_id">
        <option value="1">perdre du poid</option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option value="7"></option>
        <option value="8"></option>
        <option value="9"></option>
      </select>
    </div>
    <div>
      <label for="goal">Diet</label>
      <select id="goal" v-model="payload.DietaryInformation_id">
        <option value="1">sans gluten</option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option value="7"></option>
        <option value="8"></option>
        <option value="9"></option>
      </select>
    </div>
    <MyButton type="submit">creer</MyButton>
  </form>

</template>

