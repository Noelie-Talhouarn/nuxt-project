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


const emit = defineEmits(['close'])

async function onSubmit () {
  if (!payload.value.title || !payload.value.description || !payload.value.image_url || !payload.value.goal_id || !payload.value.DietaryInformation_id || !payload.value.AllergiesInformation_id) return 
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
    emit('close')

  } catch (err) {
    console.log(err)
  }
}

console.log(payload.value)
</script>

<template>

 
  <form v-if="formVisible" @submit.prevent="onSubmit" >
    <div>
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
      <select id="allergy" v-model="payload.AllergiesInformation_id">
        <option 
          v-for="allergy in allergies" 
          :key="allergy.allergy_id" 
          :value="allergy.allergy_id"
        >
          {{ allergy.name }}
        </option>

      </select>    </div>
    <div>
      <label for="cuisine">cuisine</label>
      <select id="cuisine" v-model="payload.cuisine_id">
        <option
          v-for="c in cuisines"
          :key="c.cuisine_id"
          :value="c.cuisine_id"
        >
          {{ c.name }}
        </option>
      </select>
    </div>
    <div>
      <label for="goal">objectifs</label>
      <select id="goal" v-model="payload.goal_id">
        <option 
          v-for="goal in goals" 
          :key="goal.goal_id" 
          :value="goal.goal_id"
        >
          {{ goal.name }}
        </option>

      </select>
    </div>
    <div>
      <label for="goal">Diet</label>
      <select id="goal" v-model="payload.DietaryInformation_id">
    

        <option 
          v-for="diet in diets"
          :key="diet.diet_id"
          :value="diet.diet_id"
        >
          {{ diet.name }}
        </option>
      </select>
    </div>
    <MyButton type="submit">creer</MyButton>
  </form>

</template>

