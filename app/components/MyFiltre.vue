<script setup lang="ts">
const props = defineProps<{
  cuisines: Cuisine[]
  modelValue: string[]  
}>()

const emit = defineEmits(['update:modelValue'])

// Reprend EXACTEMENT ton onCheckboxInput de la page d'accueil
function onCheckboxInput ($event: Event) {
  const target = $event.target
  if (!(target instanceof HTMLInputElement)) return
  
  const value = target.value
  const newFilters = [...props.modelValue]

  if (!newFilters.includes(value)) {
    newFilters.push(value)
  } else {
    const index = newFilters.findIndex(v => v === value)
    newFilters.splice(index, 1)
  }

  emit('update:modelValue', newFilters)
}
</script>

<template>
  <div class="recipes-filters">
    <div
      v-for="(cuisine, index) in cuisines"
      :key="index"
      class="recipes-filters__item"
    >
      <input
        :id="cuisine.name"
        type="checkbox"
        :value="cuisine.name"
        :checked="modelValue.includes(cuisine.name)"
        @input="onCheckboxInput"
      >
      <label :for="cuisine.name">{{ cuisine.name }}</label>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Reprend et améliore un peu tes styles actuels */
.recipes-filters {
  display: flex;
  flex-wrap: wrap;
justify-content: center;  
gap: 12px;
  margin: 20px 0;

  &__item {
    display: flex;
    align-items: center;
    --button-color: var(--color-text-btn);
  --button-bg-color: var(--color-secondary);
  padding: rem(8) rem(20);
  background: var(--button-bg-color);
  color: var(--button-color);
  border-radius: rem(20);
  text-decoration: none;
  font-size: var(--font-size-base);

    label {
      color: var(--color-text-btn);
      cursor: pointer;
    }

    input {
      accent-color: var(--color-primary);
      cursor: pointer;
    }
  }
}
</style>
